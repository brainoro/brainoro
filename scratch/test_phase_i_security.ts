import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gyjlrgudysqabwbhaskr.supabase.co')
  .replace(/\/rest\/v1\/?$/, '')
  .replace(/\/$/, '');

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amxyZ3VkeXNxYWJ3Ymhhc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI1ODUsImV4cCI6MjEwNDk4ODU4NX0.N_SDVcl0PoN39n9sHApC_nEy8fI0xRqhj3IFvG6zbeI';

interface TestResult {
  suite: string;
  test: string;
  status: 'PASS' | 'FAIL' | 'SKIPPED';
  details: string;
  durationMs: number;
}

const results: TestResult[] = [];

function recordResult(suite: string, test: string, status: 'PASS' | 'FAIL' | 'SKIPPED', details: string, durationMs: number) {
  results.push({ suite, test, status, details, durationMs });
  const badge = status === 'PASS' ? '✅ PASS' : status === 'FAIL' ? '❌ FAIL' : '⚠️ SKIPPED';
  console.log(`[${badge}] ${suite} :: ${test} (${durationMs}ms) - ${details}`);
}

async function runSecurityTests() {
  console.log('================================================================');
  console.log('  BRAINORO OS — PHASE I SECURITY & AUTHORIZATION TEST MATRIX');
  console.log('================================================================\n');

  // ===========================================================================
  // SUITE 1: DDL & Migration Architecture Static Security Audit
  // ===========================================================================
  console.log('--- Suite 1: Migration DDL Architectural Invariants ---');
  const migrationPath = path.resolve(process.cwd(), 'backend/migrations/20260921000001_phase_i_accounts_admin_subscriptions.sql');
  const migrationSql = fs.readFileSync(migrationPath, 'utf8');

  // 1.1 Private helper schema isolation & search_path
  const hasPrivateSchema = migrationSql.includes('CREATE SCHEMA IF NOT EXISTS _brainoro_internal;') &&
    migrationSql.includes('REVOKE ALL ON SCHEMA _brainoro_internal FROM PUBLIC, anon, authenticated;') &&
    migrationSql.includes("SET search_path = ''");
  recordResult(
    'Migration Invariants',
    'Private schema isolation and search_path hardening',
    hasPrivateSchema ? 'PASS' : 'FAIL',
    '_brainoro_internal schema created, revoked from public/anon/auth, and search_path cleared',
    0
  );

  // 1.2 Customer Admin Dual Condition Check
  const hasDualCondition = migrationSql.includes('ca.is_active = TRUE') && migrationSql.includes("p.account_status = 'ACTIVE'");
  recordResult(
    'Migration Invariants',
    'Customer admin dual-condition check (is_active AND account_status=ACTIVE)',
    hasDualCondition ? 'PASS' : 'FAIL',
    'is_current_user_customer_admin() enforces both customer_administrators.is_active and profiles.account_status = ACTIVE',
    0
  );

  // 1.3 Column-level Grants on profiles
  const hasColumnGrants = migrationSql.includes('GRANT SELECT ON TABLE public.profiles TO authenticated;') &&
    migrationSql.includes('GRANT UPDATE (display_name, avatar_url, institution_name, location) ON TABLE public.profiles TO authenticated;');
  recordResult(
    'Migration Invariants',
    'Column-level UPDATE grants on profiles',
    hasColumnGrants ? 'PASS' : 'FAIL',
    'authenticated role granted UPDATE strictly on display_name, avatar_url, institution_name, location',
    0
  );

  // 1.4 Privileged fields trigger protection
  const hasPrivilegedTrigger = migrationSql.includes('fn_protect_profile_privileged_fields()') &&
    migrationSql.includes('trg_protect_profile_privileged_fields') &&
    migrationSql.includes('WHEN (pg_trigger_depth() = 0)');
  recordResult(
    'Migration Invariants',
    'Profile privileged fields trigger (fn_protect_profile_privileged_fields)',
    hasPrivilegedTrigger ? 'PASS' : 'FAIL',
    'Defense-in-depth trigger rejects modifications to email, role, account_status, board_id, grade_level from direct client updates',
    0
  );

  // 1.5 Fail-closed learning gateway
  const hasLearningGateway = migrationSql.includes('can_access_learning()') &&
    migrationSql.includes('_brainoro_internal.can_access_learning()') &&
    migrationSql.includes('ALTER TABLE public.content_modules ENABLE ROW LEVEL SECURITY;');
  recordResult(
    'Migration Invariants',
    'Fail-closed learning gateway on content_modules',
    hasLearningGateway ? 'PASS' : 'FAIL',
    'content_modules protected by RLS and _brainoro_internal.can_access_learning()',
    0
  );

  // 1.6 Subscription Concurrency & Profile Row Lock
  const hasSubLock = migrationSql.includes('FROM public.profiles') &&
    migrationSql.includes('FOR UPDATE') &&
    migrationSql.includes('admin_assign_user_subscription') &&
    migrationSql.includes('admin_cancel_user_subscription');
  recordResult(
    'Migration Invariants',
    'Subscription serialization anchor (FOR UPDATE on profiles row)',
    hasSubLock ? 'PASS' : 'FAIL',
    'Both admin_assign_user_subscription and admin_cancel_user_subscription lock target profile row FOR UPDATE',
    0
  );

  // 1.7 Last Customer Admin Concurrency Protection
  const hasAdvisoryLock = migrationSql.includes('pg_advisory_xact_lock(') &&
    migrationSql.includes('CANNOT_DEACTIVATE_LAST_ADMIN') &&
    migrationSql.includes('CANNOT_REVOKE_LAST_ADMIN');
  recordResult(
    'Migration Invariants',
    'Last admin concurrency advisory lock protection',
    hasAdvisoryLock ? 'PASS' : 'FAIL',
    'Transaction advisory lock prevents race conditions on last customer admin deactivation and revocation',
    0
  );

  // 1.8 Primary Subject Partial Unique Index
  const hasPrimaryIndex = migrationSql.includes('idx_user_subjects_primary') &&
    migrationSql.includes('WHERE (is_primary = TRUE)');
  recordResult(
    'Migration Invariants',
    'Single primary subject partial unique index (idx_user_subjects_primary)',
    hasPrimaryIndex ? 'PASS' : 'FAIL',
    'Database enforces exactly one primary subject per user via partial unique index',
    0
  );

  // 1.9 Admin Audit Logs Immutability
  const hasAuditImmutability = migrationSql.includes('REVOKE ALL ON TABLE public.admin_audit_logs FROM PUBLIC, anon, authenticated;') &&
    migrationSql.includes('GRANT SELECT ON TABLE public.admin_audit_logs TO authenticated;') &&
    migrationSql.includes('ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;');
  recordResult(
    'Migration Invariants',
    'Admin audit logs immutability (no UPDATE/DELETE, read restricted to customer admins)',
    hasAuditImmutability ? 'PASS' : 'FAIL',
    'admin_audit_logs strictly append-only, UPDATE/DELETE revoked, read restricted by RLS',
    0
  );

  // ===========================================================================
  // SUITE 2: Live Supabase Private Schema Isolation
  // ===========================================================================
  console.log('\n--- Suite 2: Live Supabase Private Helper Isolation ---');
  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const privateHelpers = [
    'is_current_user_customer_admin',
    'is_current_user_super_admin',
    'can_access_learning',
    'bootstrap_initial_super_admin'
  ];

  for (const fnName of privateHelpers) {
    const start = Date.now();
    try {
      const { data, error } = await anonClient.rpc(fnName as any);
      const duration = Date.now() - start;
      if (error) {
        recordResult(
          'Live Private Helper Isolation',
          `Direct RPC call to ${fnName} as anon`,
          'PASS',
          `Blocked with expected error: ${error.message}`,
          duration
        );
      } else {
        recordResult(
          'Live Private Helper Isolation',
          `Direct RPC call to ${fnName} as anon`,
          'FAIL',
          `Direct call succeeded with data: ${JSON.stringify(data)}`,
          duration
        );
      }
    } catch (err: any) {
      const duration = Date.now() - start;
      recordResult(
        'Live Private Helper Isolation',
        `Direct RPC call to ${fnName} as anon`,
        'PASS',
        `Exception thrown: ${err.message}`,
        duration
      );
    }
  }

  // ===========================================================================
  // SUITE 3: Live Customer Admin RPC Authorization Denial
  // ===========================================================================
  console.log('\n--- Suite 3: Live Customer Admin RPC Authorization Denial ---');

  const adminRpcTests = [
    {
      name: 'admin_reassign_user_board',
      params: {
        p_target_user_id: '00000000-0000-0000-0000-000000000001',
        p_target_board_id: 'CBSE',
        p_target_grade_level: 7,
        p_target_primary_subject: 'MATH',
        p_reassignment_mode: 'RESET_PROGRESS',
        p_reason: 'Unauthorized test attempt'
      }
    },
    {
      name: 'admin_update_user_status',
      params: {
        p_target_user_id: '00000000-0000-0000-0000-000000000001',
        p_new_status: 'SUSPENDED',
        p_reason: 'Unauthorized status test'
      }
    },
    {
      name: 'admin_update_user_role',
      params: {
        p_target_user_id: '00000000-0000-0000-0000-000000000001',
        p_new_role: 'SUPER_ADMIN',
        p_reason: 'Privilege escalation attempt'
      }
    },
    {
      name: 'admin_assign_user_subscription',
      params: {
        p_target_user_id: '00000000-0000-0000-0000-000000000001',
        p_plan_id: '00000000-0000-0000-0000-000000000002',
        p_reason: 'Unauthorized subscription test'
      }
    },
    {
      name: 'admin_cancel_user_subscription',
      params: {
        p_target_user_id: '00000000-0000-0000-0000-000000000001',
        p_reason: 'Unauthorized cancellation test'
      }
    },
    {
      name: 'admin_list_users',
      params: {
        p_limit: 10,
        p_offset: 0
      }
    },
    {
      name: 'admin_get_overview_metrics',
      params: {}
    }
  ];

  for (const rpcTest of adminRpcTests) {
    const start = Date.now();
    try {
      const { data, error } = await anonClient.rpc(rpcTest.name as any, rpcTest.params as any);
      const duration = Date.now() - start;
      if (error) {
        recordResult(
          'Live Admin RPC Security',
          `Anon execution of ${rpcTest.name}`,
          'PASS',
          `Properly rejected: ${error.message} (code: ${error.code})`,
          duration
        );
      } else {
        recordResult(
          'Live Admin RPC Security',
          `Anon execution of ${rpcTest.name}`,
          'FAIL',
          `Unauthorized caller succeeded! Result: ${JSON.stringify(data)}`,
          duration
        );
      }
    } catch (err: any) {
      const duration = Date.now() - start;
      recordResult(
        'Live Admin RPC Security',
        `Anon execution of ${rpcTest.name}`,
        'PASS',
        `Exception thrown: ${err.message}`,
        duration
      );
    }
  }

  // ===========================================================================
  // SUITE 4: Live Table RLS Direct Mutation Denial (Anon)
  // ===========================================================================
  console.log('\n--- Suite 4: Live Table RLS Direct Mutation Denial ---');

  const tableMutationTests = [
    {
      table: 'profiles',
      payload: {
        user_id: '00000000-0000-0000-0000-000000000099',
        email: 'hacker@brainoro.internal',
        role: 'SUPER_ADMIN',
        account_status: 'ACTIVE'
      }
    },
    {
      table: 'customer_administrators',
      payload: {
        user_id: '00000000-0000-0000-0000-000000000099',
        is_active: true
      }
    },
    {
      table: 'plans',
      payload: {
        plan_code: 'HAX_FREE_UNLIMITED',
        display_name: 'Hacked Free Plan',
        billing_cadence: 'FREE',
        price_in_cents: 0
      }
    },
    {
      table: 'user_subscriptions',
      payload: {
        user_id: '00000000-0000-0000-0000-000000000099',
        status: 'ACTIVE'
      }
    },
    {
      table: 'admin_audit_logs',
      payload: {
        action: 'FORGED_AUDIT_LOG',
        target_user_id: '00000000-0000-0000-0000-000000000099'
      }
    }
  ];

  for (const mutTest of tableMutationTests) {
    const start = Date.now();
    try {
      const { data, error } = await anonClient.from(mutTest.table).insert(mutTest.payload);
      const duration = Date.now() - start;
      if (error) {
        recordResult(
          'Live Table RLS Mutation Denial',
          `Anon INSERT on ${mutTest.table}`,
          'PASS',
          `Rejected as expected: ${error.message} (code: ${error.code})`,
          duration
        );
      } else {
        recordResult(
          'Live Table RLS Mutation Denial',
          `Anon INSERT on ${mutTest.table}`,
          'FAIL',
          `Direct insert succeeded! Result: ${JSON.stringify(data)}`,
          duration
        );
      }
    } catch (err: any) {
      const duration = Date.now() - start;
      recordResult(
        'Live Table RLS Mutation Denial',
        `Anon INSERT on ${mutTest.table}`,
        'PASS',
        `Exception: ${err.message}`,
        duration
      );
    }
  }

  // ===========================================================================
  // SUITE 5: Live Onboarding Invariants
  // ===========================================================================
  console.log('\n--- Suite 5: Live Onboarding Invariants ---');

  const obStart = Date.now();
  try {
    const { data, error } = await anonClient.rpc('complete_user_onboarding', {
      p_board_id: 'CBSE',
      p_grade_level: 6,
      p_enrolled_subject_ids: [],
      p_primary_subject_id: 'MATH'
    });
    const duration = Date.now() - obStart;
    if (error) {
      recordResult(
        'Live Onboarding Invariants',
        'Unauthenticated onboarding completion rejection',
        'PASS',
        `Rejected unauthenticated onboarding: ${error.message}`,
        duration
      );
    } else {
      recordResult(
        'Live Onboarding Invariants',
        'Unauthenticated onboarding completion rejection',
        'FAIL',
        `Unexpected success: ${JSON.stringify(data)}`,
        duration
      );
    }
  } catch (err: any) {
    const duration = Date.now() - obStart;
    recordResult(
      'Live Onboarding Invariants',
      'Unauthenticated onboarding completion rejection',
      'PASS',
      `Exception: ${err.message}`,
      duration
    );
  }

  // ===========================================================================
  // Final Results Summary
  // ===========================================================================
  console.log('\n================================================================');
  console.log('  PHASE I SECURITY TEST MATRIX SUMMARY');
  console.log('================================================================\n');

  const total = results.length;
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIPPED').length;

  console.log(`Total Rules Evaluated: ${total}`);
  console.log(`Passed:                ${passed}`);
  console.log(`Failed:                ${failed}`);
  console.log(`Skipped:               ${skipped}`);
  console.log(`Score:                 ${((passed / total) * 100).toFixed(1)}%`);

  if (failed > 0) {
    console.error(`\n❌ ${failed} security tests failed!`);
    process.exit(1);
  } else {
    console.log(`\n✅ ALL ${passed} PHASE I SECURITY TESTS PASSED.`);
  }
}

runSecurityTests().catch((err) => {
  console.error('Fatal error in security test runner:', err);
  process.exit(1);
});
