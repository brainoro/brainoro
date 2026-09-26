// =============================================================================
// Brainoro OS — CBSE Authoritative Curriculum Reconciliation Types
// Independent types for official NCERT source extraction and deterministic diffing.
// =============================================================================

export type CbseSourceType =
  | 'NCERT_PORTAL_WEB'
  | 'NCERT_PORTAL_API'
  | 'NCERT_PDF_TOC'
  | 'STATUTORY_CATALOG';

export type CbseSourceVerificationStatus =
  | 'VERIFIED'
  | 'PENDING_VERIFICATION'
  | 'UNAVAILABLE';

export type CbseReconciliationStatus =
  | 'PASS'
  | 'MISMATCH'
  | 'DATA_PENDING';

export interface CbseSourceManifestEntry {
  grade_level: number;
  grade_id: string;
  subject_id: string;
  subject_name: string;
  stream_id: string;
  curriculum_version_id: string;
  textbook_id: string;
  official_textbook_name: string;
  official_source_code: string;
  official_source_url: string;
  part_volume?: string | null;
  source_type: CbseSourceType;
  verification_status: CbseSourceVerificationStatus;
}

export interface OfficialExtractedChapter {
  chapter_number: number;
  chapter_title: string;
  official_sequence_order: number;
  part_volume?: string | null;
  description?: string;
  sections_available: boolean;
}

export interface OfficialExtractedTextbook {
  textbook_id: string;
  official_code: string;
  official_title: string;
  grade_level: number;
  subject_id: string;
  curriculum_version_id: string;
  stream_id: string;
  part_volume?: string | null;
  chapters: OfficialExtractedChapter[];
  source_url: string;
  verification_status: CbseSourceVerificationStatus;
}

export interface CbseChapterDiff {
  type: 'MISSING' | 'EXTRA' | 'TITLE_MISMATCH' | 'ORDER_MISMATCH' | 'DUPLICATE';
  chapter_number: number;
  expected?: string;
  actual?: string;
  expected_order?: number;
  actual_order?: number;
  details?: string;
}

export interface CbseTextbookDiffReport {
  textbook_id: string;
  textbook_title: string;
  grade_level: number;
  subject_id: string;
  stream_id: string;
  curriculum_version_id: string;
  status: CbseReconciliationStatus;
  official_source_code: string;
  expected_chapter_count: number;
  actual_chapter_count: number;
  identity_mismatch?: string;
  diffs: CbseChapterDiff[];
  expected_chapters: string[];
  actual_chapters: string[];
}

export interface CbseReconciliationSummary {
  total_configured_textbooks: number;
  verified_sources: number;
  pending_sources: number;
  failed_sources: number;
  pass_count: number;
  mismatch_count: number;
  data_pending_count: number;
  reconciled_count: number;
  reports: CbseTextbookDiffReport[];
}
