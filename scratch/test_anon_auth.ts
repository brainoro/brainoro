import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function testAnonSignIn() {
  const res = await supabase.auth.signInAnonymously();
  console.log('Anonymous sign in result:', {
    hasSession: !!res.data?.session,
    error: res.error?.message
  });
}

testAnonSignIn().catch(console.error);
