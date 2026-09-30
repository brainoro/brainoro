'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  createSupportTicket,
  TicketCategory,
  TicketPriority,
  OFFICIAL_SUPPORT_EMAIL,
} from '@/lib/services/supportService';
import {
  LifeBuoy,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Clock,
  HelpCircle,
} from 'lucide-react';

export default function SupportPage() {
  const { user, profile } = useAuth();

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<TicketCategory>('TECHNICAL');
  const [priority, setPriority] = useState<TicketPriority>('MEDIUM');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(user?.email || profile?.email || '');
  const [name, setName] = useState(profile?.display_name || user?.user_metadata?.full_name || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createdTicketNumber, setCreatedTicketNumber] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!subject.trim() || !message.trim() || !email.trim()) {
      setErrorMsg('Please fill in your email, query subject, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createSupportTicket({
        user_id: user?.id || null,
        user_email: email,
        user_name: name || 'Learner',
        subject,
        category,
        priority,
        message,
      });

      if (result.success && result.ticket) {
        setCreatedTicketNumber(result.ticket.ticket_number);
        setSubject('');
        setMessage('');
      } else {
        setErrorMsg(result.error || 'Could not submit ticket. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-16">
      {/* Top Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-6 px-6 sm:px-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="Back to Learning OS"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight">Brainoro Helpdesk &amp; Support</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  24/7 Academic Support
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Raise an issue, report a bug, or inquire about curriculum and subscriptions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Side: Support Channels Info */}
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <LifeBuoy className="w-4 h-4 text-sky-600" />
              <span>Official Support Channels</span>
            </div>

            <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-xs space-y-1.5">
              <span className="font-bold text-sky-900 block">Direct Support Email:</span>
              <a
                href={`mailto:${OFFICIAL_SUPPORT_EMAIL}`}
                className="font-mono text-sky-700 hover:underline break-all block font-semibold"
              >
                {OFFICIAL_SUPPORT_EMAIL}
              </a>
              <p className="text-[11px] text-sky-800 pt-1">
                Typical response window: Under 4 hours for curriculum and technical queries.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted &amp; Secure Ticket Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Automated Email Alerts on Resolution</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Direct Pedagogical Expert Review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Ticket Submission Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {createdTicketNumber ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Support Ticket Created!</h3>
                <p className="text-xs text-slate-600">
                  Your ticket tracking number is:{' '}
                  <strong className="text-slate-900 font-mono bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-200 text-sm">
                    #{createdTicketNumber}
                  </strong>
                </p>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  Our customer engineering and pedagogical team has been notified at{' '}
                  <span className="text-sky-600 font-semibold">{OFFICIAL_SUPPORT_EMAIL}</span>. You will receive an email update once your ticket is investigated.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setCreatedTicketNumber(null)}
                    className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                  <Link
                    href="/"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Return to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Submit a Support Ticket</h3>
                  <p className="text-slate-500 text-xs">
                    Please provide detailed context so we can resolve your request swiftly.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Student / Educator Name"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@school.edu"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as TicketCategory)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
                    >
                      <option value="TECHNICAL">Technical Issue / Bug</option>
                      <option value="CURRICULUM">Curriculum &amp; Questions</option>
                      <option value="BILLING">Billing &amp; Subscription</option>
                      <option value="ACCOUNT">Account &amp; Access</option>
                      <option value="OTHER">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as TicketPriority)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 cursor-pointer"
                    >
                      <option value="LOW">Low (General Query)</option>
                      <option value="MEDIUM">Medium (Standard Issue)</option>
                      <option value="HIGH">High (Impacts Practice/Exam)</option>
                      <option value="URGENT">Urgent (Account Blocked)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject / Summary</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of the query or issue"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Detailed Message</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue with full details (chapter name, question, error message, etc.)..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-xs transition cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Submitting Ticket...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Submit Support Ticket
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
