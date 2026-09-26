// =============================================================================
// Brainoro OS — Verification: Class 8 Mathematics Part Switcher UI & Reactivity
// =============================================================================

import {
  fetchCbseTextbooks,
  fetchCbseChapters,
  fetchCbseGradeSubjects,
  fetchCbseGrades,
} from '../frontend/src/lib/services/cbseCurriculumService';
import { resolveVerifiedCbseCurriculum } from '../frontend/src/lib/services/cbseRuntimeGate';

let passed = 0;
let failed = 0;

function assert(condition: boolean, msg: string, detail?: string) {
  if (condition) {
    console.log(`[PASS] ${msg}`);
    passed++;
  } else {
    console.error(`[FAIL] ${msg}${detail ? ` (${detail})` : ''}`);
    failed++;
  }
}

async function verifyClass8MathPartSwitcher() {
  console.log('=============================================================================');
  console.log('VERIFYING CLASS 8 MATHEMATICS MULTI-PART SWITCHER & REACTIVITY');
  console.log('=============================================================================\n');

  // Step 1: Discover Class 8 Math Textbooks (Parts 1...N)
  const grades = await fetchCbseGrades();
  const g8 = grades.find(g => g.grade_level === 8)!;
  const gradeSubjects = await fetchCbseGradeSubjects(8, 'GENERAL');
  const mathGs = gradeSubjects.find(s => s.id === 'CBSE-G8-MATH')!;

  assert(!!mathGs, 'Found CBSE-G8-MATH grade-subject');

  const textbooks = await fetchCbseTextbooks(mathGs.id);
  assert(textbooks.length === 2, `Discovered exactly 2 textbook parts (got ${textbooks.length})`);

  const tbPart1 = textbooks[0];
  const tbPart2 = textbooks[1];

  assert(tbPart1.title === 'Ganita Prakash Part-I', `Part 1 title is 'Ganita Prakash Part-I' (got '${tbPart1.title}')`);
  assert(tbPart1.official_code === 'hegp1', `Part 1 official_code is 'hegp1' (got '${tbPart1.official_code}')`);
  assert(tbPart1.is_primary === true, 'Part 1 is_primary is true');

  assert(tbPart2.title === 'Ganita Prakash Part-II', `Part 2 title is 'Ganita Prakash Part-II' (got '${tbPart2.title}')`);
  assert(tbPart2.official_code === 'hegp2', `Part 2 official_code is 'hegp2' (got '${tbPart2.official_code}')`);
  assert(tbPart2.is_primary === false, 'Part 2 is_primary is false');

  // Step 2: Simulate Default Initial State (Part 1 active)
  console.log('\n--- Checking Initial State: Part 1 Active ---');
  let activeTb = tbPart1;
  let chapters = await fetchCbseChapters({ textbookId: activeTb.id });

  assert(chapters.length === 7, `Part 1 has exactly 7 chapters (got ${chapters.length})`);
  assert(chapters[0].chapter_title === 'A Square and A Cube', `Part 1 Ch 1 is 'A Square and A Cube'`);
  assert(chapters[6].chapter_title === 'Proportional Reasoning-1', `Part 1 Ch 7 is 'Proportional Reasoning-1'`);

  // Verify Runtime Gate for Part 1
  let gate1 = resolveVerifiedCbseCurriculum({
    isAuthoritative: true,
    grade: g8,
    gradeSubject: mathGs,
    textbook: activeTb,
    allChapters: chapters,
    selectedChapter: chapters[0],
    sections: [],
    concepts: [],
    conceptSectionMappings: [],
    mappingState: 'VERIFIED',
  });
  assert(gate1.gate_status === 'PAGE_READY', `Runtime Gate for Part 1 is PAGE_READY (got ${gate1.gate_status})`);

  // Step 3: Simulate User Clicking "Part-II"
  console.log('\n--- Simulating User Switch: Clicking Part-II ---');
  activeTb = tbPart2; // Reactive selection
  chapters = await fetchCbseChapters({ textbookId: activeTb.id });

  assert(activeTb.title === 'Ganita Prakash Part-II', `Active textbook is 'Ganita Prakash Part-II'`);
  assert(activeTb.official_code === 'hegp2', `Textbook banner code reactively updated to 'hegp2'`);
  assert(chapters.length === 7, `Part 2 has exactly 7 chapters (got ${chapters.length})`);
  assert(chapters[0].chapter_title === 'Fractions in Disguise', `Part 2 Ch 1 is 'Fractions in Disguise' (got '${chapters[0]?.chapter_title}')`);
  assert(chapters[1].chapter_title === 'The Baudhayana-Pythagoras Theorem', `Part 2 Ch 2 is 'The Baudhayana-Pythagoras Theorem'`);
  assert(chapters[2].chapter_title === 'Proportional Reasoning-2', `Part 2 Ch 3 is 'Proportional Reasoning-2'`);
  assert(chapters[3].chapter_title === 'Exploring Some Geometric Themes', `Part 2 Ch 4 is 'Exploring Some Geometric Themes'`);
  assert(chapters[4].chapter_title === 'Tales by Dots and Lines', `Part 2 Ch 5 is 'Tales by Dots and Lines'`);
  assert(chapters[5].chapter_title === 'Algebra Play', `Part 2 Ch 6 is 'Algebra Play'`);
  assert(chapters[6].chapter_title === 'Area', `Part 2 Ch 7 is 'Area' (got '${chapters[6]?.chapter_title}')`);

  // Verify Runtime Gate for Part 2
  let gate2 = resolveVerifiedCbseCurriculum({
    isAuthoritative: true,
    grade: g8,
    gradeSubject: mathGs,
    textbook: activeTb,
    allChapters: chapters,
    selectedChapter: chapters[0],
    sections: [],
    concepts: [],
    conceptSectionMappings: [],
    mappingState: 'VERIFIED',
  });
  assert(gate2.gate_status === 'PAGE_READY', `Runtime Gate for Part 2 is PAGE_READY (got ${gate2.gate_status})`);

  // Step 4: Simulate User Clicking Back to "Part-I"
  console.log('\n--- Simulating User Switch Back: Clicking Part-I ---');
  activeTb = tbPart1;
  chapters = await fetchCbseChapters({ textbookId: activeTb.id });

  assert(activeTb.title === 'Ganita Prakash Part-I', `Active textbook switched back to 'Ganita Prakash Part-I'`);
  assert(activeTb.official_code === 'hegp1', `Textbook banner code reactively restored to 'hegp1'`);
  assert(chapters.length === 7, `Part 1 has 7 chapters restored`);
  assert(chapters[0].chapter_title === 'A Square and A Cube', `Part 1 Ch 1 is restored`);

  console.log('\n=============================================================================');
  console.log(`TOTAL: ${passed} PASSED, ${failed} FAILED`);
  console.log('=============================================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

verifyClass8MathPartSwitcher().catch(err => {
  console.error(err);
  process.exit(1);
});
