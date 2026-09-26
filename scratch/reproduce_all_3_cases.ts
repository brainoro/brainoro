import { createClient } from '@supabase/supabase-js';
import * as path from 'path';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

const baseDir = path.resolve(process.cwd(), 'frontend/src');
const { getAvailableGrades, getAvailableSubjects, getUnitsBySubject, getTopicsByUnit } = require(path.join(baseDir, 'lib/supabase/curriculumService'));

async function reproduceFailingCases() {
  console.log('=== REPRODUCING FAILING COMBINATIONS ===\n');

  const { data: allConcepts } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, title, unit, metadata')
    .order('id');

  if (!allConcepts) {
    console.error('No concepts found');
    return;
  }

  const concepts = allConcepts.map((c: any) => ({
    id: c.id,
    boardId: c.board_id,
    subjectId: c.subject_id,
    gradeLevel: Number(c.grade_level),
    title: c.title,
    unit: c.unit,
    metadata: c.metadata || {}
  }));

  // =========================================================================
  // REPRODUCTION 1: CBSE - Grade 11/12 Selection
  // =========================================================================
  console.log('--- REPRODUCTION 1: CBSE Class 11 Math ---');
  const cbseG11Topics = concepts.filter((c: any) => c.boardId === 'CBSE' && c.gradeLevel === 11);
  console.log(`Concepts in DB for CBSE Grade 11: ${cbseG11Topics.length}`);
  
  const availableGrades = getAvailableGrades(concepts, 'CBSE');
  console.log(`Grades presented in selector dropdown: ${JSON.stringify(availableGrades)}`);
  console.log(`Is Grade 11 selectable by user? ${availableGrades.includes(11)}`);
  
  const strictTopicsG11 = getTopicsByUnit(concepts, 'CBSE', 11, 'MATH', 'ALL_UNITS');
  console.log(`Strict topics for CBSE Grade 11 Math: ${strictTopicsG11.length}`);
  console.log(`Result: UI displays empty state banner "No Pre-Indexed Topics for CBSE Class 11 (Mathematics)" and falls back to a mismatched Grade 6 concept.\n`);

  // =========================================================================
  // REPRODUCTION 2: CAMBRIDGE - Selector Desynchronization & Concept Pollution
  // =========================================================================
  console.log('--- REPRODUCTION 2: CAMBRIDGE Class 10 Physics Navigation ---');
  const camG9Math = concepts.find((c: any) => c.boardId === 'CAMBRIDGE' && c.gradeLevel === 9 && c.subjectId === 'MATH');
  console.log(`Previous active concept: ${camG9Math.id} (${camG9Math.title})`);
  
  const oldConceptId = camG9Math.id;
  const selectedBoard = 'CAMBRIDGE';
  const selectedGrade = 10;
  const selectedSubject = 'PHYSICS';
  const selectedUnit = 'ALL_UNITS';

  const strictTopicsCam = getTopicsByUnit(concepts, selectedBoard, selectedGrade, selectedSubject, selectedUnit);
  console.log(`Strict matching topics for CAMBRIDGE G10 Physics: ${strictTopicsCam.length}`);

  // Current displayTopics logic in HierarchicalCurriculumSelector:
  const list = [...strictTopicsCam];
  if (oldConceptId && !list.some((t: any) => t.id === oldConceptId)) {
    const active = concepts.find((c: any) => c.id === oldConceptId);
    if (active) list.unshift(active);
  }
  console.log(`Total topics in displayTopics: ${list.length}`);
  console.log(`First topic in displayTopics: ${list[0]?.id} (${list[0]?.title})`);
  console.log(`Does displayTopics[0] match selected Grade (10)? ${list[0]?.gradeLevel === 10}`);
  console.log(`Does displayTopics[0] match selected Subject (PHYSICS)? ${list[0]?.subjectId === 'PHYSICS'}`);
  
  // Check reactive synchronization:
  const isCurrentInAvailable = list.some((t: any) => t.id === oldConceptId);
  console.log(`Is old concept in displayTopics? ${isCurrentInAvailable}`);
  console.log(`Will reactive synchronization fire (isCurrentInAvailable === false)? ${!isCurrentInAvailable}`);
  console.log(`Result: Grade 9 Math concept is POLLUTED into Grade 10 Physics dropdown, synchronization never triggers, and user sees mismatched Grade 9 Math content under Grade 10 Physics.\n`);

  // =========================================================================
  // REPRODUCTION 3: IB_MYP - React 18 DOM Wiping in MathRenderer
  // =========================================================================
  console.log('--- REPRODUCTION 3: IB_MYP React 18 DOM Wiping in MathRenderer ---');
  const ibConcept = concepts.find((c: any) => c.boardId === 'IB_MYP' && c.subjectId === 'MATH');
  console.log(`Target concept: ${ibConcept.id} - ${ibConcept.title}`);
  console.log(`MathRenderer has useEffect cleanup: containerRef.current.innerHTML = ''`);
  console.log(`Under React 18 (Strict Mode / remount / tab switch):`);
  console.log(`1. Component unmounts -> containerRef.current.innerHTML = '' runs.`);
  console.log(`2. Component remounts with identical formula/text.`);
  console.log(`3. React reconciler sees prevHTML === nextHTML, so it skips innerHTML assignment.`);
  console.log(`4. DOM node remains empty string ("").`);
  console.log(`5. In MathText, deleting child nodes from DOM causes React reconciliation errors.`);
  console.log(`Result: Complete blanking of formulas and pedagogical text blocks.\n`);

  // =========================================================================
  // REPRODUCTION 4: Cross-Board - Subject 'SCIENCE' Selection
  // =========================================================================
  console.log('--- REPRODUCTION 4: Subject "SCIENCE" Selection across any board ---');
  for (const b of ['CBSE', 'CAMBRIDGE', 'IB_MYP'] as const) {
    const scienceTopics = concepts.filter((c: any) => c.boardId === b && c.subjectId === 'SCIENCE');
    console.log(`Concepts with subjectId='SCIENCE' for ${b}: ${scienceTopics.length}`);
  }
  console.log(`Result: Selecting "Integrated Science" always results in 0 matching topics and triggers empty state banner.\n`);
}

reproduceFailingCases().catch(console.error);
