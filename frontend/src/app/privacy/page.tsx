import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy - Brainoro',
  description: 'Privacy Policy for Brainoro AI study app by OcaVerse. Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl overflow-hidden shadow-xs border border-slate-700 bg-slate-900 flex items-center justify-center p-0.5 shrink-0 transition-transform group-hover:scale-105">
              <img
                src="/brainoro-logo.jpg"
                alt="Brainoro Logo"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-white leading-none block">
                Brainoro
              </span>
              <span className="text-xs font-bold text-sky-400 font-caveat tracking-wide">
                Own your Prep.
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800/80 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Privacy Policy Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex-grow w-full">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8">
          {/* Header section */}
          <div className="border-b border-slate-800 pb-6 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Policy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Privacy Policy - Brainoro (by OcaVerse)
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Last updated: October 9, 2026
            </p>
          </div>

          {/* Section 1 */}
          <section className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs flex items-center justify-center font-mono">1</span>
              Who we are
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Brainoro is an AI study app operated by <strong>OcaVerse Technologies</strong>, India.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed flex flex-wrap items-center gap-2">
              <span>Contact:</span>
              <a href="mailto:support@brainoro.com" className="text-sky-400 hover:underline font-medium inline-flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> support@brainoro.com
              </a>
              <span className="text-slate-600">•</span>
              <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline font-medium">
                WhatsApp Support
              </a>
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs flex items-center justify-center font-mono">2</span>
              What information we collect
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-300 leading-relaxed pl-1">
              <li><strong>From our ads and forms:</strong> parent&apos;s name, phone number, child&apos;s class and board.</li>
              <li><strong>When you use the app:</strong> account details, study activity (chapters revised, quiz results) and device information.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs flex items-center justify-center font-mono">3</span>
              Why we collect it
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-300 leading-relaxed pl-1">
              <li>To send you the free trial link and contact you about Brainoro.</li>
              <li>To run and improve the app and show progress in the parent portal.</li>
              <li>To answer your questions and give support.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs flex items-center justify-center font-mono">4</span>
              Children&apos;s data
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Brainoro is used by school students. Accounts for children are created with a parent&apos;s or guardian&apos;s consent. We do not show ads to children inside the app.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs flex items-center justify-center font-mono">5</span>
              Sharing
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We do not sell your personal data. We share data only with service providers who help us run the app (for example hosting, messaging and analytics), and only when required by law.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs flex items-center justify-center font-mono">6</span>
              Data security and retention
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We use reasonable security measures. We keep your data only as long as needed for the purposes above, or as required by law.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs flex items-center justify-center font-mono">7</span>
              Your rights
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              You can ask us to access, correct or delete your data, or withdraw your consent, at any time by writing to{' '}
              <a href="mailto:support@brainoro.com" className="text-sky-400 hover:underline font-semibold">
                support@brainoro.com
              </a>.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-2.5">
            <h2 className="text-lg sm:text-xl font-bold text-sky-300 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-800 text-sky-400 text-xs flex items-center justify-center font-mono">8</span>
              Changes
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We may update this policy. The latest version will always be on this page.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Brainoro (by OcaVerse). All rights reserved.</p>
      </footer>
    </div>
  );
}
