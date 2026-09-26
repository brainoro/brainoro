import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function runAudit() {
  console.log('================================================================');
  console.log(' BRAINORO OS — STRICT READ-ONLY PROVENANCE AUDIT');
  console.log('================================================================\n');

  // 1. Curriculum Versions & Academic Years
  console.log('=== 1. CURRICULUM VERSIONS & ACADEMIC YEARS ===');
  const { data: academicYears } = await supabase.from('academic_years').select('*');
  const { data: curriculumVersions } = await supabase.from('curriculum_versions').select('*');
  console.log('academic_years:', JSON.stringify(academicYears, null, 2));
  console.log('curriculum_versions:', JSON.stringify(curriculumVersions, null, 2));

  // 2. Sources & Documents
  console.log('\n=== 2. SOURCES & DOCUMENTS ===');
  const { data: sources } = await supabase.from('curriculum_sources').select('*');
  const { data: docs } = await supabase.from('curriculum_documents').select('*');
  console.log('curriculum_sources:', JSON.stringify(sources, null, 2));
  console.log('curriculum_documents:', JSON.stringify(docs, null, 2));

  // 3. Textbooks
  console.log('\n=== 3. TEXTBOOKS ===');
  const { data: textbooks } = await supabase.from('textbooks').select('*').order('grade_level').order('subject_id');
  console.log('textbooks count:', textbooks?.length);
  textbooks?.forEach((t) => {
    console.log(`- [${t.id}] Grade ${t.grade_level} ${t.subject_id}: "${t.title}" | Pub: ${t.publisher} | Ed: ${t.edition_or_version} | URL: ${t.official_url} | Code: ${t.isbn_or_code}`);
  });

  // 4. Chapters
  console.log('\n=== 4. CHAPTERS ===');
  const { data: chapters } = await supabase.from('textbook_chapters').select('*').order('textbook_id').order('chapter_number');
  console.log('chapters count:', chapters?.length);
  // Group by textbook
  const chaptersByTb: Record<string, any[]> = {};
  chapters?.forEach((ch) => {
    if (!chaptersByTb[ch.textbook_id]) chaptersByTb[ch.textbook_id] = [];
    chaptersByTb[ch.textbook_id].push(ch);
  });
  for (const [tbId, chList] of Object.entries(chaptersByTb)) {
    console.log(`\nTextbook ${tbId} (${chList.length} chapters):`);
    chList.forEach((c) => console.log(`  Ch ${c.chapter_number}: "${c.chapter_title}" (ID: ${c.id})`));
  }

  // 5. Sections
  console.log('\n=== 5. SECTIONS ===');
  const { data: sections } = await supabase.from('textbook_sections').select('*').limit(20);
  const { count: totalSections } = await supabase.from('textbook_sections').select('*', { count: 'exact', head: true });
  console.log(`total sections count: ${totalSections}`);
  console.log('Sample sections (first 10):');
  sections?.slice(0, 10).forEach((s) => {
    console.log(`- ID: ${s.id} | Ch: ${s.chapter_id} | Sec: ${s.section_number} | Title: "${s.section_title}"`);
  });

  // 6. Topics
  console.log('\n=== 6. TOPICS ===');
  const { data: topics } = await supabase.from('topics').select('*');
  console.log('topics count:', topics?.length);
  console.log('Sample topic:');
  if (topics && topics.length > 0) {
    console.log(JSON.stringify(topics[0], null, 2));
  }

  // 7. Concept Curriculum Mappings
  console.log('\n=== 7. CONCEPT CURRICULUM MAPPINGS ===');
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('*');
  console.log('mappings count:', mappings?.length);

  const stateCounts: Record<string, number> = {};
  mappings?.forEach((m) => {
    stateCounts[m.mapping_state] = (stateCounts[m.mapping_state] || 0) + 1;
  });
  console.log('State counts:', stateCounts);

  // 8. Validation Results
  console.log('\n=== 8. VALIDATION RESULTS ===');
  const { data: valResults } = await supabase.from('curriculum_validation_results').select('*');
  console.log('validation results count:', valResults?.length);
  const valSeverity: Record<string, number> = {};
  valResults?.forEach((v) => {
    valSeverity[v.severity] = (valSeverity[v.severity] || 0) + 1;
  });
  console.log('Validation results by severity:', valSeverity);

  // 9. Existing concept preservation
  console.log('\n=== 9. EXISTING CONCEPT PRESERVATION ===');
  const { count: totalConcepts } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: cbseConcepts } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CBSE');
  const { count: cambridgeConcepts } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CAMBRIDGE');
  const { count: ibConcepts } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'IB_MYP');
  console.log({ totalConcepts, cbseConcepts, cambridgeConcepts, ibConcepts });
}

runAudit().catch(console.error);
