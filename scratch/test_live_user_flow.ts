import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function testUserFlow() {
  const testEmail = `test_learner_${Date.now()}@example.com`;
  const testPassword = 'Password123!@#Secure';

  console.log('--- ATTEMPTING SIGN UP ---');
  const signUpRes = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        display_name: 'Test Learner'
      }
    }
  });

  console.log('SignUp error:', signUpRes.error?.message);
  console.log('User created:', signUpRes.data.user?.id);
  console.log('User session present:', !!signUpRes.data.session);

  if (signUpRes.data.user) {
    const userId = signUpRes.data.user.id;
    console.log('User ID:', userId);

    // If session is present, test profile read
    if (signUpRes.data.session) {
      const authSupabase = createClient(cleanSupabaseUrl, cleanSupabaseKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        },
        global: {
          headers: {
            Authorization: `Bearer ${signUpRes.data.session.access_token}`
          }
        }
      });

      const profileRes = await authSupabase.from('profiles').select('*').eq('user_id', userId).single();
      console.log('Profile query result:', profileRes.data, 'Error:', profileRes.error);

      // Attempt onboarding
      const onbRes = await authSupabase.rpc('complete_user_onboarding', {
        p_board_id: 'CBSE',
        p_grade_level: 6,
        p_subject_ids: ['MATH'],
        p_primary_subject_id: 'MATH'
      });
      console.log('complete_user_onboarding result:', onbRes.data, 'Error:', onbRes.error);
    } else {
      console.log('Supabase requires email confirmation before session token is issued.');
    }
  }
}

testUserFlow().catch(console.error);
