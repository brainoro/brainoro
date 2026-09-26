import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function check() {
  console.log('Testing DDL / table creation capabilities...');
  
  // Test if we can insert into 'boards' (an existing table with 0 rows)
  const { data: bData, error: bError } = await supabase
    .from('boards')
    .insert([
      {
        id: 'TEST_BOARD',
        display_name: 'Test Board',
        default_grading_system: 'PERCENTAGE',
      }
    ])
    .select();

  console.log('Insert into existing empty boards table:', { data: bData, error: bError });

  // Clean up test row if succeeded
  if (bData && bData.length > 0) {
    await supabase.from('boards').delete().eq('id', 'TEST_BOARD');
    console.log('Cleaned up test row from boards table.');
  }
}

check().catch(console.error);
