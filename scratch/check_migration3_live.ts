import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function checkLive() {
  const { data: sData, error: sErr } = await supabase.from('textbook_sections').select('section_type').limit(1);
  console.log("textbook_sections.section_type:", { data: sData, error: sErr });

  const { data: mData, error: mErr } = await supabase.from('concept_curriculum_mappings').select('curriculum_disposition').limit(1);
  console.log("concept_curriculum_mappings.curriculum_disposition:", { data: mData, error: mErr });

  const { data: aData, error: aErr } = await supabase.from('authoritative_curriculum_concepts').select('statutory_title').limit(1);
  console.log("authoritative_curriculum_concepts.statutory_title:", { data: aData, error: aErr });
}

checkLive().catch(console.error);
