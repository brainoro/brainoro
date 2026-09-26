'use client';

import React, { useState, useEffect } from 'react';
import {
  Swords,
  Timer,
  Trophy,
  Zap,
  Sparkles,
  RotateCcw,
  CheckCircle,
  XCircle,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getChapterBlitzQuestions } from '@/lib/interactive/chapterAiKnowledgeEngine';
import { MathText } from '../common/MathRenderer';

interface ChapterBlitzDuelProps {
  chapterTitle: string;
  subject: string;
  grade: number;
}

export const ChapterBlitzDuel: React.FC<ChapterBlitzDuelProps> = ({
  chapterTitle,
  subject,
  grade,
}) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [answeredState, setAnsweredState] = useState<'correct' | 'wrong' | null>(null);

  // Fetch 100% authentic, chapter-specific conceptual questions
  const questions = getChapterBlitzQuestions(chapterTitle, subject, grade);

  // Timer countdown
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0) {
      setGameState('completed');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleStart = () => {
    setGameState('playing');
    setTimeLeft(60);
    setCurrentQIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOpt(null);
    setAnsweredState(null);
  };

  const handleSelectOption = (idx: number) => {
    if (answeredState !== null) return; // already answered

    setSelectedOpt(idx);
    const isCorrect = idx === questions[currentQIndex].correct;

    if (isCorrect) {
      setAnsweredState('correct');
      setScore((s) => s + 100 + streak * 25);
      setStreak((st) => st + 1);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
      } catch (e) {}
    } else {
      setAnsweredState('wrong');
      setStreak(0);
    }

    // Advance after 1.2s
    setTimeout(() => {
      setSelectedOpt(null);
      setAnsweredState(null);
      if (currentQIndex + 1 < questions.length) {
        setCurrentQIndex((c) => c + 1);
      } else {
        setGameState('completed');
        try {
          confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }, 1200);
  };

  return (
    <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm text-slate-800 space-y-5">
      {/* Duel Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 shadow-2xs">
            <Swords className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              60-Second Blitz Duel Arena
            </h3>
            <p className="text-xs text-slate-500">
              100% Authentic Conceptual Challenge on {chapterTitle}
            </p>
          </div>
        </div>

        {gameState === 'playing' && (
          <div className="flex items-center gap-3">
            {/* Adrenaline Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-800">
              <Timer className="w-4 h-4 text-amber-600" />
              <span>{timeLeft}s</span>
            </div>

            {/* Score & Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800">
              <Zap className="w-4 h-4 text-sky-600" />
              <span>{score} XP</span>
              {streak > 1 && (
                <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-md font-extrabold">
                  {streak}x Combo!
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Duel Canvas */}
      {gameState === 'idle' && (
        <div className="text-center py-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-100 to-sky-100 border border-amber-200 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-lg font-bold text-slate-900">Ready for {chapterTitle} Blitz?</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Answer 3 rapid-fire authentic concept questions before the timer hits zero to earn +150 Brainoro XP and unlock the Chapter Mastery Badge.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition flex items-center gap-2 mx-auto cursor-pointer"
          >
            <Swords className="w-4 h-4" />
            <span>Enter The Duel Arena</span>
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Question {currentQIndex + 1} of {questions.length}</span>
            <span className="font-bold text-amber-700">Streak: {streak} 🔥</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 leading-snug shadow-2xs">
            <MathText text={questions[currentQIndex].q} />
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {questions[currentQIndex].options.map((opt, i) => {
              const isSelected = selectedOpt === i;
              const isCorrect = i === questions[currentQIndex].correct;

              let style = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 shadow-2xs';
              if (answeredState !== null) {
                if (isCorrect) {
                  style = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400';
                } else if (isSelected && !isCorrect) {
                  style = 'bg-rose-50 border-rose-400 text-rose-900 ring-1 ring-rose-400';
                } else {
                  style = 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-50';
                }
              }

              return (
                <button
                  key={i}
                  disabled={answeredState !== null}
                  onClick={() => handleSelectOption(i)}
                  className={`p-3.5 rounded-xl border text-xs text-left font-medium transition flex items-center justify-between gap-3 ${style} cursor-pointer`}
                >
                  <span><MathText text={opt} /></span>
                  {answeredState !== null && isCorrect && (
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {answeredState !== null && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {answeredState !== null && (
            <p className="text-[11px] text-amber-900 font-medium p-3 rounded-xl bg-amber-50/90 border border-amber-200">
              <span>💡 </span>
              <MathText text={questions[currentQIndex].tip} />
            </p>
          )}
        </div>
      )}

      {gameState === 'completed' && (
        <div className="text-center py-6 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-black text-slate-900">Duel Complete!</h4>
            <p className="text-xs text-slate-600">
              Final Score: <span className="font-mono font-bold text-amber-700 text-sm">{score} XP</span> • Mastery Level: <span className="text-emerald-700 font-bold">Concept Conqueror 🏆</span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition flex items-center gap-2 mx-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Play Duel Again</span>
          </button>
        </div>
      )}
    </div>
  );
};
