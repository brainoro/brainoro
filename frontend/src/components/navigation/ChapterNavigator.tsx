import React from 'react';
import { TextbookSection, AuthoritativeConceptSection, AuthoritativeCurriculumConcept } from '../../lib/types';
import { Hash } from 'lucide-react';

interface Props {
  sections: TextbookSection[];
  activeSectionId?: string;
  onSelectSection: (section: TextbookSection) => void;
  concepts?: AuthoritativeCurriculumConcept[];
  conceptSections?: AuthoritativeConceptSection[];
  chapterTitle?: string;
  chapterNumber?: number;
}

export const ChapterNavigator: React.FC<Props> = ({
  sections,
  activeSectionId,
  onSelectSection,
  concepts = [],
  conceptSections = [],
  chapterTitle = 'Lines and Angles',
  chapterNumber = 2,
}) => {
  // Find concepts mapped to each section
  const getSectionConcepts = (sectionId: string) => {
    const mappings = conceptSections.filter(cs => cs.section_id === sectionId);
    return mappings.map(m => {
      const c = concepts.find(conc => conc.id === m.authoritative_concept_id);
      return {
        concept: c,
        relationshipType: m.relationship_type,
      };
    }).filter(item => item.concept !== undefined);
  };

  return (
    <div
      data-testid="chapter-navigator"
      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4 print:hidden"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Hash className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Chapter {chapterNumber} Sections: {chapterTitle}
            </h3>
            <p className="text-[11px] text-slate-500">
              Select a section to explore its authoritative curriculum concepts and learning progression.
            </p>
          </div>
        </div>

        <div className="text-[11px] font-semibold px-2.5 py-1 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 self-start sm:self-auto">
          <span className="font-bold">{sections.length}</span> Statutory Sections
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;
          const mappedConcepts = getSectionConcepts(section.id);

          return (
            <button
              key={section.id}
              onClick={() => onSelectSection(section)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-2 relative group ${
                isActive
                  ? 'bg-sky-50/90 border-sky-500 shadow-sm ring-1 ring-sky-500/30 text-sky-950'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80 text-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-2 w-full">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  § {section.section_number}
                </span>

                {section.source_page && (
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                    p. {section.source_page}
                  </span>
                )}
              </div>

              <div className="space-y-0.5">
                <h4
                  className={`text-xs font-bold leading-snug transition ${
                    isActive ? 'text-sky-950' : 'text-slate-800 group-hover:text-slate-900'
                  }`}
                >
                  {section.section_title}
                </h4>

                {mappedConcepts.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    {mappedConcepts.map(({ concept, relationshipType }) => (
                      <span
                        key={concept!.id}
                        className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                          relationshipType === 'PRIMARY'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                        title={`${relationshipType}: ${concept!.official_title}`}
                      >
                        {concept!.metadata?.display_title || concept!.official_title}
                      </span>
                    ))}
                  </div>
                )}
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
