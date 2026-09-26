import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

// =============================================================================
// SOURCE-BACKED AUTHORITATIVE CURRICULUM CONCEPTS (CBSE / NCERT)
// Source 1: CBSE Secondary School Curriculum 2026-27 (DOC-CBSE-SEC-2026)
// Source 2: NCERT Learning Outcomes & NCF-SE 2024 Framework (DOC-NCERT-SYLLABUS-MS)
// =============================================================================

interface AuthConceptDef {
  id: string; // INTERNAL_AUTHORITY_RECORD_ID
  curriculum_version_id: string;
  board_id: 'CBSE';
  grade_level: number;
  subject_id: 'MATH' | 'SCIENCE' | 'PHYSICS' | 'CHEMISTRY' | 'BIOLOGY';
  textbook_id: string | null;
  chapter_id: string | null;
  section_id: string | null;
  official_concept_code: null; // Strictly NULL
  official_title: string;
  official_description: string;
  source_id: string;
  source_document_id: string;
  source_url: string;
  source_page: string;
  verification_status: 'VERIFIED' | 'PENDING_REVIEW';
  evidence: string;
}

const AUTH_CONCEPTS_REGISTRY: AuthConceptDef[] = [
  // ---------------------------------------------------------------------------
  // CLASS 10 MATHEMATICS (CBSE Secondary Curriculum 2026-27, Code 041)
  // ---------------------------------------------------------------------------
  {
    id: 'AUTH-CBSE-G10-MATH-CH01-FTA',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-01',
    section_id: null,
    official_concept_code: null,
    official_title: 'Fundamental Theorem of Arithmetic',
    official_description: 'Fundamental Theorem of Arithmetic - statements after reviewing work done earlier and after illustrating and motivating through examples. Finding HCF and LCM of positive integers using prime factorisation.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit I: Number Systems',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27 (Subject Code 041), Unit I: Real Numbers.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH01-IRR',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-01',
    section_id: null,
    official_concept_code: null,
    official_title: 'Proofs of Irrationality of Real Numbers',
    official_description: 'Proofs of irrationality of √2, √3, √5 using method of contradiction.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit I: Number Systems',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit I: Real Numbers.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH02-POLY-ZERO',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-02',
    section_id: null,
    official_concept_code: null,
    official_title: 'Zeroes of a Polynomial & Coefficients Relationship',
    official_description: 'Zeroes of a polynomial. Relationship between zeroes and coefficients of quadratic polynomials.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit II: Algebra',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit II: Polynomials.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH03-LINEAR-PAIR',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-03',
    section_id: null,
    official_concept_code: null,
    official_title: 'Pair of Linear Equations in Two Variables (Graphical & Algebraic)',
    official_description: 'Pair of linear equations in two variables and graphical method of their solution, consistency/inconsistency. Algebraic conditions for number of solutions. Solution by substitution and by elimination.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit II: Algebra',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit II: Pair of Linear Equations in Two Variables.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH04-QUAD-EQN',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-04',
    section_id: null,
    official_concept_code: null,
    official_title: 'Quadratic Equations & Discriminant Nature of Roots',
    official_description: 'Standard form of a quadratic equation ax² + bx + c = 0, (a ≠ 0). Solutions of quadratic equations (only real roots) by factorisation, and by using quadratic formula. Relationship between discriminant and nature of roots.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit II: Algebra',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit II: Quadratic Equations.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH05-AP-NTH',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-05',
    section_id: null,
    official_concept_code: null,
    official_title: 'Arithmetic Progression: nth Term & Sum of n Terms',
    official_description: 'Motivation for studying Arithmetic Progression. Derivation of the nth term and sum of the first n terms of A.P. and their application in solving daily life problems.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit II: Algebra',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit II: Arithmetic Progressions.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH06-TRI-BPT',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-06',
    section_id: null,
    official_concept_code: null,
    official_title: 'Similar Triangles & Basic Proportionality Theorem',
    official_description: 'Definitions, examples, counter examples of similar triangles. (Prove) If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, the other two sides are divided in the same ratio.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit IV: Geometry',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit IV: Triangles.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH07-COORD-GEO',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-07',
    section_id: null,
    official_concept_code: null,
    official_title: 'Coordinate Geometry: Distance & Section Formulae',
    official_description: 'Concepts of coordinate geometry, graphs of linear equations. Distance formula. Section formula (internal division).',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit III: Coordinate Geometry',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit III: Coordinate Geometry.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH08-TRIG-RATIOS',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-08',
    section_id: null,
    official_concept_code: null,
    official_title: 'Trigonometric Ratios & Identities',
    official_description: 'Trigonometric ratios of an acute angle of a right-angled triangle. Proof of their existence (well defined); values of the trigonometric ratios of 30°, 45° and 60°. Proof and applications of the identity sin²A + cos²A = 1.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit V: Trigonometry',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit V: Introduction to Trigonometry & Trigonometric Identities.',
  },
  {
    id: 'AUTH-CBSE-G10-MATH-CH10-CIRCLES-TANGENT',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G10-MATH',
    chapter_id: 'CH-NCERT-G10-MATH-10',
    section_id: null,
    official_concept_code: null,
    official_title: 'Tangents to a Circle (Theorems & Proofs)',
    official_description: 'Tangent to a circle at point of contact. (Prove) The tangent at any point of a circle is perpendicular to the radius through the point of contact. (Prove) The lengths of tangents drawn from an external point to a circle are equal.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Mathematics, Unit IV: Geometry',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit IV: Circles.',
  },

  // ---------------------------------------------------------------------------
  // CLASS 10 SCIENCE (CBSE Secondary Curriculum 2026-27, Code 086)
  // ---------------------------------------------------------------------------
  {
    id: 'AUTH-CBSE-G10-SCI-CH01-CHEM-RXN',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'CHEMISTRY',
    textbook_id: 'TB-NCERT-G10-SCIENCE',
    chapter_id: 'CH-NCERT-G10-SCI-01',
    section_id: null,
    official_concept_code: null,
    official_title: 'Chemical Reactions and Balanced Chemical Equations',
    official_description: 'Chemical equation, Balanced chemical equation, implications of a balanced chemical equation, types of chemical reactions: combination, decomposition, displacement, double displacement, precipitation, endothermic exothermic reactions, oxidation and reduction.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Science, Unit I: Chemical Substances - Nature and Behaviour',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27 (Code 086), Unit I: Chemical Reactions.',
  },
  {
    id: 'AUTH-CBSE-G10-SCI-CH02-ACID-BASE',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'CHEMISTRY',
    textbook_id: 'TB-NCERT-G10-SCIENCE',
    chapter_id: 'CH-NCERT-G10-SCI-02',
    section_id: null,
    official_concept_code: null,
    official_title: 'Acids, Bases and Salts & pH Scale',
    official_description: 'Their definitions in terms of furnishing of H+ and OH- ions, General properties, examples and uses, neutralization, concept of pH scale (Definition relating to logarithm not required), importance of pH in everyday life; preparation and uses of Sodium Hydroxide, Bleaching powder, Baking soda, Washing soda and Plaster of Paris.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Science, Unit I: Chemical Substances - Nature and Behaviour',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit I: Acids, Bases and Salts.',
  },
  {
    id: 'AUTH-CBSE-G10-SCI-CH05-LIFE-PROC',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'BIOLOGY',
    textbook_id: 'TB-NCERT-G10-SCIENCE',
    chapter_id: 'CH-NCERT-G10-SCI-05',
    section_id: null,
    official_concept_code: null,
    official_title: 'Life Processes (Nutrition, Respiration, Transport, Excretion)',
    official_description: '"Living Being". Basic concept of nutrition, respiration, transport and excretion in plants and animals.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Science, Unit II: World of Living',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit II: Life Processes.',
  },
  {
    id: 'AUTH-CBSE-G10-SCI-CH09-LIGHT-OPTICS',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'PHYSICS',
    textbook_id: 'TB-NCERT-G10-SCIENCE',
    chapter_id: 'CH-NCERT-G10-SCI-09',
    section_id: null,
    official_concept_code: null,
    official_title: 'Reflection and Refraction of Light (Mirrors & Lenses)',
    official_description: 'Reflection of light by curved surfaces; Images formed by spherical mirrors, centre of curvature, principal axis, principal focus, focal length, mirror formula, magnification. Refraction; Laws of refraction, refractive index. Refraction of light by spherical lens; Image formed by spherical lenses; Lens formula; Magnification. Power of a lens.',
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Science, Unit III: Natural Phenomena',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit III: Light - Reflection and Refraction.',
  },
  {
    id: 'AUTH-CBSE-G10-SCI-CH11-ELECTRICITY',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'PHYSICS',
    textbook_id: 'TB-NCERT-G10-SCIENCE',
    chapter_id: 'CH-NCERT-G10-SCI-11',
    section_id: null,
    official_concept_code: null,
    official_title: "Electricity: Ohm's Law, Resistance & Joule Heating",
    official_description: "Electric current, potential difference and electric current. Ohm's law; Resistance, Resistivity, Factors on which the resistance of a conductor depends. Series combination of resistors, parallel combination of resistors and its applications in daily life. Heating effect of electric current and its applications in daily life. Electric power, Interrelation between P, V, I and R.",
    source_id: 'SRC-CBSE-ACADEMIC',
    source_document_id: 'DOC-CBSE-SEC-2026',
    source_url: 'https://cbseacademic.nic.in/curriculum_2027.html',
    source_page: 'CBSE Curriculum 2026-27, Class X Science, Unit IV: Effects of Current',
    verification_status: 'VERIFIED',
    evidence: 'Verbatim syllabus statement from CBSE Secondary School Curriculum 2026-27, Unit IV: Electricity.',
  },

  // ---------------------------------------------------------------------------
  // CLASS 6 NCF-SE 2024 (Ganita Prakash & Curiosity)
  // ---------------------------------------------------------------------------
  {
    id: 'AUTH-CBSE-G6-MATH-2024-CH01-PATTERNS',
    curriculum_version_id: 'CBSE-NCERT-2024-NCF-SE',
    board_id: 'CBSE',
    grade_level: 6,
    subject_id: 'MATH',
    textbook_id: 'TB-NCERT-G6-MATH-2024',
    chapter_id: 'CH-NCERT-G6-MATH-2024-01',
    section_id: null,
    official_concept_code: null,
    official_title: 'Patterns in Mathematics',
    official_description: 'Exploration of geometric and numerical patterns, sequences, and rule formation under NCF-SE Middle Stage mathematics.',
    source_id: 'SRC-NCERT-OFFICIAL',
    source_document_id: 'DOC-NCERT-SYLLABUS-MS',
    source_url: 'https://ncert.nic.in/textbook.php?femh1=0-10',
    source_page: 'Ganita Prakash Class 6, Chapter 1: Patterns in Mathematics',
    verification_status: 'VERIFIED',
    evidence: 'Official chapter locus in NCERT Ganita Prakash (Class 6 Mathematics, NCF-SE 2024 Edition).',
  },
  {
    id: 'AUTH-CBSE-G6-SCI-2024-CH01-WONDER',
    curriculum_version_id: 'CBSE-NCERT-2024-NCF-SE',
    board_id: 'CBSE',
    grade_level: 6,
    subject_id: 'SCIENCE',
    textbook_id: 'TB-NCERT-G6-SCIENCE-2024',
    chapter_id: 'CH-NCERT-G6-SCI-2024-01',
    section_id: null,
    official_concept_code: null,
    official_title: 'The Wonderful World of Science',
    official_description: 'Introduction to scientific inquiry, observation, experimentation, and discovery in the living and physical world.',
    source_id: 'SRC-NCERT-OFFICIAL',
    source_document_id: 'DOC-NCERT-SYLLABUS-MS',
    source_url: 'https://ncert.nic.in/textbook.php?fesc1=0-12',
    source_page: 'Curiosity Class 6, Chapter 1: The Wonderful World of Science',
    verification_status: 'VERIFIED',
    evidence: 'Official chapter locus in NCERT Curiosity (Class 6 Science, NCF-SE 2024 Edition).',
  },
];

async function ingestAuthoritativeConcepts() {
  console.log('================================================================');
  console.log(' INGESTING SOURCE-BACKED AUTHORITATIVE CURRICULUM CONCEPTS');
  console.log('================================================================\n');

  console.log(`Prepared ${AUTH_CONCEPTS_REGISTRY.length} authentic source-backed concept records.`);

  // Insert into public.authoritative_curriculum_concepts
  const { data, error } = await supabase
    .from('authoritative_curriculum_concepts')
    .upsert(AUTH_CONCEPTS_REGISTRY, { onConflict: 'id' })
    .select();

  if (error) {
    console.error('Error inserting authoritative concepts:', error);
    throw error;
  }

  console.log(`✓ Successfully seeded ${data?.length} authoritative curriculum concepts into public.authoritative_curriculum_concepts!`);

  // Verify count
  const { count } = await supabase
    .from('authoritative_curriculum_concepts')
    .select('*', { count: 'exact', head: true });

  console.log(`Total live authoritative concepts: ${count}`);

  // Invariant preservation check
  const { count: cCount } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: tCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: mCount } = await supabase.from('content_modules').select('*', { count: 'exact', head: true });

  console.log('\n--- Invariant Checks ---');
  console.log(`curriculum_concepts: ${cCount} (Expected: 846)`);
  console.log(`topics:              ${tCount} (Expected: 126)`);
  console.log(`content_modules:     ${mCount} (Expected: 282)`);

  if (cCount !== 846 || tCount !== 126 || mCount !== 282) {
    throw new Error('CRITICAL INVARIANT VIOLATION: Existing production data modified!');
  }

  console.log('\n✓ All invariants preserved.');
}

ingestAuthoritativeConcepts().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
