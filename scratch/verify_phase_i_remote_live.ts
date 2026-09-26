import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function inspectErrors() {
  const tables = [
    'profiles',
    'customer_administrators',
    'user_subjects',
    'plans',
    'plan_entitlements',
    'user_subscriptions',
    'admin_audit_logs'
  ];

  for (const t of tables) {
    const res = await supabase.from(t).select('*').limit(1);
    console.log(`Table ${t}:`, {
      status: res.status,
      statusText: res.statusText,
      error: res.error
    });
  }
}

inspectErrors().catch(console.error);
