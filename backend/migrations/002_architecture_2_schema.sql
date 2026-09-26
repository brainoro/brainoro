-- =========================================================================
-- MASTER SQL: ARCHITECTURE 2 - 6-TIER HIERARCHICAL ISOLATION SCHEMA
-- =========================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- TIER 0: Board Registry
CREATE TABLE IF NOT EXISTS boards (
    board_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_code VARCHAR(20) UNIQUE NOT NULL,
    board_name VARCHAR(100) NOT NULL,
    country_code VARCHAR(5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TIER 1: Grade Definitions (Class 1-12)
CREATE TABLE IF NOT EXISTS grade_definitions (
    grade_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID NOT NULL REFERENCES boards(board_id) ON DELETE CASCADE,
    grade_number INT CHECK (grade_number BETWEEN 1 AND 12),
    grade_name VARCHAR(50),
    academic_year VARCHAR(10) DEFAULT '2026-27',
    UNIQUE(board_id, grade_number, academic_year),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TIER 2: Subjects by Grade
CREATE TABLE IF NOT EXISTS subjects_by_grade (
    subject_grade_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_id UUID NOT NULL REFERENCES grade_definitions(grade_id) ON DELETE CASCADE,
    subject_code VARCHAR(30) NOT NULL,
    subject_name VARCHAR(100) NOT NULL,
    UNIQUE(grade_id, subject_code),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TIER 3: Chapters by Subject
CREATE TABLE IF NOT EXISTS chapters_by_subject (
    chapter_subject_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_grade_id UUID NOT NULL REFERENCES subjects_by_grade(subject_grade_id) ON DELETE CASCADE,
    chapter_number INT NOT NULL,
    chapter_code VARCHAR(50) UNIQUE NOT NULL,
    chapter_name VARCHAR(200) NOT NULL,
    UNIQUE(subject_grade_id, chapter_number),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TIER 4: Concepts V2
CREATE TABLE IF NOT EXISTS curriculum_concepts_v2 (
    concept_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_subject_id UUID NOT NULL REFERENCES chapters_by_subject(chapter_subject_id) ON DELETE CASCADE,
    concept_code VARCHAR(50) UNIQUE NOT NULL,
    concept_name VARCHAR(200) NOT NULL,
    difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 10) DEFAULT 5,
    bloom_level VARCHAR(20) DEFAULT 'UNDERSTAND',
    content_hash VARCHAR(64),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TIER 5: Concept Dependencies V2
CREATE TABLE IF NOT EXISTS concept_dependencies_v2 (
    dependency_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prerequisite_concept_id UUID NOT NULL REFERENCES curriculum_concepts_v2(concept_id) ON DELETE CASCADE,
    target_concept_id UUID NOT NULL REFERENCES curriculum_concepts_v2(concept_id) ON DELETE CASCADE,
    dependency_weight NUMERIC(3,2) DEFAULT 1.0,
    CHECK (prerequisite_concept_id != target_concept_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TIER 6: Assessment Items V2
CREATE TABLE IF NOT EXISTS assessment_items_v2 (
    item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concept_id UUID NOT NULL REFERENCES curriculum_concepts_v2(concept_id) ON DELETE CASCADE,
    item_code VARCHAR(50) UNIQUE NOT NULL,
    item_type VARCHAR(50) DEFAULT 'MCQ',
    question_text TEXT NOT NULL,
    difficulty_parameter NUMERIC(5,2) DEFAULT 0.0,
    discrimination NUMERIC(5,3) DEFAULT 1.0,
    correct_answer VARCHAR(10),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Curriculum Versions
CREATE TABLE IF NOT EXISTS curriculum_versions (
    version_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID NOT NULL REFERENCES boards(board_id) ON DELETE CASCADE,
    academic_year VARCHAR(10) NOT NULL,
    version_number INT NOT NULL,
    merkle_root_hash VARCHAR(64),
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(board_id, academic_year, version_number)
);

-- Concept Snapshots (Audit & Verification)
CREATE TABLE IF NOT EXISTS concept_snapshots (
    snapshot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_id UUID NOT NULL REFERENCES curriculum_versions(version_id) ON DELETE CASCADE,
    concept_id UUID NOT NULL,
    concept_code VARCHAR(50),
    concept_name VARCHAR(200),
    content_hash VARCHAR(64),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(version_id, concept_id)
);

-- Data Access Audit Log (Immutable write-once log)
CREATE TABLE IF NOT EXISTS data_access_audit (
    audit_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    accessed_concept_id UUID NOT NULL,
    accessed_grade_id UUID NOT NULL,
    action_type VARCHAR(50),
    access_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 1. Insert Boards
INSERT INTO boards (board_code, board_name, country_code)
VALUES 
    ('CBSE', 'Central Board of Secondary Education', 'IN'),
    ('ICSE', 'Indian Certificate of Secondary Education', 'IN'),
    ('CAMBRIDGE', 'Cambridge International', 'UK'),
    ('IB', 'International Baccalaureate', 'CH')
ON CONFLICT (board_code) DO NOTHING;

-- 2. Insert Grade Definitions (Class 1-12 for CBSE)
INSERT INTO grade_definitions (board_id, grade_number, grade_name, academic_year)
SELECT 
    b.board_id,
    series.grade_num,
    'Class ' || series.grade_num::TEXT,
    '2026-27'
FROM boards b
CROSS JOIN LATERAL (
    SELECT generate_series(1, 12) as grade_num
) series
WHERE b.board_code = 'CBSE'
ON CONFLICT (board_id, grade_number, academic_year) DO NOTHING;

-- 3. Core Subjects for Class 6-10
INSERT INTO subjects_by_grade (grade_id, subject_code, subject_name)
SELECT 
    gd.grade_id,
    subj.code,
    subj.name
FROM grade_definitions gd
CROSS JOIN (
    VALUES 
        ('MATH', 'Mathematics'),
        ('SCIENCE', 'Science'),
        ('ENGLISH', 'English'),
        ('HINDI', 'Hindi'),
        ('SOCIAL_SCIENCE', 'Social Science')
) subj(code, name)
WHERE gd.board_id = (SELECT board_id FROM boards WHERE board_code = 'CBSE')
AND gd.grade_number BETWEEN 6 AND 10
AND gd.academic_year = '2026-27'
ON CONFLICT (grade_id, subject_code) DO NOTHING;

-- 4. Senior Secondary Subjects for Class 11-12
INSERT INTO subjects_by_grade (grade_id, subject_code, subject_name)
SELECT 
    gd.grade_id,
    subj.code,
    subj.name
FROM grade_definitions gd
CROSS JOIN (
    VALUES 
        ('PHYSICS', 'Physics'),
        ('CHEMISTRY', 'Chemistry'),
        ('MATHEMATICS', 'Mathematics'),
        ('BIOLOGY', 'Biology'),
        ('ENGLISH_CORE', 'English Core'),
        ('ACCOUNTANCY', 'Accountancy'),
        ('BUSINESS_STUDIES', 'Business Studies'),
        ('ECONOMICS', 'Economics'),
        ('COMPUTER_SCIENCE', 'Computer Science')
) subj(code, name)
WHERE gd.board_id = (SELECT board_id FROM boards WHERE board_code = 'CBSE')
AND gd.grade_number IN (11, 12)
AND gd.academic_year = '2026-27'
ON CONFLICT (grade_id, subject_code) DO NOTHING;

-- Function 1: SHA-256 Hashing
CREATE OR REPLACE FUNCTION compute_content_hash(content TEXT)
RETURNS VARCHAR AS $$
BEGIN
    RETURN encode(digest(content, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function 2: Validate Student Grade Match
CREATE OR REPLACE FUNCTION validate_concept_grade_match(
    p_concept_id UUID,
    p_student_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    v_concept_grade_id UUID;
    v_student_grade_id UUID;
BEGIN
    SELECT gd.grade_id INTO v_concept_grade_id
    FROM curriculum_concepts_v2 cc
    JOIN chapters_by_subject cb ON cc.chapter_subject_id = cb.chapter_subject_id
    JOIN subjects_by_grade sg ON cb.subject_grade_id = sg.subject_grade_id
    JOIN grade_definitions gd ON sg.grade_id = gd.grade_id
    WHERE cc.concept_id = p_concept_id
    LIMIT 1;
    
    SELECT student_grade_id INTO v_student_grade_id
    FROM students
    WHERE id = p_student_id;
    
    RETURN v_concept_grade_id = v_student_grade_id;
END;
$$ LANGUAGE plpgsql;

-- Function 3: Detect Cross-Grade Data Leaks
CREATE OR REPLACE FUNCTION detect_cross_grade_data_leaks(
    p_board_id UUID
)
RETURNS TABLE(
    grade_id UUID,
    leaked_concepts INT,
    severity VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sg.grade_id,
        COUNT(DISTINCT cc.concept_id)::INT,
        CASE 
            WHEN COUNT(*) > 10 THEN 'CRITICAL'
            WHEN COUNT(*) > 0 THEN 'HIGH'
            ELSE 'LOW'
        END
    FROM subjects_by_grade sg
    JOIN grade_definitions gd ON sg.grade_id = gd.grade_id
    JOIN chapters_by_subject cb ON sg.subject_grade_id = cb.subject_grade_id
    JOIN curriculum_concepts_v2 cc ON cb.chapter_subject_id = cc.chapter_subject_id
    WHERE gd.board_id = p_board_id
    GROUP BY sg.grade_id;
END;
$$ LANGUAGE plpgsql;

-- Function 4: Build Curriculum Merkle Tree
CREATE OR REPLACE FUNCTION build_curriculum_merkle_tree(
    p_board_id UUID,
    p_academic_year VARCHAR
)
RETURNS VARCHAR AS $$
DECLARE
    v_hashes TEXT[] := ARRAY[]::TEXT[];
    v_hash_record RECORD;
    v_merkle_root VARCHAR(64);
BEGIN
    FOR v_hash_record IN (
        SELECT DISTINCT encode(
            digest(
                cc.concept_code || '|' || cc.concept_name || '|' || COALESCE(cc.content_hash, ''),
                'sha256'
            ),
            'hex'
        ) as concept_hash
        FROM curriculum_concepts_v2 cc
        JOIN chapters_by_subject cb ON cc.chapter_subject_id = cb.chapter_subject_id
        JOIN subjects_by_grade sg ON cb.subject_grade_id = sg.subject_grade_id
        JOIN grade_definitions gd ON sg.grade_id = gd.grade_id
        WHERE gd.board_id = p_board_id
        AND gd.academic_year = p_academic_year
        ORDER BY cc.concept_code
    ) LOOP
        v_hashes := array_append(v_hashes, v_hash_record.concept_hash);
    END LOOP;
    
    WHILE array_length(v_hashes, 1) > 1 LOOP
        IF array_length(v_hashes, 1) % 2 != 0 THEN
            v_hashes := array_append(v_hashes, v_hashes[array_length(v_hashes, 1)]);
        END IF;
        
        v_hashes := ARRAY(
            SELECT encode(
                digest(v_hashes[i] || v_hashes[i+1], 'sha256'),
                'hex'
            )
            FROM generate_series(1, array_length(v_hashes, 1), 2) i
        );
    END LOOP;
    
    v_merkle_root := COALESCE(v_hashes[1], encode(digest('EMPTY_CURRICULUM_ROOT', 'sha256'), 'hex'));
    
    RETURN v_merkle_root;
END;
$$ LANGUAGE plpgsql;

-- Function 5: Verify Curriculum Integrity
CREATE OR REPLACE FUNCTION verify_curriculum_integrity(
    p_version_id UUID
)
RETURNS TABLE(
    is_valid BOOLEAN,
    computed_hash VARCHAR(64),
    stored_hash VARCHAR(64),
    tamper_detected BOOLEAN
) AS $$
DECLARE
    v_computed_root VARCHAR(64);
    v_stored_root VARCHAR(64);
    v_board_id UUID;
    v_academic_year VARCHAR(10);
BEGIN
    SELECT cv.board_id, cv.academic_year, cv.merkle_root_hash
    INTO v_board_id, v_academic_year, v_stored_root
    FROM curriculum_versions cv
    WHERE cv.version_id = p_version_id;
    
    v_computed_root := build_curriculum_merkle_tree(v_board_id, v_academic_year);
    
    RETURN QUERY SELECT 
        (v_computed_root = v_stored_root)::BOOLEAN,
        v_computed_root,
        v_stored_root,
        (v_computed_root != v_stored_root)::BOOLEAN;
END;
$$ LANGUAGE plpgsql;

-- RLS
ALTER TABLE curriculum_concepts_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_items_v2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_access_audit ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS student_concept_isolation ON curriculum_concepts_v2;
CREATE POLICY student_concept_isolation ON curriculum_concepts_v2
    FOR SELECT
    USING (
        chapter_subject_id IN (
            SELECT chapter_subject_id 
            FROM chapters_by_subject
            WHERE subject_grade_id IN (
                SELECT subject_grade_id
                FROM subjects_by_grade
                WHERE grade_id = (
                    SELECT student_grade_id 
                    FROM students 
                    WHERE id = auth.uid()::uuid
                )
            )
        )
    );
