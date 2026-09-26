// =============================================================================
// Brainoro OS — Verification Suite: Multi-Part / Multi-Book Packages (1...N)
// Strict Structural Fidelity & Dynamic Volume Handling
// =============================================================================

import {
  resolveAuthoritativeCurriculum,
  resolveCurriculumContext,
} from '../frontend/src/lib/supabase/curriculumService';
import { resolveVerifiedCbseCurriculum } from '../frontend/src/lib/services/cbseRuntimeGate';
import {
  CBSE_GRADES,
  CBSE_GRADE_SUBJECTS,
  CBSE_STREAMS,
} from '../frontend/src/lib/data/cbseCurriculumData';

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    testsPassed++;
  } else {
    console.error(`[FAIL] ${testName}${detail ? ` — ${detail}` : ''}`);
    testsFailed++;
  }
}

async function main() {
  console.log('=============================================================================');
  console.log('BRAINORO OS — MULTI-PART / MULTI-BOOK (1...N) VERIFICATION SUITE');
  console.log('=============================================================================\n');

  // ---------------------------------------------------------------------------
  // TEST 1: Single-Book Package (Class 6 Science "Curiosity")
  // ---------------------------------------------------------------------------
  console.log('--- TEST 1: Single-Book Package (Class 6 Science "Curiosity") ---');
  const g6Sci = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 6,
    subject: 'SCIENCE',
  });

  assert(g6Sci.status === 'PAGE_READY', 'Class 6 Science status is PAGE_READY');
  assert(g6Sci.parts.length === 1, `Parts count is 1 (got ${g6Sci.parts.length})`);
  assert(g6Sci.parts[0].part_title === 'Curiosity', `Part title is 'Curiosity' (got '${g6Sci.parts[0]?.part_title}')`);
  assert(g6Sci.total_chapters === 12, `Total chapters is 12 (got ${g6Sci.total_chapters})`);
  assert(g6Sci.chapters.length === 12, `Returned chapters count is 12`);
  assert(g6Sci.chapters[0].id === 'CBSE-G6-SCIENCE-P1-CH01', `Ch 1 ID is composite format (got '${g6Sci.chapters[0]?.id}')`);
  assert(g6Sci.chapters[11].chapter_title === 'Beyond Earth', `Ch 12 title is 'Beyond Earth'`);

  // ---------------------------------------------------------------------------
  // TEST 2: Multi-Book Package Discovery & Structure (Class 8 Mathematics)
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 2: Multi-Book Package Discovery (Class 8 Mathematics) ---');
  const g8Math = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 8,
    subject: 'MATH',
  });

  assert(g8Math.status === 'PAGE_READY', 'Class 8 Math status is PAGE_READY');
  assert(g8Math.parts.length === 2, `Parts count is exactly 2 (got ${g8Math.parts.length})`);

  const p1 = g8Math.parts[0];
  const p2 = g8Math.parts[1];

  assert(p1.part_number === 1, 'Part 1 number is 1');
  assert(p1.part_title === 'Part I', `Part 1 title is 'Part I' (got '${p1.part_title}')`);
  assert(p1.textbook_title === 'Ganita Prakash Part-I', `Part 1 textbook is 'Ganita Prakash Part-I'`);
  assert(p1.total_chapters === 7, `Part 1 chapters count is 7 (got ${p1.total_chapters})`);
  assert(p1.chapters[0].chapter_title === 'Rational Numbers', `Part 1 Ch 1 is 'Rational Numbers'`);
  assert(p1.chapters[0].global_chapter_no === 1, `Part 1 Ch 1 global_chapter_no is 1`);
  assert(p1.chapters[6].chapter_title === 'Comparing Quantities', `Part 1 Ch 7 is 'Comparing Quantities'`);
  assert(p1.chapters[6].global_chapter_no === 7, `Part 1 Ch 7 global_chapter_no is 7`);

  assert(p2.part_number === 2, 'Part 2 number is 2');
  assert(p2.part_title === 'Part II', `Part 2 title is 'Part II' (got '${p2.part_title}')`);
  assert(p2.textbook_title === 'Ganita Prakash Part-II', `Part 2 textbook is 'Ganita Prakash Part-II'`);
  assert(p2.total_chapters === 7, `Part 2 chapters count is 7 (got ${p2.total_chapters})`);
  assert(p2.chapters[0].chapter_title === 'Fractions in Disguise', `Part 2 Ch 1 is 'Fractions in Disguise'`);
  assert(p2.chapters[0].global_chapter_no === 8, `Part 2 Ch 1 global_chapter_no is 8`);
  assert(p2.chapters[6].chapter_title === 'Area', `Part 2 Ch 7 is 'Area'`);
  assert(p2.chapters[6].global_chapter_no === 14, `Part 2 Ch 7 global_chapter_no is 14`);

  // Sequence Collision Check
  assert(p1.chapters[0].chapter_no === p2.chapters[0].chapter_no, 'Both parts start numbering at chapter_no = 1');
  assert(p1.chapters[0].id !== p2.chapters[0].id, `IDs are strictly distinct: '${p1.chapters[0].id}' vs '${p2.chapters[0].id}'`);
  assert(p1.chapters[0].chapter_title !== p2.chapters[0].chapter_title, 'Chapter titles are strictly non-colliding');
  assert(p1.chapters[0].global_chapter_no !== p2.chapters[0].global_chapter_no, 'Global chapter numbers are distinct (1 vs 8)');

  // ---------------------------------------------------------------------------
  // TEST 3: Targeted Part Querying (Part 1 vs Part 2)
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 3: Targeted Part Querying ---');
  const g8Part2 = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 8,
    subject: 'MATH',
    part_number: 2,
  });

  assert(g8Part2.status === 'PAGE_READY', 'Targeted Part 2 query is PAGE_READY');
  assert(g8Part2.part_number === 2, 'Active part number is 2');
  assert(g8Part2.textbook_title === 'Ganita Prakash Part-II', `Active textbook is 'Ganita Prakash Part-II'`);
  assert(g8Part2.chapters[0].chapter_title === 'Fractions in Disguise', `First chapter is 'Fractions in Disguise'`);

  const g8Part1 = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 8,
    subject: 'MATH',
    part_number: 1,
  });

  assert(g8Part1.status === 'PAGE_READY', 'Targeted Part 1 query is PAGE_READY');
  assert(g8Part1.part_number === 1, 'Active part number is 1');
  assert(g8Part1.textbook_title === 'Ganita Prakash Part-I', `Active textbook is 'Ganita Prakash Part-I'`);
  assert(g8Part1.chapters[0].chapter_title === 'Rational Numbers', `First chapter is 'Rational Numbers'`);

  // ---------------------------------------------------------------------------
  // TEST 4: Fail-Closed Gate on Unverified / Missing Part
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 4: Fail-Closed Gate on Unverified Part ---');
  const g8Part3 = await resolveAuthoritativeCurriculum({
    board: 'CBSE',
    academic_year: '2026-27',
    grade: 8,
    subject: 'MATH',
    part_number: 3, // Non-existent part
  });

  assert(g8Part3.status === 'DATA_PENDING', 'Querying unverified Part 3 returns DATA_PENDING');
  assert(g8Part3.total_chapters === 0, 'Zero chapters returned for unverified part');
  assert(g8Part3.chapters.length === 0, 'Chapters array is empty');
  assert(g8Part3.diagnostics[0]?.includes('Part 3 does not exist'), 'Diagnostic states Part 3 does not exist');

  // ---------------------------------------------------------------------------
  // TEST 5: resolveCurriculumContext with Part Number Switching
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 5: Context Resolver Part Number Switching ---');
  const ctxPart1 = await resolveCurriculumContext({
    boardId: 'CBSE',
    gradeLevel: 8,
    subjectId: 'MATH',
    partNumber: 1,
  });

  assert(ctxPart1.state === 'VERIFIED', 'Context Part 1 state is VERIFIED');
  assert(ctxPart1.activePartNumber === 1, 'Context activePartNumber is 1');
  assert(ctxPart1.textbook?.title === 'Ganita Prakash Part-I', `Context textbook is 'Ganita Prakash Part-I'`);
  assert(ctxPart1.parts?.length === 2, `Context includes both parts in package (${ctxPart1.parts?.length})`);
  assert(ctxPart1.allChapters?.[0].chapter_title === 'Rational Numbers', `Context Ch 1 is 'Rational Numbers'`);

  const ctxPart2 = await resolveCurriculumContext({
    boardId: 'CBSE',
    gradeLevel: 8,
    subjectId: 'MATH',
    partNumber: 2,
  });

  assert(ctxPart2.state === 'VERIFIED', 'Context Part 2 state is VERIFIED');
  assert(ctxPart2.activePartNumber === 2, 'Context activePartNumber is 2');
  assert(ctxPart2.textbook?.title === 'Ganita Prakash Part-II', `Context textbook is 'Ganita Prakash Part-II'`);
  assert(ctxPart2.allChapters?.[0].chapter_title === 'Fractions in Disguise', `Context Ch 1 is 'Fractions in Disguise'`);
  assert(ctxPart2.allChapters?.[0].global_chapter_no === 8, `Context Ch 1 global_chapter_no is 8`);

  // ---------------------------------------------------------------------------
  // TEST 6: Runtime Gate Multi-Part Verification
  // ---------------------------------------------------------------------------
  console.log('\n--- TEST 6: Runtime Gate Multi-Part Verification ---');
  const g8Grade = CBSE_GRADES.find(g => g.grade_level === 8) || {
    id: 'CBSE-G8', grade_level: 8, display_name: 'Class 8', stage: 'MIDDLE_STAGE' as const, display_order: 3,
  };
  const g8MathGs = CBSE_GRADE_SUBJECTS.find(gs => gs.id === 'CBSE-G8-MATH');
  const streamGen = CBSE_STREAMS.find(s => s.id === 'GENERAL') || {
    id: 'GENERAL', stream_code: 'GENERAL', display_name: 'General', description: '',
  };

  // Gate check for Part 1 (hegp1, 7 chapters)
  const gatePart1 = resolveVerifiedCbseCurriculum({
    grade: g8Grade,
    gradeSubject: g8MathGs,
    stream: streamGen,
    textbook: {
      id: 'CBSE-TB-G8-MATH-P1',
      grade_subject_id: 'CBSE-G8-MATH',
      curriculum_version_id: 'CBSE-NCERT-2024-NCF-SE',
      title: 'Ganita Prakash Part-I',
      publisher: 'NCERT',
      official_code: 'hegp1',
      edition: '2026-27 Revised',
      is_primary: true,
    },
    allChapters: ctxPart1.allChapters as any,
  } as any);

  assert(gatePart1.gate_status === 'PAGE_READY', `Runtime Gate for Part 1 is PAGE_READY (got ${gatePart1.gate_status})`);

  // Gate check for Part 2 (hegp2, 7 chapters)
  const gatePart2 = resolveVerifiedCbseCurriculum({
    grade: g8Grade,
    gradeSubject: g8MathGs,
    stream: streamGen,
    textbook: {
      id: 'CBSE-TB-G8-MATH-P2',
      grade_subject_id: 'CBSE-G8-MATH',
      curriculum_version_id: 'CBSE-NCERT-2024-NCF-SE',
      title: 'Ganita Prakash Part-II',
      publisher: 'NCERT',
      official_code: 'hegp2',
      edition: '2026-27 Revised',
      is_primary: true,
    },
    allChapters: ctxPart2.allChapters as any,
  } as any);

  assert(gatePart2.gate_status === 'PAGE_READY', `Runtime Gate for Part 2 is PAGE_READY (got ${gatePart2.gate_status})`);

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  console.log('\n=============================================================================');
  console.log(`TEST RESULTS: ${testsPassed} PASSED, ${testsFailed} FAILED`);
  console.log('=============================================================================');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
