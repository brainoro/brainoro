import React from 'react';
import { AuthoritativeCurriculumConcept, TextbookSection } from '../../lib/types';
import { ArrowRight, ShieldCheck, Compass } from 'lucide-react';

interface Props {
  concept: AuthoritativeCurriculumConcept;
  section?: TextbookSection;
  onLearn: (concept: AuthoritativeCurriculumConcept) => void;
  isActive?: boolean;
}

export const ConceptCard: React.FC<Props> = ({
  concept,
  section,
  onLearn,
  isActive = false,
}) => {
  const displayTitle = concept.metadata?.display_title || concept.official_title;
  const isAngleClassification = concept.id.includes('ANGLE-CLASSIFICATION');

  return (
    <div
      data-testid="authoritative-concept-card"
      className={`rounded-2xl p-6 transition-all duration-200 border relative flex flex-col justify-between gap-4 ${
        isActive
          ? 'bg-gradient-to-br from-white via-sky-50/30 to-white border-sky-400 shadow-md ring-1 ring-sky-400/30'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
      }`}
    >
      <div className="space-y-3">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Statutory Curriculum Concept
            </span>
            {section && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200">
                § {section.section_number}
              </span>
            )}
          </div>

          {concept.source_page && (
            <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              NCERT Page {concept.source_page}
            </span>
          )}
        </div>

        {/* Title Presentation: Official statutory title & learner-friendly title */}
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {displayTitle}
          </h3>
          {displayTitle !== concept.official_title && (
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory Heading: <span className="text-slate-700 font-semibold">{concept.official_title}</span>
            </p>
          )}
        </div>

        {/* Statutory Description / Competency Statement */}
        {concept.official_description && (
          <p className="text-xs text-slate-600 leading-relaxed">
            {concept.official_description}
          </p>
        )}

        {/* Special Statutory Coverage: Angle Classification Breakdown including Reflex Angle */}
        {isAngleClassification && (
          <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-indigo-100 space-y-2">
            <div className="text-[11px] font-bold text-indigo-900 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-600" />
              Statutory NCERT Angle Classifications:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-center shadow-xs">
                <span className="font-bold text-sky-700 block">Acute</span>
                <span className="text-[10px] text-slate-500 font-mono">0° &lt; θ &lt; 90°</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-center shadow-xs">
                <span className="font-bold text-emerald-700 block">Right</span>
                <span className="text-[10px] text-slate-500 font-mono">θ = 90°</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-center shadow-xs">
                <span className="font-bold text-amber-700 block">Obtuse</span>
                <span className="text-[10px] text-slate-500 font-mono">90° &lt; θ &lt; 180°</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-slate-200 text-center shadow-xs">
                <span className="font-bold text-indigo-700 block">Straight</span>
                <span className="text-[10px] text-slate-500 font-mono">θ = 180°</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-300 text-center col-span-2 sm:col-span-1 shadow-sm">
                <span className="font-bold text-emerald-800 block flex items-center justify-center gap-0.5">
                  Reflex
                </span>
                <span className="text-[10px] text-emerald-700 font-mono font-semibold">180° &lt; θ &lt; 360°</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Action CTA */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          Ready to master this concept?
        </span>
        <button
          onClick={() => onLearn(concept)}
          className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition transform active:scale-95"
        >
          <span>Learn Concept</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
