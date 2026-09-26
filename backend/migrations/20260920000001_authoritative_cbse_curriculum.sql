-- =============================================================================
-- Migration: 20260920000001_authoritative_cbse_curriculum.sql
-- Description: Authoritative CBSE/NCERT Curriculum Source of Truth Layer
-- Hierarchy:
--   boards -> academic_years -> curriculum_versions -> curriculum_sources
--          -> curriculum_documents -> textbooks -> textbook_chapters
--          -> textbook_sections -> curriculum_units -> curriculum_topics
--          -> concept_curriculum_mappings -> curriculum_concepts
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Academic Years
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.academic_years (
    id TEXT PRIMARY KEY,                       -- e.g. '2026-27', '2025-26'
    name TEXT NOT NULL,                        -- e.g. 'Academic Year 2026-2027'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('ACTIVE', 'UPCOMING', 'ARCHIVED', 'DEPRECATED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. Curriculum Versions
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_versions (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-2026-27-OFFICIAL'
    board_id TEXT NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
    academic_year_id TEXT NOT NULL REFERENCES public.academic_years(id) ON DELETE CASCADE,
    version_tag TEXT NOT NULL,                 -- e.g. 'CBSE-NCERT-2026.1'
    status TEXT NOT NULL CHECK (status IN ('OFFICIAL_ADOPTED', 'DRAFT', 'DEPRECATED')),
    effective_from DATE NOT NULL,
    effective_to DATE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(board_id, academic_year_id, version_tag)
);

-- -----------------------------------------------------------------------------
-- 3. Curriculum Sources & Publishing Authorities
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_sources (
    id TEXT PRIMARY KEY,                       -- e.g. 'SRC-NCERT-OFFICIAL'
    source_type TEXT NOT NULL CHECK (source_type IN (
        'OFFICIAL_GOVERNMENT_GAZETTE',
        'OFFICIAL_BOARD_PORTAL',
        'OFFICIAL_TEXTBOOK_PORTAL',
        'STATUTORY_CURRICULUM_FRAMEWORK'
    )),
    source_name TEXT NOT NULL,                 -- e.g. 'National Council of Educational Research and Training'
    publisher_authority TEXT NOT NULL,         -- e.g. 'NCERT / Ministry of Education, Govt. of India'
    official_url TEXT NOT NULL,                -- e.g. 'https://ncert.nic.in/textbook.php'
    license_or_copyright_notes TEXT NOT NULL, -- e.g. 'NCERT Official Curriculum / Educational Non-Commercial Standard'
    verification_status TEXT NOT NULL CHECK (verification_status IN ('VERIFIED', 'PENDING_REVIEW', 'UNVERIFIED')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. Official Curriculum Documents
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_documents (
    id TEXT PRIMARY KEY,                       -- e.g. 'DOC-CBSE-SEC-2026'
    curriculum_version_id TEXT NOT NULL REFERENCES public.curriculum_versions(id) ON DELETE CASCADE,
    source_id TEXT NOT NULL REFERENCES public.curriculum_sources(id) ON DELETE CASCADE,
    document_title TEXT NOT NULL,              -- e.g. 'CBSE Secondary School Curriculum (Classes IX-X) 2026-27'
    document_identifier TEXT NOT NULL,         -- e.g. 'CBSE/ACAD/CURR/2026-27'
    document_url TEXT,
    publication_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(curriculum_version_id, document_identifier)
);

-- -----------------------------------------------------------------------------
-- 5. Official Textbooks
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.textbooks (
    id TEXT PRIMARY KEY,                       -- e.g. 'TB-NCERT-G9-MATH-2026'
    board_id TEXT NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
    grade_level INTEGER NOT NULL REFERENCES public.classes(grade_level) ON DELETE CASCADE,
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    curriculum_version_id TEXT NOT NULL REFERENCES public.curriculum_versions(id) ON DELETE CASCADE,
    source_id TEXT NOT NULL REFERENCES public.curriculum_sources(id) ON DELETE CASCADE,
    title TEXT NOT NULL,                       -- e.g. 'Mathematics Textbook for Class IX'
    publisher TEXT NOT NULL,                   -- e.g. 'NCERT'
    edition_or_version TEXT NOT NULL,          -- e.g. '2026-27 Revised Edition'
    official_url TEXT,
    isbn_or_code TEXT,
    verification_status TEXT NOT NULL CHECK (verification_status IN ('VERIFIED', 'PENDING_REVIEW', 'DEPRECATED')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(board_id, grade_level, subject_id, curriculum_version_id, title)
);

-- -----------------------------------------------------------------------------
-- 6. Textbook Chapters
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.textbook_chapters (
    id TEXT PRIMARY KEY,                       -- e.g. 'CH-NCERT-G9-MATH-01'
    textbook_id TEXT NOT NULL REFERENCES public.textbooks(id) ON DELETE CASCADE,
    chapter_number INTEGER NOT NULL,           -- 1, 2, 3...
    chapter_title TEXT NOT NULL,               -- e.g. 'Number Systems'
    page_range TEXT,                           -- e.g. '1-30'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(textbook_id, chapter_number)
);

-- -----------------------------------------------------------------------------
-- 7. Textbook Sections
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.textbook_sections (
    id TEXT PRIMARY KEY,                       -- e.g. 'SEC-NCERT-G9-MATH-01-01'
    chapter_id TEXT NOT NULL REFERENCES public.textbook_chapters(id) ON DELETE CASCADE,
    section_number TEXT NOT NULL,              -- e.g. '1.1', '1.2'
    section_title TEXT NOT NULL,               -- e.g. 'Irrational Numbers'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(chapter_id, section_number)
);

-- -----------------------------------------------------------------------------
-- 8. Controlled Concept-to-Curriculum Mappings
-- (Maps between authoritative curriculum and Brainoro learning concepts)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.concept_curriculum_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brainoro_concept_id TEXT NOT NULL REFERENCES public.curriculum_concepts(id) ON DELETE CASCADE,
    curriculum_version_id TEXT NOT NULL REFERENCES public.curriculum_versions(id) ON DELETE CASCADE,
    textbook_id TEXT REFERENCES public.textbooks(id) ON DELETE SET NULL,
    chapter_id TEXT REFERENCES public.textbook_chapters(id) ON DELETE SET NULL,
    section_id TEXT REFERENCES public.textbook_sections(id) ON DELETE SET NULL,
    topic_id TEXT REFERENCES public.topics(id) ON DELETE SET NULL,
    mapping_state TEXT NOT NULL CHECK (mapping_state IN (
        'VERIFIED',
        'PENDING_REVIEW',
        'UNMAPPED',
        'CONFLICT',
        'DEPRECATED'
    )),
    confidence_score NUMERIC(3, 2) NOT NULL CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
    evidence TEXT NOT NULL,                    -- Detailed rationale and textbook cross-reference
    review_notes TEXT,
    verified_at TIMESTAMPTZ,
    verified_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(brainoro_concept_id, curriculum_version_id)
);

-- -----------------------------------------------------------------------------
-- 9. Curriculum Validation Results (Persistent Audit Log)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_validation_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_run_at TIMESTAMPTZ DEFAULT NOW(),
    rule_name TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('INFO', 'WARNING', 'ERROR', 'CRITICAL')),
    entity_type TEXT NOT NULL,                 -- 'CONCEPT', 'TEXTBOOK', 'CHAPTER', 'MAPPING'
    entity_id TEXT NOT NULL,
    details JSONB NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 10. Performance Indexes
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_curriculum_versions_board_year
    ON public.curriculum_versions(board_id, academic_year_id);

CREATE INDEX IF NOT EXISTS idx_textbooks_lookup
    ON public.textbooks(board_id, grade_level, subject_id, curriculum_version_id);

CREATE INDEX IF NOT EXISTS idx_textbook_chapters_lookup
    ON public.textbook_chapters(textbook_id, chapter_number);

CREATE INDEX IF NOT EXISTS idx_textbook_sections_lookup
    ON public.textbook_sections(chapter_id, section_number);

CREATE INDEX IF NOT EXISTS idx_concept_mappings_concept
    ON public.concept_curriculum_mappings(brainoro_concept_id);

CREATE INDEX IF NOT EXISTS idx_concept_mappings_version
    ON public.concept_curriculum_mappings(curriculum_version_id);

CREATE INDEX IF NOT EXISTS idx_concept_mappings_state
    ON public.concept_curriculum_mappings(mapping_state);

CREATE INDEX IF NOT EXISTS idx_validation_results_severity
    ON public.curriculum_validation_results(severity, resolved);

-- -----------------------------------------------------------------------------
-- 11. Row Level Security (RLS)
-- -----------------------------------------------------------------------------
ALTER TABLE public.academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.textbooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.textbook_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.textbook_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.concept_curriculum_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_validation_results ENABLE ROW LEVEL SECURITY;

-- Public Read Access Policies (Students / Anonymous / Authenticated)
DROP POLICY IF EXISTS "Public read academic_years" ON public.academic_years;
CREATE POLICY "Public read academic_years" ON public.academic_years FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read curriculum_versions" ON public.curriculum_versions;
CREATE POLICY "Public read curriculum_versions" ON public.curriculum_versions FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read curriculum_sources" ON public.curriculum_sources;
CREATE POLICY "Public read curriculum_sources" ON public.curriculum_sources FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read curriculum_documents" ON public.curriculum_documents;
CREATE POLICY "Public read curriculum_documents" ON public.curriculum_documents FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read textbooks" ON public.textbooks;
CREATE POLICY "Public read textbooks" ON public.textbooks FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read textbook_chapters" ON public.textbook_chapters;
CREATE POLICY "Public read textbook_chapters" ON public.textbook_chapters FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read textbook_sections" ON public.textbook_sections;
CREATE POLICY "Public read textbook_sections" ON public.textbook_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read concept_curriculum_mappings" ON public.concept_curriculum_mappings;
CREATE POLICY "Public read concept_curriculum_mappings" ON public.concept_curriculum_mappings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read curriculum_validation_results" ON public.curriculum_validation_results;
CREATE POLICY "Public read curriculum_validation_results" ON public.curriculum_validation_results FOR SELECT USING (true);

-- Admin Write Access Policies
DROP POLICY IF EXISTS "Admin write academic_years" ON public.academic_years;
CREATE POLICY "Admin write academic_years" ON public.academic_years FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write curriculum_versions" ON public.curriculum_versions;
CREATE POLICY "Admin write curriculum_versions" ON public.curriculum_versions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write curriculum_sources" ON public.curriculum_sources;
CREATE POLICY "Admin write curriculum_sources" ON public.curriculum_sources FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write curriculum_documents" ON public.curriculum_documents;
CREATE POLICY "Admin write curriculum_documents" ON public.curriculum_documents FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write textbooks" ON public.textbooks;
CREATE POLICY "Admin write textbooks" ON public.textbooks FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write textbook_chapters" ON public.textbook_chapters;
CREATE POLICY "Admin write textbook_chapters" ON public.textbook_chapters FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write textbook_sections" ON public.textbook_sections;
CREATE POLICY "Admin write textbook_sections" ON public.textbook_sections FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write concept_curriculum_mappings" ON public.concept_curriculum_mappings;
CREATE POLICY "Admin write concept_curriculum_mappings" ON public.concept_curriculum_mappings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write curriculum_validation_results" ON public.curriculum_validation_results;
CREATE POLICY "Admin write curriculum_validation_results" ON public.curriculum_validation_results FOR ALL USING (true) WITH CHECK (true);
