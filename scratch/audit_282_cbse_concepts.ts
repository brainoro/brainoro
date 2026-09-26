import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function inspectCBSE() {
  const { data: concepts, error } = await supabase
    .from('curriculum_concepts')
    .select('id, grade_level, subject_id, unit, title, core_logic_essence')
    .eq('board_id', 'CBSE')
    .order('grade_level', { ascending: true })
    .order('subject_id', { ascending: true });

  if (error) {
    console.error('Error fetching CBSE concepts:', error);
    return;
  }

  console.log(`Total CBSE concepts retrieved: ${concepts?.length}`);

  // Summary by grade and subject
  const summary: Record<string, number> = {};
  concepts?.forEach((c) => {
    const key = `G${c.grade_level}-${c.subject_id}`;
    summary[key] = (summary[key] || 0) + 1;
  });

  console.log('\nBreakdown by Grade & Subject:');
  console.log(JSON.stringify(summary, null, 2));

  // Print sample concepts for each grade & subject
  console.log('\nSample concepts per bucket:');
  const seen: Set<string> = new Set();
  concepts?.forEach((c) => {
    const key = `G${c.grade_level}-${c.subject_id}`;
    if (!seen.has(key)) {
      seen.add(key);
      console.log(`\n[${key}] Example: ${c.id} | Unit: "${c.unit}" | Title: "${c.title}"`);
    }
  });
}

inspectCBSE().catch(console.error);
