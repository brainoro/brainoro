const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('--- Cleaning double parenthesis (? ( () ---');

content = content.replace(/\{chapters\.length === 0 \? \( \(/g, '{chapters.length === 0 ? (');
content = content.replace(/\{chapters\.length === 0 \?\s*\(\s*\(/g, '{chapters.length === 0 ? (');

fs.writeFileSync(filePath, content, 'utf8');
console.log('[✓] Successfully fixed parentheses!');