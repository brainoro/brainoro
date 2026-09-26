import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function testMutations() {
  console.log('--- Testing Anon INSERT on content_modules ---');
  const ins = await supabase.from('content_modules').insert({
    id: 'TEST-SECURITY-PROBE',
    board_id: 'CBSE',
    grade_level: 6,
    subject_id: 'MATH',
    topic_id: 'TOPIC-CBSE-G6-MATH-01',
    module_type: 'CONCEPT_MAPPING',
    payload_fingerprint: 'test-probe'
  });
  console.log('Insert status:', ins.status, 'Error:', ins.error);

  console.log('\n--- Testing Anon UPDATE on content_modules ---');
  const upd = await supabase.from('content_modules').update({ module_type: 'CONCEPT_MAPPING' }).eq('id', 'NON-EXISTENT');
  console.log('Update status:', upd.status, 'Error:', upd.error);

  console.log('\n--- Testing Anon DELETE on content_modules ---');
  const del = await supabase.from('content_modules').delete().eq('id', 'NON-EXISTENT');
  console.log('Delete status:', del.status, 'Error:', del.error);
}

testMutations().catch(console.error);
