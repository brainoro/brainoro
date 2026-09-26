const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('--- Removing is_active from fallback CbseTextbook ---');

// Replace is_active on fallback textbook definition
content = content.replace(
  /const fallbackTb: CbseTextbook = \{[\s\S]*?\};/,
  (match) => match.replace(/\s*is_active:\s*true,?\s*/, '\n          ')
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('[✓] Successfully cleaned is_active!');