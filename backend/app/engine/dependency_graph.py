from typing import List, Dict, Any, Optional, Set

class DependencyGraphResolver:
    """
    DAG Concept Dependency and Remediation Path Resolver.
    Traverses tree lineage and dependency edges upward to isolate prerequisite gaps
    when a student fails an application test parameter.
    """

    @classmethod
    def resolve_remediation_path(
        cls,
        failed_concept_id: str,
        concepts_lookup: Dict[str, Dict[str, Any]],
        dependencies_lookup: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        """
        Traverses upward from failed_concept_id through parent_node_id and explicit prerequisites.
        Returns ordered remediation targets with distance and actionable diagnosis.
        """
        remediation_targets = []
        upstream_lineage = []
        visited: Set[str] = set()

        # Build adjacency graph: target_concept_id -> list of prerequisite_concept_ids
        adj_pre: Dict[str, List[Dict[str, Any]]] = {}
        for dep in dependencies_lookup:
            t = dep.get("target_concept_id")
            p = dep.get("prerequisite_concept_id")
            w = dep.get("dependency_weight", 1.0)
            if t not in adj_pre:
                adj_pre[t] = []
            adj_pre[t].append({"prereq_id": p, "weight": w})

        # Breadth-first / upward tree traversal
        queue = [(failed_concept_id, 0, 1.0)]
        visited.add(failed_concept_id)

        root_cause_node_id = None

        while queue:
            curr_id, distance, weight = queue.pop(0)

            # Upstream parent node check
            curr_concept = concepts_lookup.get(curr_id)
            if not curr_concept:
                continue

            parent_id = curr_concept.get("parent_node_id")

            # Collect immediate and transitive prerequisites
            prereqs = adj_pre.get(curr_id, [])
            if parent_id and parent_id not in [p["prereq_id"] for p in prereqs]:
                prereqs.append({"prereq_id": parent_id, "weight": 0.9})

            for item in prereqs:
                pid = item["prereq_id"]
                pw = item["weight"]
                if pid and pid not in visited:
                    visited.add(pid)
                    upstream_lineage.append(pid)
                    p_info = concepts_lookup.get(pid, {})
                    
                    target = {
                        "concept_id": pid,
                        "title": p_info.get("title", pid),
                        "core_logic_essence": p_info.get("core_logic_essence", "Foundational prerequisite"),
                        "distance_from_failed_node": distance + 1,
                        "dependency_weight": round(weight * pw, 2),
                        "action_item": f"Revisit {p_info.get('title', pid)} to patch foundational cognitive gaps before re-attempting {curr_concept.get('title', failed_concept_id)}."
                    }
                    remediation_targets.append(target)
                    queue.append((pid, distance + 1, weight * pw))
                    root_cause_node_id = pid

        return {
            "failed_concept_id": failed_concept_id,
            "remediation_targets": remediation_targets,
            "upstream_lineage": upstream_lineage,
            "root_cause_node_id": root_cause_node_id or failed_concept_id
        }
