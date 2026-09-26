import React, { useState } from 'react';
import { BoardId } from '../../lib/types';
import { synthesizeCornellContent } from '../../lib/engine/geminiSynthesis';
import { X, Sparkles, ShieldCheck, BookOpen, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeBoardId: BoardId;
  onIngestionSuccess: (newConceptId: string, newConceptData?: any) => void;
}

export const ContentIngestionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  activeBoardId,
  onIngestionSuccess,
}) => {
  const [boardId, setBoardId] = useState<string>(activeBoardId);
  const [subjectId, setSubjectId] = useState<string>('PHYSICS');
  const [gradeLevel, setGradeLevel] = useState<number>(9);
  const [topicId, setTopicId] = useState<string>('LIGHT');
  const [rawSourceData, setRawSourceData] = useState<string>(
    `OpenStax Physics Chapter 25: Geometric Optics and Light Reflection/Refraction.\n\n` +
    `When light strikes an optical interface, the angle of reflection equals the angle of incidence: angle_i = angle_r. ` +
    `When light transitions from a rarer medium into a denser medium (e.g. air to glass), it bends towards the normal according to Snell's Law: n1 * sin(theta1) = n2 * sin(theta2).`
  );
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [resultSuccess, setResultSuccess] = useState<string | null>(null);

  // Sync boardId when activeBoardId changes
  React.useEffect(() => {
    setBoardId(activeBoardId);
  }, [activeBoardId]);

  if (!isOpen) return null;

  const handleProcess = async () => {
    setIsSynthesizing(true);
    setResultSuccess(null);

    // Sanitize Topic Tracking Key as uppercase slug (e.g. LIGHT)
    const sanitizedTopic = topicId
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9_-]/g, '')
      .replace(/\s+/g, '-');
    const finalTopicId = sanitizedTopic || 'CONCEPT';

    try {
      const res = await synthesizeCornellContent({
        boardId,
        subjectId,
        gradeLevel,
        topicId: finalTopicId,
        rawSourceData,
      });

      setResultSuccess(`Successfully synthesized original concept: ${res.conceptId}`);

      setTimeout(() => {
        onIngestionSuccess(res.conceptId, {
          id: res.conceptId,
          boardId: boardId as any,
          subjectId,
          gradeLevel,
          title: res.title || finalTopicId.replace(/[-_]/g, ' '),
          coreLogicEssence: res.summary,
          parentNodeId: null,
        });
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Error during OER ingestion:', err);
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl p-6 space-y-5">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Open Educational Resources (OER) AI Pipeline</h3>
              <p className="text-xs text-slate-400">Ingest CK-12 FlexBooks & OpenStax text into original owned IP assets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* IP Safety Alert Banner */}
        <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Automated Intellectual Property Guardrails Active:</span> The AI synthesis engine
            is constrained to forbid verbatim reproduction of source passages. Content is transformed into newly synthesized
            analogies, original step-by-step proofs, and novel validation exercises.
          </div>
        </div>

        {/* Input Parameters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Target Board:</label>
            <select
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="CBSE">CBSE</option>
              <option value="CAMBRIDGE">Cambridge</option>
              <option value="IB_MYP">IB MYP</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Subject Field:</label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="MATH">Mathematics</option>
              <option value="PHYSICS">Physics</option>
              <option value="SCIENCE">Science</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Grade Index:</label>
            <select
              value={gradeLevel}
              onChange={(e) => setGradeLevel(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:ring-1 focus:ring-emerald-500"
            >
              <option value={9}>Class 9</option>
              <option value={10}>Class 10</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1 font-medium">Topic Tracking Key:</label>
            <input
              type="text"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value.toUpperCase())}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono text-xs focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Source Text Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-sky-400" />
            <span>Raw Open Educational Resource Markdown (OpenStax / CK-12):</span>
          </label>
          <textarea
            rows={5}
            value={rawSourceData}
            onChange={(e) => setRawSourceData(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono leading-relaxed focus:ring-1 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {resultSuccess && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-700/80 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{resultSuccess}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <span className="text-[11px] text-slate-400">Strict JSON formatting template configuration</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleProcess}
              disabled={isSynthesizing}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition shadow-md shadow-emerald-600/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isSynthesizing ? 'Processing Synthesis...' : 'Execute Ingestion'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
