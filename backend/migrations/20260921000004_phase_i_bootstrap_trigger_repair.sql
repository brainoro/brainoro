-- =============================================================================
-- Migration: 20260921000004_phase_i_bootstrap_trigger_repair.sql
-- Description: Minimal Phase I Bootstrap Trigger Conflict Repair:
--   1. Authorizes internal initial super admin bootstrap via explicit transaction-local
--      context ('brainoro.internal_bootstrap_active') in _brainoro_internal.bootstrap_initial_super_admin.
--   2. Updates public.fn_protect_profile_privileged_fields() to permit the role update
--      strictly when internal bootstrap is active AND zero super admins currently exist.
--   3. Sets account_status = 'ACTIVE' alongside role = 'SUPER_ADMIN' during bootstrap
--      to fulfill the dual authorization invariant (_brainoro_internal.is_current_user_super_admin).
--   4. Preserves all column-level update grants, RLS, audit logs, and trigger protections.
-- =============================================================================

BEGIN;

-- 1. Update Defense-in-Depth Trigger Function with Explicit Bootstrap Authorization
CREATE OR REPLACE FUNCTION public.fn_protect_profile_privileged_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_is_bootstrap BOOLEAN := FALSE;
BEGIN
    -- Check if authoritative internal bootstrap is active in current transaction
    BEGIN
        v_is_bootstrap := (current_setting('brainoro.internal_bootstrap_active', true) = 'true');
    EXCEPTION
        WHEN OTHERS THEN
            v_is_bootstrap := FALSE;
    END;

    -- If legitimate internal bootstrap is running AND zero super admins exist, allow bootstrap
    IF v_is_bootstrap THEN
        IF (SELECT count(*) FROM public.profiles WHERE role = 'SUPER_ADMIN') = 0 THEN
            RETURN NEW;
        ELSE
            RAISE EXCEPTION 'BOOTSTRAP_LOCKED: Super administrator already exists' USING ERRCODE = '42501';
        END IF;
    END IF;

    -- Direct changes to privileged fields remain strictly prohibited from standard updates
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

-- 2. Update Bootstrap Helper to Set Explicit Transaction Context & Ensure ACTIVE Status
CREATE OR REPLACE FUNCTION _brainoro_internal.bootstrap_initial_super_admin(
    p_target_user_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- Single-use guard: only allow if zero super admins currently exist
    IF (SELECT count(*) FROM public.profiles WHERE role = 'SUPER_ADMIN') > 0 THEN
        RAISE EXCEPTION 'BOOTSTRAP_LOCKED: Super administrator already exists' USING ERRCODE = '42501';
    END IF;

    -- Set explicit transaction-local context authorizing bootstrap
    PERFORM set_config('brainoro.internal_bootstrap_active', 'true', true);

    -- Perform role and account_status update
    UPDATE public.profiles
    SET role = 'SUPER_ADMIN',
        account_status = 'ACTIVE',
        updated_at = NOW()
    WHERE user_id = p_target_user_id;

    -- Reset authorization context immediately
    PERFORM set_config('brainoro.internal_bootstrap_active', 'false', true);

    IF NOT FOUND THEN
        RAISE EXCEPTION 'USER_NOT_FOUND: User ID % does not exist in profiles', p_target_user_id USING ERRCODE = 'P0002';
    END IF;

    -- Immutable audit log
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
        jsonb_build_object('role', 'SUPER_ADMIN', 'account_status', 'ACTIVE'),
        'Initial deployment bootstrap'
    );

    RETURN jsonb_build_object(
        'success', TRUE,
        'user_id', p_target_user_id,
        'role', 'SUPER_ADMIN',
        'account_status', 'ACTIVE'
    );
END;
$$;

-- 3. Ensure permissions remain locked down (Database owner only)
REVOKE ALL ON FUNCTION _brainoro_internal.bootstrap_initial_super_admin(UUID) FROM PUBLIC, anon, authenticated;

COMMIT;
