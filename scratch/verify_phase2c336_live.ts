import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gyjlrgudysqabwbhaskr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amxyZ3VkeXNxYWJ3Ymhhc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI1ODUsImV4cCI6MjEwNDk4ODU4NX0.N_SDVcl0PoN39n9sHApC_nEy8fI0xRqhj3IFvG6zbeI';

const supabase = createClient(supabaseUrl, supabaseKey);

const APPROVED_TREE: Record<string, string> = {
  'SEC-NCERT-G10-MATH-1-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-1-2-AUTH': 'The Fundamental Theorem of Arithmetic',
  'SEC-NCERT-G10-MATH-1-3-AUTH': 'Revisiting Irrational Numbers',
  'SEC-NCERT-G10-MATH-2-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-2-2-AUTH': 'Geometrical Meaning of the Zeroes of a Polynomial',
  'SEC-NCERT-G10-MATH-2-3-AUTH': 'Relationship between Zeroes and Coefficients of a Polynomial',
  'SEC-NCERT-G10-MATH-3-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-3-2-AUTH': 'Graphical Method of Solution of a Pair of Linear Equations',
  'SEC-NCERT-G10-MATH-3-3-AUTH': 'Algebraic Methods of Solving a Pair of Linear Equations',
  'SEC-NCERT-G10-MATH-4-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-4-2-AUTH': 'Quadratic Equations',
  'SEC-NCERT-G10-MATH-4-3-AUTH': 'Solution of a Quadratic Equation by Factorisation',
  'SEC-NCERT-G10-MATH-4-4-AUTH': 'Nature of Roots',
  'SEC-NCERT-G10-MATH-5-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-5-2-AUTH': 'Arithmetic Progressions',
  'SEC-NCERT-G10-MATH-5-3-AUTH': 'nth Term of an AP',
  'SEC-NCERT-G10-MATH-5-4-AUTH': 'Sum of First n Terms of an AP',
  'SEC-NCERT-G10-MATH-6-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-6-2-AUTH': 'Similar Figures',
  'SEC-NCERT-G10-MATH-6-3-AUTH': 'Similarity of Triangles',
  'SEC-NCERT-G10-MATH-6-4-AUTH': 'Criteria for Similarity of Triangles',
  'SEC-NCERT-G10-MATH-7-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-7-2-AUTH': 'Distance Formula',
  'SEC-NCERT-G10-MATH-7-3-AUTH': 'Section Formula',
  'SEC-NCERT-G10-MATH-8-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-8-2-AUTH': 'Trigonometric Ratios',
  'SEC-NCERT-G10-MATH-8-3-AUTH': 'Trigonometric Ratios of Some Specific Angles',
  'SEC-NCERT-G10-MATH-8-4-AUTH': 'Trigonometric Identities',
  'SEC-NCERT-G10-MATH-9-1-AUTH': 'Heights and Distances',
  'SEC-NCERT-G10-MATH-10-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-10-2-AUTH': 'Tangent to a Circle',
  'SEC-NCERT-G10-MATH-10-3-AUTH': 'Number of Tangents from a Point on a Circle',
  'SEC-NCERT-G10-MATH-11-1-AUTH': 'Areas of Sector and Segment of a Circle',
  'SEC-NCERT-G10-MATH-12-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-12-2-AUTH': 'Surface Area of a Combination of Solids',
  'SEC-NCERT-G10-MATH-12-3-AUTH': 'Volume of a Combination of Solids',
  'SEC-NCERT-G10-MATH-13-1-AUTH': 'Introduction',
  'SEC-NCERT-G10-MATH-13-2-AUTH': 'Mean of Grouped Data',
  'SEC-NCERT-G10-MATH-13-3-AUTH': 'Mode of Grouped Data',
  'SEC-NCERT-G10-MATH-13-4-AUTH': 'Median of Grouped Data',
  'SEC-NCERT-G10-MATH-14-1-AUTH': 'Probability — A Theoretical Approach'
};

const EXPECTED_CHAP_COUNTS: Record<string, number> = {
  'CH-NCERT-G10-MATH-01': 3,
  'CH-NCERT-G10-MATH-02': 3,
  'CH-NCERT-G10-MATH-03': 3,
  'CH-NCERT-G10-MATH-04': 4,
  'CH-NCERT-G10-MATH-05': 4,
  'CH-NCERT-G10-MATH-06': 4,
  'CH-NCERT-G10-MATH-07': 3,
  'CH-NCERT-G10-MATH-08': 4,
  'CH-NCERT-G10-MATH-09': 1,
  'CH-NCERT-G10-MATH-10': 3,
  'CH-NCERT-G10-MATH-11': 1,
  'CH-NCERT-G10-MATH-12': 3,
  'CH-NCERT-G10-MATH-13': 4,
  'CH-NCERT-G10-MATH-14': 1
};

async function runLiveVerification() {
  console.log('================================================================');
  console.log('PHASE 2C.3.3.6 — LIVE SUPABASE VERIFICATION');
  console.log('================================================================\n');

  // 1. TEXTBOOK SECTIONS COUNTS
  const { data: allSections, error: secErr } = await supabase
    .from('textbook_sections')
    .select('*');

  if (secErr) {
    console.error('CRITICAL ERROR fetching textbook_sections:', secErr);
    return;
  }

  const totalSec = allSections.length;
  const authSections = allSections.filter(s => s.section_type === 'AUTHENTIC');
  const legacySections = allSections.filter(s => s.section_type === 'LEGACY_SYNTHETIC');

  console.log('1. TEXTBOOK SECTIONS COUNTS:');
  console.log(`   - Total sections: ${totalSec} (expected: 167)`);
  console.log(`   - AUTHENTIC count: ${authSections.length} (expected: 41)`);
  console.log(`   - LEGACY_SYNTHETIC count: ${legacySections.length} (expected: 126)`);

  // 2. AUTHENTIC NCERT SECTION TREE
  console.log('\n2. AUTHENTIC NCERT SECTION TREE (Chapter-by-Chapter):');
  const actualChapCounts: Record<string, number> = {};
  authSections.forEach(s => {
    actualChapCounts[s.chapter_id] = (actualChapCounts[s.chapter_id] || 0) + 1;
  });

  let chapCountsPass = true;
  for (const [chapId, expCount] of Object.entries(EXPECTED_CHAP_COUNTS)) {
    const actCount = actualChapCounts[chapId] || 0;
    const match = actCount === expCount;
    if (!match) chapCountsPass = false;
    console.log(`   - ${chapId}: actual=${actCount}, expected=${expCount} -> ${match ? 'PASS' : 'FAIL'}`);
  }

  console.log('\n   Verifying exact titles & section numbers against approved tree:');
  let titlesPass = true;
  for (const [secId, expTitle] of Object.entries(APPROVED_TREE)) {
    const found = authSections.find(s => s.id === secId);
    if (!found) {
      console.log(`   - MISSING: ${secId}`);
      titlesPass = false;
    } else if (found.section_title !== expTitle) {
      console.log(`   - TITLE MISMATCH on ${secId}: actual="${found.section_title}", expected="${expTitle}"`);
      titlesPass = false;
    }
  }
  console.log(`   Titles & Numbers verification: ${titlesPass ? 'ALL 41 PASS' : 'FAIL'}`);

  // 3. EXCLUSION CHECKS
  console.log('\n3. EXCLUSION CHECKS:');
  const summaryRows = authSections.filter(s => s.section_title.toLowerCase().includes('summary'));
  const subRows = authSections.filter(s => s.section_number.includes('3.3.1') || s.section_number.includes('3.3.2'));
  const ch9Exclusions = authSections.filter(s => s.chapter_id === 'CH-NCERT-G10-MATH-09' && s.section_number !== '9.1');
  const ch11Exclusions = authSections.filter(s => s.chapter_id === 'CH-NCERT-G10-MATH-11' && s.section_number !== '11.1');
  const ch14Exclusions = authSections.filter(s => s.chapter_id === 'CH-NCERT-G10-MATH-14' && s.section_number !== '14.1');
  const fabIntro = authSections.filter(s => 
    ['CH-NCERT-G10-MATH-09', 'CH-NCERT-G10-MATH-11', 'CH-NCERT-G10-MATH-14'].includes(s.chapter_id) && 
    s.section_title.toLowerCase().includes('introduction')
  );

  console.log(`   - Summary rows: ${summaryRows.length} (expected: 0)`);
  console.log(`   - 3.3.1 / 3.3.2 rows: ${subRows.length} (expected: 0)`);
  console.log(`   - Chapter 9 non-9.1 rows: ${ch9Exclusions.length} (expected: 0)`);
  console.log(`   - Chapter 11 non-11.1 rows: ${ch11Exclusions.length} (expected: 0)`);
  console.log(`   - Chapter 14 non-14.1 rows: ${ch14Exclusions.length} (expected: 0)`);
  console.log(`   - Fabricated Introductions in Ch 9, 11, 14: ${fabIntro.length} (expected: 0)`);

  // 4. PROVENANCE
  console.log('\n4. PROVENANCE VERIFICATION:');
  const nonNcertDoc = authSections.filter(s => s.source_document_id !== 'DOC-NCERT-TB-G10-MATH-2026');
  const cbseDocAuth = authSections.filter(s => s.source_document_id === 'DOC-CBSE-SEC-2026');
  const nonNcertTb = authSections.filter(s => s.textbook_id !== 'TB-NCERT-G10-MATH');

  console.log(`   - Authentic rows with source_document_id != DOC-NCERT-TB-G10-MATH-2026: ${nonNcertDoc.length} (expected: 0)`);
  console.log(`   - Authentic rows referencing DOC-CBSE-SEC-2026: ${cbseDocAuth.length} (expected: 0)`);
  console.log(`   - Authentic rows with textbook_id != TB-NCERT-G10-MATH: ${nonNcertTb.length} (expected: 0)`);

  // 5. URL INTEGRITY
  console.log('\n5. URL INTEGRITY:');
  let malformedUrls = 0;
  let markdownUrls = 0;
  let nonNcertUrls = 0;
  authSections.forEach(s => {
    if (!s.source_url) {
      malformedUrls++;
    } else {
      if (s.source_url.includes('[') || s.source_url.includes('](')) markdownUrls++;
      if (!s.source_url.startsWith('https://ncert.nic.in/textbook/pdf/jemh1')) nonNcertUrls++;
    }
  });
  console.log(`   - Malformed URLs: ${malformedUrls} (expected: 0)`);
  console.log(`   - Markdown URLs: ${markdownUrls} (expected: 0)`);
  console.log(`   - Non-NCERT canonical URLs: ${nonNcertUrls} (expected: 0)`);

  // 6. SECTION HIERARCHY
  console.log('\n6. SECTION HIERARCHY & COEXISTENCE:');
  const { data: chapters } = await supabase.from('textbook_chapters').select('id, textbook_id');
  const { data: textbooks } = await supabase.from('textbooks').select('*');
  const chapMap = new Map<string, string>();
  chapters?.forEach(c => chapMap.set(c.id, c.textbook_id));
  const tbMap = new Map<string, any>();
  textbooks?.forEach(tb => tbMap.set(tb.id, tb));

  let hierarchyMismatches = 0;
  authSections.forEach(s => {
    const tbId = chapMap.get(s.chapter_id);
    const tb = tbMap.get(s.textbook_id);
    if (tbId !== s.textbook_id || !tb || tb.board_id !== 'CBSE' || tb.grade_level !== 10 || tb.subject_id !== 'MATH' || tb.curriculum_version_id !== 'CBSE-2026-27-OFFICIAL') {
      hierarchyMismatches++;
    }
  });
  console.log(`   - Hierarchy / Educational identity mismatches: ${hierarchyMismatches} (expected: 0)`);

  // Check coexistence of .1 sections
  const dotOneSections = allSections.filter(s => s.section_number.endsWith('.1'));
  const dotOneByChap: Record<string, string[]> = {};
  dotOneSections.forEach(s => {
    dotOneByChap[s.chapter_id] = dotOneByChap[s.chapter_id] || [];
    dotOneByChap[s.chapter_id].push(s.section_type);
  });
  let coexistingChaps = 0;
  for (const [chapId, types] of Object.entries(dotOneByChap)) {
    if (types.includes('AUTHENTIC') && types.includes('LEGACY_SYNTHETIC')) {
      coexistingChaps++;
    }
  }
  console.log(`   - Chapters coexisting AUTHENTIC + LEGACY_SYNTHETIC on .1: ${coexistingChaps} / 14 (expected: 14)`);

  // 7. LEGACY PRESERVATION
  console.log('\n7. LEGACY PRESERVATION:');
  const legacyWithDoc = legacySections.filter(s => s.source_document_id !== null);
  console.log(`   - LEGACY_SYNTHETIC sections count: ${legacySections.length} (expected: 126)`);
  console.log(`   - LEGACY_SYNTHETIC sections with modified source_document_id: ${legacyWithDoc.length} (expected: 0)`);

  // 8. CURRICULUM CORE PRESERVATION
  console.log('\n8. CURRICULUM CORE PRESERVATION:');
  const { count: cCount } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: mCount } = await supabase.from('concept_curriculum_mappings').select('*', { count: 'exact', head: true });
  const { count: acCount } = await supabase.from('authoritative_curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: tCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: cmCount } = await supabase.from('content_modules').select('*', { count: 'exact', head: true });

  console.log(`   - curriculum_concepts: ${cCount} (expected: 846)`);
  console.log(`   - concept_curriculum_mappings: ${mCount} (expected: 282)`);
  console.log(`   - authoritative_curriculum_concepts: ${acCount} (expected: 17)`);
  console.log(`   - topics: ${tCount} (expected: 126)`);
  console.log(`   - content_modules: ${cmCount} (expected: 282)`);

  // 9. MAPPING STATE PRESERVATION
  console.log('\n9. MAPPING STATE PRESERVATION:');
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('mapping_state, authoritative_concept_id');
  const mapStates: Record<string, number> = { VERIFIED: 0, PENDING_REVIEW: 0, UNMAPPED: 0 };
  mappings?.forEach(m => {
    mapStates[m.mapping_state] = (mapStates[m.mapping_state] || 0) + 1;
  });
  console.log(`   - VERIFIED: ${mapStates.VERIFIED} (expected: 0)`);
  console.log(`   - PENDING_REVIEW: ${mapStates.PENDING_REVIEW} (expected: 268)`);
  console.log(`   - UNMAPPED: ${mapStates.UNMAPPED} (expected: 14)`);

  // 10. AUTHORITATIVE CONCEPT SECTION LINKAGE
  console.log('\n10. AUTHORITATIVE CONCEPT SECTION LINKAGE:');
  const { data: authConcepts } = await supabase.from('authoritative_curriculum_concepts').select('id, official_title, section_id');
  const authSecNull = authConcepts?.filter(ac => ac.section_id === null).length;
  console.log(`   - Authoritative concepts total: ${authConcepts?.length} (expected: 17)`);
  console.log(`   - Authoritative concepts with section_id = NULL: ${authSecNull} / ${authConcepts?.length}`);

  // 11. DOCUMENTS
  console.log('\n11. CURRICULUM DOCUMENTS:');
  const { data: docs } = await supabase.from('curriculum_documents').select('id, source_id, curriculum_version_id, document_title');
  console.log(`   - Total curriculum documents: ${docs?.length} (expected: 3)`);
  docs?.forEach(d => console.log(`     * ${d.id} (${d.source_id}, ${d.curriculum_version_id}): ${d.document_title}`));

  // 12. DATA QUALITY
  console.log('\n12. DATA QUALITY:');
  const authIds = new Set<string>();
  let duplicateAuthIds = 0;
  const tripleSet = new Set<string>();
  let duplicateTriples = 0;
  let nullRequiredFields = 0;

  authSections.forEach(s => {
    if (authIds.has(s.id)) duplicateAuthIds++;
    authIds.add(s.id);

    const trip = `${s.chapter_id}::${s.section_number}::${s.section_type}`;
    if (tripleSet.has(trip)) duplicateTriples++;
    tripleSet.add(trip);

    if (!s.id || !s.chapter_id || !s.section_number || !s.section_title || !s.section_type || !s.textbook_id || !s.source_document_id || !s.source_url) {
      nullRequiredFields++;
    }
  });

  console.log(`   - Duplicate authentic IDs: ${duplicateAuthIds} (expected: 0)`);
  console.log(`   - Duplicate (chapter, number, type) triples: ${duplicateTriples} (expected: 0)`);
  console.log(`   - NULL required fields: ${nullRequiredFields} (expected: 0)`);
}

runLiveVerification().catch(console.error);
