const fs = require('fs');
const path = require('path');

// 1. Patch CbseCurriculumNavigator to automatically trigger onLearnClick on default concept load
const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let navContent = fs.readFileSync(navPath, 'utf8');

console.log('--- Enabling Auto-Load for Course Viewer in CbseCurriculumNavigator ---');

const selectCallOld = `onSelectConcept(defCon, defSec, fullContext);`;
const selectCallNew = `onSelectConcept(defCon, defSec, fullContext);
          if (onLearnClick) {
            onLearnClick(defCon);
          }`;

if (navContent.includes(selectCallOld) && !navContent.includes('if (onLearnClick)')) {
  navContent = navContent.replace(selectCallOld, selectCallNew);
  fs.writeFileSync(navPath, navContent, 'utf8');
  console.log('[✓] Successfully attached auto onLearnClick trigger!');
}

// 2. Patch page.tsx activeAdaptedConcept to ensure full valid schema
const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

console.log('--- Ensuring Valid Concept Adapter in page.tsx ---');

const oldAdaptedPattern = /if \(cbseConcept\) \{\s*return \{[\s\S]*?parentNodeId: null,\s*\};/;

const newAdaptedBlock = `if (cbseConcept) {
          return {
            id: cbseConcept.id,
            boardId: 'CBSE',
            gradeLevel: selectedGrade,
            subjectId: selectedSubject === 'ALL' ? 'MATH' : selectedSubject,
            title: cbseConcept.official_title,
            coreLogicEssence:
              cbseConcept.pedagogical_description ||
              \`Official CBSE Class \${selectedGrade} concept: \${cbseConcept.official_title}\`,
            pedagogical_description: cbseConcept.pedagogical_description || cbseConcept.official_title,
            learning_objectives: cbseConcept.learning_outcomes || ['Authoritative NCERT Standard Curriculum Understanding', 'Core Conceptual Intuition & Applications'],
            parentNodeId: null,
            subConcepts: [],
            prerequisites: [],
            formulae: [],
            keyTakeaways: [
              \`Prescribed as per NCERT curriculum for Class \${selectedGrade}.\`,
              'Systematic chapter structure aligned with latest CBSE examination pattern.'
            ],
            difficultyTier: 'FOUNDATIONAL'
          };`;

if (oldAdaptedPattern.test(pageContent)) {
  pageContent = pageContent.replace(oldAdaptedPattern, newAdaptedBlock);
  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log('[✓] Successfully updated activeAdaptedConcept adapter!');
}

console.log('--- Auto-Rendering Patch Complete ---');