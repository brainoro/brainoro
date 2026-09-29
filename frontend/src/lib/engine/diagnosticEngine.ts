/**
 * Brainoro Psychometric Root-Cause Diagnostic & Prerequisite Knowledge Gap Engine
 * -------------------------------------------------------------------------------
 * Analyzes incorrect student responses in real time, classifies cognitive misconceptions,
 * traverses the upstream prerequisite curriculum dependency graph (Class 6 - 12), and
 * pinpoints the exact foundational chapter/concept in past grades where the student lacks mastery.
 */

import { AssessmentItem } from '../types';

export interface PrerequisiteKnowledgeNode {
  grade: number;
  subject: string;
  chapterTitle: string;
  chapterNum?: number;
  conceptTitle: string;
  axiomSummary: string;
  commonMisconception: string;
  remediationAction: string;
  probeQuestion: {
    prompt: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface DiagnosticReport {
  id: string;
  timestamp: string;
  failedItemId: string;
  currentChapterTitle: string;
  currentGrade: number;
  currentSubject: string;
  questionPrompt: string;
  selectedOptionText?: string;
  correctOptionText?: string;
  misconceptionType: 'FOUNDATIONAL_AXIOM_GAP' | 'SIGN_OR_ALGEBRAIC_SLIP' | 'INCORRECT_THEOREM_TRANSFER' | 'CONCEPTUAL_INVERSION' | 'BOUNDARY_CONDITION_NEGLECT';
  rootCauseSummary: string;
  prerequisite: PrerequisiteKnowledgeNode;
  isResolved: boolean;
}

/**
 * Curated Prerequisite Knowledge Lineage Database
 * Maps target chapters to upstream foundational past-grade chapters and diagnostic probes.
 */
const PREREQUISITE_DEPENDENCY_DATABASE: Record<string, Partial<PrerequisiteKnowledgeNode>> = {
  // --- MATHEMATICS ---
  'LINES AND ANGLES': {
    grade: 7,
    subject: 'Mathematics',
    chapterTitle: 'Lines and Angles',
    chapterNum: 5,
    conceptTitle: 'Transversal Lines, Alternate & Corresponding Angles',
    axiomSummary: 'When two parallel lines are cut by a transversal, alternate interior angles are equal and consecutive interior angles sum to 180°.',
    commonMisconception: 'Confusing alternate interior angles with consecutive interior angles, or applying angle equality without verifying parallel line conditions.',
    remediationAction: 'Revisit Class 7 Chapter 5 (Lines and Angles) to practice identifying interior angle pairs on parallel transversals before attempting complex Class 9 multi-line deductions.',
    probeQuestion: {
      prompt: 'If two parallel lines are intersected by a transversal and one interior angle is 70°, what is the measure of the consecutive (co-interior) interior angle on the same side?',
      options: ['110° (Supplementary Angle Property)', '70° (Alternate Angle Error)', '90° (Right Angle Assumption)', '140° (Double Angle Error)'],
      correctIndex: 0,
      explanation: 'Consecutive interior angles on the same side of a transversal are supplementary (sum = 180°). Thus 180° - 70° = 110°.'
    }
  },
  'QUADRATIC EQUATIONS': {
    grade: 9,
    subject: 'Mathematics',
    chapterTitle: 'Polynomials',
    chapterNum: 2,
    conceptTitle: 'Factorization of Polynomials & Splitting Middle Term',
    axiomSummary: 'To factorize $ax^2 + bx + c$, find two numbers $p$ and $q$ such that $p + q = b$ and $p \\cdot q = ac$.',
    commonMisconception: 'Sign confusion when calculating discriminant $D = b^2 - 4ac$ or improper middle-term splitting factors when $c$ is negative.',
    remediationAction: 'Rebuild quadratic factoring confidence by reviewing Class 9 Chapter 2 (Polynomials) and Class 8 Algebraic Identities.',
    probeQuestion: {
      prompt: 'What are the two factors that multiply to give -12 and add up to give +1 for the quadratic $x^2 + x - 12 = 0$?',
      options: ['+4 and -3', '-4 and +3', '+6 and -2', '+12 and -1'],
      correctIndex: 0,
      explanation: '4 × (-3) = -12 and 4 + (-3) = +1. Therefore, (x + 4)(x - 3) = 0.'
    }
  },
  'TRIANGLES': {
    grade: 9,
    subject: 'Mathematics',
    chapterTitle: 'Triangles',
    chapterNum: 7,
    conceptTitle: 'Congruency Criteria (SAS, ASA, SSS, RHS)',
    axiomSummary: 'Two triangles are congruent if corresponding sides and angles satisfy axiomatic congruence criteria (CPCTC).',
    commonMisconception: 'Assuming SSA (Side-Side-Angle) or AAA is a valid congruence criterion, which leads to false similarity proofs.',
    remediationAction: 'Review Class 7 Chapter 6 (The Triangle and Its Properties) and Class 9 Congruency Criteria before applying Thales Basic Proportionality Theorem.',
    probeQuestion: {
      prompt: 'Which of the following is NOT a valid congruence criterion for two general triangles?',
      options: ['AAA (Angle-Angle-Angle)', 'SAS (Side-Angle-Side)', 'ASA (Angle-Side-Angle)', 'SSS (Side-Side-Side)'],
      correctIndex: 0,
      explanation: 'AAA only guarantees similarity (equiangular triangles), not congruence (equal size and shape).'
    }
  },
  'INTRODUCTION TO TRIGONOMETRY': {
    grade: 9,
    subject: 'Mathematics',
    chapterTitle: 'Triangles',
    chapterNum: 7,
    conceptTitle: 'Right-Angled Triangle & Pythagoras Theorem',
    axiomSummary: 'In a right triangle with acute angle $\\theta$: $\\sin\\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$, $\\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$, and $h^2 = p^2 + b^2$.',
    commonMisconception: 'Inverting opposite and adjacent sides when the reference angle shifts from base to vertex.',
    remediationAction: 'Practice labeling opposite, adjacent, and hypotenuse relative to varying acute angles in right triangles.',
    probeQuestion: {
      prompt: 'In right triangle ABC right-angled at B, if side AB = 3 and BC = 4, what is the value of $\\sin A$?',
      options: ['4/5 (BC / AC)', '3/5 (AB / AC)', '3/4 (AB / BC)', '5/4 (AC / BC)'],
      correctIndex: 0,
      explanation: 'Hypotenuse AC = √(3² + 4²) = 5. For angle A, opposite side is BC = 4. Hence sin A = 4/5.'
    }
  },
  'REAL NUMBERS': {
    grade: 9,
    subject: 'Mathematics',
    chapterTitle: 'Number Systems',
    chapterNum: 1,
    conceptTitle: 'Rational vs Irrational Numbers & Prime Factorization',
    axiomSummary: 'Every composite number can be uniquely expressed as a product of prime powers (Fundamental Theorem of Arithmetic).',
    commonMisconception: 'Assuming non-terminating decimals are always irrational without checking for periodic repeating patterns.',
    remediationAction: 'Revisit Class 9 Chapter 1 (Number Systems) to clarify decimal representation properties of rational vs irrational numbers.',
    probeQuestion: {
      prompt: 'Why is the number $0.3333\\dots$ classified as a rational number rather than an irrational number?',
      options: ['It can be expressed in the exact fraction form 1/3 (p/q form)', 'Because it never ends', 'Because all decimals with 3 are rational', 'It is actually irrational'],
      correctIndex: 0,
      explanation: 'Recurring non-terminating decimals can always be converted to fractional p/q form (0.333... = 1/3).'
    }
  },
  'SURFACE AREAS AND VOLUMES': {
    grade: 8,
    subject: 'Mathematics',
    chapterTitle: 'Mensuration',
    chapterNum: 11,
    conceptTitle: '2D Perimeter & Area Formulas to 3D Boundary Conversion',
    axiomSummary: 'Total surface area represents the sum of all exposed face boundaries, while volume represents 3D spatial capacity.',
    commonMisconception: 'Confusing slant height $l = \\sqrt{h^2 + r^2}$ with vertical height $h$ in conical surface area calculations.',
    remediationAction: 'Review Class 8 Chapter 11 (Mensuration) 2D area foundations before calculating curved surface areas of 3D solids.',
    probeQuestion: {
      prompt: 'If a cone has radius $r = 3$ cm and vertical height $h = 4$ cm, what is its slant height $l$?',
      options: ['5 cm ($\\sqrt{3^2 + 4^2}$)', '7 cm (Sum of dimensions)', '12 cm (Product of dimensions)', '3.5 cm (Average)'],
      correctIndex: 0,
      explanation: 'Slant height l = √(r² + h²) = √(9 + 16) = √25 = 5 cm.'
    }
  },
  'PATTERNS IN MATHEMATICS': {
    grade: 6,
    subject: 'Mathematics',
    chapterTitle: 'Knowing Our Numbers',
    chapterNum: 1,
    conceptTitle: 'Number Sequences, Place Value & Successive Differences',
    axiomSummary: 'Mathematical patterns maintain consistent invariant differences or common ratios between sequential terms.',
    commonMisconception: 'Looking only at single term values without calculating the constant difference between consecutive entries.',
    remediationAction: 'Review arithmetic progression steps and difference series.',
    probeQuestion: {
      prompt: 'In the pattern 2, 5, 8, 11, ..., what is the constant rule governing the next term?',
      options: ['Add 3 to the previous term', 'Multiply previous term by 2', 'Add 2 then add 3 alternately', 'Square the index'],
      correctIndex: 0,
      explanation: 'The common difference is 5 - 2 = 8 - 5 = 11 - 8 = +3.'
    }
  },
  'SYMMETRY': {
    grade: 6,
    subject: 'Mathematics',
    chapterTitle: 'Basic Geometrical Ideas',
    chapterNum: 4,
    conceptTitle: 'Line Symmetry & Reflection Invariance',
    axiomSummary: 'A line of symmetry divides a shape into two identical halves that coincide exactly when folded along the line.',
    commonMisconception: 'Assuming the diagonal of any rectangle is a line of symmetry (diagonal does not fold congruent edges into alignment).',
    remediationAction: 'Practice paper-folding tests for reflection symmetry across regular and irregular 2D polygons.',
    probeQuestion: {
      prompt: 'Why is a diagonal of an oblong rectangle NOT a line of reflection symmetry?',
      options: ['Folding along the diagonal causes the vertices to fall outside the opposite boundary', 'Because diagonals are not straight lines', 'Because rectangle has 0 lines of symmetry', 'It actually is a line of symmetry'],
      correctIndex: 0,
      explanation: 'Although a diagonal divides a rectangle into two congruent triangles, folding along it does not make the opposite edges coincide.'
    }
  },

  // --- SCIENCE ---
  'STRUCTURE OF THE ATOM': {
    grade: 9,
    subject: 'Science',
    chapterTitle: 'Atoms and Molecules',
    chapterNum: 3,
    conceptTitle: 'Law of Conservation of Mass & Chemical Formula Writing (Valency)',
    axiomSummary: 'Mass is neither created nor destroyed in chemical reactions; atoms combine according to definite valency combining capacities.',
    commonMisconception: 'Confusing Atomic Number ($Z = \\text{protons}$) with Mass Number ($A = \\text{protons} + \\text{neutrons}$), or violating the Bohr-Bury $2n^2$ electron shell capacity rule.',
    remediationAction: 'Revisit Class 9 Chapter 3 (Atoms and Molecules) to master atomic symbols, valency charts, and the Law of Definite Proportions before computing subatomic distributions.',
    probeQuestion: {
      prompt: 'If an atom has 11 protons and 12 neutrons, what is its Atomic Number ($Z$) and Mass Number ($A$)?',
      options: ['Z = 11, A = 23', 'Z = 12, A = 23', 'Z = 23, A = 11', 'Z = 11, A = 12'],
      correctIndex: 0,
      explanation: 'Atomic Number Z = number of protons = 11 (Sodium). Mass Number A = protons + neutrons = 11 + 12 = 23.'
    }
  },
  'ACIDS, BASES AND SALTS': {
    grade: 7,
    subject: 'Science',
    chapterTitle: 'Acids, Bases and Salts',
    chapterNum: 5,
    conceptTitle: 'Indicators, Neutralisation & pH Characterization',
    axiomSummary: 'Acids release $H^+$ ions in aqueous solution (pH < 7, turn blue litmus red); bases release $OH^-$ ions (pH > 7, turn red litmus blue).',
    commonMisconception: 'Confusing acid strength (degree of ionization) with concentration (amount of water present), or assuming all bases are water-soluble alkalis.',
    remediationAction: 'Review Class 7 Chapter 5 (Acids, Bases and Salts) for indicator reactions before studying stoichiometric pH titration in Class 10.',
    probeQuestion: {
      prompt: 'What color change occurs when Blue Litmus paper is dipped into an acidic solution such as dilute HCl?',
      options: ['Turns Red', 'Turns Green', 'Remains Blue', 'Turns Yellow'],
      correctIndex: 0,
      explanation: 'Acids turn moist blue litmus paper red, while bases turn red litmus paper blue.'
    }
  },
  'CHEMICAL REACTIONS AND EQUATIONS': {
    grade: 9,
    subject: 'Science',
    chapterTitle: 'Atoms and Molecules',
    chapterNum: 3,
    conceptTitle: 'Valency, Chemical Formulae & Law of Conservation of Atoms',
    axiomSummary: 'In a balanced chemical equation, the number of atoms of each element on the reactant side must equal the number of atoms on the product side.',
    commonMisconception: 'Changing chemical subscripts in molecular formulas to balance equations instead of placing stoichiometric coefficients in front.',
    remediationAction: 'Review Class 9 Chapter 3 rules for writing chemical formulas using criss-cross valency before balancing Class 10 reaction equations.',
    probeQuestion: {
      prompt: 'When balancing the equation $H_2 + O_2 \\rightarrow H_2O$, which method is chemically correct?',
      options: ['Place stoichiometric coefficients: $2H_2 + O_2 \\rightarrow 2H_2O$', 'Change the product subscript to $H_2O_2$', 'Change reactant to $H_2 + O \\rightarrow H_2O$', 'Remove the subscript 2 from oxygen'],
      correctIndex: 0,
      explanation: 'Chemical formulas cannot be altered. Balancing is achieved solely by modifying stoichiometric coefficients.'
    }
  },
  'MOTION': {
    grade: 7,
    subject: 'Science',
    chapterTitle: 'Motion and Time',
    chapterNum: 13,
    conceptTitle: 'Speed, Velocity & Distance-Time Graph Interpretation',
    axiomSummary: 'Speed is scalar distance per unit time ($s = d/t$); velocity is vector displacement per unit time; acceleration is rate of change of velocity.',
    commonMisconception: 'Confusing speed with acceleration, or assuming zero acceleration means the object must be at rest (it can move at constant velocity).',
    remediationAction: 'Review Class 7 Chapter 13 graphs to distinguish between uniform speed, variable speed, and stationary slope representations.',
    probeQuestion: {
      prompt: 'If a car travels at a constant velocity of 60 km/h in a straight line for 2 hours, what is its acceleration?',
      options: ['0 m/s² (Velocity is constant)', '30 km/h²', '60 km/h²', '120 km/h'],
      correctIndex: 0,
      explanation: 'Acceleration is the rate of change of velocity: $a = (v - u)/t$. Since velocity is constant ($v = u$), acceleration is 0.'
    }
  },
  'FORCE AND LAWS OF MOTION': {
    grade: 8,
    subject: 'Science',
    chapterTitle: 'Force and Pressure',
    chapterNum: 11,
    conceptTitle: 'Balanced vs Unbalanced Forces & Contact Interactions',
    axiomSummary: 'Unbalanced net external force causes change in state of motion ($F_{net} = ma$); balanced forces cause zero acceleration.',
    commonMisconception: 'Believing that continuous force is needed to sustain constant velocity in frictionless environments (Aristotle fallacy vs Newton 1st Law).',
    remediationAction: 'Review Class 8 Chapter 11 on net force calculation before applying momentum conservation in Class 9.',
    probeQuestion: {
      prompt: 'According to Newton’s First Law of Motion, what happens to an object moving with velocity $v$ in deep space when no external force acts on it?',
      options: ['It continues moving with constant velocity in a straight line forever', 'It gradually slows down and stops', 'It accelerates uncontrollably', 'It changes direction into a circular orbit'],
      correctIndex: 0,
      explanation: 'An object in motion continues in motion with uniform velocity unless acted upon by a net unbalanced external force (Inertia).'
    }
  },
  'ELECTRICITY': {
    grade: 7,
    subject: 'Science',
    chapterTitle: 'Electric Current and Its Effects',
    chapterNum: 14,
    conceptTitle: 'Circuit Components, Closed Loops & Heating Effects',
    axiomSummary: 'Electric current is the rate of flow of electric charge ($I = Q/t$); potential difference $V = W/Q$; Ohm’s Law states $V = IR$.',
    commonMisconception: 'Believing current is "used up" as it travels through resistors in a series loop (current is conserved; potential energy is dissipated).',
    remediationAction: 'Review Class 7 Chapter 14 circuit diagrams and Class 8 chemical effects before calculating equivalent resistance in parallel/series combinations.',
    probeQuestion: {
      prompt: 'In a single closed series circuit with two identical bulbs, how does the current passing through Bulb 1 compare to Bulb 2?',
      options: ['Current is exactly equal in both bulbs (Current is conserved in series)', 'Bulb 1 receives more current than Bulb 2', 'Bulb 2 receives double current', 'Current drops to zero at Bulb 2'],
      correctIndex: 0,
      explanation: 'In a series circuit, current remains constant throughout all connected elements.'
    }
  },
  'LIGHT - REFLECTION AND REFRACTION': {
    grade: 8,
    subject: 'Science',
    chapterTitle: 'Light',
    chapterNum: 16,
    conceptTitle: 'Laws of Reflection & Plane vs Curved Surfaces',
    axiomSummary: 'Angle of incidence equals angle of reflection ($\\angle i = \\angle r$); Snell’s Law governs refraction at boundaries: $n = \\frac{\\sin i}{\\sin r}$.',
    commonMisconception: 'Sign convention mistakes in Cartesian mirror and lens formulas (forgetting focal length of concave mirror is negative).',
    remediationAction: 'Review Class 8 Chapter 16 ray diagram conventions and focal point definitions.',
    probeQuestion: {
      prompt: 'According to the New Cartesian Sign Convention, what is the sign of the focal length ($f$) for a Concave Mirror?',
      options: ['Always Negative (-f)', 'Always Positive (+f)', 'Zero', 'Variable depending on object distance'],
      correctIndex: 0,
      explanation: 'The focus of a concave mirror lies in front of the reflecting surface (to the left of the pole), hence focal length is negative.'
    }
  }
};

/**
 * Diagnostic Engine Core Methods
 */
export class DiagnosticEngine {
  /**
   * Identifies the prerequisite node and generates a diagnostic report for an incorrect answer
   */
  static diagnoseWrongResponse(params: {
    item: AssessmentItem;
    chapterTitle: string;
    grade: number;
    subject: string;
    selectedOptionIndex?: number;
  }): DiagnosticReport {
    const { item, chapterTitle, grade, subject, selectedOptionIndex } = params;
    const cleanChapterKey = chapterTitle.replace(/^(chapter\s*\d+\s*:\s*)/i, '').trim().toUpperCase();
    const promptLower = (item.prompt || '').toLowerCase();

    // 1. First, check granular concept-level keywords inside the specific question prompt
    let itemSpecificPrereq: Partial<PrerequisiteKnowledgeNode> | undefined;

    if (promptLower.includes('triangular') || promptLower.includes('t_n') || promptLower.includes('t_4') || promptLower.includes('t_10') || promptLower.includes('t_3')) {
      itemSpecificPrereq = {
        grade: 6,
        subject: 'Mathematics',
        chapterTitle: 'Whole Numbers',
        chapterNum: 2,
        conceptTitle: 'Geometric Dot Patterns & Triangular Numbers',
        axiomSummary: 'Triangular numbers are generated by triangular dot arrays following the formula $T_n = \\frac{n(n+1)}{2}$.',
        commonMisconception: 'Confusing triangular numbers with simple arithmetic multiples or adding term index instead of cumulative sum.',
        remediationAction: 'Practice constructing triangular dot arrays to intuitively master $T_n = \\frac{n(n+1)}{2}$.',
        probeQuestion: {
          prompt: 'What is the 4th triangular number ($T_4 = 1 + 2 + 3 + 4$)?',
          options: ['10 (Sum of 1+2+3+4)', '8', '12', '16'],
          correctIndex: 0,
          explanation: '$T_4 = \\frac{4(5)}{2} = 10$.'
        }
      };
    } else if (promptLower.includes('matchstick') || promptLower.includes('connected') || promptLower.includes('hexagon') || promptLower.includes('square') && promptLower.includes('stick')) {
      itemSpecificPrereq = {
        grade: 6,
        subject: 'Mathematics',
        chapterTitle: 'Algebra',
        chapterNum: 11,
        conceptTitle: 'Introduction to Variables & Matchstick Pattern Rules',
        axiomSummary: 'In a matchstick shape sequence sharing common edges, the general rule is $k + d(n-1)$, where $k$ is the first unit cost and $d$ is additional sticks per unit.',
        commonMisconception: 'Multiplying single-shape perimeter by $n$ without subtracting shared overlapping edges.',
        remediationAction: 'Revisit Class 6 Chapter 11 (Algebra) to formulate algebraic expressions from visual geometric patterns.',
        probeQuestion: {
          prompt: 'If 1 triangle takes 3 matchsticks and each adjacent attached triangle shares an edge (adding 2 sticks), what is the rule for $n$ triangles?',
          options: ['$2n + 1$', '$3n$', '$2n - 1$', '$3n - 1$'],
          correctIndex: 0,
          explanation: 'First triangle takes 3. Each next adds 2. Rule = $3 + 2(n-1) = 2n + 1$.'
        }
      };
    } else if (promptLower.includes('odd number') || promptLower.includes('consecutive odd') || promptLower.includes('sum of the first')) {
      itemSpecificPrereq = {
        grade: 6,
        subject: 'Mathematics',
        chapterTitle: 'Playing with Numbers',
        chapterNum: 3,
        conceptTitle: 'Properties of Odd Numbers & Perfect Squares',
        axiomSummary: 'The sum of the first $n$ consecutive odd natural numbers is always equal to $n^2$ ($1 + 3 + 5 + \\dots = n^2$).',
        commonMisconception: 'Manually adding large lists of odd numbers and making arithmetic addition slips instead of using $n^2$.',
        remediationAction: 'Review the square pattern property of consecutive odd numbers in Class 6 Playing with Numbers.',
        probeQuestion: {
          prompt: 'What is the sum of the first 5 consecutive odd numbers ($1 + 3 + 5 + 7 + 9$)?',
          options: ['25 ($5^2$)', '20', '30', '24'],
          correctIndex: 0,
          explanation: 'Sum of first $n$ odd numbers is $n^2$. For $n=5$, $5^2 = 25$.'
        }
      };
    } else if (promptLower.includes('calendar') || promptLower.includes('diagonal') || promptLower.includes('matrix') || promptLower.includes('column')) {
      itemSpecificPrereq = {
        grade: 6,
        subject: 'Mathematics',
        chapterTitle: 'Integers',
        chapterNum: 6,
        conceptTitle: '2D Grid Invariance & Modular Arithmetic',
        axiomSummary: 'In a standard 7-day calendar matrix, vertically adjacent dates differ by $+7$, and cross-diagonal $2\\times 2$ sums are always equal ($2d+8$).',
        commonMisconception: 'Assuming diagonal date sums depend on which specific month is chosen rather than the invariant $+7$ grid spacing.',
        remediationAction: 'Explore 2D number grid patterns to understand invariant diagonal symmetry in modular arrays.',
        probeQuestion: {
          prompt: 'In a calendar grid, what is the difference between vertically adjacent dates in the same day column?',
          options: ['7 (A standard week contains 7 days)', '6', '8', '14'],
          correctIndex: 0,
          explanation: 'Dates in the same column recur every 7 days (modulo 7 equivalence).'
        }
      };
    } else if (promptLower.includes('square number') || promptLower.includes('perfect square') || promptLower.includes('5th square')) {
      itemSpecificPrereq = {
        grade: 6,
        subject: 'Mathematics',
        chapterTitle: 'Knowing Our Numbers',
        chapterNum: 1,
        conceptTitle: 'Square Arrays & Exponential Scaling',
        axiomSummary: 'The $n$-th square number represents a square grid of $n \\times n = n^2$ elements.',
        commonMisconception: 'Confusing $n^2$ (multiplying $n$ by itself) with $2n$ (multiplying $n$ by 2).',
        remediationAction: 'Practice geometric square tile arrangements to reinforce $n^2$ vs $2n$.',
        probeQuestion: {
          prompt: 'What is the 6th square number ($6 \\times 6$)?',
          options: ['36 ($6^2$)', '12 ($6 \\times 2$)', '18', '30'],
          correctIndex: 0,
          explanation: 'Square number $n^2$ for $n=6$ is $6 \\times 6 = 36$.'
        }
      };
    }

    // 2. Check chapter level database
    let matchedPrereq: Partial<PrerequisiteKnowledgeNode> | undefined = itemSpecificPrereq || PREREQUISITE_DEPENDENCY_DATABASE[cleanChapterKey];

    if (!matchedPrereq) {
      const foundKey = Object.keys(PREREQUISITE_DEPENDENCY_DATABASE).find(k => cleanChapterKey.includes(k) || k.includes(cleanChapterKey));
      if (foundKey) {
        matchedPrereq = PREREQUISITE_DEPENDENCY_DATABASE[foundKey];
      }
    }

    // 3. Dynamic fallback prerequisite
    const fallbackGrade = Math.max(6, grade - (grade >= 10 ? 1 : 2));
    const finalPrereq: PrerequisiteKnowledgeNode = {
      grade: matchedPrereq?.grade || fallbackGrade,
      subject: matchedPrereq?.subject || subject || 'Academic Subject',
      chapterTitle: matchedPrereq?.chapterTitle || `Foundational ${cleanChapterKey}`,
      chapterNum: matchedPrereq?.chapterNum || 1,
      conceptTitle: matchedPrereq?.conceptTitle || `Core Axiomatic Principles of ${cleanChapterKey}`,
      axiomSummary: matchedPrereq?.axiomSummary || `Fundamental properties and boundary invariants introduced in Class ${fallbackGrade}.`,
      commonMisconception: matchedPrereq?.commonMisconception || `Applying secondary mathematical formulas without verifying primary boundary constraints and axiomatic prerequisites.`,
      remediationAction: matchedPrereq?.remediationAction || `Review Class ${fallbackGrade} foundational concepts for ${cleanChapterKey} to eliminate gaps in underlying intuition.`,
      probeQuestion: matchedPrereq?.probeQuestion || {
        prompt: `In the pattern 2, 5, 8, 11, ..., what is the constant rule governing the next term?`,
        options: [
          `Add 3 to the previous term`,
          `Multiply previous term by 2`,
          `Subtract 1 from previous term`,
          `Square the previous term`
        ],
        correctIndex: 0,
        explanation: `The common difference between terms is $5 - 2 = 3$. Adding 3 gives the successive term.`
      }
    };

    // 4. Classify misconception type
    let misconceptionType: DiagnosticReport['misconceptionType'] = 'FOUNDATIONAL_AXIOM_GAP';
    if (promptLower.includes('angle') || promptLower.includes('parallel') || promptLower.includes('triangle')) {
      misconceptionType = 'INCORRECT_THEOREM_TRANSFER';
    } else if (promptLower.includes('equation') || promptLower.includes('discriminant') || promptLower.includes('rule') || promptLower.includes('term')) {
      misconceptionType = 'SIGN_OR_ALGEBRAIC_SLIP';
    } else if (promptLower.includes('atom') || promptLower.includes('acid') || promptLower.includes('reaction')) {
      misconceptionType = 'CONCEPTUAL_INVERSION';
    }

    const selectedText = item.options && selectedOptionIndex !== undefined ? item.options[selectedOptionIndex] : 'Student Attempted Answer';
    const correctText = item.options && item.correctOptionIndex !== undefined ? item.options[item.correctOptionIndex] : (item.sampleSolution || 'Correct Model Standard');

    return {
      id: `DIAG-${Date.now()}-${item.id}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      failedItemId: item.id,
      currentChapterTitle: chapterTitle,
      currentGrade: grade,
      currentSubject: subject,
      questionPrompt: item.prompt,
      selectedOptionText: selectedText,
      correctOptionText: correctText,
      misconceptionType,
      rootCauseSummary: `Cognitive gap detected in prerequisite "${finalPrereq.conceptTitle}" (Class ${finalPrereq.grade} ${finalPrereq.subject}). ${finalPrereq.commonMisconception}`,
      prerequisite: finalPrereq,
      isResolved: false,
    };
  }
}

