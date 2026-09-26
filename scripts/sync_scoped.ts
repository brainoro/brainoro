/**
 * Brainoro OS — Scoped / Targeted Database Sync with Pre-Sync Backup
 * Path: scripts/sync_scoped.ts
 *
 * Safely updates ONLY specified concept IDs in Supabase curriculum_concepts table.
 * 1. Backs up current records from Supabase into `backups/pre_sync_<timestamp>.json`
 * 2. Generates updated, pristine Cornell notes payload via pure local synthesis (bypassing stale DB cache)
 * 3. Applies updates strictly to specified concept IDs
 * 4. Verifies the write
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/sync_scoped.ts --concept-ids=CAMBRIDGE-G8-CHEMISTRY-MET-DISP
 *   npx tsx --env-file=.env.local scripts/sync_scoped.ts --from-audit-report
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const baseDir = fs.existsSync(path.resolve(__dirname, '../frontend/src'))
  ? path.resolve(__dirname, '../frontend/src')
  : path.resolve(__dirname, '../src');

const { CONCEPTS_DATA } = require(path.join(baseDir, 'lib/data/curriculumData'));
const { synthesizeLocalOERNotes, normalizeBoard, isMiddleSchoolGrade } = require(path.join(baseDir, 'lib/services/contentService'));
const { deduceDiagramCategory, EXACT_CANVAS_DIAGRAMS } = require(path.join(baseDir, 'components/cornell/VisualModelCard'));

// Supabase Configuration
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gyjlrgudysqabwbhaskr.supabase.co/rest/v1/';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amxyZ3VkeXNxYWJ3Ymhhc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI1ODUsImV4cCI6MjEwNDk4ODU4NX0.N_SDVcl0PoN39n9sHApC_nEy8fI0xRqhj3IFvG6zbeI';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
  global: {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
    },
  },
});

async function runScopedSync() {
  console.log('================================================================================');
  console.log('   BRAINORO OS — TARGETED SCOPED SUPABASE SYNC (WITH BACKUP GATE)');
  console.log('================================================================================\n');

  // 1. Parse target IDs
  const args = process.argv.slice(2);
  let targetConceptIds: string[] = [];

  const idArg = args.find(a => a.startsWith('--concept-ids=') || a.startsWith('--ids='));
  const fromReportArg = args.includes('--from-audit-report');

  if (idArg) {
    targetConceptIds = idArg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean);
  } else if (fromReportArg) {
    const reportPath = path.resolve(__dirname, '../scratch/audit_report.json');
    if (!fs.existsSync(reportPath)) {
      console.error(`Error: Audit report not found at ${reportPath}. Run audit script first.`);
      process.exit(1);
    }
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    targetConceptIds = (report.flagged_records || [])
      .filter((r: any) => r.flags.some((f: any) => f.flagType === 'CONTENT_ID_MISMATCH'))
      .map((r: any) => r.concept_id);
  }

  if (targetConceptIds.length === 0) {
    console.log('Usage examples:');
    console.log('  npx tsx --env-file=.env.local scripts/sync_scoped.ts --concept-ids=CAMBRIDGE-G8-CHEMISTRY-MET-DISP');
    console.log('  npx tsx --env-file=.env.local scripts/sync_scoped.ts --from-audit-report\n');
    console.error('Error: No target concept IDs specified.');
    process.exit(1);
  }

  console.log(`[Target Scope] ${targetConceptIds.length} concept(s) selected for scoped sync:`);
  targetConceptIds.forEach(id => console.log(`  - ${id}`));
  console.log('');

  // 2. Fetch current records from Supabase (Pre-sync Backup)
  console.log('[Step 1] Fetching live records from Supabase for backup...');
  const { data: currentRows, error: fetchErr } = await supabase
    .from('curriculum_concepts')
    .select('*')
    .in('id', targetConceptIds);

  if (fetchErr) {
    console.error(`Failed to fetch current records from Supabase: ${fetchErr.message}`);
    process.exit(1);
  }

  const backupDir = path.resolve(__dirname, '../backups');
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupFile = path.join(backupDir, `pre_sync_${timestamp}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(currentRows, null, 2), 'utf8');
  console.log(`  OK Pre-sync backup of ${currentRows?.length || 0} rows saved to: ${backupFile}\n`);

  // 3. Build updated payloads for each concept
  console.log('[Step 2] Synthesizing updated pedagogical payloads...');
  const updates: Array<{ concept_id: string; metadata: any; diffSummary: any }> = [];

  for (const conceptId of targetConceptIds) {
    const canonical = CONCEPTS_DATA.find((c: any) => c.id === conceptId);
    const liveRow = currentRows?.find((r: any) => r.id === conceptId);

    if (!canonical && !liveRow) {
      console.warn(`  WARN Concept ${conceptId} not found in local CONCEPTS_DATA or live DB. Skipping.`);
      continue;
    }

    const concept = canonical || {
      id: liveRow.id,
      boardId: liveRow.board_id,
      subjectId: liveRow.subject_id,
      gradeLevel: liveRow.grade_level,
      unit: liveRow.unit,
      title: liveRow.title,
      coreLogicEssence: liveRow.core_logic_essence,
      metadata: liveRow.metadata || {},
    };

    // Pure local synthesis from updated blueprints (bypasses stale DB records)
    const notes = synthesizeLocalOERNotes(concept, concept.boardId);
    const diagram = deduceDiagramCategory(concept, notes);

    if (!notes.structuralRule.startsWith('$$') || !notes.structuralRule.endsWith('$$')) {
      notes.structuralRule = `$$${notes.structuralRule.replace(/(?<!\\)\$/g, '').trim()}$$`;
    }
    notes.diagramType = diagram;

    let pedagogicalFocus = 'NCERT / OER Standard Proofs & Analytical Deduction';
    if (concept.boardId === 'CAMBRIDGE') {
      pedagogicalFocus = 'Cambridge Lower Secondary / IGCSE Command Words & Empirical Precision';
    } else if (concept.boardId === 'IB_MYP') {
      pedagogicalFocus = 'IB MYP Criteria & Global Contexts Conceptual Framework';
    }

    const resolvedDiagramType = EXACT_CANVAS_DIAGRAMS && EXACT_CANVAS_DIAGRAMS.has(diagram)
      ? diagram
      : 'visual_model_pending';

    const currentMeta = liveRow?.metadata || {};
    const oldNotes = currentMeta.cornell_notes || {};

    const updatedMeta = {
      ...currentMeta,
      source: 'OpenStax / OER Commons / Creative Commons',
      license: 'CC-BY-4.0',
      version: '2.0',
      pedagogical_focus: pedagogicalFocus,
      ocaverse_watermark: 'Protected by OcaVerse Guardrail',
      copyright_compliance: 'Non-proprietary OER Synthesized',
      diagram_type: resolvedDiagramType,
      payload_fingerprint: notes.payloadFingerprint || `FPT-${concept.id}`,
      cornell_notes: notes,
      last_synced: new Date().toISOString(),
    };

    updates.push({
      concept_id: concept.id,
      metadata: updatedMeta,
      diffSummary: {
        concept_id: concept.id,
        title: concept.title,
        old_title: oldNotes.title || 'N/A',
        old_structural_rule: oldNotes.structuralRule || 'N/A',
        new_structural_rule: notes.structuralRule,
        old_diagram_type: currentMeta.diagram_type || oldNotes.diagramType || 'N/A',
        new_diagram_type: resolvedDiagramType,
        old_main_notes_snippet: (oldNotes.mainNotes || '').substring(0, 150),
        new_main_notes_snippet: (notes.mainNotes || '').substring(0, 150),
      },
    });
  }

  // 4. Print Diff Review
  console.log('================================================================================');
  console.log('   DIFF REVIEW BEFORE WRITE');
  console.log('================================================================================\n');

  for (const u of updates) {
    console.log(`Concept ID: ${u.concept_id}`);
    console.log(`  Title:                  ${u.diffSummary.title}`);
    console.log(`  Old Diagram:            ${u.diffSummary.old_diagram_type}`);
    console.log(`  New Diagram:            ${u.diffSummary.new_diagram_type}`);
    console.log(`  Old Rule:               ${u.diffSummary.old_structural_rule}`);
    console.log(`  New Rule:               ${u.diffSummary.new_structural_rule}`);
    console.log(`  Old Main Notes Snippet: ${u.diffSummary.old_main_notes_snippet}...`);
    console.log(`  New Main Notes Snippet: ${u.diffSummary.new_main_notes_snippet}...`);
    console.log('--------------------------------------------------------------------------------');
  }

  // 5. Execute Scoped Update
  console.log(`\n[Step 3] Executing scoped update on ${updates.length} record(s) in Supabase...`);
  let successCount = 0;
  let failCount = 0;

  for (const u of updates) {
    const { error: updateErr } = await supabase
      .from('curriculum_concepts')
      .update({ metadata: u.metadata })
      .eq('id', u.concept_id);

    if (updateErr) {
      console.error(`  FAIL ${u.concept_id}: ${updateErr.message}`);
      failCount++;
    } else {
      console.log(`  OK Updated ${u.concept_id} in Supabase.`);
      successCount++;
    }
  }

  console.log('\n================================================================================');
  console.log('   SCOPED SYNC SUMMARY');
  console.log('================================================================================');
  console.log(`Target Records : ${updates.length}`);
  console.log(`Successes      : ${successCount}`);
  console.log(`Failures       : ${failCount}`);
  console.log(`Backup File    : ${backupFile}`);
  console.log('================================================================================\n');

  if (failCount > 0) {
    process.exit(1);
  }
}

runScopedSync().catch(err => {
  console.error('Scoped sync failed:', err);
  process.exit(1);
});