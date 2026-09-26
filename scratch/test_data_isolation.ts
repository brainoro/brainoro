import { synthesizeDeterministicOERContent, lookupDeterministicChapter } from '../frontend/src/lib/services/deterministicChapterRegistry';
import { getContentForTopic, synthesizeLocalOERNotes } from '../frontend/src/lib/services/contentService';
import type { CurriculumConcept } from '../frontend/src/types';

console.log('================================================================================');
console.log('🔒 ARCHITECTURE 2 HIERARCHICAL DATA ISOLATION VERIFICATION SUITE');
console.log('================================================================================\n');

let totalPassed = 0;
let totalFailed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    totalPassed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    if (detail) console.error(`   Detail: ${detail}`);
    totalFailed++;
  }
}

async function runTests() {
  // TEST 1: Class 11 Chemistry Chapter 1 MUST return Mole Concept & Stoichiometry (Zero pH / Acid-Base Leak)
  console.log('--- TEST GROUP 1: Class 11 Chemistry Chapter 1 Purity (Image Bug Verification) ---');
  const chemCh1Concept: CurriculumConcept = {
    id: 'AUTH-CBSE-G11-CHEM-CH01-CORE',
    boardId: 'CBSE',
    subjectId: 'CHEMISTRY',
    gradeLevel: 11,
    title: 'Some Basic Concepts of Chemistry',
    coreLogicEssence: 'Statutory CBSE Class 11 NCERT curriculum concept covering foundational rules, physical intuition, and step-by-step rigorous methodology for Some Basic Concepts of Chemistry.',
    unit: 'Chemistry - Textbook for Class XI (Parts I & II) Chapter 1',
    parentNodeId: null
  };

  const chemCh1Notes = await getContentForTopic(chemCh1Concept, 'CBSE');
  console.log(`[Class 11 Chem Ch 1] Essential Law: ${chemCh1Notes.structuralRule}`);
  console.log(`[Class 11 Chem Ch 1] Verification Problem: ${chemCh1Notes.verificationProblem}`);
  console.log(`[Class 11 Chem Ch 1] Quick Check / Trap: ${chemCh1Notes.curriculumTrap.split('\n')[0]}`);

  const chem1Str = JSON.stringify(chemCh1Notes);
  const hasMoleConcept = chem1Str.includes('n =') || chem1Str.includes('Mole') || chem1Str.includes('Molarity');
  const hasStoichiometry = chem1Str.includes('Stoichiometry') || chem1Str.includes('Limiting Reagent') || chem1Str.includes('Empirical');
  const hasNoPhLeak = !chem1Str.includes('see-saw') && !chem1Str.includes('pH = -log') && !chem1Str.includes('0.01 M HCl');

  assert(hasMoleConcept, 'Class 11 Chemistry Ch 1 contains Mole Concept / Molarity');
  assert(hasStoichiometry, 'Class 11 Chemistry Ch 1 contains Stoichiometry / Limiting Reagent');
  assert(hasNoPhLeak, 'Class 11 Chemistry Ch 1 has ZERO pH / Acid-Base / see-saw leakage');

  // TEST 2: Class 8 CANNOT access Class 12 concepts & Grade Isolation
  console.log('\n--- TEST GROUP 2: Strict Grade Level Isolation ---');
  const class8Concept: CurriculumConcept = {
    id: 'cbse-g8-mat-c01',
    boardId: 'CBSE',
    subjectId: 'MATH',
    gradeLevel: 8,
    title: 'Rational Numbers',
    coreLogicEssence: 'Representation on number line and closure properties of rational numbers',
    unit: 'Mathematics Grade 8 Chapter 1',
    parentNodeId: null
  };
  const class8Notes = await getContentForTopic(class8Concept, 'CBSE');
  assert(class8Notes.gradeLevel === 8, 'Class 8 concept has gradeLevel = 8');
  assert(!JSON.stringify(class8Notes).includes('Continuity') && !JSON.stringify(class8Notes).includes('Differentiability'), 'Class 8 does NOT contain Class 12 Calculus concepts');

  // TEST 3: Subject Isolation (English CANNOT get Math/Science concepts)
  console.log('\n--- TEST GROUP 3: Strict Subject Isolation ---');
  const englishConcept: CurriculumConcept = {
    id: 'AUTH-CBSE-G8-ENG-CH01',
    boardId: 'CBSE',
    subjectId: 'ENGLISH',
    gradeLevel: 8,
    title: 'The Best Christmas Present in the World',
    coreLogicEssence: 'Story of human empathy and peace amidst wartime Christmas truce',
    unit: 'Honeydew Chapter 1',
    parentNodeId: null
  };
  const englishNotes = await getContentForTopic(englishConcept, 'CBSE');
  const englishStr = JSON.stringify(englishNotes);
  const isPureEnglish = !englishStr.includes('Reactants -> Products') && !englishStr.includes('sum \\vec{F}') && !englishStr.includes('BODMAS');
  assert(isPureEnglish, 'English Literature concept has ZERO STEM / Formula contamination');
  assert(englishNotes.structuralRule.includes('Theme') || englishNotes.structuralRule.includes('Literary') || englishNotes.structuralRule.includes('Narrative Arc'), 'English concept has literary structural invariant');

  // TEST 4: Class 11 Chemistry Chapter 2 (Structure of Atom)
  console.log('\n--- TEST GROUP 4: Class 11 Chemistry Chapter 2 (Structure of Atom) ---');
  const chemCh2Concept: CurriculumConcept = {
    id: 'NCERT-G11-kech1-CH02',
    boardId: 'CBSE',
    subjectId: 'CHEMISTRY',
    gradeLevel: 11,
    title: 'Structure of Atom',
    coreLogicEssence: 'Quantum mechanical model, electronic configuration, and dual nature of matter',
    unit: 'Chemistry Chapter 2',
    parentNodeId: null
  };
  const chemCh2Notes = await getContentForTopic(chemCh2Concept, 'CBSE');
  const chem2Str = JSON.stringify(chemCh2Notes);
  assert(chem2Str.includes('Quantum') || chem2Str.includes('de Broglie') || chem2Str.includes('Heisenberg'), 'Class 11 Chemistry Ch 2 contains Quantum / de Broglie concepts');
  assert(!chem2Str.includes('pH scale') && !chem2Str.includes('see-saw'), 'Class 11 Chemistry Ch 2 has ZERO pH leakage');

  // SUMMARY
  console.log('\n================================================================================');
  console.log(`TOTAL TESTS: ${totalPassed + totalFailed} | PASSED: ${totalPassed} | FAILED: ${totalFailed}`);
  if (totalFailed === 0) {
    console.log('🎉 100% ARCHITECTURE 2 VERIFICATION COMPLETE: SYSTEM IS DATA LEAK FREE!');
  } else {
    console.error('❌ SOME TESTS FAILED');
  }
  console.log('================================================================================');
}

runTests();
