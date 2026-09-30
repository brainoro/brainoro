'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2, AlertCircle } from 'lucide-react';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [statusMessage, setStatusMessage] = useState('Securing your Google session...');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const processAuthCallback = async () => {
      try {
        // 1. Check if an auth code was returned in query params (PKCE flow)
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const error = url.searchParams.get('error');
        const errorDescription = url.searchParams.get('error_description');

        if (error || errorDescription) {
          throw new Error(errorDescription || error || 'Google Authentication failed.');
        }

        if (code) {
          setStatusMessage('Exchanging authorization token with Supabase...');
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) {
            console.warn('[PKCE Exchange Warning]:', exchangeError.message);
          }
        }

        // 2. Retrieve active session directly in client browser storage
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          throw sessionError;
        }

        if (!session || !session.user) {
          // Wait briefly for onAuthStateChange to resolve if session is still finishing handshake
          const sessionResolved = await new Promise<boolean>((resolve) => {
            const timeout = setTimeout(() => resolve(false), 4000);
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
              if (currentSession?.user) {
                clearTimeout(timeout);
                subscription.unsubscribe();
                resolve(true);
              }
            });
          });

          if (!sessionResolved) {
            throw new Error('Unable to establish a valid user session from Google OAuth.');
          }
        }

        // 3. Confirm latest user details
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('User record could not be retrieved.');
        }

        setStatusMessage('Syncing user profile...');

        // 4. Ensure profile entry exists in profiles table for this user
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('user_id, onboarding_completed')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!existingProfile) {
          // Create initial profile record for the Google user
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
        }

        if (isCancelled) return;

        setStatusMessage('Redirecting to dashboard...');

        // 5. Seamlessly route user to App / Dashboard (or onboarding if fresh user)
        if (!existingProfile || !existingProfile.onboarding_completed) {
          router.replace('/onboarding');
        } else {
          router.replace('/');
        }
      } catch (err: any) {
        console.error('[OAuth Callback Error]:', err?.message || err);
        if (!isCancelled) {
          setErrorMessage(err?.message || 'Google authentication was not completed.');
          setTimeout(() => {
            router.replace('/login');
          }, 3000);
        }
      }
    };

    processAuthCallback();

    return () => {
      isCancelled = true;
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-sm w-full space-y-4">
        {errorMessage ? (
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-rose-900">Authentication Error</h3>
            <p className="text-xs text-rose-600 leading-relaxed">{errorMessage}</p>
            <p className="text-[11px] text-slate-400">Redirecting to login in a moment...</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
            <h3 className="text-base font-bold text-slate-800">Signing you in...</h3>
            <p className="text-xs text-slate-500">{statusMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
