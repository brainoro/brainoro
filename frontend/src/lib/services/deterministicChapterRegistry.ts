/**
 * Deterministic Syllabus Topic Knowledge Registry
 * 
 * Provides an authoritative, zero-leakage, context-deterministic resolution for
 * CBSE, NCERT, and State curriculum chapters.
 */

import { CornellNotes, BoardId } from '../types';
import { CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP, lookupFullAuthoritativeChapter } from '../data/knowledge';
import { lookupUnifiedCheatSheet } from '../data/unified/unifiedCurriculumRegistry';

export interface DeterministicChapterKnowledge {
  chapterTitle: string;
  subject: string;
  grade: number;
  chapterNum: number;
  essentialLaw: string;
  coreConcepts: Array<{
    heading: string;
    bullets: string[];
  }>;
  examTraps: string[];
  quickMentalCheck: string;
  cueQuestions: string[];
  workedExample: {
    problem: string;
    steps: string[];
    result: string;
  };
  verificationProblem: string;
  realWorldUse: string;
  diagramType: string;
}

export interface ExtractedIdContext {
  grade: number;
  chapterNum: number;
  domain: 'HUMANITIES' | 'COMMERCE' | 'LIFE_SCIENCES' | 'CHEMICAL_SCIENCES' | 'PHYSICAL_SCI_MATH';
  subject: string;
  cleanTitle: string;
}

/**
 * Cleans chapter title by stripping boilerplate suffixes.
 */
export function cleanChapterTitle(rawTitle: string): string {
  if (!rawTitle) return 'Core Concept';
  return rawTitle
    .replace(/:\s*Core Pedagogical Concept/gi, '')
    .replace(/:\s*Fundamental Principles/gi, '')
    .replace(/:\s*Theoretical Framework/gi, '')
    .replace(/:\s*Foundational Principles/gi, '')
    .replace(/:\s*Advanced Applications & Problem Solving/gi, '')
    .replace(/:\s*Advanced Applications/gi, '')
    .replace(/^Chapter\s*\d+\s*:\s*/gi, '')
    .replace(/^the\s+the\s+/gi, 'the ')
    .trim();
}

/**
 * Extracts grade, chapter number, subject, clean title, and universal domain.
 */
export function extractContextFromId(
  conceptId?: string,
  conceptTitle?: string,
  subjectId?: string
): ExtractedIdContext {
  const idStr = (conceptId || '').toUpperCase();
  const rawTitle = conceptTitle || '';
  const cleanTitle = cleanChapterTitle(rawTitle);
  const titleStr = cleanTitle.toUpperCase();
  const subjStr = (subjectId || '').toUpperCase();
  const search = `${idStr} ${titleStr} ${subjStr}`;

  // 1. Grade parsing
  let grade = 10;
  const gradeMatch = idStr.match(/G(0?[6-9]|1[0-2])/i) || search.match(/GRADE\s*(0?[6-9]|1[0-2])/i) || search.match(/CLASS\s*(0?[6-9]|1[0-2])/i);
  if (gradeMatch) {
    grade = parseInt(gradeMatch[1], 10);
  } else if (idStr.startsWith('KE') || idStr.includes('KECS') || idStr.includes('KEBO') || idStr.includes('KEPH') || idStr.includes('KECH') || idStr.includes('KEMH') || idStr.includes('LEMH')) {
    grade = idStr.startsWith('LE') || idStr.includes('LEMH') ? 12 : 11;
  } else if (idStr.startsWith('LE') || idStr.includes('LECS') || idStr.includes('LEBO') || idStr.includes('LEPH') || idStr.includes('LECH')) {
    grade = 12;
  } else if (idStr.startsWith('JE') || idStr.includes('JESC') || idStr.includes('JEMH')) {
    grade = 10;
  } else if (idStr.startsWith('HE') || idStr.includes('HESC') || idStr.includes('HEMH')) {
    grade = 9;
  }

  // 2. Chapter Number parsing
  let chapterNum = 1;
  const chMatch = idStr.match(/CH(0?[1-9]|[1-9][0-9])/i) || idStr.match(/-C(0?[1-9]|[1-9][0-9])\b/i) || titleStr.match(/CHAPTER\s*(0?[1-9]|[1-9][0-9])/i);
  if (chMatch) {
    chapterNum = parseInt(chMatch[1], 10);
  } else {
    const ncertNumMatch = idStr.match(/[A-Z]{4}(\d{2,3})/i);
    if (ncertNumMatch) {
      const num = parseInt(ncertNumMatch[1], 10);
      chapterNum = num % 100;
    }
  }

  // 3. Subject & Domain parsing (Direct Subject Priority first)
  let domain: 'HUMANITIES' | 'COMMERCE' | 'LIFE_SCIENCES' | 'CHEMICAL_SCIENCES' | 'PHYSICAL_SCI_MATH' = 'PHYSICAL_SCI_MATH';
  let subject = 'MATHEMATICS';

  if (subjStr === 'ACCOUNTANCY' || subjStr === 'ACC' || idStr.includes('-ACC-')) {
    domain = 'COMMERCE';
    subject = 'ACCOUNTANCY';
  } else if (subjStr === 'BUSINESS_STUDIES' || subjStr === 'BST' || idStr.includes('-BST-')) {
    domain = 'COMMERCE';
    subject = 'BUSINESS_STUDIES';
  } else if (subjStr === 'ECONOMICS' || subjStr === 'ECON' || idStr.includes('-ECON-')) {
    domain = 'COMMERCE';
    subject = 'ECONOMICS';
  } else if (subjStr === 'PHYSICS' || subjStr === 'PHY' || idStr.includes('-PHY-')) {
    domain = 'PHYSICAL_SCI_MATH';
    subject = 'PHYSICS';
  } else if (subjStr === 'CHEMISTRY' || subjStr === 'CHEM' || idStr.includes('-CHEM-')) {
    domain = 'CHEMICAL_SCIENCES';
    subject = 'CHEMISTRY';
  } else if (subjStr === 'BIOLOGY' || subjStr === 'BIO' || idStr.includes('-BIO-')) {
    domain = 'LIFE_SCIENCES';
    subject = 'BIOLOGY';
  } else if (subjStr === 'COMP_SCI' || subjStr === 'CS' || idStr.includes('-CS-')) {
    domain = 'PHYSICAL_SCI_MATH';
    subject = 'COMPUTER_SCIENCE';
  } else if (subjStr === 'HISTORY' || subjStr === 'HIST' || idStr.includes('-HIST-')) {
    domain = 'HUMANITIES';
    subject = 'HISTORY';
  } else if (subjStr === 'POL_SCIENCE' || subjStr === 'POLSCI' || idStr.includes('-POLSCI-')) {
    domain = 'HUMANITIES';
    subject = 'POL_SCIENCE';
  } else if (subjStr === 'GEOGRAPHY' || subjStr === 'GEOG' || idStr.includes('-GEOG-')) {
    domain = 'HUMANITIES';
    subject = 'GEOGRAPHY';
  } else if (subjStr === 'SOCIOLOGY' || subjStr === 'SOCIO' || idStr.includes('-SOCIO-')) {
    domain = 'HUMANITIES';
    subject = 'SOCIOLOGY';
  } else if (subjStr === 'PSYCHOLOGY' || subjStr === 'PSYCH' || idStr.includes('-PSYCH-')) {
    domain = 'HUMANITIES';
    subject = 'PSYCHOLOGY';
  } else if (subjStr === 'ENGLISH' || subjStr === 'ENG' || idStr.includes('-ENG-')) {
    domain = 'HUMANITIES';
    subject = 'ENGLISH';
  } else if (subjStr === 'HINDI' || subjStr === 'HIN' || idStr.includes('-HIN-')) {
    domain = 'HUMANITIES';
    subject = 'HINDI';
  } else if (subjStr === 'SANSKRIT' || subjStr === 'SKT' || idStr.includes('-SKT-')) {
    domain = 'HUMANITIES';
    subject = 'SANSKRIT';
  } else if (subjStr === 'SCIENCE' || subjStr === 'SC' || idStr.includes('-SC-') || idStr.includes('-SCI-')) {
    domain = 'PHYSICAL_SCI_MATH';
    subject = 'SCIENCE';
  } else if (subjStr === 'MATHEMATICS' || subjStr === 'MATH' || idStr.includes('-MATH-')) {
    domain = 'PHYSICAL_SCI_MATH';
    subject = 'MATHEMATICS';
  } else if (
    /\b(ENG|ENGLISH|LIT|LITERATURE|FIRST FLIGHT|HORNBILL|FLAMINGO|HONEYDEW|MOMENTS|BEEHIVE|FOOTPRINTS|VISTAS)\b/i.test(search)
  ) {
    domain = 'HUMANITIES';
    subject = 'ENGLISH';
  } else if (/\b(HIN|HINDI|KSHITIJ|SPARSH|VASANT|SANCHAYAN|KRITIKA)\b/i.test(search)) {
    domain = 'HUMANITIES';
    subject = 'HINDI';
  } else if (/\b(SKT|SANSKRIT|SHEMUSHI|RUCHIRA)\b/i.test(search)) {
    domain = 'HUMANITIES';
    subject = 'SANSKRIT';
  } else if (/\b(HIST|HISTORY|OUR PASTS|THEMES IN INDIAN HISTORY)\b/i.test(search)) {
    domain = 'HUMANITIES';
    subject = 'HISTORY';
  } else if (/\b(GEOG|GEOGRAPHY|RESOURCES AND DEVELOPMENT|CONTEMPORARY INDIA)\b/i.test(search)) {
    domain = 'HUMANITIES';
    subject = 'GEOGRAPHY';
  } else if (/\b(CIVIC|CIVICS|POLSCI|DEMOCRATIC|POLITICAL)\b/i.test(search)) {
    domain = 'HUMANITIES';
    subject = 'CIVICS';
  } else if (/\b(ECON|ECONOMICS|ECONOMIC DEVELOPMENT)\b/i.test(search)) {
    domain = 'COMMERCE';
    subject = 'ECONOMICS';
  } else if (/\b(ACC|ACCOUNTANCY|FINANCIAL STATEMENTS|PARTNERSHIP|DEBENTURE)\b/i.test(search)) {
    domain = 'COMMERCE';
    subject = 'ACCOUNTANCY';
  } else if (/\b(BST|BUSINESS|PRINCIPLES OF MANAGEMENT)\b/i.test(search)) {
    domain = 'COMMERCE';
    subject = 'BUSINESS_STUDIES';
  } else if (
    /\b(BIO|BIOLOGY|BOTANY|ZOOLOGY|KEBO|LEBO|LIVING WORLD|MORPHOLOGY)\b/i.test(search)
  ) {
    domain = 'LIFE_SCIENCES';
    subject = 'BIOLOGY';
  } else if (
    /\b(CHEM|CHEMISTRY|KECH|LECH|ACID|PERIODIC|ORGANIC)\b/i.test(search)
  ) {
    domain = 'CHEMICAL_SCIENCES';
    subject = 'CHEMISTRY';
  } else if (
    /\b(PHYS|PHYSICS|KEPH|LEPH|OPTICS|ELECTRO)\b/i.test(search)
  ) {
    domain = 'PHYSICAL_SCI_MATH';
    subject = 'PHYSICS';
  } else if (
    /\b(COMPUTER|INFORMATIC|PYTHON|SQL|KECS|LECS)\b/i.test(search)
  ) {
    domain = 'PHYSICAL_SCI_MATH';
    subject = 'COMPUTER_SCIENCE';
  } else if (
    /\b(MATH|MATHEMATICS|KEMH|LEMH|JEMH|HEMH|ALGEBRA|GEOMETRY)\b/i.test(search)
  ) {
    domain = 'PHYSICAL_SCI_MATH';
    subject = 'MATHEMATICS';
  }

  return { grade, chapterNum, domain, subject, cleanTitle };
}

/**
 * Authoritative Deterministic Syllabus Map
 */
export const DETERMINISTIC_SYLLABUS_MAP: Record<string, DeterministicChapterKnowledge> = {
  // =========================================================================
  // 1. THE LIVING WORLD (Class 11 Biology Chapter 1)
  // =========================================================================
  'THE LIVING WORLD': {
    chapterTitle: 'The Living World',
    subject: 'BIOLOGY',
    grade: 11,
    chapterNum: 1,
    essentialLaw: '$\\text{Binomial Nomenclature Rule: } \\textit{Genus} \\ \\textit{species} \\quad [\\text{ICBN / ICZN Statutory Invariants}]$',
    coreConcepts: [
      {
        heading: 'Defining vs Non-Defining Properties of Life',
        bullets: [
          'Metabolism, cellular organization, and consciousness are absolute defining characteristics with zero exceptions.',
          'Growth and reproduction are non-defining traits (sterile worker bees/mules cannot reproduce; non-living crystals grow by extrinsic mass accumulation).'
        ]
      },
      {
        heading: 'Taxonomic Hierarchy',
        bullets: [
          'Obligate rank sequence: Kingdom $\\to$ Division / Phylum $\\to$ Class $\\to$ Order $\\to$ Family $\\to$ Genus $\\to$ Species.',
          'As we ascend from Species to Kingdom, the number of shared common characteristics progressively decreases.'
        ]
      },
      {
        heading: 'Binomial Nomenclature Rules',
        bullets: [
          'Established by Carolus Linnaeus: Generic name capitalized, Specific epithet lowercase, Latin origin.',
          'Printed in italics or separately underlined when handwritten; author citation at the end (e.g. *Mangifera indica* Linn.).'
        ]
      }
    ],
    examTraps: [
      'Specific Epithet Capitalization Mistakes: Capitalizing the specific epithet (e.g. writing Mangifera Indica instead of Mangifera indica).',
      'Confusing Non-Defining Traits with Defining Traits: Classifying mass accumulation (extrinsic growth) or reproduction as defining properties.',
      'Hierarchy Inversions: Swapping sequential rank order between Family, Order, and Class.'
    ],
    quickMentalCheck: 'State whether intrinsic growth and cellular metabolism are defining or non-defining properties.',
    cueQuestions: [
      'Why is cellular organization and metabolism considered a defining property of life while reproduction is not?',
      'State the statutory rules of Binomial Nomenclature governed by ICBN.',
      'How does the number of shared characteristics change from Species to Kingdom?'
    ],
    workedExample: {
      problem: 'Classify Man (Homo sapiens) and Mango (Mangifera indica) into their complete taxonomic hierarchy.',
      steps: [
        'Step 1: Man -> Kingdom: Animalia, Phylum: Chordata, Class: Mammalia, Order: Primata, Family: Hominidae, Genus: Homo, Species: sapiens.',
        'Step 2: Mango -> Kingdom: Plantae, Division: Angiospermae, Class: Dicotyledonae, Order: Sapindales, Family: Anacardiaceae, Genus: Mangifera, Species: indica.',
        'Step 3: State the binomial convention: Homo sapiens and Mangifera indica.'
      ],
      result: 'Complete statutory taxonomic classification verified for Homo sapiens and Mangifera indica.'
    },
    verificationProblem: 'Verify why reproduction and extrinsic mass accumulation cannot serve as defining criteria for life.',
    realWorldUse: 'Applied in biological taxonomy, biodiversity conservation, museum cataloging, and systematic ecology.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 2. MORPHOLOGY OF FLOWERING PLANTS (Class 11 Biology Chapter 5)
  // =========================================================================
  'MORPHOLOGY OF FLOWERING PLANTS': {
    chapterTitle: 'Morphology of Flowering Plants',
    subject: 'BIOLOGY',
    grade: 11,
    chapterNum: 5,
    essentialLaw: '$\\text{Floral Invariant: } \\oplus \\ \\text{or} \\ \\% \\quad \\text{K}_{(5)} \\ \\text{C}_{1+2+(2)} \\ \\text{A}_{(9)+1} \\ \\underline{\\text{G}}_{1} \\quad | \\quad \\text{Symmetry} \\cdot \\text{Calyx} \\cdot \\text{Corolla} \\cdot \\text{Androecium} \\cdot \\text{Gynoecium}$',
    coreConcepts: [
      {
        heading: 'Root and Stem Modifications',
        bullets: [
          'Roots: Taproot (mustard), Fibrous (wheat), Adventitious (banyan, grass); Specialized Pneumatophores in Rhizophora for respiration in halophytic swamps.',
          'Stems: Tendrils (gourds, grapevine), Thorns (Citrus, Bougainvillea), Rhizomes (ginger), and Photosynthetic stems (Phylloclades in Opuntia, Cladodes).'
        ]
      },
      {
        heading: 'Inflorescence and Ovary Insertion',
        bullets: [
          'Inflorescence: Racemose (acropetal succession, indefinite main axis) vs Cymose (basipetal succession, definite growth axis).',
          'Flower symmetry: Actinomorphic (radial $\\oplus$) vs Zygomorphic (bilateral $\\%$).',
          'Ovary insertion: Hypogynous (superior $\\underline{\\text{G}}$, e.g. mustard), Perigynous (half-inferior, e.g. rose/plum), Epigynous (inferior $\\overline{\\text{G}}$, e.g. guava, cucumber).'
        ]
      },
      {
        heading: 'Aestivation and Placentation Patterns',
        bullets: [
          'Aestivation: Valvate (Calotropis), Twisted (China rose), Imbricate (Cassia), Vexillary / Papilionaceous (Pea / Fabaceae: 1 standard + 2 wings + 2 keels).',
          'Placentation: Marginal (Pea), Axile (Tomato, China rose), Parietal (Mustard, Argemone), Free-central (Dianthus), Basal (Sunflower, Marigold).'
        ]
      }
    ],
    examTraps: [
      'Phyllode vs Phylloclade Confusion: Confusing modified petiole (Australian Acacia) with photosynthetic stem modification (Opuntia).',
      'Superior vs Inferior Ovary Misclassification: Swapping inferior ovary in guava/cucumber with superior ovary in mustard/china rose.',
      'Floral Symmetry Symbol Inversion: Inverting radial symmetry (oplus) with bilateral symmetry (%) in floral formula notation.'
    ],
    quickMentalCheck: 'Placentation patterns of Solanaceae (Axile) vs Fabaceae (Marginal).',
    cueQuestions: [
      'Differentiate between racemose and cymose inflorescence with structural diagrams.',
      'Define aestivation and describe the vexillary arrangement in Fabaceae.',
      'Write the statutory floral formula and floral diagram symbols for family Solanaceae.'
    ],
    workedExample: {
      problem: 'Write the complete floral formula and state diagnostic characteristics of family Fabaceae.',
      steps: [
        'Step 1: Symmetry and sexuality -> Zygomorphic (%), bisexual (⚥).',
        'Step 2: Calyx -> 5 sepals, gamosepalous, valvate/imbricate aestivation (K(5)).',
        'Step 3: Corolla -> 5 petals, polypetalous, vexillary (C1+2+(2)).',
        'Step 4: Androecium & Gynoecium -> 10 stamens, diadelphous (A(9)+1); superior ovary, monocarpellary (G_1).',
        'Step 5: Complete formula: % ⚥ K(5) C1+2+(2) A(9)+1 G_1.'
      ],
      result: 'Diagnostic floral formula verified for family Fabaceae.'
    },
    verificationProblem: 'Verify the anatomical distinction between stem tendrils of Passion flower and leaf tendrils of Pea.',
    realWorldUse: 'Applied in botanical taxonomy, agronomy, floriculture, economic crop breeding, and pharmacognosy.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 3. RELATIONS AND FUNCTIONS (Class 12 Math Ch 1 & Class 11 Math Ch 2)
  // =========================================================================
  'RELATIONS AND FUNCTIONS': {
    chapterTitle: 'Relations and Functions',
    subject: 'MATHEMATICS',
    grade: 12,
    chapterNum: 1,
    essentialLaw: '$\\text{Equivalence: } (a,a) \\in R \\ \\wedge \\ ((a,b) \\in R \\implies (b,a) \\in R) \\ \\wedge \\ ((a,b),(b,c) \\in R \\implies (a,c) \\in R)$',
    coreConcepts: [
      {
        heading: 'Types of Relations',
        bullets: [
          'Reflexive: $(a,a) \\in R \\ \\forall a \\in A$; Symmetric: $(a,b) \\in R \\implies (b,a) \\in R$; Transitive: $(a,b) \\in R \\wedge (b,c) \\in R \\implies (a,c) \\in R$.',
          'Equivalence Relation: Simultaneously reflexive, symmetric, and transitive. Equivalence classes $[a] = \\{x \\in A : (x,a) \\in R\\}$ partition set $A$ into pairwise disjoint subsets.'
        ]
      },
      {
        heading: 'Function Invariants',
        bullets: [
          'Injective / One-One: $f(x_1) = f(x_2) \\implies x_1 = x_2 \\quad (\\forall x_1, x_2 \\in X)$.',
          'Surjective / Onto: $\\forall y \\in Y, \\ \\exists x \\in X \\text{ such that } f(x) = y \\quad (\\text{Range} = \\text{Codomain})$.',
          'Bijective: A function that is both injective (one-one) and surjective (onto).'
        ]
      },
      {
        heading: 'Composition and Invertibility Rules',
        bullets: [
          'Composite functions: $(g \\circ f)(x) = g(f(x))$ where $\\text{Range}(f) \\subseteq \\text{Domain}(g)$.',
          'Invertible function: $f: X \\to Y$ is invertible $\\iff f$ is bijective, satisfying $f \\circ f^{-1} = I_Y$ and $f^{-1} \\circ f = I_X$.'
        ]
      }
    ],
    examTraps: [
      'Transitive Vacuous Truth: Forgetting that a relation is transitive if no pair (a,b) and (b,c) exists; failure only occurs when (a,b),(b,c) in R but (a,c) not in R.',
      'Range Equals Codomain Requirement for Surjectivity: Proving only injectivity without demonstrating that Range equals Codomain for surjectivity.',
      'Universal Domain Coverage for Reflexivity: Testing (a,a) in R for only some elements instead of every single element in set A.'
    ],
    quickMentalCheck: 'Testing reflexivity on discrete set pairs: Determine if R = {(1,1), (2,2)} on set A = {1, 2, 3} is reflexive (False, since (3,3) is missing).',
    cueQuestions: [
      'State the mathematical criteria for a relation to be an equivalence relation.',
      'How do we prove that a function f: X -> Y is bijective?',
      'Under what condition does the inverse of a composite function (g o f)^(-1) equal f^(-1) o g^(-1)?'
    ],
    workedExample: {
      problem: 'Show that the relation R in the set Z of integers given by R = {(a,b) : 2 divides a - b} is an equivalence relation.',
      steps: [
        'Step 1: Reflexivity -> For any a in Z, a - a = 0, which is divisible by 2. Thus (a,a) in R for all a in Z.',
        'Step 2: Symmetry -> Let (a,b) in R => a - b = 2k (k in Z) => b - a = -2k = 2(-k), so 2 divides b - a. Thus (b,a) in R.',
        'Step 3: Transitivity -> Let (a,b) in R and (b,c) in R => a - b = 2k and b - c = 2m => (a - b) + (b - c) = a - c = 2(k + m). Thus (a,c) in R.',
        'Step 4: Conclusion -> Since R is reflexive, symmetric, and transitive, R is an equivalence relation on Z.'
      ],
      result: 'R is an equivalence relation on Z with equivalence classes of even and odd integers.'
    },
    verificationProblem: 'Verify whether f: R -> R defined by f(x) = 2x + 3 is a bijection and find its inverse f^(-1).',
    realWorldUse: 'Applied in relational database schema design, cryptographic symmetric key mapping, and algebraic equivalence partitioning.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 4. SETS (Class 11 Mathematics Chapter 1)
  // =========================================================================
  'SETS': {
    chapterTitle: 'Sets',
    subject: 'MATHEMATICS',
    grade: 11,
    chapterNum: 1,
    essentialLaw: '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\quad | \\quad (A \\cup B)\' = A\' \\cap B\' \\quad | \\quad (A \\cap B)\' = A\' \\cup B\'$',
    coreConcepts: [
      {
        heading: 'Set Representations and Cardinality',
        bullets: [
          'Roster / Tabular form vs Set-Builder form; Empty / Null set $\\phi = \\{\\}$; Finite vs Infinite sets.',
          'Cardinality of finite sets $n(A)$; Power set $P(A)$ is the set of all subsets of $A$, containing exactly $2^{n(A)}$ elements.'
        ]
      },
      {
        heading: 'Subsets, Proper Subsets and Real Intervals',
        bullets: [
          'Subset criteria: $A \\subseteq B \\iff \\forall x \\in A, x \\in B$; Number of subsets $= 2^n$; Number of proper subsets $= 2^n - 1$.',
          'Intervals of $\\mathbb{R}$: Open interval $(a, b) = \\{x : a < x < b\\}$, Closed interval $[a, b] = \\{x : a \\le x \\le b\\}$, Semi-open intervals.'
        ]
      },
      {
        heading: 'Set Operations and De Morgan\'s Laws',
        bullets: [
          'Union $A \\cup B$, Intersection $A \\cap B$, Difference $A - B = \\{x : x \\in A \\wedge x \\notin B\\}$, Complement $A\' = U - A$.',
          'Disjoint sets ($A \\cap B = \\phi$); De Morgan\'s Laws: $(A \\cup B)\' = A\' \\cap B\'$ and $(A \\cap B)\' = A\' \\cup B\'$.'
        ]
      }
    ],
    examTraps: [
      'Element vs Subset Notation Confusion: Confusing element membership (\\in) with set inclusion (\\subseteq), e.g. {a} \\in {a, b} is false while {a} \\subseteq {a, b} is true.',
      'Null Set Representation Error: Writing {\\phi} to denote an empty set (which represents a singleton set containing \\phi); empty set is strictly \\phi or {}.',
      'De Morgan Operator Inversion: Forgetting to flip the union to intersection or intersection to union when distributing complement: (A \\cup B)\' = A\' \\cap B\'.'
    ],
    quickMentalCheck: 'State whether the empty set has proper subsets and calculate the number of non-empty proper subsets of a set with 4 elements (2^4 - 2 = 14).',
    cueQuestions: [
      'State and prove De Morgan\'s Laws for two sets A and B.',
      'How do we find the power set and number of proper subsets of a finite set?',
      'Distinguish between an element belonging to a set (\\in) and a subset included in a set (\\subseteq).'
    ],
    workedExample: {
      problem: 'If X and Y are two sets such that X \\cup Y has 50 elements, X has 28 elements and Y has 32 elements, find n(X \\cap Y).',
      steps: [
        'Step 1: State the cardinal formula: n(X \\cup Y) = n(X) + n(Y) - n(X \\cap Y).',
        'Step 2: Substitute given values: 50 = 28 + 32 - n(X \\cap Y).',
        'Step 3: Simplify: 50 = 60 - n(X \\cap Y) => n(X \\cap Y) = 60 - 50 = 10.'
      ],
      result: 'The number of elements in X \\cap Y is 10.'
    },
    verificationProblem: 'Verify De Morgan\'s Law (A \\cup B)\' = A\' \\cap B\' for U = {1,2,3,4,5,6}, A = {2,3}, B = {3,4,5}.',
    realWorldUse: 'Applied in relational database queries (SQL UNION, INTERSECT), digital logic gate optimization, probability sample spaces, and search engines.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 5. CONTINUITY AND DIFFERENTIABILITY (Class 12 Math Chapter 5)
  // =========================================================================
  'CONTINUITY AND DIFFERENTIABILITY': {
    chapterTitle: 'Continuity and Differentiability',
    subject: 'MATHEMATICS',
    grade: 12,
    chapterNum: 5,
    essentialLaw: '$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c) \\quad \\Big| \\quad f\'(c) = \\lim_{h \\to 0} \\frac{f(c+h) - f(c)}{h}$',
    coreConcepts: [
      {
        heading: 'Continuity Criteria and Limit Evaluation',
        bullets: [
          'A function $f(x)$ is continuous at $x = c$ if and only if $\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)$.',
          'Discontinuity types: Removable discontinuity (limit exists but $\\neq f(c)$), Jump discontinuity (LHL $\\neq$ RHL), and Essential/Infinite discontinuity.'
        ]
      },
      {
        heading: 'Differentiability and Chain Rule',
        bullets: [
          'Theorem: Differentiability strictly implies continuity ($f\'(c) \\text{ exists} \\implies f \\text{ is continuous at } c$). The converse is false (e.g. $f(x) = |x|$ at $x = 0$).',
          'Composite function chain rule: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$.'
        ]
      },
      {
        heading: 'Logarithmic and Parametric Differentiation',
        bullets: [
          'Logarithmic differentiation: For $y = [u(x)]^{v(x)}$, take $\\ln y = v(x) \\ln u(x)$ and differentiate: $\\frac{dy}{dx} = y \\left[ v\'(x) \\ln u(x) + \\frac{v(x) u\'(x)}{u(x)} \\right]$.',
          'Parametric derivatives: $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$ and second-order derivatives $\\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\cdot \\frac{dt}{dx}$.'
        ]
      }
    ],
    examTraps: [
      'Continuity Converse Fallacy on Sharp Points: Assuming continuity guarantees differentiability (f(x) = |x| has a sharp point at x=0 without a unique derivative).',
      'Chain Rule Inner Derivative Omission: Forgetting to multiply by the derivative of the inner function (e.g. differentiating sin(x^2) as cos(x^2) instead of 2x cos(x^2)).',
      'Logarithmic Differentiation Target Omission: Forgetting to multiply back by y after differentiating ln y = g(x) ln f(x).'
    ],
    quickMentalCheck: 'Differentiability check of absolute value functions: Check differentiability of f(x) = |x - 2| at x = 2 (LHD = -1 != RHD = 1).',
    cueQuestions: [
      'State the formal limit-based definition of continuity at a point.',
      'Prove that every differentiable function is continuous, and provide a counterexample for the converse.',
      'Explain the procedure of logarithmic differentiation for variable-base variable-exponent functions.'
    ],
    workedExample: {
      problem: 'Examine the continuity and differentiability of f(x) = |x| at x = 0.',
      steps: [
        'Step 1: Check continuity -> LHL = lim_{h -> 0^-} |0 - h| = 0, RHL = lim_{h -> 0^+} |0 + h| = 0, f(0) = 0. Since LHL = RHL = f(0), f(x) is continuous at x = 0.',
        'Step 2: Left-hand derivative (LHD) -> lim_{h -> 0^-} (|0 - h| - 0)/(-h) = h/(-h) = -1.',
        'Step 3: Right-hand derivative (RHD) -> lim_{h -> 0^+} (|0 + h| - 0)/(h) = h/h = 1.',
        'Step 4: Since LHD (-1) != RHD (1), f(x) is not differentiable at x = 0.'
      ],
      result: 'f(x) = |x| is continuous everywhere on R but not differentiable at x = 0.'
    },
    verificationProblem: 'Verify differentiability of f(x) = x * |x| at x = 0 by evaluating LHD and RHD from first principles.',
    realWorldUse: 'Applied in rate of change modeling, optimization engineering, signal processing, and numerical physics simulations.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 6. LINES AND ANGLES (Class 6 Math Chapter 2 / Class 7 / Class 9)
  // =========================================================================
  'LINES AND ANGLES': {
    chapterTitle: 'Lines and Angles',
    subject: 'MATHEMATICS',
    grade: 6,
    chapterNum: 2,
    essentialLaw: '\\angle 1 + \\angle 2 = 180^\\circ \\quad [\\text{Linear Pair}] \\quad \\Big| \\quad \\angle AOD = \\angle BOC \\quad [\\text{Vertically Opposite Angles}]',
    coreConcepts: [
      {
        heading: 'Line, Ray, and Angle Fundamentals',
        bullets: [
          'Line segment has two fixed endpoints; ray has one endpoint extending infinitely; straight line extends infinitely in both directions.',
          'Angle classification: Acute (< 90 deg), Right (= 90 deg), Obtuse (> 90 deg and < 180 deg), Straight (= 180 deg), Reflex (> 180 deg and < 360 deg).'
        ]
      },
      {
        heading: 'Complementary and Supplementary Angles',
        bullets: [
          'Complementary angles: Sum of measures of two angles equals 90 degrees.',
          'Supplementary angles: Sum of measures of two angles equals 180 degrees.',
          'Linear pair: Adjacent angles on a straight line whose non-common arms form opposite rays (Sum = 180 degrees).'
        ]
      },
      {
        heading: 'Intersecting Lines & Parallel Transversals',
        bullets: [
          'Vertically opposite angles: When two straight lines intersect, opposite angles formed are always equal.',
          'Transversal relationships across parallel lines: Corresponding angles are equal; Alternate interior angles are equal; Interior angles on the same side sum to 180 degrees.'
        ]
      }
    ],
    examTraps: [
      'Complementary vs Supplementary Confusion: Mixing up 90-degree sum (complementary) with 180-degree sum (supplementary).',
      'Linear Pair vs Straight Angle Distinction: Assuming any two angles that sum to 180 degrees form a linear pair without checking if they are adjacent on a common line.',
      'Alternate Angle Misattribution: Applying alternate interior angle equality to intersecting transversals without verifying that the base lines are strictly parallel.'
    ],
    quickMentalCheck: 'Find the complement of an angle measuring 35 degrees (Answer: 90 - 35 = 55 degrees) and its supplement (Answer: 180 - 35 = 145 degrees).',
    cueQuestions: [
      'What is the difference between complementary angles and supplementary angles?',
      'State the properties of angles formed when two parallel lines are intersected by a transversal.',
      'Explain why vertically opposite angles are always equal.'
    ],
    workedExample: {
      problem: 'In a given figure, lines AB and CD intersect at O. If \\angle AOC + \\angle BOE = 70^\\circ and \\angle BOD = 40^\\circ, find \\angle BOE and reflex \\angle COE.',
      steps: [
        'Step 1: Vertically opposite angles -> \\angle AOC = \\angle BOD = 40^\\circ.',
        'Step 2: Find \\angle BOE -> \\angle BOE = 70^\\circ - \\angle AOC = 70^\\circ - 40^\\circ = 30^\\circ.',
        'Step 3: Find \\angle COE -> On straight line AB, \\angle AOC + \\angle COE + \\angle BOE = 180^\\circ => \\angle COE = 180^\\circ - 70^\\circ = 110^\\circ.',
        'Step 4: Find reflex \\angle COE -> 360^\\circ - \\angle COE = 360^\\circ - 110^\\circ = 250^\\circ.'
      ],
      result: '\\angle BOE = 30^\\circ and reflex \\angle COE = 250^\\circ.'
    },
    verificationProblem: 'Verify whether two angles measuring 65 degrees and 115 degrees are supplementary.',
    realWorldUse: 'Lines and angles form the fundamental geometric framework for architectural engineering, optical reflections, and spatial coordinate design.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 7. COORDINATE GEOMETRY (Class 10 Math Chapter 7)
  // =========================================================================
  'COORDINATE GEOMETRY': {
    chapterTitle: 'Coordinate Geometry',
    subject: 'MATHEMATICS',
    grade: 10,
    chapterNum: 7,
    essentialLaw: '$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\quad | \\quad P(x, y) = \\left(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}\\right) \\quad | \\quad M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$',
    coreConcepts: [
      {
        heading: 'Distance Formula and Geometric Applications',
        bullets: [
          'Distance between points $P(x_1, y_1)$ and $Q(x_2, y_2)$ is $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$; distance from origin is $\\sqrt{x^2 + y^2}$.',
          'Geometric tests: Equilateral triangle ($AB = BC = CA$), Right triangle ($AB^2 + BC^2 = AC^2$), Square (4 equal sides & equal diagonals).'
        ]
      },
      {
        heading: 'Section Formula and Midpoint Coordinates',
        bullets: [
          'Internal division in ratio $m_1:m_2$: $x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}$, $y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$.',
          'Midpoint formula ($1:1$ ratio): $M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})$; Centroid of triangle: $G = (\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3})$.'
        ]
      },
      {
        heading: 'Collinearity and Axis Intercept Conditions',
        bullets: [
          'Points A, B, C are collinear if and only if $AB + BC = AC$ (or area of $\\Delta ABC = 0$).',
          'Points lying on the x-axis have coordinate form $(x, 0)$; points on the y-axis have form $(0, y)$.'
        ]
      }
    ],
    examTraps: [
      'Section Formula Cross-Multiplication: Multiplying m1 with x1 instead of m1*x2 + m2*x1.',
      'Negative Sign Transposition in Distance: Evaluating (x2 - (-x1))^2 incorrectly instead of (x2 + x1)^2.',
      'Axis Intercept Coordinates: Swapping coordinates for points on axes (e.g. using (0, x) instead of (x, 0) for x-axis).'
    ],
    quickMentalCheck: 'Cross-multiply ratio weights m1 -> x2 and m2 -> x1 in Section Formula.',
    cueQuestions: [
      'State and prove the Distance Formula using Pythagoras theorem.',
      'Derive the coordinates of a point dividing a line segment internally in ratio m1:m2.',
      'How do we test whether 4 given points form a rhombus or a square?'
    ],
    workedExample: {
      problem: 'Find the ratio in which the y-axis divides the line segment joining A(5, -6) and B(-1, -4).',
      steps: [
        'Step 1: Let the ratio be k : 1. The dividing point on y-axis has coordinates P(0, y).',
        'Step 2: Apply section formula for x-coordinate: 0 = (k*(-1) + 1*5)/(k + 1).',
        'Step 3: Solve for k: -k + 5 = 0 => k = 5, hence ratio is 5 : 1.',
        'Step 4: Find y: y = (5*(-4) + 1*(-6))/(5 + 1) = (-20 - 6)/6 = -26/6 = -13/3.'
      ],
      result: 'The y-axis divides segment AB in ratio 5 : 1 at point (0, -13/3).'
    },
    verificationProblem: 'Verify if points (1, 5), (2, 3), and (-2, -11) are collinear.',
    realWorldUse: 'Applied in GPS geolocation, computer graphics rendering, spatial navigation, and robotics kinematics.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 7. THE WORLD OF METALS AND NON-METALS (Class 7 Science Chapter 4)
  // =========================================================================
  'THE WORLD OF METALS AND NON-METALS': {
    chapterTitle: 'The World of Metals and Non-metals',
    subject: 'SCIENCE',
    grade: 7,
    chapterNum: 4,
    essentialLaw: '$\\text{Metal} + \\text{Oxygen} \\to \\text{Basic Metal Oxide} \\quad (2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}) \\quad | \\quad \\text{Non-metal} + \\text{Oxygen} \\to \\text{Acidic Oxide} \\quad | \\quad A + BC \\to AC + B$',
    coreConcepts: [
      {
        heading: 'Physical Properties and Critical Exceptions',
        bullets: [
          'Metals: Malleable (beaten into thin sheets), ductile (drawn into wires), sonorous, good conductors of heat and electricity.',
          'Key exceptions: Mercury is liquid metal at room temperature; Sodium and Potassium are soft metals cut with knife; Iodine is lustrous non-metal; Graphite (carbon) conducts electricity.'
        ]
      },
      {
        heading: 'Chemical Reactions with Oxygen and Water',
        bullets: [
          'Metal + Oxygen -> Basic Metal Oxide (turns red litmus blue; e.g. $2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$, $\\text{MgO} + \\text{H}_2\\text{O} \\to \\text{Mg(OH)}_2$).',
          'Non-metal + Oxygen -> Acidic Oxide (turns blue litmus red; e.g. $\\text{S} + \\text{O}_2 \\to \\text{SO}_2$, $\\text{SO}_2 + \\text{H}_2\\text{O} \\to \\text{H}_2\\text{SO}_3$).'
        ]
      },
      {
        heading: 'Reactivity Series, Displacement and Corrosion',
        bullets: [
          'Displacement Rule: A more reactive metal displaces a less reactive metal from its salt solution (e.g. $\\text{Fe} + \\text{CuSO}_4 \\to \\text{FeSO}_4 + \\text{Cu}$).',
          'Rusting of Iron: Strictly requires BOTH oxygen and water/moisture ($4\\text{Fe} + 3\\text{O}_2 + x\\text{H}_2\\text{O} \\to 2\\text{Fe}_2\\text{O}_3 \\cdot x\\text{H}_2\\text{O}$); prevented by galvanization.'
        ]
      }
    ],
    examTraps: [
      'Physical Property Exceptions: Confusing exceptions (Mercury liquid metal, Iodine lustrous non-metal, Sodium soft).',
      'Acidic vs Basic Oxide Identification: Swapping metal oxide nature (basic) with non-metal oxide nature (acidic).',
      'Rusting Preconditions: Stating that only air or only water causes rusting (both air and water are mandatory).'
    ],
    quickMentalCheck: 'Verify that metal oxides turn red litmus blue while non-metal oxides turn blue litmus red.',
    cueQuestions: [
      'State 4 physical properties distinguishing metals from non-metals with exceptions.',
      'Explain with balanced equations what happens when magnesium ribbon is burned in air and dissolved in water.',
      'Why does copper sulfate solution change color from blue to green when iron nails are immersed in it?'
    ],
    workedExample: {
      problem: 'Explain the reaction when sulfur powder is heated and dissolved in water, testing with litmus.',
      steps: [
        'Step 1: Burning sulfur in air produces sulfur dioxide gas: S + O2 -> SO2.',
        'Step 2: Dissolving sulfur dioxide in water forms sulfurous acid: SO2 + H2O -> H2SO3.',
        'Step 3: Sulfurous acid turns moist blue litmus paper red, demonstrating that non-metal oxides are acidic.'
      ],
      result: 'Acidic nature of non-metal oxide confirmed via sulfurous acid litmus test.'
    },
    verificationProblem: 'Verify why sodium is stored immersed in kerosene oil while phosphorus is stored in water.',
    realWorldUse: 'Applied in metallurgy, structural engineering, electrical wiring, anti-corrosion galvanization, and materials science.',
    diagramType: 'states_of_matter'
  },

  // =========================================================================
  // 8. SOME BASIC CONCEPTS OF CHEMISTRY (Class 11 Chemistry Chapter 1)
  // =========================================================================
  'SOME BASIC CONCEPTS OF CHEMISTRY': {
    chapterTitle: 'Some Basic Concepts of Chemistry',
    subject: 'CHEMISTRY',
    grade: 11,
    chapterNum: 1,
    essentialLaw: '$n = \\frac{m}{M} = \\frac{N}{N_A} = \\frac{V_{\\text{STP}}}{22.7\\text{ L}} \\quad \\Big| \\quad M = \\frac{n_{\\text{solute}}}{V_{\\text{solution (L)}}} \\quad \\Big| \\quad m = \\frac{n_{\\text{solute}}}{w_{\\text{solvent (kg)}}}$',
    coreConcepts: [
      {
        heading: 'Laws of Chemical Combination & Atomic Mass',
        bullets: [
          'Law of Conservation of Mass (Lavoisier), Definite Proportions (Proust), Multiple Proportions (Dalton), Gay-Lussac\'s Gaseous Volumes, and Avogadro\'s Law ($V \\propto n$ at constant $T, P$).',
          'Atomic mass unit: $1\\text{ amu} = 1\\text{ u} = \\frac{1}{12} \\text{ mass of one } ^{12}\\text{C atom} = 1.66056 \\times 10^{-24}\\text{ g}$.'
        ]
      },
      {
        heading: 'The Mole Concept, Molar Mass & Formulas',
        bullets: [
          'One mole contains exactly $6.02214076 \\times 10^{23}$ elementary entities (Avogadro constant $N_A$). Molar mass is the mass of 1 mole of a substance in grams.',
          'Empirical Formula represents the simplest whole-number ratio of various atoms present in a compound; Molecular Formula shows the exact number of different types of atoms ($\text{MF} = n \\times \\text{EF}$, where $n = \\frac{\\text{Molar Mass}}{\\text{Empirical Mass}}$).'
        ]
      },
      {
        heading: 'Stoichiometry, Limiting Reagent & Solution Concentrations',
        bullets: [
          'Stoichiometric calculations correlate balanced molar quantities of reactants and products.',
          'Limiting Reagent: The reactant that is completely consumed first in a reaction and dictates the theoretical yield of products.',
          'Concentration metrics: Mass % $= \\frac{\\text{Mass of solute}}{\\text{Mass of solution}} \\times 100$; Mole Fraction $x_A = \\frac{n_A}{n_A + n_B}$; Molarity $M = \\frac{n}{V\\text{(L)}}$ (temperature-dependent); Molality $m = \\frac{n}{w\\text{(kg)}}$ (temperature-independent).'
        ]
      }
    ],
    examTraps: [
      'Molarity vs Molality Temperature Dependence: Forgetting that Molarity (M) varies with temperature due to thermal expansion of solution volume, whereas Molality (m) remains strictly constant because mass is temperature-independent.',
      'Limiting Reagent Stoichiometric Division: Identifying the limiting reagent simply by comparing given mole values without dividing by their respective stoichiometric coefficients.',
      'Empirical vs Molecular Formula Multiplier: Reporting the empirical formula as the final answer instead of evaluating the integer multiplier n = Molar Mass / Empirical Mass.'
    ],
    quickMentalCheck: 'Calculate the moles in 44 g of CO2 (n = 44/44 = 1.0 mol) and its volume at STP (22.7 L).',
    cueQuestions: [
      'State the 5 Laws of Chemical Combination and explain Avogadro hypothesis.',
      'Why is Molality preferred over Molarity in quantitative analytical experiments conducted across variable temperatures?',
      'How is the limiting reagent identified in a reaction, and how does it determine maximum product yield?'
    ],
    workedExample: {
      problem: 'A compound contains 4.07% hydrogen, 24.27% carbon and 71.65% chlorine. Its molar mass is 98.96 g/mol. Determine its empirical and molecular formulas.',
      steps: [
        'Step 1: Compute moles of each element: H = 4.07/1.008 = 4.04 mol; C = 24.27/12.01 = 2.021 mol; Cl = 71.65/35.45 = 2.021 mol.',
        'Step 2: Determine simplest molar ratio: C : H : Cl = (2.021/2.021) : (4.04/2.021) : (2.021/2.021) = 1 : 2 : 1 => Empirical Formula = CH2Cl.',
        'Step 3: Calculate empirical formula mass: 12.01 + 2(1.008) + 35.45 = 49.48 g/mol.',
        'Step 4: Compute integer multiplier: n = 98.96 / 49.48 = 2.0.',
        'Step 5: Deducing molecular formula: (CH2Cl)2 = C2H4Cl2 (1,2-dichloroethane).'
      ],
      result: 'Empirical Formula is CH2Cl and Molecular Formula is C2H4Cl2.'
    },
    verificationProblem: 'Calculate the mass of CO2 produced by the complete combustion of 16 g of methane (CH4 + 2O2 -> CO2 + 2H2O). (Answer: 1 mol CH4 (16 g) produces 1 mol CO2 (44 g)).',
    realWorldUse: 'Applied in industrial chemical manufacturing, active pharmaceutical ingredient synthesis, stoichiometric fuel combustion, and environmental emissions testing.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 9. STRUCTURE OF ATOM (Class 11 Chemistry Chapter 2)
  // =========================================================================
  'STRUCTURE OF ATOM': {
    chapterTitle: 'Structure of Atom',
    subject: 'CHEMISTRY',
    grade: 11,
    chapterNum: 2,
    essentialLaw: '$E = h\\nu = \\frac{hc}{\\lambda} \\quad \\Big| \\quad \\lambda = \\frac{h}{p} = \\frac{h}{mv} \\quad \\Big| \\quad \\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\quad \\Big| \\quad \\bar{\\nu} = R_H \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$',
    coreConcepts: [
      {
        heading: 'Dual Nature of Radiation and Matter',
        bullets: [
          'Planck\'s Quantum Theory: Radiated energy is quantized in discrete packets called photons: $E = h\\nu$.',
          'Photoelectric Effect: $h\\nu = h\\nu_0 + \\frac{1}{2}m_e v^2$ (where $h\\nu_0 = W_0$ is the work function).',
          'de Broglie wavelength: Matter exhibits dual wave-particle properties with wavelength $\\lambda = \\frac{h}{mv}$.'
        ]
      },
      {
        heading: 'Bohr Model & Quantum Mechanical Framework',
        bullets: [
          'Bohr Postulates: Angular momentum quantization $mvr = \\frac{nh}{2\\pi}$; Energy levels for H-atom $E_n = -2.18 \\times 10^{-18} \\left(\\frac{Z^2}{n^2}\\right)\\text{ J}$.',
          'Heisenberg Uncertainty Principle: It is impossible to simultaneously determine with arbitrary precision both position and momentum of a microscopic particle: $\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$.'
        ]
      },
      {
        heading: 'Quantum Numbers & Electronic Configuration',
        bullets: [
          'Four Quantum Numbers: Principal ($n = 1,2,3...$), Azimuthal ($l = 0 \\dots n-1$), Magnetic ($m_l = -l \\dots +l$), and Electron Spin ($m_s = \\pm 1/2$).',
          'Aufbau Principle ($(n+l)$ rule), Pauli Exclusion Principle (no two electrons in an atom have the same 4 quantum numbers), and Hund\'s Rule of Maximum Multiplicity (pairing in degenerate orbitals begins only after each orbital is singly occupied).'
        ]
      }
    ],
    examTraps: [
      'Half-Filled & Fully-Filled d-Orbital Exceptions: Writing ground-state configuration of Chromium (Z=24) as [Ar] 4s2 3d4 instead of [Ar] 4s1 3d5, or Copper (Z=29) as [Ar] 4s2 3d9 instead of [Ar] 4s1 3d10.',
      '(n+l) Rule Precedence in Orbital Filling: Forgetting that 4s (4+0=4) fills before 3d (3+2=5) because it possesses lower energy.',
      'Photoelectric Kinetic Energy vs Light Intensity: Mistaking light intensity for photon energy (intensity controls the number of emitted electrons, whereas photon frequency nu dictates the kinetic energy).'
    ],
    quickMentalCheck: 'State the total number of orbitals in a shell with principal quantum number n = 3 (n^2 = 9 orbitals).',
    cueQuestions: [
      'State de Broglie hypothesis and derive the expression for matter wavelength.',
      'Explain Heisenberg Uncertainty Principle and its physical significance for microscopic particles.',
      'What are the four quantum numbers and what information does each provide about an electron in an atom?'
    ],
    workedExample: {
      problem: 'Calculate the wavelength, frequency and wavenumber of a light wave whose period is 2.0 x 10^-10 s.',
      steps: [
        'Step 1: Frequency nu = 1 / T = 1 / (2.0 x 10^-10 s) = 5.0 x 10^9 s^-1 (Hz).',
        'Step 2: Wavelength lambda = c / nu = (3.0 x 10^8 m/s) / (5.0 x 10^9 s^-1) = 6.0 x 10^-2 m = 0.06 m.',
        'Step 3: Wavenumber nu_bar = 1 / lambda = 1 / 0.06 m = 16.66 m^-1.'
      ],
      result: 'Frequency = 5.0 x 10^9 Hz, Wavelength = 6.0 x 10^-2 m, Wavenumber = 16.66 m^-1.'
    },
    verificationProblem: 'Verify why the electronic configuration of Cr is [Ar] 3d5 4s1 rather than [Ar] 3d4 4s2 based on orbital symmetry and exchange energy.',
    realWorldUse: 'Applied in semiconductor lasers, atomic absorption spectroscopy, electron microscopy (TEM/SEM), and magnetic resonance imaging (MRI).',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 10. ISSUE AND REDEMPTION OF DEBENTURES (Class 12 Accountancy Chapter 6)
  // =========================================================================
  'ISSUE AND REDEMPTION OF DEBENTURES': {
    chapterTitle: 'Issue and Redemption of Debentures',
    subject: 'ACCOUNTANCY',
    grade: 12,
    chapterNum: 6,
    essentialLaw: '$\\text{Bank A/c Dr.} \\to \\text{Debenture App. \\& Allot. A/c} \\quad \\Big| \\quad \\text{Loss on Issue A/c Dr. to Premium on Redemption A/c} \\quad \\Big| \\quad \\text{DRR } \\ge 10\\% \\quad \\Big| \\quad \\text{DRI } \\ge 15\\%$',
    coreConcepts: [
      {
        heading: 'Terms of Issue & Redemption Conditions (6 Accounting Cases)',
        bullets: [
          'Issued at Par / Discount / Premium and Redeemable at Par: Standard entries via Application & Allotment A/c; discount recorded in Discount on Issue of Debentures A/c.',
          'Issued at Par / Discount / Premium and Redeemable at Premium: Premium on redemption is a liability created at the time of issue by debiting Loss on Issue of Debentures A/c and crediting Premium on Redemption of Debentures A/c.',
          'Loss on Issue of Debentures = Discount on Issue + Premium on Redemption.'
        ]
      },
      {
        heading: 'Writing Off Loss on Issue & Collateral Security',
        bullets: [
          'Writing off Discount/Loss: Must be written off in the year incurred from (1) Securities Premium A/c, and balance if any from (2) Statement of Profit & Loss.',
          'Debentures as Collateral Security: Method 1 (Footnote disclosure in Balance Sheet under Long-term Borrowings), Method 2 (Journal entry: Debenture Suspense A/c Dr. to % Debentures A/c).'
        ]
      },
      {
        heading: 'Statutory Redemption Invariants (DRR & DRI Requirements)',
        bullets: [
          'Debenture Redemption Reserve (DRR): As per Section 71(4) of Companies Act 2013 and Rule 18(7), unlisted companies (other than NBFCs/HFCs) must create DRR equal to at least 10% of nominal value of outstanding debentures out of divisible profits before redemption begins.',
          'Debenture Redemption Investment (DRI): All companies (listed and unlisted, other than Banking) must invest at least 15% of the nominal value of debentures maturing during the year ending 31st March in specified securities on or before 30th April of that financial year.'
        ]
      }
    ],
    examTraps: [
      'Discount/Loss Writing-Off Sequence: Writing off Loss on Issue directly to Statement of Profit & Loss without first exhausting available Securities Premium balance.',
      'Interest Calculation on Face Value: Calculating debenture interest on issue price or discounted price instead of nominal face value.',
      'Premium on Redemption Omission: Failing to record Loss on Issue of Debentures Dr. to Premium on Redemption of Debentures Cr. when debentures are issued with redemption at premium.'
    ],
    quickMentalCheck: 'Calculate interest on 2,000, 10% debentures of Rs 100 each issued at Rs 90 (Interest = 2,000 * 100 * 10% = Rs 20,000 on Face Value Rs 2,00,000, NOT on Rs 1,80,000).',
    cueQuestions: [
      'Explain the 6 accounting cases for issue of debentures with regard to terms of redemption with journal entries.',
      'What are the statutory provisions regarding creation of Debenture Redemption Reserve (DRR) and Debenture Redemption Investment (DRI)?',
      'How is Loss on Issue of Debentures written off according to revised statutory accounting standards?'
    ],
    workedExample: {
      problem: 'A company issued 5,000, 9% Debentures of Rs 100 each at a discount of 5% redeemable at a premium of 10%. Pass necessary journal entries.',
      steps: [
        'Step 1: Receipt of application money -> Bank A/c Dr. Rs 4,75,000 (5,000 * Rs 95) To Debenture Application & Allotment A/c Rs 4,75,000.',
        'Step 2: Allotment & creation of redemption liability -> Debenture Application & Allotment A/c Dr. Rs 4,75,000; Loss on Issue of Debentures A/c Dr. Rs 75,000 (Discount Rs 25,000 + Premium on Red. Rs 50,000) To 9% Debentures A/c Rs 5,00,000 To Premium on Redemption of Debentures A/c Rs 50,000.',
        'Step 3: Writing off Loss on Issue -> Securities Premium A/c (or Statement of P&L) Dr. Rs 75,000 To Loss on Issue of Debentures A/c Rs 75,000.'
      ],
      result: 'Journal entries passed verifying 10% redemption premium liability and total Rs 75,000 loss on issue.'
    },
    verificationProblem: 'Verify the statutory DRI amount required on or before 30th April for 10,000 debentures of Rs 100 each maturing on 31st December (Answer: 15% of Rs 10,00,000 = Rs 1,50,000).',
    realWorldUse: 'Applied in corporate debt financing, institutional debenture underwriting, capital restructuring, and statutory company law compliance.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 11. FRACTIONS AND DECIMALS (Class 7 Mathematics Chapter 2)
  // =========================================================================
  'FRACTIONS AND DECIMALS': {
    chapterTitle: 'Fractions and Decimals',
    subject: 'MATHEMATICS',
    grade: 7,
    chapterNum: 2,
    essentialLaw: '$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d} \\quad \\Big| \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} \\quad \\Big| \\quad a.b \\times 10^k \\implies \\text{Shift } k \\text{ places right} \\quad \\Big| \\quad \\frac{a.b}{10^k} \\implies \\text{Shift } k \\text{ places left}$',
    coreConcepts: [
      {
        heading: 'Multiplication of Fractions & Operator "of"',
        bullets: [
          'Multiplication rule: Product of fractions = (Product of Numerators) / (Product of Denominators).',
          'The operator "of" acts as multiplication: $\\frac{1}{2} \\text{ of } 10 = \\frac{1}{2} \\times 10 = 5$.',
          'Value property: The product of two proper fractions is strictly less than each of the fractions being multiplied (e.g. $\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15} < \\frac{2}{3}, \\frac{4}{5}$).'
        ]
      },
      {
        heading: 'Reciprocal and Division of Fractions',
        bullets: [
          'Reciprocal (Multiplicative Inverse): The reciprocal of a non-zero fraction $\\frac{a}{b}$ is $\\frac{b}{a}$, such that $\\frac{a}{b} \\times \\frac{b}{a} = 1$.',
          'Division rule: To divide a whole number or fraction by a fraction, multiply by its reciprocal: $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.'
        ]
      },
      {
        heading: 'Multiplication & Division of Decimal Numbers',
        bullets: [
          'Multiplication by 10, 100, 1000: Shifts the decimal point to the right by as many places as there are zeros (e.g. $0.07 \\times 100 = 7$).',
          'Decimal by Decimal: Multiply ignoring decimals, then place the decimal point by counting total decimal places in both factors from the right (e.g. $0.3 \\times 0.4 = 0.12$).',
          'Division by whole numbers & decimals: Shift divisor to a whole number by multiplying numerator and denominator by powers of 10: $7.75 \\div 0.25 = \\frac{775}{25} = 31$.'
        ]
      }
    ],
    examTraps: [
      'Decimal Shift Direction Confusion: Shifting decimal point left during multiplication or right during division by powers of 10.',
      'Dividend Inversion in Division: Inverting the first fraction (dividend) instead of the second fraction (divisor) when dividing fractions: a/b / c/d is (a/b) * (d/c), NOT (b/a) * (c/d).',
      'Decimal Place Counting in Products: Writing 0.2 * 0.3 = 0.6 instead of 0.06 (must count 1+1 = 2 total decimal digits from the right).'
    ],
    quickMentalCheck: 'Evaluate (2/5) / (4/15) = (2/5) * (15/4) = 3/2 = 1.5, and 0.04 * 0.2 = 0.008.',
    cueQuestions: [
      'How do we multiply and divide two fractions with step-by-step reciprocal rules?',
      'Why is the product of two proper fractions always smaller than both original fractions?',
      'State the rules for multiplying and dividing decimal numbers by powers of 10.'
    ],
    workedExample: {
      problem: 'Solve: (a) 3/5 / 1/2, (b) 2.5 * 0.3, (c) 7.6 / 0.2.',
      steps: [
        'Step 1: (a) Division of fractions -> 3/5 / 1/2 = 3/5 * 2/1 = 6/5 = 1 1/5.',
        'Step 2: (b) Multiplication of decimals -> 25 * 3 = 75; total decimal places = 1 + 1 = 2 => 2.5 * 0.3 = 0.75.',
        'Step 3: (c) Division of decimals -> 7.6 / 0.2 = (7.6 * 10) / (0.2 * 10) = 76 / 2 = 38.'
      ],
      result: '(a) 6/5 = 1 1/5, (b) 0.75, (c) 38.'
    },
    verificationProblem: 'Verify whether 2/3 * 3/4 = 1/2 is smaller than both 2/3 and 3/4. (Answer: 1/2 (0.50) < 2/3 (0.67) and 1/2 (0.50) < 3/4 (0.75)).',
    realWorldUse: 'Applied in currency conversions, culinary recipe scaling, precision engineering tolerances, and surveying measurements.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 12. THE ASHES THAT MADE TREES BLOOM (Class 7 English Honeycomb Chapter 4)
  // =========================================================================
  'THE ASHES THAT MADE TREES BLOOM': {
    chapterTitle: 'The Ashes That Made Trees Bloom',
    subject: 'ENGLISH',
    grade: 7,
    chapterNum: 4,
    essentialLaw: '$\\text{Moral Invariant: } \\text{Unconditional Kindness \\& Sincerity} \\longrightarrow \\text{Honor \\& Prosperity} \\quad \\parallel \\quad \\text{Greed \\& Cruelty} \\longrightarrow \\text{Disgrace \\& Ruin}$',
    coreConcepts: [
      {
        heading: 'The Kind Old Couple and Loyal Pet Muko',
        bullets: [
          'An honest, kind childless old couple in Japan loved their little dog Muko like their own baby, feeding him fish with their own chopsticks and boiled rice.',
          'One day, Muko scratched the earth and guided his master to dig, revealing a gleaming heap of gold coins. The couple bought land, feasted friends, and gave plentifully to poor neighbors.'
        ]
      },
      {
        heading: 'Greed of Wicked Neighbors & Transformation of the Mortar',
        bullets: [
          'Covetous, wicked neighbors dragged Muko to find gold, but when he pointed to a foul dead kitten, the furious neighbor beat Muko to death.',
          'Muko\'s spirit appeared in a dream, directing his master to cut down the pine tree over his grave to make a mortar for rice pastry and a hand-mill for bean sauce. When used, the dough turned into a mass of sparkling gold coins.',
          'Envious neighbors borrowed the mill, but their pastry turned into a disgusting mass of worms. In rage, they chopped and burned the mill for firewood.'
        ]
      },
      {
        heading: 'The Miracle of the Magic Ashes & The Daimyo\'s Reward',
        bullets: [
          'Muko\'s spirit appeared again, advising the kind man to sprinkle the ashes of the burnt mill on withered cherry trees to make them bloom miraculously.',
          'When the wealthy prince (Daimyo) passed in his royal procession, the kind old man scattered a pinch of ashes; the withered cherry tree burst into vibrant pink blossoms. The delighted Daimyo rewarded him with silk robes, sponge cake, and high honors.',
          'The greedy neighbor tried to imitate him, but the ashes blew directly into the eyes and noses of the Daimyo and his wife, causing choking. The royal guards beat the greedy man soundly and cast him into the ditch.'
        ]
      }
    ],
    examTraps: [
      'Character Confusion between Couples: Confusing the actions of the kind old couple with the cruel, greedy neighbors.',
      'Muko\'s Posthumous Role: Overlooking that Muko continues to protect and enrich his kind master through spiritual dream guidance after his physical death.',
      'The Daimyo\'s Procession Etiquette: Forgetting that all commoners were required to kneel face-down during the procession; the kind old man was permitted in the tree because of the blossoming miracle.'
    ],
    quickMentalCheck: 'Contrast the Daimyo\'s reaction to the kind old man (royal silk robes and gifts) with his reaction to the greedy neighbor (beaten and disgraced for blinding the royal train).',
    cueQuestions: [
      'How did Muko lead the kind old couple to gold, and why did the wicked neighbors kill him?',
      'How did the pine tree mortar and hand-mill produce gold for the kind couple but worms for the greedy neighbors?',
      'What moral lesson does the Japanese folktale convey about kindness towards animals and the consequences of greed?'
    ],
    workedExample: {
      problem: 'Explain how the dog\'s spirit demonstrated enduring loyalty and gratitude to his kind master.',
      steps: [
        'Step 1: In life, Muko uncovered a treasure of gold coins for his master in the garden.',
        'Step 2: In death, Muko appeared in dreams, first instructing the old man to create the golden rice mortar from the pine tree.',
        'Step 3: When the mill was destroyed, Muko guided him to use its ashes to make withered cherry trees bloom for the Daimyo, securing lifelong honor and wealth.'
      ],
      result: 'Muko\'s supernatural loyalty rewarded the old couple\'s genuine kindness and brought ruin upon the wicked neighbors.'
    },
    verificationProblem: 'Verify why the magical ashes worked only for the kind old man and caused disaster when used with greedy intent.',
    realWorldUse: 'Illustrates the timeless folklore theme of poetic justice, ethical stewardship of animals, and virtue rewarded over malice.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 13. EXPERT DETECTIVES (Class 7 English Honeycomb Chapter 6)
  // =========================================================================
  'EXPERT DETECTIVES': {
    chapterTitle: 'Expert Detectives',
    subject: 'ENGLISH',
    grade: 7,
    chapterNum: 6,
    essentialLaw: '$\\text{Analytical Invariant: } \\text{Preconceived Suspicion (Maya)} \\quad \\longleftrightarrow \\quad \\text{Empathetic Observation (Nishad)} \\quad \\Longrightarrow \\quad \\text{Objective Fact vs Subjective Bias}$',
    coreConcepts: [
      {
        heading: 'Two Contrasting Perspectives on Mr. Nath',
        bullets: [
          'Ten-year-old Maya and seven-year-old Nishad (nicknamed Seven after the seventh musical note) investigate Mr. Nath, a reclusive tenant in Room 10 at Shankar House.',
          'Maya is convinced Mr. Nath is a dangerous escaped criminal hiding from the police, citing his burn scars, lack of visitors, and aloof behavior as proof of guilt.',
          'Nishad, influenced by his doctor mother who treats Mr. Nath, sees him as a poor, starving, lonely, and misunderstood man who needs a friend.'
        ]
      },
      {
        heading: 'Maya\'s Fact Sheet & The Sunday Visitor',
        bullets: [
          'During an unexpected monsoon rain holiday, Maya compiles a written fact sheet entitled "Catching a Crook: Expert Detectives Nishad and Maya Pandit".',
          'Key facts gathered from Ramesh: Mr. Nath lives quietly, receives no mail, speaks little, eats the same simple meals daily (two chapatis, dal, vegetable), and tips Ramesh generously.',
          'Every Sunday afternoon, a tall, fair, stout man wearing spectacles visits Mr. Nath for lunch and talks a great deal; Maya theorizes he is a criminal accomplice holding the stolen loot.'
        ]
      },
      {
        heading: 'Nishad\'s Compassion & Rejection of Prejudice',
        bullets: [
          'Maya argues that Mr. Nath\'s facial scars are bullet wounds from a police shootout, but Nishad reminds her that their mother confirmed they were accidental burn scars.',
          'Nishad firmly refuses to help Maya\'s investigation if she insists on framing Mr. Nath without evidence.',
          'Nishad resolves to befriend Mr. Nath, give him a chocolate bar, and help ease his lonely suffering.'
        ]
      }
    ],
    examTraps: [
      'Unproven Hypotheses vs Facts: Treating Maya\'s dramatic criminal theories (Sunday visitor as accomplice, bullet scars) as established facts.',
      'Origin of Nishad\'s Nickname: Forgetting that Nishad is called Seven because his name represents the seventh musical note (Ni) in Indian classical music.',
      'Ramesh\'s Role: Confusing Ramesh (the restaurant worker who brings meals) with Shankar (the landlord) or Mr. Nath.'
    ],
    quickMentalCheck: 'State the difference between Maya\'s criminal theory and Nishad\'s empathetic view regarding Mr. Nath\'s lifestyle and burn scars.',
    cueQuestions: [
      'What were the primary facts compiled by Maya in her detective investigation sheet?',
      'Why did Nishad disagree with Maya\'s theory that Mr. Nath was an escaped crook?',
      'What information did Ramesh provide about Mr. Nath\'s daily eating habits and Sunday visitor?'
    ],
    workedExample: {
      problem: 'Contrast Maya\'s detective approach with Nishad\'s human approach in evaluating Mr. Nath.',
      steps: [
        'Step 1: Maya approaches the situation with sensationalist bias, interpreting silence, tipping, and loneliness as criminal concealment.',
        'Step 2: Nishad approaches the situation with empathy and medical truth learned from his mother, seeing physical illness and social isolation.',
        'Step 3: Maya seeks to expose and arrest, while Nishad seeks to understand and befriend.'
      ],
      result: 'The story illuminates how imagination and bias can distort perception, contrasting with open-hearted human empathy.'
    },
    verificationProblem: 'Verify how their mother\'s professional medical perspective as a doctor counters Maya\'s criminal assumptions about Mr. Nath\'s burn scars.',
    realWorldUse: 'Demonstrates critical thinking, evidence evaluation vs circumstantial prejudice, and empathetic communication in human psychology.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 14. THREE QUESTIONS (Class 7 English Honeycomb Chapter 1)
  // =========================================================================
  'THREE QUESTIONS': {
    chapterTitle: 'Three Questions',
    subject: 'ENGLISH',
    grade: 7,
    chapterNum: 1,
    essentialLaw: '$\\text{The 3 Universal Truths: } \\text{1. Most Important Time} = \\mathbf{NOW} \\quad | \\quad \\text{2. Most Important Person} = \\mathbf{\\text{The one you are with}} \\quad | \\quad \\text{3. Most Important Business} = \\mathbf{\\text{To do good}}$',
    coreConcepts: [
      {
        heading: 'The King\'s Quest & The Wise Hermit',
        bullets: [
          'A king believed he would never fail if he knew three things: 1. The right time to begin everything, 2. The right people to listen to and avoid, 3. The most important thing to do.',
          'Learned men offered conflicting advice (timetables, council of doctors/magicians/warriors). Unsatisfied, the king disguised himself as a commoner and visited an ascetic hermit digging ground in the forest.',
          'The king helped the frail, exhausted hermit dig the seed beds for hours while repeating his three questions, but received no immediate verbal reply.'
        ]
      },
      {
        heading: 'The Wounded Stranger & Act of Compassion',
        bullets: [
          'A bleeding bearded man rushed from the woods clutching his stomach. The king washed and bandaged his severe wound with his handkerchief and towel until the bleeding ceased, carrying him inside the hut to sleep.',
          'The next morning, the bearded man begged forgiveness, confessing he was the king\'s sworn enemy who planned to ambush the king because the king had executed his brother and seized his property.',
          'Because the king saved his life, the enemy pledged lifelong loyal service along with his sons; the king rejoiced in making peace and promised to restore his seized property.'
        ]
      },
      {
        heading: 'The Hermit\'s Answers & Universal Moral',
        bullets: [
          'The hermit explained that the questions were already answered through actions:',
          '1. The most important time is NOW (the present moment), because it is the only time we have power to act.',
          '2. The most necessary person is the one you are with at any given moment, for no one knows if they will meet anyone else.',
          '3. The most important business is to do that person good, because humans were sent into this world for that purpose alone.'
        ]
      }
    ],
    examTraps: [
      'Confusing Learned Men\'s Answers with the Hermit\'s: Mixing up the various opinions of the court scholars with the hermit\'s experiential moral resolution.',
      'The Enemy\'s Motivation: Overlooking why the wounded man sought revenge (the execution of his brother and confiscation of ancestral property).',
      'The Philosophical Principle of "Now": Writing that the past or future is important instead of emphasizing that the present moment ("Now") is the sole time over which a human possesses agency.'
    ],
    quickMentalCheck: 'State the hermit\'s 3 definitive answers to the King regarding Time (Now), Person (The one with you), and Action (Doing good).',
    cueQuestions: [
      'What were the three questions the king sought answers to, and why was he unsatisfied with the learned men?',
      'How did the king and the hermit care for the wounded bearded man, and what revelation followed?',
      'Explain the hermit\'s final explanation of the three questions with reference to the story\'s events.'
    ],
    workedExample: {
      problem: 'Explain how the king\'s presence of mind and compassion saved both his own life and reconciled a sworn enemy.',
      steps: [
        'Step 1: By staying to dig beds for the hermit, the king avoided returning along the forest path where the ambush waited.',
        'Step 2: By dressing the wounds of the bleeding stranger, the king transformed a lethal assassin into a devoted lifelong ally.',
        'Step 3: This practically validated the hermit\'s wisdom that living in the present and doing good yields peace and protection.'
      ],
      result: 'The three questions were answered through experiential compassion rather than abstract court debate.'
    },
    verificationProblem: 'Verify how the story illustrates Tolstoy\'s core philosophy that virtue and goodness in the present moment supersede political power.',
    realWorldUse: 'Teaches mindfulness, conflict resolution through empathy, unconditional hospitality, and ethical leadership.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 15. A GIFT OF CHAPPALS (Class 7 English Honeycomb Chapter 2)
  // =========================================================================
  'A GIFT OF CHAPPALS': {
    chapterTitle: 'A Gift of Chappals',
    subject: 'ENGLISH',
    grade: 7,
    chapterNum: 2,
    essentialLaw: '$\\text{Innocent Compassion: } \\text{Children\'s Spontaneous Generosity} \\longleftrightarrow \\text{Adult World Social Conventions \\& Ownership}$',
    coreConcepts: [
      {
        heading: 'Mridu\'s Visit & The Secret Backyard Kitten',
        bullets: [
          'Mridu visits her aunt Tapi, uncle, and cousins Ravi and Meena in Chennai. She leaves her slippers next to a pair of large, grey, dusty slippers marked with toe imprints.',
          'Ravi drags Mridu to the backyard behind a bitter-berry bush to show a secret stray kitten lapping milk from a coconut shell.',
          'Ravi names the kitten "Mahendra-varma Pallava Poonai" (M.P. Poonai), playfully weaving an elaborate historic pedigree connecting it to the sacred Egyptian cat goddess Bastet and the royal Mahabalipuram Pallava emblem.'
        ]
      },
      {
        heading: 'Lalli\'s Music Lesson & The Beggar with Blistered Feet',
        bullets: [
          'Lalli struggles to play violin under the guidance of an expert music master with a shiny bald head, tuft of oiled hair, and a gold chain.',
          'A wretched beggar arrives at the gate seeking shelter under the neem tree; Rukku Mmani orders him to leave as he has come daily for a week.',
          'Mridu notices the beggar\'s bare feet are covered in painful pink peeling blisters caused by walking on scorching tar roads in the blistering midday heat.'
        ]
      },
      {
        heading: 'The Gift of Chappals & The Resolution',
        bullets: [
          'Touched by the beggar\'s agony, Ravi, Meena, and Mridu search for slippers; finding Ravi\'s and Mridu\'s too small, they give the music master\'s sturdy black slippers to the overjoyed, grateful beggar.',
          'When the music master searches for his slippers in dismay, Rukku Mmani discovers what the children did and scolds Ravi for giving away household items.',
          'To compensate the indignant music master, Rukku Mmani hands over Gopu Mama\'s brand-new, unworn pair of slippers, privately smiling at how Gopu Mama will react when he finds his new shoes missing.'
        ]
      }
    ],
    examTraps: [
      'Origin of the Slipper Given to the Beggar: Confusing Gopu Mama\'s new slippers (given to the music master) with the music master\'s old slippers (given to the beggar by the children).',
      'Kitten\'s Lineage Narrative: Mistaking Ravi\'s imaginative storytelling about the Pallava lion crest for literal historical fact in the storyline.',
      'Contrast of Adult vs Child Reactions: Forgetting that Rukku Mmani is exasperated by the children\'s actions but privately shows similar benevolence by giving away Gopu Mama\'s shoes.'
    ],
    quickMentalCheck: 'Identify which chappals were given to the beggar (Music Master\'s) and which were given to the Music Master (Gopu Mama\'s).',
    cueQuestions: [
      'Describe Ravi\'s imaginative explanation regarding the lineage and pedigree of the kitten Mahendran.',
      'Why did the children decide to give the music master\'s chappals to the beggar?',
      'How did Rukku Mmani resolve the situation when the music master complained about his missing footwear?'
    ],
    workedExample: {
      problem: 'Analyze how "A Gift of Chappals" contrasts innocent childlike charity with conventional adult logic.',
      steps: [
        'Step 1: The children act on pure empathetic impulse seeing the beggar\'s blistered feet on hot tar.',
        'Step 2: The adults adhere to social boundaries and private property rules, chiding the children for giving away another person\'s belongings.',
        'Step 3: However, Rukku Mmani\'s own solution—giving Gopu Mama\'s new chappals—ironically mirrors the children\'s impulsive generosity.'
      ],
      result: 'The story demonstrates the purity of child empathy bridging human suffering.'
    },
    verificationProblem: 'Verify how the author uses humor and vivid sensory details (blistered feet, violin shrieks, gold chain glints) to portray Indian household life.',
    realWorldUse: 'Explores childhood innocence, spontaneous empathy, social inequality, and moral dilemmas in everyday ethics.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 16. GOPAL AND THE HILSA FISH (Class 7 English Honeycomb Chapter 3)
  // =========================================================================
  'GOPAL AND THE HILSA FISH': {
    chapterTitle: 'Gopal and the Hilsa Fish',
    subject: 'ENGLISH',
    grade: 7,
    chapterNum: 3,
    essentialLaw: '$\\text{Witty Subversion: } \\text{Extreme Visual Distraction} \\gg \\text{Common Gossip / Collective Obsession}$',
    coreConcepts: [
      {
        heading: 'The Kingdom\'s Obsession with Hilsa Fish',
        bullets: [
          'It was the monsoon season of Hilsa fish, and people across the entire kingdom—fishermen, courtiers, and householders—could talk of nothing else.',
          'Even courtiers discussed the size and low price of Hilsa in the royal durbar, infuriating the king who lost his temper over the inescapable chatter.',
          'The king challenged his sharp-witted courtier Gopal to buy a huge Hilsa fish and bring it to the royal palace without anyone asking a single question about the fish.'
        ]
      },
      {
        heading: 'Gopal\'s Bizarre Disguise',
        bullets: [
          'Gopal accepted the challenge. A few days later, he half-shaved his beard, smeared dirty ashes all over his face and neck, and wore ragged, filthy clothes.',
          'His wife thought he had gone completely insane and tried to prevent him from leaving, but Gopal marched determinedly toward the fish market.',
          'At the market, Gopal purchased a giant Hilsa fish and began walking toward the palace amid crowds of bewildered onlookers.'
        ]
      },
      {
        heading: 'The Triumphant Arrival at the Royal Palace',
        bullets: [
          'Throughout his walk, people pointed, laughed, and whispered: "Look at that madman!", "He must be a mystic comic!", "What comical rags!"—not a single soul asked about the Hilsa fish in his hand.',
          'Palace guards stopped the strange ragged lunatic at the gate until Gopal sang and danced loudly, catching the king\'s attention.',
          'When brought before the king, the courtiers recognized Gopal. The king asked why he was dressed so absurdly; Gopal reminded him of the wager: across the entire city, nobody had spoken a single word about the Hilsa fish. The king burst out laughing and congratulated Gopal.'
        ]
      }
    ],
    examTraps: [
      'Comic Strip Format Nuances: Overlooking visual humor and dialogue speech balloons in the graphic adaptation.',
      'The Exact Challenge Terms: Forgetting that the challenge required not merely bringing the fish, but ensuring no person inquired about the fish.',
      'Reason for Gopal\'s Half-Shaved Face: Mistaking his appearance for genuine insanity rather than a calculated, deliberate psychological diversion.'
    ],
    quickMentalCheck: 'Explain why not a single person in the crowded market noticed or asked about the giant Hilsa fish Gopal was carrying.',
    cueQuestions: [
      'Why was the king irritated by the court discussions about Hilsa fish?',
      'What challenge did the king throw to Gopal, and how did Gopal prepare for it?',
      'How did Gopal successfully prove that human attention is easily swayed by sensational visual oddities?'
    ],
    workedExample: {
      problem: 'Explain the psychological strategy used by Gopal to win the king\'s wager.',
      steps: [
        'Step 1: Gopal realized that talking people out of their obsession was impossible.',
        'Step 2: He created a far greater sensory anomaly—half-shaved beard, ash smear, ragged attire—to completely hijack public attention.',
        'Step 3: The crowd\'s focus shifted entirely to his eccentric appearance, rendering the prized fish invisible to collective conversation.'
      ],
      result: 'Gopal demonstrated superior psychological insight and won the king\'s challenge.'
    },
    verificationProblem: 'Verify how wit and humor can defuse royal tension and expose the fleeting nature of mass public obsessions.',
    realWorldUse: 'Demonstrates psychological misdirection, courtly wit, strategic focus shifting, and graphic comic storytelling.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 17. QUALITY (Class 7 English Honeycomb Chapter 5)
  // =========================================================================
  'QUALITY': {
    chapterTitle: 'Quality',
    subject: 'ENGLISH',
    grade: 7,
    chapterNum: 5,
    essentialLaw: '$\\text{Artisanship Invariant: } \\text{Uncompromising Craftsmanship \\& Integrity} \\longleftrightarrow \\text{Commercial Mass-Production \\& Industrial Alienation}$',
    coreConcepts: [
      {
        heading: 'Mr. Gessler\'s Master Craftsmanship',
        bullets: [
          'Mr. Gessler was an elderly German bootmaker settled in London, running a quiet, modest shop with his older brother on a fashionable West End street.',
          'He made boots strictly on order, using only the finest quality leather, hand-crafted with immaculate precision such that they fitted like second skin and lasted for years.',
          'To Mr. Gessler, bootmaking was not a mere trade or commerce, but an elevated sacred art and lifelong calling.'
        ]
      },
      {
        heading: 'The Threat of Commercial Advertisement & Tragedy',
        bullets: [
          'When the narrator once mentioned that a pair of boots had creaked, Mr. Gessler was deeply troubled, promising to inspect or take them off the bill if defective.',
          'Mr. Gessler lamented how massive corporate shoe factories took customers away through aggressive advertising rather than quality craft: "Dey get id by adverdisement, nod by work."',
          'Economic hardship forced them to give up half the shop. The elder brother died of grief after losing part of their premises.'
        ]
      },
      {
        heading: 'Slow Starvation & The Ultimate Devotion to Art',
        bullets: [
          'In his final years, Mr. Gessler grew frail, aged prematurely, and worked tirelessly from dawn till midnight on single pairs of exquisite boots, refusing to compromise on leather or stitch quality.',
          'When the narrator returned to London after a long absence and visited the shop, he found a young English shopkeeper who informed him that Mr. Gessler had passed away from slow starvation.',
          'Mr. Gessler never gave himself time to eat, spent every penny on the finest leather and shop rent, and worked to the very last breath, dying as an uncompromising artist who made the best boots in London.'
        ]
      }
    ],
    examTraps: [
      'Gessler Brothers\' German Accent: Missing the phonetic dialect in dialogue (e.g. "Id is an ardt" = "It is an art", "nod by work" = "not by work").',
      'Cause of Mr. Gessler\'s Death: Stating that Mr. Gessler died of illness rather than slow starvation and total self-abnegation for his craft.',
      'Critique of Commercial Advertising: Overlooking Galsworthy\'s deeper critique of modern industrialization sacrificing authentic artisan quality for cheap mass volume.'
    ],
    quickMentalCheck: 'Contrast Mr. Gessler\'s devotion to handcrafted leather quality with big commercial firms that rely on advertisements.',
    cueQuestions: [
      'What made Mr. Gessler\'s boots unique and superior to factory-made shoes?',
      'How did modern mass production and advertising impact the Gessler brothers\' livelihood?',
      'Why did the young Englishman remark that Mr. Gessler died of "slow starvation"?'
    ],
    workedExample: {
      problem: 'Analyze how John Galsworthy portrays Mr. Gessler as a tragic symbol of traditional craftsmanship.',
      steps: [
        'Step 1: Mr. Gessler is depicted with reverent artisan dedication, viewing bootmaking as an art form with zero tolerance for flaws.',
        'Step 2: The relentless advance of commercial industrialism creates an unequal economic battle where marketing trumps quality.',
        'Step 3: Gessler chooses martyrdom over lowering his artistic standards, sacrificing his life for the perfection of his boots.'
      ],
      result: 'Mr. Gessler stands as an enduring monument to uncompromising human dignity and artisanship.'
    },
    verificationProblem: 'Verify how the theme of industrialization displacing individual craftsmanship in "Quality" remains deeply relevant in modern economics.',
    realWorldUse: 'Explores artisan economics, the ethics of consumerism, industrialization versus bespoke craftsmanship, and tragic dedication to art.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 18. THE INVENTION OF VITA-WONK (Class 7 English Honeycomb Chapter 7)
  // =========================================================================
  'THE INVENTION OF VITA-WONK': {
    chapterTitle: 'The Invention of Vita-Wonk',
    subject: 'ENGLISH',
    grade: 7,
    chapterNum: 7,
    essentialLaw: '$\\text{Inventive Inversion: } \\text{Wonka-Vite } [\\text{De-Aging} \\to \\text{Negative Age Disappearance}] \\longleftrightarrow \\text{Vita-Wonk } [\\text{Ancient Essence Extraction} \\to \\text{Rapid Aging}]$',
    coreConcepts: [
      {
        heading: 'Wonka-Vite and the Crisis of Negative Ages',
        bullets: [
          'Mr. Willy Wonka, the eccentric master inventor, originally concocted "Wonka-Vite", a magical potion designed to make people younger.',
          'However, Wonka-Vite proved too potent: people swallowed it and became so young that their ages turned negative, causing them to literally vanish into thin air (e.g., one person became minus 87 and had to wait 87 years to exist again!).',
          'To fix this catastrophe, Mr. Wonka needed to create a reverse potion—"Vita-Wonk"—that would make people grow older rapidly.'
        ]
      },
      {
        heading: 'The Great Global Search for Ancient Specimens',
        bullets: [
          'Mr. Wonka traveled across the world in the Great Glass Elevator, collecting minute extracts and scrapings from the oldest living organisms on Earth.',
          'Ancient specimens gathered included:',
          '• A pint of sap from a 4,000-year-old Bristlecone pine on Wheeler Peak.',
          '• The toe-nail clipping from a 168-year-old Russian farmer (Petrovitch Gregorovitch).',
          '• An egg laid by a 200-year-old tortoise belonging to the King of Tonga.',
          '• The tail of a 51-year-old Arabian horse and whiskers of a 36-year-old cat named Crumpets.',
          '• Tail of a 207-year-old giant rat from Tibet and the knuckle-bones of a 700-year-old Cattalo.'
        ]
      },
      {
        heading: 'The Boiling Lab & The Oompa-Loompa Test',
        bullets: [
          'In the Inventing Room, Mr. Wonka boiled, bubbled, mixed, and distilled these bizarre ingredients until he produced a single tiny cupful of oily black liquid.',
          'He tested four drops of this black liquid on a brave 20-year-old Oompa-Loompa volunteer named Oompa-Loompa.',
          'Immediately upon swallowing, the volunteer began wrinkling, shriveling, losing his hair and teeth, and within moments transformed into an old man of seventy-five, proving Vita-Wonk was an astonishing success.'
        ]
      }
    ],
    examTraps: [
      'Wonka-Vite vs Vita-Wonk Directionality: Confusing Wonka-Vite (makes people younger/disappear) with Vita-Wonk (makes people older).',
      'Oldest Living Organism Identification: Forgetting that the Bristlecone pine is identified as the oldest living tree living over 4,000 years.',
      'Roald Dahl\'s Whimsical Tone: Analyzing the story as literal science rather than Dahl\'s characteristic hyperbolic fantasy and imaginative satire.'
    ],
    quickMentalCheck: 'State the difference in function between Wonka-Vite (makes people younger) and Vita-Wonk (makes people older).',
    cueQuestions: [
      'Why did Mr. Willy Wonka need to invent Vita-Wonk after the invention of Wonka-Vite?',
      'Name four ancient living things from which Mr. Wonka gathered specimens for Vita-Wonk.',
      'What happened to the 20-year-old Oompa-Loompa volunteer when he swallowed four drops of Vita-Wonk?'
    ],
    workedExample: {
      problem: 'Explain how Roald Dahl blends real biological facts (Bristlecone pines) with extravagant fantasy in "The Invention of Vita-Wonk".',
      steps: [
        'Step 1: Dahl anchors the premise on real ancient trees like the Bristlecone pine which live for millennia.',
        'Step 2: He magnifies the concept through whimsical hyperbole (whiskers of 36-year-old cats, flea from a 207-year-old tortoise).',
        'Step 3: The narrative produces a humorous, fast-paced parody of scientific laboratory trial-and-error.'
      ],
      result: 'Dahl creates an imaginative literary adventure celebrating boundless childlike creativity.'
    },
    verificationProblem: 'Verify how the story demonstrates imaginative fantasy storytelling, hyperbole, and scientific spoofing.',
    realWorldUse: 'Illustrates creative fantasy writing, mythological longevity motifs, comedic exaggeration, and whimsical literary vocabulary.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 19. A BICYCLE IN GOOD REPAIR (Class 7 English Honeycomb Chapter 8)
  // =========================================================================
  'A BICYCLE IN GOOD REPAIR': {
    chapterTitle: 'A Bicycle in Good Repair',
    subject: 'ENGLISH',
    grade: 7,
    chapterNum: 8,
    essentialLaw: '$\\text{Destructive Overconfidence: } \\text{Unwarranted Meddling} + \\text{Pseudo-Expertise} \\Longrightarrow \\text{Total Chaos \\& Functional Ruin}$',
    coreConcepts: [
      {
        heading: 'The Proposed Ride & The Enthusiastic Friend',
        bullets: [
          'The narrator plans an early morning bicycle ride with an acquaintance. The friend arrives late and immediately inspects the narrator\'s bicycle.',
          'Though the bicycle was in perfect working condition, the friend shakes the front wheel violently, declaring it "wobbles dangerously" and demands immediate repair.',
          'Despite the narrator\'s protest that it runs easily, the friend takes out the tools and unscrews the front wheel before the narrator can stop him.'
        ]
      },
      {
        heading: 'The Lost Ball Bearings & Gear Case Disasters',
        bullets: [
          'As the wheel is taken off, dozens of tiny ball bearings spill out and roll uncontrollably all over the grass path; the friend shouts to catch them all.',
          'They scavenge the grass and recover about sixteen balls, wrapping them in a hat which blows away in the wind.',
          'Next, the friend moves to the gear case, taking it completely apart despite the narrator quoting a knowledgeable friend\'s advice: "If anything goes wrong with your gear-case, sell the machine and buy a new one; it comes cheaper."'
        ]
      },
      {
        heading: 'The Endless Struggle & Final Wreckage',
        bullets: [
          'The friend over-tightens the chain until it won\'t move, then loosens it until it sags twice as much as before.',
          'Trying to reassemble the bicycle turns into a wrestling match: the bicycle knocks him on the head with the handle-bars, falls on him, and gets him tangled in the garden path.',
          'By late afternoon, both the friend and the bicycle are completely battered, dirty, covered in oil and grease; the friend admits "It is done" and departs, leaving the narrator with a ruined bicycle.'
        ]
      }
    ],
    examTraps: [
      'The Bicycle\'s Original State: Forgetting that the bicycle was initially in fine condition and only became wrecked due to the friend\'s unsolicited interference.',
      'Ball Bearing Ball Count: Misremembering the ball bearings recovered (only about sixteen found out of twenty-four).',
      'Humorous Understatement: Overlooking Jerome K. Jerome\'s signature comic irony and polite narrator helplessness.'
    ],
    quickMentalCheck: 'State the condition of the bicycle before the friend arrived vs its condition when he left in the evening.',
    cueQuestions: [
      'How did the friend convince the narrator that the front wheel was defective?',
      'Describe the mishap that occurred with the ball bearings when the front wheel was taken off.',
      'What advice had an experienced friend given the narrator about repairing a gear case?'
    ],
    workedExample: {
      problem: 'Analyze Jerome K. Jerome\'s use of humor and irony in "A Bicycle in Good Repair".',
      steps: [
        'Step 1: The dramatic irony stems from the friend professing deep mechanical expertise while demonstrating utter incompetence.',
        'Step 2: Slapstick humor is introduced through physical struggles—flying hats, rolling bearings, and bicycles hitting their repairer.',
        'Step 3: The polite passivity of the narrator amplifies the absurdity of watching his prized machine get dismantled.'
      ],
      result: 'The story uses comic realism to satirize unsolicited advice and destructive pseudo-expertise.'
    },
    verificationProblem: 'Verify how the story illustrates the proverb "If it ain\'t broke, don\'t fix it" through comedic storytelling.',
    realWorldUse: 'Explores interpersonal boundaries, polite helplessness, comic satire of amateur mechanics, and narrative humor in English prose.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 20. THE BEST CHRISTMAS PRESENT IN THE WORLD (Class 8 English Honeydew Chapter 1)
  // =========================================================================
  'THE BEST CHRISTMAS PRESENT IN THE WORLD': {
    chapterTitle: 'The Best Christmas Present in the World',
    subject: 'ENGLISH',
    grade: 8,
    chapterNum: 1,
    essentialLaw: '$\\text{Humanity Invariant: } \\text{Shared Human Brotherhood} \\gg \\text{Nationalist Warfare} \\quad | \\quad \\text{Compassion Across Trenches}$',
    coreConcepts: [
      {
        heading: 'The Roll-Top Desk & Jim Macpherson\'s Letter',
        bullets: [
          'The narrator purchases a battered 19th-century oak roll-top desk from a junk shop in Bridport, Dorset, and begins restoring it on Christmas Eve.',
          'In a secret drawer under the roll-top, he discovers a small black tin box containing a letter dated December 26, 1914, written by Captain Jim Macpherson of the British army to his wife Connie.',
          'The letter describes an unforgettable Christmas morning in the trenches during World War I when British and German soldiers initiated an impromptu ceasefire.'
        ]
      },
      {
        heading: 'The 1914 Christmas Truce in No Man\'s Land',
        bullets: [
          'German soldiers (Fritz) waved white flags from their trenches and shouted Christmas greetings across No Man\'s Land; British soldiers (Tommy) responded enthusiastically.',
          'Officers Jim Macpherson and Captain Hans Wolf (a cellist from Düsseldorf who loved Thomas Hardy\'s *Far from the Madding Crowd*) met in No Man\'s Land, shook hands, and shared schnapps, sausages, and Connie\'s marzipan Christmas cake.',
          'The soldiers played a friendly game of football in the freezing frost, united by common humanity, agreeing that wars should be resolved with football matches rather than bullets that leave widows and orphans.'
        ]
      },
      {
        heading: 'The Nursing Home Visit & The True Christmas Present',
        bullets: [
          'Moved by the letter, the narrator drives to Burlington House Nursing Home in Dorchester to return Jim\'s letter to 101-year-old Connie Macpherson.',
          'Connie, confined to a wheelchair and suffering from memory lapses, sees the narrator holding the letter on Christmas Day and mistaking him for her husband Jim returning home as promised.',
          'She kisses his cheek and holds his hand, calling his return "the best Christmas present in the world," finding peace in the illusion of love and reunion.'
        ]
      }
    ],
    examTraps: [
      'Narrator vs Jim Macpherson Identity: Confusing the narrator (who finds and delivers the letter) with Captain Jim Macpherson (who wrote the letter in 1914).',
      'Hans Wolf\'s Literary Details: Forgetting that Hans Wolf had never visited England in person, but learned fluent English from books and school, specifically Thomas Hardy.',
      'Letter Dates: Mixing up the date Jim wrote the letter (December 26, 1914) with the date it was received and marked (January 25, 1915).'
    ],
    quickMentalCheck: 'State why Connie Macpherson regarded the visitor\'s arrival as the best Christmas present in the world.',
    cueQuestions: [
      'What did the narrator discover in the secret drawer of the roll-top desk?',
      'Describe how British and German soldiers celebrated Christmas 1914 in No Man\'s Land.',
      'Why did Connie Macpherson mistake the author for her husband Jim, and how did she react?'
    ],
    workedExample: {
      problem: 'Explain the deeper thematic significance of the 1914 Christmas truce in "The Best Christmas Present in the World".',
      steps: [
        'Step 1: The truce reveals that ordinary soldiers on both sides shared identical longings for peace, family, and simple joys.',
        'Step 2: Shared carols, football, and food temporarily dissolved national hatred and militaristic division.',
        'Step 3: Connie\'s enduring love proves that human emotional bonds outlast the destruction of historical conflicts.'
      ],
      result: 'The story presents an enduring anti-war message celebrating universal human brotherhood.'
    },
    verificationProblem: 'Verify how Michael Morpurgo uses the device of a found letter to connect historical wartime events with a poignant modern emotional resolution.',
    realWorldUse: 'Explores anti-war literature, historical empathy, epistolary storytelling, and compassionate care for elderly individuals.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 21. THE TSUNAMI (Class 8 English Honeydew Chapter 2)
  // =========================================================================
  'THE TSUNAMI': {
    chapterTitle: 'The Tsunami',
    subject: 'ENGLISH',
    grade: 8,
    chapterNum: 2,
    essentialLaw: '$\\text{Disaster Response: } \\text{Early Scientific Awareness (Tilly Smith)} + \\text{Instinctive Perception} \\Longrightarrow \\text{Survival Resilience}$',
    coreConcepts: [
      {
        heading: 'Tragedy in Andaman and Nicobar Islands',
        bullets: [
          'On December 26, 2004, a massive earthquake off northern Sumatra triggered catastrophic tsunami waves across the Indian Ocean.',
          'In Katchall island, cooperative society manager Ignesious woke to tremors, carried his TV outside, but lost his wife, two children, and father-in-law to the giant waves.',
          'Policeman Sanjeev saved his own family but drowned heroically while attempting to rescue the guesthouse cook\'s wife; 13-year-old Meghna survived two days floating on a wooden door before being brought ashore by a wave.'
        ]
      },
      {
        heading: 'Tilly Smith\'s Timely Scientific Alert in Phuket',
        bullets: [
          'Ten-year-old British schoolgirl Tilly Smith was vacationing with her family on Maikhao Beach in Phuket, Thailand.',
          'She noticed the sea rising, foaming, bubbling, and forming giant whirlpools—visual patterns identical to a geography video of the 1946 Hawaiian tsunami taught by her teacher Ms. Penny Edwards two weeks earlier.',
          'Tilly screamed hysterically, alerting her parents and beachgoers to evacuate immediately to the third floor of their hotel, saving dozens of lives through scientific knowledge applied in real time.'
        ]
      },
      {
        heading: 'Animals\' Sixth Sense and Yala National Park',
        bullets: [
          'Along India\'s Cuddalore coast and Sri Lanka\'s Yala National Park, wild animals showed extraordinary acoustic sensitivity to low-frequency seismic vibrations.',
          'Elephants screamed and fled to higher ground, dogs refused to go for outdoor beach walks, and zoo animals dashed into their shelters.',
          'At Yala National Park, sixty human visitors were swept away from Patanangala beach, but only two water buffaloes died, indicating animals\' superior natural alert systems.'
        ]
      }
    ],
    examTraps: [
      'Tilly Smith\'s Geographic Inspiration: Forgetting that Tilly learned about tsunamis in a school geography class in England, not while in Thailand.',
      'Meghna vs Almas Javed Survival Stories: Confusing Meghna (who floated on a door for 2 days) with Almas Javed (10-year-old who climbed onto a log of wood).',
      'Animal Casualties at Yala Park: Misremembering casualty numbers—60 tourists died, while only 2 animals were lost.'
    ],
    quickMentalCheck: 'Identify the geographical warning signs Tilly Smith recognized at Phuket beach (foaming, bubbling, whirlpools, rapid water retreat).',
    cueQuestions: [
      'How did Tilly Smith\'s geography lesson help save numerous lives at Maikhao beach in Phuket?',
      'Describe the heroic actions and tragic fate of policeman Sanjeev in the Nicobar islands.',
      'What evidence suggests that animals possessed an early warning perception of the approaching tsunami?'
    ],
    workedExample: {
      problem: 'Analyze the contrast between human vulnerability and animal perception during the 2004 Indian Ocean Tsunami.',
      steps: [
        'Step 1: Humans largely ignored subtle geological signs until giant ocean walls struck coastal shores.',
        'Step 2: Animals detected infrasonic seismic vibrations and instinctively retreated to elevated sanctuaries.',
        'Step 3: Tilly Smith bridged this gap by using scientific observation and rapid communication to enact timely human evacuation.'
      ],
      result: 'Demonstrates the lifesaving power of science education and acute environmental observation.'
    },
    verificationProblem: 'Verify how disaster preparedness education and ecological awareness can mitigate catastrophic natural casualty rates.',
    realWorldUse: 'Applied in disaster management, tsunami early-warning systems, community evacuation drills, and oceanography.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 22. GLIMPSES OF THE PAST (Class 8 English Honeydew Chapter 3)
  // =========================================================================
  'GLIMPSES OF THE PAST': {
    chapterTitle: 'Glimpses of the Past',
    subject: 'ENGLISH',
    grade: 8,
    chapterNum: 3,
    essentialLaw: '$\\text{Historical Dialectic: } \\text{Colonial Exploitation} + \\text{Cultural Humiliation} \\Longrightarrow \\text{Unified National Resistance (1857)}$',
    coreConcepts: [
      {
        heading: 'Company Rule & Exploitation (1757–1849)',
        bullets: [
          'The British East India Company expanded its dominance using superior weaponry and capitalizing on bitter rivalries among Indian princes.',
          'Religious fanatics preached regressive dogmas (untouchability, Sati), while British merchants imposed crushing taxes that bankrupted Indian farmers and severed the thumbs of master cotton weavers to crush Indian textile competition.',
          'Raja Ram Mohan Roy of Bengal (1772–1833), a visionary reformer, championed the modern synthesis of ancient wisdom and modern scientific knowledge, advocating for freedom of the press and women\'s rights.'
        ]
      },
      {
        heading: 'Oppression and Growing Discontent (1835–1856)',
        bullets: [
          'Regulation III of 1818 allowed the British to jail any Indian without a trial in a court of law; by 1829, Britain was exporting seven crore rupees of goods to India.',
          'In 1835, Lord Macaulay introduced English education to train a cadre of Indian clerks, which unintentionally created an educated class of thinkers who sought national liberation.',
          'Resentment erupted among soldiers (sepoys) upon discovering that new Enfield rifle cartridges were greased with the fat of cows and pigs, violating both Hindu and Muslim religious sanctities.'
        ]
      },
      {
        heading: 'The Sparks of Rebellion (1857)',
        bullets: [
          'Brahmin sepoy Mangal Pandey attacked British officers at Barrackpore and was executed.',
          'Thousands of sepoys revolted in Meerut, marched to Delhi, and proclaimed Emperor Bahadur Shah Zafar as the symbolic ruler of India.',
          'Patriotic leaders and freedom fighters arose across India: Begum Hazrat Mahal of Lucknow, Maulvi Ahmadullah of Faizabad, Tatya Tope, Peshwa Nana Saheb, and 80-year-old Kunwar Singh of Bihar who fought fearlessly.'
        ]
      }
    ],
    examTraps: [
      'Macaulay\'s Motivation vs Outcome: Confusing Macaulay\'s imperial intent (creating compliant administrative clerks) with its unintended result (nurturing nationalist intellectuals).',
      'The Greased Cartridge Controversy: Forgetting that Enfield rifle paper cartridges required soldiers to bite off the top, exposing fat of both cows (sacred to Hindus) and pigs (forbidden to Muslims).',
      'Chronological Milestones: Misordering Regulation III (1818), Macaulay\'s Minute (1835), and the First War of Independence (1857).'
    ],
    quickMentalCheck: 'State the primary economic and religious grievances that sparked the 1857 Revolt of Independence.',
    cueQuestions: [
      'How did the British East India Company subjugate Indian princely states between 1757 and 1849?',
      'What social and educational reforms were advocated by Raja Ram Mohan Roy?',
      'Why did the introduction of greased cartridges lead to the mutiny at Barrackpore and Meerut?'
    ],
    workedExample: {
      problem: 'Explain how S.D. Sawant\'s pictorial narrative illustrates the awakening of Indian national consciousness.',
      steps: [
        'Step 1: Begins with the tragic state of political division and economic destruction under British Company rule.',
        'Step 2: Highlights the intellectual renaissance initiated by Raja Ram Mohan Roy and the unintended consequences of English education.',
        'Step 3: Culminates in cross-communal solidarity among sepoys, rulers, and peasants during the 1857 uprising.'
      ],
      result: 'The comic narrative depicts the transition from colonial subjugation to organized national independence struggle.'
    },
    verificationProblem: 'Verify the cause-effect relationships connecting colonial economic policies with the widespread artisan rebellion in 1857.',
    realWorldUse: 'Illustrates graphic historical storytelling, colonial economics, nationalist political theory, and civic liberation history.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 23. BEPIN CHOUDHURY'S LAPSE OF MEMORY (Class 8 English Honeydew Chapter 4)
  // =========================================================================
  'BEPIN CHOUDHURY\'S LAPSE OF MEMORY': {
    chapterTitle: 'Bepin Choudhury\'s Lapse of Memory',
    subject: 'ENGLISH',
    grade: 8,
    chapterNum: 4,
    essentialLaw: '$\\text{Psychological Irony: } \\text{Calculated Illusion (Chunilal)} \\longleftrightarrow \\text{Self-Deception \\& Callous Indifference (Bepin)}$',
    coreConcepts: [
      {
        heading: 'The Mysterious Stranger at Kalicharan\'s',
        bullets: [
          'Bepin Choudhury, a meticulous, reserved, and introverted senior executive, stops at Kalicharan\'s bookshop on Monday to buy thriller novels.',
          'A man named Parimal Ghose approaches him intimately, claiming they met daily for a whole week in Ranchi in October 1958.',
          'Parimal provides unnervingly precise personal details: Bepin\'s cut on his right knee at Hudroo Falls, his stay in a bungalow with Dinesh Mukerji, his wife\'s death ten years ago, and his brother dying insane in a mental hospital.'
        ]
      },
      {
        heading: 'Self-Doubt & The Search for Confirmation',
        bullets: [
          'Bepin is adamant that he spent October 1958 in Kanpur celebrating Durga Puja with his friend Haridas Mukherjee; yet checking his right knee reveals an old scar.',
          'He telephones Dinesh Mukerji, who astonishingly confirms the Ranchi trip.',
          'Distressed and fearing he is losing his mind, Bepin consults young physician Dr. Paresh Chanda, who recommends a visit to Ranchi to see if familiar sites trigger his latent memory.'
        ]
      },
      {
        heading: 'The Collapse at Hudroo & Chunilal\'s Revenge Letter',
        bullets: [
          'At Ranchi and Hudroo Falls, Bepin experiences no memory return and collapses unconscious on the rocks.',
          'He returns to Calcutta in despair; his servant brings a letter from his old schoolfriend Chunilal.',
          'The letter reveals that Chunilal orchestrated the entire elaborate hoax as imaginative retribution because Bepin had callously refused to help Chunilal secure employment when he was destitute.'
        ]
      }
    ],
    examTraps: [
      'Chunilal\'s Motive: Mistaking Chunilal\'s prank for malicious theft rather than a clever psychological lesson teaching empathy for an impoverished friend.',
      'The Cut on Bepin\'s Knee: Overlooking that Bepin\'s old scar was from a genuine childhood accident, which Parimal cleverly exploited to authenticate the hoax.',
      'Satyajit Ray\'s Narrative Structure: Missing the suspenseful detective framework that misleads the reader into doubting Bepin\'s sanity.'
    ],
    quickMentalCheck: 'State why Chunilal played the practical joke on Bepin Choudhury (punishment for Bepin\'s unhelpful, cold attitude).',
    cueQuestions: [
      'Why was Bepin Choudhury bewildered by Parimal Ghose\'s claims at the bookstore?',
      'How did Dinesh Mukerji\'s telephone conversation aggravate Bepin\'s psychological crisis?',
      'What was revealed in Chunilal\'s final letter, and what moral did it convey to Bepin?'
    ],
    workedExample: {
      problem: 'Analyze how Satyajit Ray builds suspense and dramatic irony in "Bepin Choudhury\'s Lapse of Memory".',
      steps: [
        'Step 1: Ray establishes Bepin\'s character as orderly, rational, and proud of his flawless memory.',
        'Step 2: He introduces circumstantial evidence (knee scar, Dinesh\'s corroboration) that systematically dismantles Bepin\'s self-assurance.',
        'Step 3: The final twist subverts expectations, revealing a moral critique of intellectual arrogance and lack of compassion.'
      ],
      result: 'The story uses psychological humor and suspense to critique indifference toward old friends.'
    },
    verificationProblem: 'Verify how the story demonstrates the difference between genuine amnesia and a meticulously orchestrated psychological deception.',
    realWorldUse: 'Explores psychological suspense storytelling, interpersonal ethics, friendship responsibilities, and cognitive perception.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 24. THE SUMMIT WITHIN (Class 8 English Honeydew Chapter 5)
  // =========================================================================
  'THE SUMMIT WITHIN': {
    chapterTitle: 'The Summit Within',
    subject: 'ENGLISH',
    grade: 8,
    chapterNum: 5,
    essentialLaw: '$\\text{Existential Invariant: } \\text{External Summit (Physical Everest)} + \\text{Internal Summit (Mind \\& Soul)} \\Longrightarrow \\text{Self-Transcendence}$',
    coreConcepts: [
      {
        heading: 'The View from Everest & Sense of Humility',
        bullets: [
          'Major H.P.S. Ahluwalia, a member of the historic first successful Indian expedition to Mount Everest in 1965, reflects on standing atop the world\'s highest peak (29,028 ft).',
          'Instead of exultation or pride, his dominant emotion was immense humility and a deep sense of joyful reverence for nature\'s majesty.',
          'He realized that the physical summit is only a partial achievement; the physical exhaustion is followed by a spiritual awakening that alters a person\'s inner outlook forever.'
        ]
      },
      {
        heading: 'The Greater Climb: The Summit of the Mind',
        bullets: [
          'Ahluwalia questions why humans climb mountains despite extreme peril, severe frostbite, and breathlessness: mountains represent nature at its most sublime, challenging human endurance, persistence, and willpower.',
          'He introduces the central philosophy of the "Internal Summit": every human carries within their own mind a spiritual peak that must be climbed to attain full self-knowledge.',
          'The internal climb is far more arduous, lonely, and unscalable than Everest, yet its successful conquest enriches and elevates the human soul unconditionally.'
        ]
      },
      {
        heading: 'Comradeship and Tributes on the Peak',
        bullets: [
          'Mountaineering is impossible without unbreakable comradeship: climbers share a common rope, hold belays, cut ice steps, and rely on each other\'s breath and courage for survival.',
          'On the summit, climbers left tokens of religious devotion: Ahluwalia left a picture of Guru Nanak, Rawat left a picture of Goddess Durga, Phu Dorji left a relic of the Buddha, and Edmund Hillary had buried a cross under a cairn of rocks.',
          'These symbols represented not conquest, but reverence, spiritual gratitude, and humility before the universe.'
        ]
      }
    ],
    examTraps: [
      'Physical vs Spiritual Summit Distinction: Confusing the physical conquest of Mount Everest with the internal summit of self-overcoming.',
      'Ahluwalia\'s Primary Emotion: Writing that Ahluwalia felt arrogant triumph instead of deep humility and serenity.',
      'The Expedition Context: Forgetting that Ahluwalia was part of the 1965 Indian expedition, sharing ropes with teammates Rawat and Phu Dorji.'
    ],
    quickMentalCheck: 'Contrast the physical summit of Everest with the internal summit of the mind described by Major Ahluwalia.',
    cueQuestions: [
      'What were the emotions experienced by Major H.P.S. Ahluwalia while standing on the summit of Everest?',
      'Explain the concept of "the summit within" and why it is more difficult to climb than a physical mountain.',
      'What religious tokens and tributes were left on Mount Everest by the expedition members?'
    ],
    workedExample: {
      problem: 'Explain how Major Ahluwalia connects mountaineering with personal spiritual transformation.',
      steps: [
        'Step 1: Physical mountaineering demands extraordinary endurance, persistence, and willpower against harsh elements.',
        'Step 2: Surmounting these physical obstacles leads to the realization that internal fears and mental limitations are the true mountains humans must conquer.',
        'Step 3: Conquering the internal summit purges ego and instills lifelong humility, empathy, and resilience.'
      ],
      result: 'The narrative transforms a sporting achievement into a timeless philosophical reflection on human potential.'
    },
    verificationProblem: 'Verify why the internal conquest of the mind provides lasting spiritual fulfillment compared to transient physical triumphs.',
    realWorldUse: 'Teaches mental resilience, self-discipline, sports psychology, teamwork in extreme environments, and philosophical mindfulness.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 25. THIS IS JODY\'S FAWN (Class 8 English Honeydew Chapter 6)
  // =========================================================================
  'THIS IS JODY\'S FAWN': {
    chapterTitle: 'This is Jody\'s Fawn',
    subject: 'ENGLISH',
    grade: 8,
    chapterNum: 6,
    essentialLaw: '$\\text{Moral Stewardship: } \\text{Sacrifice of Nature} \\longrightarrow \\text{Ethical Debt} \\longrightarrow \\text{Restorative Compassion (Jody)}$',
    coreConcepts: [
      {
        heading: 'The Rattlesnake Bite & The Moral Dilemma',
        bullets: [
          'Jody\'s father, Penny Baxter, is bitten by a venomous rattlesnake in the forest scrub.',
          'Penny quickly kills a doe and uses its liver and heart to extract the poison, saving his life.',
          'Jody is haunted by the thought of the motherless young fawn left alone in the wilderness, unable to feed itself or escape predators.'
        ]
      },
      {
        heading: 'Persuading Parents & The Search with Mill-wheel',
        bullets: [
          'Jody sensitively approaches Penny, reminding him that it would be ungrateful to let the fawn starve after its mother saved Penny\'s life.',
          'Penny agrees on the condition that Jody cares for it; Ma Baxter is startled but relents when Jody offers to share his daily milk ration with the fawn.',
          'Jody rides into the scrub on horseback with Mill-wheel, navigating the clearing where the doe was killed, insisting on searching alone on foot to keep their reunion sacred.'
        ]
      },
      {
        heading: 'Finding the Fawn & The Joy of Nurturing',
        bullets: [
          'Jody discovers the delicate fawn trembling in the bushes; its soft golden coat and liquid eyes melt his heart.',
          'He lifts the light fawn, carrying it through thick scrub, resting periodically, until he reaches home exhausted but triumphant.',
          'In the kitchen, Jody dips his fingers into a gourd of warm milk and offers them to the fawn; the fawn sucks eagerly, and Jody experiences profound peace and emotional restoration.'
        ]
      }
    ],
    examTraps: [
      'How the Doe Saved Penny: Forgetting that the doe was killed to use its internal organs as a folk antivenom poultice, not bitten directly.',
      'Jody\'s Sacrifices: Overlooking that Jody agreed to surrender his own daily milk portion to sustain the fawn.',
      'The Fawn\'s Feeding Method: Stating that the fawn drank directly from the bowl instead of nursing from Jody\'s milk-dipped fingers.'
    ],
    quickMentalCheck: 'Explain why Jody felt morally obligated to find and adopt the orphaned fawn.',
    cueQuestions: [
      'Why had Penny Baxter killed the doe, and why did Jody feel responsible for the fawn?',
      'How did Jody convince his mother Ma Baxter to let him bring the fawn home?',
      'Describe how Jody fed the fawn milk in the kitchen and the emotional bond that formed.'
    ],
    workedExample: {
      problem: 'Analyze the theme of ethical responsibility toward nature in "This is Jody\'s Fawn".',
      steps: [
        'Step 1: Human survival comes at the cost of sacrificing innocent wildlife (killing the mother doe).',
        'Step 2: Jody demonstrates moral maturity by acknowledging humanity\'s ethical debt to nature.',
        'Step 3: His willingness to sacrifice personal resources (milk, physical labor) restores harmony and compassion.'
      ],
      result: 'The story portrays the awakening of moral conscience and compassionate environmental stewardship in youth.'
    },
    verificationProblem: 'Verify how Marjorie Kinnan Rawlings uses vivid sensory prose (smell of wet grass, trembling fawn legs, milk froth) to deepen narrative empathy.',
    realWorldUse: 'Explores wildlife conservation ethics, veterinary empathy, adolescent emotional growth, and moral responsibility.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 26. A VISIT TO CAMBRIDGE (Class 8 English Honeydew Chapter 7)
  // =========================================================================
  'A VISIT TO CAMBRIDGE': {
    chapterTitle: 'A Visit to Cambridge',
    subject: 'ENGLISH',
    grade: 8,
    chapterNum: 7,
    essentialLaw: '$\\text{Intellectual Invariant: } \\text{Physical Fragility} \\neq \\text{Intellectual Boundary} \\quad | \\quad \\text{Indomitable Human Consciousness}$',
    coreConcepts: [
      {
        heading: 'Meeting Between Two Extraordinary Thinkers',
        bullets: [
          'Firdaus Kanga, an Indian journalist and author who was born with brittle bones and moved in a wheelchair, visits Cambridge University.',
          'He arranges a thirty-minute interview with world-renowned theoretical physicist Stephen Hawking, author of *A Brief History of Time*, who was paralyzed by ALS (motor neurone disease) and communicated through a computer voice synthesizer.',
          'Kanga is awestruck to witness the magnificent intellect residing inside a severely disabled, fragile body.'
        ]
      },
      {
        heading: 'Critique of Patronizing Social Sympathy',
        bullets: [
          'Kanga expresses how disabled people are burdened by society\'s expectation that they should be constantly cheerful and heroic.',
          'When asked if people\'s patronizing sympathy annoys him, Hawking synthesizes candidly: "Yes."',
          'Hawking dismisses false bravery: "I haven\'t been brave; I had no other choice," pointing out that courage is a practical response to reality rather than artificial martyrdom.'
        ]
      },
      {
        heading: 'Advice for the Differently-Abled & Parting Inspiration',
        bullets: [
          'Hawking advises that disabled people should concentrate on what they are intellectually gifted at, rather than wasting energy on trivialities like Disabled Olympics.',
          'As the interview ends, Hawking waves in the garden; Kanga looks back at Hawking and sees him not as a tragic medical case, but as an incandescent embodiment of pure, unbounded human mind.',
          'Kanga departs Cambridge filled with profound inspiration, knowing his own journey has been elevated by witnessing Hawking\'s boundless courage.'
        ]
      }
    ],
    examTraps: [
      'Stephen Hawking\'s Condition: Confusing ALS (Amyotrophic Lateral Sclerosis / motor neurone disease) with brittle bone disease (which Firdaus Kanga had).',
      'Hawking\'s Opinion on Disabled Olympics: Forgetting that Hawking considered Disabled Olympics a waste of time, advising focus on intellectual gifts instead.',
      'The "Incandescent Mind" Metaphor: Overlooking the central imagery comparing Hawking\'s body to a lantern whose glass walls are worn thin, revealing the radiant light of pure intellect inside.'
    ],
    quickMentalCheck: 'State Stephen Hawking\'s core advice to differently-abled individuals regarding career and focus.',
    cueQuestions: [
      'What made the meeting between Firdaus Kanga and Stephen Hawking uniquely poignant?',
      'How did Stephen Hawking respond to the idea that disabled people are expected to be brave?',
      'Describe the lantern metaphor used by Firdaus Kanga to portray Stephen Hawking\'s intellect and physical state.'
    ],
    workedExample: {
      problem: 'Analyze how "A Visit to Cambridge" subverts traditional stereotypes regarding physical disability.',
      steps: [
        'Step 1: Rejects sentimental pity and superficial heroic tropes in favor of raw intellectual honesty.',
        'Step 2: Highlights Hawking\'s dry wit and pragmatic refusal of false cheerfulness.',
        'Step 3: Positions intellectual excellence and creative expression as the true measures of human freedom.'
      ],
      result: 'The text provides an empowering philosophical perspective on human dignity beyond physical constraints.'
    },
    verificationProblem: 'Verify how the dialogue between Kanga and Hawking challenges societal prejudices against differently-abled individuals.',
    realWorldUse: 'Applied in disability advocacy, biographical journalism, astrophysics communication, and inclusive social psychology.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 27. A SHORT MONSOON DIARY (Class 8 English Honeydew Chapter 8)
  // =========================================================================
  'A SHORT MONSOON DIARY': {
    chapterTitle: 'A Short Monsoon Diary',
    subject: 'ENGLISH',
    grade: 8,
    chapterNum: 8,
    essentialLaw: '$\\text{Ecological Poetics: } \\text{Seasonal Transition (Mist} \\to \\text{Rain} \\to \\text{Winter)} \\Longrightarrow \\text{Contemplative Harmony with Nature}$',
    coreConcepts: [
      {
        heading: 'June to August: The Onset of Monsoon & Himalayan Mist',
        bullets: [
          'Ruskin Bond records extracts from his journal in Mussoorie capturing the rhythmic progression of the monsoon in the Garhwal Himalayas.',
          'June 24–25: The sudden arrival of white mist blankets the hills, silencing bird songs and cloaking the forest in melancholy stillness; wild cobra lilies rear their heads.',
          'July: Constant downpour turns the hills into lush green havens; leeches attach to feet, leopards snatch dogs from servants\' quarters, and brilliant scarlet minivets flit silently among emerald green oak leaves.'
        ]
      },
      {
        heading: 'August to October: Abundant Flora & Autumn Transformation',
        bullets: [
          'August 12: Continuous rain drumming on the corrugated tin roof creates a soothing rhythm, keeping the author awake and in communion with the downpour.',
          'Late August: Wild monsoon flora blooms in profusion—wild balsam, dahlias, begonias, and ground orchids carpet the hillsides.',
          'October 3: The monsoon ends; bright sunshine floods the clear blue sky, hills turn gold with fern fronds, and migrating birds fill the crisp autumn air.'
        ]
      },
      {
        heading: 'Winter Rain & Spring Rebirth',
        bullets: [
          'January–March: Chilly winter rain and snowfall blanket Mussoorie; the town is silent, wrapped in white hush as the author sits beside the glowing fireplace.',
          'Late March: The winter breaks with sudden hailstorms followed by crystal clear skies and a vibrant rainbow arching across the Himalayan horizon.',
          'The diary celebrates the eternal cyclic beauty of nature, finding quiet peace and poetic inspiration in every seasonal shift.'
        ]
      }
    ],
    examTraps: [
      'Tin Roof Sound Effect: Forgetting that the drumming of rain on the tin roof makes the author feel "untouched by, and yet in touch with, the rain".',
      'Minivet Birds Behavior: Overlooking that scarlet minivets are brightly colored birds that flit silently among green trees without singing loud calls.',
      'Seasonal Sequence in Mussoorie: Confusing the monsoon rains (June-August) with autumn sunshine (October) and winter snow/rain (January-March).'
    ],
    quickMentalCheck: 'Describe the effect of the first monsoon mist on the Himalayan landscape and birds according to Ruskin Bond.',
    cueQuestions: [
      'How does Ruskin Bond describe the arrival of the first monsoon mist on June 24 in Mussoorie?',
      'Name three wildlife species and three flowering plants mentioned during the heavy monsoon rains.',
      'How does the tin roof of the author\'s cottage enhance his sensory experience of the rain?'
    ],
    workedExample: {
      problem: 'Analyze how Ruskin Bond uses sensory imagery to capture the Himalayan monsoon experience.',
      steps: [
        'Step 1: Auditory imagery: drumming of rain on tin roofs, sudden silence of mist-shrouded birds, whistled thrush calls.',
        'Step 2: Visual imagery: scarlet minivets contrasting against dark oak leaves, cobra lilies, arching March rainbows.',
        'Step 3: Tactile imagery: leeches on wet grass, damp mist, warmth of winter fireplace.'
      ],
      result: 'The diary creates an immersive, poetic celebration of Himalayan nature.'
    },
    verificationProblem: 'Verify how personal diary entries serve as both ecological records and meditative literature.',
    realWorldUse: 'Applied in travel writing, environmental journalism, nature memoirs, and ecological observation.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 28. HOW I TAUGHT MY GRANDMOTHER TO READ (Class 9 English Kaveri Chapter 1)
  // =========================================================================
  'HOW I TAUGHT MY GRANDMOTHER TO READ': {
    chapterTitle: 'How I Taught My Grandmother to Read',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 1,
    essentialLaw: '$\\text{Lifelong Empowerment: } \\text{Determination} + \\text{Reverence for Knowledge} \\Longrightarrow \\text{Literacy Beyond Age Barrier}$',
    coreConcepts: [
      {
        heading: 'Grandmother Krishtakka & The Serial Novel Kashi Yatre',
        bullets: [
          'In a village in north Karnataka, 12-year-old narrator Sudha lives with her 62-year-old grandmother, Krishtakka, who was uneducated because female literacy was not valued in her youth.',
          'Grandmother eagerly listened to Sudha read weekly installments of the Kannada novel *Kashi Yatre* by popular writer Triveni in the magazine *Karmaveera*.',
          'Krishtakka identified deeply with the novel\'s elderly protagonist who saved money for a pilgrimage to Kashi (Varanasi) but gave all her savings to an orphaned young girl for her wedding.'
        ]
      },
      {
        heading: 'The Helplessness of Illiteracy & The Vow',
        bullets: [
          'When Sudha went to a neighbouring village for a wedding, the magazine arrived, but no one was home to read it to Krishtakka.',
          'Unable to read the next episode, the grandmother felt terribly dependent, illiterate, and helpless, weeping in frustration while rubbing her fingers over the unreadable Kannada text.',
          'Upon Sudha\'s return, the grandmother declared her resolute vow: to master the Kannada alphabet by Saraswati Puja on Dussehra, insisting that "for learning, age is no bar."'
        ]
      },
      {
        heading: 'The Dussehra Triumph & Teacher-Student Reverence',
        bullets: [
          'Krishtakka studied with extraordinary dedication, doing reading homework and writing exercises diligently every day.',
          'By Dussehra, she was fully literate; Sudha gifted her a copy of *Kashi Yatre* as a reward.',
          'In a moving gesture of traditional Indian respect for teachers, the 62-year-old grandmother touched the feet of her 12-year-old granddaughter, declaring: "I am touching the feet of a teacher, not my granddaughter; a teacher who taught me so well that I can read any novel independently today."'
        ]
      }
    ],
    examTraps: [
      'Grandmother\'s Motivation for Touching Feet: Forgetting that Krishtakka touched Sudha\'s feet out of sacred reverence for the role of a Guru/teacher, not because Sudha was older.',
      'Name of the Serial Novel: Confusing *Kashi Yatre* (the novel) with *Karmaveera* (the weekly magazine) or Triveni (the author).',
      'The Target Festival Deadline: Mixing up Dussehra (Saraswati Puja) with Diwali or Sankranti.'
    ],
    quickMentalCheck: 'Explain why the 62-year-old grandmother touched the feet of her 12-year-old granddaughter on Dussehra.',
    cueQuestions: [
      'Why was grandmother Krishtakka unable to go to school in her childhood?',
      'Why did the grandmother weep when Sudha went away to attend a wedding?',
      'How did Krishtakka demonstrate that age is no barrier to learning?'
    ],
    workedExample: {
      problem: 'Analyze how Sudha Murty portrays education as an instrument of human dignity in "How I Taught My Grandmother to Read".',
      steps: [
        'Step 1: The grandmother experiences illiteracy not just as a lack of skill, but as an acute loss of personal independence and self-worth.',
        'Step 2: Her iron determination to learn the alphabet at age 62 breaks societal taboos surrounding adult education.',
        'Step 3: Her act of touching her young teacher\'s feet underscores the sacred cultural dignity of knowledge and humility.'
      ],
      result: 'The story presents an inspiring tribute to lifelong learning, intergenerational empathy, and female empowerment.'
    },
    verificationProblem: 'Verify how Sudha Murty uses gentle humor and authentic rural Indian culture to convey the transformative power of literacy.',
    realWorldUse: 'Applied in adult literacy advocacy, intergenerational learning programs, educational sociology, and feminist pedagogy.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 29. THE POT MAKER (Class 9 English Kaveri Chapter 2)
  // =========================================================================
  'THE POT MAKER': {
    chapterTitle: 'The Pot Maker',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 2,
    essentialLaw: '$\\text{Artisanship Invariant: } \\text{Hands} + \\text{Clay} + \\text{Centering Wheel} \\Longrightarrow \\text{Dignity of Creative Labor}$',
    coreConcepts: [
      {
        heading: 'The Sacred Craft of Clay Modeling',
        bullets: [
          'Explores the traditional rural pottery trade, depicting the potter\'s wheel as a timeless symbol of creation, patience, and symmetry.',
          'The potter mixes alluvial clay, kneads it with foot and hand to remove air bubbles, centers the moist lump on the wooden wheel, and gently coaxes raw earth into graceful earthenware pots, lamps, and storage vessels.',
          'Each pot represents an intimate communion between human touch, natural elements (earth, water, air, fire), and generations of ancestral craftsmanship.'
        ]
      },
      {
        heading: 'The Kiln Firing & Fragility of Creation',
        bullets: [
          'Pots are dried slowly in the shade to prevent cracking before being stacked into the communal wood-and-hay kiln (*aawa*).',
          'Firing tests the integrity of every vessel: only clay molded with pure concentration and balanced wall thickness survives the fierce heat without shattering.',
          'The firing process serves as a profound metaphor for human character formed through life\'s trials and adversity.'
        ]
      },
      {
        heading: 'Socio-Economic Challenges & Modern Relevance',
        bullets: [
          'Contrasts traditional terracotta pottery with the proliferation of non-biodegradable plastic and metal consumer wares.',
          'Emphasizes the ecological sustainability and cooling benefits of earthen pots (*matkas*), highlighting the need to preserve indigenous artisan livelihoods and cultural heritage.'
        ]
      }
    ],
    examTraps: [
      'Steps in Pottery Making: Misordering the sequential stages: Kneading clay -> Centering on wheel -> Shaping -> Shade drying -> Kiln firing.',
      'Metaphorical Meaning of Kiln Firing: Overlooking the symbolic correlation between kiln trials and human resilience.',
      'Ecological Significance: Omitting the modern environmental relevance of earthen clay versus synthetic industrial goods.'
    ],
    quickMentalCheck: 'State the four natural elements integrated in traditional pottery (Earth, Water, Air, Fire).',
    cueQuestions: [
      'Describe the process of centering and shaping clay on a potter\'s wheel.',
      'Why is kiln firing the most critical and hazardous phase of pot making?',
      'How does traditional pottery promote environmental sustainability compared to modern plastics?'
    ],
    workedExample: {
      problem: 'Explain the symbolic and philosophical depth embedded in the art of the pot maker.',
      steps: [
        'Step 1: The potter\'s wheel symbolizes the cosmic rhythm of creation and continuous life cycles.',
        'Step 2: The soft clay yielding to gentle palm pressure teaches adaptability, humility, and mindful focus.',
        'Step 3: The baked pot returning to earth when broken illustrates impermanence and ecological harmony.'
      ],
      result: 'The craft transcends utility to become a spiritual meditation on human creation and ecological stewardship.'
    },
    verificationProblem: 'Verify how traditional Indian artisan crafts maintain cultural identity and sustainable green living in modern economies.',
    realWorldUse: 'Applied in ethnographic studies, sustainable product design, terracotta crafts, and rural artisan economics.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 30. WINDS OF CHANGE (Class 9 English Kaveri Chapter 3)
  // =========================================================================
  'WINDS OF CHANGE': {
    chapterTitle: 'Winds of Change',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 3,
    essentialLaw: '$\\text{Social Transformation: } \\text{Individual Conviction} \\times \\text{Collective Action} \\Longrightarrow \\text{Eradication of Inequity}$',
    coreConcepts: [
      {
        heading: 'Confronting Outdated Traditions & Social Injustice',
        bullets: [
          'Examines the catalysts of social reform when courageous individuals question entrenched customs, gender discrimination, and economic inequality.',
          'Focuses on the friction between orthodox generational hierarchies and progressive youth advocating for equal educational access, civic participation, and social justice.',
          'Illustrates that meaningful cultural progress begins with a single dissenting voice refusing to accept systemic prejudice.'
        ]
      },
      {
        heading: 'The Power of Community Mobilization',
        bullets: [
          'Demonstrates how grassroots community dialogues, youth clubs, and shared social projects build solidarity across caste, gender, and economic divisions.',
          'Highlights non-violent persuasion, empathy, and collective problem-solving as the most effective tools to dismantle social barriers without violence.'
        ]
      },
      {
        heading: 'Institutional Transformation & Lasting Legacy',
        bullets: [
          'Traces how informal local initiatives evolve into institutional protections, community libraries, clean sanitation drives, and school enrollment campaigns.',
          'Underscores that the "winds of change" require persistent dedication, resilient optimism, and shared responsibility to sustain social progress.'
        ]
      }
    ],
    examTraps: [
      'Individual vs Collective Agency: Forgetting that individual courage is the initial spark, but sustainable reform requires collective community participation.',
      'Method of Social Reform: Mistaking violent confrontation for the principled, empathetic dialogue portrayed in the chapter.',
      'Thematic Focus: Answering with generic historical points instead of text-specific social reform mechanisms.'
    ],
    quickMentalCheck: 'State the primary catalyst for community change depicted in "Winds of Change".',
    cueQuestions: [
      'What social barriers and orthodox practices are challenged in "Winds of Change"?',
      'How does youth participation accelerate democratic and educational reforms in local communities?',
      'What strategies are employed to persuade conservative village elders to support progressive reforms?'
    ],
    workedExample: {
      problem: 'Analyze the dynamics of generational dialogue and social reform in "Winds of Change".',
      steps: [
        'Step 1: Identifies the initial resistance from traditional community gatekeepers clinging to status quo.',
        'Step 2: Highlights the constructive, respectful approach of youth leaders using evidence and tangible benefits (literacy, health).',
        'Step 3: Shows the gradual shift in community mindset resulting in inclusive shared growth.'
      ],
      result: 'The text provides an inspiring model for peaceful civic engagement and social development.'
    },
    verificationProblem: 'Verify how progressive social movements balance respect for cultural heritage with the urgent necessity of reform.',
    realWorldUse: 'Applied in community organizing, public policy reform, youth leadership development, and civic sociology.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 31. VITAMIN-M (Class 9 English Kaveri Chapter 4)
  // =========================================================================
  'VITAMIN-M': {
    chapterTitle: 'Vitamin-M',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 4,
    essentialLaw: '$\\text{Financial Wisdom: } \\text{Needs vs Wants} \\quad | \\quad \\text{Savings} = \\text{Income} - \\text{Expenditure} \\quad | \\quad \\text{Ethical Wealth Stewardship}$',
    coreConcepts: [
      {
        heading: 'Decoding "Vitamin-M": Money & Financial Consciousness',
        bullets: [
          '"Vitamin-M" uses a witty, relatable biochemical metaphor to discuss "Money"—an indispensable life resource that requires discipline, understanding, and ethical balance.',
          'Addresses adolescent financial psychology: distinguishing between genuine physiological/academic "Needs" and impulsive, prestige-driven consumerist "Wants".',
          'Exposes the psychological traps of peer pressure, conspicuous consumption, and instant gratification fueled by modern digital advertisements.'
        ]
      },
      {
        heading: 'Budgeting Fundamentals & The Power of Compounding',
        bullets: [
          'Introduces structured personal budgeting: tracking income/allowance, prioritizing essential expenses, establishing an emergency fund, and saving regularly.',
          'Explains the principle of delayed gratification: saving small amounts consistently allows money to grow through compound interest over time.',
          'Warns against the perils of impulsive debt, borrowing beyond means, and falling into credit traps.'
        ]
      },
      {
        heading: 'Wealth, Ethics, and True Happiness',
        bullets: [
          'Concludes that while money (Vitamin-M) is essential for livelihood, security, and healthcare, it cannot buy genuine friendships, integrity, peace of mind, or moral character.',
          'Advocates for philanthropic sharing, ethical earning, and financial prudence as pillars of a balanced, fulfilling human life.'
        ]
      }
    ],
    examTraps: [
      'The Metaphor of "Vitamin-M": Mistaking Vitamin-M for a real biological vitamin (it is an imaginative metaphor for Money / Financial Literacy).',
      'Needs vs Wants Distinction: Confusing basic necessities (food, shelter, books) with discretionary lifestyle desires (designer gadgets, luxury fashion).',
      'Balanced View on Money: Claiming money is either the sole goal of life or completely evil, instead of presenting it as a practical tool requiring ethical stewardship.'
    ],
    quickMentalCheck: 'Define the difference between "Needs" and "Wants" with two examples from "Vitamin-M".',
    cueQuestions: [
      'What does the term "Vitamin-M" signify in the context of adolescent development and financial literacy?',
      'How does peer pressure contribute to impulsive consumer spending among teenagers?',
      'Why is delayed gratification considered the foundation of sound personal financial management?'
    ],
    workedExample: {
      problem: 'Explain the core principles of personal financial discipline outlined in "Vitamin-M".',
      steps: [
        'Step 1: Categorize all incoming funds and differentiate mandatory needs from non-essential wants.',
        'Step 2: Commit a fixed percentage (e.g. 20%) to savings before allocating discretionary expenditure.',
        'Step 3: Practice mindful consumption to avoid debt traps and build long-term economic independence.'
      ],
      result: 'The chapter equips young learners with practical financial literacy and ethical consumer habits.'
    },
    verificationProblem: 'Verify how financial literacy education in school curricula promotes economic security and responsible citizenship.',
    realWorldUse: 'Applied in adolescent financial literacy, personal budgeting, behavioral economics, and consumer psychology.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 32. THE WORLD OF LIMITLESS POSSIBILITIES (Class 9 English Kaveri Chapter 5)
  // =========================================================================
  'THE WORLD OF LIMITLESS POSSIBILITIES': {
    chapterTitle: 'The World of Limitless Possibilities',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 5,
    essentialLaw: '$\\text{Inclusive Innovation: } \\text{Curiosity} + \\text{Assistive Technology} \\Longrightarrow \\text{Unbounded Human Potential}$',
    coreConcepts: [
      {
        heading: 'Scientific Curiosity & Unbounded Horizons',
        bullets: [
          'Celebrates human curiosity as the engine of scientific discovery, space exploration, and technological breakthrough.',
          'Highlights how questioning existing dogmas and exploring uncharted frontiers transforms human civilization from the deep ocean floor to outer space.',
          'Encourages youth to develop an inquiry-driven scientific temper and creative problem-solving mindset.'
        ]
      },
      {
        heading: 'Assistive Technology & Overcoming Physical Barriers',
        bullets: [
          'Examines how cutting-edge assistive innovations (screen readers, bionic prosthetics, brain-computer interfaces, AI speech tools) empower differently-abled individuals to achieve extraordinary feats in science, arts, and leadership.',
          'Reframes disability from a personal deficit to a societal design challenge, demonstrating that inclusive environments unleash limitless human capability.'
        ]
      },
      {
        heading: 'Ethical Responsibility in Technological Advance',
        bullets: [
          'Emphasizes that technological power must be guided by humanistic empathy, ethical safeguards, and universal access.',
          'Inspires students to harness science and innovation to solve global challenges: climate change, clean energy, food security, and universal education.'
        ]
      }
    ],
    examTraps: [
      'Technological Determinism vs Human Agency: Forgetting that technology is a tool whose value depends entirely on human ethics and inclusive purpose.',
      'Reframing Disability: Failing to note how assistive technology transforms societal inclusion and equality.',
      'Scientific Temper Focus: Writing generic essays on gadgets rather than emphasizing inquiry, grit, and innovation.'
    ],
    quickMentalCheck: 'State how assistive technology bridges physical limitations to create "limitless possibilities".',
    cueQuestions: [
      'How does scientific curiosity drive breakthroughs in human history?',
      'What role does assistive technology play in empowering differently-abled individuals?',
      'Why must technological innovation be coupled with ethical responsibility and social empathy?'
    ],
    workedExample: {
      problem: 'Analyze how "The World of Limitless Possibilities" inspires youth toward scientific inquiry and inclusive design.',
      steps: [
        'Step 1: Establishes curiosity and relentless questioning as the foundation of all scientific breakthroughs.',
        'Step 2: Showcases real-world examples of assistive technology unlocking human potential across diverse domains.',
        'Step 3: Calls upon the rising generation to develop ethical, sustainable solutions for global human welfare.'
      ],
      result: 'The text provides an inspiring vision of human resilience, scientific temper, and universal inclusion.'
    },
    verificationProblem: 'Verify how inclusive design principles ensure that emerging technologies benefit all segments of society equally.',
    realWorldUse: 'Applied in STEM education, biomedical engineering, assistive technology development, and ethics of AI.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 33. TWIN MELODIES (Class 9 English Kaveri Chapter 6)
  // =========================================================================
  'TWIN MELODIES': {
    chapterTitle: 'Twin Melodies',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 6,
    essentialLaw: '$\\text{Harmonic Synthesis: } \\text{Classical Tradition (Raga/Tala)} + \\text{Contemporary Innovation} \\Longrightarrow \\text{Universal Musical Resonance}$',
    coreConcepts: [
      {
        heading: 'The Two Musical Traditions: Hindustani & Carnatic',
        bullets: [
          'Explores the rich duality and shared spiritual origins of India\'s two great classical music traditions: Northern Hindustani and Southern Carnatic systems.',
          'Hindustani music emphasizes meditative improvisation, slow exposition (*Alap*), and Persian/Central Asian stylistic syncretism across Gharanas.',
          'Carnatic music emphasizes structured compositional precision (*Kritis*), devotion (*Bhakti*), and intricate mathematical rhythmic cycles (*Talas*) popularized by the Trinity (Tyagaraja, Muthuswami Dikshitar, Syama Sastri).'
        ]
      },
      {
        heading: 'Musical Synthesis & Global Fusion',
        bullets: [
          'Depicts the harmony when two seemingly distinct musical streams converge in duets (*Jugalbandi*) and contemporary global fusion.',
          'Instruments like the Sitar, Veena, Sarod, Mridangam, Tabla, and Violin engage in musical dialogue, proving that differing styles enhance rather than diminish each other.'
        ]
      },
      {
        heading: 'Music as a Universal Language of Peace',
        bullets: [
          'Celebrates melody as a transcendent bridge overcoming linguistic, geographic, and cultural boundaries.',
          'Teaches students to cultivate active listening, cultural appreciation, and open-mindedness toward diverse artistic traditions.'
        ]
      }
    ],
    examTraps: [
      'Hindustani vs Carnatic Distinctions: Confusing Hindustani emphasis on improvisation (*Alap*) with Carnatic focus on structured compositions (*Kritis*).',
      'The Concept of Jugalbandi: Forgetting that Jugalbandi is a collaborative musical dialogue between two artists, not an antagonistic duel.',
      'Instrument Classification: Misidentifying traditional instruments (e.g. Mridangam in Carnatic vs Tabla in Hindustani).'
    ],
    quickMentalCheck: 'Distinguish between the primary stylistic features of Hindustani and Carnatic classical music.',
    cueQuestions: [
      'What are the defining characteristics of Hindustani classical music compared to Carnatic classical music?',
      'How does a musical Jugalbandi illustrate harmony between distinct stylistic traditions?',
      'Why is music described as a universal language that transcends political and linguistic barriers?'
    ],
    workedExample: {
      problem: 'Explain how "Twin Melodies" uses musical harmony as an analogy for cultural pluralism and peaceful coexistence.',
      steps: [
        'Step 1: Presents two ancient musical traditions with distinct structures but identical fundamental octave notes (*Saptak*).',
        'Step 2: Shows how collaborative performance creates a richer, more profound aesthetic experience than solitary rigid execution.',
        'Step 3: Extends this musical synthesis to human society, demonstrating that unity in diversity enriches national culture.'
      ],
      result: 'The text uses musical theory to illuminate the beauty of cultural diversity and collaborative harmony.'
    },
    verificationProblem: 'Verify how Indian classical music incorporates mathematical rhythm and emotional expression to achieve meditative balance.',
    realWorldUse: 'Applied in musicology, cultural diplomacy, performing arts education, and cross-cultural music therapy.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 34. CARRIER OF WORDS (Class 9 English Kaveri Chapter 7)
  // =========================================================================
  'CARRIER OF WORDS': {
    chapterTitle: 'Carrier of Words',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 7,
    essentialLaw: '$\\text{Communication Arc: } \\text{Postal Courier} \\longrightarrow \\text{Epistolary Craft} \\longrightarrow \\text{Digital Speed} \\quad | \\quad \\text{Sincerity of Message}$',
    coreConcepts: [
      {
        heading: 'The Evolution of Human Communication',
        bullets: [
          'Traces the historical trajectory of messaging across centuries: smoke signals, runner couriers (*harkaras*), carrier pigeons, royal horseback messengers, and the establishment of the postal network.',
          'Highlights the grueling dedication of rural mail runners who braved dense forests, wild animals, bandits, and harsh blizzards to deliver letters carrying news of birth, marriage, war, and livelihood to remote mountain hamlets.'
        ]
      },
      {
        heading: 'The Intimacy of the Handwritten Letter',
        bullets: [
          'Contrasts the emotional depth, tangible warmth, and thoughtful deliberation of ink-on-paper letters with the instant, ephemeral nature of modern digital text messages.',
          'Handwritten letters preserved the personality, handwriting quirks, tear stains, and lingering perfume of the sender, acting as cherished historical keepsakes passed down through generations.'
        ]
      },
      {
        heading: 'Digital Revolution & The Core Invariant of Sincerity',
        bullets: [
          'Acknowledges the undeniable speed and accessibility of email, smartphones, and satellite communication in connecting families worldwide instantly.',
          'Reminds readers that while transmission speed has increased infinitely, the true value of communication resides in genuine empathy, clarity of thought, and authentic human connection.'
        ]
      }
    ],
    examTraps: [
      'The Role of Harkaras: Forgetting that traditional postal runners (*harkaras*) carried bells on spears to ward off wild beasts and warn villagers of their approach.',
      'Speed vs Emotional Depth: Oversimplifying modern messaging as purely negative; text balances technological utility with the irreplaceable warmth of letters.',
      'Evolutionary Milestones: Misordering communication eras from oral runners to telegraph to digital networks.'
    ],
    quickMentalCheck: 'Contrast the emotional experience of receiving a handwritten letter with receiving an instant digital text message.',
    cueQuestions: [
      'What perils and hardships were faced by traditional postal runners (*harkaras*) in delivering mail?',
      'Why do handwritten letters hold a unique emotional and historical value compared to digital communications?',
      'How has the digital telecommunications revolution reshaped interpersonal relationships and global connectivity?'
    ],
    workedExample: {
      problem: 'Analyze how "Carrier of Words" examines the transformation of human expression across technological epochs.',
      steps: [
        'Step 1: Details the historical sacrifice of early mail couriers who treated message delivery as a sacred duty.',
        'Step 2: Analyzes the epistolary form as a medium of contemplation, emotional vulnerability, and permanent memory.',
        'Step 3: Concludes that regardless of technology, the human desire to connect and be understood remains the invariant core.'
      ],
      result: 'The chapter provides a historical and philosophical perspective on the power of the written and transmitted word.'
    },
    verificationProblem: 'Verify how communication technologies mirror the socio-economic development and organizational capacity of human societies.',
    realWorldUse: 'Applied in postal history, communications theory, media studies, epistolary literature, and telecommunications development.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 35. FOLLOW THAT DREAM (Class 9 English Kaveri Chapter 8)
  // =========================================================================
  'FOLLOW THAT DREAM': {
    chapterTitle: 'Follow That Dream',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 8,
    essentialLaw: '$\\text{Aspirational Achievement: } \\text{Clear Vision} + \\text{Resilient Grit} \\times \\text{Disciplined Effort} \\Longrightarrow \\text{Actualized Potential}$',
    coreConcepts: [
      {
        heading: 'Daring to Dream & Navigating Skepticism',
        bullets: [
          'Examines the courage required to define an ambitious life dream and remain steadfast when confronted with cynicism, self-doubt, and societal discouragement.',
          'Emphasizes that monumental achievements—in science, arts, sports, entrepreneurship, and social reform—began as fragile dreams nurtured with unyielding faith.',
          'Teaches youth to view failures not as definitive dead-ends, but as indispensable stepping stones that forge mental toughness.'
        ]
      },
      {
        heading: 'The Anatomy of Grit & Deliberate Practice',
        bullets: [
          'Debunks the myth of "overnight success", showing that talent without relentless work ethic and daily discipline yields no lasting achievement.',
          'Introduces the concept of deliberate practice: setting micro-goals, seeking constructive feedback from mentors, learning from errors, and persisting through grueling plateaus.'
        ]
      },
      {
        heading: 'Mentorship, Purpose, and Giving Back',
        bullets: [
          'Highlights the pivotal role of supportive teachers, parents, and mentors who guide and uplift aspiring dreamers during times of hardship.',
          'Concludes that the ultimate fulfillment of achieving a dream lies not in selfish glory, but in utilizing one\'s success to uplift others and inspire the next generation.'
        ]
      }
    ],
    examTraps: [
      'Grit vs Mere Wishful Thinking: Forgetting that a dream without structured daily discipline remains an idle fantasy.',
      'The Role of Failure: Viewing setbacks as permanent disqualifications rather than feedback for strategic adjustment.',
      'Mentorship Value: Omitting the importance of guidance, coach feedback, and ethical purpose in long-term success.'
    ],
    quickMentalCheck: 'State the difference between idle daydreaming and actionable goal pursuit described in "Follow That Dream".',
    cueQuestions: [
      'What obstacles typically challenge young dreamers when pursuing unconventional career or life aspirations?',
      'How does deliberate daily practice transform natural talent into world-class mastery?',
      'Why is mentorship and purpose-driven service essential to the long-term fulfillment of personal success?'
    ],
    workedExample: {
      problem: 'Analyze the psychological framework of resilience and goal achievement in "Follow That Dream".',
      steps: [
        'Step 1: Cultivate a vivid, value-aligned vision of the desired future state.',
        'Step 2: Deconstruct the long-term goal into measurable daily habits and deliberate practice routines.',
        'Step 3: Develop emotional resilience to overcome inevitable setbacks and channel success into societal contribution.'
      ],
      result: 'The chapter serves as a motivational roadmap empowering students to actualize their highest potential.'
    },
    verificationProblem: 'Verify how positive psychology and growth mindset research corroborate the principles outlined in "Follow That Dream".',
    realWorldUse: 'Applied in life skills coaching, youth sports psychology, career guidance, entrepreneurial education, and mentorship programs.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 36. A TRULY BEAUTIFUL MIND (Class 9 English Beehive Chapter 4)
  // =========================================================================
  'A TRULY BEAUTIFUL MIND': {
    chapterTitle: 'A Truly Beautiful Mind',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 4,
    essentialLaw: '$\\text{Humanitarian Science: } E = mc^2 \\quad | \\quad \\text{Scientific Genius} + \\text{Global Pacifism} \\Longrightarrow \\text{A Truly Beautiful Mind}$',
    coreConcepts: [
      {
        heading: 'Einstein\'s Childhood & Rebellious Early Genius',
        bullets: [
          'Born on March 14, 1879 in Ulm, Germany, Albert Einstein was a late talker whose head was unusually large; his headmaster declared he would never succeed at anything.',
          'Hated the rigid regimentation of German schooling in Munich; loved violin playing and mathematical physics.',
          'Moved to liberal Switzerland to study at Zurich Polytechnic, where he fell in love with fellow physics student Mileva Marić.'
        ]
      },
      {
        heading: 'The Miracle Year 1905 & General Theory of Relativity',
        bullets: [
          'While working as a technical expert in the Bern patent office (which he jokingly called his "department of theoretical physics"), Einstein published his groundbreaking 1905 papers on the Photoelectric Effect, Brownian Motion, and the Special Theory of Relativity ($E = mc^2$).',
          'In 1915, he published his General Theory of Relativity; the 1919 solar eclipse confirmed that gravity bends starlight, prompting newspapers to proclaim "A Revolution in Science."',
          'Awarded the Nobel Prize in Physics in 1921 for his contribution to theoretical physics.'
        ]
      },
      {
        heading: 'Nazism, The Atomic Bomb & The Vision for World Peace',
        bullets: [
          'Emigrated to the USA in 1933 when the Nazis came to power in Germany.',
          'In 1939, warned US President Franklin D. Roosevelt about Nazi atomic bomb potential: "A single bomb of this type... might very well destroy the whole port together with some of the surrounding territory."',
          'Deeply devastated by the atomic bombings of Hiroshima and Nagasaki in 1945, Einstein wrote a public missive to the United Nations proposing a world government to ensure peace, spending his final years campaigning for nuclear disarmament and universal brotherhood.'
        ]
      }
    ],
    examTraps: [
      'Einstein\'s Motivation for Writing to Roosevelt: Forgetting that he wrote to warn about the threat of Nazi Germany developing an atomic bomb, not to encourage America to drop bombs on Japan.',
      'Meaning of the Title "A Truly Beautiful Mind": Overlooking that "beautiful mind" refers not merely to his scientific intelligence ($E=mc^2$), but to his profound humanitarian crusade for world peace.',
      'Nobel Prize Misconception: Stating he received the Nobel Prize for the Theory of Relativity (he received it in 1921 primarily for the photoelectric effect and services to theoretical physics).'
    ],
    quickMentalCheck: 'Explain why the biographical chapter on Albert Einstein is titled "A Truly Beautiful Mind".',
    cueQuestions: [
      'What were the key indicators in Einstein\'s early life that contradicted his headmaster\'s negative predictions?',
      'What was the significance of the 1919 solar eclipse in validating Einstein\'s General Theory of Relativity?',
      'How did Einstein react to the atomic destruction of Hiroshima and Nagasaki, and what did he advocate in his later years?'
    ],
    workedExample: {
      problem: 'Analyze how the chapter portrays Einstein as both a revolutionary scientist and a passionate global citizen.',
      steps: [
        'Step 1: Highlights his intellectual rebellion against mechanical schooling, leading to the revolution of modern physics ($E=mc^2$).',
        'Step 2: Depicts his moral agony over the militaristic weaponization of nuclear energy.',
        'Step 3: Shows his tireless post-war crusade for international peace, human rights, and global governance.'
      ],
      result: 'The text demonstrates that supreme scientific intellect reaches true greatness only when guided by global human empathy.'
    },
    verificationProblem: 'Verify how Einstein\'s pacifist philosophy and opposition to nationalism remain vital in contemporary international relations.',
    realWorldUse: 'Applied in history of science, nuclear non-proliferation advocacy, scientific ethics, and peace studies.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 37. REACH FOR THE TOP (Class 9 English Beehive Chapter 7)
  // =========================================================================
  'REACH FOR THE TOP': {
    chapterTitle: 'Reach for the Top',
    subject: 'ENGLISH',
    grade: 9,
    chapterNum: 7,
    essentialLaw: '$\\text{Indomitable Grit: } \\text{Overcoming Patriarchal / Geographic Constraints} \\Longrightarrow \\text{Peak World Excellence}$',
    coreConcepts: [
      {
        heading: 'Part I: Santosh Yadav — The Mountaineering Trailblazer',
        bullets: [
          'Born in a conservative, patriarchal village of Joniyawas in Rewari district, Haryana, Santosh Yadav refused traditional early marriage and insisted on pursuing higher education in Delhi and Maharani College, Jaipur.',
          'Looking out from her hostel room at the Aravalli Hills, she joined the Uttarkashi Nehru Institute of Mountaineering, demonstrating extraordinary physical endurance, resistance to cold, and iron willpower.',
          'In May 1992, at age 20, she became the youngest woman in the world to scale Mount Everest, scaling it a second time within twelve months as part of an Indo-Nepalese Women\'s Expedition.',
          'Demonstrated deep environmental responsibility by collecting and bringing down 500 kilograms of garbage from the Himalayas, and saved fellow climber Mohan Singh by sharing her oxygen cylinder.'
        ]
      },
      {
        heading: 'Part II: Maria Sharapova — Siberian Tenacity to Wimbledon',
        bullets: [
          'Born in Siberia, Russia, nine-year-old Maria Sharapova was brought to Florida, USA by her father Yuri to train at Nick Bollettieri tennis academy, enduring painful two-year separation from her mother Yelena due to visa restrictions.',
          'Endured bullying and humiliation from older roommates at the academy, using adversity to fuel her fierce mental toughness and competitive hunger.',
          'On Monday, July 5, 2004, at age 17, Sharapova defeated Serena Williams to win the Wimbledon Women\'s Singles crown, ascending to World No. 1 ranking in 2005.',
          'Proudly celebrated her Russian heritage, stating: "I am Russian. It is true that in the US I have a large part of my life. But I have Russian citizenship... and if Russia wants me to play in the Olympics, I will."'
        ]
      },
      {
        heading: 'Comparative Synthesis of Grit',
        bullets: [
          'Both Santosh Yadav and Maria Sharapova demonstrate that reaching the global pinnacle requires iron discipline, unyielding self-belief, and willingness to make immense personal sacrifices.'
        ]
      }
    ],
    examTraps: [
      'Santosh Yadav\'s Ecological Contribution: Forgetting that she brought down 500 kg of garbage from Mount Everest during her expeditions.',
      'Maria Sharapova\'s Childhood Sacrifice: Confusing which parent accompanied her to the US (her father Yuri went with her; her mother Yelena was separated for 2 years).',
      'Santosh\'s Life-Saving Act: Overlooking that she saved fellow mountaineer Mohan Singh by sharing her own oxygen, though she could not save another dying climber.'
    ],
    quickMentalCheck: 'State the unique mountaineering records held by Santosh Yadav and the tennis milestone achieved by Maria Sharapova.',
    cueQuestions: [
      'How did Santosh Yadav challenge patriarchal traditions in Haryana to pursue mountaineering?',
      'Describe the sacrifices and hardships endured by Maria Sharapova during her early tennis training in Florida.',
      'What common personality traits enabled both Santosh Yadav and Maria Sharapova to reach the top of their fields?'
    ],
    workedExample: {
      problem: 'Compare the determination of Santosh Yadav and Maria Sharapova in overcoming societal and personal barriers.',
      steps: [
        'Step 1: Santosh overcame conservative rural gender expectations and harsh alpine conditions through self-reliance.',
        'Step 2: Maria overcame linguistic isolation, family separation, and senior bullying through unshakeable mental toughness.',
        'Step 3: Both channeled adversity into singular excellence, achieving World No. 1 status while remaining proud of their national identities.'
      ],
      result: 'The biographical dual-narrative provides an inspiring masterclass in grit, resilience, and female empowerment.'
    },
    verificationProblem: 'Verify how early discipline, emotional resilience, and family sacrifice underpin elite global achievement in sports.',
    realWorldUse: 'Applied in athletic coaching, sports psychology, female leadership empowerment, and biographical motivation.',
    diagramType: 'visual_model_pending'
  },

  // =========================================================================
  // 38. INTRODUCTION TO EUCLID'S GEOMETRY (Class 9 Mathematics Chapter 5)
  // =========================================================================
  'INTRODUCTION TO EUCLID\'S GEOMETRY': {
    chapterTitle: 'Introduction to Euclid\'s Geometry',
    subject: 'MATHEMATICS',
    grade: 9,
    chapterNum: 5,
    essentialLaw: '$\\text{Euclid\'s 5th Postulate: } \\angle 1 + \\angle 2 < 180^\\circ \\implies \\text{Lines Intersect} \\quad | \\quad \\text{Playfair\'s Axiom: Exactly 1 Parallel Line}$',
    coreConcepts: [
      {
        heading: 'Euclid\'s Axioms (Common Notions)',
        bullets: [
          'Axiom 1: Things which are equal to the same thing are equal to one another ($a = b \\text{ and } c = b \\implies a = c$).',
          'Axiom 2: If equals are added to equals, the wholes are equal ($a = b \\implies a + c = b + c$).',
          'Axiom 3: If equals are subtracted from equals, the remainders are equal ($a = b \\implies a - c = b - c$).',
          'Axiom 4: Things which coincide with one another are equal to one another (Principle of Superposition).',
          'Axiom 5: The whole is greater than the part ($a > b \\text{ if } a = b + c \\text{ with } c > 0$).',
          'Axiom 6 & 7: Things which are double (or halves) of the same things are equal to one another.'
        ]
      },
      {
        heading: 'Euclid\'s 5 Postulates for Planar Geometry',
        bullets: [
          'Postulate 1: A straight line segment may be drawn from any given point to any other point.',
          'Postulate 2: A terminated line (line segment) can be produced indefinitely into a continuous straight line.',
          'Postulate 3: A circle can be drawn with any center and any radius.',
          'Postulate 4: All right angles are equal to one another ($90^\\circ = 90^\\circ$).',
          'Postulate 5 (Parallel Postulate): If a transversal falls on two straight lines making interior angles on the same side sum to less than $180^\\circ$ (two right angles), the two lines, if produced indefinitely, will intersect on that side.'
        ]
      },
      {
        heading: 'Equivalent Versions of the Fifth Postulate',
        bullets: [
          'Playfair\'s Axiom: For every straight line $l$ and for every point $P$ not lying on $l$, there exists one and only one line $m$ passing through $P$ and parallel to $l$.',
          'Two distinct intersecting lines cannot both be parallel to the same given straight line.',
          'Undefined terms in Euclidean Geometry: Point, Line, and Plane are taken as undefined geometric primitives to avoid circular reasoning.'
        ]
      }
    ],
    examTraps: [
      'Axioms vs Postulates Distinction: Confusing axioms (universal mathematical assumptions applicable across algebra and arithmetic) with postulates (assumptions specific to geometry).',
      'Misinterpreting Postulate 5: Assuming Postulate 5 states parallel lines never meet; it defines the exact angular condition (interior angle sum < 180°) where lines WILL meet.',
      'Circular Definitions: Attempting to define "point" or "line" with informal descriptions rather than treating them as undefined axiomatic primitives.'
    ],
    quickMentalCheck: 'If interior angles on one side of a transversal measure 110° and 65°, will the lines intersect on that side? (Answer: Yes, because 110° + 65° = 175° < 180°).',
    cueQuestions: [
      'State Euclid\'s 5 Postulates with precise mathematical wording.',
      'How does Playfair\'s Axiom serve as an equivalent version of Euclid\'s Fifth Postulate?',
      'Why are Point, Line, and Plane considered undefined terms in geometry?'
    ],
    workedExample: {
      problem: 'Prove that if a point C lies between two points A and B such that AC = BC, then AC = (1/2)AB.',
      steps: [
        'Step 1: We are given AC = BC.',
        'Step 2: Add AC to both sides (Euclid\'s Axiom 2: If equals are added to equals, wholes are equal): AC + AC = BC + AC.',
        'Step 3: 2AC = BC + AC. Since point C lies between A and B, BC + AC coincides with AB (Euclid\'s Axiom 4: Things which coincide are equal): 2AC = AB.',
        'Step 4: Dividing by 2 (Euclid\'s Axiom 7: Halves of equals are equal): AC = (1/2)AB.'
      ],
      result: 'Proven: AC = (1/2)AB using Euclid\'s Axioms 2, 4, and 7.'
    },
    verificationProblem: 'Verify why two distinct lines cannot have more than one point in common using proof by contradiction.',
    realWorldUse: 'Foundational logical deduction in legal reasoning, software formal verification, coordinate surveying, and non-Euclidean relativity theory.',
    diagramType: 'coordinate_grid'
  },

  // =========================================================================
  // 39. QUADRILATERALS (Class 9 Mathematics Chapter 8)
  // =========================================================================
  'QUADRILATERALS': {
    chapterTitle: 'Quadrilaterals',
    subject: 'MATHEMATICS',
    grade: 9,
    chapterNum: 8,
    essentialLaw: '$\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ \\quad | \\quad \\text{Midpoint Theorem: } EF \\parallel BC, \\; EF = \\frac{1}{2}BC$',
    coreConcepts: [
      {
        heading: 'Angle Sum Property & Classification of Quadrilaterals',
        bullets: [
          'The sum of all four interior angles of a quadrilateral is strictly $360^\\circ$ ($\n\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ$).',
          'Parallelogram: Both pairs of opposite sides are parallel and equal; opposite angles are equal; consecutive angles are supplementary ($180^\\circ$); diagonals bisect each other.',
          'Rhombus: A parallelogram with all 4 sides equal; diagonals bisect each other perpendicularly at $90^\\circ$ ($AC \\perp BD$).',
          'Rectangle: A parallelogram with all 4 right angles ($90^\\circ$); diagonals are equal in length ($AC = BD$).',
          'Square: Both a rhombus and a rectangle (4 equal sides, 4 right angles, equal perpendicular bisecting diagonals).',
          'Trapezium: A quadrilateral with exactly one pair of opposite sides parallel.'
        ]
      },
      {
        heading: 'Parallelogram Theorems',
        bullets: [
          'Theorem 8.1: A diagonal of a parallelogram divides it into two congruent triangles ($\\Delta ABC \\cong \\Delta CDA$).',
          'Theorem 8.2 & 8.3: In a parallelogram, opposite sides are equal, and conversely, a quadrilateral with equal opposite sides is a parallelogram.',
          'Theorem 8.4 & 8.5: Opposite angles are equal, and conversely, a quadrilateral with equal opposite angles is a parallelogram.',
          'Theorem 8.6 & 8.7: Diagonals of a parallelogram bisect each other, and conversely, if diagonals bisect each other, it is a parallelogram.',
          'Theorem 8.8: A quadrilateral is a parallelogram if a pair of opposite sides is both equal and parallel ($AB \\parallel CD \\text{ and } AB = CD$).'
        ]
      },
      {
        heading: 'The Midpoint Theorem & Its Converse',
        bullets: [
          'Midpoint Theorem: The line segment joining the midpoints of any two sides of a triangle is parallel to the third side and equal to half of it ($EF \\parallel BC$ and $EF = \\frac{1}{2}BC$).',
          'Converse of Midpoint Theorem: The line drawn through the midpoint of one side of a triangle, parallel to another side, bisects the third side.'
        ]
      }
    ],
    examTraps: [
      'Midpoint Theorem Application: Forgetting that the midpoint segment is both parallel AND equal to half the base ($EF = \\frac{1}{2}BC$).',
      'Parallelogram vs Trapezium: Confusing a trapezium (only 1 pair of parallel sides) with a parallelogram (2 pairs of parallel sides).',
      'Rhombus vs Rectangle Diagonal Properties: Assuming rhombus diagonals are equal (they are perpendicular, not equal) or rectangle diagonals are perpendicular (they are equal, not perpendicular).'
    ],
    quickMentalCheck: 'In ΔABC, if E and F are midpoints of AB and AC, and BC = 14 cm, find length of EF and its relation to BC. (Answer: EF = 7 cm and EF ∥ BC).',
    cueQuestions: [
      'State and prove the Midpoint Theorem for triangles.',
      'What is the necessary and sufficient condition for a quadrilateral to be a parallelogram involving just ONE pair of sides?',
      'Compare the diagonal properties of a Parallelogram, Rhombus, Rectangle, and Square.'
    ],
    workedExample: {
      problem: 'In ΔABC, D, E and F are respectively the mid-points of sides AB, BC and CA. Show that ΔABC is divided into four congruent triangles by joining D, E and F.',
      steps: [
        'Step 1: In ΔABC, D and F are midpoints of AB and AC. By Midpoint Theorem: DF ∥ BC and DF = (1/2)BC = BE = EC.',
        'Step 2: Since DF ∥ BE and DF = BE, quadrilateral DBEF is a parallelogram. Thus diagonal DE divides it into two congruent triangles: ΔDBE ≅ ΔFED.',
        'Step 3: Similarly, DFEC and ADFE are parallelograms, yielding ΔEFC ≅ ΔFED and ΔADF ≅ ΔFED.',
        'Step 4: All four triangles (ΔADF, ΔDBE, ΔEFC, ΔFED) are congruent to each other.'
      ],
      result: 'ΔABC is divided into four mutually congruent triangles by joining its side midpoints.'
    },
    verificationProblem: 'Verify that the quadrilateral formed by joining the midpoints of the sides of a quadrilateral, in order, is always a parallelogram.',
    realWorldUse: 'Truss bridge engineering, architectural floor framing, quadrilateral tessellation in graphic rendering, and robotic 4-bar kinematic linkages.',
    diagramType: 'coordinate_grid'
  },

  // =========================================================================
  // 40. SURFACE AREAS AND VOLUMES (Class 9 & 10 Mathematics Chapter 11 / 12)
  // =========================================================================
  'SURFACE AREAS AND VOLUMES': {
    chapterTitle: 'Surface Areas and Volumes',
    subject: 'MATHEMATICS',
    grade: 9,
    chapterNum: 11,
    essentialLaw: '$\\text{Cone: } \\text{CSA} = \\pi r l, \\; V = \\frac{1}{3}\\pi r^2 h \\quad | \\quad \\text{Sphere: } \\text{TSA} = 4\\pi r^2, \\; V = \\frac{4}{3}\\pi r^3 \\quad [l = \\sqrt{r^2 + h^2}]$',
    coreConcepts: [
      {
        heading: 'Surface Area & Volume of Right Circular Cone',
        bullets: [
          'Slant Height Relation: $l = \\sqrt{r^2 + h^2}$, where $r$ is base radius and $h$ is vertical height.',
          'Curved Surface Area (CSA): $\\text{CSA} = \\pi r l$.',
          'Total Surface Area (TSA): $\\text{TSA} = \\pi r l + \\pi r^2 = \\pi r(l + r)$.',
          'Volume of Cone: $V = \\frac{1}{3}\\pi r^2 h$ (strictly one-third the volume of a cylinder with identical base and height).'
        ]
      },
      {
        heading: 'Surface Area & Volume of Sphere and Hemisphere',
        bullets: [
          'Solid Sphere: Surface Area $\\text{SA} = 4\\pi r^2$; Volume $V = \\frac{4}{3}\\pi r^3$.',
          'Solid Hemisphere: Curved Surface Area $\\text{CSA} = 2\\pi r^2$; Total Surface Area $\\text{TSA} = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2$; Volume $V = \\frac{2}{3}\\pi r^3$.',
          'Hollow Spherical Shell: Volume of material $= \\frac{4}{3}\\pi(R^3 - r^3)$.'
        ]
      },
      {
        heading: 'Cubes, Cuboids and Right Cylinders',
        bullets: [
          'Cuboid: $\\text{TSA} = 2(lb + bh + hl)$; Lateral Surface Area $\\text{LSA} = 2h(l + b)$; Volume $V = lbh$; Diagonal $= \\sqrt{l^2 + b^2 + h^2}$.',
          'Cube (side $a$): $\\text{TSA} = 6a^2$; $\\text{LSA} = 4a^2$; Volume $V = a^3$; Diagonal $= a\\sqrt{3}$.',
          'Right Circular Cylinder: $\\text{CSA} = 2\\pi rh$; $\\text{TSA} = 2\\pi r(r + h)$; Volume $V = \\pi r^2 h$.'
        ]
      }
    ],
    examTraps: [
      'Slant Height vs Vertical Height: Substituting vertical height $h$ instead of slant height $l = \\sqrt{r^2 + h^2}$ in cone CSA formula ($\\pi r l$).',
      'Solid Hemisphere TSA vs CSA: Using $2\\pi r^2$ instead of $3\\pi r^2$ for a solid hemisphere total surface area (forgetting the flat circular base $\\pi r^2$).',
      'Unit Conversion Errors: Mixing cm and m, or confusing area units ($\\text{cm}^2, \\text{m}^2$) with volume units ($\\text{cm}^3, \\text{m}^3$), and remembering $1 \\text{ m}^3 = 1000 \\text{ liters}$ and $1 \\text{ liter} = 1000 \\text{ cm}^3$.'
    ],
    quickMentalCheck: 'Calculate the Curved Surface Area of a cone with radius 7 cm and slant height 10 cm using π = 22/7. (Answer: πrl = (22/7) × 7 × 10 = 220 cm²).',
    cueQuestions: [
      'Derive the relationship between slant height, radius, and vertical height of a right circular cone.',
      'Why is the total surface area of a solid hemisphere 3πr² while its curved surface area is 2πr²?',
      'How many liters of water can a hemispherical bowl of radius 21 cm hold?'
    ],
    workedExample: {
      problem: 'Find the curved surface area and total surface area of a right circular cone whose height is 12 cm and base radius is 5 cm (use π = 3.14).',
      steps: [
        'Step 1: Calculate slant height: l = √(r² + h²) = √(5² + 12²) = √(25 + 144) = √169 = 13 cm.',
        'Step 2: Curved Surface Area (CSA) = πrl = 3.14 × 5 × 13 = 204.1 cm².',
        'Step 3: Total Surface Area (TSA) = πr(l + r) = 3.14 × 5 × (13 + 5) = 15.7 × 18 = 282.6 cm².'
      ],
      result: 'CSA = 204.1 cm² and TSA = 282.6 cm².'
    },
    verificationProblem: 'A hemispherical dome of a building needs to be painted. If the circumference of the base of the dome is 17.6 m, find the cost of painting it at ₹5 per 100 cm².',
    realWorldUse: 'Architecture and dome construction, silos and storage tanks, industrial packaging, fluid storage capacity, and aerospace nose-cone aerodynamic design.',
    diagramType: 'coordinate_grid'
  },

  // =========================================================================
  // 41. TRIANGLES (Class 9 Mathematics Chapter 7)
  // =========================================================================
  'TRIANGLES': {
    chapterTitle: 'Triangles',
    subject: 'MATHEMATICS',
    grade: 9,
    chapterNum: 7,
    essentialLaw: '$\\angle A + \\angle B + \\angle C = 180^\\circ \\quad | \\quad \\angle \\text{ext} = \\angle 1 + \\angle 2 \\quad | \\quad a + b > c$',
    coreConcepts: [
      {
        heading: 'Classification of Triangles',
        bullets: [
          'By Sides: Equilateral (all 3 sides equal), Isosceles (2 sides equal), Scalene (all 3 sides different).',
          'By Angles: Acute-angled (all angles $< 90^\\circ$), Right-angled (one angle $= 90^\\circ$), Obtuse-angled (one angle $> 90^\\circ$).'
        ]
      },
      {
        heading: 'Core Triangle Theorems & Congruence Criteria',
        bullets: [
          'Angle Sum Property: The three interior angles of a triangle always sum to $180^\\circ$ ($\\angle A + \\angle B + \\angle C = 180^\\circ$).',
          'Exterior Angle Theorem: An exterior angle of a triangle is equal to the sum of the two opposite interior angles ($\\angle \\text{ext} = \\angle 1 + \\angle 2$).',
          'Congruence Criteria: SSS (Side-Side-Side), SAS (Side-Angle-Side), ASA (Angle-Side-Angle), and RHS (Right angle-Hypotenuse-Side).',
          'Isosceles Triangle Theorems: Angles opposite to equal sides of an isosceles triangle are equal, and sides opposite to equal angles are equal.'
        ]
      },
      {
        heading: 'Area and Perimeter',
        bullets: [
          'Perimeter $= a + b + c$.',
          'Area $= \\frac{1}{2} \\times \\text{base} \\times \\text{perpendicular height}$.',
          'Triangle Inequality Theorem: The sum of the lengths of any two sides of a triangle must be strictly greater than the length of the third side ($a + b > c$).'
        ]
      }
    ],
    examTraps: [
      'Confusing Line Segment with Line or Ray: A line segment has two fixed endpoints and finite measurable length; a line has zero endpoints extending endlessly in both directions; a ray has one endpoint.',
      'Ruler Alignment Precision: Always align the zero mark (0 cm) of the ruler with the start endpoint, not the outer edge of the ruler.',
      'Geometric Notation Distinction: Distinguish between segment AB (path between endpoints), length AB (scalar measurement), line <->AB, and ray ->AB.'
    ],
    quickMentalCheck: 'Can a triangle have side lengths 3 cm, 4 cm, and 8 cm? (Answer: No, 3 + 4 = 7 < 8, violates triangle inequality).',
    cueQuestions: [
      'State the 4 valid congruence criteria for triangles (SSS, SAS, ASA, RHS).',
      'Explain why AAA (Angle-Angle-Angle) is NOT a valid congruence criterion.',
      'State the Triangle Inequality Theorem.'
    ],
    workedExample: {
      problem: 'In ΔABC, AB = AC and ∠A = 40°. Find ∠B and ∠C.',
      steps: [
        'Step 1: Since AB = AC, ∠B = ∠C (angles opposite to equal sides of an isosceles triangle are equal).',
        'Step 2: Apply Angle Sum Property: ∠A + ∠B + ∠C = 180° ➔ 40° + 2∠B = 180°.',
        'Step 3: Solve for ∠B: 2∠B = 140° ➔ ∠B = 70°, and ∠C = 70°.'
      ],
      result: '∠B = 70° and ∠C = 70°.'
    },
    verificationProblem: 'Verify whether a triangle can be formed with sides 6 cm, 8 cm, and 10 cm, and check if it is right-angled.',
    realWorldUse: 'Truss bridge construction, triangular mesh rendering in 3D gaming, GPS geolocation triangulation, and surveying.',
    diagramType: 'triangle'
  }
};

/**
 * Direct lookup function resolving a deterministic chapter knowledge entry.
 */
export function lookupDeterministicChapter(concept: {
  id?: string;
  chapter_id?: string;
  title?: string;
  chapter_title?: string;
  subjectId?: string;
  subject_id?: string;
  gradeLevel?: number | string;
  unit?: string;
}): DeterministicChapterKnowledge | null {
  // 1. Direct O(1) Chapter ID / Concept ID lookup in 536 Master Registry
  if (concept.chapter_id && CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[concept.chapter_id]) {
    return CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[concept.chapter_id];
  }
  if (concept.id && CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[concept.id]) {
    return CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[concept.id];
  }
  if (concept.id) {
    const derivedChId = concept.id.replace('CBSE-CONC-CBSE-', 'CBSE-').replace('CBSE-CONC-', '').replace(/-01$/, '');
    if (CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[derivedChId]) {
      return CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[derivedChId];
    }
    const cleanConcId = concept.id.replace('CBSE-CONC-', 'CBSE-CH-').replace(/-01$/, '');
    if (CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[cleanConcId]) {
      return CBSE_FULL_AUTHORITATIVE_KNOWLEDGE_MAP[cleanConcId];
    }
  }

  const { grade, chapterNum, subject, cleanTitle } = extractContextFromId(
    concept.id,
    concept.chapter_title || concept.title,
    concept.subjectId || concept.subject_id
  );

  // 2. Direct Title lookup in 536 Master Registry with grade & subject disambiguation
  const titleLookup = lookupFullAuthoritativeChapter(cleanTitle, grade, subject) ||
    lookupFullAuthoritativeChapter(concept.chapter_title || '', grade, subject) ||
    lookupFullAuthoritativeChapter(concept.title || '', grade, subject) ||
    lookupFullAuthoritativeChapter(cleanTitle);
  if (titleLookup) {
    return titleLookup;
  }

  const titleUpper = cleanTitle.toUpperCase();
  const idUpper = (concept.id || '').toUpperCase();
  const searchStr = `${titleUpper} ${idUpper} ${concept.chapter_title || ''} ${concept.unit || ''}`.toUpperCase();

  // 3. Direct match in DETERMINISTIC_SYLLABUS_MAP
  for (const [key, entry] of Object.entries(DETERMINISTIC_SYLLABUS_MAP)) {
    if (searchStr.includes(key) || key.includes(titleUpper)) {
      return entry;
    }
  }

  // 2. Specific matching rules
  if (
    searchStr.includes('BASIC CONCEPTS OF CHEMISTRY') ||
    searchStr.includes('SOME BASIC CONCEPTS') ||
    searchStr.includes('MOLE CONCEPT') ||
    searchStr.includes('KECH101') ||
    searchStr.includes('KECH1-CH01') ||
    searchStr.includes('G11-CHEM-CH01')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['SOME BASIC CONCEPTS OF CHEMISTRY'];
  }

  if (
    searchStr.includes('DEBENTURE') ||
    searchStr.includes('REDEMPTION OF DEBENTURE') ||
    searchStr.includes('LEAC1-CH06') ||
    searchStr.includes('LEAC106') ||
    searchStr.includes('G12-ACC-CH06')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['ISSUE AND REDEMPTION OF DEBENTURES'];
  }

  if (
    searchStr.includes('FRACTIONS AND DECIMALS') ||
    searchStr.includes('FRACTION AND DECIMAL') ||
    searchStr.includes('GEMH102') ||
    searchStr.includes('GEMH1-CH02') ||
    searchStr.includes('G7-MATH-CH02') ||
    searchStr.includes('G07-MATH-CH02')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['FRACTIONS AND DECIMALS'];
  }

  if (
    searchStr.includes('STRUCTURE OF ATOM') ||
    searchStr.includes('ATOMIC STRUCTURE') ||
    searchStr.includes('KECH102') ||
    searchStr.includes('KECH1-CH02') ||
    searchStr.includes('G11-CHEM-CH02')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['STRUCTURE OF ATOM'];
  }

  if (searchStr.includes('LIVING WORLD')) {
    return DETERMINISTIC_SYLLABUS_MAP['THE LIVING WORLD'];
  }
  if (searchStr.includes('MORPHOLOGY') && (searchStr.includes('FLOWER') || searchStr.includes('PLANT'))) {
    return DETERMINISTIC_SYLLABUS_MAP['MORPHOLOGY OF FLOWERING PLANTS'];
  }
  if (searchStr.includes('RELATIONS AND FUNCTIONS') || (searchStr.includes('RELATION') && searchStr.includes('FUNCTION'))) {
    return DETERMINISTIC_SYLLABUS_MAP['RELATIONS AND FUNCTIONS'];
  }
  if (searchStr.includes('SETS') || searchStr.includes('-SETS') || titleUpper === 'SETS' || titleUpper.startsWith('SET ')) {
    return DETERMINISTIC_SYLLABUS_MAP['SETS'];
  }
  if (searchStr.includes('CONTINUITY') || searchStr.includes('DIFFERENTIABILITY')) {
    return DETERMINISTIC_SYLLABUS_MAP['CONTINUITY AND DIFFERENTIABILITY'];
  }
  if (
    searchStr.includes('LINES AND ANGLES') ||
    searchStr.includes('LINES & ANGLES') ||
    searchStr.includes('LINE AND ANGLE') ||
    (searchStr.includes('LINE') && searchStr.includes('ANGLE')) ||
    searchStr.includes('G06-MATH-CH02') ||
    searchStr.includes('G6-MATH-CH02') ||
    searchStr.includes('G06-MATH-CH05') ||
    searchStr.includes('G7-MATH-CH05') ||
    searchStr.includes('G07-MATH-CH05') ||
    searchStr.includes('G9-MATH-CH06') ||
    searchStr.includes('G09-MATH-CH06')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['LINES AND ANGLES'];
  }

  if (searchStr.includes('COORDINATE GEOMETRY') || (searchStr.includes('MATH') && searchStr.includes('COORD'))) {
    return DETERMINISTIC_SYLLABUS_MAP['COORDINATE GEOMETRY'];
  }
  if (searchStr.includes('METALS') && searchStr.includes('NON-METALS')) {
    return DETERMINISTIC_SYLLABUS_MAP['THE WORLD OF METALS AND NON-METALS'];
  }

  if (
    searchStr.includes('THREE QUESTIONS') ||
    searchStr.includes('GEEN101') ||
    searchStr.includes('GEEN1-CH01') ||
    searchStr.includes('G7-ENG-CH01') ||
    searchStr.includes('G07-ENG-CH01')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['THREE QUESTIONS'];
  }

  if (
    searchStr.includes('GIFT OF CHAPPALS') ||
    searchStr.includes('A GIFT OF CHAPPAL') ||
    searchStr.includes('GEEN102') ||
    searchStr.includes('GEEN1-CH02') ||
    searchStr.includes('G7-ENG-CH02') ||
    searchStr.includes('G07-ENG-CH02')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['A GIFT OF CHAPPALS'];
  }

  if (
    searchStr.includes('GOPAL AND THE HILSA') ||
    searchStr.includes('HILSA FISH') ||
    searchStr.includes('GEEN103') ||
    searchStr.includes('GEEN1-CH03') ||
    searchStr.includes('G7-ENG-CH03') ||
    searchStr.includes('G07-ENG-CH03')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['GOPAL AND THE HILSA FISH'];
  }

  if (
    searchStr.includes('ASHES THAT MADE TREES BLOOM') ||
    searchStr.includes('ASHES THAT MADE TREES') ||
    searchStr.includes('TREES BLOOM') ||
    searchStr.includes('GEEN104') ||
    searchStr.includes('GEEN1-CH04') ||
    searchStr.includes('G7-ENG-CH04') ||
    searchStr.includes('G07-ENG-CH04')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['THE ASHES THAT MADE TREES BLOOM'];
  }

  if (
    searchStr.includes('QUALITY') ||
    searchStr.includes('GESSLER') ||
    searchStr.includes('GEEN105') ||
    searchStr.includes('GEEN1-CH05') ||
    searchStr.includes('G7-ENG-CH05') ||
    searchStr.includes('G07-ENG-CH05')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['QUALITY'];
  }

  if (
    searchStr.includes('EXPERT DETECTIVES') ||
    searchStr.includes('EXPERT DETECTIVE') ||
    searchStr.includes('GEEN106') ||
    searchStr.includes('GEEN1-CH06') ||
    searchStr.includes('G7-ENG-CH06') ||
    searchStr.includes('G07-ENG-CH06')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['EXPERT DETECTIVES'];
  }

  if (
    searchStr.includes('INVENTION OF VITA-WONK') ||
    searchStr.includes('VITA-WONK') ||
    searchStr.includes('VITA WONK') ||
    searchStr.includes('GEEN107') ||
    searchStr.includes('GEEN1-CH07') ||
    searchStr.includes('G7-ENG-CH07') ||
    searchStr.includes('G07-ENG-CH07')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['THE INVENTION OF VITA-WONK'];
  }

  if (
    searchStr.includes('BICYCLE IN GOOD REPAIR') ||
    searchStr.includes('BICYCLE IN GOOD') ||
    searchStr.includes('GEEN108') ||
    searchStr.includes('GEEN1-CH08') ||
    searchStr.includes('G7-ENG-CH08') ||
    searchStr.includes('G07-ENG-CH08')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['A BICYCLE IN GOOD REPAIR'];
  }

  if (
    searchStr.includes('BEST CHRISTMAS PRESENT') ||
    searchStr.includes('CHRISTMAS PRESENT IN THE WORLD') ||
    searchStr.includes('HEEN101') ||
    searchStr.includes('HEEN1-CH01') ||
    searchStr.includes('G8-ENG-CH01') ||
    searchStr.includes('G08-ENG-CH01')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['THE BEST CHRISTMAS PRESENT IN THE WORLD'];
  }

  if (
    searchStr.includes('THE TSUNAMI') ||
    searchStr.includes('TSUNAMI') ||
    searchStr.includes('HEEN102') ||
    searchStr.includes('HEEN1-CH02') ||
    searchStr.includes('G8-ENG-CH02') ||
    searchStr.includes('G08-ENG-CH02')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['THE TSUNAMI'];
  }

  if (
    searchStr.includes('GLIMPSES OF THE PAST') ||
    searchStr.includes('GLIMPSE OF THE PAST') ||
    searchStr.includes('HEEN103') ||
    searchStr.includes('HEEN1-CH03') ||
    searchStr.includes('G8-ENG-CH03') ||
    searchStr.includes('G08-ENG-CH03')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['GLIMPSES OF THE PAST'];
  }

  if (
    searchStr.includes('BEPIN CHOUDHURY') ||
    searchStr.includes('LAPSE OF MEMORY') ||
    searchStr.includes('HEEN104') ||
    searchStr.includes('HEEN1-CH04') ||
    searchStr.includes('G8-ENG-CH04') ||
    searchStr.includes('G08-ENG-CH04')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['BEPIN CHOUDHURY\'S LAPSE OF MEMORY'];
  }

  if (
    searchStr.includes('SUMMIT WITHIN') ||
    searchStr.includes('THE SUMMIT') ||
    searchStr.includes('HEEN105') ||
    searchStr.includes('HEEN1-CH05') ||
    searchStr.includes('G8-ENG-CH05') ||
    searchStr.includes('G08-ENG-CH05')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['THE SUMMIT WITHIN'];
  }

  if (
    searchStr.includes('JODY') ||
    searchStr.includes('FAWN') ||
    searchStr.includes('HEEN106') ||
    searchStr.includes('HEEN1-CH06') ||
    searchStr.includes('G8-ENG-CH06') ||
    searchStr.includes('G08-ENG-CH06')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['THIS IS JODY\'S FAWN'];
  }

  if (
    searchStr.includes('VISIT TO CAMBRIDGE') ||
    searchStr.includes('CAMBRIDGE') ||
    searchStr.includes('HEEN107') ||
    searchStr.includes('HEEN1-CH07') ||
    searchStr.includes('G8-ENG-CH07') ||
    searchStr.includes('G08-ENG-CH07')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['A VISIT TO CAMBRIDGE'];
  }

  if (
    searchStr.includes('MONSOON DIARY') ||
    searchStr.includes('SHORT MONSOON') ||
    searchStr.includes('HEEN108') ||
    searchStr.includes('HEEN1-CH08') ||
    searchStr.includes('G8-ENG-CH08') ||
    searchStr.includes('G08-ENG-CH08')
  ) {
    return DETERMINISTIC_SYLLABUS_MAP['A SHORT MONSOON DIARY'];
  }

  // 3. Subject-Specific Chapter Number Fallbacks
  if (subject === 'ENGLISH') {
    if (grade === 7 && chapterNum === 1) return DETERMINISTIC_SYLLABUS_MAP['THREE QUESTIONS'];
    if (grade === 7 && chapterNum === 2) return DETERMINISTIC_SYLLABUS_MAP['A GIFT OF CHAPPALS'];
    if (grade === 7 && chapterNum === 3) return DETERMINISTIC_SYLLABUS_MAP['GOPAL AND THE HILSA FISH'];
    if (grade === 7 && chapterNum === 4) return DETERMINISTIC_SYLLABUS_MAP['THE ASHES THAT MADE TREES BLOOM'];
    if (grade === 7 && chapterNum === 5) return DETERMINISTIC_SYLLABUS_MAP['QUALITY'];
    if (grade === 7 && chapterNum === 6) return DETERMINISTIC_SYLLABUS_MAP['EXPERT DETECTIVES'];
    if (grade === 7 && chapterNum === 7) return DETERMINISTIC_SYLLABUS_MAP['THE INVENTION OF VITA-WONK'];
    if (grade === 7 && chapterNum === 8) return DETERMINISTIC_SYLLABUS_MAP['A BICYCLE IN GOOD REPAIR'];

    if (grade === 8 && chapterNum === 1) return DETERMINISTIC_SYLLABUS_MAP['THE BEST CHRISTMAS PRESENT IN THE WORLD'];
    if (grade === 8 && chapterNum === 2) return DETERMINISTIC_SYLLABUS_MAP['THE TSUNAMI'];
    if (grade === 8 && chapterNum === 3) return DETERMINISTIC_SYLLABUS_MAP['GLIMPSES OF THE PAST'];
    if (grade === 8 && chapterNum === 4) return DETERMINISTIC_SYLLABUS_MAP['BEPIN CHOUDHURY\'S LAPSE OF MEMORY'];
    if (grade === 8 && chapterNum === 5) return DETERMINISTIC_SYLLABUS_MAP['THE SUMMIT WITHIN'];
    if (grade === 8 && chapterNum === 6) return DETERMINISTIC_SYLLABUS_MAP['THIS IS JODY\'S FAWN'];
    if (grade === 8 && chapterNum === 7) return DETERMINISTIC_SYLLABUS_MAP['A VISIT TO CAMBRIDGE'];
    if (grade === 8 && chapterNum === 8) return DETERMINISTIC_SYLLABUS_MAP['A SHORT MONSOON DIARY'];
  }

  if (subject === 'ACCOUNTANCY') {
    if (grade === 12 && chapterNum === 6) return DETERMINISTIC_SYLLABUS_MAP['ISSUE AND REDEMPTION OF DEBENTURES'];
  }

  if (subject === 'MATHEMATICS') {
    if (grade === 7 && chapterNum === 2) return DETERMINISTIC_SYLLABUS_MAP['FRACTIONS AND DECIMALS'];
    if (grade === 11 && chapterNum === 1) return DETERMINISTIC_SYLLABUS_MAP['SETS'];
    if (grade === 11 && chapterNum === 2) return DETERMINISTIC_SYLLABUS_MAP['RELATIONS AND FUNCTIONS'];
    if (grade === 12 && chapterNum === 1) return DETERMINISTIC_SYLLABUS_MAP['RELATIONS AND FUNCTIONS'];
    if (grade === 12 && chapterNum === 5) return DETERMINISTIC_SYLLABUS_MAP['CONTINUITY AND DIFFERENTIABILITY'];
  }

  if (subject === 'CHEMISTRY') {
    if (grade === 11 && chapterNum === 1) return DETERMINISTIC_SYLLABUS_MAP['SOME BASIC CONCEPTS OF CHEMISTRY'];
    if (grade === 11 && chapterNum === 2) return DETERMINISTIC_SYLLABUS_MAP['STRUCTURE OF ATOM'];
  }

  if (subject === 'MATHEMATICS') {
    if (grade === 11 && chapterNum === 1) return DETERMINISTIC_SYLLABUS_MAP['SETS'];
    if (grade === 11 && chapterNum === 2) return DETERMINISTIC_SYLLABUS_MAP['RELATIONS AND FUNCTIONS'];
    if (grade === 12 && chapterNum === 1) return DETERMINISTIC_SYLLABUS_MAP['RELATIONS AND FUNCTIONS'];
    if (grade === 12 && chapterNum === 5) return DETERMINISTIC_SYLLABUS_MAP['CONTINUITY AND DIFFERENTIABILITY'];
  }

  if (subject === 'BIOLOGY') {
    if (grade === 11 && chapterNum === 1) return DETERMINISTIC_SYLLABUS_MAP['THE LIVING WORLD'];
    if (grade === 11 && chapterNum === 5) return DETERMINISTIC_SYLLABUS_MAP['MORPHOLOGY OF FLOWERING PLANTS'];
  }

  return null;
}

/**
 * Builds 100% authentic, chapter-tailored Real-World Applications.
 * Starts directly from Real-World Applications without NCERT prefix or duplicate concept definitions.
 */
export function buildAuthenticCoreAnalogy(
  directMatch: DeterministicChapterKnowledge | null,
  cleanTitle: string,
  domain: string,
  subject: string,
  finalGrade: number
): string {
  if (directMatch) {
    const title = cleanTitle || directMatch.chapterTitle;
    const realWorld = (directMatch.realWorldUse || '').trim();

    // If realWorldUse is rich and concrete
    if (
      realWorld &&
      realWorld.length > 5 &&
      !realWorld.includes('Critical foundational knowledge') &&
      !realWorld.includes('Applied extensively across')
    ) {
      if (
        realWorld.toLowerCase().startsWith('used in') ||
        realWorld.toLowerCase().startsWith('applied in') ||
        realWorld.toLowerCase().startsWith('critical for') ||
        realWorld.toLowerCase().startsWith('powers') ||
        realWorld.toLowerCase().startsWith('essential in')
      ) {
        return `Real-World Applications: ${realWorld}`;
      }
      return `Real-World Applications: ${realWorld}`;
    }

    return `Real-World Applications: Applied in ${title} problem solving, scientific engineering, data analysis, and practical real-world modeling.`;
  }

  // Domain-tailored dynamic intuition for runtime synthesis (clean, direct, no NCERT keyword)
  if (subject === 'MATHEMATICS' || subject === 'MATH') {
    return `Real-World Applications: Applied in computational modeling, structural architecture, financial algorithms, and geometric spatial design for ${cleanTitle}.`;
  }
  if (subject === 'PHYSICS') {
    return `Real-World Applications: Applied in mechanical engineering, aerospace navigation, energy grid optimization, and optical sensor systems for ${cleanTitle}.`;
  }
  if (subject === 'CHEMISTRY') {
    return `Real-World Applications: Applied in pharmaceutical drug synthesis, industrial chemical materials, green battery technology, and environmental testing for ${cleanTitle}.`;
  }
  if (subject === 'BIOLOGY') {
    return `Real-World Applications: Applied in medical diagnostics, biotechnology genetics, agricultural crop optimization, and healthcare clinical research for ${cleanTitle}.`;
  }
  if (subject === 'ENGLISH' || subject === 'HINDI' || subject === 'SANSKRIT') {
    return `Real-World Applications: Applied in creative media, leadership communication, legal advocacy, journalism, and narrative analysis for ${cleanTitle}.`;
  }
  if (domain === 'HUMANITIES') {
    return `Real-World Applications: Applied in public policy, urban development, historical archival analysis, and constitutional governance for ${cleanTitle}.`;
  }
  if (domain === 'COMMERCE') {
    return `Real-World Applications: Applied in corporate accounting, financial investment analysis, business strategy, and taxation management for ${cleanTitle}.`;
  }
  return `Real-World Applications: Applied in scientific problem-solving, higher academics, and analytical industry modeling for ${cleanTitle}.`;
}

/**
 * Universal Deterministic Content Synthesis Engine
 * Guarantees zero stale fallbacks and strict senior-secondary domain appropriateness.
 */
export function synthesizeDeterministicOERContent(
  conceptId: string,
  rawTitle: string,
  gradeLevel?: number,
  subjectId?: string,
  boardId: BoardId = 'CBSE'
): CornellNotes {
  const { grade, chapterNum, domain, subject, cleanTitle } = extractContextFromId(
    conceptId,
    rawTitle,
    subjectId
  );

  const finalGrade = gradeLevel || grade;
  const isNonCbse = boardId === 'IB_MYP' || boardId === 'CAMBRIDGE' || (conceptId && (conceptId.startsWith('IB_') || conceptId.startsWith('CAMBRIDGE')));

  // 0. Pre-Rendered Unified Overlay Lookup for IB & Cambridge
  if (isNonCbse) {
    const unifiedPayload = lookupUnifiedCheatSheet({
      conceptId,
      boardId,
      gradeLevel: finalGrade,
      subjectId: subjectId || subject,
      title: cleanTitle || rawTitle
    });
    if (unifiedPayload) {
      return unifiedPayload;
    }
  }

  // 1. Direct Registry Match
  const directMatch = lookupDeterministicChapter({
    id: conceptId,
    title: cleanTitle,
    gradeLevel: finalGrade,
    subjectId: subject
  });

  if (directMatch) {
    const mainNotes = (directMatch.coreConcepts || [])
      .map((c: any, i: number) => {
        const heading = c.heading || c.title || `Core Concept ${i + 1}`;
        let bulletsStr = '';
        if (Array.isArray(c.bullets)) {
          bulletsStr = c.bullets.map((b: string) => `• ${b}`).join('\n');
        } else if (c.explanation) {
          bulletsStr = `• ${c.explanation}`;
        }
        return `**${i + 1}. ${heading}**:\n${bulletsStr}`;
      })
      .join('\n\n');

    const trapList = (directMatch.examTraps || []).map((t: any, i: number) => {
      if (typeof t === 'string') return `${i + 1}. ${t}`;
      return `${i + 1}. **Trap**: ${t.trap}\n   • **Remedy**: ${t.remedy}`;
    });

    const mentalCheck = directMatch.quickMentalCheck 
      ? `\n\n2. Quick Verification Check:\n• ${directMatch.quickMentalCheck}`
      : `\n\n2. Quick Verification Check:\n• Verify statutory principles and formulas for ${cleanTitle || directMatch.chapterTitle}.`;

    const curriculumTrap = `1. Common Pitfalls & Mark-Loss Patterns:\n${trapList.join('\n')}${mentalCheck}`;

    const cueQuestions = directMatch.cueQuestions && directMatch.cueQuestions.length > 0
      ? directMatch.cueQuestions
      : [
          `What are the foundational laws and definitions governing ${cleanTitle || directMatch.chapterTitle}?`,
          `Explain the primary mechanisms, formulas, and structural relationships in ${cleanTitle || directMatch.chapterTitle}.`,
          `How are concepts in ${cleanTitle || directMatch.chapterTitle} applied to solve standard board examination problems?`
        ];

    return {
      conceptId: conceptId || `REG-${directMatch.subject || subject}-G${finalGrade}-CH${directMatch.chapterNum || 1}`,
      title: cleanTitle || directMatch.chapterTitle,
      gradeLevel: finalGrade,
      summary: `[Statutory Curriculum • Grade ${finalGrade}] ${cleanTitle || directMatch.chapterTitle}: Comprehensive analytical mastery adhering strictly to ${boardId} board rubrics.`,
      cueQuestions,
      mainNotes,
      structuralRule: directMatch.essentialLaw || `\\text{Foundational Standard for } ${cleanTitle || directMatch.chapterTitle}`,
      coreAnalogy: buildAuthenticCoreAnalogy(directMatch, cleanTitle, domain, subject, finalGrade),
      curriculumTrap,
      verificationProblem: directMatch.verificationProblem || `Verify all core principles and calculations for ${cleanTitle || directMatch.chapterTitle}.`,
      workedExample: directMatch.workedExample || {
        problem: `Apply the fundamental theorems and definitions of ${cleanTitle || directMatch.chapterTitle} to solve a representative curriculum problem.`,
        steps: [
          `Step 1: Identify given parameters and fundamental governing principles of ${cleanTitle || directMatch.chapterTitle}.`,
          `Step 2: Apply the standard NCERT formula or conceptual framework systematically.`,
          `Step 3: State the final conclusion with appropriate units and justification.`
        ],
        result: `Verifiable standard solution adhering to NCERT marking rubrics for ${cleanTitle || directMatch.chapterTitle}.`
      },
      diagramType: directMatch.diagramType || 'diagram_concept_map',
      realWorldUse: directMatch.realWorldUse || `Critical foundational knowledge applied across higher academic studies, competitive entrance exams, and real-world scientific applications.`,
      payloadFingerprint: `DET-${directMatch.subject || subject}-G${finalGrade}-CH${directMatch.chapterNum || 1}`
    };
  }

  // 2. Domain-Specific Dynamic Construction
  if (domain === 'HUMANITIES') {
    const isLang = subject === 'ENGLISH' || subject === 'HINDI' || subject === 'SANSKRIT';
    const structuralRule = isLang
      ? finalGrade <= 8
        ? `$\\text{Theme / Moral} \\longleftarrow \\text{Narrative Arc } (\\text{Exposition} \\to \\text{Climax} \\to \\text{Resolution}) \\longleftarrow \\text{Character Motivation}$`
        : `$\\text{Literary Analysis: } \\text{Textual Evidence} + \\text{Stylistic Device (Tone / Metaphor)} \\Longrightarrow \\text{Thematic Purpose}$`
      : subject === 'HISTORY'
      ? `$\\text{Historical Invariant: } \\text{Pre-conditions / Causes} \\longrightarrow \\text{Key Movement / Milestone} \\longrightarrow \\text{Institutional Transformation}$`
      : subject === 'GEOGRAPHY'
      ? `$\\text{Geographical Invariant: } \\text{Physical / Climatic Factors} + \\text{Human Geography} \\Longrightarrow \\text{Spatial Distribution \\& Sustainability}$`
      : subject === 'CIVICS'
      ? `$\\text{Constitutional Invariant: } \\text{Constitutional Framework} \\longleftrightarrow \\text{Checks \\& Balances} \\longleftrightarrow \\text{Citizen Democratic Rights}$`
      : subject === 'ECONOMICS'
      ? `$\\text{Economic Invariant: } \\text{Resource Allocation} + \\text{Market Dynamics} \\Longrightarrow \\text{Sustainable Development \\& Welfare}$`
      : `$\\text{Social Science Invariant: } \\text{Socio-Historical Context} \\longrightarrow \\text{Civic \\& Economic Dynamics} \\longrightarrow \\text{Democratic Development}$`;

    const mainNotes = isLang
      ? `**1. Plot Overview & Contextual Setting (${cleanTitle})**:
• **Context**: ${cleanTitle} establishes central literary motifs under board curriculum frameworks.
• **Setting & Atmosphere**: Establishes background circumstances, cultural context, and narrative tone.
• **Narrative Exposition**: Introduces primary characters, underlying tensions, and initial circumstances.

**2. Character Dynamics & Central Conflict**:
• **Motivations & Flaws**: Examines character choices, interpersonal interactions, and emotional development.
• **Pivotal Turning Point**: The crucial event or decision that propels the story toward its climax.

**3. Thematic Synthesis & Literary Devices**:
• **Core Themes**: Explores underlying moral, philosophical, or socio-cultural messages.
• **Literary Craft**: Meaningful use of imagery, symbolism, character contrast, and dialogue nuance.`
      : `**1. Foundational Context & Setting (${cleanTitle})**:
• **Core Framework**: ${cleanTitle} represents a pivotal topic within ${subject.replace(/_/g, ' ')}.
• **Preconditions & Framework**: Key historical milestones, geographic resource classifications, or constitutional principles.

**2. Key Developments & Systematic Processes**:
• **Sequential Dynamics**: Structured phases, institutional operations, or spatial distributions.
• **Statutory Terminology**: Precise NCERT terminology, timeline dates, and governance mechanisms.

**3. Impact, Analysis & Contemporary Significance**:
• **Socio-Economic & Civic Outcomes**: Long-term historical legacy, policy impact, and citizen welfare.
• **Examination Focus**: Structured point-wise presentation adhering to CBSE marking criteria.`;

    const examTraps = isLang
      ? [
          `Omitting Textual Evidence: Answering analytical questions with vague generalized opinions instead of citing specific textual episodes from ${cleanTitle}.`,
          `Grammatical Tense Inconsistency: Switching indiscriminately between past and present tense when analyzing narrative dynamics.`,
          `Word Limit Violations: Failing to respect prescribed word limits (30–40 words for Short Answer, 100–120 words for Long Answer).`
        ]
      : [
          `Terminology Inaccuracy: Substituting informal descriptions for statutory NCERT terms and historical dates in ${cleanTitle}.`,
          `Unstructured Narrative: Writing continuous unstructured paragraphs instead of numbered points with clear sub-headings.`,
          `Map & Data Pointing Errors: Inaccurate location markings or omitting essential climatic/constitutional conditions.`
        ];

    return {
      conceptId: conceptId || `DET-HUM-G${finalGrade}`,
      title: cleanTitle,
      gradeLevel: finalGrade,
      summary: `[Statutory Humanities • Grade ${finalGrade}] ${cleanTitle}: Comprehensive literary and analytical interpretation adhering strictly to board standards.`,
      cueQuestions: isLang
        ? [
            `What is the central theme and underlying message conveyed in ${cleanTitle}?`,
            `Analyze the key motivations, conflicts, and transformations of the central characters in ${cleanTitle}.`,
            `How does the author employ literary devices (imagery, irony, symbolism, tone) to enrich ${cleanTitle}?`,
            `Cite specific textual evidence demonstrating how the primary conflict in ${cleanTitle} is resolved.`
          ]
        : [
            `What are the foundational historical, geographic, or institutional preconditions of ${cleanTitle}?`,
            `Explain the sequential causes, milestones, and long-term consequences associated with ${cleanTitle}.`,
            `How do the principles of ${cleanTitle} influence contemporary society and governance?`,
            `What statutory terms, dates, constitutional articles, or geographical factors must be included in examination answers on ${cleanTitle}?`
          ],
      mainNotes,
      structuralRule,
      coreAnalogy: isLang
        ? `NCERT Narrative Intuition: Think of ${cleanTitle} as a cohesive literary tapestry where character decisions, emotional turning points, and moral insights reveal the author's underlying message.`
        : `NCERT Social Science Intuition: Think of ${cleanTitle} as an interconnected framework of historical turning points, spatial distributions, and constitutional institutions that guide society.`,
      curriculumTrap: `1. Common Pitfalls & Mark-Loss Patterns:\n${examTraps.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n2. Quick Verification Check:\n• ${isLang ? 'Verify textual citations and tense consistency' : 'Verify statutory terms, dates, and point-wise structure'} for ${cleanTitle}.`,
      verificationProblem: isLang
        ? `Identify the pivotal turning point in ${cleanTitle} and verify how textual evidence supports the central theme.`
        : `Verify the chronological sequence, key terminology, and cause-effect relationships governing ${cleanTitle}.`,
      workedExample: isLang
        ? {
            problem: `Explain how the central conflict in ${cleanTitle} illustrates the author's primary theme with two textual references.`,
            steps: [
              `Step 1: State the core theme and identify the central character conflict in ${cleanTitle}.`,
              `Step 2: Cite two specific episodes or dialogue interactions illustrating this conflict.`,
              `Step 3: Conclude by explaining how the resolution reinforces the underlying moral or literary message.`
            ],
            result: `Structured analytical interpretation supported by textual evidence for ${cleanTitle}.`
          }
        : {
            problem: `Analyze three primary factors or causes associated with ${cleanTitle} and state their significance.`,
            steps: [
              `Step 1: State the historical/geographic context and background conditions of ${cleanTitle}.`,
              `Step 2: Detail three numbered factors using statutory NCERT terminology.`,
              `Step 3: Summarize the long-term impact on society, governance, or resource sustainability.`
            ],
            result: `Point-wise structured analysis with statutory terminology for ${cleanTitle}.`
          },
      diagramType: 'visual_model_pending',
      realWorldUse: isLang
        ? `Applied in creative writing, literary criticism, professional communications, journalism, and scriptwriting.`
        : `Applied in public administration, historical research, urban planning, environmental policy, and legal studies.`,
      payloadFingerprint: `DET-HUM-G${finalGrade}`
    };
  }

  if (domain === 'COMMERCE') {
    const isAcc = subject === 'ACCOUNTANCY';
    const structuralRule = isAcc
      ? `$\\text{Debit (Assets / Expenses Increase)} = \\text{Credit (Liabilities / Capital / Revenue Increase)} \\quad | \\quad \\text{Assets} = \\text{Liabilities} + \\text{Capital}$`
      : `$\\text{Management Cycle: } \\text{Planning} \\longrightarrow \\text{Organizing} \\longrightarrow \\text{Staffing} \\longrightarrow \\text{Directing} \\longrightarrow \\text{Controlling} \\quad | \\quad \\text{Efficiency} + \\text{Effectiveness}$`;

    const mainNotes = `**1. Foundational Principles & Regulatory Framework (${cleanTitle})**:
• **Foundational Principle**: ${cleanTitle} establishes statutory financial and managerial principles.
• **Statutory Guidelines**: GAAP / Ind-AS accounting standards, administrative management principles, or legal provisions.

**2. Procedural Execution & Analytical Methods**:
• **Operational Methodology**: Structured financial entries, ledger balancing, managerial planning cycles, or ratio analysis.
• **Core Invariants**: Dual aspect concept, asset-liability equilibrium, and organizational efficiency.

**3. Examination Applications & Problem Solving**:
• **Marking Rubrics**: Structured presentation with proper column headings, working notes, and formal reconciliation.`;

    const examTraps = isAcc
      ? [
          `Dual Aspect Omission: Failing to record the corresponding credit/debit entry, leading to trial balance inequality.`,
          `Account Misclassification: Confusing Real, Personal, and Nominal accounts before applying golden rules.`,
          `Working Note Omission: Omitting step-by-step working notes for depreciation, goodwill, or interest calculations.`
        ]
      : [
          `Principles vs Functions Confusion: Conflating Fayol's 14 principles of management with the 5 managerial functions (POSDC).`,
          `Efficiency vs Effectiveness: Failing to distinguish between timely completion (effective) and cost optimization (efficient).`,
          `Case Study Quotation Omission: Quoting insufficient lines from case prompts before stating the identified management principle.`
        ];

    return {
      conceptId: conceptId || `DET-COMM-G${finalGrade}`,
      title: cleanTitle,
      gradeLevel: finalGrade,
      summary: `[Statutory Commerce • Grade ${finalGrade}] ${cleanTitle}: Professional accounting and management frameworks adhering to board standards.`,
      cueQuestions: [
        `What are the foundational accounting standards or managerial principles governing ${cleanTitle}?`,
        `Explain step-by-step how transactions, ledger postings, or operational plans are executed in ${cleanTitle}.`,
        `What statutory guidelines, format requirements, or balance checks apply to ${cleanTitle}?`,
        `What common errors in classification or calculation lead to mark deductions in ${cleanTitle}?`
      ],
      mainNotes,
      structuralRule,
      coreAnalogy: `Business & Financial Intuition: In ${cleanTitle}, every commercial transaction and organizational decision operates under structured principles ensuring financial accountability, operational efficiency, and long-term sustainability.`,
      curriculumTrap: `1. Common Pitfalls & Mark-Loss Patterns:\n${examTraps.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n2. Quick Verification Check:\n• Verify debit/credit balance, column formats, and statutory working notes for ${cleanTitle}.`,
      verificationProblem: `Verify that accounting entries adhere to dual aspect rules and managerial frameworks for ${cleanTitle}.`,
      workedExample: {
        problem: `Apply the governing commercial/accounting principles of ${cleanTitle} to analyze a standard business scenario.`,
        steps: [
          `Step 1: Identify all affected accounts or managerial parameters in ${cleanTitle}.`,
          `Step 2: Apply the governing debit/credit rules or management functions systematically.`,
          `Step 3: State the final balanced ledger entry or strategic recommendation with proper formats.`
        ],
        result: `Standard accounting/managerial solution verified for ${cleanTitle}.`
      },
      diagramType: 'visual_model_pending',
      realWorldUse: `Applied across corporate finance, chartered accountancy, business entrepreneurship, and operational management.`,
      payloadFingerprint: `DET-COMM-G${finalGrade}`
    };
  }

  if (domain === 'PHYSICAL_SCI_MATH') {
    if (subject === 'COMPUTER_SCIENCE') {
      const structuralRule = `$\\text{Computational Logic: } \\text{Algorithm Input} \\longrightarrow \\text{Deterministic Execution } [\\mathcal{O}(n) \\text{ Time}, \\mathcal{O}(1) \\text{ Space}] \\longrightarrow \\text{Verified Output}$`;
      const mainNotes = `**1. Core Principles & Algorithmic Foundations (${cleanTitle})**:
• **Foundational Principle**: Data representations, computational paradigms, and logical constructs.
• **Theoretical Framework**: Abstract Data Types (ADT), syntax rules, and deterministic state transitions.

**2. Step-by-Step Implementation & Logic Flow**:
• **Algorithmic Flow**: Clear execution steps, control structures, and function signatures.
• **Efficiency & Constraints**: Time complexity, space complexity, and boundary condition handling.

**3. Examination Applications & Debugging**:
• **Implementation Standards**: Syntax precision, variable naming conventions, and edge-case testing.`;

      const examTraps = [
        `0-Based Indexing Errors: Forgetting that lists, strings, and arrays start at index 0 and terminate at length - 1.`,
        `Mutability Misconceptions: Attempting in-place modification on immutable types (strings, tuples).`,
        `SQL Clause Ordering Slip: Misordering clauses (correct order: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY).`
      ];

      return {
        conceptId: conceptId || `DET-CS-G${finalGrade}`,
        title: cleanTitle,
        gradeLevel: finalGrade,
        summary: `[Statutory Computer Science • Grade ${finalGrade}] ${cleanTitle}: Algorithmic problem-solving and software architecture.`,
        cueQuestions: [
          `What is the fundamental logic, algorithmic objective, and data structure utilized in ${cleanTitle}?`,
          `Explain the step-by-step implementation, syntax, or control flow used in ${cleanTitle}.`,
          `What are the time/space complexities or boundary conditions for ${cleanTitle}?`,
          `What common syntax, indexing, or logical pitfalls should be avoided when implementing ${cleanTitle}?`
        ],
        mainNotes,
        structuralRule,
        coreAnalogy: `Computational Thinking Intuition: In ${cleanTitle}, decompose problems into structured instructions, predictable data transformations, and verified algorithmic steps.`,
        curriculumTrap: `1. Common Pitfalls & Mark-Loss Patterns:\n${examTraps.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n2. Quick Verification Check:\n• Trace algorithm execution on boundary test cases for ${cleanTitle}.`,
        verificationProblem: `Trace the logic flow and verify boundary conditions for ${cleanTitle}.`,
        workedExample: {
          problem: `Write the step-by-step logic or algorithm to process inputs adhering to ${cleanTitle}.`,
          steps: [
            `Step 1: Define input specifications and initialize required data structures.`,
            `Step 2: Execute the core loop or logical conditions handling edge cases.`,
            `Step 3: Return verified output adhering to optimal time and space constraints.`
          ],
          result: `Algorithm verified with zero boundary-case errors for ${cleanTitle}.`
        },
        diagramType: 'visual_model_pending',
        realWorldUse: `Applied in software engineering, database administration, artificial intelligence, and cybersecurity.`,
        payloadFingerprint: `DET-CS-G${finalGrade}`
      };
    }

    if (subject === 'PHYSICS') {
      const structuralRule = finalGrade <= 8
        ? `$\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} \\quad | \\quad \\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}} \\quad | \\quad \\text{Work} = \\text{Force} \\times \\text{Distance}$`
        : `$\\sum \\vec{F} = m \\vec{a} \\quad | \\quad v = u + at \\quad | \\quad V = I \\times R$`;

      const mainNotes = `**1. Foundational Physical Laws & Vector Relations (${cleanTitle})**:
• Theoretical Framework, SI Base Units & Vector Formulations for ${cleanTitle}.
• Conservation Laws, Invariant Relationships & Dimensional Equations.

**2. Quantitative Derivations & Analytical Working**:
• Step-by-Step Derivations connecting Initial Boundary Conditions to System Response.
• Explicit Method Steps adhering strictly to Senior Secondary Physics Marking Rubrics.

**3. Examination Applications & Problem Solving**:
• Standard Numerical Archetypes, Sign Conventions & Boundary Checks.
• High-Yield Error Elimination adhering to CBSE / National Standards.`;

      const examTraps = [
        `Unit Conversion Slips: Forgetting to convert non-standard units (cm to m, km/h to m/s, g to kg) before numerical calculation.`,
        `Vector Direction Confusion: Inverting positive and negative reference frames for velocity, force, or optical focal lengths.`,
        `Formula Statement Omission: Substituting numbers directly without first stating the governing symbolic physics equation.`
      ];

      return {
        conceptId: conceptId || `DET-PHYS-G${finalGrade}`,
        title: cleanTitle,
        gradeLevel: finalGrade,
        summary: `[Statutory Physics • Grade ${finalGrade}] ${cleanTitle}: Rigorous physical principles and quantitative problem solving.`,
        cueQuestions: [
          `State the fundamental physical laws and vector relationships governing ${cleanTitle}.`,
          `Derive the governing analytical equation for ${cleanTitle} step-by-step.`,
          `What unit conversions and vector sign conventions must be verified in examinations?`
        ],
        mainNotes,
        structuralRule,
        coreAnalogy: `Think of ${cleanTitle} like a balance scale governed by strict physical laws: every force or energy transfer must satisfy universal conservation invariants.`,
        curriculumTrap: `1. Common Pitfalls & Mark-Loss Patterns:\n${examTraps.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n2. Quick Verification Check:\n• Verify SI units, sign conventions, and formula statements for ${cleanTitle}.`,
        verificationProblem: `Physical Verification: Check dimensional consistency and magnitude reasonability for ${cleanTitle}.`,
        workedExample: {
          problem: `Apply the governing physical laws of ${cleanTitle} to solve a standard numerical benchmark problem.`,
          steps: [
            `Step 1: Declare all given parameters converted into standard SI base units.`,
            `Step 2: State the governing physics formula and rearrange for the target variable.`,
            `Step 3: Substitute values and state the final result with proper units and direction.`
          ],
          result: `Physical solution verified with correct SI units for ${cleanTitle}.`
        },
        diagramType: 'visual_model_pending',
        realWorldUse: `Applied in mechanical engineering, aerospace systems, electrical grids, and optical technology.`,
        payloadFingerprint: `DET-PHYS-G${finalGrade}`
      };
    }

    // Default Math
    const structuralRule = finalGrade <= 8
      ? `$\\text{Mathematical Invariant: } \\text{LHS} \\equiv \\text{RHS} \\quad | \\quad x + a = b \\iff x = b - a$`
      : `$\\forall x \\in \\text{Domain}(f), \\quad \\text{LHS} \\equiv \\text{RHS} \\quad [\\text{Boundary Conditions Valid}]$`;

    const mainNotes = `**1. Foundational Axioms & Definitions for ${cleanTitle}**:
• Statutory Definitions, Existence Criteria & Core Axioms for ${cleanTitle}.
• Theoretical Framework, Domain Constraints & Mathematical Invariants.

**2. Analytical Proof & Transformation Sequences**:
• Step-by-Step Derivations & Invariant Transformations for ${cleanTitle}.
• Systematic Algebraic Solutions Adhering to NCERT Standards.

**3. Examination Applications & Problem Solving**:
• Standard Problem Archetypes, Step-Marking Criteria & Boundary Constraint Checks.
• Statutory Examination Applications adhering strictly to CBSE standards.`;

    const examTraps = [
      `Domain Boundary Violation: Evaluating ${cleanTitle} outside its valid domain or overlooking existence conditions.`,
      `Sign & Transposition Inversion: Inverting signs during algebraic simplification or transposition across relations in ${cleanTitle}.`,
      `Missing Intermediate Justifications: Omitting statutory theorem citations required for full-mark evaluation.`
    ];

    return {
      conceptId: conceptId || `DET-MATH-G${finalGrade}`,
      title: cleanTitle,
      gradeLevel: finalGrade,
      summary: `[Statutory Mathematics • Grade ${finalGrade}] ${cleanTitle}: Advanced mathematical analysis and rigorous problem-solving.`,
      cueQuestions: [
        `What are the foundational axioms and domain constraints governing ${cleanTitle}?`,
        `How do we derive the step-by-step analytical proof for ${cleanTitle}?`,
        `What boundary conditions and common sign-inversion traps should be checked in examinations?`
      ],
      mainNotes,
      structuralRule,
      coreAnalogy: `Think of ${cleanTitle} like an exact analytical equation: every transformation must preserve algebraic invariance across domain boundaries.`,
      curriculumTrap: `1. Common Pitfalls & Mark-Loss Patterns:\n${examTraps.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n2. Quick Verification Check:\n• Verify boundary conditions and domain limits for ${cleanTitle}.`,
      verificationProblem: `Analytical Verification: Verify all boundary conditions and domain constraints for ${cleanTitle}.`,
      workedExample: {
        problem: `Apply the governing mathematical principles of ${cleanTitle} to establish the analytical solution.`,
        steps: [
          `Step 1: State domain constraints and declare known parameters for ${cleanTitle}.`,
          `Step 2: Apply the governing mathematical invariant and simplify step-by-step.`,
          `Step 3: Verify boundary limits and state the final result with dimensional precision.`
        ],
        result: `Analytical solution verified for ${cleanTitle}.`
      },
      diagramType: 'visual_model_pending',
      realWorldUse: `Applied across computational algorithms, physics simulations, quantitative modeling, and engineering systems.`,
      payloadFingerprint: `DET-MATH-G${finalGrade}`
    };
  }

  if (domain === 'CHEMICAL_SCIENCES') {
    const structuralRule = finalGrade <= 8
      ? `$\\text{Chemical Reaction Invariant: } \\text{Reactants} \\longrightarrow \\text{Products} \\quad | \\quad \\text{Mass of Reactants} = \\text{Mass of Products}$`
      : `$\\text{Chemical Invariant: } \\text{Reactants} \\longrightarrow \\text{Products} \\quad | \\quad \\sum m_{\\text{reactants}} = \\sum m_{\\text{products}} \\quad | \\quad n = \\frac{m}{M}$`;

    const mainNotes = `**1. Chemical Principles & Reaction Stoichiometry (${cleanTitle})**:
• Atomic Architecture, Bonding Invariants & IUPAC Nomenclature for ${cleanTitle}.
• Law of Conservation of Mass & Balanced Stoichiometric Ratios.

**2. Reaction Mechanisms & Equilibrium Dynamics**:
• Reaction Pathways, Thermochemistry & Catalyst Effects.
• Rate Equations, Equilibrium Constants & Ionic Interactions.

**3. Examination Applications & Problem Solving**:
• Standard Stoichiometric Calculations, State Symbols & Reagent Checks.
• High-Yield Error Elimination adhering to CBSE / National Standards.`;

    const examTraps = [
      `Unbalanced Equations: Forgetting to balance chemical equations and include state symbols (s, l, g, aq).`,
      `Valency Criss-Cross Errors: Misidentifying cation/anion charges when writing molecular formulas.`,
      `Mole Ratio Misapplication: Calculating product quantities without accounting for stoichiometric coefficients.`
    ];

    return {
      conceptId: conceptId || `DET-CHEM-G${finalGrade}`,
      title: cleanTitle,
      gradeLevel: finalGrade,
      summary: `[Statutory Chemistry • Grade ${finalGrade}] ${cleanTitle}: Molecular mechanisms and stoichiometric chemical analysis.`,
      cueQuestions: [
        `What are the foundational chemical laws and bonding principles governing ${cleanTitle}?`,
        `Write the balanced chemical equations and reaction mechanisms for ${cleanTitle}.`,
        `What state symbols and stoichiometric ratios must be verified in examinations?`
      ],
      mainNotes,
      structuralRule,
      coreAnalogy: `Think of ${cleanTitle} like a balanced recipe: every atom in the reactants must be accounted for in the products without loss.`,
      curriculumTrap: `1. Common Pitfalls & Mark-Loss Patterns:\n${examTraps.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n2. Quick Verification Check:\n• Verify atom balance and state symbols for ${cleanTitle}.`,
      verificationProblem: `Chemical Verification: Balance the reaction equation and verify stoichiometric mass conservation for ${cleanTitle}.`,
      workedExample: {
        problem: `Apply stoichiometric principles of ${cleanTitle} to balance and calculate reaction parameters.`,
        steps: [
          `Step 1: Write the skeletal chemical equation declaring reactant and product formulas.`,
          `Step 2: Balance atoms sequentially and assign correct physical state symbols.`,
          `Step 3: State the final balanced stoichiometric equation.`
        ],
        result: `Chemical reaction balanced and verified for ${cleanTitle}.`
      },
      diagramType: 'visual_model_pending',
      realWorldUse: `Applied in pharmaceuticals, materials science, chemical engineering, and green technology.`,
      payloadFingerprint: `DET-CHEM-G${finalGrade}`
    };
  }

  // 3. Life Sciences
  const structuralRule = `$\\text{Biological Invariant: } \\text{Structural Organization} \\longrightarrow \\text{Physiological/Cellular Mechanism} \\longrightarrow \\text{Functional Adaptation}$`;
  const mainNotes = `**1. Structural Architecture & Morphological Organization**:
• Cytological, Anatomical & Taxonomic Foundations for ${cleanTitle}.
• Biomolecular Compartmentalization & Structural Hierarchy.

**2. Physiological & Biochemical Mechanisms**:
• Sequential Biological Pathways, Energy Transduction & Enzyme Kinetics.
• Signaling Cascades, Feedback Regulation & Transport Across Membranes.

**3. Adaptive Significance & Diagnostic Classifications**:
• Evolutionary Adaptations, Taxonomic Distinctions & Genetic Controls.
• Diagnostic Criteria adhering strictly to Senior Secondary NCERT Biology standard.`;

  const examTraps = [
    `Taxonomic & Terminology Confusion: Substituting informal descriptions for statutory NCERT biological nomenclature in ${cleanTitle}.`,
    `Directional Sequence Inversion: Inverting sequence order in biochemical or developmental pathways in ${cleanTitle}.`,
    `Structure-Function Misattribution: Misidentifying anatomical structures or their specific physiological adaptations.`
  ];

  return {
    conceptId: conceptId || `DET-BIO-G${finalGrade}`,
    title: cleanTitle,
    gradeLevel: finalGrade,
    summary: `[Statutory Life Sciences • Grade ${finalGrade}] ${cleanTitle}: Comprehensive biological architecture and physiological mechanisms.`,
    cueQuestions: [
      `What are the defining anatomical and cytological characteristics of ${cleanTitle}?`,
      `How do the biochemical and physiological pathways operate in ${cleanTitle}?`,
      `What directional sequence and nomenclature pitfalls must be avoided in examinations?`
    ],
    mainNotes,
    structuralRule,
    coreAnalogy: `Think of ${cleanTitle} as an integrated biological system where structural adaptations directly enable specialized physiological functions.`,
    curriculumTrap: `1. Common Pitfalls & Mark-Loss Patterns:\n${examTraps.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n2. Quick Verification Check:\n• Verify statutory NCERT biological terms and pathway directions for ${cleanTitle}.`,
    verificationProblem: `Biological Verification: Trace the sequence and regulatory controls governing ${cleanTitle}.`,
    workedExample: {
      problem: `Describe the diagnostic features and functional mechanism governing ${cleanTitle}.`,
      steps: [
        `Step 1: Identify structural components and baseline parameters in ${cleanTitle}.`,
        `Step 2: Trace the physiological mechanism or classification pathway step-by-step.`,
        `Step 3: State the final biological conclusion with precise statutory nomenclature.`
      ],
      result: `Biological mechanism verified for ${cleanTitle}.`
    },
    diagramType: 'visual_model_pending',
    realWorldUse: `Applied in biomedical sciences, biotechnology, agronomy, pharmacology, and ecological conservation.`,
    payloadFingerprint: `DET-BIO-G${finalGrade}`
  };
}
