import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!cleanSupabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE credentials");
  process.exit(1);
}

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function runAudit() {
  console.log("=== PHASE 2B.3.1 AUDIT QUERY ===");

  // 1. Versions
  const { data: versions, error: vErr } = await supabase.from('curriculum_versions').select('*');
  if (vErr) console.error("Versions error:", vErr);
  console.log("\n--- VERSIONS ---");
  console.log(JSON.stringify(versions, null, 2));

  // Sources & Docs
  const { data: sources, error: sErr } = await supabase.from('curriculum_sources').select('*');
  if (sErr) console.error("Sources error:", sErr);
  const { data: docs, error: dErr } = await supabase.from('curriculum_documents').select('*');
  if (dErr) console.error("Docs error:", dErr);
  console.log("\n--- SOURCES & DOCS ---");
  console.log(JSON.stringify({ sources, docs }, null, 2));

  // 2. Textbooks
  const { data: textbooks } = await supabase.from('textbooks').select('*');
  console.log("\n--- TEXTBOOKS ---");
  console.log(JSON.stringify(textbooks, null, 2));

  // 3. 17 Authoritative Concepts
  const { data: authConcepts } = await supabase.from('authoritative_curriculum_concepts').select('*');
  console.log(`\n--- AUTHORITATIVE CONCEPTS (${authConcepts?.length || 0}) ---`);
  console.log(JSON.stringify(authConcepts, null, 2));

  // 4. 14 Unmapped Concepts
  const { data: unmapped } = await supabase
    .from('concept_curriculum_mappings')
    .select(`
      *,
      curriculum_concepts!concept_curriculum_mappings_brainoro_concept_id_fkey (*)
    `)
    .eq('verification_status', 'UNMAPPED');
  console.log(`\n--- UNMAPPED CONCEPTS (${unmapped?.length || 0}) ---`);
  console.log(JSON.stringify(unmapped, null, 2));

  // 5. Sections
  const { count: sectionCount } = await supabase.from('textbook_sections').select('*', { count: 'exact', head: true });
  console.log("\n--- SECTIONS COUNT ---", sectionCount);

  // 6. Topics
  const { count: topicCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  console.log("\n--- TOPICS COUNT ---", topicCount);

  // 7. Mappings summary
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('verification_status');
  const mappingCounts: Record<string, number> = {};
  mappings?.forEach(m => {
    mappingCounts[m.verification_status] = (mappingCounts[m.verification_status] || 0) + 1;
  });
  console.log("\n--- MAPPING COUNTS ---", mappingCounts);

  // 8. Curriculum concepts summary
  const { data: cConcepts } = await supabase.from('curriculum_concepts').select('board_id');
  const cCounts: Record<string, number> = {};
  cConcepts?.forEach(c => {
    cCounts[c.board_id] = (cCounts[c.board_id] || 0) + 1;
  });
  console.log("\n--- CURRICULUM CONCEPTS COUNTS ---", { total: cConcepts?.length, ...cCounts });
}

runAudit().catch(console.error);
