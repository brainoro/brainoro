import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function runPreflight() {
  console.log("=== PHASE 2C.2.1 READ-ONLY PREFLIGHT ===");

  // 1. Freeze check
  const { count: cTotal } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: cCbse } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CBSE');
  const { count: cCam } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CAMBRIDGE');
  const { count: cIb } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'IB_MYP');
  const { count: tCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: cmCount } = await supabase.from('content_modules').select('*', { count: 'exact', head: true });
  const { count: acCount } = await supabase.from('authoritative_curriculum_concepts').select('*', { count: 'exact', head: true });
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('*');

  console.log("\n--- 1. Freeze Check ---");
  console.log({
    curriculum_concepts_total: cTotal,
    CBSE: cCbse,
    CAMBRIDGE: cCam,
    IB_MYP: cIb,
    topics: tCount,
    content_modules: cmCount,
    authoritative_curriculum_concepts: acCount,
    concept_curriculum_mappings: mappings?.length,
  });

  const stateCounts: Record<string, number> = {};
  mappings?.forEach(m => {
    stateCounts[m.mapping_state] = (stateCounts[m.mapping_state] || 0) + 1;
  });
  console.log("Mapping states:", stateCounts);

  // 2. M:N Preflight
  console.log("\n--- 2. M:N Preflight ---");
  let nullAuthCount = 0;
  const pairMap = new Map<string, number>();
  mappings?.forEach(m => {
    if (m.authoritative_concept_id === null) nullAuthCount++;
    const key = `${m.brainoro_concept_id}::${m.curriculum_version_id}`;
    pairMap.set(key, (pairMap.get(key) || 0) + 1);
  });

  let duplicatePairs = 0;
  pairMap.forEach((count, key) => {
    if (count > 1) duplicatePairs++;
  });

  console.log("authoritative_concept_id IS NULL count:", nullAuthCount, "of", mappings?.length);
  console.log("Duplicate (brainoro_concept_id, curriculum_version_id) pairs:", duplicatePairs);

  // 3. Version integrity preflight
  console.log("\n--- 3. Version Integrity Preflight ---");
  const { data: authConcepts } = await supabase.from('authoritative_curriculum_concepts').select('id, curriculum_version_id, board_id, grade_level, subject_id, textbook_id, chapter_id, section_id');
  console.log("Authoritative concepts count:", authConcepts?.length);
  const authVersions = new Set(authConcepts?.map(ac => ac.curriculum_version_id));
  console.log("Unique curriculum_version_ids in authConcepts:", Array.from(authVersions));

  // 4. Section integrity
  console.log("\n--- 4. Section Integrity Preflight ---");
  const { data: sections } = await supabase.from('textbook_sections').select('id, section_title');
  let syntheticCount = 0;
  sections?.forEach(s => {
    if (s.section_title.includes('Fundamental Principles & Core Concepts')) syntheticCount++;
  });
  console.log("Total sections:", sections?.length, "| Synthetic sections count:", syntheticCount);

  // 5. Subjects query
  const { data: subjects } = await supabase.from('subjects').select('*');
  console.log("\n--- 5. Subjects Table ---");
  console.log(subjects);
}

runPreflight().catch(console.error);
