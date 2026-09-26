// =============================================================================
// Brainoro OS — Authoritative NCERT 2026-27 Resolver Verification Test
// Tests:
// 1. Strict structural fidelity for Class 6 Science ("Curiosity", fecu1, 12 chapters)
// 2. Strict structural fidelity for Class 6 Math ("Ganita Prakash", femh1, 10 chapters)
// 3. Fail-closed behavior (DATA_PENDING) for unmapped/unverified grade/subject
// 4. Multi-board context isolation (CBSE vs Cambridge vs IB_MYP)
// =============================================================================

import {
  resolveAuthoritativeCurriculum,
  resolveCurriculumContext,
} from '../frontend/src/lib/supabase/curriculumService';

async function runTests() {
  console.log('=============================================================================');
  console.log('BRAINORO OS — AUTHORITATIVE RESOLVER VERIFICATION SUITE (NCERT 2026-27)');
  console.log('=============================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} — ${detail || 'Assertion failed'}`);
      failed++;
    }
  }

  // ---------------------------------------------------------------------------
  // TEST 1: Class 6 Science ("Curiosity", code: fecu1, 12 chapters)
  // ---------------------------------------------------------------------------
  console.log('--- TEST 1: Query Class 6 Science 2026-27 ---');
  const sciRes = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 6,
    subject: 'SCIENCE',
  });

  assert(sciRes.status === 'PAGE_READY', 'Status is PAGE_READY');
  assert(sciRes.total_chapters === 12, `Total chapters is 12 (got ${sciRes.total_chapters})`);
  assert(sciRes.textbook_title === 'Curiosity', `Textbook title is 'Curiosity' (got '${sciRes.textbook_title}')`);
  assert(sciRes.official_code === 'fecu1', `Official code is 'fecu1' (got '${sciRes.official_code}')`);
  assert(sciRes.chapters[0]?.chapter_title === 'The Wonderful World of Science', 'Ch 1: The Wonderful World of Science');
  assert(sciRes.chapters[11]?.chapter_title === 'Beyond Earth', 'Ch 12: Beyond Earth');

  // ---------------------------------------------------------------------------
  // TEST 2: Class 6 Mathematics ("Ganita Prakash", code: femh1, 10 chapters)
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 2: Query Class 6 Mathematics 2026-27 ---');
  const mathRes = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 6,
    subject: 'MATH',
  });

  assert(mathRes.status === 'PAGE_READY', 'Status is PAGE_READY');
  assert(mathRes.total_chapters === 10, `Total chapters is 10 (got ${mathRes.total_chapters})`);
  assert(mathRes.textbook_title === 'Ganita Prakash', `Textbook title is 'Ganita Prakash' (got '${mathRes.textbook_title}')`);
  assert(mathRes.official_code === 'femh1', `Official code is 'femh1' (got '${mathRes.official_code}')`);
  assert(mathRes.chapters[0]?.chapter_title === 'Patterns in Mathematics', 'Ch 1: Patterns in Mathematics');
  assert(mathRes.chapters[1]?.chapter_title === 'Lines and Angles', 'Ch 2: Lines and Angles');
  assert(mathRes.chapters[9]?.chapter_title === 'The Other Side of Zero', 'Ch 10: The Other Side of Zero');

  // ---------------------------------------------------------------------------
  // TEST 3: Fail-Closed Gate: Unverified Grade/Subject returns DATA_PENDING
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 3: Fail-Closed Gate on Unverified Subject ---');
  const unverifiedRes = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 12,
    subject: 'UNKNOWN_SUBJECT_XYZ',
  });

  assert(unverifiedRes.status === 'DATA_PENDING', 'Unverified subject returns DATA_PENDING');
  assert(unverifiedRes.total_chapters === 0, 'Zero chapters returned (no hallucination)');
  assert(unverifiedRes.chapters.length === 0, 'Chapters array is empty');

  // Context resolution check
  const unverifiedContext = await resolveCurriculumContext({
    boardId: 'CBSE',
    gradeLevel: 12,
    subjectId: 'UNKNOWN_SUBJECT_XYZ',
  });
  assert(unverifiedContext.state === 'DATA_PENDING', 'resolveCurriculumContext returns DATA_PENDING');
  assert(unverifiedContext.allChapters?.length === 0, 'No legacy fallback chapters present');

  // ---------------------------------------------------------------------------
  // TEST 4: Context Isolation Across Boards (CBSE vs CAMBRIDGE vs IB_MYP)
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 4: Multi-Board Context Isolation ---');
  const cambridgeContext = await resolveCurriculumContext({
    boardId: 'CAMBRIDGE',
    gradeLevel: 6,
    subjectId: 'MATH',
  });
  assert(cambridgeContext.isAuthoritative === false, 'Cambridge is non-authoritative');
  assert(cambridgeContext.state === 'UNMAPPED', 'Cambridge returns UNMAPPED state');
  assert(cambridgeContext.learningContext?.boardId === 'CAMBRIDGE', 'Learning context strictly preserves CAMBRIDGE boardId');

  const ibContext = await resolveCurriculumContext({
    boardId: 'IB_MYP',
    gradeLevel: 6,
    subjectId: 'MATH',
  });
  assert(ibContext.isAuthoritative === false, 'IB_MYP is non-authoritative');
  assert(ibContext.state === 'UNMAPPED', 'IB_MYP returns UNMAPPED state');
  assert(ibContext.learningContext?.boardId === 'IB_MYP', 'Learning context strictly preserves IB_MYP boardId');

  // Re-query CBSE to verify zero pollution from Cambridge/IB_MYP
  const cbseRecheck = await resolveCurriculumContext({
    boardId: 'CBSE',
    gradeLevel: 6,
    subjectId: 'SCIENCE',
  });
  assert(cbseRecheck.isAuthoritative === true, 'CBSE is authoritative after switching');
  assert(cbseRecheck.state === 'VERIFIED', 'CBSE returns VERIFIED state');
  assert(cbseRecheck.allChapters?.length === 12, 'CBSE still has exact 12 chapters without leakage');
  assert(cbseRecheck.learningContext?.boardId === 'CBSE', 'CBSE boardId strictly preserved');

  console.log('\n=============================================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('=============================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Unhandled error in test suite:', err);
  process.exit(1);
});
