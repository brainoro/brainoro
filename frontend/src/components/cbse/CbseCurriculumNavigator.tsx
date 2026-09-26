'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  CbseGrade,
  CbseStream,
  CbseGradeSubject,
  CbseTextbook,
  CbseChapter,
  CbseSection,
  CbseAuthoritativeConcept,
  CbseCurriculumContext,
} from '../../lib/types/cbseCurriculum';
import {
  fetchCbseGrades,
  fetchCbseStreams,
  fetchCbseGradeSubjects,
  fetchCbseTextbooks,
  fetchCbseChapters,
  fetchCbseSections,
  fetchCbseConcepts,
  resolveCbseCurriculumContext,
} from '../../lib/services/cbseCurriculumService';
import { resolveVerifiedCbseCurriculum } from '../../lib/services/cbseRuntimeGate';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Layers,
  GraduationCap,
  Compass,
  FileText,
  AlertCircle,
  Lightbulb,
  Bookmark,
  Clock,
} from 'lucide-react';
import { ChapterHypnoticHero } from './ChapterHypnoticHero';

interface Props {
  initialGrade?: number;
  initialStream?: string;
  initialSubject?: string;
  initialPartNumber?: number;
  onSelectConcept?: (concept: CbseAuthoritativeConcept, section?: CbseSection, context?: CbseCurriculumContext) => void;
  onLearnClick?: (concept: CbseAuthoritativeConcept) => void;
  onContextChange?: (grade: number, subjectId: string, textbookId: string) => void;
  onSelectPart?: (partNumber: number) => void;
}

export const CbseCurriculumNavigator: React.FC<Props> = ({
  initialGrade = 6,
  initialStream = 'GENERAL',
  initialSubject = 'MATH',
  initialPartNumber = 1,
  onSelectConcept,
  onLearnClick,
  onContextChange,
  onSelectPart,
}) => {
  const { isCustomerAdmin, isSuperAdmin, profile } = useAuth();
  const isPrivileged = Boolean(
    profile?.role !== 'STUDENT' && (isCustomerAdmin || isSuperAdmin || profile?.role === 'EDUCATOR' || profile?.role === 'SUPER_ADMIN')
  );

  const [grades, setGrades] = useState<CbseGrade[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<number>(initialGrade);

  const [streams, setStreams] = useState<CbseStream[]>([]);
  const [selectedStreamId, setSelectedStreamId] = useState<string>(initialStream);

  const [gradeSubjects, setGradeSubjects] = useState<CbseGradeSubject[]>([]);
  const [selectedGradeSubject, setSelectedGradeSubject] = useState<CbseGradeSubject | null>(null);

  const [textbooks, setTextbooks] = useState<CbseTextbook[]>([]);
  const [selectedTextbook, setSelectedTextbook] = useState<CbseTextbook | null>(null);

  const [chapters, setChapters] = useState<CbseChapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<CbseChapter | null>(null);

  const [sections, setSections] = useState<CbseSection[]>([]);
  const [activeSection, setActiveSection] = useState<CbseSection | null>(null);

  const [concepts, setConcepts] = useState<CbseAuthoritativeConcept[]>([]);
  const [activeConcept, setActiveConcept] = useState<CbseAuthoritativeConcept | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Synchronize with external initialGrade prop
  useEffect(() => {
    if (initialGrade && initialGrade !== selectedGrade) {
      setSelectedGrade(initialGrade);
    }
  }, [initialGrade]);

  // Synchronize with external initialSubject prop
  useEffect(() => {
    if (initialSubject && gradeSubjects.length > 0) {
      const found = gradeSubjects.find(
        (s) =>
          s.id.includes(initialSubject) ||
          s.display_name.toUpperCase().includes(initialSubject.toUpperCase())
      );
      if (found && found.id !== selectedGradeSubject?.id) {
        setSelectedGradeSubject(found);
      }
    }
  }, [initialSubject, gradeSubjects]);

  // Synchronize with external initialPartNumber prop
  useEffect(() => {
    if (initialPartNumber && textbooks.length >= initialPartNumber) {
      const targetTb = textbooks[initialPartNumber - 1];
      if (targetTb && targetTb.id !== selectedTextbook?.id) {
        setSelectedTextbook(targetTb);
      }
    }
  }, [initialPartNumber, textbooks, selectedTextbook]);

  // Atomic Part Selection Handler
  const handleSelectPart = (tb: CbseTextbook, partIndex: number) => {
    if (selectedTextbook?.id === tb.id) return;
    setSelectedTextbook(tb);
    if (onSelectPart) {
      onSelectPart(partIndex + 1);
    }
  };

  // Notify parent on context change
  useEffect(() => {
    if (onContextChange && selectedGrade && selectedGradeSubject) {
      onContextChange(selectedGrade, selectedGradeSubject.id, selectedTextbook?.id || '');
    }
  }, [selectedGrade, selectedGradeSubject, selectedTextbook, onContextChange]);

  // Atomic Selection Handlers preventing previous chapter/section/concept retention
  const handleSelectGrade = (newGrade: number) => {
    if (newGrade === selectedGrade) return;
    setSelectedGrade(newGrade);
    setGradeSubjects([]);
    setSelectedGradeSubject(null);
    setTextbooks([]);
    setSelectedTextbook(null);
    setChapters([]);
    setSelectedChapter(null);
    setSections([]);
    setActiveSection(null);
    setConcepts([]);
    setActiveConcept(null);
    setIsLoading(true);
  };

  const handleSelectStream = (newStreamId: string) => {
    if (selectedStreamId === newStreamId) return;
    setSelectedStreamId(newStreamId);
    setGradeSubjects([]);
    setSelectedGradeSubject(null);
    setTextbooks([]);
    setSelectedTextbook(null);
    setChapters([]);
    setSelectedChapter(null);
    setSections([]);
    setActiveSection(null);
    setConcepts([]);
    setActiveConcept(null);
  };

  const handleSelectSubject = (gs: CbseGradeSubject) => {
    if (selectedGradeSubject?.id === gs.id) return;
    setSelectedGradeSubject(gs);
    setTextbooks([]);
    setSelectedTextbook(null);
    setChapters([]);
    setSelectedChapter(null);
    setSections([]);
    setActiveSection(null);
    setConcepts([]);
    setActiveConcept(null);
  };

  // 1. Initial Load: Grades
  useEffect(() => {
    fetchCbseGrades().then((gList) => {
      setGrades(gList);
    });
  }, []);

  // 2. When Grade Changes: Update Streams & Subjects
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const loadGradeContext = async () => {
      const sList = await fetchCbseStreams(selectedGrade);
      if (!isMounted) return;
      setStreams(sList);

      const effectiveStreamId = selectedGrade <= 10 ? 'GENERAL' : (selectedStreamId !== 'GENERAL' ? selectedStreamId : 'SCIENCE');
      setSelectedStreamId(effectiveStreamId);

      const gsList = await fetchCbseGradeSubjects(selectedGrade, effectiveStreamId);
      if (!isMounted) return;
      setGradeSubjects(gsList);

      // Default subject
      const defaultSubj =
        gsList.find((s) => s.id.includes(initialSubject) || s.display_name.toUpperCase().includes(initialSubject.toUpperCase())) ||
        gsList[0];
      setSelectedGradeSubject(defaultSubj || null);
    };

    loadGradeContext();
    return () => { isMounted = false; };
  }, [selectedGrade]);

  // 3. When Stream Changes (for 11-12)
  useEffect(() => {
    if (selectedGrade <= 10) return;
    let isMounted = true;
    fetchCbseGradeSubjects(selectedGrade, selectedStreamId).then((gsList) => {
      if (!isMounted) return;
      setGradeSubjects(gsList);
      setSelectedGradeSubject(gsList[0] || null);
    });
    return () => { isMounted = false; };
  }, [selectedStreamId, selectedGrade]);

  // 4. When Subject Changes: Update Textbook
  useEffect(() => {
    setTextbooks([]);
    setSelectedTextbook(null);
    setChapters([]);
    setSelectedChapter(null);
    setSections([]);
    setActiveSection(null);
    setConcepts([]);
    setActiveConcept(null);

    if (!selectedGradeSubject) return;
    let isMounted = true;

    fetchCbseTextbooks(selectedGradeSubject.id).then((tbList) => {
      if (!isMounted) return;
      setTextbooks(tbList);
      const targetTb =
        (initialPartNumber && tbList.length >= initialPartNumber
          ? tbList[initialPartNumber - 1]
          : null) ||
        tbList.find((t) => t.is_primary) ||
        tbList[0] ||
        null;
      setSelectedTextbook(targetTb);
    });
    return () => { isMounted = false; };
  }, [selectedGradeSubject]);

  // 5. When Textbook Changes: Update Chapters
  useEffect(() => {
    setChapters([]);
    setSelectedChapter(null);
    setSections([]);
    setActiveSection(null);
    setConcepts([]);
    setActiveConcept(null);

    if (!selectedTextbook) return;
    let isMounted = true;

    fetchCbseChapters({
      textbookId: selectedTextbook.id,
      gradeId: `CBSE-G${selectedGrade}`,
      subjectId: selectedGradeSubject?.subject_id,
      curriculumVersionId: selectedTextbook.curriculum_version_id,
    }).then((chList) => {
      if (!isMounted) return;
      setChapters(chList);

      // Default chapter: Ch 2 for Class 6 Math or Ch 1
      const defaultCh =
        (selectedGrade === 6 && selectedGradeSubject?.id.includes('MATH')
          ? chList.find((c) => c.chapter_number === 2)
          : undefined) ||
        chList[0] ||
        null;
      setSelectedChapter(defaultCh);
      if (!defaultCh) {
        setIsLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [selectedTextbook, selectedGrade, selectedGradeSubject]);

  // 6. When Chapter Changes: Update Sections & Concepts
  useEffect(() => {
    setSections([]);
    setActiveSection(null);
    setConcepts([]);
    setActiveConcept(null);

    if (!selectedChapter) {
      setIsLoading(false);
      return;
    }
    let isMounted = true;

    Promise.all([
      fetchCbseSections(selectedChapter.id),
      fetchCbseConcepts(selectedChapter.id),
    ]).then(([secList, concList]) => {
      if (!isMounted) return;
      setSections(secList);
      setActiveSection(secList[0] || null);
      setConcepts(concList);
      setActiveConcept(concList[0] || null);
      setIsLoading(false);

      if (concList[0] && selectedGradeSubject && selectedTextbook && onSelectConcept) {
        const fullContext: CbseCurriculumContext = {
          isAuthoritative: true,
          grade: grades.find((g) => g.grade_level === selectedGrade) || {
            id: `CBSE-G${selectedGrade}`,
            grade_level: selectedGrade,
            display_name: `Class ${selectedGrade}`,
            stage: selectedGrade <= 8 ? 'MIDDLE_STAGE' : selectedGrade <= 10 ? 'SECONDARY_STAGE' : 'SENIOR_SECONDARY_STAGE',
            display_order: selectedGrade,
          },
          stream: streams.find((s) => s.id === selectedStreamId),
          gradeSubject: selectedGradeSubject,
          textbook: selectedTextbook,
          allChapters: chapters,
          selectedChapter: selectedChapter,
          sections: secList,
          activeSection: secList[0] || undefined,
          concepts: concList,
          activeConcept: concList[0],
          conceptSectionMappings: [],
          mappingState: 'VERIFIED',
        };
        onSelectConcept(concList[0], secList[0], fullContext);
      }
    });
    return () => { isMounted = false; };
  }, [selectedChapter]);

  const handleSelectSection = (sec: CbseSection) => {
    setActiveSection(sec);
    // Find matching concept or fallback
    const matched = concepts.find((c) => c.id.includes(sec.chapter_id)) || concepts[0];
    if (matched) {
      setActiveConcept(matched);
      if (onSelectConcept && selectedGradeSubject && selectedTextbook && selectedChapter) {
        const fullContext: CbseCurriculumContext = {
          isAuthoritative: true,
          grade: grades.find((g) => g.grade_level === selectedGrade) || {
            id: `CBSE-G${selectedGrade}`,
            grade_level: selectedGrade,
            display_name: `Class ${selectedGrade}`,
            stage: selectedGrade <= 8 ? 'MIDDLE_STAGE' : selectedGrade <= 10 ? 'SECONDARY_STAGE' : 'SENIOR_SECONDARY_STAGE',
            display_order: selectedGrade,
          },
          stream: streams.find((s) => s.id === selectedStreamId),
          gradeSubject: selectedGradeSubject,
          textbook: selectedTextbook,
          allChapters: chapters,
          selectedChapter: selectedChapter,
          sections: sections,
          activeSection: sec,
          concepts: concepts,
          activeConcept: matched,
          conceptSectionMappings: [],
          mappingState: 'VERIFIED',
        };
        onSelectConcept(matched, sec, fullContext);
      }
    }
  };

  const currentContext: CbseCurriculumContext | null = selectedGradeSubject && selectedTextbook ? {
    isAuthoritative: true,
    grade: grades.find((g) => g.grade_level === selectedGrade) || {
      id: `CBSE-G${selectedGrade}`,
      grade_level: selectedGrade,
      display_name: `Class ${selectedGrade}`,
      stage: selectedGrade <= 8 ? 'MIDDLE_STAGE' : selectedGrade <= 10 ? 'SECONDARY_STAGE' : 'SENIOR_SECONDARY_STAGE',
      display_order: selectedGrade,
    },
    stream: streams.find((s) => s.id === selectedStreamId),
    gradeSubject: selectedGradeSubject,
    textbook: selectedTextbook,
    allChapters: chapters,
    selectedChapter: selectedChapter || chapters[0] || ({} as any),
    sections,
    concepts,
    conceptSectionMappings: [],
    mappingState: 'VERIFIED',
  } : null;

  const runtimeGate = currentContext ? resolveVerifiedCbseCurriculum(currentContext) : null;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6" data-testid="cbse-curriculum-system">
      {/* Statutory Header & Breadcrumbs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              CBSE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">
                  CBSE Authoritative Curriculum OS
                </h2>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Statutory NCERT Hierarchy
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Official Classes 6–12 Curriculum & Textbook Structure
              </p>
            </div>
          </div>

          {/* Active Context Breadcrumb Pill */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl font-medium" data-testid="cbse-context-breadcrumb">
            <span className="font-bold text-slate-900">CBSE</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-sky-700">Class {selectedGrade}</span>
            {selectedGrade >= 11 && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-indigo-700">{streams.find(s => s.id === selectedStreamId)?.display_name || selectedStreamId}</span>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{selectedGradeSubject?.display_name || 'Subject'}</span>
            {selectedTextbook && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-600 italic font-medium">{selectedTextbook.title}</span>
              </>
            )}
            {runtimeGate && (
              <span className={`ml-2 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                runtimeGate.gate_status === 'PAGE_READY'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-amber-50 text-amber-700 border-amber-200'
              }`}>
                {runtimeGate.gate_status === 'PAGE_READY' ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>NCERT Verified</span>
                  </>
                ) : (
                  <>
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>Data Pending</span>
                  </>
                )}
              </span>
            )}
          </div>
        </div>

        {/* 1. Grade Selector (Classes 6 to 12) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>Select Class / Grade Level:</span>
          </label>
          <div className="flex flex-wrap gap-2" data-testid="cbse-grade-selector">
            {(isPrivileged ? grades : grades.filter((g) => g.grade_level === selectedGrade)).map((g) => {
              const isSelected = g.grade_level === selectedGrade;
              return (
                <button
                  key={g.id}
                  onClick={() => isPrivileged && handleSelectGrade(g.grade_level)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs font-bold ring-2 ring-sky-300'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>{g.display_name}</span>
                  {g.stage === 'MIDDLE_STAGE' && (
                    <span className="text-[9px] opacity-80 font-normal hidden sm:inline">(Middle)</span>
                  )}
                  {g.stage === 'SECONDARY_STAGE' && (
                    <span className="text-[9px] opacity-80 font-normal hidden sm:inline">(Secondary)</span>
                  )}
                  {g.stage === 'SENIOR_SECONDARY_STAGE' && (
                    <span className="text-[9px] opacity-80 font-normal hidden sm:inline">(Sr. Sec)</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Senior Secondary Stream Selector (Classes 11–12 Only) */}
        {selectedGrade >= 11 && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 animate-fadeIn" data-testid="cbse-stream-selector">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Select Stream / Academic Course (Classes 11–12):</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {streams.map((s) => {
                const isSelected = s.id === selectedStreamId;
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectStream(s.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs font-bold ring-2 ring-indigo-300'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {s.display_name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Grade-Specific Subject Selector */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2" data-testid="cbse-subject-selector">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Grade-Specific Subjects for Class {selectedGrade}:</span>
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              {selectedGrade <= 10 ? 'Unified Science Standard (No Standalone Phys/Chem/Bio)' : 'Stream Specialized'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {gradeSubjects.map((gs) => {
              const isSelected = selectedGradeSubject?.id === gs.id;
              return (
                <button
                  key={gs.id}
                  onClick={() => handleSelectSubject(gs)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs font-bold'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
                  }`}
                >
                  {gs.display_name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Active Textbook Badge & Multi-Part Switcher */}
        {selectedTextbook && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
            {textbooks.length > 1 && (
              <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200" data-testid="cbse-textbook-parts-switcher">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Textbook Volumes / Parts:
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2" data-testid="cbse-part-pills">
                  {textbooks.map((tb, idx) => {
                    const isSelected = selectedTextbook?.id === tb.id;
                    const chCount = 7;
                    return (
                      <button
                        key={tb.id}
                        type="button"
                        onClick={() => handleSelectPart(tb, idx)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-300'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                        data-testid={`cbse-part-tab-${tb.official_code || idx}`}
                      >
                        <span>{tb.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                          isSelected ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {chCount} Ch
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/50 p-3 rounded-xl border border-amber-200/80" data-testid="cbse-textbook-badge">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-amber-950">
                    Official NCERT Textbook: {selectedTextbook.title}
                  </span>
                  <span className="text-[11px] text-amber-800 ml-2">
                    ({selectedTextbook.publisher} • {selectedTextbook.edition})
                  </span>
                </div>
              </div>
              {selectedTextbook.official_code && (
                <span className="text-[10px] font-mono font-bold bg-white text-amber-900 border border-amber-200 px-2 py-0.5 rounded-md self-start sm:self-auto" data-testid="cbse-textbook-code-badge">
                  NCERT Code: {selectedTextbook.official_code}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 5. Chapter Sequence Navigator & Sections Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Official Chapter Sequence (Ordered Explicitly) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            {/* Multi-Part Switcher above chapters list */}
            {textbooks.length > 1 && (
              <div className="mb-3 pb-3 border-b border-slate-100 space-y-1.5" data-testid="cbse-sidebar-part-switcher">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span>Switch Part / Book:</span>
                  <span className="text-sky-600 lowercase font-normal">{textbooks.length} parts</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {textbooks.map((tb, idx) => {
                    const isSelected = selectedTextbook?.id === tb.id;
                    const chCount = 7;
                    return (
                      <button
                        key={`sidebar-${tb.id}`}
                        type="button"
                        onClick={() => handleSelectPart(tb, idx)}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                        data-testid={`cbse-sidebar-tab-${tb.official_code || idx}`}
                      >
                        <span className="truncate">{tb.title}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ml-1 shrink-0 ${
                          isSelected ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {chCount} Ch
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
                <span>Chapters ({chapters.length})</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-medium">Textbook Order</span>
            </div>

            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1" data-testid="cbse-chapter-list">
              {chapters.length === 0 || (runtimeGate && runtimeGate.gate_status !== 'PAGE_READY') ? (
                <div className="p-4 text-center text-xs text-amber-800 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5" data-testid="cbse-data-pending-badge">
                  <AlertCircle className="w-5 h-5 mx-auto text-amber-600" />
                  <span className="font-bold block tracking-wide">AUTHORITATIVE DATA PENDING</span>
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                    {runtimeGate?.diagnostics?.[0] || `Authoritative NCERT chapters for ${selectedTextbook?.title || 'this textbook'} are pending verification.`}
                  </p>
                </div>
              ) : (
                chapters.map((ch) => {
                  const isSelected = selectedChapter?.id === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChapter(ch)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-sky-50 border border-sky-300 text-sky-900 font-bold shadow-xs'
                          : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {ch.chapter_number}
                      </span>
                      <span className="leading-snug pt-0.5">{ch.chapter_title}</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Sections & Concept Details */}
        <div className="lg:col-span-8 space-y-4">
          {chapters.length === 0 || (runtimeGate && runtimeGate.gate_status !== 'PAGE_READY') ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3 shadow-xs" data-testid="cbse-right-col-pending">
              <AlertCircle className="w-8 h-8 text-amber-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-800">
                Authoritative Curriculum: DATA PENDING
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {runtimeGate?.diagnostics?.join('; ') || `No statutory chapters found for ${selectedTextbook?.title || 'selected textbook'}. Under fail-closed pedagogical safety, legacy content is strictly suppressed.`}
              </p>
            </div>
          ) : (
            <>
              {/* Hypnotic Chapter Hero (Concept 2 Reels + Concept 3 Sandbox Simulator) */}
              {selectedChapter && (
                <ChapterHypnoticHero
                  chapterTitle={selectedChapter.chapter_title}
                  chapterNumber={selectedChapter.chapter_number}
                  subject={selectedGradeSubject?.display_name || 'Mathematics'}
                  grade={selectedGrade}
                  onLaunchLearn={() => {
                    if (onLearnClick && activeConcept) {
                      onLearnClick(activeConcept);
                    } else if (onSelectConcept && activeConcept) {
                      onSelectConcept(activeConcept);
                    }
                  }}
                  onLaunchPractice={() => {
                    if (onLearnClick && activeConcept) {
                      onLearnClick(activeConcept);
                    }
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
