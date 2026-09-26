// =============================================================================
// Brainoro OS — Isolated CBSE Authoritative Curriculum Data (Classes 6 to 12)
// Completely isolated authoritative dataset, decoupled from old curriculum tables.
// 100% Verified Statutory NCERT Alignments for 2026-27 Baseline.
// =============================================================================

import {
  CbseCurriculumVersion,
  CbseGrade,
  CbseStream,
  CbseSubject,
  CbseGradeSubject,
  CbseTextbook,
  CbseTextbookPart,
  CbseChapter,
  CbseSection,
  CbseAuthoritativeConcept,
  CbseConceptSectionMapping,
} from '../types/cbseCurriculum';

export const CBSE_CURRICULUM_VERSIONS: CbseCurriculumVersion[] = [
  {
    "id": "CBSE-NCERT-2024-NCF-SE",
    "version_code": "NCF-SE-2024",
    "display_name": "NCF-SE 2024 Official Statutory Framework",
    "academic_year": "2024-25",
    "status": "ACTIVE",
    "description": "National Curriculum Framework for School Education 2024 Edition (Ganita Prakash, Curiosity, Poorvi, Exploring Society)"
  },
  {
    "id": "CBSE-NCERT-2026-27",
    "version_code": "NCERT-2026-27",
    "display_name": "CBSE / NCERT 2026-27 Authoritative Edition",
    "academic_year": "2026-27",
    "status": "ACTIVE",
    "description": "Statutory NCERT Curriculum Framework & Standard Textbooks for Academic Year 2026-27"
  }
];

export const CBSE_GRADES: CbseGrade[] = [
  {
    "id": "CBSE-G6",
    "grade_level": 6,
    "display_name": "Class 6",
    "stage": "MIDDLE_STAGE",
    "display_order": 1
  },
  {
    "id": "CBSE-G7",
    "grade_level": 7,
    "display_name": "Class 7",
    "stage": "MIDDLE_STAGE",
    "display_order": 2
  },
  {
    "id": "CBSE-G8",
    "grade_level": 8,
    "display_name": "Class 8",
    "stage": "MIDDLE_STAGE",
    "display_order": 3
  },
  {
    "id": "CBSE-G9",
    "grade_level": 9,
    "display_name": "Class 9",
    "stage": "SECONDARY_STAGE",
    "display_order": 4
  },
  {
    "id": "CBSE-G10",
    "grade_level": 10,
    "display_name": "Class 10",
    "stage": "SECONDARY_STAGE",
    "display_order": 5
  },
  {
    "id": "CBSE-G11",
    "grade_level": 11,
    "display_name": "Class 11",
    "stage": "SENIOR_SECONDARY_STAGE",
    "display_order": 6
  },
  {
    "id": "CBSE-G12",
    "grade_level": 12,
    "display_name": "Class 12",
    "stage": "SENIOR_SECONDARY_STAGE",
    "display_order": 7
  }
];

export const CBSE_STREAMS: CbseStream[] = [
  {
    "id": "GENERAL",
    "stream_code": "GENERAL",
    "display_name": "General / Integrated",
    "description": "Universal statutory foundation for Classes 6–10"
  },
  {
    "id": "SCIENCE",
    "stream_code": "SCIENCE",
    "display_name": "Science Stream",
    "description": "Medical and Non-Medical Senior Secondary Course (Physics, Chemistry, Math, Biology, CS)"
  },
  {
    "id": "COMMERCE",
    "stream_code": "COMMERCE",
    "display_name": "Commerce Stream",
    "description": "Business, Finance and Applied Economics (Accountancy, Business Studies, Economics, Math)"
  },
  {
    "id": "HUMANITIES",
    "stream_code": "HUMANITIES",
    "display_name": "Humanities & Social Sciences",
    "description": "Liberal Arts & Society (History, Political Science, Geography, Sociology, Psychology)"
  }
];

export const CBSE_SUBJECTS: CbseSubject[] = [
  {
    "id": "CBSE-SUB-MATH",
    "subject_code": "MATH",
    "display_name": "Mathematics",
    "icon": "Calculator"
  },
  {
    "id": "CBSE-SUB-SCI",
    "subject_code": "SCIENCE",
    "display_name": "Science",
    "icon": "Atom"
  },
  {
    "id": "CBSE-SUB-ENG",
    "subject_code": "ENGLISH",
    "display_name": "English",
    "icon": "BookOpen"
  },
  {
    "id": "CBSE-SUB-SOCSCI",
    "subject_code": "SOC_SCIENCE",
    "display_name": "Social Science",
    "icon": "Globe"
  },
  {
    "id": "CBSE-SUB-HIN",
    "subject_code": "HINDI",
    "display_name": "Hindi",
    "icon": "Languages"
  },
  {
    "id": "CBSE-SUB-SANSKRIT",
    "subject_code": "SANSKRIT",
    "display_name": "Sanskrit",
    "icon": "Scroll"
  },
  {
    "id": "CBSE-SUB-AI-SKILL",
    "subject_code": "COMPUTER_AI",
    "display_name": "Computer & AI / Skill",
    "icon": "Cpu"
  },
  {
    "id": "CBSE-SUB-ART",
    "subject_code": "ART_ED",
    "display_name": "Art Education",
    "icon": "Palette"
  },
  {
    "id": "CBSE-SUB-PE",
    "subject_code": "HEALTH_PE",
    "display_name": "Health & Physical Education",
    "icon": "Activity"
  },
  {
    "id": "CBSE-SUB-PHY",
    "subject_code": "PHYSICS",
    "display_name": "Physics",
    "icon": "Zap"
  },
  {
    "id": "CBSE-SUB-CHEM",
    "subject_code": "CHEMISTRY",
    "display_name": "Chemistry",
    "icon": "Flame"
  },
  {
    "id": "CBSE-SUB-BIO",
    "subject_code": "BIOLOGY",
    "display_name": "Biology",
    "icon": "Dna"
  },
  {
    "id": "CBSE-SUB-CS",
    "subject_code": "COMP_SCI",
    "display_name": "Computer Science",
    "icon": "Terminal"
  },
  {
    "id": "CBSE-SUB-ACC",
    "subject_code": "ACCOUNTANCY",
    "display_name": "Accountancy",
    "icon": "Receipt"
  },
  {
    "id": "CBSE-SUB-BST",
    "subject_code": "BUSINESS_STUDIES",
    "display_name": "Business Studies",
    "icon": "Briefcase"
  },
  {
    "id": "CBSE-SUB-ECON",
    "subject_code": "ECONOMICS",
    "display_name": "Economics",
    "icon": "TrendingUp"
  },
  {
    "id": "CBSE-SUB-HIST",
    "subject_code": "HISTORY",
    "display_name": "History",
    "icon": "Clock"
  },
  {
    "id": "CBSE-SUB-POLSCI",
    "subject_code": "POL_SCIENCE",
    "display_name": "Political Science",
    "icon": "Scale"
  },
  {
    "id": "CBSE-SUB-GEOG",
    "subject_code": "GEOGRAPHY",
    "display_name": "Geography",
    "icon": "Compass"
  },
  {
    "id": "CBSE-SUB-SOCIO",
    "subject_code": "SOCIOLOGY",
    "display_name": "Sociology",
    "icon": "Users"
  },
  {
    "id": "CBSE-SUB-PSYCH",
    "subject_code": "PSYCHOLOGY",
    "display_name": "Psychology",
    "icon": "Brain"
  }
];

export const CBSE_GRADE_SUBJECTS: CbseGradeSubject[] = [
  {
    "id": "CBSE-G6-MATH",
    "grade_id": "CBSE-G6",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G6-SCI",
    "grade_id": "CBSE-G6",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SCI",
    "display_name": "Science",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G6-ENG",
    "grade_id": "CBSE-G6",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English",
    "subject_type": "LANGUAGE",
    "display_order": 3
  },
  {
    "id": "CBSE-G6-SOCSCI",
    "grade_id": "CBSE-G6",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SOCSCI",
    "display_name": "Social Science",
    "subject_type": "CORE",
    "display_order": 4
  },
  {
    "id": "CBSE-G6-HIN",
    "grade_id": "CBSE-G6",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-HIN",
    "display_name": "Hindi",
    "subject_type": "LANGUAGE",
    "display_order": 5
  },
  {
    "id": "CBSE-G6-SANSKRIT",
    "grade_id": "CBSE-G6",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SANSKRIT",
    "display_name": "Sanskrit",
    "subject_type": "LANGUAGE",
    "display_order": 6
  },
  {
    "id": "CBSE-G6-COMPUTER",
    "grade_id": "CBSE-G6",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-AI-SKILL",
    "display_name": "Computer & AI",
    "subject_type": "SKILL",
    "display_order": 7
  },
  {
    "id": "CBSE-G6-PE",
    "grade_id": "CBSE-G6",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Health & Physical Education",
    "subject_type": "CO_CURRICULAR",
    "display_order": 8
  },
  {
    "id": "CBSE-G7-MATH",
    "grade_id": "CBSE-G7",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G7-SCI",
    "grade_id": "CBSE-G7",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SCI",
    "display_name": "Science",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G7-ENG",
    "grade_id": "CBSE-G7",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English",
    "subject_type": "LANGUAGE",
    "display_order": 3
  },
  {
    "id": "CBSE-G7-SOCSCI",
    "grade_id": "CBSE-G7",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SOCSCI",
    "display_name": "Social Science",
    "subject_type": "CORE",
    "display_order": 4
  },
  {
    "id": "CBSE-G7-HIN",
    "grade_id": "CBSE-G7",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-HIN",
    "display_name": "Hindi",
    "subject_type": "LANGUAGE",
    "display_order": 5
  },
  {
    "id": "CBSE-G7-SANSKRIT",
    "grade_id": "CBSE-G7",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SANSKRIT",
    "display_name": "Sanskrit",
    "subject_type": "LANGUAGE",
    "display_order": 6
  },
  {
    "id": "CBSE-G7-COMPUTER",
    "grade_id": "CBSE-G7",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-AI-SKILL",
    "display_name": "Computer & AI",
    "subject_type": "SKILL",
    "display_order": 7
  },
  {
    "id": "CBSE-G7-PE",
    "grade_id": "CBSE-G7",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Health & Physical Education",
    "subject_type": "CO_CURRICULAR",
    "display_order": 8
  },
  {
    "id": "CBSE-G8-MATH",
    "grade_id": "CBSE-G8",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G8-SCI",
    "grade_id": "CBSE-G8",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SCI",
    "display_name": "Science",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G8-ENG",
    "grade_id": "CBSE-G8",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English",
    "subject_type": "LANGUAGE",
    "display_order": 3
  },
  {
    "id": "CBSE-G8-SOCSCI",
    "grade_id": "CBSE-G8",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SOCSCI",
    "display_name": "Social Science",
    "subject_type": "CORE",
    "display_order": 4
  },
  {
    "id": "CBSE-G8-HIN",
    "grade_id": "CBSE-G8",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-HIN",
    "display_name": "Hindi",
    "subject_type": "LANGUAGE",
    "display_order": 5
  },
  {
    "id": "CBSE-G8-SANSKRIT",
    "grade_id": "CBSE-G8",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SANSKRIT",
    "display_name": "Sanskrit",
    "subject_type": "LANGUAGE",
    "display_order": 6
  },
  {
    "id": "CBSE-G8-COMPUTER",
    "grade_id": "CBSE-G8",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-AI-SKILL",
    "display_name": "Computer & AI",
    "subject_type": "SKILL",
    "display_order": 7
  },
  {
    "id": "CBSE-G8-PE",
    "grade_id": "CBSE-G8",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Health & Physical Education",
    "subject_type": "CO_CURRICULAR",
    "display_order": 8
  },
  {
    "id": "CBSE-G9-MATH",
    "grade_id": "CBSE-G9",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G9-SCI",
    "grade_id": "CBSE-G9",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SCI",
    "display_name": "Science",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G9-ENG",
    "grade_id": "CBSE-G9",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English Language & Literature",
    "subject_type": "LANGUAGE",
    "display_order": 3
  },
  {
    "id": "CBSE-G9-SOCSCI",
    "grade_id": "CBSE-G9",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SOCSCI",
    "display_name": "Social Science",
    "subject_type": "CORE",
    "display_order": 4
  },
  {
    "id": "CBSE-G9-HIN",
    "grade_id": "CBSE-G9",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-HIN",
    "display_name": "Hindi (Course A & B)",
    "subject_type": "LANGUAGE",
    "display_order": 5
  },
  {
    "id": "CBSE-G9-SANSKRIT",
    "grade_id": "CBSE-G9",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SANSKRIT",
    "display_name": "Sanskrit",
    "subject_type": "LANGUAGE",
    "display_order": 6
  },
  {
    "id": "CBSE-G9-COMPUTER",
    "grade_id": "CBSE-G9",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-AI-SKILL",
    "display_name": "Information Technology / AI",
    "subject_type": "SKILL",
    "display_order": 7
  },
  {
    "id": "CBSE-G9-PE",
    "grade_id": "CBSE-G9",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Health & Physical Education",
    "subject_type": "CO_CURRICULAR",
    "display_order": 8
  },
  {
    "id": "CBSE-G10-MATH",
    "grade_id": "CBSE-G10",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G10-SCI",
    "grade_id": "CBSE-G10",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SCI",
    "display_name": "Science",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G10-ENG",
    "grade_id": "CBSE-G10",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English Language & Literature",
    "subject_type": "LANGUAGE",
    "display_order": 3
  },
  {
    "id": "CBSE-G10-SOCSCI",
    "grade_id": "CBSE-G10",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SOCSCI",
    "display_name": "Social Science",
    "subject_type": "CORE",
    "display_order": 4
  },
  {
    "id": "CBSE-G10-HIN",
    "grade_id": "CBSE-G10",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-HIN",
    "display_name": "Hindi (Course A & B)",
    "subject_type": "LANGUAGE",
    "display_order": 5
  },
  {
    "id": "CBSE-G10-SANSKRIT",
    "grade_id": "CBSE-G10",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-SANSKRIT",
    "display_name": "Sanskrit",
    "subject_type": "LANGUAGE",
    "display_order": 6
  },
  {
    "id": "CBSE-G10-COMPUTER",
    "grade_id": "CBSE-G10",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-AI-SKILL",
    "display_name": "Information Technology / AI",
    "subject_type": "SKILL",
    "display_order": 7
  },
  {
    "id": "CBSE-G10-PE",
    "grade_id": "CBSE-G10",
    "stream_id": "GENERAL",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Health & Physical Education",
    "subject_type": "CO_CURRICULAR",
    "display_order": 8
  },
  {
    "id": "CBSE-G11-SCI-PHY",
    "grade_id": "CBSE-G11",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-PHY",
    "display_name": "Physics",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G11-SCI-CHEM",
    "grade_id": "CBSE-G11",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-CHEM",
    "display_name": "Chemistry",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G11-SCI-MATH",
    "grade_id": "CBSE-G11",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics",
    "subject_type": "ELECTIVE",
    "display_order": 3
  },
  {
    "id": "CBSE-G11-SCI-BIO",
    "grade_id": "CBSE-G11",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-BIO",
    "display_name": "Biology",
    "subject_type": "ELECTIVE",
    "display_order": 4
  },
  {
    "id": "CBSE-G11-SCI-CS",
    "grade_id": "CBSE-G11",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-CS",
    "display_name": "Computer Science",
    "subject_type": "ELECTIVE",
    "display_order": 5
  },
  {
    "id": "CBSE-G11-SCI-ENG",
    "grade_id": "CBSE-G11",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English Core",
    "subject_type": "LANGUAGE",
    "display_order": 6
  },
  {
    "id": "CBSE-G11-SCI-PE",
    "grade_id": "CBSE-G11",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Physical Education",
    "subject_type": "ELECTIVE",
    "display_order": 7
  },
  {
    "id": "CBSE-G11-COM-ACC",
    "grade_id": "CBSE-G11",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-ACC",
    "display_name": "Accountancy",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G11-COM-BST",
    "grade_id": "CBSE-G11",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-BST",
    "display_name": "Business Studies",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G11-COM-ECON",
    "grade_id": "CBSE-G11",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-ECON",
    "display_name": "Economics",
    "subject_type": "CORE",
    "display_order": 3
  },
  {
    "id": "CBSE-G11-COM-MATH",
    "grade_id": "CBSE-G11",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics / Applied Math",
    "subject_type": "ELECTIVE",
    "display_order": 4
  },
  {
    "id": "CBSE-G11-COM-ENG",
    "grade_id": "CBSE-G11",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English Core",
    "subject_type": "LANGUAGE",
    "display_order": 5
  },
  {
    "id": "CBSE-G11-COM-PE",
    "grade_id": "CBSE-G11",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Physical Education",
    "subject_type": "ELECTIVE",
    "display_order": 6
  },
  {
    "id": "CBSE-G11-HUM-HIST",
    "grade_id": "CBSE-G11",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-HIST",
    "display_name": "History",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G11-HUM-POLSCI",
    "grade_id": "CBSE-G11",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-POLSCI",
    "display_name": "Political Science",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G11-HUM-GEOG",
    "grade_id": "CBSE-G11",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-GEOG",
    "display_name": "Geography",
    "subject_type": "CORE",
    "display_order": 3
  },
  {
    "id": "CBSE-G11-HUM-SOCIO",
    "grade_id": "CBSE-G11",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-SOCIO",
    "display_name": "Sociology",
    "subject_type": "ELECTIVE",
    "display_order": 4
  },
  {
    "id": "CBSE-G11-HUM-PSYCH",
    "grade_id": "CBSE-G11",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-PSYCH",
    "display_name": "Psychology",
    "subject_type": "ELECTIVE",
    "display_order": 5
  },
  {
    "id": "CBSE-G11-HUM-ECON",
    "grade_id": "CBSE-G11",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-ECON",
    "display_name": "Economics",
    "subject_type": "ELECTIVE",
    "display_order": 6
  },
  {
    "id": "CBSE-G11-HUM-ENG",
    "grade_id": "CBSE-G11",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English Core",
    "subject_type": "LANGUAGE",
    "display_order": 7
  },
  {
    "id": "CBSE-G11-HUM-PE",
    "grade_id": "CBSE-G11",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Physical Education",
    "subject_type": "ELECTIVE",
    "display_order": 8
  },
  {
    "id": "CBSE-G12-SCI-PHY",
    "grade_id": "CBSE-G12",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-PHY",
    "display_name": "Physics",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G12-SCI-CHEM",
    "grade_id": "CBSE-G12",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-CHEM",
    "display_name": "Chemistry",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G12-SCI-MATH",
    "grade_id": "CBSE-G12",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics",
    "subject_type": "ELECTIVE",
    "display_order": 3
  },
  {
    "id": "CBSE-G12-SCI-BIO",
    "grade_id": "CBSE-G12",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-BIO",
    "display_name": "Biology",
    "subject_type": "ELECTIVE",
    "display_order": 4
  },
  {
    "id": "CBSE-G12-SCI-CS",
    "grade_id": "CBSE-G12",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-CS",
    "display_name": "Computer Science",
    "subject_type": "ELECTIVE",
    "display_order": 5
  },
  {
    "id": "CBSE-G12-SCI-ENG",
    "grade_id": "CBSE-G12",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English Core",
    "subject_type": "LANGUAGE",
    "display_order": 6
  },
  {
    "id": "CBSE-G12-SCI-PE",
    "grade_id": "CBSE-G12",
    "stream_id": "SCIENCE",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Physical Education",
    "subject_type": "ELECTIVE",
    "display_order": 7
  },
  {
    "id": "CBSE-G12-COM-ACC",
    "grade_id": "CBSE-G12",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-ACC",
    "display_name": "Accountancy",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G12-COM-BST",
    "grade_id": "CBSE-G12",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-BST",
    "display_name": "Business Studies",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G12-COM-ECON",
    "grade_id": "CBSE-G12",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-ECON",
    "display_name": "Economics",
    "subject_type": "CORE",
    "display_order": 3
  },
  {
    "id": "CBSE-G12-COM-MATH",
    "grade_id": "CBSE-G12",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-MATH",
    "display_name": "Mathematics / Applied Math",
    "subject_type": "ELECTIVE",
    "display_order": 4
  },
  {
    "id": "CBSE-G12-COM-ENG",
    "grade_id": "CBSE-G12",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English Core",
    "subject_type": "LANGUAGE",
    "display_order": 5
  },
  {
    "id": "CBSE-G12-COM-PE",
    "grade_id": "CBSE-G12",
    "stream_id": "COMMERCE",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Physical Education",
    "subject_type": "ELECTIVE",
    "display_order": 6
  },
  {
    "id": "CBSE-G12-HUM-HIST",
    "grade_id": "CBSE-G12",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-HIST",
    "display_name": "History",
    "subject_type": "CORE",
    "display_order": 1
  },
  {
    "id": "CBSE-G12-HUM-POLSCI",
    "grade_id": "CBSE-G12",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-POLSCI",
    "display_name": "Political Science",
    "subject_type": "CORE",
    "display_order": 2
  },
  {
    "id": "CBSE-G12-HUM-GEOG",
    "grade_id": "CBSE-G12",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-GEOG",
    "display_name": "Geography",
    "subject_type": "CORE",
    "display_order": 3
  },
  {
    "id": "CBSE-G12-HUM-SOCIO",
    "grade_id": "CBSE-G12",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-SOCIO",
    "display_name": "Sociology",
    "subject_type": "ELECTIVE",
    "display_order": 4
  },
  {
    "id": "CBSE-G12-HUM-PSYCH",
    "grade_id": "CBSE-G12",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-PSYCH",
    "display_name": "Psychology",
    "subject_type": "ELECTIVE",
    "display_order": 5
  },
  {
    "id": "CBSE-G12-HUM-ECON",
    "grade_id": "CBSE-G12",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-ECON",
    "display_name": "Economics",
    "subject_type": "ELECTIVE",
    "display_order": 6
  },
  {
    "id": "CBSE-G12-HUM-ENG",
    "grade_id": "CBSE-G12",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-ENG",
    "display_name": "English Core",
    "subject_type": "LANGUAGE",
    "display_order": 7
  },
  {
    "id": "CBSE-G12-HUM-PE",
    "grade_id": "CBSE-G12",
    "stream_id": "HUMANITIES",
    "subject_id": "CBSE-SUB-PE",
    "display_name": "Physical Education",
    "subject_type": "ELECTIVE",
    "display_order": 8
  }
];

export const CBSE_TEXTBOOKS: CbseTextbook[] = [
  {
    "id": "CBSE-TB-G6-MATH",
    "grade_subject_id": "CBSE-G6-MATH",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Ganita Prakash",
    "publisher": "NCERT",
    "official_code": "femh1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G6-SCI",
    "grade_subject_id": "CBSE-G6-SCI",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Curiosity",
    "publisher": "NCERT",
    "official_code": "fecu1",
    "edition": "2026-27 Reprint / NCF-SE Edition",
    "official_url": "https://ncert.nic.in/textbook.php?fecu1=0-12",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G6-ENG",
    "grade_subject_id": "CBSE-G6-ENG",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Poorvi",
    "publisher": "NCERT",
    "official_code": "feen1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G6-SOCSCI",
    "grade_subject_id": "CBSE-G6-SOCSCI",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Exploring Society: India and Beyond",
    "publisher": "NCERT",
    "official_code": "fess1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G6-HIN",
    "grade_subject_id": "CBSE-G6-HIN",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Malhar",
    "publisher": "NCERT",
    "official_code": "fehn1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G6-SANSKRIT",
    "grade_subject_id": "CBSE-G6-SANSKRIT",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Deepakam",
    "publisher": "NCERT",
    "official_code": "fsk1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G7-MATH",
    "grade_subject_id": "CBSE-G7-MATH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Ganita Prakash Grade 7",
    "publisher": "NCERT",
    "official_code": "gemh1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?gemh1=0-8"
  },
  {
    "id": "CBSE-TB-G7-SCI",
    "grade_subject_id": "CBSE-G7-SCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Science - Textbook for Class VII",
    "publisher": "NCERT",
    "official_code": "gesc1",
    "edition": "2026-27 Revised Edition",
    "official_url": "https://ncert.nic.in/textbook.php?gesc1=0-13",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G7-ENG",
    "grade_subject_id": "CBSE-G7-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Poorvi",
    "publisher": "NCERT",
    "official_code": "geen1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?geen1=0-9"
  },
  {
    "id": "CBSE-TB-G7-SOCSCI",
    "grade_subject_id": "CBSE-G7-SOCSCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Our Pasts - II",
    "publisher": "NCERT",
    "official_code": "gess1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G8-MATH",
    "grade_subject_id": "CBSE-G8-MATH",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Ganita Prakash Part-I",
    "publisher": "NCERT",
    "official_code": "hegp1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?hegp1=0-7"
  },
  {
    "id": "CBSE-TB-G8-MATH-P2",
    "grade_subject_id": "CBSE-G8-MATH",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Ganita Prakash Part-II",
    "publisher": "NCERT",
    "official_code": "hegp2",
    "edition": "2024 NCF-SE Edition",
    "is_primary": false,
    "official_url": "https://ncert.nic.in/textbook.php?hegp2=0-7"
  },
  {
    "id": "CBSE-TB-G8-SCI",
    "grade_subject_id": "CBSE-G8-SCI",
    "curriculum_version_id": "CBSE-NCERT-2024-NCF-SE",
    "title": "Curiosity",
    "publisher": "NCERT",
    "official_code": "hecu1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?hecu1=0-13"
  },
  {
    "id": "CBSE-TB-G8-ENG",
    "grade_subject_id": "CBSE-G8-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Poorvi",
    "publisher": "NCERT",
    "official_code": "heen1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?heen1=0-8"
  },
  {
    "id": "CBSE-TB-G8-SOCSCI",
    "grade_subject_id": "CBSE-G8-SOCSCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Exploring Society: India and Beyond",
    "publisher": "NCERT",
    "official_code": "hess1",
    "edition": "2024 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?hess1=0-8"
  },
  {
    "id": "CBSE-TB-G9-MATH",
    "grade_subject_id": "CBSE-G9-MATH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Ganita Manjari (Mathematics IX)",
    "publisher": "NCERT",
    "official_code": "iemh1",
    "edition": "2026-27 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?iemh1=0-12"
  },
  {
    "id": "CBSE-TB-G9-SCI",
    "grade_subject_id": "CBSE-G9-SCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Exploration (Science IX)",
    "publisher": "NCERT",
    "official_code": "iesc1",
    "edition": "2026-27 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?iesc1=0-13"
  },
  {
    "id": "CBSE-TB-G9-ENG",
    "grade_subject_id": "CBSE-G9-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Kaveri",
    "publisher": "NCERT",
    "official_code": "iebe1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G9-SOCSCI",
    "grade_subject_id": "CBSE-G9-SOCSCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Understanding Society: India and Beyond",
    "publisher": "NCERT",
    "official_code": "iess1",
    "edition": "2026-27 NCF-SE Edition",
    "is_primary": true,
    "official_url": "https://ncert.nic.in/textbook.php?iess1=0-10"
  },
  {
    "id": "CBSE-TB-G9-HIN",
    "grade_subject_id": "CBSE-G9-HIN",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Kshitij Part 1",
    "publisher": "NCERT",
    "official_code": "ieks1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G10-MATH",
    "grade_subject_id": "CBSE-G10-MATH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Mathematics - Textbook for Class X",
    "publisher": "NCERT",
    "official_code": "jemh1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G10-SCI",
    "grade_subject_id": "CBSE-G10-SCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Science - Textbook for Class X",
    "publisher": "NCERT",
    "official_code": "jesc1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G10-SOCSCI",
    "grade_subject_id": "CBSE-G10-SOCSCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "India and the Contemporary World - II",
    "publisher": "NCERT",
    "official_code": "jess1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G10-ENG",
    "grade_subject_id": "CBSE-G10-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "First Flight",
    "publisher": "NCERT",
    "official_code": "jeff1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G10-HIN",
    "grade_subject_id": "CBSE-G10-HIN",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Kshitij Part 2",
    "publisher": "NCERT",
    "official_code": "jeks1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-PHY",
    "grade_subject_id": "CBSE-G11-SCI-PHY",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Physics - Textbook for Class XI (Parts I & II)",
    "publisher": "NCERT",
    "official_code": "keph1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-CHEM",
    "grade_subject_id": "CBSE-G11-SCI-CHEM",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Chemistry - Textbook for Class XI (Parts I & II)",
    "publisher": "NCERT",
    "official_code": "kech1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-MATH",
    "grade_subject_id": "CBSE-G11-SCI-MATH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Mathematics - Textbook for Class XI",
    "publisher": "NCERT",
    "official_code": "kemh1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-BIO",
    "grade_subject_id": "CBSE-G11-SCI-BIO",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Biology - Textbook for Class XI",
    "publisher": "NCERT",
    "official_code": "kebo1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-CS",
    "grade_subject_id": "CBSE-G11-SCI-CS",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Computer Science with Python - Class XI",
    "publisher": "NCERT",
    "official_code": "kecs1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-ENG",
    "grade_subject_id": "CBSE-G11-SCI-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Hornbill",
    "publisher": "NCERT",
    "official_code": "kehb1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-ACC",
    "grade_subject_id": "CBSE-G11-COM-ACC",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Financial Accounting - Class XI",
    "publisher": "NCERT",
    "official_code": "keac1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-BST",
    "grade_subject_id": "CBSE-G11-COM-BST",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Business Studies - Class XI",
    "publisher": "NCERT",
    "official_code": "kebs1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-ECON",
    "grade_subject_id": "CBSE-G11-COM-ECON",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Introductory Microeconomics & Statistics",
    "publisher": "NCERT",
    "official_code": "keec1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-HIST",
    "grade_subject_id": "CBSE-G11-HUM-HIST",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Themes in World History",
    "publisher": "NCERT",
    "official_code": "kest1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-POLSCI",
    "grade_subject_id": "CBSE-G11-HUM-POLSCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Indian Constitution at Work",
    "publisher": "NCERT",
    "official_code": "keps1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-GEOG",
    "grade_subject_id": "CBSE-G11-HUM-GEOG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Fundamentals of Physical Geography",
    "publisher": "NCERT",
    "official_code": "kegy1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-PHY",
    "grade_subject_id": "CBSE-G12-SCI-PHY",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Physics - Textbook for Class XII (Parts I & II)",
    "publisher": "NCERT",
    "official_code": "leph1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-CHEM",
    "grade_subject_id": "CBSE-G12-SCI-CHEM",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Chemistry - Textbook for Class XII (Parts I & II)",
    "publisher": "NCERT",
    "official_code": "lech1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-MATH",
    "grade_subject_id": "CBSE-G12-SCI-MATH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Mathematics - Textbook for Class XII",
    "publisher": "NCERT",
    "official_code": "lemh1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-BIO",
    "grade_subject_id": "CBSE-G12-SCI-BIO",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Biology - Textbook for Class XII",
    "publisher": "NCERT",
    "official_code": "lebo1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-CS",
    "grade_subject_id": "CBSE-G12-SCI-CS",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Computer Science with Python - Class XII",
    "publisher": "NCERT",
    "official_code": "lecs1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-ENG",
    "grade_subject_id": "CBSE-G12-SCI-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Flamingo",
    "publisher": "NCERT",
    "official_code": "lefl1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-ACC",
    "grade_subject_id": "CBSE-G12-COM-ACC",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Accounting for Partnership Firms & Analysis",
    "publisher": "NCERT",
    "official_code": "leac1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-BST",
    "grade_subject_id": "CBSE-G12-COM-BST",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Principles and Functions of Management",
    "publisher": "NCERT",
    "official_code": "lebs1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-ECON",
    "grade_subject_id": "CBSE-G12-COM-ECON",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Introductory Macroeconomics & Development",
    "publisher": "NCERT",
    "official_code": "leec1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-HIST",
    "grade_subject_id": "CBSE-G12-HUM-HIST",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Themes in Indian History",
    "publisher": "NCERT",
    "official_code": "lest1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-POLSCI",
    "grade_subject_id": "CBSE-G12-HUM-POLSCI",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Contemporary World Politics",
    "publisher": "NCERT",
    "official_code": "leps1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-GEOG",
    "grade_subject_id": "CBSE-G12-HUM-GEOG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Fundamentals of Human Geography",
    "publisher": "NCERT",
    "official_code": "legy1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-COM-ENG",
    "grade_subject_id": "CBSE-G11-COM-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Hornbill",
    "publisher": "NCERT",
    "official_code": "kehb1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-HUM-ENG",
    "grade_subject_id": "CBSE-G11-HUM-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Hornbill",
    "publisher": "NCERT",
    "official_code": "kehb1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-COM-ENG",
    "grade_subject_id": "CBSE-G12-COM-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Flamingo",
    "publisher": "NCERT",
    "official_code": "lefl1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-HUM-ENG",
    "grade_subject_id": "CBSE-G12-HUM-ENG",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Flamingo",
    "publisher": "NCERT",
    "official_code": "lefl1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-COM-MATH",
    "grade_subject_id": "CBSE-G11-COM-MATH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Mathematics - Textbook for Class XI",
    "publisher": "NCERT",
    "official_code": "kemh1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-SOCIO",
    "grade_subject_id": "CBSE-G11-HUM-SOCIO",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Introducing Sociology",
    "publisher": "NCERT",
    "official_code": "keso1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-PSYCH",
    "grade_subject_id": "CBSE-G11-HUM-PSYCH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Introduction to Psychology",
    "publisher": "NCERT",
    "official_code": "kepy1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G11-HUM-ECON",
    "grade_subject_id": "CBSE-G11-HUM-ECON",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Introductory Microeconomics & Statistics",
    "publisher": "NCERT",
    "official_code": "keec1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-COM-MATH",
    "grade_subject_id": "CBSE-G12-COM-MATH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Mathematics - Textbook for Class XII",
    "publisher": "NCERT",
    "official_code": "lemh1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-SOCIO",
    "grade_subject_id": "CBSE-G12-HUM-SOCIO",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Indian Society",
    "publisher": "NCERT",
    "official_code": "leso1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-PSYCH",
    "grade_subject_id": "CBSE-G12-HUM-PSYCH",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Psychology Class XII",
    "publisher": "NCERT",
    "official_code": "lepy1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  },
  {
    "id": "CBSE-TB-G12-HUM-ECON",
    "grade_subject_id": "CBSE-G12-HUM-ECON",
    "curriculum_version_id": "CBSE-NCERT-2026-27",
    "title": "Introductory Macroeconomics & Development",
    "publisher": "NCERT",
    "official_code": "leec1",
    "edition": "2026-27 Revised Edition",
    "is_primary": true
  }
];

export const CBSE_TEXTBOOK_PARTS: CbseTextbookPart[] = [];

export const CBSE_CHAPTERS: CbseChapter[] = [
  {
    "id": "CBSE-CH-G6-MATH-CH01",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Patterns in Mathematics",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Patterns in Mathematics from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH02",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Lines and Angles",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Lines and Angles from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH03",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Number Play",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Number Play from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH04",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Data Handling and Presentation",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Data Handling and Presentation from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH05",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Prime Time",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Prime Time from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH06",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Perimeter and Area",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Perimeter and Area from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH07",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Fractions",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Fractions from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH08",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Playing with Constructions",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Playing with Constructions from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH09",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Symmetry",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Symmetry from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-MATH-CH10",
    "textbook_id": "CBSE-TB-G6-MATH",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "The Other Side of Zero",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: The Other Side of Zero from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH01",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Wonderful World of Science",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Wonderful World of Science from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH02",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Diversity in the Living World",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Diversity in the Living World from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH03",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Mindful Eating: A Path to a Healthy Body",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Mindful Eating: A Path to a Healthy Body from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH04",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Exploring Magnets",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Exploring Magnets from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH05",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Measurement of Length and Motion",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Measurement of Length and Motion from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH06",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Materials Around Us",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Materials Around Us from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH07",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Temperature and its Measurement",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Temperature and its Measurement from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH08",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "A Journey through States of Water",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: A Journey through States of Water from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH09",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Methods of Separation in Everyday Life",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Methods of Separation in Everyday Life from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH10",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Living Creatures: Exploring their Characteristics",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Living Creatures: Exploring their Characteristics from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH11",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Nature's Treasures",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Nature's Treasures from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-SCI-CH12",
    "textbook_id": "CBSE-TB-G6-SCI",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Beyond Earth",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Beyond Earth from Curiosity"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH01",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Number Systems",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Number Systems from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH02",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Polynomials",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Polynomials from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH03",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Coordinate Geometry",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Coordinate Geometry from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH04",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Linear Equations in Two Variables",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Linear Equations in Two Variables from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH05",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Introduction to Euclid's Geometry",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Introduction to Euclid's Geometry from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH06",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Lines and Angles",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Lines and Angles from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH07",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Triangles",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Triangles from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH08",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Quadrilaterals",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Quadrilaterals from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH09",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Circles",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Circles from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH10",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Heron's Formula",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Heron's Formula from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH11",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Surface Areas and Volumes",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Surface Areas and Volumes from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-MATH-CH12",
    "textbook_id": "CBSE-TB-G9-MATH",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Statistics",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Statistics from Ganita Manjari (Mathematics IX)"
  },
  {
    "id": "CBSE-CH-G9-ENG-CH01",
    "textbook_id": "CBSE-TB-G9-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "How I Taught My Grandmother to Read",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: How I Taught My Grandmother to Read from Kaveri"
  },
  {
    "id": "CBSE-CH-G9-ENG-CH02",
    "textbook_id": "CBSE-TB-G9-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "The Pot Maker",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: The Pot Maker from Kaveri"
  },
  {
    "id": "CBSE-CH-G9-ENG-CH03",
    "textbook_id": "CBSE-TB-G9-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Winds of Change",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Winds of Change from Kaveri"
  },
  {
    "id": "CBSE-CH-G9-ENG-CH04",
    "textbook_id": "CBSE-TB-G9-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Vitamin-M",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Vitamin-M from Kaveri"
  },
  {
    "id": "CBSE-CH-G9-ENG-CH05",
    "textbook_id": "CBSE-TB-G9-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "The World of Limitless Possibilities",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: The World of Limitless Possibilities from Kaveri"
  },
  {
    "id": "CBSE-CH-G9-ENG-CH06",
    "textbook_id": "CBSE-TB-G9-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Twin Melodies",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Twin Melodies from Kaveri"
  },
  {
    "id": "CBSE-CH-G9-ENG-CH07",
    "textbook_id": "CBSE-TB-G9-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Carrier of Words",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Carrier of Words from Kaveri"
  },
  {
    "id": "CBSE-CH-G9-ENG-CH08",
    "textbook_id": "CBSE-TB-G9-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Follow That Dream",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Follow That Dream from Kaveri"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH01",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Real Numbers",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Real Numbers from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH02",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Polynomials",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Polynomials from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH03",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Pair of Linear Equations in Two Variables",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Pair of Linear Equations in Two Variables from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH04",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Quadratic Equations",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Quadratic Equations from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH05",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Arithmetic Progressions",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Arithmetic Progressions from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH06",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Triangles",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Triangles from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH07",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Coordinate Geometry",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Coordinate Geometry from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH08",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Introduction to Trigonometry",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Introduction to Trigonometry from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH09",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Some Applications of Trigonometry",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Some Applications of Trigonometry from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH10",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Circles",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Circles from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH11",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Areas Related to Circles",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Areas Related to Circles from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH12",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Surface Areas and Volumes",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Surface Areas and Volumes from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH13",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Statistics",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Statistics from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-MATH-CH14",
    "textbook_id": "CBSE-TB-G10-MATH",
    "textbook_part_id": null,
    "chapter_number": 14,
    "chapter_title": "Probability",
    "official_sequence_order": 14,
    "description": "Official Chapter 14: Probability from Mathematics - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH01",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "A Letter to God",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: A Letter to God from First Flight"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH02",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Nelson Mandela: Long Walk to Freedom",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Nelson Mandela: Long Walk to Freedom from First Flight"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH03",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Two Stories about Flying",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Two Stories about Flying from First Flight"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH04",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "From the Diary of Anne Frank",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: From the Diary of Anne Frank from First Flight"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH05",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Glimpses of India",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Glimpses of India from First Flight"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH06",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Mijbil the Otter",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Mijbil the Otter from First Flight"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH07",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Madam Rides the Bus",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Madam Rides the Bus from First Flight"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH08",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "The Sermon at Benares",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: The Sermon at Benares from First Flight"
  },
  {
    "id": "CBSE-CH-G10-ENG-CH09",
    "textbook_id": "CBSE-TB-G10-ENG",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "The Proposal",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: The Proposal from First Flight"
  },
  {
    "id": "CBSE-CH-G10-HIN-CH01",
    "textbook_id": "CBSE-TB-G10-HIN",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Netaji Ka Chashma",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Netaji Ka Chashma from Kshitij Part 2"
  },
  {
    "id": "CBSE-CH-G10-HIN-CH02",
    "textbook_id": "CBSE-TB-G10-HIN",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Balgobin Bhagat",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Balgobin Bhagat from Kshitij Part 2"
  },
  {
    "id": "CBSE-CH-G10-HIN-CH03",
    "textbook_id": "CBSE-TB-G10-HIN",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Lakhnavi Andaz",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Lakhnavi Andaz from Kshitij Part 2"
  },
  {
    "id": "CBSE-CH-G10-HIN-CH04",
    "textbook_id": "CBSE-TB-G10-HIN",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Ek Kahani Yeh Bhi",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Ek Kahani Yeh Bhi from Kshitij Part 2"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH01",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Exploring the Investigative World of Science",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Exploring the Investigative World of Science from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH02",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "The Invisible Living World: Beyond Our Naked Eye",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: The Invisible Living World: Beyond Our Naked Eye from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH03",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Health: The Ultimate Treasure",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Health: The Ultimate Treasure from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH04",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Electricity: Magnetic and Heating Effects",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Electricity: Magnetic and Heating Effects from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH05",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Exploring Forces",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Exploring Forces from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH06",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Pressure, Winds, Storms, and Cyclones",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Pressure, Winds, Storms, and Cyclones from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH07",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Particulate Nature of Matter",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Particulate Nature of Matter from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH08",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Nature of Matter: Elements, Compounds, and Mixtures",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Nature of Matter: Elements, Compounds, and Mixtures from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH09",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "The Amazing World of Solutes, Solvents, and Solutions",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: The Amazing World of Solutes, Solvents, and Solutions from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH10",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Light: Mirrors and Lenses",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Light: Mirrors and Lenses from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH11",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Keeping Time with the Skies",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Keeping Time with the Skies from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH12",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "How Nature Works in Harmony",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: How Nature Works in Harmony from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-SCI-CH13",
    "textbook_id": "CBSE-TB-G8-SCI",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Our Home: Earth, a Unique Life-Sustaining Planet",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Our Home: Earth, a Unique Life-Sustaining Planet from Curiosity"
  },
  {
    "id": "CBSE-CH-G6-ENG-CH01",
    "textbook_id": "CBSE-TB-G6-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Fables and Folk Tales",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Fables and Folk Tales from Poorvi"
  },
  {
    "id": "CBSE-CH-G6-ENG-CH02",
    "textbook_id": "CBSE-TB-G6-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Friendship",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Friendship from Poorvi"
  },
  {
    "id": "CBSE-CH-G6-ENG-CH03",
    "textbook_id": "CBSE-TB-G6-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Nurturing Nature",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Nurturing Nature from Poorvi"
  },
  {
    "id": "CBSE-CH-G6-ENG-CH04",
    "textbook_id": "CBSE-TB-G6-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Sports and Games",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Sports and Games from Poorvi"
  },
  {
    "id": "CBSE-CH-G6-ENG-CH05",
    "textbook_id": "CBSE-TB-G6-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Culture and Tradition",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Culture and Tradition from Poorvi"
  },
  {
    "id": "CBSE-CH-G6-SOCSCI-CH01",
    "textbook_id": "CBSE-TB-G6-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Locating Places on the Earth",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Locating Places on the Earth from Exploring Society: India and Beyond"
  },
  {
    "id": "CBSE-CH-G6-SOCSCI-CH02",
    "textbook_id": "CBSE-TB-G6-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Oceans and Continents",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Oceans and Continents from Exploring Society: India and Beyond"
  },
  {
    "id": "CBSE-CH-G6-SOCSCI-CH03",
    "textbook_id": "CBSE-TB-G6-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Landforms and Life",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Landforms and Life from Exploring Society: India and Beyond"
  },
  {
    "id": "CBSE-CH-G6-SOCSCI-CH04",
    "textbook_id": "CBSE-TB-G6-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Timeline and Sources of History",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Timeline and Sources of History from Exploring Society: India and Beyond"
  },
  {
    "id": "CBSE-CH-G6-SOCSCI-CH05",
    "textbook_id": "CBSE-TB-G6-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "India, That Is Bharat",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: India, That Is Bharat from Exploring Society: India and Beyond"
  },
  {
    "id": "CBSE-CH-G6-SOCSCI-CH06",
    "textbook_id": "CBSE-TB-G6-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "The Beginnings of Indian Civilisation",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: The Beginnings of Indian Civilisation from Exploring Society: India and Beyond"
  },
  {
    "id": "CBSE-CH-G6-SOCSCI-CH07",
    "textbook_id": "CBSE-TB-G6-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "India's Cultural Roots",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: India's Cultural Roots from Exploring Society: India and Beyond"
  },
  {
    "id": "CBSE-CH-G6-HIN-CH01",
    "textbook_id": "CBSE-TB-G6-HIN",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Baras Raha Hai Jal",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Baras Raha Hai Jal from Malhar"
  },
  {
    "id": "CBSE-CH-G6-HIN-CH02",
    "textbook_id": "CBSE-TB-G6-HIN",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Har Ki Jeet",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Har Ki Jeet from Malhar"
  },
  {
    "id": "CBSE-CH-G6-HIN-CH03",
    "textbook_id": "CBSE-TB-G6-HIN",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Bansi Ki Dhun",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Bansi Ki Dhun from Malhar"
  },
  {
    "id": "CBSE-CH-G6-HIN-CH04",
    "textbook_id": "CBSE-TB-G6-HIN",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Meri Maa",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Meri Maa from Malhar"
  },
  {
    "id": "CBSE-CH-G6-SANSKRIT-CH01",
    "textbook_id": "CBSE-TB-G6-SANSKRIT",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Prathama Patha: Mangalacharanam",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Prathama Patha: Mangalacharanam from Deepakam"
  },
  {
    "id": "CBSE-CH-G6-SANSKRIT-CH02",
    "textbook_id": "CBSE-TB-G6-SANSKRIT",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Dvitiya Patha: Parichaya",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Dvitiya Patha: Parichaya from Deepakam"
  },
  {
    "id": "CBSE-CH-G6-SANSKRIT-CH03",
    "textbook_id": "CBSE-TB-G6-SANSKRIT",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Tritiya Patha: Subhashitani",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Tritiya Patha: Subhashitani from Deepakam"
  },
  {
    "id": "CBSE-CH-G6-SANSKRIT-CH04",
    "textbook_id": "CBSE-TB-G6-SANSKRIT",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Chaturtha Patha: Vidyalaya",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Chaturtha Patha: Vidyalaya from Deepakam"
  },
  {
    "id": "CBSE-CH-G7-SOCSCI-CH01",
    "textbook_id": "CBSE-TB-G7-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Tracing Changes Through a Thousand Years",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Tracing Changes Through a Thousand Years from Our Pasts - II"
  },
  {
    "id": "CBSE-CH-G7-SOCSCI-CH02",
    "textbook_id": "CBSE-TB-G7-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "New Kings and Kingdoms",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: New Kings and Kingdoms from Our Pasts - II"
  },
  {
    "id": "CBSE-CH-G7-SOCSCI-CH03",
    "textbook_id": "CBSE-TB-G7-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "The Delhi Sultans",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: The Delhi Sultans from Our Pasts - II"
  },
  {
    "id": "CBSE-CH-G7-SOCSCI-CH04",
    "textbook_id": "CBSE-TB-G7-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Mughal Empire",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Mughal Empire from Our Pasts - II"
  },
  {
    "id": "CBSE-CH-G7-SOCSCI-CH05",
    "textbook_id": "CBSE-TB-G7-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Rulers and Buildings",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Rulers and Buildings from Our Pasts - II"
  },
  {
    "id": "CBSE-CH-G7-SOCSCI-CH06",
    "textbook_id": "CBSE-TB-G7-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Towns, Traders and Craftspersons",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Towns, Traders and Craftspersons from Our Pasts - II"
  },
  {
    "id": "CBSE-CH-G7-SOCSCI-CH07",
    "textbook_id": "CBSE-TB-G7-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Tribes, Nomads and Settled Communities",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Tribes, Nomads and Settled Communities from Our Pasts - II"
  },
  {
    "id": "CBSE-CH-G9-HIN-CH01",
    "textbook_id": "CBSE-TB-G9-HIN",
    "textbook_part_id": "CBSE-TB-G9-HIN-PART1",
    "chapter_number": 1,
    "chapter_title": "Do Bailon Ki Katha",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Do Bailon Ki Katha from Kshitij Part 1"
  },
  {
    "id": "CBSE-CH-G9-HIN-CH02",
    "textbook_id": "CBSE-TB-G9-HIN",
    "textbook_part_id": "CBSE-TB-G9-HIN-PART1",
    "chapter_number": 2,
    "chapter_title": "Lhasa Ki Aur",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Lhasa Ki Aur from Kshitij Part 1"
  },
  {
    "id": "CBSE-CH-G9-HIN-CH03",
    "textbook_id": "CBSE-TB-G9-HIN",
    "textbook_part_id": "CBSE-TB-G9-HIN-PART1",
    "chapter_number": 3,
    "chapter_title": "Upbhoktavad Ki Sanskriti",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Upbhoktavad Ki Sanskriti from Kshitij Part 1"
  },
  {
    "id": "CBSE-CH-G9-HIN-CH04",
    "textbook_id": "CBSE-TB-G9-HIN",
    "textbook_part_id": "CBSE-TB-G9-HIN-PART1",
    "chapter_number": 4,
    "chapter_title": "Sawle Sapno Ki Yaad",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Sawle Sapno Ki Yaad from Kshitij Part 1"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH01",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Chemical Reactions and Equations",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Chemical Reactions and Equations from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH02",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Acids, Bases and Salts",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Acids, Bases and Salts from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH03",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Metals and Non-metals",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Metals and Non-metals from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH04",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Carbon and its Compounds",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Carbon and its Compounds from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH05",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Life Processes",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Life Processes from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH06",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Control and Coordination",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Control and Coordination from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH07",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "How do Organisms Reproduce?",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: How do Organisms Reproduce? from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH08",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Heredity",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Heredity from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH09",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Light - Reflection and Refraction",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Light - Reflection and Refraction from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH10",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "The Human Eye and the Colorful World",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: The Human Eye and the Colorful World from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH11",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Electricity",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Electricity from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH12",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Magnetic Effects of Electric Current",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Magnetic Effects of Electric Current from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SCI-CH13",
    "textbook_id": "CBSE-TB-G10-SCI",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Our Environment",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Our Environment from Science - Textbook for Class X"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH01",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Rise of Nationalism in Europe",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Rise of Nationalism in Europe from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH02",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Nationalism in India",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Nationalism in India from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH03",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "The Making of a Global World",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: The Making of a Global World from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH04",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Age of Industrialisation",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Age of Industrialisation from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH05",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Print Culture and the Modern World",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Print Culture and the Modern World from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH06",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Resources and Development",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Resources and Development from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH07",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Forest and Wildlife Resources",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Forest and Wildlife Resources from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH08",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Water Resources",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Water Resources from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH09",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Agriculture",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Agriculture from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G10-SOCSCI-CH10",
    "textbook_id": "CBSE-TB-G10-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Minerals and Energy Resources",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Minerals and Energy Resources from India and the Contemporary World - II"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH01",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Ever-Evolving World of Science",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Ever-Evolving World of Science from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH02",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Exploring Substances: Acidic, Basic, and Neutral",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Exploring Substances: Acidic, Basic, and Neutral from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH03",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Electricity: Circuits and their Components",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Electricity: Circuits and their Components from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH04",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The World of Metals and Non-metals",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The World of Metals and Non-metals from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH05",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Changes Around Us: Physical and Chemical",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Changes Around Us: Physical and Chemical from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH06",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Adolescence: A Stage of Growth and Change",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Adolescence: A Stage of Growth and Change from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH07",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Heat Transfer in Nature",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Heat Transfer in Nature from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH08",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Measurement of Time and Motion",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Measurement of Time and Motion from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH09",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Life Processes in Animals",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Life Processes in Animals from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH10",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Life Processes in Plants",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Life Processes in Plants from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH11",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Light: Shadows and Reflections",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Light: Shadows and Reflections from Curiosity"
  },
  {
    "id": "CBSE-CH-G7-SCI-CH12",
    "textbook_id": "CBSE-TB-G7-SCI",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Earth, Moon, and the Sun",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Earth, Moon, and the Sun from Curiosity"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH01",
    "textbook_id": "CBSE-TB-G8-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "A Square and A Cube",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: A Square and A Cube from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH02",
    "textbook_id": "CBSE-TB-G8-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Power Play",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Power Play from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH03",
    "textbook_id": "CBSE-TB-G8-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "A Story of Numbers",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: A Story of Numbers from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH04",
    "textbook_id": "CBSE-TB-G8-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Quadrilaterals",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Quadrilaterals from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH05",
    "textbook_id": "CBSE-TB-G8-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Number Play",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Number Play from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH06",
    "textbook_id": "CBSE-TB-G8-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "We Distribute, Yet Things Multiply",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: We Distribute, Yet Things Multiply from Ganita Prakash"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH07",
    "textbook_id": "CBSE-TB-G8-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Proportional Reasoning-1",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Proportional Reasoning-1 from Ganita Prakash Part-I"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH08",
    "textbook_id": "CBSE-TB-G8-MATH-P2",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Fractions in Disguise",
    "official_sequence_order": 1,
    "description": "Official Chapter 8 (Part II Ch 1): Fractions in Disguise from Ganita Prakash Part-II"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH09",
    "textbook_id": "CBSE-TB-G8-MATH-P2",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "The Baudhayana-Pythagoras Theorem",
    "official_sequence_order": 2,
    "description": "Official Chapter 9 (Part II Ch 2): The Baudhayana-Pythagoras Theorem from Ganita Prakash Part-II"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH10",
    "textbook_id": "CBSE-TB-G8-MATH-P2",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Proportional Reasoning-2",
    "official_sequence_order": 3,
    "description": "Official Chapter 10 (Part II Ch 3): Proportional Reasoning-2 from Ganita Prakash Part-II"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH11",
    "textbook_id": "CBSE-TB-G8-MATH-P2",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Exploring Some Geometric Themes",
    "official_sequence_order": 4,
    "description": "Official Chapter 11 (Part II Ch 4): Exploring Some Geometric Themes from Ganita Prakash Part-II"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH12",
    "textbook_id": "CBSE-TB-G8-MATH-P2",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Tales by Dots and Lines",
    "official_sequence_order": 5,
    "description": "Official Chapter 12 (Part II Ch 5): Tales by Dots and Lines from Ganita Prakash Part-II"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH13",
    "textbook_id": "CBSE-TB-G8-MATH-P2",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Algebra Play",
    "official_sequence_order": 6,
    "description": "Official Chapter 13 (Part II Ch 6): Algebra Play from Ganita Prakash Part-II"
  },
  {
    "id": "CBSE-CH-G8-MATH-CH14",
    "textbook_id": "CBSE-TB-G8-MATH-P2",
    "textbook_part_id": null,
    "chapter_number": 14,
    "chapter_title": "Area",
    "official_sequence_order": 7,
    "description": "Official Chapter 14 (Part II Ch 7): Area from Ganita Prakash Part-II"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH01",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Units and Measurements",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Units and Measurements from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH02",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Motion in a Straight Line",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Motion in a Straight Line from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH03",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Motion in a Plane",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Motion in a Plane from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH04",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Laws of Motion",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Laws of Motion from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH05",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Work, Energy and Power",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Work, Energy and Power from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH06",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "System of Particles and Rotational Motion",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: System of Particles and Rotational Motion from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH07",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Gravitation",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Gravitation from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH08",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Mechanical Properties of Solids",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Mechanical Properties of Solids from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH09",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Mechanical Properties of Fluids",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Mechanical Properties of Fluids from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH10",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Thermal Properties of Matter",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Thermal Properties of Matter from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH11",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Thermodynamics",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Thermodynamics from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH12",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Kinetic Theory",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Kinetic Theory from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH13",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Oscillations",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Oscillations from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-PHY-CH14",
    "textbook_id": "CBSE-TB-G11-PHY",
    "textbook_part_id": null,
    "chapter_number": 14,
    "chapter_title": "Waves",
    "official_sequence_order": 14,
    "description": "Official Chapter 14: Waves from Physics - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH01",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Some Basic Concepts of Chemistry",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Some Basic Concepts of Chemistry from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH02",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Structure of Atom",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Structure of Atom from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH03",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Classification of Elements and Periodicity in Properties",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Classification of Elements and Periodicity in Properties from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH04",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Chemical Bonding and Molecular Structure",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Chemical Bonding and Molecular Structure from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH05",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Chemical Thermodynamics",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Chemical Thermodynamics from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH06",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Equilibrium",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Equilibrium from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH07",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Redox Reactions",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Redox Reactions from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH08",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Organic Chemistry: Some Basic Principles and Techniques",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Organic Chemistry: Some Basic Principles and Techniques from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-CHEM-CH09",
    "textbook_id": "CBSE-TB-G11-CHEM",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Hydrocarbons",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Hydrocarbons from Chemistry - Textbook for Class XI (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH01",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Sets",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Sets from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH02",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Relations and Functions",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Relations and Functions from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH03",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Trigonometric Functions",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Trigonometric Functions from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH04",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Complex Numbers and Quadratic Equations",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Complex Numbers and Quadratic Equations from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH05",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Linear Inequalities",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Linear Inequalities from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH06",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Permutations and Combinations",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Permutations and Combinations from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH07",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Binomial Theorem",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Binomial Theorem from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH08",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Sequences and Series",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Sequences and Series from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH09",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Straight Lines",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Straight Lines from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH10",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Conic Sections",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Conic Sections from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH11",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Introduction to Three Dimensional Geometry",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Introduction to Three Dimensional Geometry from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH12",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Limits and Derivatives",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Limits and Derivatives from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH13",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Statistics",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Statistics from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-MATH-CH14",
    "textbook_id": "CBSE-TB-G11-MATH",
    "textbook_part_id": null,
    "chapter_number": 14,
    "chapter_title": "Probability",
    "official_sequence_order": 14,
    "description": "Official Chapter 14: Probability from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH01",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Living World",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Living World from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH02",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Biological Classification",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Biological Classification from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH03",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Plant Kingdom",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Plant Kingdom from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH04",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Animal Kingdom",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Animal Kingdom from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH05",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Morphology of Flowering Plants",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Morphology of Flowering Plants from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH06",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Anatomy of Flowering Plants",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Anatomy of Flowering Plants from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH07",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Structural Organisation in Animals",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Structural Organisation in Animals from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH08",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Cell: The Unit of Life",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Cell: The Unit of Life from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH09",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Biomolecules",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Biomolecules from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH10",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Cell Cycle and Cell Division",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Cell Cycle and Cell Division from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH11",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Photosynthesis in Higher Plants",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Photosynthesis in Higher Plants from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH12",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Respiration in Plants",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Respiration in Plants from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH13",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Plant Growth and Development",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Plant Growth and Development from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH14",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 14,
    "chapter_title": "Breathing and Exchange of Gases",
    "official_sequence_order": 14,
    "description": "Official Chapter 14: Breathing and Exchange of Gases from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH15",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 15,
    "chapter_title": "Body Fluids and Circulation",
    "official_sequence_order": 15,
    "description": "Official Chapter 15: Body Fluids and Circulation from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH16",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 16,
    "chapter_title": "Excretory Products and their Elimination",
    "official_sequence_order": 16,
    "description": "Official Chapter 16: Excretory Products and their Elimination from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH17",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 17,
    "chapter_title": "Locomotion and Movement",
    "official_sequence_order": 17,
    "description": "Official Chapter 17: Locomotion and Movement from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH18",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 18,
    "chapter_title": "Neural Control and Coordination",
    "official_sequence_order": 18,
    "description": "Official Chapter 18: Neural Control and Coordination from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-BIO-CH19",
    "textbook_id": "CBSE-TB-G11-BIO",
    "textbook_part_id": null,
    "chapter_number": 19,
    "chapter_title": "Chemical Coordination and Integration",
    "official_sequence_order": 19,
    "description": "Official Chapter 19: Chemical Coordination and Integration from Biology - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-CS-CH01",
    "textbook_id": "CBSE-TB-G11-CS",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Computer System Overview",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Computer System Overview from Computer Science with Python - Class XI"
  },
  {
    "id": "CBSE-CH-G11-CS-CH02",
    "textbook_id": "CBSE-TB-G11-CS",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Data Representation",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Data Representation from Computer Science with Python - Class XI"
  },
  {
    "id": "CBSE-CH-G11-CS-CH03",
    "textbook_id": "CBSE-TB-G11-CS",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Boolean Logic",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Boolean Logic from Computer Science with Python - Class XI"
  },
  {
    "id": "CBSE-CH-G11-CS-CH04",
    "textbook_id": "CBSE-TB-G11-CS",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Introduction to Problem Solving",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Introduction to Problem Solving from Computer Science with Python - Class XI"
  },
  {
    "id": "CBSE-CH-G11-CS-CH05",
    "textbook_id": "CBSE-TB-G11-CS",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Getting Started with Python",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Getting Started with Python from Computer Science with Python - Class XI"
  },
  {
    "id": "CBSE-CH-G11-CS-CH06",
    "textbook_id": "CBSE-TB-G11-CS",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Python Fundamentals",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Python Fundamentals from Computer Science with Python - Class XI"
  },
  {
    "id": "CBSE-CH-G11-CS-CH07",
    "textbook_id": "CBSE-TB-G11-CS",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Data Handling",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Data Handling from Computer Science with Python - Class XI"
  },
  {
    "id": "CBSE-CH-G11-CS-CH08",
    "textbook_id": "CBSE-TB-G11-CS",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Flow of Control",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Flow of Control from Computer Science with Python - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ENG-CH01",
    "textbook_id": "CBSE-TB-G11-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Portrait of a Lady",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Portrait of a Lady from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-ENG-CH02",
    "textbook_id": "CBSE-TB-G11-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "We're Not Afraid to Die... if We Can All Be Together",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: We're Not Afraid to Die... if We Can All Be Together from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-ENG-CH03",
    "textbook_id": "CBSE-TB-G11-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Discovering Tut: the Saga Continues",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Discovering Tut: the Saga Continues from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-ENG-CH04",
    "textbook_id": "CBSE-TB-G11-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Laburnum Top",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Laburnum Top from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-ENG-CH05",
    "textbook_id": "CBSE-TB-G11-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "The Voice of the Rain",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: The Voice of the Rain from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-ENG-CH06",
    "textbook_id": "CBSE-TB-G11-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Childhood",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Childhood from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-ENG-CH07",
    "textbook_id": "CBSE-TB-G11-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "The Adventure",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: The Adventure from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-ENG-CH08",
    "textbook_id": "CBSE-TB-G11-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Silk Road",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Silk Road from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-ACC-CH01",
    "textbook_id": "CBSE-TB-G11-ACC",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Introduction to Accounting",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Introduction to Accounting from Financial Accounting - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ACC-CH02",
    "textbook_id": "CBSE-TB-G11-ACC",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Theory Base of Accounting",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Theory Base of Accounting from Financial Accounting - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ACC-CH03",
    "textbook_id": "CBSE-TB-G11-ACC",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Recording of Transactions - I",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Recording of Transactions - I from Financial Accounting - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ACC-CH04",
    "textbook_id": "CBSE-TB-G11-ACC",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Recording of Transactions - II",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Recording of Transactions - II from Financial Accounting - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ACC-CH05",
    "textbook_id": "CBSE-TB-G11-ACC",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Bank Reconciliation Statement",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Bank Reconciliation Statement from Financial Accounting - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ACC-CH06",
    "textbook_id": "CBSE-TB-G11-ACC",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Trial Balance and Rectification of Errors",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Trial Balance and Rectification of Errors from Financial Accounting - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ACC-CH07",
    "textbook_id": "CBSE-TB-G11-ACC",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Depreciation, Provisions and Reserves",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Depreciation, Provisions and Reserves from Financial Accounting - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ACC-CH08",
    "textbook_id": "CBSE-TB-G11-ACC",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Financial Statements - I",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Financial Statements - I from Financial Accounting - Class XI"
  },
  {
    "id": "CBSE-CH-G11-BST-CH01",
    "textbook_id": "CBSE-TB-G11-BST",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Business, Trade and Commerce",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Business, Trade and Commerce from Business Studies - Class XI"
  },
  {
    "id": "CBSE-CH-G11-BST-CH02",
    "textbook_id": "CBSE-TB-G11-BST",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Forms of Business Organisation",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Forms of Business Organisation from Business Studies - Class XI"
  },
  {
    "id": "CBSE-CH-G11-BST-CH03",
    "textbook_id": "CBSE-TB-G11-BST",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Private, Public and Global Enterprises",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Private, Public and Global Enterprises from Business Studies - Class XI"
  },
  {
    "id": "CBSE-CH-G11-BST-CH04",
    "textbook_id": "CBSE-TB-G11-BST",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Business Services",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Business Services from Business Studies - Class XI"
  },
  {
    "id": "CBSE-CH-G11-BST-CH05",
    "textbook_id": "CBSE-TB-G11-BST",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Emerging Modes of Business",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Emerging Modes of Business from Business Studies - Class XI"
  },
  {
    "id": "CBSE-CH-G11-BST-CH06",
    "textbook_id": "CBSE-TB-G11-BST",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Social Responsibilities of Business and Business Ethics",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Social Responsibilities of Business and Business Ethics from Business Studies - Class XI"
  },
  {
    "id": "CBSE-CH-G11-ECON-CH01",
    "textbook_id": "CBSE-TB-G11-ECON",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Introduction to Economics",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Introduction to Economics from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-ECON-CH02",
    "textbook_id": "CBSE-TB-G11-ECON",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Collection of Data",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Collection of Data from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-ECON-CH03",
    "textbook_id": "CBSE-TB-G11-ECON",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Organisation of Data",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Organisation of Data from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-ECON-CH04",
    "textbook_id": "CBSE-TB-G11-ECON",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Presentation of Data",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Presentation of Data from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-ECON-CH05",
    "textbook_id": "CBSE-TB-G11-ECON",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Measures of Central Tendency",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Measures of Central Tendency from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-ECON-CH06",
    "textbook_id": "CBSE-TB-G11-ECON",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Correlation",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Correlation from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH01",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Sets",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Sets from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH02",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Relations and Functions",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Relations and Functions from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH03",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Trigonometric Functions",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Trigonometric Functions from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH04",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Complex Numbers and Quadratic Equations",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Complex Numbers and Quadratic Equations from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH05",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Linear Inequalities",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Linear Inequalities from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH06",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Permutations and Combinations",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Permutations and Combinations from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH07",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Binomial Theorem",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Binomial Theorem from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH08",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Sequences and Series",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Sequences and Series from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH09",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Straight Lines",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Straight Lines from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH10",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Conic Sections",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Conic Sections from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH11",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Introduction to Three Dimensional Geometry",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Introduction to Three Dimensional Geometry from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH12",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Limits and Derivatives",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Limits and Derivatives from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH13",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Statistics",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Statistics from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-MATH-CH14",
    "textbook_id": "CBSE-TB-G11-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 14,
    "chapter_title": "Probability",
    "official_sequence_order": 14,
    "description": "Official Chapter 14: Probability from Mathematics - Textbook for Class XI"
  },
  {
    "id": "CBSE-CH-G11-COM-ENG-CH01",
    "textbook_id": "CBSE-TB-G11-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Portrait of a Lady",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Portrait of a Lady from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-COM-ENG-CH02",
    "textbook_id": "CBSE-TB-G11-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "We're Not Afraid to Die... if We Can All Be Together",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: We're Not Afraid to Die... if We Can All Be Together from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-COM-ENG-CH03",
    "textbook_id": "CBSE-TB-G11-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Discovering Tut: the Saga Continues",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Discovering Tut: the Saga Continues from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-COM-ENG-CH04",
    "textbook_id": "CBSE-TB-G11-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Laburnum Top",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Laburnum Top from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-COM-ENG-CH05",
    "textbook_id": "CBSE-TB-G11-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "The Voice of the Rain",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: The Voice of the Rain from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-COM-ENG-CH06",
    "textbook_id": "CBSE-TB-G11-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Childhood",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Childhood from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-COM-ENG-CH07",
    "textbook_id": "CBSE-TB-G11-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "The Adventure",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: The Adventure from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-COM-ENG-CH08",
    "textbook_id": "CBSE-TB-G11-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Silk Road",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Silk Road from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-HIST-CH01",
    "textbook_id": "CBSE-TB-G11-HIST",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Writing and City Life",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Writing and City Life from Themes in World History"
  },
  {
    "id": "CBSE-CH-G11-HIST-CH02",
    "textbook_id": "CBSE-TB-G11-HIST",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "An Empire Across Three Continents",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: An Empire Across Three Continents from Themes in World History"
  },
  {
    "id": "CBSE-CH-G11-HIST-CH03",
    "textbook_id": "CBSE-TB-G11-HIST",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Nomadic Empires",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Nomadic Empires from Themes in World History"
  },
  {
    "id": "CBSE-CH-G11-HIST-CH04",
    "textbook_id": "CBSE-TB-G11-HIST",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Three Orders",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Three Orders from Themes in World History"
  },
  {
    "id": "CBSE-CH-G11-HIST-CH05",
    "textbook_id": "CBSE-TB-G11-HIST",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Changing Cultural Traditions",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Changing Cultural Traditions from Themes in World History"
  },
  {
    "id": "CBSE-CH-G11-POLSCI-CH01",
    "textbook_id": "CBSE-TB-G11-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Constitution: Why and How?",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Constitution: Why and How? from Indian Constitution at Work"
  },
  {
    "id": "CBSE-CH-G11-POLSCI-CH02",
    "textbook_id": "CBSE-TB-G11-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Rights in the Indian Constitution",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Rights in the Indian Constitution from Indian Constitution at Work"
  },
  {
    "id": "CBSE-CH-G11-POLSCI-CH03",
    "textbook_id": "CBSE-TB-G11-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Election and Representation",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Election and Representation from Indian Constitution at Work"
  },
  {
    "id": "CBSE-CH-G11-POLSCI-CH04",
    "textbook_id": "CBSE-TB-G11-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Executive",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Executive from Indian Constitution at Work"
  },
  {
    "id": "CBSE-CH-G11-POLSCI-CH05",
    "textbook_id": "CBSE-TB-G11-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Legislature",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Legislature from Indian Constitution at Work"
  },
  {
    "id": "CBSE-CH-G11-POLSCI-CH06",
    "textbook_id": "CBSE-TB-G11-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Judiciary",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Judiciary from Indian Constitution at Work"
  },
  {
    "id": "CBSE-CH-G11-GEOG-CH01",
    "textbook_id": "CBSE-TB-G11-GEOG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Geography as a Discipline",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Geography as a Discipline from Fundamentals of Physical Geography"
  },
  {
    "id": "CBSE-CH-G11-GEOG-CH02",
    "textbook_id": "CBSE-TB-G11-GEOG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "The Origin and Evolution of the Earth",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: The Origin and Evolution of the Earth from Fundamentals of Physical Geography"
  },
  {
    "id": "CBSE-CH-G11-GEOG-CH03",
    "textbook_id": "CBSE-TB-G11-GEOG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Interior of the Earth",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Interior of the Earth from Fundamentals of Physical Geography"
  },
  {
    "id": "CBSE-CH-G11-GEOG-CH04",
    "textbook_id": "CBSE-TB-G11-GEOG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Distribution of Oceans and Continents",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Distribution of Oceans and Continents from Fundamentals of Physical Geography"
  },
  {
    "id": "CBSE-CH-G11-GEOG-CH05",
    "textbook_id": "CBSE-TB-G11-GEOG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Geomorphic Processes",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Geomorphic Processes from Fundamentals of Physical Geography"
  },
  {
    "id": "CBSE-CH-G11-SOCIO-CH01",
    "textbook_id": "CBSE-TB-G11-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Sociology and Society",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Sociology and Society from Introducing Sociology"
  },
  {
    "id": "CBSE-CH-G11-SOCIO-CH02",
    "textbook_id": "CBSE-TB-G11-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Terms, Concepts and their use in Sociology",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Terms, Concepts and their use in Sociology from Introducing Sociology"
  },
  {
    "id": "CBSE-CH-G11-SOCIO-CH03",
    "textbook_id": "CBSE-TB-G11-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Understanding Social Institutions",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Understanding Social Institutions from Introducing Sociology"
  },
  {
    "id": "CBSE-CH-G11-SOCIO-CH04",
    "textbook_id": "CBSE-TB-G11-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Culture and Socialisation",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Culture and Socialisation from Introducing Sociology"
  },
  {
    "id": "CBSE-CH-G11-SOCIO-CH05",
    "textbook_id": "CBSE-TB-G11-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Doing Sociology: Research Methods",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Doing Sociology: Research Methods from Introducing Sociology"
  },
  {
    "id": "CBSE-CH-G11-PSYCH-CH01",
    "textbook_id": "CBSE-TB-G11-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "What is Psychology?",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: What is Psychology? from Introduction to Psychology"
  },
  {
    "id": "CBSE-CH-G11-PSYCH-CH02",
    "textbook_id": "CBSE-TB-G11-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Methods of Enquiry in Psychology",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Methods of Enquiry in Psychology from Introduction to Psychology"
  },
  {
    "id": "CBSE-CH-G11-PSYCH-CH03",
    "textbook_id": "CBSE-TB-G11-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "The Bases of Human Behaviour",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: The Bases of Human Behaviour from Introduction to Psychology"
  },
  {
    "id": "CBSE-CH-G11-PSYCH-CH04",
    "textbook_id": "CBSE-TB-G11-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Human Development",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Human Development from Introduction to Psychology"
  },
  {
    "id": "CBSE-CH-G11-PSYCH-CH05",
    "textbook_id": "CBSE-TB-G11-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Sensory, Attentional and Perceptual Processes",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Sensory, Attentional and Perceptual Processes from Introduction to Psychology"
  },
  {
    "id": "CBSE-CH-G11-PSYCH-CH06",
    "textbook_id": "CBSE-TB-G11-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Learning",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Learning from Introduction to Psychology"
  },
  {
    "id": "CBSE-CH-G11-PSYCH-CH07",
    "textbook_id": "CBSE-TB-G11-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Human Memory",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Human Memory from Introduction to Psychology"
  },
  {
    "id": "CBSE-CH-G11-HUM-ECON-CH01",
    "textbook_id": "CBSE-TB-G11-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Introduction to Economics",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Introduction to Economics from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-HUM-ECON-CH02",
    "textbook_id": "CBSE-TB-G11-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Collection of Data",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Collection of Data from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-HUM-ECON-CH03",
    "textbook_id": "CBSE-TB-G11-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Organisation of Data",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Organisation of Data from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-HUM-ECON-CH04",
    "textbook_id": "CBSE-TB-G11-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Presentation of Data",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Presentation of Data from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-HUM-ECON-CH05",
    "textbook_id": "CBSE-TB-G11-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Measures of Central Tendency",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Measures of Central Tendency from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-HUM-ECON-CH06",
    "textbook_id": "CBSE-TB-G11-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Correlation",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Correlation from Introductory Microeconomics & Statistics"
  },
  {
    "id": "CBSE-CH-G11-HUM-ENG-CH01",
    "textbook_id": "CBSE-TB-G11-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Portrait of a Lady",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Portrait of a Lady from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-HUM-ENG-CH02",
    "textbook_id": "CBSE-TB-G11-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "We're Not Afraid to Die... if We Can All Be Together",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: We're Not Afraid to Die... if We Can All Be Together from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-HUM-ENG-CH03",
    "textbook_id": "CBSE-TB-G11-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Discovering Tut: the Saga Continues",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Discovering Tut: the Saga Continues from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-HUM-ENG-CH04",
    "textbook_id": "CBSE-TB-G11-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Laburnum Top",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Laburnum Top from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-HUM-ENG-CH05",
    "textbook_id": "CBSE-TB-G11-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "The Voice of the Rain",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: The Voice of the Rain from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-HUM-ENG-CH06",
    "textbook_id": "CBSE-TB-G11-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Childhood",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Childhood from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-HUM-ENG-CH07",
    "textbook_id": "CBSE-TB-G11-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "The Adventure",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: The Adventure from Hornbill"
  },
  {
    "id": "CBSE-CH-G11-HUM-ENG-CH08",
    "textbook_id": "CBSE-TB-G11-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Silk Road",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Silk Road from Hornbill"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH01",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Electric Charges and Fields",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Electric Charges and Fields from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH02",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Electrostatic Potential and Capacitance",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Electrostatic Potential and Capacitance from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH03",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Current Electricity",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Current Electricity from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH04",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Moving Charges and Magnetism",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Moving Charges and Magnetism from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH05",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Magnetism and Matter",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Magnetism and Matter from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH06",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Electromagnetic Induction",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Electromagnetic Induction from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH07",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Alternating Current",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Alternating Current from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH08",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Electromagnetic Waves",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Electromagnetic Waves from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH09",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Ray Optics and Optical Instruments",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Ray Optics and Optical Instruments from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH10",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Wave Optics",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Wave Optics from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH11",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Dual Nature of Radiation and Matter",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Dual Nature of Radiation and Matter from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH12",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Atoms",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Atoms from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH13",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Nuclei",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Nuclei from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-PHY-CH14",
    "textbook_id": "CBSE-TB-G12-PHY",
    "textbook_part_id": null,
    "chapter_number": 14,
    "chapter_title": "Semiconductor Electronics: Materials, Devices and Simple Circuits",
    "official_sequence_order": 14,
    "description": "Official Chapter 14: Semiconductor Electronics: Materials, Devices and Simple Circuits from Physics - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH01",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Solutions",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Solutions from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH02",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Electrochemistry",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Electrochemistry from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH03",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Chemical Kinetics",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Chemical Kinetics from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH04",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The d- and f- Block Elements",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The d- and f- Block Elements from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH05",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Coordination Compounds",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Coordination Compounds from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH06",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Haloalkanes and Haloarenes",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Haloalkanes and Haloarenes from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH07",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Alcohols, Phenols and Ethers",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Alcohols, Phenols and Ethers from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH08",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Aldehydes, Ketones and Carboxylic Acids",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Aldehydes, Ketones and Carboxylic Acids from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH09",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Amines",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Amines from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-CHEM-CH10",
    "textbook_id": "CBSE-TB-G12-CHEM",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Biomolecules",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Biomolecules from Chemistry - Textbook for Class XII (Parts I & II)"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH01",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Relations and Functions",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Relations and Functions from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH02",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Inverse Trigonometric Functions",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Inverse Trigonometric Functions from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH03",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Matrices",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Matrices from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH04",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Determinants",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Determinants from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH05",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Continuity and Differentiability",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Continuity and Differentiability from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH06",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Application of Derivatives",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Application of Derivatives from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH07",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Integrals",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Integrals from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH08",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Application of Integrals",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Application of Integrals from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH09",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Differential Equations",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Differential Equations from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH10",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Vector Algebra",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Vector Algebra from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH11",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Three Dimensional Geometry",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Three Dimensional Geometry from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH12",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Linear Programming",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Linear Programming from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-MATH-CH13",
    "textbook_id": "CBSE-TB-G12-MATH",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Probability",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Probability from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH01",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Sexual Reproduction in Flowering Plants",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Sexual Reproduction in Flowering Plants from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH02",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Human Reproduction",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Human Reproduction from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH03",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Reproductive Health",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Reproductive Health from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH04",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Principles of Inheritance and Variation",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Principles of Inheritance and Variation from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH05",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Molecular Basis of Inheritance",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Molecular Basis of Inheritance from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH06",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Evolution",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Evolution from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH07",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Human Health and Disease",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Human Health and Disease from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH08",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Microbes in Human Welfare",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Microbes in Human Welfare from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH09",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Biotechnology: Principles and Processes",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Biotechnology: Principles and Processes from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH10",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Biotechnology and its Applications",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Biotechnology and its Applications from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH11",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Organisms and Populations",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Organisms and Populations from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH12",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Ecosystem",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Ecosystem from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-BIO-CH13",
    "textbook_id": "CBSE-TB-G12-BIO",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Biodiversity and Conservation",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Biodiversity and Conservation from Biology - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-CS-CH01",
    "textbook_id": "CBSE-TB-G12-CS",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Python Revision Tour",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Python Revision Tour from Computer Science with Python - Class XII"
  },
  {
    "id": "CBSE-CH-G12-CS-CH02",
    "textbook_id": "CBSE-TB-G12-CS",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Functions",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Functions from Computer Science with Python - Class XII"
  },
  {
    "id": "CBSE-CH-G12-CS-CH03",
    "textbook_id": "CBSE-TB-G12-CS",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Using Python Libraries",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Using Python Libraries from Computer Science with Python - Class XII"
  },
  {
    "id": "CBSE-CH-G12-CS-CH04",
    "textbook_id": "CBSE-TB-G12-CS",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "File Handling",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: File Handling from Computer Science with Python - Class XII"
  },
  {
    "id": "CBSE-CH-G12-CS-CH05",
    "textbook_id": "CBSE-TB-G12-CS",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Recursion",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Recursion from Computer Science with Python - Class XII"
  },
  {
    "id": "CBSE-CH-G12-CS-CH06",
    "textbook_id": "CBSE-TB-G12-CS",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Data Structures",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Data Structures from Computer Science with Python - Class XII"
  },
  {
    "id": "CBSE-CH-G12-CS-CH07",
    "textbook_id": "CBSE-TB-G12-CS",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Computer Networks",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Computer Networks from Computer Science with Python - Class XII"
  },
  {
    "id": "CBSE-CH-G12-ENG-CH01",
    "textbook_id": "CBSE-TB-G12-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Last Lesson",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Last Lesson from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-ENG-CH02",
    "textbook_id": "CBSE-TB-G12-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Lost Spring",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Lost Spring from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-ENG-CH03",
    "textbook_id": "CBSE-TB-G12-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Deep Water",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Deep Water from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-ENG-CH04",
    "textbook_id": "CBSE-TB-G12-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Rattrap",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Rattrap from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-ENG-CH05",
    "textbook_id": "CBSE-TB-G12-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Indigo",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Indigo from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-ENG-CH06",
    "textbook_id": "CBSE-TB-G12-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Poets and Pancakes",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Poets and Pancakes from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-ENG-CH07",
    "textbook_id": "CBSE-TB-G12-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "The Interview",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: The Interview from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-ENG-CH08",
    "textbook_id": "CBSE-TB-G12-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Going Places",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Going Places from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-ACC-CH01",
    "textbook_id": "CBSE-TB-G12-ACC",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Accounting for Partnership: Basic Concepts",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Accounting for Partnership: Basic Concepts from Accounting for Partnership Firms & Analysis"
  },
  {
    "id": "CBSE-CH-G12-ACC-CH02",
    "textbook_id": "CBSE-TB-G12-ACC",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Reconstitution of a Partnership Firm - Admission of a Partner",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Reconstitution of a Partnership Firm - Admission of a Partner from Accounting for Partnership Firms & Analysis"
  },
  {
    "id": "CBSE-CH-G12-ACC-CH03",
    "textbook_id": "CBSE-TB-G12-ACC",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Reconstitution of a Partnership Firm - Retirement/Death of a Partner",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Reconstitution of a Partnership Firm - Retirement/Death of a Partner from Accounting for Partnership Firms & Analysis"
  },
  {
    "id": "CBSE-CH-G12-ACC-CH04",
    "textbook_id": "CBSE-TB-G12-ACC",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Dissolution of Partnership Firm",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Dissolution of Partnership Firm from Accounting for Partnership Firms & Analysis"
  },
  {
    "id": "CBSE-CH-G12-ACC-CH05",
    "textbook_id": "CBSE-TB-G12-ACC",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Accounting for Share Capital",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Accounting for Share Capital from Accounting for Partnership Firms & Analysis"
  },
  {
    "id": "CBSE-CH-G12-ACC-CH06",
    "textbook_id": "CBSE-TB-G12-ACC",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Issue and Redemption of Debentures",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Issue and Redemption of Debentures from Accounting for Partnership Firms & Analysis"
  },
  {
    "id": "CBSE-CH-G12-ACC-CH07",
    "textbook_id": "CBSE-TB-G12-ACC",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Financial Statements of a Company",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Financial Statements of a Company from Accounting for Partnership Firms & Analysis"
  },
  {
    "id": "CBSE-CH-G12-ACC-CH08",
    "textbook_id": "CBSE-TB-G12-ACC",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Analysis of Financial Statements",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Analysis of Financial Statements from Accounting for Partnership Firms & Analysis"
  },
  {
    "id": "CBSE-CH-G12-BST-CH01",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Nature and Significance of Management",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Nature and Significance of Management from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH02",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Principles of Management",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Principles of Management from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH03",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Business Environment",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Business Environment from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH04",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Planning",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Planning from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH05",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Organising",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Organising from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH06",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Staffing",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Staffing from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH07",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Directing",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Directing from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH08",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Controlling",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Controlling from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH09",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Financial Management",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Financial Management from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH10",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Financial Markets",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Financial Markets from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH11",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Marketing Management",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Marketing Management from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-BST-CH12",
    "textbook_id": "CBSE-TB-G12-BST",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Consumer Protection",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Consumer Protection from Principles and Functions of Management"
  },
  {
    "id": "CBSE-CH-G12-ECON-CH01",
    "textbook_id": "CBSE-TB-G12-ECON",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Introduction to Macroeconomics",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Introduction to Macroeconomics from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-ECON-CH02",
    "textbook_id": "CBSE-TB-G12-ECON",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "National Income Accounting",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: National Income Accounting from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-ECON-CH03",
    "textbook_id": "CBSE-TB-G12-ECON",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Money and Banking",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Money and Banking from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-ECON-CH04",
    "textbook_id": "CBSE-TB-G12-ECON",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Determination of Income and Employment",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Determination of Income and Employment from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-ECON-CH05",
    "textbook_id": "CBSE-TB-G12-ECON",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Government Budget and the Economy",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Government Budget and the Economy from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-ECON-CH06",
    "textbook_id": "CBSE-TB-G12-ECON",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Open Economy Macroeconomics",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Open Economy Macroeconomics from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-ECON-CH07",
    "textbook_id": "CBSE-TB-G12-ECON",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Development Experience (1947-90) and Economic Reforms since 1991",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Development Experience (1947-90) and Economic Reforms since 1991 from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-ECON-CH08",
    "textbook_id": "CBSE-TB-G12-ECON",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Current Challenges facing the Indian Economy",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Current Challenges facing the Indian Economy from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH01",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Relations and Functions",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Relations and Functions from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH02",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Inverse Trigonometric Functions",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Inverse Trigonometric Functions from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH03",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Matrices",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Matrices from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH04",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Determinants",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Determinants from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH05",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Continuity and Differentiability",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Continuity and Differentiability from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH06",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Application of Derivatives",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Application of Derivatives from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH07",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Integrals",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Integrals from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH08",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Application of Integrals",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Application of Integrals from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH09",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Differential Equations",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Differential Equations from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH10",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Vector Algebra",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Vector Algebra from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH11",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Three Dimensional Geometry",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Three Dimensional Geometry from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH12",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Linear Programming",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Linear Programming from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-MATH-CH13",
    "textbook_id": "CBSE-TB-G12-COM-MATH",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Probability",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Probability from Mathematics - Textbook for Class XII"
  },
  {
    "id": "CBSE-CH-G12-COM-ENG-CH01",
    "textbook_id": "CBSE-TB-G12-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Last Lesson",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Last Lesson from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-COM-ENG-CH02",
    "textbook_id": "CBSE-TB-G12-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Lost Spring",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Lost Spring from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-COM-ENG-CH03",
    "textbook_id": "CBSE-TB-G12-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Deep Water",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Deep Water from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-COM-ENG-CH04",
    "textbook_id": "CBSE-TB-G12-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Rattrap",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Rattrap from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-COM-ENG-CH05",
    "textbook_id": "CBSE-TB-G12-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Indigo",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Indigo from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-COM-ENG-CH06",
    "textbook_id": "CBSE-TB-G12-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Poets and Pancakes",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Poets and Pancakes from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-COM-ENG-CH07",
    "textbook_id": "CBSE-TB-G12-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "The Interview",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: The Interview from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-COM-ENG-CH08",
    "textbook_id": "CBSE-TB-G12-COM-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Going Places",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Going Places from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-HIST-CH01",
    "textbook_id": "CBSE-TB-G12-HIST",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Bricks, Beads and Bones",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Bricks, Beads and Bones from Themes in Indian History"
  },
  {
    "id": "CBSE-CH-G12-HIST-CH02",
    "textbook_id": "CBSE-TB-G12-HIST",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Kings, Farmers and Towns",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Kings, Farmers and Towns from Themes in Indian History"
  },
  {
    "id": "CBSE-CH-G12-HIST-CH03",
    "textbook_id": "CBSE-TB-G12-HIST",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Kinship, Caste and Class",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Kinship, Caste and Class from Themes in Indian History"
  },
  {
    "id": "CBSE-CH-G12-HIST-CH04",
    "textbook_id": "CBSE-TB-G12-HIST",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Thinkers, Beliefs and Buildings",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Thinkers, Beliefs and Buildings from Themes in Indian History"
  },
  {
    "id": "CBSE-CH-G12-HIST-CH05",
    "textbook_id": "CBSE-TB-G12-HIST",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Through the Eyes of Travellers",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Through the Eyes of Travellers from Themes in Indian History"
  },
  {
    "id": "CBSE-CH-G12-HIST-CH06",
    "textbook_id": "CBSE-TB-G12-HIST",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Bhakti-Sufi Traditions",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Bhakti-Sufi Traditions from Themes in Indian History"
  },
  {
    "id": "CBSE-CH-G12-POLSCI-CH01",
    "textbook_id": "CBSE-TB-G12-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The End of Bipolarity",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The End of Bipolarity from Contemporary World Politics"
  },
  {
    "id": "CBSE-CH-G12-POLSCI-CH02",
    "textbook_id": "CBSE-TB-G12-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Contemporary Centres of Power",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Contemporary Centres of Power from Contemporary World Politics"
  },
  {
    "id": "CBSE-CH-G12-POLSCI-CH03",
    "textbook_id": "CBSE-TB-G12-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Contemporary South Asia",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Contemporary South Asia from Contemporary World Politics"
  },
  {
    "id": "CBSE-CH-G12-POLSCI-CH04",
    "textbook_id": "CBSE-TB-G12-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "International Organisations",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: International Organisations from Contemporary World Politics"
  },
  {
    "id": "CBSE-CH-G12-POLSCI-CH05",
    "textbook_id": "CBSE-TB-G12-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Security in the Contemporary World",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Security in the Contemporary World from Contemporary World Politics"
  },
  {
    "id": "CBSE-CH-G12-POLSCI-CH06",
    "textbook_id": "CBSE-TB-G12-POLSCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Environment and Natural Resources",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Environment and Natural Resources from Contemporary World Politics"
  },
  {
    "id": "CBSE-CH-G12-GEOG-CH01",
    "textbook_id": "CBSE-TB-G12-GEOG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Human Geography: Nature and Scope",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Human Geography: Nature and Scope from Fundamentals of Human Geography"
  },
  {
    "id": "CBSE-CH-G12-GEOG-CH02",
    "textbook_id": "CBSE-TB-G12-GEOG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "The World Population: Distribution, Density and Growth",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: The World Population: Distribution, Density and Growth from Fundamentals of Human Geography"
  },
  {
    "id": "CBSE-CH-G12-GEOG-CH03",
    "textbook_id": "CBSE-TB-G12-GEOG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Human Development",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Human Development from Fundamentals of Human Geography"
  },
  {
    "id": "CBSE-CH-G12-GEOG-CH04",
    "textbook_id": "CBSE-TB-G12-GEOG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Primary Activities",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Primary Activities from Fundamentals of Human Geography"
  },
  {
    "id": "CBSE-CH-G12-GEOG-CH05",
    "textbook_id": "CBSE-TB-G12-GEOG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Secondary Activities",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Secondary Activities from Fundamentals of Human Geography"
  },
  {
    "id": "CBSE-CH-G12-GEOG-CH06",
    "textbook_id": "CBSE-TB-G12-GEOG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Tertiary and Quaternary Activities",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Tertiary and Quaternary Activities from Fundamentals of Human Geography"
  },
  {
    "id": "CBSE-CH-G12-SOCIO-CH01",
    "textbook_id": "CBSE-TB-G12-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Introducing Indian Society",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Introducing Indian Society from Indian Society"
  },
  {
    "id": "CBSE-CH-G12-SOCIO-CH02",
    "textbook_id": "CBSE-TB-G12-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "The Demographic Structure of the Indian Society",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: The Demographic Structure of the Indian Society from Indian Society"
  },
  {
    "id": "CBSE-CH-G12-SOCIO-CH03",
    "textbook_id": "CBSE-TB-G12-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Social Institutions: Continuity and Change",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Social Institutions: Continuity and Change from Indian Society"
  },
  {
    "id": "CBSE-CH-G12-SOCIO-CH04",
    "textbook_id": "CBSE-TB-G12-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Market as a Social Institution",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Market as a Social Institution from Indian Society"
  },
  {
    "id": "CBSE-CH-G12-SOCIO-CH05",
    "textbook_id": "CBSE-TB-G12-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Patterns of Social Inequality and Exclusion",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Patterns of Social Inequality and Exclusion from Indian Society"
  },
  {
    "id": "CBSE-CH-G12-SOCIO-CH06",
    "textbook_id": "CBSE-TB-G12-SOCIO",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "The Challenges of Cultural Diversity",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: The Challenges of Cultural Diversity from Indian Society"
  },
  {
    "id": "CBSE-CH-G12-PSYCH-CH01",
    "textbook_id": "CBSE-TB-G12-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Variations in Psychological Attributes",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Variations in Psychological Attributes from Psychology Class XII"
  },
  {
    "id": "CBSE-CH-G12-PSYCH-CH02",
    "textbook_id": "CBSE-TB-G12-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Self and Personality",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Self and Personality from Psychology Class XII"
  },
  {
    "id": "CBSE-CH-G12-PSYCH-CH03",
    "textbook_id": "CBSE-TB-G12-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Meeting Life Challenges",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Meeting Life Challenges from Psychology Class XII"
  },
  {
    "id": "CBSE-CH-G12-PSYCH-CH04",
    "textbook_id": "CBSE-TB-G12-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Psychological Disorders",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Psychological Disorders from Psychology Class XII"
  },
  {
    "id": "CBSE-CH-G12-PSYCH-CH05",
    "textbook_id": "CBSE-TB-G12-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Therapeutic Approaches",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Therapeutic Approaches from Psychology Class XII"
  },
  {
    "id": "CBSE-CH-G12-PSYCH-CH06",
    "textbook_id": "CBSE-TB-G12-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Attitude and Social Cognition",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Attitude and Social Cognition from Psychology Class XII"
  },
  {
    "id": "CBSE-CH-G12-PSYCH-CH07",
    "textbook_id": "CBSE-TB-G12-PSYCH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Social Influence and Group Processes",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Social Influence and Group Processes from Psychology Class XII"
  },
  {
    "id": "CBSE-CH-G12-HUM-ECON-CH01",
    "textbook_id": "CBSE-TB-G12-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Introduction to Macroeconomics",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Introduction to Macroeconomics from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-HUM-ECON-CH02",
    "textbook_id": "CBSE-TB-G12-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "National Income Accounting",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: National Income Accounting from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-HUM-ECON-CH03",
    "textbook_id": "CBSE-TB-G12-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Money and Banking",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Money and Banking from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-HUM-ECON-CH04",
    "textbook_id": "CBSE-TB-G12-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Determination of Income and Employment",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Determination of Income and Employment from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-HUM-ECON-CH05",
    "textbook_id": "CBSE-TB-G12-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Government Budget and the Economy",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Government Budget and the Economy from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-HUM-ECON-CH06",
    "textbook_id": "CBSE-TB-G12-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Open Economy Macroeconomics",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Open Economy Macroeconomics from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-HUM-ECON-CH07",
    "textbook_id": "CBSE-TB-G12-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Development Experience (1947-90) and Economic Reforms since 1991",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Development Experience (1947-90) and Economic Reforms since 1991 from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-HUM-ECON-CH08",
    "textbook_id": "CBSE-TB-G12-HUM-ECON",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Current Challenges facing the Indian Economy",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Current Challenges facing the Indian Economy from Introductory Macroeconomics & Development"
  },
  {
    "id": "CBSE-CH-G12-HUM-ENG-CH01",
    "textbook_id": "CBSE-TB-G12-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Last Lesson",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Last Lesson from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-HUM-ENG-CH02",
    "textbook_id": "CBSE-TB-G12-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Lost Spring",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Lost Spring from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-HUM-ENG-CH03",
    "textbook_id": "CBSE-TB-G12-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Deep Water",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Deep Water from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-HUM-ENG-CH04",
    "textbook_id": "CBSE-TB-G12-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Rattrap",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Rattrap from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-HUM-ENG-CH05",
    "textbook_id": "CBSE-TB-G12-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Indigo",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Indigo from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-HUM-ENG-CH06",
    "textbook_id": "CBSE-TB-G12-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Poets and Pancakes",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Poets and Pancakes from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-HUM-ENG-CH07",
    "textbook_id": "CBSE-TB-G12-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "The Interview",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: The Interview from Flamingo"
  },
  {
    "id": "CBSE-CH-G12-HUM-ENG-CH08",
    "textbook_id": "CBSE-TB-G12-HUM-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Going Places",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Going Places from Flamingo"
  },
  {
    "id": "CBSE-CH-G8-ENG-CH01",
    "textbook_id": "CBSE-TB-G8-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "The Wit that Won Hearts",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: The Wit that Won Hearts from Poorvi Grade 8"
  },
  {
    "id": "CBSE-CH-G8-ENG-CH02",
    "textbook_id": "CBSE-TB-G8-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "A Concrete Example",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: A Concrete Example from Poorvi Grade 8"
  },
  {
    "id": "CBSE-CH-G8-ENG-CH03",
    "textbook_id": "CBSE-TB-G8-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Wisdom Paves the Way",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Wisdom Paves the Way from Poorvi Grade 8"
  },
  {
    "id": "CBSE-CH-G8-ENG-CH04",
    "textbook_id": "CBSE-TB-G8-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "A Tale of Valour",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: A Tale of Valour from Poorvi Grade 8"
  },
  {
    "id": "CBSE-CH-G8-ENG-CH05",
    "textbook_id": "CBSE-TB-G8-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Somebody’s Mother",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Somebody’s Mother from Poorvi Grade 8"
  },
  {
    "id": "CBSE-CH-G8-ENG-CH06",
    "textbook_id": "CBSE-TB-G8-ENG",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Verghese Kurien – I Too Had a Dream",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Verghese Kurien – I Too Had a Dream from Poorvi Grade 8"
  },
  {
    "id": "CBSE-CH-G8-ENG-CH07",
    "textbook_id": "CBSE-TB-G8-ENG",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "The Case of the Fifth Word",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: The Case of the Fifth Word from Poorvi Grade 8"
  },
  {
    "id": "CBSE-CH-G8-ENG-CH08",
    "textbook_id": "CBSE-TB-G8-ENG",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "The Magic Brush of Dreams",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: The Magic Brush of Dreams from Poorvi Grade 8"
  },
  {
    "id": "CBSE-CH-G8-SOCSCI-CH01",
    "textbook_id": "CBSE-TB-G8-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "World Geography: Some Glimpses",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: World Geography: Some Glimpses from Exploring Society Grade 8"
  },
  {
    "id": "CBSE-CH-G8-SOCSCI-CH02",
    "textbook_id": "CBSE-TB-G8-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "India's Long Road to Independence",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: India's Long Road to Independence from Exploring Society Grade 8"
  },
  {
    "id": "CBSE-CH-G8-SOCSCI-CH03",
    "textbook_id": "CBSE-TB-G8-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "A Journey Through Indian Architecture",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: A Journey Through Indian Architecture from Exploring Society Grade 8"
  },
  {
    "id": "CBSE-CH-G8-SOCSCI-CH04",
    "textbook_id": "CBSE-TB-G8-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "The Role of the Judiciary in Our Society",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: The Role of the Judiciary in Our Society from Exploring Society Grade 8"
  },
  {
    "id": "CBSE-CH-G8-SOCSCI-CH05",
    "textbook_id": "CBSE-TB-G8-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Citizenship: Rights and Duties",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Citizenship: Rights and Duties from Exploring Society Grade 8"
  },
  {
    "id": "CBSE-CH-G8-SOCSCI-CH06",
    "textbook_id": "CBSE-TB-G8-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Dynamics of Population",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Dynamics of Population from Exploring Society Grade 8"
  },
  {
    "id": "CBSE-CH-G8-SOCSCI-CH07",
    "textbook_id": "CBSE-TB-G8-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "India's Urban Landscape",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: India's Urban Landscape from Exploring Society Grade 8"
  },
  {
    "id": "CBSE-CH-G8-SOCSCI-CH08",
    "textbook_id": "CBSE-TB-G8-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Cultural Currents: 13th to 17th Centuries",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Cultural Currents: 13th to 17th Centuries from Exploring Society Grade 8"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH01",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Exploration: Entering the World of Secondary Science",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Exploration: Entering the World of Secondary Science from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH02",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Cell — Structure and Functions",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Cell — Structure and Functions from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH03",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Tissues",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Tissues from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH04",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Reproduction",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Reproduction from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH05",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Diversity in Living Organisms",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Diversity in Living Organisms from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH06",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Exploring Mixtures and Their Separation",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Exploring Mixtures and Their Separation from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH07",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Structure of the Atom",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Structure of the Atom from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH08",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Atoms and Molecules",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Atoms and Molecules from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH09",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "Earth as a System: Energy, Matter and Life",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: Earth as a System: Energy, Matter and Life from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH10",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Motion",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Motion from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH11",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 11,
    "chapter_title": "Force and Laws of Motion",
    "official_sequence_order": 11,
    "description": "Official Chapter 11: Force and Laws of Motion from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH12",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 12,
    "chapter_title": "Work, Energy and Simple Machines",
    "official_sequence_order": 12,
    "description": "Official Chapter 12: Work, Energy and Simple Machines from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SCI-CH13",
    "textbook_id": "CBSE-TB-G9-SCI",
    "textbook_part_id": null,
    "chapter_number": 13,
    "chapter_title": "Sound",
    "official_sequence_order": 13,
    "description": "Official Chapter 13: Sound from Exploration (Science IX)"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH01",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Understanding Social Science",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Understanding Social Science from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH02",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Shaping of the Earth's Surface",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Shaping of the Earth's Surface from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH03",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Atmosphere and Climate",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: Atmosphere and Climate from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH04",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Early Humans and Beginning of Civilisation",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Early Humans and Beginning of Civilisation from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH05",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "State and Society (up to 1000 CE)",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: State and Society (up to 1000 CE) from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH06",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Democracy",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Democracy from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH07",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "Elections",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: Elections from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH08",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Building Blocks in Economics – The Problem of Choice",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Building Blocks in Economics – The Problem of Choice from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH09",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 9,
    "chapter_title": "The Price Puzzle – What Drives the Market",
    "official_sequence_order": 9,
    "description": "Official Chapter 9: The Price Puzzle – What Drives the Market from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G9-SOCSCI-CH10",
    "textbook_id": "CBSE-TB-G9-SOCSCI",
    "textbook_part_id": null,
    "chapter_number": 10,
    "chapter_title": "Tapestry of the Past: Medieval & Modern Themes and IKS",
    "official_sequence_order": 10,
    "description": "Official Chapter 10: Tapestry of the Past: Medieval & Modern Themes and IKS from Understanding Society Grade 9"
  },
  {
    "id": "CBSE-CH-G7-MATH-CH01",
    "textbook_id": "CBSE-TB-G7-MATH",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Large Numbers Around Us",
    "official_sequence_order": 1,
    "description": "Official Chapter 1: Large Numbers Around Us from Ganita Prakash Grade 7"
  },
  {
    "id": "CBSE-CH-G7-MATH-CH02",
    "textbook_id": "CBSE-TB-G7-MATH",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Arithmetic Expressions",
    "official_sequence_order": 2,
    "description": "Official Chapter 2: Arithmetic Expressions from Ganita Prakash Grade 7"
  },
  {
    "id": "CBSE-CH-G7-MATH-CH03",
    "textbook_id": "CBSE-TB-G7-MATH",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "A Peek Beyond the Point",
    "official_sequence_order": 3,
    "description": "Official Chapter 3: A Peek Beyond the Point from Ganita Prakash Grade 7"
  },
  {
    "id": "CBSE-CH-G7-MATH-CH04",
    "textbook_id": "CBSE-TB-G7-MATH",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Expressions Using Letter-Numbers",
    "official_sequence_order": 4,
    "description": "Official Chapter 4: Expressions Using Letter-Numbers from Ganita Prakash Grade 7"
  },
  {
    "id": "CBSE-CH-G7-MATH-CH05",
    "textbook_id": "CBSE-TB-G7-MATH",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Parallel and Intersecting",
    "official_sequence_order": 5,
    "description": "Official Chapter 5: Parallel and Intersecting from Ganita Prakash Grade 7"
  },
  {
    "id": "CBSE-CH-G7-MATH-CH06",
    "textbook_id": "CBSE-TB-G7-MATH",
    "textbook_part_id": null,
    "chapter_number": 6,
    "chapter_title": "Number Play",
    "official_sequence_order": 6,
    "description": "Official Chapter 6: Number Play from Ganita Prakash Grade 7"
  },
  {
    "id": "CBSE-CH-G7-MATH-CH07",
    "textbook_id": "CBSE-TB-G7-MATH",
    "textbook_part_id": null,
    "chapter_number": 7,
    "chapter_title": "A Tale of Three Intersecting Lines",
    "official_sequence_order": 7,
    "description": "Official Chapter 7: A Tale of Three Intersecting Lines from Ganita Prakash Grade 7"
  },
  {
    "id": "CBSE-CH-G7-MATH-CH08",
    "textbook_id": "CBSE-TB-G7-MATH",
    "textbook_part_id": null,
    "chapter_number": 8,
    "chapter_title": "Working with Fractions",
    "official_sequence_order": 8,
    "description": "Official Chapter 8: Working with Fractions from Ganita Prakash Grade 7"
  },
  {
    "id": "CBSE-CH-G7-ENG-CH01",
    "textbook_id": "CBSE-TB-G7-ENG",
    "textbook_part_id": null,
    "chapter_number": 1,
    "chapter_title": "Learning Together",
    "official_sequence_order": 1,
    "description": "Official Unit 1: Learning Together from Poorvi Grade 7"
  },
  {
    "id": "CBSE-CH-G7-ENG-CH02",
    "textbook_id": "CBSE-TB-G7-ENG",
    "textbook_part_id": null,
    "chapter_number": 2,
    "chapter_title": "Wit and Humour",
    "official_sequence_order": 2,
    "description": "Official Unit 2: Wit and Humour from Poorvi Grade 7"
  },
  {
    "id": "CBSE-CH-G7-ENG-CH03",
    "textbook_id": "CBSE-TB-G7-ENG",
    "textbook_part_id": null,
    "chapter_number": 3,
    "chapter_title": "Dreams and Discoveries",
    "official_sequence_order": 3,
    "description": "Official Unit 3: Dreams and Discoveries from Poorvi Grade 7"
  },
  {
    "id": "CBSE-CH-G7-ENG-CH04",
    "textbook_id": "CBSE-TB-G7-ENG",
    "textbook_part_id": null,
    "chapter_number": 4,
    "chapter_title": "Travel and Adventure",
    "official_sequence_order": 4,
    "description": "Official Unit 4: Travel and Adventure from Poorvi Grade 7"
  },
  {
    "id": "CBSE-CH-G7-ENG-CH05",
    "textbook_id": "CBSE-TB-G7-ENG",
    "textbook_part_id": null,
    "chapter_number": 5,
    "chapter_title": "Bravehearts",
    "official_sequence_order": 5,
    "description": "Official Unit 5: Bravehearts from Poorvi Grade 7"
  }
];

export const CBSE_SECTIONS: CbseSection[] = [
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH01",
    "section_number": "1.1",
    "section_title": "Patterns in Mathematics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH01",
    "section_number": "1.2",
    "section_title": "Patterns in Mathematics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Lines and Angles: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Lines and Angles: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH03",
    "section_number": "3.1",
    "section_title": "Number Play: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH03",
    "section_number": "3.2",
    "section_title": "Number Play: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Data Handling and Presentation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Data Handling and Presentation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Prime Time: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Prime Time: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH06",
    "section_number": "6.1",
    "section_title": "Perimeter and Area: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH06",
    "section_number": "6.2",
    "section_title": "Perimeter and Area: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH07",
    "section_number": "7.1",
    "section_title": "Fractions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH07",
    "section_number": "7.2",
    "section_title": "Fractions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Playing with Constructions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Playing with Constructions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH09",
    "section_number": "9.1",
    "section_title": "Symmetry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH09-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH09",
    "section_number": "9.2",
    "section_title": "Symmetry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH10",
    "section_number": "10.1",
    "section_title": "The Other Side of Zero: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-MATH-CH10-02",
    "chapter_id": "CBSE-CH-G6-MATH-CH10",
    "section_number": "10.2",
    "section_title": "The Other Side of Zero: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH01",
    "section_number": "1.1",
    "section_title": "The Wonderful World of Science: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH01-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH01",
    "section_number": "1.2",
    "section_title": "The Wonderful World of Science: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH02",
    "section_number": "2.1",
    "section_title": "Diversity in the Living World: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH02-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH02",
    "section_number": "2.2",
    "section_title": "Diversity in the Living World: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH03",
    "section_number": "3.1",
    "section_title": "Mindful Eating: A Path to a Healthy Body: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH03-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH03",
    "section_number": "3.2",
    "section_title": "Mindful Eating: A Path to a Healthy Body: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH04",
    "section_number": "4.1",
    "section_title": "Exploring Magnets: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH04-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH04",
    "section_number": "4.2",
    "section_title": "Exploring Magnets: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH05",
    "section_number": "5.1",
    "section_title": "Measurement of Length and Motion: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH05-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH05",
    "section_number": "5.2",
    "section_title": "Measurement of Length and Motion: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH06",
    "section_number": "6.1",
    "section_title": "Materials Around Us: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH06-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH06",
    "section_number": "6.2",
    "section_title": "Materials Around Us: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH07",
    "section_number": "7.1",
    "section_title": "Temperature and its Measurement: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH07-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH07",
    "section_number": "7.2",
    "section_title": "Temperature and its Measurement: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH08",
    "section_number": "8.1",
    "section_title": "A Journey through States of Water: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH08-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH08",
    "section_number": "8.2",
    "section_title": "A Journey through States of Water: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH09",
    "section_number": "9.1",
    "section_title": "Methods of Separation in Everyday Life: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH09-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH09",
    "section_number": "9.2",
    "section_title": "Methods of Separation in Everyday Life: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH10",
    "section_number": "10.1",
    "section_title": "Living Creatures: Exploring their Characteristics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH10-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH10",
    "section_number": "10.2",
    "section_title": "Living Creatures: Exploring their Characteristics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH11",
    "section_number": "11.1",
    "section_title": "Nature's Treasures: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH11-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH11",
    "section_number": "11.2",
    "section_title": "Nature's Treasures: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH12",
    "section_number": "12.1",
    "section_title": "Beyond Earth: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SCI-CH12-02",
    "chapter_id": "CBSE-CH-G6-SCI-CH12",
    "section_number": "12.2",
    "section_title": "Beyond Earth: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH01",
    "section_number": "1.1",
    "section_title": "Number Systems: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH01",
    "section_number": "1.2",
    "section_title": "Number Systems: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Polynomials: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Polynomials: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH03",
    "section_number": "3.1",
    "section_title": "Coordinate Geometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH03",
    "section_number": "3.2",
    "section_title": "Coordinate Geometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Linear Equations in Two Variables: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Linear Equations in Two Variables: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Introduction to Euclid's Geometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Introduction to Euclid's Geometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH06",
    "section_number": "6.1",
    "section_title": "Lines and Angles: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH06",
    "section_number": "6.2",
    "section_title": "Lines and Angles: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH07",
    "section_number": "7.1",
    "section_title": "Triangles: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH07",
    "section_number": "7.2",
    "section_title": "Triangles: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Quadrilaterals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Quadrilaterals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH09",
    "section_number": "9.1",
    "section_title": "Circles: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH09-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH09",
    "section_number": "9.2",
    "section_title": "Circles: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH10",
    "section_number": "10.1",
    "section_title": "Heron's Formula: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH10-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH10",
    "section_number": "10.2",
    "section_title": "Heron's Formula: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH11",
    "section_number": "11.1",
    "section_title": "Surface Areas and Volumes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH11-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH11",
    "section_number": "11.2",
    "section_title": "Surface Areas and Volumes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH12",
    "section_number": "12.1",
    "section_title": "Statistics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-MATH-CH12-02",
    "chapter_id": "CBSE-CH-G9-MATH-CH12",
    "section_number": "12.2",
    "section_title": "Statistics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH01",
    "section_number": "1.1",
    "section_title": "How I Taught My Grandmother to Read: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G9-ENG-CH01",
    "section_number": "1.2",
    "section_title": "How I Taught My Grandmother to Read: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH02",
    "section_number": "2.1",
    "section_title": "The Pot Maker: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G9-ENG-CH02",
    "section_number": "2.2",
    "section_title": "The Pot Maker: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Winds of Change: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G9-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Winds of Change: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH04",
    "section_number": "4.1",
    "section_title": "Vitamin-M: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G9-ENG-CH04",
    "section_number": "4.2",
    "section_title": "Vitamin-M: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH05",
    "section_number": "5.1",
    "section_title": "The World of Limitless Possibilities: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G9-ENG-CH05",
    "section_number": "5.2",
    "section_title": "The World of Limitless Possibilities: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Twin Melodies: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G9-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Twin Melodies: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH07",
    "section_number": "7.1",
    "section_title": "Carrier of Words: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G9-ENG-CH07",
    "section_number": "7.2",
    "section_title": "Carrier of Words: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH08",
    "section_number": "8.1",
    "section_title": "Follow That Dream: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G9-ENG-CH08",
    "section_number": "8.2",
    "section_title": "Follow That Dream: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH01",
    "section_number": "1.1",
    "section_title": "Real Numbers: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH01",
    "section_number": "1.2",
    "section_title": "Real Numbers: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Polynomials: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Polynomials: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH03",
    "section_number": "3.1",
    "section_title": "Pair of Linear Equations in Two Variables: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH03",
    "section_number": "3.2",
    "section_title": "Pair of Linear Equations in Two Variables: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Quadratic Equations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Quadratic Equations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Arithmetic Progressions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Arithmetic Progressions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH06",
    "section_number": "6.1",
    "section_title": "Triangles: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH06",
    "section_number": "6.2",
    "section_title": "Triangles: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH07",
    "section_number": "7.1",
    "section_title": "Coordinate Geometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH07",
    "section_number": "7.2",
    "section_title": "Coordinate Geometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Introduction to Trigonometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Introduction to Trigonometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH09",
    "section_number": "9.1",
    "section_title": "Some Applications of Trigonometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH09-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH09",
    "section_number": "9.2",
    "section_title": "Some Applications of Trigonometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH10",
    "section_number": "10.1",
    "section_title": "Circles: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH10-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH10",
    "section_number": "10.2",
    "section_title": "Circles: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH11",
    "section_number": "11.1",
    "section_title": "Areas Related to Circles: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH11-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH11",
    "section_number": "11.2",
    "section_title": "Areas Related to Circles: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH12",
    "section_number": "12.1",
    "section_title": "Surface Areas and Volumes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH12-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH12",
    "section_number": "12.2",
    "section_title": "Surface Areas and Volumes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH13",
    "section_number": "13.1",
    "section_title": "Statistics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH13-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH13",
    "section_number": "13.2",
    "section_title": "Statistics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH14-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH14",
    "section_number": "14.1",
    "section_title": "Probability: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-MATH-CH14-02",
    "chapter_id": "CBSE-CH-G10-MATH-CH14",
    "section_number": "14.2",
    "section_title": "Probability: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH01",
    "section_number": "1.1",
    "section_title": "A Letter to God: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH01",
    "section_number": "1.2",
    "section_title": "A Letter to God: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH02",
    "section_number": "2.1",
    "section_title": "Nelson Mandela: Long Walk to Freedom: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH02",
    "section_number": "2.2",
    "section_title": "Nelson Mandela: Long Walk to Freedom: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Two Stories about Flying: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Two Stories about Flying: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH04",
    "section_number": "4.1",
    "section_title": "From the Diary of Anne Frank: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH04",
    "section_number": "4.2",
    "section_title": "From the Diary of Anne Frank: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH05",
    "section_number": "5.1",
    "section_title": "Glimpses of India: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH05",
    "section_number": "5.2",
    "section_title": "Glimpses of India: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Mijbil the Otter: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Mijbil the Otter: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH07",
    "section_number": "7.1",
    "section_title": "Madam Rides the Bus: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH07",
    "section_number": "7.2",
    "section_title": "Madam Rides the Bus: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH08",
    "section_number": "8.1",
    "section_title": "The Sermon at Benares: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH08",
    "section_number": "8.2",
    "section_title": "The Sermon at Benares: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH09-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH09",
    "section_number": "9.1",
    "section_title": "The Proposal: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-ENG-CH09-02",
    "chapter_id": "CBSE-CH-G10-ENG-CH09",
    "section_number": "9.2",
    "section_title": "The Proposal: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-HIN-CH01-01",
    "chapter_id": "CBSE-CH-G10-HIN-CH01",
    "section_number": "1.1",
    "section_title": "Netaji Ka Chashma: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-HIN-CH01-02",
    "chapter_id": "CBSE-CH-G10-HIN-CH01",
    "section_number": "1.2",
    "section_title": "Netaji Ka Chashma: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-HIN-CH02-01",
    "chapter_id": "CBSE-CH-G10-HIN-CH02",
    "section_number": "2.1",
    "section_title": "Balgobin Bhagat: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-HIN-CH02-02",
    "chapter_id": "CBSE-CH-G10-HIN-CH02",
    "section_number": "2.2",
    "section_title": "Balgobin Bhagat: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-HIN-CH03-01",
    "chapter_id": "CBSE-CH-G10-HIN-CH03",
    "section_number": "3.1",
    "section_title": "Lakhnavi Andaz: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-HIN-CH03-02",
    "chapter_id": "CBSE-CH-G10-HIN-CH03",
    "section_number": "3.2",
    "section_title": "Lakhnavi Andaz: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-HIN-CH04-01",
    "chapter_id": "CBSE-CH-G10-HIN-CH04",
    "section_number": "4.1",
    "section_title": "Ek Kahani Yeh Bhi: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-HIN-CH04-02",
    "chapter_id": "CBSE-CH-G10-HIN-CH04",
    "section_number": "4.2",
    "section_title": "Ek Kahani Yeh Bhi: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH01",
    "section_number": "1.1",
    "section_title": "Exploring the Investigative World of Science: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH01-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH01",
    "section_number": "1.2",
    "section_title": "Exploring the Investigative World of Science: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH02",
    "section_number": "2.1",
    "section_title": "The Invisible Living World: Beyond Our Naked Eye: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH02-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH02",
    "section_number": "2.2",
    "section_title": "The Invisible Living World: Beyond Our Naked Eye: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH03",
    "section_number": "3.1",
    "section_title": "Health: The Ultimate Treasure: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH03-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH03",
    "section_number": "3.2",
    "section_title": "Health: The Ultimate Treasure: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH04",
    "section_number": "4.1",
    "section_title": "Electricity: Magnetic and Heating Effects: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH04-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH04",
    "section_number": "4.2",
    "section_title": "Electricity: Magnetic and Heating Effects: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH05",
    "section_number": "5.1",
    "section_title": "Exploring Forces: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH05-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH05",
    "section_number": "5.2",
    "section_title": "Exploring Forces: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH06",
    "section_number": "6.1",
    "section_title": "Pressure, Winds, Storms, and Cyclones: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH06-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH06",
    "section_number": "6.2",
    "section_title": "Pressure, Winds, Storms, and Cyclones: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH07",
    "section_number": "7.1",
    "section_title": "Particulate Nature of Matter: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH07-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH07",
    "section_number": "7.2",
    "section_title": "Particulate Nature of Matter: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH08",
    "section_number": "8.1",
    "section_title": "Nature of Matter: Elements, Compounds, and Mixtures: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH08-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH08",
    "section_number": "8.2",
    "section_title": "Nature of Matter: Elements, Compounds, and Mixtures: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH09",
    "section_number": "9.1",
    "section_title": "The Amazing World of Solutes, Solvents, and Solutions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH09-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH09",
    "section_number": "9.2",
    "section_title": "The Amazing World of Solutes, Solvents, and Solutions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH10",
    "section_number": "10.1",
    "section_title": "Light: Mirrors and Lenses: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH10-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH10",
    "section_number": "10.2",
    "section_title": "Light: Mirrors and Lenses: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH11",
    "section_number": "11.1",
    "section_title": "Keeping Time with the Skies: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH11-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH11",
    "section_number": "11.2",
    "section_title": "Keeping Time with the Skies: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH12",
    "section_number": "12.1",
    "section_title": "How Nature Works in Harmony: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH12-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH12",
    "section_number": "12.2",
    "section_title": "How Nature Works in Harmony: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH13-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH13",
    "section_number": "13.1",
    "section_title": "Our Home: Earth, a Unique Life-Sustaining Planet: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SCI-CH13-02",
    "chapter_id": "CBSE-CH-G8-SCI-CH13",
    "section_number": "13.2",
    "section_title": "Our Home: Earth, a Unique Life-Sustaining Planet: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH01",
    "section_number": "1.1",
    "section_title": "Fables and Folk Tales: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G6-ENG-CH01",
    "section_number": "1.2",
    "section_title": "Fables and Folk Tales: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH02",
    "section_number": "2.1",
    "section_title": "Friendship: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G6-ENG-CH02",
    "section_number": "2.2",
    "section_title": "Friendship: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Nurturing Nature: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G6-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Nurturing Nature: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH04",
    "section_number": "4.1",
    "section_title": "Sports and Games: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G6-ENG-CH04",
    "section_number": "4.2",
    "section_title": "Sports and Games: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH05",
    "section_number": "5.1",
    "section_title": "Culture and Tradition: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G6-ENG-CH05",
    "section_number": "5.2",
    "section_title": "Culture and Tradition: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH01",
    "section_number": "1.1",
    "section_title": "Locating Places on the Earth: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH01-02",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH01",
    "section_number": "1.2",
    "section_title": "Locating Places on the Earth: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH02",
    "section_number": "2.1",
    "section_title": "Oceans and Continents: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH02-02",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH02",
    "section_number": "2.2",
    "section_title": "Oceans and Continents: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH03",
    "section_number": "3.1",
    "section_title": "Landforms and Life: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH03-02",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH03",
    "section_number": "3.2",
    "section_title": "Landforms and Life: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH04",
    "section_number": "4.1",
    "section_title": "Timeline and Sources of History: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH04-02",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH04",
    "section_number": "4.2",
    "section_title": "Timeline and Sources of History: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH05",
    "section_number": "5.1",
    "section_title": "India, That Is Bharat: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH05-02",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH05",
    "section_number": "5.2",
    "section_title": "India, That Is Bharat: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH06",
    "section_number": "6.1",
    "section_title": "The Beginnings of Indian Civilisation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH06-02",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH06",
    "section_number": "6.2",
    "section_title": "The Beginnings of Indian Civilisation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH07",
    "section_number": "7.1",
    "section_title": "India's Cultural Roots: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH07-02",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH07",
    "section_number": "7.2",
    "section_title": "India's Cultural Roots: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-HIN-CH01-01",
    "chapter_id": "CBSE-CH-G6-HIN-CH01",
    "section_number": "1.1",
    "section_title": "Baras Raha Hai Jal: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-HIN-CH01-02",
    "chapter_id": "CBSE-CH-G6-HIN-CH01",
    "section_number": "1.2",
    "section_title": "Baras Raha Hai Jal: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-HIN-CH02-01",
    "chapter_id": "CBSE-CH-G6-HIN-CH02",
    "section_number": "2.1",
    "section_title": "Har Ki Jeet: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-HIN-CH02-02",
    "chapter_id": "CBSE-CH-G6-HIN-CH02",
    "section_number": "2.2",
    "section_title": "Har Ki Jeet: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-HIN-CH03-01",
    "chapter_id": "CBSE-CH-G6-HIN-CH03",
    "section_number": "3.1",
    "section_title": "Bansi Ki Dhun: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-HIN-CH03-02",
    "chapter_id": "CBSE-CH-G6-HIN-CH03",
    "section_number": "3.2",
    "section_title": "Bansi Ki Dhun: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-HIN-CH04-01",
    "chapter_id": "CBSE-CH-G6-HIN-CH04",
    "section_number": "4.1",
    "section_title": "Meri Maa: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-HIN-CH04-02",
    "chapter_id": "CBSE-CH-G6-HIN-CH04",
    "section_number": "4.2",
    "section_title": "Meri Maa: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH01-01",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH01",
    "section_number": "1.1",
    "section_title": "Prathama Patha: Mangalacharanam: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH01-02",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH01",
    "section_number": "1.2",
    "section_title": "Prathama Patha: Mangalacharanam: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH02-01",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH02",
    "section_number": "2.1",
    "section_title": "Dvitiya Patha: Parichaya: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH02-02",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH02",
    "section_number": "2.2",
    "section_title": "Dvitiya Patha: Parichaya: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH03-01",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH03",
    "section_number": "3.1",
    "section_title": "Tritiya Patha: Subhashitani: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH03-02",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH03",
    "section_number": "3.2",
    "section_title": "Tritiya Patha: Subhashitani: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH04-01",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH04",
    "section_number": "4.1",
    "section_title": "Chaturtha Patha: Vidyalaya: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH04-02",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH04",
    "section_number": "4.2",
    "section_title": "Chaturtha Patha: Vidyalaya: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH01",
    "section_number": "1.1",
    "section_title": "Tracing Changes Through a Thousand Years: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH01-02",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH01",
    "section_number": "1.2",
    "section_title": "Tracing Changes Through a Thousand Years: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH02",
    "section_number": "2.1",
    "section_title": "New Kings and Kingdoms: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH02-02",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH02",
    "section_number": "2.2",
    "section_title": "New Kings and Kingdoms: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH03",
    "section_number": "3.1",
    "section_title": "The Delhi Sultans: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH03-02",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH03",
    "section_number": "3.2",
    "section_title": "The Delhi Sultans: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH04",
    "section_number": "4.1",
    "section_title": "The Mughal Empire: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH04-02",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH04",
    "section_number": "4.2",
    "section_title": "The Mughal Empire: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH05",
    "section_number": "5.1",
    "section_title": "Rulers and Buildings: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH05-02",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH05",
    "section_number": "5.2",
    "section_title": "Rulers and Buildings: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH06",
    "section_number": "6.1",
    "section_title": "Towns, Traders and Craftspersons: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH06-02",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH06",
    "section_number": "6.2",
    "section_title": "Towns, Traders and Craftspersons: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH07",
    "section_number": "7.1",
    "section_title": "Tribes, Nomads and Settled Communities: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH07-02",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH07",
    "section_number": "7.2",
    "section_title": "Tribes, Nomads and Settled Communities: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-HIN-CH01-01",
    "chapter_id": "CBSE-CH-G9-HIN-CH01",
    "section_number": "1.1",
    "section_title": "Do Bailon Ki Katha: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-HIN-CH01-02",
    "chapter_id": "CBSE-CH-G9-HIN-CH01",
    "section_number": "1.2",
    "section_title": "Do Bailon Ki Katha: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-HIN-CH02-01",
    "chapter_id": "CBSE-CH-G9-HIN-CH02",
    "section_number": "2.1",
    "section_title": "Lhasa Ki Aur: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-HIN-CH02-02",
    "chapter_id": "CBSE-CH-G9-HIN-CH02",
    "section_number": "2.2",
    "section_title": "Lhasa Ki Aur: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-HIN-CH03-01",
    "chapter_id": "CBSE-CH-G9-HIN-CH03",
    "section_number": "3.1",
    "section_title": "Upbhoktavad Ki Sanskriti: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-HIN-CH03-02",
    "chapter_id": "CBSE-CH-G9-HIN-CH03",
    "section_number": "3.2",
    "section_title": "Upbhoktavad Ki Sanskriti: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-HIN-CH04-01",
    "chapter_id": "CBSE-CH-G9-HIN-CH04",
    "section_number": "4.1",
    "section_title": "Sawle Sapno Ki Yaad: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-HIN-CH04-02",
    "chapter_id": "CBSE-CH-G9-HIN-CH04",
    "section_number": "4.2",
    "section_title": "Sawle Sapno Ki Yaad: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH01",
    "section_number": "1.1",
    "section_title": "Chemical Reactions and Equations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH01-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH01",
    "section_number": "1.2",
    "section_title": "Chemical Reactions and Equations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH02",
    "section_number": "2.1",
    "section_title": "Acids, Bases and Salts: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH02-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH02",
    "section_number": "2.2",
    "section_title": "Acids, Bases and Salts: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH03",
    "section_number": "3.1",
    "section_title": "Metals and Non-metals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH03-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH03",
    "section_number": "3.2",
    "section_title": "Metals and Non-metals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH04",
    "section_number": "4.1",
    "section_title": "Carbon and its Compounds: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH04-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH04",
    "section_number": "4.2",
    "section_title": "Carbon and its Compounds: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH05",
    "section_number": "5.1",
    "section_title": "Life Processes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH05-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH05",
    "section_number": "5.2",
    "section_title": "Life Processes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH06",
    "section_number": "6.1",
    "section_title": "Control and Coordination: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH06-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH06",
    "section_number": "6.2",
    "section_title": "Control and Coordination: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH07",
    "section_number": "7.1",
    "section_title": "How do Organisms Reproduce?: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH07-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH07",
    "section_number": "7.2",
    "section_title": "How do Organisms Reproduce?: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH08",
    "section_number": "8.1",
    "section_title": "Heredity: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH08-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH08",
    "section_number": "8.2",
    "section_title": "Heredity: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH09",
    "section_number": "9.1",
    "section_title": "Light - Reflection and Refraction: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH09-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH09",
    "section_number": "9.2",
    "section_title": "Light - Reflection and Refraction: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH10",
    "section_number": "10.1",
    "section_title": "The Human Eye and the Colorful World: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH10-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH10",
    "section_number": "10.2",
    "section_title": "The Human Eye and the Colorful World: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH11",
    "section_number": "11.1",
    "section_title": "Electricity: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH11-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH11",
    "section_number": "11.2",
    "section_title": "Electricity: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH12",
    "section_number": "12.1",
    "section_title": "Magnetic Effects of Electric Current: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH12-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH12",
    "section_number": "12.2",
    "section_title": "Magnetic Effects of Electric Current: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH13-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH13",
    "section_number": "13.1",
    "section_title": "Our Environment: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SCI-CH13-02",
    "chapter_id": "CBSE-CH-G10-SCI-CH13",
    "section_number": "13.2",
    "section_title": "Our Environment: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH01",
    "section_number": "1.1",
    "section_title": "The Rise of Nationalism in Europe: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH01-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH01",
    "section_number": "1.2",
    "section_title": "The Rise of Nationalism in Europe: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH02",
    "section_number": "2.1",
    "section_title": "Nationalism in India: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH02-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH02",
    "section_number": "2.2",
    "section_title": "Nationalism in India: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH03",
    "section_number": "3.1",
    "section_title": "The Making of a Global World: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH03-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH03",
    "section_number": "3.2",
    "section_title": "The Making of a Global World: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH04",
    "section_number": "4.1",
    "section_title": "The Age of Industrialisation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH04-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH04",
    "section_number": "4.2",
    "section_title": "The Age of Industrialisation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH05",
    "section_number": "5.1",
    "section_title": "Print Culture and the Modern World: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH05-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH05",
    "section_number": "5.2",
    "section_title": "Print Culture and the Modern World: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH06",
    "section_number": "6.1",
    "section_title": "Resources and Development: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH06-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH06",
    "section_number": "6.2",
    "section_title": "Resources and Development: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH07",
    "section_number": "7.1",
    "section_title": "Forest and Wildlife Resources: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH07-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH07",
    "section_number": "7.2",
    "section_title": "Forest and Wildlife Resources: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH08-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH08",
    "section_number": "8.1",
    "section_title": "Water Resources: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH08-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH08",
    "section_number": "8.2",
    "section_title": "Water Resources: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH09-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH09",
    "section_number": "9.1",
    "section_title": "Agriculture: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH09-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH09",
    "section_number": "9.2",
    "section_title": "Agriculture: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH10-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH10",
    "section_number": "10.1",
    "section_title": "Minerals and Energy Resources: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH10-02",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH10",
    "section_number": "10.2",
    "section_title": "Minerals and Energy Resources: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH01",
    "section_number": "1.1",
    "section_title": "The Ever-Evolving World of Science: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH01-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH01",
    "section_number": "1.2",
    "section_title": "The Ever-Evolving World of Science: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH02",
    "section_number": "2.1",
    "section_title": "Exploring Substances: Acidic, Basic, and Neutral: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH02-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH02",
    "section_number": "2.2",
    "section_title": "Exploring Substances: Acidic, Basic, and Neutral: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH03",
    "section_number": "3.1",
    "section_title": "Electricity: Circuits and their Components: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH03-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH03",
    "section_number": "3.2",
    "section_title": "Electricity: Circuits and their Components: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH04",
    "section_number": "4.1",
    "section_title": "The World of Metals and Non-metals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH04-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH04",
    "section_number": "4.2",
    "section_title": "The World of Metals and Non-metals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH05",
    "section_number": "5.1",
    "section_title": "Changes Around Us: Physical and Chemical: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH05-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH05",
    "section_number": "5.2",
    "section_title": "Changes Around Us: Physical and Chemical: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH06",
    "section_number": "6.1",
    "section_title": "Adolescence: A Stage of Growth and Change: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH06-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH06",
    "section_number": "6.2",
    "section_title": "Adolescence: A Stage of Growth and Change: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH07",
    "section_number": "7.1",
    "section_title": "Heat Transfer in Nature: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH07-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH07",
    "section_number": "7.2",
    "section_title": "Heat Transfer in Nature: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH08",
    "section_number": "8.1",
    "section_title": "Measurement of Time and Motion: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH08-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH08",
    "section_number": "8.2",
    "section_title": "Measurement of Time and Motion: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH09",
    "section_number": "9.1",
    "section_title": "Life Processes in Animals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH09-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH09",
    "section_number": "9.2",
    "section_title": "Life Processes in Animals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH10",
    "section_number": "10.1",
    "section_title": "Life Processes in Plants: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH10-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH10",
    "section_number": "10.2",
    "section_title": "Life Processes in Plants: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH11",
    "section_number": "11.1",
    "section_title": "Light: Shadows and Reflections: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH11-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH11",
    "section_number": "11.2",
    "section_title": "Light: Shadows and Reflections: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH12",
    "section_number": "12.1",
    "section_title": "Earth, Moon, and the Sun: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-SCI-CH12-02",
    "chapter_id": "CBSE-CH-G7-SCI-CH12",
    "section_number": "12.2",
    "section_title": "Earth, Moon, and the Sun: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH01",
    "section_number": "1.1",
    "section_title": "A Square and A Cube: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH01",
    "section_number": "1.2",
    "section_title": "A Square and A Cube: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Power Play: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Power Play: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH03",
    "section_number": "3.1",
    "section_title": "A Story of Numbers: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH03",
    "section_number": "3.2",
    "section_title": "A Story of Numbers: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Quadrilaterals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Quadrilaterals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Number Play: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Number Play: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH06",
    "section_number": "6.1",
    "section_title": "We Distribute, Yet Things Multiply: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH06",
    "section_number": "6.2",
    "section_title": "We Distribute, Yet Things Multiply: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH07",
    "section_number": "7.1",
    "section_title": "Proportional Reasoning-1: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH07",
    "section_number": "7.2",
    "section_title": "Proportional Reasoning-1: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Fractions in Disguise: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Fractions in Disguise: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH09",
    "section_number": "9.1",
    "section_title": "The Baudhayana-Pythagoras Theorem: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH09-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH09",
    "section_number": "9.2",
    "section_title": "The Baudhayana-Pythagoras Theorem: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH10",
    "section_number": "10.1",
    "section_title": "Proportional Reasoning-2: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH10-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH10",
    "section_number": "10.2",
    "section_title": "Proportional Reasoning-2: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH11",
    "section_number": "11.1",
    "section_title": "Exploring Some Geometric Themes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH11-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH11",
    "section_number": "11.2",
    "section_title": "Exploring Some Geometric Themes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH12",
    "section_number": "12.1",
    "section_title": "Tales by Dots and Lines: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH12-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH12",
    "section_number": "12.2",
    "section_title": "Tales by Dots and Lines: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH13",
    "section_number": "13.1",
    "section_title": "Algebra Play: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH13-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH13",
    "section_number": "13.2",
    "section_title": "Algebra Play: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH14-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH14",
    "section_number": "14.1",
    "section_title": "Area: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-MATH-CH14-02",
    "chapter_id": "CBSE-CH-G8-MATH-CH14",
    "section_number": "14.2",
    "section_title": "Area: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH01-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH01",
    "section_number": "1.1",
    "section_title": "Units and Measurements: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH01-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH01",
    "section_number": "1.2",
    "section_title": "Units and Measurements: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH02-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH02",
    "section_number": "2.1",
    "section_title": "Motion in a Straight Line: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH02-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH02",
    "section_number": "2.2",
    "section_title": "Motion in a Straight Line: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH03-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH03",
    "section_number": "3.1",
    "section_title": "Motion in a Plane: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH03-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH03",
    "section_number": "3.2",
    "section_title": "Motion in a Plane: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH04-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH04",
    "section_number": "4.1",
    "section_title": "Laws of Motion: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH04-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH04",
    "section_number": "4.2",
    "section_title": "Laws of Motion: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH05-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH05",
    "section_number": "5.1",
    "section_title": "Work, Energy and Power: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH05-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH05",
    "section_number": "5.2",
    "section_title": "Work, Energy and Power: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH06-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH06",
    "section_number": "6.1",
    "section_title": "System of Particles and Rotational Motion: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH06-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH06",
    "section_number": "6.2",
    "section_title": "System of Particles and Rotational Motion: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH07-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH07",
    "section_number": "7.1",
    "section_title": "Gravitation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH07-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH07",
    "section_number": "7.2",
    "section_title": "Gravitation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH08-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH08",
    "section_number": "8.1",
    "section_title": "Mechanical Properties of Solids: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH08-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH08",
    "section_number": "8.2",
    "section_title": "Mechanical Properties of Solids: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH09-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH09",
    "section_number": "9.1",
    "section_title": "Mechanical Properties of Fluids: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH09-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH09",
    "section_number": "9.2",
    "section_title": "Mechanical Properties of Fluids: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH10-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH10",
    "section_number": "10.1",
    "section_title": "Thermal Properties of Matter: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH10-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH10",
    "section_number": "10.2",
    "section_title": "Thermal Properties of Matter: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH11-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH11",
    "section_number": "11.1",
    "section_title": "Thermodynamics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH11-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH11",
    "section_number": "11.2",
    "section_title": "Thermodynamics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH12-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH12",
    "section_number": "12.1",
    "section_title": "Kinetic Theory: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH12-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH12",
    "section_number": "12.2",
    "section_title": "Kinetic Theory: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH13-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH13",
    "section_number": "13.1",
    "section_title": "Oscillations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH13-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH13",
    "section_number": "13.2",
    "section_title": "Oscillations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH14-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH14",
    "section_number": "14.1",
    "section_title": "Waves: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PHY-CH14-02",
    "chapter_id": "CBSE-CH-G11-PHY-CH14",
    "section_number": "14.2",
    "section_title": "Waves: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH01-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH01",
    "section_number": "1.1",
    "section_title": "Some Basic Concepts of Chemistry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH01-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH01",
    "section_number": "1.2",
    "section_title": "Some Basic Concepts of Chemistry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH02-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH02",
    "section_number": "2.1",
    "section_title": "Structure of Atom: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH02-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH02",
    "section_number": "2.2",
    "section_title": "Structure of Atom: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH03-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH03",
    "section_number": "3.1",
    "section_title": "Classification of Elements and Periodicity in Properties: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH03-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH03",
    "section_number": "3.2",
    "section_title": "Classification of Elements and Periodicity in Properties: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH04-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH04",
    "section_number": "4.1",
    "section_title": "Chemical Bonding and Molecular Structure: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH04-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH04",
    "section_number": "4.2",
    "section_title": "Chemical Bonding and Molecular Structure: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH05-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH05",
    "section_number": "5.1",
    "section_title": "Chemical Thermodynamics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH05-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH05",
    "section_number": "5.2",
    "section_title": "Chemical Thermodynamics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH06-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH06",
    "section_number": "6.1",
    "section_title": "Equilibrium: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH06-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH06",
    "section_number": "6.2",
    "section_title": "Equilibrium: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH07-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH07",
    "section_number": "7.1",
    "section_title": "Redox Reactions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH07-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH07",
    "section_number": "7.2",
    "section_title": "Redox Reactions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH08-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH08",
    "section_number": "8.1",
    "section_title": "Organic Chemistry: Some Basic Principles and Techniques: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH08-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH08",
    "section_number": "8.2",
    "section_title": "Organic Chemistry: Some Basic Principles and Techniques: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH09-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH09",
    "section_number": "9.1",
    "section_title": "Hydrocarbons: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH09-02",
    "chapter_id": "CBSE-CH-G11-CHEM-CH09",
    "section_number": "9.2",
    "section_title": "Hydrocarbons: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH01",
    "section_number": "1.1",
    "section_title": "Sets: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH01",
    "section_number": "1.2",
    "section_title": "Sets: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Relations and Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Relations and Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH03",
    "section_number": "3.1",
    "section_title": "Trigonometric Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH03",
    "section_number": "3.2",
    "section_title": "Trigonometric Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Complex Numbers and Quadratic Equations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Complex Numbers and Quadratic Equations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Linear Inequalities: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Linear Inequalities: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH06",
    "section_number": "6.1",
    "section_title": "Permutations and Combinations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH06",
    "section_number": "6.2",
    "section_title": "Permutations and Combinations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH07",
    "section_number": "7.1",
    "section_title": "Binomial Theorem: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH07",
    "section_number": "7.2",
    "section_title": "Binomial Theorem: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Sequences and Series: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Sequences and Series: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH09",
    "section_number": "9.1",
    "section_title": "Straight Lines: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH09-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH09",
    "section_number": "9.2",
    "section_title": "Straight Lines: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH10",
    "section_number": "10.1",
    "section_title": "Conic Sections: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH10-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH10",
    "section_number": "10.2",
    "section_title": "Conic Sections: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH11",
    "section_number": "11.1",
    "section_title": "Introduction to Three Dimensional Geometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH11-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH11",
    "section_number": "11.2",
    "section_title": "Introduction to Three Dimensional Geometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH12",
    "section_number": "12.1",
    "section_title": "Limits and Derivatives: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH12-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH12",
    "section_number": "12.2",
    "section_title": "Limits and Derivatives: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH13",
    "section_number": "13.1",
    "section_title": "Statistics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH13-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH13",
    "section_number": "13.2",
    "section_title": "Statistics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH14-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH14",
    "section_number": "14.1",
    "section_title": "Probability: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-MATH-CH14-02",
    "chapter_id": "CBSE-CH-G11-MATH-CH14",
    "section_number": "14.2",
    "section_title": "Probability: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH01-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH01",
    "section_number": "1.1",
    "section_title": "The Living World: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH01-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH01",
    "section_number": "1.2",
    "section_title": "The Living World: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH02-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH02",
    "section_number": "2.1",
    "section_title": "Biological Classification: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH02-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH02",
    "section_number": "2.2",
    "section_title": "Biological Classification: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH03-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH03",
    "section_number": "3.1",
    "section_title": "Plant Kingdom: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH03-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH03",
    "section_number": "3.2",
    "section_title": "Plant Kingdom: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH04-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH04",
    "section_number": "4.1",
    "section_title": "Animal Kingdom: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH04-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH04",
    "section_number": "4.2",
    "section_title": "Animal Kingdom: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH05-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH05",
    "section_number": "5.1",
    "section_title": "Morphology of Flowering Plants: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH05-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH05",
    "section_number": "5.2",
    "section_title": "Morphology of Flowering Plants: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH06-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH06",
    "section_number": "6.1",
    "section_title": "Anatomy of Flowering Plants: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH06-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH06",
    "section_number": "6.2",
    "section_title": "Anatomy of Flowering Plants: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH07-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH07",
    "section_number": "7.1",
    "section_title": "Structural Organisation in Animals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH07-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH07",
    "section_number": "7.2",
    "section_title": "Structural Organisation in Animals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH08-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH08",
    "section_number": "8.1",
    "section_title": "Cell: The Unit of Life: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH08-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH08",
    "section_number": "8.2",
    "section_title": "Cell: The Unit of Life: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH09-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH09",
    "section_number": "9.1",
    "section_title": "Biomolecules: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH09-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH09",
    "section_number": "9.2",
    "section_title": "Biomolecules: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH10-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH10",
    "section_number": "10.1",
    "section_title": "Cell Cycle and Cell Division: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH10-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH10",
    "section_number": "10.2",
    "section_title": "Cell Cycle and Cell Division: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH11-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH11",
    "section_number": "11.1",
    "section_title": "Photosynthesis in Higher Plants: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH11-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH11",
    "section_number": "11.2",
    "section_title": "Photosynthesis in Higher Plants: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH12-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH12",
    "section_number": "12.1",
    "section_title": "Respiration in Plants: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH12-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH12",
    "section_number": "12.2",
    "section_title": "Respiration in Plants: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH13-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH13",
    "section_number": "13.1",
    "section_title": "Plant Growth and Development: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH13-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH13",
    "section_number": "13.2",
    "section_title": "Plant Growth and Development: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH14-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH14",
    "section_number": "14.1",
    "section_title": "Breathing and Exchange of Gases: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH14-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH14",
    "section_number": "14.2",
    "section_title": "Breathing and Exchange of Gases: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH15-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH15",
    "section_number": "15.1",
    "section_title": "Body Fluids and Circulation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH15-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH15",
    "section_number": "15.2",
    "section_title": "Body Fluids and Circulation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH16-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH16",
    "section_number": "16.1",
    "section_title": "Excretory Products and their Elimination: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH16-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH16",
    "section_number": "16.2",
    "section_title": "Excretory Products and their Elimination: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH17-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH17",
    "section_number": "17.1",
    "section_title": "Locomotion and Movement: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH17-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH17",
    "section_number": "17.2",
    "section_title": "Locomotion and Movement: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH18-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH18",
    "section_number": "18.1",
    "section_title": "Neural Control and Coordination: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH18-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH18",
    "section_number": "18.2",
    "section_title": "Neural Control and Coordination: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH19-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH19",
    "section_number": "19.1",
    "section_title": "Chemical Coordination and Integration: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BIO-CH19-02",
    "chapter_id": "CBSE-CH-G11-BIO-CH19",
    "section_number": "19.2",
    "section_title": "Chemical Coordination and Integration: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH01-01",
    "chapter_id": "CBSE-CH-G11-CS-CH01",
    "section_number": "1.1",
    "section_title": "Computer System Overview: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH01-02",
    "chapter_id": "CBSE-CH-G11-CS-CH01",
    "section_number": "1.2",
    "section_title": "Computer System Overview: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH02-01",
    "chapter_id": "CBSE-CH-G11-CS-CH02",
    "section_number": "2.1",
    "section_title": "Data Representation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH02-02",
    "chapter_id": "CBSE-CH-G11-CS-CH02",
    "section_number": "2.2",
    "section_title": "Data Representation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH03-01",
    "chapter_id": "CBSE-CH-G11-CS-CH03",
    "section_number": "3.1",
    "section_title": "Boolean Logic: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH03-02",
    "chapter_id": "CBSE-CH-G11-CS-CH03",
    "section_number": "3.2",
    "section_title": "Boolean Logic: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH04-01",
    "chapter_id": "CBSE-CH-G11-CS-CH04",
    "section_number": "4.1",
    "section_title": "Introduction to Problem Solving: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH04-02",
    "chapter_id": "CBSE-CH-G11-CS-CH04",
    "section_number": "4.2",
    "section_title": "Introduction to Problem Solving: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH05-01",
    "chapter_id": "CBSE-CH-G11-CS-CH05",
    "section_number": "5.1",
    "section_title": "Getting Started with Python: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH05-02",
    "chapter_id": "CBSE-CH-G11-CS-CH05",
    "section_number": "5.2",
    "section_title": "Getting Started with Python: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH06-01",
    "chapter_id": "CBSE-CH-G11-CS-CH06",
    "section_number": "6.1",
    "section_title": "Python Fundamentals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH06-02",
    "chapter_id": "CBSE-CH-G11-CS-CH06",
    "section_number": "6.2",
    "section_title": "Python Fundamentals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH07-01",
    "chapter_id": "CBSE-CH-G11-CS-CH07",
    "section_number": "7.1",
    "section_title": "Data Handling: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH07-02",
    "chapter_id": "CBSE-CH-G11-CS-CH07",
    "section_number": "7.2",
    "section_title": "Data Handling: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH08-01",
    "chapter_id": "CBSE-CH-G11-CS-CH08",
    "section_number": "8.1",
    "section_title": "Flow of Control: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-CS-CH08-02",
    "chapter_id": "CBSE-CH-G11-CS-CH08",
    "section_number": "8.2",
    "section_title": "Flow of Control: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH01",
    "section_number": "1.1",
    "section_title": "The Portrait of a Lady: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G11-ENG-CH01",
    "section_number": "1.2",
    "section_title": "The Portrait of a Lady: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH02",
    "section_number": "2.1",
    "section_title": "We're Not Afraid to Die... if We Can All Be Together: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G11-ENG-CH02",
    "section_number": "2.2",
    "section_title": "We're Not Afraid to Die... if We Can All Be Together: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Discovering Tut: the Saga Continues: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G11-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Discovering Tut: the Saga Continues: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH04",
    "section_number": "4.1",
    "section_title": "The Laburnum Top: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G11-ENG-CH04",
    "section_number": "4.2",
    "section_title": "The Laburnum Top: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH05",
    "section_number": "5.1",
    "section_title": "The Voice of the Rain: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G11-ENG-CH05",
    "section_number": "5.2",
    "section_title": "The Voice of the Rain: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Childhood: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G11-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Childhood: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH07",
    "section_number": "7.1",
    "section_title": "The Adventure: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G11-ENG-CH07",
    "section_number": "7.2",
    "section_title": "The Adventure: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH08",
    "section_number": "8.1",
    "section_title": "Silk Road: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G11-ENG-CH08",
    "section_number": "8.2",
    "section_title": "Silk Road: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH01-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH01",
    "section_number": "1.1",
    "section_title": "Introduction to Accounting: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH01-02",
    "chapter_id": "CBSE-CH-G11-ACC-CH01",
    "section_number": "1.2",
    "section_title": "Introduction to Accounting: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH02-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH02",
    "section_number": "2.1",
    "section_title": "Theory Base of Accounting: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH02-02",
    "chapter_id": "CBSE-CH-G11-ACC-CH02",
    "section_number": "2.2",
    "section_title": "Theory Base of Accounting: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH03-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH03",
    "section_number": "3.1",
    "section_title": "Recording of Transactions - I: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH03-02",
    "chapter_id": "CBSE-CH-G11-ACC-CH03",
    "section_number": "3.2",
    "section_title": "Recording of Transactions - I: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH04-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH04",
    "section_number": "4.1",
    "section_title": "Recording of Transactions - II: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH04-02",
    "chapter_id": "CBSE-CH-G11-ACC-CH04",
    "section_number": "4.2",
    "section_title": "Recording of Transactions - II: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH05-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH05",
    "section_number": "5.1",
    "section_title": "Bank Reconciliation Statement: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH05-02",
    "chapter_id": "CBSE-CH-G11-ACC-CH05",
    "section_number": "5.2",
    "section_title": "Bank Reconciliation Statement: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH06-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH06",
    "section_number": "6.1",
    "section_title": "Trial Balance and Rectification of Errors: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH06-02",
    "chapter_id": "CBSE-CH-G11-ACC-CH06",
    "section_number": "6.2",
    "section_title": "Trial Balance and Rectification of Errors: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH07-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH07",
    "section_number": "7.1",
    "section_title": "Depreciation, Provisions and Reserves: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH07-02",
    "chapter_id": "CBSE-CH-G11-ACC-CH07",
    "section_number": "7.2",
    "section_title": "Depreciation, Provisions and Reserves: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH08-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH08",
    "section_number": "8.1",
    "section_title": "Financial Statements - I: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ACC-CH08-02",
    "chapter_id": "CBSE-CH-G11-ACC-CH08",
    "section_number": "8.2",
    "section_title": "Financial Statements - I: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH01-01",
    "chapter_id": "CBSE-CH-G11-BST-CH01",
    "section_number": "1.1",
    "section_title": "Business, Trade and Commerce: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH01-02",
    "chapter_id": "CBSE-CH-G11-BST-CH01",
    "section_number": "1.2",
    "section_title": "Business, Trade and Commerce: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH02-01",
    "chapter_id": "CBSE-CH-G11-BST-CH02",
    "section_number": "2.1",
    "section_title": "Forms of Business Organisation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH02-02",
    "chapter_id": "CBSE-CH-G11-BST-CH02",
    "section_number": "2.2",
    "section_title": "Forms of Business Organisation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH03-01",
    "chapter_id": "CBSE-CH-G11-BST-CH03",
    "section_number": "3.1",
    "section_title": "Private, Public and Global Enterprises: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH03-02",
    "chapter_id": "CBSE-CH-G11-BST-CH03",
    "section_number": "3.2",
    "section_title": "Private, Public and Global Enterprises: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH04-01",
    "chapter_id": "CBSE-CH-G11-BST-CH04",
    "section_number": "4.1",
    "section_title": "Business Services: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH04-02",
    "chapter_id": "CBSE-CH-G11-BST-CH04",
    "section_number": "4.2",
    "section_title": "Business Services: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH05-01",
    "chapter_id": "CBSE-CH-G11-BST-CH05",
    "section_number": "5.1",
    "section_title": "Emerging Modes of Business: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH05-02",
    "chapter_id": "CBSE-CH-G11-BST-CH05",
    "section_number": "5.2",
    "section_title": "Emerging Modes of Business: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH06-01",
    "chapter_id": "CBSE-CH-G11-BST-CH06",
    "section_number": "6.1",
    "section_title": "Social Responsibilities of Business and Business Ethics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-BST-CH06-02",
    "chapter_id": "CBSE-CH-G11-BST-CH06",
    "section_number": "6.2",
    "section_title": "Social Responsibilities of Business and Business Ethics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH01-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH01",
    "section_number": "1.1",
    "section_title": "Introduction to Economics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH01-02",
    "chapter_id": "CBSE-CH-G11-ECON-CH01",
    "section_number": "1.2",
    "section_title": "Introduction to Economics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH02-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH02",
    "section_number": "2.1",
    "section_title": "Collection of Data: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH02-02",
    "chapter_id": "CBSE-CH-G11-ECON-CH02",
    "section_number": "2.2",
    "section_title": "Collection of Data: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH03-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH03",
    "section_number": "3.1",
    "section_title": "Organisation of Data: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH03-02",
    "chapter_id": "CBSE-CH-G11-ECON-CH03",
    "section_number": "3.2",
    "section_title": "Organisation of Data: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH04-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH04",
    "section_number": "4.1",
    "section_title": "Presentation of Data: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH04-02",
    "chapter_id": "CBSE-CH-G11-ECON-CH04",
    "section_number": "4.2",
    "section_title": "Presentation of Data: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH05-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH05",
    "section_number": "5.1",
    "section_title": "Measures of Central Tendency: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH05-02",
    "chapter_id": "CBSE-CH-G11-ECON-CH05",
    "section_number": "5.2",
    "section_title": "Measures of Central Tendency: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH06-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH06",
    "section_number": "6.1",
    "section_title": "Correlation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-ECON-CH06-02",
    "chapter_id": "CBSE-CH-G11-ECON-CH06",
    "section_number": "6.2",
    "section_title": "Correlation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH01",
    "section_number": "1.1",
    "section_title": "Sets: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH01",
    "section_number": "1.2",
    "section_title": "Sets: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Relations and Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Relations and Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH03",
    "section_number": "3.1",
    "section_title": "Trigonometric Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH03",
    "section_number": "3.2",
    "section_title": "Trigonometric Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Complex Numbers and Quadratic Equations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Complex Numbers and Quadratic Equations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Linear Inequalities: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Linear Inequalities: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH06",
    "section_number": "6.1",
    "section_title": "Permutations and Combinations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH06",
    "section_number": "6.2",
    "section_title": "Permutations and Combinations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH07",
    "section_number": "7.1",
    "section_title": "Binomial Theorem: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH07",
    "section_number": "7.2",
    "section_title": "Binomial Theorem: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Sequences and Series: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Sequences and Series: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH09",
    "section_number": "9.1",
    "section_title": "Straight Lines: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH09-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH09",
    "section_number": "9.2",
    "section_title": "Straight Lines: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH10",
    "section_number": "10.1",
    "section_title": "Conic Sections: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH10-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH10",
    "section_number": "10.2",
    "section_title": "Conic Sections: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH11",
    "section_number": "11.1",
    "section_title": "Introduction to Three Dimensional Geometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH11-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH11",
    "section_number": "11.2",
    "section_title": "Introduction to Three Dimensional Geometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH12",
    "section_number": "12.1",
    "section_title": "Limits and Derivatives: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH12-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH12",
    "section_number": "12.2",
    "section_title": "Limits and Derivatives: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH13",
    "section_number": "13.1",
    "section_title": "Statistics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH13-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH13",
    "section_number": "13.2",
    "section_title": "Statistics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH14-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH14",
    "section_number": "14.1",
    "section_title": "Probability: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH14-02",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH14",
    "section_number": "14.2",
    "section_title": "Probability: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH01",
    "section_number": "1.1",
    "section_title": "The Portrait of a Lady: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH01",
    "section_number": "1.2",
    "section_title": "The Portrait of a Lady: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH02",
    "section_number": "2.1",
    "section_title": "We're Not Afraid to Die... if We Can All Be Together: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH02",
    "section_number": "2.2",
    "section_title": "We're Not Afraid to Die... if We Can All Be Together: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Discovering Tut: the Saga Continues: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Discovering Tut: the Saga Continues: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH04",
    "section_number": "4.1",
    "section_title": "The Laburnum Top: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH04",
    "section_number": "4.2",
    "section_title": "The Laburnum Top: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH05",
    "section_number": "5.1",
    "section_title": "The Voice of the Rain: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH05",
    "section_number": "5.2",
    "section_title": "The Voice of the Rain: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Childhood: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Childhood: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH07",
    "section_number": "7.1",
    "section_title": "The Adventure: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH07",
    "section_number": "7.2",
    "section_title": "The Adventure: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH08",
    "section_number": "8.1",
    "section_title": "Silk Road: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH08",
    "section_number": "8.2",
    "section_title": "Silk Road: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH01-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH01",
    "section_number": "1.1",
    "section_title": "Writing and City Life: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH01-02",
    "chapter_id": "CBSE-CH-G11-HIST-CH01",
    "section_number": "1.2",
    "section_title": "Writing and City Life: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH02-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH02",
    "section_number": "2.1",
    "section_title": "An Empire Across Three Continents: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH02-02",
    "chapter_id": "CBSE-CH-G11-HIST-CH02",
    "section_number": "2.2",
    "section_title": "An Empire Across Three Continents: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH03-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH03",
    "section_number": "3.1",
    "section_title": "Nomadic Empires: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH03-02",
    "chapter_id": "CBSE-CH-G11-HIST-CH03",
    "section_number": "3.2",
    "section_title": "Nomadic Empires: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH04-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH04",
    "section_number": "4.1",
    "section_title": "The Three Orders: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH04-02",
    "chapter_id": "CBSE-CH-G11-HIST-CH04",
    "section_number": "4.2",
    "section_title": "The Three Orders: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH05-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH05",
    "section_number": "5.1",
    "section_title": "Changing Cultural Traditions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HIST-CH05-02",
    "chapter_id": "CBSE-CH-G11-HIST-CH05",
    "section_number": "5.2",
    "section_title": "Changing Cultural Traditions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH01-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH01",
    "section_number": "1.1",
    "section_title": "Constitution: Why and How?: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH01-02",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH01",
    "section_number": "1.2",
    "section_title": "Constitution: Why and How?: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH02-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH02",
    "section_number": "2.1",
    "section_title": "Rights in the Indian Constitution: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH02-02",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH02",
    "section_number": "2.2",
    "section_title": "Rights in the Indian Constitution: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH03-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH03",
    "section_number": "3.1",
    "section_title": "Election and Representation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH03-02",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH03",
    "section_number": "3.2",
    "section_title": "Election and Representation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH04-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH04",
    "section_number": "4.1",
    "section_title": "Executive: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH04-02",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH04",
    "section_number": "4.2",
    "section_title": "Executive: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH05-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH05",
    "section_number": "5.1",
    "section_title": "Legislature: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH05-02",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH05",
    "section_number": "5.2",
    "section_title": "Legislature: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH06-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH06",
    "section_number": "6.1",
    "section_title": "Judiciary: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH06-02",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH06",
    "section_number": "6.2",
    "section_title": "Judiciary: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH01-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH01",
    "section_number": "1.1",
    "section_title": "Geography as a Discipline: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH01-02",
    "chapter_id": "CBSE-CH-G11-GEOG-CH01",
    "section_number": "1.2",
    "section_title": "Geography as a Discipline: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH02-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH02",
    "section_number": "2.1",
    "section_title": "The Origin and Evolution of the Earth: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH02-02",
    "chapter_id": "CBSE-CH-G11-GEOG-CH02",
    "section_number": "2.2",
    "section_title": "The Origin and Evolution of the Earth: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH03-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH03",
    "section_number": "3.1",
    "section_title": "Interior of the Earth: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH03-02",
    "chapter_id": "CBSE-CH-G11-GEOG-CH03",
    "section_number": "3.2",
    "section_title": "Interior of the Earth: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH04-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH04",
    "section_number": "4.1",
    "section_title": "Distribution of Oceans and Continents: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH04-02",
    "chapter_id": "CBSE-CH-G11-GEOG-CH04",
    "section_number": "4.2",
    "section_title": "Distribution of Oceans and Continents: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH05-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH05",
    "section_number": "5.1",
    "section_title": "Geomorphic Processes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH05-02",
    "chapter_id": "CBSE-CH-G11-GEOG-CH05",
    "section_number": "5.2",
    "section_title": "Geomorphic Processes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH01-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH01",
    "section_number": "1.1",
    "section_title": "Sociology and Society: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH01-02",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH01",
    "section_number": "1.2",
    "section_title": "Sociology and Society: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH02-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH02",
    "section_number": "2.1",
    "section_title": "Terms, Concepts and their use in Sociology: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH02-02",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH02",
    "section_number": "2.2",
    "section_title": "Terms, Concepts and their use in Sociology: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH03-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH03",
    "section_number": "3.1",
    "section_title": "Understanding Social Institutions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH03-02",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH03",
    "section_number": "3.2",
    "section_title": "Understanding Social Institutions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH04-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH04",
    "section_number": "4.1",
    "section_title": "Culture and Socialisation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH04-02",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH04",
    "section_number": "4.2",
    "section_title": "Culture and Socialisation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH05-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH05",
    "section_number": "5.1",
    "section_title": "Doing Sociology: Research Methods: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH05-02",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH05",
    "section_number": "5.2",
    "section_title": "Doing Sociology: Research Methods: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH01-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH01",
    "section_number": "1.1",
    "section_title": "What is Psychology?: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH01-02",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH01",
    "section_number": "1.2",
    "section_title": "What is Psychology?: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH02-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH02",
    "section_number": "2.1",
    "section_title": "Methods of Enquiry in Psychology: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH02-02",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH02",
    "section_number": "2.2",
    "section_title": "Methods of Enquiry in Psychology: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH03-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH03",
    "section_number": "3.1",
    "section_title": "The Bases of Human Behaviour: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH03-02",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH03",
    "section_number": "3.2",
    "section_title": "The Bases of Human Behaviour: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH04-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH04",
    "section_number": "4.1",
    "section_title": "Human Development: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH04-02",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH04",
    "section_number": "4.2",
    "section_title": "Human Development: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH05-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH05",
    "section_number": "5.1",
    "section_title": "Sensory, Attentional and Perceptual Processes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH05-02",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH05",
    "section_number": "5.2",
    "section_title": "Sensory, Attentional and Perceptual Processes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH06-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH06",
    "section_number": "6.1",
    "section_title": "Learning: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH06-02",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH06",
    "section_number": "6.2",
    "section_title": "Learning: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH07-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH07",
    "section_number": "7.1",
    "section_title": "Human Memory: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH07-02",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH07",
    "section_number": "7.2",
    "section_title": "Human Memory: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH01-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH01",
    "section_number": "1.1",
    "section_title": "Introduction to Economics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH01-02",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH01",
    "section_number": "1.2",
    "section_title": "Introduction to Economics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH02-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH02",
    "section_number": "2.1",
    "section_title": "Collection of Data: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH02-02",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH02",
    "section_number": "2.2",
    "section_title": "Collection of Data: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH03-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH03",
    "section_number": "3.1",
    "section_title": "Organisation of Data: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH03-02",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH03",
    "section_number": "3.2",
    "section_title": "Organisation of Data: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH04-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH04",
    "section_number": "4.1",
    "section_title": "Presentation of Data: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH04-02",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH04",
    "section_number": "4.2",
    "section_title": "Presentation of Data: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH05-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH05",
    "section_number": "5.1",
    "section_title": "Measures of Central Tendency: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH05-02",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH05",
    "section_number": "5.2",
    "section_title": "Measures of Central Tendency: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH06-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH06",
    "section_number": "6.1",
    "section_title": "Correlation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH06-02",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH06",
    "section_number": "6.2",
    "section_title": "Correlation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH01",
    "section_number": "1.1",
    "section_title": "The Portrait of a Lady: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH01",
    "section_number": "1.2",
    "section_title": "The Portrait of a Lady: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH02",
    "section_number": "2.1",
    "section_title": "We're Not Afraid to Die... if We Can All Be Together: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH02",
    "section_number": "2.2",
    "section_title": "We're Not Afraid to Die... if We Can All Be Together: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Discovering Tut: the Saga Continues: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Discovering Tut: the Saga Continues: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH04",
    "section_number": "4.1",
    "section_title": "The Laburnum Top: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH04",
    "section_number": "4.2",
    "section_title": "The Laburnum Top: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH05",
    "section_number": "5.1",
    "section_title": "The Voice of the Rain: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH05",
    "section_number": "5.2",
    "section_title": "The Voice of the Rain: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Childhood: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Childhood: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH07",
    "section_number": "7.1",
    "section_title": "The Adventure: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH07",
    "section_number": "7.2",
    "section_title": "The Adventure: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH08",
    "section_number": "8.1",
    "section_title": "Silk Road: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH08",
    "section_number": "8.2",
    "section_title": "Silk Road: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH01-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH01",
    "section_number": "1.1",
    "section_title": "Electric Charges and Fields: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH01-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH01",
    "section_number": "1.2",
    "section_title": "Electric Charges and Fields: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH02-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH02",
    "section_number": "2.1",
    "section_title": "Electrostatic Potential and Capacitance: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH02-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH02",
    "section_number": "2.2",
    "section_title": "Electrostatic Potential and Capacitance: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH03-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH03",
    "section_number": "3.1",
    "section_title": "Current Electricity: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH03-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH03",
    "section_number": "3.2",
    "section_title": "Current Electricity: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH04-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH04",
    "section_number": "4.1",
    "section_title": "Moving Charges and Magnetism: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH04-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH04",
    "section_number": "4.2",
    "section_title": "Moving Charges and Magnetism: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH05-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH05",
    "section_number": "5.1",
    "section_title": "Magnetism and Matter: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH05-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH05",
    "section_number": "5.2",
    "section_title": "Magnetism and Matter: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH06-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH06",
    "section_number": "6.1",
    "section_title": "Electromagnetic Induction: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH06-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH06",
    "section_number": "6.2",
    "section_title": "Electromagnetic Induction: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH07-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH07",
    "section_number": "7.1",
    "section_title": "Alternating Current: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH07-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH07",
    "section_number": "7.2",
    "section_title": "Alternating Current: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH08-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH08",
    "section_number": "8.1",
    "section_title": "Electromagnetic Waves: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH08-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH08",
    "section_number": "8.2",
    "section_title": "Electromagnetic Waves: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH09-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH09",
    "section_number": "9.1",
    "section_title": "Ray Optics and Optical Instruments: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH09-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH09",
    "section_number": "9.2",
    "section_title": "Ray Optics and Optical Instruments: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH10-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH10",
    "section_number": "10.1",
    "section_title": "Wave Optics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH10-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH10",
    "section_number": "10.2",
    "section_title": "Wave Optics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH11-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH11",
    "section_number": "11.1",
    "section_title": "Dual Nature of Radiation and Matter: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH11-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH11",
    "section_number": "11.2",
    "section_title": "Dual Nature of Radiation and Matter: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH12-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH12",
    "section_number": "12.1",
    "section_title": "Atoms: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH12-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH12",
    "section_number": "12.2",
    "section_title": "Atoms: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH13-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH13",
    "section_number": "13.1",
    "section_title": "Nuclei: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH13-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH13",
    "section_number": "13.2",
    "section_title": "Nuclei: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH14-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH14",
    "section_number": "14.1",
    "section_title": "Semiconductor Electronics: Materials, Devices and Simple Circuits: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PHY-CH14-02",
    "chapter_id": "CBSE-CH-G12-PHY-CH14",
    "section_number": "14.2",
    "section_title": "Semiconductor Electronics: Materials, Devices and Simple Circuits: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH01-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH01",
    "section_number": "1.1",
    "section_title": "Solutions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH01-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH01",
    "section_number": "1.2",
    "section_title": "Solutions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH02-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH02",
    "section_number": "2.1",
    "section_title": "Electrochemistry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH02-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH02",
    "section_number": "2.2",
    "section_title": "Electrochemistry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH03-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH03",
    "section_number": "3.1",
    "section_title": "Chemical Kinetics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH03-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH03",
    "section_number": "3.2",
    "section_title": "Chemical Kinetics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH04-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH04",
    "section_number": "4.1",
    "section_title": "The d- and f- Block Elements: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH04-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH04",
    "section_number": "4.2",
    "section_title": "The d- and f- Block Elements: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH05-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH05",
    "section_number": "5.1",
    "section_title": "Coordination Compounds: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH05-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH05",
    "section_number": "5.2",
    "section_title": "Coordination Compounds: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH06-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH06",
    "section_number": "6.1",
    "section_title": "Haloalkanes and Haloarenes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH06-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH06",
    "section_number": "6.2",
    "section_title": "Haloalkanes and Haloarenes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH07-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH07",
    "section_number": "7.1",
    "section_title": "Alcohols, Phenols and Ethers: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH07-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH07",
    "section_number": "7.2",
    "section_title": "Alcohols, Phenols and Ethers: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH08-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH08",
    "section_number": "8.1",
    "section_title": "Aldehydes, Ketones and Carboxylic Acids: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH08-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH08",
    "section_number": "8.2",
    "section_title": "Aldehydes, Ketones and Carboxylic Acids: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH09-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH09",
    "section_number": "9.1",
    "section_title": "Amines: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH09-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH09",
    "section_number": "9.2",
    "section_title": "Amines: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH10-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH10",
    "section_number": "10.1",
    "section_title": "Biomolecules: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH10-02",
    "chapter_id": "CBSE-CH-G12-CHEM-CH10",
    "section_number": "10.2",
    "section_title": "Biomolecules: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH01",
    "section_number": "1.1",
    "section_title": "Relations and Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH01",
    "section_number": "1.2",
    "section_title": "Relations and Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Inverse Trigonometric Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Inverse Trigonometric Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH03",
    "section_number": "3.1",
    "section_title": "Matrices: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH03",
    "section_number": "3.2",
    "section_title": "Matrices: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Determinants: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Determinants: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Continuity and Differentiability: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Continuity and Differentiability: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH06",
    "section_number": "6.1",
    "section_title": "Application of Derivatives: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH06",
    "section_number": "6.2",
    "section_title": "Application of Derivatives: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH07",
    "section_number": "7.1",
    "section_title": "Integrals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH07",
    "section_number": "7.2",
    "section_title": "Integrals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Application of Integrals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Application of Integrals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH09",
    "section_number": "9.1",
    "section_title": "Differential Equations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH09-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH09",
    "section_number": "9.2",
    "section_title": "Differential Equations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH10",
    "section_number": "10.1",
    "section_title": "Vector Algebra: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH10-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH10",
    "section_number": "10.2",
    "section_title": "Vector Algebra: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH11",
    "section_number": "11.1",
    "section_title": "Three Dimensional Geometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH11-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH11",
    "section_number": "11.2",
    "section_title": "Three Dimensional Geometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH12",
    "section_number": "12.1",
    "section_title": "Linear Programming: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH12-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH12",
    "section_number": "12.2",
    "section_title": "Linear Programming: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH13",
    "section_number": "13.1",
    "section_title": "Probability: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-MATH-CH13-02",
    "chapter_id": "CBSE-CH-G12-MATH-CH13",
    "section_number": "13.2",
    "section_title": "Probability: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH01-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH01",
    "section_number": "1.1",
    "section_title": "Sexual Reproduction in Flowering Plants: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH01-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH01",
    "section_number": "1.2",
    "section_title": "Sexual Reproduction in Flowering Plants: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH02-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH02",
    "section_number": "2.1",
    "section_title": "Human Reproduction: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH02-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH02",
    "section_number": "2.2",
    "section_title": "Human Reproduction: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH03-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH03",
    "section_number": "3.1",
    "section_title": "Reproductive Health: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH03-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH03",
    "section_number": "3.2",
    "section_title": "Reproductive Health: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH04-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH04",
    "section_number": "4.1",
    "section_title": "Principles of Inheritance and Variation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH04-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH04",
    "section_number": "4.2",
    "section_title": "Principles of Inheritance and Variation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH05-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH05",
    "section_number": "5.1",
    "section_title": "Molecular Basis of Inheritance: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH05-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH05",
    "section_number": "5.2",
    "section_title": "Molecular Basis of Inheritance: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH06-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH06",
    "section_number": "6.1",
    "section_title": "Evolution: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH06-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH06",
    "section_number": "6.2",
    "section_title": "Evolution: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH07-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH07",
    "section_number": "7.1",
    "section_title": "Human Health and Disease: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH07-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH07",
    "section_number": "7.2",
    "section_title": "Human Health and Disease: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH08-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH08",
    "section_number": "8.1",
    "section_title": "Microbes in Human Welfare: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH08-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH08",
    "section_number": "8.2",
    "section_title": "Microbes in Human Welfare: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH09-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH09",
    "section_number": "9.1",
    "section_title": "Biotechnology: Principles and Processes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH09-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH09",
    "section_number": "9.2",
    "section_title": "Biotechnology: Principles and Processes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH10-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH10",
    "section_number": "10.1",
    "section_title": "Biotechnology and its Applications: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH10-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH10",
    "section_number": "10.2",
    "section_title": "Biotechnology and its Applications: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH11-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH11",
    "section_number": "11.1",
    "section_title": "Organisms and Populations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH11-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH11",
    "section_number": "11.2",
    "section_title": "Organisms and Populations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH12-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH12",
    "section_number": "12.1",
    "section_title": "Ecosystem: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH12-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH12",
    "section_number": "12.2",
    "section_title": "Ecosystem: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH13-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH13",
    "section_number": "13.1",
    "section_title": "Biodiversity and Conservation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BIO-CH13-02",
    "chapter_id": "CBSE-CH-G12-BIO-CH13",
    "section_number": "13.2",
    "section_title": "Biodiversity and Conservation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH01-01",
    "chapter_id": "CBSE-CH-G12-CS-CH01",
    "section_number": "1.1",
    "section_title": "Python Revision Tour: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH01-02",
    "chapter_id": "CBSE-CH-G12-CS-CH01",
    "section_number": "1.2",
    "section_title": "Python Revision Tour: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH02-01",
    "chapter_id": "CBSE-CH-G12-CS-CH02",
    "section_number": "2.1",
    "section_title": "Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH02-02",
    "chapter_id": "CBSE-CH-G12-CS-CH02",
    "section_number": "2.2",
    "section_title": "Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH03-01",
    "chapter_id": "CBSE-CH-G12-CS-CH03",
    "section_number": "3.1",
    "section_title": "Using Python Libraries: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH03-02",
    "chapter_id": "CBSE-CH-G12-CS-CH03",
    "section_number": "3.2",
    "section_title": "Using Python Libraries: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH04-01",
    "chapter_id": "CBSE-CH-G12-CS-CH04",
    "section_number": "4.1",
    "section_title": "File Handling: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH04-02",
    "chapter_id": "CBSE-CH-G12-CS-CH04",
    "section_number": "4.2",
    "section_title": "File Handling: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH05-01",
    "chapter_id": "CBSE-CH-G12-CS-CH05",
    "section_number": "5.1",
    "section_title": "Recursion: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH05-02",
    "chapter_id": "CBSE-CH-G12-CS-CH05",
    "section_number": "5.2",
    "section_title": "Recursion: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH06-01",
    "chapter_id": "CBSE-CH-G12-CS-CH06",
    "section_number": "6.1",
    "section_title": "Data Structures: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH06-02",
    "chapter_id": "CBSE-CH-G12-CS-CH06",
    "section_number": "6.2",
    "section_title": "Data Structures: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH07-01",
    "chapter_id": "CBSE-CH-G12-CS-CH07",
    "section_number": "7.1",
    "section_title": "Computer Networks: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-CS-CH07-02",
    "chapter_id": "CBSE-CH-G12-CS-CH07",
    "section_number": "7.2",
    "section_title": "Computer Networks: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH01",
    "section_number": "1.1",
    "section_title": "The Last Lesson: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G12-ENG-CH01",
    "section_number": "1.2",
    "section_title": "The Last Lesson: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH02",
    "section_number": "2.1",
    "section_title": "Lost Spring: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G12-ENG-CH02",
    "section_number": "2.2",
    "section_title": "Lost Spring: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Deep Water: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G12-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Deep Water: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH04",
    "section_number": "4.1",
    "section_title": "The Rattrap: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G12-ENG-CH04",
    "section_number": "4.2",
    "section_title": "The Rattrap: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH05",
    "section_number": "5.1",
    "section_title": "Indigo: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G12-ENG-CH05",
    "section_number": "5.2",
    "section_title": "Indigo: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Poets and Pancakes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G12-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Poets and Pancakes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH07",
    "section_number": "7.1",
    "section_title": "The Interview: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G12-ENG-CH07",
    "section_number": "7.2",
    "section_title": "The Interview: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH08",
    "section_number": "8.1",
    "section_title": "Going Places: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G12-ENG-CH08",
    "section_number": "8.2",
    "section_title": "Going Places: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH01-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH01",
    "section_number": "1.1",
    "section_title": "Accounting for Partnership: Basic Concepts: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH01-02",
    "chapter_id": "CBSE-CH-G12-ACC-CH01",
    "section_number": "1.2",
    "section_title": "Accounting for Partnership: Basic Concepts: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH02-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH02",
    "section_number": "2.1",
    "section_title": "Reconstitution of a Partnership Firm - Admission of a Partner: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH02-02",
    "chapter_id": "CBSE-CH-G12-ACC-CH02",
    "section_number": "2.2",
    "section_title": "Reconstitution of a Partnership Firm - Admission of a Partner: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH03-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH03",
    "section_number": "3.1",
    "section_title": "Reconstitution of a Partnership Firm - Retirement/Death of a Partner: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH03-02",
    "chapter_id": "CBSE-CH-G12-ACC-CH03",
    "section_number": "3.2",
    "section_title": "Reconstitution of a Partnership Firm - Retirement/Death of a Partner: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH04-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH04",
    "section_number": "4.1",
    "section_title": "Dissolution of Partnership Firm: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH04-02",
    "chapter_id": "CBSE-CH-G12-ACC-CH04",
    "section_number": "4.2",
    "section_title": "Dissolution of Partnership Firm: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH05-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH05",
    "section_number": "5.1",
    "section_title": "Accounting for Share Capital: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH05-02",
    "chapter_id": "CBSE-CH-G12-ACC-CH05",
    "section_number": "5.2",
    "section_title": "Accounting for Share Capital: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH06-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH06",
    "section_number": "6.1",
    "section_title": "Issue and Redemption of Debentures: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH06-02",
    "chapter_id": "CBSE-CH-G12-ACC-CH06",
    "section_number": "6.2",
    "section_title": "Issue and Redemption of Debentures: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH07-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH07",
    "section_number": "7.1",
    "section_title": "Financial Statements of a Company: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH07-02",
    "chapter_id": "CBSE-CH-G12-ACC-CH07",
    "section_number": "7.2",
    "section_title": "Financial Statements of a Company: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH08-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH08",
    "section_number": "8.1",
    "section_title": "Analysis of Financial Statements: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ACC-CH08-02",
    "chapter_id": "CBSE-CH-G12-ACC-CH08",
    "section_number": "8.2",
    "section_title": "Analysis of Financial Statements: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH01-01",
    "chapter_id": "CBSE-CH-G12-BST-CH01",
    "section_number": "1.1",
    "section_title": "Nature and Significance of Management: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH01-02",
    "chapter_id": "CBSE-CH-G12-BST-CH01",
    "section_number": "1.2",
    "section_title": "Nature and Significance of Management: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH02-01",
    "chapter_id": "CBSE-CH-G12-BST-CH02",
    "section_number": "2.1",
    "section_title": "Principles of Management: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH02-02",
    "chapter_id": "CBSE-CH-G12-BST-CH02",
    "section_number": "2.2",
    "section_title": "Principles of Management: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH03-01",
    "chapter_id": "CBSE-CH-G12-BST-CH03",
    "section_number": "3.1",
    "section_title": "Business Environment: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH03-02",
    "chapter_id": "CBSE-CH-G12-BST-CH03",
    "section_number": "3.2",
    "section_title": "Business Environment: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH04-01",
    "chapter_id": "CBSE-CH-G12-BST-CH04",
    "section_number": "4.1",
    "section_title": "Planning: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH04-02",
    "chapter_id": "CBSE-CH-G12-BST-CH04",
    "section_number": "4.2",
    "section_title": "Planning: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH05-01",
    "chapter_id": "CBSE-CH-G12-BST-CH05",
    "section_number": "5.1",
    "section_title": "Organising: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH05-02",
    "chapter_id": "CBSE-CH-G12-BST-CH05",
    "section_number": "5.2",
    "section_title": "Organising: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH06-01",
    "chapter_id": "CBSE-CH-G12-BST-CH06",
    "section_number": "6.1",
    "section_title": "Staffing: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH06-02",
    "chapter_id": "CBSE-CH-G12-BST-CH06",
    "section_number": "6.2",
    "section_title": "Staffing: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH07-01",
    "chapter_id": "CBSE-CH-G12-BST-CH07",
    "section_number": "7.1",
    "section_title": "Directing: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH07-02",
    "chapter_id": "CBSE-CH-G12-BST-CH07",
    "section_number": "7.2",
    "section_title": "Directing: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH08-01",
    "chapter_id": "CBSE-CH-G12-BST-CH08",
    "section_number": "8.1",
    "section_title": "Controlling: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH08-02",
    "chapter_id": "CBSE-CH-G12-BST-CH08",
    "section_number": "8.2",
    "section_title": "Controlling: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH09-01",
    "chapter_id": "CBSE-CH-G12-BST-CH09",
    "section_number": "9.1",
    "section_title": "Financial Management: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH09-02",
    "chapter_id": "CBSE-CH-G12-BST-CH09",
    "section_number": "9.2",
    "section_title": "Financial Management: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH10-01",
    "chapter_id": "CBSE-CH-G12-BST-CH10",
    "section_number": "10.1",
    "section_title": "Financial Markets: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH10-02",
    "chapter_id": "CBSE-CH-G12-BST-CH10",
    "section_number": "10.2",
    "section_title": "Financial Markets: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH11-01",
    "chapter_id": "CBSE-CH-G12-BST-CH11",
    "section_number": "11.1",
    "section_title": "Marketing Management: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH11-02",
    "chapter_id": "CBSE-CH-G12-BST-CH11",
    "section_number": "11.2",
    "section_title": "Marketing Management: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH12-01",
    "chapter_id": "CBSE-CH-G12-BST-CH12",
    "section_number": "12.1",
    "section_title": "Consumer Protection: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-BST-CH12-02",
    "chapter_id": "CBSE-CH-G12-BST-CH12",
    "section_number": "12.2",
    "section_title": "Consumer Protection: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH01-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH01",
    "section_number": "1.1",
    "section_title": "Introduction to Macroeconomics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH01-02",
    "chapter_id": "CBSE-CH-G12-ECON-CH01",
    "section_number": "1.2",
    "section_title": "Introduction to Macroeconomics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH02-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH02",
    "section_number": "2.1",
    "section_title": "National Income Accounting: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH02-02",
    "chapter_id": "CBSE-CH-G12-ECON-CH02",
    "section_number": "2.2",
    "section_title": "National Income Accounting: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH03-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH03",
    "section_number": "3.1",
    "section_title": "Money and Banking: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH03-02",
    "chapter_id": "CBSE-CH-G12-ECON-CH03",
    "section_number": "3.2",
    "section_title": "Money and Banking: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH04-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH04",
    "section_number": "4.1",
    "section_title": "Determination of Income and Employment: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH04-02",
    "chapter_id": "CBSE-CH-G12-ECON-CH04",
    "section_number": "4.2",
    "section_title": "Determination of Income and Employment: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH05-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH05",
    "section_number": "5.1",
    "section_title": "Government Budget and the Economy: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH05-02",
    "chapter_id": "CBSE-CH-G12-ECON-CH05",
    "section_number": "5.2",
    "section_title": "Government Budget and the Economy: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH06-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH06",
    "section_number": "6.1",
    "section_title": "Open Economy Macroeconomics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH06-02",
    "chapter_id": "CBSE-CH-G12-ECON-CH06",
    "section_number": "6.2",
    "section_title": "Open Economy Macroeconomics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH07-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH07",
    "section_number": "7.1",
    "section_title": "Development Experience (1947-90) and Economic Reforms since 1991: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH07-02",
    "chapter_id": "CBSE-CH-G12-ECON-CH07",
    "section_number": "7.2",
    "section_title": "Development Experience (1947-90) and Economic Reforms since 1991: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH08-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH08",
    "section_number": "8.1",
    "section_title": "Current Challenges facing the Indian Economy: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-ECON-CH08-02",
    "chapter_id": "CBSE-CH-G12-ECON-CH08",
    "section_number": "8.2",
    "section_title": "Current Challenges facing the Indian Economy: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH01",
    "section_number": "1.1",
    "section_title": "Relations and Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH01",
    "section_number": "1.2",
    "section_title": "Relations and Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Inverse Trigonometric Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Inverse Trigonometric Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH03",
    "section_number": "3.1",
    "section_title": "Matrices: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH03",
    "section_number": "3.2",
    "section_title": "Matrices: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Determinants: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Determinants: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Continuity and Differentiability: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Continuity and Differentiability: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH06",
    "section_number": "6.1",
    "section_title": "Application of Derivatives: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH06",
    "section_number": "6.2",
    "section_title": "Application of Derivatives: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH07",
    "section_number": "7.1",
    "section_title": "Integrals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH07",
    "section_number": "7.2",
    "section_title": "Integrals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Application of Integrals: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Application of Integrals: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH09",
    "section_number": "9.1",
    "section_title": "Differential Equations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH09-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH09",
    "section_number": "9.2",
    "section_title": "Differential Equations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH10",
    "section_number": "10.1",
    "section_title": "Vector Algebra: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH10-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH10",
    "section_number": "10.2",
    "section_title": "Vector Algebra: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH11",
    "section_number": "11.1",
    "section_title": "Three Dimensional Geometry: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH11-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH11",
    "section_number": "11.2",
    "section_title": "Three Dimensional Geometry: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH12",
    "section_number": "12.1",
    "section_title": "Linear Programming: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH12-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH12",
    "section_number": "12.2",
    "section_title": "Linear Programming: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH13",
    "section_number": "13.1",
    "section_title": "Probability: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH13-02",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH13",
    "section_number": "13.2",
    "section_title": "Probability: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH01",
    "section_number": "1.1",
    "section_title": "The Last Lesson: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH01",
    "section_number": "1.2",
    "section_title": "The Last Lesson: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH02",
    "section_number": "2.1",
    "section_title": "Lost Spring: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH02",
    "section_number": "2.2",
    "section_title": "Lost Spring: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Deep Water: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Deep Water: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH04",
    "section_number": "4.1",
    "section_title": "The Rattrap: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH04",
    "section_number": "4.2",
    "section_title": "The Rattrap: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH05",
    "section_number": "5.1",
    "section_title": "Indigo: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH05",
    "section_number": "5.2",
    "section_title": "Indigo: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Poets and Pancakes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Poets and Pancakes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH07",
    "section_number": "7.1",
    "section_title": "The Interview: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH07",
    "section_number": "7.2",
    "section_title": "The Interview: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH08",
    "section_number": "8.1",
    "section_title": "Going Places: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH08",
    "section_number": "8.2",
    "section_title": "Going Places: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH01-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH01",
    "section_number": "1.1",
    "section_title": "Bricks, Beads and Bones: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH01-02",
    "chapter_id": "CBSE-CH-G12-HIST-CH01",
    "section_number": "1.2",
    "section_title": "Bricks, Beads and Bones: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH02-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH02",
    "section_number": "2.1",
    "section_title": "Kings, Farmers and Towns: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH02-02",
    "chapter_id": "CBSE-CH-G12-HIST-CH02",
    "section_number": "2.2",
    "section_title": "Kings, Farmers and Towns: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH03-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH03",
    "section_number": "3.1",
    "section_title": "Kinship, Caste and Class: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH03-02",
    "chapter_id": "CBSE-CH-G12-HIST-CH03",
    "section_number": "3.2",
    "section_title": "Kinship, Caste and Class: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH04-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH04",
    "section_number": "4.1",
    "section_title": "Thinkers, Beliefs and Buildings: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH04-02",
    "chapter_id": "CBSE-CH-G12-HIST-CH04",
    "section_number": "4.2",
    "section_title": "Thinkers, Beliefs and Buildings: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH05-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH05",
    "section_number": "5.1",
    "section_title": "Through the Eyes of Travellers: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH05-02",
    "chapter_id": "CBSE-CH-G12-HIST-CH05",
    "section_number": "5.2",
    "section_title": "Through the Eyes of Travellers: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH06-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH06",
    "section_number": "6.1",
    "section_title": "Bhakti-Sufi Traditions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HIST-CH06-02",
    "chapter_id": "CBSE-CH-G12-HIST-CH06",
    "section_number": "6.2",
    "section_title": "Bhakti-Sufi Traditions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH01-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH01",
    "section_number": "1.1",
    "section_title": "The End of Bipolarity: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH01-02",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH01",
    "section_number": "1.2",
    "section_title": "The End of Bipolarity: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH02-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH02",
    "section_number": "2.1",
    "section_title": "Contemporary Centres of Power: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH02-02",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH02",
    "section_number": "2.2",
    "section_title": "Contemporary Centres of Power: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH03-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH03",
    "section_number": "3.1",
    "section_title": "Contemporary South Asia: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH03-02",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH03",
    "section_number": "3.2",
    "section_title": "Contemporary South Asia: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH04-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH04",
    "section_number": "4.1",
    "section_title": "International Organisations: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH04-02",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH04",
    "section_number": "4.2",
    "section_title": "International Organisations: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH05-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH05",
    "section_number": "5.1",
    "section_title": "Security in the Contemporary World: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH05-02",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH05",
    "section_number": "5.2",
    "section_title": "Security in the Contemporary World: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH06-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH06",
    "section_number": "6.1",
    "section_title": "Environment and Natural Resources: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH06-02",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH06",
    "section_number": "6.2",
    "section_title": "Environment and Natural Resources: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH01-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH01",
    "section_number": "1.1",
    "section_title": "Human Geography: Nature and Scope: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH01-02",
    "chapter_id": "CBSE-CH-G12-GEOG-CH01",
    "section_number": "1.2",
    "section_title": "Human Geography: Nature and Scope: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH02-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH02",
    "section_number": "2.1",
    "section_title": "The World Population: Distribution, Density and Growth: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH02-02",
    "chapter_id": "CBSE-CH-G12-GEOG-CH02",
    "section_number": "2.2",
    "section_title": "The World Population: Distribution, Density and Growth: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH03-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH03",
    "section_number": "3.1",
    "section_title": "Human Development: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH03-02",
    "chapter_id": "CBSE-CH-G12-GEOG-CH03",
    "section_number": "3.2",
    "section_title": "Human Development: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH04-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH04",
    "section_number": "4.1",
    "section_title": "Primary Activities: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH04-02",
    "chapter_id": "CBSE-CH-G12-GEOG-CH04",
    "section_number": "4.2",
    "section_title": "Primary Activities: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH05-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH05",
    "section_number": "5.1",
    "section_title": "Secondary Activities: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH05-02",
    "chapter_id": "CBSE-CH-G12-GEOG-CH05",
    "section_number": "5.2",
    "section_title": "Secondary Activities: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH06-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH06",
    "section_number": "6.1",
    "section_title": "Tertiary and Quaternary Activities: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH06-02",
    "chapter_id": "CBSE-CH-G12-GEOG-CH06",
    "section_number": "6.2",
    "section_title": "Tertiary and Quaternary Activities: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH01-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH01",
    "section_number": "1.1",
    "section_title": "Introducing Indian Society: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH01-02",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH01",
    "section_number": "1.2",
    "section_title": "Introducing Indian Society: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH02-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH02",
    "section_number": "2.1",
    "section_title": "The Demographic Structure of the Indian Society: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH02-02",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH02",
    "section_number": "2.2",
    "section_title": "The Demographic Structure of the Indian Society: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH03-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH03",
    "section_number": "3.1",
    "section_title": "Social Institutions: Continuity and Change: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH03-02",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH03",
    "section_number": "3.2",
    "section_title": "Social Institutions: Continuity and Change: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH04-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH04",
    "section_number": "4.1",
    "section_title": "The Market as a Social Institution: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH04-02",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH04",
    "section_number": "4.2",
    "section_title": "The Market as a Social Institution: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH05-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH05",
    "section_number": "5.1",
    "section_title": "Patterns of Social Inequality and Exclusion: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH05-02",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH05",
    "section_number": "5.2",
    "section_title": "Patterns of Social Inequality and Exclusion: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH06-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH06",
    "section_number": "6.1",
    "section_title": "The Challenges of Cultural Diversity: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH06-02",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH06",
    "section_number": "6.2",
    "section_title": "The Challenges of Cultural Diversity: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH01-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH01",
    "section_number": "1.1",
    "section_title": "Variations in Psychological Attributes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH01-02",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH01",
    "section_number": "1.2",
    "section_title": "Variations in Psychological Attributes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH02-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH02",
    "section_number": "2.1",
    "section_title": "Self and Personality: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH02-02",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH02",
    "section_number": "2.2",
    "section_title": "Self and Personality: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH03-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH03",
    "section_number": "3.1",
    "section_title": "Meeting Life Challenges: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH03-02",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH03",
    "section_number": "3.2",
    "section_title": "Meeting Life Challenges: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH04-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH04",
    "section_number": "4.1",
    "section_title": "Psychological Disorders: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH04-02",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH04",
    "section_number": "4.2",
    "section_title": "Psychological Disorders: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH05-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH05",
    "section_number": "5.1",
    "section_title": "Therapeutic Approaches: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH05-02",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH05",
    "section_number": "5.2",
    "section_title": "Therapeutic Approaches: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH06-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH06",
    "section_number": "6.1",
    "section_title": "Attitude and Social Cognition: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH06-02",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH06",
    "section_number": "6.2",
    "section_title": "Attitude and Social Cognition: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH07-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH07",
    "section_number": "7.1",
    "section_title": "Social Influence and Group Processes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH07-02",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH07",
    "section_number": "7.2",
    "section_title": "Social Influence and Group Processes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH01-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH01",
    "section_number": "1.1",
    "section_title": "Introduction to Macroeconomics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH01-02",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH01",
    "section_number": "1.2",
    "section_title": "Introduction to Macroeconomics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH02-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH02",
    "section_number": "2.1",
    "section_title": "National Income Accounting: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH02-02",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH02",
    "section_number": "2.2",
    "section_title": "National Income Accounting: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH03-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH03",
    "section_number": "3.1",
    "section_title": "Money and Banking: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH03-02",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH03",
    "section_number": "3.2",
    "section_title": "Money and Banking: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH04-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH04",
    "section_number": "4.1",
    "section_title": "Determination of Income and Employment: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH04-02",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH04",
    "section_number": "4.2",
    "section_title": "Determination of Income and Employment: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH05-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH05",
    "section_number": "5.1",
    "section_title": "Government Budget and the Economy: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH05-02",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH05",
    "section_number": "5.2",
    "section_title": "Government Budget and the Economy: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH06-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH06",
    "section_number": "6.1",
    "section_title": "Open Economy Macroeconomics: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH06-02",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH06",
    "section_number": "6.2",
    "section_title": "Open Economy Macroeconomics: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH07-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH07",
    "section_number": "7.1",
    "section_title": "Development Experience (1947-90) and Economic Reforms since 1991: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH07-02",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH07",
    "section_number": "7.2",
    "section_title": "Development Experience (1947-90) and Economic Reforms since 1991: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH08-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH08",
    "section_number": "8.1",
    "section_title": "Current Challenges facing the Indian Economy: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH08-02",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH08",
    "section_number": "8.2",
    "section_title": "Current Challenges facing the Indian Economy: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH01",
    "section_number": "1.1",
    "section_title": "The Last Lesson: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH01",
    "section_number": "1.2",
    "section_title": "The Last Lesson: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH02",
    "section_number": "2.1",
    "section_title": "Lost Spring: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH02",
    "section_number": "2.2",
    "section_title": "Lost Spring: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Deep Water: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Deep Water: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH04",
    "section_number": "4.1",
    "section_title": "The Rattrap: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH04",
    "section_number": "4.2",
    "section_title": "The Rattrap: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH05",
    "section_number": "5.1",
    "section_title": "Indigo: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH05",
    "section_number": "5.2",
    "section_title": "Indigo: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Poets and Pancakes: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Poets and Pancakes: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH07",
    "section_number": "7.1",
    "section_title": "The Interview: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH07",
    "section_number": "7.2",
    "section_title": "The Interview: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH08",
    "section_number": "8.1",
    "section_title": "Going Places: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH08",
    "section_number": "8.2",
    "section_title": "Going Places: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH01",
    "section_number": "1.1",
    "section_title": "The Wit that Won Hearts: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G8-ENG-CH01",
    "section_number": "1.2",
    "section_title": "The Wit that Won Hearts: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH02",
    "section_number": "2.1",
    "section_title": "A Concrete Example: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G8-ENG-CH02",
    "section_number": "2.2",
    "section_title": "A Concrete Example: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Wisdom Paves the Way: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G8-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Wisdom Paves the Way: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH04",
    "section_number": "4.1",
    "section_title": "A Tale of Valour: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G8-ENG-CH04",
    "section_number": "4.2",
    "section_title": "A Tale of Valour: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH05",
    "section_number": "5.1",
    "section_title": "Somebody’s Mother: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G8-ENG-CH05",
    "section_number": "5.2",
    "section_title": "Somebody’s Mother: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH06",
    "section_number": "6.1",
    "section_title": "Verghese Kurien – I Too Had a Dream: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH06-02",
    "chapter_id": "CBSE-CH-G8-ENG-CH06",
    "section_number": "6.2",
    "section_title": "Verghese Kurien – I Too Had a Dream: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH07",
    "section_number": "7.1",
    "section_title": "The Case of the Fifth Word: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH07-02",
    "chapter_id": "CBSE-CH-G8-ENG-CH07",
    "section_number": "7.2",
    "section_title": "The Case of the Fifth Word: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH08",
    "section_number": "8.1",
    "section_title": "The Magic Brush of Dreams: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-ENG-CH08-02",
    "chapter_id": "CBSE-CH-G8-ENG-CH08",
    "section_number": "8.2",
    "section_title": "The Magic Brush of Dreams: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH01",
    "section_number": "1.1",
    "section_title": "World Geography: Some Glimpses: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH01-02",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH01",
    "section_number": "1.2",
    "section_title": "World Geography: Some Glimpses: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH02",
    "section_number": "2.1",
    "section_title": "India's Long Road to Independence: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH02-02",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH02",
    "section_number": "2.2",
    "section_title": "India's Long Road to Independence: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH03",
    "section_number": "3.1",
    "section_title": "A Journey Through Indian Architecture: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH03-02",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH03",
    "section_number": "3.2",
    "section_title": "A Journey Through Indian Architecture: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH04",
    "section_number": "4.1",
    "section_title": "The Role of the Judiciary in Our Society: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH04-02",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH04",
    "section_number": "4.2",
    "section_title": "The Role of the Judiciary in Our Society: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH05",
    "section_number": "5.1",
    "section_title": "Citizenship: Rights and Duties: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH05-02",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH05",
    "section_number": "5.2",
    "section_title": "Citizenship: Rights and Duties: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH06",
    "section_number": "6.1",
    "section_title": "Dynamics of Population: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH06-02",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH06",
    "section_number": "6.2",
    "section_title": "Dynamics of Population: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH07",
    "section_number": "7.1",
    "section_title": "India's Urban Landscape: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH07-02",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH07",
    "section_number": "7.2",
    "section_title": "India's Urban Landscape: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH08-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH08",
    "section_number": "8.1",
    "section_title": "Cultural Currents: 13th to 17th Centuries: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH08-02",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH08",
    "section_number": "8.2",
    "section_title": "Cultural Currents: 13th to 17th Centuries: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH01",
    "section_number": "1.1",
    "section_title": "Exploration: Entering the World of Secondary Science: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH01-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH01",
    "section_number": "1.2",
    "section_title": "Exploration: Entering the World of Secondary Science: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH02",
    "section_number": "2.1",
    "section_title": "Cell — Structure and Functions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH02-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH02",
    "section_number": "2.2",
    "section_title": "Cell — Structure and Functions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH03",
    "section_number": "3.1",
    "section_title": "Tissues: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH03-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH03",
    "section_number": "3.2",
    "section_title": "Tissues: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH04",
    "section_number": "4.1",
    "section_title": "Reproduction: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH04-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH04",
    "section_number": "4.2",
    "section_title": "Reproduction: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH05",
    "section_number": "5.1",
    "section_title": "Diversity in Living Organisms: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH05-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH05",
    "section_number": "5.2",
    "section_title": "Diversity in Living Organisms: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH06",
    "section_number": "6.1",
    "section_title": "Exploring Mixtures and Their Separation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH06-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH06",
    "section_number": "6.2",
    "section_title": "Exploring Mixtures and Their Separation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH07",
    "section_number": "7.1",
    "section_title": "Structure of the Atom: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH07-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH07",
    "section_number": "7.2",
    "section_title": "Structure of the Atom: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH08",
    "section_number": "8.1",
    "section_title": "Atoms and Molecules: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH08-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH08",
    "section_number": "8.2",
    "section_title": "Atoms and Molecules: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH09",
    "section_number": "9.1",
    "section_title": "Earth as a System: Energy, Matter and Life: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH09-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH09",
    "section_number": "9.2",
    "section_title": "Earth as a System: Energy, Matter and Life: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH10",
    "section_number": "10.1",
    "section_title": "Motion: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH10-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH10",
    "section_number": "10.2",
    "section_title": "Motion: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH11",
    "section_number": "11.1",
    "section_title": "Force and Laws of Motion: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH11-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH11",
    "section_number": "11.2",
    "section_title": "Force and Laws of Motion: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH12",
    "section_number": "12.1",
    "section_title": "Work, Energy and Simple Machines: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH12-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH12",
    "section_number": "12.2",
    "section_title": "Work, Energy and Simple Machines: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH13-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH13",
    "section_number": "13.1",
    "section_title": "Sound: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SCI-CH13-02",
    "chapter_id": "CBSE-CH-G9-SCI-CH13",
    "section_number": "13.2",
    "section_title": "Sound: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH01",
    "section_number": "1.1",
    "section_title": "Understanding Social Science: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH01-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH01",
    "section_number": "1.2",
    "section_title": "Understanding Social Science: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH02",
    "section_number": "2.1",
    "section_title": "Shaping of the Earth's Surface: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH02-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH02",
    "section_number": "2.2",
    "section_title": "Shaping of the Earth's Surface: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH03",
    "section_number": "3.1",
    "section_title": "Atmosphere and Climate: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH03-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH03",
    "section_number": "3.2",
    "section_title": "Atmosphere and Climate: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH04",
    "section_number": "4.1",
    "section_title": "Early Humans and Beginning of Civilisation: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH04-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH04",
    "section_number": "4.2",
    "section_title": "Early Humans and Beginning of Civilisation: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH05",
    "section_number": "5.1",
    "section_title": "State and Society (up to 1000 CE): Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH05-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH05",
    "section_number": "5.2",
    "section_title": "State and Society (up to 1000 CE): Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH06",
    "section_number": "6.1",
    "section_title": "Democracy: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH06-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH06",
    "section_number": "6.2",
    "section_title": "Democracy: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH07",
    "section_number": "7.1",
    "section_title": "Elections: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH07-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH07",
    "section_number": "7.2",
    "section_title": "Elections: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH08-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH08",
    "section_number": "8.1",
    "section_title": "Building Blocks in Economics – The Problem of Choice: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH08-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH08",
    "section_number": "8.2",
    "section_title": "Building Blocks in Economics – The Problem of Choice: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH09-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH09",
    "section_number": "9.1",
    "section_title": "The Price Puzzle – What Drives the Market: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH09-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH09",
    "section_number": "9.2",
    "section_title": "The Price Puzzle – What Drives the Market: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH10-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH10",
    "section_number": "10.1",
    "section_title": "Tapestry of the Past: Medieval & Modern Themes and IKS: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH10-02",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH10",
    "section_number": "10.2",
    "section_title": "Tapestry of the Past: Medieval & Modern Themes and IKS: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH01",
    "section_number": "1.1",
    "section_title": "Large Numbers Around Us: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH01-02",
    "chapter_id": "CBSE-CH-G7-MATH-CH01",
    "section_number": "1.2",
    "section_title": "Large Numbers Around Us: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH02",
    "section_number": "2.1",
    "section_title": "Arithmetic Expressions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH02-02",
    "chapter_id": "CBSE-CH-G7-MATH-CH02",
    "section_number": "2.2",
    "section_title": "Arithmetic Expressions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH03",
    "section_number": "3.1",
    "section_title": "A Peek Beyond the Point: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH03-02",
    "chapter_id": "CBSE-CH-G7-MATH-CH03",
    "section_number": "3.2",
    "section_title": "A Peek Beyond the Point: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH04",
    "section_number": "4.1",
    "section_title": "Expressions Using Letter-Numbers: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH04-02",
    "chapter_id": "CBSE-CH-G7-MATH-CH04",
    "section_number": "4.2",
    "section_title": "Expressions Using Letter-Numbers: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH05",
    "section_number": "5.1",
    "section_title": "Parallel and Intersecting: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH05-02",
    "chapter_id": "CBSE-CH-G7-MATH-CH05",
    "section_number": "5.2",
    "section_title": "Parallel and Intersecting: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH06",
    "section_number": "6.1",
    "section_title": "Number Play: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH06-02",
    "chapter_id": "CBSE-CH-G7-MATH-CH06",
    "section_number": "6.2",
    "section_title": "Number Play: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH07",
    "section_number": "7.1",
    "section_title": "A Tale of Three Intersecting Lines: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH07-02",
    "chapter_id": "CBSE-CH-G7-MATH-CH07",
    "section_number": "7.2",
    "section_title": "A Tale of Three Intersecting Lines: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH08",
    "section_number": "8.1",
    "section_title": "Working with Fractions: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-MATH-CH08-02",
    "chapter_id": "CBSE-CH-G7-MATH-CH08",
    "section_number": "8.2",
    "section_title": "Working with Fractions: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH01",
    "section_number": "1.1",
    "section_title": "Learning Together: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH01-02",
    "chapter_id": "CBSE-CH-G7-ENG-CH01",
    "section_number": "1.2",
    "section_title": "Learning Together: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH02",
    "section_number": "2.1",
    "section_title": "Wit and Humour: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH02-02",
    "chapter_id": "CBSE-CH-G7-ENG-CH02",
    "section_number": "2.2",
    "section_title": "Wit and Humour: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH03",
    "section_number": "3.1",
    "section_title": "Dreams and Discoveries: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH03-02",
    "chapter_id": "CBSE-CH-G7-ENG-CH03",
    "section_number": "3.2",
    "section_title": "Dreams and Discoveries: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH04",
    "section_number": "4.1",
    "section_title": "Travel and Adventure: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH04-02",
    "chapter_id": "CBSE-CH-G7-ENG-CH04",
    "section_number": "4.2",
    "section_title": "Travel and Adventure: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH05",
    "section_number": "5.1",
    "section_title": "Bravehearts: Fundamental Principles",
    "section_order": 1,
    "source_page": "p. 1-15"
  },
  {
    "id": "CBSE-SEC-CBSE-CH-G7-ENG-CH05-02",
    "chapter_id": "CBSE-CH-G7-ENG-CH05",
    "section_number": "5.2",
    "section_title": "Bravehearts: Advanced Applications & Problem Solving",
    "section_order": 2,
    "source_page": "p. 16-30"
  }
];

export const CBSE_AUTHORITATIVE_CONCEPTS: CbseAuthoritativeConcept[] = [
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH01",
    "official_title": "Patterns in Mathematics",
    "pedagogical_description": "Authoritative statutory concept covering Patterns in Mathematics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Patterns in Mathematics.",
      "Solve standard NCERT exemplar problems for Patterns in Mathematics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH02",
    "official_title": "Lines and Angles",
    "pedagogical_description": "Authoritative statutory concept covering Lines and Angles under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Lines and Angles.",
      "Solve standard NCERT exemplar problems for Lines and Angles."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH03",
    "official_title": "Number Play",
    "pedagogical_description": "Authoritative statutory concept covering Number Play under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Number Play.",
      "Solve standard NCERT exemplar problems for Number Play."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH04",
    "official_title": "Data Handling and Presentation",
    "pedagogical_description": "Authoritative statutory concept covering Data Handling and Presentation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Data Handling and Presentation.",
      "Solve standard NCERT exemplar problems for Data Handling and Presentation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH05",
    "official_title": "Prime Time",
    "pedagogical_description": "Authoritative statutory concept covering Prime Time under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Prime Time.",
      "Solve standard NCERT exemplar problems for Prime Time."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH06",
    "official_title": "Perimeter and Area",
    "pedagogical_description": "Authoritative statutory concept covering Perimeter and Area under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Perimeter and Area.",
      "Solve standard NCERT exemplar problems for Perimeter and Area."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH07",
    "official_title": "Fractions",
    "pedagogical_description": "Authoritative statutory concept covering Fractions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Fractions.",
      "Solve standard NCERT exemplar problems for Fractions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH08",
    "official_title": "Playing with Constructions",
    "pedagogical_description": "Authoritative statutory concept covering Playing with Constructions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Playing with Constructions.",
      "Solve standard NCERT exemplar problems for Playing with Constructions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH09",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH09",
    "official_title": "Symmetry",
    "pedagogical_description": "Authoritative statutory concept covering Symmetry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Symmetry.",
      "Solve standard NCERT exemplar problems for Symmetry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G6-MATH-CH10",
    "concept_code": "CBSE-CBSE-CH-G6-MATH-CH10",
    "official_title": "The Other Side of Zero",
    "pedagogical_description": "Authoritative statutory concept covering The Other Side of Zero under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Other Side of Zero.",
      "Solve standard NCERT exemplar problems for The Other Side of Zero."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH01",
    "official_title": "The Wonderful World of Science",
    "pedagogical_description": "Authoritative statutory concept covering The Wonderful World of Science under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Wonderful World of Science.",
      "Solve standard NCERT exemplar problems for The Wonderful World of Science."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH02",
    "official_title": "Diversity in the Living World",
    "pedagogical_description": "Authoritative statutory concept covering Diversity in the Living World under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Diversity in the Living World.",
      "Solve standard NCERT exemplar problems for Diversity in the Living World."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH03",
    "official_title": "Mindful Eating: A Path to a Healthy Body",
    "pedagogical_description": "Authoritative statutory concept covering Mindful Eating: A Path to a Healthy Body under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Mindful Eating: A Path to a Healthy Body.",
      "Solve standard NCERT exemplar problems for Mindful Eating: A Path to a Healthy Body."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH04",
    "official_title": "Exploring Magnets",
    "pedagogical_description": "Authoritative statutory concept covering Exploring Magnets under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Exploring Magnets.",
      "Solve standard NCERT exemplar problems for Exploring Magnets."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH05",
    "official_title": "Measurement of Length and Motion",
    "pedagogical_description": "Authoritative statutory concept covering Measurement of Length and Motion under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Measurement of Length and Motion.",
      "Solve standard NCERT exemplar problems for Measurement of Length and Motion."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH06",
    "official_title": "Materials Around Us",
    "pedagogical_description": "Authoritative statutory concept covering Materials Around Us under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Materials Around Us.",
      "Solve standard NCERT exemplar problems for Materials Around Us."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH07",
    "official_title": "Temperature and its Measurement",
    "pedagogical_description": "Authoritative statutory concept covering Temperature and its Measurement under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Temperature and its Measurement.",
      "Solve standard NCERT exemplar problems for Temperature and its Measurement."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH08",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH08",
    "official_title": "A Journey through States of Water",
    "pedagogical_description": "Authoritative statutory concept covering A Journey through States of Water under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Journey through States of Water.",
      "Solve standard NCERT exemplar problems for A Journey through States of Water."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH09",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH09",
    "official_title": "Methods of Separation in Everyday Life",
    "pedagogical_description": "Authoritative statutory concept covering Methods of Separation in Everyday Life under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Methods of Separation in Everyday Life.",
      "Solve standard NCERT exemplar problems for Methods of Separation in Everyday Life."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH10",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH10",
    "official_title": "Living Creatures: Exploring their Characteristics",
    "pedagogical_description": "Authoritative statutory concept covering Living Creatures: Exploring their Characteristics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Living Creatures: Exploring their Characteristics.",
      "Solve standard NCERT exemplar problems for Living Creatures: Exploring their Characteristics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH11",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH11",
    "official_title": "Nature's Treasures",
    "pedagogical_description": "Authoritative statutory concept covering Nature's Treasures under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Nature's Treasures.",
      "Solve standard NCERT exemplar problems for Nature's Treasures."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G6-SCI-CH12",
    "concept_code": "CBSE-CBSE-CH-G6-SCI-CH12",
    "official_title": "Beyond Earth",
    "pedagogical_description": "Authoritative statutory concept covering Beyond Earth under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Beyond Earth.",
      "Solve standard NCERT exemplar problems for Beyond Earth."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH01",
    "official_title": "Number Systems",
    "pedagogical_description": "Authoritative statutory concept covering Number Systems under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Number Systems.",
      "Solve standard NCERT exemplar problems for Number Systems."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH02",
    "official_title": "Polynomials",
    "pedagogical_description": "Authoritative statutory concept covering Polynomials under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Polynomials.",
      "Solve standard NCERT exemplar problems for Polynomials."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH03",
    "official_title": "Coordinate Geometry",
    "pedagogical_description": "Authoritative statutory concept covering Coordinate Geometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Coordinate Geometry.",
      "Solve standard NCERT exemplar problems for Coordinate Geometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH04",
    "official_title": "Linear Equations in Two Variables",
    "pedagogical_description": "Authoritative statutory concept covering Linear Equations in Two Variables under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Linear Equations in Two Variables.",
      "Solve standard NCERT exemplar problems for Linear Equations in Two Variables."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH05",
    "official_title": "Introduction to Euclid's Geometry",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Euclid's Geometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Euclid's Geometry.",
      "Solve standard NCERT exemplar problems for Introduction to Euclid's Geometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH06",
    "official_title": "Lines and Angles",
    "pedagogical_description": "Authoritative statutory concept covering Lines and Angles under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Lines and Angles.",
      "Solve standard NCERT exemplar problems for Lines and Angles."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH07",
    "official_title": "Triangles",
    "pedagogical_description": "Authoritative statutory concept covering Triangles under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Triangles.",
      "Solve standard NCERT exemplar problems for Triangles."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH08",
    "official_title": "Quadrilaterals",
    "pedagogical_description": "Authoritative statutory concept covering Quadrilaterals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Quadrilaterals.",
      "Solve standard NCERT exemplar problems for Quadrilaterals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH09",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH09",
    "official_title": "Circles",
    "pedagogical_description": "Authoritative statutory concept covering Circles under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Circles.",
      "Solve standard NCERT exemplar problems for Circles."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH10",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH10",
    "official_title": "Heron's Formula",
    "pedagogical_description": "Authoritative statutory concept covering Heron's Formula under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Heron's Formula.",
      "Solve standard NCERT exemplar problems for Heron's Formula."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH11",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH11",
    "official_title": "Surface Areas and Volumes",
    "pedagogical_description": "Authoritative statutory concept covering Surface Areas and Volumes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Surface Areas and Volumes.",
      "Solve standard NCERT exemplar problems for Surface Areas and Volumes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G9-MATH-CH12",
    "concept_code": "CBSE-CBSE-CH-G9-MATH-CH12",
    "official_title": "Statistics",
    "pedagogical_description": "Authoritative statutory concept covering Statistics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Statistics.",
      "Solve standard NCERT exemplar problems for Statistics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G9-ENG-CH01",
    "official_title": "How I Taught My Grandmother to Read",
    "pedagogical_description": "Authoritative statutory concept covering How I Taught My Grandmother to Read under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of How I Taught My Grandmother to Read.",
      "Solve standard NCERT exemplar problems for How I Taught My Grandmother to Read."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G9-ENG-CH02",
    "official_title": "The Pot Maker",
    "pedagogical_description": "Authoritative statutory concept covering The Pot Maker under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Pot Maker.",
      "Solve standard NCERT exemplar problems for The Pot Maker."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G9-ENG-CH03",
    "official_title": "Winds of Change",
    "pedagogical_description": "Authoritative statutory concept covering Winds of Change under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Winds of Change.",
      "Solve standard NCERT exemplar problems for Winds of Change."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G9-ENG-CH04",
    "official_title": "Vitamin-M",
    "pedagogical_description": "Authoritative statutory concept covering Vitamin-M under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Vitamin-M.",
      "Solve standard NCERT exemplar problems for Vitamin-M."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G9-ENG-CH05",
    "official_title": "The World of Limitless Possibilities",
    "pedagogical_description": "Authoritative statutory concept covering The World of Limitless Possibilities under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The World of Limitless Possibilities.",
      "Solve standard NCERT exemplar problems for The World of Limitless Possibilities."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G9-ENG-CH06",
    "official_title": "Twin Melodies",
    "pedagogical_description": "Authoritative statutory concept covering Twin Melodies under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Twin Melodies.",
      "Solve standard NCERT exemplar problems for Twin Melodies."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G9-ENG-CH07",
    "official_title": "Carrier of Words",
    "pedagogical_description": "Authoritative statutory concept covering Carrier of Words under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Carrier of Words.",
      "Solve standard NCERT exemplar problems for Carrier of Words."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G9-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G9-ENG-CH08",
    "official_title": "Follow That Dream",
    "pedagogical_description": "Authoritative statutory concept covering Follow That Dream under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Follow That Dream.",
      "Solve standard NCERT exemplar problems for Follow That Dream."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH01",
    "official_title": "Real Numbers",
    "pedagogical_description": "Authoritative statutory concept covering Real Numbers under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Real Numbers.",
      "Solve standard NCERT exemplar problems for Real Numbers."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH02",
    "official_title": "Polynomials",
    "pedagogical_description": "Authoritative statutory concept covering Polynomials under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Polynomials.",
      "Solve standard NCERT exemplar problems for Polynomials."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH03",
    "official_title": "Pair of Linear Equations in Two Variables",
    "pedagogical_description": "Authoritative statutory concept covering Pair of Linear Equations in Two Variables under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Pair of Linear Equations in Two Variables.",
      "Solve standard NCERT exemplar problems for Pair of Linear Equations in Two Variables."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH04",
    "official_title": "Quadratic Equations",
    "pedagogical_description": "Authoritative statutory concept covering Quadratic Equations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Quadratic Equations.",
      "Solve standard NCERT exemplar problems for Quadratic Equations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH05",
    "official_title": "Arithmetic Progressions",
    "pedagogical_description": "Authoritative statutory concept covering Arithmetic Progressions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Arithmetic Progressions.",
      "Solve standard NCERT exemplar problems for Arithmetic Progressions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH06",
    "official_title": "Triangles",
    "pedagogical_description": "Authoritative statutory concept covering Triangles under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Triangles.",
      "Solve standard NCERT exemplar problems for Triangles."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH07",
    "official_title": "Coordinate Geometry",
    "pedagogical_description": "Authoritative statutory concept covering Coordinate Geometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Coordinate Geometry.",
      "Solve standard NCERT exemplar problems for Coordinate Geometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH08",
    "official_title": "Introduction to Trigonometry",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Trigonometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Trigonometry.",
      "Solve standard NCERT exemplar problems for Introduction to Trigonometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH09",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH09",
    "official_title": "Some Applications of Trigonometry",
    "pedagogical_description": "Authoritative statutory concept covering Some Applications of Trigonometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Some Applications of Trigonometry.",
      "Solve standard NCERT exemplar problems for Some Applications of Trigonometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH10",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH10",
    "official_title": "Circles",
    "pedagogical_description": "Authoritative statutory concept covering Circles under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Circles.",
      "Solve standard NCERT exemplar problems for Circles."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH11",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH11",
    "official_title": "Areas Related to Circles",
    "pedagogical_description": "Authoritative statutory concept covering Areas Related to Circles under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Areas Related to Circles.",
      "Solve standard NCERT exemplar problems for Areas Related to Circles."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH12",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH12",
    "official_title": "Surface Areas and Volumes",
    "pedagogical_description": "Authoritative statutory concept covering Surface Areas and Volumes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Surface Areas and Volumes.",
      "Solve standard NCERT exemplar problems for Surface Areas and Volumes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH13",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH13",
    "official_title": "Statistics",
    "pedagogical_description": "Authoritative statutory concept covering Statistics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Statistics.",
      "Solve standard NCERT exemplar problems for Statistics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-MATH-CH14-01",
    "chapter_id": "CBSE-CH-G10-MATH-CH14",
    "concept_code": "CBSE-CBSE-CH-G10-MATH-CH14",
    "official_title": "Probability",
    "pedagogical_description": "Authoritative statutory concept covering Probability under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Probability.",
      "Solve standard NCERT exemplar problems for Probability."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH01",
    "official_title": "A Letter to God",
    "pedagogical_description": "Authoritative statutory concept covering A Letter to God under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Letter to God.",
      "Solve standard NCERT exemplar problems for A Letter to God."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH02",
    "official_title": "Nelson Mandela: Long Walk to Freedom",
    "pedagogical_description": "Authoritative statutory concept covering Nelson Mandela: Long Walk to Freedom under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Nelson Mandela: Long Walk to Freedom.",
      "Solve standard NCERT exemplar problems for Nelson Mandela: Long Walk to Freedom."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH03",
    "official_title": "Two Stories about Flying",
    "pedagogical_description": "Authoritative statutory concept covering Two Stories about Flying under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Two Stories about Flying.",
      "Solve standard NCERT exemplar problems for Two Stories about Flying."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH04",
    "official_title": "From the Diary of Anne Frank",
    "pedagogical_description": "Authoritative statutory concept covering From the Diary of Anne Frank under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of From the Diary of Anne Frank.",
      "Solve standard NCERT exemplar problems for From the Diary of Anne Frank."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH05",
    "official_title": "Glimpses of India",
    "pedagogical_description": "Authoritative statutory concept covering Glimpses of India under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Glimpses of India.",
      "Solve standard NCERT exemplar problems for Glimpses of India."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH06",
    "official_title": "Mijbil the Otter",
    "pedagogical_description": "Authoritative statutory concept covering Mijbil the Otter under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Mijbil the Otter.",
      "Solve standard NCERT exemplar problems for Mijbil the Otter."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH07",
    "official_title": "Madam Rides the Bus",
    "pedagogical_description": "Authoritative statutory concept covering Madam Rides the Bus under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Madam Rides the Bus.",
      "Solve standard NCERT exemplar problems for Madam Rides the Bus."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH08",
    "official_title": "The Sermon at Benares",
    "pedagogical_description": "Authoritative statutory concept covering The Sermon at Benares under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Sermon at Benares.",
      "Solve standard NCERT exemplar problems for The Sermon at Benares."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-ENG-CH09-01",
    "chapter_id": "CBSE-CH-G10-ENG-CH09",
    "concept_code": "CBSE-CBSE-CH-G10-ENG-CH09",
    "official_title": "The Proposal",
    "pedagogical_description": "Authoritative statutory concept covering The Proposal under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Proposal.",
      "Solve standard NCERT exemplar problems for The Proposal."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-HIN-CH01-01",
    "chapter_id": "CBSE-CH-G10-HIN-CH01",
    "concept_code": "CBSE-CBSE-CH-G10-HIN-CH01",
    "official_title": "Netaji Ka Chashma",
    "pedagogical_description": "Authoritative statutory concept covering Netaji Ka Chashma under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Netaji Ka Chashma.",
      "Solve standard NCERT exemplar problems for Netaji Ka Chashma."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-HIN-CH02-01",
    "chapter_id": "CBSE-CH-G10-HIN-CH02",
    "concept_code": "CBSE-CBSE-CH-G10-HIN-CH02",
    "official_title": "Balgobin Bhagat",
    "pedagogical_description": "Authoritative statutory concept covering Balgobin Bhagat under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Balgobin Bhagat.",
      "Solve standard NCERT exemplar problems for Balgobin Bhagat."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-HIN-CH03-01",
    "chapter_id": "CBSE-CH-G10-HIN-CH03",
    "concept_code": "CBSE-CBSE-CH-G10-HIN-CH03",
    "official_title": "Lakhnavi Andaz",
    "pedagogical_description": "Authoritative statutory concept covering Lakhnavi Andaz under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Lakhnavi Andaz.",
      "Solve standard NCERT exemplar problems for Lakhnavi Andaz."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-HIN-CH04-01",
    "chapter_id": "CBSE-CH-G10-HIN-CH04",
    "concept_code": "CBSE-CBSE-CH-G10-HIN-CH04",
    "official_title": "Ek Kahani Yeh Bhi",
    "pedagogical_description": "Authoritative statutory concept covering Ek Kahani Yeh Bhi under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Ek Kahani Yeh Bhi.",
      "Solve standard NCERT exemplar problems for Ek Kahani Yeh Bhi."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH01",
    "official_title": "Exploring the Investigative World of Science",
    "pedagogical_description": "Authoritative statutory concept covering Exploring the Investigative World of Science under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Exploring the Investigative World of Science.",
      "Solve standard NCERT exemplar problems for Exploring the Investigative World of Science."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH02",
    "official_title": "The Invisible Living World: Beyond Our Naked Eye",
    "pedagogical_description": "Authoritative statutory concept covering The Invisible Living World: Beyond Our Naked Eye under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Invisible Living World: Beyond Our Naked Eye.",
      "Solve standard NCERT exemplar problems for The Invisible Living World: Beyond Our Naked Eye."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH03",
    "official_title": "Health: The Ultimate Treasure",
    "pedagogical_description": "Authoritative statutory concept covering Health: The Ultimate Treasure under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Health: The Ultimate Treasure.",
      "Solve standard NCERT exemplar problems for Health: The Ultimate Treasure."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH04",
    "official_title": "Electricity: Magnetic and Heating Effects",
    "pedagogical_description": "Authoritative statutory concept covering Electricity: Magnetic and Heating Effects under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Electricity: Magnetic and Heating Effects.",
      "Solve standard NCERT exemplar problems for Electricity: Magnetic and Heating Effects."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH05",
    "official_title": "Exploring Forces",
    "pedagogical_description": "Authoritative statutory concept covering Exploring Forces under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Exploring Forces.",
      "Solve standard NCERT exemplar problems for Exploring Forces."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH06",
    "official_title": "Pressure, Winds, Storms, and Cyclones",
    "pedagogical_description": "Authoritative statutory concept covering Pressure, Winds, Storms, and Cyclones under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Pressure, Winds, Storms, and Cyclones.",
      "Solve standard NCERT exemplar problems for Pressure, Winds, Storms, and Cyclones."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH07",
    "official_title": "Particulate Nature of Matter",
    "pedagogical_description": "Authoritative statutory concept covering Particulate Nature of Matter under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Particulate Nature of Matter.",
      "Solve standard NCERT exemplar problems for Particulate Nature of Matter."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH08",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH08",
    "official_title": "Nature of Matter: Elements, Compounds, and Mixtures",
    "pedagogical_description": "Authoritative statutory concept covering Nature of Matter: Elements, Compounds, and Mixtures under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Nature of Matter: Elements, Compounds, and Mixtures.",
      "Solve standard NCERT exemplar problems for Nature of Matter: Elements, Compounds, and Mixtures."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH09",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH09",
    "official_title": "The Amazing World of Solutes, Solvents, and Solutions",
    "pedagogical_description": "Authoritative statutory concept covering The Amazing World of Solutes, Solvents, and Solutions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Amazing World of Solutes, Solvents, and Solutions.",
      "Solve standard NCERT exemplar problems for The Amazing World of Solutes, Solvents, and Solutions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH10",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH10",
    "official_title": "Light: Mirrors and Lenses",
    "pedagogical_description": "Authoritative statutory concept covering Light: Mirrors and Lenses under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Light: Mirrors and Lenses.",
      "Solve standard NCERT exemplar problems for Light: Mirrors and Lenses."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH11",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH11",
    "official_title": "Keeping Time with the Skies",
    "pedagogical_description": "Authoritative statutory concept covering Keeping Time with the Skies under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Keeping Time with the Skies.",
      "Solve standard NCERT exemplar problems for Keeping Time with the Skies."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH12",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH12",
    "official_title": "How Nature Works in Harmony",
    "pedagogical_description": "Authoritative statutory concept covering How Nature Works in Harmony under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of How Nature Works in Harmony.",
      "Solve standard NCERT exemplar problems for How Nature Works in Harmony."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SCI-CH13-01",
    "chapter_id": "CBSE-CH-G8-SCI-CH13",
    "concept_code": "CBSE-CBSE-CH-G8-SCI-CH13",
    "official_title": "Our Home: Earth, a Unique Life-Sustaining Planet",
    "pedagogical_description": "Authoritative statutory concept covering Our Home: Earth, a Unique Life-Sustaining Planet under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Our Home: Earth, a Unique Life-Sustaining Planet.",
      "Solve standard NCERT exemplar problems for Our Home: Earth, a Unique Life-Sustaining Planet."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G6-ENG-CH01",
    "official_title": "Fables and Folk Tales",
    "pedagogical_description": "Authoritative statutory concept covering Fables and Folk Tales under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Fables and Folk Tales.",
      "Solve standard NCERT exemplar problems for Fables and Folk Tales."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G6-ENG-CH02",
    "official_title": "Friendship",
    "pedagogical_description": "Authoritative statutory concept covering Friendship under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Friendship.",
      "Solve standard NCERT exemplar problems for Friendship."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G6-ENG-CH03",
    "official_title": "Nurturing Nature",
    "pedagogical_description": "Authoritative statutory concept covering Nurturing Nature under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Nurturing Nature.",
      "Solve standard NCERT exemplar problems for Nurturing Nature."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G6-ENG-CH04",
    "official_title": "Sports and Games",
    "pedagogical_description": "Authoritative statutory concept covering Sports and Games under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sports and Games.",
      "Solve standard NCERT exemplar problems for Sports and Games."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G6-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G6-ENG-CH05",
    "official_title": "Culture and Tradition",
    "pedagogical_description": "Authoritative statutory concept covering Culture and Tradition under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Culture and Tradition.",
      "Solve standard NCERT exemplar problems for Culture and Tradition."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G6-SOCSCI-CH01",
    "official_title": "Locating Places on the Earth",
    "pedagogical_description": "Authoritative statutory concept covering Locating Places on the Earth under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Locating Places on the Earth.",
      "Solve standard NCERT exemplar problems for Locating Places on the Earth."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G6-SOCSCI-CH02",
    "official_title": "Oceans and Continents",
    "pedagogical_description": "Authoritative statutory concept covering Oceans and Continents under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Oceans and Continents.",
      "Solve standard NCERT exemplar problems for Oceans and Continents."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G6-SOCSCI-CH03",
    "official_title": "Landforms and Life",
    "pedagogical_description": "Authoritative statutory concept covering Landforms and Life under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Landforms and Life.",
      "Solve standard NCERT exemplar problems for Landforms and Life."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G6-SOCSCI-CH04",
    "official_title": "Timeline and Sources of History",
    "pedagogical_description": "Authoritative statutory concept covering Timeline and Sources of History under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Timeline and Sources of History.",
      "Solve standard NCERT exemplar problems for Timeline and Sources of History."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G6-SOCSCI-CH05",
    "official_title": "India, That Is Bharat",
    "pedagogical_description": "Authoritative statutory concept covering India, That Is Bharat under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of India, That Is Bharat.",
      "Solve standard NCERT exemplar problems for India, That Is Bharat."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G6-SOCSCI-CH06",
    "official_title": "The Beginnings of Indian Civilisation",
    "pedagogical_description": "Authoritative statutory concept covering The Beginnings of Indian Civilisation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Beginnings of Indian Civilisation.",
      "Solve standard NCERT exemplar problems for The Beginnings of Indian Civilisation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G6-SOCSCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G6-SOCSCI-CH07",
    "official_title": "India's Cultural Roots",
    "pedagogical_description": "Authoritative statutory concept covering India's Cultural Roots under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of India's Cultural Roots.",
      "Solve standard NCERT exemplar problems for India's Cultural Roots."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-HIN-CH01-01",
    "chapter_id": "CBSE-CH-G6-HIN-CH01",
    "concept_code": "CBSE-CBSE-CH-G6-HIN-CH01",
    "official_title": "Baras Raha Hai Jal",
    "pedagogical_description": "Authoritative statutory concept covering Baras Raha Hai Jal under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Baras Raha Hai Jal.",
      "Solve standard NCERT exemplar problems for Baras Raha Hai Jal."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-HIN-CH02-01",
    "chapter_id": "CBSE-CH-G6-HIN-CH02",
    "concept_code": "CBSE-CBSE-CH-G6-HIN-CH02",
    "official_title": "Har Ki Jeet",
    "pedagogical_description": "Authoritative statutory concept covering Har Ki Jeet under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Har Ki Jeet.",
      "Solve standard NCERT exemplar problems for Har Ki Jeet."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-HIN-CH03-01",
    "chapter_id": "CBSE-CH-G6-HIN-CH03",
    "concept_code": "CBSE-CBSE-CH-G6-HIN-CH03",
    "official_title": "Bansi Ki Dhun",
    "pedagogical_description": "Authoritative statutory concept covering Bansi Ki Dhun under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Bansi Ki Dhun.",
      "Solve standard NCERT exemplar problems for Bansi Ki Dhun."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-HIN-CH04-01",
    "chapter_id": "CBSE-CH-G6-HIN-CH04",
    "concept_code": "CBSE-CBSE-CH-G6-HIN-CH04",
    "official_title": "Meri Maa",
    "pedagogical_description": "Authoritative statutory concept covering Meri Maa under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Meri Maa.",
      "Solve standard NCERT exemplar problems for Meri Maa."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SANSKRIT-CH01-01",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH01",
    "concept_code": "CBSE-CBSE-CH-G6-SANSKRIT-CH01",
    "official_title": "Prathama Patha: Mangalacharanam",
    "pedagogical_description": "Authoritative statutory concept covering Prathama Patha: Mangalacharanam under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Prathama Patha: Mangalacharanam.",
      "Solve standard NCERT exemplar problems for Prathama Patha: Mangalacharanam."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SANSKRIT-CH02-01",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH02",
    "concept_code": "CBSE-CBSE-CH-G6-SANSKRIT-CH02",
    "official_title": "Dvitiya Patha: Parichaya",
    "pedagogical_description": "Authoritative statutory concept covering Dvitiya Patha: Parichaya under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Dvitiya Patha: Parichaya.",
      "Solve standard NCERT exemplar problems for Dvitiya Patha: Parichaya."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SANSKRIT-CH03-01",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH03",
    "concept_code": "CBSE-CBSE-CH-G6-SANSKRIT-CH03",
    "official_title": "Tritiya Patha: Subhashitani",
    "pedagogical_description": "Authoritative statutory concept covering Tritiya Patha: Subhashitani under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Tritiya Patha: Subhashitani.",
      "Solve standard NCERT exemplar problems for Tritiya Patha: Subhashitani."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G6-SANSKRIT-CH04-01",
    "chapter_id": "CBSE-CH-G6-SANSKRIT-CH04",
    "concept_code": "CBSE-CBSE-CH-G6-SANSKRIT-CH04",
    "official_title": "Chaturtha Patha: Vidyalaya",
    "pedagogical_description": "Authoritative statutory concept covering Chaturtha Patha: Vidyalaya under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Chaturtha Patha: Vidyalaya.",
      "Solve standard NCERT exemplar problems for Chaturtha Patha: Vidyalaya."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G7-SOCSCI-CH01",
    "official_title": "Tracing Changes Through a Thousand Years",
    "pedagogical_description": "Authoritative statutory concept covering Tracing Changes Through a Thousand Years under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Tracing Changes Through a Thousand Years.",
      "Solve standard NCERT exemplar problems for Tracing Changes Through a Thousand Years."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G7-SOCSCI-CH02",
    "official_title": "New Kings and Kingdoms",
    "pedagogical_description": "Authoritative statutory concept covering New Kings and Kingdoms under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of New Kings and Kingdoms.",
      "Solve standard NCERT exemplar problems for New Kings and Kingdoms."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G7-SOCSCI-CH03",
    "official_title": "The Delhi Sultans",
    "pedagogical_description": "Authoritative statutory concept covering The Delhi Sultans under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Delhi Sultans.",
      "Solve standard NCERT exemplar problems for The Delhi Sultans."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G7-SOCSCI-CH04",
    "official_title": "The Mughal Empire",
    "pedagogical_description": "Authoritative statutory concept covering The Mughal Empire under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Mughal Empire.",
      "Solve standard NCERT exemplar problems for The Mughal Empire."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G7-SOCSCI-CH05",
    "official_title": "Rulers and Buildings",
    "pedagogical_description": "Authoritative statutory concept covering Rulers and Buildings under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Rulers and Buildings.",
      "Solve standard NCERT exemplar problems for Rulers and Buildings."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G7-SOCSCI-CH06",
    "official_title": "Towns, Traders and Craftspersons",
    "pedagogical_description": "Authoritative statutory concept covering Towns, Traders and Craftspersons under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Towns, Traders and Craftspersons.",
      "Solve standard NCERT exemplar problems for Towns, Traders and Craftspersons."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G7-SOCSCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G7-SOCSCI-CH07",
    "official_title": "Tribes, Nomads and Settled Communities",
    "pedagogical_description": "Authoritative statutory concept covering Tribes, Nomads and Settled Communities under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Tribes, Nomads and Settled Communities.",
      "Solve standard NCERT exemplar problems for Tribes, Nomads and Settled Communities."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-HIN-CH01-01",
    "chapter_id": "CBSE-CH-G9-HIN-CH01",
    "concept_code": "CBSE-CBSE-CH-G9-HIN-CH01",
    "official_title": "Do Bailon Ki Katha",
    "pedagogical_description": "Authoritative statutory concept covering Do Bailon Ki Katha under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Do Bailon Ki Katha.",
      "Solve standard NCERT exemplar problems for Do Bailon Ki Katha."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-HIN-CH02-01",
    "chapter_id": "CBSE-CH-G9-HIN-CH02",
    "concept_code": "CBSE-CBSE-CH-G9-HIN-CH02",
    "official_title": "Lhasa Ki Aur",
    "pedagogical_description": "Authoritative statutory concept covering Lhasa Ki Aur under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Lhasa Ki Aur.",
      "Solve standard NCERT exemplar problems for Lhasa Ki Aur."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-HIN-CH03-01",
    "chapter_id": "CBSE-CH-G9-HIN-CH03",
    "concept_code": "CBSE-CBSE-CH-G9-HIN-CH03",
    "official_title": "Upbhoktavad Ki Sanskriti",
    "pedagogical_description": "Authoritative statutory concept covering Upbhoktavad Ki Sanskriti under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Upbhoktavad Ki Sanskriti.",
      "Solve standard NCERT exemplar problems for Upbhoktavad Ki Sanskriti."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-HIN-CH04-01",
    "chapter_id": "CBSE-CH-G9-HIN-CH04",
    "concept_code": "CBSE-CBSE-CH-G9-HIN-CH04",
    "official_title": "Sawle Sapno Ki Yaad",
    "pedagogical_description": "Authoritative statutory concept covering Sawle Sapno Ki Yaad under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sawle Sapno Ki Yaad.",
      "Solve standard NCERT exemplar problems for Sawle Sapno Ki Yaad."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH01",
    "official_title": "Chemical Reactions and Equations",
    "pedagogical_description": "Authoritative statutory concept covering Chemical Reactions and Equations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Chemical Reactions and Equations.",
      "Solve standard NCERT exemplar problems for Chemical Reactions and Equations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH02",
    "official_title": "Acids, Bases and Salts",
    "pedagogical_description": "Authoritative statutory concept covering Acids, Bases and Salts under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Acids, Bases and Salts.",
      "Solve standard NCERT exemplar problems for Acids, Bases and Salts."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH03",
    "official_title": "Metals and Non-metals",
    "pedagogical_description": "Authoritative statutory concept covering Metals and Non-metals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Metals and Non-metals.",
      "Solve standard NCERT exemplar problems for Metals and Non-metals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH04",
    "official_title": "Carbon and its Compounds",
    "pedagogical_description": "Authoritative statutory concept covering Carbon and its Compounds under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Carbon and its Compounds.",
      "Solve standard NCERT exemplar problems for Carbon and its Compounds."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH05",
    "official_title": "Life Processes",
    "pedagogical_description": "Authoritative statutory concept covering Life Processes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Life Processes.",
      "Solve standard NCERT exemplar problems for Life Processes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH06",
    "official_title": "Control and Coordination",
    "pedagogical_description": "Authoritative statutory concept covering Control and Coordination under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Control and Coordination.",
      "Solve standard NCERT exemplar problems for Control and Coordination."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH07",
    "official_title": "How do Organisms Reproduce?",
    "pedagogical_description": "Authoritative statutory concept covering How do Organisms Reproduce? under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of How do Organisms Reproduce?.",
      "Solve standard NCERT exemplar problems for How do Organisms Reproduce?."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH08",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH08",
    "official_title": "Heredity",
    "pedagogical_description": "Authoritative statutory concept covering Heredity under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Heredity.",
      "Solve standard NCERT exemplar problems for Heredity."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH09",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH09",
    "official_title": "Light - Reflection and Refraction",
    "pedagogical_description": "Authoritative statutory concept covering Light - Reflection and Refraction under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Light - Reflection and Refraction.",
      "Solve standard NCERT exemplar problems for Light - Reflection and Refraction."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH10",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH10",
    "official_title": "The Human Eye and the Colorful World",
    "pedagogical_description": "Authoritative statutory concept covering The Human Eye and the Colorful World under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Human Eye and the Colorful World.",
      "Solve standard NCERT exemplar problems for The Human Eye and the Colorful World."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH11",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH11",
    "official_title": "Electricity",
    "pedagogical_description": "Authoritative statutory concept covering Electricity under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Electricity.",
      "Solve standard NCERT exemplar problems for Electricity."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH12",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH12",
    "official_title": "Magnetic Effects of Electric Current",
    "pedagogical_description": "Authoritative statutory concept covering Magnetic Effects of Electric Current under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Magnetic Effects of Electric Current.",
      "Solve standard NCERT exemplar problems for Magnetic Effects of Electric Current."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SCI-CH13-01",
    "chapter_id": "CBSE-CH-G10-SCI-CH13",
    "concept_code": "CBSE-CBSE-CH-G10-SCI-CH13",
    "official_title": "Our Environment",
    "pedagogical_description": "Authoritative statutory concept covering Our Environment under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Our Environment.",
      "Solve standard NCERT exemplar problems for Our Environment."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH01",
    "official_title": "The Rise of Nationalism in Europe",
    "pedagogical_description": "Authoritative statutory concept covering The Rise of Nationalism in Europe under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Rise of Nationalism in Europe.",
      "Solve standard NCERT exemplar problems for The Rise of Nationalism in Europe."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH02",
    "official_title": "Nationalism in India",
    "pedagogical_description": "Authoritative statutory concept covering Nationalism in India under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Nationalism in India.",
      "Solve standard NCERT exemplar problems for Nationalism in India."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH03",
    "official_title": "The Making of a Global World",
    "pedagogical_description": "Authoritative statutory concept covering The Making of a Global World under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Making of a Global World.",
      "Solve standard NCERT exemplar problems for The Making of a Global World."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH04",
    "official_title": "The Age of Industrialisation",
    "pedagogical_description": "Authoritative statutory concept covering The Age of Industrialisation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Age of Industrialisation.",
      "Solve standard NCERT exemplar problems for The Age of Industrialisation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH05",
    "official_title": "Print Culture and the Modern World",
    "pedagogical_description": "Authoritative statutory concept covering Print Culture and the Modern World under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Print Culture and the Modern World.",
      "Solve standard NCERT exemplar problems for Print Culture and the Modern World."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH06",
    "official_title": "Resources and Development",
    "pedagogical_description": "Authoritative statutory concept covering Resources and Development under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Resources and Development.",
      "Solve standard NCERT exemplar problems for Resources and Development."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH07",
    "official_title": "Forest and Wildlife Resources",
    "pedagogical_description": "Authoritative statutory concept covering Forest and Wildlife Resources under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Forest and Wildlife Resources.",
      "Solve standard NCERT exemplar problems for Forest and Wildlife Resources."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH08-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH08",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH08",
    "official_title": "Water Resources",
    "pedagogical_description": "Authoritative statutory concept covering Water Resources under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Water Resources.",
      "Solve standard NCERT exemplar problems for Water Resources."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH09-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH09",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH09",
    "official_title": "Agriculture",
    "pedagogical_description": "Authoritative statutory concept covering Agriculture under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Agriculture.",
      "Solve standard NCERT exemplar problems for Agriculture."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH10-01",
    "chapter_id": "CBSE-CH-G10-SOCSCI-CH10",
    "concept_code": "CBSE-CBSE-CH-G10-SOCSCI-CH10",
    "official_title": "Minerals and Energy Resources",
    "pedagogical_description": "Authoritative statutory concept covering Minerals and Energy Resources under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Minerals and Energy Resources.",
      "Solve standard NCERT exemplar problems for Minerals and Energy Resources."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH01",
    "official_title": "The Ever-Evolving World of Science",
    "pedagogical_description": "Authoritative statutory concept covering The Ever-Evolving World of Science under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Ever-Evolving World of Science.",
      "Solve standard NCERT exemplar problems for The Ever-Evolving World of Science."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH02",
    "official_title": "Exploring Substances: Acidic, Basic, and Neutral",
    "pedagogical_description": "Authoritative statutory concept covering Exploring Substances: Acidic, Basic, and Neutral under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Exploring Substances: Acidic, Basic, and Neutral.",
      "Solve standard NCERT exemplar problems for Exploring Substances: Acidic, Basic, and Neutral."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH03",
    "official_title": "Electricity: Circuits and their Components",
    "pedagogical_description": "Authoritative statutory concept covering Electricity: Circuits and their Components under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Electricity: Circuits and their Components.",
      "Solve standard NCERT exemplar problems for Electricity: Circuits and their Components."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH04",
    "official_title": "The World of Metals and Non-metals",
    "pedagogical_description": "Authoritative statutory concept covering The World of Metals and Non-metals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The World of Metals and Non-metals.",
      "Solve standard NCERT exemplar problems for The World of Metals and Non-metals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH05",
    "official_title": "Changes Around Us: Physical and Chemical",
    "pedagogical_description": "Authoritative statutory concept covering Changes Around Us: Physical and Chemical under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Changes Around Us: Physical and Chemical.",
      "Solve standard NCERT exemplar problems for Changes Around Us: Physical and Chemical."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH06",
    "official_title": "Adolescence: A Stage of Growth and Change",
    "pedagogical_description": "Authoritative statutory concept covering Adolescence: A Stage of Growth and Change under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Adolescence: A Stage of Growth and Change.",
      "Solve standard NCERT exemplar problems for Adolescence: A Stage of Growth and Change."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH07",
    "official_title": "Heat Transfer in Nature",
    "pedagogical_description": "Authoritative statutory concept covering Heat Transfer in Nature under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Heat Transfer in Nature.",
      "Solve standard NCERT exemplar problems for Heat Transfer in Nature."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH08",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH08",
    "official_title": "Measurement of Time and Motion",
    "pedagogical_description": "Authoritative statutory concept covering Measurement of Time and Motion under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Measurement of Time and Motion.",
      "Solve standard NCERT exemplar problems for Measurement of Time and Motion."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH09",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH09",
    "official_title": "Life Processes in Animals",
    "pedagogical_description": "Authoritative statutory concept covering Life Processes in Animals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Life Processes in Animals.",
      "Solve standard NCERT exemplar problems for Life Processes in Animals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH10",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH10",
    "official_title": "Life Processes in Plants",
    "pedagogical_description": "Authoritative statutory concept covering Life Processes in Plants under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Life Processes in Plants.",
      "Solve standard NCERT exemplar problems for Life Processes in Plants."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH11",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH11",
    "official_title": "Light: Shadows and Reflections",
    "pedagogical_description": "Authoritative statutory concept covering Light: Shadows and Reflections under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Light: Shadows and Reflections.",
      "Solve standard NCERT exemplar problems for Light: Shadows and Reflections."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G7-SCI-CH12",
    "concept_code": "CBSE-CBSE-CH-G7-SCI-CH12",
    "official_title": "Earth, Moon, and the Sun",
    "pedagogical_description": "Authoritative statutory concept covering Earth, Moon, and the Sun under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Earth, Moon, and the Sun.",
      "Solve standard NCERT exemplar problems for Earth, Moon, and the Sun."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH01",
    "official_title": "A Square and A Cube",
    "pedagogical_description": "Authoritative statutory concept covering A Square and A Cube under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Square and A Cube.",
      "Solve standard NCERT exemplar problems for A Square and A Cube."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH02",
    "official_title": "Power Play",
    "pedagogical_description": "Authoritative statutory concept covering Power Play under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Power Play.",
      "Solve standard NCERT exemplar problems for Power Play."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH03",
    "official_title": "A Story of Numbers",
    "pedagogical_description": "Authoritative statutory concept covering A Story of Numbers under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Story of Numbers.",
      "Solve standard NCERT exemplar problems for A Story of Numbers."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH04",
    "official_title": "Quadrilaterals",
    "pedagogical_description": "Authoritative statutory concept covering Quadrilaterals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Quadrilaterals.",
      "Solve standard NCERT exemplar problems for Quadrilaterals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH05",
    "official_title": "Number Play",
    "pedagogical_description": "Authoritative statutory concept covering Number Play under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Number Play.",
      "Solve standard NCERT exemplar problems for Number Play."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH06",
    "official_title": "We Distribute, Yet Things Multiply",
    "pedagogical_description": "Authoritative statutory concept covering We Distribute, Yet Things Multiply under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of We Distribute, Yet Things Multiply.",
      "Solve standard NCERT exemplar problems for We Distribute, Yet Things Multiply."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH07",
    "official_title": "Proportional Reasoning-1",
    "pedagogical_description": "Authoritative statutory concept covering Proportional Reasoning-1 under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Proportional Reasoning-1.",
      "Solve standard NCERT exemplar problems for Proportional Reasoning-1."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH08",
    "official_title": "Fractions in Disguise",
    "pedagogical_description": "Authoritative statutory concept covering Fractions in Disguise under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Fractions in Disguise.",
      "Solve standard NCERT exemplar problems for Fractions in Disguise."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH09",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH09",
    "official_title": "The Baudhayana-Pythagoras Theorem",
    "pedagogical_description": "Authoritative statutory concept covering The Baudhayana-Pythagoras Theorem under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Baudhayana-Pythagoras Theorem.",
      "Solve standard NCERT exemplar problems for The Baudhayana-Pythagoras Theorem."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH10",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH10",
    "official_title": "Proportional Reasoning-2",
    "pedagogical_description": "Authoritative statutory concept covering Proportional Reasoning-2 under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Proportional Reasoning-2.",
      "Solve standard NCERT exemplar problems for Proportional Reasoning-2."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH11",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH11",
    "official_title": "Exploring Some Geometric Themes",
    "pedagogical_description": "Authoritative statutory concept covering Exploring Some Geometric Themes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Exploring Some Geometric Themes.",
      "Solve standard NCERT exemplar problems for Exploring Some Geometric Themes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH12",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH12",
    "official_title": "Tales by Dots and Lines",
    "pedagogical_description": "Authoritative statutory concept covering Tales by Dots and Lines under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Tales by Dots and Lines.",
      "Solve standard NCERT exemplar problems for Tales by Dots and Lines."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH13",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH13",
    "official_title": "Algebra Play",
    "pedagogical_description": "Authoritative statutory concept covering Algebra Play under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Algebra Play.",
      "Solve standard NCERT exemplar problems for Algebra Play."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-MATH-CH14-01",
    "chapter_id": "CBSE-CH-G8-MATH-CH14",
    "concept_code": "CBSE-CBSE-CH-G8-MATH-CH14",
    "official_title": "Area",
    "pedagogical_description": "Authoritative statutory concept covering Area under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Area.",
      "Solve standard NCERT exemplar problems for Area."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH01-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH01",
    "official_title": "Units and Measurements",
    "pedagogical_description": "Authoritative statutory concept covering Units and Measurements under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Units and Measurements.",
      "Solve standard NCERT exemplar problems for Units and Measurements."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH02-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH02",
    "official_title": "Motion in a Straight Line",
    "pedagogical_description": "Authoritative statutory concept covering Motion in a Straight Line under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Motion in a Straight Line.",
      "Solve standard NCERT exemplar problems for Motion in a Straight Line."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH03-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH03",
    "official_title": "Motion in a Plane",
    "pedagogical_description": "Authoritative statutory concept covering Motion in a Plane under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Motion in a Plane.",
      "Solve standard NCERT exemplar problems for Motion in a Plane."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH04-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH04",
    "official_title": "Laws of Motion",
    "pedagogical_description": "Authoritative statutory concept covering Laws of Motion under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Laws of Motion.",
      "Solve standard NCERT exemplar problems for Laws of Motion."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH05-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH05",
    "official_title": "Work, Energy and Power",
    "pedagogical_description": "Authoritative statutory concept covering Work, Energy and Power under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Work, Energy and Power.",
      "Solve standard NCERT exemplar problems for Work, Energy and Power."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH06-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH06",
    "official_title": "System of Particles and Rotational Motion",
    "pedagogical_description": "Authoritative statutory concept covering System of Particles and Rotational Motion under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of System of Particles and Rotational Motion.",
      "Solve standard NCERT exemplar problems for System of Particles and Rotational Motion."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH07-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH07",
    "official_title": "Gravitation",
    "pedagogical_description": "Authoritative statutory concept covering Gravitation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Gravitation.",
      "Solve standard NCERT exemplar problems for Gravitation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH08-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH08",
    "official_title": "Mechanical Properties of Solids",
    "pedagogical_description": "Authoritative statutory concept covering Mechanical Properties of Solids under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Mechanical Properties of Solids.",
      "Solve standard NCERT exemplar problems for Mechanical Properties of Solids."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH09-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH09",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH09",
    "official_title": "Mechanical Properties of Fluids",
    "pedagogical_description": "Authoritative statutory concept covering Mechanical Properties of Fluids under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Mechanical Properties of Fluids.",
      "Solve standard NCERT exemplar problems for Mechanical Properties of Fluids."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH10-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH10",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH10",
    "official_title": "Thermal Properties of Matter",
    "pedagogical_description": "Authoritative statutory concept covering Thermal Properties of Matter under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Thermal Properties of Matter.",
      "Solve standard NCERT exemplar problems for Thermal Properties of Matter."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH11-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH11",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH11",
    "official_title": "Thermodynamics",
    "pedagogical_description": "Authoritative statutory concept covering Thermodynamics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Thermodynamics.",
      "Solve standard NCERT exemplar problems for Thermodynamics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH12-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH12",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH12",
    "official_title": "Kinetic Theory",
    "pedagogical_description": "Authoritative statutory concept covering Kinetic Theory under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Kinetic Theory.",
      "Solve standard NCERT exemplar problems for Kinetic Theory."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH13-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH13",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH13",
    "official_title": "Oscillations",
    "pedagogical_description": "Authoritative statutory concept covering Oscillations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Oscillations.",
      "Solve standard NCERT exemplar problems for Oscillations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PHY-CH14-01",
    "chapter_id": "CBSE-CH-G11-PHY-CH14",
    "concept_code": "CBSE-CBSE-CH-G11-PHY-CH14",
    "official_title": "Waves",
    "pedagogical_description": "Authoritative statutory concept covering Waves under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Waves.",
      "Solve standard NCERT exemplar problems for Waves."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH01-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH01",
    "official_title": "Some Basic Concepts of Chemistry",
    "pedagogical_description": "Authoritative statutory concept covering Some Basic Concepts of Chemistry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Some Basic Concepts of Chemistry.",
      "Solve standard NCERT exemplar problems for Some Basic Concepts of Chemistry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH02-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH02",
    "official_title": "Structure of Atom",
    "pedagogical_description": "Authoritative statutory concept covering Structure of Atom under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Structure of Atom.",
      "Solve standard NCERT exemplar problems for Structure of Atom."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH03-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH03",
    "official_title": "Classification of Elements and Periodicity in Properties",
    "pedagogical_description": "Authoritative statutory concept covering Classification of Elements and Periodicity in Properties under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Classification of Elements and Periodicity in Properties.",
      "Solve standard NCERT exemplar problems for Classification of Elements and Periodicity in Properties."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH04-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH04",
    "official_title": "Chemical Bonding and Molecular Structure",
    "pedagogical_description": "Authoritative statutory concept covering Chemical Bonding and Molecular Structure under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Chemical Bonding and Molecular Structure.",
      "Solve standard NCERT exemplar problems for Chemical Bonding and Molecular Structure."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH05-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH05",
    "official_title": "Chemical Thermodynamics",
    "pedagogical_description": "Authoritative statutory concept covering Chemical Thermodynamics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Chemical Thermodynamics.",
      "Solve standard NCERT exemplar problems for Chemical Thermodynamics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH06-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH06",
    "official_title": "Equilibrium",
    "pedagogical_description": "Authoritative statutory concept covering Equilibrium under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Equilibrium.",
      "Solve standard NCERT exemplar problems for Equilibrium."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH07-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH07",
    "official_title": "Redox Reactions",
    "pedagogical_description": "Authoritative statutory concept covering Redox Reactions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Redox Reactions.",
      "Solve standard NCERT exemplar problems for Redox Reactions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH08-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH08",
    "official_title": "Organic Chemistry: Some Basic Principles and Techniques",
    "pedagogical_description": "Authoritative statutory concept covering Organic Chemistry: Some Basic Principles and Techniques under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Organic Chemistry: Some Basic Principles and Techniques.",
      "Solve standard NCERT exemplar problems for Organic Chemistry: Some Basic Principles and Techniques."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH09-01",
    "chapter_id": "CBSE-CH-G11-CHEM-CH09",
    "concept_code": "CBSE-CBSE-CH-G11-CHEM-CH09",
    "official_title": "Hydrocarbons",
    "pedagogical_description": "Authoritative statutory concept covering Hydrocarbons under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Hydrocarbons.",
      "Solve standard NCERT exemplar problems for Hydrocarbons."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH01",
    "official_title": "Sets",
    "pedagogical_description": "Authoritative statutory concept covering Sets under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sets.",
      "Solve standard NCERT exemplar problems for Sets."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH02",
    "official_title": "Relations and Functions",
    "pedagogical_description": "Authoritative statutory concept covering Relations and Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Relations and Functions.",
      "Solve standard NCERT exemplar problems for Relations and Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH03",
    "official_title": "Trigonometric Functions",
    "pedagogical_description": "Authoritative statutory concept covering Trigonometric Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Trigonometric Functions.",
      "Solve standard NCERT exemplar problems for Trigonometric Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH04",
    "official_title": "Complex Numbers and Quadratic Equations",
    "pedagogical_description": "Authoritative statutory concept covering Complex Numbers and Quadratic Equations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Complex Numbers and Quadratic Equations.",
      "Solve standard NCERT exemplar problems for Complex Numbers and Quadratic Equations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH05",
    "official_title": "Linear Inequalities",
    "pedagogical_description": "Authoritative statutory concept covering Linear Inequalities under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Linear Inequalities.",
      "Solve standard NCERT exemplar problems for Linear Inequalities."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH06",
    "official_title": "Permutations and Combinations",
    "pedagogical_description": "Authoritative statutory concept covering Permutations and Combinations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Permutations and Combinations.",
      "Solve standard NCERT exemplar problems for Permutations and Combinations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH07",
    "official_title": "Binomial Theorem",
    "pedagogical_description": "Authoritative statutory concept covering Binomial Theorem under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Binomial Theorem.",
      "Solve standard NCERT exemplar problems for Binomial Theorem."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH08",
    "official_title": "Sequences and Series",
    "pedagogical_description": "Authoritative statutory concept covering Sequences and Series under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sequences and Series.",
      "Solve standard NCERT exemplar problems for Sequences and Series."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH09",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH09",
    "official_title": "Straight Lines",
    "pedagogical_description": "Authoritative statutory concept covering Straight Lines under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Straight Lines.",
      "Solve standard NCERT exemplar problems for Straight Lines."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH10",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH10",
    "official_title": "Conic Sections",
    "pedagogical_description": "Authoritative statutory concept covering Conic Sections under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Conic Sections.",
      "Solve standard NCERT exemplar problems for Conic Sections."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH11",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH11",
    "official_title": "Introduction to Three Dimensional Geometry",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Three Dimensional Geometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Three Dimensional Geometry.",
      "Solve standard NCERT exemplar problems for Introduction to Three Dimensional Geometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH12",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH12",
    "official_title": "Limits and Derivatives",
    "pedagogical_description": "Authoritative statutory concept covering Limits and Derivatives under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Limits and Derivatives.",
      "Solve standard NCERT exemplar problems for Limits and Derivatives."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH13",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH13",
    "official_title": "Statistics",
    "pedagogical_description": "Authoritative statutory concept covering Statistics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Statistics.",
      "Solve standard NCERT exemplar problems for Statistics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-MATH-CH14-01",
    "chapter_id": "CBSE-CH-G11-MATH-CH14",
    "concept_code": "CBSE-CBSE-CH-G11-MATH-CH14",
    "official_title": "Probability",
    "pedagogical_description": "Authoritative statutory concept covering Probability under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Probability.",
      "Solve standard NCERT exemplar problems for Probability."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH01-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH01",
    "official_title": "The Living World",
    "pedagogical_description": "Authoritative statutory concept covering The Living World under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Living World.",
      "Solve standard NCERT exemplar problems for The Living World."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH02-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH02",
    "official_title": "Biological Classification",
    "pedagogical_description": "Authoritative statutory concept covering Biological Classification under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Biological Classification.",
      "Solve standard NCERT exemplar problems for Biological Classification."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH03-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH03",
    "official_title": "Plant Kingdom",
    "pedagogical_description": "Authoritative statutory concept covering Plant Kingdom under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Plant Kingdom.",
      "Solve standard NCERT exemplar problems for Plant Kingdom."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH04-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH04",
    "official_title": "Animal Kingdom",
    "pedagogical_description": "Authoritative statutory concept covering Animal Kingdom under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Animal Kingdom.",
      "Solve standard NCERT exemplar problems for Animal Kingdom."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH05-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH05",
    "official_title": "Morphology of Flowering Plants",
    "pedagogical_description": "Authoritative statutory concept covering Morphology of Flowering Plants under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Morphology of Flowering Plants.",
      "Solve standard NCERT exemplar problems for Morphology of Flowering Plants."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH06-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH06",
    "official_title": "Anatomy of Flowering Plants",
    "pedagogical_description": "Authoritative statutory concept covering Anatomy of Flowering Plants under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Anatomy of Flowering Plants.",
      "Solve standard NCERT exemplar problems for Anatomy of Flowering Plants."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH07-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH07",
    "official_title": "Structural Organisation in Animals",
    "pedagogical_description": "Authoritative statutory concept covering Structural Organisation in Animals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Structural Organisation in Animals.",
      "Solve standard NCERT exemplar problems for Structural Organisation in Animals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH08-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH08",
    "official_title": "Cell: The Unit of Life",
    "pedagogical_description": "Authoritative statutory concept covering Cell: The Unit of Life under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Cell: The Unit of Life.",
      "Solve standard NCERT exemplar problems for Cell: The Unit of Life."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH09-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH09",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH09",
    "official_title": "Biomolecules",
    "pedagogical_description": "Authoritative statutory concept covering Biomolecules under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Biomolecules.",
      "Solve standard NCERT exemplar problems for Biomolecules."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH10-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH10",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH10",
    "official_title": "Cell Cycle and Cell Division",
    "pedagogical_description": "Authoritative statutory concept covering Cell Cycle and Cell Division under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Cell Cycle and Cell Division.",
      "Solve standard NCERT exemplar problems for Cell Cycle and Cell Division."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH11-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH11",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH11",
    "official_title": "Photosynthesis in Higher Plants",
    "pedagogical_description": "Authoritative statutory concept covering Photosynthesis in Higher Plants under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Photosynthesis in Higher Plants.",
      "Solve standard NCERT exemplar problems for Photosynthesis in Higher Plants."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH12-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH12",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH12",
    "official_title": "Respiration in Plants",
    "pedagogical_description": "Authoritative statutory concept covering Respiration in Plants under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Respiration in Plants.",
      "Solve standard NCERT exemplar problems for Respiration in Plants."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH13-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH13",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH13",
    "official_title": "Plant Growth and Development",
    "pedagogical_description": "Authoritative statutory concept covering Plant Growth and Development under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Plant Growth and Development.",
      "Solve standard NCERT exemplar problems for Plant Growth and Development."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH14-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH14",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH14",
    "official_title": "Breathing and Exchange of Gases",
    "pedagogical_description": "Authoritative statutory concept covering Breathing and Exchange of Gases under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Breathing and Exchange of Gases.",
      "Solve standard NCERT exemplar problems for Breathing and Exchange of Gases."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH15-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH15",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH15",
    "official_title": "Body Fluids and Circulation",
    "pedagogical_description": "Authoritative statutory concept covering Body Fluids and Circulation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Body Fluids and Circulation.",
      "Solve standard NCERT exemplar problems for Body Fluids and Circulation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH16-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH16",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH16",
    "official_title": "Excretory Products and their Elimination",
    "pedagogical_description": "Authoritative statutory concept covering Excretory Products and their Elimination under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Excretory Products and their Elimination.",
      "Solve standard NCERT exemplar problems for Excretory Products and their Elimination."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH17-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH17",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH17",
    "official_title": "Locomotion and Movement",
    "pedagogical_description": "Authoritative statutory concept covering Locomotion and Movement under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Locomotion and Movement.",
      "Solve standard NCERT exemplar problems for Locomotion and Movement."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH18-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH18",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH18",
    "official_title": "Neural Control and Coordination",
    "pedagogical_description": "Authoritative statutory concept covering Neural Control and Coordination under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Neural Control and Coordination.",
      "Solve standard NCERT exemplar problems for Neural Control and Coordination."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BIO-CH19-01",
    "chapter_id": "CBSE-CH-G11-BIO-CH19",
    "concept_code": "CBSE-CBSE-CH-G11-BIO-CH19",
    "official_title": "Chemical Coordination and Integration",
    "pedagogical_description": "Authoritative statutory concept covering Chemical Coordination and Integration under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Chemical Coordination and Integration.",
      "Solve standard NCERT exemplar problems for Chemical Coordination and Integration."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CS-CH01-01",
    "chapter_id": "CBSE-CH-G11-CS-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-CS-CH01",
    "official_title": "Computer System Overview",
    "pedagogical_description": "Authoritative statutory concept covering Computer System Overview under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Computer System Overview.",
      "Solve standard NCERT exemplar problems for Computer System Overview."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CS-CH02-01",
    "chapter_id": "CBSE-CH-G11-CS-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-CS-CH02",
    "official_title": "Data Representation",
    "pedagogical_description": "Authoritative statutory concept covering Data Representation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Data Representation.",
      "Solve standard NCERT exemplar problems for Data Representation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CS-CH03-01",
    "chapter_id": "CBSE-CH-G11-CS-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-CS-CH03",
    "official_title": "Boolean Logic",
    "pedagogical_description": "Authoritative statutory concept covering Boolean Logic under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Boolean Logic.",
      "Solve standard NCERT exemplar problems for Boolean Logic."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CS-CH04-01",
    "chapter_id": "CBSE-CH-G11-CS-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-CS-CH04",
    "official_title": "Introduction to Problem Solving",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Problem Solving under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Problem Solving.",
      "Solve standard NCERT exemplar problems for Introduction to Problem Solving."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CS-CH05-01",
    "chapter_id": "CBSE-CH-G11-CS-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-CS-CH05",
    "official_title": "Getting Started with Python",
    "pedagogical_description": "Authoritative statutory concept covering Getting Started with Python under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Getting Started with Python.",
      "Solve standard NCERT exemplar problems for Getting Started with Python."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CS-CH06-01",
    "chapter_id": "CBSE-CH-G11-CS-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-CS-CH06",
    "official_title": "Python Fundamentals",
    "pedagogical_description": "Authoritative statutory concept covering Python Fundamentals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Python Fundamentals.",
      "Solve standard NCERT exemplar problems for Python Fundamentals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CS-CH07-01",
    "chapter_id": "CBSE-CH-G11-CS-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-CS-CH07",
    "official_title": "Data Handling",
    "pedagogical_description": "Authoritative statutory concept covering Data Handling under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Data Handling.",
      "Solve standard NCERT exemplar problems for Data Handling."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-CS-CH08-01",
    "chapter_id": "CBSE-CH-G11-CS-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-CS-CH08",
    "official_title": "Flow of Control",
    "pedagogical_description": "Authoritative statutory concept covering Flow of Control under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Flow of Control.",
      "Solve standard NCERT exemplar problems for Flow of Control."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-ENG-CH01",
    "official_title": "The Portrait of a Lady",
    "pedagogical_description": "Authoritative statutory concept covering The Portrait of a Lady under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Portrait of a Lady.",
      "Solve standard NCERT exemplar problems for The Portrait of a Lady."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-ENG-CH02",
    "official_title": "We're Not Afraid to Die... if We Can All Be Together",
    "pedagogical_description": "Authoritative statutory concept covering We're Not Afraid to Die... if We Can All Be Together under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of We're Not Afraid to Die... if We Can All Be Together.",
      "Solve standard NCERT exemplar problems for We're Not Afraid to Die... if We Can All Be Together."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-ENG-CH03",
    "official_title": "Discovering Tut: the Saga Continues",
    "pedagogical_description": "Authoritative statutory concept covering Discovering Tut: the Saga Continues under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Discovering Tut: the Saga Continues.",
      "Solve standard NCERT exemplar problems for Discovering Tut: the Saga Continues."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-ENG-CH04",
    "official_title": "The Laburnum Top",
    "pedagogical_description": "Authoritative statutory concept covering The Laburnum Top under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Laburnum Top.",
      "Solve standard NCERT exemplar problems for The Laburnum Top."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-ENG-CH05",
    "official_title": "The Voice of the Rain",
    "pedagogical_description": "Authoritative statutory concept covering The Voice of the Rain under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Voice of the Rain.",
      "Solve standard NCERT exemplar problems for The Voice of the Rain."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-ENG-CH06",
    "official_title": "Childhood",
    "pedagogical_description": "Authoritative statutory concept covering Childhood under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Childhood.",
      "Solve standard NCERT exemplar problems for Childhood."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-ENG-CH07",
    "official_title": "The Adventure",
    "pedagogical_description": "Authoritative statutory concept covering The Adventure under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Adventure.",
      "Solve standard NCERT exemplar problems for The Adventure."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G11-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-ENG-CH08",
    "official_title": "Silk Road",
    "pedagogical_description": "Authoritative statutory concept covering Silk Road under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Silk Road.",
      "Solve standard NCERT exemplar problems for Silk Road."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ACC-CH01-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-ACC-CH01",
    "official_title": "Introduction to Accounting",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Accounting under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Accounting.",
      "Solve standard NCERT exemplar problems for Introduction to Accounting."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ACC-CH02-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-ACC-CH02",
    "official_title": "Theory Base of Accounting",
    "pedagogical_description": "Authoritative statutory concept covering Theory Base of Accounting under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Theory Base of Accounting.",
      "Solve standard NCERT exemplar problems for Theory Base of Accounting."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ACC-CH03-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-ACC-CH03",
    "official_title": "Recording of Transactions - I",
    "pedagogical_description": "Authoritative statutory concept covering Recording of Transactions - I under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Recording of Transactions - I.",
      "Solve standard NCERT exemplar problems for Recording of Transactions - I."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ACC-CH04-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-ACC-CH04",
    "official_title": "Recording of Transactions - II",
    "pedagogical_description": "Authoritative statutory concept covering Recording of Transactions - II under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Recording of Transactions - II.",
      "Solve standard NCERT exemplar problems for Recording of Transactions - II."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ACC-CH05-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-ACC-CH05",
    "official_title": "Bank Reconciliation Statement",
    "pedagogical_description": "Authoritative statutory concept covering Bank Reconciliation Statement under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Bank Reconciliation Statement.",
      "Solve standard NCERT exemplar problems for Bank Reconciliation Statement."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ACC-CH06-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-ACC-CH06",
    "official_title": "Trial Balance and Rectification of Errors",
    "pedagogical_description": "Authoritative statutory concept covering Trial Balance and Rectification of Errors under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Trial Balance and Rectification of Errors.",
      "Solve standard NCERT exemplar problems for Trial Balance and Rectification of Errors."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ACC-CH07-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-ACC-CH07",
    "official_title": "Depreciation, Provisions and Reserves",
    "pedagogical_description": "Authoritative statutory concept covering Depreciation, Provisions and Reserves under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Depreciation, Provisions and Reserves.",
      "Solve standard NCERT exemplar problems for Depreciation, Provisions and Reserves."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ACC-CH08-01",
    "chapter_id": "CBSE-CH-G11-ACC-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-ACC-CH08",
    "official_title": "Financial Statements - I",
    "pedagogical_description": "Authoritative statutory concept covering Financial Statements - I under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Financial Statements - I.",
      "Solve standard NCERT exemplar problems for Financial Statements - I."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BST-CH01-01",
    "chapter_id": "CBSE-CH-G11-BST-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-BST-CH01",
    "official_title": "Business, Trade and Commerce",
    "pedagogical_description": "Authoritative statutory concept covering Business, Trade and Commerce under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Business, Trade and Commerce.",
      "Solve standard NCERT exemplar problems for Business, Trade and Commerce."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BST-CH02-01",
    "chapter_id": "CBSE-CH-G11-BST-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-BST-CH02",
    "official_title": "Forms of Business Organisation",
    "pedagogical_description": "Authoritative statutory concept covering Forms of Business Organisation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Forms of Business Organisation.",
      "Solve standard NCERT exemplar problems for Forms of Business Organisation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BST-CH03-01",
    "chapter_id": "CBSE-CH-G11-BST-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-BST-CH03",
    "official_title": "Private, Public and Global Enterprises",
    "pedagogical_description": "Authoritative statutory concept covering Private, Public and Global Enterprises under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Private, Public and Global Enterprises.",
      "Solve standard NCERT exemplar problems for Private, Public and Global Enterprises."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BST-CH04-01",
    "chapter_id": "CBSE-CH-G11-BST-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-BST-CH04",
    "official_title": "Business Services",
    "pedagogical_description": "Authoritative statutory concept covering Business Services under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Business Services.",
      "Solve standard NCERT exemplar problems for Business Services."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BST-CH05-01",
    "chapter_id": "CBSE-CH-G11-BST-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-BST-CH05",
    "official_title": "Emerging Modes of Business",
    "pedagogical_description": "Authoritative statutory concept covering Emerging Modes of Business under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Emerging Modes of Business.",
      "Solve standard NCERT exemplar problems for Emerging Modes of Business."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-BST-CH06-01",
    "chapter_id": "CBSE-CH-G11-BST-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-BST-CH06",
    "official_title": "Social Responsibilities of Business and Business Ethics",
    "pedagogical_description": "Authoritative statutory concept covering Social Responsibilities of Business and Business Ethics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Social Responsibilities of Business and Business Ethics.",
      "Solve standard NCERT exemplar problems for Social Responsibilities of Business and Business Ethics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ECON-CH01-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-ECON-CH01",
    "official_title": "Introduction to Economics",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Economics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Economics.",
      "Solve standard NCERT exemplar problems for Introduction to Economics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ECON-CH02-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-ECON-CH02",
    "official_title": "Collection of Data",
    "pedagogical_description": "Authoritative statutory concept covering Collection of Data under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Collection of Data.",
      "Solve standard NCERT exemplar problems for Collection of Data."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ECON-CH03-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-ECON-CH03",
    "official_title": "Organisation of Data",
    "pedagogical_description": "Authoritative statutory concept covering Organisation of Data under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Organisation of Data.",
      "Solve standard NCERT exemplar problems for Organisation of Data."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ECON-CH04-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-ECON-CH04",
    "official_title": "Presentation of Data",
    "pedagogical_description": "Authoritative statutory concept covering Presentation of Data under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Presentation of Data.",
      "Solve standard NCERT exemplar problems for Presentation of Data."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ECON-CH05-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-ECON-CH05",
    "official_title": "Measures of Central Tendency",
    "pedagogical_description": "Authoritative statutory concept covering Measures of Central Tendency under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Measures of Central Tendency.",
      "Solve standard NCERT exemplar problems for Measures of Central Tendency."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-ECON-CH06-01",
    "chapter_id": "CBSE-CH-G11-ECON-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-ECON-CH06",
    "official_title": "Correlation",
    "pedagogical_description": "Authoritative statutory concept covering Correlation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Correlation.",
      "Solve standard NCERT exemplar problems for Correlation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH01",
    "official_title": "Sets",
    "pedagogical_description": "Authoritative statutory concept covering Sets under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sets.",
      "Solve standard NCERT exemplar problems for Sets."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH02",
    "official_title": "Relations and Functions",
    "pedagogical_description": "Authoritative statutory concept covering Relations and Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Relations and Functions.",
      "Solve standard NCERT exemplar problems for Relations and Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH03",
    "official_title": "Trigonometric Functions",
    "pedagogical_description": "Authoritative statutory concept covering Trigonometric Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Trigonometric Functions.",
      "Solve standard NCERT exemplar problems for Trigonometric Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH04",
    "official_title": "Complex Numbers and Quadratic Equations",
    "pedagogical_description": "Authoritative statutory concept covering Complex Numbers and Quadratic Equations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Complex Numbers and Quadratic Equations.",
      "Solve standard NCERT exemplar problems for Complex Numbers and Quadratic Equations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH05",
    "official_title": "Linear Inequalities",
    "pedagogical_description": "Authoritative statutory concept covering Linear Inequalities under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Linear Inequalities.",
      "Solve standard NCERT exemplar problems for Linear Inequalities."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH06",
    "official_title": "Permutations and Combinations",
    "pedagogical_description": "Authoritative statutory concept covering Permutations and Combinations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Permutations and Combinations.",
      "Solve standard NCERT exemplar problems for Permutations and Combinations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH07",
    "official_title": "Binomial Theorem",
    "pedagogical_description": "Authoritative statutory concept covering Binomial Theorem under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Binomial Theorem.",
      "Solve standard NCERT exemplar problems for Binomial Theorem."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH08",
    "official_title": "Sequences and Series",
    "pedagogical_description": "Authoritative statutory concept covering Sequences and Series under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sequences and Series.",
      "Solve standard NCERT exemplar problems for Sequences and Series."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH09",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH09",
    "official_title": "Straight Lines",
    "pedagogical_description": "Authoritative statutory concept covering Straight Lines under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Straight Lines.",
      "Solve standard NCERT exemplar problems for Straight Lines."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH10",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH10",
    "official_title": "Conic Sections",
    "pedagogical_description": "Authoritative statutory concept covering Conic Sections under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Conic Sections.",
      "Solve standard NCERT exemplar problems for Conic Sections."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH11",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH11",
    "official_title": "Introduction to Three Dimensional Geometry",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Three Dimensional Geometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Three Dimensional Geometry.",
      "Solve standard NCERT exemplar problems for Introduction to Three Dimensional Geometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH12",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH12",
    "official_title": "Limits and Derivatives",
    "pedagogical_description": "Authoritative statutory concept covering Limits and Derivatives under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Limits and Derivatives.",
      "Solve standard NCERT exemplar problems for Limits and Derivatives."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH13",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH13",
    "official_title": "Statistics",
    "pedagogical_description": "Authoritative statutory concept covering Statistics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Statistics.",
      "Solve standard NCERT exemplar problems for Statistics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH14-01",
    "chapter_id": "CBSE-CH-G11-COM-MATH-CH14",
    "concept_code": "CBSE-CBSE-CH-G11-COM-MATH-CH14",
    "official_title": "Probability",
    "pedagogical_description": "Authoritative statutory concept covering Probability under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Probability.",
      "Solve standard NCERT exemplar problems for Probability."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-COM-ENG-CH01",
    "official_title": "The Portrait of a Lady",
    "pedagogical_description": "Authoritative statutory concept covering The Portrait of a Lady under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Portrait of a Lady.",
      "Solve standard NCERT exemplar problems for The Portrait of a Lady."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-COM-ENG-CH02",
    "official_title": "We're Not Afraid to Die... if We Can All Be Together",
    "pedagogical_description": "Authoritative statutory concept covering We're Not Afraid to Die... if We Can All Be Together under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of We're Not Afraid to Die... if We Can All Be Together.",
      "Solve standard NCERT exemplar problems for We're Not Afraid to Die... if We Can All Be Together."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-COM-ENG-CH03",
    "official_title": "Discovering Tut: the Saga Continues",
    "pedagogical_description": "Authoritative statutory concept covering Discovering Tut: the Saga Continues under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Discovering Tut: the Saga Continues.",
      "Solve standard NCERT exemplar problems for Discovering Tut: the Saga Continues."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-COM-ENG-CH04",
    "official_title": "The Laburnum Top",
    "pedagogical_description": "Authoritative statutory concept covering The Laburnum Top under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Laburnum Top.",
      "Solve standard NCERT exemplar problems for The Laburnum Top."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-COM-ENG-CH05",
    "official_title": "The Voice of the Rain",
    "pedagogical_description": "Authoritative statutory concept covering The Voice of the Rain under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Voice of the Rain.",
      "Solve standard NCERT exemplar problems for The Voice of the Rain."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-COM-ENG-CH06",
    "official_title": "Childhood",
    "pedagogical_description": "Authoritative statutory concept covering Childhood under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Childhood.",
      "Solve standard NCERT exemplar problems for Childhood."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-COM-ENG-CH07",
    "official_title": "The Adventure",
    "pedagogical_description": "Authoritative statutory concept covering The Adventure under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Adventure.",
      "Solve standard NCERT exemplar problems for The Adventure."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G11-COM-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-COM-ENG-CH08",
    "official_title": "Silk Road",
    "pedagogical_description": "Authoritative statutory concept covering Silk Road under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Silk Road.",
      "Solve standard NCERT exemplar problems for Silk Road."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HIST-CH01-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-HIST-CH01",
    "official_title": "Writing and City Life",
    "pedagogical_description": "Authoritative statutory concept covering Writing and City Life under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Writing and City Life.",
      "Solve standard NCERT exemplar problems for Writing and City Life."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HIST-CH02-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-HIST-CH02",
    "official_title": "An Empire Across Three Continents",
    "pedagogical_description": "Authoritative statutory concept covering An Empire Across Three Continents under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of An Empire Across Three Continents.",
      "Solve standard NCERT exemplar problems for An Empire Across Three Continents."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HIST-CH03-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-HIST-CH03",
    "official_title": "Nomadic Empires",
    "pedagogical_description": "Authoritative statutory concept covering Nomadic Empires under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Nomadic Empires.",
      "Solve standard NCERT exemplar problems for Nomadic Empires."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HIST-CH04-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-HIST-CH04",
    "official_title": "The Three Orders",
    "pedagogical_description": "Authoritative statutory concept covering The Three Orders under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Three Orders.",
      "Solve standard NCERT exemplar problems for The Three Orders."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HIST-CH05-01",
    "chapter_id": "CBSE-CH-G11-HIST-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-HIST-CH05",
    "official_title": "Changing Cultural Traditions",
    "pedagogical_description": "Authoritative statutory concept covering Changing Cultural Traditions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Changing Cultural Traditions.",
      "Solve standard NCERT exemplar problems for Changing Cultural Traditions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH01-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-POLSCI-CH01",
    "official_title": "Constitution: Why and How?",
    "pedagogical_description": "Authoritative statutory concept covering Constitution: Why and How? under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Constitution: Why and How?.",
      "Solve standard NCERT exemplar problems for Constitution: Why and How?."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH02-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-POLSCI-CH02",
    "official_title": "Rights in the Indian Constitution",
    "pedagogical_description": "Authoritative statutory concept covering Rights in the Indian Constitution under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Rights in the Indian Constitution.",
      "Solve standard NCERT exemplar problems for Rights in the Indian Constitution."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH03-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-POLSCI-CH03",
    "official_title": "Election and Representation",
    "pedagogical_description": "Authoritative statutory concept covering Election and Representation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Election and Representation.",
      "Solve standard NCERT exemplar problems for Election and Representation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH04-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-POLSCI-CH04",
    "official_title": "Executive",
    "pedagogical_description": "Authoritative statutory concept covering Executive under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Executive.",
      "Solve standard NCERT exemplar problems for Executive."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH05-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-POLSCI-CH05",
    "official_title": "Legislature",
    "pedagogical_description": "Authoritative statutory concept covering Legislature under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Legislature.",
      "Solve standard NCERT exemplar problems for Legislature."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH06-01",
    "chapter_id": "CBSE-CH-G11-POLSCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-POLSCI-CH06",
    "official_title": "Judiciary",
    "pedagogical_description": "Authoritative statutory concept covering Judiciary under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Judiciary.",
      "Solve standard NCERT exemplar problems for Judiciary."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH01-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-GEOG-CH01",
    "official_title": "Geography as a Discipline",
    "pedagogical_description": "Authoritative statutory concept covering Geography as a Discipline under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Geography as a Discipline.",
      "Solve standard NCERT exemplar problems for Geography as a Discipline."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH02-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-GEOG-CH02",
    "official_title": "The Origin and Evolution of the Earth",
    "pedagogical_description": "Authoritative statutory concept covering The Origin and Evolution of the Earth under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Origin and Evolution of the Earth.",
      "Solve standard NCERT exemplar problems for The Origin and Evolution of the Earth."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH03-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-GEOG-CH03",
    "official_title": "Interior of the Earth",
    "pedagogical_description": "Authoritative statutory concept covering Interior of the Earth under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Interior of the Earth.",
      "Solve standard NCERT exemplar problems for Interior of the Earth."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH04-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-GEOG-CH04",
    "official_title": "Distribution of Oceans and Continents",
    "pedagogical_description": "Authoritative statutory concept covering Distribution of Oceans and Continents under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Distribution of Oceans and Continents.",
      "Solve standard NCERT exemplar problems for Distribution of Oceans and Continents."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH05-01",
    "chapter_id": "CBSE-CH-G11-GEOG-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-GEOG-CH05",
    "official_title": "Geomorphic Processes",
    "pedagogical_description": "Authoritative statutory concept covering Geomorphic Processes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Geomorphic Processes.",
      "Solve standard NCERT exemplar problems for Geomorphic Processes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH01-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-SOCIO-CH01",
    "official_title": "Sociology and Society",
    "pedagogical_description": "Authoritative statutory concept covering Sociology and Society under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sociology and Society.",
      "Solve standard NCERT exemplar problems for Sociology and Society."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH02-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-SOCIO-CH02",
    "official_title": "Terms, Concepts and their use in Sociology",
    "pedagogical_description": "Authoritative statutory concept covering Terms, Concepts and their use in Sociology under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Terms, Concepts and their use in Sociology.",
      "Solve standard NCERT exemplar problems for Terms, Concepts and their use in Sociology."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH03-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-SOCIO-CH03",
    "official_title": "Understanding Social Institutions",
    "pedagogical_description": "Authoritative statutory concept covering Understanding Social Institutions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Understanding Social Institutions.",
      "Solve standard NCERT exemplar problems for Understanding Social Institutions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH04-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-SOCIO-CH04",
    "official_title": "Culture and Socialisation",
    "pedagogical_description": "Authoritative statutory concept covering Culture and Socialisation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Culture and Socialisation.",
      "Solve standard NCERT exemplar problems for Culture and Socialisation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH05-01",
    "chapter_id": "CBSE-CH-G11-SOCIO-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-SOCIO-CH05",
    "official_title": "Doing Sociology: Research Methods",
    "pedagogical_description": "Authoritative statutory concept covering Doing Sociology: Research Methods under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Doing Sociology: Research Methods.",
      "Solve standard NCERT exemplar problems for Doing Sociology: Research Methods."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH01-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-PSYCH-CH01",
    "official_title": "What is Psychology?",
    "pedagogical_description": "Authoritative statutory concept covering What is Psychology? under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of What is Psychology?.",
      "Solve standard NCERT exemplar problems for What is Psychology?."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH02-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-PSYCH-CH02",
    "official_title": "Methods of Enquiry in Psychology",
    "pedagogical_description": "Authoritative statutory concept covering Methods of Enquiry in Psychology under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Methods of Enquiry in Psychology.",
      "Solve standard NCERT exemplar problems for Methods of Enquiry in Psychology."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH03-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-PSYCH-CH03",
    "official_title": "The Bases of Human Behaviour",
    "pedagogical_description": "Authoritative statutory concept covering The Bases of Human Behaviour under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Bases of Human Behaviour.",
      "Solve standard NCERT exemplar problems for The Bases of Human Behaviour."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH04-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-PSYCH-CH04",
    "official_title": "Human Development",
    "pedagogical_description": "Authoritative statutory concept covering Human Development under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Human Development.",
      "Solve standard NCERT exemplar problems for Human Development."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH05-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-PSYCH-CH05",
    "official_title": "Sensory, Attentional and Perceptual Processes",
    "pedagogical_description": "Authoritative statutory concept covering Sensory, Attentional and Perceptual Processes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sensory, Attentional and Perceptual Processes.",
      "Solve standard NCERT exemplar problems for Sensory, Attentional and Perceptual Processes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH06-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-PSYCH-CH06",
    "official_title": "Learning",
    "pedagogical_description": "Authoritative statutory concept covering Learning under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Learning.",
      "Solve standard NCERT exemplar problems for Learning."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH07-01",
    "chapter_id": "CBSE-CH-G11-PSYCH-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-PSYCH-CH07",
    "official_title": "Human Memory",
    "pedagogical_description": "Authoritative statutory concept covering Human Memory under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Human Memory.",
      "Solve standard NCERT exemplar problems for Human Memory."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH01-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ECON-CH01",
    "official_title": "Introduction to Economics",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Economics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Economics.",
      "Solve standard NCERT exemplar problems for Introduction to Economics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH02-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ECON-CH02",
    "official_title": "Collection of Data",
    "pedagogical_description": "Authoritative statutory concept covering Collection of Data under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Collection of Data.",
      "Solve standard NCERT exemplar problems for Collection of Data."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH03-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ECON-CH03",
    "official_title": "Organisation of Data",
    "pedagogical_description": "Authoritative statutory concept covering Organisation of Data under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Organisation of Data.",
      "Solve standard NCERT exemplar problems for Organisation of Data."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH04-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ECON-CH04",
    "official_title": "Presentation of Data",
    "pedagogical_description": "Authoritative statutory concept covering Presentation of Data under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Presentation of Data.",
      "Solve standard NCERT exemplar problems for Presentation of Data."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH05-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ECON-CH05",
    "official_title": "Measures of Central Tendency",
    "pedagogical_description": "Authoritative statutory concept covering Measures of Central Tendency under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Measures of Central Tendency.",
      "Solve standard NCERT exemplar problems for Measures of Central Tendency."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH06-01",
    "chapter_id": "CBSE-CH-G11-HUM-ECON-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ECON-CH06",
    "official_title": "Correlation",
    "pedagogical_description": "Authoritative statutory concept covering Correlation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Correlation.",
      "Solve standard NCERT exemplar problems for Correlation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ENG-CH01",
    "official_title": "The Portrait of a Lady",
    "pedagogical_description": "Authoritative statutory concept covering The Portrait of a Lady under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Portrait of a Lady.",
      "Solve standard NCERT exemplar problems for The Portrait of a Lady."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ENG-CH02",
    "official_title": "We're Not Afraid to Die... if We Can All Be Together",
    "pedagogical_description": "Authoritative statutory concept covering We're Not Afraid to Die... if We Can All Be Together under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of We're Not Afraid to Die... if We Can All Be Together.",
      "Solve standard NCERT exemplar problems for We're Not Afraid to Die... if We Can All Be Together."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ENG-CH03",
    "official_title": "Discovering Tut: the Saga Continues",
    "pedagogical_description": "Authoritative statutory concept covering Discovering Tut: the Saga Continues under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Discovering Tut: the Saga Continues.",
      "Solve standard NCERT exemplar problems for Discovering Tut: the Saga Continues."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ENG-CH04",
    "official_title": "The Laburnum Top",
    "pedagogical_description": "Authoritative statutory concept covering The Laburnum Top under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Laburnum Top.",
      "Solve standard NCERT exemplar problems for The Laburnum Top."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ENG-CH05",
    "official_title": "The Voice of the Rain",
    "pedagogical_description": "Authoritative statutory concept covering The Voice of the Rain under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Voice of the Rain.",
      "Solve standard NCERT exemplar problems for The Voice of the Rain."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ENG-CH06",
    "official_title": "Childhood",
    "pedagogical_description": "Authoritative statutory concept covering Childhood under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Childhood.",
      "Solve standard NCERT exemplar problems for Childhood."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ENG-CH07",
    "official_title": "The Adventure",
    "pedagogical_description": "Authoritative statutory concept covering The Adventure under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Adventure.",
      "Solve standard NCERT exemplar problems for The Adventure."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G11-HUM-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G11-HUM-ENG-CH08",
    "official_title": "Silk Road",
    "pedagogical_description": "Authoritative statutory concept covering Silk Road under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Silk Road.",
      "Solve standard NCERT exemplar problems for Silk Road."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH01-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH01",
    "official_title": "Electric Charges and Fields",
    "pedagogical_description": "Authoritative statutory concept covering Electric Charges and Fields under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Electric Charges and Fields.",
      "Solve standard NCERT exemplar problems for Electric Charges and Fields."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH02-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH02",
    "official_title": "Electrostatic Potential and Capacitance",
    "pedagogical_description": "Authoritative statutory concept covering Electrostatic Potential and Capacitance under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Electrostatic Potential and Capacitance.",
      "Solve standard NCERT exemplar problems for Electrostatic Potential and Capacitance."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH03-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH03",
    "official_title": "Current Electricity",
    "pedagogical_description": "Authoritative statutory concept covering Current Electricity under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Current Electricity.",
      "Solve standard NCERT exemplar problems for Current Electricity."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH04-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH04",
    "official_title": "Moving Charges and Magnetism",
    "pedagogical_description": "Authoritative statutory concept covering Moving Charges and Magnetism under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Moving Charges and Magnetism.",
      "Solve standard NCERT exemplar problems for Moving Charges and Magnetism."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH05-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH05",
    "official_title": "Magnetism and Matter",
    "pedagogical_description": "Authoritative statutory concept covering Magnetism and Matter under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Magnetism and Matter.",
      "Solve standard NCERT exemplar problems for Magnetism and Matter."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH06-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH06",
    "official_title": "Electromagnetic Induction",
    "pedagogical_description": "Authoritative statutory concept covering Electromagnetic Induction under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Electromagnetic Induction.",
      "Solve standard NCERT exemplar problems for Electromagnetic Induction."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH07-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH07",
    "official_title": "Alternating Current",
    "pedagogical_description": "Authoritative statutory concept covering Alternating Current under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Alternating Current.",
      "Solve standard NCERT exemplar problems for Alternating Current."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH08-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH08",
    "official_title": "Electromagnetic Waves",
    "pedagogical_description": "Authoritative statutory concept covering Electromagnetic Waves under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Electromagnetic Waves.",
      "Solve standard NCERT exemplar problems for Electromagnetic Waves."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH09-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH09",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH09",
    "official_title": "Ray Optics and Optical Instruments",
    "pedagogical_description": "Authoritative statutory concept covering Ray Optics and Optical Instruments under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Ray Optics and Optical Instruments.",
      "Solve standard NCERT exemplar problems for Ray Optics and Optical Instruments."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH10-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH10",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH10",
    "official_title": "Wave Optics",
    "pedagogical_description": "Authoritative statutory concept covering Wave Optics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Wave Optics.",
      "Solve standard NCERT exemplar problems for Wave Optics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH11-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH11",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH11",
    "official_title": "Dual Nature of Radiation and Matter",
    "pedagogical_description": "Authoritative statutory concept covering Dual Nature of Radiation and Matter under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Dual Nature of Radiation and Matter.",
      "Solve standard NCERT exemplar problems for Dual Nature of Radiation and Matter."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH12-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH12",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH12",
    "official_title": "Atoms",
    "pedagogical_description": "Authoritative statutory concept covering Atoms under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Atoms.",
      "Solve standard NCERT exemplar problems for Atoms."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH13-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH13",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH13",
    "official_title": "Nuclei",
    "pedagogical_description": "Authoritative statutory concept covering Nuclei under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Nuclei.",
      "Solve standard NCERT exemplar problems for Nuclei."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PHY-CH14-01",
    "chapter_id": "CBSE-CH-G12-PHY-CH14",
    "concept_code": "CBSE-CBSE-CH-G12-PHY-CH14",
    "official_title": "Semiconductor Electronics: Materials, Devices and Simple Circuits",
    "pedagogical_description": "Authoritative statutory concept covering Semiconductor Electronics: Materials, Devices and Simple Circuits under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Semiconductor Electronics: Materials, Devices and Simple Circuits.",
      "Solve standard NCERT exemplar problems for Semiconductor Electronics: Materials, Devices and Simple Circuits."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH01-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH01",
    "official_title": "Solutions",
    "pedagogical_description": "Authoritative statutory concept covering Solutions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Solutions.",
      "Solve standard NCERT exemplar problems for Solutions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH02-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH02",
    "official_title": "Electrochemistry",
    "pedagogical_description": "Authoritative statutory concept covering Electrochemistry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Electrochemistry.",
      "Solve standard NCERT exemplar problems for Electrochemistry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH03-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH03",
    "official_title": "Chemical Kinetics",
    "pedagogical_description": "Authoritative statutory concept covering Chemical Kinetics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Chemical Kinetics.",
      "Solve standard NCERT exemplar problems for Chemical Kinetics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH04-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH04",
    "official_title": "The d- and f- Block Elements",
    "pedagogical_description": "Authoritative statutory concept covering The d- and f- Block Elements under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The d- and f- Block Elements.",
      "Solve standard NCERT exemplar problems for The d- and f- Block Elements."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH05-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH05",
    "official_title": "Coordination Compounds",
    "pedagogical_description": "Authoritative statutory concept covering Coordination Compounds under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Coordination Compounds.",
      "Solve standard NCERT exemplar problems for Coordination Compounds."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH06-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH06",
    "official_title": "Haloalkanes and Haloarenes",
    "pedagogical_description": "Authoritative statutory concept covering Haloalkanes and Haloarenes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Haloalkanes and Haloarenes.",
      "Solve standard NCERT exemplar problems for Haloalkanes and Haloarenes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH07-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH07",
    "official_title": "Alcohols, Phenols and Ethers",
    "pedagogical_description": "Authoritative statutory concept covering Alcohols, Phenols and Ethers under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Alcohols, Phenols and Ethers.",
      "Solve standard NCERT exemplar problems for Alcohols, Phenols and Ethers."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH08-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH08",
    "official_title": "Aldehydes, Ketones and Carboxylic Acids",
    "pedagogical_description": "Authoritative statutory concept covering Aldehydes, Ketones and Carboxylic Acids under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Aldehydes, Ketones and Carboxylic Acids.",
      "Solve standard NCERT exemplar problems for Aldehydes, Ketones and Carboxylic Acids."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH09-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH09",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH09",
    "official_title": "Amines",
    "pedagogical_description": "Authoritative statutory concept covering Amines under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Amines.",
      "Solve standard NCERT exemplar problems for Amines."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH10-01",
    "chapter_id": "CBSE-CH-G12-CHEM-CH10",
    "concept_code": "CBSE-CBSE-CH-G12-CHEM-CH10",
    "official_title": "Biomolecules",
    "pedagogical_description": "Authoritative statutory concept covering Biomolecules under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Biomolecules.",
      "Solve standard NCERT exemplar problems for Biomolecules."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH01",
    "official_title": "Relations and Functions",
    "pedagogical_description": "Authoritative statutory concept covering Relations and Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Relations and Functions.",
      "Solve standard NCERT exemplar problems for Relations and Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH02",
    "official_title": "Inverse Trigonometric Functions",
    "pedagogical_description": "Authoritative statutory concept covering Inverse Trigonometric Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Inverse Trigonometric Functions.",
      "Solve standard NCERT exemplar problems for Inverse Trigonometric Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH03",
    "official_title": "Matrices",
    "pedagogical_description": "Authoritative statutory concept covering Matrices under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Matrices.",
      "Solve standard NCERT exemplar problems for Matrices."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH04",
    "official_title": "Determinants",
    "pedagogical_description": "Authoritative statutory concept covering Determinants under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Determinants.",
      "Solve standard NCERT exemplar problems for Determinants."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH05",
    "official_title": "Continuity and Differentiability",
    "pedagogical_description": "Authoritative statutory concept covering Continuity and Differentiability under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Continuity and Differentiability.",
      "Solve standard NCERT exemplar problems for Continuity and Differentiability."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH06",
    "official_title": "Application of Derivatives",
    "pedagogical_description": "Authoritative statutory concept covering Application of Derivatives under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Application of Derivatives.",
      "Solve standard NCERT exemplar problems for Application of Derivatives."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH07",
    "official_title": "Integrals",
    "pedagogical_description": "Authoritative statutory concept covering Integrals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Integrals.",
      "Solve standard NCERT exemplar problems for Integrals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH08",
    "official_title": "Application of Integrals",
    "pedagogical_description": "Authoritative statutory concept covering Application of Integrals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Application of Integrals.",
      "Solve standard NCERT exemplar problems for Application of Integrals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH09",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH09",
    "official_title": "Differential Equations",
    "pedagogical_description": "Authoritative statutory concept covering Differential Equations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Differential Equations.",
      "Solve standard NCERT exemplar problems for Differential Equations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH10",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH10",
    "official_title": "Vector Algebra",
    "pedagogical_description": "Authoritative statutory concept covering Vector Algebra under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Vector Algebra.",
      "Solve standard NCERT exemplar problems for Vector Algebra."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH11",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH11",
    "official_title": "Three Dimensional Geometry",
    "pedagogical_description": "Authoritative statutory concept covering Three Dimensional Geometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Three Dimensional Geometry.",
      "Solve standard NCERT exemplar problems for Three Dimensional Geometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH12",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH12",
    "official_title": "Linear Programming",
    "pedagogical_description": "Authoritative statutory concept covering Linear Programming under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Linear Programming.",
      "Solve standard NCERT exemplar problems for Linear Programming."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G12-MATH-CH13",
    "concept_code": "CBSE-CBSE-CH-G12-MATH-CH13",
    "official_title": "Probability",
    "pedagogical_description": "Authoritative statutory concept covering Probability under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Probability.",
      "Solve standard NCERT exemplar problems for Probability."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH01-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH01",
    "official_title": "Sexual Reproduction in Flowering Plants",
    "pedagogical_description": "Authoritative statutory concept covering Sexual Reproduction in Flowering Plants under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sexual Reproduction in Flowering Plants.",
      "Solve standard NCERT exemplar problems for Sexual Reproduction in Flowering Plants."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH02-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH02",
    "official_title": "Human Reproduction",
    "pedagogical_description": "Authoritative statutory concept covering Human Reproduction under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Human Reproduction.",
      "Solve standard NCERT exemplar problems for Human Reproduction."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH03-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH03",
    "official_title": "Reproductive Health",
    "pedagogical_description": "Authoritative statutory concept covering Reproductive Health under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Reproductive Health.",
      "Solve standard NCERT exemplar problems for Reproductive Health."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH04-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH04",
    "official_title": "Principles of Inheritance and Variation",
    "pedagogical_description": "Authoritative statutory concept covering Principles of Inheritance and Variation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Principles of Inheritance and Variation.",
      "Solve standard NCERT exemplar problems for Principles of Inheritance and Variation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH05-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH05",
    "official_title": "Molecular Basis of Inheritance",
    "pedagogical_description": "Authoritative statutory concept covering Molecular Basis of Inheritance under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Molecular Basis of Inheritance.",
      "Solve standard NCERT exemplar problems for Molecular Basis of Inheritance."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH06-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH06",
    "official_title": "Evolution",
    "pedagogical_description": "Authoritative statutory concept covering Evolution under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Evolution.",
      "Solve standard NCERT exemplar problems for Evolution."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH07-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH07",
    "official_title": "Human Health and Disease",
    "pedagogical_description": "Authoritative statutory concept covering Human Health and Disease under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Human Health and Disease.",
      "Solve standard NCERT exemplar problems for Human Health and Disease."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH08-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH08",
    "official_title": "Microbes in Human Welfare",
    "pedagogical_description": "Authoritative statutory concept covering Microbes in Human Welfare under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Microbes in Human Welfare.",
      "Solve standard NCERT exemplar problems for Microbes in Human Welfare."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH09-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH09",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH09",
    "official_title": "Biotechnology: Principles and Processes",
    "pedagogical_description": "Authoritative statutory concept covering Biotechnology: Principles and Processes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Biotechnology: Principles and Processes.",
      "Solve standard NCERT exemplar problems for Biotechnology: Principles and Processes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH10-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH10",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH10",
    "official_title": "Biotechnology and its Applications",
    "pedagogical_description": "Authoritative statutory concept covering Biotechnology and its Applications under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Biotechnology and its Applications.",
      "Solve standard NCERT exemplar problems for Biotechnology and its Applications."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH11-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH11",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH11",
    "official_title": "Organisms and Populations",
    "pedagogical_description": "Authoritative statutory concept covering Organisms and Populations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Organisms and Populations.",
      "Solve standard NCERT exemplar problems for Organisms and Populations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH12-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH12",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH12",
    "official_title": "Ecosystem",
    "pedagogical_description": "Authoritative statutory concept covering Ecosystem under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Ecosystem.",
      "Solve standard NCERT exemplar problems for Ecosystem."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BIO-CH13-01",
    "chapter_id": "CBSE-CH-G12-BIO-CH13",
    "concept_code": "CBSE-CBSE-CH-G12-BIO-CH13",
    "official_title": "Biodiversity and Conservation",
    "pedagogical_description": "Authoritative statutory concept covering Biodiversity and Conservation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Biodiversity and Conservation.",
      "Solve standard NCERT exemplar problems for Biodiversity and Conservation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CS-CH01-01",
    "chapter_id": "CBSE-CH-G12-CS-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-CS-CH01",
    "official_title": "Python Revision Tour",
    "pedagogical_description": "Authoritative statutory concept covering Python Revision Tour under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Python Revision Tour.",
      "Solve standard NCERT exemplar problems for Python Revision Tour."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CS-CH02-01",
    "chapter_id": "CBSE-CH-G12-CS-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-CS-CH02",
    "official_title": "Functions",
    "pedagogical_description": "Authoritative statutory concept covering Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Functions.",
      "Solve standard NCERT exemplar problems for Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CS-CH03-01",
    "chapter_id": "CBSE-CH-G12-CS-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-CS-CH03",
    "official_title": "Using Python Libraries",
    "pedagogical_description": "Authoritative statutory concept covering Using Python Libraries under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Using Python Libraries.",
      "Solve standard NCERT exemplar problems for Using Python Libraries."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CS-CH04-01",
    "chapter_id": "CBSE-CH-G12-CS-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-CS-CH04",
    "official_title": "File Handling",
    "pedagogical_description": "Authoritative statutory concept covering File Handling under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of File Handling.",
      "Solve standard NCERT exemplar problems for File Handling."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CS-CH05-01",
    "chapter_id": "CBSE-CH-G12-CS-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-CS-CH05",
    "official_title": "Recursion",
    "pedagogical_description": "Authoritative statutory concept covering Recursion under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Recursion.",
      "Solve standard NCERT exemplar problems for Recursion."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CS-CH06-01",
    "chapter_id": "CBSE-CH-G12-CS-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-CS-CH06",
    "official_title": "Data Structures",
    "pedagogical_description": "Authoritative statutory concept covering Data Structures under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Data Structures.",
      "Solve standard NCERT exemplar problems for Data Structures."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-CS-CH07-01",
    "chapter_id": "CBSE-CH-G12-CS-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-CS-CH07",
    "official_title": "Computer Networks",
    "pedagogical_description": "Authoritative statutory concept covering Computer Networks under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Computer Networks.",
      "Solve standard NCERT exemplar problems for Computer Networks."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-ENG-CH01",
    "official_title": "The Last Lesson",
    "pedagogical_description": "Authoritative statutory concept covering The Last Lesson under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Last Lesson.",
      "Solve standard NCERT exemplar problems for The Last Lesson."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-ENG-CH02",
    "official_title": "Lost Spring",
    "pedagogical_description": "Authoritative statutory concept covering Lost Spring under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Lost Spring.",
      "Solve standard NCERT exemplar problems for Lost Spring."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-ENG-CH03",
    "official_title": "Deep Water",
    "pedagogical_description": "Authoritative statutory concept covering Deep Water under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Deep Water.",
      "Solve standard NCERT exemplar problems for Deep Water."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-ENG-CH04",
    "official_title": "The Rattrap",
    "pedagogical_description": "Authoritative statutory concept covering The Rattrap under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Rattrap.",
      "Solve standard NCERT exemplar problems for The Rattrap."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-ENG-CH05",
    "official_title": "Indigo",
    "pedagogical_description": "Authoritative statutory concept covering Indigo under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Indigo.",
      "Solve standard NCERT exemplar problems for Indigo."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-ENG-CH06",
    "official_title": "Poets and Pancakes",
    "pedagogical_description": "Authoritative statutory concept covering Poets and Pancakes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Poets and Pancakes.",
      "Solve standard NCERT exemplar problems for Poets and Pancakes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-ENG-CH07",
    "official_title": "The Interview",
    "pedagogical_description": "Authoritative statutory concept covering The Interview under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Interview.",
      "Solve standard NCERT exemplar problems for The Interview."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G12-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-ENG-CH08",
    "official_title": "Going Places",
    "pedagogical_description": "Authoritative statutory concept covering Going Places under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Going Places.",
      "Solve standard NCERT exemplar problems for Going Places."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ACC-CH01-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-ACC-CH01",
    "official_title": "Accounting for Partnership: Basic Concepts",
    "pedagogical_description": "Authoritative statutory concept covering Accounting for Partnership: Basic Concepts under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Accounting for Partnership: Basic Concepts.",
      "Solve standard NCERT exemplar problems for Accounting for Partnership: Basic Concepts."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ACC-CH02-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-ACC-CH02",
    "official_title": "Reconstitution of a Partnership Firm - Admission of a Partner",
    "pedagogical_description": "Authoritative statutory concept covering Reconstitution of a Partnership Firm - Admission of a Partner under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Reconstitution of a Partnership Firm - Admission of a Partner.",
      "Solve standard NCERT exemplar problems for Reconstitution of a Partnership Firm - Admission of a Partner."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ACC-CH03-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-ACC-CH03",
    "official_title": "Reconstitution of a Partnership Firm - Retirement/Death of a Partner",
    "pedagogical_description": "Authoritative statutory concept covering Reconstitution of a Partnership Firm - Retirement/Death of a Partner under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Reconstitution of a Partnership Firm - Retirement/Death of a Partner.",
      "Solve standard NCERT exemplar problems for Reconstitution of a Partnership Firm - Retirement/Death of a Partner."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ACC-CH04-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-ACC-CH04",
    "official_title": "Dissolution of Partnership Firm",
    "pedagogical_description": "Authoritative statutory concept covering Dissolution of Partnership Firm under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Dissolution of Partnership Firm.",
      "Solve standard NCERT exemplar problems for Dissolution of Partnership Firm."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ACC-CH05-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-ACC-CH05",
    "official_title": "Accounting for Share Capital",
    "pedagogical_description": "Authoritative statutory concept covering Accounting for Share Capital under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Accounting for Share Capital.",
      "Solve standard NCERT exemplar problems for Accounting for Share Capital."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ACC-CH06-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-ACC-CH06",
    "official_title": "Issue and Redemption of Debentures",
    "pedagogical_description": "Authoritative statutory concept covering Issue and Redemption of Debentures under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Issue and Redemption of Debentures.",
      "Solve standard NCERT exemplar problems for Issue and Redemption of Debentures."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ACC-CH07-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-ACC-CH07",
    "official_title": "Financial Statements of a Company",
    "pedagogical_description": "Authoritative statutory concept covering Financial Statements of a Company under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Financial Statements of a Company.",
      "Solve standard NCERT exemplar problems for Financial Statements of a Company."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ACC-CH08-01",
    "chapter_id": "CBSE-CH-G12-ACC-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-ACC-CH08",
    "official_title": "Analysis of Financial Statements",
    "pedagogical_description": "Authoritative statutory concept covering Analysis of Financial Statements under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Analysis of Financial Statements.",
      "Solve standard NCERT exemplar problems for Analysis of Financial Statements."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH01-01",
    "chapter_id": "CBSE-CH-G12-BST-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH01",
    "official_title": "Nature and Significance of Management",
    "pedagogical_description": "Authoritative statutory concept covering Nature and Significance of Management under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Nature and Significance of Management.",
      "Solve standard NCERT exemplar problems for Nature and Significance of Management."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH02-01",
    "chapter_id": "CBSE-CH-G12-BST-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH02",
    "official_title": "Principles of Management",
    "pedagogical_description": "Authoritative statutory concept covering Principles of Management under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Principles of Management.",
      "Solve standard NCERT exemplar problems for Principles of Management."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH03-01",
    "chapter_id": "CBSE-CH-G12-BST-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH03",
    "official_title": "Business Environment",
    "pedagogical_description": "Authoritative statutory concept covering Business Environment under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Business Environment.",
      "Solve standard NCERT exemplar problems for Business Environment."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH04-01",
    "chapter_id": "CBSE-CH-G12-BST-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH04",
    "official_title": "Planning",
    "pedagogical_description": "Authoritative statutory concept covering Planning under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Planning.",
      "Solve standard NCERT exemplar problems for Planning."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH05-01",
    "chapter_id": "CBSE-CH-G12-BST-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH05",
    "official_title": "Organising",
    "pedagogical_description": "Authoritative statutory concept covering Organising under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Organising.",
      "Solve standard NCERT exemplar problems for Organising."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH06-01",
    "chapter_id": "CBSE-CH-G12-BST-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH06",
    "official_title": "Staffing",
    "pedagogical_description": "Authoritative statutory concept covering Staffing under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Staffing.",
      "Solve standard NCERT exemplar problems for Staffing."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH07-01",
    "chapter_id": "CBSE-CH-G12-BST-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH07",
    "official_title": "Directing",
    "pedagogical_description": "Authoritative statutory concept covering Directing under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Directing.",
      "Solve standard NCERT exemplar problems for Directing."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH08-01",
    "chapter_id": "CBSE-CH-G12-BST-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH08",
    "official_title": "Controlling",
    "pedagogical_description": "Authoritative statutory concept covering Controlling under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Controlling.",
      "Solve standard NCERT exemplar problems for Controlling."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH09-01",
    "chapter_id": "CBSE-CH-G12-BST-CH09",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH09",
    "official_title": "Financial Management",
    "pedagogical_description": "Authoritative statutory concept covering Financial Management under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Financial Management.",
      "Solve standard NCERT exemplar problems for Financial Management."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH10-01",
    "chapter_id": "CBSE-CH-G12-BST-CH10",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH10",
    "official_title": "Financial Markets",
    "pedagogical_description": "Authoritative statutory concept covering Financial Markets under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Financial Markets.",
      "Solve standard NCERT exemplar problems for Financial Markets."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH11-01",
    "chapter_id": "CBSE-CH-G12-BST-CH11",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH11",
    "official_title": "Marketing Management",
    "pedagogical_description": "Authoritative statutory concept covering Marketing Management under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Marketing Management.",
      "Solve standard NCERT exemplar problems for Marketing Management."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-BST-CH12-01",
    "chapter_id": "CBSE-CH-G12-BST-CH12",
    "concept_code": "CBSE-CBSE-CH-G12-BST-CH12",
    "official_title": "Consumer Protection",
    "pedagogical_description": "Authoritative statutory concept covering Consumer Protection under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Consumer Protection.",
      "Solve standard NCERT exemplar problems for Consumer Protection."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ECON-CH01-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-ECON-CH01",
    "official_title": "Introduction to Macroeconomics",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Macroeconomics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Macroeconomics.",
      "Solve standard NCERT exemplar problems for Introduction to Macroeconomics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ECON-CH02-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-ECON-CH02",
    "official_title": "National Income Accounting",
    "pedagogical_description": "Authoritative statutory concept covering National Income Accounting under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of National Income Accounting.",
      "Solve standard NCERT exemplar problems for National Income Accounting."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ECON-CH03-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-ECON-CH03",
    "official_title": "Money and Banking",
    "pedagogical_description": "Authoritative statutory concept covering Money and Banking under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Money and Banking.",
      "Solve standard NCERT exemplar problems for Money and Banking."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ECON-CH04-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-ECON-CH04",
    "official_title": "Determination of Income and Employment",
    "pedagogical_description": "Authoritative statutory concept covering Determination of Income and Employment under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Determination of Income and Employment.",
      "Solve standard NCERT exemplar problems for Determination of Income and Employment."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ECON-CH05-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-ECON-CH05",
    "official_title": "Government Budget and the Economy",
    "pedagogical_description": "Authoritative statutory concept covering Government Budget and the Economy under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Government Budget and the Economy.",
      "Solve standard NCERT exemplar problems for Government Budget and the Economy."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ECON-CH06-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-ECON-CH06",
    "official_title": "Open Economy Macroeconomics",
    "pedagogical_description": "Authoritative statutory concept covering Open Economy Macroeconomics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Open Economy Macroeconomics.",
      "Solve standard NCERT exemplar problems for Open Economy Macroeconomics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ECON-CH07-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-ECON-CH07",
    "official_title": "Development Experience (1947-90) and Economic Reforms since 1991",
    "pedagogical_description": "Authoritative statutory concept covering Development Experience (1947-90) and Economic Reforms since 1991 under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Development Experience (1947-90) and Economic Reforms since 1991.",
      "Solve standard NCERT exemplar problems for Development Experience (1947-90) and Economic Reforms since 1991."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-ECON-CH08-01",
    "chapter_id": "CBSE-CH-G12-ECON-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-ECON-CH08",
    "official_title": "Current Challenges facing the Indian Economy",
    "pedagogical_description": "Authoritative statutory concept covering Current Challenges facing the Indian Economy under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Current Challenges facing the Indian Economy.",
      "Solve standard NCERT exemplar problems for Current Challenges facing the Indian Economy."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH01",
    "official_title": "Relations and Functions",
    "pedagogical_description": "Authoritative statutory concept covering Relations and Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Relations and Functions.",
      "Solve standard NCERT exemplar problems for Relations and Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH02",
    "official_title": "Inverse Trigonometric Functions",
    "pedagogical_description": "Authoritative statutory concept covering Inverse Trigonometric Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Inverse Trigonometric Functions.",
      "Solve standard NCERT exemplar problems for Inverse Trigonometric Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH03",
    "official_title": "Matrices",
    "pedagogical_description": "Authoritative statutory concept covering Matrices under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Matrices.",
      "Solve standard NCERT exemplar problems for Matrices."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH04",
    "official_title": "Determinants",
    "pedagogical_description": "Authoritative statutory concept covering Determinants under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Determinants.",
      "Solve standard NCERT exemplar problems for Determinants."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH05",
    "official_title": "Continuity and Differentiability",
    "pedagogical_description": "Authoritative statutory concept covering Continuity and Differentiability under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Continuity and Differentiability.",
      "Solve standard NCERT exemplar problems for Continuity and Differentiability."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH06",
    "official_title": "Application of Derivatives",
    "pedagogical_description": "Authoritative statutory concept covering Application of Derivatives under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Application of Derivatives.",
      "Solve standard NCERT exemplar problems for Application of Derivatives."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH07",
    "official_title": "Integrals",
    "pedagogical_description": "Authoritative statutory concept covering Integrals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Integrals.",
      "Solve standard NCERT exemplar problems for Integrals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH08",
    "official_title": "Application of Integrals",
    "pedagogical_description": "Authoritative statutory concept covering Application of Integrals under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Application of Integrals.",
      "Solve standard NCERT exemplar problems for Application of Integrals."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH09-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH09",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH09",
    "official_title": "Differential Equations",
    "pedagogical_description": "Authoritative statutory concept covering Differential Equations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Differential Equations.",
      "Solve standard NCERT exemplar problems for Differential Equations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH10-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH10",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH10",
    "official_title": "Vector Algebra",
    "pedagogical_description": "Authoritative statutory concept covering Vector Algebra under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Vector Algebra.",
      "Solve standard NCERT exemplar problems for Vector Algebra."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH11-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH11",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH11",
    "official_title": "Three Dimensional Geometry",
    "pedagogical_description": "Authoritative statutory concept covering Three Dimensional Geometry under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Three Dimensional Geometry.",
      "Solve standard NCERT exemplar problems for Three Dimensional Geometry."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH12-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH12",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH12",
    "official_title": "Linear Programming",
    "pedagogical_description": "Authoritative statutory concept covering Linear Programming under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Linear Programming.",
      "Solve standard NCERT exemplar problems for Linear Programming."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH13-01",
    "chapter_id": "CBSE-CH-G12-COM-MATH-CH13",
    "concept_code": "CBSE-CBSE-CH-G12-COM-MATH-CH13",
    "official_title": "Probability",
    "pedagogical_description": "Authoritative statutory concept covering Probability under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Probability.",
      "Solve standard NCERT exemplar problems for Probability."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-COM-ENG-CH01",
    "official_title": "The Last Lesson",
    "pedagogical_description": "Authoritative statutory concept covering The Last Lesson under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Last Lesson.",
      "Solve standard NCERT exemplar problems for The Last Lesson."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-COM-ENG-CH02",
    "official_title": "Lost Spring",
    "pedagogical_description": "Authoritative statutory concept covering Lost Spring under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Lost Spring.",
      "Solve standard NCERT exemplar problems for Lost Spring."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-COM-ENG-CH03",
    "official_title": "Deep Water",
    "pedagogical_description": "Authoritative statutory concept covering Deep Water under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Deep Water.",
      "Solve standard NCERT exemplar problems for Deep Water."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-COM-ENG-CH04",
    "official_title": "The Rattrap",
    "pedagogical_description": "Authoritative statutory concept covering The Rattrap under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Rattrap.",
      "Solve standard NCERT exemplar problems for The Rattrap."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-COM-ENG-CH05",
    "official_title": "Indigo",
    "pedagogical_description": "Authoritative statutory concept covering Indigo under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Indigo.",
      "Solve standard NCERT exemplar problems for Indigo."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-COM-ENG-CH06",
    "official_title": "Poets and Pancakes",
    "pedagogical_description": "Authoritative statutory concept covering Poets and Pancakes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Poets and Pancakes.",
      "Solve standard NCERT exemplar problems for Poets and Pancakes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-COM-ENG-CH07",
    "official_title": "The Interview",
    "pedagogical_description": "Authoritative statutory concept covering The Interview under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Interview.",
      "Solve standard NCERT exemplar problems for The Interview."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G12-COM-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-COM-ENG-CH08",
    "official_title": "Going Places",
    "pedagogical_description": "Authoritative statutory concept covering Going Places under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Going Places.",
      "Solve standard NCERT exemplar problems for Going Places."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HIST-CH01-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-HIST-CH01",
    "official_title": "Bricks, Beads and Bones",
    "pedagogical_description": "Authoritative statutory concept covering Bricks, Beads and Bones under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Bricks, Beads and Bones.",
      "Solve standard NCERT exemplar problems for Bricks, Beads and Bones."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HIST-CH02-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-HIST-CH02",
    "official_title": "Kings, Farmers and Towns",
    "pedagogical_description": "Authoritative statutory concept covering Kings, Farmers and Towns under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Kings, Farmers and Towns.",
      "Solve standard NCERT exemplar problems for Kings, Farmers and Towns."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HIST-CH03-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-HIST-CH03",
    "official_title": "Kinship, Caste and Class",
    "pedagogical_description": "Authoritative statutory concept covering Kinship, Caste and Class under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Kinship, Caste and Class.",
      "Solve standard NCERT exemplar problems for Kinship, Caste and Class."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HIST-CH04-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-HIST-CH04",
    "official_title": "Thinkers, Beliefs and Buildings",
    "pedagogical_description": "Authoritative statutory concept covering Thinkers, Beliefs and Buildings under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Thinkers, Beliefs and Buildings.",
      "Solve standard NCERT exemplar problems for Thinkers, Beliefs and Buildings."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HIST-CH05-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-HIST-CH05",
    "official_title": "Through the Eyes of Travellers",
    "pedagogical_description": "Authoritative statutory concept covering Through the Eyes of Travellers under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Through the Eyes of Travellers.",
      "Solve standard NCERT exemplar problems for Through the Eyes of Travellers."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HIST-CH06-01",
    "chapter_id": "CBSE-CH-G12-HIST-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-HIST-CH06",
    "official_title": "Bhakti-Sufi Traditions",
    "pedagogical_description": "Authoritative statutory concept covering Bhakti-Sufi Traditions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Bhakti-Sufi Traditions.",
      "Solve standard NCERT exemplar problems for Bhakti-Sufi Traditions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH01-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-POLSCI-CH01",
    "official_title": "The End of Bipolarity",
    "pedagogical_description": "Authoritative statutory concept covering The End of Bipolarity under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The End of Bipolarity.",
      "Solve standard NCERT exemplar problems for The End of Bipolarity."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH02-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-POLSCI-CH02",
    "official_title": "Contemporary Centres of Power",
    "pedagogical_description": "Authoritative statutory concept covering Contemporary Centres of Power under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Contemporary Centres of Power.",
      "Solve standard NCERT exemplar problems for Contemporary Centres of Power."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH03-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-POLSCI-CH03",
    "official_title": "Contemporary South Asia",
    "pedagogical_description": "Authoritative statutory concept covering Contemporary South Asia under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Contemporary South Asia.",
      "Solve standard NCERT exemplar problems for Contemporary South Asia."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH04-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-POLSCI-CH04",
    "official_title": "International Organisations",
    "pedagogical_description": "Authoritative statutory concept covering International Organisations under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of International Organisations.",
      "Solve standard NCERT exemplar problems for International Organisations."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH05-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-POLSCI-CH05",
    "official_title": "Security in the Contemporary World",
    "pedagogical_description": "Authoritative statutory concept covering Security in the Contemporary World under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Security in the Contemporary World.",
      "Solve standard NCERT exemplar problems for Security in the Contemporary World."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH06-01",
    "chapter_id": "CBSE-CH-G12-POLSCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-POLSCI-CH06",
    "official_title": "Environment and Natural Resources",
    "pedagogical_description": "Authoritative statutory concept covering Environment and Natural Resources under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Environment and Natural Resources.",
      "Solve standard NCERT exemplar problems for Environment and Natural Resources."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH01-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-GEOG-CH01",
    "official_title": "Human Geography: Nature and Scope",
    "pedagogical_description": "Authoritative statutory concept covering Human Geography: Nature and Scope under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Human Geography: Nature and Scope.",
      "Solve standard NCERT exemplar problems for Human Geography: Nature and Scope."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH02-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-GEOG-CH02",
    "official_title": "The World Population: Distribution, Density and Growth",
    "pedagogical_description": "Authoritative statutory concept covering The World Population: Distribution, Density and Growth under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The World Population: Distribution, Density and Growth.",
      "Solve standard NCERT exemplar problems for The World Population: Distribution, Density and Growth."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH03-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-GEOG-CH03",
    "official_title": "Human Development",
    "pedagogical_description": "Authoritative statutory concept covering Human Development under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Human Development.",
      "Solve standard NCERT exemplar problems for Human Development."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH04-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-GEOG-CH04",
    "official_title": "Primary Activities",
    "pedagogical_description": "Authoritative statutory concept covering Primary Activities under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Primary Activities.",
      "Solve standard NCERT exemplar problems for Primary Activities."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH05-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-GEOG-CH05",
    "official_title": "Secondary Activities",
    "pedagogical_description": "Authoritative statutory concept covering Secondary Activities under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Secondary Activities.",
      "Solve standard NCERT exemplar problems for Secondary Activities."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH06-01",
    "chapter_id": "CBSE-CH-G12-GEOG-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-GEOG-CH06",
    "official_title": "Tertiary and Quaternary Activities",
    "pedagogical_description": "Authoritative statutory concept covering Tertiary and Quaternary Activities under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Tertiary and Quaternary Activities.",
      "Solve standard NCERT exemplar problems for Tertiary and Quaternary Activities."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH01-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-SOCIO-CH01",
    "official_title": "Introducing Indian Society",
    "pedagogical_description": "Authoritative statutory concept covering Introducing Indian Society under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introducing Indian Society.",
      "Solve standard NCERT exemplar problems for Introducing Indian Society."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH02-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-SOCIO-CH02",
    "official_title": "The Demographic Structure of the Indian Society",
    "pedagogical_description": "Authoritative statutory concept covering The Demographic Structure of the Indian Society under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Demographic Structure of the Indian Society.",
      "Solve standard NCERT exemplar problems for The Demographic Structure of the Indian Society."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH03-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-SOCIO-CH03",
    "official_title": "Social Institutions: Continuity and Change",
    "pedagogical_description": "Authoritative statutory concept covering Social Institutions: Continuity and Change under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Social Institutions: Continuity and Change.",
      "Solve standard NCERT exemplar problems for Social Institutions: Continuity and Change."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH04-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-SOCIO-CH04",
    "official_title": "The Market as a Social Institution",
    "pedagogical_description": "Authoritative statutory concept covering The Market as a Social Institution under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Market as a Social Institution.",
      "Solve standard NCERT exemplar problems for The Market as a Social Institution."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH05-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-SOCIO-CH05",
    "official_title": "Patterns of Social Inequality and Exclusion",
    "pedagogical_description": "Authoritative statutory concept covering Patterns of Social Inequality and Exclusion under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Patterns of Social Inequality and Exclusion.",
      "Solve standard NCERT exemplar problems for Patterns of Social Inequality and Exclusion."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH06-01",
    "chapter_id": "CBSE-CH-G12-SOCIO-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-SOCIO-CH06",
    "official_title": "The Challenges of Cultural Diversity",
    "pedagogical_description": "Authoritative statutory concept covering The Challenges of Cultural Diversity under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Challenges of Cultural Diversity.",
      "Solve standard NCERT exemplar problems for The Challenges of Cultural Diversity."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH01-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-PSYCH-CH01",
    "official_title": "Variations in Psychological Attributes",
    "pedagogical_description": "Authoritative statutory concept covering Variations in Psychological Attributes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Variations in Psychological Attributes.",
      "Solve standard NCERT exemplar problems for Variations in Psychological Attributes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH02-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-PSYCH-CH02",
    "official_title": "Self and Personality",
    "pedagogical_description": "Authoritative statutory concept covering Self and Personality under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Self and Personality.",
      "Solve standard NCERT exemplar problems for Self and Personality."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH03-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-PSYCH-CH03",
    "official_title": "Meeting Life Challenges",
    "pedagogical_description": "Authoritative statutory concept covering Meeting Life Challenges under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Meeting Life Challenges.",
      "Solve standard NCERT exemplar problems for Meeting Life Challenges."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH04-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-PSYCH-CH04",
    "official_title": "Psychological Disorders",
    "pedagogical_description": "Authoritative statutory concept covering Psychological Disorders under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Psychological Disorders.",
      "Solve standard NCERT exemplar problems for Psychological Disorders."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH05-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-PSYCH-CH05",
    "official_title": "Therapeutic Approaches",
    "pedagogical_description": "Authoritative statutory concept covering Therapeutic Approaches under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Therapeutic Approaches.",
      "Solve standard NCERT exemplar problems for Therapeutic Approaches."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH06-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-PSYCH-CH06",
    "official_title": "Attitude and Social Cognition",
    "pedagogical_description": "Authoritative statutory concept covering Attitude and Social Cognition under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Attitude and Social Cognition.",
      "Solve standard NCERT exemplar problems for Attitude and Social Cognition."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH07-01",
    "chapter_id": "CBSE-CH-G12-PSYCH-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-PSYCH-CH07",
    "official_title": "Social Influence and Group Processes",
    "pedagogical_description": "Authoritative statutory concept covering Social Influence and Group Processes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Social Influence and Group Processes.",
      "Solve standard NCERT exemplar problems for Social Influence and Group Processes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH01-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ECON-CH01",
    "official_title": "Introduction to Macroeconomics",
    "pedagogical_description": "Authoritative statutory concept covering Introduction to Macroeconomics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Introduction to Macroeconomics.",
      "Solve standard NCERT exemplar problems for Introduction to Macroeconomics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH02-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ECON-CH02",
    "official_title": "National Income Accounting",
    "pedagogical_description": "Authoritative statutory concept covering National Income Accounting under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of National Income Accounting.",
      "Solve standard NCERT exemplar problems for National Income Accounting."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH03-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ECON-CH03",
    "official_title": "Money and Banking",
    "pedagogical_description": "Authoritative statutory concept covering Money and Banking under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Money and Banking.",
      "Solve standard NCERT exemplar problems for Money and Banking."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH04-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ECON-CH04",
    "official_title": "Determination of Income and Employment",
    "pedagogical_description": "Authoritative statutory concept covering Determination of Income and Employment under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Determination of Income and Employment.",
      "Solve standard NCERT exemplar problems for Determination of Income and Employment."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH05-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ECON-CH05",
    "official_title": "Government Budget and the Economy",
    "pedagogical_description": "Authoritative statutory concept covering Government Budget and the Economy under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Government Budget and the Economy.",
      "Solve standard NCERT exemplar problems for Government Budget and the Economy."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH06-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ECON-CH06",
    "official_title": "Open Economy Macroeconomics",
    "pedagogical_description": "Authoritative statutory concept covering Open Economy Macroeconomics under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Open Economy Macroeconomics.",
      "Solve standard NCERT exemplar problems for Open Economy Macroeconomics."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH07-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ECON-CH07",
    "official_title": "Development Experience (1947-90) and Economic Reforms since 1991",
    "pedagogical_description": "Authoritative statutory concept covering Development Experience (1947-90) and Economic Reforms since 1991 under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Development Experience (1947-90) and Economic Reforms since 1991.",
      "Solve standard NCERT exemplar problems for Development Experience (1947-90) and Economic Reforms since 1991."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH08-01",
    "chapter_id": "CBSE-CH-G12-HUM-ECON-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ECON-CH08",
    "official_title": "Current Challenges facing the Indian Economy",
    "pedagogical_description": "Authoritative statutory concept covering Current Challenges facing the Indian Economy under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Current Challenges facing the Indian Economy.",
      "Solve standard NCERT exemplar problems for Current Challenges facing the Indian Economy."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ENG-CH01",
    "official_title": "The Last Lesson",
    "pedagogical_description": "Authoritative statutory concept covering The Last Lesson under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Last Lesson.",
      "Solve standard NCERT exemplar problems for The Last Lesson."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ENG-CH02",
    "official_title": "Lost Spring",
    "pedagogical_description": "Authoritative statutory concept covering Lost Spring under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Lost Spring.",
      "Solve standard NCERT exemplar problems for Lost Spring."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ENG-CH03",
    "official_title": "Deep Water",
    "pedagogical_description": "Authoritative statutory concept covering Deep Water under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Deep Water.",
      "Solve standard NCERT exemplar problems for Deep Water."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ENG-CH04",
    "official_title": "The Rattrap",
    "pedagogical_description": "Authoritative statutory concept covering The Rattrap under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Rattrap.",
      "Solve standard NCERT exemplar problems for The Rattrap."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ENG-CH05",
    "official_title": "Indigo",
    "pedagogical_description": "Authoritative statutory concept covering Indigo under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Indigo.",
      "Solve standard NCERT exemplar problems for Indigo."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ENG-CH06",
    "official_title": "Poets and Pancakes",
    "pedagogical_description": "Authoritative statutory concept covering Poets and Pancakes under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Poets and Pancakes.",
      "Solve standard NCERT exemplar problems for Poets and Pancakes."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ENG-CH07",
    "official_title": "The Interview",
    "pedagogical_description": "Authoritative statutory concept covering The Interview under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Interview.",
      "Solve standard NCERT exemplar problems for The Interview."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G12-HUM-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G12-HUM-ENG-CH08",
    "official_title": "Going Places",
    "pedagogical_description": "Authoritative statutory concept covering Going Places under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Going Places.",
      "Solve standard NCERT exemplar problems for Going Places."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G8-ENG-CH01",
    "official_title": "The Wit that Won Hearts",
    "pedagogical_description": "Authoritative statutory concept covering The Wit that Won Hearts under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Wit that Won Hearts.",
      "Solve standard NCERT exemplar problems for The Wit that Won Hearts."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G8-ENG-CH02",
    "official_title": "A Concrete Example",
    "pedagogical_description": "Authoritative statutory concept covering A Concrete Example under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Concrete Example.",
      "Solve standard NCERT exemplar problems for A Concrete Example."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G8-ENG-CH03",
    "official_title": "Wisdom Paves the Way",
    "pedagogical_description": "Authoritative statutory concept covering Wisdom Paves the Way under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Wisdom Paves the Way.",
      "Solve standard NCERT exemplar problems for Wisdom Paves the Way."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G8-ENG-CH04",
    "official_title": "A Tale of Valour",
    "pedagogical_description": "Authoritative statutory concept covering A Tale of Valour under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Tale of Valour.",
      "Solve standard NCERT exemplar problems for A Tale of Valour."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G8-ENG-CH05",
    "official_title": "Somebody’s Mother",
    "pedagogical_description": "Authoritative statutory concept covering Somebody’s Mother under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Somebody’s Mother.",
      "Solve standard NCERT exemplar problems for Somebody’s Mother."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-ENG-CH06-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH06",
    "concept_code": "CBSE-CBSE-CH-G8-ENG-CH06",
    "official_title": "Verghese Kurien – I Too Had a Dream",
    "pedagogical_description": "Authoritative statutory concept covering Verghese Kurien – I Too Had a Dream under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Verghese Kurien – I Too Had a Dream.",
      "Solve standard NCERT exemplar problems for Verghese Kurien – I Too Had a Dream."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-ENG-CH07-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH07",
    "concept_code": "CBSE-CBSE-CH-G8-ENG-CH07",
    "official_title": "The Case of the Fifth Word",
    "pedagogical_description": "Authoritative statutory concept covering The Case of the Fifth Word under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Case of the Fifth Word.",
      "Solve standard NCERT exemplar problems for The Case of the Fifth Word."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-ENG-CH08-01",
    "chapter_id": "CBSE-CH-G8-ENG-CH08",
    "concept_code": "CBSE-CBSE-CH-G8-ENG-CH08",
    "official_title": "The Magic Brush of Dreams",
    "pedagogical_description": "Authoritative statutory concept covering The Magic Brush of Dreams under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Magic Brush of Dreams.",
      "Solve standard NCERT exemplar problems for The Magic Brush of Dreams."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G8-SOCSCI-CH01",
    "official_title": "World Geography: Some Glimpses",
    "pedagogical_description": "Authoritative statutory concept covering World Geography: Some Glimpses under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of World Geography: Some Glimpses.",
      "Solve standard NCERT exemplar problems for World Geography: Some Glimpses."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G8-SOCSCI-CH02",
    "official_title": "India's Long Road to Independence",
    "pedagogical_description": "Authoritative statutory concept covering India's Long Road to Independence under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of India's Long Road to Independence.",
      "Solve standard NCERT exemplar problems for India's Long Road to Independence."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G8-SOCSCI-CH03",
    "official_title": "A Journey Through Indian Architecture",
    "pedagogical_description": "Authoritative statutory concept covering A Journey Through Indian Architecture under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Journey Through Indian Architecture.",
      "Solve standard NCERT exemplar problems for A Journey Through Indian Architecture."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G8-SOCSCI-CH04",
    "official_title": "The Role of the Judiciary in Our Society",
    "pedagogical_description": "Authoritative statutory concept covering The Role of the Judiciary in Our Society under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Role of the Judiciary in Our Society.",
      "Solve standard NCERT exemplar problems for The Role of the Judiciary in Our Society."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G8-SOCSCI-CH05",
    "official_title": "Citizenship: Rights and Duties",
    "pedagogical_description": "Authoritative statutory concept covering Citizenship: Rights and Duties under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Citizenship: Rights and Duties.",
      "Solve standard NCERT exemplar problems for Citizenship: Rights and Duties."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G8-SOCSCI-CH06",
    "official_title": "Dynamics of Population",
    "pedagogical_description": "Authoritative statutory concept covering Dynamics of Population under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Dynamics of Population.",
      "Solve standard NCERT exemplar problems for Dynamics of Population."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G8-SOCSCI-CH07",
    "official_title": "India's Urban Landscape",
    "pedagogical_description": "Authoritative statutory concept covering India's Urban Landscape under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of India's Urban Landscape.",
      "Solve standard NCERT exemplar problems for India's Urban Landscape."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH08-01",
    "chapter_id": "CBSE-CH-G8-SOCSCI-CH08",
    "concept_code": "CBSE-CBSE-CH-G8-SOCSCI-CH08",
    "official_title": "Cultural Currents: 13th to 17th Centuries",
    "pedagogical_description": "Authoritative statutory concept covering Cultural Currents: 13th to 17th Centuries under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Cultural Currents: 13th to 17th Centuries.",
      "Solve standard NCERT exemplar problems for Cultural Currents: 13th to 17th Centuries."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH01-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH01",
    "official_title": "Exploration: Entering the World of Secondary Science",
    "pedagogical_description": "Authoritative statutory concept covering Exploration: Entering the World of Secondary Science under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Exploration: Entering the World of Secondary Science.",
      "Solve standard NCERT exemplar problems for Exploration: Entering the World of Secondary Science."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH02-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH02",
    "official_title": "Cell — Structure and Functions",
    "pedagogical_description": "Authoritative statutory concept covering Cell — Structure and Functions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Cell — Structure and Functions.",
      "Solve standard NCERT exemplar problems for Cell — Structure and Functions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH03-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH03",
    "official_title": "Tissues",
    "pedagogical_description": "Authoritative statutory concept covering Tissues under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Tissues.",
      "Solve standard NCERT exemplar problems for Tissues."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH04-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH04",
    "official_title": "Reproduction",
    "pedagogical_description": "Authoritative statutory concept covering Reproduction under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Reproduction.",
      "Solve standard NCERT exemplar problems for Reproduction."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH05-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH05",
    "official_title": "Diversity in Living Organisms",
    "pedagogical_description": "Authoritative statutory concept covering Diversity in Living Organisms under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Diversity in Living Organisms.",
      "Solve standard NCERT exemplar problems for Diversity in Living Organisms."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH06-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH06",
    "official_title": "Exploring Mixtures and Their Separation",
    "pedagogical_description": "Authoritative statutory concept covering Exploring Mixtures and Their Separation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Exploring Mixtures and Their Separation.",
      "Solve standard NCERT exemplar problems for Exploring Mixtures and Their Separation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH07-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH07",
    "official_title": "Structure of the Atom",
    "pedagogical_description": "Authoritative statutory concept covering Structure of the Atom under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Structure of the Atom.",
      "Solve standard NCERT exemplar problems for Structure of the Atom."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH08-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH08",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH08",
    "official_title": "Atoms and Molecules",
    "pedagogical_description": "Authoritative statutory concept covering Atoms and Molecules under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Atoms and Molecules.",
      "Solve standard NCERT exemplar problems for Atoms and Molecules."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH09-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH09",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH09",
    "official_title": "Earth as a System: Energy, Matter and Life",
    "pedagogical_description": "Authoritative statutory concept covering Earth as a System: Energy, Matter and Life under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Earth as a System: Energy, Matter and Life.",
      "Solve standard NCERT exemplar problems for Earth as a System: Energy, Matter and Life."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH10-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH10",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH10",
    "official_title": "Motion",
    "pedagogical_description": "Authoritative statutory concept covering Motion under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Motion.",
      "Solve standard NCERT exemplar problems for Motion."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH11-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH11",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH11",
    "official_title": "Force and Laws of Motion",
    "pedagogical_description": "Authoritative statutory concept covering Force and Laws of Motion under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Force and Laws of Motion.",
      "Solve standard NCERT exemplar problems for Force and Laws of Motion."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH12-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH12",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH12",
    "official_title": "Work, Energy and Simple Machines",
    "pedagogical_description": "Authoritative statutory concept covering Work, Energy and Simple Machines under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Work, Energy and Simple Machines.",
      "Solve standard NCERT exemplar problems for Work, Energy and Simple Machines."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SCI-CH13-01",
    "chapter_id": "CBSE-CH-G9-SCI-CH13",
    "concept_code": "CBSE-CBSE-CH-G9-SCI-CH13",
    "official_title": "Sound",
    "pedagogical_description": "Authoritative statutory concept covering Sound under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Sound.",
      "Solve standard NCERT exemplar problems for Sound."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH01-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH01",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH01",
    "official_title": "Understanding Social Science",
    "pedagogical_description": "Authoritative statutory concept covering Understanding Social Science under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Understanding Social Science.",
      "Solve standard NCERT exemplar problems for Understanding Social Science."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH02-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH02",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH02",
    "official_title": "Shaping of the Earth's Surface",
    "pedagogical_description": "Authoritative statutory concept covering Shaping of the Earth's Surface under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Shaping of the Earth's Surface.",
      "Solve standard NCERT exemplar problems for Shaping of the Earth's Surface."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH03-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH03",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH03",
    "official_title": "Atmosphere and Climate",
    "pedagogical_description": "Authoritative statutory concept covering Atmosphere and Climate under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Atmosphere and Climate.",
      "Solve standard NCERT exemplar problems for Atmosphere and Climate."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH04-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH04",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH04",
    "official_title": "Early Humans and Beginning of Civilisation",
    "pedagogical_description": "Authoritative statutory concept covering Early Humans and Beginning of Civilisation under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Early Humans and Beginning of Civilisation.",
      "Solve standard NCERT exemplar problems for Early Humans and Beginning of Civilisation."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH05-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH05",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH05",
    "official_title": "State and Society (up to 1000 CE)",
    "pedagogical_description": "Authoritative statutory concept covering State and Society (up to 1000 CE) under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of State and Society (up to 1000 CE).",
      "Solve standard NCERT exemplar problems for State and Society (up to 1000 CE)."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH06-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH06",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH06",
    "official_title": "Democracy",
    "pedagogical_description": "Authoritative statutory concept covering Democracy under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Democracy.",
      "Solve standard NCERT exemplar problems for Democracy."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH07-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH07",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH07",
    "official_title": "Elections",
    "pedagogical_description": "Authoritative statutory concept covering Elections under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Elections.",
      "Solve standard NCERT exemplar problems for Elections."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH08-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH08",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH08",
    "official_title": "Building Blocks in Economics – The Problem of Choice",
    "pedagogical_description": "Authoritative statutory concept covering Building Blocks in Economics – The Problem of Choice under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Building Blocks in Economics – The Problem of Choice.",
      "Solve standard NCERT exemplar problems for Building Blocks in Economics – The Problem of Choice."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH09-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH09",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH09",
    "official_title": "The Price Puzzle – What Drives the Market",
    "pedagogical_description": "Authoritative statutory concept covering The Price Puzzle – What Drives the Market under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of The Price Puzzle – What Drives the Market.",
      "Solve standard NCERT exemplar problems for The Price Puzzle – What Drives the Market."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH10-01",
    "chapter_id": "CBSE-CH-G9-SOCSCI-CH10",
    "concept_code": "CBSE-CBSE-CH-G9-SOCSCI-CH10",
    "official_title": "Tapestry of the Past: Medieval & Modern Themes and IKS",
    "pedagogical_description": "Authoritative statutory concept covering Tapestry of the Past: Medieval & Modern Themes and IKS under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Tapestry of the Past: Medieval & Modern Themes and IKS.",
      "Solve standard NCERT exemplar problems for Tapestry of the Past: Medieval & Modern Themes and IKS."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-MATH-CH01-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH01",
    "concept_code": "CBSE-CBSE-CH-G7-MATH-CH01",
    "official_title": "Large Numbers Around Us",
    "pedagogical_description": "Authoritative statutory concept covering Large Numbers Around Us under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Large Numbers Around Us.",
      "Solve standard NCERT exemplar problems for Large Numbers Around Us."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-MATH-CH02-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH02",
    "concept_code": "CBSE-CBSE-CH-G7-MATH-CH02",
    "official_title": "Arithmetic Expressions",
    "pedagogical_description": "Authoritative statutory concept covering Arithmetic Expressions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Arithmetic Expressions.",
      "Solve standard NCERT exemplar problems for Arithmetic Expressions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-MATH-CH03-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH03",
    "concept_code": "CBSE-CBSE-CH-G7-MATH-CH03",
    "official_title": "A Peek Beyond the Point",
    "pedagogical_description": "Authoritative statutory concept covering A Peek Beyond the Point under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Peek Beyond the Point.",
      "Solve standard NCERT exemplar problems for A Peek Beyond the Point."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-MATH-CH04-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH04",
    "concept_code": "CBSE-CBSE-CH-G7-MATH-CH04",
    "official_title": "Expressions Using Letter-Numbers",
    "pedagogical_description": "Authoritative statutory concept covering Expressions Using Letter-Numbers under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Expressions Using Letter-Numbers.",
      "Solve standard NCERT exemplar problems for Expressions Using Letter-Numbers."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-MATH-CH05-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH05",
    "concept_code": "CBSE-CBSE-CH-G7-MATH-CH05",
    "official_title": "Parallel and Intersecting",
    "pedagogical_description": "Authoritative statutory concept covering Parallel and Intersecting under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Parallel and Intersecting.",
      "Solve standard NCERT exemplar problems for Parallel and Intersecting."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-MATH-CH06-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH06",
    "concept_code": "CBSE-CBSE-CH-G7-MATH-CH06",
    "official_title": "Number Play",
    "pedagogical_description": "Authoritative statutory concept covering Number Play under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Number Play.",
      "Solve standard NCERT exemplar problems for Number Play."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-MATH-CH07-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH07",
    "concept_code": "CBSE-CBSE-CH-G7-MATH-CH07",
    "official_title": "A Tale of Three Intersecting Lines",
    "pedagogical_description": "Authoritative statutory concept covering A Tale of Three Intersecting Lines under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of A Tale of Three Intersecting Lines.",
      "Solve standard NCERT exemplar problems for A Tale of Three Intersecting Lines."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-MATH-CH08-01",
    "chapter_id": "CBSE-CH-G7-MATH-CH08",
    "concept_code": "CBSE-CBSE-CH-G7-MATH-CH08",
    "official_title": "Working with Fractions",
    "pedagogical_description": "Authoritative statutory concept covering Working with Fractions under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Working with Fractions.",
      "Solve standard NCERT exemplar problems for Working with Fractions."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-ENG-CH01-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH01",
    "concept_code": "CBSE-CBSE-CH-G7-ENG-CH01",
    "official_title": "Learning Together",
    "pedagogical_description": "Authoritative statutory concept covering Learning Together under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Learning Together.",
      "Solve standard NCERT exemplar problems for Learning Together."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-ENG-CH02-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH02",
    "concept_code": "CBSE-CBSE-CH-G7-ENG-CH02",
    "official_title": "Wit and Humour",
    "pedagogical_description": "Authoritative statutory concept covering Wit and Humour under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Wit and Humour.",
      "Solve standard NCERT exemplar problems for Wit and Humour."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-ENG-CH03-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH03",
    "concept_code": "CBSE-CBSE-CH-G7-ENG-CH03",
    "official_title": "Dreams and Discoveries",
    "pedagogical_description": "Authoritative statutory concept covering Dreams and Discoveries under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Dreams and Discoveries.",
      "Solve standard NCERT exemplar problems for Dreams and Discoveries."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-ENG-CH04-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH04",
    "concept_code": "CBSE-CBSE-CH-G7-ENG-CH04",
    "official_title": "Travel and Adventure",
    "pedagogical_description": "Authoritative statutory concept covering Travel and Adventure under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Travel and Adventure.",
      "Solve standard NCERT exemplar problems for Travel and Adventure."
    ],
    "display_order": 1
  },
  {
    "id": "CBSE-CONC-CBSE-CH-G7-ENG-CH05-01",
    "chapter_id": "CBSE-CH-G7-ENG-CH05",
    "concept_code": "CBSE-CBSE-CH-G7-ENG-CH05",
    "official_title": "Bravehearts",
    "pedagogical_description": "Authoritative statutory concept covering Bravehearts under official CBSE curriculum standards.",
    "learning_outcomes": [
      "Understand core axiomatic principles and statutory definitions of Bravehearts.",
      "Solve standard NCERT exemplar problems for Bravehearts."
    ],
    "display_order": 1
  }
];

export const CBSE_CONCEPT_SECTION_MAPPINGS: CbseConceptSectionMapping[] = [
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-MATH-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-MATH-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-MATH-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SCI-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SCI-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SCI-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-MATH-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-MATH-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-MATH-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-MATH-CH14-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-MATH-CH14-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-MATH-CH14-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-ENG-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-ENG-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-ENG-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-HIN-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-HIN-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-HIN-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-HIN-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-HIN-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-HIN-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-HIN-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-HIN-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-HIN-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-HIN-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-HIN-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-HIN-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SCI-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SCI-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SCI-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SOCSCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SOCSCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SOCSCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SOCSCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SOCSCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SOCSCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SOCSCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SOCSCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SOCSCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-HIN-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-HIN-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-HIN-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-HIN-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-HIN-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-HIN-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-HIN-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-HIN-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-HIN-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-HIN-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-HIN-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-HIN-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SANSKRIT-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SANSKRIT-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SANSKRIT-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SANSKRIT-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SANSKRIT-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SANSKRIT-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G6-SANSKRIT-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G6-SANSKRIT-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G6-SANSKRIT-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SOCSCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SOCSCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SOCSCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SOCSCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SOCSCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SOCSCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SOCSCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SOCSCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SOCSCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-HIN-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-HIN-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-HIN-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-HIN-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-HIN-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-HIN-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-HIN-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-HIN-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-HIN-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-HIN-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-HIN-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-HIN-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SCI-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SCI-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SCI-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G10-SOCSCI-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G10-SOCSCI-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G10-SOCSCI-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-SCI-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-SCI-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-SCI-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-MATH-CH14-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-MATH-CH14-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-MATH-CH14-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PHY-CH14-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PHY-CH14-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PHY-CH14-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CHEM-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CHEM-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CHEM-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-MATH-CH14-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-MATH-CH14-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-MATH-CH14-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH14-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH14-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH14-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH15-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH15-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH15-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH16-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH16-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH16-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH17-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH17-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH17-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH18-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH18-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH18-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BIO-CH19-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BIO-CH19-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BIO-CH19-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CS-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CS-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CS-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CS-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CS-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CS-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CS-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CS-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CS-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CS-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CS-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CS-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CS-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CS-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CS-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CS-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CS-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CS-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CS-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CS-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CS-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-CS-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-CS-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-CS-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ACC-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ACC-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ACC-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ACC-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ACC-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ACC-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ACC-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ACC-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ACC-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ACC-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ACC-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ACC-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ACC-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ACC-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ACC-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ACC-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ACC-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ACC-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ACC-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ACC-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ACC-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ACC-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ACC-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ACC-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BST-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BST-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BST-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BST-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BST-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BST-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BST-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BST-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BST-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BST-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BST-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BST-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BST-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BST-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BST-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-BST-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-BST-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-BST-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ECON-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ECON-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ECON-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ECON-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ECON-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ECON-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ECON-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ECON-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ECON-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ECON-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ECON-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ECON-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ECON-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ECON-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ECON-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-ECON-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-ECON-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-ECON-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-MATH-CH14-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-MATH-CH14-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-MATH-CH14-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-COM-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-COM-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-COM-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HIST-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HIST-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HIST-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HIST-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HIST-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HIST-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HIST-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HIST-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HIST-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HIST-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HIST-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HIST-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HIST-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HIST-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HIST-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-POLSCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-POLSCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-POLSCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-POLSCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-POLSCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-POLSCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-POLSCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-POLSCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-GEOG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-GEOG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-GEOG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-GEOG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-GEOG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-GEOG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-GEOG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-SOCIO-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-SOCIO-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-SOCIO-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-SOCIO-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-SOCIO-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-SOCIO-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-SOCIO-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PSYCH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PSYCH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PSYCH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PSYCH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PSYCH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PSYCH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-PSYCH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-PSYCH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-PSYCH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ECON-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ECON-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ECON-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ECON-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ECON-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ECON-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ECON-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ECON-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G11-HUM-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G11-HUM-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G11-HUM-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PHY-CH14-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PHY-CH14-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PHY-CH14-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CHEM-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CHEM-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CHEM-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-MATH-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-MATH-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-MATH-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BIO-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BIO-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BIO-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CS-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CS-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CS-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CS-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CS-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CS-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CS-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CS-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CS-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CS-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CS-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CS-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CS-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CS-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CS-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CS-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CS-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CS-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-CS-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-CS-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-CS-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ACC-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ACC-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ACC-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ACC-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ACC-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ACC-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ACC-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ACC-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ACC-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ACC-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ACC-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ACC-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ACC-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ACC-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ACC-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ACC-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ACC-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ACC-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ACC-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ACC-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ACC-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ACC-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ACC-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ACC-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-BST-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-BST-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-BST-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ECON-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ECON-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ECON-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ECON-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ECON-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ECON-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ECON-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ECON-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ECON-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ECON-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ECON-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ECON-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ECON-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ECON-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ECON-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ECON-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ECON-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ECON-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ECON-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ECON-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ECON-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-ECON-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-ECON-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-ECON-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-MATH-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-MATH-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-MATH-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-COM-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-COM-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-COM-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HIST-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HIST-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HIST-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HIST-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HIST-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HIST-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HIST-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HIST-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HIST-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HIST-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HIST-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HIST-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HIST-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HIST-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HIST-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HIST-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HIST-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HIST-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-POLSCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-POLSCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-POLSCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-POLSCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-POLSCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-POLSCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-POLSCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-POLSCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-GEOG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-GEOG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-GEOG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-GEOG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-GEOG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-GEOG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-GEOG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-GEOG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-SOCIO-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-SOCIO-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-SOCIO-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-SOCIO-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-SOCIO-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-SOCIO-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-SOCIO-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-SOCIO-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PSYCH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PSYCH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PSYCH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PSYCH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PSYCH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PSYCH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-PSYCH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-PSYCH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-PSYCH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ECON-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ECON-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ECON-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ECON-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ECON-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ECON-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ECON-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ECON-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ECON-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ECON-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G12-HUM-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G12-HUM-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G12-HUM-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-ENG-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-ENG-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-ENG-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-ENG-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-ENG-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-ENG-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-ENG-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-ENG-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-ENG-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SOCSCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SOCSCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SOCSCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SOCSCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SOCSCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SOCSCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SOCSCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G8-SOCSCI-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G8-SOCSCI-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G8-SOCSCI-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH11-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH11-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH11-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH12-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH12-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH12-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SCI-CH13-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SCI-CH13-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SCI-CH13-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH09-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH09-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH09-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G9-SOCSCI-CH10-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G9-SOCSCI-CH10-01",
    "section_id": "CBSE-SEC-CBSE-CH-G9-SOCSCI-CH10-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-MATH-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-MATH-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-MATH-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-MATH-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-MATH-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-MATH-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-MATH-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-MATH-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-MATH-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-MATH-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-MATH-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-MATH-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-MATH-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-MATH-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-MATH-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-MATH-CH06-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-MATH-CH06-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-MATH-CH06-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-MATH-CH07-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-MATH-CH07-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-MATH-CH07-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-MATH-CH08-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-MATH-CH08-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-MATH-CH08-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-ENG-CH01-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-ENG-CH01-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-ENG-CH01-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-ENG-CH02-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-ENG-CH02-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-ENG-CH02-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-ENG-CH03-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-ENG-CH03-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-ENG-CH03-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-ENG-CH04-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-ENG-CH04-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-ENG-CH04-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  },
  {
    "id": "CBSE-MAP-CBSE-CH-G7-ENG-CH05-01",
    "concept_id": "CBSE-CONC-CBSE-CH-G7-ENG-CH05-01",
    "section_id": "CBSE-SEC-CBSE-CH-G7-ENG-CH05-01",
    "relationship_type": "PRIMARY",
    "display_order": 1
  }
];
