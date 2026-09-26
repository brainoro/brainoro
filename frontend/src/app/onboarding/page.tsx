'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase/client';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  Star,
} from 'lucide-react';

interface BoardOption {
  id: string;
  display_name: string;
  description?: string;
}

interface ClassOption {
  id: string;
  grade_level: number;
  name: string;
  stage: string;
}

interface SubjectOption {
  id: string;
  display_name: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { user, profile, onboardingCompleted, refreshProfile, isLoading: authLoading } = useAuth();

  // Onboarding Selections
  const [selectedBoard, setSelectedBoard] = useState<string>('CBSE');
  const [selectedGrade, setSelectedGrade] = useState<number>(6);
  const [availableSubjects, setAvailableSubjects] = useState<SubjectOption[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['MATH']);
  const [primarySubject, setPrimarySubject] = useState<string>('MATH');

  // Metadata Lists
  const [boards, setBoards] = useState<BoardOption[]>([]);
  const [classes, setClasses] = useState<ClassOption[]>([]);
  const [isLoadingCurriculum, setIsLoadingCurriculum] = useState(true);

  // Status & Error
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already onboarded
  useEffect(() => {
    if (!authLoading && (!user || onboardingCompleted)) {
      if (!user) router.push('/login');
      else if (onboardingCompleted) router.push('/');
    }
  }, [user, onboardingCompleted, authLoading, router]);

  // Load Boards and Classes from Database
  useEffect(() => {
    async function loadCurriculumMetadata() {
      try {
        setIsLoadingCurriculum(true);
        // Load boards
        const { data: bData } = await supabase.from('boards').select('id, display_name, description');
        if (bData && bData.length > 0) setBoards(bData);

        // Load classes
        const { data: cData } = await supabase
          .from('classes')
          .select('id, grade_level, name, stage')
          .order('grade_level', { ascending: true });
        if (cData && cData.length > 0) setClasses(cData);
      } catch (err) {
        console.warn('Failed to load curriculum metadata:', err);
      } finally {
        setIsLoadingCurriculum(false);
      }
    }
    loadCurriculumMetadata();
  }, []);

  // Fetch valid subjects for chosen board and grade from units
  useEffect(() => {
    async function loadSubjectsForBoardGrade() {
      try {
        const { data: uData } = await supabase
          .from('units')
          .select('subject_id')
          .eq('board_id', selectedBoard)
          .eq('grade_level', selectedGrade);

        const distinctSubjectIds = Array.from(new Set(uData?.map((u) => u.subject_id) || []));

        // Fetch subject display names
        const { data: sData } = await supabase
          .from('subjects')
          .select('id, display_name')
          .in('id', distinctSubjectIds.length > 0 ? distinctSubjectIds : ['MATH']);

        const loadedSubjects = (sData as SubjectOption[]) || [
          { id: 'MATH', display_name: 'Mathematics' },
        ];
        setAvailableSubjects(loadedSubjects);

        // Default selection: select all available and set primary to first
        const defaultIds = loadedSubjects.map((s) => s.id);
        setSelectedSubjects(defaultIds);
        setPrimarySubject((prev) => (defaultIds.length > 0 && !defaultIds.includes(prev) ? defaultIds[0] : prev || defaultIds[0] || ''));
      } catch (err) {
        console.warn('Could not load subjects for curriculum:', err);
      }
    }
    loadSubjectsForBoardGrade();
  }, [selectedBoard, selectedGrade]);

  const handleToggleSubject = (subjId: string) => {
    if (selectedSubjects.includes(subjId)) {
      // Don't allow deselecting the only subject
      if (selectedSubjects.length === 1) return;
      const filtered = selectedSubjects.filter((s) => s !== subjId);
      setSelectedSubjects(filtered);
      // If deselecting the primary subject, reassign primary to first remaining
      if (primarySubject === subjId) {
        setPrimarySubject(filtered[0]);
      }
    } else {
      setSelectedSubjects([...selectedSubjects, subjId]);
    }
  };

  const handleSubmit = async () => {
    setErrorMsg(null);
    if (!selectedBoard || !selectedGrade || selectedSubjects.length === 0) {
      setErrorMsg('Please select a board, grade, and at least one subject.');
      return;
    }

    if (!primarySubject || !selectedSubjects.includes(primarySubject)) {
      setErrorMsg('Please select a valid primary subject.');
      return;
    }

    setIsSubmitting(true);
    try {
      let { error } = await supabase.rpc('complete_user_onboarding', {
        p_board_id: selectedBoard,
        p_grade_level: selectedGrade,
        p_subject_ids: selectedSubjects,
        p_primary_subject_id: primarySubject,
      });

      if (error) {
        // Direct fallback update to profiles table
        const { error: profileUpdateError } = await supabase
          .from('profiles')
          .update({
            board_id: selectedBoard,
            grade_level: selectedGrade,
            curriculum: selectedBoard,
            grade: selectedGrade,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user?.id);

        if (profileUpdateError) {
          setErrorMsg(profileUpdateError.message);
          setIsSubmitting(false);
          return;
        }
      }

      await refreshProfile();
      router.push('/');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to complete onboarding.');
      setIsSubmitting(false);
    }
  };

  if (authLoading || isLoadingCurriculum) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-sky-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-500/20 mb-2">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome to Brainoro OS, {profile?.display_name || 'Learner'}!
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Configure your authoritative educational curriculum identity. Exactly one board and grade will be assigned to your cognitive learning progression.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-xs leading-relaxed animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>{errorMsg}</div>
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          {/* Step 1: Educational Board */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[11px] font-bold flex items-center justify-center">1</span>
              Select Educational Board
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(boards.length > 0 ? boards : [
                { id: 'CBSE', display_name: 'CBSE (NCERT)', description: 'Central Board of Secondary Education' },
                { id: 'CAMBRIDGE', display_name: 'Cambridge (CAIE)', description: 'Cambridge Assessment International Education' },
                { id: 'IB_MYP', display_name: 'IB MYP', description: 'International Baccalaureate Middle Years' },
              ]).map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBoard(b.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition relative ${
                    selectedBoard === b.id
                      ? 'bg-sky-50/70 border-sky-500 ring-2 ring-sky-500/20 shadow-sm'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-bold text-sm text-slate-900">{b.display_name}</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">{b.description}</div>
                  {selectedBoard === b.id && (
                    <div className="absolute top-3 right-3 text-sky-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Grade Level */}
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[11px] font-bold flex items-center justify-center">2</span>
              Select Grade / Class
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {(classes.length > 0 ? classes : [
                { id: 'G6', grade_level: 6, name: 'Class 6', stage: 'Middle' },
                { id: 'G7', grade_level: 7, name: 'Class 7', stage: 'Middle' },
                { id: 'G8', grade_level: 8, name: 'Class 8', stage: 'Middle' },
                { id: 'G9', grade_level: 9, name: 'Class 9', stage: 'Secondary' },
                { id: 'G10', grade_level: 10, name: 'Class 10', stage: 'Secondary' },
              ]).map((c) => (
                <div
                  key={c.grade_level}
                  onClick={() => setSelectedGrade(c.grade_level)}
                  className={`p-3 rounded-2xl border text-center cursor-pointer transition ${
                    selectedGrade === c.grade_level
                      ? 'bg-sky-50/70 border-sky-500 ring-2 ring-sky-500/20 shadow-sm'
                      : 'bg-slate-50/50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-black text-sm text-slate-900">{c.name}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{c.stage}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Enrolled Subjects & Primary Subject */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-[11px] font-bold flex items-center justify-center">3</span>
                Select Subjects & Mark Primary Subject
              </label>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Star marks primary subject
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableSubjects.map((s) => {
                const isSelected = selectedSubjects.includes(s.id);
                const isPrimary = primarySubject === s.id;

                return (
                  <div
                    key={s.id}
                    className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-50/40 border-sky-300 shadow-sm'
                        : 'bg-slate-50/30 border-slate-200 opacity-60'
                    }`}
                  >
                    <div
                      onClick={() => handleToggleSubject(s.id)}
                      className="flex items-center gap-3 cursor-pointer flex-grow"
                    >
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                        isSelected ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{s.display_name}</span>
                    </div>

                    {isSelected && (
                      <button
                        type="button"
                        onClick={() => setPrimarySubject(s.id)}
                        title={isPrimary ? 'Primary Subject' : 'Click to set as primary'}
                        className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition ${
                          isPrimary
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${isPrimary ? 'text-amber-500 fill-amber-500' : ''}`} />
                        {isPrimary ? 'Primary' : 'Set Primary'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 py-3 px-6 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Finalizing Onboarding...
                </>
              ) : (
                <>
                  Complete Onboarding & Enter Learning
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
