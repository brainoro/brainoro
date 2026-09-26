const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

console.log('--- Cleaning Up BoardSwitchHeader & Syncing Cheat Sheet ---');

// 1. Conditionally hide BoardSwitchHeader when CBSE authoritative mode is active, or render only when not CBSE
const boardHeaderOld = `{/* Top Header & Multi-Board Switcher */}
        <BoardSwitchHeader`;

const boardHeaderNew = `{/* Top Header & Multi-Board Switcher */}
        {selectedBoardId !== 'CBSE' && (
          <BoardSwitchHeader`;

if (content.includes("selectedBoardId !== 'CBSE' && (") && content.includes('<BoardSwitchHeader')) {
  console.log('[!] BoardSwitchHeader is already conditional.');
} else if (content.includes(boardHeaderOld)) {
  // Replace the opening tag and find matching closing tag
  content = content.replace(boardHeaderOld, boardHeaderNew);
  
  // Close the conditional wrapper right after </BoardSwitchHeader> or />
  const bshClosingPattern = /(<BoardSwitchHeader[\s\S]*?(\/>|<\/BoardSwitchHeader>))/;
  content = content.replace(bshClosingPattern, '$1\n        )}');
  console.log('[✓] Successfully hid overlapping BoardSwitchHeader in CBSE mode.');
} else {
  console.warn('[!] Could not match BoardSwitchHeader pattern directly.');
}

// 2. Ensure Sanskrit & non-math concepts trigger the cheat sheet presentation
// Check activeAdaptedConcept fallback to populate pedagogical notes
const fallbackPattern = /pedagogical_description:\s*cbseConcept\.pedagogical_description,/g;
if (content.includes('pedagogical_description: cbseConcept.pedagogical_description,')) {
  content = content.replace(
    'pedagogical_description: cbseConcept.pedagogical_description,',
    `pedagogical_description: cbseConcept.pedagogical_description || cbseConcept.official_title,`
  );
  console.log('[✓] Enhanced pedagogical description fallback.');
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log('--- Complete ---');