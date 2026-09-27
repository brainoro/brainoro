'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase/client';
import {
  User as UserIcon,
  Mail,
  GraduationCap,
  Clock,
  CreditCard,
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  X,
  School,
  Loader2,
  AlertCircle,
  BookOpen,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { user, profile, daysLeftInTrial, refreshProfile } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isSubscribed = profile?.subscription_status === 'active';
  const boardName = profile?.board_id || profile?.curriculum || 'CBSE';
  const gradeLevel = profile?.grade_level || profile?.grade || 6;

  const handleSubscribeNow = async () => {
    setIsProcessing(true);
    setErrorMsg(null);

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
        // If route fails, fallback to navigating to billing page
        router.push('/billing');
        return;
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
          try {
            // Instant verification & DB update
            await fetch('/api/billing/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_subscription_id: response.razorpay_subscription_id,
                razorpay_signature: response.razorpay_signature,
                userId: user?.id,
                email: user?.email,
              }),
            });

            // Fallback direct update to profiles table
            if (user?.id) {
              await supabase
                .from('profiles')
                .update({
                  subscription_status: 'active',
                  updated_at: new Date().toISOString(),
                })
                .eq('user_id', user.id);
            }
          } catch (verifErr) {
            console.warn('Verification call warning:', verifErr);
          }

          if (refreshProfile) {
            await refreshProfile();
          }
          setIsProcessing(false);
          onClose();
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
      console.error('Subscription error in modal:', err);
      // Fallback navigate to /billing
      router.push('/billing');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-slate-900 animate-scaleUp relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-lg">
              {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : <UserIcon className="w-6 h-6" />}
            </div>
            <div>
              <h2 id="account-modal-title" className="text-lg font-bold text-white flex items-center gap-2">
                <span>{profile?.display_name || 'My Account'}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-sky-300 border border-sky-500/30">
                  {profile?.role || 'STUDENT'}
                </span>
              </h2>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{user?.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          {/* User Details Grid */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Enrolled Curriculum &amp; Academic Profile
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-sky-600 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-[11px]">Active Board</div>
                  <div className="font-bold text-slate-900">{boardName}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <div className="text-slate-500 text-[11px]">Grade / Class</div>
                  <div className="font-bold text-slate-900">Class {gradeLevel}</div>
                </div>
              </div>

              {profile?.institution_name && (
                <div className="flex items-start gap-2 col-span-2 pt-1 border-t border-slate-200/60">
                  <School className="w-4 h-4 text-indigo-600 mt-0.5" />
                  <div>
                    <div className="text-slate-500 text-[11px]">Institution / School</div>
                    <div className="font-semibold text-slate-800">{profile.institution_name}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Subscription & Remaining Days Section */}
          <div className="border border-slate-200 rounded-2xl p-4 space-y-3 bg-gradient-to-br from-slate-50 to-sky-50/40">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-sky-600" />
                <span>Subscription Plan</span>
              </div>
              {isSubscribed ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Active Pro
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  7-Day Trial
                </span>
              )}
            </div>

            {isSubscribed ? (
              <div className="space-y-2">
                <div className="text-sm font-bold text-slate-900 flex items-center justify-between">
                  <span>Brainoro OS Pro Membership</span>
                  <span className="text-xs text-emerald-700 font-bold">₹999 / mo</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your Pro monthly membership is active with unlimited statutory textbook access, worked examples, AI Twin tutor, and psychometric practice for <strong>{boardName} Class {gradeLevel}</strong>.
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Auto-renewing active membership
                  </span>
                  <button
                    onClick={() => {
                      onClose();
                      router.push('/billing');
                    }}
                    className="text-sky-600 hover:text-sky-700 font-bold hover:underline"
                  >
                    View Plan Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="text-sm font-bold text-slate-900">
                    {daysLeftInTrial !== null ? (
                      <span className="text-amber-700">
                        {daysLeftInTrial === 0 ? 'Trial expires today' : `${daysLeftInTrial} day${daysLeftInTrial === 1 ? '' : 's'} remaining`}
                      </span>
                    ) : (
                      'Free Trial Active'
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Standard ₹999/mo</span>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.max(10, Math.min(100, ((daysLeftInTrial ?? 7) / 7) * 100))}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  You can subscribe anytime before your trial ends to ensure uninterrupted learning and access to all curriculum features.
                </p>

                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="pt-1 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={handleSubscribeNow}
                    disabled={isProcessing}
                    className="w-full sm:flex-1 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Opening Checkout...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5 text-amber-300" />
                        <span>Subscribe Now (₹999/mo)</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      router.push('/billing');
                    }}
                    className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
                  >
                    View Plans
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure 256-bit encryption • Powered by Razorpay</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-200/60 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
