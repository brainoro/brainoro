import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function testEmbedding() {
  const { data, error } = await supabase
    .from('concept_curriculum_mappings')
    .select(`
      id,
      curriculum_version_id,
      authoritative_concept_id,
      authoritative_curriculum_concepts!fk_mapping_auth_version (
        id,
        curriculum_version_id,
        official_title
      )
    `)
    .limit(1);

  console.log("Embedded query with fk_mapping_auth_version:", { success: !error, error: error?.message, data });
}

testEmbedding().catch(console.error);
