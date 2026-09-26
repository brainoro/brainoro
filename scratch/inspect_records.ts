import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function check() {
  const ids = [
    'CBSE-G6-MATH-DATA-TABLES',
    'CAMBRIDGE-G6-MATH-DATA-TABLES',
    'IB_MYP-G6-MATH-DATA-TABLES',
    'CBSE-G6-MATH-NUMSYS-INT',
    'CAMBRIDGE-G6-MATH-NUMSYS-INT',
    'IB_MYP-G6-MATH-NUMSYS-INT',
    'CBSE-G7-BIOLOGY-CIRC-HEART',
    'CAMBRIDGE-G7-BIOLOGY-CIRC-HEART',
    'IB_MYP-G7-BIOLOGY-CIRC-HEART'
  ];

  for (const id of ids) {
    const { data, error } = await supabase
      .from('curriculum_concepts')
      .select('id, board_id, grade_level, subject_id, title, metadata')
      .eq('id', id);
    console.log(`\n--- ID: ${id} ---`);
    if (error) {
      console.error('Error:', error);
    } else if (!data || data.length === 0) {
      console.log('Record NOT found with this ID');
      // Let's search by pattern
      const prefix = id.split('-').slice(0, 3).join('-');
      const { data: similar } = await supabase
        .from('curriculum_concepts')
        .select('id, title')
        .ilike('id', `%${prefix}%`);
      console.log('Similar IDs found:', similar?.map(s => s.id));
    } else {
      console.log('Found:', {
        id: data[0].id,
        board_id: data[0].board_id,
        grade_level: data[0].grade_level,
        subject_id: data[0].subject_id,
        title: data[0].title,
        fpt: data[0].metadata?.payload_fingerprint || data[0].metadata?.cornell_notes?.payloadFingerprint,
        hasNotes: !!data[0].metadata?.cornell_notes,
        trap: (data[0].metadata?.cornell_notes?.curriculumTrap || '').substring(0, 50)
      });
    }
  }
}

check().catch(console.error);
