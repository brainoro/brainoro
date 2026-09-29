"""
Brainoro Pedagogical Question Synthesis Service (Google Gemini API)
===================================================================
Strict Curriculum-Aware, Subject-Specific, 50-Question Generation Engine.
Directly mapped to CBSE, Cambridge (IGCSE/O-Level), and IB MYP syllabus standards.
"""

import os
import json
import re
from typing import List, Dict, Any, Optional
import google.generativeai as genai
from supabase import create_client, Client

# Environment configurations
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL") or os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("NEXT_PUBLIC_GEMINI_API_KEY", "")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


def get_supabase_client() -> Optional[Client]:
    if SUPABASE_URL and SUPABASE_KEY and "placeholder" not in SUPABASE_URL:
        return create_client(SUPABASE_URL, SUPABASE_KEY)
    return None


def get_board_pedagogical_guidelines(board: str, grade: int, subject: str) -> str:
    """Returns strict curriculum guidelines per examination board."""
    b = (board or "CBSE").upper()
    if "CAMBRIDGE" in b or "IGCSE" in b:
        return f"""
        - Framework: Cambridge Assessment International Education (CAIE) / IGCSE Grade {grade} {subject}.
        - Question Style: Structured multiple-choice testing Command Words (State, Describe, Explain, Calculate, Evaluate).
        - Rigor: International standards with metric SI units, empirical data analysis, and step-wise logical deductions.
        - Tone: Official Cambridge Past Paper & Examination Standard.
        """
    elif "IB" in b or "MYP" in b:
        return f"""
        - Framework: International Baccalaureate (IB) Middle Years Programme (MYP Year {grade - 5 if grade >= 9 else grade}) {subject}.
        - Question Style: Criterion-aligned inquiry, conceptual connections, real-world context application, and critical thinking.
        - Rigor: In-depth conceptual understanding, global contexts, and scientific/mathematical inquiry models.
        - Tone: Official IB MYP Criterion A/B/C/D Standard.
        """
    else:
        return f"""
        - Framework: CBSE Class {grade} {subject} (NCERT & NEP 2020 Competency Framework).
        - Question Style: High Order Thinking Skills (HOTS), Competency-Based Assessment, NCERT Exemplar & CBSE Board Exam PYQs.
        - Rigor: Exact NCERT definitions, theorems, standard derivations, case-based conceptual scenarios, and formula applications.
        - Tone: Official CBSE National Curriculum Standard.
        """


def generate_50_questions_for_chapter(
    chapter_id: str,
    chapter_title: str,
    subject: str,
    grade: int = 9,
    board: str = "CBSE",
    force_refresh: bool = False
) -> List[Dict[str, Any]]:
    """
    Generates 50 authentic, curriculum-specific practice questions using Gemini API
    and persists them into Supabase questions table.
    
    SAFETY RULE: Existing questions for other chapters are NEVER modified or deleted.
    """
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY is not configured in environment.")

    supabase = get_supabase_client()

    # 1. Non-destructive safety check: If questions already exist and not forcing refresh, return existing
    if supabase and not force_refresh:
        try:
            existing = supabase.table("questions").select("*").eq("chapter_id", chapter_id).execute()
            if existing.data and len(existing.data) >= 50:
                print(f"[GeminiQuestionGen] Found {len(existing.data)} existing questions for '{chapter_title}' ({chapter_id}). Preserving existing data.")
                return existing.data
        except Exception as e:
            print(f"[GeminiQuestionGen] Notice on existing check: {e}")

    pedagogical_guideline = get_board_pedagogical_guidelines(board, grade, subject)

    prompt = f"""
You are the Chief Academic Assessment Architect for {board} Curriculum (Class {grade} {subject}).
Your mission: Generate exactly 50 distinct, high-yield, conceptually rigorous Multiple Choice Practice Questions (MCQs) for the specific chapter: "{chapter_title}".

STRICT CURRICULUM SPECIFICATIONS:
{pedagogical_guideline}

PEDAGOGICAL DISTRIBUTION (50 QUESTIONS TOTAL):
- 15 Foundation & Definitions: Core laws, principles, SI units, standard notations, and theorem definitions (Difficulty: EASY).
- 20 Application & Worked Calculations: Standard curriculum numericals, procedural problem solving, formula deductions, and analytical derivations (Difficulty: MEDIUM).
- 15 High-Yield Competency / HOTS: Common misconceptions, boundary trap busters, comparative analysis, and assertion-reasoning items (Difficulty: HARD).

QUALITY REQUIREMENTS:
1. STRICTLY RELEVANT: Every single question must be 100% authentic to the actual Class {grade} {subject} syllabus for "{chapter_title}". NO generic or out-of-syllabus filler questions.
2. 4 OPTIONS (A, B, C, D): Exactly 4 options per question. The correct answer must be unambiguous, and the 3 distractors must represent realistic student conceptual errors.
3. EXPLANATIONS: Include a crisp, step-by-step explanatory proof/solution for why the correct option is right.
4. LATEX SUPPORT: Use standard LaTeX formatting with single dollar signs (e.g., $E = mc^2$, $\\frac{{a}}{{b}}$, $F = ma$) for mathematical and scientific expressions.
5. PURE JSON OUTPUT: Return ONLY a valid, parseable JSON array. Do not enclose in markdown blocks, backticks, or any conversational text.

JSON FORMAT:
[
  {{
    "prompt": "Authentic question text with LaTeX formula if applicable",
    "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
    "correct_option_index": 0,
    "explanation": "Clear step-by-step pedagogical rationale and solution",
    "difficulty": "EASY",
    "question_type": "OBJECTIVE"
  }}
]
"""

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        generation_config={
            "temperature": 0.2,
            "max_output_tokens": 8192,
            "response_mime_type": "application/json"
        }
    )

    print(f"[GeminiQuestionGen] Initiating Gemini generation of 50 questions for '{chapter_title}' ({board} Class {grade} {subject})...")
    response = model.generate_content(prompt)
    raw_content = response.text.strip()

    # Clean potential surrounding code fences
    cleaned = re.sub(r'^```json\s*', '', raw_content, flags=re.IGNORECASE)
    cleaned = re.sub(r'^```\s*', '', cleaned)
    cleaned = re.sub(r'\s*```$', '', cleaned).strip()

    try:
        parsed_questions = json.loads(cleaned)
    except json.JSONDecodeError as err:
        print(f"[GeminiQuestionGen] JSON Parsing Error: {err}. Attempting secondary recovery...")
        # Simple JSON array extraction regex
        match = re.search(r'\[\s*\{.*\}\s*\]', cleaned, re.DOTALL)
        if match:
            parsed_questions = json.loads(match.group(0))
        else:
            raise ValueError(f"Failed to parse Gemini output as JSON: {cleaned[:300]}")

    if not isinstance(parsed_questions, list) or len(parsed_questions) == 0:
        raise ValueError("Gemini returned invalid or empty question array.")

    print(f"[GeminiQuestionGen] Successfully parsed {len(parsed_questions)} questions from Gemini.")

    # Prepare database records
    db_rows = []
    for idx, q in enumerate(parsed_questions):
        opts = q.get("options", [])
        if not isinstance(opts, list) or len(opts) < 4:
            continue
        
        correct_idx = q.get("correct_option_index", 0)
        if not (0 <= correct_idx < len(opts)):
            correct_idx = 0

        db_rows.append({
            "chapter_id": chapter_id,
            "board_id": board,
            "subject": subject,
            "grade_level": grade,
            "prompt": str(q.get("prompt", "")).strip(),
            "options": opts[:4],
            "correct_option_index": correct_idx,
            "explanation": str(q.get("explanation", "")).strip(),
            "difficulty": str(q.get("difficulty", "MEDIUM")).upper(),
            "question_type": "OBJECTIVE",
            "created_at": "now()"
        })

    # Non-destructive batch insert into Supabase
    if supabase and len(db_rows) > 0:
        try:
            insert_resp = supabase.table("questions").insert(db_rows).execute()
            print(f"[GeminiQuestionGen] Successfully persisted {len(db_rows)} questions into Supabase 'questions' table.")
            return insert_resp.data or db_rows
        except Exception as insert_err:
            print(f"[GeminiQuestionGen] Warning: Could not write directly to Supabase table 'questions': {insert_err}")

    return db_rows
