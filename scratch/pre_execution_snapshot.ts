import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function preExecutionSnapshot() {
  const { count: cTotal } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: cCbse } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CBSE');
  const { count: cCam } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CAMBRIDGE');
  const { count: cIb } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'IB_MYP');

  const { count: tCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: cmCount } = await supabase.from('content_modules').select('*', { count: 'exact', head: true });
  const { count: acCount } = await supabase.from('authoritative_curriculum_concepts').select('*', { count: 'exact', head: true });

  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('mapping_state, authoritative_concept_id');
  const mStates: Record<string, number> = { VERIFIED: 0, PENDING_REVIEW: 0, UNMAPPED: 0, CONFLICT: 0, DEPRECATED: 0 };
  let nullAuth = 0;
  mappings?.forEach(m => {
    mStates[m.mapping_state] = (mStates[m.mapping_state] || 0) + 1;
    if (m.authoritative_concept_id === null) nullAuth++;
  });

  const { data: sections } = await supabase.from('textbook_sections').select('section_type');
  const sTypes: Record<string, number> = { AUTHENTIC: 0, LEGACY_SYNTHETIC: 0 };
  sections?.forEach(s => {
    sTypes[s.section_type] = (sTypes[s.section_type] || 0) + 1;
  });

  console.log("=== PRE-EXECUTION SNAPSHOT ===");
  console.log(JSON.stringify({
    curriculum_concepts: { total: cTotal, CBSE: cCbse, CAMBRIDGE: cCam, IB_MYP: cIb },
    topics: { total: tCount },
    content_modules: { total: cmCount },
    authoritative_curriculum_concepts: { total: acCount },
    concept_curriculum_mappings: { total: mappings?.length, ...mStates, null_auth_count: nullAuth },
    textbook_sections: { total: sections?.length, ...sTypes }
  }, null, 2));
}

preExecutionSnapshot().catch(console.error);
