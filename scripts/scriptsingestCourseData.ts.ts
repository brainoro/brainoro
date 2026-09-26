// scripts/ingestCourseData.ts
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// .env ya direct string use karein
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in environment.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runIngestion() {
  const filePath = path.join(__dirname, 'data', 'cbse-11-12.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const courseUnits = JSON.parse(rawData);

  console.log(`Starting ingestion for ${courseUnits.length} units...`);

  for (const unit of courseUnits) {
    const unitId = `UNIT_${unit.boardId}_${unit.gradeLevel}_${unit.subjectId.toUpperCase()}_${String(unit.unitNumber).padStart(2, '0')}`;

    // 1. Upsert Unit
    const { error: unitErr } = await supabase
      .from('units')
      .upsert({
        id: unitId,
        board_id: unit.boardId,
        grade_level: unit.gradeLevel,
        subject_id: unit.subjectId,
        unit_number: unit.unitNumber,
        title: unit.unitTitle,
        description: unit.unitDescription,
      });

    if (unitErr) {
      console.error(`Error inserting unit ${unitId}:`, unitErr.message);
      continue;
    }
    console.log(`✓ Unit synced: ${unit.unitTitle}`);

    // 2. Iterate Topics
    for (const topic of unit.topics) {
      const { error: topicErr } = await supabase
        .from('topics')
        .upsert({
          id: topic.id,
          unit_id: unitId,
          board_id: unit.boardId,
          grade_level: unit.gradeLevel,
          subject_id: unit.subjectId,
          title: topic.title,
          core_logic_essence: topic.coreLogic,
          metadata: {
            slug: topic.slug,
            order_index: topic.orderIndex,
            syllabus_year: '2026-27'
          }
        });

      if (topicErr) {
        console.error(`  Error inserting topic ${topic.id}:`, topicErr.message);
        continue;
      }
      console.log(`  ✓ Topic synced: ${topic.title}`);

      // 3. Upsert Content Modules for this Topic
      if (topic.contentModules && topic.contentModules.length > 0) {
        for (const mod of topic.contentModules) {
          const { error: modErr } = await supabase
            .from('content_modules')
            .upsert({
              id: mod.id,
              topic_id: topic.id,
              module_type: mod.moduleType,
              content: mod.content,
              ocaverse_metadata: {
                version: '2026-27',
                status: 'active'
              }
            });

          if (modErr) {
            console.error(`    Error inserting module ${mod.id}:`, modErr.message);
          } else {
            console.log(`    ✓ Module synced: ${mod.id}`);
          }
        }
      }
    }
  }

  console.log('--- Ingestion Process Completed ---');
}

runIngestion().catch((err) => {
  console.error('Fatal Ingestion Error:', err);
});