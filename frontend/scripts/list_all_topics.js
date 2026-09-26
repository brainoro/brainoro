const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.trim().replace(/^['"]|['"]$/g, '');
    env[match[1]] = value;
  }
});

const supabaseUrl = (env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/rest\/v1\/?/, '').replace(/\/+$/, '');
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllTopics() {
  const { data: topics, error } = await supabase
    .from('topics')
    .select('id, unit_id, grade_level, subject_id, title, metadata')
    .order('grade_level', { ascending: true });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total topics in DB: ${topics.length}`);
  const byGradeSubj = {};
  topics.forEach(t => {
    const key = `G${t.grade_level}-${t.subject_id}`;
    if (!byGradeSubj[key]) byGradeSubj[key] = [];
    byGradeSubj[key].push(t);
  });

  for (const [key, list] of Object.entries(byGradeSubj)) {
    console.log(`\n=== ${key} (Count: ${list.length}) ===`);
    list.forEach((t, i) => {
      console.log(`  ${i + 1}. [${t.id}] "${t.title}" (slug: ${t.metadata?.slug})`);
    });
  }

  // Also check existing CORE_CONCEPT modules count
  const { count: coreConceptCount } = await supabase
    .from('content_modules')
    .select('*', { count: 'exact', head: true })
    .eq('module_type', 'CORE_CONCEPT');

  console.log(`\nCurrent count of public.content_modules with module_type='CORE_CONCEPT': ${coreConceptCount}`);
}

checkAllTopics();
