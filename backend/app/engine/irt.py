import math
from typing import List, Dict, Any, Optional

class IRTEngine:
    """
    Psychometric Item Response Theory (IRT) Controller.
    Implements 1PL (Rasch) and 2PL models for adaptive ability estimation.
    Theta (latent student ability) is normalized to [-3.0, +3.0].
    """

    THETA_MIN = -3.5
    THETA_MAX = 3.5
    CONVERGENCE_EPSILON = 0.001
    MAX_ITERATIONS = 25

    @classmethod
    def calculate_probability(
        cls,
        theta: float,
        difficulty_b: float,
        discrimination_a: float = 1.0,
        guessing_c: float = 0.0
    ) -> float:
        """
        2PL logistic probability of a correct response:
        P(theta) = c + (1 - c) / (1 + exp(-a * (theta - b)))
        """
        exponent = -discrimination_a * (theta - difficulty_b)
        # Prevent overflow
        if exponent > 35:
            return guessing_c
        elif exponent < -35:
            return 1.0
        
        logistic = 1.0 / (1.0 + math.exp(exponent))
        return guessing_c + (1.0 - guessing_c) * logistic

    @classmethod
    def calculate_fisher_information(
        cls,
        theta: float,
        difficulty_b: float,
        discrimination_a: float = 1.0,
        guessing_c: float = 0.0
    ) -> float:
        """
        Fisher Information I(theta) quantifying measurement precision at ability level theta.
        """
        p = cls.calculate_probability(theta, difficulty_b, discrimination_a, guessing_c)
        q = 1.0 - p
        
        if guessing_c == 0.0:
            return (discrimination_a ** 2) * p * q
        
        num = (discrimination_a ** 2) * ((p - guessing_c) ** 2) * q
        den = ((1.0 - guessing_c) ** 2) * p
        return num / den if den > 0 else 0.0

    @classmethod
    def update_theta_bayesian(
        cls,
        current_theta: float,
        item_responses: List[Dict[str, Any]],
        prior_mean: float = 0.0,
        prior_variance: float = 1.0
    ) -> Dict[str, float]:
        """
        Updates latent ability theta using Maximum A Posteriori (MAP) Newton-Raphson.
        Each entry in item_responses must contain:
        {'difficulty_b': float, 'discrimination_a': float, 'guessing_c': float, 'is_correct': bool}
        """
        if not item_responses:
            return {"theta": current_theta, "standard_error": 1.0}

        theta = current_theta

        for _ in range(cls.MAX_ITERATIONS):
            first_derivative = -(theta - prior_mean) / prior_variance
            second_derivative = -1.0 / prior_variance

            for item in item_responses:
                b = item.get("difficulty_b", 0.0)
                a = item.get("discrimination_a", 1.0)
                c = item.get("guessing_c", 0.0)
                u = 1.0 if item.get("is_correct") else 0.0

                p = cls.calculate_probability(theta, b, a, c)
                q = 1.0 - p

                p_star = (p - c) / (1.0 - c) if c < 1.0 else p
                
                # First derivative of log-likelihood
                dp_dtheta = a * p_star * q
                if p > 0 and q > 0:
                    score = (u - p) / (p * q) * dp_dtheta
                    first_derivative += score

                    # Information (negative second derivative)
                    info = cls.calculate_fisher_information(theta, b, a, c)
                    second_derivative -= info

            if abs(second_derivative) < 1e-6:
                break

            step = first_derivative / second_derivative
            theta_next = theta - step
            theta_next = max(cls.THETA_MIN, min(cls.THETA_MAX, theta_next))

            if abs(theta_next - theta) < cls.CONVERGENCE_EPSILON:
                theta = theta_next
                break

            theta = theta_next

        # Total test information at final theta
        total_info = 1.0 / prior_variance
        for item in item_responses:
            total_info += cls.calculate_fisher_information(
                theta,
                item.get("difficulty_b", 0.0),
                item.get("discrimination_a", 1.0),
                item.get("guessing_c", 0.0)
            )

        standard_error = 1.0 / math.sqrt(max(0.01, total_info))

        return {
            "theta": round(theta, 3),
            "standard_error": round(standard_error, 3)
        }

    @classmethod
    def select_next_optimal_item(
        cls,
        current_theta: float,
        available_items: List[Dict[str, Any]],
        completed_item_ids: List[str]
    ) -> Optional[Dict[str, Any]]:
        """
        Selects the unadministered item that maximizes Fisher Information at current theta.
        """
        best_item = None
        max_info = -1.0

        for item in available_items:
            if item.get("id") in completed_item_ids:
                continue

            info = cls.calculate_fisher_information(
                theta=current_theta,
                difficulty_b=item.get("difficulty_b", 0.0),
                discrimination_a=item.get("discrimination_a", 1.0),
                guessing_c=item.get("guessing_c", 0.0)
            )

            if info > max_info:
                max_info = info
                best_item = item

        return best_item
