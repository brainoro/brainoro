'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import {
  Users,
  BookOpen,
  Bot,
  Clock,
  Target,
  FileText,
} from 'lucide-react';
import StartAuthCard from '@/components/landing/StartAuthCard';

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[#F3F7FD] text-slate-900 font-sans selection:bg-[#2F6BFF] selection:text-white relative overflow-x-hidden flex flex-col justify-between">
      {/* Google Identity Services SDK for 1-Click Google Sign-In */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />

      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 flex items-center justify-between">
        {/* Brand Left */}
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-md border-2 border-slate-200/90 bg-slate-900 flex items-center justify-center p-1 shrink-0 transition-transform group-hover:scale-105">
            <img
              src="/brainoro-logo.jpg"
              alt="Brainoro Logo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="flex items-baseline gap-2 sm:gap-2.5">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950 leading-none block">
              Brainoro
            </span>
            <span className="text-slate-300 font-light text-xl sm:text-2xl">|</span>
            <span className="text-lg sm:text-2xl font-bold text-slate-800 font-caveat tracking-wide">
              Own your Prep.
            </span>
          </div>
        </Link>

        {/* Brand Right */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Powered by OcaVerse</span>
            <span className="text-slate-300">|</span>
            <a
              href="https://ocaverse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-85 transition-opacity"
              title="OcaVerse"
            >
              <img
                src="/ocaverse-logo.png"
                alt="OcaVerse Logo"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </a>
          </div>

          <Link
            href="/login"
            className="px-4 py-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-2xs"
          >
            Log in
          </Link>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-grow flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Headings, Tags, Benefits & Photo */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* 1. Audience Tags */}
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xs">
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span>For parents: dedicated parent portal to monitor progress</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#02B8D4] text-white shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>For students: cheat sheets and exam trap alerts</span>
              </span>
            </div>

            {/* 2. Hero Headline */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08]">
                No More Exam Stress.
              </h1>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#2F6BFF] tracking-tight leading-[1.08]">
                Revise Anything in <span className="whitespace-nowrap">5&nbsp;Minutes!</span>
              </h2>
            </div>

            {/* Mobile-only: Display signup card here so it appears right under headline */}
            <div className="block lg:hidden pt-2 pb-4">
              <StartAuthCard />
            </div>

            {/* 3. Core Pedagogical Benefits List with Student Photo */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              {/* Feature Points List */}
              <div className="sm:col-span-7 space-y-4">
                {/* Feature 1 */}
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2F6BFF] shrink-0 mt-2" />
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded-lg bg-sky-100 text-[#2F6BFF]">
                      <Bot className="w-4 h-4" />
                    </span>
                    <span className="text-base font-extrabold text-slate-900">
                      Chapter AI Twin <span className="text-slate-600 font-semibold">(Talk to Chapter)</span>
                    </span>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2F6BFF] shrink-0 mt-2" />
                  <div className="flex items-start gap-2.5">
                    <span className="p-1.5 rounded-xl bg-blue-100 text-[#2F6BFF] shrink-0">
                      <Clock className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                        5-Minute Visual Cards
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Revise high-yield topics super-fast
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2F6BFF] shrink-0 mt-2" />
                  <div className="flex items-start gap-2.5">
                    <span className="p-1.5 rounded-xl bg-rose-100 text-rose-600 shrink-0">
                      <Target className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                        Avoid Exam Traps
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600">
                        Save easy marks by spotting tricky common mistakes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2F6BFF] shrink-0 mt-2" />
                  <div className="flex items-start gap-2.5">
                    <span className="p-1.5 rounded-xl bg-purple-100 text-purple-600 shrink-0">
                      <FileText className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                        Printable Cheat Sheets
                      </p>
                      <p className="text-xs sm:text-sm text-slate-600">
                        One-click screen-free revision for physical study
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student Photo Section */}
              <div className="sm:col-span-5 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden border-2 border-white shadow-xl shadow-sky-900/15 w-full max-w-[280px] sm:max-w-[320px] bg-slate-100 flex items-center justify-center">
                  <img
                    src="/start/students.webp"
                    alt="Students preparing with Brainoro visual revision notes and cheat sheets"
                    className="w-full h-auto object-cover rounded-2xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/15 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Desktop Registration Form Card */}
          <div className="hidden lg:block lg:col-span-5">
            <StartAuthCard />
          </div>
        </div>
      </main>

      {/* Clean Minimalist Sub-Footer */}
      <footer className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-xs text-slate-700 font-medium border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <p>© {new Date().getFullYear()} Brainoro. All rights reserved.</p>
          <span className="text-slate-300">•</span>
          <Link href="/privacy" className="text-slate-600 hover:text-slate-900 font-medium underline transition">
            Privacy Policy
          </Link>
        </div>
        <p className="text-xs text-slate-600 font-medium">
          CBSE, Cambridge, and IB MYP curricula referenced strictly for syllabus alignment.
        </p>
      </footer>
    </div>
  );
}
