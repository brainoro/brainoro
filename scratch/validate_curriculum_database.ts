import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

interface ValidationFinding {
  category: string;
  rule: string;
  status: 'PASS' | 'FAIL';
  details: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
}

async function runValidation() {
  console.log('================================================================');
  console.log(' BRAINORO OS — AUTHORITATIVE CURRICULUM DATABASE AUDIT & VERIFICATION');
  console.log('================================================================\n');

  const findings: ValidationFinding[] = [];

  // ---------------------------------------------------------------------------
  // 1. Table Inventory & Row Counts
  // ---------------------------------------------------------------------------
  console.log('--- 1. Table Inventory & Live Row Counts ---');
  const expectedCounts: Record<string, number> = {
    boards: 3,
    classes: 5,
    subjects: 5,
    units: 126,
    topics: 126,
    content_modules: 0, // Phase I Security Invariant: Anonymous SELECT denied by RLS (0 rows visible anonymously)
    curriculum_concepts: 846,
    academic_years: 1,
    curriculum_versions: 3,
    curriculum_sources: 2,
    curriculum_documents: 4,
    textbooks: 12,
    textbook_chapters: 148,
    textbook_sections: 178,
    concept_curriculum_mappings: 282,
  };

  const liveCounts: Record<string, number> = {};

  for (const [table, expected] of Object.entries(expectedCounts)) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (table === 'content_modules') {
      // Phase I Security Invariant: Anonymous SELECT on public.content_modules MUST be DENIED/blocked by RLS
      const isBlocked = (count === 0 && !error) || (error !== null && (error.code === '42501' || error.message.includes('permission denied')));
      const isMatch = isBlocked && (count === 0 || count === null);
      liveCounts[table] = count ?? 0;
      console.log(`✓ Table: ${table.padEnd(28)} | Live: ${String(liveCounts[table]).padStart(4)} | Expected: 0 (Phase I RLS Anon SELECT Denied)`);
      findings.push({
        category: 'TABLE_INVENTORY',
        rule: `Table Count: ${table}`,
        status: isMatch ? 'PASS' : 'FAIL',
        details: isMatch
          ? `${liveCounts[table]} rows visible anonymously (expected 0: Phase I RLS anon lock active)`
          : `SECURITY VIOLATION: ${count} rows visible anonymously (must be 0 / denied)`,
        severity: isMatch ? 'INFO' : 'CRITICAL',
      });
      continue;
    }

    if (error) {
      findings.push({
        category: 'TABLE_INVENTORY',
        rule: `Table Existence: ${table}`,
        status: 'FAIL',
        details: error.message,
        severity: 'CRITICAL',
      });
      console.log(`❌ Table: ${table.padEnd(28)} | ERROR: ${error.message}`);
    } else {
      liveCounts[table] = count ?? 0;
      const isMatch = liveCounts[table] === expected;
      console.log(`✓ Table: ${table.padEnd(28)} | Live: ${String(liveCounts[table]).padStart(4)} | Expected: ${expected}`);
      findings.push({
        category: 'TABLE_INVENTORY',
        rule: `Table Count: ${table}`,
        status: isMatch ? 'PASS' : 'FAIL',
        details: `${liveCounts[table]} rows (expected ${expected})`,
        severity: isMatch ? 'INFO' : 'ERROR',
      });
    }
  }

  // Also check curriculum_validation_results
  const { count: valCount } = await supabase.from('curriculum_validation_results').select('*', { count: 'exact', head: true });
  console.log(`✓ Table: ${'curriculum_validation_results'.padEnd(28)} | Live: ${String(valCount).padStart(4)} | Audit Log Entries`);

  // ---------------------------------------------------------------------------
  // 2. Existing Concept Layer Preservation Invariant (846 Concepts)
  // ---------------------------------------------------------------------------
  console.log('\n--- 2. Concept Layer Preservation Invariant ---');
  const { data: allConcepts, error: cErr } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id');

  if (cErr || !allConcepts) {
    findings.push({
      category: 'CONCEPT_PRESERVATION',
      rule: 'Fetch curriculum_concepts',
      status: 'FAIL',
      details: cErr?.message || 'Could not fetch concepts',
      severity: 'CRITICAL',
    });
  } else {
    const total = allConcepts.length;
    const cbse = allConcepts.filter((c) => c.board_id === 'CBSE').length;
    const cambridge = allConcepts.filter((c) => c.board_id === 'CAMBRIDGE').length;
    const ibMyp = allConcepts.filter((c) => c.board_id === 'IB_MYP').length;

    console.log(`Total Concepts: ${total} (Expected: 846)`);
    console.log(`  - CBSE:       ${cbse} (Expected: 282)`);
    console.log(`  - CAMBRIDGE:  ${cambridge} (Expected: 282)`);
    console.log(`  - IB_MYP:     ${ibMyp} (Expected: 282)`);

    const isPreserved = total === 846 && cbse === 282 && cambridge === 282 && ibMyp === 282;
    findings.push({
      category: 'CONCEPT_PRESERVATION',
      rule: '846-Concept Preservation Invariant',
      status: isPreserved ? 'PASS' : 'FAIL',
      details: `Total: ${total}, CBSE: ${cbse}, CAMBRIDGE: ${cambridge}, IB_MYP: ${ibMyp}`,
      severity: isPreserved ? 'INFO' : 'CRITICAL',
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Foreign Key & Hierarchy Integrity Checks
  // ---------------------------------------------------------------------------
  console.log('\n--- 3. Foreign Key & Hierarchy Integrity ---');

  // Textbooks -> Chapters
  const { data: textbooks } = await supabase.from('textbooks').select('id, grade_level, subject_id');
  const { data: chapters } = await supabase.from('textbook_chapters').select('id, textbook_id, chapter_number');
  const { data: sections } = await supabase.from('textbook_sections').select('id, chapter_id, section_number');

  const textbookIds = new Set(textbooks?.map((tb) => tb.id) || []);
  const chapterIds = new Set(chapters?.map((ch) => ch.id) || []);

  let orphanedChapters = 0;
  chapters?.forEach((ch) => {
    if (!textbookIds.has(ch.textbook_id)) orphanedChapters++;
  });

  let orphanedSections = 0;
  sections?.forEach((sec) => {
    if (!chapterIds.has(sec.chapter_id)) orphanedSections++;
  });

  console.log(`Orphaned Chapters: ${orphanedChapters}`);
  console.log(`Orphaned Sections: ${orphanedSections}`);

  findings.push({
    category: 'HIERARCHY_INTEGRITY',
    rule: 'Zero Orphaned Chapters',
    status: orphanedChapters === 0 ? 'PASS' : 'FAIL',
    details: `${orphanedChapters} orphaned chapters`,
    severity: orphanedChapters === 0 ? 'INFO' : 'ERROR',
  });

  findings.push({
    category: 'HIERARCHY_INTEGRITY',
    rule: 'Zero Orphaned Sections',
    status: orphanedSections === 0 ? 'PASS' : 'FAIL',
    details: `${orphanedSections} orphaned sections`,
    severity: orphanedSections === 0 ? 'INFO' : 'ERROR',
  });

  // ---------------------------------------------------------------------------
  // 4. Controlled Concept Mappings Audit
  // ---------------------------------------------------------------------------
  console.log('\n--- 4. Controlled Concept Mappings Audit ---');
  const { data: mappings } = await supabase
    .from('concept_curriculum_mappings')
    .select('id, brainoro_concept_id, curriculum_version_id, textbook_id, chapter_id, section_id, topic_id, mapping_state, confidence_score, evidence');

  const mappingCount = mappings?.length || 0;
  console.log(`Total rows in concept_curriculum_mappings: ${mappingCount} (Expected: 282)`);

  let verified = 0;
  let pending = 0;
  let unmapped = 0;
  let invalidScores = 0;
  let emptyEvidence = 0;

  mappings?.forEach((m) => {
    if (m.mapping_state === 'VERIFIED') verified++;
    else if (m.mapping_state === 'PENDING_REVIEW') pending++;
    else if (m.mapping_state === 'UNMAPPED') unmapped++;

    if (typeof m.confidence_score !== 'number' || m.confidence_score < 0 || m.confidence_score > 1) {
      invalidScores++;
    }
    if (!m.evidence || m.evidence.trim().length === 0) {
      emptyEvidence++;
    }
  });

  console.log(`  - VERIFIED:        ${verified} (${((verified / (mappingCount || 1)) * 100).toFixed(1)}%)`);
  console.log(`  - PENDING_REVIEW:  ${pending} (${((pending / (mappingCount || 1)) * 100).toFixed(1)}%)`);
  console.log(`  - UNMAPPED:        ${unmapped} (${((unmapped / (mappingCount || 1)) * 100).toFixed(1)}%)`);

  findings.push({
    category: 'MAPPING_AUDIT',
    rule: 'All 282 CBSE Concepts Mapped',
    status: mappingCount === 282 ? 'PASS' : 'FAIL',
    details: `${mappingCount} of 282 concepts mapped`,
    severity: mappingCount === 282 ? 'INFO' : 'ERROR',
  });

  findings.push({
    category: 'MAPPING_AUDIT',
    rule: 'Confidence Score Range Valid [0.0 - 1.0]',
    status: invalidScores === 0 ? 'PASS' : 'FAIL',
    details: `${invalidScores} invalid confidence scores`,
    severity: invalidScores === 0 ? 'INFO' : 'ERROR',
  });

  findings.push({
    category: 'MAPPING_AUDIT',
    rule: 'Non-Empty Evidence on All Mappings',
    status: emptyEvidence === 0 ? 'PASS' : 'FAIL',
    details: `${emptyEvidence} mappings with empty evidence`,
    severity: emptyEvidence === 0 ? 'INFO' : 'ERROR',
  });

  // ---------------------------------------------------------------------------
  // 5. Final Scorecard
  // ---------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(' DATABASE AUDIT SCORECARD');
  console.log('================================================================');
  let passCount = 0;
  findings.forEach((f) => {
    const icon = f.status === 'PASS' ? '✅ PASS' : '❌ FAIL';
    console.log(`${icon} | [${f.category}] ${f.rule}: ${f.details}`);
    if (f.status === 'PASS') passCount++;
  });

  console.log(`\nTotal Rules Evaluated: ${findings.length}`);
  console.log(`Passed:                ${passCount}`);
  console.log(`Failed:                ${findings.length - passCount}`);
  console.log(`Score:                 ${((passCount / findings.length) * 100).toFixed(1)}%`);
  console.log('================================================================\n');

  if (findings.length - passCount > 0) {
    process.exit(1);
  }
}

runValidation().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
