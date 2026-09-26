import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

async function verifyPhase2C32() {
  console.log('=== PHASE 2C.3.2 POST-MIGRATION LIVE VERIFICATION ===\n');

  // 1. textbook_sections schema & columns check
  console.log('1. Checking textbook_sections columns...');
  const { data: sectionCols, error: colError } = await supabase
    .from('textbook_sections')
    .select('id, chapter_id, section_number, section_title, section_type, textbook_id, source_document_id, source_url, source_page, source_locator, evidence_excerpt')
    .limit(5);

  if (colError) {
    console.error('Error selecting textbook_sections columns:', colError);
  } else {
    console.log('Successfully queried all new columns on textbook_sections:', Object.keys(sectionCols[0]));
  }

  // 2. Existing section preservation
  console.log('\n2. Checking existing section preservation...');
  const { data: allSections, error: secError } = await supabase
    .from('textbook_sections')
    .select('*');

  if (secError) {
    console.error('Error fetching sections:', secError);
  } else {
    const totalSec = allSections.length;
    const authenticSec = allSections.filter(s => s.section_type === 'AUTHENTIC').length;
    const legacySec = allSections.filter(s => s.section_type === 'LEGACY_SYNTHETIC').length;
    const populatedTb = allSections.filter(s => s.textbook_id !== null && s.textbook_id !== undefined && s.textbook_id !== '').length;
    const nullTb = allSections.filter(s => s.textbook_id === null || s.textbook_id === undefined).length;

    console.log(`Total sections: ${totalSec} (expected 126)`);
    console.log(`AUTHENTIC sections: ${authenticSec} (expected 0)`);
    console.log(`LEGACY_SYNTHETIC sections: ${legacySec} (expected 126)`);
    console.log(`Textbook ID populated: ${populatedTb} / ${totalSec}`);
    console.log(`Textbook ID NULL count: ${nullTb} (expected 0)`);
  }

  // 3. Hierarchy integrity & backfill check against chapters
  console.log('\n3. Checking hierarchy integrity & backfill resolution...');
  const { data: chapters } = await supabase.from('textbook_chapters').select('id, textbook_id');
  const chapterMap = new Map<string, string>();
  chapters?.forEach(c => chapterMap.set(c.id, c.textbook_id));

  let hierarchyMismatches = 0;
  let orphans = 0;
  allSections?.forEach(s => {
    const expectedTb = chapterMap.get(s.chapter_id);
    if (!expectedTb) {
      orphans++;
    } else if (s.textbook_id !== expectedTb) {
      hierarchyMismatches++;
    }
  });
  console.log(`Orphan sections (no matching chapter): ${orphans}`);
  console.log(`Hierarchy mismatches (section.textbook_id != chapter.textbook_id): ${hierarchyMismatches}`);

  // 4. Preservation regression counts
  console.log('\n4. Checking preservation regression counts...');
  const { count: cTotal } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: cCbse } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CBSE');
  const { count: cCam } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CAMBRIDGE');
  const { count: cIb } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'IB_MYP');

  const { count: tCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: cmCount } = await supabase.from('content_modules').select('*', { count: 'exact', head: true });
  const { count: acCount } = await supabase.from('authoritative_curriculum_concepts').select('*', { count: 'exact', head: true });

  console.log(`curriculum_concepts: total=${cTotal} (CBSE=${cCbse}, CAMBRIDGE=${cCam}, IB_MYP=${cIb})`);
  console.log(`topics: total=${tCount}`);
  console.log(`content_modules: total=${cmCount}`);
  console.log(`authoritative_curriculum_concepts: total=${acCount}`);

  // 5. Concept curriculum mappings check
  console.log('\n5. Checking concept_curriculum_mappings...');
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('mapping_state, authoritative_concept_id');
  const mStates: Record<string, number> = { VERIFIED: 0, PENDING_REVIEW: 0, UNMAPPED: 0, CONFLICT: 0, DEPRECATED: 0 };
  let nullAuth = 0;
  mappings?.forEach(m => {
    mStates[m.mapping_state] = (mStates[m.mapping_state] || 0) + 1;
    if (m.authoritative_concept_id === null) nullAuth++;
  });
  console.log(`Mappings: total=${mappings?.length}, VERIFIED=${mStates.VERIFIED}, PENDING_REVIEW=${mStates.PENDING_REVIEW}, UNMAPPED=${mStates.UNMAPPED}, CONFLICT=${mStates.CONFLICT}, DEPRECATED=${mStates.DEPRECATED}`);
  console.log(`authoritative_concept_id NULL count: ${nullAuth} / ${mappings?.length}`);

  // 6. Authoritative concepts check (17 rows, section_id NULL, titles intact)
  console.log('\n6. Checking authoritative_curriculum_concepts (17 rows)...');
  const { data: authConcepts } = await supabase.from('authoritative_curriculum_concepts').select('*');
  console.log(`Authoritative concepts fetched: ${authConcepts?.length}`);
  const nullSecAuth = authConcepts?.filter(ac => ac.section_id === null).length;
  console.log(`Authoritative concepts with section_id = NULL: ${nullSecAuth} / ${authConcepts?.length}`);
  const titlesValid = authConcepts?.filter(ac => ac.official_title && ac.official_title.length > 0).length;
  console.log(`Authoritative concepts with valid official_title: ${titlesValid} / ${authConcepts?.length}`);

  // 7. Check trigger / function metadata if possible (or inspect via RPC if present)
  console.log('\n=== VERIFICATION SUMMARY COMPLETE ===');
}

verifyPhase2C32().catch(console.error);
