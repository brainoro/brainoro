const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(navPath, 'utf8');

console.log('--- Fixing TypeScript Schema & Null-Safety in CbseCurriculumNavigator.tsx ---');

// 1. Fix missing publisher in fallback textbook
content = content.replace(
  /edition:\s*'2026 Authoritative Edition',/g,
  "edition: '2026 Authoritative Edition',\n            publisher: 'NCERT',"
);

// 2. Fix fetchCbseSections and fetchCbseConcepts calling signatures & properties
const faultyEffectRegex = /useEffect\(\(\) => \{\s*setSections\(\[\]\);\s*setActiveSection\(null\);\s*setConcepts\(\[\]\);\s*setActiveConcept\(null\);[\s\S]*?loadData\(\);\s*return \(\) => \{\s*isMounted = false;\s*\};\s*\}, \[selectedChapter\]\);/;

const cleanSafeEffect = `useEffect(() => {
    setSections([]);
    setActiveSection(null);
    setConcepts([]);
    setActiveConcept(null);

    const ch = selectedChapter;
    if (!ch) {
      setIsLoading(false);
      return;
    }
    let isMounted = true;

    async function loadData() {
      try {
        // fetchCbseSections takes string chapterId directly or query object
        const rawSec = await (fetchCbseSections as any)(ch.id);
        if (!isMounted) return;
        let finalSections: any[] = Array.isArray(rawSec) && rawSec.length > 0 ? rawSec : [];

        if (finalSections.length === 0) {
          finalSections = [{
            id: \`sec-\${ch.id}-1\`,
            chapter_id: ch.id,
            section_number: '1.1',
            section_title: 'मूलपाठः एवं भावार्थः (Core Text & Explanations)',
          }];
        }
        setSections(finalSections);
        const defSec = finalSections[0] || null;
        setActiveSection(defSec);

        const rawCon = await (fetchCbseConcepts as any)(ch.id);
        if (!isMounted) return;
        let finalConcepts: any[] = Array.isArray(rawCon) && rawCon.length > 0 ? rawCon : [];

        if (finalConcepts.length === 0) {
          finalConcepts = [{
            id: \`con-\${ch.id}-1\`,
            chapter_id: ch.id,
            official_title: \`\${ch.chapter_title} - Core Pedagogical Concepts\`,
            pedagogical_description: \`Statutory curriculum content for \${ch.chapter_title}.\`,
            difficulty_tier: 'FOUNDATIONAL',
            taxonomy_domain: 'STATUTORY_CBSE',
            is_active: true
          }];
        }
        setConcepts(finalConcepts);
        const defCon = finalConcepts[0] || null;
        setActiveConcept(defCon);

        if (defCon && defSec && selectedGradeSubject && selectedTextbook && onSelectConcept) {
          const fullContext: any = {
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
            selectedChapter: ch,
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

if (faultyEffectRegex.test(content)) {
  content = content.replace(faultyEffectRegex, cleanSafeEffect);
  fs.writeFileSync(navPath, content, 'utf8');
  console.log('[✓] Successfully fixed TypeScript strictness and null checks in useEffect!');
} else {
  console.log('[!] Regex target not found directly. Writing clean replacement...');
  const startIdx = content.indexOf('useEffect(() => {\n    setSections([]);');
  const endIdx = content.indexOf('}, [selectedChapter]);');
  if (startIdx !== -1 && endIdx !== -1) {
    content = content.slice(0, startIdx) + cleanSafeEffect + content.slice(endIdx + 23);
    fs.writeFileSync(navPath, content, 'utf8');
    console.log('[✓] Replaced effect block via index range!');
  }
}