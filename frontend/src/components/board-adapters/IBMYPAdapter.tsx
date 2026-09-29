import React, { useState } from 'react';
import { AssessmentItem } from '../../lib/types';
import { Award, Compass, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';
import { cleanPromptText } from '../../lib/interactive/chapterPracticeEngine';

interface Props {
  item: AssessmentItem;
  onGradeAssessed: (ibGrade: number) => void;
}

export const IBMYPAdapter: React.FC<Props> = ({ item, onGradeAssessed }) => {
  const [rubricScores, setRubricScores] = useState<{ [key: string]: number }>({
    criterionA: 6,
    criterionB: 5,
    criterionC: 7,
    criterionD: 6,
  });
  const [inquiryText, setInquiryText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Criteria definition
  const criteria = [
    { key: 'criterionA', title: 'Criterion A: Knowing & Understanding', desc: 'Explains scientific knowledge, applies scientific concepts to problem-solving, analyzes information.' },
    { key: 'criterionB', title: 'Criterion B: Inquiring & Designing', desc: 'Formulates testable hypotheses, designs independent variables and rigorous experimental controls.' },
    { key: 'criterionC', title: 'Criterion C: Processing & Evaluating', desc: 'Interprets qualitative/quantitative data, discusses validity of hypotheses, identifies limitations.' },
    { key: 'criterionD', title: 'Criterion D: Reflecting on Impacts', desc: 'Explains ways science is applied to address specific issues, discusses implications of ethics & sustainability.' },
  ];

  // Convert aggregate Criteria score (out of 32) to standard IB 1-7 grade scale
  const totalScore = Object.values(rubricScores).reduce((a, b) => a + b, 0);
  const computeIBGrade = (total: number): { grade: number; label: string; color: string } => {
    if (total >= 28) return { grade: 7, label: 'Grade 7: Exemplary Conceptual Insight', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
    if (total >= 24) return { grade: 6, label: 'Grade 6: Comprehensive Scientific Synthesis', color: 'text-teal-700 bg-teal-50 border-teal-300' };
    if (total >= 19) return { grade: 5, label: 'Grade 5: Consistent Analytical Competence', color: 'text-sky-700 bg-sky-50 border-sky-300' };
    if (total >= 15) return { grade: 4, label: 'Grade 4: Basic Foundational Proficiency', color: 'text-amber-700 bg-amber-50 border-amber-300' };
    if (total >= 10) return { grade: 3, label: 'Grade 3: Developing Scientific Reasoning', color: 'text-orange-700 bg-orange-50 border-orange-300' };
    if (total >= 6) return { grade: 2, label: 'Grade 2: Elementary Exposure', color: 'text-rose-700 bg-rose-50 border-rose-300' };
    return { grade: 1, label: 'Grade 1: Minimal Achievement', color: 'text-red-700 bg-red-50 border-red-300' };
  };

  const ibResult = computeIBGrade(totalScore);

  const handleScoreChange = (key: string, val: number) => {
    setRubricScores(prev => ({ ...prev, [key]: val }));
  };

  const handleComplete = () => {
    setSubmitted(true);
    onGradeAssessed(ibResult.grade);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative text-slate-900">
      {/* IB Header Ribbon */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>{item.sourceTag || 'IB MYP Inquiry Prompt'}</span>
          </div>
          <span className="text-xs text-slate-500">Year 4/5 Sciences</span>
        </div>

        {/* Dynamic 1-7 Scale Output Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${ibResult.color}`}>
          <Award className="w-4 h-4" />
          <span>{ibResult.label} (Score: {totalScore}/32)</span>
        </div>
      </div>

      {/* Inquiry Statement */}
      <div className="mb-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
        <div className="text-xs uppercase font-bold text-slate-500 mb-2 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-emerald-600" />
          <span>Global Context & Interdisciplinary Inquiry Prompt:</span>
        </div>
        <p className="text-slate-800 text-sm leading-relaxed">
          {cleanPromptText(item.prompt)}
        </p>
      </div>

      {/* Student Inquiry Response */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
          Holistic Student Synthesis & Critical Evaluation:
        </label>
        <textarea
          rows={4}
          value={inquiryText}
          onChange={(e) => setInquiryText(e.target.value)}
          placeholder="Formulate your structured inquiry addressing trophic balance, thermodynamic entropy, and sustainable societal interventions..."
          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-sans focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed shadow-xs"
        />
      </div>

      {/* Criteria A-D Rubric Scoring Matrix */}
      <div className="space-y-4 mb-6">
        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-emerald-600" />
          <span>Criteria A–D Formative Rubric Allocations (Scale 1–8 per Criterion)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criteria.map((c) => {
            const score = rubricScores[c.key] || 4;
            return (
              <div key={c.key} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-800">{c.title}</span>
                  <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                    {score} / 8
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3 leading-snug">{c.desc}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={score}
                    onChange={(e) => handleScoreChange(c.key, Number(e.target.value))}
                    className="w-full accent-emerald-600 bg-slate-200 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submission Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500">
          Evaluator Mode: Criterion descriptors map dynamically to official IB MYP 1–7 grade boundaries.
        </div>
        <button
          onClick={handleComplete}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
        >
          <span>Calculate Standard IB 1–7 Output</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {submitted && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-emerald-200 text-xs">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold mb-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>IB MYP Inquiry Benchmark Analysis:</span>
          </div>
          <p className="text-slate-800 font-sans">{item.sampleSolution}</p>
        </div>
      )}
    </div>
  );
};
