import React, { useState, useEffect } from 'react';
import { CurriculumConcept, CornellNotes, BoardId } from '../../lib/types';
import { getContentForTopic, synthesizeCornellContent } from '../../lib/services/contentService';
import { OcaverseWatermarkContainer } from '../common/OcaverseWatermarkContainer';
import { VisualModelCard } from './VisualModelCard';
import { MathFormula, MathText } from '../common/MathRenderer';
import {
  Sparkles,
  BookOpen,
  HelpCircle,
  FileCheck2,
  Activity,
  Atom,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Compass,
  Lightbulb,
  Check,
  ChevronRight,
  Printer,
  RefreshCw,
  Terminal,
  ChevronDown
} from 'lucide-react';

interface Props {
  concept: CurriculumConcept;
  boardId: BoardId;
}

// ---------------------------------------------------------------------------
// EquationBox — Displays the Essential Mathematical/Physical/Chemical/Biological
// Law equation with proper text wrapping.
// Fixes Bug #4: replaces `overflow-x-auto` (which caused horizontal clipping)
// with `whitespace-normal break-words`. For very long equations (>120 chars),
// an expand/collapse toggle is provided so KaTeX display math renders cleanly.
// ---------------------------------------------------------------------------
interface EquationBoxProps {
  conceptId: string;
  label: string;
  formula: string;
  isChemistry?: boolean;
  isBiology?: boolean;
}

const EquationBox: React.FC<EquationBoxProps> = ({ conceptId, label, formula, isChemistry, isBiology }) => {
  const [expanded, setExpanded] = React.useState(false);
  // Heuristic: if the raw formula string is very long, offer expand/collapse
  const isLong = formula.length > 120;
  const showToggle = isLong;

  return (
    <div className="bg-gradient-to-r from-sky-950/40 to-indigo-950/40 border border-indigo-800/60 rounded-2xl p-5 shadow-sm">
      <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-2">
        {isChemistry ? (
          <Atom className="w-4 h-4 text-amber-400" />
        ) : isBiology ? (
          <Activity className="w-4 h-4 text-emerald-400" />
        ) : (
          <FileCheck2 className="w-4 h-4 text-indigo-400" />
        )}
        <span>{label}</span>
      </div>
      {/* Fix: whitespace-normal + break-words replaces overflow-x-auto to prevent clipping */}
      <div
        className={`text-base sm:text-lg font-bold font-mono text-emerald-300 bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 tracking-wide whitespace-normal break-words transition-all ${
          showToggle && !expanded ? 'max-h-24 overflow-hidden' : ''
        }`}
      >
        <MathFormula key={`${conceptId}-rule`} formula={formula} />
      </div>
      {showToggle && (
        <button
          onClick={() => setExpanded(prev => !prev)}
          className="mt-2 text-[11px] text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1 transition"
          aria-label={expanded ? 'Collapse equation' : 'Show full equation'}
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          {expanded ? 'Collapse equation' : 'Show full equation'}
        </button>
      )}
    </div>
  );
};

export const CornellNoteEditor: React.FC<Props> = ({ concept, boardId }) => {
  const [loadingAI, setLoadingAI] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notes, setNotes] = useState<CornellNotes | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<{ [qIndex: number]: number }>({});
  const [activeSubTab, setActiveSubTab] = useState<'cornell' | 'worked_example' | 'practice'>('cornell');

  const loadNotesForCurrentConcept = () => {
    setErrorMsg(null);
    setNotes(null);
    setLoadingAI(true);
    setSelectedQuizAnswers({});

    getContentForTopic(concept, boardId)
      .then(res => {
        // Strict Pedagogical Runtime Boundary Verification
        if (res.gradeLevel && res.gradeLevel !== concept.gradeLevel) {
          console.error(`[Pedagogical Boundary Alert] Grade mismatch: Concept requires G${concept.gradeLevel}, received payload tagged G${res.gradeLevel}.`);
          setErrorMsg(`Pedagogical Boundary Lock: Content payload for Grade ${res.gradeLevel} cannot be rendered for Grade ${concept.gradeLevel} (Scope isolation safeguard active).`);
          setLoadingAI(false);
          return;
        }
        setNotes(res);
        setLoadingAI(false);
        setSelectedQuizAnswers({});
      })
      .catch(err => {
        console.error('Error fetching topic content:', err);
        setErrorMsg(err?.message || `DB Record not found or RLS restricted for Concept ID: [${concept.id}]`);
        setLoadingAI(false);
      });
  };

  // Load rich content on mount or when concept/board changes
  useEffect(() => {
    loadNotesForCurrentConcept();
  }, [concept.id, boardId]);

  const handleRunAISynthesis = async () => {
    setErrorMsg(null);
    setLoadingAI(true);
    try {
      const generated = await getContentForTopic(concept, boardId);
      if (generated.gradeLevel && generated.gradeLevel !== concept.gradeLevel) {
        setErrorMsg(`Pedagogical Boundary Lock: Generated payload Grade ${generated.gradeLevel} does not match requested Grade ${concept.gradeLevel}.`);
        return;
      }
      setNotes(generated);
      setSelectedQuizAnswers({});
    } catch (err: any) {
      console.error('Error synthesizing Cornell notes:', err);
      setErrorMsg(err?.message || 'Error synthesizing Cornell notes.');
    } finally {
      setLoadingAI(false);
    }
  };

  const handleQuizSelect = (qIdx: number, optionIdx: number) => {
    setSelectedQuizAnswers(prev => ({ ...prev, [qIdx]: optionIdx }));
  };

  const activeError = errorMsg || (!loadingAI && !notes ? `DB Record not found or RLS restricted for Concept ID: [${concept.id}]` : null);

  if (activeError) {
    const isDbRecordMissing = activeError.includes('DB Record not found') || activeError.includes('RLS restricted');

    return (
      <OcaverseWatermarkContainer
        key={`${concept.id}-error-container`}
        variant="viewport"
        showBadge={true}
        className="bg-slate-900 border border-rose-900/60 rounded-2xl p-6 shadow-xl space-y-5 my-4"
      >
        <div className="flex items-start gap-3.5 p-4 bg-rose-950/40 border border-rose-800/80 rounded-xl text-rose-300">
          <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h4 className="font-bold text-rose-200 text-base">
                {isDbRecordMissing ? 'Database Invariant Restriction Active' : 'Pedagogical Boundary Lock Active'}
              </h4>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-900/40 border border-rose-700/60 text-rose-200">
                {concept.id}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-rose-300/90 font-mono leading-relaxed">
              {activeError}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1 flex-wrap">
          <button
            onClick={loadNotesForCurrentConcept}
            disabled={loadingAI}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-md shadow-sky-600/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingAI ? 'animate-spin' : ''}`} />
            <span>{loadingAI ? 'Retrying...' : 'Retry Loading Concept'}</span>
          </button>

          <button
            onClick={handleRunAISynthesis}
            disabled={loadingAI}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-md shadow-indigo-600/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{loadingAI ? 'Synthesizing...' : 'Re-Synthesize Grade-Locked Notes'}</span>
          </button>
        </div>

        {/* Collapsible Technical Diagnostics for Developers */}
        <details className="group border border-slate-800 rounded-xl bg-slate-950 overflow-hidden text-xs">
          <summary className="flex items-center justify-between px-4 py-2.5 cursor-pointer text-slate-400 hover:text-slate-200 font-mono transition select-none">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span>Diagnostic Details & Component Context</span>
            </span>
            <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
          </summary>
          <div className="p-4 border-t border-slate-800 font-mono text-[11px] text-slate-400 overflow-x-auto space-y-2 whitespace-pre-wrap">
            <div><strong>Target Concept ID:</strong> {concept.id}</div>
            <div><strong>Board:</strong> {boardId}</div>
            <div><strong>Grade Level:</strong> Grade {concept.gradeLevel}</div>
            <div><strong>Unit:</strong> {concept.unit || 'N/A'}</div>
            <div><strong>Title:</strong> {concept.title}</div>
            <div><strong>Diagnostic Status:</strong> Payload missing from Supabase curriculum_concepts or RLS restriction encountered. Run batch sync script (scripts/sync_all_notes_to_supabase.ts) or click Re-Synthesize to populate.</div>
          </div>
        </details>
      </OcaverseWatermarkContainer>
    );
  }

  if (!notes) {
    return (
      <OcaverseWatermarkContainer
        key={`${concept.id}-skeleton-container`}
        variant="viewport"
        showBadge={true}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6"
      >
        {/* Top Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 animate-pulse">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-5 w-44 bg-sky-950/80 border border-sky-800/80 rounded-md" />
              <div className="h-4 w-32 bg-slate-800 rounded" />
            </div>
            <div className="h-8 w-72 sm:w-96 bg-slate-800 rounded-lg" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-28 bg-slate-800 rounded-xl" />
            <div className="h-9 w-48 bg-slate-800 rounded-xl" />
          </div>
        </div>

        {/* Sub-view Navigation Skeleton */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <div className="h-9 w-40 bg-sky-900/40 rounded-xl animate-pulse" />
          <div className="h-9 w-44 bg-slate-800/60 rounded-xl animate-pulse" />
          <div className="h-9 w-36 bg-slate-800/60 rounded-xl animate-pulse" />
        </div>

        {/* Visual Intuition Pump & Key Formula Cards Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left 2 Cols: Intuition, Rule, Trap Skeletons */}
          <div className="lg:col-span-2 space-y-4">
            {/* Intuition Skeleton */}
            <div className="bg-slate-950/90 border border-sky-900/40 rounded-2xl p-5 shadow-sm animate-pulse space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400/60" />
                <div className="h-4 w-60 bg-sky-900/40 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-full bg-slate-800/80 rounded" />
                <div className="h-3.5 w-5/6 bg-slate-800/80 rounded" />
                <div className="h-3.5 w-4/6 bg-slate-800/80 rounded" />
              </div>
            </div>

            {/* Essential Law / Formula Skeleton */}
            <div className="bg-gradient-to-r from-sky-950/40 to-indigo-950/40 border border-indigo-800/60 rounded-2xl p-5 shadow-sm animate-pulse space-y-3">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-indigo-400/60" />
                <div className="h-4 w-72 bg-indigo-900/40 rounded" />
              </div>
              <div className="h-14 w-full bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-center">
                <div className="h-5 w-3/4 bg-emerald-900/40 rounded" />
              </div>
            </div>

            {/* Exam Trap Skeleton */}
            <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-5 shadow-sm animate-pulse space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400/60" />
                <div className="h-4 w-64 bg-rose-900/40 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-slate-800/70 rounded" />
                <div className="h-3 w-11/12 bg-slate-800/70 rounded" />
                <div className="h-3 w-4/5 bg-slate-800/70 rounded" />
              </div>
            </div>
          </div>

          {/* Right Col: Diagram Model Skeleton */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between items-center text-center animate-pulse min-h-[300px]">
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80">
              <div className="h-4 w-44 bg-slate-800 rounded" />
              <div className="h-4 w-20 bg-slate-800 rounded" />
            </div>
            <div className="w-full h-36 flex flex-col items-center justify-center my-auto">
              <Sparkles className="w-8 h-8 text-sky-400 animate-spin mb-3" />
              <div className="h-3 w-48 bg-slate-800 rounded" />
            </div>
            <div className="w-full h-8 bg-slate-900 rounded-lg border border-slate-800" />
          </div>
        </div>

        {/* 3-Zone Cornell Notes Skeleton */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-950 animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            {/* Left Col: Cue Column Skeleton */}
            <div className="p-5 bg-slate-950/80 space-y-3">
              <div className="h-4 w-48 bg-slate-800 rounded mb-2" />
              <div className="space-y-2.5">
                <div className="h-16 w-full bg-sky-950/30 border border-sky-900/40 rounded-xl" />
                <div className="h-16 w-full bg-sky-950/30 border border-sky-900/40 rounded-xl" />
                <div className="h-16 w-full bg-sky-950/30 border border-sky-900/40 rounded-xl" />
              </div>
            </div>

            {/* Right Col: Main Notes Skeleton */}
            <div className="lg:col-span-2 p-5 bg-slate-900/40 space-y-4">
              <div className="h-4 w-52 bg-slate-800 rounded mb-2" />
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="h-4 w-2/5 bg-slate-800 rounded" />
                <div className="h-3 w-full bg-slate-800/80 rounded" />
                <div className="h-3 w-5/6 bg-slate-800/80 rounded" />
                <div className="h-3 w-4/6 bg-slate-800/80 rounded" />
                <div className="h-4 w-1/3 bg-slate-800 rounded mt-4" />
                <div className="h-3 w-full bg-slate-800/80 rounded" />
                <div className="h-3 w-3/4 bg-slate-800/80 rounded" />
              </div>
              <div className="h-16 w-full bg-emerald-950/20 border border-emerald-900/40 rounded-xl" />
            </div>
          </div>

          {/* Bottom Summary Skeleton */}
          <div className="p-5 bg-slate-950 border-t border-slate-800 space-y-2">
            <div className="h-4 w-60 bg-slate-800 rounded" />
            <div className="h-12 w-full bg-slate-900/80 rounded-xl border border-slate-800/80" />
          </div>
        </div>
      </OcaverseWatermarkContainer>
    );
  }

  const quizList = notes.practiceQuiz && notes.practiceQuiz.length > 0 ? notes.practiceQuiz : [
    {
      question: `What is the core conceptual rule governing ${notes.title}?`,
      options: [
        'Apply the governing formula and verify units and sign conventions',
        'Ignore coordinate reference frames',
        'Memorize the textbook answer verbatim without working steps',
        'Skip mental verification'
      ],
      answerIndex: 0,
      explanation: 'Systematic deduction and checking boundary conditions ensure correct problem solving.'
    },
    {
      question: `Under ${boardId} examination grading, what is essential?`,
      options: [
        'Showing structured intermediate steps and proper units',
        'Omitting intermediate derivations',
        'Writing only the final numerical value',
        'Skipping formula statements'
      ],
      answerIndex: 0,
      explanation: `${boardId} marking schemes award step-by-step method marks for correct algebraic deductions.`
    }
  ];

  const rawSubj = (concept.subjectId || (concept as any).subject || '').toUpperCase().trim();
  const cId = (concept.id || '').toUpperCase();
  const unitStr = (concept.unit || '').toUpperCase();

  const isChemistry =
    rawSubj === 'CHEMISTRY' ||
    rawSubj.includes('CHEM') ||
    cId.includes('-CHEM-') ||
    cId.includes('CHEMISTRY');

  const isBiology =
    !isChemistry && (
      rawSubj === 'BIOLOGY' ||
      rawSubj.includes('BIO') ||
      rawSubj.includes('LIFE') ||
      cId.includes('-BIO-') ||
      cId.includes('BIOLOGY') ||
      unitStr.includes('ECO') ||
      unitStr.includes('TROPHIC') ||
      unitStr.includes('CIRCULAT') ||
      unitStr.includes('DIGEST') ||
      unitStr.includes('RESPIRAT') ||
      unitStr.includes('CELL') ||
      unitStr.includes('PLANT')
    );

  let ruleHeaderLabel = 'ESSENTIAL MATHEMATICAL LAW / EQUATION';
  if (isChemistry) {
    ruleHeaderLabel = 'ESSENTIAL CHEMICAL LAW / GOVERNING EQUATION';
  } else if (isBiology) {
    ruleHeaderLabel = 'GOVERNING BIOLOGICAL MODEL / PRINCIPLE';
  }

  const bId = String(boardId).toUpperCase();
  const isIB = bId.includes('IB');
  const isCambridge = bId.includes('CAMBRIDGE');

  const intuitionHeaderLabel = isIB
    ? 'Global Context & Real-World Framing:'
    : isCambridge
    ? 'Practical Real-World Phenomenon (Empirical Context):'
    : 'The Conceptual Intuition (Why this makes sense):';

  const trapHeaderLabel = isIB
    ? 'MYP Inquiry Misconception & Criterion Trap:'
    : isCambridge
    ? 'Cambridge Mark Scheme Guidance & Pitfalls:'
    : 'CBSE Exam Trap (Common Mark-Loss Pitfalls):';

  return (
    <OcaverseWatermarkContainer
      key={`${concept.id}-loaded-container`}
      variant="viewport"
      showBadge={true}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 print:border-none print:shadow-none print:bg-white print:p-2"
    >
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 print:border-slate-300">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/80 px-2.5 py-0.5 rounded-md print:border-slate-400 print:text-slate-700">
              Universal Cornell Learning Layer
            </span>
            <span className="text-xs font-mono text-slate-400">{notes.conceptId}</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight print:text-black">{notes.title?.replace(/\\&/g, '&')}</h2>
        </div>

        <div className="flex items-center gap-2.5 print:hidden">
          <button
            onClick={() => {
              if (loadingAI || !notes) return;
              window.print();
            }}
            disabled={loadingAI || !notes}
            title="Print or Save as PDF with OcaVerse Watermark Guardrail"
            className="flex items-center gap-1.5 bg-slate-800/90 hover:bg-slate-700 disabled:opacity-50 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition shadow-sm"
          >
            <Printer className="w-4 h-4 text-sky-400" />
            <span>{loadingAI ? 'Rendering Notes...' : 'Print / Save PDF'}</span>
          </button>

          <button
            onClick={handleRunAISynthesis}
            disabled={loadingAI}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-sky-500/20 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>{loadingAI ? 'Synthesizing...' : 'Regenerate Pedagogical Blueprint'}</span>
          </button>
        </div>
      </div>

      {/* Sub-view Navigation: Cornell Notes | Step-by-Step Worked Example | Practice Quiz */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 print:hidden">
        <button
          onClick={() => setActiveSubTab('cornell')}
          className={`text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
            activeSubTab === 'cornell'
              ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
          }`}
        >
          <span>📖 Cornell Study Notes</span>
        </button>

        {notes.workedExample && (
          <button
            onClick={() => setActiveSubTab('worked_example')}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
              activeSubTab === 'worked_example'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
            }`}
          >
            <span>✏️ Worked Numerical Example</span>
          </button>
        )}

        <button
          onClick={() => setActiveSubTab('practice')}
          className={`text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 ${
            activeSubTab === 'practice'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800/80'
          }`}
        >
          <span>⚡ Quick Concept Check</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
            activeSubTab === 'practice'
              ? 'bg-emerald-800 text-emerald-100'
              : 'bg-slate-800 text-emerald-400 border border-emerald-900/50'
          }`}>
            {quizList.length} Qs
          </span>
        </button>
      </div>

      {/* TAB 1: CORNELL STUDY NOTES */}
      {activeSubTab === 'cornell' && (
        <div className="space-y-6">
          
          {/* Visual Intuition Pump & Key Formula Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Left 2 Cols: Intuition & Rules */}
            <div className="lg:col-span-2 space-y-4">
              {/* Intuitive Real-World Analogy */}
              <div className="bg-slate-950/90 border border-sky-900/40 rounded-2xl p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>{intuitionHeaderLabel.replace(/\\&/g, '&')}</span>
                </div>
                <div className="text-sm text-slate-200 leading-relaxed font-sans font-medium">
                  <MathText key={`${concept.id}-analogy`} text={notes.coreAnalogy} />
                </div>
              </div>

              {/* Core Rule / Formula / Governing Process */}
              <EquationBox
                conceptId={concept.id}
                label={ruleHeaderLabel.replace(/\\&/g, '&')}
                formula={notes.structuralRule}
                isChemistry={isChemistry}
                isBiology={isBiology}
              />

              {/* Critical Student Trap / Mark Scheme / Inquiry Pitfall */}
              <div
                className={`border rounded-2xl p-5 shadow-sm transition-all curriculum-trap-box ${
                  isIB ? 'myp-inquiry-box' : isCambridge ? 'cambridge-mark-scheme' : 'board-exam-trap'
                } bg-rose-950/20 border-rose-800/40 print:bg-rose-50 print:border-rose-400 print:text-slate-900 print:overflow-visible print:min-h-[100px] print:block print:visible`}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 print:text-rose-900 mb-2 flex items-center gap-2 trap-header">
                  <AlertTriangle className="w-4 h-4 text-rose-400 print:text-rose-700" />
                  <span>{trapHeaderLabel.replace(/\\&/g, '&')}</span>
                </div>
                <div className="text-xs text-slate-300 print:text-slate-800 leading-relaxed font-sans whitespace-pre-line space-y-2 print:overflow-visible trap-content">
                  <MathText key={`${concept.id}-trap`} text={notes.curriculumTrap} />
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Visual Diagram */}
            <VisualModelCard key={concept.id} concept={concept} notes={notes} boardId={boardId} />

          </div>

          {/* Classic 3-Zone Cornell Notes Layout */}
          <div className="border border-slate-800 rounded-2xl overflow-hidden print:overflow-visible bg-slate-950 shadow-inner">
            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
              
              {/* Left Column: Cues & Recall Prompts (1/3 Width) */}
              <div className="p-5 bg-slate-950/80 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-sky-400" />
                  <span>Cue Column (Recall Questions)</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Cover the right notes and test if you can answer these recall cues:
                </p>
                <ul className="space-y-2.5 mt-2">
                  {notes.cueQuestions.map((q, idx) => (
                    <li key={`${concept.id}-cue-${idx}`} className="text-xs text-sky-200 bg-sky-950/30 border border-sky-900/40 p-3 rounded-xl leading-relaxed">
                      <MathText key={`${concept.id}-cue-text-${idx}`} text={q} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Main Note-Taking Area (2/3 Width) */}
              <div className="lg:col-span-2 p-5 bg-slate-900/40 space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span>Main Structured Lesson Notes</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-line">
                  <MathText key={`${concept.id}-notes`} text={notes.mainNotes} />
                </div>

                {/* Mental Verification Box */}
                <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl">
                  <span className="text-xs font-bold text-emerald-400 block mb-1">
                    🧠 Quick Mental Calculation Check:
                  </span>
                  <p className="text-xs text-slate-300 font-mono">
                    <MathText key={`${concept.id}-verify`} text={notes.verificationProblem} />
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Zone: Summary Area */}
            <div className="p-5 bg-slate-950 border-t border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>Cornell Bottom Summary (Cognitive Synthesis)</span>
              </div>
              <div className="text-xs text-slate-300 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                <MathText key={`${concept.id}-summary`} text={notes.summary} />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: STEP-BY-STEP WORKED EXAMPLE */}
      {activeSubTab === 'worked_example' && notes.workedExample && (
        <div key={`${concept.id}-worked-example-view`} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 animate-fadeIn">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <BookOpen className="w-4 h-4" />
            <span>Standard High-School Problem Walkthrough</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Problem Statement:</h4>
            <div className="text-sm font-semibold text-slate-100 leading-relaxed font-mono">
              <MathText key={`${concept.id}-problem`} text={notes.workedExample.problem} />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">
              Step-by-Step Mathematical Derivation:
            </h4>
            {notes.workedExample.steps.map((step, idx) => (
              <div key={`${concept.id}-step-${idx}`} className="flex items-start gap-3 p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <span className="w-6 h-6 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div className="text-xs text-slate-200 leading-relaxed font-sans">
                  <MathText key={`${concept.id}-step-text-${idx}`} text={step} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/60 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400">Final Evaluated Result:</span>
            <span className="text-xs font-mono font-bold text-emerald-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              <MathText key={`${concept.id}-result`} text={notes.workedExample.result} />
            </span>
          </div>
        </div>
      )}

      {/* TAB 3: QUICK PRACTICE QUIZ */}
      {activeSubTab === 'practice' && (
        <div key={`${concept.id}-practice-quiz-view`} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Instant Concept Validation Check</span>
            </span>
            <span className="text-xs text-slate-400">Immediate Feedback & Explanation</span>
          </div>

          <div className="space-y-6">
            {quizList.map((quiz, qIdx) => {
              const selectedOpt = selectedQuizAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === quiz.answerIndex;

              return (
                <div key={`${concept.id}-quiz-${qIdx}`} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="text-sm font-bold text-slate-200">
                    Question {qIdx + 1}: <MathText key={`${concept.id}-quiz-q-${qIdx}`} text={quiz.question} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {quiz.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isOptionCorrect = optIdx === quiz.answerIndex;

                      return (
                        <button
                          key={`${concept.id}-q-${qIdx}-opt-${optIdx}`}
                          onClick={() => handleQuizSelect(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-xs font-medium text-left transition flex items-center justify-between ${
                            isAnswered
                              ? isOptionCorrect
                                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                                : isOptionSelected
                                ? 'bg-rose-950/60 border-rose-500 text-rose-300'
                                : 'bg-slate-950/40 border-slate-800 text-slate-400'
                              : 'bg-slate-950/70 border-slate-800 hover:border-slate-600 text-slate-300'
                          }`}
                        >
                          <span><MathText key={`${concept.id}-q-${qIdx}-opt-text-${optIdx}`} text={opt} /></span>
                          {isAnswered && isOptionCorrect && (
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {isAnswered && isOptionSelected && !isOptionCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswered && (
                    <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                        : 'bg-amber-950/30 border-amber-800/60 text-amber-300'
                    }`}>
                      <span className="font-bold block mb-1">
                        {isCorrect ? '✅ Correct! Explanation:' : '❌ Not quite. Why:'}
                      </span>
                      <MathText key={`${concept.id}-quiz-expl-${qIdx}`} text={quiz.explanation} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer copyright integrity notice */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80 gap-2 print:border-slate-300 print:text-slate-600">
        <span className="flex items-center gap-1.5 text-emerald-400 font-medium print:text-emerald-700">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Original Pedagogical Synthesis (Zero Copyrighted Textbook Material)</span>
        </span>
        <span className="text-[11px] text-slate-400 font-mono print:text-slate-700">
          Protected by OcaVerse Cognitive Architecture Guardrail
        </span>
      </div>

    </OcaverseWatermarkContainer>
  );
};
