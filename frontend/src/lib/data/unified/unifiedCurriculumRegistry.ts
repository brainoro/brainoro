/**
 * Unified Curriculum Registry
 * 
 * Provides O(1) instant, deterministic, zero-hallucination pre-rendered payload lookups
 * for IB MYP and Cambridge Lower Secondary / IGCSE.
 * 
 * CBSE remains strictly isolated and authoritative.
 */

import { BoardId, CornellNotes } from '../../types';
import { ChapterHypnoticData } from '../../interactive/chapterHypnoticEngine';

import ibPayloadsRaw from './preRenderedIbMypPayloads.json';
import cambridgePayloadsRaw from './preRenderedCambridgePayloads.json';

export interface PreRenderedBundle {
  cheatSheet: CornellNotes;
  heroData: Omit<ChapterHypnoticData, 'generateAiReply'>;
}

const IB_PAYLOADS: Record<string, PreRenderedBundle> = ibPayloadsRaw as unknown as Record<string, PreRenderedBundle>;
const CAMBRIDGE_PAYLOADS: Record<string, PreRenderedBundle> = cambridgePayloadsRaw as unknown as Record<string, PreRenderedBundle>;

// Composite key maps for title/grade/subject based lookup: key = `${boardId}_G${grade}_${normSub}_${normTitle}`
const COMPOSITE_LOOKUP_MAP = new Map<string, PreRenderedBundle>();

function makeCompositeKey(boardId: string, grade: number, subject: string, title: string): string {
  const normTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const normSub = subject.toUpperCase().trim();
  return `${boardId}_G${grade}_${normSub}_${normTitle}`;
}

// Index all IB payloads
for (const [id, bundle] of Object.entries(IB_PAYLOADS)) {
  const c = bundle.cheatSheet;
  if (c && c.title) {
    const grade = c.gradeLevel ?? 6;
    const key = makeCompositeKey('IB_MYP', grade, 'MATH', c.title);
    COMPOSITE_LOOKUP_MAP.set(key, bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('IB_MYP', grade, 'MATHEMATICS', c.title), bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('IB_MYP', grade, 'PHYSICS', c.title), bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('IB_MYP', grade, 'CHEMISTRY', c.title), bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('IB_MYP', grade, 'BIOLOGY', c.title), bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('IB_MYP', grade, 'SCIENCE', c.title), bundle);
  }
}

// Index all Cambridge payloads
for (const [id, bundle] of Object.entries(CAMBRIDGE_PAYLOADS)) {
  const c = bundle.cheatSheet;
  if (c && c.title) {
    const grade = c.gradeLevel ?? 6;
    const key = makeCompositeKey('CAMBRIDGE', grade, 'MATH', c.title);
    COMPOSITE_LOOKUP_MAP.set(key, bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('CAMBRIDGE', grade, 'MATHEMATICS', c.title), bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('CAMBRIDGE', grade, 'PHYSICS', c.title), bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('CAMBRIDGE', grade, 'CHEMISTRY', c.title), bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('CAMBRIDGE', grade, 'BIOLOGY', c.title), bundle);
    COMPOSITE_LOOKUP_MAP.set(makeCompositeKey('CAMBRIDGE', grade, 'SCIENCE', c.title), bundle);
  }
}

/**
 * Fast lookup for pre-rendered Unified Topic payload by ID or metadata.
 */
export function lookupPreRenderedPayload(params: {
  conceptId?: string;
  boardId?: BoardId | string;
  gradeLevel?: number;
  subjectId?: string;
  title?: string;
}): PreRenderedBundle | null {
  const { conceptId, boardId, gradeLevel, subjectId, title } = params;

  // 1. Direct ID lookup in IB
  if (conceptId && IB_PAYLOADS[conceptId]) {
    return IB_PAYLOADS[conceptId];
  }

  // 2. Direct ID lookup in Cambridge
  if (conceptId && CAMBRIDGE_PAYLOADS[conceptId]) {
    return CAMBRIDGE_PAYLOADS[conceptId];
  }

  // 3. Composite key lookup
  if (boardId && gradeLevel && title) {
    const sub = subjectId || 'MATH';
    const compKey = makeCompositeKey(boardId, gradeLevel, sub, title);
    if (COMPOSITE_LOOKUP_MAP.has(compKey)) {
      return COMPOSITE_LOOKUP_MAP.get(compKey)!;
    }

    // Fuzzy title search within same board & grade
    const targetNorm = title.toLowerCase().replace(/[^a-z0-9]/g, '');
    const pool = boardId === 'IB_MYP' ? IB_PAYLOADS : boardId === 'CAMBRIDGE' ? CAMBRIDGE_PAYLOADS : null;
    if (pool) {
      for (const bundle of Object.values(pool)) {
        if (bundle.cheatSheet.gradeLevel === gradeLevel) {
          const itemNorm = bundle.cheatSheet.title.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (itemNorm.includes(targetNorm) || targetNorm.includes(itemNorm)) {
            return bundle;
          }
        }
      }
    }
  }

  return null;
}

/**
 * Lookup cheat sheet for IB or Cambridge
 */
export function lookupUnifiedCheatSheet(params: {
  conceptId?: string;
  boardId?: BoardId | string;
  gradeLevel?: number;
  subjectId?: string;
  title?: string;
}): CornellNotes | null {
  const bundle = lookupPreRenderedPayload(params);
  return bundle ? bundle.cheatSheet : null;
}

/**
 * Lookup hero data for IB or Cambridge
 */
export function lookupUnifiedHeroData(params: {
  conceptId?: string;
  boardId?: BoardId | string;
  gradeLevel?: number;
  subjectId?: string;
  title?: string;
}): ChapterHypnoticData | null {
  const bundle = lookupPreRenderedPayload(params);
  if (!bundle) return null;

  const hero = bundle.heroData;
  return {
    ...hero,
    generateAiReply: (userQuery: string) => {
      const q = userQuery.toLowerCase();
      for (const p of hero.aiTwinPrompts) {
        if (q.includes(p.label.toLowerCase()) || p.label.toLowerCase().includes(q)) {
          return p.response;
        }
      }
      return `**${hero.chapterTitle} Guide**: Focus on ${hero.storyCards[0]?.takeaway || 'mastering foundational principles and avoiding common traps'}.`;
    }
  };
}
