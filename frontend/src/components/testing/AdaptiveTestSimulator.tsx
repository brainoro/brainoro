import React, { useState, useMemo } from 'react';
import { AssessmentItem, BoardId } from '../../lib/types';
import { IRTClientEngine, IRTStudentState } from '../../lib/engine/irtEngine';
import { DiagnosticEngine, DiagnosticReport } from '../../lib/engine/diagnosticEngine';
import { CBSEAdapter } from '../board-adapters/CBSEAdapter';
import { CambridgeAdapter } from '../board-adapters/CambridgeAdapter';
import { IBMYPAdapter } from '../board-adapters/IBMYPAdapter';
import { OcaverseWatermarkContainer } from '../common/OcaverseWatermarkContainer';
import { generateChapterPracticeItems } from '../../lib/interactive/chapterPracticeEngine';
import { Activity, Target, TrendingUp, CheckCircle, RotateCcw, Sparkles, Layers, BookOpen, ArrowRight, AlertTriangle, ArrowUpRight, X } from 'lucide-react';

interface Props {
  items?: AssessmentItem[];
  selectedBoardId: BoardId;
  selectedGrade?: number;
  selectedSubject?: string;
  chapterTitle?: string;
  conceptTitle?: string;
  conceptId?: string;
  onFailConcept?: (conceptId: string, item?: AssessmentItem) => void;
  onMasterConcept?: (conceptId: string, item?: AssessmentItem) => void;
  onItemEvaluated?: (item: AssessmentItem, isCorrect: boolean, theta: number) => void;
  onDiagnosticAlert?: (report: DiagnosticReport) => void;
  onNavigateToAssessment?: () => void;
}

export const AdaptiveTestSimulator: React.FC<Props> = ({
  items,
  selectedBoardId,
  selectedGrade = 9,
  selectedSubject = 'MATH',
  chapterTitle,
  conceptTitle,
  conceptId,
  onFailConcept,
  onMasterConcept,
  onItemEvaluated,
  onDiagnosticAlert,
  onNavigateToAssessment,
}) => {
  const [session, setSession] = useState<IRTStudentState>({
    currentTheta: 0.0, // Neutral starting ability
    standardError: 1.0,
    itemsCompleted: 0,
    history: []
  });

  const [completedItemIds, setCompletedItemIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeItemEvaluated, setActiveItemEvaluated] = useState(false);
  const [activeDiagnosticReport, setActiveDiagnosticReport] = useState<DiagnosticReport | null>(null);

  // Live Score and Badges Tracking
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [streak, setStreak] = useState(0);

  // Subject Mode Toggle (Objective vs Subjective for Non-Math subjects)
  const isMathSubject = (selectedSubject || '').toUpperCase().includes('MATH') || (chapterTitle || '').toLowerCase().includes('mathem');
  const [activeQuestionMode, setActiveQuestionMode] = useState<'OBJECTIVE' | 'SUBJECTIVE'>('OBJECTIVE');

  // Dynamically generate chapter-specific practice items if not explicitly provided or if legacy items
  const chapterItems = useMemo<AssessmentItem[]>(() => {
    if (items && items.length > 0 && items[0].id.startsWith('PRAC-')) {
      const filtered = items.filter((i) => !i.boardType || i.boardType === selectedBoardId);
      if (filtered.length > 0) return filtered;
    }

    return generateChapterPracticeItems({
      chapterTitle: chapterTitle || conceptTitle || 'Chapter Practice',
      conceptTitle: conceptTitle || chapterTitle || 'Core Concept',
      conceptId: conceptId || 'CONCEPT-GENERAL',
      grade: selectedGrade,
      subject: selectedSubject,
      boardId: selectedBoardId,
    });
  }, [items, chapterTitle, conceptTitle, conceptId, selectedGrade, selectedSubject, selectedBoardId]);

  // Filter items matching mode for non-math subjects
  const availableItems = useMemo(() => {
    if (isMathSubject) {
      return chapterItems.filter((i) => i.questionType === 'OBJECTIVE' || !i.questionType);
    }
    const filtered = chapterItems.filter((i) => (i.questionType || 'OBJECTIVE') === activeQuestionMode);
    return filtered.length > 0 ? filtered : chapterItems;
  }, [chapterItems, isMathSubject, activeQuestionMode]);

  // Active item chosen by IRT Fisher Information maximization
  const activeItem = useMemo(() => {
    return IRTClientEngine.selectNextItem(
      session.currentTheta,
      availableItems,
      completedItemIds
    ) || availableItems[0];
  }, [session.currentTheta, availableItems, completedItemIds]);

  // Accuracy calculation
  const accuracyPercentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // 3 Tiered Badges Calculation
  const badges = useMemo(() => {
    return [
      {
        id: 'explorer',
        tier: 'Bronze',
        title: 'Concept Explorer',
        icon: '🥉',
        desc: 'Started practice & attempted 1+ question',
        unlocked: totalAnswered >= 1,
        color: 'from-amber-600 to-amber-700 text-amber-100',
        borderColor: 'border-amber-300 bg-amber-50 text-amber-900',
      },
      {
        id: 'scholar',
        tier: 'Silver',
        title: 'Proficient Scholar',
        icon: '🥈',
        desc: 'Scored ≥ 60% accuracy with 3+ questions',
        unlocked: totalAnswered >= 3 && accuracyPercentage >= 60,
        color: 'from-slate-400 to-slate-600 text-slate-100',
        borderColor: 'border-slate-300 bg-slate-100 text-slate-800',
      },
      {
        id: 'champion',
        tier: 'Gold',
        title: 'Mastery Champion',
        icon: '🥇',
        desc: 'Achieved ≥ 80% accuracy or θ ≥ +1.2 ability',
        unlocked: (totalAnswered >= 4 && accuracyPercentage >= 80) || session.currentTheta >= 1.2,
        color: 'from-amber-400 to-yellow-500 text-yellow-950',
        borderColor: 'border-amber-400 bg-amber-100 text-amber-950 font-bold',
      },
    ];
  }, [totalAnswered, accuracyPercentage, session.currentTheta]);

  const handleResponseEvaluated = (isCorrect: boolean) => {
    if (!activeItem || activeItemEvaluated) return;

    setActiveItemEvaluated(true);
    setTotalAnswered((prev) => prev + 1);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setActiveDiagnosticReport(null);
    } else {
      setStreak(0);
      // Run root-cause diagnostic algorithm for wrong answer
      const report = DiagnosticEngine.diagnoseWrongResponse({
        item: activeItem,
        chapterTitle: chapterTitle || conceptTitle || 'Chapter Practice',
        grade: selectedGrade,
        subject: selectedSubject,
      });
      setActiveDiagnosticReport(report);
      if (onDiagnosticAlert) {
        onDiagnosticAlert(report);
      }
    }

    const nextSession = IRTClientEngine.updateTheta(session, activeItem, isCorrect);
    setSession(nextSession);
    setCompletedItemIds((prev) => Array.from(new Set([...prev, activeItem.id])));

    if (onItemEvaluated) {
      onItemEvaluated(activeItem, isCorrect, nextSession.currentTheta);
    }

    if (!isCorrect && onFailConcept) {
      onFailConcept(activeItem.conceptId, activeItem);
    } else if (isCorrect && onMasterConcept) {
      onMasterConcept(activeItem.conceptId, activeItem);
    }

    setFeedback(
      `Marking & IRT Ability θ: ${nextSession.currentTheta > 0 ? '+' + nextSession.currentTheta : nextSession.currentTheta} (SE: ±${nextSession.standardError}). ${
        isCorrect
          ? '✔ Correct Answer (+1 Mark) — Concept mastery reinforced!'
          : '⚠️ Incorrect Answer — Root cause identified & scheduled in Box 1 for Daily Revision in the Revise tab.'
      }`
    );
  };

  const handleNextQuestion = () => {
    setActiveItemEvaluated(false);
  };

  const handleResetSession = () => {
    setSession({
      currentTheta: 0.0,
      standardError: 1.0,
      itemsCompleted: 0,
      history: []
    });
    setCompletedItemIds([]);
    setFeedback(null);
    setActiveItemEvaluated(false);
    setActiveDiagnosticReport(null);
    setCorrectCount(0);
    setTotalAnswered(0);
    setStreak(0);
  };

  return (
    <OcaverseWatermarkContainer
      variant="card"
      showBadge={false}
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-slate-900"
    >
      {/* Top Marks & Badges Header Bar (Modern Light Card Design - Zero Overlap) */}
      <div className="bg-gradient-to-r from-sky-50 via-indigo-50/70 to-slate-50 border border-sky-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4 text-slate-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Live Marks Counter */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-slate-200 shadow-xs px-4 py-2.5 rounded-xl text-center min-w-[90px]">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Live Marks</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                {correctCount} <span className="text-xs font-normal text-slate-400">/ {totalAnswered}</span>
              </span>
            </div>

            <div className="bg-white border border-slate-200 shadow-xs px-4 py-2.5 rounded-xl text-center min-w-[90px]">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Accuracy</span>
              <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600">
                {totalAnswered > 0 ? `${accuracyPercentage}%` : '—'}
              </span>
            </div>

            {streak > 1 && (
              <div className="bg-amber-50 border border-amber-200 shadow-xs px-3 py-2 rounded-xl text-center animate-bounce">
                <span className="text-[10px] text-amber-800 uppercase font-bold block">Streak</span>
                <span className="text-xs font-black text-amber-900 flex items-center gap-1 justify-center">
                  🔥 {streak} in a row!
                </span>
              </div>
            )}
          </div>

          {/* 3 Tiered Achievement Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all shadow-xs ${
                  badge.unlocked
                    ? `${badge.borderColor} font-bold ring-2 ring-amber-400/50 shadow-sm`
                    : 'bg-slate-100/80 border-slate-200 text-slate-400 opacity-60'
                }`}
                title={`${badge.tier} Badge: ${badge.title} — ${badge.desc}`}
              >
                <span className="text-lg">{badge.icon}</span>
                <div className="flex flex-col">
                  <span className="text-[11px] leading-tight font-bold text-slate-900">{badge.title}</span>
                  <span className="text-[9px] text-slate-500 font-mono">{badge.unlocked ? 'Unlocked 🔓' : 'Locked 🔒'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Root Cause Diagnostic Notification Toast */}
      {activeDiagnosticReport && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 shadow-xs animate-fadeIn space-y-2">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 bg-rose-500 text-white rounded-lg mt-0.5 shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-900">
                    🚨 Root-Cause Diagnostic Knowledge Gap Detected
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-200/80 text-rose-900 border border-rose-300">
                    Prerequisite Alert
                  </span>
                </div>
                <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                  Our psychometric engine traced the root cause of this error to a foundational prerequisite: <strong className="text-rose-950 font-bold">Class {activeDiagnosticReport.prerequisite.grade} {activeDiagnosticReport.prerequisite.subject} ({activeDiagnosticReport.prerequisite.chapterTitle})</strong>.
                </p>
                <p className="text-[11px] text-rose-700 mt-0.5 italic">
                  &ldquo;{activeDiagnosticReport.prerequisite.axiomSummary}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {onNavigateToAssessment && (
                <button
                  onClick={onNavigateToAssessment}
                  className="flex items-center gap-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition cursor-pointer"
                >
                  <span>View in Psychometric Tab</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setActiveDiagnosticReport(null)}
                className="p-1 rounded-lg text-rose-400 hover:text-rose-700 hover:bg-rose-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Psychometric Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Adaptive Practice Engine (
              {selectedBoardId === 'IB_MYP'
                ? 'IB MYP Inquiry Matrix'
                : selectedBoardId === 'CAMBRIDGE'
                ? 'Cambridge Past Papers & Matrix'
                : 'Question Bank & Previous Year Papers'}
              )
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Dynamically adjusting problem difficulty $b$ from{' '}
            {selectedBoardId === 'IB_MYP'
              ? 'IB MYP Criterion Inquiries & Question Bank'
              : selectedBoardId === 'CAMBRIDGE'
              ? 'Cambridge Past Exam Papers & Question Matrix'
              : 'Previous Year Exam Papers & Question Bank'}{' '}
            for <strong className="text-slate-800">{chapterTitle || conceptTitle || 'Selected Chapter'}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Latent Ability Gauge */}
          <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl flex items-center gap-3 shadow-xs">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Estimated Ability (θ)</span>
              <span className={`text-base font-bold font-mono ${session.currentTheta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {session.currentTheta > 0 ? `+${session.currentTheta}` : session.currentTheta}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-slate-200" />
            <div>
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Confidence (SE)</span>
              <span className="text-sm font-bold font-mono text-slate-700">±{session.standardError}</span>
            </div>
          </div>

          <button
            onClick={handleResetSession}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer border border-slate-200"
            title="Reset Practice Session"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Latent Ability Spectrum Indicator */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
        <div className="flex justify-between text-[11px] font-mono text-slate-500">
          <span>-3.0 (Remedial / Foundation)</span>
          <span>
            0.0 (Grade-Level{' '}
            {selectedBoardId === 'IB_MYP'
              ? 'IB Standard'
              : selectedBoardId === 'CAMBRIDGE'
              ? 'Cambridge Standard'
              : 'CBSE Standard'}
            )
          </span>
          <span>+3.0 (Cognitive Acceleration / HOTS)</span>
        </div>
        
        <div className="w-full bg-slate-200 h-3 rounded-full relative overflow-hidden">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400 z-10" />
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-500 shadow-xs"
            style={{
              left: `${Math.max(0, Math.min(100, ((session.currentTheta + 3.0) / 6.0) * 100))}%`,
              width: '14px',
              transform: 'translateX(-50%)'
            }}
          />
        </div>
      </div>

      {/* Subject-Aware Mode Toggle (Objective MCQs vs Subjective Analytical for Non-Math) */}
      {!isMathSubject ? (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-sky-50/70 border border-sky-200 rounded-xl">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-slate-800">Practice Question Format:</span>
          </div>

          <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            <button
              onClick={() => {
                setActiveQuestionMode('OBJECTIVE');
                setActiveItemEvaluated(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeQuestionMode === 'OBJECTIVE'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Objective (MCQ / PYQ)</span>
            </button>
            <button
              onClick={() => {
                setActiveQuestionMode('SUBJECTIVE');
                setActiveItemEvaluated(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeQuestionMode === 'SUBJECTIVE'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Subjective (2–3 Mark Analytical)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
            <Target className="w-4 h-4 text-amber-600" />
            <span>Mathematics &amp; Numerical Mode: Interactive Objective Evaluation with Step-by-Step Proof Verification</span>
          </div>
          <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
            Objective-First
          </span>
        </div>
      )}

      {/* Embedded Board-Specific UX Adapter */}
      {activeItem ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-sky-600" />
              <span>
                Item Difficulty $b$: <strong className="text-sky-700">{activeItem.difficultyB > 0 ? '+' + activeItem.difficultyB : activeItem.difficultyB}</strong> | Discrimination $a$: <strong className="text-sky-700">{activeItem.discriminationA}</strong>
              </span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Questions Answered: {session.itemsCompleted}
            </span>
          </div>

          {selectedBoardId === 'CBSE' && (
            <CBSEAdapter
              key={activeItem.id}
              item={activeItem}
              onVerifyProof={(success) => handleResponseEvaluated(success)}
            />
          )}

          {selectedBoardId === 'CAMBRIDGE' && (
            <CambridgeAdapter
              key={activeItem.id}
              item={activeItem}
              onSubmitAnswer={(ans) => handleResponseEvaluated(ans.length > 5)}
            />
          )}

          {selectedBoardId === 'IB_MYP' && (
            <IBMYPAdapter
              key={activeItem.id}
              item={activeItem}
              onGradeAssessed={(ibGrade) => handleResponseEvaluated(ibGrade >= 4)}
            />
          )}

          {/* Next Question Navigation */}
          {activeItemEvaluated && (
            <div className="flex justify-end pt-2 animate-fadeIn">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Next Adaptive Practice Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
          <h4 className="text-base font-bold text-slate-900">Adaptive Practice Set Completed</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            All practice questions in current chapter registry completed. Latent ability converged at θ = {session.currentTheta}.
          </p>
          <button
            onClick={handleResetSession}
            className="mt-4 px-4 py-2 bg-sky-600 text-white text-xs font-semibold rounded-xl hover:bg-sky-500 transition"
          >
            Restart Practice Session
          </button>
        </div>
      )}

      {/* History & Psychometric Trajectory */}
      {feedback && (
        <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-800 flex items-center gap-2 animate-fadeIn">
          <TrendingUp className="w-4 h-4 text-sky-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}
    </OcaverseWatermarkContainer>
  );
};

