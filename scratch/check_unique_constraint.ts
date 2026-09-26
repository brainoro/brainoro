import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function checkUniqueConstraint() {
  const { data: g10MathSec } = await supabase
    .from('textbook_sections')
    .select('id, chapter_id, section_number, section_title, section_type')
    .eq('chapter_id', 'CH-NCERT-G10-MATH-01');

  console.log('Existing sections for CH-NCERT-G10-MATH-01:', g10MathSec);
}

checkUniqueConstraint().catch(console.error);
