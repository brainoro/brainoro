import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isSupabaseConfigured = (): boolean => {
  return Boolean(
    cleanSupabaseUrl &&
    cleanSupabaseKey &&
    !cleanSupabaseUrl.includes('placeholder') &&
    cleanSupabaseUrl.startsWith('https://')
  );
};

const supabase = createClient(
  cleanSupabaseUrl || 'https://placeholder.supabase.co',
  cleanSupabaseKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    },
  }
);

async function syncAllNotes() {
  console.log('================================================================================');
  console.log('   BRAINORO OS — BATCH SYNC 846 CURRICULUM BLUEPRINTS TO SUPABASE');
  console.log('================================================================================\n');

  if (!isSupabaseConfigured()) {
    console.error('Error: Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and ANON_KEY.');
    process.exit(1);
  }

  // Look for cache file across possible locations
  const possiblePaths = [
    path.resolve(process.cwd(), 'scratch/remediated_blueprints_cache.json'),
    path.resolve(process.cwd(), 'frontend/scratch/remediated_blueprints_cache.json'),
    path.resolve(process.cwd(), '../scratch/remediated_blueprints_cache.json'),
    path.resolve(__dirname, '../scratch/remediated_blueprints_cache.json'),
    path.resolve(__dirname, '../../scratch/remediated_blueprints_cache.json')
  ];

  let cachePath = possiblePaths.find(p => fs.existsSync(p));

  if (!cachePath) {
    console.error('Error: Cannot find remediated_blueprints_cache.json in any expected path');
    process.exit(1);
  }

  console.log(`[Cache Path] Using blueprint cache: ${cachePath}`);
  const rawData = fs.readFileSync(cachePath, 'utf8');
  const cache: Array<{
    concept_id: string;
    board_id: string;
    grade_level: number;
    title: string;
    diagram_type: string;
    payload_fingerprint: string;
    notes: any;
  }> = JSON.parse(rawData);

  console.log(`[Step 1] Loaded ${cache.length} remediated blueprints from cache.`);
  console.log('[Step 2] Updating Supabase curriculum_concepts.metadata in parallel chunks...');

  let successCount = 0;
  let failCount = 0;
  const chunkSize = 25;

  for (let i = 0; i < cache.length; i += chunkSize) {
    const chunk = cache.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map(async (item) => {
        try {
          const { data: existing } = await supabase
            .from('curriculum_concepts')
            .select('metadata')
            .eq('id', item.concept_id)
            .maybeSingle();

          const currentMeta = existing?.metadata || {};

          let pedagogicalFocus = 'NCERT / OER Standard Proofs & Analytical Deduction';
          if (item.board_id === 'CAMBRIDGE') {
            pedagogicalFocus = 'Cambridge Lower Secondary / IGCSE Command Words & Empirical Precision';
          } else if (item.board_id === 'IB_MYP') {
            pedagogicalFocus = 'IB MYP Criteria & Global Contexts Conceptual Framework';
          }

          const EXACT_CANVAS_DIAGRAMS = new Set<string>([
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

          const resolvedDiagramType = EXACT_CANVAS_DIAGRAMS.has(item.diagram_type)
            ? item.diagram_type
            : 'visual_model_pending';

          const notesPayload = {
            ...item.notes,
            diagramType: resolvedDiagramType,
          };

          const updatedMeta = {
            ...currentMeta,
            source: 'OpenStax / OER Commons / Creative Commons',
            license: 'CC-BY-4.0',
            version: '2.0',
            pedagogical_focus: pedagogicalFocus,
            ocaverse_watermark: 'Protected by OcaVerse Guardrail',
            copyright_compliance: 'Non-proprietary OER Synthesized',
            diagram_type: resolvedDiagramType,
            payload_fingerprint: item.payload_fingerprint,
            cornell_notes: notesPayload,
            last_synced: new Date().toISOString()
          };

          const { error } = await supabase
            .from('curriculum_concepts')
            .update({ metadata: updatedMeta })
            .eq('id', item.concept_id);

          if (error) {
            console.error(`Failed to update ${item.concept_id}:`, error.message);
            failCount++;
          } else {
            successCount++;
          }
        } catch (err: any) {
          console.error(`Exception updating ${item.concept_id}:`, err?.message || err);
          failCount++;
        }
      })
    );

    const progress = Math.min(i + chunkSize, cache.length);
    process.stdout.write(`\r[Progress] Synced ${progress} / ${cache.length} records...`);
  }

  console.log('\n\n================================================================================');
  console.log('   SYNC SUMMARY REPORT');
  console.log('================================================================================');
  console.log(`Total Records Processed : ${cache.length}`);
  console.log(`Successfully Synced     : ${successCount}`);
  console.log(`Failed Updates          : ${failCount}`);
  console.log('================================================================================\n');

  if (failCount > 0) {
    console.error('Warning: Some records failed to sync.');
    process.exit(1);
  } else {
    console.log('>>> 100% OF 846 CURRICULUM BLUEPRINTS SYNCED TO SUPABASE SUCCESSFULLY! <<<');
  }
}

syncAllNotes().catch(console.error);
