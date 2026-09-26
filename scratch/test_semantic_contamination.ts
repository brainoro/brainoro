/**
 * Brainoro Cognitive OS — Semantic Content Contamination Audit
 * Path: scratch/test_semantic_contamination.ts
 *
 * Word-boundary and context-aware contamination audit across all 846 concepts.
 */

import fs from 'fs';
import path from 'path';

const cachePath = path.resolve(process.cwd(), 'scratch/remediated_blueprints_cache.json');
const cache: any[] = JSON.parse(fs.readFileSync(cachePath, 'utf8'));

interface ContaminationRule {
  ruleName: string;
  appliesTo: (item: any) => boolean;
  check: (item: any) => { contaminated: boolean; details?: string };
}

const RULES: ContaminationRule[] = [
  // 1. Non-trig Geometry: No trigonometric ratios (sin, cos, tan) in structuralRule
  {
    ruleName: 'Trigonometry in Non-Trig Geometry',
    appliesTo: (item) => {
      const s = (item.concept_id + ' ' + item.title).toUpperCase();
      const isGeom = s.includes('GEO') || s.includes('CONGRU') || s.includes('QUAD') || s.includes('POLYGON') || s.includes('EUCLID');
      const isTrig = s.includes('TRIG');
      return isGeom && !isTrig;
    },
    check: (item) => {
      const rule = item.notes?.structuralRule || '';
      // Check for \sin, \cos, \tan, \cot, \sec, \csc in LaTeX
      const trigMatch = rule.match(/\\(sin|cos|tan|cot|sec|csc)\b/i);
      if (trigMatch) {
        return { contaminated: true, details: `Found ${trigMatch[0]} in structuralRule: ${rule}` };
      }
      return { contaminated: false };
    }
  },

  // 2. Nuclear Physics: No Ray Optics terms (snell, mirror formula, lens formula)
  {
    ruleName: 'Ray Optics in Nuclear Physics',
    appliesTo: (item) => {
      const s = (item.concept_id + ' ' + item.title).toUpperCase();
      return s.includes('NUCLEAR') || s.includes('FISSION') || s.includes('RADIOACTIV');
    },
    check: (item) => {
      const text = JSON.stringify(item.notes).toLowerCase();
      const opticsTerms = ['snell', 'mirror formula', 'lens formula', 'angle of incidence', 'angle of refraction'];
      for (const term of opticsTerms) {
        if (text.includes(term)) {
          return { contaminated: true, details: `Found optics term '${term}'` };
        }
      }
      return { contaminated: false };
    }
  },

  // 3. Sound / Waves: No Kinematic Equations (v = u + at, etc.)
  {
    ruleName: 'Kinematics in Sound/Waves',
    appliesTo: (item) => {
      const s = (item.concept_id + ' ' + item.title).toUpperCase();
      return (s.includes('SOUND') || s.includes('ACOUSTIC') || s.includes('PENDULUM')) && !s.includes('KINEMAT');
    },
    check: (item) => {
      const rule = item.notes?.structuralRule || '';
      if (rule.includes('v = u + at') || rule.includes('v^2 - u^2') || rule.includes('s = ut')) {
        return { contaminated: true, details: `Found kinematic motion equation in structuralRule: ${rule}` };
      }
      return { contaminated: false };
    }
  },

  // 4. Middle School Math (Grade 6-8): No Formal Set Theory Symbols in structuralRule
  {
    ruleName: 'Formal Set Theory in Middle School Math',
    appliesTo: (item) => {
      const isMS = Number(item.grade_level) <= 8;
      const isMath = (item.concept_id || '').includes('MATH');
      return isMS && isMath;
    },
    check: (item) => {
      const rule = item.notes?.structuralRule || '';
      if (rule.includes('\\mathbb{Z}') || rule.includes('\\mathbb{Q}') || rule.includes('\\mathbb{R}')) {
        return { contaminated: true, details: `Found set theory notation in structuralRule: ${rule}` };
      }
      return { contaminated: false };
    }
  },

  // 5. Biology / Life Sciences: No Electrical Circuitry (Ohm's Law, Resistors)
  {
    ruleName: 'Electrical Physics in Biology',
    appliesTo: (item) => {
      const isBio = (item.subject_id || '').toUpperCase().includes('BIO') || (item.concept_id || '').toUpperCase().includes('BIOLOGY');
      return isBio;
    },
    check: (item) => {
      const rule = item.notes?.structuralRule || '';
      if (rule.includes('V = I \\times R') || rule.includes('V = IR') || rule.includes('R_{\\text{series}}')) {
        return { contaminated: true, details: `Found Ohm's Law in structuralRule: ${rule}` };
      }
      return { contaminated: false };
    }
  },

  // 6. Data Handling / Statistics: No Algebra Invariant (x + a = b) or NumberLine
  {
    ruleName: 'Algebra / NumberLine in Data Handling',
    appliesTo: (item) => {
      const s = (item.concept_id + ' ' + item.title).toUpperCase();
      return s.includes('DATA-TABLES') || s.includes('DATA-BAR') || s.includes('DATA-PROB') || s.includes('TALLY') || s.includes('FREQUENCY TABLE');
    },
    check: (item) => {
      const rule = item.notes?.structuralRule || '';
      const diag = item.notes?.diagramType || item.diagram_type;
      if (rule.includes('x + a = b') || rule.includes('x = b - a') || rule.includes('LHS \\equiv RHS')) {
        return { contaminated: true, details: `Found algebra invariant in structuralRule: ${rule}` };
      }
      if (diag === 'number_line') {
        return { contaminated: true, details: `Found number_line diagram assignment` };
      }
      return { contaminated: false };
    }
  }
];

function runSemanticAudit() {
  console.log('================================================================================');
  console.log('   BRAINORO COGNITIVE OS — SEMANTIC CONTAMINATION AUDIT (ALL 846 CONCEPTS)');
  console.log('================================================================================\n');

  let totalEvaluations = 0;
  let totalViolations = 0;

  for (const rule of RULES) {
    const matchingItems = cache.filter(rule.appliesTo);
    let ruleViolations = 0;

    for (const item of matchingItems) {
      totalEvaluations++;
      const result = rule.check(item);
      if (result.contaminated) {
        ruleViolations++;
        totalViolations++;
        console.error(`❌ VIOLATION | [${rule.ruleName}] Concept: ${item.concept_id} - ${result.details}`);
      }
    }

    const status = ruleViolations === 0 ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} | [${rule.ruleName}] Evaluated ${matchingItems.length} concepts (${ruleViolations} violations)`);
  }

  console.log('\n================================================================================');
  console.log('   SEMANTIC CONTAMINATION AUDIT SUMMARY');
  console.log('================================================================================');
  console.log(`Total Concept-Rule Checks : ${totalEvaluations}`);
  console.log(`Total Violations Found    : ${totalViolations}`);
  console.log(`Cleanliness Score         : ${(((totalEvaluations - totalViolations) / totalEvaluations) * 100).toFixed(2)}%`);
  console.log('================================================================================\n');

  if (totalViolations > 0) {
    process.exit(1);
  }
}

runSemanticAudit();
