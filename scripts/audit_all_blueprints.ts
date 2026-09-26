/**
 * Brainoro OS — 100% Automated Database & Blueprint Audit Pipeline
 * Path: scripts/audit_all_blueprints.ts
 *
 * Validates all 846 curriculum blueprints against:
 * - Check A (Mapping Overlaps): Duplicate JSON content or identical graphical model configs
 * - Check B (Pedagogy/Keyword Mismatches): Cross-domain keyword leaks (Trig in Geometry, Optics in Nuclear/Thermo, Motion in Sound/Pendulum)
 * - Check C (LaTeX Parser Violations): Raw unescaped tags (\mathbf), set character 'C', missing $$ wrappers
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Load Curriculum Data & Core Content Generator
// Works when run from root or frontend/
const baseDir = fs.existsSync(path.resolve(__dirname, '../frontend/src'))
  ? path.resolve(__dirname, '../frontend/src')
  : path.resolve(__dirname, '../src');

const { CONCEPTS_DATA } = require(path.join(baseDir, 'lib/data/curriculumData'));
const { getContentForTopic } = require(path.join(baseDir, 'lib/services/contentService'));
const { deduceDiagramCategory } = require(path.join(baseDir, 'components/cornell/VisualModelCard'));

// Supabase Configuration
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gyjlrgudysqabwbhaskr.supabase.co/rest/v1/';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amxyZ3VkeXNxYWJ3Ymhhc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI1ODUsImV4cCI6MjEwNDk4ODU4NX0.N_SDVcl0PoN39n9sHApC_nEy8fI0xRqhj3IFvG6zbeI';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

export interface AnomalyRecord {
  concept_id: string;
  board_id: string;
  grade_level: number;
  title: string;
  unit: string;
  failed_checks: ('CHECK_A' | 'CHECK_B' | 'CHECK_C')[];
  check_a_failures?: {
    type: string;
    description: string;
    details?: any;
  }[];
  check_b_failures?: {
    type: string;
    description: string;
    matched_terms: string[];
  }[];
  check_c_failures?: {
    type: string;
    description: string;
    violations: string[];
  }[];
}

async function runAudit() {
  console.log('================================================================================');
  console.log('   BRAINORO OS — AUTOMATED CURRICULUM BLUEPRINT AUDIT PIPELINE');
  console.log('================================================================================\n');

  // 1. Query Table: Attempt 'curriculum_blueprints', fallback to 'curriculum_concepts' / canonical seed
  console.log(`[Step 1] Querying records from Supabase table 'curriculum_blueprints'...`);
  let rawRecords: any[] = [];
  let sourceName = 'curriculum_blueprints';

  try {
    const { data, error } = await supabase.from('curriculum_blueprints').select('*');
    if (error || !data || data.length === 0) {
      console.warn(`Notice: Table 'curriculum_blueprints' returned: ${error ? error.message : '0 records'}.`);
      console.log(`Querying table 'curriculum_concepts' (high-performance unified table)...`);
      const ccRes = await supabase.from('curriculum_concepts').select('*');
      if (ccRes.error || !ccRes.data || ccRes.data.length === 0) {
        console.warn(`Notice: Supabase 'curriculum_concepts' query returned: ${ccRes.error ? ccRes.error.message : '0 records'}.`);
        console.log(`Falling back to canonical curriculum concepts dataset (846 nodes)...\n`);
        sourceName = 'canonical_local_dataset';
        rawRecords = CONCEPTS_DATA;
      } else {
        sourceName = 'public.curriculum_concepts';
        rawRecords = ccRes.data;
      }
    } else {
      rawRecords = data;
    }
  } catch (err: any) {
    console.warn(`Connection note: ${err.message}. Using canonical curriculum concepts dataset (846 nodes)...\n`);
    sourceName = 'canonical_local_dataset';
    rawRecords = CONCEPTS_DATA;
  }

  console.log(`[Data Source] Successfully loaded ${rawRecords.length} records from '${sourceName}'.\n`);

  // Map records to CurriculumConcept format
  const concepts: any[] = rawRecords.map((r: any) => {
    // If from DB snake_case
    if (r.board_id) {
      return {
        id: r.id || r.concept_id,
        boardId: r.board_id,
        subjectId: r.subject_id,
        gradeLevel: Number(r.grade_level) || 9,
        unit: r.unit || r.metadata?.unit || 'Unit 1: Core Concepts',
        title: r.title,
        coreLogicEssence: r.core_logic_essence,
        parentNodeId: r.parent_node_id || null,
        prerequisites: Array.isArray(r.prerequisites) ? r.prerequisites : [],
        metadata: r.metadata || {}
      };
    }
    // Already in camelCase
    return r;
  });

  console.log(`[Step 2] Executing Validation Tests across all ${concepts.length} blueprints:`);
  console.log(` - Check A: Mapping Overlaps (Duplicate JSON content or Identical Graphical Model Configs)`);
  console.log(` - Check B: Pedagogy/Keyword Mismatches (Cross-topic leaks in Geometry, Nuclear/Thermo, Sound/Pendulum)`);
  console.log(` - Check C: LaTeX Parser Violations (Raw \\mathbf, set char 'C', missing $$ wrappers)\n`);

  // Anomaly maps
  const anomaliesByConcept = new Map<string, AnomalyRecord>();

  const getOrCreateAnomaly = (concept: any): AnomalyRecord => {
    if (!anomaliesByConcept.has(concept.id)) {
      anomaliesByConcept.set(concept.id, {
        concept_id: concept.id,
        board_id: concept.boardId,
        grade_level: concept.gradeLevel,
        title: concept.title,
        unit: concept.unit || '',
        failed_checks: [],
        check_a_failures: [],
        check_b_failures: [],
        check_c_failures: []
      });
    }
    return anomaliesByConcept.get(concept.id)!;
  };

  // Evaluate all notes & diagrams
  const evaluationList: Array<{
    concept: any;
    notes: any;
    diagram: string;
    fullContent: string;
    payloadSignature: string;
  }> = [];

  // Grouping for Check A
  const payloadToConcepts = new Map<string, Array<{ id: string; title: string; unit: string }>>();
  const diagramToConcepts = new Map<string, Array<{ id: string; title: string; unit: string }>>();

  for (const concept of concepts) {
    const notes = await getContentForTopic(concept, concept.boardId);
    const diagram = deduceDiagramCategory(concept, notes);

    const fullContent = [
      notes.structuralRule || '',
      notes.mainNotes || '',
      notes.curriculumTrap || '',
      notes.summary || '',
      notes.coreAnalogy || '',
      notes.verificationProblem || '',
      notes.workedExample?.problem || '',
      notes.workedExample?.result || '',
      ...(notes.cueQuestions || [])
    ].join(' ');

    // Pedagogical content signature for duplicate detection
    const payloadSignature = JSON.stringify({
      rule: notes.structuralRule,
      notes: notes.mainNotes,
      analogy: notes.coreAnalogy,
      trap: notes.curriculumTrap,
      workedExampleProblem: notes.workedExample?.problem
    });

    if (!payloadToConcepts.has(payloadSignature)) {
      payloadToConcepts.set(payloadSignature, []);
    }
    payloadToConcepts.get(payloadSignature)!.push({
      id: concept.id,
      title: concept.title,
      unit: concept.unit || ''
    });

    if (!diagramToConcepts.has(diagram)) {
      diagramToConcepts.set(diagram, []);
    }
    diagramToConcepts.get(diagram)!.push({
      id: concept.id,
      title: concept.title,
      unit: concept.unit || ''
    });

    evaluationList.push({
      concept,
      notes,
      diagram,
      fullContent,
      payloadSignature
    });
  }

  // -------------------------------------------------------------------------
  // CHECK A: Mapping Overlaps
  // 1. Duplicate JSON Content across distinct concept_ids
  // 2. Identical Graphical Model Configs in mismatched domains
  // -------------------------------------------------------------------------
  for (const [sig, group] of Array.from(payloadToConcepts.entries())) {
    if (group.length > 1) {
      for (const item of group) {
        const others = group.filter((x: any) => x.id !== item.id).map((x: any) => x.id);
        const record = getOrCreateAnomaly(item);
        if (!record.failed_checks.includes('CHECK_A')) {
          record.failed_checks.push('CHECK_A');
        }
        record.check_a_failures!.push({
          type: 'DUPLICATE_JSON_CONTENT',
          description: `Distinct concept_id shares identical blueprint JSON payload with ${others.length} other concepts.`,
          details: {
            shared_with_count: others.length,
            sample_shared_concepts: others.slice(0, 4)
          }
        });
      }
    }
  }

  // Check for mismatched identical graphical model configs
  for (const { concept, diagram } of evaluationList) {
    const titleUpper = (concept.title || '').toUpperCase();
    const unitUpper = (concept.unit || '').toUpperCase();
    const idUpper = (concept.id || '').toUpperCase();
    const fullTopic = `${idUpper} ${titleUpper} ${unitUpper}`;

    let isMismapped = false;
    let description = '';

    // Sound / Wave / Pendulum mapped to 1D motion graph
    if ((fullTopic.includes('SOUND') || fullTopic.includes('PENDULUM') || fullTopic.includes('WAVE') || fullTopic.includes('ACOUSTIC')) && diagram === 'motion_graph') {
      isMismapped = true;
      description = `Acoustic/Oscillation topic assigned kinematics 1D 'motion_graph' instead of 'wave_frequency'.`;
    }

    // Nuclear / Thermo mapped to ray_optics
    if ((fullTopic.includes('NUCLEAR') || fullTopic.includes('THERMODYNAMIC') || fullTopic.includes('HEAT') || fullTopic.includes('CALORIMETR')) && diagram === 'ray_optics') {
      isMismapped = true;
      description = `Nuclear/Thermodynamic topic assigned 'ray_optics' diagram config.`;
    }

    // Quadrilaterals / Polygons mapped to right-angled triangle diagram
    if ((fullTopic.includes('QUADRILATERAL') || fullTopic.includes('PARALLELOGRAM') || fullTopic.includes('RHOMBUS') || fullTopic.includes('TRAPEZ')) && diagram === 'triangle') {
      isMismapped = true;
      description = `Quadrilateral topic assigned right-angled 'triangle' diagram config.`;
    }

    if (isMismapped) {
      const record = getOrCreateAnomaly(concept);
      if (!record.failed_checks.includes('CHECK_A')) {
        record.failed_checks.push('CHECK_A');
      }
      record.check_a_failures!.push({
        type: 'MISMAPPED_GRAPHICAL_MODEL_CONFIG',
        description,
        details: {
          assigned_diagram: diagram
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // CHECK B: Pedagogy / Keyword Mismatches
  // 1. Trig terms (sin, cos, tan, hypotenuse) inside Geometry / Quadrilaterals / Congruence
  // 2. Optics terms (refraction, snell, mirror, lens) inside Nuclear Physics or Thermodynamics
  // 3. Motion terms (v = u + at) inside Pendulum / Sound
  // -------------------------------------------------------------------------
  for (const { concept, fullContent } of evaluationList) {
    const titleUpper = (concept.title || '').toUpperCase();
    const unitUpper = (concept.unit || '').toUpperCase();
    const idUpper = (concept.id || '').toUpperCase();
    const fullTopic = `${idUpper} ${titleUpper} ${unitUpper}`;

    // Test B1: Trig terms inside Geometry / Quadrilaterals / Congruence
    const isGeomQuadCong =
      (fullTopic.includes('QUADRILATERAL') ||
       fullTopic.includes('CONGRUENCE') ||
       fullTopic.includes('CONGRUENT') ||
       fullTopic.includes('PARALLELOGRAM') ||
       fullTopic.includes('RHOMBUS') ||
       fullTopic.includes('TRAPEZ') ||
       fullTopic.includes('POLYGON') ||
       (fullTopic.includes('GEOMETRY') && !fullTopic.includes('TRIG') && !fullTopic.includes('COORDINATE'))) &&
      !fullTopic.includes('TRIG');

    if (isGeomQuadCong) {
      const trigTerms: string[] = [];
      if (/\b(sin|cos|tan)\b|\\(sin|cos|tan)\b/i.test(fullContent)) trigTerms.push('sin/cos/tan');
      if (/hypotenuse/i.test(fullContent)) trigTerms.push('hypotenuse');

      if (trigTerms.length > 0) {
        const record = getOrCreateAnomaly(concept);
        if (!record.failed_checks.includes('CHECK_B')) {
          record.failed_checks.push('CHECK_B');
        }
        record.check_b_failures!.push({
          type: 'TRIG_TERMS_IN_GEOMETRY',
          description: `Trigonometry terms detected in Geometry/Quadrilaterals/Congruence topic.`,
          matched_terms: trigTerms
        });
      }
    }

    // Test B2: Optics terms inside Nuclear Physics or Thermodynamics
    const isNuclearOrThermo =
      fullTopic.includes('NUCLEAR') ||
      fullTopic.includes('RADIOACT') ||
      fullTopic.includes('THERMODYNAMIC') ||
      fullTopic.includes('CALORIMETR') ||
      (fullTopic.includes('HEAT') && !fullTopic.includes('LIGHT') && !fullTopic.includes('OPTIC')) ||
      fullTopic.includes('SPECIFIC HEAT');

    if (isNuclearOrThermo) {
      const opticsTerms: string[] = [];
      if (/refraction/i.test(fullContent)) opticsTerms.push('refraction');
      if (/snell/i.test(fullContent)) opticsTerms.push('snell');
      if (/\bmirror\b/i.test(fullContent)) opticsTerms.push('mirror');
      if (/\blens\b/i.test(fullContent)) opticsTerms.push('lens');

      if (opticsTerms.length > 0) {
        const record = getOrCreateAnomaly(concept);
        if (!record.failed_checks.includes('CHECK_B')) {
          record.failed_checks.push('CHECK_B');
        }
        record.check_b_failures!.push({
          type: 'OPTICS_TERMS_IN_NUCLEAR_OR_THERMO',
          description: `Optics terms detected in Nuclear Physics or Thermodynamics topic.`,
          matched_terms: opticsTerms
        });
      }
    }

    // Test B3: Motion terms (v = u + at) inside Pendulum / Sound
    const isPendulumOrSound =
      fullTopic.includes('PENDULUM') ||
      fullTopic.includes('SOUND') ||
      fullTopic.includes('ACOUSTIC') ||
      fullTopic.includes('ECHO') ||
      fullTopic.includes('SONAR') ||
      fullTopic.includes('AUDIBLE');

    if (isPendulumOrSound) {
      const motionTerms: string[] = [];
      if (/v\s*=\s*u\s*\+\s*at|s\s*=\s*ut|v\^2\s*=\s*u\^2/i.test(fullContent)) {
        motionTerms.push('v = u + at (kinematics)');
      }

      if (motionTerms.length > 0) {
        const record = getOrCreateAnomaly(concept);
        if (!record.failed_checks.includes('CHECK_B')) {
          record.failed_checks.push('CHECK_B');
        }
        record.check_b_failures!.push({
          type: 'MOTION_TERMS_IN_PENDULUM_OR_SOUND',
          description: `Kinematic 1D motion formula (v = u + at) detected in Pendulum or Sound topic.`,
          matched_terms: motionTerms
        });
      }
    }
  }

  // -------------------------------------------------------------------------
  // CHECK C: LaTeX Parser Violations
  // 1. Raw unescaped LaTeX tags (e.g. \mathbf or literal command strings in prose)
  // 2. Raw set character 'C' between sets (e.g. \mathbb{N} C \mathbb{W})
  // 3. Missing $$ wrappers in structuralRule or math blocks
  // -------------------------------------------------------------------------
  for (const { concept, notes, fullContent } of evaluationList) {
    const violations: string[] = [];

    // 1. Raw \mathbf
    if (/\\mathbf\b/.test(fullContent) || /\bmathbf\{/.test(fullContent)) {
      violations.push('Raw \\mathbf tag detected in math expression');
    }

    // 2. Raw set character 'C' between sets
    if (/\\mathbb\{[A-Z]\}\s+C\s+\\mathbb\{[A-Z]\}/.test(fullContent) || /\b[NWZQR]\s+C\s+[NWZQR]\b/.test(fullContent)) {
      violations.push("Raw set character 'C' detected between mathematical sets instead of \\subset");
    }

    // 3. Missing $$ wrappers in structuralRule
    if (notes.structuralRule && !notes.structuralRule.startsWith('$') && !notes.structuralRule.endsWith('$')) {
      violations.push('structuralRule formula is missing $ / $$ wrappers');
    }

    // 4. Raw unescaped LaTeX commands in non-math prose
    if (/\\(frac|sqrt|times|cdot|to|rightarrow|subset|mathbb)\b(?![^$]*\$)/.test(notes.summary)) {
      violations.push('Unescaped LaTeX command in summary outside math mode');
    }

    if (violations.length > 0) {
      const record = getOrCreateAnomaly(concept);
      if (!record.failed_checks.includes('CHECK_C')) {
        record.failed_checks.push('CHECK_C');
      }
      record.check_c_failures!.push({
        type: 'LATEX_PARSER_VIOLATION',
        description: `Unparsed LaTeX or invalid delimiter syntax detected.`,
        violations
      });
    }
  }

  // Convert to sorted array
  const anomalyLogArray: AnomalyRecord[] = Array.from(anomaliesByConcept.values()).sort((a, b) =>
    a.concept_id.localeCompare(b.concept_id)
  );

  // Statistics
  const countCheckA = anomalyLogArray.filter(a => a.failed_checks.includes('CHECK_A')).length;
  const countCheckB = anomalyLogArray.filter(a => a.failed_checks.includes('CHECK_B')).length;
  const countCheckC = anomalyLogArray.filter(a => a.failed_checks.includes('CHECK_C')).length;

  console.log('================================================================================');
  console.log('   AUDIT SUMMARY REPORT');
  console.log('================================================================================');
  console.log(`Total Curriculum Blueprints Audited : ${concepts.length}`);
  console.log(`Total Anomalous Records Identified  : ${anomalyLogArray.length}`);
  console.log(` - Check A Failures (Mapping Overlaps)        : ${countCheckA}`);
  console.log(` - Check B Failures (Keyword Mismatches)     : ${countCheckB}`);
  console.log(` - Check C Failures (LaTeX Parser Violations): ${countCheckC}`);
  console.log('================================================================================\n');

  // Breakdown of Check B
  console.log('--- CHECK B: BREAKDOWN BY PEDAGOGICAL MISMATCH CATEGORY ---');
  const bBreakdown: Record<string, number> = {};
  anomalyLogArray.forEach(a => {
    a.check_b_failures?.forEach(f => {
      bBreakdown[f.type] = (bBreakdown[f.type] || 0) + 1;
    });
  });
  console.log(JSON.stringify(bBreakdown, null, 2));

  // Save the full anomaly log array to JSON
  const outputDir = path.resolve(__dirname, '../scratch');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'blueprint_anomaly_log.json');
  fs.writeFileSync(outputPath, JSON.stringify(anomalyLogArray, null, 2), 'utf-8');
  console.log(`\nFull anomaly log array saved to: ${outputPath}`);

  // Print exact anomaly log array (or prominent sample and total list)
  console.log('\n================================================================================');
  console.log('   EXACT ANOMALY LOG ARRAY (SAMPLE FIRST 20 RECORDS)');
  console.log('================================================================================');
  console.log(JSON.stringify(anomalyLogArray.slice(0, 20), null, 2));

  // Also print all Check B anomalies in full since Check B contains the critical cross-topic leaks
  console.log('\n================================================================================');
  console.log('   CHECK B ANOMALY LOG ARRAY (ALL PEDAGOGY / KEYWORD MISMATCHES)');
  console.log('================================================================================');
  const allBRecords = anomalyLogArray
    .filter(a => a.failed_checks.includes('CHECK_B'))
    .map(a => ({
      concept_id: a.concept_id,
      board_id: a.board_id,
      grade_level: a.grade_level,
      title: a.title,
      unit: a.unit,
      mismatch_details: a.check_b_failures
    }));
  console.log(JSON.stringify(allBRecords, null, 2));

  return anomalyLogArray;
}

if (require.main === module) {
  runAudit().catch(err => {
    console.error('Audit failed with error:', err);
    process.exit(1);
  });
}

export { runAudit };
