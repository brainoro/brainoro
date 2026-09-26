import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function runAnalysis() {
  const { data: allConcepts, error } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, title, unit')
    .order('grade_level');

  if (error || !allConcepts) {
    console.error('Error fetching concepts:', error);
    return;
  }

  console.log(`Total concepts: ${allConcepts.length}`);

  // Group by board, grade, subject
  const matrix: Record<string, Record<number, Record<string, number>>> = {
    CBSE: {},
    CAMBRIDGE: {},
    IB_MYP: {}
  };

  const allBoards = ['CBSE', 'CAMBRIDGE', 'IB_MYP'];
  const allGrades = [6, 7, 8, 9, 10, 11, 12];
  const allSubjects = ['MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'SCIENCE'];

  for (const b of allBoards) {
    for (const g of allGrades) {
      matrix[b][g] = {};
      for (const s of allSubjects) {
        matrix[b][g][s] = 0;
      }
    }
  }

  for (const c of allConcepts) {
    const b = c.board_id;
    const g = Number(c.grade_level);
    const s = c.subject_id;

    if (matrix[b] && matrix[b][g]) {
      matrix[b][g][s] = (matrix[b][g][s] || 0) + 1;
    } else {
      console.log('Unexpected concept:', c);
    }
  }

  console.log('\n=== CURRICULUM COVERAGE MATRIX (Count of Concepts) ===');
  for (const b of allBoards) {
    console.log(`\n--- BOARD: ${b} ---`);
    for (const g of allGrades) {
      const counts = allSubjects.map(s => `${s}:${matrix[b][g][s] || 0}`).join(' | ');
      console.log(`  Grade ${g}: ${counts}`);
    }
  }
}

runAnalysis().catch(console.error);
