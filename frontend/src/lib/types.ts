export type BoardId = 'CBSE' | 'CAMBRIDGE' | 'IB_MYP';

export interface BoardRegistry {
  id: BoardId;
  displayName: string;
  defaultGradingSystem: 'PERCENTAGE' | 'CRITERIA_1_7' | 'LETTER_GRADE';
  description: string;
  badgeColor: string;
}

export interface SubjectRegistry {
  id: string;
  displayName: string;
  icon: string;
}

export interface CurriculumConcept {
  id: string;
  boardId: BoardId;
  subjectId: string;
  gradeLevel: number;
  unit?: string;
  title: string;
  coreLogicEssence: string;
  parentNodeId: string | null;
  prerequisites?: string[];
  metadata?: Record<string, any>;
}

export interface CornellNotes {
  conceptId: string;
  gradeLevel?: number;
  gradeTier?: 'MIDDLE_SCHOOL' | 'SECONDARY';
  payloadFingerprint?: string;
  title: string;
  cueQuestions: string[];
  mainNotes: string;
  summary: string;
  coreAnalogy: string;
  structuralRule: string;
  curriculumTrap: string;
  verificationProblem: string;
  diagramType?:
    | 'triangle'
    | 'linear_graph'
    | 'number_line'
    | 'real_continuum'
    | 'coordinate_grid'
    | 'parabola'
    | 'circle_geometry'
    | 'probability_curve'
    | 'physics_vector'
    | 'ray_optics'
    | 'motion_graph'
    | 'circuit_diagram'
    | 'wave_frequency'
    | 'energy_transfer'
    | 'bohr_atom'
    | 'chemical_bonding'
    | 'states_of_matter'
    | 'reaction_energy'
    | 'ph_scale'
    | 'periodic_trends'
    | 'cell_structure'
    | 'dna_helix'
    | 'trophic_pyramid'
    | 'photosynthesis_cycle'
    | 'neuron_synapse'
    | 'taxonomy_tree'
    | string;
  workedExample?: {
    problem: string;
    steps: string[];
    result: string;
  };
  realWorldUse?: string;
  practiceQuiz?: {
    question: string;
    options: string[];
    answerIndex: number;
    explanation: string;
  }[];
}

export interface MemoryCard {
  id: string;
  conceptId: string;
  title: string;
  prompt: string;
  answer: string;
  intervalDays: number;
  repetitionCount: number;
  easeFactor: number;
  retentionStability: number;
  isHardToMemorize: boolean;
  box: 1 | 2 | 3 | 4 | 5;
  nextReviewDate: string;
  retentionProbability: number;
}

export interface AssessmentItem {
  id: string;
  conceptId: string;
  boardType: BoardId;
  prompt: string;
  sampleSolution: string;
  difficultyB: number; // [-3.0, +3.0]
  discriminationA: number;
  guessingC: number;
  questionType?: 'OBJECTIVE' | 'SUBJECTIVE';
  options?: string[];
  correctOptionIndex?: number;
  explanation?: string;
  sourceTag?: string; // e.g. 'CBSE Board Exam PYQ', 'NCERT Exemplar Standard', 'Competency Standard'
  rubricGuide?: string[];
  commandWord?: string; // Cambridge
  rubricCriteria?: {
    [key: string]: {
      title: string;
      maxScore: number;
    };
  }; // IB MYP
  proceduralSteps?: {
    step: number;
    instruction: string;
    expected: string;
  }[]; // CBSE
}

export interface RemediationTarget {
  conceptId: string;
  title: string;
  coreLogicEssence: string;
  distanceFromFailedNode: number;
  dependencyWeight: number;
  actionItem: string;
}

export interface ParentMetrics {
  userId: string;
  cognitiveAccelerationIndex: number;
  retentionStabilityDays: number;
  memoryHalfLifeDays: number;
  activeRetrievalVelocityWeekly: number;
  longTermRetentionRatePct: number;
  activeMasteryQueues: {
    box1Daily: number;
    box2Every3d: number;
    box3Weekly: number;
    box4Biweekly: number;
    box5Mastered: number;
  };
  ebbinghausDecayForecast: {
    day: number;
    retentionPercentage: number;
  }[];
}

export interface AuthoritativeCurriculumConcept {
  id: string;
  curriculum_version_id: string;
  board_id: BoardId;
  grade_level: number;
  subject_id: string;
  textbook_id?: string | null;
  chapter_id?: string | null;
  section_id?: string | null;
  official_concept_code?: string | null;
  official_title: string;
  statutory_title?: string | null;
  normalized_title?: string | null;
  official_description?: string | null;
  source_id: string;
  source_document_id?: string | null;
  source_url?: string | null;
  source_page?: string | null;
  verification_status: 'VERIFIED' | 'PENDING_REVIEW' | 'UNVERIFIED';
  evidence: string;
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export interface Textbook {
  id: string;
  board_id: string;
  grade_level: number;
  subject_id: string;
  curriculum_version_id: string;
  source_id: string;
  title: string;
  publisher: string;
  edition_or_version: string;
  official_url?: string | null;
  isbn_or_code?: string | null;
  verification_status: 'VERIFIED' | 'PENDING_REVIEW' | 'DEPRECATED';
  created_at?: string;
}

export interface TextbookChapter {
  id: string;
  textbook_id: string;
  chapter_number: number;
  chapter_title: string;
  part_number?: number;
  part_title?: string;
  package_code?: string;
  global_chapter_no?: number;
  sequence_order?: number;
  page_range?: string | null;
  created_at?: string;
}

export interface AuthoritativeTextbookPart {
  part_number: number;
  part_title: string;
  package_code: string;
  textbook_title: string;
  official_code: string;
  official_url: string;
  total_chapters: number;
  chapters: Array<{
    id: string;
    chapter_no: number;
    global_chapter_no?: number;
    chapter_title: string;
    part_number: number;
    part_title: string;
    package_code: string;
    is_authoritative: boolean;
  }>;
}

export interface TextbookSection {
  id: string;
  chapter_id: string;
  section_number: string;
  section_title: string;
  section_type: 'AUTHENTIC' | 'LEGACY_SYNTHETIC';
  textbook_id?: string | null;
  source_document_id?: string | null;
  source_url?: string | null;
  source_page?: string | null;
  source_locator?: string | null;
  evidence_excerpt?: string | null;
  created_at?: string;
}

export interface AuthoritativeConceptSection {
  id: string;
  authoritative_concept_id: string;
  section_id: string;
  relationship_type: 'PRIMARY' | 'SUPPORTING' | 'PREREQUISITE' | 'APPLICATION';
  mapping_basis: 'SOURCE_EXPLICIT' | 'PEDAGOGICAL_SYNTHESIS' | 'PREREQUISITE_ALIGNMENT';
  evidence: string;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export type AuthoritativeLearningContextState =
  | 'LOADING'
  | 'RESOLVED'
  | 'PENDING_REVIEW'
  | 'UNMAPPED'
  | 'ERROR';

export interface ResolvedAuthoritativeLearningContext {
  state: 'RESOLVED';
  boardId: BoardId;
  gradeLevel: number;
  subjectId: string;
  curriculumVersionId: string;
  textbookId: string;
  textbookTitle?: string;
  chapterId: string;
  chapterNumber?: number;
  chapterTitle?: string;
  sectionId: string;
  sectionNumber?: string;
  sectionTitle?: string;
  sourcePage?: string | null;
  sourceLocator?: string | null;
  authoritativeConceptId: string;
  authoritativeConceptTitle?: string;
  brainoroConceptId: string;
  mappingState: 'VERIFIED';
  evidence?: string;
}

export interface UnresolvedAuthoritativeLearningContext {
  state: 'LOADING' | 'PENDING_REVIEW' | 'UNMAPPED' | 'ERROR' | 'DATA_PENDING' | 'SOURCE_AMBIGUOUS';
  boardId: BoardId;
  gradeLevel: number;
  subjectId: string;
  curriculumVersionId?: string;
  textbookId?: string;
  chapterId?: string;
  sectionId?: string;
  authoritativeConceptId?: string;
  brainoroConceptId?: string;
  mappingState?: 'PENDING_REVIEW' | 'UNMAPPED' | 'ERROR' | 'DATA_PENDING' | 'SOURCE_AMBIGUOUS';
  error?: string;
  reason?: string;
}

export type AuthoritativeLearningContext =
  | ResolvedAuthoritativeLearningContext
  | UnresolvedAuthoritativeLearningContext;

export interface CurriculumResolutionResult {
  isAuthoritative: boolean;
  state: 'VERIFIED' | 'PENDING_REVIEW' | 'UNMAPPED' | 'EMPTY' | 'ERROR' | 'DATA_PENDING' | 'SOURCE_AMBIGUOUS';
  textbook?: Textbook;
  chapter?: TextbookChapter;
  allChapters?: TextbookChapter[];
  parts?: AuthoritativeTextbookPart[];
  activePartNumber?: number;
  sections: TextbookSection[];
  concepts: AuthoritativeCurriculumConcept[];
  conceptSections: AuthoritativeConceptSection[];
  activeSection?: TextbookSection;
  activeConcept?: AuthoritativeCurriculumConcept;
  learningContext?: AuthoritativeLearningContext;
  error?: string;
}

export interface AuthoritativeToBrainoroMapping {
  brainoroConceptId: string;
  mappingState: 'VERIFIED' | 'PENDING_REVIEW' | 'UNMAPPED';
  evidence: string;
  scope?: {
    boardId?: BoardId;
    gradeLevel?: number;
    subjectId?: string;
    curriculumVersionId?: string;
    textbookId?: string;
    chapterId?: string;
    validSectionIds?: string[];
  };
}

export type {
  MappingState,
  StudentRevisionMode,
  CurriculumSource,
  ConceptProvenanceMetadata,
} from './curriculumProvenance';
export { getConceptProvenance } from './curriculumProvenance';

