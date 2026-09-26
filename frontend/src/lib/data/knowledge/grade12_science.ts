/**
 * Brainoro Authoritative Curriculum Knowledge Registry
 * File: grade12_science.ts
 * Total Chapters: 57
 */

import { DeterministicChapterKnowledge } from '../../services/deterministicChapterRegistry';

export const GRADE12_SCIENCE_KNOWLEDGE: Record<string, DeterministicChapterKnowledge> = {
  "CBSE-CH-G12-PHY-CH01": {
    "chapterTitle": "Electric Charges and Fields",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 1,
    "essentialLaw": "F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{|q_1 q_2|}{r^2} \\quad | \\quad \\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} \\quad | \\quad E_{\\text{axial}} = \\frac{2kp}{r^3}, \\; E_{\\text{eq}} = \\frac{kp}{r^3}",
    "coreConcepts": [
      {
        "heading": "Coulomb's Law, Principle of Superposition & Electric Field",
        "bullets": [
          "Quantization of charge: $q = ne$ (where $e = 1.602 \\times 10^{-19}\\text{ C}$); Charge is conserved and scalar additive.",
          "Coulomb's Law in vector form: $\\vec{F}_{12} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r_{21}^2}\\hat{r}_{21}$ where $\\frac{1}{4\\pi\\varepsilon_0} \\approx 8.99 \\times 10^9\\text{ N}\\cdot\\text{m}^2/\\text{C}^2$.",
          "Electric field of an electric dipole: Axial line field $E_{\\text{axial}} = \\frac{2kp}{r^3}$ is double the equatorial field $E_{\\text{eq}} = \\frac{kp}{r^3}$ for $r \\gg 2a$."
        ]
      },
      {
        "heading": "Gauss's Law & Electrostatic Applications",
        "bullets": [
          "Gauss's Flux Theorem: Total electric flux through any closed Gaussian surface equals $\\Phi_E = \\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{in}}}{\\varepsilon_0}$.",
          "Infinitely long straight charged wire: $E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$ (radial outward for $\\lambda > 0$).",
          "Infinitely large thin plane sheet of charge: $E = \\frac{\\sigma}{2\\varepsilon_0}$ (independent of distance $r$).",
          "Uniformly charged thin spherical shell: $E = 0$ inside ($r < R$), $E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2}$ outside ($r \\ge R$)."
        ]
      }
    ],
    "examTraps": [
      "Applying Gauss law flux formula to open surfaces instead of strictly closed 3D Gaussian envelopes.",
      "Direction errors in dipole torque $\\vec{\\tau} = \\vec{p} \\times \\vec{E}$: forgetting torque aligns dipole parallel to field ($\\\\theta = 0^\\circ$)."
    ],
    "quickMentalCheck": "What is the net electric field at the exact center of an electric dipole of length $2a$? $E_{\\text{net}} = 2 \\times \\frac{kq}{a^2} = \\frac{2kq}{a^2}$ pointing from $+q$ to $-q$.",
    "cueQuestions": [
      "How is Gauss's Law derived from Coulomb's Law and the spherical symmetry of space?",
      "Why is electric field inside a charged conducting shell identically zero in electrostatic equilibrium?",
      "How does the torque and potential energy ($U = -\\vec{p}\\cdot\\vec{E}$) describe stable vs unstable equilibrium for a dipole?"
    ],
    "workedExample": {
      "problem": "A point charge of $2.0\\,\\mu\\text{C}$ is at the center of a cubic Gaussian surface $9.0\\text{ cm}$ on edge. What is the net electric flux through each face of the cube?",
      "steps": [
        "Total flux through the entire cube: $\\Phi_{\\text{total}} = \\frac{q}{\\varepsilon_0} = \\frac{2.0 \\times 10^{-6}}{8.854 \\times 10^{-12}} \\approx 2.26 \\times 10^5\\text{ N}\\cdot\\text{m}^2/\\text{C}$.",
        "By symmetry, since the charge is at the center, the flux divides equally across all 6 identical faces.",
        "Flux through one face: $\\Phi_{\\text{face}} = \\frac{\\Phi_{\\text{total}}}{6} = \\frac{2.26 \\times 10^5}{6} \\approx 3.77 \\times 10^4\\text{ N}\\cdot\\text{m}^2/\\text{C}$."
      ],
      "result": "\\Phi_{\\text{face}} = 3.77 \\times 10^4\\text{ N}\\cdot\\text{m}^2/\\text{C}"
    },
    "verificationProblem": "Verify: $6 \\times (3.77 \\times 10^4) = 2.262 \\times 10^5 \\approx \\frac{q}{\\varepsilon_0}$. Conservation of total Gaussian flux holds.",
    "realWorldUse": "Used in electrostatic precipitators in power plants, Van de Graaff accelerators, photocopiers, and RF shielding cages.",
    "diagramType": "electric-field-lines-dipole"
  },
  "CBSE-CH-G12-PHY-CH02": {
    "chapterTitle": "Electrostatic Potential and Capacitance",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 2,
    "essentialLaw": "V(r) = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q}{r} \\quad | \\quad C = \\frac{\\varepsilon_0 A}{d} \\quad | \\quad U = \\frac{1}{2} C V^2 = \\frac{Q^2}{2C} = \\frac{1}{2} Q V \\quad | \\quad u_E = \\frac{1}{2}\\varepsilon_0 E^2",
    "coreConcepts": [
      {
        "heading": "Electrostatic Potential & Equipotential Surfaces",
        "bullets": [
          "Electric potential $V = -\\int_\\infty^r \\vec{E}\\cdot d\\vec{r}$; For point charge: $V = \\frac{kq}{r}$; Potential gradient: $\\vec{E} = -\\vec{\\nabla} V = -\\frac{dV}{dr}\\hat{r}$.",
          "Equipotential surfaces: Surfaces where potential is constant everywhere; Work done moving a charge along an equipotential is $W = q\\Delta V = 0$.",
          "Electric field lines are ALWAYS perpendicular to equipotential surfaces and point in the direction of steepest potential decrease."
        ]
      },
      {
        "heading": "Capacitance, Dielectric Insertion & Energy Density",
        "bullets": [
          "Parallel plate capacitor: $C_0 = \\frac{\\varepsilon_0 A}{d}$; With dielectric of constant $K$: $C = K C_0 = \\frac{K\\varepsilon_0 A}{d}$.",
          "Capacitors in series: $\\frac{1}{C_{\\text{eq}}} = \\frac{1}{C_1} + \\frac{1}{C_2}$; In parallel: $C_{\\text{eq}} = C_1 + C_2$.",
          "Battery connected vs disconnected with dielectric: If battery connected, $V$ remains constant ($Q$ increases by $K$); If battery disconnected, $Q$ remains constant ($V$ decreases by $1/K$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming work is done when moving a test charge on an equipotential surface (work is strictly zero).",
      "Confusing battery-connected vs isolated capacitor conditions when calculating electrostatic energy changes upon inserting dielectrics."
    ],
    "quickMentalCheck": "If the distance between plates of a charged isolated capacitor is doubled, what happens to stored energy? $U = \\frac{Q^2}{2C}$; since $C$ halves, $U$ doubles.",
    "cueQuestions": [
      "Why does electrostatic potential remain constant inside a hollow charged conductor and equal to the surface potential?",
      "How does dielectric polarization reduce the net electric field inside a capacitor by factor $K$?",
      "How is energy density $u = \\frac{1}{2}\\varepsilon_0 E^2$ derived for electric fields in vacuum?"
    ],
    "workedExample": {
      "problem": "A $900\\text{ pF}$ capacitor is charged by a $100\\text{ V}$ battery. How much electrostatic energy is stored? If disconnected from battery and connected to another uncharged $900\\text{ pF}$ capacitor, what is final total energy?",
      "steps": [
        "Initial energy: $U_i = \\frac{1}{2} C V^2 = \\frac{1}{2}(900 \\times 10^{-12})(100)^2 = 4.5 \\times 10^{-6}\\text{ J} = 4.5\\,\\mu\\text{J}$.",
        "Common potential after sharing with identical uncharged capacitor: $V_f = \\frac{C V}{C + C} = \\frac{V}{2} = 50\\text{ V}$.",
        "Final total energy: $U_f = 2 \\times \\left(\\frac{1}{2} C V_f^2\\right) = C V_f^2 = (900 \\times 10^{-12})(50)^2 = 2.25\\,\\mu\\text{J}$.",
        "Energy lost as heat/electromagnetic radiation: $\\Delta U = 4.5 - 2.25 = 2.25\\,\\mu\\text{J}$."
      ],
      "result": "U_i = 4.5\\,\\mu\\text{J}, \\quad U_f = 2.25\\,\\mu\\text{J} \\; (50\\% \\text{ energy dissipated in wiring})"
    },
    "verificationProblem": "Check energy conservation loss formula: $\\Delta U = \\frac{C_1 C_2 (V_1 - V_2)^2}{2(C_1 + C_2)} = \\frac{C^2 V^2}{4C} = \\frac{1}{4} C V^2 = 2.25\\,\\mu\\text{J}$. Matches.",
    "realWorldUse": "Supercapacitors in regenerative EV braking systems, defibrillators for cardiac resuscitation, camera flash pulse circuits.",
    "diagramType": "parallel-plate-capacitor-dielectric"
  },
  "CBSE-CH-G12-PHY-CH03": {
    "chapterTitle": "Current Electricity",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 3,
    "essentialLaw": "I = n e A v_d \\quad | \\quad \\vec{J} = \\sigma \\vec{E} = \\frac{\\vec{E}}{\\rho} \\quad | \\quad V = \\mathcal{E} - I r \\quad | \\quad \\frac{P}{Q} = \\frac{R}{S} \\; (\\text{Balanced Bridge})",
    "coreConcepts": [
      {
        "heading": "Drift Velocity, Mobility & Microscopic Ohm's Law",
        "bullets": [
          "Drift velocity: $v_d = -\\frac{e E \\tau}{m}$ (where $\\tau$ is average relaxation time); Current $I = n e A v_d$.",
          "Current density $J = \\frac{I}{A} = n e v_d = \\sigma E$; Resistivity $\\rho = \\frac{m}{n e^2 \\tau}$.",
          "Temperature dependence: Metals have positive temperature coefficient $\\alpha$ (resistivity increases due to decreasing $\\tau$); Semiconductors have negative $\\alpha$ (resistivity decreases due to carrier generation)."
        ]
      },
      {
        "heading": "Kirchhoff's Laws, EMF & Wheatstone Network",
        "bullets": [
          "Kirchhoff's Current Law (KCL): $\\sum I_{\\text{junction}} = 0$ (Conservation of Electric Charge).",
          "Kirchhoff's Voltage Law (KVL): $\\sum \\Delta V = \\sum \\mathcal{E} - \\sum I R = 0$ around any closed loop (Conservation of Energy).",
          "Terminal potential difference of cell: $V = \\mathcal{E} - Ir$ (discharging) and $V = \\mathcal{E} + Ir$ (charging).",
          "Wheatstone Bridge balance condition: $\\frac{P}{Q} = \\frac{R}{S} \\implies I_g = 0$ (zero deflection in galvanometer)."
        ]
      }
    ],
    "examTraps": [
      "Applying Ohm law blindly to non-ohmic devices (diodes, thyristors, electrolytes) where $I-V$ characteristic is non-linear.",
      "Sign errors when writing KVL mesh equations: traversing against assumed current direction requires adding $+IR$."
    ],
    "quickMentalCheck": "If wire is stretched to double its original length without changing volume, what happens to resistance? $R \\propto l^2$, so resistance increases $4\\times$.",
    "cueQuestions": [
      "How is Ohm's Law derived from first principles using electron drift velocity and relaxation time?",
      "Why is Wheatstone bridge method a null deflection measurement, and why is it superior to direct ammeter-voltmeter methods?",
      "How does internal resistance $r$ of a primary cell depend on electrolyte concentration and electrode separation?"
    ],
    "workedExample": {
      "problem": "A battery of EMF $10\\text{ V}$ and internal resistance $3\\,\\Omega$ is connected to a resistor. If current in circuit is $0.5\\text{ A}$, what is resistance of resistor and terminal voltage of battery?",
      "steps": [
        "Apply circuit current equation: $I = \\frac{\\mathcal{E}}{R + r} \\implies 0.5 = \\frac{10}{R + 3}$.",
        "Solve for $R$: $R + 3 = \\frac{10}{0.5} = 20 \\implies R = 17\\,\\Omega$.",
        "Calculate terminal potential difference: $V = \\mathcal{E} - I r = 10 - (0.5)(3) = 10 - 1.5 = 8.5\\text{ V}$."
      ],
      "result": "R = 17\\,\\Omega, \\quad V = 8.5\\text{ V}"
    },
    "verificationProblem": "Check terminal drop across external load: $V = I R = 0.5 \\times 17 = 8.5\\text{ V}$. Matches internal $V = \\mathcal{E} - Ir$.",
    "realWorldUse": "Used in strain gauge load cells, battery management systems (BMS) for electric vehicles, and precision resistance thermometry (RTDs).",
    "diagramType": "wheatstone-bridge-circuit"
  },
  "CBSE-CH-G12-PHY-CH04": {
    "chapterTitle": "Moving Charges and Magnetism",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 4,
    "essentialLaw": "\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}) \\quad | \\quad d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I(d\\vec{l}\\times\\hat{r})}{r^2} \\quad | \\quad \\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{\\text{enclosed}} \\quad | \\quad B_{\\text{solenoid}} = \\mu_0 n I",
    "coreConcepts": [
      {
        "heading": "Lorentz Force, Cyclotron Motion & Biot-Savart Law",
        "bullets": [
          "Lorentz magnetic force: $\\vec{F}_m = q(\\vec{v}\\times\\vec{B})$; Magnetic force does zero work ($W=0$) because $\\vec{F}_m \\perp \\vec{v}$, changing only direction, not speed.",
          "Circular motion in magnetic field: Radius $r = \\frac{mv}{qB}$; Cyclotron frequency $\\nu = \\frac{qB}{2\\pi m}$ is independent of speed and radius.",
          "Biot-Savart Law: Magnetic field from current element $d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{I d\\vec{l}\\times\\hat{r}}{r^2}$ where $\\frac{\\mu_0}{4\\pi} = 10^{-7}\\text{ T}\\cdot\\text{m}/\\text{A}$.",
          "Field on axis of circular loop of radius $R$: $B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$; At center ($x=0$): $B = \\frac{\\mu_0 I}{2R}$."
        ]
      },
      {
        "heading": "Ampere's Circuital Law & Parallel Wire Force",
        "bullets": [
          "Ampere's Circuital Law: $\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}}$; Long straight wire: $B = \\frac{\\mu_0 I}{2\\pi r}$.",
          "Ideal Solenoid: $B = \\mu_0 n I$ (inside, uniform) and $B \\approx 0$ outside.",
          "Force between two parallel current-carrying wires: $F/L = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$ (Attract if currents parallel, repel if antiparallel).",
          "Moving Coil Galvanometer: $\\tau = N I A B = C\\theta \\implies I = \\frac{C}{NAB}\\theta = K\\theta$; Radial field created using concave pole pieces and soft iron core."
        ]
      }
    ],
    "examTraps": [
      "Applying right-hand thumb rule backwards for negatively charged particles (electrons bend in opposite direction to $\\vec{v}\\times\\vec{B}$).",
      "Forgetting that moving coil galvanometer conversion requires shunt in parallel for ammeter ($S = \\frac{I_g R_g}{I - I_g}$) and high series multiplier for voltmeter ($R = \\frac{V}{I_g} - R_g$)."
    ],
    "quickMentalCheck": "What is the magnetic field at the exact midpoint between two long parallel wires carrying equal current $I$ in the same direction? Zero ($B_{\\text{net}} = B_1 - B_2 = 0$).",
    "cueQuestions": [
      "Why does a static magnetic field do no work on a moving charged particle?",
      "How does Ampere Circuital Law fail in the presence of time-varying electric fields (leading to Maxwell displacement current)?",
      "How does a radial magnetic field ensure a linear scale in a moving coil galvanometer?"
    ],
    "workedExample": {
      "problem": "Two long parallel wires separated by $10\\text{ cm}$ carry currents $I_1 = 5\\text{ A}$ and $I_2 = 10\\text{ A}$ in opposite directions. Find the magnetic force per unit length on the second wire.",
      "steps": [
        "Formula for force per unit length: $\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$.",
        "Substitute values: $d = 0.1\\text{ m}, \\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}$.",
        "$\\frac{F}{L} = \\frac{(4\\pi \\times 10^{-7})(5)(10)}{2\\pi (0.1)} = \\frac{2 \\times 10^{-7} \\times 50}{0.1} = 1.0 \\times 10^{-4}\\text{ N/m}$.",
        "Since currents flow in opposite directions, the force is repulsive."
      ],
      "result": "F/L = 1.0 \\times 10^{-4}\\text{ N/m} \\; (\\text{Repulsive})"
    },
    "verificationProblem": "Check SI definition of Ampere: When $I_1=I_2=1\\text{ A}, d=1\\text{ m}$, force is $2\\times 10^{-7}\\text{ N/m}$. Scaling by $(5)(10)/(0.1) = 500 \\implies 500 \\times 2 \\times 10^{-7} = 10^{-4}\\text{ N/m}$. Verified.",
    "realWorldUse": "Mass spectrometers for isotopic analysis, MRI gradient coils, brushless DC motors, particle cyclotrons in cancer proton therapy.",
    "diagramType": "lorentz-force-helical-motion"
  },
  "CBSE-CH-G12-PHY-CH05": {
    "chapterTitle": "Magnetism and Matter",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 5,
    "essentialLaw": "\\vec{\\tau} = \\vec{M}\\times\\vec{B} \\quad | \\quad U = -\\vec{M}\\cdot\\vec{B} \\quad | \\quad \\oint \\vec{B}\\cdot d\\vec{A} = 0 \\quad | \\quad \\vec{B} = \\mu_0(\\vec{H} + \\vec{M}) = \\mu_r \\mu_0 \\vec{H}",
    "coreConcepts": [
      {
        "heading": "Magnetic Dipole & Gauss Law for Magnetism",
        "bullets": [
          "Magnetic dipole moment of current loop: $\\vec{M} = N I \\vec{A}$; Equivalent to bar magnet of magnetic length $2l$ and pole strength $q_m$ ($M = q_m \\times 2l$).",
          "Field of bar magnet: Axial field $B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi}\\frac{2M}{r^3}$; Equatorial field $B_{\\text{eq}} = \\frac{\\mu_0}{4\\pi}\\frac{M}{r^3}$ for $r \\gg l$.",
          "Gauss's Law for Magnetism: $\\oint \\vec{B}\\cdot d\\vec{A} = 0$, proving that isolated magnetic monopoles do not exist; magnetic field lines are continuous closed loops."
        ]
      },
      {
        "heading": "Classification of Magnetic Materials: Dia, Para, Ferro",
        "bullets": [
          "Diamagnetic: Susceptibility $\\chi < 0$ (small negative, $-1 \\le \\chi < 0$); $\\mu_r < 1$; Repelled by magnets; Independent of temperature; Example: Bismuth, Copper, Water.",
          "Paramagnetic: $\\chi > 0$ (small positive); $\\mu_r > 1$; Attracted weakly; Follows Curie's Law: $\\chi = \\frac{C}{T}$; Example: Aluminium, Oxygen, Platinum.",
          "Ferromagnetic: $\\chi \\gg 1$ (large positive); $\\mu_r \\gg 1$; Form magnetic domains; Above Curie temperature $T_c$, ferromagnet converts into paramagnet (Curie-Weiss law: $\\chi = \\frac{C}{T - T_c}$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming magnetic field lines originate and terminate like electric lines (magnetic lines are continuous closed loops with no beginning or end).",
      "Forgetting that diamagnetism is an intrinsic property present in all substances, though masked in para/ferro materials."
    ],
    "quickMentalCheck": "What happens to the magnetic susceptibility of a diamagnetic material when heated from $300\\text{ K}$ to $600\\text{ K}$? It remains unchanged (diamagnetism is temperature-independent).",
    "cueQuestions": [
      "What is the physical significance of Gauss Law for Magnetism equaling zero?",
      "How does domain theory explain hysteresis loops in ferromagnetic materials?",
      "Why are electromagnets made of soft iron (high retentivity, low coercivity) while permanent magnets use Alnico (high coercivity)?"
    ],
    "workedExample": {
      "problem": "A short bar magnet placed with its axis at $30^\\circ$ with a uniform external magnetic field of $0.25\\text{ T}$ experiences a torque of magnitude equal to $4.5 \\times 10^{-2}\\text{ J}$. What is the magnitude of magnetic moment of the magnet?",
      "steps": [
        "Torque on magnetic dipole: $\\tau = M B \\sin\\theta$.",
        "Given: $\\tau = 4.5 \\times 10^{-2}\\text{ N}\\cdot\\text{m}, B = 0.25\\text{ T}, \\theta = 30^\\circ \\implies \\sin 30^\\circ = 0.5$.",
        "Solve for $M$: $M = \\frac{\\tau}{B \\sin\\theta} = \\frac{4.5 \\times 10^{-2}}{0.25 \\times 0.5} = \\frac{4.5 \\times 10^{-2}}{0.125} = 0.36\\text{ J/T}$ (or $\\text{A}\\cdot\\text{m}^2$)."
      ],
      "result": "M = 0.36\\text{ J/T} = 0.36\\text{ A}\\cdot\\text{m}^2"
    },
    "verificationProblem": "Check torque calculation: $\\tau = 0.36 \\times 0.25 \\times \\sin 30^\\circ = 0.09 \\times 0.5 = 0.045\\text{ N}\\cdot\\text{m}$. Verified.",
    "realWorldUse": "Magnetic core design for high-frequency transformers, hard disk drive magnetic storage media, superconducting MRI magnets.",
    "diagramType": "ferromagnetic-domain-alignment"
  },
  "CBSE-CH-G12-PHY-CH06": {
    "chapterTitle": "Electromagnetic Induction",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 6,
    "essentialLaw": "\\mathcal{E} = -\\frac{d\\Phi_B}{dt} = -\\frac{d}{dt}(BA\\cos\\theta) \\quad | \\quad \\mathcal{E}_{\\text{motional}} = B v l \\quad | \\quad L = \\frac{N\\Phi_B}{I} = \\mu_0 n^2 A l \\quad | \\quad U_L = \\frac{1}{2} L I^2",
    "coreConcepts": [
      {
        "heading": "Faraday's Laws, Lenz's Law & Motional EMF",
        "bullets": [
          "Faraday's Law of Induction: Induced EMF is directly proportional to negative rate of change of magnetic flux: $\\mathcal{E} = -N\\frac{d\\Phi_B}{dt}$.",
          "Lenz's Law: The direction of induced EMF/current always opposes the change in magnetic flux that produces it (Direct consequence of Conservation of Energy).",
          "Motional EMF: A conducting rod of length $l$ moving with velocity $v$ perpendicular to field $B$ develops EMF $\\mathcal{E} = Bvl$; Rotating rod of length $l$ at angular frequency $\\omega$: $\\mathcal{E} = \\frac{1}{2} B \\omega l^2$."
        ]
      },
      {
        "heading": "Self & Mutual Inductance & Eddy Currents",
        "bullets": [
          "Self-Inductance $L$: $\\Phi_{\\text{total}} = N\\Phi_B = L I \\implies \\mathcal{E} = -L\\frac{dI}{dt}$; For long solenoid: $L = \\mu_0 n^2 A l$.",
          "Mutual Inductance $M$: $\\Phi_2 = M I_1 \\implies \\mathcal{E}_2 = -M\\frac{dI_1}{dt}$; For two concentric solenoids: $M = \\mu_0 n_1 n_2 \\pi r_1^2 l$.",
          "Energy stored in inductor: $U = \\frac{1}{2} L I^2$; Magnetic energy density in space: $u_B = \\frac{B^2}{2\\mu_0}$.",
          "Eddy currents: Circulating induced currents in bulk metallic conductors; Minimized by using laminated magnetic cores with insulating varnish."
        ]
      }
    ],
    "examTraps": [
      "Omitting the negative sign in Lenz law representing opposing back-EMF.",
      "Confusing total number of turns $N$ with turns per unit length $n = N/l$ in inductance formulas ($L = \\mu_0 n^2 A l = \\frac{\\mu_0 N^2 A}{l}$)."
    ],
    "quickMentalCheck": "If the current through a $2\\text{ H}$ inductor increases at a steady rate of $3\\text{ A/s}$, what is the induced back-EMF? $\\mathcal{E} = -L\\frac{dI}{dt} = -2 \\times 3 = -6\\text{ V}$.",
    "cueQuestions": [
      "How does Lenz Law enforce the universal law of conservation of energy?",
      "Why is self-inductance called the \"electrical inertia\" of a circuit?",
      "How do induction cooktops and magnetic levitation brakes utilize eddy currents?"
    ],
    "workedExample": {
      "problem": "A metallic rod of $1\\text{ m}$ length is rotated with a frequency $50\\text{ rev/s}$, with one end hinged at the center and the other end at the circumference of a circular metallic ring of radius $1\\text{ m}$, about an axis passing through the center and perpendicular to the plane of the ring. A constant uniform magnetic field of $1\\text{ T}$ parallel to the axis is present everywhere. What is the EMF between the center and the metallic ring?",
      "steps": [
        "Formula for induced EMF in rotating conductor: $\\mathcal{E} = \\frac{1}{2} B \\omega R^2$.",
        "Angular velocity: $\\omega = 2\\pi \\nu = 2\\pi(50) = 100\\pi\\text{ rad/s} \\approx 314.16\\text{ rad/s}$.",
        "Substitute: $\\mathcal{E} = \\frac{1}{2} \\times 1.0\\text{ T} \\times 100\\pi \\times (1.0)^2 = 50\\pi\\text{ V} \\approx 157.1\\text{ V}$."
      ],
      "result": "\\mathcal{E} = 50\\pi\\text{ V} \\approx 157.1\\text{ V}"
    },
    "verificationProblem": "Check via rate of swept flux: Area swept per second is $\\pi R^2 \\times \\nu = \\pi(1)^2(50) = 50\\pi\\text{ m}^2/\\text{s}$. Flux change per second $= B \\times \\text{Area}/\\text{s} = 1.0 \\times 50\\pi = 50\\pi\\text{ V}$. Matches.",
    "realWorldUse": "AC generators and alternators in hydroelectric dams, induction heating furnaces, wireless smartphone charging pads.",
    "diagramType": "faraday-induction-solenoid"
  },
  "CBSE-CH-G12-PHY-CH07": {
    "chapterTitle": "Alternating Current",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 7,
    "essentialLaw": "I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} \\quad | \\quad Z = \\sqrt{R^2 + (X_L - X_C)^2} \\quad | \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}} \\quad | \\quad P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi",
    "coreConcepts": [
      {
        "heading": "AC Voltage, RMS Values & Phasor Algebra",
        "bullets": [
          "Sinusoidal AC: $v = V_0 \\sin(\\omega t)$, $i = I_0 \\sin(\\omega t \\pm \\phi)$; RMS value: $V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0$, $I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}}$.",
          "Pure Resistor: Current and voltage are strictly in phase ($\\phi = 0$).",
          "Pure Inductor: Current lags voltage by $90^\\circ$ ($\\pi/2$ rad); Inductive reactance $X_L = \\omega L = 2\\pi f L$.",
          "Pure Capacitor: Current leads voltage by $90^\\circ$ ($\\pi/2$ rad); Capacitive reactance $X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}$."
        ]
      },
      {
        "heading": "Series LCR Circuit, Resonance, Q-Factor & Transformer",
        "bullets": [
          "Series LCR Impedance: $Z = \\sqrt{R^2 + (X_L - X_C)^2}$; Phase angle: $\\tan\\phi = \\frac{X_L - X_C}{R}$.",
          "Series Resonance: When $X_L = X_C$, impedance is minimum ($Z = R$), current is maximum ($I_{\\text{max}} = V/R$), and $\\omega_0 = \\frac{1}{\\sqrt{LC}}$.",
          "Quality Factor ($Q$): Sharpness of resonance $Q = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = \\frac{\\omega_0}{2\\Delta\\omega}$.",
          "Power in AC: $P = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi$ (where $\\cos\\phi = R/Z$ is power factor; Wattless current when $\\phi = 90^\\circ$).",
          "Ideal Transformer: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s} = k$ (Step-up: $k > 1$; Step-down: $k < 1$)."
        ]
      }
    ],
    "examTraps": [
      "Adding AC voltages algebraically ($V = V_R + V_L + V_C$) instead of phasor vector addition ($V = \\sqrt{V_R^2 + (V_L - V_C)^2}$).",
      "Assuming power dissipation in pure capacitors or inductors (average power in purely reactive elements is identically zero)."
    ],
    "quickMentalCheck": "In a series LCR circuit at resonance with $R = 10\\,\\Omega, L = 100\\text{ mH}, C = 10\\,\\mu\\text{F}$, what is the circuit impedance? $Z = R = 10\\,\\Omega$.",
    "cueQuestions": [
      "Why is AC current transmitted at high voltages over long distances?",
      "How does the concept of Wattless current explain the zero energy consumption of ideal choke coils?",
      "What are the primary energy losses in real transformers (flux leakage, iron core eddy currents, copper loss, hysteresis)?"
    ],
    "workedExample": {
      "problem": "A series LCR circuit with $R = 20\\,\\Omega, L = 1.5\\text{ H}, C = 35\\,\\mu\\text{F}$ is connected to a variable-frequency $200\\text{ V}$ AC supply. When the frequency of the supply equals the natural resonance frequency, what is average power transferred to the circuit in one complete cycle?",
      "steps": [
        "At resonant frequency, $X_L = X_C$, so total impedance $Z = R = 20\\,\\Omega$.",
        "RMS current at resonance: $I_{\\text{rms}} = \\frac{V_{\\text{rms}}}{Z} = \\frac{200\\text{ V}}{20\\,\\Omega} = 10\\text{ A}$.",
        "Power factor at resonance: $\\cos\\phi = \\frac{R}{Z} = \\frac{20}{20} = 1.0$.",
        "Average power: $P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi = 200 \\times 10 \\times 1 = 2000\\text{ W} = 2.0\\text{ kW}$."
      ],
      "result": "P_{\\text{avg}} = 2000\\text{ W} = 2.0\\text{ kW}"
    },
    "verificationProblem": "Check resistive dissipation: $P = I_{\\text{rms}}^2 R = (10)^2 \\times 20 = 100 \\times 20 = 2000\\text{ W}$. Exact match.",
    "realWorldUse": "Radio and TV tuner receiver circuits, power grid distribution step-up/down substations, variable speed induction motor drives.",
    "diagramType": "lcr-resonance-phasor-diagram"
  },
  "CBSE-CH-G12-PHY-CH08": {
    "chapterTitle": "Electromagnetic Waves",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 8,
    "essentialLaw": "I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt} \\quad | \\quad c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{E_0}{B_0} \\quad | \\quad u = \\frac{1}{2}\\varepsilon_0 E^2 + \\frac{B^2}{2\\mu_0} \\quad | \\quad p = \\frac{U}{c}",
    "coreConcepts": [
      {
        "heading": "Displacement Current & Maxwell's Equations",
        "bullets": [
          "Inconsistency of Ampere law during capacitor charging: Conduction current $I_c$ exists in wires but zero current in dielectric gap.",
          "Maxwell Displacement Current: $I_d = \\varepsilon_0 \\frac{d\\Phi_E}{dt}$; Generalized Ampere-Maxwell Law: $\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 (I_c + I_d)$.",
          "Continuity: Total current $I = I_c + I_d$ is continuous across all circuit boundaries."
        ]
      },
      {
        "heading": "Properties of EM Waves & The Electromagnetic Spectrum",
        "bullets": [
          "EM waves are transverse waves produced by accelerating electric charges; $\\vec{E}$ and $\\vec{B}$ oscillate mutually perpendicular to each other and to the propagation direction $\\vec{k} = \\hat{E} \\times \\hat{B}$.",
          "Wave speed in vacuum: $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} \\approx 3.0 \\times 10^8\\text{ m/s}$; In medium: $v = \\frac{1}{\\sqrt{\\mu \\varepsilon}} = \\frac{c}{n}$.",
          "Equal energy distribution: Energy density is equally divided between electric and magnetic fields: $u_E = u_B = \\frac{1}{2}\\varepsilon_0 E_{\\text{rms}}^2 = \\frac{B_{\\text{rms}}^2}{2\\mu_0}$.",
          "EM Spectrum (decreasing wavelength $\\lambda$ / increasing frequency $\\nu$): Radio $\\to$ Microwave $\\to$ Infrared $\\to$ Visible $\\to$ Ultraviolet $\\to$ X-rays $\\to$ Gamma rays."
        ]
      }
    ],
    "examTraps": [
      "Assuming displacement current requires physical charge motion (it arises purely from time-varying electric field flux).",
      "Confusing radiation pressure for complete absorption ($P = I/c$) vs complete reflection ($P = 2I/c$)."
    ],
    "quickMentalCheck": "If the peak electric field in an EM wave is $E_0 = 600\\text{ N/C}$, what is peak magnetic field $B_0$? $B_0 = \\frac{E_0}{c} = \\frac{600}{3 \\times 10^8} = 2.0 \\times 10^{-6}\\text{ T} = 2\\,\\mu\\text{T}$.",
    "cueQuestions": [
      "How does Maxwell displacement current resolve Ampere Circuital Law for a charging capacitor?",
      "Why can EM waves propagate through empty vacuum where mechanical waves cannot?",
      "Which bands of the EM spectrum are used in radar, LASIK eye surgery, and cancer radiotherapy?"
    ],
    "workedExample": {
      "problem": "A plane electromagnetic wave of frequency $25\\text{ MHz}$ travels in free space along the $+x$-direction. At a particular point in space and time, $\\vec{E} = 6.3\\hat{j}\\text{ V/m}$. What is $\\vec{B}$ at this point?",
      "steps": [
        "Magnitude relation: $B = \\frac{E}{c} = \\frac{6.3\\text{ V/m}}{3.0 \\times 10^8\\text{ m/s}} = 2.1 \\times 10^{-8}\\text{ T} = 21\\text{ nT}$.",
        "Direction rule: EM wave propagates along $\\vec{S} \\propto \\vec{E} \\times \\vec{B}$.",
        "Given propagation is $+\\hat{i}$ and $\\vec{E}$ is along $+\\hat{j}$, we need $\\hat{j} \\times \\hat{u}_B = \\hat{i}$. Since $\\hat{j} \\times \\hat{k} = \\hat{i}$, $\\vec{B}$ must be along $+\\hat{k}$."
      ],
      "result": "\\vec{B} = 2.1 \\times 10^{-8}\\hat{k}\\text{ T} = 21\\hat{k}\\text{ nT}"
    },
    "verificationProblem": "Check vector cross product: $\\hat{E} \\times \\hat{B} = \\hat{j} \\times \\hat{k} = \\hat{i}$ (along $+x$ propagation axis). Verified.",
    "realWorldUse": "5G cellular communications, satellite synthetic aperture radar (SAR), thermal infrared imaging, airport baggage X-ray scanners.",
    "diagramType": "electromagnetic-wave-orthogonal-propagation"
  },
  "CBSE-CH-G12-PHY-CH09": {
    "chapterTitle": "Ray Optics and Optical Instruments",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 9,
    "essentialLaw": "\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u} \\quad | \\quad \\frac{1}{f} = (n-1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) \\quad | \\quad n = \\frac{\\sin\\left(\\frac{A+D_m}{2}\\right)}{\\sin(A/2)} \\quad | \\quad m = -\\frac{v_o}{u_o}\\left(1 + \\frac{D}{f_e}\\right)",
    "coreConcepts": [
      {
        "heading": "Refraction at Spherical Surfaces, Lens Maker Formula & Prisms",
        "bullets": [
          "Snell's Law: $n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2$; Total Internal Reflection (TIR) occurs when angle of incidence $i > i_c$ where $\\sin i_c = 1/n$.",
          "Refraction at single spherical interface: $\\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}$.",
          "Lens Maker's Formula: $\\frac{1}{f} = (n_{21} - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$; Thin lens formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$.",
          "Prism Refraction & Minimum Deviation: $n = \\frac{\\sin\\left(\\frac{A + D_m}{2}\\right)}{\\sin(A/2)}$ where $A$ is prism angle and $D_m$ is minimum angle of deviation."
        ]
      },
      {
        "heading": "Optical Instruments: Compound Microscope & Astronomical Telescope",
        "bullets": [
          "Compound Microscope: Objective lens has short focal length $f_o$ and small aperture; Eyepiece has moderate focal length $f_e$; Magnifying power at normal near point ($D = 25\\text{ cm}$): $m = -\\frac{L}{f_o}\\left(1 + \\frac{D}{f_e}\\right)$; At infinity: $m = -\\frac{L}{f_o}\\frac{D}{f_e}$.",
          "Astronomical Refracting Telescope: Objective has large focal length $f_o$ and large aperture; Eyepiece has small $f_e$; Normal adjustment ($v_e = \\infty$): $m = -\\frac{f_o}{f_e}$, Tube length $L = f_o + f_e$.",
          "Reflecting (Cassegrain) Telescope: Uses parabolic primary mirror; Eliminates chromatic aberration and reduces spherical aberration."
        ]
      }
    ],
    "examTraps": [
      "Sign convention errors in Lens Maker formula (for biconvex lens, $R_1 > 0$ and $R_2 < 0$).",
      "Confusing magnifying power $m$ with linear lateral magnification $m = v/u$ in optical instrument questions."
    ],
    "quickMentalCheck": "If a convex glass lens ($n = 1.5$) of focal length $20\\text{ cm}$ in air is immersed in water ($n = 1.33$), what happens to focal length? It increases $4\\times$ to $f_{\\text{water}} \\approx 80\\text{ cm}$.",
    "cueQuestions": [
      "How is Lens Maker's Formula derived by considering refraction at two successive spherical boundaries?",
      "Why is a reflecting telescope preferred over a refracting telescope for modern astronomical observatories?",
      "How does total internal reflection enable lossless light transmission in optical fiber core-cladding waveguides?"
    ],
    "workedExample": {
      "problem": "A small telescope has an objective lens of focal length $144\\text{ cm}$ and an eyepiece of focal length $6.0\\text{ cm}$. What is the magnifying power of the telescope in normal adjustment, and what is the separation between objective and eyepiece?",
      "steps": [
        "Normal adjustment means final image is formed at infinity.",
        "Magnifying power: $m = -\\frac{f_o}{f_e} = -\\frac{144\\text{ cm}}{6.0\\text{ cm}} = -24$.",
        "Separation between lenses (tube length): $L = f_o + f_e = 144\\text{ cm} + 6.0\\text{ cm} = 150\\text{ cm} = 1.5\\text{ m}$."
      ],
      "result": "m = -24 \\; (\\text{Inverted, 24-fold magnification}), \\quad L = 150\\text{ cm}"
    },
    "verificationProblem": "Check angular magnification ratio: $\\theta_{\\text{image}}/\\theta_{\\text{object}} = 144/6 = 24$. Matches standard telescope invariant.",
    "realWorldUse": "High-speed fiber-optic internet backbones, surgical endoscopes, James Webb space telescope optics, confocal biological microscopes.",
    "diagramType": "compound-microscope-ray-diagram"
  },
  "CBSE-CH-G12-PHY-CH10": {
    "chapterTitle": "Wave Optics",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 10,
    "essentialLaw": "\\beta = \\frac{\\lambda D}{d} \\quad | \\quad I(\\theta) = 4 I_0 \\cos^2\\left(\\frac{\\phi}{2}\\right) \\quad | \\quad a \\sin\\theta = n\\lambda \\; (\\text{Diffraction Minima}) \\quad | \\quad I = I_0 \\cos^2\\theta \\; (\\text{Malus Law})",
    "coreConcepts": [
      {
        "heading": "Huygens' Wave Theory & Laws of Reflection/Refraction",
        "bullets": [
          "Huygens Principle: Every point on a primary wavefront acts as a secondary source of spherical wavelets; The forward tangent envelope forms the new wavefront.",
          "Wavefront geometries: Point source $\\to$ Spherical wavefront; Line source $\\to$ Cylindrical wavefront; Distant source $\\to$ Plane wavefront.",
          "Proof of Snell Law via wave theory: $\\frac{\\sin i}{\\sin r} = \\frac{v_1 \\Delta t}{v_2 \\Delta t} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1} \\implies n_1 \\sin i = n_2 \\sin r$."
        ]
      },
      {
        "heading": "Young's Double Slit Interference & Single Slit Diffraction",
        "bullets": [
          "Interference conditions: Two coherent sources with constant phase difference $\\Delta\\phi$; Constructive interference (bright fringe): path difference $\\Delta x = n\\lambda$; Destructive interference (dark fringe): $\\Delta x = (2n-1)\\frac{\\lambda}{2}$.",
          "Fringe width in YDSE: $\\beta = \\frac{\\lambda D}{d}$ (Equal width for all bright and dark fringes).",
          "Single Slit Diffraction (Fraunhofer): Central maximum width is $2\\beta_0 = \\frac{2\\lambda D}{a}$; Minima condition: $a \\sin\\theta = n\\lambda$ ($n = \\pm 1, \\pm 2, \\dots$).",
          "Comparison: Interference fringes are equally spaced and equally bright; Diffraction fringes have decreasing intensity and central fringe is twice as wide as secondary fringes."
        ]
      }
    ],
    "examTraps": [
      "Confusing maxima and minima formulas between interference (bright is $n\\lambda$) and single-slit diffraction (minima is $a\\sin\\theta = n\\lambda$).",
      "Forgetting that immersing a YDSE setup in water ($n$) shrinks fringe width to $\\beta' = \\beta/n$."
    ],
    "quickMentalCheck": "In YDSE, if the distance between slits $d$ is halved and distance to screen $D$ is doubled, how does fringe width change? $\\beta = \\frac{\\lambda(2D)}{d/2} = 4\\frac{\\lambda D}{d} = 4\\beta$ (increases $4\\times$).",
    "cueQuestions": [
      "How is the wave nature of light proven using Young's Double Slit Experiment?",
      "Why can two independent light bulbs never produce a sustained interference pattern?",
      "How does Fraunhofer single-slit diffraction explain why central maximum is twice as wide as secondary maxima?"
    ],
    "workedExample": {
      "problem": "In a Young’s double-slit experiment, the slits are separated by $0.28\\text{ mm}$ and the screen is placed $1.4\\text{ m}$ away. The distance between the central bright fringe and the fourth bright fringe is measured to be $1.2\\text{ cm}$. Determine the wavelength of light used.",
      "steps": [
        "Distance to 4th bright fringe: $y_4 = 4\\beta = 4\\frac{\\lambda D}{d} = 1.2\\text{ cm} = 1.2 \\times 10^{-2}\\text{ m}$.",
        "Calculate single fringe width: $\\beta = \\frac{1.2 \\times 10^{-2}\\text{ m}}{4} = 3.0 \\times 10^{-3}\\text{ m} = 3.0\\text{ mm}$.",
        "Solve for $\\lambda$: $\\lambda = \\frac{\\beta d}{D} = \\frac{(3.0 \\times 10^{-3}\\text{ m})(0.28 \\times 10^{-3}\\text{ m})}{1.4\\text{ m}}$.",
        "$\\lambda = \\frac{0.84 \\times 10^{-6}}{1.4} = 6.0 \\times 10^{-7}\\text{ m} = 600\\text{ nm}$."
      ],
      "result": "\\lambda = 600\\text{ nm} = 6.0 \\times 10^{-7}\\text{ m} \\; (\\text{Yellow-Orange visible light})"
    },
    "verificationProblem": "Check fringe width with $600\\text{ nm}$: $\\beta = \\frac{600 \\times 10^{-9} \\times 1.4}{0.28 \\times 10^{-3}} = 3.0\\text{ mm}$. 4th fringe is at $4 \\times 3.0\\text{ mm} = 1.2\\text{ cm}$. Verified.",
    "realWorldUse": "Anti-reflective coatings on camera lenses, holographic 3D security labels on currency, X-ray crystallography for DNA structure determination.",
    "diagramType": "young-double-slit-interference"
  },
  "CBSE-CH-G12-PHY-CH11": {
    "chapterTitle": "Dual Nature of Radiation and Matter",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 11,
    "essentialLaw": "E = h\\nu = \\frac{hc}{\\lambda} \\quad | \\quad K_{\\text{max}} = e V_0 = h\\nu - \\phi_0 = h(\\nu - \\nu_0) \\quad | \\quad \\lambda_{\\text{de Broglie}} = \\frac{h}{p} = \\frac{h}{\\sqrt{2mE}} = \\frac{1.227}{\\sqrt{V}}\\text{ nm}",
    "coreConcepts": [
      {
        "heading": "Photoelectric Effect & Einstein's Photoelectric Equation",
        "bullets": [
          "Key Experimental Facts: Instantaneous emission ($< 10^{-9}\\text{ s}$); Threshold frequency $\\nu_0$ below which zero emission occurs; Saturation current $\\propto$ Intensity of light; Maximum kinetic energy $K_{\\text{max}}$ depends linearly on frequency $\\nu$, independent of intensity.",
          "Einstein's Equation: $K_{\\text{max}} = h\\nu - \\phi_0 = e V_0$ where $\\phi_0 = h\\nu_0$ is work function of target metal.",
          "Failure of Wave Theory: Wave theory predicted time delay for energy accumulation and $K_{\\text{max}}$ dependency on intensity, directly contradicted by experiment."
        ]
      },
      {
        "heading": "de Broglie Wavelength & Matter Waves",
        "bullets": [
          "de Broglie hypothesis: Dual nature of matter: $\\lambda = \\frac{h}{p} = \\frac{h}{mv}$.",
          "For particle of mass $m$ and kinetic energy $E$: $\\lambda = \\frac{h}{\\sqrt{2mE}}$.",
          "For electron accelerated through potential difference $V$: $\\lambda_e = \\frac{h}{\\sqrt{2m_e e V}} = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA}$.",
          "Davisson-Germer Experiment: Proved wave nature of electrons through diffraction from nickel crystal lattice."
        ]
      }
    ],
    "examTraps": [
      "Confusing photon intensity (number of photons/sec, controlling current) with photon frequency (energy per photon, controlling stopping potential).",
      "Forgetting to convert electron-volts (eV) to Joules ($1\\text{ eV} = 1.602 \\times 10^{-19}\\text{ J}$) when applying Einstein photoelectric equation."
    ],
    "quickMentalCheck": "If the accelerating voltage of an electron beam is increased $4\\times$ (from $25\\text{ V}$ to $100\\text{ V}$), what happens to its de Broglie wavelength? $\\lambda \\propto 1/\\sqrt{V}$, so $\\lambda$ halves.",
    "cueQuestions": [
      "How did Einstein explanation of the photoelectric effect provide incontrovertible proof of the photon quantum hypothesis?",
      "Why is stopping potential $V_0$ independent of the intensity of incident light for a given frequency?",
      "How does the de Broglie wavelength of an electron explain Bohr quantum postulate of angular momentum quantization ($mvr = nh/2\\pi$)?"
    ],
    "workedExample": {
      "problem": "The work function of caesium metal is $2.14\\text{ eV}$. When light of frequency $6.0 \\times 10^{14}\\text{ Hz}$ is incident on the metal surface, what is the maximum kinetic energy of emitted electrons and the stopping potential?",
      "steps": [
        "Energy of incident photon: $E = h\\nu = (6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s})(6.0 \\times 10^{14}\\text{ s}^{-1}) = 3.978 \\times 10^{-19}\\text{ J}$.",
        "Convert to eV: $E = \\frac{3.978 \\times 10^{-19}}{1.602 \\times 10^{-19}} = 2.483\\text{ eV}$.",
        "Apply Einstein equation: $K_{\\text{max}} = E - \\phi_0 = 2.483\\text{ eV} - 2.14\\text{ eV} = 0.343\\text{ eV} \\approx 0.34\\text{ eV} = 5.5 \\times 10^{-20}\\text{ J}$.",
        "Stopping potential: $V_0 = \\frac{K_{\\text{max}}}{e} = 0.343\\text{ V}$."
      ],
      "result": "K_{\\text{max}} = 0.34\\text{ eV} = 5.5 \\times 10^{-20}\\text{ J}, \\quad V_0 = 0.34\\text{ V}"
    },
    "verificationProblem": "Check threshold frequency: $\\nu_0 = \\phi_0/h = (2.14 \\times 1.602 \\times 10^{-19})/(6.63 \\times 10^{-34}) = 5.17 \\times 10^{14}\\text{ Hz}$. Since $\\nu = 6.0 \\times 10^{14} > \\nu_0$, emission is verified.",
    "realWorldUse": "Transmission Electron Microscopes (TEM) with sub-angstrom resolution, solar photovoltaic panels, night vision photomultiplier tubes.",
    "diagramType": "photoelectric-stopping-potential-graph"
  },
  "CBSE-CH-G12-PHY-CH12": {
    "chapterTitle": "Atoms",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 12,
    "essentialLaw": "L = mvr = \\frac{n h}{2\\pi} \\quad | \\quad r_n = \\frac{n^2 h^2 \\varepsilon_0}{\\pi m e^2} = n^2 a_0 \\; (a_0 = 0.529\\text{ \\AA}) \\quad | \\quad E_n = -\\frac{13.6}{n^2}\\text{ eV} \\quad | \\quad \\frac{1}{\\lambda} = R\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)",
    "coreConcepts": [
      {
        "heading": "Rutherford's Planetary Model & Alpha Particle Scattering",
        "bullets": [
          "Geiger-Marsden $\\alpha$-scattering: Most $\\alpha$-particles pass undeflected ($>99.8\\%$); only 1 in 8000 deflects by $>90^\\circ$, proving the nucleus is dense, positively charged, and tiny ($r_{\\text{nucleus}} \\sim 10^{-15}\\text{ m}$ vs $r_{\\text{atom}} \\sim 10^{-10}\\text{ m}$).",
          "Distance of closest approach: $r_0 = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2 Z e^2}{K_\\alpha}$ (Conservation of Mechanical Energy at head-on collision).",
          "Limitations: Classical accelerating electrons emit continuous synchrotron radiation, causing atomic collapse in $\\sim 10^{-8}\\text{ s}$; Cannot explain discrete line emission spectra."
        ]
      },
      {
        "heading": "Bohr's Hydrogen Model & Spectral Series",
        "bullets": [
          "Bohr Postulates: 1. Stable non-radiating stationary orbits; 2. Angular momentum quantization: $L = mvr = \\frac{nh}{2\\pi}$; 3. Frequency condition: $h\\nu = E_2 - E_1$.",
          "Orbital radius: $r_n = n^2 a_0$ where Bohr radius $a_0 = 0.0529\\text{ nm} = 0.529\\text{ \\AA}$.",
          "Energy levels: $E_n = -\\frac{13.6 Z^2}{n^2}\\text{ eV}$; Ground state ($n=1$): $E_1 = -13.6\\text{ eV}$ (Ionization energy = $+13.6\\text{ eV}$).",
          "Spectral Series: Lyman ($n_1=1$, UV), Balmer ($n_1=2$, Visible), Paschen ($n_1=3$, IR), Brackett ($n_1=4$, IR), Pfund ($n_1=5$, Far IR)."
        ]
      }
    ],
    "examTraps": [
      "Assuming the Balmer series lies in the Ultraviolet region (Balmer is the ONLY series in the visible spectrum; Lyman is UV).",
      "Forgetting that total orbital energy is negative and relates to kinetic and potential energies as $E = -K = \\frac{U}{2}$."
    ],
    "quickMentalCheck": "What is the radius of the 3rd orbit of hydrogen atom? $r_3 = 3^2 \\times a_0 = 9 \\times 0.529\\text{ \\AA} = 4.761\\text{ \\AA}$.",
    "cueQuestions": [
      "How does Bohr third postulate explain the discrete line emission spectrum of hydrogen?",
      "Why does total orbital energy have a negative sign, and what is the physical meaning of $E = 0$?",
      "What are the fundamental limitations of the Bohr atomic model (Zeeman effect, Stark effect, fine structure)?"
    ],
    "workedExample": {
      "problem": "What is the shortest wavelength present in the Paschen series of spectral lines of hydrogen atom? ($R = 1.097 \\times 10^7\\text{ m}^{-1}$).",
      "steps": [
        "Paschen series formula: $\\frac{1}{\\lambda} = R\\left(\\frac{1}{3^2} - \\frac{1}{n_2^2}\\right)$ for $n_2 = 4, 5, 6, \\dots$.",
        "Shortest wavelength (series limit) occurs when transition is from $n_2 = \\infty$.",
        "$\\frac{1}{\\lambda_{\\text{min}}} = R\\left(\\frac{1}{9} - \\frac{1}{\\infty}\\right) = \\frac{R}{9}$.",
        "Solve for $\\lambda_{\\text{min}}$: $\\lambda_{\\text{min}} = \\frac{9}{R} = \\frac{9}{1.097 \\times 10^7\\text{ m}^{-1}} = 8.204 \\times 10^{-7}\\text{ m} = 820.4\\text{ nm}$."
      ],
      "result": "\\lambda_{\\text{min}} = 820.4\\text{ nm} \\; (\\text{Near-Infrared spectral line})"
    },
    "verificationProblem": "Check longest wavelength in Paschen ($n_2=4$): $\\frac{1}{\\lambda} = R(1/9 - 1/16) = \\frac{7R}{144} \\implies \\lambda = \\frac{144}{7R} = 1875\\text{ nm}$. Since $820.4\\text{ nm} < 1875\\text{ nm}$, shortest wavelength verified.",
    "realWorldUse": "Astrophysical spectroscopy to determine stellar chemical compositions, laser emission transitions (Ruby/He-Ne lasers), atomic clocks.",
    "diagramType": "bohr-energy-levels-spectral-series"
  },
  "CBSE-CH-G12-PHY-CH13": {
    "chapterTitle": "Nuclei",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 13,
    "essentialLaw": "R = R_0 A^{1/3} \\; (R_0 = 1.2\\text{ fm}) \\quad | \\quad E = \\Delta m c^2 \\quad | \\quad \\Delta m = [Z m_p + (A-Z)m_n] - M_{\\text{nucleus}} \\quad | \\quad E_{\\text{bn}} = \\frac{\\Delta m c^2}{A}",
    "coreConcepts": [
      {
        "heading": "Nuclear Composition, Size & Constant Nuclear Density",
        "bullets": [
          "Nuclear radius: $R = R_0 A^{1/3}$ where $R_0 = 1.2 \\times 10^{-15}\\text{ m} = 1.2\\text{ fm}$.",
          "Constant nuclear density: $\\rho = \\frac{\\text{Mass}}{\\text{Volume}} = \\frac{A m_N}{\\frac{4}{3}\\pi R_0^3 A} = \\frac{3 m_N}{4\\pi R_0^3} \\approx 2.3 \\times 10^{17}\\text{ kg/m}^3$ (Completely independent of mass number $A$).",
          "Strong Nuclear Force: Short-range ($1-2\\text{ fm}$), charge-independent, strongest force in nature, displays saturation property and repulsive core below $0.5\\text{ fm}$."
        ]
      },
      {
        "heading": "Mass Defect, Binding Energy Curve, Fission & Fusion",
        "bullets": [
          "Mass Defect: $\\Delta m = [Z m_p + (A - Z)m_n] - M_{\\text{nucleus}}$; Energy equivalent: $1\\text{ u} = 931.5\\text{ MeV}$.",
          "Binding Energy per Nucleon ($E_{bn}/A$): Peaks near $^{56}\\text{Fe}$ at $\\approx 8.75\\text{ MeV/nucleon}$; Decreases for light nuclei ($A < 30$) and heavy nuclei ($A > 170$).",
          "Nuclear Fission: Heavy nucleus ($A > 230$, e.g., $^{235}\\text{U}$) splits into intermediate fragments releasing $\\sim 200\\text{ MeV}$ per fission due to increased $E_{bn}$ of daughter fragments.",
          "Nuclear Fusion: Light nuclei ($A \\le 4$, e.g., $^{2}\\text{H} + {^{3}\\text{H}} \\to {^{4}\\text{He}} + n$) fuse at extreme temperatures ($10^7\\text{ K}$) releasing higher energy per unit mass."
        ]
      }
    ],
    "examTraps": [
      "Assuming nuclear density increases with heavier mass numbers (nuclear density is strictly constant across all stable nuclei).",
      "Confusing total binding energy with binding energy per nucleon (stability depends ONLY on $E_{bn}/A$, not total $E_{bn}$)."
    ],
    "quickMentalCheck": "Find the ratio of nuclear radii of $^{27}\\text{Al}$ and $^{125}\\text{Te}$: $\\frac{R_1}{R_2} = \\left(\\frac{27}{125}\\right)^{1/3} = \\frac{3}{5} = 0.6$.",
    "cueQuestions": [
      "Why is nuclear density constant across all atomic nuclei regardless of their mass number?",
      "How does the Binding Energy per Nucleon curve explain why fission occurs for heavy nuclei and fusion occurs for light nuclei?",
      "What are the conditions required for sustained controlled nuclear chain reactions in thermal fission reactors?"
    ],
    "workedExample": {
      "problem": "Calculate the binding energy per nucleon for $^{56}_{26}\\text{Fe}$ given: mass of proton $= 1.007825\\text{ u}$, mass of neutron $= 1.008665\\text{ u}$, and atomic mass of $^{56}_{26}\\text{Fe} = 55.934939\\text{ u}$.",
      "steps": [
        "Number of protons $Z = 26$, number of neutrons $N = 56 - 26 = 30$.",
        "Total mass of nucleons: $M_{\\text{constituent}} = 26(1.007825) + 30(1.008665) = 26.203450 + 30.259950 = 56.463400\\text{ u}$.",
        "Mass defect: $\\Delta m = 56.463400 - 55.934939 = 0.528461\\text{ u}$.",
        "Total Binding Energy: $E_b = 0.528461 \\times 931.5\\text{ MeV} = 492.26\\text{ MeV}$.",
        "Binding energy per nucleon: $E_{bn}/A = \\frac{492.26\\text{ MeV}}{56} = 8.79\\text{ MeV/nucleon}$."
      ],
      "result": "E_{bn}/A = 8.79\\text{ MeV/nucleon} \\; (\\text{Most tightly bound nucleus in nature})"
    },
    "verificationProblem": "Check stability bracket: $E_{bn}/A$ for Fe is in the range $8.75 - 8.8\\text{ MeV/nucleon}$. Matches experimental standard.",
    "realWorldUse": "Nuclear power generation via Pressurized Water Reactors (PWR), carbon-14 dating of archaeological artifacts, PET scan radioisotopes ($^{18}\\text{F}$).",
    "diagramType": "binding-energy-per-nucleon-curve"
  },
  "CBSE-CH-G12-PHY-CH14": {
    "chapterTitle": "Semiconductor Electronics: Materials, Devices and Simple Circuits",
    "subject": "Physics",
    "grade": 12,
    "chapterNum": 14,
    "essentialLaw": "n_e n_h = n_i^2 \\quad | \\quad I = I_e + I_h = e A(n_e v_e + n_h v_h) \\quad | \\quad I_{\\text{diode}} = I_0\\left(e^{\\frac{eV}{k_B T}} - 1\\right)",
    "coreConcepts": [
      {
        "heading": "Energy Bands, Intrinsic & Extrinsic Semiconductors",
        "bullets": [
          "Energy Band Theory: Valence band, conduction band, and forbidden energy gap $E_g$; Conductors ($E_g = 0$), Semiconductors ($E_g < 3\\text{ eV}$, Si $= 1.1\\text{ eV}$, Ge $= 0.7\\text{ eV}$), Insulators ($E_g > 3\\text{ eV}$, Diamond $= 5.4\\text{ eV}$).",
          "Intrinsic Semiconductors: Pure Si/Ge; Carrier concentrations equal: $n_e = n_h = n_i$; Electrical conductivity $\\sigma = e(n_e \\mu_e + n_h \\mu_h)$.",
          "n-type Semiconductor: Doped with pentavalent impurities (P, As, Sb); Majority carriers are electrons ($n_e \\gg n_h$).",
          "p-type Semiconductor: Doped with trivalent impurities (B, Al, In); Majority carriers are holes ($n_h \\gg n_e$); Mass Action Law holds: $n_e n_h = n_i^2$."
        ]
      },
      {
        "heading": "p-n Junction Diode, Rectifiers & Optoelectronic Devices",
        "bullets": [
          "p-n Junction formation: Diffusion of majority carriers creates space charge depletion region and built-in potential barrier $V_0$ ($0.7\\text{ V}$ for Si, $0.3\\text{ V}$ for Ge).",
          "Forward Bias: p connected to $+$, n to $-$; Depletion width decreases; Diffusion current dominates.",
          "Reverse Bias: p connected to $-$, n to $+$; Depletion width increases; Tiny drift current ($I_s \\sim \\mu\\text{A}$ or $\\text{nA}$) dominates.",
          "Rectifiers: Half-wave rectifier (1 diode, ripple frequency $f_{\\text{out}} = f_{\\text{in}}$, max efficiency $40.6\\%$); Full-wave center-tapped/bridge rectifier (2/4 diodes, $f_{\\text{out}} = 2 f_{\\text{in}}$, max efficiency $81.2\\%$).",
          "Optoelectronic Devices: Photodiode (reverse bias), LED (forward bias, direct bandgap GaAsP), Solar Cell (unbiased generating photo-voltage)."
        ]
      }
    ],
    "examTraps": [
      "Believing n-type or p-type semiconductors have a net electrical charge (both are strictly electrically neutral).",
      "Forgetting that full-wave rectifier output ripple frequency is DOUBLE the input AC frequency ($2f$)."
    ],
    "quickMentalCheck": "If input AC frequency to a full-wave rectifier is $50\\text{ Hz}$, what is the output ripple frequency? $f_{\\text{out}} = 2 \\times 50 = 100\\text{ Hz}$.",
    "cueQuestions": [
      "How does the depletion layer and built-in potential barrier form across an unbiased p-n junction?",
      "Why is a photodiode operated in reverse bias rather than forward bias to detect optical signals?",
      "How does a capacitor filter convert pulsating DC from a rectifier into smooth continuous DC?"
    ],
    "workedExample": {
      "problem": "In a half-wave rectifier, an AC supply of $220\\text{ V}$ RMS is connected to a step-down transformer of turns ratio $10:1$. If the diode has forward resistance $r_f = 10\\,\\Omega$ and load resistance $R_L = 990\\,\\Omega$, find peak output voltage and peak load current.",
      "steps": [
        "Secondary RMS voltage: $V_{s,\\text{rms}} = \\frac{220}{10} = 22\\text{ V}$.",
        "Peak secondary voltage: $V_m = V_{s,\\text{rms}} \\times \\sqrt{2} = 22 \\times 1.414 = 31.11\\text{ V}$.",
        "Total forward resistance during conduction: $R_{\\text{total}} = r_f + R_L = 10 + 990 = 1000\\,\\Omega$.",
        "Peak load current: $I_m = \\frac{V_m}{R_{\\text{total}}} = \\frac{31.11\\text{ V}}{1000\\,\\Omega} = 31.11\\text{ mA}$.",
        "Peak output voltage across $R_L$: $V_{L,\\text{peak}} = I_m R_L = (31.11 \\times 10^{-3})(990) \\approx 30.80\\text{ V}$."
      ],
      "result": "I_m = 31.11\\text{ mA}, \\quad V_{L,\\text{peak}} = 30.80\\text{ V}"
    },
    "verificationProblem": "Check voltage drop partition: Diode drop $= I_m r_f = 0.31\\text{ V}$; Load drop $= 30.80\\text{ V}$; Total $= 31.11\\text{ V} = V_m$. KVL holds.",
    "realWorldUse": "Microprocessors with billions of FinFET silicon transistors, AC-to-DC smartphone power adapters, optocouplers in industrial galvanic isolation.",
    "diagramType": "pn-junction-diode-iv-characteristics"
  },
  "CBSE-CH-G12-CHEM-CH01": {
    "chapterTitle": "Solutions",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 1,
    "essentialLaw": "P_A = P_A^\\circ x_A \\quad | \\quad \\Delta T_b = i K_b m \\quad | \\quad \\Delta T_f = i K_f m \\quad | \\quad \\pi = i C R T \\quad | \\quad i = 1 + (n-1)\\alpha",
    "coreConcepts": [
      {
        "heading": "Raoult's Law & Ideal vs Non-Ideal Solutions",
        "bullets": [
          "Henry's Law: $p = K_H x$ (Gas solubility in liquids decreases with increasing temperature).",
          "Raoult's Law: For volatile liquid solutions, partial vapour pressure $P_A = P_A^\\circ x_A$; Total pressure $P = P_A + P_B = P_A^\\circ + (P_B^\\circ - P_A^\\circ)x_B$.",
          "Ideal Solutions: $\\Delta H_{\\text{mix}} = 0, \\Delta V_{\\text{mix}} = 0$, $A-B$ intermolecular forces equal $A-A$ and $B-B$ (e.g., Benzene + Toluene, n-hexane + n-heptane).",
          "Non-Ideal Solutions: Positive deviation ($\\Delta H_{\\text{mix}} > 0$, e.g., Ethanol + Acetone, forms minimum boiling azeotropes); Negative deviation ($\\Delta H_{\\text{mix}} < 0$, e.g., Chloroform + Acetone, forms maximum boiling azeotropes)."
        ]
      },
      {
        "heading": "Colligative Properties & Van't Hoff Factor",
        "bullets": [
          "Relative Lowering of Vapour Pressure: $\\frac{P_A^\\circ - P_A}{P_A^\\circ} = i x_B = i \\frac{n_B}{n_A}$.",
          "Elevation in Boiling Point: $\\Delta T_b = i K_b m$ (where $K_b$ is ebullioscopic constant, molal elevation constant).",
          "Depression in Freezing Point: $\\Delta T_f = i K_f m$ (where $K_f$ is cryoscopic constant).",
          "Osmotic Pressure: $\\pi = i C R T = i \\frac{n_B}{V} R T$ (Best colligative property for determining molar mass of polymers and proteins).",
          "Van't Hoff Factor ($i$): $i = \\frac{\\text{Normal Molar Mass}}{\\text{Abnormal Molar Mass}} = \\frac{\\text{Observed Colligative Property}}{\\text{Calculated Colligative Property}}$; For dissociation: $\\alpha = \\frac{i-1}{n-1}$; For association: $\\alpha = \\frac{1-i}{1 - 1/n}$."
        ]
      }
    ],
    "examTraps": [
      "Forgetting Van't Hoff factor $i$ for ionic solutes (e.g., $i=2$ for $\\text{NaCl}$, $i=3$ for $\\text{CaCl}_2$, $i=0.5$ for benzoic acid dimerizing in benzene).",
      "Confusing Molality ($m = \\text{moles of solute} / \\text{kg of solvent}$) with Molarity ($M = \\text{moles of solute} / \\text{L of solution}$)."
    ],
    "quickMentalCheck": "Which solution has the highest boiling point: $0.1\\text{ M NaCl}$ ($i=2$), $0.1\\text{ M Glucose}$ ($i=1$), or $0.1\\text{ M Al}_2(\\text{SO}_4)_3$ ($i=5$)? $0.1\\text{ M Al}_2(\\text{SO}_4)_3$ because $i \\times C = 0.5\\text{ M}$ is maximum.",
    "cueQuestions": [
      "Why is osmotic pressure measurement preferred over freezing point depression for determining the molecular weights of biomolecules?",
      "How does Henry constant $K_H$ explain decompression sickness (the bends) in scuba divers?",
      "Why do azeotropic liquid mixtures distill at constant boiling point without changing vapor composition?"
    ],
    "workedExample": {
      "problem": "$45\\text{ g}$ of ethylene glycol ($\\text{C}_2\\text{H}_6\\text{O}_2$, molar mass $= 62\\text{ g/mol}$) is mixed with $600\\text{ g}$ of water. Calculate the freezing point depression $\\Delta T_f$ and the freezing point of the solution. ($K_f = 1.86\\text{ K}\\cdot\\text{kg/mol}$).",
      "steps": [
        "Moles of ethylene glycol: $n_B = \\frac{45\\text{ g}}{62\\text{ g/mol}} = 0.7258\\text{ mol}$.",
        "Mass of solvent water in kg: $w_A = 600\\text{ g} = 0.600\\text{ kg}$.",
        "Molality of solution: $m = \\frac{n_B}{w_A} = \\frac{0.7258}{0.600} = 1.2097\\text{ mol/kg}$.",
        "Calculate $\\Delta T_f$: $\\Delta T_f = K_f \\times m = 1.86 \\times 1.2097 = 2.25\\text{ K}$.",
        "Freezing point of solution: $T_f = T_f^\\circ - \\Delta T_f = 273.15\\text{ K} - 2.25\\text{ K} = 270.90\\text{ K} = -2.25^\\circ\\text{C}$."
      ],
      "result": "\\Delta T_f = 2.25\\text{ K}, \\quad T_f = 270.90\\text{ K} = -2.25^\\circ\\text{C}"
    },
    "verificationProblem": "Check antifreeze scaling: $\\Delta T_f = 1.86 \\times \\frac{45 \\times 1000}{62 \\times 600} = \\frac{83700}{37200} = 2.25\\text{ K}$. Exact arithmetic verified.",
    "realWorldUse": "Ethylene glycol automotive engine antifreeze coolant, reverse osmosis desalination of seawater for drinking water, isotonic saline IV drip formulations.",
    "diagramType": "solution-vapour-pressure-azeotrope"
  },
  "CBSE-CH-G12-CHEM-CH02": {
    "chapterTitle": "Electrochemistry",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 2,
    "essentialLaw": "E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log_{10} Q \\quad | \\quad \\Delta G^\\circ = -n F E^\\circ_{\\text{cell}} \\quad | \\quad \\Lambda_m = \\frac{\\kappa \\times 1000}{M} \\quad | \\quad \\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ",
    "coreConcepts": [
      {
        "heading": "Galvanic Cells, Nernst Equation & Gibbs Free Energy",
        "bullets": [
          "Galvanic (Daniell) Cell: Anode (Oxidation, negative polarity: $\\text{Zn} \\to \\text{Zn}^{2+} + 2e^-$), Cathode (Reduction, positive polarity: $\\text{Cu}^{2+} + 2e^- \\to \\text{Cu}$); $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = +1.10\\text{ V}$.",
          "Nernst Equation at $298\\text{ K}$: $E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{2.303 R T}{n F} \\log_{10} Q = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n} \\log_{10}\\frac{[\\text{Products}]}{[\\text{Reactants}]}$.",
          "Thermodynamic relationships: $\\Delta G^\\circ = -n F E^\\circ_{\\text{cell}} = -2.303 R T \\log_{10} K_c$ (Spontaneous cell reaction requires $E_{\\text{cell}} > 0, \\Delta G < 0$)."
        ]
      },
      {
        "heading": "Conductance, Kohlrausch's Law & Electrolysis",
        "bullets": [
          "Conductivity ($\\kappa = 1/\\rho = \\frac{l}{A} \\cdot G$) decreases upon dilution because number of current-carrying ions per unit volume decreases.",
          "Molar Conductivity: $\\Lambda_m = \\frac{\\kappa \\times 1000}{M}$ increases upon dilution (for strong electrolytes due to decreased interionic attraction; for weak electrolytes due to increased degree of dissociation $\\alpha$).",
          "Kohlrausch's Law of Independent Migration: Limiting molar conductivity $\\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ$; Degree of dissociation: $\\alpha = \\frac{\\Lambda_m}{\\Lambda_m^\\circ}$, Dissociation constant $K_a = \\frac{C\\alpha^2}{1-\\alpha}$.",
          "Faraday's Laws of Electrolysis: $m = Z I t = \\left(\\frac{M}{n F}\\right) I t$; Secondary batteries (Lead storage battery: $\\text{Pb} + \\text{PbO}_2 + 2\\text{H}_2\\text{SO}_4 \\rightleftharpoons 2\\text{PbSO}_4 + 2\\text{H}_2\\text{O}$); Fuel cells ($\text{H}_2-\\text{O}_2$ with $70\\%$ efficiency)."
        ]
      }
    ],
    "examTraps": [
      "Stating that conductivity $\\kappa$ increases upon dilution (conductivity $\\kappa$ DECREASES, while molar conductivity $\\Lambda_m$ INCREASES on dilution).",
      "Inverting $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}$ by using oxidation potentials instead of standard IUPAC reduction potentials."
    ],
    "quickMentalCheck": "How many Faradays of charge are required to reduce $1\\text{ mole}$ of $\\text{MnO}_4^-$ to $\\text{Mn}^{2+}$ in acidic medium? $\\text{Mn}^{+7} + 5e^- \\to \\text{Mn}^{+2}$, so exactly $5\\text{ F} = 5 \\times 96500\\text{ C}$.",
    "cueQuestions": [
      "How does a salt bridge maintain electrical neutrality and prevent junction potential in a galvanic cell?",
      "How is Kohlrausch Law applied to determine the limiting molar conductivity of weak electrolytes like $\\text{CH}_3\\text{COOH}$?",
      "What are the chemical reactions occurring at the anode and cathode during the recharging of a lead storage battery?"
    ],
    "workedExample": {
      "problem": "Calculate the EMF of the cell at $298\\text{ K}$: $\\text{Mg}(s) | \\text{Mg}^{2+}(0.001\\text{ M}) || \\text{Cu}^{2+}(0.0001\\text{ M}) | \\text{Cu}(s)$. Given: $E^\\circ(\\text{Mg}^{2+}/\\text{Mg}) = -2.37\\text{ V}$ and $E^\\circ(\\text{Cu}^{2+}/\\text{Cu}) = +0.34\\text{ V}$.",
      "steps": [
        "Calculate standard cell potential: $E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 0.34 - (-2.37) = +2.71\\text{ V}$.",
        "Cell reaction: $\\text{Mg}(s) + \\text{Cu}^{2+}(aq) \\to \\text{Mg}^{2+}(aq) + \\text{Cu}(s)$ with $n = 2$ electrons transferred.",
        "Reaction quotient: $Q = \\frac{[\\text{Mg}^{2+}]}{[\\text{Cu}^{2+}]} = \\frac{10^{-3}}{10^{-4}} = 10$.",
        "Apply Nernst equation: $E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{0.0591}{2}\\log_{10}(10) = 2.71 - \\frac{0.0591}{2}(1) = 2.71 - 0.02955 = 2.68\\text{ V}$."
      ],
      "result": "E_{\\text{cell}} = 2.68\\text{ V}"
    },
    "verificationProblem": "Check sign of $\\Delta G$: $\\Delta G = -n F E_{\\text{cell}} = -2(96500)(2.68) = -517.2\\text{ kJ/mol} < 0$. Highly spontaneous forward cell reaction verified.",
    "realWorldUse": "Lithium-ion batteries in smartphones and electric vehicles, hydrogen fuel cells in zero-emission buses, sacrificial zinc anode corrosion protection on ship hulls.",
    "diagramType": "galvanic-cell-nernst-electrochemical"
  },
  "CBSE-CH-G12-CHEM-CH03": {
    "chapterTitle": "Chemical Kinetics",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 3,
    "essentialLaw": "k = \\frac{2.303}{t}\\log_{10}\\left(\\frac{[A]_0}{[A]}\right) \\quad | \\quad t_{1/2} = \\frac{0.693}{k} \\; (\\text{1st Order}) \\quad | \\quad k = A e^{-E_a / RT} \\quad | \\quad \\log_{10}\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)",
    "coreConcepts": [
      {
        "heading": "Rate of Reaction, Order, Molecularity & Integrated Rate Laws",
        "bullets": [
          "Average & Instantaneous Rate: $\\text{Rate} = -\\frac{1}{a}\\frac{d[A]}{dt} = +\\frac{1}{b}\\frac{d[B]}{dt}$ for $aA \\to bB$.",
          "Order vs Molecularity: Order is experimental sum of power exponents in rate law (can be $0, 1, 2$, fractional or negative); Molecularity is theoretical integer number of colliding species in an elementary step (cannot be 0 or fractional, $\\le 3$).",
          "Zero-Order Reaction: $[A] = [A]_0 - k t$; $t_{1/2} = \\frac{[A]_0}{2k}$ (Half-life directly proportional to initial concentration; Units of $k$: $\\text{mol}\\cdot\\text{L}^{-1}\\text{s}^{-1}$).",
          "First-Order Reaction: $k = \\frac{2.303}{t}\\log_{10}\\frac{[A]_0}{[A]}$; $t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k}$ (Half-life is strictly independent of initial concentration; Units of $k$: $\\text{s}^{-1}$).",
          "Pseudo-First Order: Reactions where one reactant is in large excess (e.g., acid hydrolysis of ethyl acetate, inversion of cane sugar)."
        ]
      },
      {
        "heading": "Arrhenius Equation, Activation Energy & Collision Theory",
        "bullets": [
          "Arrhenius Equation: $k = A e^{-E_a / R T}$ where $E_a$ is activation energy and $A$ is pre-exponential frequency factor.",
          "Linear form: $\\ln k = \\ln A - \\frac{E_a}{R T} \\implies \\log_{10}\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$.",
          "Temperature Coefficient: Reaction rate approximately doubles or triples for every $10^\\circ\\text{C}$ rise in temperature due to increase in fraction of molecules with energy $\\ge E_a$.",
          "Collision Theory: Rate $= Z_{AB} \\rho e^{-E_a/RT}$ (Effective collisions require both threshold energy and proper steric orientation)."
        ]
      }
    ],
    "examTraps": [
      "Deducing reaction order directly from stoichiometric coefficients of a balanced overall equation without elementary step mechanism.",
      "Using the first-order half-life formula ($0.693/k$) for zero-order reactions ($[A]_0/2k$)."
    ],
    "quickMentalCheck": "For a first-order reaction with $k = 0.0693\\text{ min}^{-1}$, what is the half-life and time for $75\\%$ completion? $t_{1/2} = 0.693/0.0693 = 10\\text{ min}$; $t_{75\\%} = 2 \\times t_{1/2} = 20\\text{ min}$.",
    "cueQuestions": [
      "Why is half-life of a first-order chemical reaction completely independent of initial reactant concentration?",
      "How does a positive catalyst lower activation energy $E_a$ without altering equilibrium constant $K_c$ or $\\Delta G$?",
      "What is the physical meaning of the pre-exponential factor $A$ in the Arrhenius equation?"
    ],
    "workedExample": {
      "problem": "The rate constants of a reaction at $500\\text{ K}$ and $700\\text{ K}$ are $0.02\\text{ s}^{-1}$ and $0.07\\text{ s}^{-1}$ respectively. Calculate the values of $E_a$ and $A$. ($R = 8.314\\text{ J/mol}\\cdot\\text{K}$, $\\log_{10}(3.5) \\approx 0.544$).",
      "steps": [
        "Apply Arrhenius two-temperature equation: $\\log_{10}\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{2.303 R}\\left(\\frac{T_2 - T_1}{T_1 T_2}\\right)$.",
        "Substitute: $\\log_{10}\\left(\\frac{0.07}{0.02}\\right) = \\log_{10}(3.5) = 0.544$.",
        "$0.544 = \\frac{E_a}{2.303 \\times 8.314}\\left(\\frac{700 - 500}{500 \\times 700}\\right) = \\frac{E_a}{19.147}\\left(\\frac{200}{350000}\\right) = \\frac{E_a}{19.147} \\times 5.714 \\times 10^{-4}$.",
        "Solve for $E_a$: $E_a = \\frac{0.544 \\times 19.147}{5.714 \\times 10^{-4}} = \\frac{10.416}{5.714 \\times 10^{-4}} \\approx 18228\\text{ J/mol} = 18.23\\text{ kJ/mol}$."
      ],
      "result": "E_a = 18.23\\text{ kJ/mol}"
    },
    "verificationProblem": "Check $k_2/k_1$: $\\frac{k_2}{k_1} = 0.07/0.02 = 3.5$. Exponential factor $e^{-\\frac{E_a}{R}(1/700 - 1/500)} = e^{0.0005714 \\times 2192} = e^{1.252} = 3.50$. Exact match.",
    "realWorldUse": "Pharmaceutical drug shelf-life expiration dating (Arrhenius degradation modeling), catalytic converter reaction optimization in automobiles, nuclear radioactive waste decay kinetics.",
    "diagramType": "arrhenius-energy-barrier-activation"
  },
  "CBSE-CH-G12-CHEM-CH04": {
    "chapterTitle": "The d- and f- Block Elements",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 4,
    "essentialLaw": "\\mu_{\\text{spin}} = \\sqrt{n(n+2)}\\text{ BM} \\quad | \\quad 2\\text{MnO}_4^- + 5\\text{C}_2\\text{O}_4^{2-} + 16\\text{H}^+ \\to 2\\text{Mn}^{2+} + 10\\text{CO}_2 + 8\\text{H}_2\\text{O} \\quad | \\quad \\text{Cr}_2\\text{O}_7^{2-} + 14\\text{H}^+ + 6e^- \\to 2\\text{Cr}^{3+} + 7\\text{H}_2\\text{O}",
    "coreConcepts": [
      {
        "heading": "Transition Metals (d-block): Electronic Configurations & Properties",
        "bullets": [
          "General electronic configuration: $(n-1)d^{1-10} ns^{1-2}$; Anomalous configurations: $\\text{Cr} ([\\text{Ar}]3d^5 4s^1)$ and $\\text{Cu} ([\\text{Ar}]3d^{10} 4s^1)$ due to half-filled and fully-filled orbital exchange stability.",
          "Variable Oxidation States: Arise because $(n-1)d$ and $ns$ electrons have comparable energies; $\\text{Mn}$ exhibits highest oxidation states ($+2$ to $+7$).",
          "Magnetic Properties: Spin-only magnetic moment $\\mu = \\sqrt{n(n+2)}\\text{ BM}$ where $n$ is number of unpaired $d$-electrons.",
          "Catalytic & Color Properties: Color arises from $d-d$ electronic transitions in ligand crystal fields; Catalytic activity arises from variable oxidation states and vacant $d$-orbitals (e.g., $\\text{V}_2\\text{O}_5$, finely divided $\\text{Fe}$)."
        ]
      },
      {
        "heading": "Inner Transition Metals (f-block), Lanthanoid Contraction & Potassium Salts",
        "bullets": [
          "Lanthanoid Contraction: Steady decrease in atomic and ionic radii from $\\text{La}^{3+}$ to $\\text{Lu}^{3+}$ due to poor shielding by $4f$ electrons; Causes 4d and 5d series elements (e.g., $\\text{Zr}/\\text{Hf}, \\text{Nb}/\\text{Ta}$) to have almost identical atomic radii and chemical properties.",
          "Actinoids: General configuration $5f^{1-14} 6d^{0-1} 7s^2$; Display wider range of oxidation states ($+3$ to $+7$) because $5f, 6d, 7s$ energy levels are comparable.",
          "Potassium Permanganate ($\\text{KMnO}_4$): Dark purple crystals (charge transfer transition, not $d-d$ since $\\text{Mn}^{+7}$ is $d^0$); Strong oxidizing agent in acidic ($n=5$), neutral ($n=3$), and basic ($n=1$) media.",
          "Potassium Dichromate ($\\text{K}_2\\text{Cr}_2\\text{O}_7$): Orange crystals, interconverts to yellow chromate in alkali: $\\text{Cr}_2\\text{O}_7^{2-} + 2\\text{OH}^- \\rightleftharpoons 2\\text{CrO}_4^{2-} + \\text{H}_2\\text{O}$."
        ]
      }
    ],
    "examTraps": [
      "Explaining the purple color of $\\text{KMnO}_4$ via $d-d$ transitions ($\\text{Mn}^{+7}$ has $3d^0$ configuration; color is due to Oxygen-to-Manganese Ligand-to-Metal Charge Transfer, LMCT).",
      "Forgetting that $\\text{Zn}, \\text{Cd}, \\text{Hg}$ are d-block elements but NOT transition elements because they have completely filled $(n-1)d^{10}$ shells in both elemental and common ionic states."
    ],
    "quickMentalCheck": "Calculate the spin-only magnetic moment of $\\text{Fe}^{3+}$ ($Z=26$). $\\text{Fe}^{3+} = [\\text{Ar}]3d^5 \\implies n = 5$ unpaired electrons; $\\mu = \\sqrt{5(7)} = \\sqrt{35} \\approx 5.92\\text{ BM}$.",
    "cueQuestions": [
      "What causes Lanthanoid Contraction and what are its two major chemical consequences?",
      "Why do transition elements form interstitial compounds and alloys so readily?",
      "How does pH change affect the equilibrium between chromate ($\\text{CrO}_4^{2-}$) and dichromate ($\\text{Cr}_2\\text{O}_7^{2-}$)?"
    ],
    "workedExample": {
      "problem": "Write balanced ionic equations for the reaction of acidified potassium permanganate ($\\text{KMnO}_4$) with (a) Iron(II) ions ($\\text{Fe}^{2+}$), and (b) Oxalate ions ($\\text{C}_2\\text{O}_4^{2-}$).",
      "steps": [
        "Reduction half-reaction of permanganate in acid: $\\text{MnO}_4^- + 8\\text{H}^+ + 5e^- \\to \\text{Mn}^{2+} + 4\\text{H}_2\\text{O}$.",
        "(a) Oxidation of $\\text{Fe}^{2+}$: $\\text{Fe}^{2+} \\to \\text{Fe}^{3+} + e^-$. Multiply by 5 and add: $\\text{MnO}_4^- + 5\\text{Fe}^{2+} + 8\\text{H}^+ \\to \\text{Mn}^{2+} + 5\\text{Fe}^{3+} + 4\\text{H}_2\\text{O}$.",
        "(b) Oxidation of oxalate: $\\text{C}_2\\text{O}_4^{2-} \\to 2\\text{CO}_2 + 2e^-$. Multiply permanganate half by 2 and oxalate by 5: $2\\text{MnO}_4^- + 5\\text{C}_2\\text{O}_4^{2-} + 16\\text{H}^+ \\to 2\\text{Mn}^{2+} + 10\\text{CO}_2 + 8\\text{H}_2\\text{O}$."
      ],
      "result": "2\\text{MnO}_4^- + 5\\text{C}_2\\text{O}_4^{2-} + 16\\text{H}^+ \\to 2\\text{Mn}^{2+} + 10\\text{CO}_2 + 8\\text{H}_2\\text{O}"
    },
    "verificationProblem": "Check charge balance: LHS $= 2(-1) + 5(-2) + 16(+1) = -2 - 10 + 16 = +4$. RHS $= 2(+2) = +4$. Mass and charge balance verified.",
    "realWorldUse": "Haber process ammonia synthesis iron catalysts, titanium aircraft alloys, neodymium permanent magnets in electric vehicle motors.",
    "diagramType": "lanthanoid-contraction-atomic-radii"
  },
  "CBSE-CH-G12-CHEM-CH05": {
    "chapterTitle": "Coordination Compounds",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 5,
    "essentialLaw": "\\text{CFSE}_{\\text{oct}} = (-0.4 t_{2g} + 0.6 e_g)\\Delta_o + n_p P \\quad | \\quad \\Delta_t = \\frac{4}{9}\\Delta_o \\quad | \\quad \\mu = \\sqrt{n(n+2)}\\text{ BM}",
    "coreConcepts": [
      {
        "heading": "Werner's Theory, IUPAC Nomenclature & Isomerism",
        "bullets": [
          "Werner's Postulates: Primary valency (ionizable, corresponds to oxidation state); Secondary valency (non-ionizable, fixed coordinate bonds, corresponds to coordination number and geometry).",
          "IUPAC Rules: Ligands named alphabetically before metal; Anionic ligands end in -o (chlorido, cyanido); Cationic/neutral complexes keep normal metal name; Anionic complex adds suffix -ate (ferrate, cuprate); Oxidation state written in Roman numerals in parentheses.",
          "Structural Isomerism: Ionization, Hydrate, Linkage (ambidentate ligands: $\\text{NO}_2^-/\\text{ONO}^-, \\text{SCN}^-/\\text{NCS}^-$), Coordination.",
          "Stereoisomerism: Geometrical (cis/trans in $[\\text{Pt}(\\text{NH}_3)_2\\text{Cl}_2]$ and $[\\text{Co}(\\text{NH}_3)_4\\text{Cl}_2]^+$, fac/mer in $[\\text{Co}(\\text{NH}_3)_3(\\text{NO}_2)_3]$); Optical (d/l enantiomers in $[\\text{Co}(\\text{en})_3]^{3+}$ and cis-$[\\text{Co}(\\text{en})_2\\text{Cl}_2]^+$)."
        ]
      },
      {
        "heading": "Valence Bond Theory (VBT) & Crystal Field Theory (CFT)",
        "bullets": [
          "VBT: Hybridization determines geometry ($sp^3$: tetrahedral, $dsp^2$: square planar, $sp^3d^2$: outer orbital octahedral high spin, $d^2sp^3$: inner orbital octahedral low spin).",
          "CFT Octahedral Splitting: Degenerate $d$-orbitals split into lower $t_{2g}$ ($d_{xy}, d_{yz}, d_{zx}$) and higher $e_g$ ($d_{x^2-y^2}, d_{z^2}$) by energy $\\Delta_o$.",
          "Spectrochemical Series: Strong field ligands ($\\text{CN}^- > \\text{CO} > \\text{en} > \\text{NH}_3$) produce large $\\Delta_o > P$ (pairing occurs $\\to$ low spin); Weak field ligands ($\\text{I}^- < \\text{Br}^- < \\text{Cl}^- < \\text{F}^- < \\text{H}_2\\text{O}$) produce small $\\Delta_o < P$ (high spin).",
          "Tetrahedral Splitting: $\\Delta_t = \\frac{4}{9}\\Delta_o$ ($e$ lower, $t_2$ higher; strictly high-spin due to small $\\Delta_t$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming trans-$[\\text{Co}(\\text{en})_2\\text{Cl}_2]^+$ has optical isomers (the trans isomer has a plane of symmetry and is strictly optically inactive / meso; only cis is chiral).",
      "Forgetting that tetrahedral complexes NEVER form low-spin complexes because $\\Delta_t = \\frac{4}{9}\\Delta_o$ is always smaller than pairing energy $P$."
    ],
    "quickMentalCheck": "Is $[\\text{Ni}(\\text{CN})_4]^{2-}$ diamagnetic or paramagnetic? $\\text{Ni}^{2+} = 3d^8$; $\\text{CN}^-$ is strong field causing pairing $\\implies dsp^2$ square planar, 0 unpaired electrons $\\implies$ Diamagnetic.",
    "cueQuestions": [
      "How does Crystal Field Theory explain the optical absorption and brilliant colors of transition metal complexes?",
      "Why does $[\\text{Fe}(\\text{CN})_6]^{3-}$ form an inner-orbital low-spin complex while $[\\text{FeF}_6]^{3-}$ forms an outer-orbital high-spin complex?",
      "How does EDTA (hexadentate chelating ligand) effectively treat acute lead poisoning in chelation therapy?"
    ],
    "workedExample": {
      "problem": "Write the IUPAC name, hybridization, magnetic nature, and Crystal Field Stabilization Energy (CFSE) of $[\\text{Co}(\\text{NH}_3)_6]^{3+}$. ($Z_{\\text{Co}} = 27$).",
      "steps": [
        "Oxidation state of Cobalt: $x + 6(0) = +3 \\implies x = +3$. IUPAC Name: Hexaamminecobalt(III) ion.",
        "Electronic configuration: $\\text{Co} = [\\text{Ar}]3d^7 4s^2 \\implies \\text{Co}^{3+} = [\\text{Ar}]3d^6$.",
        "$\\text{NH}_3$ is a strong field ligand for $\\text{Co}^{3+}$, causing $\\Delta_o > P$. All 6 electrons pair up into $t_{2g}$ orbitals: $t_{2g}^6 e_g^0$.",
        "Hybridization: Two vacant $3d$, one $4s$, and three $4p$ orbitals hybridize to form $d^2sp^3$ (Inner orbital octahedral).",
        "Magnetic nature: All electrons are paired ($n = 0$) $\\implies$ Diamagnetic ($\\mu = 0$).",
        "CFSE calculation: $\\text{CFSE} = (-0.4 \\times 6 + 0.6 \\times 0)\\Delta_o + 2P = -2.4\\Delta_o + 2P$."
      ],
      "result": "\\text{Hexaamminecobalt(III) ion}, \\quad d^2sp^3 \\; (\\text{Diamagnetic}), \\quad \\text{CFSE} = -2.4\\Delta_o"
    },
    "verificationProblem": "Check unpaired electrons: $t_{2g}^6 e_g^0$ has 0 unpaired electrons. $\\mu_{\\text{spin}} = \\sqrt{0(2)} = 0\\text{ BM}$. Diamagnetism verified.",
    "realWorldUse": "Cisplatin $[\\text{Pt}(\\text{NH}_3)_2\\text{Cl}_2]$ chemotherapy drug, Wilkinson catalyst $[\\text{Rh}(\\text{PPh}_3)_3\\text{Cl}]$ for industrial alkene hydrogenation, chlorophyll (Mg complex).",
    "diagramType": "crystal-field-octahedral-splitting"
  },
  "CBSE-CH-G12-CHEM-CH06": {
    "chapterTitle": "Haloalkanes and Haloarenes",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 6,
    "essentialLaw": "\\text{Rate}_{S_N2} = k[\\text{RX}][\\text{Nu}^-] \\; (1^\\circ > 2^\\circ > 3^\\circ, \\; \\text{Walden Inversion}) \\quad | \\quad \\text{Rate}_{S_N1} = k[\\text{RX}] \\; (3^\\circ > 2^\\circ > 1^\\circ, \\; \\text{Racemization})",
    "coreConcepts": [
      {
        "heading": "Nucleophilic Substitution Mechanisms: $S_N1$ vs $S_N2$",
        "bullets": [
          "$S_N2$ Mechanism: Single-step bimolecular; Backside attack by strong nucleophile through pentacoordinated transition state; 100% Walden Inversion of configuration; Reactivity order: Methyl $> 1^\\circ > 2^\\circ > 3^\\circ$ (Steric hindrance governs rate).",
          "$S_N1$ Mechanism: Two-step unimolecular; Rate-determining carbocation intermediate formation followed by nucleophile attack from front or rear; Leads to partial racemization; Reactivity order: $3^\\circ > 2^\\circ > 1^\\circ > \\text{Methyl}$ (Carbocation stability governs rate: Allylic/Benzylic $> 3^\\circ > 2^\\circ > 1^\\circ$).",
          "Elimination Reactions: Saytzeff (Zaitsev) Rule: Dehydrohalogenation by alcoholic KOH produces the more substituted, stable alkene as major product."
        ]
      },
      {
        "heading": "Haloarenes, Nucleophilic Inertness & Polyhalogen Compounds",
        "bullets": [
          "Low reactivity of Haloarenes toward nucleophilic substitution due to: 1. Resonance stabilization (partial double bond character of C-X bond); 2. $sp^2$ hybridized carbon (shorter, stronger bond); 3. Instability of phenyl cation; 4. Electronic repulsion between electron-rich arene and approaching nucleophile.",
          "Drastic conditions required for chlorobenzene substitution: Dow Process ($623\\text{ K}, 300\\text{ atm}$) to form phenol; Strongly activated by electron-withdrawing groups ($-NO_2$) at ortho and para positions.",
          "Electrophilic Aromatic Substitution: Halogens are ortho/para-directing due to $+M$ resonance, but deactivating due to strong $-I$ inductive effect.",
          "Polyhalogen Compounds: Chloroform ($\text{CHCl}_3$, oxidizes to poisonous phosgene $\text{COCl}_2$ in air), Iodoform ($\text{CHI}_3$, antiseptic), Freons (CFCs causing ozone layer depletion)."
        ]
      }
    ],
    "examTraps": [
      "Confusing aqueous KOH ($S_N$ substitution to give alcohol) with alcoholic KOH ($\beta$-elimination to give alkene).",
      "Thinking haloarenes are meta-directing because halogen is deactivating (halogens are ortho/para-directing despite being net ring-deactivating)."
    ],
    "quickMentalCheck": "Which reacts faster in $S_N2$: 1-chlorobutane or 2-chlorobutane? 1-chlorobutane ($1^\\circ$ alkyl halide has minimal steric hindrance).",
    "cueQuestions": [
      "Why do allylic and benzylic halides show high reactivity in both $S_N1$ and $S_N2$ pathways?",
      "Why is chlorobenzene extremely inert toward nucleophilic substitution compared to chloroethane?",
      "How does the presence of $-NO_2$ groups at ortho and para positions dramatically accelerate nucleophilic aromatic substitution?"
    ],
    "workedExample": {
      "problem": "Predict the major alkene product when 2-bromopentane is heated with alcoholic potassium hydroxide (KOH). State the governing rule.",
      "steps": [
        "Structure: $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}(\\text{Br})-\\text{CH}_3$.",
        "Alcoholic KOH causes $\\beta$-elimination (dehydrohalogenation) of $\\text{HBr}$.",
        "Two possible $\\beta$-hydrogens: Removal from $\\text{C}_1$ yields Pent-1-ene ($\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}=\\text{CH}_2$, disubstituted/monosubstituted, minor).",
        "Removal from $\\text{C}_3$ yields Pent-2-ene ($\\text{CH}_3-\\text{CH}_2-\\text{CH}=\\text{CH}-\\text{CH}_3$, disubstituted with 5 hyperconjugative hydrogens, major).",
        "Apply Saytzeff (Zaitsev) Rule: The more highly substituted alkene is the more stable and thermodynamically preferred major product."
      ],
      "result": "\\text{Major Product: Pent-2-ene (81\\%)}, \\quad \\text{Minor Product: Pent-1-ene (19\\%)}"
    },
    "verificationProblem": "Check hyperconjugation stability: Pent-2-ene has 5 $\\alpha$-hydrogens (3 on methyl, 2 on ethyl) vs Pent-1-ene with only 2 $\\alpha$-hydrogens. Saytzeff prediction confirmed.",
    "realWorldUse": "Non-stick Teflon ($\text{CF}_2=\text{CF}_2$) cookware coatings, Grignard reagent ($RMgX$) organometallic synthesis, chloroquine antimalarial drugs.",
    "diagramType": "sn2-transition-state-walden-inversion"
  },
  "CBSE-CH-G12-CHEM-CH07": {
    "chapterTitle": "Alcohols, Phenols and Ethers",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 7,
    "essentialLaw": "\\text{Lucas Test: } 3^\\circ \\; (\\text{Instant turbidity}) > 2^\\circ \\; (5\\text{ min}) > 1^\\circ \\; (\\text{Heating}) \\quad | \\quad \\text{R-O-R}' + \\text{HI} \\to \\text{R-I} + \\text{R}'-\\text{OH} \\; (S_N2 \\text{ at smaller alkyl})",
    "coreConcepts": [
      {
        "heading": "Alcohols & Phenols: Acidity, Oxidation & Distinguishing Tests",
        "bullets": [
          "Acidity: Phenol is significantly more acidic than alcohols and water ($pK_a \\approx 10$) because phenoxide ion is resonance-stabilized with negative charge delocalized over the aromatic ring; Electron-withdrawing groups ($-NO_2$, especially at ortho/para) sharply increase acidity (picric acid $pK_a = 0.38$).",
          "Lucas Test: Distinction of $1^\\circ, 2^\\circ, 3^\\circ$ alcohols with conc. $\\text{HCl} + \\text{anhydrous }\\text{ZnCl}_2$; $3^\\circ$ gives instant cloudiness, $2^\\circ$ in 5 minutes, $1^\\circ$ only on heating.",
          "Oxidation of Alcohols: $1^\\circ$ alcohol $\\xrightarrow{\\text{PCC}} \\text{Aldehyde} \\xrightarrow{\\text{KMnO}_4} \\text{Carboxylic acid}$; $2^\\circ$ alcohol $\\xrightarrow{\\text{CrO}_3} \\text{Ketone}$; $3^\\circ$ alcohol undergoes dehydration to alkene."
        ]
      },
      {
        "heading": "Named Reactions of Phenol & Williamson Ether Synthesis",
        "bullets": [
          "Kolbe Reaction: Phenol $+ \\text{NaOH} + \\text{CO}_2 \\xrightarrow{400\\text{ K}, 4-7\\text{ atm}} \\text{Salicylic acid}$ (2-hydroxybenzoic acid, precursor to aspirin).",
          "Reimer-Tiemann Reaction: Phenol $+ \\text{CHCl}_3 + 3\\text{KOH} \\to \\text{Salicylaldehyde}$ (via dichlorocarbene $:C\\text{Cl}_2$ electrophile).",
          "Williamson Ether Synthesis: $R-\\text{ONa} + R'-\\text{X} \\to R-\\text{O}-R' + \\text{NaX}$ ($S_N2$ attack; Alkyl halide MUST be $1^\\circ$; if $3^\\circ$ alkyl halide is used, alkene is formed exclusively by elimination).",
          "Ether Cleavage with HI: For unsymmetrical ethers with $1^\\circ/2^\\circ$ groups, iodide attacks smaller alkyl group via $S_N2$; If one group is $3^\\circ$ (e.g., tert-butyl methyl ether), iodide attacks $3^\\circ$ carbon via $S_N1$ to give tert-butyl iodide."
        ]
      }
    ],
    "examTraps": [
      "Using a $3^\\circ$ alkyl halide with sodium alkoxide in Williamson synthesis (gives alkene via E2 elimination, not ether).",
      "Assuming HI cleaves anisole to give iodobenzene and methanol (C-O bond to aromatic ring has partial double bond character; cleavage gives phenol and methyl iodide)."
    ],
    "quickMentalCheck": "What products are formed when anisole ($\text{C}_6\text{H}_5-\text{O}-\text{CH}_3$) is heated with concentrated $\text{HI}$? Phenol ($\text{C}_6\text{H}_5\text{OH}$) and methyl iodide ($\text{CH}_3\text{I}$).",
    "cueQuestions": [
      "Why is phenol much more acidic than ethanol, while p-nitrophenol is even more acidic than phenol?",
      "How does the Lucas reagent test distinguish between primary, secondary, and tertiary alcohols based on carbocation stability?",
      "What is the electrophilic intermediate in the Reimer-Tiemann reaction and how is it generated?"
    ],
    "workedExample": {
      "problem": "Write the mechanism and predict the products when tert-butyl methyl ether, $(\\text{CH}_3)_3\\text{C}-\\text{O}-\\text{CH}_3$, is treated with one equivalent of concentrated $\\text{HI}$.",
      "steps": [
        "Step 1 (Protonation): The ether oxygen is protonated by $\\text{HI}$ to form an oxonium ion: $(\\text{CH}_3)_3\\text{C}-\\text{O}^+(\\text{H})-\\text{CH}_3$.",
        "Step 2 (Cleavage): Since the tert-butyl group forms an exceptionally stable $3^\\circ$ carbocation ($(\\text{CH}_3)_3\\text{C}^+$) via resonance/hyperconjugation, the reaction proceeds via an $S_N1$ pathway rather than $S_N2$.",
        "Step 3 (Nucleophilic Attack): The $3^\\circ$ carbocation leaves as $(\\text{CH}_3)_3\\text{C}^+$ and is attacked by $\\text{I}^-$ to form tert-butyl iodide, leaving neutral methanol ($\text{CH}_3\text{OH}$)."
      ],
      "result": "\\text{Products: tert-Butyl iodide } [(\\text{CH}_3)_3\\text{C-I}] + \\text{Methanol } [\\text{CH}_3\\text{OH}]"
    },
    "verificationProblem": "Check $S_N1$ preference: $3^\\circ$ carbocation is far more reactive to heterolytic C-O bond cleavage than backside $S_N2$ displacement on methyl carbon. $S_N1$ product verified.",
    "realWorldUse": "Synthesis of Aspirin (acetylsalicylic acid) from salicylic acid, production of diethyl ether general anesthetic, epoxy resin hardeners.",
    "diagramType": "kolbe-reimer-tiemann-reaction-pathways"
  },
  "CBSE-CH-G12-CHEM-CH08": {
    "chapterTitle": "Aldehydes, Ketones and Carboxylic Acids",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 8,
    "essentialLaw": "\\text{Tollens: } \\text{R-CHO} + 2[\\text{Ag}(\\text{NH}_3)_2]^+ + 3\\text{OH}^- \\to \\text{R-COO}^- + 2\\text{Ag} \\downarrow + 4\\text{NH}_3 + 2\\text{H}_2\\text{O} \\quad | \\quad \\text{Iodoform: } \\text{R-COCH}_3 + 3\\text{I}_2 + 4\\text{NaOH} \\to \\text{CHI}_3 \\downarrow + \\text{R-COONa}",
    "coreConcepts": [
      {
        "heading": "Nucleophilic Addition to Carbonyl & Distinguishing Tests",
        "bullets": [
          "Carbonyl Reactivity: Aldehydes are more reactive toward nucleophilic addition than ketones due to lesser steric hindrance and lesser $+I$ electronic stabilization of the carbonyl carbon.",
          "Nucleophilic Addition-Elimination: Addition of $\\text{HCN}, \\text{NaHSO}_3, \\text{RMgX}$, and ammonia derivatives ($G-\\text{NH}_2$: hydroxylamine $\\to$ oxime, hydrazine $\\to$ hydrazone, 2,4-DNP $\\to$ yellow/orange precipitate).",
          "Tollens' Silver Mirror Test: Ammoniacal silver nitrate reduces to bright silver mirror with all aldehydes (aliphatic and aromatic); Ketones do NOT react.",
          "Fehling's Test: Alkaline $\\text{CuSO}_4 +$ sodium potassium tartrate reduces to red $\\text{Cu}_2\\text{O}$ precipitate with aliphatic aldehydes only (benzaldehyde gives negative Fehling).",
          "Iodoform Test: Compounds with $\\text{CH}_3\\text{CO}-$ group (methyl ketones, ethanal) or $\\text{CH}_3\\text{CH(OH)}-$ group give yellow precipitate of $\\text{CHI}_3$ when warmed with $\\text{I}_2 + \\text{NaOH}$."
        ]
      },
      {
        "heading": "Named Condensation Reactions & Carboxylic Acid Acidity",
        "bullets": [
          "Aldol Condensation: Carbonyl compounds with at least one $\\alpha$-hydrogen undergo self-condensation in dilute alkali to form $\\beta$-hydroxy aldehydes/ketones, dehydrating on heating to $\\alpha,\\beta$-unsaturated carbonyls.",
          "Cannizzaro Reaction: Aldehydes lacking $\\alpha$-hydrogen (e.g., $\\text{HCHO}, \\text{C}_6\\text{H}_5\\text{CHO}$) undergo self oxidation-reduction (disproportionation) in $50\\% \\text{ KOH}$ to give alcohol and carboxylate salt.",
          "Clemmensen Reduction ($\\text{Zn-Hg} + \\text{conc. HCl}$) and Wolff-Kishner Reduction ($\\text{NH}_2\\text{NH}_2 + \\text{KOH} / \\text{ethylene glycol}$) reduce $>C=O$ to $>CH_2$.",
          "Acidity of Carboxylic Acids: Resonance-stabilized carboxylate ion ($\text{R-COO}^-$); Electron-withdrawing groups ($-NO_2, -F, -Cl$) increase acidity: $\\text{CF}_3\\text{COOH} > \\text{CCl}_3\\text{COOH} > \\text{HCOOH} > \\text{CH}_3\\text{COOH}$; HVZ reaction ($R-\\text{CH}_2\\text{COOH} + \\text{Br}_2 / \\text{Red P} \\to R-\\text{CH(Br)COOH}$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming benzaldehyde gives a positive Fehling test (benzaldehyde reduces Tollens reagent, but gives a NEGATIVE Fehling test).",
      "Attempting Cannizzaro reaction on acetaldehyde (acetaldehyde has $\\alpha$-hydrogens and undergoes aldol condensation instead)."
    ],
    "quickMentalCheck": "Which gives a positive iodoform test: Pentan-2-one or Pentan-3-one? Pentan-2-one, because it contains the $\\text{CH}_3\\text{CO}-$ methyl ketone group.",
    "cueQuestions": [
      "Why are aldehydes intrinsically more reactive toward nucleophiles than ketones?",
      "How does the Cannizzaro reaction mechanism demonstrate hydride ion transfer as the rate-determining step?",
      "Why is chloroacetic acid a stronger acid than acetic acid, while fluoroacetic acid is stronger still?"
    ],
    "workedExample": {
      "problem": "An organic compound [A] with molecular formula $\\text{C}_8\\text{H}_8\\text{O}$ forms an orange-red precipitate with 2,4-DNP reagent and gives a yellow precipitate on heating with $\\text{I}_2$ and $\\text{NaOH}$. It does not reduce Tollens’ or Fehling’s reagent. On drastic oxidation with chromic acid, it gives a carboxylic acid [B] having molecular formula $\\text{C}_7\\text{H}_6\\text{O}_2$. Identify [A] and [B] and explain the reactions.",
      "steps": [
        "Compound [A] forms 2,4-DNP derivative $\\implies$ Contains a carbonyl group ($>C=O$).",
        "Does not reduce Tollens/Fehling $\\implies$ It is a Ketone (not an aldehyde).",
        "Gives yellow iodoform precipitate $\\implies$ Contains a methyl ketone group ($-\\text{COCH}_3$).",
        "Molecular formula $\\text{C}_8\\text{H}_8\\text{O}$ with $-\\text{COCH}_3$ ($C_2H_3O$) leaves $\\text{C}_6\\text{H}_5-$ (Phenyl ring). Thus, [A] is Acetophenone ($\\text{C}_6\\text{H}_5\\text{COCH}_3$).",
        "Oxidation of [A] yields [B] $\\text{C}_7\\text{H}_6\\text{O}_2$, which is Benzoic acid ($\\text{C}_6\\text{H}_5\\text{COOH}$)."
      ],
      "result": "[A] = \\text{Acetophenone (}\\text{C}_6\\text{H}_5\\text{COCH}_3\\text{)}, \\quad [B] = \\text{Benzoic acid (}\\text{C}_6\\text{H}_5\\text{COOH})"
    },
    "verificationProblem": "Check iodoform reaction: $\\text{C}_6\\text{H}_5\\text{COCH}_3 + 3\\text{I}_2 + 4\\text{NaOH} \\to \\text{CHI}_3\\downarrow (\\text{yellow}) + \\text{C}_6\\text{H}_5\\text{COONa} + 3\\text{NaI} + 3\\text{H}_2\\text{O}$. Consistent with all data.",
    "realWorldUse": "Formalin preservative for anatomical specimens, synthetic vanillin food flavoring, production of PET polymers from terephthalic acid.",
    "diagramType": "aldol-cannizzaro-reaction-schematics"
  },
  "CBSE-CH-G12-CHEM-CH09": {
    "chapterTitle": "Amines",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 9,
    "essentialLaw": "\\text{Basicity in aq. medium: } (\\text{CH}_3)_2\\text{NH} > \\text{CH}_3\\text{NH}_2 > (\\text{CH}_3)_3\\text{N} > \\text{NH}_3 \\; (2^\\circ > 1^\\circ > 3^\\circ) \\quad | \\quad \\text{Carbylamine: } R-\\text{NH}_2 + \\text{CHCl}_3 + 3\\text{KOH} \\to R-\\text{NC} + 3\\text{KCl} + 3\\text{H}_2\\text{O}",
    "coreConcepts": [
      {
        "heading": "Basicity of Amines & Distinctive Separation Tests",
        "bullets": [
          "Basicity: Aliphatic amines are stronger bases than ammonia due to $+I$ electron release by alkyl groups; In aqueous solution, basicity order is governed by inductive effect, steric hindrance, and hydration energy: Methyl series ($2^\\circ > 1^\\circ > 3^\\circ > \\text{NH}_3$), Ethyl series ($2^\\circ > 3^\\circ > 1^\\circ > \\text{NH}_3$).",
          "Aniline is a much weaker base than aliphatic amines and ammonia ($pK_b = 9.4$) because the nitrogen lone pair is delocalized over the benzene ring via resonance.",
          "Hinsberg Test (benzenesulfonyl chloride, $\\text{C}_6\\text{H}_5\\text{SO}_2\\text{Cl}$): $1^\\circ$ amine forms sulfonamide soluble in alkali; $2^\\circ$ amine forms sulfonamide insoluble in alkali; $3^\\circ$ amine does not react.",
          "Carbylamine Reaction: $1^\\circ$ aliphatic and aromatic amines heated with $\\text{CHCl}_3 + \\text{alc. KOH}$ produce extremely foul-smelling isocyanides ($R-\\text{NC}$)."
        ]
      },
      {
        "heading": "Preparation Methods & Diazonium Salt Coupling Reactions",
        "bullets": [
          "Hoffmann Bromamide Degradation: $R-\\text{CONH}_2 + \\text{Br}_2 + 4\\text{NaOH} \\to R-\\text{NH}_2 + \\text{Na}_2\\text{CO}_3 + 2\\text{NaBr} + 2\\text{H}_2\\text{O}$ (Step-down reaction yielding $1^\\circ$ amine with one less carbon).",
          "Gabriel Phthalimide Synthesis: Phthalimide $+ \\text{KOH} \\to$ potassium phthalimide $\\xrightarrow{R-\\text{X}} N$-alkylphthalimide $\\xrightarrow{\\text{NaOH}} 1^\\circ$ aliphatic amine (Cannot prepare aromatic amines because aryl halides do not undergo nucleophilic substitution).",
          "Diazotization: Aniline $+ \\text{NaNO}_2 + 2\\text{HCl} \\xrightarrow{273-278\\text{ K}} \\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-$ (Benzenediazonium chloride).",
          "Sandmeyer & Gattermann Reactions: Substitution of diazonium group by $-\\text{Cl}, -\\text{Br}, -\\text{CN}$ using $\\text{Cu}_2\\text{X}_2 / \\text{HX}$ or $\\text{Cu} / \\text{HX}$.",
          "Azo Dye Coupling: Diazonium chloride couples with phenol in basic medium (pH 9-10) to give p-hydroxyazobenzene (orange dye), and with aniline in slightly acidic medium (pH 4-5) to give p-aminoazobenzene (yellow dye)."
        ]
      }
    ],
    "examTraps": [
      "Using Gabriel phthalimide synthesis to prepare aniline (aryl halides are unreactive toward nucleophilic substitution by phthalimide anion).",
      "Confusing the aqueous basicity order of methyl-substituted ($2^\\circ > 1^\\circ > 3^\\circ$) vs ethyl-substituted ($2^\\circ > 3^\\circ > 1^\\circ$) amines."
    ],
    "quickMentalCheck": "Can tertiary amines give a positive Carbylamine test? No, only PRIMARY ($1^\\circ$) aliphatic and aromatic amines give the carbylamine test.",
    "cueQuestions": [
      "Why does aniline undergo rapid electrophilic tribromination to 2,4,6-tribromoaniline in aqueous solution without a Lewis acid catalyst?",
      "How does benzenediazonium chloride serve as a versatile synthetic intermediate in organic transformations?",
      "How does the Hinsberg reagent distinguish between primary, secondary, and tertiary amines in the laboratory?"
    ],
    "workedExample": {
      "problem": "How will you convert: (a) Benzene into Aniline, and (b) Aniline into Fluorobenzene? Give step-by-step reagents.",
      "steps": [
        "(a) Benzene $\\to$ Aniline: Nitration of benzene using $\\text{conc. HNO}_3 + \\text{conc. H}_2\\text{SO}_4$ at $330\\text{ K}$ gives Nitrobenzene ($\\text{C}_6\\text{H}_5\\text{NO}_2$). Reduce nitrobenzene using $\\text{Sn} / \\text{HCl}$ or $\\text{Fe} / \\text{HCl}$ followed by $\\text{NaOH}$ to yield Aniline ($\\text{C}_6\\text{H}_5\\text{NH}_2$).",
        "(b) Aniline $\\to$ Fluorobenzene: Diazotize aniline with $\\text{NaNO}_2 + \\text{HCl}$ at $273-278\\text{ K}$ to produce benzenediazonium chloride ($\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{Cl}^-$).",
        "Treat diazonium salt with fluoroboric acid ($\\text{HBF}_4$) to precipitate benzenediazonium fluoroborate ($\\text{C}_6\\text{H}_5\\text{N}_2^+\\text{BF}_4^-$). Gently heat the dry salt (Schiemann reaction) to yield Fluorobenzene ($\\text{C}_6\\text{H}_5\\text{F} + \\text{BF}_3 + \\text{N}_2\\uparrow$)."
      ],
      "result": "\\text{Benzene} \\xrightarrow{\\text{HNO}_3/\\text{H}_2\\text{SO}_4} \\text{PhNO}_2 \\xrightarrow{\\text{Fe/HCl}} \\text{PhNH}_2 \\xrightarrow{\\text{NaNO}_2/\\text{HCl}} \\text{PhN}_2^+\\text{Cl}^- \\xrightarrow{\\text{HBF}_4, \\Delta} \\text{PhF}"
    },
    "verificationProblem": "Check Balz-Schiemann selectivity: Direct fluorination of benzene is explosive; Sandmeyer cannot use CuF; Schiemann reaction is the standard synthetic route for aryl fluorides. Verified.",
    "realWorldUse": "Synthesis of sulfa antibiotic drugs (sulfanilamide), industrial manufacturing of azo dyes for textiles, polyurethanes from toluene diisocyanate.",
    "diagramType": "diazonium-salt-synthetic-map"
  },
  "CBSE-CH-G12-CHEM-CH10": {
    "chapterTitle": "Biomolecules",
    "subject": "Chemistry",
    "grade": 12,
    "chapterNum": 10,
    "essentialLaw": "\\text{Glucose (Haworth)}: \\alpha\\text{-D-Glucopyranose} \\rightleftharpoons \\text{Open Chain} \\rightleftharpoons \\beta\\text{-D-Glucopyranose} \\quad | \\quad [\\alpha]_D = +112^\\circ \\to +52.7^\\circ \\leftarrow +19^\\circ \\; (\\text{Mutarotation})",
    "coreConcepts": [
      {
        "heading": "Carbohydrates: Monosaccharides, Mutarotation & Disaccharides",
        "bullets": [
          "Classification: Monosaccharides (Glucose, Fructose), Disaccharides (Sucrose, Maltose, Lactose), Polysaccharides (Starch, Cellulose, Glycogen).",
          "D/L Configuration: Based on position of $-OH$ group on lowest chiral carbon (D-glyceraldehyde standard).",
          "Glucose Structure: Aldohexose with 4 chiral carbons ($2^4 = 16$ stereoisomers); Cyclic hemiacetal forms $\\alpha$ and $\\beta$ anomers at $\\text{C}_1$ (anomeric carbon); Mutarotation: Spontaneous change in optical rotation to equilibrium $+52.7^\\circ$.",
          "Glycosidic Linkages: Sucrose ($\\alpha$-D-glucose $\\text{C}_1 - \\text{C}_2$ $\\beta$-D-fructose, non-reducing sugar, invert sugar $[alpha]_D = -39.9^\\circ$); Maltose (two $\\alpha$-D-glucose $\\text{C}_1 - \\text{C}_4$, reducing); Lactose ($\\beta$-D-galactose $\\text{C}_1 - \\text{C}_4$ $\\beta$-D-glucose, reducing)."
        ]
      },
      {
        "heading": "Proteins, Enzymes, Vitamins & Nucleic Acids (DNA vs RNA)",
        "bullets": [
          "Amino Acids: Zwitterion form ($^+\\text{NH}_3-\\text{CHR}-\\text{COO}^-$); All natural amino acids have L-configuration at $\\alpha$-carbon; Glycine is the only achiral amino acid.",
          "Protein Structure: Primary (peptide $-CO-NH-$ sequence), Secondary ($\\alpha$-helix and $\\beta$-pleated sheets via hydrogen bonding), Tertiary (3D folding via disulfide, hydrophobic, ionic bonds), Quaternary; Denaturation (loss of $2^\\circ/3^\\circ$ structure by heat/pH change; primary structure remains intact).",
          "Nucleic Acids: Nucleoside (Sugar + Base) vs Nucleotide (Sugar + Base + Phosphate); DNA has 2-deoxy-D-ribose with bases A, T, G, C (Double helix with A=T 2 H-bonds, G≡C 3 H-bonds); RNA has D-ribose with bases A, U, G, C.",
          "Vitamins: Fat-soluble (A, D, E, K); Water-soluble (B-complex, C; cannot be stored and must be supplied regularly in diet, except Vitamin $\\text{B}_{12}$)."
        ]
      }
    ],
    "examTraps": [
      "Classifying sucrose as a reducing sugar (sucrose is NON-REDUCING because both anomeric carbons of glucose and fructose are locked in the glycosidic bond).",
      "Assuming protein denaturation destroys peptide bonds (denaturation breaks hydrogen and disulfide bonds, leaving the primary peptide backbone completely intact)."
    ],
    "quickMentalCheck": "Why is glycine optically inactive while all other 19 natural amino acids are optically active? Glycine has two identical hydrogen atoms on its $\\alpha$-carbon ($^+\\text{NH}_3-\\text{CH}_2-\\text{COO}^-$), lacking a chiral center.",
    "cueQuestions": [
      "How does the open-chain structure of D-glucose fail to explain why it does not react with 2,4-DNP or form an addition compound with $\\text{NaHSO}_3$?",
      "What is invert sugar and why does the sign of specific optical rotation invert during sucrose hydrolysis?",
      "How do hydrogen bonding patterns stabilize the $\\alpha$-helix and $\\beta$-pleated sheet secondary structures of proteins?"
    ],
    "workedExample": {
      "problem": "Write the chemical reactions of D-glucose with: (a) Bromine water ($\\text{Br}_2/\\text{H}_2\\text{O}$), (b) Concentrated Nitric Acid ($\\text{conc. HNO}_3$), and (c) Excess Phenylhydrazine. State what each reaction proves about glucose structure.",
      "steps": [
        "(a) Glucose $+ \\text{Br}_2 / \\text{H}_2\\text{O} \\to$ Gluconic acid ($\\text{HOCH}_2(\\text{CHOH})_4\\text{COOH}$). Proves the carbonyl group in glucose is an Aldehyde ($-\\text{CHO}$), as mild oxidant oxidizes only aldehyde without attacking alcohols.",
        "(b) Glucose $+ \\text{conc. HNO}_3 \\to$ Saccharic acid / Glucaric acid ($\\text{HOOC}(\\text{CHOH})_4\\text{COOH}$). Proves the presence of a primary alcohol group ($-\\text{CH}_2\\text{OH}$) in addition to the aldehyde group.",
        "(c) Glucose $+ 3\\text{C}_6\\text{H}_5\\text{NHNH}_2 \\to$ Glucosazone $+ \\text{C}_6\\text{H}_5\\text{NH}_2 + \\text{NH}_3 + 2\\text{H}_2\\text{O}$. Reaction occurs only at $\\text{C}_1$ and $\\text{C}_2$, forming identical osazone crystals for D-glucose and D-fructose."
      ],
      "result": "(a) \\text{Gluconic acid (proves -CHO)}, \\; (b) \\text{Saccharic acid (proves } 1^\\circ \\text{ -OH)}, \\; (c) \\text{Glucosazone}"
    },
    "verificationProblem": "Check carbon balance: Glucose ($\text{C}_6\text{H}_{12}\text{O}_6$) $\\xrightarrow{\\text{Br}_2}$ Gluconic acid ($\text{C}_6\text{H}_{12}\text{O}_7$) $\\xrightarrow{\\text{HNO}_3}$ Saccharic acid ($\text{C}_6\text{H}_{10}\text{O}_8$). Functional group oxidation sequence verified.",
    "realWorldUse": "Enzymatic glucose biosensors for diabetic blood sugar monitoring, recombinant human insulin production, mRNA vaccine lipid nanoparticle delivery.",
    "diagramType": "dna-double-helix-base-pairing"
  },
  "CBSE-CH-G12-MATH-CH01": {
    "chapterTitle": "Relations and Functions",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 1,
    "essentialLaw": "\\text{Equivalence Relation: } \\text{Reflexive } (a,a) \\in R \\; \\land \\; \\text{Symmetric } ((a,b) \\in R \\implies (b,a) \\in R) \\; \\land \\; \\text{Transitive } ((a,b),(b,c) \\in R \\implies (a,c) \\in R) \\quad | \\quad \\text{Bijective } (\\text{Injective } + \\text{Surjective}) \\iff \\text{Invertible}",
    "coreConcepts": [
      {
        "heading": "Types of Relations & Equivalence Classes",
        "bullets": [
          "Reflexive: $(a, a) \\in R$ for all $a \\in A$; Symmetric: $(a, b) \\in R \\implies (b, a) \\in R$; Transitive: $(a, b) \\in R$ and $(b, c) \\in R \\implies (a, c) \\in R$.",
          "Equivalence Relation: A relation that is simultaneously reflexive, symmetric, and transitive.",
          "Equivalence class $[a] = \\{x \\in A : (x, a) \\in R\\}$ partitions the underlying set $A$ into mutually disjoint subsets whose union is $A$."
        ]
      },
      {
        "heading": "Types of Functions: Injective, Surjective & Bijective",
        "bullets": [
          "One-One (Injective): $f(x_1) = f(x_2) \\implies x_1 = x_2$ for all $x_1, x_2 \\in X$ (passes Horizontal Line Test).",
          "Onto (Surjective): For every element in codomain $y \\in Y$, there exists pre-image $x \\in X$ such that image is $y$, i.e., $\\text{Range}(f) = \\text{Codomain}(Y)$.",
          "Bijective & Invertible: A function is bijective if it is both one-one and onto; a function is invertible if and only if it is bijective, satisfying $f^{-1} \\circ f = I_X$ and $f \\circ f^{-1} = I_Y$."
        ]
      }
    ],
    "examTraps": [
      "Assuming $f: \\mathbb{R} \\to \\mathbb{R}, f(x) = x^2$ is one-one; it is NOT one-one because $f(-2) = f(2) = 4$, and NOT onto because range $[0, \\infty) \\neq \\mathbb{R}$.",
      "Forgetting to verify all three properties (reflexive, symmetric, transitive) with formal algebraic definitions rather than illustrative numerical examples."
    ],
    "quickMentalCheck": "Is $f: \\mathbb{N} \\to \\mathbb{N}$ defined by $f(x) = 2x$ onto? (Answer: No, because odd natural numbers in codomain $\\mathbb{N}$ have no pre-images in $\\mathbb{N}$).",
    "cueQuestions": [
      "What is the rigorous algebraic test to establish that a function is injective (one-one)?",
      "Why does an equivalence relation partition a set into a collection of mutually disjoint equivalence classes?",
      "Under what necessary and sufficient conditions does an inverse function $f^{-1}: Y \\to X$ exist?"
    ],
    "workedExample": {
      "problem": "Let $R$ be the relation in the set $\\mathbb{Z}$ of integers given by $R = \\{(a, b) : 2 \\text{ divides } (a - b)\\}$. Prove that $R$ is an equivalence relation.",
      "steps": [
        "Reflexive: For any $a \\in \\mathbb{Z}$, $a - a = 0 = 2 \\times 0$. Since $2$ divides $0$, $(a, a) \\in R$ for all $a \\in \\mathbb{Z}$. Thus $R$ is reflexive.",
        "Symmetric: Let $(a, b) \\in R \\implies 2 \\text{ divides } (a - b) \\implies a - b = 2k$ for some $k \\in \\mathbb{Z}$. Then $b - a = -(a - b) = 2(-k)$. Since $-k \\in \\mathbb{Z}$, $2 \\text{ divides } (b - a) \\implies (b, a) \\in R$. Thus $R$ is symmetric.",
        "Transitive: Let $(a, b) \\in R$ and $(b, c) \\in R \\implies a - b = 2k_1$ and $b - c = 2k_2$ for $k_1, k_2 \\in \\mathbb{Z}$. Adding both: $(a - b) + (b - c) = a - c = 2(k_1 + k_2)$. Since $k_1 + k_2 \\in \\mathbb{Z}$, $2 \\text{ divides } (a - c) \\implies (a, c) \\in R$. Thus $R$ is transitive.",
        "Conclusion: Since $R$ is reflexive, symmetric, and transitive, $R$ is an equivalence relation on $\\mathbb{Z}$."
      ],
      "result": "\\text{Proven: } R \\text{ is an Equivalence Relation in } \\mathbb{Z}"
    },
    "verificationProblem": "Verify that the equivalence classes for this relation are $[0] = \\{\\text{even integers}\\}$ and $[1] = \\{\\text{odd integers}\\}$, partitioning $\\mathbb{Z}$.",
    "realWorldUse": "Essential for cryptography (RSA keys and modular arithmetic equivalence), database relational calculus, and compiler abstract syntax tree mappings.",
    "diagramType": "equivalence-classes-partition-diagram"
  },
  "CBSE-CH-G12-MATH-CH02": {
    "chapterTitle": "Inverse Trigonometric Functions",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 2,
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
  "CBSE-CH-G12-MATH-CH03": {
    "chapterTitle": "Matrices",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 3,
    "essentialLaw": "(AB)^T = B^T A^T \\quad | \\quad A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T) \\quad | \\quad A \\cdot A^{-1} = A^{-1} \\cdot A = I_n",
    "coreConcepts": [
      {
        "heading": "Matrix Operations & Properties",
        "bullets": [
          "Matrix multiplication $AB$ is defined if columns of $A$ equal rows of $B$; multiplication is non-commutative ($AB \\neq BA$ in general) but associative: $A(BC) = (AB)C$.",
          "Transpose properties: $(A^T)^T = A, (kA)^T = kA^T, (A + B)^T = A^T + B^T$, and the reversal law $(AB)^T = B^T A^T$.",
          "Symmetric matrix ($A^T = A$) and Skew-symmetric matrix ($A^T = -A$, where all main diagonal elements are strictly zero)."
        ]
      },
      {
        "heading": "Symmetric Decomposition & Invertibility",
        "bullets": [
          "Every square matrix $A$ can be uniquely expressed as the sum of a symmetric matrix and a skew-symmetric matrix: $A = \\frac{1}{2}(A + A^T) + \\frac{1}{2}(A - A^T)$.",
          "Elementary row/column operations ($R_i \\leftrightarrow R_j, R_i \\to kR_i, R_i \\to R_i + kR_j$) preserve row equivalence.",
          "If a square matrix $B$ exists such that $AB = BA = I$, then $B$ is the unique inverse of $A$ ($B = A^{-1}$)."
        ]
      }
    ],
    "examTraps": [
      "Assuming $AB = 0 \\implies A = 0 \\lor B = 0$; the product of two non-zero matrices can be a zero matrix.",
      "Applying the reversal law incorrectly: $(AB)^T$ is $B^T A^T$, NOT $A^T B^T$."
    ],
    "quickMentalCheck": "What are the diagonal elements of any skew-symmetric matrix? (Answer: All diagonal elements are $0$, since $a_{ii} = -a_{ii} \\implies 2a_{ii} = 0$).",
    "cueQuestions": [
      "Why is matrix multiplication generally non-commutative ($AB \\neq BA$)?",
      "How do you prove that any square matrix can be decomposed into symmetric and skew-symmetric components?",
      "Under what condition does a square matrix possess a unique multiplicative inverse?"
    ],
    "workedExample": {
      "problem": "Express the matrix $A = \\begin{bmatrix} 3 & 5 \\\\ 1 & -1 \\end{bmatrix}$ as the sum of a symmetric and a skew-symmetric matrix.",
      "steps": [
        "Find transpose: $A^T = \\begin{bmatrix} 3 & 1 \\\\ 5 & -1 \\end{bmatrix}$.",
        "Calculate symmetric part $P = \\frac{1}{2}(A + A^T)$: $P = \\frac{1}{2}\\begin{bmatrix} 6 & 6 \\\\ 6 & -2 \\end{bmatrix} = \\begin{bmatrix} 3 & 3 \\\\ 3 & -1 \\end{bmatrix}$. Verify $P^T = P$.",
        "Calculate skew-symmetric part $Q = \\frac{1}{2}(A - A^T)$: $Q = \\frac{1}{2}\\begin{bmatrix} 0 & 4 \\\\ -4 & 0 \\end{bmatrix} = \\begin{bmatrix} 0 & 2 \\\\ -2 & 0 \\end{bmatrix}$. Verify $Q^T = -Q$.",
        "Sum together: $P + Q = \\begin{bmatrix} 3 & 3 \\\\ 3 & -1 \\end{bmatrix} + \\begin{bmatrix} 0 & 2 \\\\ -2 & 0 \\end{bmatrix} = \\begin{bmatrix} 3 & 5 \\\\ 1 & -1 \\end{bmatrix} = A$."
      ],
      "result": "A = \\begin{bmatrix} 3 & 3 \\\\ 3 & -1 \\end{bmatrix} + \\begin{bmatrix} 0 & 2 \\\\ -2 & 0 \\end{bmatrix}"
    },
    "verificationProblem": "Check: $P^T = P$ (symmetric) and $Q^T = -Q$ (skew-symmetric with zero diagonals). Verified.",
    "realWorldUse": "Used in 3D graphic rendering transformations, neural network weight tensors, Google PageRank algorithm, and Markov chain transition matrices.",
    "diagramType": "matrix-multiplication-decomposition"
  },
  "CBSE-CH-G12-MATH-CH04": {
    "chapterTitle": "Determinants",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 4,
    "essentialLaw": "A^{-1} = \\frac{1}{|A|} \\text{adj}(A) \\; (|A| \\neq 0) \\quad | \\quad |\\text{adj}(A)| = |A|^{n-1} \\quad | \\quad \\text{System: } X = A^{-1}B",
    "coreConcepts": [
      {
        "heading": "Minors, Cofactors & Adjoint of a Matrix",
        "bullets": [
          "Minor $M_{ij}$ is the determinant of the submatrix left after deleting $i$-th row and $j$-th column; Cofactor $A_{ij} = (-1)^{i+j} M_{ij}$.",
          "Sum of products of elements of any row with their corresponding cofactors equals $|A|$; with cofactors of another row equals $0$.",
          "Adjoint of matrix $A$: $\\text{adj}(A) = [A_{ij}]^T$; fundamental identity: $A \\cdot \\text{adj}(A) = \\text{adj}(A) \\cdot A = |A| I_n$."
        ]
      },
      {
        "heading": "Invertibility & Matrix Method for Linear Systems",
        "bullets": [
          "A square matrix is invertible (non-singular) if and only if $|A| \\neq 0$, with inverse $A^{-1} = \\frac{1}{|A|}\\text{adj}(A)$.",
          "Determinant properties: $|AB| = |A||B|, |A^T| = |A|, |kA| = k^n |A|$ (for $n \\times n$ matrix), and $|\\text{adj}(A)| = |A|^{n-1}$.",
          "Solving system of linear equations $AX = B$: Unique solution $X = A^{-1}B$ if $|A| \\neq 0$. If $|A| = 0$ and $(\\text{adj } A)B \\neq O$, system has no solution (inconsistent)."
        ]
      }
    ],
    "examTraps": [
      "Evaluating $|kA| = k|A|$ instead of $k^n |A|$ for an $n \\times n$ matrix.",
      "Forgetting to take the transpose of the cofactor matrix to obtain the adjoint ($\text{adj } A = [A_{ij}]^T$)."
    ],
    "quickMentalCheck": "If $A$ is a $3 \\times 3$ matrix with $|A| = 5$, what is $|\\text{adj}(A)|$? (Answer: $|A|^{3-1} = 5^2 = 25$).",
    "cueQuestions": [
      "How does the cofactor expansion theorem prove that $A \\cdot \\text{adj}(A) = |A| I$?",
      "Why is $|kA| = k^n |A|$ for an $n \\times n$ matrix, while scalar multiplication of a single row gives $k|A|$?",
      "What are the necessary and sufficient conditions for a system of linear equations $AX = B$ to be consistent with a unique solution?"
    ],
    "workedExample": {
      "problem": "Solve the system of equations using matrix method: $2x + 5y = 1$ and $3x + 2y = 7$.",
      "steps": [
        "Write in matrix form $AX = B$: $\\begin{bmatrix} 2 & 5 \\\\ 3 & 2 \\end{bmatrix} \\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} 1 \\\\ 7 \\end{bmatrix}$.",
        "Find determinant $|A|$: $|A| = (2)(2) - (5)(3) = 4 - 15 = -11 \\neq 0$ (non-singular, unique solution exists).",
        "Find cofactors: $A_{11} = 2, A_{12} = -3, A_{21} = -5, A_{22} = 2$.",
        "Form adjoint: $\\text{adj}(A) = \\begin{bmatrix} 2 & -5 \\\\ -3 & 2 \\end{bmatrix}$.",
        "Calculate inverse: $A^{-1} = -\\frac{1}{11}\\begin{bmatrix} 2 & -5 \\\\ -3 & 2 \\end{bmatrix}$.",
        "Solve $X = A^{-1}B$: $\\begin{bmatrix} x \\\\ y \\end{bmatrix} = -\\frac{1}{11}\\begin{bmatrix} 2 & -5 \\\\ -3 & 2 \\end{bmatrix}\\begin{bmatrix} 1 \\\\ 7 \\end{bmatrix} = -\\frac{1}{11}\\begin{bmatrix} 2 - 35 \\\\ -3 + 14 \\end{bmatrix} = -\\frac{1}{11}\\begin{bmatrix} -33 \\\\ 11 \\end{bmatrix} = \\begin{bmatrix} 3 \\\\ -1 \\end{bmatrix}$."
      ],
      "result": "x = 3, \\quad y = -1"
    },
    "verificationProblem": "Check: $2(3) + 5(-1) = 6 - 5 = 1$ and $3(3) + 2(-1) = 9 - 2 = 7$. Both equations satisfied.",
    "realWorldUse": "Used in solving electrical Kirchhoff circuit loop equations, structural frame stress analysis, input-output economic Leontief models, and GPS position trilateration.",
    "diagramType": "determinant-cofactors-matrix-inversion"
  },
  "CBSE-CH-G12-MATH-CH05": {
    "chapterTitle": "Continuity and Differentiability",
    "subject": "MATHEMATICS",
    "grade": 12,
    "chapterNum": 5,
    "essentialLaw": "$\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c) \\quad \\Big| \\quad f'(c) = \\lim_{h \\to 0} \\frac{f(c+h) - f(c)}{h}$",
    "coreConcepts": [
      {
        "heading": "Continuity Criteria and Limit Evaluation",
        "bullets": [
          "A function $f(x)$ is continuous at $x = c$ if and only if $\\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c)$.",
          "Discontinuity types: Removable discontinuity (limit exists but $\\neq f(c)$), Jump discontinuity (LHL $\\neq$ RHL), and Essential/Infinite discontinuity."
        ]
      },
      {
        "heading": "Differentiability and Chain Rule",
        "bullets": [
          "Theorem: Differentiability strictly implies continuity ($f'(c) \\text{ exists} \\implies f \\text{ is continuous at } c$). The converse is false (e.g. $f(x) = |x|$ at $x = 0$).",
          "Composite function chain rule: $\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$."
        ]
      },
      {
        "heading": "Logarithmic and Parametric Differentiation",
        "bullets": [
          "Logarithmic differentiation: For $y = [u(x)]^{v(x)}$, take $\\ln y = v(x) \\ln u(x)$ and differentiate: $\\frac{dy}{dx} = y \\left[ v'(x) \\ln u(x) + \\frac{v(x) u'(x)}{u(x)} \\right]$.",
          "Parametric derivatives: $\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$ and second-order derivatives $\\frac{d^2y}{dx^2} = \\frac{d}{dt}\\left(\\frac{dy}{dx}\\right) \\cdot \\frac{dt}{dx}$."
        ]
      }
    ],
    "examTraps": [
      "Continuity Converse Fallacy on Sharp Points: Assuming continuity guarantees differentiability (f(x) = |x| has a sharp point at x=0 without a unique derivative).",
      "Chain Rule Inner Derivative Omission: Forgetting to multiply by the derivative of the inner function (e.g. differentiating sin(x^2) as cos(x^2) instead of 2x cos(x^2)).",
      "Logarithmic Differentiation Target Omission: Forgetting to multiply back by y after differentiating ln y = g(x) ln f(x)."
    ],
    "quickMentalCheck": "Differentiability check of absolute value functions: Check differentiability of f(x) = |x - 2| at x = 2 (LHD = -1 != RHD = 1).",
    "cueQuestions": [
      "State the formal limit-based definition of continuity at a point.",
      "Prove that every differentiable function is continuous, and provide a counterexample for the converse.",
      "Explain the procedure of logarithmic differentiation for variable-base variable-exponent functions."
    ],
    "workedExample": {
      "problem": "Examine the continuity and differentiability of f(x) = |x| at x = 0.",
      "steps": [
        "Step 1: Check continuity -> LHL = lim_{h -> 0^-} |0 - h| = 0, RHL = lim_{h -> 0^+} |0 + h| = 0, f(0) = 0. Since LHL = RHL = f(0), f(x) is continuous at x = 0.",
        "Step 2: Left-hand derivative (LHD) -> lim_{h -> 0^-} (|0 - h| - 0)/(-h) = h/(-h) = -1.",
        "Step 3: Right-hand derivative (RHD) -> lim_{h -> 0^+} (|0 + h| - 0)/(h) = h/h = 1.",
        "Step 4: Since LHD (-1) != RHD (1), f(x) is not differentiable at x = 0."
      ],
      "result": "f(x) = |x| is continuous everywhere on R but not differentiable at x = 0."
    },
    "verificationProblem": "Verify differentiability of f(x) = x * |x| at x = 0 by evaluating LHD and RHD from first principles.",
    "realWorldUse": "Applied in rate of change modeling, optimization engineering, signal processing, and numerical physics simulations.",
    "diagramType": "visual_model_pending"
  },
  "CBSE-CH-G12-MATH-CH06": {
    "chapterTitle": "Application of Derivatives",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 6,
    "essentialLaw": "\\text{Monotonicity: } f'(x) \\ge 0 \\iff \\text{Inc}, \\; f'(x) \\le 0 \\iff \\text{Dec} \\quad | \\quad f'(c)=0 \\land f''(c)<0 \\implies \\text{Max}, \\; f''(c)>0 \\implies \\text{Min}",
    "coreConcepts": [
      {
        "heading": "Rate of Change & Monotonic Functions",
        "bullets": [
          "Rate of change of $y$ with respect to $x$ is $\\frac{dy}{dx}$; related rates: $\\frac{dy}{dt} = \\frac{dy}{dx} \\cdot \\frac{dx}{dt}$.",
          "Increasing function: $f'(x) \\ge 0$ for all $x \\in (a, b)$ (strictly increasing if $f'(x) > 0$).",
          "Decreasing function: $f'(x) \\le 0$ for all $x \\in (a, b)$ (strictly decreasing if $f'(x) < 0$)."
        ]
      },
      {
        "heading": "Maxima, Minima & Optimization",
        "bullets": [
          "Critical points: Points $c$ in domain where $f'(c) = 0$ or $f'(c)$ is not differentiable.",
          "First Derivative Test: If $f'(x)$ changes sign from positive to negative at $c \\implies$ Local Maximum; negative to positive $\\implies$ Local Minimum.",
          "Second Derivative Test: If $f'(c) = 0$ and $f''(c) < 0 \\implies$ Local Max; if $f''(c) > 0 \\implies$ Local Min; if $f''(c) = 0$, test is inconclusive.",
          "Absolute Max/Min on closed interval $[a, b]$: Evaluate $f(x)$ at all critical points and at boundaries $x = a, x = b$."
        ]
      }
    ],
    "examTraps": [
      "Forgetting to test boundary endpoints when finding absolute (global) extrema on closed intervals $[a, b]$.",
      "Confusing local extrema with absolute extrema."
    ],
    "quickMentalCheck": "Find the intervals where $f(x) = x^2 - 4x + 6$ is strictly increasing. (Answer: $f'(x) = 2x - 4 > 0 \\implies x > 2$, interval $(2, \\infty)$).",
    "cueQuestions": [
      "How does the sign of the first derivative determine the increasing or decreasing nature of a function on an interval?",
      "Why is the Second Derivative Test inconclusive when $f''(c) = 0$, and what test must be applied instead?",
      "How do you solve geometric optimization problems (e.g., maximizing cylinder volume inscribed in a cone)?"
    ],
    "workedExample": {
      "problem": "Find two positive numbers whose sum is 15 and the sum of whose squares is minimum.",
      "steps": [
        "Let the two numbers be $x$ and $15 - x$ (with $0 < x < 15$).",
        "Define function to minimize: $S(x) = x^2 + (15 - x)^2 = x^2 + 225 - 30x + x^2 = 2x^2 - 30x + 225$.",
        "Find first derivative: $S'(x) = 4x - 30$. Set $S'(x) = 0 \\implies 4x = 30 \\implies x = 7.5 = \\frac{15}{2}$.",
        "Test second derivative: $S''(x) = 4 > 0$ (positive, confirming minimum).",
        "Find other number: $15 - x = 15 - 7.5 = 7.5$."
      ],
      "result": "\\text{The numbers are } \\frac{15}{2} \\text{ and } \\frac{15}{2} \\quad (7.5, 7.5)"
    },
    "verificationProblem": "Check nearby integer pairs summing to 15: $(7,8) \\implies 49+64 = 113$; for $(7.5, 7.5) \\implies 56.25 + 56.25 = 112.5 < 113$. Verified minimum.",
    "realWorldUse": "Used in profit maximization and cost minimization in economics, aerodynamics drag reduction shapes, structural beam stress optimization, and machine learning loss function minimization.",
    "diagramType": "derivative-extrema-inflection-curve"
  },
  "CBSE-CH-G12-MATH-CH07": {
    "chapterTitle": "Integrals",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 7,
    "essentialLaw": "\\int u v \\, dx = u \\int v \\, dx - \\int \\left( u' \\int v \\, dx \\right) dx \\quad | \\quad \\int_a^b f(x) \\, dx = \\int_a^b f(a+b-x) \\, dx \\quad | \\quad \\int \\frac{dx}{x^2+a^2} = \\frac{1}{a}\\tan^{-1}\\left(\\frac{x}{a}\\right) + C",
    "coreConcepts": [
      {
        "heading": "Indefinite Integration Methods & Standard Forms",
        "bullets": [
          "Integration by substitution: $\\int f(g(x))g'(x)dx = \\int f(t)dt$ where $t = g(x)$.",
          "Integration by parts: $\\int u v \\, dx = u \\int v \\, dx - \\int \\left(u' \\int v \\, dx\\right) dx$ (chosen via ILATE priority: Inverse, Logarithmic, Algebraic, Trigonometric, Exponential).",
          "Special integral: $\\int e^x [f(x) + f'(x)] dx = e^x f(x) + C$; Partial fractions for rational functions $\\frac{P(x)}{Q(x)}$."
        ]
      },
      {
        "heading": "Definite Integrals & Fundamental Properties",
        "bullets": [
          "Fundamental Theorem of Calculus: $\\int_a^b f(x)dx = F(b) - F(a)$ where $F'(x) = f(x)$.",
          "King's Property: $\\int_a^b f(x)dx = \\int_a^b f(a + b - x)dx$; $\\int_0^a f(x)dx = \\int_0^a f(a - x)dx$.",
          "Even/Odd property: $\\int_{-a}^a f(x)dx = 2\\int_0^a f(x)dx$ if $f(-x) = f(x)$ (even), and $0$ if $f(-x) = -f(x)$ (odd)."
        ]
      }
    ],
    "examTraps": [
      "Forgetting the factor $\\frac{1}{a}$ in $\\int \\frac{dx}{x^2+a^2} = \\frac{1}{a}\\tan^{-1}\\left(\\frac{x}{a}\\right) + C$.",
      "Forgetting to change the limits of integration when applying variable substitution in definite integrals."
    ],
    "quickMentalCheck": "Evaluate $\\int_{-\\pi/2}^{\\pi/2} \\sin^5 x \\, dx$. (Answer: $0$, since $\\sin^5(-x) = -\\sin^5 x$ is an odd function).",
    "cueQuestions": [
      "How does the ILATE mnemonic dictate the choice of first function $u(x)$ in integration by parts?",
      "How is King's Property $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$ utilized to evaluate $\\int_0^{\\pi/2} \\frac{\\sqrt{\\sin x}}{\\sqrt{\\sin x}+\\sqrt{\\cos x}} dx$?",
      "Why does the integral $\\int e^x [f(x) + f'(x)] dx$ simplify directly to $e^x f(x) + C$?"
    ],
    "workedExample": {
      "problem": "Evaluate the definite integral $I = \\int_0^{\\pi/2} \\frac{\\sin^4 x}{\\sin^4 x + \\cos^4 x} \\, dx$.",
      "steps": [
        "Let $I = \\int_0^{\\pi/2} \\frac{\\sin^4 x}{\\sin^4 x + \\cos^4 x} dx$ (Equation 1).",
        "Apply King's Property $\\int_0^a f(x)dx = \\int_0^a f(a-x)dx$: replace $x$ with $\\frac{\\pi}{2} - x$.",
        "Since $\\sin(\\pi/2 - x) = \\cos x$ and $\\cos(\\pi/2 - x) = \\sin x$, $I = \\int_0^{\\pi/2} \\frac{\\cos^4 x}{\\cos^4 x + \\sin^4 x} dx$ (Equation 2).",
        "Add Equations 1 and 2: $2I = \\int_0^{\\pi/2} \\frac{\\sin^4 x + \\cos^4 x}{\\sin^4 x + \\cos^4 x} dx = \\int_0^{\\pi/2} 1 \\, dx = [x]_0^{\\pi/2} = \\frac{\\pi}{2}$.",
        "Solve for $I$: $I = \\frac{\\pi}{4}$."
      ],
      "result": "I = \\frac{\\pi}{4}"
    },
    "verificationProblem": "Check: Sum of identical symmetric complementary quadrants equals total area under constant $1$, yielding $\\pi/4$. Verified.",
    "realWorldUse": "Essential in calculating electromagnetic flux, work done by variable thermodynamic forces, Fourier transform harmonic analysis, and continuous probability distribution functions.",
    "diagramType": "definite-integral-riemann-sum"
  },
  "CBSE-CH-G12-MATH-CH08": {
    "chapterTitle": "Application of Integrals",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 8,
    "essentialLaw": "A = \\int_a^b |f(x) - g(x)| \\, dx = \\int_a^b (y_{\\text{upper}} - y_{\\text{lower}}) \\, dx \\quad | \\quad \\text{Area of Ellipse: } \\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1 \\implies A = \\pi a b",
    "coreConcepts": [
      {
        "heading": "Area Under Simple Curves & Symmetry",
        "bullets": [
          "Area bounded by curve $y = f(x)$, $x$-axis, and vertical lines $x = a, x = b$ is $A = \\int_a^b y \\, dx = \\int_a^b f(x) \\, dx$.",
          "Area along y-axis: Bounded by $x = g(y)$, $y$-axis, and horizontal lines $y = c, y = d$ is $A = \\int_c^d x \\, dy = \\int_c^d g(y) \\, dy$.",
          "Symmetry utilization: For curves symmetric about coordinate axes (circles, ellipses, parabolas), calculate area in first quadrant and multiply by symmetry factor (e.g., $4 \\times$ for circle/ellipse)."
        ]
      },
      {
        "heading": "Area Between Two Intersecting Curves",
        "bullets": [
          "Area enclosed between curves $y = f(x)$ and $y = g(x)$ intersecting at $x = a$ and $x = b$: $A = \\int_a^b [f(x) - g(x)] \\, dx$ where $f(x) \\ge g(x)$.",
          "Determination of limits: Solve simultaneous equations $y_1 = y_2$ to find exact coordinates of intersection points.",
          "Partitioning regions: If curves cross each other at $c \\in (a, b)$, partition integral into $\\int_a^c [f(x) - g(x)]dx + \\int_c^b [g(x) - f(x)]dx$."
        ]
      }
    ],
    "examTraps": [
      "Omitting the symmetry multiplication factor (e.g., finding the area of only one quadrant and forgetting to multiply by 4 for an ellipse).",
      "Integrating with respect to $x$ when solving horizontal regions without switching upper/lower functions to right/left with respect to $y$."
    ],
    "quickMentalCheck": "What is the total area enclosed by the circle $x^2 + y^2 = a^2$? (Answer: $A = 4 \\int_0^a \\sqrt{a^2-x^2}\\,dx = \\pi a^2$).",
    "cueQuestions": [
      "How do you find the area bounded between the parabola $y^2 = 4ax$ and its latus rectum $x = a$?",
      "Under what conditions is it mathematically simpler to integrate along the y-axis ($\\int x dy$) rather than the x-axis ($\\int y dx$)?",
      "How does setting up the intersection limits prevent negative area values when integrating overlapping curves?"
    ],
    "workedExample": {
      "problem": "Find the area of the region bounded by the parabola $y = x^2$ and the line $y = 4$.",
      "steps": [
        "Find intersection points: Set $x^2 = 4 \\implies x = -2$ and $x = 2$.",
        "Identify upper and lower boundary curves: Upper curve is line $y_1 = 4$; lower curve is parabola $y_2 = x^2$.",
        "Set up integral using symmetry about y-axis: $A = 2 \\int_0^2 (y_1 - y_2) dx = 2 \\int_0^2 (4 - x^2) dx$.",
        "Integrate: $A = 2 \\left[ 4x - \\frac{x^3}{3} \\right]_0^2 = 2 \\left[ 4(2) - \\frac{8}{3} \\right] = 2 \\left[ 8 - \\frac{8}{3} \\right] = 2 \\left[ \\frac{16}{3} \\right] = \\frac{32}{3}$."
      ],
      "result": "A = \\frac{32}{3} \\text{ sq units}"
    },
    "verificationProblem": "Check using horizontal strips: $A = \\int_0^4 2\\sqrt{y} dy = 2 \\left[ \\frac{2}{3} y^{3/2} \\right]_0^4 = \\frac{4}{3}(8) = \\frac{32}{3}$. Exact match.",
    "realWorldUse": "Used in civil reservoir volume capacity calculations, structural cross-section moment of inertia, economic consumer/producer surplus, and probability cumulative density estimation.",
    "diagramType": "area-between-curves-integral"
  },
  "CBSE-CH-G12-MATH-CH09": {
    "chapterTitle": "Differential Equations",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 9,
    "essentialLaw": "\\text{Order } n, \\; \\text{Degree } d \\quad | \\quad \\text{Variable Separable: } g(y)dy = f(x)dx \\quad | \\quad \\text{Linear: } \\frac{dy}{dx} + Py = Q \\implies y \\cdot e^{\\int P dx} = \\int (Q e^{\\int P dx}) dx + C",
    "coreConcepts": [
      {
        "heading": "Order, Degree & Formation of Differential Equations",
        "bullets": [
          "Order is the order of the highest derivative occurring in the differential equation.",
          "Degree is the highest power (exponent) of the highest order derivative when the differential equation is expressed as a polynomial in derivatives (undefined if non-polynomial, e.g., $\\sin(y')$).",
          "General Solution contains as many arbitrary constants as the order of the differential equation; Particular Solution is obtained by substituting initial value conditions."
        ]
      },
      {
        "heading": "Methods of Solving First Order Differential Equations",
        "bullets": [
          "Variable Separable Method: Express as $f(x)dx = g(y)dy$ and integrate directly: $\\int f(x)dx = \\int g(y)dy + C$.",
          "Homogeneous Differential Equations: $\\frac{dy}{dx} = F\\left(\\frac{y}{x}\\right)$; solve by substituting $y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}$.",
          "First Order Linear Differential Equation: $\\frac{dy}{dx} + P(x)y = Q(x)$; Integrating Factor $\\text{IF} = e^{\\int P(x)dx}$; Solution is $y \\cdot \\text{IF} = \\int (Q \\cdot \\text{IF})dx + C$."
        ]
      }
    ],
    "examTraps": [
      "Stating that the degree is defined for non-polynomial forms like $y'' + \\sin(y') = 0$ (Order is 2, but Degree is UNDEFINED).",
      "Forgetting the integrating factor formula for the form $\\frac{dx}{dy} + P(y)x = Q(y)$, which has $\\text{IF} = e^{\\int P(y)dy}$ and solution $x \\cdot \\text{IF} = \\int (Q \\cdot \\text{IF})dy + C$."
    ],
    "quickMentalCheck": "What is the order and degree of $\\left(\\frac{d^2y}{dx^2}\\right)^3 + \\left(\\frac{dy}{dx}\\right)^4 + y = 0$? (Answer: Order = 2, Degree = 3).",
    "cueQuestions": [
      "Why is the degree of a differential equation undefined when derivatives appear inside transcendental functions?",
      "How does the substitution $y = vx$ convert a homogeneous differential equation into a variable separable form?",
      "What is the integrating factor for the linear differential equation $\\frac{dy}{dx} + y\\cot x = 2x + x^2\\cot x$?"
    ],
    "workedExample": {
      "problem": "Find the general solution of the differential equation $\\frac{dy}{dx} + 2y = e^{-x}$.",
      "steps": [
        "Identify standard linear form $\\frac{dy}{dx} + Py = Q$: Here $P = 2$ and $Q = e^{-x}$.",
        "Compute Integrating Factor: $\\text{IF} = e^{\\int P dx} = e^{\\int 2 dx} = e^{2x}$.",
        "Apply general solution formula: $y \\cdot \\text{IF} = \\int (Q \\cdot \\text{IF}) dx + C$.",
        "Substitute: $y \\cdot e^{2x} = \\int (e^{-x} \\cdot e^{2x}) dx + C = \\int e^x dx + C = e^x + C$.",
        "Divide by $e^{2x}$: $y = e^{-x} + C e^{-2x}$."
      ],
      "result": "y = e^{-x} + C e^{-2x}"
    },
    "verificationProblem": "Check derivative: $\\frac{dy}{dx} = -e^{-x} - 2Ce^{-2x}$. Substitute in LHS: $(-e^{-x} - 2Ce^{-2x}) + 2(e^{-x} + Ce^{-2x}) = e^{-x} = \\text{RHS}$. Verified.",
    "realWorldUse": "Governs radioactive half-life decay, population demographic projections, Newton's law of cooling, RC/RL circuit transient charging dynamics, and epidemic transmission curves.",
    "diagramType": "differential-equation-slope-field"
  },
  "CBSE-CH-G12-MATH-CH10": {
    "chapterTitle": "Vector Algebra",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 10,
    "essentialLaw": "\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos \\theta = a_1 b_1 + a_2 b_2 + a_3 b_3 \\quad | \\quad \\vec{a} \\times \\vec{b} = \\left|\\begin{matrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{matrix}\\right| \\quad | \\quad \\text{Proj} = \\frac{\\vec{a}\\cdot\\vec{b}}{|\\vec{b}|}",
    "coreConcepts": [
      {
        "heading": "Vectors, Components, and Scalar (Dot) Product",
        "bullets": [
          "Position vector $\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}$ with magnitude $|\\vec{r}| = \\sqrt{x^2 + y^2 + z^2}$; Direction cosines $l = \\frac{x}{|r|}, m = \\frac{y}{|r|}, n = \\frac{z}{|r|}$ satisfy $l^2 + m^2 + n^2 = 1$.",
          "Scalar (Dot) Product: $\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos \\theta = a_1 b_1 + a_2 b_2 + a_3 b_3$. Commutative: $\\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}$.",
          "Perpendicularity condition: Two non-zero vectors $\\vec{a}$ and $\\vec{b}$ are perpendicular if and only if $\\vec{a} \\cdot \\vec{b} = 0$; Projection of $\\vec{a}$ on $\\vec{b}$: $\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}$."
        ]
      },
      {
        "heading": "Vector (Cross) Product & Geometric Applications",
        "bullets": [
          "Vector (Cross) Product: $\\vec{a} \\times \\vec{b} = |\\vec{a}||\\vec{b}|\\sin \\theta \\, \\hat{n}$. Anti-commutative: $\\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a})$.",
          "Collinearity / Parallelism condition: $\\vec{a} \\times \\vec{b} = \\vec{0} \\iff \\vec{a} \\parallel \\vec{b}$ (or $\\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\frac{a_3}{b_3}$).",
          "Area of parallelogram with adjacent sides $\\vec{a}, \\vec{b}$ is $|\\vec{a} \\times \\vec{b}|$; Area of triangle with sides $\\vec{a}, \\vec{b}$ is $\\frac{1}{2}|\\vec{a} \\times \\vec{b}|$."
        ]
      }
    ],
    "examTraps": [
      "Confusing dot product (which yields a scalar number) with cross product (which yields a perpendicular vector).",
      "Forgetting that cross product is anti-commutative ($\u000bec{a} \times \u000bec{b} = -\u000bec{b} \times \u000bec{a}$, so $\u000bec{a} \times \u000bec{a} = \u000bec{0}$)."
    ],
    "quickMentalCheck": "What is $\\hat{i} \\cdot (\\hat{j} \\times \\hat{k})$? (Answer: $\\hat{j} \\times \\hat{k} = \\hat{i} \\implies \\hat{i} \\cdot \\hat{i} = 1$).",
    "cueQuestions": [
      "Why is the scalar product of two orthogonal non-zero vectors always zero?",
      "How does the determinant method compute the cross product of two vectors in component form?",
      "How do you calculate the projection vector of $\\vec{a}$ along the direction of $\\vec{b}$?"
    ],
    "workedExample": {
      "problem": "Find the area of the triangle having vertices $A(1, 1, 1), B(1, 2, 3),$ and $C(2, 3, 1)$.",
      "steps": [
        "Form side vectors: $\\vec{AB} = (1-1)\\hat{i} + (2-1)\\hat{j} + (3-1)\\hat{k} = 0\\hat{i} + 1\\hat{j} + 2\\hat{k}$.",
        "Form second side vector: $\\vec{AC} = (2-1)\\hat{i} + (3-1)\\hat{j} + (1-1)\\hat{k} = 1\\hat{i} + 2\\hat{j} + 0\\hat{k}$.",
        "Compute cross product $\\vec{AB} \\times \\vec{AC} = \\left|\\begin{matrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 0 & 1 & 2 \\\\ 1 & 2 & 0 \\end{matrix}\\right| = \\hat{i}(0 - 4) - \\hat{j}(0 - 2) + \\hat{k}(0 - 1) = -4\\hat{i} + 2\\hat{j} - 1\\hat{k}$.",
        "Compute magnitude: $|\\vec{AB} \\times \\vec{AC}| = \\sqrt{(-4)^2 + 2^2 + (-1)^2} = \\sqrt{16 + 4 + 1} = \\sqrt{21}$.",
        "Area of triangle $= \\frac{1}{2}|\\vec{AB} \\times \\vec{AC}| = \\frac{\\sqrt{21}}{2}$."
      ],
      "result": "\\text{Area} = \\frac{\\sqrt{21}}{2} \\text{ sq units}"
    },
    "verificationProblem": "Check with $\\vec{BC} = \\hat{i} + \\hat{j} - 2\\hat{k}$: $\\frac{1}{2}|\\vec{BA} \\times \\vec{BC}| = \\frac{\\sqrt{21}}{2}$. Verified.",
    "realWorldUse": "Used in 3D game physics engines (rigid body rotation, torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F}$), aerospace spacecraft attitude orientation, and computer vision surface normal tracking.",
    "diagramType": "vector-cross-product-right-hand-rule"
  },
  "CBSE-CH-G12-MATH-CH11": {
    "chapterTitle": "Three Dimensional Geometry",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 11,
    "essentialLaw": "\\text{Vector Line: } \\vec{r} = \\vec{a} + \\lambda \\vec{b} \\iff \\frac{x-x_1}{a} = \\frac{y-y_1}{b} = \\frac{z-z_1}{c} \\quad | \\quad d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}",
    "coreConcepts": [
      {
        "heading": "Equations of a Line in 3D Space",
        "bullets": [
          "Vector equation of line passing through point with position vector $\\vec{a}$ and parallel to vector $\\vec{b}$: $\\vec{r} = \\vec{a} + \\lambda \\vec{b}$.",
          "Cartesian form: $\\frac{x - x_1}{a} = \\frac{y - y_1}{b} = \\frac{z - z_1}{c}$ where $\\langle a, b, c \\rangle$ are direction ratios of the line.",
          "Line passing through two points $\\vec{a}$ and $\\vec{b}$: $\\vec{r} = \\vec{a} + \\lambda(\\vec{b} - \\vec{a}) \\iff \\frac{x - x_1}{x_2 - x_1} = \\frac{y - y_1}{y_2 - y_1} = \\frac{z - z_1}{z_2 - z_1}$."
        ]
      },
      {
        "heading": "Angle & Shortest Distance Between Skew Lines",
        "bullets": [
          "Angle $\\theta$ between two lines: $\\cos \\theta = \\frac{\\vec{b}_1 \\cdot \\vec{b}_2}{|\\vec{b}_1||\\vec{b}_2|} = \\frac{|a_1 a_2 + b_1 b_2 + c_1 c_2|}{\\sqrt{a_1^2+b_1^2+c_1^2}\\sqrt{a_2^2+b_2^2+c_2^2}}$.",
          "Skew Lines: Lines in 3D space that are neither parallel nor intersecting (lie in different non-coplanar planes).",
          "Shortest Distance between skew lines $\\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $\\vec{r} = \\vec{a}_2 + \\mu \\vec{b}_2$: $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2)|}{|\\vec{b}_1 \\times \\vec{b}_2|}$. If $d = 0$, lines intersect (coplanar)."
        ]
      }
    ],
    "examTraps": [
      "Applying the skew lines formula for parallel lines (where $\\vec{b}_1 \\times \\vec{b}_2 = \\vec{0}$, yielding undefined division); for parallel lines use $d = \\frac{|(\\vec{a}_2 - \\vec{a}_1) \\times \\vec{b}|}{|\\vec{b}|}$.",
      "Forgetting to convert line equation into standard symmetric form (e.g., $1 - x = 2y$ must be written as $\\frac{x - 1}{-1} = \\frac{y - 0}{1/2}$)."
    ],
    "quickMentalCheck": "Under what condition do two lines $\\vec{r} = \\vec{a}_1 + \\lambda \\vec{b}_1$ and $\\vec{r} = \\vec{a}_2 + \\mu \\vec{b}_2$ intersect? (Answer: $(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) = 0$).",
    "cueQuestions": [
      "What are skew lines in three-dimensional space and why can they exist only in 3D or higher dimensions?",
      "How do you convert a Cartesian symmetric line equation into its equivalent vector parametric representation?",
      "How do you compute the shortest distance between two parallel lines in 3D space?"
    ],
    "workedExample": {
      "problem": "Find the shortest distance between the skew lines $\\vec{r} = (\\hat{i} + 2\\hat{j} + \\hat{k}) + \\lambda(\\hat{i} - \\hat{j} + \\hat{k})$ and $\\vec{r} = (2\\hat{i} - \\hat{j} - \\hat{k}) + \\mu(2\\hat{i} + \\hat{j} + 2\\hat{k})$.",
      "steps": [
        "Identify position and direction vectors: $\\vec{a}_1 = \\hat{i} + 2\\hat{j} + \\hat{k}, \\vec{b}_1 = \\hat{i} - \\hat{j} + \\hat{k}$; $\\vec{a}_2 = 2\\hat{i} - \\hat{j} - \\hat{k}, \\vec{b}_2 = 2\\hat{i} + \\hat{j} + 2\\hat{k}$.",
        "Find $\\vec{a}_2 - \\vec{a}_1 = (2-1)\\hat{i} + (-1-2)\\hat{j} + (-1-1)\\hat{k} = \\hat{i} - 3\\hat{j} - 2\\hat{k}$.",
        "Find $\\vec{b}_1 \\times \\vec{b}_2 = \\left|\\begin{matrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 1 & -1 & 1 \\\\ 2 & 1 & 2 \\end{matrix}\\right| = \\hat{i}(-2 - 1) - \\hat{j}(2 - 2) + \\hat{k}(1 - (-2)) = -3\\hat{i} + 0\\hat{j} + 3\\hat{k}$.",
        "Calculate magnitude: $|\\vec{b}_1 \\times \\vec{b}_2| = \\sqrt{(-3)^2 + 0^2 + 3^2} = \\sqrt{9 + 9} = \\sqrt{18} = 3\\sqrt{2}$.",
        "Calculate scalar triple product: $(\\vec{a}_2 - \\vec{a}_1) \\cdot (\\vec{b}_1 \\times \\vec{b}_2) = (1)(-3) + (-3)(0) + (-2)(3) = -3 - 6 = -9$.",
        "Apply distance formula: $d = \\frac{|-9|}{3\\sqrt{2}} = \\frac{9}{3\\sqrt{2}} = \\frac{3}{\\sqrt{2}} = \\frac{3\\sqrt{2}}{2}$."
      ],
      "result": "d = \\frac{3\\sqrt{2}}{2} \\approx 2.121 \\text{ units}"
    },
    "verificationProblem": "Check: $|\\vec{b}_1 \\times \\vec{b}_2| > 0$ confirms lines are non-parallel skew lines. Distance is strictly positive. Matches.",
    "realWorldUse": "Used in air traffic collision avoidance algorithms (calculating minimum separation distance between aircraft flight paths) and satellite orbital tracking.",
    "diagramType": "3d-skew-lines-shortest-distance"
  },
  "CBSE-CH-G12-MATH-CH12": {
    "chapterTitle": "Linear Programming",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 12,
    "essentialLaw": "\\text{Maximize/Minimize: } Z = ax + by \\quad | \\quad \\text{Subject to: } \\sum a_{ij} x_j \\le b_i, \\; x_j \\ge 0 \\quad | \\quad \\text{Corner Point Theorem}",
    "coreConcepts": [
      {
        "heading": "LPP Formulation & Feasible Region",
        "bullets": [
          "Linear Programming Problem (LPP) optimizes a linear objective function $Z = ax + by$ subject to linear inequality constraints and non-negativity restrictions ($x \\ge 0, y \\ge 0$).",
          "Feasible region is the common region determined by all constraints including non-negativity; points inside or on the boundary are feasible solutions.",
          "Convex polygon property: The feasible region of a system of linear inequalities is always a convex polygonal region."
        ]
      },
      {
        "heading": "Corner Point Theorem & Optimal Solution",
        "bullets": [
          "Corner Point Theorem (Theorem 1): The optimal (maximum or minimum) value of the objective function $Z$, if it exists, occurs at a corner point (vertex) of the feasible region.",
          "Bounded Feasible Region: Both maximum and minimum values of $Z$ always exist and occur at extreme corner points.",
          "Unbounded Region: Value $M$ is maximum if open half-plane $ax + by > M$ has no point in common with feasible region; otherwise, no maximum exists."
        ]
      }
    ],
    "examTraps": [
      "Assuming the maximum always exists in an unbounded feasible region without testing the open half-plane $ax + by > M$.",
      "Forgetting non-negativity constraints ($x \\ge 0, y \\ge 0$), which restrict the feasible region to the first quadrant."
    ],
    "quickMentalCheck": "Where do the optimal solutions of a linear programming problem with a bounded feasible region always occur? (Answer: At the corner points / vertices of the feasible region).",
    "cueQuestions": [
      "Why does the Fundamental Theorem of Linear Programming guarantee that optimal solutions occur at the vertices of a convex polygon?",
      "How do you rigorously verify whether an optimal value exists when the feasible region is unbounded?",
      "Under what conditions can a linear programming problem have infinitely many optimal solutions?"
    ],
    "workedExample": {
      "problem": "Maximize $Z = 4x + y$ subject to constraints: $x + y \\le 50, 3x + y \\le 90, x \\ge 0, y \\ge 0$.",
      "steps": [
        "Find boundary intersection points of constraints: $x + y = 50$ and $3x + y = 90$. Subtracting gives $2x = 40 \\implies x = 20, y = 30$.",
        "Identify all corner points of bounded feasible region: $O(0,0), A(30,0), B(20,30), C(0,50)$.",
        "Evaluate objective function $Z = 4x + y$ at each corner point:",
        "At $O(0,0)$: $Z = 4(0) + 0 = 0$.",
        "At $A(30,0)$: $Z = 4(30) + 0 = 120$.",
        "At $B(20,30)$: $Z = 4(20) + 30 = 80 + 30 = 110$.",
        "At $C(0,50)$: $Z = 4(0) + 50 = 50$.",
        "Compare values: Maximum value of $Z$ is $120$ occurring at point $(30, 0)$."
      ],
      "result": "Z_{\\text{max}} = 120 \\quad \\text{at } (30, 0)"
    },
    "verificationProblem": "Check constraints at $(30,0)$: $30 + 0 = 30 \\le 50$, $3(30) + 0 = 90 \\le 90$, $x,y \\ge 0$. Fully feasible and maximal. Matches.",
    "realWorldUse": "Used in oil refinery blending optimization, airline flight crew scheduling, supply chain factory warehouse logistics, and diet nutrition cost minimization.",
    "diagramType": "linear-programming-feasible-region-vertices"
  },
  "CBSE-CH-G12-MATH-CH13": {
    "chapterTitle": "Probability",
    "subject": "Mathematics",
    "grade": 12,
    "chapterNum": 13,
    "essentialLaw": "P(A|B) = \\frac{P(A \\cap B)}{P(B)} \\quad | \\quad P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_{j=1}^n P(E_j)P(A|E_j)} \\quad | \\quad P(A \\cap B) = P(A)P(B) \\; (\\text{Indep})",
    "coreConcepts": [
      {
        "heading": "Conditional Probability & Multiplication Theorem",
        "bullets": [
          "Conditional probability of event $A$ given $B$ has occurred ($P(B) > 0$): $P(A|B) = \\frac{P(A \\cap B)}{P(B)}$.",
          "Multiplication Theorem: $P(A \\cap B) = P(B)P(A|B) = P(A)P(B|A)$.",
          "Independent Events: Events $A$ and $B$ are independent if $P(A \\cap B) = P(A)P(B) \\iff P(A|B) = P(A)$."
        ]
      },
      {
        "heading": "Law of Total Probability & Bayes' Theorem",
        "bullets": [
          "Partition of sample space: Mutually exclusive and exhaustive events $E_1, E_2, \\dots, E_n$.",
          "Law of Total Probability: For any event $A$, $P(A) = \\sum_{j=1}^n P(E_j)P(A|E_j)$.",
          "Bayes' Theorem: Calculates posterior probability of cause $E_i$ given effect $A$: $P(E_i|A) = \\frac{P(E_i)P(A|E_i)}{\\sum_{j=1}^n P(E_j)P(A|E_j)}$."
        ]
      }
    ],
    "examTraps": [
      "Confusing $P(A|E_i)$ (likelihood of event given hypothesis) with $P(E_i|A)$ (posterior probability of hypothesis given event).",
      "Assuming pairwise independent events are mutually independent without verifying three-way joint probability $P(A \\cap B \\cap C) = P(A)P(B)P(C)$."
    ],
    "quickMentalCheck": "If $A$ and $B$ are independent events with $P(A) = 0.3$ and $P(B) = 0.4$, what is $P(A \\cap B)$? (Answer: $0.3 \\times 0.4 = 0.12$).",
    "cueQuestions": [
      "How does Bayes' Theorem update prior belief probabilities into posterior probabilities upon receiving new empirical evidence?",
      "What is the difference between mutually exclusive events and stochastically independent events?",
      "How do you set up a medical diagnostic testing problem using Bayes' Theorem to calculate true positive probability?"
    ],
    "workedExample": {
      "problem": "Bag I contains 3 red and 4 black balls, while Bag II contains 5 red and 6 black balls. One ball is drawn at random from one of the bags and is found to be red. Find the probability that it was drawn from Bag II.",
      "steps": [
        "Let $E_1$ = Bag I is chosen, $E_2$ = Bag II is chosen $\\implies P(E_1) = 1/2, P(E_2) = 1/2$.",
        "Let $A$ = Drawn ball is red.",
        "Conditional probabilities: $P(A|E_1) = \\frac{3}{3+4} = \\frac{3}{7}$; $P(A|E_2) = \\frac{5}{5+6} = \\frac{5}{11}$.",
        "Apply Bayes' Theorem: $P(E_2|A) = \\frac{P(E_2)P(A|E_2)}{P(E_1)P(A|E_1) + P(E_2)P(A|E_2)} = \\frac{\\frac{1}{2} \\times \\frac{5}{11}}{\\frac{1}{2}\\left(\\frac{3}{7} + \\frac{5}{11}\\right)}$.",
        "Simplify: $\\frac{5/11}{\\frac{33 + 35}{77}} = \\frac{5/11}{68/77} = \\frac{5}{11} \\times \\frac{77}{68} = \\frac{35}{68}$."
      ],
      "result": "P(E_2|A) = \\frac{35}{68} \\approx 0.5147"
    },
    "verificationProblem": "Check: $P(E_1|A) = \\frac{33}{68}$. Sum $P(E_1|A) + P(E_2|A) = \\frac{33+35}{68} = \\frac{68}{68} = 1$. Exactly consistent.",
    "realWorldUse": "Forms the core foundation for medical diagnostic test interpretation, spam email filtering algorithms, Bayesian A/B testing in software, and AI machine learning classification.",
    "diagramType": "bayes-theorem-tree-diagram"
  },
  "CBSE-CH-G12-BIO-CH01": {
    "chapterTitle": "Sexual Reproduction in Flowering Plants",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 1,
    "essentialLaw": "\\text{Double Fertilization: } \\text{Syngamy } (n + n \\to 2n \\; \\text{Zygote}) + \\text{Triple Fusion } (n + 2n \\to 3n \\; \\text{PEN}) \\implies \\text{Embryo} + \\text{Endosperm}",
    "coreConcepts": [
      {
        "heading": "Microsporogenesis, Megasporogenesis & Pollination Biology",
        "bullets": [
          "Anther Wall Layers: Epidermis, Endothecium (hygroscopic dehiscence), Middle layers, Tapetum (dense cytoplasm, polyploid, nourishes developing pollen grains, produces sporopollenin in exine).",
          "Pollen Grain: Exine (outer resistant layer made of sporopollenin, with germ pores) and Intine (inner pectin-cellulose layer); 2-celled (Vegetative + Generative, $60\\%$ angiosperms) or 3-celled stage.",
          "Megasporogenesis & Embryo Sac: Monosporic development from functional chalazal megaspore; Mature female gametophyte is 7-celled, 8-nucleate (3 antipodals, 2 synergids with filiform apparatus, 1 egg cell, 1 central cell with 2 polar nuclei).",
          "Pollination: Autogamy (cleistogamous flowers ensure seed set without pollinators), Geitonogamy (functionally cross, genetically self), Xenogamy (true cross-pollination); Outbreeding devices to prevent inbreeding depression."
        ]
      },
      {
        "heading": "Double Fertilization, Endosperm & Embryo Development",
        "bullets": [
          "Double Fertilization: Unique to angiosperms; One male gamete fuses with egg nucleus to form diploid zygote ($2n$, Syngamy); Second male gamete fuses with two polar nuclei to form triploid Primary Endosperm Nucleus ($3n$, Triple Fusion).",
          "Endosperm Development: Precedes embryo development to provide nutrition; Free nuclear (e.g., coconut liquid) followed by cellular endosperm (coconut white meat).",
          "Seeds & Fruit: Albuminous (endospermic: wheat, maize, castor) vs Exalbuminous (non-endospermic: pea, gram, bean); True fruit (from ovary) vs False fruit (involves thalamus: apple, strawberry).",
          "Apomixis (asexual seed development without fertilization, e.g., Asteraceae and grasses) and Polyembryony (multiple embryos in Citrus/Mango from nucellar cells)."
        ]
      }
    ],
    "examTraps": [
      "Confusing ploidy levels: Tapetum (polyploid), Microspore tetrad ($n$), Synergids ($n$), Functional Megaspore ($n$), Zygote ($2n$), PEN ($3n$), Nucellus ($2n$).",
      "Thinking Geitonogamy is genetically cross-pollination (it is functionally cross due to pollinator agent, but genetically SELF-pollination because pollen comes from same plant)."
    ],
    "quickMentalCheck": "How many meiotic and mitotic divisions are required to produce 100 functional seeds in Capsella? For 100 seeds: 100 zygotes + 100 embryo sacs $\\implies 25$ microspore meioses $+ 100$ megaspore meioses $= 125$ total meiotic divisions.",
    "cueQuestions": [
      "Why does endosperm development precede embryo development during angiosperm seed formation?",
      "How does the filiform apparatus of synergids guide pollen tube entry into the embryo sac?",
      "Why is apomixis considered a potential agricultural breakthrough for the hybrid seed industry?"
    ],
    "workedExample": {
      "problem": "What is the ploidy level of the following tissues in an angiosperm: (a) Perisperm, (b) Endosperm in Gymnosperms vs Angiosperms, (c) Aleurone layer, (d) Synergids?",
      "steps": [
        "(a) Perisperm: Persistent residual nucellus (maternal tissue) $= 2n$ (Diploid).",
        "(b) Endosperm: In Gymnosperms, it is the female gametophyte formed BEFORE fertilization $= n$ (Haploid); In Angiosperms, it is formed by triple fusion $= 3n$ (Triploid).",
        "(c) Aleurone layer: Outer protein-rich cellular layer of the triploid endosperm in cereals $= 3n$ (Triploid).",
        "(d) Synergids: Cells of the mature haploid female gametophyte $= n$ (Haploid)."
      ],
      "result": "\\text{Perisperm: } 2n, \\; \\text{Gymnosperm Endosperm: } n, \\; \\text{Angiosperm Endosperm: } 3n, \\; \\text{Aleurone: } 3n, \\; \\text{Synergid: } n"
    },
    "verificationProblem": "Check angiosperm life cycle consistency: Zygote ($2n$) + PEN ($3n$) arise from haploid gametes ($n$) and diploid polar nuclei ($2n$). Ploidy arithmetic verified.",
    "realWorldUse": "Hybrid crop seed production bypassing inbreeding depression via apomictic fixation, commercial vanilla hand-pollination protocols, coconut water nutrient sourcing.",
    "diagramType": "angiosperm-embryo-sac-double-fertilization"
  },
  "CBSE-CH-G12-BIO-CH02": {
    "chapterTitle": "Human Reproduction",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 2,
    "essentialLaw": "\\text{Gametogenesis: Spermatogenesis } (1 \\to 4 \\; \\text{sperms}) \\quad | \\quad \\text{Oogenesis } (1 \\to 1 \\; \\text{ovum} + 3 \\; \\text{polar bodies}) \\quad | \\quad \\text{LH Surge} \\implies \\text{Ovulation}",
    "coreConcepts": [
      {
        "heading": "Male & Female Reproductive Systems & Gametogenesis",
        "bullets": [
          "Male Anatomy & Spermatogenesis: Testes in scrotum ($2-2.5^\\circ\\text{C}$ below core body temp for spermatogenesis); Seminiferous tubules contain Sertoli cells (nurse cells, produce inhibin and androgen-binding protein) and Leydig cells in interstitial spaces (secrete testosterone stimulated by LH).",
          "Spermatogenesis: Spermatogonia ($2n$) $\\to$ Primary spermatocyte ($2n$) $\\xrightarrow{\\text{Meiosis I}}$ Secondary spermatocytes ($n$) $\\xrightarrow{\\text{Meiosis II}}$ Spermatids ($n$) $\\xrightarrow{\\text{Spermiogenesis}}$ Spermatozoa ($n$).",
          "Female Anatomy & Oogenesis: Initiated during embryonic development; Primary oocytes arrested in Prophase I of Meiosis I within primary follicles; Meiosis I completes just prior to ovulation forming Secondary Oocyte ($n$) and First Polar Body; Meiosis II is completed ONLY upon sperm entry (fertilization).",
          "Sperm Structure: Head (acrosome with hyaluronidase enzyme for zona pellucida penetration + condensed nucleus), Middle piece (mitochondrial spiral providing ATP for motility), Tail."
        ]
      },
      {
        "heading": "Menstrual Cycle, Fertilization, Cleavage & Implantation",
        "bullets": [
          "Menstrual Cycle (28 days): 1. Menstrual phase (days 1-5, progesterone withdrawal); 2. Follicular/Proliferative phase (days 6-13, FSH and Estrogen rise); 3. Ovulatory phase (day 14, LH Surge triggers release of secondary oocyte from Graafian follicle); 4. Luteal/Secretory phase (days 15-28, Corpus Luteum secretes high Progesterone to maintain endometrium).",
          "Fertilization: Occurs in the Ampullary-isthmic junction of fallopian tube; Acrosomal reaction digests zona pellucida, triggering cortical granule reaction (polyspermy block).",
          "Cleavage to Blastocyst: Zygote ($2n$) $\\xrightarrow{\\text{Cleavage}}$ Morula (8-16 cells) $\\to$ Blastocyst (outer Trophoblast for uterine implantation + Inner Cell Mass giving rise to embryo proper).",
          "Placenta: Endocrine function (secretes hCG, hPL, Estrogen, Progesterone, Relaxin); Parturition triggered by fetal ejection reflex (oxytocin from maternal posterior pituitary via positive feedback)."
        ]
      }
    ],
    "examTraps": [
      "Assuming oogenesis is initiated at puberty (oogenesis starts during prenatal fetal development; spermatogenesis starts at puberty).",
      "Confusing the origin of hormones: hCG, hPL, and relaxin are produced ONLY during pregnancy (hCG and hPL from placenta, relaxin from ovary/placenta)."
    ],
    "quickMentalCheck": "How many functional spermatozoa and ova are produced from 10 primary spermatocytes and 10 primary oocytes? 10 primary spermatocytes yield $10 \\times 4 = 40$ sperms; 10 primary oocytes yield $10 \\times 1 = 10$ ova.",
    "cueQuestions": [
      "What triggers the LH surge and why is it essential for ovulation during the human menstrual cycle?",
      "How does the cortical reaction of the secondary oocyte establish a permanent block to polyspermy upon fertilization?",
      "What is the physiological role of human Chorionic Gonadotropin (hCG) in early pregnancy maintenance?"
    ],
    "workedExample": {
      "problem": "Trace the endocrine sequence leading from Graafian follicle rupture to the maintenance or breakdown of the uterine endometrium during the menstrual cycle.",
      "steps": [
        "1. Days 6-13: Growing ovarian follicles secrete Estrogen, causing proliferation and thickening of the uterine endometrium.",
        "2. Day 14: Peak Estrogen triggers positive feedback on anterior pituitary, causing rapid secretion of LH (LH Surge), resulting in rupture of Graafian follicle and release of secondary oocyte (Ovulation).",
        "3. Days 15-28: Ruptured follicle transforms into the glandular Corpus Luteum under LH influence, secreting large amounts of Progesterone.",
        "4. If fertilization does NOT occur: Corpus Luteum degenerates into Corpus Albicans; Progesterone levels plummet; Endometrium sheds (Menstruation, Days 1-5).",
        "5. If fertilization occurs: Trophoblast secretes hCG, rescuing Corpus Luteum to maintain Progesterone and sustain pregnancy."
      ],
      "result": "\\text{LH Surge} \\to \\text{Ovulation} \\to \\text{Corpus Luteum} \\to \\text{High Progesterone} \\to \\text{Endometrial Maintenance}"
    },
    "verificationProblem": "Check hormone-phase correspondence: Progesterone is high exclusively during the secretory/luteal phase and nearly absent in the follicular phase. Verified.",
    "realWorldUse": "Urine hCG pregnancy test kits (lateral flow immunoassay), IVF-ICSI fertility treatments, combined oral contraceptive hormone mechanisms.",
    "diagramType": "menstrual-cycle-hormone-levels-chart"
  },
  "CBSE-CH-G12-BIO-CH03": {
    "chapterTitle": "Reproductive Health",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 3,
    "essentialLaw": "\\text{Contraception: Barrier} + \\text{Hormonal (Anovulation)} + \\text{IUD (Phagocytosis/Motility)} + \\text{Surgical (Sterilization)} \\implies 100\\% \\; \\text{Protection}",
    "coreConcepts": [
      {
        "heading": "Population Stabilization & Contraceptive Methods",
        "bullets": [
          "Need for Reproductive Health: Amniocentesis ban (prevents female foeticide; statutory regulation for chromosomal anomalies only).",
          "Natural Methods: Periodic abstinence (avoiding coitus days 10-17 of menstrual cycle), Coitus interruptus, Lactational amenorrhea (effective up to 6 months postpartum due to high prolactin suppressing GnRH).",
          "Barrier Methods: Condoms (protect against STIs/AIDS), Diaphragms, Cervical caps.",
          "Intrauterine Devices (IUDs): Non-medicated (Lippes loop); Copper-releasing (CuT, Cu7, Multiload 375: $Cu^{2+}$ ions suppress sperm motility and fertilizing capacity); Hormone-releasing (Progestasert, LNG-20: make uterus unsuitable for implantation and cervix hostile to sperms).",
          "Oral Contraceptive Pills: Combined estrogen-progestogen (inhibit ovulation and implantation); Saheli: Non-steroidal once-a-week pill (Centchroman) developed by CDRI Lucknow."
        ]
      },
      {
        "heading": "MTP, Sexually Transmitted Infections (STIs) & ART",
        "bullets": [
          "Medical Termination of Pregnancy (MTP Act amended): Safe up to first trimester (12 weeks); Requires registered medical practitioner approval to prevent maternal mortality.",
          "Sexually Transmitted Infections (STIs): Bacterial (Gonorrhoea, Syphilis), Viral (Hepatitis B, Genital Herpes, HIV/AIDS; Hepatitis B, Genital Herpes, and HIV are incurable).",
          "Assisted Reproductive Technologies (ART) for Infertility: IVF (In Vitro Fertilization) $\\to$ Embryo Transfer (ET); ZIFT (Zygote Intra-Fallopian Transfer, embryo up to 8 blastomeres into fallopian tube); IUT (Intra-Uterine Transfer, embryo $>8$ blastomeres into uterus); GIFT (Gamete Intra-Fallopian Transfer, transfer of ovum into fallopian tube for female who cannot produce one); ICSI (Intra-Cytoplasmic Sperm Injection); AI / IUI (Artificial Insemination into uterus for low sperm count)."
        ]
      }
    ],
    "examTraps": [
      "Confusing ZIFT (transfer of zygote/early embryo $\\le 8$ blastomeres into fallopian tube) with IUT (transfer of embryo $>8$ blastomeres into uterus).",
      "Thinking all STIs are curable if detected early (HIV, Hepatitis B, and Genital Herpes cannot be permanently cured)."
    ],
    "quickMentalCheck": "How does the non-steroidal oral contraceptive pill Saheli prevent pregnancy? It acts as a Selective Estrogen Receptor Modulator (SERM) that binds estrogen receptors in the uterus, preventing endometrial implantation.",
    "cueQuestions": [
      "Why is statutory ban on amniocentesis for prenatal sex determination legally enforced in India?",
      "How do copper-releasing IUDs (CuT) function mechanically and biochemically to prevent conception?",
      "What are the key medical differences between ZIFT, GIFT, and ICSI in clinical infertility management?"
    ],
    "workedExample": {
      "problem": "Differentiate between ZIFT, GIFT, and ICSI based on donor material, processing location, and clinical indication.",
      "steps": [
        "ZIFT (Zygote Intra-Fallopian Transfer): Sperm and egg are fertilized in vitro (laboratory dish); Zygote or early embryo up to 8 blastomeres is transferred into the fallopian tube. Indicated for blocked fallopian tubes or unexplained IVF failures.",
        "GIFT (Gamete Intra-Fallopian Transfer): Unfertilized ovum collected from donor is transferred directly into the fallopian tube of recipient along with partner sperms; Fertilization occurs IN VIVO inside the woman body. Indicated for women who cannot ovulate but have intact fallopian tubes.",
        "ICSI (Intra-Cytoplasmic Sperm Injection): A single sperm is directly injected into the cytoplasm of an ovum in vitro using a micropipette. Indicated for severe male infertility (oligospermia or azoospermia)."
      ],
      "result": "\\text{ZIFT: in vitro embryo } (\\le 8 \\text{ cells}) \\to \\text{Tube}; \\quad \\text{GIFT: unfertilized gametes} \\to \\text{Tube}; \\quad \\text{ICSI: direct sperm microinjection}"
    },
    "verificationProblem": "Check implantation site logic: Fallopian tube accommodates embryos only up to 8 blastomeres (ZIFT). Beyond 8 blastomeres, embryo must be transferred directly into uterus (IUT). Verified.",
    "realWorldUse": "Clinical reproductive medicine in IVF fertility centers, population demography policy planning, STI screening diagnostics.",
    "diagramType": "contraceptive-mechanisms-summary-flow"
  },
  "CBSE-CH-G12-BIO-CH04": {
    "chapterTitle": "Principles of Inheritance and Variation",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 4,
    "essentialLaw": "\\text{Monohybrid: } 3:1 \\; (\\text{Pheno}), \\; 1:2:1 \\; (\\text{Geno}) \\quad | \\quad \\text{Dihybrid: } 9:3:3:1 \\quad | \\quad \\text{Recombination Frequency } = \\frac{\\text{Recombinant Progeny}}{\\text{Total Progeny}}\\times 100\\%",
    "coreConcepts": [
      {
        "heading": "Mendelian Genetics, Deviations & Chromosomal Theory",
        "bullets": [
          "Mendel's Laws: 1. Law of Dominance (characters controlled by discrete unit factors occurring in pairs; one dominant, one recessive); 2. Law of Segregation (alleles separate during gamete formation with zero blending, universal law); 3. Law of Independent Assortment (dihybrid cross $9:3:3:1$).",
          "Incomplete Dominance: Heterozygote has intermediate phenotype (e.g., Snap / Mirabilis jalapa red $\\times$ white $\\to$ pink $F_1$; $F_2$ phenotypic and genotypic ratio $1:2:1$).",
          "Codominance & Multiple Alleles: ABO blood groups controlled by $I^A, I^B, i$ alleles on chromosome 9 ($I^A I^B$ express both antigens equally; 6 genotypes, 4 phenotypes).",
          "Chromosomal Theory of Inheritance (Sutton & Boveri): Chromosomes and genes occur in pairs; Homologous chromosomes segregate during Meiosis I.",
          "Linkage & Recombination (T.H. Morgan on Drosophila melanogaster): Linked genes located on same chromosome do not assort independently; Recombination frequency is directly proportional to physical distance between genes on chromosome (Alfred Sturtevant genetic mapping, $1\\% \\text{ recombination} = 1\\text{ map unit / cM}$)."
        ]
      },
      {
        "heading": "Sex Determination & Genetic Disorders (Pedigree Analysis)",
        "bullets": [
          "Sex Determination: XX-XY (Humans, Drosophila: male heterogamety); XX-XO (Grasshopper); ZZ-ZW (Birds: female heterogamety); Haplodiploidy in honeybees (females $2n=32$, males $n=16$ develop parthenogenetically).",
          "Mendelian Disorders (Gene Mutations): Autosomal Recessive (Sickle Cell Anemia: $\\text{GAG} \\to \\text{GUG}$ mutation at codon 6 of $\\beta$-globin converting Glutamic acid to Valine; Phenylketonuria, Thalassemia); Autosomal Dominant (Myotonic dystrophy); X-linked Recessive (Hemophilia, Red-green color blindness: criss-cross inheritance from father to daughter to grandson).",
          "Chromosomal Disorders (Aneuploidy due to non-disjunction): Down Syndrome (Trisomy 21, $2n+1=47$, furrowed tongue, mental retardation); Klinefelter Syndrome ($47, \\text{XXY}$, sterile male with gynecomastia); Turner Syndrome ($45, \\text{XO}$, sterile female with webbed neck, rudimentary ovaries)."
        ]
      }
    ],
    "examTraps": [
      "Assuming Thalassemia and Sickle Cell Anemia are identical (Sickle cell anemia is a QUALITATIVE defect of mutated globin chain; Thalassemia is a QUANTITATIVE defect of synthesizing too few globin chains).",
      "Confusing the genetic basis of bird sex determination (female is heterogametic ZW, male is homogametic ZZ)."
    ],
    "quickMentalCheck": "If a color-blind man ($X^c Y$) marries a homozygous normal vision woman ($X^C X^C$), what percentage of their sons will be color-blind? $0\\%$ (sons inherit $Y$ from father and normal $X^C$ from mother; all daughters will be carriers $X^C X^c$).",
    "cueQuestions": [
      "How did Morgan experiment on eye color and wing length in Drosophila prove physical gene linkage on chromosomes?",
      "Why is sickle cell anemia called a molecular disease and how does it confer selective advantage against malaria?",
      "How does pedigree analysis differentiate between autosomal dominant, autosomal recessive, and X-linked recessive traits?"
    ],
    "workedExample": {
      "problem": "In a dihybrid test cross between a heterozygous tall round-seeded pea plant ($TtRr$) and a dwarf wrinkled pea plant ($ttrr$), what is the expected phenotypic ratio of the offspring assuming independent assortment?",
      "steps": [
        "Genotype of heterozygous parent: $TtRr$, producing 4 gamete types in equal $25\\%$ frequency: $TR, Tr, tR, tr$.",
        "Genotype of homozygous recessive test cross parent: $ttrr$, producing only 1 gamete type: $tr$.",
        "Cross Punnett square outcomes: $1\\, TtRr$ (Tall Round) : $1\\, Ttrr$ (Tall Wrinkled) : $1\\, ttRr$ (Dwarf Round) : $1\\, ttrr$ (Dwarf Wrinkled).",
        "Phenotypic and genotypic ratios are both identically $1:1:1:1$."
      ],
      "result": "\\text{Phenotypic Ratio: } 1 \\text{ Tall Round} : 1 \\text{ Tall Wrinkled} : 1 \\text{ Dwarf Round} : 1 \\text{ Dwarf Wrinkled} \\; (1:1:1:1)"
    },
    "verificationProblem": "Check probability: Each phenotype has probability $\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4} = 25\\%$. Sum of probabilities $= 1.0$. Independent assortment holds.",
    "realWorldUse": "Pre-implantation genetic diagnosis (PGD) for sickle cell and thalassemia carrier screening, marker-assisted crop breeding in agriculture, forensic paternity pedigree verification.",
    "diagramType": "pedigree-chart-mendelian-inheritance"
  },
  "CBSE-CH-G12-BIO-CH05": {
    "chapterTitle": "Molecular Basis of Inheritance",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 5,
    "essentialLaw": "\\text{Central Dogma: DNA} \\xrightarrow{\\text{Replication}} \\text{DNA} \\xrightarrow{\\text{Transcription}} \\text{mRNA} \\xrightarrow{\\text{Translation}} \\text{Protein} \\quad | \\quad \\text{Chargaff: } A=T, \\; G=C, \\; \\frac{A+G}{T+C}=1",
    "coreConcepts": [
      {
        "heading": "DNA Structure, Packaging & Experimental Proof of DNA as Genetic Material",
        "bullets": [
          "DNA Double Helix (Watson & Crick, 1953): Anti-parallel strands ($5' \\to 3'$ and $3' \\to 5'$); Pitch $= 3.4\\text{ nm}$ ($10\\text{ bp}$ per turn, $0.34\\text{ nm}$ between base pairs); Right-handed B-DNA; Chargaff Rule: $[A] = [T]$ and $[G] = [C] \\implies [A+G]/[T+C] = 1$.",
          "DNA Packaging in Eukaryotes: Nucleosome consists of $200\\text{ bp}$ DNA wrapped around octamer of basic histone proteins ($H_2A, H_2B, H_3, H_4$ pair) stabilized by $H_1$; Euchromatin (loosely packed, light staining, transcriptionally active) vs Heterochromatin (densely packed, dark, inactive).",
          "Transforming Principle (Griffith, 1928): Heat-killed smooth S-strain transformed live rough R-strain in mice; Avery, MacLeod & McCarty (1944) proved DNA is transforming substance using DNase.",
          "Hershey-Chase Experiment (1952): Bacteriophage T2 labeled with $^{35}\\text{S}$ (protein capsule) and $^{32}\\text{P}$ (DNA core); Only $^{32}\\text{P}$ entered E. coli bacteria, proving DNA is the definitive genetic material."
        ]
      },
      {
        "heading": "Replication, Transcription, Genetic Code & Lac Operon",
        "bullets": [
          "Semi-Conservative Replication (Meselson & Stahl, 1958 using $^{15}\\text{N}$ and CsCl density gradient): DNA Polymerase synthesizes $5' \\to 3'$; Continuous leading strand, discontinuous lagging strand with Okazaki fragments joined by DNA Ligase.",
          "Transcription in Eukaryotes: RNA Polymerase I (rRNA), II (hnRNA/mRNA), III (tRNA, 5S rRNA); Post-transcriptional modifications: Capping ($5'$-methylguanosine triphosphate), Tailing ($3'$-poly-A tail of 200-300 residues), Splicing (removal of non-coding introns and joining of coding exons by spliceosome).",
          "Genetic Code (Nirenberg, Khorana): Triplet, degenerate (61 sense codons code for 20 amino acids; 3 stop codons: UAA, UAG, UGA), unambiguous, universal, non-overlapping; AUG is dual function (Initiation codon and codes for Methionine); tRNA adapter with cloverleaf secondary and L-shaped tertiary structure.",
          "Lac Operon Regulation (Jacob & Monod): Inducible operon; Repressor protein (from $i$ gene) binds operator ($O$); Lactose (inducer) binds repressor, causing conformational change and releasing operator; RNA polymerase transcribes structural genes: $z$ ($\\beta$-galactosidase), $y$ (permease), $a$ (transacetylase)."
        ]
      }
    ],
    "examTraps": [
      "Stating that genetic code is ambiguous (the code is strictly UNAMBIGUOUS: one specific codon codes for ONLY one amino acid).",
      "Confusing the enzyme that joins Okazaki fragments (DNA Ligase) with the enzyme that synthesizes RNA primers (RNA Primase)."
    ],
    "quickMentalCheck": "In a double-stranded DNA sample, Cytosine constitutes $20\\%$ of bases. What is the percentage of Adenine? By Chargaff rule: $[C] = [G] = 20\\% \\implies [G+C] = 40\\%$. Remaining $[A+T] = 60\\% \\implies [A] = 30\\%$.",
    "cueQuestions": [
      "How did the Meselson and Stahl experiment prove the semi-conservative replication of DNA using heavy nitrogen ($^{15}\\text{N}$)?",
      "Why must eukaryotic primary transcripts (hnRNA) undergo $5'$-capping, $3'$-polyadenylation, and intron splicing before translation?",
      "How does the presence of lactose switch ON the lac operon in E. coli at the molecular level?"
    ],
    "workedExample": {
      "problem": "If the sequence of the coding strand of DNA is $5'-\\text{ATGCATGCATGC}-3'$, write the sequence of the corresponding template strand and the transcribed mRNA strand.",
      "steps": [
        "Coding strand (non-template, sense): $5'-\\text{A-T-G-C-A-T-G-C-A-T-G-C}-3'$.",
        "Template strand (antisense): Runs $3' \\to 5'$ with complementary Watson-Crick bases: $3'-\\text{T-A-C-G-T-A-C-G-T-A-C-G}-5'$.",
        "Transcribed mRNA: Synthesized complementary to template strand in $5' \\to 3'$ direction. It is identical to the coding strand except that Thymine (T) is replaced by Uracil (U).",
        "mRNA sequence: $5'-\\text{A-U-G-C-A-U-G-C-A-U-G-C}-3'$."
      ],
      "result": "\\text{Template Strand: } 3'-\\text{TACGTACGTACG}-5', \\quad \\text{mRNA: } 5'-\\text{AUGCAUGCAUGC}-3'"
    },
    "verificationProblem": "Check translation compatibility: First triplet on mRNA is $5'-\\text{AUG}-3'$ (Start codon coding for Methionine). Base pairing verified.",
    "realWorldUse": "CRISPR-Cas9 gene editing, Sanger and Next-Generation DNA sequencing for precision medicine, PCR forensic DNA profiling (VNTR analysis).",
    "diagramType": "lac-operon-gene-regulation"
  },
  "CBSE-CH-G12-BIO-CH06": {
    "chapterTitle": "Evolution",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 6,
    "essentialLaw": "p^2 + 2pq + q^2 = 1 \\quad | \\quad p + q = 1 \\; (\\text{Hardy-Weinberg Equilibrium}) \\quad | \\quad \\text{Evolution} = \\Delta(\\text{Allele Frequencies})",
    "coreConcepts": [
      {
        "heading": "Origin of Life, Evidences of Evolution & Adaptive Radiation",
        "bullets": [
          "Miller-Urey Experiment (1953): Simulated prebiotic reducing atmosphere ($\text{CH}_4, \text{NH}_3, \text{H}_2, \text{H}_2\text{O}$ vapor at $800^\\circ\\text{C}$ with electric discharge); Synthesized amino acids (glycine, alanine, aspartic acid), supporting chemical origin of life (Oparin-Haldane theory).",
          "Homologous Organs (Divergent Evolution): Same structural origin, modified for different functions (e.g., forelimbs of human, cheetah, whale, bat; vertebrate hearts; thorn of Bougainvillea and tendril of Cucurbita).",
          "Analogous Organs (Convergent Evolution): Different anatomical origin, similar function due to similar selection pressures (e.g., wings of butterfly and birds; eye of octopus and mammal; flippers of penguins and dolphins; sweet potato root and potato stem).",
          "Adaptive Radiation: Diversification of an ancestral species into different ecological niches starting from a single point (e.g., Darwin finches of Galapagos Islands; Australian marsupials)."
        ]
      },
      {
        "heading": "Theories of Evolution, Natural Selection & Human Ancestry",
        "bullets": [
          "Lamarckism: Use and disuse of organs and inheritance of acquired characters (disproven by Weismann germplasm theory).",
          "Darwinism: Natural selection based on overproduction, struggle for existence, survival of the fittest, and variation (Industrial Melanism in peppered moth Biston betularia; Antibiotic-resistant bacteria).",
          "Mutation Theory (Hugo de Vries): Evolution is driven by large, single-step mutations (saltation) which are random and directionless, unlike Darwin continuous gradual variations.",
          "Hardy-Weinberg Principle: Allele frequencies in a gene pool remain constant across generations in the absence of evolutionary influences ($p^2 + 2pq + q^2 = 1$); Factors disrupting equilibrium: Gene flow, Genetic drift (Founder effect, Bottleneck effect), Mutation, Genetic recombination, Natural selection (Stabilizing, Directional, Disruptive).",
          "Human Evolution: Dryopithecus $\\to$ Ramapithecus $\\to$ Australopithecus ($2\\text{ mya}$, used stone weapons) $\\to$ Homo habilis ($650-800\\text{ cc}$, first tool maker) $\\to$ Homo erectus ($1.5\\text{ mya}, 900\\text{ cc}$, ate meat) $\\to$ Neanderthal man ($1400\\text{ cc}$, buried dead) $\\to$ Homo sapiens ($75,000-10,000\\text{ years ago}$)."
        ]
      }
    ],
    "examTraps": [
      "Confusing sweet potato (root tuber) and potato (stem tuber) as homologous (they are ANALOGOUS organs resulting from convergent evolution for starch storage).",
      "Thinking Darwinian variations are saltatory (Darwin variations are small and directional; Hugo de Vries mutations are large and random/directionless)."
    ],
    "quickMentalCheck": "In a population in Hardy-Weinberg equilibrium, the frequency of recessive phenotype ($q^2$) is $16\\%$. What is the frequency of heterozygous carriers ($2pq$)? $q = \\sqrt{0.16} = 0.4 \\implies p = 1 - 0.4 = 0.6 \\implies 2pq = 2(0.6)(0.4) = 0.48 = 48\\%$.",
    "cueQuestions": [
      "How does industrial melanism in the peppered moth (Biston betularia) provide classic observable evidence for natural selection?",
      "What five factors disturb the Hardy-Weinberg genetic equilibrium in a biological population?",
      "What are the key evolutionary milestones distinguishing Homo habilis, Homo erectus, and Neanderthal man?"
    ],
    "workedExample": {
      "problem": "In a random mating population of 1000 individuals, 40 individuals express a recessive trait ($aa$). Calculate the allele frequencies of $A$ and $a$, and the expected number of homozygous dominant ($AA$) and heterozygous ($Aa$) individuals.",
      "steps": [
        "Frequency of homozygous recessive individuals: $q^2 = \\frac{40}{1000} = 0.04$.",
        "Calculate recessive allele frequency: $q = \\sqrt{0.04} = 0.20$.",
        "Calculate dominant allele frequency: $p = 1 - q = 1 - 0.20 = 0.80$.",
        "Frequency of homozygous dominant: $p^2 = (0.80)^2 = 0.64 \\implies$ Number of $AA$ individuals $= 0.64 \\times 1000 = 640$.",
        "Frequency of heterozygous: $2pq = 2(0.80)(0.20) = 0.32 \\implies$ Number of $Aa$ individuals $= 0.32 \\times 1000 = 320$."
      ],
      "result": "p(A) = 0.80, \\; q(a) = 0.20, \\quad AA = 640 \\text{ individuals}, \\quad Aa = 320 \\text{ individuals}"
    },
    "verificationProblem": "Check population total: $AA + Aa + aa = 640 + 320 + 40 = 1000$. Hardy-Weinberg sum $p^2 + 2pq + q^2 = 0.64 + 0.32 + 0.04 = 1.00$. Verified.",
    "realWorldUse": "Tracking antibiotic-resistant Superbug bacterial strains (MRSA), evolutionary epidemiology of influenza and coronavirus mutations, conservation genetics of endangered cheetahs.",
    "diagramType": "hardy-weinberg-selection-curves"
  },
  "CBSE-CH-G12-BIO-CH07": {
    "chapterTitle": "Human Health and Disease",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 7,
    "essentialLaw": "\\text{Immunity} = \\text{Innate (Barriers)} + \\text{Acquired (Humoral } B\\text{-cells } + \\text{ Cell-Mediated } T\\text{-cells)} \\quad | \\quad \\text{Antibody: } H_2L_2",
    "coreConcepts": [
      {
        "heading": "Common Infectious Diseases in Humans & Pathogen Life Cycles",
        "bullets": [
          "Bacterial: Typhoid (Salmonella typhi, confirmed by Widal test; intestinal perforation), Pneumonia (Streptococcus pneumoniae, alveoli filled with fluid).",
          "Viral: Common Cold (Rhinovirus, infects nose/respiratory passage but not lungs).",
          "Protozoan: Malaria (Plasmodium vivax/falciparum: Female Anopheles mosquito vector transmits sporozoites $\\to$ liver cells $\\to$ RBCs rupture releasing toxic Haemozoin causing recurring fever every 3-4 days); Amoebiasis (Entamoeba histolytica, transmitted by houseflies).",
          "Fungal & Helminthic: Ringworm (Microsporum, Trichophyton); Ascariasis (Ascaris lumbricoides); Elephantiasis/Filariasis (Wuchereria bancrofti, transmitted by female Culex mosquito, chronic lymphatic inflammation)."
        ]
      },
      {
        "heading": "Immune System, AIDS, Cancer & Drug Abuse",
        "bullets": [
          "Innate Immunity: Physical (skin, mucus), Physiological (stomach $\\text{HCl}$, lysozyme in saliva/tears), Cellular (PMNL-neutrophils, macrophages), Cytokine (Interferons protect non-infected cells from viral attack).",
          "Acquired Immunity: Humoral (B-lymphocytes produce $H_2L_2$ antibodies: $\\text{IgG, IgA}$ in colostrum, $\\text{IgM, IgE}$ in allergy, $\\text{IgD}$) vs Cell-Mediated (T-lymphocytes, responsible for graft rejection in organ transplants).",
          "AIDS (HIV): Retrovirus binds CD4 receptors on Helper T-cells ($T_H$) and macrophages; Uses Reverse Transcriptase to synthesize viral DNA; Diagnosed by ELISA and confirmed by Western Blot.",
          "Cancer: Loss of contact inhibition; Benign vs Malignant tumors (Metastasis is most feared property); Oncogenes and Tumor Suppressor Genes.",
          "Drugs: Opioids (Heroin/smack from Papaver somniferum, depressant), Cannabinoids (Cannabis sativa, cardiovascular effects), Cocaine/Crack (Erythroxylum coca, interferes with dopamine transport, hallucinations)."
        ]
      }
    ],
    "examTraps": [
      "Assuming Rhinovirus causes pneumonia (Rhinovirus infects ONLY the upper respiratory tract/nose, leaving alveoli unaffected).",
      "Confusing which immunoglobulin crosses placenta ($\\text{IgG}$) vs which is present in mother colostrum milk ($\\text{IgA}$)."
    ],
    "quickMentalCheck": "Which cells are directly destroyed by HIV, causing progressive immune collapse? CD4+ Helper T-lymphocytes ($T_H$ cells), reducing their count below $200\\text{ cells/}\\mu\\text{L}$.",
    "cueQuestions": [
      "How does the life cycle of Plasmodium explain why the sexual stage occurs in the mosquito and asexual stage in humans?",
      "Why is Cell-Mediated Immunity (CMI) primarily responsible for the rejection of transplanted kidney or heart grafts?",
      "What is the molecular mechanism of metastasis that distinguishes malignant tumors from benign tumors?"
    ],
    "workedExample": {
      "problem": "Explain the structure of an antibody molecule and state why it is represented as $H_2L_2$. Which antibody class is responsible for allergic reactions?",
      "steps": [
        "Structure of Antibody: A Y-shaped glycoprotein composed of four polypeptide chains held together by disulfide bonds.",
        "Two identical heavy ($H$) chains (longer, higher molecular weight) and two identical light ($L$) chains (shorter, lower molecular weight). Hence represented as $H_2L_2$.",
        "Each chain has a Constant region ($C$) and a Variable region ($V$) forming the Antigen-Binding Site (Paratope) at the tips of the Y-arms.",
        "Allergic reactions: Mediated by Immunoglobulin E ($\\text{IgE}$), which binds to Fc receptors on mast cells and basophils, triggering the release of histamine and serotonin."
      ],
      "result": "\\text{Structure: } H_2L_2 \\text{ with 2 Antigen Binding Sites}; \\quad \\text{Allergy Antibody: } \\text{IgE}"
    },
    "verificationProblem": "Check paratope stoichiometry: Each $H_2L_2$ monomer possesses 2 identical antigen-binding pockets ($V_H + V_L$), making the monomer bivalent. Verified.",
    "realWorldUse": "Monoclonal antibody therapies for metastatic cancers (e.g., Trastuzumab), antiretroviral therapy (ART) cocktail regimens for HIV management, antivenom sera passive immunization.",
    "diagramType": "antibody-molecule-structure-h2l2"
  },
  "CBSE-CH-G12-BIO-CH08": {
    "chapterTitle": "Microbes in Human Welfare",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 8,
    "essentialLaw": "\\text{Sewage Treatment: Primary (Physical)} \\to \\text{Secondary (Biological / BOD Reduction)} \\to \\text{Anaerobic Digestion (Biogas: } \\text{CH}_4 + \\text{CO}_2 + \\text{H}_2\\text{S})",
    "coreConcepts": [
      {
        "heading": "Microbes in Household, Fermentation & Industrial Chemicals",
        "bullets": [
          "Household: Lactobacillus / LAB (converts milk to curd, produces lactic acid, enriches Vitamin $\\text{B}_{12}$, checks disease-causing microbes in gut); Baker yeast (Saccharomyces cerevisiae, causes dough puffing via $\\text{CO}_2$ release); Swiss cheese holes produced by Propionibacterium sharmanii (large $\\text{CO}_2$ production); Roquefort cheese ripened by Penicillium roqueforti.",
          "Fermentation: Brewer yeast (Saccharomyces cerevisiae) ferments malted cereals and fruit juices into ethanol.",
          "Antibiotics: Penicillin (first antibiotic discovered by Alexander Fleming from Penicillium notatum, established by Chain and Florey).",
          "Bioactive Chemicals: Citric acid (Aspergillus niger, fungus); Acetic acid (Acetobacter aceti, bacterium); Butyric acid (Clostridium butylicum); Lactic acid (Lactobacillus); Cyclosporin A (immunosuppressive drug in organ transplants, produced by Trichoderma polysporum fungus); Statins (blood cholesterol-lowering agents, competitive inhibitors of cholesterol synthesis enzyme, produced by Monascus purpureus yeast); Streptokinase (clot buster for myocardial infarction patients, from Streptococcus)."
        ]
      },
      {
        "heading": "Microbes in Sewage Treatment, Biogas & Biocontrol/Biofertilizers",
        "bullets": [
          "Sewage Treatment: Primary treatment (physical removal of floating debris by filtration and grit by sedimentation) $\\to$ Secondary treatment (Biological: aerobic aeration tank where active microbial flocs consume organic matter, dramatically reducing Biochemical Oxygen Demand / BOD) $\\to$ Settling tank $\\to$ Anaerobic sludge digesters (methanogens produce biogas: $\\text{CH}_4, \\text{CO}_2, \\text{H}_2\\text{S}$).",
          "Biogas Production: Methanobacterium in anaerobic cattle rumen (gobar gas rich in methane); IARI and KVIC developed rural biogas plants.",
          "Biocontrol Agents: Bacillus thuringiensis (Bt, insecticidal Cry toxin against lepidopterans); Trichoderma (free-living fungus controlling root pathogens); Baculoviruses (NPV, narrow-spectrum species-specific insecticidal viruses).",
          "Biofertilizers: Nitrogen fixers: Symbiotic (Rhizobium in legumes), Free-living (Azotobacter, Azospirillum); Mycorrhiza (Glomus fungus absorbs phosphorus for plant); Cyanobacteria (Anabaena, Nostoc in paddy fields)."
        ]
      }
    ],
    "examTraps": [
      "Confusing the source organism and clinical function of Cyclosporin A (Trichoderma polysporum, immunosuppressant) with Statins (Monascus purpureus, cholesterol-lowering).",
      "Thinking high BOD indicates clean water (High BOD indicates HIGH organic pollution and heavy bacterial contamination; low BOD means clean water)."
    ],
    "quickMentalCheck": "Which microbe produces the clot-buster enzyme Streptokinase used for clearing blood clots in heart attack patients? Streptococcus bacterium (genetically modified strains).",
    "cueQuestions": [
      "How does Biochemical Oxygen Demand (BOD) serve as a direct quantitative indicator of organic water pollution?",
      "How does Monascus purpureus-derived Statin competitively inhibit the rate-limiting enzyme in human cholesterol synthesis?",
      "Why are Baculoviruses (NPV) considered ideal biocontrol agents for integrated pest management (IPM) programs?"
    ],
    "workedExample": {
      "problem": "Match the following bioactive substances with their producing microorganisms and clinical/industrial applications: (a) Cyclosporin A, (b) Statin, (c) Streptokinase, (d) Citric acid.",
      "steps": [
        "(a) Cyclosporin A: Produced by fungus Trichoderma polysporum. Clinical application: Immunosuppressive agent used to prevent organ rejection in transplant patients.",
        "(b) Statin: Produced by yeast Monascus purpureus. Clinical application: Blood cholesterol-lowering agent acting via competitive inhibition of HMG-CoA reductase.",
        "(c) Streptokinase: Produced by bacterium Streptococcus. Clinical application: \"Clot buster\" enzyme for dissolving intravascular thrombi in heart attack patients.",
        "(d) Citric acid: Produced by fungus Aspergillus niger. Industrial application: Food acidulant and natural preservative in beverages and pharmaceuticals."
      ],
      "result": "(a) \\text{Trichoderma polysporum} \\to \\text{Immunosuppressant}; \\; (b) \\text{Monascus purpureus} \\to \\text{Cholesterol lowerer}; \\; (c) \\text{Streptococcus} \\to \\text{Clot buster}"
    },
    "verificationProblem": "Check biological domain: Trichoderma (fungus), Monascus (yeast/fungus), Streptococcus (bacterium), Aspergillus (fungus). Classification verified.",
    "realWorldUse": "Municipal sewage effluent water reclamation plants, organic farming biofertilizers replacing chemical NPK, industrial probiotic fermented dairy manufacturing.",
    "diagramType": "sewage-treatment-plant-bod-reduction"
  },
  "CBSE-CH-G12-BIO-CH09": {
    "chapterTitle": "Biotechnology: Principles and Processes",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 9,
    "essentialLaw": "\\text{Recombinant DNA} = \\text{Foreign Gene} \\xrightarrow{\\text{Restriction Endonuclease}} \\text{Sticky Ends} \\xrightarrow{\\text{DNA Ligase}} \\text{pBR322 Vector} \\xrightarrow{\\text{Transformation}} \\text{Host Expression}",
    "coreConcepts": [
      {
        "heading": "Recombinant DNA Technology Tools: Enzymes & Cloning Vectors",
        "bullets": [
          "Restriction Endonucleases (Molecular Scissors): Recognize specific palindromic sequences (e.g., EcoRI recognizes $5'-\\text{GAATTC}-3'$, cutting between G and A to leave single-stranded sticky ends); Discovered by Arber, Smith & Nathans.",
          "Other Essential Enzymes: DNA Ligase (molecular glue), Alkaline Phosphatase (prevents vector self-ligation), Taq DNA Polymerase (thermostable from Thermus aquaticus for PCR).",
          "Cloning Vector (pBR322): Features: 1. Origin of replication (ori, controls copy number); 2. Selectable markers ($amp^R$ and $tet^R$ antibiotic resistance genes); 3. Unique cloning sites (BamHI, SalI in $tet^R$; PstI, PvuI in $amp^R$).",
          "Insertional Inactivation: Inserting foreign gene into BamHI site disrupts $tet^R$ gene (recombinants grow on ampicillin but die on tetracycline); Blue-White screening using $\\beta$-galactosidase ($lacZ$) gene: recombinants form white colonies because chromogenic substrate X-gal is not cleaved."
        ]
      },
      {
        "heading": "Host Transformation, PCR Amplification & Bioreactors",
        "bullets": [
          "Competent Host Transformation: Divalent cations ($\text{Ca}^{2+}$) + Heat shock ($42^\\circ\\text{C}$); Microinjection (direct injection into animal cell nucleus); Biolistics / Gene Gun (gold or tungsten microparticles coated with DNA for plant cells); Disarmed Ti plasmid of Agrobacterium tumefaciens.",
          "Polymerase Chain Reaction (PCR, Kary Mullis): 3 Steps per cycle: 1. Denaturation ($94^\\circ\\text{C}$, separates DNA strands); 2. Primer Annealing ($54^\\circ\\text{C}$, synthetic oligonucleotide primers bind); 3. Primer Extension ($72^\\circ\\text{C}$, Taq polymerase synthesizes new strand); $n$ cycles yield $2^n$ copies (30 cycles amplify $\\approx 10^9$-fold).",
          "Bioreactors (Stirred-tank & Sparged): Large-scale ($100-1000\\text{ L}$) culture under optimal temperature, pH, oxygen, and nutrient conditions; Continuous culture maintains exponential log phase.",
          "Downstream Processing: Separation, purification, quality control, and clinical formulation before marketing."
        ]
      }
    ],
    "examTraps": [
      "Using a regular DNA polymerase in PCR (regular polymerase denatures and is permanently inactivated at $94^\\circ\\text{C}$; must use thermostable Taq polymerase).",
      "Confusing the insertion site in pBR322: Insert at BamHI inactivates $tet^R$, while insert at PstI inactivates $amp^R$."
    ],
    "quickMentalCheck": "How many DNA molecules are generated after 5 cycles of PCR starting from a single double-stranded template? $2^5 = 32$ DNA duplex molecules.",
    "cueQuestions": [
      "Why are palindromic recognition sequences and sticky ends crucial for constructing recombinant plasmids?",
      "How does insertional inactivation of the lacZ gene provide a one-step colorimetric screen for recombinant colonies?",
      "What are the three temperature stages of a Polymerase Chain Reaction cycle and the role of Taq polymerase in each?"
    ],
    "workedExample": {
      "problem": "Explain the mechanism of selection of recombinants using insertional inactivation of the tetracycline resistance gene ($tet^R$) in cloning vector pBR322.",
      "steps": [
        "Vector pBR322 contains two selectable marker genes: $amp^R$ (ampicillin resistance) and $tet^R$ (tetracycline resistance).",
        "A foreign DNA fragment is ligated into the unique BamHI restriction site located inside the coding sequence of the $tet^R$ gene.",
        "Insertion of foreign DNA disrupts the reading frame of $tet^R$, causing loss of tetracycline resistance (Insertional Inactivation), while the $amp^R$ gene remains functional.",
        "Selection: Transformants are plated on ampicillin medium (both recombinants and non-recombinants grow). Colonies are replica-plated on tetracycline medium.",
        "Recombinants will GROW on ampicillin but DIE on tetracycline. Non-recombinants will grow on BOTH antibiotic plates."
      ],
      "result": "\\text{Recombinants: } amp^R \\; (\\text{Live}) + tet^S \\; (\\text{Die on tetracycline})"
    },
    "verificationProblem": "Check blue-white alternative: Blue-white screening eliminates replica plating by producing white recombinant colonies directly on X-gal plates. Selection logic verified.",
    "realWorldUse": "Recombinant human insulin (Humulin) biomanufacturing in E. coli fermentation tanks, viral diagnostic RT-PCR testing kits, synthetic hepatitis B subunit vaccines.",
    "diagramType": "pbr322-cloning-vector-map"
  },
  "CBSE-CH-G12-BIO-CH10": {
    "chapterTitle": "Biotechnology and its Applications",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 10,
    "essentialLaw": "\\text{Bt Cotton: Inactive Protoxin } \\xrightarrow{\\text{Alkaline gut pH}} \\text{Active Toxin} \\implies \\text{Pore formation in Midgut} \\implies \\text{Insect Lysis}",
    "coreConcepts": [
      {
        "heading": "Biotechnology Applications in Agriculture: Bt Crops & RNA Interference",
        "bullets": [
          "Bt Cotton: Soil bacterium Bacillus thuringiensis produces insecticidal crystal (Cry) protein endotoxins; Ingested inactive protoxin is solubilized by alkaline pH of insect midgut, binding epithelial cells to create pores and cause osmotic lysis; Specific genes: $cryIAc$ and $cryIIAb$ control cotton bollworms; $cryIAb$ controls corn borer.",
          "RNA Interference (RNAi): Cellular defense in all eukaryotes against viral infection and transposons; Nematode Meloidogyne incognita infects tobacco plant roots; Double-stranded RNA (dsRNA) introduced via Agrobacterium vectors is processed by Dicer into siRNA, binding and silencing specific nematode mRNA via RISC complex, making host plant resistant."
        ]
      },
      {
        "heading": "Biotechnology in Medicine: Humulin, Gene Therapy, Molecular Diagnostics & Transgenics",
        "bullets": [
          "Genetically Engineered Insulin (Humulin, Eli Lilly, 1983): Synthesized two separate DNA sequences for A and B chains of human insulin, introduced into E. coli plasmids, produced chains separately and joined them by disulfide bonds (avoids C-peptide processing required in proinsulin).",
          "Gene Therapy: First clinical trial (1990) on a 4-year-old girl with Adenosine Deaminase (ADA) deficiency; Lymphocytes from blood cultured, functional ADA cDNA introduced via retroviral vector and returned to patient (requires periodic transfusions unless introduced into embryonic stem cells).",
          "Molecular Diagnostics: ELISA (antigen-antibody detection), PCR (early detection of HIV and oncogene mutations before clinical symptoms appear).",
          "Transgenic Animals: Rosie cow ($1997$) produced human protein-enriched milk ($2.4\\text{ g/L}$ human $\\alpha$-lactalbumin); Safety testing of polio vaccines on transgenic mice; Ethical Issues: GEAC (Genetic Engineering Appraisal Committee) evaluates biosafety and patents, preventing Biopiracy (e.g., Basmati rice, Neem, Turmeric patent disputes)."
        ]
      }
    ],
    "examTraps": [
      "Claiming Bt toxin kills the bacterium itself (Bt toxin exists as an INACTIVE crystalline protoxin in bacterium; it activates ONLY in the alkaline pH of insect midgut).",
      "Confusing mature insulin with proinsulin (mature functional insulin lacks the intervening C-peptide chain present in proinsulin)."
    ],
    "quickMentalCheck": "Why does mature human insulin produced by recombinant DNA technology not require C-peptide cleavage? Chains A and B are produced in separate bacterial cultures and joined chemically by disulfide bonds, completely bypassing C-peptide.",
    "cueQuestions": [
      "How does RNA interference (RNAi) achieve sequence-specific gene silencing against Meloidogyne incognita in transgenic tobacco?",
      "How was recombinant human insulin (Humulin) synthesized to overcome the proinsulin C-peptide processing limitation in bacteria?",
      "Why is gene therapy for ADA deficiency performed on bone marrow stem cells during embryonic stages permanently curative while lymphocyte infusion is temporary?"
    ],
    "workedExample": {
      "problem": "Describe the molecular mechanism of action of Bt toxin against insect pests and explain why it is completely harmless to mammals and the bacterium itself.",
      "steps": [
        "1. Bacillus thuringiensis produces crystalline protein endotoxins (Cry proteins) during sporulation as inactive, non-toxic protoxins.",
        "2. When an insect pest (e.g., lepidopteran bollworm) ingests the crop tissue, the protoxin reaches the midgut.",
        "3. The alkaline pH ($>9.0$) of the insect midgut solubilizes the crystal protoxin, and midgut proteases cleave it into its active toxic form.",
        "4. The activated toxin binds specifically to receptors on midgut epithelial cells, inserting into the membrane to form open pores.",
        "5. Pores cause ionic imbalance, osmotic cell swelling, midgut lysis, and death of the insect larva within 48 hours.",
        "6. Harmless to humans/mammals: Human stomach has acidic pH ($1.5-2.0$) which does not activate the protoxin, and human intestines lack the specific epithelial binding receptors."
      ],
      "result": "\\text{Inactive Protoxin} \\xrightarrow{\\text{Alkaline gut pH}} \\text{Active Toxin} \\to \\text{Pore formation} \\to \\text{Epithelial Lysis}"
    },
    "verificationProblem": "Check specificity of Cry genes: $cryIAc$ and $cryIIAb$ control bollworms; $cryIAb$ controls corn borer. Distinct target spectrum verified.",
    "realWorldUse": "Commercial Bt cotton cultivation preventing pesticide runoff, recombinant factor VIII for hemophilia treatment, golden rice biofortified with $\\beta$-carotene.",
    "diagramType": "humulin-insulin-chain-synthesis"
  },
  "CBSE-CH-G12-BIO-CH11": {
    "chapterTitle": "Organisms and Populations",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 11,
    "essentialLaw": "\\frac{dN}{dt} = r N \\left(\\frac{K - N}{K}\\right) \\; (\\text{Logistic Growth}) \\quad | \\quad N_t = N_0 e^{rt} \\; (\\text{Exponential}) \\quad | \\quad N_{t+1} = N_t + [(B + I) - (D + E)]",
    "coreConcepts": [
      {
        "heading": "Abiotic Adaptations, Homeostasis & Ecological Rules",
        "bullets": [
          "Major Abiotic Factors: Temperature (Eurythermal vs Stenothermal), Water (Euryhaline vs Stenohaline), Light (photoperiodism), Soil.",
          "Responses to Abiotic Stress: Regulators (maintain constant internal temperature/osmolarity via homeostasis, e.g., birds and mammals); Conformers ($99\\%$ animals cannot maintain internal constancy); Migrators (e.g., Siberian cranes visiting Keoladeo Ghana National Park); Suspenders (hibernation in bears, aestivation in snails, diapause in zooplankton, spores in fungi).",
          "Morphological & Physiological Adaptations: Allen Rule: Mammals from colder climates have shorter ears and limbs to minimize heat loss; Bergmann Rule: Larger body size in colder regions; Desert plants (thick cuticle, sunken stomata, CAM pathway, leaves reduced to spines in Opuntia); High altitude acclimatization: body compensates for low $pO_2$ by increasing RBC production, decreasing hemoglobin binding affinity, and increasing breathing rate."
        ]
      },
      {
        "heading": "Population Growth Models & Interspecific Interactions",
        "bullets": [
          "Population Attributes: Natality ($B$), Mortality ($D$), Immigration ($I$), Emigration ($E$); $N_{t+1} = N_t + [(B + I) - (D + E)]$.",
          "Growth Models: Exponential Growth ($dN/dt = rN$, J-shaped curve under unlimited resources); Logistic Growth ($dN/dt = rN(1 - N/K)$, S-shaped sigmoid Verhulst-Pearl curve where $K$ is environmental carrying capacity).",
          "Population Interactions: Mutualism ($+/+$, e.g., Lichen, Mycorrhiza, Fig-wasp co-evolution); Commensalism ($+/0$, e.g., Orchid on mango branch, Barnacle on whale, Cattle egret and grazing cattle); Parasitism ($+/-$, Brood parasitism in cuckoo and crow); Predation ($+/-$, transfers energy, maintains prey diversity, e.g., Pisaster starfish removal led to extinction of 10 invertebrate species); Competition ($-/-$, Gause Competitive Exclusion Principle: two species competing for identical limiting resources cannot coexist indefinitely; Resource Partitioning: MacArthur warblers coexisting by foraging at different tree heights); Amensalism ($-/0$, e.g., Penicillium inhibiting bacterial growth)."
        ]
      }
    ],
    "examTraps": [
      "Assuming logistic growth reaches infinity (logistic growth is strictly asymptotic and stabilizes at Carrying Capacity $K$).",
      "Confusing Commensalism ($+/0$, one benefits, other unaffected) with Amensalism ($-/0$, one harmed, other unaffected)."
    ],
    "quickMentalCheck": "When population size $N$ equals carrying capacity $K$, what is the growth rate $dN/dt$? $\\frac{dN}{dt} = rN\\left(\\frac{K-K}{K}\\right) = rN(0) = 0$ (zero population growth).",
    "cueQuestions": [
      "How does the human body physiologically adapt to high-altitude hypobaric hypoxia when visiting Rohtang Pass?",
      "Why is Verhulst-Pearl logistic growth considered a far more realistic ecological model than exponential growth?",
      "How did MacArthur study of five warbler species disprove absolute competitive exclusion through resource partitioning?"
    ],
    "workedExample": {
      "problem": "In a pond, there were 20 lotus plants last year. Through reproduction, 8 new plants are added taking the current population to 28. Calculate the birth rate of the lotus population.",
      "steps": [
        "Initial population size: $N = 20$ lotus plants.",
        "Number of new births during the time interval: $\\Delta N = 8$ plants.",
        "Formula for Per Capita Birth Rate: $b = \\frac{\\text{Number of Births}}{\\text{Initial Population}} = \\frac{8}{20}$.",
        "Calculate: $b = 0.40$ offspring per lotus per year."
      ],
      "result": "\\text{Birth Rate} = 0.40 \\text{ offspring per lotus per year}"
    },
    "verificationProblem": "Check reproduction addition: $20 \\times 0.40 = 8$ new plants. Total $= 20 + 8 = 28$. Arithmetic verified.",
    "realWorldUse": "Wildlife sanctuary carrying capacity management (e.g., Project Tiger reserves), fishery harvest quotas avoiding stock collapse, epidemiology outbreak modeling.",
    "diagramType": "logistic-growth-carrying-capacity-sigmoid"
  },
  "CBSE-CH-G12-BIO-CH12": {
    "chapterTitle": "Ecosystem",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 12,
    "essentialLaw": "\\text{NPP} = \\text{GPP} - R \\quad | \\quad \\text{Lindeman 10\\% Law: } E_{n+1} = 0.10 \\times E_n \\quad | \\quad \\text{Decomposition: Fragmentation } \\to \\text{Leaching} \\to \\text{Catabolism} \\to \\text{Humification} \\to \\text{Mineralization}",
    "coreConcepts": [
      {
        "heading": "Ecosystem Productivity, Decomposition & Food Chains",
        "bullets": [
          "Primary Productivity: Gross Primary Productivity (GPP, total rate of organic matter synthesis) vs Net Primary Productivity (NPP, available biomass for heterotrophs): $\\text{NPP} = \\text{GPP} - R$ (where $R$ is respiratory loss); Global annual NPP of biosphere is $\\approx 170\\text{ billion tons}$ (oceans occupy $70\\%$ area but contribute only $55\\text{ billion tons}$).",
          "Decomposition Process: 1. Fragmentation (detritivores like earthworms break detritus); 2. Leaching (water-soluble inorganic nutrients seep into soil); 3. Catabolism (bacterial and fungal enzymes degrade detritus); 4. Humification (dark amorphous humus, highly resistant to microbial action); 5. Mineralization (release of inorganic nutrients).",
          "Energy Flow: Unidirectional flow of solar energy; Grazing Food Chain (GFC: Grass $\\to$ Goat $\\to$ Man) vs Detritus Food Chain (DFC: major conduit of energy flow in terrestrial ecosystems)."
        ]
      },
      {
        "heading": "Ecological Pyramids & Ecological Succession",
        "bullets": [
          "Lindeman 10% Energy Law: Only $10\\%$ of energy is transferred from one trophic level to the next; remaining $90\\%$ lost as metabolic heat.",
          "Ecological Pyramids: Pyramid of Energy is ALWAYS strictly upright (thermodynamic law); Pyramid of Numbers can be inverted (e.g., one oak tree supporting thousands of insects and birds); Pyramid of Biomass in sea is INVERTED (phytoplankton biomass is lower than standing biomass of zooplankton/fishes).",
          "Ecological Succession: Orderly predictable sequential change in species composition; Primary succession (on bare rock / newly cooled lava, slow) vs Secondary succession (abandoned farmland, burned forest, faster); Hydrarch (Phytoplankton $\\to$ Submerged $\\to$ Floating $\\to$ Reed-swamp $\\to$ Marsh-meadow $\\to$ Scrub $\\to$ Climax Forest) and Xerarch (Crustose Lichen $\\to$ Foliose Lichen $\\to$ Moss $\\to$ Herbs $\\to$ Shrubs $\\to$ Climax Mesic Forest)."
        ]
      }
    ],
    "examTraps": [
      "Stating that the Pyramid of Energy can be inverted (the Pyramid of Energy is NEVER inverted under any circumstances in any ecosystem).",
      "Thinking oceans have higher productivity per unit area than land (terrestrial ecosystems have far higher productivity despite smaller area due to nutrient and light limitation in marine open waters)."
    ],
    "quickMentalCheck": "If sunlight provides $1,000,000\\text{ J}$ of solar energy, how much energy reaches secondary carnivores in a 4-trophic level food chain? Plants capture $1\\% = 10,000\\text{ J}$; Herbivores get $1,000\\text{ J}$; Primary carnivores get $100\\text{ J}$; Secondary carnivores get $10\\text{ J}$.",
    "cueQuestions": [
      "Why is the pyramid of biomass inverted in marine aquatic ecosystems while the pyramid of energy is always strictly upright?",
      "How does temperature and moisture regulate the rate of detritus decomposition in soils?",
      "What are the pioneer species in xerarch vs hydrarch succession and what is the final climax community in both?"
    ],
    "workedExample": {
      "problem": "Calculate the energy available at the tertiary consumer (hawk) level in a grassland ecosystem if the Net Primary Productivity at the producer (grass) level is $20,000\\text{ kJ}$. Apply Lindeman 10% Law.",
      "steps": [
        "Trophic Level 1 (Producers - Grass): $E_1 = 20,000\\text{ kJ}$.",
        "Trophic Level 2 (Primary Consumers - Grasshoppers): $E_2 = 10\\% \\text{ of } 20,000 = 0.10 \\times 20,000 = 2,000\\text{ kJ}$.",
        "Trophic Level 3 (Secondary Consumers - Frogs): $E_3 = 10\\% \\text{ of } 2,000 = 0.10 \\times 2,000 = 200\\text{ kJ}$.",
        "Trophic Level 4 (Tertiary Consumers - Hawk): $E_4 = 10\\% \\text{ of } 200 = 0.10 \\times 200 = 20\\text{ kJ}$."
      ],
      "result": "E_{\\text{Hawk}} = 20\\text{ kJ} \\; (0.10\\% \\text{ of original NPP})"
    },
    "verificationProblem": "Check 4-tier step reduction: $20,000 \\times (0.1)^3 = 20,000 \\times 0.001 = 20\\text{ kJ}$. Verified.",
    "realWorldUse": "Carbon credit sequestration calculations in reforestation projects, wetland bio-remediation design, agricultural multi-trophic aquaculture.",
    "diagramType": "ecological-energy-pyramid-trophic-levels"
  },
  "CBSE-CH-G12-BIO-CH13": {
    "chapterTitle": "Biodiversity and Conservation",
    "subject": "Biology",
    "grade": 12,
    "chapterNum": 13,
    "essentialLaw": "\\log S = \\log C + Z \\log A \\; (\\text{Species-Area Relationship}) \\quad | \\quad \\text{The Evil Quartet: Habitat Loss} + \\text{Over-exploitation} + \\text{Alien Invasions} + \\text{Co-extinctions}",
    "coreConcepts": [
      {
        "heading": "Levels of Biodiversity, Latitudinal Gradients & Species-Area Relationship",
        "bullets": [
          "Levels of Biodiversity (Edward Wilson): Genetic diversity (e.g., Rauwolfia vomitoria reserpine potency; $>50,000$ strains of rice, $1,000$ varieties of mango in India); Species diversity (Western Ghats amphibians $>$ Eastern Ghats); Ecological diversity (India deserts, coral reefs, mangroves $>$ Norway).",
          "Global Patterns: Latitudinal Gradient: Species diversity decreases from equator to poles (Tropics have higher species richness due to evolutionary stability, unglaciated history, more solar energy and constant climate); Amazon Rainforest has highest biodiversity on Earth.",
          "Species-Area Relationship (Alexander von Humboldt): On a logarithmic scale, the relationship is a straight line: $\\log S = \\log C + Z \\log A$ (where $S$ is species richness, $A$ is area, $Z$ is slope of regression line $= 0.1-0.2$ for regional areas, $0.6-1.2$ for entire continents).",
          "David Tilman Long-term Field Experiments: Plots with more species showed less year-to-year variation in total biomass and increased ecosystem stability."
        ]
      },
      {
        "heading": "Biodiversity Loss (\"The Evil Quartet\") & Conservation Strategies",
        "bullets": [
          "\"The Evil Quartet\" Major Causes of Extinction: 1. Habitat Loss and Fragmentation (Amazon rainforest \"lungs of the planet\" reduced from $14\\%$ to $<6\\%$); 2. Over-exploitation (Steller sea cow, Passenger pigeon); 3. Alien Species Invasions (Nile perch introduced into Lake Victoria caused extinction of $>200$ cichlid species; Water hyacinth Eichhornia, Parthenium, African catfish Clarias gariepinus); 4. Co-extinctions (obligate host-parasite and plant-pollinator pairs).",
          "In-Situ (On-site) Conservation: National Parks (106 in India), Wildlife Sanctuaries (565), Biosphere Reserves (18, with Core, Buffer, Transition zones), Sacred Groves (Khasi and Jaintia Hills in Meghalaya, Aravalli Hills in Rajasthan).",
          "Ex-Situ (Off-site) Conservation: Zoological parks, Botanical gardens, Cryopreservation of gametes at $-196^\\circ\\text{C}$ in liquid nitrogen, Seed banks, Tissue culture gene banks.",
          "International Conventions: Earth Summit (Rio de Janeiro, 1992) for conservation of biodiversity; World Summit on Sustainable Development (Johannesburg, 2002)."
        ]
      }
    ],
    "examTraps": [
      "Classifying botanical gardens and seed banks as in-situ conservation (Botanical gardens, zoos, and cryopreservation are EX-SITU conservation).",
      "Confusing regression slope $Z$ values: $Z = 0.1-0.2$ for compact local regions, but $Z = 0.6-1.2$ for very large continental regions."
    ],
    "quickMentalCheck": "How many global Biodiversity Hotspots were originally identified by Norman Myers, and how many are recognized today? Originally 25 hotspots, now expanded to 36 hotspots globally (covering $<2\\%$ Earth land area but harboring $>50\\%$ endemic plant species).",
    "cueQuestions": [
      "Why do tropical regions near the equator harbor significantly greater biodiversity than temperate or polar latitudes?",
      "How does the Rivet Popper hypothesis by Paul Ehrlich explain the consequences of species loss on ecosystem integrity?",
      "What are Sacred Groves and how have traditional community practices preserved endangered endemic flora in India?"
    ],
    "workedExample": {
      "problem": "Write the mathematical equation for Alexander von Humboldt’s Species-Area Relationship and explain the significance of the slope of regression ($Z$) for small regions vs entire continents.",
      "steps": [
        "Equation on rectangular hyperbola: $S = C A^Z$.",
        "Equation on logarithmic scale: $\\log S = \\log C + Z \\log A$, where $S = \\text{Species richness}, A = \\text{Area}, Z = \\text{Slope of the line (regression coefficient)}, C = Y\\text{-intercept}$.",
        "Significance of $Z$: For small local regions (e.g., plants in Britain, birds in California), $Z$ lies strictly between $0.1$ and $0.2$, regardless of the taxonomic group or geographic region.",
        "When the analysis covers very large areas like entire continents (e.g., frugivorous birds and mammals in tropical forests), the slope is much steeper, with $Z$ ranging from $0.6$ to $1.2$."
      ],
      "result": "\\log S = \\log C + Z \\log A; \\quad Z_{\\text{local}} = 0.1-0.2, \\quad Z_{\\text{continental}} = 0.6-1.2"
    },
    "verificationProblem": "Check logarithmic derivative: $\\frac{d(\\log S)}{d(\\log A)} = Z$. A steeper slope ($Z > 1$) indicates rapid species addition with expanding area. Verified.",
    "realWorldUse": "IUCN Red List assessment of threatened taxa, design of international wildlife corridor networks, global Nagoya Protocol access and benefit sharing.",
    "diagramType": "species-area-relationship-curve"
  },
  "CBSE-CH-G12-CS-CH01": {
    "chapterTitle": "Python Revision Tour",
    "subject": "Computer Science",
    "grade": 12,
    "chapterNum": 1,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Python Revision Tour: Data Structures & Syntax",
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
      "How does Python manage memory and scoping for Python Revision Tour?",
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
  "CBSE-CH-G12-CS-CH02": {
    "chapterTitle": "Functions",
    "subject": "Computer Science",
    "grade": 12,
    "chapterNum": 2,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Functions: Data Structures & Syntax",
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
      "How does Python manage memory and scoping for Functions?",
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
  "CBSE-CH-G12-CS-CH03": {
    "chapterTitle": "Using Python Libraries",
    "subject": "Computer Science",
    "grade": 12,
    "chapterNum": 3,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Using Python Libraries: Data Structures & Syntax",
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
      "How does Python manage memory and scoping for Using Python Libraries?",
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
  "CBSE-CH-G12-CS-CH04": {
    "chapterTitle": "File Handling",
    "subject": "Computer Science",
    "grade": 12,
    "chapterNum": 4,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "File Handling: Data Structures & Syntax",
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
      "How does Python manage memory and scoping for File Handling?",
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
  "CBSE-CH-G12-CS-CH05": {
    "chapterTitle": "Recursion",
    "subject": "Computer Science",
    "grade": 12,
    "chapterNum": 5,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Recursion: Data Structures & Syntax",
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
      "How does Python manage memory and scoping for Recursion?",
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
  "CBSE-CH-G12-CS-CH06": {
    "chapterTitle": "Data Structures",
    "subject": "Computer Science",
    "grade": 12,
    "chapterNum": 6,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Data Structures: Data Structures & Syntax",
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
      "How does Python manage memory and scoping for Data Structures?",
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
  "CBSE-CH-G12-CS-CH07": {
    "chapterTitle": "Computer Networks",
    "subject": "Computer Science",
    "grade": 12,
    "chapterNum": 7,
    "essentialLaw": "\\text{Computational Model: } \\text{Time Complexity } \\mathcal{O}(f(n)), \\quad \\text{Space Complexity } \\mathcal{O}(g(n))",
    "coreConcepts": [
      {
        "heading": "Computer Networks: Data Structures & Syntax",
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
      "How does Python manage memory and scoping for Computer Networks?",
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
