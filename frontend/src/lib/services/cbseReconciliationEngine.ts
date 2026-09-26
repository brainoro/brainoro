// =============================================================================
// Brainoro OS — CBSE Deterministic Reconciliation Engine
// Independent diffing, audit and safe idempotent reconciliation.
// =============================================================================

import {
  CbseTextbook,
  CbseChapter,
  CbseSection,
  CbseAuthoritativeConcept,
  CbseConceptSectionMapping,
} from '../types/cbseCurriculum';
import {
  OfficialExtractedTextbook,
  OfficialExtractedChapter,
  CbseTextbookDiffReport,
  CbseChapterDiff,
  CbseReconciliationSummary,
  CbseSourceManifestEntry,
} from '../types/cbseReconciliation';
import {
  extractOfficialTextbookToc,
  normalizeChapterTitle,
} from './cbseOfficialSourceExtractor';
import { CBSE_SOURCE_MANIFEST } from '../data/cbseSourceManifest';

/**
 * Deterministically compares a DB textbook and its chapters against an independently
 * extracted official NCERT source.
 */
export function compareTextbookWithOfficialSource(
  dbTextbook: CbseTextbook,
  dbChapters: CbseChapter[],
  officialSource: OfficialExtractedTextbook
): CbseTextbookDiffReport {
  // If official source is pending or unverified, fail closed to DATA_PENDING
  if (officialSource.verification_status !== 'VERIFIED' || officialSource.chapters.length === 0) {
    return {
      textbook_id: dbTextbook.id,
      textbook_title: dbTextbook.title,
      grade_level: officialSource.grade_level,
      subject_id: officialSource.subject_id,
      stream_id: officialSource.stream_id,
      curriculum_version_id: dbTextbook.curriculum_version_id,
      status: 'DATA_PENDING',
      official_source_code: officialSource.official_code || 'N/A',
      expected_chapter_count: 0,
      actual_chapter_count: dbChapters.length,
      diffs: [],
      expected_chapters: [],
      actual_chapters: dbChapters.map(c => c.chapter_title),
    };
  }

  const diffs: CbseChapterDiff[] = [];
  let identityMismatch: string | undefined = undefined;

  // 1. Check composite boundary
  if (dbTextbook.id !== officialSource.textbook_id) {
    identityMismatch = `Textbook ID mismatch: DB has '${dbTextbook.id}', official source expects '${officialSource.textbook_id}'`;
  } else if (dbTextbook.curriculum_version_id !== officialSource.curriculum_version_id) {
    identityMismatch = `Curriculum version mismatch: DB has '${dbTextbook.curriculum_version_id}', official source expects '${officialSource.curriculum_version_id}'`;
  }

  const sortedDbChapters = [...dbChapters].sort(
    (a, b) => a.official_sequence_order - b.official_sequence_order
  );

  const expectedTitles = officialSource.chapters.map(c => c.chapter_title);
  const actualTitles = sortedDbChapters.map(c => c.chapter_title);

  // 2. Check duplicate chapters in DB
  const seenTitles = new Set<string>();
  for (const ch of sortedDbChapters) {
    const norm = normalizeChapterTitle(ch.chapter_title);
    if (seenTitles.has(norm)) {
      diffs.push({
        type: 'DUPLICATE',
        chapter_number: ch.chapter_number,
        actual: ch.chapter_title,
        actual_order: ch.official_sequence_order,
        details: `Duplicate chapter detected in DB: '${ch.chapter_title}'`,
      });
    }
    seenTitles.add(norm);
  }

  // 3. Compare chapter by chapter in order
  const maxLen = Math.max(officialSource.chapters.length, sortedDbChapters.length);
  for (let i = 0; i < maxLen; i++) {
    const exp = officialSource.chapters[i];
    const act = sortedDbChapters[i];

    if (exp && !act) {
      diffs.push({
        type: 'MISSING',
        chapter_number: exp.chapter_number,
        expected: exp.chapter_title,
        expected_order: exp.official_sequence_order,
        details: `Official Chapter ${exp.chapter_number} '${exp.chapter_title}' is missing from DB.`,
      });
    } else if (!exp && act) {
      diffs.push({
        type: 'EXTRA',
        chapter_number: act.chapter_number,
        actual: act.chapter_title,
        actual_order: act.official_sequence_order,
        details: `Extra Chapter in DB: '${act.chapter_title}' (order: ${act.official_sequence_order}) not in official source.`,
      });
    } else if (exp && act) {
      const expNorm = normalizeChapterTitle(exp.chapter_title);
      const actNorm = normalizeChapterTitle(act.chapter_title);

      if (exp.official_sequence_order !== act.official_sequence_order) {
        diffs.push({
          type: 'ORDER_MISMATCH',
          chapter_number: act.chapter_number,
          expected: exp.chapter_title,
          actual: act.chapter_title,
          expected_order: exp.official_sequence_order,
          actual_order: act.official_sequence_order,
          details: `Order mismatch: position ${i + 1} has DB sequence ${act.official_sequence_order} vs expected ${exp.official_sequence_order}`,
        });
      }

      if (expNorm !== actNorm) {
        // If titles don't match, check if it exists elsewhere
        const existsElsewhere = sortedDbChapters.some(
          c => normalizeChapterTitle(c.chapter_title) === expNorm
        );
        if (existsElsewhere) {
          diffs.push({
            type: 'ORDER_MISMATCH',
            chapter_number: exp.chapter_number,
            expected: exp.chapter_title,
            actual: act.chapter_title,
            details: `Chapter '${exp.chapter_title}' is placed out of sequence.`,
          });
        } else {
          diffs.push({
            type: 'TITLE_MISMATCH',
            chapter_number: exp.chapter_number,
            expected: exp.chapter_title,
            actual: act.chapter_title,
            details: `Title mismatch at position ${i + 1}: expected '${exp.chapter_title}', got '${act.chapter_title}'`,
          });
        }
      }
    }
  }

  const isPass = !identityMismatch && diffs.length === 0;

  return {
    textbook_id: dbTextbook.id,
    textbook_title: dbTextbook.title,
    grade_level: officialSource.grade_level,
    subject_id: officialSource.subject_id,
    stream_id: officialSource.stream_id,
    curriculum_version_id: dbTextbook.curriculum_version_id,
    status: isPass ? 'PASS' : 'MISMATCH',
    official_source_code: officialSource.official_code,
    expected_chapter_count: officialSource.chapters.length,
    actual_chapter_count: sortedDbChapters.length,
    identity_mismatch: identityMismatch,
    diffs,
    expected_chapters: expectedTitles,
    actual_chapters: actualTitles,
  };
}

/**
 * Result of a safe, idempotent reconciliation pass.
 */
export interface CbseReconcileResult {
  modified: boolean;
  changesCount: number;
  updatedChapters: CbseChapter[];
  updatedSections: CbseSection[];
  updatedConcepts: CbseAuthoritativeConcept[];
  updatedMappings: CbseConceptSectionMapping[];
  logs: string[];
}

/**
 * Performs a safe, idempotent reconciliation of a single textbook's chapters.
 * If the DB already matches the official source, returns modified: false, changesCount: 0.
 * If official source is not verified, refuses to modify.
 */
export function reconcileTextbook(
  dbTextbook: CbseTextbook,
  allDbChapters: CbseChapter[],
  allDbSections: CbseSection[],
  allDbConcepts: CbseAuthoritativeConcept[],
  allDbMappings: CbseConceptSectionMapping[],
  officialSource: OfficialExtractedTextbook
): CbseReconcileResult {
  const logs: string[] = [];

  // Safety check: Never reconcile if official source is unverified
  if (officialSource.verification_status !== 'VERIFIED' || officialSource.chapters.length === 0) {
    logs.push(`SKIPPED: Official source for ${dbTextbook.title} is not verified. Fail-closed preserved.`);
    return {
      modified: false,
      changesCount: 0,
      updatedChapters: allDbChapters,
      updatedSections: allDbSections,
      updatedConcepts: allDbConcepts,
      updatedMappings: allDbMappings,
      logs,
    };
  }

  const currentTbChapters = allDbChapters.filter(c => c.textbook_id === dbTextbook.id);
  const diffReport = compareTextbookWithOfficialSource(dbTextbook, currentTbChapters, officialSource);

  // Idempotency check: If already PASS, make 0 changes
  if (diffReport.status === 'PASS') {
    logs.push(`NO CHANGES REQUIRED: ${dbTextbook.title} is already fully synchronized with official source.`);
    return {
      modified: false,
      changesCount: 0,
      updatedChapters: allDbChapters,
      updatedSections: allDbSections,
      updatedConcepts: allDbConcepts,
      updatedMappings: allDbMappings,
      logs,
    };
  }

  logs.push(`RECONCILING ${dbTextbook.title} (${dbTextbook.id}): Detected ${diffReport.diffs.length} discrepancies.`);

  // Remove existing chapters for this textbook
  const oldChIds = new Set(currentTbChapters.map(c => c.id));
  const remainingChapters = allDbChapters.filter(c => c.textbook_id !== dbTextbook.id);
  const remainingSections = allDbSections.filter(s => !oldChIds.has(s.chapter_id));
  const remainingConcepts = allDbConcepts.filter(c => !oldChIds.has(c.chapter_id));
  const remainingMappings = allDbMappings.filter(m => !oldChIds.has(m.concept_id.replace(/^MAP-/, '').split('-')[0]));

  const pad2 = (n: number) => String(n).padStart(2, '0');
  const newChapters: CbseChapter[] = [];
  const newSections: CbseSection[] = [];
  const newConcepts: CbseAuthoritativeConcept[] = [];
  const newMappings: CbseConceptSectionMapping[] = [];

  officialSource.chapters.forEach((offCh) => {
    const chNum = offCh.chapter_number;
    const chId = `${dbTextbook.id.replace('CBSE-TB-', 'CBSE-CH-')}-CH${pad2(chNum)}`;
    
    newChapters.push({
      id: chId,
      textbook_id: dbTextbook.id,
      textbook_part_id: offCh.part_volume ? `${dbTextbook.id}-PART1` : null,
      chapter_number: chNum,
      chapter_title: offCh.chapter_title,
      official_sequence_order: offCh.official_sequence_order,
      description: offCh.description || `Official Chapter ${chNum}: ${offCh.chapter_title} from ${dbTextbook.title}`,
    });

    // STRICT NON-SYNTHETIC POLICY:
    // If NCERT verifies only chapter title/order, that does NOT authorize creation of synthetic educational concepts.
    // Preserve existing verified sections/concepts for this chapter if they already exist; do NOT invent fake ones.
    const existingSecsForCh = allDbSections.filter(s => s.chapter_id === chId);
    if (existingSecsForCh.length > 0) {
      newSections.push(...existingSecsForCh);
    }
    const existingConcsForCh = allDbConcepts.filter(c => c.chapter_id === chId);
    if (existingConcsForCh.length > 0) {
      newConcepts.push(...existingConcsForCh);
    }
  });

  const changesCount = Math.abs(currentTbChapters.length - newChapters.length) + diffReport.diffs.length;
  logs.push(`SUCCESS: Reconciled ${newChapters.length} official chapters for ${dbTextbook.title}.`);

  return {
    modified: true,
    changesCount,
    updatedChapters: [...remainingChapters, ...newChapters],
    updatedSections: [...remainingSections, ...newSections],
    updatedConcepts: [...remainingConcepts, ...newConcepts],
    updatedMappings: [...remainingMappings, ...newMappings],
    logs,
  };
}

/**
 * Automatically discovers all configured CBSE textbooks and runs deterministic
 * audit against the source manifest.
 */
export async function auditAllConfiguredTextbooks(
  textbooks: CbseTextbook[],
  chapters: CbseChapter[],
  manifest: CbseSourceManifestEntry[] = CBSE_SOURCE_MANIFEST
): Promise<CbseReconciliationSummary> {
  const reports: CbseTextbookDiffReport[] = [];
  let passCount = 0;
  let mismatchCount = 0;
  let dataPendingCount = 0;
  let verifiedSources = 0;
  let pendingSources = 0;
  let failedSources = 0;

  for (const tb of textbooks) {
    // Locate manifest entry for this textbook
    const manifestEntry = manifest.find(m => m.textbook_id === tb.id);
    if (!manifestEntry) {
      // Unmanifested textbook -> Fail closed to DATA_PENDING
      pendingSources++;
      dataPendingCount++;
      reports.push({
        textbook_id: tb.id,
        textbook_title: tb.title,
        grade_level: 0,
        subject_id: tb.grade_subject_id,
        stream_id: 'UNKNOWN',
        curriculum_version_id: tb.curriculum_version_id,
        status: 'DATA_PENDING',
        official_source_code: tb.official_code || 'UNASSIGNED',
        expected_chapter_count: 0,
        actual_chapter_count: chapters.filter(c => c.textbook_id === tb.id).length,
        identity_mismatch: 'No official manifest entry configured for this textbook',
        diffs: [],
        expected_chapters: [],
        actual_chapters: chapters.filter(c => c.textbook_id === tb.id).map(c => c.chapter_title),
      });
      continue;
    }

    if (manifestEntry.verification_status === 'VERIFIED') {
      verifiedSources++;
    } else {
      pendingSources++;
    }

    const officialSource = await extractOfficialTextbookToc(manifestEntry);
    const tbChapters = chapters.filter(c => c.textbook_id === tb.id);
    const diffReport = compareTextbookWithOfficialSource(tb, tbChapters, officialSource);

    if (diffReport.status === 'PASS') {
      passCount++;
    } else if (diffReport.status === 'MISMATCH') {
      mismatchCount++;
    } else {
      dataPendingCount++;
    }

    reports.push(diffReport);
  }

  return {
    total_configured_textbooks: textbooks.length,
    verified_sources: verifiedSources,
    pending_sources: pendingSources,
    failed_sources: failedSources,
    pass_count: passCount,
    mismatch_count: mismatchCount,
    data_pending_count: dataPendingCount,
    reconciled_count: 0,
    reports,
  };
}
