import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function inspect() {
  const { data } = await supabase
    .from('curriculum_concepts')
    .select('id, metadata')
    .in('id', ['CBSE-G6-MATH-NUMSYS-INT', 'CBSE-G9-MATH-LINEQ', 'CBSE-G10-PHYSICS-OPT-LENS']);

  if (!data) return;
  for (const c of data) {
    console.log('================================================================');
    console.log('ID:', c.id);
    console.log('--- mainNotes ---');
    console.log(c.metadata?.cornell_notes?.mainNotes);
    console.log('--- curriculumTrap ---');
    console.log(c.metadata?.cornell_notes?.curriculumTrap);
  }
}

inspect().catch(console.error);
