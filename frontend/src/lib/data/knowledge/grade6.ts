/**
 * Brainoro Authoritative Curriculum Knowledge Registry
 * File: grade6.ts
 * Total Chapters: 42
 */

import { DeterministicChapterKnowledge } from '../../services/deterministicChapterRegistry';

export const GRADE6_KNOWLEDGE: Record<string, DeterministicChapterKnowledge> = {
  "CBSE-CH-G6-MATH-CH01": {
    "chapterTitle": "Patterns in Mathematics",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 1,
    "essentialLaw": "\\text{Arithmetic Sequence Pattern: } T_n = a + (n-1)d \\quad | \\quad \\text{Triangular Numbers: } T_n = \\frac{n(n+1)}{2} \\quad | \\quad \\text{Square Numbers: } S_n = n^2",
    "coreConcepts": [
      {
        "heading": "Visual and Number Sequences",
        "bullets": [
          "Recognizing visual patterns in geometric shapes (triangles, squares, tessellations) and sequences of dots.",
          "Square numbers ($1, 4, 9, 16, 25, \\dots$) formed by arranging dots in square grids ($n \\times n = n^2$).",
          "Triangular numbers ($1, 3, 6, 10, 15, \\dots$) formed by adding consecutive natural numbers: $T_n = 1 + 2 + \\dots + n = \\frac{n(n+1)}{2}$."
        ]
      },
      {
        "heading": "Algebraic Generalization of Rules",
        "bullets": [
          "Finding general algebraic rules for number patterns (e.g., matchstick patterns where $k$ matches make $n$ shapes: $Rule = an + b$).",
          "Sum of consecutive odd numbers starting from 1 equals square numbers ($1 = 1^2, 1+3=4=2^2, 1+3+5=9=3^2$).",
          "Fibonacci sequence pattern ($1, 1, 2, 3, 5, 8, 13, \\dots$) where each term is the sum of the two preceding terms."
        ]
      }
    ],
    "examTraps": [
      "Confusing triangular numbers with square numbers; sum of two consecutive triangular numbers always gives a square number ($T_{n-1} + T_n = n^2$, e.g., $3 + 6 = 9 = 3^2$).",
      "Missing the constant difference $d$ when writing general term $T_n = a + (n-1)d$."
    ],
    "quickMentalCheck": "What is the 5th triangular number? (Answer: $\\frac{5 \\times 6}{2} = 15$).",
    "cueQuestions": [
      "How does representing numbers as dot arrays provide geometric proof for the sum of consecutive integers?",
      "Why does the sum of the first $n$ odd natural numbers always equal $n^2$?",
      "What algebraic formula generates the number of matchsticks required to construct a chain of $n$ connected hexagons?"
    ],
    "workedExample": {
      "problem": "Find the rule for the number of matchsticks required to make $n$ connected squares in a row, and calculate the matchsticks needed for 25 squares.",
      "steps": [
        "1 square requires 4 matchsticks: $3(1) + 1 = 4$.",
        "2 connected squares share 1 common side, requiring $4 + 3 = 7$ matchsticks: $3(2) + 1 = 7$.",
        "3 connected squares require $7 + 3 = 10$ matchsticks: $3(3) + 1 = 10$.",
        "General rule for $n$ squares is $M = 3n + 1$.",
        "For $n = 25$ squares: $M = 3(25) + 1 = 75 + 1 = 76$ matchsticks."
      ],
      "result": "\\text{Rule: } M = 3n + 1, \\quad M(25) = 76 \\text{ matchsticks}"
    },
    "verificationProblem": "Check for $n=1,2,3$: $3(1)+1=4, 3(2)+1=7, 3(3)+1=10$. Matches sequence exactly.",
    "realWorldUse": "Used in textile weaving loom jacquard patterns, architectural tile tessellations, computer algorithm recursion, and biological leaf arrangement modeling.",
    "diagramType": "dot-pattern-triangular-square-numbers"
  },
  "CBSE-CH-G6-MATH-CH02": {
    "chapterTitle": "Lines and Angles",
    "subject": "MATHEMATICS",
    "grade": 6,
    "chapterNum": 2,
    "essentialLaw": "\\angle 1 + \\angle 2 = 180^\\circ \\quad [\\text{Linear Pair}] \\quad \\Big| \\quad \\angle AOD = \\angle BOC \\quad [\\text{Vertically Opposite Angles}]",
    "coreConcepts": [
      {
        "heading": "Line, Ray, and Angle Fundamentals",
        "bullets": [
          "Line segment has two fixed endpoints; ray has one endpoint extending infinitely; straight line extends infinitely in both directions.",
          "Angle classification: Acute (< 90 deg), Right (= 90 deg), Obtuse (> 90 deg and < 180 deg), Straight (= 180 deg), Reflex (> 180 deg and < 360 deg)."
        ]
      },
      {
        "heading": "Complementary and Supplementary Angles",
        "bullets": [
          "Complementary angles: Sum of measures of two angles equals 90 degrees.",
          "Supplementary angles: Sum of measures of two angles equals 180 degrees.",
          "Linear pair: Adjacent angles on a straight line whose non-common arms form opposite rays (Sum = 180 degrees)."
        ]
      },
      {
        "heading": "Intersecting Lines & Parallel Transversals",
        "bullets": [
          "Vertically opposite angles: When two straight lines intersect, opposite angles formed are always equal.",
          "Transversal relationships across parallel lines: Corresponding angles are equal; Alternate interior angles are equal; Interior angles on the same side sum to 180 degrees."
        ]
      }
    ],
    "examTraps": [
      "Complementary vs Supplementary Confusion: Mixing up 90-degree sum (complementary) with 180-degree sum (supplementary).",
      "Linear Pair vs Straight Angle Distinction: Assuming any two angles that sum to 180 degrees form a linear pair without checking if they are adjacent on a common line.",
      "Alternate Angle Misattribution: Applying alternate interior angle equality to intersecting transversals without verifying that the base lines are strictly parallel."
    ],
    "quickMentalCheck": "Find the complement of an angle measuring 35 degrees (Answer: 90 - 35 = 55 degrees) and its supplement (Answer: 180 - 35 = 145 degrees).",
    "cueQuestions": [
      "What is the difference between complementary angles and supplementary angles?",
      "State the properties of angles formed when two parallel lines are intersected by a transversal.",
      "Explain why vertically opposite angles are always equal."
    ],
    "workedExample": {
      "problem": "In a given figure, lines AB and CD intersect at O. If \\angle AOC + \\angle BOE = 70^\\circ and \\angle BOD = 40^\\circ, find \\angle BOE and reflex \\angle COE.",
      "steps": [
        "Step 1: Vertically opposite angles -> \\angle AOC = \\angle BOD = 40^\\circ.",
        "Step 2: Find \\angle BOE -> \\angle BOE = 70^\\circ - \\angle AOC = 70^\\circ - 40^\\circ = 30^\\circ.",
        "Step 3: Find \\angle COE -> On straight line AB, \\angle AOC + \\angle COE + \\angle BOE = 180^\\circ => \\angle COE = 180^\\circ - 70^\\circ = 110^\\circ.",
        "Step 4: Find reflex \\angle COE -> 360^\\circ - \\angle COE = 360^\\circ - 110^\\circ = 250^\\circ."
      ],
      "result": "\\angle BOE = 30^\\circ and reflex \\angle COE = 250^\\circ."
    },
    "verificationProblem": "Verify whether two angles measuring 65 degrees and 115 degrees are supplementary.",
    "realWorldUse": "Lines and angles form the fundamental geometric framework for architectural engineering, optical reflections, and spatial coordinate design.",
    "diagramType": "visual_model_pending"
  },
  "CBSE-CH-G6-MATH-CH03": {
    "chapterTitle": "Number Play",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 3,
    "essentialLaw": "\\text{Divisibility Rules: } 2 \\; (\\text{even unit}), \\; 3 \\; (\\sum \\text{digits} \\div 3), \\; 4 \\; (\\text{last 2 digits}), \\; 9 \\; (\\sum \\div 9), \\; 11 \\; (|\\sum_{\\text{odd}} - \\sum_{\\text{even}}| \\div 11)",
    "coreConcepts": [
      {
        "heading": "Place Value & General Form of Numbers",
        "bullets": [
          "A two-digit number $ab$ is written in expanded general form as $10a + b$; a three-digit number $abc$ as $100a + 10b + c$.",
          "Reversing digits: Sum of two-digit number and its reverse $(10a+b) + (10b+a) = 11(a+b)$, which is always divisible by 11 and $(a+b)$.",
          "Difference of two-digit number and its reverse: $(10a+b) - (10b+a) = 9(a-b)$, which is always divisible by 9 and $(a-b)$."
        ]
      },
      {
        "heading": "Divisibility Tests and Cryptarithms",
        "bullets": [
          "Divisibility by 3 and 9: A number is divisible by 3 (or 9) if the sum of its digits is divisible by 3 (or 9).",
          "Divisibility by 11: Difference between sum of digits at odd places and sum of digits at even places is either 0 or a multiple of 11.",
          "Cryptarithms (alphametic puzzles): Letters represent unique single-digit numerals ($0–9$) without leading zeroes."
        ]
      }
    ],
    "examTraps": [
      "Assuming letter assignments in puzzles can represent multi-digit numbers; each letter strictly stands for exactly one digit from 0 to 9.",
      "Forgetting that the leading digit of a number cannot be 0."
    ],
    "quickMentalCheck": "Is the number 1331 divisible by 11? (Answer: Sum odd $= 1+3=4$, Sum even $= 3+1=4$, Difference $= 4-4=0 \\implies$ Yes, divisible by 11).",
    "cueQuestions": [
      "Why is the difference between any two-digit number and its reverse always an exact multiple of 9?",
      "How does the algebraic expansion $100a + 10b + c = 99a + 9b + (a + b + c)$ prove the divisibility rule for 9?",
      "How do you systematically solve addition cryptarithms like $3A + 25 = B2$?"
    ],
    "workedExample": {
      "problem": "Find the value of the digits $A$ and $B$ in the addition puzzle: $3 A + 2 5 = B 2$.",
      "steps": [
        "Look at units column: $A + 5$ ends in $2$.",
        "Since $A$ is a single digit ($0-9$), $A + 5 = 12 \\implies A = 12 - 5 = 7$.",
        "Carry over 1 to tens column: $1 + 3 + 2 = B \\implies B = 6$.",
        "Check complete equation: $37 + 25 = 62$."
      ],
      "result": "A = 7, \\quad B = 6"
    },
    "verificationProblem": "Check: $37 + 25 = 62$. Units digit is 2, tens digit is 6. Matches.",
    "realWorldUse": "Used in barcode check-digit verification algorithms (ISBN, UPC), cryptographic hashing, and modular arithmetic error-checking.",
    "diagramType": "divisibility-cryptarithm-tree"
  },
  "CBSE-CH-G6-MATH-CH04": {
    "chapterTitle": "Data Handling and Presentation",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 4,
    "essentialLaw": "\\text{Pictograph: Symbol Scale Factor } (1 \\odot = k \\text{ units}) \\quad | \\quad \\text{Bar Graph: Uniform Width, Height } \\propto \\text{Frequency}",
    "coreConcepts": [
      {
        "heading": "Data Collection, Organization & Tally Marks",
        "bullets": [
          "Data is a collection of numbers gathered to give meaningful information.",
          "Recording data using Tally Marks in groups of five: four vertical lines crossed by a fifth diagonal stroke ($\\cancel{||||}$).",
          "Frequency table lists each category alongside the total count of tally marks."
        ]
      },
      {
        "heading": "Visual Presentation: Pictographs & Bar Graphs",
        "bullets": [
          "Pictograph represents data using icons/pictures where one symbol represents a specified scale factor (e.g., $1 \\text{ icon} = 10 \\text{ items}$).",
          "Bar Graph represents data through rectangular bars of uniform width drawn with equal spacing between them.",
          "The height (or length) of each bar is directly proportional to the numerical frequency of the corresponding category."
        ]
      }
    ],
    "examTraps": [
      "Drawing bars with unequal widths or unequal spaces between adjacent bars in a bar graph.",
      "Forgetting to specify the chosen scale on the vertical axis (e.g., $1 \\text{ unit length} = 5 \\text{ students}$)."
    ],
    "quickMentalCheck": "If 1 picture represents 4 books, how many pictures are needed to represent 28 books? (Answer: $28 / 4 = 7$ pictures).",
    "cueQuestions": [
      "Why are tally marks organized in clusters of five rather than drawn continuously?",
      "How does choosing an appropriate vertical scale simplify the construction of a bar graph?",
      "What are the advantages of bar graphs over raw tabular numerical lists for visual comparison?"
    ],
    "workedExample": {
      "problem": "The number of mathematics books sold by a shopkeeper in 5 days is: Mon: 40, Tue: 30, Wed: 50, Thu: 20, Fri: 60. Choose a scale and draw frequency bars.",
      "steps": [
        "Choose a convenient vertical scale: $1 \\text{ unit length} = 10 \\text{ books}$.",
        "Calculate bar heights in units:",
        "Monday: $40 / 10 = 4 \\text{ units}$.",
        "Tuesday: $30 / 10 = 3 \\text{ units}$.",
        "Wednesday: $50 / 10 = 5 \\text{ units}$.",
        "Thursday: $20 / 10 = 2 \\text{ units}$.",
        "Friday: $60 / 10 = 6 \\text{ units}$.",
        "Draw vertical bars of uniform width with equal spacing on horizontal axis."
      ],
      "result": "\\text{Scale: } 1 \\text{ unit} = 10 \\text{ books} \\implies \\text{Heights: Mon:4, Tue:3, Wed:5, Thu:2, Fri:6}"
    },
    "verificationProblem": "Check: Total books $= 40+30+50+20+60 = 200$. Total units $= 4+3+5+2+6 = 20$ units. $20 \\times 10 = 200$. Verified.",
    "realWorldUse": "Used in business sales dashboards, population census demographic charts, weather rainfall comparison graphs, and web analytics.",
    "diagramType": "bar-graph-scale-visualization"
  },
  "CBSE-CH-G6-MATH-CH05": {
    "chapterTitle": "Prime Time",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 5,
    "essentialLaw": "\\text{Fundamental Theorem of Arithmetic: } n = p_1^{a_1} p_2^{a_2} \\dots p_k^{a_k} \\quad | \\quad \\text{HCF} \\times \\text{LCM} = a \\times b \\quad | \\quad \\text{Sieve of Eratosthenes}",
    "coreConcepts": [
      {
        "heading": "Prime Numbers, Composites & Sieve of Eratosthenes",
        "bullets": [
          "Prime number: A natural number greater than 1 having exactly two distinct factors: 1 and the number itself ($2, 3, 5, 7, 11, \\dots$). Number 2 is the ONLY even prime.",
          "Composite number: A number having more than two factors ($4, 6, 8, 9, \\dots$). Number 1 is NEITHER prime NOR composite.",
          "Sieve of Eratosthenes: Systematic method of finding all primes up to $n$ by iteratively crossing out multiples of each prime starting from 2."
        ]
      },
      {
        "heading": "Prime Factorization, HCF and LCM",
        "bullets": [
          "Prime Factorization: Expressing a composite number uniquely as a product of prime factors (e.g., $60 = 2^2 \\times 3 \\times 5$).",
          "Highest Common Factor (HCF / GCD): Product of the smallest powers of each common prime factor involved.",
          "Lowest Common Multiple (LCM): Product of the greatest powers of each prime factor involved.",
          "Fundamental relationship for two positive numbers: $\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b$."
        ]
      }
    ],
    "examTraps": [
      "Classifying 1 as a prime number (1 is neither prime nor composite because it has only 1 factor).",
      "Applying the product formula $\\text{HCF} \\times \\text{LCM} = a \\times b \\times c$ to three numbers (it is ONLY valid for TWO numbers)."
    ],
    "quickMentalCheck": "What is the HCF and LCM of 12 and 18? (Answer: $12 = 2^2 \\times 3, 18 = 2 \\times 3^2 \\implies \\text{HCF} = 2 \\times 3 = 6, \\text{LCM} = 2^2 \\times 3^2 = 36$).",
    "cueQuestions": [
      "Why is 2 the only even prime number in the entire set of natural numbers?",
      "How does the Sieve of Eratosthenes systematically isolate prime numbers without testing individual trial divisions for every composite?",
      "Why does the relation $\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b$ hold true for any two positive integers?"
    ],
    "workedExample": {
      "problem": "Find the HCF and LCM of 84 and 90 using prime factorization, and verify that $\\text{HCF} \\times \\text{LCM} = 84 \\times 90$.",
      "steps": [
        "Prime factorize 84: $84 = 2^2 \\times 3^1 \\times 7^1$.",
        "Prime factorize 90: $90 = 2^1 \\times 3^2 \\times 5^1$.",
        "Compute HCF: Common prime factors with lowest powers $= 2^1 \\times 3^1 = 6$.",
        "Compute LCM: All prime factors with highest powers $= 2^2 \\times 3^2 \\times 5^1 \\times 7^1 = 4 \\times 9 \\times 5 \\times 7 = 1,260$.",
        "Verify product: $\\text{HCF} \\times \\text{LCM} = 6 \\times 1260 = 7,560$.",
        "Product of numbers: $84 \\times 90 = 7,560$."
      ],
      "result": "\\text{HCF} = 6, \\quad \\text{LCM} = 1,260, \\quad 6 \\times 1260 = 84 \\times 90 = 7,560"
    },
    "verificationProblem": "Check: $7560 / 6 = 1260$, matching LCM exactly. Verified.",
    "realWorldUse": "Forms the mathematical bedrock of RSA asymmetric public-key cryptography (factoring large prime semi-primes), computer clock synchronization, and gear ratio meshing intervals.",
    "diagramType": "prime-factor-tree-venn-diagram"
  },
  "CBSE-CH-G6-MATH-CH06": {
    "chapterTitle": "Perimeter and Area",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 6,
    "essentialLaw": "\\text{Perimeter: } P_{\\text{rect}} = 2(l + b), \\; P_{\\text{sq}} = 4s \\quad | \\quad \\text{Area: } A_{\\text{rect}} = l \\times b, \\; A_{\\text{sq}} = s^2 \\quad | \\quad 1\\text{ m}^2 = 10,000\\text{ cm}^2",
    "coreConcepts": [
      {
        "heading": "Perimeter of Plane Geometric Figures",
        "bullets": [
          "Perimeter is the total boundary distance around a closed planar two-dimensional figure.",
          "Perimeter of rectangle $= 2 \\times (\\text{length} + \\text{breadth}) = 2(l + b)$.",
          "Perimeter of square $= 4 \\times \\text{side} = 4s$; Perimeter of equilateral triangle $= 3 \\times s$; Regular polygon of $n$ sides $= n \\times s$."
        ]
      },
      {
        "heading": "Area of Rectangles and Squares",
        "bullets": [
          "Area is the amount of surface enclosed by a closed two-dimensional planar boundary.",
          "Area of rectangle $= \\text{length} \\times \\text{breadth} = l \\times b$.",
          "Area of square $= \\text{side} \\times \\text{side} = s^2$; Unit conversion: $1\\text{ m}^2 = 100\\text{ cm} \\times 100\\text{ cm} = 10,000\\text{ cm}^2$."
        ]
      }
    ],
    "examTraps": [
      "Confusing Perimeter (linear distance in $\\text{cm}$ or $\\text{m}$) with Area (surface measurement in $\\text{cm}^2$ or $\\text{m}^2$).",
      "Forgetting to convert all dimensions into matching units before calculating area (e.g., mixing meters with centimeters)."
    ],
    "quickMentalCheck": "If a square has perimeter $36\\text{ cm}$, what is its area? (Answer: Side $s = 36/4 = 9\\text{ cm} \\implies \\text{Area} = 9^2 = 81\\text{ cm}^2$).",
    "cueQuestions": [
      "How does the perimeter of a rectangle change if its length is doubled while keeping its breadth constant?",
      "Why is the conversion factor between square meters and square centimeters $10,000$ rather than $100$?",
      "Can two different rectangles have the same perimeter but completely different enclosed areas?"
    ],
    "workedExample": {
      "problem": "A room is $5\\text{ m}$ long and $4\\text{ m}$ wide. A square carpet of sides $3\\text{ m}$ is laid on the floor. Find the area of the floor that is not carpeted.",
      "steps": [
        "Calculate total area of the floor: $A_{\\text{floor}} = l \\times b = 5\\text{ m} \\times 4\\text{ m} = 20\\text{ m}^2$.",
        "Calculate area of the square carpet: $A_{\\text{carpet}} = s^2 = 3\\text{ m} \\times 3\\text{ m} = 9\\text{ m}^2$.",
        "Subtract carpet area from floor area: $A_{\\text{uncarpeted}} = A_{\\text{floor}} - A_{\\text{carpet}} = 20 - 9 = 11\\text{ m}^2$."
      ],
      "result": "11\\text{ m}^2"
    },
    "verificationProblem": "Check: $9\\text{ m}^2 + 11\\text{ m}^2 = 20\\text{ m}^2 = 5 \\times 4$. Matches.",
    "realWorldUse": "Used in flooring tile estimation, agricultural fencing wire calculation, architectural floorplans, and paint quantity coverage estimation.",
    "diagramType": "perimeter-area-grid-square"
  },
  "CBSE-CH-G6-MATH-CH07": {
    "chapterTitle": "Fractions",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 7,
    "essentialLaw": "\\text{Fraction } \\frac{a}{b} = \\frac{\\text{Numerator}}{\\text{Denominator}} \\quad | \\quad \\text{Equivalent: } \\frac{a}{b} = \\frac{a \\times k}{b \\times k} \\quad | \\quad \\text{Mixed: } Q \\frac{R}{D} = \\frac{Q \\times D + R}{D}",
    "coreConcepts": [
      {
        "heading": "Fraction Concepts, Types & Number Line",
        "bullets": [
          "A fraction $\\frac{a}{b}$ ($b \\neq 0$) represents part of a whole divided into equal parts.",
          "Proper Fraction ($a < b$, value $< 1$), Improper Fraction ($a \\ge b$, value $\\ge 1$), Mixed Fraction ($Q \\frac{R}{D}$).",
          "Representation on number line: Divide each unit interval $[0, 1]$ into $b$ equal segments to locate $\\frac{a}{b}$."
        ]
      },
      {
        "heading": "Equivalent Fractions, Simplest Form & Operations",
        "bullets": [
          "Equivalent Fractions: Formed by multiplying or dividing numerator and denominator by the same non-zero integer: $\\frac{a}{b} = \\frac{ak}{bk}$.",
          "Simplest (Lowest) Form: A fraction $\\frac{a}{b}$ is in simplest form when $\\text{HCF}(a, b) = 1$.",
          "Addition & Subtraction of unlike fractions: Convert to like fractions by finding the LCM of denominators before operating."
        ]
      }
    ],
    "examTraps": [
      "Adding denominators when adding fractions (e.g., writing $\\frac{1}{2} + \\frac{1}{3} = \\frac{2}{5}$, which is mathematically WRONG; must use LCM $\\frac{3+2}{6} = \\frac{5}{6}$).",
      "Forgetting that the denominator of a fraction can NEVER be zero."
    ],
    "quickMentalCheck": "Simplify the fraction $\\frac{24}{36}$ to its simplest form. (Answer: $\\text{HCF}(24,36) = 12 \\implies \\frac{24/12}{36/12} = \\frac{2}{3}$).",
    "cueQuestions": [
      "Why is finding the Least Common Multiple (LCM) of denominators necessary before adding unlike fractions?",
      "How do you convert an improper fraction $\\frac{29}{6}$ into its equivalent mixed fraction representation?",
      "How does cross-multiplication $\\frac{a}{b} = \\frac{c}{d} \\iff ad = bc$ verify fraction equivalence?"
    ],
    "workedExample": {
      "problem": "Evaluate the expression: $\\frac{3}{5} + \\frac{1}{4} - \\frac{7}{10}$.",
      "steps": [
        "Find the LCM of denominators (5, 4, 10): $\\text{LCM} = 20$.",
        "Convert each fraction to like fractions with denominator 20:",
        "$\\frac{3}{5} = \\frac{3 \\times 4}{5 \\times 4} = \\frac{12}{20}$.",
        "$\\frac{1}{4} = \\frac{1 \\times 5}{4 \\times 5} = \\frac{5}{20}$.",
        "$\\frac{7}{10} = \\frac{7 \\times 2}{10 \\times 2} = \\frac{14}{20}$.",
        "Combine numerators: $\\frac{12 + 5 - 14}{20} = \\frac{17 - 14}{20} = \\frac{3}{20}$."
      ],
      "result": "\\frac{3}{20}"
    },
    "verificationProblem": "Check decimals: $0.6 + 0.25 - 0.7 = 0.85 - 0.7 = 0.15 = \\frac{15}{100} = \\frac{3}{20}$. Matches.",
    "realWorldUse": "Used in culinary recipe ingredient scaling, financial interest rate calculations, mechanical gear pitch ratios, and construction measurement blueprints.",
    "diagramType": "fraction-pie-and-number-line"
  },
  "CBSE-CH-G6-MATH-CH08": {
    "chapterTitle": "Playing with Constructions",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 8,
    "essentialLaw": "\\text{Euclidean Ruler-and-Compass: } \\text{Perpendicular Bisector } (\\text{Locus } PA = PB) \\quad | \\quad \\text{Angle Bisector } (\\angle AOC = \\angle BOC)",
    "coreConcepts": [
      {
        "heading": "Geometric Tools & Perpendicular Bisectors",
        "bullets": [
          "Classical construction tools: Graduated ruler (straightedge) and Compass with pencil.",
          "Constructing circle of given radius $r$: Fixed point as center $O$, open compass to radius $r$ and rotate $360^\\circ$.",
          "Perpendicular Bisector of line segment $AB$: Set compass radius $> \\frac{1}{2}AB$, draw intersecting arcs from $A$ and $B$ above and below the line, connect intersection points."
        ]
      },
      {
        "heading": "Angle Bisectors & Standard Angles Construction",
        "bullets": [
          "Bisector of an angle divides given angle into two equal halves (}$\\angle AOC = \\angle BOC = \\frac{1}{2}\\angle AOB$).",
          "Constructing $60^\\circ$ angle: Draw an arc from vertex $O$ intersecting ray at $P$; with same radius, draw intersecting arc from $P$ to get $Q$ (}$\\angle POQ = 60^\\circ$).",
          "Derived angles: Bisecting $60^\\circ$ yields $30^\\circ$; bisecting $30^\\circ$ yields $15^\\circ$; bisecting $60^\\circ$ and $120^\\circ$ yields $90^\\circ$; bisecting $90^\\circ$ yields $45^\\circ$."
        ]
      }
    ],
    "examTraps": [
      "Changing the compass radius opening during arc intersections, which distorts construction accuracy.",
      "Setting compass radius $< \\frac{1}{2}AB$ when constructing a perpendicular bisector (the arcs will fail to intersect)."
    ],
    "quickMentalCheck": "Which angles can be directly constructed using ruler and compass starting from $60^\\circ$ and $90^\\circ$ via successive bisections? (Answer: $60^\\circ, 120^\\circ, 90^\\circ, 45^\\circ, 30^\\circ, 15^\\circ, 75^\\circ, 105^\\circ$).",
    "cueQuestions": [
      "Why must the compass radius be strictly greater than half the segment length when constructing a perpendicular bisector?",
      "How does the equilateral triangle construction principle establish that the first arc cut on a circle produces an exact $60^\\circ$ angle?",
      "How do you construct a $75^\\circ$ angle by bisecting the angle between $60^\\circ$ and $90^\\circ$ rays?"
    ],
    "workedExample": {
      "problem": "Describe the step-by-step procedure to construct an angle of $90^\\circ$ at the initial point of a given ray $OA$ using ruler and compass.",
      "steps": [
        "Draw ray $OA$. With $O$ as center and any radius, draw a semicircle arc intersecting $OA$ at point $P$.",
        "With $P$ as center and same radius, draw an arc intersecting the first arc at $Q$ ($60^\\circ$).",
        "With $Q$ as center and same radius, draw another arc intersecting the semicircle at $R$ ($120^\\circ$).",
        "With $Q$ and $R$ as centers and equal radius $> \\frac{1}{2}QR$, draw two arcs intersecting each other at point $S$.",
        "Draw ray $OS$. The angle $\\angle AOS$ is exactly $90^\\circ$."
      ],
      "result": "\\angle AOS = 90^\\circ \\quad (\\text{Constructed via bisection of } 60^\\circ \\text{ and } 120^\\circ)"
    },
    "verificationProblem": "Check with protractor: $\\angle AOS = 90^\\circ$. Since $60^circ + \\frac{120^circ - 60^circ}{2} = 60^circ + 30^circ = 90^circ$. Verified.",
    "realWorldUse": "Used in civil engineering surveying layout, architectural drafting, mechanical engineering precision tolerances, and carpentry squaring.",
    "diagramType": "compass-ruler-construction-arcs"
  },
  "CBSE-CH-G6-MATH-CH09": {
    "chapterTitle": "Symmetry",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 9,
    "essentialLaw": "\\text{Line of Symmetry: Reflection Mirror Axis } (\\text{Distance to axis } d_P = d_{P'}) \\quad | \\quad \\text{Equilateral } \\triangle = 3, \\; \\text{Square} = 4, \\; \\text{Circle} = \\infty",
    "coreConcepts": [
      {
        "heading": "Line Symmetry (Reflection Symmetry)",
        "bullets": [
          "A figure has line symmetry if a line can be drawn dividing it into two identical halves that coincide exactly when folded along the line.",
          "Line of symmetry acts as a mirror line: corresponding points on both sides are equidistant from the mirror axis ($d_P = d_{P'}$).",
          "Number of lines of symmetry in regular polygons equals the number of sides: Equilateral Triangle has 3 lines, Square has 4 lines, Regular Pentagon has 5 lines, Regular Hexagon has 6 lines."
        ]
      },
      {
        "heading": "Symmetry in Everyday Shapes & English Alphabet",
        "bullets": [
          "Geometric shapes: Rectangle has 2 lines of symmetry (connecting midpoints of opposite sides); Rhombus has 2 lines (along diagonals); Circle has infinitely many lines of symmetry (any diameter).",
          "Alphabet symmetry: Horizontal line symmetry (B, C, D, E, H, I, K, O, X); Vertical line symmetry (A, H, I, M, O, T, U, V, W, X, Y); Both axes (H, I, O, X).",
          "Kaleidoscope and Rangoli designs utilize multiple intersecting mirror reflection symmetry lines."
        ]
      }
    ],
    "examTraps": [
      "Assuming the diagonals of a non-square rectangle are lines of symmetry (folding along a diagonal of a rectangle does NOT make the halves coincide).",
      "Confusing a parallelogram with a symmetric figure (a general parallelogram has 0 lines of reflection symmetry)."
    ],
    "quickMentalCheck": "How many lines of symmetry does a circle have? (Answer: Infinitely many, passing through its center).",
    "cueQuestions": [
      "Why is a diagonal of a rectangle NOT a line of reflection symmetry, whereas a diagonal of a rhombus is?",
      "How many lines of symmetry does an isosceles triangle possess compared to a scalene triangle?",
      "Which letters of the English alphabet possess both vertical and horizontal lines of reflection symmetry?"
    ],
    "workedExample": {
      "problem": "Determine the number of lines of symmetry for each of the following figures: (a) An equilateral triangle, (b) A rectangle, (c) A rhombus, (d) A scalene triangle.",
      "steps": [
        "Equilateral triangle: 3 lines of symmetry (the 3 angle bisectors / medians from each vertex).",
        "Rectangle: 2 lines of symmetry (lines joining the midpoints of opposite parallel sides; diagonals do not work).",
        "Rhombus: 2 lines of symmetry (the 2 intersecting perpendicular diagonals).",
        "Scalene triangle: 0 lines of symmetry (all sides and angles are unequal)."
      ],
      "result": "\\text{Equilateral } \\triangle = 3, \\quad \\text{Rectangle} = 2, \\quad \\text{Rhombus} = 2, \\quad \\text{Scalene } \\triangle = 0"
    },
    "verificationProblem": "Check folding: Folding square along diagonals coincides (4 lines), while rectangle does not (2 lines). Verified.",
    "realWorldUse": "Used in graphic design corporate logo branding, architectural facade balance, crystallography molecular unit cell symmetry, and butterfly wing aerodynamics.",
    "diagramType": "reflection-symmetry-axes-shapes"
  },
  "CBSE-CH-G6-MATH-CH10": {
    "chapterTitle": "The Other Side of Zero",
    "subject": "Mathematics",
    "grade": 6,
    "chapterNum": 10,
    "essentialLaw": "\\mathbb{Z} = \\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\} \\quad | \\quad a + (-b) = a - b \\quad | \\quad -(-a) = +a \\quad | \\quad |x| \\ge 0",
    "coreConcepts": [
      {
        "heading": "Concept of Negative Numbers & Integers",
        "bullets": [
          "Negative numbers represent quantities below zero: temperature below $0^\\circ C$, depths below sea level, financial losses/withdrawals.",
          "The collection of whole numbers together with negative natural numbers forms the set of Integers: $\\mathbb{Z} = \\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$.",
          "Number line representation: Positive integers lie to the right of zero, negative integers lie to the left; as we move right, numbers INCREASE ($a > b \\iff a$ is to the right of $b$)."
        ]
      },
      {
        "heading": "Addition and Subtraction of Integers",
        "bullets": [
          "Additive Inverse: For any integer $a$, its additive inverse is $-a$ such that $a + (-a) = 0$.",
          "Adding same sign: Add absolute values and attach the common sign ($(-3) + (-5) = -8$).",
          "Adding opposite signs: Subtract smaller absolute value from larger and attach sign of larger ($(-7) + 12 = +5$).",
          "Subtraction rule: To subtract an integer, add its additive inverse: $a - b = a + (-b)$ and $a - (-b) = a + b$."
        ]
      }
    ],
    "examTraps": [
      "Assuming $-8 > -2$; on the negative number line, $-2$ is to the right of $-8$, so $-2 > -8$.",
      "Forgetting that $0$ is neither positive nor negative, but is greater than every negative integer."
    ],
    "quickMentalCheck": "Which is greater: $-15$ or $-7$? (Answer: $-7$, because $-7$ is to the right of $-15$ on the number line).",
    "cueQuestions": [
      "Why is $-10$ smaller than $-2$ even though $10$ is greater than $2$?",
      "How does the concept of Additive Inverse simplify the subtraction of negative integers ($a - (-b) = a + b$)?",
      "How do you represent a temperature drop of $12^\\circ C$ from an initial temperature of $5^\\circ C$ on an integer number line?"
    ],
    "workedExample": {
      "problem": "Evaluate the integer expression: $(-13) + 32 - 8 - 1$.",
      "steps": [
        "Group positive and negative integers: Positive terms $= +32$; Negative terms $= (-13) + (-8) + (-1)$.",
        "Sum negative integers: $-13 - 8 - 1 = -(13 + 8 + 1) = -22$.",
        "Combine positive and negative sums: $32 + (-22) = 32 - 22 = 10$."
      ],
      "result": "10"
    },
    "verificationProblem": "Check step-by-step: $(-13) + 32 = 19; 19 - 8 = 11; 11 - 1 = 10$. Matches.",
    "realWorldUse": "Used in financial balance sheets (credits vs withdrawals), submarine sonar altitude/depth tracking, elevation topographic maps, and cryogenic thermometer scales.",
    "diagramType": "integer-number-line-addition"
  },
  "CBSE-CH-G6-SCI-CH01": {
    "chapterTitle": "The Wonderful World of Science",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 1,
    "essentialLaw": "\\text{Scientific Method: Observation} \\to \\text{Question} \\to \\text{Hypothesis} \\to \\text{Experimentation} \\to \\text{Analysis} \\to \\text{Verified Law}",
    "coreConcepts": [
      {
        "heading": "Nature of Science & The Scientific Inquiry Method",
        "bullets": [
          "What is Science: Systematic study of the natural world based on empirical observation, questioning, logical hypothesis testing, and repeatable experimentation.",
          "Steps of Scientific Method: 1. Making systematic observations; 2. Formulating a testable question; 3. Proposing a hypothesis; 4. Conducting controlled experiments with independent/dependent variables; 5. Analyzing data and drawing verifiable conclusions.",
          "Branches of Science: Physical Sciences (Physics, Chemistry) studying inanimate matter and energy; Life Sciences (Biology, Botany, Zoology) studying living organisms; Earth and Space Sciences studying geological and astronomical phenomena."
        ]
      },
      {
        "heading": "Scientific Instruments, Curiosity & Everyday Science",
        "bullets": [
          "Tools of Observation: Magnifying glass, microscopes, telescopes, measuring cylinders, thermometers, stopwatches, and digital balances expand our human sensory perception.",
          "Curiosity and Discovery: Inventions and discoveries transform human society (e.g., discovery of fire, the wheel, antibiotics, electricity, and clean solar energy).",
          "Safety in Science Laboratory: Following protocols, handling glassware carefully, understanding hazard symbols, wearing protective goggles and coats."
        ]
      }
    ],
    "examTraps": [
      "Assuming scientific theories are unchangeable dogmas (scientific models are continually refined and improved as new experimental evidence emerges).",
      "Confusing an observation (what you see) with an inference (logical interpretation of what happened)."
    ],
    "quickMentalCheck": "What distinguishes a controlled scientific experiment from random trial and error? A controlled experiment changes only ONE independent variable at a time while keeping all other control variables constant.",
    "cueQuestions": [
      "What are the sequential steps followed in the scientific method to test a hypothesis?",
      "How have scientific tools like the microscope transformed our understanding of living organisms?",
      "Why is repeatable experimentation essential before an observation is accepted as a scientific fact?"
    ],
    "workedExample": {
      "problem": "A student notices that a plant kept in the dark turns pale and yellow while a plant in sunlight stays green. Formulate a scientific question and a testable hypothesis for this observation.",
      "steps": [
        "1. Scientific Observation: Green plants kept in sunlight retain healthy green leaves, while identical plants kept in darkness lose green color.",
        "2. Scientific Question: \"Does sunlight affect the synthesis of green chlorophyll pigment in plant leaves?\"",
        "3. Testable Hypothesis: \"If a healthy green plant is deprived of sunlight, then its leaves will stop producing chlorophyll and turn yellow because light energy is required for chlorophyll synthesis.\"",
        "4. Experimental Test: Place two identical potted plants in the same soil, water them equally, place Plant A in sunlight and Plant B in a dark cupboard for 7 days, and measure leaf greenness."
      ],
      "result": "\\text{Hypothesis: Sunlight is required for synthesis of chlorophyll in plant leaves}"
    },
    "verificationProblem": "Check control variable isolation: Soil, water, temperature, and plant species are kept identical so only sunlight varies. Controlled experiment verified.",
    "realWorldUse": "Clinical vaccine trials using double-blind control groups, agricultural crop yield optimization through controlled nutrient trials.",
    "diagramType": "scientific-method-inquiry-cycle"
  },
  "CBSE-CH-G6-SCI-CH02": {
    "chapterTitle": "Diversity in the Living World",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 2,
    "essentialLaw": "\\text{Habitat Adaptation: Plants/Animals Modify Anatomy } (\\text{Camel: Hump, Long legs; Cactus: Spines, CAM}) \\implies \\text{Ecological Survival}",
    "coreConcepts": [
      {
        "heading": "Habitats (Terrestrial vs Aquatic) & Biotic/Abiotic Factors",
        "bullets": [
          "Habitat: Natural environment where an organism lives and thrives, providing food, water, air, and shelter.",
          "Terrestrial Habitats: Forests, Grasslands, Deserts (dry, high day temp), Mountain regions (cold, snowy with sloping trees and thick-furred animals).",
          "Aquatic Habitats: Freshwater (ponds, lakes, rivers) and Marine (oceans with saline water); Estuaries where fresh and salt water mix.",
          "Components: Biotic components (living plants, animals, microorganisms) interacting continuously with Abiotic components (light, temperature, soil, air, water)."
        ]
      },
      {
        "heading": "Adaptations in Desert, Mountain & Aquatic Organisms",
        "bullets": [
          "Desert Adaptations: Camel (long legs to keep body away from hot sand, excretes small urine, dry dung, can survive days without water, wide padded feet for sand walking); Cactus (leaves modified into spines to minimize transpiration, thick green stem performs photosynthesis and stores water, waxy cuticle, deep roots).",
          "Mountain Adaptations: Conical sloping pine trees shed snow easily; Mountain goat has strong hooves for rocky slopes; Snow leopard has thick fur and padded paws.",
          "Aquatic Adaptations: Fish (streamlined spindle-shaped body to reduce water drag, slippery scales, gills for extracting dissolved oxygen, fins and flat tail for steering and balance); Water lily (hollow air-filled petioles, broad waxy floating leaves with stomata on upper surface)."
        ]
      }
    ],
    "examTraps": [
      "Assuming desert plants have stomata on the lower surface like normal plants (cactus leaves are modified into spines and photosynthetic stems have sunken stomata).",
      "Confusing adaptation (long-term evolutionary genetic traits) with temporary seasonal acclimatization."
    ],
    "quickMentalCheck": "Why do water lilies have stomata located on the upper surface of their floating leaves rather than the lower surface? The lower surface is in direct contact with water, so stomata must face the air above for gas exchange.",
    "cueQuestions": [
      "How does the streamlined body shape of aquatic fish reduce resistance during swimming in water?",
      "What specific morphological adaptations allow camels to survive extended periods in arid desert environments?",
      "Why do mountain trees possess cone-shaped canopies and flexible downward-sloping branches?"
    ],
    "workedExample": {
      "problem": "List three morphological adaptations of desert plants (xerophytes like Cactus) that minimize water loss in arid environments.",
      "steps": [
        "1. Leaf Modification: Leaves are reduced or modified into sharp spines, dramatically reducing the surface area available for transpiration water loss.",
        "2. Photosynthetic Green Stem: The stem becomes green, fleshy, and succulent, taking over the function of photosynthesis and storing substantial volumes of water.",
        "3. Thick Waxy Cuticle & Deep Root System: The stem surface is covered with a thick waxy layer to prevent evaporation, and root systems penetrate deeply into the ground to reach subterranean moisture."
      ],
      "result": "\\text{Spines (low transpiration)} + \\text{Succulent green stem} + \\text{Thick waxy cuticle & deep roots}"
    },
    "verificationProblem": "Check transpiration reduction: Spines have near-zero stomata compared to broad flat leaves, reducing water loss by $>95\\%$. Adaptation verified.",
    "realWorldUse": "Designing streamlined aerodynamic high-speed trains (bullet train nose modeled on kingfisher beak), xeriscaping landscaping in drought-prone cities.",
    "diagramType": "habitat-adaptations-desert-vs-aquatic"
  },
  "CBSE-CH-G6-SCI-CH03": {
    "chapterTitle": "Mindful Eating: A Path to a Healthy Body",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 3,
    "essentialLaw": "\\text{Balanced Diet} = \\text{Carbohydrates (Energy)} + \\text{Fats} + \\text{Proteins (Growth)} + \\text{Vitamins/Minerals (Protection)} + \\text{Roughage} + \\text{Water}",
    "coreConcepts": [
      {
        "heading": "Essential Nutrients & Laboratory Food Testing",
        "bullets": [
          "Major Nutrients: Carbohydrates (energy providers: starch and sugars), Fats (concentrated energy store, more energy per gram than carbs), Proteins (body-building and tissue repair), Vitamins & Minerals (protective nutrients), Dietary Fiber / Roughage (prevents constipation), Water (transports nutrients, removes wastes as urine and sweat).",
          "Food Tests: 1. Starch Test (Dilute Iodine turns food blue-black); 2. Protein Test (Food paste $+ 2\\text{ drops } CuSO_4 + 10\\text{ drops } NaOH$ turns violet); 3. Fat Test (Rubbing food on paper produces a translucent oily patch)."
        ]
      },
      {
        "heading": "Balanced Diet & Deficiency Diseases",
        "bullets": [
          "Balanced Diet: A diet containing all essential nutrients in appropriate proportions, along with adequate roughage and water, suited to age and physical labor.",
          "Deficiency Diseases: Scurvy (Vitamin C deficiency: bleeding gums, loose teeth; Citrus fruits); Rickets (Vitamin D / Calcium deficiency: soft bent leg bones; Sunlight, milk); Night Blindness (Vitamin A deficiency: poor vision in dim light; Carrots, papaya); Beriberi (Vitamin B1 deficiency: weak muscles, nerve fatigue; Whole grains); Goitre (Iodine deficiency: enlarged thyroid neck gland; Iodised salt); Anaemia (Iron deficiency: low hemoglobin, weakness, paleness; Spinach, jaggery); Marasmus & Kwashiorkor (Protein-Energy Malnutrition / PEM in children: stunted growth, pot belly, wasting)."
        ]
      }
    ],
    "examTraps": [
      "Assuming fats provide less energy than carbohydrates (fats provide more than DOUBLE the energy per gram compared to carbohydrates).",
      "Confusing Vitamin C deficiency (Scurvy: bleeding gums) with Vitamin D deficiency (Rickets: weak bones)."
    ],
    "quickMentalCheck": "What color change confirms the presence of starch in a potato slice when drops of iodine solution are added? Blue-black color.",
    "cueQuestions": [
      "How do you test for the presence of proteins in a food sample using copper sulfate and caustic soda?",
      "Why is dietary fiber (roughage) essential in our daily diet even though it provides no nutritional calories?",
      "What dietary deficiency causes night blindness and what foods should be consumed to prevent it?"
    ],
    "workedExample": {
      "problem": "Match the following vitamins and minerals with their corresponding deficiency disease and primary food source: (a) Vitamin A, (b) Vitamin C, (c) Vitamin D, (d) Iron.",
      "steps": [
        "(a) Vitamin A: Deficiency Disease: Night blindness (loss of vision in dim light). Food Source: Carrots, papaya, green leafy vegetables, fish liver oil.",
        "(b) Vitamin C: Deficiency Disease: Scurvy (bleeding gums, prolonged wound healing). Food Source: Citrus fruits (oranges, lemons), amla, tomatoes.",
        "(c) Vitamin D: Deficiency Disease: Rickets (bent bones, pigeon chest). Food Source: Milk, butter, eggs, and exposure to natural sunlight.",
        "(d) Iron: Deficiency Disease: Anaemia (fatigue, paleness, low hemoglobin). Food Source: Spinach, jaggery, green leafy vegetables, meat."
      ],
      "result": "(a) \\text{Vit A} \\to \\text{Night blindness}; \\; (b) \\text{Vit C} \\to \\text{Scurvy}; \\; (c) \\text{Vit D} \\to \\text{Rickets}; \\; (d) \\text{Iron} \\to \\text{Anaemia}"
    },
    "verificationProblem": "Check biochemical pairing: Vit C is ascorbic acid required for collagen in gums; Iron is active ion in hemoglobin. Clinical pathology verified.",
    "realWorldUse": "National Mid-Day Meal nutritional fortification programs, universal salt iodization eliminating endemic goitre, iron-folic acid anemia prophylaxis.",
    "diagramType": "balanced-diet-food-pyramid-nutrients"
  },
  "CBSE-CH-G6-SCI-CH04": {
    "chapterTitle": "Exploring Magnets",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 4,
    "essentialLaw": "\\text{Magnetic Law: Like Poles Repel } (N-N, \\; S-S) \\quad | \\quad \\text{Unlike Poles Attract } (N-S) \\quad | \\quad \\text{Repulsion is the Sure Test of Magnetism}",
    "coreConcepts": [
      {
        "heading": "Magnetic Materials, Magnetic Poles & Magnetic Compass",
        "bullets": [
          "Discovery of Magnets: Shepherd Magnes in ancient Greece found lodestone (Magnetite, natural iron ore $Fe_3O_4$).",
          "Magnetic vs Non-Magnetic: Magnetic materials are attracted by magnets (Iron, Nickel, Cobalt, Steel); Non-magnetic are not attracted (Wood, Plastic, Glass, Copper, Aluminium).",
          "Poles of a Magnet: Every magnet has two poles (North pole and South pole) located near the ends where magnetic attraction is strongest; Magnetic monopoles do not exist: cutting a magnet always produces two smaller dipoles.",
          "Magnetic Compass: Freely suspended magnetic needle aligns along North-South geographic direction; Used for centuries by navigators, sailors, and explorers."
        ]
      },
      {
        "heading": "Laws of Magnetism, Making Magnets & Magnetic Storage Care",
        "bullets": [
          "Fundamental Law of Magnetism: Like poles repel each other ($N-N$ or $S-S$); Unlike poles attract each other ($N-S$); Repulsion is the ONLY sure test of magnetism (attraction occurs between magnet and unmagnetized iron, but repulsion occurs only between two magnets).",
          "Making a Magnet (Single Touch Method): Stroking an iron bar with one pole of a bar magnet in a single direction 30-40 times.",
          "Loss of Magnetism (Demagnetization): Magnets lose their strength when heated strongly, hammered, dropped from a height, or stored improperly.",
          "Safe Storage: Bar magnets stored in pairs with opposite poles alongside separated by wood and soft iron keepers across the ends; Horse-shoe magnet requires a single keeper across poles."
        ]
      }
    ],
    "examTraps": [
      "Stating that attraction proves an object is a magnet (Attraction can occur between a magnet and any unmagnetized iron piece; only REPULSION proves the object itself is a magnet).",
      "Stroking back-and-forth when making a temporary magnet (must stroke in ONE continuous direction without reversing)."
    ],
    "quickMentalCheck": "If a bar magnet is broken into 3 pieces, how many North poles and South poles are created in total? 3 North poles and 3 South poles (each piece becomes an independent dipole magnet with 2 poles).",
    "cueQuestions": [
      "Why is repulsion considered the only foolproof test to confirm that a given metallic bar is a magnet?",
      "Why does a freely suspended bar magnet always align in the geographic North-South direction?",
      "How should bar magnets be properly stored using soft iron keepers to prevent self-demagnetization?"
    ],
    "workedExample": {
      "problem": "You are given two identical-looking steel rods [A] and [B], one of which is a magnet while the other is simple unmagnetized steel. How will you identify which one is the magnet without using any other object?",
      "steps": [
        "1. Take rod [A] and touch its tip (pole) to the center (middle) of rod [B].",
        "2. If rod [A] attracts the center of rod [B], then rod [A] is the MAGNET (because magnetic attraction is concentrated at the poles of rod [A], which can pull the center of plain iron rod [B]).",
        "3. If there is NO attraction when the tip of rod [A] touches the center of rod [B], then rod [B] is the MAGNET (because a magnet has near-zero magnetic force at its exact center, so an unmagnetized rod [A] touched to the middle of magnet [B] will experience no force)."
      ],
      "result": "\\text{Tip of magnet attracts center of plain steel; Tip of plain steel experiences zero force at center of magnet}"
    },
    "verificationProblem": "Check magnetic field distribution: Pole strength is maximum at ends and zero at the neutral equator of a bar magnet. Identification method verified.",
    "realWorldUse": "Magnetic stripe verification on metro transit cards, refrigerator door gasket seals, maglev train magnetic levitation, scrap yard crane electromagnets.",
    "diagramType": "magnetic-poles-attraction-repulsion-compass"
  },
  "CBSE-CH-G6-SCI-CH05": {
    "chapterTitle": "Measurement of Length and Motion",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 5,
    "essentialLaw": "1\\text{ km} = 1000\\text{ m} \\quad | \\quad 1\\text{ m} = 100\\text{ cm} \\quad | \\quad 1\\text{ cm} = 10\\text{ mm} \\quad | \\quad \\text{Motion} = \\text{Change of Position with Time}",
    "coreConcepts": [
      {
        "heading": "Standard Units (SI Units) & Accurate Length Measurement",
        "bullets": [
          "Need for Standard Units: Ancient non-standard units (Handspan, Cubit, Foot, Pace) varied from person to person; Metric System (France, 1790) and International System of Units (SI Units, 1960) established universal standards: SI unit of Length is Meter (m).",
          "Unit Conversions: $1\\text{ km} = 1000\\text{ m}$; $1\\text{ m} = 100\\text{ cm}$; $1\\text{ cm} = 10\\text{ mm}$.",
          "Accurate Measurement with Ruler: 1. Place scale in contact along length; 2. If zero mark is damaged/broken, measure from integer mark (e.g., $1.0\\text{ cm}$) and subtract: $\\text{Length} = \\text{Reading} - 1.0\\text{ cm}$; 3. Eye must be placed vertically directly above the reading point to prevent Parallax Error.",
          "Measuring Curved Lines: Using a flexible piece of thread to trace the curved curve, then measuring the straightened thread length on a standard meter scale."
        ]
      },
      {
        "heading": "Types of Motion: Rectilinear, Circular, Periodic & Rotational",
        "bullets": [
          "Concept of Rest & Motion: An object is in motion if its position changes relative to a stationary reference point (frame of reference) over time.",
          "Rectilinear Motion: Motion along a straight line path (e.g., apple falling from tree, sprinters in $100\\text{ m}$ dash, march-past of soldiers).",
          "Circular Motion: Motion along a circular path at fixed distance from center (e.g., blade tip of rotating fan, stone tied to a string whirled around, hands of a clock).",
          "Rotational Motion: An object spins around its own fixed internal axis without changing overall position (e.g., spinning top, rotation of Earth on axis, potter wheel).",
          "Periodic Motion: Motion that repeats itself at regular fixed intervals of time (e.g., swing of simple pendulum, branch of tree swaying in breeze, heartbeat, guitar string vibration)."
        ]
      }
    ],
    "examTraps": [
      "Parallax Error: Reading a scale from an angle rather than placing the eye vertically perpendicular above the mark.",
      "Confusing Circular Motion (object moves along circular trajectory, e.g., Earth revolving around Sun) with Rotational Motion (object spins on its own internal axis, e.g., Earth rotating on axis)."
    ],
    "quickMentalCheck": "What type of motion does a sewing machine needle vs its wheel exhibit? The sewing machine needle exhibits Periodic/Oscillatory motion (moves up and down regularly), while its wheel exhibits Circular/Rotational motion.",
    "cueQuestions": [
      "Why are standard SI units necessary in science and trade instead of traditional body measurements like cubits?",
      "How can the length of a curved boundary line be accurately measured using a thread and meter rule?",
      "How does an object like a rolling ball on ground exhibit both rotational and rectilinear motion simultaneously?"
    ],
    "workedExample": {
      "problem": "While measuring the length of a wooden block, the reading at one end of a damaged broken ruler is $2.5\\text{ cm}$ and at the other end is $18.2\\text{ cm}$. What is the true length of the block in meters?",
      "steps": [
        "Initial reading at the starting edge: $x_1 = 2.5\\text{ cm}$.",
        "Final reading at the ending edge: $x_2 = 18.2\\text{ cm}$.",
        "True length of wooden block in centimeters: $L = x_2 - x_1 = 18.2\\text{ cm} - 2.5\\text{ cm} = 15.7\\text{ cm}$.",
        "Convert centimeters to standard SI meters: $1\\text{ m} = 100\\text{ cm} \\implies L = \\frac{15.7}{100}\\text{ m} = 0.157\\text{ m}$."
      ],
      "result": "L = 15.7\\text{ cm} = 0.157\\text{ m}"
    },
    "verificationProblem": "Check broken ruler offset: $2.5\\text{ cm} + 15.7\\text{ cm} = 18.2\\text{ cm}$. Subtraction verified.",
    "realWorldUse": "Surveying highway civil engineering routes using laser rangefinders, precision caliper machining in mechanical tool rooms.",
    "diagramType": "types-of-motion-classification-diagram"
  },
  "CBSE-CH-G6-SCI-CH06": {
    "chapterTitle": "Materials Around Us",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 6,
    "essentialLaw": "\\text{Classification: Appearance (Lustre)} + \\text{Hardness} + \\text{Solubility} + \\text{Density (Float/Sink)} + \\text{Transparency (Transparent/Translucent/Opaque)}",
    "coreConcepts": [
      {
        "heading": "Grouping Materials & Physical Properties (Appearance, Hardness, Solubility)",
        "bullets": [
          "Need for Grouping: Classifying objects based on properties allows systematic study of patterns, similarities, and practical uses.",
          "Lustre (Shine): Metals have metallic shine (Gold, Silver, Copper, Iron); Non-metals are dull (freshly cut metallic surfaces show characteristic lustre).",
          "Hardness: Hard materials cannot be compressed or scratched easily (Iron, Diamond); Soft materials can be compressed/scratched easily (Cotton, Sponge, Wax).",
          "Solubility in Water: Soluble substances dissolve completely forming clear solution (Sugar, Salt); Insoluble substances do not dissolve (Sand, Sawdust); Immiscible liquids form separate layers (Mustard oil, Kerosene in water); Miscible liquids mix completely (Vinegar, Alcohol in water)."
        ]
      },
      {
        "heading": "Flotation, Transparency & Practical Material Selection",
        "bullets": [
          "Flotation & Density: Objects with density less than water float (Dried leaf, Wood, Cork, Ice, Oil); Objects with density greater than water sink (Iron nail, Stone, Coin).",
          "Transparency Categories: 1. Transparent (allows light to pass through completely, objects seen clearly: Clear glass, Clean water, Air); 2. Translucent (allows partial light, objects seen blurred/partially: Frosted glass, Butter paper, Oiled paper); 3. Opaque (allows zero light, cannot see through: Wood board, Cardboard carton, Metal plate).",
          "Material Choice: Selecting materials based on functional properties (e.g., cooking pots made of heat-conducting metals with heat-insulating plastic/wooden handles; windows made of transparent glass for light)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Translucent (partial blurred light transmission, e.g., butter paper) with Transparent (clear distinct light transmission, e.g., clean glass).",
      "Thinking all liquids mix with water (oil and water are immiscible and form distinct separate density layers)."
    ],
    "quickMentalCheck": "Why are cooking utensils made of metals like aluminium or copper, but their handles are made of wood or Bakelite plastic? Metals are good thermal conductors to cook food quickly, while wood/plastic are thermal insulators protecting hands from burns.",
    "cueQuestions": [
      "How does sorting and grouping objects into categories benefit everyday life and scientific study?",
      "How do you classify materials into transparent, translucent, and opaque based on light transmission?",
      "Why does an ice cube float on liquid water even though it is a solid block of the same substance?"
    ],
    "workedExample": {
      "problem": "Classify the following objects into Transparent, Translucent, and Opaque: (a) Clean water, (b) Wooden door, (c) Butter paper, (d) Aluminium foil, (e) Clear spectacles lens, (f) Frosted bathroom glass.",
      "steps": [
        "1. Transparent (Light passes through freely, objects behind seen with crisp clarity): (a) Clean water, (e) Clear spectacles lens.",
        "2. Translucent (Light passes through partially, objects behind seen blurred and hazy): (c) Butter paper, (f) Frosted bathroom glass.",
        "3. Opaque (Light is completely blocked, objects behind cannot be seen at all): (b) Wooden door, (d) Aluminium foil."
      ],
      "result": "\\text{Transparent: Clean water, Spectacles}; \\; \\text{Translucent: Butter paper, Frosted glass}; \\; \\text{Opaque: Wooden door, Aluminium foil}"
    },
    "verificationProblem": "Check optical definition: Translucent materials scatter light rays internally, preventing sharp focal convergence on retina. Classification verified.",
    "realWorldUse": "Architectural privacy glazing with frosted translucent glass, optical window design in submersibles, manufacturing food storage containers.",
    "diagramType": "material-properties-transparency-solubility-matrix"
  },
  "CBSE-CH-G6-SCI-CH07": {
    "chapterTitle": "Temperature and its Measurement",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 7,
    "essentialLaw": "\\text{Temperature} = \\text{Measure of Hotness/Coldness} \\quad | \\quad \\text{Clinical: } 35^\\circ\\text{C} - 42^\\circ\\text{C} \\; (\\text{Normal } 37.0^\\circ\\text{C} = 98.6^\\circ\\text{F}) \\quad | \\quad \\text{Lab: } -10^\\circ\\text{C} \\text{ to } 110^\\circ\\text{C}",
    "coreConcepts": [
      {
        "heading": "Concept of Heat vs Temperature & Clinical Thermometer",
        "bullets": [
          "Temperature: Quantitative degree of hotness or coldness of an object measured using a Thermometer; Senses of touch are subjective and unreliable.",
          "Clinical Thermometer: Designed specifically for measuring human body temperature; Range: $35^\\circ\\text{C}$ to $42^\\circ\\text{C}$ (or $94^\\circ\\text{F}$ to $108^\\circ\\text{F}$); Normal human body temperature is $37.0^\\circ\\text{C} = 98.6^\\circ\\text{F}$.",
          "Kink (Constriction): Essential feature located just above the mercury bulb; Prevents the mercury level from falling on its own when removed from the patient mouth, allowing accurate reading; Must be given a gentle jerk before reuse."
        ]
      },
      {
        "heading": "Laboratory Thermometer & Modern Digital Thermometers",
        "bullets": [
          "Laboratory Thermometer: Used for experimental chemical/physical measurements; Wide range: $-10^\\circ\\text{C}$ to $110^\\circ\\text{C}$; Lacks a kink, so reading MUST be taken while the bulb remains immersed in the hot liquid.",
          "Precautions for Laboratory Thermometer: 1. Keep upright without tilting; 2. Bulb must be fully surrounded by liquid without touching bottom or walls of beaker; 3. Read at eye level with mercury meniscus.",
          "Digital Thermometers: Do not use toxic liquid mercury; Use electronic heat-sensitive thermistor sensors, making them safe for children and clinical medicine."
        ]
      }
    ],
    "examTraps": [
      "Using a clinical thermometer to measure boiling water ($100^circ\\text{C}$) (clinical thermometer has max range of $42^circ\\text{C}$ and will shatter due to thermal expansion pressure).",
      "Taking the reading of a laboratory thermometer after taking it out of the hot liquid (laboratory thermometer lacks a kink and its mercury drops immediately upon removal)."
    ],
    "quickMentalCheck": "Why does a clinical thermometer have a kink/constriction in its capillary tube while a laboratory thermometer does not? The kink prevents mercury from flowing back into the bulb automatically, allowing the doctor to read the body temperature accurately after removing it from the mouth.",
    "cueQuestions": [
      "Why is human sense of touch unreliable for measuring the exact temperature of objects?",
      "Why must a laboratory thermometer be read while its bulb is still immersed in the liquid being measured?",
      "Why are modern digital thermometers replacing traditional mercury glass thermometers in clinical practice?"
    ],
    "workedExample": {
      "problem": "State three major differences between a Clinical Thermometer and a Laboratory Thermometer on the basis of: Range, Presence of Kink, and Intended Usage.",
      "steps": [
        "1. Temperature Range: Clinical thermometer has a narrow range of $35^\\circ\\text{C}$ to $42^\\circ\\text{C}$ (centered on body temp). Laboratory thermometer has a wide range of $-10^\\circ\\text{C}$ to $110^\\circ\\text{C}$.",
        "2. Presence of Kink: Clinical thermometer contains a constriction (kink) near the bulb to prevent mercury backflow upon removal. Laboratory thermometer has NO kink.",
        "3. Reading Protocol: Clinical thermometer can be read after removal from the human body. Laboratory thermometer must be read while immersed in the substance."
      ],
      "result": "\\text{Clinical: } 35-42^\\circ\\text{C}, \\text{ has kink, body temp}; \\quad \\text{Laboratory: } -10 \\text{ to } 110^\\circ\\text{C}, \\text{ no kink, chemical labs}"
    },
    "verificationProblem": "Check mercury toxicity elimination: Modern digital thermistors eliminate the hazardous spill risks of $1.5\\text{ g}$ elemental liquid mercury. Safety verified.",
    "realWorldUse": "Pediatric digital fever monitoring thermometers, laboratory water bath thermal calibration, HVAC building climate temperature sensors.",
    "diagramType": "clinical-vs-laboratory-thermometer-comparison"
  },
  "CBSE-CH-G6-SCI-CH08": {
    "chapterTitle": "A Journey through States of Water",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 8,
    "essentialLaw": "\\text{Water Cycle: Evaporation} + \\text{Transpiration} \\to \\text{Condensation (Clouds)} \\to \\text{Precipitation (Rain/Snow)} \\to \\text{Groundwater Recharge}",
    "coreConcepts": [
      {
        "heading": "Three States of Water & Interconversion Processes",
        "bullets": [
          "Three Physical States: Solid (Ice, snow at $\\le 0^\\circ\\text{C}$), Liquid (Water at $0-100^\\circ\\text{C}$), Gas (Water vapor/steam at $\\ge 100^\\circ\\text{C}$).",
          "Evaporation: Conversion of liquid water into vapor at any temperature below boiling point; Accelerated by higher temperature, larger surface area, higher wind speed, and lower humidity; Transpiration is water evaporation from plant stomata.",
          "Condensation: Conversion of water vapor into liquid water droplets upon cooling (e.g., water droplets on outside of glass containing ice water); Forms clouds, fog, mist, and dew."
        ]
      },
      {
        "heading": "The Natural Water Cycle, Rainwater Harvesting & Conservation",
        "bullets": [
          "Natural Water Cycle: Continuous circulation of water between Earth and atmosphere: Solar heat causes Evaporation from oceans/rivers + Transpiration from plants $\\to$ warm air rises $\\to$ cools and condenses around airborne dust particles into tiny droplets forming Clouds $\\to$ droplets combine and fall as Precipitation (Rain, Snow, Hail) $\\to$ rivers return water to oceans; Infiltration recharges Groundwater aquifers.",
          "Water Scarcity & Floods/Droughts: Heavy continuous rain causes Floods (crop damage, waterborne disease); Lack of rain over prolonged periods causes Droughts (drying of wells, famine).",
          "Rainwater Harvesting (RWH): Rooftop rainwater collection into storage tanks and recharge pits (\"Catch water where it falls\") to recharge depleting groundwater tables."
        ]
      }
    ],
    "examTraps": [
      "Assuming evaporation occurs only at $100^circ\\text{C}$ (boiling occurs at $100^circ\\text{C}$, but EVAPORATION occurs at ALL temperatures from open water surfaces).",
      "Thinking clouds are made of water vapor gas (clouds are composed of tiny liquid water droplets condensed around microscopic dust nuclei)."
    ],
    "quickMentalCheck": "Why do tiny water droplets appear on the outer surface of a glass tumbler containing ice-cold water? Water vapor present in ambient air touches the cold outer surface of the tumbler, loses heat, and condenses into visible liquid water droplets.",
    "cueQuestions": [
      "How do evaporation and transpiration drive the upward movement of water vapor in the natural water cycle?",
      "Why does wet laundry dry significantly faster on a sunny, windy day with low atmospheric humidity?",
      "How does rooftop rainwater harvesting help prevent urban flooding and replenish underground aquifers?"
    ],
    "workedExample": {
      "problem": "Explain the four sequential stages of the global Natural Water Cycle starting from solar evaporation to groundwater infiltration.",
      "steps": [
        "1. Evaporation & Transpiration: Solar radiation heats surface water bodies (oceans, lakes, rivers), converting water into invisible water vapor. Plants simultaneously release water vapor via stomatal transpiration.",
        "2. Updraft & Condensation: Warm water vapor rises into the upper troposphere where temperatures are lower. As the air cools, water vapor condenses around suspended microscopic dust particles into billions of tiny liquid droplets, forming Clouds.",
        "3. Precipitation: Within clouds, tiny water droplets collide and coalesce into larger drops. When they become too heavy to remain suspended in air currents, they fall to the ground as Rain, Snow, Sleet, or Hail.",
        "4. Surface Runoff & Infiltration: Rainwater flows into streams and rivers returning to oceans (Runoff), while a fraction percolates deep through soil layers (Infiltration), replenishing the groundwater water table."
      ],
      "result": "\\text{Evaporation/Transpiration} \\to \\text{Condensation (Clouds)} \\to \\text{Precipitation (Rain)} \\to \\text{Runoff/Infiltration}"
    },
    "verificationProblem": "Check global mass balance: Total annual global precipitation equals total annual global evaporation ($~577,000\\text{ km}^3/\\text{year}$). Conservation of mass verified.",
    "realWorldUse": "Urban rooftop rainwater recharge pits in municipal building codes, meteorology flood forecasting radar networks, drip irrigation water conservation in agriculture.",
    "diagramType": "natural-water-cycle-evaporation-precipitation"
  },
  "CBSE-CH-G6-SCI-CH09": {
    "chapterTitle": "Methods of Separation in Everyday Life",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 9,
    "essentialLaw": "\\text{Mixture Separation: Difference in Physical Properties (Particle Size, Density, Boiling Point, Solubility, Magnetic Nature)}",
    "coreConcepts": [
      {
        "heading": "Solid-Solid Separation Techniques (Handpicking, Threshing, Winnowing, Sieving)",
        "bullets": [
          "Need for Separation: To remove harmful/undesirable impurities or to obtain pure valuable components from a mixture.",
          "Handpicking: Manual removal of large, distinctly colored impurities in small quantities (e.g., picking small stones and husk from rice/pulses).",
          "Threshing: Beating harvested crop stalks against a hard surface or using mechanical threshers/combine harvesters to detach grain seeds from dry stalks.",
          "Winnowing: Separation of lighter husk particles from heavier grain seeds using blowing wind; Lighter husk blows away forming a separate heap.",
          "Sieving: Separation of particles of different sizes using a perforated mesh screen (e.g., separating fine flour from coarse bran, stones from sand at construction sites)."
        ]
      },
      {
        "heading": "Solid-Liquid Separation & Evaporation/Condensation",
        "bullets": [
          "Sedimentation & Decantation: Sedimentation is settling down of heavier insoluble particles at the bottom of water (e.g., mud in water); Decantation is carefully pouring off the clear supernatant liquid without disturbing the sediment.",
          "Filtration: Passing a mixture through a fine porous filter paper or cloth to separate insoluble solids from liquid (clearer than decantation, e.g., filtering tea leaves, fruit juice pulp).",
          "Evaporation: Heating a solution to convert liquid water into vapor, leaving behind dissolved solid solute (e.g., obtaining common salt from seawater in shallow evaporation ponds).",
          "Condensation & Distillation: Cooling vapor back into pure liquid; Saturated Solution: A solution in which no more solute can dissolve at a given temperature (heating increases solubility)."
        ]
      }
    ],
    "examTraps": [
      "Using sieving when particles are of the exact same size (sieving works ONLY when there is a distinct difference in particle size).",
      "Confusing Decantation (pouring clear liquid above sediment) with Filtration (passing liquid through a physical porous filter)."
    ],
    "quickMentalCheck": "Which method is used by farmers to separate light dry husk from heavy wheat grains using wind? Winnowing (based on difference in weight/density carried by wind currents).",
    "cueQuestions": [
      "How is common salt harvested commercially from seawater using large shallow evaporation lagoons?",
      "How does a saturated sugar solution behave when heated to a higher temperature?",
      "What sequence of separation techniques (sedimentation, decantation, filtration, evaporation) is used to separate a mixture of sand, salt, and water?"
    ],
    "workedExample": {
      "problem": "Outline a step-by-step procedure to separate and recover each component from a mixture containing Sand, Common Salt, and Iron filings.",
      "steps": [
        "1. Step 1 (Magnetic Separation): Pass a powerful bar magnet through the dry mixture. Iron filings are attracted and cling to the magnet, completely separating the magnetic Iron component.",
        "2. Step 2 (Dissolution in Water): Add water to the remaining mixture of sand and common salt and stir thoroughly. Common salt dissolves completely in water, while sand remains insoluble.",
        "3. Step 3 (Filtration): Pour the mixture through a filter paper cone in a funnel. Insoluble Sand remains on the filter paper as residue, while clear Salt Solution passes through as filtrate.",
        "4. Step 4 (Evaporation): Heat the salt filtrate in an evaporating dish until all water boils away as vapor. Pure crystalline Common Salt is recovered as solid residue."
      ],
      "result": "\\text{1. Magnet (Iron)} \\to \\text{2. Dissolve in water} \\to \\text{3. Filtration (Sand)} \\to \\text{4. Evaporation (Salt)}"
    },
    "verificationProblem": "Check property basis: Magnetism isolates Iron; Solubility difference isolates Sand; Boiling point difference isolates Salt. Physical property matrix verified.",
    "realWorldUse": "Municipal drinking water filtration and chlorination plants, solar salt pan crystallization along coastlines, flour mill rotary sifter processing.",
    "diagramType": "filtration-sedimentation-decantation-setup"
  },
  "CBSE-CH-G6-SCI-CH10": {
    "chapterTitle": "Living Creatures: Exploring their Characteristics",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 10,
    "essentialLaw": "\\text{Characteristics of Life: Cellular Organization} + \\text{Nutrition} + \\text{Respiration} + \\text{Growth} + \\text{Response to Stimuli} + \\text{Excretion} + \\text{Reproduction}",
    "coreConcepts": [
      {
        "heading": "Universal Characteristics of Living Organisms",
        "bullets": [
          "Living vs Non-Living: Living organisms exhibit a coordinated suite of biological processes that non-living objects do not possess.",
          "1. Nutrition & Metabolism: All living beings require food/nutrients to obtain energy for biological maintenance and cellular growth.",
          "2. Respiration: Inhaling oxygen to oxidize food and release biochemical energy (Breathing is physical gas exchange; Respiration is cellular energy release).",
          "3. Growth: Irreversible increase in size, mass, and cell number from young stages to adult form.",
          "4. Excretion: Getting rid of toxic metabolic waste products (urea, sweat, $CO_2$) to maintain internal homeostasis."
        ]
      },
      {
        "heading": "Response to Stimuli, Reproduction, Movement & Life Span",
        "bullets": [
          "5. Response to Stimuli (Irritability): Living organisms react to environmental changes (e.g., pulling hand from hot object, Mimosa leaves closing on touch, cockroaches running away from light).",
          "6. Reproduction: Producing offspring of their own kind (Asexual or Sexual; oviparous laying eggs or viviparous giving birth; plants produce seeds/vegetative runners).",
          "7. Movement & Locomotion: Animals move from place to place for food/shelter; Plants exhibit internal sap movement and tropic bending (sunflower turning toward sun).",
          "8. Definite Life Span: Living organisms are born, grow, mature, reproduce, age, and ultimately die."
        ]
      }
    ],
    "examTraps": [
      "Confusing physical breathing (taking in air) with cellular respiration (chemical oxidation of food to release ATP energy).",
      "Assuming non-living things that grow (like sugar crystals or sand dunes) are living (non-living growth is external addition of surface material; living growth is internal cellular multiplication)."
    ],
    "quickMentalCheck": "Why is reproduction essential for a living species even though an individual organism can survive without reproducing? Reproduction ensures the continuity of the species and prevents its extinction over successive generations.",
    "cueQuestions": [
      "How does living growth from within differ from the non-living growth observed in growing crystal lattices or sand dunes?",
      "What are stimuli and how does the touch-me-not plant (Mimosa pudica) demonstrate rapid response to mechanical touch?",
      "Why is cellular respiration considered a universal hallmark of all living organisms including plants and microorganisms?"
    ],
    "workedExample": {
      "problem": "List five essential characteristics of living organisms and illustrate each with one specific example from the plant kingdom.",
      "steps": [
        "1. Nutrition: Green plants synthesize their own food (glucose) via photosynthesis using sunlight, water, and carbon dioxide.",
        "2. Growth: A tiny mustard seed germinates into a seedling and grows into a mature branching flowering plant.",
        "3. Respiration: Plant cells consume oxygen during the day and night to break down sugars in mitochondria, releasing energy and $CO_2$.",
        "4. Response to Stimuli: The leaves of the \"touch-me-not\" plant (Mimosa pudica) droop and fold inward rapidly when touched.",
        "5. Excretion: Plants excrete excess water as water vapor via transpiration and store waste resins/gums in old non-functional xylem."
      ],
      "result": "\\text{Nutrition, Growth, Respiration, Irritability (Stimuli), and Excretion demonstrated in plants}"
    },
    "verificationProblem": "Check universal criteria: All five traits operate concurrently in autotrophic flora. Biological definition verified.",
    "realWorldUse": "Astrobiology biosignature screening for extraterrestrial life on Mars/Europa, biological quarantine inspection of agricultural imports.",
    "diagramType": "characteristics-of-living-organisms-wheel"
  },
  "CBSE-CH-G6-SCI-CH11": {
    "chapterTitle": "Nature's Treasures",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 11,
    "essentialLaw": "\\text{Natural Resources: Renewable (Solar, Wind, Water, Forests)} \\quad \\text{vs} \\quad \\text{Non-Renewable (Coal, Petroleum, Minerals) } \\implies \\text{Conservation}",
    "coreConcepts": [
      {
        "heading": "Natural Resources: Renewable vs Non-Renewable",
        "bullets": [
          "Natural Resources: Materials and energy sources provided by nature that are essential for human survival and economic development.",
          "Renewable Resources (Inexhaustible): Resources that regenerate naturally over short periods and are not depleted by continuous use (Solar energy, Wind power, Hydroelectric energy, Biomass, Soil fertility with proper care).",
          "Non-Renewable Resources (Exhaustible): Finite resources formed over millions of years of geological processes that cannot be replenished once consumed (Fossil fuels: Coal, Petroleum, Natural Gas; Metallic mineral ores: Iron, Copper, Gold, Bauxite)."
        ]
      },
      {
        "heading": "Fossil Fuels, Conservation & Sustainable Environmental Stewardship",
        "bullets": [
          "Fossil Fuels Formation: Coal formed from ancient swamp forests buried under heat and pressure over 300 million years (Carbonization); Petroleum and natural gas formed from buried marine microorganisms.",
          "Environmental Impacts: Burning fossil fuels releases greenhouse gases ($CO_2$) causing global warming, sulfur/nitrogen oxides causing acid rain, and particulate soot causing smog.",
          "Conservation Strategies (The 5 R Principles): Refuse, Reduce, Reuse, Repurpose, Recycle; Switching to renewable clean energy (solar rooftop panels, wind farms), public transportation, conserving water and planting trees (Afforestation)."
        ]
      }
    ],
    "examTraps": [
      "Classifying coal and petroleum as renewable resources (fossil fuels take hundreds of millions of years to form and are strictly NON-RENEWABLE).",
      "Confusing reuse (using the same container repeatedly without processing) with recycling (melting/reprocessing waste into new material)."
    ],
    "quickMentalCheck": "Why are solar energy and wind energy classified as renewable resources? They are inexhaustible natural flows powered continuously by the Sun and will not run out over human timescales.",
    "cueQuestions": [
      "What are the geological conditions and timeframes required for the formation of coal and petroleum fossil fuels?",
      "Why is shifting from fossil fuels to renewable solar and wind energy crucial to mitigating global climate change?",
      "How does the 5 R environmental framework (Reduce, Reuse, Recycle, Refuse, Repurpose) minimize resource depletion?"
    ],
    "workedExample": {
      "problem": "Categorize the following resources into Renewable and Non-Renewable: (a) Solar radiation, (b) Coal deposits, (c) Wind currents, (d) Crude petroleum, (e) Hydroelectric river flow, (f) Natural gas reserves.",
      "steps": [
        "1. Renewable Resources (Continuously replenished by natural physical cycles, inexhaustible): (a) Solar radiation, (c) Wind currents, (e) Hydroelectric river flow.",
        "2. Non-Renewable Resources (Finite geological reserves formed over millions of years, exhaustible): (b) Coal deposits, (d) Crude petroleum, (f) Natural gas reserves."
      ],
      "result": "\\text{Renewable: Solar, Wind, Hydroelectric}; \\quad \\text{Non-Renewable: Coal, Petroleum, Natural Gas}"
    },
    "verificationProblem": "Check regeneration timescale: Solar/wind cycle daily; fossil fuels take $>10^8$ years. Binary categorization verified.",
    "realWorldUse": "Solar photovoltaic mini-grids in rural electrification, municipal circular economy recycling facilities, carbon footprint reduction policies.",
    "diagramType": "renewable-vs-nonrenewable-resources-venn"
  },
  "CBSE-CH-G6-SCI-CH12": {
    "chapterTitle": "Beyond Earth",
    "subject": "Science",
    "grade": 6,
    "chapterNum": 12,
    "essentialLaw": "\\text{Solar System: Sun (G-type Star)} + 8 \\text{ Planets (Terrestrial: Merc-Mars; Jovian: Jup-Nept)} + \\text{Moons} + \\text{Asteroid Belt} + \\text{Comets}",
    "coreConcepts": [
      {
        "heading": "The Solar System, The Sun & Eight Planetary Orbits",
        "bullets": [
          "Solar System Architecture: Gravitationally bound system centered on the Sun (massive star providing light and heat, $99.86\\%$ of total solar system mass).",
          "Eight Planets in Order of Distance from Sun: Mercury (smallest, fastest, extreme temp), Venus (\"Morning/Evening Star\", hottest planet due to dense $CO_2$ greenhouse atmosphere), Earth (unique water planet supporting life), Mars (\"Red Planet\" due to iron oxide soil); [Asteroid Belt]; Jupiter (largest gas giant with Great Red Spot storm), Saturn (spectacular rings of ice and rock), Uranus (tilted on side, blue-green methane), Neptune (coldest outermost wind giant).",
          "Planetary Categories: Terrestrial Inner Planets (Mercury, Venus, Earth, Mars: rocky, dense) vs Jovian Gas Giants (Jupiter, Saturn, Uranus, Neptune: massive, gaseous, low density with ring systems)."
        ]
      },
      {
        "heading": "Moon Phases, Constellations, Artificial Satellites & Space Exploration",
        "bullets": [
          "Phases of the Moon: Caused by changing angles of illuminated lunar surface visible from Earth as Moon orbits Earth ($27.3\\text{ days}$); New Moon $\\to$ Crescent $\\to$ First Quarter $\\to$ Gibbous $\\to$ Full Moon $\\to$ Waning phases.",
          "Constellations: Recognizable patterns of bright stars forming mythological shapes (e.g., Ursa Major / Great Bear / Saptarishi used to locate the North Pole Star Polaris, Orion the Hunter, Cassiopeia, Leo).",
          "Celestial Objects: Asteroids (rocky debris orbiting between Mars and Jupiter), Comets (dirty snowballs with glowing dust/gas tails pointing away from Sun), Meteors (\"Shooting stars\" burning in mesosphere) and Meteorites (survive to hit Earth).",
          "Space Exploration: ISRO missions: Chandrayaan (lunar exploration, discovered water on Moon), Mangalyaan (Mars Orbiter Mission), Aditya-L1 (solar observation); Artificial satellites used for weather forecasting, television transmission, GPS navigation, and disaster management."
        ]
      }
    ],
    "examTraps": [
      "Assuming Venus is cooler than Mercury because it is further from the Sun (Venus is the HOTTEST planet in the solar system due to a runaway greenhouse effect from its $96\\% \\text{ CO}_2$ atmosphere).",
      "Confusing a Meteor (\"Shooting Star\" burning up in the upper atmosphere) with a Meteorite (rocky core that survives atmospheric entry and strikes the Earth surface)."
    ],
    "quickMentalCheck": "Why does the tail of a comet always point directly away from the Sun? Solar radiation pressure and the high-speed solar wind push the evaporating gas and dust particles outward away from the Sun.",
    "cueQuestions": [
      "Why is Venus the hottest planet in the solar system even though Mercury is closer to the Sun?",
      "How does the Saptarishi (Ursa Major) constellation allow travelers to locate the true geographic North Pole Star (Polaris)?",
      "What are the primary operational functions of artificial satellites launched by ISRO in low-Earth and geostationary orbits?"
    ],
    "workedExample": {
      "problem": "List the eight planets of our solar system in increasing order of their distance from the Sun and categorize them into Terrestrial Planets and Gas Giants.",
      "steps": [
        "1. Ordered sequence from Sun: Mercury $\\to$ Venus $\\to$ Earth $\\to$ Mars $\\to$ Jupiter $\\to$ Saturn $\\to$ Uranus $\\to$ Neptune.",
        "2. Terrestrial (Inner) Planets: Mercury, Venus, Earth, Mars. Characteristics: Rocky solid surfaces, high density, small size, few or no moons, located inside the asteroid belt.",
        "3. Jovian (Outer Gas Giant) Planets: Jupiter, Saturn, Uranus, Neptune. Characteristics: Huge gaseous atmospheres (Hydrogen, Helium, Methane), low density, ring systems, numerous moons, located beyond the asteroid belt."
      ],
      "result": "\\text{Terrestrial: Mercury, Venus, Earth, Mars}; \\quad \\text{Gas Giants: Jupiter, Saturn, Uranus, Neptune}"
    },
    "verificationProblem": "Check asteroid belt boundary: The main asteroid belt orbits strictly between the orbits of Mars ($1.52\\text{ AU}$) and Jupiter ($5.20\\text{ AU}$). Orbital hierarchy verified.",
    "realWorldUse": "Satellite GPS navigation mapping in Google Maps, INSAT meteorological cyclone tracking and disaster warning, deep space telescope astronomical imaging (Hubble/James Webb).",
    "diagramType": "solar-system-planetary-orbits-scale"
  },
  "CBSE-CH-G6-ENG-CH01": {
    "chapterTitle": "Fables and Folk Tales",
    "subject": "English Language & Literature",
    "grade": 6,
    "chapterNum": 1,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Fables and Folk Tales: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 6.",
          "Author's biographical context, socio-cultural backdrop, and narrative perspective (first/third person).",
          "In-depth character analysis exploring core motivations, internal conflicts, and psychological growth."
        ]
      },
      {
        "heading": "Literary Devices & Thematic Motifs",
        "bullets": [
          "Use of symbolism, imagery, metaphor, irony, and poetic/prose structure.",
          "Central thematic motifs: empathy, resilience, moral courage, social justice, and self-discovery.",
          "NCERT textual excerpts, statutory questions, and long-form value-based analytical responses."
        ]
      }
    ],
    "examTraps": [
      "Providing a superficial summary without addressing the underlying thematic or philosophical question.",
      "Misinterpreting the author's tone (e.g., mistaking satirical irony for literal endorsement)."
    ],
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Fables and Folk Tales?",
    "cueQuestions": [
      "What is the central conflict in Fables and Folk Tales, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Fables and Folk Tales\" with direct reference to key narrative turning points.",
      "steps": [
        "State the overarching thematic message and author's purpose in the introduction.",
        "Examine two critical plot moments that illustrate the protagonist development or moral realization.",
        "Conclude with the broader universal significance of the story."
      ],
      "result": "Structured thematic essay adhering to CBSE marking schemes and analytical criteria."
    },
    "verificationProblem": "Ensure all key character motivations cited match verbatim textual evidence from the NCERT textbook.",
    "realWorldUse": "Fosters critical thinking, empathetic communication, narrative literacy, and ethical reasoning in leadership.",
    "diagramType": "narrative-arc-diagram"
  },
  "CBSE-CH-G6-ENG-CH02": {
    "chapterTitle": "Friendship",
    "subject": "English Language & Literature",
    "grade": 6,
    "chapterNum": 2,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Friendship: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 6.",
          "Author's biographical context, socio-cultural backdrop, and narrative perspective (first/third person).",
          "In-depth character analysis exploring core motivations, internal conflicts, and psychological growth."
        ]
      },
      {
        "heading": "Literary Devices & Thematic Motifs",
        "bullets": [
          "Use of symbolism, imagery, metaphor, irony, and poetic/prose structure.",
          "Central thematic motifs: empathy, resilience, moral courage, social justice, and self-discovery.",
          "NCERT textual excerpts, statutory questions, and long-form value-based analytical responses."
        ]
      }
    ],
    "examTraps": [
      "Providing a superficial summary without addressing the underlying thematic or philosophical question.",
      "Misinterpreting the author's tone (e.g., mistaking satirical irony for literal endorsement)."
    ],
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Friendship?",
    "cueQuestions": [
      "What is the central conflict in Friendship, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Friendship\" with direct reference to key narrative turning points.",
      "steps": [
        "State the overarching thematic message and author's purpose in the introduction.",
        "Examine two critical plot moments that illustrate the protagonist development or moral realization.",
        "Conclude with the broader universal significance of the story."
      ],
      "result": "Structured thematic essay adhering to CBSE marking schemes and analytical criteria."
    },
    "verificationProblem": "Ensure all key character motivations cited match verbatim textual evidence from the NCERT textbook.",
    "realWorldUse": "Fosters critical thinking, empathetic communication, narrative literacy, and ethical reasoning in leadership.",
    "diagramType": "narrative-arc-diagram"
  },
  "CBSE-CH-G6-ENG-CH03": {
    "chapterTitle": "Nurturing Nature",
    "subject": "English Language & Literature",
    "grade": 6,
    "chapterNum": 3,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Nurturing Nature: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 6.",
          "Author's biographical context, socio-cultural backdrop, and narrative perspective (first/third person).",
          "In-depth character analysis exploring core motivations, internal conflicts, and psychological growth."
        ]
      },
      {
        "heading": "Literary Devices & Thematic Motifs",
        "bullets": [
          "Use of symbolism, imagery, metaphor, irony, and poetic/prose structure.",
          "Central thematic motifs: empathy, resilience, moral courage, social justice, and self-discovery.",
          "NCERT textual excerpts, statutory questions, and long-form value-based analytical responses."
        ]
      }
    ],
    "examTraps": [
      "Providing a superficial summary without addressing the underlying thematic or philosophical question.",
      "Misinterpreting the author's tone (e.g., mistaking satirical irony for literal endorsement)."
    ],
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Nurturing Nature?",
    "cueQuestions": [
      "What is the central conflict in Nurturing Nature, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Nurturing Nature\" with direct reference to key narrative turning points.",
      "steps": [
        "State the overarching thematic message and author's purpose in the introduction.",
        "Examine two critical plot moments that illustrate the protagonist development or moral realization.",
        "Conclude with the broader universal significance of the story."
      ],
      "result": "Structured thematic essay adhering to CBSE marking schemes and analytical criteria."
    },
    "verificationProblem": "Ensure all key character motivations cited match verbatim textual evidence from the NCERT textbook.",
    "realWorldUse": "Fosters critical thinking, empathetic communication, narrative literacy, and ethical reasoning in leadership.",
    "diagramType": "narrative-arc-diagram"
  },
  "CBSE-CH-G6-ENG-CH04": {
    "chapterTitle": "Sports and Games",
    "subject": "English Language & Literature",
    "grade": 6,
    "chapterNum": 4,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Sports and Games: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 6.",
          "Author's biographical context, socio-cultural backdrop, and narrative perspective (first/third person).",
          "In-depth character analysis exploring core motivations, internal conflicts, and psychological growth."
        ]
      },
      {
        "heading": "Literary Devices & Thematic Motifs",
        "bullets": [
          "Use of symbolism, imagery, metaphor, irony, and poetic/prose structure.",
          "Central thematic motifs: empathy, resilience, moral courage, social justice, and self-discovery.",
          "NCERT textual excerpts, statutory questions, and long-form value-based analytical responses."
        ]
      }
    ],
    "examTraps": [
      "Providing a superficial summary without addressing the underlying thematic or philosophical question.",
      "Misinterpreting the author's tone (e.g., mistaking satirical irony for literal endorsement)."
    ],
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Sports and Games?",
    "cueQuestions": [
      "What is the central conflict in Sports and Games, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Sports and Games\" with direct reference to key narrative turning points.",
      "steps": [
        "State the overarching thematic message and author's purpose in the introduction.",
        "Examine two critical plot moments that illustrate the protagonist development or moral realization.",
        "Conclude with the broader universal significance of the story."
      ],
      "result": "Structured thematic essay adhering to CBSE marking schemes and analytical criteria."
    },
    "verificationProblem": "Ensure all key character motivations cited match verbatim textual evidence from the NCERT textbook.",
    "realWorldUse": "Fosters critical thinking, empathetic communication, narrative literacy, and ethical reasoning in leadership.",
    "diagramType": "narrative-arc-diagram"
  },
  "CBSE-CH-G6-ENG-CH05": {
    "chapterTitle": "Culture and Tradition",
    "subject": "English Language & Literature",
    "grade": 6,
    "chapterNum": 5,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Culture and Tradition: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 6.",
          "Author's biographical context, socio-cultural backdrop, and narrative perspective (first/third person).",
          "In-depth character analysis exploring core motivations, internal conflicts, and psychological growth."
        ]
      },
      {
        "heading": "Literary Devices & Thematic Motifs",
        "bullets": [
          "Use of symbolism, imagery, metaphor, irony, and poetic/prose structure.",
          "Central thematic motifs: empathy, resilience, moral courage, social justice, and self-discovery.",
          "NCERT textual excerpts, statutory questions, and long-form value-based analytical responses."
        ]
      }
    ],
    "examTraps": [
      "Providing a superficial summary without addressing the underlying thematic or philosophical question.",
      "Misinterpreting the author's tone (e.g., mistaking satirical irony for literal endorsement)."
    ],
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Culture and Tradition?",
    "cueQuestions": [
      "What is the central conflict in Culture and Tradition, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Culture and Tradition\" with direct reference to key narrative turning points.",
      "steps": [
        "State the overarching thematic message and author's purpose in the introduction.",
        "Examine two critical plot moments that illustrate the protagonist development or moral realization.",
        "Conclude with the broader universal significance of the story."
      ],
      "result": "Structured thematic essay adhering to CBSE marking schemes and analytical criteria."
    },
    "verificationProblem": "Ensure all key character motivations cited match verbatim textual evidence from the NCERT textbook.",
    "realWorldUse": "Fosters critical thinking, empathetic communication, narrative literacy, and ethical reasoning in leadership.",
    "diagramType": "narrative-arc-diagram"
  },
  "CBSE-CH-G6-SOCSCI-CH01": {
    "chapterTitle": "Locating Places on the Earth",
    "subject": "Social Science",
    "grade": 6,
    "chapterNum": 1,
    "essentialLaw": "\\text{Graticule Coordinate System: } (\\text{Latitude } \\phi, \\text{Longitude } \\lambda) \\quad | \\quad 15^\\circ \\text{ Longitude} = 1 \\text{ Hour} = 60 \\text{ Minutes} \\quad | \\quad \\text{IST} = \\text{GMT} + 5\\text{h } 30\\text{m}",
    "coreConcepts": [
      {
        "heading": "Parallels of Latitude & Heat Zones",
        "bullets": [
          "Equator ($0^\\circ$) divides Earth into Northern and Southern Hemispheres; latitudes run from $0^\\circ$ to $90^\\circ N/S$.",
          "Key parallels: Tropic of Cancer ($23\\frac{1}{2}^\\circ N$), Tropic of Capricorn ($23\\frac{1}{2}^\\circ S$), Arctic Circle ($66\\frac{1}{2}^\\circ N$), Antarctic Circle ($66\\frac{1}{2}^\\circ S$).",
          "Earth heat zones: Torrid Zone (receives maximum direct insolation), Temperate Zones (moderate climate), Frigid Zones (slanted rays, extremely cold)."
        ]
      },
      {
        "heading": "Meridians of Longitude & Standard Time",
        "bullets": [
          "Prime Meridian ($0^\\circ$) passes through Greenwich, London, dividing Earth into Eastern and Western Hemispheres up to $180^\\circ$.",
          "As Earth rotates $360^\\circ$ from West to East in 24 hours, $1^\\circ$ longitude corresponds to a time difference of 4 minutes.",
          "Indian Standard Time (IST) is based on the standard meridian of $82^\\circ 30' E$ passing through Mirzapur (Uttar Pradesh)."
        ]
      }
    ],
    "examTraps": [
      "Confusing latitudes (which are parallel circles of unequal lengths) with longitudes (which are equal semicircles converging at poles).",
      "Subtracting instead of adding time when moving eastward from Greenwich Prime Meridian."
    ],
    "quickMentalCheck": "If it is 12:00 PM at Greenwich ($0^\\circ$), what is the local time at Mirzapur ($82^\\circ 30' E$)? (Answer: 5:30 PM, $82.5 \\times 4 = 330 \\text{ mins} = 5\\text{h } 30\\text{m}$ ahead).",
    "cueQuestions": [
      "Why are lines of latitude called parallels while lines of longitude are called meridians?",
      "How does solar angle determine the division of Earth into Torrid, Temperate, and Frigid zones?",
      "Why did India adopt a single Standard Meridian ($82^\\circ 30' E$) despite spanning nearly 30 degrees of longitude?"
    ],
    "workedExample": {
      "problem": "Calculate the local time at a station situated at $45^\\circ W$ longitude when the time at Greenwich Prime Meridian ($0^\\circ$) is 2:00 PM.",
      "steps": [
        "Find the longitudinal difference between Greenwich ($0^\\circ$) and $45^\\circ W$: $\\Delta \\lambda = 45^\\circ$.",
        "Convert longitude difference into time: $45 \\times 4 \\text{ minutes} = 180 \\text{ minutes} = 3 \\text{ hours}$.",
        "Since the station lies to the West of Greenwich, local time is behind Greenwich time: $\\text{Time} = 2:00 \\text{ PM} - 3 \\text{ hours} = 11:00 \\text{ AM}$."
      ],
      "result": "11:00 \\text{ AM (same day)}"
    },
    "verificationProblem": "Check: $11:00 \\text{ AM} + 3 \\text{ hours} = 2:00 \\text{ PM}$, confirming exact correspondence with Greenwich mean time.",
    "realWorldUse": "Essential for global aviation navigation, GPS satellite positioning, maritime navigation, and international scheduling.",
    "diagramType": "globe-graticule-grid"
  },
  "CBSE-CH-G6-SOCSCI-CH02": {
    "chapterTitle": "Oceans and Continents",
    "subject": "Social Science",
    "grade": 6,
    "chapterNum": 2,
    "essentialLaw": "\\text{Global Lithosphere-Hydrosphere Distribution: } \\text{Water} \\approx 71\\%, \\; \\text{Land} \\approx 29\\% \\quad | \\quad \\text{7 Continents} + \\text{5 Major Oceans}",
    "coreConcepts": [
      {
        "heading": "Seven Continents of the Lithosphere",
        "bullets": [
          "Asia is the largest continent, covering one-third of total land area, separated from Europe by the Ural Mountains (Eurasia).",
          "Africa is the second largest continent, crossed by Equator, Tropic of Cancer, and Tropic of Capricorn; houses Sahara desert and Nile river.",
          "North America, South America (connected by Isthmus of Panama), Antarctica (permanent ice sheet), Europe, and Australia (island continent)."
        ]
      },
      {
        "heading": "Five Oceans of the Hydrosphere",
        "bullets": [
          "Pacific Ocean is the largest and deepest ocean, circular in shape, containing Mariana Trench ($11,022 \\text{ m}$ depth).",
          "Atlantic Ocean is S-shaped, flanked by North/South America and Europe/Africa; highly indented coastline ideal for natural harbours.",
          "Indian Ocean (named after a country, almost triangular), Southern Ocean (encircles Antarctica), and Arctic Ocean (around North Pole)."
        ]
      }
    ],
    "examTraps": [
      "Confusing an Isthmus (narrow strip of land joining two landmasses) with a Strait (narrow passage of water connecting two large water bodies).",
      "Overlooking that the Southern Ocean is bounded by $60^\\circ S$ latitude encircling Antarctica."
    ],
    "quickMentalCheck": "Which strait connects the Bay of Bengal and the Gulf of Mannar between India and Sri Lanka? (Answer: Palk Strait).",
    "cueQuestions": [
      "What are the primary differences between the shapes and coastline characteristics of the Pacific and Atlantic Oceans?",
      "Why is the Northern Hemisphere called the Land Hemisphere and the Southern Hemisphere called the Water Hemisphere?",
      "What makes Antarctica unique among all continents in terms of human settlement and biosphere?"
    ],
    "workedExample": {
      "problem": "Distinguish between the Isthmus of Panama and the Palk Strait with geographical definitions and connected land/water bodies.",
      "steps": [
        "Define Isthmus: A narrow strip of land connecting two larger land masses. Isthmus of Panama connects North America with South America.",
        "Define Strait: A narrow stretch of water that separates two land masses and links two large water bodies.",
        "Apply to Palk Strait: Connects the Bay of Bengal with the Gulf of Mannar (Indian Ocean) and separates India from Sri Lanka."
      ],
      "result": "\\text{Isthmus = Land connector (Panama); Strait = Water passage (Palk)}"
    },
    "verificationProblem": "Verify that Palk Strait permits maritime navigation while Panama originally required the construction of an artificial canal across the isthmus.",
    "realWorldUse": "Underpins international trade shipping routes, submarine communication cable layout, and global climate ocean-current modeling.",
    "diagramType": "world-continents-oceans-map"
  },
  "CBSE-CH-G6-SOCSCI-CH03": {
    "chapterTitle": "Landforms and Life",
    "subject": "Social Science",
    "grade": 6,
    "chapterNum": 3,
    "essentialLaw": "\\text{Major Relief Features: } \\text{Mountains } (\\text{Fold, Block, Volcanic}) \\rightarrow \\text{Plateaus } (\\text{Mineral-rich tablelands}) \\rightarrow \\text{Plains } (\\text{Alluvial basins})",
    "coreConcepts": [
      {
        "heading": "Mountains: Types and Significance",
        "bullets": [
          "Fold Mountains formed by tectonic compression: Young fold mountains (Himalayas, Alps with rugged relief and conical peaks); Old fold mountains (Aravallis, Urals with rounded features).",
          "Block Mountains formed by crustal faulting (Horsts are uplifted blocks, Grabens are rift valleys, e.g., Rhine Valley and Vosges).",
          "Volcanic Mountains built by magma accumulation (Mt. Kilimanjaro in Africa, Mt. Fujiyama in Japan); storehouses of freshwater glaciers."
        ]
      },
      {
        "heading": "Plateaus, Plains, and Human Settlement",
        "bullets": [
          "Plateaus are elevated flat-topped tablelands rich in mineral reserves (Deccan Plateau in India, Chota Nagpur plateau rich in iron/coal, Tibetan plateau highest in world).",
          "Plains are vast stretches of flat land ($< 200 \\text{ m}$ elevation) formed by river alluvium deposits (Indo-Gangetic Plain, Yangtze plain).",
          "Plains support the highest population density due to fertile soil, abundant water, and ease of transport network construction."
        ]
      }
    ],
    "examTraps": [
      "Classifying the Aravalli range as a young fold mountain instead of an ancient, denuded old fold mountain range.",
      "Assuming all high-altitude regions are mountains, forgetting that high flat-topped tablelands are plateaus."
    ],
    "quickMentalCheck": "Which plateau is known as the \"Roof of the World\" with an elevation of 4,000 to 6,000 meters? (Answer: Tibetan Plateau).",
    "cueQuestions": [
      "How do internal and external endogenic/exogenic geomorphic processes shape the relief of the Earth?",
      "Why are river plains historically and demographically the most densely populated regions on Earth?",
      "What structural mechanisms distinguish block mountains (horsts/grabens) from fold mountains?"
    ],
    "workedExample": {
      "problem": "Classify the following physical features into Fold Mountain, Block Mountain, Volcanic Mountain, or Plateau: Himalayas, Deccan, Vosges, Mt. Fujiyama.",
      "steps": [
        "Himalayas: Formed by the collision of Indian and Eurasian tectonic plates $\\rightarrow$ Young Fold Mountain.",
        "Deccan: Elevated tableland formed by volcanic basalt lava flows $\\rightarrow$ Plateau.",
        "Vosges: Uplifted crustal block alongside the Rhine Graben rift valley $\\rightarrow$ Block Mountain (Horst).",
        "Mt. Fujiyama: Formed by the cooling and solidification of erupted volcanic lava/ash $\\rightarrow$ Volcanic Mountain."
      ],
      "result": "\\text{Fold: Himalayas; Plateau: Deccan; Block: Vosges; Volcanic: Fujiyama}"
    },
    "verificationProblem": "Verify that mineral mining is predominantly concentrated in plateau regions while intensive agriculture dominates alluvial plains.",
    "realWorldUse": "Crucial for regional urban planning, agricultural zonation, hydropower site selection, and disaster vulnerability mapping.",
    "diagramType": "geomorphic-landforms-cross-section"
  },
  "CBSE-CH-G6-SOCSCI-CH04": {
    "chapterTitle": "Timeline and Sources of History",
    "subject": "Social Science",
    "grade": 6,
    "chapterNum": 4,
    "essentialLaw": "\\text{Historical Chronology: } \\text{BCE} \\xrightarrow{\\text{Decreasing to } 0} \\text{CE} \\xrightarrow{\\text{Increasing}} \\quad | \\quad \\text{Evidence} = \\text{Manuscripts} + \\text{Inscriptions (Epigraphy)} + \\text{Archaeology}",
    "coreConcepts": [
      {
        "heading": "Chronology and Dating Conventions",
        "bullets": [
          "BCE (Before Common Era) / BC counts backwards to zero; CE (Common Era) / AD (Anno Domini) counts forward from the traditional birth of Christ.",
          "Circa ($c.$) indicates approximate dating when precise calendar records are unavailable in historical manuscripts.",
          "Stratigraphy in archaeological excavation: deeper soil layers represent older chronological periods than upper layers."
        ]
      },
      {
        "heading": "Primary Sources: Literary and Epigraphic",
        "bullets": [
          "Manuscripts: Handwritten records on palm leaves or specially prepared birch bark (*bhurja-patra*), preserved in temples and monasteries.",
          "Inscriptions: Writings engraved on relatively hard surfaces like stone, metal plates, or rock pillars (studied under Epigraphy).",
          "Archaeological artifacts: Pots, terracotta toys, coins (Numismatics), seals, tools, and structural ruins that reconstruct material culture."
        ]
      }
    ],
    "examTraps": [
      "Calculating elapsed time between BCE and CE dates by subtraction instead of addition (e.g., from 250 BCE to 250 CE is 500 years, not 0).",
      "Confusing birch bark manuscripts (perishable organic material) with rock edicts and inscriptions (durable epigraphic media)."
    ],
    "quickMentalCheck": "How many calendar years elapsed between 300 BCE and 200 CE? (Answer: $300 + 200 = 500$ years).",
    "cueQuestions": [
      "Why are inscriptions considered more reliable primary sources than copied literary manuscripts?",
      "How do archaeologists use stratigraphy and radiocarbon dating to establish historical timelines?",
      "What is the significance of the Rosetta Stone in the decipherment of ancient historical scripts?"
    ],
    "workedExample": {
      "problem": "An inscription is dated to 261 BCE (Ashoka's Kalinga War). How many years ago was this edict issued relative to the year 2024 CE?",
      "steps": [
        "Identify the time from 261 BCE to the beginning of the Common Era (year 0): $261 \\text{ years}$.",
        "Identify the time elapsed in the Common Era up to 2024 CE: $2024 \\text{ years}$.",
        "Calculate total elapsed span: $\\Delta t = 261 + 2024 = 2285 \\text{ years ago}$."
      ],
      "result": "2285 \\text{ years ago}"
    },
    "verificationProblem": "Verify that timeline arithmetic across BCE/CE boundary requires summing the positive scalar components ($|t_1| + t_2$).",
    "realWorldUse": "Used in museum curation, heritage conservation, carbon dating analytics, and forensic archaeological documentation.",
    "diagramType": "historical-timeline-scale"
  },
  "CBSE-CH-G6-SOCSCI-CH05": {
    "chapterTitle": "India, That Is Bharat",
    "subject": "Social Science",
    "grade": 6,
    "chapterNum": 5,
    "essentialLaw": "\\text{Civilizational Nomenclature: } \\text{Sapta Sindhu (Vedic)} \\rightarrow \\text{Hapta Hindu (Avestan)} \\rightarrow \\text{Indos (Greek)} \\rightarrow \\text{India} \\quad | \\quad \\text{Bharatavarsha (Vishnu Purana)}",
    "coreConcepts": [
      {
        "heading": "Origins of the Names Bharat and India",
        "bullets": [
          "The name *Bharata* is mentioned in the Rigveda for a clan inhabiting the northwestern region, later designating the entire subcontinent in the epics and Puranas.",
          "Vishnu Purana defines *Bharatavarsha*: The country that lies north of the ocean and south of the snowy mountains.",
          "The name *India* derives from the Sanskrit river *Sindhu* (Indus), pronounced *Hindu* in Old Persian and *Indos* in Greek."
        ]
      },
      {
        "heading": "Geographical Unity and Cultural Synthesis",
        "bullets": [
          "Natural boundaries: Himalayas in the North, Indian Ocean to the South, Arabian Sea to the West, and Bay of Bengal to the East fostered a unified civilizational zone.",
          "Mountain passes (Khyber, Bolan) facilitated continuous exchange of scholars, traders, pilgrims, and ideas across ancient Asia.",
          "Unity in diversity: Integration of diverse languages, regional customs, traditions, and philosophy under a shared cultural umbrella."
        ]
      }
    ],
    "examTraps": [
      "Assuming the term \"Bharat\" originated in modern constitutional drafting, whereas it has Vedic and Puranic roots dating back millennia.",
      "Misattributing the linguistic root of \"India\" to English rather than ancient Sanskrit (*Sindhu*) via Old Persian and Greek."
    ],
    "quickMentalCheck": "Which ancient text first mentions the name \"Bharata\" in reference to a community/clan in northwestern India? (Answer: Rigveda).",
    "cueQuestions": [
      "How did the river Sindhu (Indus) give rise to both names \"Hindu/Hindustan\" and \"India\"?",
      "What physical and cultural features contributed to the concept of civilizational unity in ancient India?",
      "How does Article 1 of the modern Indian Constitution encapsulate this dual civilizational heritage (\"India, that is Bharat\")?"
    ],
    "workedExample": {
      "problem": "Trace the linguistic etymological evolution of the word \"India\" from its ancient Sanskrit origin to European languages.",
      "steps": [
        "Sanskrit root: *Sindhu* referring to the mighty Indus river system.",
        "Old Persian (Achaemenid Empire): Initial 'S' transformed into 'H', rendering *Hindush* or *Hapta Hindu*.",
        "Ancient Greek (Ionian): Dropped the aspirate 'H', giving *Indos* and the land *Indike*.",
        "Latin and Modern European languages: Evolved into *India*."
      ],
      "result": "\\text{Sindhu (Skt)} \\rightarrow \\text{Hindush (OPers)} \\rightarrow \\text{Indos (Gk)} \\rightarrow \\text{India (Lat/Eng)}"
    },
    "verificationProblem": "Verify that the linguistic sound shift $s \\rightarrow h$ is a well-documented Indo-Iranian phonetic transition.",
    "realWorldUse": "Informs constitutional law, diplomatic nomenclature, cultural heritage preservation, and comparative historical linguistics.",
    "diagramType": "etymology-evolution-tree"
  },
  "CBSE-CH-G6-SOCSCI-CH06": {
    "chapterTitle": "The Beginnings of Indian Civilisation",
    "subject": "Social Science",
    "grade": 6,
    "chapterNum": 6,
    "essentialLaw": "\\text{Harappan Urban Planning: } \\text{Citadel (Western elevated)} + \\text{Lower Town (Residential)} \\quad | \\quad \\text{Standard Brick Ratio: } 4:2:1 \\quad | \\quad \\text{Covered Drainage Grid}",
    "coreConcepts": [
      {
        "heading": "Harappan Town Planning & Infrastructure",
        "bullets": [
          "Dual settlement layout: Citadel on the west (public structures, Great Bath, granaries) and Lower Town on the east (residential brick houses arranged in a grid pattern).",
          "Engineering excellence: Baked bricks in standardized 4:2:1 ratio, covered drains with inspection traps, soak pits, and street-aligned house drainage.",
          "The Great Bath at Mohenjo-daro: Watertight tank lined with gypsum mortar, steps leading down from north and south, flanked by changing rooms."
        ]
      },
      {
        "heading": "Crafts, Trade, and Harappan Economy",
        "bullets": [
          "Material culture: Steatite seals with unicorn/animal motifs and undeciphered script, bronze dancing girl, terracotta toys, and beads of carnelian and lapis lazuli.",
          "Dockyard at Lothal: Tidal brick basin connecting to the Sabarmati river network for maritime trade with Mesopotamia (Dilmun/Makan/Meluhha).",
          "Standardized weights: Chert cubical weights following a binary system ($1, 2, 4, 8, 16, 32, 64$) for lower values and decimal system for higher denominations."
        ]
      }
    ],
    "examTraps": [
      "Assuming Harappan cities were unfortified or built with sun-dried unbaked mud bricks only; baked kiln bricks with bitumen waterproofing were extensively used.",
      "Assuming iron was used in the Indus Valley Civilization (IVC was a Bronze Age civilization; iron was discovered in the later Vedic period)."
    ],
    "quickMentalCheck": "Which Harappan port city featured a massive artificial brick dockyard for maritime commerce? (Answer: Lothal in Gujarat).",
    "cueQuestions": [
      "What archaeological evidence demonstrates the high degree of municipal civic planning in Harappan cities?",
      "How does the binary and decimal weight system reflect standard commercial regulation in Harappa?",
      "What were the potential environmental and ecological factors behind the decline of the Indus Valley Civilization?"
    ],
    "workedExample": {
      "problem": "Analyze how the Great Bath of Mohenjo-daro was made completely waterproof by ancient Harappan engineers.",
      "steps": [
        "Construction base: Layer of carefully fitted, tightly laid kiln-fired bricks on edge.",
        "Mortar matrix: Mortar made of fine gypsum and lime was applied between brick joints.",
        "Impermeable barrier: A thick natural layer of tar/bitumen (asphalt) was applied between the inner and outer brick linings.",
        "Drainage control: Sluice outlet pipe at one corner allowed complete emptying and cleaning of water."
      ],
      "result": "\\text{Waterproofing = Kiln Bricks} + \\text{Gypsum Mortar} + \\text{Natural Bitumen Seal}"
    },
    "verificationProblem": "Verify that the presence of Mesopotamian seals bearing the name \"Meluhha\" corroborates Harappan maritime trade.",
    "realWorldUse": "Informs modern hydraulic engineering, urban storm drainage layout, standardization in metrology, and architectural masonry.",
    "diagramType": "harappan-city-layout-grid"
  },
  "CBSE-CH-G6-SOCSCI-CH07": {
    "chapterTitle": "India's Cultural Roots",
    "subject": "Social Science",
    "grade": 6,
    "chapterNum": 7,
    "essentialLaw": "\\text{Vedic & Philosophical Corpus: } 4 \\text{ Vedas (Rig, Sama, Yajur, Atharva)} \\quad | \\quad \\text{Four Ashramas} \\quad | \\quad \\text{Four Purusharthas: } \\text{Dharma, Artha, Kama, Moksha}",
    "coreConcepts": [
      {
        "heading": "Vedic Literature and Epics",
        "bullets": [
          "Rigveda (oldest text, containing 1028 hymns / *Suktas* organized in 10 *Mandalas*), Samaveda (musical chants), Yajurveda (rituals/sacrifices), Atharvaveda (healing/everyday life).",
          "Upanishads (*Vedanta*): Philosophical dialogues between teachers and disciples exploring the nature of *Atman* (individual soul) and *Brahman* (universal consciousness).",
          "Great Epics: Mahabharata (composed by Sage Vyasa, containing the Bhagavad Gita) and Ramayana (composed by Sage Valmiki)."
        ]
      },
      {
        "heading": "Social Organization and Philosophical Principles",
        "bullets": [
          "Four Ashramas (stages of life): Brahmacharya (student life/learning), Grihastha (householder duties), Vanaprastha (meditative withdrawal), and Sannyasa (renunciation).",
          "Four Purusharthas (aims of human existence): *Dharma* (righteous conduct), *Artha* (material prosperity), *Kama* (legitimate desires), and *Moksha* (spiritual liberation).",
          "Universal ethics: Concepts of *Ahimsa* (non-injury), *Satya* (truthfulness), and *Vasudhaiva Kutumbakam* (the world is one family from Maha Upanishad)."
        ]
      }
    ],
    "examTraps": [
      "Confusing the Samaveda with rituals; Samaveda is the foundational root of Indian classical music and melodic chanting.",
      "Believing Upanishads describe animal sacrificial rites; Upanishads fundamentally transition from outer rituals to inner philosophical inquiry."
    ],
    "quickMentalCheck": "Which Upanishadic phrase means \"Truth Alone Triumphs\", adopted as the national motto of India? (Answer: *Satyameva Jayate* from Mundaka Upanishad).",
    "cueQuestions": [
      "How did the philosophical focus transition from early Vedic hymns to the metaphysical teachings of the Upanishads?",
      "What are the Four Purusharthas and how do they balance material welfare with spiritual pursuit?",
      "How were early Vedic texts transmitted faithfully across generations before being written down?"
    ],
    "workedExample": {
      "problem": "List the four Vedas along with their primary subject matter and liturgical roles.",
      "steps": [
        "Rigveda: Collection of 1028 hymns (*suktas*) dedicated to deities like Agni, Indra, and Soma.",
        "Samaveda: Melodic setting and musical notations for chanting Rigvedic verses during ceremonies.",
        "Yajurveda: Prose mantras and detailed procedural formulas for executing ritual sacrifices.",
        "Atharvaveda: Chants, charms, medical remedies, and socio-philosophical reflections on daily existence."
      ],
      "result": "\\text{Rig (Hymns), Sama (Music), Yajur (Rituals), Atharva (Everyday Life/Medicine)}"
    },
    "verificationProblem": "Verify that the Gayatri Mantra is originally located in the 3rd Mandala of the Rigveda addressed to Savitr.",
    "realWorldUse": "Forms the bedrock of Indian jurisprudence ethics, classical musicology, holistic wellness/Ayurveda, and moral philosophy.",
    "diagramType": "vedic-philosophical-tree"
  },
  "CBSE-CH-G6-HIN-CH01": {
    "chapterTitle": "Baras Raha Hai Jal",
    "subject": "HINDI",
    "grade": 6,
    "chapterNum": 1,
    "essentialLaw": "\\text{कविता-भाव}: \\text{वर्षा ऋतु का प्राकृतिक सौंदर्य एवं धरा पर जीवन का नवसंचार}",
    "coreConcepts": [
      {
        "heading": "बरस रहा है जल: कविता का मूल भाव",
        "bullets": [
          "कवि ने वर्षा ऋतु में प्रकृति के उल्लास, हरी-भरी धरती, बहते झरनों और मेघों की गर्जना का सजीव चित्रण किया है। वर्षा से समस्त जीव-जगत में नई ऊर्जा और प्राण का संचार होता है।"
        ]
      },
      {
        "heading": "काव्य-शिल्प एवं तुकान्त शब्द",
        "bullets": [
          "कविता में प्रयुक्त अनुप्रास अलंकार, तुकान्त शब्द (लय-ताल) तथा प्रकृति-संबन्धी विशेषणों (शीतल बयार, घनघोर घटाएं) का साहित्यिक विश्लेषण।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: प्राकृतिक प्रतीकों का केवल शाब्दिक अर्थ लिखना। (Remedy: प्रतीकों के पीछे छिपे भाव (जैसे बादलों का बरसना = परोपकार और नवजीवन) को व्याख्या में स्पष्ट करें।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Baras Raha Hai Jal.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Baras Raha Hai Jal?",
      "Explain the primary mechanisms, formulas, and structural relationships in Baras Raha Hai Jal.",
      "How are concepts in Baras Raha Hai Jal applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Baras Raha Hai Jal to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Baras Raha Hai Jal.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Baras Raha Hai Jal."
    },
    "verificationProblem": "Verify all core principles and calculations for Baras Raha Hai Jal.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G6-HIN-CH02": {
    "chapterTitle": "Har Ki Jeet",
    "subject": "HINDI",
    "grade": 6,
    "chapterNum": 2,
    "essentialLaw": "\\text{कहानी-तत्व}: \\text{हृदय-परिवर्तन (सुदर्शन) : डाकू खड्गसिंह का क्रूरता से परोपकार की ओर रूपांतरण}",
    "coreConcepts": [
      {
        "heading": "हार की जीत: कथानक एवं चरित्र-चित्रण",
        "bullets": [
          "बाबा भारती का अपने घोड़े 'सुल्तान' के प्रति निश्छल प्रेम और डाकू खड्गसिंह द्वारा धोखे से घोड़े को छीन लेना। बाबा भारती का अंतिम कथन—\"इस घटना का किसी के सामने जिक्र मत करना, नहीं तो लोग किसी गरीब/अपाहिज पर विश्वास नहीं करेंगे।\""
        ]
      },
      {
        "heading": "नैतिक संदेश एवं मानवीय संवेदना",
        "bullets": [
          "कहानी सिद्ध करती है कि उच्च नैतिक चरित्र, क्षमा और परोपकार की भावना क्रूर से क्रूर व्यक्ति का भी हृदय परिवर्तित कर सकती है। बाबा भारती हारकर भी जीत गए और खड्गसिंह जीतकर भी हार गया।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: बाबा भारती के घोड़े वापस मांगने का कारण डाकू का डर समझना। (Remedy: बाबा भारती को घोड़े का नहीं, बल्कि समाज से दीन-दुखियों और अपाहिजों पर से विश्वास उठने की चिंता थी।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Har Ki Jeet.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Har Ki Jeet?",
      "Explain the primary mechanisms, formulas, and structural relationships in Har Ki Jeet.",
      "How are concepts in Har Ki Jeet applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Har Ki Jeet to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Har Ki Jeet.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Har Ki Jeet."
    },
    "verificationProblem": "Verify all core principles and calculations for Har Ki Jeet.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G6-HIN-CH03": {
    "chapterTitle": "Bansi Ki Dhun",
    "subject": "HINDI",
    "grade": 6,
    "chapterNum": 3,
    "essentialLaw": "\\text{भक्ति काव्य}: \\text{श्रीकृष्ण की मुरली की सम्मोहक तान एवं ब्रज-गोपियों का अनन्य भक्ति-भाव}",
    "coreConcepts": [
      {
        "heading": "बंसी की धुन: वात्सल्य एवं माधुर्य भाव",
        "bullets": [
          "भगवान श्रीकृष्ण की मुरली (बंशी) की मधुर ध्वनि से समस्त ब्रजमंडल, गोप-गोपियां, यमुना तट और पशु-पक्षी मुग्ध हो जाते हैं। बंसी की धुन सांसारिक बंधनों को भुलाकर ईश्वर-भक्ति में लीन होने का प्रतीक है।"
        ]
      },
      {
        "heading": "ब्रजभाषा के शब्द-सौंदर्य एवं अलंकार",
        "bullets": [
          "पदों में ब्रजभाषा की मिठास, रूपक व उत्प्रेक्षा के प्रयोग, तथा पद-गायन की पारंपरिक लयात्मकता।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: मुरली के प्रभाव को केवल एक साधारण संगीत तक सीमित रखना। (Remedy: मुरली की धुन आत्मा का परमात्मा से मिलन और लौकिक से अलौकिक की ओर आकर्षण का प्रतीक है।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Bansi Ki Dhun.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Bansi Ki Dhun?",
      "Explain the primary mechanisms, formulas, and structural relationships in Bansi Ki Dhun.",
      "How are concepts in Bansi Ki Dhun applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Bansi Ki Dhun to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Bansi Ki Dhun.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Bansi Ki Dhun."
    },
    "verificationProblem": "Verify all core principles and calculations for Bansi Ki Dhun.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G6-HIN-CH04": {
    "chapterTitle": "Meri Maa",
    "subject": "HINDI",
    "grade": 6,
    "chapterNum": 4,
    "essentialLaw": "\\text{संस्मरण / आत्मकथा}: \\text{माँ का निस्वार्थ त्याग, राष्ट्रप्रेम के संस्कार और अगाध ममत्व}",
    "coreConcepts": [
      {
        "heading": "मेरी माँ: पाठ का मूल मर्म एवं मातृ-ऋण",
        "bullets": [
          "रामप्रसाद 'बिस्मिल' द्वारा रचित संस्मरण में माँ के त्याग, सहयोग, और आत्मबल का मार्मिक वर्णन। माँ ने लेखक को न केवल जीवन दिया, बल्कि उनमें राष्ट्रसेवा, निर्भीकता और सत्यनिष्ठा के संस्कार भी भरे।"
        ]
      },
      {
        "heading": "मातृ-महिमा एवं नैतिक प्रेरणा",
        "bullets": [
          "क्रांतिकारी जीवन के कठिनतम क्षणों में भी माँ का अटूट विश्वास लेखक को संबल देता रहा। लेखक स्वीकार करते हैं कि वे जन्म-जन्मांतर तक भी माँ के ऋण से उऋण नहीं हो सकते।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: माँ के योगदान को केवल पारिवारिक लालन-पालन तक सीमित बताना। (Remedy: लेखक की माँ ने उन्हें स्वतंत्रता संग्राम और देश के लिए प्राण न्योछावर करने का नैतिक साहस दिया।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Meri Maa.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Meri Maa?",
      "Explain the primary mechanisms, formulas, and structural relationships in Meri Maa.",
      "How are concepts in Meri Maa applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Meri Maa to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Meri Maa.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Meri Maa."
    },
    "verificationProblem": "Verify all core principles and calculations for Meri Maa.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G6-SANSKRIT-CH01": {
    "chapterTitle": "Prathama Patha: Mangalacharanam",
    "subject": "SANSKRIT",
    "grade": 6,
    "chapterNum": 1,
    "essentialLaw": "\\text{मङ्गलाचरणम् (प्रार्थना)}: \\text{त्वमेव माता च पिता त्वमेव, त्वमेव बन्धुश्च सखा त्वमेव ।}",
    "coreConcepts": [
      {
        "heading": "मङ्गलाचरणम् एवं ईश्वर-प्रार्थना",
        "bullets": [
          "संस्कृत साहित्य में किसी भी शुभ कार्य या विद्यारम्भ से पूर्व ईश-वन्दना की परंपरा है। यह पाठ विद्या, सद्बुद्धि, विश्व-कल्याण और माता-पिता के प्रति कृतज्ञता व्यक्त करने वाले मंगल श्लोकों पर आधारित है।"
        ]
      },
      {
        "heading": "संस्कृत वर्णमाला एवं उच्चारण-स्थान",
        "bullets": [
          "स्वर (ह्रस्व, दीर्घ, प्लुत), व्यञ्जन (स्पर्श, अन्तःस्थ, ऊष्म) तथा अनुस्वार-विसर्ग का शुद्ध उच्चारण एवं पदच्छेद के नियम।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: विसर्ग (:) और अनुस्वार (ं) के उच्चारण एवं लेखन में त्रुटि। (Remedy: विसर्ग का उच्चारण 'ह्' के सदृश होता है (यथा- रामः = रामह्); अनुस्वार नासिका से उच्चारित होता है।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Prathama Patha: Mangalacharanam.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Prathama Patha: Mangalacharanam?",
      "Explain the primary mechanisms, formulas, and structural relationships in Prathama Patha: Mangalacharanam.",
      "How are concepts in Prathama Patha: Mangalacharanam applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Prathama Patha: Mangalacharanam to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Prathama Patha: Mangalacharanam.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Prathama Patha: Mangalacharanam."
    },
    "verificationProblem": "Verify all core principles and calculations for Prathama Patha: Mangalacharanam.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G6-SANSKRIT-CH02": {
    "chapterTitle": "Dvitiya Patha: Parichaya",
    "subject": "SANSKRIT",
    "grade": 6,
    "chapterNum": 2,
    "essentialLaw": "\\text{संस्कृत लिङ्ग एवं सर्वनाम}: \\text{पुंल्लिङ्ग (सः/एषः), स्त्रीलिङ्ग (सा/एषा), नपुंसके (तत्/एतत्)}",
    "coreConcepts": [
      {
        "heading": "शब्द-परिचय एवं त्रिलिङ्ग प्रयोग",
        "bullets": [
          "संस्कृत में तीन लिङ्ग (पुंल्लिङ्ग, स्त्रीलिङ्ग, नपुंसकलिङ्ग) तथा तीन वचन (एकवचन, द्विवचन, बहुवचन) होते हैं। अकारान्त पुंल्लिङ्ग (बालकः, चषकः, सौचिकः) एवं आकारान्त स्त्रीलिङ्ग (बालिका, दोला, घटिका) शब्दों का परिचय।"
        ]
      },
      {
        "heading": "निकट एवं दूरवर्ती सर्वनाम प्रयोग",
        "bullets": [
          "समीपस्थ वस्तु/व्यक्ति हेतु: एषः (पुं.), एषा (स्त्री.), एतत् (नपुं.)। दूरस्थ हेतु: सः (पुं.), सा (स्त्री.), तत् (नपुं.)। क्रियापद के साथ समन्वय (यथा- एषः कः? एषः चषकः)।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: द्विवचन और बहुवचन के प्रत्ययों को मिला देना। (Remedy: अकारान्त पुं.: बालकः (एक.), बालकौ (द्वि.), बालकाः (बहु.)। आकारान्त स्त्री.: लता (एक.), लते (द्वि.), लताः (बहु.)।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Dvitiya Patha: Parichaya.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Dvitiya Patha: Parichaya?",
      "Explain the primary mechanisms, formulas, and structural relationships in Dvitiya Patha: Parichaya.",
      "How are concepts in Dvitiya Patha: Parichaya applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Dvitiya Patha: Parichaya to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Dvitiya Patha: Parichaya.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Dvitiya Patha: Parichaya."
    },
    "verificationProblem": "Verify all core principles and calculations for Dvitiya Patha: Parichaya.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G6-SANSKRIT-CH03": {
    "chapterTitle": "Tritiya Patha: Subhashitani",
    "subject": "SANSKRIT",
    "grade": 6,
    "chapterNum": 3,
    "essentialLaw": "\\text{सुभाषितानि (सद्वाक्यानि)}: \\text{पृथिव्यां त्रीणि रत्नानि जलमन्नं सुभाषितम् ।}",
    "coreConcepts": [
      {
        "heading": "सुभाषितानाम् अन्वयः एवं नीति-शिक्षा",
        "bullets": [
          "सुभाषित का अर्थ है सुंदर एवं हितकारी वचन। श्लोकों में परिश्रम की महत्ता (उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः), मधुर वाणी, प्रियवाक्य-प्रदानेन सर्वे तुष्यन्ति जन्तवः, तथा विद्या की श्रेष्ठता का प्रतिपादन।"
        ]
      },
      {
        "heading": "श्लोकार्थ एवं व्याकरण बोध",
        "bullets": [
          "श्लोकों के पदों का अन्वय, सन्धि-विच्छेद, विलोम शब्द (यथा- सुभाषितम् $\\leftrightarrow$ दुर्भाषितम्, उद्यमेन $\\leftrightarrow$ आलस्येन) और समानार्थी शब्द।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: अन्वय करते समय क्रियापद को कर्ता से पहले रख देना। (Remedy: संस्कृत अन्वय में सामान्यतः कर्ता पहले, कर्म मध्य में तथा क्रिया अंत में रखी जाती है।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Tritiya Patha: Subhashitani.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Tritiya Patha: Subhashitani?",
      "Explain the primary mechanisms, formulas, and structural relationships in Tritiya Patha: Subhashitani.",
      "How are concepts in Tritiya Patha: Subhashitani applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Tritiya Patha: Subhashitani to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Tritiya Patha: Subhashitani.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Tritiya Patha: Subhashitani."
    },
    "verificationProblem": "Verify all core principles and calculations for Tritiya Patha: Subhashitani.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G6-SANSKRIT-CH04": {
    "chapterTitle": "Chaturtha Patha: Vidyalaya",
    "subject": "SANSKRIT",
    "grade": 6,
    "chapterNum": 4,
    "essentialLaw": "\\text{विद्यालय-वार्तालाप}: \\text{अस्मद् (अहम्/आवाम्/वयम्) } \\longleftrightarrow \\text{ युष्मद् (त्वम्/युवाम्/यूयम्) संवादः}",
    "coreConcepts": [
      {
        "heading": "विद्यालय-परिसर एवं परस्पर संवाद",
        "bullets": [
          "विद्यालय में छात्र-छात्राओं, शिक्षक-शिक्षिकाओं, संगणक-प्रयोगशाला (Computer Lab) एवं पुस्तकालय का परिचय। प्रथम, मध्यम व उत्तम पुरुष के सर्वनामों द्वारा व्यावहारिक संस्कृत वार्तालाप।"
        ]
      },
      {
        "heading": "लट्-लकार (वर्तमान काल) क्रिया-रूप",
        "bullets": [
          "पठ्, गम् (गच्छ्), लिख्, क्रीड् धातुओं के लट् लकार रूप: प्रथम पुरुष (पठति/पठतः/पठन्ति), मध्यम पुरुष (पठसि/पठथः/पठथ), उत्तम पुरुष (पठामि/पठावः/पठामः)।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: 'अहम्' के साथ 'पठति' क्रिया का प्रयोग करना। (Remedy: अहम् (उत्तम पुरुष एकवचन) के साथ सदा उत्तम पुरुष की ही क्रिया 'पठामि' का प्रयोग होता है।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Chaturtha Patha: Vidyalaya.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Chaturtha Patha: Vidyalaya?",
      "Explain the primary mechanisms, formulas, and structural relationships in Chaturtha Patha: Vidyalaya.",
      "How are concepts in Chaturtha Patha: Vidyalaya applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Chaturtha Patha: Vidyalaya to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Chaturtha Patha: Vidyalaya.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Chaturtha Patha: Vidyalaya."
    },
    "verificationProblem": "Verify all core principles and calculations for Chaturtha Patha: Vidyalaya.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  }
};
