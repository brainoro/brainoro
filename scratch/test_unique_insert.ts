import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function testInsert() {
  console.log('Testing insert with duplicate (chapter_id, section_number)...');
  const { data, error } = await supabase
    .from('textbook_sections')
    .insert({
      id: 'SEC-TEST-PROBE',
      chapter_id: 'CH-NCERT-G10-MATH-01',
      section_number: '1.1',
      section_title: 'Introduction',
      section_type: 'AUTHENTIC',
      textbook_id: 'TB-NCERT-G10-MATH',
      source_url: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf',
      source_locator: 'jemh101.pdf § 1.1'
    })
    .select();

  console.log('Insert result:', { data, error });
  if (data && data.length > 0) {
    // If it somehow succeeded, clean up immediately
    await supabase.from('textbook_sections').delete().eq('id', 'SEC-TEST-PROBE');
    console.log('Cleaned up test probe.');
  }
}

testInsert().catch(console.error);
