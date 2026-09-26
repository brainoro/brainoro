import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

function loadEnvFile(fileName: string) {
  const envPath = path.resolve(process.cwd(), fileName);
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        let value = trimmed.substring(idx + 1).trim();
        // Quotes strip karna
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.substring(1, value.length - 1);
        }
        process.env[key] = value;
      }
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

let rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Clean URL: strip trailing slashes, whitespace, or invalid endpoints
rawUrl = rawUrl.trim().replace(/\/+$/, '');

console.log('Using Supabase URL:', rawUrl);

if (!rawUrl || !rawKey) {
  console.error('Error: Supabase credentials nahi mile .env.local ya .env file mein!');
  process.exit(1);
}

const supabase = createClient(rawUrl, rawKey, {
  auth: { persistSession: false },
  db: { schema: 'public' }
});

async function runIngestion() {
  const filePath = path.join(process.cwd(), 'scripts', 'data', 'cbse-11-12.json');
  
  if (!fs.existsSync(filePath)) {
    console.error('Error: JSON file nahi mili path par:', filePath);
    process.exit(1);
  }

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
      }, { onConflict: 'id' });

    if (unitErr) {
      console.error(`Error inserting unit ${unitId}:`, unitErr.message);
      continue;
    }
    console.log(`✓ Unit synced: ${unit.unitTitle}`);

    // 2. Upsert Topics
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
        }, { onConflict: 'id' });

      if (topicErr) {
        console.error(`  Error inserting topic ${topic.id}:`, topicErr.message);
        continue;
      }
      console.log(`  ✓ Topic synced: ${topic.title}`);

      // 3. Upsert Content Modules
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
            }, { onConflict: 'id' });

          if (modErr) {
            console.error(`    Error inserting module ${mod.id}:`, modErr.message);
          } else {
            console.log(`    ✓ Module synced: ${mod.id}`);
          }
        }
      }
    }
  }

  console.log('\n--- Ingestion Process Completed Successfully! ---');
}

runIngestion().catch((err) => {
  console.error('Fatal Ingestion Error:', err);
});