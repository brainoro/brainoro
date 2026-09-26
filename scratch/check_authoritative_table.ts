import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function check() {
  const res = await supabase.from('authoritative_curriculum_concepts').select('*', { count: 'exact', head: true });
  console.log('head: true result:', { error: res.error, count: res.count, status: res.status });

  const res2 = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  console.log('curriculum_concepts result:', { error: res2.error, count: res2.count, status: res2.status });
}

check().catch(console.error);
