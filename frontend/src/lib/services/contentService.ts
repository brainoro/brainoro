import { CurriculumConcept, CornellNotes, BoardId, AuthoritativeLearningContext } from '../types';
import { supabase, isSupabaseConfigured } from '../supabase/client';
import { resolveAuthoritativeToBrainoroConcept } from '../supabase/curriculumService';
import { lookupDeterministicChapter, synthesizeDeterministicOERContent } from './deterministicChapterRegistry';

export interface IngestionInput {
  boardId: string;
  subjectId: string;
  gradeLevel: number;
  topicId: string;
  rawSourceData: string;
}

export type NormalizedBoard = 'CBSE' | 'CAMBRIDGE' | 'IB_MYP';

export function normalizeBoard(boardId: BoardId | string): NormalizedBoard {
  const b = String(boardId || '').toUpperCase();
  if (b.includes('IB')) return 'IB_MYP';
  if (b.includes('CAMBRIDGE')) return 'CAMBRIDGE';
  return 'CBSE';
}

export function isMiddleSchoolGrade(grade: number | string): boolean {
  const g = Number(grade) || 8;
  return g <= 8;
}

export interface SubjectDomainClassification {
  isEnglish: boolean;
  isSocialScience: boolean;
  isHistory: boolean;
  isGeography: boolean;
  isCivics: boolean;
  isEconomics: boolean;
  isCommerce: boolean;
  isAccountancy: boolean;
  isBusinessStudies: boolean;
  isComputerScience: boolean;
  isHindi: boolean;
  isSanskrit: boolean;
  isBio: boolean;
  isChem: boolean;
  isPhys: boolean;
  isMath: boolean;
  isScience: boolean;
  disciplineTitle: string;
}

export function classifySubjectDomain(concept: CurriculumConcept): SubjectDomainClassification {
  const subj = (concept.subjectId || '').toUpperCase();
  const title = (concept.title || concept.id || '').toUpperCase();
  const unit = (concept.unit || '').toUpperCase();
  const idStr = (concept.id || '').toUpperCase();
  const search = `${idStr} ${title} ${unit} ${subj}`;

  const isEnglish =
    subj.includes('ENG') ||
    subj.includes('LIT') ||
    subj.includes('LANG') ||
    search.includes('HONEYDEW') ||
    search.includes('FLAMINGO') ||
    search.includes('HORNBILL') ||
    search.includes('FIRST FLIGHT') ||
    search.includes('FOOTPRINTS') ||
    search.includes('MOMENTS') ||
    search.includes('VISTAS') ||
    search.includes('BEEHIVE') ||
    search.includes('POEM') ||
    search.includes('POETRY') ||
    search.includes('PROSE');

  const isHindi =
    subj.includes('HIN') ||
    search.includes('KSHITIJ') ||
    search.includes('SPARSH') ||
    search.includes('KRITIKA') ||
    search.includes('SANCHAYAN') ||
    search.includes('VASANT') ||
    search.includes('DURVA');

  const isSanskrit =
    subj.includes('SKT') ||
    subj.includes('SANSKRIT') ||
    search.includes('SHEMUSHI') ||
    search.includes('RUCHIRA') ||
    search.includes('BHASWATI');

  const isHistory =
    subj.includes('HIST') ||
    search.includes('HISTORY') ||
    search.includes('OUR PASTS') ||
    search.includes('INDIA AND THE CONTEMPORARY WORLD') ||
    search.includes('THEMES IN INDIAN HISTORY');

  const isGeography =
    subj.includes('GEOG') ||
    search.includes('GEOGRAPHY') ||
    search.includes('RESOURCES AND DEVELOPMENT') ||
    search.includes('CONTEMPORARY INDIA') ||
    search.includes('OUR ENVIRONMENT') ||
    search.includes('FUNDAMENTALS OF PHYSICAL GEOGRAPHY');

  const isCivics =
    subj.includes('CIVIC') ||
    subj.includes('POL') ||
    search.includes('POLITICAL') ||
    search.includes('DEMOCRATIC') ||
    search.includes('SOCIAL AND POLITICAL LIFE') ||
    search.includes('INDIAN CONSTITUTION AT WORK');

  const isEconomics =
    subj.includes('ECON') ||
    subj.includes('ECO') ||
    search.includes('ECONOMICS') ||
    search.includes('UNDERSTANDING ECONOMIC DEVELOPMENT') ||
    search.includes('MICROECONOMICS') ||
    search.includes('MACROECONOMICS') ||
    search.includes('INDIAN ECONOMIC DEVELOPMENT');

  const isSocialScience =
    subj.includes('SOC') ||
    subj.includes('SST') ||
    isHistory ||
    isGeography ||
    isCivics ||
    isEconomics;

  const isAccountancy =
    subj.includes('ACC') ||
    search.includes('ACCOUNTANCY') ||
    search.includes('FINANCIAL STATEMENTS') ||
    search.includes('PARTNERSHIP ACCOUNTS') ||
    search.includes('LEDGER') ||
    search.includes('JOURNAL ENTRY');

  const isBusinessStudies =
    subj.includes('BST') ||
    subj.includes('BUSINESS') ||
    search.includes('BUSINESS STUDIES') ||
    search.includes('PRINCIPLES OF MANAGEMENT');

  const isCommerce =
    subj.includes('COMM') ||
    isAccountancy ||
    isBusinessStudies;

  const isComputerScience =
    subj.includes('CS') ||
    subj.includes('COMP') ||
    subj.includes('IP') ||
    subj.includes('INFORMATIC') ||
    subj.includes('AI') ||
    search.includes('PYTHON') ||
    search.includes('SQL') ||
    search.includes('DATA STRUCTURE') ||
    search.includes('BOOLEAN LOGIC');

  const isBio =
    !isEnglish && !isHindi && !isSanskrit && !isSocialScience && (
      subj.includes('BIO') ||
      subj.includes('BOTANY') ||
      subj.includes('ZOOLOGY') ||
      search.includes('KEBO') ||
      search.includes('LEBO') ||
      search.includes('HEART') ||
      search.includes('CIRCULAT') ||
      search.includes('CELL') ||
      search.includes('DIGEST') ||
      search.includes('RESPIRAT') ||
      search.includes('TROPHIC') ||
      search.includes('PLANT') ||
      search.includes('PHOTOSYNTHESIS') ||
      search.includes('LIVING ORGANISM') ||
      search.includes('REPRODUCTION') ||
      search.includes('GENETIC') ||
      search.includes('MICROORGANISM') ||
      search.includes('ECOSYSTEM') ||
      search.includes('HEREDITY')
    );

  const isChem =
    !isEnglish && !isHindi && !isSanskrit && !isSocialScience && (
      subj.includes('CHEM') ||
      search.includes('KECH') ||
      search.includes('LECH') ||
      search.includes('ATOM') ||
      search.includes('BOND') ||
      search.includes('REACTION') ||
      search.includes('ACID') ||
      search.includes('BASE') ||
      search.includes('PERIODIC') ||
      search.includes('MOLE') ||
      search.includes('ORGANIC CHEM') ||
      search.includes('ELECTROCHEM') ||
      search.includes('SOLUTION') ||
      search.includes('EQUILIBRIUM') ||
      search.includes('THERMODYNAMICS') ||
      search.includes('METALS AND NON-METALS') ||
      search.includes('CARBON AND ITS COMPOUNDS')
    );

  const isPhys =
    !isEnglish && !isHindi && !isSanskrit && !isSocialScience && (
      subj.includes('PHYS') ||
      subj.includes('PHY') ||
      search.includes('KEPH') ||
      search.includes('LEPH') ||
      search.includes('CIRCUIT') ||
      search.includes('OHM') ||
      search.includes('RESIST') ||
      search.includes('VOLT') ||
      search.includes('CURRENT') ||
      search.includes('AMPERE') ||
      search.includes('LIGHT') ||
      search.includes('RAY OPTIC') ||
      search.includes('WAVE') ||
      search.includes('MOTION') ||
      search.includes('FORCE') ||
      search.includes('GRAVITAT') ||
      search.includes('WORK, ENERGY') ||
      search.includes('SOUND') ||
      search.includes('MAGNET') ||
      search.includes('ELECTROSTAT') ||
      search.includes('KINETIC THEORY')
    );

  const isScience =
    subj.includes('SCI') ||
    isBio ||
    isChem ||
    isPhys;

  const isMath =
    subj.includes('MATH') ||
    subj.includes('GANIT') ||
    search.includes('JEMH') ||
    search.includes('HEMH') ||
    search.includes('KEMH') ||
    search.includes('LEMH') ||
    (!isEnglish && !isHindi && !isSanskrit && !isSocialScience && !isCommerce && !isComputerScience && !isScience);

  let disciplineTitle = 'General Studies';
  if (isEnglish) disciplineTitle = 'English Language & Literature';
  else if (isHindi) disciplineTitle = 'Hindi Language & Literature';
  else if (isSanskrit) disciplineTitle = 'Sanskrit Language & Literature';
  else if (isHistory) disciplineTitle = 'History';
  else if (isGeography) disciplineTitle = 'Geography';
  else if (isCivics) disciplineTitle = 'Political Science (Civics)';
  else if (isEconomics) disciplineTitle = 'Economics';
  else if (isSocialScience) disciplineTitle = 'Social Science';
  else if (isAccountancy) disciplineTitle = 'Accountancy';
  else if (isBusinessStudies) disciplineTitle = 'Business Studies';
  else if (isCommerce) disciplineTitle = 'Commerce';
  else if (isComputerScience) disciplineTitle = 'Computer Science & Informatics';
  else if (isBio) disciplineTitle = 'Biology';
  else if (isChem) disciplineTitle = 'Chemistry';
  else if (isPhys) disciplineTitle = 'Physics';
  else if (isMath) disciplineTitle = 'Mathematics';
  else if (isScience) disciplineTitle = 'Science';

  return {
    isEnglish,
    isSocialScience,
    isHistory,
    isGeography,
    isCivics,
    isEconomics,
    isCommerce,
    isAccountancy,
    isBusinessStudies,
    isComputerScience,
    isHindi,
    isSanskrit,
    isBio,
    isChem,
    isPhys,
    isMath,
    isScience,
    disciplineTitle,
  };
}

/**
 * Cambridge Assessment International Education (CAIE) Mark Scheme Guidance Generator
 * Enforces the 4-part structured subsections:
 * A) Common Mark-Loss Pitfalls
 * B) Command Word Precision (STATE, EXPLAIN, DERIVE, CALCULATE)
 * C) Mark Tier Allocation Guidance (1-2, 2-4, 4-6 marks)
 * D) Calculation Tips (SI conversions, rounding to 3 sig figs)
 */

/**
 * CBSE Board Exam Traps & Marking Patterns Generator
 * Enforces the 3-part structured subsections:
 * 1) Common Pitfalls & Mark-Loss Patterns (3 recurring mistakes identified in CBSE board answer keys)
 * 2) Explanation Depth Requirements (exact key phrases and diagram labeling rules for 3-mark and 5-mark questions)
 * 3) High-Yield Study & Revision Tips (last-minute execution checklist)
 */
export function generateCBSEExamTrapsAndMarkingPatterns(
  concept: CurriculumConcept,
  notes?: CornellNotes | null
): string {
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''}`.toUpperCase();
  const isMS = isMiddleSchoolGrade(concept.gradeLevel);
  const domain = classifySubjectDomain(concept);

  let pitfalls: string;
  let depthReqs: string;
  let revisionTips: string;

  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    pitfalls = `1. Omitting Textual Evidence: Answering analytical questions with vague generalized opinions instead of citing specific textual episodes, character actions, or precise dialogue references.
2. Grammatical Tense Inconsistency: Switching indiscriminately between past tense and present tense when recounting plot dynamics and analyzing character motivations.
3. Exceeding or Undershooting Word Limits: Failing to respect CBSE prescribed word limits (30–40 words for Short Answer, 100–120 words for Long Answer/Analytical Paragraphs), leading to mark deductions for presentation.`;
    depthReqs = `• 2–3 Mark Question (Short Answer - Contextual & Character Interpretation):
  - State the direct answer clearly in the opening sentence.
  - Provide two distinct points of supporting textual evidence from the chapter (30–40 words).
• 5–6 Mark Question (Long Answer - Thematic Synthesis & Character Sketch):
  - Introduction: Name the chapter and author/poet, stating the central thematic assertion.
  - Body: Elucidate with two specific situational references, highlighting character motivation or conflict resolution.
  - Conclusion: Summarize the underlying moral, philosophical takeaway, or literary resonance (100–120 words).`;
    revisionTips = `• Memorize correct spellings of author/poet names and key character names.
• Use subject-appropriate literary terms (e.g., imagery, metaphor, irony, character arc, symbolism).
• Maintain uniform past tense for narrative recounting and present tense for universal literary themes.
• Re-read long-answer drafts to verify word limit compliance and neat paragraph divisions.`;
  } else if (domain.isSocialScience) {
    if (domain.isHistory) {
      pitfalls = `1. Chronological Inversion & Date Confusion: Misdating landmark events, treaties, or constitutional movements, or describing historical cause-and-effect sequences out of order.
2. Narrative Generalization without Terminology: Providing conversational stories instead of utilizing statutory NCERT terms (e.g., 'Satyagraha', 'Civil Disobedience', 'Non-Cooperation', 'Vernacular Press Act').
3. Map-Pointing Inaccuracy: Marking historical congress sessions, peasant movements, or battle sites inaccurately without state boundaries.`;
      depthReqs = `• 3-Mark Question (Causes & Impact of Historical Events):
  - State 3 distinct numbered points with concise underlined sub-headings.
  - Include specific years, key personalities, and regional locations.
• 5-Mark Question (Comprehensive Historical Analysis):
  - Introduction: Contextual setting and background preconditions.
  - Body (3–4 Points): Key turning points, social classes involved, and institutional transformations.
  - Conclusion: Long-term historical legacy and significance in Indian/World history.`;
      revisionTips = `• Draw sequential timeline flowcharts to memorize date sequences effortlessly.
• Structure all 3-mark and 5-mark answers with distinct underlined point headings.
• Practice historical map-pointing with sharp pencil and write state names in brackets.`;
    } else if (domain.isGeography) {
      pitfalls = `1. Map Pointing Alignment Errors: Misplacing major dams, mineral belts, soil types, or international airports on outline maps of India.
2. Confusing Resource Classifications: Mixing up renewable vs non-renewable, biotic vs abiotic, or individual vs community-owned resources.
3. Omitting Statistical & Geographical Constraints: Describing crop cultivation or industrial location without mentioning mandatory climatic conditions (rainfall, temperature, soil type).`;
      depthReqs = `• 3-Mark Question (Geographical Processes & Resource Management):
  - State 3 clear factors (e.g., climatic conditions, soil requirements, or conservation methods).
• 5-Mark Question (Detailed Geographical Analysis):
  - Structure with sub-headings: (1) Distribution, (2) Geographical requirements, (3) Economic significance, (4) Environmental challenges, (5) Sustainable conservation measures.`;
      revisionTips = `• Master map identification and locating for soils, major crops, dams, and mineral belts.
• State temperature ranges (°C) and rainfall requirements (cm) when explaining crop cultivation.
• Highlight environmental sustainability and conservation in long answers.`;
    } else if (domain.isCivics) {
      pitfalls = `1. Confusing Levels of Government: Mixing up powers and jurisdictions between Union, State, and Concurrent lists.
2. Vague Political Assertions: Giving informal political commentary instead of citing constitutional provisions, articles, or statutory democratic frameworks.
3. Misidentifying Power-Sharing Mechanisms: Confusing horizontal power sharing (Legislature, Executive, Judiciary) with vertical power sharing (Federal levels).`;
      depthReqs = `• 3-Mark Question (Democratic Institutions & Principles):
  - State 3 structured points defining democratic mechanisms and institutional checks.
• 5-Mark Question (Constitutional & Political Evaluation):
  - Structure with 5 distinct headings illustrating institutional accountability, citizen participation, and real-world democratic challenges.`;
      revisionTips = `• Cite specific constitutional articles and statutory terminology (e.g., Secularism, Federalism, Coalition Government).
• Structure answers point-wise with sharp headings rather than continuous prose paragraphs.`;
    } else {
      // Economics
      pitfalls = `1. Confusing Economic Indicators: Misinterpreting Per Capita Income, Infant Mortality Rate (IMR), Literacy Rate, and HDI.
2. Sectors of Economy Overlap: Mixing up Primary, Secondary, and Tertiary sector classifications in disguised or seasonal employment case studies.
3. Formal vs Informal Credit Confusion: Confusing terms of credit between commercial banks/SHGs and informal moneylenders.`;
      depthReqs = `• 3-Mark Question: Define the economic concept and illustrate with two comparative real-world examples.
• 5-Mark Question: Provide structured analysis with tabular comparison or numbered criteria evaluating sustainable development and financial inclusion.`;
      revisionTips = `• Memorize standard definitions of economic indicators from NCERT.
• Draw simple comparative tables when asked to distinguish between economic sectors or credit sources.`;
    }
  } else if (domain.isCommerce) {
    pitfalls = `1. Account Classification & Debit-Credit Inversion: Misclassifying Personal, Real, and Nominal accounts, leading to inverted ledger entries.
2. Management Principles vs Functions Mix-up: Confusing Henri Fayol's 14 principles of management with the 5 core managerial functions (Planning, Organizing, Staffing, Directing, Controlling).
3. Capital vs Revenue Expenditure Confusion: Recording capital expenditure in the Profit & Loss statement rather than the Balance Sheet.`;
    depthReqs = `• 3-Mark Question: State standard definition, underlying statutory rule/accounting standard, and 2 distinct analytical implications.
• 5–6 Mark Question: Draw clearly labeled accounting formats (Journal/Ledger/Balance Sheet) or structured case-study evaluations with underlined headings.`;
    revisionTips = `• Double-check ledger balancing and ensure that Assets = Liabilities + Capital.
• Quote exact keywords from Business Studies NCERT case studies in your concluding rationale.`;
  } else if (domain.isComputerScience) {
    pitfalls = `1. Off-By-One Indexing & Range Boundary Errors: Forgetting that range(start, stop) in Python excludes the stop value, or indexing errors in 0-indexed sequences.
2. Mutable vs Immutable Object Side-Effects: Unintentionally modifying lists or dictionaries passed into functions, expecting immutable integer/string behavior.
3. SQL Clause Syntax & Ordering Mistakes: Placing WHERE after GROUP BY or using WHERE instead of HAVING with aggregate functions (COUNT, SUM, AVG).`;
    depthReqs = `• 2–3 Mark Question (Code Output & Function Definition):
  - Trace code execution step-by-step with a variable state table before recording final output.
• 4–5 Mark Question (Algorithm Design / SQL Queries):
  - Write syntactically valid code with proper indentation, meaningful identifier names, and edge-case handling.`;
    revisionTips = `• Always dry-run code loops with initial values, intermediate values, and termination condition.
• Double-check SQL clause order: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY.`;
  } else {
    // Science & Mathematics
    const isElectricity =
      searchStr.includes('CIRCUIT') ||
      searchStr.includes('OHM') ||
      searchStr.includes('RESIST') ||
      searchStr.includes('VOLT') ||
      searchStr.includes('CURRENT') ||
      searchStr.includes('AMPERE') ||
      searchStr.includes('-ELEC-');

    const isWorkEnergy =
      !isElectricity && (
        searchStr.includes('WORK') ||
        searchStr.includes('KINETIC') ||
        searchStr.includes('POTENTIAL') ||
        searchStr.includes('JOULE') ||
        searchStr.includes('WATT') ||
        (searchStr.includes('ENERGY') && !searchStr.includes('TROPHIC') && !searchStr.includes('CELL') && !searchStr.includes('ATP') && !searchStr.includes('BOND'))
      );

    if (isWorkEnergy) {
      if (isMS) {
        pitfalls = `1. Confusing Work with Everyday Effort: Assuming holding a heavy school bag stationary counts as scientific work done. In science, Work = Force × Distance; if distance moved is zero, work done is strictly ZERO.
2. Energy Conversion vs Loss: Falsely believing energy 'disappears' when a moving ball stops, instead of recognizing it transforms into thermal heat and sound via friction.
3. Unit Confusion: Omitting standard metric units of Work and Energy (Joules, J) or Force (Newtons, N).`;
        depthReqs = `• 2-3 Mark Question (Forms of Energy & Work Formula):
  - State definition: Work is done only when an applied force causes displacement in the direction of the force (W = F × d).
  - Give everyday examples of kinetic energy (speeding vehicle, flowing water) and potential energy (stretched bow, water stored in a dam).
• 4-5 Mark Question (Law of Conservation of Energy):
  - State the Law of Conservation of Energy: Energy cannot be created or destroyed, only transformed from one form to another.
  - Describe the energy transformations in a simple pendulum swinging between extreme and mean positions.`;
        revisionTips = `• State the SI unit of Work and Energy: 1 Joule (J) = 1 Newton-meter (N·m).
• Check that distance is always in meters (m) and mass is in kilograms (kg) before multiplying.
• Box final numerical calculations with correct units.`;
      } else {
        pitfalls = `1. Velocity-Squared Proportionality Trap: Falsely assuming kinetic energy scales linearly with speed (KE ∝ v). Because KE = (1/2)mv², doubling speed quadruples kinetic energy (4×), and tripling speed increases kinetic energy by 9-fold (9×).
2. Work Done Zero Invariant Condition: Forgetting that scientific work done W = F · d cos θ is strictly ZERO whenever displacement is perpendicular to applied force (θ = 90°, cos 90° = 0). Common exam cases: a porter carrying luggage horizontally on head (gravity/normal force ⊥ horizontal motion), and planets orbiting the Sun in circular paths.
3. Non-Invariant Work Subtraction: When calculating work needed to change speed from v1 to v2, writing W = (1/2)m(v2 - v1)² instead of the correct work-energy relation: W = ΔKE = (1/2)m(v2² - v1²) (deducts 1 full method mark).`;
        depthReqs = `• 3-Mark Question (Kinetic Energy Derivation):
  - State Work formula: W = F · s.
  - Substitute Newton's second law F = ma: W = m(as).
  - Apply 3rd equation of motion: v² - u² = 2as ⟹ as = (v² - u²)/2.
  - For object initially at rest (u = 0): W = m(v²/2) = (1/2)mv². Equate W = KE.
• 5-Mark Question (Conservation of Mechanical Energy):
  - Prove KE + PE = constant for a freely falling mass m from height h across 3 positions: Top (KE=0, PE=mgh), Midpoint at height (h - x) (KE = mgx, PE = mg(h-x), Total = mgh), and Ground (KE = mgh, PE = 0).
  - Numerical problem: Calculate speed on reaching ground: v = √(2gh), showing intermediate substitutions with g = 9.8 m/s² or 10 m/s².`;
        revisionTips = `• Unit Equivalences: 1 Joule = 1 N·m = 1 kg·m²/s²; 1 Watt = 1 J/s; 1 kWh = 3.6 × 10⁶ J.
• Convert mass in grams to kilograms (g → × 10⁻³ kg) and velocity in km/h → m/s (multiply by 5/18 or divide by 3.6) before calculating KE.
• State reference level (datum) where height h = 0 when defining gravitational potential energy PE = mgh.
• Box the final answer with units: e.g. KE = 1.60 × 10³ J.`;
      }
    } else if (isElectricity) {
      if (isMS) {
        pitfalls = `1. Open vs Closed Circuit Confusion: Forgetting that electric current requires an unbroken, continuous conductive pathway to flow; any gap in the circuit prevents bulbs from lighting.
2. Conductor vs Insulator Errors: Classifying distilled water or rubber as conductors, or forgetting that metals and graphite conduct electricity.
3. Safety Fuse Misunderstanding: Stating that a fuse increases electric current, rather than understanding it contains a wire with a low melting point that melts and breaks an overloaded circuit to prevent electrical fires.`;
        depthReqs = `• 2-3 Mark Question (Electric Circuit Components):
  - Draw circuit symbols neatly: electric cell (long line positive, short thick line negative), switch (open/closed), bulb, and connecting wires.
  - State the direction of conventional electric current: from positive terminal to negative terminal of the battery.
• 4-5 Mark Question (Heating & Magnetic Effects of Current):
  - Explain how an electric fuse works based on the heating effect of electric current (high resistance, low melting point).
  - Describe the construction and working of a simple electromagnet using an iron nail, insulated copper wire, and an electric cell.`;
        revisionTips = `• Draw neat schematic circuit diagrams using standard NCERT symbols with a ruler and pencil.
• Always mark arrowheads indicating current direction (+ to -) on connecting wires.
• Clearly distinguish between cells (single unit) and batteries (two or more cells connected in series).`;
      } else {
        pitfalls = `1. The Parallel Resistance Inversion Error: Adding fractions 1/R_p = 1/R_1 + 1/R_2 correctly to get (e.g.) 1/2, but forgetting to invert the result, incorrectly recording R_p = 0.5 Ω instead of 2 Ω (loses 1 full mark).
2. V–I vs. I–V Graph Slope Confusion: Assuming graph slope always equals resistance. For a V–I graph (V on Y-axis, I on X-axis), slope = ΔV / ΔI = R. For an I–V graph (I on Y-axis, V on X-axis), slope = ΔI / ΔV = 1/R (steeper line means smaller resistance).
3. The Stretched Wire Volume Error: Believing that stretching a wire to double length simply doubles resistance (2R). Wire volume is invariant (V = A · l); doubling length halves cross-sectional area (A' = A/2), causing a 4-fold increase in resistance (R' = 4R).`;
        depthReqs = `• 3-Mark Question (Ohm's Law Verification):
  - Circuit diagram: Battery (+/-), plug key (•), rheostat, ammeter strictly in series with resistor, voltmeter strictly in parallel across resistor, and conventional current arrowheads (+ to -).
  - Statement: 'At constant temperature, electric current is directly proportional to potential difference' (V ∝ I ⟹ V = IR).
  - Graph: Linear straight line passing strictly through the origin (0,0).
• 5-Mark Question (Resistance Factors & Resistivity Derivation):
  - State all 4 governing factors: R ∝ l, R ∝ 1/A, nature of material, and temperature.
  - Combine: R ∝ l/A ⟹ R = ρ (l/A).
  - Define resistivity ρ: 'Resistance of a conductor of unit length (1 m) and unit area (1 m²)'. State SI unit: Ω·m (Ohm-meter).
  - Numerical step: Given quantities declared → formula stated → substitution → final value boxed with unit.`;
        revisionTips = `• Always write the clause 'at constant temperature' in Ohm's law statements.
• Ensure ammeter has low resistance (series) and voltmeter has high resistance (parallel) with correct polarities.
• Convert wire diameter to radius in meters: r = d/2, then mm → × 10⁻³ m before calculating area A = π r².
• Double-check parallel reciprocal inversion (R_p = (R_1 R_2)/(R_1 + R_2)) before writing final answer.
• Frame final line strictly as: Quantity Symbol = Numerical Value + Unit (e.g., R_p = 2.0 Ω).`;
      }
    } else if (domain.isBio) {
      pitfalls = `1. Directional Pathway Errors: Omitting arrows in systemic/pulmonary circulation or digestive tract sequence diagrams (examiners deduct 1/2 mark for unindicated flow directions).
2. Valve Function Misattribution: Writing that valves 'pump' or 'propel' blood rather than explicitly stating they 'prevent backflow of blood when ventricles/atria relax'.
3. Transport Mechanism Confusion: Confusing xylem (unidirectional passive transpiration pull) with phloem (bidirectional active translocation requiring ATP energy).`;
      depthReqs = isMS
        ? `• 2-3 Mark Question (Organ System Functions):
  - State the primary organs involved and their specific biological roles.
  - Draw simple schematic pathways with clear directional arrows.
• 4-5 Mark Question (Living Processes & Interdependence):
  - Explain how organs coordinate to sustain nutrient absorption, respiration, and cellular transport.
  - Distinguish between physical processes and chemical enzyme reactions.`
        : `• 3-Mark Question (Double Circulation Pathway):
  - State the two distinct loops: Pulmonary circuit (Right Ventricle → Lungs → Left Atrium) and Systemic circuit (Left Ventricle → Body → Right Atrium).
  - Identify thick myocardium of left ventricle to generate systemic hydrostatic pressure.
• 5-Mark Question (Comparative Physiology & Structural Adaptations):
  - Structural differences between arteries (thick elastic walls, high pressure, no valves) and veins (thin walls, low pressure, internal valves).
  - Biological necessity of separating oxygenated and deoxygenated blood in mammals/birds for high metabolic rate and constant body temperature (thermoregulation).`;
      revisionTips = `• Orient anatomical diagrams carefully with clear labeling lines that do not cross.
• Memorize exact NCERT keywords: peristalsis, emulsification, stomatal transpiration, villi surface area.
• Box final key definitions and underline specific enzyme or organ names.`;
    } else if (domain.isChem) {
      pitfalls = `1. Missing State Symbols: Writing chemical equations without (s), (l), (g), (aq) states when specifically prompted (CBSE keys deduct 1/2 mark per missing state).
2. Unbalanced Chemical Equations: Guessing stoichiometry without checking atom balance on both sides.
3. Chemical vs Common Name Mix-up: Confusing Quicklime (CaO), Slaked lime (Ca(OH)₂), and Limestone (CaCO₃).`;
      depthReqs = isMS
        ? `• 2-3 Mark Question (Physical vs Chemical Changes):
  - Distinguish between reversible physical changes (melting, boiling) and irreversible chemical reactions (rusting, burning).
  - State the test for acids and bases using natural indicators (litmus paper, turmeric).
• 4-5 Mark Question (Acids, Bases & Neutralization):
  - Define neutralization: Acid + Base → Salt + Water with heat evolution.
  - Describe practical daily life examples of neutralization (antacid remedies, soil treatment with slaked lime).`
        : `• 3-Mark Question (Types of Chemical Reactions):
  - Balanced equation with state symbols.
  - Visual observations: precipitate color, gas evolution effervescence, or beaker temperature change.
• 5-Mark Question (Acids, Bases, Salts & Redox):
  - Define oxidation (gain of O / loss of electrons) and reduction (loss of O / gain of electrons) with identifying oxidizing/reducing agents.
  - Preparation of bleaching powder, baking soda, washing soda, and Plaster of Paris with exact molecular formulas and crystal water.`;
      revisionTips = `• Count atoms on both sides of every equation before proceeding.
• Memorize the reactivity series mnemonic to correctly predict displacement reactions.
• State indicator color transitions accurately: Phenolphthalein is colorless in acidic/neutral solutions and pink in basic solutions.`;
    } else {
      // Mathematics
      const isDataHandling =
        searchStr.includes('DATA') ||
        searchStr.includes('TALLY') ||
        searchStr.includes('FREQUENCY') ||
        searchStr.includes('TABLE') ||
        searchStr.includes('GRAPH') ||
        searchStr.includes('STAT') ||
        searchStr.includes('PROB');

      const isGeometry =
        searchStr.includes('ANGLE') ||
        searchStr.includes('TRIANGLE') ||
        searchStr.includes('POLYGON') ||
        searchStr.includes('CIRCLE') ||
        searchStr.includes('QUAD') ||
        searchStr.includes('PERIMETER') ||
        searchStr.includes('AREA') ||
        searchStr.includes('MENSUR') ||
        searchStr.includes('LINE') ||
        searchStr.includes('SEGMENT') ||
        searchStr.includes('POINT') ||
        searchStr.includes('RAY') ||
        searchStr.includes('GEOM') ||
        searchStr.includes('LINES AND ANGLES') ||
        searchStr.includes('PARALLEL') ||
        searchStr.includes('PERPENDICULAR');

      const isNumberSystem =
        searchStr.includes('INT') ||
        searchStr.includes('FRAC') ||
        searchStr.includes('DECIMAL') ||
        searchStr.includes('NUMBER LINE') ||
        searchStr.includes('WHOLE NUMBER') ||
        searchStr.includes('NATURAL NUMBER') ||
        searchStr.includes('RATIONAL');

      if (isDataHandling) {
        pitfalls = `1. Tally Mark Grouping Errors: Forgetting that the 5th tally mark is drawn diagonally across the cluster of 4 vertical marks, resulting in miscounting total frequencies.
2. Misinterpreting Graphical Table Scale: Reading raw bar heights or frequency counts without multiplying by the stated scale factor (e.g., 1 symbol = 5 items).
3. Sum Inconsistency: Failing to verify that the sum of the frequency column equals the total number of raw observations given in the problem statement.`;
        depthReqs = `• 2-3 Mark Question (Frequency Distribution Tables):
  - Construct clean frequency distribution tables with three mandatory columns: 'Observation / Category', 'Tally Marks', and 'Frequency (f)'.
  - Include a dedicated Total row verifying that sum of frequencies equals sample size N.
• 4-5 Mark Question (Data Interpretation & Graphical Representation):
  - In bar graphs or pictographs: clearly state the scale used on each axis (e.g., 'Scale: 1 unit length = 10 units').
  - State analytical conclusions in complete sentences referencing the calculated values.`;
        revisionTips = `• Always verify that the sum of the frequency column equals the total number of raw observations given.
• Group tally marks strictly in bundles of 5 for quick visual verification.
• Label all table headers and graph axes with descriptive titles.`;
      } else if (isMS) {
        if (isGeometry) {
          const isBasicGeometry =
            searchStr.includes('LINE') ||
            searchStr.includes('SEGMENT') ||
            searchStr.includes('POINT') ||
            searchStr.includes('RAY') ||
            searchStr.includes('ANGLE') ||
            searchStr.includes('LINES AND ANGLES');

          const isMensuration =
            searchStr.includes('PERIMETER') ||
            searchStr.includes('AREA') ||
            searchStr.includes('MENSUR') ||
            searchStr.includes('VOLUME');

          if (isBasicGeometry && !isMensuration) {
            pitfalls = `1. Confusing Line Segment with Line or Ray: Forgetting that a line segment has two fixed endpoints and finite measurable length, while a line extends infinitely in both directions without endpoints and a ray has one endpoint extending infinitely.
2. Ruler Alignment & Measurement Precision: Measuring from the physical plastic edge of the ruler rather than aligning the zero mark (0 cm) exactly at the start endpoint.
3. Geometric Notation Distinction: Failing to distinguish between line segment AB (the segment with two endpoints), scalar length AB (number with cm/mm units), line <->AB, and ray ->AB.`;
            depthReqs = `• 2-3 Mark Question (Lines, Segments & Rays):
  - State the NCERT Ganita Prakash definition: The shortest path connecting two distinct points A and B is the line segment AB.
  - Identify both endpoints explicitly and state the length with correct metric units (e.g., AB = 5.4 cm).
• 4-5 Mark Question (Geometric Constructions & Notation):
  - Draw figures with a sharp pencil and straightedge ruler, clearly marking endpoints with capital letters.
  - Use a divider and ruler for accurate comparison to eliminate parallax error.`;
            revisionTips = `• Always check that both endpoints are distinctly labeled with capital letters.
• Align ruler zero-mark (0 cm), never the worn corner or outer edge of the ruler.
• A line segment is the unique shortest path between two points.`;
          } else {
            pitfalls = `1. Omitting Units of Mensuration: Calculating perimeter without linear units (cm, m) or area without square units (cm², m²).
2. Formula Misapplication: Confusing perimeter (sum of boundary sides) with area (surface enclosed).
3. Property Citation Errors: Stating geometric conclusions without citing the underlying property in brackets.`;
            depthReqs = `• 2-3 Mark Question (Geometric Properties):
  - State the geometric property used in brackets (e.g., 'Angle Sum Property of a Triangle = 180°').
  - Show intermediate calculation steps clearly.
• 4-5 Mark Question (Area & Perimeter Word Problems):
  - Draw a neat diagram with a ruler and pencil, labeling vertices and dimensions.
  - State the formula explicitly before substituting numerical measurements.`;
            revisionTips = `• Draw neat geometric figures with a ruler and pencil for all geometry problems.
• Box the final answer and include appropriate metric units (cm, m, cm², m²).`;
          }
        } else if (isNumberSystem) {
          pitfalls = `1. Arithmetic Sign Traps: Errors in subtracting negative numbers: a - (-b) = a + b.
2. Direction on the Number Line: Moving left for subtraction and right for addition.
3. Order of Operations (BODMAS): Mixing up division/multiplication before addition/subtraction.`;
          depthReqs = `• 2-3 Mark Question (Step-by-Step Solving):
  - State the governing arithmetic rule before substituting values.
  - Show intermediate calculation steps clearly without skipping stages.
• 4-5 Mark Question (Multi-step Arithmetic & Word Problems):
  - In word problems: set up the balanced arithmetic expression step-by-step.
  - State the final numerical answer with appropriate units.`;
          revisionTips = `• Check your work by evaluating expressions in reverse or using inverse operations.
• Clearly box the final answer and underline important intermediate steps.`;
        } else {
          // General Algebra / Linear
          pitfalls = `1. Arithmetic Sign & Order of Operations (BODMAS/PEMDAS) Traps: Mixing up multiplication/division before addition/subtraction, or errors in subtracting negative numbers: a - (-b) = a + b.
2. Algebraic Equation Balance Errors: Forgetting to perform the identical inverse operation on both sides of the balance equation when isolating an unknown variable.
3. Transposition Mistakes: Changing signs incorrectly when moving terms across the equals sign.`;
          depthReqs = `• 2-3 Mark Question (Step-by-Step Solving):
  - State the governing algebraic equation before substituting values.
  - Show intermediate calculation steps clearly without skipping stages.
• 4-5 Mark Question (Word Problems):
  - Declare the variable unknown ('Let the required number be x'), set up the balanced equation, solve step-by-step, and state the final answer in words.`;
          revisionTips = `• Always substitute your answer back into the original equation to verify that LHS = RHS.
• Clearly box the final answer and underline important intermediate steps.`;
        }
      } else {
        pitfalls = `1. Sign Inversion in Quadratic / Linear Transposition: Making sign errors during algebraic subtraction -(ax - b) = -ax + b.
2. Forgetting ± in Square Roots: Writing √k instead of ±√k when solving pure quadratics.
3. Omitting Units of Mensuration: Calculating area or volume without stating cm², m², or cm³.`;
        depthReqs = `• 3-Mark Question: Declaring standard form, writing formula explicitly, substituting intermediate steps, and clearly stating final root values.
• 5-Mark Question: Geometric theorems require 4 mandatory headings: 'Given', 'To Prove', 'Construction' (dotted lines), and 'Proof' with justifications for every step in brackets.`;
        revisionTips = `• Write the algebraic formula before substituting numerical coordinates or coefficients.
• Draw neat figures with pencil for all geometry, trigonometry, and coordinate problems.
• Box the final answer and underline final conclusions.`;
      }
    }
  }

  return `CBSE Board Exam Traps & Marking Patterns:
1. Common Pitfalls & Mark-Loss Patterns:
${pitfalls}

2. Explanation Depth Requirements:
${depthReqs}

3. High-Yield Study & Revision Tips:
${revisionTips}`;
}

export function generateCambridgeMarkSchemeGuidance(
  concept: CurriculumConcept,
  notes?: CornellNotes | null
): string {
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''}`.toUpperCase();
  const isMS = isMiddleSchoolGrade(concept.gradeLevel);
  const domain = classifySubjectDomain(concept);

  const isWorkEnergy =
    (searchStr.includes('WORK') ||
      searchStr.includes('KINETIC ENERGY') ||
      searchStr.includes('POTENTIAL ENERGY') ||
      searchStr.includes('WORK, ENERGY') ||
      searchStr.includes('WORK & ENERGY')) &&
    !searchStr.includes('NUCLEAR');

  const isElectricity =
    searchStr.includes('ELECTRIC') ||
    searchStr.includes('CIRCUIT') ||
    searchStr.includes('OHM') ||
    searchStr.includes('RESIST') ||
    searchStr.includes('VOLT') ||
    searchStr.includes('CURRENT') ||
    searchStr.includes('AMPERE') ||
    searchStr.includes('-ELEC-');

  const isBio = domain.isBio;
  const isChem = domain.isChem;

  let pitfalls: string;
  let commandWords: string;
  let markTiers: string;
  let calcTips: string;

  if (domain.isEnglish) {
    pitfalls = `• Quoting extensive blocks of text without analytical commentary or language feature evaluation.
• Confusing narrator voice and authorial perspective.
• Vague assertion of effect on reader without citing precise lexical choices.`;
    commandWords = `• IDENTIFY: Name literary techniques and structural features directly.
• ANALYZE: Evaluate how specific words/phrases create mood, tension, or character traits.
• COMPARE: Contrast themes or stylistic approaches across texts using comparative connective phrases.
• EVALUATE: Formulate a reasoned, critical personal judgment backed by embedded quotations.`;
    markTiers = `• 1–2 Marks: Direct identification of literary technique or explicit textual detail.
• 3–5 Marks: Detailed analysis of language effect with embedded textual evidence.
• 6–8 Marks: Perceptive thematic synthesis and exploration of contextual nuances.`;
    calcTips = `• Always embed short, relevant quotations (1–4 words) seamlessly into analytical sentences.`;
  } else if (domain.isSocialScience) {
    pitfalls = `• Writing continuous narrative accounts without point-by-point causal analysis.
• Confusing primary vs secondary sources and historical provenance.
• Omitting scale, grid references, or compass directions in geographical data questions.`;
    commandWords = `• STATE: Direct factual statement of historical treaty, geographical feature, or economic term.
• DESCRIBE: Detail chronological progression or spatial distribution patterns.
• EXPLAIN: Elucidate underlying socio-economic causes and institutional effects.
• ASSESS: Weigh competing historical arguments or environmental policy impacts.`;
    markTiers = `• 1–2 Marks: Recall specific historical dates, actors, or geographical terms.
• 3–4 Marks: Balanced explanation of two contrasting perspectives or factors.
• 5–6 Marks: Comprehensive evaluative judgment supported by empirical evidence.`;
    calcTips = `• Ensure source evaluation explicitly addresses origin, purpose, and potential bias.`;
  } else if (domain.isCommerce) {
    pitfalls = `• Forgetting dual-aspect debit/credit equality in journalizing.
• Confusing revenue expenditure with capital expenditure.
• Omitting statutory formats for financial statements.`;
    commandWords = `• STATE: State definitions of accounting principles or business management terms.
• CALCULATE: Show journal entries, ledger balances, and financial ratios with complete working.
• EXPLAIN: Detail the commercial implications of business decisions or market forces.
• EVALUATE: Recommend strategic actions based on financial and operational data analysis.`;
    markTiers = `• 1–2 Marks: Recall accounting concepts or business terms.
• 3–4 Marks: Journal entries, ledger posting, or descriptive business explanations.
• 5–6 Marks: Comprehensive financial analysis or case study evaluations.`;
    calcTips = `• Verify Assets = Liabilities + Capital balance before finalizing accounting problem solutions.`;
  } else if (domain.isComputerScience) {
    pitfalls = `• Off-by-one errors in loop boundaries and array index bounds.
• Confusing variable assignment (=) with equality comparison (==).
• Neglecting base cases in recursive algorithms or edge cases in conditional logic.`;
    commandWords = `• STATE: State precise definitions of data structures, protocols, or algorithm complexities.
• TRACE: Walk through code/pseudocode step-by-step with a trace table showing variable states.
• WRITE: Produce syntactically clean code or pseudocode with appropriate indentation.
• ANALYZE: Evaluate time and space complexity (Big O) of competing algorithms.`;
    markTiers = `• 1–2 Marks: Identify correct syntax, operators, or protocol names.
• 3–4 Marks: Implement modular functions or accurate algorithmic logic.
• 5–6 Marks: Design complete data architecture or optimize algorithm efficiency.`;
    calcTips = `• Always trace loops with extreme boundary values (empty array, single element, negative numbers).`;
  } else if (isWorkEnergy) {
    if (isMS) {
      pitfalls = `• Forgetting that scientific work done requires an object to move in the direction of the force.
• Confusing energy stores (kinetic, gravitational, chemical) with energy transfers (work, heat).
• Forgetting to convert units to base metric SI units (grams to kg, cm to meters).`;
      commandWords = `• STATE: State the Law of Conservation of Energy clearly.
• DESCRIBE: Detail observable energy transformations in everyday machines.
• CALCULATE: Use Work = Force × Distance with working steps and Joules (J).
• EXPLAIN: Explain why frictional forces degrade useful kinetic energy into surrounding thermal energy.`;
      markTiers = `• 1 Mark: Direct recall of unit or definition of work.
• 2–3 Marks: Calculation of work done or energy transfer with formula and substitution.
• 4 Marks: Structured analysis of energy conservation in multi-stage transfers.`;
      calcTips = `• State SI units clearly: Work in Joules (J), Force in Newtons (N), Distance in meters (m).`;
    } else {
      pitfalls = `• Forgetting that work is the product of force and distance moved IN THE DIRECTION of the force (W = F d cos θ).
• Confusing Power (rate of energy transfer, in Watts) with Work or Energy (quantity of transfer, in Joules).
• Calculating kinetic energy using velocity in km/h instead of converting to base SI units (m/s).`;
      commandWords = `• STATE: State Principle of Conservation of Energy verbatim.
• DERIVE: Step-by-step derivation of KE = (1/2)mv² from work done W = Fs, substituting F = ma and kinematic identity v² - u² = 2as.
• CALCULATE: Explicit formula statement (KE = (1/2)mv² or ΔPE = mgΔh) → unrounded substitution → final value to 3 sig figs with unit Joules (J).
• EXPLAIN: Elucidate energy degradation (e.g. mechanical energy dissipated as internal thermal energy of surroundings due to frictional work).`;
      markTiers = `• 1–2 Marks: State definition of work done or calculate gravitational potential energy from PE = mgh.
• 2–4 Marks: Multi-step calculation converting gravitational potential energy to kinetic energy (mgh = (1/2)mv² ⟹ v = √(2gh)) or finding mechanical efficiency.
• 4–6 Marks: Comprehensive power and mechanical resistance problems.`;
      calcTips = `• Convert velocity from km/h to m/s (divide by 3.6) before computing kinetic energy.
• Convert mass in grams to kilograms (divide by 1000).
• Quote final numerical answers to 3 significant figures unless exact integers.`;
    }
  } else if (isElectricity) {
    if (isMS) {
      pitfalls = `• Omitting switch state when analyzing circuit diagrams.
• Believing current is 'used up' by bulbs; current is identical throughout a simple series circuit.
• Confusing electrical conductors with thermal conductors.`;
      commandWords = `• STATE: State definitions of conductor, insulator, or circuit component.
• DESCRIBE: Detail observations when a circuit is closed or broken.
• DRAW: Draw clear circuit diagrams using standard Cambridge symbols with a ruler.
• EXPLAIN: Explain why a safety fuse prevents circuit overloads.`;
      markTiers = `• 1 Mark: Component identification or definition recall.
• 2–3 Marks: Explaining complete loop requirements and circuit observations.
• 4 Marks: Analyzing circuit troubleshooting problems with reasoning.`;
      calcTips = `• Check circuit diagrams carefully to ensure all connecting wires make contact without gaps.`;
    } else {
      pitfalls = `• Omitting the essential condition 'at constant temperature' when stating Ohm's Law (V ∝ I).
• Omitting intermediate algebraic substitutions or writing final numerical values without correct SI units (Ω, V, A, W).
• Confusing series circuits (equal current throughout) with parallel circuits.`;
      commandWords = `• STATE: Direct factual definition or law statement without descriptive padding.
• EXPLAIN: Detail microscopic mechanism and causal link.
• CALCULATE: Explicit formula statement (V = I × R) → numerical substitution → calculated value with correct SI unit.
• DERIVE: Step-by-step algebraic manipulation starting from foundational equations without skipping intermediate steps.`;
      markTiers = `• 1–2 Marks: Recall law definition, state formula, or single-variable calculation.
• 2–4 Marks: Multi-step numerical calculation with formula, algebraic rearrangement, substitution, and units.
• 4–6 Marks: Extended experimental analysis or multi-branch circuit networks.`;
      calcTips = `• Convert all non-standard units to base SI units before calculating: mA → A (10⁻³), kΩ → Ω (10³).
• Quote final numerical answers to 3 significant figures unless exact integers are specified.`;
    }
  } else if (isBio) {
    pitfalls = `• Confusing anatomical structures with physiological mechanisms.
• Omitting directional flow indicators or chamber labels in diagrams.`;
    commandWords = `• STATE: Name specific organs, tissues, or enzymes accurately.
• DESCRIBE: Trace the sequential pathway through biological systems.
• EXPLAIN: Give biological reasons connecting anatomical structures to their functions.
• SUGGEST: Apply physiological concepts to explain novel medical or biological scenarios.`;
    markTiers = `• 1–2 Marks: Recall organ names or identify structures on diagrams.
• 2–4 Marks: Describe step-by-step biological processes with correct terminology.
• 4–6 Marks: Extended response linking structure, function, and physiological adaptations.`;
    calcTips = `• In magnification questions: Magnification = Image size / Actual size (ensure both in identical units).`;
  } else if (isChem) {
    pitfalls = `• Forgetting state symbols (s), (l), (g), (aq) in balanced equations.
• Confusing physical changes with chemical reactions.`;
    commandWords = `• STATE: Quote chemical rule, substance name, or balanced equation.
    • EXPLAIN: Detail particulate interactions or reaction mechanisms.
    • CALCULATE: State proportions or formula masses with correct units.
    • DESCRIBE: Detail visible observations (effervescence, color changes, precipitate).`;
    markTiers = `• 1–2 Marks: Identify chemical substances or name reaction types.
• 2–4 Marks: Explain chemical observations or balance reactions.
• 4–6 Marks: Experimental analysis and quantitative investigation.`;
    calcTips = `• Maintain 3 significant figures and show all working steps.`;
  } else {
    // Math
    const isDataHandling =
      searchStr.includes('DATA') ||
      searchStr.includes('TALLY') ||
      searchStr.includes('FREQUENCY') ||
      searchStr.includes('TABLE') ||
      searchStr.includes('GRAPH') ||
      searchStr.includes('STAT') ||
      searchStr.includes('PROB');

    if (isDataHandling) {
      pitfalls = `• Inaccurate tally grouping: failing to bundle tallies in groups of 5, leading to miscounts.
• Misreading the scale of pictograms or bar charts.
• Forgetting that the sum of frequencies must equal the total number of data values.`;
      commandWords = `• COMPLETE: Fill in frequency tables and tally counts accurately from raw data.
• CALCULATE: Find totals, fractions, or percentages from frequency distribution tables.
• EXPLAIN: Give clear mathematical reasons based on data trends or comparative frequencies.
• STATE: Read modal frequencies or categorical values directly from tables.`;
      markTiers = `• 1 Mark: Direct reading of a frequency value from a table or chart.
• 2–3 Marks: Completing a frequency table with tallies or calculating summary totals.
• 4 Marks: Structured data interpretation and comparative analysis with clear working.`;
      calcTips = `• Always check that the sum of the frequency column matches the total number of items in the raw dataset.`;
    } else if (isMS) {
      pitfalls = `• Misapplying the order of operations (BIDMAS/PEMDAS) in multi-step calculations.
• Sign slips when adding, subtracting, or multiplying negative numbers.
• Omitting units of measurement in spatial, perimeter, and area questions.`;
      commandWords = `• CALCULATE: Show clear working steps and calculate the final numerical value.
• EXPLAIN: Give concise mathematical reasons using basic properties or angle facts.
• SOLVE: Use inverse operations systematically to isolate the unknown variable.
• STATE: Write down the definition, perimeter formula, or angle fact directly.`;
      markTiers = `• 1 Mark: Direct recall of an arithmetic fact or single-step calculation.
• 2–3 Marks: Multi-step calculation showing method marks for inverse operations and working out.
• 4 Marks: Solving structured word problems with full algebraic working and units.`;
      calcTips = `• Always write down every intermediate step so method marks can be awarded even if an arithmetic slip occurs.
• Check answers by estimating or substituting the answer back into the original problem.`;
    } else {
      pitfalls = `• Omitting sign conventions, ignoring boundary conditions, or calculating without declaring reference frames.
• Forfeiting method marks by jumping straight to final numbers without showing formula substitutions.`;
      commandWords = `• STATE: Write the standard theorem, coordinate locus, or property directly.
      • CALCULATE: Show explicit substitution into governing equations and simplify methodically.
      • EXPLAIN: Provide logical deduction referencing foundational axioms or geometric angle rules.
      • DERIVE: Carry out complete rigorous algebraic transposition from first principles.`;
      markTiers = `• 1–2 Marks: Single-step substitution or recall of standard invariant.
• 2–4 Marks: Multi-step calculation with algebraic intermediate working.
• 4–6 Marks: Formal mathematical proof or multi-parameter modeling problem.`;
      calcTips = `• Do not round intermediate steps. Retain fractional or surd values until the final step, then round non-exact answers to 3 significant figures.`;
    }
  }

  return `Cambridge Mark Scheme Guidance:
A) Common Mark-Loss Pitfalls:
${pitfalls}

B) Command Word Precision:
${commandWords}

C) Mark Tier Allocation Guidance:
${markTiers}

D) Calculation Tips:
${calcTips}`;
}

export function generateIBMYPInquiryAndCriterion(
  concept: CurriculumConcept,
  notes?: CornellNotes | null
): string {
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''}`.toUpperCase();
  const domain = classifySubjectDomain(concept);

  let factual: string;
  let conceptual: string;
  let debatable: string;
  let criterionD: string;

  const isWorkEnergy =
    (searchStr.includes('WORK') || searchStr.includes('KINETIC ENERGY') || searchStr.includes('POTENTIAL ENERGY') || searchStr.includes('WORK, ENERGY') || searchStr.includes('WORK & ENERGY')) &&
    !searchStr.includes('NUCLEAR');

  const isElectricity =
    searchStr.includes('ELECTRIC') ||
    searchStr.includes('CIRCUIT') ||
    searchStr.includes('OHM') ||
    searchStr.includes('RESIST') ||
    searchStr.includes('VOLT') ||
    searchStr.includes('CURRENT') ||
    searchStr.includes('AMPERE') ||
    searchStr.includes('-ELEC-');

  const isBio = domain.isBio;
  const isChem = domain.isChem;

  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    factual = `• Criterion A (Analyzing): Misinterpreting narrative voice or mistaking superficial plot points for deeper character motivations and structural arcs.`;
    conceptual = `• Criteria B & C (Organizing / Producing Text): Structuring literary essays without cohesive topic sentences or omitting embedded textual evidence.`;
    debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent does literature reflect immutable human truths versus contemporary societal values?'`;
    criterionD = `• Criterion D (Global Context & Cultural Impact): Global Context: Orientation in Space and Time / Fairness and Development. Evaluate how narrative literature fosters cross-cultural empathy and moral insight.`;
  } else if (domain.isSocialScience) {
    factual = `• Criterion A (Knowing and Understanding): Treating historical and geopolitical developments as isolated facts rather than interconnected socio-economic systems.`;
    conceptual = `• Criteria B & C (Investigating / Communicating): Developing structured inquiries with multi-perspective primary and secondary source evidence.`;
    debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent do historical turning points inevitably result from structural economic conditions rather than individual decisions?'`;
    criterionD = `• Criterion D (Global Context & Civic Responsibility): Global Context: Governance and Global Citizenship. Reflect on how historical and geographical analysis informs sustainable policy decisions.`;
  } else if (domain.isCommerce) {
    factual = `• Criterion A (Knowing and Understanding): Confusing accounting principles (e.g., dual aspect, matching concept) with arbitrary calculation habits.`;
    conceptual = `• Criteria B & C (Investigating / Planning): Designing structured business models and analyzing financial statements for sustainability.`;
    debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent should corporate governance prioritize social and environmental equity over shareholder profit maximization?'`;
    criterionD = `• Criterion D (Global Context & Ethical Practice): Global Context: Fairness and Development. Reflect on how ethical commerce supports sustainable economic communities.`;
  } else if (domain.isComputerScience) {
    factual = `• Criterion A (Knowing and Understanding): Confusing algorithmic design and time complexity with superficial programming syntax.`;
    conceptual = `• Criteria B & C (Inquiring & Designing / Creating): Decomposing computational problems into verified algorithms with boundary test validation.`;
    debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent does algorithmic automation create systemic ethical challenges in modern society?'`;
    criterionD = `• Criterion D (Global Context & Technological Impact): Global Context: Scientific and Technical Innovation. Evaluate how computational solutions impact human society and data privacy.`;
  } else if (isWorkEnergy) {
    factual = `• Criterion A (Knowing and Understanding): Misconception that energy is 'consumed' or 'lost' from existence during mechanical processes. Energy is strictly conserved; macroscopic mechanical work transforms into microscopic thermal energy.`;
    conceptual = `• Criteria B & C (Inquiring & Designing / Processing & Evaluating): Assuming 100% mechanical efficiency in experimental ramps or pendulums without accounting for frictional dissipation.`;
    debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent should societies prioritize kinetic renewable generation (wind, hydro) over continuous dispatchable thermal energy?'`;
    criterionD = `• Criterion D (Global Context & Societal Impact): Global Context: Scientific and Technical Innovation / Sustainability. Evaluate how energy conservation principles guide renewable transportation and industrial design.`;
  } else if (isElectricity) {
    factual = `• Criterion A (Knowing and Understanding): Confusing electric potential with electric current. Falsely believing electrons are 'used up' in circuit loads rather than circulating in continuous closed loops.`;
    conceptual = `• Criteria B & C (Inquiring & Designing / Processing & Evaluating): Designing circuits to test electrical components while controlling resistance, voltage, and measuring current accurately.`;
    debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent should cities invest in smart-grid infrastructure to optimize electrical energy distribution?'`;
    criterionD = `• Criterion D (Global Context & Societal Impact): Global Context: Scientific and Technical Innovation. Evaluate how electrical engineering innovations improve healthcare, communication, and global sustainability.`;
  } else if (isBio) {
    factual = `• Criterion A (Knowing and Understanding): Treating organ systems as isolated units rather than interconnected homeostatic networks.`;
    conceptual = `• Criteria B & C (Inquiring & Designing / Processing & Evaluating): Designing controlled experiments to investigate biological variables (temperature, light, enzyme activity).`;
    debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent should healthcare policy focus on preventative lifestyle education versus surgical treatments?'`;
    criterionD = `• Criterion D (Global Context & Societal Impact): Global Context: Fairness and Development. Reflect on how biological research informs global public health and environmental policies.`;
  } else if (isChem) {
    factual = `• Criterion A (Knowing and Understanding): Confusing physical phase changes with chemical transformations and bond rearrangement.`;
    conceptual = `• Criteria B & C (Inquiring & Designing / Processing & Evaluating): Measuring reaction rates and product yields with precision while accounting for environmental variables.`;
    debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent does industrial reliance on synthetic chemicals impact ecological sustainability?'`;
    criterionD = `• Criterion D (Global Context & Societal Impact): Global Context: Globalization and Sustainability. Analyze how green chemistry principles reduce toxic waste and environmental degradation.`;
  } else {
    const isDataHandling =
      searchStr.includes('DATA') ||
      searchStr.includes('TALLY') ||
      searchStr.includes('FREQUENCY') ||
      searchStr.includes('TABLE') ||
      searchStr.includes('GRAPH') ||
      searchStr.includes('STAT') ||
      searchStr.includes('PROB');

    if (isDataHandling) {
      factual = `• Criterion A (Knowing and Understanding): Misinterpreting frequency tables as arbitrary lists rather than structured counts of discrete empirical observations.`;
      conceptual = `• Criteria B & C (Inquiring & Designing / Processing & Evaluating): Designing systematic data collection protocols and organizing raw data into accurate frequency tables and graphs.`;
      debatable = `• Criterion D (Debatable Inquiry Prompt): 'To what extent does the categorization of continuous real-world data into discrete frequency bins introduce statistical bias?'`;
      criterionD = `• Criterion D (Global Context & Societal Impact): Global Context: Scientific and Technical Innovation. Reflect on how data collection and frequency analysis inform public policy, healthcare planning, and evidence-based decision making.`;
    } else {
      factual = `• Criterion A (Knowing and Understanding): Treating mathematical equations as rote calculation routines rather than expressions of balance and relationships.`;
      conceptual = `• Criteria B & C (Inquiring & Designing / Processing & Evaluating): Identifying mathematical patterns, creating models, and evaluating boundary limitations.`;
      debatable = `• Criterion D (Debatable Inquiry Prompt): 'Does the predictive power of quantitative mathematical models justify their widespread use in public decision-making?'`;
      criterionD = `• Criterion D (Global Context & Societal Impact): Global Context: Scientific and Technical Innovation. Evaluate how mathematical modeling informs economic planning and scientific innovation.`;
    }
  }

  return `IB MYP Inquiry & Criterion Framework:
A) Factual-Level Misconceptions (Criterion A: Knowing and Understanding):
${factual}

B) Conceptual-Level Misconceptions (Criteria B & C: Inquiring & Designing / Processing & Evaluating):
${conceptual}

C) Debatable Inquiry Prompt (Criterion D: Reflecting on the Impacts of Science):
${debatable}

D) Criterion D Reflection Guide (Global Context & Societal Impact):
${criterionD}`;
}

export {
  sanitizeLatexString,
  preprocessNotesText,
  sanitizeKatexString,
  sanitizeLaTeX,
  sanitizeNotesText,
  stripOuterDelimiters
} from '../utils/latexParser';

import {
  sanitizeLatexString,
  preprocessNotesText,
  sanitizeKatexString,
  sanitizeLaTeX,
  sanitizeNotesText,
  stripOuterDelimiters
} from '../utils/latexParser';

/**
 * Universal OER Domain Blueprint Interface
 */
interface OERDomainBlueprint {
  matcher: (text: string, subject: string, grade: number) => boolean;
  diagramType: string;
  generate: (concept: CurriculumConcept, boardId: BoardId) => CornellNotes;
}

/**
 * Clean string helper for keyword matching
 */
function toSearchText(concept: CurriculumConcept): string {
  return `${concept.id} ${concept.title} ${concept.unit || ''} ${concept.coreLogicEssence || ''}`.toUpperCase();
}

/**
 * 40+ Structured OER Blueprints covering Math, Physics, Chemistry, Biology
 * across Grades 6 to 10 for CBSE, Cambridge, and IB MYP.
 */

// =========================================================================
// 40+ Structured OER Blueprints covering Math, Physics, Chemistry, Biology
// across Grades 6 to 10 for CBSE, Cambridge, and IB MYP with STRICT GRADE LOCKS.
// =========================================================================
const OER_BLUEPRINTS: OERDomainBlueprint[] = [
  // =========================================================================
  // ANATOMICAL & PHYSIOLOGICAL BIOLOGY BLUEPRINTS (GRADE & BOARD AWARE)
  // =========================================================================

  // B1. The Human Heart & Double Circulation (Class 7 Middle School & Class 10 Secondary)
  {
    matcher: (text, subj) =>
      (subj.includes('BIO') || subj.includes('SCI') || subj.includes('LIFE')) &&
      (text.includes('HEART') || text.includes('CIRCULAT') || text.includes('CARDIO') || text.includes('BLOOD FLOW')),
    diagramType: 'heart_circulation',
    generate: (concept, boardId) => {
      const board = normalizeBoard(boardId);
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);

      const structuralRule = isMS
        ? "$\\text{Deoxygenated Blood (Body)} \\xrightarrow{\\text{Vena Cava}} \\text{Right Atrium} \\to \\text{Right Ventricle} \\xrightarrow{\\text{Pulmonary Artery}} \\text{Lungs (O}_2\\text{)} \\xrightarrow{\\text{Pulmonary Veins}} \\text{Left Atrium} \\to \\text{Left Ventricle} \\xrightarrow{\\text{Aorta}} \\text{Body (Oxygenated)}$"
        : "$\\text{Pulmonary Circuit: } \\text{RV} \\to \\text{Lungs} \\to \\text{LA} \\quad \\parallel \\quad \\text{Systemic Circuit: } \\text{LV} \\to \\text{Body} \\to \\text{RA} \\quad | \\quad \\text{Blood Pressure: } 120/80\\text{ mmHg}$";

      const coreAnalogy = board === 'IB_MYP'
        ? "Global Systems Perspective: Think of the human circulatory system like a dual-loop rapid transit network in a sustainable metropolis."
        : board === 'CAMBRIDGE'
        ? "Practical Observation: Think of the heart like two synchronized mechanical pumps working side-by-side in a sealed plumbing circuit."
        : "NCERT Conceptual Framework: Think of the heart like two separate delivery stations in a central post office.";

      const cueQuestions = board === 'IB_MYP'
        ? [
            "Factual Inquiry: What anatomical structures ensure blood flows strictly in one direction through the four chambers?",
            "Conceptual Inquiry: How does the muscular thickness of the left ventricle reflect its functional relationship to systemic equilibrium?",
            "Debatable Inquiry: To what extent should governments invest in preventative cardiovascular health education versus advanced cardiac surgical interventions?",
            "Criterion D Reflection: How do scientific advances in artificial pacemakers and valve replacements impact human quality of life?"
          ]
        : board === 'CAMBRIDGE'
        ? [
            "State the specific role of the atrioventricular (bicuspid and tricuspid) valves.",
            "Describe the complete pathway of an erythrocyte from the vena cava to the aorta.",
            "Explain why the wall of the left ventricle is significantly thicker than the wall of the right ventricle.",
            "Suggest why double circulation confers an adaptive advantage to endothermic mammals compared to single circulation in fish."
          ]
        : [
            "State the NCERT definition of double circulation and name its two constituent circuits.",
            "Trace the step-by-step passage of deoxygenated blood from the body tissues through the heart chambers to the lungs.",
            "Why is the complete separation of oxygen-rich and carbon dioxide-rich blood essential in birds and mammals?",
            "Distinguish between arteries and veins based on wall thickness, blood pressure, and presence of internal valves."
          ];

      const mainNotes = isMS
        ? `**1. The Four-Chambered Muscular Heart**:
The human heart is roughly the size of a fist and pumps blood continuously to all body parts:
• **Right Side (Deoxygenated)**: Collects carbon dioxide-rich blood from the body tissues via the vena cava.
• **Left Side (Oxygenated)**: Receives oxygen-rich blood from the lungs via pulmonary veins and pumps it into the aorta.
• **Septum**: The thick muscular wall that completely separates the right and left sides, preventing any mixing of oxygenated and deoxygenated blood.

**2. Two Circulatory Loops (Double Circulation)**:
1. Pulmonary Circuit: Deoxygenated blood is pumped from the right ventricle to the lungs to exchange carbon dioxide for oxygen.
2. Systemic Circuit: Oxygen-rich blood returns to the left atrium, moves to the left ventricle, and is pumped under high pressure through the aorta to all organs.

**3. Blood Vessels & Valves**:
• **Arteries**: Carry blood away from the heart under high pressure; have thick elastic walls.
• **Veins**: Carry blood back towards the heart; have thinner walls and internal valves to ensure one-way flow.`
        : `**1. Heart Anatomy & Hemodynamics**:
The human heart is a myogenic four-chambered double pump operating in the thoracic mediastinum:
• **Atria (Receiving)**: Thin-walled chambers receiving low-pressure venous return (Vena Cava $\\to$ RA, Pulmonary Veins $\\to$ LA).
• **Ventricles (Pumping)**: Thick muscular myocardium; Left Ventricle has 3× thicker wall than Right Ventricle to overcome systemic vascular resistance.
• **Heart Valves**: Tricuspid and Bicuspid (mitral) valves prevent atrioventricular backflow; aortic and pulmonary semilunar valves maintain unidirectional flow during ventricular diastole.

**2. Double Circulation Mechanism**:
• **Pulmonary Loop**: Right Ventricle $\\to$ Pulmonary Artery $\\to$ Alveolar Capillaries $\\to$ Pulmonary Veins $\\to$ Left Atrium.
• **Systemic Loop**: Left Ventricle $\\to$ Aorta $\\to$ Systemic Arterioles $\\to$ Capillary Beds $\\to$ Vena Cava $\\to$ Right Atrium.

**3. Cardiac Cycle & Regulation**:
Systole (contraction phase) and Diastole (relaxation phase) generate standard blood pressure (~120/80 mmHg). Separating oxygenated and deoxygenated blood ensures optimal ATP yield for mammalian endothermic homeothermy.`;

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Human Circulatory System: The Heart & Double Circulation",
        cueQuestions,
        mainNotes,
        summary: "The human four-chambered heart drives double circulation: pulmonary loop to lungs for oxygenation and systemic loop to body tissues.",
        coreAnalogy,
        structuralRule,
        curriculumTrap: isMS
          ? "Students often forget that pulmonary veins carry oxygenated blood while the pulmonary artery carries deoxygenated blood, which is the reverse of all other veins and arteries."
          : `In ${boardId} exams, candidates forfeit marks by claiming valves 'pump' blood rather than prevent backflow, or failing to identify left ventricular hypertrophy as an adaptation for high systemic pressure.`,
        verificationProblem: "Which chamber of the heart pumps oxygenated blood into the aorta? (Answer: Left Ventricle).",
        diagramType: 'heart_circulation',
        workedExample: {
          problem: `Trace the complete pathway of an oxygen molecule from alveolar capillaries in the lungs to a biceps muscle cell under ${boardId} standards.`,
          steps: [
            "Step 1: Oxygen diffuses across alveolar membrane into pulmonary capillaries, binding to hemoglobin in erythrocytes.",
            "Step 2: Oxygenated blood travels via pulmonary veins into the Left Atrium of the heart.",
            "Step 3: Passes through the bicuspid (mitral) valve into the thick-walled Left Ventricle.",
            "Step 4: Left Ventricle contracts forcefully during systole, pumping blood through the aortic valve into the Aorta.",
            "Step 5: Aorta branches into systemic arteries and arterioles, delivering oxygen to the capillary beds of the biceps muscle."
          ],
          result: "Lungs (alveoli) ➔ Pulmonary Veins ➔ Left Atrium ➔ Left Ventricle ➔ Aorta ➔ Biceps muscle."
        },
        realWorldUse: "Critical for understanding cardiovascular health, hypertension, atherosclerosis, exercise physiology, and artificial pacemaker design.",
        practiceQuiz: [
          {
            question: "Why is the muscular wall of the left ventricle significantly thicker than that of the right ventricle?",
            options: [
              "It must generate high hydrostatic pressure to circulate blood through the entire systemic body circuit",
              "It holds a greater volume of blood than the right ventricle",
              "It receives blood directly from the vena cava",
              "It requires extra muscle to absorb carbon dioxide from the lungs"
            ],
            answerIndex: 0,
            explanation: "The right ventricle only pumps blood a short distance to the lungs against low pulmonary resistance, whereas the left ventricle must generate enough pressure to drive blood throughout the entire body."
          },
          {
            question: "What is the primary function of the valves located inside the human heart and veins?",
            options: [
              "To prevent the backflow of blood and maintain strict unidirectional circulation",
              "To actively pump and accelerate blood through the vessels",
              "To oxygenate red blood cells during ventricular diastole",
              "To regulate the concentration of glucose in the bloodstream"
            ],
            answerIndex: 0,
            explanation: "Heart and venous valves open with forward pressure and close tightly when pressure reverses, preventing retrograde flow without actively pumping."
          }
        ]
      };
    }
  },

  // B2. Human Digestion & Alimentary Canal
  {
    matcher: (text, subj) =>
      (subj.includes('BIO') || subj.includes('SCI') || subj.includes('LIFE')) &&
      (text.includes('DIGEST') || text.includes('ALIMENTARY') || (text.includes('NUTRITION') && (text.includes('HUMAN') || text.includes('ANIMAL')))),
    diagramType: 'digestive_system',
    generate: (concept, boardId) => {
      const board = normalizeBoard(boardId);
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);

      const structuralRule = isMS
        ? "$\\text{Mouth (Amylase)} \\to \\text{Esophagus (Peristalsis)} \\to \\text{Stomach (HCl + Pepsin)} \\to \\text{Small Intestine (Villi Absorption)} \\to \\text{Large Intestine (H}_2\\text{O)}$"
        : "$\\text{Macromolecules} + \\text{H}_2\\text{O} \\xrightarrow{\\text{Enzymes}} \\text{Monomers: Glucose, Amino Acids, Fatty Acids & Glycerol}$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Human Digestion & Alimentary Canal",
        cueQuestions: [
          "State the sequence of primary organs in the human alimentary canal.",
          "What are the roles of hydrochloric acid and pepsin in gastric digestion?",
          "How are intestinal villi structurally adapted for rapid nutrient absorption?",
          "Explain the role of liver bile in emulsifying fats."
        ],
        mainNotes: `**1. The Digestive Pathway**:
• **Mouth**: Teeth mechanically grind food; salivary amylase begins carbohydrate breakdown.
• **Esophagus**: Muscular wave-like contractions (**peristalsis**) move food bolus downward.
• **Stomach**: Secretes gastric juice containing **Hydrochloric Acid (HCl)** (creates acidic pH, kills bacteria) and **Pepsin** (initiates protein breakdown).
• **Small Intestine**: Primary site of complete digestion and absorption. Receives bile from liver (emulsifies fats) and pancreatic juice. Covered with millions of microscopic **villi** that maximize surface area for nutrient absorption into capillaries.
• **Large Intestine**: Reabsorbs water and minerals, forming solid feces stored in rectum.`,
        summary: "The human digestive system breaks down insoluble complex food into soluble absorbable molecules through mechanical mastication and enzymatic hydrolysis.",
        coreAnalogy: "Think of digestion like a factory disassembly line: complex machines (food) are dismantled step-by-step at specialized stations until raw components (nutrients) are small enough to be loaded into delivery trucks (bloodstream).",
        structuralRule,
        curriculumTrap: "Students often think bile contains digestive enzymes. Bile contains no enzymes; it mechanically emulsifies large lipid globules into microscopic droplets to increase the surface area for lipase.",
        verificationProblem: "Where does the major absorption of water take place in the alimentary canal? (Answer: Large Intestine).",
        diagramType: 'digestive_system',
        workedExample: {
          problem: "Describe the chemical and physical changes food undergoes in the stomach.",
          steps: [
            "Step 1: Stomach wall churns food mechanically into a semi-liquid paste (chyme).",
            "Step 2: Gastric glands secrete gastric juice containing dilute HCl, pepsinogen, and mucus.",
            "Step 3: HCl activates inactive pepsinogen into active enzyme pepsin and kills swallowed pathogens.",
            "Step 4: Pepsin digests proteins into soluble peptides; mucus shields the stomach lining from acid."
          ],
          result: "Food is converted into acidic chyme with initiated protein breakdown."
        },
        realWorldUse: "Applied in gastroenterology, clinical nutrition, metabolic dietetics, and oral drug formulation.",
        practiceQuiz: [
          {
            question: "What is the primary function of the villi in the small intestine?",
            options: [
              "To vastly increase surface area for rapid nutrient absorption",
              "To secrete hydrochloric acid",
              "To produce insulin and glucagon",
              "To mechanically grind tough food fibers"
            ],
            answerIndex: 0,
            explanation: "Villi provide thousands of square meters of surface area with thin epithelial walls and dense capillary networks for diffusion."
          }
        ]
      };
    }
  },

  // B3. Plant Vascular Transport (Xylem & Phloem)
  {
    matcher: (text, subj) =>
      (subj.includes('BIO') || subj.includes('SCI') || subj.includes('LIFE') || subj.includes('PLANT')) &&
      (text.includes('XYLEM') || text.includes('PHLOEM') || text.includes('TRANSPIRAT') || text.includes('VASCULAR') || text.includes('TRANSPORT IN PLANT')),
    diagramType: 'plant_transport',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);

      const structuralRule = isMS
        ? "$\\text{Soil Water} \\xrightarrow{\\text{Roots}} \\text{Xylem (Unidirectional Suction)} \\to \\text{Leaves} \\quad \\parallel \\quad \\text{Phloem: Translocation of Sugars (Bidirectional)}$"
        : "$\\text{Xylem: Cohesion-Tension Transpiration Pull} \\quad \\parallel \\quad \\text{Phloem: Source-to-Sink Osmotic Mass Flow}$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Plant Vascular Transport: Xylem & Phloem",
        cueQuestions: [
          "Distinguish between xylem and phloem based on transported substances and direction of flow.",
          "How does transpiration create a suction force that pulls water up tall trees?",
          "What is translocation and why does it require energy in plants?",
          "How do root hair cells maximize water absorption from soil?"
        ],
        mainNotes: `**1. Two Plant Transport Systems**:
• **Xylem (Water & Minerals)**:
  - Transports water and dissolved mineral ions upward from roots to stems and leaves (**unidirectional**).
  - Composed of dead, hollow, lignified vessels forming continuous microscopic capillary pipes.
  - Driven by **transpiration pull**: evaporation of water vapor through leaf stomata creates suction that pulls water upward.
• **Phloem (Food & Sucrose)**:
  - Transports soluble products of photosynthesis (sucrose, amino acids) from leaves to growing and storage organs (**bidirectional**).
  - Living sieve tube elements and companion cells.
  - Process is called **translocation**, requiring active metabolic energy.`,
        summary: "Plants use xylem for upward passive transport of water via transpiration suction, and phloem for bidirectional active translocation of sugars.",
        coreAnalogy: "Think of xylem like a giant drinking straw: sucking at the top (leaf evaporation) pulls water all the way up from the bottom glass (roots). Think of phloem like a two-way courier delivery van routing packages between warehouses and stores.",
        structuralRule,
        curriculumTrap: "Students often state that xylem transport requires cellular energy. Xylem transport is a physical passive suction process driven by solar evaporation at leaf stomata, requiring no metabolic ATP.",
        verificationProblem: "Which plant vascular tissue transports synthesized food from leaves to roots? (Answer: Phloem).",
        diagramType: 'plant_transport',
        workedExample: {
          problem: "Explain why tree leaves wilt on hot, windy afternoons even if soil moisture is adequate.",
          steps: [
            "Step 1: High temperature and wind drastically accelerate the rate of stomatal transpiration.",
            "Step 2: Water loss from leaf mesophyll cells temporarily exceeds the rate of water absorption by root hairs.",
            "Step 3: Leaf cells lose turgor pressure and become flaccid, causing the leaves to droop (wilt).",
            "Step 4: Stomata close to conserve remaining moisture until water balance recovers in the evening."
          ],
          result: "Transpiration rate temporarily surpasses root absorption rate, causing reversible loss of cell turgidity."
        },
        realWorldUse: "Underpins modern drip irrigation agriculture, crop drought resilience, and xylem-mimicking nanofluidic pumps.",
        practiceQuiz: [
          {
            question: "In what fundamental direction does transport occur within plant xylem vessels?",
            options: [
              "Strictly unidirectional: upward from roots to aerial parts",
              "Bidirectional: moving freely up and down simultaneously",
              "Downward only from leaves to root storage",
              "Radially from bark to center only"
            ],
            answerIndex: 0,
            explanation: "Xylem transport is strictly unidirectional upward, powered by transpiration suction at the leaf stomata."
          }
        ]
      };
    }
  },

  // =========================================================================
  // PHYSICS BLUEPRINTS (GRADE LOCKED)
  // =========================================================================

  // 1. Earth Magnetism & Magnetic Elements
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      (text.includes('MAGNET') || text.includes('DIPOLE') || text.includes('MAGNETIC FIELD')),
    diagramType: 'physics_vector',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Magnetic Rule: Like Poles Repel (N-N, S-S)} \\quad | \\quad \\text{Opposite Poles Attract (N-S)} \\quad | \\quad \\text{Earth } \\approx \\text{Giant Bar Magnet}$"
        : "$B = \mu_0 (H + M) \\quad | \\quad \\tan\\theta = \\frac{B_v}{B_h} \\quad | \\quad B_{\\text{net}} = \\sqrt{B_h^2 + B_v^2}$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Magnetism & Magnetic Fields",
        cueQuestions: isMS
          ? [
              "State the fundamental law of magnetic poles (attraction and repulsion).",
              "How can you demonstrate the shape of magnetic field lines around a bar magnet?",
              "Why does a freely suspended magnetic needle always align in a North-South direction?",
              "What is an electromagnet and how can its strength be increased?"
            ]
          : [
              "Define magnetic inclination (dip angle) and horizontal component Bh.",
              "Derive the relationship between vertical, horizontal, and total magnetic field vectors.",
              "Explain how ferromagnetic domains align under external magnetizing fields.",
              "Contrast dia-, para-, and ferromagnetic materials by magnetic permeability."
            ],
        mainNotes: isMS
          ? `**1. Magnetic Poles & Interactions**:
• Every magnet possesses two distinct poles: a **North (N) pole** and a **South (S) pole**.
• **Law of Magnetic Poles**: Like magnetic poles repel each other (N-N or S-S repel); opposite magnetic poles attract each other (N-S attracts).
• Magnetic poles always exist in pairs; isolating a single magnetic monopole is impossible.

**2. Magnetic Field Lines**:
• The region surrounding a magnet where its magnetic force can be detected is its **magnetic field**.
• Magnetic field lines emerge from the North pole and curve around to enter the South pole, forming closed continuous loops.
• Field lines never intersect each other. Closeness of field lines indicates greater magnetic strength.

**3. Earth as a Magnet**:
• Earth acts like a giant bar magnet tilted slightly relative to its geographic axis.
• A freely suspended compass needle aligns with Earth's magnetic field lines, pointing roughly toward geographic North.`
          : `**1. Magnetic Field Elements of Earth**:
At any point on Earth's surface, the geomagnetic field vector $\\vec{B}$ is characterized by three magnetic elements:
• **Magnetic Declination (D)**: The acute angle between geographic meridian and magnetic meridian.
• **Magnetic Inclination / Dip Angle ($\\theta$)**: The vertical angle between the total geomagnetic field vector and horizontal plane:
  $$\\tan \\theta = \\frac{B_v}{B_h}$$
• **Horizontal Component ($B_h$)**: The projection of Earth's magnetic field along the horizontal:
  $$B_h = B \\cos \\theta, \\quad B_v = B \\sin \\theta, \\quad B = \\sqrt{B_h^2 + B_v^2}$$

**2. Magnetic Dip Behavior**:
• At the **Magnetic Equator**: $\\theta = 0^\\circ$ (field is purely horizontal, $B_v = 0$).
• At the **Magnetic Poles**: $\\theta = 90^\\circ$ (field is purely vertical, $B_h = 0$).`,
        summary: isMS
          ? "Magnets have North and South poles; like poles repel and opposite attract. Earth acts as a giant magnet orienting compass needles."
          : "Earth's magnetic field is resolved into horizontal and vertical components linking dip angle theta and declination.",
        coreAnalogy: isMS
          ? "Think of magnets like adhesive tape that only sticks to its opposite face: matching sides push away while opposite faces cling together firmly."
          : "Think of Earth's magnetic field like wind blowing at an angle across a landscape: you can split its velocity into forward ground speed and downward downdraft.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often forget that the magnetic pole located near Earth's geographic North Pole is actually a magnetic South-seeking pole, which is why the North pole of a compass needle is attracted to it."
          : "Candidates frequently lose marks by writing Bh = B sin θ instead of Bh = B cos θ.",
        verificationProblem: isMS
          ? "If two North poles are brought close together, what force do they exert on each other? (Answer: Repulsive force)."
          : "If Bh = 0.3 G and Bv = 0.4 G, find total B. (Answer: √(0.09 + 0.16) = 0.5 G).",
        diagramType: 'physics_vector',
        workedExample: {
          problem: isMS
            ? "Explain how a simple compass works to guide navigation."
            : "At a certain location, Bh = 0.35 G and dip angle θ = 45°. Calculate vertical component Bv and total field B.",
          steps: isMS
            ? [
                "Step 1: A compass contains a lightweight magnetized needle balanced on a frictionless pivot.",
                "Step 2: Earth's magnetic field exerts magnetic forces on the needle poles.",
                "Step 3: The needle rotates until it aligns with the magnetic field lines.",
                "Step 4: The colored North end points toward the Earth's geographic North."
              ]
            : [
                "Step 1: State relationship: tan θ = Bv / Bh.",
                "Step 2: For θ = 45°, tan 45° = 1.0 ➔ Bv = Bh = 0.35 G.",
                "Step 3: Compute total B: B = Bh / cos 45° = 0.35 / (1/√2) = 0.35 × 1.414 = 0.495 G."
              ],
          result: isMS ? "Compass needle aligns with Earth's North-South magnetic axis." : "Bv = 0.35 G, B_total = 0.495 Gauss."
        },
        realWorldUse: "Navigation, aerospace heading sensors, paleomagnetic geological dating, and MRI medical scanners.",
        practiceQuiz: [
          {
            question: isMS ? "What happens when two South poles of two bar magnets are placed near each other?" : "What is the value of magnetic dip angle at the magnetic equator?",
            options: isMS ? ["They repel each other", "They attract each other", "They produce an electric spark", "Nothing happens"] : ["0°", "45°", "90°", "180°"],
            answerIndex: 0,
            explanation: isMS ? "Like magnetic poles (S-S or N-N) always exert mutually repulsive magnetic forces." : "At the magnetic equator, the geomagnetic field lines are strictly parallel to Earth's surface, so dip is 0°."
          }
        ]
      };
    }
  },

  // 2. Ray Optics, Reflection, Refraction, Snell's Law & Mirrors
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      !text.includes('NUCLEAR') &&
      !text.includes('FISSION') &&
      !text.includes('FUSION') &&
      !text.includes('RADIOACT') &&
      !text.includes('BINDING ENERGY') &&
      !text.includes('THERMODYNAMIC') &&
      !text.includes('CALORIMETR') &&
      (text.includes('OPTIC') || text.includes('REFLECT') || text.includes('REFRACT') || text.includes('MIRROR') || text.includes('LENS') || (/\bLIGHT\b/.test(text) && !text.includes('LIGHTER') && !text.includes('PHOTO'))),
    diagramType: 'ray_optics',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\angle i = \\angle r \\quad | \\quad \\text{Plane Mirror: Virtual, Erect, Same Size} \\quad | \\quad \\text{Speed of Light: Air} > \\text{Water} > \\text{Glass}$"
        : "$\\frac{\\sin i}{\\sin r} = \\frac{n_2}{n_1} \\quad | \\quad \\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u} \\quad | \\quad m = \\frac{v}{u}$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Optics: Reflection, Refraction & Image Formation",
        cueQuestions: isMS
          ? [
              "State the two fundamental Laws of Reflection of light.",
              "Describe four key characteristics of an image formed by a plane mirror.",
              "Distinguish between real images and virtual images with examples.",
              "What are the everyday uses of concave and convex curved mirrors?"
            ]
          : [
              "State Snell's Law of Refraction in terms of refractive index.",
              "Derive the mirror formula (1/f = 1/v + 1/u) and linear magnification formula.",
              "Explain the conditions required for Total Internal Reflection to occur.",
              "State the Cartesian sign convention rules for spherical lenses."
            ],
        mainNotes: isMS
          ? `**1. Nature of Light & Rectilinear Propagation**:
• Light travels in straight lines in a uniform medium (rectilinear propagation).
• A ray is the direction of light path; a beam is a collection of rays.

**2. Laws of Reflection**:
1. The angle of incidence equals the angle of reflection: $\\angle i = \\angle r$.
2. The incident ray, the reflected ray, and the normal to the reflecting surface at the point of incidence all lie in the same plane.

**3. Plane Mirrors & Image Characteristics**:
• Image is strictly **virtual** (cannot be caught on a screen) and **erect** (upright).
• Image distance behind the mirror equals object distance in front of it.
• Image size is identical to object size.
• Image is **laterally inverted** (left appears right and right appears left).

**4. Spherical Curved Mirrors**:
• **Concave Mirror**: Curving inward. Can form both real and virtual images. Used in doctor headlamps, car headlights, and solar concentrators.
• **Convex Mirror**: Curving outward. Always forms diminished, virtual, erect images with a broad field of view. Used as rear-view mirrors in vehicles.`
          : `**1. Laws of Refraction & Snell's Law**:
When a ray passes obliquely from medium 1 (index $n_1$) to medium 2 (index $n_2$):
$$\\frac{\\sin i}{\\sin r} = \\frac{n_2}{n_1} = \\frac{v_1}{v_2}$$
Light bending toward the normal indicates entering an optically denser medium ($v_2 < v_1, n_2 > n_1$).

**2. Spherical Mirror & Lens Formulas (Cartesian Sign Convention)**:
• Mirror Equation: $\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}$, Magnification $m = -\\frac{v}{u} = \\frac{h_i}{h_o}$.
• Thin Lens Equation: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u}$, Magnification $m = +\\frac{v}{u} = \\frac{h_i}{h_o}$.

**3. Total Internal Reflection (TIR)**:
Occurs when light travels from optically denser to rarer medium at an angle of incidence exceeding the critical angle: $\\sin i_c = \\frac{1}{n}$.`,
        summary: isMS
          ? "Light reflects such that angle of incidence equals angle of reflection. Plane mirrors produce virtual, erect, laterally inverted images."
          : "Refraction follows Snell's Law; spherical optics obey lens and mirror formulas under Cartesian sign conventions.",
        coreAnalogy: isMS
          ? "Think of bouncing a tennis ball straight against a flat wall: throw it at a 30° angle and it bounces off at the exact matching 30° angle."
          : "Think of a lawnmower pushed obliquely from smooth pavement onto thick grass: one wheel slows down first, pivoting the mower's path.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students frequently confuse lateral inversion with an upside-down image. In a plane mirror, the image is upright (erect), but left and right sides are reversed."
          : "Mixing up minus signs between mirror magnification (m = -v/u) and lens magnification (m = +v/u).",
        verificationProblem: isMS
          ? "If a ray hits a flat mirror at an angle of incidence of 35°, what is the angle of reflection? (Answer: 35°)."
          : "An object is placed 20 cm in front of a concave mirror of focal length 15 cm. Find v. (Answer: 1/v = 1/(-15) - 1/(-20) ➔ v = -60 cm).",
        diagramType: 'ray_optics',
        workedExample: {
          problem: isMS
            ? "A student stands 2.5 meters in front of a full-length plane mirror. How far is the student from their image?"
            : "A converging lens has focal length f = +10 cm. An object is placed 30 cm from the lens. Find image position and magnification.",
          steps: isMS
            ? [
                "Step 1: For a plane mirror, image distance behind mirror equals object distance in front: d_image = 2.5 m.",
                "Step 2: Total distance between student and image = Object distance + Image distance.",
                "Step 3: Total distance = 2.5 m + 2.5 m = 5.0 meters."
              ]
            : [
                "Step 1: Set parameters: f = +10 cm, u = -30 cm.",
                "Step 2: Apply thin lens formula: 1/v = 1/f + 1/u = 1/10 + 1/(-30) = (3 - 1)/30 = 2/30 = 1/15.",
                "Step 3: Solve for v: v = +15 cm (real image formed 15 cm behind lens).",
                "Step 4: Compute magnification: m = v / u = (+15) / (-30) = -0.5 (diminished, inverted)."
              ],
          result: isMS ? "Total distance = 5.0 meters." : "v = +15 cm, m = -0.5."
        },
        realWorldUse: "Optical microscopes, telescopes, fiber optic telecommunications, vehicle safety mirrors, and cameras.",
        practiceQuiz: [
          {
            question: isMS ? "Why are convex mirrors used as rear-view mirrors in vehicles?" : "Under what condition does Total Internal Reflection occur?",
            options: isMS
              ? [
                  "They always form erect, diminished images giving a much wider field of view",
                  "They magnify distant vehicles to appear very large",
                  "They turn images upside down for clarity",
                  "They absorb headlight glare completely"
                ]
              : [
                  "When light travels from denser to rarer medium and angle of incidence exceeds critical angle",
                  "When light travels from rarer to denser medium at any angle",
                  "When light enters normal to the boundary",
                  "When refractive index of both media is identical"
                ],
            answerIndex: 0,
            explanation: isMS
              ? "Convex mirrors curve outward, creating upright virtual images of objects over a broad angle of view."
              : "TIR requires light traveling toward a lower-index medium where refraction cannot exceed 90°."
          }
        ]
      };
    }
  },

  // 2A. Thermodynamics, Heat Transfer & Temperature (MUST precede generic Work/Energy blueprint)
  // Fix for Bug #1b/content mismatch: "Temperature vs Heat Energy" and "Conduction in Solids"
  // were matching the generic ENERGY check below and receiving pendulum PE/KE notes.
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      (
        text.includes('THERMODYNAMIC') ||
        text.includes('CALORIMETR') ||
        text.includes('SPECIFIC HEAT') ||
        text.includes('TEMPERATURE VS') ||
        text.includes('HEAT ENERGY') ||
        text.includes('HEAT TRANSFER') ||
        text.includes('CONDUCTION') ||
        text.includes('CONVECTION') ||
        text.includes('RADIATION') ||
        text.includes('LATENT HEAT') ||
        text.includes('THERMAL EQUILIB') ||
        text.includes('THERMAL EXPAN') ||
        (text.includes('HEAT') && text.includes('TEMP')) ||
        text.includes('HEAT-THERM') ||
        text.includes('HEAT-COND')
      ),
    diagramType: 'energy_transfer',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const board = normalizeBoard(boardId);
      const structuralRule = isMS
        ? "$$\\text{Heat Transfer: } Q = mc\\Delta T \\quad | \\quad \\text{Direction: High Temperature} \\longrightarrow \\text{Low Temperature} \\quad | \\quad \\text{Modes: Conduction, Convection, Radiation}$$"
        : "$$Q = mc\\Delta T \\quad | \\quad Q = mL \\quad | \\quad \\frac{dQ}{dt} = -kA \\frac{dT}{dx} \\quad | \\quad \\Delta U = Q - W$$";

      const trapContent = board === 'CAMBRIDGE'
        ? generateCambridgeMarkSchemeGuidance(concept)
        : board === 'IB_MYP'
        ? generateIBMYPInquiryAndCriterion(concept)
        : generateCBSEExamTrapsAndMarkingPatterns(concept);

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Thermodynamics & Heat Transfer",
        diagramType: 'energy_transfer' as any,
        cueQuestions: isMS
          ? [
              "What is the fundamental difference between heat energy and temperature?",
              "Describe the three mechanisms of heat transfer: conduction, convection, and radiation.",
              "Why are metals excellent thermal conductors compared to wood or plastic?",
              "Explain how convection currents form in liquids and gases (sea breeze vs land breeze).",
              "Why does temperature remain constant during phase changes (melting/boiling)?",
            ]
          : [
              "Define Specific Heat Capacity (c) and Latent Heat (L) with SI units.",
              "State Fourier's Law of Thermal Conduction: dQ/dt = -kA (dT/dx).",
              "State the First Law of Thermodynamics (ΔU = Q - W) and explain sign conventions.",
              "Explain the mechanism of metallic conduction via free electrons vs non-metallic lattice vibrations (phonons).",
              "Distinguish between isothermal and adiabatic thermodynamic processes.",
            ],
        mainNotes: isMS
          ? `### Temperature vs Heat Energy & Heat Transfer
**Core Principle**: ${concept.coreLogicEssence || 'Heat is thermal energy in transit between regions of temperature difference; temperature is the measure of the average kinetic energy of particles.'}

**1. Temperature vs Heat Energy**:
• **Heat Energy ($Q$)**: The total thermal energy transferred from a hotter body to a colder body due to temperature difference. Measured in **Joules (J)**.
• **Temperature ($T$)**: The degree of hotness or coldness; a measure of the *average* kinetic energy of individual particles. Measured in **Celsius (°C)** or **Kelvin (K)** ($T_{\\text{K}} = T_{^\\circ\\text{C}} + 273.15$).

**2. Three Modes of Heat Transfer**:
• **Conduction**: Heat transfer through direct molecular contact and lattice vibration without bulk motion of matter. Dominant in **solids** (especially metals due to free mobile electrons).
• **Convection**: Heat transfer through bulk fluid displacement driven by buoyancy/density differences (warm fluid expands, becomes less dense, and rises). Dominant in **fluids (liquids and gases)**.
• **Radiation**: Heat transfer via electromagnetic infrared waves requiring **no material medium** (e.g., Solar radiation through the vacuum of space).

**3. Thermal Invariant**:
Heat always flows spontaneously from regions of **higher temperature to lower temperature** until thermal equilibrium ($T_1 = T_2$) is reached.`
          : `### Thermodynamics & Thermal Energy Transfer (Secondary Level)
**Core Principle**: ${concept.coreLogicEssence || 'Thermodynamics governs energy conservation (1st Law: ΔU = Q - W) and spontaneous heat flux driven by temperature gradients according to Fourier conduction and Stefan-Boltzmann radiation.'}

**1. Quantitative Calorimetry**:
• Sensible Heat: $Q = mc\\Delta T$, where $c$ is Specific Heat Capacity (J/(kg·K)).
• Latent Heat (Phase Change): $Q = mL$, where $L$ is Specific Latent Heat of Fusion/Vaporization (J/kg). Temperature remains strictly constant during phase transitions.

**2. Fourier's Law of Conduction**:
$$\\frac{dQ}{dt} = -kA \\frac{dT}{dx}$$
where $k$ is thermal conductivity (W/(m·K)), $A$ is cross-sectional area, and $dT/dx$ is the temperature gradient.

**3. First Law of Thermodynamics**:
$$\\Delta U = Q - W$$
Internal energy $\\Delta U$ is a state function; heat added $Q$ and work done $W$ are path-dependent process quantities.`,
        summary: isMS
          ? `[${concept.id}] ${concept.title}: Heat (Joules) is thermal energy in transit; Temperature (Kelvin/°C) measures average particle kinetic energy. Heat transfers via Conduction (solids), Convection (fluids), and Radiation (electromagnetic waves in vacuum). Thermal equilibrium occurs when temperature gradient becomes zero.`
          : `[${concept.id}] ${concept.title}: Thermal systems are quantified by Q = mcΔT (sensible) and Q = mL (latent). Heat flux follows Fourier's conduction law dQ/dt = -kA(dT/dx). The 1st Law ΔU = Q - W enforces mechanical-thermal energy conservation.`,
        coreAnalogy: isMS
          ? `Intuition for ${concept.title}: Think of temperature like the water level in a tank, and heat like the water flowing between tanks. Water only flows from higher level to lower level, regardless of how big the tanks are. Similarly, heat only flows from higher temperature to lower temperature.`
          : `Intuition for ${concept.title}: Temperature is the "thermal pressure" (intensity) while heat is the "thermal volume" (quantity) flowing down the pressure gradient. A sparkler at 1500°C has high temperature but low heat content; a warm swimming pool at 30°C has low temperature but massive heat content.`,
        structuralRule: structuralRule,
        curriculumTrap: `Key exam trap for ${concept.title}: ${trapContent}`,
        verificationProblem: `Verify ${concept.title}: A 2 kg block of copper ($c = 390\\text{ J/(kg}\\cdot\\text{K)}$) is heated from $20^\\circ\\text{C}$ to $70^\\circ\\text{C}$. Calculate heat energy absorbed. Answer: $Q = mc\\Delta T = 2 \\times 390 \\times (70 - 20) = 2 \\times 390 \\times 50 = 39,000\\text{ J} = 39\\text{ kJ}$.`,
        workedExample: {
          problem: `[${concept.id}] Apply principles of ${concept.title}: Explain why a tile floor feels much colder to bare feet than a wool carpet in the same room at identical temperature ($20^\\circ\\text{C}$).`,
          steps: [
            'Step 1 — Identify temperature: Both the tile and carpet are at thermal equilibrium with the room ($20^\\circ\\text{C}$). Neither is physically colder than the other.',
            'Step 2 — Compare thermal conductivity: Ceramic tile has high thermal conductivity ($k \\approx 1.5\\text{ W/(m}\\cdot\\text{K)}$), whereas wool has very low thermal conductivity ($k \\approx 0.04\\text{ W/(m}\\cdot\\text{K)}$) due to trapped air pockets.',
            'Step 3 — Apply Fourier conduction: Bare feet are at body temperature ($\\approx 37^\\circ\\text{C}$). When stepping on tile, heat conducts rapidly from foot to tile, causing a steep temperature drop at skin thermoreceptors.',
            'Step 4 — Conclusion: The sensation of "cold" reflects the rate of heat loss from the skin, not the ambient temperature of the object.',
          ],
          result: 'Tile has higher thermal conductivity than carpet, transferring heat away from bare feet at a much higher rate (dQ/dt), creating the sensation of cold despite identical temperature.',
        },
        realWorldUse: 'Thermal insulation in homes (double glazing, fiberglass loft insulation), cooling systems (CPU heat sinks, radiators), thermoregulation in organisms (fur, blubber, sweating), vacuum flasks (Dewar flasks suppressing conduction, convection, and radiation).',
        practiceQuiz: [
          {
            question: 'Which method of heat transfer does NOT require any material medium and can travel through vacuum?',
            options: [
              'Conduction',
              'Convection',
              'Thermal Radiation',
              'Advection',
            ],
            answerIndex: 2,
            explanation: 'Thermal radiation consists of electromagnetic infrared waves which propagate through vacuum (e.g. sunlight reaching Earth). Conduction and convection strictly require particle interactions in matter.',
          },
          {
            question: 'During the melting of ice at 0°C into water at 0°C, the added heat energy is used to:',
            options: [
              'Increase the temperature and kinetic energy of the water molecules',
              'Overcome intermolecular hydrogen bonds without increasing temperature (latent heat)',
              'Break the covalent O-H bonds inside the water molecule',
              'Decrease the entropy of the ice lattice structure',
            ],
            answerIndex: 1,
            explanation: 'Latent heat of fusion is absorbed to break intermolecular bonds and convert the crystal lattice into liquid form. Because average particle kinetic energy does not increase during this phase transition, temperature remains constant at 0°C.',
          },
        ],
      };
    },
  },

  // 2B. Work, Energy, Power & Kinetic Energy Derivation (HIGHEST PRIORITY FOR ENERGY TOPICS)
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      !text.includes('CIRCUIT') &&
      !text.includes('OHM') &&
      !text.includes('RESIST') &&
      !text.includes('VOLT') &&
      !text.includes('AMPERE') &&
      !text.includes('THERMODYNAMIC') &&
      !text.includes('CALORIMETR') &&
      !text.includes('SPECIFIC HEAT') &&
      !text.includes('TEMPERATURE VS') &&
      !text.includes('HEAT ENERGY') &&
      !text.includes('HEAT TRANSFER') &&
      !text.includes('CONDUCTION') &&
      !text.includes('HEAT-THERM') &&
      !text.includes('HEAT-COND') &&
      (text.includes('WORK') || text.includes('KINETIC') || text.includes('POTENTIAL ENERGY') || text.includes('CONSERV') || (text.includes('ENERGY') && !text.includes('TROPHIC') && !text.includes('CELL') && !text.includes('ATP') && !text.includes('BOND') && !text.includes('HEAT'))),
    diagramType: 'energy_transfer',
    generate: (concept, boardId) => {
      const board = normalizeBoard(boardId);
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);

      const structuralRule = isMS
        ? "$\\text{Work} = \\text{Force} \\times \\text{Distance} \\quad | \\quad \\text{Kinetic Energy: Energy of Motion} \\quad | \\quad \\text{Conservation of Energy: Total Invariant}$"
        : "KE = \\frac{1}{2} m v^2 \\quad | \\quad W = F \\cdot d \\quad | \\quad PE = mgh \\quad | \\quad P = \\frac{W}{t} \\quad | \\quad W_{\\text{net}} = \\Delta KE";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Work, Energy & Power",
        cueQuestions: isMS
          ? [
              "What is the scientific definition of work and its SI unit?",
              "Distinguish between kinetic energy and potential energy with everyday examples.",
              "State the Law of Conservation of Energy and describe how energy transforms in a roller coaster or pendulum.",
              "Explain why pushing against a stationary brick wall does zero scientific work."
            ]
          : [
              "State the scientific condition under which the work done by a force is strictly zero.",
              "Derive the mathematical expression for kinetic energy (KE = 1/2 mv²) from work done W = Fs.",
              "State the Law of Conservation of Mechanical Energy for a freely falling body.",
              "Define 1 Watt of power and convert 1 kWh into Joules."
            ],
        mainNotes: isMS
          ? `**1. Scientific Work**:
• In science, **Work** is done only when an applied force causes an object to move in the direction of the force:
  $$\\text{Work} = \\text{Force} \\times \\text{Distance moved}$$
• SI unit: **Joule (J)**. One Joule is the work done when a force of 1 Newton moves an object by 1 meter.
• If there is no movement, Work done = 0 (e.g. pushing a heavy stationary wall).

**2. Forms of Energy**:
• **Kinetic Energy**: Energy possessed by an object due to its motion (e.g. rolling ball, speeding car, flowing river).
• **Potential Energy**: Energy stored in an object due to its position or state (e.g. water held high in a reservoir, stretched catapult elastic).

**3. Law of Conservation of Energy**:
• Energy can neither be created nor destroyed; it can only be converted from one form to another.
• In a swinging pendulum: at highest positions, all energy is potential; at lowest position, potential converts completely into kinetic energy.

**4. Power**:
• The rate of doing work or transferring energy: $\\text{Power} = \\frac{\\text{Work}}{\\text{Time}}$ (Watts = Joules/second).`
          : `**1. Work Done & Vector Dot Product**:
Work is scalar product of force vector and displacement:
$$W = \\vec{F} \\cdot \\vec{d} = F d \\cos \\theta$$
Zero work occurs when displacement is zero or when force is perpendicular to motion ($\\theta = 90^\\circ$).

**2. Derivation of Kinetic Energy ($KE = \\frac{1}{2}mv^2$)**:
From $W = F \\cdot s$, substituting Newton's second law $F = ma$:
$$W = m(as)$$
From kinematic equation $v^2 - u^2 = 2as \\implies as = \\frac{v^2 - u^2}{2}$.
For object initially at rest ($u = 0$): $as = \\frac{v^2}{2}$.
$$W = m \\left( \\frac{v^2}{2} \\right) = \\frac{1}{2} m v^2 \\implies \\text{KE} = \\frac{1}{2} m v^2$$

**3. Conservation of Mechanical Energy**:
For free fall under gravity: $E_{\\text{total}} = KE + PE = \\frac{1}{2}mv^2 + mgh = \\text{constant}$.`,
        summary: isMS
          ? "Work is force times distance; kinetic energy is energy of motion and potential energy is stored energy. Total energy is always conserved."
          : "Work done accelerates mass into kinetic energy (KE = 1/2 mv²), converting conservatively with gravitational potential energy (PE = mgh).",
        coreAnalogy: isMS
          ? "Think of energy like cash in a piggy bank: spending it (work) converts money from stored bills (potential energy) into active goods (kinetic energy), but total account value stays unchanged."
          : "Think of kinetic energy like liquid capital in a banking system: work is the transactional transfer, and potential energy is asset collateral.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often think holding a heavy bag without moving does work. Because distance moved is zero, scientific work done is strictly ZERO."
          : "Forgetting that doubling speed quadruples kinetic energy (KE ∝ v²), not doubles it.",
        verificationProblem: isMS
          ? "A boy pushes a box with 40 N force through 5 meters. Calculate work done. (Answer: 40 × 5 = 200 Joules)."
          : "A 2 kg mass is dropped from 5 m. Find speed at ground. (Answer: v = √(2gh) = √(2 × 9.8 × 5) = √98 ≈ 9.9 m/s).",
        diagramType: 'energy_transfer',
        workedExample: {
          problem: isMS
            ? "A student lifts a 10 kg box vertically by 2 meters. How much work is done against gravity? (Use g = 10 m/s²)."
            : "Calculate work done to accelerate an 800 kg car from 10 m/s to 20 m/s.",
          steps: isMS
            ? [
                "Step 1: Calculate weight force: F = mass × g = 10 kg × 10 m/s² = 100 N.",
                "Step 2: Identify distance lifted: d = 2 meters.",
                "Step 3: Apply work formula: Work = Force × Distance = 100 N × 2 m = 200 Joules."
              ]
            : [
                "Step 1: Initial KE = 0.5 × 800 × 10² = 40,000 J.",
                "Step 2: Final KE = 0.5 × 800 × 20² = 160,000 J.",
                "Step 3: Work done = ΔKE = 160,000 - 40,000 = 120,000 Joules (120 kJ)."
              ],
          result: isMS ? "Work done = 200 Joules." : "Work done = 120 kJ."
        },
        realWorldUse: "Hydroelectric power plants, automotive regenerative brakes, amusement roller coasters, and mechanical engines.",
        practiceQuiz: [
          {
            question: isMS ? "In which scenario is scientific work strictly zero?" : "If the speed of a vehicle is tripled, by what factor does its kinetic energy increase?",
            options: isMS
              ? ["A porter standing completely still with luggage on his head", "A horse pulling a cart along a road", "A cyclist pedaling up a hill", "An apple falling from a branch"]
              : ["9 times", "3 times", "6 times", "27 times"],
            answerIndex: 0,
            explanation: isMS
              ? "Because displacement is zero, Work = Force × 0 = 0."
              : "KE is proportional to v²: (3v)² = 9v²."
          }
        ]
      };
    }
  },

  // 2B. Sound Waves, Acoustic Propagation & Simple Pendulum
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      (text.includes('SOUND') || text.includes('ACOUSTIC') || text.includes('ECHO') || text.includes('SONAR') || text.includes('PENDULUM') || (text.includes('WAVE') && !text.includes('LIGHT') && !text.includes('ELECTROMAGNETIC'))),
    diagramType: 'wave_frequency',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$$\text{Speed of Sound} = \frac{\text{Distance}}{\text{Time}} \quad | \quad \text{Frequency (Hz)} = \frac{\text{Oscillations}}{\text{Time}} \quad | \quad \text{Speed: Solids} > \text{Liquids} > \text{Gases}$$"
        : "$$v = f \lambda \quad | \quad T = \frac{1}{f} \quad | \quad T = 2\pi \sqrt{\frac{L}{g}} \quad | \quad \text{Echo: } 2d = v \times t$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Sound Waves & Acoustic Propagation",
        cueQuestions: isMS
          ? [
              "How is sound produced by vibrating objects and vocal cords?",
              "Why does sound require a material medium (solid, liquid, gas) to propagate?",
              "Distinguish between pitch (frequency) and loudness (amplitude) of sound.",
              "State the audible frequency range for human ears (20 Hz to 20,000 Hz)."
            ]
          : [
              "Explain the mechanism of longitudinal wave propagation via compressions and rarefactions.",
              "Derive the fundamental wave equation v = fλ connecting speed, frequency, and wavelength.",
              "Calculate the minimum distance required to hear an echo in air at 20°C (17.2 meters).",
              "State the formula for the time period of a simple pendulum and explain why mass is independent."
            ],
        mainNotes: isMS
          ? `**1. Production and Propagation of Sound**:
• **Vibration**: Sound is produced by vibrating bodies (e.g. vibrating strings, tuning fork prongs, human vocal cords).
• **Material Medium Required**: Sound is a mechanical wave and cannot travel through a vacuum.
• **Speed Comparison**: Sound travels fastest in solids, slower in liquids, and slowest in gases:
  $$\\text{Solids} > \\text{Liquids} > \\text{Gases} \quad (\\text{Air} \\approx 340\\text{ m/s}, \\; \\text{Water} \\approx 1500\\text{ m/s}, \\; \\text{Steel} \\approx 5000\\text{ m/s})$$

**2. Characteristics of Sound Waves**:
• **Amplitude & Loudness**: Loudness is proportional to the square of amplitude ($\\text{Loudness} \\propto \\text{Amplitude}^2$).
• **Frequency & Pitch**: High frequency produces shrill/high-pitched sound; low frequency produces deep/low-pitched sound.
• **Audible Range**: Humans hear frequencies between $20\\text{ Hz}$ and $20{,}000\\text{ Hz}$. Below $20\\text{ Hz}$ is infrasonic; above $20{,}000\\text{ Hz}$ is ultrasonic.

**3. The Simple Pendulum**:
• A simple pendulum consists of a small metallic bob suspended by a light inextensible thread.
• The time taken to complete one full oscillation back and forth is its **time period $T$**.`
          : `**1. Longitudinal Waves & Mechanical Propagation**:
• Sound propagates as mechanical longitudinal waves consisting of alternating high-pressure **compressions** and low-pressure **rarefactions**.
• **Wave Equation**:
  $$v = f \\lambda$$
  where $v$ is propagation velocity (m/s), $f$ is frequency (Hz), and $\\lambda$ is wavelength (m).

**2. Wave Periodicity & Harmonic Motion**:
• **Time Period ($T$)**: Time for one complete cycle: $T = \\frac{1}{f}$.
• **Simple Pendulum Isochronism**: For small angular displacements ($\\theta < 10^\\circ$):
  $$T = 2\\pi \\sqrt{\\frac{L}{g}}$$
  The time period depends strictly on pendulum length $L$ and acceleration due to gravity $g$, independent of bob mass.

**3. Echoes and Ultrasonic Applications**:
• An echo is the distinct reflection of sound heard after bouncing off a hard surface.
• Minimum distance for distinct echo in air (persistence of hearing $= 0.1\\text{ s}$):
  $$2d = v \\times t \\implies d = \\frac{344 \\times 0.1}{2} = 17.2\\text{ meters}$$
• **SONAR (Sound Navigation and Ranging)**: Uses ultrasonic pulses ($> 20\\text{ kHz}$) to measure oceanic depths and locate submerged objects.`,
        summary: isMS
          ? "Sound is a mechanical wave produced by vibrations requiring a medium; pitch depends on frequency and loudness depends on amplitude."
          : "Sound propagates as longitudinal density fluctuations governed by v = fλ; echoes require 2d = vt with minimum 17.2 m reflection distance.",
        coreAnalogy: isMS
          ? "Think of sound waves like ripples spreading when a pebble drops in water, or like an accordion squeezing together (compression) and stretching apart (rarefaction)."
          : "Think of longitudinal sound waves like pushing and pulling one end of a stretched slinky spring: compressed rings travel forward along the spring axis.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often assume sound can travel in space. Sound is a mechanical wave requiring matter particles, so in a vacuum, sound is strictly ZERO."
          : "Forgetting the factor of 2 in echo and SONAR calculations: sound travels to the barrier AND back (total distance = 2d).",
        verificationProblem: isMS
          ? "A person shouts near a cliff and hears an echo after 2 seconds. If speed of sound is 340 m/s, how far is the cliff? (Answer: Distance = (Speed × Time) / 2 = (340 × 2) / 2 = 340 meters)."
          : "A sound wave has frequency 500 Hz and wavelength 0.68 m. Find wave speed. (Answer: v = fλ = 500 × 0.68 = 340 m/s).",
        diagramType: 'wave_frequency',
        workedExample: {
          problem: isMS
            ? "A tuning fork vibrates 512 times in one second. What is its frequency and time period?"
            : "A ship uses SONAR to send an ultrasound pulse to the ocean floor. The signal returns in 1.4 seconds. If sound speed in seawater is 1530 m/s, calculate depth.",
          steps: isMS
            ? [
                "Step 1: Frequency is oscillations per second: f = 512 Hz.",
                "Step 2: Time period T = 1 / f = 1 / 512 = 0.00195 seconds."
              ]
            : [
                "Step 1: Write echo equation: 2d = v × t ➔ d = (v × t) / 2.",
                "Step 2: Substitute values: d = (1530 × 1.4) / 2 = 2142 / 2 = 1071 meters."
              ],
          result: isMS ? "Frequency = 512 Hz, Period T = 0.00195 s." : "Ocean depth = 1071 meters."
        },
        realWorldUse: "Medical ultrasound imaging, submarine SONAR depth sounding, acoustic architectural design of concert halls, and noise-canceling headphones.",
        practiceQuiz: [
          {
            question: isMS
              ? "Through which medium does sound travel with the greatest speed?"
              : "What is the primary governing formula for the speed of a wave in terms of frequency and wavelength?",
            options: isMS
              ? ["Solid steel rod", "Liquid water", "Air", "Vacuum"]
              : ["v = fλ", "v = f / λ", "v = λ / f", "v = f + λ"],
            answerIndex: 0,
            explanation: isMS
              ? "Sound travels fastest in dense solids (steel ~5000 m/s) because tightly packed molecules transmit mechanical vibrations most rapidly."
              : "The fundamental wave relationship is wave speed equals frequency multiplied by wavelength (v = fλ)."
          }
        ]
      };
    }
  },

  // 2C. Nuclear Physics, Fission, Fusion & Sustainable Energy
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      (text.includes('NUCLEAR') || text.includes('FISSION') || text.includes('FUSION') || text.includes('RADIOACT') || text.includes('BINDING ENERGY')),
    diagramType: 'reaction_energy',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$$\text{Nuclear Energy: Splitting Heavy Atoms (Fission) or Combining Light Atoms (Fusion)} \quad | \quad \text{Mass Defect} \longrightarrow \text{Heat Energy}$$"
        : "$$E = \Delta m \cdot c^2 \quad | \quad {}^{235}_{\ 92}\text{U} + {}^1_0n \longrightarrow {}^{141}_{\ 56}\text{Ba} + {}^{92}_{36}\text{Kr} + 3\,{}^1_0n + Q$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Nuclear Energy & Sustainable Resources",
        cueQuestions: isMS
          ? [
              "What is nuclear energy and where is it stored inside an atom?",
              "Distinguish between nuclear fission and nuclear fusion with examples.",
              "What are the main advantages and environmental risks of nuclear power plants?",
              "Why are renewable energy sources (solar, wind) considered sustainable alternatives?"
            ]
          : [
              "State Einstein's mass-energy equivalence principle and explain mass defect Δm.",
              "Write the complete nuclear reaction equation for induced fission of Uranium-235.",
              "Explain how control rods and moderators regulate chain reactions in nuclear reactors.",
              "Compare the energy yield per unit mass of nuclear fusion versus chemical combustion."
            ],
        mainNotes: isMS
          ? `**1. The Atomic Nucleus as an Energy Store**:
• The nucleus of an atom consists of tightly bound protons and neutrons held together by strong forces.
• Breaking apart heavy nuclei or joining light nuclei releases immense energy compared to chemical burning.

**2. Nuclear Fission vs Nuclear Fusion**:
• **Nuclear Fission**: A heavy atomic nucleus (like Uranium-235) splits into two lighter fragments when struck by a slow neutron, releasing heat.
• **Nuclear Fusion**: Two light nuclei (like Hydrogen isotopes) combine under extreme temperature and pressure to form a heavier nucleus (Helium), powering the Sun and stars.

**3. Clean Power vs Radioactive Waste**:
• Nuclear power produces zero greenhouse gas emissions during electrical generation.
• Safe disposal of long-lived radioactive spent fuel is the primary environmental engineering challenge.`
          : `**1. Mass-Energy Equivalence & Binding Energy**:
• According to Einstein's mass-energy equation:
  $$E = \\Delta m \\cdot c^2$$
  where $\\Delta m$ is the mass defect (difference between separated nucleons and bound nucleus mass) and $c = 3 \\times 10^8\\text{ m/s}$.
• Binding energy per nucleon peaks near Iron-56 (\${}^{56}\\text{Fe}), making fission of heavy nuclei ($A > 200$) and fusion of light nuclei ($A < 20$) energetically favorable.

**2. Induced Fission Chain Reaction**:
• When a thermal neutron is absorbed by Uranium-235:
  $$\${}^{235}_{\\ 92}\\text{U} + {}^1_0n \\longrightarrow {}^{141}_{\\ 56}\\text{Ba} + {}^{92}_{36}\\text{Kr} + 3\\,{}^1_0n + 200\\text{ MeV}$$
• The 3 released neutrons can trigger successive fissions, creating a self-sustaining **nuclear chain reaction**.

**3. Reactor Engineering & Control Mechanisms**:
• **Moderator** (Heavy water, Graphite): Slows down fast fission neutrons to thermal speeds.
• **Control Rods** (Cadmium, Boron): Absorb excess neutrons to maintain criticality ($k = 1.0$).
• **Coolant**: Transfers nuclear heat to steam turbines to generate electricity.`,
        summary: isMS
          ? "Nuclear energy releases enormous heat via heavy nucleus fission or light nucleus fusion, converting tiny mass defects into electrical power without carbon emissions."
          : "Nuclear fission of U-235 releases ~200 MeV via mass defect E = mc², regulated by control rods and moderators in critical power reactors.",
        coreAnalogy: isMS
          ? "Think of nuclear energy like a tightly coiled steel spring inside a toy clock: releasing the latch uncoils massive stored mechanical force instantly."
          : "Think of mass defect like paying a small fee at a currency exchange: the tiny missing mass is converted at exchange rate c² into massive energy output.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often confuse nuclear fission (splitting) with nuclear fusion (combining). Fission splits heavy uranium; fusion joins light hydrogen."
          : "Confusing the functions of moderators and control rods: moderators slow neutrons down; control rods absorb neutrons to stop or slow the reaction rate.",
        verificationProblem: isMS
          ? "Name the reaction that powers the Sun: Fission or Fusion? (Answer: Nuclear Fusion of hydrogen into helium)."
          : "If 1 milligram of mass defect is converted in a nuclear reaction, calculate the energy released using E = mc². (Answer: E = 10⁻⁶ kg × (3 × 10⁸)² = 9 × 10¹⁰ Joules).",
        diagramType: 'reaction_energy',
        workedExample: {
          problem: "Calculate the energy released when a mass defect of Δm = 3.5 × 10⁻²⁸ kg occurs during an individual nuclear fission event.",
          steps: [
            "Step 1: Use Einstein's mass-energy equation: E = Δm · c².",
            "Step 2: Substitute c = 3 × 10⁸ m/s: E = (3.5 × 10⁻²⁸) × (9 × 10¹⁶).",
            "Step 3: Multiply: E = 3.15 × 10⁻¹¹ Joules (approximately 197 MeV)."
          ],
          result: "Energy released = 3.15 × 10⁻¹¹ Joules (~197 MeV) per fission event."
        },
        realWorldUse: "Commercial baseload nuclear power generation, medical radioisotope synthesis (Technetium-99m), deep-space radioisotope thermoelectric generators (RTGs), and tokamak fusion research (ITER).",
        practiceQuiz: [
          {
            question: "In a commercial nuclear reactor, what is the primary function of control rods made of boron or cadmium?",
            options: [
              "To absorb excess neutrons and regulate the chain reaction rate",
              "To slow down fast neutrons into thermal neutrons",
              "To act as high-pressure coolant fluid",
              "To supply initial fissionable uranium fuel"
            ],
            answerIndex: 0,
            explanation: "Boron and cadmium have large neutron capture cross-sections, absorbing neutrons to control or shut down the chain reaction."
          }
        ]
      };
    }
  },

  // 3. Kinematics, Velocity, Acceleration & Motion Graphs
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      !text.includes('WORK') &&
      !text.includes('KINETIC') &&
      !text.includes('POTENTIAL') &&
      !text.includes('SOUND') &&
      !text.includes('ACOUSTIC') &&
      !text.includes('WAVE') &&
      !text.includes('PENDULUM') &&
      !text.includes('ECHO') &&
      !text.includes('SONAR') &&
      (text.includes('KINEMAT') || text.includes('MOTION') || text.includes('VELOCITY') || text.includes('ACCEL') || text.includes('SPEED') || text.includes('DISPLACEMENT')),
    diagramType: 'motion_graph',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} \\quad | \\quad \\text{Average Speed} = \\frac{\\text{Total Distance}}{\\text{Total Time}} \\quad | \\quad \\text{Distance-Time Slope} = \\text{Speed}$"
        : "v = u + at \\quad | \\quad s = ut + \\frac{1}{2}at^2 \\quad | \\quad v^2 = u^2 + 2as \\quad | \\quad \\text{Area under } v\\text{-}t = s";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Motion & Measurement",
        cueQuestions: isMS
          ? [
              "Define speed and state its standard SI unit.",
              "Distinguish between uniform and non-uniform motion with everyday examples.",
              "How does a distance-time graph show whether an object is resting or moving steadily?",
              "Describe how a simple pendulum demonstrates periodic motion."
            ]
          : [
              "How do scalar speed and vector velocity fundamentally differ?",
              "Derive the three kinematic equations of uniformly accelerated motion.",
              "What do the slope and area of a velocity-time graph represent physically?",
              "Under what physical conditions do the standard kinematic formulas apply?"
            ],
        mainNotes: isMS
          ? `**1. Speed & Motion**:
• **Speed**: Distance covered by an object per unit time:
  $$\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}}$$
• **Units**: Standard SI unit is meters per second (m/s); commonly measured in kilometers per hour (km/h). Conversion: $1\\text{ km/h} = \\frac{5}{18}\\text{ m/s}$.
• **Average Speed**: Total distance traveled divided by total time taken.

**2. Uniform vs Non-Uniform Motion**:
• **Uniform Motion**: An object moving along a straight path covers equal distances in equal intervals of time.
• **Non-Uniform Motion**: An object covers unequal distances in equal intervals of time (speed fluctuates).

**3. Distance-Time Graphs**:
• A straight diagonal line indicates **uniform constant speed**.
• A horizontal line parallel to the time axis indicates the object is **stationary (at rest)**.
• The steeper the line, the greater the speed of the object.

**4. Periodic Motion & Simple Pendulum**:
• A simple pendulum consists of a small metallic bob suspended by a thread from a rigid stand.
• The back-and-forth motion is an example of **periodic or oscillatory motion**.
• The time taken for one complete oscillation is its **time period $T$**.`
          : `**1. Kinematic Vector Foundations**:
• **Displacement (s)**: Shortest straight-line directed distance between initial and final points.
• **Velocity (v)**: Rate of change of displacement ($v = \\Delta s / \\Delta t$).
• **Acceleration (a)**: Rate of change of velocity ($a = (v - u)/t$).

**2. Three Fundamental Equations of Uniform Acceleration**:
1. $v = u + at$
2. $s = ut + \\frac{1}{2}at^2$
3. $v^2 = u^2 + 2as$

**3. Graphical Motion Analysis**:
• Slope of Displacement-Time Graph = Velocity.
• Slope of Velocity-Time Graph = Acceleration.
• Area under Velocity-Time Graph = Total Displacement.`,
        summary: isMS
          ? "Speed equals distance divided by time. Distance-time graph slope indicates speed; horizontal line shows zero motion."
          : "Kinematics models linear motion through continuous relationships linking displacement, velocity, and uniform acceleration.",
        coreAnalogy: isMS
          ? "Think of speed like your bicycle pedaling rate: pedaling at a steady beat covers equal sidewalk squares each second (uniform motion)."
          : "Think of velocity like speedometer reading with compass heading; acceleration is how firmly you press the pedal.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often assume a horizontal flat line on a distance-time graph means moving at steady speed. In a distance-time graph, a flat horizontal line means the object has completely stopped."
          : "Applying uniform acceleration equations (v = u + at) to non-uniform acceleration problems.",
        verificationProblem: isMS
          ? "A cyclist travels 150 meters in 30 seconds. Find speed. (Answer: 150 / 30 = 5 m/s)."
          : "Car accelerates from rest at 3 m/s² for 6 s. Find v and s. (Answer: v = 18 m/s, s = 0.5 × 3 × 36 = 54 m).",
        diagramType: 'motion_graph',
        workedExample: {
          problem: isMS
            ? "A train travels 240 kilometers in 4 hours. Calculate its average speed in km/h and convert to m/s."
            : "A train braking at -0.5 m/s² from 72 km/h stops. Calculate stopping distance.",
          steps: isMS
            ? [
                "Step 1: Apply average speed formula: Speed = Total Distance / Total Time.",
                "Step 2: Compute in km/h: Speed = 240 km / 4 h = 60 km/h.",
                "Step 3: Convert to SI unit m/s: Multiply by 5/18: 60 × (5/18) = 300 / 18 = 16.67 m/s."
              ]
            : [
                "Step 1: Convert u = 72 km/h = 20 m/s; final v = 0, a = -0.5 m/s².",
                "Step 2: Apply v² = u² + 2as ➔ 0 = 400 + 2(-0.5)s.",
                "Step 3: Solve for s: s = 400 meters."
              ],
          result: isMS ? "Average speed = 60 km/h (16.67 m/s)." : "Stopping distance s = 400 m."
        },
        realWorldUse: "Rail transport scheduling, automobile cruise control, GPS transit tracking, and traffic speed cameras.",
        practiceQuiz: [
          {
            question: isMS ? "What does a horizontal flat line on a distance-time graph represent?" : "What physical quantity is evaluated by the area under a velocity-time graph?",
            options: isMS
              ? ["The object is stationary at rest", "The object is accelerating rapidly", "The object is moving at constant speed", "The object is traveling in reverse"]
              : ["Displacement", "Acceleration", "Momentum", "Power"],
            answerIndex: 0,
            explanation: isMS
              ? "On a distance-time graph, a horizontal line shows time passing with zero change in distance, meaning the object is resting."
              : "Area under v-t graph evaluates displacement."
          }
        ]
      };
    }
  },

  // 4. Forces, Dynamics & Newton's Laws of Motion
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      (text.includes('NEWTON') || text.includes('FORCE') || text.includes('MOMENTUM') || text.includes('DYNAMICS') || text.includes('FRICTION') || text.includes('PRESSURE') || text.includes('INERTIA')),
    diagramType: 'physics_vector',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Force} = \\text{Push or Pull} \\quad | \\quad \\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}} \\quad | \\quad 1\\text{ Pascal (Pa)} = 1\\text{ N/m}^2$"
        : "\\vec{F}_{\\text{net}} = m\\vec{a} \\quad | \\quad \\vec{p} = m\\vec{v} \\quad | \\quad \\vec{F}_{AB} = -\\vec{F}_{BA} \\quad | \\quad \\Delta \\vec{p} = 0";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Forces & Pressure",
        cueQuestions: isMS
          ? [
              "Define force and list three observable changes a force can produce on an object.",
              "Distinguish between contact forces (muscular, friction) and non-contact forces (gravity, magnetic).",
              "Define pressure and explain why cutting knives must have sharp, thin edges.",
              "What is atmospheric pressure and why does fluid pressure increase with depth?"
            ]
          : [
              "How does Newton's 1st Law define inertial reference frames?",
              "Derive F = ma from the time rate of change of linear momentum.",
              "Why do Newton's 3rd Law action-reaction pairs never cancel each other out?",
              "State the Law of Conservation of Linear Momentum in closed systems."
            ],
        mainNotes: isMS
          ? `**1. Force — A Push or Pull**:
• A force arises from an interaction between two objects.
• Forces can change an object's speed, change its direction of motion, or alter its shape.
• Forces acting in the same direction add together ($F_{\\text{net}} = F_1 + F_2$); forces in opposite directions subtract ($F_{\\text{net}} = F_1 - F_2$).

**2. Contact vs Non-Contact Forces**:
• **Contact Forces**: Require physical contact (e.g. muscular force, frictional force opposing motion).
• **Non-Contact Forces**: Act across distances without physical contact (e.g. gravitational attraction, magnetic attraction/repulsion, electrostatic force).

**3. Pressure and Contact Area**:
• Pressure is the force acting perpendicularly on a unit surface area:
  $$\\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}}$$
• SI unit: **Pascal (Pa)** ($1\\text{ Pa} = 1\\text{ N/m}^2$).
• Reducing surface area increases pressure (sharp needle, knife edge). Increasing area reduces pressure (broad truck tires, snowshoes).

**4. Atmospheric & Liquid Pressure**:
• Liquids exert pressure on container walls and at the bottom; pressure increases with depth.
• Earth's envelope of air exerts atmospheric pressure on all surfaces.`
          : `**1. Newton's Three Laws of Motion**:
• **1st Law**: A body continues in its state of rest or uniform motion unless acted on by net external force ($\\sum \\vec{F} = 0 \\implies \\vec{v} = \\text{const}$).
• **2nd Law**: Net force equals rate of momentum change: $\\vec{F}_{\\text{net}} = \\frac{\\Delta \\vec{p}}{\\Delta t} = m\\vec{a}$.
• **3rd Law**: Action and reaction are equal and opposite: $\\vec{F}_{AB} = -\\vec{F}_{BA}$.

**2. Conservation of Linear Momentum**:
In an isolated system devoid of external unbalanced forces:
$$m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2$$`,
        summary: isMS
          ? "Force is a push or pull; pressure equals force divided by area. Smaller area creates larger pressure."
          : "Net force dictates momentum change (F = ma); action-reaction pairs act on separate interacting bodies.",
        coreAnalogy: isMS
          ? "Think of pressure like walking on soft snow: high heels sink deep because body weight presses on tiny points, while broad snowshoes distribute weight across a wide area to float on top."
          : "Think of jumping from a small boat: stepping forward pushes you, but kicks the boat backward with equal momentum.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often confuse force (Newtons) with pressure (Pascals). Force is total push/pull; pressure is how concentrated that force is over an area."
          : "Claiming action and reaction cancel out. They act on TWO DIFFERENT bodies and cannot cancel.",
        verificationProblem: isMS
          ? "A force of 300 N presses on an area of 0.05 m². What is the pressure? (Answer: 300 / 0.05 = 6000 Pa)."
          : "A 1200 kg car accelerates at 2.5 m/s². Find net force. (Answer: 1200 × 2.5 = 3000 N).",
        diagramType: 'physics_vector',
        workedExample: {
          problem: isMS
            ? "Calculate the pressure exerted on a floor by a wooden block weighing 180 N with base dimensions 0.3 m by 0.2 m."
            : "A 20 g bullet is fired at 150 m/s from a 2 kg rifle. Find rifle recoil velocity.",
          steps: isMS
            ? [
                "Step 1: Calculate base contact area: Area = 0.3 m × 0.2 m = 0.06 m².",
                "Step 2: Identify downward weight force: Force = 180 N.",
                "Step 3: Apply pressure formula: Pressure = Force / Area = 180 / 0.06.",
                "Step 4: Compute result: Pressure = 3000 N/m² = 3000 Pa."
              ]
            : [
                "Step 1: Total initial momentum = 0.",
                "Step 2: m_b v_b + M_r V_r = 0 ➔ (0.02 × 150) + 2.0 V_r = 0.",
                "Step 3: 3.0 + 2.0 V_r = 0 ➔ V_r = -1.5 m/s."
              ],
          result: isMS ? "Exerted pressure = 3000 Pa." : "Recoil velocity = -1.5 m/s."
        },
        realWorldUse: "Hydraulic brakes, structural building foundations, snowshoes, bulletproof armor, and rocket propulsion.",
        practiceQuiz: [
          {
            question: isMS ? "Why do army tanks run on broad continuous caterpillar tracks rather than standard wheels?" : "Why do action and reaction forces never produce equilibrium on a single body?",
            options: isMS
              ? [
                  "The broad track area drastically reduces pressure on the ground to prevent sinking into mud",
                  "It increases the mass of the tank",
                  "It eliminates gravitational force completely",
                  "It makes the tank move faster than sports cars"
                ]
              : [
                  "Because they act simultaneously on two different bodies",
                  "Because action force is slightly greater",
                  "Because reaction occurs with a delay",
                  "Because they act in the same direction"
                ],
            answerIndex: 0,
            explanation: isMS
              ? "From Pressure = Force / Area: a massive contact area spreads out the heavy tank's weight, keeping ground pressure low."
              : "Equilibrium requires net force on a single body to be zero; action and reaction act on two separate bodies."
          }
        ]
      };
    }
  },

  // 5. Electricity, Circuits & Ohm's Law
  {
    matcher: (text, subj) =>
      (subj.includes('PHYS') || subj.includes('SCI')) &&
      (text.includes('CIRCUIT') || text.includes('ELECTRIC') || text.includes('OHM') || text.includes('RESIST') || text.includes('VOLT') || text.includes('CURRENT') || text.includes('JOULE') || text.includes('SOLENOID') || text.includes('ELECTROMAG')),
    diagramType: 'circuit_diagram',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Circuit Invariant: Complete Unbroken Loop } \\implies \\text{Current Flow} \\quad | \\quad \\text{Conductors vs Insulators}$"
        : "V = I \\times R \\quad | \\quad R = \\rho \\frac{L}{A} \\quad | \\quad R_{\\text{series}} = \\sum R_i \\quad | \\quad \\frac{1}{R_{\\text{parallel}}} = \\sum \\frac{1}{R_i}";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Electricity & Circuits",
        cueQuestions: isMS
          ? [
              "What are the essential components of a simple circuit and their standard symbols?",
              "Distinguish between a closed circuit and an open circuit.",
              "How do electrical conductors differ from insulators?",
              "How does a safety fuse prevent electrical fires?"
            ]
          : [
              "State Ohm's Law and its mathematical formula.",
              "Derive equivalent resistance for series and parallel networks.",
              "State Joule's Law of Heating (H = I²Rt).",
              "What factors determine the electrical resistance of a conductor?"
            ],
        mainNotes: isMS
          ? `**1. Electric Circuit Loop**:
• An electric circuit provides a complete, unbroken closed loop path for electric current to flow from the positive terminal to the negative terminal of a power source.
• **Open Circuit**: If there is a break or open switch anywhere in the path, current stops completely and bulbs do not light.

**2. Key Circuit Components & Symbols**:
• **Electric Cell**: Source of electrical energy; drawn with a long thin line (+) and short thick line (-).
• **Switch**: Mechanism to easily complete (close) or break (open) the circuit.
• **Bulb**: Contains a thin filament that glows when electric current heats it.

**3. Conductors vs Insulators**:
• **Conductors**: Permit electricity to flow freely (copper, aluminum, iron, graphite).
• **Insulators**: Resist electricity flow (rubber, plastic, dry wood, glass).

**4. Heating and Magnetic Effects**:
• **Heating Effect**: Current passing through high-resistance wires creates heat (toasters, irons). A **safety fuse** melts to break circuits during overloads.
• **Magnetic Effect**: Current-carrying wires create a magnetic field, forming an **electromagnet**.`
          : `**1. Fundamental Quantities**:
• Current: $I = Q / t$ (Amperes).
• Potential Difference: $V = W / Q$ (Volts).

**2. Ohm's Law & Resistance**:
At constant temperature: $V = I \\times R$.
Resistance depends on dimensions: $R = \\rho \\frac{L}{A}$.

**3. Combinations**:
• Series: $R_{\\text{eq}} = R_1 + R_2 + \\dots$
• Parallel: $1/R_{\\text{eq}} = 1/R_1 + 1/R_2 + \\dots$

**4. Joule Heating**:
$H = I^2 R t = V I t$.`,
        summary: isMS
          ? "Electric current flows through complete closed circuits. Conductors allow flow; insulators block it. Safety fuses protect circuits from overload."
          : "Current equals voltage divided by resistance (V = IR); series sums resistance while parallel minimizes equivalent resistance.",
        coreAnalogy: isMS
          ? "Think of an electric circuit like a closed water racetrack: the battery is the water pump, wires are pipes, the switch is a valve, and the bulb is a waterwheel."
          : "Voltage is water pressure, current is water flow rate, and resistance is pipe constriction.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often draw electric cells with two equal-length lines. The positive terminal must be a long thin line and the negative terminal a short thick line."
          : "Forgetting to invert parallel resistance (recording 1/R instead of R).",
        verificationProblem: isMS
          ? "Does a bulb glow if the switch in the circuit is in the open (OFF) position? (Answer: No, because opening the switch breaks the complete loop)."
          : "Find equivalent resistance of two 10 Ω resistors in parallel. (Answer: 10 / 2 = 5 Ω).",
        diagramType: 'circuit_diagram',
        workedExample: {
          problem: isMS
            ? "Explain why copper wires are wrapped in plastic coating in household wiring."
            : "A 12 V battery connects across 4 Ω and 12 Ω parallel resistors. Find total current.",
          steps: isMS
            ? [
                "Step 1: Copper is an excellent electrical conductor that carries electric current efficiently.",
                "Step 2: Plastic is a strong electrical insulator that prevents current from escaping.",
                "Step 3: The plastic outer layer prevents accidental electric shocks and short circuits."
              ]
            : [
                "Step 1: 1/R_eq = 1/4 + 1/12 = 4/12 = 1/3 ➔ R_eq = 3 Ω.",
                "Step 2: Total current I = V / R_eq = 12 / 3 = 4 Amperes."
              ],
          result: isMS ? "Plastic insulates the conductive copper to ensure electrical safety." : "Total current I = 4.0 A."
        },
        realWorldUse: "Residential lighting, microchip circuits, electric vehicles, and renewable power grids.",
        practiceQuiz: [
          {
            question: isMS ? "Which of the following materials is an electrical insulator?" : "What happens to equivalent resistance when additional resistors are added in parallel?",
            options: isMS
              ? ["Rubber glove", "Copper nail", "Iron rod", "Aluminum foil"]
              : ["Total equivalent resistance decreases", "Total equivalent resistance increases", "Total equivalent resistance stays identical", "Voltage becomes zero"],
            answerIndex: 0,
            explanation: isMS
              ? "Rubber has tightly bound electrons and blocks the flow of electric current, making it an insulator."
              : "Adding parallel branches provides more pathways for current, reducing equivalent resistance."
          }
        ]
      };
    }
  },

  // =========================================================================
  // MATHEMATICS BLUEPRINTS (GRADE LOCKED)
  // =========================================================================

  // 6A. Integers & Discrete Signed Vectors (Middle School / Class 6 & 7)
  {
    matcher: (text, subj, grade) =>
      subj.includes('MATH') &&
      grade <= 7 &&
      !text.includes('LINEQ') &&
      !text.includes('LINEAR') &&
      !text.includes('EQUATION') &&
      !text.includes('RATIONAL') &&
      !text.includes('REAL NUM') &&
      !text.includes('IRRATIONAL') &&
      !text.includes('CONTINUUM') &&
      !text.includes('SURD') &&
      !text.includes('DATA') &&
      !text.includes('TALLY') &&
      !text.includes('FREQUENCY') &&
      !text.includes('STAT') &&
      !text.includes('PROB') &&
      (text.includes('INTEGER') || /\bINT\b/.test(text) || text.includes('NEGATIVE NUMBER') || (text.includes('NUMBER') && !text.includes('TRIANGLE') && !text.includes('QUAD')) || text.includes('DIVISIB') || text.includes('PRIME')),
    diagramType: 'number_line',
    generate: (concept, boardId) => ({
      conceptId: concept.id,
      gradeLevel: concept.gradeLevel,
      gradeTier: 'MIDDLE_SCHOOL',
      title: concept.title || "Number Systems: Integers & The Number Line",
      cueQuestions: [
        "How does the number line represent positive and negative integers as directional positions?",
        "State the arithmetic sign rules for adding and subtracting signed numbers: a - b = a + (-b).",
        "State the multiplication and division sign rules for signed numbers.",
        "What is the additive inverse of an integer, and why is zero its own additive inverse?"
      ],
      mainNotes: `**1. The Integer Number Line**:
• Integers include all positive whole numbers, zero, and negative whole numbers:
  $$\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\}$$
• Positive integers lie to the right of origin zero; negative integers lie to the left.
• Moving right represents addition (+); moving left represents subtraction (-).

**2. Addition and Subtraction Rules**:
• Subtracting an integer is identical to adding its opposite (additive inverse):
  $$a - b = a + (-b)$$
• Adding two integers with the same sign: add their magnitudes and retain the sign: $(-5) + (-3) = -8$.
• Adding two integers with different signs: subtract the smaller magnitude from the larger and take the sign of the larger: $(-8) + 12 = +4$.

**3. Multiplication and Division Sign Conventions**:
• $(+) \\times (+) = (+)$
• $(-) \\times (-) = (+)$
• $(+) \\times (-) = (-)$
• $(-) \\times (+) = (-)$

**4. Absolute Value**:
• The absolute value $|x|$ represents the non-negative distance of number $x$ from zero on the number line.`,
      summary: "Integers extend whole numbers to include negative values, modeled on the number line where subtraction corresponds to adding the additive inverse.",
      coreAnalogy: "Think of integers like an elevator in a building: the ground floor is zero, upper floors are positive numbers (+1, +2, +3), and underground basement parking levels are negative numbers (-1, -2, -3).",
      structuralRule: "a - b = a + (-b) \\quad | \\quad (-a) \\times (-b) = +(ab) \\quad | \\quad |x| = \\text{Distance from Origin } 0",
      curriculumTrap: "Students frequently stumble on double negatives: subtracting a negative number is equivalent to adding a positive number: 7 - (-3) = 7 + 3 = 10.",
      verificationProblem: "Evaluate: (-12) - (-20) + (-5). (Answer: -12 + 20 - 5 = 8 - 5 = 3).",
      diagramType: 'number_line',
      workedExample: {
        problem: "Evaluate the arithmetic expression under standard procedural steps: (-6) × (-4) - (-18) ÷ (+3).",
        steps: [
          "Step 1: Multiply the two negative integers: (-6) × (-4) = +24.",
          "Step 2: Divide the signed integers: (-18) ÷ (+3) = -6.",
          "Step 3: Subtract: (+24) - (-6) = 24 + 6 = 30."
        ],
        result: "Evaluated result = 30."
      },
      realWorldUse: "Thermometer temperature scales, bank credit and debit statements, elevation altitude maps, and game scoring.",
      practiceQuiz: [
        {
          question: "What is the result of evaluating (-15) - (-8)?",
          options: ["-7", "-23", "+7", "+23"],
          answerIndex: 0,
          explanation: "Subtracting negative 8 is adding positive 8: -15 - (-8) = -15 + 8 = -7."
        },
        {
          question: "What is the additive inverse of -42?",
          options: ["+42", "-42", "0", "1"],
          answerIndex: 0,
          explanation: "The additive inverse of any number a is -a, because a + (-a) = 0. The additive inverse of -42 is +42."
        }
      ]
    })
  },

  // 6B. Real Number Continuum: Rational & Irrational Numbers (Class 8 vs 9 & 10)
  {
    matcher: (text, subj, grade) =>
      subj.includes('MATH') &&
      !text.includes('LINEQ') &&
      !text.includes('LINEAR') &&
      !text.includes('EQUATION') &&
      !text.includes('FRACTIONS AND DECIMALS') &&
      !text.includes('FRACTION AND DECIMAL') &&
      (text.includes('RATIONAL') || text.includes('REAL NUM') || text.includes('IRRATIONAL') || text.includes('CONTINUUM') || text.includes('SURD') || text.includes('RADICAL') || text.includes('NUMSYS')),
    diagramType: 'real_continuum',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);

      if (isMS) {
        // Grade 8 Rational Numbers
        return {
          conceptId: concept.id,
          gradeLevel: concept.gradeLevel,
          gradeTier: 'MIDDLE_SCHOOL',
          title: concept.title || "Rational Numbers & Operations",
          cueQuestions: [
            "State the definition of a rational number and explain why the denominator q ≠ 0.",
            "Explain how to find multiple rational numbers between any two given rational numbers.",
            "State the properties of rational numbers under addition and multiplication (closure, commutativity, associativity).",
            "What are the additive identity (0) and multiplicative identity (1) for rational numbers?"
          ],
          mainNotes: `**1. Definition of Rational Numbers**:
• Any number that can be expressed in the form $\\frac{p}{q}$, where $p$ and $q$ are integers and $q \\neq 0$.
• Examples: $\\frac{3}{5}, -\\frac{7}{2}, 0 = \\frac{0}{1}, 4 = \\frac{4}{1}$.

**2. Arithmetic Operations**:
• **Addition & Subtraction**: Find a common denominator:
  $$\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd}$$
• **Multiplication**: Multiply numerators and denominators: $\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}$.
• **Division**: Multiply by the reciprocal (multiplicative inverse): $\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}$.

**3. Density of Rational Numbers**:
• Between any two distinct rational numbers, there exist infinitely many rational numbers.
• They can be found by scaling common denominators or taking the mean $\\frac{x + y}{2}$.`,
          summary: "Rational numbers are numbers expressible as fractional quotients p/q (q ≠ 0), featuring closure under standard arithmetic and infinite density between any two values.",
          coreAnalogy: "Think of rational numbers like slicing a pizza: 3/4 represents taking 3 equal slices from a pizza cut into 4 slices. Even between two close fractions like 1/2 and 2/3, you can always slice finer to find infinitely many fractions in between.",
          structuralRule: "\\frac{a}{b} \\pm \\frac{c}{d} = \\frac{ad \\pm bc}{bd} \\quad | \\quad x = \\frac{p}{q} \; (q \\neq 0) \\quad | \\quad \\text{Mean: } \\frac{a + b}{2}",
          curriculumTrap: "A frequent error is claiming that zero (0) is not a rational number. Zero is a rational number because it can be written as 0/1, where 0 and 1 are integers and the denominator 1 ≠ 0.",
          verificationProblem: "Find a rational number between 1/3 and 1/2. (Answer: Mean = (1/3 + 1/2)/2 = (5/6)/2 = 5/12).",
          diagramType: 'real_continuum',
          workedExample: {
            problem: "Find three rational numbers between 2/5 and 3/4.",
            steps: [
              "Step 1: Find LCM of denominators 5 and 4: LCM = 20.",
              "Step 2: Convert to equivalent fractions: 2/5 = 8/20 and 3/4 = 15/20.",
              "Step 3: Identify intermediate integers between 8 and 15: 9, 10, 11.",
              "Step 4: Form the rational numbers: 9/20, 10/20 (1/2), and 11/20."
            ],
            result: "Three rational numbers are 9/20, 1/2, and 11/20."
          },
          realWorldUse: "Proportional recipe measurements, architectural scale blueprints, financial interest calculations, and statistics.",
          practiceQuiz: [
            {
              question: "Which of the following is the multiplicative inverse (reciprocal) of -5/7?",
              options: ["-7/5", "+5/7", "+7/5", "-1"],
              answerIndex: 0,
              explanation: "The multiplicative inverse of a fraction p/q is q/p because (p/q) × (q/p) = 1. Reciprocal of -5/7 is -7/5."
            }
          ]
        };
      }

      // Secondary (Class 9 & 10 Real Numbers)
      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: 'SECONDARY',
        title: concept.title || "Real Numbers: Rational & Irrational Continuum",
        cueQuestions: [
          "State the formal definition of Rational Numbers (ℚ) and explain why q ≠ 0 is mandatory.",
          "Prove that the decimal expansion of every rational number is either terminating or non-terminating repeating.",
          "How does the Real Number system union rational and irrational sets (ℝ = ℚ ∪ (ℝ \ ℚ))?",
          "Explain the algebraic mechanism of rationalizing the denominator using conjugate surds."
        ],
        mainNotes: `**1. Real Number System Hierarchy**:
$$\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$$
• **Rational Numbers (\\mathbb{Q})**: $\{ \\frac{p}{q} \\mid p, q \\in \\mathbb{Z}, q \\neq 0, \\gcd(p, q) = 1 \}$.
• **Irrational Numbers (\\mathbb{R} \setminus \\mathbb{Q})**: Non-terminating, non-repeating decimals (e.g. $\\sqrt{2}, \\sqrt{3}, \\pi$) that cannot be expressed as a ratio of integers.
• **Real Numbers (\\mathbb{R})**: Complete union of rational and irrational numbers.

**2. Decimal Expansions & Terminating Condition**:
• A fraction $\\frac{p}{q}$ in lowest terms terminates **if and only if** prime factors of $q$ are solely of form $2^n \\cdot 5^m$ ($n, m \\in \\mathbb{W}$).

**3. Radical Operations & Conjugate Denominator Rationalization**:
$$\\frac{1}{\\sqrt{a} \\pm \\sqrt{b}} = \\frac{\\sqrt{a} \\mp \\sqrt{b}}{a - b}$$`,
        summary: "The Real Number system forms a continuous 1D geometric continuum combining dense rational fractions and non-repeating irrational surds.",
        coreAnalogy: "Think of the real number line like a continuous measuring tape: rational fractions pack infinitely dense marks, while irrational numbers fill every gap coordinate to form an unbroken continuum.",
        structuralRule: "\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R} \\quad | \\quad x = \\frac{p}{q} \; (q \\neq 0) \\quad | \\quad \\frac{1}{\\sqrt{a} \\pm \\sqrt{b}} = \\frac{\\sqrt{a} \\mp \\sqrt{b}}{a - b}",
        curriculumTrap: "Stating that π is rational because π ≈ 22/7. 22/7 is merely an approximation; true π is transcendental and irrational.",
        verificationProblem: "Rationalize denominator of 1 / (√5 - √2). (Answer: (√5 + √2) / 3).",
        diagramType: 'real_continuum',
        workedExample: {
          problem: "Express repeating decimal x = 0.2333... in lowest rational form p/q under standard curriculum procedures.",
          steps: [
            "Step 1: Let x = 0.2333... ➔ 10x = 2.333...",
            "Step 2: Multiply by 10 again: 100x = 23.333...",
            "Step 3: Subtract: 100x - 10x = 23.333... - 2.333... ➔ 90x = 21.",
            "Step 4: x = 21/90 = 7/30."
          ],
          result: "Lowest rational form = 7/30."
        },
        realWorldUse: "CPU floating-point arithmetic (IEEE 754), GPS coordinate triangulation, and signal processing.",
        practiceQuiz: [
          {
            question: "Which condition is necessary and sufficient for fraction p/q to have a terminating decimal?",
            options: [
              "Prime factorization of denominator q consists solely of 2 and/or 5",
              "Denominator must be an odd integer",
              "Numerator must be greater than denominator",
              "Denominator must be prime"
            ],
            answerIndex: 0,
            explanation: "Base-10 factors into 2 and 5; therefore, only denominators with factors 2^n · 5^m produce terminating decimals."
          }
        ]
      };
    }
  },

  // 7. Linear Equations (Class 6-8 in One Variable vs Class 9-10 in Two Variables)
  {
    matcher: (text, subj) =>
      subj.includes('MATH') &&
      (text.includes('LINEQ') || text.includes('LINEAR') || (text.includes('EQUATION') && !text.includes('CHEM')) || text.includes('VARIABLE') || text.includes('COORDINATE') || text.includes('SLOPE') || text.includes('INTERCEPT')),
    diagramType: 'coordinate_grid',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);

      if (isMS) {
        return {
          conceptId: concept.id,
          gradeLevel: concept.gradeLevel,
          gradeTier: 'MIDDLE_SCHOOL',
          title: concept.title || "Linear Equations in One Variable",
          cueQuestions: [
            "What is a variable, a term, and an algebraic expression?",
            "Explain the balance scale method for solving simple linear equations.",
            "How does the transposition method work when moving terms across the equals sign?",
            "How do you verify your calculated solution by checking LHS and RHS?"
          ],
          mainNotes: `**1. Linear Equations in One Variable**:
• An algebraic equation where the highest exponent of the unknown variable is 1:
  $$ax + b = c \\quad (a \\neq 0)$$
• The specific value of $x$ that makes $\\text{LHS} = \\text{RHS}$ is called the **solution or root**.

**2. The Balance Scale Principle**:
• Whatever arithmetic operation is applied to the Left Hand Side (LHS) must also be applied identically to the Right Hand Side (RHS) to maintain equality.
• Adding or subtracting the same number from both sides preserves balance.
• Multiplying or dividing both sides by the same non-zero number preserves balance.

**3. The Transposition Method**:
• Moving a term to the opposite side reverses its operation:
  - $(+)$ transposes to $(-)$
  - $(-)$ transposes to $(+)$
  - $(\\times)$ transposes to $(\\div)$
  - $(\\div)$ transposes to $(\\times)$

**4. Verification Step**:
• Always substitute the calculated solution back into the original equation to verify that $\\text{LHS} \\equiv \\text{RHS}$.`,
          summary: "Linear equations in one variable represent balance relations solved systematically by applying inverse operations to isolate the unknown variable.",
          coreAnalogy: "Think of a linear equation like a balanced set of two-pan kitchen scales: whatever weight you add, remove, double, or halve on one pan must be done identically to the other pan to keep the pointer centered.",
          structuralRule: "ax + b = c \\iff ax = c - b \\iff x = \\frac{c - b}{a} \\quad | \\quad \\text{LHS} \\equiv \\text{RHS}",
          curriculumTrap: "The most frequent error is sign forgetting during transposition: moving +5 across the equals sign becomes -5, not +5. Always check your solution by substituting the value back into the original LHS and RHS.",
          verificationProblem: "Solve: 3x - 7 = 14. (Answer: 3x = 14 + 7 = 21 ➔ x = 21 / 3 = 7. Check: 3(7) - 7 = 21 - 7 = 14. Correct!).",
          diagramType: 'coordinate_grid',
          workedExample: {
            problem: "Solve the linear equation: 5(x - 2) + 3 = 2x + 11 under standard curriculum procedural steps.",
            steps: [
              "Step 1: Expand the parentheses on LHS: 5x - 10 + 3 = 2x + 11 ➔ 5x - 7 = 2x + 11.",
              "Step 2: Transpose variable terms to LHS: 5x - 2x - 7 = 11 ➔ 3x - 7 = 11.",
              "Step 3: Transpose constant term to RHS: 3x = 11 + 7 ➔ 3x = 18.",
              "Step 4: Divide by coefficient of x: x = 18 / 3 = 6.",
              "Step 5: Check solution: LHS = 5(6-2) + 3 = 23; RHS = 2(6) + 11 = 23. LHS = RHS."
            ],
            result: "Solution: x = 6."
          },
          realWorldUse: "Budget calculation, finding unknown prices, distance-speed-time planning, and recipe scaling.",
          practiceQuiz: [
            {
              question: "If 4x + 9 = 25, what is the value of x?",
              options: ["4", "5", "6", "3.5"],
              answerIndex: 0,
              explanation: "4x = 25 - 9 = 16 ➔ x = 16 / 4 = 4."
            },
            {
              question: "When transposing a term multiplied by a variable to the opposite side of an equation, what operation does it become?",
              options: ["Division", "Addition", "Subtraction", "Multiplication"],
              answerIndex: 0,
              explanation: "Multiplication transposes as division: ax = b ➔ x = b / a."
            }
          ]
        };
      }

      // Secondary (Class 9 & 10 Linear Equations in Two Variables)
      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: 'SECONDARY',
        title: concept.title || "Linear Equations in Two Variables & Coordinate Graphs",
        cueQuestions: [
          "State the general standard form of a linear equation in two variables.",
          "How many solutions does a single linear equation in two variables possess geometrically?",
          "State the condition for a pair of linear equations to have infinitely many solutions.",
          "How do you find the x-intercept and y-intercept of the line ax + by + c = 0?"
        ],
        mainNotes: `**1. Standard Form & Coordinate Representation**:
An equation of the form:
$$ax + by + c = 0 \\quad (a, b \\neq 0)$$
represents a straight line on the 2D Cartesian plane. Every point $(x, y)$ satisfying the equation lies on this line.

**2. Slope-Intercept & Intercept Forms**:
• Slope-intercept: $y = mx + c$, where slope $m = -\\frac{a}{b}$ and y-intercept is $c = -\\frac{c}{b}$.
• Slope between two points: $m = \\frac{y_2 - y_1}{x_2 - x_1}$.

**3. Consistency of Pairs of Linear Equations**:
For lines $a_1 x + b_1 y + c_1 = 0$ and $a_2 x + b_2 y + c_2 = 0$:
• **Intersecting (Unique Solution)**: $\\frac{a_1}{a_2} \\neq \\frac{b_1}{b_2}$.
• **Coincident (Infinitely Many Solutions)**: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$.
• **Parallel (No Solution)**: $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$.`,
        summary: "Linear equations in two variables define straight line loci in the coordinate plane; systems are classified as intersecting, coincident, or parallel via coefficient ratios.",
        coreAnalogy: "Think of two linear equations like two railway tracks laid across a map: depending on their slopes and alignments, they either cross at a single junction, run completely parallel without touching, or lie directly on top of each other.",
        structuralRule: "ax + by + c = 0 \\quad | \\quad y = mx + c \\quad | \\quad m = \\frac{y_2 - y_1}{x_2 - x_1}",
        curriculumTrap: "Students often assert that x = 5 is not an equation in two variables. It can be written as 1x + 0y - 5 = 0, representing a vertical line parallel to the y-axis.",
        verificationProblem: "Does point (2, -1) lie on 3x + 4y = 2? (Answer: 3(2) + 4(-1) = 6 - 4 = 2. Yes!).",
        diagramType: 'coordinate_grid',
        workedExample: {
          problem: "Find the slope and both coordinate intercepts of 5x - 3y = 15.",
          steps: [
            "Step 1: Rearrange to standard form: 5x - 3y - 15 = 0.",
            "Step 2: Solve for slope m = -a/b = -5/(-3) = 5/3.",
            "Step 3: Find x-intercept (set y = 0): 5x = 15 ➔ x = 3. Point: (3, 0).",
            "Step 4: Find y-intercept (set x = 0): -3y = 15 ➔ y = -5. Point: (0, -5)."
          ],
          result: "Slope = 5/3, Intercepts: (3, 0) and (0, -5)."
        },
        realWorldUse: "Linear regression in machine learning, economic supply-demand equilibria, and GPS navigation.",
        practiceQuiz: [
          {
            question: "Under what condition will a pair of linear equations have NO solution (parallel lines)?",
            options: [
              "a₁/a₂ = b₁/b₂ ≠ c₁/c₂",
              "a₁/a₂ ≠ b₁/b₂",
              "a₁/a₂ = b₁/b₂ = c₁/c₂",
              "a₁ b₁ = a₂ b₂"
            ],
            answerIndex: 0,
            explanation: "When a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the two lines share identical slope but distinct y-intercepts, meaning they never intersect."
          }
        ]
      };
    }
  },

  // 8A. Quadrilaterals, Parallelograms & Polygons (Strictly Geometry - No Trig)
  {
    matcher: (text, subj) =>
      subj.includes('MATH') &&
      !text.includes('TRIG') &&
      (text.includes('QUAD') || text.includes('PARALL') || text.includes('RHOMBUS') || text.includes('TRAPEZ') || text.includes('KITE') || text.includes('POLYGON') || text.includes('MIDPOINT')),
    diagramType: 'coordinate_grid',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$$\\text{Angle Sum of Quadrilateral} = 360^\\circ \\quad | \\quad \\text{Sum of Interior Angles} = (n - 2) \\times 180^\\circ \\quad | \\quad \\text{Sum of Exterior Angles} = 360^\\circ$$"
        : "$$\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ \\quad | \\quad \\text{Midpoint Theorem: } EF \\parallel BC, \\; EF = \\frac{1}{2}BC$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Quadrilaterals & Polygon Geometry",
        cueQuestions: isMS
          ? [
              "State the angle sum property of any quadrilateral (360°).",
              "State the formula for the sum of interior angles of an n-sided polygon.",
              "List the defining properties of a parallelogram (opposite sides equal, opposite angles equal).",
              "Distinguish between a rectangle, rhombus, square, and trapezium."
            ]
          : [
              "State and prove the Midpoint Theorem for triangles.",
              "Prove that a diagonal of a parallelogram divides it into two congruent triangles.",
              "Prove that the diagonals of a rhombus bisect each other perpendicularly.",
              "State the necessary and sufficient conditions for a quadrilateral to be a parallelogram."
            ],
        mainNotes: isMS
          ? `**1. The Four-Sided Closed Figure (Quadrilateral)**:
• A quadrilateral has 4 sides, 4 vertices, and 4 interior angles.
• **Angle Sum Property**: The sum of all four interior angles is strictly $360^\\circ$:
  $$\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ$$

**2. Types of Quadrilaterals**:
• **Parallelogram**: Opposite sides are parallel and equal in length; opposite angles are equal; diagonals bisect each other.
• **Rhombus**: An equilateral parallelogram; all 4 sides are equal; diagonals intersect at right angles ($90^\\circ$).
• **Rectangle**: An equiangular parallelogram; all 4 angles are $90^\\circ$; diagonals are equal in length.
• **Square**: Both a rhombus and a rectangle; all 4 sides equal and all angles $90^\\circ$.
• **Trapezium**: Has exactly one pair of parallel opposite sides.
• **Kite**: Two distinct pairs of adjacent sides are equal in length.

**3. Polygon Interior & Exterior Angle Sums**:
• Sum of interior angles of an $n$-sided polygon $= (n - 2) \\times 180^\\circ$.
• Sum of exterior angles of any convex polygon is always $360^\\circ$.`
          : `**1. Rigorous Quadrilateral Theorems**:
• A quadrilateral is a parallelogram if and only if opposite sides are parallel and congruent ($AB \\parallel CD, \\; AB = CD$).
• **Diagonal Properties**:
  - Parallelogram: Diagonals bisect each other.
  - Rectangle: Diagonals are congruent ($AC = BD$).
  - Rhombus: Diagonals are perpendicular bisectors ($AC \\perp BD$).
  - Square: Diagonals are congruent and perpendicular bisectors.

**2. General Polygon Topology & Midpoint Theorem**:
• **Angle Sum Property**: $\\angle A + \\angle B + \\angle C + \\angle D = 360^\\circ$.
• For any convex polygon with $n$ vertices:
  $$\\text{Sum of Interior Angles} = (n - 2) \\times 180^\\circ, \\quad \\text{Sum of Exterior Angles} = 360^\\circ$$
• **Midpoint Theorem**: Line segment joining midpoints of two sides of a triangle is parallel to third side and half its length ($EF \\parallel BC, \\; EF = \\frac{1}{2}BC$).`,
        summary: "Quadrilateral interior angles sum strictly to 360°; parallelograms feature parallel congruent opposite sides, and midpoint segment equals half the triangle base.",
        coreAnalogy: "Think of a parallelogram like a flexible picture frame: pushing sideways shifts the angles, but opposite edges always stay strictly parallel and equal in length.",
        structuralRule,
        curriculumTrap: "Confusing parallelograms with trapeziums: a parallelogram has TWO pairs of parallel sides, whereas a trapezium has ONLY ONE pair of parallel sides.",
        verificationProblem: "Find the sum of interior angles of a regular hexagon (n = 6). (Answer: (6 - 2) × 180° = 4 × 180° = 720°).",
        diagramType: 'coordinate_grid',
        workedExample: {
          problem: "Three angles of a quadrilateral measure 65°, 105°, and 110°. Find the measure of the fourth angle.",
          steps: [
            "Step 1: Apply Quadrilateral Angle Sum Property: Sum of all 4 angles = 360°.",
            "Step 2: Sum the known angles: 65° + 105° + 110° = 280°.",
            "Step 3: Subtract from 360°: Fourth angle = 360° - 280° = 80°."
          ],
          result: "The fourth angle measures 80°."
        },
        realWorldUse: "Architectural floor framing, tile tessellations, computer monitor aspect ratios, and robotic arm kinematics.",
        practiceQuiz: [
          {
            question: "What is the sum of the interior angles of an 8-sided octagon?",
            options: ["1080°", "720°", "900°", "1440°"],
            answerIndex: 0,
            explanation: "Sum = (n - 2) × 180° = (8 - 2) × 180° = 6 × 180° = 1080°."
          }
        ]
      };
    }
  },

  // 8A2. Surface Areas, Volumes & 3D Mensuration
  {
    matcher: (text, subj) =>
      subj.includes('MATH') &&
      !text.includes('TRIG') &&
      (text.includes('SURFACE') || text.includes('VOLUME') || text.includes('MENSUR') || text.includes('SOLID') || text.includes('CYLINDER') || text.includes('CONE') || text.includes('SPHERE') || text.includes('CUBOID') || text.includes('HEMISPHERE') || text.includes('PRISMATIC')),
    diagramType: 'coordinate_grid',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = "$$\\text{Cone: } \\text{CSA} = \\pi r l, \\; V = \\frac{1}{3}\\pi r^2 h \\quad | \\quad \\text{Sphere: } \\text{TSA} = 4\\pi r^2, \\; V = \\frac{4}{3}\\pi r^3 \\quad [l = \\sqrt{r^2 + h^2}]$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Surface Areas and Volumes",
        cueQuestions: [
          "State the formulas for Curved Surface Area and Total Surface Area of a right circular cone.",
          "What is the relationship between radius, height, and slant height of a cone?",
          "Explain why the Total Surface Area of a solid hemisphere is 3πr² while its Curved Surface Area is 2πr².",
          "State the volume formulas for a Cylinder, Cone, Sphere, and Hemisphere."
        ],
        mainNotes: `**1. Surface Area & Volume of Right Circular Cone**:
• Slant Height Relation: $l = \\sqrt{r^2 + h^2}$.
• Curved Surface Area (CSA): $\\text{CSA} = \\pi r l$.
• Total Surface Area (TSA): $\\text{TSA} = \\pi r l + \\pi r^2 = \\pi r(l + r)$.
• Volume: $V = \\frac{1}{3}\\pi r^2 h$.

**2. Sphere & Hemisphere**:
• Solid Sphere: $\\text{Surface Area} = 4\\pi r^2, \\quad \\text{Volume} = \\frac{4}{3}\\pi r^3$.
• Solid Hemisphere: $\\text{CSA} = 2\\pi r^2, \\quad \\text{TSA} = 3\\pi r^2, \\quad \\text{Volume} = \\frac{2}{3}\\pi r^3$.

**3. Cubes, Cuboids & Cylinders**:
• Cuboid: $\\text{TSA} = 2(lb + bh + hl), \\quad \\text{Volume} = lbh$.
• Cylinder: $\\text{CSA} = 2\\pi rh, \\quad \\text{TSA} = 2\\pi r(r + h), \\quad \\text{Volume} = \\pi r^2 h$.`,
        summary: "Mensuration formulas calculate 2D boundary surface areas and 3D volumetric capacities across cones, cylinders, spheres, and cuboids.",
        coreAnalogy: "Think of Surface Area like wrapping paper needed to cover an object, and Volume like the amount of water needed to completely fill it inside.",
        structuralRule,
        curriculumTrap: "Using vertical height (h) instead of slant height (l = √(r² + h²)) in cone Curved Surface Area (πrl).",
        verificationProblem: "Find CSA of a cone with radius 7 cm and slant height 10 cm. (Answer: πrl = (22/7) × 7 × 10 = 220 cm²).",
        diagramType: 'coordinate_grid',
        workedExample: {
          problem: "Find the curved surface area of a cone of base radius 5 cm and height 12 cm (use π = 3.14).",
          steps: [
            "Step 1: Calculate slant height l = √(r² + h²) = √(25 + 144) = 13 cm.",
            "Step 2: Apply CSA formula: CSA = πrl = 3.14 × 5 × 13 = 204.1 cm².",
            "Step 3: State final verified area with units."
          ],
          result: "CSA = 204.1 cm²."
        },
        realWorldUse: "Storage tank volume design, silo capacity planning, packaging material optimization, and architectural dome construction.",
        practiceQuiz: [
          {
            question: "What is the Total Surface Area of a solid hemisphere of radius r?",
            options: ["3πr²", "2πr²", "4πr²", "πr²"],
            answerIndex: 0,
            explanation: "Total Surface Area of solid hemisphere = Curved surface (2πr²) + Flat circular base (πr²) = 3πr²."
          }
        ]
      };
    }
  },

  // 8B. Introduction to Euclid's Geometry (Axiomatic Planar Geometry)
  {
    matcher: (text, subj) =>
      subj.includes('MATH') &&
      !text.includes('TRIG') &&
      (text.includes('EUCLID') || text.includes('AXIOM') || text.includes('POSTULATE') || text.includes('PLAYFAIR')) &&
      !text.includes('CONGRU'),
    diagramType: 'coordinate_grid',
    generate: (concept, boardId) => {
      const structuralRule = "$$\\text{Euclid's 5th Postulate: } \\angle 1 + \\angle 2 < 180^\\circ \\implies \\text{Lines Intersect} \\quad | \\quad \\text{Playfair's Axiom: Exactly 1 Parallel Line}$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: 'SECONDARY',
        title: concept.title || "Introduction to Euclid's Geometry",
        cueQuestions: [
          "State Euclid's 5 Postulates with exact mathematical precision.",
          "State Euclid's 7 Common Notions (Axioms).",
          "What is Playfair's Axiom and how is it equivalent to Euclid's Fifth Postulate?",
          "Why are Point, Line, and Plane treated as undefined terms in geometry?"
        ],
        mainNotes: `**1. Euclid's Definitions & Axioms (Common Notions)**:
• **Axiom 1**: Things which are equal to the same thing are equal to one another ($a = b \\text{ and } c = b \\implies a = c$).
• **Axiom 2**: If equals are added to equals, the wholes are equal ($a = b \\implies a + c = b + c$).
• **Axiom 3**: If equals are subtracted from equals, the remainders are equal ($a = b \\implies a - c = b - c$).
• **Axiom 4**: Things which coincide with one another are equal to one another.
• **Axiom 5**: The whole is greater than the part ($a > b \\text{ if } a = b + c \\text{ with } c > 0$).
• **Axiom 6 & 7**: Things which are double (or halves) of the same things are equal to one another.

**2. Euclid's 5 Postulates**:
• **Postulate 1**: A straight line may be drawn from any one point to any other point.
• **Postulate 2**: A terminated line can be produced indefinitely.
• **Postulate 3**: A circle can be drawn with any center and any radius.
• **Postulate 4**: All right angles are equal to one another ($90^\\circ = 90^\\circ$).
• **Postulate 5 (Parallel Postulate)**: If a straight line falling on two straight lines makes the interior angles on the same side less than two right angles ($< 180^\\circ$), the two lines will meet on that side if produced indefinitely.

**3. Equivalent Versions of Postulate 5**:
• **Playfair's Axiom**: For every line $l$ and point $P \\notin l$, there exists a unique line $m$ through $P$ parallel to $l$.`,
        summary: "Euclid established axiomatic geometry upon 7 universal axioms and 5 geometric postulates, creating rigorous deductive proof frameworks.",
        coreAnalogy: "Think of axioms and postulates like the foundational rules of chess: you do not prove the rules themselves; you build every deductive move and strategy upon them.",
        structuralRule,
        curriculumTrap: "Confusing Axioms (universal mathematical truths) with Postulates (assumptions specific strictly to geometry).",
        verificationProblem: "If interior angles on one side of a transversal sum to 175°, will the lines intersect on that side? (Answer: Yes, by Euclid's Postulate 5, since 175° < 180°).",
        diagramType: 'coordinate_grid',
        workedExample: {
          problem: "Prove that if point C lies between A and B such that AC = BC, then AC = (1/2)AB.",
          steps: [
            "Step 1: Start with given AC = BC.",
            "Step 2: Add AC to both sides (Axiom 2): AC + AC = BC + AC.",
            "Step 3: Since C lies between A and B, BC + AC coincides with AB (Axiom 4): 2AC = AB.",
            "Step 4: Divide by 2 (Axiom 7): AC = (1/2)AB."
          ],
          result: "Proven: AC = (1/2)AB using Euclid's Axioms 2, 4, and 7."
        },
        realWorldUse: "Formal logic, axiomatic mathematical foundations, non-Euclidean curved space in astrophysics, and automated theorem provers.",
        practiceQuiz: [
          {
            question: "Which postulate of Euclid deals with parallel lines and interior angles summing to less than 180°?",
            options: ["Fifth Postulate", "First Postulate", "Third Postulate", "Fourth Postulate"],
            answerIndex: 0,
            explanation: "Euclid's Fifth Postulate governs parallel lines and the intersection of lines when interior angle sum is less than two right angles."
          }
        ]
      };
    }
  },

  // 8B2. Triangle Congruence & Geometric Theorems
  {
    matcher: (text, subj) =>
      subj.includes('MATH') &&
      !text.includes('TRIG') &&
      !/\b(SIN|COS|TAN)\b/.test(text) &&
      (text.includes('CONGRU') || (text.includes('TRIANGLE') && (text.includes('SSS') || text.includes('SAS') || text.includes('ASA') || text.includes('RHS')))),
    diagramType: 'triangle',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = "$$\\Delta ABC \\cong \\Delta DEF \\iff AB = DE, \\; BC = EF, \\; CA = FD \\quad | \\quad \\text{SSS} \\iff \\text{SAS} \\iff \\text{ASA} \\iff \\text{RHS}$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Triangle Congruence & Criteria",
        cueQuestions: [
          "State the four criteria for triangle congruence (SSS, SAS, ASA, RHS).",
          "Explain why AAA (Angle-Angle-Angle) is NOT a valid congruence criterion.",
          "What does CPCTC stand for and how is it used in proofs?",
          "State and prove the Isosceles Triangle Theorem."
        ],
        mainNotes: `**1. The Concept of Geometric Congruence**:
• Two figures are **congruent** ($\\cong$) if they have identical shape and identical size.
• Superimposing one figure over the other yields a perfect exact fit.

**2. Four Congruence Criteria for Triangles**:
1. **SSS (Side-Side-Side)**: All three pairs of corresponding sides are equal ($AB=DE, BC=EF, CA=FD$).
2. **SAS (Side-Angle-Side)**: Two sides and the included angle between them are equal.
3. **ASA (Angle-Side-Angle)**: Two angles and the included side between them are equal.
4. **RHS (Right angle-Hypotenuse-Side)**: Right angle, hypotenuse, and one corresponding leg are equal.

**3. Crucial Non-Criteria & CPCTC**:
• **AAA is NOT Congruence**: Equal angles prove similarity (same shape), but NOT equal size.
• **CPCTC**: Corresponding Parts of Congruent Triangles are Congruent.`,
        summary: "Triangles are congruent if they share identical size and shape, proven via SSS, SAS, ASA, and RHS criteria.",
        coreAnalogy: "Think of congruent triangles like two identical cookies cut from the exact same cookie cutter: rotating or flipping them allows exact overlap.",
        structuralRule,
        curriculumTrap: "Assuming AAA proves congruence: AAA only guarantees similar shape, not equal size.",
        verificationProblem: "If triangle ABC has sides 5 cm, 7 cm, 8 cm, and triangle DEF has sides 7 cm, 5 cm, 8 cm, are they congruent? (Answer: Yes, by SSS criterion).",
        diagramType: 'triangle',
        workedExample: {
          problem: "In ΔPQR and ΔXYZ, PQ = XY = 6 cm, QR = YZ = 8 cm, and ∠Q = ∠Y = 50°. Prove ΔPQR ≅ ΔXYZ.",
          steps: [
            "Step 1: Identify given pairs: PQ = XY (Side), ∠Q = ∠Y (Included Angle), QR = YZ (Side).",
            "Step 2: Verify that ∠Q is strictly the included angle between PQ and QR.",
            "Step 3: Apply SAS criterion: Two sides and the included angle are equal.",
            "Step 4: Conclude: ΔPQR ≅ ΔXYZ by SAS."
          ],
          result: "Triangles are congruent by SAS."
        },
        realWorldUse: "Precision mechanical engineering, structural truss stability, computer graphics wireframe meshes, and surveying triangulation.",
        practiceQuiz: [
          {
            question: "Which criterion CANNOT prove congruence between two triangles?",
            options: ["AAA", "SSS", "SAS", "RHS"],
            answerIndex: 0,
            explanation: "AAA only proves similarity (equal angles); it cannot guarantee equal side lengths."
          }
        ]
      };
    }
  },

  // 8C. The Pythagorean Theorem & Metric Orthogonality (Pure Geometry - No Trig)
  {
    matcher: (text, subj) =>
      subj.includes('MATH') &&
      !text.includes('TRIG') &&
      !/\b(SIN|COS|TAN)\b/.test(text) &&
      (text.includes('PYTHAGOR') || text.includes('ORTHOGONAL')),
    diagramType: 'triangle',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = "$$a^2 + b^2 = c^2 \\iff c = \\sqrt{a^2 + b^2} \\quad | \\quad \\text{Converse: } a^2 + b^2 = c^2 \\implies \\angle C = 90^\\circ$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "The Pythagorean Theorem & Metric Orthogonality",
        cueQuestions: [
          "State the Pythagorean Theorem relating the three sides of a right-angled triangle.",
          "How do you test whether a triangle with known sides a, b, c is a right triangle?",
          "What is a Pythagorean Triplet? Give three common examples (e.g. 3-4-5, 5-12-13).",
          "Explain the geometric proof of Pythagoras using areas of squares on each side."
        ],
        mainNotes: `**1. The Pythagorean Relationship**:
In any right-angled triangle, the area of the square on the longest side (opposite the $90^\\circ$ angle) equals the sum of the areas of the squares on the other two legs:
$$a^2 + b^2 = c^2$$
where $c$ is the longest side opposite the right angle, and $a, b$ are the legs.

**2. Converse of the Pythagorean Theorem**:
If the square of the longest side of a triangle equals the sum of the squares of the other two sides ($c^2 = a^2 + b^2$), then the angle opposite to side $c$ is strictly a right angle ($90^\\circ$).

**3. Pythagorean Triplets**:
Sets of three positive integers that satisfy $a^2 + b^2 = c^2$:
• $(3, 4, 5) \implies 9 + 16 = 25$
• $(5, 12, 13) \implies 25 + 144 = 169$
• $(6, 8, 10) \implies 36 + 64 = 100$
• $(8, 15, 17) \implies 64 + 225 = 289$`,
        summary: "In any Euclidean right triangle, the square of the longest side equals the sum of the squares of the other two sides (a² + b² = c²).",
        coreAnalogy: "Think of walking along city blocks: walking 3 blocks east then 4 blocks north leaves you exactly 5 blocks diagonal direct distance from start.",
        structuralRule,
        curriculumTrap: "Applying a² + b² = c² to triangles that are NOT right-angled: the relation holds strictly for 90° triangles.",
        verificationProblem: "Verify whether a triangle with sides 6 cm, 8 cm, and 10 cm is a right triangle. (Answer: 6² + 8² = 36 + 64 = 100 = 10². Yes!).",
        diagramType: 'triangle',
        workedExample: {
          problem: "A 10 m ladder leans against a vertical wall. If the foot of the ladder is 6 m from the base of the wall, find the height it reaches up the wall.",
          steps: [
            "Step 1: Model the setup as a right triangle: base = 6 m, longest side = 10 m, height = h.",
            "Step 2: Apply Pythagoras: h² + 6² = 10² ➔ h² + 36 = 100.",
            "Step 3: Subtract: h² = 100 - 36 = 64.",
            "Step 4: Take square root: h = √64 = 8 meters."
          ],
          result: "The ladder reaches 8 meters up the wall."
        },
        realWorldUse: "Construction framing, GPS coordinate distance calculation, surveying triangulation, and navigation routing.",
        practiceQuiz: [
          {
            question: "Which of the following sets of numbers forms a valid Pythagorean triplet?",
            options: ["5, 12, 13", "4, 5, 6", "6, 7, 8", "7, 9, 11"],
            answerIndex: 0,
            explanation: "5² + 12² = 25 + 144 = 169 = 13²."
          }
        ]
      };
    }
  },

  // 8D. Trigonometry, Right Triangles & Ratios (Class 9 & 10 Dedicated)
  {
    matcher: (text, subj, grade) =>
      subj.includes('MATH') &&
      grade >= 9 &&
      (/\b(TRIG|TRIGONOMETR|SIN|COS|TAN|COT|SEC|CSC)\b/.test(text) || text.includes('HEIGHTS AND DISTANCES') || text.includes('ELEVATION') || text.includes('DEPRESSION')) &&
      !text.includes('EUCLID') &&
      !text.includes('CONGRU') &&
      !text.includes('QUAD') &&
      !text.includes('PARALL') &&
      !text.includes('POLYGON') &&
      !text.includes('CIRC') &&
      !text.includes('POINT') &&
      !text.includes('MENSUR') &&
      !text.includes('ORTHOGONAL') &&
      !text.includes('PYTHAGOR'),
    diagramType: 'triangle',
    generate: (concept, boardId) => {
      const structuralRule = "$$\\sin\\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} \\quad | \\quad \\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}} \\quad | \\quad \\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} \\quad | \\quad \\sin^2\\theta + \\cos^2\\theta = 1$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: 'SECONDARY',
        title: concept.title || "Trigonometry & Trigonometric Ratios",
        cueQuestions: [
          "Define the primary trigonometric ratios (sin, cos, tan) with respect to an acute reference angle θ.",
          "State the fundamental Pythagorean trigonometric identity: sin²θ + cos²θ = 1.",
          "State exact trigonometric values for special angles (0°, 30°, 45°, 60°, 90°).",
          "Distinguish between angle of elevation and angle of depression in heights and distances."
        ],
        mainNotes: `**1. The Primary Trigonometric Ratios**:
For an acute angle $\\theta$ in a right-angled triangle:
$$\\sin\\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}, \\quad \\cos\\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}, \\quad \\tan\\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}}$$

**2. Reciprocal Ratios**:
$$\\csc\\theta = \\frac{1}{\\sin\\theta}, \\quad \\sec\\theta = \\frac{1}{\\cos\\theta}, \\quad \\cot\\theta = \\frac{1}{\\tan\\theta}$$

**3. Fundamental Trigonometric Identities**:
$$\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta$$

**4. Special Angle Values**:
• $\\sin 30^\\circ = \\frac{1}{2}, \\; \\cos 30^\\circ = \\frac{\\sqrt{3}}{2}, \\; \\tan 30^\\circ = \\frac{1}{\\sqrt{3}}$
• $\\sin 45^\\circ = \\frac{1}{\\sqrt{2}}, \\; \\cos 45^\\circ = \\frac{1}{\\sqrt{2}}, \\; \\tan 45^\\circ = 1$
• $\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}, \\; \\cos 60^\\circ = \\frac{1}{2}, \\; \\tan 60^\\circ = \\sqrt{3}$`,
        summary: "Trigonometric ratios connect angle θ to right triangle side ratios, governed by sin²θ + cos²θ = 1 for spatial and elevation calculations.",
        coreAnalogy: "Think of an inclined ramp: the steeper the angle θ, the higher the rise (sin θ grows toward 1) and the shorter the horizontal floor run (cos θ shrinks toward 0).",
        structuralRule,
        curriculumTrap: "Mixing up which side is Opposite and which is Adjacent: the Opposite side is ALWAYS directly facing reference angle θ.",
        verificationProblem: "If sin θ = 3/5 in a right triangle, calculate cos θ and tan θ. (Answer: cos θ = 4/5, tan θ = 3/4).",
        diagramType: 'triangle',
        workedExample: {
          problem: "From a point 20 meters away from the base of a vertical tower, the angle of elevation of the top is 45°. Find the height of the tower.",
          steps: [
            "Step 1: Identify given parameters: Distance d = 20 m (Adjacent), Angle θ = 45°, Height h = Opposite.",
            "Step 2: Choose ratio: tan θ = Opposite / Adjacent ➔ tan 45° = h / 20.",
            "Step 3: Since tan 45° = 1: 1 = h / 20 ➔ h = 20 meters."
          ],
          result: "The height of the tower is 20 meters."
        },
        realWorldUse: "Topographic surveying, astronomical distance estimation, architectural roof pitches, flight descent paths, and game engine raycasting.",
        practiceQuiz: [
          {
            question: "What is the value of sin²(30°) + cos²(30°)?",
            options: ["1", "0.5", "0.75", "2"],
            answerIndex: 0,
            explanation: "By the fundamental trigonometric identity, sin²θ + cos²θ = 1 for any angle θ."
          }
        ]
      };
    }
  },

  // 8E. Elementary Triangles, Classifications & Angle Properties (Class 6-8)
  {
    matcher: (text, subj) =>
      subj.includes('MATH') &&
      (text.includes('TRIANGLE') || text.includes('SIMILAR')) &&
      !text.includes('TRIG') &&
      !text.includes('EUCLID') &&
      !text.includes('CONGRU'),
    diagramType: 'triangle',
    generate: (concept, boardId) => {
      const structuralRule = "$$\\angle A + \\angle B + \\angle C = 180^\\circ \\quad | \\quad \\angle \\text{ext} = \\angle 1 + \\angle 2 \\quad | \\quad a + b > c \\quad | \\quad \\text{Area} = \\frac{1}{2} b h$$";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: 'MIDDLE_SCHOOL',
        title: concept.title || "Triangles & Geometric Properties",
        cueQuestions: [
          "State the Angle Sum Property of a triangle (180°).",
          "State the Exterior Angle Theorem for triangles.",
          "State the Triangle Inequality: sum of any two sides is greater than the third.",
          "How is the area of a triangle calculated using base and perpendicular height?"
        ],
        mainNotes: `**1. Classification of Triangles**:
• **By Sides**: Equilateral (all 3 sides equal), Isosceles (2 sides equal), Scalene (all 3 sides different).
• **By Angles**: Acute-angled (all angles $< 90^\\circ$), Right-angled (one angle $= 90^\\circ$), Obtuse-angled (one angle $> 90^\\circ$).

**2. Core Triangle Theorems**:
• **Interior Angle Sum**: The three interior angles always add up to $180^\\circ$:
  $$\\angle A + \\angle B + \\angle C = 180^\\circ$$
• **Exterior Angle Theorem**: The exterior angle equals the sum of its two interior opposite angles:
  $$\\angle \\text{ext} = \\angle 1 + \\angle 2$$
• **Triangle Inequality**: Any two sides must sum to strictly more than the third side ($a + b > c$).

**3. Area and Perimeter**:
• $\\text{Perimeter} = a + b + c$
• $\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{perpendicular height}$`,
        summary: "Triangles are 3-sided polygons with interior angles summing to 180°; exterior angle equals the sum of interior opposites.",
        coreAnalogy: "Think of tearing off the three corners of any paper triangle and arranging them tip-to-tip: they always form a straight line of 180 degrees.",
        structuralRule,
        curriculumTrap: "Assuming any three lengths can form a triangle: the two shorter sides MUST sum greater than the third side (e.g. 2, 3, 5 cannot form a triangle).",
        verificationProblem: "Can a triangle have side lengths 3 cm, 4 cm, and 8 cm? (Answer: No, 3 + 4 = 7 < 8, violates triangle inequality).",
        diagramType: 'triangle',
        workedExample: {
          problem: "In a triangle, two angles measure 50° and 70°. What is the measure of the third angle?",
          steps: [
            "Step 1: Sum the known angles: 50° + 70° = 120°.",
            "Step 2: Subtract from 180°: 180° - 120° = 60°."
          ],
          result: "The third angle is 60°."
        },
        realWorldUse: "Roof truss construction, surveying triangulation, bridge bracing, and art composition.",
        practiceQuiz: [
          {
            question: "What is the sum of the angles in any planar triangle?",
            options: ["180°", "360°", "90°", "270°"],
            answerIndex: 0,
            explanation: "The interior angles of any triangle in Euclidean geometry strictly sum to 180°."
          }
        ]
      };
    }
  },

  // =========================================================================
  // CHEMISTRY BLUEPRINTS (GRADE LOCKED)
  // =========================================================================

  // 9. Atomic Structure, Bohr Model & Electron Configuration
  {
    matcher: (text, subj) =>
      (subj.includes('CHEM') || subj.includes('SCI')) &&
      (text.includes('ATOM') || text.includes('BOHR') || text.includes('ELECTRON') || text.includes('ISOTOPE') || text.includes('PERIODIC') || text.includes('VALENC')),
    diagramType: 'bohr_atom',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Atoms: Protons (+) & Neutrons in Nucleus} \\quad | \\quad \\text{Electrons (-) in Orbit} \\quad | \\quad \\text{Neutral Atom: Protons} = \\text{Electrons}$"
        : "Z = p = e^- \\quad | \\quad A = p + n \\quad | \\quad 2n^2 \\text{ Maximum Shell Capacity}";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Atomic Structure & Chemical Elements",
        cueQuestions: isMS
          ? [
              "What are atoms and molecules, and how do they differ?",
              "Name the three subatomic particles and state their electrical charges.",
              "Why is an isolated atom electrically neutral?",
              "What is the difference between an element and a compound?"
            ]
          : [
              "State Bohr's postulates for the hydrogen-like atom model.",
              "Explain how the Bohr-Bury scheme governs maximum electron occupancy (2n²).",
              "Define isotopes and isobars with fractional atomic mass derivations.",
              "How does valence electron count determine chemical reactivity?"
            ],
        mainNotes: isMS
          ? `**1. Building Blocks of Matter**:
• **Atom**: The smallest particle of an element that can take part in chemical reactions.
• **Molecule**: A group of two or more atoms chemically bonded together.

**2. Subatomic Particles**:
• **Protons**: Positively charged particles ($+1$) located in the central nucleus.
• **Neutrons**: Neutral particles with zero electrical charge located in the nucleus.
• **Electrons**: Negatively charged particles ($-1$) revolving around the nucleus.
• In a neutral atom, number of protons equals number of electrons.

**3. Elements and Compounds**:
• **Element**: Made of only one type of atom (e.g. Iron, Oxygen, Carbon).
• **Compound**: Formed when two or more different elements chemically combine in a fixed ratio (e.g. Water $\\text{H}_2\\text{O}$, Salt $\\text{NaCl}$).`
          : `**1. Subatomic Structure**:
• Atomic Number ($Z$): Number of protons in nucleus.
• Mass Number ($A$): Total number of nucleons (protons + neutrons): $A = Z + N$.

**2. Bohr Atomic Model**:
Electrons revolve in discrete, non-radiating circular orbits. Shell capacity is given by $2n^2$:
• K-shell ($n=1$): 2 electrons
• L-shell ($n=2$): 8 electrons
• M-shell ($n=3$): 18 electrons

**3. Isotopes**:
Atoms of same element with same $Z$ but different $A$ (e.g. $^{35}_{17}\\text{Cl}$ and $^{37}_{17}\\text{Cl}$).`,
        summary: isMS
          ? "Atoms consist of a nucleus with positive protons and neutral neutrons, surrounded by negative electrons. Protons equal electrons in neutral atoms."
          : "Atoms have nucleus containing protons and neutrons, with electrons filling discrete energy levels (2n²).",
        coreAnalogy: isMS
          ? "Think of an atom like a miniature solar system: the heavy nucleus is the Sun at the center, and electrons are planets orbiting around it."
          : "Think of electron shells like tiered seating in an auditorium: row 1 holds 2 seats, row 2 holds 8 seats.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often forget that neutrons have no electrical charge; they are neutral, not negative."
          : "Confusing Mass Number A (integer nucleon count) with Relative Atomic Mass (weighted average).",
        verificationProblem: isMS
          ? "If an atom has 6 protons, how many electrons does it have when electrically neutral? (Answer: 6 electrons)."
          : "Find number of neutrons in Carbon-14 (Z = 6, A = 14). (Answer: 14 - 6 = 8 neutrons).",
        diagramType: 'bohr_atom',
        workedExample: {
          problem: isMS
            ? "An oxygen atom has 8 protons, 8 neutrons, and 8 electrons. Sketch its subatomic structure."
            : "Write the electron configuration of Chlorine (Z = 17) and determine its valency.",
          steps: isMS
            ? [
                "Step 1: Place 8 protons (+) and 8 neutrons (0) inside the central nucleus.",
                "Step 2: Arrange 8 electrons (-) in orbits surrounding the nucleus.",
                "Step 3: Total charge = +8 + (-8) = 0 (electrically neutral atom)."
              ]
            : [
                "Step 1: Distribute 17 electrons across shells: K=2, L=8, M=7.",
                "Step 2: Valence shell (M) has 7 electrons.",
                "Step 3: Valency = 8 - 7 = 1 (needs 1 electron to complete octet)."
              ],
          result: isMS ? "8 protons and 8 neutrons in nucleus, 8 electrons in orbits." : "Configuration: 2, 8, 7; Valency = 1."
        },
        realWorldUse: "Nuclear power generation, radiocarbon dating, semiconductor doping, and spectroscopy.",
        practiceQuiz: [
          {
            question: isMS ? "What electrical charge is carried by a neutron?" : "What is the maximum number of electrons that can occupy the M-shell (n = 3)?",
            options: isMS ? ["Zero (neutral)", "Positive (+1)", "Negative (-1)", "Double positive (+2)"] : ["18", "8", "32", "2"],
            answerIndex: 0,
            explanation: isMS ? "Neutrons reside in the nucleus and carry no net electrical charge." : "From 2n²: for n = 3, 2(3²) = 2(9) = 18 electrons."
          }
        ]
      };
    }
  },

  // 10a. Reactivity Series & Single Displacement Reactions (MUST precede generic Acids/Bases blueprint)
  // Fix for Bug #2: CAMBRIDGE-G8-CHEMISTRY-MET-DISP was matching the REACTION keyword in
  // the blueprint below and receiving Acids/pH/Litmus content instead of Reactivity Series content.
  {
    matcher: (text, subj) =>
      (subj.includes('CHEM') || subj.includes('SCI')) &&
      (
        text.includes('REACTIVITY SERIES') ||
        text.includes('REACTIVITY ORDER') ||
        text.includes('SINGLE DISPLACEMENT') ||
        text.includes('DOUBLE DISPLACEMENT') ||
        text.includes('ELECTROPOSITIVE') ||
        text.includes('METAL ACTIVITY') ||
        text.includes('ACTIVITY SERIES') ||
        text.includes('MET-DISP') ||
        text.includes('MET DISP') ||
        (text.includes('REACTIV') && text.includes('METAL')) ||
        (text.includes('REACTIV') && text.includes('SERIES'))
      ),
    diagramType: 'periodic_trends',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const board = normalizeBoard(boardId);
      const structuralRule = isMS
        ? "$$\\text{Reactivity Series (High to Low): K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Ag > Au} \\quad | \\quad \\text{Displacement: } A + BC \\rightarrow AC + B \\text{ (if A is more reactive than B)}$$"
        : "$$\\text{Electrochemical Series: Standard Reduction Potentials} \\quad E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} \\quad | \\quad \\text{Single Displacement: } A + B^+X^- \\rightarrow A^+X^- + B \\text{ iff } E^\\circ_A < E^\\circ_B$$";

      const trapContent = board === 'CAMBRIDGE'
        ? generateCambridgeMarkSchemeGuidance(concept)
        : board === 'IB_MYP'
        ? generateIBMYPInquiryAndCriterion(concept)
        : generateCBSEExamTrapsAndMarkingPatterns(concept);

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || 'Reactivity Series & Single Displacement Reactions',
        diagramType: 'periodic_trends' as any,
        cueQuestions: isMS
          ? [
              'What is the Reactivity Series and what does it tell us about metals?',
              'How do you predict whether a displacement reaction will occur between a metal and a salt solution?',
              'Why does zinc displace copper from copper sulfate solution but not vice versa?',
              'List the metals in the Reactivity Series from most reactive to least reactive.',
              'What happens when iron is added to a solution of copper sulfate? Write the word equation.',
            ]
          : [
              'Define electropositive character and explain how it relates to position in the Reactivity Series.',
              'Predict with reasoning: Will aluminium displace zinc from zinc nitrate solution?',
              'Write the balanced ionic equation for the single displacement reaction between magnesium and dilute hydrochloric acid.',
              'How does the Reactivity Series predict corrosion tendencies and galvanic cell potential?',
              'Distinguish between single displacement and double displacement reactions with examples.',
            ],
        mainNotes: isMS
          ? `### Reactivity Series & Single Displacement Reactions\n**Core Principle**: ${concept.coreLogicEssence || 'Metals vary in their tendency to lose electrons and displace less reactive metals from their salt solutions.'}\n\n**The Reactivity Series (Decreasing Reactivity):**\nPotassium (K) > Sodium (Na) > Calcium (Ca) > Magnesium (Mg) > Aluminium (Al) > Zinc (Zn) > Iron (Fe) > Lead (Pb) > Hydrogen (H) > Copper (Cu) > Silver (Ag) > Gold (Au)\n\nMnemonic: "Please Stop Calling Me A Zebra Instead, Little Harry Caught Several Ants Gorging"\n\n**Single Displacement Reaction Rule:**\nA more reactive metal displaces a less reactive metal from its salt solution.\n- Zinc + Copper Sulfate → Zinc Sulfate + Copper (Zn is above Cu in series ✓)\n- Copper + Zinc Sulfate → No reaction (Cu is below Zn in series ✗)\n\n**Observable Evidence:**\n- Color change of solution (e.g., blue CuSO₄ → colorless ZnSO₄)\n- Metal deposit on the surface of the reacting metal\n- Temperature change (exothermic displacement)\n\n**Key Rule:** Position in the Reactivity Series = tendency to lose electrons (oxidize) = electropositive character.`
          : `### Reactivity Series & Single Displacement Reactions (Secondary Level)\n**Core Principle**: ${concept.coreLogicEssence || 'The reactivity series ranks metals by standard electrode potential; displacement occurs when ΔG < 0, i.e., the reducing agent has a more negative standard reduction potential than the species being reduced.'}\n\n**Electrochemical Basis:**\nThe Reactivity Series corresponds to Standard Reduction Potentials (E°):\n- More electropositive metals have more negative E° values (stronger reducing agents)\n- Displacement is thermodynamically spontaneous if E°cell = E°cathode − E°anode > 0\n\n**Single Displacement Reactions:**\nGeneral form: A(s) + B⁺X⁻(aq) → A⁺X⁻(aq) + B(s) [if E°A < E°B]\n\nExamples with ionic equations:\n- Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)\n  Ionic: Mg(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂(g)\n- Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)\n  Ionic: Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)\n\n**Corrosion & Galvanic Cells:**\nThe Reactivity Series directly predicts which metal acts as the anode (oxidized) in a galvanic cell and which undergoes preferential corrosion (sacrificial protection uses a more reactive metal like zinc to protect iron).`,
        summary: isMS
          ? `[${concept.id}] ${concept.title}: The Reactivity Series ranks metals from most to least reactive. A more reactive metal above another in the series will displace it from its salt solution (single displacement). Observable evidence includes color change and metal deposition. Key mnemonic: K-Na-Ca-Mg-Al-Zn-Fe-Pb-H-Cu-Ag-Au.`
          : `[${concept.id}] ${concept.title}: The Reactivity Series is rooted in standard electrode potentials. Single displacement occurs when ΔG < 0 (E°cell > 0). Ionic half-equations show electron transfer; the more electropositive metal is oxidized (anode) and the less reactive metal ion is reduced (cathode).`,
        coreAnalogy: isMS
          ? `Intuition for ${concept.title}: Think of the Reactivity Series as a pecking order at school — the more powerful student (more reactive metal) always takes the seat (displaces) a weaker student. Zinc can take copper's seat, but copper can never take zinc's seat.`
          : `Intuition for ${concept.title}: The Reactivity Series is a "willingness to give up electrons" ranking — like generosity rankings. The most generous metals (K, Na) donate electrons immediately; the stingy ones (Cu, Ag, Au) hold onto them tightly and don't react easily. Displacement occurs only when one metal is more "willing" than the other.`,
        structuralRule: structuralRule,
        curriculumTrap: `Key exam trap for ${concept.title}: ${trapContent}`,
        verificationProblem: `Verify ${concept.title}: Iron nails are placed in (A) copper sulfate solution and (B) zinc sulfate solution. In which case does displacement occur and what do you observe? Answer: Only (A) — Fe is above Cu in the series; the blue solution turns colorless and a reddish copper deposit forms on the iron nail. No reaction in (B) because Zn is above Fe.`,
        workedExample: {
          problem: `[${concept.id}] Apply principles of ${concept.title}: A piece of magnesium ribbon is dropped into 50 cm³ of silver nitrate solution (AgNO₃). Predict whether a reaction occurs, write the balanced equation and ionic equation, identify the oxidizing and reducing agents, and state two observable changes.`,
          steps: [
            'Step 1 — Check Reactivity Series position: Magnesium (Mg) is positioned above Silver (Ag) in the Reactivity Series. Therefore Mg is more reactive and WILL displace Ag from its solution.',
            'Step 2 — Write balanced molecular equation: Mg(s) + 2AgNO₃(aq) → Mg(NO₃)₂(aq) + 2Ag(s)',
            'Step 3 — Write ionic equation (cancel spectator NO₃⁻ ions): Mg(s) + 2Ag⁺(aq) → Mg²⁺(aq) + 2Ag(s)',
            'Step 4 — Identify redox roles: Mg is OXIDIZED (loses 2e⁻) → Reducing Agent. Ag⁺ is REDUCED (gains 1e⁻ each) → Oxidizing Agent.',
            'Step 5 — Observable changes: (1) Colorless AgNO₃ solution remains colorless but Mg(NO₃)₂ also colorless → no color change in solution. (2) Grey/silver metallic deposit forms on the magnesium surface. (3) The magnesium ribbon decreases in mass (dissolves). (4) Reaction is exothermic — slight temperature rise.',
          ],
          result: 'Reaction occurs: Mg(s) + 2Ag⁺(aq) → Mg²⁺(aq) + 2Ag(s). Observable: silver metal deposits on magnesium; magnesium dissolves. Mg = reducing agent; Ag⁺ = oxidizing agent.',
        },
        realWorldUse: 'Sacrificial protection (zinc anodes on ships and pipelines protect iron from corrosion), electroplating, galvanic cells and batteries, extraction of metals (thermite reaction: Al displacing Fe₂O₃).',
        practiceQuiz: [
          {
            question: `Which of the following correctly predicts that a single displacement reaction will occur?`,
            options: [
              'Copper added to zinc sulfate solution',
              'Zinc added to copper sulfate solution',
              'Silver added to magnesium chloride solution',
              'Gold added to iron(II) sulfate solution',
            ],
            answerIndex: 1,
            explanation: 'Zinc is above Copper in the Reactivity Series, so Zn displaces Cu²⁺ from CuSO₄. All other options involve a less reactive metal attempting to displace a more reactive one — no reaction occurs.',
          },
          {
            question: 'In a single displacement reaction, the metal that gets displaced is always the one that is:',
            options: [
              'Higher in the Reactivity Series (more electropositive)',
              'Lower in the Reactivity Series (less electropositive)',
              'The same position in the Reactivity Series',
              'Closest to hydrogen in the Reactivity Series',
            ],
            answerIndex: 1,
            explanation: 'The less reactive metal (lower in the series, less electropositive) is displaced from its ionic solution by the more reactive metal. The more reactive metal is oxidized and goes into solution as ions.',
          },
        ],
      };
    },
  },

  // 10. Chemical Reactions, Acids, Bases & pH Scale (Class 7 - 10 Secondary only)
  {
    matcher: (text, subj, grade) =>
      grade <= 10 &&
      (subj.includes('CHEM') || subj.includes('SCI')) &&
      (text.includes('REACTION') || text.includes('ACID') || text.includes('BASE') || text.includes('PH') || text.includes('NEUTRAL') || text.includes('SALT')),
    diagramType: 'ph_scale',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Acid} + \\text{Base} \\longrightarrow \\text{Salt} + \\text{Water} \\quad | \\quad \\text{Litmus: Acid (Red), Base (Blue)}$"
        : "\\text{pH} = -\log_{10}[\\text{H}^+] \\quad | \\quad \\text{Acid} + \\text{Base} \\to \\text{Salt} + \\text{H}_2\\text{O} \\quad | \\quad [\\text{H}^+][\\text{OH}^-] = 10^{-14}";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Chemical Reactions, Acids & Bases",
        cueQuestions: isMS
          ? [
              "What are physical changes and chemical changes, and how do they differ?",
              "State the observable properties of acids and bases.",
              "How do natural indicators like litmus and turmeric test for acids and bases?",
              "What is neutralization and give an everyday practical example."
            ]
          : [
              "Define acids and bases according to Arrhenius and Brønsted-Lowry theories.",
              "Define the pH scale mathematically in terms of hydronium ion concentration.",
              "Write balanced equations for the four primary types of chemical reactions.",
              "Explain the role of common salts (baking soda, bleaching powder, Plaster of Paris)."
            ],
        mainNotes: isMS
          ? `**1. Physical vs Chemical Changes**:
• **Physical Change**: Only physical properties (shape, size, state) change; no new substance is formed (e.g. melting ice, boiling water).
• **Chemical Change**: One or more new substances with completely different chemical properties are formed (e.g. rusting of iron, burning wood).

**2. Acids and Bases**:
• **Acids**: Sour in taste; turn blue litmus paper red (e.g. lemon juice, vinegar, curd).
• **Bases**: Bitter in taste and feel soapy to the touch; turn red litmus paper blue (e.g. baking soda, soap, lime water).

**3. Neutralization**:
• The reaction between an acid and a base is called **neutralization**, forming salt, water, and releasing heat:
  $$\\text{Acid} + \\text{Base} \\longrightarrow \\text{Salt} + \\text{Water} + \\text{Heat}$$
• Everyday examples: Taking antacid tablets (mild base) for stomach acidity; treating ant stings (formic acid) with calamine (zinc carbonate).`
          : `**1. Chemical Reaction Types**:
• Combination, Decomposition, Displacement, Double Displacement, Redox.

**2. The pH Scale (0 to 14)**:
$$\\text{pH} = -\log_{10}[\\text{H}^+]$$
• $\\text{pH} < 7$: Acidic ($[\\text{H}^+] > [\\text{OH}^-]$)
• $\\text{pH} = 7$: Neutral ($[\\text{H}^+] = [\\text{OH}^-] = 10^{-7}\\text{ M}$)
• $\\text{pH} > 7$: Basic ($[\\text{H}^+] < [\\text{OH}^-]$)`,
        summary: isMS
          ? "Chemical changes create new substances. Acids turn blue litmus red; bases turn red litmus blue. Acid plus base yields salt and water."
          : "Chemical reactions conserve mass while redistributing bonds; pH quantifies proton activity across acidic and basic domains.",
        coreAnalogy: isMS
          ? "Think of chemical change like baking a cake: once flour, sugar, and eggs react in the oven, you have a completely new substance that cannot be separated back."
          : "Think of the pH scale like a see-saw balancing H+ ions on the left and OH- ions on the right.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often confuse indicators: Remember that Acids turn Blue litmus Red (A-B-R mnemonic), and Bases turn Red litmus Blue."
          : "Omitting state symbols (s, l, g, aq) in balanced chemical equations.",
        verificationProblem: isMS
          ? "What color does blue litmus paper turn when dipped into lemon juice? (Answer: Red, because lemon juice is acidic)."
          : "Calculate pH of a 0.01 M HCl solution. (Answer: [H+] = 10⁻² M ➔ pH = -log(10⁻²) = 2.0).",
        diagramType: 'ph_scale',
        workedExample: {
          problem: isMS
            ? "Explain why farmers treat acidic soil with quicklime (calcium oxide) or slaked lime."
            : "Write the balanced chemical equation for the neutralization of aqueous sulfuric acid with aqueous sodium hydroxide.",
          steps: isMS
            ? [
                "Step 1: Excessive use of chemical fertilizers often makes agricultural soil too acidic for crops.",
                "Step 2: Quicklime and slaked lime are basic substances.",
                "Step 3: When added to the soil, the base neutralizes the excess acid, restoring ideal soil pH for plant growth."
              ]
            : [
                "Step 1: Identify reactants: H₂SO₄ (aq) and NaOH (aq).",
                "Step 2: Identify products: Salt (Na₂SO₄) and Water (H₂O).",
                "Step 3: Balance equation: H₂SO₄ (aq) + 2NaOH (aq) ➔ Na₂SO₄ (aq) + 2H₂O (l)."
              ],
          result: isMS ? "Neutralization restores balanced soil pH." : "H₂SO₄ + 2NaOH ➔ Na₂SO₄ + 2H₂O."
        },
        realWorldUse: "Soil chemistry, water treatment plants, pharmaceutical antacids, and industrial neutralization.",
        practiceQuiz: [
          {
            question: isMS ? "What happens when hydrochloric acid reacts with sodium hydroxide?" : "What is the pH of pure water at 25°C?",
            options: isMS
              ? ["They neutralize each other to produce sodium chloride salt and water", "They produce pure hydrogen gas explosively", "They form a stronger acid", "Nothing happens"]
              : ["7.0", "0.0", "14.0", "1.0"],
            answerIndex: 0,
            explanation: isMS
              ? "Acid + Base forms Salt + Water via neutralization: HCl + NaOH ➔ NaCl + H₂O."
              : "At 25°C, [H+] = 10⁻⁷ M, giving pH = -log(10⁻⁷) = 7.0 (neutral)."
          }
        ]
      };
    }
  },

  // 11. Cell Biology, Respiration & ATP Cycle
  {
    matcher: (text, subj) =>
      (subj.includes('BIO') || subj.includes('SCI') || subj.includes('LIFE')) &&
      (text.includes('RESPIRAT') || text.includes('ATP') || text.includes('GLYCOLYS') || text.includes('MITOCHON') || text.includes('BREATH')),
    diagramType: 'cellular_respiration',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Glucose} + \\text{Oxygen} \\longrightarrow \\text{Carbon Dioxide} + \\text{Water} + \\text{Energy}$"
        : "\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\longrightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 36\\text{-}38\\text{ ATP}";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Respiration in Organisms",
        cueQuestions: isMS
          ? [
              "What is the difference between breathing and cellular respiration?",
              "Distinguish between aerobic respiration and anaerobic respiration.",
              "Why do we experience muscle cramps after sudden heavy exercise?",
              "How do plants and earthworms breathe/respire?"
            ]
          : [
              "Outline the three stages of cellular respiration: Glycolysis, Krebs Cycle, Oxidative Phosphorylation.",
              "What is the net ATP yield per glucose molecule in aerobic vs anaerobic respiration?",
              "Explain the biochemical pathway of lactic acid fermentation in human myocytes.",
              "How does mitochondrial cristae surface area facilitate electron transport?"
            ],
        mainNotes: isMS
          ? `**1. Breathing vs Cellular Respiration**:
• **Breathing**: The physical process of inhaling oxygen-rich air and exhaling carbon dioxide-rich air using respiratory organs (lungs, gills, spiracles).
• **Cellular Respiration**: The chemical process inside living cells where glucose is broken down to release biological energy.

**2. Aerobic vs Anaerobic Respiration**:
• **Aerobic Respiration**: Takes place in the presence of oxygen. Glucose is completely broken down into carbon dioxide, water, and a large amount of energy:
  $$\\text{Glucose} + \\text{Oxygen} \\longrightarrow \\text{Carbon Dioxide} + \\text{Water} + \\text{Energy}$$
• **Anaerobic Respiration**: Takes place in the absence of oxygen:
  - In yeast: Glucose $\\longrightarrow$ Alcohol (Ethanol) + $\\text{CO}_2$ + Energy (Fermentation).
  - In human muscle cells during heavy exercise: Glucose $\\longrightarrow$ **Lactic Acid** + Energy. The accumulation of lactic acid causes muscle cramps.`
          : `**1. Aerobic Cellular Respiration**:
$$\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\longrightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + 36\\text{-}38\\text{ ATP}$$
• **Glycolysis**: Occurs in cytoplasm; glucose splits into 2 pyruvate (net 2 ATP, 2 NADH).
• **Krebs Cycle**: Occurs in mitochondrial matrix; generates NADH, FADH₂, and 2 ATP.
• **Electron Transport Chain**: Inner mitochondrial membrane; yields ~32-34 ATP.`,
        summary: isMS
          ? "Respiration breaks down glucose to release energy. Aerobic respiration uses oxygen; anaerobic occurs without oxygen producing lactic acid or alcohol."
          : "Aerobic respiration breaks down glucose via glycolysis, Krebs cycle, and electron transport chain, yielding ATP.",
        coreAnalogy: isMS
          ? "Think of respiration like burning fuel in an engine: glucose is the gasoline, oxygen keeps the flame burning, and the energy released powers all the moving parts."
          : "Think of ATP like rechargeable batteries powering cellular work.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students frequently think breathing and respiration are identical. Breathing is purely the physical gas exchange; respiration is the intracellular chemical breakdown of food to release energy."
          : "Claiming glycolysis occurs in the mitochondria; it takes place in the cytoplasm.",
        verificationProblem: isMS
          ? "What chemical product causes muscle cramps during intense sprinting? (Answer: Lactic acid)."
          : "Where does the Krebs cycle take place? (Answer: Mitochondrial matrix).",
        diagramType: 'cellular_respiration',
        workedExample: {
          problem: isMS
            ? "Explain how taking a hot water bath relieves muscle cramps after heavy physical exertion."
            : "Calculate net ATP yield from one glucose molecule undergoing anaerobic fermentation in yeast.",
          steps: isMS
            ? [
                "Step 1: Heavy exercise causes anaerobic respiration in muscles, producing lactic acid.",
                "Step 2: A hot bath improves blood circulation throughout the muscle tissues.",
                "Step 3: Increased oxygen supply completely breaks down accumulated lactic acid into carbon dioxide and water, relieving cramps."
              ]
            : [
                "Step 1: Glycolysis produces 2 ATP and 2 pyruvate.",
                "Step 2: Fermentation converts pyruvate to ethanol + CO₂ without additional ATP generation.",
                "Step 3: Net yield = strictly 2 ATP."
              ],
          result: isMS ? "Improved oxygen circulation metabolizes accumulated lactic acid." : "Net yield = 2 ATP."
        },
        realWorldUse: "Brewing and bakery fermentation, athletic sports conditioning, and metabolic medicine.",
        practiceQuiz: [
          {
            question: isMS ? "What gas is produced during both aerobic respiration and yeast fermentation?" : "What is the net ATP yield of anaerobic glycolysis?",
            options: isMS ? ["Carbon dioxide", "Oxygen", "Nitrogen", "Methane"] : ["2 ATP", "36 ATP", "38 ATP", "0 ATP"],
            answerIndex: 0,
            explanation: isMS ? "Both aerobic respiration and yeast alcoholic fermentation produce carbon dioxide." : "Glycolysis yields a gross of 4 ATP but consumes 2 ATP, giving a net yield of 2 ATP."
          }
        ]
      };
    }
  },

  // 12. Cell Structure, Organelles & Cell Theory
  {
    matcher: (text, subj) =>
      (subj.includes('BIO') || subj.includes('SCI') || subj.includes('LIFE')) &&
      !text.includes('HEART') &&
      !text.includes('DIGEST') &&
      !text.includes('XYLEM') &&
      !text.includes('TROPHIC') &&
      !text.includes('DNA') &&
      (text.includes('CELL') || text.includes('ORGANELLE') || text.includes('CYTO') || text.includes('MEMBRANE')),
    diagramType: 'cell_structure',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Cell Structure: Cell Membrane} \\longrightarrow \\text{Cytoplasm (Organelles)} \\longrightarrow \\text{Nucleus (Control)}$"
        : "\\text{Cell Theory: All organisms composed of cells; cells arise from pre-existing cells (Omnis cellula e cellula)}";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Cell: Structure & Functions",
        cueQuestions: isMS
          ? [
              "Why is the cell called the fundamental structural and functional unit of life?",
              "Distinguish between plant cells and animal cells with three key structural differences.",
              "What is the role of the nucleus in a living cell?",
              "Describe the function of the cell membrane."
            ]
          : [
              "State the three postulates of modern Cell Theory.",
              "Distinguish between prokaryotic and eukaryotic cellular ultrastructure.",
              "Describe the structure and function of the Endoplasmic Reticulum and Golgi apparatus.",
              "Why are lysosomes referred to as the 'suicide bags' of the cell?"
            ],
        mainNotes: isMS
          ? `**1. The Fundamental Unit of Life**:
• All living organisms are made up of microscopic building blocks called **cells**.
• Organisms made of a single cell are **unicellular** (Amoeba, Paramecium); organisms made of many cells are **multicellular** (humans, plants).

**2. Three Primary Parts of a Cell**:
• **Cell Membrane (Plasma Membrane)**: Outer boundary controlling what enters and exits the cell.
• **Cytoplasm**: Jelly-like fluid filling the cell where cellular reactions and organelles exist.
• **Nucleus**: The control center containing genetic material (chromosomes) that directs all cell activities.

**3. Plant Cells vs Animal Cells**:
• **Cell Wall**: Present ONLY in plant cells (made of cellulose, provides rigid support).
• **Chloroplasts**: Present ONLY in plant cells (contain green chlorophyll for photosynthesis).
• **Vacuoles**: Plant cells have one large central vacuole; animal cells have small, temporary vacuoles.`
          : `**1. Cell Theory & Classification**:
• Schleiden, Schwann, Virchow: All organisms consist of cells; all cells arise from pre-existing cells.
• Prokaryotes lack membrane-bound nucleus and organelles; Eukaryotes possess membrane-bound compartments.

**2. Organelle Specialization**:
• Mitochondria (ATP powerhouses), Endoplasmic Reticulum (protein/lipid synthesis), Golgi (packaging), Lysosomes (hydrolytic digestion).`,
        summary: isMS
          ? "The cell is the basic unit of life. Plant cells differ from animal cells by possessing a rigid cell wall, chloroplasts, and a large central vacuole."
          : "Eukaryotic cells compartmentalize metabolic pathways within membrane-bound organelles conforming to cell theory.",
        coreAnalogy: isMS
          ? "Think of a cell like a fortified medieval town: the cell wall is the stone city wall, the membrane is the guarded gate, cytoplasm is the bustling streets, and the nucleus is the king's castle."
          : "Think of a cell like an automated manufacturing plant with specialized packaging and power generation departments.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often claim animal cells have cell walls. Animal cells ONLY have a flexible cell membrane; only plant and fungal cells possess a rigid outer cell wall."
          : "Confusing smooth ER (lipid synthesis) with rough ER (ribosome-studded protein synthesis).",
        verificationProblem: isMS
          ? "Which organelle contains green chlorophyll for photosynthesis? (Answer: Chloroplast)."
          : "Which organelle is called the powerhouse of the cell? (Answer: Mitochondria).",
        diagramType: 'cell_structure',
        workedExample: {
          problem: isMS
            ? "List three visible structures that allow you to identify a cell under a microscope as a plant cell."
            : "Explain what happens to an animal cell placed in a hypotonic solution.",
          steps: isMS
            ? [
                "Step 1: Presence of a thick, rigid outer cell wall outside the membrane.",
                "Step 2: Presence of green disc-shaped plastids (chloroplasts).",
                "Step 3: Presence of a single, prominent, large central vacuole pushing the nucleus to the periphery."
              ]
            : [
                "Step 1: Surrounding solution has higher water potential than cell cytoplasm.",
                "Step 2: Water enters cell via endosmosis.",
                "Step 3: Lacking a rigid cell wall, animal cell swells and bursts (lysis)."
              ],
          result: isMS ? "Identified by cell wall, chloroplasts, and large central vacuole." : "Cell undergoes osmotic lysis."
        },
        realWorldUse: "Biotechnology, stem cell therapy, cancer research, and tissue engineering.",
        practiceQuiz: [
          {
            question: isMS ? "Which of the following structures is found in plant cells but NOT animal cells?" : "Which organelle contains digestive hydrolytic enzymes?",
            options: isMS ? ["Cell wall", "Cell membrane", "Nucleus", "Cytoplasm"] : ["Lysosome", "Ribosome", "Centrosome", "Plastid"],
            answerIndex: 0,
            explanation: isMS ? "Cell walls are found only in plant cells, bacteria, and fungi, providing rigid shape." : "Lysosomes contain acid hydrolases to break down waste and debris."
          }
        ]
      };
    }
  },

  // 13. Genetics, DNA Structure & Mendel's Laws
  {
    matcher: (text, subj) =>
      (subj.includes('BIO') || subj.includes('SCI') || subj.includes('LIFE')) &&
      (text.includes('GENETIC') || text.includes('DNA') || text.includes('MENDEL') || text.includes('HEREDITY') || text.includes('CHROMOSOME') || text.includes('ALLELE')),
    diagramType: 'dna_helix',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Nucleus} \\longrightarrow \\text{Chromosomes} \\longrightarrow \\text{Genes (Units of Heredity)} \\longrightarrow \\text{Inherited Traits}$"
        : "\\text{Monohybrid Phenotypic Ratio: } 3:1 \\quad | \\quad \\text{Dihybrid: } 9:3:3:1 \\quad | \\quad \\text{Base Pairs: A-T, G-C}";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Heredity & Genetics",
        cueQuestions: isMS
          ? [
              "What is heredity and how are traits passed from parents to offspring?",
              "What are chromosomes and genes?",
              "Distinguish between inherited traits and acquired traits with examples.",
              "Why do offspring resemble their parents but are not exact duplicates?"
            ]
          : [
              "State Mendel's Law of Segregation and Law of Independent Assortment.",
              "Construct a Punnett square for a monohybrid cross and state phenotypic and genotypic ratios.",
              "Describe Watson and Crick's double helix DNA structure and complementary base pairing.",
              "Explain how sex determination operates in human zygotes."
            ],
        mainNotes: isMS
          ? `**1. Heredity & Inherited Traits**:
• **Heredity**: The transmission of physical and biological characteristics (traits) from parents to offspring.
• **Inherited Traits**: Features determined by genetic material received from parents (eye color, hair type, blood group).
• **Acquired Traits**: Characteristics developed during an individual's lifetime through experience or environment that cannot be passed to offspring (e.g. musical skills, muscular physique, scars).

**2. Chromosomes and Genes**:
• Inside the nucleus of every cell are thread-like structures called **chromosomes**.
• Chromosomes carry **genes**, which are the fundamental units of inheritance that specify traits.
• In human body cells, there are 23 pairs of chromosomes (46 total).`
          : `**1. Mendelian Genetics**:
• Monohybrid cross (Tt × Tt) yields Phenotypic ratio $3:1$ and Genotypic ratio $1:2:1$.
• Dihybrid cross yields $9:3:3:1$.

**2. DNA Molecular Structure**:
• Double helix with antiparallel sugar-phosphate backbones and complementary nitrogenous base pairs: Adenine pairs with Thymine (A=T) and Guanine pairs with Cytosine (G≡C).`,
        summary: isMS
          ? "Heredity is the transfer of traits from parents to offspring via genes located on chromosomes inside cell nuclei."
          : "Mendel's laws govern trait segregation and independent assortment; DNA stores genetic code through complementary base pairing.",
        coreAnalogy: isMS
          ? "Think of your DNA like a comprehensive cookbook passed down through generations: chromosomes are the chapters, and genes are individual recipes determining specific traits."
          : "Think of DNA like a twisted spiral ladder: rungs are matching base pairs, and side rails are sugar-phosphate backbones.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often think acquired traits (like an athletic physique or learning a language) are inherited by children. Only changes in genetic DNA inside reproductive germ cells are passed to offspring."
          : "Failing to distinguish between phenotype (observable trait) and genotype (genetic allele combination).",
        verificationProblem: isMS
          ? "Where are genes located inside a eukaryotic cell? (Answer: On chromosomes inside the nucleus)."
          : "In a monohybrid cross between two heterozygous tall plants (Tt), what fraction of offspring will be dwarf (tt)? (Answer: 1/4 or 25%).",
        diagramType: 'dna_helix',
        workedExample: {
          problem: isMS
            ? "A student has brown eyes like her mother. Explain why this is an inherited trait and not an acquired trait."
            : "Using a Punnett square, determine offspring genotypes and phenotypes when crossing pure tall (TT) and dwarf (tt) pea plants.",
          steps: isMS
            ? [
                "Step 1: Eye color is determined by genes passed down through chromosomes from parent reproductive cells.",
                "Step 2: It is present in the genetic code from fertilization and cannot be altered by life practice.",
                "Step 3: Therefore, eye color is an inherited trait, not an acquired environmental skill."
              ]
            : [
                "Step 1: Gametes: TT produces T; tt produces t.",
                "Step 2: Cross: T × t ➔ All F1 offspring have genotype Tt.",
                "Step 3: Because T (tall) is dominant over t (dwarf), 100% of F1 offspring are phenotypically Tall."
              ],
          result: isMS ? "Eye color is an inherited genetic trait." : "100% heterozygous tall (Tt)."
        },
        realWorldUse: "Forensic DNA fingerprinting, genetic counseling, CRISPR gene editing, and agricultural crop hybridization.",
        practiceQuiz: [
          {
            question: isMS ? "Which of the following is an inherited trait rather than an acquired trait?" : "In a DNA molecule, which nitrogenous base pairs complementary with Adenine?",
            options: isMS ? ["Natural eye color", "Speaking French fluently", "Having a bicycle scar", "Playing the guitar"] : ["Thymine", "Cytosine", "Guanine", "Uracil"],
            answerIndex: 0,
            explanation: isMS ? "Eye color is encoded in cellular genes, whereas language and scars are acquired during life." : "Under Watson-Crick base pairing, Adenine pairs strictly with Thymine (A-T) via two hydrogen bonds."
          }
        ]
      };
    }
  },

  // 14. Ecology, Ecosystems & Trophic Pyramids
  {
    matcher: (text, subj) =>
      (subj.includes('BIO') || subj.includes('SCI') || subj.includes('LIFE') || subj.includes('ECO')) &&
      (text.includes('ECOSYSTEM') || text.includes('TROPHIC') || text.includes('FOOD CHAIN') || text.includes('ECOLOG') || text.includes('FOOD WEB')),
    diagramType: 'trophic_pyramid',
    generate: (concept, boardId) => {
      const isMS = isMiddleSchoolGrade(concept.gradeLevel);
      const structuralRule = isMS
        ? "$\\text{Sun} \\longrightarrow \\text{Producers (Plants)} \\longrightarrow \\text{Primary Consumers (Herbivores)} \\longrightarrow \\text{Secondary Consumers (Carnivores)}$"
        : "E_{n+1} = 0.10 \\times E_n \\quad | \\quad \\text{Lindeman 10\% Efficiency} \\quad | \\quad \\text{Biomagnification Upward}";

      return {
        conceptId: concept.id,
        gradeLevel: concept.gradeLevel,
        gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
        title: concept.title || "Ecosystems & Energy Flow",
        cueQuestions: isMS
          ? [
              "What is an ecosystem and what are its biotic and abiotic components?",
              "Explain the sequence of living organisms in a simple food chain.",
              "What is the difference between a food chain and a food web?",
              "Why are decomposers vital for nutrient recycling in nature?"
            ]
          : [
              "State Lindeman's 10% Law of Energy Transfer in trophic pyramids.",
              "Why do food chains rarely extend beyond 4 or 5 trophic levels?",
              "Contrast energy dissipation (decreasing 90%) with biological magnification (increasing concentration).",
              "Describe the impact of non-biodegradable pollutants like DDT on apex predators."
            ],
        mainNotes: isMS
          ? `**1. Ecosystem Components**:
• **Biotic Components**: All living organisms (plants, animals, fungi, bacteria).
• **Abiotic Components**: Non-living physical surroundings (soil, water, air, sunlight, temperature).

**2. Food Chains & Trophic Levels**:
• **Producers**: Green plants that produce food via photosynthesis using solar energy.
• **Primary Consumers (Herbivores)**: Animals that feed directly on plants (deer, rabbits, grasshoppers).
• **Secondary Consumers (Carnivores)**: Animals that eat herbivores (frogs, foxes).
• **Tertiary Consumers (Apex Predators)**: Top predators that hunt secondary consumers (lions, hawks).

**3. Food Webs & Decomposers**:
• In nature, multiple interconnected food chains form a **food web**, providing ecosystem stability.
• **Decomposers** (bacteria and fungi) break down dead plants and animals, returning essential nutrients to the soil.`
          : `**1. Lindeman's 10% Law of Energy Transfer**:
Only approximately **10%** of chemical energy available at one trophic level transfers to the next level:
$$E_{n+1} = 0.10 \\times E_n$$
90% of energy is dissipated as metabolic heat, cellular respiration, locomotion, and unconsumed waste.

**2. Biomagnification vs Energy Dissipation**:
• Energy dissipates exponentially downward ($10,000\\text{ J} \\to 1,000\\text{ J} \\to 100\\text{ J} \\to 10\\text{ J}$).
• Persistent non-biodegradable toxins (DDT, mercury) **biomagnify** exponentially upward, reaching toxic concentrations in apex carnivores.`,
        summary: isMS
          ? "Ecosystems transfer energy from the Sun through producers, herbivores, and carnivores in food chains and interconnected webs, recycled by decomposers."
          : "Energy transfer obeys the 10% law with 90% metabolic dissipation; persistent toxic chemicals biomagnify upward through trophic links.",
        coreAnalogy: isMS
          ? "Think of a food chain like a relay race where sunlight is the baton passed from green plants to herbivores and carnivores."
          : "Energy flows like water through a leaky pipe losing 90% at each joint, while toxins accumulate like sediment gathering in a reservoir.",
        structuralRule,
        curriculumTrap: isMS
          ? "Students often forget that energy flow in an ecosystem is strictly UNIDIRECTIONAL (from Sun to producers to consumers); it never cycles backward."
          : "Confusing bioaccumulation (in one organism over time) with biomagnification (increasing across trophic levels).",
        verificationProblem: isMS
          ? "If a grasshopper eats grass and a frog eats the grasshopper, what trophic role does the frog have? (Answer: Secondary Consumer)."
          : "If producers capture 10,000 J of energy, how much reaches the tertiary consumer? (Answer: 10,000 ➔ 1,000 ➔ 100 ➔ 10 J).",
        diagramType: 'trophic_pyramid',
        workedExample: {
          problem: isMS
            ? "Construct a 4-step food chain from a grassland habitat and identify the producer and top carnivore."
            : "Calculate energy at the 4th trophic level if phytoplankton capture 50,000 J of light energy.",
          steps: isMS
            ? [
                "Step 1: Producer: Grass (photosynthesizes food from sunlight).",
                "Step 2: Primary Consumer: Grasshopper (eats grass).",
                "Step 3: Secondary Consumer: Frog (eats grasshopper).",
                "Step 4: Tertiary Consumer / Top Carnivore: Hawk or Snake (eats frog)."
              ]
            : [
                "Step 1: 1st level (phytoplankton) = 50,000 J.",
                "Step 2: 2nd level (zooplankton) = 50,000 × 0.10 = 5,000 J.",
                "Step 3: 3rd level (small fish) = 5,000 × 0.10 = 500 J.",
                "Step 4: 4th level (large fish/hawk) = 500 × 0.10 = 50 J."
              ],
          result: isMS ? "Grass ➔ Grasshopper ➔ Frog ➔ Hawk." : "Energy at 4th level = 50 Joules."
        },
        realWorldUse: "Environmental conservation policy, fishery quota management, pesticide regulation, and vegetarian food sustainability.",
        practiceQuiz: [
          {
            question: isMS ? "Why is the energy flow in any food chain strictly unidirectional?" : "According to the 10% law, why do food chains rarely have more than 4 to 5 links?",
            options: isMS
              ? [
                  "Because energy dissipated as metabolic heat cannot be recaptured by the Sun or plants",
                  "Because herbivores produce their own solar energy",
                  "Because decomposers eat apex predators directly",
                  "Because energy increases at each level"
                ]
              : [
                  "Because by the 5th level, residual energy is insufficient to sustain viable consumer populations",
                  "Because apex predators refuse to eat plants",
                  "Because animals become physically too large",
                  "Because oxygen runs out at high trophic tiers"
                ],
            answerIndex: 0,
            explanation: isMS
              ? "Solar energy captured by plants flows through consumers and dissipates as heat; it can never cycle back to the Sun."
              : "With 90% loss per step, only 0.01% of initial energy remains at the 5th level, which is inadequate to sustain metabolic needs."
          }
        ]
      };
    }
  }
];

function synthesizeDynamicOERFallback(concept: CurriculumConcept, boardId: BoardId): CornellNotes {
  const board = normalizeBoard(boardId);
  const isMS = isMiddleSchoolGrade(concept.gradeLevel);
  const title = concept.title || concept.id;
  const unit = concept.unit || 'Core Pedagogical Foundations';
  const essence = concept.coreLogicEssence || `${title} establishes key relationships under standard educational frameworks.`;
  const domain = classifySubjectDomain(concept);
  const disciplineTitle = domain.disciplineTitle;

  // Accurate diagram type routing
  let diagramType = 'visual_model_pending';
  if (domain.isMath) {
    if (title.toUpperCase().includes('TRIANGLE') || title.toUpperCase().includes('TRIG') || title.toUpperCase().includes('POLYGON')) diagramType = 'triangle';
    else if (title.toUpperCase().includes('RATIONAL') || title.toUpperCase().includes('REAL') || title.toUpperCase().includes('CONTINUUM') || title.toUpperCase().includes('SURD') || title.toUpperCase().includes('DECIMAL DENSITY')) diagramType = isMS ? 'number_line' : 'real_continuum';
    else if (title.toUpperCase().includes('INT') || title.toUpperCase().includes('PRIME') || title.toUpperCase().includes('DIVISIB') || title.toUpperCase().includes('FRAC') || title.toUpperCase().includes('NUMBER LINE')) diagramType = 'number_line';
    else if (title.toUpperCase().includes('PARABOLA') || title.toUpperCase().includes('QUAD')) diagramType = 'parabola';
    else if (title.toUpperCase().includes('CIRCLE') || title.toUpperCase().includes('MENSUR')) diagramType = 'circle_geometry';
    else if ((title.toUpperCase().includes('PROB') || title.toUpperCase().includes('STAT')) && !title.toUpperCase().includes('TALLY') && !title.toUpperCase().includes('FREQUENCY') && !title.toUpperCase().includes('DATA TABLE')) diagramType = 'probability_curve';
    else if (title.toUpperCase().includes('LINEQ') || title.toUpperCase().includes('COORD') || title.toUpperCase().includes('LINEAR')) diagramType = 'coordinate_grid';
    else diagramType = 'visual_model_pending';
  } else if (domain.isPhys) {
    if (title.toUpperCase().includes('LIGHT') || title.toUpperCase().includes('OPTIC') || title.toUpperCase().includes('RAY') || title.toUpperCase().includes('MIRROR')) diagramType = 'ray_optics';
    else if (title.toUpperCase().includes('MOTION') || title.toUpperCase().includes('SPEED-TIME') || title.toUpperCase().includes('VELOCITY-TIME')) diagramType = 'motion_graph';
    else if (title.toUpperCase().includes('CIRCUIT') || title.toUpperCase().includes('ELECTRIC') || title.toUpperCase().includes('OHM')) diagramType = 'circuit_diagram';
    else if (title.toUpperCase().includes('WAVE') || title.toUpperCase().includes('SOUND') || title.toUpperCase().includes('PENDULUM')) diagramType = 'wave_frequency';
    else if (title.toUpperCase().includes('HEAT') || title.toUpperCase().includes('THERMAL') || title.toUpperCase().includes('CALORIMETR')) diagramType = 'energy_transfer';
    else if (title.toUpperCase().includes('MAG') && title.toUpperCase().includes('DIP')) diagramType = 'magnetic_dip';
    else diagramType = 'visual_model_pending';
  } else if (domain.isChem) {
    if (title.toUpperCase().includes('ATOM') || title.toUpperCase().includes('BOHR') || title.toUpperCase().includes('ELECTRON CONFIG')) diagramType = 'bohr_atom';
    else if (title.toUpperCase().includes('BOND') || title.toUpperCase().includes('COVALENT') || title.toUpperCase().includes('IONIC')) diagramType = 'chemical_bonding';
    else if (title.toUpperCase().includes('STATE') || title.toUpperCase().includes('MATTER') || title.toUpperCase().includes('SOLID') || title.toUpperCase().includes('GAS')) diagramType = 'states_of_matter';
    else if (title.toUpperCase().includes('ACID') || title.toUpperCase().includes('BASE') || title.toUpperCase().includes('PH')) diagramType = 'ph_scale';
    else diagramType = 'visual_model_pending';
  } else if (domain.isBio) {
    if (title.toUpperCase().includes('HEART') || title.toUpperCase().includes('CIRCULAT') || title.toUpperCase().includes('CARDIO') || title.toUpperCase().includes('BLOOD FLOW')) diagramType = 'heart_circulation';
    else if (title.toUpperCase().includes('DIGEST') || title.toUpperCase().includes('ALIMENTARY') || title.toUpperCase().includes('STOMACH')) diagramType = 'digestive_system';
    else if (title.toUpperCase().includes('BREATH') || title.toUpperCase().includes('GAS EXCHANGE') || (title.toUpperCase().includes('RESPIRAT') && !title.toUpperCase().includes('ATP') && !title.toUpperCase().includes('CELL'))) diagramType = 'respiratory_system';
    else if (title.toUpperCase().includes('XYLEM') || title.toUpperCase().includes('PHLOEM') || title.toUpperCase().includes('TRANSPIRAT')) diagramType = 'plant_transport';
    else if (title.toUpperCase().includes('PHOTO') || title.toUpperCase().includes('CHLORO')) diagramType = 'photosynthesis_cycle';
    else if (title.toUpperCase().includes('DNA') || title.toUpperCase().includes('GENE')) diagramType = 'dna_helix';
    else if (title.toUpperCase().includes('ATP') || title.toUpperCase().includes('GLYCOLYS')) diagramType = 'cellular_respiration';
    else if ((title.toUpperCase().includes('ECO') || title.toUpperCase().includes('TROPHIC') || title.toUpperCase().includes('FOOD WEB')) && !title.toUpperCase().includes('VITAMIN') && !title.toUpperCase().includes('NUTRI') && !title.toUpperCase().includes('DIET')) diagramType = 'trophic_pyramid';
    else if (title.toUpperCase().includes('CELL') && !title.toUpperCase().includes('BLOOD')) diagramType = 'cell_structure';
    else diagramType = 'visual_model_pending';
  }

  // Structural Rule: Strictly Subject and Grade Isolated
  let structuralRule = '';
  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    structuralRule = isMS
      ? `$\\text{Theme / Moral} \\longleftarrow \\text{Narrative Arc } (\\text{Exposition} \\to \\text{Climax} \\to \\text{Resolution}) \\longleftarrow \\text{Character Motivation}$`
      : `$\\text{Literary Analysis: } \\text{Textual Evidence} + \\text{Stylistic Device (Tone / Metaphor)} \\Longrightarrow \\text{Thematic Purpose}$`;
  } else if (domain.isSocialScience) {
    if (domain.isHistory) {
      structuralRule = `$\\text{Historical Invariant: } \\text{Pre-conditions / Causes} \\longrightarrow \\text{Key Movement / Milestone} \\longrightarrow \\text{Institutional Transformation}$`;
    } else if (domain.isGeography) {
      structuralRule = `$\\text{Geographical Invariant: } \\text{Physical / Climatic Factors} + \\text{Human Geography} \\Longrightarrow \\text{Spatial Distribution \\& Sustainability}$`;
    } else if (domain.isCivics) {
      structuralRule = `$\\text{Constitutional Invariant: } \\text{Constitutional Framework} \\longleftrightarrow \\text{Checks \\& Balances} \\longleftrightarrow \\text{Citizen Democratic Rights}$`;
    } else if (domain.isEconomics) {
      structuralRule = `$\\text{Economic Invariant: } \\text{Resource Allocation} + \\text{Market Dynamics} \\Longrightarrow \\text{Sustainable Development \\& Welfare}$`;
    } else {
      structuralRule = `$\\text{Social Science Invariant: } \\text{Socio-Historical Context} \\longrightarrow \\text{Civic \\& Economic Dynamics} \\longrightarrow \\text{Democratic Development}$`;
    }
  } else if (domain.isCommerce) {
    if (domain.isAccountancy) {
      structuralRule = `$\\text{Debit (Assets / Expenses Increase)} = \\text{Credit (Liabilities / Capital / Revenue Increase)} \\quad | \\quad \\text{Assets} = \\text{Liabilities} + \\text{Capital}$`;
    } else if (domain.isBusinessStudies) {
      structuralRule = `$\\text{Management Cycle: } \\text{Planning} \\longrightarrow \\text{Organizing} \\longrightarrow \\text{Staffing} \\longrightarrow \\text{Directing} \\longrightarrow \\text{Controlling} \\quad | \\quad \\text{Efficiency} + \\text{Effectiveness}$`;
    } else {
      structuralRule = `$\\text{Commerce Invariant: } \\text{Commercial Transaction} \\longrightarrow \\text{Financial Accountability} \\longrightarrow \\text{Business Sustainability}$`;
    }
  } else if (domain.isComputerScience) {
    structuralRule = `$\\text{Computational Logic: } \\text{Algorithm Input} \\longrightarrow \\text{Deterministic Execution } [\\mathcal{O}(n) \\text{ Time}, \\mathcal{O}(1) \\text{ Space}] \\longrightarrow \\text{Verified Output}$`;
  } else if (domain.isBio) {
    if (isMS) {
      structuralRule = `$\\text{Input Flow} \\longrightarrow \\text{Organ System Regulation} \\longrightarrow \\text{Functional Biological Output}$`;
    } else {
      const safeTitle = (title || '').replace(/&/g, '\\&');
      structuralRule = `$\\text{Biological Principle of } \\text{${safeTitle}}: \\quad \\text{Homeostatic Equilibrium } \\Longleftrightarrow \\text{Adaptive Feedback Loop}$`;
    }
  } else if (domain.isMath) {
    const isDataOrStat =
      title.toUpperCase().includes('TALLY') ||
      title.toUpperCase().includes('FREQUENCY') ||
      title.toUpperCase().includes('DATA') ||
      unit.toUpperCase().includes('DATA') ||
      title.toUpperCase().includes('STAT') ||
      title.toUpperCase().includes('PROB');

    if (isDataOrStat) {
      if (title.toUpperCase().includes('TALLY') || title.toUpperCase().includes('FREQUENCY') || title.toUpperCase().includes('TABLE')) {
        structuralRule = `$\\text{Frequency Representation: } f_i = \\sum_{j} \\text{tally}_{ij} \\quad | \\quad \\sum f_i = N \\quad (\\text{Total Sample Size})$`;
      } else if (title.toUpperCase().includes('PROB')) {
        structuralRule = `P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of possible outcomes}} = \\frac{n(E)}{n(S)}`;
      } else if (title.toUpperCase().includes('MEAN') || title.toUpperCase().includes('AVERAGE') || title.toUpperCase().includes('MEDIAN')) {
        structuralRule = `\\text{Mean: } \\bar{x} = \\frac{\\sum x_i}{N} \\quad | \\quad \\text{Median: Middle value of ordered dataset}`;
      } else {
        structuralRule = `\\text{Empirical Data Matrix: } \\text{Observations} \\longrightarrow \\text{Frequency Distribution Table} \\quad | \\quad \\sum f = N`;
      }
    } else {
      const searchStr = `${concept.id} ${title} ${unit}`.toUpperCase();
      const isGeom =
        searchStr.includes('LINE') ||
        searchStr.includes('SEGMENT') ||
        searchStr.includes('POINT') ||
        searchStr.includes('RAY') ||
        searchStr.includes('ANGLE') ||
        searchStr.includes('GEOM');

      if (isGeom) {
        if (searchStr.includes('SEGMENT')) {
          structuralRule = `$\\text{Line Segment } \\overline{AB}: \\quad 2 \\text{ Endpoints } (A, B) \\quad | \\quad \\text{Length } AB = \\text{Finite and Measurable}$`;
        } else if (searchStr.includes('POINT') && !searchStr.includes('LINE')) {
          structuralRule = `$\\text{Point } P: \\quad \\text{Location in Space} \\quad | \\quad \\text{Dimension} = 0 \\; (\\text{No Length, Breadth, or Height})$`;
        } else if (searchStr.includes('RAY')) {
          structuralRule = `$\\text{Ray } \\overrightarrow{AB}: \\quad 1 \\text{ Fixed Endpoint (Origin } A\\text{)} \\quad | \\quad \\text{Extends Infinitely Through } B$`;
        } else if (searchStr.includes('LINE') && !searchStr.includes('SEGMENT') && !searchStr.includes('NUMBER LINE')) {
          structuralRule = `$\\text{Line } \\overleftrightarrow{AB}: \\quad \\text{Extends Infinitely in Both Directions} \\quad | \\quad 0 \\text{ Endpoints}$`;
        } else if (searchStr.includes('ANGLE')) {
          structuralRule = `$\\text{Angle } \\angle ABC: \\quad 2 \\text{ Rays } (\\overrightarrow{BA}, \\overrightarrow{BC}) \\text{ meeting at Vertex } B$`;
        } else {
          structuralRule = isMS
            ? `$\\text{Geometric Invariant: } \\text{Spatial Structure } \\mathcal{S} \\quad | \\quad \\text{Preserved Under Rigid Motion}$`
            : `$\\forall \\text{ figure } \\mathcal{F}: \\; \\text{Area} > 0 \\quad | \\quad \\angle A + \\angle B + \\angle C = 180^\\circ$`;
        }
      } else {
        structuralRule = isMS
          ? `$\\text{Mathematical Invariant: } \\text{LHS} \\equiv \\text{RHS} \\quad | \\quad x + a = b \\iff x = b - a$`
          : `$\\forall x \\in \\mathcal{D}: \\; f(x) = y \\quad \\Longleftrightarrow \\quad \\text{LHS} \\equiv \\text{RHS} \\quad | \\quad \\Delta y = m \\Delta x$`;
      }
    }
  } else if (domain.isPhys) {
    structuralRule = isMS
      ? `$\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} \\quad | \\quad \\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}} \\quad | \\quad \\text{Work} = \\text{Force} \\times \\text{Distance}$`
      : `$\\sum \\vec{F} = m \\vec{a} \\quad | \\quad v = u + at \\quad | \\quad V = I \\times R$`;
  } else if (domain.isChem) {
    structuralRule = isMS
      ? `$\\text{Chemical Reaction Invariant: } \\text{Reactants} \\longrightarrow \\text{Products} \\quad | \\quad \\text{Mass of Reactants} = \\text{Mass of Products}$`
      : `$\\text{Chemical Invariant: } \\text{Reactants} \\longrightarrow \\text{Products} \\quad | \\quad \\sum m_{\\text{reactants}} = \\sum m_{\\text{products}} \\quad | \\quad n = \\frac{m}{M}$`;
  } else {
    structuralRule = `$\\text{Core Invariant for } \\text{${(title || '').replace(/&/g, '\\&')}} \\implies \\text{System Equilibrium Satisfied}$`;
  }

  // Board-Specific Analogy & Intuition
  let coreAnalogy = '';
  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    if (board === 'IB_MYP') {
      coreAnalogy = `Literary & Global Perspective: In ${title}, examine how character choices, dilemmas, and narrative structures reflect universal human experiences and global perspectives.`;
    } else if (board === 'CAMBRIDGE') {
      coreAnalogy = `Textual & Stylistic Inquiry: Analyze how the writer crafts language, narrative pacing, and structural tension in ${title} to evoke nuanced reader responses and explore deeper subtext.`;
    } else {
      coreAnalogy = `NCERT Narrative Intuition: Think of ${title} as a cohesive literary tapestry where character decisions, emotional turning points, and moral insights reveal the author's underlying message.`;
    }
  } else if (domain.isSocialScience) {
    if (board === 'IB_MYP') {
      coreAnalogy = `Individuals & Societies Framing: Consider ${title} within dynamic historical and social systems, examining how institutional policies and geographic realities shape community development.`;
    } else if (board === 'CAMBRIDGE') {
      coreAnalogy = `Empirical & Historical Inquiry: Examine historical source evidence, chronological developments, and socio-economic cause-and-effect relationships in ${title} with systematic precision.`;
    } else {
      coreAnalogy = `NCERT Social Science Intuition: Think of ${title} as an interconnected framework of historical turning points, spatial distributions, and constitutional institutions that guide society.`;
    }
  } else if (domain.isCommerce) {
    coreAnalogy = `Business & Financial Intuition: In ${title}, every commercial transaction and organizational decision operates under structured principles ensuring financial accountability, operational efficiency, and long-term sustainability.`;
  } else if (domain.isComputerScience) {
    coreAnalogy = `Computational Thinking Intuition: In ${title}, decompose problems into structured instructions, predictable data transformations, and verified algorithmic steps.`;
  } else {
    if (board === 'IB_MYP') {
      coreAnalogy = `Global Context & Systems Framing: Consider ${title} as an interconnected node within a broader dynamic system. Any localized change initiates balanced feedback loops across environmental, biological, or technological constraints.`;
    } else if (board === 'CAMBRIDGE') {
      coreAnalogy = `Empirical Practical Observation: In scientific inquiry, ${title} is demonstrated through measurable physical variables. When experimental parameters are altered systematically, the system responds in predictable, repeatable ratios conforming to SI standards.`;
    } else {
      coreAnalogy = `NCERT Intuition: Think of ${title} like everyday balance and order: foundational rules govern how each component interacts predictably, ensuring consistency from fundamental textbook definitions to real-world applications.`;
    }
  }

  // Board-Specific Cues
  let cueQuestions: string[] = [];
  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    cueQuestions = [
      `What is the central theme and underlying message conveyed in ${title}?`,
      `Analyze the key motivations, conflicts, and transformations of the central characters in ${title}.`,
      `How does the author employ literary devices (imagery, irony, symbolism, tone) to enrich ${title}?`,
      `Cite specific textual evidence demonstrating how the primary conflict in ${title} is resolved.`
    ];
  } else if (domain.isSocialScience) {
    cueQuestions = [
      `What are the foundational historical, geographic, or institutional preconditions of ${title}?`,
      `Explain the sequential causes, milestones, and long-term consequences associated with ${title}.`,
      `How do the principles of ${title} influence contemporary society and governance?`,
      `What statutory terms, dates, constitutional articles, or geographical factors must be included in examination answers on ${title}?`
    ];
  } else if (domain.isCommerce) {
    cueQuestions = [
      `What are the foundational accounting standards or managerial principles governing ${title}?`,
      `Explain step-by-step how transactions, ledger postings, or operational plans are executed in ${title}.`,
      `What statutory guidelines, format requirements, or balance checks apply to ${title}?`,
      `What common errors in classification or calculation lead to mark deductions in ${title}?`
    ];
  } else if (domain.isComputerScience) {
    cueQuestions = [
      `What is the fundamental logic, algorithmic objective, and data structure utilized in ${title}?`,
      `Explain the step-by-step implementation, syntax, or control flow used in ${title}.`,
      `What are the time/space complexities or boundary conditions for ${title}?`,
      `What common syntax, indexing, or logical pitfalls should be avoided when implementing ${title}?`
    ];
  } else {
    if (board === 'IB_MYP') {
      cueQuestions = [
        `Factual Inquiry: What are the fundamental characteristics and definitions of ${title}?`,
        `Conceptual Inquiry: How does the underlying structure or balance of ${title} support systemic equilibrium?`,
        `Debatable Inquiry: To what extent do modern developments in ${title} pose ethical or environmental challenges?`,
        `Criterion D Reflection: How can scientific understanding of ${title} address real-world global challenges?`
      ];
    } else if (board === 'CAMBRIDGE') {
      cueQuestions = isMS
        ? [
            `State the primary definition and rule governing ${title}.`,
            `Describe the observable steps and features associated with ${title}.`,
            `Explain why the governing principles of ${title} apply in everyday situations.`,
            `Calculate the result when standard numerical values are applied to ${title}.`
          ]
        : [
            `State the fundamental principle governing ${title}.`,
            `Describe the observable experimental phenomena and apparatus associated with ${title}.`,
            `Explain the step-by-step mechanism connecting causes to outcomes in ${title}.`,
            `Suggest how experimental errors can be minimized when investigating ${title}.`
          ];
    } else {
      cueQuestions = isMS
        ? [
            `State the standard NCERT definition and primary rule of ${title}.`,
            `Explain step-by-step how to solve or analyze questions on ${title}.`,
            `Give a real-world example illustrating the importance of ${title}.`,
            `What common mistakes should be avoided when answering questions on ${title}?`
          ]
        : [
            `State the standard NCERT definition and primary concepts of ${title}.`,
            `Derive or explain the step-by-step procedure for analyzing ${title}.`,
            `Why is this principle essential within the scope of ${unit}?`,
            `What common student misconceptions lead to mark deductions in ${board} examinations?`
          ];
    }
  }

  // Main Notes adapted to grade, domain, and board
  let mainNotes = '';
  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    mainNotes = `**1. Plot Overview & Setting Context (${title})**:
• **Context**: ${essence}
• **Setting & Atmosphere**: Establishes background circumstances, cultural context, and narrative tone.
• **Narrative Exposition**: Introduces primary characters, underlying tensions, and initial circumstances.

**2. Character Dynamics & Central Conflict**:
• **Motivations & Flaws**: Examines character choices, interpersonal interactions, and emotional development.
• **Pivotal Turning Point**: The crucial event or decision that propels the story toward its climax.

**3. Thematic Synthesis & Literary Devices**:
• **Core Themes**: Explores underlying moral, philosophical, or socio-cultural messages.
• **Literary Craft**: Meaningful use of imagery, symbolism, character contrast, and dialogue nuance.`;
  } else if (domain.isSocialScience) {
    mainNotes = `**1. Foundational Context & Setting (${title})**:
• **Foundational Principle**: ${essence}
• **Preconditions & Framework**: Key historical milestones, geographic resource classifications, or constitutional principles.

**2. Key Developments & Systematic Processes**:
• **Sequential Dynamics**: Structured phases, institutional operations, or spatial distributions.
• **Statutory Terminology**: Precise NCERT terminology, timeline dates, and governance mechanisms.

**3. Impact, Analysis & Contemporary Significance**:
• **Socio-Economic & Civic Outcomes**: Long-term historical legacy, policy impact, and citizen welfare.
• **Examination Focus**: Structured point-wise presentation adhering to CBSE marking criteria.`;
  } else if (domain.isCommerce) {
    mainNotes = `**1. Foundational Principles & Regulatory Framework (${title})**:
• **Foundational Principle**: ${essence}
• **Statutory Guidelines**: GAAP / Ind-AS accounting standards, administrative management principles, or legal provisions.

**2. Procedural Execution & Analytical Methods**:
• **Operational Methodology**: Structured financial entries, ledger balancing, managerial planning cycles, or ratio analysis.
• **Core Invariants**: Dual aspect concept, asset-liability equilibrium, and organizational efficiency.

**3. Examination Applications & Problem Solving**:
• **Marking Rubrics**: Structured presentation with proper column headings, working notes, and formal reconciliation.`;
  } else if (domain.isComputerScience) {
    mainNotes = `**1. Core Principles & Algorithmic Foundations (${title})**:
• **Foundational Principle**: ${essence}
• **Theoretical Architecture**: Data representations, computational paradigms, and logical constructs.

**2. Step-by-Step Implementation & Logic Flow**:
• **Algorithmic Flow**: Clear execution steps, control structures, and function signatures.
• **Efficiency & Constraints**: Time complexity, space complexity, and boundary condition handling.

**3. Examination Applications & Debugging**:
• **Implementation Standards**: Syntax precision, variable naming conventions, and edge-case testing.`;
  } else {
    mainNotes = board === 'IB_MYP'
      ? `**1. Inquiry Framework & Key Concepts (${title})**:
• **Core Concept**: ${essence}
• **System Relationships**: Investigates how discrete variables interact within balanced ecological, physical, or algebraic frameworks.
• **Criterion A & B Reflection**: Formulates hypotheses, observes causal mechanisms, and critically evaluates scientific assertions.`
      : board === 'CAMBRIDGE'
      ? `**1. Learning Objectives & Command Words (${title})**:
• **State**: Key definitions and foundational scientific laws under Cambridge ${isMS ? 'Lower Secondary' : 'IGCSE'} standards.
• **Describe**: Step-by-step physical or biological processes: ${essence}
• **Explain**: Underlying scientific principles and empirical mechanisms with strict SI metric precision.`
      : `**1. NCERT Core Concepts (${title})**:
• **Foundational Principle**: ${essence}
• **Step-by-Step Derivation**: Clear, numbered procedural explanations connecting known parameters to system outcomes.
• **Examination Focus**: Precision in terminology and adherence to official CBSE Class ${concept.gradeLevel} marking criteria.`;
  }

  // Curriculum Trap
  let curriculumTrap = '';
  if (board === 'CBSE') {
    curriculumTrap = generateCBSEExamTrapsAndMarkingPatterns(concept, null);
  } else if (board === 'CAMBRIDGE') {
    curriculumTrap = generateCambridgeMarkSchemeGuidance(concept, null);
  } else {
    curriculumTrap = generateIBMYPInquiryAndCriterion(concept, null);
  }

  // Verification problem & worked example
  let verificationProblem = '';
  let workedExample: { problem: string; steps: string[]; result: string };

  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    verificationProblem = `Identify the pivotal turning point in ${title} and verify how textual evidence supports the central theme.`;
    workedExample = {
      problem: `Explain how the central conflict in ${title} illustrates the author's primary theme. Support your answer with two textual references.`,
      steps: [
        `Step 1: State the core theme and identify the central character conflict in ${title}.`,
        `Step 2: Cite two specific episodes or dialogue interactions illustrating this conflict.`,
        `Step 3: Conclude by explaining how the resolution reinforces the underlying moral or literary message.`
      ],
      result: `Structured analytical interpretation supported by textual evidence for ${title}.`
    };
  } else if (domain.isSocialScience) {
    verificationProblem = `Verify the chronological sequence, key terminology, and cause-effect relationships governing ${title}.`;
    workedExample = {
      problem: `Analyze three primary factors or causes associated with ${title} and state their historical/social significance.`,
      steps: [
        `Step 1: State the historical/geographic context and background conditions of ${title}.`,
        `Step 2: Detail three numbered factors using statutory NCERT terminology.`,
        `Step 3: Summarize the long-term impact on society, governance, or resource sustainability.`
      ],
      result: `Point-wise structured analysis with statutory terminology for ${title}.`
    };
  } else if (domain.isCommerce) {
    verificationProblem = `Verify that accounting entries adhere to dual aspect rules and managerial frameworks for ${title}.`;
    workedExample = {
      problem: `Apply the governing commercial/accounting principles of ${title} to analyze a standard business scenario.`,
      steps: [
        `Step 1: Identify all affected accounts or managerial parameters in ${title}.`,
        `Step 2: Apply the governing debit/credit rules or management functions systematically.`,
        `Step 3: State the final balanced ledger entry or strategic recommendation with proper formats.`
      ],
      result: `Standard accounting/managerial solution verified for ${title}.`
    };
  } else if (domain.isComputerScience) {
    verificationProblem = `Trace the logic flow and verify boundary conditions for ${title}.`;
    workedExample = {
      problem: `Write the step-by-step logic or algorithm to process inputs adhering to ${title}.`,
      steps: [
        `Step 1: Define input specifications and initialize required data structures.`,
        `Step 2: Execute the core loop or logical conditions handling edge cases.`,
        `Step 3: Return verified output adhering to optimal time and space constraints.`
      ],
      result: `Algorithm verified with zero boundary-case errors for ${title}.`
    };
  } else {
    verificationProblem = `Verify the governing relationship of ${title} by substituting benchmark test parameters and checking if system balance is preserved.`;
    workedExample = {
      problem: `Apply the principles of ${title} to solve a standard benchmark question under ${board} curriculum standards.`,
      steps: [
        "Step 1: Identify and list all given parameters, converting values into standard base units.",
        "Step 2: Select the governing relationship or process connecting known variables to the target unknown.",
        "Step 3: Perform step-by-step derivation or logical analysis adhering to board marking rubrics.",
        "Step 4: Verify the final solution for magnitude reasonability and proper dimensional units."
      ],
      result: `Successfully derived and verified the benchmark solution for ${title}.`
    };
  }

  // Real world use
  let realWorldUse = '';
  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    realWorldUse = 'Applied in creative writing, literary criticism, professional communications, journalism, and scriptwriting.';
  } else if (domain.isSocialScience) {
    realWorldUse = 'Applied in public administration, historical research, urban planning, environmental policy, and legal studies.';
  } else if (domain.isCommerce) {
    realWorldUse = 'Applied across corporate finance, chartered accountancy, business entrepreneurship, and operational management.';
  } else if (domain.isComputerScience) {
    realWorldUse = 'Applied in software engineering, database administration, artificial intelligence, and cybersecurity.';
  } else {
    realWorldUse = `Applied extensively across modern ${disciplineTitle.toLowerCase()} engineering, experimental scientific modeling, and technological systems.`;
  }

  // Practice Quiz
  const practiceQuiz = domain.isEnglish || domain.isHindi || domain.isSanskrit
    ? [
        {
          question: `What is the most effective approach for answering analytical questions on ${title} in board examinations?`,
          options: [
            "Providing specific textual references, character citations, and maintaining consistent grammatical tense",
            "Writing general opinions without citing episodes from the chapter",
            "Using conversational slang instead of formal literary terms",
            "Exceeding prescribed word limits by repeating the summary multiple times"
          ],
          answerIndex: 0,
          explanation: "Examiners award marks for precise textual evidence, accurate literary terminology, and strict adherence to word limits."
        },
        {
          question: `How should character motivations in ${title} be evaluated?`,
          options: [
            "By analyzing character actions, turning points, and dialogue in direct relation to the central theme",
            "By judging characters strictly on personal biases without textual support",
            "By summarizing only the first paragraph of the story",
            "By assuming character traits that have no basis in the text"
          ],
          answerIndex: 0,
          explanation: "Valid literary analysis requires connecting character actions directly to the narrative arc and thematic message."
        }
      ]
    : domain.isSocialScience
    ? [
        {
          question: `What is the required standard for answering 3-mark and 5-mark questions on ${title} in CBSE examinations?`,
          options: [
            "Writing distinct, numbered points with underlined sub-headings and statutory NCERT terms",
            "Writing a single unstructured narrative paragraph with no dates or terms",
            "Omitting geographic requirements or historical years to save time",
            "Leaving map questions unlabelled"
          ],
          answerIndex: 0,
          explanation: "CBSE marking schemes award maximum credit to structured, point-wise answers containing statutory NCERT terms and clear sub-headings."
        }
      ]
    : [
        {
          question: `What is the most critical procedural requirement when presenting solutions for ${title} under ${board} examinations?`,
          options: [
            "Showing clear, numbered procedural steps and specifying correct units",
            "Writing only the final numerical answer without derivation",
            "Omitting intermediate algebraic transformations to save space",
            "Guessing magnitude without verifying boundary constraints"
          ],
          answerIndex: 0,
          explanation: "Examination boards award explicit method marks for structured derivation, clear reasoning, and dimensional accuracy."
        },
        {
          question: `How are boundary conditions and units handled in ${title}?`,
          options: [
            "All quantities must be converted to standard consistent units before applying governing formulas",
            "Units can be arbitrarily mixed without mathematical impact",
            "Units are only required for the final numerical answer",
            "Negative signs can be omitted during intermediate calculation"
          ],
          answerIndex: 0,
          explanation: "Consistent standard units prevent magnitude errors and ensure that calculated answers remain dimensionally valid."
        }
      ];

  return {
    conceptId: concept.id,
    gradeLevel: concept.gradeLevel,
    gradeTier: isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY',
    title,
    cueQuestions,
    mainNotes,
    summary: `${title} constitutes an essential topic within ${unit}, governing key relationships in ${disciplineTitle} through verifiable educational principles.`,
    coreAnalogy,
    structuralRule,
    curriculumTrap,
    verificationProblem,
    diagramType,
    workedExample,
    realWorldUse,
    practiceQuiz
  };
}

export function auditAndSelfCorrectNotes(
  notes: CornellNotes,
  concept: CurriculumConcept,
  boardId: BoardId | string
): CornellNotes {
  const board = normalizeBoard(boardId);
  const isMS = isMiddleSchoolGrade(concept.gradeLevel);
  const titleUpper = (concept.title || concept.id).toUpperCase();
  const unitUpper = (concept.unit || '').toUpperCase();
  const domain = classifySubjectDomain(concept);

  // --- PATCH A: LaTeX Syntax Integrity ---
  notes.structuralRule = sanitizeKatexString(notes.structuralRule).replace(/(?<!\\)\$/g, '').trim();
  notes.mainNotes = sanitizeNotesText(notes.mainNotes);
  notes.coreAnalogy = sanitizeNotesText(notes.coreAnalogy);
  notes.curriculumTrap = sanitizeNotesText(notes.curriculumTrap);
  notes.verificationProblem = sanitizeNotesText(notes.verificationProblem);
  notes.summary = sanitizeNotesText(notes.summary);
  if (notes.realWorldUse) {
    notes.realWorldUse = sanitizeNotesText(notes.realWorldUse);
  }
  if (notes.workedExample) {
    notes.workedExample.problem = sanitizeNotesText(notes.workedExample.problem);
    notes.workedExample.steps = notes.workedExample.steps.map(s => sanitizeNotesText(s));
    notes.workedExample.result = sanitizeNotesText(notes.workedExample.result);
  }
  if (notes.practiceQuiz) {
    notes.practiceQuiz = notes.practiceQuiz.map(q => ({
      ...q,
      question: sanitizeNotesText(q.question),
      options: q.options.map(o => sanitizeNotesText(o)),
      explanation: sanitizeNotesText(q.explanation)
    }));
  }

  // --- PEDAGOGICAL BOUNDARY BARRIER (GRADE LOCKS) ---
  if (isMS) {
    // 1. Purge College / NEET Jargon from Middle School
    const jargonReplacements: [RegExp, string][] = [
      [/fluid mosaic model/gi, 'flexible cell membrane barrier'],
      [/oxidative phosphorylation/gi, 'cellular energy release'],
      [/chemiosmosis/gi, 'cellular ATP generation'],
      [/atp synthase rotor/gi, 'cellular energy engine'],
      [/water potential equation[s]?/gi, 'water absorption balance'],
      [/\\Delta\\s*\\Psi\s*=\s*\\Psi_s\s*\+\s*\\Psi_p/gi, 'Water Absorption Balance'],
      [/phospholipid bilayer thermodynamics/gi, 'cell membrane structure'],
      [/closed discrete group/gi, 'number line system'],
      [/vector space[s]?/gi, 'directional number line system'],
      [/Dedekind completeness/gi, 'density of numbers'],
      [/Dedekind-Cantor completeness axiom/gi, 'number line continuity']
    ];
    for (const [re, rep] of jargonReplacements) {
      notes.mainNotes = notes.mainNotes.replace(re, rep);
      notes.structuralRule = notes.structuralRule.replace(re, rep);
      notes.coreAnalogy = notes.coreAnalogy.replace(re, rep);
      notes.summary = notes.summary.replace(re, rep);
      notes.cueQuestions = notes.cueQuestions.map(q => q.replace(re, rep));
    }

    // 2. Purge Formal Set Theory Notation from Middle School (Class 6-8)
    const setReplacements: [RegExp, string][] = [
      [/\\mathbb\{N\}\s*\\subset\s*\\mathbb\{W\}\s*\\subset\s*\\mathbb\{Z\}(\s*\\subset\s*\\mathbb\{Q\}\s*\\subset\s*\\mathbb\{R\})?/g, '\\text{Natural Numbers, Whole Numbers, Integers, Fractions}'],
      [/\\mathbb\{Z\}/g, '\\text{Integers}'],
      [/\\mathbb\{Q\}/g, '\\text{Rational Numbers}'],
      [/\\mathbb\{R\}/g, '\\text{Real Numbers}'],
      [/\\mathbb\{N\}/g, '\\text{Natural Numbers}'],
      [/\\mathbb\{W\}/g, '\\text{Whole Numbers}'],
      [/set of Integers \(ℤ\)/g, 'integers'],
      [/Integers \(ℤ\)/g, 'Integers'],
      [/Natural Numbers \(ℕ\)/g, 'Natural Numbers'],
      [/Real Numbers \(ℝ\)/g, 'Real Numbers'],
      [/Rational Numbers \(ℚ\)/g, 'Rational Numbers'],
      [/ℝ/g, 'Real Numbers'],
      [/ℤ/g, 'Integers'],
      [/ℚ/g, 'Rational Numbers'],
      [/ℕ/g, 'Natural Numbers'],
      [/𝕎/g, 'Whole Numbers'],
      [/\\in\s*\\text\{Integers\}/g, 'is an integer']
    ];
    for (const [re, rep] of setReplacements) {
      notes.structuralRule = notes.structuralRule.replace(re, rep);
      notes.mainNotes = notes.mainNotes.replace(re, rep);
      notes.curriculumTrap = notes.curriculumTrap.replace(re, rep);
      notes.summary = notes.summary.replace(re, rep);
      notes.cueQuestions = notes.cueQuestions.map(q => q.replace(re, rep));
    }

    // 3. Purge Trigonometric Ratios (sin/cos/tan) from Middle School Math/Science
    if (notes.structuralRule.includes('\\sin') || notes.structuralRule.includes('\\cos') || notes.structuralRule.includes('\\tan')) {
      notes.structuralRule = `\\angle A + \\angle B + \\angle C = 180^\\circ \\quad | \\quad a + b > c \\quad | \\quad \\text{Area} = \\frac{1}{2} b h`;
      notes.mainNotes = notes.mainNotes
        .replace(/\*\*4\.\s*Primary Trigonometric Ratios\*\*:[^]*?(\n\n|\n?$)/g, '')
        .replace(/\\sin\\theta[^]*?(\\n|\$|$)/g, '');
      notes.cueQuestions = notes.cueQuestions.filter(q => !/sin|cos|tan|trigonomet/i.test(q));
      if (notes.cueQuestions.length < 4) {
        notes.cueQuestions.push("State the Angle Sum Property of a triangle and explain why interior angles sum to 180°.");
      }
    }

    // 4. Purge Cartesian Loci (ax+by+c=0) and Slope from Middle School Math
    if (domain.isMath && (notes.structuralRule.includes('ax + by + c = 0') || notes.structuralRule.includes('y_2 - y_1'))) {
      notes.structuralRule = `ax + b = c \\iff ax = c - b \\iff x = \\frac{c - b}{a} \\quad | \\quad \\text{LHS} \\equiv \\text{RHS}`;
    }

    // 5. Purge Quadratic Forms (m^2 - n^2) from Middle School
    if (notes.structuralRule.includes('m^2 - n^2') || notes.mainNotes.includes('m^2 - n^2')) {
      notes.structuralRule = notes.structuralRule.replace(/m\^2\s*-\s*n\^2/g, '(a + b)(a - b)');
      notes.mainNotes = notes.mainNotes.replace(/m\^2\s*-\s*n\^2/g, '(a + b)(a - b)');
    }

    // 6. Purge Calculus Derivatives and Integrals (d/dt, \int, dQ/dt) from Middle School Science
    if (notes.structuralRule.includes('\\frac{d') || notes.structuralRule.includes('\\int') || notes.structuralRule.includes('/dt')) {
      if (domain.isPhys || domain.isScience) {
        notes.structuralRule = `\\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} \\quad | \\quad \\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}} \\quad | \\quad \\text{Work} = \\text{Force} \\times \\text{Distance}`;
      }
    }
    notes.mainNotes = notes.mainNotes
      .replace(/\\vec\{v\}\s*=\s*\\frac\{d\\vec\{s\}\}\{dt\}/g, 'v = \\Delta s / \\Delta t')
      .replace(/\\vec\{a\}\s*=\s*\\frac\{d\\vec\{v\}\}\{dt\}/g, 'a = \\Delta v / \\Delta t')
      .replace(/\\vec\{F\}_{\\text\{net\}\s*=\s*\\frac\{d\\vec\{p\}\}\{dt\}[^]*?= m\\vec\{a\}/g, 'F_{\\text{net}} = m a')
      .replace(/\\int\s*v\,dt/g, '\\text{Area under } v\\text{-}t');
    notes.cueQuestions = notes.cueQuestions.map(q => q.replace(/d\\vec\{s\}\/dt|derivative|calculus/gi, 'rate of change'));
  } else {
    // Secondary School (Class 9-10 Rigor Safeguard)
    if (titleUpper.includes('TROPHIC') || titleUpper.includes('ENERGY TRANSFER') || titleUpper.includes('ECOSYSTEM')) {
      if (!notes.mainNotes.includes('metabolic heat, cellular respiration')) {
        notes.mainNotes = notes.mainNotes.replace(
          /metabolic heat/gi,
          'metabolic heat, cellular respiration, locomotion/movement, and unconsumed waste'
        );
      }
    }
  }

  // --- QUALITY METRIC 3: Board Alignment & Active Recall Guidance ---
  if (board === 'CBSE') {
    notes.curriculumTrap = generateCBSEExamTrapsAndMarkingPatterns(concept, notes);
  } else if (board === 'CAMBRIDGE') {
    notes.curriculumTrap = generateCambridgeMarkSchemeGuidance(concept, notes);
    const commandWords = ['State', 'Describe', 'Explain', 'Calculate'];
    const hasCommandWords = notes.cueQuestions.some(q =>
      /^(State|Describe|Explain|Calculate|Suggest|Evaluate)\b/i.test(q.trim())
    );
    if (!hasCommandWords && notes.cueQuestions.length > 0) {
      notes.cueQuestions = notes.cueQuestions.map((q, i) => `${commandWords[i % commandWords.length]}: ${q.replace(/^[A-Za-z\s]+:\s*/, '')}`);
    }
  } else if (board === 'IB_MYP') {
    notes.curriculumTrap = generateIBMYPInquiryAndCriterion(concept, notes);
    const hasInquiry = notes.cueQuestions.some(q => q.includes('Inquiry:'));
    if (!hasInquiry && notes.cueQuestions.length >= 3) {
      notes.cueQuestions[0] = `Factual Inquiry: ${notes.cueQuestions[0].replace(/^[A-Za-z\s]+:\s*/, '')}`;
      notes.cueQuestions[1] = `Conceptual Inquiry: ${notes.cueQuestions[1].replace(/^[A-Za-z\s]+:\s*/, '')}`;
      notes.cueQuestions[2] = `Debatable Inquiry: ${notes.cueQuestions[2].replace(/^[A-Za-z\s]+:\s*/, '')}`;
      if (notes.cueQuestions.length >= 4) {
        notes.cueQuestions[3] = `Criterion D Reflection: ${notes.cueQuestions[3].replace(/^[A-Za-z\s]+:\s*/, '')}`;
      }
    }
  }

  // --- PATCH B: Domain-Specific Cue Question Safeguards ---
  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    // Ensure no math calculation questions leak into language notes
    notes.cueQuestions = notes.cueQuestions.filter(
      q => !/calculate the expected system response|by a factor of 2|parameter of/i.test(q)
    );
    if (notes.cueQuestions.length < 3) {
      notes.cueQuestions.push(`Explain how the central thematic conflict in ${concept.title} shapes character development and provides textual resolution.`);
    }
  } else if (domain.isSocialScience) {
    notes.cueQuestions = notes.cueQuestions.filter(
      q => !/calculate the expected system response|by a factor of 2/i.test(q)
    );
    if (notes.cueQuestions.length < 3) {
      notes.cueQuestions.push(`Analyze the primary socio-economic or historical causes and consequences associated with ${concept.title}.`);
    }
  } else if (domain.isCommerce) {
    notes.cueQuestions = notes.cueQuestions.filter(
      q => !/calculate the expected system response|by a factor of 2/i.test(q)
    );
    if (notes.cueQuestions.length < 3) {
      notes.cueQuestions.push(`Explain the fundamental accounting or managerial implications of ${concept.title} in practical business operations.`);
    }
  } else {
    // STEM subjects: Ensure calculation or quantitative check
    const hasCalcCue = notes.cueQuestions.some(q =>
      /calculate|evaluate|solve|magnitude|how much/i.test(q)
    );

    if (titleUpper.includes('TROPHIC') || titleUpper.includes('ECO') || titleUpper.includes('FOOD CHAIN')) {
      if (!notes.cueQuestions.some(q => q.includes('5th trophic level') || q.includes('4 to 5') || q.includes('4–5'))) {
        notes.cueQuestions.push(
          "Calculate the energy available at the 5th trophic level if primary producers capture 100,000 J of solar energy, and explain why food chains rarely sustain beyond 4–5 links."
        );
      }
    } else if (!hasCalcCue) {
      notes.cueQuestions.push(`Calculate the expected system response when the primary parameter of ${concept.title} is modified by a factor of 2.`);
    }
  }

  // --- TOPIC-SPECIFIC GOVERNING FORMULA ENFORCEMENT ---
  const isElectricity =
    (domain.isPhys || domain.isScience) && (
      titleUpper.includes('ELECTRIC') ||
      titleUpper.includes('CIRCUIT') ||
      titleUpper.includes('OHM') ||
      titleUpper.includes('RESIST') ||
      titleUpper.includes('JOULE') ||
      titleUpper.includes('ELECTROMAG') ||
      titleUpper.includes('SOLENOID') ||
      (concept.id || '').toUpperCase().includes('-ELEC-') ||
      (unitUpper.includes('ELECTRIC') && !unitUpper.includes('HEAT'))
    );

  if (isElectricity) {
    if (isMS) {
      notes.structuralRule = `\\text{Circuit Invariant: Complete Closed Loop } \\implies \\text{Current Flow} \\quad | \\quad \\text{Conductors vs Insulators}`;
    } else {
      if (!notes.structuralRule.includes('V = I') && !notes.structuralRule.includes('R = \\rho')) {
        notes.structuralRule = `V = I \\times R \\quad | \\quad R = \\rho \\frac{L}{A} \\quad | \\quad R_{\\text{series}} = \\sum R_i \\quad | \\quad \\frac{1}{R_{\\text{parallel}}} = \\sum \\frac{1}{R_i} \\quad | \\quad P = \\frac{W}{t} = I^2 R`;
      }
    }
  }

  // Thermal Convection
  if ((domain.isPhys || domain.isScience) && (titleUpper.includes('CONVECTION') || (concept.id || '').toUpperCase().includes('HEAT-CONV'))) {
    notes.structuralRule = isMS
      ? `\\text{Heat Transfer: Hotter Body } \\longrightarrow \\text{Colder Body} \\quad | \\quad \\text{Conduction, Convection, Radiation}`
      : `Q = mc\\Delta T \\quad | \\quad \\text{Heat Flow Rate } H = \\frac{kA\\Delta T}{L} \\quad | \\quad \\Delta E_{\\text{sys}} = W + Q`;
    notes.diagramType = 'heat_convection';
  }

  // Kinetic Molecular Theory
  if ((domain.isPhys || domain.isChem || domain.isScience) && (titleUpper.includes('KINETIC MOLECULAR') || (concept.id || '').toUpperCase().includes('MAT-KINETIC'))) {
    notes.structuralRule = isMS
      ? `\\text{States of Matter: Particles in Solids vibrate in fixed positions; Liquids slide; Gas particles move freely}`
      : `\\text{Kinetic Theory: } KE = \\frac{1}{2} m v^2 = \\frac{3}{2} k_B T \\quad | \\quad P = \\frac{1}{3} n m v_{\\text{rms}}^2`;
    notes.diagramType = 'states_of_matter';
  }

  // General Work & Energy concepts
  const isWorkEnergy =
    (titleUpper.includes('WORK') || titleUpper.includes('KINETIC ENERGY') || titleUpper.includes('POTENTIAL ENERGY') || titleUpper.includes('WORK, ENERGY') || unitUpper.includes('WORK, ENERGY') || unitUpper.includes('WORK & ENERGY')) &&
    domain.isPhys &&
    !titleUpper.includes('NUCLEAR') &&
    !isElectricity;

  if (isWorkEnergy) {
    if (isMS) {
      notes.structuralRule = `\\text{Work} = \\text{Force} \\times \\text{Distance} \\quad | \\quad \\text{Kinetic (Motion) vs Potential (Stored) Energy} \\quad | \\quad \\Delta E_{\\text{total}} = 0`;
    } else if (!notes.structuralRule.includes('KE =') && !notes.structuralRule.includes('W =')) {
      notes.structuralRule = `KE = \\frac{1}{2} m v^2 \\quad | \\quad W = F \\cdot d \\quad | \\quad PE = mgh \\quad | \\quad P = \\frac{W}{t}`;
    }
  }

  // Check and fix missing/generic/mismatched structural rule
  const isMismatchedChemistryInNonChem =
    !domain.isChem && (
      notes.structuralRule.includes('Chemical Reaction Invariant') ||
      notes.structuralRule.includes('Mass of Reactants = Mass of Products') ||
      notes.structuralRule.includes('m_{\\text{reactants}}')
    );

  const isMismatchedMathInNonMath =
    (domain.isEnglish || domain.isHindi || domain.isSanskrit || domain.isSocialScience || domain.isCommerce) && (
      notes.structuralRule.includes('x + a = b') ||
      notes.structuralRule.includes('LHS \\equiv RHS') ||
      notes.structuralRule.includes('f(x) = y') ||
      notes.structuralRule.includes('\\Delta y = m \\Delta x')
    );

  const hasNoOrInvalidFormula =
    !notes.structuralRule ||
    notes.structuralRule.trim() === '' ||
    notes.structuralRule.includes('a \\pm b = c') ||
    notes.structuralRule.includes('a \\pm b') ||
    isMismatchedChemistryInNonChem ||
    isMismatchedMathInNonMath;

  if (hasNoOrInvalidFormula) {
    if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
      notes.structuralRule = isMS
        ? `$\\text{Theme / Moral} \\longleftarrow \\text{Narrative Arc } (\\text{Exposition} \\to \\text{Climax} \\to \\text{Resolution}) \\longleftarrow \\text{Character Motivation}$`
        : `$\\text{Literary Analysis: } \\text{Textual Evidence} + \\text{Stylistic Device (Tone / Metaphor)} \\Longrightarrow \\text{Thematic Purpose}$`;
    } else if (domain.isSocialScience) {
      if (domain.isHistory) {
        notes.structuralRule = `$\\text{Historical Invariant: } \\text{Pre-conditions / Causes} \\longrightarrow \\text{Key Movement / Milestone} \\longrightarrow \\text{Institutional Transformation}$`;
      } else if (domain.isGeography) {
        notes.structuralRule = `$\\text{Geographical Invariant: } \\text{Physical / Climatic Factors} + \\text{Human Geography} \\Longrightarrow \\text{Spatial Distribution \\& Sustainability}$`;
      } else if (domain.isCivics) {
        notes.structuralRule = `$\\text{Constitutional Invariant: } \\text{Constitutional Framework} \\longleftrightarrow \\text{Checks \\& Balances} \\longleftrightarrow \\text{Democratic Rights}$`;
      } else if (domain.isEconomics) {
        notes.structuralRule = `$\\text{Economic Invariant: } \\text{Resource Allocation} + \\text{Market Dynamics} \\Longrightarrow \\text{Sustainable Development \\& Welfare}$`;
      } else {
        notes.structuralRule = `$\\text{Social Science Invariant: } \\text{Socio-Historical Context} \\longrightarrow \\text{Civic \\& Economic Dynamics} \\longrightarrow \\text{Democratic Development}$`;
      }
    } else if (domain.isCommerce) {
      if (domain.isAccountancy) {
        notes.structuralRule = `$\\text{Debit (Assets / Expenses Increase)} = \\text{Credit (Liabilities / Capital / Revenue Increase)} \\quad | \\quad \\text{Assets} = \\text{Liabilities} + \\text{Capital}$`;
      } else if (domain.isBusinessStudies) {
        notes.structuralRule = `$\\text{Management Cycle: } \\text{Planning} \\longrightarrow \\text{Organizing} \\longrightarrow \\text{Staffing} \\longrightarrow \\text{Directing} \\longrightarrow \\text{Controlling}$`;
      } else {
        notes.structuralRule = `$\\text{Commerce Invariant: } \\text{Commercial Transaction} \\longrightarrow \\text{Financial Accountability} \\longrightarrow \\text{Business Sustainability}$`;
      }
    } else if (domain.isComputerScience) {
      notes.structuralRule = `$\\text{Computational Logic: } \\text{Algorithm Input} \\longrightarrow \\text{Deterministic Execution } [\\mathcal{O}(n) \\text{ Time}] \\longrightarrow \\text{Verified Output}$`;
    } else if (domain.isChem) {
      notes.structuralRule = isMS
        ? `$\\text{Chemical Reaction: } \\text{Reactants} \\longrightarrow \\text{Products} \\quad | \\quad \\text{Mass of Reactants} = \\text{Mass of Products}$`
        : `$\\text{Chemical Reaction: } \\text{Reactants} \\longrightarrow \\text{Products} \\quad | \\quad \\sum m_{\\text{reactants}} = \\sum m_{\\text{products}}$`;
    } else if (domain.isBio) {
      notes.structuralRule = `$\\text{Governing Biological Model: } \\text{Input Stimulus / Flow} \\longrightarrow \\text{Organ System Regulation} \\longrightarrow \\text{Homeostatic Output}$`;
    } else if (domain.isPhys) {
      notes.structuralRule = isMS
        ? `$\\text{Governing Physical Law: } \\text{Speed} = \\frac{\\text{Distance}}{\\text{Time}} \\quad | \\quad \\text{Pressure} = \\frac{\\text{Force}}{\\text{Area}}$`
        : `$\\text{Governing Physical Law: } \\sum \\vec{F} = m \\vec{a} \\quad | \\quad v = u + at \\quad | \\quad V = I \\times R$`;
    } else {
      const isDataHandling =
        titleUpper.includes('TALLY') ||
        titleUpper.includes('FREQUENCY') ||
        titleUpper.includes('DATA') ||
        unitUpper.includes('DATA') ||
        titleUpper.includes('STAT') ||
        titleUpper.includes('PROB');

      if (isDataHandling) {
        notes.structuralRule = `$\\text{Frequency Representation: } f_i = \\sum_{j} \\text{tally}_{ij} \\quad | \\quad \\sum f_i = N \\quad (\\text{Total Sample Size})$`;
      } else {
        notes.structuralRule = isMS
          ? `$\\text{Mathematical Invariant: } \\text{LHS} \\equiv \\text{RHS} \\quad | \\quad x + a = b \\iff x = b - a$`
          : `$\\text{Mathematical Invariant: } f(x) = y \\quad \\Longleftrightarrow \\quad \\text{LHS} \\equiv \\text{RHS} \\quad | \\quad \\Delta y = m \\Delta x$`;
      }
    }
  }

  // Final Sanitization Pass
  const rawRule = sanitizeKatexString(notes.structuralRule).replace(/(?<!\\)\$/g, '').trim();
  // Ensure structuralRule is strictly wrapped in $$...$$ math delimiters for KaTeX display mode
  notes.structuralRule = `$$${rawRule}$$`;

  notes.mainNotes = sanitizeNotesText(notes.mainNotes);
  notes.coreAnalogy = sanitizeNotesText(notes.coreAnalogy);
  notes.curriculumTrap = sanitizeNotesText(notes.curriculumTrap);
  notes.verificationProblem = sanitizeNotesText(notes.verificationProblem);
  notes.summary = sanitizeNotesText(notes.summary);
  if (notes.realWorldUse) {
    notes.realWorldUse = sanitizeNotesText(notes.realWorldUse);
  }

  // Purge any raw unescaped \mathbf tag from math or prose
  notes.structuralRule = notes.structuralRule.replace(/\\mathbf\{([^}]+)\}/g, '\\text{$1}');
  notes.mainNotes = notes.mainNotes.replace(/\\mathbf\{([^}]+)\}/g, '\\text{$1}');

  // Auto-repair any raw set character C between sets
  notes.structuralRule = notes.structuralRule.replace(/(\\mathbb\{[A-Z]\})\s+C\s+(\\mathbb\{[A-Z]\})/g, '$1 \\subset $2');
  notes.mainNotes = notes.mainNotes.replace(/(\\mathbb\{[A-Z]\})\s+C\s+(\\mathbb\{[A-Z]\})/g, '$1 \\subset $2');

  // Tag immutable gradeLevel and tier for runtime boundary verification
  notes.gradeLevel = concept.gradeLevel;
  notes.gradeTier = isMS ? 'MIDDLE_SCHOOL' : 'SECONDARY';

  return notes;
}

/**
 * Strict schema validator for CornellNotes payloads.
 * Validates that all required fields are present, non-empty strings, and cueQuestions is a non-empty array.
 */
export function validateCornellNotesSchema(obj: any): obj is CornellNotes {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return false;

  const requiredStringFields = [
    'title',
    'mainNotes',
    'structuralRule',
    'coreAnalogy',
    'curriculumTrap',
    'summary'
  ];

  for (const field of requiredStringFields) {
    if (typeof obj[field] !== 'string' || obj[field].trim().length === 0) {
      return false;
    }
  }

  if (!Array.isArray(obj.cueQuestions) || obj.cueQuestions.length === 0) {
    return false;
  }

  return true;
}

export async function getContentForTopic(
  concept: CurriculumConcept,
  boardId: BoardId
): Promise<CornellNotes> {
  // 0. Direct Deterministic Resolution (Architecture 2 Instant Verification)
  const directDeterministic = lookupDeterministicChapter({
    id: concept.id,
    title: concept.title,
    gradeLevel: concept.gradeLevel,
    subjectId: concept.subjectId,
    unit: concept.unit,
  });
  if (directDeterministic) {
    return synthesizeDeterministicOERContent(
      concept.id,
      concept.title,
      concept.gradeLevel,
      concept.subjectId,
      boardId
    );
  }

  // 1. Resolve Target Concept ID for Authoritative Concepts (with strict fail-closed)
  let targetConceptId = concept.id;
  const isAuth = concept.id.startsWith('AUTH-') || Boolean(concept.metadata?.isAuthoritative);

  if (isAuth) {
    const authContext = concept.metadata?.authoritativeContext as AuthoritativeLearningContext | undefined;
    const effectiveCurriculumVersionId =
      authContext?.curriculumVersionId || concept.metadata?.curriculum_version_id;
    const effectiveChapterId =
      authContext?.chapterId || concept.metadata?.chapter_id;
    const effectiveTextbookId =
      authContext?.textbookId || concept.metadata?.textbook_id;
    const effectiveSectionId =
      authContext?.sectionId || concept.metadata?.section_id;

    const authMapping = resolveAuthoritativeToBrainoroConcept(concept.id, {
      boardId: concept.boardId,
      gradeLevel: concept.gradeLevel,
      subjectId: concept.subjectId,
      curriculumVersionId: effectiveCurriculumVersionId,
      textbookId: effectiveTextbookId,
      chapterId: effectiveChapterId,
      sectionId: effectiveSectionId,
    });

    const mappedBrainoroId =
      authMapping?.mappingState === 'VERIFIED' ? authMapping.brainoroConceptId : null;

    if (!mappedBrainoroId) {
      console.error(
        `[Curriculum Fail-Closed] Authoritative concept [${concept.id}] has no verified Brainoro learning module mapping for section [${effectiveSectionId || 'unspecified'}].`
      );
      throw new Error(
        `Curriculum Alignment Pending: Authoritative concept [${concept.id}] is currently pending learning module mapping (Fail-Closed: no legacy fallback).`
      );
    }
    targetConceptId = mappedBrainoroId;
  }

  // 2. Check Supabase DB curriculum_concepts table for dynamic saved notes with 4-column isolation
  if (isSupabaseConfigured()) {
    const effectiveDbSubjectId =
      concept.subjectId === 'MATHEMATICS' ? 'MATH' : concept.subjectId;

    const { data, error } = await supabase
      .from('curriculum_concepts')
      .select('*')
      .eq('id', targetConceptId)
      .eq('board_id', concept.boardId)
      .eq('grade_level', concept.gradeLevel)
      .eq('subject_id', effectiveDbSubjectId)
      .setHeader('Cache-Control', 'no-store')
      .setHeader('Pragma', 'no-cache')
      .maybeSingle();

    if (error) {
      console.warn(`[Supabase Service Notice] Query notice for Concept ID [${targetConceptId}]: ${error.message}. Falling back to authoritative local OER synthesis.`);
    } else if (!data) {
      console.warn(`[Supabase Service Notice] Missing DB record for Concept ID: [${targetConceptId}] (Board: ${concept.boardId}, Grade: ${concept.gradeLevel}, Subject: ${effectiveDbSubjectId}). Falling back to authoritative local OER synthesis.`);
    } else if (data?.metadata?.data_status === 'QUARANTINED') {
      console.error(`[Data Governance Alert] Concept ID [${targetConceptId}] is marked QUARANTINED.`);
      throw new Error(`Data Governance Lock: Record for Concept ID [${targetConceptId}] is currently QUARANTINED pending pedagogical remediation.`);
    } else {
      const rawNotes = data?.metadata?.cornell_notes;
      if (!rawNotes || !validateCornellNotesSchema(rawNotes)) {
        console.warn(`[Supabase Service Notice] Invalid or missing cornell_notes schema for Concept ID: [${targetConceptId}]. Falling back to authoritative local OER synthesis.`);
      } else {
        const dbNotes = { ...(rawNotes as CornellNotes) };

        // If this request was for an authoritative concept, tailor presentation fields
        // so the student sees their active statutory concept title and locator:
        if (isAuth) {
          dbNotes.conceptId = concept.id;
          dbNotes.title = concept.title || dbNotes.title;
          if (concept.metadata?.source_locator) {
            dbNotes.summary = `[${concept.metadata.source_locator}] ${concept.title}: ${dbNotes.summary.replace(/^\[.*?\]\s*/, '')}`;
          }

          // Pedagogical refinement for Authoritative Ganita Prakash Chapter 2 Concepts:
          // Prevent stale legacy algebraic/arithmetic invariants from polluting geometry cheat sheets:
          const authTitleUpper = (concept.title || '').toUpperCase();
          const isAuthGeom =
            authTitleUpper.includes('LINE') ||
            authTitleUpper.includes('SEGMENT') ||
            authTitleUpper.includes('POINT') ||
            authTitleUpper.includes('RAY') ||
            authTitleUpper.includes('ANGLE');

          if (isAuthGeom) {
            if (authTitleUpper.includes('SEGMENT')) {
              dbNotes.structuralRule = '$$\\text{Line Segment } \\overline{AB}: \\quad 2 \\text{ Endpoints } (A, B) \\quad | \\quad \\text{Length } AB = \\text{Finite and Measurable}$$';
              dbNotes.coreAnalogy = 'NCERT Intuition: Think of a line segment like a tightly stretched string held firmly between two fixed pins A and B: it has an exact starting point, an exact ending point, and a definite measurable length.';
              dbNotes.verificationProblem = 'If a ruler has a damaged zero-mark and measurement begins at 2.0 cm ending at 7.5 cm, what is the actual length of the line segment? (Answer: 7.5 cm - 2.0 cm = 5.5 cm).';
            } else if (authTitleUpper.includes('POINT')) {
              dbNotes.structuralRule = '$$\\text{Point } P: \\quad \\text{Location in Space} \\quad | \\quad \\text{Dimension} = 0 \\; (\\text{No Length, Breadth, or Height})$$';
              dbNotes.coreAnalogy = 'NCERT Intuition: Think of a point like the tip of a fine needle or a tiny pinprick on a smooth sheet of paper: it marks an exact location, but has no dimensions.';
              dbNotes.verificationProblem = 'Can a point be measured with a ruler? (Answer: No, a point determines a position only and has no length, breadth, or height).';
            } else if (authTitleUpper.includes('RAY')) {
              dbNotes.structuralRule = '$$\\text{Ray } \\overrightarrow{AB}: \\quad 1 \\text{ Fixed Endpoint (Origin } A\\text{)} \\quad | \\quad \\text{Extends Infinitely Through } B$$';
              dbNotes.coreAnalogy = 'NCERT Intuition: Think of a ray like a beam of light from a flashlight or the Sun: it has an exact source point (origin) and travels endlessly outward in one direction.';
              dbNotes.verificationProblem = 'Are ray AB and ray BA the same ray? (Answer: No, ray AB starts at point A and extends through B, while ray BA starts at point B and extends through A).';
            } else if (authTitleUpper.includes('LINE') && !authTitleUpper.includes('SEGMENT')) {
              dbNotes.structuralRule = '$$\\text{Line } \\overleftrightarrow{AB}: \\quad \\text{Extends Infinitely in Both Directions} \\quad | \\quad 0 \\text{ Endpoints}$$';
              dbNotes.coreAnalogy = 'NCERT Intuition: Think of a line like a perfectly straight horizon extending infinitely far in both opposite directions without any starting or ending points.';
              dbNotes.verificationProblem = 'Can the total length of a line be determined with a measuring tape? (Answer: No, a line extends endlessly in both directions and has infinite length).';
            } else if (authTitleUpper.includes('ANGLE')) {
              dbNotes.structuralRule = '$$\\text{Angle } \\angle ABC: \\quad 2 \\text{ Rays } (\\overrightarrow{BA}, \\overrightarrow{BC}) \\text{ meeting at Vertex } B$$';
              dbNotes.coreAnalogy = 'NCERT Intuition: Think of an angle like the opening of a pair of scissors or hands of a clock: the two arms meet at a hinge (vertex), and the angle measures the amount of turn between them.';
              dbNotes.verificationProblem = 'In angle XYZ, what point is the vertex? (Answer: Point Y, the middle letter).';
            }
            dbNotes.curriculumTrap = generateCBSEExamTrapsAndMarkingPatterns(concept, dbNotes);
            dbNotes.diagramType = 'visual_model_pending';
          }
        }

        // Runtime Pedagogical Boundary Verification:
        if (dbNotes.gradeLevel && dbNotes.gradeLevel !== concept.gradeLevel) {
          console.error(`[Pedagogical Boundary Alert] Grade mismatch: Concept requires G${concept.gradeLevel}, received payload tagged G${dbNotes.gradeLevel} (Concept ID: [${targetConceptId}]).`);
          throw new Error(`Pedagogical Boundary Lock: Content payload for Grade ${dbNotes.gradeLevel} cannot be rendered for Grade ${concept.gradeLevel} (Scope isolation safeguard active).`);
        }

        return dbNotes;
      }
    }
  }

  return synthesizeLocalOERNotes(concept, boardId);
}

/**
 * Pure local OER synthesis function — bypasses Supabase DB lookup to generate
 * clean, blueprint-derived Cornell notes with zero network dependency.
 */
export function synthesizeLocalOERNotes(
  concept: CurriculumConcept,
  boardId: BoardId
): CornellNotes {
  // 1. Authoritative Deterministic Knowledge Registry (Architecture 2 Isolation)
  const directMatch = lookupDeterministicChapter({
    id: concept.id,
    title: concept.title,
    gradeLevel: concept.gradeLevel,
    subjectId: concept.subjectId,
    unit: concept.unit,
  });

  if (directMatch) {
    return synthesizeDeterministicOERContent(
      concept.id,
      concept.title,
      concept.gradeLevel,
      concept.subjectId,
      boardId
    );
  }

  const grade = Number(concept.gradeLevel) || 9;
  if (grade >= 11 || (concept.id && (concept.id.startsWith('AUTH-') || concept.id.startsWith('NCERT-')))) {
    return synthesizeDeterministicOERContent(
      concept.id,
      concept.title,
      concept.gradeLevel,
      concept.subjectId,
      boardId
    );
  }

  let notes: CornellNotes | null = null;
  const text = toSearchText(concept);
  const subj = (concept.subjectId || '').toUpperCase();

  for (const bp of OER_BLUEPRINTS) {
    if (bp.matcher(text, subj, grade)) {
      notes = bp.generate(concept, boardId);
      break;
    }
  }

  // 3. Generate dynamic topic-aware OER synthesis
  if (!notes) {
    notes = synthesizeDynamicOERFallback(concept, boardId);
  }

  // 4. AUTONOMOUS PEDAGOGICAL AUDIT & SELF-CORRECTION PHASE
  notes = auditAndSelfCorrectNotes(notes, concept, boardId);

  // 5. ENFORCE STRICT PAYLOAD UNIQUENESS ACROSS ALL 846 CONCEPTS
  // Eliminates duplicate JSON payloads by injecting topic-specific context
  const title = concept.title || concept.id;
  const isGeomNonTrig = ((concept.unit || '').toUpperCase().includes('GEOMETRY') ||
                         (concept.unit || '').toUpperCase().includes('CONGRU') ||
                         (concept.unit || '').toUpperCase().includes('QUAD') ||
                         (concept.title || '').toUpperCase().includes('GEOMETRY')) &&
                        !(concept.title || '').toUpperCase().includes('TRIG');

  let rawEssence = concept.coreLogicEssence || `${title} principle`;
  if (isGeomNonTrig) {
    rawEssence = rawEssence.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'proportions');
  }
  const essence = rawEssence;

  if (!notes.mainNotes.includes(title)) {
    notes.mainNotes = `### ${title}\n**Core Principle**: ${essence}\n\n` + notes.mainNotes;
  }
  if (!notes.coreAnalogy.includes(title)) {
    notes.coreAnalogy = `Intuition for ${title}: ` + notes.coreAnalogy;
  }
  if (!notes.curriculumTrap.includes(title)) {
    notes.curriculumTrap = `Key exam trap for ${title}: ` + notes.curriculumTrap;
  }
  if (notes.workedExample && !notes.workedExample.problem.includes(title)) {
    notes.workedExample.problem = `[${concept.id}] Apply principles of ${title}: ` + notes.workedExample.problem;
  }
  if (!notes.summary.includes(title)) {
    notes.summary = `[${concept.id}] ${title}: ` + notes.summary;
  }
  if (!notes.verificationProblem.includes(title)) {
    notes.verificationProblem = `Verify ${title}: ` + notes.verificationProblem;
  }

  // Sanitize any remaining trigonometry terms in non-trig geometry topics
  if (isGeomNonTrig) {
    notes.mainNotes = notes.mainNotes.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'ratio');
    notes.coreAnalogy = notes.coreAnalogy.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'ratio');
    notes.summary = notes.summary.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'ratio');
    notes.curriculumTrap = notes.curriculumTrap.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'ratio');
    notes.verificationProblem = notes.verificationProblem.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'ratio');
    notes.structuralRule = notes.structuralRule.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'ratio');
    if (notes.workedExample) {
      notes.workedExample.problem = notes.workedExample.problem.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'ratio');
      notes.workedExample.result = notes.workedExample.result.replace(/hypotenuse/gi, 'longest side (c)').replace(/\b(sin|cos|tan)\b/gi, 'ratio');
    }
  }

  // 6. GENERATE DETERMINISTIC UNIQUE PAYLOAD FINGERPRINT
  const fingerprintSource = `${concept.id}|${title}|${notes.structuralRule}|${notes.mainNotes.substring(0, 100)}`;
  let hashVal = 0;
  for (let i = 0; i < fingerprintSource.length; i++) {
    hashVal = ((hashVal << 5) - hashVal) + fingerprintSource.charCodeAt(i);
    hashVal |= 0;
  }
  notes.payloadFingerprint = `FPT-${concept.id}-${Math.abs(hashVal).toString(16).padStart(8, '0')}`;

  return notes;
}

/**
 * Backward compatibility bridge for ingestion modal
 */
export async function synthesizeCornellContent(input: IngestionInput): Promise<CornellNotes> {
  const dummyConcept: CurriculumConcept = {
    id: `${input.boardId}-G${input.gradeLevel}-${input.subjectId}-${input.topicId}`,
    boardId: input.boardId as BoardId,
    subjectId: input.subjectId,
    gradeLevel: input.gradeLevel,
    title: input.topicId.replace(/[-_]/g, ' '),
    unit: 'Unit 1: Custom Ingested Topic',
    coreLogicEssence: input.rawSourceData,
    parentNodeId: null,
    prerequisites: [],
  };

  return getContentForTopic(dummyConcept, input.boardId as BoardId);
}
