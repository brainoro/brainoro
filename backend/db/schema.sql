-- ============================================================================
-- Brainoro Next-Gen K-12 Learning OS: PostgreSQL / Supabase Production DDL
-- Design Pattern: Open-Closed Principle (Polymorphic Registries & Schema Decoupling)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. EXTENSIBLE CONFIGURATION REGISTRIES
-- New boards/subjects are added via pure database INSERTs without altering core application schemas.
CREATE TABLE IF NOT EXISTS lookup_boards (
    id VARCHAR(32) PRIMARY KEY, -- e.g. 'CBSE', 'CAMBRIDGE', 'IB_MYP', 'TEXAS_TEKS'
    display_name TEXT NOT NULL,
    default_grading_system VARCHAR(32) NOT NULL, -- 'PERCENTAGE', 'CRITERIA_1_7', 'LETTER_GRADE'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lookup_subjects (
    id VARCHAR(32) PRIMARY KEY, -- e.g. 'MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'HISTORY'
    display_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. USER PROFILE CORE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    board_id VARCHAR(32) REFERENCES lookup_boards(id) ON DELETE SET NULL,
    grade_level INT NOT NULL, -- e.g. 6, 7, 8, 9, 10, 11 (Completely generic index)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. POLYMORPHIC CONCEPTS TREE
-- Alphanumeric compound keys allow infinite horizontal scaling across boards and grades.
CREATE TABLE IF NOT EXISTS curriculum_concepts (
    id VARCHAR(64) PRIMARY KEY, -- Schema Example: 'CBSE-G9-MATH-LINEQ' or 'CAMBRIDGE-G10-PHYS-KINEM'
    board_id VARCHAR(32) REFERENCES lookup_boards(id) ON DELETE CASCADE,
    subject_id VARCHAR(32) REFERENCES lookup_subjects(id) ON DELETE CASCADE,
    grade_level INT NOT NULL,
    title TEXT NOT NULL,
    core_logic_essence TEXT NOT NULL, -- Pure mathematical/physical concept without board-specific wrappers
    parent_node_id VARCHAR(64) REFERENCES curriculum_concepts(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ADJACENCY LIST PREREQUISITE GRAPH
-- Direct DAG representation enabling upstream root-cause remediation traversal.
CREATE TABLE IF NOT EXISTS concept_dependencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prerequisite_concept_id VARCHAR(64) REFERENCES curriculum_concepts(id) ON DELETE CASCADE,
    target_concept_id VARCHAR(64) REFERENCES curriculum_concepts(id) ON DELETE CASCADE,
    dependency_weight FLOAT DEFAULT 1.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(prerequisite_concept_id, target_concept_id)
);

-- 5. COGNITIVE MEMORY TRACKING (SM-2 / Leitner Variant)
-- Completely agnostic of subject matter or board taxonomy.
CREATE TABLE IF NOT EXISTS student_memory_states (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    concept_id VARCHAR(64) REFERENCES curriculum_concepts(id) ON DELETE CASCADE,
    interval_days INT DEFAULT 1,
    repetition_count INT DEFAULT 0,
    ease_factor FLOAT DEFAULT 2.5,
    retention_stability FLOAT DEFAULT 1.0, -- Memory half-life stability parameter S in days
    is_hard_to_memorize BOOLEAN DEFAULT FALSE,
    next_review_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    last_reviewed_timestamp TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, concept_id)
);

-- 6. PSYCHOMETRIC ASSESSMENT ITEMS (1PL/2PL Item Response Theory)
-- Normalized psychometric boundaries independent of question topic.
CREATE TABLE IF NOT EXISTS assessment_items (
    id VARCHAR(64) PRIMARY KEY,
    concept_id VARCHAR(64) REFERENCES curriculum_concepts(id) ON DELETE CASCADE,
    board_type VARCHAR(32) REFERENCES lookup_boards(id) ON DELETE CASCADE,
    prompt TEXT NOT NULL,
    sample_solution TEXT NOT NULL,
    difficulty_b FLOAT NOT NULL DEFAULT 0.0,    -- IRT Difficulty parameter b in [-3.0, +3.0]
    discrimination_a FLOAT NOT NULL DEFAULT 1.0, -- IRT Discrimination parameter a in [0.5, 2.5]
    guessing_c FLOAT NOT NULL DEFAULT 0.0,       -- IRT Guessing parameter c
    command_word VARCHAR(32),                   -- Cambridge constraint: 'Calculate', 'Deduce', 'State'
    rubric_criteria JSONB,                      -- IB MYP Criteria A-D breakdown
    procedural_steps JSONB,                     -- CBSE Step proof validation checkpoints
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. STUDENT ASSESSMENT RESPONSES
CREATE TABLE IF NOT EXISTS student_assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    item_id VARCHAR(64) REFERENCES assessment_items(id) ON DELETE CASCADE,
    is_correct BOOLEAN NOT NULL,
    submitted_answer TEXT,
    step_scores JSONB,
    evaluated_theta_before FLOAT,
    evaluated_theta_after FLOAT,
    response_time_seconds FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict student data isolation using Supabase auth context.
-- ============================================================================

-- Enable RLS on user-specific tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_memory_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_assessment_responses ENABLE ROW LEVEL SECURITY;

-- Read public registries
ALTER TABLE lookup_boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE lookup_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_concepts ENABLE ROW LEVEL SECURITY;
ALTER TABLE concept_dependencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on lookup_boards" 
    ON lookup_boards FOR SELECT USING (true);

CREATE POLICY "Allow public read on lookup_subjects" 
    ON lookup_subjects FOR SELECT USING (true);

CREATE POLICY "Allow public read on curriculum_concepts" 
    ON curriculum_concepts FOR SELECT USING (true);

CREATE POLICY "Allow public read on concept_dependencies" 
    ON concept_dependencies FOR SELECT USING (true);

CREATE POLICY "Allow public read on assessment_items" 
    ON assessment_items FOR SELECT USING (true);

-- User-specific security policies
CREATE POLICY "Users can only read and update their own profile" 
    ON users 
    FOR ALL 
    USING (auth.uid() = id) 
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Students can only access their own memory states" 
    ON student_memory_states 
    FOR ALL 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Students can only access their own assessment responses" 
    ON student_assessment_responses 
    FOR ALL 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 100% SYNTHETIC & ORIGINAL SEED DATA
-- (Zero proprietary exam questions or copyrighted textbook materials)
-- ============================================================================

-- 1. Lookup Boards
INSERT INTO lookup_boards (id, display_name, default_grading_system) VALUES
('CBSE', 'Central Board of Secondary Education (CBSE)', 'PERCENTAGE'),
('CAMBRIDGE', 'Cambridge Assessment International Education (CIE)', 'PERCENTAGE'),
('IB_MYP', 'International Baccalaureate Middle Years Programme (IB MYP)', 'CRITERIA_1_7')
ON CONFLICT (id) DO UPDATE SET display_name = EXCLUDED.display_name;

-- 2. Lookup Subjects
INSERT INTO lookup_subjects (id, display_name) VALUES
('MATH', 'Mathematics'),
('PHYSICS', 'Physics'),
('SCIENCE', 'Integrated Sciences'),
('CHEMISTRY', 'Chemistry')
ON CONFLICT (id) DO UPDATE SET display_name = EXCLUDED.display_name;

-- 3. Synthetic Curriculum Concepts
-- Tree Structure: Arithmetic -> Algebraic Expressions -> Linear Equations -> Systems of Equations
INSERT INTO curriculum_concepts (id, board_id, subject_id, grade_level, title, core_logic_essence, parent_node_id) VALUES
-- Foundation (Parent node)
('CBSE-G9-MATH-NUMSYS', 'CBSE', 'MATH', 9, 'Real Number Representations & Density', 'The continuum of rational and irrational quantities on a 1-dimensional metric axis.', NULL),
-- Intermediate concept
('CBSE-G9-MATH-ALGEXP', 'CBSE', 'MATH', 9, 'Algebraic Expressions & Factorization', 'Preserving algebraic equivalence under distributive and polynomial identity transformations.', 'CBSE-G9-MATH-NUMSYS'),
-- Target concept
('CBSE-G9-MATH-LINEQ', 'CBSE', 'MATH', 9, 'Linear Equations in Two Variables', 'A constraint relation ax + by + c = 0 producing an infinite set of collinear ordered pairs.', 'CBSE-G9-MATH-ALGEXP'),

-- Cambridge IGCSE Physics Tree
('CAMBRIDGE-G10-PHYS-VECT', 'CAMBRIDGE', 'PHYSICS', 10, 'Scalar vs Vector Kinematics', 'Decomposition of physical states into directional magnitude components.', NULL),
('CAMBRIDGE-G10-PHYS-ACCEL', 'CAMBRIDGE', 'PHYSICS', 10, 'Uniform Acceleration Dynamics', 'Rates of change of displacement governed by constant second-order time derivatives.', 'CAMBRIDGE-G10-PHYS-VECT'),
('CAMBRIDGE-G10-PHYS-NEWTON', 'CAMBRIDGE', 'PHYSICS', 10, 'Newtonian Force Balances', 'Summation of vector forces determining net instantaneous acceleration: F_net = m * a.', 'CAMBRIDGE-G10-PHYS-ACCEL'),

-- IB MYP Integrated Science Tree
('IB_MYP-Y4-SCI-CELL', 'IB_MYP', 'SCIENCE', 9, 'Cellular Energetics & Membranes', 'Selective permeability and metabolic biochemical exchange mechanisms in bounded cellular structures.', NULL),
('IB_MYP-Y4-SCI-ECOSYS', 'IB_MYP', 'SCIENCE', 9, 'Trophic Energy Flow & Thermodynamics', 'Second law thermodynamic dissipation (10% rule) across interconnected biological biomass pyramids.', 'IB_MYP-Y4-SCI-CELL')
ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title, core_logic_essence = EXCLUDED.core_logic_essence;

-- 4. Concept Dependencies
INSERT INTO concept_dependencies (prerequisite_concept_id, target_concept_id, dependency_weight) VALUES
('CBSE-G9-MATH-NUMSYS', 'CBSE-G9-MATH-ALGEXP', 0.9),
('CBSE-G9-MATH-ALGEXP', 'CBSE-G9-MATH-LINEQ', 1.0),
('CAMBRIDGE-G10-PHYS-VECT', 'CAMBRIDGE-G10-PHYS-ACCEL', 0.85),
('CAMBRIDGE-G10-PHYS-ACCEL', 'CAMBRIDGE-G10-PHYS-NEWTON', 1.0),
('IB_MYP-Y4-SCI-CELL', 'IB_MYP-Y4-SCI-ECOSYS', 0.75)
ON CONFLICT (prerequisite_concept_id, target_concept_id) DO NOTHING;

-- 5. 100% Synthetic Assessment Items with Psychometric IRT Bounds
INSERT INTO assessment_items 
(id, concept_id, board_type, prompt, sample_solution, difficulty_b, discrimination_a, guessing_c, command_word, rubric_criteria, procedural_steps) 
VALUES
(
    'ITEM-CBSE-LINEQ-01',
    'CBSE-G9-MATH-LINEQ',
    'CBSE',
    'Express the relationship 5x - 3y = 15 in standard intercept form ax + by + c = 0, and systematically determine two distinct coordinate pairs that satisfy the locus.',
    'Step 1: 5x - 3y - 15 = 0 (a=5, b=-3, c=-15). Step 2: At x=0, y=-5 -> (0, -5). Step 3: At y=0, x=3 -> (3, 0).',
    -0.45, -- Moderate foundational difficulty
    1.2,
    0.0,
    NULL,
    NULL,
    '[{"step": 1, "instruction": "Rearrange equation into ax + by + c = 0", "expected": "5x - 3y - 15 = 0"}, {"step": 2, "instruction": "Evaluate y when x = 0", "expected": "-5"}, {"step": 3, "instruction": "Evaluate x when y = 0", "expected": "3"}]'::jsonb
),
(
    'ITEM-CAMBRIDGE-NEWTON-01',
    'CAMBRIDGE-G10-PHYS-NEWTON',
    'CAMBRIDGE',
    'A synthetic research drone of mass 2.40 kg accelerates vertically upwards from rest. The motor supplies a constant upward thrust of 35.0 N against a gravitational field strength g = 9.81 N/kg. Calculate the net acceleration of the drone to 3 significant figures, and deduce the velocity after 4.00 s.',
    'Weight W = 2.40 * 9.81 = 23.544 N. Net Force = 35.0 - 23.544 = 11.456 N. Acceleration a = 11.456 / 2.40 = 4.77 m/s^2. Velocity v = u + at = 0 + (4.773 * 4.00) = 19.1 m/s.',
    0.65, -- Higher psychometric difficulty
    1.65,
    0.0,
    'Calculate & Deduce',
    NULL,
    NULL
),
(
    'ITEM-IB-ECOSYS-01',
    'IB_MYP-Y4-SCI-ECOSYS',
    'IB_MYP',
    'Evaluate the thermodynamic implications when a temperate wetland food web experiences an invasive primary consumer introduction that assimilates 45% of available phytoplankton biomass. Predict the trophic cascade on secondary carnivores and discuss the societal and ecological management trade-offs.',
    'Criterion A (Knowledge): Explains 10% trophic efficiency and biomass dissipation. Criterion D (Reflecting): Formulates synthetic balancing solutions balancing human watershed usage against biodiversity conservation.',
    0.85, -- Complex holistic inquiry
    1.4,
    0.0,
    NULL,
    '{"criterion_a": {"title": "Knowing & Understanding", "max_score": 8}, "criterion_b": {"title": "Inquiring & Designing", "max_score": 8}, "criterion_c": {"title": "Processing & Evaluating", "max_score": 8}, "criterion_d": {"title": "Reflecting on Impacts", "max_score": 8}}'::jsonb,
    NULL
)
ON CONFLICT (id) DO UPDATE SET prompt = EXCLUDED.prompt;
