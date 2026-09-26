'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PieChart,
  Compass,
  Maximize2,
  Zap,
  Scale,
  Activity,
  RefreshCw,
  Sun,
  Eye,
  GitBranch,
  AlertTriangle,
  FlaskConical,
  Atom,
  AlertOctagon,
  Microscope,
  Leaf,
  CheckCircle2,
  Globe,
  BookOpen,
  Clock,
  Feather,
  CheckCircle,
  ShieldAlert,
  Volume2,
  VolumeX,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StoryCard, TrapQuiz } from '@/lib/interactive/chapterHypnoticEngine';
import { MathText } from '../common/MathRenderer';

interface StoryReelsDeckProps {
  storyCards: StoryCard[];
  trapQuiz: TrapQuiz;
  chapterTitle: string;
}

export const StoryReelsDeck: React.FC<StoryReelsDeckProps> = ({
  storyCards,
  trapQuiz,
  chapterTitle,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const totalCards = storyCards.length; // usually 3
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const DURATION_PER_CARD_MS = 6000; // 6 seconds per reel

  // Handle auto-advancing progress
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const interval = 60; // 60ms tick
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentIdx((c) => (c + 1) % totalCards);
          return 0;
        }
        return prev + (interval / DURATION_PER_CARD_MS) * 100;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalCards]);

  const goToCard = (index: number) => {
    setCurrentIdx(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev > 0 ? prev - 1 : totalCards - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % totalCards);
    setProgress(0);
  };

  const handleQuizAnswer = (optionId: string, isTrap: boolean) => {
    setSelectedQuizOption(optionId);
    setIsQuizSubmitted(true);
    setIsPlaying(false); // Pause so student can read explanation

    if (!isTrap) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  // Render icon dynamically
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-8 h-8 text-sky-400' };
    switch (iconName) {
      case 'PieChart':
        return <PieChart {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      case 'Maximize2':
        return <Maximize2 {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Scale':
        return <Scale {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'RefreshCw':
        return <RefreshCw {...props} />;
      case 'Sun':
        return <Sun {...props} />;
      case 'Eye':
        return <Eye {...props} />;
      case 'GitBranch':
        return <GitBranch {...props} />;
      case 'AlertTriangle':
        return <AlertTriangle {...props} />;
      case 'FlaskConical':
        return <FlaskConical {...props} />;
      case 'Atom':
        return <Atom {...props} />;
      case 'AlertOctagon':
        return <AlertOctagon {...props} />;
      case 'Microscope':
        return <Microscope {...props} />;
      case 'Leaf':
        return <Leaf {...props} />;
      case 'CheckCircle2':
        return <CheckCircle2 {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'BookOpen':
        return <BookOpen {...props} />;
      case 'Clock':
        return <Clock {...props} />;
      case 'Feather':
        return <Feather {...props} />;
      case 'ShieldAlert':
        return <ShieldAlert {...props} className="w-8 h-8 text-rose-400" />;
      default:
        return <Sparkles {...props} />;
    }
  };

  const currentCard = storyCards[currentIdx] || storyCards[0];
  const isTrapCard = currentIdx === 2; // 3rd card is usually the interactive trap card

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-sm text-slate-800 transition-all duration-300"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => !isQuizSubmitted && setIsPlaying(true)}
    >
      {/* Background ambient glow effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-50/50 via-white to-indigo-50/50 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Story Progress Bars (Instagram / Reels Style) */}
      <div className="relative z-10 px-5 pt-4 pb-2 flex items-center gap-1.5">
        {storyCards.map((card, idx) => {
          const isCurrent = idx === currentIdx;
          const isPassed = idx < currentIdx;
          const barWidth = isPassed ? '100%' : isCurrent ? `${progress}%` : '0%';

          return (
            <button
              key={card.id}
              onClick={() => goToCard(idx)}
              className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden cursor-pointer transition"
              title={`Jump to ${card.headline}`}
            >
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-75"
                style={{ width: barWidth }}
              />
            </button>
          );
        })}
      </div>

      {/* Header controls bar */}
      <div className="relative z-10 px-5 py-2 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider shadow-2xs ${currentCard.badgeColor}`}
          >
            {currentCard.badge}
          </span>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline truncate max-w-[220px]">
            {chapterTitle}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition text-xs cursor-pointer shadow-2xs"
            title={isPlaying ? 'Pause Auto-Reel' : 'Play Auto-Reel'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer shadow-2xs"
            title="Previous Story"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer shadow-2xs"
            title="Next Story"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Reel Card Content Area */}
      <div className="relative z-10 p-6 min-h-[220px] flex flex-col justify-between">
        {!isTrapCard ? (
          /* Normal Story Card */
          <div className="space-y-3.5 animate-fadeIn">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 shadow-xs shrink-0 text-sky-600">
                  {renderIcon(currentCard.keyVisualIcon)}
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-900 leading-tight">
                    <MathText text={currentCard.headline} />
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    <MathText text={currentCard.punchline} />
                  </p>

                  {/* High-Yield Highlight Chips */}
                  {currentCard.highlights && currentCard.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {currentCard.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-50/90 border border-sky-200 text-[11px] font-semibold text-sky-800 shadow-2xs"
                        >
                          <Zap className="w-3 h-3 text-sky-500 shrink-0" />
                          <span><MathText text={h} /></span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Golden Key Takeaway Pill */}
              <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-950 flex items-center gap-2 shadow-2xs">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold leading-snug">
                  <MathText text={currentCard.takeaway} />
                </span>
              </div>
            </div>
        ) : (
          /* Trap Buster Interactive Quiz Card */
          <div className="space-y-3.5 animate-fadeIn">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0" />
              <h4 className="text-sm font-bold text-slate-900">
                <MathText text={trapQuiz.question} />
              </h4>
            </div>

            {/* Interactive Options */}
            <div className="grid grid-cols-1 gap-2">
              {trapQuiz.options.map((opt) => {
                const isSelected = selectedQuizOption === opt.id;
                let optStyle =
                  'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                if (isQuizSubmitted) {
                  if (!opt.isTrap) {
                    optStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-1 ring-emerald-400';
                  } else if (isSelected && opt.isTrap) {
                    optStyle = 'bg-rose-50 border-rose-400 text-rose-900 ring-1 ring-rose-400';
                  } else {
                    optStyle = 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleQuizAnswer(opt.id, opt.isTrap)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition flex items-start justify-between gap-2 ${optStyle} cursor-pointer`}
                  >
                    <span className="font-medium"><MathText text={opt.text} /></span>
                    {isQuizSubmitted && !opt.isTrap && (
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isQuizSubmitted && isSelected && opt.isTrap && (
                      <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Pro-tip */}
            {isQuizSubmitted ? (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 leading-snug">
                {selectedQuizOption && (
                  <MathText
                    text={trapQuiz.options.find((o) => o.id === selectedQuizOption)?.explanation || ''}
                  />
                )}
              </div>
            ) : (
              <p className="text-[11px] text-amber-800 font-medium italic flex items-center gap-1">
                <span>💡 </span>
                <MathText text={trapQuiz.proTip} />
              </p>
            )}
          </div>
        )}

        {/* Bottom Story Navigation Dots */}
        <div className="pt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 mt-2">
          <span>Reel {currentIdx + 1} of {totalCards}</span>
          <div className="flex items-center gap-1">
            {storyCards.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIdx ? 'bg-sky-600 w-4' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
