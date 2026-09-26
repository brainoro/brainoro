/**
 * Brainoro Authoritative Curriculum Knowledge Registry
 * File: grade11_science.ts
 * Total Chapters: 64
 */

import { DeterministicChapterKnowledge } from '../../services/deterministicChapterRegistry';

export const GRADE11_SCIENCE_KNOWLEDGE: Record<string, DeterministicChapterKnowledge> = {
  "CBSE-CH-G11-PHY-CH01": {
    "chapterTitle": "Units and Measurements",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 1,
    "essentialLaw": "[Q] = M^a L^b T^c \\quad | \\quad \\frac{\\Delta Z}{Z} = a\\frac{\\Delta A}{A} + b\\frac{\\Delta B}{B} + c\\frac{\\Delta C}{C} \\; \\left(\\text{For } Z = \\frac{A^a B^b}{C^c}\\right)",
    "coreConcepts": [
      {
        "heading": "SI Base Units, Dimensional Analysis & Principle of Homogeneity",
        "bullets": [
          "Seven SI Base Units: Length (m), Mass (kg), Time (s), Electric Current (A), Temperature (K), Amount of Substance (mol), Luminous Intensity (cd); Two supplementary units: Radian (rad) and Steradian (sr).",
          "Principle of Homogeneity: In any physically valid equation, every term added or subtracted must have identical dimensional formulas ($[LHS] = [RHS]$).",
          "Applications of Dimensional Analysis: Checking equation correctness, deducing empirical formulas connecting variables, converting units between systems."
        ]
      },
      {
        "heading": "Significant Figures, Error Propagation & Accuracy vs Precision",
        "bullets": [
          "Significant Figures Rules: All non-zero digits are significant; Trailing zeroes without decimal are non-significant; Trailing zeroes after decimal are significant.",
          "Addition/Subtraction: Result rounded to least decimal places; Multiplication/Division: Result rounded to least significant figures.",
          "Error Analysis: Absolute error $\\Delta a = |a_{\\text{mean}} - a_i|$; Relative error $\\frac{\\Delta a}{a}$; Percentage error $\\frac{\\Delta a}{a} \\times 100\\%$.",
          "Power Law Error Propagation: For $Z = A^p B^q / C^r$, maximum fractional error is $\\frac{\\Delta Z}{Z} = p\\frac{\\Delta A}{A} + q\\frac{\\Delta B}{B} + r\\frac{\\Delta C}{C}$."
        ]
      }
    ],
    "examTraps": [
      "Subtracting fractional errors when variables are in the denominator (errors ALWAYS add up in worst-case error analysis).",
      "Confusing significant figures with number of decimal places during multiplication."
    ],
    "quickMentalCheck": "If $X = A^2 B^3 / \\sqrt{C}$ with percentage errors in $A, B, C$ being $1\\%, 2\\%, 4\\%$, what is total error in $X$? $\\Delta X/X = 2(1\\%) + 3(2\\%) + 0.5(4\\%) = 2 + 6 + 2 = 10\\%$.",
    "cueQuestions": [
      "How does the Principle of Homogeneity test the dimensional consistency of physics equations?",
      "Why cannot dimensional analysis determine dimensionless proportionality constants or trigonometric functions?",
      "What is the fundamental difference between systematic errors and random errors?"
    ],
    "workedExample": {
      "problem": "The period of oscillation of a simple pendulum is $T = 2\\pi\\sqrt{L/g}$. Measured value of $L$ is $20.0\\text{ cm}$ known to $1\\text{ mm}$ accuracy and time for 100 oscillations of the pendulum is found to be $90\\text{ s}$ using a wrist watch of $1\\text{ s}$ resolution. What is the percentage accuracy in the determination of $g$?",
      "steps": [
        "Rearrange formula for $g$: $g = 4\\pi^2 \\frac{L}{T^2}$.",
        "Fractional error in $g$: $\\frac{\\Delta g}{g} = \\frac{\\Delta L}{L} + 2\\frac{\\Delta T}{T} = \\frac{\\Delta L}{L} + 2\\frac{\\Delta t}{t}$ (since $\\Delta T/T = \\Delta t/t$).",
        "Given: $L = 20.0\\text{ cm} = 200\\text{ mm}, \\Delta L = 1\\text{ mm} \\implies \\frac{\\Delta L}{L} = \\frac{1}{200} = 0.005$.",
        "Given: $t = 90\\text{ s}, \\Delta t = 1\\text{ s} \\implies 2\\frac{\\Delta t}{t} = 2\\left(\\frac{1}{90}\\right) = \\frac{2}{90} \\approx 0.0222$.",
        "Total percentage error: $\\frac{\\Delta g}{g} \\times 100\\% = (0.005 + 0.0222) \\times 100\\% = 2.72\\% \\approx 3\\%$."
      ],
      "result": "\\text{Percentage Error in } g = 2.72\\% \\approx 3\\%"
    },
    "verificationProblem": "Check dominant error term: Time measurement contributes $2.22\\%$ while length contributes $0.5\\%$, confirming that timing error dominates. Arithmetic verified.",
    "realWorldUse": "Calibration standards at NIST/NPL, vernier caliper and screw gauge metrology in aerospace machining, sensor tolerance budgeting.",
    "diagramType": "error-propagation-flowchart"
  },
  "CBSE-CH-G11-PHY-CH02": {
    "chapterTitle": "Motion in a Straight Line",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 2,
    "essentialLaw": "v = u + at \\quad | \\quad s = ut + \\frac{1}{2}at^2 \\quad | \\quad v^2 = u^2 + 2as \\quad | \\quad s_n = u + \\frac{a}{2}(2n-1)",
    "coreConcepts": [
      {
        "heading": "Kinematics: Displacement, Velocity & Acceleration",
        "bullets": [
          "Position-time, velocity-time, and acceleration-time kinematics: $v = \\frac{dx}{dt}$, $a = \\frac{dv}{dt} = v\\frac{dv}{dx}$.",
          "Graphical interpretations: Slope of $x-t$ graph gives velocity; Slope of $v-t$ graph gives acceleration; Area under $v-t$ graph gives displacement $\\Delta x = \\int v dt$.",
          "Uniformly Accelerated Motion: Derivation of standard kinematic equations using calculus and graphical methods."
        ]
      },
      {
        "heading": "Free Fall under Gravity & Relative Velocity in 1D",
        "bullets": [
          "Motion under gravity: $a = -g = -9.8\\text{ m/s}^2$; Time of flight $T = \\frac{2u}{g}$; Maximum height $H = \\frac{u^2}{2g}$; Velocity upon returning to launch level $v = -u$.",
          "Displacement in $n^{\\text{th}}$ second: $s_n = u + \\frac{a}{2}(2n - 1)$.",
          "Relative velocity in one dimension: $v_{BA} = v_B - v_A$ (Velocity of object $B$ relative to frame of object $A$)."
        ]
      }
    ],
    "examTraps": [
      "Confusing average speed (Total Distance / Total Time) with magnitude of average velocity (Displacement / Time).",
      "Sign errors in vertical projection: taking $g$ as positive while velocity is upward without establishing consistent coordinate axes."
    ],
    "quickMentalCheck": "A ball is thrown upward with $20\\text{ m/s}$ ($g=10\\text{ m/s}^2$). What is its maximum height and time to reach it? $t = u/g = 2\\text{ s}$; $H = u^2/2g = 400/20 = 20\\text{ m}$.",
    "cueQuestions": [
      "Why can average speed never be less than the magnitude of average velocity?",
      "How does the area under an acceleration-time graph represent the change in velocity?",
      "What is the physical meaning of negative slope on a velocity-time graph?"
    ],
    "workedExample": {
      "problem": "A ball is thrown vertically upwards with a velocity of $20\\text{ m/s}$ from the top of a multistorey building of height $25.0\\text{ m}$. How high will the ball rise, and how long will it take to hit the ground? (Take $g = 10\\text{ m/s}^2$).",
      "steps": [
        "Height reached above roof: $h = \\frac{u^2}{2g} = \\frac{20^2}{2(10)} = 20\\text{ m}$. Total height from ground $= 25 + 20 = 45\\text{ m}$.",
        "Total displacement when hitting ground: $y = -25\\text{ m}$ (taking roof as origin, upwards positive).",
        "Apply $y = ut - \\frac{1}{2}gt^2 \\implies -25 = 20t - 5t^2 \\implies 5t^2 - 20t - 25 = 0 \\implies t^2 - 4t - 5 = 0$.",
        "Factorize: $(t - 5)(t + 1) = 0$. Since time must be positive, $t = 5\\text{ s}$."
      ],
      "result": "H_{\\text{max}} = 45\\text{ m} \\text{ (from ground)}, \\quad t = 5.0\\text{ s}"
    },
    "verificationProblem": "Check time of ascent ($2\\text{ s}$) + time of descent from $45\\text{ m}$ ($t = \\sqrt{2H/g} = \\sqrt{90/10} = 3\\text{ s}$): $2 + 3 = 5\\text{ s}$. Verified.",
    "realWorldUse": "High-speed elevator acceleration profiling, automotive emergency braking distance calculations, railway signal interval spacing.",
    "diagramType": "kinematics-vt-graph-displacement"
  },
  "CBSE-CH-G11-PHY-CH03": {
    "chapterTitle": "Motion in a Plane",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 3,
    "essentialLaw": "R = \\frac{u^2 \\sin 2\\theta}{g} \\quad | \\quad H = \\frac{u^2 \\sin^2\\theta}{2g} \\quad | \\quad T = \\frac{2u\\sin\\theta}{g} \\quad | \\quad a_c = \\frac{v^2}{r} = \\omega^2 r",
    "coreConcepts": [
      {
        "heading": "Vector Algebra & Resolution of Vectors in 2D",
        "bullets": [
          "Vector addition: Triangle Law and Parallelogram Law: $R = \\sqrt{A^2 + B^2 + 2AB\\cos\\theta}$, $\\tan\\alpha = \\frac{B\\sin\\theta}{A + B\\cos\\theta}$.",
          "Unit vectors and resolution: $\\vec{A} = A_x\\hat{i} + A_y\\hat{j}$ where $A_x = A\\cos\\theta, A_y = A\\sin\\theta$.",
          "Scalar (Dot) Product: $\\vec{A}\\cdot\\vec{B} = A B \\cos\\theta$; Vector (Cross) Product: $\\vec{A}\\times\\vec{B} = A B \\sin\\theta \\,\\hat{n}$.",
          "Relative velocity in 2D: River-swimmer problems (shortest path vs shortest time) and rain-umbrella problems."
        ]
      },
      {
        "heading": "Projectile Motion & Uniform Circular Motion",
        "bullets": [
          "Projectile Motion: Independence of horizontal ($a_x = 0, v_x = u\\cos\\theta$) and vertical ($a_y = -g, v_y = u\\sin\\theta - gt$) motions.",
          "Trajectory Equation: $y = x\\tan\\theta - \\frac{g x^2}{2 u^2 \\cos^2\\theta}$ (Parabolic path).",
          "Key Parameters: Time of flight $T = \\frac{2u\\sin\\theta}{g}$; Maximum height $H = \\frac{u^2\\sin^2\\theta}{2g}$; Horizontal range $R = \\frac{u^2\\sin 2\\theta}{g}$ (Maximum at $\\theta = 45^\\circ$; Equal ranges for complementary angles $\\theta$ and $90^\\circ - \\theta$).",
          "Uniform Circular Motion: Centripetal acceleration $a_c = \\frac{v^2}{r} = \\omega^2 r$ directed radially toward the center."
        ]
      }
    ],
    "examTraps": [
      "Assuming velocity at the top of projectile trajectory is zero (horizontal velocity $u\\cos\\theta$ remains non-zero).",
      "Forgetting that complementary launch angles (e.g., $30^\\circ$ and $60^\\circ$) yield identical horizontal range for same launch speed."
    ],
    "quickMentalCheck": "At what launch angle is horizontal range equal to maximum height? $R = H \\implies \\frac{u^2 \\sin 2\\theta}{g} = \\frac{u^2 \\sin^2\\theta}{2g} \\implies 2\\sin\\theta\\cos\\theta = \\frac{\\sin^2\\theta}{2} \\implies \\tan\\theta = 4 \\implies \\theta = \\arctan(4) \\approx 76^\\circ$.",
    "cueQuestions": [
      "Why are the horizontal and vertical components of a projectile completely decoupled in Newtonian mechanics?",
      "Why is acceleration non-zero in uniform circular motion even though the speed is constant?",
      "How do you calculate the minimum time required for a swimmer to cross a flowing river?"
    ],
    "workedExample": {
      "problem": "A projectile is fired with speed $u = 98\\text{ m/s}$ at an angle of $30^\\circ$ above the horizontal. Find its time of flight, maximum height, and horizontal range. (Take $g = 9.8\\text{ m/s}^2$).",
      "steps": [
        "Time of flight: $T = \\frac{2u\\sin\\theta}{g} = \\frac{2(98)\\sin 30^\\circ}{9.8} = \\frac{196 \\times 0.5}{9.8} = 10.0\\text{ s}$.",
        "Maximum height: $H = \\frac{u^2 \\sin^2\\theta}{2g} = \\frac{(98)^2 (0.5)^2}{2(9.8)} = \\frac{9604 \\times 0.25}{19.6} = 122.5\\text{ m}$.",
        "Horizontal range: $R = \\frac{u^2 \\sin 2\\theta}{g} = \\frac{(98)^2 \\sin 60^\\circ}{9.8} = \\frac{9604 \\times 0.866}{9.8} = 980 \\times 0.866 = 848.7\\text{ m}$."
      ],
      "result": "T = 10.0\\text{ s}, \\quad H = 122.5\\text{ m}, \\quad R = 848.7\\text{ m}"
    },
    "verificationProblem": "Check range via velocity and time: $R = v_x \\times T = (u\\cos 30^\\circ) \\times 10 = 98(0.866) \\times 10 = 848.7\\text{ m}$. Exact match.",
    "realWorldUse": "Ballistics and artillery fire control, satellite orbital injection trajectories, centrifugal blood separation in clinical centrifuges.",
    "diagramType": "projectile-motion-parabola"
  },
  "CBSE-CH-G11-PHY-CH04": {
    "chapterTitle": "Laws of Motion",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 4,
    "essentialLaw": "\\sum \\vec{F} = m\\vec{a} = \\frac{d\\vec{p}}{dt} \\quad | \\quad f_s \\le \\mu_s N, \\; f_k = \\mu_k N \\quad | \\quad v_{\\text{banked}} = \\sqrt{rg\\left(\\frac{\\mu + \\tan\\theta}{1 - \\mu\\tan\\theta}\\right)}",
    "coreConcepts": [
      {
        "heading": "Newton's Three Laws of Motion & Momentum Conservation",
        "bullets": [
          "First Law (Law of Inertia): An object remains at rest or in uniform motion in straight line unless acted upon by net external force; Defines inertial reference frames.",
          "Second Law (Fundamental Law): $\\vec{F} = \\frac{d\\vec{p}}{dt} = m\\vec{a}$; Impulse $\\vec{J} = \\int \\vec{F} dt = \\Delta\\vec{p}$ (Area under $F-t$ curve).",
          "Third Law: For every action, there is an equal and opposite reaction ($\\vec{F}_{AB} = -\\vec{F}_{BA}$); Action and reaction act on DIFFERENT bodies simultaneously.",
          "Law of Conservation of Linear Momentum: If net external force is zero ($\\sum \\vec{F}_{\\text{ext}} = 0$), total linear momentum $\\vec{P} = \\sum m_i \\vec{v}_i$ is strictly conserved."
        ]
      },
      {
        "heading": "Friction, Free Body Diagrams (FBD) & Circular Banking",
        "bullets": [
          "Static Friction: Self-adjusting up to limiting value $f_s \\le f_{s,\\text{max}} = \\mu_s N$; Kinetic Friction: $f_k = \\mu_k N$ (where $\\mu_k < \\mu_s$).",
          "Free Body Diagrams: Isolating each body and resolving all real forces (Gravity, Normal, Tension, Friction, Applied) along orthogonal coordinate axes.",
          "Apparent weight in elevator: Accelerating up: $N = m(g + a)$; Accelerating down: $N = m(g - a)$; Free fall ($a = g$): $N = 0$ (Weightlessness).",
          "Banking of Circular Roads: Maximum safe speed on banked curve with friction: $v_{\\text{max}} = \\sqrt{rg\\left(\\frac{\\mu_s + \\tan\\theta}{1 - \\mu_s\\tan\\theta}\\right)}$; Optimum speed without friction: $v_0 = \\sqrt{rg\\tan\\theta}$."
        ]
      }
    ],
    "examTraps": [
      "Treating action-reaction pairs as canceling each other out (they act on DIFFERENT bodies and can never cancel).",
      "Using limiting static friction $\\mu_s N$ when the applied force is smaller than the threshold (static friction self-adjusts to equal the applied force)."
    ],
    "quickMentalCheck": "A $5\\text{ kg}$ block rests on a horizontal floor with $\\mu_s = 0.4$ ($g=10\\text{ m/s}^2$). If a horizontal push of $15\\text{ N}$ is applied, what is the friction force? $f_{s,\\text{max}} = 0.4 \\times 50 = 20\\text{ N}$. Since $15\\text{ N} < 20\\text{ N}$, static friction is exactly $15\\text{ N}$.",
    "cueQuestions": [
      "Why is Newton's Second Law considered the real fundamental law of motion from which First and Third laws can be deduced?",
      "Why is pulling a lawn roller easier than pushing it on a rough ground?",
      "How does banking of highway curves reduce wear on vehicle tyres while preventing skidding?"
    ],
    "workedExample": {
      "problem": "Two masses $m_1 = 6\\text{ kg}$ and $m_2 = 4\\text{ kg}$ are connected at the two ends of a light inextensible string that passes over a frictionless pulley (Atwood machine). Find the acceleration of the masses and tension in the string when released. (Take $g = 10\\text{ m/s}^2$).",
      "steps": [
        "Equations of motion for hanging blocks: For $m_1$ (moving down): $m_1 g - T = m_1 a$; For $m_2$ (moving up): $T - m_2 g = m_2 a$.",
        "Add equations to eliminate $T$: $(m_1 - m_2)g = (m_1 + m_2)a \\implies a = \\frac{m_1 - m_2}{m_1 + m_2}g$.",
        "Calculate acceleration: $a = \\frac{6 - 4}{6 + 4}(10) = \\frac{2}{10}(10) = 2.0\\text{ m/s}^2$.",
        "Calculate tension: $T = m_2(g + a) = 4(10 + 2) = 4(12) = 48\\text{ N}$."
      ],
      "result": "a = 2.0\\text{ m/s}^2, \\quad T = 48\\text{ N}"
    },
    "verificationProblem": "Check $T$ from $m_1$ equation: $T = m_1(g - a) = 6(10 - 2) = 6(8) = 48\\text{ N}$. Consistent with $m_2$ result.",
    "realWorldUse": "Rocket recoil staging, vehicle ABS anti-lock braking systems, roller-coaster banked loop engineering, elevator cable counterweights.",
    "diagramType": "free-body-diagram-atwood"
  },
  "CBSE-CH-G11-PHY-CH05": {
    "chapterTitle": "Work, Energy and Power",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 5,
    "essentialLaw": "W = \\int \\vec{F}\\cdot d\\vec{r} = \\Delta K \\; (\\text{Work-Energy Thm}) \\quad | \\quad U_s = \\frac{1}{2}kx^2 \\quad | \\quad P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v} \\quad | \\quad e = \\frac{v_2 - v_1}{u_1 - u_2}",
    "coreConcepts": [
      {
        "heading": "Work-Energy Theorem & Conservative Forces",
        "bullets": [
          "Work Done: $W = \\vec{F}\\cdot\\vec{d} = F d \\cos\\theta$; For variable force: $W = \\int_{x_1}^{x_2} F(x) dx$ (Area under $F-x$ curve).",
          "Work-Energy Theorem: Total work done by all forces (conservative, non-conservative, internal, external) equals the change in kinetic energy: $W_{\\text{net}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2$.",
          "Conservative Force: Work done is path-independent and depends only on endpoints ($\\oint \\vec{F}\\cdot d\\vec{r} = 0$); Associated with potential energy: $F = -\\frac{dU}{dx}$.",
          "Elastic Potential Energy of Spring: $U_s = \\frac{1}{2} k x^2$ (Hooke Law: $F_s = -kx$)."
        ]
      },
      {
        "heading": "Power & Collisions in 1D and 2D",
        "bullets": [
          "Power: Rate of doing work; Instantaneous power $P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v}$; Unit: Watt ($1\\text{ W} = 1\\text{ J/s}$), Horsepower ($1\\text{ hp} = 746\\text{ W}$).",
          "Coefficient of Restitution ($e$): $e = \\frac{v_2 - v_1}{u_1 - u_2}$; Perfectly Elastic: $e = 1$ (Momentum and Kinetic Energy both conserved); Inelastic: $0 < e < 1$; Perfectly Inelastic: $e = 0$ (Bodies stick together, max KE loss).",
          "Elastic Collision in 1D: Final velocities $v_1 = \\frac{m_1 - m_2}{m_1 + m_2}u_1 + \\frac{2m_2}{m_1 + m_2}u_2$ and $v_2 = \\frac{2m_1}{m_1 + m_2}u_1 + \\frac{m_2 - m_1}{m_1 + m_2}u_2$.",
          "Equal masses in 1D elastic collision exchange their velocities completely."
        ]
      }
    ],
    "examTraps": [
      "Assuming work done is zero if displacement is non-zero, forgetting that centripetal force ($90^\\circ$) does zero work ($W = F d \\cos 90^\\circ = 0$).",
      "Confusing conservation of momentum (holds in ALL isolated collisions) with conservation of kinetic energy (holds ONLY in perfectly elastic collisions)."
    ],
    "quickMentalCheck": "A ball of mass $m$ moving at $u$ collides elastically head-on with an identical stationary ball ($m$). What are their final velocities? $v_1 = 0, v_2 = u$ (velocities completely swapped).",
    "cueQuestions": [
      "How does the Work-Energy theorem apply to systems with non-conservative frictional forces?",
      "Why is the potential energy defined only for conservative forces?",
      "How is the kinetic energy loss calculated in a perfectly inelastic collision ($e = 0$)?"
    ],
    "workedExample": {
      "problem": "A body of mass $0.5\\text{ kg}$ travels in a straight line with velocity $v = a x^{3/2}$ where $a = 5\\text{ m}^{-1/2}\\text{s}^{-1}$. What is the work done by the net force during its displacement from $x = 0$ to $x = 2\\text{ m}$?",
      "steps": [
        "Initial velocity at $x = 0$: $v_i = 5(0)^{3/2} = 0\\text{ m/s}$.",
        "Final velocity at $x = 2\\text{ m}$: $v_f = 5(2)^{3/2} = 5 \\times 2\\sqrt{2} = 10\\sqrt{2}\\text{ m/s}$.",
        "Apply Work-Energy Theorem: $W = \\Delta K = \\frac{1}{2} m v_f^2 - \\frac{1}{2} m v_i^2$.",
        "Substitute values: $W = \\frac{1}{2}(0.5)(10\\sqrt{2})^2 - 0 = \\frac{1}{2}(0.5)(200) = 50\\text{ J}$."
      ],
      "result": "W = 50\\text{ J}"
    },
    "verificationProblem": "Check via force integration: $a = v \\frac{dv}{dx} = (5x^{3/2})(7.5x^{1/2}) = 37.5 x^2$. $F = ma = 0.5(37.5 x^2) = 18.75 x^2$. $\\int_0^2 18.75 x^2 dx = 18.75 [x^3/3]_0^2 = 6.25(8) = 50\\text{ J}$. Verified.",
    "realWorldUse": "Hydroelectric pumped storage turbine ratings, automotive crumple zone energy absorption, ballistic bullet proofing armor testing.",
    "diagramType": "work-energy-potential-well"
  },
  "CBSE-CH-G11-PHY-CH06": {
    "chapterTitle": "System of Particles and Rotational Motion",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 6,
    "essentialLaw": "\\vec{\\tau} = \\vec{r}\\times\\vec{F} = I\\vec{\\alpha} \\quad | \\quad \\vec{L} = \\vec{r}\\times\\vec{p} = I\\vec{\\omega} \\quad | \\quad K_{\\text{total}} = \\frac{1}{2} M v_{\\text{cm}}^2 + \\frac{1}{2} I_{\\text{cm}} \\omega^2 \\quad | \\quad I = \\sum m_i r_i^2",
    "coreConcepts": [
      {
        "heading": "Center of Mass, Torque & Angular Momentum",
        "bullets": [
          "Center of Mass position: $\\vec{R}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{1}{M}\\int \\vec{r} dm$; $\\vec{F}_{\\text{ext}} = M\\vec{a}_{\\text{cm}}$.",
          "Torque (Moment of Force): $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = I\\vec{\\alpha}$; Rotational Equilibrium requires $\\sum \\vec{F}_{\\text{ext}} = 0$ and $\\sum \\vec{\\tau}_{\\text{ext}} = 0$.",
          "Angular Momentum: $\\vec{L} = \\vec{r} \\times \\vec{p} = I\\vec{\\omega}$; Law of Conservation of Angular Momentum: If $\\vec{\\tau}_{\\text{ext}} = 0$, then $\\vec{L} = I\\vec{\\omega} = \\text{constant}$ (e.g., figure skater spinning faster when pulling in arms)."
        ]
      },
      {
        "heading": "Moment of Inertia, Radius of Gyration & Pure Rolling",
        "bullets": [
          "Moment of Inertia $I = \\sum m_i r_i^2 = M k^2$ (where $k$ is radius of gyration).",
          "Standard Moments of Inertia: Ring ($MR^2$), Disc ($\\frac{1}{2}MR^2$), Solid Cylinder ($\\frac{1}{2}MR^2$), Solid Sphere ($\\frac{2}{5}MR^2$), Hollow Sphere ($\\frac{2}{3}MR^2$), Thin Rod of length $L$ about center ($\\frac{1}{12}ML^2$).",
          "Parallel Axis Theorem: $I = I_{\\text{cm}} + M d^2$; Perpendicular Axis Theorem (planar laminas): $I_z = I_x + I_y$.",
          "Pure Rolling (Rolling without slipping): $v_{\\text{cm}} = R\\omega$; Kinetic Energy: $K = \\frac{1}{2}M v_{\\text{cm}}^2\\left(1 + \\frac{k^2}{R^2}\\right)$; Acceleration down incline $\\theta$: $a = \\frac{g\\sin\\theta}{1 + k^2/R^2}$."
        ]
      }
    ],
    "examTraps": [
      "Applying the perpendicular axis theorem to 3D bodies like spheres or cylinders (valid ONLY for 2D flat planar laminar sheets).",
      "Forgetting that static friction is essential for pure rolling without slipping down an incline, but does zero work ($W=0$)."
    ],
    "quickMentalCheck": "Which object rolls down an incline faster: a solid sphere ($k^2/R^2 = 2/5 = 0.4$) or a solid cylinder ($k^2/R^2 = 1/2 = 0.5$)? The solid sphere (smaller $k^2/R^2$ gives larger acceleration).",
    "cueQuestions": [
      "Why does the center of mass of a projectile follow a parabolic trajectory even after the projectile explodes in mid-air?",
      "How does conservation of angular momentum explain the high rotational speeds of spinning pulsars/neutron stars?",
      "How do the parallel and perpendicular axis theorems simplify the calculation of moments of inertia for complex geometries?"
    ],
    "workedExample": {
      "problem": "A solid cylinder of mass $20\\text{ kg}$ rotates about its axis with angular speed $100\\text{ rad/s}$. The radius of the cylinder is $0.25\\text{ m}$. What is the kinetic energy of rotation of the cylinder, and what is the magnitude of angular momentum?",
      "steps": [
        "Moment of inertia of solid cylinder about its axis: $I = \\frac{1}{2} M R^2 = \\frac{1}{2}(20\\text{ kg})(0.25\\text{ m})^2 = 10 \\times 0.0625 = 0.625\\text{ kg}\\cdot\\text{m}^2$.",
        "Rotational Kinetic Energy: $K_{\\text{rot}} = \\frac{1}{2} I \\omega^2 = \\frac{1}{2}(0.625)(100)^2 = 0.3125 \\times 10000 = 3125\\text{ J}$.",
        "Angular Momentum: $L = I \\omega = (0.625\\text{ kg}\\cdot\\text{m}^2)(100\\text{ rad/s}) = 62.5\\text{ J}\\cdot\\text{s}$ (or $\\text{kg}\\cdot\\text{m}^2/\\text{s}$)."
      ],
      "result": "K_{\\text{rot}} = 3125\\text{ J}, \\quad L = 62.5\\text{ J}\\cdot\\text{s}"
    },
    "verificationProblem": "Check relation $K = \\frac{L^2}{2I}$: $K = \\frac{(62.5)^2}{2(0.625)} = \\frac{3906.25}{1.25} = 3125\\text{ J}$. Exact match.",
    "realWorldUse": "Engine flywheels for mechanical energy smoothing, gyroscope stabilization in aerospace navigation, helicopter tail rotor torque compensation.",
    "diagramType": "rotational-rolling-incline-plane"
  },
  "CBSE-CH-G11-PHY-CH07": {
    "chapterTitle": "Gravitation",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 7,
    "essentialLaw": "F = G\\frac{m_1 m_2}{r^2} \\quad | \\quad g(h) = g\\left(1 - \\frac{2h}{R}\\right) \\quad | \\quad g(d) = g\\left(1 - \\frac{d}{R}\\right) \\quad | \\quad v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\quad | \\quad T^2 = \\left(\\frac{4\\pi^2}{GM}\\right) r^3",
    "coreConcepts": [
      {
        "heading": "Newton's Gravitational Law & Variation of 'g'",
        "bullets": [
          "Universal Law of Gravitation: $F = G\\frac{m_1 m_2}{r^2}$ where $G = 6.674 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$.",
          "Acceleration due to gravity at surface: $g = \\frac{GM}{R^2} \\approx 9.8\\text{ m/s}^2$.",
          "Variation with altitude $h$: $g_h = \\frac{GM}{(R+h)^2} = g\\left(1 + \\frac{h}{R}\\right)^{-2} \\approx g\\left(1 - \\frac{2h}{R}\\right)$ for $h \\ll R$.",
          "Variation with depth $d$: $g_d = g\\left(1 - \\frac{d}{R}\\right)$; At center of Earth ($d=R$): $g = 0$.",
          "Variation with latitude $\\lambda$: $g' = g - R\\omega^2 \\cos^2\\lambda$ (Minimum at equator $\\lambda=0^\\circ$, maximum at poles $\\lambda=90^\\circ$)."
        ]
      },
      {
        "heading": "Kepler's Laws, Escape Velocity & Satellite Orbits",
        "bullets": [
          "Kepler's 3 Laws: 1. Law of Orbits (Ellipses with Sun at one focus); 2. Law of Areas ($\\frac{dA}{dt} = \\frac{L}{2m} = \\text{const}$, Conservation of Angular Momentum); 3. Law of Periods ($T^2 \\propto a^3$).",
          "Gravitational Potential Energy: $U = -\\frac{GMm}{r}$; Gravitational Potential: $V = -\\frac{GM}{r}$.",
          "Escape Velocity from Earth surface: $v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} \\approx 11.2\\text{ km/s}$ (Independent of mass or projection angle of the projectile).",
          "Orbital Velocity of Satellite: $v_o = \\sqrt{\\frac{GM}{r}} = \\sqrt{\\frac{GM}{R+h}}$; Total Energy of satellite: $E = K + U = \\frac{1}{2}\\frac{GMm}{r} - \\frac{GMm}{r} = -\\frac{GMm}{2r}$.",
          "Geostationary Satellites: Orbit in equatorial plane, period $T = 24\\text{ h}$, altitude $h \\approx 36,000\\text{ km}$, orbital velocity $\\approx 3.1\\text{ km/s}$."
        ]
      }
    ],
    "examTraps": [
      "Using the approximation $g_h = g(1 - 2h/R)$ when altitude $h$ is comparable to Earth radius $R$ (must use exact $g_h = g\\frac{R^2}{(R+h)^2}$).",
      "Assuming escape velocity depends on the launch angle (escape speed is a scalar value and identical in any upward direction)."
    ],
    "quickMentalCheck": "What is the ratio of escape velocity to orbital velocity for a low-Earth orbit satellite? $v_e / v_o = \\frac{\\sqrt{2gR}}{\\sqrt{gR}} = \\sqrt{2} \\approx 1.414$.",
    "cueQuestions": [
      "How does Kepler Second Law directly prove that gravitational force is a purely central force?",
      "Why does the Moon lack a permanent atmosphere while Earth retains a dense atmospheric layer?",
      "What is the physical meaning of negative total mechanical energy for bound orbiting satellites?"
    ],
    "workedExample": {
      "problem": "At what height above the Earth’s surface does the acceleration due to gravity reduce to $25\\%$ of its value on the surface? ($R = 6400\\text{ km}$).",
      "steps": [
        "Exact formula: $g_h = g\\left(\\frac{R}{R + h}\\right)^2$.",
        "Given: $g_h = 0.25 g = \\frac{g}{4}$.",
        "Set up equation: $\\frac{g}{4} = g\\left(\\frac{R}{R + h}\\right)^2 \\implies \\left(\\frac{R}{R + h}\\right)^2 = \\frac{1}{4}$.",
        "Take square root: $\\frac{R}{R + h} = \\frac{1}{2} \\implies R + h = 2R \\implies h = R = 6400\\text{ km}$."
      ],
      "result": "h = R = 6400\\text{ km}"
    },
    "verificationProblem": "Check at $h = R$: $g_h = \\frac{GM}{(2R)^2} = \\frac{GM}{4R^2} = \\frac{g}{4} = 0.25g$. Exact match.",
    "realWorldUse": "GPS satellite constellation positioning, geostationary weather forecasting satellites (INSAT/GOES), interplanetary gravity assist maneuvers.",
    "diagramType": "kepler-elliptical-orbit-equal-areas"
  },
  "CBSE-CH-G11-PHY-CH08": {
    "chapterTitle": "Mechanical Properties of Solids",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 8,
    "essentialLaw": "\\sigma = Y \\varepsilon \\implies \\frac{F}{A} = Y\\frac{\\Delta L}{L} \\quad | \\quad B = -V\\frac{\\Delta P}{\\Delta V} \\quad | \\quad G = \\frac{F/A}{\\Delta x/L} \\quad | \\quad u = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} Y \\varepsilon^2",
    "coreConcepts": [
      {
        "heading": "Stress, Strain & Hooke's Law",
        "bullets": [
          "Stress: Restoring force per unit area $\\sigma = \\frac{F}{A}$ (Tensile, Compressive, Shearing, Hydraulic); Unit: $\\text{N/m}^2$ or $\\text{Pa}$.",
          "Strain: Fractional deformation $\\varepsilon = \\frac{\\Delta L}{L}$ (Longitudinal), $\\frac{\\Delta V}{V}$ (Volume), $\\theta = \\frac{\\Delta x}{L}$ (Shear); Dimensionless.",
          "Hooke's Law: Within proportional limit, stress is directly proportional to strain: $\\text{Stress} = E \\times \\text{Strain}$.",
          "Stress-Strain Curve: Proportional limit, Elastic limit (Yield point), Plastic deformation region, Ultimate tensile strength, Fracture point."
        ]
      },
      {
        "heading": "Elastic Moduli & Elastic Potential Energy Density",
        "bullets": [
          "Young's Modulus: $Y = \\frac{F/A}{\\Delta L/L} = \\frac{F L}{A \\Delta L}$ (Measures resistance to length change; Steel is more elastic than rubber).",
          "Bulk Modulus: $B = -V\\frac{\\Delta P}{\\Delta V}$ (Compressibility $k = 1/B$).",
          "Shear Modulus (Modulus of Rigidity): $G = \\eta = \\frac{F/A}{\\theta}$.",
          "Poisson's Ratio: $\\nu = -\\frac{\\text{Lateral Strain}}{\\text{Longitudinal Strain}} = -\\frac{\\Delta d / d}{\\Delta L / L}$ (Theoretical limits: $-1 < \\nu < 0.5$).",
          "Elastic Potential Energy Density: $u = \\frac{U}{V} = \\frac{1}{2} \\times \\text{Stress} \\times \\text{Strain} = \\frac{1}{2} Y (\\text{Strain})^2$."
        ]
      }
    ],
    "examTraps": [
      "Claiming rubber is more elastic than steel (steel has a much higher Young modulus and recovers stronger restoring forces per unit strain).",
      "Forgetting the negative sign in Bulk modulus representing volume decrease under increased pressure."
    ],
    "quickMentalCheck": "A wire of length $L$ and radius $r$ has Young modulus $Y$. If its length is doubled and radius halved, what is its Young modulus? It remains $Y$ (Young modulus is a material property independent of dimensions).",
    "cueQuestions": [
      "Why is steel chosen over copper or aluminium for structural crane cables and bridge I-beams?",
      "What is the physical interpretation of the area under a complete Stress-Strain curve (Material Toughness)?",
      "How does Poisson ratio explain why a rubber cylinder thins in diameter when stretched longitudinally?"
    ],
    "workedExample": {
      "problem": "A steel wire of length $4.7\\text{ m}$ and cross-sectional area $3.0 \\times 10^{-5}\\text{ m}^2$ stretches by the same amount as a copper wire of length $3.5\\text{ m}$ and cross-sectional area $4.0 \\times 10^{-5}\\text{ m}^2$ under a given load. What is the ratio of the Young’s modulus of steel to that of copper?",
      "steps": [
        "Formula for elongation: $\\Delta L = \\frac{F L}{A Y}$.",
        "Given: $\\Delta L_s = \\Delta L_c$ under identical load $F$.",
        "Set equal: $\\frac{F L_s}{A_s Y_s} = \\frac{F L_c}{A_c Y_c} \\implies \\frac{Y_s}{Y_c} = \\frac{L_s A_c}{L_c A_s}$.",
        "Substitute values: $\\frac{Y_s}{Y_c} = \\frac{(4.7)(4.0 \\times 10^{-5})}{(3.5)(3.0 \\times 10^{-5})} = \\frac{18.8}{10.5} \\approx 1.79$."
      ],
      "result": "\\frac{Y_{\\text{steel}}}{Y_{\\text{copper}}} = 1.79 \\; (\\text{Steel is } 1.79\\times \\text{ stiffer than copper})"
    },
    "verificationProblem": "Check standard moduli: $Y_{\\text{steel}} \\approx 2.0 \\times 10^{11}\\text{ Pa}, Y_{\\text{copper}} \\approx 1.1 \\times 10^{11}\\text{ Pa} \\implies 2.0/1.1 = 1.81$. Ratio $1.79$ matches within tolerance.",
    "realWorldUse": "I-beam structural engineering for earthquake-resistant skyscrapers, suspension bridge steel cables, prestressed concrete reinforcement.",
    "diagramType": "stress-strain-curve-materials"
  },
  "CBSE-CH-G11-PHY-CH09": {
    "chapterTitle": "Mechanical Properties of Fluids",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 9,
    "essentialLaw": "P = P_0 + \\rho g h \\quad | \\quad A_1 v_1 = A_2 v_2 \\quad | \\quad P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{const} \\quad | \\quad F_v = 6\\pi\\eta r v \\quad | \\quad h = \\frac{2S\\cos\\theta}{\\rho g r}",
    "coreConcepts": [
      {
        "heading": "Pascal's Law, Hydrostatic Pressure & Archimedes Principle",
        "bullets": [
          "Hydrostatic Pressure: $P = P_0 + \\rho g h$; Gauge Pressure $P_g = P - P_0 = \\rho g h$.",
          "Pascal's Principle: Pressure applied to an enclosed incompressible fluid is transmitted undiminished to every portion of the fluid and walls ($F_1/A_1 = F_2/A_2$, Hydraulic Lift).",
          "Archimedes' Principle & Buoyancy: $F_B = \\rho_{\\text{fluid}} V_{\\text{displaced}} g$ (Buoyant force equals weight of displaced fluid)."
        ]
      },
      {
        "heading": "Bernoulli's Theorem, Viscosity & Surface Tension",
        "bullets": [
          "Continuity Equation: $A_1 v_1 = A_2 v_2$ (Conservation of Mass for incompressible fluid flow).",
          "Bernoulli's Equation: $P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}$ (Conservation of Energy for steady, streamline, non-viscous flow); Torricelli Law of efflux: $v = \\sqrt{2gh}$; Venturi-meter flow rate.",
          "Stokes' Law & Terminal Velocity: Viscous drag $F_v = 6\\pi\\eta r v$; Terminal velocity $v_t = \\frac{2 r^2 (\\rho - \\sigma) g}{9\\eta}$.",
          "Surface Tension ($S$): Excess pressure inside liquid drop $\\Delta P = \\frac{2S}{R}$, inside soap bubble $\\Delta P = \\frac{4S}{R}$; Capillary ascent: $h = \\frac{2S\\cos\\theta}{\\rho g r}$."
        ]
      }
    ],
    "examTraps": [
      "Applying Bernoulli equation to turbulent, compressible, or highly viscous flows.",
      "Using drop excess pressure formula ($2S/R$) for a soap bubble (a bubble has TWO surfaces, so excess pressure is $4S/R$)."
    ],
    "quickMentalCheck": "If the radius of a capillary tube is halved, how does the capillary rise height of water change? $h \\propto 1/r$, so height doubles ($2h$).",
    "cueQuestions": [
      "How does Bernoulli Principle explain dynamic lift on an aeroplane wing (aerofoil) and the Magnus effect in spinning balls?",
      "Why do raindrops reach a constant terminal falling velocity instead of continuously accelerating under gravity?",
      "How do detergents reduce water surface tension to clean grease effectively?"
    ],
    "workedExample": {
      "problem": "Water flows through a horizontal pipe of non-uniform cross-section. At a point where the diameter is $4.0\\text{ cm}$, the velocity of water is $2.0\\text{ m/s}$ and pressure is $8.0 \\times 10^4\\text{ Pa}$. Find the pressure at another point where the diameter is $2.0\\text{ cm}$. (Density of water $= 1000\\text{ kg/m}^3$).",
      "steps": [
        "Apply Continuity Equation: $A_1 v_1 = A_2 v_2 \\implies d_1^2 v_1 = d_2^2 v_2$.",
        "Solve for $v_2$: $v_2 = v_1 \\left(\\frac{d_1}{d_2}\\right)^2 = 2.0 \\times \\left(\\frac{4.0}{2.0}\\right)^2 = 2.0 \\times 4 = 8.0\\text{ m/s}$.",
        "Apply Bernoulli Equation for horizontal flow: $P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2$.",
        "$P_2 = P_1 + \\frac{1}{2}\\rho(v_1^2 - v_2^2) = 8.0 \\times 10^4 + \\frac{1}{2}(1000)(2^2 - 8^2) = 80000 + 500(4 - 64) = 80000 - 30000 = 5.0 \\times 10^4\\text{ Pa}$."
      ],
      "result": "P_2 = 5.0 \\times 10^4\\text{ Pa} = 50\\text{ kPa}"
    },
    "verificationProblem": "Check energy conservation: $P_1 + \\frac{1}{2}\\rho v_1^2 = 80000 + 2000 = 82000\\text{ Pa}$. $P_2 + \\frac{1}{2}\\rho v_2^2 = 50000 + 32000 = 82000\\text{ Pa}$. Invariant holds.",
    "realWorldUse": "Aircraft aerofoil wing lift generation, carburetor fuel atomizers, hydraulic brake calipers in sports cars, microfluidic lab-on-a-chip diagnostic devices.",
    "diagramType": "venturi-meter-fluid-flow"
  },
  "CBSE-CH-G11-PHY-CH10": {
    "chapterTitle": "Thermal Properties of Matter",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 10,
    "essentialLaw": "\\Delta L = \\alpha L \\Delta T \\quad | \\quad Q = m c \\Delta T = m L_f \\quad | \\quad \\frac{dQ}{dt} = -K A \\frac{dT}{dx} \\quad | \\quad E = \\sigma T^4 \\quad | \\quad \\lambda_m T = b",
    "coreConcepts": [
      {
        "heading": "Temperature Scales, Thermal Expansion & Calorimetry",
        "bullets": [
          "Temperature Scale Conversions: $\\frac{C}{5} = \\frac{F - 32}{9} = \\frac{K - 273.15}{5}$.",
          "Thermal Expansion: Linear $\\Delta L = \\alpha L \\Delta T$; Area $\\Delta A = 2\\alpha A \\Delta T$; Volume $\\Delta V = 3\\alpha V \\Delta T$ (Relation: $\\alpha = \\beta/2 = \\gamma/3$).",
          "Anomalous expansion of water: Density is maximum at $4^\\circ\\text{C}$ (Preserves aquatic life in frozen lakes).",
          "Calorimetry Principle: Heat Lost = Heat Gained ($m_1 c_1 \\Delta T_1 = m_2 c_2 \\Delta T_2$); Latent Heat $Q = m L_f$ (Fusion) / $m L_v$ (Vaporization)."
        ]
      },
      {
        "heading": "Heat Transfer: Conduction, Convection & Radiation",
        "bullets": [
          "Thermal Conduction: Fourier Law $\\frac{dQ}{dt} = -K A \\frac{dT}{dx} = \\frac{K A(T_1 - T_2)}{L}$ (Thermal resistance $R_{\\text{th}} = \\frac{L}{KA}$).",
          "Stefan-Boltzmann Law: Total radiated power $P = e \\sigma A T^4$ where $\\sigma = 5.67 \\times 10^{-8}\\text{ W/m}^2\\text{K}^4$.",
          "Wien's Displacement Law: Peak emission wavelength $\\lambda_m T = b$ where $b = 2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K}$.",
          "Newton's Law of Cooling: Rate of cooling $\\frac{dT}{dt} = -k(T - T_0)$ for small temperature differences $(T - T_0)$ above ambient."
        ]
      }
    ],
    "examTraps": [
      "Using Celsius temperatures in Stefan-Boltzmann radiation equations ($P = \\sigma A T^4$ requires ABSOLUTE temperature in Kelvin).",
      "Forgetting that latent heat phase changes (ice to water at $0^\\circ\\text{C}$, water to steam at $100^\\circ\\text{C}$) occur at constant temperature."
    ],
    "quickMentalCheck": "If the surface temperature of a star doubles, by what factor does its radiative power increase? $P \\propto T^4$, so power increases $2^4 = 16\\times$.",
    "cueQuestions": [
      "Why do lakes freeze from top to bottom rather than bottom to top during severe winters?",
      "How does Wien Displacement Law allow astronomers to estimate the surface temperature of distant stars?",
      "Why is water used as a coolant in automobile radiators (High specific heat capacity $c = 4186\\text{ J/kg}\\cdot\\text{K}$)?"
    ],
    "workedExample": {
      "problem": "A brass rod of length $50\\text{ cm}$ and diameter $3.0\\text{ mm}$ is joined to a steel rod of the same length and diameter. What is the change in length of the combined rod at $250^\\circ\\text{C}$, if the original lengths are at $40^\\circ\\text{C}$? (Given: $\\alpha_{\\text{brass}} = 2.0 \\times 10^{-5}\\text{ K}^{-1}, \\alpha_{\\text{steel}} = 1.2 \\times 10^{-5}\\text{ K}^{-1}$).",
      "steps": [
        "Temperature change: $\\Delta T = 250^\\circ\\text{C} - 40^\\circ\\text{C} = 210^\\circ\\text{C} = 210\\text{ K}$.",
        "Expansion of brass rod: $\\Delta L_b = \\alpha_b L \\Delta T = (2.0 \\times 10^{-5})(0.50\\text{ m})(210) = 2.1 \\times 10^{-3}\\text{ m} = 2.1\\text{ mm}$.",
        "Expansion of steel rod: $\\Delta L_s = \\alpha_s L \\Delta T = (1.2 \\times 10^{-5})(0.50\\text{ m})(210) = 1.26 \\times 10^{-3}\\text{ m} = 1.26\\text{ mm}$.",
        "Total elongation of combined rod: $\\Delta L_{\\text{total}} = \\Delta L_b + \\Delta L_s = 2.1\\text{ mm} + 1.26\\text{ mm} = 3.36\\text{ mm}$."
      ],
      "result": "\\Delta L_{\\text{total}} = 3.36\\text{ mm} = 0.336\\text{ cm}"
    },
    "verificationProblem": "Check combined effective coefficient: $\\alpha_{\\text{eff}} = \\frac{\\alpha_b + \\alpha_s}{2} = 1.6 \\times 10^{-5}\\text{ K}^{-1}$. $\\Delta L = (1.6 \\times 10^{-5})(1.0\\text{ m})(210) = 3.36\\text{ mm}$. Verified.",
    "realWorldUse": "Thermal expansion joints in railway tracks and suspension bridges, bimetallic strips in home thermostats, cryogenic insulation in LNG tankers.",
    "diagramType": "calorimetry-phase-change-curve"
  },
  "CBSE-CH-G11-PHY-CH11": {
    "chapterTitle": "Thermodynamics",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 11,
    "essentialLaw": "\\Delta Q = \\Delta U + \\Delta W \\quad | \\quad W_{\\text{isothermal}} = n R T \\ln\\left(\\frac{V_f}{V_i}\\right) \\quad | \\quad P V^\\gamma = \\text{const} \\; (\\text{Adiabatic}) \\quad | \\quad \\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}",
    "coreConcepts": [
      {
        "heading": "Zeroth & First Law of Thermodynamics & Thermodynamic Processes",
        "bullets": [
          "Zeroth Law: If bodies A and B are each in thermal equilibrium with C, then A and B are in thermal equilibrium with each other; Establishes temperature as a state variable.",
          "First Law (Conservation of Energy): $\\Delta Q = \\Delta U + W$ where $W = \\int P dV$; Internal energy $U$ is a state function ($dU = n C_v dT$).",
          "Isothermal Process ($T = \\text{const}, \\Delta U = 0$): $W = n R T \\ln(V_2/V_1) = Q$.",
          "Adiabatic Process ($Q = 0$): $P V^\\gamma = \\text{const}, T V^{\\gamma-1} = \\text{const}$; $W = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{n R (T_1 - T_2)}{\\gamma - 1} = -\\Delta U$.",
          "Isochoric ($V = \\text{const}, W = 0, Q = \\Delta U = n C_v \\Delta T$); Isobaric ($P = \\text{const}, W = P\\Delta V, Q = n C_p \\Delta T$)."
        ]
      },
      {
        "heading": "Second Law of Thermodynamics, Heat Engines & Carnot Cycle",
        "bullets": [
          "Mayer's Relation: $C_p - C_v = R$; Specific heat ratio $\\gamma = C_p/C_v$ (Monoatomic: 5/3, Diatomic: 7/5).",
          "Second Law Statements: Kelvin-Planck (No engine can convert 100% absorbed heat into work with zero rejection to cold sink); Clausius (Heat cannot flow spontaneously from cold to hot without external work).",
          "Carnot Engine: Reversible 4-stage cycle (2 Isothermal + 2 Adiabatic); Maximum theoretical efficiency $\\eta = 1 - \\frac{T_L}{T_H} = 1 - \\frac{Q_L}{Q_H}$.",
          "Refrigerator Coefficient of Performance: $\\beta = \\frac{Q_L}{W} = \\frac{T_L}{T_H - T_L}$."
        ]
      }
    ],
    "examTraps": [
      "Confusing sign conventions for work: In physics, work done BY system on surroundings is positive ($W = +P\\Delta V$, so $\\Delta Q = \\Delta U + W$).",
      "Calculating Carnot efficiency using temperatures in Celsius instead of Kelvin."
    ],
    "quickMentalCheck": "What is the maximum efficiency of a heat engine operating between boiling water ($100^\\circ\\text{C} = 373\\text{ K}$) and freezing ice water ($0^\\circ\\text{C} = 273\\text{ K}$)? $\\eta = 1 - \\frac{273}{373} = \\frac{100}{373} \\approx 26.8\\%$.",
    "cueQuestions": [
      "Why is internal energy $U$ called a state function while heat $Q$ and work $W$ are path-dependent functions?",
      "Why can no practical heat engine ever have a higher efficiency than a reversible Carnot engine operating between the same two temperatures?",
      "How is the adiabatic curve slope proven to be $\\gamma$ times steeper than the isothermal curve slope on an indicator $P-V$ diagram?"
    ],
    "workedExample": {
      "problem": "An ideal gas undergoes an isothermal expansion at $300\\text{ K}$ from volume $V_1 = 1.0\\text{ L}$ to $V_2 = 4.0\\text{ L}$. If the gas consists of $2.0\\text{ moles}$, calculate the work done by the gas and the heat absorbed from the reservoir. ($R = 8.314\\text{ J/mol}\\cdot\\text{K}$, $\\ln 4 \\approx 1.386$).",
      "steps": [
        "Isothermal work formula: $W = n R T \\ln(V_2/V_1)$.",
        "Substitute values: $n = 2.0, R = 8.314\\text{ J/mol}\\cdot\\text{K}, T = 300\\text{ K}, V_2/V_1 = 4.0/1.0 = 4.0$.",
        "$W = (2.0)(8.314)(300)(\\ln 4) = (4988.4)(1.386) \\approx 6914\\text{ J} = 6.91\\text{ kJ}$.",
        "Since process is isothermal, $\\Delta U = 0 \\implies Q = W = 6.91\\text{ kJ}$."
      ],
      "result": "W = 6.91\\text{ kJ}, \\quad Q = 6.91\\text{ kJ} \\; (\\text{Absorbed from thermal reservoir})"
    },
    "verificationProblem": "Check First Law: $\\Delta Q = \\Delta U + W \\implies 6.91\\text{ kJ} = 0 + 6.91\\text{ kJ}$. Verified.",
    "realWorldUse": "Gas turbine combined cycle power plants, Stirling cycle coolers for quantum computing sensors, internal combustion Otto/Diesel cycles.",
    "diagramType": "carnot-cycle-pv-indicator"
  },
  "CBSE-CH-G11-PHY-CH12": {
    "chapterTitle": "Kinetic Theory",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 12,
    "essentialLaw": "P = \\frac{1}{3} \\rho v_{\\text{rms}}^2 = \\frac{1}{3} \\frac{M}{V} v_{\\text{rms}}^2 \\quad | \\quad E_{\\text{avg}} = \\frac{3}{2} k_B T \\quad | \\quad v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} \\quad | \\quad \\lambda = \\frac{1}{\\sqrt{2}\\pi n d^2}",
    "coreConcepts": [
      {
        "heading": "Kinetic Theory Postulates & Pressure of an Ideal Gas",
        "bullets": [
          "Postulates: Gas consists of point particles in continuous random motion; Volume of molecules is negligible compared to container; Collisions are perfectly elastic and instantaneous; Intermolecular forces are zero between collisions.",
          "Gas Pressure Derivation: $P = \\frac{1}{3} n_0 m v_{\\text{rms}}^2 = \\frac{1}{3} \\rho v_{\\text{rms}}^2$ where $\\rho = \\frac{M_{\\text{total}}}{V}$.",
          "Kinetic Interpretation of Temperature: Absolute temperature is a direct measure of average translational kinetic energy per molecule: $E_k = \\frac{1}{2}m v_{\\text{rms}}^2 = \\frac{3}{2}k_B T$ (where $k_B = \\frac{R}{N_A} = 1.38 \\times 10^{-23}\\text{ J/K}$)."
        ]
      },
      {
        "heading": "Degrees of Freedom, Equipartition of Energy & Mean Free Path",
        "bullets": [
          "Law of Equipartition of Energy: Each quadratic degree of freedom contributes $\\frac{1}{2} k_B T$ of thermal energy per molecule in equilibrium.",
          "Degrees of freedom ($f$): Monoatomic ($f=3$, $C_v = \\frac{3}{2}R, \\gamma = \\frac{5}{3}$); Diatomic ($f=5$ at room temp, $C_v = \\frac{5}{2}R, \\gamma = \\frac{7}{5}$; $f=7$ with vibration at high temp); Polyatomic non-linear ($f=6$, $C_v = 3R, \\gamma = \\frac{4}{3}$).",
          "Molecular Speed Distributions: Root-mean-square speed $v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}$; Average speed $v_{\\text{avg}} = \\sqrt{\\frac{8RT}{\\pi M}}$; Most probable speed $v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}$ ($v_{\\text{mp}} < v_{\\text{avg}} < v_{\\text{rms}}$).",
          "Mean Free Path: $\\lambda = \\frac{1}{\\sqrt{2} n \\pi d^2}$ (Average distance traveled between consecutive collisions)."
        ]
      }
    ],
    "examTraps": [
      "Using molar mass $M$ in grams instead of kilograms in $v_{\\text{rms}} = \\sqrt{3RT/M}$ (must use $\\text{kg/mol}$, e.g., $M = 0.032\\text{ kg/mol}$ for $\\text{O}_2$).",
      "Confusing total internal energy of 1 mole ($U = \\frac{f}{2}RT$) with energy of 1 single molecule ($E = \\frac{f}{2}k_B T$)."
    ],
    "quickMentalCheck": "Find the ratio of $v_{\\text{rms}}$ of Hydrogen gas ($M=2$) to Oxygen gas ($M=32$) at the same temperature: $v_{\\text{rms}} \\propto 1/\\sqrt{M} \\implies \\frac{v_{\\text{H}_2}}{v_{\\text{O}_2}} = \\sqrt{\\frac{32}{2}} = \\sqrt{16} = 4$.",
    "cueQuestions": [
      "How does the microscopic kinetic theory of gases directly derive macroscopic Boyle Law and Charles Law?",
      "How does the Law of Equipartition of energy predict the molar heat capacity $C_v$ of monoatomic vs diatomic gases?",
      "Why does mean free path increase with decreasing pressure in high-vacuum chambers?"
    ],
    "workedExample": {
      "problem": "Calculate the RMS speed of oxygen molecules at $27^\\circ\\text{C}$. ($R = 8.314\\text{ J/mol}\\cdot\\text{K}$, Molar mass of $\\text{O}_2 = 32\\text{ g/mol} = 0.032\\text{ kg/mol}$).",
      "steps": [
        "Convert temperature to Kelvin: $T = 27 + 273.15 = 300.15\\text{ K} \\approx 300\\text{ K}$.",
        "Formula for RMS speed: $v_{\\text{rms}} = \\sqrt{\\frac{3 R T}{M}}$.",
        "Substitute values: $v_{\\text{rms}} = \\sqrt{\\frac{3 \\times 8.314 \\times 300}{0.032}} = \\sqrt{\\frac{7482.6}{0.032}} = \\sqrt{233831.25} \\approx 483.6\\text{ m/s}$."
      ],
      "result": "v_{\\text{rms}} = 483.6\\text{ m/s} \\approx 484\\text{ m/s}"
    },
    "verificationProblem": "Check average kinetic energy per mole: $E_k = \\frac{1}{2} M v_{\\text{rms}}^2 = \\frac{1}{2}(0.032)(483.6)^2 = 3741\\text{ J}$. By $\\frac{3}{2}RT = 1.5(8.314)(300) = 3741.3\\text{ J}$. Matches.",
    "realWorldUse": "Thermal diffusion in nuclear isotope enrichment centrifuges, high-altitude barometric atmosphere modeling, vacuum coating deposition.",
    "diagramType": "maxwell-boltzmann-speed-distribution"
  },
  "CBSE-CH-G11-PHY-CH13": {
    "chapterTitle": "Oscillations",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 13,
    "essentialLaw": "a(t) = -\\omega^2 x(t) \\quad | \\quad x(t) = A\\cos(\\omega t + \\phi) \\quad | \\quad T = 2\\pi\\sqrt{\\frac{m}{k}} \\quad | \\quad T_{\\text{pendulum}} = 2\\pi\\sqrt{\\frac{L}{g}} \\quad | \\quad E = \\frac{1}{2} k A^2",
    "coreConcepts": [
      {
        "heading": "Simple Harmonic Motion (SHM) Kinematics & Reference Circle",
        "bullets": [
          "SHM Definition: Restoring force is directly proportional to displacement and directed toward the mean position: $F = -kx \\implies a = -\\omega^2 x$ (where $\\omega = \\sqrt{k/m}$).",
          "Displacement, Velocity & Acceleration: $x(t) = A\\cos(\\omega t + \\phi)$; $v(t) = -A\\omega\\sin(\\omega t + \\phi) = \\pm\\omega\\sqrt{A^2 - x^2}$; $a(t) = -A\\omega^2\\cos(\\omega t + \\phi) = -\\omega^2 x$.",
          "Phase Relationships: Velocity leads displacement by $90^\\circ$ ($\\pi/2$ rad); Acceleration leads displacement by $180^\\circ$ ($\\pi$ rad)."
        ]
      },
      {
        "heading": "Energy in SHM, Oscillating Systems & Damped/Forced Resonance",
        "bullets": [
          "Energy in SHM: Kinetic Energy $K = \\frac{1}{2}m v^2 = \\frac{1}{2}k(A^2 - x^2)$; Potential Energy $U = \\frac{1}{2}kx^2$; Total Energy $E = K + U = \\frac{1}{2}kA^2 = \\frac{1}{2}m\\omega^2 A^2$ (Strictly constant in undamped SHM).",
          "Oscillating Systems: Simple Pendulum ($T = 2\\pi\\sqrt{L/g}$, independent of bob mass); Spring-Mass ($T = 2\\pi\\sqrt{m/k}$); Series Springs ($\\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2}$); Parallel Springs ($k_{\\text{eq}} = k_1 + k_2$).",
          "Damped Oscillations: Damping force $F_d = -b v$; Amplitude decays exponentially $A(t) = A_0 e^{-bt/2m}$.",
          "Forced Oscillations & Resonance: When driving frequency equals natural frequency ($\\omega_d = \\omega_0$), amplitude peaks dramatically."
        ]
      }
    ],
    "examTraps": [
      "Assuming the time period of a simple pendulum depends on the mass or material of the bob ($T$ depends ONLY on length $L$ and gravity $g$).",
      "Confusing frequency of kinetic energy oscillation ($2f$) with frequency of position oscillation ($f$)."
    ],
    "quickMentalCheck": "At what displacement from mean position is kinetic energy equal to potential energy in SHM? $K = U \\implies \\frac{1}{2}k(A^2 - x^2) = \\frac{1}{2}kx^2 \\implies A^2 = 2x^2 \\implies x = \\pm \\frac{A}{\\sqrt{2}}$.",
    "cueQuestions": [
      "Why is Simple Harmonic Motion represented as the projection of Uniform Circular Motion on a diameter?",
      "How does the frequency of total mechanical energy oscillation compare to the displacement frequency in SHM?",
      "What causes catastrophic mechanical resonance in bridges and buildings under periodic wind vortex shedding?"
    ],
    "workedExample": {
      "problem": "A spring having spring constant $1200\\text{ N/m}$ is mounted on a horizontal table. A mass of $3.0\\text{ kg}$ is attached to the free end of the spring, pulled sideways to a distance of $2.0\\text{ cm}$ and released. Determine the frequency of oscillation, maximum acceleration, and maximum speed of the mass.",
      "steps": [
        "Angular frequency: $\\omega = \\sqrt{\\frac{k}{m}} = \\sqrt{\\frac{1200\\text{ N/m}}{3.0\\text{ kg}}} = \\sqrt{400} = 20\\text{ rad/s}$.",
        "Frequency: $\\nu = \\frac{\\omega}{2\\pi} = \\frac{20}{2\\pi} \\approx 3.18\\text{ Hz}$.",
        "Maximum speed: $v_{\\text{max}} = \\omega A = (20\\text{ rad/s})(0.02\\text{ m}) = 0.40\\text{ m/s}$.",
        "Maximum acceleration: $a_{\\text{max}} = \\omega^2 A = (20)^2(0.02) = 400 \\times 0.02 = 8.0\\text{ m/s}^2$."
      ],
      "result": "\\nu = 3.18\\text{ Hz}, \\quad v_{\\text{max}} = 0.40\\text{ m/s}, \\quad a_{\\text{max}} = 8.0\\text{ m/s}^2"
    },
    "verificationProblem": "Check energy conservation: $E = \\frac{1}{2} k A^2 = 0.5(1200)(0.02)^2 = 0.24\\text{ J}$. Maximum kinetic energy: $\\frac{1}{2} m v_{\\text{max}}^2 = 0.5(3.0)(0.40)^2 = 0.24\\text{ J}$. Exact match.",
    "realWorldUse": "Tuned mass dampers in Taipei 101 skyscraper for typhoon sway suppression, quartz crystal resonators in electronic watches, vehicle shock absorbers.",
    "diagramType": "shm-energy-displacement-parabolas"
  },
  "CBSE-CH-G11-PHY-CH14": {
    "chapterTitle": "Waves",
    "subject": "Physics",
    "grade": 11,
    "chapterNum": 14,
    "essentialLaw": "v = \\nu \\lambda = \\frac{\\omega}{k} \\quad | \\quad v_{\\text{string}} = \\sqrt{\\frac{T}{\\mu}} \\quad | \\quad v_{\\text{sound}} = \\sqrt{\\frac{\\gamma P}{\\rho}} \\quad | \\quad f_{\\text{beat}} = |f_1 - f_2| \\quad | \\quad \\nu_n = \\frac{n v}{2L} \\; (\\text{Open Pipe})",
    "coreConcepts": [
      {
        "heading": "Transverse & Longitudinal Waves, Wave Speed & Laplace Correction",
        "bullets": [
          "Wave Equation: $y(x,t) = A\\sin(kx - \\omega t + \\phi)$ where wave number $k = \\frac{2\\pi}{\\lambda}$, angular frequency $\\omega = 2\\pi\\nu$, wave speed $v = \\frac{\\omega}{k} = \\nu\\lambda$.",
          "Transverse wave on stretched string: $v = \\sqrt{\\frac{T}{\\mu}}$ where $T$ is tension and $\\mu = m/L$ is linear mass density.",
          "Speed of Longitudinal Sound Wave: Newton formula $v = \\sqrt{\\frac{B_{\\text{iso}}}{\\rho}} = \\sqrt{\\frac{P}{\\rho}}$ ($280\\text{ m/s}$, flawed); Laplace Correction assuming adiabatic compression: $v = \\sqrt{\\frac{B_{\\text{ad}}}{\\rho}} = \\sqrt{\\frac{\\gamma P}{\\rho}} = \\sqrt{\\frac{\\gamma R T}{M}}$ ($332\\text{ m/s}$ in air at STP, verified)."
        ]
      },
      {
        "heading": "Principle of Superposition, Standing Waves & Beats",
        "bullets": [
          "Superposition: $y(x,t) = y_1(x,t) + y_2(x,t)$.",
          "Standing Waves in Stretched String: Nodes (zero amplitude, $x = \\frac{n\\lambda}{2}$) and Antinodes (maximum amplitude $2A$, $x = (2n-1)\\frac{\\lambda}{4}$); Normal modes: $\\nu_n = n\\frac{v}{2L}$ ($n = 1, 2, 3, \\dots$, all harmonics present).",
          "Organ Pipes: Open pipe has antinodes at both open ends: $\\nu_n = n\\frac{v}{2L}$ (All harmonics); Closed pipe has node at closed end and antinode at open end: $\\nu_n = (2n-1)\\frac{v}{4L}$ (Odd harmonics ONLY).",
          "Beats Phenomenon: Interference of two sound waves of slightly different frequencies: Beat frequency $f_{\\text{beat}} = |f_1 - f_2|$."
        ]
      }
    ],
    "examTraps": [
      "Forgetting that a closed organ pipe produces ONLY odd harmonics ($1st, 3rd, 5th$), while an open pipe produces ALL harmonics ($1st, 2nd, 3rd, 4th$).",
      "Confusing wave propagation speed ($v = \\omega/k$) with particle oscillation speed ($v_p = \\frac{\\partial y}{\\partial t} = -A\\omega\\cos(kx - \\omega t)$)."
    ],
    "quickMentalCheck": "An open organ pipe has fundamental frequency $300\\text{ Hz}$. If one end is closed, what is the new fundamental frequency? $\\nu_{\\text{closed}} = \\frac{v}{4L} = \\frac{1}{2}\\left(\\frac{v}{2L}\\right) = \\frac{300}{2} = 150\\text{ Hz}$.",
    "cueQuestions": [
      "Why was Laplace correction necessary for Newton formula for the speed of sound in air?",
      "Why does an open organ pipe sound richer and more musical than a closed organ pipe of the same fundamental pitch?",
      "How are acoustic beats used to tune musical instruments to precise standard pitches?"
    ],
    "workedExample": {
      "problem": "A string of mass $2.50\\text{ kg}$ is under a tension of $200\\text{ N}$. The length of the stretched string is $20.0\\text{ m}$. If the transverse jerk is struck at one end of the string, how long does the disturbance take to reach the other end?",
      "steps": [
        "Calculate linear mass density: $\\mu = \\frac{m}{L} = \\frac{2.50\\text{ kg}}{20.0\\text{ m}} = 0.125\\text{ kg/m}$.",
        "Speed of transverse wave: $v = \\sqrt{\\frac{T}{\\mu}} = \\sqrt{\\frac{200\\text{ N}}{0.125\\text{ kg/m}}} = \\sqrt{1600} = 40.0\\text{ m/s}$.",
        "Time taken to travel length $L = 20.0\\text{ m}$: $t = \\frac{L}{v} = \\frac{20.0\\text{ m}}{40.0\\text{ m/s}} = 0.50\\text{ s}$."
      ],
      "result": "t = 0.50\\text{ s}"
    },
    "verificationProblem": "Check distance: $d = v \\times t = 40.0\\text{ m/s} \\times 0.50\\text{ s} = 20.0\\text{ m} = L$. Verified.",
    "realWorldUse": "Ultrasonic non-destructive flaw detection in aircraft hulls, sonar bathymetric ocean depth mapping, musical acoustics in string and brass instruments.",
    "diagramType": "standing-waves-string-nodes-antinodes"
  },
  "CBSE-CH-G11-CHEM-CH01": {
    "chapterTitle": "Some Basic Concepts of Chemistry",
    "subject": "CHEMISTRY",
    "grade": 11,
    "chapterNum": 1,
    "essentialLaw": "$n = \\frac{m}{M} = \\frac{N}{N_A} = \\frac{V_{\\text{STP}}}{22.7\\text{ L}} \\quad \\Big| \\quad M = \\frac{n_{\\text{solute}}}{V_{\\text{solution (L)}}} \\quad \\Big| \\quad m = \\frac{n_{\\text{solute}}}{w_{\\text{solvent (kg)}}}$",
    "coreConcepts": [
      {
        "heading": "Laws of Chemical Combination & Atomic Mass",
        "bullets": [
          "Law of Conservation of Mass (Lavoisier), Definite Proportions (Proust), Multiple Proportions (Dalton), Gay-Lussac's Gaseous Volumes, and Avogadro's Law ($V \\propto n$ at constant $T, P$).",
          "Atomic mass unit: $1\\text{ amu} = 1\\text{ u} = \\frac{1}{12} \\text{ mass of one } ^{12}\\text{C atom} = 1.66056 \\times 10^{-24}\\text{ g}$."
        ]
      },
      {
        "heading": "The Mole Concept, Molar Mass & Formulas",
        "bullets": [
          "One mole contains exactly $6.02214076 \\times 10^{23}$ elementary entities (Avogadro constant $N_A$). Molar mass is the mass of 1 mole of a substance in grams.",
          "Empirical Formula represents the simplest whole-number ratio of various atoms present in a compound; Molecular Formula shows the exact number of different types of atoms ($\text{MF} = n \\times \\text{EF}$, where $n = \\frac{\\text{Molar Mass}}{\\text{Empirical Mass}}$)."
        ]
      },
      {
        "heading": "Stoichiometry, Limiting Reagent & Solution Concentrations",
        "bullets": [
          "Stoichiometric calculations correlate balanced molar quantities of reactants and products.",
          "Limiting Reagent: The reactant that is completely consumed first in a reaction and dictates the theoretical yield of products.",
          "Concentration metrics: Mass % $= \\frac{\\text{Mass of solute}}{\\text{Mass of solution}} \\times 100$; Mole Fraction $x_A = \\frac{n_A}{n_A + n_B}$; Molarity $M = \\frac{n}{V\\text{(L)}}$ (temperature-dependent); Molality $m = \\frac{n}{w\\text{(kg)}}$ (temperature-independent)."
        ]
      }
    ],
    "examTraps": [
      "Molarity vs Molality Temperature Dependence: Forgetting that Molarity (M) varies with temperature due to thermal expansion of solution volume, whereas Molality (m) remains strictly constant because mass is temperature-independent.",
      "Limiting Reagent Stoichiometric Division: Identifying the limiting reagent simply by comparing given mole values without dividing by their respective stoichiometric coefficients.",
      "Empirical vs Molecular Formula Multiplier: Reporting the empirical formula as the final answer instead of evaluating the integer multiplier n = Molar Mass / Empirical Mass."
    ],
    "quickMentalCheck": "Calculate the moles in 44 g of CO2 (n = 44/44 = 1.0 mol) and its volume at STP (22.7 L).",
    "cueQuestions": [
      "State the 5 Laws of Chemical Combination and explain Avogadro hypothesis.",
      "Why is Molality preferred over Molarity in quantitative analytical experiments conducted across variable temperatures?",
      "How is the limiting reagent identified in a reaction, and how does it determine maximum product yield?"
    ],
    "workedExample": {
      "problem": "A compound contains 4.07% hydrogen, 24.27% carbon and 71.65% chlorine. Its molar mass is 98.96 g/mol. Determine its empirical and molecular formulas.",
      "steps": [
        "Step 1: Compute moles of each element: H = 4.07/1.008 = 4.04 mol; C = 24.27/12.01 = 2.021 mol; Cl = 71.65/35.45 = 2.021 mol.",
        "Step 2: Determine simplest molar ratio: C : H : Cl = (2.021/2.021) : (4.04/2.021) : (2.021/2.021) = 1 : 2 : 1 => Empirical Formula = CH2Cl.",
        "Step 3: Calculate empirical formula mass: 12.01 + 2(1.008) + 35.45 = 49.48 g/mol.",
        "Step 4: Compute integer multiplier: n = 98.96 / 49.48 = 2.0.",
        "Step 5: Deducing molecular formula: (CH2Cl)2 = C2H4Cl2 (1,2-dichloroethane)."
      ],
      "result": "Empirical Formula is CH2Cl and Molecular Formula is C2H4Cl2."
    },
    "verificationProblem": "Calculate the mass of CO2 produced by the complete combustion of 16 g of methane (CH4 + 2O2 -> CO2 + 2H2O). (Answer: 1 mol CH4 (16 g) produces 1 mol CO2 (44 g)).",
    "realWorldUse": "Applied in industrial chemical manufacturing, active pharmaceutical ingredient synthesis, stoichiometric fuel combustion, and environmental emissions testing.",
    "diagramType": "visual_model_pending"
  },
  "CBSE-CH-G11-CHEM-CH02": {
    "chapterTitle": "Structure of Atom",
    "subject": "CHEMISTRY",
    "grade": 11,
    "chapterNum": 2,
    "essentialLaw": "$E = h\\nu = \\frac{hc}{\\lambda} \\quad \\Big| \\quad \\lambda = \\frac{h}{p} = \\frac{h}{mv} \\quad \\Big| \\quad \\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi} \\quad \\Big| \\quad \\bar{\\nu} = R_H \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$",
    "coreConcepts": [
      {
        "heading": "Dual Nature of Radiation and Matter",
        "bullets": [
          "Planck's Quantum Theory: Radiated energy is quantized in discrete packets called photons: $E = h\\nu$.",
          "Photoelectric Effect: $h\\nu = h\\nu_0 + \\frac{1}{2}m_e v^2$ (where $h\\nu_0 = W_0$ is the work function).",
          "de Broglie wavelength: Matter exhibits dual wave-particle properties with wavelength $\\lambda = \\frac{h}{mv}$."
        ]
      },
      {
        "heading": "Bohr Model & Quantum Mechanical Framework",
        "bullets": [
          "Bohr Postulates: Angular momentum quantization $mvr = \\frac{nh}{2\\pi}$; Energy levels for H-atom $E_n = -2.18 \\times 10^{-18} \\left(\\frac{Z^2}{n^2}\\right)\\text{ J}$.",
          "Heisenberg Uncertainty Principle: It is impossible to simultaneously determine with arbitrary precision both position and momentum of a microscopic particle: $\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$."
        ]
      },
      {
        "heading": "Quantum Numbers & Electronic Configuration",
        "bullets": [
          "Four Quantum Numbers: Principal ($n = 1,2,3...$), Azimuthal ($l = 0 \\dots n-1$), Magnetic ($m_l = -l \\dots +l$), and Electron Spin ($m_s = \\pm 1/2$).",
          "Aufbau Principle ($(n+l)$ rule), Pauli Exclusion Principle (no two electrons in an atom have the same 4 quantum numbers), and Hund's Rule of Maximum Multiplicity (pairing in degenerate orbitals begins only after each orbital is singly occupied)."
        ]
      }
    ],
    "examTraps": [
      "Half-Filled & Fully-Filled d-Orbital Exceptions: Writing ground-state configuration of Chromium (Z=24) as [Ar] 4s2 3d4 instead of [Ar] 4s1 3d5, or Copper (Z=29) as [Ar] 4s2 3d9 instead of [Ar] 4s1 3d10.",
      "(n+l) Rule Precedence in Orbital Filling: Forgetting that 4s (4+0=4) fills before 3d (3+2=5) because it possesses lower energy.",
      "Photoelectric Kinetic Energy vs Light Intensity: Mistaking light intensity for photon energy (intensity controls the number of emitted electrons, whereas photon frequency nu dictates the kinetic energy)."
    ],
    "quickMentalCheck": "State the total number of orbitals in a shell with principal quantum number n = 3 (n^2 = 9 orbitals).",
    "cueQuestions": [
      "State de Broglie hypothesis and derive the expression for matter wavelength.",
      "Explain Heisenberg Uncertainty Principle and its physical significance for microscopic particles.",
      "What are the four quantum numbers and what information does each provide about an electron in an atom?"
    ],
    "workedExample": {
      "problem": "Calculate the wavelength, frequency and wavenumber of a light wave whose period is 2.0 x 10^-10 s.",
      "steps": [
        "Step 1: Frequency nu = 1 / T = 1 / (2.0 x 10^-10 s) = 5.0 x 10^9 s^-1 (Hz).",
        "Step 2: Wavelength lambda = c / nu = (3.0 x 10^8 m/s) / (5.0 x 10^9 s^-1) = 6.0 x 10^-2 m = 0.06 m.",
        "Step 3: Wavenumber nu_bar = 1 / lambda = 1 / 0.06 m = 16.66 m^-1."
      ],
      "result": "Frequency = 5.0 x 10^9 Hz, Wavelength = 6.0 x 10^-2 m, Wavenumber = 16.66 m^-1."
    },
    "verificationProblem": "Verify why the electronic configuration of Cr is [Ar] 3d5 4s1 rather than [Ar] 3d4 4s2 based on orbital symmetry and exchange energy.",
    "realWorldUse": "Applied in semiconductor lasers, atomic absorption spectroscopy, electron microscopy (TEM/SEM), and magnetic resonance imaging (MRI).",
    "diagramType": "visual_model_pending"
  },
  "CBSE-CH-G11-CHEM-CH03": {
    "chapterTitle": "Classification of Elements and Periodicity in Properties",
    "subject": "Chemistry",
    "grade": 11,
    "chapterNum": 3,
    "essentialLaw": "Z_{\\text{eff}} = Z - \\sigma \\quad | \\quad \\Delta_i H_1 < \\Delta_i H_2 < \\Delta_i H_3 \\quad | \\quad \\chi_{\\text{Pauling}} \\propto \\sqrt{\\Delta E_{\\text{bond}}} \\quad | \\quad \\Delta_{\\text{eg}} H(\\text{Cl}) > \\Delta_{\\text{eg}} H(\\text{F})",
    "coreConcepts": [
      {
        "heading": "Modern Periodic Law, Electronic Configurations & Atomic Radii",
        "bullets": [
          "Modern Periodic Law: Physical and chemical properties of elements are periodic functions of their atomic numbers ($Z$); 18 groups and 7 periods.",
          "Atomic & Ionic Radii: Covalent, Van der Waals ($r_{\\text{vdw}} > r_{\\text{cov}}$), Metallic radii; Across a period, atomic radius decreases due to increasing effective nuclear charge $Z_{\\text{eff}} = Z - \\sigma$; Down a group, radius increases due to addition of new electronic shells.",
          "Isoelectronic Species: Same number of electrons; Radius decreases with increasing positive nuclear charge: $\\text{O}^{2-} (1.40\\text{ \\AA}) > \\text{F}^- (1.33\\text{ \\AA}) > \\text{Na}^+ (1.02\\text{ \\AA}) > \\text{Mg}^{2+} (0.72\\text{ \\AA}) > \\text{Al}^{3+} (0.54\\text{ \\AA})$."
        ]
      },
      {
        "heading": "Ionization Enthalpy, Electron Gain Enthalpy & Electronegativity",
        "bullets": [
          "Ionization Enthalpy ($\\Delta_i H$): Energy required to remove the outermost electron from an isolated gaseous atom; General trend: Increases across period, decreases down group; Anomalies: $\\Delta_i H(\\text{Be}) > \\Delta_i H(\\text{B})$ due to stable fully filled $2s^2$; $\\Delta_i H(\\text{N}) > \\Delta_i H(\\text{O})$ due to stable half-filled $2p^3$.",
          "Electron Gain Enthalpy ($\\Delta_{\\text{eg}} H$): Energy change when an electron is added to isolated gaseous atom; Halogens have most negative values; Anomaly: $\\Delta_{\\text{eg}} H(\\text{Cl}) = -349\\text{ kJ/mol}$ is MORE negative than $\\Delta_{\\text{eg}} H(\\text{F}) = -328\\text{ kJ/mol}$ due to interelectronic repulsions in compact $2p$ subshell of Fluorine.",
          "Electronegativity ($\\chi$): Tendency of an atom in a chemical compound to attract shared pair of electrons; Pauling scale: $\\text{F} (4.0) > \\text{O} (3.5) > \\text{N} (3.0) \\approx \\text{Cl} (3.0)$."
        ]
      }
    ],
    "examTraps": [
      "Assuming Fluorine has higher negative electron gain enthalpy than Chlorine (Chlorine has the highest negative $\\Delta_{\\text{eg}} H$ in the periodic table due to lower electron repulsion).",
      "Thinking Oxygen has higher first ionization enthalpy than Nitrogen (Nitrogen is higher due to extra exchange energy of half-filled $2p^3$)."
    ],
    "quickMentalCheck": "Arrange in order of increasing ionic radius: $\\text{Al}^{3+}, \\text{Mg}^{2+}, \\text{Na}^+, \\text{F}^-$. Order: $\\text{Al}^{3+} < \\text{Mg}^{2+} < \\text{Na}^+ < \\text{F}^-$ (Highest nuclear charge gives smallest radius for isoelectronic ions).",
    "cueQuestions": [
      "Why is the first ionization enthalpy of Nitrogen higher than that of Oxygen, while the second ionization enthalpy of Oxygen is higher than that of Nitrogen?",
      "Why is the electron gain enthalpy of noble gases positive rather than negative?",
      "How does the diagonal relationship between Li-Mg and Be-Al arise from identical polarizing power (charge/radius ratio)?"
    ],
    "workedExample": {
      "problem": "Explain why the first ionization enthalpy of Boron ($Z=5$) is slightly less than that of Beryllium ($Z=4$), whereas the second ionization enthalpy of Boron is much greater than that of Beryllium.",
      "steps": [
        "Electronic configurations: $\\text{Be} = 1s^2 2s^2$; $\\text{B} = 1s^2 2s^2 2p^1$.",
        "First ionization enthalpy: For $\\text{Be}$, the electron is removed from a stable, penetrating, fully filled $2s$ subshell. For $\\text{B}$, the electron is removed from a less penetrating $2p$ subshell shielded by the inner $2s^2$ electrons. Hence, $\\Delta_i H_1(\\text{B}) = 801\\text{ kJ/mol} < \\Delta_i H_1(\\text{Be}) = 899\\text{ kJ/mol}$.",
        "Second ionization enthalpy: $\\text{Be}^+ = 1s^2 2s^1 \\implies$ electron removed from $2s$. $\\text{B}^+ = 1s^2 2s^2 \\implies$ electron removed from stable fully filled $2s^2$. Furthermore, for $\\text{B}^+$, $Z_{\\text{eff}}$ is much higher ($Z=5$ pulling 4 electrons). Thus, $\\Delta_i H_2(\\text{B}) = 2427\\text{ kJ/mol} \\gg \\Delta_i H_2(\\text{Be}) = 1757\\text{ kJ/mol}$."
      ],
      "result": "\\Delta_i H_1(\\text{B}) < \\Delta_i H_1(\\text{Be}) \\; (\\text{due to } 2p^1 \\text{ shielding}), \\quad \\Delta_i H_2(\\text{B}) \\gg \\Delta_i H_2(\\text{Be})"
    },
    "verificationProblem": "Check shielding and penetrating power order: $s > p > d > f$. Penetration of $2s > 2p$ explains lower $\\Delta_i H_1$ of Boron. Experimental data verified.",
    "realWorldUse": "Designing semiconductor bandgaps from electronegativity differences (e.g., GaN, InP), predicting alloy formation using Hume-Rothery radius rules.",
    "diagramType": "periodic-trends-ionization-electronegativity"
  },
  "CBSE-CH-G11-CHEM-CH04": {
    "chapterTitle": "Chemical Bonding and Molecular Structure",
    "subject": "Chemistry",
    "grade": 11,
    "chapterNum": 4,
    "essentialLaw": "\\text{Bond Order} = \\frac{N_b - N_a}{2} \\quad | \\quad \\mu = q \\times d \\quad | \\quad \\text{VSEPR Repulsion: } \\text{lp-lp} > \\text{lp-bp} > \\text{bp-bp}",
    "coreConcepts": [
      {
        "heading": "Lewis Structures, VSEPR Theory & Hybridization",
        "bullets": [
          "Octet Rule Exceptions: Incomplete octet ($\\text{BF}_3, \\text{BeCl}_2$), odd-electron molecules ($\\text{NO}, \\text{NO}_2$), expanded octet ($\\text{PCl}_5, \\text{SF}_6, \\text{IF}_7$).",
          "VSEPR Theory: Molecular geometry is determined by minimizing electron pair repulsions: $\\text{lp-lp} > \\text{lp-bp} > \\text{bp-bp}$; Examples: $\\text{CH}_4$ (tetrahedral, $109.5^\\circ$), $\\text{NH}_3$ (trigonal pyramidal, $107^\\circ$, 1 lp), $\\text{H}_2\\text{O}$ (bent, $104.5^\\circ$, 2 lp), $\\text{SF}_4$ (see-saw), $\\text{ClF}_3$ (T-shaped), $\\text{XeF}_4$ (square planar).",
          "Hybridization: Steric Number $= \\text{number of } \\sigma\\text{-bonds} + \\text{lone pairs}$; $sp$ (linear), $sp^2$ (trigonal planar), $sp^3$ (tetrahedral), $sp^3d$ (trigonal bipyramidal: axial bonds longer than equatorial bonds due to repulsion), $sp^3d^2$ (octahedral)."
        ]
      },
      {
        "heading": "Molecular Orbital Theory (MOT) & Hydrogen Bonding",
        "bullets": [
          "LCAO Principles: Constructive interference $\\to$ Bonding MO ($sigma, pi$); Destructive interference $\\to$ Antibonding MO ($sigma^*, pi^*$).",
          "Energy Level Order: For $\\text{B}_2, \\text{C}_2, \\text{N}_2$ ($le 14$ electrons, $sp$-mixing): $\\sigma 1s < \\sigma^* 1s < \\sigma 2s < \\sigma^* 2s < (\\pi 2p_x = \\pi 2p_y) < \\sigma 2p_z < (\\pi^* 2p_x = \\pi^* 2p_y) < \\sigma^* 2p_z$.",
          "Energy Level Order: For $\\text{O}_2, \\text{F}_2$ ($> 14$ electrons, no $sp$-mixing): $\\sigma 1s < \\sigma^* 1s < \\sigma 2s < \\sigma^* 2s < \\sigma 2p_z < (\\pi 2p_x = \\pi 2p_y) < (\\pi^* 2p_x = \\pi^* 2p_y) < \\sigma^* 2p_z$.",
          "Bond Order $= \\frac{N_b - N_a}{2}$; Paramagnetism of $\\text{O}_2$: $\\text{O}_2$ has bond order $= 2$ and 2 unpaired electrons in $(\\pi^* 2p_x, \\pi^* 2p_y)$, successfully explaining experimental paramagnetism where VBT failed.",
          "Hydrogen Bonding: Dipole-dipole attraction between H bonded to N, O, F and another electronegative atom; Intermolecular (high boiling point of $\\text{H}_2\\text{O}$, o-nitrophenol vs p-nitrophenol separation)."
        ]
      }
    ],
    "examTraps": [
      "Using the $sp$-mixing MO configuration ($pi 2p < sigma 2p$) for $\text{O}_2$ or $\text{F}_2$ (for $\text{O}_2$ and $\text{F}_2$, $sigma 2p_z$ is LOWER in energy than $pi 2p_x, pi 2p_y$).",
      "Confusing axial and equatorial bond lengths in $\text{PCl}_5$ (axial bonds are LONGER and weaker because they experience 3 equatorial repulsions at $90^circ$)."
    ],
    "quickMentalCheck": "Calculate the bond order and magnetic behavior of $\\text{N}_2^+$ (13 electrons): $N_b = 9, N_a = 4 \\implies \\text{Bond Order} = \\frac{9-4}{2} = 2.5$; 1 unpaired electron $\\implies$ Paramagnetic.",
    "cueQuestions": [
      "How does Molecular Orbital Theory successfully explain the observed paramagnetism of liquid oxygen ($\text{O}_2$)?",
      "Why are the axial bonds in $\text{PCl}_5$ longer and weaker than the equatorial bonds?",
      "Why does water ($\text{H}_2\text{O}$) have an anomalously high boiling point compared to hydrogen sulfide ($\text{H}_2\text{S}$)?"
    ],
    "workedExample": {
      "problem": "Draw the MO energy level diagram and calculate the bond order and magnetic character of $\\text{O}_2, \\text{O}_2^+$, and $\\text{O}_2^{2-}$. Arrange them in increasing order of bond stability.",
      "steps": [
        "Total electrons: $\\text{O}_2$ (16), $\\text{O}_2^+$ (15), $\\text{O}_2^{2-}$ (18).",
        "MO configuration of $\\text{O}_2$: $\\sigma 1s^2 \\sigma^* 1s^2 \\sigma 2s^2 \\sigma^* 2s^2 \\sigma 2p_z^2 (\\pi 2p_x^2 = \\pi 2p_y^2) (\\pi^* 2p_x^1 = \\pi^* 2p_y^1)$.",
        "Bond orders: $\\text{O}_2: \\frac{10 - 6}{2} = 2.0$ (Paramagnetic, 2 unpaired $e^-$).",
        "$\\text{O}_2^+: \\frac{10 - 5}{2} = 2.5$ (Paramagnetic, 1 unpaired $e^-$).",
        "$\\text{O}_2^{2-}: \\frac{10 - 8}{2} = 1.0$ (Diamagnetic, 0 unpaired $e^-$).",
        "Bond stability is directly proportional to Bond Order: $\\text{O}_2^{2-} (1.0) < \\text{O}_2 (2.0) < \\text{O}_2^+ (2.5)$."
      ],
      "result": "\\text{Stability: } \\text{O}_2^{2-} (\\text{B.O.} = 1.0) < \\text{O}_2 (\\text{B.O.} = 2.0) < \\text{O}_2^+ (\\text{B.O.} = 2.5)"
    },
    "verificationProblem": "Check bond length inverse relationship: Higher bond order means shorter bond length and higher bond dissociation enthalpy: $\\text{O}_2^+ (112\\text{ pm}) < \\text{O}_2 (121\\text{ pm}) < \\text{O}_2^{2-} (149\\text{ pm})$. Verified.",
    "realWorldUse": "Liquid oxygen rocket propellants, fluoropolymer non-stick chemical resistance, molecular docking in drug receptor binding.",
    "diagramType": "molecular-orbital-energy-diagram-o2"
  },
  "CBSE-CH-G11-CHEM-CH05": {
    "chapterTitle": "Chemical Thermodynamics",
    "subject": "Chemistry",
    "grade": 11,
    "chapterNum": 5,
    "essentialLaw": "\\Delta U = q + w \\quad | \\quad \\Delta H = \\Delta U + \\Delta n_g R T \\quad | \\quad \\Delta S = \\frac{q_{\\text{rev}}}{T} \\quad | \\quad \\Delta G = \\Delta H - T\\Delta S = -R T \\ln K_c",
    "coreConcepts": [
      {
        "heading": "First Law of Thermodynamics, Enthalpy & Hess Law",
        "bullets": [
          "State Functions vs Path Functions: $U, H, S, G, T, P, V$ are state functions (depend only on initial and final states); $q$ and $w$ are path functions.",
          "First Law: $\\Delta U = q + w$ (IUPAC sign convention: $w = -P_{\\text{ext}}\\Delta V$ for expansion, $w > 0$ for compression).",
          "Enthalpy ($H = U + PV$): $\\Delta H = \\Delta U + \\Delta n_g R T$ where $\\Delta n_g = \\sum n_{\\text{gaseous products}} - \\sum n_{\\text{gaseous reactants}}$.",
          "Hess's Law of Constant Heat Summation: Overall enthalpy change for a reaction is identical whether carried out in one step or a series of intermediate steps: $\\Delta_r H^\\circ = \\sum \\Delta_f H^\\circ(\\text{products}) - \\sum \\Delta_f H^\\circ(\\text{reactants})$.",
          "Born-Haber Cycle: Lattice enthalpy determination from sublimation, ionization, dissociation, electron gain, and formation enthalpies."
        ]
      },
      {
        "heading": "Second & Third Laws, Entropy & Gibbs Free Energy",
        "bullets": [
          "Entropy ($S$): Measure of molecular randomness/disorder; $\\Delta S = \\frac{q_{\\text{rev}}}{T}$; Second Law: Total entropy of the universe increases in any spontaneous process ($\\Delta S_{\\text{total}} = \\Delta S_{\\text{sys}} + \\Delta S_{\\text{surr}} > 0$).",
          "Gibbs Free Energy ($G = H - TS$): Spontaneity criterion at constant $T$ and $P$: $\\Delta G = \\Delta H - T\\Delta S < 0$ (Spontaneous forward), $\\Delta G = 0$ (Equilibrium), $\\Delta G > 0$ (Non-spontaneous).",
          "Conditions for Spontaneity: If $\\Delta H < 0, \\Delta S > 0 \\implies$ Spontaneous at ALL temperatures; If $\\Delta H > 0, \\Delta S < 0 \\implies$ Non-spontaneous at ALL temperatures; If $\\Delta H > 0, \\Delta S > 0 \\implies$ Spontaneous only at HIGH temperatures ($T > \\Delta H/\\Delta S$).",
          "Standard Gibbs Energy and Equilibrium: $\\Delta G^\\circ = -2.303 R T \\log_{10} K_c$; Third Law: Entropy of a perfectly crystalline substance approaches zero at absolute zero temperature ($0\\text{ K}$)."
        ]
      }
    ],
    "examTraps": [
      "Forgetting that standard enthalpy of formation $\\Delta_f H^\\circ$ of pure elements in their standard states (e.g., $\\text{O}_2(g), \\text{C}(\\text{graphite}), \\text{Br}_2(l)$) is DEFINED as exactly zero.",
      "Mixing units between $\\Delta H$ (usually in $\\text{kJ/mol}$) and $\\Delta S$ (usually in $\\text{J/K}\\cdot\\text{mol}$) when computing $\\Delta G = \\Delta H - T\\Delta S$."
    ],
    "quickMentalCheck": "For the reaction $\\text{N}_2(g) + 3\\text{H}_2(g) \\to 2\\text{NH}_3(g)$, what is $\\Delta n_g$ and the sign of $\\Delta S$? $\\Delta n_g = 2 - (1+3) = -2$; $\\Delta S < 0$ (4 moles of gas convert into 2 moles, decreasing disorder).",
    "cueQuestions": [
      "Why is $\\Delta H$ measured in a constant pressure calorimeter while $\\Delta U$ is measured in a constant volume bomb calorimeter?",
      "How does Gibbs Free Energy change ($Delta G$) serve as a single criterion for spontaneity combining both enthalpy and entropy factors?",
      "Why is the entropy of a liquid higher than its solid, but much lower than its vapor phase?"
    ],
    "workedExample": {
      "problem": "For the reaction: $2\\text{A}(g) + \\text{B}(g) \\to 2\\text{D}(g)$, $\\Delta U^\\circ = -10.5\\text{ kJ}$ and $\\Delta S^\\circ = -44.1\\text{ J/K}$ at $298\\text{ K}$. Calculate $\\Delta G^\\circ$ for the reaction and predict whether the reaction is spontaneous.",
      "steps": [
        "Calculate $\\Delta n_g$: $\\Delta n_g = 2 - (2 + 1) = 2 - 3 = -1\\text{ mol}$.",
        "Calculate $\\Delta H^\\circ$: $\\Delta H^\\circ = \\Delta U^\\circ + \\Delta n_g R T$.",
        "$\\Delta H^\\circ = -10.5\\text{ kJ} + (-1)(8.314 \\times 10^{-3}\\text{ kJ/K}\\cdot\\text{mol})(298\\text{ K}) = -10.5 - 2.478 = -12.98\\text{ kJ}$.",
        "Calculate $\\Delta G^\\circ$: $\\Delta G^\\circ = \\Delta H^\\circ - T\\Delta S^\\circ$.",
        "Convert $\\Delta S^\\circ$ to kJ: $\\Delta S^\\circ = -44.1\\text{ J/K} = -0.0441\\text{ kJ/K}$.",
        "$\\Delta G^\\circ = -12.98\\text{ kJ} - (298\\text{ K})(-0.0441\\text{ kJ/K}) = -12.98 + 13.14 = +0.16\\text{ kJ}$."
      ],
      "result": "\\Delta G^\\circ = +0.16\\text{ kJ} \\; (\\text{Non-spontaneous in standard state at } 298\\text{ K})"
    },
    "verificationProblem": "Check temperature threshold for spontaneity: Since $\\Delta H < 0$ and $\\Delta S < 0$, reaction is spontaneous at LOW temperatures ($T < \\Delta H/\\Delta S = 12980/44.1 = 294.3\\text{ K}$). At $298\\text{ K} > 294.3\\text{ K}$, $\\Delta G > 0$. Verified.",
    "realWorldUse": "Cryogenic air liquefaction cycle design, metallurgical Ellingham diagram reduction temperature predictions, blast furnace thermodynamics.",
    "diagramType": "born-haber-cycle-lattice-energy"
  },
  "CBSE-CH-G11-CHEM-CH06": {
    "chapterTitle": "Equilibrium",
    "subject": "Chemistry",
    "grade": 11,
    "chapterNum": 6,
    "essentialLaw": "K_p = K_c(RT)^{\\Delta n_g} \\quad | \\quad \\text{pH} = -\\log_{10}[\\text{H}^+] \\quad | \\quad \\text{pH} = pK_a + \\log_{10}\\left(\\frac{[\\text{Salt}]}{[\\text{Acid}]}\\right) \\quad | \\quad K_{sp} = [M^{m+}]^x [X^{x-}]^y",
    "coreConcepts": [
      {
        "heading": "Chemical Equilibrium, $K_p-K_c$ Relation & Le Chatelier's Principle",
        "bullets": [
          "Law of Mass Action: For $aA + bB \\rightleftharpoons cC + dD$, $K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$; Relation: $K_p = K_c(RT)^{\\Delta n_g}$.",
          "Reaction Quotient ($Q$): If $Q < K$, reaction proceeds forward; If $Q = K$, at equilibrium; If $Q > K$, reaction proceeds in reverse.",
          "Le Chatelier's Principle: When a dynamic equilibrium is subjected to stress (concentration, temperature, pressure, volume, catalyst), the system shifts in the direction that counteracts the stress.",
          "Pressure effect: Increasing pressure shifts toward fewer gaseous moles ($\\Delta n_g < 0$); Temperature: Increasing $T$ favors endothermic direction ($\\Delta H > 0$); Catalyst increases forward and reverse rates equally without shifting equilibrium position."
        ]
      },
      {
        "heading": "Ionic Equilibrium: pH, Buffer Solutions & Solubility Product",
        "bullets": [
          "Ionic Product of Water: $K_w = [\\text{H}^+][\\text{OH}^-] = 1.0 \\times 10^{-14}$ at $298\\text{ K}$; $\\text{pH} + \\text{pOH} = 14$.",
          "Ostwald's Dilution Law for weak acids/bases: $\\alpha = \\sqrt{\\frac{K_a}{C}}$; $[\\text{H}^+] = C\\alpha = \\sqrt{K_a C}$.",
          "Common Ion Effect: Suppression of ionization of a weak electrolyte by adding a strong electrolyte containing a common ion (e.g., $\\text{CH}_3\\text{COONa}$ added to $\\text{CH}_3\\text{COOH}$).",
          "Henderson-Hasselbalch Equation for Buffers: Acidic buffer ($\\text{pH} = pK_a + \\log_{10}\\frac{[\\text{Conjugate Base}]}{[\\text{Acid}]}$); Basic buffer ($\\text{pOH} = pK_b + \\log_{10}\\frac{[\\text{Conjugate Acid}]}{[\\text{Base}]}$).",
          "Solubility Product ($K_{sp}$): For sparingly soluble salt $A_x B_y \\rightleftharpoons x A^{y+} + y B^{x-}$, $K_{sp} = x^x y^y S^{x+y}$; Precipitation occurs when Ionic Product $Q_{sp} > K_{sp}$."
        ]
      }
    ],
    "examTraps": [
      "Including pure liquids or solids in the equilibrium constant expression ($[\\text{H}_2\\text{O}(l)] = 1$ and $[\\text{solid}] = 1$).",
      "Calculating the pH of extremely dilute strong acid ($10^{-8}\\text{ M HCl}$) as 8 (must add $[\\text{H}^+]$ from water autoionization: $[\\text{H}^+] = 10^{-8} + 10^{-7} = 1.1 \\times 10^{-7}\\text{ M} \\implies \\text{pH} = 6.96$)."
    ],
    "quickMentalCheck": "What is the pH of a buffer solution containing equal concentrations of acetic acid and sodium acetate ($pK_a = 4.76$)? $\\text{pH} = pK_a + \\log_{10}(1) = 4.76 + 0 = 4.76$.",
    "cueQuestions": [
      "How does Le Chatelier Principle optimize the industrial production of ammonia in the Haber Process ($N_2 + 3H_2 \\rightleftharpoons 2NH_3, \\Delta H = -92.4\\text{ kJ}$)?",
      "Why does blood maintain a steady pH of $\\approx 7.4$ using the carbonic acid-bicarbonate buffer system?",
      "How is qualitative analysis of basic radicals in salt analysis governed by the common ion effect and solubility product ($K_{sp}$)?"
    ],
    "workedExample": {
      "problem": "Calculate the solubility of $\\text{Ag}_2\\text{CrO}_4$ in pure water at $298\\text{ K}$ if its solubility product is $K_{sp} = 1.1 \\times 10^{-12}$.",
      "steps": [
        "Dissociation equilibrium: $\\text{Ag}_2\\text{CrO}_4(s) \\rightleftharpoons 2\\text{Ag}^+(aq) + \\text{CrO}_4^{2-}(aq)$.",
        "If molar solubility is $S$, then $[\\text{Ag}^+] = 2S$ and $[\\text{CrO}_4^{2-}] = S$.",
        "Solubility product expression: $K_{sp} = [\\text{Ag}^+]^2 [\\text{CrO}_4^{2-}] = (2S)^2 (S) = 4S^3$.",
        "Solve for $S$: $4S^3 = 1.1 \\times 10^{-12} \\implies S^3 = \\frac{1.1 \\times 10^{-12}}{4} = 2.75 \\times 10^{-13} = 275 \\times 10^{-15}$.",
        "Take cube root: $S = (275)^{1/3} \\times 10^{-5} \\approx 6.50 \\times 10^{-5}\\text{ mol/L}$."
      ],
      "result": "S = 6.50 \\times 10^{-5}\\text{ mol/L}"
    },
    "verificationProblem": "Check $K_{sp}$ reconstruction: $K_{sp} = 4(6.50 \\times 10^{-5})^3 = 4(274.6 \\times 10^{-15}) = 1.098 \\times 10^{-12} \\approx 1.1 \\times 10^{-12}$. Verified.",
    "realWorldUse": "Human blood carbonate-bicarbonate pH regulation buffer, barium swallow X-ray contrast media safety due to ultra-low $K_{sp}$ of $\\text{BaSO}_4$, industrial Haber ammonia synthesis.",
    "diagramType": "le-chatelier-equilibrium-haber-process"
  },
  "CBSE-CH-G11-CHEM-CH07": {
    "chapterTitle": "Redox Reactions",
    "subject": "Chemistry",
    "grade": 11,
    "chapterNum": 7,
    "essentialLaw": "\\text{Oxidation: Loss of } e^- \\; (\\Delta\\text{O.N.} > 0) \\quad | \\quad \\text{Reduction: Gain of } e^- \\; (\\Delta\\text{O.N.} < 0) \\quad | \\quad \\sum \\text{O.N.} = \\text{Total Charge}",
    "coreConcepts": [
      {
        "heading": "Classical & Electronic Redox Concepts & Oxidation Number Rules",
        "bullets": [
          "Classical: Oxidation is addition of oxygen/electronegative element or removal of hydrogen; Reduction is addition of hydrogen or removal of oxygen.",
          "Electronic Concept: Oxidation is loss of electrons (OIL); Reduction is gain of electrons (RIG).",
          "Oxidation Number Rules: Elemental state is 0; Fluorine is always $-1$; Oxygen is $-2$ (except $-1$ in peroxides $\\text{H}_2\\text{O}_2$, $-0.5$ in superoxides $\\text{KO}_2$, $+2$ in $\\text{OF}_2$); Hydrogen is $+1$ (except $-1$ in ionic hydrides $\\text{NaH}$); Alkali metals $+1$, Alkaline earth metals $+2$.",
          "Fractional Oxidation States: Arise from average calculation across different structural atoms (e.g., $\\text{C}_3\\text{O}_2$: $\\text{O}=\\text{C}^{+2}=\\text{C}^0=\\text{C}^{+2}=\\text{O} \\implies \\text{avg } +4/3$; $\\text{Br}_3\\text{O}_8$, $\\text{S}_4\\text{O}_6^{2-}$)."
        ]
      },
      {
        "heading": "Balancing Redox Reactions: Ion-Electron & Oxidation Number Methods",
        "bullets": [
          "Types of Redox Reactions: Combination, Decomposition, Displacement (Metal and Non-metal displacement), Disproportionation (same element oxidized and reduced simultaneously, e.g., $2\\text{H}_2\\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{O}_2$, $\\text{P}_4 + 3\\text{OH}^- + 3\\text{H}_2\\text{O} \\to \\text{PH}_3 + 3\\text{H}_2\\text{PO}_2^-$).",
          "Ion-Electron Half-Reaction Method in Acidic Medium: 1. Split into oxidation and reduction halves; 2. Balance all atoms except H and O; 3. Balance O by adding $\\text{H}_2\\text{O}$; 4. Balance H by adding $\\text{H}^+$; 5. Balance charge with electrons ($e^-$); 6. Equalize electrons and add halves.",
          "Basic Medium: Balance as in acid, then add equal number of $\\text{OH}^-$ ions to both sides to neutralize $\\text{H}^+$ into $\\text{H}_2\\text{O}$."
        ]
      }
    ],
    "examTraps": [
      "Assigning standard oxidation states without checking peroxyl peroxy linkages (e.g., Caro acid $\\text{H}_2\\text{SO}_5$ has S in $+6$, NOT $+8$; Marshall acid $\\text{H}_2\\text{S}_2\\text{O}_8$ has S in $+6$, NOT $+7$; $\\text{CrO}_5$ butterfly structure has Cr in $+6$, NOT $+10$).",
      "Forgetting to balance charge using electrons during half-reaction steps."
    ],
    "quickMentalCheck": "What is the oxidation state of Chromium in $\\text{Cr}_2\\text{O}_7^{2-}$ and $\\text{CrO}_5$? In $\\text{Cr}_2\\text{O}_7^{2-}$, $2x - 14 = -2 \\implies x = +6$; In $\\text{CrO}_5$ (butterfly peroxy structure), $x + 1(-2) + 4(-1) = 0 \\implies x = +6$.",
    "cueQuestions": [
      "Why is nitric acid ($\text{HNO}_3$) always an oxidizing agent, while nitrous acid ($\text{HNO}_2$) can act as both oxidizing and reducing agent?",
      "How does the structural bonding in Caro’s acid ($\text{H}_2\text{SO}_5$) and Marshall’s acid ($\text{H}_2\text{S}_2\text{O}_8$) preserve the maximum $+6$ oxidation state of Sulfur?",
      "What are the steps to balance redox reactions in basic aqueous media using the ion-electron method?"
    ],
    "workedExample": {
      "problem": "Balance the following redox reaction in acidic medium using the ion-electron half-reaction method: $\\text{Cr}_2\\text{O}_7^{2-}(aq) + \\text{Fe}^{2+}(aq) \\to \\text{Cr}^{3+}(aq) + \\text{Fe}^{3+}(aq)$.",
      "steps": [
        "Step 1: Write skeleton half-reactions: Oxidation: $\\text{Fe}^{2+} \\to \\text{Fe}^{3+}$; Reduction: $\\text{Cr}_2\\text{O}_7^{2-} \\to \\text{Cr}^{3+}$.",
        "Step 2: Balance Cr atoms: $\\text{Cr}_2\\text{O}_7^{2-} \\to 2\\text{Cr}^{3+}$.",
        "Step 3: Balance O atoms with $\\text{H}_2\\text{O}$: $\\text{Cr}_2\\text{O}_7^{2-} \\to 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}$.",
        "Step 4: Balance H atoms with $\\text{H}^+$: $\\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+ \\to 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}$.",
        "Step 5: Balance charge with electrons: Reduction: $\\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+ + 6e^- \\to 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}$; Oxidation: $\\text{Fe}^{2+} \\to \\text{Fe}^{3+} + e^-$.",
        "Step 6: Multiply oxidation half by 6 and add: $\\text{Cr}_2\\text{O}_7^{2-} + 6\\text{Fe}^{2+} + 14\\text{H}^+ \\to 2\\text{Cr}^{3+} + 6\\text{Fe}^{3+} + 7\\text{H}_2\\text{O}$."
      ],
      "result": "\\text{Cr}_2\\text{O}_7^{2-} + 6\\text{Fe}^{2+} + 14\\text{H}^+ \\to 2\\text{Cr}^{3+} + 6\\text{Fe}^{3+} + 7\\text{H}_2\\text{O}"
    },
    "verificationProblem": "Check charge balance: LHS $= (-2) + 6(+2) + 14(+1) = +24$. RHS $= 2(+3) + 6(+3) = +24$. Atom count: 2 Cr, 7 O, 6 Fe, 14 H on both sides. Verified.",
    "realWorldUse": "Quantitative redox titrations (Permanganometry and Dichromatometry), breathalyzer alcohol testing ($\text{Cr}_2\text{O}_7^{2-} \\to \\text{Cr}^{3+}$ color shift), battery cell redox couples.",
    "diagramType": "redox-half-reaction-electron-flow"
  },
  "CBSE-CH-G11-CHEM-CH08": {
    "chapterTitle": "Organic Chemistry: Some Basic Principles and Techniques",
    "subject": "Chemistry",
    "grade": 11,
    "chapterNum": 8,
    "essentialLaw": "\\text{Carbocation Stability: } 3^\\circ > 2^\\circ > 1^\\circ > \\text{CH}_3^+ \\; (\\text{Hyperconjugation } + \\text{ Inductive } +I) \\quad | \\quad \\%C = \\frac{12}{44}\\frac{m_{\\text{CO}_2}}{m}\\times 100 \\quad | \\quad \\%N = \\frac{1.4 \\times N \\times V}{m}",
    "coreConcepts": [
      {
        "heading": "IUPAC Nomenclature, Electronic Effects & Reactive Intermediates",
        "bullets": [
          "IUPAC Rules: Longest continuous carbon chain containing principal functional group; Lowest locant rule for substituents; Functional group priority: $-\\text{COOH} > -\\text{SO}_3\\text{H} > -\\text{COOR} > -\\text{COCl} > -\\text{CONH}_2 > -\\text{CN} > -\\text{CHO} > >C=O > -\\text{OH} > -\\text{NH}_2 > >C=C< > -C\\equiv C-$.",
          "Inductive Effect ($\\pm I$): Permanent polarization through $\\sigma$-bonds ($-I$: $-\\text{NO}_2 > -\\text{CN} > -\\text{COOH} > -\\text{F} > -\\text{Cl}$; $+I$: $-(\\text{CH}_3)_3\\text{C} > -\\text{CH}(\\text{CH}_3)_2 > -\\text{CH}_2\\text{CH}_3 > -\\text{CH}_3$).",
          "Electromeric Effect ($\\pm E$): Temporary transfer of $\\pi$-electron pair to one bonded atom in the presence of an attacking reagent.",
          "Resonance ($+R/-R$) & Hyperconjugation (No-Bond Resonance): Delocalization of $\\sigma$-electrons of $C-H$ bond of an alkyl group into adjacent empty $p$-orbital or $\\pi$-system; Explains stability of alkenes and carbocations ($3^\\circ > 2^\\circ > 1^\\circ$).",
          "Reactive Intermediates: Carbocations ($sp^2$, planar, $6e^-$), Free Radicals ($sp^2$, $7e^-$), Carbanions ($sp^3$, pyramidal, $8e^-$: stability order $1^\\circ > 2^\\circ > 3^\\circ$)."
        ]
      },
      {
        "heading": "Purification & Quantitative Elemental Analysis",
        "bullets": [
          "Purification Methods: Simple distillation (large boiling point difference $> 25\\text{ K}$), Fractional distillation (close boiling points), Steam distillation (immiscible with water, steam-volatile, e.g., aniline), Differential extraction, Chromatography (Adsorption: Column/TLC with $R_f = \\frac{\\text{distance by solute}}{\\text{distance by solvent}}$; Partition: Paper).",
          "Qualitative Analysis (Lassaigne Test): Sodium fusion extract converts covalent N, S, Halogens into ionic $\\text{NaCN}, \\text{Na}_2\\text{S}, \\text{NaX}$; Prussian blue test for Nitrogen: $\\text{Fe}_4[\\text{Fe}(\\text{CN})_6]_3$; Violet color for Sulfur with sodium nitroprusside.",
          "Quantitative Analysis: Liebig method for C and H ($\\text{CO}_2$ absorbed in $\\text{KOH}$, $\\text{H}_2\\text{O}$ in $\\text{CaCl}_2$); Dumas method ($\\text{N}_2$ gas volume at STP); Kjeldahl method ($\\text{NH}_3$ absorbed in standard acid, not applicable to nitro, azo, or pyridine compounds); Carius method for Halogens ($\text{AgX}$) and Sulfur ($\text{BaSO}_4$)."
        ]
      }
    ],
    "examTraps": [
      "Applying Kjeldahl nitrogen estimation method to nitro compounds, azo dyes, or pyridine (nitrogen in ring or oxidized state is not quantitatively converted to ammonium sulfate).",
      "Confusing the stability order of carbocations ($3^circ > 2^circ > 1^circ$) with carbanions ($1^circ > 2^circ > 3^circ$)."
    ],
    "quickMentalCheck": "How many hyperconjugative canonical structures does the tert-butyl carbocation $((\\text{CH}_3)_3\\text{C}^+)$ have? 9 $\\alpha$-hydrogens $\\implies$ 9 hyperconjugative structures, making it exceptionally stable.",
    "cueQuestions": [
      "How does hyperconjugation (no-bond resonance) explain the relative stability of tertiary vs secondary carbocations?",
      "Why is Lassaigne sodium fusion extract acidified with dilute nitric acid before adding silver nitrate during halogen testing?",
      "Why cannot Kjeldahl method be used to estimate nitrogen in nitrobenzene or pyridine?"
    ],
    "workedExample": {
      "problem": "In Kjeldahl’s method for estimation of nitrogen, the ammonia evolved from $0.5\\text{ g}$ of an organic compound completely neutralized $10\\text{ mL}$ of $1\\text{ M }\\text{H}_2\\text{SO}_4$. Find the percentage of nitrogen in the compound.",
      "steps": [
        "Molarity and Normality of $\\text{H}_2\\text{SO}_4$: $N = M \\times \\text{basicity} = 1\\text{ M} \\times 2 = 2\\text{ N}$.",
        "Volume of acid used: $V = 10\\text{ mL}$.",
        "Kjeldahl formula for percentage of nitrogen: $\\%\\text{N} = \\frac{1.4 \\times N \\times V}{m}$.",
        "Substitute values: $\\%\\text{N} = \\frac{1.4 \\times 2\\text{ N} \\times 10\\text{ mL}}{0.5\\text{ g}} = \\frac{28}{0.5} = 56.0\\%$."
      ],
      "result": "\\%\\text{N} = 56.0\\%"
    },
    "verificationProblem": "Check via equivalents: Milli-equivalents of acid $= N \\times V = 2 \\times 10 = 20\\text{ meq}$. Moles of $\\text{NH}_3 = 20 \\times 10^{-3}\\text{ mol} \\implies \\text{Mass of N} = 0.02 \\times 14 = 0.28\\text{ g}$. $\\%\\text{N} = \\frac{0.28}{0.5} \\times 100 = 56\\%$. Exact match.",
    "realWorldUse": "Protein content estimation in agricultural food grains (Kjeldahl assay), thin-layer chromatography (TLC) purity screening in active pharmaceutical ingredients.",
    "diagramType": "hyperconjugation-carbocation-overlap"
  },
  "CBSE-CH-G11-CHEM-CH09": {
    "chapterTitle": "Hydrocarbons",
    "subject": "Chemistry",
    "grade": 11,
    "chapterNum": 9,
    "essentialLaw": "\\text{Markovnikov: } R-\\text{CH}=\\text{CH}_2 + \\text{HBr} \\to R-\\text{CH(Br)}-\\text{CH}_3 \\quad | \\quad \\text{Peroxide Effect (Kharasch): } R-\\text{CH}=\\text{CH}_2 + \\text{HBr} \\xrightarrow{\\text{Peroxide}} R-\\text{CH}_2\\text{CH}_2\\text{Br}",
    "coreConcepts": [
      {
        "heading": "Alkanes, Conformations & Alkene Addition Mechanisms",
        "bullets": [
          "Alkanes: Wurtz reaction ($2R-\\text{X} + 2\\text{Na} \\xrightarrow{\\text{dry ether}} R-R + 2\\text{NaX}$, best for symmetrical even-carbon alkanes); Kolbe electrolytic decarboxylation ($2R-\\text{COONa} \\xrightarrow{\\text{electrolysis}} R-R + 2\\text{CO}_2 + \\text{H}_2 + 2\\text{NaOH}$).",
          "Conformations of Ethane: Sawhorse and Newman projections; Staggered conformation is most stable due to minimum torsional strain; Eclipsed is least stable ($12.5\\text{ kJ/mol}$ higher energy barrier).",
          "Markovnikov's Rule: Electrophilic addition of unsymmetrical HX to unsymmetrical alkene: Hydrogen adds to carbon with more hydrogens, halide to more substituted carbon via more stable carbocation intermediate.",
          "Anti-Markovnikov (Peroxide/Kharasch Effect): In the presence of organic peroxides, HBr (ONLY HBr, not HCl or HI) adds via a free radical mechanism to give the primary alkyl bromide."
        ]
      },
      {
        "heading": "Alkynes & Aromatic Hydrocarbons (Benzene): Huckel Rule",
        "bullets": [
          "Alkynes: Acidity of terminal alkynes ($H-C\\equiv C-H$) due to high $s$-character ($50\\%$) of $sp$-hybridized carbon; Reacts with $\\text{NaNH}_2$ and ammoniacal $\\text{AgNO}_3$ (Tollens white ppt of silver acetylide).",
          "Ozonolysis of Alkenes: Cleavage of $>C=C<$ by $\\text{O}_3$ followed by $\\text{Zn}/\\text{H}_2\\text{O}$ to yield aldehydes and ketones (locates double bond position).",
          "Aromaticity & Hückel's Rule: Cyclic, planar, completely conjugated system with $(4n + 2)\\pi$ delocalized electrons ($n = 0, 1, 2, \\dots$, e.g., Benzene $6\\pi$, Cyclopentadienyl anion $6\\pi$, Tropylium cation $6\\pi$).",
          "Electrophilic Aromatic Substitution: Mechanism involves electrophile generation, arenium ion (sigma complex) resonance hybrid formation, and proton loss; Nitration ($\\text{HNO}_3/\\text{H}_2\\text{SO}_4$, electrophile $\\text{NO}_2^+$), Halogenation ($\\text{Cl}_2/\\text{FeCl}_3$, $\\text{Cl}^+$), Friedel-Crafts Alkylation ($R-\\text{Cl}/\\text{AlCl}_3$) and Acylation ($R\\text{COCl}/\\text{AlCl}_3$)."
        ]
      }
    ],
    "examTraps": [
      "Applying the Anti-Markovnikov peroxide effect to $\\text{HCl}$ or $\\text{HI}$ (the peroxide effect occurs EXCLUSIVELY with $\\text{HBr}$ because only for $\\text{HBr}$ are both radical propagation steps exothermic).",
      "Using the Wurtz reaction to prepare unsymmetrical odd-carbon alkanes (gives an inseparable mixture of three different alkanes)."
    ],
    "quickMentalCheck": "Is Cyclooctatetraene ($8\\pi$ electrons) aromatic? No, $8\\pi$ fits $4n$ ($n=2$), and it adopts a non-planar tub conformation to avoid antiaromaticity $\\implies$ Non-aromatic.",
    "cueQuestions": [
      "Why does the Anti-Markovnikov peroxide effect operate only with $\\text{HBr}$ and not with $\\text{HCl}$ or $\\text{HI}$?",
      "How does ozonolysis uniquely determine the exact position of carbon-carbon double bonds in unknown branched alkenes?",
      "Why is terminal ethyne acidic enough to react with sodium amide ($\text{NaNH}_2$) while ethene and ethane are completely neutral?"
    ],
    "workedExample": {
      "problem": "An alkene [A] on ozonolysis gives a mixture of Acetone and Ethanal in equimolar amounts. Identify the structure and IUPAC name of alkene [A] and write the reaction.",
      "steps": [
        "Ozonolysis products: Acetone ($(\\text{CH}_3)_2\\text{C}=\\text{O}$) and Ethanal ($\\text{O}=\\text{CH}-\\text{CH}_3$).",
        "To find the parent alkene, remove the carbonyl oxygen atoms and join the two carbon fragments with a double bond.",
        "Join $(\\text{CH}_3)_2\\text{C}=$ and $=\\text{CH}-\\text{CH}_3$: $(\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_3$.",
        "Structure: 2-Methylbut-2-ene ($\\text{CH}_3-\\text{C}(\\text{CH}_3)=\\text{CH}-\\text{CH}_3$).",
        "Reaction: $\\text{CH}_3-\\text{C}(\\text{CH}_3)=\\text{CH}-\\text{CH}_3 + \\text{O}_3 \\xrightarrow{\\text{Zn}/\\text{H}_2\\text{O}} (\\text{CH}_3)_2\\text{C}=\\text{O} + \\text{CH}_3\\text{CHO} + \\text{ZnO}$."
      ],
      "result": "\\text{Alkene [A]: 2-Methylbut-2-ene}, \\quad (\\text{CH}_3)_2\\text{C}=\\text{CH}-\\text{CH}_3"
    },
    "verificationProblem": "Check ozonolysis cleavage: Cleaving 2-methylbut-2-ene double bond gives a 3-carbon ketone (acetone) and a 2-carbon aldehyde (ethanal). Total carbons $= 3 + 2 = 5 = \\text{C}_5\\text{H}_{10}$. Verified.",
    "realWorldUse": "Steam cracking of petroleum naphtha for polymer monomer production (polyethylene, polypropylene), synthetic benzene manufacturing for styrenics.",
    "diagramType": "newman-projections-ethane-conformations"
  },
  "CBSE-CH-G11-MATH-CH01": {
    "chapterTitle": "Sets",
    "subject": "MATHEMATICS",
    "grade": 11,
    "chapterNum": 1,
    "essentialLaw": "$n(A \\cup B) = n(A) + n(B) - n(A \\cap B) \\quad | \\quad (A \\cup B)' = A' \\cap B' \\quad | \\quad (A \\cap B)' = A' \\cup B'$",
    "coreConcepts": [
      {
        "heading": "Set Representations and Cardinality",
        "bullets": [
          "Roster / Tabular form vs Set-Builder form; Empty / Null set $\\phi = \\{\\}$; Finite vs Infinite sets.",
          "Cardinality of finite sets $n(A)$; Power set $P(A)$ is the set of all subsets of $A$, containing exactly $2^{n(A)}$ elements."
        ]
      },
      {
        "heading": "Subsets, Proper Subsets and Real Intervals",
        "bullets": [
          "Subset criteria: $A \\subseteq B \\iff \\forall x \\in A, x \\in B$; Number of subsets $= 2^n$; Number of proper subsets $= 2^n - 1$.",
          "Intervals of $\\mathbb{R}$: Open interval $(a, b) = \\{x : a < x < b\\}$, Closed interval $[a, b] = \\{x : a \\le x \\le b\\}$, Semi-open intervals."
        ]
      },
      {
        "heading": "Set Operations and De Morgan's Laws",
        "bullets": [
          "Union $A \\cup B$, Intersection $A \\cap B$, Difference $A - B = \\{x : x \\in A \\wedge x \\notin B\\}$, Complement $A' = U - A$.",
          "Disjoint sets ($A \\cap B = \\phi$); De Morgan's Laws: $(A \\cup B)' = A' \\cap B'$ and $(A \\cap B)' = A' \\cup B'$."
        ]
      }
    ],
    "examTraps": [
      "Element vs Subset Notation Confusion: Confusing element membership (\\in) with set inclusion (\\subseteq), e.g. {a} \\in {a, b} is false while {a} \\subseteq {a, b} is true.",
      "Null Set Representation Error: Writing {\\phi} to denote an empty set (which represents a singleton set containing \\phi); empty set is strictly \\phi or {}.",
      "De Morgan Operator Inversion: Forgetting to flip the union to intersection or intersection to union when distributing complement: (A \\cup B)' = A' \\cap B'."
    ],
    "quickMentalCheck": "State whether the empty set has proper subsets and calculate the number of non-empty proper subsets of a set with 4 elements (2^4 - 2 = 14).",
    "cueQuestions": [
      "State and prove De Morgan's Laws for two sets A and B.",
      "How do we find the power set and number of proper subsets of a finite set?",
      "Distinguish between an element belonging to a set (\\in) and a subset included in a set (\\subseteq)."
    ],
    "workedExample": {
      "problem": "If X and Y are two sets such that X \\cup Y has 50 elements, X has 28 elements and Y has 32 elements, find n(X \\cap Y).",
      "steps": [
        "Step 1: State the cardinal formula: n(X \\cup Y) = n(X) + n(Y) - n(X \\cap Y).",
        "Step 2: Substitute given values: 50 = 28 + 32 - n(X \\cap Y).",
        "Step 3: Simplify: 50 = 60 - n(X \\cap Y) => n(X \\cap Y) = 60 - 50 = 10."
      ],
      "result": "The number of elements in X \\cap Y is 10."
    },
    "verificationProblem": "Verify De Morgan's Law (A \\cup B)' = A' \\cap B' for U = {1,2,3,4,5,6}, A = {2,3}, B = {3,4,5}.",
    "realWorldUse": "Applied in relational database queries (SQL UNION, INTERSECT), digital logic gate optimization, probability sample spaces, and search engines.",
    "diagramType": "visual_model_pending"
  },
  "CBSE-CH-G11-MATH-CH02": {
    "chapterTitle": "Relations and Functions",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 2,
    "essentialLaw": "\\text{Cartesian Product: } A \\times B = \\{(a, b) : a \\in A, \\; b \\in B\\} \\implies |A \\times B| = |A| \\cdot |B| \\quad | \\quad \\text{Function Definition: } \\forall x \\in X, \\; \\exists! \\, y \\in Y \\text{ where } (x, y) \\in f",
    "coreConcepts": [
      {
        "heading": "Cartesian Product & Relations",
        "bullets": [
          "Cartesian product $A \\times B$ has $|A| \\times |B|$ elements; if $|A| = m, |B| = n$, the total number of possible relations from $A$ to $B$ is $2^{mn}$.",
          "A relation $R$ from $A$ to $B$ is a subset of $A \\times B$, i.e., $R \\subseteq A \\times B$.",
          "Domain of $R$ is the set of all first elements in the ordered pairs; Range is the set of all second elements; Codomain is the entire set $B$ (Range $\\subseteq$ Codomain)."
        ]
      },
      {
        "heading": "Functions and Standard Real Functions",
        "bullets": [
          "A relation $f$ from $X$ to $Y$ is a function if every element of $X$ has one and only one image in $Y$.",
          "Identity function $f(x) = x$, Constant function $f(x) = c$, Polynomial functions, Rational functions $f(x) = \\frac{P(x)}{Q(x)}, Q(x) \\neq 0$.",
          "Special piecewise functions: Modulus $|x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}$, Signum $\\text{sgn}(x) = \\begin{cases} 1 & x > 0 \\\\ 0 & x = 0 \\\\ -1 & x < 0 \\end{cases}$, Greatest Integer $[x] = \\max\\{n \\in \\mathbb{Z} : n \\le x\\}$."
        ]
      }
    ],
    "examTraps": [
      "Assuming Range and Codomain are identical; Range is the actual set of outputs $\\{f(x) : x \\in X\\}$, which is a subset of Codomain $Y$.",
      "Forgetting that Greatest Integer Function $[x]$ evaluates to $-3$ for $x = -2.3$, not $-2$ (since $-3 \\le -2.3$)."
    ],
    "quickMentalCheck": "If set $A$ has 3 elements and set $B$ has 2 elements, how many total relations can be defined from $A$ to $B$? (Answer: $2^{3 \\times 2} = 2^6 = 64$).",
    "cueQuestions": [
      "What exact formal condition elevates a general relation $R \\subseteq A \\times B$ into a well-defined function $f: A \\to B$?",
      "What are the domain and range of the real-valued function $f(x) = \\sqrt{9 - x^2}$?",
      "How does the graph and step-discontinuity behavior of the Greatest Integer Function $[x]$ behave at integer points?"
    ],
    "workedExample": {
      "problem": "Find the domain and range of the real-valued function $f(x) = \\sqrt{16 - x^2}$.",
      "steps": [
        "Domain condition: The expression under the square root must be non-negative: $16 - x^2 \\ge 0$.",
        "Solve inequality: $x^2 \\le 16 \\iff -4 \\le x \\le 4$. Thus, $\\text{Domain}(f) = [-4, 4]$.",
        "Find Range: Let $y = \\sqrt{16 - x^2}$. Since $0 \\le x^2 \\le 16$, the expression $16 - x^2$ ranges from $0$ (when $x = \\pm 4$) to $16$ (when $x = 0$).",
        "Square root values: $y \\in [\\sqrt{0}, \\sqrt{16}] = [0, 4]$. Thus, $\\text{Range}(f) = [0, 4]$."
      ],
      "result": "\\text{Domain} = [-4, 4], \\quad \\text{Range} = [0, 4]"
    },
    "verificationProblem": "Verify that for $x = 5$, $16 - 5^2 = -9 < 0$, which is undefined in $\\mathbb{R}$, confirming domain boundary $[-4, 4]$.",
    "realWorldUse": "Forms the universal language of calculus, computer algorithm state mapping, signal processing filters, and mathematical modeling.",
    "diagramType": "cartesian-product-function-mappings"
  },
  "CBSE-CH-G11-MATH-CH03": {
    "chapterTitle": "Trigonometric Functions",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 3,
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
  "CBSE-CH-G11-MATH-CH04": {
    "chapterTitle": "Complex Numbers and Quadratic Equations",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 4,
    "essentialLaw": "z = a + ib, \\; i = \\sqrt{-1}, \\; i^2 = -1 \\quad | \\quad |z| = \\sqrt{a^2+b^2}, \\; z^{-1} = \\frac{\\bar{z}}{|z|^2} \\quad | \\quad x = \\frac{-b \\pm i\\sqrt{4ac-b^2}}{2a} \\; (D < 0)",
    "coreConcepts": [
      {
        "heading": "Algebra of Complex Numbers & Modulus/Conjugate",
        "bullets": [
          "Imaginary unit $i = \\sqrt{-1}$ with cyclic powers: $i^{4k} = 1, i^{4k+1} = i, i^{4k+2} = -1, i^{4k+3} = -i$.",
          "Modulus $|z| = \\sqrt{a^2+b^2}$ (distance from origin in Argand plane); Conjugate $\\bar{z} = a - ib$.",
          "Multiplicative inverse: $z^{-1} = \\frac{\\bar{z}}{|z|^2}$ satisfying $z \\cdot z^{-1} = 1$."
        ]
      },
      {
        "heading": "Argand Plane & Quadratic Equations with $D < 0$",
        "bullets": [
          "Argand plane represents real part on horizontal axis and imaginary part on vertical axis; polar form $z = r(\\cos \\theta + i\\sin \\theta)$ where $r = |z|$ and $\\theta = \\arg(z) \\in (-\\pi, \\pi]$.",
          "Fundamental Theorem of Algebra: A polynomial equation of degree $n$ has exactly $n$ roots in the complex number system $\\mathbb{C}$.",
          "Quadratic equations $ax^2+bx+c=0$ with discriminant $D = b^2 - 4ac < 0$ yield purely complex conjugate roots $x = \\frac{-b \\pm i\\sqrt{4ac-b^2}}{2a}$."
        ]
      }
    ],
    "examTraps": [
      "Assuming $\\sqrt{a}\\sqrt{b} = \\sqrt{ab}$ holds for all numbers; it is mathematically invalid when BOTH $a$ and $b$ are negative (e.g., $\\sqrt{-1}\\sqrt{-1} = i \\cdot i = -1 \\neq \\sqrt{(-1)(-1)} = \\sqrt{1} = 1$).",
      "Forgetting the principal argument constraint $\\theta \\in (-\\pi, \\pi]$ when converting coordinates in third quadrant."
    ],
    "quickMentalCheck": "Evaluate $i^{2026}$. (Answer: $2026 = 4 \\times 506 + 2 \\implies i^2 = -1$).",
    "cueQuestions": [
      "Why is the equality $\\sqrt{a}\\sqrt{b} = \\sqrt{ab}$ invalid when both $a$ and $b$ are negative real numbers?",
      "How does the Argand plane geometrically represent the addition and conjugate of complex numbers?",
      "What are the polar coordinates and principal argument of $z = -1 - i\\sqrt{3}$?"
    ],
    "workedExample": {
      "problem": "Find the multiplicative inverse of the complex number $z = 4 - 3i$ and express in standard $a + ib$ form.",
      "steps": [
        "Find conjugate: $\\bar{z} = 4 + 3i$.",
        "Calculate modulus squared: $|z|^2 = 4^2 + (-3)^2 = 16 + 9 = 25$.",
        "Apply formula $z^{-1} = \\frac{\\bar{z}}{|z|^2} = \\frac{4 + 3i}{25} = \\frac{4}{25} + \\frac{3}{25}i$."
      ],
      "result": "z^{-1} = \\frac{4}{25} + \\frac{3}{25}i"
    },
    "verificationProblem": "Check: $(4 - 3i)\\left(\\frac{4}{25} + \\frac{3}{25}i\\right) = \\frac{16 + 12i - 12i - 9i^2}{25} = \\frac{16 + 9}{25} = 1$. Matches.",
    "realWorldUse": "Essential in electrical AC circuit impedance analysis ($Z = R + jX$), quantum mechanics wavefunctions, and fractal generation.",
    "diagramType": "argand-plane-polar-form"
  },
  "CBSE-CH-G11-MATH-CH05": {
    "chapterTitle": "Linear Inequalities",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 5,
    "essentialLaw": "ax + b < c \\iff ax < c - b \\quad | \\quad k < 0 \\implies (a < b \\iff ka > kb) \\quad | \\quad |x| \\le a \\iff -a \\le x \\le a",
    "coreConcepts": [
      {
        "heading": "Algebraic Principles of Linear Inequalities",
        "bullets": [
          "Equal numbers may be added to (or subtracted from) both sides of an inequality without affecting the sign of inequality.",
          "Multiplying or dividing both sides by a POSITIVE number preserves inequality sign; multiplying or dividing by a NEGATIVE number REVERSES the inequality sign ($a < b \\implies -a > -b$).",
          "Absolute value inequality: $|x| \\le a \\iff -a \\le x \\le a$ (closed interval); $|x| \\ge a \\iff x \\le -a \\lor x \\ge a$."
        ]
      },
      {
        "heading": "Graphical Solution in Two Dimensions",
        "bullets": [
          "A line $ax + by = c$ divides Cartesian plane into two half-planes (closed if $\\le, \\ge$; open if $<, >$).",
          "Testing origin $(0,0)$ determines which half-plane represents the valid solution set of the linear inequality.",
          "Solution of a system of simultaneous linear inequalities is the common overlapping feasible intersection region."
        ]
      }
    ],
    "examTraps": [
      "Forgetting to reverse the inequality sign when dividing or multiplying by a negative number.",
      "Drawing a solid boundary line for strict inequalities ($<, >$) instead of a dashed/dotted line."
    ],
    "quickMentalCheck": "Solve $-3x + 9 \\le 0$ for real $x$. (Answer: $-3x \\le -9 \\implies x \\ge 3$, reversing inequality sign).",
    "cueQuestions": [
      "Why does multiplying both sides of an inequality by a negative number reverse the direction of the inequality sign?",
      "How do you determine whether the boundary line is included or excluded in a graphical inequality solution?",
      "What is the algebraic solution set of $|2x - 3| < 5$ expressed in interval notation?"
    ],
    "workedExample": {
      "problem": "Solve the inequality $\\frac{2x - 1}{3} \\ge \\frac{3x - 2}{4} - \\frac{2 - x}{5}$ for $x \\in \\mathbb{R}$.",
      "steps": [
        "Find LCM of denominators (3, 4, 5): $\\text{LCM} = 60$. Multiply entire inequality by $60$ (positive number, sign unchanged).",
        "Expand terms: $20(2x - 1) \\ge 15(3x - 2) - 12(2 - x)$.",
        "Simplify: $40x - 20 \\ge 45x - 30 - 24 + 12x \\implies 40x - 20 \\ge 57x - 54$.",
        "Transpose variables: $40x - 57x \\ge -54 + 20 \\implies -17x \\ge -34$.",
        "Divide by $-17$ (negative, REVERSES sign): $x \\le \\frac{-34}{-17} \\implies x \\le 2$."
      ],
      "result": "x \\in (-\\infty, 2]"
    },
    "verificationProblem": "Test $x = 0$: LHS $= -1/3 \\approx -0.33$; RHS $= -2/4 - 2/5 = -0.5 - 0.4 = -0.9$. Since $-0.33 \\ge -0.9$, holds true.",
    "realWorldUse": "Used in financial budgeting constraints, manufacturing production feasibility bounds, and linear programming optimization.",
    "diagramType": "half-plane-inequality-graph"
  },
  "CBSE-CH-G11-MATH-CH06": {
    "chapterTitle": "Permutations and Combinations",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 6,
    "essentialLaw": "^n P_r = \\frac{n!}{(n-r)!} \\quad | \\quad ^n C_r = \\frac{n!}{r!(n-r)!} \\quad | \\quad ^n C_r + {^n C_{r-1}} = {^{n+1} C_r} \\quad | \\quad ^n P_r = r! \\cdot {^n C_r}",
    "coreConcepts": [
      {
        "heading": "Fundamental Principles of Counting & Permutations",
        "bullets": [
          "Fundamental Principle of Multiplication: If an event can occur in $m$ different ways, followed by a second in $n$ ways, total successive ways is $m \\times n$.",
          "Permutations: Order matters. Number of arrangements of $n$ distinct objects taken $r$ at a time is $^n P_r = \\frac{n!}{(n-r)!}$.",
          "Permutations with identical items: $\\frac{n!}{p_1! p_2! \\dots p_k!}$; Circular permutations of $n$ distinct objects $= (n-1)!$."
        ]
      },
      {
        "heading": "Combinations and Pascal's Identity",
        "bullets": [
          "Combinations: Order does NOT matter (selection only). Number of ways to choose $r$ objects from $n$ distinct items is $^n C_r = \\frac{n!}{r!(n-r)!}$.",
          "Symmetry and properties: $^n C_r = {^n C_{n-r}}$, and $^n C_a = {^n C_b} \\implies a = b \\lor a + b = n$.",
          "Pascal's Addition Formula: $^n C_r + {^n C_{r-1}} = {^{n+1} C_r}$."
        ]
      }
    ],
    "examTraps": [
      "Confusing permutations (forming words/seating arrangements where order matters) with combinations (forming committees/selecting teams).",
      "Forgetting to account for repetitions when forming numbers with repeating digits allowed vs disallowed."
    ],
    "quickMentalCheck": "If $^n C_9 = {^n C_8}$, what is the value of $n$? (Answer: $a + b = n \\implies 9 + 8 = 17$).",
    "cueQuestions": [
      "How does the Fundamental Principle of Counting distinguish between independent multi-stage choices and mutually exclusive alternatives?",
      "Why does circular seating arrangement divide linear permutations by $n$, resulting in $(n-1)!$?",
      "How do you prove Pascal's identity $^n C_r + {^n C_{r-1}} = {^{n+1} C_r}$ algebraically using factorials?"
    ],
    "workedExample": {
      "problem": "How many 4-letter words (with or without meaning) can be formed using letters of the word \"EQUATION\" if each letter is used at most once, and words must begin with a vowel?",
      "steps": [
        "Count vowels in \"EQUATION\": E, U, A, I, O (5 vowels out of 8 total distinct letters).",
        "First letter choice: Must be a vowel $\\implies 5$ possible choices.",
        "Remaining 3 positions: Must choose and arrange from remaining 7 letters $\\implies {^7 P_3} = 7 \\times 6 \\times 5 = 210$ ways.",
        "Total words formed: By Multiplication Principle, $5 \\times 210 = 1,050$ words."
      ],
      "result": "1,050 \\text{ words}"
    },
    "verificationProblem": "Check total possible 4-letter words without constraint: $^8 P_4 = 8 \\times 7 \\times 6 \\times 5 = 1,680$. Since vowel fraction is $5/8$, $1680 \\times (5/8) = 1,050$. Matches.",
    "realWorldUse": "Essential in cryptography key generation, bioinformatics genomic sequencing combinations, and network routing path calculations.",
    "diagramType": "combinatorics-tree-diagram"
  },
  "CBSE-CH-G11-MATH-CH07": {
    "chapterTitle": "Binomial Theorem",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 7,
    "essentialLaw": "(a + b)^n = \\sum_{r=0}^n {^n C_r} a^{n-r} b^r \\quad | \\quad T_{r+1} = {^n C_r} a^{n-r} b^r \\quad | \\quad \\sum_{r=0}^n {^n C_r} = 2^n",
    "coreConcepts": [
      {
        "heading": "Binomial Expansion & General Term",
        "bullets": [
          "Binomial Theorem states $(a+b)^n = {^n C_0}a^n + {^n C_1}a^{n-1}b + \\dots + {^n C_n}b^n$, containing exactly $(n+1)$ terms.",
          "General term is $T_{r+1} = {^n C_r} a^{n-r} b^r$, where index $r$ is one less than term number.",
          "Sum of binomial coefficients: Put $a=1, b=1 \\implies \\sum_{r=0}^n {^n C_r} = 2^n$; Alternating sum: $\\sum_{r=0}^n (-1)^r {^n C_r} = 0$."
        ]
      },
      {
        "heading": "Middle Terms & Independent Term",
        "bullets": [
          "If $n$ is even, there is ONE middle term: $T_{\\frac{n}{2}+1}$.",
          "If $n$ is odd, there are TWO middle terms: $T_{\\frac{n+1}{2}}$ and $T_{\\frac{n+3}{2}}$.",
          "Term independent of $x$: Find general term $T_{r+1}$, combine exponents of $x$, and set the power of $x$ equal to zero to solve for $r$."
        ]
      }
    ],
    "examTraps": [
      "Off-by-one trap: Seeking the 5th term ($T_5$) requires substituting $r = 4$, not $r = 5$.",
      "Negative sign errors when expanding $(a - b)^n = \\sum {^n C_r} a^{n-r} (-b)^r$."
    ],
    "quickMentalCheck": "What is the sum of all binomial coefficients in the expansion of $(1 + x)^{10}$? (Answer: $2^{10} = 1,024$).",
    "cueQuestions": [
      "Why does the binomial expansion of $(a + b)^n$ contain exactly $(n + 1)$ terms?",
      "How do you find the term independent of $x$ in the expansion of $\\left(x^2 - \\frac{1}{x}\\right)^9$?",
      "What are the positions of the middle terms when $n$ is an odd positive integer?"
    ],
    "workedExample": {
      "problem": "Find the coefficient of $x^6$ in the expansion of $\\left(x^2 + \\frac{1}{x}\\right)^6$.",
      "steps": [
        "Write general term: $T_{r+1} = {^6 C_r} (x^2)^{6-r} \\left(x^{-1}\\right)^r = {^6 C_r} x^{12 - 2r} x^{-r} = {^6 C_r} x^{12 - 3r}$.",
        "Equate exponent of $x$ to $6$: $12 - 3r = 6 \\implies 3r = 6 \\implies r = 2$.",
        "Calculate coefficient: ${^6 C_2} = \\frac{6 \\times 5}{2 \\times 1} = 15$."
      ],
      "result": "\\text{Coefficient of } x^6 = 15"
    },
    "verificationProblem": "Check powers: for $r=2$, term is $15(x^2)^4 (1/x)^2 = 15 x^8 x^{-2} = 15 x^6$. Verified.",
    "realWorldUse": "Used in financial compound interest binomial expansions, probability binomial distribution modeling, and computational approximation algorithms.",
    "diagramType": "pascals-triangle-binomial-tree"
  },
  "CBSE-CH-G11-MATH-CH08": {
    "chapterTitle": "Sequences and Series",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 8,
    "essentialLaw": "a_n = a r^{n-1}, \\; S_n = \\frac{a(r^n - 1)}{r - 1} \\; (r \\neq 1) \\quad | \\quad S_\\infty = \\frac{a}{1 - r} \\; (|r| < 1) \\quad | \\quad \\text{AM} = \\frac{a+b}{2} \\ge \\text{GM} = \\sqrt{ab}",
    "coreConcepts": [
      {
        "heading": "Geometric Progression (GP) & Sum Formulas",
        "bullets": [
          "GP is a sequence where each term after the first is obtained by multiplying the preceding term by a constant common ratio $r = \\frac{a_{k+1}}{a_k}$.",
          "$n$-th term: $a_n = a r^{n-1}$; Sum of first $n$ terms: $S_n = \\frac{a(1 - r^n)}{1 - r}$ for $r \\neq 1$.",
          "Sum to infinity of a decreasing GP ($|r| < 1$): $S_\\infty = \\frac{a}{1 - r}$."
        ]
      },
      {
        "heading": "Geometric Mean (GM) & AM-GM Inequality",
        "bullets": [
          "Single Geometric Mean between positive numbers $a$ and $b$ is $G = \\sqrt{ab}$.",
          "Inserting $n$ geometric means $G_1, G_2, \\dots, G_n$ between $a$ and $b$: Common ratio $r = \\left(\\frac{b}{a}\\right)^{\\frac{1}{n+1}}$.",
          "AM-GM Inequality: For any positive real numbers $a$ and $b$, $\\text{AM} \\ge \\text{GM} \\iff \\frac{a+b}{2} \\ge \\sqrt{ab}$, with equality holding if and only if $a = b$."
        ]
      }
    ],
    "examTraps": [
      "Applying the infinite sum formula $S_\\infty = \\frac{a}{1-r}$ when $|r| \\ge 1$ (the series diverges and infinite sum is undefined).",
      "Assuming arithmetic and geometric means apply to negative numbers without checking positive real constraints."
    ],
    "quickMentalCheck": "Find the sum to infinity of the GP $1, \\frac{1}{2}, \\frac{1}{4}, \\frac{1}{8}, \\dots$. (Answer: $S_\\infty = \\frac{1}{1 - 1/2} = 2$).",
    "cueQuestions": [
      "Why is the convergence condition $|r| < 1$ mandatory for evaluating the sum to infinity of a GP?",
      "How do you prove that $\\text{AM} \\ge \\text{GM}$ for any two positive real numbers $a$ and $b$?",
      "How do you insert $k$ geometric means between two positive real numbers $a$ and $b$?"
    ],
    "workedExample": {
      "problem": "If the AM and GM of two positive numbers $a$ and $b$ are 10 and 8 respectively, find the numbers.",
      "steps": [
        "Set up equations: $\\frac{a + b}{2} = 10 \\implies a + b = 20$.",
        "Set up GM equation: $\\sqrt{ab} = 8 \\implies ab = 64$.",
        "Form quadratic equation: $x^2 - (a+b)x + ab = 0 \\implies x^2 - 20x + 64 = 0$.",
        "Factorize: $(x - 16)(x - 4) = 0 \\implies x = 16 \\text{ or } x = 4$.",
        "Conclusion: The two positive numbers are $16$ and $4$."
      ],
      "result": "a = 16, \\quad b = 4 \\quad (\\text{or } a = 4, b = 16)"
    },
    "verificationProblem": "Check: $\\text{AM} = (16+4)/2 = 10$; $\\text{GM} = \\sqrt{16 \\times 4} = \\sqrt{64} = 8$. Perfectly verified.",
    "realWorldUse": "Used in financial compound interest calculations, present value annuity discounting, population growth models, and radioactive decay tracking.",
    "diagramType": "geometric-progression-convergence"
  },
  "CBSE-CH-G11-MATH-CH09": {
    "chapterTitle": "Straight Lines",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 9,
    "essentialLaw": "y - y_1 = m(x - x_1), \\; m = \\tan \\theta = \\frac{y_2 - y_1}{x_2 - x_1} \\quad | \\quad d = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2 + B^2}} \\quad | \\quad \\tan \\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|",
    "coreConcepts": [
      {
        "heading": "Slope of a Line & Standard Forms of Equations",
        "bullets": [
          "Slope $m = \\tan \\theta = \\frac{y_2 - y_1}{x_2 - x_1}$; Parallel lines: $m_1 = m_2$; Perpendicular lines: $m_1 m_2 = -1$.",
          "Point-Slope form: $y - y_1 = m(x - x_1)$; Two-point form: $y - y_1 = \\frac{y_2 - y_1}{x_2 - x_1}(x - x_1)$.",
          "Slope-Intercept form: $y = mx + c$; Intercept form: $\\frac{x}{a} + \\frac{y}{b} = 1$; Normal form: $x\\cos \\omega + y\\sin \\omega = p$."
        ]
      },
      {
        "heading": "Distance Formulas & Angle Between Lines",
        "bullets": [
          "Acute angle $\\theta$ between lines with slopes $m_1, m_2$: $\\tan \\theta = \\left|\\frac{m_2 - m_1}{1 + m_1 m_2}\\right|$.",
          "Perpendicular distance of point $(x_1, y_1)$ from line $Ax + By + C = 0$: $d = \\frac{|Ax_1 + By_1 + C|}{\\sqrt{A^2 + B^2}}$.",
          "Distance between two parallel lines $Ax + By + C_1 = 0$ and $Ax + By + C_2 = 0$: $d = \\frac{|C_1 - C_2|}{\\sqrt{A^2 + B^2}}$."
        ]
      }
    ],
    "examTraps": [
      "Applying perpendicular distance formula without ensuring equation is in standard form $Ax + By + C = 0$ with coefficients matching for parallel lines.",
      "Assuming vertical lines have slope $0$; vertical lines have undefined slope ($\\theta = 90^\\circ, \\tan 90^\\circ = \\infty$), horizontal lines have slope $0$."
    ],
    "quickMentalCheck": "What is the perpendicular distance from point $(0,0)$ to line $3x + 4y - 20 = 0$? (Answer: $d = \\frac{|-20|}{\\sqrt{3^2+4^2}} = \\frac{20}{5} = 4$).",
    "cueQuestions": [
      "Why is the product of slopes of two non-vertical mutually perpendicular lines equal to $-1$?",
      "How do you convert the general equation $Ax + By + C = 0$ into normal form $x\\cos \\omega + y\\sin \\omega = p$?",
      "What is the formula for the perpendicular distance between two parallel straight lines?"
    ],
    "workedExample": {
      "problem": "Find the equation of the line passing through $(-3, 5)$ and perpendicular to the line joining $(2, 5)$ and $(-3, 6)$.",
      "steps": [
        "Find slope of given line joining $(2,5)$ and $(-3,6)$: $m_1 = \\frac{6 - 5}{-3 - 2} = \\frac{1}{-5} = -\\frac{1}{5}$.",
        "Find perpendicular slope: $m_2 = -\\frac{1}{m_1} = -\\frac{1}{-1/5} = 5$.",
        "Use Point-Slope form with $(-3, 5)$: $y - 5 = 5(x - (-3)) \\implies y - 5 = 5x + 15$.",
        "Rearrange into standard form: $5x - y + 20 = 0$."
      ],
      "result": "5x - y + 20 = 0"
    },
    "verificationProblem": "Check: Slope is $5$, perpendicular to given line slope $-1/5$ since $5 \\times (-1/5) = -1$. Point $(-3,5)$ satisfies $5(-3) - 5 + 20 = -20 + 20 = 0$. Matches.",
    "realWorldUse": "Used in computer graphics ray tracing, robotics path planning, civil roadway gradient surveying, and econometric trend-line regressions.",
    "diagramType": "straight-line-intercepts-and-normals"
  },
  "CBSE-CH-G11-MATH-CH10": {
    "chapterTitle": "Conic Sections",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 10,
    "essentialLaw": "\\text{Circle: } (x-h)^2+(y-k)^2 = r^2 \\quad | \\quad \\text{Parabola: } y^2 = 4ax \\quad | \\quad \\text{Ellipse: } \\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1 \\; (b^2=a^2(1-e^2)) \\quad | \\quad \\text{Hyperbola: } \\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1",
    "coreConcepts": [
      {
        "heading": "Circles and Parabolas",
        "bullets": [
          "Circle with center $(h,k)$ and radius $r$: $(x - h)^2 + (y - k)^2 = r^2$. General form: $x^2 + y^2 + 2gx + 2fy + c = 0$ with center $(-g, -f)$ and $r = \\sqrt{g^2 + f^2 - c}$.",
          "Parabola ($e=1$): Locus of points equidistant from fixed focus $(a,0)$ and directrix $x = -a$; standard form $y^2 = 4ax$ has vertex $(0,0)$, axis $y=0$, and latus rectum length $4a$.",
          "Four standard parabola orientations: $y^2 = 4ax$ (right), $y^2 = -4ax$ (left), $x^2 = 4ay$ (up), $x^2 = -4ay$ (down)."
        ]
      },
      {
        "heading": "Ellipses and Hyperbolas",
        "bullets": [
          "Ellipse ($e < 1$): $\\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1$ ($a > b$), with foci $(\\pm c, 0)$ where $c = \\sqrt{a^2 - b^2}$, eccentricity $e = \\frac{c}{a}$, and latus rectum length $\\frac{2b^2}{a}$.",
          "Hyperbola ($e > 1$): $\\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1$, with foci $(\\pm c, 0)$ where $c = \\sqrt{a^2 + b^2}$, eccentricity $e = \\frac{c}{a}$, and latus rectum length $\\frac{2b^2}{a}$.",
          "Reflective properties: Parabolic reflectors focus parallel rays; elliptical acoustics reflect rays from one focus to the other."
        ]
      }
    ],
    "examTraps": [
      "Mixing $a$ and $b$ in vertical ellipses where major axis is along y-axis ($\frac{x^2}{b^2} + \frac{y^2}{a^2} = 1$).",
      "Confusing the relationship between $a, b, c$: for ellipse $c^2 = a^2 - b^2$, whereas for hyperbola $c^2 = a^2 + b^2$."
    ],
    "quickMentalCheck": "What is the eccentricity of a parabola? (Answer: $e = 1$).",
    "cueQuestions": [
      "How does cutting a double right circular cone by a plane at varying angles generate circles, ellipses, parabolas, and hyperbolas?",
      "What are the coordinates of the foci, vertices, and length of latus rectum of the ellipse $9x^2 + 4y^2 = 36$?",
      "What is the defining focal-directrix property that distinguishes an ellipse ($e < 1$) from a hyperbola ($e > 1$)?"
    ],
    "workedExample": {
      "problem": "Find the coordinates of the foci, vertices, eccentricity, and length of the latus rectum for the ellipse $25x^2 + 9y^2 = 225$.",
      "steps": [
        "Divide by $225$: $\\frac{x^2}{9} + \\frac{y^2}{25} = 1$.",
        "Identify major axis: Denominator of $y^2$ is larger ($25 > 9$), so major axis is along y-axis with $a^2 = 25 \\implies a = 5$ and $b^2 = 9 \\implies b = 3$.",
        "Calculate $c$: $c = \\sqrt{a^2 - b^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4$.",
        "Foci: $(0, \\pm c) = (0, \\pm 4)$; Vertices: $(0, \\pm a) = (0, \\pm 5)$.",
        "Eccentricity: $e = \\frac{c}{a} = \\frac{4}{5} = 0.8$.",
        "Length of Latus Rectum: $LR = \\frac{2b^2}{a} = \\frac{2(9)}{5} = \\frac{18}{5} = 3.6$."
      ],
      "result": "\\text{Foci: } (0, \\pm 4), \\; \\text{Vertices: } (0, \\pm 5), \\; e = \\frac{4}{5}, \\; LR = \\frac{18}{5}"
    },
    "verificationProblem": "Check: $b^2 = a^2(1 - e^2) \\implies 9 = 25(1 - 16/25) = 25(9/25) = 9$. Exact match.",
    "realWorldUse": "Underpins planetary Keplerian orbits (ellipses), satellite dish antenna designs (parabolas), and GPS hyperbolic triangulation.",
    "diagramType": "conic-sections-foci-directrix"
  },
  "CBSE-CH-G11-MATH-CH11": {
    "chapterTitle": "Introduction to Three Dimensional Geometry",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 11,
    "essentialLaw": "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2} \\quad | \\quad P = \\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}, \\frac{mz_2+nz_1}{m+n}\right) \\quad | \\quad G = \\left(\\frac{\\sum x_i}{3}, \\frac{\\sum y_i}{3}, \\frac{\\sum z_i}{3}\right)",
    "coreConcepts": [
      {
        "heading": "Coordinate Axes, Planes, and 8 Octants",
        "bullets": [
          "Three mutually perpendicular axes (X, Y, Z) intersect at origin $(0,0,0)$ dividing space into 8 Octants.",
          "Coordinate planes: XY-plane ($z=0$), YZ-plane ($x=0$), ZX-plane ($y=0$).",
          "Sign convention across Octants: Octant I $(+,+,+)$, II $(-,+,+)$, III $(-,-,+)$, IV $(+,-,+)$, V $(+,+,-)$, VI $(-,+,-)$, VII $(-,-,-)$, VIII $(+,-,-)$."
        ]
      },
      {
        "heading": "Distance Formula, Section Formula & Collinearity",
        "bullets": [
          "Distance between $P(x_1, y_1, z_1)$ and $Q(x_2, y_2, z_2)$: $PQ = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}$.",
          "Section formula: Coordinates of point dividing line segment joining $P$ and $Q$ in ratio $m:n$ internally: $\\left(\\frac{mx_2+nx_1}{m+n}, \\frac{my_2+ny_1}{m+n}, \\frac{mz_2+nz_1}{m+n}\right)$.",
          "Centroid of a triangle with vertices $(x_1,y_1,z_1), (x_2,y_2,z_2), (x_3,y_3,z_3)$: $G = \\left(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3}, \\frac{z_1+z_2+z_3}{3}\right)$."
        ]
      }
    ],
    "examTraps": [
      "Confusing the octant numbering system for negative $z$-coordinates (Octants V to VIII).",
      "Forgetting that a point on the Y-axis has coordinates $(0, y, 0)$ with both $x$ and $z$ zero."
    ],
    "quickMentalCheck": "In which octant does the point $(-3, 1, -2)$ lie? (Answer: Octant VI, signs are $(-, +, -)$).",
    "cueQuestions": [
      "How does the introduction of the Z-axis extend 2D Cartesian plane geometry into 8 three-dimensional spatial octants?",
      "How do you prove that three points $A, B, C$ in 3D space are collinear using the section formula?",
      "What are the coordinates of the centroid of a tetrahedron with given 4 spatial vertices?"
    ],
    "workedExample": {
      "problem": "Find the ratio in which the YZ-plane divides the line segment joining points $A(-2, 4, 7)$ and $B(3, -5, 8)$. Also find the point of intersection.",
      "steps": [
        "Let the YZ-plane divide $AB$ in ratio $k : 1$ at point $P$.",
        "By section formula, coordinates of $P$ are: $P = \\left(\\frac{3k - 2}{k + 1}, \\frac{-5k + 4}{k + 1}, \\frac{8k + 7}{k + 1}\\right)$.",
        "Since $P$ lies on the YZ-plane, its x-coordinate is zero: $\\frac{3k - 2}{k + 1} = 0 \\implies 3k - 2 = 0 \\implies k = \\frac{2}{3}$.",
        "Ratio is $2 : 3$ internally.",
        "Find $y$ and $z$ coordinates for $k = 2/3$: $y = \\frac{-5(2/3) + 4}{2/3 + 1} = \\frac{-10/3 + 12/3}{5/3} = \\frac{2}{5}$; $z = \\frac{8(2/3) + 7}{2/3 + 1} = \\frac{16/3 + 21/3}{5/3} = \\frac{37}{5}$."
      ],
      "result": "\\text{Ratio: } 2:3 \\text{ internally}, \\quad P = \\left(0, \\frac{2}{5}, \\frac{37}{5}\\right)"
    },
    "verificationProblem": "Check: $x$-coordinate is exactly $0$, verifying point lies on the YZ-plane. Matches.",
    "realWorldUse": "Forms the mathematical foundation for 3D computer animation, CAD mechanical modeling, flight navigation spatial coordinates, and robotics arm kinematics.",
    "diagramType": "3d-octants-coordinate-planes"
  },
  "CBSE-CH-G11-MATH-CH12": {
    "chapterTitle": "Limits and Derivatives",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 12,
    "essentialLaw": "\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1, \\; \\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = n a^{n-1} \\quad | \\quad f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h} \\quad | \\quad (uv)' = u'v + uv', \\; \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}",
    "coreConcepts": [
      {
        "heading": "Intuitive Concept of Limit & Standard Limit Theorems",
        "bullets": [
          "A limit $\\lim_{x \\to a} f(x) = L$ exists if and only if both left-hand limit and right-hand limit exist and are equal: $\\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L$.",
          "Algebraic limits: $\\lim_{x \\to a} \\frac{x^n - a^n}{x - a} = n a^{n-1}$ for any rational number $n$.",
          "Trigonometric standard limits: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ and $\\lim_{x \\to 0} \\frac{1 - \\cos x}{x} = 0$ (where angle $x$ is in radians)."
        ]
      },
      {
        "heading": "First Principle of Differentiation & Product/Quotient Rules",
        "bullets": [
          "Derivative from First Principles: $f'(x) = \\frac{df}{dx} = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$.",
          "Power Rule: $\\frac{d}{dx}(x^n) = n x^{n-1}$; Trigonometric derivatives: $\\frac{d}{dx}(\\sin x) = \\cos x, \\frac{d}{dx}(\\cos x) = -\\sin x, \\frac{d}{dx}(\\tan x) = \\sec^2 x$.",
          "Leibniz Product Rule: $(uv)' = u'v + uv'; Quotient Rule: \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$ ($v \\neq 0$)."
        ]
      }
    ],
    "examTraps": [
      "Attempting direct substitution into $\\frac{0}{0}$ indeterminate forms without algebraic factorization or using standard trigonometric theorems.",
      "Forgetting the negative sign in the quotient rule numerator: it is $(u'v - uv')/v^2$, NOT $(uv' - u'v)/v^2$."
    ],
    "quickMentalCheck": "Evaluate $\\lim_{x \\to 0} \\frac{\\sin 5x}{x}$. (Answer: $\\lim_{x \\to 0} 5 \\cdot \\frac{\\sin 5x}{5x} = 5 \\times 1 = 5$).",
    "cueQuestions": [
      "What analytical condition must be satisfied for the limit of a piecewise function to exist at a transition point?",
      "How do you derive the derivative of $f(x) = \\sin x$ using the definition of derivative from First Principles?",
      "How is the Sandwich (Squeeze) Theorem used to prove that $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$?"
    ],
    "workedExample": {
      "problem": "Find the derivative of $f(x) = \\frac{x + \\cos x}{\\tan x}$ with respect to $x$.",
      "steps": [
        "Identify functions for Quotient Rule: $u = x + \\cos x \\implies u' = 1 - \\sin x$.",
        "Identify denominator: $v = \\tan x \\implies v' = \\sec^2 x$.",
        "Apply Quotient Rule: $f'(x) = \\frac{u'v - uv'}{v^2} = \\frac{(1 - \\sin x)\\tan x - (x + \\cos x)\\sec^2 x}{\\tan^2 x}$.",
        "Expand terms: $f'(x) = \\frac{\\tan x - \\sin x \\tan x - x\\sec^2 x - \\cos x \\sec^2 x}{\\tan^2 x} = \\frac{\\tan x - \\sin x \\tan x - x\\sec^2 x - \\sec x}{\\tan^2 x}$."
      ],
      "result": "f'(x) = \\frac{(1 - \\sin x)\\tan x - (x + \\cos x)\\sec^2 x}{\\tan^2 x}"
    },
    "verificationProblem": "Check at $x \\to 0$: derivative numerator evaluates consistently with individual limits. Verified.",
    "realWorldUse": "Forms the foundational mathematical calculus engine for instantaneous velocity/acceleration in physics, marginal revenue optimization in economics, and gradient descent algorithms in AI.",
    "diagramType": "limit-secant-to-tangent-derivation"
  },
  "CBSE-CH-G11-MATH-CH13": {
    "chapterTitle": "Statistics",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 13,
    "essentialLaw": "\\text{Frequency Density: } \\text{Adjusted Frequency} = \\frac{\\text{Frequency}}{\\text{Class Width}} \\times \\text{Minimum Class Width} \\quad | \\quad \\text{Class Mark} = \\frac{L + U}{2}",
    "coreConcepts": [
      {
        "heading": "Graphical Representation & Histograms",
        "bullets": [
          "Histograms represent continuous grouped data where area of rectangle is proportional to class frequency.",
          "Histograms with unequal class widths require adjusting frequency heights using minimum class width.",
          "Frequency polygons connect midpoints (class marks) of consecutive class intervals."
        ]
      },
      {
        "heading": "Frequency Polygons & Class Marks",
        "bullets": [
          "Class Mark is the arithmetic average of upper and lower limits: $(L+U)/2$.",
          "Frequency polygons are closed by extending to adjacent zero-frequency class midpoints on horizontal axis.",
          "Bar graphs represent discrete categorical data with uniform spacing between bars."
        ]
      }
    ],
    "examTraps": [
      "Drawing histogram heights using raw frequencies when class widths are unequal.",
      "Forgetting to close the frequency polygon at zero frequency on the $x$-axis."
    ],
    "quickMentalCheck": "What is the class mark of interval 35 - 45? ($\\frac{35+45}{2} = 40$).",
    "cueQuestions": [
      "How does step-deviation method minimize arithmetic error in calculating mean of grouped data?",
      "What is the empirical relation connecting mean, median, and mode for moderately skewed data?",
      "How do you locate the median graphically using cumulative frequency curves (ogives)?"
    ],
    "workedExample": {
      "problem": "Adjust frequency for class $10-20$ (freq 12) when minimum class width is 5.",
      "steps": [
        "Class width $w = 20 - 10 = 10$, minimum width $w_{\\min} = 5$, raw frequency $f = 12$.",
        "Apply: $\\text{Adjusted Frequency} = \\frac{f}{w} \\times w_{\\min} = \\frac{12}{10} \\times 5 = 6$."
      ],
      "result": "\\text{Adjusted Height} = 6"
    },
    "verificationProblem": "Verify area: $6 \\times 10 = 60$ is proportional to raw frequency $12 \\times 5 = 60$.",
    "realWorldUse": "Applied in public health epidemiologic statistics, macroeconomic inflation index calculations, quality control tolerance tracking, and census surveys.",
    "diagramType": "statistics-histogram-ogive"
  },
  "CBSE-CH-G11-MATH-CH14": {
    "chapterTitle": "Probability",
    "subject": "Mathematics",
    "grade": 11,
    "chapterNum": 14,
    "essentialLaw": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B) \\quad | \\quad P(A') = 1 - P(A) \\quad | \\quad P(A - B) = P(A) - P(A \\cap B)",
    "coreConcepts": [
      {
        "heading": "Sample Space, Events & Axiomatic Approach",
        "bullets": [
          "Sample space $S$ is the set of all possible outcomes of a random experiment; Event $E$ is a subset of sample space ($E \\subseteq S$).",
          "Axioms of Probability: (i) For any event $E$, $0 \\le P(E) \\le 1$; (ii) $P(S) = 1$; (iii) If $A$ and $B$ are mutually exclusive, $P(A \\cup B) = P(A) + P(B)$.",
          "Mutually exclusive events: $A \\cap B = \\emptyset$ (cannot happen simultaneously); Exhaustive events: $A \\cup B = S$."
        ]
      },
      {
        "heading": "Addition Theorem & Complementary Events",
        "bullets": [
          "Addition Theorem for any two events: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
          "Addition Theorem for three events: $P(A \\cup B \\cup C) = P(A) + P(B) + P(C) - P(A \\cap B) - P(B \\cap C) - P(C \\cap A) + P(A \\cap B \\cap C)$.",
          "Complementary probability: $P(\\text{not } A) = P(A') = 1 - P(A)$; Probability of only event $A$: $P(A \\cap B') = P(A) - P(A \\cap B)$."
        ]
      }
    ],
    "examTraps": [
      "Assuming mutually exclusive events are independent; mutually exclusive events with non-zero probability can NEVER be independent ($P(A \\cap B) = 0 \\neq P(A)P(B)$).",
      "Forgetting to subtract the intersection $P(A \\cap B)$ when computing $P(A \\text{ or } B)$."
    ],
    "quickMentalCheck": "If $P(A) = 0.6, P(B) = 0.5,$ and $P(A \\cap B) = 0.3$, find $P(A \\cup B)$. (Answer: $0.6 + 0.5 - 0.3 = 0.8$).",
    "cueQuestions": [
      "What are the three fundamental Kolmogorov axioms that define a valid mathematical probability space?",
      "How does the concept of mutually exclusive events differ fundamentally from independent events?",
      "How do you compute the probability that exactly one of two events $A$ or $B$ occurs?"
    ],
    "workedExample": {
      "problem": "Two dice are thrown together. What is the probability of getting a sum of numbers greater than 8, or at least one die showing a 5?",
      "steps": [
        "Total outcomes in sample space: $|S| = 6 \\times 6 = 36$.",
        "Event A (Sum $> 8$, i.e., sum 9, 10, 11, 12): $A = \\{(3,6),(4,5),(5,4),(6,3),(4,6),(5,5),(6,4),(5,6),(6,5),(6,6)\\} \\implies |A| = 10, P(A) = 10/36$.",
        "Event B (At least one die shows 5): $B = \\{(5,1),(5,2),(5,3),(5,4),(5,5),(5,6),(1,5),(2,5),(3,5),(4,5),(6,5)\\} \\implies |B| = 11, P(B) = 11/36$.",
        "Intersection $A \\cap B$: Outcomes in both: $\\{(4,5),(5,4),(5,5),(5,6),(6,5)\\} \\implies |A \\cap B| = 5, P(A \\cap B) = 5/36$.",
        "Apply Addition Theorem: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = \\frac{10}{36} + \\frac{11}{36} - \\frac{5}{36} = \\frac{16}{36} = \\frac{4}{9}$."
      ],
      "result": "P(A \\cup B) = \\frac{4}{9}"
    },
    "verificationProblem": "Check: Count union set outcomes directly: $10 + 11 - 5 = 16$ distinct outcomes. $16/36 = 4/9$. Matches.",
    "realWorldUse": "Underpins insurance risk actuarial modeling, portfolio risk estimation in finance, clinical trial efficacy verification, and randomized algorithms.",
    "diagramType": "probability-venn-diagram-union"
  },
  "CBSE-CH-G11-BIO-CH01": {
    "chapterTitle": "The Living World",
    "subject": "BIOLOGY",
    "grade": 11,
    "chapterNum": 1,
    "essentialLaw": "$\\text{Binomial Nomenclature Rule: } \\textit{Genus} \\ \\textit{species} \\quad [\\text{ICBN / ICZN Statutory Invariants}]$",
    "coreConcepts": [
      {
        "heading": "Defining vs Non-Defining Properties of Life",
        "bullets": [
          "Metabolism, cellular organization, and consciousness are absolute defining characteristics with zero exceptions.",
          "Growth and reproduction are non-defining traits (sterile worker bees/mules cannot reproduce; non-living crystals grow by extrinsic mass accumulation)."
        ]
      },
      {
        "heading": "Taxonomic Hierarchy",
        "bullets": [
          "Obligate rank sequence: Kingdom $\\to$ Division / Phylum $\\to$ Class $\\to$ Order $\\to$ Family $\\to$ Genus $\\to$ Species.",
          "As we ascend from Species to Kingdom, the number of shared common characteristics progressively decreases."
        ]
      },
      {
        "heading": "Binomial Nomenclature Rules",
        "bullets": [
          "Established by Carolus Linnaeus: Generic name capitalized, Specific epithet lowercase, Latin origin.",
          "Printed in italics or separately underlined when handwritten; author citation at the end (e.g. *Mangifera indica* Linn.)."
        ]
      }
    ],
    "examTraps": [
      "Specific Epithet Capitalization Mistakes: Capitalizing the specific epithet (e.g. writing Mangifera Indica instead of Mangifera indica).",
      "Confusing Non-Defining Traits with Defining Traits: Classifying mass accumulation (extrinsic growth) or reproduction as defining properties.",
      "Hierarchy Inversions: Swapping sequential rank order between Family, Order, and Class."
    ],
    "quickMentalCheck": "State whether intrinsic growth and cellular metabolism are defining or non-defining properties.",
    "cueQuestions": [
      "Why is cellular organization and metabolism considered a defining property of life while reproduction is not?",
      "State the statutory rules of Binomial Nomenclature governed by ICBN.",
      "How does the number of shared characteristics change from Species to Kingdom?"
    ],
    "workedExample": {
      "problem": "Classify Man (Homo sapiens) and Mango (Mangifera indica) into their complete taxonomic hierarchy.",
      "steps": [
        "Step 1: Man -> Kingdom: Animalia, Phylum: Chordata, Class: Mammalia, Order: Primata, Family: Hominidae, Genus: Homo, Species: sapiens.",
        "Step 2: Mango -> Kingdom: Plantae, Division: Angiospermae, Class: Dicotyledonae, Order: Sapindales, Family: Anacardiaceae, Genus: Mangifera, Species: indica.",
        "Step 3: State the binomial convention: Homo sapiens and Mangifera indica."
      ],
      "result": "Complete statutory taxonomic classification verified for Homo sapiens and Mangifera indica."
    },
    "verificationProblem": "Verify why reproduction and extrinsic mass accumulation cannot serve as defining criteria for life.",
    "realWorldUse": "Applied in biological taxonomy, biodiversity conservation, museum cataloging, and systematic ecology.",
    "diagramType": "visual_model_pending"
  },
  "CBSE-CH-G11-BIO-CH02": {
    "chapterTitle": "Biological Classification",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 2,
    "essentialLaw": "\\text{Five Kingdoms (Whittaker, 1969): Monera (Prokaryotic)} \\to \\text{Protista (Unicellular Eukaryotes)} \\to \\text{Fungi} + \\text{Plantae} + \\text{Animalia}",
    "coreConcepts": [
      {
        "heading": "Kingdom Monera, Archaebacteria & Eubacteria",
        "bullets": [
          "Five Kingdom Classification (R.H. Whittaker): Criteria: Cell structure, Body organization, Mode of nutrition, Reproduction, Phylogenetic relationships.",
          "Kingdom Monera: Solely prokaryotes; Archaebacteria have distinct cell wall structure lacking peptidoglycan, surviving extreme habitats (Methanogens in marshy/rumen environments, Halophiles in high salt, Thermoacidophiles in hot sulfur springs).",
          "Eubacteria: Rigid peptidoglycan cell wall; Cyanobacteria (Blue-green algae: photosynthetic with chlorophyll-a, heterocysts for nitrogen fixation in Nostoc/Anabaena); Mycoplasma (smallest living cells, completely lack cell wall, survive anaerobically, pathogenic in animals/plants)."
        ]
      },
      {
        "heading": "Kingdom Protista, Fungi & Acellular Entities (Viruses, Viroids, Prions)",
        "bullets": [
          "Kingdom Protista: Chrysophytes (Diatoms with siliceous frustule walls forming diatomaceous earth, Desmids), Dinoflagellates (red tide caused by Gonyaulax toxins), Euglenoids (mixotrophic with proteinaceous pellicle, e.g., Euglena), Slime moulds (saprophytic plasmodium), Protozoans (Amoeboid, Flagellated, Ciliated like Paramecium, Sporozoans like Plasmodium).",
          "Kingdom Fungi: Chitinous cell wall; Classes: Phycomycetes (algal fungi, coenocytic aseptate mycelium, e.g., Mucor, Rhizopus, Albugo candida), Ascomycetes (sac fungi, ascospores in asci, e.g., Penicillium, Yeast, Aspergillus, Neurospora), Basidiomycetes (club fungi, basidiospores on basidium, e.g., Agaricus mushroom, Puccinia rust, Ustilago smut), Deuteromycetes (imperfect fungi lacking sexual stage, e.g., Alternaria, Trichoderma).",
          "Acellular Entities: Viruses (nucleoprotein: DNA or RNA genome enclosed in protein capsid, obligate intracellular parasites, Ivanowsky/Beijerinck/Stanley crystalline); Viroids (T.O. Diener, free low molecular weight RNA lacking protein coat, Potato Spindle Tuber disease); Prions (abnormally folded protein particles, Bovine Spongiform Encephalopathy / Mad Cow disease, Cr-Jacob disease); Lichens (symbiotic Mycobiont + Phycobiont, bioindicators of $\\text{SO}_2$ air pollution)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Viroids (infectious naked RNA without capsid) with Prions (infectious protein without nucleic acid).",
      "Classifying Deuteromycetes as having basidiospores (Deuteromycetes lack any known sexual stage, hence called imperfect fungi)."
    ],
    "quickMentalCheck": "Why are diatoms called the \"chief producers in the oceans\"? Their microscopic photosynthetic population is vast and their indestructible silica cell walls form diatomaceous earth over geological time.",
    "cueQuestions": [
      "What are the five fundamental criteria used by R.H. Whittaker for the Five Kingdom Classification?",
      "How do Archaebacteria survive in extreme environmental conditions like boiling hydrothermal vents and hypersaline lakes?",
      "What structural differences distinguish a Virus, a Viroid, and a Prion?"
    ],
    "workedExample": {
      "problem": "Classify the following fungi into their respective taxonomic classes: (a) Rhizopus, (b) Neurospora, (c) Puccinia, (d) Alternaria, and state their distinctive reproductive features.",
      "steps": [
        "(a) Rhizopus: Class Phycomycetes. Distinctive feature: Aseptate, coenocytic mycelium; produces asexual sporangiospores and sexual zygospores.",
        "(b) Neurospora: Class Ascomycetes (Sac fungi). Distinctive feature: Septate mycelium; produces asexual conidia and endogenous sexual ascospores inside asci.",
        "(c) Puccinia (Rust fungus): Class Basidiomycetes (Club fungi). Distinctive feature: Produces exogenous sexual basidiospores on basidia; lacks asexual spores.",
        "(d) Alternaria: Class Deuteromycetes (Imperfect fungi). Distinctive feature: Only vegetative and asexual reproduction via conidia is known; sexual stage absent."
      ],
      "result": "(a) \\text{Phycomycetes}, \\; (b) \\text{Ascomycetes}, \\; (c) \\text{Basidiomycetes}, \\; (d) \\text{Deuteromycetes}"
    },
    "verificationProblem": "Check septation: Phycomycetes is aseptate/coenocytic, while Ascomycetes, Basidiomycetes, and Deuteromycetes are all septate and branched. Verified.",
    "realWorldUse": "Neurospora genetics laboratory model organism, mycorrhizal biofertilizers in forestry, single-cell protein production from Spirulina.",
    "diagramType": "five-kingdom-whittaker-tree"
  },
  "CBSE-CH-G11-BIO-CH03": {
    "chapterTitle": "Plant Kingdom",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 3,
    "essentialLaw": "\\text{Alternation of Generations: Gametophyte } (n) \\xrightarrow{\\text{Mitosis}} \\text{Gametes} \\xrightarrow{\\text{Syngamy}} \\text{Sporophyte } (2n) \\xrightarrow{\\text{Meiosis}} \\text{Spores}",
    "coreConcepts": [
      {
        "heading": "Algae, Bryophytes & Pteridophytes",
        "bullets": [
          "Algae: Chlorophyceae (Green: chlorophyll a+b, starch in pyrenoids, cellulose+pectose wall, e.g., Volvox, Chlamydomonas, Spirogyra); Phaeophyceae (Brown: chlorophyll a+c, fucoxanthin, laminarin/mannitol food, algin coating, holdfast/stipe/frond, e.g., Ectocarpus, Dictyota, Laminaria, Sargassum, Fucus); Rhodophyceae (Red: chlorophyll a+d, r-phycoerythrin, floridean starch, non-motile gametes, e.g., Polysiphonia, Porphyra, Gracilaria, Gelidium source of agar).",
          "Bryophytes (Amphibians of Plant Kingdom): Dependent on water for fertilization; Dominant gametophyte ($n$); Liverworts (thalloid, gemmae cups for asexual reproduction, e.g., Marchantia) and Mosses (Protonema $\\to$ leafy gametophyte, sporophyte differentiated into foot, seta, capsule, e.g., Funaria, Sphagnum peat moss).",
          "Pteridophytes (First Vascular Land Plants): Dominant independent sporophyte ($2n$) with xylem and phloem; Microphylls (Selaginella) vs Megaphylls (Ferns); Homosporous vs Heterosporous (Selaginella, Salvinia produce microspores and megaspores, precursor to seed habit); Prothallus gametophyte requires cool, damp habitat."
        ]
      },
      {
        "heading": "Gymnosperms, Angiosperms & Life Cycle Patterns",
        "bullets": [
          "Gymnosperms (Naked Seed Plants): Ovules not enclosed by ovary wall; Tap roots, coralloid roots with nitrogen-fixing cyanobacteria in Cycas, mycorrhizal roots in Pinus; Xerophytic needle leaves with sunken stomata; Heterosporous (microspores in male cones, megaspores in female seed cones); Non-motile pollen transferred by wind (anemophily).",
          "Life Cycle Patterns: Haplontic (dominant free-living haploid gametophyte, zygotic meiosis, e.g., Volvox, Spirogyra, Chlamydomonas); Diplontic (dominant diploid sporophyte, e.g., Fucus, Gymnosperms, Angiosperms); Haplodiplontic (intermediate multi-cellular gametophyte and sporophyte phases, e.g., Bryophytes, Pteridophytes, Ectocarpus, Polysiphonia, Kelps)."
        ]
      }
    ],
    "examTraps": [
      "Assuming all algae have haplontic life cycles (Fucus is strictly DIPLONTIC; Ectocarpus and Polysiphonia are HAPLODIPLONTIC).",
      "Thinking Bryophyte sporophytes are free-living (Bryophyte sporophyte is parasitic and attached to photosynthetic gametophyte for nutrition)."
    ],
    "quickMentalCheck": "Why is the heterospory of Selaginella and Salvinia considered a crucial evolutionary precursor to the seed habit? The female gametophyte is retained on the parent sporophyte for variable periods, providing embryonic nutrition within the megasporangium.",
    "cueQuestions": [
      "What photosynthetic pigments and stored food reserves distinguish Chlorophyceae, Phaeophyceae, and Rhodophyceae?",
      "Why are Bryophytes called the amphibians of the plant kingdom?",
      "How does the life cycle of Gymnosperms differ from Angiosperms regarding endosperm ploidy and ovary enclosure?"
    ],
    "workedExample": {
      "problem": "Tabulate the differences between Chlorophyceae, Phaeophyceae, and Rhodophyceae on the basis of: Major pigments, Stored food, Cell wall composition, and Flagellar insertion.",
      "steps": [
        "1. Chlorophyceae (Green Algae): Pigments: Chlorophyll a, b; Stored Food: Starch; Cell Wall: Cellulose; Flagella: 2-8, equal, apical.",
        "2. Phaeophyceae (Brown Algae): Pigments: Chlorophyll a, c, Fucoxanthin; Stored Food: Laminarin, Mannitol; Cell Wall: Cellulose with Algin; Flagella: 2, unequal, lateral.",
        "3. Rhodophyceae (Red Algae): Pigments: Chlorophyll a, d, r-Phycoerythrin; Stored Food: Floridean starch; Cell Wall: Cellulose, Pectin, Polysulfate esters; Flagella: Completely ABSENT (non-motile)."
      ],
      "result": "\\text{Green: Chl a,b / Starch}; \\quad \\text{Brown: Chl a,c, Fucoxanthin / Laminarin}; \\quad \\text{Red: Chl a,d, Phycoerythrin / Floridean starch (No flagella)}"
    },
    "verificationProblem": "Check flagellar absence: Red algae have completely non-flagellated spores and gametes in all life cycle stages. Verified.",
    "realWorldUse": "Hydrocolloid algin extraction from brown algae, agar-agar from Gelidium/Gracilaria for microbiology media, Sphagnum peat moss for packaging living plants.",
    "diagramType": "plant-kingdom-alternation-of-generations"
  },
  "CBSE-CH-G11-BIO-CH04": {
    "chapterTitle": "Animal Kingdom",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 4,
    "essentialLaw": "\\text{Animalia Hierarchy: Porifera (Cellular)} \\to \\text{Cnidaria/Ctenophora (Tissue, Radial)} \\to \\text{Platyhelminthes (Acoelomate)} \\to \\text{Aschelminthes (Pseudocoelomate)} \\to \\text{Annelida-Chordata (Coelomate, Bilateral)}",
    "coreConcepts": [
      {
        "heading": "Basis of Classification & Non-Chordate Phyla (Porifera to Echinodermata)",
        "bullets": [
          "Basis of Classification: Levels of Organization (Cellular, Tissue, Organ, Organ-system); Symmetry (Asymmetrical, Radial, Bilateral); Germ Layers (Diploblastic, Triploblastic); Coelom (Acoelomate, Pseudocoelomate, Eucoelomate/Enterocoelomate); Segmentation (Metamerism in Annelida, Arthropoda); Notochord.",
          "Porifera (Sponges): Cellular level, water canal system (Ostia $\\to$ Spongocoel $\\to$ Osculum), Choanocytes / collar cells, spicules/spongin skeleton, e.g., Sycon, Spongilla, Euspongia.",
          "Cnidaria (Coelenterates): Cnidocytes with stinging nematocysts, gastrovascular cavity with hypostome, Polyp (sessile, asexual, Hydra/Adamsia) vs Medusa (umbrella, sexual, Aurelia); Metagenesis in Obelia.",
          "Ctenophora: Comb jellies, 8 external rows of ciliated comb plates for locomotion, bioluminescence, pleurobrachia.",
          "Platyhelminthes: Flatworms, bilateral, acoelomate, dorsoventrally flattened, flame cells (protonephridia) for osmoregulation, Taenia tapeworm, Fasciola liver fluke.",
          "Aschelminthes: Roundworms, pseudocoelomate, muscular pharynx, dioecious with sexual dimorphism, Ascaris, Wuchereria.",
          "Annelida: Metameric segmentation, longitudinal and circular muscles for locomotion, setae, closed circulatory system, nephridia for excretion, Nereis (parapodia), Earthworm, Hirudinaria (leech).",
          "Arthropoda: Largest phylum ($>2/3$ animal species), chitinous exoskeleton, jointed appendages, Malpighian tubules, compound eyes, open circulation, Apis, Bombyx, Laccifer, Anopheles, Limulus living fossil.",
          "Mollusca: Second largest phylum, unsegmented with calcareous shell, muscular foot, visceral hump, mantle with mantle cavity (gills/ctenidia), radula rasping organ, Pila, Octopus (devilfish).",
          "Echinodermata: Spiny-skinned marine animals, adult radial symmetry but larva bilateral, water vascular system for locomotion and food capture, Asterias starfish, Echinus."
        ]
      },
      {
        "heading": "Hemichordata, Chordata Characteristics & Vertebrate Classes",
        "bullets": [
          "Chordata Fundamental Hallmarks: 1. Notochord; 2. Dorsal hollow nerve cord; 3. Paired pharyngeal gill slits; 4. Post-anal tail.",
          "Subphyla: Urochordata (notochord only in larval tail, Ascidia, Salpa); Cephalochordata (notochord extends from head to tail throughout life, Branchiostoma / Amphioxus); Vertebrata (notochord replaced by cartilaginous/bony vertebral column in adults).",
          "Vertebrate Classes: Cyclostomata (jawless circular sucking mouth, Petromyzon lamprey); Chondrichthyes (cartilaginous fish, placoid scales, ventral mouth, air bladder absent $\\implies$ swim constantly, claspers in males, electric organ Torpedo, poison sting Trygon, Scoliodon shark); Osteichthyes (bony fish, cycloid/ctenoid scales, terminal mouth, 4 pairs gills with operculum, air bladder present for buoyancy, Labeo rohu, Betta, Exocoetus); Amphibia (dual habitat, moist scale-less skin, 3-chambered heart, tympanum, Rana, Bufo, Salamandra); Reptilia (dry cornified skin with epidermal scales/scutes, 3-chambered heart with 4-chambered in crocodile, poikilotherms, Chelone, Naja); Aves (feathers, forelimbs modified into wings, pneumatic hollow bones, air sacs connected to lungs for double respiration, 4-chambered heart, homeotherms); Mammalia (mammary glands, hair, pinna, heterodont dentition, 4-chambered heart, viviparous except oviparous Platypus Ornithorhynchus)."
        ]
      }
    ],
    "examTraps": [
      "Confusing adult Echinoderm symmetry (Adults have RADIAL symmetry, but their free-swimming ciliated larvae have strictly BILATERAL symmetry).",
      "Assuming all mammals are viviparous (the Duck-billed Platypus Ornithorhynchus and Echidna are oviparous egg-laying mammals)."
    ],
    "quickMentalCheck": "Which animal phylum has a pseudocoelom (false body cavity derived from blastocoel)? Phylum Aschelminthes (Roundworms).",
    "cueQuestions": [
      "What are the four defining anatomical hallmarks that distinguish Phylum Chordata from all non-chordate phyla?",
      "How does the water canal system of Porifera differ in structure and function from the water vascular system of Echinodermata?",
      "What adaptations distinguish Class Chondrichthyes (cartilaginous fish) from Class Osteichthyes (bony fish)?"
    ],
    "workedExample": {
      "problem": "Distinguish between Urochordata, Cephalochordata, and Vertebrata on the basis of notochord persistence, location, and developmental fate.",
      "steps": [
        "1. Urochordata (Tunicata): Notochord is present ONLY in the tail region of the free-swimming larva and is completely lost during retrogressive metamorphosis into adult (e.g., Ascidia, Salpa).",
        "2. Cephalochordata: Notochord extends from the head to tail region (rostrum to caudal tip) and persists throughout the entire life of the organism (e.g., Branchiostoma / Amphioxus).",
        "3. Vertebrata: Notochord is present during the embryonic period only and is replaced by a cartilaginous or bony vertebral column in the adult. \"All vertebrates are chordates, but not all chordates are vertebrates.\""
      ],
      "result": "\\text{Urochordata: Larval tail only}; \\quad \\text{Cephalochordata: Head-to-tail, lifelong}; \\quad \\text{Vertebrata: Replaced by vertebral column}"
    },
    "verificationProblem": "Check chordate subphylum inclusion: Protochordates (Urochordata + Cephalochordata) are strictly marine and non-vertebrate. Vertebrata encompasses all craniates. Verified.",
    "realWorldUse": "Silk production from Bombyx mori silkworm, anti-venom production from elapid snake venom, marine pearl culture from Pinctada oyster.",
    "diagramType": "chordata-body-plan-hallmarks"
  },
  "CBSE-CH-G11-BIO-CH05": {
    "chapterTitle": "Morphology of Flowering Plants",
    "subject": "BIOLOGY",
    "grade": 11,
    "chapterNum": 5,
    "essentialLaw": "$\\text{Floral Invariant: } \\oplus \\ \\text{or} \\ \\% \\quad \\text{K}_{(5)} \\ \\text{C}_{1+2+(2)} \\ \\text{A}_{(9)+1} \\ \\underline{\\text{G}}_{1} \\quad | \\quad \\text{Symmetry} \\cdot \\text{Calyx} \\cdot \\text{Corolla} \\cdot \\text{Androecium} \\cdot \\text{Gynoecium}$",
    "coreConcepts": [
      {
        "heading": "Root and Stem Modifications",
        "bullets": [
          "Roots: Taproot (mustard), Fibrous (wheat), Adventitious (banyan, grass); Specialized Pneumatophores in Rhizophora for respiration in halophytic swamps.",
          "Stems: Tendrils (gourds, grapevine), Thorns (Citrus, Bougainvillea), Rhizomes (ginger), and Photosynthetic stems (Phylloclades in Opuntia, Cladodes)."
        ]
      },
      {
        "heading": "Inflorescence and Ovary Insertion",
        "bullets": [
          "Inflorescence: Racemose (acropetal succession, indefinite main axis) vs Cymose (basipetal succession, definite growth axis).",
          "Flower symmetry: Actinomorphic (radial $\\oplus$) vs Zygomorphic (bilateral $\\%$).",
          "Ovary insertion: Hypogynous (superior $\\underline{\\text{G}}$, e.g. mustard), Perigynous (half-inferior, e.g. rose/plum), Epigynous (inferior $\\overline{\\text{G}}$, e.g. guava, cucumber)."
        ]
      },
      {
        "heading": "Aestivation and Placentation Patterns",
        "bullets": [
          "Aestivation: Valvate (Calotropis), Twisted (China rose), Imbricate (Cassia), Vexillary / Papilionaceous (Pea / Fabaceae: 1 standard + 2 wings + 2 keels).",
          "Placentation: Marginal (Pea), Axile (Tomato, China rose), Parietal (Mustard, Argemone), Free-central (Dianthus), Basal (Sunflower, Marigold)."
        ]
      }
    ],
    "examTraps": [
      "Phyllode vs Phylloclade Confusion: Confusing modified petiole (Australian Acacia) with photosynthetic stem modification (Opuntia).",
      "Superior vs Inferior Ovary Misclassification: Swapping inferior ovary in guava/cucumber with superior ovary in mustard/china rose.",
      "Floral Symmetry Symbol Inversion: Inverting radial symmetry (oplus) with bilateral symmetry (%) in floral formula notation."
    ],
    "quickMentalCheck": "Placentation patterns of Solanaceae (Axile) vs Fabaceae (Marginal).",
    "cueQuestions": [
      "Differentiate between racemose and cymose inflorescence with structural diagrams.",
      "Define aestivation and describe the vexillary arrangement in Fabaceae.",
      "Write the statutory floral formula and floral diagram symbols for family Solanaceae."
    ],
    "workedExample": {
      "problem": "Write the complete floral formula and state diagnostic characteristics of family Fabaceae.",
      "steps": [
        "Step 1: Symmetry and sexuality -> Zygomorphic (%), bisexual (⚥).",
        "Step 2: Calyx -> 5 sepals, gamosepalous, valvate/imbricate aestivation (K(5)).",
        "Step 3: Corolla -> 5 petals, polypetalous, vexillary (C1+2+(2)).",
        "Step 4: Androecium & Gynoecium -> 10 stamens, diadelphous (A(9)+1); superior ovary, monocarpellary (G_1).",
        "Step 5: Complete formula: % ⚥ K(5) C1+2+(2) A(9)+1 G_1."
      ],
      "result": "Diagnostic floral formula verified for family Fabaceae."
    },
    "verificationProblem": "Verify the anatomical distinction between stem tendrils of Passion flower and leaf tendrils of Pea.",
    "realWorldUse": "Applied in botanical taxonomy, agronomy, floriculture, economic crop breeding, and pharmacognosy.",
    "diagramType": "visual_model_pending"
  },
  "CBSE-CH-G11-BIO-CH06": {
    "chapterTitle": "Anatomy of Flowering Plants",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 6,
    "essentialLaw": "\\text{Secondary Growth: Vascular Cambium } (\\text{Secondary Xylem (inside) } + \\text{ Secondary Phloem (outside)}) + \\text{Cork Cambium (Phellogen } \\to \\text{Phellem} + \\text{Phelloderm})",
    "coreConcepts": [
      {
        "heading": "Meristematic & Permanent Tissues (Simple vs Complex)",
        "bullets": [
          "Meristems: Apical meristems (root/shoot apex for primary growth), Intercalary meristems (grass internodes), Lateral meristems (vascular cambium and cork cambium for secondary thickening).",
          "Simple Permanent Tissues: Parenchyma (thin cellulose wall, storage, photosynthesis), Collenchyma (corner pectin thickening, mechanical support in young dicot stems/petioles), Sclerenchyma (thick lignified secondary walls, dead at maturity; Fibers and Sclereids/stone cells in pear grit/nutshells).",
          "Complex Tissues: Xylem (Tracheids, Vessels with perforated plates, Xylem parenchyma living, Xylem fibers; vessels absent in gymnosperms); Phloem (Sieve tube elements controlled by nucleated companion cells, Phloem parenchyma, Phloem fibers; sieve cells/albuminous cells in gymnosperms)."
        ]
      },
      {
        "heading": "Tissue Systems, Dicot vs Monocot Anatomy & Secondary Growth",
        "bullets": [
          "Epidermal Tissue System: Cuticle, stomata (kidney-shaped guard cells in dicots, dumb-bell shaped in monocot grasses), trichomes.",
          "Dicot vs Monocot Stem Anatomy: Dicot stem (vascular bundles in a ring, open with intrafascicular cambium, collenchymatous hypodermis); Monocot stem (scattered closed vascular bundles with sclerenchymatous bundle sheath, large oval water cavity, ground tissue undifferentiated).",
          "Dicot vs Monocot Root Anatomy: Dicot root (diarch to hexarch xylem, small pith); Monocot root (polyarch xylem $>6$, large well-developed pith, no secondary growth).",
          "Secondary Growth in Dicot Stem: Intrafascicular + Interfascicular cambium form complete cambial ring; Produces more secondary xylem inward than secondary phloem outward; Annual rings (Spring wood with wide vessels + Autumn wood with narrow vessels); Cork cambium (Phellogen) produces Cork (Phellem) outward and Secondary cortex (Phelloderm) inward, collectively forming Periderm; Bark includes all tissues external to vascular cambium."
        ]
      }
    ],
    "examTraps": [
      "Assuming monocot stems have secondary growth (monocots lack open cambium and exhibit zero normal secondary vascular growth).",
      "Confusing spring wood (light colored, low density, wide lumen vessels) with autumn wood (dark colored, high density, narrow vessels)."
    ],
    "quickMentalCheck": "Which cells control the metabolic activities of enucleated mature sieve tube elements? Companion cells, which remain connected to sieve tubes via plasmodesmata channels.",
    "cueQuestions": [
      "How does the anatomical structure of a dicot stem differ fundamentally from a monocot stem under a light microscope?",
      "How do annual growth rings (Spring wood vs Autumn wood) allow determination of a tree age (Dendrochronology)?",
      "What are Casparian strips in the root endodermis and why are they impregnated with suberin?"
    ],
    "workedExample": {
      "problem": "A transverse section of a plant organ shows scattered vascular bundles surrounded by sclerenchymatous bundle sheaths, each having phloem parenchyma absent and a water-containing cavity. Identify whether it is a monocot stem, dicot stem, monocot root, or dicot root.",
      "steps": [
        "1. Scattered vascular bundles in ground tissue is the hallmark of a Stem (roots have radial alternating bundles in a central cylinder).",
        "2. Vascular bundles are \"closed\" (lacking cambium) and surrounded by sclerenchymatous bundle sheaths.",
        "3. Presence of a water cavity (formed by disintegration of protoxylem) and absence of phloem parenchyma are diagnostic characteristics.",
        "4. These specific anatomical features definitively identify the organ as a Monocot Stem (e.g., Maize stem)."
      ],
      "result": "\\text{Organ Identified: Monocot Stem (e.g., Maize / Zea mays)}"
    },
    "verificationProblem": "Check ground tissue: Monocot stem has ground tissue undifferentiated into cortex, endodermis, and pericycle, matching scattered bundle distribution. Verified.",
    "realWorldUse": "Dendrochronology climate dating using tree rings, forensic botanical identification of timber wood species, papermaking softwood vs hardwood selection.",
    "diagramType": "dicot-vs-monocot-stem-anatomy"
  },
  "CBSE-CH-G11-BIO-CH07": {
    "chapterTitle": "Structural Organisation in Animals",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 7,
    "essentialLaw": "\\text{Animal Tissues: Epithelial (Covering)} + \\text{Connective (Binding/Support)} + \\text{Muscular (Contraction)} + \\text{Neural (Impulse Conduction)}",
    "coreConcepts": [
      {
        "heading": "Epithelial, Connective, Muscular & Neural Tissues",
        "bullets": [
          "Epithelial Tissue: Simple Squamous (diffusion boundary, alveoli, blood vessels), Simple Cuboidal (secretion/absorption, renal tubules, brush border in PCT), Simple Columnar (lining of stomach/intestine with microvilli), Ciliated (moves particles, bronchioles, fallopian tubes); Cell Junctions (Tight junctions prevent leakage, Adhering junctions cement cells, Gap junctions facilitate ion/molecule communication).",
          "Connective Tissue: Loose (Areolar under skin, Adipose fat storage); Dense Regular (Tendons connect muscle to bone, Ligaments connect bone to bone); Dense Irregular (dermis of skin); Specialized (Cartilage with chondrocytes in lacunae, Bone with osteocytes in Haversian canal systems, Blood vascular tissue).",
          "Muscular Tissue: Skeletal (striated, voluntary, multinucleated syncytial fibers), Smooth (unstriated, involuntary, spindle-shaped uninucleated in gut/blood vessels), Cardiac (striated, involuntary, intercalated discs with gap junctions).",
          "Neural Tissue: Neurons (excitable units) and Neuroglia (supporting cells comprising $>50\\%$ neural volume)."
        ]
      },
      {
        "heading": "Morphology & Anatomy of Frog (Rana tigrina)",
        "bullets": [
          "External Morphology: Poikilothermic amphibian, moist mucus-covered skin for cutaneous respiration, tympanum receives sound, webbed hindlimbs for swimming, sexual dimorphism (male has vocal sacs and copulatory pad on first digit of forelimb).",
          "Digestive System: Short alimentary canal (carnivorous), bilobed tongue catches prey, digestion in stomach with $\\text{HCl}$ and pepsin; Liver secretes bile, pancreas secretes pancreatic juice; Undigested waste exits via cloaca.",
          "Circulatory & Respiratory: 3-chambered heart (2 atria, 1 ventricle) with Sinus Venosus and Conus Arteriosus; Cutaneous respiration in water, pulmonary respiration via lungs on land, buccal cavity respiration; Excretory system consists of mesonephric kidneys, ureters, urinary bladder, and cloaca (Ureotelic animal)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Tendons (dense regular connective tissue connecting MUSCLE to BONE) with Ligaments (connecting BONE to BONE).",
      "Mixing up epithelial locations: Simple Squamous is in lung alveoli; Brush-bordered cuboidal is in kidney PCT."
    ],
    "quickMentalCheck": "What special cell junctions in cardiac muscle allow the entire heart to contract synchronously as a functional syncytium? Intercalated discs with gap junctions.",
    "cueQuestions": [
      "How do tight junctions, adhering junctions, and gap junctions differ in structure and physiological function in epithelial sheets?",
      "What anatomical and histological features distinguish skeletal, smooth, and cardiac muscle fibers?",
      "How does a frog perform cutaneous respiration during aestivation and hibernation?"
    ],
    "workedExample": {
      "problem": "Classify the following animal tissues and give one specific organ location for each: (a) Stratified squamous epithelium, (b) Hyaline cartilage, (c) Dense regular connective tissue, (d) Ciliated columnar epithelium.",
      "steps": [
        "(a) Stratified Squamous Epithelium: Compound epithelial tissue with multiple protective cell layers. Location: Dry epidermis of skin, lining of oral cavity and esophagus.",
        "(b) Hyaline Cartilage: Specialized skeletal connective tissue with solid, pliable chondroitin sulfate matrix. Location: Tip of nose, trachea, larynx, and ends of long bones.",
        "(c) Dense Regular Connective Tissue: Connective tissue with parallel bundles of collagen fibers. Location: Tendons (muscle-to-bone) and Ligaments (bone-to-bone).",
        "(d) Ciliated Columnar Epithelium: Simple epithelial tissue bearing apical cilia. Location: Inner lining of Fallopian tubes (oviducts) and respiratory bronchioles."
      ],
      "result": "(a) \\text{Compound epithelium / Skin}; \\; (b) \\text{Specialized connective / Trachea}; \\; (c) \\text{Dense regular / Tendons}; \\; (d) \\text{Ciliated / Fallopian tube}"
    },
    "verificationProblem": "Check matrix type: Cartilage matrix is pliable and resists compression, whereas bone matrix is hard and non-pliable due to calcium hydroxyapatite salts. Verified.",
    "realWorldUse": "Histopathological cancer biopsy screening (detecting carcinoma epithelial breaches), tendon repair surgery in sports medicine, artificial skin graft bio-printing.",
    "diagramType": "epithelial-tissue-types-microscopy"
  },
  "CBSE-CH-G11-BIO-CH08": {
    "chapterTitle": "Cell: The Unit of Life",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 8,
    "essentialLaw": "\\text{Cell Theory (Schleiden, Schwann, Virchow)}: \\text{All living organisms are composed of cells} \\quad | \\quad \\text{Omnis cellula-e cellula} \\quad | \\quad \\text{Fluid Mosaic: Singer-Nicolson, 1972}",
    "coreConcepts": [
      {
        "heading": "Cell Theory, Prokaryotic vs Eukaryotic Architecture & Cell Membrane",
        "bullets": [
          "Cell Theory: Schleiden (plants) & Schwann (animals) proposed all organisms consist of cells; Rudolf Virchow ($1855$) added \"Omnis cellula-e cellula\" (cells arise from pre-existing cells).",
          "Prokaryotic Cell (Bacteria): Lacks membrane-bound organelles; Glycocalyx (capsule or slime layer), Peptidoglycan cell wall, Plasma membrane forming Mesosomes (respiration, DNA replication, secretion); Single circular DNA in nucleoid, non-genomic Plasmids (confer antibiotic resistance); $70S$ Ribosomes ($50S + 30S$).",
          "Fluid Mosaic Model of Plasma Membrane (Singer & Nicolson, 1972): Phospholipid bilayer with hydrophilic polar heads outward and hydrophobic non-polar fatty acid tails inward; Integral and peripheral proteins float quasi-fluidly; Membrane transport: Passive (diffusion, osmosis) vs Active ($Na^+/K^+$ ATPase pump using ATP)."
        ]
      },
      {
        "heading": "Endomembrane System, Semiautonomous Organelles & Cytoskeleton",
        "bullets": [
          "Endomembrane System (Coordinated Function): 1. Endoplasmic Reticulum (RER with ribosomes for protein synthesis; SER for lipid/steroid synthesis); 2. Golgi Apparatus (Camillo Golgi, cis-face convex forming face, trans-face concave maturing face, post-translational glycosylation of proteins and lipids); 3. Lysosomes (hydrolytic acid hydrolases active at acidic pH 5); 4. Vacuoles (enclosed by single tonoplast membrane transporting ions against concentration gradient).",
          "Semiautonomous Double-Membrane Organelles: Mitochondria (Cristae increase surface area, Matrix contains circular DNA, $70S$ ribosomes, Krebs enzymes; powerhouse generating ATP via oxidative phosphorylation); Chloroplasts (Thylakoids arranged in grana containing chlorophyll, stroma contains RuBisCO and circular DNA).",
          "Cytoskeleton & Motility: Microfilaments (actin), Intermediate filaments, Microtubules (tubulin); Cilia and Flagella have $9+2$ axoneme arrangement of doublet microtubules anchored at Basal Body ($9+0$ triplet centrosome centriole)."
        ]
      }
    ],
    "examTraps": [
      "Including Mitochondria, Chloroplasts, or Peroxisomes in the Endomembrane System (their functions are NOT coordinated with ER-Golgi-Lysosome pathway, so they are not part of endomembrane system).",
      "Confusing ribosome subunits: Prokaryotic $70S$ has $50S + 30S$; Eukaryotic $80S$ has $60S + 40S$."
    ],
    "quickMentalCheck": "Why are Mitochondria and Chloroplasts termed semiautonomous organelles? They possess their own circular double-stranded DNA genome, $70S$ ribosomes, and can synthesize some of their own proteins independently.",
    "cueQuestions": [
      "How does the Singer-Nicolson Fluid Mosaic Model explain the quasi-fluid nature and dynamic transport properties of biological membranes?",
      "Why are Endoplasmic Reticulum, Golgi apparatus, Lysosomes, and Vacuoles grouped together as the Endomembrane System?",
      "What structural arrangement of microtubules ($9+2$ vs $9+0$) distinguishes cilia/flagella axonemes from centrioles?"
    ],
    "workedExample": {
      "problem": "List the four components of the eukaryotic Endomembrane System and trace the sequential pathway of a glycoprotein hormone from synthesis to extracellular secretion.",
      "steps": [
        "Four components of Endomembrane System: Endoplasmic Reticulum (ER), Golgi Apparatus, Lysosomes, and Vacuoles.",
        "Step 1: Polypeptide chain is synthesized on ribosomes attached to the Rough Endoplasmic Reticulum (RER) and translocated into the RER lumen.",
        "Step 2: Protein undergoes initial folding and packaging into transport vesicles that bud from RER.",
        "Step 3: Transport vesicles fuse with the cis (forming) face of the Golgi apparatus.",
        "Step 4: Protein moves through Golgi cisternae, undergoing glycosylation (sugar addition) to form a mature glycoprotein.",
        "Step 5: Glycoprotein is packaged into secretory vesicles at the trans (maturing) face and fuses with the plasma membrane for exocytosis."
      ],
      "result": "\\text{RER (Synthesis)} \\to \\text{Transport Vesicle} \\to \\text{Golgi cis-to-trans (Glycosylation)} \\to \\text{Secretory Vesicle} \\to \\text{Exocytosis}"
    },
    "verificationProblem": "Check coordination criterion: Peroxisomes perform photorespiration/peroxide breakdown independently of Golgi traffic and are excluded from the endomembrane system. Verified.",
    "realWorldUse": "Liposomal drug delivery targeting cell membranes, targeting lysosomal storage diseases (e.g., Tay-Sachs disease), macrolide antibiotic targeting of bacterial $70S$ ribosomes.",
    "diagramType": "fluid-mosaic-membrane-singer-nicolson"
  },
  "CBSE-CH-G11-BIO-CH09": {
    "chapterTitle": "Biomolecules",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 9,
    "essentialLaw": "\\text{Enzyme Kinetics: } E + S \\rightleftharpoons ES \\to E + P \\quad | \\quad \\text{Michaelis-Menten: } v = \\frac{V_{\\text{max}}[S]}{K_m + [S]} \\quad | \\quad \\text{Competitive: } K_m \\uparrow, \\; V_{\\text{max}} \\text{ constant}",
    "coreConcepts": [
      {
        "heading": "Chemical Composition, Primary/Secondary Metabolites & Biomacromolecules",
        "bullets": [
          "Trichloroacetic Acid ($Cl_3CCOOH$) Analysis: Tissue grinding yields Acid-Soluble Pool (Filtrate: micro-molecules MW $<800\\text{ Da}$, amino acids, monosaccharides, nucleotides) and Acid-Insoluble Pool (Retentate: macro-molecules MW $>10,000\\text{ Da}$, proteins, polysaccharides, nucleic acids; Lipids have MW $<800\\text{ Da}$ but end up in retentate because they form insoluble membrane vesicles).",
          "Primary Metabolites (carbohydrates, proteins, lipids, nucleic acids with known physiological roles) vs Secondary Metabolites (Alkaloids: Morphine, Codeine; Terpenoids: Monoterpenes; Toxins: Abrin, Ricin; Lectins: Concanavalin A; Drugs: Vinblastine, Curcumin; Polymeric: Rubber, Gums, Cellulose).",
          "Proteins are heteropolymers of $\\alpha$-amino acids linked by peptide bonds ($-CO-NH-$); Collagen is the most abundant protein in animal world; RuBisCO is the most abundant protein in entire biosphere."
        ]
      },
      {
        "heading": "Enzyme Catalysis, Co-factors & Competitive Inhibition",
        "bullets": [
          "Enzyme Mechanism: Enzymes lower activation energy ($E_a$) without altering free energy change $\\Delta G$ or equilibrium constant $K_{eq}$; Formation of transient Enzyme-Substrate ($ES$) complex at active site.",
          "Factors Affecting Enzyme Activity: Temperature and pH (bell-shaped curves with sharp optimum), Substrate Concentration ($[S]$ reaches saturation plateau $V_{\\text{max}}$).",
          "Enzyme Inhibition: Competitive Inhibition (inhibitor closely resembles substrate structure, binds active site competitively, increases $K_m$ without changing $V_{\\text{max}}$, e.g., Malonate inhibits Succinate dehydrogenase); Non-competitive (inhibitor binds allosteric site, lowers $V_{\\text{max}}$, $K_m$ unchanged).",
          "Cofactors: Non-protein constituent essential for enzyme activity: 1. Prosthetic groups (tightly bound organic compound, e.g., Heme in peroxidase/catalase); 2. Coenzymes (transiently bound organic NAD/NADP derived from vitamins like Niacin); 3. Metal ions (form coordination bonds, e.g., $Zn^{2+}$ in Carbonic Anhydrase and Carboxypeptidase)."
        ]
      }
    ],
    "examTraps": [
      "Assuming lipids are true macromolecules (lipids have molecular weights under $800\\text{ Da}$ and are NOT polymers, but appear in the retentate because they form vesicular aggregates).",
      "Confusing competitive inhibition ($K_m$ increases, $V_{\\text{max}}$ constant) with non-competitive inhibition ($K_m$ unchanged, $V_{\\text{max}}$ decreases)."
    ],
    "quickMentalCheck": "What is the most abundant protein in the animal kingdom vs the whole biosphere? In animal world: Collagen; In the entire biosphere: RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase).",
    "cueQuestions": [
      "Why do lipids appear in the acid-insoluble macromolecular fraction even though their molecular weight is strictly below $800\\text{ Da}$?",
      "How does a competitive inhibitor like malonic acid alter the $K_m$ and $V_{\\text{max}}$ of succinic dehydrogenase?",
      "What are prosthetic groups, coenzymes, and metal ion cofactors, and how do they activate apoenzymes?"
    ],
    "workedExample": {
      "problem": "Explain how competitive inhibition of an enzyme can be reversed experimentally, and illustrate with the classic malonate-succinate dehydrogenase example.",
      "steps": [
        "1. In competitive inhibition, the inhibitor (Malonate) shares close structural resemblance with the natural substrate (Succinate) and competes for the same active site on the enzyme (Succinic Dehydrogenase).",
        "2. The binding of inhibitor is reversible: when inhibitor binds, enzyme forms inactive $EI$ complex instead of $ES$ complex, reducing initial reaction velocity.",
        "3. Experimental Reversal: Because substrate and inhibitor compete for the exact same active site, increasing substrate concentration ($[S]$) out-competes the inhibitor molecules for active site binding.",
        "4. At sufficiently high $[S]$, the enzyme reaches its original maximum velocity $V_{\\text{max}}$. Thus, competitive inhibition increases apparent $K_m$ while leaving $V_{\\text{max}}$ unaltered."
      ],
      "result": "\\text{Reversal: Increasing substrate concentration out-competes inhibitor} \\implies K_m \\uparrow, \\; V_{\\text{max}} \\text{ constant}"
    },
    "verificationProblem": "Check kinetics graph: Lineweaver-Burk double reciprocal plot rotates around y-intercept ($1/V_{\\text{max}}$ constant) while x-intercept ($-1/K_m$) moves closer to origin. Verified.",
    "realWorldUse": "Statin drugs competitively inhibiting HMG-CoA reductase to lower blood cholesterol, antibiotic sulfanilamide targeting bacterial folic acid synthesis.",
    "diagramType": "enzyme-activation-energy-inhibition-graph"
  },
  "CBSE-CH-G11-BIO-CH10": {
    "chapterTitle": "Cell Cycle and Cell Division",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 10,
    "essentialLaw": "\\text{Cell Cycle: } G_1 \\xrightarrow{\\text{Growth}} S \\; (\\text{DNA doubles: } 2C \\to 4C) \\xrightarrow{\\text{Prep}} G_2 \\xrightarrow{\\text{M-Phase}} \\text{Cytokinesis} \\quad | \\quad \\text{Meiosis I: Crossing Over at Pachytene}",
    "coreConcepts": [
      {
        "heading": "Cell Cycle Phases, Interphase & Mitosis (Equational Division)",
        "bullets": [
          "Interphase ($>95\\%$ cycle duration): 1. $G_1$ Phase (cell metabolically active, continuous growth, protein/RNA synthesis); 2. $S$ Phase (DNA Replication: DNA content doubles from $2C$ to $4C$, but chromosome number remains identical $2n$; Centriole duplicates in cytoplasm); 3. $G_2$ Phase (tubulin protein synthesis for spindle apparatus); 4. $G_0$ Quiescent stage (metabolically active non-dividing state, e.g., heart cells, neurons).",
          "Mitosis Stages: 1. Prophase (chromatin condensation, centrosomes move to opposite poles, nuclear envelope and nucleolus disappear); 2. Metaphase (chromosomes align at equatorial Metaphase Plate, spindle fibers attach to Kinetochores of centromere); 3. Anaphase (centromere splits, sister chromatids separate to opposite poles); 4. Telophase (chromosomes decondense, nuclear membrane reforms).",
          "Cytokinesis: Animal cells (cleavage furrow from periphery inward); Plant cells (cell plate formation from center outward via Phragmoplast)."
        ]
      },
      {
        "heading": "Meiosis (Reductional Division) & Five Stages of Prophase I",
        "bullets": [
          "Meiosis Significance: Reduces chromosome number by half ($2n \\to n$), generating haploid gametes and creating genetic variation via crossing over.",
          "Prophase I Five Sub-stages: 1. Leptotene (chromosomes become visible as long thin threads); 2. Zygotene (Homologous chromosomes pair up forming Synapsis via Synaptonemal Complex $\\to$ Bivalent/Tetrad); 3. Pachytene (Crossing over / genetic recombination between non-sister chromatids of homologous chromosomes mediated by Recombinase enzyme); 4. Diplotene (Dissolution of synaptonemal complex, homologous chromosomes separate except at X-shaped Chiasmata; oocyte arrest in dictyotene for years); 5. Diakinesis (Terminalization of chiasmata, spindle assembly complete).",
          "Meiosis I vs Meiosis II: Meiosis I separates homologous chromosome pairs (Reductional: $2n \\to n$); Meiosis II separates sister chromatids (Equational, similar to normal mitosis)."
        ]
      }
    ],
    "examTraps": [
      "Assuming chromosome number doubles during $S$ phase (DNA content doubles from $2C$ to $4C$, but chromosome number remains strictly $2n$).",
      "Confusing the exact sub-stage of crossing over (crossing over occurs at PACHYTENE, while chiasmata become visible at DIPLOTENE)."
    ],
    "quickMentalCheck": "If a diploid cell has $2n = 16$ chromosomes and $2C = 20\\text{ pg}$ DNA in $G_1$, what will be chromosome number and DNA content in $G_2$ and after Meiosis I? In $G_2$: 16 chromosomes, $40\\text{ pg}$ DNA; After Meiosis I: 8 chromosomes, $20\\text{ pg}$ DNA.",
    "cueQuestions": [
      "What molecular events distinguish the five sub-stages of Prophase I during Meiosis I?",
      "Why is $S$ phase characterized by DNA doubling without any increase in chromosome number?",
      "How does cytokinesis in plant cells differ mechanistically from animal cells?"
    ],
    "workedExample": {
      "problem": "A root tip cell of onion has 16 chromosomes ($2n=16$). How many chromosomes and chromatids will be present at: (a) $G_1$ phase, (b) $G_2$ phase, (c) Metaphase of mitosis, and (d) Anaphase of mitosis?",
      "steps": [
        "(a) $G_1$ Phase: Chromosome number $= 16$ (unreplicated single-chromatid chromosomes) $\\implies 16$ chromatids.",
        "(b) $G_2$ Phase: DNA has replicated during $S$ phase. Chromosome number remains $= 16$, but each chromosome now consists of 2 sister chromatids $\\implies 32$ chromatids.",
        "(c) Metaphase: Chromosomes aligned at equator. Chromosome number $= 16 \\implies 32$ chromatids.",
        "(d) Anaphase: Centromeres split and sister chromatids separate to become individual daughter chromosomes. Chromosome number temporarily doubles to $= 32$ chromosomes ($32$ chromatids)."
      ],
      "result": "(a) 16 ch / 16 chr, \\; (b) 16 ch / 32 chr, \\; (c) 16 ch / 32 chr, \\; (d) 32 ch / 32 chr"
    },
    "verificationProblem": "Check daughter cell split: Telophase divides 32 chromosomes into two identical daughter cells of 16 chromosomes each. Conservation of diploid number verified.",
    "realWorldUse": "Cancer chemotherapy anti-mitotic spindle poisons (Colchicine, Taxol, Vincristine), karyotyping amniocentesis chromosomal non-disjunction screens.",
    "diagramType": "cell-cycle-phases-meiosis-prophase1"
  },
  "CBSE-CH-G11-BIO-CH11": {
    "chapterTitle": "Photosynthesis in Higher Plants",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 11,
    "essentialLaw": "\\text{Z-Scheme: } 2\\text{H}_2\\text{O} \\xrightarrow{\\text{PS II (680)}} 4\\text{H}^+ + 4e^- + \\text{O}_2 \\xrightarrow{\\text{ETC}} \\text{PS I (700)} \\to \\text{NADPH} + \\text{ATP} \\quad | \\quad \\text{Calvin Cycle: } 6\\text{CO}_2 + 18\\text{ATP} + 12\\text{NADPH} \\to \\text{Glucose}",
    "coreConcepts": [
      {
        "heading": "Light Reactions, Photophosphorylation & Chemiosmosis",
        "bullets": [
          "Chloroplast Anatomy & Pigments: Thylakoid membranes contain Photosystems; Pigments: Chlorophyll a (reaction center), Chl b, Xanthophylls, Carotenoids (Light Harvesting Complex / antennae).",
          "Non-Cyclic Photophosphorylation (Z-Scheme): PS II ($P_{680}$) absorbs $680\\text{ nm}$ light; Photolysis of water on lumen side: $2\\text{H}_2\\text{O} \\to 4\\text{H}^+ + 4e^- + \\text{O}_2$; Electrons pass through Pheophytin $\\to$ Plastoquinone ($PQ$) $\\to$ Cytochrome $b_6f \\to$ Plastocyanin ($PC$) $\\to$ PS I ($P_{700}$) $\\to$ Ferredoxin $\\to$ Ferredoxin-NADP reductase ($FNR$), producing both ATP and NADPH.",
          "Cyclic Photophosphorylation: Operates only in stroma lamellae (lacks PS II and NADP reductase); PS I excites electrons cycling through Cytochrome $b_6f$ back to PS I, producing ATP only.",
          "Chemiosmotic Hypothesis (Peter Mitchell): Proton gradient across thylakoid membrane (high $[H^+]$ in lumen due to photolysis, $PQ$ proton pumping, and $NADP^+$ reduction in stroma); Protons diffuse back through $CF_0-CF_1$ ATP Synthase, synthesizing ATP from ADP + Pi."
        ]
      },
      {
        "heading": "$C_3$ Calvin Cycle, $C_4$ Hatch-Slack Pathway & Photorespiration",
        "bullets": [
          "$C_3$ Pathway (Calvin Cycle): Stroma; 1. Carboxylation: $\\text{RuBP} (5C) + \\text{CO}_2 \\xrightarrow{\\text{RuBisCO}} 2 \\times 3\\text{-PGA} (3C)$ (Primary carboxylation step); 2. Reduction: Consumes $2\\text{ ATP} + 2\\text{ NADPH}$ per $\\text{CO}_2$; 3. Regeneration of RuBP: Consumes $1\\text{ ATP}$. Net per Glucose ($6\\text{ CO}_2$): $18\\text{ ATP} + 12\\text{ NADPH}$.",
          "$C_4$ Pathway (Kranz Anatomy, Hatch & Slack): Spatial separation in Maize/Sugarcane; Mesophyll cells: $\\text{PEP} (3C) + \\text{CO}_2 \\xrightarrow{\\text{PEP Carboxylase}} \\text{OAA} (4C) \\to \\text{Malic acid}$; Bundle sheath cells: Malic acid decarboxylated to release $\\text{CO}_2$ directly to RuBisCO, completely eliminating photorespiration; High photosynthetic efficiency at high temperature/light.",
          "Photorespiration ($C_2$ Cycle): At high $O_2$ and high temperature, RuBisCO acts as oxygenase: $\\text{RuBP} + \\text{O}_2 \\to 3\\text{-PGA} + 2\\text{-Phosphoglycolate}$; Wasteful process consuming ATP without synthesizing sugar or ATP."
        ]
      }
    ],
    "examTraps": [
      "Assuming $C_4$ plants lack the Calvin cycle ($C_4$ plants operate the Calvin cycle exclusively in bundle sheath cells; $C_4$ Hatch-Slack is an added initial $\\text{CO}_2$-concentrating pump).",
      "Confusing the ATP cost: $C_3$ pathway consumes 18 ATP per glucose; $C_4$ pathway consumes 30 ATP per glucose (extra 12 ATP for PEP regeneration)."
    ],
    "quickMentalCheck": "How many molecules of ATP and NADPH are consumed to synthesize 1 molecule of glucose in $C_3$ vs $C_4$ plants? $C_3$ consumes $18\\text{ ATP} + 12\\text{ NADPH}$; $C_4$ consumes $30\\text{ ATP} + 12\\text{ NADPH}$.",
    "cueQuestions": [
      "How does the Peter Mitchell Chemiosmotic hypothesis explain ATP synthesis coupled to the thylakoid proton gradient?",
      "How does Kranz anatomy in $C_4$ plants enable high photosynthetic efficiency and completely prevent wasteful photorespiration?",
      "Why is RuBisCO called a dual-function enzyme and what determines whether it functions as carboxylase or oxygenase?"
    ],
    "workedExample": {
      "problem": "Trace the carboxylation and decarboxylation reactions in the mesophyll and bundle sheath cells of a $C_4$ plant (Maize) and calculate the net ATP required to fix $6\\text{ CO}_2$ molecules.",
      "steps": [
        "1. Mesophyll Cells: Primary $\\text{CO}_2$ acceptor is Phosphoenolpyruvate (PEP, $3C$). Enzyme PEP Carboxylase fixes $\\text{CO}_2$ into Oxaloacetic Acid (OAA, $4C$), reduced to Malate.",
        "2. Transport: Malate is transported via plasmodesmata into chloroplast-rich Bundle Sheath cells.",
        "3. Bundle Sheath Cells: Malate undergoes decarboxylation to produce Pyruvate ($3C$) and release high concentration of $\\text{CO}_2$. RuBisCO fixes this $\\text{CO}_2$ via the standard $C_3$ Calvin cycle.",
        "4. Pyruvate returns to mesophyll cells and is converted back to PEP, consuming 2 ATP per $\\text{CO}_2$ ($12\\text{ ATP}$ for $6\\text{ CO}_2$).",
        "5. Total ATP required: $18\\text{ ATP}$ (Calvin cycle) $+ 12\\text{ ATP}$ (PEP regeneration) $= 30\\text{ ATP}$ and $12\\text{ NADPH}$."
      ],
      "result": "6\\text{ CO}_2 + 30\\text{ ATP} + 12\\text{ NADPH} \\to \\text{Glucose} + 30\\text{ ADP} + 12\\text{ NADP}^+"
    },
    "verificationProblem": "Check photorespiration suppression: High bundle sheath $\\text{CO}_2$ saturates RuBisCO active sites, suppressing oxygenase activity. Zero photorespiration verified.",
    "realWorldUse": "Engineering $C_4$ photosynthetic pathways into $C_3$ rice crops (C4 Rice Project for $50\\%$ yield boost), greenhouse crop yield optimization using elevated $\\text{CO}_2$ fertilization.",
    "diagramType": "z-scheme-photophosphorylation-chemiosmosis"
  },
  "CBSE-CH-G11-BIO-CH12": {
    "chapterTitle": "Respiration in Plants",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 12,
    "essentialLaw": "\\text{Aerobic Respiration: } \\text{Glucose} \\xrightarrow{\\text{EMP (Cytosol)}} 2\\text{ Pyruvate} \\xrightarrow{\\text{Link (Matrix)}} 2\\text{ Acetyl-CoA} \\xrightarrow{\\text{TCA (Matrix)}} \\text{ETS/Chemiosmosis (Inner Mem)} \\implies 36-38\\text{ ATP}",
    "coreConcepts": [
      {
        "heading": "Glycolysis (EMP Pathway) & Anaerobic Fermentation",
        "bullets": [
          "Glycolysis (Embden-Meyerhof-Parnas Pathway): Occurs in cytoplasm of all living cells; 10-step anaerobic conversion: $\\text{Glucose} (6C) \\to 2 \\times \\text{Pyruvate} (3C)$.",
          "Key Steps: 1. Hexokinase phosphorylation ($1\\text{ ATP}$ used); 2. Phosphofructokinase (PFK, pacemaker enzyme, $1\\text{ ATP}$ used); 3. Cleavage into DHAP and PGAL ($3C$); 4. Oxidation of PGAL to 1,3-BPGA ($2\\text{ NADH}$ produced); 5. Substrate-level phosphorylation ($4\\text{ ATP}$ produced).",
          "Net Glycolysis Yield: $2\\text{ ATP} + 2\\text{ NADH} + 2\\text{ Pyruvate}$.",
          "Fermentation (Anaerobic): Lactic acid fermentation ($2\\text{ Pyruvate} + 2\\text{ NADH} \\xrightarrow{\\text{LDH}} 2\\text{ Lactic acid} + 2\\text{ NAD}^+$, in lactic bacteria and fatigued muscle); Alcoholic fermentation ($2\\text{ Pyruvate} \\xrightarrow{\\text{PDC}} 2\\text{ Acetaldehyde} + 2\\text{ CO}_2 \\xrightarrow{\\text{ADH}} 2\\text{ Ethanol} + 2\\text{ NAD}^+$, in yeast, max $13\\%$ alcohol before yeast self-poisoning)."
        ]
      },
      {
        "heading": "Krebs TCA Cycle, Electron Transport System (ETS) & Respiratory Quotient",
        "bullets": [
          "Link Reaction (Oxidative Decarboxylation): Mitochondrial matrix; $\\text{Pyruvate} + \\text{CoA} + \\text{NAD}^+ \\xrightarrow{\\text{Pyruvate Dehydrogenase}} \\text{Acetyl-CoA} + \\text{CO}_2 + \\text{NADH}$.",
          "Krebs Cycle (TCA Cycle, Hans Krebs): Mitochondrial matrix; Acetyl-CoA ($2C$) combines with Oxaloacetate ($4C$) $\\to$ Citrate ($6C$); Per turn of TCA cycle: $3\\text{ NADH} + 1\\text{ FADH}_2 + 1\\text{ GTP} (\\text{ATP}) + 2\\text{ CO}_2$.",
          "Electron Transport System (ETS): Inner mitochondrial membrane; 5 Multiprotein Complexes: I (NADH dehydrogenase), II (Succinate dehydrogenase), III (Cytochrome $bc_1$), IV (Cytochrome $c$ oxidase with cytochromes $a, a_3$ and 2 copper centers), V (ATP Synthase); Oxygen is final terminal electron acceptor forming $\\text{H}_2\\text{O}$; $1\\text{ NADH} \\to 3\\text{ ATP}, 1\\text{ FADH}_2 \\to 2\\text{ ATP}$.",
          "Respiratory Quotient ($RQ = \\frac{\\text{Volume of } \\text{CO}_2 \\text{ evolved}}{\\text{Volume of } \\text{O}_2 \\text{ consumed}}$): Carbohydrates ($RQ = 1.0$); Fats/Tripalmitin ($RQ = 0.7$); Proteins ($RQ = 0.9$); Organic acids ($RQ > 1.0$, malic acid $= 1.33$); Anaerobic ($RQ = \\infty$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming the Krebs cycle produces maximum ATP directly (Krebs cycle produces only 1 GTP per turn by substrate-level phosphorylation; bulk ATP is generated downstream by ETS oxidative phosphorylation).",
      "Confusing the cellular location of ETS complexes (ETS is located on the INNER mitochondrial membrane; Krebs cycle enzymes are in the MATRIX, except Complex II / succinate dehydrogenase which is bound to inner membrane)."
    ],
    "quickMentalCheck": "What is the Respiratory Quotient ($RQ$) of Tripalmitin fatty acid ($\\text{C}_{51}\\text{H}_{98}\\text{O}_6$)? $2\\text{C}_{51}\\text{H}_{98}\\text{O}_6 + 145\\text{O}_2 \\to 102\\text{CO}_2 + 98\\text{H}_2\\text{O} \\implies RQ = \\frac{102}{145} \\approx 0.70$.",
    "cueQuestions": [
      "How does the 10-step Glycolysis pathway achieve net gain of 2 ATP and 2 NADH without requiring molecular oxygen?",
      "Why is the Krebs cycle considered an amphibolic pathway rather than purely catabolic?",
      "What are the five enzyme complexes of the mitochondrial ETS and what is the role of terminal Cytochrome c Oxidase?"
    ],
    "workedExample": {
      "problem": "Calculate the total theoretical net yield of ATP from the complete aerobic oxidation of one molecule of glucose in a eukaryotic cell using the malate-aspartate shuttle.",
      "steps": [
        "1. Glycolysis (Cytosol): $2\\text{ ATP}$ (net substrate-level) $+ 2\\text{ NADH} \\times 3 = 6\\text{ ATP}$. Total $= 8\\text{ ATP}$.",
        "2. Link Reaction (2 Pyruvate $\\to$ 2 Acetyl-CoA in Matrix): $2\\text{ NADH} \\times 3 = 6\\text{ ATP}$.",
        "3. Krebs Cycle (2 turns for 2 Acetyl-CoA in Matrix): $2\\text{ GTP} = 2\\text{ ATP}$; $6\\text{ NADH} \\times 3 = 18\\text{ ATP}$; $2\\text{ FADH}_2 \\times 2 = 4\\text{ ATP}$. Total $= 24\\text{ ATP}$.",
        "4. Total Net ATP Yield: $8 + 6 + 24 = 38\\text{ ATP}$ (or $36\\text{ ATP}$ if glycerol-phosphate shuttle is used in muscle/brain)."
      ],
      "result": "\\text{Total Net Yield} = 38\\text{ ATP per Glucose Molecule (Theoretical Maximum)}"
    },
    "verificationProblem": "Check carbon balance: 1 Glucose ($6C$) $\\to$ 2 Pyruvate ($2 \\times 3C$) $\\to$ 2 Acetyl-CoA ($2 \\times 2C + 2\\text{CO}_2$) $\\to 4\\text{CO}_2$. All 6 carbons released as $6\\text{CO}_2$. Verified.",
    "realWorldUse": "Industrial alcohol brewing via Saccharomyces cerevisiae fermentation, cyanide poison mechanism (inhibits Cytochrome a3 in Complex IV), metabolic uncouplers in brown fat thermogenesis.",
    "diagramType": "mitochondrial-electron-transport-chain-complexes"
  },
  "CBSE-CH-G11-BIO-CH13": {
    "chapterTitle": "Plant Growth and Development",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 13,
    "essentialLaw": "\\text{Plant Hormones: Auxin (Apical Dominance)} + \\text{Gibberellin (Bolting/Stem)} + \\text{Cytokinin (Cell Division)} + \\text{Ethylene (Fruit Ripening)} + \\text{ABA (Stress/Stomata)}",
    "coreConcepts": [
      {
        "heading": "Plant Growth Phases, Differentiation & Plasticity",
        "bullets": [
          "Growth Characteristics: Indeterminate (open form of growth due to apical/lateral meristems); Measured by fresh weight, dry weight, surface area, cell number.",
          "Phases of Growth: Meristematic (rich protoplasm, thin cellulosic walls), Elongation (increased vacuolation, cell enlargement), Maturation (wall thickening, protoplasmic differentiation); Sigmoid growth curve ($W_1 = W_0 e^{rt}$).",
          "Differentiation, Dedifferentiation & Redifferentiation: Differentiation (parenchyma/tracheary loss of division capacity for specialization); Dedifferentiation (living differentiated parenchyma regains division capacity, e.g., interfascicular cambium, cork cambium); Redifferentiation (secondary tissues like secondary xylem/phloem and cork lose division capacity again).",
          "Plasticity: Plant follows different structural pathways in response to environment or life phases (Heterophylly in Cotton, Coriander, Larkspur vs Buttercup aquatic vs terrestrial leaves)."
        ]
      },
      {
        "heading": "Plant Growth Regulators (PGRs), Photoperiodism & Vernalization",
        "bullets": [
          "Auxins (IAA, IBA, synthetic NAA, 2,4-D): Apical dominance, root initiation in stem cuttings, parthenocarpy in tomatoes, 2,4-D selective dicot weedicide.",
          "Gibberellins ($GA_3$): Stem elongation, bolting in rosette plants (cabbage, beet) prior to flowering, malt production acceleration in brewing, delays senescence.",
          "Cytokinins (Zeatin, Kinetin): Promotes cytokinesis/cell division, overcomes apical dominance, delay of leaf senescence (Richmond-Lang effect), adventitious shoot initiation.",
          "Ethylene ($C_2H_4$, gaseous PGR): Fruit ripening (climacteric rise in respiration), breaks seed dormancy, induces triple response, Ethephon commercial formulation.",
          "Abscisic Acid (ABA, Stress Hormone): Induces stomatal closure during water stress, promotes seed dormancy and winter bud dormancy, general growth inhibitor.",
          "Photoperiodism: Response to day/night duration mediated by Florigen in leaves and Phytochrome pigment: Short Day Plants (Chrysanthemum, Tobacco), Long Day Plants (Wheat, Radish), Day Neutral Plants (Tomato, Pea); Vernalization: Promotion of flowering by low temperature treatment ($1-5^\\circ\\text{C}$)."
        ]
      }
    ],
    "examTraps": [
      "Confusing Auxin and Cytokinin tissue culture organogenesis ratio: High Auxin : Low Cytokinin induces ROOT differentiation; High Cytokinin : Low Auxin induces SHOOT differentiation.",
      "Assuming the flowering stimulus Florigen originates in shoot apices (Florigen is perceived and synthesized in LEAVES and translocated to shoot apex)."
    ],
    "quickMentalCheck": "Which synthetic auxin is widely sprayed by farmers as a selective weedicide to clear dicot weeds in cereal monocot grain fields? 2,4-D (2,4-Dichlorophenoxyacetic acid).",
    "cueQuestions": [
      "How does the antagonism between Auxin and Cytokinin regulate apical dominance vs lateral branch sprouting?",
      "Why is Abscisic Acid (ABA) designated as the universal plant stress hormone?",
      "How does low-temperature vernalization accelerate the flowering cycle in biennial crops like winter wheat?"
    ],
    "workedExample": {
      "problem": "Match the following plant physiological phenomena with their governing Plant Growth Regulator: (a) Bolting in cabbage, (b) Stomatal closure during drought, (c) Overcoming apical dominance, (d) Fruit ripening in bananas.",
      "steps": [
        "(a) Bolting in cabbage: Induced by Gibberellin ($GA_3$). Causes rapid internode elongation prior to flowering in rosette plants.",
        "(b) Stomatal closure during drought: Induced by Abscisic Acid (ABA, Stress hormone). Promotes potassium efflux from guard cells, closing stomatal pore.",
        "(c) Overcoming apical dominance: Promoted by Cytokinins (Zeatin/Kinetin). Stimulates lateral axillary bud sprouting in opposition to auxin apical dominance.",
        "(d) Fruit ripening in bananas: Triggered by Ethylene ($C_2H_4$). Gaseous hormone that induces respiratory climacteric, chlorophyll breakdown, and starch conversion to sugars."
      ],
      "result": "(a) \\text{Gibberellin}, \\; (b) \\text{Abscisic Acid}, \\; (c) \\text{Cytokinin}, \\; (d) \\text{Ethylene}"
    },
    "verificationProblem": "Check hormone interaction: Auxin and Gibberellin promote growth; ABA and Ethylene (mostly) inhibit growth. Dual antagonistic balance verified.",
    "realWorldUse": "Sugarcane stem elongation spraying with $GA_3$ increasing yield by 20 tonnes/acre, commercial fruit ripening chambers using Ethephon, weed-free lawn maintenance with 2,4-D.",
    "diagramType": "plant-hormones-action-summary-chart"
  },
  "CBSE-CH-G11-BIO-CH14": {
    "chapterTitle": "Breathing and Exchange of Gases",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 14,
    "essentialLaw": "\\text{Gas Exchange: } pO_2 \\; (\\text{Alveoli } 104 \\to \\text{Blood } 95 \\to \\text{Tissues } 40\\text{ mmHg}) \\quad | \\quad \\text{Bohr Effect: } \\text{High } pCO_2, \\; \\text{H}^+, \\; \\text{Temp} \\implies \\text{Right Shift}",
    "coreConcepts": [
      {
        "heading": "Respiratory Volumes, Pulmonary Capacities & Mechanism of Breathing",
        "bullets": [
          "Mechanism of Breathing: Inspiration (active: Diaphragm contracts flat + External intercostal muscles contract pulling ribs up/out $\\implies$ thoracic volume increases, intrapulmonary pressure drops below atmospheric $-1\\text{ mmHg}$); Expiration (passive: Diaphragm and intercostal muscles relax, lung recoil increases intrapulmonary pressure $+1\\text{ mmHg}$).",
          "Respiratory Volumes: Tidal Volume ($TV = 500\\text{ mL}$); Inspiratory Reserve Volume ($IRV = 2500-3000\\text{ mL}$); Expiratory Reserve Volume ($ERV = 1000-1100\\text{ mL}$); Residual Volume ($RV = 1100-1200\\text{ mL}$, volume remaining in lungs even after forcible expiration).",
          "Pulmonary Capacities: Inspiratory Capacity ($IC = TV + IRV$); Functional Residual Capacity ($FRC = ERV + RV$); Vital Capacity ($VC = ERV + TV + IRV = 3500-4500\\text{ mL}$); Total Lung Capacity ($TLC = VC + RV$)."
        ]
      },
      {
        "heading": "Gas Exchange, Oxygen-Haemoglobin Dissociation Curve & Disorders",
        "bullets": [
          "Alveolar Gas Diffusion Barrier (Three Layers, thickness $<1\\text{ mm}$): 1. Squamous epithelium of alveoli; 2. Endothelium of alveolar capillaries; 3. Basement substance; Diffusion capacity of $\\text{CO}_2$ is $20-25\\times$ higher than $\\text{O}_2$ due to higher solubility.",
          "Partial Pressures (mmHg): Alveoli ($pO_2 = 104, pCO_2 = 40$), Deoxygenated Blood ($pO_2 = 40, pCO_2 = 45$), Oxygenated Blood ($pO_2 = 95, pCO_2 = 40$), Tissues ($pO_2 = 40, pCO_2 = 45$).",
          "Oxygen Transport: $97\\%$ bound to Haemoglobin as Oxyhaemoglobin (each $Hb$ carries 4 $\\text{O}_2$ molecules; $100\\text{ mL}$ oxygenated blood delivers $\\approx 5\\text{ mL } \\text{O}_2$ to tissues); Oxygen-Hb Dissociation Curve is Sigmoid; Shifted to RIGHT (Bohr Effect: facilitated $\\text{O}_2$ unloading) by: high $pCO_2$, high $H^+$ (low pH), high temperature, 2,3-BPG.",
          "Carbon Dioxide Transport: $70\\%$ as Bicarbonate ions ($HCO_3^-$ via Carbonic Anhydrase in RBCs, Chloride shift), $23\\%$ as Carbaminohaemoglobin, $7\\%$ dissolved in plasma; $100\\text{ mL}$ deoxygenated blood delivers $\\approx 4\\text{ mL } \\text{CO}_2$ to alveoli.",
          "Respiratory Disorders: Asthma (allergic wheezing due to bronchiole inflammation); Emphysema (alveolar wall destruction, reduced surface area, caused by cigarette smoking); Occupational Respiratory Disorders (Silicosis, Asbestosis: lung fibrosis)."
        ]
      }
    ],
    "examTraps": [
      "Attempting to measure Residual Volume (RV) using a simple spirometer (RV, FRC, and TLC CANNOT be measured by spirometry because residual air is never exhaled).",
      "Confusing the delivery capacities: $100\\text{ mL}$ oxygenated blood delivers $5\\text{ mL } \\text{O}_2$, whereas $100\\text{ mL}$ deoxygenated blood delivers $4\\text{ mL } \\text{CO}_2$."
    ],
    "quickMentalCheck": "What happens to the Oxygen-Haemoglobin dissociation curve in skeletal muscle during strenuous exercise? Shifts to the RIGHT (due to high $pCO_2$, low pH from lactic acid, and elevated body temperature), releasing more $\\text{O}_2$ to muscle fibers.",
    "cueQuestions": [
      "How does the partial pressure gradient drive the passive diffusion of $\\text{O}_2$ and $\\text{CO}_2$ across the three-layered alveolar-capillary membrane?",
      "How does the enzyme Carbonic Anhydrase in RBCs mediate the transport of $70\\%$ of carbon dioxide as bicarbonate ions?",
      "Why does cigarette smoking cause emphysema and permanent loss of alveolar respiratory exchange surface area?"
    ],
    "workedExample": {
      "problem": "A person has a Tidal Volume of $500\\text{ mL}$, Inspiratory Reserve Volume of $2800\\text{ mL}$, Expiratory Reserve Volume of $1100\\text{ mL}$, and Residual Volume of $1200\\text{ mL}$. Calculate: (a) Vital Capacity ($VC$), (b) Functional Residual Capacity ($FRC$), and (c) Total Lung Capacity ($TLC$).",
      "steps": [
        "(a) Vital Capacity ($VC$): Maximum volume of air exhaled after deepest inspiration: $VC = ERV + TV + IRV = 1100 + 500 + 2800 = 4400\\text{ mL}$.",
        "(b) Functional Residual Capacity ($FRC$): Volume of air remaining in lungs after normal passive expiration: $FRC = ERV + RV = 1100 + 1200 = 2300\\text{ mL}$.",
        "(c) Total Lung Capacity ($TLC$): Total volume of air accommodated in lungs at end of maximal inspiration: $TLC = VC + RV = 4400 + 1200 = 5600\\text{ mL}$."
      ],
      "result": "VC = 4400\\text{ mL}, \\quad FRC = 2300\\text{ mL}, \\quad TLC = 5600\\text{ mL}"
    },
    "verificationProblem": "Check alternative TLC formula: $TLC = IRV + TV + ERV + RV = 2800 + 500 + 1100 + 1200 = 5600\\text{ mL}$. Exact match.",
    "realWorldUse": "Clinical spirometry for COPD asthma staging, carbon monoxide poisoning hyperbaric oxygen chamber therapy, mountain climber supplemental oxygen altitude calculation.",
    "diagramType": "oxygen-haemoglobin-dissociation-curve-bohr-effect"
  },
  "CBSE-CH-G11-BIO-CH15": {
    "chapterTitle": "Body Fluids and Circulation",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 15,
    "essentialLaw": "\\text{Cardiac Output} = \\text{Stroke Volume } (70\\text{ mL}) \\times \\text{Heart Rate } (72\\text{ bpm}) \\approx 5040\\text{ mL/min} \\approx 5.0\\text{ L/min} \\quad | \\quad \\text{Blood Pressure} = 120/80\\text{ mmHg}",
    "coreConcepts": [
      {
        "heading": "Blood Composition, ABO/Rh Groups & Blood Clotting Cascade",
        "bullets": [
          "Blood Composition: Plasma ($55\\%$, contains $6-8\\%$ proteins: Fibrinogen for clotting, Globulins for defense antibodies, Albumins for osmotic balance) + Formed Elements ($45\\%$: RBCs / Erythrocytes $5-5.5\\text{ million/mm}^3$; WBCs / Leucocytes $6000-8000\\text{ mm}^3$ comprising Neutrophils $60-65\\%$, Lymphocytes $20-25\\%$, Monocytes $6-8\\%$, Eosinophils $2-3\\%$, Basophils $0.5-1\\%$; Platelets / Thrombocytes $150,000-350,000\\text{ mm}^3$).",
          "Blood Groups & Rh Factor: ABO system based on $A$ and $B$ surface antigens; Universal donor ($O^-$ lacking all antigens), Universal recipient ($AB^+$); Erythroblastosis Foetalis: $Rh^-$ mother carrying $Rh^+$ fetus; second pregnancy triggers anti-Rh maternal antibodies destroying fetal RBCs (prevented by administering Anti-Rh antibodies / RhoGAM to mother immediately after first delivery).",
          "Blood Clotting Cascade: Injured tissue/platelets release Thromboplastin $\\to$ converts Prothrombin to active Thrombin via Thrombokinase ($Ca^{2+}$ required) $\\to$ Thrombin converts soluble Fibrinogen to insoluble Fibrin mesh trapping dead formed elements."
        ]
      },
      {
        "heading": "Human Cardiac Cycle, ECG & Double Circulation",
        "bullets": [
          "Conducting System: Sinoatrial Node (SAN, pacemaker in right atrium generating $70-75\\text{ action potentials/min}$) $\\to$ Atrioventricular Node (AVN) $\\to$ Bundle of His $\\to$ Purkinje fibers.",
          "Cardiac Cycle ($0.8\\text{ s}$ duration at $72\\text{ bpm}$): Joint Diastole ($0.4\\text{ s}$) $\\to$ Atrial Systole ($0.1\\text{ s}$, increases ventricular filling by $30\\%$) $\\to$ Ventricular Systole ($0.3\\text{ s}$, closes AV tricuspid/bicuspid valves producing \"LUBB\" sound; semilunar valves open, pumping Stroke Volume $SV = 70\\text{ mL}$) $\\to$ Ventricular Diastole (closes semilunar valves producing \"DUPP\" sound).",
          "Electrocardiogram (ECG): P wave (atrial depolarization), QRS complex (ventricular depolarization, marks onset of ventricular systole), T wave (ventricular repolarization).",
          "Circulation & Disorders: Double Circulation (Pulmonary + Systemic); Hepatic Portal System; Disorders: Hypertension ($>140/90\\text{ mmHg}$), Coronary Artery Disease (CAD / Atherosclerosis due to cholesterol plaque deposition), Angina Pectoris (acute chest pain from cardiac ischemia), Heart Failure (inadequate cardiac output)."
        ]
      }
    ],
    "examTraps": [
      "Assuming heart sounds Lubb and Dupp are caused by blood rushing through valves (heart sounds are caused by the SHARP CLOSURE of valves: Lubb by AV valves, Dupp by Semilunar valves).",
      "Confusing the universal donor ($O\\text{ negative}$, lacking A, B, and Rh antigens) with $O\\text{ positive}$."
    ],
    "quickMentalCheck": "If an athlete has a resting heart rate of $50\\text{ bpm}$ and a stroke volume of $100\\text{ mL}$, what is their cardiac output? $\\text{Cardiac Output} = 50 \\times 100 = 5000\\text{ mL/min} = 5.0\\text{ L/min}$.",
    "cueQuestions": [
      "Why is the Sinoatrial Node (SAN) designated as the natural physiological pacemaker of the human heart?",
      "How does the Rh incompatibility in Erythroblastosis Foetalis cause severe hemolytic anemia in a second $Rh^+$ newborn?",
      "What cardiac electrical events correspond to the P wave, QRS complex, and T wave of a clinical standard 12-lead ECG?"
    ],
    "workedExample": {
      "problem": "Calculate the total volume of blood pumped by the left ventricle in one hour in a healthy individual with a resting heart rate of 75 beats per minute and a stroke volume of 70 mL.",
      "steps": [
        "Calculate Cardiac Output per minute: $\\text{Cardiac Output} = \\text{Heart Rate} \\times \\text{Stroke Volume}$.",
        "$\\text{Cardiac Output} = 75\\text{ beats/min} \\times 70\\text{ mL/beat} = 5250\\text{ mL/min} = 5.25\\text{ L/min}$.",
        "Calculate volume pumped in one hour ($60\\text{ minutes}$): $\\text{Volume per hour} = 5.25\\text{ L/min} \\times 60\\text{ min} = 315\\text{ Litres}$."
      ],
      "result": "\\text{Total Blood Pumped per Hour} = 315\\text{ Litres}"
    },
    "verificationProblem": "Check 24-hour extrapolation: $315 \\times 24 = 7560\\text{ L/day} \\approx 7.5\\text{ tonnes}$ of blood pumped daily. Physiological cardiac power verified.",
    "realWorldUse": "Clinical 12-lead ECG interpretation for myocardial infarction STEMI localization, RhoGAM prophylaxis in obstetrics, cardiopulmonary bypass heart-lung machines.",
    "diagramType": "cardiac-cycle-ecg-pressure-volume-curve"
  },
  "CBSE-CH-G11-BIO-CH16": {
    "chapterTitle": "Excretory Products and their Elimination",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 16,
    "essentialLaw": "\\text{Urine Formation: Glomerular Filtration } (125\\text{ mL/min} = 180\\text{ L/day}) - \\text{Tubular Reabsorption } (99\\%) + \\text{Tubular Secretion} = 1.5\\text{ L/day Urine}",
    "coreConcepts": [
      {
        "heading": "Nitrogenous Wastes, Nephron Anatomy & Urine Formation",
        "bullets": [
          "Modes of Excretion: Ammonotelic (ammonia, highly toxic, requires large water, e.g., aquatic bony fishes, aquatic amphibians), Ureotelic (urea, less toxic, e.g., mammals, terrestrial amphibians, marine cartilaginous fishes), Uricotelic (uric acid paste, minimum water loss, e.g., reptiles, birds, insects, land snails).",
          "Nephron Structure: Cortical ($85\\%$, short loop of Henle) vs Juxtamedullary ($15\\%$, long loop of Henle extending deep into medulla, surrounded by Vasa Recta); Bowman Capsule + Glomerulus = Malpighian Body / Renal Corpuscle; Proximal Convoluted Tubule (PCT), Loop of Henle, Distal Convoluted Tubule (DCT), Collecting Duct.",
          "Three Steps of Urine Formation: 1. Glomerular Ultrafiltration: Driven by Net Filtration Pressure ($NFP = GHP - (BCOP + CHP) = 55 - (30 + 15) = 10\\text{ mmHg}$); Glomerular Filtration Rate ($GFR = 125\\text{ mL/min} = 180\\text{ L/day}$); 2. Tubular Reabsorption: $99\\%$ of filtrate reabsorbed; PCT reabsorbs $70-80\\%$ electrolytes and water, $100\\%$ glucose and amino acids (brush border); 3. Tubular Secretion: Active secretion of $H^+, K^+, NH_3$ into filtrate maintaining acid-base balance."
        ]
      },
      {
        "heading": "Counter-Current Mechanism & Hormonal Regulation of Kidney",
        "bullets": [
          "Counter-Current Multiplier (Loop of Henle & Vasa Recta): Flow of filtrate in two limbs of Henle loop is in opposite directions; Flow of blood in two limbs of Vasa Recta is also in opposite directions; Medullary interstitial hyperosmolarity increases from $300\\text{ mOsmol/L}$ in cortex to $1200\\text{ mOsmol/L}$ in inner medulla (maintained by $NaCl$ and Urea recycling), allowing concentrated urine formation ($4\\times$ concentrated: $1200\\text{ mOsmol/L}$).",
          "Hormonal Regulation: 1. Hypothalamus-ADH (Vasopressin): Released from posterior pituitary in response to high blood osmolarity; increases water reabsorption in DCT and collecting duct, preventing diuresis; 2. RAAS Mechanism (Renin-Angiotensin-Aldosterone System): Low GFR triggers Juxtaglomerular (JG) cells to secrete Renin $\\to$ converts Angiotensinogen to Angiotensin I $\\to$ Angiotensin II (potent vasoconstrictor) $\\to$ stimulates Adrenal Cortex to release Aldosterone (increases $Na^+$ and water reabsorption in DCT); 3. ANF (Atrial Natriuretic Factor): Secreted by heart atria in response to high blood pressure; causes vasodilation and $Na^+$ excretion, acting as a natural brake on RAAS.",
          "Disorders: Uremia (accumulation of urea in blood, treated by Hemodialysis); Renal calculi (kidney stones, insoluble calcium oxalate crystals); Glomerulonephritis (inflammation of glomeruli)."
        ]
      }
    ],
    "examTraps": [
      "Confusing the permeability of Henle loop limbs: Descending limb is permeable to WATER and impermeable to electrolytes; Ascending limb is permeable to ELECTROLYTES and completely impermeable to water.",
      "Thinking ANF elevates blood pressure (ANF is a VASODILATOR that LOWERS blood pressure, checking RAAS)."
    ],
    "quickMentalCheck": "What percentage of the $180\\text{ Litres}$ of glomerular filtrate produced daily is reabsorbed by the renal tubules? $99.2\\%$, leaving only $\\approx 1.5\\text{ Litres}$ excreted as urine.",
    "cueQuestions": [
      "How does the counter-current multiplier mechanism between Henle loop and vasa recta generate an osmotic gradient from 300 to 1200 mOsmol/L in the renal medulla?",
      "How does the Renin-Angiotensin-Aldosterone System (RAAS) restore GFR during hypotension or blood volume loss?",
      "Why is the descending limb of Henle loop permeable to water while the ascending limb is completely impermeable to water?"
    ],
    "workedExample": {
      "problem": "Calculate the Net Filtration Pressure (NFP) in the renal corpuscle given: Glomerular Hydrostatic Pressure ($GHP$) = $55\\text{ mmHg}$, Blood Colloid Osmotic Pressure ($BCOP$) = $30\\text{ mmHg}$, and Capsular Hydrostatic Pressure ($CHP$) = $15\\text{ mmHg}$.",
      "steps": [
        "Glomerular Hydrostatic Pressure ($GHP$): Forward filtration pressure pushing fluid into Bowman capsule $= 55\\text{ mmHg}$.",
        "Opposing pressures: Blood Colloid Osmotic Pressure ($BCOP = 30\\text{ mmHg}$) exerted by plasma proteins + Capsular Hydrostatic Pressure ($CHP = 15\\text{ mmHg}$) exerted by fluid in Bowman space.",
        "Net Filtration Pressure formula: $NFP = GHP - (BCOP + CHP)$.",
        "Calculate: $NFP = 55\\text{ mmHg} - (30 + 15)\\text{ mmHg} = 55 - 45 = +10\\text{ mmHg}$."
      ],
      "result": "NFP = +10\\text{ mmHg} \\; (\\text{Drives continuous ultrafiltration of 125 mL/min})"
    },
    "verificationProblem": "Check GFR coupling: A positive $NFP = +10\\text{ mmHg}$ drives filtration across the glomerular surface. If $NFP \\le 0$, ultrafiltration stops (anuria). Verified.",
    "realWorldUse": "Hemodialysis artificial kidney semipermeable dialyzing membrane clearance, ACE-inhibitor blood pressure medications blocking Angiotensin II synthesis, loop diuretics in heart failure.",
    "diagramType": "counter-current-multiplier-nephron-vasa-recta"
  },
  "CBSE-CH-G11-BIO-CH17": {
    "chapterTitle": "Locomotion and Movement",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 17,
    "essentialLaw": "\\text{Sliding Filament Theory: } \\text{Action Potential} \\to Ca^{2+} \\text{ release from Sarcoplasmic Reticulum} \\to \\text{Troponin binding} \\to \\text{Myosin head cross-bridge cycle} \\implies \\text{Sarcomere shortens}",
    "coreConcepts": [
      {
        "heading": "Structure of Contractile Proteins & Sliding Filament Mechanism",
        "bullets": [
          "Sarcomere (Functional Unit of Muscle Contraction): Segment between two successive $Z$-lines; $A$-band (anisotropic, dark, thick myosin filaments), $I$-band (isotropic, light, thin actin filaments bisected by $Z$-line), $H$-zone (central region of $A$-band not overlapped by actin, bisected by $M$-line).",
          "Contractile Proteins: 1. Actin (Thin filament): Two filamentous $F$-actin helices of $G$-actin monomers, two Tropomyosin helices, and complex Troponin trimers (Troponin C binds $Ca^{2+}$, masking myosin-binding sites on actin in resting state); 2. Myosin (Thick filament): Polymer of Meromyosin (Heavy Meromyosin / HMM head with actin-binding site and ATP-binding site + Light Meromyosin / LMM tail).",
          "Sliding Filament Mechanism (Huxley): Motor nerve impulse at neuromuscular junction releases Acetylcholine $\\to$ action potential spreads along sarcolemma $\\to$ Sarcoplasmic Reticulum releases $Ca^{2+} \\to Ca^{2+}$ binds Troponin C $\\to$ unmasks active sites on actin $\\to$ Myosin head hydrolyzes ATP ($ADP + Pi$), forms cross-bridge, and pulls actin filaments toward center of $A$-band (Power Stroke); $I$-band shortens, $H$-zone disappears, $A$-band length remains strictly constant."
        ]
      },
      {
        "heading": "Human Skeletal System, Joints & Musculoskeletal Disorders",
        "bullets": [
          "Human Skeleton (206 bones): Axial Skeleton (80 bones: Skull 22 + Hyoid 1 + Ear Ossicles 6 + Vertebral Column 26 [C7, T12, L5, Sacrum 1 fused, Coccyx 1 fused] + Sternum 1 + Ribs 24 [1-7 True vertebrosternal, 8-10 False vertebrochondral, 11-12 Floating]); Appendicular Skeleton (126 bones: Pectoral Girdle 4, Pelvic Girdle 2, Forelimbs 60, Hindlimbs 60).",
          "Joints: 1. Fibrous (immovable, sutures of skull); 2. Cartilaginous (limited movement, intervertebral discs, pubic symphysis); 3. Synovial (free movement, synovial fluid in cavity: Ball and Socket [shoulder/hip], Hinge [elbow/knee], Pivot [Atlas-Axis], Gliding [carpals], Saddle [between carpal and metacarpal of thumb]).",
          "Disorders: Myasthenia Gravis (autoimmune disorder attacking neuromuscular junction acetylcholine receptors, causing paralysis); Muscular Dystrophy (progressive genetic degeneration of skeletal muscle); Tetany (rapid wild muscle spasms due to low $Ca^{2+}$ in body fluids / hypocalcemia); Osteoarthritis & Rheumatoid Arthritis (inflammation of joints, rheumatoid factor attacks synovial membrane); Osteoporosis (age-related decrease in bone mass due to decreased estrogen); Gout (inflammation of joints due to accumulation of uric acid crystals)."
        ]
      }
    ],
    "examTraps": [
      "Stating that the A-band shortens during muscle contraction ($A$-band length NEVER changes; only the $I$-band shortens and $H$-zone disappears as actin slides over myosin).",
      "Confusing True ribs (pairs 1-7, attached directly to sternum) with False ribs (pairs 8-10, attached to 7th rib cartilage) and Floating ribs (pairs 11-12, unattached anteriorly)."
    ],
    "quickMentalCheck": "During muscle contraction, which bands or zones shorten? The $I$-band shortens and the $H$-zone narrows or disappears, while the $A$-band length remains completely unchanged.",
    "cueQuestions": [
      "How does the release of $Ca^{2+}$ from the sarcoplasmic reticulum trigger the cross-bridge cycle according to the Sliding Filament Theory?",
      "What are the structural components of the thin actin filament (F-actin, tropomyosin, troponin) and thick myosin filament (meromyosin)?",
      "How do synovial joints achieve friction-free articulation and what are the clinical hallmarks of rheumatoid arthritis vs gout?"
    ],
    "workedExample": {
      "problem": "Trace the molecular steps of a single cross-bridge cycle during skeletal muscle contraction from ATP hydrolysis to cross-bridge detachment.",
      "steps": [
        "1. Resting state: Myosin head binds ATP and hydrolyzes it to $ADP + Pi$, entering a high-energy \"cocked\" conformation.",
        "2. Cross-bridge formation: $Ca^{2+}$ released from sarcoplasmic reticulum binds Troponin C, shifting Tropomyosin and exposing active binding sites on actin. Myosin head binds to actin.",
        "3. Power Stroke: Myosin head pivots and bends, releasing $ADP + Pi$ and pulling the actin filament inward toward the center of the sarcomere ($M$-line).",
        "4. Cross-bridge detachment: A new molecule of ATP binds to the nucleotide-binding pocket on the Myosin head, causing the cross-bridge to detach from actin.",
        "5. If ATP is absent (e.g., after death), myosin heads remain permanently locked to actin, resulting in Rigor Mortis."
      ],
      "result": "\\text{ATP Hydrolysis} \\to \\text{Cross-Bridge Formation} \\to \\text{Power Stroke (Release of ADP+Pi)} \\to \\text{New ATP Binding (Detachment)}"
    },
    "verificationProblem": "Check Rigor Mortis etiology: Cellular ATP depletion halts detachment step 4, locking actin-myosin cross-bridges. Biochemical mechanism verified.",
    "realWorldUse": "Botulinum toxin (Botox) cosmetic and neuromuscular spasticity therapy (blocks ACh release), calcium-channel blocker cardiac therapies, osteoporosis DEXA bone density screening.",
    "diagramType": "sliding-filament-sarcomere-contraction"
  },
  "CBSE-CH-G11-BIO-CH18": {
    "chapterTitle": "Neural Control and Coordination",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 18,
    "essentialLaw": "\\text{Resting: } -70\\text{ mV } (3Na^+ \\text{ out} / 2K^+ \\text{ in}) \\xrightarrow{\\text{Stimulus}} Na^+ \\text{ Influx } (+30\\text{ mV Depolarization}) \\xrightarrow{K^+ \\text{ Efflux}} \\text{Repolarization}",
    "coreConcepts": [
      {
        "heading": "Neuron Structure, Action Potential Generation & Synaptic Transmission",
        "bullets": [
          "Neuron Anatomy: Cell body (Soma with Nissl granules), Dendrites (receive inputs), Axon (conducts action potential away from soma; Myelinated with Schwann cells and Nodes of Ranvier for saltatory conduction; Unmyelinated).",
          "Resting Membrane Potential ($-70\\text{ mV}$): Membrane is $20-30\\times$ more permeable to $K^+$ than $Na^+$, and impermeable to negative protein anions; $Na^+/K^+$ ATPase pump actively pumps $3\\text{ Na}^+$ OUT for every $2\\text{ K}^+$ pumped IN, consuming 1 ATP.",
          "Action Potential ($+30\\text{ mV}$, Nerve Impulse): Threshold stimulus opens voltage-gated $Na^+$ channels $\\to$ rapid $Na^+$ influx causes Depolarization (overshoot to $+30\\text{ mV}$); Inactivation of $Na^+$ channels and opening of voltage-gated $K^+$ channels causes $K^+$ efflux $\\to$ Repolarization $\\to$ Hyperpolarization; Refractory period enforces unidirectional conduction.",
          "Synaptic Transmission: Electrical synapse (gap junctions, direct current flow, ultra-fast) vs Chemical synapse (synaptic cleft $20\\text{ nm}$, action potential opens voltage-gated $Ca^{2+}$ channels $\\to Ca^{2+}$ triggers neurotransmitter Acetylcholine exocytosis $\\to$ binds post-synaptic receptors $\\to$ generates EPSP or IPSP)."
        ]
      },
      {
        "heading": "Central Nervous System (Human Brain Anatomy) & Reflex Arc",
        "bullets": [
          "Forebrain (Prosencephalon): 1. Cerebrum (divided into two cerebral hemispheres by longitudinal fissure, connected by thick white matter Corpus Callosum; Cerebral Cortex has gray matter with sensory, motor, and association areas for memory and communication); 2. Thalamus (major relay station for sensory and motor signals); 3. Hypothalamus (controls thermoregulation, hunger, thirst, circadian rhythms, and neurohormone secretion; Limbic system with Amygdala and Hippocampus governs emotion and memory).",
          "Midbrain (Mesencephalon): Corpora Quadrigemina (4 optic/auditory colliculi lobes) and Cerebral Aqueduct (aqueduct of Sylvius).",
          "Hindbrain (Rhombencephalon): 1. Cerebellum (convoluted surface for body balance and motor precision); 2. Pons (fiber tracts, pneumotaxic respiratory center); 3. Medulla Oblongata (cardiovascular reflex, respiration rhythm center, gastric secretions, vomiting).",
          "Brain Stem: Consists of Midbrain, Pons, and Medulla Oblongata; Connects brain to spinal cord.",
          "Reflex Arc: Monosynaptic/Polysynaptic involuntary pathway: Receptor $\\to$ Sensory/Afferent neuron $\\to$ Spinal cord interneuron $\\to$ Motor/Efferent neuron $\\to$ Effector muscle (e.g., knee-jerk reflex)."
        ]
      }
    ],
    "examTraps": [
      "Confusing the stoichiometry of the sodium-potassium pump ($Na^+/K^+$ ATPase pumps $3\\text{ Na}^+$ OUT and $2\\text{ K}^+$ IN per ATP, not 2 Na / 3 K).",
      "Thinking the Cerebellum is part of the Brain Stem (Brain Stem consists ONLY of Midbrain, Pons, and Medulla Oblongata; Cerebellum is excluded)."
    ],
    "quickMentalCheck": "What is the function of the Corpus Callosum in the human brain? A prominent tract of myelinated nerve fibers that bridges and coordinates communication between the left and right cerebral hemispheres.",
    "cueQuestions": [
      "How does the $Na^+/K^+$ ATPase pump and differential ion permeability establish the $-70\\text{ mV}$ resting membrane potential in neurons?",
      "How does an electrical synapse differ from a chemical synapse in terms of synaptic cleft distance and transmission velocity?",
      "What are the primary physiological centers located in the Medulla Oblongata (respiration, cardiac, gastric)?"
    ],
    "workedExample": {
      "problem": "Describe the sequence of ionic movements that occur across the axonal membrane during the generation of an Action Potential and subsequent Repolarization.",
      "steps": [
        "1. Resting State: Membrane polarized at $-70\\text{ mV}$; $Na^+/K^+$ pump maintains high $[K^+]$ inside and high $[Na^+]$ outside.",
        "2. Depolarization: A threshold stimulus (reaching $\\approx -55\\text{ mV}$) triggers the opening of voltage-gated $Na^+$ channels. $Na^+$ rushes rapidly down its electrochemical gradient into the axoplasm, reversing polarity from $-70\\text{ mV}$ to $+30\\text{ mV}$ (Action Potential / Spike).",
        "3. Repolarization: Within a millisecond, voltage-gated $Na^+$ channels close/inactivate, and voltage-gated $K^+$ channels open. $K^+$ flows rapidly OUT of the cell, restoring the negative interior potential.",
        "4. Hyperpolarization & Reset: Temporary overshoot causes hyperpolarization ($-80\\text{ mV}$) before $K^+$ channels close. The $Na^+/K^+$ ATPase pump restores resting baseline ion distributions."
      ],
      "result": "\\text{Resting } (-70\\text{ mV}) \\xrightarrow{Na^+ \\text{ Influx}} \\text{Depolarization } (+30\\text{ mV}) \\xrightarrow{K^+ \\text{ Efflux}} \\text{Repolarization } (-70\\text{ mV})"
    },
    "verificationProblem": "Check Nernst equilibrium potentials: $E_{Na} \\approx +60\\text{ mV}$ and $E_K \\approx -90\\text{ mV}$. Peak action potential ($+30\\text{ mV}$) moves toward $E_{Na}$; repolarization moves toward $E_K$. Verified.",
    "realWorldUse": "Local anesthetic nerve blocks (Lidocaine blocking voltage-gated $Na^+$ channels), EEG electroencephalography in epilepsy diagnostics, deep brain stimulation in Parkinson disease.",
    "diagramType": "action-potential-nerve-impulse-phases"
  },
  "CBSE-CH-G11-BIO-CH19": {
    "chapterTitle": "Chemical Coordination and Integration",
    "subject": "Biology",
    "grade": 11,
    "chapterNum": 19,
    "essentialLaw": "\\text{Hormone Signaling: Peptide / Catecholamine} \\to \\text{Membrane Receptor} \\to \\text{Secondary Messenger (cAMP, } IP_3, \\; Ca^{2+}) \\quad | \\quad \\text{Steroid / Thyroid} \\to \\text{Nuclear Gene Expression}",
    "coreConcepts": [
      {
        "heading": "Endocrine Glands, Hypothalamic-Pituitary Axis & Major Hormones",
        "bullets": [
          "Endocrine Glands (Ductless glands secreting hormones directly into blood): Hypothalamus (Releasing hormones like GnRH, TRH, CRH and Inhibiting hormones like Somatostatin).",
          "Pituitary Gland (Hypophysis): 1. Adenohypophysis (Anterior Pituitary: GH, PRL, TSH, ACTH, LH, FSH; Intermediate lobe: MSH); 2. Neurohypophysis (Posterior Pituitary / Pars Nervosa: Stores and releases Oxytocin for uterine contractions/milk ejection and Vasopressin / ADH for water reabsorption, both synthesized in hypothalamus).",
          "Thyroid Gland: Follicles synthesize $T_4$ (Thyroxine) and $T_3$ (Triiodothyronine) using Iodine; Regulate Basal Metabolic Rate (BMR), erythropoiesis, carbohydrate/fat metabolism; Parafollicular C-cells secrete Thyrocalcitonin (TCT, hypocalcemic hormone that lowers blood $Ca^{2+}$).",
          "Parathyroid Glands: Secrete Parathyroid Hormone (PTH / Collip hormone, hypercalcemic hormone that raises blood $Ca^{2+}$ by bone resorption, renal reabsorption, and intestinal absorption; TCT and PTH act antagonistically to maintain $Ca^{2+}$ homeostasis)."
        ]
      },
      {
        "heading": "Adrenal, Pancreas, Gonads & Hormone Action Mechanism",
        "bullets": [
          "Adrenal Glands: 1. Adrenal Medulla: Secretes Catecholamines (Adrenaline / Epinephrine and Noradrenaline, \"Fight or Flight\" emergency hormones increasing heart rate, alertness, glycogenolysis); 2. Adrenal Cortex: Zona Glomerulosa (Mineralocorticoids: Aldosterone for $Na^+$ balance), Zona Fasciculata (Glucocorticoids: Cortisol for gluconeogenesis, anti-inflammatory, immunosuppression), Zona Reticularis (Sex corticoids / Androgens).",
          "Pancreas (Islets of Langerhans): $\\alpha$-cells secrete Glucagon (hyperglycemic, stimulates glycogenolysis and gluconeogenesis); $\\beta$-cells secrete Insulin (hypoglycemic, stimulates cellular glucose uptake and glycogenesis); Diabetes Mellitus (insulin deficiency, hyperglycemia, glycosuria, ketonuria).",
          "Gonads: Testes (Leydig cells secrete Testosterone); Ovaries (Follicles secrete Estrogen for secondary sexual characters; Corpus Luteum secretes Progesterone for pregnancy maintenance).",
          "Mechanism of Hormone Action: 1. Water-soluble hormones (Proteins, Peptides, Amines: Insulin, Glucagon, Pituitary hormones, Epinephrine) bind extracellular membrane receptors, generating second messengers ($cAMP, IP_3, Ca^{2+}$) to amplify intracellular cascades; 2. Lipid-soluble hormones (Steroids: Estrogen, Progesterone, Testosterone, Cortisol; Thyroid hormones) cross lipid bilayer and bind intracellular nuclear receptors to regulate gene expression directly."
        ]
      }
    ],
    "examTraps": [
      "Assuming posterior pituitary hormones (Oxytocin and ADH) are synthesized by the pituitary gland (they are SYNTHESIZED in the Hypothalamus and only stored/released by posterior pituitary).",
      "Confusing the blood calcium regulation: Parathyroid Hormone (PTH) INCREASES blood $Ca^{2+}$, while Calcitonin (TCT) DECREASES blood $Ca^{2+}$."
    ],
    "quickMentalCheck": "Which hormone mechanism utilizes secondary messengers like cyclic AMP ($cAMP$) and $IP_3$? Water-soluble peptide, protein, and catecholamine hormones that cannot cross the hydrophobic lipid plasma membrane.",
    "cueQuestions": [
      "How do Parathyroid Hormone (PTH) and Thyrocalcitonin (TCT) act antagonistically to maintain tight calcium homeostasis in human blood?",
      "What are the physiological differences in the mechanisms of action between water-soluble peptide hormones and lipid-soluble steroid hormones?",
      "How does the sympathetic-adrenal medulla axis coordinate the emergency \"Fight or Flight\" response during acute stress?"
    ],
    "workedExample": {
      "problem": "Contrast the molecular mechanisms of action of Epinephrine (Adrenaline) versus Estrogen on their respective target cells.",
      "steps": [
        "1. Epinephrine (Water-soluble Catecholamine): Cannot cross the hydrophobic plasma membrane bilayer.",
        "- Binds to specific cell-surface $\\beta$-adrenergic receptors on the target cell membrane.",
        "- Activates membrane-bound G-protein, stimulating Adenylyl Cyclase to convert ATP into secondary messenger cyclic AMP ($cAMP$).",
        "- $cAMP$ activates Protein Kinase A cascade, triggering rapid glycogenolysis within seconds.",
        "2. Estrogen (Lipid-soluble Steroid Hormone): Readily diffuses across the lipid plasma membrane.",
        "- Binds to an intracellular nuclear receptor forming a Hormone-Receptor Complex.",
        "- The complex binds to specific Hormone Response Elements (HRE) on DNA chromatin in the nucleus.",
        "- Directly regulates transcription of mRNA and protein synthesis, exerting long-term developmental changes over hours or days."
      ],
      "result": "\\text{Epinephrine: Membrane receptor} \\to cAMP \\text{ second messenger (Fast)}; \\quad \\text{Estrogen: Intracellular nuclear receptor} \\to \\text{Gene transcription (Slow)}"
    },
    "verificationProblem": "Check solubility principle: Hydrophilic peptides use 2nd messengers; lipophilic steroids alter gene transcription directly. Classification verified.",
    "realWorldUse": "Insulin analog pens for Type 1 diabetes glycemic management, synthetic corticosteroid (Dexamethasone) immunosuppression, levothyroxine therapy for Hashimoto hypothyroidism.",
    "diagramType": "peptide-vs-steroid-hormone-signaling-pathways"
  },
  "CBSE-CH-G11-CS-CH01": {
    "chapterTitle": "Computer System Overview",
    "subject": "Computer Science",
    "grade": 11,
    "chapterNum": 1,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Computer System Overview: Data Structures & Syntax",
        "bullets": [
          "Formal Python syntax rules, variable mutability (immutable: int, str, tuple; mutable: list, dict, set).",
          "NCERT statutory function signatures, parameter passing mechanisms (pass-by-object-reference).",
          "Standard exception handling and algorithmic execution flow."
        ]
      },
      {
        "heading": "Algorithmic Logic & Memory Management",
        "bullets": [
          "Scope resolution using the LEGB rule (Local, Enclosing, Global, Built-in).",
          "File I/O operations with context managers and serialization methods.",
          "Linear vs binary search algorithms and stack operations (PUSH/POP using list)."
        ]
      }
    ],
    "examTraps": [
      "Modifying a list while iterating directly over it using a `for` loop.",
      "Confusing file modes `'w'` (truncates file to zero) with `'a'` (appends to end)."
    ],
    "quickMentalCheck": "What is the output of `len({1, 1.0, '1'})` in Python? (Output: `2` because `1 == 1.0` in set hashing).",
    "cueQuestions": [
      "How does Python manage memory and scoping for Computer System Overview?",
      "What is the asymptotic time complexity of standard operations in this module?",
      "How do you properly handle file exceptions and edge cases in CBSE CS exams?"
    ],
    "workedExample": {
      "problem": "Write a Python function to implement the PUSH and POP operations for a linear Stack using lists.",
      "steps": [
        "Define stack as empty list: `stk = []`.",
        "Implement PUSH: `def push(stk, item): stk.append(item)`.",
        "Implement POP with underflow check: `def pop(stk): return stk.pop() if stk else 'Underflow'`."
      ],
      "result": "Valid LIFO Stack implementation passing all CBSE Board criteria."
    },
    "verificationProblem": "Dry run with inputs [10, 20], call pop() twice, verify stack reaches underflow state without crashing.",
    "realWorldUse": "Used in browser undo/redo history, recursion call stacks, database transaction logs, and web servers.",
    "diagramType": "stack-memory-layout"
  },
  "CBSE-CH-G11-CS-CH02": {
    "chapterTitle": "Data Representation",
    "subject": "Computer Science",
    "grade": 11,
    "chapterNum": 2,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Data Representation: Data Structures & Syntax",
        "bullets": [
          "Formal Python syntax rules, variable mutability (immutable: int, str, tuple; mutable: list, dict, set).",
          "NCERT statutory function signatures, parameter passing mechanisms (pass-by-object-reference).",
          "Standard exception handling and algorithmic execution flow."
        ]
      },
      {
        "heading": "Algorithmic Logic & Memory Management",
        "bullets": [
          "Scope resolution using the LEGB rule (Local, Enclosing, Global, Built-in).",
          "File I/O operations with context managers and serialization methods.",
          "Linear vs binary search algorithms and stack operations (PUSH/POP using list)."
        ]
      }
    ],
    "examTraps": [
      "Modifying a list while iterating directly over it using a `for` loop.",
      "Confusing file modes `'w'` (truncates file to zero) with `'a'` (appends to end)."
    ],
    "quickMentalCheck": "What is the output of `len({1, 1.0, '1'})` in Python? (Output: `2` because `1 == 1.0` in set hashing).",
    "cueQuestions": [
      "How does Python manage memory and scoping for Data Representation?",
      "What is the asymptotic time complexity of standard operations in this module?",
      "How do you properly handle file exceptions and edge cases in CBSE CS exams?"
    ],
    "workedExample": {
      "problem": "Write a Python function to implement the PUSH and POP operations for a linear Stack using lists.",
      "steps": [
        "Define stack as empty list: `stk = []`.",
        "Implement PUSH: `def push(stk, item): stk.append(item)`.",
        "Implement POP with underflow check: `def pop(stk): return stk.pop() if stk else 'Underflow'`."
      ],
      "result": "Valid LIFO Stack implementation passing all CBSE Board criteria."
    },
    "verificationProblem": "Dry run with inputs [10, 20], call pop() twice, verify stack reaches underflow state without crashing.",
    "realWorldUse": "Used in browser undo/redo history, recursion call stacks, database transaction logs, and web servers.",
    "diagramType": "stack-memory-layout"
  },
  "CBSE-CH-G11-CS-CH03": {
    "chapterTitle": "Boolean Logic",
    "subject": "Computer Science",
    "grade": 11,
    "chapterNum": 3,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Boolean Logic: Data Structures & Syntax",
        "bullets": [
          "Formal Python syntax rules, variable mutability (immutable: int, str, tuple; mutable: list, dict, set).",
          "NCERT statutory function signatures, parameter passing mechanisms (pass-by-object-reference).",
          "Standard exception handling and algorithmic execution flow."
        ]
      },
      {
        "heading": "Algorithmic Logic & Memory Management",
        "bullets": [
          "Scope resolution using the LEGB rule (Local, Enclosing, Global, Built-in).",
          "File I/O operations with context managers and serialization methods.",
          "Linear vs binary search algorithms and stack operations (PUSH/POP using list)."
        ]
      }
    ],
    "examTraps": [
      "Modifying a list while iterating directly over it using a `for` loop.",
      "Confusing file modes `'w'` (truncates file to zero) with `'a'` (appends to end)."
    ],
    "quickMentalCheck": "What is the output of `len({1, 1.0, '1'})` in Python? (Output: `2` because `1 == 1.0` in set hashing).",
    "cueQuestions": [
      "How does Python manage memory and scoping for Boolean Logic?",
      "What is the asymptotic time complexity of standard operations in this module?",
      "How do you properly handle file exceptions and edge cases in CBSE CS exams?"
    ],
    "workedExample": {
      "problem": "Write a Python function to implement the PUSH and POP operations for a linear Stack using lists.",
      "steps": [
        "Define stack as empty list: `stk = []`.",
        "Implement PUSH: `def push(stk, item): stk.append(item)`.",
        "Implement POP with underflow check: `def pop(stk): return stk.pop() if stk else 'Underflow'`."
      ],
      "result": "Valid LIFO Stack implementation passing all CBSE Board criteria."
    },
    "verificationProblem": "Dry run with inputs [10, 20], call pop() twice, verify stack reaches underflow state without crashing.",
    "realWorldUse": "Used in browser undo/redo history, recursion call stacks, database transaction logs, and web servers.",
    "diagramType": "stack-memory-layout"
  },
  "CBSE-CH-G11-CS-CH04": {
    "chapterTitle": "Introduction to Problem Solving",
    "subject": "Computer Science",
    "grade": 11,
    "chapterNum": 4,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Introduction to Problem Solving: Data Structures & Syntax",
        "bullets": [
          "Formal Python syntax rules, variable mutability (immutable: int, str, tuple; mutable: list, dict, set).",
          "NCERT statutory function signatures, parameter passing mechanisms (pass-by-object-reference).",
          "Standard exception handling and algorithmic execution flow."
        ]
      },
      {
        "heading": "Algorithmic Logic & Memory Management",
        "bullets": [
          "Scope resolution using the LEGB rule (Local, Enclosing, Global, Built-in).",
          "File I/O operations with context managers and serialization methods.",
          "Linear vs binary search algorithms and stack operations (PUSH/POP using list)."
        ]
      }
    ],
    "examTraps": [
      "Modifying a list while iterating directly over it using a `for` loop.",
      "Confusing file modes `'w'` (truncates file to zero) with `'a'` (appends to end)."
    ],
    "quickMentalCheck": "What is the output of `len({1, 1.0, '1'})` in Python? (Output: `2` because `1 == 1.0` in set hashing).",
    "cueQuestions": [
      "How does Python manage memory and scoping for Introduction to Problem Solving?",
      "What is the asymptotic time complexity of standard operations in this module?",
      "How do you properly handle file exceptions and edge cases in CBSE CS exams?"
    ],
    "workedExample": {
      "problem": "Write a Python function to implement the PUSH and POP operations for a linear Stack using lists.",
      "steps": [
        "Define stack as empty list: `stk = []`.",
        "Implement PUSH: `def push(stk, item): stk.append(item)`.",
        "Implement POP with underflow check: `def pop(stk): return stk.pop() if stk else 'Underflow'`."
      ],
      "result": "Valid LIFO Stack implementation passing all CBSE Board criteria."
    },
    "verificationProblem": "Dry run with inputs [10, 20], call pop() twice, verify stack reaches underflow state without crashing.",
    "realWorldUse": "Used in browser undo/redo history, recursion call stacks, database transaction logs, and web servers.",
    "diagramType": "stack-memory-layout"
  },
  "CBSE-CH-G11-CS-CH05": {
    "chapterTitle": "Getting Started with Python",
    "subject": "Computer Science",
    "grade": 11,
    "chapterNum": 5,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Getting Started with Python: Data Structures & Syntax",
        "bullets": [
          "Formal Python syntax rules, variable mutability (immutable: int, str, tuple; mutable: list, dict, set).",
          "NCERT statutory function signatures, parameter passing mechanisms (pass-by-object-reference).",
          "Standard exception handling and algorithmic execution flow."
        ]
      },
      {
        "heading": "Algorithmic Logic & Memory Management",
        "bullets": [
          "Scope resolution using the LEGB rule (Local, Enclosing, Global, Built-in).",
          "File I/O operations with context managers and serialization methods.",
          "Linear vs binary search algorithms and stack operations (PUSH/POP using list)."
        ]
      }
    ],
    "examTraps": [
      "Modifying a list while iterating directly over it using a `for` loop.",
      "Confusing file modes `'w'` (truncates file to zero) with `'a'` (appends to end)."
    ],
    "quickMentalCheck": "What is the output of `len({1, 1.0, '1'})` in Python? (Output: `2` because `1 == 1.0` in set hashing).",
    "cueQuestions": [
      "How does Python manage memory and scoping for Getting Started with Python?",
      "What is the asymptotic time complexity of standard operations in this module?",
      "How do you properly handle file exceptions and edge cases in CBSE CS exams?"
    ],
    "workedExample": {
      "problem": "Write a Python function to implement the PUSH and POP operations for a linear Stack using lists.",
      "steps": [
        "Define stack as empty list: `stk = []`.",
        "Implement PUSH: `def push(stk, item): stk.append(item)`.",
        "Implement POP with underflow check: `def pop(stk): return stk.pop() if stk else 'Underflow'`."
      ],
      "result": "Valid LIFO Stack implementation passing all CBSE Board criteria."
    },
    "verificationProblem": "Dry run with inputs [10, 20], call pop() twice, verify stack reaches underflow state without crashing.",
    "realWorldUse": "Used in browser undo/redo history, recursion call stacks, database transaction logs, and web servers.",
    "diagramType": "stack-memory-layout"
  },
  "CBSE-CH-G11-CS-CH06": {
    "chapterTitle": "Python Fundamentals",
    "subject": "Computer Science",
    "grade": 11,
    "chapterNum": 6,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Python Fundamentals: Data Structures & Syntax",
        "bullets": [
          "Formal Python syntax rules, variable mutability (immutable: int, str, tuple; mutable: list, dict, set).",
          "NCERT statutory function signatures, parameter passing mechanisms (pass-by-object-reference).",
          "Standard exception handling and algorithmic execution flow."
        ]
      },
      {
        "heading": "Algorithmic Logic & Memory Management",
        "bullets": [
          "Scope resolution using the LEGB rule (Local, Enclosing, Global, Built-in).",
          "File I/O operations with context managers and serialization methods.",
          "Linear vs binary search algorithms and stack operations (PUSH/POP using list)."
        ]
      }
    ],
    "examTraps": [
      "Modifying a list while iterating directly over it using a `for` loop.",
      "Confusing file modes `'w'` (truncates file to zero) with `'a'` (appends to end)."
    ],
    "quickMentalCheck": "What is the output of `len({1, 1.0, '1'})` in Python? (Output: `2` because `1 == 1.0` in set hashing).",
    "cueQuestions": [
      "How does Python manage memory and scoping for Python Fundamentals?",
      "What is the asymptotic time complexity of standard operations in this module?",
      "How do you properly handle file exceptions and edge cases in CBSE CS exams?"
    ],
    "workedExample": {
      "problem": "Write a Python function to implement the PUSH and POP operations for a linear Stack using lists.",
      "steps": [
        "Define stack as empty list: `stk = []`.",
        "Implement PUSH: `def push(stk, item): stk.append(item)`.",
        "Implement POP with underflow check: `def pop(stk): return stk.pop() if stk else 'Underflow'`."
      ],
      "result": "Valid LIFO Stack implementation passing all CBSE Board criteria."
    },
    "verificationProblem": "Dry run with inputs [10, 20], call pop() twice, verify stack reaches underflow state without crashing.",
    "realWorldUse": "Used in browser undo/redo history, recursion call stacks, database transaction logs, and web servers.",
    "diagramType": "stack-memory-layout"
  },
  "CBSE-CH-G11-CS-CH07": {
    "chapterTitle": "Data Handling",
    "subject": "Computer Science",
    "grade": 11,
    "chapterNum": 7,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Data Handling: Data Structures & Syntax",
        "bullets": [
          "Formal Python syntax rules, variable mutability (immutable: int, str, tuple; mutable: list, dict, set).",
          "NCERT statutory function signatures, parameter passing mechanisms (pass-by-object-reference).",
          "Standard exception handling and algorithmic execution flow."
        ]
      },
      {
        "heading": "Algorithmic Logic & Memory Management",
        "bullets": [
          "Scope resolution using the LEGB rule (Local, Enclosing, Global, Built-in).",
          "File I/O operations with context managers and serialization methods.",
          "Linear vs binary search algorithms and stack operations (PUSH/POP using list)."
        ]
      }
    ],
    "examTraps": [
      "Modifying a list while iterating directly over it using a `for` loop.",
      "Confusing file modes `'w'` (truncates file to zero) with `'a'` (appends to end)."
    ],
    "quickMentalCheck": "What is the output of `len({1, 1.0, '1'})` in Python? (Output: `2` because `1 == 1.0` in set hashing).",
    "cueQuestions": [
      "How does Python manage memory and scoping for Data Handling?",
      "What is the asymptotic time complexity of standard operations in this module?",
      "How do you properly handle file exceptions and edge cases in CBSE CS exams?"
    ],
    "workedExample": {
      "problem": "Write a Python function to implement the PUSH and POP operations for a linear Stack using lists.",
      "steps": [
        "Define stack as empty list: `stk = []`.",
        "Implement PUSH: `def push(stk, item): stk.append(item)`.",
        "Implement POP with underflow check: `def pop(stk): return stk.pop() if stk else 'Underflow'`."
      ],
      "result": "Valid LIFO Stack implementation passing all CBSE Board criteria."
    },
    "verificationProblem": "Dry run with inputs [10, 20], call pop() twice, verify stack reaches underflow state without crashing.",
    "realWorldUse": "Used in browser undo/redo history, recursion call stacks, database transaction logs, and web servers.",
    "diagramType": "stack-memory-layout"
  },
  "CBSE-CH-G11-CS-CH08": {
    "chapterTitle": "Flow of Control",
    "subject": "Computer Science",
    "grade": 11,
    "chapterNum": 8,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Flow of Control: Data Structures & Syntax",
        "bullets": [
          "Formal Python syntax rules, variable mutability (immutable: int, str, tuple; mutable: list, dict, set).",
          "NCERT statutory function signatures, parameter passing mechanisms (pass-by-object-reference).",
          "Standard exception handling and algorithmic execution flow."
        ]
      },
      {
        "heading": "Algorithmic Logic & Memory Management",
        "bullets": [
          "Scope resolution using the LEGB rule (Local, Enclosing, Global, Built-in).",
          "File I/O operations with context managers and serialization methods.",
          "Linear vs binary search algorithms and stack operations (PUSH/POP using list)."
        ]
      }
    ],
    "examTraps": [
      "Modifying a list while iterating directly over it using a `for` loop.",
      "Confusing file modes `'w'` (truncates file to zero) with `'a'` (appends to end)."
    ],
    "quickMentalCheck": "What is the output of `len({1, 1.0, '1'})` in Python? (Output: `2` because `1 == 1.0` in set hashing).",
    "cueQuestions": [
      "How does Python manage memory and scoping for Flow of Control?",
      "What is the asymptotic time complexity of standard operations in this module?",
      "How do you properly handle file exceptions and edge cases in CBSE CS exams?"
    ],
    "workedExample": {
      "problem": "Write a Python function to implement the PUSH and POP operations for a linear Stack using lists.",
      "steps": [
        "Define stack as empty list: `stk = []`.",
        "Implement PUSH: `def push(stk, item): stk.append(item)`.",
        "Implement POP with underflow check: `def pop(stk): return stk.pop() if stk else 'Underflow'`."
      ],
      "result": "Valid LIFO Stack implementation passing all CBSE Board criteria."
    },
    "verificationProblem": "Dry run with inputs [10, 20], call pop() twice, verify stack reaches underflow state without crashing.",
    "realWorldUse": "Used in browser undo/redo history, recursion call stacks, database transaction logs, and web servers.",
    "diagramType": "stack-memory-layout"
  }
};
