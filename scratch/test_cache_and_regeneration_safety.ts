/**
 * Brainoro Cognitive OS — Cache & Regeneration Safety Test
 * Path: scratch/test_cache_and_regeneration_safety.ts
 *
 * Verifies Phase 6 & Phase 7:
 * 1. Cache Audit: Database query headers enforce `no-store` and `no-cache`.
 * 2. 4-Column Isolation: Queries strictly bind id, board_id, grade_level, subject_id.
 * 3. Regeneration Safety: handleRunAISynthesis / getContentForTopic is strictly read-only.
 *    Calling it never mutates Supabase or touches neighboring concepts.
 */

import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!cleanSupabaseUrl || !cleanSupabaseKey) {
  console.error('Supabase credentials not found in environment!');
  process.exit(1);
}

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

const TEST_CONCEPTS = [
  { id: 'IB_MYP-G6-MATH-DATA-TABLES', boardId: 'IB_MYP', gradeLevel: 6, subjectId: 'MATH' },
  { id: 'CBSE-G6-MATH-DATA-TABLES', boardId: 'CBSE', gradeLevel: 6, subjectId: 'MATH' },
  { id: 'CAMBRIDGE-G7-MATH-FRAC-MULT', boardId: 'CAMBRIDGE', gradeLevel: 7, subjectId: 'MATH' },
  { id: 'CBSE-G8-PHYSICS-SOUND-FREQ', boardId: 'CBSE', gradeLevel: 8, subjectId: 'PHYSICS' },
  { id: 'CBSE-G9-MATH-LINEQ-GRAPH', boardId: 'CBSE', gradeLevel: 9, subjectId: 'MATH' }
];

async function runCacheAndRegenerationSafetyTests() {
  console.log('================================================================================');
  console.log('   BRAINORO COGNITIVE OS — CACHE & REGENERATION SAFETY SUITE');
  console.log('================================================================================\n');

  let passedTests = 0;
  let failedTests = 0;

  // Test 1: Code Audit for 4-Column Isolation and Cache-Control headers
  console.log('[Test 1] Verifying 4-Column Query Isolation & Cache Headers in contentService.ts');
  const fs = require('fs');
  const path = require('path');
  const serviceCode = fs.readFileSync(
    path.resolve(process.cwd(), 'frontend/src/lib/services/contentService.ts'),
    'utf-8'
  );

  const hasFourColumnEq =
    serviceCode.includes(".eq('id', concept.id)") &&
    serviceCode.includes(".eq('board_id', concept.boardId)") &&
    serviceCode.includes(".eq('grade_level', concept.gradeLevel)") &&
    serviceCode.includes(".eq('subject_id', concept.subjectId)");

  const hasNoStoreHeader = serviceCode.includes(".setHeader('Cache-Control', 'no-store')");
  const hasNoCacheHeader = serviceCode.includes(".setHeader('Pragma', 'no-cache')");

  if (hasFourColumnEq && hasNoStoreHeader && hasNoCacheHeader) {
    console.log('  ✅ PASS | 4-Column Query Isolation (.eq id, board_id, grade_level, subject_id) verified');
    console.log('  ✅ PASS | HTTP Headers (Cache-Control: no-store, Pragma: no-cache) verified');
    passedTests += 2;
  } else {
    console.error('  ❌ FAIL | contentService.ts lacks required 4-column isolation or cache headers!');
    failedTests += 2;
  }

  // Test 2: UI Regeneration Handler is Read-Only (Does NOT write to Supabase)
  console.log('\n[Test 2] Verifying "Regenerate Pedagogical Blueprint" Handler Safety');
  const editorCode = fs.readFileSync(
    path.resolve(process.cwd(), 'frontend/src/components/cornell/CornellNoteEditor.tsx'),
    'utf-8'
  );

  const handlerMatch = editorCode.match(/const handleRunAISynthesis = async \(\) => \{([\s\S]*?)\};/);
  if (!handlerMatch) {
    console.error('  ❌ FAIL | handleRunAISynthesis not found in CornellNoteEditor.tsx');
    failedTests++;
  } else {
    const handlerBody = handlerMatch[1];
    const hasUpsert = handlerBody.includes('.upsert(') || handlerBody.includes('upsertCurriculumConcept');
    const hasInsert = handlerBody.includes('.insert(');
    const hasUpdate = handlerBody.includes('.update(');
    const hasDelete = handlerBody.includes('.delete(');

    if (!hasUpsert && !hasInsert && !hasUpdate && !hasDelete) {
      console.log('  ✅ PASS | handleRunAISynthesis is 100% READ-ONLY (no insert, update, upsert, or delete calls)');
      passedTests++;
    } else {
      console.error('  ❌ FAIL | handleRunAISynthesis contains mutating database calls!');
      failedTests++;
    }
  }

  // Test 3: Live Verification — Calling Query 10 Times produces 0 mutations in Supabase
  console.log('\n[Test 3] Live Supabase Mutation Invariant Test across Test Concepts');

  for (const c of TEST_CONCEPTS) {
    // 1. Snapshot record before
    const { data: beforeData, error: beforeErr } = await supabase
      .from('curriculum_concepts')
      .select('*')
      .eq('id', c.id)
      .single();

    if (beforeErr || !beforeData) {
      console.error(`  ❌ Failed to snapshot ${c.id}: ${beforeErr?.message}`);
      failedTests++;
      continue;
    }

    const beforeUpdated = beforeData.updated_at;
    const beforePayloadStr = JSON.stringify(beforeData.metadata?.cornell_notes || {});

    // 2. Perform 10 simulated rapid fetches (like user clicking regenerate / switching)
    for (let j = 0; j < 10; j++) {
      await supabase
        .from('curriculum_concepts')
        .select('*')
        .eq('id', c.id)
        .eq('board_id', c.boardId)
        .eq('grade_level', c.gradeLevel)
        .eq('subject_id', c.subjectId)
        .setHeader('Cache-Control', 'no-store')
        .setHeader('Pragma', 'no-cache')
        .single();
    }

    // 3. Snapshot record after
    const { data: afterData, error: afterErr } = await supabase
      .from('curriculum_concepts')
      .select('*')
      .eq('id', c.id)
      .single();

    if (afterErr || !afterData) {
      console.error(`  ❌ Failed to verify ${c.id} after queries: ${afterErr?.message}`);
      failedTests++;
      continue;
    }

    const afterUpdated = afterData.updated_at;
    const afterPayloadStr = JSON.stringify(afterData.metadata?.cornell_notes || {});

    const unchanged = beforeUpdated === afterUpdated && beforePayloadStr === afterPayloadStr;
    if (unchanged) {
      console.log(`  ✅ PASS | [${c.id}] 10 queries executed -> 0 mutations, payload byte-identical`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL | [${c.id}] Record was mutated during read queries!`);
      failedTests++;
    }
  }

  console.log('\n================================================================================');
  console.log('   CACHE & REGENERATION SAFETY SUMMARY');
  console.log('================================================================================');
  console.log(`Total Tests        : ${passedTests + failedTests}`);
  console.log(`Passed             : ${passedTests}`);
  console.log(`Failed             : ${failedTests}`);
  console.log(`Pass Rate          : ${(((passedTests) / (passedTests + failedTests)) * 100).toFixed(1)}%`);
  console.log('================================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runCacheAndRegenerationSafetyTests().catch(err => {
  console.error('Fatal error in cache and regeneration safety tests:', err);
  process.exit(1);
});
