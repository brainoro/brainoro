const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(navPath, 'utf8');

console.log('--- Unlocking CbseCurriculumNavigator UI gates ---');

// Replace both strict gates with permissive condition (allow rendering if chapters exist)
const strictGatePattern = /\{chapters\.length === 0 \|\| \(runtimeGate && runtimeGate\.gate_status !== 'PAGE_READY'\) \?/g;

const permissiveGate = "{chapters.length === 0 ? (";

if (strictGatePattern.test(content)) {
  content = content.replace(strictGatePattern, permissiveGate);
  fs.writeFileSync(navPath, content, 'utf8');
  console.log('[✓] Successfully decoupled UI rendering from strict statutory gate!');
} else {
  console.log('[!] Pattern already updated or not matched directly.');
}

console.log('--- Done ---');