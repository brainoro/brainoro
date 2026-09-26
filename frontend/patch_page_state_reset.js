const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

console.log('--- Patching src/app/page.tsx ---');

// 1. Reset cbseConcept and cbseSection whenever subject/grade context changes in CBSE navigator
const targetContextChange = /onContextChange=\{\(grade,\s*subjectId\)\s*=>\s*\{([\s\S]*?)\}\}/;

if (targetContextChange.test(content)) {
  const replacementContextChange = `onContextChange={(grade, subjectId) => {
                setSelectedGrade(grade);
                setSelectedSubject(subjectId);
                setCbseConcept(null);
                if (typeof setCbseSection === 'function') setCbseSection(null);
                if (typeof setActiveAuthoritativeConcept === 'function') setActiveAuthoritativeConcept(null);
              }}`;
  content = content.replace(targetContextChange, replacementContextChange);
  console.log('[✓] Added state reset (cbseConcept = null) on onContextChange');
} else {
  console.warn('[!] Could not match onContextChange pattern directly');
}

// 2. Hide Cheat Sheet / Learning section when activeAdaptedConcept is null
// This prevents legacy Math cheatsheet from rendering when no concept is selected in Sanskrit/Hindi
const cheatSheetCondition = /\{activeTab === 'learn' && \(/g;
if (content.includes("activeTab === 'learn' && (")) {
  content = content.replace(
    "activeTab === 'learn' && (",
    "activeTab === 'learn' && activeAdaptedConcept && ("
  );
  console.log('[✓] Gated cheat sheet rendering with activeAdaptedConcept');
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log('--- Page Patch Completed ---');