import uuid
import re
from typing import List, Dict, Any, Optional
from fastapi import APIRouter, HTTPException, Query

from app.models.schemas import (
    ContentIngestionPayload,
    CornellExtractionResult,
    MemoryReviewSubmission,
    MemoryReviewResult,
    IRTSessionState,
    IRTAnswerSubmission,
    IRTStepResult,
    RemediationPathRequest,
    RemediationPathResponse,
    AssessmentItem,
)
from app.engine.spaced_repetition import SpacedRepetitionEngine
from app.engine.irt import IRTEngine
from app.engine.dependency_graph import DependencyGraphResolver
from app.api.curriculum import CONCEPTS_STORE

router = APIRouter(prefix="/engine", tags=["Cognitive Engine & Testing"])

# In-memory stores for active test sessions and synthetic items
ACTIVE_SESSIONS: Dict[str, Dict[str, Any]] = {}

SYNTHETIC_ITEMS: List[Dict[str, Any]] = [
    {
        "id": "ITEM-CBSE-LINEQ-01",
        "concept_id": "CBSE-G9-MATH-LINEQ",
        "board_type": "CBSE",
        "prompt": "Express the relationship 5x - 3y = 15 in standard form ax + by + c = 0, and evaluate coordinate pairs for x=0 and y=0.",
        "sample_solution": "5x - 3y - 15 = 0; when x=0, y=-5; when y=0, x=3.",
        "difficulty_b": -0.45,
        "discrimination_a": 1.2,
        "guessing_c": 0.0,
        "command_word": None,
        "procedural_steps": [
            {"step": 1, "instruction": "Rearrange equation into ax + by + c = 0", "expected": "5x - 3y - 15 = 0"},
            {"step": 2, "instruction": "Find y-intercept when x = 0", "expected": "-5"},
            {"step": 3, "instruction": "Find x-intercept when y = 0", "expected": "3"}
        ]
    },
    {
        "id": "ITEM-CAMBRIDGE-NEWTON-01",
        "concept_id": "CAMBRIDGE-G10-PHYS-NEWTON",
        "board_type": "CAMBRIDGE",
        "prompt": "A drone of mass 2.40 kg accelerates vertically upwards from rest under a constant thrust of 35.0 N. (g = 9.81 N/kg). Calculate the acceleration to 3 significant figures and deduce velocity after 4.00 s.",
        "sample_solution": "W = 23.54 N, F_net = 11.46 N, a = 4.77 m/s^2, v = 19.1 m/s.",
        "difficulty_b": 0.65,
        "discrimination_a": 1.65,
        "guessing_c": 0.0,
        "command_word": "Calculate & Deduce",
        "procedural_steps": None
    },
    {
        "id": "ITEM-IB-ECOSYS-01",
        "concept_id": "IB_MYP-Y4-SCI-ECOSYS",
        "board_type": "IB_MYP",
        "prompt": "Evaluate trophic cascade dynamics when an invasive consumer assimilates 45% of available biomass in a temperate ecosystem. Formulate sustainable interventions.",
        "sample_solution": "Applies 10% trophic efficiency rule, assesses secondary carnivore depletion, balances ecological mitigation.",
        "difficulty_b": 0.85,
        "discrimination_a": 1.4,
        "guessing_c": 0.0,
        "rubric_criteria": {
            "criterion_a": {"title": "Knowing & Understanding", "max_score": 8},
            "criterion_b": {"title": "Inquiring & Designing", "max_score": 8},
            "criterion_c": {"title": "Processing & Evaluating", "max_score": 8},
            "criterion_d": {"title": "Reflecting on Impacts", "max_score": 8}
        }
    },
    {
        "id": "ITEM-CBSE-ALGEXP-01",
        "concept_id": "CBSE-G9-MATH-ALGEXP",
        "board_type": "CBSE",
        "prompt": "Factorize the quadratic expression 6x^2 + 17x + 5 using the splitting of middle terms technique.",
        "sample_solution": "Product = 30, Sum = 17 -> 15 and 2. 6x^2 + 15x + 2x + 5 = (2x + 5)(3x + 1).",
        "difficulty_b": -0.8,
        "discrimination_a": 1.1,
        "guessing_c": 0.0,
        "command_word": None,
        "procedural_steps": [
            {"step": 1, "instruction": "Find two integers whose product is 30 and sum is 17", "expected": "15, 2"},
            {"step": 2, "instruction": "Factor by grouping", "expected": "(2x + 5)(3x + 1)"}
        ]
    }
]

DEPENDENCIES_STORE: List[Dict[str, Any]] = [
    {"prerequisite_concept_id": "CBSE-G9-MATH-NUMSYS", "target_concept_id": "CBSE-G9-MATH-ALGEXP", "dependency_weight": 0.9},
    {"prerequisite_concept_id": "CBSE-G9-MATH-ALGEXP", "target_concept_id": "CBSE-G9-MATH-LINEQ", "dependency_weight": 1.0},
    {"prerequisite_concept_id": "CAMBRIDGE-G10-PHYS-VECT", "target_concept_id": "CAMBRIDGE-G10-PHYS-ACCEL", "dependency_weight": 0.85},
    {"prerequisite_concept_id": "CAMBRIDGE-G10-PHYS-ACCEL", "target_concept_id": "CAMBRIDGE-G10-PHYS-NEWTON", "dependency_weight": 1.0},
    {"prerequisite_concept_id": "IB_MYP-Y4-SCI-CELL", "target_concept_id": "IB_MYP-Y4-SCI-ECOSYS", "dependency_weight": 0.75}
]

# ---------------------------------------------------------------------------
# Spaced Repetition (SM-2) Endpoint
# ---------------------------------------------------------------------------

@router.post("/review-card", response_model=MemoryReviewResult)
def submit_card_review(submission: MemoryReviewSubmission):
    """
    Evaluates an active retrieval attempt using the SM-2 algorithm.
    Adjusts interval, ease factor, and stability based on quality rating (0-5)
    and #HardToMemorize flags.
    """
    res = SpacedRepetitionEngine.calculate_sm2_review(
        quality=submission.quality_rating,
        current_repetition=submission.current_repetition_count or 0,
        current_interval=submission.current_interval_days or 1,
        current_ease_factor=submission.current_ease_factor or 2.5,
        current_stability=submission.current_stability or 1.0,
        is_hard_to_memorize=submission.is_hard_to_memorize or False,
        elapsed_days=submission.elapsed_days_since_review or 1.0
    )

    return MemoryReviewResult(
        concept_id=submission.concept_id,
        interval_days=res["interval_days"],
        repetition_count=res["repetition_count"],
        ease_factor=res["ease_factor"],
        retention_stability=res["retention_stability"],
        next_review_timestamp=res["next_review_timestamp"],
        current_retention_probability=res["current_retention_probability"],
        is_hard_to_memorize=res["is_hard_to_memorize"]
    )

# ---------------------------------------------------------------------------
# Psychometric IRT Adaptive Testing Endpoints
# ---------------------------------------------------------------------------

@router.get("/items", response_model=List[AssessmentItem])
def get_assessment_items(board_type: Optional[str] = None):
    """Retrieve available psychometric assessment items."""
    if board_type:
        return [item for item in SYNTHETIC_ITEMS if item["board_type"].upper() == board_type.upper()]
    return SYNTHETIC_ITEMS

@router.post("/irt/session/start", response_model=IRTSessionState)
def start_irt_session(initial_theta: float = 0.0):
    """Starts a new adaptive test session with a baseline theta estimate."""
    session_id = str(uuid.uuid4())
    session_data = {
        "session_id": session_id,
        "current_theta": initial_theta,
        "standard_error": 1.0,
        "items_completed": 0,
        "responses": []
    }
    ACTIVE_SESSIONS[session_id] = session_data
    return IRTSessionState(**session_data)

@router.post("/irt/session/submit", response_model=IRTStepResult)
def submit_irt_answer(submission: IRTAnswerSubmission):
    """
    Processes student response, performs Newton-Raphson update on latent ability theta,
    and dynamically selects the next optimal item via Fisher Information maximization.
    """
    session = ACTIVE_SESSIONS.get(submission.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Adaptive testing session not found.")

    # Locate the item
    item = next((i for i in SYNTHETIC_ITEMS if i["id"] == submission.item_id), None)
    if not item:
        raise HTTPException(status_code=404, detail="Assessment item not found.")

    # Record response
    response_record = {
        "item_id": item["id"],
        "difficulty_b": item["difficulty_b"],
        "discrimination_a": item.get("discrimination_a", 1.0),
        "guessing_c": item.get("guessing_c", 0.0),
        "is_correct": submission.is_correct,
        "time_taken": submission.response_time_seconds
    }
    session["responses"].append(response_record)
    session["items_completed"] += 1

    # Update theta estimate
    update = IRTEngine.update_theta_bayesian(
        current_theta=session["current_theta"],
        item_responses=session["responses"]
    )
    session["current_theta"] = update["theta"]
    session["standard_error"] = update["standard_error"]

    # Compute probability of correct response on completed item
    prob = IRTEngine.calculate_probability(
        theta=update["theta"],
        difficulty_b=item["difficulty_b"],
        discrimination_a=item.get("discrimination_a", 1.0),
        guessing_c=item.get("guessing_c", 0.0)
    )

    # Select next optimal item
    completed_ids = [r["item_id"] for r in session["responses"]]
    next_item = IRTEngine.select_next_optimal_item(
        current_theta=update["theta"],
        available_items=SYNTHETIC_ITEMS,
        completed_item_ids=completed_ids
    )

    trajectory = [r.get("difficulty_b", 0.0) for r in session["responses"]]

    return IRTStepResult(
        session_id=submission.session_id,
        updated_theta=update["theta"],
        standard_error=update["standard_error"],
        probability_correct=round(prob, 4),
        items_completed=session["items_completed"],
        suggested_next_item_id=next_item["id"] if next_item else None,
        ability_trajectory=trajectory
    )

# ---------------------------------------------------------------------------
# Graph Remediation Endpoint
# ---------------------------------------------------------------------------

@router.post("/remediation", response_model=RemediationPathResponse)
def get_remediation_path(req: RemediationPathRequest):
    """
    Traverses tree lineage and dependency edges upward to isolate prerequisite gaps
    when a student fails an application test parameter.
    """
    concepts_map = {c["id"]: c for c in CONCEPTS_STORE}
    res = DependencyGraphResolver.resolve_remediation_path(
        failed_concept_id=req.failed_concept_id,
        concepts_lookup=concepts_map,
        dependencies_lookup=DEPENDENCIES_STORE
    )
    return RemediationPathResponse(**res)

# ---------------------------------------------------------------------------
# Parent Cognitive Acceleration Metrics Endpoint
# ---------------------------------------------------------------------------

@router.get("/parent-metrics/{user_id}")
def get_parent_cognitive_metrics(user_id: str):
    """
    Shifts parent reporting away from opaque percentages to granular, action-oriented,
    and trackable long-term memory retrieval metrics:
    - Retention Stability (days)
    - Active Retrieval Velocity (cards/week)
    - Projected Memory Half-Life
    - 30-day Ebbinghaus decay curve projection
    """
    # Synthetic baseline metrics demonstrating measurable cognitive acceleration
    stability_days = 18.5
    retrieval_velocity_per_week = 42
    decay_curve = SpacedRepetitionEngine.calculate_decay_curve(stability=stability_days, max_days=30)

    return {
        "user_id": user_id,
        "cognitive_acceleration_index": 2.4, # 2.4x standard retention rate
        "retention_stability_days": stability_days,
        "memory_half_life_days": round(stability_days * 0.693, 1),
        "active_retrieval_velocity_weekly": retrieval_velocity_per_week,
        "long_term_retention_rate_pct": 87.4,
        "active_mastery_queues": {
            "box_1_daily": 3,
            "box_2_every_3d": 5,
            "box_3_weekly": 12,
            "box_4_biweekly": 18,
            "box_5_mastered": 34
        },
        "ebbinghaus_decay_forecast": decay_curve
    }

# ---------------------------------------------------------------------------
# OER Content Ingestion Endpoint
# ---------------------------------------------------------------------------

@router.post("/ingest-node", response_model=CornellExtractionResult)
async def ingest_curriculum_concept(payload: ContentIngestionPayload):
    """
    Ingests an OER curriculum concept node, sanitizing the topic_id slug
    and dynamically evaluating mapped_node_id to:
    f"{payload.board_id}-G{payload.grade_level}-{payload.subject_id}-{sanitized_topic_id}"
    """
    from app.api.curriculum import process_curriculum_node
    return await process_curriculum_node(payload)
