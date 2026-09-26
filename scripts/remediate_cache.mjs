import fs from 'fs';
import path from 'path';

const cachePath = path.resolve(process.cwd(), 'scratch/remediated_blueprints_cache.json');
const feCachePath = path.resolve(process.cwd(), 'frontend/scratch/remediated_blueprints_cache.json');

console.log('Reading cache from:', cachePath);
const cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
console.log(`Loaded ${cache.length} blueprints from cache.`);

let dataHandlingCount = 0;
let latexFixCount = 0;
let diagramRemediatedCount = 0;

for (const item of cache) {
  const idUpper = (item.concept_id || '').toUpperCase();
  const titleUpper = (item.title || '').toUpperCase();
  const notes = item.notes;

  // 1. Fix LaTeX escape bugs (e.g. $$ext{ -> $$\text{)
  if (notes.structuralRule && notes.structuralRule.includes('$$ext{')) {
    notes.structuralRule = notes.structuralRule.replace(/\$\$ext\{/g, '$$\\text{');
    latexFixCount++;
  }

  // 2. Data Handling remediation
  const isDataTables = idUpper.includes('DATA-TABLES');
  const isDataBar = idUpper.includes('DATA-BAR');
  const isDataProb = idUpper.includes('DATA-PROB');

  if (isDataTables || isDataBar || isDataProb) {
    dataHandlingCount++;

    // Diagram must be visual_model_pending
    item.diagram_type = 'visual_model_pending';
    notes.diagramType = 'visual_model_pending';

    // Structural rule
    if (isDataTables) {
      notes.structuralRule = '$$\\text{Frequency Representation: } f_i = \\sum_{j} \\text{tally}_{ij} \\quad | \\quad \\sum f_i = N \\quad (\\text{Total Sample Size})$$';
    } else if (isDataBar) {
      notes.structuralRule = '$$\\text{Bar Chart Scale: } \\text{Bar Height} = f_i \\times \\text{Scale Factor} \\quad | \\quad \\sum f_i = N$$';
    } else if (isDataProb) {
      notes.structuralRule = '$$P(E) = \\frac{n(E)}{n(S)} = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of possible outcomes}} \\quad (0 \\le P(E) \\le 1)$$';
    }

    // Curriculum trap according to board
    if (item.board_id === 'CBSE') {
      notes.curriculumTrap = `Key exam trap for ${item.title}: CBSE Board Exam Traps & Marking Patterns:
1. Common Pitfalls & Mark-Loss Patterns:
1. Tally Mark Grouping Errors: Forgetting that the 5th tally mark is drawn diagonally across the cluster of 4 vertical marks, resulting in miscounting total frequencies.
2. Misinterpreting Graphical Table Scale: Reading raw bar heights or frequency counts without multiplying by the stated scale factor (e.g., 1 symbol = 5 items).
3. Sum Inconsistency: Failing to verify that the sum of the frequency column equals the total number of raw observations given in the problem statement.

2. Explanation Depth Requirements:
• 2-3 Mark Question (Frequency Distribution Tables):
  - Construct clean frequency distribution tables with three mandatory columns: 'Observation / Category', 'Tally Marks', and 'Frequency (f)'.
  - Include a dedicated Total row verifying that sum of frequencies equals sample size N.
• 4-5 Mark Question (Data Interpretation & Graphical Representation):
  - In bar graphs or pictographs: clearly state the scale used on each axis (e.g., 'Scale: 1 unit length = 10 units').
  - State analytical conclusions in complete sentences referencing the calculated values.

3. High-Yield Study & Revision Tips:
• Always verify that the sum of the frequency column equals the total number of raw observations given.
• Group tally marks strictly in bundles of 5 for quick visual verification.
• Label all table headers and graph axes with descriptive titles.`;
    } else if (item.board_id === 'CAMBRIDGE') {
      notes.curriculumTrap = `Key exam trap for ${item.title}: Cambridge Mark Scheme Guidance:
A) Common Mark-Loss Patterns:
1. Scale Factor Misreading: Reading frequency data from axes without accounting for non-unit scales (e.g. 1 major division = 5 units).
2. Incomplete Tally Clusters: Leaving raw tallies ungrouped instead of standard 5-bar gate format.
3. Missing Total Verification: Failing to check that sum of frequencies matches sample size N.

B) Command-Word Execution:
• COMPLETE: Complete frequency distribution tables with all category rows and totals.
• CALCULATE: Calculate relative or cumulative frequency showing all working.
• STATE: State modal group or range directly with correct units.

C) SI Unit & Rounding Precision:
• Always verify sum of frequencies equals sample size N.
• State clear axis labels and scale factors.`;
    } else if (item.board_id === 'IB_MYP') {
      notes.curriculumTrap = `Key exam trap for ${item.title}: IB MYP Inquiry & Criterion Framework:
A) Factual-Level Concept:
• How does frequency tabulation convert raw unorganized observations into structured empirical data?

B) Conceptual-Level Invariant:
• Tally clusters and frequency distribution tables preserve sample conservation: the sum of individual frequencies strictly equals the total sample size N.

C) Debatable / Global Context Application:
• To what extent can the choice of interval width or grouping in frequency tables unintentionally obscure or bias statistical trends in real-world data?

D) Assessment Criteria Focus (Criterion A & C):
• Criterion A: Selecting and applying appropriate statistical tables to organize discrete data.
• Criterion C: Communicating mathematical findings clearly using standard mathematical notation and organized tabular representations.`;
    }

    // Cue questions for IB_MYP
    if (item.board_id === 'IB_MYP') {
      notes.cueQuestions = [
        `Factual Inquiry: How are raw observations systematically recorded using tally marks and frequency distribution tables?`,
        `Conceptual Inquiry: How does data organization into tables preserve information while revealing distribution patterns?`,
        `Debatable Inquiry: To what extent does subjective category selection in tables affect empirical conclusions?`,
        `Criterion D Reflection: How do public health and environmental researchers use frequency tables to allocate resources?`
      ];
    }

    // Recompute fingerprint
    const fingerprintSource = `${item.concept_id}|${item.title}|${notes.structuralRule}|${notes.mainNotes.substring(0, 100)}`;
    let hashVal = 0;
    for (let j = 0; j < fingerprintSource.length; j++) {
      hashVal = ((hashVal << 5) - hashVal) + fingerprintSource.charCodeAt(j);
      hashVal |= 0;
    }
    item.payload_fingerprint = `FPT-${item.concept_id}-${Math.abs(hashVal).toString(16).padStart(8, '0')}`;
    notes.payloadFingerprint = item.payload_fingerprint;
  }
}

console.log(`Remediated Data Handling topics: ${dataHandlingCount}`);
console.log(`Fixed LaTeX formatting issues: ${latexFixCount}`);

fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
console.log(`Saved updated cache to: ${cachePath}`);

if (fs.existsSync(feCachePath)) {
  fs.writeFileSync(feCachePath, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`Saved updated cache to: ${feCachePath}`);
}

console.log('Cache remediation completed successfully.');
