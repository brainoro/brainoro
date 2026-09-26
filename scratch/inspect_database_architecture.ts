import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

const TABLES_TO_CHECK = [
  'boards',
  'classes',
  'subjects',
  'units',
  'topics',
  'content_modules',
  'curriculum_concepts',
  'academic_years',
  'curriculum_versions',
  'curriculum_sources',
  'curriculum_documents',
  'curriculum_units',
  'curriculum_topics',
  'textbooks',
  'textbook_chapters',
  'textbook_sections',
  'concept_curriculum_mappings',
  'concept_textbook_mappings',
  'curriculum_validation_results',
];

async function inspect() {
  console.log('=== SUPABASE TABLE INVENTORY AUDIT ===\n');

  const tableResults: Record<string, { exists: boolean; count?: number; error?: string; sampleColumns?: string[] }> = {};

  for (const table of TABLES_TO_CHECK) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: false })
        .limit(1);

      if (error) {
        tableResults[table] = {
          exists: false,
          error: error.message,
        };
      } else {
        tableResults[table] = {
          exists: true,
          count: count ?? data?.length ?? 0,
          sampleColumns: data && data.length > 0 ? Object.keys(data[0]) : [],
        };
      }
    } catch (e: any) {
      tableResults[table] = {
        exists: false,
        error: e?.message || String(e),
      };
    }
  }

  for (const [t, res] of Object.entries(tableResults)) {
    if (res.exists) {
      console.log(`[EXISTS] Table: ${t} | Rows: ${res.count} | Columns: ${res.sampleColumns?.join(', ')}`);
    } else {
      console.log(`[DOES NOT EXIST] Table: ${t} | Error: ${res.error}`);
    }
  }

  // Deep dive into curriculum_concepts
  console.log('\n=== CURRICULUM_CONCEPTS DEEP DIVE ===\n');
  const { data: cbseConcepts, count: cbseCount } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, unit, title, metadata', { count: 'exact' })
    .eq('board_id', 'CBSE');

  console.log(`Total CBSE concepts in curriculum_concepts: ${cbseCount}`);

  if (cbseConcepts && cbseConcepts.length > 0) {
    const sample = cbseConcepts[0];
    console.log('\nSample CBSE concept row:');
    console.log(JSON.stringify(sample, null, 2));

    // Check if metadata contains academic_year, curriculum_version, source, etc.
    let hasAcademicYear = false;
    let hasCurriculumVersion = false;
    let hasSourceDoc = false;

    for (const c of cbseConcepts) {
      if (c.metadata?.academic_year || c.metadata?.academicYear) hasAcademicYear = true;
      if (c.metadata?.curriculum_version || c.metadata?.curriculumVersion) hasCurriculumVersion = true;
      if (c.metadata?.source || c.metadata?.source_document) hasSourceDoc = true;
    }

    console.log('\nMetadata scan across all CBSE concepts:');
    console.log(`- Has academic_year in metadata: ${hasAcademicYear}`);
    console.log(`- Has curriculum_version in metadata: ${hasCurriculumVersion}`);
    console.log(`- Has source/source_document in metadata: ${hasSourceDoc}`);
  }

  // Deep dive into units if it exists
  if (tableResults['units']?.exists) {
    const { data: cbseUnits, count: cbseUnitCount } = await supabase
      .from('units')
      .select('*', { count: 'exact' })
      .eq('board_id', 'CBSE');
    console.log(`\nCBSE units in 'units' table: ${cbseUnitCount}`);
    if (cbseUnits && cbseUnits.length > 0) {
      console.log('Sample unit:', JSON.stringify(cbseUnits[0], null, 2));
    }
  }

  // Deep dive into topics if it exists
  if (tableResults['topics']?.exists) {
    const { data: cbseTopics, count: cbseTopicCount } = await supabase
      .from('topics')
      .select('*', { count: 'exact' })
      .eq('board_id', 'CBSE');
    console.log(`\nCBSE topics in 'topics' table: ${cbseTopicCount}`);
    if (cbseTopics && cbseTopics.length > 0) {
      console.log('Sample topic:', JSON.stringify(cbseTopics[0], null, 2));
    }
  }

  // Deep dive into boards
  if (tableResults['boards']?.exists) {
    const { data: boards } = await supabase.from('boards').select('*');
    console.log('\nBoards in DB:', boards);
  }
}

inspect().catch(console.error);
