// =============================================================================
// Brainoro OS — Authoritative NCERT Curriculum Engine Data Contracts
// Generic, forward-compatible data model for CBSE Grades 6–12 across 1 to N parts.
// Decoupled from Brainoro application data to maintain an independent oracle.
// =============================================================================

export type NcrtAcademicYear = string; // e.g. '2024-25', '2025-26', '2026-27'

export type NcrtCurriculumVersionCode =
  | 'CBSE-NCERT-2024-NCF-SE'
  | 'CBSE-NCERT-2026-27'
  | 'CBSE-NCERT-RATIONALISED-2022'
  | string;

export type StructuralNodeType =
  | 'chapter'
  | 'unit'
  | 'lesson'
  | 'module'
  | 'section'
  | 'appendix';

export type BookApplicabilityRole =
  | 'CORE_REQUIRED'
  | 'SUPPLEMENTARY_READER'
  | 'ELECTIVE'
  | 'VOCATIONAL_SKILL'
  | 'OPTIONAL';

export type MismatchClassification =
  | 'WRONG_ACADEMIC_YEAR'
  | 'WRONG_CURRICULUM_VERSION'
  | 'WRONG_TEXTBOOK'
  | 'WRONG_TEXTBOOK_CODE'
  | 'WRONG_COURSE'
  | 'WRONG_LANGUAGE_VARIANT'
  | 'MISSING_TEXTBOOK'
  | 'EXTRA_TEXTBOOK'
  | 'MISSING_PART'
  | 'EXTRA_PART'
  | 'WRONG_PART'
  | 'PART_ORDER_MISMATCH'
  | 'MISSING_CHAPTER'
  | 'EXTRA_CHAPTER'
  | 'CHAPTER_ORDER_MISMATCH'
  | 'MISSING_UNIT'
  | 'EXTRA_UNIT'
  | 'UNIT_ORDER_MISMATCH'
  | 'SECTION_MISMATCH'
  | 'PACKAGE_INCOMPLETE'
  | 'SOURCE_AMBIGUOUS'
  | 'SOURCE_UNAVAILABLE'
  | 'SOURCE_PARSE_FAILED'
  | 'SOURCE_CONFLICT'
  | 'DATA_PENDING';

export type ChangeClassification =
  | 'NO_CURRICULUM_CHANGE'
  | 'SOURCE_REFRESH_ONLY'
  | 'STRUCTURAL_CHANGE'
  | 'APPLICABILITY_CHANGE'
  | 'TEXTBOOK_REPLACEMENT'
  | 'RECALL'
  | 'CORRIGENDUM'
  | 'SOURCE_CONFLICT'
  | 'UNVERIFIABLE_CHANGE';

export type VerificationState =
  | 'VERIFIED'
  | 'DATA_PENDING'
  | 'SOURCE_AMBIGUOUS'
  | 'MISMATCH'
  | 'AFFECTED_BY_RECALL'
  | 'STALE';

export interface NcrtCurriculumApplicabilityRecord {
  id: string;
  board: 'CBSE';
  academic_year: NcrtAcademicYear;
  curriculum_version: NcrtCurriculumVersionCode;
  grade_level: number;
  grade_id: string;
  stream_id: string;
  subject_id: string;
  subject_name: string;
  course_code?: string;
  textbook_family: string;
  applicability_role: BookApplicabilityRole;
  valid_from: string;
  valid_to?: string | null;
  status: 'CURRENT' | 'SUPERSEDED' | 'RECALLED' | 'PROVISIONAL';
  evidence_references: string[];
}

export interface NcrtPartIdentity {
  part_id: string;
  part_number: number;
  part_title: string;
  official_code: string;
  source_url: string;
  part_order: number;
}

export interface NcrtStructuralNode {
  node_type: StructuralNodeType;
  node_number: number;
  official_sequence_order: number;
  title: string;
  normalized_title: string;
  part_number: number;
  official_id: string;
  description?: string;
  sub_nodes?: Array<{
    node_type: 'section';
    section_number: string;
    section_title: string;
    section_order: number;
  }>;
}

export interface ExpectedCurriculumSnapshot {
  snapshot_id: string;
  applicability: NcrtCurriculumApplicabilityRecord;
  textbook_family: string;
  total_parts: number;
  parts: NcrtPartIdentity[];
  nodes: NcrtStructuralNode[];
  retrieval_timestamp: string;
  source_fingerprint: string;
  normalized_structure_hash: string;
  verification_status: VerificationState;
  provenance: {
    primary_source_url: string;
    secondary_source_url?: string;
    extraction_method: 'DUAL_STAGE_DETERMINISTIC' | 'STATUTORY_CATALOG_SYNC';
    evidence_notes: string[];
  };
}

export interface ActualCurriculumSnapshot {
  textbook_id: string;
  grade_id: string;
  subject_id: string;
  curriculum_version_id: string;
  academic_year: string;
  parts_count: number;
  parts: Array<{
    part_number: number;
    part_title: string;
    display_order: number;
  }>;
  nodes_count: number;
  nodes: Array<{
    part_number: number;
    node_number: number;
    official_sequence_order: number;
    title: string;
  }>;
  read_timestamp: string;
}

export interface CurriculumStructuralDiff {
  classification: MismatchClassification;
  severity: 'BLOCKING' | 'WARNING';
  target_entity: 'TEXTBOOK' | 'PART' | 'NODE' | 'VERSION' | 'SOURCE';
  part_number?: number;
  node_number?: number;
  expected?: string;
  actual?: string;
  details: string;
}

export interface CurriculumComparisonReport {
  textbook_family: string;
  status: 'EXACT_MATCH' | 'MISMATCH' | 'DATA_PENDING' | 'SOURCE_AMBIGUOUS';
  academic_year_match: boolean;
  curriculum_version_match: boolean;
  parts_match: boolean;
  nodes_match: boolean;
  expected_parts_count: number;
  actual_parts_count: number;
  expected_nodes_count: number;
  actual_nodes_count: number;
  diffs: CurriculumStructuralDiff[];
  comparison_timestamp: string;
}

export interface CurriculumPackageVersion {
  package_id: string;
  version_number: number;
  is_active: boolean;
  applicability: NcrtCurriculumApplicabilityRecord;
  snapshot_hash: string;
  created_at: string;
  published_at?: string | null;
  change_reason?: string;
  audit_log: string[];
}

export interface StagingReconciliationResult {
  success: boolean;
  action_taken: 'PUBLISHED' | 'ROLLED_BACK' | 'BLOCKED_DATA_PENDING';
  candidate_version_number: number;
  initial_diff_count: number;
  final_diff_count: number;
  comparison_report: CurriculumComparisonReport;
  error_message?: string;
}

export interface RuntimeGateResult {
  gate_status: 'PAGE_READY' | 'AUTHORITATIVE_DATA_PENDING';
  target_identity: {
    grade_level: number;
    subject_id: string;
    stream_id: string;
    curriculum_version_id: string;
    academic_year: string;
  };
  textbooks_ready: number;
  textbooks_pending: number;
  diagnostics: string[];
}

export type CandidateReplacementClassification =
  | 'REPLACEMENT'
  | 'ADDITIONAL'
  | 'OPTIONAL'
  | 'SUPPLEMENTARY'
  | 'ALTERNATE_COURSE'
  | 'PROVISIONAL'
  | 'RECALLED'
  | 'UNRELATED';

export type PackageCompletenessStatus =
  | 'PACKAGE_COMPLETE'
  | 'PACKAGE_INCOMPLETE'
  | 'PENDING_EVIDENCE';

export interface CurriculumContextFingerprint {
  fingerprint: string;
  board: 'CBSE';
  academic_year: NcrtAcademicYear;
  curriculum_version: NcrtCurriculumVersionCode;
  grade_level: number;
  stream_id: string;
  subject_id: string;
  textbook_family?: string;
  part_number?: number;
}

export interface AuthoritativeCompletenessMetrics {
  configured_package_count: number;
  independently_discovered_applicable_package_count: number;
  matched_package_count: number;
  pending_package_count: number;
  missing_from_brainoro: number;
  extra_in_brainoro: number;
  status: 'AUDIT_VERIFIED' | 'AUDIT_INCOMPLETE';
}
