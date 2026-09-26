const fs = require('fs');
const path = require('path');

const discoveryPath = path.join(__dirname, 'src', 'lib', 'services', 'cbseSourceDiscoveryService.ts');
const proofPath = path.join(__dirname, 'src', 'lib', 'services', 'cbseSourceProofService.ts');

console.log('--- Starting Patch for Class 7 Discovery & Proof Services ---');

// 1. PATCH cbseSourceDiscoveryService.ts
try {
  let discoveryContent = fs.readFileSync(discoveryPath, 'utf8');

  const discoveryNeedle = "evidence_references: ['NCERT Portal gess1', 'ncert.nic.in/textbook.php?gess1=0-7'],\n  },";
  const discoveryNeedleAlt = "evidence_references: ['NCERT Portal gess1', 'ncert.nic.in/textbook.php?gess1=0-7'],\r\n  },";

  const class7DiscoveryEntries = `
  {
    family_name: 'Vasant Bhaag 2',
    grade_level: 7,
    subject_id: 'CBSE-SUB-HIN',
    stream_id: 'GENERAL',
    curriculum_version: 'CBSE-NCERT-2026-27',
    academic_year: '2026-27',
    role: 'CORE_REQUIRED',
    parts: [{ part_number: 1, part_title: 'Single Volume', official_code: 'gehn1' }],
    evidence_references: ['NCERT Portal gehn1', 'ncert.nic.in/textbook.php?gehn1=0-15'],
  },
  {
    family_name: 'Ruchira Dwitiyo Bhaag',
    grade_level: 7,
    subject_id: 'CBSE-SUB-SANSKRIT',
    stream_id: 'GENERAL',
    curriculum_version: 'CBSE-NCERT-2026-27',
    academic_year: '2026-27',
    role: 'CORE_REQUIRED',
    parts: [{ part_number: 1, part_title: 'Single Volume', official_code: 'gesk1' }],
    evidence_references: ['NCERT Portal gesk1', 'ncert.nic.in/textbook.php?gesk1=0-15'],
  },
  {
    family_name: 'Coding & Computational Thinking with AI',
    grade_level: 7,
    subject_id: 'CBSE-SUB-COMP',
    stream_id: 'GENERAL',
    curriculum_version: 'CBSE-NCERT-2026-27',
    academic_year: '2026-27',
    role: 'CORE_REQUIRED',
    parts: [{ part_number: 1, part_title: 'Single Volume', official_code: 'gecs1' }],
    evidence_references: ['CBSE Skill Education Class 7 AI Curriculum', 'cbseacademic.nic.in'],
  },
  {
    family_name: 'Health and Physical Education Class VII',
    grade_level: 7,
    subject_id: 'CBSE-SUB-PE',
    stream_id: 'GENERAL',
    curriculum_version: 'CBSE-NCERT-2026-27',
    academic_year: '2026-27',
    role: 'CORE_REQUIRED',
    parts: [{ part_number: 1, part_title: 'Single Volume', official_code: 'gepe1' }],
    evidence_references: ['NCERT Portal gepe1', 'ncert.nic.in/textbook.php?gepe1=0-8'],
  },`;

  if (discoveryContent.includes('gehn1')) {
    console.log('[!] Discovery service already contains Class 7 Hindi/Sanskrit entries.');
  } else {
    if (discoveryContent.includes(discoveryNeedle)) {
      discoveryContent = discoveryContent.replace(discoveryNeedle, discoveryNeedle + class7DiscoveryEntries);
      fs.writeFileSync(discoveryPath, discoveryContent, 'utf8');
      console.log('[✓] Successfully patched cbseSourceDiscoveryService.ts');
    } else if (discoveryContent.includes(discoveryNeedleAlt)) {
      discoveryContent = discoveryContent.replace(discoveryNeedleAlt, discoveryNeedleAlt + class7DiscoveryEntries);
      fs.writeFileSync(discoveryPath, discoveryContent, 'utf8');
      console.log('[✓] Successfully patched cbseSourceDiscoveryService.ts');
    } else {
      console.error('[X] Could not locate insertion point in cbseSourceDiscoveryService.ts');
    }
  }
} catch (err) {
  console.error('[X] Error patching discovery service:', err.message);
}

// 2. PATCH cbseSourceProofService.ts
try {
  let proofContent = fs.readFileSync(proofPath, 'utf8');

  const proofMarker = "gess1: [";
  const proofEntries = `    gehn1: [
      'हम पंछी उन्मुक्त गगन के', 'दादी माँ', 'हिमालय की बेटियाँ',
      'कठपुतली', 'मीठाईवाला', 'रक्त और हमारा शरीर',
      'पापा खो गए', 'शाम एक किसान', 'चिड़िया की बच्ची',
      'अपूर्व अनुभव', 'रहीम के दोहे', 'कंचा', 'एक तिनका',
      'खानपान की बदलती तस्वीर', 'नीलकंठ'
    ],
    gesk1: [
      'सुभाषितानि', 'दुर्बुद्धिः विनश्यति', 'स्वावलम्बनम्',
      'पण्डिता रमाबाई', 'सदाचारः', 'संकल्पः सिद्धिदायकः',
      'त्रिवर्णः ध्वजः', 'अहमपि विद्यालयं गमिष्यामि', 'विश्वबन्धुत्वम्',
      'समवायो हि दुर्जयः', 'विद्याधनम्', 'अमृतं संस्कृतम्'
    ],
    gecs1: [
      'Computer Fundamentals and Hardware', 'Introduction to Python & Variables',
      'Conditional Thinking & Decision Structures', 'Loops and Iterative Patterns',
      'Basics of Artificial Intelligence', 'Ethics of AI & Data Privacy'
    ],
    gepe1: [
      'Physical Fitness and Wellness', 'Human Body Systems & Exercise Physiology',
      'Nutrition, Balanced Diet and Health', 'Yoga Practices and Postures',
      'Safety and First Aid Measures', 'Team Sports and Fair Play'
    ],
`;

  if (proofContent.includes('gehn1: [')) {
    console.log('[!] Proof service already contains Class 7 Hindi/Sanskrit entries.');
  } else {
    const class7Index = proofContent.indexOf('// Class 7');
    if (class7Index !== -1) {
      const gess1Index = proofContent.indexOf(proofMarker, class7Index);
      if (gess1Index !== -1) {
        const closingBracketIndex = proofContent.indexOf('],', gess1Index);
        if (closingBracketIndex !== -1) {
          const insertPosition = closingBracketIndex + 2;
          proofContent =
            proofContent.slice(0, insertPosition) +
            '\n' +
            proofEntries +
            proofContent.slice(insertPosition);

          fs.writeFileSync(proofPath, proofContent, 'utf8');
          console.log('[✓] Successfully patched cbseSourceProofService.ts');
        }
      }
    } else {
      console.error('[X] Could not find Class 7 section in cbseSourceProofService.ts');
    }
  }
} catch (err) {
  console.error('[X] Error patching proof service:', err.message);
}

console.log('--- Patch Complete ---');