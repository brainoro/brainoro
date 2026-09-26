import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function runReportAudit() {
  console.log('================================================================');
  console.log(' BRAINORO OS — PHASE 2B.3 COMPREHENSIVE AUDIT REPORT');
  console.log('================================================================\n');

  // A. Official source inventory
  const { data: sources } = await supabase.from('curriculum_sources').select('*');
  const { data: docs } = await supabase.from('curriculum_documents').select('*');
  console.log('--- A. Official Sources & Documents ---');
  sources?.forEach((s) => console.log(`Source [${s.id}]: ${s.source_name} | Authority: ${s.publisher_authority} | URL: ${s.official_url}`));
  docs?.forEach((d) => console.log(`Document [${d.id}]: "${d.document_title}" | ID: ${d.document_identifier} | URL: ${d.document_url}`));

  // B. Curriculum versions
  const { data: versions } = await supabase.from('curriculum_versions').select('*');
  console.log('\n--- B. Curriculum Versions ---');
  versions?.forEach((v) => console.log(`Version [${v.id}]: Tag: ${v.version_tag} | Status: ${v.status}`));

  // C. Textbooks
  const { data: textbooks } = await supabase.from('textbooks').select('*');
  console.log(`\n--- C. Textbooks (Total: ${textbooks?.length}) ---`);
  textbooks?.forEach((tb) => console.log(`- [${tb.id}] G${tb.grade_level} ${tb.subject_id}: "${tb.title}" | Version: ${tb.curriculum_version_id} | Code: ${tb.isbn_or_code}`));

  // D. Chapters
  const { data: chapters } = await supabase.from('textbook_chapters').select('*');
  console.log(`\n--- D. Chapters (Total: ${chapters?.length}) ---`);

  // E. Sections
  const { data: sections } = await supabase.from('textbook_sections').select('*');
  let realSections = 0;
  let legacySyntheticSections = 0;
  sections?.forEach((s) => {
    if (s.section_title.includes('Fundamental Principles & Core Concepts')) legacySyntheticSections++;
    else realSections++;
  });
  console.log(`\n--- E. Sections ---`);
  console.log(`Total: ${sections?.length} | Real Verified: ${realSections} | Legacy Synthetic: ${legacySyntheticSections}`);

  // F. Topics
  const { data: topics } = await supabase.from('topics').select('*');
  console.log(`\n--- F. Topics (Total: ${topics?.length}) ---`);

  // G. Authoritative Concepts
  const { data: authConcepts } = await supabase.from('authoritative_curriculum_concepts').select('*');
  console.log(`\n--- G. Authoritative Concepts (Total: ${authConcepts?.length}) ---`);
  const authBreakdown: Record<string, number> = {};
  authConcepts?.forEach((ac) => {
    const key = `${ac.board_id}-G${ac.grade_level}-${ac.subject_id}-${ac.curriculum_version_id}`;
    authBreakdown[key] = (authBreakdown[key] || 0) + 1;
  });
  console.log('Breakdown by Board-Grade-Subject-Version:');
  console.log(JSON.stringify(authBreakdown, null, 2));

  // H. Verification-state breakdown on authConcepts
  const authStates: Record<string, number> = {};
  authConcepts?.forEach((ac) => {
    authStates[ac.verification_status] = (authStates[ac.verification_status] || 0) + 1;
  });
  console.log('Verification Status Breakdown on Authoritative Concepts:');
  console.log(JSON.stringify(authStates, null, 2));

  // I. Source provenance completeness
  let missingSourceId = 0;
  let missingDocId = 0;
  let missingEvidence = 0;
  let fabricatedCodes = 0;
  authConcepts?.forEach((ac) => {
    if (!ac.source_id) missingSourceId++;
    if (!ac.source_document_id) missingDocId++;
    if (!ac.evidence) missingEvidence++;
    if (ac.official_concept_code !== null) fabricatedCodes++;
  });
  console.log(`Provenance Completeness:`);
  console.log(`- Missing source_id:       ${missingSourceId}`);
  console.log(`- Missing doc_id:          ${missingDocId}`);
  console.log(`- Missing evidence:        ${missingEvidence}`);
  console.log(`- Fabricated concept codes: ${fabricatedCodes} (MUST BE 0)`);

  // J. Existing mapping state
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('*');
  const mStates: Record<string, number> = {};
  mappings?.forEach((m) => {
    mStates[m.mapping_state] = (mStates[m.mapping_state] || 0) + 1;
  });
  console.log('\n--- J. Mapping States ---');
  console.log(JSON.stringify(mStates, null, 2));

  // K. 14 UNMAPPED evidence status
  const unmapped = mappings?.filter((m) => m.mapping_state === 'UNMAPPED') || [];
  console.log(`\n--- K. UNMAPPED Concepts (${unmapped.length}) ---`);
  unmapped.forEach((u) => console.log(`- ${u.brainoro_concept_id}: ${u.evidence}`));

  // L. Isolation validation
  let crossBoard = 0;
  let crossGrade = 0;
  let crossVersion = 0;
  authConcepts?.forEach((ac) => {
    if (ac.board_id !== 'CBSE') crossBoard++;
    if (ac.grade_level < 6 || ac.grade_level > 10) crossGrade++;
  });
  console.log(`\n--- L. Isolation Validation ---`);
  console.log(`- Cross-board contamination: ${crossBoard}`);
  console.log(`- Cross-grade contamination: ${crossGrade}`);
  console.log(`- Cross-version contamination: ${crossVersion}`);

  // M. Duplicate / Orphan validation
  const authIds = new Set<string>();
  let duplicateAuthIds = 0;
  authConcepts?.forEach((ac) => {
    if (authIds.has(ac.id)) duplicateAuthIds++;
    authIds.add(ac.id);
  });

  const tbIds = new Set(textbooks?.map((tb) => tb.id) || []);
  const chIds = new Set(chapters?.map((ch) => ch.id) || []);
  let orphanTbInAuth = 0;
  let orphanChInAuth = 0;

  authConcepts?.forEach((ac) => {
    if (ac.textbook_id && !tbIds.has(ac.textbook_id)) orphanTbInAuth++;
    if (ac.chapter_id && !chIds.has(ac.chapter_id)) orphanChInAuth++;
  });

  console.log(`\n--- M. Duplicate & Orphan Validation ---`);
  console.log(`- Duplicate Auth Concept IDs: ${duplicateAuthIds}`);
  console.log(`- Orphan Textbook references: ${orphanTbInAuth}`);
  console.log(`- Orphan Chapter references:  ${orphanChInAuth}`);

  // N. 846 preservation
  const { count: cCount } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: cbseCount } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CBSE');
  const { count: camCount } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CAMBRIDGE');
  const { count: ibCount } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'IB_MYP');
  console.log(`\n--- N. 846 Concept Preservation ---`);
  console.log(`Total: ${cCount} (CBSE: ${cbseCount}, CAMBRIDGE: ${camCount}, IB_MYP: ${ibCount})`);
}

runReportAudit().catch(console.error);
