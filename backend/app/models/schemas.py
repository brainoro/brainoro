from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from datetime import datetime

# ---------------------------------------------------------------------------
# Registry & Concept Schemas (Open-Closed Polymorphic Design)
# ---------------------------------------------------------------------------

class BoardRegistry(BaseModel):
    id: str = Field(..., description="Unique board identifier, e.g. 'CBSE', 'CAMBRIDGE', 'IB_MYP'")
    display_name: str
    default_grading_system: str

class SubjectRegistry(BaseModel):
    id: str = Field(..., description="Unique subject identifier, e.g. 'MATH', 'PHYSICS'")
    display_name: str

class CurriculumConceptNode(BaseModel):
    id: str = Field(..., description="Compound hierarchical key, e.g. 'CBSE-G9-MATH-LINEQ'")
    board_id: str
    subject_id: str
    grade_level: int
    title: str
    core_logic_essence: str
    parent_node_id: Optional[str] = None
    prerequisites: Optional[List[str]] = []

# ---------------------------------------------------------------------------
# AI Ingestion & Cornell Note Schemas (Copyright-Safe Synthesis)
# ---------------------------------------------------------------------------

class ContentIngestionPayload(BaseModel):
    board_id: str
    subject_id: str
    grade_level: int
    topic_id: str
    raw_source_data: str
    custom_ui_hints: Optional[Dict[str, Any]] = Field(default_factory=dict)

class CornellExtractionResult(BaseModel):
    node_registered_id: str
    mapped_node_id: Optional[str] = None
    core_conceptual_analogy: str = Field(
        ..., description="2-sentence structural real-world metaphor explaining core logic"
    )
    structural_rule_or_fact: str = Field(
        ..., description="Key formula or axiom formatted in bold Markdown"
    )
    curriculum_trap: str = Field(
        ..., description="Systemic conceptual error typical for this board framework"
    )
    logical_mental_verification: str = Field(
        ..., description="Original concept validation problem for the specified grade level"
    )
    cue_questions: List[str] = Field(
        default_factory=list, description="Recall cues for Cornell left margin"
    )
    summary: str = Field(
        ..., description="Concise 2-sentence synthesis for Cornell bottom summary zone"
    )
    copyright_compliance_certified: bool = Field(
        default=True, description="Enforces 100% original synthesis, zero verbatim extraction"
    )

# ---------------------------------------------------------------------------
# Spaced Repetition (SM-2 / Leitner Variant) Schemas
# ---------------------------------------------------------------------------

class MemoryReviewSubmission(BaseModel):
    concept_id: str
    quality_rating: int = Field(
        ..., ge=0, le=5, description="SM-2 quality grade: 0 (blackout) to 5 (perfect recall)"
    )
    is_hard_to_memorize: Optional[bool] = Field(
        default=False, description="Flag for accelerated interval attenuation"
    )
    current_interval_days: Optional[int] = 1
    current_repetition_count: Optional[int] = 0
    current_ease_factor: Optional[float] = 2.5
    current_stability: Optional[float] = 1.0
    elapsed_days_since_review: Optional[float] = 1.0

class MemoryReviewResult(BaseModel):
    concept_id: str
    interval_days: int
    repetition_count: int
    ease_factor: float
    retention_stability: float
    next_review_timestamp: str
    current_retention_probability: float
    is_hard_to_memorize: bool

# ---------------------------------------------------------------------------
# Psychometric Item Response Theory (IRT) Schemas
# ---------------------------------------------------------------------------

class AssessmentItem(BaseModel):
    id: str
    concept_id: str
    board_type: str
    prompt: str
    sample_solution: str
    difficulty_b: float = Field(..., description="Rasch item difficulty parameter b in [-3.0, +3.0]")
    discrimination_a: float = Field(default=1.0, description="Discrimination parameter a")
    guessing_c: float = Field(default=0.0, description="Guessing parameter c")
    command_word: Optional[str] = None
    rubric_criteria: Optional[Dict[str, Any]] = None
    procedural_steps: Optional[List[Dict[str, Any]]] = None

class IRTSessionState(BaseModel):
    session_id: str
    current_theta: float = Field(default=0.0, description="Student latent ability estimate [-3, +3]")
    standard_error: float = Field(default=1.0)
    items_completed: int = 0
    responses: List[Dict[str, Any]] = Field(default_factory=list)

class IRTAnswerSubmission(BaseModel):
    session_id: str
    item_id: str
    is_correct: bool
    response_time_seconds: Optional[float] = 30.0
    submitted_answer: Optional[str] = None

class IRTStepResult(BaseModel):
    session_id: str
    updated_theta: float
    standard_error: float
    probability_correct: float
    items_completed: int
    suggested_next_item_id: Optional[str] = None
    ability_trajectory: List[float] = Field(default_factory=list)

# ---------------------------------------------------------------------------
# Graph Dependency & Remediation Schemas
# ---------------------------------------------------------------------------

class RemediationPathRequest(BaseModel):
    failed_concept_id: str
    user_id: Optional[str] = None

class RemediationTarget(BaseModel):
    concept_id: str
    title: str
    core_logic_essence: str
    distance_from_failed_node: int
    dependency_weight: float
    action_item: str

class RemediationPathResponse(BaseModel):
    failed_concept_id: str
    remediation_targets: List[RemediationTarget]
    upstream_lineage: List[str]
    root_cause_node_id: Optional[str] = None
