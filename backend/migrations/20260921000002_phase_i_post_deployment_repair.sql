-- =============================================================================
-- Migration: 20260921000002_phase_i_post_deployment_repair.sql
-- Description: Minimal post-deployment repair for Phase I:
--   1. Drop legacy Phase 2c "Public Read Access" policy on content_modules
--      so that the fail-closed "Protected read access for content_modules"
--      is strictly enforced.
--   2. Split plans select policy so anonymous clients can read active plans
--      without evaluating _brainoro_internal.is_current_user_customer_admin().
-- =============================================================================

BEGIN;

-- 1. Enforce Fail-Closed Learning Gateway on content_modules
-- Drop the legacy Phase 2c policy that used exact casing "Public Read Access"
DROP POLICY IF EXISTS "Public Read Access" ON public.content_modules;
DROP POLICY IF EXISTS "Public read access for content_modules" ON public.content_modules;

-- Ensure the Phase I protected read access policy is active
DROP POLICY IF EXISTS "Protected read access for content_modules" ON public.content_modules;
CREATE POLICY "Protected read access for content_modules" ON public.content_modules
FOR SELECT TO authenticated
USING (
    _brainoro_internal.can_access_learning()
    OR _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

-- 2. Fix Plans Select Policy for Anonymous Catalog Browsing
DROP POLICY IF EXISTS "Plans select policy" ON public.plans;
DROP POLICY IF EXISTS "Plans anon select policy" ON public.plans;
DROP POLICY IF EXISTS "Plans authenticated select policy" ON public.plans;

-- Anonymous users can read active plans without executing private admin helpers
CREATE POLICY "Plans anon select policy" ON public.plans
FOR SELECT TO anon
USING (is_active = TRUE);

-- Authenticated users (including customer/super admins) can read active plans or manage all plans
CREATE POLICY "Plans authenticated select policy" ON public.plans
FOR SELECT TO authenticated
USING (
    is_active = TRUE
    OR _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

COMMIT;
