-- =============================================================================
-- Migration: 20260920000006_ganita_prakash_ch2_alignment.sql
-- Description: Phase E (authoritative_concept_sections M:N junction & DB trigger)
--              + Phase F (CBSE Class VI Ganita Prakash Chapter 2 Authoritative Ingestion)
--              + Fail-Closed Deterministic Backfill of source_page for G10 Authentic Sections
--
-- Authoritative Target:
--   - Deterministic backfill of source_page for 41 existing G10 AUTHENTIC sections
--   - Universal fail-closed AUTHENTIC provenance constraint (BTRIM non-whitespace)
--   - Creation of public.authoritative_concept_sections (M:N junction)
--   - Fail-closed identity trigger fn_enforce_authoritative_concept_section_identity()
--   - Registration of DOC-NCERT-TB-G6-MATH-2024
--   - Ingestion of exactly 11 AUTHENTIC NCERT Class 6 Mathematics sections (Ch 2)
--   - Ingestion of exactly 11 Authoritative Curriculum Concepts (section_id = NULL)
--   - Ingestion of exactly 18 M:N concept-section mappings (Reflex = SOURCE_EXPLICIT)
--
-- Safety & Fail-Closed Rules:
--   1. Non-destructive: zero DROP TABLE, zero TRUNCATE, zero DELETE of existing data.
--   2. Strict foreign keys with ON DELETE RESTRICT.
--   3. No ON CONFLICT DO NOTHING.
--   4. Preserve all 126 LEGACY_SYNTHETIC sections 100% untouched.
--   5. Preserve all 846 curriculum_concepts 100% untouched.
--   6. Preserve all 17 existing authoritative concepts 100% untouched.
--   7. Expected post-migration totals:
--      - textbook_sections: 178 (52 AUTHENTIC + 126 LEGACY_SYNTHETIC)
--      - authoritative_curriculum_concepts: 28 (17 existing + 11 new)
--      - authoritative_concept_sections: 18 mappings
--      - curriculum_concepts: 846
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1. Fail-Closed Pre-Execution Validation
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    v_tb RECORD;
    v_ch RECORD;
    v_legacy_count INTEGER;
    v_auth_count INTEGER;
    v_auth_concepts_count INTEGER;
    v_curr_concepts_count INTEGER;
    v_g10_extract_count INTEGER;
BEGIN
    -- 1.1 Validate textbook TB-NCERT-G6-MATH-2024 existence and educational attributes
    SELECT * INTO v_tb FROM public.textbooks WHERE id = 'TB-NCERT-G6-MATH-2024';
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Fail-closed: Textbook TB-NCERT-G6-MATH-2024 does not exist';
    END IF;

    IF v_tb.board_id <> 'CBSE' THEN
        RAISE EXCEPTION 'Fail-closed: Expected board CBSE, found %', v_tb.board_id;
    END IF;

    IF v_tb.grade_level <> 6 THEN
        RAISE EXCEPTION 'Fail-closed: Expected grade 6, found %', v_tb.grade_level;
    END IF;

    IF v_tb.subject_id <> 'MATH' THEN
        RAISE EXCEPTION 'Fail-closed: Expected subject MATH, found %', v_tb.subject_id;
    END IF;

    IF v_tb.curriculum_version_id <> 'CBSE-NCERT-2024-NCF-SE' THEN
        RAISE EXCEPTION 'Fail-closed: Expected curriculum_version CBSE-NCERT-2024-NCF-SE, found %', v_tb.curriculum_version_id;
    END IF;

    -- 1.2 Validate Chapter CH-NCERT-G6-MATH-2024-02
    SELECT * INTO v_ch FROM public.textbook_chapters WHERE id = 'CH-NCERT-G6-MATH-2024-02';
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Fail-closed: Chapter CH-NCERT-G6-MATH-2024-02 does not exist';
    END IF;

    IF v_ch.textbook_id <> 'TB-NCERT-G6-MATH-2024' THEN
        RAISE EXCEPTION 'Fail-closed: Chapter textbook_id mismatch: expected TB-NCERT-G6-MATH-2024, found %', v_ch.textbook_id;
    END IF;

    IF v_ch.chapter_number <> 2 THEN
        RAISE EXCEPTION 'Fail-closed: Chapter number mismatch: expected 2, found %', v_ch.chapter_number;
    END IF;

    IF v_ch.chapter_title <> 'Lines and Angles' THEN
        RAISE EXCEPTION 'Fail-closed: Chapter title mismatch: expected Lines and Angles, found %', v_ch.chapter_title;
    END IF;

    -- 1.3 Validate curriculum source and version
    IF NOT EXISTS (SELECT 1 FROM public.curriculum_sources WHERE id = 'SRC-NCERT-OFFICIAL') THEN
        RAISE EXCEPTION 'Fail-closed: Curriculum source SRC-NCERT-OFFICIAL does not exist';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.curriculum_versions WHERE id = 'CBSE-NCERT-2024-NCF-SE') THEN
        RAISE EXCEPTION 'Fail-closed: Curriculum version CBSE-NCERT-2024-NCF-SE does not exist';
    END IF;

    -- 1.4 Validate baseline section counts (exactly 126 LEGACY_SYNTHETIC, exactly 41 AUTHENTIC)
    SELECT COUNT(*) INTO v_legacy_count FROM public.textbook_sections WHERE section_type = 'LEGACY_SYNTHETIC';
    IF v_legacy_count <> 126 THEN
        RAISE EXCEPTION 'Fail-closed: Expected exactly 126 LEGACY_SYNTHETIC sections, found %', v_legacy_count;
    END IF;

    SELECT COUNT(*) INTO v_auth_count FROM public.textbook_sections WHERE section_type = 'AUTHENTIC';
    IF v_auth_count <> 41 THEN
        RAISE EXCEPTION 'Fail-closed: Expected exactly 41 AUTHENTIC sections, found %', v_auth_count;
    END IF;

    -- 1.5 Validate deterministic page extractability for all 41 existing G10 authentic rows
    SELECT COUNT(*) INTO v_g10_extract_count
    FROM public.textbook_sections
    WHERE section_type = 'AUTHENTIC'
      AND id LIKE 'SEC-NCERT-G10-MATH-%'
      AND source_locator ~ 'p\.\s*[0-9]+';

    IF v_g10_extract_count <> 41 THEN
        RAISE EXCEPTION 'Fail-closed: Expected 41 G10 authentic sections with deterministic page locator, found %', v_g10_extract_count;
    END IF;

    -- 1.6 Validate baseline concept counts
    SELECT COUNT(*) INTO v_auth_concepts_count FROM public.authoritative_curriculum_concepts;
    IF v_auth_concepts_count <> 17 THEN
        RAISE EXCEPTION 'Fail-closed: Expected exactly 17 authoritative concepts, found %', v_auth_concepts_count;
    END IF;

    SELECT COUNT(*) INTO v_curr_concepts_count FROM public.curriculum_concepts;
    IF v_curr_concepts_count <> 846 THEN
        RAISE EXCEPTION 'Fail-closed: Expected exactly 846 curriculum_concepts, found %', v_curr_concepts_count;
    END IF;

    -- 1.7 Validate target document does not already exist
    IF EXISTS (SELECT 1 FROM public.curriculum_documents WHERE id = 'DOC-NCERT-TB-G6-MATH-2024') THEN
        RAISE EXCEPTION 'Fail-closed: Document DOC-NCERT-TB-G6-MATH-2024 already exists';
    END IF;

    -- 1.8 Validate target section IDs do not already exist
    IF EXISTS (SELECT 1 FROM public.textbook_sections WHERE id LIKE 'SEC-NCERT-G6-MATH-2024-02-%') THEN
        RAISE EXCEPTION 'Fail-closed: Sections matching SEC-NCERT-G6-MATH-2024-02-%% already exist';
    END IF;

    -- 1.9 Validate target concept IDs do not already exist
    IF EXISTS (SELECT 1 FROM public.authoritative_curriculum_concepts WHERE id LIKE 'AUTH-CBSE-G6-MATH-CH02-%') THEN
        RAISE EXCEPTION 'Fail-closed: Concepts matching AUTH-CBSE-G6-MATH-CH02-%% already exist';
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 2. Fail-Closed Deterministic Backfill of source_page for G10 Authentic Sections
-- -----------------------------------------------------------------------------
-- Derives source_page strictly from existing source_locator (e.g. 'jemh101.pdf § 1.1, p. 1' -> '1')
UPDATE public.textbook_sections
SET source_page = SUBSTRING(source_locator FROM 'p\.\s*([0-9]+)')
WHERE section_type = 'AUTHENTIC'
  AND id LIKE 'SEC-NCERT-G10-MATH-%';

-- Post-Backfill Assertions
DO $$
DECLARE
    v_backfilled_count INTEGER;
    v_synthetic_modified INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_backfilled_count
    FROM public.textbook_sections
    WHERE section_type = 'AUTHENTIC'
      AND id LIKE 'SEC-NCERT-G10-MATH-%'
      AND NULLIF(BTRIM(source_page), '') IS NOT NULL;

    IF v_backfilled_count <> 41 THEN
        RAISE EXCEPTION 'Fail-closed: Expected 41 G10 rows with verified non-empty source_page, found %', v_backfilled_count;
    END IF;

    SELECT COUNT(*) INTO v_synthetic_modified
    FROM public.textbook_sections
    WHERE section_type = 'LEGACY_SYNTHETIC' AND source_page IS NOT NULL;

    IF v_synthetic_modified <> 0 THEN
        RAISE EXCEPTION 'Fail-closed: Corrupted state - % LEGACY_SYNTHETIC rows modified', v_synthetic_modified;
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 3. Universal Fail-Closed Provenance CHECK Constraint on textbook_sections
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chk_authentic_section_provenance'
    ) THEN
        ALTER TABLE public.textbook_sections
            ADD CONSTRAINT chk_authentic_section_provenance
            CHECK (
                section_type <> 'AUTHENTIC' OR (
                    NULLIF(BTRIM(source_document_id), '') IS NOT NULL AND
                    NULLIF(BTRIM(source_url), '') IS NOT NULL AND
                    NULLIF(BTRIM(source_page), '') IS NOT NULL AND
                    NULLIF(BTRIM(source_locator), '') IS NOT NULL
                )
            );
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 4. Phase E: Create authoritative_concept_sections Table & Indexes
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.authoritative_concept_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    authoritative_concept_id TEXT NOT NULL REFERENCES public.authoritative_curriculum_concepts(id) ON DELETE RESTRICT,
    section_id TEXT NOT NULL REFERENCES public.textbook_sections(id) ON DELETE RESTRICT,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN ('PRIMARY', 'SUPPORTING', 'PREREQUISITE', 'APPLICATION')),
    mapping_basis TEXT NOT NULL CHECK (mapping_basis IN ('SOURCE_EXPLICIT', 'PEDAGOGICAL_SYNTHESIS', 'PREREQUISITE_ALIGNMENT')),
    evidence TEXT NOT NULL CHECK (NULLIF(BTRIM(evidence), '') IS NOT NULL),
    display_order INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (authoritative_concept_id, section_id)
);

CREATE INDEX IF NOT EXISTS idx_auth_concept_sections_concept
    ON public.authoritative_concept_sections (authoritative_concept_id);

CREATE INDEX IF NOT EXISTS idx_auth_concept_sections_section
    ON public.authoritative_concept_sections (section_id);

-- Enable RLS & Policies
ALTER TABLE public.authoritative_concept_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read authoritative_concept_sections" ON public.authoritative_concept_sections;
CREATE POLICY "Public read authoritative_concept_sections"
    ON public.authoritative_concept_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write authoritative_concept_sections" ON public.authoritative_concept_sections;
CREATE POLICY "Admin write authoritative_concept_sections"
    ON public.authoritative_concept_sections FOR ALL USING (true) WITH CHECK (true);

-- -----------------------------------------------------------------------------
-- 5. Phase E: Fail-Closed Educational Identity Trigger
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.fn_enforce_authoritative_concept_section_identity()
RETURNS TRIGGER AS $$
DECLARE
    v_concept RECORD;
    v_section RECORD;
    v_textbook RECORD;
BEGIN
    -- 1. Resolve authoritative concept
    SELECT id, board_id, grade_level, subject_id, curriculum_version_id
    INTO v_concept
    FROM public.authoritative_curriculum_concepts
    WHERE id = NEW.authoritative_concept_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Referenced authoritative concept (%) does not exist', NEW.authoritative_concept_id;
    END IF;

    -- 2. Resolve textbook section
    SELECT id, textbook_id, chapter_id, section_type
    INTO v_section
    FROM public.textbook_sections
    WHERE id = NEW.section_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Referenced section (%) does not exist', NEW.section_id;
    END IF;

    IF v_section.section_type <> 'AUTHENTIC' THEN
        RAISE EXCEPTION 'Authoritative concept (%) cannot link to non-authentic section (%). Section type is %',
            NEW.authoritative_concept_id, NEW.section_id, COALESCE(v_section.section_type, 'NULL');
    END IF;

    -- 3. Resolve textbook
    SELECT id, board_id, grade_level, subject_id, curriculum_version_id
    INTO v_textbook
    FROM public.textbooks
    WHERE id = v_section.textbook_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Section (%) references nonexistent textbook (%)', NEW.section_id, v_section.textbook_id;
    END IF;

    -- 4. Enforce exact educational identity match (board, grade, subject, version)
    IF v_concept.board_id <> v_textbook.board_id THEN
        RAISE EXCEPTION 'Board mismatch: Concept board (%) does not match textbook board (%)',
            v_concept.board_id, v_textbook.board_id;
    END IF;

    IF v_concept.grade_level <> v_textbook.grade_level THEN
        RAISE EXCEPTION 'Grade mismatch: Concept grade (%) does not match textbook grade (%)',
            v_concept.grade_level, v_textbook.grade_level;
    END IF;

    IF v_concept.subject_id <> v_textbook.subject_id THEN
        RAISE EXCEPTION 'Subject mismatch: Concept subject (%) does not match textbook subject (%)',
            v_concept.subject_id, v_textbook.subject_id;
    END IF;

    IF v_concept.curriculum_version_id <> v_textbook.curriculum_version_id THEN
        RAISE EXCEPTION 'Curriculum version mismatch: Concept version (%) does not match textbook version (%)',
            v_concept.curriculum_version_id, v_textbook.curriculum_version_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_enforce_auth_concept_section_identity ON public.authoritative_concept_sections;
CREATE TRIGGER trg_enforce_auth_concept_section_identity
    BEFORE INSERT OR UPDATE ON public.authoritative_concept_sections
    FOR EACH ROW
    EXECUTE FUNCTION public.fn_enforce_authoritative_concept_section_identity();

-- -----------------------------------------------------------------------------
-- 6. Phase F: Register Official NCERT Textbook Document Provenance Record
-- -----------------------------------------------------------------------------
INSERT INTO public.curriculum_documents (
    id,
    curriculum_version_id,
    source_id,
    document_title,
    document_identifier,
    document_url,
    publication_date
) VALUES (
    'DOC-NCERT-TB-G6-MATH-2024',
    'CBSE-NCERT-2024-NCF-SE',
    'SRC-NCERT-OFFICIAL',
    'Ganita Prakash — Mathematics for Class 6 (NCERT Edition 2026-27)',
    'NCERT/TB/G6/MATH/fegp1',
    'https://ncert.nic.in/textbook/pdf/fegp102.pdf',
    NULL
);

-- -----------------------------------------------------------------------------
-- 7. Phase F: Ingest Exactly 11 AUTHENTIC NCERT Class 6 Chapter 2 Sections
-- -----------------------------------------------------------------------------
INSERT INTO public.textbook_sections (
    id, chapter_id, section_number, section_title, section_type, textbook_id,
    source_document_id, source_url, source_page, source_locator, evidence_excerpt
) VALUES
('SEC-NCERT-G6-MATH-2024-02-01', 'CH-NCERT-G6-MATH-2024-02', '2.1', 'Point', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '13', 'fegp102.pdf § 2.1, p. 13', 'Section 2.1: A point determines a precise location, but it has no length, breadth or height.'),
('SEC-NCERT-G6-MATH-2024-02-02', 'CH-NCERT-G6-MATH-2024-02', '2.2', 'Line Segment', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '14', 'fegp102.pdf § 2.2, p. 14', 'Section 2.2: The shortest path from Point A to Point B is called the line segment AB.'),
('SEC-NCERT-G6-MATH-2024-02-03', 'CH-NCERT-G6-MATH-2024-02', '2.3', 'Line', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '14', 'fegp102.pdf § 2.3, p. 14', 'Section 2.3: A line segment extended endlessly in both directions gives an idea of a line.'),
('SEC-NCERT-G6-MATH-2024-02-04', 'CH-NCERT-G6-MATH-2024-02', '2.4', 'Ray', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '15', 'fegp102.pdf § 2.4, p. 15', 'Section 2.4: A ray is a portion of a line. It starts at one point and goes endlessly in a direction.'),
('SEC-NCERT-G6-MATH-2024-02-05', 'CH-NCERT-G6-MATH-2024-02', '2.5', 'Angle', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '17', 'fegp102.pdf § 2.5, p. 17', 'Section 2.5: An angle is made up of two rays starting from a common starting point called vertex.'),
('SEC-NCERT-G6-MATH-2024-02-06', 'CH-NCERT-G6-MATH-2024-02', '2.6', 'Comparing Angles', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '21', 'fegp102.pdf § 2.6, p. 21', 'Section 2.6: Methods for comparing the opening of two angles directly and by tracing.'),
('SEC-NCERT-G6-MATH-2024-02-07', 'CH-NCERT-G6-MATH-2024-02', '2.7', 'Making Rotating Arms', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '25', 'fegp102.pdf § 2.7, p. 25', 'Section 2.7: Understanding angles through rotation of arms and amount of turn.'),
('SEC-NCERT-G6-MATH-2024-02-08', 'CH-NCERT-G6-MATH-2024-02', '2.8', 'Special Types of Angles', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '27', 'fegp102.pdf § 2.8, p. 27', 'Section 2.8: Identifying right angles (quarter turn) and straight angles (half turn).'),
('SEC-NCERT-G6-MATH-2024-02-09', 'CH-NCERT-G6-MATH-2024-02', '2.9', 'Measuring Angles', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '32', 'fegp102.pdf § 2.9, p. 32', 'Section 2.9: Measuring angle magnitude in degrees using a protractor.'),
('SEC-NCERT-G6-MATH-2024-02-10', 'CH-NCERT-G6-MATH-2024-02', '2.10', 'Drawing Angles', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '46', 'fegp102.pdf § 2.10, p. 46', 'Section 2.10: Constructing angles of given degree measures using ruler and protractor.'),
('SEC-NCERT-G6-MATH-2024-02-11', 'CH-NCERT-G6-MATH-2024-02', '2.11', 'Types of Angles and their Measures', 'AUTHENTIC', 'TB-NCERT-G6-MATH-2024',
 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '50', 'fegp102.pdf § 2.11, p. 50', 'Section 2.11: Classifying acute, right, obtuse, straight, and reflex angles.');

-- -----------------------------------------------------------------------------
-- 8. Phase F: Ingest Exactly 11 Authoritative Curriculum Concepts (section_id = NULL)
-- -----------------------------------------------------------------------------
-- Ensure metadata column exists on authoritative_curriculum_concepts
ALTER TABLE public.authoritative_curriculum_concepts
    ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;

INSERT INTO public.authoritative_curriculum_concepts (
    id, curriculum_version_id, board_id, grade_level, subject_id,
    textbook_id, chapter_id, section_id, official_concept_code,
    official_title, statutory_title, normalized_title, official_description,
    source_id, source_document_id, source_url, source_page,
    verification_status, evidence, metadata
) VALUES
('AUTH-CBSE-G6-MATH-CH02-POINT', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Point', 'Point', 'Point',
 'A point determines a precise location in space having no length, breadth, or thickness; represented by a dot and named with a capital letter.',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '13',
 'VERIFIED', 'Official statutory Section 2.1 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 13.',
 '{"display_title": "Point"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-LINE-SEGMENT', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Line Segment', 'Line Segment', 'Line Segment',
 'The shortest path connecting two distinct points; has a definite measurable length and two endpoints.',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '14',
 'VERIFIED', 'Official statutory Section 2.2 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 14.',
 '{"display_title": "Line Segment"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-LINE', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Line', 'Line', 'Line',
 'A straight path extending indefinitely in both opposite directions without endpoints; has infinite length and no thickness.',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '14',
 'VERIFIED', 'Official statutory Section 2.3 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 14.',
 '{"display_title": "Line"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-RAY', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Ray', 'Ray', 'Ray',
 'A portion of a line having a fixed initial starting point (origin/endpoint) and extending endlessly in one direction.',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '15',
 'VERIFIED', 'Official statutory Section 2.4 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 15.',
 '{"display_title": "Ray"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-ANGLE', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Angle', 'Angle', 'Angle',
 'A geometric figure formed by two rays sharing a common initial point (vertex); the rays are the arms of the angle.',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '17',
 'VERIFIED', 'Official statutory Section 2.5 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 17.',
 '{"display_title": "Angle"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-COMPARING-ANGLES', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Comparing Angles', 'Comparing Angles', 'Comparing Angles',
 'Determining the relative magnitude of angle openings by direct visual inspection, tracing, and superposition without arbitrary guessing.',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '21',
 'VERIFIED', 'Official statutory Section 2.6 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 21.',
 '{"display_title": "Comparing Angles"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-ROTATING-ARMS', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Making Rotating Arms', 'Making Rotating Arms', 'Rotating Arms & Angle as Turn',
 'Conceptualizing an angle as an amount of turn or rotation of a ray about a fixed vertex using rotating arm models.',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '25',
 'VERIFIED', 'Official statutory Section 2.7 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 25.',
 '{"display_title": "Rotating Arms & Angle as Turn"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-RIGHT-STRAIGHT-ANGLES', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Special Types of Angles', 'Special Types of Angles', 'Right & Straight Angles',
 'Fundamental benchmark angles defined by turns: right angle (quarter turn = 90°) and straight angle (half turn = 180°).',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '27',
 'VERIFIED', 'Official statutory Section 2.8 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 27.',
 '{"display_title": "Right & Straight Angles"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-MEASURING-ANGLES', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Measuring Angles', 'Measuring Angles', 'Measuring Angles',
 'Quantifying angle opening using standard units (degrees) and protractor alignment (baseline and center mark).',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '32',
 'VERIFIED', 'Official statutory Section 2.9 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 32.',
 '{"display_title": "Measuring Angles"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-DRAWING-ANGLES', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Drawing Angles', 'Drawing Angles', 'Drawing Angles',
 'Constructing precise angle openings of specified degree measures using a ruler and protractor.',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '46',
 'VERIFIED', 'Official statutory Section 2.10 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 46.',
 '{"display_title": "Drawing Angles"}'::jsonb),

('AUTH-CBSE-G6-MATH-CH02-ANGLE-CLASSIFICATION', 'CBSE-NCERT-2024-NCF-SE', 'CBSE', 6, 'MATH',
 'TB-NCERT-G6-MATH-2024', 'CH-NCERT-G6-MATH-2024-02', NULL, NULL,
 'Types of Angles and their Measures', 'Types of Angles and their Measures', 'Types of Angles & Their Measures',
 'Statutory classification of angles by degree measure: acute (0° < θ < 90°), right (θ = 90°), obtuse (90° < θ < 180°), straight (θ = 180°), and reflex (180° < θ < 360°), alongside turn benchmarks (quarter turn = 90°, half turn = 180°, full turn = 360°).',
 'SRC-NCERT-OFFICIAL', 'DOC-NCERT-TB-G6-MATH-2024', 'https://ncert.nic.in/textbook/pdf/fegp102.pdf', '50',
 'VERIFIED', 'Official statutory Section 2.11 in NCERT Ganita Prakash (Class 6 Mathematics, Reprint 2026-27), p. 50.',
 '{"display_title": "Types of Angles & Their Measures"}'::jsonb);

-- -----------------------------------------------------------------------------
-- 9. Phase F: Ingest Exactly 18 M:N Concept-Section Mappings
-- -----------------------------------------------------------------------------
INSERT INTO public.authoritative_concept_sections (
    authoritative_concept_id, section_id, relationship_type, mapping_basis, evidence, display_order
) VALUES
-- 1. Point -> 2.1 Point (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-POINT', 'SEC-NCERT-G6-MATH-2024-02-01', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.1 "Point" introduces point concept and naming conventions in Ganita Prakash, p. 13.', 1),

-- 2. Line Segment -> 2.2 Line Segment (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-LINE-SEGMENT', 'SEC-NCERT-G6-MATH-2024-02-02', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.2 "Line Segment" defines shortest path between two points and segment notation in Ganita Prakash, p. 14.', 1),

-- 3. Line Segment -> 2.3 Line (SUPPORTING, PEDAGOGICAL_SYNTHESIS)
('AUTH-CBSE-G6-MATH-CH02-LINE-SEGMENT', 'SEC-NCERT-G6-MATH-2024-02-03', 'SUPPORTING', 'PEDAGOGICAL_SYNTHESIS',
 'Brainoro pedagogical derivation: Section 2.3 "Line" is introduced by extending a line segment endlessly in both directions.', 2),

-- 4. Line -> 2.3 Line (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-LINE', 'SEC-NCERT-G6-MATH-2024-02-03', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.3 "Line" defines bidirectional infinite extension and line notation in Ganita Prakash, p. 14.', 1),

-- 5. Ray -> 2.4 Ray (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-RAY', 'SEC-NCERT-G6-MATH-2024-02-04', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.4 "Ray" defines single-endpoint unidirectional line portion in Ganita Prakash, p. 15.', 1),

-- 6. Ray -> 2.5 Angle (SUPPORTING, PEDAGOGICAL_SYNTHESIS)
('AUTH-CBSE-G6-MATH-CH02-RAY', 'SEC-NCERT-G6-MATH-2024-02-05', 'SUPPORTING', 'PEDAGOGICAL_SYNTHESIS',
 'Brainoro pedagogical derivation: Section 2.5 "Angle" formally constructs angle arms as two rays sharing a common vertex.', 2),

-- 7. Angle -> 2.5 Angle (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-ANGLE', 'SEC-NCERT-G6-MATH-2024-02-05', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.5 "Angle" defines angle anatomy, vertex, arms, and angle notation in Ganita Prakash, p. 17.', 1),

-- 8. Angle -> 2.6 Comparing Angles (SUPPORTING, PEDAGOGICAL_SYNTHESIS)
('AUTH-CBSE-G6-MATH-CH02-ANGLE', 'SEC-NCERT-G6-MATH-2024-02-06', 'SUPPORTING', 'PEDAGOGICAL_SYNTHESIS',
 'Brainoro pedagogical derivation: Section 2.6 "Comparing Angles" applies the angle arm opening concept to establish relative magnitude.', 2),

-- 9. Comparing Angles -> 2.6 Comparing Angles (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-COMPARING-ANGLES', 'SEC-NCERT-G6-MATH-2024-02-06', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.6 "Comparing Angles" covers visual and tracing comparison methods in Ganita Prakash, p. 21.', 1),

-- 10. Rotating Arms -> 2.7 Making Rotating Arms (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-ROTATING-ARMS', 'SEC-NCERT-G6-MATH-2024-02-07', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.7 "Making Rotating Arms" develops dynamic angle-as-turn intuition in Ganita Prakash, p. 25.', 1),

-- 11. Rotating Arms -> 2.8 Special Types of Angles (SUPPORTING, PEDAGOGICAL_SYNTHESIS)
('AUTH-CBSE-G6-MATH-CH02-ROTATING-ARMS', 'SEC-NCERT-G6-MATH-2024-02-08', 'SUPPORTING', 'PEDAGOGICAL_SYNTHESIS',
 'Brainoro pedagogical derivation: Section 2.8 defines quarter turns (right angle) and half turns (straight angle) using rotating arms.', 2),

-- 12. Right & Straight Angles -> 2.8 Special Types of Angles (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-RIGHT-STRAIGHT-ANGLES', 'SEC-NCERT-G6-MATH-2024-02-08', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.8 "Special Types of Angles" establishes right and straight benchmark angles in Ganita Prakash, p. 27.', 1),

-- 13. Right & Straight Angles -> 2.11 Types of Angles and their Measures (SUPPORTING, PEDAGOGICAL_SYNTHESIS)
('AUTH-CBSE-G6-MATH-CH02-RIGHT-STRAIGHT-ANGLES', 'SEC-NCERT-G6-MATH-2024-02-11', 'SUPPORTING', 'PEDAGOGICAL_SYNTHESIS',
 'Brainoro pedagogical derivation: Section 2.11 uses 90° right angle and 180° straight angle as statutory boundary benchmarks for angle classification.', 2),

-- 14. Measuring Angles -> 2.9 Measuring Angles (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-MEASURING-ANGLES', 'SEC-NCERT-G6-MATH-2024-02-09', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.9 "Measuring Angles" introduces degree units and protractor measurement in Ganita Prakash, p. 32.', 1),

-- 15. Measuring Angles -> 2.10 Drawing Angles (SUPPORTING, PEDAGOGICAL_SYNTHESIS)
('AUTH-CBSE-G6-MATH-CH02-MEASURING-ANGLES', 'SEC-NCERT-G6-MATH-2024-02-10', 'SUPPORTING', 'PEDAGOGICAL_SYNTHESIS',
 'Brainoro pedagogical derivation: Section 2.10 requires protractor alignment and degree reading skills to construct angles.', 2),

-- 16. Drawing Angles -> 2.10 Drawing Angles (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-DRAWING-ANGLES', 'SEC-NCERT-G6-MATH-2024-02-10', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.10 "Drawing Angles" establishes ruler and protractor construction methods in Ganita Prakash, p. 46.', 1),

-- 17. Angle Classification -> 2.11 Types of Angles and their Measures (PRIMARY, SOURCE_EXPLICIT)
('AUTH-CBSE-G6-MATH-CH02-ANGLE-CLASSIFICATION', 'SEC-NCERT-G6-MATH-2024-02-11', 'PRIMARY', 'SOURCE_EXPLICIT',
 'Direct statutory alignment: Section 2.11 "Types of Angles and their Measures" explicitly classifies acute, right, obtuse, straight, and reflex angles in Ganita Prakash, p. 50.', 1),

-- 18. Angle Classification -> 2.8 Special Types of Angles (SUPPORTING, PEDAGOGICAL_SYNTHESIS)
('AUTH-CBSE-G6-MATH-CH02-ANGLE-CLASSIFICATION', 'SEC-NCERT-G6-MATH-2024-02-08', 'SUPPORTING', 'PEDAGOGICAL_SYNTHESIS',
 'Brainoro pedagogical derivation: Section 2.11 formalizes into a complete degree-based classification the intuitive right and straight angles introduced in Section 2.8.', 2);

-- -----------------------------------------------------------------------------
-- 10. Post-Execution Fail-Closed Assertions
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    v_total_sections INTEGER;
    v_authentic_sections INTEGER;
    v_synthetic_sections INTEGER;
    v_g6_sections INTEGER;
    v_total_auth_concepts INTEGER;
    v_g6_auth_concepts INTEGER;
    v_total_curr_concepts INTEGER;
    v_total_mappings INTEGER;
    v_null_section_id_count INTEGER;
    v_provenance_violation_count INTEGER;
BEGIN
    -- 10.1 Assert textbook_sections counts
    SELECT COUNT(*) INTO v_total_sections FROM public.textbook_sections;
    IF v_total_sections <> 178 THEN
        RAISE EXCEPTION 'Fail-closed: Expected 178 total textbook_sections, found %', v_total_sections;
    END IF;

    SELECT COUNT(*) INTO v_authentic_sections FROM public.textbook_sections WHERE section_type = 'AUTHENTIC';
    IF v_authentic_sections <> 52 THEN
        RAISE EXCEPTION 'Fail-closed: Expected 52 AUTHENTIC sections, found %', v_authentic_sections;
    END IF;

    SELECT COUNT(*) INTO v_synthetic_sections FROM public.textbook_sections WHERE section_type = 'LEGACY_SYNTHETIC';
    IF v_synthetic_sections <> 126 THEN
        RAISE EXCEPTION 'Fail-closed: Expected 126 LEGACY_SYNTHETIC sections, found %', v_synthetic_sections;
    END IF;

    SELECT COUNT(*) INTO v_g6_sections
    FROM public.textbook_sections
    WHERE chapter_id = 'CH-NCERT-G6-MATH-2024-02' AND section_type = 'AUTHENTIC';
    IF v_g6_sections <> 11 THEN
        RAISE EXCEPTION 'Fail-closed: Expected exactly 11 G6 Chapter 2 AUTHENTIC sections, found %', v_g6_sections;
    END IF;

    -- 10.2 Assert authoritative_curriculum_concepts counts
    SELECT COUNT(*) INTO v_total_auth_concepts FROM public.authoritative_curriculum_concepts;
    IF v_total_auth_concepts <> 28 THEN
        RAISE EXCEPTION 'Fail-closed: Expected 28 total authoritative concepts, found %', v_total_auth_concepts;
    END IF;

    SELECT COUNT(*) INTO v_g6_auth_concepts
    FROM public.authoritative_curriculum_concepts
    WHERE chapter_id = 'CH-NCERT-G6-MATH-2024-02';
    IF v_g6_auth_concepts <> 11 THEN
        RAISE EXCEPTION 'Fail-closed: Expected 11 G6 Chapter 2 authoritative concepts, found %', v_g6_auth_concepts;
    END IF;

    -- 10.3 Assert section_id is NULL for all 11 new G6 concepts
    SELECT COUNT(*) INTO v_null_section_id_count
    FROM public.authoritative_curriculum_concepts
    WHERE chapter_id = 'CH-NCERT-G6-MATH-2024-02' AND section_id IS NULL;
    IF v_null_section_id_count <> 11 THEN
        RAISE EXCEPTION 'Fail-closed: Expected all 11 G6 concepts to have section_id = NULL, found %', v_null_section_id_count;
    END IF;

    -- 10.4 Assert curriculum_concepts unchanged
    SELECT COUNT(*) INTO v_total_curr_concepts FROM public.curriculum_concepts;
    IF v_total_curr_concepts <> 846 THEN
        RAISE EXCEPTION 'Fail-closed: Expected 846 curriculum_concepts, found %', v_total_curr_concepts;
    END IF;

    -- 10.5 Assert authoritative_concept_sections mappings count
    SELECT COUNT(*) INTO v_total_mappings FROM public.authoritative_concept_sections;
    IF v_total_mappings <> 18 THEN
        RAISE EXCEPTION 'Fail-closed: Expected exactly 18 concept-section mappings, found %', v_total_mappings;
    END IF;

    -- 10.6 Assert zero provenance violations across all 52 AUTHENTIC sections
    SELECT COUNT(*) INTO v_provenance_violation_count
    FROM public.textbook_sections
    WHERE section_type = 'AUTHENTIC'
      AND (
          NULLIF(BTRIM(source_document_id), '') IS NULL OR
          NULLIF(BTRIM(source_url), '') IS NULL OR
          NULLIF(BTRIM(source_page), '') IS NULL OR
          NULLIF(BTRIM(source_locator), '') IS NULL
      );
    IF v_provenance_violation_count <> 0 THEN
        RAISE EXCEPTION 'Fail-closed: Found % AUTHENTIC sections with provenance violations', v_provenance_violation_count;
    END IF;
END $$;

COMMIT;
