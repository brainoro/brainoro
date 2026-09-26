-- =============================================================================
-- Migration: 20260920000003_phase2c_mapping_cardinality_and_rls.sql
-- Description: Phase 2C Mapping Cardinality, Evidence Model & RLS Hardening
-- Rules:
--   1. Non-destructive: zero DROP TABLE, zero TRUNCATE, zero DELETE
--   2. Preserve 846 curriculum_concepts, 126 topics, 282 content_modules
--   3. Enable M:N mapping while protecting version and educational identity
--   4. Exclude synthetic sections from authoritative links
--   5. Secure RLS: public SELECT, authenticated curriculum_admin write
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1. Textbook Sections: Section Type Discriminator
-- -----------------------------------------------------------------------------
ALTER TABLE public.textbook_sections
    ADD COLUMN IF NOT EXISTS section_type TEXT NOT NULL DEFAULT 'LEGACY_SYNTHETIC'
        CHECK (section_type IN ('AUTHENTIC', 'LEGACY_SYNTHETIC'));

-- Ensure all existing 126 sections are explicitly classified as LEGACY_SYNTHETIC
UPDATE public.textbook_sections
SET section_type = 'LEGACY_SYNTHETIC'
WHERE section_type IS NULL OR section_type <> 'LEGACY_SYNTHETIC';

-- -----------------------------------------------------------------------------
-- 2. Authoritative Concepts: Title Architecture & Version Uniqueness
-- -----------------------------------------------------------------------------
ALTER TABLE public.authoritative_curriculum_concepts
    ADD COLUMN IF NOT EXISTS statutory_title TEXT,
    ADD COLUMN IF NOT EXISTS normalized_title TEXT;

-- Composite uniqueness for version integrity enforcement
ALTER TABLE public.authoritative_curriculum_concepts
    ADD CONSTRAINT uq_auth_concept_id_version UNIQUE (id, curriculum_version_id);

-- -----------------------------------------------------------------------------
-- 3. Concept Curriculum Mappings: Additive Columns
-- -----------------------------------------------------------------------------
ALTER TABLE public.concept_curriculum_mappings
    -- Curriculum disposition (nullable, no default that forces CURRENT on unclassified rows)
    ADD COLUMN IF NOT EXISTS curriculum_disposition TEXT
        CHECK (curriculum_disposition IS NULL OR curriculum_disposition IN ('CURRENT', 'REMOVED', 'MOVED', 'REPLACED', 'CURRENTLY_UNVERIFIED')),
    
    -- MOVED Relocation target fields
    ADD COLUMN IF NOT EXISTS target_grade_level INTEGER
        CHECK (target_grade_level IS NULL OR (target_grade_level >= 6 AND target_grade_level <= 12)),
    ADD COLUMN IF NOT EXISTS target_curriculum_version_id TEXT
        REFERENCES public.curriculum_versions(id) ON DELETE RESTRICT,
    ADD COLUMN IF NOT EXISTS target_authoritative_concept_id TEXT
        REFERENCES public.authoritative_curriculum_concepts(id) ON DELETE RESTRICT,

    -- Evidence & Audit Provenance fields
    ADD COLUMN IF NOT EXISTS verified_document_id TEXT
        REFERENCES public.curriculum_documents(id) ON DELETE RESTRICT,
    ADD COLUMN IF NOT EXISTS audit_evidence_url TEXT,
    ADD COLUMN IF NOT EXISTS audit_page_reference TEXT,
    ADD COLUMN IF NOT EXISTS source_locator TEXT,
    ADD COLUMN IF NOT EXISTS section_heading TEXT,
    ADD COLUMN IF NOT EXISTS evidence_excerpt TEXT;

-- -----------------------------------------------------------------------------
-- 4. Composite Foreign Key: Enforce Version Identity on Mappings
-- -----------------------------------------------------------------------------
ALTER TABLE public.concept_curriculum_mappings
    ADD CONSTRAINT fk_mapping_auth_version
    FOREIGN KEY (authoritative_concept_id, curriculum_version_id)
    REFERENCES public.authoritative_curriculum_concepts(id, curriculum_version_id)
    ON DELETE RESTRICT;

-- -----------------------------------------------------------------------------
-- 5. M:N Mapping Cardinality: Partial Unique Indexes
-- -----------------------------------------------------------------------------
-- Mapped concepts: (brainoro_concept_id, authoritative_concept_id, curriculum_version_id)
CREATE UNIQUE INDEX IF NOT EXISTS uq_concept_mapping_mapped_m_to_n
    ON public.concept_curriculum_mappings (brainoro_concept_id, authoritative_concept_id, curriculum_version_id)
    WHERE authoritative_concept_id IS NOT NULL;

-- Unmapped concepts: singleton per (brainoro_concept_id, curriculum_version_id)
CREATE UNIQUE INDEX IF NOT EXISTS uq_concept_mapping_unmapped_singleton
    ON public.concept_curriculum_mappings (brainoro_concept_id, curriculum_version_id)
    WHERE authoritative_concept_id IS NULL;

-- -----------------------------------------------------------------------------
-- 6. Controlled Constraint Replacement: Drop Old 1:1 Blocker
-- -----------------------------------------------------------------------------
ALTER TABLE public.concept_curriculum_mappings
    DROP CONSTRAINT IF EXISTS concept_curriculum_mappings_brainoro_concept_id_curricul_key;

-- -----------------------------------------------------------------------------
-- 7. Educational Identity Trigger on Concept Curriculum Mappings
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.fn_check_mapping_educational_identity()
RETURNS TRIGGER AS $$
DECLARE
    v_bc RECORD;
    v_ac RECORD;
BEGIN
    -- If authoritative_concept_id is NULL (UNMAPPED), skip cross-concept validation
    IF NEW.authoritative_concept_id IS NULL THEN
        -- If disposition is not MOVED, target fields must be NULL
        IF NEW.curriculum_disposition IS DISTINCT FROM 'MOVED' THEN
            IF NEW.target_grade_level IS NOT NULL OR NEW.target_curriculum_version_id IS NOT NULL OR NEW.target_authoritative_concept_id IS NOT NULL THEN
                RAISE EXCEPTION 'Target fields must be NULL when curriculum_disposition is not MOVED (concept %)', NEW.brainoro_concept_id;
            END IF;
        END IF;
        RETURN NEW;
    END IF;

    -- Fetch Brainoro Concept identity
    SELECT board_id, grade_level, subject_id
    INTO v_bc
    FROM public.curriculum_concepts
    WHERE id = NEW.brainoro_concept_id;

    -- Fetch Authoritative Concept identity
    SELECT board_id, grade_level, subject_id, curriculum_version_id
    INTO v_ac
    FROM public.authoritative_curriculum_concepts
    WHERE id = NEW.authoritative_concept_id;

    -- 1. Board Isolation (Strict: No cross-board mapping)
    IF v_bc.board_id <> v_ac.board_id THEN
        RAISE EXCEPTION 'Board mismatch: Brainoro concept (%) board % does not match authoritative concept (%) board %',
            NEW.brainoro_concept_id, v_bc.board_id, NEW.authoritative_concept_id, v_ac.board_id;
    END IF;

    -- 2. Exact Subject Identity (Strict: Exact subject equality is mandatory)
    IF v_bc.subject_id <> v_ac.subject_id THEN
        RAISE EXCEPTION 'Subject mismatch: Brainoro concept (%) subject % does not match authoritative concept (%) subject %',
            NEW.brainoro_concept_id, v_bc.subject_id, NEW.authoritative_concept_id, v_ac.subject_id;
    END IF;

    -- 3. Grade Level & MOVED Rules
    IF NEW.curriculum_disposition = 'MOVED' THEN
        -- Target grade level is required and must differ from origin grade
        IF NEW.target_grade_level IS NULL THEN
            RAISE EXCEPTION 'MOVED concept (%) requires target_grade_level', NEW.brainoro_concept_id;
        END IF;
        IF NEW.target_grade_level = v_bc.grade_level THEN
            RAISE EXCEPTION 'MOVED concept (%) target_grade_level (%) must differ from origin grade (%)',
                NEW.brainoro_concept_id, NEW.target_grade_level, v_bc.grade_level;
        END IF;
        -- Authoritative concept grade must match target_grade_level
        IF v_ac.grade_level <> NEW.target_grade_level THEN
            RAISE EXCEPTION 'MOVED concept (%) authoritative concept grade (%) does not match target_grade_level (%)',
                NEW.brainoro_concept_id, v_ac.grade_level, NEW.target_grade_level;
        END IF;
        -- If target_curriculum_version_id is specified, authoritative concept version must match
        IF NEW.target_curriculum_version_id IS NOT NULL AND v_ac.curriculum_version_id <> NEW.target_curriculum_version_id THEN
            RAISE EXCEPTION 'MOVED concept (%) authoritative concept version (%) does not match target_curriculum_version_id (%)',
                NEW.brainoro_concept_id, v_ac.curriculum_version_id, NEW.target_curriculum_version_id;
        END IF;
    ELSE
        -- Non-MOVED concepts: target fields must be NULL and grade must match origin identically
        IF NEW.target_grade_level IS NOT NULL OR NEW.target_curriculum_version_id IS NOT NULL OR NEW.target_authoritative_concept_id IS NOT NULL THEN
            RAISE EXCEPTION 'Target fields must be NULL when curriculum_disposition is not MOVED (concept %)', NEW.brainoro_concept_id;
        END IF;
        IF v_bc.grade_level <> v_ac.grade_level THEN
            RAISE EXCEPTION 'Grade mismatch: Brainoro concept (%) grade % does not match authoritative concept (%) grade %',
                NEW.brainoro_concept_id, v_bc.grade_level, NEW.authoritative_concept_id, v_ac.grade_level;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_mapping_educational_identity ON public.concept_curriculum_mappings;
CREATE TRIGGER trg_check_mapping_educational_identity
    BEFORE INSERT OR UPDATE ON public.concept_curriculum_mappings
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_check_mapping_educational_identity();

-- -----------------------------------------------------------------------------
-- 8. Section Integrity Trigger on Authoritative Curriculum Concepts
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.fn_enforce_authoritative_section_integrity()
RETURNS TRIGGER AS $$
DECLARE
    v_sec RECORD;
    v_tb  RECORD;
BEGIN
    IF NEW.section_id IS NOT NULL THEN
        -- 1. Fetch section and verify section_type
        SELECT textbook_id, chapter_id, section_type
        INTO v_sec
        FROM public.textbook_sections
        WHERE id = NEW.section_id;

        IF v_sec.section_type <> 'AUTHENTIC' THEN
            RAISE EXCEPTION 'Authoritative concept (%) cannot link to non-authentic section (%). Section type is %',
                NEW.id, NEW.section_id, v_sec.section_type;
        END IF;

        -- 2. Verify chapter and textbook alignment
        IF v_sec.chapter_id <> NEW.chapter_id OR v_sec.textbook_id <> NEW.textbook_id THEN
            RAISE EXCEPTION 'Section hierarchy mismatch: Section % belongs to chapter % / textbook %, but concept specifies chapter % / textbook %',
                NEW.section_id, v_sec.chapter_id, v_sec.textbook_id, NEW.chapter_id, NEW.textbook_id;
        END IF;

        -- 3. Verify textbook educational identity
        SELECT board_id, grade_level, subject_id, curriculum_version_id
        INTO v_tb
        FROM public.textbooks
        WHERE id = NEW.textbook_id;

        IF v_tb.board_id <> NEW.board_id OR v_tb.grade_level <> NEW.grade_level 
           OR v_tb.subject_id <> NEW.subject_id OR v_tb.curriculum_version_id <> NEW.curriculum_version_id THEN
            RAISE EXCEPTION 'Educational identity mismatch between textbook (%) and authoritative concept (%)',
                NEW.textbook_id, NEW.id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_authoritative_section_integrity ON public.authoritative_curriculum_concepts;
CREATE TRIGGER trg_enforce_authoritative_section_integrity
    BEFORE INSERT OR UPDATE ON public.authoritative_curriculum_concepts
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_enforce_authoritative_section_integrity();

-- -----------------------------------------------------------------------------
-- 9. Curriculum Administrators Table & RLS Hardening
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_administrators (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.curriculum_administrators ENABLE ROW LEVEL SECURITY;

-- Administrators table: Only authenticated users can view admin status, write is denied to non-service-role
DROP POLICY IF EXISTS "Curriculum administrators read access" ON public.curriculum_administrators;
CREATE POLICY "Curriculum administrators read access" 
    ON public.curriculum_administrators FOR SELECT TO authenticated USING (true);

-- Harden RLS on all 10 curriculum & authoritative tables
DO $$
DECLARE
    t TEXT;
    tbls TEXT[] := ARRAY[
        'curriculum_sources',
        'curriculum_documents',
        'curriculum_versions',
        'academic_years',
        'textbooks',
        'textbook_chapters',
        'textbook_sections',
        'authoritative_curriculum_concepts',
        'concept_curriculum_mappings',
        'curriculum_validation_results'
    ];
BEGIN
    FOREACH t IN ARRAY tbls LOOP
        -- Enable RLS
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);

        -- Drop legacy permissive policies
        EXECUTE format('DROP POLICY IF EXISTS "Public read %I" ON public.%I;', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "Admin write %I" ON public.%I;', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "Allow all for %I" ON public.%I;', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "Enable all access for all users" ON public.%I;', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "Public Read Access" ON public.%I;', t, t);
        EXECUTE format('DROP POLICY IF EXISTS "Curriculum Admin Write Access" ON public.%I;', t, t);

        -- Create Public SELECT policy (Students, Public, Authenticated)
        EXECUTE format(
            'CREATE POLICY "Public Read Access" ON public.%I FOR SELECT TO anon, authenticated USING (true);',
            t
        );

        -- Create Curriculum Admin Write policy (Controlled write, service_role bypasses RLS)
        EXECUTE format(
            'CREATE POLICY "Curriculum Admin Write Access" ON public.%I FOR ALL TO authenticated ' ||
            'USING (EXISTS (SELECT 1 FROM public.curriculum_administrators WHERE user_id = auth.uid())) ' ||
            'WITH CHECK (EXISTS (SELECT 1 FROM public.curriculum_administrators WHERE user_id = auth.uid()));',
            t
        );
    END LOOP;
END $$;

COMMIT;
