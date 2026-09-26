import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

async function runLiveSmokeTest() {
  console.log('================================================================');
  console.log('   BRAINORO OS — LIVE USER LIFECYCLE & RPC VERIFICATION');
  console.log('================================================================\n');

  const testEmail = `student_${Date.now()}@brainoro.com`;
  const testPassword = 'Password123!Safe';

  console.log(`[Step 1] Signing up new student user: ${testEmail}`);
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        full_name: 'Auditor Student',
        institution_name: 'Delhi Public School R.K. Puram',
        location: 'New Delhi, India'
      }
    }
  });

  if (authError) {
    console.error('❌ Sign up error:', authError);
    return;
  }

  const user = authData.user;
  const session = authData.session;
  console.log('✅ Auth user created successfully:', user?.id);
  console.log('Session present:', !!session);

  // Authenticated client using the signed-in user's access token
  const userClient = session?.access_token
    ? createClient(cleanSupabaseUrl, cleanSupabaseKey, {
        global: {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        }
      })
    : supabase;

  // Step 2: Verify profiles row created by trigger trg_auth_handle_new_user
  console.log('\n[Step 2] Checking profiles table for auto-created profile row...');
  const { data: profile, error: pErr } = await userClient
    .from('profiles')
    .select('*')
    .eq('user_id', user!.id)
    .single();

  if (pErr) {
    console.error('❌ Error fetching profile:', pErr);
  } else {
    console.log('✅ Profile row verified:');
    console.log(`   - user_id:              ${profile.user_id}`);
    console.log(`   - email:                ${profile.email}`);
    console.log(`   - display_name:         ${profile.display_name}`);
    console.log(`   - role:                 ${profile.role}`);
    console.log(`   - account_status:       ${profile.account_status}`);
    console.log(`   - onboarding_completed: ${profile.onboarding_completed}`);
    console.log(`   - institution_name:     ${profile.institution_name}`);
    console.log(`   - location:             ${profile.location}`);
  }

  // Step 3: Check plans table as authenticated user
  console.log('\n[Step 3] Querying plans table as authenticated user...');
  const { data: authPlans, error: plansErr } = await userClient.from('plans').select('*');
  if (plansErr) {
    console.error('❌ Error fetching plans as authenticated:', plansErr);
  } else {
    console.log(`✅ Authenticated SELECT on plans succeeded: ${authPlans?.length} plans found.`);
    authPlans?.forEach(p => console.log(`   - [${p.plan_id}] ${p.name} (price: ₹${p.price}, interval: ${p.billing_interval})`));
  }

  // Step 4: Check content_modules before onboarding (Should return 0 rows or be gated)
  console.log('\n[Step 4] Checking learning gateway before onboarding...');
  const { data: preModules, error: preModErr } = await userClient
    .from('content_modules')
    .select('id')
    .limit(5);

  console.log('Pre-onboarding content_modules query:', {
    rows: preModules?.length,
    error: preModErr?.message
  });

  // Step 5: Execute complete_user_onboarding RPC
  console.log('\n[Step 5] Calling complete_user_onboarding RPC...');
  const { data: obData, error: obError } = await userClient.rpc('complete_user_onboarding', {
    p_board_id: 'CBSE',
    p_grade_level: 6,
    p_subject_ids: ['MATH', 'SCIENCE'],
    p_primary_subject_id: 'MATH'
  });

  if (obError) {
    console.error('❌ complete_user_onboarding RPC failed:', obError);
  } else {
    console.log('✅ complete_user_onboarding RPC succeeded:', obData);
  }

  // Step 6: Verify user_subjects and updated profile
  console.log('\n[Step 6] Verifying user_subjects and updated profile state...');
  const { data: subs, error: subsErr } = await userClient
    .from('user_subjects')
    .select('*')
    .eq('user_id', user!.id);

  if (subsErr) {
    console.error('❌ Error fetching user_subjects:', subsErr);
  } else {
    console.log(`✅ user_subjects enrolled: ${subs?.length} subjects`);
    subs?.forEach(s => console.log(`   - Subject: ${s.subject_id} (primary: ${s.is_primary}, board: ${s.board_id}, grade: ${s.grade_level})`));
  }

  const { data: updatedProfile } = await userClient
    .from('profiles')
    .select('*')
    .eq('user_id', user!.id)
    .single();

  console.log('Updated profile status:');
  console.log(`   - board_id:             ${updatedProfile?.board_id}`);
  console.log(`   - grade_level:          ${updatedProfile?.grade_level}`);
  console.log(`   - onboarding_completed: ${updatedProfile?.onboarding_completed}`);

  // Step 7: Check content_modules after onboarding
  console.log('\n[Step 7] Checking learning gateway after onboarding completion...');
  const { data: postModules, error: postModErr } = await userClient
    .from('content_modules')
    .select('id')
    .limit(5);

  console.log('Post-onboarding content_modules query:', {
    rows: postModules?.length,
    error: postModErr?.message
  });

  // Step 8: Test second onboarding rejection
  console.log('\n[Step 8] Testing second onboarding rejection...');
  const { data: ob2Data, error: ob2Error } = await userClient.rpc('complete_user_onboarding', {
    p_board_id: 'CBSE',
    p_grade_level: 7,
    p_subject_ids: ['MATH'],
    p_primary_subject_id: 'MATH'
  });

  if (ob2Error) {
    console.log(`✅ Second onboarding properly rejected: [${ob2Error.code}] ${ob2Error.message}`);
  } else {
    console.error('❌ Second onboarding unexpectedly succeeded!', ob2Data);
  }
}

runLiveSmokeTest().catch(console.error);
