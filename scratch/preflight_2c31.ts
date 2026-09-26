import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function runPreflight() {
  console.log("=== PHASE 2C.3.1 PREFLIGHT AUDIT ===");

  // 1. Freeze verification
  const { count: cTotal } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: cCbse } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CBSE');
  const { count: cCam } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CAMBRIDGE');
  const { count: cIb } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'IB_MYP');
  const { count: tCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: cmCount } = await supabase.from('content_modules').select('*', { count: 'exact', head: true });
  const { count: acCount } = await supabase.from('authoritative_curriculum_concepts').select('*', { count: 'exact', head: true });
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('mapping_state, authoritative_concept_id');
  const { data: sections } = await supabase.from('textbook_sections').select('*');

  console.log("1. Freeze counts:", {
    curriculum_concepts: cTotal,
    CBSE: cCbse,
    CAMBRIDGE: cCam,
    IB_MYP: cIb,
    topics: tCount,
    content_modules: cmCount,
    authoritative_curriculum_concepts: acCount,
    mappings_total: mappings?.length,
    sections_total: sections?.length
  });

  const mStates: Record<string, number> = {};
  let nullAuth = 0;
  mappings?.forEach(m => {
    mStates[m.mapping_state] = (mStates[m.mapping_state] || 0) + 1;
    if (m.authoritative_concept_id === null) nullAuth++;
  });
  console.log("   Mapping states:", mStates);
  console.log("   authoritative_concept_id IS NULL count:", nullAuth);

  const secTypes: Record<string, number> = {};
  sections?.forEach(s => secTypes[s.section_type] = (secTypes[s.section_type] || 0) + 1);
  console.log("   Section types:", secTypes);

  // 2. Audit current textbook_sections columns
  if (sections && sections.length > 0) {
    console.log("\n2. textbook_sections columns:", Object.keys(sections[0]));
    console.log("   Sample row:", sections[0]);
  }

  // 3. Check legacy backfill capability: chapter_id -> textbook_chapters.textbook_id
  const { data: chapters } = await supabase.from('textbook_chapters').select('id, textbook_id');
  const chapterToTb = new Map<string, string>();
  chapters?.forEach(c => chapterToTb.set(c.id, c.textbook_id));

  let backfillValid = 0;
  let backfillMissing = 0;
  sections?.forEach(s => {
    const tbId = chapterToTb.get(s.chapter_id);
    if (tbId) {
      backfillValid++;
    } else {
      backfillMissing++;
      console.error(`Section ${s.id} has invalid chapter_id ${s.chapter_id}`);
    }
  });

  console.log("\n3. Backfill capability check:");
  console.log(`   Sections with valid chapter_id -> textbook_id: ${backfillValid} / ${sections?.length}`);
  console.log(`   Sections with missing chapter link: ${backfillMissing}`);
}

runPreflight().catch(console.error);
