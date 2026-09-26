import { createClient } from '@supabase/supabase-js';
import * as path from 'path';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

const baseDir = path.resolve(process.cwd(), 'frontend/src');
const { getAvailableGrades, getAvailableSubjects, getUnitsBySubject, getTopicsByUnit } = require(path.join(baseDir, 'lib/supabase/curriculumService'));

async function testSelectorTransitions() {
  console.log('Testing selector transitions and cascading logic across all boards...');

  const { data: allConcepts, error } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, title, unit, metadata')
    .order('id');

  if (error || !allConcepts) {
    console.error('Error fetching concepts:', error);
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

  const boards = ['CBSE', 'CAMBRIDGE', 'IB_MYP'];
  const grades = [6, 7, 8, 9, 10, 11, 12];
  const subjects = ['ALL', 'MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'SCIENCE'];

  const issues: any[] = [];

  // 1. Check combinations of Board x Grade x Subject x Unit
  for (const board of boards) {
    for (const grade of grades) {
      for (const subject of subjects) {
        // Test what HierarchicalCurriculumSelector would compute:
        const units = getUnitsBySubject(concepts, board, grade, subject);
        
        // For ALL_UNITS and each unit
        const testUnits = ['ALL_UNITS', ...units];
        for (const unit of testUnits) {
          const strictTopics = (unit && unit !== 'ALL_UNITS')
            ? getTopicsByUnit(concepts, board, grade, subject, unit)
            : getTopicsByUnit(concepts, board, grade, subject, 'ALL_UNITS');

          // availableTopics fallback chain
          let availableTopics = strictTopics;
          let fallbackLevel = 'strict';
          if (availableTopics.length === 0) {
            const gradeTopics = concepts.filter((c: any) => c.boardId === board && c.gradeLevel === grade);
            if (gradeTopics.length > 0) {
              availableTopics = gradeTopics;
              fallbackLevel = 'grade_fallback';
            } else {
              const boardTopics = concepts.filter((c: any) => c.boardId === board);
              if (boardTopics.length > 0) {
                availableTopics = boardTopics;
                fallbackLevel = 'board_fallback';
              } else {
                availableTopics = concepts;
                fallbackLevel = 'all_concepts_fallback';
              }
            }
          }

          if (strictTopics.length === 0) {
            issues.push({
              board,
              grade,
              subject,
              unit,
              strictCount: 0,
              availableCount: availableTopics.length,
              fallbackLevel,
              sampleAvailableTopic: availableTopics[0]?.id
            });
          }
        }
      }
    }
  }

  console.log(`Total empty strict combinations found: ${issues.length}`);
  
  // Group issues by reason
  const grade1112Issues = issues.filter(i => i.grade === 11 || i.grade === 12);
  const scienceIssues = issues.filter(i => i.subject === 'SCIENCE' && i.grade <= 10);
  const otherIssues = issues.filter(i => i.grade <= 10 && i.subject !== 'SCIENCE');

  console.log(`- Grade 11/12 combinations with 0 strict topics: ${grade1112Issues.length}`);
  console.log(`- Subject 'SCIENCE' combinations with 0 strict topics: ${scienceIssues.length}`);
  console.log(`- Other grade 6-10 combinations with 0 strict topics: ${otherIssues.length}`);

  if (otherIssues.length > 0) {
    console.log('Sample other issues:', JSON.stringify(otherIssues.slice(0, 10), null, 2));
  }
}

testSelectorTransitions().catch(console.error);
