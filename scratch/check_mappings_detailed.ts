import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function checkMappings() {
  const { data: mappings, error: mErr } = await supabase.from('concept_curriculum_mappings').select('*');
  if (mErr) console.error("Mappings error:", mErr);
  console.log("Total mappings:", mappings?.length);

  const statusCounts: Record<string, number> = {};
  mappings?.forEach(m => {
    statusCounts[m.verification_status] = (statusCounts[m.verification_status] || 0) + 1;
  });
  console.log("Status counts:", statusCounts);

  const unmapped = mappings?.filter(m => m.verification_status === 'UNMAPPED');
  console.log("Unmapped count:", unmapped?.length);
  console.log("Unmapped sample:", JSON.stringify(unmapped, null, 2));

  // Also query all 17 authoritative concepts
  const { data: authConcepts, error: aErr } = await supabase.from('authoritative_curriculum_concepts').select('*');
  if (aErr) console.error("Auth concepts error:", aErr);
  console.log("Total authoritative concepts:", authConcepts?.length);
  console.log("Auth concepts:", JSON.stringify(authConcepts, null, 2));
}

checkMappings().catch(console.error);
