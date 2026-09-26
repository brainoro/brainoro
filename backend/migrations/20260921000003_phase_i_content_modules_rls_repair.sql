-- =============================================================================
-- Migration: 20260921000003_phase_i_content_modules_rls_repair.sql
-- Description: Minimal Phase I RLS Repair for content_modules:
--   1. Drop legacy permissive "Admin write access for content_modules" (FOR ALL USING true).
--   2. Drop legacy read policies that could allow anonymous read access.
--   3. Re-enforce fail-closed "Protected read access for content_modules"
--      restricted strictly to authenticated callers via Phase I learning gateway:
--        _brainoro_internal.can_access_learning()
--        OR _brainoro_internal.is_current_user_customer_admin()
--        OR _brainoro_internal.is_current_user_super_admin().
--   4. Split administrative write capability (INSERT, UPDATE, DELETE)
--      restricted strictly to authenticated administrators
--      (customer admins, super admins, curriculum admins).
--   5. Defend against unauthorized anonymous mutations.
-- =============================================================================

BEGIN;

-- 1. Ensure RLS is active
ALTER TABLE public.content_modules ENABLE ROW LEVEL SECURITY;

-- 2. Drop all legacy / overly permissive policies on content_modules
DROP POLICY IF EXISTS "Admin write access for content_modules" ON public.content_modules;
DROP POLICY IF EXISTS "Public read access for content_modules" ON public.content_modules;
DROP POLICY IF EXISTS "Public Read Access" ON public.content_modules;
DROP POLICY IF EXISTS "Protected read access for content_modules" ON public.content_modules;
DROP POLICY IF EXISTS "Curriculum Admin Write Access" ON public.content_modules;
DROP POLICY IF EXISTS "Admin write content_modules" ON public.content_modules;
DROP POLICY IF EXISTS "Allow all for content_modules" ON public.content_modules;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.content_modules;
DROP POLICY IF EXISTS "Admin insert access for content_modules" ON public.content_modules;
DROP POLICY IF EXISTS "Admin update access for content_modules" ON public.content_modules;
DROP POLICY IF EXISTS "Admin delete access for content_modules" ON public.content_modules;

-- 3. Fail-Closed Protected Read Gateway (Authenticated Active Learners / Admins ONLY)
-- Anonymous callers have NO SELECT policy and are completely blocked.
CREATE POLICY "Protected read access for content_modules" ON public.content_modules
FOR SELECT TO authenticated
USING (
    _brainoro_internal.can_access_learning()
    OR _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

-- 4. Controlled Administrative Write Policies (INSERT, UPDATE, DELETE separated from SELECT)
-- Authenticated customer admins, super admins, or curriculum admins ONLY.
CREATE POLICY "Admin insert access for content_modules" ON public.content_modules
FOR INSERT TO authenticated
WITH CHECK (
    _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
    OR EXISTS (SELECT 1 FROM public.curriculum_administrators WHERE user_id = auth.uid())
);

CREATE POLICY "Admin update access for content_modules" ON public.content_modules
FOR UPDATE TO authenticated
USING (
    _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
    OR EXISTS (SELECT 1 FROM public.curriculum_administrators WHERE user_id = auth.uid())
)
WITH CHECK (
    _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
    OR EXISTS (SELECT 1 FROM public.curriculum_administrators WHERE user_id = auth.uid())
);

CREATE POLICY "Admin delete access for content_modules" ON public.content_modules
FOR DELETE TO authenticated
USING (
    _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
    OR EXISTS (SELECT 1 FROM public.curriculum_administrators WHERE user_id = auth.uid())
);

-- 5. Explicit Defense-in-Depth Table Revocations
REVOKE INSERT, UPDATE, DELETE ON TABLE public.content_modules FROM anon;

COMMIT;
