// =============================================================================
// Brainoro OS — Isolated CBSE Authoritative Curriculum Types
// Decoupled from legacy curriculum_concepts, old units, and old topics.
// =============================================================================

export type CbseStage = 'MIDDLE_STAGE' | 'SECONDARY_STAGE' | 'SENIOR_SECONDARY_STAGE';

export type CbseSubjectType = 'CORE' | 'ELECTIVE' | 'SKILL' | 'LANGUAGE' | 'CO_CURRICULAR';

export type CbseStreamCode = 'GENERAL' | 'SCIENCE' | 'COMMERCE' | 'HUMANITIES';

export interface CbseCurriculumVersion {
  id: string;
  version_code: string;
  display_name: string;
  academic_year: string;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  description?: string;
  created_at?: string;
}

export interface CbseGrade {
  id: string;
  grade_level: number;
  display_name: string;
  stage: CbseStage;
  display_order: number;
  created_at?: string;
}

export interface CbseStream {
  id: string;
  stream_code: CbseStreamCode;
  display_name: string;
  description?: string;
  created_at?: string;
}

export interface CbseSubject {
  id: string;
  subject_code: string;
  display_name: string;
  icon?: string;
  created_at?: string;
}

export interface CbseGradeSubject {
  id: string;
  grade_id: string;
  stream_id: string;
  subject_id: string;
  display_name: string;
  subject_type: CbseSubjectType;
  display_order: number;
  created_at?: string;
  // Joined or enriched
  subject?: CbseSubject;
  grade?: CbseGrade;
  stream?: CbseStream;
}

export interface CbseTextbook {
  id: string;
  grade_subject_id: string;
  curriculum_version_id: string;
  title: string;
  publisher: string;
  official_code?: string;
  edition: string;
  official_url?: string;
  is_primary: boolean;
  created_at?: string;
  parts?: CbseTextbookPart[];
}

export interface CbseTextbookPart {
  id: string;
  textbook_id: string;
  part_number: number;
  part_title: string;
  display_order: number;
  created_at?: string;
}

export interface CbseChapter {
  id: string;
  textbook_id: string;
  textbook_part_id?: string | null;
  chapter_number: number;
  chapter_title: string;
  official_sequence_order: number;
  description?: string;
  created_at?: string;
  sections?: CbseSection[];
  concepts?: CbseAuthoritativeConcept[];
}

export interface CbseSection {
  id: string;
  chapter_id: string;
  section_number: string;
  section_title: string;
  section_order: number;
  source_page?: string;
  source_url?: string;
  created_at?: string;
}

export interface CbseAuthoritativeConcept {
  id: string;
  chapter_id: string;
  concept_code: string;
  official_title: string;
  pedagogical_description?: string;
  learning_outcomes?: string[];
  display_order: number;
  created_at?: string;
}

export interface CbseConceptSectionMapping {
  id: string;
  concept_id: string;
  section_id: string;
  relationship_type: 'PRIMARY' | 'SUPPORTING' | 'PREREQUISITE';
  display_order: number;
  created_at?: string;
}

/**
 * Resolved context for the active learning path on the isolated CBSE page.
 */
export interface CbseCurriculumContext {
  isAuthoritative: true;
  grade: CbseGrade;
  stream?: CbseStream;
  gradeSubject: CbseGradeSubject;
  textbook: CbseTextbook;
  part?: CbseTextbookPart;
  allChapters: CbseChapter[];
  selectedChapter: CbseChapter;
  sections: CbseSection[];
  activeSection?: CbseSection;
  concepts: CbseAuthoritativeConcept[];
  activeConcept?: CbseAuthoritativeConcept;
  conceptSectionMappings: CbseConceptSectionMapping[];
  mappingState: 'VERIFIED' | 'PENDING_REVIEW' | 'UNMAPPED';
}
