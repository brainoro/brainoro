import React, { useMemo } from 'react';
import { CurriculumConcept, CornellNotes, BoardId } from '../../lib/types';
import { Globe, Compass, Atom, Dna, Calculator, Zap, AlertCircle, Clock } from 'lucide-react';
import { MathFormula, MathText } from '../common/MathRenderer';

interface Props {
  concept: CurriculumConcept;
  notes?: CornellNotes | null;
  boardId: BoardId;
}

export type ResolvedDiagramCategory =
  // Mathematics
  | 'number_line'
  | 'real_continuum'
  | 'coordinate_grid'
  | 'triangle'
  | 'parabola'
  | 'circle_geometry'
  | 'probability_curve'
  | 'math_generic'
  // Physics
  | 'magnetic_dip'
  | 'physics_vector'
  | 'ray_optics'
  | 'motion_graph'
  | 'circuit_diagram'
  | 'wave_frequency'
  | 'energy_transfer'
  | 'physics_generic'
  // Chemistry
  | 'bohr_atom'
  | 'chemical_bonding'
  | 'states_of_matter'
  | 'reaction_energy'
  | 'ph_scale'
  | 'periodic_trends'
  | 'chemistry_generic'
  // Biology
  | 'heart_circulation'
  | 'digestive_system'
  | 'respiratory_system'
  | 'plant_transport'
  | 'cellular_respiration'
  | 'cell_structure'
  | 'dna_helix'
  | 'trophic_pyramid'
  | 'photosynthesis_cycle'
  | 'neuron_synapse'
  | 'taxonomy_tree'
  | 'biology_generic'
  // Social Studies & Humanities
  | 'social_studies'
  // Strict Universal Fallback
  | 'concept_keycard'
  | 'visual_model_pending';

export const EXACT_CANVAS_DIAGRAMS = new Set<string>([
  'number_line',
  'real_continuum',
  'coordinate_grid',
  'triangle',
  'parabola',
  'circle_geometry',
  'probability_curve',
  'magnetic_dip',
  'physics_vector',
  'ray_optics',
  'motion_graph',
  'circuit_diagram',
  'wave_frequency',
  'energy_transfer',
  'bohr_atom',
  'chemical_bonding',
  'states_of_matter',
  'reaction_energy',
  'ph_scale',
  'periodic_trends',
  'heart_circulation',
  'digestive_system',
  'respiratory_system',
  'plant_transport',
  'cellular_respiration',
  'cell_structure',
  'dna_helix',
  'trophic_pyramid',
  'photosynthesis_cycle',
  'neuron_synapse',
  'taxonomy_tree',
  'social_studies',
]);

/**
 * Validates that a resolved diagram category strictly belongs to the concept's pedagogical domain.
 * Prevents cross-domain visual leakage (e.g. Number Line on Tally Marks, Trophic Pyramid on Vitamins).
 */
export function validateDiagramMapping(category: ResolvedDiagramCategory, concept: CurriculumConcept): boolean {
  if (category === 'visual_model_pending' || category === 'concept_keycard') return true;

  const essence = concept.coreLogicEssence || (concept as any).core_logic_essence || '';
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''} ${essence}`.toUpperCase();
  const subj = (concept.subjectId || (concept as any).subject_id || '').toUpperCase();
  const grade = Number(concept.gradeLevel || (concept as any).grade_level) || 9;
  const isMS = grade <= 8;

  switch (category) {
    case 'number_line': {
      if (
        searchStr.includes('TALLY') ||
        searchStr.includes('FREQUENCY') ||
        searchStr.includes('DATA TABLE') ||
        searchStr.includes('BAR GRAPH') ||
        searchStr.includes('HISTOGRAM') ||
        searchStr.includes('PIE CHART') ||
        (searchStr.includes('DATA') && !searchStr.includes('NUMBER LINE'))
      ) {
        return false;
      }
      return (
        subj.includes('MATH') &&
        (searchStr.includes('INT') ||
          searchStr.includes('FRAC') ||
          searchStr.includes('DECIMAL') ||
          searchStr.includes('NUMBER LINE') ||
          searchStr.includes('WHOLE NUMBER') ||
          searchStr.includes('NATURAL NUMBER') ||
          searchStr.includes('NUMBER SYSTEM') ||
          searchStr.includes('PRIME') ||
          searchStr.includes('DIVISIB') ||
          (isMS && searchStr.includes('RATIONAL')))
      );
    }
    case 'real_continuum': {
      if (isMS) return false;
      return (
        subj.includes('MATH') &&
        (searchStr.includes('REAL NUM') ||
          searchStr.includes('RATIONAL') ||
          searchStr.includes('IRRATIONAL') ||
          searchStr.includes('CONTINUUM') ||
          searchStr.includes('SURD') ||
          searchStr.includes('DECIMAL DENSITY'))
      );
    }
    case 'trophic_pyramid': {
      if (
        searchStr.includes('VITAMIN') ||
        searchStr.includes('NUTRI') ||
        searchStr.includes('DIET') ||
        searchStr.includes('DEFICIEN') ||
        searchStr.includes('DIGEST') ||
        searchStr.includes('MACROMOLECULE')
      ) {
        return false;
      }
      return (
        searchStr.includes('TROPHIC') ||
        searchStr.includes('ECOSYSTEM') ||
        searchStr.includes('FOOD WEB') ||
        searchStr.includes('FOOD CHAIN') ||
        searchStr.includes('BIOMASS')
      );
    }
    case 'motion_graph': {
      if (
        searchStr.includes('SOUND') ||
        searchStr.includes('LIGHT') ||
        searchStr.includes('OPTIC') ||
        searchStr.includes('WAVE') ||
        searchStr.includes('CIRCUIT')
      ) {
        return false;
      }
      return (
        searchStr.includes('MOTION') ||
        searchStr.includes('KINEMATIC') ||
        searchStr.includes('VELOCITY') ||
        searchStr.includes('ACCELERAT') ||
        searchStr.includes('SPEED-TIME') ||
        searchStr.includes('DISTANCE-TIME')
      );
    }
    case 'ray_optics': {
      if (searchStr.includes('NUCLEAR') || searchStr.includes('FISSION') || searchStr.includes('SOUND')) return false;
      return (
        searchStr.includes('OPTIC') ||
        searchStr.includes('MIRROR') ||
        searchStr.includes('LENS') ||
        searchStr.includes('REFLECT') ||
        searchStr.includes('REFRACT') ||
        searchStr.includes('SNELL') ||
        (/\bLIGHT\b/.test(searchStr) && !searchStr.includes('LIGHTER'))
      );
    }
    case 'circuit_diagram': {
      return (
        searchStr.includes('CIRCUIT') ||
        searchStr.includes('OHM') ||
        searchStr.includes('RESIST') ||
        searchStr.includes('VOLT') ||
        searchStr.includes('CURRENT') ||
        searchStr.includes('AMPERE')
      );
    }
    case 'wave_frequency': {
      return (
        searchStr.includes('SOUND') ||
        searchStr.includes('ACOUSTIC') ||
        searchStr.includes('PENDULUM') ||
        searchStr.includes('ECHO') ||
        searchStr.includes('SONAR') ||
        searchStr.includes('FREQUENCY') ||
        searchStr.includes('WAVE')
      );
    }
    case 'energy_transfer': {
      return (
        searchStr.includes('HEAT') ||
        searchStr.includes('THERMAL') ||
        searchStr.includes('CALORIMETR') ||
        searchStr.includes('CONDUCTION') ||
        searchStr.includes('CONVECTION') ||
        searchStr.includes('RADIATION') ||
        searchStr.includes('SPECIFIC HEAT')
      );
    }
    case 'triangle': {
      return subj.includes('MATH') && (searchStr.includes('TRIANGLE') || searchStr.includes('PYTHAGOR') || searchStr.includes('TRIG'));
    }
    case 'coordinate_grid': {
      if (
        isMS &&
        (searchStr.includes('LINE SEGMENT') ||
          searchStr.includes('RAY') ||
          searchStr.includes('ANGLE') ||
          searchStr.includes('POINT'))
      ) {
        return false;
      }
      return (
        subj.includes('MATH') &&
        (searchStr.includes('COORD') ||
          searchStr.includes('LINEQ') ||
          searchStr.includes('LINEAR') ||
          searchStr.includes('QUAD') ||
          searchStr.includes('POLYGON') ||
          searchStr.includes('LINE SEGMENT') ||
          searchStr.includes('RAY') ||
          searchStr.includes('ANGLE') ||
          searchStr.includes('PARALLEL'))
      );
    }
    case 'circle_geometry': {
      return (
        subj.includes('MATH') &&
        (searchStr.includes('CIRCLE') ||
          searchStr.includes('TANGENT') ||
          searchStr.includes('SECTOR') ||
          searchStr.includes('MENSURAT') ||
          searchStr.includes('SPHERE'))
      );
    }
    case 'parabola': {
      return subj.includes('MATH') && (searchStr.includes('PARABOLA') || searchStr.includes('QUADRATIC') || searchStr.includes('POLYNOMIAL'));
    }
    case 'probability_curve': {
      if (
        isMS ||
        searchStr.includes('TALLY') ||
        searchStr.includes('FREQUENCY') ||
        searchStr.includes('DATA TABLE') ||
        searchStr.includes('DATA-') ||
        searchStr.includes('BAR GRAPH') ||
        searchStr.includes('PICTOGRAPH')
      ) {
        return false;
      }
      return subj.includes('MATH') && (searchStr.includes('PROB') || searchStr.includes('NORMAL CURVE') || searchStr.includes('DISTRIB'));
    }
    case 'bohr_atom': {
      return searchStr.includes('ATOM') || searchStr.includes('BOHR') || searchStr.includes('ELECTRON CONFIG') || searchStr.includes('SHELL');
    }
    case 'chemical_bonding': {
      return searchStr.includes('BOND') || searchStr.includes('COVALENT') || searchStr.includes('IONIC') || searchStr.includes('LEWIS');
    }
    case 'states_of_matter': {
      return (
        searchStr.includes('STATE OF MATTER') ||
        searchStr.includes('STATES OF MATTER') ||
        searchStr.includes('SOLID') ||
        searchStr.includes('LIQUID') ||
        searchStr.includes('GAS') ||
        searchStr.includes('MELTING') ||
        searchStr.includes('BOILING') ||
        searchStr.includes('PARTICLE THEORY')
      );
    }
    case 'reaction_energy': {
      return (
        searchStr.includes('REACTION') ||
        searchStr.includes('EXOTHERMIC') ||
        searchStr.includes('ENDOTHERMIC') ||
        searchStr.includes('ACTIVATION') ||
        searchStr.includes('NUCLEAR') ||
        searchStr.includes('FISSION') ||
        searchStr.includes('FUSION')
      );
    }
    case 'ph_scale': {
      return (
        searchStr.includes('PH') ||
        searchStr.includes('ACID') ||
        searchStr.includes('BASE') ||
        searchStr.includes('ALKALI') ||
        searchStr.includes('LITMUS') ||
        searchStr.includes('NEUTRAL')
      );
    }
    case 'heart_circulation': {
      return (
        searchStr.includes('HEART') ||
        searchStr.includes('CIRCULAT') ||
        searchStr.includes('CARDIAC') ||
        searchStr.includes('BLOOD') ||
        searchStr.includes('ARTERY') ||
        searchStr.includes('VEIN')
      );
    }
    case 'digestive_system': {
      return (
        searchStr.includes('DIGEST') ||
        searchStr.includes('ALIMENTARY') ||
        searchStr.includes('STOMACH') ||
        searchStr.includes('INTESTINE') ||
        searchStr.includes('ENZYME')
      );
    }
    case 'respiratory_system': {
      return (
        searchStr.includes('RESPIRAT') ||
        searchStr.includes('BREATH') ||
        searchStr.includes('LUNG') ||
        searchStr.includes('GAS EXCHANGE') ||
        searchStr.includes('ALVEOLI')
      );
    }
    case 'plant_transport': {
      return (
        searchStr.includes('XYLEM') ||
        searchStr.includes('PHLOEM') ||
        searchStr.includes('TRANSPIRAT') ||
        searchStr.includes('TRANSLOCAT') ||
        searchStr.includes('VASCULAR')
      );
    }
    case 'cellular_respiration': {
      return (
        searchStr.includes('ATP') ||
        searchStr.includes('GLYCOL') ||
        searchStr.includes('KREBS') ||
        searchStr.includes('MITOCHOND') ||
        (searchStr.includes('RESPIR') && searchStr.includes('CELL'))
      );
    }
    case 'cell_structure': {
      return (
        searchStr.includes('ORGANELLE') ||
        searchStr.includes('MEMBRANE') ||
        searchStr.includes('CYTOPLASM') ||
        searchStr.includes('CELL WALL') ||
        (searchStr.includes('CELL') && !searchStr.includes('BLOOD'))
      );
    }
    case 'dna_helix': {
      return (
        searchStr.includes('DNA') ||
        searchStr.includes('GENET') ||
        searchStr.includes('CHROMOSOME') ||
        searchStr.includes('HEREDITY') ||
        searchStr.includes('GENE')
      );
    }
    case 'photosynthesis_cycle': {
      return (
        searchStr.includes('PHOTO') ||
        searchStr.includes('CHLORO') ||
        searchStr.includes('STOMATA') ||
        searchStr.includes('CHLOROPLAST')
      );
    }
    case 'neuron_synapse': {
      return searchStr.includes('NEURON') || searchStr.includes('NERVE') || searchStr.includes('SYNAPSE') || searchStr.includes('REFLEX ARC');
    }
    case 'taxonomy_tree': {
      return (
        searchStr.includes('CLASSIF') ||
        searchStr.includes('TAXON') ||
        searchStr.includes('SPECIES') ||
        searchStr.includes('KINGDOM') ||
        searchStr.includes('CLADOGRAM')
      );
    }
    case 'social_studies': {
      return subj.includes('SOC') || subj.includes('HIST') || subj.includes('GEOG') || subj.includes('POL') || subj.includes('CIVIC');
    }
    default:
      return false;
  }
}

function rawDeduceDiagramCategory(concept: CurriculumConcept, notes?: CornellNotes | null): ResolvedDiagramCategory {
  // 1. Explicit diagramType from notes or metadata if valid
  const rawExplicit = (notes?.diagramType || concept.metadata?.diagram_type || concept.metadata?.diagramType || '').toLowerCase().trim();
  const explicitType = rawExplicit === 'linear_graph' ? 'coordinate_grid' : rawExplicit;

  const grade = Number(concept.gradeLevel || (concept as any).grade_level) || 9;
  const isMS = grade <= 8;

  // Strict Pedagogical Boundary Lock: Middle School (Class 6-8) must NEVER render high-school real_continuum (Dedekind completeness / R notation)
  if (isMS && explicitType === 'real_continuum') {
    return 'number_line';
  }

  // Explicit visual_model_pending or concept_keycard mapping
  if (explicitType === 'visual_model_pending' || explicitType === 'concept_keycard') {
    return 'visual_model_pending';
  }

  const subject = (concept.subjectId || (concept as any).subject_id || '').toUpperCase();
  const essence = concept.coreLogicEssence || (concept as any).core_logic_essence || '';
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''} ${essence}`.toUpperCase();

  // Safeguard against false-positive number_line (e.g. data handling, tally marks, frequency tables, statistics, probability)
  if (explicitType === 'number_line') {
    const isDataOrStat =
      searchStr.includes('TALLY') ||
      searchStr.includes('FREQUENCY') ||
      searchStr.includes('DATA TABLE') ||
      searchStr.includes('BAR GRAPH') ||
      searchStr.includes('HISTOGRAM') ||
      searchStr.includes('PIE CHART') ||
      (searchStr.includes('DATA') && !searchStr.includes('NUMBER LINE'));
    if (isDataOrStat) {
      return 'visual_model_pending';
    }
    return 'number_line';
  }

  // Safeguard against false-positive trophic_pyramid (e.g. food nutrition, vitamins, diet, macromolecules)
  if (explicitType === 'trophic_pyramid') {
    const isNutrition = searchStr.includes('VITAMIN') || searchStr.includes('NUTRI') || searchStr.includes('DIET') || searchStr.includes('DEFICIEN') || searchStr.includes('DIGEST') || searchStr.includes('MACROMOLECULE');
    if (isNutrition) {
      return 'visual_model_pending';
    }
    return 'trophic_pyramid';
  }

  // Safeguard against false-positive motion_graph (e.g. sound, light, optics, circuit)
  if (explicitType === 'motion_graph') {
    const isWaveOrOptics = searchStr.includes('SOUND') || searchStr.includes('LIGHT') || searchStr.includes('OPTIC') || searchStr.includes('WAVE') || searchStr.includes('CIRCUIT');
    if (isWaveOrOptics) {
      return searchStr.includes('SOUND') || searchStr.includes('WAVE') ? 'wave_frequency' : searchStr.includes('OPTIC') || searchStr.includes('LIGHT') ? 'ray_optics' : 'visual_model_pending';
    }
    return 'motion_graph';
  }

  if (explicitType && EXACT_CANVAS_DIAGRAMS.has(explicitType)) {
    return explicitType as ResolvedDiagramCategory;
  }

  // 2. Discipline: MATHEMATICS
  if (subject === 'MATH' || subject.includes('MATH')) {
    // ── GEOMETRY PRIORITY (MUST come before all integer/number checks) ──────
    // "Points, Lines, Rays & Angles" was false-matching INT (substring of POINT).
    // Word-boundary safe: route explicit geometry topics to coordinate_grid.
    if (
      searchStr.includes('LINE SEGMENT') ||
      searchStr.includes('RAY') ||
      searchStr.includes('ANGLE') ||
      searchStr.includes('PERPENDICULAR') ||
      searchStr.includes('PARALLEL LINE') ||
      searchStr.includes('POINTS AND') ||
      searchStr.includes('LINES AND') ||
      searchStr.includes('POINTS, LINE') ||
      searchStr.includes('GEOMETR') ||
      searchStr.includes('SYMMETR') ||
      searchStr.includes('TRANSVERSAL') ||
      searchStr.includes('BEARING')
    ) {
      if (isMS) {
        return 'visual_model_pending';
      }
      return 'coordinate_grid';
    }

    // Quadrilaterals & Polygons have priority over general triangles
    if (searchStr.includes('QUAD') || searchStr.includes('PARALLEL') || searchStr.includes('PARALL') || searchStr.includes('POLYGON') || searchStr.includes('RHOMBUS') || searchStr.includes('TRAPEZ') || searchStr.includes('KITE')) {
      return 'coordinate_grid';
    }
    if (searchStr.includes('PYTHAGOR') || (searchStr.includes('TRIANGLE') && !searchStr.includes('PASCAL')) || searchStr.includes('TRIG')) {
      return 'triangle';
    }
    if (searchStr.includes('LINEQ') || searchStr.includes('LINEAR') || searchStr.includes('COORD') || searchStr.includes('INTERCEPT')) {
      return 'coordinate_grid';
    }
    // Fractions and Middle School rational arithmetic strictly map to number_line
    if (searchStr.includes('FRAC') || searchStr.includes('DECIMAL') || (isMS && searchStr.includes('RATIONAL'))) {
      return 'number_line';
    }
    if (searchStr.includes('RATIONAL') || searchStr.includes('REAL NUM') || searchStr.includes('IRRATIONAL') || searchStr.includes('CONTINUUM') || searchStr.includes('SURD') || searchStr.includes('DECIMAL DENSITY') || searchStr.includes('RADICAL')) {
      return isMS ? 'number_line' : 'real_continuum';
    }
    // Fix INT substring collision: use word-boundary regex so POINT/PRINT/DISTINCT don't match
    if (/\bINTEGERS?\b/.test(searchStr) || /\bINTEGRAL\b/.test(searchStr) || searchStr.includes('NUMBER LINE') || searchStr.includes('WHOLE NUMBER') || searchStr.includes('NATURAL NUMBER') || searchStr.includes('NUMBER SYSTEM')) {
      return 'number_line';
    }
    if (searchStr.includes('QUAD') || searchStr.includes('POLY') || searchStr.includes('PARABOLA') || searchStr.includes('ALGEBRA')) {
      return 'parabola';
    }
    if (searchStr.includes('CIRCLE') || searchStr.includes('TANGENT') || searchStr.includes('SECTOR') || searchStr.includes('MENSURAT') || searchStr.includes('SPHERE')) {
      return 'circle_geometry';
    }
    if (searchStr.includes('PROB') || searchStr.includes('STAT') || searchStr.includes('MEAN') || searchStr.includes('DISTRIB') || searchStr.includes('MEDIAN')) {
      if (
        isMS ||
        searchStr.includes('TALLY') ||
        searchStr.includes('FREQUENCY') ||
        searchStr.includes('DATA TABLE') ||
        searchStr.includes('DATA-') ||
        searchStr.includes('BAR GRAPH') ||
        searchStr.includes('PICTOGRAPH')
      ) {
        return 'visual_model_pending';
      }
      return 'probability_curve';
    }
    return 'visual_model_pending';
  }

  // 3. Discipline: PHYSICS
  if (
    subject === 'PHYSICS' ||
    subject.includes('PHYS') ||
    subject.includes('ELEC') ||
    searchStr.includes('-PHYS-') ||
    searchStr.includes('PHYSICS') ||
    ((subject.includes('SCI') || !subject) && (
      searchStr.includes('CIRCUIT') ||
      searchStr.includes('ELECTRIC') ||
      searchStr.includes('OHM') ||
      searchStr.includes('RESIST') ||
      searchStr.includes('VOLT') ||
      searchStr.includes('CURRENT') ||
      searchStr.includes('MAGNET') ||
      searchStr.includes('OPTIC') ||
      searchStr.includes('SNELL') ||
      searchStr.includes('NEWTON')
    ))
  ) {
    // 3A. Sound Waves, Acoustics & Pendulum Oscillations (PRIORITY over generic 1D motion)
    if (
      searchStr.includes('SOUND') ||
      searchStr.includes('ACOUSTIC') ||
      searchStr.includes('PENDULUM') ||
      searchStr.includes('ECHO') ||
      searchStr.includes('SONAR') ||
      (searchStr.includes('WAVE') && !searchStr.includes('LIGHT') && !searchStr.includes('ELECTROMAGNETIC')) ||
      searchStr.includes('FREQ') ||
      searchStr.includes('OSCILLAT') ||
      searchStr.includes('HERTZ')
    ) {
      return 'wave_frequency';
    }

    // 3B. Nuclear Physics & Radioactive Energy (PRIORITY over generic optics)
    if (
      searchStr.includes('NUCLEAR') ||
      searchStr.includes('FISSION') ||
      searchStr.includes('FUSION') ||
      searchStr.includes('RADIOACT') ||
      searchStr.includes('BINDING ENERGY')
    ) {
      return 'reaction_energy';
    }

    // 3C. Thermodynamics & Heat Transfer (EXPANDED — catches "Temperature vs Heat Energy")
    // These keywords must appear BEFORE the broad 3F ENERGY check.
    if (
      searchStr.includes('THERMODYNAMIC') ||
      searchStr.includes('CALORIMETR') ||
      searchStr.includes('SPECIFIC HEAT') ||
      searchStr.includes('TEMPERATURE VS') ||
      searchStr.includes('VS HEAT') ||
      searchStr.includes('HEAT ENERGY') ||
      searchStr.includes('HEAT TRANSFER') ||
      searchStr.includes('CONDUCTION') ||
      searchStr.includes('CONVECTION') ||
      searchStr.includes('RADIATION') ||
      searchStr.includes('LATENT HEAT') ||
      searchStr.includes('THERMAL EQUILIB') ||
      searchStr.includes('THERMAL EXPAN') ||
      searchStr.includes('CELSIUS') ||
      searchStr.includes('KELVIN') ||
      searchStr.includes('FAHRENHEIT') ||
      (searchStr.includes('TEMPERATURE') && searchStr.includes('HEAT'))
    ) {
      return 'energy_transfer';
    }

    if ((searchStr.includes('EARTH') && (searchStr.includes('MAG') || searchStr.includes('DIP') || searchStr.includes('FIELD'))) || searchStr.includes('MAGNETIC DIP') || searchStr.includes('MERIDIAN')) {
      return 'magnetic_dip';
    }

    // 3D. Ray Optics (Strict: Exclude Nuclear, Thermodynamics, and Sound)
    if (
      !searchStr.includes('NUCLEAR') &&
      !searchStr.includes('FISSION') &&
      (searchStr.includes('OPTIC') || searchStr.includes('REFLECT') || searchStr.includes('REFRACT') || searchStr.includes('MIRROR') || searchStr.includes('LENS') || (/\bLIGHT\b/.test(searchStr) && !searchStr.includes('LIGHTER') && !searchStr.includes('PHOTO')))
    ) {
      return 'ray_optics';
    }

    // 3E. Electricity, Circuits & Ohm's Law
    if (searchStr.includes('CIRCUIT') || searchStr.includes('ELECTRIC') || searchStr.includes('CURRENT') || searchStr.includes('VOLT') || searchStr.includes('OHM') || searchStr.includes('RESIST') || searchStr.includes('AMPERE')) {
      return 'circuit_diagram';
    }

    // 3F. Energy, Work, Power & Conservation (HIGHEST PRIORITY OVER GENERIC MOTION)
    if (
      searchStr.includes('ENERGY') ||
      searchStr.includes('WORK') ||
      searchStr.includes('KINETIC') ||
      searchStr.includes('POTENTIAL') ||
      searchStr.includes('JOULE') ||
      searchStr.includes('POWER') ||
      searchStr.includes('CONSERV')
    ) {
      return 'energy_transfer';
    }

    // 3G. Kinematic Motion Graphs (STRICT: equations of motion / displacement-time / velocity-time graphs ONLY)
    if (
      searchStr.includes('KINEMAT') ||
      searchStr.includes('EQUATION OF MOTION') ||
      searchStr.includes('VELOCITY-TIME') ||
      searchStr.includes('DISTANCE-TIME') ||
      searchStr.includes('DISPLACEMENT-TIME') ||
      (searchStr.includes('UNIFORM ACCELERAT') && !searchStr.includes('SOUND') && !searchStr.includes('WAVE') && !searchStr.includes('LIGHT'))
    ) {
      return 'motion_graph';
    }
    if (searchStr.includes('FREE BODY') || searchStr.includes('VECTOR DIAGRAM') || searchStr.includes('NEWTON THIRD') || searchStr.includes('NEWTON SECOND') || searchStr.includes('FRICTION COEFFICIENT') || searchStr.includes('RESULTANT FORCE')) {
      return 'physics_vector';
    }
    return 'visual_model_pending';
  }

  // 4. Discipline: CHEMISTRY
  if (subject === 'CHEMISTRY' || subject.includes('CHEM')) {
    // ── REACTIVITY SERIES & DISPLACEMENT (MUST come before generic REACT check) ────
    // "Reactivity Series & Single Displacement Reactions" was matching the broad
    // REACT check → wrongly returned reaction_energy. Route to periodic_trends
    // (the closest correct diagram showing metal ordering/trends).
    if (
      searchStr.includes('REACTIVITY SERIES') ||
      searchStr.includes('REACTIVITY ORDER') ||
      searchStr.includes('DISPLACEMENT REACTION') ||
      searchStr.includes('SINGLE DISPLACEMENT') ||
      searchStr.includes('DOUBLE DISPLACEMENT') ||
      searchStr.includes('ELECTROPOSITIVE') ||
      searchStr.includes('METAL ACTIVITY') ||
      searchStr.includes('ACTIVITY SERIES') ||
      (searchStr.includes('REACTIV') && searchStr.includes('METAL'))
    ) {
      return 'periodic_trends';
    }

    if (searchStr.includes('ATOM') || searchStr.includes('BOHR') || searchStr.includes('ELECTRON') || searchStr.includes('PROTON') || searchStr.includes('NUCLEUS') || searchStr.includes('ORBITAL') || searchStr.includes('ISOTOPE')) {
      return 'bohr_atom';
    }
    if (searchStr.includes('BOND') || searchStr.includes('MOLECULE') || searchStr.includes('COVALENT') || searchStr.includes('IONIC') || searchStr.includes('LEWIS')) {
      return 'chemical_bonding';
    }
    if (searchStr.includes('MATTER') || searchStr.includes('SOLID') || searchStr.includes('LIQUID') || searchStr.includes('GAS') || searchStr.includes('STATE') || searchStr.includes('PARTICLE')) {
      return 'states_of_matter';
    }
    // Tightened: exclude REACTIVITY to avoid matching the block above (now handled as periodic_trends)
    if ((searchStr.includes('REACT') && !searchStr.includes('REACTIV')) || searchStr.includes('EQUATION') || searchStr.includes('STOICH') || searchStr.includes('CATALYST') || searchStr.includes('EXOTHERM')) {
      return 'reaction_energy';
    }
    if (searchStr.includes('ACID') || searchStr.includes('BASE') || searchStr.includes('PH') || searchStr.includes('SALT') || searchStr.includes('NEUTRAL') || searchStr.includes('ALKALI')) {
      return 'ph_scale';
    }
    if (searchStr.includes('PERIODIC') || searchStr.includes('ELEMENT') || searchStr.includes('METALS') || searchStr.includes('TREND')) {
      return 'periodic_trends';
    }
    return 'visual_model_pending';
  }

  // 5. Discipline: BIOLOGY & LIFE SCIENCES
  if (subject === 'BIOLOGY' || subject.includes('BIO') || subject.includes('LIFE')) {
    // 5A. Ecological Trophic Pyramids & Biomagnification (STRICT: ecological food webs & pyramids only, NEVER vitamins/diet/macromolecules)
    if (
      searchStr.includes('TROPHIC') ||
      searchStr.includes('PYRAMID OF') ||
      searchStr.includes('BIOMAGNIF') ||
      (searchStr.includes('FOOD CHAIN') && !searchStr.includes('VITAMIN') && !searchStr.includes('NUTRI') && !searchStr.includes('DIET') && !searchStr.includes('DEFICIEN') && !searchStr.includes('DIGEST') && !searchStr.includes('MACROMOLECULE'))
    ) {
      return 'trophic_pyramid';
    }

    // 5B. Heart & Double Circulation
    if (
      searchStr.includes('HEART') ||
      searchStr.includes('CIRCULAT') ||
      searchStr.includes('BLOOD FLOW') ||
      searchStr.includes('CARDIAC') ||
      searchStr.includes('PULMONARY') ||
      searchStr.includes('SYSTEMIC') ||
      searchStr.includes('VENTRICLE') ||
      searchStr.includes('ATRIUM') ||
      searchStr.includes('VALVE') ||
      searchStr.includes('AORTA')
    ) {
      return 'heart_circulation';
    }

    // 5C. Human Digestive System
    if (
      searchStr.includes('DIGEST') ||
      searchStr.includes('ALIMENTARY') ||
      searchStr.includes('STOMACH') ||
      searchStr.includes('INTESTINE') ||
      searchStr.includes('VILLI') ||
      searchStr.includes('PERISTALSIS') ||
      (searchStr.includes('NUTRITION') && !searchStr.includes('PLANT'))
    ) {
      return 'digestive_system';
    }

    // 5D. Respiratory & Gas Exchange (Specific to respiratory organs)
    if (
      searchStr.includes('BREATH') ||
      searchStr.includes('ALVEOLI') ||
      searchStr.includes('GAS EXCHANGE') ||
      searchStr.includes('TRACHEA') ||
      searchStr.includes('BRONCH') ||
      searchStr.includes('LUNG') ||
      (searchStr.includes('RESPIRAT') && !searchStr.includes('CELL') && !searchStr.includes('ATP') && !searchStr.includes('GLYCOLYS'))
    ) {
      return 'respiratory_system';
    }

    // 5E. Plant Vascular Transport (Xylem & Phloem)
    if (
      searchStr.includes('XYLEM') ||
      searchStr.includes('PHLOEM') ||
      searchStr.includes('TRANSPIRAT') ||
      searchStr.includes('TRANSLOCAT') ||
      searchStr.includes('VASCULAR BUNDLE') ||
      searchStr.includes('SAP')
    ) {
      return 'plant_transport';
    }

    // 5F. Cellular Respiration & ATP Cycle
    if (
      searchStr.includes('ATP') ||
      searchStr.includes('GLYCOLYSIS') ||
      searchStr.includes('KREBS') ||
      (searchStr.includes('RESPIRAT') && searchStr.includes('CELL'))
    ) {
      return 'cellular_respiration';
    }

    // 5G. Photosynthesis & Chloroplasts
    if (
      searchStr.includes('PHOTO') ||
      searchStr.includes('CHLORO') ||
      searchStr.includes('STOMATA') ||
      searchStr.includes('LEAF') ||
      (searchStr.includes('PLANT') && searchStr.includes('NUTRITION'))
    ) {
      return 'photosynthesis_cycle';
    }

    // 5H. DNA Helix & Genetics
    if (
      searchStr.includes('DNA') ||
      searchStr.includes('GENET') ||
      searchStr.includes('CHROMOSOME') ||
      searchStr.includes('HEREDITY') ||
      searchStr.includes('GENE') ||
      searchStr.includes('MENDEL')
    ) {
      return 'dna_helix';
    }

    // 5I. Neuron & Synaptic Action Potential
    if (
      searchStr.includes('NEURON') ||
      searchStr.includes('NERVE') ||
      searchStr.includes('BRAIN') ||
      searchStr.includes('SYNAPSE') ||
      searchStr.includes('REFLEX ARC')
    ) {
      return 'neuron_synapse';
    }

    // 5J. Cell Structure & Organelles
    if (
      searchStr.includes('ORGANELLE') ||
      searchStr.includes('MEMBRANE') ||
      searchStr.includes('CYTOPLASM') ||
      searchStr.includes('MITOCHOND') ||
      searchStr.includes('CELL WALL') ||
      (searchStr.includes('CELL') && !searchStr.includes('BLOOD'))
    ) {
      return 'cell_structure';
    }

    // 5K. Taxonomy Cladogram
    if (
      searchStr.includes('CLASSIF') ||
      searchStr.includes('TAXON') ||
      searchStr.includes('DIVERSITY') ||
      searchStr.includes('SPECIES') ||
      searchStr.includes('KINGDOM')
    ) {
      return 'taxonomy_tree';
    }

    return 'visual_model_pending';
  }

  // 6. Social Studies & Humanities
  if (subject.includes('SOC') || subject.includes('HIST') || subject.includes('GEOG') || subject.includes('POL') || subject.includes('CIVIC')) {
    return 'social_studies';
  }

  // 7. Strict Fallback: Visual Model Pending Alert (Never a generic/mismatched diagram)
  return 'visual_model_pending';
}

export function deduceDiagramCategory(concept: CurriculumConcept, notes?: CornellNotes | null): ResolvedDiagramCategory {
  const candidate = rawDeduceDiagramCategory(concept, notes);
  if (candidate === 'visual_model_pending' || candidate === 'concept_keycard') {
    return 'visual_model_pending';
  }
  // Validate that candidate diagram strictly matches the concept domain
  if (!validateDiagramMapping(candidate, concept)) {
    return 'visual_model_pending';
  }
  return candidate;
}

export const VisualModelCard: React.FC<Props> = ({ concept, notes, boardId }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    return () => {
      // Memory cleanup: pause SVG animations and release DOM references on unmount
      if (containerRef.current) {
        const svgs = containerRef.current.querySelectorAll('svg');
        svgs.forEach(svg => {
          try {
            svg.pauseAnimations?.();
          } catch {
            // ignore if unsupported
          }
        });
      }
    };
  }, [concept.id]);

  const category = useMemo(() => deduceDiagramCategory(concept, notes), [concept, notes]);

  // Dynamic Subject-Appropriate Section Title and Icon (Purges all Cellular labels on Physics/Electrical)
  const headerInfo = useMemo(() => {
    if (category === 'visual_model_pending' || !EXACT_CANVAS_DIAGRAMS.has(category)) {
      return {
        title: 'INTERACTIVE VISUAL CANVAS',
        icon: Clock,
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        badgeText: 'VISUAL MODEL PENDING',
      };
    }

    const s = (concept.subjectId || '').toUpperCase();
    const idAndTitle = `${concept.id} ${concept.title || ''} ${concept.unit || ''}`.toUpperCase();

    // 1. Physics / Mechanical Energy / Electrical Circuit Models (HIGHEST PRIORITY: Purges all Cellular labels)
    const isEnergy =
      idAndTitle.includes('WORK') ||
      idAndTitle.includes('ENERGY') ||
      idAndTitle.includes('KINETIC') ||
      idAndTitle.includes('POTENTIAL') ||
      idAndTitle.includes('JOULE');

    const isElectricity =
      s.includes('ELEC') ||
      idAndTitle.includes('-ELEC-') ||
      idAndTitle.includes('CIRCUIT') ||
      idAndTitle.includes('OHM') ||
      idAndTitle.includes('RESIST') ||
      idAndTitle.includes('VOLT') ||
      idAndTitle.includes('CURRENT');

    const isPhysics =
      s === 'PHYSICS' ||
      s.includes('PHYS') ||
      idAndTitle.includes('PHYSICS') ||
      idAndTitle.includes('-PHYS-') ||
      isEnergy ||
      isElectricity ||
      idAndTitle.includes('MAGNET') ||
      idAndTitle.includes('OPTIC') ||
      idAndTitle.includes('FORCE') ||
      idAndTitle.includes('MOTION') ||
      idAndTitle.includes('WAVE');

    if (isPhysics) {
      if (isEnergy && !isElectricity) {
        return {
          title: 'PHYSICAL / MECHANICAL ENERGY SYSTEM MODEL',
          icon: Zap,
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          badgeText: undefined,
        };
      }
      return {
        title: 'PHYSICAL / ELECTRICAL CIRCUIT SYSTEM MODEL',
        icon: Zap,
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
        badgeText: undefined,
      };
    }

    // 2. Biology / Cellular System Model
    if (
      s === 'BIOLOGY' ||
      s.includes('BIO') ||
      s.includes('LIFE') ||
      idAndTitle.includes('BIOLOGY') ||
      idAndTitle.includes('-BIO-') ||
      idAndTitle.includes('CELL') ||
      idAndTitle.includes('TROPHIC') ||
      idAndTitle.includes('ECOSYSTEM') ||
      idAndTitle.includes('HEART') ||
      idAndTitle.includes('CIRCULAT') ||
      idAndTitle.includes('DIGEST') ||
      idAndTitle.includes('RESPIRAT') ||
      idAndTitle.includes('GENETIC') ||
      idAndTitle.includes('PLANT')
    ) {
      return {
        title: 'BIOLOGICAL / CELLULAR SYSTEM MODEL',
        icon: Dna,
        badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
        badgeText: undefined,
      };
    }

    // 3. Chemistry / Molecular Structure Model
    if (
      s === 'CHEMISTRY' ||
      s.includes('CHEM') ||
      idAndTitle.includes('CHEMISTRY') ||
      idAndTitle.includes('-CHEM-') ||
      idAndTitle.includes('MOLECULE') ||
      idAndTitle.includes('ATOM') ||
      idAndTitle.includes('BOND') ||
      idAndTitle.includes('REACTION') ||
      idAndTitle.includes('ACID') ||
      idAndTitle.includes('BASE') ||
      idAndTitle.includes('PERIODIC')
    ) {
      return {
        title: 'CHEMICAL / MOLECULAR STRUCTURE MODEL',
        icon: Atom,
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        badgeText: undefined,
      };
    }

    // 4. Mathematics / Geometric Model
    if (
      s === 'MATH' ||
      s.includes('MATH') ||
      idAndTitle.includes('MATH') ||
      idAndTitle.includes('-MATH-') ||
      idAndTitle.includes('GEOM') ||
      idAndTitle.includes('ALGEBRA') ||
      idAndTitle.includes('NUMBER') ||
      idAndTitle.includes('LINEAR') ||
      idAndTitle.includes('TRIANGLE') ||
      idAndTitle.includes('PROB')
    ) {
      return {
        title: 'GEOMETRIC / GRAPHICAL MODEL',
        icon: Calculator,
        badgeBg: 'bg-sky-50 text-sky-800 border-sky-200',
        badgeText: undefined,
      };
    }

    // 5. Social Studies / Humanities
    if (
      s.includes('SOC') ||
      s.includes('HIST') ||
      s.includes('GEOG') ||
      s.includes('POL') ||
      s.includes('CIVIC') ||
      idAndTitle.includes('SOC') ||
      idAndTitle.includes('HIST') ||
      idAndTitle.includes('GEOG')
    ) {
      return {
        title: 'GEOGRAPHICAL / SOCIO-HISTORICAL MODEL',
        icon: Globe,
        badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        badgeText: undefined,
      };
    }

    return {
      title: 'COGNITIVE / CONCEPTUAL SYSTEM MODEL',
      icon: Compass,
      badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      badgeText: undefined,
    };
  }, [category, concept.subjectId, concept.id, concept.title, concept.unit]);

  const HeaderIcon = headerInfo.icon;

  return (
    <div
      ref={containerRef}
      key={`${concept.id}-visual-container`}
      className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col justify-between items-center text-center shadow-xs relative overflow-hidden"
    >
      {/* Dynamic Header */}
      <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-800">
          <HeaderIcon className="w-3.5 h-3.5 text-sky-600" />
          <span>{headerInfo.title}</span>
        </div>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${headerInfo.badgeBg}`}>
          {headerInfo.badgeText || category.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* SVG Container */}
      <div className="w-full flex flex-col items-center justify-center my-auto py-1">
        {/* ========================================================================= */}
        {/* 1. MATHEMATICS MODELS                                                     */}
        {/* ========================================================================= */}

        {/* 1A. Number Line (Integers / Real Numbers / Operations) */}
        {category === 'number_line' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 240 130" className="w-56 h-32">
              <defs>
                <marker id="arrowRight" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
                </marker>
                <marker id="arrowLeft" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                  <polygon points="6 0, 0 3, 6 6" fill="#f43f5e" />
                </marker>
                <marker id="jumpArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                </marker>
              </defs>

              {/* Number Line Axis */}
              <line x1="20" y1="75" x2="220" y2="75" stroke="#64748b" strokeWidth="2.5" markerEnd="url(#arrowRight)" markerStart="url(#arrowLeft)" />

              {/* Negative Numbers Domain */}
              <rect x="25" y="65" width="80" height="20" fill="#f43f5e10" rx="3" />
              <text x="65" y="55" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">Negative Domain (-ℤ)</text>

              {/* Positive Numbers Domain */}
              <rect x="135" y="65" width="80" height="20" fill="#10b98110" rx="3" />
              <text x="175" y="55" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Positive Domain (+ℤ)</text>

              {/* Ticks and Labels */}
              {[-3, -2, -1, 0, 1, 2, 3].map((val, idx) => {
                const x = 45 + idx * 25;
                const isZero = val === 0;
                return (
                  <g key={val}>
                    <line x1={x} y1="68" x2={x} y2="82" stroke={isZero ? '#38bdf8' : '#94a3b8'} strokeWidth={isZero ? '2.5' : '1.5'} />
                    <text
                      x={x}
                      y="97"
                      fill={isZero ? '#38bdf8' : val < 0 ? '#f87171' : '#34d399'}
                      fontSize={isZero ? '11' : '10'}
                      fontWeight={isZero ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {val > 0 ? `+${val}` : val}
                    </text>
                  </g>
                );
              })}

              {/* Dynamic Integer Vector Operation Arc: -2 + 4 = +2 */}
              <path d="M 70 65 Q 107 20 145 65" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" markerEnd="url(#jumpArrow)" />
              <text x="107" y="28" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">+4 Steps Right</text>
              <circle cx="70" cy="75" r="4" fill="#f43f5e" />
              <circle cx="145" cy="75" r="4" fill="#10b981" />
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              {concept.id.includes('FRAC') || (concept.title || '').toUpperCase().includes('FRAC')
                ? 'a/b × c/d = (a·c)/(b·d) (Rational Fraction Partition Model)'
                : '-2 + (+4) = +2 (Discrete Number Line Operations)'}
            </div>
          </div>
        )}

        {/* 1A-2. Real Number Continuum (Rational & Irrational Density / Dedekind Completeness) */}
        {category === 'real_continuum' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 260 135" className="w-64 h-32">
              <defs>
                <marker id="realArrowRight" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#0284c7" />
                </marker>
                <marker id="realArrowLeft" markerWidth="6" markerHeight="6" refX="1" refY="3" orient="auto">
                  <polygon points="6 0, 0 3, 6 6" fill="#0284c7" />
                </marker>
              </defs>

              {/* Continuous Real Line Axis (ℝ) */}
              <line x1="15" y1="75" x2="245" y2="75" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#realArrowRight)" markerStart="url(#realArrowLeft)" />

              {/* Axis Label */}
              <text x="250" y="70" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="start">ℝ</text>
              <text x="8" y="70" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="end">-∞</text>

              {/* Major Integer Ticks: -1, 0, 1, 2 */}
              {[
                { val: -1, label: '-1', x: 45, isZero: false },
                { val: 0, label: '0', x: 85, isZero: true },
                { val: 1, label: '1', x: 135, isZero: false },
                { val: 2, label: '2', x: 195, isZero: false },
              ].map(tick => (
                <g key={tick.val}>
                  <line x1={tick.x} y1="68" x2={tick.x} y2="82" stroke={tick.isZero ? '#0f172a' : '#64748b'} strokeWidth={tick.isZero ? '2.5' : '1.5'} />
                  <text
                    x={tick.x}
                    y="97"
                    fill={tick.isZero ? '#0f172a' : '#64748b'}
                    fontSize={tick.isZero ? '11' : '10'}
                    fontWeight={tick.isZero ? 'bold' : 'normal'}
                    textAnchor="middle"
                  >
                    {tick.label}
                  </text>
                </g>
              ))}

              {/* Rational Coordinate: 1/2 */}
              <g>
                <line x1="110" y1="71" x2="110" y2="79" stroke="#10b981" strokeWidth="1.5" strokeDasharray="1,1" />
                <circle cx="110" cy="75" r="3.5" fill="#10b981" />
                <text x="110" y="62" fill="#059669" fontSize="9" fontWeight="bold" textAnchor="middle">1/2 ∈ ℚ</text>
              </g>

              {/* Irrational Coordinate: √2 ≈ 1.414 */}
              <g>
                <line x1="156" y1="71" x2="156" y2="79" stroke="#d97706" strokeWidth="1.5" strokeDasharray="1,1" />
                <circle cx="156" cy="75" r="3.5" fill="#d97706" />
                <line x1="156" y1="75" x2="156" y2="35" stroke="#d97706" strokeWidth="1" strokeDasharray="2,2" />
                <rect x="138" y="20" width="36" height="15" fill="#fef3c7" stroke="#d97706" strokeWidth="0.8" rx="3" />
                <text x="156" y="31" fill="#b45309" fontSize="9" fontWeight="bold" textAnchor="middle">√2 ∉ ℚ</text>
              </g>

              {/* Dense Domain Shading / Dedekind Completeness Indicator */}
              <rect x="35" y="105" width="190" height="18" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.8" rx="4" />
              <text x="130" y="117" fill="#475569" fontSize="8" textAnchor="middle">
                Dense Rationals (ℚ) + Irrationals (ℝ \ ℚ) = Complete Continuum (ℝ)
              </text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2">
              <span className="text-emerald-600 font-semibold">p/q ∈ ℚ</span>
              <span className="text-slate-400">|</span>
              <span className="text-amber-600 font-semibold">√2 ∉ ℚ</span>
              <span className="text-slate-400">|</span>
              <span className="text-sky-600 font-semibold">Continuous ℝ Axis</span>
            </div>
          </div>
        )}

        {/* 1B. Coordinate Grid & Linear Equation */}
        {category === 'coordinate_grid' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              {[30, 60, 90, 120, 150, 180].map(x => (
                <line key={`gx-${x}`} x1={x} y1="10" x2={x} y2="140" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
              ))}
              {[30, 60, 90, 120].map(y => (
                <line key={`gy-${y}`} x1="10" y1={y} x2="190" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2" />
              ))}

              <line x1="15" y1="75" x2="185" y2="75" stroke="#64748b" strokeWidth="2" />
              <line x1="100" y1="10" x2="100" y2="140" stroke="#64748b" strokeWidth="2" />
              <text x="188" y="79" fill="#64748b" fontSize="9">x</text>
              <text x="104" y="16" fill="#64748b" fontSize="9">y</text>
              <text x="92" y="87" fill="#64748b" fontSize="8">(0,0)</text>

              <line x1="30" y1="130" x2="170" y2="20" stroke="#0284c7" strokeWidth="2.5" />
              <circle cx="100" cy="75" r="3.5" fill="#0284c7" />
              <circle cx="140" cy="43" r="3.5" fill="#10b981" />
              <text x="155" y="45" fill="#10b981" fontSize="9">(x, y)</text>
              <circle cx="60" cy="106" r="3.5" fill="#f43f5e" />
              <text x="40" y="112" fill="#f43f5e" fontSize="9">Intercept</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              ax + by + c = 0 (Cartesian Locus)
            </div>
          </div>
        )}

        {/* 1C. Pythagoras / Trigonometric Triangle */}
        {category === 'triangle' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <polygon points="30,120 160,120 160,30" fill="#0284c715" stroke="#0284c7" strokeWidth="2.5" />
              <rect x="145" y="105" width="15" height="15" fill="none" stroke="#d97706" strokeWidth="1.5" />
              <text x="95" y="137" fill="#e11d48" fontSize="11" fontWeight="bold" textAnchor="middle">Base a</text>
              <text x="175" y="75" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="middle">Height b</text>
              <text x="85" y="65" fill="#059669" fontSize="12" fontWeight="bold" textAnchor="middle">Hypotenuse c</text>
              <text x="135" y="100" fill="#d97706" fontSize="9" textAnchor="middle">90°</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              a² + b² = c²  |  sin θ = opp / hyp
            </div>
          </div>
        )}

        {/* 1D. Quadratic Parabola Curve */}
        {category === 'parabola' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <line x1="20" y1="100" x2="180" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="100" y1="15" x2="100" y2="135" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M 40 25 Q 100 135 160 25" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <circle cx="100" cy="80" r="4" fill="#d97706" />
              <text x="100" y="68" fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">Vertex (h, k)</text>
              <circle cx="70" cy="100" r="3.5" fill="#f43f5e" />
              <circle cx="130" cy="100" r="3.5" fill="#10b981" />
              <text x="65" y="115" fill="#f43f5e" fontSize="9">Root α</text>
              <text x="135" y="115" fill="#10b981" fontSize="9">Root β</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              f(x) = ax² + bx + c  |  Δ = b² - 4ac
            </div>
          </div>
        )}

        {/* 1E. Circle Geometry & Mensuration */}
        {category === 'circle_geometry' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <circle cx="100" cy="75" r="50" fill="#0284c715" stroke="#0284c7" strokeWidth="2" />
              <line x1="100" y1="75" x2="145" y2="50" stroke="#10b981" strokeWidth="2" />
              <text x="125" y="55" fill="#10b981" fontSize="10" fontWeight="bold">r</text>
              <circle cx="100" cy="75" r="3" fill="#d97706" />
              <text x="92" y="78" fill="#d97706" fontSize="8">O</text>
              <line x1="145" y1="15" x2="145" y2="120" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="150" y="25" fill="#f43f5e" fontSize="9">Tangent</text>
              <line x1="50" y1="75" x2="100" y2="75" stroke="#64748b" strokeWidth="1.5" strokeDasharray="2,2" />
              <text x="70" y="70" fill="#64748b" fontSize="8">d = 2r</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              C = 2πr  |  Area = πr²  |  Sector = ½ r²θ
            </div>
          </div>
        )}

        {/* 1F. Probability & Statistics Curve */}
        {category === 'probability_curve' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <line x1="15" y1="120" x2="185" y2="120" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M 20 120 Q 60 118 80 80 T 100 25 T 120 80 Q 140 118 180 120 Z" fill="#0284c715" stroke="#0284c7" strokeWidth="2" />
              <line x1="100" y1="25" x2="100" y2="120" stroke="#d97706" strokeWidth="2" strokeDasharray="3,2" />
              <text x="100" y="18" fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">Mean μ</text>
              <line x1="75" y1="80" x2="75" y2="120" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="125" y1="80" x2="125" y2="120" stroke="#64748b" strokeWidth="1" strokeDasharray="2,2" />
              <text x="75" y="132" fill="#64748b" fontSize="8" textAnchor="middle">-1σ</text>
              <text x="125" y="132" fill="#64748b" fontSize="8" textAnchor="middle">+1σ</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              P(E) = n(E)/n(S)  |  ∫ P(x)dx = 1.0
            </div>
          </div>
        )}

        {/* 1G. Generic Math Locus Fallback (Dynamic Function Curve) */}
        {category === 'math_generic' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <line x1="20" y1="110" x2="180" y2="110" stroke="#64748b" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="130" stroke="#64748b" strokeWidth="2" />
              <path d="M 40 100 Q 90 20 170 40" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <circle cx="100" cy="55" r="4" fill="#10b981" />
              <line x1="60" y1="75" x2="140" y2="35" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="145" y="32" fill="#d97706" fontSize="8">Slope dy/dx</text>
              <text x="100" y="70" fill="#10b981" fontSize="9">(x, f(x))</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 max-w-[260px] truncate">
              {concept.title || 'f(x) Invariant Locus'}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. PHYSICS MODELS                                                         */}
        {/* ========================================================================= */}

        {/* 2A. Earth's Magnetic Field & Angle of Dip */}
        {category === 'magnetic_dip' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <defs>
                <marker id="magArrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                  <polygon points="0 0, 5 2.5, 0 5" fill="#0284c7" />
                </marker>
              </defs>
              {/* Earth Globe Sphere */}
              <circle cx="100" cy="75" r="46" fill="#0284c715" stroke="#0284c7" strokeWidth="2" />
              {/* Geographic Axis (Vertical dashed) */}
              <line x1="100" y1="15" x2="100" y2="135" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="100" y="12" fill="#64748b" fontSize="7" textAnchor="middle">Geographic North</text>
              {/* Magnetic Axis (11.3 degree tilt) */}
              <line x1="88" y1="18" x2="112" y2="132" stroke="#d97706" strokeWidth="2" />
              <text x="80" y="24" fill="#d97706" fontSize="8" fontWeight="bold">N_mag</text>
              {/* Magnetic Meridian Dip Vector Triangle */}
              <line x1="125" y1="65" x2="165" y2="65" stroke="#10b981" strokeWidth="2" />
              <text x="145" y="60" fill="#10b981" fontSize="8" fontWeight="bold">B_H</text>
              <line x1="165" y1="65" x2="165" y2="105" stroke="#f43f5e" strokeWidth="2" />
              <text x="170" y="88" fill="#f43f5e" fontSize="8" fontWeight="bold">B_V</text>
              <line x1="125" y1="65" x2="165" y2="105" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#magArrow)" />
              <text x="140" y="94" fill="#0284c7" fontSize="8" fontWeight="bold">Total B</text>
              {/* Angle of Dip Arc */}
              <path d="M 140 65 A 15 15 0 0 1 143 74" fill="none" stroke="#d97706" strokeWidth="1.5" />
              <text x="147" y="75" fill="#d97706" fontSize="8">δ (Dip)</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              B_H = B cos δ  |  B_V = B sin δ  |  tan δ = B_V / B_H
            </div>
          </div>
        )}

        {/* 2B. Ray Optics & Snell's Law */}
        {category === 'ray_optics' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <rect x="10" y="75" width="180" height="60" fill="#0284c715" stroke="#0284c730" />
              <line x1="10" y1="75" x2="190" y2="75" stroke="#0284c7" strokeWidth="1.5" />
              <text x="25" y="68" fill="#64748b" fontSize="8">Air (n₁ = 1.0)</text>
              <text x="25" y="90" fill="#0284c7" fontSize="8">Glass (n₂ = 1.5)</text>
              <line x1="100" y1="15" x2="100" y2="135" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="104" y="22" fill="#64748b" fontSize="8">Normal</text>
              <line x1="40" y1="25" x2="100" y2="75" stroke="#d97706" strokeWidth="2.5" />
              <text x="60" y="45" fill="#d97706" fontSize="9" fontWeight="bold">Ray (i)</text>
              <line x1="100" y1="75" x2="160" y2="25" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2,2" />
              <line x1="100" y1="75" x2="135" y2="135" stroke="#10b981" strokeWidth="2.5" />
              <text x="138" y="115" fill="#10b981" fontSize="9" fontWeight="bold">Ray (r)</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              n₁ sin(θ₁) = n₂ sin(θ₂)  |  1/f = 1/v + 1/u
            </div>
          </div>
        )}

        {/* 2C. Kinematics Velocity-Time Graph */}
        {category === 'motion_graph' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <line x1="25" y1="120" x2="185" y2="120" stroke="#64748b" strokeWidth="2" />
              <line x1="25" y1="15" x2="25" y2="120" stroke="#64748b" strokeWidth="2" />
              <text x="188" y="123" fill="#64748b" fontSize="9">Time (t)</text>
              <text x="28" y="20" fill="#64748b" fontSize="9">Velocity (v)</text>
              <polygon points="25,85 150,30 150,120 25,120" fill="#0284c715" stroke="none" />
              <line x1="25" y1="85" x2="150" y2="30" stroke="#0284c7" strokeWidth="3" />
              <text x="85" y="50" fill="#0284c7" fontSize="10" fontWeight="bold">Slope = Accel (a)</text>
              <circle cx="25" cy="85" r="3.5" fill="#d97706" />
              <text x="10" y="88" fill="#d97706" fontSize="9">u</text>
              <circle cx="150" cy="30" r="3.5" fill="#10b981" />
              <text x="155" y="32" fill="#10b981" fontSize="9">v</text>
              <text x="85" y="105" fill="#0284c7" fontSize="9">Area = s (Distance)</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              v = u + at  |  s = ut + ½ at²  |  v² = u² + 2as
            </div>
          </div>
        )}

        {/* 2D. Electric Circuit Schematic */}
        {category === 'circuit_diagram' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <rect x="35" y="25" width="130" height="95" rx="4" fill="none" stroke="#64748b" strokeWidth="2" />
              <line x1="25" y1="72" x2="45" y2="72" stroke="#0284c7" strokeWidth="3" />
              <line x1="30" y1="78" x2="40" y2="78" stroke="#0284c7" strokeWidth="1.5" />
              <text x="10" y="77" fill="#0284c7" fontSize="9" fontWeight="bold">V (DC)</text>
              <path d="M 80 25 L 85 18 L 95 32 L 105 18 L 115 32 L 120 25" fill="none" stroke="#d97706" strokeWidth="2.5" />
              <text x="100" y="12" fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">Resistor R</text>
              <polygon points="145,22 155,25 145,28" fill="#10b981" />
              <text x="158" y="22" fill="#10b981" fontSize="9" fontWeight="bold">I ➔</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              V = I · R  |  P = V · I = I² R
            </div>
          </div>
        )}

        {/* 2E. Wave Frequency & Sinusoidal Harmonics */}
        {category === 'wave_frequency' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <line x1="15" y1="75" x2="185" y2="75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
              <path d="M 20 75 Q 40 25 60 75 T 100 75 T 140 75 T 180 75" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="60" y1="35" x2="140" y2="35" stroke="#10b981" strokeWidth="1.5" />
              <line x1="60" y1="30" x2="60" y2="40" stroke="#10b981" strokeWidth="1.5" />
              <line x1="140" y1="30" x2="140" y2="40" stroke="#10b981" strokeWidth="1.5" />
              <text x="100" y="30" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Wavelength λ</text>
              <line x1="60" y1="75" x2="60" y2="40" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="65" y="60" fill="#f43f5e" fontSize="9">Amp (A)</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              v = f · λ  |  T = 1 / f  |  E = h · ν
            </div>
          </div>
        )}

        {/* 2F. Dynamics & Force Vectors (Free Body Diagram) */}
        {category === 'physics_vector' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <defs>
                <marker id="forceGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
                </marker>
                <marker id="forceRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                </marker>
                <marker id="forceSky" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#0284c7" />
                </marker>
              </defs>

              <rect x="75" y="60" width="50" height="30" rx="4" fill="#f1f5f9" stroke="#0284c7" strokeWidth="2" />
              <text x="100" y="79" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">Mass m</text>
              <line x1="100" y1="60" x2="100" y2="20" stroke="#10b981" strokeWidth="2.5" markerEnd="url(#forceGreen)" />
              <text x="100" y="14" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Normal Force F_N</text>
              <line x1="100" y1="90" x2="100" y2="130" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#forceRed)" />
              <text x="100" y="142" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">Weight W = mg</text>
              <line x1="125" y1="75" x2="165" y2="75" stroke="#0284c7" strokeWidth="2" markerEnd="url(#forceSky)" />
              <text x="170" y="78" fill="#0284c7" fontSize="9">F_applied</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Σ F = m · a  |  Newton&apos;s 2nd Law Invariant
            </div>
          </div>
        )}

        {/* 2G. Work & Kinetic-Potential Conservation */}
        {category === 'energy_transfer' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <path d="M 30 30 Q 60 120 170 120" fill="none" stroke="#64748b" strokeWidth="3" />
              <circle cx="35" cy="35" r="7" fill="#d97706" />
              <text x="55" y="32" fill="#d97706" fontSize="9" fontWeight="bold">Max PE = mgh</text>
              <text x="55" y="44" fill="#64748b" fontSize="8">KE = 0</text>
              <circle cx="160" cy="113" r="7" fill="#10b981" />
              <text x="120" y="100" fill="#10b981" fontSize="9" fontWeight="bold">Max KE = ½ mv²</text>
              <text x="120" y="112" fill="#64748b" fontSize="8">PE = 0</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              E_total = PE + KE = constant  |  ΔE = 0
            </div>
          </div>
        )}

        {/* 2H. Generic Physics Dynamic Field Fallback */}
        {category === 'physics_generic' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <circle cx="100" cy="75" r="30" fill="#0284c715" stroke="#0284c7" strokeWidth="2" />
              <line x1="40" y1="75" x2="160" y2="75" stroke="#10b981" strokeWidth="2" />
              <line x1="100" y1="15" x2="100" y2="135" stroke="#d97706" strokeWidth="2" />
              <circle cx="100" cy="75" r="6" fill="#0284c7" />
              <text x="100" y="78" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">ΣF</text>
              <polygon points="160,72 170,75 160,78" fill="#10b981" />
              <polygon points="97,15 100,5 103,15" fill="#d97706" />
              <text x="175" y="78" fill="#10b981" fontSize="8">v</text>
              <text x="105" y="12" fill="#d97706" fontSize="8">a</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 max-w-[260px] truncate">
              {concept.title || 'Physical System Invariant'}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. CHEMISTRY MODELS                                                       */}
        {/* ========================================================================= */}

        {/* 3A. Bohr Atomic Structure */}
        {category === 'bohr_atom' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <circle cx="100" cy="75" r="28" fill="none" stroke="#0284c740" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="100" cy="75" r="48" fill="none" stroke="#0284c730" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="100" cy="75" r="64" fill="none" stroke="#0284c720" strokeWidth="1.5" strokeDasharray="3,3" />
              <circle cx="100" cy="75" r="14" fill="#d97706" />
              <text x="100" y="78" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">p⁺, n⁰</text>
              <circle cx="100" cy="47" r="3.5" fill="#0284c7" />
              <circle cx="100" cy="103" r="3.5" fill="#0284c7" />
              <circle cx="52" cy="75" r="3.5" fill="#10b981" />
              <circle cx="148" cy="75" r="3.5" fill="#10b981" />
              <circle cx="66" cy="41" r="3.5" fill="#10b981" />
              <circle cx="134" cy="109" r="3.5" fill="#10b981" />
              <text x="100" y="12" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">Bohr Model (Z = 6)</text>
              <text x="175" y="78" fill="#64748b" fontSize="8">M-Shell</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Shell Config: 2, 4 (Octet Rule Stability)
            </div>
          </div>
        )}

        {/* 3B. Chemical Bonding (Covalent / Ionic) */}
        {category === 'chemical_bonding' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <circle cx="75" cy="75" r="42" fill="#0284c715" stroke="#0284c7" strokeWidth="2" />
              <circle cx="125" cy="75" r="42" fill="#10b98115" stroke="#10b981" strokeWidth="2" />
              <ellipse cx="100" cy="75" rx="17" ry="32" fill="#d9770620" stroke="#d97706" strokeWidth="1.5" />
              <circle cx="100" cy="67" r="3.5" fill="#d97706" />
              <circle cx="100" cy="83" r="3.5" fill="#d97706" />
              <text x="100" y="55" fill="#d97706" fontSize="8" fontWeight="bold" textAnchor="middle">Shared e⁻ Pair</text>
              <circle cx="65" cy="75" r="6" fill="#0284c7" />
              <text x="65" y="78" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">H</text>
              <circle cx="135" cy="75" r="6" fill="#10b981" />
              <text x="135" y="78" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Cl</text>
              <text x="50" y="30" fill="#0284c7" fontSize="10" fontWeight="bold">δ⁺</text>
              <text x="145" y="30" fill="#10b981" fontSize="10" fontWeight="bold">δ⁻</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Covalent Locus: H — Cl (Polar Electronegativity Dipole)
            </div>
          </div>
        )}

        {/* 3C. Particulate States of Matter */}
        {category === 'states_of_matter' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <rect x="15" y="35" width="50" height="75" rx="4" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />
              {[0, 1, 2].map(row =>
                [0, 1, 2].map(col => (
                  <circle key={`s-${row}-${col}`} cx={27 + col * 13} cy={50 + row * 18} r="4" fill="#0284c7" />
                ))
              )}
              <text x="40" y="125" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">Solid</text>

              <rect x="75" y="35" width="50" height="75" rx="4" fill="#f8fafc" stroke="#10b981" strokeWidth="1.5" />
              <circle cx="85" cy="65" r="4" fill="#10b981" />
              <circle cx="105" cy="72" r="4" fill="#10b981" />
              <circle cx="95" cy="90" r="4" fill="#10b981" />
              <circle cx="115" cy="95" r="4" fill="#10b981" />
              <circle cx="85" cy="100" r="4" fill="#10b981" />
              <text x="100" y="125" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Liquid</text>

              <rect x="135" y="35" width="50" height="75" rx="4" fill="#f8fafc" stroke="#d97706" strokeWidth="1.5" />
              <circle cx="145" cy="45" r="3.5" fill="#d97706" />
              <circle cx="170" cy="65" r="3.5" fill="#d97706" />
              <circle cx="150" cy="95" r="3.5" fill="#d97706" />
              <text x="160" y="125" fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">Gas</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Kinetic Energy ∝ Temperature (Solid ➔ Liquid ➔ Gas)
            </div>
          </div>
        )}

        {/* 3D. Reaction Energy Coordinate */}
        {category === 'reaction_energy' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <line x1="25" y1="120" x2="185" y2="120" stroke="#64748b" strokeWidth="1.5" />
              <line x1="25" y1="20" x2="25" y2="120" stroke="#64748b" strokeWidth="1.5" />
              <text x="28" y="24" fill="#64748b" fontSize="8">Potential Energy (PE)</text>
              <text x="180" y="132" fill="#64748b" fontSize="8">Progress</text>
              <path d="M 25 80 L 60 80 Q 95 15 110 20 Q 125 25 150 100 L 180 100" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="105" y1="18" x2="105" y2="80" stroke="#d97706" strokeWidth="1.5" strokeDasharray="2,2" />
              <text x="110" y="45" fill="#d97706" fontSize="9" fontWeight="bold">Activation Ea</text>
              <line x1="165" y1="80" x2="165" y2="100" stroke="#f43f5e" strokeWidth="2" />
              <text x="170" y="93" fill="#f43f5e" fontSize="9" fontWeight="bold">ΔH &lt; 0</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              ΔH = H_products - H_reactants  |  Exothermic Barrier
            </div>
          </div>
        )}

        {/* 3E. pH Scale & Acid-Base Continuum */}
        {category === 'ph_scale' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <defs>
                <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <rect x="20" y="55" width="160" height="25" rx="5" fill="url(#phGrad)" stroke="#64748b" strokeWidth="1" />
              <text x="25" y="48" fill="#e11d48" fontSize="9" fontWeight="bold">pH 0</text>
              <text x="100" y="48" fill="#059669" fontSize="9" fontWeight="bold" textAnchor="middle">pH 7 (Neutral)</text>
              <text x="175" y="48" fill="#7c3aed" fontSize="9" fontWeight="bold" textAnchor="end">pH 14</text>
              <text x="40" y="100" fill="#e11d48" fontSize="9">Strong Acid [H⁺]</text>
              <text x="100" y="100" fill="#059669" fontSize="9" textAnchor="middle">Pure H₂O</text>
              <text x="160" y="100" fill="#7c3aed" fontSize="9" textAnchor="end">Alkali [OH⁻]</text>
              <polygon points="100,82 95,90 105,90" fill="#0284c7" />
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              pH = -log₁₀[H⁺]  |  pH + pOH = 14  |  Autoionization
            </div>
          </div>
        )}

        {/* 3F. Periodic Trends */}
        {category === 'periodic_trends' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <path d="M 20 40 L 45 40 L 45 70 L 130 70 L 130 30 L 180 30 L 180 120 L 20 120 Z" fill="#0284c715" stroke="#0284c7" strokeWidth="1.5" />
              <line x1="30" y1="110" x2="170" y2="40" stroke="#d97706" strokeWidth="2.5" />
              <text x="110" y="65" fill="#d97706" fontSize="9" fontWeight="bold" transform="rotate(-25 110,65)">+ Electronegativity</text>
              <line x1="160" y1="50" x2="40" y2="115" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
              <text x="90" y="95" fill="#10b981" fontSize="9" fontWeight="bold" transform="rotate(25 90,95)">+ Atomic Radius</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Z_eff Increases Across Period ➔ Atomic Radius Shrinks
            </div>
          </div>
        )}

        {/* 3G. Generic Chemistry Reaction Model Fallback */}
        {category === 'chemistry_generic' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <ellipse cx="60" cy="75" rx="30" ry="25" fill="#0284c715" stroke="#0284c7" strokeWidth="2" />
              <text x="60" y="79" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">Reactants</text>
              <line x1="95" y1="75" x2="115" y2="75" stroke="#10b981" strokeWidth="2" />
              <polygon points="115,72 122,75 115,78" fill="#10b981" />
              <ellipse cx="150" cy="75" rx="25" ry="25" fill="#10b98115" stroke="#10b981" strokeWidth="2" />
              <text x="150" y="79" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Products</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 max-w-[260px] truncate">
              {concept.title || 'Chemical State Transition'}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. BIOLOGY MODELS                                                         */}
        {/* ========================================================================= */}

        {/* 4-ZERO. Human Heart & Double Circulation (Anatomical 4-Chamber Schematic) */}
        {category === 'heart_circulation' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 220 160" className="w-52 h-40">
              <defs>
                <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#0284c7" />
                </marker>
                <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                </marker>
              </defs>

              {/* Heart Outer Silhouette / Muscular Pericardium */}
              <path
                d="M 110 32 C 85 15, 30 35, 45 85 C 55 120, 110 152, 110 152 C 110 152, 165 120, 175 85 C 190 35, 135 15, 110 32 Z"
                fill="#f8fafc"
                stroke="#94a3b8"
                strokeWidth="2.5"
              />

              {/* Central Interventricular Septum Wall */}
              <path d="M 110 32 L 110 150" stroke="#64748b" strokeWidth="4" />

              {/* Horizontal Atrio-Ventricular Septum Divider */}
              <line x1="50" y1="80" x2="108" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,2" />
              <line x1="112" y1="80" x2="170" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,2" />

              {/* RIGHT ATRIUM (Left on anatomical diagram - Blue Deoxygenated) */}
              <rect x="52" y="44" width="52" height="32" rx="4" fill="#0284c715" stroke="#0284c730" />
              <text x="78" y="58" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">Right Atrium</text>
              <text x="78" y="68" fill="#64748b" fontSize="7" textAnchor="middle">(Deoxy Blood)</text>

              {/* RIGHT VENTRICLE (Blue Deoxygenated) */}
              <rect x="52" y="86" width="52" height="42" rx="4" fill="#0284c725" stroke="#0284c740" />
              <text x="78" y="104" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">Right Ventricle</text>
              <text x="78" y="114" fill="#0284c7" fontSize="7" textAnchor="middle">➔ Pulm. Artery</text>

              {/* LEFT ATRIUM (Right on anatomical diagram - Red Oxygenated) */}
              <rect x="116" y="44" width="52" height="32" rx="4" fill="#e11d4815" stroke="#e11d4830" />
              <text x="142" y="58" fill="#e11d48" fontSize="8" fontWeight="bold" textAnchor="middle">Left Atrium</text>
              <text x="142" y="68" fill="#64748b" fontSize="7" textAnchor="middle">(Oxy Blood)</text>

              {/* LEFT VENTRICLE (Thick Muscular Wall - Red Oxygenated) */}
              <rect x="116" y="86" width="52" height="42" rx="4" fill="#e11d4825" stroke="#e11d4840" />
              <text x="142" y="104" fill="#e11d48" fontSize="8" fontWeight="bold" textAnchor="middle">Left Ventricle</text>
              <text x="142" y="114" fill="#e11d48" fontSize="7" textAnchor="middle">➔ Aorta to Body</text>

              {/* Vena Cava Input Vessel (Top Left) */}
              <line x1="65" y1="12" x2="65" y2="40" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
              <text x="65" y="9" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle">Vena Cava</text>

              {/* Pulmonary Artery Output (To Lungs) */}
              <path d="M 85 86 Q 95 30 95 12" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
              <text x="95" y="9" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle">To Lungs</text>

              {/* Pulmonary Veins Input (From Lungs) */}
              <line x1="155" y1="12" x2="155" y2="40" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
              <text x="155" y="9" fill="#f43f5e" fontSize="7" fontWeight="bold" textAnchor="middle">From Lungs</text>

              {/* Aorta Arch Output (To Body) */}
              <path d="M 135 86 Q 125 30 125 12" fill="none" stroke="#f43f5e" strokeWidth="2.5" markerEnd="url(#arrowRed)" />
              <text x="125" y="9" fill="#f43f5e" fontSize="7" fontWeight="bold" textAnchor="middle">Aorta (Body)</text>

              {/* Valve Indicators */}
              <circle cx="78" cy="80" r="3" fill="#0284c7" />
              <text x="78" y="78" fill="#64748b" fontSize="6" textAnchor="middle">Tricuspid</text>
              <circle cx="142" cy="80" r="3" fill="#f43f5e" />
              <text x="142" y="78" fill="#64748b" fontSize="6" textAnchor="middle">Bicuspid</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-center">
              Vena Cava ➔ RA ➔ RV ➔ Lungs ➔ LA ➔ LV ➔ Aorta
            </div>
          </div>
        )}

        {/* 4-A2. Human Digestive System Schematic */}
        {category === 'digestive_system' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              {/* Mouth & Esophagus */}
              <circle cx="100" cy="18" r="8" fill="#0284c715" stroke="#0284c7" strokeWidth="1.5" />
              <text x="100" y="21" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle">Mouth</text>
              <line x1="100" y1="26" x2="100" y2="50" stroke="#64748b" strokeWidth="2.5" />
              <text x="125" y="40" fill="#64748b" fontSize="7">Esophagus</text>

              {/* Stomach (J-shaped pouch) */}
              <path d="M 100 50 Q 80 55 80 72 Q 80 85 105 85 Q 115 85 115 75 Q 115 58 100 50" fill="#d9770615" stroke="#d97706" strokeWidth="2" />
              <text x="96" y="72" fill="#d97706" fontSize="8" fontWeight="bold" textAnchor="middle">Stomach</text>
              <text x="96" y="80" fill="#64748b" fontSize="6" textAnchor="middle">HCl & Pepsin</text>

              {/* Liver / Gallbladder */}
              <polygon points="62,55 78,55 78,72 62,65" fill="#10b98115" stroke="#10b981" strokeWidth="1.5" />
              <text x="70" y="52" fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">Liver (Bile)</text>

              {/* Small Intestine (Coiled center) */}
              <ellipse cx="100" cy="104" rx="22" ry="14" fill="#0284c715" stroke="#0284c7" strokeWidth="1.5" />
              <text x="100" y="104" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle">Small Intestine</text>
              <text x="100" y="112" fill="#64748b" fontSize="6" textAnchor="middle">Absorption (Villi)</text>

              {/* Large Intestine (Surrounding frame) */}
              <rect x="68" y="88" width="64" height="38" rx="6" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="3,2" />
              <text x="100" y="136" fill="#64748b" fontSize="7" textAnchor="middle">Large Intestine (H₂O Uptake)</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Mouth ➔ Esophagus ➔ Stomach ➔ Small Intestine ➔ Colon
            </div>
          </div>
        )}

        {/* 4-A3. Respiratory System & Gas Exchange */}
        {category === 'respiratory_system' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              {/* Trachea with Cartilage Rings */}
              <line x1="100" y1="12" x2="100" y2="45" stroke="#0284c7" strokeWidth="3" />
              {[18, 26, 34, 42].map(y => (
                <line key={`ring-${y}`} x1="95" y1={y} x2="105" y2={y} stroke="#64748b" strokeWidth="1.5" />
              ))}
              <text x="125" y="28" fill="#0284c7" fontSize="7" fontWeight="bold">Trachea</text>

              {/* Bronchi Branches */}
              <line x1="100" y1="45" x2="75" y2="65" stroke="#0284c7" strokeWidth="2" />
              <line x1="100" y1="45" x2="125" y2="65" stroke="#0284c7" strokeWidth="2" />

              {/* Right & Left Lungs */}
              <ellipse cx="65" cy="85" rx="26" ry="32" fill="#0284c715" stroke="#0284c7" strokeWidth="1.5" />
              <text x="65" y="82" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">Right Lung</text>

              <ellipse cx="135" cy="85" rx="26" ry="32" fill="#0284c715" stroke="#0284c7" strokeWidth="1.5" />
              <text x="135" y="82" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">Left Lung</text>

              {/* Alveoli Inset Circle */}
              <circle cx="100" cy="115" r="16" fill="#f8fafc" stroke="#f43f5e" strokeWidth="1.5" />
              <circle cx="95" cy="115" r="5" fill="#f43f5e20" stroke="#f43f5e" strokeWidth="1" />
              <circle cx="105" cy="115" r="5" fill="#0284c720" stroke="#0284c7" strokeWidth="1" />
              <text x="100" y="138" fill="#e11d48" fontSize="7" fontWeight="bold" textAnchor="middle">Alveoli: O₂ ➔ Blood | CO₂ ➔ Out</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Trachea ➔ Bronchi ➔ Alveoli (Capillary Diffusion)
            </div>
          </div>
        )}

        {/* 4-A4. Plant Vascular Transport (Xylem & Phloem) */}
        {category === 'plant_transport' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              {/* Stem Boundary */}
              <rect x="40" y="20" width="120" height="110" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              <text x="100" y="16" fill="#059669" fontSize="8" fontWeight="bold" textAnchor="middle">Plant Stem Vascular Bundle</text>

              {/* Xylem Vessel (Left - Blue Water Upward) */}
              <rect x="55" y="32" width="40" height="86" rx="4" fill="#0284c715" stroke="#0284c7" strokeWidth="2" />
              <text x="75" y="48" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">Xylem</text>
              <line x1="75" y1="100" x2="75" y2="60" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrowBlue)" />
              <text x="75" y="112" fill="#64748b" fontSize="6" textAnchor="middle">Water & Minerals</text>
              <text x="75" y="118" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle">↑ Unidirectional</text>

              {/* Cambium Dividing Layer */}
              <line x1="100" y1="32" x2="100" y2="118" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,2" />

              {/* Phloem Vessel (Right - Green/Amber Sucrose Bidirectional) */}
              <rect x="105" y="32" width="40" height="86" rx="4" fill="#10b98115" stroke="#10b981" strokeWidth="2" />
              <text x="125" y="48" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">Phloem</text>
              <line x1="125" y1="80" x2="125" y2="60" stroke="#10b981" strokeWidth="2" />
              <line x1="125" y1="80" x2="125" y2="100" stroke="#10b981" strokeWidth="2" />
              <text x="125" y="112" fill="#64748b" fontSize="6" textAnchor="middle">Sucrose & Sugars</text>
              <text x="125" y="118" fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">⇅ Bidirectional</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Xylem (Water/Minerals ↑) | Phloem (Translocation ⇅)
            </div>
          </div>
        )}

        {/* 4A. Cellular Respiration & ATP Cycle */}
        {category === 'cellular_respiration' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              {/* Mitochondrion boundary */}
              <ellipse cx="100" cy="75" rx="78" ry="48" fill="#d9770610" stroke="#d97706" strokeWidth="2" />
              <text x="100" y="38" fill="#d97706" fontSize="8" fontWeight="bold" textAnchor="middle">Mitochondrion Matrix</text>
              {/* Folded inner membrane cristae */}
              <path d="M 45 75 Q 60 55 75 75 T 105 75 T 135 75 T 155 75" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3,2" />
              {/* Cytoplasm Glycolysis box */}
              <rect x="25" y="90" width="45" height="22" rx="3" fill="#f1f5f9" stroke="#0284c7" strokeWidth="1" />
              <text x="47" y="100" fill="#0284c7" fontSize="7" textAnchor="middle">Glycolysis</text>
              <text x="47" y="108" fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">+2 ATP</text>
              {/* Krebs cycle circle */}
              <circle cx="105" cy="80" r="16" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" />
              <text x="105" y="80" fill="#10b981" fontSize="7" textAnchor="middle">Krebs</text>
              <text x="105" y="88" fill="#10b981" fontSize="7" fontWeight="bold" textAnchor="middle">+2 ATP</text>
              {/* ETC badge */}
              <rect x="135" y="90" width="45" height="22" rx="3" fill="#f1f5f9" stroke="#059669" strokeWidth="1" />
              <text x="157" y="100" fill="#059669" fontSize="7" textAnchor="middle">ETC / Cristae</text>
              <text x="157" y="108" fill="#059669" fontSize="7" fontWeight="bold" textAnchor="middle">+34 ATP</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              C₆H₁₂O₆ + 6 O₂ ➔ 6 CO₂ + 6 H₂O + 38 ATP
            </div>
          </div>
        )}

        {/* 4B. Cell Structure & Organelles */}
        {category === 'cell_structure' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <ellipse cx="100" cy="75" rx="80" ry="55" fill="#0284c715" stroke="#0284c7" strokeWidth="2.5" />
              <circle cx="80" cy="70" r="22" fill="#0369a120" stroke="#0284c7" strokeWidth="2" />
              <circle cx="80" cy="70" r="9" fill="#0284c7" />
              <text x="80" y="73" fill="#ffffff" fontSize="7" fontWeight="bold" textAnchor="middle">DNA</text>
              <text x="80" y="100" fill="#0284c7" fontSize="8">Nucleus</text>
              <ellipse cx="140" cy="55" rx="15" ry="9" fill="#d9770620" stroke="#d97706" strokeWidth="1.5" transform="rotate(-20 140 55)" />
              <path d="M 128 55 Q 140 50 152 55" fill="none" stroke="#d97706" strokeWidth="1" />
              <text x="145" y="42" fill="#d97706" fontSize="8" fontWeight="bold">Mitochondria</text>
              <ellipse cx="130" cy="95" rx="16" ry="10" fill="#10b98120" stroke="#10b981" strokeWidth="1.5" />
              <text x="130" y="115" fill="#10b981" fontSize="8">Organelle</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Cell Membrane | Mitochondria (ATP) | Nucleus (Genome)
            </div>
          </div>
        )}

        {/* 4C. DNA Double Helix */}
        {category === 'dna_helix' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <path d="M 40 20 Q 70 75 100 20 T 160 20" fill="none" stroke="#0284c7" strokeWidth="2.5" />
              <path d="M 40 130 Q 70 75 100 130 T 160 130" fill="none" stroke="#6366f1" strokeWidth="2.5" />
              {[45, 65, 85, 105, 125, 145].map((x, i) => {
                const y1 = 40 + Math.sin(i) * 20;
                const y2 = 110 - Math.sin(i) * 20;
                const color = i % 2 === 0 ? '#10b981' : '#f43f5e';
                return (
                  <line key={`bp-${x}`} x1={x} y1={y1} x2={x} y2={y2} stroke={color} strokeWidth="2" strokeDasharray="3,2" />
                );
              })}
              <text x="100" y="15" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">5&apos; ➔ 3&apos; Strand</text>
              <text x="100" y="142" fill="#4f46e5" fontSize="9" fontWeight="bold" textAnchor="middle">3&apos; ➔ 5&apos; Complementary</text>
              <text x="165" y="78" fill="#10b981" fontSize="8">A = T</text>
              <text x="165" y="90" fill="#f43f5e" fontSize="8">G ≡ C</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Watson-Crick Helix  |  A=T (2 H-bonds)  |  G≡C (3 H-bonds)
            </div>
          </div>
        )}

        {/* 4D. Ecological Trophic Energy Pyramid & Biomagnification Dualism */}
        {category === 'trophic_pyramid' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 240 160" className="w-56 h-40">
              <defs>
                <marker id="arrowUpToxin" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#f43f5e" />
                </marker>
                <marker id="arrowDownHeat" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                  <polygon points="0 0, 6 3, 0 6" fill="#d97706" />
                </marker>
              </defs>

              {/* Title / Column Headers */}
              <text x="75" y="16" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">10% Usable Energy (J)</text>
              <text x="185" y="16" fill="#e11d48" fontSize="8" fontWeight="bold" textAnchor="middle">Biomagnification (ppm)</text>

              {/* Trophic Tier 4: Apex Predators */}
              <polygon points="75,25 60,50 90,50" fill="#f43f5e20" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="75" y="42" fill="#e11d48" fontSize="7" fontWeight="bold" textAnchor="middle">Apex: 10 J</text>
              <rect x="155" y="28" width="60" height="18" rx="3" fill="#f43f5e20" stroke="#f43f5e" strokeWidth="1" />
              <text x="185" y="40" fill="#e11d48" fontSize="7" fontWeight="bold" textAnchor="middle">25.0 ppm DDT</text>

              {/* Trophic Tier 3: Secondary Consumers */}
              <polygon points="60,52 45,80 105,80 90,52" fill="#d9770620" stroke="#d97706" strokeWidth="1.5" />
              <text x="75" y="68" fill="#d97706" fontSize="7" fontWeight="bold" textAnchor="middle">2° Carn: 100 J</text>
              <rect x="155" y="58" width="60" height="18" rx="3" fill="#d9770620" stroke="#d97706" strokeWidth="1" />
              <text x="185" y="70" fill="#d97706" fontSize="7" fontWeight="bold" textAnchor="middle">2.0 ppm DDT</text>

              {/* Trophic Tier 2: Primary Herbivores */}
              <polygon points="45,82 30,112 120,112 105,82" fill="#0284c720" stroke="#0284c7" strokeWidth="1.5" />
              <text x="75" y="99" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle">1° Herb: 1,000 J</text>
              <rect x="155" y="88" width="60" height="18" rx="3" fill="#0284c720" stroke="#0284c7" strokeWidth="1" />
              <text x="185" y="100" fill="#0284c7" fontSize="7" fontWeight="bold" textAnchor="middle">0.2 ppm DDT</text>

              {/* Trophic Tier 1: Primary Producers */}
              <polygon points="30,114 12,145 138,145 120,114" fill="#10b98120" stroke="#10b981" strokeWidth="1.5" />
              <text x="75" y="132" fill="#059669" fontSize="8" fontWeight="bold" textAnchor="middle">Producers: 10,000 J</text>
              <rect x="155" y="118" width="60" height="18" rx="3" fill="#10b98120" stroke="#10b981" strokeWidth="1" />
              <text x="185" y="130" fill="#059669" fontSize="7" fontWeight="bold" textAnchor="middle">0.02 ppm DDT</text>

              {/* Upward Biomagnification Arrow on Right */}
              <line x1="225" y1="138" x2="225" y2="30" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3,2" markerEnd="url(#arrowUpToxin)" />

              {/* 90% Dissipation Heat Arrow on Left */}
              <path d="M 28 85 Q 15 95 15 110" fill="none" stroke="#d97706" strokeWidth="1.5" markerEnd="url(#arrowDownHeat)" />
              <text x="5" y="80" fill="#d97706" fontSize="6">90% Heat</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-center">
              Energy Dissipation (90% Loss) ⇄ Biomagnification (Toxin Concentration)
            </div>
          </div>
        )}

        {/* 5. Social Studies Timeline & Systems Model */}
        {category === 'social_studies' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <line x1="20" y1="75" x2="180" y2="75" stroke="#6366f1" strokeWidth="2.5" />
              {[35, 75, 115, 155].map((x, idx) => (
                <g key={`timeline-${x}`}>
                  <circle cx={x} cy={75} r={5} fill="#818cf8" stroke="#312e81" strokeWidth={1.5} />
                  <line x1={x} y1={idx % 2 === 0 ? 75 : 75} x2={x} y2={idx % 2 === 0 ? 45 : 105} stroke="#6366f1" strokeWidth={1.5} />
                  <rect x={x - 22} y={idx % 2 === 0 ? 25 : 108} width={44} height={16} rx={3} fill="#eef2ff" stroke="#818cf8" strokeWidth={1} />
                  <text x={x} y={idx % 2 === 0 ? 36 : 119} fill="#3730a3" fontSize="6" fontWeight="bold" textAnchor="middle">Phase {idx + 1}</text>
                </g>
              ))}
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-center">
              Socio-Historical Chronology & Systems Analysis
            </div>
          </div>
        )}

        {/* 4E. Photosynthesis & Chloroplast Mechanism */}
        {category === 'photosynthesis_cycle' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <ellipse cx="100" cy="75" rx="75" ry="50" fill="#10b98115" stroke="#10b981" strokeWidth="2" />
              <rect x="55" y="60" width="25" height="6" rx="2" fill="#10b981" />
              <rect x="55" y="70" width="25" height="6" rx="2" fill="#10b981" />
              <rect x="55" y="80" width="25" height="6" rx="2" fill="#10b981" />
              <text x="67" y="100" fill="#059669" fontSize="8" textAnchor="middle">Thylakoid</text>
              <line x1="20" y1="30" x2="50" y2="55" stroke="#d97706" strokeWidth="2" />
              <text x="25" y="25" fill="#d97706" fontSize="8" fontWeight="bold">Sunlight (hν)</text>
              <circle cx="130" cy="75" r="18" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="3,3" />
              <text x="130" y="78" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">Calvin</text>
              <text x="145" y="125" fill="#059669" fontSize="9" fontWeight="bold">C₆H₁₂O₆ (Glucose)</text>
              <text x="25" y="125" fill="#0284c7" fontSize="8">H₂O ➔ O₂</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              6 CO₂ + 6 H₂O + Light ➔ C₆H₁₂O₆ + 6 O₂
            </div>
          </div>
        )}

        {/* 4F. Neuron & Synaptic Action Potential */}
        {category === 'neuron_synapse' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <circle cx="45" cy="75" r="16" fill="#0284c720" stroke="#0284c7" strokeWidth="2" />
              <text x="45" y="78" fill="#0284c7" fontSize="8" fontWeight="bold" textAnchor="middle">Soma</text>
              <line x1="61" y1="75" x2="160" y2="75" stroke="#64748b" strokeWidth="2.5" />
              {[70, 95, 120, 145].map((x) => (
                <rect key={`m-${x}`} x={x} y="67" width="18" height="16" rx="4" fill="#d9770620" stroke="#d97706" strokeWidth="1.5" />
              ))}
              <line x1="60" y1="50" x2="160" y2="50" stroke="#10b981" strokeWidth="2" />
              <polygon points="160,47 167,50 160,53" fill="#10b981" />
              <text x="110" y="44" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">Action Potential Impulse ➔</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Saltatory Conduction: -70 mV Resting ➔ +30 mV Peak
            </div>
          </div>
        )}

        {/* 4G. Classification Taxonomy Cladogram */}
        {category === 'taxonomy_tree' && (
          <div className="w-full flex flex-col items-center">
            <svg viewBox="0 0 200 150" className="w-48 h-36">
              <line x1="30" y1="120" x2="70" y2="120" stroke="#64748b" strokeWidth="2.5" />
              <line x1="70" y1="120" x2="110" y2="70" stroke="#0284c7" strokeWidth="2" />
              <line x1="110" y1="70" x2="170" y2="40" stroke="#0284c7" strokeWidth="2" />
              <circle cx="170" cy="40" r="4" fill="#0284c7" />
              <text x="175" y="43" fill="#0284c7" fontSize="9">Clade A</text>
              <line x1="110" y1="70" x2="170" y2="85" stroke="#10b981" strokeWidth="2" />
              <circle cx="170" cy="85" r="4" fill="#10b981" />
              <text x="175" y="88" fill="#10b981" fontSize="9">Clade B</text>
              <line x1="70" y1="120" x2="170" y2="120" stroke="#d97706" strokeWidth="2" />
              <circle cx="170" cy="120" r="4" fill="#d97706" />
              <text x="175" y="123" fill="#d97706" fontSize="9">Outgroup</text>
            </svg>
            <div className="text-xs text-slate-700 font-mono mt-1 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Phylogenetic Cladogram: Domain ➔ Kingdom ➔ Species
            </div>
          </div>
        )}

        {/* 6. Strict Pedagogical Fallback: Visual Model Pending Alert */}
        {(category === 'visual_model_pending' || category === 'concept_keycard' || !EXACT_CANVAS_DIAGRAMS.has(category)) && (
          <div className="w-full bg-amber-50/50 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3.5 text-left">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-2.5">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold text-amber-800 tracking-wide uppercase">
                  Visual Model Pending
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                {concept.id}
              </span>
            </div>

            <div className="bg-white/80 border border-amber-200 rounded-xl p-3">
              <p className="text-[11px] text-amber-900/90 leading-relaxed">
                An exact interactive canvas model for this specific concept is in development. Mismatched or generic visual models are strictly suppressed to preserve pedagogical accuracy.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">
                {concept.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {concept.coreLogicEssence}
              </p>
            </div>

            {notes?.structuralRule && (
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                <div className="text-[10px] uppercase font-bold text-sky-700 tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
                  Governing Principle / Equation
                </div>
                <div className="text-xs font-mono text-slate-800 overflow-x-auto whitespace-pre-wrap">
                  <MathFormula formula={notes.structuralRule} />
                </div>
              </div>
            )}

            {notes?.coreAnalogy && (
              <div className="text-xs text-slate-700 bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-700 flex items-center gap-1 mb-1">
                  💡 Intuitive Model:
                </span>
                <p className="leading-relaxed text-[11px] text-slate-700">
                  <MathText text={notes.coreAnalogy} />
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Real World Use Application Box */}
      {notes?.realWorldUse && (
        <div className="mt-3 text-[11px] text-slate-600 bg-sky-50/60 p-2.5 rounded-xl border border-sky-200/80 text-left w-full">
          <span className="font-bold text-sky-700 flex items-center gap-1 mb-1">
            <Globe className="w-3.5 h-3.5 text-sky-700" /> Real-World Application:
          </span>
          <p className="text-slate-700 leading-relaxed text-[11px]">
            {notes.realWorldUse}
          </p>
        </div>
      )}
    </div>
  );
};
