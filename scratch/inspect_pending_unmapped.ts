import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function inspectPendingAndUnmapped() {
  const { data: mappings, error } = await supabase
    .from('content_modules')
    .select('id, topic_id, content')
    .eq('module_type', 'CONCEPT_MAPPING');

  if (error || !mappings) {
    console.error('Error fetching mappings:', error);
    return;
  }

  const pending = mappings.filter((m) => m.content.mapping_state === 'PENDING_REVIEW');
  const unmapped = mappings.filter((m) => m.content.mapping_state === 'UNMAPPED');

  console.log(`=== PENDING REVIEW (${pending.length}) ===`);
  pending.forEach((m) => {
    console.log(`[PENDING] ${m.content.brainoro_concept_id} (G${m.content.grade_level} ${m.content.subject_id}) -> Matched: ${m.content.matched_textbook} Ch ${m.content.chapter_number} (${m.content.chapter_title}) | Conf: ${m.content.confidence_score}`);
    console.log(`  Evidence: ${m.content.evidence}\n`);
  });

  console.log(`=== UNMAPPED (${unmapped.length}) ===`);
  unmapped.forEach((m) => {
    console.log(`[UNMAPPED] ${m.content.brainoro_concept_id} (G${m.content.grade_level} ${m.content.subject_id})`);
    console.log(`  Evidence: ${m.content.evidence}\n`);
  });
}

inspectPendingAndUnmapped().catch(console.error);
