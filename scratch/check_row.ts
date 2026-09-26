import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function checkEvidence() {
  const { data } = await supabase.from('concept_curriculum_mappings').select('id, evidence').eq('id', '67a2261c-2430-4f68-a404-b25bb80451c4');
  console.log("Row evidence:", data);
}

checkEvidence().catch(console.error);
