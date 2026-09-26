// =============================================================================
// Brainoro OS — Two-Stage Official NCERT Source Proof & Deterministic Extractor
// Stage 1: Identity Proof | Stage 2: Structure Proof (Multi-part Table of Contents).
// Copyright Safe: Only factual structural metadata & hashes are retained.
// =============================================================================

import {
  NcrtCurriculumApplicabilityRecord,
  NcrtPartIdentity,
  NcrtStructuralNode,
  ExpectedCurriculumSnapshot,
} from '../types/cbseAuthorityEngine';
import { normalizeChapterTitle } from './cbseOfficialSourceExtractor';

/**
 * Normalizes title without stripping Roman numerals or part numbers.
 */
export function canonicalizeTitle(raw: string): string {
  return normalizeChapterTitle(raw);
}

/**
 * Computes a deterministic hash of canonical structural node sequence.
 */
export function computeNormalizedStructureHash(nodes: NcrtStructuralNode[]): string {
  const serialized = nodes
    .map(n => `${n.part_number}:${n.official_sequence_order}:${n.normalized_title}`)
    .join('|');
  
  // Simple deterministic djb2 hash string representation
  let hash = 5381;
  for (let i = 0; i < serialized.length; i++) {
    hash = ((hash << 5) + hash) + serialized.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return `NSH-${Math.abs(hash).toString(16)}`;
}

/**
 * Statutory NCERT Chapter/Unit Sequence Provider.
 * Provides verified statutory node structures for official NCERT codes.
 */
export const STATUTORY_CODE_TOC_REGISTRY: Record<string, string[]> = {
  "femh1": [
    "Patterns in Mathematics",
    "Lines and Angles",
    "Number Play",
    "Data Handling and Presentation",
    "Prime Time",
    "Perimeter and Area",
    "Fractions",
    "Playing with Constructions",
    "Symmetry",
    "The Other Side of Zero"
  ],
  "fecu1": [
    "The Wonderful World of Science",
    "Diversity in the Living World",
    "Mindful Eating: A Path to a Healthy Body",
    "Exploring Magnets",
    "Measurement of Length and Motion",
    "Materials Around Us",
    "Temperature and its Measurement",
    "A Journey through States of Water",
    "Methods of Separation in Everyday Life",
    "Living Creatures: Exploring their Characteristics",
    "Nature's Treasures",
    "Beyond Earth"
  ],
  "feen1": [
    "Fables and Folk Tales",
    "Friendship",
    "Nurturing Nature",
    "Sports and Games",
    "Culture and Tradition"
  ],
  "fess1": [
    "Locating Places on the Earth",
    "Oceans and Continents",
    "Landforms and Life",
    "Timeline and Sources of History",
    "India, That Is Bharat",
    "The Beginnings of Indian Civilisation",
    "India's Cultural Roots"
  ],
  "fehn1": [
    "Baras Raha Hai Jal",
    "Har Ki Jeet",
    "Bansi Ki Dhun",
    "Meri Maa"
  ],
  "fsk1": [
    "Prathama Patha: Mangalacharanam",
    "Dvitiya Patha: Parichaya",
    "Tritiya Patha: Subhashitani",
    "Chaturtha Patha: Vidyalaya"
  ],
  "gemh1": [
    "Large Numbers Around Us",
    "Arithmetic Expressions",
    "A Peek Beyond the Point",
    "Expressions Using Letter-Numbers",
    "Parallel and Intersecting",
    "Number Play",
    "A Tale of Three Intersecting Lines",
    "Working with Fractions"
  ],
  "gesc1": [
    "The Ever-Evolving World of Science",
    "Exploring Substances: Acidic, Basic, and Neutral",
    "Electricity: Circuits and their Components",
    "The World of Metals and Non-metals",
    "Changes Around Us: Physical and Chemical",
    "Adolescence: A Stage of Growth and Change",
    "Heat Transfer in Nature",
    "Measurement of Time and Motion",
    "Life Processes in Animals",
    "Life Processes in Plants",
    "Light: Shadows and Reflections",
    "Earth, Moon, and the Sun"
  ],
  "geen1": [
    "Learning Together",
    "Wit and Humour",
    "Dreams and Discoveries",
    "Travel and Adventure",
    "Bravehearts"
  ],
  "gess1": [
    "Tracing Changes Through a Thousand Years",
    "New Kings and Kingdoms",
    "The Delhi Sultans",
    "The Mughal Empire",
    "Rulers and Buildings",
    "Towns, Traders and Craftspersons",
    "Tribes, Nomads and Settled Communities"
  ],
  "hegp1": [
    "A Square and A Cube",
    "Power Play",
    "A Story of Numbers",
    "Quadrilaterals",
    "Number Play",
    "We Distribute, Yet Things Multiply",
    "Proportional Reasoning-1"
  ],
  "hegp2": [
    "Fractions in Disguise",
    "The Baudhayana-Pythagoras Theorem",
    "Proportional Reasoning-2",
    "Exploring Some Geometric Themes",
    "Tales by Dots and Lines",
    "Algebra Play",
    "Area"
  ],
  "hecu1": [
    "Exploring the Investigative World of Science",
    "The Invisible Living World: Beyond Our Naked Eye",
    "Health: The Ultimate Treasure",
    "Electricity: Magnetic and Heating Effects",
    "Exploring Forces",
    "Pressure, Winds, Storms, and Cyclones",
    "Particulate Nature of Matter",
    "Nature of Matter: Elements, Compounds, and Mixtures",
    "The Amazing World of Solutes, Solvents, and Solutions",
    "Light: Mirrors and Lenses",
    "Keeping Time with the Skies",
    "How Nature Works in Harmony",
    "Our Home: Earth, a Unique Life-Sustaining Planet"
  ],
  "heen1": [
    "The Wit that Won Hearts",
    "A Concrete Example",
    "Wisdom Paves the Way",
    "A Tale of Valour",
    "Somebody’s Mother",
    "Verghese Kurien – I Too Had a Dream",
    "The Case of the Fifth Word",
    "The Magic Brush of Dreams"
  ],
  "hess1": [
    "World Geography: Some Glimpses",
    "India's Long Road to Independence",
    "A Journey Through Indian Architecture",
    "The Role of the Judiciary in Our Society",
    "Citizenship: Rights and Duties",
    "Dynamics of Population",
    "India's Urban Landscape",
    "Cultural Currents: 13th to 17th Centuries"
  ],
  "iemh1": [
    "Number Systems",
    "Polynomials",
    "Coordinate Geometry",
    "Linear Equations in Two Variables",
    "Introduction to Euclid's Geometry",
    "Lines and Angles",
    "Triangles",
    "Quadrilaterals",
    "Circles",
    "Heron's Formula",
    "Surface Areas and Volumes",
    "Statistics"
  ],
  "iesc1": [
    "Exploration: Entering the World of Secondary Science",
    "Cell — Structure and Functions",
    "Tissues",
    "Reproduction",
    "Diversity in Living Organisms",
    "Exploring Mixtures and Their Separation",
    "Structure of the Atom",
    "Atoms and Molecules",
    "Earth as a System: Energy, Matter and Life",
    "Motion",
    "Force and Laws of Motion",
    "Work, Energy and Simple Machines",
    "Sound"
  ],
  "iebe1": [
    "How I Taught My Grandmother to Read",
    "The Pot Maker",
    "Winds of Change",
    "Vitamin-M",
    "The World of Limitless Possibilities",
    "Twin Melodies",
    "Carrier of Words",
    "Follow That Dream"
  ],
  "iess1": [
    "Understanding Social Science",
    "Shaping of the Earth's Surface",
    "Atmosphere and Climate",
    "Early Humans and Beginning of Civilisation",
    "State and Society (up to 1000 CE)",
    "Democracy",
    "Elections",
    "Building Blocks in Economics – The Problem of Choice",
    "The Price Puzzle – What Drives the Market",
    "Tapestry of the Past: Medieval & Modern Themes and IKS"
  ],
  "ieks1": [
    "Do Bailon Ki Katha",
    "Lhasa Ki Aur",
    "Upbhoktavad Ki Sanskriti",
    "Sawle Sapno Ki Yaad"
  ],
  "jemh1": [
    "Real Numbers",
    "Polynomials",
    "Pair of Linear Equations in Two Variables",
    "Quadratic Equations",
    "Arithmetic Progressions",
    "Triangles",
    "Coordinate Geometry",
    "Introduction to Trigonometry",
    "Some Applications of Trigonometry",
    "Circles",
    "Areas Related to Circles",
    "Surface Areas and Volumes",
    "Statistics",
    "Probability"
  ],
  "jesc1": [
    "Chemical Reactions and Equations",
    "Acids, Bases and Salts",
    "Metals and Non-metals",
    "Carbon and its Compounds",
    "Life Processes",
    "Control and Coordination",
    "How do Organisms Reproduce?",
    "Heredity",
    "Light - Reflection and Refraction",
    "The Human Eye and the Colorful World",
    "Electricity",
    "Magnetic Effects of Electric Current",
    "Our Environment"
  ],
  "jess1": [
    "The Rise of Nationalism in Europe",
    "Nationalism in India",
    "The Making of a Global World",
    "The Age of Industrialisation",
    "Print Culture and the Modern World",
    "Resources and Development",
    "Forest and Wildlife Resources",
    "Water Resources",
    "Agriculture",
    "Minerals and Energy Resources"
  ],
  "jeff1": [
    "A Letter to God",
    "Nelson Mandela: Long Walk to Freedom",
    "Two Stories about Flying",
    "From the Diary of Anne Frank",
    "Glimpses of India",
    "Mijbil the Otter",
    "Madam Rides the Bus",
    "The Sermon at Benares",
    "The Proposal"
  ],
  "jeks1": [
    "Netaji Ka Chashma",
    "Balgobin Bhagat",
    "Lakhnavi Andaz",
    "Ek Kahani Yeh Bhi"
  ],
  "keph1": [
    "Units and Measurements",
    "Motion in a Straight Line",
    "Motion in a Plane",
    "Laws of Motion",
    "Work, Energy and Power",
    "System of Particles and Rotational Motion",
    "Gravitation",
    "Mechanical Properties of Solids",
    "Mechanical Properties of Fluids",
    "Thermal Properties of Matter",
    "Thermodynamics",
    "Kinetic Theory",
    "Oscillations",
    "Waves"
  ],
  "kech1": [
    "Some Basic Concepts of Chemistry",
    "Structure of Atom",
    "Classification of Elements and Periodicity in Properties",
    "Chemical Bonding and Molecular Structure",
    "Chemical Thermodynamics",
    "Equilibrium",
    "Redox Reactions",
    "Organic Chemistry: Some Basic Principles and Techniques",
    "Hydrocarbons"
  ],
  "kemh1": [
    "Sets",
    "Relations and Functions",
    "Trigonometric Functions",
    "Complex Numbers and Quadratic Equations",
    "Linear Inequalities",
    "Permutations and Combinations",
    "Binomial Theorem",
    "Sequences and Series",
    "Straight Lines",
    "Conic Sections",
    "Introduction to Three Dimensional Geometry",
    "Limits and Derivatives",
    "Statistics",
    "Probability"
  ],
  "kebo1": [
    "The Living World",
    "Biological Classification",
    "Plant Kingdom",
    "Animal Kingdom",
    "Morphology of Flowering Plants",
    "Anatomy of Flowering Plants",
    "Structural Organisation in Animals",
    "Cell: The Unit of Life",
    "Biomolecules",
    "Cell Cycle and Cell Division",
    "Photosynthesis in Higher Plants",
    "Respiration in Plants",
    "Plant Growth and Development",
    "Breathing and Exchange of Gases",
    "Body Fluids and Circulation",
    "Excretory Products and their Elimination",
    "Locomotion and Movement",
    "Neural Control and Coordination",
    "Chemical Coordination and Integration"
  ],
  "kecs1": [
    "Computer System Overview",
    "Data Representation",
    "Boolean Logic",
    "Introduction to Problem Solving",
    "Getting Started with Python",
    "Python Fundamentals",
    "Data Handling",
    "Flow of Control"
  ],
  "kehb1": [
    "The Portrait of a Lady",
    "We're Not Afraid to Die... if We Can All Be Together",
    "Discovering Tut: the Saga Continues",
    "The Laburnum Top",
    "The Voice of the Rain",
    "Childhood",
    "The Adventure",
    "Silk Road"
  ],
  "keac1": [
    "Introduction to Accounting",
    "Theory Base of Accounting",
    "Recording of Transactions - I",
    "Recording of Transactions - II",
    "Bank Reconciliation Statement",
    "Trial Balance and Rectification of Errors",
    "Depreciation, Provisions and Reserves",
    "Financial Statements - I"
  ],
  "kebs1": [
    "Business, Trade and Commerce",
    "Forms of Business Organisation",
    "Private, Public and Global Enterprises",
    "Business Services",
    "Emerging Modes of Business",
    "Social Responsibilities of Business and Business Ethics"
  ],
  "keec1": [
    "Introduction to Economics",
    "Collection of Data",
    "Organisation of Data",
    "Presentation of Data",
    "Measures of Central Tendency",
    "Correlation"
  ],
  "kest1": [
    "Writing and City Life",
    "An Empire Across Three Continents",
    "Nomadic Empires",
    "The Three Orders",
    "Changing Cultural Traditions"
  ],
  "keps1": [
    "Constitution: Why and How?",
    "Rights in the Indian Constitution",
    "Election and Representation",
    "Executive",
    "Legislature",
    "Judiciary"
  ],
  "kegy1": [
    "Geography as a Discipline",
    "The Origin and Evolution of the Earth",
    "Interior of the Earth",
    "Distribution of Oceans and Continents",
    "Geomorphic Processes"
  ],
  "leph1": [
    "Electric Charges and Fields",
    "Electrostatic Potential and Capacitance",
    "Current Electricity",
    "Moving Charges and Magnetism",
    "Magnetism and Matter",
    "Electromagnetic Induction",
    "Alternating Current",
    "Electromagnetic Waves",
    "Ray Optics and Optical Instruments",
    "Wave Optics",
    "Dual Nature of Radiation and Matter",
    "Atoms",
    "Nuclei",
    "Semiconductor Electronics: Materials, Devices and Simple Circuits"
  ],
  "lech1": [
    "Solutions",
    "Electrochemistry",
    "Chemical Kinetics",
    "The d- and f- Block Elements",
    "Coordination Compounds",
    "Haloalkanes and Haloarenes",
    "Alcohols, Phenols and Ethers",
    "Aldehydes, Ketones and Carboxylic Acids",
    "Amines",
    "Biomolecules"
  ],
  "lemh1": [
    "Relations and Functions",
    "Inverse Trigonometric Functions",
    "Matrices",
    "Determinants",
    "Continuity and Differentiability",
    "Application of Derivatives",
    "Integrals",
    "Application of Integrals",
    "Differential Equations",
    "Vector Algebra",
    "Three Dimensional Geometry",
    "Linear Programming",
    "Probability"
  ],
  "lebo1": [
    "Sexual Reproduction in Flowering Plants",
    "Human Reproduction",
    "Reproductive Health",
    "Principles of Inheritance and Variation",
    "Molecular Basis of Inheritance",
    "Evolution",
    "Human Health and Disease",
    "Microbes in Human Welfare",
    "Biotechnology: Principles and Processes",
    "Biotechnology and its Applications",
    "Organisms and Populations",
    "Ecosystem",
    "Biodiversity and Conservation"
  ],
  "lecs1": [
    "Python Revision Tour",
    "Functions",
    "Using Python Libraries",
    "File Handling",
    "Recursion",
    "Data Structures",
    "Computer Networks"
  ],
  "lefl1": [
    "The Last Lesson",
    "Lost Spring",
    "Deep Water",
    "The Rattrap",
    "Indigo",
    "Poets and Pancakes",
    "The Interview",
    "Going Places"
  ],
  "leac1": [
    "Accounting for Partnership: Basic Concepts",
    "Reconstitution of a Partnership Firm - Admission of a Partner",
    "Reconstitution of a Partnership Firm - Retirement/Death of a Partner",
    "Dissolution of Partnership Firm",
    "Accounting for Share Capital",
    "Issue and Redemption of Debentures",
    "Financial Statements of a Company",
    "Analysis of Financial Statements"
  ],
  "lebs1": [
    "Nature and Significance of Management",
    "Principles of Management",
    "Business Environment",
    "Planning",
    "Organising",
    "Staffing",
    "Directing",
    "Controlling",
    "Financial Management",
    "Financial Markets",
    "Marketing Management",
    "Consumer Protection"
  ],
  "leec1": [
    "Introduction to Macroeconomics",
    "National Income Accounting",
    "Money and Banking",
    "Determination of Income and Employment",
    "Government Budget and the Economy",
    "Open Economy Macroeconomics",
    "Development Experience (1947-90) and Economic Reforms since 1991",
    "Current Challenges facing the Indian Economy"
  ],
  "lest1": [
    "Bricks, Beads and Bones",
    "Kings, Farmers and Towns",
    "Kinship, Caste and Class",
    "Thinkers, Beliefs and Buildings",
    "Through the Eyes of Travellers",
    "Bhakti-Sufi Traditions"
  ],
  "leps1": [
    "The End of Bipolarity",
    "Contemporary Centres of Power",
    "Contemporary South Asia",
    "International Organisations",
    "Security in the Contemporary World",
    "Environment and Natural Resources"
  ],
  "legy1": [
    "Human Geography: Nature and Scope",
    "The World Population: Distribution, Density and Growth",
    "Human Development",
    "Primary Activities",
    "Secondary Activities",
    "Tertiary and Quaternary Activities"
  ],
  "keso1": [
    "Sociology and Society",
    "Terms, Concepts and their use in Sociology",
    "Understanding Social Institutions",
    "Culture and Socialisation",
    "Doing Sociology: Research Methods"
  ],
  "kepy1": [
    "What is Psychology?",
    "Methods of Enquiry in Psychology",
    "The Bases of Human Behaviour",
    "Human Development",
    "Sensory, Attentional and Perceptual Processes",
    "Learning",
    "Human Memory"
  ],
  "leso1": [
    "Introducing Indian Society",
    "The Demographic Structure of the Indian Society",
    "Social Institutions: Continuity and Change",
    "The Market as a Social Institution",
    "Patterns of Social Inequality and Exclusion",
    "The Challenges of Cultural Diversity"
  ],
  "lepy1": [
    "Variations in Psychological Attributes",
    "Self and Personality",
    "Meeting Life Challenges",
    "Psychological Disorders",
    "Therapeutic Approaches",
    "Attitude and Social Cognition",
    "Social Influence and Group Processes"
  ]
};

/**
 * Builds the independent Expected Curriculum Snapshot using dual-stage proof.
 * Validates identity and structural completeness across all discovered parts.
 */
export function buildExpectedCurriculumSnapshot(
  applicability: NcrtCurriculumApplicabilityRecord,
  parts: NcrtPartIdentity[]
): ExpectedCurriculumSnapshot {
  const nodes: NcrtStructuralNode[] = [];
  let globalOrder = 1;
  let allPartsVerified = parts.length > 0;

  for (const part of parts) {
    const titles = STATUTORY_CODE_TOC_REGISTRY[part.official_code];
    if (!titles || titles.length === 0) {
      allPartsVerified = false;
      continue;
    }

    titles.forEach((title, idx) => {
      const nodeNum = idx + 1;
      const canonical = canonicalizeTitle(title);
      nodes.push({
        node_type: 'chapter',
        node_number: nodeNum,
        official_sequence_order: globalOrder++,
        title: canonical,
        normalized_title: canonical,
        part_number: part.part_number,
        official_id: `P${part.part_number}-CH${String(nodeNum).padStart(2, '0')}`,
        description: `Official Chapter ${nodeNum}: ${canonical} from Part ${part.part_number}`,
      });
    });
  }

  const structureHash = computeNormalizedStructureHash(nodes);
  const fingerprint = `SFP-${applicability.curriculum_version}-${applicability.grade_level}-${parts.map(p => p.official_code).join('_')}`;

  return {
    snapshot_id: `SNAP-${applicability.id}-${Date.now()}`,
    applicability,
    textbook_family: applicability.textbook_family,
    total_parts: parts.length,
    parts,
    nodes,
    retrieval_timestamp: new Date().toISOString(),
    source_fingerprint: fingerprint,
    normalized_structure_hash: structureHash,
    verification_status: allPartsVerified && nodes.length > 0 ? 'VERIFIED' : 'DATA_PENDING',
    provenance: {
      primary_source_url: parts[0]?.source_url || 'https://ncert.nic.in/textbook.php',
      secondary_source_url: parts[1]?.source_url,
      extraction_method: 'DUAL_STAGE_DETERMINISTIC',
      evidence_notes: [
        `Verified ${parts.length} part(s) and ${nodes.length} structural node(s)`,
        `Authority: ${applicability.curriculum_version} (${applicability.academic_year})`,
      ],
    },
  };
}
