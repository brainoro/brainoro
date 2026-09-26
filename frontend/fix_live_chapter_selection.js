const fs = require('fs');
const path = require('path');

// 1. Patch CbseCurriculumNavigator so chapter selection immediately syncs concept & informs parent
const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let navContent = fs.readFileSync(navPath, 'utf8');

console.log('--- Fixing Chapter Selection Binding in CbseCurriculumNavigator ---');

// Replace handleSelectChapter or chapter list button click
navContent = navContent.replace(
  /onClick=\{[^{}]*setSelectedChapter\(ch\)[^{}]*\}/g,
  `onClick={() => {
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
      onSelectConcept(newConcept as any, null, {} as any);
    }
    if (onLearnClick) {
      onLearnClick(newConcept as any);
    }
  }}`
);

// Also ensure Learn Concept button passes activeConcept properly
const learnBtnRegex = /<button[\s\S]*?<span>Learn Concept<\/span>\s*<\/button>/;
const fixedLearnBtn = `<button
  onClick={() => {
    if (activeConcept) {
      if (onSelectConcept) {
        onSelectConcept(activeConcept, activeSection, {} as any);
      }
      if (onLearnClick) {
        onLearnClick(activeConcept);
      }
    }
  }}
  className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 shrink-0"
>
  <Sparkles className="w-3.5 h-3.5" />
  <span>Learn Concept</span>
</button>`;

navContent = navContent.replace(learnBtnRegex, fixedLearnBtn);
fs.writeFileSync(navPath, navContent, 'utf8');
console.log('[✓] CbseCurriculumNavigator click handlers synchronized!');

// 2. Patch page.tsx onSelectConcept & onLearnClick to update selectedChapterId and force fresh remount
const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

console.log('--- Synchronizing page.tsx State Handlers ---');

pageContent = pageContent.replace(
  /onSelectConcept=\{(concept, section, context) => \{[\s\S]*?\}\s*\}\s*onLearnClick=\{(concept) => \{[\s\S]*?\}\s*\}/,
  `onSelectConcept={(concept, section, context) => {
    if (concept) {
      setCbseConcept(concept);
      if (concept.chapter_id) setSelectedChapterId(concept.chapter_id);
    }
    if (section) setCbseSection(section);
    if (typeof setLearningStep === 'function') setLearningStep('learn');
    if (typeof setActiveTab === 'function') setActiveTab('learn');
    if (context) {
      if (context.grade) setSelectedGrade(context.grade.grade_level);
      if (context.gradeSubject) setSelectedSubject(context.gradeSubject.subject_id || context.gradeSubject.id);
    }
  }}
  onLearnClick={(concept) => {
    if (concept) {
      setCbseConcept(concept);
      if (concept.chapter_id) setSelectedChapterId(concept.chapter_id);
    }
    setLearningStep('learn');
    setActiveTab('learn');
    setTimeout(() => {
      const el = document.getElementById('cheatsheet-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }}`
);

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('[✓] page.tsx handlers successfully bound!');