import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function checkPedagogy() {
  console.log('--- 1. G6 GANITA PRAKASH CH 2 (TB-NCERT-G6-MATH-2024) ---');
  const ch = await supabase
    .from('textbook_chapters')
    .select('id, chapter_number, chapter_title, textbook_id')
    .eq('textbook_id', 'TB-NCERT-G6-MATH-2024')
    .eq('chapter_number', 2);
  console.log('Ganita Prakash Chapter 2:', ch.data);

  if (ch.data && ch.data.length > 0) {
    const chId = ch.data[0].id;
    const sec = await supabase
      .from('textbook_sections')
      .select('id, section_number, section_title')
      .eq('chapter_id', chId)
      .order('section_number', { ascending: true });
    console.log(`Live section count in Ch 2: ${sec.data?.length} (Statutory Expected: 11)`);
    sec.data?.forEach(s => console.log(`  §${s.section_number}: ${s.section_title}`));

    const reflex = sec.data?.find(s => s.section_number === '2.11' || s.section_title?.toLowerCase().includes('reflex'));
    console.log('\nReflex Angle in Section 2.11:', reflex);
  }

  console.log('\n--- 2. G10 NCERT AUTHENTIC SECTIONS ---');
  const g10Chapters = await supabase
    .from('textbook_chapters')
    .select('id, textbook_id, chapter_number')
    .in('textbook_id', ['TB-NCERT-G10-MATH', 'TB-NCERT-G10-SCIENCE']);
  
  if (g10Chapters.data) {
    const g10Ids = g10Chapters.data.map(c => c.id);
    const g10Sec = await supabase
      .from('textbook_sections')
      .select('id, section_number, section_title')
      .in('chapter_id', g10Ids);
    console.log(`Live G10 NCERT Section Count: ${g10Sec.data?.length} (Statutory Expected: 41)`);
  }
}

checkPedagogy().catch(console.error);
