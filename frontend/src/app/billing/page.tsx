'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  CreditCard,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  LogOut,
  Zap,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export default function BillingPage() {
  const router = useRouter();
  const { user, profile, isTrialExpired, refreshProfile, signOut } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    setErrorMsg(null);
    setCheckoutMessage(null);

    try {
      // 1. Ensure Razorpay checkout script is loaded
      if (typeof window !== 'undefined' && !(window as any).Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Razorpay payment SDK'));
          document.body.appendChild(script);
        });
      }

      // 2. Call backend route to create subscription
      const res = await fetch('/api/billing/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          email: user?.email,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.subscription_id) {
        throw new Error(data.error || 'Failed to initialize subscription with Razorpay.');
      }

      // 3. Open Razorpay modal
      const options = {
        key: data.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        subscription_id: data.subscription_id,
        name: 'Brainoro OS',
        description: 'Brainoro OS Pro Monthly Subscription (₹999/mo)',
        image: '/brainoro-logo.png',
        prefill: {
          name: profile?.display_name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#0284c7',
        },
        handler: async function (response: any) {
          setCheckoutMessage('Payment successful! Activating your subscription...');
          if (refreshProfile) {
            await refreshProfile();
          }
          setTimeout(() => {
            router.push('/');
          }, 1500);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setErrorMsg(resp?.error?.description || 'Payment failed. Please try another payment method.');
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Subscription checkout error:', err);
      setErrorMsg(err.message || 'Unable to open checkout modal. Please check your network connection.');
      setIsProcessing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-900">
      {/* Razorpay Checkout SDK */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      {/* Top Navigation */}
      <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/brainoro-logo.png"
              alt="Brainoro - Own your Prep."
              width={160}
              height={56}
              unoptimized
              className="h-12 sm:h-14 w-auto rounded-xl object-contain"
            />
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscription &amp; Billing</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="text-xs text-slate-400 hidden md:inline">
                Signed in as <strong className="text-slate-200">{user.email}</strong>
              </span>
            )}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/30 transition cursor-pointer"
              title="Sign out of current account"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Billing Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 flex flex-col justify-center">
        {/* Expiration Banner / Status Badge */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-rose-400" />
            <span>{isTrialExpired ? '7-Day Free Trial Expired' : 'Trial Access Gate'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isTrialExpired
              ? 'Your 7-Day Free Trial Has Expired'
              : 'Upgrade to Unlimited Brainoro OS Access'}
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Unlock uninterrupted cognitive mastery with verified textbooks, AI Twin personal tutor, and adaptive psychometric exam simulations across all boards.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center relative z-10">
            {/* Left Col: Plan & Price */}
            <div className="md:col-span-2 space-y-4 border-b md:border-b-0 md:border-r border-slate-700/60 pb-6 md:pb-0 md:pr-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>All-Inclusive Pro Plan</span>
              </div>

              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-white">₹999</span>
                  <span className="text-slate-400 text-sm font-medium">/ month</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">Cancel or switch anytime. No hidden charges.</p>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  onClick={handleSubscribe}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Opening Razorpay...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Subscribe for ₹999/month</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {errorMsg && (
                  <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {checkoutMessage && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs text-center animate-fadeIn font-semibold">
                    {checkoutMessage}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>256-Bit SSL Encrypted &amp; Secure Checkout</span>
              </div>
            </div>

            {/* Right Col: Features Checklist */}
            <div className="md:col-span-3 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Everything Included in Brainoro OS Pro:
              </h3>

              <ul className="space-y-2.5">
                {[
                  'Full access to all 564+ Chapters (Grades 6–10 Math, Physics, Chemistry, Biology)',
                  'Complete board alignment: CBSE, Cambridge (IGCSE), and IB MYP Inquiry Frameworks',
                  'AI Twin 24/7 Cognitive Tutor with Socratic hints and step-by-step proof validation',
                  'Interactive Visual Cheat Sheets, Cornell Note-taking System, & 5-Second Mind Hacks',
                  'IRT-Powered Adaptive Testing Engine with real Previous Year Exam Questions (PYQs)',
                  'Full Spaced Repetition (Leitner 5-Box) memory consolidation and mastery tracking',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-500 space-y-2">
          <p>
            Need help or have an institutional license? Contact our support team at{' '}
            <a href="mailto:support@brainoro.com" className="text-sky-400 hover:underline">
              support@brainoro.com
            </a>
          </p>
          <p>© {new Date().getFullYear()} Brainoro OS — Powered by OcaVerse. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
