'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  createSupportTicket,
  TicketCategory,
  TicketPriority,
  OFFICIAL_SUPPORT_EMAIL,
} from '@/lib/services/supportService';
import {
  HelpCircle,
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  MessageSquare,
  Sparkles,
  Shield,
  LifeBuoy,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportTicketModal: React.FC<Props> = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

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
        setErrorMsg(result.error || 'Could not submit ticket. Please try again or email us directly.');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCreatedTicketNumber(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Ribbon */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">Brainoro Helpdesk</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Direct Support
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Official assistance from our academic &amp; engineering team
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {createdTicketNumber ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Support Ticket Created Successfully!</h4>
              <p className="text-xs text-slate-600">
                Your ticket tracking number is:{' '}
                <strong className="text-slate-900 font-mono bg-emerald-100 px-2 py-1 rounded-md border border-emerald-200 text-sm">
                  #{createdTicketNumber}
                </strong>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                A confirmation has been logged. Our support desk (<span className="text-sky-600 font-semibold">{OFFICIAL_SUPPORT_EMAIL}</span>) will review and update you shortly.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Official Email Notice */}
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between text-[11px] text-sky-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Official Support Email: <strong>{OFFICIAL_SUPPORT_EMAIL}</strong></span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Learner / Parent Name"
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
                  placeholder="e.g. Issue loading Class 10 Real Numbers practice set"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please provide details about what happened or what you need help with..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold shadow-xs transition cursor-pointer disabled:opacity-60"
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
  );
};

export default SupportTicketModal;
