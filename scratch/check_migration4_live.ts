import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function checkMigration4() {
  console.log("=== CHECKING IF MIGRATION 4 IS ALREADY LIVE ===");
  const { data, error } = await supabase.from('textbook_sections').select('id, textbook_id, source_document_id').limit(1);
  console.log("textbook_sections with textbook_id & source_document_id:", { data, error });
}

checkMigration4().catch(console.error);
