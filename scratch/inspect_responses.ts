import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function inspect() {
  const cmRes = await supabase.from('content_modules').select('id, module_type').limit(3);
  console.log('Content modules response:', JSON.stringify(cmRes, null, 2));
}

inspect().catch(console.error);
