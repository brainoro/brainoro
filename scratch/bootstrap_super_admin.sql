-- =============================================================================
-- Script: bootstrap_super_admin.sql
-- Target: Supabase Dashboard SQL Editor (Run as postgres/admin)
-- Description: Safely bootstraps brainorostudy@gmail.com as the initial SUPER_ADMIN
--              using the authoritative _brainoro_internal.bootstrap_initial_super_admin()
-- =============================================================================

DO $$
DECLARE
    v_user_id UUID;
    v_role TEXT;
    v_status TEXT;
    v_super_count INT;
BEGIN
    -- 1. Check if super admin already exists
    SELECT count(*) INTO v_super_count FROM public.profiles WHERE role = 'SUPER_ADMIN';
    IF v_super_count > 0 THEN
        RAISE NOTICE 'NOTICE: A SUPER_ADMIN already exists in public.profiles (count = %).', v_super_count;
    END IF;

    -- 2. Check if auth.users account exists for brainorostudy@gmail.com
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE lower(email) = lower('brainorostudy@gmail.com');

    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'USER_NOT_FOUND: Account brainorostudy@gmail.com does not exist in auth.users. Please create it in Supabase Dashboard -> Authentication -> Users -> Add User (with Auto Confirm enabled), then re-run this script.'
        USING ERRCODE = 'P0002';
    END IF;

    RAISE NOTICE 'USER_FOUND: Found auth.users record: %', v_user_id;

    -- 3. Confirm email if unconfirmed (bypasses rate-limited email delivery)
    UPDATE auth.users
    SET email_confirmed_at = coalesce(email_confirmed_at, NOW())
    WHERE id = v_user_id;

    -- 4. Ensure profile status is ACTIVE
    UPDATE public.profiles
    SET account_status = 'ACTIVE',
        updated_at = NOW()
    WHERE user_id = v_user_id;

    -- 5. Execute official Phase I bootstrap helper (if not already super admin)
    IF (SELECT role FROM public.profiles WHERE user_id = v_user_id) <> 'SUPER_ADMIN' THEN
        PERFORM _brainoro_internal.bootstrap_initial_super_admin(v_user_id);
    END IF;

    -- 6. Verification
    SELECT role, account_status INTO v_role, v_status
    FROM public.profiles
    WHERE user_id = v_user_id;

    RAISE NOTICE 'SUCCESS: User % is verified: role = %, account_status = %', v_user_id, v_role, v_status;
END $$;

-- 7. Verification Query (Run to see result table)
SELECT 
    u.id AS user_id,
    u.email,
    u.email_confirmed_at,
    p.role,
    p.account_status,
    p.onboarding_completed
FROM auth.users u
JOIN public.profiles p ON p.user_id = u.id
WHERE lower(u.email) = lower('brainorostudy@gmail.com');
