-- =============================================================================
-- Migration: 20260921000005_cbse_isolated_curriculum_schema.sql
-- Description: Completely Isolated CBSE 6–12 Authoritative Curriculum Schema
--              Decoupled from legacy curriculum_concepts, old units, and old topics.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. CBSE Curriculum Versions
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_curriculum_versions (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-NCERT-2024-NCF-SE', 'CBSE-NCERT-2026-27'
    version_code TEXT NOT NULL UNIQUE,         -- e.g. 'NCF-SE-2024', 'NCERT-2026'
    display_name TEXT NOT NULL,
    academic_year TEXT NOT NULL,               -- e.g. '2024-25', '2026-27'
    status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'DRAFT', 'ARCHIVED')),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. CBSE Grades (Classes 6 to 12)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_grades (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-G6', 'CBSE-G10', 'CBSE-G12'
    grade_level INTEGER NOT NULL UNIQUE CHECK (grade_level BETWEEN 6 AND 12),
    display_name TEXT NOT NULL,                -- e.g. 'Class 6', 'Class 10', 'Class 12'
    stage TEXT NOT NULL CHECK (stage IN ('MIDDLE_STAGE', 'SECONDARY_STAGE', 'SENIOR_SECONDARY_STAGE')),
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. CBSE Streams (Senior Secondary 11–12 vs General Middle/Secondary 6–10)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_streams (
    id TEXT PRIMARY KEY,                       -- e.g. 'GENERAL', 'SCIENCE', 'COMMERCE', 'HUMANITIES'
    stream_code TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. CBSE Canonical Subjects
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_subjects (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-SUB-MATH', 'CBSE-SUB-SCI', 'CBSE-SUB-PHY'
    subject_code TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. CBSE Grade-Specific Subjects (Enforces strictly valid subjects per grade)
--    Rule: Natural sciences unified under 'Science' in 6-10 (No standalone Phys/Chem/Bio).
--    Rule: Streams enabled only for 11-12.
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_grade_subjects (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-G6-MATH', 'CBSE-G11-SCI-PHY'
    grade_id TEXT NOT NULL REFERENCES public.cbse_grades(id) ON DELETE CASCADE,
    stream_id TEXT NOT NULL REFERENCES public.cbse_streams(id) ON DELETE RESTRICT,
    subject_id TEXT NOT NULL REFERENCES public.cbse_subjects(id) ON DELETE RESTRICT,
    display_name TEXT NOT NULL,
    subject_type TEXT NOT NULL CHECK (subject_type IN ('CORE', 'ELECTIVE', 'SKILL', 'LANGUAGE', 'CO_CURRICULAR')),
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(grade_id, stream_id, subject_id)
);

-- -----------------------------------------------------------------------------
-- 6. CBSE Official NCERT Textbooks
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_textbooks (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-TB-G6-MATH-GANITA-PRAKASH'
    grade_subject_id TEXT NOT NULL REFERENCES public.cbse_grade_subjects(id) ON DELETE CASCADE,
    curriculum_version_id TEXT NOT NULL REFERENCES public.cbse_curriculum_versions(id) ON DELETE RESTRICT,
    title TEXT NOT NULL,                       -- e.g. 'Ganita Prakash', 'Curiosity', 'Flamingo'
    publisher TEXT NOT NULL DEFAULT 'NCERT',
    official_code TEXT,                        -- e.g. 'femh1', 'jesc1'
    edition TEXT NOT NULL,                     -- e.g. '2024 NCF-SE Edition', '2026-27 Revised'
    official_url TEXT,
    is_primary BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 7. CBSE Textbook Parts / Volumes (Part I, Part II, etc.)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_textbook_parts (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-TB-G11-PHY-PART1'
    textbook_id TEXT NOT NULL REFERENCES public.cbse_textbooks(id) ON DELETE CASCADE,
    part_number INTEGER NOT NULL,              -- 1, 2...
    part_title TEXT NOT NULL,                  -- 'Part I', 'Part II', 'Single Volume'
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(textbook_id, part_number)
);

-- -----------------------------------------------------------------------------
-- 8. CBSE Chapters (Strictly Preserving Official NCERT Sequence Order)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_chapters (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-CH-G6-MATH-01'
    textbook_id TEXT NOT NULL REFERENCES public.cbse_textbooks(id) ON DELETE CASCADE,
    textbook_part_id TEXT REFERENCES public.cbse_textbook_parts(id) ON DELETE SET NULL,
    chapter_number INTEGER NOT NULL,           -- 1, 2, 3...
    chapter_title TEXT NOT NULL,               -- e.g. 'Lines and Angles'
    official_sequence_order INTEGER NOT NULL,  -- Non-alphabetical true textbook order
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(textbook_id, chapter_number)
);

-- -----------------------------------------------------------------------------
-- 9. CBSE Official Sections
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_sections (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-SEC-G6-MATH-02-01'
    chapter_id TEXT NOT NULL REFERENCES public.cbse_chapters(id) ON DELETE CASCADE,
    section_number TEXT NOT NULL,              -- e.g. '2.1', '2.2'
    section_title TEXT NOT NULL,               -- e.g. 'Point', 'Line'
    section_order INTEGER NOT NULL,
    source_page TEXT,
    source_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 10. CBSE Authoritative Pedagogical Concepts
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_authoritative_concepts (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-AUTH-G6-MATH-CH02-POINT'
    chapter_id TEXT NOT NULL REFERENCES public.cbse_chapters(id) ON DELETE CASCADE,
    concept_code TEXT NOT NULL,
    official_title TEXT NOT NULL,
    pedagogical_description TEXT,
    learning_outcomes TEXT[] DEFAULT '{}'::TEXT[],
    display_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 11. CBSE Concept-Section Mappings (Join Entity)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.cbse_concept_section_mappings (
    id TEXT PRIMARY KEY,
    concept_id TEXT NOT NULL REFERENCES public.cbse_authoritative_concepts(id) ON DELETE CASCADE,
    section_id TEXT NOT NULL REFERENCES public.cbse_sections(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN ('PRIMARY', 'SUPPORTING', 'PREREQUISITE')),
    display_order INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(concept_id, section_id)
);

-- -----------------------------------------------------------------------------
-- Enable Row Level Security and Public Read Access
-- -----------------------------------------------------------------------------
ALTER TABLE public.cbse_curriculum_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_grade_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_textbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_textbook_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_authoritative_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbse_concept_section_mappings ENABLE ROW LEVEL SECURITY;

-- Read policies for all users (anon & authenticated)
DO $$
BEGIN
    DROP POLICY IF EXISTS "cbse_curriculum_versions_read" ON public.cbse_curriculum_versions;
    CREATE POLICY "cbse_curriculum_versions_read" ON public.cbse_curriculum_versions FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_grades_read" ON public.cbse_grades;
    CREATE POLICY "cbse_grades_read" ON public.cbse_grades FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_streams_read" ON public.cbse_streams;
    CREATE POLICY "cbse_streams_read" ON public.cbse_streams FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_subjects_read" ON public.cbse_subjects;
    CREATE POLICY "cbse_subjects_read" ON public.cbse_subjects FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_grade_subjects_read" ON public.cbse_grade_subjects;
    CREATE POLICY "cbse_grade_subjects_read" ON public.cbse_grade_subjects FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_textbooks_read" ON public.cbse_textbooks;
    CREATE POLICY "cbse_textbooks_read" ON public.cbse_textbooks FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_textbook_parts_read" ON public.cbse_textbook_parts;
    CREATE POLICY "cbse_textbook_parts_read" ON public.cbse_textbook_parts FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_chapters_read" ON public.cbse_chapters;
    CREATE POLICY "cbse_chapters_read" ON public.cbse_chapters FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_sections_read" ON public.cbse_sections;
    CREATE POLICY "cbse_sections_read" ON public.cbse_sections FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_authoritative_concepts_read" ON public.cbse_authoritative_concepts;
    CREATE POLICY "cbse_authoritative_concepts_read" ON public.cbse_authoritative_concepts FOR SELECT USING (true);

    DROP POLICY IF EXISTS "cbse_concept_section_mappings_read" ON public.cbse_concept_section_mappings;
    CREATE POLICY "cbse_concept_section_mappings_read" ON public.cbse_concept_section_mappings FOR SELECT USING (true);
END $$;

-- -----------------------------------------------------------------------------
-- Indexes for High-Performance Hierarchy Traversal
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_cbse_grade_subjects_lookup ON public.cbse_grade_subjects(grade_id, stream_id);
CREATE INDEX IF NOT EXISTS idx_cbse_textbooks_grade_subject ON public.cbse_textbooks(grade_subject_id);
CREATE INDEX IF NOT EXISTS idx_cbse_chapters_textbook_seq ON public.cbse_chapters(textbook_id, official_sequence_order);
CREATE INDEX IF NOT EXISTS idx_cbse_sections_chapter_order ON public.cbse_sections(chapter_id, section_order);
CREATE INDEX IF NOT EXISTS idx_cbse_concepts_chapter ON public.cbse_authoritative_concepts(chapter_id);
