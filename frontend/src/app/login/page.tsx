'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LogIn, AlertCircle, Sparkles, Mail, Lock, Loader2, LifeBuoy } from 'lucide-react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';

export default function LoginPage() {
  const router = useRouter();
  const { signIn, profile, onboardingCompleted, accountStatus } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setErrorMsg(error.message);
        setIsSubmitting(false);
        return;
      }

      // Check account status and onboarding after sign-in
      if (accountStatus === 'PENDING_VERIFICATION') {
        setErrorMsg('Your email is pending verification. Please check your inbox for the confirmation link.');
        setIsSubmitting(false);
        return;
      }

      if (accountStatus === 'SUSPENDED') {
        setErrorMsg('Your account has been suspended. Please contact your customer administrator.');
        setIsSubmitting(false);
        return;
      }

      if (accountStatus === 'DEACTIVATED') {
        setErrorMsg('Your account has been deactivated.');
        setIsSubmitting(false);
        return;
      }

      if (!onboardingCompleted) {
        router.push('/onboarding');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred during sign in.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      {/* Google Identity Services (GIS) Client SDK */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

      {/* Top Left OcaVerse Logo */}
      <div className="absolute top-5 left-5 sm:top-7 sm:left-8 z-10">
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
            className="h-9 sm:h-11 w-auto object-contain"
          />
        </a>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex flex-row items-center justify-center gap-3.5">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-md border border-slate-200/80 bg-slate-900 flex items-center justify-center p-1 flex-shrink-0">
            <img
              src="/brainoro-logo.jpg"
              alt="Brainoro Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="text-left">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
              Brainoro
            </h1>
            <p className="text-base font-bold text-sky-600 tracking-wide font-caveat -mt-0.5">
              Own your Prep.
            </p>
          </div>
        </div>
        <h2 className="mt-3 text-center text-xs sm:text-sm font-medium text-slate-500">
          The Authoritative Cognitive Learning OS
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs leading-relaxed animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@school.edu"
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Sign-in Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-bold tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google OAuth Button */}
          <GoogleSignInButton />

          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col items-center gap-3 text-center">
            <p className="text-xs text-slate-500">
              Don&apos;t have an account yet?{' '}
              <Link href="/signup" className="font-bold text-sky-600 hover:text-sky-700 transition">
                Create an account
              </Link>
            </p>
            <Link
              href="/support"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-sky-600 transition bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-sky-500" />
              <span>Need help? Visit Helpdesk & Raise Ticket</span>
            </Link>
          </div>
        </div>

        {/* Footer Copyright & OcaVerse Hyperlink */}
        <footer className="mt-6 text-center text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Brainoro - Own your Prep — Powered by{' '}
            <a
              href="https://ocaverse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-600 hover:text-sky-700 font-semibold transition hover:underline"
            >
              OcaVerse.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
