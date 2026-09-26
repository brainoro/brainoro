import React, { useState } from 'react';
import { MemoryCard } from '../../lib/types';
import { SpacedRepetitionClientEngine } from '../../lib/engine/spacedRepetition';
import { OcaverseWatermarkContainer } from '../common/OcaverseWatermarkContainer';
import { BrainCircuit, RotateCcw, AlertTriangle, CheckCircle, Flame, Calendar, Sparkles } from 'lucide-react';

interface Props {
  cards: MemoryCard[];
  onUpdateCard: (updated: MemoryCard) => void;
}

export const SpacedRepetitionHub: React.FC<Props> = ({ cards, onUpdateCard }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [hardToMemorize, setHardToMemorize] = useState(false);
  const [lastReviewFeedback, setLastReviewFeedback] = useState<string | null>(null);

  const currentCard = cards[activeCardIndex] || cards[0];

  // Box distribution counts
  const boxCounts = {
    box1: cards.filter(c => c.box === 1).length,
    box2: cards.filter(c => c.box === 2).length,
    box3: cards.filter(c => c.box === 3).length,
    box4: cards.filter(c => c.box === 4).length,
    box5: cards.filter(c => c.box === 5).length,
  };

  const handleReviewSubmission = (quality: number) => {
    if (!currentCard) return;

    const result = SpacedRepetitionClientEngine.calculateReview(
      quality,
      currentCard.repetitionCount,
      currentCard.intervalDays,
      currentCard.easeFactor,
      currentCard.retentionStability,
      hardToMemorize || currentCard.isHardToMemorize,
      1.0
    );

    const updatedCard: MemoryCard = {
      ...currentCard,
      intervalDays: result.intervalDays,
      repetitionCount: result.repetitionCount,
      easeFactor: result.easeFactor,
      retentionStability: result.retentionStability,
      retentionProbability: result.retentionProbability,
      box: result.box,
      nextReviewDate: result.nextReviewDate,
      isHardToMemorize: hardToMemorize,
    };

    onUpdateCard(updatedCard);
    setLastReviewFeedback(
      `SM-2 Calculated: Interval shifted to ${result.intervalDays} day(s), Ease Factor: ${result.easeFactor}, Leitner Box ${result.box}.`
    );

    setIsFlipped(false);
    setHardToMemorize(false);
    // Cycle to next card
    setActiveCardIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Cognitive Memory Tracker (Leitner / SM-2 Engine)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Automated spaced intervals mapped purely against abstract concept identifiers.
          </p>
        </div>

        {/* Acceleration badge */}
        <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs text-indigo-800 font-semibold shadow-xs">
          <Flame className="w-4 h-4 text-amber-500" />
          <span>Active Retrieval Queue: {cards.length} concepts</span>
        </div>
      </div>

      {/* Adaptive Revision Pattern Banner Generated from Practice Test */}
      <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-50 border border-indigo-200/80 rounded-2xl p-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-xs mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                ⚡ Adaptive Revision Pattern: Generated from Practice Test Performance
              </h4>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                Live Synced
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Based on your continuous adaptive practice responses, <strong className="text-rose-700">{boxCounts.box1} weak concept(s)</strong> have been routed into <strong>Box 1 (Daily Retrieval)</strong> for immediate remediation, while <strong className="text-emerald-700">{boxCounts.box2 + boxCounts.box3 + boxCounts.box4 + boxCounts.box5} concept(s)</strong> are spaced across graduated retention boxes.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Box Leitner Queue Visualizer */}
      <div className="space-y-2">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Leitner Automated Review Queues
        </div>
        <div className="grid grid-cols-5 gap-2">
          {[
            { box: 1, label: 'Box 1: Daily', count: boxCounts.box1, color: 'border-rose-200 bg-rose-50 text-rose-700' },
            { box: 2, label: 'Box 2: 3 Days', count: boxCounts.box2, color: 'border-amber-200 bg-amber-50 text-amber-700' },
            { box: 3, label: 'Box 3: Weekly', count: boxCounts.box3, color: 'border-sky-200 bg-sky-50 text-sky-700' },
            { box: 4, label: 'Box 4: 2 Weeks', count: boxCounts.box4, color: 'border-indigo-200 bg-indigo-50 text-indigo-700' },
            { box: 5, label: 'Box 5: Mastered', count: boxCounts.box5, color: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
          ].map(b => (
            <div key={b.box} className={`p-3 rounded-xl border ${b.color} text-center flex flex-col items-center justify-center shadow-xs`}>
              <span className="text-[11px] font-semibold block">{b.label}</span>
              <span className="text-lg font-bold font-mono mt-1">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Card Retrieval Window */}
      {currentCard && (
        <OcaverseWatermarkContainer
          variant="card"
          showBadge={true}
          className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden text-slate-900"
        >
          {/* Card Meta details */}
          <div className="flex items-center justify-between text-xs pb-3 mb-4 border-b border-slate-200">
            <span className="font-mono text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              {currentCard.conceptId}
            </span>
            <div className="flex items-center gap-3 text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Next: {currentCard.nextReviewDate}
              </span>
              <span>Ease: {currentCard.easeFactor}</span>
              <span>Interval: {currentCard.intervalDays}d</span>
            </div>
          </div>

          {/* Flashcard Prompt */}
          <div className="min-h-[120px] flex flex-col justify-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Active Retrieval Challenge:
            </h4>
            <p className="text-base text-slate-900 font-medium leading-relaxed">
              {currentCard.prompt}
            </p>
          </div>

          {/* Answer Reveal Area */}
          {isFlipped ? (
            <div className="mt-4 pt-4 border-t border-slate-200 animate-fadeIn">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Foundational Canonical Answer:</span>
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                {currentCard.answer}
              </p>

              {/* #HardToMemorize Toggle */}
              <div className="mt-4 flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={hardToMemorize}
                    onChange={(e) => setHardToMemorize(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 bg-white"
                  />
                  <span className="flex items-center gap-1 font-semibold text-amber-700">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Tag as #HardToMemorize
                  </span>
                  <span className="text-slate-500 text-[11px]">(Applies 0.75x interval penalty)</span>
                </label>
              </div>

              {/* SM-2 Quality Score Buttons (0 to 5) */}
              <div className="mt-5 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Self-Evaluation Quality Grade (SM-2):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {[
                    { q: 0, label: '0: Blackout', desc: 'No memory', bg: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200' },
                    { q: 1, label: '1: Failed', desc: 'Familiar only', bg: 'bg-orange-50 hover:bg-orange-100 text-orange-700 border-orange-200' },
                    { q: 2, label: '2: Incorrect', desc: 'Easy slip', bg: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200' },
                    { q: 3, label: '3: Hard Recall', desc: 'Significant effort', bg: 'bg-yellow-50 hover:bg-yellow-100 text-yellow-800 border-yellow-200' },
                    { q: 4, label: '4: Good', desc: 'Slight delay', bg: 'bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200' },
                    { q: 5, label: '5: Perfect', desc: 'Instant recall', bg: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200' },
                  ].map(b => (
                    <button
                      key={b.q}
                      onClick={() => handleReviewSubmission(b.q)}
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer shadow-xs ${b.bg}`}
                    >
                      <span className="text-xs font-bold">{b.label}</span>
                      <span className="text-[10px] opacity-80">{b.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setIsFlipped(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-sm transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Show Canonical Truth & Evaluate Recall</span>
              </button>
            </div>
          )}

        </OcaverseWatermarkContainer>
      )}

      {/* Real-time Feedback alert */}
      {lastReviewFeedback && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>{lastReviewFeedback}</span>
        </div>
      )}
    </div>
  );
};
