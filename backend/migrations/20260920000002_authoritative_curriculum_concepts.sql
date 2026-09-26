-- =============================================================================
-- Migration: 20260920000002_authoritative_curriculum_concepts.sql
-- Description: Authoritative Curriculum Concept Layer & Schema Extensions
-- Hierarchy:
--   boards -> academic_years -> curriculum_versions -> curriculum_sources
--          -> curriculum_documents -> textbooks -> textbook_chapters
--          -> textbook_sections -> authoritative_curriculum_concepts
--          -> concept_curriculum_mappings -> curriculum_concepts (Brainoro)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. Authoritative Curriculum Concepts Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.authoritative_curriculum_concepts (
    id TEXT PRIMARY KEY,                                -- Deterministic ID: 'AUTH-CBSE-G10-MATH-CH01-FTA' (INTERNAL_AUTHORITY_RECORD_ID)
    curriculum_version_id TEXT NOT NULL REFERENCES public.curriculum_versions(id) ON DELETE CASCADE,
    board_id TEXT NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
    grade_level INTEGER NOT NULL REFERENCES public.classes(grade_level) ON DELETE CASCADE,
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    textbook_id TEXT REFERENCES public.textbooks(id) ON DELETE SET NULL,
    chapter_id TEXT REFERENCES public.textbook_chapters(id) ON DELETE SET NULL,
    section_id TEXT REFERENCES public.textbook_sections(id) ON DELETE SET NULL,
    official_concept_code TEXT,                         -- NULL if unassigned by statutory board
    official_title TEXT NOT NULL,
    official_description TEXT,                          -- Statutory Learning Outcome / Competency Statement
    source_id TEXT NOT NULL REFERENCES public.curriculum_sources(id) ON DELETE CASCADE,
    source_document_id TEXT REFERENCES public.curriculum_documents(id) ON DELETE SET NULL,
    source_url TEXT,
    source_page TEXT,
    verification_status TEXT NOT NULL CHECK (verification_status IN ('VERIFIED', 'PENDING_REVIEW', 'UNVERIFIED')),
    evidence TEXT NOT NULL,                             -- Exact citation to statutory curriculum clause or textbook locus
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. Indexes for Authoritative Concepts
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_auth_concepts_lookup
    ON public.authoritative_curriculum_concepts(board_id, grade_level, subject_id, curriculum_version_id);

CREATE INDEX IF NOT EXISTS idx_auth_concepts_chapter
    ON public.authoritative_curriculum_concepts(chapter_id);

CREATE INDEX IF NOT EXISTS idx_auth_concepts_status
    ON public.authoritative_curriculum_concepts(verification_status);

-- -----------------------------------------------------------------------------
-- 3. Link concept_curriculum_mappings to authoritative_curriculum_concepts
-- -----------------------------------------------------------------------------
ALTER TABLE public.concept_curriculum_mappings
    ADD COLUMN IF NOT EXISTS authoritative_concept_id TEXT REFERENCES public.authoritative_curriculum_concepts(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_concept_mappings_auth_concept
    ON public.concept_curriculum_mappings(authoritative_concept_id);

-- -----------------------------------------------------------------------------
-- 4. Row Level Security (RLS)
-- -----------------------------------------------------------------------------
ALTER TABLE public.authoritative_curriculum_concepts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read authoritative_curriculum_concepts" ON public.authoritative_curriculum_concepts;
CREATE POLICY "Public read authoritative_curriculum_concepts" ON public.authoritative_curriculum_concepts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin write authoritative_curriculum_concepts" ON public.authoritative_curriculum_concepts;
CREATE POLICY "Admin write authoritative_curriculum_concepts" ON public.authoritative_curriculum_concepts FOR ALL USING (true) WITH CHECK (true);
