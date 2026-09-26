import React from 'react';
import { BoardId, Textbook, TextbookChapter, TextbookSection, AuthoritativeCurriculumConcept, AuthoritativeTextbookPart } from '../../lib/types';
import { BookOpen, ChevronRight, ShieldCheck } from 'lucide-react';

interface Props {
  boardId: BoardId;
  gradeLevel: number;
  subjectId: string;
  textbook?: Textbook;
  chapter?: TextbookChapter;
  allChapters?: TextbookChapter[];
  onSelectChapter?: (chapterId: string) => void;
  parts?: AuthoritativeTextbookPart[];
  activePartNumber?: number;
  onSelectPart?: (partNumber: number) => void;
  activeSection?: TextbookSection;
  activeConcept?: AuthoritativeCurriculumConcept;
  isAuthoritative?: boolean;
  status?: 'VERIFIED' | 'PENDING_REVIEW' | 'UNMAPPED' | 'EMPTY' | 'ERROR' | 'DATA_PENDING' | 'SOURCE_AMBIGUOUS';
}

export const CurriculumContextBar: React.FC<Props> = ({
  boardId,
  gradeLevel,
  subjectId,
  textbook,
  chapter,
  allChapters,
  onSelectChapter,
  parts,
  activePartNumber = 1,
  onSelectPart,
  activeSection,
  activeConcept,
  isAuthoritative = true,
  status = 'VERIFIED',
}) => {
  // Format Roman numeral grade for display (e.g., Class VI, Class X)
  const formatGrade = (g: number) => {
    const roman: Record<number, string> = {
      6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII'
    };
    return roman[g] ? `Class ${roman[g]}` : `Grade ${g}`;
  };

  const subjectNames: Record<string, string> = {
    MATH: 'Mathematics',
    SCIENCE: 'Science',
    PHYSICS: 'Physics',
    CHEMISTRY: 'Chemistry',
    BIOLOGY: 'Biology',
    ALL: 'All Subjects',
  };

  // Clean textbook name for learner display (e.g. "Ganita Prakash — Mathematics for Class 6" -> "Ganita Prakash")
  const getLearnerTextbookTitle = (title?: string) => {
    if (!title) return '';
    return title.split('—')[0].split('-')[0].trim();
  };

  return (
    <div
      data-testid="curriculum-context-bar"
      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm print:hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: You Are Here Breadcrumb Hierarchy */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700">
                Curriculum Hierarchy
              </span>
              {isAuthoritative && status === 'VERIFIED' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  NCERT Statutory Verified
                </span>
              )}
              {status === 'PENDING_REVIEW' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Pending Review
                </span>
              )}
            </div>

            {/* Student-Friendly Breadcrumbs */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-600">
              <span className="text-sky-700 font-bold">{boardId}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-indigo-700 font-bold">{formatGrade(gradeLevel)}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-emerald-700 font-bold">{subjectNames[subjectId] || subjectId}</span>

              {textbook && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-900 font-bold">
                    {getLearnerTextbookTitle(textbook.title)}
                  </span>
                </>
              )}

              {chapter && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {allChapters && allChapters.length > 1 && onSelectChapter ? (
                    <select
                      value={chapter.id}
                      onChange={(e) => onSelectChapter(e.target.value)}
                      className="bg-white border border-slate-300 text-slate-900 text-xs font-bold rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer shadow-sm"
                      title="Switch Chapter"
                      aria-label="Switch Chapter"
                    >
                      {allChapters.map((c) => (
                        <option key={c.id} value={c.id} className="bg-white text-slate-900">
                          Chapter {c.chapter_number}: {c.chapter_title}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-slate-900 font-bold">
                      Chapter {chapter.chapter_number}: {chapter.chapter_title}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Center / Multi-Part Pill Selector */}
        {parts && parts.length > 1 && onSelectPart && (
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-xl border border-slate-200">
            {parts.map((p) => {
              const isSelected = p.part_number === activePartNumber;
              return (
                <button
                  key={`part-${p.part_number}`}
                  onClick={() => onSelectPart(p.part_number)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-white text-sky-700 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                  title={`${p.part_title} (${p.total_chapters} Chapters)`}
                >
                  <span>{p.textbook_title || p.part_title}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? 'bg-sky-50 text-sky-700' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {p.total_chapters} ch
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Right: Active Section / Concept Indicator */}
        <div className="flex flex-wrap items-center gap-2">
          {activeSection && (
            <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                § {activeSection.section_number}
              </span>
              <span className="font-semibold text-slate-800 truncate max-w-[180px]">
                {activeSection.section_title}
              </span>
            </div>
          )}

          {activeConcept && (
            <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs flex items-center gap-1.5 text-indigo-900 font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="truncate max-w-[180px]">
                {activeConcept.metadata?.display_title || activeConcept.official_title}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
