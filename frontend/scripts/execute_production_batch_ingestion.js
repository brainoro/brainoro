const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.trim().replace(/^['"]|['"]$/g, '');
    env[match[1]] = value;
  }
});

const supabaseUrl = (env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/rest\/v1\/?/, '').replace(/\/+$/, '');
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// =============================================================================
// Comprehensive Authentic CBSE 2026-27 Ingestion Payload Dataset
// =============================================================================

const CURRICULUM_MODULES_BATCH = [
  // ===========================================================================
  // BATCH 1: CLASS 12 BIOLOGY
  // ===========================================================================
  {
    grade_level: 12,
    subject_id: 'biology',
    board_id: 'CBSE',
    topic_ids: [
      'TOP_CBSE_12_BIO_06',
      'CBSE-CONC-CBSE-CH-G12-BIO-CH06-01',
      'CBSE-G12-BIOLOGY-P1-CH06',
      'CBSE-G12-BIO-CH06'
    ],
    topic_title: 'Evolution',
    slug: 'cbse-12-bio-evolution',
    unit_id: 'UNIT_CBSE_12_BIO_02',
    unit_title: 'Genetics and Evolution',
    unit_number: 2,
    core_logic_essence: 'Hardy-Weinberg equilibrium, Darwinian natural selection, Miller-Urey prebiotic chemical synthesis, and hominid evolution stages.',
    content: {
      real_world_intuition: 'Evolution explains the historical transformation of life forms on Earth through genetic variation, natural selection, and reproductive isolation, underpinning modern epidemiology, antibiotic resistance tracking, and comparative genomics.',
      essential_formula: 'p^2 + 2pq + q^2 = 1 \\quad \\Big| \\quad p + q = 1 \\quad [\\text{Hardy-Weinberg Principle of Genetic Equilibrium}]',
      core_breakdown: [
        {
          title: 'Origin of Life, Miller-Urey Experiment & Geological Evidence',
          content: [
            'Miller-Urey Experiment (1953): Simulated prebiotic reducing atmosphere (CH4, NH3, H2, H2O vapor) with electric discharge at 800°C, successfully synthesizing amino acids (glycine, alanine, aspartic acid).',
            'Oparin-Haldane Hypothesis: Chemical evolution preceded biological evolution; organic monomers formed in primordial reducing oceans.',
            'Morphological & Anatomical Evidence: Homologous structures (divergent evolution, common ancestry, e.g., vertebrate forelimbs, Bougainvillea thorns & Cucurbita tendrils) vs Analogous structures (convergent evolution, different ancestry, e.g., wings of birds and insects, potato and sweet potato).'
          ]
        },
        {
          title: 'Theories of Evolution, Natural Selection & Industrial Melanism',
          content: [
            'Darwinian Theory: Variations are small, continuous, and directional; branching descent and natural selection are the two key concepts determining reproductive fitness.',
            'Industrial Melanism (Biston betularia): Natural selection in action in England; pre-industrialization favoured white-winged moths (lichen-covered pale bark); post-industrialization favoured melanic/dark moths on soot-covered trunks.',
            'Mutation Theory (Hugo de Vries): Saltation (single-step large mutation) drives speciation; mutations are random, directionless, and discontinuous.'
          ]
        },
        {
          title: 'Hardy-Weinberg Principle, Evolutionary Factors & Human Ancestry',
          content: [
            'Hardy-Weinberg Invariant: Gene frequencies in a large random-mating population remain constant across generations: p^2 + 2pq + q^2 = 1.',
            'Five Disruptive Evolutionary Factors: Gene migration/flow, Genetic drift (Founder effect, Bottleneck), Mutation, Genetic recombination, and Natural selection (Stabilizing, Directional, Disruptive).',
            'Human Evolution Sequence: Dryopithecus/Ramapithecus (15 mya) -> Australopithecus (2 mya, hunted with stone, ate fruit) -> Homo habilis (650-800 cc, first hominid, non-meat eater) -> Homo erectus (1.5 mya, 900 cc, ate meat) -> Neanderthal (100k-40k ya, 1400 cc, buried dead) -> Homo sapiens (75k-10k ya).'
          ]
        }
      ],
      exam_traps: [
        'Homologous vs Analogous Structures: Homology indicates common ancestry with divergent functions; Analogy indicates convergent adaptation with different origins.',
        'Hardy-Weinberg Allele vs Genotype Frequency: Mixing up allele frequencies (p, q) with genotype frequencies (p^2, 2pq, q^2); heterozygous frequency is 2pq.',
        'Hominid Cranial Capacity Sequence: Inverting cranial capacities: Homo habilis (650-800 cc) < Homo erectus (900 cc) < Neanderthal man (1400 cc).'
      ],
      quick_check: 'In a population under Hardy-Weinberg equilibrium, if the frequency of recessive homozygous individuals (aa) is 0.16, find the percentage of heterozygous carriers (Aa) [Solution: q^2 = 0.16 => q = 0.4 => p = 1 - 0.4 = 0.6 => Frequency of Aa = 2pq = 2(0.6)(0.4) = 0.48 (48%)].'
    }
  },

  {
    grade_level: 12,
    subject_id: 'biology',
    board_id: 'CBSE',
    topic_ids: [
      'TOP_CBSE_12_BIO_10',
      'CBSE-CONC-CBSE-CH-G12-BIO-CH10-01',
      'CBSE-G12-BIOLOGY-P1-CH10',
      'CBSE-G12-BIO-CH10'
    ],
    topic_title: 'Biotechnology and its Applications',
    slug: 'cbse-12-bio-biotechnology-and-its-applications',
    unit_id: 'UNIT_CBSE_12_BIO_04',
    unit_title: 'Biotechnology',
    unit_number: 4,
    core_logic_essence: 'Recombinant therapeutics, Bt toxin mechanism, RNA interference (RNAi), and gene therapy for ADA deficiency.',
    content: {
      real_world_intuition: 'Biotechnology leverages genetic engineering to mass-produce human therapeutic proteins (Humulin), engineer insect-resistant transgenic crops (Bt Cotton), and correct fatal congenital genetic disorders.',
      essential_formula: '\\text{PCR Amplification: } N = N_0 \\times 2^n \\quad \\Big| \\quad \\text{Bt Invariant: Cry protoxin } \\xrightarrow{\\text{Alkaline pH}} \\text{Active toxic pore-former}',
      core_breakdown: [
        {
          title: 'Agricultural Applications: Bt Cotton & RNA Interference (RNAi)',
          content: [
            'Bt Cotton: Bacillus thuringiensis produces crystalline Cry proteins (CryIAc, CryIIAb against bollworms; CryIAb against corn borer). Inactive protoxin is ingested by insect and solubilized in alkaline midgut, creating epithelial pores and cell lysis.',
            'RNA Interference (RNAi): Cellular defense in eukaryotes against nematode Meloidogyne incognita in tobacco roots. dsRNA introduced via Agrobacterium tumefaciens triggers RISC complex to silence nematode-specific mRNA.'
          ]
        },
        {
          title: 'Medical Biotechnology: Genetically Engineered Insulin (Humulin)',
          content: [
            'Human Insulin Structure: Composed of A-chain (21 amino acids) and B-chain (30 amino acids) linked by disulphide bonds; proinsulin contains an extra C-peptide (removed during maturation).',
            'Eli Lilly Synthesis (1983): Synthesized two separate DNA sequences for A and B chains, inserted into pBR322 / E. coli plasmids, and joined extracted chains by creating disulphide bonds in vitro.'
          ]
        },
        {
          title: 'Gene Therapy (ADA Deficiency), Transgenic Animals & Biopiracy',
          content: [
            'First Clinical Gene Therapy (1990): 4-year-old girl with Adenosine Deaminase (ADA) deficiency treated by extracting patient lymphocytes, introducing functional ADA cDNA via retroviral vector, and re-infusing cells.',
            'Transgenic Animals (Rosie the Cow, 1997): Produced human protein-enriched milk (2.4 g/L human alpha-lactalbumin).',
            'Biopiracy & GEAC: Genetic Engineering Appraisal Committee (GEAC) regulates GM research safety and validity; preventing unauthorized commercial exploitation of indigenous biological resources (e.g. Basmati rice patents).'
          ]
        }
      ],
      exam_traps: [
        'Bt Toxin Activation Trigger: Bt protoxin is harmless to bacteria; it requires insect midgut ALKALINE pH for proteolytic activation, NOT acidic pH.',
        'Insulin C-Peptide Presence: Mature functional human insulin DOES NOT contain the C-peptide; it is cleaved from proinsulin.',
        'Gene Therapy Lymphocyte Longevity: Lymphocytes are not immortal; permanent cure requires introducing functional ADA gene into bone marrow stem cells at early embryonic stages.'
      ],
      quick_check: 'Why does Bt toxin kill bollworms but not the host bacterium Bacillus thuringiensis? [Solution: The bacterium produces inactive protoxin crystals; activation requires the alkaline pH of insect midgut, which solubilizes the crystal and binds to epithelial receptors].'
    }
  },

  {
    grade_level: 12,
    subject_id: 'biology',
    board_id: 'CBSE',
    topic_ids: [
      'TOP_CBSE_12_BIO_11',
      'CBSE-CONC-CBSE-CH-G12-BIO-CH11-01',
      'CBSE-G12-BIOLOGY-P1-CH11',
      'CBSE-G12-BIO-CH11'
    ],
    topic_title: 'Organisms and Populations',
    slug: 'cbse-12-bio-organisms-and-populations',
    unit_id: 'UNIT_CBSE_12_BIO_05',
    unit_title: 'Ecology and Environment',
    unit_number: 5,
    core_logic_essence: 'Population growth models, abiotic adaptations, carrying capacity, and interspecific population interactions.',
    content: {
      real_world_intuition: 'Population ecology quantifies demographic growth dynamics, organismal adaptations to extreme environments, and symbiotic species networks governing biodiversity conservation.',
      essential_formula: '\\frac{dN}{dt} = rN\\left(\\frac{K - N}{K}\\right) \\quad [\\text{Verhulst-Pearl Logistic Growth}] \\quad \\Big| \\quad N_t = N_0 e^{rt}',
      core_breakdown: [
        {
          title: 'Abiotic Environmental Factors & Physiological Adaptations',
          content: [
            'Responses to Abiotic Factors: Regulators (maintain constant internal temperature/osmolarity, e.g. mammals, birds), Conformers (internal environment conforms to ambient, 99% animals), Partial regulators, Migration, Diapause/Suspension.',
            'Morphological Adaptations: Allen\'s Rule (mammals in colder climates have shorter ears and limbs to minimize heat loss); Kangaroo rat (meets water needs via internal fat oxidation); Desert plants (sunken stomata, thick cuticle, CAM pathway).'
          ]
        },
        {
          title: 'Population Demographics & Growth Models',
          content: [
            'Population Dynamics Equation: N_{t+1} = N_t + [(B + I) - (D + E)] where B=Natality, I=Immigration, D=Mortality, E=Emigration.',
            'Exponential Growth (J-shaped curve): dN/dt = rN, occurring in unlimited resource conditions with intrinsic rate of natural increase r.',
            'Logistic Growth (S-shaped sigmoid curve): dN/dt = rN((K-N)/K), where K is environmental carrying capacity (asymptote).'
          ]
        },
        {
          title: 'Population Interspecific Interactions',
          content: [
            'Mutualism (+/+): Lichen (fungus + algae), Mycorrhizae (fungus + plant roots), Fig tree and Blastophaga pollinator wasp.',
            'Competition (-/-): Gause\'s Competitive Exclusion Principle: two closely related species competing for identical limiting resources cannot coexist indefinitely; MacArthur\'s resource partitioning.',
            'Parasitism (+/-), Commensalism (+/0: Orchid on mango, Barnacles on whale, Clownfish and Sea anemone), Amensalism (-/0: Penicillium producing penicillin inhibiting bacteria).'
          ]
        }
      ],
      exam_traps: [
        'Logistic Growth Equilibrium Condition: When population size N reaches carrying capacity K, (K-N)/K = 0, so rate of population growth dN/dt becomes 0.',
        'Brood Parasitism Interaction Type: Brood parasitism (e.g. cuckoo laying eggs in crow nest) is categorized strictly as PARASITISM (+/-), not commensalism.',
        'Commensalism Sign Matrix: In commensalism, one species benefits while the host experiences ZERO effect (+/0), unlike mutualism (+/+).'
      ],
      quick_check: 'A population of 50 fruit flies grew to 60 in one week. Calculate the birth rate per fruit fly per week [Solution: Birth rate = (60 - 50) / 50 = 10 / 50 = 0.2 offspring per fly per week].'
    }
  },

  {
    grade_level: 12,
    subject_id: 'biology',
    board_id: 'CBSE',
    topic_ids: [
      'TOP_CBSE_12_BIO_12',
      'CBSE-CONC-CBSE-CH-G12-BIO-CH12-01',
      'CBSE-G12-BIOLOGY-P1-CH12',
      'CBSE-G12-BIO-CH12'
    ],
    topic_title: 'Ecosystem',
    slug: 'cbse-12-bio-ecosystem',
    unit_id: 'UNIT_CBSE_12_BIO_05',
    unit_title: 'Ecology and Environment',
    unit_number: 5,
    core_logic_essence: 'Productivity equations, Lindeman 10% energy law, ecological pyramids, and biogeochemical nutrient cycling.',
    content: {
      real_world_intuition: 'Ecosystem analysis tracks thermodynamic energy flow through trophic chains and elemental nutrient cycles essential for planetary homeostasis and ecological restoration.',
      essential_formula: '\\text{NPP} = \\text{GPP} - R \\quad \\Big| \\quad E_{n+1} = 0.10 \\times E_n \\quad [\\text{Lindeman\'s 10\\% Energy Rule}]',
      core_breakdown: [
        {
          title: 'Primary Productivity & 5-Step Decomposition Process',
          content: [
            'Productivity Metrics: Gross Primary Productivity (GPP) is total photosynthetic rate; Net Primary Productivity (NPP) is biomass remaining after respiratory loss R: NPP = GPP - R.',
            'Decomposition Steps: (1) Fragmentation (detritivores like earthworms), (2) Leaching (water-soluble inorganic nutrients seep down), (3) Catabolism (bacterial and fungal enzymes), (4) Humification (dark amorphous humus formation), (5) Mineralization (release of inorganic nutrients).'
          ]
        },
        {
          title: 'Trophic Energy Flow & Ecological Pyramids',
          content: [
            'Lindeman\'s 10% Trophic Law: Only 10% of chemical energy transfers to the next higher trophic level; remaining 90% is lost as metabolic heat.',
            'Pyramid of Energy: ALWAYS upright without exception in all ecosystems due to Second Law of Thermodynamics.',
            'Inverted Pyramids: Pyramid of Biomass in sea is INVERTED (standing crop of phytoplankton is smaller than zooplankton/fish). Pyramid of numbers in single-tree ecosystem is spindle/inverted.'
          ]
        },
        {
          title: 'Biogeochemical Cycles & Ecological Succession',
          content: [
            'Carbon Cycle: 71% of global carbon is dissolved in oceans; gaseous exchange between atmosphere and organisms.',
            'Phosphorus Cycle: Sedimentary cycle without atmospheric gaseous exchange; reservoir pool is rock minerals containing phosphates released by weathering.',
            'Ecological Succession: Hydrarch (phytoplankton -> submerged -> floating -> reed-swamp -> marsh-meadow -> scrub -> forest) and Xerarch (crustose lichens -> mosses -> herbs -> shrubs -> forest).'
          ]
        }
      ],
      exam_traps: [
        'Pyramid of Energy Inversion Fallacy: An energy pyramid can NEVER be inverted under any natural ecological scenario.',
        'Gaseous vs Sedimentary Cycle Reservoirs: Carbon/Nitrogen reservoirs are atmospheric/hydrospheric; Phosphorus/Sulphur reservoirs are lithospheric rock minerals.',
        'Decomposition Rate Determinants: Decomposition is fastest in warm, moist aerated soils rich in nitrogen/sugars; slowest when detritus is rich in lignin and chitin.'
      ],
      quick_check: 'If producers receive 1,000,000 J of incident solar radiation, calculate the energy reaching secondary consumers [Solution: Plants capture 1% = 10,000 J; Herbivores (Primary consumers) receive 10% = 1,000 J; Carnivores (Secondary consumers) receive 10% = 100 J].'
    }
  },

  // ===========================================================================
  // BATCH 2: CLASS 12 PHYSICS & CLASS 12 CHEMISTRY
  // ===========================================================================
  {
    grade_level: 12,
    subject_id: 'physics',
    board_id: 'CBSE',
    topic_ids: [
      'TOP_CBSE_12_PHY_09',
      'CBSE-CONC-CBSE-CH-G12-PHY-CH09-01',
      'CBSE-G12-PHYSICS-P2-CH01',
      'CBSE-G12-PHY-CH09'
    ],
    topic_title: 'Ray Optics and Optical Instruments',
    slug: 'cbse-12-phy-ray-optics-and-optical-instruments',
    unit_id: 'UNIT_CBSE_12_PHY_06',
    unit_title: 'Optics',
    unit_number: 6,
    core_logic_essence: 'Snell\'s law, Total Internal Reflection (TIR), Lens Maker\'s formula, prism minimum deviation, and optical instrument magnifications.',
    content: {
      real_world_intuition: 'Ray optics models geometric light rays through reflecting and refracting boundaries, powering high-speed optical fiber communications, compound microscopes, and astronomical telescopes.',
      essential_formula: '\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) \\quad \\Big| \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f} \\quad \\Big| \\quad n_1 \\sin i = n_2 \\sin r',
      core_breakdown: [
        {
          title: 'Refraction, Snell\'s Law & Total Internal Reflection (TIR)',
          content: [
            'Snell\'s Law of Refraction: n_1 \\sin i = n_2 \\sin r, where absolute refractive index is n = c / v.',
            'Critical Angle \\theta_c: Light travelling from optically denser (n_1) to rarer (n_2) medium has \\sin \\theta_c = n_2 / n_1.',
            'Total Internal Reflection: Occurs when i > \\theta_c, reflecting 100% of light energy with zero transmission loss (optical fibers, prisms, mirages).'
          ]
        },
        {
          title: 'Spherical Refraction & Lens Maker\'s Formula',
          content: [
            'Single Spherical Surface Refraction: \\frac{n_2}{v} - \\frac{n_1}{u} = \\frac{n_2 - n_1}{R}.',
            'Lens Maker\'s Formula: \\frac{1}{f} = \\left(\\frac{n_2}{n_1} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right). Thin lens formula: \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}.',
            'Power & Combinations: P = 1 / f\\text{ (in meters)} in Dioptres (D). For thin lenses in contact: P = P_1 + P_2 \\implies \\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2}.'
          ]
        },
        {
          title: 'Prism Refraction & Optical Instruments',
          content: [
            'Prism Invariant: A + \\delta = i + e. At minimum deviation \\delta_m: \\mu = \\frac{\\sin((A + \\delta_m)/2)}{\\sin(A/2)}.',
            'Compound Microscope: Total magnification M = \\left(-\\frac{L}{f_o}\\right)\\left(\\frac{D}{f_e}\\right) at infinity, or M = \\left(-\\frac{L}{f_o}\\right)\\left(1 + \\frac{D}{f_e}\\right) at near point D = 25\\text{ cm}.',
            'Astronomical Telescope: Magnifying power M = -\\frac{f_o}{f_e} with tube length L = f_o + f_e (normal adjustment at \\infty, with f_o \\gg f_e).'
          ]
        }
      ],
      exam_traps: [
        'Cartesian Sign Convention: Object distance u is strictly negative for real objects; concave lens/mirror has f < 0, convex lens/mirror has f > 0.',
        'Equi-Convex Lens Sign Substitution: For equi-convex lens, R_1 = +R and R_2 = -R, giving \\frac{1}{f} = (\\mu - 1)\\frac{2}{R}, NOT 0.',
        'TIR Medium Directionality: TIR is physically possible ONLY when light travels from denser to rarer medium.'
      ],
      quick_check: 'Find the focal length of an equi-convex glass lens (\\mu = 1.5) with radius of curvature R = 20 cm in air [Solution: 1/f = (1.5 - 1)(1/20 - (-1/20)) = 0.5 * (2/20) = 1/20 => f = +20 cm].'
    }
  },

  {
    grade_level: 12,
    subject_id: 'chemistry',
    board_id: 'CBSE',
    topic_ids: [
      'TOP_CBSE_12_CHEM_01',
      'CBSE-CONC-CBSE-CH-G12-CHEM-CH01-01',
      'CBSE-G12-CHEMISTRY-P1-CH01',
      'CBSE-G12-CHEM-CH01'
    ],
    topic_title: 'Solutions',
    slug: 'cbse-12-chem-solutions',
    unit_id: 'UNIT_CBSE_12_CHEM_01',
    unit_title: 'Solutions',
    unit_number: 1,
    core_logic_essence: 'Henry\'s law, Raoult\'s law, colligative properties, van \'t Hoff factor, and abnormal molar masses.',
    content: {
      real_world_intuition: 'Solution thermodynamics explains osmotic drug delivery, automotive antifreeze colligative depression, and gas solubility dynamics in carbonated beverages and marine respiration.',
      essential_formula: '\\Delta T_b = i K_b m \\quad \\Big| \\quad \\Delta T_f = i K_f m \\quad \\Big| \\quad \\pi = i C R T \\quad \\Big| \\quad P = x_A P_A^\\circ + x_B P_B^\\circ',
      core_breakdown: [
        {
          title: 'Henry\'s Law & Raoult\'s Law for Ideal/Non-Ideal Solutions',
          content: [
            'Henry\'s Law: Partial pressure of gas in vapor phase is proportional to its mole fraction in solution: p = K_H x (higher K_H means lower solubility).',
            'Raoult\'s Law: Partial vapor pressure of each volatile component is p_A = x_A P_A^\\circ.',
            'Non-Ideal Solutions: Positive deviation (A-B interactions weaker than A-A/B-B, \\Delta H_{\\text{mix}} > 0, e.g. Ethanol + Acetone); Negative deviation (A-B interactions stronger, \\Delta H_{\\text{mix}} < 0, e.g. Chloroform + Acetone).'
          ]
        },
        {
          title: 'Four Colligative Properties (Depend on Number of Solute Particles)',
          content: [
            'Relative Lowering of Vapor Pressure: \\frac{P_1^\\circ - P_1}{P_1^\\circ} = x_2 = \\frac{n_2}{n_1 + n_2}.',
            'Elevation in Boiling Point: \\Delta T_b = T_b - T_b^\\circ = K_b m = K_b \\frac{w_2 \\times 1000}{M_2 \\times w_1} (where K_b is ebullioscopic constant).',
            'Depression in Freezing Point: \\Delta T_f = T_f^\\circ - T_f = K_f m (where K_f is cryoscopic constant).',
            'Osmotic Pressure: \\pi = C R T = \\frac{n_2}{V} R T (best method for determining molecular weights of polymers and biomolecules).'
          ]
        },
        {
          title: 'van \'t Hoff Factor (i) & Abnormal Molar Mass',
          content: [
            'van \'t Hoff Factor: i = \\frac{\\text{Observed Colligative Property}}{\\text{Calculated Colligative Property}} = \\frac{\\text{Normal Molar Mass}}{\\text{Abnormal Molar Mass}}.',
            'Degree of Dissociation \\alpha: i = 1 + (n - 1)\\alpha \\implies \\alpha = \\frac{i - 1}{n - 1} (e.g. for NaCl n=2; for K2SO4 n=3).',
            'Degree of Association \\alpha: i = 1 + \\left(\\frac{1}{n} - 1\\right)\\alpha (e.g. Dimerization of acetic acid in benzene, n=2, i < 1).'
          ]
        }
      ],
      exam_traps: [
        'van \'t Hoff Factor Omission: Forgetting factor i in electrolyte colligative calculations (e.g., BaCl2 has i ≈ 3, producing ~3x the freezing depression of glucose).',
        'Freezing Depression Sign Confusion: \\Delta T_f = T_f^\\circ - T_f (pure solvent minus solution freezing point), unlike \\Delta T_b = T_b - T_b^\\circ.',
        'Henry\'s Constant K_H and Temperature: K_H increases with temperature, which means gas solubility DECREASES as temperature rises (aquatic life prefers cold water).'
      ],
      quick_check: 'Calculate the van \'t Hoff factor i for an electrolyte of type A2B which is 70% dissociated in solution [Solution: For A2B -> 2A+ + B2-, n = 3. i = 1 + (n - 1)α = 1 + (3 - 1)(0.70) = 1 + 2(0.70) = 2.40].'
    }
  },

  // ===========================================================================
  // BATCH 3: CLASS 12 MATHEMATICS
  // ===========================================================================
  {
    grade_level: 12,
    subject_id: 'mathematics',
    board_id: 'CBSE',
    topic_ids: [
      'TOP_CBSE_12_MATH_10',
      'CBSE-CONC-CBSE-CH-G12-MATH-CH10-01',
      'CBSE-G12-MATHEMATICS-P2-CH04',
      'CBSE-G12-MATH-CH10'
    ],
    topic_title: 'Vector Algebra',
    slug: 'cbse-12-math-vector-algebra',
    unit_id: 'UNIT_CBSE_12_MATH_04',
    unit_title: 'Vectors and Three-Dimensional Geometry',
    unit_number: 4,
    core_logic_essence: 'Dot product, Cross product, Projection theorem, Direction cosines, and geometric area applications.',
    content: {
      real_world_intuition: 'Vector algebra quantifies directed physical magnitudes across 3D space, providing the mathematical framework for aircraft flight mechanics, computer vision 3D projections, and robotic kinematic linkages.',
      essential_formula: '\\vec{a} \\cdot \\vec{b} = |\\vec{a}||\\vec{b}|\\cos\\theta \\quad \\Big| \\quad \\vec{a} \\times \\vec{b} = |\\vec{a}||\\vec{b}|\\sin\\theta \\, \\hat{n} \\quad \\Big| \\quad \\text{proj}_{\\vec{b}}\\vec{a} = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}',
      core_breakdown: [
        {
          title: 'Position Vectors, Unit Vectors & Direction Cosines',
          content: [
            'Position Vector: \\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k} with magnitude |\\vec{r}| = \\sqrt{x^2 + y^2 + z^2}.',
            'Unit Vector: \\hat{a} = \\frac{\\vec{a}}{|\\vec{a}|} in the direction of \\vec{a}.',
            'Direction Cosines: l = \\cos\\alpha, m = \\cos\\beta, n = \\cos\\gamma satisfy l^2 + m^2 + n^2 = 1. Direction ratios (a, b, c) relate via l = \\frac{a}{\\sqrt{a^2+b^2+c^2}}.'
          ]
        },
        {
          title: 'Scalar (Dot) Product & Orthogonality Conditions',
          content: [
            'Dot Product Definition: \\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3 = |\\vec{a}||\\vec{b}|\\cos\\theta.',
            'Orthogonality Condition: Two non-zero vectors are perpendicular (\\theta = 90^\\circ) iff \\vec{a} \\cdot \\vec{b} = 0.',
            'Scalar Projection: Projection of \\vec{a} on \\vec{b} is \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|}; Vector projection is \\left(\\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{b}|^2}\\right)\\vec{b}.'
          ]
        },
        {
          title: 'Vector (Cross) Product & Geometric Areas',
          content: [
            'Cross Product Definition: \\vec{a} \\times \\vec{b} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ a_1 & a_2 & a_3 \\\\ b_1 & b_2 & b_3 \\end{vmatrix} = |\\vec{a}||\\vec{b}|\\sin\\theta \\, \\hat{n}.',
            'Collinearity Condition: Two non-zero vectors are parallel iff \\vec{a} \\times \\vec{b} = \\vec{0} \\iff \\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\frac{a_3}{b_3}.',
            'Areas: Area of parallelogram with adjacent sides \\vec{a}, \\vec{b} is |\\vec{a} \\times \\vec{b}|; with diagonals \\vec{d}_1, \\vec{d}_2 is \\frac{1}{2}|\\vec{d}_1 \\times \\vec{d}_2|; Area of triangle is \\frac{1}{2}|\\vec{a} \\times \\vec{b}|.'
          ]
        }
      ],
      exam_traps: [
        'Cross Product Anti-commutativity: \\vec{a} \\times \\vec{b} = -(\\vec{b} \\times \\vec{a}), whereas \\vec{a} \\cdot \\vec{b} = \\vec{b} \\cdot \\vec{a}.',
        'Projection Denominator Selection: Projection of \\vec{a} ON \\vec{b} has denominator |\\vec{b}|, NOT |\\vec{a}|.',
        'Zero Vector Result in Cross Product: \\vec{a} \\times \\vec{b} = \\vec{0} is the zero vector, not the scalar number 0.'
      ],
      quick_check: 'Find the scalar projection of vector \\vec{a} = 2\\hat{i} + 3\\hat{j} + 2\\hat{k} on vector \\vec{b} = \\hat{i} + 2\\hat{j} + \\hat{k} [Solution: Projection = (\\vec{a} \\cdot \\vec{b}) / |\\vec{b}| = (2(1) + 3(2) + 2(1)) / \\sqrt{1^2 + 2^2 + 1^2} = (2 + 6 + 2) / \\sqrt{6} = 10 / \\sqrt{6} = (5\\sqrt{6})/3].'
    }
  }
];

// =============================================================================
// Migration Execution Engine
// =============================================================================

async function runBatchIngestion() {
  console.log('================================================================');
  console.log('Starting Supabase Batch Ingestion for CBSE 2026-27 Curriculum');
  console.log('================================================================\n');

  // 1. Initial count
  const { count: beforeCount, error: countBeforeErr } = await supabase
    .from('content_modules')
    .select('*', { count: 'exact', head: true })
    .eq('module_type', 'CORE_CONCEPT');

  console.log(`[Status Before] public.content_modules (CORE_CONCEPT count): ${beforeCount ?? 0}`);

  const upsertedChapterIds = [];

  for (const item of CURRICULUM_MODULES_BATCH) {
    console.log(`\n--- Ingesting: Grade ${item.grade_level} ${item.subject_id.toUpperCase()} - "${item.topic_title}" ---`);

    // Ensure Unit Exists
    const { error: unitErr } = await supabase
      .from('units')
      .upsert({
        id: item.unit_id,
        board_id: item.board_id,
        grade_level: item.grade_level,
        subject_id: item.subject_id,
        unit_number: item.unit_number,
        title: item.unit_title
      }, { onConflict: 'id' });

    if (unitErr) {
      console.warn(`Unit upsert notice for ${item.unit_id}:`, unitErr.message);
    }

    // Upsert Topic under all aliased topic_ids so any query pattern matches
    for (const tid of item.topic_ids) {
      const { error: topicErr } = await supabase
        .from('topics')
        .upsert({
          id: tid,
          unit_id: item.unit_id,
          board_id: item.board_id,
          grade_level: item.grade_level,
          subject_id: item.subject_id,
          title: item.topic_title,
          core_logic_essence: item.core_logic_essence,
          metadata: {
            slug: item.slug,
            order_index: item.unit_number,
            syllabus_year: '2026-27',
            client_source: 'Brainoro OS Authoritative Engine',
            last_updated: new Date().toISOString()
          }
        }, { onConflict: 'id' });

      if (topicErr) {
        console.error(`Failed to upsert topic ${tid}:`, topicErr.message);
        continue;
      }

      // Upsert Content Module for this topic
      const moduleId = `MOD_${tid.replace(/[-_]/g, '_')}_CORE`;
      const { error: moduleErr } = await supabase
        .from('content_modules')
        .upsert({
          id: moduleId,
          topic_id: tid,
          module_type: 'CORE_CONCEPT',
          content: item.content,
          ocaverse_metadata: {
            authoritative: true,
            academic_year: '2026-27',
            board_id: item.board_id,
            grade_level: item.grade_level,
            subject_id: item.subject_id,
            topic_title: item.topic_title,
            updated_at: new Date().toISOString()
          }
        }, { onConflict: 'id' });

      if (moduleErr) {
        console.error(`Failed to upsert content_module for ${tid}:`, moduleErr.message);
      } else {
        upsertedChapterIds.push(tid);
      }
    }
  }

  // 2. Final count
  const { count: afterCount, error: countAfterErr } = await supabase
    .from('content_modules')
    .select('*', { count: 'exact', head: true })
    .eq('module_type', 'CORE_CONCEPT');

  console.log('\n================================================================');
  console.log(`[Status After] public.content_modules (CORE_CONCEPT count): ${afterCount ?? 0}`);
  console.log(`[Total Upserted Topic IDs]: ${upsertedChapterIds.length}`);
  console.log('Upserted Topic IDs list:', upsertedChapterIds);
  console.log('================================================================\n');
}

runBatchIngestion();
