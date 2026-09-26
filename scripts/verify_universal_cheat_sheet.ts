// =============================================================================
// Brainoro OS — Verification Script for Universal Cheat Sheet Resilience
// & Authoritative Class 10 Mathematics (jemh1) Ingestion
// =============================================================================

import {
  resolveAuthoritativeCurriculum,
  resolveCurriculumContext,
  fetchConceptById,
  ENABLE_CHEAT_SHEET_VIEW,
} from '../frontend/src/lib/supabase/curriculumService';
import { resolveVerifiedCbseCurriculum } from '../frontend/src/lib/services/cbseRuntimeGate';
import { getContentForTopic, synthesizeLocalOERNotes } from '../frontend/src/lib/services/contentService';
import {
  fetchCbseGrades,
  fetchCbseGradeSubjects,
  fetchCbseTextbooks,
  fetchCbseChapters,
} from '../frontend/src/lib/services/cbseCurriculumService';
import { CurriculumConcept } from '../frontend/src/lib/types';

const EXPECTED_G10_MATH_CHAPTERS = [
  'Real Numbers',
  'Polynomials',
  'Pair of Linear Equations in Two Variables',
  'Quadratic Equations',
  'Arithmetic Progressions',
  'Triangles',
  'Coordinate Geometry',
  'Introduction to Trigonometry',
  'Some Applications of Trigonometry',
  'Circles',
  'Areas Related to Circles',
  'Surface Areas and Volumes',
  'Statistics',
  'Probability',
];

async function runVerification() {
  console.log('=============================================================================');
  console.log('BRAINORO OS: UNIVERSAL CHEAT SHEET & CLASS 10 MATH VERIFICATION');
  console.log('=============================================================================');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, details?: any) {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  [PASS] ${testName}`);
    } else {
      console.error(`  [FAIL] ${testName}`, details || '');
      process.exit(1);
    }
  }

  // ---------------------------------------------------------------------------
  // TEST SUITE 1: ENABLE_CHEAT_SHEET_VIEW Flag
  // ---------------------------------------------------------------------------
  console.log('\n[SUITE 1] Flag Verification');
  assert(ENABLE_CHEAT_SHEET_VIEW === true, 'ENABLE_CHEAT_SHEET_VIEW is true');

  // ---------------------------------------------------------------------------
  // TEST SUITE 2: Class 10 Mathematics Authority & Runtime Gate
  // ---------------------------------------------------------------------------
  console.log('\n[SUITE 2] Class 10 Mathematics Authority & Runtime Gate');

  // 2.1 Authoritative Curriculum Resolver
  const authRes = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 10,
    subject: 'MATH',
  });

  assert(authRes.status === 'PAGE_READY', 'Class 10 Math resolves to PAGE_READY in resolveAuthoritativeCurriculum');
  assert(authRes.chapters.length === 14, `Class 10 Math has exactly 14 chapters (found: ${authRes.chapters.length})`);
  assert(authRes.official_code === 'jemh1', `Class 10 Math official_code is jemh1 (found: ${authRes.official_code})`);
  assert(authRes.textbook_title === 'Mathematics - Textbook for Class X', `Class 10 Math title is 'Mathematics - Textbook for Class X'`);

  // Verify all 14 chapter titles in sequence
  for (let i = 0; i < 14; i++) {
    const ch = authRes.chapters[i];
    const expected = EXPECTED_G10_MATH_CHAPTERS[i];
    assert(
      ch.chapter_title === expected,
      `Chapter ${i + 1} title matches '${expected}' (found: '${ch.chapter_title}')`
    );
  }

  // 2.2 resolveCurriculumContext
  const ctxRes = await resolveCurriculumContext({
    boardId: 'CBSE',
    gradeLevel: 10,
    subjectId: 'MATH',
  });

  assert(ctxRes.isAuthoritative === true, 'Class 10 Math curriculum context isAuthoritative === true');
  assert(ctxRes.state === 'VERIFIED', 'Class 10 Math curriculum context state === VERIFIED');
  assert(ctxRes.allChapters?.length === 14, `Class 10 Math context has 14 chapters (found: ${ctxRes.allChapters?.length})`);
  assert(ctxRes.textbook?.isbn_or_code === 'jemh1', 'Class 10 Math context textbook code is jemh1');

  // 2.3 cbseRuntimeGate
  const grades = await fetchCbseGrades();
  const g10 = grades.find(g => g.grade_level === 10)!;
  const gradeSubjects = await fetchCbseGradeSubjects(10, 'GENERAL');
  const mathGs = gradeSubjects.find(s => s.id === 'CBSE-G10-MATH')!;
  const tbs = await fetchCbseTextbooks('CBSE-G10-MATH');
  const chapters = await fetchCbseChapters({ textbookId: tbs[0].id });

  const gateRes = resolveVerifiedCbseCurriculum({
    isAuthoritative: true,
    grade: g10,
    gradeSubject: mathGs,
    textbook: tbs[0],
    allChapters: chapters,
    selectedChapter: chapters[0],
    sections: [],
    concepts: [],
    conceptSectionMappings: [],
    mappingState: 'VERIFIED',
  });

  assert(gateRes.gate_status === 'PAGE_READY', `cbseRuntimeGate returns PAGE_READY for Class 10 Math (found: ${gateRes.gate_status})`);
  assert(gateRes.textbooks_ready === 1, 'cbseRuntimeGate textbooks_ready === 1');
  assert(gateRes.textbooks_pending === 0, 'cbseRuntimeGate textbooks_pending === 0');

  // ---------------------------------------------------------------------------
  // TEST SUITE 3: Cheat Sheet Universal Resilience (Classes 6, 8, 10)
  // ---------------------------------------------------------------------------
  console.log('\n[SUITE 3] Cheat Sheet Universal Resilience Across Grades 6, 8, 10');

  // 3.1 Class 6 Concept Cheat Sheet
  const c6Concept: CurriculumConcept = {
    id: 'CBSE-CONC-CBSE-CH-G6-MATH-CH02-01',
    boardId: 'CBSE',
    gradeLevel: 6,
    subjectId: 'MATH',
    title: 'Points and Line Segments',
    unit: 'Chapter 2: Lines and Angles',
    coreLogicEssence: 'A point marks a distinct location with zero dimensions. A line segment has two distinct endpoints.',
    parentNodeId: null,
    prerequisites: [],
  };

  const c6Notes = await getContentForTopic(c6Concept, 'CBSE');
  assert(c6Notes !== null && typeof c6Notes === 'object', 'Class 6 Math cheat sheet payload generated successfully');
  assert(Boolean(c6Notes.mainNotes && c6Notes.mainNotes.length > 20), 'Class 6 cheat sheet contains rich mainNotes');
  assert(Boolean(c6Notes.structuralRule && c6Notes.structuralRule.length > 5), 'Class 6 cheat sheet contains structural rule');
  assert(Boolean(c6Notes.coreAnalogy && c6Notes.coreAnalogy.length > 10), 'Class 6 cheat sheet contains core intuition analogy');
  assert(Boolean(c6Notes.summary && c6Notes.summary.length > 10), 'Class 6 cheat sheet contains summary');

  // 3.2 Class 8 Concept Cheat Sheet (Ganita Prakash Part 1 & Part 2)
  const c8Concept: CurriculumConcept = {
    id: 'CBSE-G8-MATH-P1-CH01-CONC01',
    boardId: 'CBSE',
    gradeLevel: 8,
    subjectId: 'MATH',
    title: 'A Square and A Cube',
    unit: 'Chapter 1: A Square and A Cube',
    coreLogicEssence: 'Properties of square numbers, cube numbers, patterns of exponents and geometric representations.',
    parentNodeId: null,
    prerequisites: [],
  };

  const c8Notes = await getContentForTopic(c8Concept, 'CBSE');
  assert(c8Notes !== null && typeof c8Notes === 'object', 'Class 8 Math cheat sheet payload generated successfully');
  assert(Boolean(c8Notes.mainNotes && c8Notes.mainNotes.length > 20), 'Class 8 cheat sheet contains rich mainNotes');
  assert(Boolean(c8Notes.structuralRule), 'Class 8 cheat sheet contains structural rule');
  assert(Boolean(c8Notes.curriculumTrap), 'Class 8 cheat sheet contains curriculum trap');

  // 3.3 Class 10 Concept Cheat Sheet (Real Numbers / Polynomials / Quadratic Equations)
  const c10Concept: CurriculumConcept = {
    id: 'CBSE-CONC-CBSE-CH-G10-MATH-CH01-01',
    boardId: 'CBSE',
    gradeLevel: 10,
    subjectId: 'MATH',
    title: 'Real Numbers & Fundamental Theorem of Arithmetic',
    unit: 'Chapter 1: Real Numbers',
    coreLogicEssence: 'Every composite number can be expressed as a product of primes uniquely, apart from the order in which prime factors occur.',
    parentNodeId: null,
    prerequisites: [],
  };

  const c10Notes = await getContentForTopic(c10Concept, 'CBSE');
  assert(c10Notes !== null && typeof c10Notes === 'object', 'Class 10 Math cheat sheet payload generated successfully');
  assert(Boolean(c10Notes.mainNotes && c10Notes.mainNotes.length > 20), 'Class 10 cheat sheet contains rich mainNotes');
  assert(Boolean(c10Notes.structuralRule), 'Class 10 cheat sheet contains structural rule');
  assert(Boolean(c10Notes.workedExample?.problem), 'Class 10 cheat sheet contains worked example');

  // 3.4 fetchConceptById Fallback Resilience
  const dynamicConcept = await fetchConceptById('UNKNOWN-OR-UNSEEDED-CONCEPT-ID', {
    boardId: 'CBSE',
    gradeLevel: 10,
    subjectId: 'MATH',
    chapterTitle: 'Real Numbers',
    sectionTitle: 'The Fundamental Theorem of Arithmetic',
    chapterNo: 1,
  });

  assert(dynamicConcept.id === 'UNKNOWN-OR-UNSEEDED-CONCEPT-ID', 'fetchConceptById preserved concept ID');
  assert(dynamicConcept.title === 'The Fundamental Theorem of Arithmetic', 'fetchConceptById synthesized title from section');
  assert(dynamicConcept.gradeLevel === 10, 'fetchConceptById preserved gradeLevel 10');
  assert(Boolean(dynamicConcept.coreLogicEssence), 'fetchConceptById generated valid coreLogicEssence');

  const dynamicNotes = await getContentForTopic(dynamicConcept, 'CBSE');
  assert(Boolean(dynamicNotes.mainNotes), 'Dynamic synthesized concept yields valid Cornell Notes without error');

  console.log(`\n=============================================================================`);
  console.log(`ALL ${passedTests}/${totalTests} TESTS PASSED WITH ZERO CRITICAL ERRORS.`);
  console.log('=============================================================================');
  process.exit(0);
}

runVerification().catch((err) => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
