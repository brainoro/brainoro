import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function check() {
  const { data, error, count } = await supabase
    .from('authoritative_curriculum_concepts')
    .select('*', { count: 'exact' })
    .limit(1);

  console.log('Query authoritative_curriculum_concepts:');
  console.log({ data, error, count });
}

check().catch(console.error);
