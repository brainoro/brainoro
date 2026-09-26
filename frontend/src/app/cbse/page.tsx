'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CbseCurriculumNavigator } from '../../components/cbse/CbseCurriculumNavigator';
import { CbseAuthoritativeConcept, CbseSection, CbseCurriculumContext } from '../../lib/types/cbseCurriculum';
import { ArrowLeft, Layers, GraduationCap, Sparkles } from 'lucide-react';

export default function CbseCurriculumPage() {
  const [activeConcept, setActiveConcept] = useState<CbseAuthoritativeConcept | null>(null);
  const [activeSection, setActiveSection] = useState<CbseSection | null>(null);

  const handleSelectConcept = (concept: CbseAuthoritativeConcept, section?: CbseSection) => {
    setActiveConcept(concept);
    if (section) setActiveSection(section);
  };

  const handleLearnClick = (concept: CbseAuthoritativeConcept) => {
    setActiveConcept(concept);
    // Smooth scroll down to learning hub or trigger learning modal
    const el = document.getElementById('cbse-learning-preview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Dedicated CBSE Header */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-3.5 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition flex items-center gap-1.5 text-xs font-semibold"
              title="Return to Main Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Main Dashboard</span>
            </Link>

            <div className="flex items-center gap-3">
              <Image
                src="/brainoro-logo.png"
                alt="Brainoro - Own your Prep."
                width={180}
                height={64}
                unoptimized
                className="h-14 sm:h-16 w-auto rounded-xl object-contain shadow-xs border border-slate-800/10"
              />
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white shadow-xs border border-slate-800">
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-300">Powered by</span>
                <Image
                  src="/ocaverse-logo-white.png"
                  alt="OcaVerse"
                  width={90}
                  height={28}
                  unoptimized
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-xs">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>NCERT Authoritative Source</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main CBSE Curriculum Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 space-y-8">
        <CbseCurriculumNavigator
          onSelectConcept={handleSelectConcept}
          onLearnClick={handleLearnClick}
        />

        {/* Selected Concept Preview / Direct Learning Access */}
        {activeConcept && (
          <section id="cbse-learning-preview" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Active Concept</span>
                <h3 className="text-lg font-bold text-slate-900">{activeConcept.official_title}</h3>
              </div>
              <Link
                href={`/?board=CBSE&concept=${activeConcept.id}`}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open in Brainoro Learning Hub</span>
              </Link>
            </div>
            {activeSection && (
              <p className="text-xs text-slate-600">
                Aligned with Section § {activeSection.section_number}: {activeSection.section_title}
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
