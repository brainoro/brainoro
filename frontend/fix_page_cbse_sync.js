const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

console.log('--- Fixing activeAdaptedConcept and memo dependencies in page.tsx ---');

// 1. Replace activeAdaptedConcept memo to explicitly depend on cbseConcept and prioritize it
const oldMemoPattern = /const activeAdaptedConcept = useMemo<CurriculumConcept \| null>\(\(\) => \{[\s\S]*?\}\s*,\s*\[[\s\S]*?\]\);/;

const newMemoBlock = `const activeAdaptedConcept = useMemo<CurriculumConcept | null>(() => {
    if (selectedBoardId === 'CBSE') {
      if (cbseConcept) {
        return {
          id: cbseConcept.id,
          boardId: 'CBSE',
          gradeLevel: selectedGrade,
          subjectId: selectedSubject === 'ALL' ? 'SANSKRIT' : selectedSubject,
          title: cbseConcept.official_title,
          coreLogicEssence:
            cbseConcept.pedagogical_description ||
            \`Official CBSE Class \${selectedGrade} chapter: \${cbseConcept.official_title}\`,
          pedagogical_description: cbseConcept.pedagogical_description || cbseConcept.official_title,
          learning_objectives: cbseConcept.learning_outcomes || [
            'Authoritative NCERT Standard Curriculum Understanding',
            'Core Conceptual Intuition & Shloka/Textual Analysis'
          ],
          parentNodeId: null,
          subConcepts: [],
          prerequisites: [],
          formulae: [],
          keyTakeaways: [
            \`Prescribed as per NCERT curriculum for Class \${selectedGrade}.\`,
            'Systematic chapter structure aligned with latest CBSE examination pattern.'
          ],
          difficultyTier: 'FOUNDATIONAL'
        };
      }

      if (authResolution?.isAuthoritative && activeAuthoritativeConcept) {
        return convertAuthoritativeConceptToCurriculumConcept(
          activeAuthoritativeConcept,
          authResolution.chapter,
          activeSection,
          activeLearningContext
        );
      }

      // If cbseConcept not yet selected, default to Class 7 Sanskrit Ruchira Ch 1
      return {
        id: \`cbse-default-\${selectedGrade}-\${selectedSubject}\`,
        boardId: 'CBSE',
        gradeLevel: selectedGrade,
        subjectId: selectedSubject === 'ALL' ? 'SANSKRIT' : selectedSubject,
        title: 'सुभाषितानि',
        coreLogicEssence: 'पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम्। मूढैः पाषाणखण्डेषु रत्नसंज्ञा विधीयते।',
        pedagogical_description: 'सुभाषितानि - रुचिरा भाग २ प्रथमः पाठः',
        learning_objectives: ['सुभाषितानां सस्वर-वाचनम्', 'श्लोकानाम् अन्वय-ज्ञानम् भावार्थश्च'],
        parentNodeId: null,
        subConcepts: [],
        prerequisites: [],
        formulae: [],
        keyTakeaways: ['Aligned with latest CBSE 2026-2027 curriculum'],
        difficultyTier: 'FOUNDATIONAL'
      };
    }

    if (authResolution?.isAuthoritative && activeAuthoritativeConcept) {
      return convertAuthoritativeConceptToCurriculumConcept(
        activeAuthoritativeConcept,
        authResolution.chapter,
        activeSection,
        activeLearningContext
      );
    }
    return null;
  }, [
    selectedBoardId,
    cbseConcept,
    selectedGrade,
    selectedSubject,
    authResolution,
    activeAuthoritativeConcept,
    activeSection,
    activeLearningContext,
  ]);`;

if (oldMemoPattern.test(content)) {
  content = content.replace(oldMemoPattern, newMemoBlock);
  fs.writeFileSync(pagePath, content, 'utf8');
  console.log('[✓] Successfully patched activeAdaptedConcept with live cbseConcept dependency!');
} else {
  console.error('[X] Could not find activeAdaptedConcept pattern in page.tsx');
}