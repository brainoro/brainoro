-- =============================================================================
-- Migration: 20260920000004_textbook_sections_provenance.sql
-- Description: Textbook Sections Provenance, Hierarchy Alignment & Trigger Repair
-- Rules:
--   1. Non-destructive: zero DROP TABLE, zero TRUNCATE, zero DELETE
--   2. Preserve 846 curriculum_concepts, 126 topics, 282 content_modules
--   3. Backfill textbook_id on existing 126 synthetic sections (preserving LEGACY_SYNTHETIC)
--   4. Strengthen section integrity trigger: fail-closed, exact subject identity
--   5. Establish canonical provenance columns for authentic section ingestion
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1. Additive Provenance & Hierarchy Columns to textbook_sections
-- -----------------------------------------------------------------------------
ALTER TABLE public.textbook_sections
    ADD COLUMN IF NOT EXISTS textbook_id TEXT
        REFERENCES public.textbooks(id) ON DELETE RESTRICT,
    ADD COLUMN IF NOT EXISTS source_document_id TEXT
        REFERENCES public.curriculum_documents(id) ON DELETE RESTRICT,
    ADD COLUMN IF NOT EXISTS source_url TEXT,
    ADD COLUMN IF NOT EXISTS source_page TEXT,
    ADD COLUMN IF NOT EXISTS source_locator TEXT,
    ADD COLUMN IF NOT EXISTS evidence_excerpt TEXT;

-- -----------------------------------------------------------------------------
-- 2. Safe Deterministic Backfill of textbook_id for Existing Synthetic Sections
-- -----------------------------------------------------------------------------
-- Updates textbook_id only; preserves section_type = 'LEGACY_SYNTHETIC'
-- Leaves provenance fields NULL; does not touch chapter_id, section_number, section_title
UPDATE public.textbook_sections s
SET textbook_id = c.textbook_id
FROM public.textbook_chapters c
WHERE s.chapter_id = c.id
  AND s.textbook_id IS NULL;

-- Enforce NOT NULL on textbook_id
ALTER TABLE public.textbook_sections
    ALTER COLUMN textbook_id SET NOT NULL;

-- -----------------------------------------------------------------------------
-- 3. Composite Uniqueness & Foreign Keys for Strict Hierarchy Alignment
-- -----------------------------------------------------------------------------
-- Composite uniqueness on chapters: (id, textbook_id)
ALTER TABLE public.textbook_chapters
    ADD CONSTRAINT uq_chapter_textbook UNIQUE (id, textbook_id);

-- Enforce that a section's chapter belongs to the same textbook
ALTER TABLE public.textbook_sections
    ADD CONSTRAINT fk_section_chapter_textbook
    FOREIGN KEY (chapter_id, textbook_id)
    REFERENCES public.textbook_chapters(id, textbook_id)
    ON DELETE RESTRICT;

-- Composite uniqueness on sections: (id, chapter_id, textbook_id)
ALTER TABLE public.textbook_sections
    ADD CONSTRAINT uq_section_chapter_textbook UNIQUE (id, chapter_id, textbook_id);

-- -----------------------------------------------------------------------------
-- 4. Strengthen Section-Integrity Trigger Function (Fail-Closed, Exact Identity)
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.fn_enforce_authoritative_section_integrity()
RETURNS TRIGGER AS $$
DECLARE
    v_sec RECORD;
    v_ch  RECORD;
    v_tb  RECORD;
BEGIN
    -- If section_id IS NULL, section linkage is not attempted; allow insert/update
    IF NEW.section_id IS NULL THEN
        RETURN NEW;
    END IF;

    -- 1. Fetch section and verify existence and section_type
    SELECT id, textbook_id, chapter_id, section_type
    INTO v_sec
    FROM public.textbook_sections
    WHERE id = NEW.section_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Referenced section (%) does not exist for authoritative concept (%)',
            NEW.section_id, NEW.id;
    END IF;

    IF v_sec.section_type IS NULL OR v_sec.section_type <> 'AUTHENTIC' THEN
        RAISE EXCEPTION 'Authoritative concept (%) cannot link to non-authentic section (%). Section type is %',
            NEW.id, NEW.section_id, COALESCE(v_sec.section_type, 'NULL');
    END IF;

    -- 2. Validate section's chapter and textbook references
    IF v_sec.chapter_id IS NULL OR v_sec.textbook_id IS NULL THEN
        RAISE EXCEPTION 'Section (%) has invalid NULL hierarchy (chapter_id: %, textbook_id: %)',
            NEW.section_id, v_sec.chapter_id, v_sec.textbook_id;
    END IF;

    -- 3. Independently resolve chapter and verify it belongs to the section's textbook
    SELECT id, textbook_id
    INTO v_ch
    FROM public.textbook_chapters
    WHERE id = v_sec.chapter_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Section (%) references nonexistent chapter (%)',
            NEW.section_id, v_sec.chapter_id;
    END IF;

    IF v_ch.textbook_id <> v_sec.textbook_id THEN
        RAISE EXCEPTION 'Hierarchy mismatch: Section (%) textbook (%) does not match chapter (%) textbook (%)',
            NEW.section_id, v_sec.textbook_id, v_sec.chapter_id, v_ch.textbook_id;
    END IF;

    -- 4. If authoritative concept specifies chapter_id or textbook_id, verify they match actual section hierarchy
    IF NEW.chapter_id IS NOT NULL AND NEW.chapter_id <> v_sec.chapter_id THEN
        RAISE EXCEPTION 'Concept chapter (%) does not match section chapter (%)',
            NEW.chapter_id, v_sec.chapter_id;
    END IF;

    IF NEW.textbook_id IS NOT NULL AND NEW.textbook_id <> v_sec.textbook_id THEN
        RAISE EXCEPTION 'Concept textbook (%) does not match section textbook (%)',
            NEW.textbook_id, v_sec.textbook_id;
    END IF;

    -- 5. Independently resolve textbook and verify complete educational identity
    SELECT id, board_id, grade_level, subject_id, curriculum_version_id
    INTO v_tb
    FROM public.textbooks
    WHERE id = v_sec.textbook_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Section (%) references nonexistent textbook (%)',
            NEW.section_id, v_sec.textbook_id;
    END IF;

    -- 6. Strict educational identity comparison (fail closed on any NULL or mismatch)
    IF v_tb.board_id IS NULL OR v_tb.grade_level IS NULL OR v_tb.subject_id IS NULL OR v_tb.curriculum_version_id IS NULL THEN
        RAISE EXCEPTION 'Textbook (%) has incomplete educational identity metadata', v_sec.textbook_id;
    END IF;

    IF v_tb.board_id <> NEW.board_id THEN
        RAISE EXCEPTION 'Board mismatch: Concept board (%) does not match textbook board (%)',
            NEW.board_id, v_tb.board_id;
    END IF;

    IF v_tb.grade_level <> NEW.grade_level THEN
        RAISE EXCEPTION 'Grade mismatch: Concept grade (%) does not match textbook grade (%)',
            NEW.grade_level, v_tb.grade_level;
    END IF;

    -- EXACT SUBJECT EQUALITY: No SCIENCE <-> PHYSICS/CHEMISTRY/BIOLOGY interchangeability
    IF v_tb.subject_id <> NEW.subject_id THEN
        RAISE EXCEPTION 'Subject mismatch: Concept subject (%) does not match textbook subject (%)',
            NEW.subject_id, v_tb.subject_id;
    END IF;

    IF v_tb.curriculum_version_id <> NEW.curriculum_version_id THEN
        RAISE EXCEPTION 'Curriculum version mismatch: Concept version (%) does not match textbook version (%)',
            NEW.curriculum_version_id, v_tb.curriculum_version_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_authoritative_section_integrity ON public.authoritative_curriculum_concepts;
CREATE TRIGGER trg_enforce_authoritative_section_integrity
    BEFORE INSERT OR UPDATE ON public.authoritative_curriculum_concepts
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_enforce_authoritative_section_integrity();

COMMIT;
