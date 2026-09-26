'use client';

import React, { useMemo, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { BoardId, BoardRegistry, CurriculumConcept, SubjectRegistry, AuthoritativeTextbookPart } from '../../lib/types';
import {
  getAvailableGrades,
  getAvailableSubjects,
  getUnitsBySubject,
  getTopicsByUnit,
} from '../../lib/supabase/curriculumService';
import {
  Layers,
  GraduationCap,
  BookOpen,
  FolderTree,
  FileText,
  ChevronRight,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Database,
  Compass,
} from 'lucide-react';

interface Props {
  concepts: CurriculumConcept[];
  boards: BoardRegistry[];
  selectedBoardId: BoardId;
  onSelectBoard: (boardId: BoardId) => void;
  selectedGrade: number;
  onSelectGrade: (grade: number) => void;
  selectedSubject: string;
  onSelectSubject: (subject: string) => void;
  selectedUnit: string;
  onSelectUnit: (unit: string) => void;
  activeConceptId: string;
  onSelectConcept: (conceptId: string) => void;
  onOpenIngestion: () => void;
  isLiveDb?: boolean;
  parts?: AuthoritativeTextbookPart[];
  activePartNumber?: number;
  onSelectPart?: (partNumber: number) => void;
  children?: React.ReactNode;
}

export const HierarchicalCurriculumSelector: React.FC<Props> = ({
  concepts,
  boards,
  selectedBoardId,
  onSelectBoard,
  selectedGrade,
  onSelectGrade,
  selectedSubject,
  onSelectSubject,
  selectedUnit,
  onSelectUnit,
  activeConceptId,
  onSelectConcept,
  onOpenIngestion,
  isLiveDb = true,
  parts,
  activePartNumber = 1,
  onSelectPart,
  children,
}) => {
  const { isCustomerAdmin, isSuperAdmin, profile } = useAuth();
  const isPrivileged = Boolean(
    profile?.role !== 'STUDENT' && (isCustomerAdmin || isSuperAdmin || profile?.role === 'EDUCATOR' || profile?.role === 'SUPER_ADMIN')
  );

  // Available Grades for this Board
  const availableGrades = useMemo(() => {
    const list = getAvailableGrades(concepts, selectedBoardId);
    if (list.length > 0) return list;
    return [6, 7, 8, 9, 10, 11, 12];
  }, [concepts, selectedBoardId]);

  // Available Subjects for this Board & Grade
  const availableSubjects = useMemo(() => {
    const list = getAvailableSubjects(concepts, selectedBoardId, selectedGrade);
    if (list.length > 0) return list;
    return ['MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'SCIENCE'];
  }, [concepts, selectedBoardId, selectedGrade]);

  // Available Units for this Board, Grade & Subject
  const availableUnits = useMemo(() => {
    return getUnitsBySubject(concepts, selectedBoardId, selectedGrade, selectedSubject);
  }, [concepts, selectedBoardId, selectedGrade, selectedSubject]);

  // Compute effective unit: fallback to ALL_UNITS if selectedUnit is stale/invalid for this board/grade/subject
  const effectiveUnit = useMemo(() => {
    if (!selectedUnit || selectedUnit === 'ALL_UNITS') return 'ALL_UNITS';
    if (availableUnits.includes(selectedUnit)) return selectedUnit;
    return 'ALL_UNITS';
  }, [selectedUnit, availableUnits]);

  // Strict matching topics for the selected parameters
  const strictTopics = useMemo(() => {
    if (effectiveUnit && effectiveUnit !== 'ALL_UNITS') {
      const unitTopics = getTopicsByUnit(
        concepts,
        selectedBoardId,
        selectedGrade,
        selectedSubject,
        effectiveUnit
      );
      if (unitTopics.length > 0) return unitTopics;
    }
    return getTopicsByUnit(
      concepts,
      selectedBoardId,
      selectedGrade,
      selectedSubject,
      'ALL_UNITS'
    );
  }, [concepts, selectedBoardId, selectedGrade, selectedSubject, effectiveUnit]);

  // Available Topics for the full 4-tier selection with guaranteed unbroken fallback chain
  const availableTopics = useMemo(() => {
    if (strictTopics.length > 0) return strictTopics;
    const gradeTopics = concepts.filter(c => c.boardId === selectedBoardId && c.gradeLevel === selectedGrade);
    if (gradeTopics.length > 0) return gradeTopics;
    const boardTopics = concepts.filter(c => c.boardId === selectedBoardId);
    if (boardTopics.length > 0) return boardTopics;
    return concepts;
  }, [strictTopics, concepts, selectedBoardId, selectedGrade]);

  // Topics available for display in the Chapter sequence sidebar
  const displayTopics = useMemo(() => {
    if (availableTopics.length > 0) return availableTopics;
    return concepts.length > 0 ? concepts : [];
  }, [availableTopics, concepts]);

  // Guaranteed valid concept ID for the active selection
  const effectiveConceptId = useMemo(() => {
    if (displayTopics.some(t => t.id === activeConceptId)) {
      return activeConceptId;
    }
    return displayTopics[0]?.id || '';
  }, [displayTopics, activeConceptId]);

  // Find the active concept object
  const activeConcept = useMemo(() => {
    return concepts.find(c => c.id === effectiveConceptId) || displayTopics[0] || null;
  }, [concepts, effectiveConceptId, displayTopics]);

  // Reactive synchronization: ensure activeConceptId stays strictly within displayTopics
  useEffect(() => {
    if (displayTopics.length === 0) return;
    const isCurrentInAvailable = displayTopics.some(t => t.id === activeConceptId);
    if (!isCurrentInAvailable && displayTopics[0]) {
      onSelectConcept(displayTopics[0].id);
    }
  }, [displayTopics, activeConceptId, onSelectConcept]);

  // Cascade handler: when Grade changes
  const handleGradeChange = (newGrade: number) => {
    onSelectGrade(newGrade);
  };

  // Cascade handler: when Subject changes
  const handleSubjectChange = (newSubject: string) => {
    onSelectSubject(newSubject);
  };

  // Friendly display names for subjects
  const subjectLabels: Record<string, string> = {
    ALL: 'All Subjects',
    MATH: 'Mathematics',
    PHYSICS: 'Physics',
    CHEMISTRY: 'Chemistry',
    BIOLOGY: 'Biology',
    SCIENCE: 'Integrated Science',
  };

  // Board display name formatting
  const boardMeta = boards.find(b => b.id === selectedBoardId);
  const boardDisplayName = boardMeta
    ? (boardMeta.displayName || (boardMeta as any).display_name || boardMeta.id).split('(')[0].trim()
    : selectedBoardId;

  return (
    <div className="space-y-6 print:hidden" data-testid="curriculum-matrix">
      {/* 1. Top Curriculum Context & Tier Selectors Card (Matching CBSE Layout) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        {/* Header & Dynamic Breadcrumb Trail */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  {boardDisplayName} Curriculum Matrix
                </h2>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  Class {selectedGrade} • {subjectLabels[selectedSubject] || selectedSubject}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Official syllabus framework with authentic criteria descriptors and active chapter sequence.
              </p>
            </div>
          </div>

          {/* Live Indicator & Topic Count */}
          <div className="flex items-center gap-2">
            <div className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{displayTopics.length} Chapters in View</span>
            </div>
            <div className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5">
              <Database className="w-3 h-3 text-sky-600" />
              <span className="text-sky-700 font-semibold">
                {isLiveDb ? 'DB: Supabase (Live)' : 'DB: Local Standby'}
              </span>
            </div>
          </div>
        </div>

        {/* 1. Grade / Class Level Selector Pills */}
        <div className="space-y-2" data-testid="board-grade-selector">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>Select Class / Grade Level:</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {(isPrivileged ? availableGrades : availableGrades.filter((g) => g === selectedGrade)).map((g) => {
              const isSelected = g === selectedGrade;
              return (
                <button
                  key={`grade-${g}`}
                  type="button"
                  onClick={() => isPrivileged && handleGradeChange(g)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs font-bold ring-2 ring-sky-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>Class {g}</span>
                  {g <= 8 && (
                    <span className="text-[9px] opacity-80 font-normal hidden sm:inline">(Middle)</span>
                  )}
                  {g >= 9 && g <= 10 && (
                    <span className="text-[9px] opacity-80 font-normal hidden sm:inline">(Secondary)</span>
                  )}
                  {g >= 11 && (
                    <span className="text-[9px] opacity-80 font-normal hidden sm:inline">(Senior Sec)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Grade-Specific Subject Selector Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2" data-testid="board-subject-selector">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Grade-Specific Subjects for Class {selectedGrade}:</span>
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              {selectedBoardId === 'CAMBRIDGE' ? 'Cambridge IGCSE / Lower Sec Standard' : 'IB MYP Criterion A–D Standard'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSubjectChange('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedSubject === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs font-bold'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
              }`}
            >
              All Subjects
            </button>
            {availableSubjects.map((s) => {
              const isSelected = selectedSubject === s;
              return (
                <button
                  key={`subj-${s}`}
                  type="button"
                  onClick={() => handleSubjectChange(s)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs font-bold'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {subjectLabels[s] || s}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Multi-Part / Multi-Book Pill Selector (if parts available) */}
        {parts && parts.length > 1 && onSelectPart && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600" />
                <span className="text-xs font-bold text-slate-800">
                  Curriculum Volumes / Parts:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {parts.map((p) => {
                  const isSelected = p.part_number === activePartNumber;
                  return (
                    <button
                      key={`hcs-part-${p.part_number}`}
                      type="button"
                      onClick={() => onSelectPart(p.part_number)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-300'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>{p.textbook_title || p.part_title}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                        isSelected ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.total_chapters} Ch
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 4. Board Authority Badge (Matching CBSE NCERT Badge Style) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-200/80">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-4 h-4 text-indigo-700 shrink-0" />
            <div>
              <span className="text-xs font-bold text-indigo-950">
                Official Syllabus Framework: {boardDisplayName} (Class {selectedGrade})
              </span>
              <span className="text-[11px] text-indigo-800 ml-2">
                {selectedBoardId === 'CAMBRIDGE' ? '(CAIE International • 2024–2026 Specification)' : '(IB Middle Years Programme • Criterion-Referenced Assessment)'}
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold bg-white text-indigo-900 border border-indigo-200 px-2 py-0.5 rounded-md self-start sm:self-auto">
            Standard: {selectedBoardId}
          </span>
        </div>
      </div>

      {/* 2. Chapter Sequence Sidebar & Hypnotic Hero 2-Column Layout (Matching CBSE Exactly) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official Chapter Sequence (Ordered Explicitly) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            {/* Multi-Part Switcher inside sidebar if multi-parts */}
            {parts && parts.length > 1 && onSelectPart && (
              <div className="mb-3 pb-3 border-b border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Switch Part / Book:</span>
                  <span className="text-sky-600 lowercase font-normal">{parts.length} parts</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {parts.map((p) => {
                    const isSelected = p.part_number === activePartNumber;
                    return (
                      <button
                        key={`sidebar-part-${p.part_number}`}
                        type="button"
                        onClick={() => onSelectPart(p.part_number)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        <span className="truncate">{p.textbook_title || p.part_title}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ml-1 shrink-0 ${
                          isSelected ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {p.total_chapters} Ch
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-sky-600" />
                <span>Chapters ({displayTopics.length})</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">Textbook Order</span>
            </div>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1" data-testid="board-chapter-list">
              {displayTopics.length === 0 ? (
                <div className="p-4 text-center text-xs text-amber-800 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5">
                  <AlertCircle className="w-5 h-5 mx-auto text-amber-600" />
                  <span className="font-bold block tracking-wide">NO CHAPTERS FOUND</span>
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    No curriculum chapters indexed for {selectedBoardId} Class {selectedGrade}.
                  </p>
                </div>
              ) : (
                displayTopics.map((t, idx) => {
                  const isSelected = t.id === effectiveConceptId;
                  const chNumber = idx + 1;
                  const cleanTitle = t.title.replace(/\\&/g, '&');
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => onSelectConcept(t.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-sky-50 border border-sky-300 text-sky-900 font-bold shadow-xs'
                          : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {chNumber}
                      </span>
                      <span className="leading-snug pt-0.5">{cleanTitle}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Hypnotic Hero Section */}
        <div className="lg:col-span-8 space-y-4">
          {children ? (
            children
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3 shadow-xs">
              <Sparkles className="w-8 h-8 text-sky-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">
                Select a Chapter to Launch Hypnotic Learning
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Explore 15-second story cards, 60-second Blitz Duels, and conversational AI Twin assistance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
