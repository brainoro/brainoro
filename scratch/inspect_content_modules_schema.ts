import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function inspectColumns() {
  const minimalRecord = {
    id: 'TEST-MOD-01',
    topic_id: 'CBSE-G6-MATH-TOPIC-CH01',
    module_type: 'CONCEPT_MAPPING',
    content: { test: true },
  };

  const { data: insData, error: insErr } = await supabase.from('content_modules').insert([minimalRecord]).select();
  console.log('Minimal insert:', { insData, error: insErr });

  if (insData && insData.length > 0) {
    console.log('Detected columns from returned row:', Object.keys(insData[0]));
    await supabase.from('content_modules').delete().eq('id', 'TEST-MOD-01');
    console.log('Cleaned up test record.');
  }
}

inspectColumns().catch(console.error);
