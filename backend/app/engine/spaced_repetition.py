import math
from datetime import datetime, timedelta, timezone
from typing import Dict, Any

class SpacedRepetitionEngine:
    """
    SuperMemo-2 (SM-2) / Leitner Variant Cognitive Memory Engine.
    Decoupled from subject taxonomy; operates purely on abstract concept identifiers.
    Tracks retention stability, ease factor, and #HardToMemorize interval penalization.
    """

    MIN_EASE_FACTOR: float = 1.3
    DEFAULT_EASE_FACTOR: float = 2.5
    HARD_TO_MEMORIZE_PENALTY: float = 0.75

    @classmethod
    def calculate_sm2_review(
        cls,
        quality: int,
        current_repetition: int = 0,
        current_interval: int = 1,
        current_ease_factor: float = 2.5,
        current_stability: float = 1.0,
        is_hard_to_memorize: bool = False,
        elapsed_days: float = 1.0
    ) -> Dict[str, Any]:
        """
        Calculates the updated memory state following an active retrieval attempt.
        quality: 0 (blackout) to 5 (perfect instantaneous recall)
        """
        # Constrain quality bounds
        q = max(0, min(5, quality))

        # 1. Update Ease Factor (EF)
        # EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
        delta_ef = 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)
        new_ef = max(cls.MIN_EASE_FACTOR, current_ease_factor + delta_ef)

        # 2. Determine Repetition Count & Interval
        if q < 3:
            # Memory lapse / failed retrieval: reset repetition streak
            new_repetition = 0
            new_interval = 1
            new_stability = max(0.5, current_stability * 0.5)
        else:
            # Successful retrieval
            new_repetition = current_repetition + 1
            if new_repetition == 1:
                new_interval = 1
            elif new_repetition == 2:
                new_interval = 6
            else:
                new_interval = int(math.ceil(current_interval * new_ef))
            
            # Increase stability (memory half-life)
            new_stability = current_stability * (1.0 + (new_ef * 0.4))

        # 3. Apply #HardToMemorize constraint
        if is_hard_to_memorize:
            new_interval = max(1, int(math.floor(new_interval * cls.HARD_TO_MEMORIZE_PENALTY)))
            new_stability = max(0.5, new_stability * 0.8)

        # 4. Compute Ebbinghaus Retention Probability
        # R = exp(-t / S) where t is elapsed days and S is retention stability
        retention_prob = math.exp(-elapsed_days / max(0.1, new_stability))
        retention_prob = round(max(0.01, min(1.0, retention_prob)), 4)

        # 5. Calculate Next Review Timestamp
        next_review = datetime.now(timezone.utc) + timedelta(days=new_interval)

        return {
            "interval_days": new_interval,
            "repetition_count": new_repetition,
            "ease_factor": round(new_ef, 3),
            "retention_stability": round(new_stability, 3),
            "next_review_timestamp": next_review.isoformat(),
            "current_retention_probability": retention_prob,
            "is_hard_to_memorize": is_hard_to_memorize
        }

    @classmethod
    def calculate_decay_curve(cls, stability: float, max_days: int = 30) -> list:
        """
        Generates Ebbinghaus forgetting curve projections for parent dashboard visualization.
        """
        curve = []
        for day in range(0, max_days + 1):
            prob = math.exp(-day / max(0.1, stability))
            curve.append({
                "day": day,
                "retention_percentage": round(prob * 100, 1)
            })
        return curve
