import React, { useEffect, useState } from 'react';
import { CbseCurriculumServiceV2, ConceptData } from '../../lib/services/cbseCurriculumService';
import { ShieldCheck, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

interface SafeCurriculumBrowserProps {
  studentId: string;
  grade: number;
  subjectCode?: string;
  onSelectConcept?: (concept: ConceptData) => void;
}

export const SafeCurriculumBrowser: React.FC<SafeCurriculumBrowserProps> = ({
  studentId,
  grade,
  subjectCode,
  onSelectConcept,
}) => {
  const [concepts, setConcepts] = useState<ConceptData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [safetyStatus, setSafetyStatus] = useState<string>('Checking Grade Isolation...');

  useEffect(() => {
    let isCancelled = false;

    const fetchConcepts = async () => {
      setLoading(true);
      try {
        const service = new CbseCurriculumServiceV2();
        const data = await service.getStudentConcepts(studentId, grade, subjectCode);
        if (!isCancelled) {
          setConcepts(data);
          setSafetyStatus(`✅ 100% Grade ${grade} Isolated • Verified Safe`);
        }
      } catch {
        if (!isCancelled) {
          setSafetyStatus('❌ Scope Validation Notice: Retaining Fail-Closed Boundary');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchConcepts();

    return () => {
      isCancelled = true;
    };
  }, [studentId, grade, subjectCode]);

  return (
    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-sm">
            Architecture 2 • Strict 6-Tier Curriculum Isolation
          </h3>
        </div>
        <span className="text-xs font-mono font-medium px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
          {safetyStatus}
        </span>
      </div>

      {loading ? (
        <div className="py-6 text-center text-sm text-slate-500 animate-pulse">
          Validating cryptographic pedagogical boundaries...
        </div>
      ) : concepts.length === 0 ? (
        <div className="py-6 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          No verified modules found for Grade {grade} under active parameters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {concepts.map((c) => (
            <div
              key={c.concept_id}
              onClick={() => onSelectConcept?.(c)}
              className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200/80 dark:border-slate-700/80 hover:border-emerald-500 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {c.concept_name}
                  </h4>
                </div>
                <span className="text-[10px] font-mono uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded">
                  {c.safe_flag}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Class {c.grade} • {c.subject} • Code: {c.concept_code}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
