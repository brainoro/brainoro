import React, { useState } from 'react';
import { AssessmentItem, BoardId } from '../../lib/types';
import { DiagnosticReport } from '../../lib/engine/diagnosticEngine';
import { OcaverseWatermarkContainer } from '../common/OcaverseWatermarkContainer';
import { MathText } from '../common/MathRenderer';
import {
  Activity,
  Award,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  ArrowRight,
  Sparkles,
  Layers,
  BookOpen,
  Compass,
  Zap,
  Target,
  History,
  RotateCcw
} from 'lucide-react';

interface Props {
  selectedBoardId: BoardId;
  selectedGrade?: number;
  selectedSubject?: string;
  chapterTitle?: string;
  conceptTitle?: string;
  diagnosticReports: DiagnosticReport[];
  currentTheta: number;
  standardError: number;
  onResolveReport?: (reportId: string) => void;
  onNavigateToPractice?: () => void;
  onNavigateToLearn?: () => void;
}

export const PsychometricAssessmentHub: React.FC<Props> = ({
  selectedBoardId,
  selectedGrade = 9,
  selectedSubject = 'MATH',
  chapterTitle = 'Selected Chapter',
  conceptTitle = 'Core Concept',
  diagnosticReports = [],
  currentTheta = 0.0,
  standardError = 1.0,
  onResolveReport,
  onNavigateToPractice,
  onNavigateToLearn,
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(
    diagnosticReports.length > 0 ? diagnosticReports[0].id : null
  );

  // Probe testing state for the selected report
  const [probeAnswerSelected, setProbeAnswerSelected] = useState<number | null>(null);
  const [probeEvaluated, setProbeEvaluated] = useState(false);
  const [probeSuccess, setProbeSuccess] = useState(false);

  const activeReport = diagnosticReports.find((r) => r.id === selectedReportId) || diagnosticReports[0];

  const handleSelectProbeOption = (idx: number) => {
    if (probeEvaluated || !activeReport) return;
    setProbeAnswerSelected(idx);
    setProbeEvaluated(true);
    const isCorrect = idx === activeReport.prerequisite.probeQuestion.correctIndex;
    setProbeSuccess(isCorrect);
    if (isCorrect && onResolveReport) {
      onResolveReport(activeReport.id);
    }
  };

  const handleResetProbe = () => {
    setProbeAnswerSelected(null);
    setProbeEvaluated(false);
    setProbeSuccess(false);
  };

  return (
    <OcaverseWatermarkContainer
      variant="card"
      showBadge={false}
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-slate-900"
    >
      {/* 1. Psychometric Header & Ability Engine Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Psychometric Assessment &amp; Root-Cause Diagnostic Engine
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Automated Item Response Theory (1PL/2PL IRT) &amp; Upstream Curriculum Prerequisite Knowledge Graph for{' '}
            <strong className="text-slate-800">{chapterTitle}</strong> (Class {selectedGrade} {selectedSubject}).
          </p>
        </div>

        {/* Latent Ability Metrics */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Latent Ability (θ)</span>
              <span className={`text-base font-bold font-mono ${currentTheta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {currentTheta > 0 ? `+${currentTheta}` : currentTheta}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Confidence (SE)</span>
              <span className="text-sm font-bold font-mono text-slate-700">±{standardError}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Latent Ability Spectrum Bar */}
      <div className="bg-gradient-to-r from-sky-50/60 via-indigo-50/40 to-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
        <div className="flex justify-between text-[11px] font-mono text-slate-600 font-medium">
          <span>-3.0 (Foundational Remedial)</span>
          <span className="font-bold text-indigo-900">0.0 (Grade {selectedGrade} Board Baseline)</span>
          <span>+3.0 (Cognitive Acceleration / HOTS)</span>
        </div>
        <div className="w-full bg-slate-200 h-3 rounded-full relative overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400 z-10" />
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500 shadow-xs"
            style={{
              left: `${Math.max(0, Math.min(100, ((currentTheta + 3.0) / 6.0) * 100))}%`,
              width: '14px',
              transform: 'translateX(-50%)'
            }}
          />
        </div>
      </div>

      {/* 3. Main Diagnostic Content Area */}
      {diagnosticReports.length > 0 ? (
        <div className="space-y-6">
          {/* Diagnostic Summary Alert Banner */}
          <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-rose-950">
                    {diagnosticReports.length} Root-Cause Knowledge Gap{diagnosticReports.length > 1 ? 's' : ''} Identified
                  </h4>
                  <p className="text-xs text-rose-800 mt-0.5">
                    Triggered from incorrect responses in your Practice session. Our psychometric algorithm traced the gaps to foundational concepts from past grades.
                  </p>
                </div>
              </div>

              {onNavigateToPractice && (
                <button
                  onClick={onNavigateToPractice}
                  className="px-4 py-2 bg-white border border-rose-200 hover:bg-rose-100/50 text-rose-900 text-xs font-bold rounded-xl transition cursor-pointer self-start sm:self-auto"
                >
                  Return to Practice
                </button>
              )}
            </div>
          </div>

          {/* Root-Cause Report Selector & Deep-Dive View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Report List / Gap Radar */}
            <div className="lg:col-span-4 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-600" />
                <span>Detected Gaps Lineage</span>
              </h4>

              <div className="space-y-2">
                {diagnosticReports.map((report, idx) => {
                  const isSelected = activeReport?.id === report.id;
                  return (
                    <button
                      key={report.id}
                      onClick={() => {
                        setSelectedReportId(report.id);
                        handleResetProbe();
                      }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 shadow-xs ${
                        isSelected
                          ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-400/30 text-indigo-950'
                          : 'bg-white border-slate-200 hover:border-indigo-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                          Gap #{idx + 1}
                        </span>
                        <span className="text-[10px] text-slate-500">{report.timestamp}</span>
                      </div>
                      <span className="text-xs font-bold leading-snug line-clamp-1">
                        Prerequisite: Class {report.prerequisite.grade} {report.prerequisite.chapterTitle}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {report.prerequisite.conceptTitle}
                      </span>
                      {report.isResolved && (
                        <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Mastery Restored
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Prerequisite Knowledge Bridge & Interactive Remediation Probe */}
            {activeReport && (
              <div className="lg:col-span-8 space-y-5">
                {/* Visual Prerequisite Knowledge Bridge Card */}
                <div className="bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/40 border border-indigo-200/90 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-indigo-100">
                    <div className="flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                        Prerequisite Curriculum Knowledge Bridge
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                      Lineage Trace
                    </span>
                  </div>

                  {/* Visual Dependency Flow: Past Grade -> Current Grade */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 bg-white rounded-xl border border-indigo-100 shadow-xs">
                    {/* Source Prerequisite (Past Grade) */}
                    <div className="flex-1 p-3 rounded-xl bg-amber-50/80 border border-amber-200">
                      <span className="text-[10px] font-bold uppercase text-amber-800 block">
                        Root Prerequisite (Class {activeReport.prerequisite.grade})
                      </span>
                      <span className="text-sm font-bold text-amber-950 block mt-0.5">
                        {activeReport.prerequisite.chapterTitle}
                      </span>
                      <span className="text-xs text-amber-800 block mt-0.5">
                        {activeReport.prerequisite.conceptTitle}
                      </span>
                    </div>

                    {/* Bridge Arrow */}
                    <div className="flex flex-col items-center justify-center text-indigo-600 px-2">
                      <ArrowRight className="w-5 h-5 hidden sm:block animate-pulse" />
                      <span className="text-[9px] font-mono uppercase font-bold text-indigo-500">Unlocks</span>
                    </div>

                    {/* Target Current Chapter (Current Grade) */}
                    <div className="flex-1 p-3 rounded-xl bg-sky-50/80 border border-sky-200">
                      <span className="text-[10px] font-bold uppercase text-sky-800 block">
                        Current Chapter (Class {activeReport.currentGrade})
                      </span>
                      <span className="text-sm font-bold text-sky-950 block mt-0.5">
                        {activeReport.currentChapterTitle}
                      </span>
                      <span className="text-xs text-sky-800 block mt-0.5">
                        {conceptTitle}
                      </span>
                    </div>
                  </div>

                  {/* Cognitive Misconception Deep-Dive */}
                  <div className="space-y-2 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">
                        Identified Cognitive Trap:
                      </span>
                      <p className="text-slate-800 font-medium leading-relaxed">
                        {activeReport.prerequisite.commonMisconception}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                        Authoritative Foundational Axiom to Remember:
                      </span>
                      <p className="text-emerald-950 font-semibold leading-relaxed">
                        <MathText text={activeReport.prerequisite.axiomSummary} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interactive Prerequisite Remediation Probe */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Prerequisite Diagnostic Stress-Test Probe
                      </h4>
                    </div>
                    {probeEvaluated && (
                      <button
                        onClick={handleResetProbe}
                        className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 transition cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Re-test</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-600">
                    Solve this quick diagnostic check from <strong>Class {activeReport.prerequisite.grade} ({activeReport.prerequisite.chapterTitle})</strong> to certify that you have restored foundational mastery:
                  </p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900">
                    <MathText text={activeReport.prerequisite.probeQuestion.prompt} />
                  </div>

                  {/* Probe Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeReport.prerequisite.probeQuestion.options.map((opt, idx) => {
                      const isSelected = probeAnswerSelected === idx;
                      const isCorrectOpt = idx === activeReport.prerequisite.probeQuestion.correctIndex;

                      let btnStyle = 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 text-slate-800';
                      if (probeEvaluated) {
                        if (isCorrectOpt) {
                          btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400/30';
                        } else if (isSelected && !isCorrectOpt) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400/30';
                        } else {
                          btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={probeEvaluated}
                          onClick={() => handleSelectProbeOption(idx)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 cursor-pointer shadow-xs ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-lg border border-slate-300 bg-slate-100 text-slate-700 text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                            {['A', 'B', 'C', 'D'][idx]}
                          </span>
                          <span className="flex-1 break-words leading-relaxed font-medium">
                            <MathText text={opt} />
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Probe Evaluation Result */}
                  {probeEvaluated && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs animate-fadeIn ${
                        probeSuccess
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold mb-1">
                        {probeSuccess ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>✔ Prerequisite Foundation Verified! Gap Certified Resolved.</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-rose-600" />
                            <span>Incorrect. Review the detailed explanation below:</span>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] leading-relaxed opacity-90">
                        {activeReport.prerequisite.probeQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Zero Gaps State */
        <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              No Prerequisite Knowledge Gaps Detected
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              Your practice performance shows strong alignment with foundational prerequisites for{' '}
              <strong className="text-slate-800">{chapterTitle}</strong>. Any incorrect answers in the practice engine will automatically generate root-cause diagnostic analyses here.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            {onNavigateToPractice && (
              <button
                onClick={onNavigateToPractice}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Continue Adaptive Practice</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {onNavigateToLearn && (
              <button
                onClick={onNavigateToLearn}
                className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Review Visual Notes
              </button>
            )}
          </div>
        </div>
      )}
    </OcaverseWatermarkContainer>
  );
};
