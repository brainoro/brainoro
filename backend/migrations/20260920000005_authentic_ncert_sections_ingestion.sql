-- =============================================================================
-- Migration: 20260920000005_authentic_ncert_sections_ingestion.sql
-- Description: Authentic NCERT Class 10 Mathematics Section Tree Ingestion,
--              Official NCERT Textbook Provenance Document Creation, and
--              Section Coexistence Constraint Migration
--
-- Authoritative Target:
--   Exactly 41 AUTHENTIC NCERT Class 10 Mathematics teaching sections.
--   Chapter counts:
--     Ch 1 = 3,  Ch 2 = 3,  Ch 3 = 3,  Ch 4 = 4,  Ch 5 = 4,  Ch 6 = 4,
--     Ch 7 = 3,  Ch 8 = 4,  Ch 9 = 1,  Ch 10 = 3, Ch 11 = 1, Ch 12 = 3,
--     Ch 13 = 4, Ch 14 = 1
--     Total = 41
--
-- Safety & Fail-Closed Rules:
--   1. Non-destructive: zero DROP TABLE, zero TRUNCATE, zero DELETE of existing data.
--   2. Preserve all 126 existing LEGACY_SYNTHETIC sections 100% untouched.
--   3. Upgrade UNIQUE(chapter_id, section_number) to scoped coexistence:
--      uq_section_chapter_number_type UNIQUE (chapter_id, section_number, section_type)
--   4. Establish proper NCERT textbook document provenance under SRC-NCERT-OFFICIAL.
--      Document ID: DOC-NCERT-TB-G10-MATH-2026 (publication_date is NULL: no fabrication).
--   5. Ingest exactly 41 verified authentic NCERT Class 10 Mathematics sections
--      with verbatim textbook headings, plain canonical PDF URLs, and locators.
--   6. Fail-closed: No "ON CONFLICT (id) DO NOTHING" on section ingestion.
--      Validate preconditions, staging counts, and conflicting IDs before inserting.
--   7. Expected post-migration total: 126 LEGACY_SYNTHETIC + 41 AUTHENTIC = 167.
-- =============================================================================

BEGIN;

-- -----------------------------------------------------------------------------
-- 1. Fail-Closed Pre-Execution Validation
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    v_tb RECORD;
    v_legacy_count INTEGER;
    v_auth_count INTEGER;
    v_expected_chaps TEXT[] := ARRAY[
        'CH-NCERT-G10-MATH-01', 'CH-NCERT-G10-MATH-02', 'CH-NCERT-G10-MATH-03',
        'CH-NCERT-G10-MATH-04', 'CH-NCERT-G10-MATH-05', 'CH-NCERT-G10-MATH-06',
        'CH-NCERT-G10-MATH-07', 'CH-NCERT-G10-MATH-08', 'CH-NCERT-G10-MATH-09',
        'CH-NCERT-G10-MATH-10', 'CH-NCERT-G10-MATH-11', 'CH-NCERT-G10-MATH-12',
        'CH-NCERT-G10-MATH-13', 'CH-NCERT-G10-MATH-14'
    ];
    chap_id TEXT;
BEGIN
    -- 1. Validate textbook TB-NCERT-G10-MATH existence and educational attributes
    SELECT * INTO v_tb FROM public.textbooks WHERE id = 'TB-NCERT-G10-MATH';
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Fail-closed: Textbook TB-NCERT-G10-MATH does not exist';
    END IF;

    IF v_tb.board_id <> 'CBSE' THEN
        RAISE EXCEPTION 'Fail-closed: Expected board CBSE, found %', v_tb.board_id;
    END IF;

    IF v_tb.grade_level <> 10 THEN
        RAISE EXCEPTION 'Fail-closed: Expected grade 10, found %', v_tb.grade_level;
    END IF;

    IF v_tb.subject_id <> 'MATH' THEN
        RAISE EXCEPTION 'Fail-closed: Expected subject MATH, found %', v_tb.subject_id;
    END IF;

    IF v_tb.curriculum_version_id <> 'CBSE-2026-27-OFFICIAL' THEN
        RAISE EXCEPTION 'Fail-closed: Expected curriculum_version CBSE-2026-27-OFFICIAL, found %', v_tb.curriculum_version_id;
    END IF;

    -- 2. Validate curriculum version and source exist
    IF NOT EXISTS (SELECT 1 FROM public.curriculum_versions WHERE id = 'CBSE-2026-27-OFFICIAL') THEN
        RAISE EXCEPTION 'Fail-closed: Curriculum version CBSE-2026-27-OFFICIAL does not exist';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM public.curriculum_sources WHERE id = 'SRC-NCERT-OFFICIAL') THEN
        RAISE EXCEPTION 'Fail-closed: Curriculum source SRC-NCERT-OFFICIAL does not exist';
    END IF;

    -- 3. Validate all 14 expected chapter IDs exist and belong to TB-NCERT-G10-MATH
    FOREACH chap_id IN ARRAY v_expected_chaps LOOP
        IF NOT EXISTS (
            SELECT 1 FROM public.textbook_chapters 
            WHERE id = chap_id AND textbook_id = 'TB-NCERT-G10-MATH'
        ) THEN
            RAISE EXCEPTION 'Fail-closed: Chapter % missing or does not belong to TB-NCERT-G10-MATH', chap_id;
        END IF;
    END LOOP;

    -- 4. Validate existing legacy synthetic rows remain intact (exactly 126)
    SELECT COUNT(*) INTO v_legacy_count 
    FROM public.textbook_sections 
    WHERE section_type = 'LEGACY_SYNTHETIC';

    IF v_legacy_count <> 126 THEN
        RAISE EXCEPTION 'Fail-closed: Expected exactly 126 LEGACY_SYNTHETIC sections, found %', v_legacy_count;
    END IF;

    -- 5. Validate that no partial or malformed authentic sections exist
    SELECT COUNT(*) INTO v_auth_count 
    FROM public.textbook_sections 
    WHERE section_type = 'AUTHENTIC';

    IF v_auth_count > 0 AND v_auth_count <> 41 THEN
        RAISE EXCEPTION 'Fail-closed: Found % existing AUTHENTIC sections. Partial migration state detected.', v_auth_count;
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 2. Establish Official NCERT Textbook Document Provenance Record
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
    'DOC-NCERT-TB-G10-MATH-2026',
    'CBSE-2026-27-OFFICIAL',
    'SRC-NCERT-OFFICIAL',
    'Mathematics — Textbook for Class X (NCERT Edition 2026-27)',
    'NCERT/TB/G10/MATH/jemh1',
    'https://ncert.nic.in/textbook.php?jemh1=0-14',
    NULL
) ON CONFLICT (id) DO NOTHING;

-- Verify document exists with exact required relationships
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM public.curriculum_documents 
        WHERE id = 'DOC-NCERT-TB-G10-MATH-2026'
          AND source_id = 'SRC-NCERT-OFFICIAL'
          AND curriculum_version_id = 'CBSE-2026-27-OFFICIAL'
    ) THEN
        RAISE EXCEPTION 'Fail-closed: Document DOC-NCERT-TB-G10-MATH-2026 missing or has invalid relationships';
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 3. Upgrade Unique Constraint to Allow Section Type Coexistence
-- -----------------------------------------------------------------------------
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'textbook_sections_chapter_id_section_number_key'
    ) THEN
        ALTER TABLE public.textbook_sections 
            DROP CONSTRAINT textbook_sections_chapter_id_section_number_key;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'uq_section_chapter_number_type'
    ) THEN
        ALTER TABLE public.textbook_sections
            ADD CONSTRAINT uq_section_chapter_number_type 
            UNIQUE (chapter_id, section_number, section_type);
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 4. Staging & Pre-Insertion Conflict Audit for 41 Authentic Sections
-- -----------------------------------------------------------------------------
CREATE TEMPORARY TABLE staging_authentic_sections (
    id TEXT PRIMARY KEY,
    chapter_id TEXT NOT NULL,
    section_number TEXT NOT NULL,
    section_title TEXT NOT NULL,
    section_type TEXT NOT NULL,
    textbook_id TEXT NOT NULL,
    source_document_id TEXT NOT NULL,
    source_url TEXT NOT NULL,
    source_locator TEXT NOT NULL,
    evidence_excerpt TEXT NOT NULL
) ON COMMIT DROP;

INSERT INTO staging_authentic_sections (
    id, chapter_id, section_number, section_title, section_type, textbook_id,
    source_document_id, source_url, source_locator, evidence_excerpt
) VALUES
-- Chapter 1: Real Numbers (3 sections)
('SEC-NCERT-G10-MATH-1-1-AUTH', 'CH-NCERT-G10-MATH-01', '1.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh101.pdf', 'jemh101.pdf § 1.1, p. 1', 'Section 1.1: Introduction to Real Numbers and foundations from Class IX.'),
('SEC-NCERT-G10-MATH-1-2-AUTH', 'CH-NCERT-G10-MATH-01', '1.2', 'The Fundamental Theorem of Arithmetic', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh101.pdf', 'jemh101.pdf § 1.2, p. 2', 'Section 1.2: Every composite number can be expressed (factorised) as a product of primes, and this factorisation is unique.'),
('SEC-NCERT-G10-MATH-1-3-AUTH', 'CH-NCERT-G10-MATH-01', '1.3', 'Revisiting Irrational Numbers', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh101.pdf', 'jemh101.pdf § 1.3, p. 6', 'Section 1.3: Proofs of irrationality of square root of 2, 3, 5.'),

-- Chapter 2: Polynomials (3 sections)
('SEC-NCERT-G10-MATH-2-1-AUTH', 'CH-NCERT-G10-MATH-02', '2.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh102.pdf', 'jemh102.pdf § 2.1, p. 10', 'Section 2.1: Overview of degree, linear, quadratic, and cubic polynomials.'),
('SEC-NCERT-G10-MATH-2-2-AUTH', 'CH-NCERT-G10-MATH-02', '2.2', 'Geometrical Meaning of the Zeroes of a Polynomial', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh102.pdf', 'jemh102.pdf § 2.2, p. 11', 'Section 2.2: Zeroes of polynomials as x-coordinates of intersection points with x-axis.'),
('SEC-NCERT-G10-MATH-2-3-AUTH', 'CH-NCERT-G10-MATH-02', '2.3', 'Relationship between Zeroes and Coefficients of a Polynomial', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh102.pdf', 'jemh102.pdf § 2.3, p. 18', 'Section 2.3: Sum and product of zeroes for quadratic polynomials.'),

-- Chapter 3: Pair of Linear Equations in Two Variables (3 sections)
('SEC-NCERT-G10-MATH-3-1-AUTH', 'CH-NCERT-G10-MATH-03', '3.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh103.pdf', 'jemh103.pdf § 3.1, p. 24', 'Section 3.1: Pair of linear equations in two variables introduction.'),
('SEC-NCERT-G10-MATH-3-2-AUTH', 'CH-NCERT-G10-MATH-03', '3.2', 'Graphical Method of Solution of a Pair of Linear Equations', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh103.pdf', 'jemh103.pdf § 3.2, p. 25', 'Section 3.2: Graphical representation and conditions for consistency.'),
('SEC-NCERT-G10-MATH-3-3-AUTH', 'CH-NCERT-G10-MATH-03', '3.3', 'Algebraic Methods of Solving a Pair of Linear Equations', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh103.pdf', 'jemh103.pdf § 3.3, p. 30', 'Section 3.3: Substitution method and elimination method.'),

-- Chapter 4: Quadratic Equations (4 sections)
('SEC-NCERT-G10-MATH-4-1-AUTH', 'CH-NCERT-G10-MATH-04', '4.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh104.pdf', 'jemh104.pdf § 4.1, p. 38', 'Section 4.1: Introduction to quadratic equations.'),
('SEC-NCERT-G10-MATH-4-2-AUTH', 'CH-NCERT-G10-MATH-04', '4.2', 'Quadratic Equations', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh104.pdf', 'jemh104.pdf § 4.2, p. 39', 'Section 4.2: Standard form of a quadratic equation ax^2 + bx + c = 0.'),
('SEC-NCERT-G10-MATH-4-3-AUTH', 'CH-NCERT-G10-MATH-04', '4.3', 'Solution of a Quadratic Equation by Factorisation', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh104.pdf', 'jemh104.pdf § 4.3, p. 42', 'Section 4.3: Factorisation method and roots of quadratic equation.'),
('SEC-NCERT-G10-MATH-4-4-AUTH', 'CH-NCERT-G10-MATH-04', '4.4', 'Nature of Roots', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh104.pdf', 'jemh104.pdf § 4.4, p. 44', 'Section 4.4: Discriminant b^2 - 4ac and nature of roots.'),

-- Chapter 5: Arithmetic Progressions (4 sections)
('SEC-NCERT-G10-MATH-5-1-AUTH', 'CH-NCERT-G10-MATH-05', '5.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh105.pdf', 'jemh105.pdf § 5.1, p. 49', 'Section 5.1: Introduction to arithmetic progressions.'),
('SEC-NCERT-G10-MATH-5-2-AUTH', 'CH-NCERT-G10-MATH-05', '5.2', 'Arithmetic Progressions', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh105.pdf', 'jemh105.pdf § 5.2, p. 51', 'Section 5.2: Definition of AP and common difference.'),
('SEC-NCERT-G10-MATH-5-3-AUTH', 'CH-NCERT-G10-MATH-05', '5.3', 'nth Term of an AP', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh105.pdf', 'jemh105.pdf § 5.3, p. 56', 'Section 5.3: General term a_n = a + (n - 1)d.'),
('SEC-NCERT-G10-MATH-5-4-AUTH', 'CH-NCERT-G10-MATH-05', '5.4', 'Sum of First n Terms of an AP', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh105.pdf', 'jemh105.pdf § 5.4, p. 63', 'Section 5.4: Sum formula S_n = n/2 [2a + (n - 1)d].'),

-- Chapter 6: Triangles (4 sections)
('SEC-NCERT-G10-MATH-6-1-AUTH', 'CH-NCERT-G10-MATH-06', '6.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh106.pdf', 'jemh106.pdf § 6.1, p. 73', 'Section 6.1: Introduction to similar triangles.'),
('SEC-NCERT-G10-MATH-6-2-AUTH', 'CH-NCERT-G10-MATH-06', '6.2', 'Similar Figures', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh106.pdf', 'jemh106.pdf § 6.2, p. 74', 'Section 6.2: Definition of similarity of geometric figures.'),
('SEC-NCERT-G10-MATH-6-3-AUTH', 'CH-NCERT-G10-MATH-06', '6.3', 'Similarity of Triangles', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh106.pdf', 'jemh106.pdf § 6.3, p. 79', 'Section 6.3: Basic Proportionality Theorem (Thales Theorem).'),
('SEC-NCERT-G10-MATH-6-4-AUTH', 'CH-NCERT-G10-MATH-06', '6.4', 'Criteria for Similarity of Triangles', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh106.pdf', 'jemh106.pdf § 6.4, p. 85', 'Section 6.4: AAA, SSS, and SAS similarity criteria.'),

-- Chapter 7: Coordinate Geometry (3 sections)
('SEC-NCERT-G10-MATH-7-1-AUTH', 'CH-NCERT-G10-MATH-07', '7.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh107.pdf', 'jemh107.pdf § 7.1, p. 99', 'Section 7.1: Introduction to coordinate geometry.'),
('SEC-NCERT-G10-MATH-7-2-AUTH', 'CH-NCERT-G10-MATH-07', '7.2', 'Distance Formula', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh107.pdf', 'jemh107.pdf § 7.2, p. 100', 'Section 7.2: Derivation and applications of distance formula.'),
('SEC-NCERT-G10-MATH-7-3-AUTH', 'CH-NCERT-G10-MATH-07', '7.3', 'Section Formula', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh107.pdf', 'jemh107.pdf § 7.3, p. 106', 'Section 7.3: Internal division section formula and midpoint formula.'),

-- Chapter 8: Introduction to Trigonometry (4 sections)
('SEC-NCERT-G10-MATH-8-1-AUTH', 'CH-NCERT-G10-MATH-08', '8.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh108.pdf', 'jemh108.pdf § 8.1, p. 113', 'Section 8.1: Historical context and introduction to trigonometry.'),
('SEC-NCERT-G10-MATH-8-2-AUTH', 'CH-NCERT-G10-MATH-08', '8.2', 'Trigonometric Ratios', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh108.pdf', 'jemh108.pdf § 8.2, p. 114', 'Section 8.2: Definitions of sine, cosine, tangent, cosecant, secant, cotangent.'),
('SEC-NCERT-G10-MATH-8-3-AUTH', 'CH-NCERT-G10-MATH-08', '8.3', 'Trigonometric Ratios of Some Specific Angles', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh108.pdf', 'jemh108.pdf § 8.3, p. 121', 'Section 8.3: Values of trigonometric ratios for 0, 30, 45, 60, and 90 degrees.'),
('SEC-NCERT-G10-MATH-8-4-AUTH', 'CH-NCERT-G10-MATH-08', '8.4', 'Trigonometric Identities', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh108.pdf', 'jemh108.pdf § 8.4, p. 128', 'Section 8.4: Fundamental identity sin^2 A + cos^2 A = 1 and related identities.'),

-- Chapter 9: Some Applications of Trigonometry (1 section: ONLY 9.1 Heights and Distances)
('SEC-NCERT-G10-MATH-9-1-AUTH', 'CH-NCERT-G10-MATH-09', '9.1', 'Heights and Distances', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh109.pdf', 'jemh109.pdf § 9.1, p. 133', 'Section 9.1: Line of sight, angle of elevation, angle of depression, and height/distance problems.'),

-- Chapter 10: Circles (3 sections)
('SEC-NCERT-G10-MATH-10-1-AUTH', 'CH-NCERT-G10-MATH-10', '10.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh110.pdf', 'jemh110.pdf § 10.1, p. 144', 'Section 10.1: Introduction to circles and secants.'),
('SEC-NCERT-G10-MATH-10-2-AUTH', 'CH-NCERT-G10-MATH-10', '10.2', 'Tangent to a Circle', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh110.pdf', 'jemh110.pdf § 10.2, p. 145', 'Section 10.2: Tangent is perpendicular to the radius through the point of contact.'),
('SEC-NCERT-G10-MATH-10-3-AUTH', 'CH-NCERT-G10-MATH-10', '10.3', 'Number of Tangents from a Point on a Circle', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh110.pdf', 'jemh110.pdf § 10.3, p. 147', 'Section 10.3: Tangents drawn from an external point to a circle are equal in length.'),

-- Chapter 11: Areas Related to Circles (1 section: ONLY 11.1 Areas of Sector and Segment of a Circle)
('SEC-NCERT-G10-MATH-11-1-AUTH', 'CH-NCERT-G10-MATH-11', '11.1', 'Areas of Sector and Segment of a Circle', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh111.pdf', 'jemh111.pdf § 11.1, p. 154', 'Section 11.1: Formulae for area of sector and segment of a circle of radius r.'),

-- Chapter 12: Surface Areas and Volumes (3 sections)
('SEC-NCERT-G10-MATH-12-1-AUTH', 'CH-NCERT-G10-MATH-12', '12.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh112.pdf', 'jemh112.pdf § 12.1, p. 161', 'Section 12.1: Introduction to combinations of solids.'),
('SEC-NCERT-G10-MATH-12-2-AUTH', 'CH-NCERT-G10-MATH-12', '12.2', 'Surface Area of a Combination of Solids', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh112.pdf', 'jemh112.pdf § 12.2, p. 162', 'Section 12.2: Total surface area of combinations of cylinders, cones, spheres, cuboids.'),
('SEC-NCERT-G10-MATH-12-3-AUTH', 'CH-NCERT-G10-MATH-12', '12.3', 'Volume of a Combination of Solids', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh112.pdf', 'jemh112.pdf § 12.3, p. 167', 'Section 12.3: Volume calculation for composite solids.'),

-- Chapter 13: Statistics (4 sections)
('SEC-NCERT-G10-MATH-13-1-AUTH', 'CH-NCERT-G10-MATH-13', '13.1', 'Introduction', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh113.pdf', 'jemh113.pdf § 13.1, p. 171', 'Section 13.1: Introduction to grouped data statistics.'),
('SEC-NCERT-G10-MATH-13-2-AUTH', 'CH-NCERT-G10-MATH-13', '13.2', 'Mean of Grouped Data', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh113.pdf', 'jemh113.pdf § 13.2, p. 171', 'Section 13.2: Direct, assumed mean, and step deviation methods.'),
('SEC-NCERT-G10-MATH-13-3-AUTH', 'CH-NCERT-G10-MATH-13', '13.3', 'Mode of Grouped Data', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh113.pdf', 'jemh113.pdf § 13.3, p. 183', 'Section 13.3: Modal class and mode formula for grouped data.'),
('SEC-NCERT-G10-MATH-13-4-AUTH', 'CH-NCERT-G10-MATH-13', '13.4', 'Median of Grouped Data', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh113.pdf', 'jemh113.pdf § 13.4, p. 188', 'Section 13.4: Cumulative frequency and median formula for grouped data.'),

-- Chapter 14: Probability (1 section: ONLY 14.1 Probability — A Theoretical Approach)
('SEC-NCERT-G10-MATH-14-1-AUTH', 'CH-NCERT-G10-MATH-14', '14.1', 'Probability — A Theoretical Approach', 'AUTHENTIC', 'TB-NCERT-G10-MATH',
 'DOC-NCERT-TB-G10-MATH-2026', 'https://ncert.nic.in/textbook/pdf/jemh114.pdf', 'jemh114.pdf § 14.1, p. 202', 'Section 14.1: Equally likely outcomes, elementary events, complementary events.');

-- Pre-insertion assertion on staging data
DO $$
DECLARE
    v_stage_count INTEGER;
    v_conflicting_id TEXT;
BEGIN
    -- Assert staging contains exactly 41 rows
    SELECT COUNT(*) INTO v_stage_count FROM staging_authentic_sections;
    IF v_stage_count <> 41 THEN
        RAISE EXCEPTION 'Fail-closed: Staging table does not contain exactly 41 rows (found %)', v_stage_count;
    END IF;

    -- Fail-closed: Check if any expected authentic ID already exists with differing authoritative data
    SELECT ts.id INTO v_conflicting_id
    FROM public.textbook_sections ts
    JOIN staging_authentic_sections s ON ts.id = s.id
    WHERE ts.chapter_id <> s.chapter_id
       OR ts.section_number <> s.section_number
       OR ts.section_title <> s.section_title
       OR ts.section_type <> s.section_type
       OR ts.textbook_id <> s.textbook_id
       OR ts.source_document_id <> s.source_document_id
       OR ts.source_url <> s.source_url
       OR ts.source_locator <> s.source_locator
       OR ts.evidence_excerpt <> s.evidence_excerpt
    LIMIT 1;

    IF v_conflicting_id IS NOT NULL THEN
        RAISE EXCEPTION 'Fail-closed: Section ID % already exists with conflicting authoritative attributes', v_conflicting_id;
    END IF;
END $$;

-- -----------------------------------------------------------------------------
-- 5. Fail-Closed Ingestion of the 41 Authentic Sections
-- -----------------------------------------------------------------------------
-- Direct INSERT without ON CONFLICT DO NOTHING.
-- If the sections do not exist, they are inserted.
-- If all 41 already exist with identical data, insertion is skipped cleanly.
INSERT INTO public.textbook_sections (
    id, chapter_id, section_number, section_title, section_type, textbook_id,
    source_document_id, source_url, source_locator, evidence_excerpt
)
SELECT
    s.id, s.chapter_id, s.section_number, s.section_title, s.section_type, s.textbook_id,
    s.source_document_id, s.source_url, s.source_locator, s.evidence_excerpt
FROM staging_authentic_sections s
WHERE NOT EXISTS (
    SELECT 1 FROM public.textbook_sections ts WHERE ts.id = s.id
);

-- -----------------------------------------------------------------------------
-- 6. Fail-Closed Post-Insertion Assertions
-- -----------------------------------------------------------------------------
DO $$
DECLARE
    v_total_sections INTEGER;
    v_auth_sections INTEGER;
    v_legacy_sections INTEGER;
    v_doc_auth_count INTEGER;
    v_cbse_doc_auth_count INTEGER;
    v_chap_count INTEGER;
    v_rec RECORD;
    v_expected_counts JSONB := '{
        "CH-NCERT-G10-MATH-01": 3,
        "CH-NCERT-G10-MATH-02": 3,
        "CH-NCERT-G10-MATH-03": 3,
        "CH-NCERT-G10-MATH-04": 4,
        "CH-NCERT-G10-MATH-05": 4,
        "CH-NCERT-G10-MATH-06": 4,
        "CH-NCERT-G10-MATH-07": 3,
        "CH-NCERT-G10-MATH-08": 4,
        "CH-NCERT-G10-MATH-09": 1,
        "CH-NCERT-G10-MATH-10": 3,
        "CH-NCERT-G10-MATH-11": 1,
        "CH-NCERT-G10-MATH-12": 3,
        "CH-NCERT-G10-MATH-13": 4,
        "CH-NCERT-G10-MATH-14": 1
    }'::JSONB;
    v_exp_cnt INTEGER;
BEGIN
    -- 1. Total sections must be exactly 167 (126 legacy + 41 authentic)
    SELECT COUNT(*) INTO v_total_sections FROM public.textbook_sections;
    IF v_total_sections <> 167 THEN
        RAISE EXCEPTION 'Post-assertion failed: Expected 167 total sections, found %', v_total_sections;
    END IF;

    -- 2. Authentic sections must be exactly 41
    SELECT COUNT(*) INTO v_auth_sections FROM public.textbook_sections WHERE section_type = 'AUTHENTIC';
    IF v_auth_sections <> 41 THEN
        RAISE EXCEPTION 'Post-assertion failed: Expected 41 AUTHENTIC sections, found %', v_auth_sections;
    END IF;

    -- 3. Legacy synthetic sections must remain exactly 126
    SELECT COUNT(*) INTO v_legacy_sections FROM public.textbook_sections WHERE section_type = 'LEGACY_SYNTHETIC';
    IF v_legacy_sections <> 126 THEN
        RAISE EXCEPTION 'Post-assertion failed: Expected 126 LEGACY_SYNTHETIC sections, found %', v_legacy_sections;
    END IF;

    -- 4. All 41 authentic sections must point to DOC-NCERT-TB-G10-MATH-2026
    SELECT COUNT(*) INTO v_doc_auth_count 
    FROM public.textbook_sections 
    WHERE section_type = 'AUTHENTIC' AND source_document_id = 'DOC-NCERT-TB-G10-MATH-2026';
    IF v_doc_auth_count <> 41 THEN
        RAISE EXCEPTION 'Post-assertion failed: Expected 41 sections under DOC-NCERT-TB-G10-MATH-2026, found %', v_doc_auth_count;
    END IF;

    -- 5. Zero authentic sections should point to DOC-CBSE-SEC-2026
    SELECT COUNT(*) INTO v_cbse_doc_auth_count 
    FROM public.textbook_sections 
    WHERE section_type = 'AUTHENTIC' AND source_document_id = 'DOC-CBSE-SEC-2026';
    IF v_cbse_doc_auth_count <> 0 THEN
        RAISE EXCEPTION 'Post-assertion failed: Found % authentic sections referencing DOC-CBSE-SEC-2026', v_cbse_doc_auth_count;
    END IF;

    -- 6. Exactly 14 distinct chapters represented
    SELECT COUNT(DISTINCT chapter_id) INTO v_chap_count 
    FROM public.textbook_sections 
    WHERE section_type = 'AUTHENTIC';
    IF v_chap_count <> 14 THEN
        RAISE EXCEPTION 'Post-assertion failed: Expected 14 chapters represented, found %', v_chap_count;
    END IF;

    -- 7. Chapter-by-chapter exact counts
    FOR v_rec IN 
        SELECT chapter_id, COUNT(*) AS cnt 
        FROM public.textbook_sections 
        WHERE section_type = 'AUTHENTIC' 
        GROUP BY chapter_id 
    LOOP
        v_exp_cnt := (v_expected_counts ->> v_rec.chapter_id)::INTEGER;
        IF v_rec.cnt <> v_exp_cnt THEN
            RAISE EXCEPTION 'Post-assertion failed: Chapter % has % authentic sections, expected %', v_rec.chapter_id, v_rec.cnt, v_exp_cnt;
        END IF;
    END LOOP;

    -- 8. Section 1.2 exact title assertion
    IF NOT EXISTS (
        SELECT 1 FROM public.textbook_sections 
        WHERE id = 'SEC-NCERT-G10-MATH-1-2-AUTH' 
          AND section_title = 'The Fundamental Theorem of Arithmetic'
    ) THEN
        RAISE EXCEPTION 'Post-assertion failed: Section 1.2 title mismatch';
    END IF;

    -- 9. Legacy synthetic sections untouched
    IF EXISTS (
        SELECT 1 FROM public.textbook_sections 
        WHERE section_type = 'LEGACY_SYNTHETIC' AND source_document_id IS NOT NULL
    ) THEN
        RAISE EXCEPTION 'Post-assertion failed: One or more LEGACY_SYNTHETIC sections were modified with provenance';
    END IF;
END $$;

COMMIT;

-- =============================================================================
-- POST-MIGRATION MANUAL VERIFICATION SQL (READ-ONLY)
-- =============================================================================
-- Run after executing the migration in Supabase SQL Editor:
--
-- 1. Section counts by type:
--    SELECT section_type, COUNT(*) FROM public.textbook_sections GROUP BY section_type;
--    -- Expected: AUTHENTIC = 41, LEGACY_SYNTHETIC = 126
--
-- 2. Chapter-by-chapter authentic section counts:
--    SELECT chapter_id, COUNT(*) 
--    FROM public.textbook_sections 
--    WHERE section_type = 'AUTHENTIC' 
--    GROUP BY chapter_id 
--    ORDER BY chapter_id;
--    -- Expected:
--    -- CH-NCERT-G10-MATH-01: 3
--    -- CH-NCERT-G10-MATH-02: 3
--    -- CH-NCERT-G10-MATH-03: 3
--    -- CH-NCERT-G10-MATH-04: 4
--    -- CH-NCERT-G10-MATH-05: 4
--    -- CH-NCERT-G10-MATH-06: 4
--    -- CH-NCERT-G10-MATH-07: 3
--    -- CH-NCERT-G10-MATH-08: 4
--    -- CH-NCERT-G10-MATH-09: 1
--    -- CH-NCERT-G10-MATH-10: 3
--    -- CH-NCERT-G10-MATH-11: 1
--    -- CH-NCERT-G10-MATH-12: 3
--    -- CH-NCERT-G10-MATH-13: 4
--    -- CH-NCERT-G10-MATH-14: 1
--
-- 3. Provenance document verification:
--    SELECT id, source_id, curriculum_version_id, publication_date, document_url 
--    FROM public.curriculum_documents 
--    WHERE id = 'DOC-NCERT-TB-G10-MATH-2026';
--
-- 4. Constraint verification:
--    SELECT conname, pg_get_constraintdef(oid) 
--    FROM pg_constraint 
--    WHERE conrelid = 'public.textbook_sections'::regclass 
--      AND conname = 'uq_section_chapter_number_type';
--
-- 5. Core curriculum counts preserved:
--    SELECT 
--      (SELECT COUNT(*) FROM public.curriculum_concepts) AS concepts_count,
--      (SELECT COUNT(*) FROM public.concept_curriculum_mappings) AS mappings_count,
--      (SELECT COUNT(*) FROM public.authoritative_curriculum_concepts) AS auth_concepts_count;
--    -- Expected: concepts_count = 846, mappings_count = 282, auth_concepts_count = 17
-- =============================================================================
