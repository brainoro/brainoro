import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function test() {
  console.log('1. Known existing unconfirmed user with WRONG password:');
  const r1 = await supabase.auth.signInWithPassword({
    email: 'student_1789938320380@brainoro.com',
    password: 'WrongPasswordProbe123!'
  });
  console.log('r1:', r1.error?.message);

  console.log('\n2. Known existing unconfirmed user with CORRECT password:');
  const r2 = await supabase.auth.signInWithPassword({
    email: 'student_1789938320380@brainoro.com',
    password: 'Password123!Safe'
  });
  console.log('r2:', r2.error?.message);

  console.log('\n3. Definitely non-existent email:');
  const r3 = await supabase.auth.signInWithPassword({
    email: `definitely_does_not_exist_${Date.now()}@example.com`,
    password: 'WrongPasswordProbe123!'
  });
  console.log('r3:', r3.error?.message);
}

test().catch(console.error);
