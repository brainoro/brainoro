/**
 * Brainoro Cognitive OS — Pairwise Deterministic Isolation Test
 * Path: scratch/test_pairwise_isolation.ts
 *
 * Verifies that loading A -> B -> A never alters A or contaminates B.
 */

import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

interface ConceptDef {
  id: string;
  board_id: string;
  grade_level: number;
  subject_id: string;
  title: string;
}

const TEST_PAIRS: [ConceptDef, ConceptDef][] = [
  // Pair 1: IB_MYP Class 6 Math - Tally Tables vs Bar Charts
  [
    { id: 'IB_MYP-G6-MATH-DATA-TABLES', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Tally Marks & Frequency Tables' },
    { id: 'IB_MYP-G6-MATH-DATA-BAR', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Bar Graphs & Visual Representation' }
  ],
  // Pair 2: IB_MYP Class 6 Math - Tally Tables vs Probability
  [
    { id: 'IB_MYP-G6-MATH-DATA-TABLES', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Tally Marks & Frequency Tables' },
    { id: 'IB_MYP-G6-MATH-DATA-PROB', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Likelihood & Elementary Chance' }
  ],
  // Pair 3: IB_MYP Class 6 Math - Tally Tables vs Integers
  [
    { id: 'IB_MYP-G6-MATH-DATA-TABLES', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Tally Marks & Frequency Tables' },
    { id: 'IB_MYP-G6-MATH-NUMSYS-INT', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Integers & The Number Line' }
  ],
  // Pair 4: IB_MYP Class 6 Math - Tally Tables vs Fractions
  [
    { id: 'IB_MYP-G6-MATH-DATA-TABLES', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Tally Marks & Frequency Tables' },
    { id: 'IB_MYP-G6-MATH-NUMSYS-FRAC', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Fractions, Decimals & Equivalence' }
  ],
  // Pair 5: Cross-Board - CBSE Tally vs CAMBRIDGE Tally
  [
    { id: 'CBSE-G6-MATH-DATA-TABLES', board_id: 'CBSE', grade_level: 6, subject_id: 'MATH', title: 'Tally Marks & Frequency Tables' },
    { id: 'CAMBRIDGE-G6-MATH-DATA-TABLES', board_id: 'CAMBRIDGE', grade_level: 6, subject_id: 'MATH', title: 'Tally Marks & Frequency Tables' }
  ],
  // Pair 6: Cross-Board - CBSE Tally vs IB_MYP Tally
  [
    { id: 'CBSE-G6-MATH-DATA-TABLES', board_id: 'CBSE', grade_level: 6, subject_id: 'MATH', title: 'Tally Marks & Frequency Tables' },
    { id: 'IB_MYP-G6-MATH-DATA-TABLES', board_id: 'IB_MYP', grade_level: 6, subject_id: 'MATH', title: 'Tally Marks & Frequency Tables' }
  ],
  // Pair 7: Grade 7 Math - Ratio vs Fractions
  [
    { id: 'CBSE-G7-MATH-INT-MULT', board_id: 'CBSE', grade_level: 7, subject_id: 'MATH', title: 'Multiplication & Division of Signed Integers' },
    { id: 'CAMBRIDGE-G7-MATH-FRAC-MULT', board_id: 'CAMBRIDGE', grade_level: 7, subject_id: 'MATH', title: 'Multiplication & Division of Rational Fractions' }
  ],
  // Pair 8: Grade 8 Physics Sound vs Grade 7 Biology Heart
  [
    { id: 'CBSE-G8-PHYSICS-SOUND-FREQ', board_id: 'CBSE', grade_level: 8, subject_id: 'PHYSICS', title: 'Frequency, Amplitude, Pitch & Loudness' },
    { id: 'CBSE-G7-BIOLOGY-CIRC-HEART', board_id: 'CBSE', grade_level: 7, subject_id: 'BIOLOGY', title: 'The Human Heart & Double Circulation' }
  ]
];

async function loadConcept(c: ConceptDef) {
  const { data, error } = await supabase
    .from('curriculum_concepts')
    .select('*')
    .eq('id', c.id)
    .eq('board_id', c.board_id)
    .eq('grade_level', c.grade_level)
    .eq('subject_id', c.subject_id)
    .setHeader('Cache-Control', 'no-store')
    .setHeader('Pragma', 'no-cache')
    .single();

  if (error || !data) {
    throw new Error(`Failed to load ${c.id}: ${error?.message || 'Not found'}`);
  }
  return data;
}

async function runPairwiseTests() {
  console.log('================================================================================');
  console.log('   BRAINORO COGNITIVE OS — PAIRWISE DETERMINISTIC ISOLATION TESTS');
  console.log('================================================================================\n');

  let passedPairs = 0;
  let failedPairs = 0;

  for (let i = 0; i < TEST_PAIRS.length; i++) {
    const [conceptA, conceptB] = TEST_PAIRS[i];
    console.log(`[Pair ${i + 1}/${TEST_PAIRS.length}] Testing: ${conceptA.id} <--> ${conceptB.id}`);

    // Step 1: Load A
    const a1 = await loadConcept(conceptA);
    const a1PayloadStr = JSON.stringify(a1.metadata?.cornell_notes || {});
    const a1Fingerprint = a1.metadata?.payload_fingerprint;

    // Step 2: Load B
    const b1 = await loadConcept(conceptB);
    const b1PayloadStr = JSON.stringify(b1.metadata?.cornell_notes || {});
    const b1Fingerprint = b1.metadata?.payload_fingerprint;

    // Step 3: Load A again
    const a2 = await loadConcept(conceptA);
    const a2PayloadStr = JSON.stringify(a2.metadata?.cornell_notes || {});
    const a2Fingerprint = a2.metadata?.payload_fingerprint;

    // Step 4: Load B again
    const b2 = await loadConcept(conceptB);
    const b2PayloadStr = JSON.stringify(b2.metadata?.cornell_notes || {});
    const b2Fingerprint = b2.metadata?.payload_fingerprint;

    // Verification 1: A1 === A2
    const aIdentical = a1PayloadStr === a2PayloadStr && a1Fingerprint === a2Fingerprint;
    // Verification 2: B1 === B2
    const bIdentical = b1PayloadStr === b2PayloadStr && b1Fingerprint === b2Fingerprint;
    // Verification 3: A != B (fingerprints and payloads must be distinct)
    const distinct = a1Fingerprint !== b1Fingerprint;

    const pairPassed = aIdentical && bIdentical && distinct;

    if (pairPassed) {
      console.log(`  ✅ PASS | A -> B -> A preserved identically (FPT_A: ${a1Fingerprint}, FPT_B: ${b1Fingerprint})`);
      passedPairs++;
    } else {
      console.error(`  ❌ FAIL | A -> B -> A violation detected!`);
      console.error(`     A identical: ${aIdentical}, B identical: ${bIdentical}, Distinct: ${distinct}`);
      failedPairs++;
    }
  }

  console.log('\n================================================================================');
  console.log('   PAIRWISE ISOLATION TEST SUMMARY');
  console.log('================================================================================');
  console.log(`Total Pairs Tested : ${TEST_PAIRS.length}`);
  console.log(`Passed             : ${passedPairs}`);
  console.log(`Failed             : ${failedPairs}`);
  console.log(`Pass Rate          : ${((passedPairs / TEST_PAIRS.length) * 100).toFixed(1)}%`);
  console.log('================================================================================\n');

  if (failedPairs > 0) {
    process.exit(1);
  }
}

runPairwiseTests().catch(err => {
  console.error('Fatal error in pairwise tests:', err);
  process.exit(1);
});
