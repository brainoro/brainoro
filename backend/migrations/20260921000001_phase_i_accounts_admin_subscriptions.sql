-- =============================================================================
-- Migration: 20260921000001_phase_i_accounts_admin_subscriptions.sql
-- Description: Brainoro OS Phase I — Real Accounts, Scalable Authentication,
--              Admin Customer Management, Subscription & Plan Architecture,
--              and Honest Customer Reporting.
-- =============================================================================

BEGIN;

-- =============================================================================
-- 1. Private Schema Initialization (_brainoro_internal)
-- =============================================================================
CREATE SCHEMA IF NOT EXISTS _brainoro_internal;
REVOKE ALL ON SCHEMA _brainoro_internal FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA _brainoro_internal TO authenticated;

-- =============================================================================
-- 2. Base Public Tables
-- =============================================================================

-- 2.1 Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    institution_name TEXT,
    location TEXT,
    role TEXT NOT NULL DEFAULT 'STUDENT'
        CHECK (role IN ('STUDENT', 'EDUCATOR', 'SUPER_ADMIN')),
    account_status TEXT NOT NULL DEFAULT 'ACTIVE'
        CHECK (account_status IN ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED', 'DEACTIVATED')),
    board_id TEXT REFERENCES public.boards(id) ON DELETE RESTRICT,
    grade_level INTEGER REFERENCES public.classes(grade_level) ON DELETE RESTRICT,
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_profiles_onboarding_consistency CHECK (
        (onboarding_completed = FALSE) OR 
        (onboarding_completed = TRUE AND board_id IS NOT NULL AND grade_level IS NOT NULL)
    )
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_account_status ON public.profiles(account_status);
CREATE INDEX IF NOT EXISTS idx_profiles_board_grade ON public.profiles(board_id, grade_level);
CREATE INDEX IF NOT EXISTS idx_profiles_institution ON public.profiles(institution_name);
CREATE INDEX IF NOT EXISTS idx_profiles_location ON public.profiles(location);

-- 2.2 Customer Administrators Table (Authoritative Membership)
CREATE TABLE IF NOT EXISTS public.customer_administrators (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_customer_admins_active ON public.customer_administrators(is_active);

-- 2.3 User Subjects Table (Enrolled Subjects & One Primary Subject Invariant)
CREATE TABLE IF NOT EXISTS public.user_subjects (
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE RESTRICT,
    board_id TEXT NOT NULL REFERENCES public.boards(id) ON DELETE RESTRICT,
    grade_level INTEGER NOT NULL REFERENCES public.classes(grade_level) ON DELETE RESTRICT,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, subject_id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subjects_primary
    ON public.user_subjects (user_id)
    WHERE (is_primary = TRUE);

CREATE INDEX IF NOT EXISTS idx_user_subjects_lookup 
    ON public.user_subjects (user_id, board_id, grade_level);

-- 2.4 Plans Table
CREATE TABLE IF NOT EXISTS public.plans (
    plan_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    tier_level INTEGER NOT NULL DEFAULT 1,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (price >= 0.00),
    currency TEXT NOT NULL DEFAULT 'INR',
    billing_interval TEXT NOT NULL DEFAULT 'MONTHLY'
        CHECK (billing_interval IN ('MONTHLY', 'QUARTERLY', 'ANNUAL', 'LIFETIME')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.5 Plan Entitlements Table
CREATE TABLE IF NOT EXISTS public.plan_entitlements (
    plan_id TEXT NOT NULL REFERENCES public.plans(plan_id) ON DELETE CASCADE,
    feature_key TEXT NOT NULL,
    feature_value_json JSONB NOT NULL DEFAULT '{"enabled": true}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (plan_id, feature_key)
);

-- 2.6 User Subscriptions Table (with Commercial Billing Snapshot)
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    subscription_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
    plan_id TEXT NOT NULL REFERENCES public.plans(plan_id) ON DELETE RESTRICT,
    status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'EXPIRED', 'CANCELLED', 'UPGRADED')),
    starts_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    ends_at TIMESTAMPTZ,
    assigned_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    billing_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_user_subscriptions_single_active 
    ON public.user_subscriptions (user_id) 
    WHERE (status = 'ACTIVE');

CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_status ON public.user_subscriptions(user_id, status);

-- 2.7 Admin Audit Logs Table (Append-Only)
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    action_type TEXT NOT NULL,
    target_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    target_resource TEXT NOT NULL,
    old_value JSONB,
    new_value JSONB,
    reason TEXT,
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.admin_audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON public.admin_audit_logs(target_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.admin_audit_logs(created_at DESC);

-- =============================================================================
-- 3. Profile Timestamp Trigger
-- =============================================================================
CREATE OR REPLACE FUNCTION public.fn_profiles_set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_profiles_set_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_set_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_profiles_set_updated_at();

-- 3.2 Profile Privileged Fields Defense-In-Depth Protection Trigger
CREATE OR REPLACE FUNCTION public.fn_protect_profile_privileged_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Direct changes to privileged fields are prohibited from standard updates
    IF OLD.role IS DISTINCT FROM NEW.role THEN
        RAISE EXCEPTION 'CANNOT_MODIFY_PRIVILEGED_FIELD: role can only be updated via admin RPC' USING ERRCODE = '42501';
    END IF;

    IF OLD.account_status IS DISTINCT FROM NEW.account_status THEN
        RAISE EXCEPTION 'CANNOT_MODIFY_PRIVILEGED_FIELD: account_status can only be updated via admin RPC or email verification' USING ERRCODE = '42501';
    END IF;

    IF OLD.email IS DISTINCT FROM NEW.email THEN
        RAISE EXCEPTION 'CANNOT_MODIFY_PRIVILEGED_FIELD: email can only be synced from auth.users' USING ERRCODE = '42501';
    END IF;

    IF OLD.onboarding_completed = TRUE AND (OLD.board_id IS DISTINCT FROM NEW.board_id OR OLD.grade_level IS DISTINCT FROM NEW.grade_level) THEN
        RAISE EXCEPTION 'CANNOT_MODIFY_PRIVILEGED_FIELD: board and grade can only be updated via admin RPC' USING ERRCODE = '42501';
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_protect_profile_privileged_fields ON public.profiles;
CREATE TRIGGER trg_protect_profile_privileged_fields
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    WHEN (pg_trigger_depth() = 0)
    EXECUTE FUNCTION public.fn_protect_profile_privileged_fields();

-- =============================================================================
-- 4. Explicit Revokes & Column-Level Grants
-- =============================================================================
REVOKE ALL ON TABLE public.profiles FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.profiles TO authenticated;
GRANT UPDATE (display_name, avatar_url, institution_name, location) ON TABLE public.profiles TO authenticated;

REVOKE ALL ON TABLE public.customer_administrators FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.customer_administrators TO authenticated;

REVOKE ALL ON TABLE public.user_subjects FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.user_subjects TO authenticated;

REVOKE ALL ON TABLE public.plans FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.plans TO anon, authenticated;

REVOKE ALL ON TABLE public.plan_entitlements FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.plan_entitlements TO anon, authenticated;

REVOKE ALL ON TABLE public.user_subscriptions FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.user_subscriptions TO authenticated;

REVOKE ALL ON TABLE public.admin_audit_logs FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.admin_audit_logs TO authenticated;

-- =============================================================================
-- 5. Private Schema Helper Functions (_brainoro_internal)
-- =============================================================================

-- Customer Admin Helper (Requires BOTH is_active = TRUE AND account_status = 'ACTIVE')
CREATE OR REPLACE FUNCTION _brainoro_internal.is_current_user_customer_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_uid UUID;
    v_is_admin BOOLEAN;
BEGIN
    v_uid := auth.uid();
    IF v_uid IS NULL THEN
        RETURN FALSE;
    END IF;

    SELECT EXISTS (
        SELECT 1
        FROM public.customer_administrators ca
        JOIN public.profiles p ON p.user_id = ca.user_id
        WHERE ca.user_id = v_uid
          AND ca.is_active = TRUE
          AND p.account_status = 'ACTIVE'
    ) INTO v_is_admin;

    RETURN coalesce(v_is_admin, FALSE);
END;
$$;

REVOKE EXECUTE ON FUNCTION _brainoro_internal.is_current_user_customer_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION _brainoro_internal.is_current_user_customer_admin() TO authenticated;

-- Super Admin Helper (Requires role = 'SUPER_ADMIN' AND account_status = 'ACTIVE')
CREATE OR REPLACE FUNCTION _brainoro_internal.is_current_user_super_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_uid UUID;
    v_is_super BOOLEAN;
BEGIN
    v_uid := auth.uid();
    IF v_uid IS NULL THEN
        RETURN FALSE;
    END IF;

    SELECT (role = 'SUPER_ADMIN' AND account_status = 'ACTIVE')
    INTO v_is_super
    FROM public.profiles
    WHERE user_id = v_uid;

    RETURN coalesce(v_is_super, FALSE);
END;
$$;

REVOKE EXECUTE ON FUNCTION _brainoro_internal.is_current_user_super_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION _brainoro_internal.is_current_user_super_admin() TO authenticated;

-- Learning Access Helper (Requires account_status = 'ACTIVE' AND onboarding_completed = TRUE)
CREATE OR REPLACE FUNCTION _brainoro_internal.can_access_learning()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_uid UUID;
    v_status TEXT;
    v_onboarding_completed BOOLEAN;
BEGIN
    v_uid := auth.uid();
    IF v_uid IS NULL THEN
        RETURN FALSE;
    END IF;

    SELECT account_status, onboarding_completed
    INTO v_status, v_onboarding_completed
    FROM public.profiles
    WHERE user_id = v_uid;

    IF v_status = 'ACTIVE' AND v_onboarding_completed = TRUE THEN
        RETURN TRUE;
    END IF;

    RETURN FALSE;
END;
$$;

REVOKE EXECUTE ON FUNCTION _brainoro_internal.can_access_learning() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION _brainoro_internal.can_access_learning() TO authenticated;

-- Controlled Initial Super Admin Bootstrap (Database Administrator only, NOT callable by anon/authenticated)
CREATE OR REPLACE FUNCTION _brainoro_internal.bootstrap_initial_super_admin(
    p_target_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    IF (SELECT count(*) FROM public.profiles WHERE role = 'SUPER_ADMIN') > 0 THEN
        RAISE EXCEPTION 'BOOTSTRAP_LOCKED: Super administrator already exists' USING ERRCODE = '42501';
    END IF;

    UPDATE public.profiles
    SET role = 'SUPER_ADMIN',
        updated_at = NOW()
    WHERE user_id = p_target_user_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'USER_NOT_FOUND: User ID % does not exist in profiles', p_target_user_id USING ERRCODE = 'P0002';
    END IF;

    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        new_value,
        reason
    ) VALUES (
        p_target_user_id,
        'BOOTSTRAP_INITIAL_SUPER_ADMIN',
        p_target_user_id,
        'profiles.role',
        jsonb_build_object('role', 'SUPER_ADMIN'),
        'Initial deployment bootstrap'
    );

    RETURN jsonb_build_object('success', TRUE, 'user_id', p_target_user_id);
END;
$$;

REVOKE ALL ON FUNCTION _brainoro_internal.bootstrap_initial_super_admin(UUID) FROM PUBLIC, anon, authenticated;

-- =============================================================================
-- 6. Row Level Security (RLS) Policies
-- =============================================================================

-- 6.1 Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Profiles select policy" ON public.profiles;
CREATE POLICY "Profiles select policy" ON public.profiles
FOR SELECT TO authenticated
USING (
    auth.uid() = user_id
    OR _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

DROP POLICY IF EXISTS "Profiles self update policy" ON public.profiles;
CREATE POLICY "Profiles self update policy" ON public.profiles
FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 6.2 Customer Administrators
ALTER TABLE public.customer_administrators ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Customer administrators select policy" ON public.customer_administrators;
CREATE POLICY "Customer administrators select policy" ON public.customer_administrators
FOR SELECT TO authenticated
USING (
    _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

-- 6.3 User Subjects
ALTER TABLE public.user_subjects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "User subjects select policy" ON public.user_subjects;
CREATE POLICY "User subjects select policy" ON public.user_subjects
FOR SELECT TO authenticated
USING (
    auth.uid() = user_id
    OR _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

-- 6.4 Plans
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Plans select policy" ON public.plans;
CREATE POLICY "Plans select policy" ON public.plans
FOR SELECT TO anon, authenticated
USING (
    is_active = TRUE
    OR _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

-- 6.5 Plan Entitlements
ALTER TABLE public.plan_entitlements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Plan entitlements select policy" ON public.plan_entitlements;
CREATE POLICY "Plan entitlements select policy" ON public.plan_entitlements
FOR SELECT TO anon, authenticated
USING (TRUE);

-- 6.6 User Subscriptions
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "User subscriptions select policy" ON public.user_subscriptions;
CREATE POLICY "User subscriptions select policy" ON public.user_subscriptions
FOR SELECT TO authenticated
USING (
    auth.uid() = user_id
    OR _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

-- 6.7 Admin Audit Logs
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin audit logs select policy" ON public.admin_audit_logs;
CREATE POLICY "Admin audit logs select policy" ON public.admin_audit_logs
FOR SELECT TO authenticated
USING (
    _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

-- 6.8 Content Modules (Fail-Closed Learning Gateway)
ALTER TABLE public.content_modules ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for content_modules" ON public.content_modules;
DROP POLICY IF EXISTS "Protected read access for content_modules" ON public.content_modules;
CREATE POLICY "Protected read access for content_modules" ON public.content_modules
FOR SELECT TO authenticated
USING (
    _brainoro_internal.can_access_learning()
    OR _brainoro_internal.is_current_user_customer_admin()
    OR _brainoro_internal.is_current_user_super_admin()
);

-- =============================================================================
-- 7. Public RPC Functions (SECURITY DEFINER, search_path = '')
-- =============================================================================

-- 7.1 First-Time Student Onboarding RPC
CREATE OR REPLACE FUNCTION public.complete_user_onboarding(
    p_board_id TEXT,
    p_grade_level INTEGER,
    p_subject_ids TEXT[],
    p_primary_subject_id TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_uid UUID;
    v_onboarding_completed BOOLEAN;
    v_status TEXT;
    v_valid_curriculum BOOLEAN;
    v_subject_id TEXT;
    v_subject_count INTEGER;
BEGIN
    v_uid := auth.uid();
    IF v_uid IS NULL THEN
        RAISE EXCEPTION 'UNAUTHORIZED: Authentication required' USING ERRCODE = '42501';
    END IF;

    -- 1. Lock profile row serialization anchor
    SELECT onboarding_completed, account_status
    INTO v_onboarding_completed, v_status
    FROM public.profiles
    WHERE user_id = v_uid
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PROFILE_NOT_FOUND: User profile does not exist' USING ERRCODE = 'P0002';
    END IF;

    -- 2. Verify account status
    IF v_status <> 'ACTIVE' THEN
        RAISE EXCEPTION 'FORBIDDEN: Account is not active (status: %)', v_status USING ERRCODE = '42501';
    END IF;

    -- 3. Enforce first-time-only invariant
    IF v_onboarding_completed = TRUE THEN
        RAISE EXCEPTION 'ONBOARDING_ALREADY_COMPLETED: Board and grade cannot be changed by user' USING ERRCODE = '23505';
    END IF;

    -- 4. Validate curriculum existence (boards and classes)
    SELECT EXISTS (
        SELECT 1
        FROM public.boards b
        JOIN public.classes c ON c.grade_level = p_grade_level
        WHERE b.id = p_board_id
    ) INTO v_valid_curriculum;

    IF NOT v_valid_curriculum THEN
        RAISE EXCEPTION 'INVALID_CURRICULUM: Board % Grade % does not exist in authoritative curriculum', p_board_id, p_grade_level USING ERRCODE = '23503';
    END IF;

    -- 5. Validate subject list
    IF p_subject_ids IS NULL OR cardinality(p_subject_ids) = 0 THEN
        RAISE EXCEPTION 'NO_SUBJECTS_SELECTED: At least one subject must be selected' USING ERRCODE = '22023';
    END IF;

    IF p_primary_subject_id IS NULL OR NOT (p_primary_subject_id = ANY(p_subject_ids)) THEN
        RAISE EXCEPTION 'INVALID_PRIMARY_SUBJECT: Primary subject must be one of the selected subjects' USING ERRCODE = '22023';
    END IF;

    SELECT count(DISTINCT subject_id)
    INTO v_subject_count
    FROM public.units
    WHERE board_id = p_board_id
      AND grade_level = p_grade_level
      AND subject_id = ANY(p_subject_ids);

    IF v_subject_count <> cardinality(p_subject_ids) THEN
        RAISE EXCEPTION 'INVALID_SUBJECT_SELECTION: One or more selected subjects are invalid for Board % Grade %', p_board_id, p_grade_level USING ERRCODE = '23503';
    END IF;

    -- 6. Clean up any stale subjects from previous incomplete attempts
    DELETE FROM public.user_subjects
    WHERE user_id = v_uid;

    -- 7. Insert exact validated onboarding subjects with primary subject flagged
    FOREACH v_subject_id IN ARRAY p_subject_ids LOOP
        INSERT INTO public.user_subjects (
            user_id,
            subject_id,
            board_id,
            grade_level,
            is_primary,
            enrolled_at
        ) VALUES (
            v_uid,
            v_subject_id,
            p_board_id,
            p_grade_level,
            (v_subject_id = p_primary_subject_id),
            NOW()
        );
    END LOOP;

    -- 8. Complete onboarding on profile
    UPDATE public.profiles
    SET board_id = p_board_id,
        grade_level = p_grade_level,
        onboarding_completed = TRUE,
        updated_at = NOW()
    WHERE user_id = v_uid;

    RETURN jsonb_build_object(
        'success', TRUE,
        'board_id', p_board_id,
        'grade_level', p_grade_level,
        'subjects', p_subject_ids,
        'primary_subject', p_primary_subject_id
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.complete_user_onboarding(TEXT, INTEGER, TEXT[], TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_user_onboarding(TEXT, INTEGER, TEXT[], TEXT) TO authenticated;

-- 7.2 Admin Update User Status RPC
CREATE OR REPLACE FUNCTION public.admin_update_user_status(
    p_target_user_id UUID,
    p_new_status TEXT,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_old_status TEXT;
    v_is_target_admin BOOLEAN;
    v_remaining_admins INTEGER;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    IF p_target_user_id = v_admin_id THEN
        RAISE EXCEPTION 'FORBIDDEN: Cannot modify own account status' USING ERRCODE = '42501';
    END IF;

    IF p_new_status NOT IN ('ACTIVE', 'SUSPENDED', 'DEACTIVATED') THEN
        RAISE EXCEPTION 'INVALID_STATUS: % is not a valid account status', p_new_status USING ERRCODE = '22023';
    END IF;

    -- Lock profile serialization anchor
    SELECT account_status
    INTO v_old_status
    FROM public.profiles
    WHERE user_id = p_target_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PROFILE_NOT_FOUND: Target user does not exist' USING ERRCODE = 'P0002';
    END IF;

    -- Peer admin check: customer admins cannot modify other administrators
    SELECT (EXISTS (SELECT 1 FROM public.customer_administrators WHERE user_id = p_target_user_id AND is_active = TRUE)
            OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = p_target_user_id AND role = 'SUPER_ADMIN'))
    INTO v_is_target_admin;

    IF v_is_target_admin AND NOT _brainoro_internal.is_current_user_super_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Customer administrators cannot modify other administrators' USING ERRCODE = '42501';
    END IF;

    -- Last active admin protection on deactivation
    IF v_is_target_admin AND p_new_status <> 'ACTIVE' THEN
        PERFORM pg_advisory_xact_lock(846001001);

        SELECT count(*)
        INTO v_remaining_admins
        FROM public.customer_administrators
        WHERE is_active = TRUE
          AND user_id <> p_target_user_id;

        IF v_remaining_admins = 0 THEN
            RAISE EXCEPTION 'CANNOT_DEACTIVATE_LAST_ADMIN: Cannot suspend or deactivate the last active customer administrator' USING ERRCODE = '23514';
        END IF;
    END IF;

    -- Mutate
    UPDATE public.profiles
    SET account_status = p_new_status,
        updated_at = NOW()
    WHERE user_id = p_target_user_id;

    -- Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        'UPDATE_USER_STATUS',
        p_target_user_id,
        'profiles.account_status',
        jsonb_build_object('account_status', v_old_status),
        jsonb_build_object('account_status', p_new_status),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'user_id', p_target_user_id, 'new_status', p_new_status);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_update_user_status(UUID, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_user_status(UUID, TEXT, TEXT) TO authenticated;

-- 7.3 Admin Update User Role RPC
CREATE OR REPLACE FUNCTION public.admin_update_user_role(
    p_target_user_id UUID,
    p_new_role TEXT,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_old_role TEXT;
    v_is_target_admin BOOLEAN;
    v_remaining_supers INTEGER;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    IF p_target_user_id = v_admin_id THEN
        RAISE EXCEPTION 'FORBIDDEN: Cannot modify own role' USING ERRCODE = '42501';
    END IF;

    IF p_new_role NOT IN ('STUDENT', 'EDUCATOR', 'SUPER_ADMIN') THEN
        RAISE EXCEPTION 'INVALID_ROLE: % is not a valid role', p_new_role USING ERRCODE = '22023';
    END IF;

    -- Only SUPER_ADMIN can assign SUPER_ADMIN
    IF p_new_role = 'SUPER_ADMIN' AND NOT _brainoro_internal.is_current_user_super_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Only SUPER_ADMIN can assign SUPER_ADMIN role' USING ERRCODE = '42501';
    END IF;

    -- Lock profile serialization anchor
    SELECT role
    INTO v_old_role
    FROM public.profiles
    WHERE user_id = p_target_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PROFILE_NOT_FOUND: Target user does not exist' USING ERRCODE = 'P0002';
    END IF;

    -- Last super admin demotion protection
    IF v_old_role = 'SUPER_ADMIN' AND p_new_role <> 'SUPER_ADMIN' THEN
        IF NOT _brainoro_internal.is_current_user_super_admin() THEN
            RAISE EXCEPTION 'FORBIDDEN: Only SUPER_ADMIN can demote a SUPER_ADMIN' USING ERRCODE = '42501';
        END IF;

        PERFORM pg_advisory_xact_lock(846001002);

        SELECT count(*)
        INTO v_remaining_supers
        FROM public.profiles
        WHERE role = 'SUPER_ADMIN'
          AND account_status = 'ACTIVE'
          AND user_id <> p_target_user_id;

        IF v_remaining_supers = 0 THEN
            RAISE EXCEPTION 'CANNOT_DEMOTE_LAST_SUPER_ADMIN: Cannot demote the last active super administrator' USING ERRCODE = '23514';
        END IF;
    END IF;

    -- Peer admin check
    SELECT (EXISTS (SELECT 1 FROM public.customer_administrators WHERE user_id = p_target_user_id AND is_active = TRUE)
            OR v_old_role = 'SUPER_ADMIN')
    INTO v_is_target_admin;

    IF v_is_target_admin AND NOT _brainoro_internal.is_current_user_super_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Customer administrators cannot modify other administrators' USING ERRCODE = '42501';
    END IF;

    -- Mutate
    UPDATE public.profiles
    SET role = p_new_role,
        updated_at = NOW()
    WHERE user_id = p_target_user_id;

    -- Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        'UPDATE_USER_ROLE',
        p_target_user_id,
        'profiles.role',
        jsonb_build_object('role', v_old_role),
        jsonb_build_object('role', p_new_role),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'user_id', p_target_user_id, 'new_role', p_new_role);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_update_user_role(UUID, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_user_role(UUID, TEXT, TEXT) TO authenticated;

-- 7.4 Admin Reassign User Board RPC (Modes A & B)
CREATE OR REPLACE FUNCTION public.admin_reassign_user_board(
    p_target_user_id UUID,
    p_new_board_id TEXT,
    p_new_grade_level INTEGER,
    p_new_subject_ids TEXT[],
    p_primary_subject_id TEXT,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_is_target_admin BOOLEAN;
    v_old_board TEXT;
    v_old_grade INTEGER;
    v_valid_curriculum BOOLEAN;
    v_subject_id TEXT;
    v_subject_count INTEGER;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    IF p_target_user_id = v_admin_id THEN
        RAISE EXCEPTION 'FORBIDDEN: Cannot reassign own board/grade' USING ERRCODE = '42501';
    END IF;

    -- 1. Lock profile serialization anchor
    SELECT board_id, grade_level
    INTO v_old_board, v_old_grade
    FROM public.profiles
    WHERE user_id = p_target_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PROFILE_NOT_FOUND: Target user does not exist' USING ERRCODE = 'P0002';
    END IF;

    -- Peer admin check
    SELECT (EXISTS (SELECT 1 FROM public.customer_administrators WHERE user_id = p_target_user_id AND is_active = TRUE)
            OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = p_target_user_id AND role = 'SUPER_ADMIN'))
    INTO v_is_target_admin;

    IF v_is_target_admin AND NOT _brainoro_internal.is_current_user_super_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Customer administrators cannot modify other administrators' USING ERRCODE = '42501';
    END IF;

    -- 2. Validate new curriculum BEFORE any deletion
    SELECT EXISTS (
        SELECT 1
        FROM public.boards b
        JOIN public.classes c ON c.grade_level = p_new_grade_level
        WHERE b.id = p_new_board_id
    ) INTO v_valid_curriculum;

    IF NOT v_valid_curriculum THEN
        RAISE EXCEPTION 'INVALID_CURRICULUM: Board % Grade % does not exist', p_new_board_id, p_new_grade_level USING ERRCODE = '23503';
    END IF;

    -- MODE B: Validate replacement subjects and primary subject BEFORE deletion
    IF p_new_subject_ids IS NOT NULL AND cardinality(p_new_subject_ids) > 0 THEN
        IF p_primary_subject_id IS NULL OR NOT (p_primary_subject_id = ANY(p_new_subject_ids)) THEN
            RAISE EXCEPTION 'INVALID_PRIMARY_SUBJECT: Primary subject must be one of the selected subjects' USING ERRCODE = '22023';
        END IF;

        SELECT count(DISTINCT subject_id)
        INTO v_subject_count
        FROM public.units
        WHERE board_id = p_new_board_id
          AND grade_level = p_new_grade_level
          AND subject_id = ANY(p_new_subject_ids);

        IF v_subject_count <> cardinality(p_new_subject_ids) THEN
            RAISE EXCEPTION 'INVALID_SUBJECT_SELECTION: Invalid subjects for new curriculum' USING ERRCODE = '23503';
        END IF;

        -- Safe to mutate
        DELETE FROM public.user_subjects WHERE user_id = p_target_user_id;

        FOREACH v_subject_id IN ARRAY p_new_subject_ids LOOP
            INSERT INTO public.user_subjects (user_id, subject_id, board_id, grade_level, is_primary, enrolled_at)
            VALUES (p_target_user_id, v_subject_id, p_new_board_id, p_new_grade_level, (v_subject_id = p_primary_subject_id), NOW());
        END LOOP;

        UPDATE public.profiles
        SET board_id = p_new_board_id,
            grade_level = p_new_grade_level,
            onboarding_completed = TRUE,
            updated_at = NOW()
        WHERE user_id = p_target_user_id;
    ELSE
        -- MODE A: Provisional reassignment; user must complete subject onboarding
        DELETE FROM public.user_subjects WHERE user_id = p_target_user_id;

        UPDATE public.profiles
        SET board_id = p_new_board_id,
            grade_level = p_new_grade_level,
            onboarding_completed = FALSE,
            updated_at = NOW()
        WHERE user_id = p_target_user_id;
    END IF;

    -- 3. Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        'REASSIGN_USER_BOARD',
        p_target_user_id,
        'profiles.board_grade',
        jsonb_build_object('board_id', v_old_board, 'grade_level', v_old_grade),
        jsonb_build_object('board_id', p_new_board_id, 'grade_level', p_new_grade_level, 'subjects', p_new_subject_ids, 'primary_subject', p_primary_subject_id),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'user_id', p_target_user_id, 'new_board_id', p_new_board_id, 'new_grade_level', p_new_grade_level);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_reassign_user_board(UUID, TEXT, INTEGER, TEXT[], TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reassign_user_board(UUID, TEXT, INTEGER, TEXT[], TEXT, TEXT) TO authenticated;

-- 7.5 Admin Grant Customer Admin RPC
CREATE OR REPLACE FUNCTION public.admin_grant_customer_admin(
    p_target_user_id UUID,
    p_notes TEXT,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_old_active BOOLEAN;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_super_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Only SUPER_ADMIN can grant customer administrator privileges' USING ERRCODE = '42501';
    END IF;

    -- Advisory lock to serialize membership set
    PERFORM pg_advisory_xact_lock(846001001);

    -- Lock target profile
    PERFORM 1
    FROM public.profiles
    WHERE user_id = p_target_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PROFILE_NOT_FOUND: Target user does not exist' USING ERRCODE = 'P0002';
    END IF;

    SELECT is_active
    INTO v_old_active
    FROM public.customer_administrators
    WHERE user_id = p_target_user_id
    FOR UPDATE;

    IF FOUND THEN
        UPDATE public.customer_administrators
        SET is_active = TRUE,
            assigned_by = v_admin_id,
            assigned_at = NOW(),
            notes = coalesce(p_notes, notes)
        WHERE user_id = p_target_user_id;
    ELSE
        INSERT INTO public.customer_administrators (user_id, assigned_by, assigned_at, is_active, notes)
        VALUES (p_target_user_id, v_admin_id, NOW(), TRUE, p_notes);
    END IF;

    -- Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        'GRANT_CUSTOMER_ADMIN',
        p_target_user_id,
        'customer_administrators',
        jsonb_build_object('is_active', v_old_active),
        jsonb_build_object('is_active', TRUE, 'assigned_by', v_admin_id, 'notes', p_notes),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'target_user_id', p_target_user_id, 'is_active', TRUE);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_grant_customer_admin(UUID, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_grant_customer_admin(UUID, TEXT, TEXT) TO authenticated;

-- 7.6 Admin Revoke Customer Admin RPC
CREATE OR REPLACE FUNCTION public.admin_revoke_customer_admin(
    p_target_user_id UUID,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_remaining_admins INTEGER;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_super_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Only SUPER_ADMIN can revoke customer administrator privileges' USING ERRCODE = '42501';
    END IF;

    -- Concurrency serialization: Advisory lock prevents concurrent drain to zero admins
    PERFORM pg_advisory_xact_lock(846001001);

    SELECT count(*)
    INTO v_remaining_admins
    FROM public.customer_administrators
    WHERE is_active = TRUE
      AND user_id <> p_target_user_id;

    IF v_remaining_admins = 0 THEN
        RAISE EXCEPTION 'CANNOT_REVOKE_LAST_ADMIN: Cannot revoke the last active customer administrator' USING ERRCODE = '23514';
    END IF;

    -- Lock target row
    PERFORM 1
    FROM public.customer_administrators
    WHERE user_id = p_target_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'ADMIN_NOT_FOUND: User is not a customer administrator' USING ERRCODE = 'P0002';
    END IF;

    UPDATE public.customer_administrators
    SET is_active = FALSE
    WHERE user_id = p_target_user_id;

    -- Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        'REVOKE_CUSTOMER_ADMIN',
        p_target_user_id,
        'customer_administrators',
        jsonb_build_object('is_active', TRUE),
        jsonb_build_object('is_active', FALSE),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'target_user_id', p_target_user_id, 'is_active', FALSE);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_revoke_customer_admin(UUID, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_revoke_customer_admin(UUID, TEXT) TO authenticated;

-- 7.7 Admin Create or Update Plan RPC
CREATE OR REPLACE FUNCTION public.admin_create_or_update_plan(
    p_plan_id TEXT,
    p_name TEXT,
    p_description TEXT,
    p_tier_level INTEGER,
    p_price NUMERIC,
    p_currency TEXT,
    p_billing_interval TEXT,
    p_is_active BOOLEAN,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_old_name TEXT;
    v_old_desc TEXT;
    v_old_tier INTEGER;
    v_old_price NUMERIC;
    v_old_currency TEXT;
    v_old_interval TEXT;
    v_old_active BOOLEAN;
    v_is_update BOOLEAN := FALSE;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    IF p_plan_id IS NULL OR length(trim(p_plan_id)) = 0 THEN
        RAISE EXCEPTION 'INVALID_PLAN_ID: Plan ID cannot be empty' USING ERRCODE = '22023';
    END IF;

    -- Advisory lock by plan ID prevents race conditions on concurrent create/update
    PERFORM pg_advisory_xact_lock(hashtext('plan:' || p_plan_id));

    SELECT name, description, tier_level, price, currency, billing_interval, is_active
    INTO v_old_name, v_old_desc, v_old_tier, v_old_price, v_old_currency, v_old_interval, v_old_active
    FROM public.plans
    WHERE plan_id = p_plan_id
    FOR UPDATE;

    IF FOUND THEN
        v_is_update := TRUE;
        UPDATE public.plans
        SET name = p_name,
            description = p_description,
            tier_level = p_tier_level,
            price = p_price,
            currency = p_currency,
            billing_interval = p_billing_interval,
            is_active = p_is_active,
            updated_at = NOW()
        WHERE plan_id = p_plan_id;
    ELSE
        INSERT INTO public.plans (plan_id, name, description, tier_level, price, currency, billing_interval, is_active, created_at, updated_at)
        VALUES (p_plan_id, p_name, p_description, p_tier_level, p_price, p_currency, p_billing_interval, p_is_active, NOW(), NOW());
    END IF;

    -- Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        CASE WHEN v_is_update THEN 'UPDATE_PLAN' ELSE 'CREATE_PLAN' END,
        NULL,
        'plans',
        CASE WHEN v_is_update THEN jsonb_build_object('name', v_old_name, 'description', v_old_desc, 'tier_level', v_old_tier, 'price', v_old_price, 'currency', v_old_currency, 'billing_interval', v_old_interval, 'is_active', v_old_active) ELSE NULL END,
        jsonb_build_object('plan_id', p_plan_id, 'name', p_name, 'description', p_description, 'tier_level', p_tier_level, 'price', p_price, 'currency', p_currency, 'billing_interval', p_billing_interval, 'is_active', p_is_active),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'plan_id', p_plan_id, 'is_update', v_is_update);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_create_or_update_plan(TEXT, TEXT, TEXT, INTEGER, NUMERIC, TEXT, TEXT, BOOLEAN, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_create_or_update_plan(TEXT, TEXT, TEXT, INTEGER, NUMERIC, TEXT, TEXT, BOOLEAN, TEXT) TO authenticated;

-- 7.8 Admin Update Plan Entitlement RPC
CREATE OR REPLACE FUNCTION public.admin_update_plan_entitlement(
    p_plan_id TEXT,
    p_feature_key TEXT,
    p_feature_value JSONB,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_old_value JSONB;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    PERFORM 1
    FROM public.plans
    WHERE plan_id = p_plan_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PLAN_NOT_FOUND: Plan % does not exist', p_plan_id USING ERRCODE = 'P0002';
    END IF;

    SELECT feature_value_json
    INTO v_old_value
    FROM public.plan_entitlements
    WHERE plan_id = p_plan_id
      AND feature_key = p_feature_key
    FOR UPDATE;

    INSERT INTO public.plan_entitlements (plan_id, feature_key, feature_value_json, created_at)
    VALUES (p_plan_id, p_feature_key, p_feature_value, NOW())
    ON CONFLICT (plan_id, feature_key) DO UPDATE
    SET feature_value_json = EXCLUDED.feature_value_json;

    -- Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        'UPDATE_PLAN_ENTITLEMENT',
        NULL,
        'plan_entitlements',
        jsonb_build_object('plan_id', p_plan_id, 'feature_key', p_feature_key, 'value', v_old_value),
        jsonb_build_object('plan_id', p_plan_id, 'feature_key', p_feature_key, 'value', p_feature_value),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'plan_id', p_plan_id, 'feature_key', p_feature_key);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_update_plan_entitlement(TEXT, TEXT, JSONB, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_update_plan_entitlement(TEXT, TEXT, JSONB, TEXT) TO authenticated;

-- 7.9 Admin Assign User Subscription RPC
CREATE OR REPLACE FUNCTION public.admin_assign_user_subscription(
    p_target_user_id UUID,
    p_plan_id TEXT,
    p_ends_at TIMESTAMPTZ,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_plan RECORD;
    v_active_sub_id UUID;
    v_new_sub_id UUID;
    v_billing_snapshot JSONB;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    -- 1. Lock profile row serialization anchor
    PERFORM 1
    FROM public.profiles
    WHERE user_id = p_target_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PROFILE_NOT_FOUND: Target user does not exist' USING ERRCODE = 'P0002';
    END IF;

    -- 2. Validate plan and capture snapshot
    SELECT plan_id, name, tier_level, price, currency, billing_interval, is_active
    INTO v_plan
    FROM public.plans
    WHERE plan_id = p_plan_id;

    IF v_plan.plan_id IS NULL OR v_plan.is_active = FALSE THEN
        RAISE EXCEPTION 'INVALID_PLAN: Plan % does not exist or is inactive', p_plan_id USING ERRCODE = '23503';
    END IF;

    v_billing_snapshot := jsonb_build_object(
        'plan_id', v_plan.plan_id,
        'plan_name', v_plan.name,
        'tier_level', v_plan.tier_level,
        'price', v_plan.price,
        'currency', v_plan.currency,
        'billing_interval', v_plan.billing_interval,
        'assigned_at', NOW()
    );

    -- 3. Lock and transition existing active subscription if present
    SELECT subscription_id
    INTO v_active_sub_id
    FROM public.user_subscriptions
    WHERE user_id = p_target_user_id
      AND status = 'ACTIVE'
    FOR UPDATE;

    IF v_active_sub_id IS NOT NULL THEN
        UPDATE public.user_subscriptions
        SET status = 'UPGRADED',
            updated_at = NOW()
        WHERE subscription_id = v_active_sub_id;
    END IF;

    -- 4. Create new active subscription
    INSERT INTO public.user_subscriptions (
        user_id,
        plan_id,
        status,
        starts_at,
        ends_at,
        assigned_by,
        billing_snapshot,
        created_at,
        updated_at
    ) VALUES (
        p_target_user_id,
        p_plan_id,
        'ACTIVE',
        NOW(),
        p_ends_at,
        v_admin_id,
        v_billing_snapshot,
        NOW(),
        NOW()
    ) RETURNING subscription_id INTO v_new_sub_id;

    -- 5. Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        'ASSIGN_SUBSCRIPTION',
        p_target_user_id,
        'user_subscriptions',
        jsonb_build_object('previous_subscription_id', v_active_sub_id),
        jsonb_build_object('subscription_id', v_new_sub_id, 'plan_id', p_plan_id, 'ends_at', p_ends_at, 'billing_snapshot', v_billing_snapshot),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'subscription_id', v_new_sub_id, 'plan_id', p_plan_id);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_assign_user_subscription(UUID, TEXT, TIMESTAMPTZ, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_assign_user_subscription(UUID, TEXT, TIMESTAMPTZ, TEXT) TO authenticated;

-- 7.10 Admin Cancel User Subscription RPC
CREATE OR REPLACE FUNCTION public.admin_cancel_user_subscription(
    p_target_user_id UUID,
    p_reason TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_admin_id UUID;
    v_active_sub_id UUID;
    v_plan_id TEXT;
BEGIN
    v_admin_id := auth.uid();
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    -- 1. Lock profile row serialization anchor
    PERFORM 1
    FROM public.profiles
    WHERE user_id = p_target_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'PROFILE_NOT_FOUND: Target user does not exist' USING ERRCODE = 'P0002';
    END IF;

    -- 2. Lock active subscription
    SELECT subscription_id, plan_id
    INTO v_active_sub_id, v_plan_id
    FROM public.user_subscriptions
    WHERE user_id = p_target_user_id
      AND status = 'ACTIVE'
    FOR UPDATE;

    IF v_active_sub_id IS NULL THEN
        RAISE EXCEPTION 'NO_ACTIVE_SUBSCRIPTION: User has no active subscription to cancel' USING ERRCODE = 'P0002';
    END IF;

    -- 3. Cancel
    UPDATE public.user_subscriptions
    SET status = 'CANCELLED',
        ends_at = NOW(),
        updated_at = NOW()
    WHERE subscription_id = v_active_sub_id;

    -- 4. Audit
    INSERT INTO public.admin_audit_logs (
        actor_id,
        action_type,
        target_user_id,
        target_resource,
        old_value,
        new_value,
        reason
    ) VALUES (
        v_admin_id,
        'CANCEL_SUBSCRIPTION',
        p_target_user_id,
        'user_subscriptions',
        jsonb_build_object('subscription_id', v_active_sub_id, 'plan_id', v_plan_id),
        jsonb_build_object('status', 'CANCELLED', 'cancelled_at', NOW()),
        p_reason
    );

    RETURN jsonb_build_object('success', TRUE, 'cancelled_subscription_id', v_active_sub_id);
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_cancel_user_subscription(UUID, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_cancel_user_subscription(UUID, TEXT) TO authenticated;

-- 7.11 Admin Get Customer Metrics RPC
CREATE OR REPLACE FUNCTION public.admin_get_customer_metrics()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_total_users BIGINT;
    v_active_users BIGINT;
    v_pending_users BIGINT;
    v_suspended_users BIGINT;
    v_deactivated_users BIGINT;
    v_onboarded_users BIGINT;
    v_pending_onboarding BIGINT;
    v_by_board JSONB;
    v_by_grade JSONB;
    v_by_primary_subject JSONB;
    v_by_institution JSONB;
    v_by_location JSONB;
    v_active_subscriptions JSONB;
    v_plan_distribution JSONB;
    v_recent_activity JSONB;
BEGIN
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    -- User Status Counts
    SELECT count(*) INTO v_total_users FROM public.profiles;
    SELECT count(*) INTO v_active_users FROM public.profiles WHERE account_status = 'ACTIVE';
    SELECT count(*) INTO v_pending_users FROM public.profiles WHERE account_status = 'PENDING_VERIFICATION';
    SELECT count(*) INTO v_suspended_users FROM public.profiles WHERE account_status = 'SUSPENDED';
    SELECT count(*) INTO v_deactivated_users FROM public.profiles WHERE account_status = 'DEACTIVATED';
    SELECT count(*) INTO v_onboarded_users FROM public.profiles WHERE onboarding_completed = TRUE;
    SELECT count(*) INTO v_pending_onboarding FROM public.profiles WHERE onboarding_completed = FALSE;

    -- Board Distribution
    SELECT jsonb_object_agg(coalesce(board_id, 'UNASSIGNED'), cnt)
    INTO v_by_board
    FROM (SELECT board_id, count(*) as cnt FROM public.profiles GROUP BY board_id) b;

    -- Grade Distribution
    SELECT jsonb_object_agg(coalesce(grade_level::text, 'UNASSIGNED'), cnt)
    INTO v_by_grade
    FROM (SELECT grade_level, count(*) as cnt FROM public.profiles GROUP BY grade_level) g;

    -- Primary Subject Distribution
    SELECT jsonb_object_agg(coalesce(subject_id, 'UNASSIGNED'), cnt)
    INTO v_by_primary_subject
    FROM (SELECT subject_id, count(*) as cnt FROM public.user_subjects WHERE is_primary = TRUE GROUP BY subject_id) s;

    -- Institution Distribution (Top 10)
    SELECT jsonb_object_agg(coalesce(institution_name, 'UNSPECIFIED'), cnt)
    INTO v_by_institution
    FROM (SELECT institution_name, count(*) as cnt FROM public.profiles WHERE institution_name IS NOT NULL GROUP BY institution_name ORDER BY cnt DESC LIMIT 10) i;

    -- Location Distribution (Top 10)
    SELECT jsonb_object_agg(coalesce(location, 'UNSPECIFIED'), cnt)
    INTO v_by_location
    FROM (SELECT location, count(*) as cnt FROM public.profiles WHERE location IS NOT NULL GROUP BY location ORDER BY cnt DESC LIMIT 10) l;

    -- Active Subscriptions by Plan
    SELECT jsonb_object_agg(plan_id, cnt)
    INTO v_active_subscriptions
    FROM (SELECT plan_id, count(*) as cnt FROM public.user_subscriptions WHERE status = 'ACTIVE' GROUP BY plan_id) sub;

    -- Subscription Status Breakdown
    SELECT jsonb_object_agg(status, cnt)
    INTO v_plan_distribution
    FROM (SELECT status, count(*) as cnt FROM public.user_subscriptions GROUP BY status) pst;

    -- Recent 10 Audit Log Entries
    SELECT jsonb_agg(row_to_json(r))
    INTO v_recent_activity
    FROM (
        SELECT audit_id, actor_id, action_type, target_user_id, target_resource, reason, created_at
        FROM public.admin_audit_logs
        ORDER BY created_at DESC
        LIMIT 10
    ) r;

    RETURN jsonb_build_object(
        'total_users', v_total_users,
        'active_users', v_active_users,
        'pending_verification_users', v_pending_users,
        'suspended_users', v_suspended_users,
        'deactivated_users', v_deactivated_users,
        'onboarded_users', v_onboarded_users,
        'pending_onboarding_users', v_pending_onboarding,
        'users_by_board', coalesce(v_by_board, '{}'::jsonb),
        'users_by_grade', coalesce(v_by_grade, '{}'::jsonb),
        'users_by_primary_subject', coalesce(v_by_primary_subject, '{}'::jsonb),
        'users_by_institution', coalesce(v_by_institution, '{}'::jsonb),
        'users_by_location', coalesce(v_by_location, '{}'::jsonb),
        'active_subscriptions_by_plan', coalesce(v_active_subscriptions, '{}'::jsonb),
        'subscriptions_by_status', coalesce(v_plan_distribution, '{}'::jsonb),
        'recent_admin_activity', coalesce(v_recent_activity, '[]'::jsonb)
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_get_customer_metrics() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_customer_metrics() TO authenticated;

-- 7.12 Admin Get Users List RPC (Paginated)
CREATE OR REPLACE FUNCTION public.admin_get_users_list(
    p_page INTEGER DEFAULT 1,
    p_limit INTEGER DEFAULT 20,
    p_search TEXT DEFAULT NULL,
    p_status TEXT DEFAULT NULL,
    p_role TEXT DEFAULT NULL,
    p_board_id TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_offset INTEGER;
    v_total BIGINT;
    v_users JSONB;
BEGIN
    IF NOT _brainoro_internal.is_current_user_customer_admin() THEN
        RAISE EXCEPTION 'FORBIDDEN: Caller is not a customer administrator' USING ERRCODE = '42501';
    END IF;

    p_limit := greatest(1, least(p_limit, 100));
    v_offset := (greatest(1, p_page) - 1) * p_limit;

    -- Total count with filtering
    SELECT count(*)
    INTO v_total
    FROM public.profiles p
    WHERE (p_status IS NULL OR p.account_status = p_status)
      AND (p_role IS NULL OR p.role = p_role)
      AND (p_board_id IS NULL OR p.board_id = p_board_id)
      AND (p_search IS NULL OR (
          p.email ILIKE '%' || p_search || '%' OR
          p.display_name ILIKE '%' || p_search || '%' OR
          p.institution_name ILIKE '%' || p_search || '%'
      ));

    -- Paginated rows with primary subject and active subscription
    SELECT jsonb_agg(row_to_json(u))
    INTO v_users
    FROM (
        SELECT 
            p.user_id,
            p.email,
            p.display_name,
            p.avatar_url,
            p.institution_name,
            p.location,
            p.role,
            p.account_status,
            p.board_id,
            p.grade_level,
            p.onboarding_completed,
            p.created_at,
            (SELECT subject_id FROM public.user_subjects s WHERE s.user_id = p.user_id AND s.is_primary = TRUE LIMIT 1) as primary_subject,
            (SELECT plan_id FROM public.user_subscriptions sub WHERE sub.user_id = p.user_id AND sub.status = 'ACTIVE' LIMIT 1) as active_plan_id,
            EXISTS (SELECT 1 FROM public.customer_administrators ca WHERE ca.user_id = p.user_id AND ca.is_active = TRUE) as is_customer_admin
        FROM public.profiles p
        WHERE (p_status IS NULL OR p.account_status = p_status)
          AND (p_role IS NULL OR p.role = p_role)
          AND (p_board_id IS NULL OR p.board_id = p_board_id)
          AND (p_search IS NULL OR (
              p.email ILIKE '%' || p_search || '%' OR
              p.display_name ILIKE '%' || p_search || '%' OR
              p.institution_name ILIKE '%' || p_search || '%'
          ))
        ORDER BY p.created_at DESC
        LIMIT p_limit OFFSET v_offset
    ) u;

    RETURN jsonb_build_object(
        'total', v_total,
        'page', p_page,
        'limit', p_limit,
        'users', coalesce(v_users, '[]'::jsonb)
    );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.admin_get_users_list(INTEGER, INTEGER, TEXT, TEXT, TEXT, TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_get_users_list(INTEGER, INTEGER, TEXT, TEXT, TEXT, TEXT) TO authenticated;

-- =============================================================================
-- 8. Auth Triggers on auth.users
-- =============================================================================

-- 8.1 Profile Creation Trigger
CREATE OR REPLACE FUNCTION public.fn_auth_handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_initial_status TEXT;
    v_display_name TEXT;
    v_avatar_url TEXT;
BEGIN
    IF NEW.id IS NULL OR NEW.email IS NULL THEN
        RAISE EXCEPTION 'INVALID_AUTH_PAYLOAD: User ID and Email are required' USING ERRCODE = '23502';
    END IF;

    IF NEW.email_confirmed_at IS NOT NULL THEN
        v_initial_status := 'ACTIVE';
    ELSE
        v_initial_status := 'PENDING_VERIFICATION';
    END IF;

    v_display_name := coalesce(
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'name',
        split_part(NEW.email, '@', 1)
    );
    v_avatar_url := NEW.raw_user_meta_data->>'avatar_url';

    INSERT INTO public.profiles (
        user_id,
        email,
        display_name,
        avatar_url,
        role,
        account_status,
        board_id,
        grade_level,
        onboarding_completed,
        created_at,
        updated_at
    ) VALUES (
        NEW.id,
        NEW.email,
        v_display_name,
        v_avatar_url,
        'STUDENT',
        v_initial_status,
        NULL,
        NULL,
        FALSE,
        NOW(),
        NOW()
    )
    ON CONFLICT (user_id) DO NOTHING;

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'AUTH_PROFILE_CREATION_FAILED: %', SQLERRM USING ERRCODE = SQLSTATE;
END;
$$;

DROP TRIGGER IF EXISTS trg_auth_handle_new_user ON auth.users;
CREATE TRIGGER trg_auth_handle_new_user
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_auth_handle_new_user();

-- 8.2 Email & Verification Sync Trigger
CREATE OR REPLACE FUNCTION public.fn_auth_sync_user_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    IF OLD.email IS DISTINCT FROM NEW.email THEN
        UPDATE public.profiles
        SET email = NEW.email,
            updated_at = NOW()
        WHERE user_id = NEW.id;
    END IF;

    IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
        UPDATE public.profiles
        SET account_status = 'ACTIVE',
            updated_at = NOW()
        WHERE user_id = NEW.id
          AND account_status = 'PENDING_VERIFICATION';
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_auth_sync_user_email ON auth.users;
CREATE TRIGGER trg_auth_sync_user_email
    AFTER UPDATE OF email, email_confirmed_at ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_auth_sync_user_email();

-- =============================================================================
-- 9. Existing Users Backfill
-- =============================================================================
INSERT INTO public.profiles (
    user_id,
    email,
    display_name,
    avatar_url,
    role,
    account_status,
    board_id,
    grade_level,
    onboarding_completed,
    created_at,
    updated_at
)
SELECT 
    u.id,
    u.email,
    coalesce(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
    u.raw_user_meta_data->>'avatar_url',
    'STUDENT',
    CASE WHEN u.email_confirmed_at IS NOT NULL THEN 'ACTIVE' ELSE 'PENDING_VERIFICATION' END,
    NULL,
    NULL,
    FALSE,
    NOW(),
    NOW()
FROM auth.users u
ON CONFLICT (user_id) DO NOTHING;

-- =============================================================================
-- 10. Seed Baseline Plans and Entitlements
-- =============================================================================
INSERT INTO public.plans (plan_id, name, description, tier_level, price, currency, billing_interval, is_active)
VALUES
    ('FREE', 'Free Starter', 'Full access to statutory curriculum catalog and introductory learning', 1, 0.00, 'INR', 'MONTHLY', TRUE),
    ('STANDARD', 'Standard Learner', 'Complete access to interactive Cornell notes, worked examples, and adaptive practice', 2, 499.00, 'INR', 'MONTHLY', TRUE),
    ('PREMIUM', 'Premium Cognitive Mastery', 'Unrestricted access to all psychometric engines, Leitner revision queues, and advanced diagnostic analytics', 3, 999.00, 'INR', 'MONTHLY', TRUE)
ON CONFLICT (plan_id) DO UPDATE
SET name = EXCLUDED.name,
    description = EXCLUDED.description,
    tier_level = EXCLUDED.tier_level,
    price = EXCLUDED.price,
    currency = EXCLUDED.currency,
    billing_interval = EXCLUDED.billing_interval,
    is_active = EXCLUDED.is_active;

INSERT INTO public.plan_entitlements (plan_id, feature_key, feature_value_json)
VALUES
    ('FREE', 'catalog_browsing', '{"enabled": true}'::jsonb),
    ('FREE', 'cornell_notes', '{"enabled": true, "max_per_day": 5}'::jsonb),
    ('FREE', 'adaptive_practice', '{"enabled": false}'::jsonb),
    ('FREE', 'spaced_repetition', '{"enabled": false}'::jsonb),

    ('STANDARD', 'catalog_browsing', '{"enabled": true}'::jsonb),
    ('STANDARD', 'cornell_notes', '{"enabled": true, "unlimited": true}'::jsonb),
    ('STANDARD', 'adaptive_practice', '{"enabled": true, "max_tests_per_day": 10}'::jsonb),
    ('STANDARD', 'spaced_repetition', '{"enabled": true, "max_cards": 100}'::jsonb),

    ('PREMIUM', 'catalog_browsing', '{"enabled": true}'::jsonb),
    ('PREMIUM', 'cornell_notes', '{"enabled": true, "unlimited": true}'::jsonb),
    ('PREMIUM', 'adaptive_practice', '{"enabled": true, "unlimited": true}'::jsonb),
    ('PREMIUM', 'spaced_repetition', '{"enabled": true, "unlimited": true}'::jsonb),
    ('PREMIUM', 'diagnostic_analytics', '{"enabled": true}'::jsonb)
ON CONFLICT (plan_id, feature_key) DO UPDATE
SET feature_value_json = EXCLUDED.feature_value_json;

COMMIT;
