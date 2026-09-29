/**
 * Brainoro Practice Test Service (Microsoft Learn Style Random Batching)
 * ----------------------------------------------------------------------
 * 1. Fetches all available authoritative questions for a chapter from Supabase.
 * 2. Applies an unbiased Fisher-Yates shuffle algorithm.
 * 3. Returns a fresh random batch of exactly 10 questions per attempt.
 * 4. Provides zero-downtime authoritative fallback if Supabase is offline.
 */

import { supabase, isSupabaseConfigured } from '../supabase/client';
import { BoardId, AssessmentItem } from '../types';
import { generateChapterPracticeItems } from '../interactive/chapterPracticeEngine';

export interface ChapterPracticeQuestion {
  id: string;
  chapter_id: string;
  board_id?: string;
  subject?: string;
  grade_level?: number;
  prompt: string;
  options: string[];
  correct_option_index: number;
  explanation: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD' | string;
  question_type?: string;
}

export interface PracticeBatchOptions {
  batchSize?: number;
  chapterTitle?: string;
  subject?: string;
  grade?: number;
  boardId?: BoardId;
  forceLocalFallback?: boolean;
}

/**
 * High-performance Fisher-Yates unbiased shuffle algorithm.
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Fetches all questions for a chapter from Supabase, shuffles them,
 * and extracts a random batch (default 10) for the practice session.
 */
export async function fetchRandom10PracticeQuestions(
  chapterId: string,
  options: PracticeBatchOptions = {}
): Promise<ChapterPracticeQuestion[]> {
  const batchSize = options.batchSize || 10;
  const boardId = options.boardId || 'CBSE';
  const grade = options.grade || 9;
  const subject = options.subject || 'MATHEMATICS';
  const chapterTitle = options.chapterTitle || chapterId;

  // 1. If Supabase is configured and local fallback is not forced, query Supabase
  if (isSupabaseConfigured() && !options.forceLocalFallback) {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('chapter_id', chapterId);

      if (!error && data && data.length > 0) {
        // Map database records safely
        const validQuestions: ChapterPracticeQuestion[] = data.map((row: any) => ({
          id: String(row.id || `Q-${Math.random()}`),
          chapter_id: String(row.chapter_id || chapterId),
          board_id: row.board_id || boardId,
          subject: row.subject || subject,
          grade_level: Number(row.grade_level || grade),
          prompt: String(row.prompt || ''),
          options: Array.isArray(row.options) ? row.options : (typeof row.options === 'string' ? JSON.parse(row.options) : []),
          correct_option_index: Number(row.correct_option_index ?? 0),
          explanation: String(row.explanation || ''),
          difficulty: row.difficulty || 'MEDIUM',
          question_type: row.question_type || 'OBJECTIVE',
        })).filter(q => q.prompt.length > 0 && q.options.length >= 2);

        if (validQuestions.length > 0) {
          // Shuffle all questions and pick a random batch of 10
          const shuffled = shuffleArray<ChapterPracticeQuestion>(validQuestions);
          return shuffled.slice(0, Math.min(batchSize, shuffled.length));
        }
      }
    } catch (supabaseError) {
      console.warn('[ChapterPracticeService] Supabase query fallback:', supabaseError);
    }
  }

  // 2. Authoritative Zero-Generic Fallback: Generate from local curriculum engine
  const fallbackItems: AssessmentItem[] = generateChapterPracticeItems({
    chapterTitle,
    conceptTitle: chapterTitle,
    conceptId: chapterId,
    grade,
    subject,
    boardId,
  });

  const adaptedQuestions: ChapterPracticeQuestion[] = fallbackItems.map((item, idx) => ({
    id: item.id || `FALLBACK-${chapterId}-${idx}`,
    chapter_id: chapterId,
    board_id: boardId,
    subject,
    grade_level: grade,
    prompt: item.prompt,
    options: item.options || [],
    correct_option_index: item.correctOptionIndex ?? 0,
    explanation: item.explanation || item.sampleSolution || '',
    difficulty: item.difficultyB && item.difficultyB > 0.5 ? 'HARD' : item.difficultyB && item.difficultyB < -0.5 ? 'EASY' : 'MEDIUM',
    question_type: item.questionType || 'OBJECTIVE',
  }));

  const randomizedFallback = shuffleArray<ChapterPracticeQuestion>(adaptedQuestions);
  return randomizedFallback.slice(0, Math.min(batchSize, randomizedFallback.length));
}
