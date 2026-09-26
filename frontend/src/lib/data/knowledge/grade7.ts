/**
 * Brainoro Authoritative Curriculum Knowledge Registry
 * File: grade7.ts
 * Total Chapters: 32
 * 100% Authentic NCF-SE / NCERT 2026-27 Knowledge Payload
 * (Math: 8 Chapters Ganita Prakash Part-I | English: 5 Units Poorvi)
 */

import { DeterministicChapterKnowledge } from '../../services/deterministicChapterRegistry';

export const GRADE7_KNOWLEDGE: Record<string, DeterministicChapterKnowledge> = {
  "CBSE-CH-G7-MATH-CH01": {
    "chapterTitle": "Large Numbers Around Us",
    "subject": "Mathematics",
    "grade": 7,
    "chapterNum": 1,
    "essentialLaw": "\\text{Place Value Scale: } 1 \\text{ Crore} = 100 \\text{ Lakhs} = 10^7 \\quad | \\quad 1 \\text{ Billion} = 1000 \\text{ Millions} = 10^9 \\quad | \\quad 10^a \\times 10^b = 10^{a+b}",
    "coreConcepts": [
      {
        "heading": "Indian & International Numeration Systems",
        "bullets": [
          "Indian System: Units, Tens, Hundreds, Thousands, Ten Thousands, Lakhs, Ten Lakhs, Crores, Ten Crores ($10^0$ to $10^8$). Commas placed as $3, 2, 2, 2$ digits from right.",
          "International System: Ones, Tens, Hundreds, Thousands, Ten Thousands, Hundred Thousands, Millions, Ten Millions, Hundred Millions, Billions ($10^0$ to $10^9$). Commas placed every 3 digits ($3, 3, 3$).",
          "Conversion Bridge: $1\\text{ Million} = 10\\text{ Lakhs} = 10^6$; $10\\text{ Millions} = 1\\text{ Crore} = 10^7$; $1\\text{ Billion} = 100\\text{ Crores} = 10^9$."
        ]
      },
      {
        "heading": "Estimation, Rounding & Exponential Powers",
        "bullets": [
          "Rounding off rules: If the target unit digit is $< 5$, round down; if $\\ge 5$, round up.",
          "Order of magnitude estimations in real-world contexts: Counting rice grains in sacks, national census demographics, astronomical planetary distances.",
          "Multiplying and dividing powers of 10 by shifting decimal places and adding/subtracting exponents."
        ]
      }
    ],
    "examTraps": [
      "Confusing comma placements between Indian ($1,23,45,678$) and International ($12,345,678$) systems.",
      "Miscalculating conversion factors (e.g. thinking $1\\text{ Billion} = 10\\text{ Crores}$ instead of $100\\text{ Crores}$)."
    ],
    "quickMentalCheck": "How many lakhs make 5 million? (Answer: $1\\text{ million} = 10\\text{ lakhs} \\implies 5\\text{ million} = 50\\text{ lakhs}$).",
    "cueQuestions": [
      "Why does the International system group digits into triplets while the Indian system uses pairs after the first triplet?",
      "How does estimation help verify whether a multi-digit multiplication result is reasonable?",
      "How are powers of 10 used to express astronomical distances like light-years conveniently?"
    ],
    "workedExample": {
      "problem": "Express $45,000,000$ in both the Indian and International systems in words, and convert it to Crores.",
      "steps": [
        "International System: $45,000,000$ has commas every 3 digits $\\implies$ 'Forty-five million'.",
        "Indian System: Place commas as $4,50,00,000$ $\\implies$ 'Four crore fifty lakh'.",
        "Conversion to Crores: $45,000,000 / 10^7 = 4.5\\text{ Crores}$."
      ],
      "result": "International: Forty-five million; Indian: Four crore fifty lakh (4.5 Crores)"
    },
    "verificationProblem": "Convert back: $4.5 \\times 10^7 = 45,000,000$. Verified.",
    "realWorldUse": "Used in national budgets, banking transaction limits, census data analytics, and astronomical measurements.",
    "diagramType": "place-value-chart-indian-international"
  },
  "CBSE-CH-G7-MATH-CH02": {
    "chapterTitle": "Arithmetic Expressions",
    "subject": "Mathematics",
    "grade": 7,
    "chapterNum": 2,
    "essentialLaw": "\\text{Operator Precedence: } \\text{BODMAS} \\implies \\text{Brackets } [ \\{ ( ) \\} ] \\to \\text{Orders/Of} \\to \\text{Division/Multiplication} \\to \\text{Addition/Subtraction}",
    "coreConcepts": [
      {
        "heading": "Order of Operations & Nested Brackets",
        "bullets": [
          "BODMAS / PEMDAS hierarchy: Operations inside innermost parentheses $( )$ are executed first, followed by curly braces $\\{ \\}$, and finally square brackets $[ ]$.",
          "Multiplication and Division have equal precedence and are evaluated from left to right.",
          "Addition and Subtraction have equal precedence and are evaluated from left to right."
        ]
      },
      {
        "heading": "Formulating Arithmetic Expressions from Real Problems",
        "bullets": [
          "Translating verbal word descriptions into rigorous symbolic mathematical expressions.",
          "Using the Distributive Property $a(b + c) = ab + ac$ and $a(b - c) = ab - ac$ to simplify arithmetic calculations mentally.",
          "The role of grouping to indicate precedence and prevent ambiguity."
        ]
      }
    ],
    "examTraps": [
      "Performing addition before multiplication in expressions like $6 + 4 \\times 5$ (correct is $6 + 20 = 26$, NOT $10 \\times 5 = 50$).",
      "Forgetting to distribute the negative sign when removing brackets: $-(a - b) = -a + b$."
    ],
    "quickMentalCheck": "Evaluate $20 - 2 \\times (5 + 3)$. (Answer: $20 - 2 \\times 8 = 20 - 16 = 4$).",
    "cueQuestions": [
      "Why is a strict order of operations necessary for mathematics to be unambiguous?",
      "How do brackets alter the fundamental meaning and outcome of an expression?",
      "How does the distributive law help compute $18 \\times 99$ mentally?"
    ],
    "workedExample": {
      "problem": "Evaluate the arithmetic expression: $45 - [38 - \\{60 \\div 3 - (6 - 9 \\div 3)\\}]$.",
      "steps": [
        "Innermost bracket: $6 - 9 \\div 3 = 6 - 3 = 3$.",
        "Curly braces: $\\{60 \\div 3 - 3\\} = \\{20 - 3\\} = 17$.",
        "Square bracket: $[38 - 17] = 21$.",
        "Final subtraction: $45 - 21 = 24$."
      ],
      "result": "24"
    },
    "verificationProblem": "Step trace: $45 - [38 - (20 - 3)] = 45 - [38 - 17] = 45 - 21 = 24$. Verified.",
    "realWorldUse": "Used in programming language compilers, financial spreadsheet formulas, and POS cash register algorithms.",
    "diagramType": "bodmas-bracket-hierarchy-tree"
  },
  "CBSE-CH-G7-MATH-CH03": {
    "chapterTitle": "A Peek Beyond the Point",
    "subject": "Mathematics",
    "grade": 7,
    "chapterNum": 3,
    "essentialLaw": "\\text{Decimal Expansion: } N = d_k 10^k + \\dots + d_0 10^0 + d_{-1} 10^{-1} + d_{-2} 10^{-2} + d_{-3} 10^{-3} \\quad | \\quad 10^{-1} = \\frac{1}{10}, 10^{-2} = \\frac{1}{100}",
    "coreConcepts": [
      {
        "heading": "Positional Value of Decimal Digits",
        "bullets": [
          "Tenths ($\\frac{1}{10} = 0.1$), Hundredths ($\\frac{1}{100} = 0.01$), and Thousandths ($\\frac{1}{1000} = 0.001$).",
          "Representing decimals on the number line between integers.",
          "Equivalent decimals: Adding trailing zeroes to the right of the last decimal digit does not change its value ($0.5 = 0.50 = 0.500$)."
        ]
      },
      {
        "heading": "Comparing, Adding & Subtracting Decimals",
        "bullets": [
          "Comparing decimals: Compare whole number parts first; if equal, compare tenths, then hundredths, etc.",
          "Addition and Subtraction of decimals: Align decimal points vertically before operating.",
          "Conversion between units: Converting paise to rupees ($\\div 100$), mm to cm ($\\div 10$), cm to m ($\\div 100$), grams to kg ($\\div 1000$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming a decimal with more digits is always larger (e.g. thinking $0.125 > 0.4$ because $125 > 4$; actually $0.4 = 0.400 > 0.125$).",
      "Misaligning decimal points during addition/subtraction ($12.3 + 4.56 \\neq 16.86$ if written as $12.30 + 4.56 = 16.86$)."
    ],
    "quickMentalCheck": "Which is greater: $0.7$ or $0.07$? (Answer: $0.7$, since 7 tenths > 0 tenths).",
    "cueQuestions": [
      "Why does annexing zeroes to the extreme right of a decimal not alter its quantitative value?",
      "How do we represent fractions with denominators other than powers of 10 as decimals?",
      "How does decimal alignment ensure place-value consistency during subtraction?"
    ],
    "workedExample": {
      "problem": "Subtract $18.75\\text{ kg}$ from $45.2\\text{ kg}$.",
      "steps": [
        "Convert to like decimals by adding trailing zero: $45.20\\text{ kg}$ and $18.75\\text{ kg}$.",
        "Align vertically: \\n  45.20\\n- 18.75",
        "Borrow across decimal point: $10 - 5 = 5$, $11 - 7 = 4$, $14 - 8 = 6$, $3 - 1 = 2$.",
        "Result: $26.45\\text{ kg}$."
      ],
      "result": "26.45 kg"
    },
    "verificationProblem": "Add back: $26.45 + 18.75 = 45.20\\text{ kg}$. Verified.",
    "realWorldUse": "Used in medical dosage measurements, Olympic timing sensors (milliseconds), currency exchange, and scientific weighing balances.",
    "diagramType": "decimal-place-value-numberline"
  },
  "CBSE-CH-G7-MATH-CH04": {
    "chapterTitle": "Expressions Using Letter-Numbers",
    "subject": "Mathematics",
    "grade": 7,
    "chapterNum": 4,
    "essentialLaw": "\\text{Algebraic Representation: } ax + b \\quad | \\quad \\text{Combining Like Terms: } px + qx = (p+q)x \\quad | \\quad \\text{Value: Substitute } x = k",
    "coreConcepts": [
      {
        "heading": "Variables, Constants & Algebraic Terms",
        "bullets": [
          "A variable (letter-number $x, y, a, n$) represents an unknown or changing quantity; a constant has a fixed numerical value.",
          "Algebraic terms are formed by multiplying variables and constants (e.g. in $5x^2$, $5$ is numerical coefficient, $x$ is variable).",
          "Like terms have identical variable algebraic factors ($3xy$ and $-7xy$); Unlike terms have different variable factors ($3x$ and $3y$)."
        ]
      },
      {
        "heading": "Operations on Algebraic Expressions & Evaluation",
        "bullets": [
          "Only LIKE terms can be added or subtracted: $4x + 7x = 11x$, but $4x + 7y$ cannot be combined.",
          "Forming expressions from geometric rules: Perimeter of square $= 4s$, perimeter of rectangle $= 2(l+b)$.",
          "Evaluating expressions by substituting given numerical values for the letter-numbers."
        ]
      }
    ],
    "examTraps": [
      "Adding coefficients of unlike terms (e.g. writing $2a + 3b = 5ab$ is a major error; $2a+3b$ remains $2a+3b$).",
      "Forgetting order of operations when evaluating expressions with exponents ($3x^2$ for $x=2$ is $3(4) = 12$, NOT $(3 \\times 2)^2 = 36$)."
    ],
    "quickMentalCheck": "Find the value of $5x - 3$ when $x = 4$. (Answer: $5(4) - 3 = 20 - 3 = 17$).",
    "cueQuestions": [
      "Why can variables be treated like generalized numbers in arithmetic operations?",
      "What is the fundamental difference between like terms and unlike terms?",
      "How do algebraic expressions generalize geometric formulas for any dimension?"
    ],
    "workedExample": {
      "problem": "Simplify the expression by combining like terms: $7x^2 - 4x + 5 + 3x^2 + 9x - 12$, and find its value for $x = 2$.",
      "steps": [
        "Group like terms: $(7x^2 + 3x^2) + (-4x + 9x) + (5 - 12)$.",
        "Combine coefficients: $10x^2 + 5x - 7$.",
        "Substitute $x = 2$: $10(2^2) + 5(2) - 7 = 10(4) + 10 - 7 = 40 + 10 - 7 = 43$."
      ],
      "result": "Simplified: 10x^2 + 5x - 7; Value at x=2 is 43"
    },
    "verificationProblem": "Substitute $x=2$ in original: $7(4) - 4(2) + 5 + 3(4) + 9(2) - 12 = 28 - 8 + 5 + 12 + 18 - 12 = 43$. Verified.",
    "realWorldUse": "Forms the foundation for coding variables in Python/JavaScript, engineering formulas, dynamic pricing models, and scientific algorithms.",
    "diagramType": "algebraic-term-anatomy"
  },
  "CBSE-CH-G7-MATH-CH05": {
    "chapterTitle": "Parallel and Intersecting",
    "subject": "Mathematics",
    "grade": 7,
    "chapterNum": 5,
    "essentialLaw": "l \\parallel m \\iff \\text{Alt. Int. } \\angle 3 = \\angle 5 \\iff \\text{Corr. } \\angle 1 = \\angle 5 \\iff \\text{Co-interior } \\angle 3 + \\angle 6 = 180^\\circ \\quad | \\quad \\text{Vert. Opp. } \\angle 1 = \\angle 3",
    "coreConcepts": [
      {
        "heading": "Lines, Angles & Intersection Relationships",
        "bullets": [
          "Intersecting lines meet at exactly one common point. Vertically opposite angles formed at intersection are always equal ($m\\angle 1 = m\\angle 3$).",
          "Linear Pair: Two adjacent angles whose non-common arms are opposite rays sum to $180^\\circ$ ($m\\angle 1 + m\\angle 2 = 180^\\circ$).",
          "Perpendicular lines intersect at right angles ($90^\\circ$)."
        ]
      },
      {
        "heading": "Parallel Lines & Transversal Geometry",
        "bullets": [
          "Parallel lines lie in the same plane and never intersect, maintaining a constant perpendicular distance throughout.",
          "Transversal: A line that intersects two or more lines at distinct points.",
          "When a transversal intersects two parallel lines: (1) Corresponding angles are equal, (2) Alternate interior angles are equal, (3) Alternate exterior angles are equal, (4) Co-interior (consecutive interior) angles are supplementary (sum to $180^\\circ$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming co-interior angles are equal; co-interior angles are SUPPLEMENTARY (sum to $180^\\circ$), while alternate angles are EQUAL.",
      "Applying transversal equality theorems to lines that are not parallel."
    ],
    "quickMentalCheck": "If two parallel lines are cut by a transversal and one interior angle is $70^\\circ$, what is its co-interior angle? (Answer: $180^\\circ - 70^\\circ = 110^\\circ$).",
    "cueQuestions": [
      "How do we prove that two lines are parallel using the alternate angle test?",
      "Why are vertically opposite angles always equal regardless of line orientation?",
      "What happens to corresponding angles if the intersected lines are non-parallel?"
    ],
    "workedExample": {
      "problem": "In the figure, line $l \\parallel m$ and transversal $t$ cuts them. If $\\angle 1 = 65^\\circ$, find the measures of all remaining 7 angles.",
      "steps": [
        "$\\angle 3 = \\angle 1 = 65^\\circ$ (Vertically opposite angle).",
        "$\\angle 2 = 180^\\circ - \\angle 1 = 180^\\circ - 65^\\circ = 115^\\circ$ (Linear pair).",
        "$\\angle 4 = \\angle 2 = 115^\\circ$ (Vertically opposite angle).",
        "By parallel line properties: Corresponding angles $\\angle 5 = \\angle 1 = 65^\\circ$, $\\angle 6 = \\angle 2 = 115^\\circ$, $\\angle 7 = \\angle 3 = 65^\\circ$, $\\angle 8 = \\angle 4 = 115^\\circ$."
      ],
      "result": "Angles are 65 deg (four angles) and 115 deg (four angles)."
    },
    "verificationProblem": "Check co-interior sum: $\\angle 3 + \\angle 6 = 65^\\circ + 115^\\circ = 180^\\circ$. Supplementary verified.",
    "realWorldUse": "Crucial in architectural floor plans, railway track alignments, bridge truss design, and optical ray tracing.",
    "diagramType": "parallel-lines-transversal-angles"
  },
  "CBSE-CH-G7-MATH-CH06": {
    "chapterTitle": "Number Play",
    "subject": "Mathematics",
    "grade": 7,
    "chapterNum": 6,
    "essentialLaw": "\\text{General Form: } \\overline{ab} = 10a + b \\quad | \\quad \\overline{ab} - \\overline{ba} = 9(a - b) \\; (\\text{Divisible by 9}) \\quad | \\quad \\overline{ab} + \\overline{ba} = 11(a + b) \\; (\\text{Divisible by 11})",
    "coreConcepts": [
      {
        "heading": "Generalized Form of Numbers & Inherent Properties",
        "bullets": [
          "A two-digit number with tens digit $a$ and units digit $b$ is written as $10a + b$. Reversing digits gives $10b + a$.",
          "The difference between any 2-digit number and its reverse is always a multiple of 9: $(10a + b) - (10b + a) = 9(a - b)$.",
          "The sum of any 2-digit number and its reverse is always a multiple of 11: $(10a + b) + (10b + a) = 11(a + b)$."
        ]
      },
      {
        "heading": "Cryptarithms, Magic Squares & Divisibility Proofs",
        "bullets": [
          "Cryptarithms (Alphametics): Mathematical puzzles where digits are replaced by letters; each letter represents a distinct digit ($0-9$).",
          "Magic Squares: $3 \\times 3$ grid where sum of numbers in every row, column, and diagonal is identical (Magic Constant $= 15$ for numbers 1 to 9).",
          "Algebraic proofs of divisibility rules for $3, 9, 11$ using expanded base-10 notation."
        ]
      }
    ],
    "examTraps": [
      "Assigning the same digit to two different letters in an alphametic puzzle.",
      "Allowing the leading digit of a number to be zero (e.g., $A$ in $\\overline{AB}$ cannot be $0$)."
    ],
    "quickMentalCheck": "If you reverse the digits of 73 to get 37, what is $73 - 37$ divided by 9? (Answer: $7 - 3 = 4$).",
    "cueQuestions": [
      "Why is the difference between a three-digit number and its reverse always divisible by 99?",
      "How do we use unit digit parity and carryover constraints to solve cryptarithms systematically?",
      "What is the algebraic proof that a number is divisible by 3 if the sum of its digits is divisible by 3?"
    ],
    "workedExample": {
      "problem": "Find the values of digits $A$ and $B$ in the addition cryptarithm: \\n  3 A\\n+ 2 5\\n-----\\n  B 2",
      "steps": [
        "Look at units column: $A + 5$ ends in $2$.",
        "Since $A$ is a single digit, $A + 5 = 12 \\implies A = 12 - 5 = 7$ (with carry 1 to tens column).",
        "Look at tens column: $1 \\text{ (carry)} + 3 + 2 = B \\implies B = 6$.",
        "Check addition: $37 + 25 = 62$. Matches perfectly."
      ],
      "result": "A = 7, B = 6"
    },
    "verificationProblem": "Test: $37 + 25 = 62$. $A=7, B=6$. Correct. Verified.",
    "realWorldUse": "Used in cryptography encryption algorithms, mathematical recreation puzzles, Sudoku logic engines, and error detection parity codes.",
    "diagramType": "cryptarithm-logic-grid"
  },
  "CBSE-CH-G7-MATH-CH07": {
    "chapterTitle": "A Tale of Three Intersecting Lines",
    "subject": "Mathematics",
    "grade": 7,
    "chapterNum": 7,
    "essentialLaw": "\\angle A + \\angle B + \\angle C = 180^\\circ \\quad | \\quad \\angle \\text{ext} = \\angle A + \\angle B \\quad | \\quad a + b > c \\; (\\text{Triangle Inequality})",
    "coreConcepts": [
      {
        "heading": "Triangles Formed by Three Intersecting Lines",
        "bullets": [
          "Three mutually intersecting, non-concurrent lines enclose a 3-sided closed polygon called a Triangle.",
          "Classification by Sides: Equilateral (3 equal sides, all angles $60^\\circ$), Isosceles (2 equal sides and 2 equal base angles), Scalene (all sides and angles unequal).",
          "Classification by Angles: Acute-angled, Right-angled (satisfies Pythagoras theorem $a^2+b^2=c^2$), Obtuse-angled."
        ]
      },
      {
        "heading": "Core Theorems: Angle Sum, Exterior Angle & Medians/Altitudes",
        "bullets": [
          "Angle Sum Property: The sum of the interior angles of any triangle is strictly $180^\\circ$ ($\\angle A + \\angle B + \\angle C = 180^\\circ$).",
          "Exterior Angle Theorem: An exterior angle of a triangle is equal to the sum of its two interior opposite angles.",
          "Median: Line segment joining a vertex to the midpoint of opposite side (Centroid); Altitude: Perpendicular from vertex to opposite side (Orthocentre).",
          "Triangle Inequality Theorem: The sum of lengths of any two sides must be strictly greater than the third side ($a+b > c, b+c > a, c+a > b$)."
        ]
      }
    ],
    "examTraps": [
      "Equating an exterior angle to its adjacent supplementary interior angle instead of the two *interior opposite* angles.",
      "Attempting to draw a triangle with sides $4\\text{ cm}, 5\\text{ cm}, 10\\text{ cm}$ (impossible because $4 + 5 = 9 < 10$)."
    ],
    "quickMentalCheck": "If two angles of a triangle are $50^\\circ$ and $70^\\circ$, find the third angle. (Answer: $180^\\circ - (50^\\circ + 70^\\circ) = 60^\\circ$).",
    "cueQuestions": [
      "How does drawing a line parallel to the base through the opposite vertex prove the Angle Sum Property?",
      "Why must the exterior angle of a triangle always be strictly greater than either of its interior opposite angles?",
      "What is the geometric difference between a triangle's median and its altitude?"
    ],
    "workedExample": {
      "problem": "In $\\Delta ABC$, an exterior angle at vertex $C$ measures $125^\\circ$. If one of the interior opposite angles $\\angle A = 55^\\circ$, find $\\angle B$ and interior $\\angle ACB$.",
      "steps": [
        "Apply Exterior Angle Theorem: $\\text{Ext. } \\angle C = \\angle A + \\angle B$.",
        "Substitute values: $125^\\circ = 55^\\circ + \\angle B \\implies \\angle B = 125^\\circ - 55^\\circ = 70^\\circ$.",
        "Find interior $\\angle ACB$ using linear pair: $\\angle ACB = 180^\\circ - 125^\\circ = 55^\\circ$.",
        "Verify angle sum: $\\angle A + \\angle B + \\angle ACB = 55^\\circ + 70^\\circ + 55^\\circ = 180^\\circ$."
      ],
      "result": "Angle B = 70 deg, Angle ACB = 55 deg"
    },
    "verificationProblem": "Check exterior angle: $55^\\circ + 70^\\circ = 125^\\circ$. Verified.",
    "realWorldUse": "Used in structural triangulation for cranes and roof trusses, GPS satellite trilateration, land surveying, and navigation.",
    "diagramType": "triangle-angle-sum-exterior-theorem"
  },
  "CBSE-CH-G7-MATH-CH08": {
    "chapterTitle": "Working with Fractions",
    "subject": "Mathematics",
    "grade": 7,
    "chapterNum": 8,
    "essentialLaw": "\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd} \\quad | \\quad \\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c} = \\frac{ad}{bc} \\quad (b, c, d \\neq 0)",
    "coreConcepts": [
      {
        "heading": "Multiplication of Proper, Improper & Mixed Fractions",
        "bullets": [
          "Fraction as an operator 'of': $\\frac{1}{2} \\text{ of } 24 = \\frac{1}{2} \\times 24 = 12$.",
          "Product of two proper fractions is always LESS than each of the individual fractions (e.g., $\\frac{1}{2} \\times \\frac{1}{3} = \\frac{1}{6}$).",
          "Product of two improper fractions is always GREATER than each of the individual fractions.",
          "Converting mixed fractions to improper fractions prior to multiplication."
        ]
      },
      {
        "heading": "Division of Fractions & Reciprocal Concept",
        "bullets": [
          "Reciprocal (Multiplicative Inverse): Non-zero number $\\frac{a}{b}$ has reciprocal $\\frac{b}{a}$ such that $\\frac{a}{b} \\times \\frac{b}{a} = 1$.",
          "Dividing a fraction by another fraction is equivalent to multiplying the dividend by the reciprocal of the divisor.",
          "Simplifying fractions to lowest terms (canonical form) by dividing numerator and denominator by their HCF."
        ]
      }
    ],
    "examTraps": [
      "Taking the reciprocal of the dividend instead of the divisor during division ($\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$, NOT $\\frac{b}{a} \\times \\frac{c}{d}$).",
      "Multiplying whole numbers with mixed fractions without converting mixed fraction to improper first."
    ],
    "quickMentalCheck": "Evaluate $\\frac{3}{4} \\div \\frac{9}{16}$. (Answer: $\\frac{3}{4} \\times \\frac{16}{9} = \\frac{1}{1} \\times \\frac{4}{3} = \\frac{4}{3}$).",
    "cueQuestions": [
      "Why is the product of two proper fractions smaller than both original factors?",
      "How does the concept of reciprocal convert fraction division into multiplication?",
      "Why does dividing by a fraction smaller than 1 amplify the original dividend?"
    ],
    "workedExample": {
      "problem": "A car travels $3 \\frac{1}{2}\\text{ km}$ on $1\\text{ litre}$ of petrol. How much distance will it cover using $2 \\frac{2}{3}\\text{ litres}$ of petrol?",
      "steps": [
        "Convert mixed fractions to improper fractions: $3 \\frac{1}{2} = \\frac{7}{2}$, $2 \\frac{2}{3} = \\frac{8}{3}$.",
        "Total distance = $\\text{Distance per litre} \\times \\text{Total litres} = \\frac{7}{2} \\times \\frac{8}{3}$.",
        "Multiply numerators and denominators: $\\frac{7 \\times 8}{2 \\times 3} = \\frac{56}{6}$.",
        "Simplify by dividing numerator and denominator by $2$: $\\frac{28}{3} = 9 \\frac{1}{3}\\text{ km}$."
      ],
      "result": "9 1/3 km (or 28/3 km)"
    },
    "verificationProblem": "Divide total distance by fuel: $\\frac{28}{3} \\div \\frac{8}{3} = \\frac{28}{3} \\times \\frac{3}{8} = \\frac{28}{8} = \\frac{7}{2} = 3 \\frac{1}{2}\\text{ km/l}$. Verified.",
    "realWorldUse": "Used in culinary recipe scaling, fabric cutting in garment tailoring, architectural scale drawings, and precision chemical dosing.",
    "diagramType": "fraction-area-multiplication-model"
  },
  "CBSE-CH-G7-ENG-CH01": {
    "chapterTitle": "Learning Together",
    "subject": "English",
    "grade": 7,
    "chapterNum": 1,
    "essentialLaw": "\\text{Thematic Unit 1: Inclusive Learning, Empathy, Determination \\& Gratitude}",
    "coreConcepts": [
      {
        "heading": "Literary Compositions in Unit 1",
        "bullets": [
          "1. 'The Day the River Spoke': Story of Janaki, a determined disabled girl who finds courage through communion with nature and overcomes societal barriers to attend school.",
          "2. 'Try Again' (Poem by W.E. Hickson): Universal didactic verse celebrating persistence, resilience after defeat, and patient striving.",
          "3. 'Three Days to See' (Essay by Helen Keller): Deeply philosophical memoir urging sighted individuals to cultivate mindfulness and deep gratitude for their senses."
        ]
      },
      {
        "heading": "Pedagogical Themes & Language Development",
        "bullets": [
          "Empathy towards differently-abled peers and promoting inclusive educational environments.",
          "Grammar & Vocabulary: Conjunctions, descriptive sensory adjectives, idioms of encouragement, and reflective paragraph writing."
        ]
      }
    ],
    "examTraps": [
      "Confusing the message of Helen Keller's essay as seeking sympathy rather than offering a profound lesson on mindful awareness to sighted people.",
      "Overlooking the personification of the river in Janaki's story."
    ],
    "quickMentalCheck": "What is the unifying theme of Unit 1 'Learning Together'? (Answer: Education, resilience, inclusive empathy, and sensory appreciation).",
    "cueQuestions": [
      "How do Janaki and Helen Keller demonstrate that physical limitations cannot constrain the human spirit?",
      "What is the central moral lesson of the poem 'Try Again'?",
      "How does cooperative learning foster empathy among diverse learners in a classroom?"
    ],
    "workedExample": {
      "problem": "Explain how Unit 1 connects the stories of Janaki and Helen Keller to inspire students.",
      "steps": [
        "Janaki overcomes physical disability and social barriers to step into a formal school.",
        "Helen Keller, living without sight and hearing, teaches the world how to cherish every sensory touch and moment.",
        "Both narratives champion inner resilience, self-belief, and the transformative joy of education.",
        "They encourage students to embrace inclusive values and continuous learning."
      ],
      "result": "Both texts illustrate that determination and mindful gratitude conquer all physical adversities."
    },
    "verificationProblem": "Unit 1 texts verified: The Day the River Spoke, Try Again, Three Days to See. Verified.",
    "realWorldUse": "Promotes inclusive classroom culture, accessible school infrastructure, and emotional intelligence in youth.",
    "diagramType": "unit-thematic-mindmap"
  },
  "CBSE-CH-G7-ENG-CH02": {
    "chapterTitle": "Wit and Humour",
    "subject": "English",
    "grade": 7,
    "chapterNum": 2,
    "essentialLaw": "\\text{Thematic Unit 2: Cross-Species Communication, Comic Versification \\& Interpersonal Tact}",
    "coreConcepts": [
      {
        "heading": "Literary Compositions in Unit 2",
        "bullets": [
          "1. 'Animals, Birds, and Dr. Dolittle' (Hugh Lofting): Humorous story where Dr. Dolittle learns animal language from Polynesia the parrot, advocating inter-species compassion.",
          "2. 'A Funny Man': Humorous poetry using hyperbole, eccentric behavior, and whimsical rhyme to bring joy and laughter.",
          "3. 'Say the Right Thing': Narrative highlighting pragmatic communication, diplomacy, active listening, and choosing words tactfully."
        ]
      },
      {
        "heading": "Literary Techniques & Language Skills",
        "bullets": [
          "Humor as a social lubricant: Using satire and comedy to highlight human eccentricities without malice.",
          "Grammar & Usage: Reported speech, modal auxiliaries of politeness (could, would, may), and comedic hyperbole."
        ]
      }
    ],
    "examTraps": [
      "Thinking Dr. Dolittle only learned animal sounds; animal language in the story is predominantly non-verbal body language.",
      "Confusing blunt rudeness with honest communication."
    ],
    "quickMentalCheck": "Who taught Dr. Dolittle to understand animal body language? (Answer: Polynesia the parrot).",
    "cueQuestions": [
      "How does humor help convey serious lessons about animal welfare and human tact?",
      "What poetic devices create comedy in 'A Funny Man'?",
      "Why is choosing the right words essential for de-escalating conflicts?"
    ],
    "workedExample": {
      "problem": "Discuss the significance of tactful speech as presented in 'Say the Right Thing'.",
      "steps": [
        "Analyze the power of language: Words can either build bridges or provoke hostility.",
        "Explain tact: Delivering honest feedback respectfully with empathy for the listener's feelings.",
        "Show how polite modal phrases ('Could you please consider...') transform conversations.",
        "Conclude that tact is emotional intelligence in verbal action."
      ],
      "result": "Tactful communication preserves relationships while communicating truth effectively."
    },
    "verificationProblem": "Unit 2 texts verified: Animals Birds & Dr. Dolittle, A Funny Man, Say the Right Thing. Verified.",
    "realWorldUse": "Enhances public speaking, diplomatic negotiation, conflict mediation, and creative writing.",
    "diagramType": "wit-humour-communication-flow"
  },
  "CBSE-CH-G7-ENG-CH03": {
    "chapterTitle": "Dreams and Discoveries",
    "subject": "English",
    "grade": 7,
    "chapterNum": 3,
    "essentialLaw": "\\text{Thematic Unit 3: Innovation, Sibling Camaraderie, Childhood Imagination \\& Global Kinship}",
    "coreConcepts": [
      {
        "heading": "Literary Compositions in Unit 3",
        "bullets": [
          "1. 'My Brother's Great Invention': Humorous realistic fiction showing trial-and-error scientific curiosity and warm sibling camaraderie.",
          "2. 'Paper Boats' (Rabindranath Tagore): Lyrical masterpiece capturing a child's pure imagination, launching dreams and Shiuli flowers down the running stream.",
          "3. 'North, South, East, West': Poetry exploring boundless curiosity about all four corners of the world."
        ]
      },
      {
        "heading": "Themes of Creativity & Expression",
        "bullets": [
          "Nurturing inventive spirit: Embracing experimentation and learning from comical prototype failures.",
          "Tagorean lyricism: Metaphors of white sailing clouds, running streams, and universal human connection.",
          "Grammar: Tenses, creative descriptive writing, and poetic imagery analysis."
        ]
      }
    ],
    "examTraps": [
      "Viewing the failed invention as a defeat rather than a celebration of youthful curiosity and learning.",
      "Interpreting paper boats purely literally instead of recognizing them as symbols of dreams and identity."
    ],
    "quickMentalCheck": "What flowers did the child place in his paper boats in Tagore's poem? (Answer: Shiuli flowers gathered at dawn).",
    "cueQuestions": [
      "How does Tagore use paper boats to symbolize innocent longing for global connection?",
      "What role does playful experimentation play in real-world scientific inventions?",
      "How is the bond between brothers depicted during their mechanical misadventures?"
    ],
    "workedExample": {
      "problem": "Explain the poetic symbolism of launching paper boats in Tagore's lyric.",
      "steps": [
        "The child writes their name and village on the boats, seeking connection with unknown friends across the world.",
        "Loading Shiuli blossoms represents sending fresh, fragrant gifts of love.",
        "The floating boats navigating the running stream symbolize launching pure human dreams into the river of life.",
        "Conclude that the poem celebrates universal brotherhood and the magic of child imagination."
      ],
      "result": "Paper boats symbolize the innocent, hopeful dreams of childhood sent into the wider universe."
    },
    "verificationProblem": "Unit 3 texts verified: My Brother's Great Invention, Paper Boats, North South East West. Verified.",
    "realWorldUse": "Inspires STEM maker-culture in schools, creative literary writing, and cross-cultural friendship.",
    "diagramType": "dreams-discovery-creative-arc"
  },
  "CBSE-CH-G7-ENG-CH04": {
    "chapterTitle": "Travel and Adventure",
    "subject": "English",
    "grade": 7,
    "chapterNum": 4,
    "essentialLaw": "\\text{Thematic Unit 4: Nature Exploration, Mountain Fortitude \\& Coexistence with Wildlife}",
    "coreConcepts": [
      {
        "heading": "Literary Compositions in Unit 4",
        "bullets": [
          "1. 'The Tunnel' (Ruskin Bond): Ranji and watchman Sunder Singh's peaceful encounter with a wild leopard in a Himalayan railway tunnel, emphasizing mutual respect with nature.",
          "2. 'Travel' (Poem): The yearning to journey across distant lands, ride roaring trains, and discover new geographies.",
          "3. 'Conquering the Summit': Gripping narrative of mountaineering grit, teamwork, survival in freezing blizzards, and standing atop majestic Himalayan peaks."
        ]
      },
      {
        "heading": "Themes of Adventure & Ecological Harmony",
        "bullets": [
          "Overcoming fear through understanding: Seeing wild creatures as fellow inhabitants rather than menacing threats.",
          "The psychology of mountaineering: Discipline, oxygen conservation, ropes/belaying teamwork, and humble reverence before nature's grandeur.",
          "Grammar: Prepositions of place and movement, travelogue writing, diary entries."
        ]
      }
    ],
    "examTraps": [
      "Assuming mountaineering is solely an individual triumph; it is an absolute test of collaborative teamwork and safety discipline.",
      "Viewing the leopard in 'The Tunnel' as a monster rather than a dignified forest co-inhabitant."
    ],
    "quickMentalCheck": "What did watchman Sunder Singh say about the leopard in the tunnel? (Answer: The leopard belongs to the forest and minds its own business if left unprovoked).",
    "cueQuestions": [
      "How does Ruskin Bond create suspense and beauty in 'The Tunnel'?",
      "What qualities are essential for mountaineers attempting high-altitude Himalayan summits?",
      "How does travel expand a student's cultural perspective and maturity?"
    ],
    "workedExample": {
      "problem": "Explain the core values of mountaineering highlighted in 'Conquering the Summit'.",
      "steps": [
        "Preparation & Fitness: Months of rigorous physical conditioning and acclimatization.",
        "Teamwork & Trust: Roped partners rely on each other's belays for life and safety.",
        "Resilience against Nature: Enduring sub-zero blizzards, avalanches, and thin air without losing focus.",
        "Humility: The summit is not 'conquered' in arrogance, but visited with deep respect."
      ],
      "result": "Mountaineering teaches meticulous planning, absolute trust in teammates, grit, and humility."
    },
    "verificationProblem": "Unit 4 texts verified: The Tunnel, Travel, Conquering the Summit. Verified.",
    "realWorldUse": "Guides adventure tourism protocols, mountaineering safety standards, eco-trails, and wildlife conservation.",
    "diagramType": "travel-adventure-expedition-map"
  },
  "CBSE-CH-G7-ENG-CH05": {
    "chapterTitle": "Bravehearts",
    "subject": "English",
    "grade": 7,
    "chapterNum": 5,
    "essentialLaw": "\\text{Thematic Unit 5: Patriotic Valour, Historical Resistance \\& National Sacrifice}",
    "coreConcepts": [
      {
        "heading": "Literary Compositions in Unit 5",
        "bullets": [
          "1. 'A Homage to Our Brave Soldiers': Moving account of the National War Memorial in New Delhi, the Param Yoddha Sthal, and the eternal flame honoring fallen heroes.",
          "2. 'My Dear Soldiers': Heartfelt expressions of gratitude, letters, and poetry written by youth honoring defense personnel guarding icy borders and hostile terrains.",
          "3. 'Rani Abbakka': Inspiring historical biography of Rani Abbakka Chowta of Ullal (Karnataka), the fearless 16th-century warrior queen who repeatedly defeated Portuguese colonial naval fleets."
        ]
      },
      {
        "heading": "Patriotism & Indian Heritage",
        "bullets": [
          "Recognizing unsung heroes of India's indigenous resistance against foreign colonial domination.",
          "Values: Courage, selflessness, devotion to duty, unity across diversity, and national defense awareness.",
          "Grammar: Passive voice in historical reporting, formal letter writing to armed forces personnel, eulogy composition."
        ]
      }
    ],
    "examTraps": [
      "Overlooking Rani Abbakka's strategic use of fire-arrows and naval guerrilla warfare against Portuguese armadas.",
      "Thinking the National War Memorial honors only past wars; it commemorates all brave personnel who made the supreme sacrifice in post-independence defense operations."
    ],
    "quickMentalCheck": "Which 16th-century Indian warrior queen is celebrated for repeatedly defeating Portuguese colonial naval forces at Ullal? (Answer: Rani Abbakka Chowta).",
    "cueQuestions": [
      "How does the National War Memorial symbolize the eternal gratitude of the Indian nation?",
      "What innovative naval tactics did Rani Abbakka deploy to defeat superior Portuguese colonial galleons?",
      "Why is remembering the sacrifices of defense personnel an integral part of civic citizenship?"
    ],
    "workedExample": {
      "problem": "Describe the historical significance of Rani Abbakka's resistance against Portuguese invaders.",
      "steps": [
        "Rani Abbakka ruled Ullal on the coastal Karnataka frontier, a thriving port for spice trade.",
        "She refused to pay oppressive tribute to the Portuguese and formed alliances with diverse local communities (Mogaveeras, Muslims, and Jains).",
        "She led naval counter-attacks using night warfare and fire arrows, repelling multiple Portuguese invasions over four decades.",
        "She earned the revered title 'Abhaya Rani' (The Fearless Queen), serving as an early beacon of Indian freedom struggle."
      ],
      "result": "Rani Abbakka's secular unity, naval brilliance, and fearless resistance made her an immortal freedom icon."
    },
    "verificationProblem": "Unit 5 texts verified: Homage to Brave Soldiers, My Dear Soldiers, Rani Abbakka. Verified.",
    "realWorldUse": "Forms the foundation for national integration, defense education, gender empowerment, and historical heritage appreciation.",
    "diagramType": "bravehearts-heroes-tribute"
  },
  "CBSE-CH-G7-SOCSCI-CH01": {
    "chapterTitle": "Tracing Changes Through a Thousand Years",
    "subject": "Social Science",
    "grade": 7,
    "chapterNum": 1,
    "essentialLaw": "\\text{Historical Contextuality: } \\text{Terminology Shift: } \\text{\"Hindustan\" (Minhaj-i-Siraj 13th c. } \\rightarrow \\text{ Babur 16th c. } \\rightarrow \\text{ Modern Nation-State)}",
    "coreConcepts": [
      {
        "heading": "Cartography, Terminology & Semantic Evolutions",
        "bullets": [
          "Al-Idrisi's 12th-century map placed South India at the top and Sri Lanka at the north, whereas French cartographer Guillaume de L'Isle (1720s) produced recognizable modern coastlines.",
          "Changing terms: 13th-century chronicler Minhaj-i-Siraj used \"Hindustan\" for lands between Punjab, Haryana, and Ganga-Yamuna under Delhi Sultanate; Babur used it for geography, fauna, and culture.",
          "The term \"foreigner\" (*pardesi/ajnabi*) historically meant someone not part of the same village or society, rather than someone from outside India."
        ]
      },
      {
        "heading": "New Social and Political Groups (700–1750 CE)",
        "bullets": [
          "Technological innovations: Persian wheel in irrigation, spinning wheel in weaving, and firearms in warfare.",
          "Introduction of new crops and beverages: Potatoes, corn, chillies, tea, and coffee.",
          "Emergence of *Rajputs* (sons of rulers), Kayasthas (scribes/secretaries), and *Jati Panchayats* with their own sub-caste rules operating within village governance."
        ]
      }
    ],
    "examTraps": [
      "Assuming the term \"Hindustan\" carried the same political-geographical meaning in the 13th century as it does in modern independent India.",
      "Overlooking that the absence of printing presses meant scribes manually copied manuscripts, introducing progressive copyist variations over centuries."
    ],
    "quickMentalCheck": "Who was the 13th-century Persian chronicler who used \"Hindustan\" to denote areas governed by the Delhi Sultan? (Answer: Minhaj-i-Siraj).",
    "cueQuestions": [
      "How did cartographic techniques change between the 12th-century Arab geographers and 18th-century European cartographers?",
      "Why do historians encounter textual discrepancies when studying medieval handwritten manuscripts?",
      "What role did Jati Panchayats play in regulating the conduct of their members in medieval villages?"
    ],
    "workedExample": {
      "problem": "Compare the meaning of the word \"foreigner\" in the medieval period versus its modern contemporary definition.",
      "steps": [
        "Medieval meaning: Any stranger who appeared in a given village or town, who was not a part of that specific community or culture (e.g., a city dweller encountering a forest dweller).",
        "Modern meaning: A person who is not a citizen of the country in which they are residing (an alien nationality).",
        "Conclusion: Medieval definition was localized/societal, whereas modern definition is legal/national."
      ],
      "result": "\\text{Medieval = Cultural/Community outsider; Modern = Non-national/Alien citizen}"
    },
    "verificationProblem": "Verify that two peasants living in the same village with different caste backgrounds were not foreigners to each other in the medieval context.",
    "realWorldUse": "Vital for historical linguistics, diplomatic archival interpretation, and understanding the evolution of political geography.",
    "diagramType": "cartographic-manuscript-timeline"
  },
  "CBSE-CH-G7-SOCSCI-CH02": {
    "chapterTitle": "New Kings and Kingdoms",
    "subject": "Social Science",
    "grade": 7,
    "chapterNum": 2,
    "essentialLaw": "\\text{Chola Administration: } \\text{Ur (Peasant Assembly)} \\rightarrow \\text{Nadu (District Group)} \\rightarrow \\text{Sabha (Brahmana Assembly via Kudavolai System)}",
    "coreConcepts": [
      {
        "heading": "Emergence of New Dynasties & Prashastis",
        "bullets": [
          "Samantas (subordinates) gained military power and declared independence as *Mahamandaleshvara*, performing rituals like *Hiranya-garbha* (golden womb) to claim Kshatriya status.",
          "Tripartite Struggle: 3-way conflict between Gurjara-Pratiharas, Rashtrakutas, and Palas over centuries to control the prize city of Kanauj in Ganga valley.",
          "Prashastis written by learned Brahmanas depicted rulers as valiant, victorious warriors (e.g., Nagabhata I's achievements on Gwalior stone slab)."
        ]
      },
      {
        "heading": "The Imperial Cholas: Administration & Agrarian Expansion",
        "bullets": [
          "Vijayalaya established Chola supremacy by capturing Kaveri delta from Muttaraiyar; Rajaraja I and Rajendra I expanded empire across South India and Southeast Asia (Sri Vijaya).",
          "Agrarian infrastructure: Construction of embankments (*bunds*), irrigation channels from Kaveri, and large water storage tanks.",
          "Uttaramerur inscription describes *Sabha* organization: Members chosen by *Kudavolai* (lottery system from palm-leaf tickets drawn by a young boy)."
        ]
      }
    ],
    "examTraps": [
      "Assuming Kalhana's *Rajatarangini* was a typical flattering prashasti; Kalhana critically evaluated sources and questioned kingly decisions in Kashmir history.",
      "Confusing the general peasant assembly (*Ur*) with the assembly of scholarly Brahmana landowners (*Sabha*)."
    ],
    "quickMentalCheck": "Which Chola king built the Rajarajeshvara (Brihadisvara) temple at Thanjavur and conducted naval expeditions? (Answer: Rajaraja I).",
    "cueQuestions": [
      "What was the Tripartite Struggle and why was control over Kanauj strategically vital in medieval India?",
      "How was the democratic lottery system (*Kudavolai*) conducted in the Chola *Sabha* according to the Uttaramerur inscription?",
      "Why is Kalhana's *Rajatarangini* considered unique among medieval historical texts?"
    ],
    "workedExample": {
      "problem": "Outline the qualification criteria required for a candidate to contest election to a Chola Sabha committee as per the Uttaramerur inscription.",
      "steps": [
        "Property ownership: Must own land from which land revenue is collected.",
        "Residential requirement: Must have a house on their own site.",
        "Age qualification: Must be between 35 and 70 years of age.",
        "Educational & Ethical criteria: Must possess knowledge of the Vedas, be well-versed in administrative affairs, and maintain honest accounts.",
        "Disqualification: Anyone who has served on a committee in the previous 3 years cannot contest again."
      ],
      "result": "\\text{Land + Own House + Age 35-70 + Vedic Knowledge + Account Audited + 3-yr Cooling Period}"
    },
    "verificationProblem": "Verify that Chola bronze sculptures, especially Nataraja, were crafted using the lost-wax (*cire perdue*) technique.",
    "realWorldUse": "Provides foundational models for local self-governance, democratic committee rotation, and decentralized water management.",
    "diagramType": "chola-administrative-hierarchy"
  },
  "CBSE-CH-G7-SOCSCI-CH03": {
    "chapterTitle": "The Delhi Sultans",
    "subject": "Social Science",
    "grade": 7,
    "chapterNum": 3,
    "essentialLaw": "\\text{Sultanate Administration: } \\text{Iqta System: } \\text{Muqti/Iqtadar} \\xrightarrow{\\text{Collects Kharaj (50\\% tax)}} \\text{Maintains Army} \\xrightarrow{\\text{Surplus to Sultan}}",
    "coreConcepts": [
      {
        "heading": "Dynastic Sequence and Consolidation",
        "bullets": [
          "Mamluk/Slave Dynasty (Qutbuddin Aibak, Iltutmish, Raziyya Sultan, Balban), Khaljis (Alauddin Khalji), Tughluqs (Ghiyasuddin, Muhammad bin Tughluq, Firuz Shah).",
          "Raziyya Sultan (daughter of Iltutmish) ruled 1236–1240; chronicler Minhaj-i-Siraj acknowledged her exceptional competence but noted court resistance to a female ruler.",
          "Shift from Garrison Towns (*fortified settlements with soldiers*) to Hinterland expansion and military expeditions into South India under Malik Kafur."
        ]
      },
      {
        "heading": "Administrative & Economic Reforms: Khalji vs Tughluq",
        "bullets": [
          "Alauddin Khalji: Fixed market prices of all commodities, strict rationing, measurement of land (*Zabita*), standard 50% *Kharaj* tax on agricultural produce.",
          "Muhammad bin Tughluq: Shifted capital to Daulatabad (Deogiri) to govern South India; introduced token copper/brass currency (leading to widespread counterfeiting).",
          "Iqta system: Land grants (*Iqtas*) allocated to military commanders (*Muqtis/Iqtadars*) who maintained troops and submitted audited accounts to imperial accountants (*Amils*)."
        ]
      }
    ],
    "examTraps": [
      "Assuming token currency of Muhammad bin Tughluq failed due to bad concept; it failed because the state could not control counterfeiting with crude minting technology.",
      "Confusing *Kharaj* (land tax on agricultural produce) with *Ghari* (house tax) or *Charai* (grazing tax)."
    ],
    "quickMentalCheck": "Which Sultan introduced strict market control, fixed prices of grain and horses, and constructed the Siri Fort in Delhi? (Answer: Alauddin Khalji).",
    "cueQuestions": [
      "How did the Iqta system balance military mobilization with fiscal centralization in the Delhi Sultanate?",
      "Why did Muhammad bin Tughluq's administrative experiments (token currency and capital transfer) fail in practice?",
      "What were the primary architectural and religious functions of the congregational mosque (*Masjid-i-Jami*)?"
    ],
    "workedExample": {
      "problem": "Compare the defensive strategies adopted by Alauddin Khalji and Muhammad bin Tughluq to counter Mongol invasions from Transoxiana.",
      "steps": [
        "Alauddin Khalji: Built strong garrison town (Siri), fully mobilized standing army, fixed market prices to feed troops cheaply, maintained defensive posture.",
        "Muhammad bin Tughluq: Mobilized massive army, evacuated old Delhi residents to Daulatabad, planned offensive campaigns into Transoxiana (Khurasan), paid cash salaries.",
        "Outcome: Khalji's administrative price-control measures were celebrated as highly successful; Tughluq's administrative measures led to empty treasury and disbanded offensive armies."
      ],
      "result": "\\text{Khalji = Defensive + Price Control; Tughluq = Offensive mobilization + Fiscal strain}"
    },
    "verificationProblem": "Verify that Ibn Battuta, a Moroccan traveler, visited India during the reign of Muhammad bin Tughluq and served as a Qazi (judge) in Delhi.",
    "realWorldUse": "Informs historical public finance, price stabilization mechanisms, monetary economics, and defensive logistics.",
    "diagramType": "sultanate-dynastic-iqta-flowchart"
  },
  "CBSE-CH-G7-SOCSCI-CH04": {
    "chapterTitle": "The Mughal Empire",
    "subject": "Social Science",
    "grade": 7,
    "chapterNum": 4,
    "essentialLaw": "\\text{Mansabdari-Jagirdari Matrix: } \\text{Rank (Zat)} + \\text{Military Contingent (Sawar)} \\quad | \\quad \\text{Revenue Assignment} = \\text{Jagir} \\quad | \\quad \\text{Sulh-i-Kul (Universal Peace)}",
    "coreConcepts": [
      {
        "heading": "Mughal Lineage and Territorial Expansion",
        "bullets": [
          "Descendants of Timur (father's side) and Genghis Khan (mother's side); preferred Timurid heritage over Mongol/Mughal label.",
          "Babur defeated Ibrahim Lodi at the First Battle of Panipat (1526) using field artillery and *Tulghuma* battle tactics.",
          "Akbar (1556–1605) consolidated empire through military conquests, Rajput matrimonial alliances, and religious tolerance (*Sulh-i-Kul*)."
        ]
      },
      {
        "heading": "Mansabdari, Zabt, and Revenue Administration",
        "bullets": [
          "Mansabdari System: Every officer held a *Mansab* specified by *Zat* (personal rank/salary) and *Sawar* (number of cavalry cavalrymen required to maintain).",
          "*Zabt* System (developed by Raja Todar Mal): Survey of crop yields, prices, and cultivated areas over 10-year period (1570–1580) fixing cash tax rates per crop.",
          "Akbarnama written by Abul Fazl: Volume III (*Ain-i-Akbari*) documents administrative regulations, army statistics, revenues, and geography of Akbar's empire."
        ]
      }
    ],
    "examTraps": [
      "Confusing *Zat* (which determined personal salary rank) with *Sawar* (which specified actual cavalrymen brought for royal muster and branding).",
      "Assuming *Jagirdars* owned their assigned lands; Jagirs were temporary revenue assignments, not hereditary landed estates."
    ],
    "quickMentalCheck": "Who was Akbar's finance minister who conducted the 10-year land survey known as the *Zabt* revenue system? (Answer: Raja Todar Mal).",
    "cueQuestions": [
      "How did the Mansabdari system integrate diverse ethnic groups (Turani, Irani, Rajput, Afghan, Maratha) into Mughal administration?",
      "What was the philosophical core of Akbar's policy of *Sulh-i-Kul* (universal peace) formulated with Abul Fazl?",
      "How did the crisis in the Jagirdari system contribute to the decline of the Mughal Empire under Aurangzeb?"
    ],
    "workedExample": {
      "problem": "Explain the relationship between a Mansabdar's Zat rank, Sawar rank, and Jagir revenue assignment.",
      "steps": [
        "Zat rank: A numerical score (e.g., 5000 Zat) that fixed the noble's hierarchical status in court and official imperial salary.",
        "Sawar rank: Number of mounted cavalrymen the Mansabdar had to maintain, inspect, and present for horse-branding (*Dagh*).",
        "Salary payment: Paid via *Jagir* (revenue collection right from specified villages) where estimated yield (*Jama*) matched the salary scale.",
        "Separation of power: Mansabdars rarely resided in their Jagirs; imperial revenue collectors (*Amils*) collected taxes to prevent local tyranny."
      ],
      "result": "\\text{Zat = Status/Salary Rank; Sawar = Cavalry quota; Jagir = Revenue assignment}"
    },
    "verificationProblem": "Verify that the Battle of Khanwa (1527) was fought between Babur and Rana Sanga of Mewar.",
    "realWorldUse": "Foundational study in civil-military bureaucracy design, fiscal revenue surveying, and multicultural governance.",
    "diagramType": "mansabdari-administrative-matrix"
  },
  "CBSE-CH-G7-SOCSCI-CH05": {
    "chapterTitle": "Rulers and Buildings",
    "subject": "Social Science",
    "grade": 7,
    "chapterNum": 5,
    "essentialLaw": "\\text{Architectural Structural Evolution: } \\text{Trabeate (Corbelled: Post-and-Lintel)} \\longrightarrow \\text{Arcuate (True Arch with Keystone + Dome)} \\quad | \\quad \\text{Pietra Dura Inlay}",
    "coreConcepts": [
      {
        "heading": "Structural Engineering: Trabeate vs Arcuate Styles",
        "bullets": [
          "Trabeate/Corbelled style (7th–10th century): Roofs, doors, and windows made by placing a horizontal beam across two vertical pillars.",
          "Arcuate style (12th century onward): The weight of the superstructure above doors and windows carried by true arches with a central keystone.",
          "Limestone cement mortar used extensively in arcuate construction, hardening into high-quality stone-like concrete for constructing giant domes."
        ]
      },
      {
        "heading": "Sacred Architecture and Royal Charbagh Gardens",
        "bullets": [
          "Temples as cosmological models: Kandariya Mahadeva temple at Khajuraho (dedicated to Shiva) and Brihadisvara temple at Thanjavur (tallest Shikhara).",
          "Mughal Charbagh Gardens: Symmetrical four-quartered walled gardens divided by intersecting water channels (Humayun's Tomb, Shalimar Bagh).",
          "Pietra Dura technique: Inlaying colored, polished hard stones (lapis, onyx, jasper) into marble depressions to create floral patterns in the Taj Mahal."
        ]
      }
    ],
    "examTraps": [
      "Assuming the Taj Mahal was placed in the exact center of the Charbagh; it is uniquely situated at the edge of the river Yamuna overlooking the garden.",
      "Confusing a corbelled false arch (stepped horizontal stones) with a true arcuate arch (wedge-shaped voussoirs with a keystone)."
    ],
    "quickMentalCheck": "What is the architectural term for decorative marble inlay work featuring semi-precious stones found in Shah Jahan's buildings? (Answer: Pietra Dura).",
    "cueQuestions": [
      "What structural engineering differences distinguish trabeate construction from arcuate construction?",
      "Why did medieval kings target and destroy the major temples of rival kingdoms during military invasions?",
      "How does the layout of Shah Jahan's Diwan-i-Khas at Red Fort symbolically represent the emperor as the shadow of God (*Qibla*)?"
    ],
    "workedExample": {
      "problem": "Analyze how the keystone in a true arcuate arch distributes the downward gravitational load of the superstructure.",
      "steps": [
        "Component identification: Wedge-shaped stones called *voussoirs* form the curved arc of the arch.",
        "Keystone placement: The central, uppermost wedge-shaped stone locked at the crown of the arch is the *keystone*.",
        "Load distribution: Gravitational downward pressure from the superstructure pushes down on the keystone.",
        "Lateral thrust: The keystone converts vertical load into lateral (sideways) compressive forces, transmitting thrust down the supporting pillars/abutments."
      ],
      "result": "\\text{Vertical Load} \\xrightarrow{\\text{Keystone}} \\text{Lateral Compression Thrust on Abutments}"
    },
    "verificationProblem": "Verify that the Brihadisvara temple Shikhara at Thanjavur was erected without mortar using a 4 km long inclined earthen ramp.",
    "realWorldUse": "Informs modern structural masonry engineering, heritage restoration, Islamic-Indian syncretic architecture, and tourism curation.",
    "diagramType": "trabeate-arcuate-structural-diagram"
  },
  "CBSE-CH-G7-SOCSCI-CH06": {
    "chapterTitle": "Towns, Traders and Craftspersons",
    "subject": "Social Science",
    "grade": 6,
    "chapterNum": 6,
    "essentialLaw": "\\text{Medieval Commercial Centers: } \\text{Temple Towns (Thanjavur)} + \\text{Administrative Capitals} + \\text{Port Hubs (Surat/Masulipatnam)} \\quad | \\quad \\text{Merchant Guilds: Manigramam & Nanadesi}",
    "coreConcepts": [
      {
        "heading": "Temple Towns and Urban Centers",
        "bullets": [
          "Temple towns (Thanjavur, Kanchipuram, Tirupati) developed around pilgrimage centers; temple wealth was used by priests and kings to finance trade and banking.",
          "Hampi (capital of Vijayanagara Empire on Tungabhadra basin): Fortified city built with interlocking wedge stones without mortar; grand Mahanavami platform.",
          "Craft specializations: Sthapatis (bronze sculptors), Bidri craft (zinc and copper inlay with silver in Bidar), and weavers of Devanga/Kaikkolar."
        ]
      },
      {
        "heading": "Commercial Ports and Trade Guilds",
        "bullets": [
          "Surat (Gujarat): Gateway for trade with West Asia via Gulf of Ormuz; famous for *Zari* (gold lace) textiles and *Hundis* (bills of exchange honored globally).",
          "Masulipatnam (Andhra coast): Fortified Dutch, British, and Golconda trading port; renowned for *Kalamkari* printed cotton textiles.",
          "Merchant Guilds (*Manigramam*, *Nanadesi*): Formed powerful self-regulating merchant syndicates operating across peninsular India and Southeast Asia."
        ]
      }
    ],
    "examTraps": [
      "Believing *Hundi* was a paper currency issued by a central bank; it was an ancient private negotiable credit instrument / bill of exchange.",
      "Assuming the architecture of Hampi used lime-mortar bonding; it was entirely dry-stone interlocking masonry."
    ],
    "quickMentalCheck": "What was a *Hundi* in medieval Indian commerce? (Answer: A financial bill of exchange recording a deposit that could be cashed in distant financial centers).",
    "cueQuestions": [
      "How did temple urbanization drive commercial banking and artisan settlements in medieval South India?",
      "Why was Surat regarded as the \"Gateway to Mecca\" and a premier commercial emporium of the Mughal Empire?",
      "What were the strategic causes behind the decline of Hampi after the Battle of Talikota (1565)?"
    ],
    "workedExample": {
      "problem": "Explain how a medieval Indian merchant used a *Hundi* to travel safely from Surat to Cairo or Antwerp without carrying physical gold coins.",
      "steps": [
        "Deposit: Merchant deposits physical gold/silver cash with a reputable Sarraf (banker) in Surat.",
        "Hundi issuance: The banker writes a sealed note (*Hundi*) specifying the amount, depositor name, and pay-order instructions.",
        "Transit: The merchant travels light without carrying bulky coins, eliminating the risk of highway robbery.",
        "Redemption: Upon reaching Cairo or Antwerp, the merchant presents the Hundi to the corresponding affiliated banking house and collects cash minus a transaction fee."
      ],
      "result": "\\text{Deposit in Surat} \\xrightarrow{\\text{Sealed Hundi Paper}} \\text{Instant Cash Redemption in Cairo/Antwerp}"
    },
    "verificationProblem": "Verify that the Battle of Talikota (1565) pitted Vijayanagara against the combined armies of Bijapur, Golconda, and Ahmadnagar.",
    "realWorldUse": "Informs trade credit instruments, commercial guild economics, supply chain logistics, and historical urban sociology.",
    "diagramType": "medieval-trade-route-hundi-network"
  },
  "CBSE-CH-G7-SOCSCI-CH07": {
    "chapterTitle": "Tribes, Nomads and Settled Communities",
    "subject": "Social Science",
    "grade": 7,
    "chapterNum": 7,
    "essentialLaw": "\\text{Tribal Social Organization: } \\text{Kinship-based Egalitarianism} \\longleftrightarrow \\text{State Formation: } \\text{Gonds (Garha Katanga)} \\quad | \\quad \\text{Ahoms (Paik Corvée Labor System)}",
    "coreConcepts": [
      {
        "heading": "Tribal Societies and Nomadic Pastoralists",
        "bullets": [
          "Tribal clans preserved distinct egalitarian customs based on collective ownership of land and kinship bonds, outside orthodox *Varna* hierarchies.",
          "Nomadic pastoralists: *Banjaras* were the most important trader-nomads; their caravan was called *Tanda*, transporting grain for Alauddin Khalji and Mughal armies.",
          "Major regional tribes: Gonds (Gondwana), Ahoms (Brahmaputra valley), Santhals & Mundas (Chota Nagpur), Khokhars & Gakkhars (Punjab), Bhils (Western India)."
        ]
      },
      {
        "heading": "State Formation: Gonds and Ahoms",
        "bullets": [
          "Gonds practiced shifting cultivation; Garha Katanga was a centralized Gond kingdom (70,000 villages) divided into *Garhs*, *Chaurasis* (84 villages), and *Barhots* (12 villages).",
          "Rani Durgavati of Garha Katanga courageously fought Mughal forces under Asaf Khan in 1565 to defend her state.",
          "Ahoms migrated from Myanmar to Brahmaputra valley in 13th century; created state using firearms/cannon; mobilized adult males as *Paiks* (forced corvée labor rotation)."
        ]
      }
    ],
    "examTraps": [
      "Confusing the *Tanda* (the nomadic caravan of the Banjaras) with tribal village administrative units.",
      "Assuming the Ahom kingdom lacked historical literature; Ahoms maintained rigorous historical chronicles called *Buranjis*."
    ],
    "quickMentalCheck": "What were the official state historical chronicles written in the Ahom language and later in Assamese called? (Answer: *Buranjis*).",
    "cueQuestions": [
      "How did the *Paik* system function as a rotational labor and military mobilization mechanism in the Ahom state?",
      "What was the administrative division of the Gond kingdom of Garha Katanga from Garh down to Barhot?",
      "How did tribal groups become integrated into the Brahmanical caste structure as specialized *Jatis*?"
    ],
    "workedExample": {
      "problem": "Break down the administrative hierarchical structure of the Gond Kingdom of Garha Katanga.",
      "steps": [
        "Kingdom level: Kingdom ruled by the Raja (e.g., Aman Das / Sangram Shah).",
        "Garh level: Kingdom divided into administrative units called *Garhs*, each controlled by a particular Gond clan.",
        "Chaurasi level: Each *Garh* was further subdivided into units of 84 villages called *Chaurasis*.",
        "Barhot level: Each *Chaurasi* was subdivided into smaller clusters of 12 villages called *Barhots* ($7 \\times 12 = 84$)."
      ],
      "result": "\\text{Kingdom} \\rightarrow \\text{Garh} \\rightarrow \\text{Chaurasi (84 villages)} \\rightarrow \\text{Barhot (12 villages)}"
    },
    "verificationProblem": "Verify that the Ahom society was organized into clans called *Khels*, which controlled multiple villages.",
    "realWorldUse": "Informs indigenous forest rights, sociological anthropology, decentralized community governance, and ethnic historical studies.",
    "diagramType": "gond-ahom-administrative-pyramid"
  },
  "CBSE-CH-G7-SCI-CH01": {
    "chapterTitle": "The Ever-Evolving World of Science",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 1,
    "essentialLaw": "\\text{Scientific Evolution: Falsification of Outdated Models } (\\text{Geocentric} \\to \\text{Heliocentric}) \\implies \\text{Empirical Progress}",
    "coreConcepts": [
      {
        "heading": "Evolution of Scientific Knowledge & Paradigms",
        "bullets": [
          "Dynamic Nature of Science: Scientific ideas evolve over time as more precise tools, telescopes, and experimental evidence challenge older frameworks.",
          "Historical Paradigm Shifts: Geocentric Model (Ptolemy, Earth at center of universe) superseded by Heliocentric Model (Copernicus, Galileo, Kepler: Sun at center with elliptical planetary orbits).",
          "Spontaneous Generation vs Biogenesis: Ancient belief that living maggots spontaneously generated from decaying meat was conclusively disproven by Francesco Redi and Louis Pasteur (Biogenesis: life comes only from pre-existing life)."
        ]
      },
      {
        "heading": "Technological Revolution & Interdisciplinary Science",
        "bullets": [
          "Microscopy Advances: Simple lens $\\to$ Compound light microscope $\\to$ Electron microscope (resolving viruses and double helix DNA molecules).",
          "Interdisciplinary Connections: Biophysics, Biochemistry, Biotechnology, Nanotechnology, Computational Modeling integrating physics, chemistry, and biology.",
          "Ethics and Responsibility in Science: Balancing technological progress with environmental conservation, biosafety, and ethical guidelines in genetics and AI."
        ]
      }
    ],
    "examTraps": [
      "Thinking scientific theories are absolute permanent dogmas (scientific knowledge is self-correcting and continually updated with new reproducible data).",
      "Confusing pure scientific discovery (understanding natural laws) with applied technology (engineering tools and devices)."
    ],
    "quickMentalCheck": "How did Louis Pasteur swan-neck flask experiment disprove the theory of spontaneous generation? Microorganisms grew in broth only when air carrying microbes could enter; sealed or curved swan-neck flasks remained sterile indefinitely.",
    "cueQuestions": [
      "How did Galileo telescopic observations of Jupiter moons dismantle the ancient geocentric model of the solar system?",
      "Why is the scientific process considered fundamentally self-correcting over historical timescales?",
      "How does the development of electron microscopy demonstrate the synergistic link between physics engineering and biological discoveries?"
    ],
    "workedExample": {
      "problem": "Explain how Francesco Redi’s controlled experiment disproved the ancient belief that maggots spontaneously arise from rotting meat.",
      "steps": [
        "1. Historical belief: People believed rotting meat spontaneously generated flies and maggots.",
        "2. Redi’s Setup: Placed fresh meat into three sets of jars: Jar A (Open to air and flies), Jar B (Tightly sealed with lid), Jar C (Covered with fine gauze netting allowing air but blocking flies).",
        "3. Experimental Observations: Maggots developed ONLY in Jar A where adult flies landed on meat. In Jar C, flies laid eggs on top of the netting (not on meat), and no maggots appeared inside. In Jar B, zero maggots appeared.",
        "4. Conclusion: Maggots hatch from fly eggs and do NOT generate spontaneously from rotting meat, establishing the Principle of Biogenesis."
      ],
      "result": "\\text{Biogenesis Confirmed: Maggots develop from fly eggs, disproving Spontaneous Generation}"
    },
    "verificationProblem": "Check control variable isolation: Jar C proved that air presence alone does not generate life without biological egg deposition. Verified.",
    "realWorldUse": "Pasteurization food preservation in commercial dairy processing, antibiotic sterility testing protocols in pharmaceutical manufacturing.",
    "diagramType": "scientific-paradigm-shift-heliocentric-model"
  },
  "CBSE-CH-G7-SCI-CH02": {
    "chapterTitle": "Exploring Substances: Acidic, Basic, and Neutral",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 2,
    "essentialLaw": "\\text{Neutralization: } \\text{Acid} + \\text{Base} \\to \\text{Salt} + \\text{Water} + \\text{Heat} \\quad | \\quad \\text{Litmus: Acid (Red), Base (Blue)} \\quad | \\quad \\text{Turmeric: Base (Red)}",
    "coreConcepts": [
      {
        "heading": "Acids, Bases & Natural Indicators (Litmus, Turmeric, China Rose)",
        "bullets": [
          "Acids: Sour in taste; Organic/Natural acids: Citric acid (citrus fruits), Acetic acid (vinegar), Lactic acid (curd), Tartaric acid (tamarind), Oxalic acid (spinach), Formic acid (ant sting); Mineral acids: $HCl, H_2SO_4, HNO_3$.",
          "Bases: Bitter in taste, soapy to touch; Sodium hydroxide ($NaOH$), Calcium hydroxide ($Ca(OH)_2$, limewater), Magnesium hydroxide ($Mg(OH)_2$, milk of magnesia), Ammonium hydroxide ($NH_4OH$, window cleaner).",
          "Natural Indicators: 1. Litmus (extracted from Lichens: red in acid, blue in base); 2. Turmeric paper (yellow in acid/neutral, turns reddish-brown in base, e.g., curry stain turning red when washed with soap); 3. China Rose / Hibiscus petal extract (turns dark pink/magenta in acid, green in base)."
        ]
      },
      {
        "heading": "Neutralization Reactions & Real-World Everyday Applications",
        "bullets": [
          "Neutralization: Reaction between an acid and a base to form salt, water, and heat ($HCl + NaOH \\to NaCl + H_2O + \\text{Heat}$).",
          "Everyday Neutralization: 1. Indigestion: Excess stomach $HCl$ neutralized by Antacids (Milk of Magnesia $Mg(OH)_2$ or baking soda); 2. Ant Sting: Injected formic acid neutralized by rubbing moist baking soda ($NaHCO_3$) or Calamine lotion (Zinc carbonate $ZnCO_3$); 3. Soil Treatment: Acidic soil treated with Quicklime ($CaO$) or Slaked lime ($Ca(OH)_2$); Basic soil treated with organic compost; 4. Factory Wastes: Acidic effluents neutralized with basic substances before discharging into water bodies."
        ]
      }
    ],
    "examTraps": [
      "Applying lemon juice to an ant sting (ant sting already contains FORMIC ACID; it must be neutralized with a mild BASE like calamine lotion or baking soda).",
      "Confusing China rose indicator colors: turns MAGENTA/dark pink in acid and GREEN in base."
    ],
    "quickMentalCheck": "Why does a yellow turmeric curry stain on a white shirt turn reddish-brown when washed with laundry soap? Soap is basic in nature, and turmeric is a natural indicator that turns reddish-brown in alkaline media.",
    "cueQuestions": [
      "How does China Rose indicator distinguish between an acidic solution, a basic solution, and a neutral solution?",
      "Why is calamine lotion (zinc carbonate) applied to skin after an ant sting or bee sting?",
      "Why must acidic industrial factory effluents be chemically neutralized before release into rivers?"
    ],
    "workedExample": {
      "problem": "You are given three test tubes containing: [A] Hydrochloric acid, [B] Sodium hydroxide solution, and [C] Sugar solution. You are provided with only Blue Litmus Paper. How will you identify the contents of all three test tubes?",
      "steps": [
        "1. Dip a strip of Blue Litmus Paper into each test tube [A], [B], and [C].",
        "2. The solution that turns Blue Litmus RED is definitively identified as Hydrochloric Acid [A]. (The other two test tubes leave blue litmus unchanged).",
        "3. Now take the newly turned RED litmus paper from step 2 and dip it into the remaining test tubes [B] and [C].",
        "4. The solution that turns the Red Litmus back to BLUE is definitively identified as the Base, Sodium Hydroxide [B].",
        "5. The remaining solution that causes NO color change on either red or blue litmus is the Neutral Sugar Solution [C]."
      ],
      "result": "[A] = \\text{Acid (turns blue litmus red)}; \\; [B] = \\text{Base (turns red litmus blue)}; \\; [C] = \\text{Neutral sugar solution}"
    },
    "verificationProblem": "Check indicator reversibility: Litmus is a reversible pH-dependent dye (red $\\leftrightarrow$ blue). Sequential cross-testing verified.",
    "realWorldUse": "Agricultural soil pH correction using agricultural lime, industrial wastewater neutralization treatment, manufacturing effervescent antacid powders.",
    "diagramType": "acid-base-natural-indicators-color-chart"
  },
  "CBSE-CH-G7-SCI-CH03": {
    "chapterTitle": "Electricity: Circuits and their Components",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 3,
    "essentialLaw": "\\text{Closed Circuit: Cell} + \\text{Switch (ON)} + \\text{Bulb} + \\text{Fuse} \\implies \\text{Continuous Current Flow} \\quad | \\quad H \\propto I^2 R t",
    "coreConcepts": [
      {
        "heading": "Circuit Symbols, Closed vs Open Circuits & Heating Effect",
        "bullets": [
          "Standard Circuit Symbols: Electric cell (long thin line $=$ positive, short thick line $=$ negative), Battery (combination of two or more cells connected in series: positive of one to negative of next), Switch ON/OFF, Bulb, Connecting wires.",
          "Closed vs Open Circuit: Closed circuit (switch ON, unbroken continuous conducting loop, current flows, bulb glows) vs Open circuit (switch OFF or broken filament, current does not flow).",
          "Heating Effect of Current: When electric current flows through a high-resistance wire, it becomes hot ($H \\propto I^2 R t$); Heating elements made of Nichrome alloy wire (e.g., electric room heater, geyser, toaster, iron)."
        ]
      },
      {
        "heading": "Electric Fuses, MCBs & Magnetic Effect (Electromagnets & Electric Bell)",
        "bullets": [
          "Electric Fuse: Safety device containing a wire with low melting point; Melts and breaks circuit when excessive current flows due to short-circuit or overloading, preventing electrical fires.",
          "Miniature Circuit Breakers (MCBs): Modern electromagnetic safety switches that automatically trip OFF during overload and can be reset manually.",
          "Magnetic Effect of Electric Current (Hans Christian Oersted): Current-carrying wire produces a magnetic field, deflecting a magnetic compass needle.",
          "Electromagnet: Coil of insulated copper wire wound around an iron nail/core; Functions as a magnet only when current is switched ON; Applications: Cranes lifting heavy scrap iron, MRI machines, telephone earpieces, Electric Bell (interrupter hammer strikes gong repeatedly via electromagnetic pull and spring release)."
        ]
      }
    ],
    "examTraps": [
      "Connecting cells in parallel with positive to positive when building a series battery (battery cells MUST be connected positive terminal to negative terminal).",
      "Replacing a blown fuse wire with thick copper wire (dangerous hazard: copper wire has a high melting point and will not melt during short-circuit, causing fire)."
    ],
    "quickMentalCheck": "Why does an incandescent electric bulb glow white-hot while the connecting copper wires remain cool? The thin tungsten filament has very high electrical resistance ($H \\propto R$), producing extreme heat and incandescence, while copper connecting wires have near-zero resistance.",
    "cueQuestions": [
      "How does an electric fuse protect household wiring from dangerous electrical overloads?",
      "How does an electric bell use an electromagnet and make-and-break contact screw to produce continuous ringing?",
      "Why are modern Miniature Circuit Breakers (MCBs) preferred over traditional cartridge fuses?"
    ],
    "workedExample": {
      "problem": "Explain the working of an Electric Bell using an annotated circuit sequence from pressing the switch to the striking of the gong.",
      "steps": [
        "1. When the bell switch is pressed (Closed Circuit), electric current flows through the electromagnet coils wound around a soft iron core.",
        "2. The energized electromagnet creates a magnetic field and attracts the soft iron armature attached to a spring.",
        "3. The striker/hammer at the end of the armature moves forward and hits the metallic Gong, producing a loud ringing sound.",
        "4. As the armature moves forward, it breaks contact with the contact screw, opening the circuit.",
        "5. The moment current stops, the electromagnet loses its magnetism. The spring pulls the armature back to its resting position against the screw.",
        "6. Contact is re-established, current flows again, and the cycle repeats rapidly, producing continuous ringing until the switch is released."
      ],
      "result": "\\text{Switch ON} \\to \\text{Electromagnet Pull} \\to \\text{Hammer Strikes Gong} \\to \\text{Contact Breaks} \\to \\text{Spring Reset} \\to \\text{Repeat}"
    },
    "verificationProblem": "Check make-and-break oscillator logic: Breaking contact interrupts current, allowing mechanical spring reset. Self-oscillating circuit verified.",
    "realWorldUse": "Scrap yard crane electromagnets sorting ferrous metal scrap, domestic MCB power protection panels, electromagnetic door chimes.",
    "diagramType": "electric-bell-circuit-electromagnet"
  },
  "CBSE-CH-G7-SCI-CH04": {
    "chapterTitle": "The World of Metals and Non-metals",
    "subject": "SCIENCE",
    "grade": 7,
    "chapterNum": 4,
    "essentialLaw": "$\\text{Metal} + \\text{Oxygen} \\to \\text{Basic Metal Oxide} \\quad (2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}) \\quad | \\quad \\text{Non-metal} + \\text{Oxygen} \\to \\text{Acidic Oxide} \\quad | \\quad A + BC \\to AC + B$",
    "coreConcepts": [
      {
        "heading": "Physical Properties and Critical Exceptions",
        "bullets": [
          "Metals: Malleable (beaten into thin sheets), ductile (drawn into wires), sonorous, good conductors of heat and electricity.",
          "Key exceptions: Mercury is liquid metal at room temperature; Sodium and Potassium are soft metals cut with knife; Iodine is lustrous non-metal; Graphite (carbon) conducts electricity."
        ]
      },
      {
        "heading": "Chemical Reactions with Oxygen and Water",
        "bullets": [
          "Metal + Oxygen -> Basic Metal Oxide (turns red litmus blue; e.g. $2\\text{Mg} + \\text{O}_2 \\to 2\\text{MgO}$, $\\text{MgO} + \\text{H}_2\\text{O} \\to \\text{Mg(OH)}_2$).",
          "Non-metal + Oxygen -> Acidic Oxide (turns blue litmus red; e.g. $\\text{S} + \\text{O}_2 \\to \\text{SO}_2$, $\\text{SO}_2 + \\text{H}_2\\text{O} \\to \\text{H}_2\\text{SO}_3$)."
        ]
      },
      {
        "heading": "Reactivity Series, Displacement and Corrosion",
        "bullets": [
          "Displacement Rule: A more reactive metal displaces a less reactive metal from its salt solution (e.g. $\\text{Fe} + \\text{CuSO}_4 \\to \\text{FeSO}_4 + \\text{Cu}$).",
          "Rusting of Iron: Strictly requires BOTH oxygen and water/moisture ($4\\text{Fe} + 3\\text{O}_2 + x\\text{H}_2\\text{O} \\to 2\\text{Fe}_2\\text{O}_3 \\cdot x\\text{H}_2\\text{O}$); prevented by galvanization."
        ]
      }
    ],
    "examTraps": [
      "Physical Property Exceptions: Confusing exceptions (Mercury liquid metal, Iodine lustrous non-metal, Sodium soft).",
      "Acidic vs Basic Oxide Identification: Swapping metal oxide nature (basic) with non-metal oxide nature (acidic).",
      "Rusting Preconditions: Stating that only air or only water causes rusting (both air and water are mandatory)."
    ],
    "quickMentalCheck": "Verify that metal oxides turn red litmus blue while non-metal oxides turn blue litmus red.",
    "cueQuestions": [
      "State 4 physical properties distinguishing metals from non-metals with exceptions.",
      "Explain with balanced equations what happens when magnesium ribbon is burned in air and dissolved in water.",
      "Why does copper sulfate solution change color from blue to green when iron nails are immersed in it?"
    ],
    "workedExample": {
      "problem": "Explain the reaction when sulfur powder is heated and dissolved in water, testing with litmus.",
      "steps": [
        "Step 1: Burning sulfur in air produces sulfur dioxide gas: S + O2 -> SO2.",
        "Step 2: Dissolving sulfur dioxide in water forms sulfurous acid: SO2 + H2O -> H2SO3.",
        "Step 3: Sulfurous acid turns moist blue litmus paper red, demonstrating that non-metal oxides are acidic."
      ],
      "result": "Acidic nature of non-metal oxide confirmed via sulfurous acid litmus test."
    },
    "verificationProblem": "Verify why sodium is stored immersed in kerosene oil while phosphorus is stored in water.",
    "realWorldUse": "Applied in metallurgy, structural engineering, electrical wiring, anti-corrosion galvanization, and materials science.",
    "diagramType": "states_of_matter"
  },
  "CBSE-CH-G7-SCI-CH05": {
    "chapterTitle": "Changes Around Us: Physical and Chemical",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 5,
    "essentialLaw": "\\text{Physical Change: Reversible, No New Substance (Melting Ice)} \\quad | \\quad \\text{Chemical Change: Irreversible, New Substance Formed } (\\text{Rusting } Fe_2O_3, \\; \\text{Burning})",
    "coreConcepts": [
      {
        "heading": "Physical vs Chemical Changes (Properties & Criteria)",
        "bullets": [
          "Physical Change: Change in physical properties (shape, size, state, color) without formation of any new chemical substance; Usually reversible (e.g., melting of ice, tearing paper, boiling water, dissolving sugar in water, stretching rubber band).",
          "Chemical Change (Chemical Reaction): One or more new substances with completely different chemical properties are formed; Usually irreversible; Accompanied by: Heat/light energy exchange, sound production, gas evolution, color change, or precipitate formation (e.g., burning of magnesium ribbon, rusting of iron, curdling of milk, cooking food, digestion)."
        ]
      },
      {
        "heading": "Key Chemical Reactions (Magnesium, Copper Sulfate) & Rusting/Crystallization",
        "bullets": [
          "Burning Magnesium Ribbon: $2Mg + O_2 \\to 2MgO$ (Dazzling white flame, white ash); Dissolving ash in water: $MgO + H_2O \\to Mg(OH)_2$ (Turns red litmus blue, basic).",
          "Copper Sulfate & Iron Nail: $CuSO_4(\\text{blue}) + Fe \\to FeSO_4(\\text{green}) + Cu\\downarrow$ (Brown deposit of copper on iron nail, displacement reaction).",
          "Carbon Dioxide Lime Water Test: $Ca(OH)_2 + CO_2 \\to CaCO_3 \\downarrow (\\text{milky precipitate}) + H_2O$.",
          "Rusting of Iron: $4Fe + 3O_2 + 2xH_2O \\to 2Fe_2O_3 \\cdot xH_2O$ (Reddish-brown rust requires BOTH Oxygen and Moisture); Prevention: Galvanization (coating iron with zinc), painting, alloying (Stainless Steel $= Fe + C + Cr + Ni$).",
          "Crystallization: Physical purification method to obtain large, pure crystals of a substance from an impure saturated solution (e.g., pure Copper Sulfate crystals from acidified solution)."
        ]
      }
    ],
    "examTraps": [
      "Assuming rusting of iron is a physical change (rusting forms a NEW chemical substance hydrated ferric oxide, so it is strictly a chemical change).",
      "Confusing the burning of a candle (both physical melting of wax AND chemical combustion of vaporized hydrocarbons)."
    ],
    "quickMentalCheck": "Why does the blue color of copper sulfate solution turn light green when an iron nail is left in it for an hour? Iron displaces copper to form light green Ferrous Sulfate ($FeSO_4$), depositing reddish-brown copper on the nail.",
    "cueQuestions": [
      "What visible evidence confirms that burning a magnesium ribbon in air is a chemical change?",
      "Why are both oxygen gas and water moisture strictly necessary for the rusting of iron metal?",
      "How does crystallization serve as a superior physical purification method compared to simple evaporation to dryness?"
    ],
    "workedExample": {
      "problem": "When baking soda ($NaHCO_3$) is mixed with vinegar (acetic acid), gas bubbles are produced with a hissing sound. When this gas is passed through freshly prepared lime water, it turns milky. Identify the gas and explain the chemical reactions.",
      "steps": [
        "1. Reaction 1 (Acid + Carbonate): Vinegar (acetic acid) reacts with baking soda (sodium hydrogen carbonate) to produce carbon dioxide gas with effervescence: $\\text{CH}_3\\text{COOH} + \\text{NaHCO}_3 \\to \\text{CH}_3\\text{COONa} + \\text{H}_2\\text{O} + \\text{CO}_2\\uparrow$.",
        "2. The released gas is Carbon Dioxide ($\\text{CO}_2$).",
        "3. Reaction 2 (Lime Water Test): When $\\text{CO}_2$ gas is bubbled through clear lime water (Calcium hydroxide, $\\text{Ca(OH)}_2$), it reacts to form insoluble white Calcium Carbonate precipitate: $\\text{Ca(OH)}_2(aq) + \\text{CO}_2(g) \\to \\text{CaCO}_3\\downarrow (\\text{white milky}) + \\text{H}_2\\text{O}(l)$.",
        "4. The milky appearance is the definitive diagnostic test for carbon dioxide gas."
      ],
      "result": "\\text{Gas: } \\text{CO}_2; \\quad \\text{Milky Precipitate: Calcium Carbonate } (\\text{CaCO}_3)"
    },
    "verificationProblem": "Check solubility of $\\text{CaCO}_3$: Calcium carbonate is insoluble in neutral water, forming a colloidal milky suspension. Analytical test verified.",
    "realWorldUse": "Galvanization of structural steel bridge girders, commercial sugar crystallization from sugarcane juice in refineries, fire extinguisher $\\text{CO}_2$ production.",
    "diagramType": "physical-vs-chemical-change-reaction-pathways"
  },
  "CBSE-CH-G7-SCI-CH06": {
    "chapterTitle": "Adolescence: A Stage of Growth and Change",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 6,
    "essentialLaw": "\\text{Puberty: Hypothalamus (GnRH)} \\to \\text{Pituitary (LH/FSH)} \\to \\text{Testes (Testosterone) / Ovaries (Estrogen)} \\implies \\text{Secondary Sexual Characteristics}",
    "coreConcepts": [
      {
        "heading": "Adolescence, Puberty & Secondary Sexual Characteristics",
        "bullets": [
          "Adolescence: Period of transitional growth and development between childhood and adulthood ($11-19\\text{ years}$); Puberty marks onset of sexual reproductive maturity.",
          "Physical Changes at Puberty: Rapid increase in height (growth spurt, long limb bones elongate); Changes in body shape (boys develop broad shoulders and muscular chest; girls develop wider pelvic hips); Voice change (boys larynx/voice box enlarges into visible Adam Apple, voice deepens; girls have high-pitched voice); Increased activity of sweat and sebaceous oil glands leading to acne/pimples.",
          "Development of Sex Organs: Testes produce sperms; Ovaries mature and release ova; Secondary sexual characteristics (facial beard/moustache in boys, breast development in girls, pubic/underarm hair in both)."
        ]
      },
      {
        "heading": "Endocrine Control, Hormones & Reproductive Hygiene",
        "bullets": [
          "Hormonal Regulation: Pituitary hormones (LH, FSH) stimulate testes to secrete Testosterone and ovaries to secrete Estrogen; Insulin (pancreas), Thyroxine (thyroid), Growth Hormone (pituitary).",
          "Menstruation Cycle: Monthly shedding of uterine lining and unfertilized ovum ($28-30\\text{ days}$); Menarche (first menstrual flow at puberty) and Menopause (permanent cessation of menstruation around age $45-50$).",
          "Reproductive Health & Hygiene: Balanced diet with iron (prevents anemia in growing adolescents), personal hygiene (sanitary napkins, daily bathing), regular physical exercise, saying NO to drugs and alcohol."
        ]
      }
    ],
    "examTraps": [
      "Confusing Menarche (the FIRST onset of menstruation at puberty) with Menopause (the permanent CESSATION of menstruation around 50 years).",
      "Thinking Adam’s Apple is present only in girls (Adam’s Apple is the protruding larynx seen prominently in adolescent BOYS due to enlarged vocal cords)."
    ],
    "quickMentalCheck": "Which endocrine master gland secretes hormones that stimulate the testes and ovaries to produce testosterone and estrogen at puberty? The Pituitary Gland located at the base of the brain.",
    "cueQuestions": [
      "What physiological changes cause the cracking and deepening of boys voices during puberty (Adam Apple)?",
      "What are Menarche and Menopause in the human female reproductive life cycle?",
      "Why is an iron-rich diet containing green vegetables and jaggery particularly essential for adolescent girls?"
    ],
    "workedExample": {
      "problem": "List four major physical changes that occur in boys and four major physical changes in girls during the onset of puberty.",
      "steps": [
        "1. Major Changes in Boys: (i) Growth of facial hair (beard/moustache) and body hair; (ii) Broadening of shoulders and chest musculature; (iii) Enlargement of larynx forming visible Adam’s Apple resulting in a deep voice; (iv) Testes begin producing mature spermatozoa.",
        "2. Major Changes in Girls: (i) Development and enlargement of mammary glands (breasts); (ii) Broadening of the pelvic hip girdle; (iii) High-pitched voice; (iv) Maturation of ovaries and initiation of the monthly menstrual cycle (Menarche)."
      ],
      "result": "\\text{Boys: Adam Apple, deep voice, facial hair, broad shoulders}; \\; \\text{Girls: Menarche, breast growth, wide hips, high voice}"
    },
    "verificationProblem": "Check endocrine causation: Testosterone drives male secondary traits; Estrogen drives female secondary traits. Hormonal dimorphism verified.",
    "realWorldUse": "National adolescent health mission counseling, nutritional anemia eradication campaigns in schools, personal hygiene education programs.",
    "diagramType": "endocrine-glands-human-body-map"
  },
  "CBSE-CH-G7-SCI-CH07": {
    "chapterTitle": "Heat Transfer in Nature",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 7,
    "essentialLaw": "\\text{Heat Transfer: Conduction (Solids, Contact)} + \\text{Convection (Fluids, Density currents)} + \\text{Radiation (Electromagnetic, Vacuum)}",
    "coreConcepts": [
      {
        "heading": "Modes of Heat Transfer: Conduction, Convection & Radiation",
        "bullets": [
          "Conduction: Heat transfer through solids from hotter to colder end by direct molecular vibration without bulk movement of matter; Conductors (Metals: Copper, Aluminium, Iron) vs Insulators (Wood, Plastic, Air, Water, Wool).",
          "Convection: Heat transfer in fluids (liquids and gases) via actual mass movement of heated molecules; Warm fluid expands, becomes less dense, and rises while cold dense fluid sinks, creating Convection Currents.",
          "Radiation: Heat transfer by electromagnetic waves requiring NO material medium (can travel across vacuum, e.g., solar radiation reaching Earth); Dark surfaces absorb and radiate heat best; Light shiny surfaces reflect heat best."
        ]
      },
      {
        "heading": "Sea Breeze, Land Breeze & Thermos Flask Architecture",
        "bullets": [
          "Sea Breeze (Daytime): Land heats up faster than ocean $\\to$ warm air over land rises $\\to$ cool dense air from sea blows toward land.",
          "Land Breeze (Nighttime): Land cools down faster than ocean $\\to$ warm air over sea rises $\\to$ cool dense air from land blows toward sea.",
          "Seasonal Clothing: Dark woolen clothes in winter (trap air in porous fibers, air is poor conductor; dark absorbs heat); Light white cotton clothes in summer (reflect sunlight, absorb sweat).",
          "Vacuum Flask (Thermos): Minimizes all three modes of heat loss: 1. Double glass walls with Vacuum in between prevents Conduction and Convection; 2. Silvered mirrored walls reflect heat back by Radiation; 3. Insulating plastic cork prevents heat loss via conduction/convection."
        ]
      }
    ],
    "examTraps": [
      "Confusing Sea Breeze (occurs during the DAY, blowing from SEA to LAND) with Land Breeze (occurs at NIGHT, blowing from LAND to SEA).",
      "Assuming wool is a good conductor of heat (wool is an INSULATOR because it traps non-conducting air pockets between its fibers)."
    ],
    "quickMentalCheck": "Why do two thin wool blankets keep a person warmer than a single thick wool blanket of equal mass? The layer of air trapped between the two thin blankets acts as an additional non-conducting thermal insulating barrier.",
    "cueQuestions": [
      "How do differential heating rates of land and sea generate coastal Sea Breezes during the day and Land Breezes at night?",
      "How does a double-walled silvered vacuum flask prevent heat transfer via conduction, convection, and radiation?",
      "Why are solar water heater absorber panels coated with matte black paint rather than white gloss?"
    ],
    "workedExample": {
      "problem": "Explain how the architectural design of a Vacuum Thermos Flask minimizes heat transfer through (a) Conduction, (b) Convection, and (c) Radiation.",
      "steps": [
        "(a) Conduction: The flask consists of a double-walled glass vessel with the space between the walls evacuated to create a vacuum. Since conduction requires material contact, heat cannot conduct across the vacuum.",
        "(b) Convection: Convection requires fluid molecules to circulate. The vacuum gap completely eliminates fluid medium, preventing convection currents. The insulating plastic stopper at the top blocks convective air loss.",
        "(c) Radiation: Both interior surfaces of the double glass walls facing the vacuum are coated with a shiny silver mirror. The silvered inner wall reflects radiant heat back into the hot liquid, while the outer silver wall reflects external heat away."
      ],
      "result": "\\text{Vacuum prevents Conduction & Convection}; \\quad \\text{Silvered mirrored walls prevent Radiation}"
    },
    "verificationProblem": "Check heat loss elimination: Vacuum eliminates matter-based transfer; emissivity $\\epsilon \\to 0$ eliminates radiative transfer. Thermos physics verified.",
    "realWorldUse": "Cryogenic liquid nitrogen dewar storage flasks, double-glazed energy-efficient architectural windows, solar thermal flat-plate water heaters.",
    "diagramType": "sea-breeze-land-breeze-convection-cycle"
  },
  "CBSE-CH-G7-SCI-CH08": {
    "chapterTitle": "Measurement of Time and Motion",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 8,
    "essentialLaw": "\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} \\quad | \\quad v = \\frac{s}{t} \\quad | \\quad T = 2\\pi\\sqrt{\\frac{L}{g}} \\; (\\text{Simple Pendulum}) \\quad | \\quad 1\\text{ m/s} = \\frac{18}{5}\\text{ km/h}",
    "coreConcepts": [
      {
        "heading": "Time Measurement, Periodic Motion & Simple Pendulum",
        "bullets": [
          "Historical Time Devices: Sundials (shadow position, e.g., Jantar Mantar), Water clocks, Sand hourglasses based on natural periodic events (day, lunar month, solar year).",
          "Periodic Motion & Simple Pendulum (Galileo Galilei): Consists of a small metallic bob suspended by light thread; Oscillates periodically about mean position; One complete oscillation from mean to extreme A $\\to$ extreme B $\\to$ back to mean.",
          "Time Period ($T$): Time taken to complete one full oscillation; $T$ depends ONLY on the length of the pendulum ($L$) and is strictly independent of the mass of the bob or amplitude (Isochronism)."
        ]
      },
      {
        "heading": "Speed Calculation, Speedometer/Odometer & Distance-Time Graphs",
        "bullets": [
          "Speed: Distance covered per unit time: $\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}$; SI Unit: $\\text{m/s}$; Commercial unit: $\\text{km/h}$; Conversion: $1\\text{ km/h} = \\frac{5}{18}\\text{ m/s}$, $1\\text{ m/s} = \\frac{18}{5}\\text{ km/h} = 3.6\\text{ km/h}$.",
          "Uniform vs Non-Uniform Motion: Uniform motion (equal distances in equal intervals of time, constant speed, straight line $s-t$ graph) vs Non-Uniform motion (variable speed, curved $s-t$ graph).",
          "Vehicle Instruments: Speedometer (records instantaneous speed in $\\text{km/h}$) and Odometer (records total cumulative distance traveled in $\\text{km}$).",
          "Distance-Time Graph Interpretation: Slope of distance-time graph represents speed (Steeper slope $\\implies$ higher speed; Horizontal flat line $\\implies$ object is at rest)."
        ]
      }
    ],
    "examTraps": [
      "Using the conversion factor upside down: To convert $\\text{km/h}$ to $\\text{m/s}$, MULTIPLY by $5/18$; to convert $\\text{m/s}$ to $\\text{km/h}$, MULTIPLY by $18/5$.",
      "Assuming heavier pendulum bobs swing faster (the time period of a simple pendulum is COMPLETELY independent of the mass of the bob)."
    ],
    "quickMentalCheck": "Convert a vehicle speed of $72\\text{ km/h}$ into SI units of $\\text{m/s}$: $\\text{Speed} = 72 \\times \\frac{5}{18} = 4 \\times 5 = 20\\text{ m/s}$.",
    "cueQuestions": [
      "How does Galileo discovery of isochronism in a swinging pendulum form the basis of pendulum clocks?",
      "What is the difference between a vehicle speedometer and an odometer?",
      "How do you deduce the speed and stationary state of an object from its distance-time line graph?"
    ],
    "workedExample": {
      "problem": "A simple pendulum takes $32\\text{ seconds}$ to complete $20$ full oscillations. What is the time period of this pendulum?",
      "steps": [
        "Total time recorded: $t = 32\\text{ seconds}$.",
        "Number of complete oscillations: $n = 20$.",
        "Formula for Time Period ($T$): $T = \\frac{\\text{Total Time Taken}}{\\text{Number of Oscillations}}$.",
        "Calculate: $T = \\frac{32\\text{ s}}{20} = 1.6\\text{ seconds}$."
      ],
      "result": "T = 1.6\\text{ seconds}"
    },
    "verificationProblem": "Check frequency: $\\nu = 1/T = 1/1.6 = 0.625\\text{ Hz}$. Total oscillations $= 0.625 \\times 32\\text{ s} = 20$. Arithmetic verified.",
    "realWorldUse": "Quartz crystal watches utilizing piezoelectric resonance ($32,768\\text{ Hz}$), vehicle digital odometer trip mileage monitoring, radar speed traps.",
    "diagramType": "distance-time-graph-uniform-vs-nonuniform"
  },
  "CBSE-CH-G7-SCI-CH09": {
    "chapterTitle": "Life Processes in Animals",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 9,
    "essentialLaw": "\\text{Animal Physiology: Holozoic Ingestion} \\to \\text{Digestion} \\to \\text{Absorption} \\to \\text{Assimilation} \\to \\text{Egestion} \\quad | \\quad \\text{Ruminants: 4-Chambered Stomach}",
    "coreConcepts": [
      {
        "heading": "Animal Nutrition Steps, Human Teeth & Alimentary Canal",
        "bullets": [
          "Five Steps of Animal Nutrition: 1. Ingestion (taking in food); 2. Digestion (breaking complex food into simple soluble forms); 3. Absorption (uptake into bloodstream); 4. Assimilation (utilization by cells for growth/energy); 5. Egestion (expelling undigested feces).",
          "Human Dentition (32 permanent teeth): Incisors ($8$, cutting/biting), Canines ($4$, tearing meat), Premolars ($8$, grinding), Molars ($12$, crushing); Dental formula in adults: $\\frac{2123}{2123}$.",
          "Human Digestive System: Mouth (Saliva digests starch) $\\to$ Esophagus (Peristaltic muscular contraction) $\\to$ Stomach (Secretes $HCl$, pepsin for proteins, mucus) $\\to$ Small Intestine (Bile from liver emulsifies fats; Pancreatic juice breaks carbs/proteins/fats; Villi absorb nutrients) $\\to$ Large Intestine (absorbs water/salts) $\\to$ Rectum and Anus."
        ]
      },
      {
        "heading": "Nutrition in Amoeba & Ruminant Digestion (Cud Chewing)",
        "bullets": [
          "Nutrition in Amoeba: Phagocytosis using finger-like Pseudopodia $\\to$ engulfs food forming Food Vacuole $\\to$ digestive enzymes break down food $\\to$ absorbed into cytoplasm $\\to$ undigested residue thrown out.",
          "Digestion in Grass-Eating Animals (Ruminants: Cows, Buffaloes, Deer): Quickly swallow grass and store in Rumen (first stomach chamber where symbiotic cellulose-digesting bacteria begin fermentation) $\\to$ partially digested Cud returns to mouth in small lumps to be chewed leisurely (Rumination) $\\to$ passes into remaining chambers (Reticulum, Omasum, Abomasum true stomach) $\\to$ large Caecum digests cellulose fiber."
        ]
      }
    ],
    "examTraps": [
      "Assuming humans can digest cellulose like cattle (humans lack symbiotic cellulase-producing microorganisms and a functional caecum to digest cellulose).",
      "Confusing the true acid-secreting stomach of ruminants (the Abomasum is the true functional stomach; Rumen is the fermentation chamber)."
    ],
    "quickMentalCheck": "Why do grass-eating cows chew cud continuously even when resting? Grass contains tough cellulose that requires preliminary bacterial fermentation in the rumen before being brought back to the mouth for secondary mastication.",
    "cueQuestions": [
      "What are the four types of human teeth and their specialized functional roles in mechanical digestion?",
      "How does Amoeba capture and digest microscopic food particles using pseudopodia and food vacuoles?",
      "How does the 4-chambered stomach (Rumen, Reticulum, Omasum, Abomasum) of ruminants digest complex plant cellulose?"
    ],
    "workedExample": {
      "problem": "Trace the path of grass through the four chambers of a cow’s digestive system and explain the significance of rumination.",
      "steps": [
        "1. Ingestion & Rumen: The cow quickly swallows grass with minimal chewing. It enters the Rumen, the largest chamber where anaerobic bacteria and protozoa ferment cellulose.",
        "2. Cud Formation: The partially digested fermented food forms the Cud.",
        "3. Rumination: While resting, the cow regurgitates the cud from the Reticulum back into the mouth in small boluses and chews it thoroughly.",
        "4. Omasum & Abomasum: The finely ground food is swallowed again, passes through the Omasum (water absorption), and enters the Abomasum (true stomach where gastric juices and enzymes complete protein digestion).",
        "5. Benefit: Allows herbivores to ingest large volumes of forage rapidly in open grasslands, retreating to safe cover to chew and digest slowly."
      ],
      "result": "\\text{Mouth} \\to \\text{Rumen (Fermentation)} \\to \\text{Cud back to Mouth (Chewing)} \\to \\text{Omasum} \\to \\text{Abomasum (True Stomach)}"
    },
    "verificationProblem": "Check cellulose breakdown: Cellulase enzymes produced by symbiotic rumen microbes break $\\beta-1,4$-glycosidic bonds. Ruminant biochemistry verified.",
    "realWorldUse": "Formulating high-efficiency dairy cattle total mixed rations (TMR), oral rehydration therapy (ORT) for severe diarrheal dehydration.",
    "diagramType": "ruminant-digestive-system-four-chambers"
  },
  "CBSE-CH-G7-SCI-CH10": {
    "chapterTitle": "Life Processes in Plants",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 10,
    "essentialLaw": "\\text{Plant Autotrophy: } 6\\text{CO}_2 + 6\\text{H}_2\\text{O} \\xrightarrow{\\text{Light/Chl}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\quad | \\quad \\text{Parasitic (Cuscuta), Insectivorous (Pitcher)}",
    "coreConcepts": [
      {
        "heading": "Autotrophic Photosynthesis & Plant Mineral Nutrition",
        "bullets": [
          "Autotrophic Nutrition: Green plants synthesize carbohydrates from simple inorganic raw materials: Carbon dioxide (from air via stomata with guard cells) and Water (absorbed by roots from soil) using sunlight trapped by green pigment Chlorophyll.",
          "Stomata: Microscopic pores on leaf epidermis bounded by two kidney-shaped guard cells that open and close based on turgor pressure; Transpiration generates suction pull.",
          "Mineral Nutrition: Plants absorb minerals ($N, P, K$) from soil; Leguminous plants harbor symbiotic Rhizobium bacteria in root nodules that fix atmospheric nitrogen gas ($N_2$) into soluble nitrates in exchange for carbohydrates."
        ]
      },
      {
        "heading": "Heterotrophic Modes in Plants (Parasitic, Saprotrophic, Insectivorous, Symbiotic)",
        "bullets": [
          "Parasitic Plants: Lack chlorophyll and absorb ready-made nutrients from host plant using specialized haustorial roots (e.g., Cuscuta / Amarbel total stem parasite).",
          "Insectivorous Plants: Photosynthetic green plants growing in nitrogen-deficient bogs that trap and digest insects to obtain nitrogen (e.g., Pitcher Plant Nepenthes leaves modified into pitcher with lid and downward-pointing hairs; Venus flytrap; Drosera sundew).",
          "Saprotrophic Nutrition: Secrete digestive enzymes onto dead decaying organic matter and absorb soluble nutrients (e.g., Fungi, Mushrooms, Bread mould).",
          "Symbiotic Associations: Mutual beneficial partnership (e.g., Lichens: symbiotic association of green alga Phycobiont providing food + fungus Mycobiont providing shelter, water, and minerals)."
        ]
      }
    ],
    "examTraps": [
      "Assuming insectivorous plants like the Pitcher Plant do not perform photosynthesis (they ARE green photosynthetic plants that trap insects ONLY to fulfill nitrogen deficits).",
      "Confusing parasitic Cuscuta (steals nutrients, harms host) with symbiotic Lichens (mutual cooperative benefit)."
    ],
    "quickMentalCheck": "Why do pitcher plants catch and digest insects if they have green leaves and perform photosynthesis? They grow in marshy, nitrogen-poor soil and digest insect proteins to supplement their nitrogen requirements.",
    "cueQuestions": [
      "How does the mutualistic symbiosis between Rhizobium bacteria and leguminous root nodules benefit agricultural soils?",
      "Why is Cuscuta (Amarbel) classified as a complete stem parasite on host trees?",
      "How do guard cells regulate the opening and closing of stomatal pores for gas exchange and transpiration?"
    ],
    "workedExample": {
      "problem": "Categorize the following plants into their respective modes of nutrition: (a) Mango tree, (b) Cuscuta (Amarbel), (c) Pitcher plant (Nepenthes), (d) Mushroom (Agaricus), (e) Lichen.",
      "steps": [
        "(a) Mango tree: Autotrophic Nutrition (possesses chlorophyll, synthesizes its own carbohydrates via photosynthesis).",
        "(b) Cuscuta (Amarbel): Parasitic Nutrition (non-green plant that climbs on host trees and absorbs nutrients via haustoria).",
        "(c) Pitcher plant: Insectivorous / Partial Heterotrophic (green photosynthetic plant that digests insects for nitrogen).",
        "(d) Mushroom (Agaricus): Saprotrophic Nutrition (absorbs dissolved nutrients from dead decaying organic compost).",
        "(e) Lichen: Symbiotic Nutrition (mutualistic co-living between an alga and a fungus)."
      ],
      "result": "(a) \\text{Autotroph}; \\; (b) \\text{Parasite}; \\; (c) \\text{Insectivorous}; \\; (d) \\text{Saprotroph}; \\; (e) \\text{Symbiont}"
    },
    "verificationProblem": "Check nutritional spectrum: Complete coverage of autotrophic, parasitic, insectivorous, saprotrophic, and symbiotic plant strategies. Verified.",
    "realWorldUse": "Bio-fertilizer inoculation with Rhizobium cultures in pulse farming, crop rotation eliminating nitrogenous chemical fertilizers.",
    "diagramType": "modes-of-plant-nutrition-classification"
  },
  "CBSE-CH-G7-SCI-CH11": {
    "chapterTitle": "Light: Shadows and Reflections",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 11,
    "essentialLaw": "\\text{Rectilinear Propagation of Light} \\quad | \\quad \\text{Plane Mirror: Virtual, Erect, Same Size, Laterally Inverted, } v = u \\quad | \\quad \\angle i = \\angle r",
    "coreConcepts": [
      {
        "heading": "Rectilinear Propagation of Light, Shadows & Pinhole Camera",
        "bullets": [
          "Rectilinear Propagation: Light travels strictly along straight lines in a homogeneous medium (demonstrated by looking at candle flame through straight vs bent pipe).",
          "Shadow Formation: Formed when an opaque object blocks the straight-line path of light; Requires: Light source, Opaque obstacle, and Screen; Characteristics: Always dark, shows only outline shape regardless of object color.",
          "Pinhole Camera: Works on rectilinear propagation; Forms an inverted, real, colored image of a distant bright object on screen without using any glass lens."
        ]
      },
      {
        "heading": "Reflection of Light, Plane Mirror Image Properties & Lateral Inversion",
        "bullets": [
          "Reflection of Light: Bouncing back of light rays from polished shiny surface; $\\angle i = \\angle r$.",
          "Properties of Image in a Plane Mirror: 1. Strictly Virtual (cannot be caught on screen); 2. Strictly Erect (upright); 3. Same size as the object ($h' = h$); 4. Image distance equals object distance ($v = u$, formed as far behind mirror as object is in front); 5. Laterally Inverted (left side of object appears as right side of image, e.g., AMBULANCE written inverted so drivers see it correctly in rear-view mirrors).",
          "Spherical Mirrors Preview: Concave mirror (curved inward, converging) vs Convex mirror (curved outward, diverging with wide field of view)."
        ]
      }
    ],
    "examTraps": [
      "Assuming shadows show the colors and internal details of an object (shadows show ONLY the outer dark geometric silhouette).",
      "Confusing Lateral Inversion (left-right reversal in a plane mirror) with vertical inversion (upside down)."
    ],
    "quickMentalCheck": "If you stand $2.0\\text{ meters}$ in front of a vertical plane mirror, what is the distance between you and your image? $d = 2.0\\text{ m} + 2.0\\text{ m} = 4.0\\text{ meters}$.",
    "cueQuestions": [
      "How does the pinhole camera prove that light travels in straight lines (rectilinear propagation)?",
      "What are the five distinct characteristics of an image formed by a flat plane mirror?",
      "Why is the word \"AMBULANCE\" printed laterally inverted on the front of emergency hospital vehicles?"
    ],
    "workedExample": {
      "problem": "David is observing his image in a plane mirror. The distance between the mirror and his image is $4.0\\text{ m}$. If he moves $1.0\\text{ m}$ towards the mirror, what will be the new distance between David and his image?",
      "steps": [
        "Initial distance between mirror and image $= 4.0\\text{ m} \\implies$ Initial distance of David from mirror $= 4.0\\text{ m}$.",
        "David moves $1.0\\text{ m}$ towards the mirror $\\implies$ New object distance from mirror: $u = 4.0\\text{ m} - 1.0\\text{ m} = 3.0\\text{ m}$.",
        "By the plane mirror law, image distance behind mirror equals object distance: $v = 3.0\\text{ m}$.",
        "Calculate total distance between David and his new image: $d = u + v = 3.0\\text{ m} + 3.0\\text{ m} = 6.0\\text{ m}$."
      ],
      "result": "\\text{New Distance between David and Image} = 6.0\\text{ meters}"
    },
    "verificationProblem": "Check displacement subtraction: Original distance $= 8.0\\text{ m}$. Moving $1.0\\text{ m}$ closer reduces separation by $2 \\times 1.0\\text{ m} = 2.0\\text{ m} \\implies 8.0 - 2.0 = 6.0\\text{ m}$. Verified.",
    "realWorldUse": "Submarine periscope construction using two plane mirrors at $45^circ$, kaleidoscope artistic multiple reflection patterns, optical fitting dressing mirrors.",
    "diagramType": "plane-mirror-lateral-inversion-ray-diagram"
  },
  "CBSE-CH-G7-SCI-CH12": {
    "chapterTitle": "Earth, Moon, and the Sun",
    "subject": "Science",
    "grade": 7,
    "chapterNum": 12,
    "essentialLaw": "\\text{Solar Eclipse: Sun} - \\text{Moon} - \\text{Earth (New Moon)} \\quad | \\quad \\text{Lunar Eclipse: Sun} - \\text{Earth} - \\text{Moon (Full Moon)} \\quad | \\quad \\text{Tides: Gravitational Pull}",
    "coreConcepts": [
      {
        "heading": "Earth Rotation & Revolution, Seasons & Lunar Phases",
        "bullets": [
          "Earth Motions: Rotation on tilted axis ($23.5^\\circ$ tilt, $24\\text{ hours}$) causes Day and Night; Revolution around Sun ($365.25\\text{ days}$ in elliptical orbit) along with axial tilt causes Changing Seasons (Summer/Winter Solstices, Equinoxes).",
          "Moon Characteristics: Earth sole natural satellite ($384,400\\text{ km}$ distance); Lacks atmosphere and water, surface covered with craters; Orbital and rotational period are identical ($27.3\\text{ days}$, synchronous rotation $\\implies$ same side always faces Earth).",
          "Phases of the Moon: 29.5-day synodic lunar cycle from New Moon (Amavasya) to Full Moon (Poornima) due to changing angle of reflected sunlight."
        ]
      },
      {
        "heading": "Solar & Lunar Eclipses, Umbra/Penumbra & Ocean Tides",
        "bullets": [
          "Shadow Anatomy: Umbra (central region of total shadow darkness) vs Penumbra (outer region of partial shadow).",
          "Solar Eclipse: Occurs on New Moon when Moon comes directly between Sun and Earth, casting its shadow on Earth (Total solar eclipse in umbra path, partial in penumbra); Never view with naked eyes.",
          "Lunar Eclipse: Occurs on Full Moon when Earth comes directly between Sun and Moon, casting Earth shadow on the Moon (Moon appears reddish copper due to refracted atmospheric light).",
          "Ocean Tides: Periodic rise and fall of ocean sea levels caused by the gravitational pull of the Moon and Sun: Spring Tides (exceptionally high tides during New/Full Moon when Sun, Moon, Earth align) vs Neap Tides (lower tides at first/third quarter moons when Sun and Moon pull at $90^\\circ$)."
        ]
      }
    ],
    "examTraps": [
      "Confusing the celestial alignment: Solar Eclipse is SUN-MOON-EARTH (Moon is in the middle); Lunar Eclipse is SUN-EARTH-MOON (Earth is in the middle).",
      "Assuming eclipses occur every month (they do not because the Moon orbital plane is tilted by $\\approx 5^\\circ$ relative to Earth ecliptic plane)."
    ],
    "quickMentalCheck": "Why do eclipses not occur on every single New Moon and Full Moon? The Moon orbital plane is tilted at an angle of $5^circ$ to Earth orbital plane, so the three celestial bodies align in a perfect straight line (syzygy) only a few times each year.",
    "cueQuestions": [
      "How does the $23.5^circ$ tilt of Earth rotational axis combined with its annual revolution cause changing seasons?",
      "Why does the Moon always present the exact same face toward Earth (synchronous rotation)?",
      "How do the combined gravitational forces of the Moon and Sun produce extreme Spring Tides vs moderate Neap Tides?"
    ],
    "workedExample": {
      "problem": "Draw the alignment of celestial bodies and define the positions of Umbra and Penumbra during: (a) A Solar Eclipse, and (b) A Lunar Eclipse.",
      "steps": [
        "(a) Solar Eclipse Alignment: Sun $\\longrightarrow$ Moon $\\longrightarrow$ Earth (Occurs strictly on a New Moon day). The Moon blocks sunlight, casting its shadow on Earth. Observers within the central dark Umbra experience a Total Solar Eclipse; observers in the outer Penumbra experience a Partial Solar Eclipse.",
        "(b) Lunar Eclipse Alignment: Sun $\\longrightarrow$ Earth $\\longrightarrow$ Moon (Occurs strictly on a Full Moon night). The massive Earth blocks sunlight, casting its shadow over the Moon. When the entire Moon passes through Earth Umbra, a Total Lunar Eclipse occurs."
      ],
      "result": "\\text{Solar: Sun-Moon-Earth (New Moon)}; \\quad \\text{Lunar: Sun-Earth-Moon (Full Moon)}"
    },
    "verificationProblem": "Check eclipse visibility: Lunar eclipses are visible across the entire nighttime hemisphere; solar eclipses are visible only along a narrow umbral track ($~100\\text{ km}$ wide). Geometry verified.",
    "realWorldUse": "Tidal barrage renewable hydroelectric power generation (e.g., Rance tidal plant), astronomical ephemeris eclipse prediction algorithms.",
    "diagramType": "solar-and-lunar-eclipse-geometry"
  }
};
