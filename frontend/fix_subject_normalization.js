const fs = require('fs');
const path = require('path');

const discoveryPath = path.join(__dirname, 'src', 'lib', 'services', 'cbseSourceDiscoveryService.ts');
let content = fs.readFileSync(discoveryPath, 'utf8');

// Also add G7 aliases directly into registry so exact matches never fail
const aliases = `
  {
    family_name: 'Ruchira Dwitiyo Bhaag',
    grade_level: 7,
    subject_id: 'G7-SANSKRIT',
    stream_id: 'GENERAL',
    curriculum_version: 'CBSE-NCERT-2026-27',
    academic_year: '2026-27',
    role: 'CORE_REQUIRED',
    parts: [{ part_number: 1, part_title: 'Single Volume', official_code: 'gesk1' }],
    evidence_references: ['NCERT Portal gesk1'],
  },
  {
    family_name: 'Vasant Bhaag 2',
    grade_level: 7,
    subject_id: 'G7-HINDI',
    stream_id: 'GENERAL',
    curriculum_version: 'CBSE-NCERT-2026-27',
    academic_year: '2026-27',
    role: 'CORE_REQUIRED',
    parts: [{ part_number: 1, part_title: 'Single Volume', official_code: 'gehn1' }],
    evidence_references: ['NCERT Portal gehn1'],
  },`;

if (!content.includes("'G7-SANSKRIT'")) {
  content = content.replace("family_name: 'Ruchira Dwitiyo Bhaag',", aliases + "\n  {\n    family_name: 'Ruchira Dwitiyo Bhaag',");
  fs.writeFileSync(discoveryPath, content, 'utf8');
  console.log('[✓] Added G7-SANSKRIT & G7-HINDI aliases to registry');
} else {
  console.log('[!] Aliases already exist');
}