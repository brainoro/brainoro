import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function testRls() {
  console.log("=== TESTING RLS POLICIES AS ANON ===");

  // 1. SELECT on curriculum tables (MUST SUCCEED)
  const { data: selectMap, error: selectErr } = await supabase.from('concept_curriculum_mappings').select('id').limit(1);
  console.log("Anon SELECT on concept_curriculum_mappings:", { success: !selectErr, error: selectErr?.message });

  const { data: selectAuth, error: authErr } = await supabase.from('authoritative_curriculum_concepts').select('id').limit(1);
  console.log("Anon SELECT on authoritative_curriculum_concepts:", { success: !authErr, error: authErr?.message });

  // 2. INSERT into curriculum_administrators (MUST FAIL / DENIED)
  const fakeUuid = '00000000-0000-0000-0000-000000000000';
  const { data: insertAdmin, error: adminErr } = await supabase.from('curriculum_administrators').insert({
    user_id: fakeUuid
  });
  console.log("Anon INSERT into curriculum_administrators (MUST BE DENIED):", {
    denied: !!adminErr,
    error: adminErr?.message,
    code: adminErr?.code
  });

  // 3. INSERT into concept_curriculum_mappings (MUST FAIL / DENIED by RLS)
  const fakeRowId = '00000000-0000-0000-0000-000000000001';
  const { data: insertMap, error: mapErr } = await supabase.from('concept_curriculum_mappings').insert({
    id: fakeRowId,
    brainoro_concept_id: 'CBSE-G10-MATH-REAL-FTA',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL'
  });
  console.log("Anon INSERT into concept_curriculum_mappings (MUST BE DENIED):", {
    denied: !!mapErr,
    error: mapErr?.message,
    code: mapErr?.code
  });

  // 4. INSERT into authoritative_curriculum_concepts (MUST FAIL / DENIED by RLS)
  const { data: insertAuth, error: authInsertErr } = await supabase.from('authoritative_curriculum_concepts').insert({
    id: 'AUTH-TEST-UNAUTHORIZED',
    curriculum_version_id: 'CBSE-2026-27-OFFICIAL',
    board_id: 'CBSE',
    grade_level: 10,
    subject_id: 'MATH',
    official_title: 'Unauthorized Test',
    source_id: 'SRC-CBSE-ACADEMIC',
    verification_status: 'VERIFIED',
    evidence: 'test'
  });
  console.log("Anon INSERT into authoritative_curriculum_concepts (MUST BE DENIED):", {
    denied: !!authInsertErr,
    error: authInsertErr?.message,
    code: authInsertErr?.code
  });

  // 5. UPDATE on concept_curriculum_mappings (MUST FAIL / DENIED by RLS)
  const { data: updateMap, error: updateErr } = await supabase
    .from('concept_curriculum_mappings')
    .update({ evidence: 'unauthorized update test' })
    .eq('id', '67a2261c-2430-4f68-a404-b25bb80451c4');
  console.log("Anon UPDATE on concept_curriculum_mappings (MUST BE DENIED):", {
    denied: !!updateErr,
    error: updateErr?.message,
    code: updateErr?.code
  });
}

testRls().catch(console.error);
