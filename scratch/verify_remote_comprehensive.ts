import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function main() {
  const dummyUuid = '00000000-0000-0000-0000-000000000000';
  const rpcCalls: { name: string; args: Record<string, any> }[] = [
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
        p_target_user_id: dummyUuid,
        p_new_status: 'ACTIVE',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_update_user_role',
      args: {
        p_target_user_id: dummyUuid,
        p_new_role: 'STUDENT',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_reassign_user_board',
      args: {
        p_target_user_id: dummyUuid,
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
        p_target_user_id: dummyUuid,
        p_notes: 'test',
        p_reason: 'test'
      }
    },
    {
      name: 'admin_revoke_customer_admin',
      args: {
        p_target_user_id: dummyUuid,
        p_reason: 'test'
      }
    },
    {
      name: 'admin_create_or_update_plan',
      args: {
        p_plan_id: 'TEST_PLAN',
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
        p_plan_id: 'FREE',
        p_feature_key: 'test',
        p_feature_value: { enabled: true },
        p_reason: 'test'
      }
    },
    {
      name: 'admin_assign_user_subscription',
      args: {
        p_target_user_id: dummyUuid,
        p_plan_id: 'FREE',
        p_ends_at: null,
        p_reason: 'test'
      }
    },
    {
      name: 'admin_cancel_user_subscription',
      args: {
        p_target_user_id: dummyUuid,
        p_reason: 'test'
      }
    },
    {
      name: 'admin_get_customer_metrics',
      args: {}
    },
    {
      name: 'admin_get_users_list',
      args: {}
    }
  ];

  console.log('--- CALLING ALL 12 RPCs WITH EXACT PARAMETERS (AS ANON) ---');
  for (const r of rpcCalls) {
    const res = await supabase.rpc(r.name, r.args);
    console.log(`RPC [${r.name}]: status=${res.status}, code=${res.error?.code ?? 'OK'}, msg="${res.error?.message ?? ''}"`);
  }
}

main().catch(console.error);
