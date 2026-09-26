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

async function checkUnits() {
  const { data: units, error } = await supabase
    .from('units')
    .select('*')
    .order('grade_level', { ascending: true });

  if (error) {
    console.error('Error fetching units:', error);
    return;
  }

  console.log(`Total units in DB: ${units.length}`);
  units.forEach(u => {
    console.log(`[G${u.grade_level}-${u.subject_id}] Unit ID: ${u.id} | #${u.unit_number}: ${u.title}`);
  });
}

checkUnits();
