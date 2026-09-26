import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function verifyLive() {
  console.log('================================================================');
  console.log(' BRAINORO OS — PHASE 2B.2 POST-MIGRATION LIVE DATABASE VERIFICATION');
  console.log('================================================================\n');

  // 1. VERIFY TABLE EXISTS & ROW COUNT
  console.log('--- 1 & 2: Table Existence & Row Count ---');
  const { data: tableData, error: tableError, count: rowCount, status: tableStatus } = await supabase
    .from('authoritative_curriculum_concepts')
    .select('*', { count: 'exact' });

  const tableExists = !tableError && tableStatus === 200;
  console.log(`TABLE_EXISTS: ${tableExists ? 'YES' : 'NO'}`);
  console.log(`ROW_COUNT: ${rowCount}`);
  if (tableError) {
    console.error('Table query error:', tableError);
    return;
  }

  // 3. VERIFY LIVE COLUMNS
  console.log('\n--- 3: Live Column Verification ---');
  const columnsToTest = [
    'id',
    'curriculum_version_id',
    'board_id',
    'grade_level',
    'subject_id',
    'textbook_id',
    'chapter_id',
    'section_id',
    'official_concept_code',
    'official_title',
    'official_description',
    'source_id',
    'source_document_id',
    'source_url',
    'source_page',
    'verification_status',
    'evidence',
    'created_at',
    'updated_at',
  ];

  const columnVerification: Record<string, boolean> = {};
  for (const col of columnsToTest) {
    const { error: colErr } = await supabase
      .from('authoritative_curriculum_concepts')
      .select(col)
      .limit(1);

    if (colErr) {
      console.log(`❌ Column ${col.padEnd(25)}: MISSING (${colErr.message})`);
      columnVerification[col] = false;
    } else {
      console.log(`✓ Column ${col.padEnd(25)}: EXISTS in live schema`);
      columnVerification[col] = true;
    }
  }

  // 4. VERIFY MAPPING LINK (authoritative_concept_id on concept_curriculum_mappings)
  console.log('\n--- 4: Verify authoritative_concept_id on concept_curriculum_mappings ---');
  const { data: mapColData, error: mapColErr } = await supabase
    .from('concept_curriculum_mappings')
    .select('authoritative_concept_id')
    .limit(1);

  const mappingLinkExists = !mapColErr;
  console.log(`authoritative_concept_id link on concept_curriculum_mappings: ${mappingLinkExists ? 'YES' : 'NO'}`);
  if (mapColErr) console.error('Mapping link error:', mapColErr);

  // 5. VERIFY FOREIGN KEYS VIA RELATIONSHIP QUERIES (PostgREST embedded resource syntax)
  console.log('\n--- 5: Foreign Key / Relationship Verification ---');
  // In PostgREST, embedded queries like .select('curriculum_versions(id)') test the foreign key relationship in schema cache
  const fkTests = [
    { name: 'curriculum_version_id -> curriculum_versions', select: 'curriculum_versions(id)' },
    { name: 'board_id -> boards', select: 'boards(id)' },
    { name: 'grade_level -> classes', select: 'classes(grade_level)' },
    { name: 'subject_id -> subjects', select: 'subjects(id)' },
    { name: 'textbook_id -> textbooks', select: 'textbooks(id)' },
    { name: 'chapter_id -> textbook_chapters', select: 'textbook_chapters(id)' },
    { name: 'section_id -> textbook_sections', select: 'textbook_sections(id)' },
    { name: 'source_id -> curriculum_sources', select: 'curriculum_sources(id)' },
    { name: 'source_document_id -> curriculum_documents', select: 'curriculum_documents(id)' },
  ];

  for (const fk of fkTests) {
    const { error: fkErr } = await supabase
      .from('authoritative_curriculum_concepts')
      .select(`id, ${fk.select}`)
      .limit(1);

    if (fkErr) {
      console.log(`❌ FK ${fk.name.padEnd(50)}: FAILED (${fkErr.message})`);
    } else {
      console.log(`✓ FK ${fk.name.padEnd(50)}: CONFIRMED in PostgREST schema`);
    }
  }

  // Also verify mapping link FK: concept_curriculum_mappings -> authoritative_curriculum_concepts
  const { error: mapFkErr } = await supabase
    .from('concept_curriculum_mappings')
    .select('id, authoritative_curriculum_concepts(id)')
    .limit(1);

  console.log(`✓ FK concept_curriculum_mappings -> authoritative_curriculum_concepts: ${!mapFkErr ? 'CONFIRMED' : 'FAILED: ' + mapFkErr?.message}`);

  // 6. VERIFY 846 CONCEPT PRESERVATION
  console.log('\n--- 6: 846 Concept Preservation Verification ---');
  const { count: cTotal } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true });
  const { count: cCbse } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CBSE');
  const { count: cCam } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'CAMBRIDGE');
  const { count: cIb } = await supabase.from('curriculum_concepts').select('*', { count: 'exact', head: true }).eq('board_id', 'IB_MYP');

  console.log(`curriculum_concepts total: ${cTotal} (Expected: 846)`);
  console.log(`  - CBSE:      ${cCbse} (Expected: 282)`);
  console.log(`  - CAMBRIDGE: ${cCam} (Expected: 282)`);
  console.log(`  - IB_MYP:    ${cIb} (Expected: 282)`);

  // 7. VERIFY EXISTING CURRICULUM DATA COUNTS
  console.log('\n--- 7: Existing Curriculum Data Counts ---');
  const { count: topCount } = await supabase.from('topics').select('*', { count: 'exact', head: true });
  const { count: modCount } = await supabase.from('content_modules').select('*', { count: 'exact', head: true });
  const { count: chCount } = await supabase.from('textbook_chapters').select('*', { count: 'exact', head: true });
  const { count: tbCount } = await supabase.from('textbooks').select('*', { count: 'exact', head: true });
  const { count: secCount } = await supabase.from('textbook_sections').select('*', { count: 'exact', head: true });
  const { count: cvCount } = await supabase.from('curriculum_versions').select('*', { count: 'exact', head: true });

  console.log(`topics:            ${topCount} (Expected: 126)`);
  console.log(`content_modules:   ${modCount} (Expected: 282)`);
  console.log(`textbook_chapters: ${chCount} (Expected: 148)`);
  console.log(`textbooks:         ${tbCount} (Expected: 12)`);
  console.log(`textbook_sections: ${secCount} (Expected: 126)`);
  console.log(`curriculum_versions: ${cvCount} (Expected: 3)`);

  // 8. VERIFY MAPPING STATES
  console.log('\n--- 8: Mapping States Verification ---');
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('mapping_state');
  const mStates: Record<string, number> = {};
  mappings?.forEach((m) => {
    mStates[m.mapping_state] = (mStates[m.mapping_state] || 0) + 1;
  });

  console.log('Mapping States in live DB:');
  console.log(`- TOTAL:          ${mappings?.length} (Expected: 282)`);
  console.log(`- VERIFIED:       ${mStates['VERIFIED'] || 0} (Expected: 0)`);
  console.log(`- PENDING_REVIEW: ${mStates['PENDING_REVIEW'] || 0} (Expected: 268)`);
  console.log(`- UNMAPPED:       ${mStates['UNMAPPED'] || 0} (Expected: 14)`);
  console.log(`- CONFLICT:       ${mStates['CONFLICT'] || 0} (Expected: 0)`);
  console.log(`- DEPRECATED:     ${mStates['DEPRECATED'] || 0} (Expected: 0)`);

  // 9. VERIFY VERSION ISOLATION
  console.log('\n--- 9: Version Isolation ---');
  const { data: versions } = await supabase.from('curriculum_versions').select('id, version_tag, status');
  console.log('Live Curriculum Versions:');
  versions?.forEach((v) => console.log(`- ${v.id} (Tag: ${v.version_tag}, Status: ${v.status})`));
}

verifyLive().catch(console.error);
