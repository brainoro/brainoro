import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function testParamMatchingRpcs() {
  console.log('Testing RPCs with exact parameter signatures:');

  const tests = [
    {
      name: 'complete_user_onboarding',
      args: {
        p_board_id: 'CBSE',
        p_grade_level: 6,
        p_subject_ids: ['MATH'],
        p_primary_subject_id: 'MATH'
      }
    },
    {
      name: 'admin_update_user_status',
      args: {
        p_target_user_id: '00000000-0000-0000-0000-000000000000',
        p_new_status: 'ACTIVE',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_update_user_role',
      args: {
        p_target_user_id: '00000000-0000-0000-0000-000000000000',
        p_new_role: 'STUDENT',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_reassign_user_board',
      args: {
        p_target_user_id: '00000000-0000-0000-0000-000000000000',
        p_new_board_id: 'CBSE',
        p_new_grade_level: 6,
        p_new_subject_ids: ['MATH'],
        p_primary_subject_id: 'MATH',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_grant_customer_admin',
      args: {
        p_target_user_id: '00000000-0000-0000-0000-000000000000',
        p_notes: 'test',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_revoke_customer_admin',
      args: {
        p_target_user_id: '00000000-0000-0000-0000-000000000000',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_create_or_update_plan',
      args: {
        p_plan_id: 'TEST',
        p_name: 'Test Plan',
        p_description: 'Test',
        p_tier_level: 1,
        p_price: 0,
        p_currency: 'INR',
        p_billing_interval: 'MONTHLY',
        p_is_active: true,
        p_reason: 'test'
      }
    },
    {
      name: 'admin_update_plan_entitlement',
      args: {
        p_plan_id: 'TEST',
        p_feature_key: 'test',
        p_feature_value: {},
        p_reason: 'test'
      }
    },
    {
      name: 'admin_assign_user_subscription',
      args: {
        p_target_user_id: '00000000-0000-0000-0000-000000000000',
        p_plan_id: 'FREE',
        p_ends_at: new Date().toISOString(),
        p_reason: 'test'
      }
    },
    {
      name: 'admin_cancel_user_subscription',
      args: {
        p_target_user_id: '00000000-0000-0000-0000-000000000000',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_get_customer_metrics',
      args: {}
    },
    {
      name: 'admin_get_users_list',
      args: {
        p_page: 1,
        p_limit: 10
      }
    }
  ];

  for (const t of tests) {
    const { data, error } = await supabase.rpc(t.name as any, t.args as any);
    if (error) {
      console.log(`RPC ${t.name.padEnd(32)} -> code: ${error.code} | message: ${error.message}`);
    } else {
      console.log(`RPC ${t.name.padEnd(32)} -> Success: ${JSON.stringify(data)}`);
    }
  }
}

testParamMatchingRpcs().catch(console.error);
