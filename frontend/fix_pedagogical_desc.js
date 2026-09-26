const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'views', 'HandwrittenCheatSheetView.tsx');
let content = fs.readFileSync(filePath, 'utf8');

console.log('--- Fixing CurriculumConcept property type in HandwrittenCheatSheetView ---');

content = content.replace(
  /concept\.coreLogicEssence \|\| concept\.pedagogical_description/g,
  "concept.coreLogicEssence || (concept as any).pedagogical_description"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('[✓] Successfully fixed type assertion!');