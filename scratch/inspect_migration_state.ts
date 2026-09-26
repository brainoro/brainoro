import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function inspectMigration() {
  console.log('=== CHECKING MIGRATION APPLICATION STATUS IN SUPABASE ===\n');

  const migrationTables = [
    'academic_years',
    'curriculum_versions',
    'curriculum_sources',
    'curriculum_documents',
    'textbooks',
    'textbook_chapters',
    'textbook_sections',
    'concept_curriculum_mappings',
    'curriculum_validation_results'
  ];

  for (const table of migrationTables) {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`[DOES NOT EXIST] Table: ${table} | Error: ${error.message}`);
    } else {
      console.log(`[EXISTS] Table: ${table} | Row Count: ${count}`);
    }
  }

  // Also check existing tables
  console.log('\n=== CHECKING EXISTING TABLES IN SUPABASE ===\n');
  const existingTables = [
    'boards',
    'classes',
    'subjects',
    'units',
    'topics',
    'content_modules',
    'curriculum_concepts'
  ];

  for (const table of existingTables) {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.log(`[DOES NOT EXIST] Table: ${table} | Error: ${error.message}`);
    } else {
      console.log(`[EXISTS] Table: ${table.padEnd(20)} | Row Count: ${count}`);
    }
  }

  // Check 846 concepts breakdown
  console.log('\n=== CHECKING 846 CONCEPTS BREAKDOWN ===\n');
  const { data: concepts, error: cErr } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id');

  if (cErr || !concepts) {
    console.error('Error fetching concepts:', cErr);
  } else {
    const total = concepts.length;
    const cbse = concepts.filter(c => c.board_id === 'CBSE').length;
    const cambridge = concepts.filter(c => c.board_id === 'CAMBRIDGE').length;
    const ibMyp = concepts.filter(c => c.board_id === 'IB_MYP').length;

    console.log(`Total Concepts: ${total}`);
    console.log(`  - CBSE:      ${cbse}`);
    console.log(`  - CAMBRIDGE: ${cambridge}`);
    console.log(`  - IB_MYP:    ${ibMyp}`);
  }

  // Check content_modules for mappings
  console.log('\n=== CHECKING MAPPINGS IN CONTENT_MODULES ===\n');
  const { data: mappings, error: mErr } = await supabase
    .from('content_modules')
    .select('id, module_type, content')
    .eq('module_type', 'CONCEPT_MAPPING');

  if (mErr) {
    console.log('Error checking mappings:', mErr);
  } else {
    console.log(`Total CONCEPT_MAPPING records: ${mappings?.length}`);
    let verified = 0;
    let pending = 0;
    let unmapped = 0;
    mappings?.forEach(m => {
      const state = m.content?.mapping_state;
      if (state === 'VERIFIED') verified++;
      else if (state === 'PENDING_REVIEW') pending++;
      else if (state === 'UNMAPPED') unmapped++;
    });
    console.log(`  - VERIFIED:       ${verified}`);
    console.log(`  - PENDING_REVIEW: ${pending}`);
    console.log(`  - UNMAPPED:       ${unmapped}`);
  }
}

inspectMigration().catch(console.error);
