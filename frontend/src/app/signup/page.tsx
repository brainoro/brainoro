'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase/client';
import {
  Mail,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Edit2,
  RefreshCw,
} from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { trackLeadOnce } from '@/lib/metaPixel';

export default function SignUpPage() {
  const router = useRouter();
  const { signInWithOtp, verifyOtp, user, profile } = useAuth();

  const [step, setStep] = useState<'EMAIL' | 'OTP'>('EMAIL');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Pre-fill email from URL search params if provided
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get('email');
      if (emailParam) {
        setEmail(emailParam.trim());
      }
    }
  }, []);

  // If already authenticated with active profile, redirect immediately
  useEffect(() => {
    if (user && profile?.account_status === 'ACTIVE') {
      if (profile.onboarding_completed) {
        router.replace('/');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [user, profile, router]);

  // Resend countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Step 1: Request 6-Digit OTP Code
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('brainoro_signup_email', trimmedEmail);
      }

      const { error } = await signInWithOtp(trimmedEmail);

      if (error) {
        if (error.message?.toLowerCase().includes('rate limit') || error.status === 429) {
          setErrorMsg('Verification code was recently requested. Please check your inbox or wait 30s.');
        } else {
          setErrorMsg(error.message || 'Could not send verification code. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      setStep('OTP');
      setResendCooldown(45);
      setSuccessMsg(`We have sent a 6-digit verification code to ${trimmedEmail}. Please check your inbox (and spam folder).`);
      
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred while requesting OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Handle OTP input changes across 6 boxes
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pastedCode = value.replace(/\D/g, '').slice(0, 6);
      if (pastedCode.length > 0) {
        const newOtp = [...otpCode];
        for (let i = 0; i < 6; i++) {
          newOtp[i] = pastedCode[i] || '';
        }
        setOtpCode(newOtp);
        const focusIndex = Math.min(pastedCode.length, 5);
        inputRefs.current[focusIndex]?.focus();

        if (pastedCode.length === 6) {
          submitOtp(newOtp.join(''));
        }
      }
      return;
    }

    const digit = value.replace(/\D/g, '');
    const newOtp = [...otpCode];
    newOtp[index] = digit;
    setOtpCode(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    const completeCode = newOtp.join('');
    if (completeCode.length === 6) {
      submitOtp(completeCode);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP and complete instant session login
  const submitOtp = async (codeToVerify?: string) => {
    setErrorMsg(null);
    const finalCode = (codeToVerify || otpCode.join('')).trim();

    if (finalCode.length !== 6) {
      setErrorMsg('Please enter all 6 digits of your verification code.');
      return;
    }

    setIsSubmitting(true);
    try {
      const trimmedEmail = email.trim().toLowerCase();
      const { data, error } = await verifyOtp(trimmedEmail, finalCode);

      if (error) {
        setErrorMsg('Invalid or expired verification code. Please check and try again.');
        setIsSubmitting(false);
        return;
      }

      const verifiedUser = data?.user;
      if (!verifiedUser) {
        throw new Error('Verification completed, but session could not be established.');
      }

      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('user_id, onboarding_completed')
        .eq('user_id', verifiedUser.id)
        .maybeSingle();

      if (!existingProfile) {
        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + 7);

        await supabase.from('profiles').upsert(
          {
            user_id: verifiedUser.id,
            email: verifiedUser.email || trimmedEmail,
            display_name: verifiedUser.email?.split('@')[0] || 'Learner',
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

      if (typeof window !== 'undefined') {
        localStorage.setItem('brainoro_email_verified', 'true');
        localStorage.setItem(`brainoro_verified_${trimmedEmail}`, 'true');
        trackLeadOnce();
      }

      if (!existingProfile || !existingProfile.onboarding_completed) {
        router.replace('/onboarding');
      } else {
        router.replace('/');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Verification failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-full min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-slate-50 flex flex-col justify-center items-center px-3 sm:px-4 font-sans select-none">
      {/* Google Identity Services SDK */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

      {/* Top Left OcaVerse Watermark */}
      <div className="absolute top-3 left-4 sm:top-4 sm:left-6 z-10">
        <a
          href="https://ocaverse.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-90 transition-opacity"
          title="OcaVerse - Own Complete Automation"
        >
          <img
            src="/ocaverse-logo.png"
            alt="OcaVerse - Own Complete Automation"
            className="h-5 sm:h-7 w-auto object-contain"
          />
        </a>
      </div>

      {/* Header / Logo */}
      <div className="text-center mb-2 sm:mb-2.5">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-900 flex items-center justify-center p-0.5 flex-shrink-0">
            <img
              src="/brainoro-logo.jpg"
              alt="Brainoro Logo"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="text-left">
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none">
              Brainoro
            </h1>
            <p className="text-[11px] sm:text-xs font-bold text-sky-600 tracking-wide font-caveat">
              Own your Prep.
            </p>
          </div>
        </div>
        <h2 className="mt-0.5 text-center text-[10px] sm:text-[11px] font-medium text-slate-500">
          Create your authoritative cognitive learner account
        </h2>
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-[360px] sm:max-w-[380px]">
        <div className="bg-white py-3.5 px-4 sm:py-4.5 sm:px-5 shadow-sm border border-slate-200 rounded-2xl">
          {errorMsg && (
            <div className="mb-2 p-2 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-1.5 text-rose-800 text-[11px] leading-snug animate-fadeIn">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          {successMsg && step === 'OTP' && (
            <div className="mb-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-1.5 text-emerald-800 text-[11px] leading-snug animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>{successMsg}</div>
            </div>
          )}

          {step === 'EMAIL' ? (
            <div className="space-y-2.5">
              {/* 1. VISUAL HIERARCHY: Primary Google Action at Top */}
              <div>
                <GoogleSignInButton
                  buttonText="Continue with Google"
                  text="continue_with"
                  size="large"
                  redirectTo="/onboarding"
                  onSuccess={() => {
                    trackLeadOnce();
                  }}
                />
              </div>

              {/* Clean Divider Line */}
              <div className="relative my-1.5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400 font-bold tracking-wider text-[9px]">
                    — OR SIGN UP WITH EMAIL —
                  </span>
                </div>
              </div>

              {/* 2. TWO-STEP PASSWORDLESS MANUAL FORM */}
              <form className="space-y-2.5" onSubmit={handleRequestOtp}>
                <div>
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative rounded-xl shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@school.edu"
                      className="block w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                      autoFocus
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Get 6-Digit Verification Code</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: ENTER 6-DIGIT OTP CODE */
            <div className="space-y-2.5 animate-fadeIn">
              <div className="text-center space-y-0.5">
                <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mx-auto mb-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900">Enter Verification Code</h3>
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500">
                  <span>Sent to</span>
                  <span className="font-bold text-slate-800">{email}</span>
                  <button
                    type="button"
                    onClick={() => setStep('EMAIL')}
                    className="text-sky-600 hover:text-sky-700 p-0.5 rounded ml-0.5 inline-flex items-center"
                    title="Change Email"
                  >
                    <Edit2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {/* 6-Box OTP Input */}
              <div className="flex justify-center items-center gap-1.5 my-1">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-9 h-11 sm:w-10 sm:h-12 text-center text-sm font-black font-mono bg-slate-50 border-2 border-slate-200 focus:border-sky-500 focus:bg-white rounded-lg text-slate-900 outline-none transition"
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => submitOtp()}
                disabled={isSubmitting || otpCode.join('').length !== 6}
                className="w-full py-2 px-3 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue to Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              {/* Resend OTP button */}
              <div className="text-center flex items-center justify-center gap-1 text-[10px] text-slate-500">
                <span>Didn&apos;t receive code?</span>
                <button
                  type="button"
                  onClick={() => handleRequestOtp()}
                  disabled={isSubmitting || resendCooldown > 0}
                  className="font-bold text-sky-600 hover:text-sky-700 disabled:opacity-50 inline-flex items-center gap-0.5 cursor-pointer"
                >
                  {resendCooldown > 0 ? (
                    <span>Resend in {resendCooldown}s</span>
                  ) : (
                    <>
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Resend Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Clean Footer Link - Consistent Naming */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 text-center text-[11px] text-slate-500">
            {step === 'EMAIL' ? (
              <p>
                Already have an account?{' '}
                <Link href={`/login${email ? `?email=${encodeURIComponent(email)}` : ''}`} className="font-bold text-sky-600 hover:text-sky-700">
                  Log in here
                </Link>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setStep('EMAIL')}
                className="font-bold text-slate-600 hover:text-slate-800 transition text-[10px]"
              >
                ← Use a different email address
              </button>
            )}
            <div className="mt-1 pt-1 border-t border-slate-50 text-[10px] text-slate-400">
              <Link href="/privacy" className="hover:text-slate-600 hover:underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
