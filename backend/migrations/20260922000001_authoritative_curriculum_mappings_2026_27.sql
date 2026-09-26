-- =============================================================================
-- Migration: 20260922000001_authoritative_curriculum_mappings_2026_27.sql
-- Description: Authoritative NCERT 2026-27 Curriculum Baseline Mappings
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Authoritative Curriculum Mappings Table
-- Required columns:
--   board_id, grade_level, subject_id, textbook_title, edition_year,
--   chapter_no, chapter_title, is_authoritative
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.authoritative_curriculum_mappings (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
    board_id TEXT NOT NULL DEFAULT 'CBSE',
    grade_level INTEGER NOT NULL CHECK (grade_level BETWEEN 6 AND 12),
    subject_id TEXT NOT NULL,
    textbook_title TEXT NOT NULL,
    edition_year TEXT NOT NULL DEFAULT '2026-27',
    chapter_no INTEGER NOT NULL,
    chapter_title TEXT NOT NULL,
    is_authoritative BOOLEAN NOT NULL DEFAULT TRUE,
    official_code TEXT,
    official_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unq_auth_curr_mapping UNIQUE (board_id, edition_year, grade_level, subject_id, chapter_no)
);

-- -----------------------------------------------------------------------------
-- 2. Indexes for Fail-Closed Resolver Queries
-- Query pattern: {board_id: 'CBSE', edition_year: '2026-27', grade_level, subject_id}
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_auth_curr_resolver
    ON public.authoritative_curriculum_mappings(board_id, edition_year, grade_level, subject_id);

CREATE INDEX IF NOT EXISTS idx_auth_curr_board_grade
    ON public.authoritative_curriculum_mappings(board_id, grade_level);

-- -----------------------------------------------------------------------------
-- 3. Row Level Security (RLS) & Public Read Policy
-- -----------------------------------------------------------------------------
ALTER TABLE public.authoritative_curriculum_mappings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    DROP POLICY IF EXISTS "public_read_authoritative_curriculum_mappings" ON public.authoritative_curriculum_mappings;
    CREATE POLICY "public_read_authoritative_curriculum_mappings"
        ON public.authoritative_curriculum_mappings
        FOR SELECT USING (true);
END $$;

-- -----------------------------------------------------------------------------
-- 4. Seed Verified NCERT 2026-27 Baseline
-- -----------------------------------------------------------------------------

-- Class 6 Science ("Curiosity", code: fecu1, 12 chapters)
INSERT INTO public.authoritative_curriculum_mappings 
(id, board_id, grade_level, subject_id, textbook_title, edition_year, chapter_no, chapter_title, is_authoritative, official_code, official_url)
VALUES
('CBSE-2026-27-G6-SCI-CH01', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 1, 'The Wonderful World of Science', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH02', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 2, 'Diversity in the Living World', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH03', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 3, 'Mindful Eating: A Path to a Healthy Body', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH04', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 4, 'Exploring Magnets', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH05', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 5, 'Measurement of Length and Motion', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH06', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 6, 'Materials Around Us', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH07', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 7, 'Temperature and its Measurement', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH08', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 8, 'A Journey through States of Water', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH09', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 9, 'Methods of Separation in Everyday Life', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH10', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 10, 'Living Creatures: Exploring their Characteristics', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH11', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 11, 'Nature’s Treasures', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12'),
('CBSE-2026-27-G6-SCI-CH12', 'CBSE', 6, 'SCIENCE', 'Curiosity', '2026-27', 12, 'Beyond Earth', TRUE, 'fecu1', 'https://ncert.nic.in/textbook.php?fecu1=0-12')
ON CONFLICT (board_id, edition_year, grade_level, subject_id, chapter_no) DO UPDATE SET
    textbook_title = EXCLUDED.textbook_title,
    chapter_title = EXCLUDED.chapter_title,
    is_authoritative = EXCLUDED.is_authoritative,
    official_code = EXCLUDED.official_code,
    official_url = EXCLUDED.official_url;

-- Class 6 Mathematics ("Ganita Prakash", code: femh1, 10 chapters)
INSERT INTO public.authoritative_curriculum_mappings 
(id, board_id, grade_level, subject_id, textbook_title, edition_year, chapter_no, chapter_title, is_authoritative, official_code, official_url)
VALUES
('CBSE-2026-27-G6-MATH-CH01', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 1, 'Patterns in Mathematics', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH02', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 2, 'Lines and Angles', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH03', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 3, 'Number Play', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH04', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 4, 'Data Handling and Presentation', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH05', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 5, 'Prime Time', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH06', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 6, 'Perimeter and Area', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH07', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 7, 'Fractions', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH08', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 8, 'Playing with Constructions', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH09', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 9, 'Symmetry', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10'),
('CBSE-2026-27-G6-MATH-CH10', 'CBSE', 6, 'MATH', 'Ganita Prakash', '2026-27', 10, 'The Other Side of Zero', TRUE, 'femh1', 'https://ncert.nic.in/textbook.php?femh1=0-10')
ON CONFLICT (board_id, edition_year, grade_level, subject_id, chapter_no) DO UPDATE SET
    textbook_title = EXCLUDED.textbook_title,
    chapter_title = EXCLUDED.chapter_title,
    is_authoritative = EXCLUDED.is_authoritative,
    official_code = EXCLUDED.official_code,
    official_url = EXCLUDED.official_url;

-- Class 6 English ("Poorvi", code: feen1, 5 units)
INSERT INTO public.authoritative_curriculum_mappings 
(id, board_id, grade_level, subject_id, textbook_title, edition_year, chapter_no, chapter_title, is_authoritative, official_code, official_url)
VALUES
('CBSE-2026-27-G6-ENG-CH01', 'CBSE', 6, 'ENGLISH', 'Poorvi', '2026-27', 1, 'Fables and Folk Tales', TRUE, 'feen1', 'https://ncert.nic.in/textbook.php?feen1=0-5'),
('CBSE-2026-27-G6-ENG-CH02', 'CBSE', 6, 'ENGLISH', 'Poorvi', '2026-27', 2, 'Friendship', TRUE, 'feen1', 'https://ncert.nic.in/textbook.php?feen1=0-5'),
('CBSE-2026-27-G6-ENG-CH03', 'CBSE', 6, 'ENGLISH', 'Poorvi', '2026-27', 3, 'Nurturing Nature', TRUE, 'feen1', 'https://ncert.nic.in/textbook.php?feen1=0-5'),
('CBSE-2026-27-G6-ENG-CH04', 'CBSE', 6, 'ENGLISH', 'Poorvi', '2026-27', 4, 'Sports and Games', TRUE, 'feen1', 'https://ncert.nic.in/textbook.php?feen1=0-5'),
('CBSE-2026-27-G6-ENG-CH05', 'CBSE', 6, 'ENGLISH', 'Poorvi', '2026-27', 5, 'Culture and Tradition', TRUE, 'feen1', 'https://ncert.nic.in/textbook.php?feen1=0-5')
ON CONFLICT (board_id, edition_year, grade_level, subject_id, chapter_no) DO UPDATE SET
    textbook_title = EXCLUDED.textbook_title,
    chapter_title = EXCLUDED.chapter_title,
    is_authoritative = EXCLUDED.is_authoritative,
    official_code = EXCLUDED.official_code,
    official_url = EXCLUDED.official_url;

-- Class 6 Social Science ("Exploring Society: India and Beyond", code: fess1, 7 chapters)
INSERT INTO public.authoritative_curriculum_mappings 
(id, board_id, grade_level, subject_id, textbook_title, edition_year, chapter_no, chapter_title, is_authoritative, official_code, official_url)
VALUES
('CBSE-2026-27-G6-SOCSCI-CH01', 'CBSE', 6, 'SOCIAL_SCIENCE', 'Exploring Society: India and Beyond', '2026-27', 1, 'Locating Places on the Earth', TRUE, 'fess1', 'https://ncert.nic.in/textbook.php?fess1=0-7'),
('CBSE-2026-27-G6-SOCSCI-CH02', 'CBSE', 6, 'SOCIAL_SCIENCE', 'Exploring Society: India and Beyond', '2026-27', 2, 'Oceans and Continents', TRUE, 'fess1', 'https://ncert.nic.in/textbook.php?fess1=0-7'),
('CBSE-2026-27-G6-SOCSCI-CH03', 'CBSE', 6, 'SOCIAL_SCIENCE', 'Exploring Society: India and Beyond', '2026-27', 3, 'Landforms and Life', TRUE, 'fess1', 'https://ncert.nic.in/textbook.php?fess1=0-7'),
('CBSE-2026-27-G6-SOCSCI-CH04', 'CBSE', 6, 'SOCIAL_SCIENCE', 'Exploring Society: India and Beyond', '2026-27', 4, 'Timeline and Sources of History', TRUE, 'fess1', 'https://ncert.nic.in/textbook.php?fess1=0-7'),
('CBSE-2026-27-G6-SOCSCI-CH05', 'CBSE', 6, 'SOCIAL_SCIENCE', 'Exploring Society: India and Beyond', '2026-27', 5, 'India, That Is Bharat', TRUE, 'fess1', 'https://ncert.nic.in/textbook.php?fess1=0-7'),
('CBSE-2026-27-G6-SOCSCI-CH06', 'CBSE', 6, 'SOCIAL_SCIENCE', 'Exploring Society: India and Beyond', '2026-27', 6, 'The Beginnings of Indian Civilisation', TRUE, 'fess1', 'https://ncert.nic.in/textbook.php?fess1=0-7'),
('CBSE-2026-27-G6-SOCSCI-CH07', 'CBSE', 6, 'SOCIAL_SCIENCE', 'Exploring Society: India and Beyond', '2026-27', 7, 'India’s Cultural Roots', TRUE, 'fess1', 'https://ncert.nic.in/textbook.php?fess1=0-7')
ON CONFLICT (board_id, edition_year, grade_level, subject_id, chapter_no) DO UPDATE SET
    textbook_title = EXCLUDED.textbook_title,
    chapter_title = EXCLUDED.chapter_title,
    is_authoritative = EXCLUDED.is_authoritative,
    official_code = EXCLUDED.official_code,
    official_url = EXCLUDED.official_url;

-- Class 8 Mathematics ("Ganita Prakash", code: hegp1, 7 chapters)
INSERT INTO public.authoritative_curriculum_mappings 
(id, board_id, grade_level, subject_id, textbook_title, edition_year, chapter_no, chapter_title, is_authoritative, official_code, official_url)
VALUES
('CBSE-2026-27-G8-MATH-CH01', 'CBSE', 8, 'MATH', 'Ganita Prakash', '2026-27', 1, 'Rational Numbers', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-12'),
('CBSE-2026-27-G8-MATH-CH02', 'CBSE', 8, 'MATH', 'Ganita Prakash', '2026-27', 2, 'Linear Equations in One Variable', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-12'),
('CBSE-2026-27-G8-MATH-CH03', 'CBSE', 8, 'MATH', 'Ganita Prakash', '2026-27', 3, 'Understanding Quadrilaterals', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-12'),
('CBSE-2026-27-G8-MATH-CH04', 'CBSE', 8, 'MATH', 'Ganita Prakash', '2026-27', 4, 'Data Handling', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-12'),
('CBSE-2026-27-G8-MATH-CH05', 'CBSE', 8, 'MATH', 'Ganita Prakash', '2026-27', 5, 'Square and Square Roots', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-12'),
('CBSE-2026-27-G8-MATH-CH06', 'CBSE', 8, 'MATH', 'Ganita Prakash', '2026-27', 6, 'Cube and Cube Roots', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-12'),
('CBSE-2026-27-G8-MATH-CH07', 'CBSE', 8, 'MATH', 'Ganita Prakash', '2026-27', 7, 'Comparing Quantities', TRUE, 'hegp1', 'https://ncert.nic.in/textbook.php?hegp1=0-12')
ON CONFLICT (board_id, edition_year, grade_level, subject_id, chapter_no) DO UPDATE SET
    textbook_title = EXCLUDED.textbook_title,
    chapter_title = EXCLUDED.chapter_title,
    is_authoritative = EXCLUDED.is_authoritative,
    official_code = EXCLUDED.official_code,
    official_url = EXCLUDED.official_url;
