import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function testAll() {
  const { data: allConcepts } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, title, unit, metadata');

  if (!allConcepts) {
    console.error('No concepts found');
    return;
  }

  console.log(`Loaded ${allConcepts.length} concepts.`);

  // Test 1: Check for any concept whose metadata.cornell_notes is missing or invalid
  const invalidNotes: any[] = [];
  const missingFields: any[] = [];

  for (const c of allConcepts) {
    const notes = c.metadata?.cornell_notes;
    if (!notes) {
      invalidNotes.push({ id: c.id, reason: 'NO_NOTES' });
      continue;
    }

    // Check all fields that CornellNoteEditor renders
    const checks = {
      title: typeof notes.title === 'string' && notes.title.length > 0,
      conceptId: typeof notes.conceptId === 'string' && notes.conceptId.length > 0,
      coreAnalogy: typeof notes.coreAnalogy === 'string' && notes.coreAnalogy.length > 0,
      structuralRule: typeof notes.structuralRule === 'string' && notes.structuralRule.length > 0,
      curriculumTrap: typeof notes.curriculumTrap === 'string' && notes.curriculumTrap.length > 0,
      mainNotes: typeof notes.mainNotes === 'string' && notes.mainNotes.length > 0,
      summary: typeof notes.summary === 'string' && notes.summary.length > 0,
      verificationProblem: typeof notes.verificationProblem === 'string' && notes.verificationProblem.length > 0,
      cueQuestions: Array.isArray(notes.cueQuestions) && notes.cueQuestions.length > 0,
      cueQuestionsNonEmpty: Array.isArray(notes.cueQuestions) && notes.cueQuestions.every((q: any) => typeof q === 'string' && q.length > 0),
      workedExample: !!notes.workedExample,
      workedExampleProblem: !notes.workedExample || (typeof notes.workedExample.problem === 'string' && notes.workedExample.problem.length > 0),
      workedExampleSteps: !notes.workedExample || (Array.isArray(notes.workedExample.steps) && notes.workedExample.steps.length > 0),
      workedExampleResult: !notes.workedExample || (typeof notes.workedExample.result === 'string' && notes.workedExample.result.length > 0),
      practiceQuiz: Array.isArray(notes.practiceQuiz),
      diagramType: typeof notes.diagramType === 'string' || typeof c.metadata?.diagram_type === 'string'
    };

    const failedChecks = Object.entries(checks).filter(([k, v]) => !v).map(([k]) => k);
    if (failedChecks.length > 0) {
      missingFields.push({
        id: c.id,
        board: c.board_id,
        grade: c.grade_level,
        subject: c.subject_id,
        failedChecks
      });
    }
  }

  console.log(`Concepts with invalid/missing notes: ${invalidNotes.length}`);
  console.log(`Concepts with missing fields: ${missingFields.length}`);
  if (missingFields.length > 0) {
    console.log('Sample missing fields:', JSON.stringify(missingFields.slice(0, 10), null, 2));
  }
}

testAll().catch(console.error);
