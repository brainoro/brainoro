import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function checkDetails() {
  const { data, error, status, statusText } = await supabase
    .from('academic_years')
    .select('*');

  console.log('academic_years check:', { data, error, status, statusText });

  const { data: bData, error: bError, count: bCount } = await supabase
    .from('boards')
    .select('*', { count: 'exact' });

  console.log('boards check:', { count: bCount, rows: bData });

  const { data: uData, count: uCount } = await supabase
    .from('units')
    .select('*', { count: 'exact' })
    .limit(2);

  console.log('units count:', uCount, 'sample:', uData);

  const { data: tData, count: tCount } = await supabase
    .from('topics')
    .select('*', { count: 'exact' })
    .limit(2);

  console.log('topics count:', tCount, 'sample:', tData);
}

checkDetails().catch(console.error);
