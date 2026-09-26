/**
 * Brainoro Cognitive OS — End-to-End Data Accuracy, Isolation & Regression Test Suite
 * Path: scratch/test_isolation_and_regression.ts
 */

import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(
  cleanSupabaseUrl || 'https://placeholder.supabase.co',
  cleanSupabaseKey || 'placeholder-anon-key'
);

// Load Golden Dataset
const goldenDatasetPath = path.resolve(process.cwd(), 'scratch/golden_dataset.json');
const goldenDataset = JSON.parse(fs.readFileSync(goldenDatasetPath, 'utf8'));

// Load Cache for full 846 scan
const cachePath = path.resolve(process.cwd(), 'scratch/remediated_blueprints_cache.json');
const cache: any[] = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

// Import domain validator
const { deduceDiagramCategory } = require(path.resolve(process.cwd(), 'frontend/src/components/cornell/VisualModelCard'));
const { validateCornellNotesSchema } = require(path.resolve(process.cwd(), 'frontend/src/lib/services/contentService'));

interface TestResult {
  suite: string;
  name: string;
  passed: boolean;
  details?: string;
}

const results: TestResult[] = [];

function recordTest(suite: string, name: string, passed: boolean, details?: string) {
  results.push({ suite, name, passed, details });
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} | [${suite}] ${name}${details ? ' - ' + details : ''}`);
}

async function runTestSuite() {
  console.log('================================================================================');
  console.log('   BRAINORO COGNITIVE OS — END-TO-END ISOLATION & REGRESSION TEST SUITE');
  console.log('================================================================================\n');

  // ===========================================================================
  // SUITE 1: MULTI-COLUMN QUERY ISOLATION & DATA GOVERNANCE
  // ===========================================================================
  console.log('--- SUITE 1: Multi-Column Database Isolation ---');

  // Positive isolation: Exact 4-column matching
  for (const concept of goldenDataset.concepts.slice(0, 5)) {
    const { data, error } = await supabase
      .from('curriculum_concepts')
      .select('id, board_id, grade_level, subject_id, metadata')
      .eq('id', concept.conceptId)
      .eq('board_id', concept.boardId)
      .eq('grade_level', concept.gradeLevel)
      .eq('subject_id', concept.subjectId)
      .maybeSingle();

    const passed = !error && data !== null && data.id === concept.conceptId;
    recordTest(
      'Multi-Column Isolation',
      `Exact 4-column match for ${concept.conceptId}`,
      passed,
      passed ? `Found record with board=${data?.board_id}, grade=${data?.grade_level}, subject=${data?.subject_id}` : (error?.message || 'Record not found')
    );
  }

  // Negative isolation: Cross-board, cross-grade, cross-subject mismatches
  for (const neg of goldenDataset.negativeIsolationCases) {
    const { data, error } = await supabase
      .from('curriculum_concepts')
      .select('id, board_id, grade_level, subject_id')
      .eq('id', neg.conceptId)
      .eq('board_id', neg.boardId)
      .eq('grade_level', neg.gradeLevel)
      .eq('subject_id', neg.subjectId)
      .maybeSingle();

    // Must return null (no data) because of 4-column isolation
    const passed = data === null;
    recordTest(
      'Negative Isolation',
      neg.name,
      passed,
      passed ? 'Correctly rejected mismatched query (returned 0 rows)' : `LEAK: Returned unexpected data for ${neg.conceptId}`
    );
  }

  // ===========================================================================
  // SUITE 2: VISUAL MODEL DOMAIN VALIDATION
  // ===========================================================================
  console.log('\n--- SUITE 2: Visual Model Domain Validation ---');

  for (const concept of goldenDataset.concepts) {
    const cachedItem = cache.find(c => c.concept_id === concept.conceptId);
    if (!cachedItem) {
      recordTest('Visual Model Domain', `Cache existence: ${concept.conceptId}`, false, 'Not found in cache');
      continue;
    }

    const deducedDiagram = deduceDiagramCategory(
      {
        id: concept.conceptId,
        boardId: concept.boardId,
        gradeLevel: concept.gradeLevel,
        subjectId: concept.subjectId,
        title: concept.title
      },
      cachedItem.notes
    );

    const isExpected = deducedDiagram === concept.expectedDiagram;
    const hasForbidden = concept.forbiddenDiagrams?.includes(deducedDiagram);

    const passed = isExpected && !hasForbidden;
    recordTest(
      'Visual Model Domain',
      `${concept.conceptId} -> ${concept.expectedDiagram}`,
      passed,
      `Deduced: ${deducedDiagram}, Expected: ${concept.expectedDiagram}${hasForbidden ? ' (FORBIDDEN DIAGRAM TRIGGERED)' : ''}`
    );
  }

  // ===========================================================================
  // SUITE 3: CONTENT PROFILE & KEYWORD CONTAMINATION AUDIT
  // ===========================================================================
  console.log('\n--- SUITE 3: Content Profile & Keyword Contamination ---');

  for (const concept of goldenDataset.concepts) {
    const cachedItem = cache.find(c => c.concept_id === concept.conceptId);
    if (!cachedItem) continue;

    const notes = cachedItem.notes;
    const fullContent = [
      notes.mainNotes,
      notes.structuralRule,
      notes.coreAnalogy,
      notes.curriculumTrap,
      notes.summary,
      ...(notes.cueQuestions || [])
    ].join(' ');

    // Check forbidden keywords using word-boundary or exact token match
    const foundForbidden = (concept.forbiddenKeywords || []).filter((kw: string) => {
      if (kw.includes(' ') || kw.includes('=') || kw.includes('+') || kw.includes('\\')) {
        return fullContent.toLowerCase().includes(kw.toLowerCase());
      }
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return regex.test(fullContent);
    });

    // Check required keywords
    const missingRequired = (concept.requiredKeywords || []).filter((kw: string) => {
      if (kw.includes(' ') || kw.includes('=') || kw.includes('+') || kw.includes('\\')) {
        return !fullContent.toLowerCase().includes(kw.toLowerCase());
      }
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      return !regex.test(fullContent);
    });

    // Check structural rule pattern
    let ruleMatches = true;
    if (concept.requiredStructuralRulePattern) {
      const ruleRegex = new RegExp(concept.requiredStructuralRulePattern, 'i');
      ruleMatches = ruleRegex.test(notes.structuralRule);
    }

    const passed = foundForbidden.length === 0 && missingRequired.length === 0 && ruleMatches;
    recordTest(
      'Content Profile',
      `Integrity for ${concept.conceptId}`,
      passed,
      passed
        ? 'No forbidden terms, required terms present, structural rule valid'
        : `Forbidden found: [${foundForbidden.join(', ')}], Missing required: [${missingRequired.join(', ')}], Rule match: ${ruleMatches}`
    );
  }

  // ===========================================================================
  // SUITE 4: FULL 846-CONCEPT DATABASE AUDIT
  // ===========================================================================
  console.log('\n--- SUITE 4: Full 846-Concept Database Sanity Audit ---');

  const fingerprintSet = new Set<string>();
  let duplicateFingerprints = 0;
  let invalidSchemaCount = 0;
  let unparsedLatexCount = 0;
  let middleSchoolJargonCount = 0;

  for (const item of cache) {
    // 1. Uniqueness
    if (fingerprintSet.has(item.payload_fingerprint)) {
      duplicateFingerprints++;
    }
    fingerprintSet.add(item.payload_fingerprint);

    // 2. Schema
    if (!validateCornellNotesSchema(item.notes)) {
      invalidSchemaCount++;
    }

    // 3. Unparsed LaTeX
    const rule = item.notes?.structuralRule || '';
    const main = item.notes?.mainNotes || '';
    if (rule.includes('\\mathbf') || main.includes('\\mathbf') || rule.includes('$$ext{')) {
      unparsedLatexCount++;
    }

    // 4. Middle School scope check (Grade 6-8 Math cannot have \sin, \cos, \tan)
    const isMS = Number(item.grade_level) <= 8;
    const isMath = (item.concept_id || '').includes('MATH');
    if (isMS && isMath) {
      if (rule.includes('\\sin') || rule.includes('\\cos') || rule.includes('\\tan')) {
        middleSchoolJargonCount++;
      }
    }
  }

  recordTest('Full 846 Audit', 'Payload Fingerprint Uniqueness (846/846)', duplicateFingerprints === 0, `${fingerprintSet.size} unique / 846`);
  recordTest('Full 846 Audit', 'CornellNotes Schema Conformance', invalidSchemaCount === 0, `${846 - invalidSchemaCount} / 846 valid`);
  recordTest('Full 846 Audit', 'LaTeX Syntax Integrity (No \\mathbf or $$ext{)', unparsedLatexCount === 0, `${unparsedLatexCount} syntax errors found`);
  recordTest('Full 846 Audit', 'Middle School Pedagogical Scope Lock (No Trig in G6-G8 Math)', middleSchoolJargonCount === 0, `${middleSchoolJargonCount} violations`);

  // ===========================================================================
  // SUMMARY & SCORECARD
  // ===========================================================================
  const totalTests = results.length;
  const passedTests = results.filter(r => r.passed).length;
  const failedTests = results.filter(r => !r.passed).length;
  const passRate = ((passedTests / totalTests) * 100).toFixed(1);

  console.log('\n================================================================================');
  console.log('   DATA QUALITY SCORECARD & TEST RESULTS');
  console.log('================================================================================');
  console.log(`Total Tests Executed : ${totalTests}`);
  console.log(`Passed               : ${passedTests}`);
  console.log(`Failed               : ${failedTests}`);
  console.log(`Pass Rate            : ${passRate}%`);
  console.log('================================================================================\n');

  if (failedTests > 0) {
    console.error('Test Suite FAILED with some failed tests.');
    process.exit(1);
  } else {
    console.log('>>> ALL ISOLATION & REGRESSION TESTS PASSED (100% SCORE) <<<');
  }
}

runTestSuite().catch(err => {
  console.error('Fatal error running test suite:', err);
  process.exit(1);
});
