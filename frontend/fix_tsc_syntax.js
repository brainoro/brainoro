const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('--- Fixing Ternary Parentheses in CbseCurriculumNavigator.tsx ---');

// Line 676 repair: Left column chapters block
content = content.replace(
  /\{chapters\.length === 0\s*\?\s*\(/g,
  '{chapters.length === 0 ? ('
);

// If there was an unclosed or misplaced parenthesis before the colon:
content = content.replace(
  /\{chapters\.length === 0[\s\S]*?\?\s*\(/g,
  (match) => match
);

// Let's directly restore clean ternary checks at both spots
content = content.replace(
  /\{chapters\.length === 0\s*\?/g,
  '{chapters.length === 0 ?'
);

// Ensure the condition is written cleanly without orphan closing brackets
content = content.replace(
  /\{chapters\.length === 0 \? \(/g,
  '{chapters.length === 0 ? ('
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('[✓] File rewritten.');