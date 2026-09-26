import { getContentForTopic } from '../frontend/src/lib/services/contentService';
import type { CurriculumConcept } from '../frontend/src/types';

console.log('================================================================================');
console.log('🔍 VERIFICATION FOR SPECIFIC IMAGE BUGS: DEBENTURES & FRACTIONS/DECIMALS');
console.log('================================================================================\n');

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    if (detail) console.error(`   Detail: ${detail}`);
    failed++;
  }
}

async function run() {
  // TEST 1: Class 12 Accountancy Ch 6 - Issue and Redemption of Debentures
  console.log('--- TEST 1: Class 12 Accountancy Ch 6 (Issue and Redemption of Debentures) ---');
  const debConcept: CurriculumConcept = {
    id: 'AUTH-CBSE-G12-ACC-CH06-CORE',
    boardId: 'CBSE',
    subjectId: 'ACCOUNTANCY',
    gradeLevel: 12,
    title: 'Issue and Redemption of Debentures',
    coreLogicEssence: 'Statutory CBSE Class 12 NCERT curriculum concept covering foundational rules for Issue and Redemption of Debentures.',
    unit: 'Accounting for Partnership Firms & Analysis Chapter 6',
    parentNodeId: null
  };
  const debNotes = await getContentForTopic(debConcept, 'CBSE');
  const debStr = JSON.stringify(debNotes);
  
  console.log(`[Debentures] Essential Law: ${debNotes.structuralRule}`);
  console.log(`[Debentures] First Concept Heading: ${debNotes.mainNotes.split('\n')[0]}`);
  console.log(`[Debentures] Verification Problem: ${debNotes.verificationProblem}`);
  console.log(`[Debentures] Quick Mental Check / Trap: ${debNotes.curriculumTrap.split('\n')[1]}`);

  assert(debStr.includes('DRR') && debStr.includes('DRI'), 'Debentures contains DRR (10%) and DRI (15%) statutory invariants');
  assert(debStr.includes('Loss on Issue') || debStr.includes('Premium on Redemption'), 'Debentures contains Loss on Issue / Premium on Redemption entries');
  assert(!debStr.includes('Debit (Assets / Expenses Increase) = Credit (Liabilities / Capital'), 'ZERO generic fallback boilerplate in Debentures');

  // TEST 2: Class 7 Mathematics Ch 2 - Fractions and Decimals
  console.log('\n--- TEST 2: Class 7 Mathematics Ch 2 (Fractions and Decimals) ---');
  const fracConcept: CurriculumConcept = {
    id: 'CBSE-CBSE-CH-G7-MATH-CH02',
    boardId: 'CBSE',
    subjectId: 'MATH',
    gradeLevel: 7,
    title: 'Fractions and Decimals',
    coreLogicEssence: 'Authoritative statutory concept covering Fractions and Decimals under official CBSE curriculum standards.',
    unit: 'Mathematics - Textbook for Class VII Chapter 2',
    parentNodeId: null
  };
  const fracNotes = await getContentForTopic(fracConcept, 'CBSE');
  const fracStr = JSON.stringify(fracNotes);

  console.log(`[Fractions & Decimals] Essential Law: ${fracNotes.structuralRule}`);
  console.log(`[Fractions & Decimals] First Concept Heading: ${fracNotes.mainNotes.split('\n')[0]}`);
  console.log(`[Fractions & Decimals] Verification Problem: ${fracNotes.verificationProblem}`);
  console.log(`[Fractions & Decimals] Trap: ${fracNotes.curriculumTrap.split('\n')[1]}`);

  assert(fracStr.includes('Reciprocal') || fracStr.includes('Multiplication of Fractions'), 'Fractions and Decimals contains authentic Multiplication / Division / Reciprocal concepts');
  assert(fracStr.includes('Decimal Numbers') || fracStr.includes('Shift'), 'Fractions and Decimals contains Decimal operations');
  assert(!fracStr.includes('Density of Rational Numbers') && !fracStr.includes('slicing a pizza') && !fracStr.includes('5/12'), 'ZERO Rational Numbers duplication/caching leak in Fractions & Decimals');

  // TEST 3: Class 11 Chemistry Ch 1 - Some Basic Concepts of Chemistry
  console.log('\n--- TEST 3: Class 11 Chemistry Ch 1 (Some Basic Concepts of Chemistry) ---');
  const chemConcept: CurriculumConcept = {
    id: 'NCERT-G11-kech1-CH01',
    boardId: 'CBSE',
    subjectId: 'CHEMISTRY',
    gradeLevel: 11,
    title: 'Some Basic Concepts of Chemistry',
    coreLogicEssence: 'Statutory CBSE Class 11 NCERT curriculum concept covering foundational rules, physical intuition, and step-by-step methodology for Some Basic Concepts of Chemistry.',
    unit: 'Chemistry Chapter 1',
    parentNodeId: null
  };
  const chemNotes = await getContentForTopic(chemConcept, 'CBSE');
  const chemStr = JSON.stringify(chemNotes);
  assert(chemStr.includes('Mole Concept') || chemStr.includes('Molarity'), 'Class 11 Chem Ch 1 has Mole Concept / Molarity');
  assert(!chemStr.includes('see-saw') && !chemStr.includes('pH = -log'), 'ZERO pH / Acid-Base leakage in Class 11 Chem Ch 1');

  console.log('\n================================================================================');
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  if (failed === 0) {
    console.log('🎉 ALL IMAGE BUGS FULLY RESOLVED WITH AUTHENTIC DETERMINISTIC KNOWLEDGE!');
  } else {
    console.error('❌ SOME TESTS FAILED');
  }
  console.log('================================================================================');
}

run();
