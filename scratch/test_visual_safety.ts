/**
 * Brainoro Cognitive OS — Visual Safety Test
 * Path: scratch/test_visual_safety.ts
 *
 * Verifies that:
 * 1. Tally Marks & Frequency Tables NEVER map to number_line or other generic visuals
 * 2. Probability NEVER maps to unrelated algebra or number lines
 * 3. Integers & Fractions MAY map to number_line
 * 4. Missing/unverified visuals strictly map to visual_model_pending
 */

import path from 'path';

const { deduceDiagramCategory, validateDiagramMapping } = require(path.resolve(process.cwd(), 'frontend/src/components/cornell/VisualModelCard'));

interface VisualTestCase {
  name: string;
  concept: {
    id: string;
    boardId: string;
    gradeLevel: number;
    subjectId: string;
    title: string;
    unit?: string;
    coreLogicEssence?: string;
    metadata?: any;
  };
  notes?: any;
  expectedDiagram: string;
  forbiddenDiagrams: string[];
}

const TEST_CASES: VisualTestCase[] = [
  // 1. Tally Marks & Frequency Tables
  {
    name: 'IB_MYP Tally Tables (No Notes)',
    concept: {
      id: 'IB_MYP-G6-MATH-DATA-TABLES',
      boardId: 'IB_MYP',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Tally Marks & Frequency Tables',
      unit: 'Data Handling',
      coreLogicEssence: 'Organizing raw categorical and numerical observations using five-bar tally clusters.'
    },
    expectedDiagram: 'visual_model_pending',
    forbiddenDiagrams: ['number_line', 'real_continuum', 'probability_curve', 'coordinate_grid']
  },
  {
    name: 'CBSE Tally Tables with contaminated number_line in notes',
    concept: {
      id: 'CBSE-G6-MATH-DATA-TABLES',
      boardId: 'CBSE',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Tally Marks & Frequency Tables',
      unit: 'Data Handling'
    },
    notes: {
      diagramType: 'number_line' // Simulating stale cache injection
    },
    expectedDiagram: 'visual_model_pending', // Must quarantine and override!
    forbiddenDiagrams: ['number_line']
  },
  // 2. Bar Charts
  {
    name: 'CBSE Bar Graphs',
    concept: {
      id: 'CBSE-G6-MATH-DATA-BAR',
      boardId: 'CBSE',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Bar Graphs & Visual Representation',
      unit: 'Data Handling'
    },
    expectedDiagram: 'visual_model_pending',
    forbiddenDiagrams: ['number_line', 'probability_curve']
  },
  // 3. Elementary Probability
  {
    name: 'IB_MYP Likelihood & Elementary Chance',
    concept: {
      id: 'IB_MYP-G6-MATH-DATA-PROB',
      boardId: 'IB_MYP',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Likelihood & Elementary Chance',
      unit: 'Data Handling'
    },
    expectedDiagram: 'visual_model_pending',
    forbiddenDiagrams: ['number_line', 'coordinate_grid', 'parabola']
  },
  // 4. Integers & Number Line (Valid Number Line)
  {
    name: 'CBSE Integers & The Number Line',
    concept: {
      id: 'CBSE-G6-MATH-NUMSYS-INT',
      boardId: 'CBSE',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Integers & The Number Line',
      unit: 'Number Systems'
    },
    expectedDiagram: 'number_line',
    forbiddenDiagrams: ['visual_model_pending', 'probability_curve', 'ray_optics']
  },
  // 5. Fractions (Valid Number Line)
  {
    name: 'CAMBRIDGE Multiplication & Division of Fractions',
    concept: {
      id: 'CAMBRIDGE-G7-MATH-FRAC-MULT',
      boardId: 'CAMBRIDGE',
      gradeLevel: 7,
      subjectId: 'MATH',
      title: 'Multiplication & Division of Rational Fractions',
      unit: 'Fractions'
    },
    expectedDiagram: 'number_line',
    forbiddenDiagrams: ['visual_model_pending', 'ray_optics']
  },
  // 6. Nuclear Physics (Must NOT fall back to wave or heat)
  {
    name: 'CBSE Nuclear Fission',
    concept: {
      id: 'CBSE-G10-PHYSICS-ENG-NUCLEAR',
      boardId: 'CBSE',
      gradeLevel: 10,
      subjectId: 'PHYSICS',
      title: 'Nuclear Fission & Binding Energy Release',
      unit: 'Sources of Energy'
    },
    notes: {
      diagramType: 'energy_transfer' // Old invalid assignment
    },
    expectedDiagram: 'visual_model_pending',
    forbiddenDiagrams: ['wave_frequency', 'ray_optics', 'energy_transfer']
  },
  // 7. Human Heart & Circulation
  {
    name: 'CBSE Human Heart & Circulation',
    concept: {
      id: 'CBSE-G7-BIOLOGY-CIRC-HEART',
      boardId: 'CBSE',
      gradeLevel: 7,
      subjectId: 'BIOLOGY',
      title: 'The Human Heart & Double Circulation',
      unit: 'Transportation in Animals & Plants'
    },
    expectedDiagram: 'heart_circulation',
    forbiddenDiagrams: ['number_line', 'circuit_diagram', 'visual_model_pending']
  }
];

function runVisualSafetyTests() {
  console.log('================================================================================');
  console.log('   BRAINORO COGNITIVE OS — VISUAL MODEL SAFETY GATE');
  console.log('================================================================================\n');

  let passedCount = 0;
  let failedCount = 0;

  for (const test of TEST_CASES) {
    const deduced = deduceDiagramCategory(test.concept, test.notes);
    const matchesExpected = deduced === test.expectedDiagram;
    const hasForbidden = test.forbiddenDiagrams.includes(deduced);

    const passed = matchesExpected && !hasForbidden;

    if (passed) {
      console.log(`✅ PASS | ${test.name}`);
      console.log(`         Deduced: ${deduced} (Expected: ${test.expectedDiagram})`);
      passedCount++;
    } else {
      console.error(`❌ FAIL | ${test.name}`);
      console.error(`         Deduced: ${deduced} (Expected: ${test.expectedDiagram}, Forbidden: [${test.forbiddenDiagrams.join(', ')}])`);
      failedCount++;
    }
  }

  console.log('\n================================================================================');
  console.log('   VISUAL SAFETY TEST SUMMARY');
  console.log('================================================================================');
  console.log(`Total Visual Tests : ${TEST_CASES.length}`);
  console.log(`Passed             : ${passedCount}`);
  console.log(`Failed             : ${failedCount}`);
  console.log(`Pass Rate          : ${((passedCount / TEST_CASES.length) * 100).toFixed(1)}%`);
  console.log('================================================================================\n');

  if (failedCount > 0) {
    process.exit(1);
  }
}

runVisualSafetyTests();
