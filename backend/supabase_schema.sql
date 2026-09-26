-- =============================================================================
-- Brainoro OS (Powered by OcaVerse) — Comprehensive EdTech Database Schema
-- Normalized Tables: boards, classes, subjects, units, topics, content_modules
-- High-Performance Unified Table: curriculum_concepts
-- =============================================================================

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Educational Boards
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.boards (
    id TEXT PRIMARY KEY,                       -- 'CBSE', 'CAMBRIDGE', 'IB_MYP'
    display_name TEXT NOT NULL,                -- e.g. 'Central Board of Secondary Education'
    description TEXT,                          -- Pedagogical emphasis
    default_grading_system TEXT NOT NULL,      -- 'PERCENTAGE', 'CRITERIA_1_7'
    badge_color TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. Classes / Grade Levels (Grades 6 - 10)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.classes (
    id TEXT PRIMARY KEY,                       -- 'G6', 'G7', 'G8', 'G9', 'G10'
    grade_level INTEGER NOT NULL UNIQUE,      -- 6, 7, 8, 9, 10
    name TEXT NOT NULL,                        -- 'Class 6', 'Class 7', etc.
    stage TEXT NOT NULL                        -- 'Middle Years', 'Secondary'
);

-- -----------------------------------------------------------------------------
-- 3. Core Subjects
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subjects (
    id TEXT PRIMARY KEY,                       -- 'MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY'
    display_name TEXT NOT NULL,                -- 'Mathematics', 'Physics', 'Chemistry', 'Biology'
    icon TEXT
);

-- -----------------------------------------------------------------------------
-- 4. Units / Modules
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.units (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-G9-MATH-U1'
    board_id TEXT NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
    grade_level INTEGER NOT NULL REFERENCES public.classes(grade_level) ON DELETE CASCADE,
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    unit_number INTEGER NOT NULL,              -- 1, 2, 3, etc.
    title TEXT NOT NULL,                       -- e.g. 'Unit 1: Number Systems'
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. Topics / Concept Nodes
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.topics (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-G9-MATH-LINEQ'
    unit_id TEXT REFERENCES public.units(id) ON DELETE SET NULL,
    board_id TEXT NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
    grade_level INTEGER NOT NULL REFERENCES public.classes(grade_level) ON DELETE CASCADE,
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,                       -- e.g. 'Linear Equations in Two Variables'
    core_logic_essence TEXT NOT NULL,          -- Foundational invariant principle
    parent_node_id TEXT,                       -- Upstream prerequisite node ID
    prerequisites JSONB DEFAULT '[]'::jsonb,   -- Array of concept IDs
    metadata JSONB DEFAULT '{}'::jsonb,        -- OER license, pedagogical tags, OcaVerse metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 6. Dynamic Content Modules (Cornell Notes, Worked Examples, Quizzes)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_modules (
    id TEXT PRIMARY KEY,                       -- e.g. 'MOD-CBSE-G9-MATH-LINEQ-CORNELL'
    topic_id TEXT NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    grade_level INTEGER,                       -- Enforces pedagogical scope boundary
    payload_fingerprint TEXT UNIQUE,           -- Enforces strict unique payload fingerprints across all concepts
    module_type TEXT NOT NULL,                 -- 'CORNELL_NOTES', 'WORKED_EXAMPLE', 'IRT_QUIZ', 'SPACED_CARD'
    content JSONB NOT NULL,                    -- Structured pedagogical payload
    ocaverse_metadata JSONB DEFAULT '{"watermark": "Protected by OcaVerse Guardrail", "version": "2.0"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique index ensuring no two distinct concepts can share identical payload fingerprints
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_module_fingerprint 
    ON public.content_modules(payload_fingerprint) 
    WHERE payload_fingerprint IS NOT NULL;

-- Trigger to enforce Pedagogical Scope Boundary Lock on content_modules
CREATE OR REPLACE FUNCTION public.validate_content_module_grade()
RETURNS TRIGGER AS $$
DECLARE
    topic_grade INTEGER;
BEGIN
    SELECT grade_level INTO topic_grade FROM public.topics WHERE id = NEW.topic_id;
    IF topic_grade IS NOT NULL THEN
        IF NEW.grade_level IS NOT NULL AND NEW.grade_level <> topic_grade THEN
            RAISE EXCEPTION 'Pedagogical Boundary Error: Content module grade % does not match topic grade %', NEW.grade_level, topic_grade;
        END IF;
        NEW.grade_level := topic_grade;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_content_module_grade ON public.content_modules;
CREATE TRIGGER trg_validate_content_module_grade
    BEFORE INSERT OR UPDATE ON public.content_modules
    FOR EACH ROW EXECUTE FUNCTION public.validate_content_module_grade();

-- Trigger to enforce Strict Payload Fingerprint Uniqueness across distinct concepts
CREATE OR REPLACE FUNCTION public.validate_content_module_fingerprint()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payload_fingerprint IS NOT NULL THEN
        IF EXISTS (
            SELECT 1 FROM public.content_modules 
            WHERE payload_fingerprint = NEW.payload_fingerprint 
              AND topic_id <> NEW.topic_id
        ) THEN
            RAISE EXCEPTION 'Fingerprint Collision Error: Concept % shares identical payload fingerprint with an existing concept', NEW.topic_id;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_validate_content_module_fingerprint ON public.content_modules;
CREATE TRIGGER trg_validate_content_module_fingerprint
    BEFORE INSERT OR UPDATE ON public.content_modules
    FOR EACH ROW EXECUTE FUNCTION public.validate_content_module_fingerprint();



-- -----------------------------------------------------------------------------
-- 7. Unified High-Performance Curriculum Concepts Table
-- (Maintained for single-query sub-millisecond client hydration)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.curriculum_concepts (
    id TEXT PRIMARY KEY,                       -- e.g. 'CBSE-G9-MATH-LINEQ'
    board_id TEXT NOT NULL,                    -- 'CBSE', 'CAMBRIDGE', 'IB_MYP'
    subject_id TEXT NOT NULL,                  -- 'MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY'
    grade_level INTEGER NOT NULL,              -- 6, 7, 8, 9, 10
    unit TEXT DEFAULT 'Unit 1: Foundations',   -- e.g. 'Unit 1: Real Numbers & Number Systems'
    title TEXT NOT NULL,                       -- e.g. 'Linear Equations in Two Variables'
    core_logic_essence TEXT NOT NULL,          -- Foundational mathematical or physical rule
    parent_node_id TEXT,                       -- Upstream prerequisite node ID
    prerequisites JSONB DEFAULT '[]'::jsonb,   -- Array of prerequisite concept IDs
    metadata JSONB DEFAULT '{}'::jsonb,        -- Pedagogical tags, blooms level, OER license, OcaVerse
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lookup indexes for fast queries and runtime filtering
CREATE INDEX IF NOT EXISTS idx_units_lookup ON public.units(board_id, grade_level, subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_lookup ON public.topics(board_id, grade_level, subject_id);
CREATE INDEX IF NOT EXISTS idx_topics_unit ON public.topics(unit_id);
CREATE INDEX IF NOT EXISTS idx_content_topic ON public.content_modules(topic_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_concepts_board ON public.curriculum_concepts(board_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_concepts_subject ON public.curriculum_concepts(subject_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_concepts_grade ON public.curriculum_concepts(grade_level);
CREATE INDEX IF NOT EXISTS idx_curriculum_concepts_unit ON public.curriculum_concepts(unit);
CREATE INDEX IF NOT EXISTS idx_curriculum_concepts_parent ON public.curriculum_concepts(parent_node_id);
CREATE INDEX IF NOT EXISTS idx_curriculum_concepts_metadata_gin ON public.curriculum_concepts USING gin (metadata);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curriculum_concepts ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
DROP POLICY IF EXISTS "Public read access for boards" ON public.boards;
CREATE POLICY "Public read access for boards" ON public.boards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for classes" ON public.classes;
CREATE POLICY "Public read access for classes" ON public.classes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for subjects" ON public.subjects;
CREATE POLICY "Public read access for subjects" ON public.subjects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for units" ON public.units;
CREATE POLICY "Public read access for units" ON public.units FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for topics" ON public.topics;
CREATE POLICY "Public read access for topics" ON public.topics FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for content_modules" ON public.content_modules;
CREATE POLICY "Public read access for content_modules" ON public.content_modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for curriculum_concepts" ON public.curriculum_concepts;
CREATE POLICY "Public read access for curriculum_concepts" ON public.curriculum_concepts FOR SELECT USING (true);

-- Admin / Ingestion Write Policies
DROP POLICY IF EXISTS "Admin write access for boards" ON public.boards;
CREATE POLICY "Admin write access for boards" ON public.boards FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write access for classes" ON public.classes;
CREATE POLICY "Admin write access for classes" ON public.classes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write access for subjects" ON public.subjects;
CREATE POLICY "Admin write access for subjects" ON public.subjects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write access for units" ON public.units;
CREATE POLICY "Admin write access for units" ON public.units FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write access for topics" ON public.topics;
CREATE POLICY "Admin write access for topics" ON public.topics FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write access for content_modules" ON public.content_modules;
CREATE POLICY "Admin write access for content_modules" ON public.content_modules FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin write access for curriculum_concepts" ON public.curriculum_concepts;
CREATE POLICY "Admin write access for curriculum_concepts" ON public.curriculum_concepts FOR ALL USING (true) WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_curriculum_concepts_updated_at ON public.curriculum_concepts;
CREATE TRIGGER set_curriculum_concepts_updated_at
    BEFORE UPDATE ON public.curriculum_concepts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_topics_updated_at ON public.topics;
CREATE TRIGGER set_topics_updated_at
    BEFORE UPDATE ON public.topics
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
