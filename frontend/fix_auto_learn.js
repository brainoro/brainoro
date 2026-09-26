const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

console.log('--- Enabling Auto-Load for Cheat Sheet & Concept Views ---');

const oldBlock = `              onSelectConcept={(concept, section, context) => {
                setCbseConcept(concept);
                if (section) setCbseSection(section);
                if (context) {
                  if (context.grade) setSelectedGrade(context.grade.grade_level);
                  if (context.gradeSubject) setSelectedSubject(context.gradeSubject.subject_id || context.gradeSubject.id);
                }
              }}`;

const newBlock = `              onSelectConcept={(concept, section, context) => {
                setCbseConcept(concept);
                if (section) setCbseSection(section);
                if (typeof setLearningStep === 'function') setLearningStep('learn');
                if (typeof setActiveTab === 'function') setActiveTab('learn');
                if (context) {
                  if (context.grade) setSelectedGrade(context.grade.grade_level);
                  if (context.gradeSubject) setSelectedSubject(context.gradeSubject.subject_id || context.gradeSubject.id);
                }
              }}`;

if (content.includes("typeof setLearningStep === 'function'")) {
  console.log('[!] Already configured for auto-load.');
} else if (content.includes("onSelectConcept={(concept, section, context) => {")) {
  content = content.replace(
    /onSelectConcept=\{\(concept,\s*section,\s*context\)\s*=>\s*\{([\s\S]*?)\n\s*\}\}/,
    newBlock
  );
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('[✓] Successfully updated onSelectConcept with auto-learn activation.');
} else {
  console.error('[X] Target pattern not found.');
}