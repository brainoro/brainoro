import { createClient } from '@supabase/supabase-js';
import * as path from 'path';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);
const { deduceDiagramCategory, EXACT_CANVAS_DIAGRAMS } = require(path.resolve(process.cwd(), 'frontend/src/components/cornell/VisualModelCard'));

async function testAll846() {
  const { data: allConcepts, error } = await supabase
    .from('curriculum_concepts')
    .select('*')
    .order('id');

  if (error || !allConcepts) {
    console.error('Error fetching concepts:', error);
    return;
  }

  console.log(`Fetched ${allConcepts.length} concepts.`);

  const visualCategoryCounts: Record<string, number> = {};
  const blankVisuals: any[] = [];
  const renderErrors: any[] = [];

  for (const c of allConcepts) {
    const notes = c.metadata?.cornell_notes;
    
    // Map to CurriculumConcept format
    const concept = {
      id: c.id,
      boardId: c.board_id,
      subjectId: c.subject_id,
      gradeLevel: Number(c.grade_level),
      title: c.title,
      unit: c.unit,
      coreLogicEssence: c.core_logic_essence,
      metadata: c.metadata || {}
    };

    let cat = '';
    try {
      cat = deduceDiagramCategory(concept, notes);
      visualCategoryCounts[cat] = (visualCategoryCounts[cat] || 0) + 1;
    } catch (err: any) {
      renderErrors.push({ id: c.id, error: err.message });
      continue;
    }

    // Check if cat has a renderer in VisualModelCard
    const hasCanvas = EXACT_CANVAS_DIAGRAMS.has(cat);
    const isPending = cat === 'visual_model_pending' || cat === 'concept_keycard';
    if (!hasCanvas && !isPending) {
      blankVisuals.push({ id: c.id, category: cat });
    }
  }

  console.log('\n--- VISUAL CATEGORY DISTRIBUTION ---');
  for (const [cat, count] of Object.entries(visualCategoryCounts)) {
    console.log(`  ${cat}: ${count}`);
  }

  console.log(`\nRender Errors in deduceDiagramCategory: ${renderErrors.length}`);
  console.log(`Unrendered Visual Categories: ${blankVisuals.length}`);
  if (blankVisuals.length > 0) {
    console.log('Sample blank visuals:', blankVisuals);
  }
}

testAll846().catch(console.error);
