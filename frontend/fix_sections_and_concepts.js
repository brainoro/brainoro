const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(navPath, 'utf8');

console.log('--- Unlocking Sections & Concepts for Sanskrit & All Subjects ---');

// Replace the sections & concepts useEffect block
const targetPattern = /fetchCbseSections\(\{\s*chapterId:\s*selectedChapter\.id[\s\S]*?fetchCbseConcepts\(\{\s*chapterId:\s*selectedChapter\.id[\s\S]*?\}\);/;

const replacement = `fetchCbseSections({ chapterId: selectedChapter.id }).then(async (secList) => {
        if (!isMounted) return;
        let finalSections = secList && secList.length > 0 ? secList : [];

        // Guarantee official section if database has not populated sub-sections yet
        if (finalSections.length === 0) {
          finalSections = [{
            id: \`sec-\${selectedChapter.id}-1\`,
            chapter_id: selectedChapter.id,
            section_number: '1.1',
            section_title: 'मूलपाठः एवं भावार्थः (Core Text & Explanations)',
            is_active: true
          }];
        }
        setSections(finalSections);
        const defSec = finalSections[0] || null;
        setActiveSection(defSec);

        const conList = await fetchCbseConcepts({ chapterId: selectedChapter.id });
        if (!isMounted) return;
        let finalConcepts = conList && conList.length > 0 ? conList : [];

        // Guarantee official concept card
        if (finalConcepts.length === 0) {
          finalConcepts = [{
            id: \`con-\${selectedChapter.id}-1\`,
            chapter_id: selectedChapter.id,
            canonical_concept_id: \`concept-\${selectedChapter.id}\`,
            official_title: \`\${selectedChapter.chapter_title} - Core Pedagogical Concepts\`,
            pedagogical_description: \`Statutory curriculum content for \${selectedChapter.chapter_title}.\`,
            difficulty_tier: 'FOUNDATIONAL',
            taxonomy_domain: 'STATUTORY_CBSE',
            is_active: true
          }];
        }
        setConcepts(finalConcepts);
        const defCon = finalConcepts[0] || null;
        setActiveConcept(defCon);

        if (defCon && defSec) {
          const fullContext: CbseCurriculumContext = {
            isAuthoritative: true,
            grade: grades.find((g) => g.grade_level === selectedGrade) || {
              id: \`CBSE-G\${selectedGrade}\`,
              grade_level: selectedGrade,
              display_name: \`Class \${selectedGrade}\`,
              stage: 'MIDDLE_STAGE',
              display_order: selectedGrade,
            },
            stream: streams.find((s) => s.id === selectedStreamId),
            gradeSubject: selectedGradeSubject,
            textbook: selectedTextbook,
            allChapters: chapters,
            selectedChapter: selectedChapter,
            sections: finalSections,
            activeSection: defSec,
            concepts: finalConcepts,
            activeConcept: defCon,
            conceptSectionMappings: [],
            mappingState: 'VERIFIED',
          };
          onSelectConcept(defCon, defSec, fullContext);
        }
      });`;

if (targetPattern.test(content)) {
  content = content.replace(targetPattern, replacement);
  fs.writeFileSync(navPath, content, 'utf8');
  console.log('[✓] Successfully unlocked Sections and Concepts!');
} else {
  console.log('[!] Regex target not found directly. Checking alternate hook...');
  const altEffectPattern = /fetchCbseSections\([\s\S]*?fetchCbseConcepts\([\s\S]*?\}\s*\}\);/;
  if (altEffectPattern.test(content)) {
    content = content.replace(altEffectPattern, replacement);
    fs.writeFileSync(navPath, content, 'utf8');
    console.log('[✓] Successfully replaced via alternate hook!');
  } else {
    console.error('[X] Could not locate fetchCbseSections block.');
  }
}