import { CurriculumConcept, RemediationTarget } from '../types';

export class GraphClientEngine {
  static resolveRemediation(
    failedConceptId: string,
    allConcepts: CurriculumConcept[]
  ): {
    remediationTargets: RemediationTarget[];
    upstreamLineage: string[];
    rootCauseId: string;
  } {
    const conceptsMap = new Map<string, CurriculumConcept>();
    allConcepts.forEach(c => conceptsMap.set(c.id, c));

    const remediationTargets: RemediationTarget[] = [];
    const upstreamLineage: string[] = [];
    const visited = new Set<string>();

    const queue: { id: string; distance: number; weight: number }[] = [
      { id: failedConceptId, distance: 0, weight: 1.0 }
    ];
    visited.add(failedConceptId);

    let rootCauseId = failedConceptId;

    while (queue.length > 0) {
      const current = queue.shift()!;
      const concept = conceptsMap.get(current.id);
      if (!concept) continue;

      const parents: string[] = [];
      if (concept.parentNodeId) parents.push(concept.parentNodeId);
      if (concept.prerequisites) {
        concept.prerequisites.forEach(p => {
          if (!parents.includes(p)) parents.push(p);
        });
      }

      for (const pId of parents) {
        if (!visited.has(pId)) {
          visited.add(pId);
          upstreamLineage.push(pId);
          const pInfo = conceptsMap.get(pId);
          const nextWeight = current.weight * 0.9;

          remediationTargets.push({
            conceptId: pId,
            title: pInfo ? pInfo.title : pId,
            coreLogicEssence: pInfo ? pInfo.coreLogicEssence : 'Foundational prerequisite building block.',
            distanceFromFailedNode: current.distance + 1,
            dependencyWeight: Number(nextWeight.toFixed(2)),
            actionItem: `Foundational Remediation: Review "${pInfo ? pInfo.title : pId}" to restore mastery before re-attempting "${concept.title}".`
          });

          queue.push({ id: pId, distance: current.distance + 1, weight: nextWeight });
          rootCauseId = pId;
        }
      }
    }

    return {
      remediationTargets,
      upstreamLineage,
      rootCauseId
    };
  }
}
