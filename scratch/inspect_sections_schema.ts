import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function inspectSectionsSchema() {
  const { data, error } = await supabase.from('textbook_sections').select('*').limit(1);
  console.log("textbook_sections sample row:", data);
  if (data && data.length > 0) {
    console.log("textbook_sections columns:", Object.keys(data[0]));
  }
}

inspectSectionsSchema().catch(console.error);
