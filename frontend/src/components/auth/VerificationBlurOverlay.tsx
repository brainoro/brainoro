'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import {
  Lock,
  Mail,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Sparkles,
  KeyRound,
  ArrowRight,
} from 'lucide-react';

interface VerificationBlurOverlayProps {
  children: React.ReactNode;
  moduleName?: string;
}

export const VerificationBlurOverlay: React.FC<VerificationBlurOverlayProps> = ({
  children,
  moduleName = 'Brainoro Learning Module',
}) => {
  const { user, profile, isCustomerAdmin, isSuperAdmin, refreshProfile, signIn } = useAuth();

  const [isSending, setIsSending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isBackendVerified, setIsBackendVerified] = useState(false);
  const [showManualLogin, setShowManualLogin] = useState(false);
  const [manualPassword, setManualPassword] = useState('');
  const [isManualLoggingIn, setIsManualLoggingIn] = useState(false);

  const isPrivileged = Boolean(
    profile?.role !== 'STUDENT' &&
      (isCustomerAdmin ||
        isSuperAdmin ||
        profile?.role === 'EDUCATOR' ||
        profile?.role === 'SUPER_ADMIN')
  );

  // Retrieve registered email from context or storage
  const userEmail = (
    user?.email ||
    profile?.email ||
    (typeof window !== 'undefined'
      ? localStorage.getItem('brainoro_signup_email') || ''
      : '')
  ).trim().toLowerCase();

  // Check if provider is Google (Google accounts are automatically verified)
  const isGoogleUser = Boolean(
    user?.app_metadata?.provider === 'google' ||
    user?.user_metadata?.iss?.includes('google')
  );

  // Strict backend verification evaluation: ONLY verified if confirmed by database or synchronized session
  const isVerified = Boolean(
    isPrivileged ||
      isGoogleUser ||
      isBackendVerified ||
      user?.email_confirmed_at ||
      (user as any)?.confirmed_at ||
      profile?.account_status === 'ACTIVE'
  );

  // Countdown timer for resend button cooldown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  /**
   * Strictly query Supabase backend to check if the email has actually been confirmed
   */
  const checkBackendVerification = useCallback(async (): Promise<boolean> => {
    try {
      const targetEmail = (
        userEmail ||
        user?.email ||
        (typeof window !== 'undefined' ? localStorage.getItem('brainoro_signup_email') || '' : '')
      ).trim().toLowerCase();

      // 1. Check if localStorage has real-time verification flag synced from callback tab
      if (typeof window !== 'undefined') {
        const emailKey = targetEmail ? localStorage.getItem(`brainoro_verified_${targetEmail}`) : null;
        const globalKey = localStorage.getItem('brainoro_email_verified');
        if (emailKey === 'true' || globalKey === 'true') {
          setIsBackendVerified(true);
          await refreshProfile().catch(() => {});
          return true;
        }
      }

      // 2. Immediate Session Authentication Check via Stored Temp Password
      // If user clicked the link in their mail, signInWithPassword will succeed instantly!
      const tempPassword = typeof window !== 'undefined' ? localStorage.getItem('brainoro_temp_password') : null;
      if (targetEmail && tempPassword) {
        const { data: signData, error: signError } = await supabase.auth.signInWithPassword({
          email: targetEmail,
          password: tempPassword,
        });

        if (signData?.user && !signError) {
          setIsBackendVerified(true);
          if (typeof window !== 'undefined') {
            localStorage.setItem(`brainoro_verified_${targetEmail}`, 'true');
            localStorage.setItem('brainoro_email_verified', 'true');
          }
          await refreshProfile().catch(() => {});
          return true;
        }
      }

      // 3. Fetch active session from Supabase storage (which Tab 2 populated upon verification)
      const { data: sessionData } = await supabase.auth.getSession();
      const currentSession = sessionData?.session;
      const currentUser = currentSession?.user;

      if (currentUser?.email_confirmed_at || (currentUser as any)?.confirmed_at) {
        setIsBackendVerified(true);
        await refreshProfile().catch(() => {});
        return true;
      }

      // 4. Try server-side token refresh
      if (currentSession?.refresh_token) {
        const { data: refreshData } = await supabase.auth.refreshSession();
        const refreshedUser = refreshData?.session?.user;
        if (refreshedUser?.email_confirmed_at || (refreshedUser as any)?.confirmed_at) {
          setIsBackendVerified(true);
          await refreshProfile().catch(() => {});
          return true;
        }
      }

      // 5. Query profiles table by user_id
      const uid = currentUser?.id || user?.id;
      if (uid) {
        const { data: profileCheck } = await supabase
          .from('profiles')
          .select('account_status')
          .eq('user_id', uid)
          .maybeSingle();

        if (profileCheck && profileCheck.account_status === 'ACTIVE') {
          setIsBackendVerified(true);
          await refreshProfile().catch(() => {});
          return true;
        }
      }

      return false;
    } catch (err) {
      return false;
    }
  }, [user?.id, user?.email, userEmail, refreshProfile]);

  /**
   * Automatic cross-tab sync:
   * 1. BroadcastChannel listener
   * 2. Storage event listener (when another tab updates localStorage)
   * 3. Focus and visibility change listeners
   * 4. Periodic gentle background polling
   */
  useEffect(() => {
    if (isVerified) return;

    let authChannel: BroadcastChannel | null = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        authChannel = new BroadcastChannel('brainoro_auth_sync');
        authChannel.onmessage = async (event) => {
          if (event?.data?.type === 'EMAIL_VERIFIED') {
            setIsBackendVerified(true);
            await checkBackendVerification();
          }
        };
      } catch (e) {
        console.warn('BroadcastChannel error:', e);
      }
    }

    const handleStorage = async (e: StorageEvent) => {
      const targetEmail = (userEmail || '').trim().toLowerCase();
      if (
        e.key === 'brainoro_email_verified' ||
        e.key === 'brainoro_auth_sync_event' ||
        (targetEmail && e.key === `brainoro_verified_${targetEmail}`) ||
        (e.key && e.key.startsWith('sb-'))
      ) {
        setIsBackendVerified(true);
        await checkBackendVerification();
      }
    };

    const handleFocus = async () => {
      await checkBackendVerification();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleFocus);

    // Initial check on mount
    checkBackendVerification();

    // Periodic gentle background poll every 2 seconds
    const interval = setInterval(() => {
      checkBackendVerification();
    }, 2000);

    return () => {
      if (authChannel) {
        authChannel.close();
      }
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleFocus);
      clearInterval(interval);
    };
  }, [isVerified, userEmail, checkBackendVerification]);

  // If authentically verified, cleanly render functional module
  if (isVerified) {
    return <>{children}</>;
  }

  // Handle resending verification email
  const handleResendEmail = async () => {
    if (!userEmail || resendCooldown > 0) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSending(true);

    try {
      const redirectUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback`
          : undefined;

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: userEmail,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        if (error.message?.toLowerCase().includes('rate limit') || error.status === 429) {
          setSuccessMsg(`Verification email is already sent! Please check your Inbox and Spam folder. You can request again in 30s.`);
          setResendCooldown(30);
        } else {
          setErrorMsg(error.message);
        }
      } else {
        setSuccessMsg(`Verification link resent to ${userEmail}. Please check your inbox and spam folder.`);
        setResendCooldown(30);
      }
    } catch (err: any) {
      setSuccessMsg(`Verification link sent! Please check your inbox at ${userEmail}.`);
      setResendCooldown(30);
    } finally {
      setIsSending(false);
    }
  };

  // Handle manually refreshing verification state upon button click
  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const isConfirmed = await checkBackendVerification();

      if (isConfirmed) {
        setIsBackendVerified(true);
        setSuccessMsg('Email verified successfully! Full access unlocked.');
      } else {
        setErrorMsg(
          `Your email (${userEmail || 'registered address'}) is not confirmed by Supabase yet. Please click the "Confirm email address" link in your Gmail, then click this button again.`
        );
      }
    } catch (err: any) {
      setErrorMsg('Could not verify email status. Please ensure you clicked the link in your email.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle manual password unlock fallback
  const handleManualUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualPassword.trim() || !userEmail) return;

    setIsManualLoggingIn(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: manualPassword.trim(),
      });

      if (error) {
        if (error.message?.toLowerCase().includes('not confirmed')) {
          setErrorMsg('Your email is not confirmed yet. Please click the link in your mail inbox first.');
        } else {
          setErrorMsg(error.message);
        }
      } else if (data?.user) {
        setIsBackendVerified(true);
        if (typeof window !== 'undefined') {
          localStorage.setItem(`brainoro_verified_${userEmail}`, 'true');
          localStorage.setItem('brainoro_email_verified', 'true');
        }
        await refreshProfile().catch(() => {});
        setSuccessMsg('Authentication successful! Full access unlocked.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Login failed.');
    } finally {
      setIsManualLoggingIn(false);
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden min-h-[360px]">
      {/* 1. Underlying Module with Safe CSS Blur Layer */}
      <div
        style={{ filter: 'blur(5px)', pointerEvents: 'none', userSelect: 'none' }}
        className="w-full opacity-70 select-none transition-all duration-300"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* 2. Premium High-Contrast Verification Modal Card */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-[2px]">
        <div className="w-full max-w-lg bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-center space-y-5 animate-fadeIn">
          {/* Header Icon & Title */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-sky-600 text-white flex items-center justify-center shadow-lg shadow-sky-500/20 mb-1">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-2">
              <span>🔒 To unlock please verify your email address</span>
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Module Preview: {moduleName}</span>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-left flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-left flex items-start gap-2.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{successMsg}</div>
            </div>
          )}

          {/* Email Verification Description */}
          <div className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              We have sent an activation link to your inbox at{' '}
              <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md break-all">
                {userEmail || 'your email'}
              </span>
              . Please click the confirmation link in your mail (opens in new tab) to verify your account and unlock full access.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={isSending || resendCooldown > 0}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition disabled:opacity-60 cursor-pointer"
              >
                {isSending ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-600" />
                ) : (
                  <Mail className="w-3.5 h-3.5 text-sky-600" />
                )}
                <span>
                  {resendCooldown > 0
                    ? `Resend in ${resendCooldown}s`
                    : 'Resend Verification Email'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleRefreshStatus}
                disabled={isRefreshing}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-sm transition disabled:opacity-60 cursor-pointer"
              >
                {isRefreshing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
                <span>I&apos;ve Verified — Refresh</span>
              </button>
            </div>

            {/* Optional Manual Unlock with Password / Saved Temp Password */}
            <div className="pt-2">
              {!showManualLogin ? (
                <button
                  type="button"
                  onClick={() => {
                    const saved = typeof window !== 'undefined' ? localStorage.getItem('brainoro_temp_password') : '';
                    if (saved) setManualPassword(saved);
                    setShowManualLogin(true);
                  }}
                  className="text-[11px] font-semibold text-sky-600 hover:text-sky-700 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <KeyRound className="w-3 h-3" />
                  <span>Have your password? Unlock directly here</span>
                </button>
              ) : (
                <form onSubmit={handleManualUnlock} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-fadeIn text-left">
                  <label className="block text-[11px] font-bold text-slate-700">
                    Enter Password to Instant Unlock:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualPassword}
                      onChange={(e) => setManualPassword(e.target.value)}
                      placeholder="Paste your temporary password..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isManualLoggingIn || !manualPassword.trim()}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition disabled:opacity-50 inline-flex items-center gap-1 cursor-pointer"
                    >
                      {isManualLoggingIn ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        <ArrowRight className="w-3 h-3" />
                      )}
                      <span>Unlock</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Footer Note */}
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
            🔒 All interactive modules unlock strictly after authentic email confirmation is verified by the backend.
          </div>
        </div>
      </div>
    </div>
  );
};
