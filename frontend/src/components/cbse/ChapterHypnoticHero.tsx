'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Swords,
  Bot,
  Clock,
  Flame,
  ArrowRight,
} from 'lucide-react';
import {
  ChapterHypnoticData,
  resolveChapterHypnoticData,
} from '@/lib/interactive/chapterHypnoticEngine';
import { BoardId } from '@/lib/types';
import { StoryReelsDeck } from './StoryReelsDeck';
import { ChapterBlitzDuel } from './ChapterBlitzDuel';
import { ChapterAiTwin } from './ChapterAiTwin';
import { MathText } from '../common/MathRenderer';

interface ChapterHypnoticHeroProps {
  chapterTitle: string;
  chapterNumber: number | string;
  subject: string;
  grade: number;
  boardId?: BoardId;
  onLaunchLearn?: () => void;
  onLaunchPractice?: () => void;
  onLaunchCheatSheet?: () => void;
}

export const ChapterHypnoticHero: React.FC<ChapterHypnoticHeroProps> = ({
  chapterTitle,
  chapterNumber,
  subject,
  grade,
  boardId = 'CBSE',
  onLaunchLearn,
  onLaunchPractice,
  onLaunchCheatSheet,
}) => {
  // 3 Hypnotic Modes: Reels (Concept 2), Blitz Duel (Concept 4), AI Twin (Concept 6)
  const [activeTab, setActiveTab] = useState<'reels' | 'duel' | 'aitwin'>('reels');

  // Resolve 100% authentic, domain-specific insights
  const data: ChapterHypnoticData = resolveChapterHypnoticData(
    chapterTitle,
    subject,
    grade,
    boardId
  );

  return (
    <section className="w-full space-y-4" data-testid="chapter-hypnotic-hero">
      {/* Top Hypnotic Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-sky-50/80 via-white to-indigo-50/70 border border-slate-200/90 p-6 shadow-xs text-slate-800 overflow-hidden">
        {/* Ambient Decorative Light */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-200">
                Chapter {chapterNumber} • {data.subject}
              </span>
              <span className="flex items-center gap-1 text-xs text-amber-800 bg-amber-100/80 border border-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                {data.examWeightage}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {data.timeEstimate}
              </span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {chapterTitle}
            </h2>

            <p className="text-xs text-slate-600 leading-relaxed max-w-2xl font-medium italic">
              &ldquo;<MathText text={data.masterHook} />&rdquo;
            </p>
          </div>

          {/* Quick Action Launchpad Buttons */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {onLaunchLearn && (
              <button
                type="button"
                onClick={onLaunchLearn}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-sky-100" />
                <span>Learn Concept</span>
              </button>
            )}
            {onLaunchPractice && (
              <button
                type="button"
                onClick={onLaunchPractice}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 font-semibold text-xs shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                <span>Practice</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Experience Mode Switcher (Reels vs Blitz Duel vs Chapter AI Twin) */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Concept 2: 15-Sec Story Cards */}
          <button
            onClick={() => setActiveTab('reels')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'reels'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>🎬 15-Sec Story Cards (Reels)</span>
          </button>

          {/* Concept 4: Boss Battle & 60-Sec Blitz Duel */}
          <button
            onClick={() => setActiveTab('duel')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'duel'
                ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-amber-600" />
            <span>⚔️ 60-Sec Blitz Duel</span>
          </button>

          {/* Concept 6: Chapter AI Twin */}
          <button
            onClick={() => setActiveTab('aitwin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'aitwin'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-bold'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-indigo-600" />
            <span>🤖 Chapter AI Twin (Talk to Chapter)</span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Views */}
      <div className="transition-all duration-200">
        {/* Concept 2: Story Cards (Reels) */}
        {activeTab === 'reels' && (
          <StoryReelsDeck
            storyCards={data.storyCards}
            trapQuiz={data.trapQuiz}
            chapterTitle={chapterTitle}
          />
        )}

        {/* Concept 4: Blitz Duel */}
        {activeTab === 'duel' && (
          <ChapterBlitzDuel
            chapterTitle={chapterTitle}
            subject={subject}
            grade={grade}
          />
        )}

        {/* Concept 6: Chapter AI Twin */}
        {activeTab === 'aitwin' && (
          <ChapterAiTwin
            chapterTitle={chapterTitle}
            subject={subject}
            grade={grade}
          />
        )}
      </div>
    </section>
  );
};
