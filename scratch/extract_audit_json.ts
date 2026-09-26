import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function extractFullAuditData() {
  // 1. Versions
  const { data: versions } = await supabase.from('curriculum_versions').select('*');
  const { data: sources } = await supabase.from('curriculum_sources').select('*');
  const { data: docs } = await supabase.from('curriculum_documents').select('*');

  // 2. Textbooks
  const { data: textbooks } = await supabase.from('textbooks').select('*');

  // 3. 17 Authoritative Concepts
  const { data: authConcepts } = await supabase.from('authoritative_curriculum_concepts').select('*');

  // 4. 14 Unmapped Concepts
  const { data: unmappedMappings } = await supabase
    .from('concept_curriculum_mappings')
    .select('*')
    .eq('mapping_state', 'UNMAPPED');

  const { data: allConcepts } = await supabase.from('curriculum_concepts').select('*');

  // 5. Section and Topic counts
  const { data: sections } = await supabase.from('textbook_sections').select('id, textbook_id, section_title');
  const { data: topics } = await supabase.from('topics').select('id, name');

  // 6. Mappings
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('*');

  const fs = await import('fs');
  fs.writeFileSync('scratch/audit_data.json', JSON.stringify({
    versions,
    sources,
    docs,
    textbooks,
    authConcepts,
    unmappedMappings,
    allConceptsCount: allConcepts?.length,
    sectionsCount: sections?.length,
    topicsCount: topics?.length,
    mappingsCount: mappings?.length,
  }, null, 2), 'utf-8');
  console.log("Successfully wrote scratch/audit_data.json");
}

extractFullAuditData().catch(console.error);
