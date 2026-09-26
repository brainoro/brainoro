/**
 * Brainoro Authoritative Curriculum Knowledge Registry
 * File: grade10.ts
 * Total Chapters: 50
 */

import { DeterministicChapterKnowledge } from '../../services/deterministicChapterRegistry';

export const GRADE10_KNOWLEDGE: Record<string, DeterministicChapterKnowledge> = {
  "CBSE-CH-G10-MATH-CH01": {
    "chapterTitle": "Real Numbers",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 1,
    "essentialLaw": "\\text{Fundamental Theorem of Arithmetic: } a = p_1^{k_1} p_2^{k_2} \\cdots p_n^{k_n} \\quad | \\quad \\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b",
    "coreConcepts": [
      {
        "heading": "Prime Factorization & HCF-LCM Product Relation",
        "bullets": [
          "Every composite number can be expressed uniquely as a product of primes, apart from the order of factors.",
          "$\\text{HCF}(a,b) = $ product of the smallest power of each common prime factor.",
          "$\\text{LCM}(a,b) = $ product of the greatest power of each prime factor involved."
        ]
      },
      {
        "heading": "Revisiting Irrational Numbers (Proof by Contradiction)",
        "bullets": [
          "Theorem: If prime $p$ divides $a^2$, then $p$ divides $a$ (where $a$ is positive integer).",
          "Proving irrationality of $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}$ and composite forms like $a + b\\sqrt{p}$ using contradiction.",
          "Terminating decimal condition: Rational $p/q$ has terminating decimal iff $q = 2^n 5^m$."
        ]
      }
    ],
    "examTraps": [
      "Applying $\\text{HCF}(a,b,c) \\times \\text{LCM}(a,b,c) = a \\times b \\times c$ (which is FALSE for three numbers).",
      "Forgetting to state that $a$ and $b$ are CO-PRIME in proof of irrationality by contradiction."
    ],
    "quickMentalCheck": "If $\\text{HCF}(26, 91) = 13$, find $\\text{LCM}(26, 91)$. ($\\text{LCM} = \\frac{26 \\times 91}{13} = 2 \\times 91 = 182$).",
    "cueQuestions": [
      "How does the Fundamental Theorem of Arithmetic ensure unique factorization of composite integers?",
      "How is proof by contradiction structured to prove $\\sqrt{3}$ is irrational?",
      "Under what prime factorization condition of denominator does a rational fraction terminate?"
    ],
    "workedExample": {
      "problem": "Prove that $5 - \\sqrt{3}$ is irrational, given that $\\sqrt{3}$ is irrational.",
      "steps": [
        "Assume contrary that $5 - \\sqrt{3}$ is rational, say $a/b$ where $a, b$ are co-prime integers ($b \\neq 0$).",
        "Rearrange: $5 - \\frac{a}{b} = \\sqrt{3} \\implies \\frac{5b - a}{b} = \\sqrt{3}$.",
        "Since $a, b$ are integers, $\\frac{5b - a}{b}$ is rational.",
        "This implies $\\sqrt{3}$ is rational, which contradicts the given fact that $\\sqrt{3}$ is irrational.",
        "Hence, our assumption is false. $5 - \\sqrt{3}$ is irrational."
      ],
      "result": "5 - \\sqrt{3} \\text{ is irrational (Contradiction established)}"
    },
    "verificationProblem": "Check: Difference of rational (5) and irrational ($\\sqrt{3}$) is always irrational. Verified.",
    "realWorldUse": "Used in public-key cryptography (RSA algorithms), computer pseudorandom number generators, and network packet hashing.",
    "diagramType": "prime-factor-tree-real-numbers"
  },
  "CBSE-CH-G10-MATH-CH02": {
    "chapterTitle": "Polynomials",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 2,
    "essentialLaw": "p(x) = ax^2 + bx + c \\implies \\alpha + \\beta = -\\frac{b}{a}, \\; \\alpha\\beta = \\frac{c}{a} \\quad | \\quad p(x) = k[x^2 - (\\alpha+\\beta)x + \\alpha\\beta]",
    "coreConcepts": [
      {
        "heading": "Geometric Meaning of Zeroes & Quadratic Relations",
        "bullets": [
          "The zeroes of a polynomial $p(x)$ are the $x$-coordinates of the points where the graph $y = p(x)$ intersects the $x$-axis.",
          "For a quadratic polynomial $p(x) = ax^2 + bx + c$ ($a \\neq 0$), the graph is a parabola opening upwards ($a > 0$) or downwards ($a < 0$) intersecting $x$-axis at at most 2 points.",
          "Relationship between zeroes and coefficients: Sum of zeroes $\\alpha + \\beta = -\\frac{b}{a} = -\\frac{\\text{coefficient of } x}{\\text{coefficient of } x^2}$, Product of zeroes $\\alpha\\beta = \\frac{c}{a} = \\frac{\\text{constant term}}{\\text{coefficient of } x^2}$."
        ]
      },
      {
        "heading": "Cubic Polynomials & Formation",
        "bullets": [
          "For cubic polynomial $p(x) = ax^3 + bx^2 + cx + d$: $\\alpha + \\beta + \\gamma = -\\frac{b}{a}$, $\\alpha\\beta + \\beta\\gamma + \\gamma\\alpha = \\frac{c}{a}$, $\\alpha\\beta\\gamma = -\\frac{d}{a}$.",
          "Quadratic polynomial with given zeroes $\\alpha, \\beta$: $k[x^2 - (\\alpha + \\beta)x + \\alpha\\beta]$ for any non-zero real constant $k$.",
          "Degree $n$ polynomial has at most $n$ real zeroes."
        ]
      }
    ],
    "examTraps": [
      "Confusing the negative sign in the sum of zeroes formula: $\\alpha + \\beta = -\\frac{b}{a}$, whereas product is $+\\frac{c}{a}$.",
      "Forgetting that if a graph of a quadratic polynomial does not touch or intersect the x-axis, it has NO real zeroes."
    ],
    "quickMentalCheck": "Find a quadratic polynomial whose sum and product of zeroes are $-3$ and $2$. (Answer: $x^2 - (-3)x + 2 = x^2 + 3x + 2$).",
    "cueQuestions": [
      "How does the number of points of intersection of $y = p(x)$ with the x-axis relate to the degree and zeroes of a polynomial?",
      "How do you verify the algebraic relationship between zeroes and coefficients of $p(x) = 6x^2 - 3 - 7x$?",
      "Why is the coefficient of $x^2$ multiplied by a constant $k$ when forming a polynomial from its zeroes?"
    ],
    "workedExample": {
      "problem": "Find the zeroes of the quadratic polynomial $p(x) = 6x^2 - 7x - 3$ and verify the relationship between the zeroes and coefficients.",
      "steps": [
        "Factorize $p(x)$: $6x^2 - 9x + 2x - 3 = 3x(2x - 3) + 1(2x - 3) = (2x - 3)(3x + 1)$.",
        "Find zeroes: Set $(2x - 3)(3x + 1) = 0 \\implies x = \\frac{3}{2}$ or $x = -\\frac{1}{3}$. Thus $\\alpha = \\frac{3}{2}, \\beta = -\\frac{1}{3}$.",
        "Verify Sum of zeroes: $\\alpha + \\beta = \\frac{3}{2} + \\left(-\\frac{1}{3}\\right) = \\frac{9 - 2}{6} = \\frac{7}{6} = -\\frac{-7}{6} = -\\frac{b}{a}$.",
        "Verify Product of zeroes: $\\alpha \\cdot \\beta = \\left(\\frac{3}{2}\\right)\\left(-\\frac{1}{3}\\right) = -\\frac{3}{6} = -\\frac{1}{2} = \\frac{-3}{6} = \\frac{c}{a}$."
      ],
      "result": "\\text{Zeroes: } \\frac{3}{2}, -\\frac{1}{3} \\quad | \\quad \\text{Sum} = \\frac{7}{6} = -\\frac{b}{a}, \\; \\text{Product} = -\\frac{1}{2} = \\frac{c}{a}"
    },
    "verificationProblem": "Check: $p(3/2) = 6(9/4) - 7(3/2) - 3 = 27/2 - 21/2 - 3 = 6/2 - 3 = 0$. Verified.",
    "realWorldUse": "Used in parabolic trajectory missile physics, revenue optimization curve fitting in commerce, and audio frequency filter modeling.",
    "diagramType": "polynomial-parabola-zeroes"
  },
  "CBSE-CH-G10-MATH-CH03": {
    "chapterTitle": "Pair of Linear Equations in Two Variables",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 3,
    "essentialLaw": "\\text{Linear System: } \\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2} \\; (\\text{Unique Solution}), \\; \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} \\; (\\text{Infinitely Many}), \\; \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2} \\; (\\text{No Solution})",
    "coreConcepts": [
      {
        "heading": "Consistency Conditions & Graphical Interpretation",
        "bullets": [
          "Intersecting lines: Unique solution, consistent system ($a_1/a_2 \\neq b_1/b_2$).",
          "Coincident lines: Dependent consistent system with infinitely many solutions ($a_1/a_2 = b_1/b_2 = c_1/c_2$).",
          "Parallel lines: Inconsistent system with no common solution ($a_1/a_2 = b_1/b_2 \\neq c_1/c_2$)."
        ]
      },
      {
        "heading": "Algebraic Solution Methods",
        "bullets": [
          "Substitution Method: Express one variable in terms of the other and substitute into second equation.",
          "Elimination Method: Multiply equations by suitable non-zero constants to equate coefficients of one variable.",
          "Cross-multiplication / matrix reduction methods for solving simultaneous linear equations."
        ]
      }
    ],
    "examTraps": [
      "Forgetting to arrange both equations in standard form $a_i x + b_i y + c_i = 0$ before comparing ratios $a_1/a_2, b_1/b_2, c_1/c_2$.",
      "Sign errors when transposing terms during elimination or substitution steps."
    ],
    "quickMentalCheck": "For $2x+3y=5$ and $4x+6y=10$, what is the nature of solutions? (Infinitely many, since $2/4 = 3/6 = 5/10 = 1/2$).",
    "cueQuestions": [
      "How do the ratio comparisons of coefficients determine the number of solutions of a linear system?",
      "What is the algebraic difference between a consistent and an inconsistent pair of linear equations?",
      "How do equations of lines parallel to coordinate axes differ from lines passing through origin?"
    ],
    "workedExample": {
      "problem": "Solve the pair of linear equations: $x + 3y = 6$ and $2x - 3y = 12$ using elimination method.",
      "steps": [
        "Add the two equations directly: $(x + 3y) + (2x - 3y) = 6 + 12 \\implies 3x = 18 \\implies x = 6$.",
        "Substitute $x = 6$ into first equation: $6 + 3y = 6 \\implies 3y = 0 \\implies y = 0$.",
        "Solution is $(x, y) = (6, 0)$."
      ],
      "result": "x = 6, \\; y = 0"
    },
    "verificationProblem": "Substitute $(6,0)$ into $2x-3y$: $2(6)-3(0) = 12$. Matches second equation.",
    "realWorldUse": "Used in economic supply-demand equilibrium, budget line optimizations, navigation course plotting, and electronic circuit nodal analysis.",
    "diagramType": "linear-equations-coordinate-graph"
  },
  "CBSE-CH-G10-MATH-CH04": {
    "chapterTitle": "Quadratic Equations",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 4,
    "essentialLaw": "ax^2 + bx + c = 0 \\implies x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\quad | \\quad D = b^2 - 4ac \\quad | \\quad D > 0 \\implies 2 \\text{ Real Distinct}, \\; D = 0 \\implies 2 \\text{ Real Equal}",
    "coreConcepts": [
      {
        "heading": "Standard Form, Factorization & Quadratic Formula",
        "bullets": [
          "Standard form: $ax^2 + bx + c = 0$ where $a, b, c \\in \\mathbb{R}$ and $a \\neq 0$.",
          "Solution by Factorization (splitting the middle term): Express $bx$ as $p x + q x$ where $p + q = b$ and $p \\cdot q = ac$.",
          "Quadratic Formula (Shridhara Acharya's Formula): $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$."
        ]
      },
      {
        "heading": "Nature of Roots & Discriminant Analysis",
        "bullets": [
          "Discriminant $D = b^2 - 4ac$ determines root characteristics.",
          "Case 1: If $D > 0 \\implies$ Two distinct real roots ($x = \\frac{-b \\pm \\sqrt{D}}{2a}$).",
          "Case 2: If $D = 0 \\implies$ Two equal (coincident) real roots ($x = -\\frac{b}{2a}$).",
          "Case 3: If $D < 0 \\implies$ No real roots (roots are non-real complex numbers)."
        ]
      }
    ],
    "examTraps": [
      "Dividing by $x$ in equations like $x^2 = 5x$, which incorrectly eliminates the valid root $x = 0$.",
      "Forgetting that when $D = 0$, there are TWO equal real roots ($-\\frac{b}{2a}, -\\frac{b}{2a}$), not just one."
    ],
    "quickMentalCheck": "Find the nature of roots for $2x^2 - 4x + 3 = 0$. (Answer: $D = (-4)^2 - 4(2)(3) = 16 - 24 = -8 < 0 \\implies$ No real roots).",
    "cueQuestions": [
      "How does the discriminant $D = b^2 - 4ac$ govern the geometric intersection of the parabola with the x-axis?",
      "Why must the coefficient $a$ in $ax^2 + bx + c = 0$ be strictly non-zero?",
      "How do you model upstream/downstream speed word problems into standard quadratic equations?"
    ],
    "workedExample": {
      "problem": "Find the values of $k$ for which the quadratic equation $2x^2 + kx + 3 = 0$ has two equal real roots.",
      "steps": [
        "Identify coefficients: $a = 2, b = k, c = 3$.",
        "Condition for two equal real roots is $D = b^2 - 4ac = 0$.",
        "Substitute coefficients: $k^2 - 4(2)(3) = 0 \\implies k^2 - 24 = 0$.",
        "Solve for $k$: $k^2 = 24 \\implies k = \\pm \\sqrt{24} = \\pm 2\\sqrt{6}$."
      ],
      "result": "k = \\pm 2\\sqrt{6}"
    },
    "verificationProblem": "Substitute $k = 2\\sqrt{6}$: $D = (2\\sqrt{6})^2 - 24 = 24 - 24 = 0$. Roots are $x = \\frac{-2\\sqrt{6}}{4} = -\\frac{\\sqrt{6}}{2}$ (equal). Verified.",
    "realWorldUse": "Used in projectile flight motion physics, profit break-even quadratic equations, architectural arch span stress, and stopping distance calculations for vehicles.",
    "diagramType": "quadratic-discriminant-roots-parabola"
  },
  "CBSE-CH-G10-MATH-CH05": {
    "chapterTitle": "Arithmetic Progressions",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 5,
    "essentialLaw": "\\text{General Term: } a_n = a + (n - 1)d \\quad | \\quad \\text{Sum of } n \\text{ Terms: } S_n = \\frac{n}{2}[2a + (n - 1)d] = \\frac{n}{2}(a + l)",
    "coreConcepts": [
      {
        "heading": "General Term & Common Difference",
        "bullets": [
          "An Arithmetic Progression (AP) is a sequence where each term is obtained by adding common difference $d$ to preceding term.",
          "Common difference $d = a_{k+1} - a_k$ can be positive, negative, or zero.",
          "The nth term from the end is given by $a_n' = l - (n - 1)d$ where $l$ is the last term."
        ]
      },
      {
        "heading": "Sum of First n Terms of an AP",
        "bullets": [
          "Sum formula: $S_n = \\frac{n}{2}[2a + (n - 1)d]$; if first term $a$ and last term $l$ are known: $S_n = \\frac{n}{2}(a + l)$.",
          "Relationship between nth term and sums: $a_n = S_n - S_{n-1}$.",
          "Sum of first $n$ positive natural numbers: $S_n = \\frac{n(n + 1)}{2}$."
        ]
      }
    ],
    "examTraps": [
      "Confusing the term value $a_n$ with the number of terms $n$ (n must always be a positive integer $\\mathbb{N}$).",
      "Sign errors in common difference when AP is decreasing ($d < 0$)."
    ],
    "quickMentalCheck": "Find the 10th term of AP: $2, 7, 12, \\dots$ ($a=2, d=5 \\implies a_{10} = 2 + 9(5) = 47$).",
    "cueQuestions": [
      "How do you prove a sequence is an AP using the consecutive difference test?",
      "How is the formula for sum of n terms derived using Gaussian pair summation?",
      "How do you find the common difference given the sum formula $S_n = An^2 + Bn$?"
    ],
    "workedExample": {
      "problem": "How many terms of the AP: $9, 17, 25, \\dots$ must be taken to give a sum of $636$?",
      "steps": [
        "Identify $a = 9, d = 17 - 9 = 8, S_n = 636$.",
        "Apply $S_n = \\frac{n}{2}[2a + (n - 1)d] \\implies 636 = \\frac{n}{2}[2(9) + (n - 1)8] = \\frac{n}{2}[18 + 8n - 8] = \\frac{n}{2}[10 + 8n] = n(5 + 4n)$.",
        "Form quadratic: $4n^2 + 5n - 636 = 0$.",
        "Factorize: $4n^2 + 53n - 48n - 636 = 0 \\implies n(4n + 53) - 12(4n + 53) = (n - 12)(4n + 53) = 0$.",
        "Since $n \\in \\mathbb{N}$, discard $n = -53/4$. Therefore $n = 12$."
      ],
      "result": "n = 12 \\text{ terms}"
    },
    "verificationProblem": "Check $S_{12} = \\frac{12}{2}[2(9) + 11(8)] = 6[18 + 88] = 6(106) = 636$. Matches.",
    "realWorldUse": "Used in financial loan installment schedules (EMI amortization), depreciation tables, seating arrangement layouts, and discrete physics pulse timings.",
    "diagramType": "arithmetic-progression-sum-grid"
  },
  "CBSE-CH-G10-MATH-CH06": {
    "chapterTitle": "Triangles",
    "subject": "MATHEMATICS",
    "grade": 9,
    "chapterNum": 7,
    "essentialLaw": "$\\angle A + \\angle B + \\angle C = 180^\\circ \\quad | \\quad \\angle \\text{ext} = \\angle 1 + \\angle 2 \\quad | \\quad a + b > c$",
    "coreConcepts": [
      {
        "heading": "Classification of Triangles",
        "bullets": [
          "By Sides: Equilateral (all 3 sides equal), Isosceles (2 sides equal), Scalene (all 3 sides different).",
          "By Angles: Acute-angled (all angles $< 90^\\circ$), Right-angled (one angle $= 90^\\circ$), Obtuse-angled (one angle $> 90^\\circ$)."
        ]
      },
      {
        "heading": "Core Triangle Theorems & Congruence Criteria",
        "bullets": [
          "Angle Sum Property: The three interior angles of a triangle always sum to $180^\\circ$ ($\\angle A + \\angle B + \\angle C = 180^\\circ$).",
          "Exterior Angle Theorem: An exterior angle of a triangle is equal to the sum of the two opposite interior angles ($\\angle \\text{ext} = \\angle 1 + \\angle 2$).",
          "Congruence Criteria: SSS (Side-Side-Side), SAS (Side-Angle-Side), ASA (Angle-Side-Angle), and RHS (Right angle-Hypotenuse-Side).",
          "Isosceles Triangle Theorems: Angles opposite to equal sides of an isosceles triangle are equal, and sides opposite to equal angles are equal."
        ]
      },
      {
        "heading": "Area and Perimeter",
        "bullets": [
          "Perimeter $= a + b + c$.",
          "Area $= \\frac{1}{2} \\times \\text{base} \\times \\text{perpendicular height}$.",
          "Triangle Inequality Theorem: The sum of the lengths of any two sides of a triangle must be strictly greater than the length of the third side ($a + b > c$)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Line Segment with Line or Ray: A line segment has two fixed endpoints and finite measurable length; a line has zero endpoints extending endlessly in both directions; a ray has one endpoint.",
      "Ruler Alignment Precision: Always align the zero mark (0 cm) of the ruler with the start endpoint, not the outer edge of the ruler.",
      "Geometric Notation Distinction: Distinguish between segment AB (path between endpoints), length AB (scalar measurement), line <->AB, and ray ->AB."
    ],
    "quickMentalCheck": "Can a triangle have side lengths 3 cm, 4 cm, and 8 cm? (Answer: No, 3 + 4 = 7 < 8, violates triangle inequality).",
    "cueQuestions": [
      "State the 4 valid congruence criteria for triangles (SSS, SAS, ASA, RHS).",
      "Explain why AAA (Angle-Angle-Angle) is NOT a valid congruence criterion.",
      "State the Triangle Inequality Theorem."
    ],
    "workedExample": {
      "problem": "In ΔABC, AB = AC and ∠A = 40°. Find ∠B and ∠C.",
      "steps": [
        "Step 1: Since AB = AC, ∠B = ∠C (angles opposite to equal sides of an isosceles triangle are equal).",
        "Step 2: Apply Angle Sum Property: ∠A + ∠B + ∠C = 180° ➔ 40° + 2∠B = 180°.",
        "Step 3: Solve for ∠B: 2∠B = 140° ➔ ∠B = 70°, and ∠C = 70°."
      ],
      "result": "∠B = 70° and ∠C = 70°."
    },
    "verificationProblem": "Verify whether a triangle can be formed with sides 6 cm, 8 cm, and 10 cm, and check if it is right-angled.",
    "realWorldUse": "Truss bridge construction, triangular mesh rendering in 3D gaming, GPS geolocation triangulation, and surveying.",
    "diagramType": "triangle"
  },
  "CBSE-CH-G10-MATH-CH07": {
    "chapterTitle": "Coordinate Geometry",
    "subject": "MATHEMATICS",
    "grade": 10,
    "chapterNum": 7,
    "essentialLaw": "$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2} \\quad | \\quad P(x, y) = \\left(\\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}\\right) \\quad | \\quad M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$",
    "coreConcepts": [
      {
        "heading": "Distance Formula and Geometric Applications",
        "bullets": [
          "Distance between points $P(x_1, y_1)$ and $Q(x_2, y_2)$ is $d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$; distance from origin is $\\sqrt{x^2 + y^2}$.",
          "Geometric tests: Equilateral triangle ($AB = BC = CA$), Right triangle ($AB^2 + BC^2 = AC^2$), Square (4 equal sides & equal diagonals)."
        ]
      },
      {
        "heading": "Section Formula and Midpoint Coordinates",
        "bullets": [
          "Internal division in ratio $m_1:m_2$: $x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}$, $y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$.",
          "Midpoint formula ($1:1$ ratio): $M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})$; Centroid of triangle: $G = (\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3})$."
        ]
      },
      {
        "heading": "Collinearity and Axis Intercept Conditions",
        "bullets": [
          "Points A, B, C are collinear if and only if $AB + BC = AC$ (or area of $\\Delta ABC = 0$).",
          "Points lying on the x-axis have coordinate form $(x, 0)$; points on the y-axis have form $(0, y)$."
        ]
      }
    ],
    "examTraps": [
      "Section Formula Cross-Multiplication: Multiplying m1 with x1 instead of m1*x2 + m2*x1.",
      "Negative Sign Transposition in Distance: Evaluating (x2 - (-x1))^2 incorrectly instead of (x2 + x1)^2.",
      "Axis Intercept Coordinates: Swapping coordinates for points on axes (e.g. using (0, x) instead of (x, 0) for x-axis)."
    ],
    "quickMentalCheck": "Cross-multiply ratio weights m1 -> x2 and m2 -> x1 in Section Formula.",
    "cueQuestions": [
      "State and prove the Distance Formula using Pythagoras theorem.",
      "Derive the coordinates of a point dividing a line segment internally in ratio m1:m2.",
      "How do we test whether 4 given points form a rhombus or a square?"
    ],
    "workedExample": {
      "problem": "Find the ratio in which the y-axis divides the line segment joining A(5, -6) and B(-1, -4).",
      "steps": [
        "Step 1: Let the ratio be k : 1. The dividing point on y-axis has coordinates P(0, y).",
        "Step 2: Apply section formula for x-coordinate: 0 = (k*(-1) + 1*5)/(k + 1).",
        "Step 3: Solve for k: -k + 5 = 0 => k = 5, hence ratio is 5 : 1.",
        "Step 4: Find y: y = (5*(-4) + 1*(-6))/(5 + 1) = (-20 - 6)/6 = -26/6 = -13/3."
      ],
      "result": "The y-axis divides segment AB in ratio 5 : 1 at point (0, -13/3)."
    },
    "verificationProblem": "Verify if points (1, 5), (2, 3), and (-2, -11) are collinear.",
    "realWorldUse": "Applied in GPS geolocation, computer graphics rendering, spatial navigation, and robotics kinematics.",
    "diagramType": "visual_model_pending"
  },
  "CBSE-CH-G10-MATH-CH08": {
    "chapterTitle": "Introduction to Trigonometry",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 8,
    "essentialLaw": "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta \\quad | \\quad \\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}}",
    "coreConcepts": [
      {
        "heading": "Trigonometric Ratios & Specific Angle Values",
        "bullets": [
          "Ratios in right triangle: $\\sin\\theta = P/H, \\cos\\theta = B/H, \\tan\\theta = P/B, \\cot\\theta = B/P, \\sec\\theta = H/B, \\csc\\theta = H/P$.",
          "Standard angle values for $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$.",
          "Fundamental identities connecting Pythagorean sides in unit circle."
        ]
      },
      {
        "heading": "Heights and Distances Applications",
        "bullets": [
          "Angle of Elevation: Line of sight above horizontal observer level.",
          "Angle of Depression: Line of sight below horizontal observer level (equals angle of elevation by alternate interior angles).",
          "Setting up single and multi-triangle trigonometric systems using $\\tan\\theta$."
        ]
      }
    ],
    "examTraps": [
      "Writing $(\\sin\\theta)^2$ as $\\sin\\theta^2$ instead of $\\sin^2\\theta$.",
      "Confusing Adjacent (Base) side with Opposite (Perpendicular) side relative to active reference angle $\\theta$."
    ],
    "quickMentalCheck": "Evaluate $\\sin^2 30^\\circ + \\cos^2 30^\\circ$. By identity, it is identically $1$.",
    "cueQuestions": [
      "How are the three Pythagorean trigonometric identities derived from the unit right triangle?",
      "How do you set up equations for two-observer angle of elevation problems?",
      "Why does $\\tan 90^\\circ$ become undefined in real trigonometric ratios?"
    ],
    "workedExample": {
      "problem": "Prove identity: $\\frac{\\sin\\theta - 2\\sin^3\\theta}{2\\cos^3\\theta - \\cos\\theta} = \\tan\\theta$.",
      "steps": [
        "Factor numerator: $\\sin\\theta(1 - 2\\sin^2\\theta)$.",
        "Factor denominator: $\\cos\\theta(2\\cos^2\\theta - 1)$.",
        "Substitute $1 = \\sin^2\\theta + \\cos^2\\theta$ in numerator: $\\sin^2\\theta + \\cos^2\\theta - 2\\sin^2\\theta = \\cos^2\\theta - \\sin^2\\theta$.",
        "Substitute $1$ in denominator: $2\\cos^2\\theta - (\\sin^2\\theta + \\cos^2\\theta) = \\cos^2\\theta - \\sin^2\\theta$.",
        "Divide factors: $\\frac{\\sin\\theta(\\cos^2\\theta - \\sin^2\\theta)}{\\cos\\theta(\\cos^2\\theta - \\sin^2\\theta)} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$."
      ],
      "result": "\\text{LHS} = \\text{RHS} = \\tan\\theta \\; (\\text{Identity proven})"
    },
    "verificationProblem": "Test with $\\theta = 30^\\circ$: $\\frac{0.5 - 2(0.125)}{2(0.6495) - 0.866} = \\frac{0.25}{0.433} \\approx 0.577 = \\tan 30^\\circ$. Verified.",
    "realWorldUse": "Used in land boundary surveying, satellite GPS triangulation, astronomical parallax, and architectural roof pitch calculations.",
    "diagramType": "trigonometry-elevation-depression"
  },
  "CBSE-CH-G10-MATH-CH09": {
    "chapterTitle": "Some Applications of Trigonometry",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 9,
    "essentialLaw": "\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta \\quad | \\quad \\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}}",
    "coreConcepts": [
      {
        "heading": "Trigonometric Ratios & Specific Angle Values",
        "bullets": [
          "Ratios in right triangle: $\\sin\\theta = P/H, \\cos\\theta = B/H, \\tan\\theta = P/B, \\cot\\theta = B/P, \\sec\\theta = H/B, \\csc\\theta = H/P$.",
          "Standard angle values for $0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ$.",
          "Fundamental identities connecting Pythagorean sides in unit circle."
        ]
      },
      {
        "heading": "Heights and Distances Applications",
        "bullets": [
          "Angle of Elevation: Line of sight above horizontal observer level.",
          "Angle of Depression: Line of sight below horizontal observer level (equals angle of elevation by alternate interior angles).",
          "Setting up single and multi-triangle trigonometric systems using $\\tan\\theta$."
        ]
      }
    ],
    "examTraps": [
      "Writing $(\\sin\\theta)^2$ as $\\sin\\theta^2$ instead of $\\sin^2\\theta$.",
      "Confusing Adjacent (Base) side with Opposite (Perpendicular) side relative to active reference angle $\\theta$."
    ],
    "quickMentalCheck": "Evaluate $\\sin^2 30^\\circ + \\cos^2 30^\\circ$. By identity, it is identically $1$.",
    "cueQuestions": [
      "How are the three Pythagorean trigonometric identities derived from the unit right triangle?",
      "How do you set up equations for two-observer angle of elevation problems?",
      "Why does $\\tan 90^\\circ$ become undefined in real trigonometric ratios?"
    ],
    "workedExample": {
      "problem": "Prove identity: $\\frac{\\sin\\theta - 2\\sin^3\\theta}{2\\cos^3\\theta - \\cos\\theta} = \\tan\\theta$.",
      "steps": [
        "Factor numerator: $\\sin\\theta(1 - 2\\sin^2\\theta)$.",
        "Factor denominator: $\\cos\\theta(2\\cos^2\\theta - 1)$.",
        "Substitute $1 = \\sin^2\\theta + \\cos^2\\theta$ in numerator: $\\sin^2\\theta + \\cos^2\\theta - 2\\sin^2\\theta = \\cos^2\\theta - \\sin^2\\theta$.",
        "Substitute $1$ in denominator: $2\\cos^2\\theta - (\\sin^2\\theta + \\cos^2\\theta) = \\cos^2\\theta - \\sin^2\\theta$.",
        "Divide factors: $\\frac{\\sin\\theta(\\cos^2\\theta - \\sin^2\\theta)}{\\cos\\theta(\\cos^2\\theta - \\sin^2\\theta)} = \\frac{\\sin\\theta}{\\cos\\theta} = \\tan\\theta$."
      ],
      "result": "\\text{LHS} = \\text{RHS} = \\tan\\theta \\; (\\text{Identity proven})"
    },
    "verificationProblem": "Test with $\\theta = 30^\\circ$: $\\frac{0.5 - 2(0.125)}{2(0.6495) - 0.866} = \\frac{0.25}{0.433} \\approx 0.577 = \\tan 30^\\circ$. Verified.",
    "realWorldUse": "Used in land boundary surveying, satellite GPS triangulation, astronomical parallax, and architectural roof pitch calculations.",
    "diagramType": "trigonometry-elevation-depression"
  },
  "CBSE-CH-G10-MATH-CH10": {
    "chapterTitle": "Circles",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 10,
    "essentialLaw": "\\text{Tangent } \\perp \\text{ Radius at Point of Contact } (OP \\perp PT) \\quad | \\quad \\text{Lengths of Tangents from External Point: } PT_1 = PT_2",
    "coreConcepts": [
      {
        "heading": "Tangents to a Circle & Radius Perpendicularity",
        "bullets": [
          "A tangent to a circle is a line that touches the circle at exactly one point (the point of contact); a secant intersects at two distinct points.",
          "Theorem 10.1: The tangent at any point of a circle is perpendicular to the radius through the point of contact ($OP \\perp XY$).",
          "There is no tangent from an interior point; exactly 1 tangent at a boundary point; exactly 2 tangents from an external point."
        ]
      },
      {
        "heading": "Tangents from an External Point & Properties",
        "bullets": [
          "Theorem 10.2: The lengths of tangents drawn from an external point to a circle are equal ($AP = AQ$).",
          "The tangents subtend equal angles at the center ($\\angle AOP = \\angle AOQ$) and are equally inclined to the line joining the point to the center.",
          "In a circumscribed quadrilateral $ABCD$ touching a circle at $P, Q, R, S$: $AB + CD = AD + BC$."
        ]
      }
    ],
    "examTraps": [
      "Assuming the tangent length includes the distance to the center of the circle; tangent length is strictly the segment from the external point to the point of contact.",
      "Forgetting that the angle between two tangents from an external point and the angle subtended by the line segment joining points of contact at center are supplementary ($\\angle PT_1 T_2 + \\angle T_1 O T_2 = 180^\\circ$)."
    ],
    "quickMentalCheck": "If tangents $PA$ and $PB$ from point $P$ to circle with center $O$ are inclined to each other at angle $80^\\circ$, find $\\angle POA$. (Answer: $\\angle AOB = 180^\\circ - 80^\\circ = 100^\\circ \\implies \\angle POA = 100^\\circ / 2 = 50^\\circ$).",
    "cueQuestions": [
      "How does the shortest distance property of a point from a line prove that the radius is perpendicular to the tangent at the point of contact?",
      "How do you prove that the lengths of tangents drawn from an external point to a circle are equal using RHS congruence?",
      "Why do opposite sides of a quadrilateral circumscribing a circle subtend supplementary angles at the center of the circle?"
    ],
    "workedExample": {
      "problem": "Two tangents $TP$ and $TQ$ are drawn to a circle with center $O$ from an external point $T$. Prove that $\\angle PTQ = 2 \\angle OPQ$.",
      "steps": [
        "Let $\\angle PTQ = \\theta$. In $\\triangle TPQ$, $TP = TQ$ (tangents from external point $T$).",
        "Since $TP = TQ$, $\\triangle TPQ$ is isosceles $\\implies \\angle TPQ = \\angle TQP = \\frac{1}{2}(180^\\circ - \\theta) = 90^\\circ - \\frac{\\theta}{2}$.",
        "By Theorem 10.1, radius is perpendicular to tangent: $\\angle OPT = 90^\\circ$.",
        "Therefore, $\\angle OPQ = \\angle OPT - \\angle TPQ = 90^\\circ - \\left(90^\\circ - \\frac{\\theta}{2}\\right) = \\frac{\\theta}{2}$.",
        "Multiply both sides by 2: $2 \\angle OPQ = \\theta = \\angle PTQ$."
      ],
      "result": "\\text{Proven: } \\angle PTQ = 2 \\angle OPQ"
    },
    "verificationProblem": "Check for $\\angle PTQ = 60^\\circ$: $\\angle TPQ = 60^\\circ \\implies \\angle OPQ = 90^\\circ - 60^\\circ = 30^\\circ \\implies 2(30^\\circ) = 60^\\circ$. Holds true.",
    "realWorldUse": "Used in mechanical belt pulley drive geometry, civil road circular curvature alignment, and optical gear meshing teeth design.",
    "diagramType": "circle-tangents-external-point"
  },
  "CBSE-CH-G10-MATH-CH11": {
    "chapterTitle": "Areas Related to Circles",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 11,
    "essentialLaw": "\\text{Area of Sector: } A = \\frac{\\theta}{360^\\circ} \\pi r^2 \\quad | \\quad \\text{Arc Length: } l = \\frac{\\theta}{360^\\circ} 2\\pi r \\quad | \\quad \\text{Area of Segment} = \\text{Area of Sector} - \\text{Area of } \\triangle",
    "coreConcepts": [
      {
        "heading": "Perimeter and Area of Circle & Sector",
        "bullets": [
          "Circumference $C = 2\\pi r$; Area of circle $A = \\pi r^2$.",
          "Sector of a circle is the portion enclosed by two radii and the corresponding arc; Area of sector of angle $\\theta$ (in degrees): $A = \\frac{\\theta}{360^\\circ} \\times \\pi r^2$.",
          "Length of an arc of a sector of angle $\\theta$: $l = \\frac{\\theta}{360^\\circ} \\times 2\\pi r$; Relation: $\\text{Area} = \\frac{1}{2} l r$."
        ]
      },
      {
        "heading": "Segment of a Circle & Composite Combinations",
        "bullets": [
          "Segment is the region bounded by a chord and the corresponding arc.",
          "Area of minor segment of angle $\\theta$: $\\text{Area of minor sector} - \\text{Area of } \\triangle OAB = \\frac{\\theta}{360^\\circ}\\pi r^2 - \\frac{1}{2}r^2 \\sin \\theta$.",
          "Area of major segment $= \\pi r^2 - \\text{Area of minor segment}$; Areas of combined shaded planar figures (squares with semicircles, inscribed equilateral triangles)."
        ]
      }
    ],
    "examTraps": [
      "Using diameter instead of radius $r = d/2$ in area formulas.",
      "Forgetting that the perimeter of a sector includes the two bounding radii: $\\text{Perimeter} = l + 2r = \\frac{\\theta}{360^\\circ}2\\pi r + 2r$."
    ],
    "quickMentalCheck": "What is the area of a sector of a circle of radius $6\\text{ cm}$ with central angle $60^\\circ$? (Answer: $\\frac{60}{360}\\pi (6^2) = \\frac{1}{6}(36\\pi) = 6\\pi = \\frac{132}{7}\\text{ cm}^2$).",
    "cueQuestions": [
      "How does the formula $\\frac{\\theta}{360^\\circ}\\pi r^2$ proportionally derive from the total angular sweep $360^\\circ$ of a complete circular disk?",
      "How do you compute the area of a segment when the central angle is $120^\\circ$ using $\\frac{1}{2}r^2\\sin 120^\\circ$?",
      "What is the formula relating the arc length $l$, radius $r$, and sector area $A$?"
    ],
    "workedExample": {
      "problem": "A chord of a circle of radius $10\\text{ cm}$ subtends a right angle at the center. Find the area of the corresponding minor segment. (Use $\\pi = 3.14$).",
      "steps": [
        "Central angle $\\theta = 90^\\circ$, radius $r = 10\\text{ cm}$.",
        "Calculate area of minor sector: $A_{\\text{sector}} = \\frac{90^\\circ}{360^\\circ} \\pi r^2 = \\frac{1}{4}(3.14)(10^2) = \\frac{314}{4} = 78.5\\text{ cm}^2$.",
        "Calculate area of right $\\triangle OAB$: $A_{\\triangle} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 10 \\times 10 = 50\\text{ cm}^2$.",
        "Subtract to find minor segment area: $A_{\\text{segment}} = A_{\\text{sector}} - A_{\\triangle} = 78.5 - 50 = 28.5\\text{ cm}^2$."
      ],
      "result": "28.5\\text{ cm}^2"
    },
    "verificationProblem": "Check: Area of major segment $= \\pi(100) - 28.5 = 314 - 28.5 = 285.5\\text{ cm}^2$. Sum $= 314\\text{ cm}^2 = \\pi r^2$. Verified.",
    "realWorldUse": "Used in rotating agricultural sprinkler coverage area calculations, windshield wiper sweep geometry, and architectural circular stained-glass design.",
    "diagramType": "circle-sector-and-segment-geometry"
  },
  "CBSE-CH-G10-MATH-CH12": {
    "chapterTitle": "Surface Areas and Volumes",
    "subject": "MATHEMATICS",
    "grade": 9,
    "chapterNum": 11,
    "essentialLaw": "$\\text{Cone: } \\text{CSA} = \\pi r l, \\; V = \\frac{1}{3}\\pi r^2 h \\quad | \\quad \\text{Sphere: } \\text{TSA} = 4\\pi r^2, \\; V = \\frac{4}{3}\\pi r^3 \\quad [l = \\sqrt{r^2 + h^2}]$",
    "coreConcepts": [
      {
        "heading": "Surface Area & Volume of Right Circular Cone",
        "bullets": [
          "Slant Height Relation: $l = \\sqrt{r^2 + h^2}$, where $r$ is base radius and $h$ is vertical height.",
          "Curved Surface Area (CSA): $\\text{CSA} = \\pi r l$.",
          "Total Surface Area (TSA): $\\text{TSA} = \\pi r l + \\pi r^2 = \\pi r(l + r)$.",
          "Volume of Cone: $V = \\frac{1}{3}\\pi r^2 h$ (strictly one-third the volume of a cylinder with identical base and height)."
        ]
      },
      {
        "heading": "Surface Area & Volume of Sphere and Hemisphere",
        "bullets": [
          "Solid Sphere: Surface Area $\\text{SA} = 4\\pi r^2$; Volume $V = \\frac{4}{3}\\pi r^3$.",
          "Solid Hemisphere: Curved Surface Area $\\text{CSA} = 2\\pi r^2$; Total Surface Area $\\text{TSA} = 2\\pi r^2 + \\pi r^2 = 3\\pi r^2$; Volume $V = \\frac{2}{3}\\pi r^3$.",
          "Hollow Spherical Shell: Volume of material $= \\frac{4}{3}\\pi(R^3 - r^3)$."
        ]
      },
      {
        "heading": "Cubes, Cuboids and Right Cylinders",
        "bullets": [
          "Cuboid: $\\text{TSA} = 2(lb + bh + hl)$; Lateral Surface Area $\\text{LSA} = 2h(l + b)$; Volume $V = lbh$; Diagonal $= \\sqrt{l^2 + b^2 + h^2}$.",
          "Cube (side $a$): $\\text{TSA} = 6a^2$; $\\text{LSA} = 4a^2$; Volume $V = a^3$; Diagonal $= a\\sqrt{3}$.",
          "Right Circular Cylinder: $\\text{CSA} = 2\\pi rh$; $\\text{TSA} = 2\\pi r(r + h)$; Volume $V = \\pi r^2 h$."
        ]
      }
    ],
    "examTraps": [
      "Slant Height vs Vertical Height: Substituting vertical height $h$ instead of slant height $l = \\sqrt{r^2 + h^2}$ in cone CSA formula ($\\pi r l$).",
      "Solid Hemisphere TSA vs CSA: Using $2\\pi r^2$ instead of $3\\pi r^2$ for a solid hemisphere total surface area (forgetting the flat circular base $\\pi r^2$).",
      "Unit Conversion Errors: Mixing cm and m, or confusing area units ($\\text{cm}^2, \\text{m}^2$) with volume units ($\\text{cm}^3, \\text{m}^3$), and remembering $1 \\text{ m}^3 = 1000 \\text{ liters}$ and $1 \\text{ liter} = 1000 \\text{ cm}^3$."
    ],
    "quickMentalCheck": "Calculate the Curved Surface Area of a cone with radius 7 cm and slant height 10 cm using π = 22/7. (Answer: πrl = (22/7) × 7 × 10 = 220 cm²).",
    "cueQuestions": [
      "Derive the relationship between slant height, radius, and vertical height of a right circular cone.",
      "Why is the total surface area of a solid hemisphere 3πr² while its curved surface area is 2πr²?",
      "How many liters of water can a hemispherical bowl of radius 21 cm hold?"
    ],
    "workedExample": {
      "problem": "Find the curved surface area and total surface area of a right circular cone whose height is 12 cm and base radius is 5 cm (use π = 3.14).",
      "steps": [
        "Step 1: Calculate slant height: l = √(r² + h²) = √(5² + 12²) = √(25 + 144) = √169 = 13 cm.",
        "Step 2: Curved Surface Area (CSA) = πrl = 3.14 × 5 × 13 = 204.1 cm².",
        "Step 3: Total Surface Area (TSA) = πr(l + r) = 3.14 × 5 × (13 + 5) = 15.7 × 18 = 282.6 cm²."
      ],
      "result": "CSA = 204.1 cm² and TSA = 282.6 cm²."
    },
    "verificationProblem": "A hemispherical dome of a building needs to be painted. If the circumference of the base of the dome is 17.6 m, find the cost of painting it at ₹5 per 100 cm².",
    "realWorldUse": "Architecture and dome construction, silos and storage tanks, industrial packaging, fluid storage capacity, and aerospace nose-cone aerodynamic design.",
    "diagramType": "coordinate_grid"
  },
  "CBSE-CH-G10-MATH-CH13": {
    "chapterTitle": "Statistics",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 13,
    "essentialLaw": "\\text{Mean (Step-Deviation): } \\bar{x} = a + \\left(\\frac{\\sum f_i u_i}{\\sum f_i}\\right)h, \\quad \\text{Mode} = l + \\left(\\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\right)h, \\quad \\text{Median} = l + \\left(\\frac{\\frac{n}{2} - cf}{f}\\right)h",
    "coreConcepts": [
      {
        "heading": "Measures of Central Tendency for Grouped Data",
        "bullets": [
          "Mean: Calculated using Direct Method ($\\sum f_i x_i / \\sum f_i$), Assumed Mean ($a + \\sum f_i d_i / \\sum f_i$), or Step-Deviation.",
          "Mode: Value with highest frequency in modal class $l + (\\frac{f_1-f_0}{2f_1-f_0-f_2})h$.",
          "Median: Middle value calculated from cumulative frequency table using $n/2$ locator."
        ]
      },
      {
        "heading": "Empirical Relationship & Ogives",
        "bullets": [
          "Empirical Formula: $\\text{Mode} = 3\\text{Median} - 2\\text{Mean}$.",
          "Cumulative Frequency Ogives (Less than / More than) intersect at median point.",
          "Selection of method: Step-deviation simplifies computation when class width $h$ is uniform."
        ]
      }
    ],
    "examTraps": [
      "Using cumulative frequency $cf$ of the MEDIAN class instead of PRECEDING class in median formula.",
      "Misidentifying $f_0$ (preceding) and $f_2$ (succeeding) modal frequencies."
    ],
    "quickMentalCheck": "If Mean = 20 and Median = 22, what is Mode? (Mode = $3(22) - 2(20) = 66 - 40 = 26$).",
    "cueQuestions": [
      "How does step-deviation method minimize arithmetic error in calculating mean of grouped data?",
      "What is the empirical relation connecting mean, median, and mode for moderately skewed data?",
      "How do you locate the median graphically using cumulative frequency curves (ogives)?"
    ],
    "workedExample": {
      "problem": "A data distribution has modal class $10-15$ with $l=10, f_1=7, f_0=3, f_2=2, h=5$. Calculate Mode.",
      "steps": [
        "Apply mode formula: $\\text{Mode} = l + \\left(\\frac{f_1 - f_0}{2f_1 - f_0 - f_2}\\right)h$.",
        "Substitute: $\\text{Mode} = 10 + \\left(\\frac{7 - 3}{2(7) - 3 - 2}\\right)5 = 10 + \\left(\\frac{4}{14 - 5}\\right)5$.",
        "Calculate: $10 + \\frac{20}{9} = 10 + 2.22 = 12.22$."
      ],
      "result": "\\text{Mode} = 12.22"
    },
    "verificationProblem": "Verify that mode lies within modal class interval [10, 15]. $12.22 \\in [10, 15]$.",
    "realWorldUse": "Applied in public health epidemiologic statistics, macroeconomic inflation index calculations, quality control tolerance tracking, and census surveys.",
    "diagramType": "statistics-histogram-ogive"
  },
  "CBSE-CH-G10-MATH-CH14": {
    "chapterTitle": "Probability",
    "subject": "Mathematics",
    "grade": 10,
    "chapterNum": 14,
    "essentialLaw": "P(E) = \\frac{\\text{Number of outcomes favorable to } E}{\\text{Total number of possible outcomes } n(S)} \\quad | \\quad 0 \\le P(E) \\le 1 \\quad | \\quad P(E) + P(\\bar{E}) = 1",
    "coreConcepts": [
      {
        "heading": "Classical Theoretical Probability & Outcomes",
        "bullets": [
          "Theoretical (classical) probability assumes equally likely outcomes: $P(E) = \\frac{n(E)}{n(S)}$.",
          "Elementary event is an event having only one outcome; the sum of probabilities of all elementary events of an experiment is $1$.",
          "Sure (Certain) event has probability $1$; Impossible event has probability $0$; for any event $E$, $0 \\le P(E) \\le 1$."
        ]
      },
      {
        "heading": "Complementary Events & Standard Experiments",
        "bullets": [
          "Complementary event: $P(\\text{not } E) = P(\\bar{E}) = 1 - P(E)$.",
          "Coin tossing: 1 coin ($S = \\{H,T\\}, n=2$), 2 coins ($n=4$), 3 coins ($n=8$).",
          "Playing cards (52 total): 26 Red (13 Hearts, 13 Diamonds) and 26 Black (13 Spades, 13 Clubs); 12 Face cards (4 Kings, 4 Queens, 4 Jacks) and 4 Aces; Rolling 2 dice ($n(S) = 36$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming Aces are face cards; standard deck has 12 face cards (Kings, Queens, Jacks), while Aces are numbered cards (rank 1).",
      "Confusing \"at least one\" with \"at most one\" in coin toss problems."
    ],
    "quickMentalCheck": "If the probability of winning a game is $0.07$, what is the probability of losing it? (Answer: $P(\\text{lose}) = 1 - 0.07 = 0.93$).",
    "cueQuestions": [
      "Why is the experimental empirical probability different from theoretical classical probability for small sample sizes?",
      "Why can the probability of any event never be less than 0 or greater than 1?",
      "What is the probability of drawing a face card or a red card from a standard deck of 52 playing cards?"
    ],
    "workedExample": {
      "problem": "One card is drawn from a well-shuffled deck of 52 cards. Calculate the probability that the card will be: (i) an ace, (ii) not an ace.",
      "steps": [
        "Total possible outcomes: $n(S) = 52$.",
        "Part (i): There are 4 aces in a deck (one of each suit: Spade, Club, Heart, Diamond) $\\implies n(E) = 4$.",
        "Calculate $P(\\text{Ace}) = \\frac{4}{52} = \\frac{1}{13}$.",
        "Part (ii): Event \"not an ace\" is the complement $\\bar{E}$.",
        "Calculate $P(\\text{Not an Ace}) = 1 - P(\\text{Ace}) = 1 - \\frac{1}{13} = \\frac{12}{13}$."
      ],
      "result": "P(\\text{Ace}) = \\frac{1}{13}, \\quad P(\\text{Not Ace}) = \\frac{12}{13}"
    },
    "verificationProblem": "Check: $P(\\text{Ace}) + P(\\text{Not Ace}) = \\frac{1}{13} + \\frac{12}{13} = 1$. Matches.",
    "realWorldUse": "Used in quality control random batch testing in manufacturing, meteorology rain prediction, financial risk analysis, and game theory.",
    "diagramType": "probability-tree-cards-outcomes"
  },
  "CBSE-CH-G10-ENG-CH01": {
    "chapterTitle": "A Letter to God",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 1,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "A Letter to God: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in A Letter to God?",
    "cueQuestions": [
      "What is the central conflict in A Letter to God, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"A Letter to God\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-ENG-CH02": {
    "chapterTitle": "Nelson Mandela: Long Walk to Freedom",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 2,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Nelson Mandela: Long Walk to Freedom: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Nelson Mandela: Long Walk to Freedom?",
    "cueQuestions": [
      "What is the central conflict in Nelson Mandela: Long Walk to Freedom, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Nelson Mandela: Long Walk to Freedom\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-ENG-CH03": {
    "chapterTitle": "Two Stories about Flying",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 3,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Two Stories about Flying: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Two Stories about Flying?",
    "cueQuestions": [
      "What is the central conflict in Two Stories about Flying, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Two Stories about Flying\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-ENG-CH04": {
    "chapterTitle": "From the Diary of Anne Frank",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 4,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "From the Diary of Anne Frank: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in From the Diary of Anne Frank?",
    "cueQuestions": [
      "What is the central conflict in From the Diary of Anne Frank, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"From the Diary of Anne Frank\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-ENG-CH05": {
    "chapterTitle": "Glimpses of India",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 5,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Glimpses of India: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Glimpses of India?",
    "cueQuestions": [
      "What is the central conflict in Glimpses of India, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Glimpses of India\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-ENG-CH06": {
    "chapterTitle": "Mijbil the Otter",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 6,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Mijbil the Otter: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Mijbil the Otter?",
    "cueQuestions": [
      "What is the central conflict in Mijbil the Otter, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Mijbil the Otter\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-ENG-CH07": {
    "chapterTitle": "Madam Rides the Bus",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 7,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "Madam Rides the Bus: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in Madam Rides the Bus?",
    "cueQuestions": [
      "What is the central conflict in Madam Rides the Bus, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"Madam Rides the Bus\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-ENG-CH08": {
    "chapterTitle": "The Sermon at Benares",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 8,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "The Sermon at Benares: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in The Sermon at Benares?",
    "cueQuestions": [
      "What is the central conflict in The Sermon at Benares, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"The Sermon at Benares\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-ENG-CH09": {
    "chapterTitle": "The Proposal",
    "subject": "English Language & Literature",
    "grade": 10,
    "chapterNum": 9,
    "essentialLaw": "\\text{Literary Analysis: Character Arc } + \\text{Thematic Conflict } \\implies \\text{Universal Human Insight}",
    "coreConcepts": [
      {
        "heading": "The Proposal: Plot Architecture & Narrative Core",
        "bullets": [
          "Exposition, central conflict, rising action, climax, and thematic resolution in NCERT Class 10.",
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
    "quickMentalCheck": "What central moral dilemma or transformation does the protagonist experience in The Proposal?",
    "cueQuestions": [
      "What is the central conflict in The Proposal, and how is it resolved?",
      "How does the author use literary devices to reinforce the underlying theme?",
      "What message does the text communicate about human nature or societal structures?"
    ],
    "workedExample": {
      "problem": "Analyze the author's primary theme in \"The Proposal\" with direct reference to key narrative turning points.",
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
  "CBSE-CH-G10-HIN-CH01": {
    "chapterTitle": "Netaji Ka Chashma",
    "subject": "HINDI",
    "grade": 10,
    "chapterNum": 1,
    "essentialLaw": "\\text{कहानी (स्वयं प्रकाश)}: \\text{नेताजी का चश्मा : देशभक्ति किसी वर्दी या पद में नहीं, बल्कि मन की निष्ठा और कर्म में होती है}",
    "coreConcepts": [
      {
        "heading": "कथानक, कैप्टन चश्मेवाला एवं हालदार साहब",
        "bullets": [
          "कस्बे के चौराहे पर मूर्तिकार मास्टर मोतीलाल द्वारा बिना चश्मे के बनाई गई नेताजी सुभाषचंद्र बोस की संगमरमर की मूर्ति। गरीब, लंगड़ा 'कैप्टन' अपने फ्रेमों में से एक फ्रेम नेताजी की मूर्ति पर लगाता रहता है। हालदार साहब की देशभक्तों के प्रति श्रद्धा।"
        ]
      },
      {
        "heading": "देशभक्ति की वास्तविक परिभाषा एवं भावी पीढ़ी",
        "bullets": [
          "कैप्टन की मृत्यु के बाद चौराहे पर सरकंडे का छोटा चश्मा बच्चों द्वारा लगाया जाना यह सिद्ध करता है कि देश के निर्माण और देशभक्ति में देश का हर नागरिक, यहाँ तक कि बच्चे भी सहभागी हैं।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: कैप्टन को सेना का भूतपूर्व सैनिक समझ लेना। (Remedy: कैप्टन कोई फौजी नहीं था, बल्कि एक बूढ़ा, लंगड़ा फेरीवाला था जिसे नेताजी की बिना चश्मे वाली मूर्ति आहत करती थी।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Netaji Ka Chashma.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Netaji Ka Chashma?",
      "Explain the primary mechanisms, formulas, and structural relationships in Netaji Ka Chashma.",
      "How are concepts in Netaji Ka Chashma applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Netaji Ka Chashma to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Netaji Ka Chashma.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Netaji Ka Chashma."
    },
    "verificationProblem": "Verify all core principles and calculations for Netaji Ka Chashma.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G10-HIN-CH02": {
    "chapterTitle": "Balgobin Bhagat",
    "subject": "HINDI",
    "grade": 10,
    "chapterNum": 2,
    "essentialLaw": "\\text{रेखाचित्र (रामवृक्ष बेनीपुरी)}: \\text{बालगोबिन भगत : गृहस्थ जीवन में संन्यास का आदर्श एवं रूढ़ि-विरोधी आचरण}",
    "coreConcepts": [
      {
        "heading": "बालगोबिन भगत का व्यक्तित्व एवं कबीर-भक्ति",
        "bullets": [
          "मझोले कद के गोरे-चिट्टे, कबीरपंथी साधु जो गृहस्थ होते हुए भी पूर्ण संन्यासी थे। कबीर के पदों का मधुर गायन, आषाढ़ की रिमझिम में धान की रोपनी करते हुए गीत गाना, और कार्तिक में प्रभात-फेरियां।"
        ]
      },
      {
        "heading": "सामाजिक कुरीतियों पर प्रहार एवं अगाध वैराग्य",
        "bullets": [
          "इकलौते पुत्र की मृत्यु पर शोक मनाने के बजाय आत्मा का परमात्मा से मिलन मानकर उत्सव मनाना। पतोहू (पुत्रवधू) से ही मुखाग्नि दिलवाना और उसके पुनर्विवाह का क्रांतिकारी आदेश देना।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: बालगोबिन भगत को बाहरी वेशभूषा के कारण साधारण साधु समझ लेना। (Remedy: भगत जी का संन्यास बाह्य आडंबर या वस्त्रों पर नहीं, बल्कि उनके विशुद्ध आचरण, सत्यनिष्ठा और कबीर के आदर्शों पर आधारित था।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Balgobin Bhagat.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Balgobin Bhagat?",
      "Explain the primary mechanisms, formulas, and structural relationships in Balgobin Bhagat.",
      "How are concepts in Balgobin Bhagat applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Balgobin Bhagat to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Balgobin Bhagat.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Balgobin Bhagat."
    },
    "verificationProblem": "Verify all core principles and calculations for Balgobin Bhagat.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G10-HIN-CH03": {
    "chapterTitle": "Lakhnavi Andaz",
    "subject": "HINDI",
    "grade": 10,
    "chapterNum": 3,
    "essentialLaw": "\\text{व्यंग्य (यशपाल)}: \\text{लखनवी अंदाज़ : पतनशील सामंती वर्ग का बनावटी जीवन और 'नई कहानी' पर कटाक्ष}",
    "coreConcepts": [
      {
        "heading": "नवाब साहब का कल्पित नवाबी रौब एवं खीरा प्रसंग",
        "bullets": [
          "ट्रेन की सेकेंड क्लास बोगी में नवाब साहब द्वारा लेखक के सामने खीरे को सलीके से काटना, जीरा-नमक छिड़कना, और फिर केवल सूंघकर खिड़की से बाहर फेंक देना (तृप्ति की डकार लेना)।"
        ]
      },
      {
        "heading": "साहित्यिक संदर्भ: बिना कथ्य और पात्र की कहानी",
        "bullets": [
          "लेखक ने नवाब साहब के इस व्यवहार से यह निष्कर्ष निकाला कि जैसे बिना खाए केवल सूंघने से पेट नहीं भर सकता, वैसे ही बिना किसी विचार, घटना और पात्रों के 'नई कहानी' नहीं लिखी जा सकती।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: कहानी को केवल एक हास्य प्रसंग समझना। (Remedy: यह पतनशील सामंती वर्ग की झूठी शान, दिखावे की प्रवृत्ति और समकालीन अमूर्त साहित्य पर तीखा व्यंग्य है।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Lakhnavi Andaz.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Lakhnavi Andaz?",
      "Explain the primary mechanisms, formulas, and structural relationships in Lakhnavi Andaz.",
      "How are concepts in Lakhnavi Andaz applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Lakhnavi Andaz to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Lakhnavi Andaz.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Lakhnavi Andaz."
    },
    "verificationProblem": "Verify all core principles and calculations for Lakhnavi Andaz.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G10-HIN-CH04": {
    "chapterTitle": "Ek Kahani Yeh Bhi",
    "subject": "HINDI",
    "grade": 10,
    "chapterNum": 4,
    "essentialLaw": "\\text{आत्मकथ्य (मन्नू भंडारी)}: \\text{एक कहानी यह भी : लेखिका के व्यक्तित्व-निर्माण में पिता एवं प्राध्यापिका शीला अग्रवाल की भूमिका}",
    "coreConcepts": [
      {
        "heading": "पारिवारिक परिवेश एवं पिता का अंतर्विरोध",
        "bullets": [
          "अजमेर में पिता का गिरता आर्थिक स्तर, उनका शक्की व क्रोधी स्वभाव, और लेखिका के भीतर हीन-भावना (काली व दुबली होने के कारण)। पिता द्वारा घर की बैठकों में राजनीतिक चर्चाओं में बैठाना, जिससे देश की परिस्थितियों की समझ विकसित हुई।"
        ]
      },
      {
        "heading": "शीला अग्रवाल का प्रभाव एवं 1942-47 का स्वतंत्रता आंदोलन",
        "bullets": [
          "कॉलेज की हिंदी प्राध्यापिका शीला अग्रवाल ने लेखिका के साहित्यिक क्षितिज को विस्तार दिया और उन्हें स्वतंत्रता संग्राम के जलसों, हड़तालों और जोशीले भाषणों में सक्रिय नेतृत्व के लिए प्रेरित किया।"
        ]
      }
    ],
    "examTraps": [
      "Common Pitfall: पिता और मन्नू भंडारी के संबंधों को एकतरफा नकारात्मक मान लेना। (Remedy: पिता के विचारों से वैचारिक टकराव के बावजूद लेखिका के विद्रोही स्वभाव और देश-चेतना की नींव उनके पिता के ही वातावरण से पड़ी थी।)"
    ],
    "quickMentalCheck": "Verify fundamental principles and equations for Ek Kahani Yeh Bhi.",
    "cueQuestions": [
      "What are the foundational laws and definitions governing Ek Kahani Yeh Bhi?",
      "Explain the primary mechanisms, formulas, and structural relationships in Ek Kahani Yeh Bhi.",
      "How are concepts in Ek Kahani Yeh Bhi applied to solve standard board examination problems?"
    ],
    "workedExample": {
      "problem": "Apply the fundamental theorems and definitions of Ek Kahani Yeh Bhi to solve a representative curriculum problem.",
      "steps": [
        "Step 1: Identify given parameters and fundamental governing principles of Ek Kahani Yeh Bhi.",
        "Step 2: Apply the standard NCERT formula or conceptual framework systematically.",
        "Step 3: State the final conclusion with appropriate units and justification."
      ],
      "result": "Verifiable standard solution adhering to NCERT marking rubrics for Ek Kahani Yeh Bhi."
    },
    "verificationProblem": "Verify all core principles and calculations for Ek Kahani Yeh Bhi.",
    "realWorldUse": "Applied across higher academic studies, competitive examinations, and practical industry domains.",
    "diagramType": "diagram_concept_map"
  },
  "CBSE-CH-G10-SCI-CH01": {
    "chapterTitle": "Chemical Reactions and Equations",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 1,
    "essentialLaw": "\\text{Law of Conservation of Mass: } \\sum m_{\\text{reactants}} = \\sum m_{\\text{products}} \\quad | \\quad \\text{Redox: } \\text{CuO} + \\text{H}_2 \\xrightarrow{\\Delta} \\text{Cu} + \\text{H}_2\\text{O}",
    "coreConcepts": [
      {
        "heading": "Chemical Equations, Balancing & Types of Reactions",
        "bullets": [
          "Chemical Equation: Word equation to balanced symbolic equation adhering to Law of Conservation of Mass (equal number of each atom on both sides).",
          "Combination Reaction: Two or more reactants combine to form single product ($CaO + H_2O \\to Ca(OH)_2 + \\text{Heat}$, slaking of lime).",
          "Decomposition Reaction: Single compound breaks into simpler products; Thermal ($2FeSO_4 \\xrightarrow{\\Delta} Fe_2O_3 + SO_2 + SO_3$; $2Pb(NO_3)_2 \\xrightarrow{\\Delta} 2PbO + 4NO_2 \\uparrow + O_2 \\uparrow$), Electrolytic ($2H_2O \\xrightarrow{\\text{current}} 2H_2 + O_2$), Photolytic ($2AgCl \\xrightarrow{\\text{sunlight}} 2Ag + Cl_2$, black & white photography).",
          "Displacement & Double Displacement: More reactive metal displaces less reactive metal ($Fe + CuSO_4 \\to FeSO_4 + Cu$); Precipitation reaction ($Na_2SO_4 + BaCl_2 \\to BaSO_4 \\downarrow (\\text{white}) + 2NaCl$)."
        ]
      },
      {
        "heading": "Oxidation, Reduction, Corrosion & Rancidity",
        "bullets": [
          "Oxidation (Gain of Oxygen / Loss of Hydrogen); Reduction (Loss of Oxygen / Gain of Hydrogen); Redox reaction ($CuO + H_2 \\to Cu + H_2O$: $CuO$ is reduced, $H_2$ is oxidized; $H_2$ is reducing agent, $CuO$ is oxidizing agent).",
          "Corrosion: Slow degradation of metals by atmospheric moisture and gases; Rusting of iron ($Fe_2O_3 \\cdot xH_2O$, reddish-brown flaky coating); Prevention: Galvanization (coating with zinc), painting, greasing, alloying (Stainless Steel).",
          "Rancidity: Aerial oxidation of fats and oils producing unpleasant smell and taste; Prevention: Adding antioxidants (BHA, BHT), vacuum packaging, flushing bags with inert Nitrogen gas."
        ]
      }
    ],
    "examTraps": [
      "Confusing Quicklime ($CaO$), Slaked lime ($Ca(OH)_2$), and Limestone ($CaCO_3$).",
      "Failing to specify physical state symbols ($(s), (l), (g), (aq)$) when requested in board equations."
    ],
    "quickMentalCheck": "In the electrolysis of water, why is the volume of gas collected at the cathode double that at the anode? Water is $H_2O$, so water dissociation yields 2 volumes of Hydrogen at cathode ($-$) for every 1 volume of Oxygen at anode ($+$).",
    "cueQuestions": [
      "Why is respiration classified as an exothermic chemical reaction?",
      "How does painting or galvanization with zinc permanently prevent the electrochemical rusting of iron?",
      "What visible color changes occur when green ferrous sulfate crystals are heated strongly in a dry boiling tube?"
    ],
    "workedExample": {
      "problem": "Balance the chemical equation: $\\text{Fe}(s) + \\text{H}_2\\text{O}(g) \\to \\text{Fe}_3\\text{O}_4(s) + \\text{H}_2(g)$, and identify the oxidizing and reducing agents.",
      "steps": [
        "Step 1: Balance Fe atoms: $3\\text{Fe} + \\text{H}_2\\text{O} \\to \\text{Fe}_3\\text{O}_4 + \\text{H}_2$.",
        "Step 2: Balance O atoms (4 on RHS): $3\\text{Fe} + 4\\text{H}_2\\text{O} \\to \\text{Fe}_3\\text{O}_4 + \\text{H}_2$.",
        "Step 3: Balance H atoms (8 on LHS): $3\\text{Fe}(s) + 4\\text{H}_2\\text{O}(g) \\to \\text{Fe}_3\\text{O}_4(s) + 4\\text{H}_2(g)$.",
        "Step 4: Identification: $\\text{Fe}$ gains oxygen $\\implies$ oxidized (reducing agent); $\\text{H}_2\\text{O}$ loses oxygen $\\implies$ reduced (oxidizing agent)."
      ],
      "result": "3\\text{Fe}(s) + 4\\text{H}_2\\text{O}(g) \\to \\text{Fe}_3\\text{O}_4(s) + 4\\text{H}_2(g); \\quad \\text{Oxidizing Agent: } \\text{H}_2\\text{O}, \\; \\text{Reducing Agent: } \\text{Fe}"
    },
    "verificationProblem": "Check atom count: LHS $= 3\\text{ Fe}, 8\\text{ H}, 4\\text{ O}$; RHS $= 3\\text{ Fe}, 8\\text{ H}, 4\\text{ O}$. Law of conservation of mass satisfied.",
    "realWorldUse": "Galvanized iron roofing sheets, chip packaging flushed with nitrogen to prevent lipid rancidity, chemical cold packs and self-heating meal pouches.",
    "diagramType": "electrolysis-of-water-setup"
  },
  "CBSE-CH-G10-SCI-CH02": {
    "chapterTitle": "Acids, Bases and Salts",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 2,
    "essentialLaw": "\\text{Neutralization: } \\text{Acid} + \\text{Base} \\to \\text{Salt} + \\text{Water} \\quad | \\quad \\text{pH} = -\\log_{10}[\\text{H}^+] \\quad | \\quad \\text{Plaster of Paris: } \\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O}",
    "coreConcepts": [
      {
        "heading": "Properties of Acids & Bases, Indicators & pH Scale",
        "bullets": [
          "Acids: Sour taste, turn blue litmus red, release $H^+(aq) / H_3O^+$ in water; React with metals to release $H_2$ gas ($Zn + 2HCl \\to ZnCl_2 + H_2 \\uparrow$, pop sound); React with carbonates/bicarbonates to release $CO_2$ ($CaCO_3 + 2HCl \\to CaCl_2 + H_2O + CO_2 \\uparrow$, turns lime water milky).",
          "Bases: Bitter taste, soapy touch, turn red litmus blue, release $OH^-(aq)$ in water; Alkalis are water-soluble bases ($NaOH, KOH$).",
          "Indicators: Natural (Litmus, Turmeric turns red in base), Synthetic (Phenolphthalein colorless in acid/pink in base, Methyl orange red in acid/yellow in base), Olfactory (Vanilla, Clove, Onion retain smell in acid/lose smell in base).",
          "pH Scale ($0-14$): Acidic ($pH < 7$), Neutral ($pH = 7$), Basic ($pH > 7$); Daily life importance: Human body $7.0-7.8$, Acid rain $pH < 5.6$, Tooth decay starts when mouth $pH < 5.5$, Antacids like $Mg(OH)_2$ milk of magnesia relieve stomach acidity."
        ]
      },
      {
        "heading": "Salts of Common Use (Chlor-Alkali, Bleaching Powder, Baking/Washing Soda, POP)",
        "bullets": [
          "Chlor-Alkali Process: Electrolysis of brine ($NaCl$ solution): $2NaCl + 2H_2O \\to 2NaOH + Cl_2(\\text{anode}) + H_2(\\text{cathode})$.",
          "Bleaching Powder: Dry slaked lime with chlorine: $Ca(OH)_2 + Cl_2 \\to CaOCl_2 + H_2O$ (Disinfectant, bleaching cotton).",
          "Baking Soda (Sodium Hydrogen Carbonate, $NaHCO_3$): Solvay process: $NaCl + H_2O + CO_2 + NH_3 \\to NH_4Cl + NaHCO_3$; Mild non-corrosive base; On heating: $2NaHCO_3 \\xrightarrow{\\Delta} Na_2CO_3 + H_2O + CO_2 \\uparrow$; Baking powder ($NaHCO_3 +$ tartaric acid to prevent bitterness).",
          "Washing Soda: $Na_2CO_3 \\cdot 10H_2O$ (Recrystallization of sodium carbonate, removes permanent water hardness).",
          "Plaster of Paris (POP): Heating gypsum at $373\\text{ K}$: $CaSO_4 \\cdot 2H_2O \\xrightarrow{373\\text{ K}} CaSO_4 \\cdot \\frac{1}{2}H_2O + 1\\frac{1}{2}H_2O$; Sets to hard gypsum when mixed with water."
        ]
      }
    ],
    "examTraps": [
      "Heating gypsum above $373\\text{ K}$ ($100^circ\\text{C}$): Overheating produces anhydrous calcium sulfate (dead burnt plaster), which loses all setting properties.",
      "Pouring water directly into concentrated sulfuric acid (extremely exothermic steam explosion; acid MUST always be added slowly to water with constant stirring)."
    ],
    "quickMentalCheck": "Why does dry HCl gas not change the color of dry blue litmus paper? Acids show acidic behavior only in the presence of water where they dissociate to release $H^+(aq) / H_3O^+$ hydronium ions.",
    "cueQuestions": [
      "How does the Chlor-Alkali process industrially produce sodium hydroxide, chlorine, and hydrogen gas from brine?",
      "Why is tartaric acid mixed with baking soda ($NaHCO_3$) to make commercial baking powder for cakes?",
      "How does water of crystallization determine the crystalline structure of blue vitriol ($CuSO_4 \\cdot 5H_2O$) and gypsum?"
    ],
    "workedExample": {
      "problem": "A chemical compound [X] is used in the building industry for plastering fractured bones and making statues. When exposed to moisture, it sets into a hard solid mass [Y]. Identify [X] and [Y] and write the balanced chemical equation.",
      "steps": [
        "Compound [X] used for plastering fractured bones is Plaster of Paris (Calcium sulfate hemihydrate, $\\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O}$).",
        "When mixed with water, it sets into a hard crystalline solid [Y], Gypsum ($\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O}$).",
        "Balanced chemical equation: $\\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O} + 1\\frac{1}{2}\\text{H}_2\\text{O} \\to \\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O}$."
      ],
      "result": "[X] = \\text{Plaster of Paris } (\\text{CaSO}_4 \\cdot \\frac{1}{2}\\text{H}_2\\text{O}), \\quad [Y] = \\text{Gypsum } (\\text{CaSO}_4 \\cdot 2\\text{H}_2\\text{O})"
    },
    "verificationProblem": "Check hydration ratio: Half molecule water of crystallization per $\\text{CaSO}_4$ unites with 1.5 water molecules to form dihydrate gypsum. Reaction stoichiometry verified.",
    "realWorldUse": "Antacid tablets for gastric heartburn relief, orthopaedic plaster casts for bone fracture immobilization, water softening using washing soda.",
    "diagramType": "chlor-alkali-membrane-cell-electrolysis"
  },
  "CBSE-CH-G10-SCI-CH03": {
    "chapterTitle": "Metals and Non-metals",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 3,
    "essentialLaw": "\\text{Reactivity Series: } \\text{K} > \\text{Na} > \\text{Ca} > \\text{Mg} > \\text{Al} > \\text{Zn} > \\text{Fe} > \\text{Pb} > [\\text{H}] > \\text{Cu} > \\text{Hg} > \\text{Ag} > \\text{Au} \\quad | \\quad \\text{Thermite: } \\text{Fe}_2\\text{O}_3 + 2\\text{Al} \\to 2\\text{Fe}(l) + \\text{Al}_2\\text{O}_3",
    "coreConcepts": [
      {
        "heading": "Physical & Chemical Properties of Metals & Reactivity Series",
        "bullets": [
          "Physical Properties: Metals (malleable, ductile, sonorous, lustrous, high electrical/thermal conductivity; exceptions: Mercury is liquid, Sodium/Potassium soft cut by knife); Non-metals (brittle, non-sonorous; exceptions: Diamond hardest substance, Graphite conducts electricity, Iodine lustrous, Bromine liquid).",
          "Reactivity with Oxygen: Basic metal oxides; Amphoteric oxides react with both acids and bases ($Al_2O_3 + 6HCl \\to 2AlCl_3 + 3H_2O$; $Al_2O_3 + 2NaOH \\to 2NaAlO_2 + H_2O$, Sodium Aluminate); Sodium and potassium stored in kerosene to prevent vigorous combustion.",
          "Reactivity with Water: $K, Na$ react violently with cold water releasing $H_2$; $Mg$ reacts with hot water; $Al, Fe, Zn$ react only with steam; $Cu, Ag, Au$ do not react with water.",
          "Reactivity with Acids: Metals above hydrogen displace $H_2$; Nitric acid ($HNO_3$) is a strong oxidizing agent oxidizing $H_2$ to $H_2O$ (except $Mg$ and $Mn$ which produce $H_2$ with very dilute $HNO_3$); Aqua Regia ($3\\text{ HCl} : 1\\text{ HNO}_3$ dissolves gold)."
        ]
      },
      {
        "heading": "Ionic Compounds, Metallurgy & Refining of Metals",
        "bullets": [
          "Ionic Bonds: Electron transfer from metal to non-metal ($Na^+ + Cl^- \\to NaCl$, $Mg^{2+} + 2Cl^- \\to MgCl_2$); Properties: High melting/boiling points due to strong electrostatic attraction, soluble in water/insoluble in organic solvents, conduct electricity in molten/aqueous state but not solid.",
          "Metallurgy Steps: 1. Concentration of ore (hydraulic washing, magnetic separation, froth floatation for sulfides); 2. Conversion to Oxide: Roasting (heating sulfide ore in excess air: $2ZnS + 3O_2 \\to 2ZnO + 2SO_2$) vs Calcination (heating carbonate ore in limited air: $ZnCO_3 \\to ZnO + CO_2$); 3. Reduction: Carbon reduction ($ZnO + C \\to Zn + CO$) or Thermite process ($Fe_2O_3 + 2Al \\to 2Fe(l) + Al_2O_3 + \\text{Heat}$, welded railway tracks); 4. Electrolytic Refining: Impure metal anode, pure strip cathode, metal salt electrolyte (e.g., Copper refining: pure Cu deposits at cathode, anode mud contains precious metals Ag, Au)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Roasting (used for SULFIDE ores in excess air) with Calcination (used for CARBONATE ores in limited air).",
      "Thinking ionic compounds conduct electricity in solid state (ions are locked in fixed crystalline lattice positions in solid state; they conduct ONLY in molten or aqueous states)."
    ],
    "quickMentalCheck": "Why do aluminum oxide ($Al_2O_3$) and zinc oxide ($ZnO$) react with both hydrochloric acid and sodium hydroxide? They are amphoteric oxides exhibiting both basic and acidic properties.",
    "cueQuestions": [
      "Why is electrolytic reduction used to extract highly reactive metals like Sodium and Aluminium instead of carbon reduction?",
      "How does the thermite reaction utilize the high affinity of aluminium for oxygen to weld cracked railway lines in situ?",
      "What are the structural reasons behind the high melting points and brittleness of crystalline ionic compounds?"
    ],
    "workedExample": {
      "problem": "Write balanced chemical equations for: (a) Roasting of Zinc blende ($ZnS$), (b) Calcination of Calamine ($ZnCO_3$), and (c) Reduction of Zinc oxide with carbon.",
      "steps": [
        "(a) Roasting of Zinc blende: Sulfide ore is heated strongly in presence of excess air: $2\\text{ZnS}(s) + 3\\text{O}_2(g) \\xrightarrow{\\Delta} 2\\text{ZnO}(s) + 2\\text{SO}_2(g)$.",
        "(b) Calcination of Calamine: Carbonate ore is heated in absence / limited supply of air: $\\text{ZnCO}_3(s) \\xrightarrow{\\Delta} \\text{ZnO}(s) + \\text{CO}_2(g)$.",
        "(c) Reduction of Zinc oxide: Zinc oxide is reduced by coke at high temperature: $\\text{ZnO}(s) + \\text{C}(s) \\xrightarrow{\\Delta} \\text{Zn}(s) + \\text{CO}(g)$."
      ],
      "result": "(a) 2\\text{ZnS} + 3\\text{O}_2 \\to 2\\text{ZnO} + 2\\text{SO}_2; \\; (b) \\text{ZnCO}_3 \\to \\text{ZnO} + \\text{CO}_2; \\; (c) \\text{ZnO} + \\text{C} \\to \\text{Zn} + \\text{CO}"
    },
    "verificationProblem": "Check carbon reduction feasibility: Carbon is more reactive than Zinc in the Ellingham diagram above $1100^circ\\text{C}$, reducing $\\text{ZnO}$ to metallic zinc vapor. Verified.",
    "realWorldUse": "Electrolytic copper refining for high-conductivity electrical grid wiring, Thermite welding of heavy railway track joints, galvanization of steel pipes.",
    "diagramType": "electrolytic-refining-copper-tank"
  },
  "CBSE-CH-G10-SCI-CH04": {
    "chapterTitle": "Carbon and its Compounds",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 4,
    "essentialLaw": "\\text{Esterification: } \\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O} \\quad | \\quad \\text{Saponification: Ester} + \\text{NaOH} \\to \\text{Soap} + \\text{Glycerol}",
    "coreConcepts": [
      {
        "heading": "Versatile Nature of Carbon, Covalent Bonding & Allotropes",
        "bullets": [
          "Tetravalency & Catenation: Carbon has atomic number 6 ($2,4$); Forms 4 covalent bonds by sharing electrons; Unique ability to form long carbon chains, branched chains, and closed rings (Catenation due to small atomic size and strong $C-C$ bond energy $347\\text{ kJ/mol}$).",
          "Allotropes of Carbon: Diamond (3D rigid tetrahedral giant lattice, $sp^3$, hardest substance, insulator), Graphite (2D hexagonal planar layers held by weak Van der Waals forces, $sp^2$ with delocalized $\\pi$-electrons $\\implies$ good electrical conductor and solid lubricant), Fullerenes ($C_{60}$ Buckminsterfullerene, football soccer ball shape of 20 hexagons and 12 pentagons).",
          "Homologous Series: Family of organic compounds with same functional group, general formula, similar chemical properties, differing by $-\\text{CH}_2-$ unit ($14\\text{ u}$ mass difference); Alkanes ($C_n H_{2n+2}$), Alkenes ($C_n H_{2n}$), Alkynes ($C_n H_{2n-2}$)."
        ]
      },
      {
        "heading": "Functional Groups, Important Organic Reactions & Soaps/Detergents",
        "bullets": [
          "Functional Groups: Alcohol ($-OH$), Aldehyde ($-CHO$), Ketone ($>C=O$), Carboxylic acid ($-COOH$), Halogens ($-Cl, -Br$).",
          "Chemical Properties: 1. Combustion (exothermic, clean blue flame for saturated, yellow sooty flame for unsaturated); 2. Oxidation ($C_2H_5OH \\xrightarrow{\\text{alk. KMnO}_4 / \\Delta} CH_3COOH$); 3. Addition Reaction (Hydrogenation of vegetable oils to vanaspati ghee using Ni catalyst: $R_2C=CR_2 + H_2 \\xrightarrow{Ni} R_2CH-CHR_2$); 4. Substitution (Methane chlorination in sunlight: $CH_4 + Cl_2 \\xrightarrow{h\\nu} CH_3Cl + HCl$).",
          "Ethanol & Ethanoic Acid: Ethanol (dehydration with conc. $H_2SO_4$ at $443\\text{ K} \\to CH_2=CH_2 + H_2O$); Ethanoic acid (Vinegar is $5-8\\%$ solution; Esterification with ethanol $\\to$ sweet-smelling ethyl ethanoate); Saponification (alkaline ester hydrolysis yielding soap).",
          "Cleansing Action of Soap: Sodium/potassium salts of long-chain fatty acids ($C_{17}H_{35}COO^- Na^+$); Hydrophilic ionic head faces outward in water, Hydrophobic hydrocarbon tail traps oily dirt in center forming Micelles; Scum formation in hard water containing $Ca^{2+}/Mg^{2+}$ ions; Synthetic detergents (sulfonates) work in both soft and hard water."
        ]
      }
    ],
    "examTraps": [
      "Assuming soaps work effectively in hard water (soaps precipitate as insoluble curdy scum with $Ca^{2+}$ and $Mg^{2+}$ ions; synthetic detergents must be used for hard water).",
      "Confusing the catalyst/temperature for ethanol dehydration ($170^circ\\text{C} = 443\\text{ K}$ with conc. $H_2SO_4$ gives ethene; lower temperature $413\\text{ K}$ gives diethyl ether)."
    ],
    "quickMentalCheck": "Why does carbon form covalent bonds rather than $C^{4+}$ cations or $C^{4-}$ anions? Forming $C^{4-}$ requires nucleus of 6 protons to hold 10 electrons (unstable), while forming $C^{4+}$ requires immense ionization energy to remove 4 electrons.",
    "cueQuestions": [
      "What two unique properties of carbon (catenation and tetravalency) lead to the formation of millions of organic compounds?",
      "How does the micelle mechanism explain the emulsification and removal of grease and dirt by soap in water?",
      "How do you chemically distinguish between ethanol and ethanoic acid using sodium bicarbonate ($NaHCO_3$)?"
    ],
    "workedExample": {
      "problem": "Explain the chemical reaction of Ethanoic acid with: (a) Sodium metal, (b) Sodium bicarbonate, and (c) Absolute ethanol in the presence of concentrated sulfuric acid.",
      "steps": [
        "(a) Reaction with Sodium metal: Forms sodium ethanoate and releases effervescence of flammable hydrogen gas: $2\\text{CH}_3\\text{COOH} + 2\\text{Na} \\to 2\\text{CH}_3\\text{COONa} + \\text{H}_2\\uparrow$.",
        "(b) Reaction with Sodium bicarbonate: Brisk effervescence of carbon dioxide gas that turns lime water milky: $\\text{CH}_3\\text{COOH} + \\text{NaHCO}_3 \\to \\text{CH}_3\\text{COONa} + \\text{H}_2\\text{O} + \\text{CO}_2\\uparrow$.",
        "(c) Reaction with Absolute Ethanol (Esterification): In the presence of conc. $\\text{H}_2\\text{SO}_4$ catalyst, forms sweet, fruity-smelling Ethyl Ethanoate: $\\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH} \\xrightarrow{\\text{conc. H}_2\\text{SO}_4} \\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O}$."
      ],
      "result": "(a) \\text{H}_2 \\text{ gas}; \\; (b) \\text{CO}_2 \\text{ effervescence}; \\; (c) \\text{Ethyl ethanoate (sweet ester)}"
    },
    "verificationProblem": "Check distinguishing test: Adding $\\text{NaHCO}_3$ gives vigorous $\\text{CO}_2$ bubbling with ethanoic acid, but zero reaction with neutral ethanol. Chemical distinction verified.",
    "realWorldUse": "Vegetable oil catalytic hydrogenation for margarine manufacturing, commercial soap and syndet surfactant formulation, synthetic bio-ethanol fuel blending.",
    "diagramType": "soap-micelle-cleansing-mechanism"
  },
  "CBSE-CH-G10-SCI-CH05": {
    "chapterTitle": "Life Processes",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 5,
    "essentialLaw": "\\text{Photosynthesis: } 6\\text{CO}_2 + 12\\text{H}_2\\text{O} \\xrightarrow{\\text{Sunlight/Chl}} \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 + 6\\text{H}_2\\text{O} \\quad | \\quad \\text{Double Circulation: Pulmonary} + \\text{Systemic}",
    "coreConcepts": [
      {
        "heading": "Nutrition (Autotrophic vs Heterotrophic) & Human Digestion",
        "bullets": [
          "Autotrophic Nutrition: Photosynthesis in chloroplasts; 1. Absorption of light by chlorophyll; 2. Conversion of light energy to chemical energy and photolysis of water ($2H_2O \\to 4H^+ + 4e^- + O_2$); 3. Reduction of $CO_2$ to carbohydrates; Stomatal transpiration and guard cell turgor mechanism.",
          "Heterotrophic Nutrition: Holozoic, Saprophytic, Parasitic; Amoeba uses pseudopodia forming food vacuole.",
          "Human Alimentary Canal: Mouth (salivary amylase digests starch to maltose) $\\to$ Stomach (gastric glands secrete $HCl$, Pepsin for proteins, Mucus to protect stomach wall) $\\to$ Small Intestine (site of complete digestion: Bile from liver emulsifies fats and neutralizes acid; Pancreatic juice contains Trypsin for proteins, Lipase for emulsified fats; Intestinal enzymes convert carbohydrates $\\to$ glucose, proteins $\\to$ amino acids, fats $\\to$ fatty acids + glycerol; Villi increase absorption surface area)."
        ]
      },
      {
        "heading": "Respiration, Circulation & Human Excretion",
        "bullets": [
          "Respiration: Glycolysis in cytoplasm converts Glucose ($6C$) $\\to 2$ Pyruvate ($3C$); Aerobic in mitochondria produces $CO_2 + H_2O + 38\\text{ ATP}$; Anaerobic in yeast produces Ethanol $+ CO_2 + 2\\text{ ATP}$; Muscle cramps due to lactic acid accumulation during oxygen deficit.",
          "Human Circulatory System: 4-chambered heart preventing mixing of oxygenated and deoxygenated blood; Double circulation (Pulmonary and Systemic loops); Blood vessels: Arteries (thick elastic walls, high pressure, carry blood away from heart) vs Veins (thin walls, valves prevent backflow); Blood pressure ($120/80\\text{ mmHg}$ measured by Sphygmomanometer); Lymph (tissue fluid, transports digested fats from lacteals).",
          "Plant Transport: Xylem (unidirectional transport of water/minerals driven by transpiration pull and root pressure); Phloem (bidirectional translocation of sucrose using ATP energy).",
          "Human Excretory System: Pair of kidneys, ureters, urinary bladder, urethra; Nephron is structural and functional filtration unit; Glomerular ultrafiltration in Bowman capsule $\\to$ selective reabsorption of glucose, amino acids, salts, water $\\to$ concentrated urine excreted."
        ]
      }
    ],
    "examTraps": [
      "Assuming anaerobic respiration in yeast and human muscle produces the same products (Yeast produces ETHANOL and $\\text{CO}_2$; Human muscle during oxygen deficit produces LACTIC ACID with zero $\\text{CO}_2$).",
      "Confusing Xylem transport (unidirectional, passive physical transpiration pull) with Phloem transport (bidirectional, active requiring ATP energy)."
    ],
    "quickMentalCheck": "Why do aquatic animals breathe much faster than terrestrial organisms? The amount of dissolved oxygen in water is fairly low compared to the high percentage of oxygen in atmospheric air ($21\\%$).",
    "cueQuestions": [
      "How do the gastric secretions (hydrochloric acid, pepsin, mucus) coordinate safe protein digestion in the human stomach?",
      "Why is double circulation necessary in mammals and birds to separate oxygenated and deoxygenated blood?",
      "How does the transpiration pull act as the major driving engine for ascending sap transport in tall trees?"
    ],
    "workedExample": {
      "problem": "Trace the breakdown pathways of glucose into energy under: (a) Aerobic conditions in human cells, (b) Anaerobic conditions in yeast, and (c) Oxygen deficiency in human skeletal muscle.",
      "steps": [
        "Initial Step (Universal in Cytoplasm): 1 molecule of Glucose ($6C$) is broken down into 2 molecules of Pyruvate ($3C$) yielding 2 ATP.",
        "(a) Aerobic Pathway (Mitochondria in presence of $\\text{O}_2$): $\\text{Pyruvate} \\xrightarrow{\\text{O}_2} 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 36-38\\text{ ATP}$ (Complete oxidation, maximum energy).",
        "(b) Anaerobic Pathway in Yeast (Fermentation in absence of $\\text{O}_2$): $\\text{Pyruvate} \\to 2\\text{ Ethanol } (\\text{C}_2\\text{H}_5\\text{OH}) + 2\\text{CO}_2 + 2\\text{ ATP}$.",
        "(c) Anaerobic Pathway in Skeletal Muscle (Lack of $\\text{O}_2$ during heavy sprint): $\\text{Pyruvate} \\to 2\\text{ Lactic acid } (\\text{C}_3\\text{H}_6\\text{O}_3) + 2\\text{ ATP}$. Lactic acid accumulation causes muscle cramps."
      ],
      "result": "(a) \\text{CO}_2 + \\text{H}_2\\text{O} + 38\\text{ ATP}; \\; (b) \\text{Ethanol} + \\text{CO}_2 + 2\\text{ ATP}; \\; (c) \\text{Lactic acid} + 2\\text{ ATP}"
    },
    "verificationProblem": "Check energy conservation: Aerobic yields $\\approx 19\\times$ more ATP per glucose molecule than anaerobic fermentation. Biochemical energetics verified.",
    "realWorldUse": "Hemodialysis artificial kidney blood filtration for chronic renal failure, clinical sphygmomanometer blood pressure monitoring, bio-ethanol production from yeast fermentation.",
    "diagramType": "human-alimentary-canal-digestive-system"
  },
  "CBSE-CH-G10-SCI-CH06": {
    "chapterTitle": "Control and Coordination",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 6,
    "essentialLaw": "\\text{Reflex Arc: Receptor} \\to \\text{Sensory Neuron} \\to \\text{Spinal Cord Relay} \\to \\text{Motor Neuron} \\to \\text{Effector Muscle} \\quad | \\quad \\text{Thyroid} \\xrightarrow{\\text{Iodine}} \\text{Thyroxine}",
    "coreConcepts": [
      {
        "heading": "Nervous System, Synapse & Human Brain Architecture",
        "bullets": [
          "Neuron Structure & Impulse: Dendrite receives stimulus $\\to$ Cyton/Soma $\\to$ Axon $\\to$ Nerve endings release neurotransmitters across Synapse to generate electrical impulse in next dendrite.",
          "Reflex Arc: Fast involuntary pathway bypassing conscious brain deliberation (Receptor $\\to$ Sensory neuron $\\to$ Spinal cord $\\to$ Motor neuron $\\to$ Effector muscle, e.g., withdrawing hand from hot pan).",
          "Human Brain Structure: 1. Forebrain (Cerebrum: main thinking center, memory, voluntary actions, sensory interpretation); 2. Midbrain (controls involuntary visual and auditory reflexes); 3. Hindbrain (Cerebellum maintains body posture and balance; Medulla controls involuntary breathing, BP, salivation; Pons regulates respiration); Protected by bony cranium and cerebrospinal fluid (CSF)."
        ]
      },
      {
        "heading": "Plant Tropic Movements & Human Endocrine Hormones",
        "bullets": [
          "Plant Movements: 1. Nastic (non-directional growth-independent, e.g., Thigmonasty in Mimosa pudica touch-me-not by water turgor changes); 2. Tropic Movements (directional growth): Phototropism (Auxin diffuses to shaded side, causing bending toward light), Geotropism (roots $+$, shoots $-$), Hydrotropism (roots grow toward water), Chemotropism (pollen tube growth toward ovule).",
          "Plant Hormones (Phytohormones): Auxin (cell elongation), Gibberellin (stem growth), Cytokinin (cell division), Abscisic Acid / ABA (wilting of leaves, stress inhibitor).",
          "Human Endocrine Hormones: Pituitary (Growth Hormone, dwarfism/gigantism), Thyroid (Thyroxine requires Iodine to prevent Goitre, regulates carbohydrate/fat/protein metabolism), Pancreas (Insulin lowers blood sugar, prevents Diabetes), Adrenal (Adrenaline emergency hormone, increases heart rate and blood pressure), Testis (Testosterone) and Ovary (Estrogen)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Nastic movements (growth-independent, non-directional, e.g., Mimosa) with Tropic movements (growth-dependent, directional, e.g., phototropism).",
      "Thinking the brain controls reflex actions (simple reflex arcs are processed directly in the SPINAL CORD for rapid response without waiting for conscious brain processing)."
    ],
    "quickMentalCheck": "Why is iodized salt recommended in daily diet? Iodine is essential for the thyroid gland to synthesize thyroxine hormone; iodine deficiency causes thyroid enlargement (Goitre).",
    "cueQuestions": [
      "How does unequal auxin distribution on the shaded side of a plant stem cause phototropic bending toward light?",
      "How does a chemical synapse ensure strictly unidirectional transmission of nerve impulses between adjacent neurons?",
      "How does the pancreas use a feedback mechanism to regulate insulin secretion in response to fluctuating blood glucose levels?"
    ],
    "workedExample": {
      "problem": "Trace the sequence of events in a Reflex Arc when a person accidentally touches a burning candle flame with their fingertip.",
      "steps": [
        "1. Heat stimulus is detected by thermoreceptors (pain/heat sensory receptors) in the skin of the fingertip.",
        "2. An electrical impulse is generated and transmitted along the Sensory (Afferent) Neuron to the spinal cord.",
        "3. Inside the gray matter of the spinal cord, the impulse passes across a Relay Neuron (Interneuron) which processes the signal instantaneously.",
        "4. The relay neuron transmits the motor command directly into the Motor (Efferent) Neuron.",
        "5. The motor neuron conducts the impulse to the Effector (biceps muscle of the arm).",
        "6. The biceps muscle contracts immediately, pulling the hand away from the burning flame before pain perception reaches the conscious brain."
      ],
      "result": "\\text{Receptor (Skin)} \\to \\text{Sensory Neuron} \\to \\text{Spinal Cord Interneuron} \\to \\text{Motor Neuron} \\to \\text{Effector (Muscle Contraction)}"
    },
    "verificationProblem": "Check survival benefit: Processing through spinal cord takes $<50\\text{ ms}$, preventing severe third-degree tissue burn compared to $\\approx 300\\text{ ms}$ conscious brain processing. Verified.",
    "realWorldUse": "Insulin analog injection protocols for diabetic glycemic management, neurological patellar tendon reflex diagnostic tests, commercial agricultural auxin rooting powders.",
    "diagramType": "reflex-arc-neural-pathway"
  },
  "CBSE-CH-G10-SCI-CH07": {
    "chapterTitle": "How do Organisms Reproduce?",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 7,
    "essentialLaw": "\\text{Asexual: Mitosis } (\\text{Clones}) \\quad | \\quad \\text{Sexual: Gametogenesis } (n) + \\text{Fertilization} \\to 2n \\; \\text{Zygote} \\implies \\text{Genetic Variation}",
    "coreConcepts": [
      {
        "heading": "Modes of Asexual Reproduction & Vegetative Propagation",
        "bullets": [
          "Binary Fission (Amoeba in any plane, Leishmania along longitudinal axis with flagellum) vs Multiple Fission (Plasmodium in cyst during unfavorable conditions).",
          "Fragmentation (Spirogyra simply breaks into pieces) vs Regeneration (Planaria and Hydra regrow full organism from cut pieces via specialized proliferating cells).",
          "Budding (Hydra and Yeast develop outgrowth due to repeated cell divisions, detaching upon maturity).",
          "Spore Formation (Rhizopus bread mould produces sporangiospores inside sporangia with thick resistant walls).",
          "Vegetative Propagation: Natural (Bryophyllum leaf notches, potato eye tubers, ginger rhizomes) vs Artificial (Cutting, Layering, Grafting, Tissue culture / Micropropagation producing disease-free plantlets in sterile nutrient medium)."
        ]
      },
      {
        "heading": "Sexual Reproduction in Flowering Plants & Human Reproductive System",
        "bullets": [
          "Flower Anatomy: Calyx (sepals), Corolla (petals), Stamen (male: anther + filament producing pollen grains), Carpel/Pistil (female: stigma, style, ovary containing ovules with egg cell).",
          "Plant Fertilization: Pollen grain germinates on stigma $\\to$ pollen tube grows through style carrying 2 male gametes into ovule $\\to$ fertilization forms zygote $\\to$ ovule becomes Seed, ovary ripens into Fruit.",
          "Male Reproductive System: Testes in scrotum (lower temperature for spermatogenesis), vas deferens, seminal vesicles and prostate gland (secrete seminal fluid for nutrition and motility), penis; Testosterone regulates sperm production and secondary sexual characteristics.",
          "Female Reproductive System: Pair of ovaries (produce ovum and estrogen/progesterone), fallopian tubes / oviducts (site of fertilization), uterus (site of implantation and embryo development), cervix, vagina.",
          "Menstrual Cycle & Contraception: Monthly cycle (28 days); If fertilization does not occur, thickened endometrial lining sheds as menstruation; Barrier methods (condoms), Chemical (oral contraceptive pills), IUDs (Copper-T), Surgical (Vasectomy in males, Tubectomy in females)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Regeneration (accidental regrowth from cut fragments) with true Reproduction (specialized physiological reproductive mechanism).",
      "Assuming fertilization occurs in the uterus (fertilization takes place strictly in the Fallopian Tube / Oviduct; implantation occurs in the uterus)."
    ],
    "quickMentalCheck": "What happens to the flower parts after successful fertilization? The petals, sepals, stamens, style, and stigma shrivel and fall off; the fertilized ovule develops into a SEED and the ovary enlarges into a FRUIT.",
    "cueQuestions": [
      "How does tissue culture (micropropagation) enable the rapid production of disease-free elite crop varieties?",
      "What are the physiological functions of the prostate gland and seminal vesicles in the male reproductive tract?",
      "How does the placenta facilitate nutrient exchange and waste removal between maternal blood and the developing fetus?"
    ],
    "workedExample": {
      "problem": "Differentiate between Vasectomy and Tubectomy as surgical sterilization methods in humans based on target organ, procedure, and gamete flow prevention.",
      "steps": [
        "1. Vasectomy (Male Sterilization): A small portion of both Vas Deferens is surgically cut and tied through a small incision in the scrotum. Prevents the transport of sperms into the semen (ejaculation contains seminal fluids but zero spermatozoa).",
        "2. Tubectomy (Female Sterilization): A small portion of both Fallopian Tubes (Oviducts) is surgically cut and ligated through a small incision in the abdomen or vagina. Prevents the ovulated egg from reaching the site of fertilization in the tube.",
        "3. Both methods are irreversible, permanent, and provide near $100\\%$ contraceptive efficacy without affecting sexual drive or hormone production."
      ],
      "result": "\\text{Vasectomy: Vas deferens cut/tied in males}; \\quad \\text{Tubectomy: Fallopian tubes cut/tied in females}"
    },
    "verificationProblem": "Check endocrine preservation: Testes and ovaries continue normal secretion of testosterone and estrogen into bloodstream because blood vessels remain completely intact. Verified.",
    "realWorldUse": "Commercial orchid micropropagation in plant nurseries, barrier contraception for HIV/STI prevention, surgical family planning tubectomy programs.",
    "diagramType": "flower-anatomy-cross-pollination-fertilization"
  },
  "CBSE-CH-G10-SCI-CH08": {
    "chapterTitle": "Heredity",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 8,
    "essentialLaw": "\\text{Mendelian Monohybrid Cross: } TT \\times tt \\to F_1(Tt, \\text{All Tall}) \\xrightarrow{\\text{Selfing}} F_2(1TT : 2Tt : 1tt \\implies 3\\text{ Tall} : 1\\text{ Dwarf})",
    "coreConcepts": [
      {
        "heading": "Mendelian Genetics, Monohybrid & Dihybrid Crosses",
        "bullets": [
          "Heredity: Transmission of genetically determined traits from parents to offspring; Gregor Johann Mendel (Father of Genetics) selected garden pea (Pisum sativum) due to distinct contrasting traits, short life cycle, and self-pollinating nature.",
          "Monohybrid Cross (One trait, e.g., Plant Height): Pure Tall ($TT$) $\\times$ Pure Dwarf ($tt$) $\\to F_1$ all Tall ($Tt$); $F_2$ generation: Phenotypic ratio $= 3\\text{ Tall} : 1\\text{ Dwarf}$; Genotypic ratio $= 1TT : 2Tt : 1tt$ ($1:2:1$).",
          "Dihybrid Cross (Two traits, e.g., Seed Shape & Color): Round Yellow ($RRYY$) $\\times$ Wrinkled Green ($rryy$) $\\to F_1$ Round Yellow ($RrYy$); $F_2$ Phenotypic ratio $= 9\\text{ Round Yellow} : 3\\text{ Round Green} : 3\\text{ Wrinkled Yellow} : 1\\text{ Wrinkled Green}$ ($9:3:3:1$).",
          "Mendel Principles: 1. Dominant traits express in heterozygous state ($Tt$), recessive traits express only in homozygous state ($tt$); 2. Law of Segregation: Alleles separate during gamete formation; 3. Law of Independent Assortment."
        ]
      },
      {
        "heading": "Mechanism of Trait Expression & Sex Determination in Humans",
        "bullets": [
          "Gene Expression Mechanism: DNA is information source for making proteins; A specific segment of DNA (Gene) provides codes for an enzyme; Enzyme efficiency determines hormone amount, controlling physical trait (e.g., efficient growth enzyme produces tall plant).",
          "Sex Determination in Humans: 23 pairs of chromosomes (22 pairs autosomes + 1 pair sex chromosomes); Females have identical $XX$ chromosomes (Homogametic, produce only $X$ eggs); Males have $XY$ chromosomes (Heterogametic, produce $50\\% X$ and $50\\% Y$ sperms).",
          "Father Determines Sex: Fertilization of $X$-egg by $X$-sperm yields female child ($XX, 50\\%$ chance); Fertilization of $X$-egg by $Y$-sperm yields male child ($XY, 50\\%$ chance); Environmental sex determination occurs in some reptiles (e.g., incubation temperature determines sex in turtles/alligators; snails change sex)."
        ]
      }
    ],
    "examTraps": [
      "Blaming the mother for the sex of a child (genetically, the FATHER is solely responsible because males produce both $X$ and $Y$ bearing sperm, while females produce only $X$ eggs).",
      "Confusing the genotypic ratio ($1:2:1$) with phenotypic ratio ($3:1$) in a monohybrid cross."
    ],
    "quickMentalCheck": "What is the probability of a human couple having a girl child during any pregnancy? Exactly $50\\%$ ($1/2$), as there is an equal $1:1$ chance of fertilization by an $X$ or $Y$ sperm.",
    "cueQuestions": [
      "How did Mendel monohybrid cross demonstrate that recessive traits (dwarfism) are not lost or blended in the F1 generation but reappear in F2?",
      "How do genes at the molecular level control the physical expression of phenotypic traits through enzyme synthesis?",
      "Why is the genetic sex of a newborn human child determined entirely by the father sperm at the moment of fertilization?"
    ],
    "workedExample": {
      "problem": "A cross was made between pure breeding pea plants with round yellow seeds ($RRYY$) and wrinkled green seeds ($rryy$). Show the Punnett square for the $F_2$ generation and state the phenotypic ratio.",
      "steps": [
        "Parents: $RRYY$ (Round Yellow) $\\times rryy$ (Wrinkled Green).",
        "$F_1$ Generation: All heterozygous Round Yellow ($RrYy$).",
        "Gametes produced by $F_1$: Four types in equal $25\\%$ frequency: $RY, Ry, rY, ry$.",
        "Selfing $F_1 \\times F_1$ yields 16 combinations in Punnett square:",
        "- 9 Round Yellow ($R_{-}Y_{-}$)",
        "- 3 Round Green ($R_{-}yy$)",
        "- 3 Wrinkled Yellow ($rrY_{-}$)",
        "- 1 Wrinkled Green ($rryy$)."
      ],
      "result": "\\text{Phenotypic Ratio: } 9 \\text{ Round Yellow} : 3 \\text{ Round Green} : 3 \\text{ Wrinkled Yellow} : 1 \\text{ Wrinkled Green} \\; (9:3:3:1)"
    },
    "verificationProblem": "Check single-trait cross-multiplication: $(3\\text{ Round} : 1\\text{ Wrinkled}) \\times (3\\text{ Yellow} : 1\\text{ Green}) = 9:3:3:1$. Law of independent assortment verified.",
    "realWorldUse": "Pedigree trait mapping in family genetic counseling, selective high-yield crop hybridization in agronomy, forensic DNA paternity analysis.",
    "diagramType": "mendelian-punnett-square-dihybrid-cross"
  },
  "CBSE-CH-G10-SCI-CH09": {
    "chapterTitle": "Light - Reflection and Refraction",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 9,
    "essentialLaw": "\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u} \\; (\\text{Mirror}) \\quad | \\quad \\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u} \\; (\\text{Lens}) \\quad | \\quad n = \\frac{\\sin i}{\\sin r} = \\frac{c}{v} \\quad | \\quad P = \\frac{1}{f(\\text{m})}",
    "coreConcepts": [
      {
        "heading": "Spherical Mirrors, Ray Tracing & Sign Conventions",
        "bullets": [
          "Laws of Reflection: $\\angle i = \\angle r$; Incident ray, reflected ray, and normal all lie in same plane.",
          "Concave Mirror (Converging): Forms real, inverted images for object beyond focus ($F$); Forms virtual, erect, magnified image ONLY when object is between Pole ($P$) and Focus ($F$) (used as shaving/makeup mirror, dentist mirror, solar furnace, headlights).",
          "Convex Mirror (Diverging): ALWAYS forms virtual, erect, diminished image for all object positions; Large field of view (used as vehicle rear-view mirror).",
          "Cartesian Sign Convention: Pole is origin; Distances in incident direction are positive ($+x$), opposite are negative ($-x$, object distance $u$ is ALWAYS negative); Above principal axis positive ($+y$), below negative ($-y$); Mirror formula: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$; Magnification: $m = -\\frac{v}{u} = \\frac{h'}{h}$."
        ]
      },
      {
        "heading": "Refraction of Light, Snell Law, Lenses & Lens Power",
        "bullets": [
          "Laws of Refraction & Snell's Law: $\\frac{\\sin i}{\\sin r} = n_{21} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1}$; Refraction through rectangular glass slab produces lateral displacement ($d \\propto \\text{thickness}$).",
          "Refractive Index: Absolute refractive index $n = c/v$ (Diamond has highest $n = 2.42$, light speed is slowest).",
          "Convex Lens (Converging, $f > 0$): Forms real inverted images; Forms virtual erect magnified image when object is between optical center $O$ and focus $F_1$ (magnifying glass).",
          "Concave Lens (Diverging, $f < 0$): ALWAYS forms virtual, erect, diminished image on same side as object.",
          "Lens Formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$; Magnification: $m = +\\frac{v}{u} = \\frac{h'}{h}$; Power of Lens: $P = \\frac{1}{f(\\text{m})}$ in Dioptres (D); Combination of thin lenses: $P_{\\text{eq}} = P_1 + P_2$."
        ]
      }
    ],
    "examTraps": [
      "Confusing the mirror magnification formula ($m = -v/u$) with the lens magnification formula ($m = +v/u$).",
      "Using focal length in centimeters when calculating power $P = 1/f$ (focal length MUST be in METERS to get power in Dioptres)."
    ],
    "quickMentalCheck": "A convex lens has a focal length of $+50\\text{ cm}$. What is its optical power? $P = \\frac{1}{f(\\text{m})} = \\frac{1}{+0.50\\text{ m}} = +2.0\\text{ D}$.",
    "cueQuestions": [
      "Why is a convex mirror preferred over a plane mirror as a rear-view mirror in automobiles?",
      "How does Snell Law explain why a straight stick partially immersed in water appears bent at the surface?",
      "What are the image characteristics formed by a concave mirror when an object is placed between its pole and principal focus?"
    ],
    "workedExample": {
      "problem": "A concave mirror produces three times magnified real image of an object placed at $10\\text{ cm}$ in front of it. Where is the image located, and what is the focal length of the mirror?",
      "steps": [
        "Given: Object distance $u = -10\\text{ cm}$.",
        "Magnification: Since the image is REAL and inverted, $m = -3$.",
        "Apply magnification formula for mirror: $m = -\\frac{v}{u} \\implies -3 = -\\frac{v}{-10} \\implies v = -30\\text{ cm}$.",
        "The image is located at a distance of $30\\text{ cm}$ in front of the mirror (on same side as object).",
        "Apply Mirror Formula: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u} = \\frac{1}{-30} + \\frac{1}{-10} = -\\frac{1}{30} - \\frac{3}{30} = -\\frac{4}{30} = -\\frac{2}{15}$.",
        "Solve for $f$: $f = -\\frac{15}{2} = -7.5\\text{ cm}$."
      ],
      "result": "v = -30\\text{ cm} \\; (\\text{In front of mirror}), \\quad f = -7.5\\text{ cm}"
    },
    "verificationProblem": "Check object position relative to focus: Focal length $f = 7.5\\text{ cm}$ and center of curvature $C = 2f = 15\\text{ cm}$. Object at $10\\text{ cm}$ is between $F$ and $C$, which correctly forms a real, magnified image beyond $C$ ($v = -30\\text{ cm}$). Verified.",
    "realWorldUse": "Vehicle headlight parabolic reflectors, precision optometry prescription eyeglasses, compound microscope objective lens systems.",
    "diagramType": "concave-mirror-ray-diagram-magnified-real"
  },
  "CBSE-CH-G10-SCI-CH10": {
    "chapterTitle": "The Human Eye and the Colorful World",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 10,
    "essentialLaw": "\\text{Myopia Correction: } f = -d_{\\text{far point}} \\; (\\text{Concave Lens}) \\quad | \\quad \\text{Hypermetropia: } \\frac{1}{f} = \\frac{1}{d} - \\frac{1}{d_{\\text{near point}}} \\; (\\text{Convex Lens}) \\quad | \\quad I \\propto \\frac{1}{\\lambda^4}",
    "coreConcepts": [
      {
        "heading": "Anatomy of Human Eye, Accommodation & Defects of Vision",
        "bullets": [
          "Eye Anatomy: Cornea (transparent outer layer, does bulk refraction), Iris (controls pupil size), Pupil (regulates entering light intensity), Crystalline Lens (convex, flexible protein), Ciliary muscles (adjust lens curvature and focal length), Retina (light-sensitive screen with Rods for low light and Cones for color vision), Optic nerve, Yellow spot (Fovea, highest acuity), Blind spot (no photoreceptors).",
          "Power of Accommodation: Ability of ciliary muscles to adjust lens focal length; Near point of normal human eye $= 25\\text{ cm}$; Far point $= \\infty$.",
          "Defects of Vision & Correction: 1. Myopia (Short-sightedness: near clear, distant blurred; image forms in front of retina due to excessive lens curvature or elongated eyeball; corrected by Concave lens $f = -d$); 2. Hypermetropia (Far-sightedness: distant clear, near blurred; image forms behind retina due to short eyeball or long focal length; corrected by Convex lens); 3. Presbyopia (aging defect due to weakening ciliary muscles, corrected by Bi-focal lenses: upper concave for distant, lower convex for reading); 4. Cataract (crystalline lens turns cloudy, corrected by surgical intraocular lens replacement)."
        ]
      },
      {
        "heading": "Prism Dispersion, Atmospheric Refraction & Light Scattering",
        "bullets": [
          "Refraction through Glass Prism: White light splits into spectrum of 7 colors (VIBGYOR: Violet bends most due to lowest speed, Red bends least); Recombination into white light using inverted second prism (Isaac Newton).",
          "Rainbow Formation: Natural dispersion by suspended raindrops: 1. Refraction & Dispersion at entry $\\to$ 2. Internal reflection at back surface $\\to$ 3. Refraction at exit.",
          "Atmospheric Refraction: Due to varying air density: 1. Twinkling of stars (continuous shifting of apparent position by turbulent air; planets do not twinkle as they act as extended sources); 2. Advanced sunrise (2 min before) and delayed sunset (2 min after), lengthening day by 4 minutes.",
          "Scattering of Light & Tyndall Effect: Scattering of light by colloidal particles; Rayleigh Scattering: $I \\propto 1/\\lambda^4$; Blue color of clear sky (short wavelength blue light scattered $16\\times$ more than red); Reddening of Sun at sunrise and sunset (light travels longest atmospheric path, blue is scattered away, only long red wavelengths reach eye); Danger signal lights are RED because red scatters least through fog and smoke."
        ]
      }
    ],
    "examTraps": [
      "Assuming rainbow formation involves Total Internal Reflection (TIR) (it involves dispersion, INTERNAL REFLECTION, and refraction, but not strictly total internal reflection beyond critical angle).",
      "Confusing the corrective lens: Myopia requires CONCAVE (diverging) lens; Hypermetropia requires CONVEX (converging) lens."
    ],
    "quickMentalCheck": "Why does the sky appear dark/black to astronauts in outer space or on the Moon? Outer space is a vacuum lacking an atmosphere of gas molecules or aerosol particles to scatter sunlight.",
    "cueQuestions": [
      "How do the ciliary muscles adjust the focal length of the crystalline lens during accommodation for near vs distant objects?",
      "Why are danger signals and brake tail lights on vehicles universally chosen to be red in color?",
      "What optical phenomena (dispersion, internal reflection, refraction) combine to produce a natural rainbow in the sky?"
    ],
    "workedExample": {
      "problem": "A myopic person cannot see objects clearly beyond a distance of $1.5\\text{ m}$. What is the nature and power of the corrective lens required to restore normal distant vision?",
      "steps": [
        "To see distant objects clearly, an object at infinity ($u = -\\infty$) must form a virtual image at the person’s far point ($v = -1.5\\text{ m}$).",
        "Apply Lens Formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{-1.5} - \\frac{1}{-\\infty} = -\\frac{1}{1.5} - 0 = -\\frac{1}{1.5}$.",
        "Focal length of corrective lens: $f = -1.5\\text{ m}$ (Negative sign indicates a Concave / Diverging lens).",
        "Calculate Optical Power: $P = \\frac{1}{f(\\text{m})} = \\frac{1}{-1.5\\text{ m}} = -\\frac{10}{15} = -0.67\\text{ D}$."
      ],
      "result": "\\text{Corrective Lens: Concave Lens}, \\quad f = -1.5\\text{ m}, \\quad P = -0.67\\text{ D}"
    },
    "verificationProblem": "Check lens action: A diverging concave lens of $P = -0.67\\text{ D}$ shifts parallel rays from infinity to diverge as if originating from the eye far point at $1.5\\text{ m}$. Verified.",
    "realWorldUse": "Prescription corrective eyeglasses and contact lenses, LASIK refractive corneal sculpting, anti-glare vehicle headlamps.",
    "diagramType": "myopia-hypermetropia-correction-ray-diagrams"
  },
  "CBSE-CH-G10-SCI-CH11": {
    "chapterTitle": "Electricity",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 11,
    "essentialLaw": "V = I R \\quad | \\quad R = \\rho\\frac{L}{A} \\quad | \\quad R_s = R_1 + R_2, \\; \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} \\quad | \\quad H = I^2 R t \\quad | \\quad P = V I = I^2 R = \\frac{V^2}{R}",
    "coreConcepts": [
      {
        "heading": "Electric Current, Potential Difference & Ohm's Law",
        "bullets": [
          "Electric Current: Rate of flow of electric charge $I = \\frac{Q}{t} = \\frac{ne}{t}$; Unit: Ampere ($1\\text{ A} = 1\\text{ C/s}$); Measured by Ammeter (low resistance, connected in series).",
          "Electric Potential Difference ($V$): Work done to move unit positive charge between two points: $V = \\frac{W}{Q}$; Unit: Volt ($1\\text{ V} = 1\\text{ J/C}$); Measured by Voltmeter (high resistance, connected in parallel).",
          "Ohm's Law: At constant temperature, current through a conductor is directly proportional to potential difference across its ends: $V \\propto I \\implies V = I R$.",
          "Factors Affecting Resistance ($R = \\rho\\frac{L}{A}$): Directly proportional to length $L$, inversely proportional to cross-sectional area $A$, and depends on material resistivity $\\rho$ ($\\Omega\\cdot\\text{m}$) and temperature."
        ]
      },
      {
        "heading": "Series & Parallel Combinations & Joule Heating Law",
        "bullets": [
          "Resistors in Series: Current $I$ is same through all resistors; $V = V_1 + V_2 + V_3 \\implies R_s = R_1 + R_2 + R_3$ (Total resistance increases).",
          "Resistors in Parallel: Voltage $V$ is same across all branches; $I = I_1 + I_2 + I_3 \\implies \\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$ (Total resistance decreases; used in domestic wiring so independent switches operate without affecting other appliances).",
          "Joule's Law of Heating: Heat produced in a resistor $H = I^2 R t = V I t = \\frac{V^2}{R}t$; Practical applications: Electric iron/heater (Nichrome wire: high resistivity, high melting point, does not oxidize), Electric bulb (Tungsten filament: melting point $3380^\\circ\\text{C}$, filled with inert $N_2/Ar$), Electric Fuse (lead-tin alloy wire of low melting point to prevent fire during short-circuit/overloading).",
          "Electric Power: $P = V I = I^2 R = \\frac{V^2}{R}$ (Watt); Commercial unit of electrical energy: $1\\text{ Kilowatt-hour (kWh)} = 1\\text{ Unit} = 3.6 \\times 10^6\\text{ J}$."
        ]
      }
    ],
    "examTraps": [
      "Connecting an ammeter in parallel or voltmeter in series (ammeter has near-zero resistance and causes short circuit in parallel; voltmeter has near-infinite resistance and blocks current in series).",
      "Confusing power rating with resistance: An appliance with HIGHER power rating (e.g., $100\\text{ W}$ vs $40\\text{ W}$ at $220\\text{ V}$) has a LOWER resistance ($R = V^2/P$)."
    ],
    "quickMentalCheck": "Two resistors of $6\\,\\Omega$ and $3\\,\\Omega$ are connected in parallel. What is their equivalent resistance? $R_p = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2\\,\\Omega$.",
    "cueQuestions": [
      "Why are domestic electrical appliances always wired in parallel rather than in series?",
      "Why is Nichrome alloy chosen over pure copper or iron for the heating elements of electric toasters and irons?",
      "How does an electric fuse protect household circuits and appliances from catastrophic overloading?"
    ],
    "workedExample": {
      "problem": "An electric refrigerator rated $400\\text{ W}$ operates 8 hours/day and an electric television rated $100\\text{ W}$ operates 6 hours/day. What is the cost of the energy to operate them for 30 days at ₹3.00 per kWh?",
      "steps": [
        "Energy consumed by refrigerator per day: $E_{\\text{fridge}} = 400\\text{ W} \\times 8\\text{ h} = 3200\\text{ Wh} = 3.2\\text{ kWh}$.",
        "Energy consumed by TV per day: $E_{\\text{TV}} = 100\\text{ W} \\times 6\\text{ h} = 600\\text{ Wh} = 0.6\\text{ kWh}$.",
        "Total daily energy consumption: $E_{\\text{daily}} = 3.2 + 0.6 = 3.8\\text{ kWh (Units)}$.",
        "Total energy consumed in 30 days: $E_{\\text{total}} = 3.8\\text{ kWh/day} \\times 30\\text{ days} = 114\\text{ kWh}$.",
        "Total electricity cost: $\\text{Cost} = 114\\text{ kWh} \\times ₹3.00/\\text{kWh} = ₹342.00$."
      ],
      "result": "\\text{Total Energy Consumed} = 114\\text{ kWh}, \\quad \\text{Total Cost} = ₹342.00"
    },
    "verificationProblem": "Check Joules conversion: $114\\text{ kWh} = 114 \\times (3.6 \\times 10^6\\text{ J}) = 4.104 \\times 10^8\\text{ J}$. Arithmetic verified.",
    "realWorldUse": "Household smart meter billing calculations, thermal circuit breaker trips in power distribution panels, high-efficiency LED driver power calculations.",
    "diagramType": "circuit-diagram-ohms-law-series-parallel"
  },
  "CBSE-CH-G10-SCI-CH12": {
    "chapterTitle": "Magnetic Effects of Electric Current",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 12,
    "essentialLaw": "\\vec{F} = I(\\vec{L}\\times\\vec{B}) \\; (\\text{Fleming Left-Hand}) \\quad | \\quad B_{\\text{solenoid}} \\propto n I \\quad | \\quad \\mathcal{E}_{\\text{induced}} \\; (\\text{Fleming Right-Hand})",
    "coreConcepts": [
      {
        "heading": "Magnetic Field Lines, Right-Hand Thumb Rule & Solenoids",
        "bullets": [
          "Oersted Experiment (1820): Electric current in wire deflects nearby compass needle, proving current produces a magnetic field.",
          "Magnetic Field Lines Properties: Emerge from North pole and enter South pole outside magnet; Continuous closed loops (inside magnet flow from South to North); Degree of closeness represents field strength; Field lines NEVER cross each other (otherwise two directions of field at intersection point).",
          "Right-Hand Thumb Rule (Maxwell Corkscrew): Thumb points in current direction, curled fingers point in direction of concentric magnetic field lines.",
          "Magnetic Field of a Solenoid: Long helical coil of insulated copper wire; Produces uniform, parallel internal magnetic field identical to a bar magnet ($B \\propto n I$); Inserting a soft iron core inside forms an Electromagnet (temporary, high magnetic strength)."
        ]
      },
      {
        "heading": "Lorentz Force, Fleming Rules, Electric Motor & Domestic Circuits",
        "bullets": [
          "Force on Current-Carrying Conductor in Magnetic Field: Maximum force when current is perpendicular to field ($\\theta = 90^\\circ$, $F = B I L$).",
          "Fleming's Left-Hand Rule (Electric Motors): Forefinger = Magnetic Field ($B$), Middle finger = Current ($I$), Thumb = Motion/Force ($F$).",
          "Electric Motor: Converts electrical energy into mechanical energy; Commutator (split rings) reverses current direction in coil every half rotation, ensuring continuous unidirectional torque.",
          "Electromagnetic Induction & Fleming's Right-Hand Rule (Generators): Relative motion between coil and magnet induces EMF; Forefinger = Field, Thumb = Motion, Middle finger = Induced Current.",
          "Domestic Electric Circuits: Live wire (Red/Brown, $+220\\text{ V}$), Neutral wire (Black/Blue, $0\\text{ V}$), Earth wire (Green/Yellow, connected to metal plate deep in ground to prevent severe electric shock by safely discharging leakage current); Short circuit (Live and Neutral come into direct contact) vs Overloading (too many high-power appliances switched on simultaneously)."
        ]
      }
    ],
    "examTraps": [
      "Applying Fleming Left-Hand Rule to generators (Left-Hand rule is for MOTORS / force; Right-Hand rule is for GENERATORS / induced current).",
      "Confusing the Earth wire function: Earth wire does NOT conduct normal operating current; it is a safety path to ground that trips the fuse during metallic chassis insulation failure."
    ],
    "quickMentalCheck": "Why can two magnetic field lines never intersect each other? If they intersected, a compass needle placed at the intersection point would point simultaneously in two different directions, which is physically impossible.",
    "cueQuestions": [
      "How does an electric motor commutator (split rings) maintain continuous unidirectional rotational torque?",
      "Why is the magnetic field inside a current-carrying long solenoid completely uniform and parallel?",
      "What is the safety function of the green earth wire in high-power metal-bodied appliances like electric irons and refrigerators?"
    ],
    "workedExample": {
      "problem": "A positively charged alpha particle projected towards the west is deflected towards the north by a magnetic field. Determine the direction of the magnetic field using Fleming’s Left-Hand Rule.",
      "steps": [
        "1. Direction of motion of positive alpha particle is West $\\implies$ Direction of conventional electric current ($I$) is toward the West.",
        "2. The particle is deflected towards the North $\\implies$ Direction of mechanical Force ($F$) is toward the North.",
        "3. Apply Fleming’s Left-Hand Rule: Stretch the thumb, forefinger, and middle finger mutually perpendicular to each other.",
        "- Point the Thumb ($F$) toward the North.",
        "- Point the Middle finger ($I$) toward the West.",
        "- The Forefinger ($B$) automatically points vertically UPWARD (out of the plane of the paper)."
      ],
      "result": "\\text{Direction of Magnetic Field: Vertically Upward (Out of the Page)}"
    },
    "verificationProblem": "Check vector Lorentz cross product: $\\vec{F} = q(\\vec{v} \\times \\vec{B})$. If $\\vec{v} = -\\hat{i}$ (West) and $\\vec{B} = +\\hat{k}$ (Upward), then $\\vec{F} \\propto -\\hat{i} \\times \\hat{k} = +\\hat{j}$ (North). Exact match.",
    "realWorldUse": "Brushless DC electric vehicle traction motors, magnetic resonance imaging (MRI) superconducting solenoids, Residual Current Circuit Breakers (RCCB/MCB) in domestic consumer units.",
    "diagramType": "fleming-left-hand-rule-motor-action"
  },
  "CBSE-CH-G10-SCI-CH13": {
    "chapterTitle": "Our Environment",
    "subject": "Science",
    "grade": 10,
    "chapterNum": 13,
    "essentialLaw": "\\text{Biomagnification: Concentration of Non-Biodegradable Pesticide } (\\text{DDT}) \\uparrow \\text{ at Higher Trophic Levels} \\quad | \\quad \\text{Ozone: } \\text{O}_3 \\xrightarrow{\\text{CFC / Cl}^\\bullet} \\text{O}_2 + \\text{ClO}^\\bullet",
    "coreConcepts": [
      {
        "heading": "Ecosystem Components, Food Chains & 10% Energy Flow",
        "bullets": [
          "Ecosystem Structure: Biotic components (Producers / autotrophs, Consumers: herbivores, carnivores, omnivores; Decomposers: bacteria and fungi that recycle nutrients) + Abiotic components (temperature, rainfall, light, soil).",
          "Food Chains & Food Webs: Linear sequence of energy transfer; Interconnected network forms resilient Food Web.",
          "Trophic Levels & 10% Energy Law (Raymond Lindeman): Plants capture only $1\\%$ of incident solar energy; At each successive trophic level, only $10\\%$ of energy is converted into biomass and transferred; Remaining $90\\%$ is lost as metabolic heat and respiration; Limits food chains to 3-4 trophic levels.",
          "Biological Magnification (Biomagnification): Progressive increase in the concentration of non-biodegradable toxic substances (e.g., DDT, heavy metals like mercury) at successive trophic levels, with top carnivores/humans accumulating maximum concentration."
        ]
      },
      {
        "heading": "Ozone Layer Depletion & Waste Management",
        "bullets": [
          "Ozone Layer ($O_3$) in Stratosphere: Shields Earth surface from harmful solar Ultraviolet (UV-B) radiation (which causes skin cancer, cataracts, and immune suppression in humans).",
          "Ozone Formation & Destruction: $O_2 \\xrightarrow{UV} O + O$; $O + O_2 \\to O_3$; Depletion caused by Chlorofluorocarbons (CFCs) from refrigerants and fire extinguishers; Montreal Protocol ($1987$) froze global CFC production.",
          "Solid Waste Management: Biodegradable (broken down by biological saprophytic action, e.g., vegetable peels, paper, cattle dung) vs Non-biodegradable (cannot be broken down, e.g., single-use plastics, glass, polythene bags); Disposal methods: Composting, Vermicomposting, Incineration, Recycling, Sewage treatment."
        ]
      }
    ],
    "examTraps": [
      "Assuming plants capture $10\\%$ of total incident sunlight (plants capture only $1\\%$ of incident solar light energy; the $10\\%$ law applies ONLY to energy transfers between successive animal trophic levels).",
      "Thinking biomagnification decreases up the food chain (biomagnification INCREASES progressively up the chain, reaching peak toxicity in apex consumers)."
    ],
    "quickMentalCheck": "In a food chain consisting of Grass $\\to$ Grasshopper $\\to$ Frog $\\to$ Snake $\\to$ Peacock, which organism will accumulate the highest concentration of sprayed DDT? The Peacock (Apex consumer accumulates the highest concentration due to biomagnification).",
    "cueQuestions": [
      "Why are food chains in nature generally restricted to only three or four trophic levels?",
      "How does the catalytic chain reaction of Chlorofluorocarbons (CFCs) cause massive ozone layer depletion over Antarctica?",
      "What are the ecological advantages of using disposable paper kulhads over plastic cups on Indian railways?"
    ],
    "workedExample": {
      "problem": "If $10,000\\text{ Joules}$ of solar energy falls on green plants in a terrestrial ecosystem, calculate the amount of energy available to the lion in the food chain: Plants $\\to$ Deer $\\to$ Lion.",
      "steps": [
        "Step 1 (Incident Sunlight to Producers): Green plants capture only $1\\%$ of total incident solar energy: $E_{\\text{Plants}} = 1\\% \\times 10,000\\text{ J} = 0.01 \\times 10,000 = 100\\text{ J}$.",
        "Step 2 (Producers to Primary Consumers): Applying Lindeman’s $10\\%$ Law, deer receive $10\\%$ of plant energy: $E_{\\text{Deer}} = 10\\% \\times 100\\text{ J} = 0.10 \\times 100 = 10\\text{ J}$.",
        "Step 3 (Primary Consumers to Secondary Consumers): Lion receives $10\\%$ of deer energy: $E_{\\text{Lion}} = 10\\% \\times 10\\text{ J} = 0.10 \\times 10 = 1.0\\text{ J}$."
      ],
      "result": "\\text{Energy Available to Lion} = 1.0\\text{ Joule}"
    },
    "verificationProblem": "Check 2-step trophic reduction: $100\\text{ J} \\times (0.1)^2 = 1.0\\text{ J}$. Trophic energy transfer verified.",
    "realWorldUse": "Municipal solid waste segregation (dry vs wet waste), Montreal Protocol international treaty eliminating ozone-depleting substances, banning single-use microplastics.",
    "diagramType": "trophic-levels-energy-biomagnification-pyramid"
  },
  "CBSE-CH-G10-SOCSCI-CH01": {
    "chapterTitle": "The Rise of Nationalism in Europe",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 1,
    "essentialLaw": "\\text{European Nation-State Genesis: } \\text{Frédéric Sorrieu 1848 Vision} \\rightarrow \\text{Napoleonic Code (1804)} \\rightarrow \\text{Liberal Nationalism (Zollverein 1834)} \\rightarrow \\text{Unifications: Germany (Bismarck) + Italy (Cavour/Garibaldi)}",
    "coreConcepts": [
      {
        "heading": "French Revolution Legacy & Liberal Nationalism",
        "bullets": [
          "Frédéric Sorrieu's 1848 utopian print (*Democratic and Social Republics*) visualized peoples of the world marching past the Statue of Liberty as distinct nation-states.",
          "Napoleonic Code of 1804 (Civil Code): Abolished privileges based on birth, established equality before law, secured property rights, and simplified administrative divisions.",
          "Economic nationalism & *Zollverein* (1834 customs union initiated by Prussia): Abolished tariff barriers and reduced currencies from over 30 to 2, uniting economic territories."
        ]
      },
      {
        "heading": "Unification of Germany and Italy & The Balkan Tinderbox",
        "bullets": [
          "Unification of Germany (1871): Led by Prussian Chief Minister Otto von Bismarck using policy of \"Blood and Iron\"; three wars over 7 years (Denmark, Austria, France) culminated in Kaiser William I proclaimed Emperor at Versailles.",
          "Unification of Italy (1861): Giuseppe Mazzini (ideology/Young Italy), Count Cavour (diplomatic alliances), and Giuseppe Garibaldi (Red Shirts / Expedition of the Thousand); King Victor Emmanuel II crowned ruler.",
          "Nationalism in the Balkans: Ottoman decline and intense ethnic rivalries (Slavs) combined with Great Power imperial competition (Russia, Germany, Britain, Austro-Hungary), turning the region into a powder keg leading to World War I."
        ]
      }
    ],
    "examTraps": [
      "Assuming the Frankfurt Parliament of 1848 successfully unified Germany; King Friedrich Wilhelm IV of Prussia rejected the crown offered by the elected assembly, disbanding it.",
      "Confusing the female allegories: *Marianne* symbolized the French Republic (red cap, tricolor, cockade), while *Germania* symbolized the German nation (crown of oak leaves representing heroism)."
    ],
    "quickMentalCheck": "Which Prussian chief minister was the architect of German unification through his policy of \"Blood and Iron\"? (Answer: Otto von Bismarck).",
    "cueQuestions": [
      "What were the key progressive reforms and subsequent imperial drawbacks of the Napoleonic Civil Code of 1804?",
      "How did the customs union *Zollverein* of 1834 foster national economic integration across German-speaking states?",
      "Why did the Balkan region become the most serious source of nationalist tension in Europe after 1871?"
    ],
    "workedExample": {
      "problem": "Outline the roles played by Mazzini, Cavour, and Garibaldi in the unification of Italy.",
      "steps": [
        "Giuseppe Mazzini (The Ideologue): Formed underground societies (*Young Italy* in Marseilles, *Young Europe* in Berne) to propagate the concept of a unified republican Italy.",
        "Count Camillo de Cavour (The Diplomat): Prime Minister of Sardinia-Piedmont; engineered a clever diplomatic alliance with France to defeat Austrian forces in 1859.",
        "Giuseppe Garibaldi (The Military Hero): Led the \"Expedition of the Thousand\" (Red Shirts) into Southern Italy and Kingdom of the Two Sicilies, winning peasant support to overthrow Bourbon rulers.",
        "Outcome: Victor Emmanuel II was proclaimed King of United Italy in 1861."
      ],
      "result": "\\text{Mazzini (Vision)} + \\text{Cavour (Diplomacy)} + \\text{Garibaldi (Military Action)} = \\text{Unified Italy (1861)}"
    },
    "verificationProblem": "Verify that the Treaty of Constantinople of 1832 recognized Greece as an independent nation.",
    "realWorldUse": "Informs political theory of state sovereignty, international relations, diplomatic balance of power, and ethnic conflict analysis.",
    "diagramType": "european-nationalism-unification-flowchart"
  },
  "CBSE-CH-G10-SOCSCI-CH02": {
    "chapterTitle": "Nationalism in India",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 2,
    "essentialLaw": "\\text{Gandhian Mass Satyagraha: } \\text{Early (Champaran, Kheda, Ahmedabad 1917-18)} \\rightarrow \\text{Rowlatt/Jallianwala (1919)} \\rightarrow \\text{NCM (1920–22: Chauri Chaura)} \\rightarrow \\text{CDM (1930: Dandi Salt March)} \\rightarrow \\text{Poona Pact (1932)}",
    "coreConcepts": [
      {
        "heading": "Satyagraha, Rowlatt Act & Non-Cooperation Movement",
        "bullets": [
          "Satyagraha: Soul-force based on truth and non-violence; early experiments in Champaran (1917 - indigo), Kheda (1918 - revenue remission), and Ahmedabad (1918 - cotton mill wages).",
          "Rowlatt Act (1919) authorized detention without trial; led to Jallianwala Bagh Massacre (13 April 1919) ordered by General Dyer in Amritsar.",
          "Non-Cooperation-Khilafat Movement (1920–1922): Surrender of titles, boycott of civil services, courts, schools, and foreign goods; called off after violent Chauri Chaura incident (Feb 1922)."
        ]
      },
      {
        "heading": "Civil Disobedience, Salt March & Diverse Strands",
        "bullets": [
          "Differing strands: Tribal movement in Gudem Hills (Alluri Sitaram Raju used guerrilla warfare), peasant movement in Awadh (Baba Ramchandra), and plantation workers in Assam (Inland Emigration Act 1859).",
          "Civil Disobedience Movement (1930): Gandhi launched the Salt March (Dandi March: 240 miles from Sabarmati to Dandi, 12 March–6 April 1930) breaking salt monopoly law.",
          "Pacts and negotiations: Gandhi-Irwin Pact (1931), participation in Second Round Table Conference, and Poona Pact (Sept 1932) between Ambedkar and Gandhi securing reserved seats for Depressed Classes."
        ]
      }
    ],
    "examTraps": [
      "Confusing Non-Cooperation Movement (1920 - refusal to cooperate with colonial government) with Civil Disobedience Movement (1930 - active violation of unjust colonial laws like salt tax).",
      "Thinking the Poona Pact created separate electorates; it replaced separate electorates with reserved seats in joint electorates for the Depressed Classes."
    ],
    "quickMentalCheck": "On which date did Mahatma Gandhi reach Dandi and manufacture salt by boiling seawater, breaking the colonial salt law? (Answer: 6 April 1930).",
    "cueQuestions": [
      "How did Mahatma Gandhi transform the Indian national movement into a mass mobilization through the concept of Satyagraha?",
      "Why was \"Salt\" chosen by Gandhi as a powerful unifying symbol to launch the Civil Disobedience Movement in 1930?",
      "What were the crucial terms and historical significance of the 1932 Poona Pact between Dr. B.R. Ambedkar and Mahatma Gandhi?"
    ],
    "workedExample": {
      "problem": "Contrast the Non-Cooperation Movement (1920–22) with the Civil Disobedience Movement (1930–34) across scope, legal violation, and social participation.",
      "steps": [
        "Objective & Method: NCM aimed at Swaraj through passive refusal to cooperate (boycott of foreign cloth, courts, government schools); CDM aimed at complete independence by actively breaking colonial laws (salt law, forest laws, tax refusal).",
        "Legal Stance: NCM did not break established statutory laws initially; CDM started explicitly with the intentional violation of the Salt Law.",
        "Participation: NCM had massive Muslim participation via Khilafat alliance and intense urban middle-class involvement; CDM saw unprecedented mass participation of women and wealthy industrialist business classes (FICCI), but lower Muslim participation."
      ],
      "result": "\\text{NCM = Non-Cooperation/Boycott + High Khilafat Unity; CDM = Direct Law Violation + Mass Women Participation}"
    },
    "verificationProblem": "Verify that the resolution of \"Purna Swaraj\" (Complete Independence) was adopted at the Lahore Session of the Congress in December 1929 under Jawaharlal Nehru.",
    "realWorldUse": "Informs global non-violent civil resistance, social mobilization strategies, constitutional history, and civic activism.",
    "diagramType": "indian-national-movement-timeline"
  },
  "CBSE-CH-G10-SOCSCI-CH03": {
    "chapterTitle": "The Making of a Global World",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 3,
    "essentialLaw": "\\text{Global Economic Integration: } \\text{Pre-Modern Silk Routes} \\rightarrow \\text{19th c. Capital/Labour Migration (Indentured Labour)} \\rightarrow \\text{Great Depression (1929)} \\rightarrow \\text{Bretton Woods (1944: IMF & World Bank)}",
    "coreConcepts": [
      {
        "heading": "Pre-Modern Connectivity, Trade & Disease",
        "bullets": [
          "Silk Routes linked Asia with Europe and North Africa, facilitating exchange of Chinese silk/pottery, Indian spices, textiles, and precious metals.",
          "Food travel: Spaghetti traveled from Arab world to Sicily; potatoes, maize, tomatoes, and chillies introduced to Europe and Asia from the Americas.",
          "Biological conquest: European colonizers (Spanish) used smallpox germs as a devastating biological weapon against Native Americans who lacked natural immunity."
        ]
      },
      {
        "heading": "19th Century Economy, Great Depression & Bretton Woods",
        "bullets": [
          "Three flows in international economic exchange: Flow of trade (goods), flow of labor (indentured laborers from India/China to Caribbean and Fiji), and flow of capital.",
          "Great Depression (1929–1930s): Triggered by agricultural overproduction and US banking collapse; international trade halved, unemployment soared, Indian wheat prices fell 50%.",
          "Post-war settlement: Bretton Woods Conference (1944, New Hampshire, USA) established the International Monetary Fund (IMF) and World Bank (IBRD) to maintain monetary stability and rebuild war-torn economies."
        ]
      }
    ],
    "examTraps": [
      "Assuming indentured labor was voluntary, fair migration; it was described as a \"new system of slavery\" where recruiters used false promises and laborers faced harsh penal conditions.",
      "Confusing the Bretton Woods twins: IMF was created to deal with external surpluses and deficits of member nations, while the World Bank (IBRD) was created to finance post-war reconstruction."
    ],
    "quickMentalCheck": "Which devastating cattle disease introduced in the 1890s wiped out 90% of livestock in Africa, destroying local livelihoods and enabling European conquest? (Answer: Rinderpest / Cattle Plague).",
    "cueQuestions": [
      "How did the biological transmission of diseases like smallpox enable European conquest of the Americas without conventional warfare?",
      "What were the major causes and international repercussions of the 1929 Great Depression?",
      "Why were the International Monetary Fund (IMF) and the World Bank established at the 1944 Bretton Woods Conference?"
    ],
    "workedExample": {
      "problem": "Analyze how the introduction of Rinderpest (Cattle Plague) in the 1890s allowed European colonial powers to subjugate African populations.",
      "steps": [
        "Pre-colonial African economy: Abundant land and vast cattle herds allowed Africans to live self-sufficiently without working for wages.",
        "Disease introduction: British imported infected cattle from British Asia to feed Italian soldiers invading Eritrea.",
        "Devastation: Rinderpest spread across Africa like forest fire, killing 90% of cattle.",
        "Colonial subjugation: Loss of cattle destroyed pastoral livelihoods; Africans had no choice but to work for wages in European plantations and gold/diamond mines."
      ],
      "result": "\\text{Rinderpest Epidemic} \\rightarrow \\text{90\\% Cattle Death} \\rightarrow \\text{Destruction of Self-Sufficiency} \\rightarrow \\text{Forced Wage Labor Subjugation}"
    },
    "verificationProblem": "Verify that the Corn Laws in Britain were agricultural tariffs abolished in 1846, resulting in cheap food imports and rural outmigration.",
    "realWorldUse": "Informs globalization economics, multilateral trade institutions (WTO/IMF), international migration law, and global epidemiological history.",
    "diagramType": "global-trade-flows-bretton-woods"
  },
  "CBSE-CH-G10-SOCSCI-CH04": {
    "chapterTitle": "The Age of Industrialisation",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 4,
    "essentialLaw": "\\text{Industrialization Paradigm: } \\text{Proto-Industrialisation (Merchant-Craftsman Network)} \\rightarrow \\text{Steam & Factory System (Arkwright/Watt)} \\longleftrightarrow \\text{Colonial De-industrialisation & Indian Mills}",
    "coreConcepts": [
      {
        "heading": "Proto-Industrialisation & The Factory System",
        "bullets": [
          "Proto-industrialisation: Phase of industrialization before factories where merchants based in towns supplied raw material to rural artisan households for domestic production.",
          "Technological breakthroughs: James Hargreaves invented Spinning Jenny (1764); Richard Arkwright created the cotton mill; James Watt improved Thomas Newcomen's steam engine (patented 1781 with Matthew Boulton).",
          "Hand labor vs steam in Victorian Britain: British industrialists preferred hand labor for seasonal industries and intricate designs because labor was abundant and cheap."
        ]
      },
      {
        "heading": "Industrialisation in the Colonies: The Indian Context",
        "bullets": [
          "Decline of Indian handloom textiles: British East India Company appointed paid supervisors called *Gomasthas* to eliminate independent brokers and enforce bonded weaver contracts.",
          "Manchester imports: Import tariffs in Britain and duty-free British machine-made cotton dumped in India collapsed traditional weaving centers (Dhaka, Murshidabad).",
          "Early Indian industrial pioneers: Dwarkanath Tagore, Jamsetjee Jeejeebhoy, Dinshaw Petit, Jamsetji Tata (TISCO 1907); first cotton mill in Bombay (1854) and first jute mill in Bengal (1855)."
        ]
      }
    ],
    "examTraps": [
      "Assuming the factory was the beginning of all industrial production; the proto-industrial network produced massive goods for international markets well before factories.",
      "Confusing *Gomasthas* (paid colonial Company supervisors who clashed violently with weavers) with traditional Indian merchant brokers."
    ],
    "quickMentalCheck": "Where and in which year was the first successful modern cotton textile mill established in India? (Answer: Bombay, 1854).",
    "cueQuestions": [
      "What was \"Proto-industrialisation\" and how did it function across rural-urban networks before the advent of steam factories?",
      "Why did Victorian British industrialists not always rush to replace manual human hand labor with steam-powered machines?",
      "How did colonial British trade policies and the appointment of *Gomasthas* ruin the traditional Indian textile artisanal economy?"
    ],
    "workedExample": {
      "problem": "Trace the operational differences between the proto-industrial production network and the centralized factory system.",
      "steps": [
        "Proto-Industrial System: Decentralized production in scattered rural artisan cottages. A merchant bought wool from stapler, brought it to spinners, weavers, fullers, and finished it in London (*finishing center*). Controlled by independent craftspeople.",
        "Factory System: Centralized under one roof by factory owners (Richard Arkwright). All processes (spinning, weaving, dyeing) brought under direct management and machine surveillance.",
        "Productivity & Quality: Factory allowed strict quality control, disciplined wage labor, and exponential output increases through steam power."
      ],
      "result": "\\text{Proto: Decentralized Rural Cottages} \\longrightarrow \\text{Factory: Centralized Steam-Powered Assembly}"
    },
    "verificationProblem": "Verify that Indian industrial production grew rapidly during World War I because British mills were engaged in war production, leaving home markets open to Indian mills.",
    "realWorldUse": "Informs manufacturing supply chain economics, industrial labor laws, technological disruption analysis, and trade tariff policies.",
    "diagramType": "proto-to-factory-industrial-cycle"
  },
  "CBSE-CH-G10-SOCSCI-CH05": {
    "chapterTitle": "Print Culture and the Modern World",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 5,
    "essentialLaw": "\\text{Print Revolution: } \\text{Woodblock (China/Marco Polo)} \\rightarrow \\text{Gutenberg Moveable Type (Mainz 1448)} \\rightarrow \\text{Protestant Reformation (Martin Luther 1517)} \\rightarrow \\text{Vernacular Press Act 1878 (India)}",
    "coreConcepts": [
      {
        "heading": "Evolution of Print Technology: East to West",
        "bullets": [
          "Woodblock printing originated in China, Japan, and Korea (hand-printed accordion books); Marco Polo brought woodblock printing knowledge to Italy from China in 1295.",
          "Johannes Gutenberg developed the first mechanical moveable metal-type printing press in Mainz, Germany (1448); the first book printed was the Gutenberg Bible (180 copies).",
          "Print Revolution: Drastically reduced book production costs and time, transforming a hearing public into a reading public and enabling rapid dissemination of radical ideas."
        ]
      },
      {
        "heading": "Religious Reform, French Revolution & Print in India",
        "bullets": [
          "Protestant Reformation: In 1517, Martin Luther wrote *Ninety-Five Theses* criticizing Roman Catholic corruptions; Luther stated, \"Printing is the ultimate gift of God and the greatest one.\"",
          "Print culture debate: Historians argue print created the conditions for the French Revolution by popularizing Enlightenment critical thinking (Voltaire, Rousseau).",
          "Print in India: Portuguese missionaries brought the first printing press to Goa (mid-16th century); James Augustus Hickey published first weekly newspaper *Bengal Gazette* (1780); Vernacular Press Act (1878, Lord Lytton) clamped censorship on Indian language press."
        ]
      }
    ],
    "examTraps": [
      "Assuming the printing press immediately made handwritten manuscripts obsolete; luxury manuscript copying continued for decades alongside early printed incunabula.",
      "Overlooking that the Vernacular Press Act of 1878 was directly modeled on the repressive Irish Press Laws to censor nationalist criticism."
    ],
    "quickMentalCheck": "Who brought the knowledge of woodblock printing back to Europe from China in the year 1295? (Answer: Marco Polo).",
    "cueQuestions": [
      "How did Johannes Gutenberg adapt wine-press technology to invent the moveable type printing press in Mainz?",
      "How did print culture catalyze Martin Luther's Protestant Reformation across 16th-century Europe?",
      "Why did the British colonial administration enact the Vernacular Press Act of 1878, and what were its repressive powers?"
    ],
    "workedExample": {
      "problem": "Analyze the connection between print culture, public debate, and the intellectual origins of the French Revolution.",
      "steps": [
        "Popularization of Enlightenment ideas: Books by Voltaire and Rousseau widely read; argued that everything must be judged through reason and rationality rather than blind religious dogma.",
        "Culture of dialogue and debate: Public coffee houses and reading clubs became forums where royal authority, monarchy privileges, and traditional social orders were critically questioned.",
        "Anti-monarchy literature & satire: Cartoons and pamphlets mocked the decadent lifestyle of royalty while common people starved, creating mental preparedness for revolutionary uprising."
      ],
      "result": "\\text{Enlightenment Books} + \\text{Public Reading Circles} + \\text{Political Satire} = \\text{Intellectual Spark for 1789}"
    },
    "verificationProblem": "Verify that Raja Ram Mohan Roy published the *Sambad Kaumudi* from 1821 to campaign against the practice of Sati.",
    "realWorldUse": "Informs free speech constitutional law, journalism ethics, digital information revolution analysis, and media censorship jurisprudence.",
    "diagramType": "print-revolution-dissemination-network"
  },
  "CBSE-CH-G10-SOCSCI-CH06": {
    "chapterTitle": "Resources and Development",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 6,
    "essentialLaw": "\\text{Resource Planning Matrix: } \\text{Identification & Survey} \\rightarrow \\text{Planning Structure (Technology/Skill)} \\rightarrow \\text{Matching National Plans} \\quad | \\quad \\text{Rio Summit 1992 (Agenda 21)} \\quad | \\quad \\text{Soil Zonation}",
    "coreConcepts": [
      {
        "heading": "Classification of Resources & Sustainable Development",
        "bullets": [
          "Classification: On origin (Biotic/Abiotic), exhaustibility (Renewable/Non-Renewable), ownership (Individual, Community, National, International), status of development (Potential, Developed, Stock, Reserves).",
          "Sustainable Development: Development that meets present needs without compromising the ability of future generations to meet their own needs.",
          "Rio de Janeiro Earth Summit (1992): Adopted *Agenda 21* to combat environmental degradation, poverty, and disease through global cooperation."
        ]
      },
      {
        "heading": "Land Degradation, Conservation & Major Soil Types of India",
        "bullets": [
          "Causes of land degradation: Mining and quarrying (Jharkhand, Odisha), overgrazing (Gujarat, Rajasthan), and over-irrigation causing salinity/alkalinity (Punjab, Haryana).",
          "Alluvial Soil: Most widespread and fertile; divided into old *Bhangar* (high kankar) and new *Khadar* (silt rich in potash, phosphoric acid, and lime).",
          "Other major soils: Black / Regur Soil (basalt lava, rich in clay, ideal for cotton), Red and Yellow Soil (iron diffusion), Laterite Soil (intense tropical leaching, Cashew nuts), Arid Soil, and Forest / Mountain Soil."
        ]
      }
    ],
    "examTraps": [
      "Confusing \"Stock\" (materials with potential to satisfy human needs but humans lack technology to access, e.g., extracting hydrogen from water) with \"Reserves\" (subset of stock accessible with existing tech but held for future use).",
      "Assuming over-irrigation always improves land productivity; in Punjab and Haryana, over-irrigation leads to waterlogging and soil salinization."
    ],
    "quickMentalCheck": "Which soil type is also known as \"Regur Soil\" and has high moisture retention capacity, ideal for cotton cultivation? (Answer: Black Soil).",
    "cueQuestions": [
      "What are the three essential multi-tiered stages of Resource Planning in a diverse developing nation like India?",
      "How does land degradation in mining states (Jharkhand) differ fundamentally from that in intensively irrigated states (Punjab)?",
      "What are the distinct pedological characteristics and geographical distributions of Alluvial and Laterite soils in India?"
    ],
    "workedExample": {
      "problem": "Break down the three sequential steps involved in Resource Planning in India.",
      "steps": [
        "Step 1 (Survey & Mapping): Identification and inventory of resources through extensive surveying, geological mapping, and qualitative/quantitative estimation.",
        "Step 2 (Institutional Planning): Evolving a planning structure equipped with appropriate technology, skilled manpower, and institutional setups.",
        "Step 3 (National Integration): Matching resource development plans with overall national five-year / development plans."
      ],
      "result": "\\text{Step 1: Survey/Inventory} \\longrightarrow \\text{Step 2: Technology/Institutions} \\longrightarrow \\text{Step 3: National Alignment}"
    },
    "verificationProblem": "Verify that terrace farming, contour ploughing, and planting shelter belts are effective methods for preventing soil erosion.",
    "realWorldUse": "Informs national land-use zoning policies, sustainable mining regulation, agricultural soil health cards, and environmental impact assessments (EIA).",
    "diagramType": "india-soils-classification-map"
  },
  "CBSE-CH-G10-SOCSCI-CH07": {
    "chapterTitle": "Forest and Wildlife Resources",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 7,
    "essentialLaw": "\\text{Conservation Classification (IUCN): } \\text{Normal} \\rightarrow \\text{Endangered} \\rightarrow \\text{Vulnerable} \\rightarrow \\text{Rare} \\rightarrow \\text{Endemic} \\rightarrow \\text{Extinct} \\quad | \\quad \\text{Reserved vs Protected vs Unclassed Forests}",
    "coreConcepts": [
      {
        "heading": "Biodiversity Classification and Threats",
        "bullets": [
          "IUCN Categories: Endangered (in danger of extinction e.g., Blackbuck, Indian wild ass), Vulnerable (declining population likely to become endangered e.g., Blue sheep, Gangetic dolphin), Rare (small population), Endemic (found only in isolated zones e.g., Nicobar pigeon), Extinct (Asiatic cheetah declared extinct in India 1952).",
          "Causes of biodiversity depletion: Large-scale colonial timber extraction, agricultural expansion, multipurpose river valley projects (Narmada Sagar submergence), mining, and forest fires.",
          "Himalayan Yew (*Taxus wallachiana*): Medicinal plant yielding \"Taxol\" (anti-cancer drug); facing severe over-exploitation in Himachal and Arunachal Pradesh."
        ]
      },
      {
        "heading": "Forest Governance & Community Conservation",
        "bullets": [
          "Administrative classification: Reserved Forests ($> 50\\%$ of total forest area, permanently earmarked for timber/wildlife), Protected Forests ($1/3\\text{rd}$ of total forest, protected from further depletion), and Unclassed Forests (managed by communities/private individuals in NE India).",
          "Community conservation movements: *Chipko Movement* in Himalayas (hugging trees to prevent felling), *Beej Bachao Andolan* in Tehri (reviving indigenous crop seeds without synthetic chemicals).",
          "Joint Forest Management (JFM): Formally started in Odisha (1988); local village institutions manage degraded forests in return for non-timber forest produce and share in timber harvest."
        ]
      }
    ],
    "examTraps": [
      "Confusing \"Endemic species\" (restricted naturally to a specific unique geographical region, e.g., Andaman teal) with \"Endangered species\" (at immediate risk of global extinction).",
      "Assuming JFM is purely a government department program; it is a collaborative co-management partnership between village communities and state forest departments."
    ],
    "quickMentalCheck": "In which year was the Asiatic Cheetah officially declared extinct in India? (Answer: 1952).",
    "cueQuestions": [
      "How does the IUCN categorize species based on population viability and extinction risk?",
      "What are the legal and administrative distinctions between Reserved Forests, Protected Forests, and Unclassed Forests?",
      "How did the Joint Forest Management (JFM) resolution of 1988 empower local communities in forest regeneration?"
    ],
    "workedExample": {
      "problem": "Analyze how traditional community beliefs and Sacred Groves (*Deorai / Sarnas*) have contributed to ecological conservation in India.",
      "steps": [
        "Definition: Sacred groves are virgin forest patches left untouched by local tribal and rural communities due to religious protection and taboos.",
        "Examples: Mundas and Santhals of Chota Nagpur worship Mahua and Kadamba trees; Bishnois of Rajasthan fiercely protect Blackbucks, Nilgai, and Khejri trees.",
        "Ecological significance: Preserves rare and endemic gene pools, prevents soil erosion, and protects perennial freshwater springs from destruction."
      ],
      "result": "\\text{Sacred Groves} \\xrightarrow{\\text{Cultural Taboos}} \\text{Preservation of Pristine Biodiversity & Gene Pools}"
    },
    "verificationProblem": "Verify that the Indian Wildlife (Protection) Act was enacted in 1972, establishing national bans on hunting and legal protection for habitats.",
    "realWorldUse": "Informs global IUCN Red List protocols, community-based forest co-management, indigenous land rights, and wildlife corridor planning.",
    "diagramType": "iucn-species-classification-pyramid"
  },
  "CBSE-CH-G10-SOCSCI-CH08": {
    "chapterTitle": "Water Resources",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 8,
    "essentialLaw": "\\text{Water Resource Management: } \\text{Water Stress } (< 1000\\text{ m}^3/\\text{person/year}) \\longleftrightarrow \\text{Multipurpose Dams: \"Temples of Modern India\" (Nehru)} \\longleftrightarrow \\text{Rainwater Harvesting}",
    "coreConcepts": [
      {
        "heading": "Water Scarcity and Multipurpose River Projects",
        "bullets": [
          "Water scarcity causes: Rapid population growth, intensive commercial agriculture (over-exploitation of tube wells dropping water tables), industrial pollution, and unequal access.",
          "Multipurpose projects: Combine flood control, irrigation, electricity generation, inland navigation, and fish breeding; Jawaharlal Nehru proclaimed dams as the \"Temples of Modern India\".",
          "Major dams: Bhakra Nangal (Sutlej-Beas), Hirakud (Mahanadi - flood control), Sardar Sarovar (Narmada), Tehri Dam (Bhagirathi)."
        ]
      },
      {
        "heading": "Critique of Large Dams & Traditional Rainwater Harvesting",
        "bullets": [
          "Ecological & social opposition: Displacement of indigenous communities, submergence of pristine forests, siltation of reservoirs, seismic hazards, and interstate disputes (Cauvery, Krishna-Godavari).",
          "Narmada Bachao Andolan led by Medha Patkar mobilized against submergence and lack of tribal rehabilitation for Sardar Sarovar Dam.",
          "Traditional Rainwater Harvesting systems: *Guls* and *Kuls* (diversion channels in Western Himalayas), *Khadins* and *Johads* (rain-fed storage structures in Rajasthan), Bamboo Drip Irrigation (Meghalaya), and mandatory rooftop rainwater harvesting in Tamil Nadu."
        ]
      }
    ],
    "examTraps": [
      "Assuming water scarcity occurs only in dry desert regions; highly urbanized and industrial areas suffer severe economic water scarcity due to contamination and over-extraction.",
      "Overlooking that Tamil Nadu is the first state in India to make rooftop rainwater harvesting compulsory for all houses by law."
    ],
    "quickMentalCheck": "Who described multipurpose river valley dams as the \"Temples of Modern India\"? (Answer: Jawaharlal Nehru).",
    "cueQuestions": [
      "What are the primary factors causing severe freshwater stress in rapidly industrializing agricultural regions of India?",
      "Why have large multipurpose dam projects faced intense protests from environmentalists and displaced tribal communities?",
      "How does the traditional bamboo drip irrigation system of Meghalaya efficiently irrigate betel leaf and black pepper crops?"
    ],
    "workedExample": {
      "problem": "Explain the working mechanism of traditional rooftop rainwater harvesting (*Tanka*) in the arid regions of Rajasthan.",
      "steps": [
        "Catchment: Sloping roofs of houses act as the catchment surface for seasonal rainwater.",
        "Conveyance: Water flows down through connected drain pipes with an initial flush valve to wash away dust.",
        "Storage (*Tanka*): Water is stored in large, underground covered chambers constructed inside the main house or courtyard.",
        "Thermal benefit: The underground tank cools the surrounding rooms during intense summer heat, providing potable drinking water throughout the dry season."
      ],
      "result": "\\text{Sloping Roof} \\xrightarrow{\\text{Pipes/First Flush}} \\text{Underground Tanka (Year-round Potable Water + Cooling)}"
    },
    "verificationProblem": "Verify that the Hirakud Dam on the Mahanadi River in Odisha is one of the longest earthen dams in the world.",
    "realWorldUse": "Informs urban water resilience planning, municipal rainwater harvesting mandates, aquifer recharge engineering, and interstate water dispute arbitration.",
    "diagramType": "rainwater-harvesting-tanka-diagram"
  },
  "CBSE-CH-G10-SOCSCI-CH09": {
    "chapterTitle": "Agriculture",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 9,
    "essentialLaw": "\\text{Agrarian Cropping Cycles: } \\text{Kharif (Monsoon: Rice, Cotton, Maize)} \\longleftrightarrow \\text{Rabi (Winter: Wheat, Mustard, Gram)} \\longleftrightarrow \\text{Zaid (Summer: Watermelon, Cucumber)} \\quad | \\quad \\text{Green Revolution & Institutional Reforms}",
    "coreConcepts": [
      {
        "heading": "Farming Systems & Three Cropping Seasons",
        "bullets": [
          "Types of Farming: Primitive Subsistence (slash-and-burn / *Jhumming*), Intensive Subsistence (high labor and biochemical inputs on small landholdings), and Commercial Farming / Plantations (single crop on large estate e.g., Tea in Assam, Coffee in Karnataka).",
          "Kharif Season: Sown with onset of monsoon (June/July) and harvested in Sept/Oct (Rice, Maize, Jowar, Bajra, Cotton, Jute, Groundnut).",
          "Rabi Season: Sown in winter (Oct–Dec) and harvested in summer (April–June) (Wheat, Barley, Peas, Gram, Mustard); Zaid: Short summer season between Rabi and Kharif (Watermelon, Muskmelon, Cucumber)."
        ]
      },
      {
        "heading": "Major Crops, Technological Reforms & Bhoodan",
        "bullets": [
          "Major food crops: Rice (requires $> 25^\\circ C$, high humidity, $> 100 \\text{ cm}$ rain), Wheat (cool growing season, bright sunshine, $50–75 \\text{ cm}$ rain), Millets (Jowar, Bajra, Ragi - rich in iron/calcium).",
          "Commercial & fiber crops: Sugarcane, Tea, Coffee (Arabica variety brought from Yemen to Baba Budan Hills), Cotton (Black soil, 210 frost-free days), Jute (\"golden fiber\").",
          "Institutional reforms: Land consolidation, abolition of Zamindari, Kisan Credit Card (KCC), Personal Accident Insurance Scheme (PAIS), Minimum Support Price (MSP), and Vinoba Bhave's voluntary *Bhoodan-Gramdan* movement (\"Bloodless Revolution\")."
        ]
      }
    ],
    "examTraps": [
      "Confusing Kharif and Rabi crops: Wheat and Mustard are Rabi (winter) crops; Rice and Cotton are Kharif (monsoon) crops.",
      "Assuming Jhumming is practiced in the same plot continuously; plots are cleared, cultivated for 2–3 years, and then abandoned to allow natural forest regeneration."
    ],
    "quickMentalCheck": "Which Indian state is the largest producer of ragi and coffee (originating from the Baba Budan Hills)? (Answer: Karnataka).",
    "cueQuestions": [
      "What are the distinct climatic, temperature, and rainfall requirements for the cultivation of Rice versus Wheat in India?",
      "How do the three cropping seasons (Kharif, Rabi, Zaid) optimize agricultural land utilization throughout the annual calendar?",
      "What institutional and technological reforms were introduced by the government to modernize Indian agriculture?"
    ],
    "workedExample": {
      "problem": "Compare the optimal growing conditions, major producing states, and harvest calendars of Rice and Wheat in India.",
      "steps": [
        "Rice (Kharif): Requires high temperature ($> 25^\\circ C$), high humidity, and heavy rainfall ($> 100 \\text{ cm}$ or canal irrigation). Major states: West Bengal, UP, Punjab, Andhra. Sown: June/July; Harvest: Oct/Nov.",
        "Wheat (Rabi): Requires cool growing season ($10–15^\\circ C$), bright sunshine at ripening ($20–25^\\circ C$), and moderate rainfall ($50–75 \\text{ cm}$). Major states: UP, Punjab, Haryana, MP. Sown: Oct/Nov; Harvest: March/April.",
        "Soil preference: Rice thrives in alluvial clayey soil; Wheat requires well-drained fertile loamy soil."
      ],
      "result": "\\text{Rice: Kharif, Hot/Wet, Clayey; Wheat: Rabi, Cool/Dry, Well-drained Loam}"
    },
    "verificationProblem": "Verify that Jute is known as the \"Golden Fiber\", losing market share to synthetic nylon and plastic packaging due to high production costs.",
    "realWorldUse": "Informs agricultural price support mechanisms (MSP), national food security buffer stocking (FCI), crop insurance schemes, and rural credit planning.",
    "diagramType": "cropping-seasons-and-crops-cycle"
  },
  "CBSE-CH-G10-SOCSCI-CH10": {
    "chapterTitle": "Minerals and Energy Resources",
    "subject": "Social Science",
    "grade": 10,
    "chapterNum": 10,
    "essentialLaw": "\\text{Mineral Deposits & Energy Matrix: } \\text{Ferrous (Iron/Manganese)} + \\text{Non-Ferrous (Bauxite/Copper)} + \\text{Non-Metallic (Mica)} \\quad | \\quad \\text{Conventional (Coal, Petroleum)} \\longleftrightarrow \\text{Non-Conventional (Solar, Wind, Nuclear, Biogas)}",
    "coreConcepts": [
      {
        "heading": "Mode of Occurrence and Metallic/Non-Metallic Minerals",
        "bullets": [
          "Occurrence of minerals: In cracks/faults of igneous/metamorphic rocks (veins and lodes e.g., copper, zinc), sedimentary beds/layers (coal, iron ore), residual weathered mass (bauxite), and alluvial placer deposits in valley sands (gold, platinum).",
          "Iron Ore: Backbone of industrial development; Magnetite (highest quality, $70\\%$ iron, magnetic properties) and Hematite ($50–60\\%$ iron). Major belts: Odisha-Jharkhand, Durg-Bastar-Chandrapur (Bailadila), Ballari-Chitradurga-Chikkamagaluru (Kudremukh), and Maharashtra-Goa.",
          "Bauxite (aluminium ore formed in Amarkantak/Maikal hills), Copper (Khetri in Rajasthan, Balaghat in MP), and Mica (Koderma-Gaya-Hazaribagh belt in Jharkhand - excellent dielectric strength for electronics)."
        ]
      },
      {
        "heading": "Energy Resources: Conventional vs Non-Conventional",
        "bullets": [
          "Coal: Most abundant fossil fuel; Anthracite (highest grade hard coal), Bituminous (commercial/metallurgical coal), Lignite (brown coal in Neyveli, Tamil Nadu), and Peat. Formed in Gondwana (200m years old: Damodar valley, Jharia, Raniganj) and Tertiary (55m years old: Assam, Meghalaya) deposits.",
          "Petroleum & Natural Gas: Mumbai High, Gujarat (Ankleshwar), and Assam (Digboi - oldest oil field); Natural gas transported via pipelines (HVJ pipeline) and discovered in Krishna-Godavari basin.",
          "Non-conventional energy: Nuclear power (Uranium in Jharkhand, Monazite sands in Kerala containing Thorium; plants at Tarapur, Rawatbhata, Kudankulam, Kaiga, Narora, Kalpakkam), Solar energy, Wind energy (Muppandal in Tamil Nadu and Jaisalmer), Biogas (*Gobar gas*), Tidal, and Geothermal energy (Parvati valley in Manikaran, Puga valley in Ladakh)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Magnetite (highest grade $70\\%$ iron with magnetic properties) with Hematite ($50–60\\%$ iron, most important industrial ore by volume consumed).",
      "Confusing Gondwana coal (metallurgical coal in Damodar valley) with Tertiary coal (younger, high-moisture/sulfur coal in Northeast India)."
    ],
    "quickMentalCheck": "Which is the oldest oil-producing field in India located in the state of Assam? (Answer: Digboi).",
    "cueQuestions": [
      "What are the geological modes of occurrence of minerals across igneous, sedimentary, and metamorphic rock formations?",
      "What are the distinct characteristics and geographical locations of Gondwana versus Tertiary coal fields in India?",
      "Why is the transition from conventional fossil fuels to non-conventional renewable energy sources vital for India's sustainable growth?"
    ],
    "workedExample": {
      "problem": "Compare the four major types of coal found in India based on carbon content, heat output, and industrial applications.",
      "steps": [
        "Anthracite: Highest quality hard coal ($> 80\\%$ carbon); burns with intense heat and no smoke; scarce in India (found in small pockets of Jammu & Kashmir).",
        "Bituminous: Most widely used commercial coal ($60–80\\%$ carbon); metallurgical grade used for smelting iron in blast furnaces (Damodar Valley, Jharia, Bokaro, Raniganj).",
        "Lignite: Low-grade brown coal ($40–55\\%$ carbon); soft with high moisture content; used primarily for thermal power generation in Neyveli (Tamil Nadu).",
        "Peat: Decaying organic plant matter ($< 40\\%$ carbon); low heat capacity, high moisture, and produces heavy smoke."
      ],
      "result": "\\text{Anthracite (Highest/Hard)} \\rightarrow \\text{Bituminous (Metallurgical/Smelting)} \\rightarrow \\text{Lignite (Thermal/Neyveli)} \\rightarrow \\text{Peat (Low Heat)}"
    },
    "verificationProblem": "Verify that Kudremukh iron ore deposits in Karnataka are known to be one of the largest in the world, transported as slurry via pipeline to Mangaluru port.",
    "realWorldUse": "Informs national critical minerals strategies, clean energy transition roadmaps, nuclear power site licensing, and heavy industrial metallurgy.",
    "diagramType": "india-minerals-and-energy-map"
  }
};
