/**
 * Brainoro Cognitive OS — Master Audit & Fix Diagnostic Script
 * Path: scripts/audit_and_fix_brainoro.ts
 *
 * PHASE 1 — Read-Only Audit Mode (default)
 * Scans all curriculum concepts (target ~846) across CBSE, Cambridge, IB_MYP.
 * Detects:
 *   [CHECK_1] Content-ID Mismatch  — DB text payload does not match concept_id/title category
 *   [CHECK_2] Visual Fallback      — deduceDiagramCategory returns a likely-wrong generic type
 *   [CHECK_3] Templated Text       — boilerplate placeholder sentences detected
 *
 * Output: scratch/audit_report.json + scratch/audit_report.md (never auto-modifies data)
 *
 * Usage:
 *   npx ts-node scripts/audit_and_fix_brainoro.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Path resolution (run from root OR from frontend/)
const baseDir = fs.existsSync(path.resolve(__dirname, '../frontend/src'))
  ? path.resolve(__dirname, '../frontend/src')
  : path.resolve(__dirname, '../src');

const { CONCEPTS_DATA } = require(path.join(baseDir, 'lib/data/curriculumData'));
const { getContentForTopic } = require(path.join(baseDir, 'lib/services/contentService'));
const { deduceDiagramCategory } = require(path.join(baseDir, 'components/cornell/VisualModelCard'));

// Supabase Configuration
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = cleanSupabaseUrl && cleanSupabaseKey
  ? createClient(cleanSupabaseUrl, cleanSupabaseKey)
  : null;

// Types
export type FlagType = 'CONTENT_ID_MISMATCH' | 'VISUAL_FALLBACK' | 'TEMPLATED_TEXT';

export interface AuditFlag {
  flagType: FlagType;
  description: string;
  details?: any;
}

export interface AuditRecord {
  concept_id: string;
  board_id: string;
  grade_level: number;
  subject_id: string;
  unit: string;
  title: string;
  resolved_diagram: string;
  flags: AuditFlag[];
}

export interface AuditReport {
  generated_at: string;
  total_scanned: number;
  data_source: string;
  summary: {
    total_flagged: number;
    content_id_mismatches: number;
    visual_fallback_issues: number;
    templated_text_issues: number;
    by_board: Record<string, { total: number; flagged: number }>;
    by_subject: Record<string, { total: number; flagged: number }>;
  };
  flagged_records: AuditRecord[];
  clean_records_count: number;
}

// Keyword Taxonomy Map
// Per subject/unit, defines keywords EXPECTED in content, and FORBIDDEN keywords
// (their presence indicates wrong topic content has been stored).
const KEYWORD_TAXONOMY: Record<string, { expectedAny: string[]; forbidden: string[] }> = {
  REACTIVITY_SERIES:    { expectedAny: ['reactivity', 'displacement', 'electropositive', 'metal', 'activity series', 'potassium', 'sodium', 'zinc', 'copper'], forbidden: ['litmus', 'neutrali', 'antacid', 'ph scale', 'indicator colour'] },
  ACIDS_BASES:          { expectedAny: ['acid', 'base', 'neutral', 'ph', 'litmus', 'indicator', 'alkali'], forbidden: ['reactivity series', 'displacement', 'electropositive'] },
  ATOMIC_STRUCTURE:     { expectedAny: ['electron', 'proton', 'neutron', 'nucleus', 'orbit', 'shell', 'bohr', 'atomic number'], forbidden: ['ph', 'acid', 'reactivity'] },
  CHEMICAL_BONDING:     { expectedAny: ['bond', 'covalent', 'ionic', 'electron pair', 'molecule', 'lewis', 'electronegativity'], forbidden: ['reactivity series', 'ph scale'] },
  STATES_OF_MATTER:     { expectedAny: ['solid', 'liquid', 'gas', 'particle', 'melting', 'boiling', 'evaporation'], forbidden: ['reactivity', 'bond type', 'acid'] },
  TEMPERATURE_HEAT:     { expectedAny: ['temperature', 'heat', 'thermal', 'conduction', 'convection', 'radiation', 'celsius', 'kelvin'], forbidden: ['pendulum', 'potential energy of height', 'velocity-time graph', 'ohm'] },
  WORK_ENERGY:          { expectedAny: ['work', 'energy', 'kinetic', 'potential', 'joule', 'conservation'], forbidden: ['temperature', 'heat transfer', 'conduction', 'acid', 'ph'] },
  SOUND_WAVES:          { expectedAny: ['sound', 'wave', 'frequency', 'amplitude', 'pitch', 'vibration', 'echo'], forbidden: ['light refraction', 'optics', 'lens', 'electric circuit'] },
  RAY_OPTICS:           { expectedAny: ['light', 'reflection', 'refraction', 'mirror', 'lens', 'image', 'snell'], forbidden: ['sound', 'heat transfer', 'electric circuit'] },
  ELECTRICITY:          { expectedAny: ['current', 'voltage', 'resistance', 'ohm', 'circuit', 'ampere', 'conductor'], forbidden: ['sound wave', 'heat conduction', 'lens', 'kinetic energy of motion'] },
  POINTS_LINES_ANGLES:  { expectedAny: ['point', 'line', 'ray', 'angle', 'segment', 'vertex', 'collinear', 'acute', 'obtuse'], forbidden: ['negative number on number line', 'addition of integers', 'fraction bar', 'denominator'] },
  FRACTIONS:            { expectedAny: ['fraction', 'numerator', 'denominator', 'equivalent', 'decimal', 'mixed number', 'proper', 'improper'], forbidden: ['velocity', 'acceleration', 'circuit', 'angle sum'] },
  INTEGERS:             { expectedAny: ['integer', 'negative', 'positive', 'number line', 'absolute value', 'whole number'], forbidden: ['fraction bar', 'denominator', 'decimal point value', 'angle', 'ray of light'] },
  TRIANGLES:            { expectedAny: ['triangle', 'angle sum', 'congruent', 'similar', 'hypotenuse', 'pythagor', 'isosceles'], forbidden: ['integer', 'fraction', 'number line', 'velocity'] },
  XYLEM_PHLOEM:         { expectedAny: ['xylem', 'phloem', 'transpiration', 'translocation', 'vascular', 'sap', 'water transport'], forbidden: ['heart pumps', 'blood circulation', 'cardiac', 'digestive enzyme', 'neuron'] },
  HEART_CIRCULATION:    { expectedAny: ['heart', 'atrium', 'ventricle', 'blood', 'artery', 'vein', 'circulation', 'pulmonary'], forbidden: ['xylem', 'phloem', 'photosynthesis glucose', 'digestive enzyme'] },
  PHOTOSYNTHESIS:       { expectedAny: ['photosynthesis', 'chlorophyll', 'glucose', 'chloroplast', 'sunlight', 'carbon dioxide', 'stomata'], forbidden: ['heart', 'blood', 'neuron reflex', 'digestive'] },
  CELLULAR_RESPIRATION: { expectedAny: ['atp', 'glycolysis', 'krebs', 'respiration', 'mitochondria', 'glucose oxidation'], forbidden: ['photosynthesis chlorophyll', 'heart beat', 'xylem sap'] },
};

function getTaxonomyKey(conceptId: string, title: string, unit: string, subjectId: string): string | null {
  const s = `${conceptId} ${title} ${unit}`.toUpperCase();
  const subj = subjectId.toUpperCase();

  if (subj.includes('CHEM')) {
    if (s.includes('REACTIV') || s.includes('DISPLACEMENT') || s.includes('MET-DISP') || s.includes('ACTIVITY SERIES')) return 'REACTIVITY_SERIES';
    if (s.includes('ACID') || s.includes('BASE') || s.includes('PH') || s.includes('NEUTRAL') || s.includes('ALKALI')) return 'ACIDS_BASES';
    if (s.includes('ATOM') || s.includes('BOHR') || s.includes('ELECTRON CONFIG') || s.includes('ATOMIC STRUCT')) return 'ATOMIC_STRUCTURE';
    if (s.includes('BOND') || s.includes('COVALENT') || s.includes('IONIC')) return 'CHEMICAL_BONDING';
    if (s.includes('MATTER') || s.includes('STATE') || s.includes('SOLID') || s.includes('LIQUID')) return 'STATES_OF_MATTER';
  }
  if (subj.includes('PHYS')) {
    if ((s.includes('TEMP') && s.includes('HEAT')) || s.includes('HEAT TRANSFER') || s.includes('THERMAL') || s.includes('CALORIMETR')) return 'TEMPERATURE_HEAT';
    if (s.includes('WORK') || s.includes('KINETIC') || s.includes('POTENTIAL') || s.includes('CONSERVATION') || s.includes('ENERGY POWER')) return 'WORK_ENERGY';
    if (s.includes('SOUND') || s.includes('ACOUSTIC') || s.includes('ECHO') || s.includes('SONAR')) return 'SOUND_WAVES';
    if (s.includes('OPTIC') || s.includes('MIRROR') || s.includes('LENS') || s.includes('REFLECT') || s.includes('REFRACT')) return 'RAY_OPTICS';
    if (s.includes('CIRCUIT') || s.includes('OHM') || s.includes('CURRENT') || s.includes('VOLT') || s.includes('RESIST')) return 'ELECTRICITY';
  }
  if (subj.includes('MATH')) {
    if (s.includes('POINT') || s.includes('RAY') || s.includes('ANGLE') || s.includes('LINE SEGMENT') || s.includes('PERPENDICULAR')) return 'POINTS_LINES_ANGLES';
    if (s.includes('FRAC') || s.includes('DECIMAL') || s.includes('EQUIVALEN')) return 'FRACTIONS';
    if (/\bINTEGER\b/.test(s) || s.includes('NUMBER LINE') || s.includes('WHOLE NUMBER')) return 'INTEGERS';
    if (s.includes('TRIANGLE') || s.includes('PYTHAGOR') || s.includes('TRIG')) return 'TRIANGLES';
  }
  if (subj.includes('BIO')) {
    if (s.includes('XYLEM') || s.includes('PHLOEM') || s.includes('VASCULAR') || s.includes('TRANSPIRAT')) return 'XYLEM_PHLOEM';
    if (s.includes('HEART') || s.includes('CIRCULAT') || s.includes('CARDIAC') || s.includes('BLOOD FLOW')) return 'HEART_CIRCULATION';
    if (s.includes('PHOTO') || s.includes('CHLORO') || s.includes('STOMATA')) return 'PHOTOSYNTHESIS';
    if (s.includes('ATP') || s.includes('GLYCOL') || s.includes('KREBS') || (s.includes('RESPIR') && s.includes('CELL'))) return 'CELLULAR_RESPIRATION';
  }
  return null;
}

const BOILERPLATE_PATTERNS: RegExp[] = [
  /state the primary definition and rule governing/i,
  /calculate the result when standard numerical values are applied to/i,
  /apply the core formula of .{3,60} to solve/i,
  /what is the main conceptual rule of .{3,60}\?/i,
  /\[concept_id\]/i,
  /\[topic_name\]/i,
  /typical exam question for .{3,60}:/i,
];

function detectTemplatedText(text: string): string[] {
  const hits: string[] = [];
  for (const pat of BOILERPLATE_PATTERNS) {
    const m = text.match(pat);
    if (m) hits.push(m[0]);
  }
  return hits;
}

const GENERIC_CATEGORY_SIGNALS = new Set([
  'math_generic', 'physics_generic', 'chemistry_generic', 'biology_generic', 'concept_keycard',
]);

async function runAudit() {
  console.log('================================================================================');
  console.log('   BRAINORO OS - MASTER AUDIT & DIAGNOSTIC PIPELINE (v2.0)');
  console.log('================================================================================\n');

  let rawRecords: any[] = [];
  let dataSource = 'canonical_local_dataset';

  if (supabase) {
    console.log('[Step 1] Attempting Supabase curriculum_concepts query...');
    try {
      const { data, error } = await supabase.from('curriculum_concepts').select('*');
      if (!error && data && data.length > 0) {
        rawRecords = data;
        dataSource = 'supabase:curriculum_concepts';
        console.log(`  OK Loaded ${data.length} records from Supabase.\n`);
      } else {
        console.warn(`  WARN Supabase: ${error?.message || '0 records'}. Using local dataset.\n`);
        rawRecords = CONCEPTS_DATA;
      }
    } catch (err: any) {
      console.warn(`  WARN Supabase connection error: ${err.message}. Using local dataset.\n`);
      rawRecords = CONCEPTS_DATA;
    }
  } else {
    console.log('[Step 1] Supabase not configured. Using local canonical dataset.\n');
    rawRecords = CONCEPTS_DATA;
  }

  const concepts: any[] = rawRecords.map((r: any) => {
    if (r.board_id) {
      return {
        id: r.id || r.concept_id,
        boardId: r.board_id,
        subjectId: r.subject_id,
        gradeLevel: Number(r.grade_level) || 9,
        unit: r.unit || '',
        title: r.title || r.id,
        coreLogicEssence: r.core_logic_essence || '',
        metadata: r.metadata || {},
      };
    }
    return r;
  });

  console.log(`[Data Source] ${dataSource} -- ${concepts.length} concept records loaded.\n`);
  console.log('[Step 2] Running audit checks across all concepts...\n');

  const flaggedRecords: AuditRecord[] = [];
  const boardStats: Record<string, { total: number; flagged: number }> = {};
  const subjectStats: Record<string, { total: number; flagged: number }> = {};
  let check1Count = 0, check2Count = 0, check3Count = 0;

  for (let i = 0; i < concepts.length; i++) {
    const concept = concepts[i];
    const board = concept.boardId || 'UNKNOWN';
    const subj = concept.subjectId || 'UNKNOWN';

    if (!boardStats[board]) boardStats[board] = { total: 0, flagged: 0 };
    if (!subjectStats[subj]) subjectStats[subj] = { total: 0, flagged: 0 };
    boardStats[board].total++;
    subjectStats[subj].total++;

    const flags: AuditFlag[] = [];

    // CHECK 1: Content-ID Mismatch
    const taxonomyKey = getTaxonomyKey(concept.id, concept.title, concept.unit || '', subj);
    if (taxonomyKey) {
      const taxonomy = KEYWORD_TAXONOMY[taxonomyKey];
      if (taxonomy) {
        let notesText = '';
        try {
          const notes = await getContentForTopic(concept, concept.boardId);
          notesText = [
            notes.mainNotes || '',
            notes.coreAnalogy || '',
            notes.summary || '',
            notes.curriculumTrap || '',
            ...(notes.cueQuestions || []),
          ].join(' ').toLowerCase();
        } catch { notesText = ''; }

        if (notesText) {
          const hasExpected = taxonomy.expectedAny.some(kw => notesText.includes(kw.toLowerCase()));
          const hasForbidden = taxonomy.forbidden.filter(kw => notesText.includes(kw.toLowerCase()));
          if (!hasExpected || hasForbidden.length > 0) {
            flags.push({
              flagType: 'CONTENT_ID_MISMATCH',
              description: `Content taxonomy mismatch for "${concept.title}" [${concept.id}]`,
              details: {
                taxonomyKey,
                expectedKeywordsFound: hasExpected,
                forbiddenKeywordsFound: hasForbidden,
                hint: hasForbidden.length > 0
                  ? `Text contains forbidden keywords: [${hasForbidden.join(', ')}] - wrong topic content stored.`
                  : `None of expected keywords [${taxonomy.expectedAny.slice(0, 3).join(', ')}...] found in content.`,
              },
            });
            check1Count++;
          }
        }
      }
    }

    // CHECK 2: Visual Model Fallback
    let resolvedDiagram = 'unknown';
    try { resolvedDiagram = deduceDiagramCategory(concept, null); } catch { resolvedDiagram = 'error'; }

    if (resolvedDiagram === 'visual_model_pending') {
      flags.push({
        flagType: 'VISUAL_FALLBACK',
        description: `No topic-specific diagram for "${concept.title}" [${concept.id}]`,
        details: { resolvedDiagram, note: 'Correctly showing pending - needs dedicated diagram asset.' },
      });
      check2Count++;
    } else if (GENERIC_CATEGORY_SIGNALS.has(resolvedDiagram)) {
      flags.push({
        flagType: 'VISUAL_FALLBACK',
        description: `Generic subject fallback diagram for "${concept.title}" [${concept.id}]`,
        details: { resolvedDiagram },
      });
      check2Count++;
    }

    // CHECK 3: Templated Text
    let templateHits: string[] = [];
    try {
      const notes = await getContentForTopic(concept, concept.boardId);
      const allText = [
        ...(notes.cueQuestions || []),
        notes.mainNotes || '', notes.summary || '',
        notes.coreAnalogy || '', notes.verificationProblem || '',
        notes.workedExample?.problem || '',
      ].join(' ');
      templateHits = detectTemplatedText(allText);
    } catch { /* skip */ }

    if (templateHits.length > 0) {
      flags.push({
        flagType: 'TEMPLATED_TEXT',
        description: `Boilerplate text detected in "${concept.title}" [${concept.id}]`,
        details: { matchedPatterns: templateHits },
      });
      check3Count++;
    }

    if (flags.length > 0) {
      flaggedRecords.push({ concept_id: concept.id, board_id: board, grade_level: concept.gradeLevel, subject_id: subj, unit: concept.unit || '', title: concept.title, resolved_diagram: resolvedDiagram, flags });
      boardStats[board].flagged++;
      subjectStats[subj].flagged++;
    }

    if ((i + 1) % 50 === 0 || i + 1 === concepts.length) {
      process.stdout.write(`\r  Progress: ${i + 1}/${concepts.length} concepts scanned...`);
    }
  }

  console.log('\n');

  const report: AuditReport = {
    generated_at: new Date().toISOString(),
    total_scanned: concepts.length,
    data_source: dataSource,
    summary: {
      total_flagged: flaggedRecords.length,
      content_id_mismatches: check1Count,
      visual_fallback_issues: check2Count,
      templated_text_issues: check3Count,
      by_board: boardStats,
      by_subject: subjectStats,
    },
    flagged_records: flaggedRecords,
    clean_records_count: concepts.length - flaggedRecords.length,
  };

  const scratchDir = path.resolve(__dirname, '../scratch');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

  const jsonPath = path.join(scratchDir, 'audit_report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf-8');

  const mdLines: string[] = [
    '# Brainoro Cognitive OS - Audit Report',
    '',
    `**Generated:** ${report.generated_at}`,
    `**Data Source:** ${report.data_source}`,
    `**Total Scanned:** ${report.total_scanned}`,
    '',
    '## Summary',
    '',
    '| Metric | Count |',
    '|---|---|',
    `| Total Flagged | ${report.summary.total_flagged} |`,
    `| Content-ID Mismatches (CHECK_1) | ${report.summary.content_id_mismatches} |`,
    `| Visual Fallback Issues (CHECK_2) | ${report.summary.visual_fallback_issues} |`,
    `| Templated Text Issues (CHECK_3) | ${report.summary.templated_text_issues} |`,
    `| Clean Records | ${report.clean_records_count} |`,
    '',
    '### By Board',
    '',
    '| Board | Total | Flagged | Clean |',
    '|---|---|---|---|',
    ...Object.entries(report.summary.by_board).map(([b, s]) => `| ${b} | ${s.total} | ${s.flagged} | ${s.total - s.flagged} |`),
    '',
    '### By Subject',
    '',
    '| Subject | Total | Flagged | Clean |',
    '|---|---|---|---|',
    ...Object.entries(report.summary.by_subject).map(([subj, s]) => `| ${subj} | ${s.total} | ${s.flagged} | ${s.total - s.flagged} |`),
    '',
    '## Flagged Records',
    '',
  ];

  for (const rec of report.flagged_records) {
    mdLines.push(`### [${rec.concept_id}] ${rec.title}`);
    mdLines.push(`- **Board:** ${rec.board_id} | **Grade:** ${rec.grade_level} | **Subject:** ${rec.subject_id}`);
    mdLines.push(`- **Unit:** ${rec.unit}`);
    mdLines.push(`- **Resolved Diagram:** \`${rec.resolved_diagram}\``);
    mdLines.push('');
    for (const flag of rec.flags) {
      mdLines.push(`#### ${flag.flagType}`);
      mdLines.push(flag.description);
      if (flag.details) {
        mdLines.push('```');
        mdLines.push(JSON.stringify(flag.details, null, 2));
        mdLines.push('```');
      }
    }
    mdLines.push('---');
  }

  const mdPath = path.join(scratchDir, 'audit_report.md');
  fs.writeFileSync(mdPath, mdLines.join('\n'), 'utf-8');

  console.log('================================================================================');
  console.log('   BRAINORO OS - AUDIT COMPLETE');
  console.log('================================================================================\n');
  console.log(`Total Concepts Scanned   : ${report.total_scanned}`);
  console.log(`Total Flagged            : ${report.summary.total_flagged}`);
  console.log(`  Content-ID Mismatch    : ${report.summary.content_id_mismatches}`);
  console.log(`  Visual Fallback        : ${report.summary.visual_fallback_issues}`);
  console.log(`  Templated Text         : ${report.summary.templated_text_issues}`);
  console.log(`Clean Records            : ${report.clean_records_count}`);
  console.log(`\nReports saved:`);
  console.log(`  JSON -> ${jsonPath}`);
  console.log(`  Markdown -> ${mdPath}\n`);

  return report;
}

if (require.main === module) {
  runAudit().catch(err => {
    console.error('Audit failed:', err);
    process.exit(1);
  });
}

export { runAudit };
