import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function runConstraintCheck() {
  console.log("=== CHECKING CHAPTER/TEXTBOOK PAIRS & CONSTRAINTS ===");

  // 1. Check duplicate (id, textbook_id) in textbook_chapters
  const { data: chapters } = await supabase.from('textbook_chapters').select('id, textbook_id');
  const chapterPairs = new Map<string, number>();
  chapters?.forEach(c => {
    const key = `${c.id}::${c.textbook_id}`;
    chapterPairs.set(key, (chapterPairs.get(key) || 0) + 1);
  });

  let duplicateChapters = 0;
  chapterPairs.forEach((count, key) => {
    if (count > 1) duplicateChapters++;
  });
  console.log(`Total chapters: ${chapters?.length}`);
  console.log(`Duplicate (id, textbook_id) pairs: ${duplicateChapters}`);

  // 2. Check 126 sections chapter_id resolution
  const { data: sections } = await supabase.from('textbook_sections').select('*');
  console.log(`Total sections: ${sections?.length}`);

  const chapterMap = new Map<string, string>();
  chapters?.forEach(c => chapterMap.set(c.id, c.textbook_id));

  let matched = 0;
  let unmatched = 0;
  sections?.forEach(s => {
    if (chapterMap.has(s.chapter_id)) {
      matched++;
    } else {
      unmatched++;
    }
  });
  console.log(`Sections resolving to a valid chapter: ${matched} / ${sections?.length}`);
  console.log(`Unmatched sections: ${unmatched}`);
}

runConstraintCheck().catch(console.error);
