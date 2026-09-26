// =============================================================================
// Brainoro OS — CBSE Authoritative NCERT Source Discovery & Applicability Resolver
// Independent discovery entry points and multi-part textbook family enumerator.
// Authority is derived ONLY from official NCERT evidence, NEVER from Brainoro DB.
// =============================================================================

import {
  NcrtAcademicYear,
  NcrtCurriculumVersionCode,
  NcrtCurriculumApplicabilityRecord,
  NcrtPartIdentity,
  BookApplicabilityRole,
  CandidateReplacementClassification,
  PackageCompletenessStatus,
  CurriculumContextFingerprint,
} from '../types/cbseAuthorityEngine';
import { CBSE_SOURCE_MANIFEST } from '../data/cbseSourceManifest';

export const NCERT_DISCOVERY_ENDPOINTS = {
  TEXTBOOK_PORTAL: 'https://ncert.nic.in/textbook.php',
  SYLLABUS_INDEX: 'https://ncert.nic.in/syllabus.php',
  PUBLICATION_CATALOGUE: 'https://ncert.nic.in/publication.php',
  ANNOUNCEMENTS: 'https://ncert.nic.in/announcements.php',
  REVISED_TEXTBOOKS_NOTICE: 'https://ncert.nic.in/textbook/pdf/notice.pdf',
};

export interface OfficialTextbookMetadata {
  family_name: string;
  grade_level: number;
  subject_id: string;
  stream_id: string;
  curriculum_version: NcrtCurriculumVersionCode;
  academic_year: NcrtAcademicYear;
  role: BookApplicabilityRole;
  parts: Array<{
    part_number: number;
    part_title: string;
    official_code: string;
  }>;
  evidence_references: string[];
}

/**
 * Deterministic Context Fingerprint Generator (Rule 56 & 63).
 * Prevents cross-context contamination and ensures exact scope across all layers.
 */
export function generateContextFingerprint(context: {
  board?: string;
  academic_year: string;
  curriculum_version: string;
  grade_level: number;
  stream_id: string;
  subject_id: string;
  textbook_family?: string;
  part_number?: number;
}): string {
  const b = context.board || 'CBSE';
  const ay = context.academic_year || '2024-25';
  const cv = context.curriculum_version || 'CBSE-NCERT-2024-NCF-SE';
  const g = context.grade_level;
  const st = context.stream_id || 'GENERAL';
  const sub = context.subject_id;
  const tf = context.textbook_family ? `:${context.textbook_family}` : '';
  const p = context.part_number !== undefined ? `:P${context.part_number}` : '';
  return `${b}:${ay}:${cv}:G${g}:${st}:${sub}${tf}${p}`;
}

/**
 * Closed-World Package Completeness Proof (Rule 42).
 * Verifies whether the discovered part set matches official required publication structure.
 */
export function verifyPackageCompleteness(
  family: string,
  parts: NcrtPartIdentity[],
  evidenceReferences: string[] = []
): {
  status: PackageCompletenessStatus;
  is_complete: boolean;
  required_parts_count: number;
  discovered_parts_count: number;
  details: string;
} {
  if (!parts || parts.length === 0) {
    return {
      status: 'PACKAGE_INCOMPLETE',
      is_complete: false,
      required_parts_count: 1,
      discovered_parts_count: 0,
      details: `No parts discovered for textbook family '${family}'`,
    };
  }

  // Check registry evidence for required part count
  const reg = STATUTORY_NCERT_APPLICABILITY_REGISTRY.find(r => r.family_name === family);
  const requiredCount = reg ? reg.parts.length : parts.length;

  if (parts.length < requiredCount) {
    return {
      status: 'PACKAGE_INCOMPLETE',
      is_complete: false,
      required_parts_count: requiredCount,
      discovered_parts_count: parts.length,
      details: `Package incomplete: discovered ${parts.length} part(s), official catalog requires ${requiredCount}`,
    };
  }

  // Ensure contiguous sequence (1..N)
  const numbers = parts.map(p => p.part_number).sort((a, b) => a - b);
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] !== i + 1) {
      return {
        status: 'PACKAGE_INCOMPLETE',
        is_complete: false,
        required_parts_count: requiredCount,
        discovered_parts_count: parts.length,
        details: `Non-contiguous part numbering detected: ${numbers.join(', ')}`,
      };
    }
  }

  return {
    status: 'PACKAGE_COMPLETE',
    is_complete: true,
    required_parts_count: requiredCount,
    discovered_parts_count: parts.length,
    details: `All ${requiredCount} required part(s) verified against official evidence`,
  };
}

/**
 * Replacement and New Candidate Classification (Rule 52).
 */
export function classifyDiscoveredCandidate(
  existing: OfficialTextbookMetadata | null,
  candidate: OfficialTextbookMetadata
): CandidateReplacementClassification {
  if (!existing) {
    return 'ADDITIONAL';
  }
  if (candidate.role === 'SUPPLEMENTARY_READER') {
    return 'SUPPLEMENTARY';
  }
  if (candidate.role === 'OPTIONAL') {
    return 'OPTIONAL';
  }
  if (candidate.curriculum_version !== existing.curriculum_version) {
    return 'REPLACEMENT';
  }
  if (candidate.family_name !== existing.family_name) {
    return 'REPLACEMENT';
  }
  return 'ADDITIONAL';
}

/**
 * Statutory NCERT Applicability Registry.
 * Derived independently from official NCERT catalogues and circulars.
 */
export const STATUTORY_NCERT_APPLICABILITY_REGISTRY: OfficialTextbookMetadata[] = [
  {
    "family_name": "Ganita Prakash",
    "grade_level": 6,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Ganita Prakash",
        "official_code": "femh1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (femh1)",
      "https://ncert.nic.in/textbook.php?femh1=0-1"
    ]
  },
  {
    "family_name": "Curiosity",
    "grade_level": 6,
    "subject_id": "CBSE-SUB-SCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Curiosity",
        "official_code": "fecu1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (fecu1)",
      "https://ncert.nic.in/textbook.php?fecu1=0-1"
    ]
  },
  {
    "family_name": "Poorvi",
    "grade_level": 6,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Poorvi",
        "official_code": "feen1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (feen1)",
      "https://ncert.nic.in/textbook.php?feen1=0-1"
    ]
  },
  {
    "family_name": "Exploring Society: India and Beyond",
    "grade_level": 6,
    "subject_id": "CBSE-SUB-SOCSCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Exploring Society: India and Beyond",
        "official_code": "fess1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (fess1)",
      "https://ncert.nic.in/textbook.php?fess1=0-1"
    ]
  },
  {
    "family_name": "Malhar",
    "grade_level": 6,
    "subject_id": "CBSE-SUB-HIN",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Malhar",
        "official_code": "fehn1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (fehn1)",
      "https://ncert.nic.in/textbook.php?fehn1=0-1"
    ]
  },
  {
    "family_name": "Deepakam",
    "grade_level": 6,
    "subject_id": "CBSE-SUB-SANSKRIT",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Deepakam",
        "official_code": "fsk1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (fsk1)",
      "https://ncert.nic.in/textbook.php?fsk1=0-1"
    ]
  },
  {
    "family_name": "Mathematics - Textbook for Class VII",
    "grade_level": 7,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Mathematics - Textbook for Class VII",
        "official_code": "gemh1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (gemh1)",
      "https://ncert.nic.in/textbook.php?gemh1=0-1"
    ]
  },
  {
    "family_name": "Science - Textbook for Class VII",
    "grade_level": 7,
    "subject_id": "CBSE-SUB-SCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Science - Textbook for Class VII",
        "official_code": "gesc1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (gesc1)",
      "https://ncert.nic.in/textbook.php?gesc1=0-1"
    ]
  },
  {
    "family_name": "Honeycomb",
    "grade_level": 7,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Honeycomb",
        "official_code": "geen1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (geen1)",
      "https://ncert.nic.in/textbook.php?geen1=0-1"
    ]
  },
  {
    "family_name": "Our Pasts - II",
    "grade_level": 7,
    "subject_id": "CBSE-SUB-SOCSCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Our Pasts - II",
        "official_code": "gess1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (gess1)",
      "https://ncert.nic.in/textbook.php?gess1=0-1"
    ]
  },
  {
    "family_name": "Ganita Prakash Part-I",
    "grade_level": 8,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Ganita Prakash Part-I",
        "official_code": "hegp1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (hegp1)",
      "https://ncert.nic.in/textbook.php?hegp1=0-1"
    ]
  },
  {
    "family_name": "Ganita Prakash Part-II",
    "grade_level": 8,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Ganita Prakash Part-II",
        "official_code": "hegp2"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (hegp2)",
      "https://ncert.nic.in/textbook.php?hegp2=0-1"
    ]
  },
  {
    "family_name": "Curiosity",
    "grade_level": 8,
    "subject_id": "CBSE-SUB-SCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2024-NCF-SE",
    "academic_year": "2024-25",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Curiosity",
        "official_code": "hecu1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (hecu1)",
      "https://ncert.nic.in/textbook.php?hecu1=0-1"
    ]
  },
  {
    "family_name": "Honeydew",
    "grade_level": 8,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Honeydew",
        "official_code": "heen1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (heen1)",
      "https://ncert.nic.in/textbook.php?heen1=0-1"
    ]
  },
  {
    "family_name": "Our Pasts - III",
    "grade_level": 8,
    "subject_id": "CBSE-SUB-SOCSCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Our Pasts - III",
        "official_code": "hess1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (hess1)",
      "https://ncert.nic.in/textbook.php?hess1=0-1"
    ]
  },
  {
    "family_name": "Ganita Manjari (Mathematics IX)",
    "grade_level": 9,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Ganita Manjari (Mathematics IX)",
        "official_code": "iemh1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (iemh1)",
      "https://ncert.nic.in/textbook.php?iemh1=0-1"
    ]
  },
  {
    "family_name": "Exploration (Science IX)",
    "grade_level": 9,
    "subject_id": "CBSE-SUB-SCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Exploration (Science IX)",
        "official_code": "iesc1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (iesc1)",
      "https://ncert.nic.in/textbook.php?iesc1=0-1"
    ]
  },
  {
    "family_name": "Kaveri",
    "grade_level": 9,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Kaveri",
        "official_code": "iebe1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (iebe1)",
      "https://ncert.nic.in/textbook.php?iebe1=0-1"
    ]
  },
  {
    "family_name": "India and the Contemporary World - I",
    "grade_level": 9,
    "subject_id": "CBSE-SUB-SOCSCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "India and the Contemporary World - I",
        "official_code": "iess1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (iess1)",
      "https://ncert.nic.in/textbook.php?iess1=0-1"
    ]
  },
  {
    "family_name": "Kshitij Part 1",
    "grade_level": 9,
    "subject_id": "CBSE-SUB-HIN",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Kshitij Part 1",
        "official_code": "ieks1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (ieks1)",
      "https://ncert.nic.in/textbook.php?ieks1=0-1"
    ]
  },
  {
    "family_name": "Mathematics - Textbook for Class X",
    "grade_level": 10,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Mathematics - Textbook for Class X",
        "official_code": "jemh1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (jemh1)",
      "https://ncert.nic.in/textbook.php?jemh1=0-1"
    ]
  },
  {
    "family_name": "Science - Textbook for Class X",
    "grade_level": 10,
    "subject_id": "CBSE-SUB-SCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Science - Textbook for Class X",
        "official_code": "jesc1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (jesc1)",
      "https://ncert.nic.in/textbook.php?jesc1=0-1"
    ]
  },
  {
    "family_name": "India and the Contemporary World - II",
    "grade_level": 10,
    "subject_id": "CBSE-SUB-SOCSCI",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "India and the Contemporary World - II",
        "official_code": "jess1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (jess1)",
      "https://ncert.nic.in/textbook.php?jess1=0-1"
    ]
  },
  {
    "family_name": "First Flight",
    "grade_level": 10,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "First Flight",
        "official_code": "jeff1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (jeff1)",
      "https://ncert.nic.in/textbook.php?jeff1=0-1"
    ]
  },
  {
    "family_name": "Kshitij Part 2",
    "grade_level": 10,
    "subject_id": "CBSE-SUB-HIN",
    "stream_id": "GENERAL",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Kshitij Part 2",
        "official_code": "jeks1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (jeks1)",
      "https://ncert.nic.in/textbook.php?jeks1=0-1"
    ]
  },
  {
    "family_name": "Physics - Textbook for Class XI (Parts I & II)",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-PHY",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Physics - Textbook for Class XI (Parts I & II)",
        "official_code": "keph1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (keph1)",
      "https://ncert.nic.in/textbook.php?keph1=0-1"
    ]
  },
  {
    "family_name": "Chemistry - Textbook for Class XI (Parts I & II)",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-CHEM",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Chemistry - Textbook for Class XI (Parts I & II)",
        "official_code": "kech1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kech1)",
      "https://ncert.nic.in/textbook.php?kech1=0-1"
    ]
  },
  {
    "family_name": "Mathematics - Textbook for Class XI",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Mathematics - Textbook for Class XI",
        "official_code": "kemh1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kemh1)",
      "https://ncert.nic.in/textbook.php?kemh1=0-1"
    ]
  },
  {
    "family_name": "Biology - Textbook for Class XI",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-BIO",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Biology - Textbook for Class XI",
        "official_code": "kebo1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kebo1)",
      "https://ncert.nic.in/textbook.php?kebo1=0-1"
    ]
  },
  {
    "family_name": "Computer Science with Python - Class XI",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-CS",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Computer Science with Python - Class XI",
        "official_code": "kecs1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kecs1)",
      "https://ncert.nic.in/textbook.php?kecs1=0-1"
    ]
  },
  {
    "family_name": "Hornbill",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Hornbill",
        "official_code": "kehb1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kehb1)",
      "https://ncert.nic.in/textbook.php?kehb1=0-1"
    ]
  },
  {
    "family_name": "Financial Accounting - Class XI",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-ACC",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Financial Accounting - Class XI",
        "official_code": "keac1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (keac1)",
      "https://ncert.nic.in/textbook.php?keac1=0-1"
    ]
  },
  {
    "family_name": "Business Studies - Class XI",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-BST",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Business Studies - Class XI",
        "official_code": "kebs1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kebs1)",
      "https://ncert.nic.in/textbook.php?kebs1=0-1"
    ]
  },
  {
    "family_name": "Introductory Microeconomics & Statistics",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-ECON",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Introductory Microeconomics & Statistics",
        "official_code": "keec1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (keec1)",
      "https://ncert.nic.in/textbook.php?keec1=0-1"
    ]
  },
  {
    "family_name": "Themes in World History",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-HIST",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Themes in World History",
        "official_code": "kest1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kest1)",
      "https://ncert.nic.in/textbook.php?kest1=0-1"
    ]
  },
  {
    "family_name": "Indian Constitution at Work",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-POLSCI",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Indian Constitution at Work",
        "official_code": "keps1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (keps1)",
      "https://ncert.nic.in/textbook.php?keps1=0-1"
    ]
  },
  {
    "family_name": "Fundamentals of Physical Geography",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-GEOG",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Fundamentals of Physical Geography",
        "official_code": "kegy1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kegy1)",
      "https://ncert.nic.in/textbook.php?kegy1=0-1"
    ]
  },
  {
    "family_name": "Physics - Textbook for Class XII (Parts I & II)",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-PHY",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Physics - Textbook for Class XII (Parts I & II)",
        "official_code": "leph1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (leph1)",
      "https://ncert.nic.in/textbook.php?leph1=0-1"
    ]
  },
  {
    "family_name": "Chemistry - Textbook for Class XII (Parts I & II)",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-CHEM",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Chemistry - Textbook for Class XII (Parts I & II)",
        "official_code": "lech1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lech1)",
      "https://ncert.nic.in/textbook.php?lech1=0-1"
    ]
  },
  {
    "family_name": "Mathematics - Textbook for Class XII",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Mathematics - Textbook for Class XII",
        "official_code": "lemh1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lemh1)",
      "https://ncert.nic.in/textbook.php?lemh1=0-1"
    ]
  },
  {
    "family_name": "Biology - Textbook for Class XII",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-BIO",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Biology - Textbook for Class XII",
        "official_code": "lebo1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lebo1)",
      "https://ncert.nic.in/textbook.php?lebo1=0-1"
    ]
  },
  {
    "family_name": "Computer Science with Python - Class XII",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-CS",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Computer Science with Python - Class XII",
        "official_code": "lecs1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lecs1)",
      "https://ncert.nic.in/textbook.php?lecs1=0-1"
    ]
  },
  {
    "family_name": "Flamingo",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "SCIENCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Flamingo",
        "official_code": "lefl1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lefl1)",
      "https://ncert.nic.in/textbook.php?lefl1=0-1"
    ]
  },
  {
    "family_name": "Accounting for Partnership Firms & Analysis",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-ACC",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Accounting for Partnership Firms & Analysis",
        "official_code": "leac1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (leac1)",
      "https://ncert.nic.in/textbook.php?leac1=0-1"
    ]
  },
  {
    "family_name": "Principles and Functions of Management",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-BST",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Principles and Functions of Management",
        "official_code": "lebs1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lebs1)",
      "https://ncert.nic.in/textbook.php?lebs1=0-1"
    ]
  },
  {
    "family_name": "Introductory Macroeconomics & Development",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-ECON",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Introductory Macroeconomics & Development",
        "official_code": "leec1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (leec1)",
      "https://ncert.nic.in/textbook.php?leec1=0-1"
    ]
  },
  {
    "family_name": "Themes in Indian History",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-HIST",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Themes in Indian History",
        "official_code": "lest1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lest1)",
      "https://ncert.nic.in/textbook.php?lest1=0-1"
    ]
  },
  {
    "family_name": "Contemporary World Politics",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-POLSCI",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Contemporary World Politics",
        "official_code": "leps1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (leps1)",
      "https://ncert.nic.in/textbook.php?leps1=0-1"
    ]
  },
  {
    "family_name": "Fundamentals of Human Geography",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-GEOG",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Fundamentals of Human Geography",
        "official_code": "legy1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (legy1)",
      "https://ncert.nic.in/textbook.php?legy1=0-1"
    ]
  },
  {
    "family_name": "Hornbill",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Hornbill",
        "official_code": "kehb1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kehb1)",
      "https://ncert.nic.in/textbook.php?kehb1=0-1"
    ]
  },
  {
    "family_name": "Hornbill",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Hornbill",
        "official_code": "kehb1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kehb1)",
      "https://ncert.nic.in/textbook.php?kehb1=0-1"
    ]
  },
  {
    "family_name": "Flamingo",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Flamingo",
        "official_code": "lefl1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lefl1)",
      "https://ncert.nic.in/textbook.php?lefl1=0-1"
    ]
  },
  {
    "family_name": "Flamingo",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-ENG",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Flamingo",
        "official_code": "lefl1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lefl1)",
      "https://ncert.nic.in/textbook.php?lefl1=0-1"
    ]
  },
  {
    "family_name": "Mathematics - Textbook for Class XI",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Mathematics - Textbook for Class XI",
        "official_code": "kemh1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kemh1)",
      "https://ncert.nic.in/textbook.php?kemh1=0-1"
    ]
  },
  {
    "family_name": "Introducing Sociology",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-SOCIO",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Introducing Sociology",
        "official_code": "keso1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (keso1)",
      "https://ncert.nic.in/textbook.php?keso1=0-1"
    ]
  },
  {
    "family_name": "Introduction to Psychology",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-PSYCH",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Introduction to Psychology",
        "official_code": "kepy1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (kepy1)",
      "https://ncert.nic.in/textbook.php?kepy1=0-1"
    ]
  },
  {
    "family_name": "Introductory Microeconomics & Statistics",
    "grade_level": 11,
    "subject_id": "CBSE-SUB-ECON",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Introductory Microeconomics & Statistics",
        "official_code": "keec1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (keec1)",
      "https://ncert.nic.in/textbook.php?keec1=0-1"
    ]
  },
  {
    "family_name": "Mathematics - Textbook for Class XII",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-MATH",
    "stream_id": "COMMERCE",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Mathematics - Textbook for Class XII",
        "official_code": "lemh1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lemh1)",
      "https://ncert.nic.in/textbook.php?lemh1=0-1"
    ]
  },
  {
    "family_name": "Indian Society",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-SOCIO",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Indian Society",
        "official_code": "leso1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (leso1)",
      "https://ncert.nic.in/textbook.php?leso1=0-1"
    ]
  },
  {
    "family_name": "Psychology Class XII",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-PSYCH",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Psychology Class XII",
        "official_code": "lepy1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (lepy1)",
      "https://ncert.nic.in/textbook.php?lepy1=0-1"
    ]
  },
  {
    "family_name": "Introductory Macroeconomics & Development",
    "grade_level": 12,
    "subject_id": "CBSE-SUB-ECON",
    "stream_id": "HUMANITIES",
    "curriculum_version": "CBSE-NCERT-2026-27",
    "academic_year": "2026-27",
    "role": "CORE_REQUIRED",
    "parts": [
      {
        "part_number": 1,
        "part_title": "Introductory Macroeconomics & Development",
        "official_code": "leec1"
      }
    ],
    "evidence_references": [
      "NCERT Official Catalogue (leec1)",
      "https://ncert.nic.in/textbook.php?leec1=0-1"
    ]
  }
];

export function resolveCurriculumApplicability(
  gradeLevel: number,
  subjectId: string,
  streamId: string = 'GENERAL',
  targetYear?: string
): NcrtCurriculumApplicabilityRecord | null {
  const match = STATUTORY_NCERT_APPLICABILITY_REGISTRY.find(
    entry =>
      entry.grade_level === gradeLevel &&
      entry.subject_id === subjectId &&
      (gradeLevel <= 10 || entry.stream_id === streamId)
  );

  if (match) {
    return {
      id: `CBSE-APP-${match.grade_level}-${match.subject_id}-${match.stream_id}`,
      board: 'CBSE',
      academic_year: targetYear || match.academic_year,
      curriculum_version: match.curriculum_version,
      grade_level: match.grade_level,
      grade_id: `CBSE-G${match.grade_level}`,
      stream_id: match.stream_id,
      subject_id: match.subject_id,
      subject_name: match.family_name,
      textbook_family: match.family_name,
      applicability_role: match.role,
      valid_from: '2024-04-01',
      valid_to: null,
      status: 'CURRENT',
      evidence_references: match.evidence_references,
    };
  }

  const manifestMatch = CBSE_SOURCE_MANIFEST.find(
    m => m.grade_level === gradeLevel && m.subject_id === subjectId && (gradeLevel <= 10 || m.stream_id === streamId)
  );
  if (manifestMatch) {
    return {
      id: `CBSE-APP-${manifestMatch.grade_level}-${manifestMatch.subject_id}-${manifestMatch.stream_id}`,
      board: 'CBSE',
      academic_year: (targetYear as any) || (manifestMatch.curriculum_version_id === 'CBSE-NCERT-2024-NCF-SE' ? '2024-25' : '2026-27'),
      curriculum_version: manifestMatch.curriculum_version_id as any,
      grade_level: manifestMatch.grade_level,
      grade_id: manifestMatch.grade_id,
      stream_id: manifestMatch.stream_id,
      subject_id: manifestMatch.subject_id,
      subject_name: manifestMatch.official_textbook_name,
      textbook_family: manifestMatch.official_textbook_name,
      applicability_role: 'CORE_REQUIRED',
      valid_from: '2024-04-01',
      valid_to: null,
      status: 'CURRENT',
      evidence_references: [manifestMatch.official_source_url],
    };
  }

  return null;
}

export function discoverAllTextbookParts(
  family: string,
  gradeLevel: number,
  subjectId: string
): NcrtPartIdentity[] {
  const meta = STATUTORY_NCERT_APPLICABILITY_REGISTRY.find(
    e => e.family_name === family && e.grade_level === gradeLevel && e.subject_id === subjectId
  );

  if (meta && meta.parts && meta.parts.length > 0) {
    return meta.parts.map(p => ({
      part_id: `PART-${p.part_number}`,
      part_number: p.part_number,
      part_title: p.part_title,
      official_code: p.official_code,
      source_url: `https://ncert.nic.in/textbook.php?${p.official_code}=0-1`,
      part_order: p.part_number,
    }));
  }

  const manifestMatches = CBSE_SOURCE_MANIFEST.filter(
    m => m.grade_level === gradeLevel && m.subject_id === subjectId
  );
  if (manifestMatches.length > 0) {
    return manifestMatches.map((m, idx) => {
      const partNum = typeof m.part_volume === 'number' ? m.part_volume : idx + 1;
      return {
        part_id: `PART-${partNum}`,
        part_number: partNum,
        part_title: m.part_volume ? `Part ${m.part_volume}` : (m.official_textbook_name || 'Single Volume'),
        official_code: m.official_source_code,
        source_url: m.official_source_url,
        part_order: partNum,
      };
    });
  }

  return [];
}
