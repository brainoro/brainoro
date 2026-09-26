import React, { useState } from 'react';
import { CurriculumConcept, RemediationTarget, BoardId } from '../../lib/types';
import { GraphClientEngine } from '../../lib/engine/graphEngine';
import { GitFork, AlertCircle, ArrowUpRight, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

interface Props {
  concepts: CurriculumConcept[];
  selectedBoardId: BoardId;
}

export const DependencyGraphVisualizer: React.FC<Props> = ({ concepts, selectedBoardId }) => {
  const [failedNodeId, setFailedNodeId] = useState<string | null>(null);
  const [remediation, setRemediation] = useState<{
    remediationTargets: RemediationTarget[];
    upstreamLineage: string[];
    rootCauseId: string;
  } | null>(null);

  // Filter concepts by active board
  const boardConcepts = concepts.filter(c => c.boardId === selectedBoardId);

  const handleSimulateFailure = (conceptId: string) => {
    setFailedNodeId(conceptId);
    const result = GraphClientEngine.resolveRemediation(conceptId, concepts);
    setRemediation(result);
  };

  const handleClearRemediation = () => {
    setFailedNodeId(null);
    setRemediation(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <GitFork className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Knowledge Graph & Root-Cause Remediation Resolver
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Adjacency DAG traversal upward along tree lineage to diagnose prerequisite knowledge debts.
          </p>
        </div>

        {remediation && (
          <button
            onClick={handleClearRemediation}
            className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-xl transition border border-slate-200 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Diagnosis</span>
          </button>
        )}
      </div>

      {/* Interactive Concept Node Tree Visualizer */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="text-xs uppercase font-bold text-slate-500 mb-4 flex items-center justify-between">
          <span>Active Hierarchy Lineage ({selectedBoardId})</span>
          <span className="text-[11px] text-slate-500">Click &quot;Test Failure&quot; to trace prerequisite debt</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {boardConcepts.map((concept, index) => {
            const isFailed = failedNodeId === concept.id;
            const isRemediationTarget = remediation?.upstreamLineage.includes(concept.id);
            const isRootCause = remediation?.rootCauseId === concept.id;

            return (
              <div
                key={concept.id}
                className={`p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isFailed
                    ? 'bg-rose-50 border-rose-400 shadow-sm'
                    : isRootCause
                    ? 'bg-amber-50 border-amber-400 shadow-sm ring-2 ring-amber-400/50'
                    : isRemediationTarget
                    ? 'bg-indigo-50 border-indigo-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      Tier {index + 1}
                    </span>
                    {isRootCause && (
                      <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap className="w-3 h-3" /> Root Cause Gap
                      </span>
                    )}
                    {isFailed && (
                      <span className="text-[10px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Failed Node
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1">{concept.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {concept.coreLogicEssence}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    {concept.parentNodeId ? `Parent: ${concept.parentNodeId.split('-').pop()}` : 'Root Parent'}
                  </span>

                  <button
                    onClick={() => handleSimulateFailure(concept.id)}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Simulate Failure</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upward Lineage Remediation Diagnosis Panel */}
      {remediation && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 animate-fadeIn">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-3">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span>Upstream Root-Cause Remediation Plan Generated</span>
          </div>

          <p className="text-xs text-slate-700 mb-4 leading-relaxed">
            The student struggled on <strong className="text-rose-700">{failedNodeId}</strong>. The graph resolver traversed
            upward along the adjacency list to isolate foundational prerequisite weaknesses:
          </p>

          <div className="space-y-3">
            {remediation.remediationTargets.map((target) => (
              <div
                key={target.conceptId}
                className="bg-white border border-amber-200/80 rounded-xl p-3.5 flex items-start justify-between gap-3 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-amber-900">{target.title}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono border border-slate-200">
                      Distance: -{target.distanceFromFailedNode} Tier(s)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">{target.actionItem}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block">Weight</span>
                  <span className="text-xs font-mono font-bold text-amber-700">{target.dependencyWeight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
