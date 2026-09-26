import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { BoardId, BoardRegistry } from '../../lib/types';
import { GraduationCap, Sparkles, Settings2, Check, HeartHandshake } from 'lucide-react';

interface Props {
  boards: BoardRegistry[];
  selectedBoardId: BoardId;
  onSelectBoard: (boardId: BoardId) => void;
  selectedGrade: number;
  onSelectGrade: (grade: number) => void;
  selectedSubject: string;
  onSelectSubject: (subj: string) => void;
  onOpenIngestion: () => void;
  viewMode?: 'cheatsheet' | 'cornell';
  onViewModeChange?: (mode: 'cheatsheet' | 'cornell') => void;
  onSelectCheatSheet?: () => void;
  onSelectParentPortal?: () => void;
}

export const BoardSwitchHeader: React.FC<Props> = ({
  boards,
  selectedBoardId,
  onSelectBoard,
  selectedGrade,
  onSelectGrade,
  selectedSubject,
  onSelectSubject,
  onOpenIngestion,
  viewMode = 'cheatsheet',
  onViewModeChange,
  onSelectCheatSheet,
  onSelectParentPortal,
}) => {
  const { isCustomerAdmin, isSuperAdmin, profile } = useAuth();
  const isPrivileged = Boolean(
    profile?.role !== 'STUDENT' && (isCustomerAdmin || isSuperAdmin || profile?.role === 'EDUCATOR' || profile?.role === 'SUPER_ADMIN')
  );
  const [showEducatorSwitcher, setShowEducatorSwitcher] = useState(false);
  const currentBoard = boards.find((b) => b.id === selectedBoardId);

  const formatGrade = (g: number) => {
    const roman: Record<number, string> = {
      6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII'
    };
    return roman[g] ? `Class ${roman[g]}` : `Grade ${g}`;
  };

  const subjectNames: Record<string, string> = {
    MATH: 'Mathematics',
    SCIENCE: 'Science',
    PHYSICS: 'Physics',
    CHEMISTRY: 'Chemistry',
    BIOLOGY: 'Biology',
    ALL: 'All Subjects',
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 px-6 py-3.5 relative z-20 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Brand Logo & Powered By OcaVerse */}
        <div className="flex items-center gap-3">
          <Image
            src="/brainoro-logo.png"
            alt="Brainoro - Own your Prep."
            width={180}
            height={64}
            unoptimized
            className="h-14 sm:h-16 w-auto rounded-xl object-contain shadow-xs hover:opacity-95 transition"
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

        {/* Student Active Curriculum Context Badge (Student-First UX) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 shadow-xs">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>
              {selectedBoardId} • {formatGrade(selectedGrade)} {subjectNames[selectedSubject] || selectedSubject}
            </span>
            {currentBoard && (
              <span className="text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded-md font-bold ml-1">
                {currentBoard.defaultGradingSystem}
              </span>
            )}
          </div>

          {/* Educator / Admin Mode Switcher Toggle (Locked/Hidden for Students) */}
          {isPrivileged && (
            <button
              onClick={() => setShowEducatorSwitcher(!showEducatorSwitcher)}
              className={`p-1.5 rounded-xl border text-xs font-medium transition flex items-center gap-1 ${
                showEducatorSwitcher
                  ? 'bg-sky-50 border-sky-300 text-sky-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
              title="Educator / Admin: Switch Educational Board"
              aria-label="Toggle Board Switcher"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold hidden sm:inline">
                {showEducatorSwitcher ? 'Close' : 'Switch Board'}
              </span>
            </button>
          )}
        </div>

        {/* Active Learning Mode Badge: Visual Cheat Sheet & Parents Portal */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (onSelectCheatSheet) {
                onSelectCheatSheet();
              } else if (onViewModeChange) {
                onViewModeChange('cheatsheet');
              }
            }}
            className="flex items-center p-1 bg-amber-50/60 hover:bg-amber-100/80 border border-amber-200 rounded-xl transition cursor-pointer shadow-xs"
            title="Switch to Visual Cheat Sheet mode"
            aria-label="Switch to Visual Cheat Sheet mode"
          >
            <div className="px-2.5 py-1 text-xs font-bold text-amber-900 font-kalam flex items-center gap-1.5">
              <span>📝 Visual Cheat Sheet</span>
            </div>
          </button>

          <button
            type="button"
            onClick={onSelectParentPortal}
            className="flex items-center p-1 bg-emerald-50/60 hover:bg-emerald-100/80 border border-emerald-200 rounded-xl transition cursor-pointer shadow-xs"
            title="Open Parents Cognitive Acceleration Portal"
            aria-label="Open Parents Cognitive Acceleration Portal"
          >
            <div className="px-2.5 py-1 text-xs font-bold text-emerald-800 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
              <span>Parents Portal</span>
            </div>
          </button>
        </div>

        {/* Subject, Grade and Ingestion Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => onSelectSubject(e.target.value)}
            aria-label="Filter curriculum by subject"
            className="bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium shadow-xs"
          >
            <option value="ALL">All Subjects</option>
            <option value="MATH">Mathematics</option>
            <option value="SCIENCE">Science</option>
            <option value="PHYSICS">Physics</option>
            <option value="CHEMISTRY">Chemistry</option>
            <option value="BIOLOGY">Biology</option>
          </select>

          {/* Grade Level Selector: Locked to onboarded grade for students */}
          <select
            value={selectedGrade}
            onChange={(e) => isPrivileged && onSelectGrade(Number(e.target.value))}
            disabled={!isPrivileged}
            aria-label="Filter curriculum by grade level"
            className={`bg-white border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium shadow-xs ${
              !isPrivileged ? 'cursor-default opacity-95 bg-slate-50' : ''
            }`}
          >
            {(isPrivileged ? [6, 7, 8, 9, 10] : [selectedGrade]).map((g) => (
              <option key={g} value={g}>
                Class {g}
              </option>
            ))}
          </select>

          {/* Ingest OER Button */}
          <button
            onClick={onOpenIngestion}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ingest OER</span>
          </button>
        </div>
      </div>

      {/* Educator / Admin Multi-Board Switcher Dropdown (Revealed on Demand) */}
      {isPrivileged && showEducatorSwitcher && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Educator Mode: Switch Active Board:</span>
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200">
              {boards.map((board) => {
                const isActive = board.id === selectedBoardId;
                return (
                  <button
                    key={board.id}
                    onClick={() => {
                      onSelectBoard(board.id);
                      setShowEducatorSwitcher(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>{board.id}</span>
                    {isActive && <Check className="w-3 h-3 ml-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {currentBoard && (
            <span className="text-[11px] text-slate-500">
              {currentBoard.displayName}: {currentBoard.description}
            </span>
          )}
        </div>
      )}
    </header>
  );
};
