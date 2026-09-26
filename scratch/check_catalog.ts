import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function checkCatalog() {
  console.log("=== CHECKING POSTGREST / SCHEMA CACHE FOR MIGRATION OBJECTS ===");

  // Check if we can query information_schema
  const { data: triggers, error: tErr } = await supabase.from('information_schema.triggers').select('*').limit(5);
  console.log("information_schema.triggers:", { triggers, error: tErr?.message });

  // Test composite FK and M:N behavior by testing error messages from PostgREST
  // For instance, let's test if we query concept_curriculum_mappings joined with authoritative_curriculum_concepts
  const { data: joinData, error: joinErr } = await supabase
    .from('concept_curriculum_mappings')
    .select(`
      id,
      curriculum_version_id,
      authoritative_concept_id,
      authoritative_curriculum_concepts (
        id,
        curriculum_version_id,
        official_title,
        statutory_title,
        normalized_title
      )
    `)
    .limit(3);
  console.log("Join test on authoritative_concept_id:", { success: !joinErr, error: joinErr?.message, sample: joinData });

  // Check all columns in concept_curriculum_mappings
  const { data: mapCols, error: mapColsErr } = await supabase
    .from('concept_curriculum_mappings')
    .select('*')
    .limit(1);
  if (mapCols && mapCols.length > 0) {
    console.log("All columns in concept_curriculum_mappings:", Object.keys(mapCols[0]));
  }

  // Check all columns in authoritative_curriculum_concepts
  const { data: authCols, error: authColsErr } = await supabase
    .from('authoritative_curriculum_concepts')
    .select('*')
    .limit(1);
  if (authCols && authCols.length > 0) {
    console.log("All columns in authoritative_curriculum_concepts:", Object.keys(authCols[0]));
  }

  // Check all columns in textbook_sections
  const { data: secCols, error: secColsErr } = await supabase
    .from('textbook_sections')
    .select('*')
    .limit(1);
  if (secCols && secCols.length > 0) {
    console.log("All columns in textbook_sections:", Object.keys(secCols[0]));
  }
}

checkCatalog().catch(console.error);
