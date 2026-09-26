import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function testAllBoardSwitches() {
  const { data: allConcepts } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, title, unit')
    .order('id');

  if (!allConcepts) return;

  const concepts = allConcepts.map((c: any) => ({
    id: c.id,
    boardId: c.board_id,
    subjectId: c.subject_id,
    gradeLevel: Number(c.grade_level),
    title: c.title,
    unit: c.unit,
  }));

  const boards = ['CBSE', 'CAMBRIDGE', 'IB_MYP'];

  let totalSwitches = 0;
  let brokenSwitches = 0;
  const sampleBroken: any[] = [];

  for (const c of concepts) {
    for (const targetBoard of boards) {
      if (targetBoard === c.boardId) continue;
      totalSwitches++;

      // Simulate handleSelectBoard
      let activeConceptId = c.id;
      let selectedGrade = c.gradeLevel;
      let selectedSubject = c.subjectId;
      let selectedUnit = c.unit || 'ALL_UNITS';

      const suffix = activeConceptId.replace(/^[^-]+-/, '');
      const exactCompoundId = `${targetBoard}-${suffix}`;
      const exactMatch = concepts.find(x => x.id === exactCompoundId);

      let targetConcept: any = null;
      if (exactMatch) {
        targetConcept = exactMatch;
      } else {
        const currentSubj = c.subjectId;
        const currentG = c.gradeLevel;
        const matchSubjectGrade = concepts.find(
          x => x.boardId === targetBoard && x.gradeLevel === currentG && x.subjectId === currentSubj
        );
        if (matchSubjectGrade) {
          targetConcept = matchSubjectGrade;
        } else {
          targetConcept = concepts.find(x => x.boardId === targetBoard && x.gradeLevel === currentG) || concepts.find(x => x.boardId === targetBoard);
        }
      }

      if (!targetConcept || targetConcept.boardId !== targetBoard) {
        brokenSwitches++;
        sampleBroken.push({
          from: c.id,
          targetBoard,
          result: targetConcept?.id
        });
      }
    }
  }

  console.log(`Total board switches tested: ${totalSwitches}`);
  console.log(`Broken board switches: ${brokenSwitches}`);
}

testAllBoardSwitches().catch(console.error);
