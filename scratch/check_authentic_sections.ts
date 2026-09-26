import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function checkAuthentic() {
  const sec = await supabase
    .from('textbook_sections')
    .select('id, section_number, section_title, source_document_id')
    .eq('source_document_id', 'DOC-NCERT-TB-G10-MATH-2026');
  console.log(`Authentic G10 NCERT Math Sections pointing to DOC-NCERT-TB-G10-MATH-2026: count = ${sec.data?.length}`);

  // Total sections breakdown
  const allSec = await supabase.from('textbook_sections').select('id, source_type');
  const typeCounts: Record<string, number> = {};
  allSec.data?.forEach((s: any) => {
    typeCounts[s.source_type] = (typeCounts[s.source_type] || 0) + 1;
  });
  console.log('Total textbook_sections count:', allSec.data?.length);
  console.log('Breakdown by source_type:', typeCounts);
}

checkAuthentic().catch(console.error);
