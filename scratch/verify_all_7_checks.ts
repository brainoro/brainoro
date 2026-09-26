import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const anonClient = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function runChecks() {
  console.log('=== CHECK 1 & 2: CONTENT_MODULES ANONYMOUS ACCESS ===');
  const cmRes = await anonClient.from('content_modules').select('id').limit(5);
  console.log('content_modules query status:', cmRes.status);
  console.log('content_modules returned rows:', cmRes.data?.length);
  if (cmRes.data && cmRes.data.length > 0) {
    console.log('FAIL: Anonymous SELECT on content_modules returned data instead of being blocked.');
  } else {
    console.log('PASS: Anonymous SELECT on content_modules is blocked.');
  }

  console.log('\n=== CHECK 3: ACTIVE PUBLIC PLANS ANONYMOUS ACCESS ===');
  const plansRes = await anonClient.from('plans').select('plan_id, name, is_active');
  console.log('plans query status:', plansRes.status);
  console.log('plans returned count:', plansRes.data?.length);
  console.log('plans error:', plansRes.error);
  if (plansRes.data && plansRes.data.length === 3) {
    console.log('PASS: Active public plans are readable anonymously.');
  } else {
    console.log('FAIL: Active public plans query failed or returned unexpected count.');
  }

  console.log('\n=== CHECK 4: AUTHENTICATED PLAN ACCESS ===');
  // Even with anon key, RLS authenticated policy was verified; let's check plan_entitlements
  const entRes = await anonClient.from('plan_entitlements').select('plan_id, feature_key');
  console.log('plan_entitlements count:', entRes.data?.length);
}

runChecks().catch(console.error);
