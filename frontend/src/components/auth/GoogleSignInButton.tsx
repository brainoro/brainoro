'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2, AlertCircle } from 'lucide-react';

interface GoogleSignInButtonProps {
  className?: string;
  redirectTo?: string;
  buttonText?: string;
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'continue_with' | 'signin_with' | 'signup_with' | 'signin';
  enableOneTap?: boolean;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Generate a cryptographically random raw nonce string
 */
function generateRawNonce(): string {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._~';
  const array = new Uint8Array(32);
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < 32; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (x) => charset[x % charset.length]).join('');
}

/**
 * SHA-256 Hash of raw nonce string (hex encoded)
 */
async function hashNonce(rawNonce: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(rawNonce);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  className = '',
  redirectTo,
  buttonText = 'Sign in with Google',
  theme = 'outline',
  size = 'large',
  text = 'continue_with',
  enableOneTap = false,
  onSuccess,
  onError,
}) => {
  const router = useRouter();
  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const rawNonceRef = useRef<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGisReady, setIsGisReady] = useState(false);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const useOAuthRedirect = process.env.NEXT_PUBLIC_USE_OAUTH_REDIRECT === 'true';

  /**
   * Post-login session validation and routing
   */
  const handleAuthSuccess = useCallback(
    async (user: any) => {
      try {
        // Sync profile record in profiles table
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('user_id, onboarding_completed, role, account_status')
          .eq('user_id', user.id)
          .maybeSingle();

        let onboardingCompleted = false;

        if (!existingProfile) {
          const displayName =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.email?.split('@')[0] ||
            'Learner';

          const avatarUrl =
            user.user_metadata?.avatar_url ||
            user.user_metadata?.picture ||
            null;

          const trialEnd = new Date();
          trialEnd.setDate(trialEnd.getDate() + 7);

          await supabase.from('profiles').upsert(
            {
              user_id: user.id,
              email: user.email || '',
              display_name: displayName,
              avatar_url: avatarUrl,
              role: 'STUDENT',
              account_status: 'ACTIVE',
              onboarding_completed: false,
              trial_ends_at: trialEnd.toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
          );
        } else {
          onboardingCompleted = Boolean(existingProfile.onboarding_completed);
        }

        if (onSuccess) {
          onSuccess();
        }

        // Determine destination route
        if (redirectTo) {
          router.push(redirectTo);
        } else if (!onboardingCompleted) {
          router.push('/onboarding');
        } else {
          router.push('/');
        }
      } catch (err: any) {
        console.warn('[Google Auth Profile Sync Warning]:', err?.message || err);
        router.push(redirectTo || '/');
      }
    },
    [redirectTo, router, onSuccess]
  );

  /**
   * GIS Credential Callback: exchange ID Token with Supabase using raw nonce
   */
  const handleCredentialResponse = useCallback(
    async (response: any) => {
      if (isLoading) return; // Prevent double submits

      try {
        setIsLoading(true);
        setErrorMessage(null);

        if (!response.credential) {
          throw new Error('No Google identity credential was returned.');
        }

        // Pass ID token and matching raw nonce to Supabase signInWithIdToken
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
          nonce: rawNonceRef.current,
        });

        if (error) {
          throw error;
        }

        if (!data?.user) {
          throw new Error('Authentication succeeded but user payload is missing.');
        }

        await handleAuthSuccess(data.user);
      } catch (err: any) {
        const readableMsg =
          err?.message || 'Google Identity authentication failed. Please try again.';
        console.error('[Google Identity Services (GIS) Error]:', err);
        setErrorMessage(readableMsg);
        if (onError) {
          onError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, handleAuthSuccess, onError]
  );

  /**
   * Fallback: Legacy OAuth Redirect (supabase.co redirect)
   */
  const handleLegacyOAuthSignIn = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const callbackUrl = redirectTo || `${window.location.origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (err: any) {
      console.error('[Google OAuth Fallback Error]:', err?.message || err);
      setErrorMessage(err?.message || 'OAuth sign-in failed.');
      if (onError) onError(err);
      setIsLoading(false);
    }
  };

  /**
   * Initialize Google Identity Services (GIS)
   */
  useEffect(() => {
    // If feature flag is set to use OAuth redirect or if no client ID is provided, skip GIS init
    if (useOAuthRedirect || !googleClientId) {
      return;
    }

    let isMounted = true;
    let pollInterval: NodeJS.Timeout | null = null;
    let attempts = 0;

    const initializeGis = async () => {
      if (typeof window === 'undefined' || !window.google?.accounts?.id) {
        return false;
      }

      try {
        // 1. Generate fresh raw nonce and compute its SHA-256 hash
        const rawNonce = generateRawNonce();
        rawNonceRef.current = rawNonce;
        const hashedNonce = await hashNonce(rawNonce);

        if (!isMounted) return false;

        // 2. Initialize GIS with client_id, callback, and hashed nonce
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: handleCredentialResponse,
          nonce: hashedNonce,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // 3. Render official Google button inside container
        if (buttonContainerRef.current) {
          buttonContainerRef.current.innerHTML = '';
          const targetWidth = Math.min(
            Math.max(buttonContainerRef.current.offsetWidth || 340, 240),
            400
          );

          window.google.accounts.id.renderButton(buttonContainerRef.current, {
            type: 'standard',
            theme,
            size,
            text,
            shape: 'rectangular',
            logo_alignment: 'left',
            width: targetWidth,
          });
        }

        // 4. Optionally trigger Google One Tap
        if (enableOneTap) {
          window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
              // Silently handle one tap bypass/dismissal
              console.log(
                '[GIS One Tap Status]:',
                notification.isNotDisplayed()
                  ? notification.getNotDisplayedReason()
                  : notification.getSkippedReason()
              );
            }
          });
        }

        if (isMounted) setIsGisReady(true);
        return true;
      } catch (err) {
        console.warn('[GIS Init Warning]:', err);
        return false;
      }
    };

    // Attempt immediate init if GIS script is already loaded
    initializeGis().then((ready) => {
      if (!ready && isMounted) {
        // Poll for GIS script availability up to 5 seconds
        pollInterval = setInterval(async () => {
          attempts += 1;
          const success = await initializeGis();
          if (success || attempts > 25) {
            if (pollInterval) clearInterval(pollInterval);
          }
        }, 200);
      }
    });

    return () => {
      isMounted = false;
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [
    googleClientId,
    useOAuthRedirect,
    theme,
    size,
    text,
    enableOneTap,
    handleCredentialResponse,
  ]);

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {errorMessage && (
        <div className="w-full mb-3 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-700 text-xs animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <span className="leading-tight">{errorMessage}</span>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading ? (
        <div className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 shadow-xs">
          <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
          <span>Securing Google Session...</span>
        </div>
      ) : !useOAuthRedirect && googleClientId ? (
        /* Official GIS Rendered Button Container */
        <div className="w-full flex justify-center">
          <div
            ref={buttonContainerRef}
            className={`w-full min-h-[40px] flex justify-center ${
              !isGisReady ? 'hidden' : 'block'
            }`}
          />
          {/* Skeleton while GIS script finishes rendering */}
          {!isGisReady && (
            <button
              type="button"
              disabled
              className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white text-slate-400 font-medium text-xs sm:text-sm rounded-xl border border-slate-200 opacity-80 cursor-wait"
            >
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              <span>Loading Google Sign-in...</span>
            </button>
          )}
        </div>
      ) : (
        /* Fallback: Custom Button with OAuth Redirect */
        <button
          type="button"
          onClick={handleLegacyOAuthSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 font-medium text-xs sm:text-sm rounded-xl border border-slate-300 shadow-xs hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{buttonText}</span>
        </button>
      )}
    </div>
  );
};

export default GoogleSignInButton;
