const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('--- Fixing duplicate span and closing tags ---');

// Replace duplicate span tag cleanly
content = content.replace(
  /<span className="leading-snug pt-0.5">\{ch\.chapter_title\}<\/span>\s*<\/span>/g,
  '<span className="leading-snug pt-0.5">{ch.chapter_title}</span>'
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('[✓] Removed duplicate span successfully.');