const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(navPath, 'utf8');

console.log('--- Restoring CbseCurriculumNavigator JSX cleanly ---');

// Find where the JSX return starts
const returnMarker = 'return (\n    <div className="w-full max-w-7xl mx-auto space-y-6" data-testid="cbse-curriculum-system">';
const returnIdx = content.indexOf(returnMarker);

if (returnIdx === -1) {
  console.error('[X] Could not find return marker.');
  process.exit(1);
}

// Clean and reliable JSX return block with properly wired handlers
const cleanJsxReturn = `return (
    <div className="w-full max-w-7xl mx-auto space-y-6" data-testid="cbse-curriculum-system">
      {/* Statutory Header & Breadcrumbs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
              CBSE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-slate-800 tracking-tight">
                  CBSE Authoritative Curriculum OS
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  STATUTORY NCERT HIERARCHY
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Official Classes 6–12 Curriculum & Textbook Structure
              </p>
            </div>
          </div>

          {/* Breadcrumb Display */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl">
            <span className="font-bold text-sky-800">CBSE</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">Class {selectedGrade}</span>
            {selectedGradeSubject && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-semibold text-slate-800">
                  {selectedGradeSubject.display_name_override || selectedGradeSubject.subject_id}
                </span>
              </>
            )}
            {selectedTextbook && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="italic text-slate-600">{selectedTextbook.title}</span>
              </>
            )}
            <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>NCERT Verified</span>
            </span>
          </div>
        </div>

        {/* 1. Grade Selector (Classes 6 to 12) */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-sky-600" />
            <span>Select Class / Grade Level:</span>
          </label>
          <div className="flex flex-wrap gap-2" data-testid="cbse-grade-selector">
            {grades.map((g) => {
              const isSelected = g.grade_level === selectedGrade;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGrade(g.grade_level)}
                  className={\`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 \${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }\`}
                >
                  <span>Class {g.grade_level}</span>
                  <span className="text-[10px] opacity-75 font-normal">
                    {g.stage === 'MIDDLE_STAGE'
                      ? '(Middle)'
                      : g.stage === 'SECONDARY_STAGE'
                      ? '(Secondary)'
                      : '(Sr. Sec)'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Grade-Specific Subjects */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Grade-Specific Subjects for Class {selectedGrade}:</span>
            </label>
            <span className="text-[11px] text-slate-500 font-medium">
              Unified Science Standard (No Standalone Phys/Chem/Bio)
            </span>
          </div>
          <div className="flex flex-wrap gap-2" data-testid="cbse-subject-selector">
            {gradeSubjects.map((s) => {
              const isSelected = selectedGradeSubject?.id === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedGradeSubject(s)}
                  className={\`px-3 py-1.5 rounded-xl text-xs font-medium transition \${
                    isSelected
                      ? 'bg-slate-900 text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }\`}
                >
                  {s.display_name_override || s.subject_id}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Official NCERT Textbook Banner */}
        {selectedTextbook && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between bg-amber-50/50 border border-amber-200/50 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span className="text-xs font-bold text-slate-800">
                Official NCERT Textbook: {selectedTextbook.title}
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                (NCERT • {selectedTextbook.edition || 'Official Edition'})
              </span>
            </div>
            {selectedTextbook.official_code && (
              <span className="text-[10px] font-mono font-bold bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                NCERT Code: {selectedTextbook.official_code}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Chapters & Active Learning Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chapters Column */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" />
              <h2 className="text-xs font-black uppercase tracking-wider text-slate-700">
                Chapters ({chapters.length})
              </h2>
            </div>
            <span className="text-[10px] font-bold text-slate-500">Textbook Order</span>
          </div>

          <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
            {chapters.map((ch) => {
              const isSelected = selectedChapter?.id === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChapter(ch);
                    const newConcept = {
                      id: \`con-\${ch.id}\`,
                      chapter_id: ch.id,
                      official_title: ch.chapter_title,
                      pedagogical_description: \`NCERT Statutory Content for \${ch.chapter_title}\`,
                      difficulty_tier: 'FOUNDATIONAL',
                      taxonomy_domain: 'STATUTORY_CBSE',
                      is_active: true
                    };
                    setActiveConcept(newConcept as any);
                    if (onSelectConcept) {
                      onSelectConcept(newConcept as any, activeSection, {} as any);
                    }
                    if (onLearnClick) {
                      onLearnClick(newConcept as any);
                    }
                  }}
                  className={\`w-full text-left px-3 py-2.5 rounded-xl text-xs transition flex items-start gap-2.5 \${
                    isSelected
                      ? 'bg-sky-50 border border-sky-300 text-sky-900 font-bold shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }\`}
                >
                  <span
                    className={\`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold \${
                      isSelected ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                    }\`}
                  >
                    {ch.chapter_number}
                  </span>
                  <span className="leading-snug pt-0.5">{ch.chapter_title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Chapter Details & Concept Action */}
        <div className="lg:col-span-2 space-y-4">
          {selectedChapter && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider">
                    Chapter {selectedChapter.chapter_number}
                  </span>
                  <h3 className="text-base font-bold text-slate-800">
                    {selectedChapter.chapter_title}
                  </h3>
                </div>
                <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {sections.length} Official Sections
                </span>
              </div>

              {/* Sections Display */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-sky-600" />
                  <span>Statutory Sections:</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {sections.map((sec) => (
                    <div
                      key={sec.id}
                      className="px-3 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-semibold"
                    >
                      § {sec.section_number} {sec.section_title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Concept Card & Action */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-1.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Authoritative Statutorily Verified</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">
                    {activeConcept?.official_title || selectedChapter.chapter_title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {activeConcept?.pedagogical_description || \`Statutory curriculum content for \${selectedChapter.chapter_title}.\`}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const targetCon = activeConcept || {
                      id: \`con-\${selectedChapter.id}\`,
                      chapter_id: selectedChapter.id,
                      official_title: selectedChapter.chapter_title,
                      pedagogical_description: \`NCERT Statutory Content for \${selectedChapter.chapter_title}\`,
                      difficulty_tier: 'FOUNDATIONAL',
                      taxonomy_domain: 'STATUTORY_CBSE',
                      is_active: true
                    };
                    if (onSelectConcept) {
                      onSelectConcept(targetCon as any, activeSection, {} as any);
                    }
                    if (onLearnClick) {
                      onLearnClick(targetCon as any);
                    }
                  }}
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Learn Concept</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
`;

content = content.slice(0, returnIdx) + cleanJsxReturn;
fs.writeFileSync(navPath, content, 'utf8');
console.log('[✓] Replaced return block cleanly with fully closed JSX and accurate handlers!');