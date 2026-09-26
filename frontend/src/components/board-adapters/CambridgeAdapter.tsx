import React, { useState } from 'react';
import { AssessmentItem } from '../../lib/types';
import { Calculator, Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  item: AssessmentItem;
  onSubmitAnswer: (answer: string) => void;
}

export const CambridgeAdapter: React.FC<Props> = ({ item, onSubmitAnswer }) => {
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcMemory, setCalcMemory] = useState<number | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(true);

  // Command word extraction & highlighting
  const commandWord = item.commandWord || 'Calculate & Deduce';

  // Calculator button handler
  const handleCalcClick = (val: string) => {
    if (val === 'C') {
      setCalcDisplay('0');
      setCalcMemory(null);
    } else if (val === '=') {
      try {
        // Safe evaluation for basic math expression
        const cleanExpr = calcDisplay.replace(/×/g, '*').replace(/÷/g, '/').replace(/\^/g, '**');
        // Simple evaluation restricted to digits and math operators
        if (/^[0-9+\-*/(). ]+$/.test(cleanExpr)) {
          const res = Function(`'use strict'; return (${cleanExpr})`)();
          setCalcDisplay(String(Number(res.toFixed(4))));
        }
      } catch (err) {
        setCalcDisplay('Error');
      }
    } else if (val === '√') {
      const num = parseFloat(calcDisplay);
      setCalcDisplay(String(Math.sqrt(num).toFixed(4)));
    } else if (val === 'sin') {
      const rad = (parseFloat(calcDisplay) * Math.PI) / 180;
      setCalcDisplay(String(Math.sin(rad).toFixed(4)));
    } else if (val === 'cos') {
      const rad = (parseFloat(calcDisplay) * Math.PI) / 180;
      setCalcDisplay(String(Math.cos(rad).toFixed(4)));
    } else {
      setCalcDisplay(prev => (prev === '0' || prev === 'Error' ? val : prev + val));
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmitAnswer(userAnswer);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm relative text-slate-900">
      {/* Cambridge Header Ribbon */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 bg-sky-50 border border-sky-200 rounded-lg text-sky-800 font-semibold text-xs tracking-wider uppercase">
            Cambridge IGCSE Matrix
          </div>
          <span className="text-xs text-slate-500">Scientific Rigor & Command Taxonomy</span>
        </div>

        {/* Command Word Constraint Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-sky-50 border border-sky-200 rounded-full text-sky-800 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5 text-sky-600" />
          <span>Syllabus Command Word: [{commandWord}]</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Question & Scientific Input */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="text-xs uppercase font-bold text-slate-500 mb-2">Examination Inquiry:</div>
            <p className="text-slate-800 text-sm leading-relaxed font-sans">
              {item.prompt}
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs text-sky-800 flex items-center justify-between">
            <span>Precision Rule: State numerical answers to exactly <strong>3 significant figures</strong> unless exact.</span>
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="text-xs bg-sky-600 hover:bg-sky-500 text-white font-medium px-3 py-1 rounded-lg flex items-center gap-1 cursor-pointer transition shadow-xs"
            >
              <Calculator className="w-3 h-3" />
              <span>{showCalculator ? 'Hide Calculator' : 'Show Scientific Calc'}</span>
            </button>
          </div>

          {/* Student Response Area */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Candidate Response (Formulaic Working & Final Magnitude):
            </label>
            <textarea
              rows={3}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="State working equations (e.g. F_net = Thrust - Weight; a = F_net / m) and final result..."
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 font-mono focus:ring-2 focus:ring-sky-500 focus:outline-none shadow-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-500">Unit conformity required (e.g., m/s², N, J).</span>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer"
            >
              <span>Submit for Command Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {submitted && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-sky-200 text-xs">
              <div className="flex items-center gap-1.5 text-sky-700 font-semibold mb-1">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span>Cambridge Examiner Mark Scheme Alignment:</span>
              </div>
              <p className="text-slate-800 font-mono">{item.sampleSolution}</p>
            </div>
          )}
        </div>

        {/* Right Col: Interactive Scientific Calculator Window */}
        {showCalculator && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-sky-600" />
                <span>CIE Scientific Calc</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">DEG Mode</span>
            </div>

            {/* Display */}
            <div className="bg-white border border-slate-200 rounded-lg p-3 text-right text-lg font-mono text-emerald-600 mb-3 overflow-x-auto shadow-inner">
              {calcDisplay}
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-4 gap-1.5 text-xs font-mono">
              {['sin', 'cos', '√', 'C'].map(k => (
                <button
                  key={k}
                  onClick={() => handleCalcClick(k)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg transition cursor-pointer"
                >
                  {k}
                </button>
              ))}
              {['7', '8', '9', '÷'].map(k => (
                <button
                  key={k}
                  onClick={() => handleCalcClick(k)}
                  className={`py-2 rounded-lg transition cursor-pointer ${k === '÷' ? 'bg-sky-100 text-sky-800 font-bold hover:bg-sky-200' : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200 shadow-xs'}`}
                >
                  {k}
                </button>
              ))}
              {['4', '5', '6', '×'].map(k => (
                <button
                  key={k}
                  onClick={() => handleCalcClick(k)}
                  className={`py-2 rounded-lg transition cursor-pointer ${k === '×' ? 'bg-sky-100 text-sky-800 font-bold hover:bg-sky-200' : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200 shadow-xs'}`}
                >
                  {k}
                </button>
              ))}
              {['1', '2', '3', '-'].map(k => (
                <button
                  key={k}
                  onClick={() => handleCalcClick(k)}
                  className={`py-2 rounded-lg transition cursor-pointer ${k === '-' ? 'bg-sky-100 text-sky-800 font-bold hover:bg-sky-200' : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200 shadow-xs'}`}
                >
                  {k}
                </button>
              ))}
              {['0', '.', '=', '+'].map(k => (
                <button
                  key={k}
                  onClick={() => handleCalcClick(k)}
                  className={`py-2 rounded-lg transition font-bold cursor-pointer ${
                    k === '=' ? 'bg-sky-600 hover:bg-sky-500 text-white col-span-1 shadow-xs' :
                    k === '+' ? 'bg-sky-100 text-sky-800 hover:bg-sky-200' : 'bg-white text-slate-800 hover:bg-slate-100 border border-slate-200 shadow-xs'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 text-center mt-3">
              Approved exam simulator (Non-programmable)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
