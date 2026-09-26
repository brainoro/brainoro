import { CornellNotes } from '../types';
import { 
  getContentForTopic, 
  synthesizeCornellContent as synthesizeFromContentService, 
  IngestionInput 
} from '../services/contentService';

export type { IngestionInput };

export function deduceSynthesizedDiagramType(subjectId: string, topicKey: string): string {
  const s = (subjectId || '').toUpperCase();
  const t = (topicKey || '').toUpperCase();

  if (s.includes('MATH')) {
    if (t.includes('PYTHAGOR') || t.includes('TRIANGLE') || t.includes('TRIG')) return 'triangle';
    if (t.includes('RATIONAL') || t.includes('REAL') || t.includes('CONTINUUM') || t.includes('SURD')) return 'real_continuum';
    if (t.includes('INT') || t.includes('NUM')) return 'number_line';
    if (t.includes('LINEQ') || t.includes('LINEAR') || t.includes('COORD') || t.includes('GRAPH')) return 'coordinate_grid';
    if (t.includes('POLY') || t.includes('QUAD') || t.includes('PARABOLA')) return 'parabola';
    if (t.includes('CIRCLE') || t.includes('MENSUR') || t.includes('AREA') || t.includes('VOLUME')) return 'circle_geometry';
    if (t.includes('PROB') || t.includes('STAT') || t.includes('DATA')) return 'probability_curve';
    return 'coordinate_grid';
  }

  if (s.includes('PHYS')) {
    if (t.includes('LIGHT') || t.includes('OPTIC') || t.includes('RAY') || t.includes('REFLECT') || t.includes('REFRACT')) return 'ray_optics';
    if (t.includes('MOTION') || t.includes('VELOCITY') || t.includes('ACCEL') || t.includes('SPEED')) return 'motion_graph';
    if (t.includes('CIRCUIT') || t.includes('ELECTRIC') || t.includes('OHM') || t.includes('VOLT')) return 'circuit_diagram';
    if (t.includes('WAVE') || t.includes('SOUND') || t.includes('FREQ')) return 'wave_frequency';
    if (t.includes('ENERGY') || t.includes('WORK') || t.includes('POWER')) return 'energy_transfer';
    if (t.includes('MAG') || t.includes('DIP') || t.includes('FIELD')) return 'magnetic_dip';
    return 'physics_vector';
  }

  if (s.includes('CHEM')) {
    if (t.includes('ATOM') || t.includes('BOHR') || t.includes('ELECTRON') || t.includes('PROTON')) return 'bohr_atom';
    if (t.includes('BOND') || t.includes('MOLECULE') || t.includes('COVALENT') || t.includes('IONIC')) return 'chemical_bonding';
    if (t.includes('MATTER') || t.includes('STATE') || t.includes('SOLID') || t.includes('GAS')) return 'states_of_matter';
    if (t.includes('REACT') || t.includes('EQUATION') || t.includes('STOICH')) return 'reaction_energy';
    if (t.includes('ACID') || t.includes('BASE') || t.includes('PH') || t.includes('SALT')) return 'ph_scale';
    if (t.includes('PERIODIC')) return 'periodic_trends';
    return 'bohr_atom';
  }

  if (s.includes('BIO')) {
    if (t.includes('CELL') || t.includes('ORGANELLE') || t.includes('MEMBRANE')) return 'cell_structure';
    if (t.includes('DNA') || t.includes('GENE') || t.includes('HEREDITY') || t.includes('CHROMOSOME')) return 'dna_helix';
    if (t.includes('ECO') || t.includes('TROPHIC') || t.includes('FOOD') || t.includes('PYRAMID')) return 'trophic_pyramid';
    if (t.includes('PLANT') || t.includes('PHOTO') || t.includes('CHLORO')) return 'photosynthesis_cycle';
    if (t.includes('RESPIRAT') || t.includes('ATP') || t.includes('MITO')) return 'cellular_respiration';
    if (t.includes('NEURON') || t.includes('NERVE') || t.includes('HEART') || t.includes('ORGAN')) return 'neuron_synapse';
    if (t.includes('CLASSIF') || t.includes('TAXON') || t.includes('SPECIES')) return 'taxonomy_tree';
    return 'cell_structure';
  }

  if (t.includes('INT') || t.includes('NUM')) return 'number_line';
  if (t.includes('CELL')) return 'cell_structure';
  if (t.includes('ATOM')) return 'bohr_atom';
  return 'coordinate_grid';
}

/**
 * Synthesizes dynamic OER Cornell notes for custom ingested content,
 * delegating to the unified contentService engine.
 */
export async function synthesizeCornellContent(input: IngestionInput): Promise<CornellNotes> {
  return synthesizeFromContentService(input);
}

export { getContentForTopic };
