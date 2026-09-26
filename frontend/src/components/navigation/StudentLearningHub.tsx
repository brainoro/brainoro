import React from 'react';
import {
  BookOpen,
  Target,
  BrainCircuit,
  Award,
  Sparkles,
} from 'lucide-react';

export type LearningProgressionStep = 'learn' | 'practice' | 'revise' | 'test';

interface Props {
  currentStep: LearningProgressionStep;
  onSelectStep: (step: LearningProgressionStep) => void;
  conceptTitle: string;
  onNextStep?: () => void;
}

export const StudentLearningHub: React.FC<Props> = ({
  currentStep,
  onSelectStep,
  conceptTitle,
  onNextStep,
}) => {
  const steps: {
    id: LearningProgressionStep;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    cta: string;
  }[] = [
    {
      id: 'learn',
      title: '1. Learn',
      description: 'Visual notes, intuition & statutory concepts',
      icon: BookOpen,
      cta: 'Practice this Concept →',
    },
    {
      id: 'practice',
      title: '2. Practice',
      description: 'Adaptive questions tailored to your skill (IRT)',
      icon: Target,
      cta: 'Revise Key Facts →',
    },
    {
      id: 'revise',
      title: '3. Revise',
      description: 'Spaced repetition queues (SM-2 / Leitner)',
      icon: BrainCircuit,
      cta: 'Take Adaptive Test →',
    },
    {
      id: 'test',
      title: '4. Psychometric Assessment',
      description: 'Root-cause diagnostic & prerequisite knowledge gap analytics',
      icon: Award,
      cta: 'View Diagnostic Report →',
    },
  ];

  const currentStepData = steps.find((s) => s.id === currentStep) || steps[0];

  return (
    <div
      data-testid="student-learning-hub"
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 print:hidden"
    >
      {/* Header & Step Tracker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Student Learning Progression
            </h3>
            <p className="text-[11px] text-slate-500">
              Active Concept: <span className="text-sky-700 font-semibold">{conceptTitle}</span>
            </p>
          </div>
        </div>

        {/* Primary Progression CTA */}
        {onNextStep && (
          <button
            onClick={onNextStep}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition self-start sm:self-auto transform active:scale-95"
          >
            <span>{currentStepData.cta}</span>
          </button>
        )}
      </div>

      {/* 4-Step Progression Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 relative ${
                isActive
                  ? 'bg-sky-50/90 border-sky-500 shadow-sm ring-1 ring-sky-500/30 text-sky-950'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80 text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {isActive && (
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    Active
                  </span>
                )}
              </div>

              <div>
                <h4
                  className={`text-xs font-bold ${
                    isActive ? 'text-sky-950' : 'text-slate-800'
                  }`}
                >
                  {step.title}
                </h4>
                <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 absolute bottom-2 right-2 animate-ping" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
