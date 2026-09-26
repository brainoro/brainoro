import React, { useState } from 'react';
import { AssessmentItem } from '../../lib/types';
import { CheckCircle2, XCircle, AlertCircle, FileText, ArrowRight, Sparkles, Award, RotateCcw } from 'lucide-react';
import { MathText } from '../common/MathRenderer';

interface Props {
  item: AssessmentItem;
  onVerifyProof: (success: boolean) => void;
}

export const CBSEAdapter: React.FC<Props> = ({ item, onVerifyProof }) => {
  // Objective MCQ State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasEvaluatedObjective, setHasEvaluatedObjective] = useState(false);

  // Subjective State
  const [subjectiveInput, setSubjectiveInput] = useState('');
  const [showSubjectiveBenchmark, setShowSubjectiveBenchmark] = useState(false);

  // Legacy Step State
  const [stepInputs, setStepInputs] = useState<{ [key: number]: string }>({});
  const [submittedSteps, setSubmittedSteps] = useState(false);
  const [stepResults, setStepResults] = useState<{ [key: number]: boolean }>({});

  const isObjective = item.questionType === 'OBJECTIVE' || (item.options && item.options.length > 0);
  const isSubjective = item.questionType === 'SUBJECTIVE';

  // Handle Objective Option Selection
  const handleSelectOption = (index: number) => {
    if (hasEvaluatedObjective) return;
    setSelectedOption(index);
    setHasEvaluatedObjective(true);
    const isCorrect = index === (item.correctOptionIndex ?? 0);
    onVerifyProof(isCorrect);
  };

  // Handle Subjective Submission
  const handleEvaluateSubjective = (isApproved: boolean) => {
    onVerifyProof(isApproved);
  };

  // Handle Legacy Steps
  const steps = item.proceduralSteps || [
    { step: 1, instruction: 'State the given equation and isolate variable terms', expected: 'standard form' },
    { step: 2, instruction: 'Execute algebraic substitution for boundary condition', expected: 'intercept value' },
    { step: 3, instruction: 'State final conclusion coordinate set', expected: 'coordinate pair' }
  ];

  const handleStepInputChange = (stepNumber: number, val: string) => {
    setStepInputs(prev => ({ ...prev, [stepNumber]: val }));
  };

  const handleEvaluateSteps = () => {
    const results: { [key: number]: boolean } = {};
    let allValid = true;

    steps.forEach(s => {
      const userText = (stepInputs[s.step] || '').trim().toLowerCase();
      const isValid = userText.length > 2;
      results[s.step] = isValid;
      if (!isValid) allValid = false;
    });

    setStepResults(results);
    setSubmittedSteps(true);
    onVerifyProof(allValid);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative overflow-hidden text-slate-900">
      {/* Board Header Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {item.sourceTag ||
                (item.boardType === 'IB_MYP'
                  ? 'IB MYP Inquiry Prompt'
                  : item.boardType === 'CAMBRIDGE'
                  ? 'Cambridge Past Paper Question'
                  : 'CBSE Competency Question')}
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {isObjective ? 'Objective Competency Mode' : isSubjective ? 'Subjective Analytical Mode' : 'Deductive Proof Mode'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-sky-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>
            {item.boardType === 'IB_MYP'
              ? 'IB MYP Question Matrix'
              : item.boardType === 'CAMBRIDGE'
              ? 'Cambridge Question Bank'
              : 'Statutory Question Bank'}
          </span>
        </div>
      </div>

      {/* Formal Problem Statement */}
      <div className="mb-6">
        <h4 className="text-xs uppercase font-bold text-slate-500 mb-2 flex items-center gap-2 tracking-wider">
          <FileText className="w-3.5 h-3.5 text-amber-600" />
          <span>Problem Prompt:</span>
        </h4>
        <div className="text-slate-900 text-sm sm:text-base bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed font-sans font-medium">
          <MathText text={item.prompt} />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: OBJECTIVE MCQ FORMAT (Primary Mode for Maths / Numericals)         */}
      {/* ========================================================================= */}
      {isObjective && item.options && item.options.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
            Select the Correct Answer:
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {item.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOption = idx === (item.correctOptionIndex ?? 0);
              const optionLetters = ['A', 'B', 'C', 'D'];

              let btnStyle = 'bg-white border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 text-slate-800';
              let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';

              if (hasEvaluatedObjective) {
                if (isCorrectOption) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-1 ring-emerald-400/30';
                  badgeStyle = 'bg-emerald-500 text-white border-emerald-500';
                } else if (isSelected && !isCorrectOption) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400/30';
                  badgeStyle = 'bg-rose-500 text-white border-rose-500';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasEvaluatedObjective}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer shadow-xs ${btnStyle}`}
                >
                  <span className={`w-6 h-6 rounded-lg border text-xs font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 ${badgeStyle}`}>
                    {optionLetters[idx]}
                  </span>
                  <div className="flex-1 min-w-0 text-xs sm:text-sm font-sans break-words">
                    <MathText text={option} />
                  </div>
                  {hasEvaluatedObjective && isCorrectOption && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {hasEvaluatedObjective && isSelected && !isCorrectOption && (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Solution & Pedagogical Explanation Panel */}
          {hasEvaluatedObjective && (
            <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                {selectedOption === (item.correctOptionIndex ?? 0) ? (
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs bg-emerald-100/80 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Correct Answer! Ability Score Updated (+θ)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-rose-700 font-bold text-xs bg-rose-100/80 px-2.5 py-1 rounded-lg border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                    Incorrect — Concept queued to Revise Box 1
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 font-sans leading-relaxed">
                <span className="font-bold text-slate-900 block font-mono text-[11px] uppercase tracking-wider">
                  Worked Benchmark Solution:
                </span>
                <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-800 whitespace-pre-wrap">
                  <MathText text={item.sampleSolution} />
                </div>
                {item.explanation && (
                  <p className="text-slate-600 pt-1 text-xs">
                    <strong>Examiner Insight:</strong> <MathText text={item.explanation} />
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: SUBJECTIVE ANALYTICAL FORMAT (Available for Non-Math Subjects)     */}
      {/* ========================================================================= */}
      {isSubjective && (
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
            Student Answer Draft (2–3 Marks):
          </h4>

          <textarea
            rows={4}
            value={subjectiveInput}
            onChange={(e) => setSubjectiveInput(e.target.value)}
            placeholder="Write your analytical response using key statutory terminology and structured bullet points..."
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm rounded-xl p-3.5 font-sans focus:outline-none focus:ring-2 focus:ring-sky-500/30 shadow-inner"
          />

          {!showSubjectiveBenchmark ? (
            <div className="flex justify-end pt-2">
              <button
                disabled={subjectiveInput.trim().length < 3}
                onClick={() => setShowSubjectiveBenchmark(true)}
                className={`flex items-center gap-2 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm ${
                  subjectiveInput.trim().length >= 3
                    ? 'bg-sky-600 hover:bg-sky-500 text-white cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                }`}
              >
                <span>
                  Verify Against Official{' '}
                  {item.boardType === 'IB_MYP'
                    ? 'IB MYP'
                    : item.boardType === 'CAMBRIDGE'
                    ? 'Cambridge'
                    : 'CBSE'}{' '}
                  Marking Scheme
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-3 border-t border-slate-200 animate-fadeIn">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <span className="font-bold text-emerald-800 text-xs uppercase tracking-wider block font-mono">
                  Official{' '}
                  {item.boardType === 'IB_MYP'
                    ? 'IB MYP'
                    : item.boardType === 'CAMBRIDGE'
                    ? 'Cambridge'
                    : 'CBSE'}{' '}
                  Model Marking Scheme Answer:
                </span>
                <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  <MathText text={item.sampleSolution} />
                </div>

                {item.rubricGuide && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <span className="font-bold text-slate-700 text-xs block">Marking Rubric Breakdown:</span>
                    {item.rubricGuide.map((rubric, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{rubric}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Self-Assessment Quality Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-xs font-semibold text-slate-700">
                  How closely did your points match the official model answer?
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEvaluateSubjective(false)}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs rounded-lg transition cursor-pointer"
                  >
                    Missed Key Terms (-θ)
                  </button>
                  <button
                    onClick={() => handleEvaluateSubjective(true)}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition cursor-pointer shadow-xs"
                  >
                    Matched Model Scheme (+θ)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: LEGACY PROCEDURAL STEP PROOFS (Fallback)                           */}
      {/* ========================================================================= */}
      {!isObjective && !isSubjective && (
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
            Deductive Step Proof Matrix
          </h4>

          {steps.map(s => {
            const isEvaluated = submittedSteps;
            const isSuccess = stepResults[s.step];

            return (
              <div
                key={s.step}
                className={`p-4 rounded-xl border transition-all ${
                  isEvaluated
                    ? isSuccess
                      ? 'bg-emerald-50 border-emerald-300'
                      : 'bg-rose-50 border-rose-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-800">
                    Step {s.step}: {s.instruction}
                  </span>
                  {isEvaluated && (
                    isSuccess ? (
                      <span className="flex items-center gap-1 text-emerald-700 text-xs font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Step
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-700 text-xs font-medium">
                        <AlertCircle className="w-4 h-4 text-rose-600" /> Incomplete Proof
                      </span>
                    )
                  )}
                </div>

                <input
                  type="text"
                  placeholder={`Write mathematical step proof... (e.g., ${s.expected})`}
                  value={stepInputs[s.step] || ''}
                  onChange={(e) => handleStepInputChange(s.step, e.target.value)}
                  className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2.5 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/30 shadow-xs"
                />
              </div>
            );
          })}

          <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Examiner Note: Answers without sequential step derivation receive zero marks under{' '}
              {item.boardType === 'IB_MYP'
                ? 'IB MYP'
                : item.boardType === 'CAMBRIDGE'
                ? 'Cambridge'
                : 'CBSE'}{' '}
              marking schemes.
            </p>
            <button
              onClick={handleEvaluateSteps}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              <span>Validate Deductive Proof</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {submittedSteps && (
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-semibold text-amber-700">Reference Benchmark Proof: </span>
              <span className="font-mono">{item.sampleSolution}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

