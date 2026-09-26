/**
 * Brainoro Cognitive OS — Database Read-Only Integrity Verification
 * Path: scratch/verify_database_integrity.ts
 */

import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function verifyDatabase() {
  console.log('================================================================================');
  console.log('   BRAINORO COGNITIVE OS — DATABASE READ-ONLY INTEGRITY VERIFICATION');
  console.log('================================================================================\n');

  // Fetch all records
  let allRows: any[] = [];
  const pageSize = 500;
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('curriculum_concepts')
      .select('id, board_id, grade_level, subject_id, title, metadata')
      .range(from, from + pageSize - 1);

    if (error) {
      console.error('Error fetching Supabase rows:', error);
      process.exit(1);
    }
    if (!data || data.length === 0) break;
    allRows = allRows.concat(data);
    if (data.length < pageSize) break;
    from += pageSize;
  }

  const checks = {
    totalRecords: allRows.length === 846,
    duplicateIds: 0,
    missingIdentityFields: 0,
    crossBoardCollisions: 0,
    crossGradeCollisions: 0,
    crossSubjectCollisions: 0,
    algebraInDataHandling: 0,
    numberLineInTallyFrequency: 0,
    foreignBoardPayloads: 0
  };

  const idSet = new Set<string>();

  for (const r of allRows) {
    // 1. Duplicate ID check
    if (idSet.has(r.id)) checks.duplicateIds++;
    idSet.add(r.id);

    // 2. Missing identity fields
    if (!r.id || !r.board_id || !r.grade_level || !r.subject_id || !r.title) {
      checks.missingIdentityFields++;
    }

    // 3. ID prefix consistency
    const id = r.id.toUpperCase();
    const board = (r.board_id || '').toUpperCase();
    const grade = String(r.grade_level);
    const subject = (r.subject_id || '').toUpperCase();

    if (!id.startsWith(board)) {
      checks.crossBoardCollisions++;
    }
    if (!id.includes(`-G${grade}-`)) {
      checks.crossGradeCollisions++;
    }
    if (!id.includes(`-${subject}-`)) {
      checks.crossSubjectCollisions++;
    }

    // 4. Data Handling integrity
    const isData = id.includes('DATA-TABLES') || id.includes('DATA-BAR') || id.includes('DATA-PROB');
    if (isData) {
      const rule = r.metadata?.cornell_notes?.structuralRule || '';
      if (rule.includes('x + a = b') || rule.includes('x = b - a') || rule.includes('LHS \\equiv RHS')) {
        checks.algebraInDataHandling++;
      }
      const diag = r.metadata?.diagram_type || r.metadata?.cornell_notes?.diagramType;
      if (diag === 'number_line') {
        checks.numberLineInTallyFrequency++;
      }
    }

    // 5. Foreign board payload check
    const notesTrap = r.metadata?.cornell_notes?.curriculumTrap || '';
    if (board === 'CBSE' && notesTrap.includes('Cambridge Mark Scheme')) {
      checks.foreignBoardPayloads++;
    }
    if (board === 'CAMBRIDGE' && notesTrap.includes('CBSE Board Exam')) {
      checks.foreignBoardPayloads++;
    }
    if (board === 'IB_MYP' && notesTrap.includes('CBSE Board Exam')) {
      checks.foreignBoardPayloads++;
    }
  }

  console.log(`1. Total Records Count (846)            : ${checks.totalRecords ? '✅ PASS (846)' : '❌ FAIL (' + allRows.length + ')'}`);
  console.log(`2. Duplicate Concept IDs (0)            : ${checks.duplicateIds === 0 ? '✅ PASS (0)' : '❌ FAIL (' + checks.duplicateIds + ')'}`);
  console.log(`3. Missing Identity Fields (0)          : ${checks.missingIdentityFields === 0 ? '✅ PASS (0)' : '❌ FAIL (' + checks.missingIdentityFields + ')'}`);
  console.log(`4. Cross-Board Identity Collisions (0)  : ${checks.crossBoardCollisions === 0 ? '✅ PASS (0)' : '❌ FAIL (' + checks.crossBoardCollisions + ')'}`);
  console.log(`5. Cross-Grade Identity Collisions (0)  : ${checks.crossGradeCollisions === 0 ? '✅ PASS (0)' : '❌ FAIL (' + checks.crossGradeCollisions + ')'}`);
  console.log(`6. Cross-Subject Identity Collisions (0): ${checks.crossSubjectCollisions === 0 ? '✅ PASS (0)' : '❌ FAIL (' + checks.crossSubjectCollisions + ')'}`);
  console.log(`7. Algebra Invariant in Data Handling(0): ${checks.algebraInDataHandling === 0 ? '✅ PASS (0)' : '❌ FAIL (' + checks.algebraInDataHandling + ')'}`);
  console.log(`8. NumberLine in Tally/Frequency (0)    : ${checks.numberLineInTallyFrequency === 0 ? '✅ PASS (0)' : '❌ FAIL (' + checks.numberLineInTallyFrequency + ')'}`);
  console.log(`9. Foreign Board Payload Contamination(0): ${checks.foreignBoardPayloads === 0 ? '✅ PASS (0)' : '❌ FAIL (' + checks.foreignBoardPayloads + ')'}`);

  const allPassed =
    checks.totalRecords &&
    checks.duplicateIds === 0 &&
    checks.missingIdentityFields === 0 &&
    checks.crossBoardCollisions === 0 &&
    checks.crossGradeCollisions === 0 &&
    checks.crossSubjectCollisions === 0 &&
    checks.algebraInDataHandling === 0 &&
    checks.numberLineInTallyFrequency === 0 &&
    checks.foreignBoardPayloads === 0;

  console.log('\n================================================================================');
  console.log(`DATABASE INTEGRITY GATE: ${allPassed ? '✅ PASS (100% CLEAN)' : '❌ FAIL'}`);
  console.log('================================================================================\n');

  if (!allPassed) {
    process.exit(1);
  }
}

verifyDatabase();
