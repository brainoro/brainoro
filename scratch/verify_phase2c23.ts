import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function verifyLive() {
  console.log("=== PHASE 2C.2.3 LIVE AUDIT ===");

  // 1. Table existence: curriculum_administrators
  const { data: adminData, error: adminErr } = await supabase.from('curriculum_administrators').select('*').limit(1);
  console.log("1. curriculum_administrators table:", { exists: !adminErr, error: adminErr?.message });

  // 2. Columns in textbook_sections: section_type
  const { data: secData, error: secErr } = await supabase.from('textbook_sections').select('id, section_type').limit(5);
  console.log("2. textbook_sections.section_type:", { exists: !secErr, error: secErr?.message, sample: secData });

  // Section types breakdown
  const { data: allSecs } = await supabase.from('textbook_sections').select('section_type');
  const secTypes: Record<string, number> = {};
  allSecs?.forEach(s => secTypes[s.section_type] = (secTypes[s.section_type] || 0) + 1);
  console.log("   Section types breakdown:", secTypes, "Total:", allSecs?.length);

  // 3. Columns in authoritative_curriculum_concepts: statutory_title, normalized_title, official_title
  const { data: authData, error: authErr } = await supabase
    .from('authoritative_curriculum_concepts')
    .select('id, official_title, statutory_title, normalized_title')
    .limit(5);
  console.log("3. authoritative_curriculum_concepts titles:", { exists: !authErr, error: authErr?.message, sample: authData });

  // 4. Columns in concept_curriculum_mappings
  const { data: mapData, error: mapErr } = await supabase
    .from('concept_curriculum_mappings')
    .select(`
      id,
      curriculum_disposition,
      target_grade_level,
      target_curriculum_version_id,
      target_authoritative_concept_id,
      verified_document_id,
      audit_evidence_url,
      audit_page_reference,
      source_locator,
      section_heading,
      evidence_excerpt
    `)
    .limit(3);
  console.log("4. concept_curriculum_mappings new columns:", { exists: !mapErr, error: mapErr?.message, sample: mapData });

  // 5. Data preservation
  const { count: cTotal } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: cCbse } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CBSE');
  const { count: cCam } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CAMBRIDGE');
  const { count: cIb } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'IB_MYP');
  const { count: tCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: cmCount } = await supabase.from('content_modules').select('*', { count: 'exact', head: true });
  const { count: acCount } = await supabase.from('authoritative_curriculum_concepts').select('*', { count: 'exact', head: true });
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('mapping_state, authoritative_concept_id');

  console.log("5. Data preservation counts:", {
    curriculum_concepts: cTotal,
    CBSE: cCbse,
    CAMBRIDGE: cCam,
    IB_MYP: cIb,
    topics: tCount,
    content_modules: cmCount,
    authoritative_curriculum_concepts: acCount,
    mappings_total: mappings?.length
  });

  const mStates: Record<string, number> = {};
  let nullAuth = 0;
  mappings?.forEach(m => {
    mStates[m.mapping_state] = (mStates[m.mapping_state] || 0) + 1;
    if (m.authoritative_concept_id === null) nullAuth++;
  });
  console.log("   Mapping states:", mStates);
  console.log("   authoritative_concept_id IS NULL count:", nullAuth);
}

verifyLive().catch(console.error);
