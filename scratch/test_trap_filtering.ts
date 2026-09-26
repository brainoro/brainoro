import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

interface ConceptContext {
  id: string;
  boardId: string;
  subjectId: string;
  gradeLevel: number;
  title: string;
  unit?: string;
}

function getContextualDomainTraps(concept: ConceptContext): string[] {
  const subj = (concept.subjectId || '').toUpperCase();
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''}`.toUpperCase();

  if (subj === 'PHYSICS' || searchStr.includes('-PHYSICS-') || searchStr.includes('OPTICS') || searchStr.includes('MOTION') || searchStr.includes('ELEC') || searchStr.includes('SOUND') || searchStr.includes('LIGHT') || searchStr.includes('LENS')) {
    if (searchStr.includes('OPT') || searchStr.includes('LENS') || searchStr.includes('MIRROR') || searchStr.includes('LIGHT')) {
      return [
        'Cartesian Sign Convention: Object distance u is always negative; convex lens focal length f is positive.',
        'Formula Difference: Thin Lens is 1/f = 1/v - 1/u (minus), while Mirror is 1/f = 1/v + 1/u (plus).',
        'Unit of Optical Power: Always convert focal length from cm to meters (m) before computing P = 1/f in dioptres (D).'
      ];
    }
    if (searchStr.includes('ELEC') || searchStr.includes('OHM') || searchStr.includes('CIRCUIT')) {
      return [
        'Parallel Resistance Reciprocal: Remember to invert 1/R_p to find R_p after adding fractional reciprocals.',
        'Meter Connections: Ammeter must connect strictly in series (low resistance); Voltmeter strictly in parallel (high resistance).',
        'Wire Geometry Invariant: Stretching a wire doubles length and halves area, increasing resistance by 4-fold.'
      ];
    }
    return [
      'Unit Conversions: Always convert non-standard units (cm → m, km/h → m/s, minutes → seconds) before calculating.',
      'Vector Direction: State positive/negative directional reference frames for velocity, force, and acceleration.',
      'Formula Statement: State the governing physical law equation before substituting numerical values.'
    ];
  }

  if (subj === 'CHEMISTRY' || searchStr.includes('-CHEM-') || searchStr.includes('ACID') || searchStr.includes('REACTION') || searchStr.includes('ATOM')) {
    return [
      'State Symbols: Always include physical states (s, l, g, aq) in balanced chemical equations when prompted.',
      'Stoichiometric Balance: Verify atom conservation on both reactant and product sides before calculating.',
      'Valency Criss-Cross: Double-check cation and anion oxidation numbers when writing chemical formulas.'
    ];
  }

  if (subj === 'BIOLOGY' || searchStr.includes('-BIO-') || searchStr.includes('HEART') || searchStr.includes('CELL') || searchStr.includes('CIRCULAT') || searchStr.includes('LIFE')) {
    return [
      'Directional Arrows: Always draw directional flow arrows in circulatory and physiological sequence diagrams.',
      'Precise Biological Terms: Use exact terms (e.g. peristalsis, pulmonary, alveoli) rather than colloquial descriptions.',
      'Valve Function: State that valves prevent backflow of blood, rather than actively pumping blood.'
    ];
  }

  // Mathematics domains:
  const isMensuration = searchStr.includes('MENSUR') || searchStr.includes('AREA') || searchStr.includes('VOLUME') || searchStr.includes('PERIMETER') || searchStr.includes('SURFACE');
  const isGeometry = searchStr.includes('GEOM') || searchStr.includes('TRIANGLE') || searchStr.includes('CIRCLE') || searchStr.includes('CONGRU') || searchStr.includes('QUAD');
  const isAlgebra = searchStr.includes('ALGEBRA') || searchStr.includes('EQUATION') || searchStr.includes('POLYNOMIAL') || searchStr.includes('QUADRATIC') || searchStr.includes('LINEQ');

  if (isMensuration) {
    return [
      'Dimension Consistency: Ensure length, breadth, and height share identical units (cm or m) before multiplying.',
      'Square vs Cubic Units: Record perimeter in linear units (cm), area in square units (cm²), volume in cubic units (cm³).',
      'Radius vs Diameter: Verify whether the question provides diameter (d) and divide by 2 to find radius (r).'
    ];
  }

  if (isGeometry) {
    return [
      'Theorem Justification: State the governing geometric theorem in brackets for every deductive step.',
      'Corresponding Vertex Order: Match vertices strictly in corresponding order when writing congruence or similarity: ΔABC ≅ ΔPQR.',
      'Angle Sum Invariant: Triangle interior angles sum strictly to 180°; quadrilateral interior angles sum to 360°.'
    ];
  }

  if (isAlgebra) {
    return [
      'Distributive Negative Sign: Distribute negative signs to all terms inside brackets: -(ax - b) = -ax + b.',
      'Transposition Sign Flip: Moving a term across the equals sign inverts its sign (+ to -, × to ÷).',
      'LHS = RHS Check: Substitute the evaluated solution back into the original equation to verify correctness.'
    ];
  }

  // Numbers & Arithmetic (Fractions, Integers, Decimals, Ratios)
  return [
    'BODMAS / Order of Operations: Evaluate brackets and multiplication/division before addition/subtraction.',
    'Negative Sign Rules: Remember subtracting a negative is adding: a - (-b) = a + b, and (-) × (-) = (+).',
    'Denominator Zero Invariant: Division by zero is strictly undefined; always simplify fractions to lowest terms.'
  ];
}

function filterAndSanitizeTraps(curriculumTrap: string, concept: ConceptContext): string[] {
  if (!curriculumTrap) return getContextualDomainTraps(concept);

  const subj = (concept.subjectId || '').toUpperCase();
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''}`.toUpperCase();
  const isMensuration = searchStr.includes('MENSUR') || searchStr.includes('AREA') || searchStr.includes('VOLUME') || searchStr.includes('PERIMETER');
  const isGeometry = searchStr.includes('GEOM') || searchStr.includes('TRIANGLE') || searchStr.includes('CIRCLE');

  // Strip academic mark-scheme prose
  const pitfallSection = curriculumTrap
    .split(/2\.\s+Explanation Depth Requirements/i)[0]
    .replace(/^Key exam trap for [^\:]+:\s*/i, '')
    .replace(/^CBSE Board Exam Traps[^\:]*:\s*/i, '')
    .replace(/1\.\s+Common Pitfalls & Mark-Loss Patterns:\s*/i, '')
    .trim();

  const lines = pitfallSection.split('\n').map(l => l.trim()).filter(Boolean);
  const rawItems: string[] = [];

  for (const line of lines) {
    const match = line.match(/^(\d+[\.\)]\s+)(.+)/);
    if (match) {
      let text = match[2].trim();
      const sentences = text.split(/(?<=[.?!])\s+/);
      let shortText = sentences[0];
      if (sentences.length > 1 && shortText.length < 70) {
        shortText += ' ' + sentences[1];
      }
      rawItems.push(shortText);
    } else if (rawItems.length > 0 && line.startsWith('•')) {
      if (rawItems.length < 4) {
        rawItems.push(line.replace(/^•\s*/, ''));
      }
    }
    if (rawItems.length >= 5) break;
  }

  // Relevance filtering: filter out out-of-context traps
  const relevantItems = rawItems.filter(item => {
    const uItem = item.toUpperCase();

    // If topic is NOT mensuration, reject mensuration traps
    if (!isMensuration && (uItem.includes('MENSURATION') || uItem.includes('PERIMETER') || uItem.includes('CM²') || uItem.includes('CM³') || uItem.includes('UNITS OF MENSURATION'))) {
      return false;
    }

    // If topic is Physics/Chemistry/Biology, reject pure algebraic quadratic/mensuration traps
    if ((subj === 'PHYSICS' || subj === 'CHEMISTRY' || subj === 'BIOLOGY') && (uItem.includes('QUADRATIC') || uItem.includes('MENSURATION') || uItem.includes('SQUARE ROOTS') || uItem.includes('BODMAS'))) {
      return false;
    }

    // If topic is Numbers/Arithmetic, reject geometric theorem traps
    if (!isGeometry && (uItem.includes('GEOMETRIC THEOREM') || uItem.includes('CONSTRUCTION') || uItem.includes('DOTTED LINES'))) {
      return false;
    }

    return true;
  });

  // If we have at least 2 relevant traps, return up to 3-4
  if (relevantItems.length >= 2) {
    return relevantItems.slice(0, 3);
  }

  // Otherwise, combine relevant items with domain fallback traps
  const fallbackTraps = getContextualDomainTraps(concept);
  const combined = [...relevantItems];
  for (const fb of fallbackTraps) {
    if (combined.length >= 3) break;
    if (!combined.some(existing => existing.toLowerCase().includes(fb.slice(0, 15).toLowerCase()))) {
      combined.push(fb);
    }
  }

  return combined.slice(0, 3);
}

async function runTest() {
  const testIds = [
    'CBSE-G6-MATH-NUMSYS-INT',
    'CBSE-G10-PHYSICS-OPT-LENS',
    'CBSE-G7-BIOLOGY-CIRC-HEART',
    'CAMBRIDGE-G7-MATH-FRAC-MULT',
    'IB_MYP-G8-PHYSICS-SOUND-FREQ'
  ];

  const { data } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, title, unit, metadata')
    .in('id', testIds);

  for (const c of data || []) {
    const concept: ConceptContext = {
      id: c.id,
      boardId: c.board_id,
      subjectId: c.subject_id,
      gradeLevel: Number(c.grade_level),
      title: c.title,
      unit: c.unit,
    };

    console.log('================================================================');
    console.log(`Concept: ${concept.id} (${concept.title}) [${concept.subjectId} G${concept.gradeLevel}]`);
    const traps = filterAndSanitizeTraps(c.metadata?.cornell_notes?.curriculumTrap, concept);
    console.log('Filtered Traps:');
    traps.forEach((t, i) => console.log(`  ${i + 1}. ✔ ${t}`));
  }
}

runTest().catch(console.error);
