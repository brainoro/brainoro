const fs = require('fs');
const path = require('path');

const discoveryPath = path.join(__dirname, 'src', 'lib', 'services', 'cbseSourceDiscoveryService.ts');
let content = fs.readFileSync(discoveryPath, 'utf8');

console.log('--- Cleaning double braces in cbseSourceDiscoveryService.ts ---');

// Replace duplicate opening braces like "{\n\s*{" or "{\r\n\s*{"
content = content.replace(/\{\s*\{/g, '{');

fs.writeFileSync(discoveryPath, content, 'utf8');
console.log('[✓] Syntax error resolved cleanly.');