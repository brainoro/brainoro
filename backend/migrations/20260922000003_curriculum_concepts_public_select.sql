-- =============================================================================
-- Migration: 20260922000003_curriculum_concepts_public_select.sql
-- Description: Ensure public read access on curriculum_concepts table for
--              Universal Cheat Sheet resilience and concept resolution.
-- =============================================================================

BEGIN;

-- 1. Ensure RLS is enabled on curriculum_concepts
ALTER TABLE IF EXISTS public.curriculum_concepts ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing restrictive / redundant read policies if present
DROP POLICY IF EXISTS "Public read curriculum_concepts" ON public.curriculum_concepts;
DROP POLICY IF EXISTS "Allow public read access to curriculum_concepts" ON public.curriculum_concepts;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.curriculum_concepts;

-- 3. Create permissive public read policy for SELECT
CREATE POLICY "Allow public read access to curriculum_concepts"
ON public.curriculum_concepts
FOR SELECT
USING (true);

COMMIT;
