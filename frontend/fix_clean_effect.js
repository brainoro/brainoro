const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(navPath, 'utf8');

console.log('--- Cleaning unclosed Promise.all in CbseCurriculumNavigator.tsx ---');

// Replace the entire faulty useEffect with clean execution
const effectPattern = /useEffect\(\(\) => \{\s*setSections\(\[\]\);\s*setActiveSection\(null\);\s*setConcepts\(\[\]\);\s*setActiveConcept\(null\);[\s\S]*?\},\s*\[selectedChapter\]\);/;

const cleanEffect = `useEffect(() => {
    setSections([]);
    setActiveSection(null);
    setConcepts([]);
    setActiveConcept(null);

    if (!selectedChapter) {
      setIsLoading(false);
      return;
    }
    let isMounted = true;

    async function loadData() {
      try {
        const secList = await fetchCbseSections({ chapterId: selectedChapter.id });
        if (!isMounted) return;
        let finalSections = secList && secList.length > 0 ? secList : [];

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
      } catch (err) {
        console.error('Failed to load curriculum sections/concepts', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [selectedChapter]);`;

if (effectPattern.test(content)) {
  content = content.replace(effectPattern, cleanEffect);
  fs.writeFileSync(navPath, content, 'utf8');
  console.log('[✓] Successfully fixed useEffect syntax!');
} else {
  console.error('[X] Effect pattern not found for replacement.');
}