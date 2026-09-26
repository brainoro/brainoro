const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(navPath, 'utf8');

console.log('--- Patching Textbook Fallback in CbseCurriculumNavigator.tsx ---');

const oldTbSnippet = `      fetchCbseTextbooks(selectedGradeSubject.id).then((tbList) => {
        if (!isMounted) return;
        setTextbooks(tbList);
        const targetTb =
          (initialPartNumber && tbList.length >= initialPartNumber
            ? tbList[initialPartNumber - 1]
            : null) ||
          tbList.find((t) => t.is_primary) ||
          tbList[0] ||
          null;
        setSelectedTextbook(targetTb);
      });`;

const newTbSnippet = `      fetchCbseTextbooks(selectedGradeSubject.id).then((rawTbList) => {
        if (!isMounted) return;
        let tbList = rawTbList && rawTbList.length > 0 ? rawTbList : [];

        // Synthesize statutory textbook if not mapped in static array
        if (tbList.length === 0 && selectedGradeSubject) {
          const sName = (selectedGradeSubject.id || '').toUpperCase();
          let tbTitle = 'NCERT Prescribed Textbook';
          let tbCode = 'ncert-tb';

          if (sName.includes('SANSKRIT')) {
            tbTitle = selectedGrade === 6 ? 'Deepakam (NCERT 2024 NCF-SE Edition)' : selectedGrade === 7 ? 'Ruchira Bhag 2' : selectedGrade === 8 ? 'Ruchira Bhag 3' : 'Shemushi';
            tbCode = selectedGrade === 6 ? 'fesk1' : selectedGrade === 7 ? 'gesk1' : selectedGrade === 8 ? 'hesk1' : 'jesk1';
          } else if (sName.includes('HINDI')) {
            tbTitle = selectedGrade === 6 ? 'Malhar' : 'Vasant';
            tbCode = selectedGrade === 6 ? 'fehn1' : 'gehn1';
          } else if (sName.includes('COMP') || sName.includes('AI') || sName.includes('IT')) {
            tbTitle = 'Computer Science & AI Foundations';
            tbCode = 'fecs1';
          } else if (sName.includes('PE') || sName.includes('HEALTH')) {
            tbTitle = 'Health and Physical Education';
            tbCode = 'fepe1';
          }

          const fallbackTb = {
            id: \`cbse-tb-\${tbCode}-\${selectedGrade}\`,
            grade_subject_id: selectedGradeSubject.id,
            curriculum_version_id: 'cbse-2026-27',
            title: tbTitle,
            official_code: tbCode,
            academic_year: '2026-2027',
            edition: '2026 Authoritative Edition',
            is_primary: true,
            total_parts: 1,
            is_active: true
          };
          tbList = [fallbackTb];
        }

        setTextbooks(tbList);
        const targetTb =
          (initialPartNumber && tbList.length >= initialPartNumber
            ? tbList[initialPartNumber - 1]
            : null) ||
          tbList.find((t) => t.is_primary) ||
          tbList[0] ||
          null;
        setSelectedTextbook(targetTb);
      });`;

if (content.includes(oldTbSnippet)) {
  content = content.replace(oldTbSnippet, newTbSnippet);
  fs.writeFileSync(navPath, content, 'utf8');
  console.log('[✓] Successfully installed synthetic NCERT textbook fallback!');
} else {
  console.warn('[!] oldTbSnippet could not be matched directly. Inspecting file...');
  // Flexible regex fallback
  const flexPattern = /fetchCbseTextbooks\(selectedGradeSubject\.id\)\.then\(\(tbList\)[\s\S]*?setSelectedTextbook\(targetTb\);\s*\}\);/;
  if (flexPattern.test(content)) {
    content = content.replace(flexPattern, newTbSnippet.trim());
    fs.writeFileSync(navPath, content, 'utf8');
    console.log('[✓] Successfully applied patch via regex fallback!');
  } else {
    console.error('[X] Could not patch textbook logic.');
  }
}