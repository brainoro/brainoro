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

console.log('Supabase URL:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectDb() {
  const { data: topics, count: topicCount, error: topicErr } = await supabase
    .from('topics')
    .select('id, unit_id, grade_level, subject_id, title, metadata', { count: 'exact' });
  
  if (topicErr) {
    console.error('Error fetching topics:', topicErr);
  } else {
    console.log('Total topics count in public.topics:', topicCount);
    console.log('\n--- Grade 12 Topics ---');
    const g12Topics = (topics || []).filter(t => t.grade_level === 12);
    console.log(`Total Grade 12 Topics: ${g12Topics.length}`);
    g12Topics.forEach(t => {
      console.log(`[${t.subject_id}] ID: ${t.id} | Title: ${t.title}`);
    });

    console.log('\n--- Grade 11 Topics ---');
    const g11Topics = (topics || []).filter(t => t.grade_level === 11);
    console.log(`Total Grade 11 Topics: ${g11Topics.length}`);
    g11Topics.forEach(t => {
      console.log(`[${t.subject_id}] ID: ${t.id} | Title: ${t.title}`);
    });
  }

  const { data: modules, count: moduleCount, error: moduleErr } = await supabase
    .from('content_modules')
    .select('id, topic_id, module_type, content', { count: 'exact' });
  
  if (moduleErr) {
    console.error('Error fetching content_modules:', moduleErr);
  } else {
    console.log('\n--- Content Modules ---');
    console.log('Total content_modules count:', moduleCount);
    (modules || []).forEach(m => {
      console.log(`ID: ${m.id} | TopicID: ${m.topic_id} | Type: ${m.module_type} | Has Content: ${Boolean(m.content)}`);
    });
  }
}

inspectDb();
