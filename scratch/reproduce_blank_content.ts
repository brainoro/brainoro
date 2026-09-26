import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function runAudit() {
  console.log('Auditing Supabase curriculum_concepts table for missing fields or anomalies...');
  
  // 1. Fetch all 846 concepts from Supabase
  const { data: allConcepts, error } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, title, unit, core_logic_essence, metadata')
    .order('id');

  if (error || !allConcepts) {
    console.error('Failed to fetch concepts:', error);
    return;
  }

  console.log(`Total concepts in Supabase: ${allConcepts.length}`);

  let missingNotesCount = 0;
  let missingFieldCount = 0;
  let emptyMainNotesCount = 0;
  let emptyFormulaCount = 0;
  let emptyAnalogyCount = 0;
  let emptyTrapCount = 0;
  let emptySummaryCount = 0;
  let emptyCuesCount = 0;
  let emptyWorkedExampleCount = 0;
  let emptyVerificationCount = 0;
  let quarantinedCount = 0;

  const anomalousConcepts: any[] = [];

  for (const c of allConcepts) {
    const notes = c.metadata?.cornell_notes;
    const issues: string[] = [];

    if (c.metadata?.data_status === 'QUARANTINED') {
      quarantinedCount++;
      issues.push('QUARANTINED');
    }

    if (!notes) {
      missingNotesCount++;
      issues.push('NO_CORNELL_NOTES');
    } else {
      if (!notes.mainNotes || notes.mainNotes.trim() === '') {
        emptyMainNotesCount++;
        issues.push('EMPTY_MAIN_NOTES');
      }
      if (!notes.structuralRule || notes.structuralRule.trim() === '') {
        emptyFormulaCount++;
        issues.push('EMPTY_STRUCTURAL_RULE');
      }
      if (!notes.coreAnalogy || notes.coreAnalogy.trim() === '') {
        emptyAnalogyCount++;
        issues.push('EMPTY_CORE_ANALOGY');
      }
      if (!notes.curriculumTrap || notes.curriculumTrap.trim() === '') {
        emptyTrapCount++;
        issues.push('EMPTY_CURRICULUM_TRAP');
      }
      if (!notes.summary || notes.summary.trim() === '') {
        emptySummaryCount++;
        issues.push('EMPTY_SUMMARY');
      }
      if (!Array.isArray(notes.cueQuestions) || notes.cueQuestions.length === 0) {
        emptyCuesCount++;
        issues.push('EMPTY_CUE_QUESTIONS');
      }
      if (!notes.workedExample) {
        emptyWorkedExampleCount++;
        issues.push('NO_WORKED_EXAMPLE');
      }
      if (!notes.verificationProblem || notes.verificationProblem.trim() === '') {
        emptyVerificationCount++;
        issues.push('EMPTY_VERIFICATION');
      }
      if (notes.gradeLevel && Number(notes.gradeLevel) !== Number(c.grade_level)) {
        issues.push(`GRADE_MISMATCH(concept:${c.grade_level},notes:${notes.gradeLevel})`);
      }
    }

    if (issues.length > 0) {
      anomalousConcepts.push({
        id: c.id,
        board_id: c.board_id,
        grade_level: c.grade_level,
        subject_id: c.subject_id,
        title: c.title,
        unit: c.unit,
        issues
      });
    }
  }

  console.log('\n--- SUPABASE DATA ANOMALY AUDIT ---');
  console.log(`Missing cornell_notes: ${missingNotesCount}`);
  console.log(`Empty mainNotes: ${emptyMainNotesCount}`);
  console.log(`Empty structuralRule: ${emptyFormulaCount}`);
  console.log(`Empty coreAnalogy: ${emptyAnalogyCount}`);
  console.log(`Empty curriculumTrap: ${emptyTrapCount}`);
  console.log(`Empty summary: ${emptySummaryCount}`);
  console.log(`Empty cueQuestions: ${emptyCuesCount}`);
  console.log(`No workedExample: ${emptyWorkedExampleCount}`);
  console.log(`Empty verificationProblem: ${emptyVerificationCount}`);
  console.log(`QUARANTINED: ${quarantinedCount}`);
  console.log(`Total anomalous concepts: ${anomalousConcepts.length}`);

  if (anomalousConcepts.length > 0) {
    console.log('\nSample anomalous concepts (up to 10):');
    console.log(JSON.stringify(anomalousConcepts.slice(0, 10), null, 2));
  }
}

runAudit().catch(console.error);
