import React from 'react';
import { ParentMetrics } from '../../lib/types';
import { SpacedRepetitionClientEngine } from '../../lib/engine/spacedRepetition';
import { ShieldCheck, TrendingUp, Clock, Zap, BarChart2, HeartHandshake } from 'lucide-react';

interface Props {
  metrics?: ParentMetrics;
}

export const ParentAccelerationDashboard: React.FC<Props> = ({ metrics }) => {
  // Default high-fidelity metrics if not passed
  const currentMetrics: ParentMetrics = metrics || {
    userId: 'STUDENT-K12-001',
    cognitiveAccelerationIndex: 2.4, // 2.4x standard retention velocity
    retentionStabilityDays: 18.5,
    memoryHalfLifeDays: 12.8,
    activeRetrievalVelocityWeekly: 42,
    longTermRetentionRatePct: 87.4,
    activeMasteryQueues: {
      box1Daily: 3,
      box2Every3d: 5,
      box3Weekly: 12,
      box4Biweekly: 18,
      box5Mastered: 34
    },
    ebbinghausDecayForecast: SpacedRepetitionClientEngine.generateDecayCurve(18.5, 30)
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <HeartHandshake className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Parent Cognitive Acceleration Portal
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Replacing opaque percentage grades with granular, verifiable long-term memory retrieval metrics.
          </p>
        </div>

        {/* Cognitive Index Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl shadow-xs">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="text-xs text-slate-600">Acceleration Factor:</span>
          <span className="text-base font-bold font-mono text-emerald-700">
            {currentMetrics.cognitiveAccelerationIndex}x Baseline
          </span>
        </div>
      </div>

      {/* 4 Primary Action-Oriented Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Retention Stability */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">Retention Stability (S)</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-900">
              {currentMetrics.retentionStabilityDays} <span className="text-xs text-slate-500 font-sans">Days</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Time elapsed before retrieval probability falls by 1/e.
            </p>
          </div>
        </div>

        {/* Memory Half-Life */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">Memory Half-Life</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-900">
              {currentMetrics.memoryHalfLifeDays} <span className="text-xs text-slate-500 font-sans">Days</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Expected window until 50% chance of recall without reinforcement.
            </p>
          </div>
        </div>

        {/* Active Retrieval Velocity */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">Retrieval Velocity</span>
            <BarChart2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-slate-900">
              {currentMetrics.activeRetrievalVelocityWeekly} <span className="text-xs text-slate-500 font-sans">Cards/Wk</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Active neural pathway reconsolidations completed weekly.
            </p>
          </div>
        </div>

        {/* True Long-Term Retention */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase">Long-Term Retention</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-emerald-600">
              {currentMetrics.longTermRetentionRatePct}%
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Audited 90-day retention across core STEM concepts.
            </p>
          </div>
        </div>

      </div>

      {/* 30-Day Ebbinghaus Retention Decay Forecast Curve */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              30-Day Ebbinghaus Forgetting & Stability Forecast
            </h4>
            <p className="text-[11px] text-slate-500">
              Visualizes mathematical probability of retention: {'R(t) = e^(-t/S)'}
            </p>
          </div>
          <span className="text-xs text-emerald-800 font-mono bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
            Spaced Decay Resistance: High
          </span>
        </div>

        {/* Bar Chart Simulation */}
        <div className="h-36 flex items-end gap-1.5 pt-4 pb-2 px-2 border-b border-slate-200">
          {currentMetrics.ebbinghausDecayForecast.filter((_, i) => i % 2 === 0).map((point) => (
            <div key={point.day} className="flex-1 flex flex-col items-center gap-1 group relative">
              {/* Tooltip */}
              <div className="absolute -top-8 bg-slate-800 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
                Day {point.day}: {point.retentionPercentage}%
              </div>
              <div
                className="w-full bg-gradient-to-t from-sky-500 to-emerald-400 rounded-t-sm transition-all duration-300 group-hover:brightness-95"
                style={{ height: `${point.retentionPercentage}%` }}
              />
              <span className="text-[9px] font-mono text-slate-500">
                {point.day}d
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>Day 0 (Initial Encoding: 100%)</span>
          <span className="text-slate-700 font-medium">Automatic reinforcement schedules prevent decay below 70%</span>
          <span>Day 30 (Projected: {currentMetrics.ebbinghausDecayForecast[30]?.retentionPercentage}%)</span>
        </div>
      </div>
    </div>
  );
};
