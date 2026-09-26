import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function testSignIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'student_1789938320380@brainoro.com',
    password: 'Password123!Safe'
  });

  console.log('Sign in result:', {
    hasSession: !!data.session,
    hasUser: !!data.user,
    error: error?.message,
    status: error?.status
  });
}

testSignIn().catch(console.error);
