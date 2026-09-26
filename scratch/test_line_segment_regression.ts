import { getContentForTopic, generateCBSEExamTrapsAndMarkingPatterns } from '../frontend/src/lib/services/contentService';
import { validateDiagramMapping } from '../frontend/src/components/cornell/VisualModelCard';
import { CurriculumConcept, CornellNotes } from '../frontend/src/lib/types';

interface Check {
  name: string;
  passed: boolean;
  details: string;
}

const checks: Check[] = [];

function assert(name: string, condition: boolean, details: string) {
  checks.push({ name, passed: condition, details });
  const status = condition ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${name} - ${details}`);
}

async function runRegressionSuite() {
  console.log('================================================================');
  console.log('  BRAINORO - GANITA PRAKASH CH02 LINE SEGMENT AUDIT & REGRESSION');
  console.log('================================================================\n');

  // 1. Authoritative Line Segment Concept Definition
  const lineSegmentConcept: CurriculumConcept = {
    id: 'AUTH-CBSE-G6-MATH-CH02-LINE-SEGMENT',
    boardId: 'CBSE',
    gradeLevel: 6,
    subjectId: 'MATHEMATICS',
    unit: 'Lines and Angles',
    title: 'Line Segment',
    type: 'core',
    difficulty: 1,
    prerequisites: ['AUTH-CBSE-G6-MATH-CH02-POINT'],
    metadata: {
      source_locator: 'NCERT Ganita Prakash Class VI Chapter 2 Section 2.2',
      chapter_id: 'CH-NCERT-G6-MATH-2024-02',
      section_id: 'SEC-NCERT-G6-MATH-2024-02-02',
      curriculum_version_id: 'CBSE-NCERT-2024-NCF-SE',
    },
  };

  console.log('--- 1. Testing getContentForTopic for Line Segment ---');
  let notes: CornellNotes | null = null;
  try {
    notes = await getContentForTopic(lineSegmentConcept);
    assert('Fetch Content', notes !== null, 'Successfully retrieved notes for AUTH-CBSE-G6-MATH-CH02-LINE-SEGMENT');
  } catch (err: any) {
    assert('Fetch Content', false, `Failed to load notes: ${err.message}`);
  }

  if (notes) {
    const rawNotesJson = JSON.stringify(notes);

    // Negative tests: verify absence of arithmetic/algebraic contamination
    assert(
      'Zero BODMAS Contamination',
      !rawNotesJson.toUpperCase().includes('BODMAS') && !rawNotesJson.toUpperCase().includes('PEMDAS'),
      'Neither BODMAS nor PEMDAS appears in Line Segment content payload'
    );

    assert(
      'Zero Equation Balance Contamination',
      !rawNotesJson.includes('x + a = b') &&
      !rawNotesJson.includes('x = b - a') &&
      !rawNotesJson.includes('LHS \\equiv RHS') &&
      !rawNotesJson.includes('balancing both sides'),
      'No algebraic transposition or equation balance rules appear in Line Segment'
    );

    assert(
      'Zero Variable Isolation Contamination',
      !rawNotesJson.includes('isolate variable') && !rawNotesJson.includes('transposition of terms'),
      'No variable isolation appears in Line Segment'
    );

    assert(
      'Zero Negative Number Contamination',
      !rawNotesJson.includes('subtracting a negative') && !rawNotesJson.includes('negative sign inversion'),
      'No negative number arithmetic rules appear in Line Segment'
    );

    // Positive tests: verify presence of authentic NCERT Ganita Prakash 2.2 content
    assert(
      'Authentic Structural Rule (Endpoints & Finite Length)',
      notes.structuralRule.includes('\\overline{AB}') &&
      notes.structuralRule.includes('2 \\text{ Endpoints }') &&
      notes.structuralRule.includes('Finite and Measurable'),
      `structuralRule matches NCERT definition: ${notes.structuralRule}`
    );

    assert(
      'Authentic Real-World Intuition Analogy',
      notes.coreAnalogy.toLowerCase().includes('stretched string') &&
      notes.coreAnalogy.includes('A and B'),
      `coreAnalogy references stretched string intuition: ${notes.coreAnalogy}`
    );

    assert(
      'Authentic Measurement Verification Problem',
      notes.verificationProblem.includes('ruler') &&
      notes.verificationProblem.includes('damaged zero-mark'),
      `verificationProblem tests ruler zero-mark measurement: ${notes.verificationProblem}`
    );

    assert(
      'Authentic CBSE Traps Generated',
      notes.curriculumTrap.includes('endpoints') ||
      notes.curriculumTrap.includes('ruler') ||
      notes.curriculumTrap.includes('segment'),
      'curriculumTrap contains authentic basic geometry pitfalls'
    );

    assert(
      'Diagram Category Is visual_model_pending (Not coordinate_grid)',
      notes.diagramType === 'visual_model_pending',
      `diagramType is '${notes.diagramType}' preventing incorrect Cartesian locus render`
    );
  }

  // 2. Testing Other Chapter 2 Concepts (Point, Ray, Line, Angle)
  console.log('\n--- 2. Testing Other Ganita Prakash Chapter 2 Concepts ---');

  const pointConcept: CurriculumConcept = {
    ...lineSegmentConcept,
    id: 'AUTH-CBSE-G6-MATH-CH02-POINT',
    title: 'Point',
    prerequisites: [],
    metadata: {
      ...lineSegmentConcept.metadata,
      source_locator: 'NCERT Ganita Prakash Class VI Chapter 2 Section 2.1',
      section_id: 'SEC-NCERT-G6-MATH-2024-02-01',
    },
  };

  const lineConcept: CurriculumConcept = {
    ...lineSegmentConcept,
    id: 'AUTH-CBSE-G6-MATH-CH02-LINE',
    title: 'Line',
    prerequisites: ['AUTH-CBSE-G6-MATH-CH02-POINT'],
    metadata: {
      ...lineSegmentConcept.metadata,
      source_locator: 'NCERT Ganita Prakash Class VI Chapter 2 Section 2.3',
      section_id: 'SEC-NCERT-G6-MATH-2024-02-03',
    },
  };

  const rayConcept: CurriculumConcept = {
    ...lineSegmentConcept,
    id: 'AUTH-CBSE-G6-MATH-CH02-RAY',
    title: 'Ray',
    prerequisites: ['AUTH-CBSE-G6-MATH-CH02-POINT'],
    metadata: {
      ...lineSegmentConcept.metadata,
      source_locator: 'NCERT Ganita Prakash Class VI Chapter 2 Section 2.4',
      section_id: 'SEC-NCERT-G6-MATH-2024-02-04',
    },
  };

  const angleConcept: CurriculumConcept = {
    ...lineSegmentConcept,
    id: 'AUTH-CBSE-G6-MATH-CH02-ANGLE',
    title: 'Angle',
    prerequisites: ['AUTH-CBSE-G6-MATH-CH02-RAY'],
    metadata: {
      ...lineSegmentConcept.metadata,
      source_locator: 'NCERT Ganita Prakash Class VI Chapter 2 Section 2.5',
      section_id: 'SEC-NCERT-G6-MATH-2024-02-05',
    },
  };

  const pointNotes = await getContentForTopic(pointConcept);
  assert(
    'Point: 0 Dimensions & Exact Location',
    pointNotes.structuralRule.includes('Dimension} = 0') && pointNotes.coreAnalogy.includes('needle'),
    'Point has 0 dimensions and tip-of-needle analogy'
  );

  const lineNotes = await getContentForTopic(lineConcept);
  assert(
    'Line: 0 Endpoints & Infinite Both Directions',
    lineNotes.structuralRule.includes('\\overleftrightarrow{AB}') && lineNotes.structuralRule.includes('0 \\text{ Endpoints}'),
    'Line has 0 endpoints and notation \\overleftrightarrow{AB}'
  );

  const rayNotes = await getContentForTopic(rayConcept);
  assert(
    'Ray: 1 Endpoint & Directional Asymmetry',
    rayNotes.structuralRule.includes('\\overrightarrow{AB}') && rayNotes.structuralRule.includes('1 \\text{ Fixed Endpoint'),
    'Ray has 1 fixed endpoint and notation \\overrightarrow{AB}'
  );

  const angleNotes = await getContentForTopic(angleConcept);
  assert(
    'Angle: 2 Rays & Vertex',
    angleNotes.structuralRule.includes('\\angle ABC') && angleNotes.structuralRule.includes('Vertex } B'),
    'Angle has 2 rays meeting at vertex'
  );

  // 3. Diagram Validation Gate: Coordinate Grid Rejected for Middle School Geometry
  console.log('\n--- 3. Testing Visual Model Routing ---');
  const allowsCoordOnSegment = validateDiagramMapping('coordinate_grid', lineSegmentConcept);
  assert(
    'VisualModelCard Rejects coordinate_grid for Middle School Line Segment',
    allowsCoordOnSegment === false,
    'coordinate_grid correctly returns false for Class 6 Line Segment'
  );

  const allowsCoordOnRay = validateDiagramMapping('coordinate_grid', rayConcept);
  assert(
    'VisualModelCard Rejects coordinate_grid for Middle School Ray',
    allowsCoordOnRay === false,
    'coordinate_grid correctly returns false for Class 6 Ray'
  );

  // 4. Stale-State Navigation Integrity (A -> B -> C -> A)
  console.log('\n--- 4. Testing Navigation Sequence & Identity Integrity ---');
  const seq1 = await getContentForTopic(lineSegmentConcept);
  const seq2 = await getContentForTopic(pointConcept);
  const seq3 = await getContentForTopic(lineConcept);
  const seq4 = await getContentForTopic(lineSegmentConcept);

  assert(
    'A -> B -> C -> A Navigation Consistency',
    seq1.conceptId === seq4.conceptId &&
    seq4.title === 'Line Segment' &&
    seq4.structuralRule.includes('\\overline{AB}') &&
    seq2.title === 'Point' &&
    seq3.title === 'Line',
    'Navigation sequence preserves exact concept identity and does not leak cross-concept state'
  );

  // 5. Fail-Closed Boundaries
  console.log('\n--- 5. Testing Fail-Closed Pedagogical Guards ---');
  const invalidConcept: CurriculumConcept = {
    ...lineSegmentConcept,
    id: 'AUTH-CBSE-G6-MATH-CH99-NONEXISTENT',
    title: 'Nonexistent Concept',
  };

  let threwPending = false;
  try {
    await getContentForTopic(invalidConcept);
  } catch (err: any) {
    threwPending = err.message.includes('Curriculum Alignment Pending');
  }
  assert(
    'Unmapped Concept Fails Closed',
    threwPending,
    'Unmapped authoritative concept throws Curriculum Alignment Pending error'
  );

  // Summary
  console.log('\n================================================================');
  console.log('  REGRESSION SCORECARD');
  console.log('================================================================');
  const total = checks.length;
  const passed = checks.filter((c) => c.passed).length;
  const failed = checks.filter((c) => !c.passed).length;
  console.log(`Total Rules Evaluated: ${total}`);
  console.log(`Passed:                ${passed}`);
  console.log(`Failed:                ${failed}`);
  console.log(`Score:                 ${((passed / total) * 100).toFixed(1)}%`);

  if (failed > 0) {
    process.exit(1);
  }
}

runRegressionSuite().catch((err) => {
  console.error('Fatal error in regression suite:', err);
  process.exit(1);
});
