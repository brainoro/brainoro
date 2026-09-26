import { createClient } from '@supabase/supabase-js';
import * as path from 'path';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

// Import contentService functions
const baseDir = path.resolve(process.cwd(), 'frontend/src');
const { getContentForTopic, validateCornellNotesSchema } = require(path.join(baseDir, 'lib/services/contentService'));
const { deduceDiagramCategory, validateDiagramMapping } = require(path.join(baseDir, 'components/cornell/VisualModelCard'));
const katex = require('katex');

async function runInvestigation() {
  console.log('=== INVESTIGATING ALL 846 CONCEPTS FOR BLANK/FAILING RENDERING ===\n');

  const { data: allRows, error } = await supabase
    .from('curriculum_concepts')
    .select('*')
    .order('id');

  if (error || !allRows) {
    console.error('Failed to fetch from Supabase:', error);
    return;
  }

  console.log(`Fetched ${allRows.length} concept rows.`);

  const failingContentFetch: any[] = [];
  const katexErrors: any[] = [];
  const blankFieldConcepts: any[] = [];

  for (const row of allRows) {
    const concept = {
      id: row.id,
      boardId: row.board_id,
      subjectId: row.subject_id,
      gradeLevel: Number(row.grade_level),
      title: row.title,
      unit: row.unit,
      coreLogicEssence: row.core_logic_essence,
      metadata: row.metadata || {}
    };

    // Test 1: getContentForTopic
    let notes: any = null;
    try {
      notes = await getContentForTopic(concept, concept.boardId);
    } catch (err: any) {
      failingContentFetch.push({
        id: concept.id,
        board: concept.boardId,
        grade: concept.gradeLevel,
        subject: concept.subjectId,
        unit: concept.unit,
        error: err.message
      });
      continue;
    }

    if (!notes) {
      failingContentFetch.push({
        id: concept.id,
        board: concept.boardId,
        grade: concept.gradeLevel,
        subject: concept.subjectId,
        unit: concept.unit,
        error: 'Returned null notes'
      });
      continue;
    }

    // Test 2: Check for any blank/empty strings in notes
    const emptyFields: string[] = [];
    if (!notes.title) emptyFields.push('title');
    if (!notes.coreAnalogy) emptyFields.push('coreAnalogy');
    if (!notes.structuralRule) emptyFields.push('structuralRule');
    if (!notes.curriculumTrap) emptyFields.push('curriculumTrap');
    if (!notes.mainNotes) emptyFields.push('mainNotes');
    if (!notes.summary) emptyFields.push('summary');
    if (!notes.verificationProblem) emptyFields.push('verificationProblem');
    if (!Array.isArray(notes.cueQuestions) || notes.cueQuestions.length === 0) emptyFields.push('cueQuestions');

    if (emptyFields.length > 0) {
      blankFieldConcepts.push({
        id: concept.id,
        emptyFields
      });
    }

    // Test 3: KaTeX rendering on formula and notes
    try {
      const cleanFormula = notes.structuralRule.replace(/(?<!\\)\$/g, '').trim();
      katex.renderToString(cleanFormula, { throwOnError: true });
    } catch (kErr: any) {
      katexErrors.push({
        id: concept.id,
        field: 'structuralRule',
        formula: notes.structuralRule,
        error: kErr.message
      });
    }
  }

  console.log(`\n1. Failing getContentForTopic: ${failingContentFetch.length}`);
  if (failingContentFetch.length > 0) {
    console.log('Sample failing fetches:', JSON.stringify(failingContentFetch.slice(0, 5), null, 2));
  }

  console.log(`2. Concepts with blank fields: ${blankFieldConcepts.length}`);
  if (blankFieldConcepts.length > 0) {
    console.log('Sample blank fields:', JSON.stringify(blankFieldConcepts.slice(0, 5), null, 2));
  }

  console.log(`3. KaTeX throwOnError exceptions: ${katexErrors.length}`);
  if (katexErrors.length > 0) {
    console.log('Sample KaTeX exceptions:', JSON.stringify(katexErrors.slice(0, 5), null, 2));
  }
}

runInvestigation().catch(console.error);
