/**
 * Brainoro Authoritative Master Curriculum Knowledge Registry
 * 100% 1:1 Static Knowledge Base for all 536 CBSE NCERT Chapters
 */

import { DeterministicChapterKnowledge } from '../../services/deterministicChapterRegistry';
import { GRADE6_KNOWLEDGE } from './grade6';
import { GRADE7_KNOWLEDGE } from './grade7';
import { GRADE8_KNOWLEDGE } from './grade8';
import { GRADE9_KNOWLEDGE } from './grade9';
import { GRADE10_KNOWLEDGE } from './grade10';
import { GRADE11_SCIENCE_KNOWLEDGE } from './grade11_science';
import { GRADE11_COMMERCE_KNOWLEDGE } from './grade11_commerce';
import { GRADE11_HUMANITIES_KNOWLEDGE } from './grade11_humanities';
import { GRADE12_SCIENCE_KNOWLEDGE } from './grade12_science';
import { GRADE12_COMMERCE_KNOWLEDGE } from './grade12_commerce';
import { GRADE12_HUMANITIES_KNOWLEDGE } from './grade12_humanities';

export const CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP: Record<string, DeterministicChapterKnowledge> = {
  ...GRADE6_KNOWLEDGE,
  ...GRADE7_KNOWLEDGE,
  ...GRADE8_KNOWLEDGE,
  ...GRADE9_KNOWLEDGE,
  ...GRADE10_KNOWLEDGE,
  ...GRADE11_SCIENCE_KNOWLEDGE,
  ...GRADE11_COMMERCE_KNOWLEDGE,
  ...GRADE11_HUMANITIES_KNOWLEDGE,
  ...GRADE12_SCIENCE_KNOWLEDGE,
  ...GRADE12_COMMERCE_KNOWLEDGE,
  ...GRADE12_HUMANITIES_KNOWLEDGE,
};

function normalizeLookupKey(s: string): string {
  if (!s) return '';
  return s
    .replace(/[\u2018\u2019']/g, "'")
    .replace(/[\u201C\u201D"]/g, '"')
    .replace(/:\s*CORE PEDAGOGICAL CONCEPT/gi, '')
    .replace(/:\s*FUNDAMENTAL PRINCIPLES/gi, '')
    .replace(/:\s*THEORETICAL FRAMEWORK/gi, '')
    .replace(/:\s*FOUNDATIONAL PRINCIPLES/gi, '')
    .replace(/:\s*ADVANCED APPLICATIONS & PROBLEM SOLVING/gi, '')
    .replace(/:\s*ADVANCED APPLICATIONS/gi, '')
    .replace(/^CHAPTER\s*\d+\s*:\s*/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

/**
 * Direct 1:1 O(1) Lookup by Chapter ID or Title with Grade & Subject Disambiguation
 */
export function lookupFullAuthoritativeChapter(
  idOrTitle: string,
  grade?: number,
  subject?: string
): DeterministicChapterKnowledge | null {
  if (!idOrTitle) return null;
  
  // 1. Direct ID lookup
  if (CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[idOrTitle]) {
    return CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[idOrTitle];
  }

  const clean = normalizeLookupKey(idOrTitle);
  const cleanSubject = (subject || '').trim().toUpperCase();

  // 2. Exact Title + Grade + Subject match
  for (const [key, value] of Object.entries(CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP)) {
    const valTitle = normalizeLookupKey(value.chapterTitle);
    const keyNorm = normalizeLookupKey(key);
    const titleMatch = keyNorm === clean || valTitle === clean;
    if (titleMatch) {
      if (grade && value.grade && value.grade === grade) {
        if (!cleanSubject || value.subject.toUpperCase().includes(cleanSubject) || cleanSubject.includes(value.subject.toUpperCase())) {
          return value;
        }
      }
    }
  }

  // 3. Exact Title + Grade match
  for (const [key, value] of Object.entries(CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP)) {
    const valTitle = normalizeLookupKey(value.chapterTitle);
    const keyNorm = normalizeLookupKey(key);
    const titleMatch = keyNorm === clean || valTitle === clean;
    if (titleMatch) {
      if (grade && value.grade && value.grade === grade) {
        return value;
      }
    }
  }

  // 4. Exact Title match (any grade)
  for (const [key, value] of Object.entries(CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP)) {
    const valTitle = normalizeLookupKey(value.chapterTitle);
    const keyNorm = normalizeLookupKey(key);
    if (keyNorm === clean || valTitle === clean) {
      return value;
    }
  }

  // 5. Robust Token-Overlap Match (Exact word intersection with Grade & Subject disambiguation)
  const cleanTokens = clean.split(/\s+/).filter(w => w.length > 2 && w !== 'THE' && w !== 'AND' && w !== 'FOR');

  for (const [key, value] of Object.entries(CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP)) {
    const valTitle = normalizeLookupKey(value.chapterTitle);
    const valTokens = valTitle.split(/\s+/).filter(w => w.length > 2 && w !== 'THE' && w !== 'AND' && w !== 'FOR');
    
    // Check if key meaningful tokens match
    const matchingTokens = cleanTokens.filter(t => valTokens.includes(t));
    const tokenRatio = matchingTokens.length / Math.max(cleanTokens.length, valTokens.length, 1);

    if (tokenRatio >= 0.6 || (matchingTokens.length >= 2 && matchingTokens.length >= Math.min(cleanTokens.length, valTokens.length))) {
      if (grade && value.grade && value.grade === grade) {
        if (!cleanSubject || value.subject.toUpperCase().includes(cleanSubject) || cleanSubject.includes(value.subject.toUpperCase())) {
          return value;
        }
      }
    }
  }

  // 6. Token Overlap (Grade Match Only)
  for (const [key, value] of Object.entries(CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP)) {
    const valTitle = normalizeLookupKey(value.chapterTitle);
    const valTokens = valTitle.split(/\s+/).filter(w => w.length > 2 && w !== 'THE' && w !== 'AND' && w !== 'FOR');
    
    const matchingTokens = cleanTokens.filter(t => valTokens.includes(t));
    const tokenRatio = matchingTokens.length / Math.max(cleanTokens.length, valTokens.length, 1);

    if (tokenRatio >= 0.6 || (matchingTokens.length >= 2 && matchingTokens.length >= Math.min(cleanTokens.length, valTokens.length))) {
      if (grade && value.grade && value.grade === grade) {
        return value;
      }
    }
  }

  return null;
}
