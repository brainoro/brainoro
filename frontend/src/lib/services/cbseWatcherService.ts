// =============================================================================
// Brainoro OS — Background NCERT Watcher & Recall Safety Handler
// Detects future NCERT changes, new parts, corrigenda, and recall events.
// Invalidates stale packages immediately; auto-reconciles deterministic updates.
// =============================================================================

import {
  ChangeClassification,
  ExpectedCurriculumSnapshot,
} from '../types/cbseAuthorityEngine';
import { NCERT_DISCOVERY_ENDPOINTS } from './cbseSourceDiscoveryService';

export interface WatcherCheckResult {
  endpoint: string;
  timestamp: string;
  change_detected: boolean;
  classification: ChangeClassification;
  affected_families: string[];
  recall_notice_detected: boolean;
  notes: string[];
}

/**
 * Evaluates whether an official NCERT source change represents a true structural
 * curriculum update versus a simple cosmetic/wrapper refresh.
 */
export function evaluateSourceChange(
  currentSnapshot: ExpectedCurriculumSnapshot,
  newRawHtmlOrPdfText: string,
  newNormalizedHash: string,
  isRecalled: boolean = false
): WatcherCheckResult {
  if (isRecalled) {
    return {
      endpoint: NCERT_DISCOVERY_ENDPOINTS.ANNOUNCEMENTS,
      timestamp: new Date().toISOString(),
      change_detected: true,
      classification: 'RECALL',
      affected_families: [currentSnapshot.textbook_family],
      recall_notice_detected: true,
      notes: [
        `Statutory recall advisory detected for ${currentSnapshot.textbook_family}. Active package invalidated.`,
      ],
    };
  }

  // Dual-hash check:
  // If normalized structure hash is identical, wrapper changed but curriculum did not.
  if (currentSnapshot.normalized_structure_hash === newNormalizedHash) {
    return {
      endpoint: NCERT_DISCOVERY_ENDPOINTS.TEXTBOOK_PORTAL,
      timestamp: new Date().toISOString(),
      change_detected: false,
      classification: 'SOURCE_REFRESH_ONLY',
      affected_families: [],
      recall_notice_detected: false,
      notes: ['Source wrapper refreshed with identical normalized curriculum structure hash.'],
    };
  }

  return {
    endpoint: NCERT_DISCOVERY_ENDPOINTS.TEXTBOOK_PORTAL,
    timestamp: new Date().toISOString(),
    change_detected: true,
    classification: 'STRUCTURAL_CHANGE',
    affected_families: [currentSnapshot.textbook_family],
    recall_notice_detected: false,
    notes: [
      `Structural change detected: old hash ${currentSnapshot.normalized_structure_hash} !== new hash ${newNormalizedHash}`,
    ],
  };
}

export interface WatcherSweepReport {
  timestamp: string;
  total_textbooks_checked: number;
  unchanged_count: number;
  updated_count: number;
  recalled_count: number;
  mismatch_count: number;
  events: Array<{
    textbook_id: string;
    family: string;
    classification: ChangeClassification | import('../types/cbseAuthorityEngine').MismatchClassification;
    action_taken: string;
    timestamp: string;
  }>;
}

/**
 * Server-side persistent watcher sweep that audits all configured CBSE textbooks
 * against NCERT official evidence without relying on a browser session.
 */
export async function runServerWatcherSweep(options: {
  dryRun?: boolean;
  knownRecalls?: string[];
  customTextbooks?: any[];
  customChapters?: any[];
} = {}): Promise<WatcherSweepReport> {
  const { resolveCurriculumApplicability, discoverAllTextbookParts } = await import('./cbseSourceDiscoveryService');
  const { buildExpectedCurriculumSnapshot } = await import('./cbseSourceProofService');
  const { CBSE_TEXTBOOKS, CBSE_CHAPTERS, CBSE_GRADE_SUBJECTS, CBSE_TEXTBOOK_PARTS } = await import('../data/cbseCurriculumData');
  const { compareCurriculumSnapshots, executeStagedReconciliation, acquirePackageLock, releasePackageLock } = await import('./cbseStagedReconciliationEngine');

  const textbooks = options.customTextbooks || CBSE_TEXTBOOKS;
  const chapters = options.customChapters || CBSE_CHAPTERS;
  const timestamp = new Date().toISOString();
  const knownRecalls = new Set(options.knownRecalls || []);
  const report: WatcherSweepReport = {
    timestamp,
    total_textbooks_checked: textbooks.length,
    unchanged_count: 0,
    updated_count: 0,
    recalled_count: 0,
    mismatch_count: 0,
    events: [],
  };

  for (const tb of textbooks) {
    const isRecalled = knownRecalls.has(tb.id) || knownRecalls.has(tb.title);
    const gs = (CBSE_GRADE_SUBJECTS || []).find((g: any) => g.id === tb.grade_subject_id);
    const gradeId = gs?.grade_id || tb.grade_id || 'CBSE-G6';
    const subjectId = gs?.subject_id || tb.subject_id || 'CBSE-SUB-MATH';
    const gradeNum = parseInt(gradeId.replace('CBSE-G', ''), 10) || 6;
    const app = resolveCurriculumApplicability(gradeNum, subjectId);
    if (!app) {
      report.events.push({
        textbook_id: tb.id,
        family: tb.title,
        classification: 'UNVERIFIABLE_CHANGE',
        action_taken: 'APPLICABILITY_UNRESOLVED_FAIL_CLOSED',
        timestamp: new Date().toISOString(),
      });
      continue;
    }
    const parts = discoverAllTextbookParts(tb.title, gradeNum, subjectId);
    const expected = buildExpectedCurriculumSnapshot(app, parts);

    if (isRecalled) {
      report.recalled_count++;
      report.events.push({
        textbook_id: tb.id,
        family: tb.title,
        classification: 'RECALL',
        action_taken: 'INVALIDATED_PACKAGE_FAIL_CLOSED_DATA_PENDING',
        timestamp: new Date().toISOString(),
      });
      continue;
    }

    // Compare with current active store
    const actualChapters = chapters.filter((c: any) => c.textbook_id === tb.id);
    const partsForTb = ((CBSE_TEXTBOOK_PARTS as any[]) || []).filter((p: any) => p.textbook_id === tb.id);
    const partsCount = partsForTb.length > 0 ? partsForTb.length : (tb.total_parts || 1);
    const actualSnapshot = {
      textbook_id: tb.id,
      grade_id: gradeId,
      subject_id: subjectId,
      curriculum_version_id: expected.applicability.curriculum_version,
      academic_year: expected.applicability.academic_year,
      parts_count: partsCount,
      parts: partsForTb.length > 0
        ? partsForTb.map((p: any) => ({ part_number: p.part_number, part_title: p.part_title, display_order: p.display_order }))
        : (tb.parts_metadata || [{ part_number: 1, part_title: tb.title, display_order: 1 }]),
      nodes_count: actualChapters.length,
      nodes: actualChapters.map((ch: any, idx: number) => ({
        part_number: 1,
        node_number: ch.chapter_number,
        official_sequence_order: ch.chapter_number || idx + 1,
        title: ch.chapter_title || ch.title || '',
      })),
      read_timestamp: new Date().toISOString(),
    };

    const comp = compareCurriculumSnapshots(expected, actualSnapshot);
    if (comp.status === 'EXACT_MATCH') {
      report.unchanged_count++;
    } else {
      report.mismatch_count++;
      let repairResult = 'LOCK_CONTENTION';
      try {
        if (!options.dryRun) {
          const staged = executeStagedReconciliation(tb.id, expected, actualChapters, partsForTb);
          repairResult = staged.action_taken;
          if (staged.action_taken === 'PUBLISHED') {
            report.updated_count++;
          }
        } else {
          repairResult = 'DRY_RUN_ONLY';
        }
      } catch (err: any) {
        repairResult = `ERROR_${err.message}`;
      }
      report.events.push({
        textbook_id: tb.id,
        family: tb.title,
        classification: comp.diffs[0]?.classification || 'STRUCTURAL_CHANGE',
        action_taken: `STAGED_REPAIR_${repairResult}`,
        timestamp: new Date().toISOString(),
      });
    }
  }

  return report;
}
