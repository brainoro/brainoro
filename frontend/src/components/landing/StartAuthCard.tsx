'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  KeyRound,
} from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { trackLeadOnce } from '@/lib/metaPixel';

export default function StartAuthCard() {
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

  // Step 1: Request 6-Digit OTP Code directly via Supabase Auth & Brevo SMTP
  const handleRequestOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setErrorMsg('Enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
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
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-sky-900/5 border border-slate-100/90">
      {/* Top Curriculum Badge */}
      <div className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase bg-amber-100/80 text-amber-900 border border-amber-200/60 shadow-2xs">
          CBSE | Cambridge | IB
        </span>
      </div>

      {/* Heading */}
      <div className="text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 leading-tight">
          Start your 7-day free trial
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-700 font-medium flex items-center justify-center gap-1.5">
          <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>Get instant access. No ads. No credit card needed to register.</span>
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-800 text-xs leading-snug animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div>{errorMsg}</div>
        </div>
      )}

      {successMsg && step === 'OTP' && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-emerald-800 text-xs leading-snug animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>{successMsg}</div>
        </div>
      )}

      {step === 'EMAIL' ? (
        <div className="space-y-4">
          {/* Primary 1-Click Google Sign-In */}
          <div className="w-full flex justify-center">
            <GoogleSignInButton
              className="w-full"
              buttonText="Continue with Google"
              text="continue_with"
              size="large"
              redirectTo="/"
            />
          </div>

          {/* Divider */}
          <div className="relative my-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-slate-600 font-semibold tracking-wide text-xs">
                or register with your email
              </span>
            </div>
          </div>

          {/* Email OTP Form */}
          <form className="space-y-3.5" onSubmit={handleRequestOtp}>
            <div className="relative rounded-2xl shadow-2xs">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="student@school.edu"
                className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200/90 rounded-2xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2F6BFF]/20 focus:border-[#2F6BFF] transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[48px] py-3.5 px-6 bg-[#2F6BFF] hover:bg-[#2057e6] text-white text-base font-bold rounded-2xl shadow-md shadow-[#2F6BFF]/25 hover:shadow-lg hover:shadow-[#2F6BFF]/30 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending code...</span>
                </>
              ) : (
                <>
                  <span>Start 7-day free trial</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Helper info */}
          <p className="text-center text-xs text-slate-700 font-medium">
            Takes 1 minute • We&apos;ll email you a 6-digit access code.
          </p>
        </div>
      ) : (
        /* STEP 2: ENTER 6-DIGIT OTP CODE */
        <div className="space-y-4 animate-fadeIn">
          <div className="text-center space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mx-auto mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Enter 6-Digit Verification Code</h3>
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <span>Sent to</span>
              <span className="font-bold text-slate-800">{email}</span>
              <button
                type="button"
                onClick={() => setStep('EMAIL')}
                className="text-[#2F6BFF] hover:text-blue-700 p-0.5 rounded ml-0.5 inline-flex items-center"
                title="Change Email"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* 6-Box OTP Input */}
          <div className="flex justify-center items-center gap-2 my-2">
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
                className="w-10 h-12 sm:w-11 sm:h-13 text-center text-lg font-black font-mono bg-slate-50 border-2 border-slate-200 focus:border-[#2F6BFF] focus:bg-white rounded-xl text-slate-900 outline-none transition"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => submitOtp()}
            disabled={isSubmitting || otpCode.join('').length !== 6}
            className="w-full min-h-[48px] py-3 px-4 bg-[#2F6BFF] hover:bg-[#2057e6] text-white text-sm font-bold rounded-2xl shadow-md shadow-[#2F6BFF]/25 hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying code...</span>
              </>
            ) : (
              <>
                <span>Verify & Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center flex items-center justify-center gap-1.5 text-xs text-slate-500">
            <span>Didn&apos;t receive code?</span>
            <button
              type="button"
              onClick={() => handleRequestOtp()}
              disabled={isSubmitting || resendCooldown > 0}
              className="font-bold text-[#2F6BFF] hover:text-blue-700 disabled:opacity-50 inline-flex items-center gap-1 cursor-pointer"
            >
              {resendCooldown > 0 ? (
                <span>Resend in {resendCooldown}s</span>
              ) : (
                <>
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend code</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
