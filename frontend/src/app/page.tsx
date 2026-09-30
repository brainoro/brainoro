'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BoardId,
  CurriculumConcept,
  MemoryCard,
  AuthoritativeCurriculumConcept,
  TextbookSection,
  CurriculumResolutionResult,
  AuthoritativeLearningContext,
} from '@/lib/types';
import {
  BOARDS_DATA,
  CONCEPTS_DATA,
  INITIAL_ASSESSMENT_ITEMS,
  INITIAL_MEMORY_CARDS,
} from '@/lib/data/curriculumData';
import {
  fetchCurriculumConcepts,
  upsertCurriculumConcept,
  resolveCurriculumContext,
  convertAuthoritativeConceptToCurriculumConcept,
  resolveAuthoritativeToBrainoroConcept,
} from '@/lib/supabase/curriculumService';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { BoardSwitchHeader } from '@/components/board-adapters/BoardSwitchHeader';
import { AdaptiveTestSimulator } from '@/components/testing/AdaptiveTestSimulator';
import { PsychometricAssessmentHub } from '@/components/testing/PsychometricAssessmentHub';
import { DiagnosticReport } from '@/lib/engine/diagnosticEngine';
import { SpacedRepetitionHub } from '@/components/memory/SpacedRepetitionHub';
import { DependencyGraphVisualizer } from '@/components/graph/DependencyGraphVisualizer';
import { ParentAccelerationDashboard } from '@/components/parent/ParentAccelerationDashboard';
import { ContentIngestionModal } from '@/components/ingestion/ContentIngestionModal';
import { HierarchicalCurriculumSelector } from '@/components/navigation/HierarchicalCurriculumSelector';
import { CurriculumContextBar } from '@/components/navigation/CurriculumContextBar';
import { ChapterNavigator } from '@/components/navigation/ChapterNavigator';
import { ConceptCard } from '@/components/navigation/ConceptCard';
import { CbseCurriculumNavigator } from '@/components/cbse/CbseCurriculumNavigator';
import { ChapterHypnoticHero } from '@/components/cbse/ChapterHypnoticHero';
import {
  CbseAuthoritativeConcept,
  CbseSection,
  CbseCurriculumContext,
} from '@/lib/types/cbseCurriculum';
import {
  StudentLearningHub,
  LearningProgressionStep,
} from '@/components/navigation/StudentLearningHub';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { HandwrittenCheatSheetView } from '@/components/views/HandwrittenCheatSheetView';
import { AccountModal } from '@/components/account/AccountModal';
import { SupportTicketModal } from '@/components/support/SupportTicketModal';
import {
  BookOpen,
  BrainCircuit,
  Target,
  GitFork,
  HeartHandshake,
  Sparkles,
  Database,
  AlertCircle,
  ShieldCheck,
  RefreshCw,
  LogOut,
  Shield,
  User as UserIcon,
  Lock,
  Clock,
  Zap,
  CheckCircle2,
  LifeBuoy,
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const {
    user,
    profile,
    isLoading: authLoading,
    isCustomerAdmin,
    isSuperAdmin,
    isTrialExpired,
    daysLeftInTrial,
    isSubscribed,
    signOut,
  } = useAuth();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Curriculum Context Parameters (Default: CBSE Class 6 Mathematics Ganita Prakash)
  const [selectedBoardId, setSelectedBoardId] = useState<BoardId>('CBSE');
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [selectedSubject, setSelectedSubject] = useState<string>('MATH');
  const [selectedPartNumber, setSelectedPartNumber] = useState<number>(1);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('CH-NCERT-G6-MATH-2024-02');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('SEC-NCERT-G6-MATH-2024-02-01');
  const [selectedConceptId, setSelectedConceptId] = useState<string>('AUTH-CBSE-G6-MATH-CH02-POINT');
  const [selectedUnit, setSelectedUnit] = useState<string>('ALL_UNITS');

  // Isolated CBSE Authoritative State (Classes 6–12)
  const [cbseConcept, setCbseConcept] = useState<CbseAuthoritativeConcept | null>(null);
  const [cbseSection, setCbseSection] = useState<CbseSection | null>(null);

  // Gating & Profile-driven Initialization
  const profileInitializedRef = useRef(false);

  const isPrivileged = Boolean(
    profile?.role !== 'STUDENT' && (isCustomerAdmin || isSuperAdmin || profile?.role === 'EDUCATOR' || profile?.role === 'SUPER_ADMIN')
  );

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (
        !profile ||
        !profile.onboarding_completed ||
        (!profile.board_id && !profile.curriculum) ||
        (!profile.grade_level && !profile.grade)
      ) {
        router.push('/onboarding');
      } else if (
        isTrialExpired ||
        (profile.current_period_end && new Date() > new Date(profile.current_period_end))
      ) {
        router.push('/billing');
      }
    }
  }, [user, profile, isTrialExpired, authLoading, router]);

  useEffect(() => {
    if (profile) {
      const targetBoard = (profile.board_id || profile.curriculum || 'CBSE') as BoardId;
      const targetGrade = Number(profile.grade_level || profile.grade || 6);

      if (targetBoard && (!isPrivileged || !profileInitializedRef.current)) {
        setSelectedBoardId(targetBoard);
      }
      if (targetGrade && (!isPrivileged || !profileInitializedRef.current)) {
        setSelectedGrade(targetGrade);
      }
      profileInitializedRef.current = true;

      // Query primary subject enrolled by user
      supabase
        .from('user_subjects')
        .select('subject_id')
        .eq('user_id', profile.user_id)
        .eq('is_primary', true)
        .maybeSingle()
        .then(({ data }) => {
          if (data?.subject_id) {
            setSelectedSubject(data.subject_id);
          }
        });
    }
  }, [profile, isPrivileged]);


  // Student Learning Progression & Navigation Tabs
  const [learningStep, setLearningStep] = useState<LearningProgressionStep>('learn');
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'revise' | 'test' | 'graph' | 'parent'>('learn');

  // Authoritative Context Resolution State
  const [authResolution, setAuthResolution] = useState<CurriculumResolutionResult | null>(null);
  const [isResolvingAuth, setIsResolvingAuth] = useState<boolean>(true);

  // Legacy Curriculum State (Preserved for non-authoritative boards / grades)
  const [legacyConcepts, setLegacyConcepts] = useState<CurriculumConcept[]>(CONCEPTS_DATA);
  const [activeLegacyConceptId, setActiveLegacyConceptId] = useState<string>('CBSE-G6-MATH-PRIME');

  // Ancillary State
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>(INITIAL_MEMORY_CARDS);
  const [isIngestionOpen, setIsIngestionOpen] = useState(false);
  const [isLiveDb, setIsLiveDb] = useState<boolean>(() => isSupabaseConfigured());
  const [isDbLoading, setIsDbLoading] = useState(false);
  const [showGuide, setShowGuide] = useState(true);

  // Psychometric Root-Cause Diagnostic Reports & Latent Ability State
  const [diagnosticReports, setDiagnosticReports] = useState<DiagnosticReport[]>([]);
  const [psychometricTheta, setPsychometricTheta] = useState(0.0);
  const [psychometricSE, setPsychometricSE] = useState(1.0);

  // Load legacy curriculum concepts as standby / catalog baseline
  useEffect(() => {
    let isMounted = true;
    setIsDbLoading(true);
    fetchCurriculumConcepts().then(({ data, isLive }) => {
      if (isMounted) {
        if (data && data.length > 0) {
          setLegacyConcepts(data);
        }
        setIsLiveDb(isLive);
        setIsDbLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Refs to avoid exhaustive-deps warning while preventing redundant context resolutions
  const selectedSectionIdRef = React.useRef(selectedSectionId);
  const selectedConceptIdRef = React.useRef(selectedConceptId);
  const resolutionSeqRef = React.useRef(0);

  useEffect(() => {
    selectedSectionIdRef.current = selectedSectionId;
  }, [selectedSectionId]);
  useEffect(() => {
    selectedConceptIdRef.current = selectedConceptId;
  }, [selectedConceptId]);

  // Strict Authoritative Context Resolution (Fail-Closed with Async Sequence Protection)
  useEffect(() => {
    let isMounted = true;
    const currentSeq = ++resolutionSeqRef.current;
    setIsResolvingAuth(true);

    resolveCurriculumContext({
      boardId: selectedBoardId,
      gradeLevel: selectedGrade,
      subjectId: selectedSubject,
      partNumber: selectedPartNumber,
      chapterId: selectedChapterId || undefined,
    }).then((res) => {
      if (!isMounted || currentSeq !== resolutionSeqRef.current) return;
      setAuthResolution(res);
      setIsResolvingAuth(false);

      if (res.isAuthoritative && res.state === 'VERIFIED') {
        // Sync active section within resolved sections
        const targetSection =
          res.sections.find((s) => s.id === selectedSectionIdRef.current) ||
          res.sections[0];
        if (targetSection) {
          setSelectedSectionId(targetSection.id);

          // Find mapped concept for this section
          const mapping =
            res.conceptSections.find(
              (cs) =>
                cs.section_id === targetSection.id &&
                cs.relationship_type === 'PRIMARY'
            ) ||
            res.conceptSections.find((cs) => cs.section_id === targetSection.id);

          const targetConcept =
            (mapping &&
              res.concepts.find((c) => c.id === mapping.authoritative_concept_id)) ||
            res.concepts.find((c) => c.id === selectedConceptIdRef.current) ||
            res.concepts[0];

          if (targetConcept) {
            setSelectedConceptId(targetConcept.id);
          }
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedBoardId, selectedGrade, selectedSubject, selectedPartNumber, selectedChapterId]);

  // Derived Active Authoritative Records
  const activeSection = useMemo<TextbookSection | undefined>(() => {
    if (!authResolution || !authResolution.isAuthoritative) return undefined;
    return (
      authResolution.sections.find((s) => s.id === selectedSectionId) ||
      authResolution.sections[0]
    );
  }, [authResolution, selectedSectionId]);

  const activeAuthoritativeConcept = useMemo<
    AuthoritativeCurriculumConcept | undefined
  >(() => {
    if (!authResolution || !authResolution.isAuthoritative) return undefined;
    return (
      authResolution.concepts.find((c) => c.id === selectedConceptId) ||
      authResolution.concepts[0]
    );
  }, [authResolution, selectedConceptId]);

  // Active Authoritative Learning Context dynamically computed for active section & concept
  const activeLearningContext = useMemo<AuthoritativeLearningContext | undefined>(() => {
    if (!authResolution?.isAuthoritative) return undefined;
    if (
      authResolution.state !== 'VERIFIED' ||
      !activeAuthoritativeConcept ||
      !activeSection ||
      !authResolution.chapter ||
      !authResolution.textbook
    ) {
      return authResolution.learningContext;
    }

    // Validate that activeSection is authentically mapped to activeAuthoritativeConcept (primary or supporting)
    const isSectionMappedToConcept =
      authResolution.conceptSections.length === 0 ||
      authResolution.conceptSections.some(
        (cs) =>
          cs.authoritative_concept_id === activeAuthoritativeConcept.id &&
          cs.section_id === activeSection.id
      );

    if (!isSectionMappedToConcept) {
      return {
        state: 'PENDING_REVIEW',
        boardId: selectedBoardId,
        gradeLevel: selectedGrade,
        subjectId: selectedSubject === 'ALL' ? 'MATH' : selectedSubject,
        curriculumVersionId: authResolution.textbook.curriculum_version_id,
        textbookId: authResolution.textbook.id,
        chapterId: authResolution.chapter.id,
        sectionId: activeSection.id,
        authoritativeConceptId: activeAuthoritativeConcept.id,
        mappingState: 'PENDING_REVIEW',
        reason: `Section § ${activeSection.section_number} is not an authentic section for concept ${activeAuthoritativeConcept.official_title}.`,
      };
    }

    const mapping = resolveAuthoritativeToBrainoroConcept(activeAuthoritativeConcept.id, {
      boardId: selectedBoardId,
      gradeLevel: selectedGrade,
      subjectId: selectedSubject === 'ALL' ? 'MATH' : selectedSubject,
      curriculumVersionId: authResolution.textbook.curriculum_version_id,
      textbookId: authResolution.textbook.id,
      chapterId: authResolution.chapter.id,
      sectionId: activeSection.id,
    });

    if (!mapping || mapping.mappingState !== 'VERIFIED') {
      return {
        state: 'PENDING_REVIEW',
        boardId: selectedBoardId,
        gradeLevel: selectedGrade,
        subjectId: selectedSubject === 'ALL' ? 'MATH' : selectedSubject,
        curriculumVersionId: authResolution.textbook.curriculum_version_id,
        textbookId: authResolution.textbook.id,
        chapterId: authResolution.chapter.id,
        sectionId: activeSection.id,
        authoritativeConceptId: activeAuthoritativeConcept.id,
        mappingState: 'PENDING_REVIEW',
        reason: `Authoritative concept ${activeAuthoritativeConcept.official_title} is pending verified Brainoro learning mapping.`,
      };
    }

    return {
      state: 'RESOLVED',
      boardId: selectedBoardId,
      gradeLevel: selectedGrade,
      subjectId: selectedSubject === 'ALL' ? 'MATH' : selectedSubject,
      curriculumVersionId: authResolution.textbook.curriculum_version_id,
      textbookId: authResolution.textbook.id,
      textbookTitle: authResolution.textbook.title,
      chapterId: authResolution.chapter.id,
      chapterNumber: authResolution.chapter.chapter_number,
      chapterTitle: authResolution.chapter.chapter_title,
      sectionId: activeSection.id,
      sectionNumber: activeSection.section_number,
      sectionTitle: activeSection.section_title,
      sourcePage: activeSection.source_page || activeAuthoritativeConcept.source_page,
      sourceLocator: activeSection.source_locator,
      authoritativeConceptId: activeAuthoritativeConcept.id,
      authoritativeConceptTitle: activeAuthoritativeConcept.official_title,
      brainoroConceptId: mapping.brainoroConceptId,
      mappingState: 'VERIFIED',
      evidence: mapping.evidence,
    };
  }, [
    authResolution,
    activeAuthoritativeConcept,
    activeSection,
    selectedBoardId,
    selectedGrade,
    selectedSubject,
  ]);

  // Effective Active Concept adapted for presentation views (HandwrittenCheatSheetView)
  const activeAdaptedConcept = useMemo<CurriculumConcept | null>(() => {
    if (selectedBoardId === 'CBSE') {
      if (cbseConcept) {
        return {
          id: cbseConcept.id,
          boardId: 'CBSE',
          gradeLevel: selectedGrade,
          subjectId: selectedSubject === 'ALL' ? 'MATH' : selectedSubject,
          title: cbseConcept.official_title,
          coreLogicEssence:
            cbseConcept.pedagogical_description ||
            `Official CBSE Class ${selectedGrade} concept: ${cbseConcept.official_title}`,
          pedagogical_description: cbseConcept.pedagogical_description,
          learning_objectives: cbseConcept.learning_outcomes,
          parentNodeId: null,
        };
      }
      if (authResolution?.isAuthoritative && activeAuthoritativeConcept) {
        return convertAuthoritativeConceptToCurriculumConcept(
          activeAuthoritativeConcept,
          authResolution.chapter,
          activeSection,
          activeLearningContext
        );
      }
      return null;
    }

    // Non-CBSE: Match strictly within current Board, Grade, and Subject
    const matchesContext = (c: CurriculumConcept) =>
      c.boardId === selectedBoardId &&
      c.gradeLevel === selectedGrade &&
      (selectedSubject === 'ALL' || c.subjectId === selectedSubject);

    const matchesGradeOnly = (c: CurriculumConcept) =>
      c.boardId === selectedBoardId &&
      c.gradeLevel === selectedGrade;

    const matchesBoardOnly = (c: CurriculumConcept) =>
      c.boardId === selectedBoardId;

    if (activeLegacyConceptId) {
      const activeFound = legacyConcepts.find((c) => c.id === activeLegacyConceptId);
      if (activeFound && matchesContext(activeFound)) {
        return activeFound;
      }
    }

    return (
      legacyConcepts.find(matchesContext) ||
      legacyConcepts.find(matchesGradeOnly) ||
      legacyConcepts.find(matchesBoardOnly) ||
      null
    );
  }, [
    selectedBoardId,
    cbseConcept,
    authResolution,
    activeAuthoritativeConcept,
    activeSection,
    activeLearningContext,
    legacyConcepts,
    activeLegacyConceptId,
    selectedGrade,
    selectedSubject,
  ]);

  // Active Chapter Index for Non-CBSE boards (1-based sequence matching left chapter sidebar)
  const activeNonCbseChapterIndex = useMemo(() => {
    if (!activeAdaptedConcept) return 1;
    const matchesContext = (c: CurriculumConcept) =>
      c.boardId === selectedBoardId &&
      c.gradeLevel === selectedGrade &&
      (selectedSubject === 'ALL' || c.subjectId === selectedSubject);

    let list = legacyConcepts.filter(matchesContext);
    if (list.length === 0) {
      list = legacyConcepts.filter(
        (c) => c.boardId === selectedBoardId && c.gradeLevel === selectedGrade
      );
    }
    if (list.length === 0) {
      list = legacyConcepts.filter((c) => c.boardId === selectedBoardId);
    }
    const idx = list.findIndex((c) => c.id === activeAdaptedConcept.id);
    return idx >= 0 ? idx + 1 : 1;
  }, [legacyConcepts, selectedBoardId, selectedGrade, selectedSubject, activeAdaptedConcept]);

  // Reactive synchronization: keep activeLegacyConceptId matched with activeAdaptedConcept
  useEffect(() => {
    if (!authResolution?.isAuthoritative && activeAdaptedConcept) {
      if (activeLegacyConceptId !== activeAdaptedConcept.id) {
        setActiveLegacyConceptId(activeAdaptedConcept.id);
      }
    }
  }, [authResolution?.isAuthoritative, activeAdaptedConcept, activeLegacyConceptId]);

  // Atomic Context Handlers (Strict Board Isolation & Stale State Protection)
  const handleSelectBoard = (newBoard: BoardId) => {
    if (!isPrivileged) return;
    setSelectedBoardId(newBoard);
    // Atomically reset all downstream dependent state
    setAuthResolution(null);
    setCbseConcept(null);
    setCbseSection(null);
    setSelectedPartNumber(1);
    setSelectedChapterId('');
    setSelectedSectionId('');
    setSelectedConceptId('');

    if (newBoard === 'CBSE') {
      setSelectedGrade(6);
      setSelectedSubject('MATH');
    } else {
      const firstLegacy = legacyConcepts.find((c) => c.boardId === newBoard);
      if (firstLegacy) {
        setSelectedGrade(firstLegacy.gradeLevel);
        setSelectedSubject(firstLegacy.subjectId);
        setActiveLegacyConceptId(firstLegacy.id);
      }
    }
  };

  const handleSelectGrade = (newGrade: number) => {
    if (!isPrivileged) return;
    setSelectedGrade(newGrade);
    // Atomically reset downstream state
    setAuthResolution(null);
    setCbseConcept(null);
    setCbseSection(null);
    setSelectedPartNumber(1);
    setSelectedChapterId('');
    setSelectedSectionId('');
    setSelectedConceptId('');

    if (selectedBoardId !== 'CBSE') {
      const firstLegacy =
        legacyConcepts.find(
          (c) =>
            c.boardId === selectedBoardId &&
            c.gradeLevel === newGrade &&
            (selectedSubject === 'ALL' || c.subjectId === selectedSubject)
        ) ||
        legacyConcepts.find(
          (c) => c.boardId === selectedBoardId && c.gradeLevel === newGrade
        );
      if (firstLegacy) {
        if (selectedSubject !== 'ALL' && firstLegacy.subjectId !== selectedSubject) {
          setSelectedSubject(firstLegacy.subjectId);
        }
        setActiveLegacyConceptId(firstLegacy.id);
      }
    }
  };

  const handleSelectSubject = (newSubject: string) => {
    setSelectedSubject(newSubject);
    // Atomically reset downstream state
    setAuthResolution(null);
    setCbseConcept(null);
    setCbseSection(null);
    setSelectedPartNumber(1);
    setSelectedChapterId('');
    setSelectedSectionId('');
    setSelectedConceptId('');

    if (selectedBoardId !== 'CBSE') {
      const firstLegacy = legacyConcepts.find(
        (c) =>
          c.boardId === selectedBoardId &&
          c.gradeLevel === selectedGrade &&
          (newSubject === 'ALL' || c.subjectId === newSubject)
      );
      if (firstLegacy) {
        setActiveLegacyConceptId(firstLegacy.id);
      }
    }
  };

  const handleSelectPart = (newPartNumber: number) => {
    setSelectedPartNumber(newPartNumber);
    // Atomically reset downstream chapter, section, and concept state for new part
    setSelectedChapterId('');
    setSelectedSectionId('');
    setSelectedConceptId('');
    setCbseConcept(null);
    setCbseSection(null);
  };

  const handleSelectChapter = (newChapterId: string) => {
    setSelectedChapterId(newChapterId);
    // Atomically reset downstream section and concept state
    setSelectedSectionId('');
    setSelectedConceptId('');
  };

  const handleSelectSection = (section: TextbookSection) => {
    setSelectedSectionId(section.id);
    if (!authResolution) return;

    // Find concepts mapped to this section
    const primaryMapping = authResolution.conceptSections.find(
      (cs) =>
        cs.section_id === section.id && cs.relationship_type === 'PRIMARY'
    );
    const anyMapping = authResolution.conceptSections.find(
      (cs) => cs.section_id === section.id
    );

    const targetConceptId =
      primaryMapping?.authoritative_concept_id ||
      anyMapping?.authoritative_concept_id;

    if (targetConceptId) {
      setSelectedConceptId(targetConceptId);
    }
  };

  const handleSelectConcept = (concept: AuthoritativeCurriculumConcept) => {
    setSelectedConceptId(concept.id);
    if (!authResolution) return;

    // Find primary section mapped to this concept
    const primaryMapping = authResolution.conceptSections.find(
      (cs) =>
        cs.authoritative_concept_id === concept.id &&
        cs.relationship_type === 'PRIMARY'
    );
    if (primaryMapping) {
      setSelectedSectionId(primaryMapping.section_id);
    }
  };

  // Learning Progression Next-Step Handler
  const handleProgressionNext = () => {
    if (learningStep === 'learn') {
      setLearningStep('practice');
      setActiveTab('practice');
    } else if (learningStep === 'practice') {
      setLearningStep('revise');
      setActiveTab('revise');
    } else if (learningStep === 'revise') {
      setLearningStep('test');
      setActiveTab('test');
    } else {
      setLearningStep('learn');
      setActiveTab('learn');
    }
  };

  const handleUpdateCard = (updated: MemoryCard) => {
    setMemoryCards((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  };

  const handleConceptIngested = (
    newConceptId: string,
    newConceptData?: any
  ) => {
    const parts = newConceptId.split('-');
    const boardFromKey = (parts[0] || selectedBoardId) as BoardId;
    const gradeFromKey = parts[1]
      ? Number(parts[1].replace('G', ''))
      : selectedGrade;
    const subjectFromKey = newConceptData?.subjectId || parts[2] || 'PHYSICS';
    const topicFromKey =
      newConceptData?.title || parts.slice(3).join('-') || 'CONCEPT';

    const newConcept: CurriculumConcept = {
      id: newConceptId,
      boardId: newConceptData?.boardId || boardFromKey,
      subjectId: subjectFromKey,
      gradeLevel: newConceptData?.gradeLevel || gradeFromKey,
      title: topicFromKey.replace(/[-_]/g, ' ').toUpperCase(),
      coreLogicEssence:
        newConceptData?.coreLogicEssence ||
        `Ingested pedagogical concept for ${topicFromKey}.`,
      parentNodeId: null,
    };

    upsertCurriculumConcept(newConcept).catch((err) => {
      console.warn('Could not persist to Supabase:', err);
    });

    setLegacyConcepts((prev) => {
      const filtered = prev.filter((c) => c.id !== newConceptId);
      return [...filtered, newConcept];
    });

    setSelectedBoardId(newConcept.boardId);
    setSelectedSubject('ALL');
    setActiveLegacyConceptId(newConceptId);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <RefreshCw className="w-8 h-8 text-sky-500 animate-spin" />
          <p className="text-sm text-slate-400">Loading Brainoro session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full space-y-4 shadow-xl">
          <Lock className="w-10 h-10 text-sky-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Authentication Required</h2>
          <p className="text-sm text-slate-400">
            Brainoro OS requires an active authenticated session to access authoritative curriculum modules.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl transition text-sm text-center"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl transition text-sm text-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (profile && (profile.account_status === 'SUSPENDED' || profile.account_status === 'DEACTIVATED')) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-8 max-w-md w-full space-y-4 shadow-xl">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <h2 className="text-xl font-bold text-white">Account {profile.account_status}</h2>
          <p className="text-sm text-rose-300/80">
            Your account has been {profile.account_status.toLowerCase()}. Please contact your institutional administrator.
          </p>
          <button
            onClick={() => signOut()}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition text-sm"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans">
      {/* Top User Session Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-2.5 text-xs text-slate-300 flex items-center justify-between print:hidden">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsAccountModalOpen(true)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700/90 border border-slate-700 text-slate-200 transition cursor-pointer group shadow-xs"
            title="View Account & Subscription Details"
          >
            <UserIcon className="w-3.5 h-3.5 text-sky-400 group-hover:text-sky-300" />
            <span className="font-bold text-xs text-slate-200">Account</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-sky-300 border border-sky-500/30">
              {profile?.role || 'STUDENT'}
            </span>
            {isSubscribed ? (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> PRO
              </span>
            ) : (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" />
                {daysLeftInTrial !== null ? `${daysLeftInTrial}d left` : 'Trial'}
              </span>
            )}
          </button>

          {profile?.institution_name && (
            <span className="text-slate-400 hidden sm:inline">
              • {profile.institution_name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!isSubscribed && (
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition cursor-pointer shadow-xs"
              title="Subscribe to Pro Plan"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Subscribe (₹999/mo)</span>
            </button>
          )}
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium transition cursor-pointer"
            title="Need Help? Open Helpdesk & Raise Support Ticket"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Helpdesk</span>
          </button>
          <button
            onClick={() => setActiveTab('parent')}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition cursor-pointer"
            title="Open Parents Cognitive Acceleration Portal"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            Parents Portal
          </button>
          {(isCustomerAdmin || isSuperAdmin) && (
            <Link
              href="/admin"
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-medium transition"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Console
            </Link>
          )}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </header>

      {/* Top Header & Multi-Board Switcher */}
      <div className="print:hidden">
        <BoardSwitchHeader
          boards={isPrivileged ? BOARDS_DATA : BOARDS_DATA.filter((b) => b.id === selectedBoardId)}
          selectedBoardId={selectedBoardId}
          onSelectBoard={handleSelectBoard}
          selectedGrade={selectedGrade}
          onSelectGrade={handleSelectGrade}
          selectedSubject={selectedSubject}
          onSelectSubject={handleSelectSubject}
          onOpenIngestion={() => setIsIngestionOpen(true)}
          onSelectCheatSheet={() => {
            setLearningStep('learn');
            setActiveTab('learn');
            setTimeout(() => {
              const el = document.getElementById('cheatsheet-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 50);
          }}
          onViewModeChange={() => {
            setLearningStep('learn');
            setActiveTab('learn');
          }}
          onSelectParentPortal={() => setActiveTab('parent')}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto px-6 py-8 space-y-6 flex-grow print:p-0 print:m-0 print:max-w-full">
        {/* Quick System Tour Banner */}
        {showGuide && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm relative animate-fadeIn print:hidden">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 tracking-wide">
                  Welcome to Brainoro: The Authoritative Cognitive Learning OS
                </h3>
              </div>
              <button
                onClick={() => setShowGuide(false)}
                className="text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
              >
                Dismiss Guide ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div
                onClick={() => {
                  setLearningStep('learn');
                  setActiveTab('learn');
                }}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  activeTab === 'learn'
                    ? 'bg-sky-50 border-sky-400 ring-1 ring-sky-400/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sky-700 mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> 1. Learn
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Visual notes, intuition, statutory concepts & worked examples.
                </p>
              </div>

              <div
                onClick={() => {
                  setLearningStep('practice');
                  setActiveTab('practice');
                }}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  activeTab === 'practice'
                    ? 'bg-sky-50 border-sky-400 ring-1 ring-sky-400/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sky-700 mb-1 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> 2. Practice
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Questions adjust difficulty dynamically to student skill (IRT psychometrics).
                </p>
              </div>

              <div
                onClick={() => {
                  setLearningStep('revise');
                  setActiveTab('revise');
                }}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  activeTab === 'revise'
                    ? 'bg-sky-50 border-sky-400 ring-1 ring-sky-400/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sky-700 mb-1 flex items-center gap-1.5">
                  <BrainCircuit className="w-3.5 h-3.5" /> 3. Revise
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  5-box Leitner queues to lock concepts into long-term memory permanently.
                </p>
              </div>

              <div
                onClick={() => {
                  setLearningStep('test');
                  setActiveTab('test');
                }}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  activeTab === 'test'
                    ? 'bg-sky-50 border-sky-400 ring-1 ring-sky-400/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-sky-700 mb-1 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> 4. Test
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Comprehensive test simulator assessing statutory curriculum mastery.
                </p>
              </div>

              <div
                onClick={() => {
                  setActiveTab('parent');
                }}
                className={`p-3 rounded-xl border cursor-pointer transition ${
                  activeTab === 'parent'
                    ? 'bg-emerald-50 border-emerald-400 ring-1 ring-emerald-400/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-bold text-emerald-700 mb-1 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" /> 5. Parents Portal
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Real-time cognitive progress, retention curves & intervention alerts.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Authoritative CBSE Curriculum System vs Legacy Board Catalog */}
        <div className="print:hidden">
          {selectedBoardId === 'CBSE' ? (
            <CbseCurriculumNavigator
              initialGrade={selectedGrade}
              initialSubject={selectedSubject}
              initialPartNumber={selectedPartNumber}
              onSelectPart={handleSelectPart}
              onSelectConcept={(concept, section, context) => {
                setCbseConcept(concept);
                if (section) setCbseSection(section);
                if (context) {
                  if (context.grade) setSelectedGrade(context.grade.grade_level);
                  if (context.gradeSubject) setSelectedSubject(context.gradeSubject.subject_id || context.gradeSubject.id);
                }
              }}
              onLearnClick={(concept) => {
                setCbseConcept(concept);
                setLearningStep('learn');
                setActiveTab('learn');
                setTimeout(() => {
                  const el = document.getElementById('cheatsheet-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 50);
              }}
              onContextChange={(grade, subjectId) => {
                setSelectedGrade(grade);
                setSelectedSubject(subjectId);
              }}
            />
          ) : (
            <>
              {/* 1. Authoritative Curriculum Context Bar */}
              <CurriculumContextBar
                boardId={selectedBoardId}
                gradeLevel={selectedGrade}
                subjectId={selectedSubject}
                textbook={authResolution?.textbook}
                chapter={authResolution?.chapter}
                allChapters={authResolution?.allChapters}
                onSelectChapter={handleSelectChapter}
                parts={authResolution?.parts}
                activePartNumber={selectedPartNumber}
                onSelectPart={handleSelectPart}
                activeSection={activeSection}
                activeConcept={
                  activeAuthoritativeConcept ||
                  (activeAdaptedConcept
                    ? ({
                        id: activeAdaptedConcept.id,
                        official_title: activeAdaptedConcept.title,
                      } as any)
                    : undefined)
                }
                isAuthoritative={authResolution?.isAuthoritative}
                status={authResolution?.state}
              />

              {/* 2. Authoritative Chapter Navigation or Catalog Selector */}
              {isResolvingAuth ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-3 shadow-sm">
                  <RefreshCw className="w-6 h-6 text-sky-600 animate-spin mx-auto" />
                  <p className="text-xs text-slate-600">
                    Resolving curriculum hierarchy...
                  </p>
                </div>
              ) : authResolution?.isAuthoritative && authResolution.state === 'VERIFIED' ? (
                <div className="space-y-6">
                  <ChapterNavigator
                    sections={authResolution.sections}
                    activeSectionId={activeSection?.id}
                    onSelectSection={handleSelectSection}
                    concepts={authResolution.concepts}
                    conceptSections={authResolution.conceptSections}
                    chapterTitle={authResolution.chapter?.chapter_title}
                    chapterNumber={authResolution.chapter?.chapter_number}
                  />
                  {activeAuthoritativeConcept && (
                    <ConceptCard
                      concept={activeAuthoritativeConcept}
                      section={activeSection}
                      onLearn={(c) => {
                        handleSelectConcept(c);
                        setLearningStep('learn');
                        setActiveTab('learn');
                      }}
                      isActive={true}
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <HierarchicalCurriculumSelector
                    concepts={legacyConcepts}
                    boards={isPrivileged ? BOARDS_DATA : BOARDS_DATA.filter((b) => b.id === selectedBoardId)}
                    selectedBoardId={selectedBoardId}
                    onSelectBoard={handleSelectBoard}
                    selectedGrade={selectedGrade}
                    onSelectGrade={handleSelectGrade}
                    selectedSubject={selectedSubject}
                    onSelectSubject={handleSelectSubject}
                    selectedUnit={selectedUnit}
                    onSelectUnit={setSelectedUnit}
                    activeConceptId={activeLegacyConceptId}
                    onSelectConcept={setActiveLegacyConceptId}
                    onOpenIngestion={() => setIsIngestionOpen(true)}
                    isLiveDb={isLiveDb}
                    parts={authResolution?.parts}
                    activePartNumber={selectedPartNumber}
                    onSelectPart={handleSelectPart}
                  >
                    {/* Chapter Hypnotic Hero for Cambridge & IB MYP (Story Reels, Blitz Duel, AI Twin) */}
                    {activeAdaptedConcept && (
                      <ChapterHypnoticHero
                        chapterTitle={activeAdaptedConcept.title}
                        chapterNumber={activeNonCbseChapterIndex}
                        subject={activeAdaptedConcept.subjectId || selectedSubject}
                        grade={selectedGrade}
                        boardId={selectedBoardId}
                        onLaunchLearn={() => {
                          setLearningStep('learn');
                          setActiveTab('learn');
                          setTimeout(() => {
                            const el = document.getElementById('cheatsheet-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 50);
                        }}
                        onLaunchPractice={() => {
                          setLearningStep('practice');
                          setActiveTab('practice');
                        }}
                      />
                    )}
                  </HierarchicalCurriculumSelector>
                </div>
              )}
            </>
          )}
        </div>

        {/* 3. Student Learning Hub (Learn -> Practice -> Revise -> Test) */}
        <div className="print:hidden">
          <StudentLearningHub
            currentStep={learningStep}
            onSelectStep={(step) => {
              setLearningStep(step);
              setActiveTab(step);
            }}
            conceptTitle={
              activeAdaptedConcept?.title ||
              activeAuthoritativeConcept?.official_title ||
              'Selected Concept'
            }
            onNextStep={handleProgressionNext}
          />
        </div>

        {/* 4. Active Learning Mode View */}
        {activeTab === 'learn' && (
          <div id="cheatsheet-section" data-testid="cheatsheet-view" className="print:w-full print:m-0 print:p-0">
            <ErrorBoundary
              key={activeAdaptedConcept?.id || 'loading'}
              fallbackConceptId={activeAdaptedConcept?.id || ''}
              onReset={() => {}}
            >
              {activeAdaptedConcept ? (
                <HandwrittenCheatSheetView
                  key={activeAdaptedConcept.id}
                  concept={activeAdaptedConcept}
                  boardId={selectedBoardId}
                />
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                  <RefreshCw className="w-8 h-8 text-sky-600 animate-spin mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-700">
                    Loading Visual Cheat Sheet for {selectedBoardId} Class {selectedGrade}...
                  </p>
                </div>
              )}
            </ErrorBoundary>
          </div>
        )}

        {/* View: Adaptive Practice Simulator (Section 2) */}
        {activeTab === 'practice' && (
          <div className="print:hidden">
            <AdaptiveTestSimulator
              selectedBoardId={selectedBoardId}
              selectedGrade={selectedGrade}
              selectedSubject={selectedSubject}
              chapterTitle={authResolution?.chapter?.chapter_title || cbseConcept?.official_title || activeAdaptedConcept?.title}
              conceptTitle={activeAdaptedConcept?.title || cbseConcept?.official_title}
              conceptId={activeAdaptedConcept?.id || cbseConcept?.id || selectedChapterId}
              onDiagnosticAlert={(report) => {
                setDiagnosticReports((prev) => [report, ...prev.filter((r) => r.failedItemId !== report.failedItemId)]);
              }}
              onNavigateToAssessment={() => {
                setActiveTab('test');
                setLearningStep('test');
              }}
              onItemEvaluated={(_item, _isCorrect, theta) => {
                setPsychometricTheta(theta);
                setPsychometricSE(Number((1.0 / Math.sqrt(Math.max(1, diagnosticReports.length + 1))).toFixed(2)));
              }}
              onFailConcept={(conceptId, item) => {
                // Live Spaced Repetition Integration: Queues failed items into Leitner Box 1 (Daily Review)
                if (item) {
                  const cardId = `CARD-REV-${conceptId}`;
                  setMemoryCards((prev) => {
                    const existingIdx = prev.findIndex((c) => c.id === cardId || c.conceptId === conceptId);
                    const newCard: MemoryCard = {
                      id: cardId,
                      conceptId,
                      title: activeAdaptedConcept?.title || 'Practice Remediation',
                      prompt: item.prompt,
                      answer: item.sampleSolution,
                      intervalDays: 1,
                      repetitionCount: 0,
                      easeFactor: 2.1,
                      retentionStability: 0.5,
                      isHardToMemorize: true,
                      box: 1,
                      nextReviewDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                      retentionProbability: 0.6,
                    };
                    if (existingIdx >= 0) {
                      const updated = [...prev];
                      updated[existingIdx] = {
                        ...updated[existingIdx],
                        prompt: item.prompt,
                        answer: item.sampleSolution,
                        box: 1,
                        intervalDays: 1,
                        isHardToMemorize: true,
                      };
                      return updated;
                    }
                    return [newCard, ...prev];
                  });
                }
              }}
              onMasterConcept={(conceptId, item) => {
                // Advance retention level for mastered items
                if (item) {
                  setMemoryCards((prev) =>
                    prev.map((c) =>
                      c.conceptId === conceptId
                        ? {
                            ...c,
                            box: Math.min(5, c.box + 1) as any,
                            intervalDays: Math.max(2, c.intervalDays * 2),
                            isHardToMemorize: false,
                          }
                        : c
                    )
                  );
                }
              }}
            />
          </div>
        )}

        {/* View: Psychometric Assessment & Root-Cause Knowledge Gap Engine (Section 4) */}
        {activeTab === 'test' && (
          <div className="print:hidden">
            <PsychometricAssessmentHub
              selectedBoardId={selectedBoardId}
              selectedGrade={selectedGrade}
              selectedSubject={selectedSubject}
              chapterTitle={authResolution?.chapter?.chapter_title || cbseConcept?.official_title || activeAdaptedConcept?.title || 'Selected Chapter'}
              conceptTitle={activeAdaptedConcept?.title || cbseConcept?.official_title || 'Core Concept'}
              diagnosticReports={diagnosticReports}
              currentTheta={psychometricTheta}
              standardError={psychometricSE}
              onResolveReport={(reportId) => {
                setDiagnosticReports((prev) =>
                  prev.map((r) => (r.id === reportId ? { ...r, isResolved: true } : r))
                );
              }}
              onNavigateToPractice={() => {
                setActiveTab('practice');
                setLearningStep('practice');
              }}
              onNavigateToLearn={() => {
                setActiveTab('learn');
                setLearningStep('learn');
              }}
            />
          </div>
        )}

        {/* View: Spaced Repetition Cognitive Hub (Leitner / SM-2) */}
        {activeTab === 'revise' && (
          <div className="print:hidden">
            <SpacedRepetitionHub
              cards={memoryCards}
              onUpdateCard={handleUpdateCard}
            />
          </div>
        )}

        {/* View: Knowledge Graph & Remediation Visualizer */}
        {activeTab === 'graph' && (
          <div className="print:hidden">
            <DependencyGraphVisualizer
              concepts={
                authResolution?.isAuthoritative && authResolution.concepts.length > 0
                  ? authResolution.concepts.map((c) =>
                      convertAuthoritativeConceptToCurriculumConcept(
                        c,
                        authResolution.chapter,
                        activeSection
                      )
                    )
                  : legacyConcepts
              }
              selectedBoardId={selectedBoardId}
            />
          </div>
        )}

        {/* View: Parent Cognitive Acceleration Dashboard */}
        {activeTab === 'parent' && (
          <div className="print:hidden">
            <ParentAccelerationDashboard />
          </div>
        )}
      </div>

      {/* OER Content Ingestion Modal */}
      <ContentIngestionModal
        isOpen={isIngestionOpen}
        onClose={() => setIsIngestionOpen(false)}
        activeBoardId={selectedBoardId}
        onIngestionSuccess={handleConceptIngested}
      />

      {/* User Account & Subscription Checkout Modal */}
      <AccountModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />

      {/* User Helpdesk & Support Ticket Raising Modal */}
      <SupportTicketModal
        isOpen={isSupportModalOpen}
        onClose={() => setIsSupportModalOpen(false)}
      />

      {/* Floating Quick Helpdesk Trigger */}
      <div className="fixed bottom-5 right-5 z-40 print:hidden">
        <button
          onClick={() => setIsSupportModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 hover:scale-105 transition-all cursor-pointer border border-sky-400/30"
          title="Need Help? Raise a Support Ticket"
        >
          <LifeBuoy className="w-4 h-4" />
          <span className="hidden sm:inline">Help & Support</span>
        </button>
      </div>
    </div>
  );
}
