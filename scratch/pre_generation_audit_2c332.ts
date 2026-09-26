import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function preGenerationAudit() {
  console.log("=== PRE-GENERATION AUDIT 2C.3.3.2 ===\n");

  // 1. Inspect curriculum_documents
  const { data: docs, error: docErr } = await supabase.from('curriculum_documents').select('*');
  console.log("1. curriculum_documents:", docs);

  // Check for any duplicate on URL or identifier
  const targetUrl = 'https://ncert.nic.in/textbook.php?jemh1=0-14';
  const targetIdentifier = 'NCERT/TB/G10/MATH/jemh1';
  const targetId = 'DOC-NCERT-TB-G10-MATH-2026';

  const conflictingDoc = docs?.find(d => 
    d.id === targetId || 
    d.document_url === targetUrl || 
    d.document_identifier === targetIdentifier
  );
  console.log("Conflicting document found:", conflictingDoc || "None (clean to insert)");

  // 2. Inspect curriculum_sources
  const { data: sources } = await supabase.from('curriculum_sources').select('*');
  console.log("\n2. curriculum_sources:", sources);
  const ncertSource = sources?.find(s => s.id === 'SRC-NCERT-OFFICIAL');
  console.log("SRC-NCERT-OFFICIAL exists:", !!ncertSource);

  // 3. Inspect curriculum_versions
  const { data: versions } = await supabase.from('curriculum_versions').select('*');
  console.log("\n3. curriculum_versions:", versions);
  const targetVersion = versions?.find(v => v.id === 'CBSE-2026-27-OFFICIAL');
  console.log("CBSE-2026-27-OFFICIAL exists:", !!targetVersion);

  // 4. Inspect textbook TB-NCERT-G10-MATH
  const { data: tb } = await supabase.from('textbooks').select('*').eq('id', 'TB-NCERT-G10-MATH').single();
  console.log("\n4. TB-NCERT-G10-MATH:", tb);

  // 5. Inspect chapters of TB-NCERT-G10-MATH
  const { data: chapters } = await supabase
    .from('textbook_chapters')
    .select('id, chapter_number, chapter_title, textbook_id')
    .eq('textbook_id', 'TB-NCERT-G10-MATH')
    .order('chapter_number', { ascending: true });
  console.log(`\n5. Chapters of TB-NCERT-G10-MATH (${chapters?.length}):`, chapters);

  // 6. Inspect textbook_sections sample & existing section_type
  const { data: sections } = await supabase
    .from('textbook_sections')
    .select('id, chapter_id, section_number, section_title, section_type, textbook_id')
    .eq('textbook_id', 'TB-NCERT-G10-MATH')
    .order('section_number', { ascending: true });
  console.log(`\n6. Existing sections for TB-NCERT-G10-MATH (${sections?.length}):`, sections);
}

preGenerationAudit().catch(console.error);
