import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const anonClient = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function verify() {
  console.log('=== 1. ANONYMOUS SELECT ON CONTENT_MODULES ===');
  const cmAnon = await anonClient.from('content_modules').select('id, module_type').limit(5);
  console.log('content_modules anon result:', {
    status: cmAnon.status,
    statusText: cmAnon.statusText,
    data: cmAnon.data,
    count: cmAnon.data?.length,
    error: cmAnon.error
  });

  console.log('\n=== 2. ANONYMOUS SELECT ON PLANS ===');
  const plansAnon = await anonClient.from('plans').select('*');
  console.log('plans anon result:', {
    status: plansAnon.status,
    statusText: plansAnon.statusText,
    dataCount: plansAnon.data?.length,
    plans: plansAnon.data?.map((p: any) => ({ id: p.plan_id, name: p.name, is_active: p.is_active })),
    error: plansAnon.error
  });

  console.log('\n=== 3. CHECK ENTITLEMENTS ANONYMOUSLY ===');
  const entAnon = await anonClient.from('plan_entitlements').select('*');
  console.log('plan_entitlements anon result:', {
    status: entAnon.status,
    count: entAnon.data?.length,
    error: entAnon.error
  });
}

verify().catch(console.error);
