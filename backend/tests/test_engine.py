import pytest
from app.engine.spaced_repetition import SpacedRepetitionEngine
from app.engine.irt import IRTEngine
from app.engine.dependency_graph import DependencyGraphResolver

def test_sm2_perfect_recall():
    """Verify standard SM-2 interval expansion on perfect recall."""
    res1 = SpacedRepetitionEngine.calculate_sm2_review(quality=5, current_repetition=0)
    assert res1["interval_days"] == 1
    assert res1["repetition_count"] == 1
    assert res1["ease_factor"] >= 2.5

    res2 = SpacedRepetitionEngine.calculate_sm2_review(
        quality=5,
        current_repetition=res1["repetition_count"],
        current_interval=res1["interval_days"],
        current_ease_factor=res1["ease_factor"]
    )
    assert res2["interval_days"] == 6
    assert res2["repetition_count"] == 2

def test_sm2_hard_to_memorize_penalty():
    """Verify that is_hard_to_memorize penalizes interval expansion."""
    standard = SpacedRepetitionEngine.calculate_sm2_review(
        quality=4, current_repetition=2, current_interval=6, current_ease_factor=2.5, is_hard_to_memorize=False
    )
    penalized = SpacedRepetitionEngine.calculate_sm2_review(
        quality=4, current_repetition=2, current_interval=6, current_ease_factor=2.5, is_hard_to_memorize=True
    )
    assert penalized["interval_days"] <= standard["interval_days"]
    assert penalized["is_hard_to_memorize"] is True

def test_sm2_failure_resets_streak():
    """Verify that quality < 3 resets repetition streak."""
    res = SpacedRepetitionEngine.calculate_sm2_review(
        quality=1, current_repetition=4, current_interval=15, current_ease_factor=2.4
    )
    assert res["repetition_count"] == 0
    assert res["interval_days"] == 1

def test_irt_probability_monotonicity():
    """Verify 2PL probability increases monotonically with student ability theta."""
    p_low = IRTEngine.calculate_probability(theta=-1.0, difficulty_b=0.0, discrimination_a=1.2)
    p_mid = IRTEngine.calculate_probability(theta=0.0, difficulty_b=0.0, discrimination_a=1.2)
    p_high = IRTEngine.calculate_probability(theta=1.0, difficulty_b=0.0, discrimination_a=1.2)
    assert p_low < p_mid < p_high
    assert abs(p_mid - 0.5) < 0.01

def test_irt_bayesian_ability_update():
    """Verify theta estimate increases on correct answers and decreases on errors."""
    item = {"difficulty_b": 0.0, "discrimination_a": 1.2, "guessing_c": 0.0, "is_correct": True}
    res = IRTEngine.update_theta_bayesian(current_theta=0.0, item_responses=[item])
    assert res["theta"] > 0.0

    err_item = {"difficulty_b": 0.0, "discrimination_a": 1.2, "guessing_c": 0.0, "is_correct": False}
    res_err = IRTEngine.update_theta_bayesian(current_theta=0.0, item_responses=[err_item])
    assert res_err["theta"] < 0.0

def test_dependency_graph_remediation():
    """Verify upward DAG traversal isolates foundational prerequisite gaps."""
    concepts = {
        "C1": {"id": "C1", "title": "Base Arithmetic", "parent_node_id": None},
        "C2": {"id": "C2", "title": "Algebraic Variables", "parent_node_id": "C1"},
        "C3": {"id": "C3", "title": "Linear Equations", "parent_node_id": "C2"}
    }
    deps = [
        {"prerequisite_concept_id": "C1", "target_concept_id": "C2", "dependency_weight": 0.9},
        {"prerequisite_concept_id": "C2", "target_concept_id": "C3", "dependency_weight": 1.0}
    ]

    path = DependencyGraphResolver.resolve_remediation_path("C3", concepts, deps)
    assert len(path["remediation_targets"]) == 2
    assert path["root_cause_node_id"] == "C1"
    assert "C2" in path["upstream_lineage"]
    assert "C1" in path["upstream_lineage"]

@pytest.mark.anyio
async def test_ingest_curriculum_concept_sanitized_id():
    """Verify topic_id is dynamically sanitized and mapped into mapped_node_id."""
    from app.api.engine import ingest_curriculum_concept
    from app.models.schemas import ContentIngestionPayload

    payload = ContentIngestionPayload(
        board_id="CBSE",
        subject_id="PHYSICS",
        grade_level=9,
        topic_id="LIGHT",
        raw_source_data="Refraction of light through glass prism."
    )
    result = await ingest_curriculum_concept(payload)
    assert result.node_registered_id == "CBSE-G9-PHYSICS-LIGHT"
    assert result.mapped_node_id == "CBSE-G9-PHYSICS-LIGHT"
    assert "Reflection" in result.structural_rule_or_fact or "Refraction" in result.structural_rule_or_fact
