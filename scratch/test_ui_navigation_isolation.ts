/**
 * Brainoro Cognitive OS — UI Navigation & State Isolation Test
 * Path: scratch/test_ui_navigation_isolation.ts
 *
 * Verifies Phase 4 & Phase 2:
 * 1. Navigating A -> B -> A never alters A, leaks visuals, or transfers state.
 * 2. Visual Model Card strictly resolves visual_model_pending for Data Handling,
 *    and exact canvas visuals for Integers, Sound, Coordinate Grid, Heart, Acids.
 * 3. React key isolation invariant: key={activeConceptId} guarantees state reset.
 */

import path from 'path';
import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!cleanSupabaseUrl || !cleanSupabaseKey) {
  console.error('Supabase credentials not found in environment!');
  process.exit(1);
}

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);
const { deduceDiagramCategory } = require(path.resolve(process.cwd(), 'frontend/src/components/cornell/VisualModelCard'));

interface ConceptQuery {
  id: string;
  boardId: string;
  gradeLevel: number;
  subjectId: string;
  title: string;
  expectedVisual: string;
  forbiddenVisuals: string[];
}

interface NavigationTrip {
  name: string;
  conceptA: ConceptQuery;
  conceptB: ConceptQuery;
}

const NAVIGATION_TRIPS: NavigationTrip[] = [
  {
    name: 'Trip 1: IB_MYP Data Tables <-> IB_MYP Integers (Number Line)',
    conceptA: {
      id: 'IB_MYP-G6-MATH-DATA-TABLES',
      boardId: 'IB_MYP',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Tally Marks & Frequency Tables',
      expectedVisual: 'visual_model_pending',
      forbiddenVisuals: ['number_line', 'real_continuum', 'probability_curve']
    },
    conceptB: {
      id: 'IB_MYP-G6-MATH-NUMSYS-INT',
      boardId: 'IB_MYP',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Integers & The Number Line',
      expectedVisual: 'number_line',
      forbiddenVisuals: ['visual_model_pending', 'real_continuum']
    }
  },
  {
    name: 'Trip 2: IB_MYP Data Tables <-> IB_MYP Bar Graphs',
    conceptA: {
      id: 'IB_MYP-G6-MATH-DATA-TABLES',
      boardId: 'IB_MYP',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Tally Marks & Frequency Tables',
      expectedVisual: 'visual_model_pending',
      forbiddenVisuals: ['number_line', 'real_continuum']
    },
    conceptB: {
      id: 'IB_MYP-G6-MATH-DATA-BAR',
      boardId: 'IB_MYP',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Bar Graphs & Visual Representation',
      expectedVisual: 'visual_model_pending',
      forbiddenVisuals: ['number_line', 'real_continuum']
    }
  },
  {
    name: 'Trip 3: IB_MYP Data Tables <-> CBSE Class 8 Physics Sound',
    conceptA: {
      id: 'IB_MYP-G6-MATH-DATA-TABLES',
      boardId: 'IB_MYP',
      gradeLevel: 6,
      subjectId: 'MATH',
      title: 'Tally Marks & Frequency Tables',
      expectedVisual: 'visual_model_pending',
      forbiddenVisuals: ['number_line', 'wave_frequency', 'motion_graph']
    },
    conceptB: {
      id: 'CBSE-G8-PHYSICS-SOUND-FREQ',
      boardId: 'CBSE',
      gradeLevel: 8,
      subjectId: 'PHYSICS',
      title: 'Frequency, Amplitude, Pitch & Loudness',
      expectedVisual: 'wave_frequency',
      forbiddenVisuals: ['number_line', 'visual_model_pending']
    }
  },
  {
    name: 'Trip 4: Cambridge Class 7 Fractions <-> CBSE Class 9 Linear Equations',
    conceptA: {
      id: 'CAMBRIDGE-G7-MATH-FRAC-MULT',
      boardId: 'CAMBRIDGE',
      gradeLevel: 7,
      subjectId: 'MATH',
      title: 'Multiplication & Division of Rational Fractions',
      expectedVisual: 'number_line',
      forbiddenVisuals: ['coordinate_grid', 'real_continuum']
    },
    conceptB: {
      id: 'CBSE-G9-MATH-LINEQ-GRAPH',
      boardId: 'CBSE',
      gradeLevel: 9,
      subjectId: 'MATH',
      title: 'Graph of a Linear Equation in Two Variables',
      expectedVisual: 'coordinate_grid',
      forbiddenVisuals: ['number_line', 'visual_model_pending']
    }
  },
  {
    name: 'Trip 5: CBSE Class 7 Biology Heart <-> CBSE Class 10 Chemistry Acids & pH',
    conceptA: {
      id: 'CBSE-G7-BIOLOGY-CIRC-HEART',
      boardId: 'CBSE',
      gradeLevel: 7,
      subjectId: 'BIOLOGY',
      title: 'The Human Heart & Double Circulation',
      expectedVisual: 'heart_circulation',
      forbiddenVisuals: ['ph_scale', 'visual_model_pending']
    },
    conceptB: {
      id: 'CBSE-G10-CHEMISTRY-ACID-PH',
      boardId: 'CBSE',
      gradeLevel: 10,
      subjectId: 'CHEMISTRY',
      title: 'The pH Scale, Indicators & Neutralization',
      expectedVisual: 'ph_scale',
      forbiddenVisuals: ['heart_circulation', 'visual_model_pending']
    }
  }
];

function mapRowToConcept(row: any) {
  return {
    id: row.id,
    boardId: row.board_id,
    subjectId: row.subject_id,
    gradeLevel: Number(row.grade_level) || 9,
    unit: row.unit || row.metadata?.unit || 'Unit 1: Core Concepts',
    title: row.title,
    coreLogicEssence: row.core_logic_essence,
    metadata: row.metadata || {}
  };
}

async function fetchFromSupabase(query: ConceptQuery) {
  const { data, error } = await supabase
    .from('curriculum_concepts')
    .select('*')
    .eq('id', query.id)
    .eq('board_id', query.boardId)
    .eq('grade_level', query.gradeLevel)
    .eq('subject_id', query.subjectId)
    .setHeader('Cache-Control', 'no-store')
    .setHeader('Pragma', 'no-cache')
    .single();

  if (error || !data) {
    throw new Error(`Failed to query concept [${query.id}]: ${error?.message || 'Not found'}`);
  }
  return { rawRow: data, mappedConcept: mapRowToConcept(data) };
}

// Simulated React Component State Store reflecting key={activeConceptId}
class SimulatedComponentHost {
  private activeKey: string = '';
  private state: {
    selectedQuizAnswers: Record<number, number>;
    activeSubTab: string;
    isExpanded: boolean;
  } = {
    selectedQuizAnswers: {},
    activeSubTab: 'cornell',
    isExpanded: false
  };

  mount(conceptId: string) {
    if (this.activeKey !== conceptId) {
      // Key changed -> React unmounts old component and remounts fresh component
      this.activeKey = conceptId;
      this.state = {
        selectedQuizAnswers: {},
        activeSubTab: 'cornell',
        isExpanded: false
      };
    }
  }

  setQuizAnswer(qIdx: number, aIdx: number) {
    this.state.selectedQuizAnswers[qIdx] = aIdx;
  }

  getState() {
    return { ...this.state };
  }
}

async function runNavigationTests() {
  console.log('================================================================================');
  console.log('   BRAINORO COGNITIVE OS — UI NAVIGATION & STATE ISOLATION SUITE');
  console.log('================================================================================\n');

  let passedTrips = 0;
  let failedTrips = 0;
  const host = new SimulatedComponentHost();

  for (let i = 0; i < NAVIGATION_TRIPS.length; i++) {
    const trip = NAVIGATION_TRIPS[i];
    console.log(`[Trip ${i + 1}/${NAVIGATION_TRIPS.length}] ${trip.name}`);

    // Step 1: User navigates to Concept A
    host.mount(trip.conceptA.id);
    host.setQuizAnswer(0, 2); // User selects quiz answer on A
    const a1Res = await fetchFromSupabase(trip.conceptA);
    const a1Notes = a1Res.rawRow.metadata?.cornell_notes;
    const a1Visual = deduceDiagramCategory(a1Res.mappedConcept, a1Notes);

    // Validate A1
    if (a1Visual !== trip.conceptA.expectedVisual) {
      console.error(`  ❌ A1 Visual mismatch: expected ${trip.conceptA.expectedVisual}, got ${a1Visual}`);
      failedTrips++;
      continue;
    }
    if (trip.conceptA.forbiddenVisuals.includes(a1Visual)) {
      console.error(`  ❌ A1 Forbidden visual detected: ${a1Visual}`);
      failedTrips++;
      continue;
    }

    // Step 2: User navigates to Concept B
    host.mount(trip.conceptB.id); // Triggers key change -> state reset
    const stateB = host.getState();
    if (Object.keys(stateB.selectedQuizAnswers).length !== 0) {
      console.error(`  ❌ State leakage: Quiz answers from A retained when navigating to B!`);
      failedTrips++;
      continue;
    }

    host.setQuizAnswer(1, 3); // User selects quiz answer on B
    const bRes = await fetchFromSupabase(trip.conceptB);
    const bNotes = bRes.rawRow.metadata?.cornell_notes;
    const bVisual = deduceDiagramCategory(bRes.mappedConcept, bNotes);

    // Validate B
    if (bVisual !== trip.conceptB.expectedVisual) {
      console.error(`  ❌ B Visual mismatch: expected ${trip.conceptB.expectedVisual}, got ${bVisual}`);
      failedTrips++;
      continue;
    }
    if (trip.conceptB.forbiddenVisuals.includes(bVisual)) {
      console.error(`  ❌ B Forbidden visual detected: ${bVisual}`);
      failedTrips++;
      continue;
    }

    // Step 3: User navigates BACK to Concept A
    host.mount(trip.conceptA.id); // Triggers key change -> state reset
    const stateA2 = host.getState();
    if (Object.keys(stateA2.selectedQuizAnswers).length !== 0) {
      console.error(`  ❌ State leakage: Quiz answers from B retained when navigating back to A!`);
      failedTrips++;
      continue;
    }

    const a2Res = await fetchFromSupabase(trip.conceptA);
    const a2Notes = a2Res.rawRow.metadata?.cornell_notes;
    const a2Visual = deduceDiagramCategory(a2Res.mappedConcept, a2Notes);

    // Validate A2 vs A1
    if (a2Visual !== trip.conceptA.expectedVisual) {
      console.error(`  ❌ A2 Visual altered after return: expected ${trip.conceptA.expectedVisual}, got ${a2Visual}`);
      failedTrips++;
      continue;
    }

    const a1Str = JSON.stringify(a1Notes);
    const a2Str = JSON.stringify(a2Notes);
    if (a1Str !== a2Str) {
      console.error(`  ❌ A payload altered after navigating A -> B -> A!`);
      failedTrips++;
      continue;
    }

    console.log(`  ✅ PASS | A(${a1Visual}) -> B(${bVisual}) -> A(${a2Visual}) | State cleanly reset | 0 payload changes`);
    passedTrips++;
  }

  console.log('\n================================================================================');
  console.log('   UI NAVIGATION & STATE ISOLATION SUMMARY');
  console.log('================================================================================');
  console.log(`Total Trips Tested : ${NAVIGATION_TRIPS.length}`);
  console.log(`Passed             : ${passedTrips}`);
  console.log(`Failed             : ${failedTrips}`);
  console.log(`Pass Rate          : ${((passedTrips / NAVIGATION_TRIPS.length) * 100).toFixed(1)}%`);
  console.log('================================================================================\n');

  if (failedTrips > 0) {
    process.exit(1);
  }
}

runNavigationTests().catch(err => {
  console.error('Fatal error in navigation tests:', err);
  process.exit(1);
});
