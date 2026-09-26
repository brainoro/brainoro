import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function verifyLiveMigration() {
  console.log('=== VERIFYING LIVE MIGRATION TABLES IN SUPABASE ===\n');

  const migrationTables = [
    'academic_years',
    'curriculum_versions',
    'curriculum_sources',
    'curriculum_documents',
    'textbooks',
    'textbook_chapters',
    'textbook_sections',
    'concept_curriculum_mappings',
    'curriculum_validation_results',
  ];

  const tableStatus: Record<string, { exists: boolean; count?: number; error?: string }> = {};

  for (const table of migrationTables) {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true });

    if (error) {
      tableStatus[table] = { exists: false, error: error.message };
      console.log(`Table: ${table.padEnd(30)} -> MISSING (${error.message})`);
    } else {
      tableStatus[table] = { exists: true, count: count ?? 0 };
      console.log(`Table: ${table.padEnd(30)} -> EXISTS (rows: ${count ?? 0})`);
    }
  }

  console.log('\n=== VERIFYING EXISTING DATA COUNTS ===\n');

  // 1. curriculum_concepts
  const { data: concepts, error: cErr } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id');

  if (cErr || !concepts) {
    console.error('Error querying curriculum_concepts:', cErr);
  } else {
    const total = concepts.length;
    const cbse = concepts.filter((c) => c.board_id === 'CBSE').length;
    const cambridge = concepts.filter((c) => c.board_id === 'CAMBRIDGE').length;
    const ibMyp = concepts.filter((c) => c.board_id === 'IB_MYP').length;

    console.log(`curriculum_concepts total: ${total}`);
    console.log(`  - CBSE:      ${cbse}`);
    console.log(`  - CAMBRIDGE: ${cambridge}`);
    console.log(`  - IB_MYP:    ${ibMyp}`);
  }

  // 2. units
  const { count: unitsCount, error: uErr } = await supabase
    .from('units')
    .select('*', { count: 'exact', head: true });
  console.log(`units count: ${unitsCount ?? 'error: ' + uErr?.message}`);

  // 3. topics
  const { count: topicsCount, error: tErr } = await supabase
    .from('topics')
    .select('*', { count: 'exact', head: true });
  console.log(`topics count: ${topicsCount ?? 'error: ' + tErr?.message}`);

  // 4. content_modules
  const { count: modulesCount, error: mErr } = await supabase
    .from('content_modules')
    .select('*', { count: 'exact', head: true });
  console.log(`content_modules count: ${modulesCount ?? 'error: ' + mErr?.message}`);
}

verifyLiveMigration().catch(console.error);
