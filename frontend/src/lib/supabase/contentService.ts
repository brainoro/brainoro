import { supabase, isSupabaseConfigured } from './client';
import { CurriculumConcept, BoardId } from '../types';
import { mapRowToConcept } from './curriculumService';

export interface Topic {
  id: string;
  unit_id: string;
  board_id: string;
  grade_level: number;
  subject_id: string;
  title: string;
  core_logic_essence: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface ContentModule {
  id: string;
  topic_id: string;
  module_type: string;
  content: string;
  ocaverse_metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export function normalizeSlug(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalizes subject identifier to canonical database subject ID.
 * Supports standard canonical IDs ('mathematics', 'biology', 'chemistry', 'physics', 'computer-science')
 * as well as common aliases ('MATH', 'BIO', 'CHEM', 'PHYSICS', 'CS', etc.).
 */
export function normalizeSubjectId(subject: string): string {
  if (!subject) return 'mathematics';
  const s = subject.toLowerCase().trim();
  if (s === 'math' || s === 'mathematics' || s === 'maths') return 'mathematics';
  if (s === 'bio' || s === 'biology') return 'biology';
  if (s === 'chem' || s === 'chemistry') return 'chemistry';
  if (s === 'phy' || s === 'physics') return 'physics';
  if (s === 'cs' || s === 'computer-science' || s === 'computer_science' || s === 'ip' || s === 'informatics-practices') return 'computer-science';
  if (s === 'pe' || s === 'physical-education' || s === 'physical_education') return 'physical-education';
  if (s === 'english' || s === 'eng') return 'english';
  if (s === 'hindi') return 'hindi';
  if (s === 'sanskrit') return 'sanskrit';
  if (s === 'social-science' || s === 'sst' || s === 'social_science') return 'social-science';
  return s;
}

/**
 * Retrieves all topics for a given subject and grade from `public.topics` joined with `public.content_modules`.
 * Results are ordered by metadata order_index ascending.
 */
export async function getTopicsBySubjectAndGrade(
  subjectId: string,
  gradeLevel: number,
  boardId: BoardId = 'CBSE'
): Promise<CurriculumConcept[]> {
  if (!isSupabaseConfigured()) {
    console.warn('[Supabase ContentService] Supabase is not configured. Returning empty topics list.');
    return [];
  }

  const normalizedSubject = normalizeSubjectId(subjectId);

  try {
    const { data, error } = await supabase
      .from('topics')
      .select(`
        id,
        unit_id,
        board_id,
        grade_level,
        subject_id,
        title,
        core_logic_essence,
        metadata,
        created_at,
        updated_at,
        content_modules (
          id,
          topic_id,
          module_type,
          content,
          ocaverse_metadata,
          created_at,
          updated_at
        )
      `)
      .eq('grade_level', gradeLevel)
      .or(`subject_id.eq.${normalizedSubject},subject_id.ilike.${normalizedSubject}`)
      .eq('board_id', boardId);

    if (error) {
      console.error('[Supabase ContentService] Failed to getTopicsBySubjectAndGrade:', error.message, {
        subjectId,
        normalizedSubject,
        gradeLevel,
        boardId,
      });
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    // Map rows to CurriculumConcept
    const mapped = data.map((row: any) =>
      mapRowToConcept({
        ...row,
        parent_node_id: row.parent_node_id || row.unit_id || null,
      })
    );

    // Sort stably by metadata order_index or numeric sequence in slug/id
    return mapped.sort((a, b) => {
      const orderA =
        a.metadata?.order_index !== undefined
          ? Number(a.metadata.order_index)
          : Number.MAX_SAFE_INTEGER;
      const orderB =
        b.metadata?.order_index !== undefined
          ? Number(b.metadata.order_index)
          : Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title, undefined, { numeric: true });
    });
  } catch (err: any) {
    console.error('[Supabase ContentService] Unexpected exception in getTopicsBySubjectAndGrade:', err?.message || err, {
      subjectId,
      gradeLevel,
      boardId,
    });
    return [];
  }
}

/**
 * Fetches full topic details along with its related content modules by ID or slug.
 */
export async function getTopicByIdOrSlug(
  identifier: string,
  gradeLevel?: number,
  subjectId?: string,
  boardId: BoardId = 'CBSE'
): Promise<CurriculumConcept | null> {
  if (!isSupabaseConfigured() || !identifier) {
    return null;
  }

  const rawIdent = identifier.trim();
  const normalizedSlug = normalizeSlug(rawIdent);
  const normalizedSubj = subjectId ? normalizeSubjectId(subjectId) : undefined;

  try {
    let query = supabase
      .from('topics')
      .select(`
        id,
        unit_id,
        board_id,
        grade_level,
        subject_id,
        title,
        core_logic_essence,
        metadata,
        created_at,
        updated_at,
        content_modules (
          id,
          topic_id,
          module_type,
          content,
          ocaverse_metadata,
          created_at,
          updated_at
        )
      `);

    if (gradeLevel) {
      query = query.eq('grade_level', gradeLevel);
    }
    if (normalizedSubj) {
      query = query.or(`subject_id.eq.${normalizedSubj},subject_id.ilike.${normalizedSubj}`);
    }
    if (boardId) {
      query = query.eq('board_id', boardId);
    }

    // Try finding by exact ID first or metadata->>slug
    const { data, error } = await query
      .or(`id.eq.${rawIdent},metadata->>slug.eq.${normalizedSlug},metadata->>slug.eq.${rawIdent}`)
      .limit(1);

    if (error) {
      console.error('[Supabase ContentService] Failed to getTopicByIdOrSlug:', error.message, {
        identifier,
        normalizedSlug,
        gradeLevel,
        subjectId,
      });
      return null;
    }

    if (!data || data.length === 0) {
      // Secondary fallback: query by title ilike
      let fallbackQuery = supabase
        .from('topics')
        .select(`
          id,
          unit_id,
          board_id,
          grade_level,
          subject_id,
          title,
          core_logic_essence,
          metadata,
          created_at,
          updated_at,
          content_modules (
            id,
            topic_id,
            module_type,
            content,
            ocaverse_metadata,
            created_at,
            updated_at
          )
        `)
        .ilike('title', rawIdent)
        .limit(1);

      if (gradeLevel) fallbackQuery = fallbackQuery.eq('grade_level', gradeLevel);
      if (normalizedSubj) fallbackQuery = fallbackQuery.or(`subject_id.eq.${normalizedSubj},subject_id.ilike.${normalizedSubj}`);
      if (boardId) fallbackQuery = fallbackQuery.eq('board_id', boardId);

      const { data: fallbackData, error: fallbackError } = await fallbackQuery;
      if (!fallbackError && fallbackData && fallbackData.length > 0) {
        const row = fallbackData[0] as any;
        return mapRowToConcept({
          ...row,
          parent_node_id: row.parent_node_id || row.unit_id || null,
        });
      }

      return null;
    }

    const row = data[0] as any;
    return mapRowToConcept({
      ...row,
      parent_node_id: row.parent_node_id || row.unit_id || null,
    });
  } catch (err: any) {
    console.error('[Supabase ContentService] Unexpected exception in getTopicByIdOrSlug:', err?.message || err, {
      identifier,
      gradeLevel,
      subjectId,
    });
    return null;
  }
}
