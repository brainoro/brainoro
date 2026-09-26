import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function fullSourceDiscovery() {
  console.log("=== FULL SOURCE & TEXTBOOK HIERARCHY DISCOVERY ===");

  const { data: sources } = await supabase.from('curriculum_sources').select('*');
  const { data: docs } = await supabase.from('curriculum_documents').select('*');
  const { data: versions } = await supabase.from('curriculum_versions').select('*');
  const { data: textbooks } = await supabase.from('textbooks').select('*');
  const { data: chapters } = await supabase.from('textbook_chapters').select('*').order('chapter_number', { ascending: true });
  const { data: sections } = await supabase.from('textbook_sections').select('*');
  const { data: authConcepts } = await supabase.from('authoritative_curriculum_concepts').select('*');

  console.log(`Sources (${sources?.length}):`, sources);
  console.log(`Documents (${docs?.length}):`, docs);
  console.log(`Versions (${versions?.length}):`, versions);
  console.log(`Textbooks (${textbooks?.length}):`, textbooks);
  console.log(`Total Chapters: ${chapters?.length}`);
  console.log(`Total Sections: ${sections?.length}`);
  console.log(`Total Authoritative Concepts: ${authConcepts?.length}`);

  // Chapters by textbook
  const chaptersByTb: Record<string, any[]> = {};
  chapters?.forEach(c => {
    chaptersByTb[c.textbook_id] = chaptersByTb[c.textbook_id] || [];
    chaptersByTb[c.textbook_id].push({
      id: c.id,
      num: c.chapter_number,
      title: c.chapter_title
    });
  });

  const fs = await import('fs');
  fs.writeFileSync('scratch/hierarchy_discovery.json', JSON.stringify({
    sources,
    docs,
    versions,
    textbooks,
    chaptersByTb,
    sectionsCount: sections?.length,
    authConcepts
  }, null, 2));

  console.log("Wrote scratch/hierarchy_discovery.json successfully");
}

fullSourceDiscovery().catch(console.error);
