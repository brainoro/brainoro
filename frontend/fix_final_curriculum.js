const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, 'src', 'components', 'cbse', 'CbseCurriculumNavigator.tsx');
let content = fs.readFileSync(navPath, 'utf8');

console.log('--- Applying Final Clean Curriculum & TS Resolution ---');

// 1. Remove total_parts from fallback textbook literal
content = content.replace(/total_parts:\s*1,\s*/g, '');

// 2. Fix null-safety on ch properties in concept initialization
content = content.replace(/ch\.chapter_title/g, 'ch?.chapter_title || "Chapter"');

// 3. Define and safely insert GRADE_SPECIFIC_SYLLABUS right after imports
content = content.replace(/const GRADE_SPECIFIC_SYLLABUS[\s\S]*?\n\};\n/g, '');

const syllabusDefinition = `
const GRADE_SPECIFIC_SYLLABUS: Record<string, Record<string, { textbook: string; code: string; chapters: string[] }>> = {
  '6': {
    SANSKRIT: {
      textbook: 'Deepakam (NCERT 2024 NCF-SE Edition)',
      code: 'fesk1',
      chapters: ['प्रथमा पाठः: मङ्गलाचरणम्', 'द्वितीया पाठः: परिचयः', 'तृतीया पाठः: सुभाषितानि', 'चतुर्था पाठः: विद्यालयः', 'पञ्चमा पाठः: वृक्षाः', 'षष्ठा पाठः: बकस्य प्रतीकारः', 'सप्तमा पाठः: बकस्य प्रतीकारः २', 'अष्टमा पाठः: सूक्तिस्तबकः']
    },
    HINDI: {
      textbook: 'Malhar (NCERT NCF-SE)',
      code: 'fehn1',
      chapters: ['मातृभूमि', 'गोल', 'बया हमारी चिड़िया रानी', 'चाँद से थोड़ी सी गप्पें', 'अनोखा चिड़ियाघर', 'दो बैलों की कथा']
    },
    COMP: {
      textbook: 'Coding & Computational Thinking (Grade 6)',
      code: 'fecs1',
      chapters: ['Computational Thinking Basics', 'Patterns and Sequences', 'Block-Based Coding (Scratch)', 'Digital Safety and Ethics']
    },
    PE: {
      textbook: 'Health & Physical Education Grade 6',
      code: 'fepe1',
      chapters: ['Human Body and Movement', 'Personal Hygiene & Wellness', 'Fundamental Motor Skills', 'Yoga and Breathing Practices']
    }
  },
  '7': {
    SANSKRIT: {
      textbook: 'Ruchira Bhag 2',
      code: 'gesk1',
      chapters: ['सुभाषितानि', 'दुर्बुद्धिः विनश्यति', 'स्वावलम्बनम्', 'पण्डिता रमाबाई', 'सदाचारः', 'संकल्पः सिद्धिदायकः', 'त्रिवर्णः ध्वजः', 'अहमपि विद्यालयं गमिष्यामि', 'विश्वबन्धुत्वम्', 'समवायो हि दुर्जयः', 'विद्याधनम्', 'अमृतं संस्कृतम्', 'लालनगीतम्']
    },
    HINDI: {
      textbook: 'Vasant Bhag 2',
      code: 'gehn1',
      chapters: ['हम पंछी उन्मुक्त गगन के', 'दादी माँ', 'हिमालय की बेटियाँ', 'कठपुतली', 'मीठाईवाला', 'रक्त और हमारा शरीर', 'पापा खो गए', 'शाम एक किसान', 'चिड़िया की बच्ची', 'अपूर्व अनुभव', 'रहीम के दोहे', 'कंचा', 'एक तिनका', 'खानपान की बदलती तस्वीर', 'नीलकंठ']
    },
    COMP: {
      textbook: 'Computer Science & AI Grade 7',
      code: 'gecs1',
      chapters: ['Advanced Block Programming', 'Algorithms and Flowcharts', 'Introduction to Python Basics', 'AI Concepts: Perception & Reasoning', 'Cyber Security Basics']
    },
    PE: {
      textbook: 'Health & Physical Education Grade 7',
      code: 'gepe1',
      chapters: ['Physical Fitness & Posture', 'Adolescence and Nutrition', 'Team Sports Fundamentals', 'Yoga Asanas and Flexibility']
    }
  },
  '8': {
    SANSKRIT: {
      textbook: 'Ruchira Bhag 3',
      code: 'hesk1',
      chapters: ['सुभाषितानि', 'बिलस्य वाणी न कदापि मे श्रुता', 'डिजीभारतम', 'सदैव पुरतो निधेहि चरणम्', 'कण्टकेनैव कण्टकम्', 'गृहं शून्यं सुतां विना', 'भारतजनताऽहम्', 'संसारसागरस्य नायकाः', 'सप्तभगिन्यः', 'नीतिनवीनतम्', 'सावित्री बाई फुले', 'कः रक्षति कः रक्षितः', 'क्षितौ राजते भारतस्वर्णभूमिः', 'आर्यभटः']
    },
    HINDI: {
      textbook: 'Vasant Bhag 3',
      code: 'hehn1',
      chapters: ['ध्वनि', 'लाख की चूड़ियाँ', 'बस की यात्रा', 'दीवानों की हस्ती', 'चिट्ठियों की अनूठी दुनिया', 'भगवान के डाकिए', 'क्या निराश हुआ जाए', 'यह सबसे कठिन समय नहीं', 'कबीर की साखियाँ', 'कामचोर', 'जब सिनेमा ने बोलना सीखा', 'सुदामा चरित', 'जहाँ पहिया हैं', 'अकबरी लोटा', 'सूर के पद', 'पानी की कहानी']
    },
    COMP: {
      textbook: 'Computer Science & AI Grade 8',
      code: 'hecs1',
      chapters: ['Python Programming: Loops & Functions', 'Lists and Data Structures', 'Machine Learning Models & Data', 'Robotics and Computer Vision', 'Responsible AI & Digital Footprint']
    },
    PE: {
      textbook: 'Health & Physical Education Grade 8',
      code: 'hepe1',
      chapters: ['Cardiorespiratory Endurance', 'Nutrition, Diet & Lifestyle Diseases', 'Sports Rules & Fair Play', 'Pranayama and Mental Well-being']
    }
  },
  '9': {
    SANSKRIT: {
      textbook: 'Shemushi Prathamo Bhag (NCERT Class 9)',
      code: 'iesk1',
      chapters: ['भारतीवसन्तगीतिः', 'स्वर्णकाकः', 'गोदोहनम्', 'सूक्तिमौक्तिकम्', 'भ्रान्तो बालः', 'सिकतासेतुः', 'जटायोः शौर्यम्', 'पर्यावरणम्', 'वाङ्मनःप्राणस्वरूपम्']
    },
    HINDI: {
      textbook: 'Kshitij Bhag 1',
      code: 'iehn1',
      chapters: ['दो बैलों की कथा', 'ल्हासा की ओर', 'उपभोक्तावाद की संस्कृति', 'साँवले सपनों की याद', 'प्रेमचंद के फटे जूते', 'मेरे बचपन के दिन', 'साखियाँ एवं सबद', 'वाख', 'सवैये', 'कैदी और कोकिला', 'ग्राम श्री', 'मेघ आए', 'यमराज की दिशा', 'बच्चे काम पर जा रहे हैं']
    },
    COMP: {
      textbook: 'Information Technology (Code 402)',
      code: 'ieit1',
      chapters: ['Communication Skills-I', 'Self-Management Skills-I', 'ICT Skills-I', 'Entrepreneurial Skills-I', 'Green Skills-I', 'Introduction to IT-ITeS Industry', 'Data Entry & Keyboarding Skills', 'Digital Documentation', 'Electronic Spreadsheet', 'Digital Presentation']
    },
    PE: {
      textbook: 'Health and Physical Education Class 9',
      code: 'iepe1',
      chapters: ['Concept of Physical Education', 'Growth and Development', 'Physical Fitness and Wellness', 'Sports Training and Safety', 'Yoga and Meditation']
    }
  },
  '10': {
    SANSKRIT: {
      textbook: 'Shemushi Dwitiyo Bhag (NCERT Class 10)',
      code: 'jesk1',
      chapters: ['शुचिपर्यावरणम्', 'बुद्धिर्बलवती सदा', 'शिशुलालनम्', 'जननी तुल्यवत्सला', 'सुभाषितानि', 'सौहार्दं प्रकृतेः शोभा', 'विचित्रः साक्षी', 'सूक्तयः', 'प्राणेभ्योऽपि प्रियः सुहृद्']
    },
    HINDI: {
      textbook: 'Kshitij Bhag 2',
      code: 'jehn1',
      chapters: ['पद (सूरदास)', 'राम-लक्ष्मण-परशुराम संवाद', 'उत्साह / अट नहीं रही', 'यह दंतुरित मुस्कान', 'संगतकार', 'नेताजी का चश्मा', 'बालगोबिन भगत', 'लखनवी अंदाज़', 'एक कहानी यह भी', 'नौबतखाने में इबादत', 'संस्कृति']
    },
    COMP: {
      textbook: 'Information Technology / AI (Class 10)',
      code: 'jeit1',
      chapters: ['Communication Skills-II', 'Self-Management Skills-II', 'ICT Skills-II', 'Entrepreneurial Skills-II', 'Green Skills-II', 'Digital Documentation (Advanced)', 'Electronic Spreadsheet (Advanced)', 'Database Management System', 'Web Applications and Security']
    },
    PE: {
      textbook: 'Health and Physical Education Class 10',
      code: 'jepe1',
      chapters: ['Health Problems and Community Health', 'Adolescence & Substance Abuse', 'First Aid and Emergency Care', 'Physical Fitness Testing', 'Yoga for Peak Cognitive Performance']
    }
  }
};
`;

// Insert directly after the last import line
const lastImportIdx = content.lastIndexOf('import ');
const endOfLastImport = content.indexOf(';\n', lastImportIdx);
if (endOfLastImport !== -1) {
  content = content.slice(0, endOfLastImport + 2) + '\n' + syllabusDefinition + '\n' + content.slice(endOfLastImport + 2);
}

fs.writeFileSync(navPath, content, 'utf8');
console.log('[✓] Applied clean syllabus definition and TS patches.');