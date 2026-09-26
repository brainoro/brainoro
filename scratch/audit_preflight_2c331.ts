import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, supabaseKey);

// The 40 proposed authentic sections for Class 10 Mathematics
const proposedSections = [
  // Ch 1
  { id: 'SEC-NCERT-G10-MATH-01-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-01', section_number: '1.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf', source_locator: 'jemh101.pdf § 1.1' },
  { id: 'SEC-NCERT-G10-MATH-01-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-01', section_number: '1.2', section_title: 'Fundamental Theorem of Arithmetic', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf', source_locator: 'jemh101.pdf § 1.2' },
  { id: 'SEC-NCERT-G10-MATH-01-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-01', section_number: '1.3', section_title: 'Revisiting Irrational Numbers', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh101.pdf', source_locator: 'jemh101.pdf § 1.3' },
  // Ch 2
  { id: 'SEC-NCERT-G10-MATH-02-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-02', section_number: '2.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh102.pdf', source_locator: 'jemh102.pdf § 2.1' },
  { id: 'SEC-NCERT-G10-MATH-02-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-02', section_number: '2.2', section_title: 'Geometrical Meaning of the Zeroes of a Polynomial', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh102.pdf', source_locator: 'jemh102.pdf § 2.2' },
  { id: 'SEC-NCERT-G10-MATH-02-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-02', section_number: '2.3', section_title: 'Relationship between Zeroes and Coefficients of a Polynomial', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh102.pdf', source_locator: 'jemh102.pdf § 2.3' },
  // Ch 3
  { id: 'SEC-NCERT-G10-MATH-03-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-03', section_number: '3.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh103.pdf', source_locator: 'jemh103.pdf § 3.1' },
  { id: 'SEC-NCERT-G10-MATH-03-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-03', section_number: '3.2', section_title: 'Graphical Method of Solution of a Pair of Linear Equations in Two Variables', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh103.pdf', source_locator: 'jemh103.pdf § 3.2' },
  { id: 'SEC-NCERT-G10-MATH-03-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-03', section_number: '3.3', section_title: 'Algebraic Methods of Solution of a Pair of Linear Equations in Two Variables', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh103.pdf', source_locator: 'jemh103.pdf § 3.3' },
  // Ch 4
  { id: 'SEC-NCERT-G10-MATH-04-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-04', section_number: '4.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh104.pdf', source_locator: 'jemh104.pdf § 4.1' },
  { id: 'SEC-NCERT-G10-MATH-04-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-04', section_number: '4.2', section_title: 'Quadratic Equations', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh104.pdf', source_locator: 'jemh104.pdf § 4.2' },
  { id: 'SEC-NCERT-G10-MATH-04-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-04', section_number: '4.3', section_title: 'Solution of a Quadratic Equation by Factorisation', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh104.pdf', source_locator: 'jemh104.pdf § 4.3' },
  { id: 'SEC-NCERT-G10-MATH-04-04-AUTH', chapter_id: 'CH-NCERT-G10-MATH-04', section_number: '4.4', section_title: 'Nature of Roots', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh104.pdf', source_locator: 'jemh104.pdf § 4.4' },
  // Ch 5
  { id: 'SEC-NCERT-G10-MATH-05-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-05', section_number: '5.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh105.pdf', source_locator: 'jemh105.pdf § 5.1' },
  { id: 'SEC-NCERT-G10-MATH-05-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-05', section_number: '5.2', section_title: 'Arithmetic Progressions', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh105.pdf', source_locator: 'jemh105.pdf § 5.2' },
  { id: 'SEC-NCERT-G10-MATH-05-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-05', section_number: '5.3', section_title: 'nth Term of an AP', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh105.pdf', source_locator: 'jemh105.pdf § 5.3' },
  { id: 'SEC-NCERT-G10-MATH-05-04-AUTH', chapter_id: 'CH-NCERT-G10-MATH-05', section_number: '5.4', section_title: 'Sum of First n Terms of an AP', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh105.pdf', source_locator: 'jemh105.pdf § 5.4' },
  // Ch 6
  { id: 'SEC-NCERT-G10-MATH-06-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-06', section_number: '6.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh106.pdf', source_locator: 'jemh106.pdf § 6.1' },
  { id: 'SEC-NCERT-G10-MATH-06-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-06', section_number: '6.2', section_title: 'Similar Figures', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh106.pdf', source_locator: 'jemh106.pdf § 6.2' },
  { id: 'SEC-NCERT-G10-MATH-06-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-06', section_number: '6.3', section_title: 'Similarity of Triangles', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh106.pdf', source_locator: 'jemh106.pdf § 6.3' },
  { id: 'SEC-NCERT-G10-MATH-06-04-AUTH', chapter_id: 'CH-NCERT-G10-MATH-06', section_number: '6.4', section_title: 'Criteria for Similarity of Triangles', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh106.pdf', source_locator: 'jemh106.pdf § 6.4' },
  // Ch 7
  { id: 'SEC-NCERT-G10-MATH-07-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-07', section_number: '7.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh107.pdf', source_locator: 'jemh107.pdf § 7.1' },
  { id: 'SEC-NCERT-G10-MATH-07-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-07', section_number: '7.2', section_title: 'Distance Formula', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh107.pdf', source_locator: 'jemh107.pdf § 7.2' },
  { id: 'SEC-NCERT-G10-MATH-07-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-07', section_number: '7.3', section_title: 'Section Formula', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh107.pdf', source_locator: 'jemh107.pdf § 7.3' },
  // Ch 8
  { id: 'SEC-NCERT-G10-MATH-08-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-08', section_number: '8.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh108.pdf', source_locator: 'jemh108.pdf § 8.1' },
  { id: 'SEC-NCERT-G10-MATH-08-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-08', section_number: '8.2', section_title: 'Trigonometric Ratios', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh108.pdf', source_locator: 'jemh108.pdf § 8.2' },
  { id: 'SEC-NCERT-G10-MATH-08-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-08', section_number: '8.3', section_title: 'Trigonometric Ratios of Some Specific Angles', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh108.pdf', source_locator: 'jemh108.pdf § 8.3' },
  { id: 'SEC-NCERT-G10-MATH-08-04-AUTH', chapter_id: 'CH-NCERT-G10-MATH-08', section_number: '8.4', section_title: 'Trigonometric Identities', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh108.pdf', source_locator: 'jemh108.pdf § 8.4' },
  // Ch 9
  { id: 'SEC-NCERT-G10-MATH-09-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-09', section_number: '9.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh109.pdf', source_locator: 'jemh109.pdf § 9.1' },
  { id: 'SEC-NCERT-G10-MATH-09-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-09', section_number: '9.2', section_title: 'Heights and Distances', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh109.pdf', source_locator: 'jemh109.pdf § 9.2' },
  // Ch 10
  { id: 'SEC-NCERT-G10-MATH-10-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-10', section_number: '10.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh110.pdf', source_locator: 'jemh110.pdf § 10.1' },
  { id: 'SEC-NCERT-G10-MATH-10-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-10', section_number: '10.2', section_title: 'Tangent to a Circle', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh110.pdf', source_locator: 'jemh110.pdf § 10.2' },
  { id: 'SEC-NCERT-G10-MATH-10-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-10', section_number: '10.3', section_title: 'Number of Tangents from a Point on a Circle', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh110.pdf', source_locator: 'jemh110.pdf § 10.3' },
  // Ch 11
  { id: 'SEC-NCERT-G10-MATH-11-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-11', section_number: '11.1', section_title: 'Areas of Sector and Segment of a Circle', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh111.pdf', source_locator: 'jemh111.pdf § 11.1' },
  // Ch 12
  { id: 'SEC-NCERT-G10-MATH-12-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-12', section_number: '12.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh112.pdf', source_locator: 'jemh112.pdf § 12.1' },
  { id: 'SEC-NCERT-G10-MATH-12-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-12', section_number: '12.2', section_title: 'Surface Area of a Combination of Solids', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh112.pdf', source_locator: 'jemh112.pdf § 12.2' },
  { id: 'SEC-NCERT-G10-MATH-12-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-12', section_number: '12.3', section_title: 'Volume of a Combination of Solids', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh112.pdf', source_locator: 'jemh112.pdf § 12.3' },
  // Ch 13
  { id: 'SEC-NCERT-G10-MATH-13-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-13', section_number: '13.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh113.pdf', source_locator: 'jemh113.pdf § 13.1' },
  { id: 'SEC-NCERT-G10-MATH-13-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-13', section_number: '13.2', section_title: 'Mean of Grouped Data', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh113.pdf', source_locator: 'jemh113.pdf § 13.2' },
  { id: 'SEC-NCERT-G10-MATH-13-03-AUTH', chapter_id: 'CH-NCERT-G10-MATH-13', section_number: '13.3', section_title: 'Mode of Grouped Data', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh113.pdf', source_locator: 'jemh113.pdf § 13.3' },
  { id: 'SEC-NCERT-G10-MATH-13-04-AUTH', chapter_id: 'CH-NCERT-G10-MATH-13', section_number: '13.4', section_title: 'Median of Grouped Data', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh113.pdf', source_locator: 'jemh113.pdf § 13.4' },
  // Ch 14
  { id: 'SEC-NCERT-G10-MATH-14-01-AUTH', chapter_id: 'CH-NCERT-G10-MATH-14', section_number: '14.1', section_title: 'Introduction', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh114.pdf', source_locator: 'jemh114.pdf § 14.1' },
  { id: 'SEC-NCERT-G10-MATH-14-02-AUTH', chapter_id: 'CH-NCERT-G10-MATH-14', section_number: '14.2', section_title: 'Probability — A Theoretical Approach', section_type: 'AUTHENTIC', textbook_id: 'TB-NCERT-G10-MATH', source_url: 'https://ncert.nic.in/textbook/pdf/jemh114.pdf', source_locator: 'jemh114.pdf § 14.2' }
];

async function runAudit() {
  console.log("=== RUNNING PRE-FLIGHT AUDIT 2C.3.3.1 ===\n");

  // 1. Fetch live existing sections
  const { data: existingSections } = await supabase
    .from('textbook_sections')
    .select('id, chapter_id, section_number, section_title, section_type, textbook_id');

  console.log(`1. Live existing sections count: ${existingSections?.length}`);

  // Test collisions under UNIQUE(chapter_id, section_number)
  const existingPairSet = new Set<string>();
  existingSections?.forEach(s => existingPairSet.add(`${s.chapter_id}::${s.section_number}`));

  const collisionsUnderOldConstraint: any[] = [];
  proposedSections.forEach(p => {
    const key = `${p.chapter_id}::${p.section_number}`;
    if (existingPairSet.has(key)) {
      collisionsUnderOldConstraint.push(p);
    }
  });

  console.log(`\n2. Collisions under old UNIQUE(chapter_id, section_number): ${collisionsUnderOldConstraint.length} / ${proposedSections.length}`);
  collisionsUnderOldConstraint.forEach(c => {
    console.log(`   - Chapter ${c.chapter_id}, Section ${c.section_number} (${c.section_title}) collides with existing synthetic section`);
  });

  // Test collisions under UNIQUE(chapter_id, section_number, section_type)
  const existingTripleSet = new Set<string>();
  existingSections?.forEach(s => existingTripleSet.add(`${s.chapter_id}::${s.section_number}::${s.section_type}`));

  const collisionsUnderNewConstraint: any[] = [];
  proposedSections.forEach(p => {
    const key = `${p.chapter_id}::${p.section_number}::${p.section_type}`;
    if (existingTripleSet.has(key)) {
      collisionsUnderNewConstraint.push(p);
    }
  });
  console.log(`\n3. Collisions under new UNIQUE(chapter_id, section_number, section_type): ${collisionsUnderNewConstraint.length} / ${proposedSections.length}`);

  // Check intra-proposed uniqueness
  const proposedIdSet = new Set<string>();
  let duplicateProposedIds = 0;
  const proposedTripleSet = new Set<string>();
  let duplicateProposedTriples = 0;

  proposedSections.forEach(p => {
    if (proposedIdSet.has(p.id)) duplicateProposedIds++;
    proposedIdSet.add(p.id);

    const trip = `${p.chapter_id}::${p.section_number}::${p.section_type}`;
    if (proposedTripleSet.has(trip)) duplicateProposedTriples++;
    proposedTripleSet.add(trip);
  });
  console.log(`\n4. Proposed intra-uniqueness: Duplicate IDs=${duplicateProposedIds}, Duplicate Triples=${duplicateProposedTriples}`);

  // Check chapter & textbook existence
  const { data: chapters } = await supabase.from('textbook_chapters').select('id, textbook_id');
  const { data: textbooks } = await supabase.from('textbooks').select('id, board_id, grade_level, subject_id, curriculum_version_id');
  const chapterMap = new Map<string, string>();
  chapters?.forEach(c => chapterMap.set(c.id, c.textbook_id));
  const textbookMap = new Map<string, any>();
  textbooks?.forEach(tb => textbookMap.set(tb.id, tb));

  let invalidChapters = 0;
  let invalidTextbooks = 0;
  let hierarchyMismatches = 0;
  let identityMismatches = 0;

  proposedSections.forEach(p => {
    const tbFromChap = chapterMap.get(p.chapter_id);
    if (!tbFromChap) {
      invalidChapters++;
    } else if (tbFromChap !== p.textbook_id) {
      hierarchyMismatches++;
    }

    const tb = textbookMap.get(p.textbook_id);
    if (!tb) {
      invalidTextbooks++;
    } else {
      if (tb.board_id !== 'CBSE' || tb.grade_level !== 10 || tb.subject_id !== 'MATH' || tb.curriculum_version_id !== 'CBSE-2026-27-OFFICIAL') {
        identityMismatches++;
      }
    }
  });

  console.log(`\n5. Hierarchy & Identity Audit:`);
  console.log(`   - Invalid chapters: ${invalidChapters}`);
  console.log(`   - Invalid textbooks: ${invalidTextbooks}`);
  console.log(`   - Chapter -> Textbook mismatches: ${hierarchyMismatches}`);
  console.log(`   - Educational identity mismatches: ${identityMismatches}`);

  // Inspect curriculum_documents and sources
  const { data: docs } = await supabase.from('curriculum_documents').select('*');
  const { data: sources } = await supabase.from('curriculum_sources').select('*');

  console.log(`\n6. Documents in live DB (${docs?.length}):`, docs?.map(d => ({ id: d.id, title: d.document_title, source: d.source_id, url: d.document_url })));
  console.log(`   Sources in live DB (${sources?.length}):`, sources?.map(s => ({ id: s.id, name: s.source_name, authority: s.publisher_authority })));
}

runAudit().catch(console.error);
