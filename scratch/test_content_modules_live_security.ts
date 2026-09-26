import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const anonClient = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function main() {
  console.log('=== 1. ANONYMOUS SELECT ON CONTENT_MODULES ===');
  const selRes = await anonClient.from('content_modules').select('id, module_type').limit(5);
  console.log('Select Result:', {
    status: selRes.status,
    statusText: selRes.statusText,
    data: selRes.data,
    count: selRes.data?.length ?? 0,
    error: selRes.error
  });

  console.log('\n=== 2. ANONYMOUS INSERT ON CONTENT_MODULES ===');
  const insRes = await anonClient.from('content_modules').insert({
    id: 'PROBE-ANON-INSERT',
    topic_id: 'TOPIC-CBSE-G6-MATH-01',
    module_type: 'CONCEPT_MAPPING',
    content: {}
  });
  console.log('Insert Result:', {
    status: insRes.status,
    statusText: insRes.statusText,
    error: insRes.error
  });

  console.log('\n=== 3. ANONYMOUS UPDATE ON CONTENT_MODULES ===');
  const updRes = await anonClient
    .from('content_modules')
    .update({ module_type: 'CONCEPT_MAPPING' })
    .eq('id', 'MAP-CBSE-G6-MATH-NUMSYS-PRIMES');
  console.log('Update Result:', {
    status: updRes.status,
    statusText: updRes.statusText,
    error: updRes.error
  });

  console.log('\n=== 4. ANONYMOUS DELETE ON CONTENT_MODULES ===');
  const delRes = await anonClient
    .from('content_modules')
    .delete()
    .eq('id', 'MAP-CBSE-G6-MATH-NUMSYS-PRIMES');
  console.log('Delete Result:', {
    status: delRes.status,
    statusText: delRes.statusText,
    error: delRes.error
  });

  console.log('\n=== 10. ANONYMOUS ACTIVE PLAN CATALOG ===');
  const plansRes = await anonClient.from('plans').select('plan_id, name, is_active');
  console.log('Plans Result:', {
    status: plansRes.status,
    count: plansRes.data?.length ?? 0,
    plans: plansRes.data,
    error: plansRes.error
  });
}

main().catch(console.error);
