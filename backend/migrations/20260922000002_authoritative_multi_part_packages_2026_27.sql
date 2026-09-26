-- =============================================================================
-- Migration: 20260922000002_authoritative_multi_part_packages_2026_27.sql
-- Description: Multi-Part / Multi-Book Architecture for CBSE/NCERT 2026-27
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Authoritative Textbooks Table (Dynamic Cardinality 1...N)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.authoritative_textbooks (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    board_id TEXT NOT NULL DEFAULT 'CBSE',
    grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 6 AND 12),
    subject_id TEXT NOT NULL,
    textbook_title TEXT NOT NULL,
    edition_year TEXT NOT NULL DEFAULT '2026-27',
    part_number INTEGER NOT NULL DEFAULT 1,
    part_title TEXT NOT NULL DEFAULT 'Part I',
    package_code TEXT NOT NULL DEFAULT 'PART_1',
    official_code TEXT,
    official_url TEXT,
    total_chapters INTEGER NOT NULL DEFAULT 0,
    is_authoritative BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unq_auth_textbook UNIQUE (board_id, grade_level, subject_id, edition_year, textbook_title, part_number)
);

CREATE INDEX IF NOT EXISTS idx_auth_tb_lookup
    ON public.authoritative_textbooks(board_id, edition_year, grade_level, subject_id);

ALTER TABLE public.authoritative_textbooks ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    DROP POLICY IF EXISTS "public_read_authoritative_textbooks" ON public.authoritative_textbooks;
    CREATE POLICY "public_read_authoritative_textbooks"
        ON public.authoritative_textbooks
        FOR SELECT USING (true);
END $$;

-- -----------------------------------------------------------------------------
-- 2. Enhance Authoritative Curriculum Mappings with Part Dimensions
-- -----------------------------------------------------------------------------
ALTER TABLE public.authoritative_curriculum_mappings
    ADD COLUMN IF NOT EXISTS part_number INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN IF NOT EXISTS part_title TEXT NOT NULL DEFAULT 'Part I',
    ADD COLUMN IF NOT EXISTS package_code TEXT NOT NULL DEFAULT 'PART_1',
    ADD COLUMN IF NOT EXISTS global_chapter_no INTEGER;

-- Rebuild unique constraint to include textbook_title and part_number
ALTER TABLE public.authoritative_curriculum_mappings
    DROP CONSTRAINT IF EXISTS unq_auth_curr_mapping;

ALTER TABLE public.authoritative_curriculum_mappings
    DROP CONSTRAINT IF EXISTS unq_auth_curr_mapping_part;

ALTER TABLE public.authoritative_curriculum_mappings
    ADD CONSTRAINT unq_auth_curr_mapping_part
    UNIQUE (board_id, grade_level, subject_id, edition_year, textbook_title, part_number, chapter_no);

CREATE INDEX IF NOT EXISTS idx_auth_curr_part_resolver
    ON public.authoritative_curriculum_mappings(board_id, edition_year, grade_level, subject_id, part_number);

-- -----------------------------------------------------------------------------
-- 3. Seed Authoritative Textbooks Metadata
-- -----------------------------------------------------------------------------
INSERT INTO public.authoritative_textbooks
(id, board_id, grade_level, subject_id, textbook_title, edition_year, part_number, part_title, package_code, official_code, official_url, total_chapters, is_authoritative)
VALUES
('TB-CBSE-2026-27-G6-SCI', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 1, 'Curiosity', 'SINGLE_VOLUME', 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12', 12, TRUE),
('TB-CBSE-2026-27-G6-MATH', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 1, 'Ganita Prakash', 'PART_1', 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10', 10, TRUE),
('TB-CBSE-2026-27-G6-ENG', 'CBSE', 6, 'ENGLISH', 'Poorvi', '2026-27', 1, 'Poorvi', 'MAIN_READER', 'feen1', 'https://ncert.nic.in/textbook.php?feen1=0-5', 5, TRUE),
('TB-CBSE-2026-27-G6-SOCSCI', 'CBSE', 6, 'SOCIAL_SCIENCE', 'Exploring Society: India and Beyond', '2026-27', 1, 'Exploring Society', 'SINGLE_VOLUME', 'fess1', 'https://ncert.nic.in/textbook.php?fess1=0-7', 7, TRUE),
('TB-CBSE-2026-27-G8-MATH-P1', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-I', '2026-27', 1, 'Part I', 'PART_1', 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-7', 7, TRUE),
('TB-CBSE-2026-27-G8-MATH-P2', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-II', '2026-27', 2, 'Part II', 'PART_2', 'hegp2', 'https://ncert.nic.in/textbook.php?hegp2=0-7', 7, TRUE)
ON CONFLICT (board_id, grade_level, subject_id, edition_year, textbook_title, part_number) DO UPDATE SET
    part_title = EXCLUDED.part_title,
    package_code = EXCLUDED.package_code,
    official_code = EXCLUDED.official_code,
    official_url = EXCLUDED.official_url,
    total_chapters = EXCLUDED.total_chapters,
    is_authoritative = EXCLUDED.is_authoritative;

-- -----------------------------------------------------------------------------
-- 4. Update and Seed Mappings with Explicit Composite Key & Global Chapter Numbers
-- -----------------------------------------------------------------------------

-- Update Class 6 single-book records
UPDATE public.authoritative_curriculum_mappings
SET part_number = 1, part_title = textbook_title, package_code = 'SINGLE_VOLUME', global_chapter_no = chapter_no
WHERE grade_level = 6 AND edition_year = '2026-27';

-- Class 8 Math Part 1 (Ganita Prakash Part-I, chapters 1-7, global 1-7)
INSERT INTO public.authoritative_curriculum_mappings
(id, board_id, grade_level, subject_id, textbook_title, edition_year, part_number, part_title, package_code, chapter_no, global_chapter_no, chapter_title, is_authoritative, official_code, official_url)
VALUES
('CBSE-G8-MATH-P1-CH01', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-I', '2026-27', 1, 'Part I', 'PART_1', 1, 1, 'Rational Numbers', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-7'),
('CBSE-G8-MATH-P1-CH02', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-I', '2026-27', 1, 'Part I', 'PART_1', 2, 2, 'Linear Equations in One Variable', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-7'),
('CBSE-G8-MATH-P1-CH03', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-I', '2026-27', 1, 'Part I', 'PART_1', 3, 3, 'Understanding Quadrilaterals', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-7'),
('CBSE-G8-MATH-P1-CH04', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-I', '2026-27', 1, 'Part I', 'PART_1', 4, 4, 'Data Handling', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-7'),
('CBSE-G8-MATH-P1-CH05', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-I', '2026-27', 1, 'Part I', 'PART_1', 5, 5, 'Square and Square Roots', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-7'),
('CBSE-G8-MATH-P1-CH06', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-I', '2026-27', 1, 'Part I', 'PART_1', 6, 6, 'Cube and Cube Roots', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-7'),
('CBSE-G8-MATH-P1-CH07', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-I', '2026-27', 1, 'Part I', 'PART_1', 7, 7, 'Comparing Quantities', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-7')
ON CONFLICT (board_id, grade_level, subject_id, edition_year, textbook_title, part_number, chapter_no) DO UPDATE SET
    id = EXCLUDED.id,
    part_title = EXCLUDED.part_title,
    package_code = EXCLUDED.package_code,
    global_chapter_no = EXCLUDED.global_chapter_no,
    chapter_title = EXCLUDED.chapter_title,
    is_authoritative = EXCLUDED.is_authoritative,
    official_code = EXCLUDED.official_code,
    official_url = EXCLUDED.official_url;

-- Class 8 Math Part 2 (Ganita Prakash Part-II, chapters 1-7, global 8-14)
INSERT INTO public.authoritative_curriculum_mappings
(id, board_id, grade_level, subject_id, textbook_title, edition_year, part_number, part_title, package_code, chapter_no, global_chapter_no, chapter_title, is_authoritative, official_code, official_url)
VALUES
('CBSE-G8-MATH-P2-CH01', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-II', '2026-27', 2, 'Part II', 'PART_2', 1, 8, 'Fractions in Disguise', TRUE, 'hegp2', 'https://ncert.nic.in/textbook.php?hegp2=0-7'),
('CBSE-G8-MATH-P2-CH02', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-II', '2026-27', 2, 'Part II', 'PART_2', 2, 9, 'The Baudhayana-Pythagoras Theorem', TRUE, 'hegp2', 'https://ncert.nic.in/textbook.php?hegp2=0-7'),
('CBSE-G8-MATH-P2-CH03', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-II', '2026-27', 2, 'Part II', 'PART_2', 3, 10, 'Proportional Reasoning-2', TRUE, 'hegp2', 'https://ncert.nic.in/textbook.php?hegp2=0-7'),
('CBSE-G8-MATH-P2-CH04', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-II', '2026-27', 2, 'Part II', 'PART_2', 4, 11, 'Exploring Some Geometric Themes', TRUE, 'hegp2', 'https://ncert.nic.in/textbook.php?hegp2=0-7'),
('CBSE-G8-MATH-P2-CH05', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-II', '2026-27', 2, 'Part II', 'PART_2', 5, 12, 'Tales by Dots and Lines', TRUE, 'hegp2', 'https://ncert.nic.in/textbook.php?hegp2=0-7'),
('CBSE-G8-MATH-P2-CH06', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-II', '2026-27', 2, 'Part II', 'PART_2', 6, 13, 'Algebra Play', TRUE, 'hegp2', 'https://ncert.nic.in/textbook.php?hegp2=0-7'),
('CBSE-G8-MATH-P2-CH07', 'CBSE', 8, 'MATH', 'Ganita Prakash Part-II', '2026-27', 2, 'Part II', 'PART_2', 7, 14, 'Area', TRUE, 'hegp2', 'https://ncert.nic.in/textbook.php?hegp2=0-7')
ON CONFLICT (board_id, grade_level, subject_id, edition_year, textbook_title, part_number, chapter_no) DO UPDATE SET
    id = EXCLUDED.id,
    part_title = EXCLUDED.part_title,
    package_code = EXCLUDED.package_code,
    global_chapter_no = EXCLUDED.global_chapter_no,
    chapter_title = EXCLUDED.chapter_title,
    is_authoritative = EXCLUDED.is_authoritative,
    official_code = EXCLUDED.official_code,
    official_url = EXCLUDED.official_url;
