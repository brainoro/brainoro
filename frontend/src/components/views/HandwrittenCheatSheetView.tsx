'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CurriculumConcept, CornellNotes, BoardId } from '../../lib/types';
import { getContentForTopic, synthesizeLocalOERNotes, classifySubjectDomain, isMiddleSchoolGrade } from '../../lib/services/contentService';
import {
  getConceptProvenance,
  ConceptProvenanceMetadata,
  StudentRevisionMode,
} from '../../lib/curriculumProvenance';

export const ENABLE_CHEAT_SHEET_VIEW = true;
import { VisualModelCard } from '../cornell/VisualModelCard';
import { OcaverseWatermarkContainer } from '../common/OcaverseWatermarkContainer';
import { MathFormula, MathText } from '../common/MathRenderer';
import {
  Sparkles,
  Lightbulb,
  Pin,
  AlertTriangle,
  CheckCircle2,
  Printer,
  FileCheck2,
  Tag,
  HelpCircle,
  BookOpen,
  BrainCircuit,
  RefreshCw,
  Check,
  Clock,
  Layers,
  Zap,
  Target,
  Search,
  X,
  ChevronRight,
  Info,
  ShieldCheck,
  Compass,
  ArrowRight,
  ExternalLink,
  Award,
  Globe,
} from 'lucide-react';

interface Props {
  concept: CurriculumConcept;
  boardId: BoardId;
}

interface ConceptCard {
  title: string;
  bullets: string[];
  fullContent?: string;
}

interface ConceptContext {
  id: string;
  boardId: string;
  subjectId: string;
  gradeLevel: number;
  title: string;
  unit?: string;
}

/**
 * Sanitizes plain text segments containing raw LaTeX tokens:
 * - Converts raw \mathbb{Q}, \mathbb{Z}, \mathbb{R}, \mathbb{N}, \mathbb{W}, \mathbb{C} to inline math $\mathbb{...}$
 * - Handles composite blackboard expressions like \mathbb{R} setminus \mathbb{Q} -> $\mathbb{R} \setminus \mathbb{Q}$
 * - Converts other raw mathematical symbols (\pi, \neq, \pm, etc.) to inline math if unescaped
 */
function sanitizePlainTextLatex(plain: string): string {
  if (!plain) return '';

  // Single-pass regex to replace raw LaTeX tokens without re-processing
  const tokenRegex =
    /(\\mathbb\{R\}\s*(?:setminus|\\setminus)\s*\\mathbb\{Q\}|\\mathbb\{[A-Za-z]\}|\\(?:pi|alpha|beta|gamma|theta|lambda|mu|sigma|omega|Delta|Omega|subset|subseteq|in|notin|cap|cup|setminus|emptyset|neq|leq|le|geq|ge|approx|times|div|pm|mp)\b)/g;

  return plain.replace(tokenRegex, (match) => {
    if (/\\mathbb\{R\}\s*(?:setminus|\\setminus)\s*\\mathbb\{Q\}/.test(match)) {
      return '$\\mathbb{R} \\setminus \\mathbb{Q}$';
    }
    const bbMatch = match.match(/\\mathbb\{([A-Za-z])\}/);
    if (bbMatch) {
      return `$\\mathbb{${bbMatch[1]}}$`;
    }
    return `$${match}$`;
  });
}

/**
 * Sanitizes LaTeX syntax across a string, ensuring math blocks ($$, $, \[, \() are preserved
 * and raw LaTeX strings in plain text are safely converted to inline math.
 */
function sanitizeLatexSyntax(text: string): string {
  if (!text) return '';
  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
  const parts: string[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mathRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(sanitizePlainTextLatex(text.substring(lastIndex, match.index)));
    }
    parts.push(match[0]);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(sanitizePlainTextLatex(text.substring(lastIndex)));
  }
  return parts.join('');
}

/**
 * Sanitizes math and example expressions:
 * - Ensures proper spacing around delimiters (commas, semicolons, operators).
 * - Separates multiple examples cleanly with comma or bullet formatting.
 * - Prevents adjacent KaTeX delimiters from colliding ($a$$b$ -> $a$ $b$).
 */
function sanitizeMathAndExamples(text: string): string {
  if (!text) return '';

  let res = text;

  // 1. Separate adjacent math expressions: $expr1$$expr2$ -> $expr1$ $expr2$
  res = res.replace(/\$([^\$]+)\$(\$)/g, '$$$1$$ $2');

  // 2. Ensure comma followed by non-space has space: e.g. "x=1,y=2" -> "x=1, y=2" (ignoring digits in numbers like 1,000)
  res = res.replace(/,([^\s\d])/g, ', $1');

  // 3. Ensure mathematical operators in simple arithmetic examples have clean spacing
  res = res.replace(/([^\s])([×÷])([^\s])/g, '$1 $2 $3');

  // 4. Ensure semicolons separating multiple examples have clean spacing: "e.g. A; B"
  res = res.replace(/;\s*/g, '; ');

  // 5. Clean up multiple spaces
  res = res.replace(/[ \t]{2,}/g, ' ').trim();

  return res;
}

/**
 * Parses dense mainNotes into individual bite-sized concept cards with max 2 bullets each.
 * Uses rigorous regex line parsing, strips leading markdown bullets, trims whitespace,
 * and purges empty/whitespace-only/lone-bullet lines.
 */
export function parseConceptCards(mainNotes?: string | null): ConceptCard[] {
  if (!mainNotes || typeof mainNotes !== 'string') return [];

  // Remove top title and Core Principle
  const cleaned = mainNotes
    .replace(/^###\s+[^\n]+\r?\n+/, '')
    .replace(/\*\*Core Principle\*\*:[^\n]+\r?\n+/, '')
    .trim();

  // Split by numbered headings like **1. Title**: or 1. **Title**: or ### Title
  const sectionRegex = /(?:^|\r?\n)(?:\*\*(\d+[\.\)]\s*[^\*\r\n]+?)\*\*:?|(\d+[\.\)]\s*\*\*[^\*\r\n]+?\*\*):?|###\s*([^\r\n]+))/g;

  const matches: { index: number; title: string; length: number }[] = [];
  let m: RegExpExecArray | null;

  while ((m = sectionRegex.exec(cleaned)) !== null) {
    const rawTitle = m[1] || m[2] || m[3] || '';
    const cleanTitle = rawTitle.replace(/\*\*/g, '').replace(/^\d+[\.\)]\s*/, '').trim();
    if (cleanTitle) {
      matches.push({
        index: m.index,
        title: cleanTitle,
        length: m[0].length,
      });
    }
  }

  const cards: ConceptCard[] = [];

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index + matches[i].length;
      const end = i + 1 < matches.length ? matches[i + 1].index : cleaned.length;
      const sectionContent = cleaned.substring(start, end).trim();

      // Split text content into array lines via text.split(/\r?\n/)
      const rawLines = sectionContent.split(/\r?\n/);
      const bullets: string[] = [];
      let currentBullet = '';

      for (const line of rawLines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('###')) continue;

        // Check if this line starts a new bullet
        if (/^[•\-\*–—\u2022\u25E6\u2043\u2219]/.test(trimmed) || /^\d+[\.\)]\s+/.test(trimmed)) {
          if (currentBullet.trim()) {
            const sanitized = sanitizeLatexSyntax(sanitizeMathAndExamples(currentBullet.trim()));
            if (sanitized.trim().length > 0 && !/^[•\-\*–—\u2022\s]+$/.test(sanitized)) {
              bullets.push(sanitized.trim());
            }
            currentBullet = '';
          }
          currentBullet = trimmed.replace(/^(?:[•\-\*–—\u2022\u25E6\u2043\u2219]|\d+[\.\)])\s*/, '').trim();
        } else if (trimmed.startsWith('$$')) {
          if (currentBullet.trim()) {
            const sanitized = sanitizeLatexSyntax(sanitizeMathAndExamples(currentBullet.trim()));
            if (sanitized.trim().length > 0 && !/^[•\-\*–—\u2022\s]+$/.test(sanitized)) {
              bullets.push(sanitized.trim());
            }
            currentBullet = '';
          }
          bullets.push(trimmed);
        } else {
          // Continuation line or paragraph line
          if (currentBullet) {
            currentBullet += ' ' + trimmed;
          } else {
            currentBullet = trimmed;
          }
        }

        if (bullets.length >= 2) break;
      }

      if (currentBullet.trim() && bullets.length < 2) {
        const sanitized = sanitizeLatexSyntax(sanitizeMathAndExamples(currentBullet.trim()));
        if (sanitized.trim().length > 0 && !/^[•\-\*–—\u2022\s]+$/.test(sanitized)) {
          bullets.push(sanitized.trim());
        }
      }

      // Filter array using line.trim().length > 0 and exclude pure bullet symbols
      const cleanBullets = bullets
        .map((b) => b.trim())
        .filter((b) => b.length > 0 && !/^[•\-\*—\s]+$/.test(b))
        .slice(0, 2);

      // If section has content but no bullets were extracted, extract first substantive line
      if (cleanBullets.length === 0 && sectionContent.length > 0) {
        const firstLine = sectionContent
          .split(/\r?\n/)
          .map((l) => l.replace(/^[•\-\*—\d+\.\)]\s*/, '').trim())
          .find((l) => l.length > 0 && !/^[•\-\*—\s]+$/.test(l));

        if (firstLine) {
          const sanitized = sanitizeLatexSyntax(sanitizeMathAndExamples(firstLine));
          if (sanitized.trim().length > 0) {
            cleanBullets.push(sanitized.trim().substring(0, 160));
          }
        }
      }

      const fullSanitized = sanitizeLatexSyntax(sanitizeMathAndExamples(sectionContent));
      cards.push({
        title: matches[i].title,
        bullets: cleanBullets,
        fullContent: fullSanitized.trim() || undefined,
      });
    }
  } else {
    // Fallback: split by double newlines into 2-3 compact cards
    const paragraphs = cleaned
      .split(/\r?\n\s*\r?\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0 && !/^[•\-\*—\s]+$/.test(p));

    paragraphs.slice(0, 4).forEach((p, idx) => {
      const sanitized = sanitizeLatexSyntax(sanitizeMathAndExamples(p));
      if (sanitized.length > 0) {
        cards.push({
          title: `Key Principle ${idx + 1}`,
          bullets: [sanitized.substring(0, 160)],
          fullContent: sanitized.trim(),
        });
      }
    });
  }

  return cards;
}

/**
 * Domain contextual fallback traps when curriculumTrap is missing or contains out-of-context text.
 */
function getContextualDomainTraps(concept: ConceptContext): string[] {
  const domain = classifySubjectDomain(concept as unknown as CurriculumConcept);
  const subj = (concept.subjectId || '').toUpperCase();
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''}`.toUpperCase();

  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    return [
      'Textual Evidence: Always support analytical statements with direct textual references, character actions, or precise quotes.',
      'Tense Consistency: Maintain uniform past tense for plot descriptions and present tense for universal thematic truths.',
      'Word Limit Compliance: Strictly observe prescribed word limits (30–40 words for Short Answer, 100–120 words for Long Answer).',
    ];
  }

  if (domain.isSocialScience) {
    if (domain.isHistory) {
      return [
        'Chronological Sequence: Ensure historical events and movement phases are structured in accurate timeline order.',
        'Statutory Terminology: Use exact NCERT terms (e.g. Satyagraha, Rowlatt Act, Swaraj) with specific dates and personalities.',
        'Sub-Headed Points: Structure 3-mark and 5-mark answers with distinct, underlined point headings.',
      ];
    }
    if (domain.isGeography) {
      return [
        'Climatic & Soil Requirements: State specific temperature ranges (°C) and rainfall requirements (cm) for crop cultivation.',
        'Map Pointing Precision: Accurately mark locations within correct state boundaries and write state names in brackets.',
        'Resource Classification: Distinguish clearly between renewable vs non-renewable and biotic vs abiotic resources.',
      ];
    }
    if (domain.isCivics) {
      return [
        'Constitutional Articles & Jurisdictions: Accurately cite constitutional provisions and distinguish Union, State, and Concurrent powers.',
        'Institutional Checks & Balances: Explain the division of powers between legislature, executive, and judiciary clearly.',
        'Point-Wise Headings: Present 3-mark and 5-mark governance answers with distinct numbered subheadings.',
      ];
    }
    if (domain.isEconomics) {
      return [
        'Economic Indicator Distinction: Differentiate clearly between per capita income, HDI, infant mortality rate, and literacy rate.',
        'Sector Classification: Distinguish Primary, Secondary, and Tertiary sectors with standard NCERT examples.',
        'Sustainable Development: Highlight resource conservation and environmental equity in economic arguments.',
      ];
    }
    return [
      'NCERT Point-Wise Structure: Provide 3 distinct numbered points for 3-mark questions and 5 points for 5-mark questions.',
      'Statutory Terminology: Use exact curriculum vocabulary instead of informal conversational phrasing.',
      'Map & Timeline Verification: Double-check geographical boundaries and historical date milestones.',
    ];
  }

  if (domain.isCommerce) {
    if (domain.isAccountancy) {
      return [
        'Dual Aspect Balance: Ensure every Debit entry has an equal and corresponding Credit entry before closing accounts.',
        'Account Classification: Correctly categorize Personal, Real, and Nominal accounts before applying golden rules.',
        'Format & Working Notes: Draw complete journal/ledger format columns and show all calculations in numbered working notes.',
      ];
    }
    if (domain.isBusinessStudies) {
      return [
        'Principles vs Functions: Do not confuse Fayol’s 14 Principles of Management with the 5 Managerial Functions (POSDC).',
        'Efficiency vs Effectiveness: Distinguish between completing tasks on time (effective) versus at minimum cost (efficient).',
        'Case Study Linkage: Quote lines directly from given case study prompts before stating the identified management principle.',
      ];
    }
    return [
      'Format Integrity: Follow prescribed accounting and managerial formats with neat columns and headings.',
      'Statutory Concepts: Use standard commercial terminology adhering to board curriculum guidelines.',
      'Reconciliation Checks: Verify calculations across working notes and final financial statements.',
    ];
  }

  if (domain.isComputerScience) {
    return [
      '0-Based Indexing: Remember that strings, lists, and arrays start at index 0 and end at length - 1.',
      'Mutable vs Immutable: Tuples and strings cannot be modified in place; lists and dictionaries are mutable.',
      'SQL Clause Order: Structure queries strictly as SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY.',
    ];
  }

  if (
    subj === 'PHYSICS' ||
    searchStr.includes('-PHYSICS-') ||
    searchStr.includes('OPTICS') ||
    searchStr.includes('MOTION') ||
    searchStr.includes('ELEC') ||
    searchStr.includes('SOUND') ||
    searchStr.includes('LIGHT') ||
    searchStr.includes('LENS')
  ) {
    if (
      searchStr.includes('OPT') ||
      searchStr.includes('LENS') ||
      searchStr.includes('MIRROR') ||
      searchStr.includes('LIGHT')
    ) {
      return [
        'Cartesian Sign Convention: Object distance u is always negative; convex lens focal length f is positive.',
        'Formula Difference: Thin Lens is 1/f = 1/v - 1/u (minus), while Mirror is 1/f = 1/v + 1/u (plus).',
        'Unit of Optical Power: Always convert focal length from cm to meters (m) before computing P = 1/f in dioptres (D).',
      ];
    }
    if (searchStr.includes('ELEC') || searchStr.includes('OHM') || searchStr.includes('CIRCUIT')) {
      return [
        'Parallel Resistance Reciprocal: Remember to invert 1/R_p to find R_p after adding fractional reciprocals.',
        'Meter Connections: Ammeter must connect strictly in series (low resistance); Voltmeter strictly in parallel (high resistance).',
        'Wire Geometry Invariant: Stretching a wire doubles length and halves area, increasing resistance by 4-fold.',
      ];
    }
    return [
      'Unit Conversions: Always convert non-standard units (cm → m, km/h → m/s, minutes → seconds) before calculating.',
      'Vector Direction: State positive/negative directional reference frames for velocity, force, and acceleration.',
      'Formula Statement: State the governing physical law equation before substituting numerical values.',
    ];
  }

  if (
    subj === 'CHEMISTRY' ||
    searchStr.includes('-CHEM-') ||
    searchStr.includes('ACID') ||
    searchStr.includes('REACTION') ||
    searchStr.includes('ATOM')
  ) {
    return [
      'State Symbols: Always include physical states (s, l, g, aq) in balanced chemical equations when prompted.',
      'Stoichiometric Balance: Verify atom conservation on both reactant and product sides before calculating.',
      'Valency Criss-Cross: Double-check cation and anion oxidation numbers when writing chemical formulas.',
    ];
  }

  if (
    subj === 'BIOLOGY' ||
    searchStr.includes('-BIO-') ||
    searchStr.includes('HEART') ||
    searchStr.includes('CELL') ||
    searchStr.includes('CIRCULAT') ||
    searchStr.includes('LIFE')
  ) {
    return [
      'Directional Arrows: Always draw directional flow arrows in circulatory and physiological sequence diagrams.',
      'Precise Biological Terms: Use exact terms (e.g. peristalsis, pulmonary, alveoli) rather than colloquial descriptions.',
      'Valve Function: State that valves prevent backflow of blood, rather than actively pumping blood.',
    ];
  }

  // Mathematics domains:
  const isMensuration =
    searchStr.includes('MENSUR') ||
    searchStr.includes('AREA') ||
    searchStr.includes('VOLUME') ||
    searchStr.includes('PERIMETER') ||
    searchStr.includes('SURFACE');
  const isGeometry =
    searchStr.includes('GEOM') ||
    searchStr.includes('TRIANGLE') ||
    searchStr.includes('CIRCLE') ||
    searchStr.includes('CONGRU') ||
    searchStr.includes('QUAD') ||
    (searchStr.includes('LINE') && !searchStr.includes('NUMBER LINE')) ||
    searchStr.includes('SEGMENT') ||
    searchStr.includes('POINT') ||
    searchStr.includes('RAY') ||
    searchStr.includes('ANGLE') ||
    searchStr.includes('LINES AND ANGLES') ||
    searchStr.includes('PARALLEL') ||
    searchStr.includes('PERPENDICULAR');
  const isAlgebra =
    searchStr.includes('ALGEBRA') ||
    searchStr.includes('EQUATION') ||
    searchStr.includes('POLYNOMIAL') ||
    searchStr.includes('QUADRATIC') ||
    searchStr.includes('LINEQ');

  const isEuclid =
    searchStr.includes('EUCLID') ||
    searchStr.includes('AXIOM') ||
    searchStr.includes('POSTULATE') ||
    searchStr.includes('PLAYFAIR');
  const isQuad =
    searchStr.includes('QUAD') ||
    searchStr.includes('PARALL') ||
    searchStr.includes('RHOMBUS') ||
    searchStr.includes('TRAPEZ') ||
    searchStr.includes('MIDPOINT');
  const isTriangles =
    searchStr.includes('TRIANGLE') ||
    searchStr.includes('CONGRU') ||
    searchStr.includes('CPCTC');

  if (isMensuration) {
    return [
      'Slant Height vs Vertical Height: Always calculate slant height l = √(r² + h²) when finding cone Curved Surface Area (πrl).',
      'Solid Hemisphere TSA vs CSA: Total Surface Area of a solid hemisphere is strictly 3πr² (curved surface 2πr² + flat circular base πr²).',
      'Unit Conversion Consistency: Keep all linear dimensions in identical units (cm or m) and note that 1 m³ = 1000 liters.',
    ];
  }

  if (isEuclid) {
    return [
      'Axioms vs Postulates Distinction: Axioms are universal mathematical truths applicable across all branches; Postulates are geometric assumptions.',
      'Misinterpreting Postulate 5: Postulate 5 defines the condition (interior angle sum < 180°) where lines WILL meet, not just that parallel lines never meet.',
      'Axiomatic Primitives: Point, Line, and Plane are undefined terms in Euclidean geometry to prevent circular logic.',
    ];
  }

  if (isQuad) {
    return [
      'Midpoint Theorem Application: The segment joining midpoints of two sides of a triangle is both parallel to the base AND equal to half its length (EF = 1/2 BC).',
      'Parallelogram vs Trapezium: A parallelogram requires TWO pairs of parallel opposite sides; a trapezium has ONLY ONE pair.',
      'Rhombus vs Rectangle Diagonal Invariants: Rhombus diagonals bisect each other perpendicularly at 90°; rectangle diagonals are equal in length.',
    ];
  }

  if (isTriangles) {
    return [
      'AAA Misconception: AAA proves similarity (identical shape), but NOT congruence (equal size).',
      'Corresponding Vertex Order: Match vertices strictly in corresponding order when stating congruence: ΔABC ≅ ΔDEF.',
      'SAS Included Angle Requirement: In SAS congruence, the angle must be strictly included between the two equal sides.',
    ];
  }

  if (isGeometry) {
    const isBasicLinesAndAngles =
      (searchStr.includes('LINE') && !searchStr.includes('NUMBER LINE')) ||
      searchStr.includes('SEGMENT') ||
      searchStr.includes('POINT') ||
      searchStr.includes('RAY') ||
      searchStr.includes('ANGLE');

    if (isBasicLinesAndAngles) {
      return [
        'Confusing Line Segment with Line or Ray: A line segment has two fixed endpoints and finite measurable length; a line has zero endpoints extending endlessly in both directions; a ray has one endpoint.',
        'Ruler Alignment Precision: Always align the zero mark (0 cm) of the ruler with the start endpoint, not the outer edge of the ruler.',
        'Geometric Notation Distinction: Distinguish between segment AB (path between endpoints), length AB (scalar measurement), line <->AB, and ray ->AB.',
      ];
    }

    return [
      'Theorem Justification: State the governing geometric theorem in brackets for every deductive step.',
      'Rigorous Proof Steps: State given parameters, construction (if any), and cite the governing theorem for each deduction.',
      'Geometric Invariants: Verify that properties hold under all geometric rotations and translations.',
    ];
  }

  if (isAlgebra) {
    return [
      'Distributive Negative Sign: Distribute negative signs to all terms inside brackets: -(ax - b) = -ax + b.',
      'Transposition Sign Flip: Moving a term across the equals sign inverts its sign (+ to -, × to ÷).',
      'LHS = RHS Check: Substitute the evaluated solution back into the original equation to verify correctness.',
    ];
  }

  // Numbers & Arithmetic (Fractions, Integers, Decimals, Ratios)
  return [
    'Negative Sign Rules: Remember that subtracting a negative number is adding: a - (-b) = a + b, and (-a) × (-b) = +ab.',
    'Number Line Magnitude vs Value: On the negative side, numbers with larger numerals are further left from zero, so -10 < -2.',
    'BODMAS / Order of Operations: Evaluate brackets and multiplication/division before addition/subtraction.',
  ];
}

/**
 * Strips academic mark-scheme prose from curriculumTrap and extracts 3-4 short checkmark bullets.
 * Filters out out-of-context traps and falls back to domain-specific traps.
 */
function filterAndSanitizeTraps(curriculumTrap: string, concept: ConceptContext): string[] {
  if (!curriculumTrap) return getContextualDomainTraps(concept);

  const domain = classifySubjectDomain(concept as unknown as CurriculumConcept);
  const subj = (concept.subjectId || '').toUpperCase();
  const searchStr = `${concept.id} ${concept.title} ${concept.unit || ''}`.toUpperCase();
  const isMensuration =
    searchStr.includes('MENSUR') ||
    searchStr.includes('AREA') ||
    searchStr.includes('VOLUME') ||
    searchStr.includes('PERIMETER');
  const isGeometry =
    searchStr.includes('GEOM') ||
    searchStr.includes('TRIANGLE') ||
    searchStr.includes('CIRCLE') ||
    searchStr.includes('CONGRU') ||
    searchStr.includes('QUAD') ||
    (searchStr.includes('LINE') && !searchStr.includes('NUMBER LINE')) ||
    searchStr.includes('SEGMENT') ||
    searchStr.includes('POINT') ||
    searchStr.includes('RAY') ||
    searchStr.includes('ANGLE') ||
    searchStr.includes('LINES AND ANGLES') ||
    searchStr.includes('PARALLEL') ||
    searchStr.includes('PERPENDICULAR');

  // Strip academic mark-scheme prose and section headers
  const pitfallSection = curriculumTrap
    .split(/2\.\s+(?:Explanation Depth Requirements|Quick Verification Check|Criterion D Real-World Verification Check)/i)[0]
    .replace(/^Key exam trap for [^\:]+:\s*/i, '')
    .replace(/^CBSE Board Exam Traps[^\:]*:\s*/i, '')
    .replace(/^1\.\s+(?:Common Pitfalls & Mark-Loss Patterns|IB MYP Assessment Pitfalls|Cambridge Mark Scheme Pitfalls)[^\:]*:\s*/im, '')
    .trim();

  const lines = pitfallSection
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && l !== '•' && l !== '-' && l !== '*' && l !== '—');

  const parsedTraps: string[] = [];
  let currentTrap = '';

  for (const line of lines) {
    if (/^(?:1|2)\.\s+(?:Common Pitfalls|IB MYP Assessment|Cambridge Mark Scheme|Quick Verification|Criterion D)/i.test(line)) {
      continue;
    }

    const isNumbered = /^\d+[\.\)]\s+/.test(line);
    const isBullet = /^[•\-\*—]\s+/.test(line);

    if (isNumbered) {
      if (currentTrap.trim()) {
        parsedTraps.push(currentTrap.trim());
      }
      currentTrap = line.replace(/^\d+[\.\)]\s+/, '').trim();
    } else if (isBullet) {
      if (currentTrap) {
        currentTrap += '\n' + line;
      } else {
        currentTrap = line.replace(/^[•\-\*—]\s+/, '').trim();
      }
    } else {
      if (currentTrap) {
        currentTrap += ' ' + line;
      } else {
        currentTrap = line;
      }
    }
  }

  if (currentTrap.trim()) {
    parsedTraps.push(currentTrap.trim());
  }

  const rawItems = parsedTraps
    .map((t) => sanitizeLatexSyntax(sanitizeMathAndExamples(t)))
    .filter((t) => t.length > 0 && !/^[•\-\*—\s]+$/.test(t));

  // Relevance filtering: filter out out-of-context traps
  const relevantItems = rawItems.filter((item) => {
    const uItem = item.toUpperCase();

    // If topic is non-STEM, reject math, physics, chemistry arithmetic traps
    if (
      (domain.isEnglish || domain.isHindi || domain.isSanskrit || domain.isSocialScience || domain.isCommerce) &&
      (uItem.includes('BODMAS') ||
        uItem.includes('PEMDAS') ||
        uItem.includes('ALGEBRAIC') ||
        uItem.includes('EQUATION BALANCE') ||
        uItem.includes('TRANSPOSITION') ||
        uItem.includes('NEGATIVE NUMBER') ||
        uItem.includes('SUBTRACTING NEGATIVE') ||
        uItem.includes('QUADRATIC') ||
        uItem.includes('ORDER OF OPERATIONS') ||
        uItem.includes('MENSURATION') ||
        uItem.includes('STOICHIOMETRIC') ||
        uItem.includes('VALENCY') ||
        uItem.includes('OPTICAL POWER') ||
        uItem.includes('OHM') ||
        uItem.includes('RESISTANCE') ||
        uItem.includes('AMPERE') ||
        uItem.includes('VOLTMETER'))
    ) {
      return false;
    }

    // If topic is Geometry, reject pure arithmetic/algebraic traps
    if (
      isGeometry &&
      (uItem.includes('BODMAS') ||
        uItem.includes('PEMDAS') ||
        uItem.includes('ALGEBRAIC') ||
        uItem.includes('EQUATION BALANCE') ||
        uItem.includes('TRANSPOSITION') ||
        uItem.includes('NEGATIVE NUMBER') ||
        uItem.includes('SUBTRACTING NEGATIVE') ||
        uItem.includes('QUADRATIC') ||
        uItem.includes('UNKNOWN VARIABLE') ||
        uItem.includes('ORDER OF OPERATIONS'))
    ) {
      return false;
    }

    // If topic is NOT mensuration, reject mensuration traps
    if (
      !isMensuration &&
      (uItem.includes('MENSURATION') ||
        uItem.includes('PERIMETER') ||
        uItem.includes('CM²') ||
        uItem.includes('CM³') ||
        uItem.includes('UNITS OF MENSURATION'))
    ) {
      return false;
    }

    // If topic is Physics/Chemistry/Biology, reject pure algebraic quadratic/mensuration traps
    if (
      (subj === 'PHYSICS' || subj === 'CHEMISTRY' || subj === 'BIOLOGY') &&
      (uItem.includes('QUADRATIC') ||
        uItem.includes('MENSURATION') ||
        uItem.includes('SQUARE ROOTS') ||
        uItem.includes('BODMAS'))
    ) {
      return false;
    }

    // If topic is Numbers/Arithmetic, reject geometric theorem traps
    if (
      !isGeometry &&
      (uItem.includes('GEOMETRIC THEOREM') || uItem.includes('CONSTRUCTION') || uItem.includes('DOTTED LINES'))
    ) {
      return false;
    }

    return true;
  });

  // If we have at least 2 relevant traps, return up to 3
  if (relevantItems.length >= 2) {
    return relevantItems.slice(0, 3);
  }

  // Otherwise, combine relevant items with domain fallback traps
  const fallbackTraps = getContextualDomainTraps(concept).map((t) =>
    sanitizeLatexSyntax(sanitizeMathAndExamples(t))
  );
  const combined = [...relevantItems];
  for (const fb of fallbackTraps) {
    if (combined.length >= 3) break;
    if (!combined.some((existing) => existing.toLowerCase().includes(fb.slice(0, 15).toLowerCase()))) {
      combined.push(fb);
    }
  }

  return combined.slice(0, 3);
}

const CARD_STYLES = [
  {
    bg: 'bg-white',
    border: 'border-sky-200',
    badge: 'bg-sky-100 text-sky-700 border-sky-200',
    title: 'text-sky-700',
  },
  {
    bg: 'bg-white',
    border: 'border-indigo-200',
    badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    title: 'text-indigo-700',
  },
  {
    bg: 'bg-white',
    border: 'border-teal-200',
    badge: 'bg-teal-100 text-teal-700 border-teal-200',
    title: 'text-teal-700',
  },
  {
    bg: 'bg-white',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700 border-amber-200',
    title: 'text-amber-700',
  },
];

/**
 * Resolves the effective structural rule ensuring domain invariant protection.
 * Protects English, Social Science, Commerce, and CS from receiving leaked STEM equations.
 */
function resolveEffectiveStructuralRule(notes: CornellNotes | null, concept: CurriculumConcept): string {
  const domain = classifySubjectDomain(concept);
  const searchStr = `${concept.id} ${concept.title || ''} ${concept.unit || ''}`.toUpperCase();
  const rawRule = notes?.structuralRule || '';
  const isMS = isMiddleSchoolGrade(concept.gradeLevel);

  const isMismatchedChemistry =
    !domain.isChem && (
      rawRule.includes('Chemical Reaction') ||
      rawRule.includes('Mass of Reactants') ||
      rawRule.includes('Reactants \\longrightarrow Products') ||
      rawRule.includes('m_{\\text{reactants}}')
    );

  const isMismatchedMath =
    (domain.isEnglish || domain.isHindi || domain.isSanskrit || domain.isSocialScience || domain.isCommerce) && (
      rawRule.includes('x + a = b') ||
      rawRule.includes('LHS \\equiv RHS') ||
      rawRule.includes('f(x) = y') ||
      rawRule.includes('\\Delta y = m')
    );

  if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
    if (!rawRule || isMismatchedChemistry || isMismatchedMath) {
      return isMS
        ? '$$\\text{Theme / Moral} \\longleftarrow \\text{Narrative Arc } (\\text{Exposition} \\to \\text{Climax} \\to \\text{Resolution}) \\longleftarrow \\text{Character Motivation}$$'
        : '$$\\text{Literary Analysis: } \\text{Textual Evidence} + \\text{Stylistic Device (Tone / Metaphor)} \\Longrightarrow \\text{Thematic Purpose}$$';
    }
  }

  if (domain.isSocialScience) {
    if (!rawRule || isMismatchedChemistry || isMismatchedMath) {
      if (domain.isHistory) {
        return '$$\\text{Historical Invariant: } \\text{Pre-conditions / Causes} \\longrightarrow \\text{Key Movement / Milestone} \\longrightarrow \\text{Institutional Transformation}$$';
      }
      if (domain.isGeography) {
        return '$$\\text{Geographical Invariant: } \\text{Physical / Climatic Factors} + \\text{Human Geography} \\Longrightarrow \\text{Spatial Distribution \\& Sustainability}$$';
      }
      if (domain.isCivics) {
        return '$$\\text{Constitutional Invariant: } \\text{Constitutional Framework} \\longleftrightarrow \\text{Checks \\& Balances} \\longleftrightarrow \\text{Citizen Democratic Rights}$$';
      }
      if (domain.isEconomics) {
        return '$$\\text{Economic Invariant: } \\text{Resource Allocation} + \\text{Market Dynamics} \\Longrightarrow \\text{Sustainable Development \\& Welfare}$$';
      }
      return '$$\\text{Social Science Invariant: } \\text{Socio-Historical Context} \\longrightarrow \\text{Civic \\& Economic Dynamics} \\longrightarrow \\text{Democratic Development}$$';
    }
  }

  if (domain.isCommerce) {
    if (!rawRule || isMismatchedChemistry || isMismatchedMath) {
      if (domain.isAccountancy) {
        return '$$\\text{Debit (Assets / Expenses Increase)} = \\text{Credit (Liabilities / Capital / Revenue Increase)} \\quad | \\quad \\text{Assets} = \\text{Liabilities} + \\text{Capital}$$';
      }
      if (domain.isBusinessStudies) {
        return '$$\\text{Management Cycle: } \\text{Planning} \\longrightarrow \\text{Organizing} \\longrightarrow \\text{Staffing} \\longrightarrow \\text{Directing} \\longrightarrow \\text{Controlling}$$';
      }
      return '$$\\text{Commerce Invariant: } \\text{Commercial Transaction} \\longrightarrow \\text{Financial Accountability} \\longrightarrow \\text{Business Sustainability}$$';
    }
  }

  if (domain.isComputerScience) {
    if (!rawRule || isMismatchedChemistry || isMismatchedMath) {
      return '$$\\text{Computational Logic: } \\text{Algorithm Input} \\longrightarrow \\text{Deterministic Execution } [\\mathcal{O}(n) \\text{ Time}] \\longrightarrow \\text{Verified Output}$$';
    }
  }

  const isGeometry =
    searchStr.includes('LINE') ||
    searchStr.includes('SEGMENT') ||
    searchStr.includes('POINT') ||
    searchStr.includes('RAY') ||
    searchStr.includes('ANGLE') ||
    searchStr.includes('GEOM');

  const isAlgebraicRule =
    rawRule.includes('x + a = b') ||
    rawRule.includes('LHS \\equiv RHS') ||
    rawRule.includes('\\Delta y = m') ||
    rawRule.includes('x = b - a');

  if (isGeometry && (!rawRule || isAlgebraicRule)) {
    if (searchStr.includes('SEGMENT')) {
      return '$$\\text{Line Segment } \\overline{AB}: \\quad 2 \\text{ Endpoints } (A, B) \\quad | \\quad \\text{Length } AB = \\text{Finite and Measurable}$$';
    }
    if (searchStr.includes('POINT') && !searchStr.includes('LINE')) {
      return '$$\\text{Point } P: \\quad \\text{Location in Space} \\quad | \\quad \\text{Dimension} = 0 \\; (\\text{No Length, Breadth, or Height})$$';
    }
    if (searchStr.includes('RAY')) {
      return '$$\\text{Ray } \\overrightarrow{AB}: \\quad 1 \\text{ Fixed Endpoint (Origin } A\\text{)} \\quad | \\quad \\text{Extends Infinitely Through } B$$';
    }
    if (searchStr.includes('LINE') && !searchStr.includes('SEGMENT') && !searchStr.includes('NUMBER LINE')) {
      return '$$\\text{Line } \\overleftrightarrow{AB}: \\quad \\text{Extends Infinitely in Both Directions} \\quad | \\quad 0 \\text{ Endpoints}$$';
    }
    if (searchStr.includes('ANGLE')) {
      return '$$\\text{Angle } \\angle ABC: \\quad 2 \\text{ Rays } (\\overrightarrow{BA}, \\overrightarrow{BC}) \\text{ meeting at Vertex } B$$';
    }
    return '$$\\text{Geometric Invariant: } \\text{Spatial Structure } \\mathcal{S} \\quad | \\quad \\text{Preserved Under Rigid Motion}$$';
  }

  return rawRule || `\\text{Rule: ${concept.title}}`;
}

export const HandwrittenCheatSheetView: React.FC<Props> = ({ concept, boardId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [notes, setNotes] = useState<CornellNotes | null>(null);
  const [refreshIndex, setRefreshIndex] = useState(0);

  const isInternationalBoard =
    (boardId as string) === 'CAMBRIDGE' ||
    (boardId as string) === 'IB_MYP' ||
    (boardId as string) === 'IB' ||
    String(boardId).toUpperCase().includes('CAMBRIDGE') ||
    String(boardId).toUpperCase().includes('IB');

  // Student Persona & 5-Min Revision Mode State
  const [revisionMode, setRevisionMode] = useState<StudentRevisionMode>(() =>
    (boardId as string) === 'CAMBRIDGE' ||
    (boardId as string) === 'IB_MYP' ||
    (boardId as string) === 'IB' ||
    String(boardId).toUpperCase().includes('CAMBRIDGE') ||
    String(boardId).toUpperCase().includes('IB')
      ? 'cornell'
      : 'rapid'
  );
  const [showFiveMinRevision, setShowFiveMinRevision] = useState(false);
  const [showProvenanceDetails, setShowProvenanceDetails] = useState(false);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

  const loadContent = () => {
    setRefreshIndex((prev) => prev + 1);
  };

  useEffect(() => {
    let isCancelled = false;
    const reqConceptId = concept.id;
    const reqGradeLevel = concept.gradeLevel;
    const reqSubjectId = concept.subjectId;
    const reqBoardId = boardId;

    setErrorMsg(null);
    setNotes(null);
    setLoading(true);
    setCheckedSteps({});
    setSelectedCardIdx(null);
    setShowFiveMinRevision(false);

    getContentForTopic(concept, boardId)
      .then((res) => {
        if (isCancelled) return;
        // Validate against current active full educational identity
        if (
          concept.id !== reqConceptId ||
          concept.gradeLevel !== reqGradeLevel ||
          concept.subjectId !== reqSubjectId ||
          boardId !== reqBoardId
        ) {
          return; // Discard stale response
        }

        if (res.gradeLevel && res.gradeLevel !== concept.gradeLevel) {
          setErrorMsg(
            `Pedagogical Boundary Lock: Content payload for Grade ${res.gradeLevel} cannot be rendered for Grade ${concept.gradeLevel}.`
          );
          setLoading(false);
          return;
        }
        setNotes(res);
        setLoading(false);
      })
      .catch((err) => {
        if (isCancelled) return;
        console.warn('[CheatSheetView] Notice loading concept notes, activating local synthesis fallback:', err);
        try {
          const fallbackNotes = synthesizeLocalOERNotes(concept, boardId);
          setNotes(fallbackNotes);
          setErrorMsg(null);
          setLoading(false);
        } catch (synthErr) {
          setErrorMsg(err?.message || `DB Record not found for Concept ID: [${concept.id}]`);
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [
    concept,
    boardId,
    refreshIndex,
  ]);

  const conceptCards = useMemo(() => {
    if (!notes?.mainNotes) return [];
    return parseConceptCards(notes.mainNotes);
  }, [notes?.mainNotes]);

  const examTraps = useMemo(() => {
    return filterAndSanitizeTraps(notes?.curriculumTrap || '', {
      id: concept.id,
      boardId,
      subjectId: concept.subjectId,
      gradeLevel: concept.gradeLevel,
      title: concept.title,
      unit: concept.unit,
    });
  }, [notes?.curriculumTrap, concept.id, concept.subjectId, concept.gradeLevel, concept.title, concept.unit, boardId]);

  const effectiveRule = useMemo(() => {
    return resolveEffectiveStructuralRule(notes, concept);
  }, [notes, concept]);

  const domain = useMemo(() => {
    return classifySubjectDomain(concept);
  }, [concept]);

  const ruleCardTitle = useMemo(() => {
    if (domain.isEnglish || domain.isHindi || domain.isSanskrit) return '📌 Key Principle / Literary Framework';
    if (domain.isSocialScience) return '📌 Core Framework / Historical Invariant';
    if (domain.isCommerce) return '📌 Core Accounting / Management Principle';
    if (domain.isComputerScience) return '📌 Computational Logic / Algorithmic Invariant';
    return '📌 Essential Law / Formula';
  }, [domain]);

  const ruleBadgeLabel = useMemo(() => {
    if (domain.isEnglish || domain.isHindi || domain.isSanskrit) return 'Core Literary Rule';
    if (domain.isSocialScience) return 'Core Framework';
    if (domain.isCommerce) return 'Core Business Standard';
    if (domain.isComputerScience) return 'Core Logic Rule';
    return 'Exam Master Rule';
  }, [domain]);

  const quickCheckLabel = useMemo(() => {
    if (domain.isEnglish || domain.isHindi || domain.isSanskrit) return 'Quick Comprehension & Textual Check:';
    if (domain.isSocialScience) return 'Quick Conceptual & Timeline Check:';
    if (domain.isCommerce) return 'Quick Balance & Procedural Check:';
    if (domain.isComputerScience) return 'Quick Logic & Complexity Check:';
    return 'Quick Mental Calculation Check:';
  }, [domain]);

  const defaultTrapText = useMemo(() => {
    if (domain.isEnglish || domain.isHindi || domain.isSanskrit) {
      return 'Cite direct textual evidence and maintain consistent grammatical tense in analytical responses.';
    }
    if (domain.isSocialScience) {
      return 'Structure answers in distinct numbered points with statutory terms, dates, and clear sub-headings.';
    }
    if (domain.isCommerce) {
      return 'Verify debit/credit equilibrium, format column headers, and include detailed working notes.';
    }
    if (domain.isComputerScience) {
      return 'Check 0-based indexing, immutable variable constraints, and boundary loop conditions.';
    }
    const searchStr = `${concept.id} ${concept.title || ''} ${concept.unit || ''}`.toUpperCase();
    if (
      searchStr.includes('LINE') ||
      searchStr.includes('SEGMENT') ||
      searchStr.includes('POINT') ||
      searchStr.includes('RAY') ||
      searchStr.includes('ANGLE') ||
      searchStr.includes('GEOM')
    ) {
      return 'Check endpoint definitions, ruler zero-mark alignment, and geometric notation.';
    }
    return 'Check sign conventions, unit conversions, and operational ordering.';
  }, [concept, domain]);

  const provenance: ConceptProvenanceMetadata = useMemo(() => {
    return getConceptProvenance(concept);
  }, [concept]);

  const toggleStep = (stepIdx: number) => {
    setCheckedSteps((prev) => ({
      ...prev,
      [stepIdx]: !prev[stepIdx],
    }));
  };

  if (errorMsg) {
    return (
      <OcaverseWatermarkContainer
        key={`${concept.id}-cheatsheet-error`}
        variant="viewport"
        showBadge={false}
        className="bg-white border border-rose-200 rounded-2xl p-6 shadow-sm space-y-5 my-4"
      >
        <div className="flex items-start gap-3.5 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800">
          <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-1 flex-1">
            <h4 className="font-bold text-rose-800 text-base">Cheat Sheet Mode Alert</h4>
            <p className="text-xs font-mono text-rose-700">{errorMsg}</p>
          </div>
        </div>
        <button
          onClick={loadContent}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 shadow-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Loading Cheat Sheet</span>
        </button>
      </OcaverseWatermarkContainer>
    );
  }

  if (!notes || loading) {
    return (
      <OcaverseWatermarkContainer
        key={`${concept.id}-cheatsheet-skeleton`}
        variant="viewport"
        showBadge={false}
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-pulse"
      >
        {/* Banner Skeleton */}
        <div className="h-24 bg-slate-100 rounded-2xl border border-slate-200" />
        {/* Top Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="h-40 bg-slate-100 rounded-2xl border border-dashed border-slate-200" />
          <div className="h-40 bg-slate-100 rounded-2xl border border-dashed border-slate-200" />
        </div>
        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="h-36 bg-slate-100 rounded-2xl border border-slate-200" />
          <div className="h-36 bg-slate-100 rounded-2xl border border-slate-200" />
          <div className="h-36 bg-slate-100 rounded-2xl border border-slate-200" />
        </div>
        {/* Bottom Skeleton */}
        <div className="h-24 bg-slate-100 rounded-2xl border border-slate-200" />
      </OcaverseWatermarkContainer>
    );
  }

  return (
    <OcaverseWatermarkContainer
      key={`${concept.id}-cheatsheet-container`}
      variant="viewport"
      showBadge={false}
      className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6 print:bg-white print:border-none print:shadow-none print:p-2"
    >
      {/* ========================================================================= */}
      {/* 1. DECORATIVE TITLE HEADER BANNER & CONTROLS                              */}
      {/* ========================================================================= */}
      <div className="relative bg-sky-50 border border-sky-200 rounded-2xl p-4 sm:p-5 shadow-sm overflow-hidden print:border-slate-300 print:bg-slate-50">

        <div className="flex flex-col gap-3">
          {/* Top Row: Meta Badges + Provenance Indicator + Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold font-kalam uppercase tracking-wider text-sky-700 bg-sky-100 border border-sky-200 px-2 py-0.5 rounded-full shadow-sm">
                📝 Visual Cheat Sheet Mode
              </span>

              {/* Authoritative Provenance Badge */}
              <button
                type="button"
                onClick={() => setShowProvenanceDetails(!showProvenanceDetails)}
                className="group text-[10px] font-mono text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 transition shadow-sm"
                title="Click to view authoritative curriculum source & provenance"
              >
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>
                  {provenance.boardId === 'CBSE' ? 'NCERT/CBSE' : provenance.boardId} • Class {concept.gradeLevel} •{' '}
                  {provenance.academicYear} • {provenance.mappingState}
                </span>
                <Info className="w-2.5 h-2.5 opacity-70 group-hover:opacity-100" />
              </button>

              {concept.unit && (
                <span
                  className="text-[10px] font-sans text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 truncate max-w-[200px]"
                  title={concept.unit}
                >
                  {concept.unit.replace(/\\&/g, '&')}
                </span>
              )}
            </div>

            {/* Action Buttons: 5-Min Revision + Print Sheet */}
            <div className="flex items-center gap-2 print:hidden shrink-0">
              <button
                onClick={() => setShowFiveMinRevision(!showFiveMinRevision)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition shadow-sm font-sans ${
                  showFiveMinRevision
                    ? 'bg-amber-500 text-white border-amber-500 shadow-amber-200'
                    : 'bg-white hover:bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-300'
                }`}
                title="Open 5-Minute Quick Revision Checklist"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>⏱️ 5-Min Revision</span>
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs px-3 py-1.5 rounded-xl transition shadow-sm font-sans cursor-pointer"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-sky-600" />
                <span>PDF / Print</span>
              </button>
            </div>
          </div>

          {/* Middle Row: Handwritten Title */}
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-kalam tracking-wide print:text-black">
              {notes.title?.replace(/\\&/g, '&')}
            </h1>
          </div>

          {/* Bottom Row: Student Persona Segmented Control */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-sky-200 print:hidden">
            <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {/* Conditional Cornell Notes Tab (Only for Cambridge & IB, placed BEFORE Rapid Review) */}
              {isInternationalBoard && (
                <button
                  type="button"
                  onClick={() => {
                    setRevisionMode('cornell');
                    setSelectedCardIdx(null);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                    revisionMode === 'cornell'
                      ? 'bg-emerald-600 text-white shadow-md font-bold'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>📝 Cornell Notes</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setRevisionMode('rapid');
                  setSelectedCardIdx(null);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  revisionMode === 'rapid'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>⚡ Rapid Revision</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRevisionMode('easy_first');
                  setSelectedCardIdx(null);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  revisionMode === 'easy_first'
                    ? 'bg-amber-500 text-white shadow-md font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>🎯 Start Here (Easy First)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRevisionMode('deep_dive');
                  setSelectedCardIdx(null);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  revisionMode === 'deep_dive'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>🔍 Deep Dive</span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-slate-500 hidden md:inline-block">
              Mode:{' '}
              {revisionMode === 'cornell'
                ? 'Structured Cornell Note Matrix'
                : revisionMode === 'rapid'
                ? 'High-Yield Exam Focus'
                : revisionMode === 'easy_first'
                ? 'Foundational Intuition'
                : 'Full System Breakdown & Visual Models'}
            </span>
          </div>
        </div>

        {/* Provenance Details Expandable Drawer */}
        {showProvenanceDetails && (
          <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-emerald-200 space-y-2 text-xs font-sans text-slate-700 shadow-sm animate-fadeIn print:hidden">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200">
              <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                Authoritative Curriculum Provenance &amp; Source-of-Truth
              </span>
              <button
                onClick={() => setShowProvenanceDetails(false)}
                className="text-slate-400 hover:text-slate-700 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-500">Official Source:</span>{' '}
                <span className="text-slate-800 font-semibold">{provenance.source.sourceDocument}</span>
              </div>
              <div>
                <span className="text-slate-500">Curriculum Version:</span>{' '}
                <span className="text-slate-800 font-mono font-semibold">{provenance.curriculumVersion}</span> (
                {provenance.source.sourceVersion})
              </div>
              <div>
                <span className="text-slate-500">Academic Year:</span>{' '}
                <span className="text-emerald-700 font-semibold">{provenance.academicYear}</span>
              </div>
              <div>
                <span className="text-slate-500">Mapping State:</span>{' '}
                <span className="text-emerald-700 font-bold">{provenance.mappingState}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-slate-500">Section Reference:</span>{' '}
                <span className="text-slate-700">{provenance.source.sectionReference}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 5-MINUTE QUICK REVISION CHECKLIST (Expandable Panel)                       */}
      {/* ========================================================================= */}
      {showFiveMinRevision && (
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 shadow-sm space-y-4 print:hidden animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h3 className="font-kalam text-lg font-bold text-amber-800 tracking-wide">
                  ⏱️ 5-Minute Quick Revision Checklist
                </h3>
                <p className="text-xs text-slate-600 font-sans">
                  Complete these 7 high-yield checkpoints before exams or homework.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                {Object.values(checkedSteps).filter(Boolean).length} / 7 Checked
              </span>
              <button
                onClick={() => setShowFiveMinRevision(false)}
                className="p-1 rounded-lg bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-700 border border-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Step 1: Core Idea */}
            <div
              onClick={() => toggleStep(1)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                checkedSteps[1]
                  ? 'bg-emerald-50 border-emerald-300 text-slate-700'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                  checkedSteps[1]
                    ? 'bg-emerald-500 border-emerald-400 text-white font-bold'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {checkedSteps[1] && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-sky-700 block">1. 💡 Core Idea / Analogy</span>
                <p className="text-slate-600 leading-snug line-clamp-2">
                  {notes.coreAnalogy || concept.coreLogicEssence || concept.title}
                </p>
              </div>
            </div>

            {/* Step 2: Must-Know Terms */}
            <div
              onClick={() => toggleStep(2)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                checkedSteps[2]
                  ? 'bg-emerald-50 border-emerald-300 text-slate-700'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                  checkedSteps[2]
                    ? 'bg-emerald-500 border-emerald-400 text-white font-bold'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {checkedSteps[2] && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-indigo-700 block">2. 🔑 Must-Know Terms</span>
                <p className="text-slate-600 leading-snug">
                  {conceptCards.length > 0
                    ? conceptCards.map((c) => c.title).slice(0, 3).join(' • ')
                    : `${concept.title} definition & key attributes`}
                </p>
              </div>
            </div>

            {/* Step 3: Important Formulae */}
            <div
              onClick={() => toggleStep(3)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                checkedSteps[3]
                  ? 'bg-emerald-50 border-emerald-300 text-slate-700'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                  checkedSteps[3]
                    ? 'bg-emerald-500 border-emerald-400 text-white font-bold'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {checkedSteps[3] && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="space-y-1 text-xs flex-1 min-w-0">
                <span className="font-bold text-amber-700 block">3. 📌 Important Formula / Rule</span>
                <div className="overflow-x-auto overflow-y-hidden scrollbar-thin py-0.5 formula-container">
                  <MathFormula
                    formula={effectiveRule}
                    className="text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Step 4: Key Visual Model */}
            <div
              onClick={() => toggleStep(4)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                checkedSteps[4]
                  ? 'bg-emerald-50 border-emerald-300 text-slate-700'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                  checkedSteps[4]
                    ? 'bg-emerald-500 border-emerald-400 text-white font-bold'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {checkedSteps[4] && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-teal-700 block">4. 👁️ Key Visual / Representation</span>
                <p className="text-slate-600 leading-snug">
                  Mentally reconstruct the visual model or coordinate/system diagram for {concept.title}.
                </p>
              </div>
            </div>

            {/* Step 5: Common Traps */}
            <div
              onClick={() => toggleStep(5)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                checkedSteps[5]
                  ? 'bg-emerald-50 border-emerald-300 text-slate-700'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                  checkedSteps[5]
                    ? 'bg-emerald-500 border-emerald-400 text-white font-bold'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {checkedSteps[5] && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-rose-700 block">5. ⚠️ #1 Exam Trap to Avoid</span>
                <p className="text-slate-600 leading-snug line-clamp-2">
                  {examTraps[0] || defaultTrapText}
                </p>
              </div>
            </div>

            {/* Step 6: Relationships & Connections */}
            <div
              onClick={() => toggleStep(6)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                checkedSteps[6]
                  ? 'bg-emerald-50 border-emerald-300 text-slate-700'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                  checkedSteps[6]
                    ? 'bg-emerald-500 border-emerald-400 text-white font-bold'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {checkedSteps[6] && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-indigo-700 block">6. 🔗 Curriculum Connections</span>
                <p className="text-slate-600 leading-snug">
                  Unit: {concept.unit || concept.subjectId}. Forms building block for upcoming higher-order questions.
                </p>
              </div>
            </div>

            {/* Step 7: 30-Second Mental Check (Spans 2 columns on medium screens) */}
            <div
              onClick={() => toggleStep(7)}
              className={`md:col-span-2 p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                checkedSteps[7]
                  ? 'bg-emerald-50 border-emerald-300 text-slate-700'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                  checkedSteps[7]
                    ? 'bg-emerald-500 border-emerald-400 text-white font-bold'
                    : 'border-slate-300 bg-slate-50'
                }`}
              >
                {checkedSteps[7] && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="space-y-1 text-xs flex-1">
                <span className="font-bold text-emerald-700 block">7. 🧠 30-Second Mental Check</span>
                <p className="text-slate-600 leading-snug">
                  <MathText
                    text={
                      notes.verificationProblem ||
                      `Test ${concept.title} with a simple numerical example (e.g. 0, 1, or small integers) to verify correctness.`
                    }
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: START HERE (EASY FIRST) VIEW                                      */}
      {/* ========================================================================= */}
      {revisionMode === 'easy_first' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Hero: Start Here The Big Picture */}
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                <Target className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold">
                  Step 1: Build Intuition First
                </span>
                <h3 className="font-kalam text-xl font-bold text-slate-900 tracking-wide">
                  Start Here: The Big Picture
                </h3>
              </div>
            </div>

            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-sm sm:text-base font-sans font-medium text-slate-800 leading-relaxed shadow-inner">
              <MathText
                text={
                  notes.coreAnalogy ||
                  `Imagine ${concept.title} as a fundamental building block. Start with simple concrete examples before moving to formulas.`
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-700 font-kalam flex items-center gap-1.5">
                  <Pin className="w-3.5 h-3.5" />
                  The Primary Formula / Rule:
                </span>
                <div className="overflow-x-auto overflow-y-hidden scrollbar-thin py-1 formula-container">
                  <MathFormula
                    formula={effectiveRule}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
                <span className="text-xs font-bold text-rose-700 font-kalam flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  The #1 Pitfall To Avoid:
                </span>
                <p className="text-xs text-rose-800 font-sans leading-relaxed">
                  {examTraps[0] || defaultTrapText}
                </p>
              </div>
            </div>
          </div>

          {/* Foundational Concept Cards (First 2 Only) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
              </div>
              <h3 className="font-kalam text-base sm:text-lg font-bold text-slate-800 tracking-wide">
                🌱 Foundational Building Blocks (Master These First)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conceptCards.slice(0, 2).map((card, idx) => {
                const style = CARD_STYLES[idx % CARD_STYLES.length];
                const validBullets = card.bullets.filter(
                  (b) => b.length > 0 && !/^[•\-\*—\s]+$/.test(b)
                );
                const isSelected = selectedCardIdx === idx;

                return (
                  <div
                    key={`easy-card-${idx}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSelected}
                    onClick={() => setSelectedCardIdx(isSelected ? null : idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCardIdx(isSelected ? null : idx);
                      }
                    }}
                    className={`${style.bg} border-2 ${
                      isSelected
                        ? 'border-sky-500 ring-2 ring-sky-300/40 shadow-lg'
                        : `${style.border} hover:border-sky-400 shadow-sm hover:shadow-md`
                    } rounded-2xl p-5 space-y-3 cursor-pointer transition-all min-w-0`}
                  >
                    <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 min-w-0">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <span
                          className={`w-6 h-6 rounded-md ${style.badge} border font-kalam text-xs font-bold flex items-center justify-center shrink-0`}
                        >
                          0{idx + 1}
                        </span>
                        <h4 className={`font-kalam text-base font-bold ${style.title} tracking-wide truncate`}>
                          {card.title}
                        </h4>
                      </div>
                      {isSelected && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCardIdx(null);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 shrink-0 transition"
                          aria-label="Collapse card details"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-2 font-sans text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                      {validBullets.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                          <div className="flex-1 min-w-0 break-words">
                            <MathText text={b} />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Revealed Full Details when Selected */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 animate-fadeIn">
                        <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-sky-600 font-semibold">
                          <span>Detailed Breakdown</span>
                          <span className="text-[10px] text-slate-400 lowercase font-normal">Click card to collapse</span>
                        </div>
                        <div className="font-sans text-xs sm:text-[13px] text-slate-700 leading-relaxed max-h-60 overflow-y-auto pr-1 whitespace-pre-wrap">
                          {card.fullContent ? (
                            <MathText text={card.fullContent} />
                          ) : (
                            validBullets.map((b, bIdx) => (
                              <div key={bIdx} className="mb-1">
                                <MathText text={b} />
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: DEEP DIVE VIEW (Includes Verified Visual Model & Walkthrough)      */}
      {/* ========================================================================= */}
      {revisionMode === 'deep_dive' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Row: Intuition Cloud + Essential Formula Sticky Note */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Intuition Cloud Card */}
            <div className="bg-sky-50 border border-dashed border-sky-300 rounded-3xl p-5 shadow-sm relative overflow-hidden print:border-sky-400 print:bg-sky-50 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center shadow-inner">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <h3 className="font-kalam text-base sm:text-lg font-bold text-sky-800 tracking-wide">
                  💡 Real-World Intuition
                </h3>
              </div>

              <div className="font-sans font-medium text-sm sm:text-base text-slate-800 leading-relaxed break-words print:text-slate-900">
                <MathText
                  key={`${concept.id}-cs-analogy`}
                  text={
                    notes.coreAnalogy ||
                    `Visualize ${concept.title}: understand fundamental principles step-by-step through real-world applications.`
                  }
                />
              </div>
            </div>

            {/* Essential Formula Sticky Note */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 shadow-sm relative hover:shadow-md transition-shadow print:border-amber-400 print:bg-amber-50 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shadow-inner">
                    <Pin className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h3 className="font-kalam text-base sm:text-lg font-bold text-amber-800 tracking-wide print:text-amber-900">
                    {ruleCardTitle}
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200">
                  {ruleBadgeLabel}
                </span>
              </div>

              <div className="w-full max-w-full bg-white border border-amber-200 rounded-2xl p-3 shadow-inner text-center overflow-x-auto overflow-y-hidden scrollbar-thin whitespace-nowrap text-sm sm:text-base print:bg-white print:border-amber-300 formula-container">
                <MathFormula
                  key={`${concept?.id ?? 'concept'}-cs-formula`}
                  formula={effectiveRule}
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Integrated Verified Visual Model Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                <Compass className="w-3.5 h-3.5 text-indigo-600" />
              </div>
              <h3 className="font-kalam text-base sm:text-lg font-bold text-slate-800 tracking-wide">
                👁️ Verified Visual Model (Domain Invariant)
              </h3>
            </div>

            <div className="rounded-3xl border border-indigo-200 p-1 shadow-sm bg-slate-50">
              <VisualModelCard concept={concept} notes={notes} boardId={boardId} />
            </div>
          </div>

          {/* Full Concept Breakdown Cards Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                </div>
                <h3 className="font-kalam text-base sm:text-lg font-bold text-slate-800 tracking-wide">
                  📝 Complete Concept Breakdown ({conceptCards.length} Cards)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conceptCards.map((card, idx) => {
                const style = CARD_STYLES[idx % CARD_STYLES.length];
                const validBullets = card.bullets.filter(
                  (b) => b.length > 0 && !/^[•\-\*—\s]+$/.test(b)
                );
                const isSelected = selectedCardIdx === idx;

                return (
                  <div
                    key={`deep-card-${idx}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSelected}
                    onClick={() => setSelectedCardIdx(isSelected ? null : idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCardIdx(isSelected ? null : idx);
                      }
                    }}
                    className={`${style.bg} border-2 ${
                      isSelected
                        ? 'border-sky-500 ring-2 ring-sky-300/40 shadow-lg'
                        : `${style.border} hover:border-sky-400 shadow-sm hover:shadow-md`
                    } rounded-2xl p-4 flex flex-col justify-between space-y-3 cursor-pointer transition-all min-w-0`}
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 min-w-0">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span
                            className={`w-5 h-5 rounded-md ${style.badge} border font-kalam text-xs font-bold flex items-center justify-center shrink-0`}
                          >
                            {String(idx + 1).padStart(2, '00')}
                          </span>
                          <h4
                            className={`font-kalam text-sm sm:text-base font-bold ${style.title} tracking-wide break-words whitespace-normal leading-snug`}
                          >
                            {card.title}
                          </h4>
                        </div>
                        {isSelected && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCardIdx(null);
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 shrink-0 transition"
                            aria-label="Collapse card details"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {validBullets.length > 0 ? (
                        <div className="space-y-2 font-sans text-xs sm:text-[13px] text-slate-700 leading-snug font-medium">
                          {validBullets.map((b, bIdx) => (
                            <div key={bIdx} className="min-w-0">
                              {b.startsWith('$$') && b.endsWith('$$') ? (
                                <div className="my-1 overflow-x-auto overflow-y-hidden scrollbar-thin text-xs sm:text-sm formula-container">
                                  <MathFormula formula={b} className="text-xs sm:text-sm" />
                                </div>
                              ) : (
                                <div className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                                  <div className="flex-1 min-w-0 break-words">
                                    <MathText text={b} />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic font-sans">
                          Key concept: Core relationship and procedural rules for {card.title}.
                        </div>
                      )}

                      {/* Revealed Full Details when Selected */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 animate-fadeIn">
                          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-sky-600 font-semibold">
                            <span>Detailed Breakdown</span>
                            <span className="text-[10px] text-slate-400 lowercase font-normal">Click card to collapse</span>
                          </div>
                          <div className="font-sans text-xs sm:text-[13px] text-slate-700 leading-relaxed max-h-60 overflow-y-auto pr-1 whitespace-pre-wrap">
                            {card.fullContent ? (
                              <MathText text={card.fullContent} />
                            ) : (
                              validBullets.map((b, bIdx) => (
                                <div key={bIdx} className="mb-1">
                                  <MathText text={b} />
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Worked Example Step Walkthrough (If Available) */}
          {notes.workedExample && (
            <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h3 className="font-kalam text-base sm:text-lg font-bold text-emerald-800 tracking-wide">
                  ✍️ Step-by-Step Worked Example Walkthrough
                </h3>
              </div>
              <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm font-sans text-slate-700">
                <div>
                  <span className="text-emerald-700 font-bold font-mono text-xs uppercase tracking-wider block mb-1">Problem:</span>
                  <MathText text={notes.workedExample.problem} />
                </div>
                {notes.workedExample.steps && notes.workedExample.steps.length > 0 && (
                  <div className="space-y-1.5 pt-1 border-t border-slate-200">
                    <span className="text-slate-500 font-bold font-mono text-xs uppercase tracking-wider block mb-1">Solution Steps:</span>
                    {notes.workedExample.steps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2">
                        <span className="text-sky-600 font-mono font-bold text-xs shrink-0 mt-0.5">{sIdx + 1}.</span>
                        <div className="flex-1 min-w-0">
                          <MathText text={step} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {notes.workedExample.result && (
                  <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                    <span className="text-emerald-700 font-bold font-mono text-xs uppercase tracking-wider">Final Result:</span>
                    <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                      <MathText text={notes.workedExample.result} />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Real World Applications (If Available) */}
          {notes.realWorldUse && (
            <div className="p-5 rounded-3xl bg-teal-50 border border-teal-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center">
                  <Globe className="w-3.5 h-3.5 text-teal-600" />
                </div>
                <h3 className="font-kalam text-base sm:text-lg font-bold text-teal-800 tracking-wide">
                  🌍 Real-World Engineering &amp; Industrial Applications
                </h3>
              </div>
              <div className="text-xs sm:text-sm font-sans text-slate-700 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
                <MathText text={notes.realWorldUse} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE: CORNELL NOTES VIEW (High School Cornell Format for Cambridge & IB)   */}
      {/* ========================================================================= */}
      {revisionMode === 'cornell' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Cornell Paper Container */}
          <div className="bg-[#fbfbf9] border-2 border-slate-300 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden font-sans">
            {/* 1. STRUCTURED HEADER (Date, Class, Topic, Objectives) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b-2 border-slate-300 text-xs">
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                <span className="text-[10px] uppercase font-mono font-bold text-teal-800 tracking-wider block mb-1">
                  📅 Date
                </span>
                <span className="font-semibold text-slate-800">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                <span className="text-[10px] uppercase font-mono font-bold text-teal-800 tracking-wider block mb-1">
                  🎓 Class / Grade
                </span>
                <span className="font-semibold text-slate-800">
                  {concept.boardId || boardId} • Grade {concept.gradeLevel || 8} ({concept.subjectId || 'Core'})
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs md:col-span-2">
                <span className="text-[10px] uppercase font-mono font-bold text-teal-800 tracking-wider block mb-1">
                  📖 Topic
                </span>
                <span className="font-bold text-slate-900 truncate block">
                  {notes.title || concept.title}
                </span>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs sm:col-span-2 md:col-span-4">
                <span className="text-[10px] uppercase font-mono font-bold text-teal-800 tracking-wider block mb-1">
                  🎯 Learning Objectives
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {notes.coreAnalogy ||
                    `Master foundational principles of ${concept.title}, deduce key mathematical/scientific relationships, and apply analytical problem-solving methodologies.`}
                </p>
              </div>
            </div>

            {/* 2. TWO-COLUMN MAIN AREA (Cue Column ~28% | Note-Taking Area ~72%) */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[420px] border-b-2 border-slate-300">
              {/* Cue Column (Left: ~28%) */}
              <div className="md:col-span-4 lg:col-span-3 py-6 md:pr-6 border-b-2 md:border-b-0 md:border-r-2 border-slate-300 space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b border-teal-200">
                  <div className="w-6 h-6 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center">
                    <Compass className="w-3.5 h-3.5 text-teal-700" />
                  </div>
                  <h3 className="font-mono text-sm sm:text-base font-bold text-teal-900 tracking-wide">
                    Cue Column
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Dynamic Cues */}
                  <div className="bg-white border border-teal-100 rounded-xl p-3 shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-teal-700">
                      Essential Question:
                    </span>
                    <p className="font-medium text-slate-800">
                      How does {concept.title} govern physical/mathematical systems under statutory conditions?
                    </p>
                  </div>

                  <div className="bg-white border border-teal-100 rounded-xl p-3 shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-teal-700">
                      Key Terminology:
                    </span>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      <li>Invariant principles</li>
                      <li>Standard units &amp; dimensional consistency</li>
                      <li>Governing equations &amp; boundary rules</li>
                    </ul>
                  </div>

                  <div className="bg-white border border-teal-100 rounded-xl p-3 shadow-xs space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold text-teal-700">
                      Exam Cue &amp; Traps:
                    </span>
                    <p className="font-medium text-slate-800">
                      {notes.curriculumTrap || 'Watch for unit conversion mismatches and non-standard notation.'}
                    </p>
                  </div>

                  {notes.cueQuestions && notes.cueQuestions.length > 0 && (
                    <div className="bg-white border border-teal-100 rounded-xl p-3 shadow-xs space-y-1">
                      <span className="text-[10px] uppercase font-mono font-bold text-teal-700">
                        Recall Check:
                      </span>
                      <p className="font-medium text-slate-800">
                        {notes.cueQuestions[0]}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Note-Taking Area (Right: ~72%) */}
              <div className="md:col-span-8 lg:col-span-9 py-6 md:pl-6 space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-teal-200">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center">
                      <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                    </div>
                    <h3 className="font-mono text-sm sm:text-base font-bold text-teal-900 tracking-wide">
                      Note-Taking Area
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    Syllabus-Aligned Direct Notes
                  </span>
                </div>

                {/* Key Law / Equation Box */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-slate-700 uppercase">
                      Formulaic Invariant &amp; Governing Rule:
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      Statutory Rule
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center overflow-x-auto">
                    <MathFormula formula={effectiveRule} />
                  </div>
                </div>

                {/* Detailed Cornell Notes & Cards */}
                <div className="space-y-4 text-xs text-slate-800 leading-relaxed">
                  {conceptCards && conceptCards.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {conceptCards.map((card, idx) => (
                        <div
                          key={`cornell-card-${idx}`}
                          className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs space-y-2"
                        >
                          <div className="flex items-center gap-2 font-bold text-slate-900 text-xs border-b border-slate-100 pb-1.5">
                            <span className="w-4 h-4 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span>{card.title}</span>
                          </div>
                          <ul className="space-y-1.5 pl-1">
                            {card.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-1.5 text-slate-700 text-xs">
                                <span className="text-teal-600 font-bold">•</span>
                                <MathText text={bullet} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2 font-mono">
                      <p className="font-semibold text-slate-900">1. Core Concept Overview:</p>
                      <p className="text-slate-700 pl-4">{notes.mainNotes || concept.coreLogicEssence}</p>
                    </div>
                  )}

                  {/* Worked Points / Steps */}
                  {notes.workedExample && (
                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
                      <span className="font-bold text-teal-900 text-xs uppercase tracking-wider block">
                        💡 Worked Problem-Solving Model:
                      </span>
                      <p className="font-medium text-slate-800">{notes.workedExample.problem}</p>
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-700">
                        {notes.workedExample.steps.map((st, i) => (
                          <div key={i} className="py-0.5">
                            <strong>Step {i + 1}:</strong> {st}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 3. FULL-WIDTH SUMMARY SECTION */}
            <div className="py-6 border-b-2 border-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5 text-teal-700" />
                </div>
                <h3 className="font-mono text-sm sm:text-base font-bold text-teal-900 tracking-wide">
                  Summary
                </h3>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {notes.summary ||
                    `In summary, ${concept.title} establishes core mathematical and scientific relationships. Mastery requires understanding the governing invariants, following disciplined multi-step derivations, and validating units.`}
                </p>
              </div>
            </div>

            {/* 4. FULL-WIDTH REFLECTION / SELF-ASSESSMENT SECTION */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                </div>
                <h3 className="font-mono text-sm sm:text-base font-bold text-teal-900 tracking-wide">
                  Reflection / Self-Assessment
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-teal-800">
                    1. Confidence Check
                  </span>
                  <p className="text-slate-600 text-xs">
                    Can I solve an examination problem on this concept without reviewing the notes?
                  </p>
                  <div className="flex gap-2 pt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px]">
                      Mastered
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 font-semibold text-[11px]">
                      Needs Practice
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-teal-800">
                    2. Cognitive Reflection
                  </span>
                  <p className="text-slate-600 text-xs">
                    What was the single most challenging aspect of this topic? Formulate one question to clarify.
                  </p>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 italic text-[11px]">
                    e.g., Understanding boundary conditions or multi-variable dependencies...
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-2">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider text-teal-800">
                    3. Actionable Next Step
                  </span>
                  <p className="text-slate-600 text-xs">
                    Proceed to the <strong>Adaptive Practice Simulator</strong> to reinforce retention and test psychometric mastery.
                  </p>
                  <span className="inline-flex items-center gap-1 text-teal-700 font-bold text-[11px]">
                    Step 2: Practice Ready <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 1: RAPID REVISION VIEW (Default High-Yield Layout)                   */}
      {/* ========================================================================= */}
      {revisionMode === 'rapid' && (
        <>
          {/* Top Row: Intuition Cloud + Essential Formula Sticky Note */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* 2. INTUITION CLOUD CARD (Top Left) */}
            <div className="bg-sky-50 border border-dashed border-sky-300 rounded-3xl p-5 shadow-sm relative overflow-hidden print:border-sky-400 print:bg-sky-50 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-lg bg-sky-100 border border-sky-200 flex items-center justify-center shadow-inner">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <h3 className="font-kalam text-base sm:text-lg font-bold text-sky-800 tracking-wide">
                  💡 Real-World Intuition
                </h3>
              </div>

              <div className="font-sans font-medium text-sm sm:text-base text-slate-800 leading-relaxed break-words print:text-slate-900">
                <MathText
                  key={`${concept.id}-cs-analogy`}
                  text={
                    notes.coreAnalogy ||
                    `Visualize ${concept.title}: understand fundamental principles step-by-step through real-world applications.`
                  }
                />
              </div>
            </div>

            {/* 3. FORMULA STICKY NOTE (Top Right) */}
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 shadow-sm relative hover:shadow-md transition-shadow print:border-amber-400 print:bg-amber-50 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 border border-amber-200 flex items-center justify-center shadow-inner">
                    <Pin className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h3 className="font-kalam text-base sm:text-lg font-bold text-amber-800 tracking-wide print:text-amber-900">
                    {ruleCardTitle}
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200">
                  {ruleBadgeLabel}
                </span>
              </div>

              <div className="w-full max-w-full bg-white border border-amber-200 rounded-2xl p-3 shadow-inner text-center overflow-x-auto overflow-y-hidden scrollbar-thin whitespace-nowrap text-sm sm:text-base print:bg-white print:border-amber-300 formula-container">
                <MathFormula
                  key={`${concept?.id ?? 'concept'}-cs-formula`}
                  formula={effectiveRule}
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* 4. CORE CONCEPT BREAKDOWN -> MULTI-CARD GRID (Zero Wall of Text) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <h3 className="font-kalam text-base sm:text-lg font-bold text-slate-800 tracking-wide">
                  📝 Core Concept Breakdown (Bite-Sized Cards)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                {conceptCards?.length ?? 0} Concept Cards
              </span>
            </div>

            {/* Responsive Multi-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conceptCards?.map((card, idx) => {
                const style = CARD_STYLES[idx % CARD_STYLES.length];
                const validBullets = (card?.bullets ?? [])
                  .map((b) => b?.trim() ?? '')
                  .filter((b) => b.length > 0 && !/^[•\-\*—\s]+$/.test(b));
                const isSelected = selectedCardIdx === idx;

                return (
                  <div
                    key={`${concept?.id ?? 'concept'}-card-${idx}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSelected}
                    onClick={() => setSelectedCardIdx(isSelected ? null : idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedCardIdx(isSelected ? null : idx);
                      }
                    }}
                    className={`${style.bg} border-2 ${
                      isSelected
                        ? 'border-sky-500 ring-2 ring-sky-300/40 shadow-lg'
                        : `${style.border} hover:border-sky-400 shadow-sm hover:shadow-md`
                    } rounded-2xl p-4 flex flex-col justify-between space-y-3 cursor-pointer transition-all min-w-0`}
                  >
                    <div className="space-y-2 min-w-0">
                      {/* Card Header: Badge + Title + Collapse Button */}
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200 min-w-0">
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span
                            className={`w-5 h-5 rounded-md ${style.badge} border font-kalam text-xs font-bold flex items-center justify-center shrink-0`}
                          >
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <h4
                            className={`font-kalam text-sm sm:text-base font-bold ${style.title} tracking-wide break-words whitespace-normal leading-snug`}
                          >
                            {card?.title ?? `Key Principle ${idx + 1}`}
                          </h4>
                        </div>
                        {isSelected && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCardIdx(null);
                            }}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 shrink-0 transition"
                            aria-label="Collapse card details"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Bullets or Single-Line Summary Fallback */}
                      {validBullets.length > 0 ? (
                        <div className="space-y-2 font-sans text-xs sm:text-[13px] text-slate-700 leading-snug font-medium">
                          {validBullets.map((b, bIdx) => (
                            <div key={bIdx} className="min-w-0">
                              {b.startsWith('$$') && b.endsWith('$$') ? (
                                <div className="my-1 overflow-x-auto overflow-y-hidden scrollbar-thin text-xs sm:text-sm formula-container">
                                  <MathFormula formula={b} className="text-xs sm:text-sm" />
                                </div>
                              ) : (
                                <div className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
                                  <div className="flex-1 min-w-0 break-words">
                                    <MathText key={`${concept?.id ?? 'c'}-c-${idx}-b-${bIdx}`} text={b} />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic font-sans">
                          Key concept: Core relationship and procedural rules for {card?.title ?? 'this topic'}.
                        </div>
                      )}

                      {/* Revealed Full Details when Selected */}
                      {isSelected && (
                        <div className="mt-3 pt-3 border-t border-slate-200 space-y-2 animate-fadeIn">
                          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-sky-600 font-semibold">
                            <span>Detailed Breakdown</span>
                            <span className="text-[10px] text-slate-400 lowercase font-normal">Click card to collapse</span>
                          </div>
                          <div className="font-sans text-xs sm:text-[13px] text-slate-700 leading-relaxed max-h-60 overflow-y-auto pr-1 whitespace-pre-wrap">
                            {card?.fullContent ? (
                              <MathText text={card.fullContent} />
                            ) : (
                              validBullets.map((b, bIdx) => (
                                <div key={bIdx} className="mb-1">
                                  <MathText text={b} />
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 5. EXAM TRAPS WARNING PANEL (Always Shown)                                 */}
      {/* ========================================================================= */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5 shadow-sm relative print:border-rose-300 print:bg-rose-50 min-w-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-100 border border-rose-200 flex items-center justify-center shadow-inner">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            </div>
            <h3 className="font-kalam text-base sm:text-lg font-bold text-rose-800 tracking-wide print:text-rose-900">
              ⚠️ Exam Traps / Don&apos;t Forget! (Things to Remember)
            </h3>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-200">
            Top Mistakes
          </span>
        </div>

        {/* Continuous Single Flow Exam Traps List */}
        <div className="space-y-3">
          {(examTraps ?? [])
            .map((t) => t?.trim() ?? '')
            .filter((t) => t.length > 0 && !/^[•\-\*—\s]+$/.test(t))
            .map((trap, idx) => (
              <div
                key={`${concept?.id ?? 'concept'}-trap-${idx}`}
                className="p-3.5 rounded-2xl bg-white border border-rose-200 flex items-start gap-3 text-xs sm:text-[13px] text-rose-900 font-sans leading-relaxed shadow-sm print:bg-white print:text-rose-950 min-w-0"
              >
                <span className="text-emerald-600 font-extrabold text-sm shrink-0 mt-0.5">✔</span>
                <div className="flex-1 min-w-0 break-words whitespace-pre-line">
                  <MathText key={`${concept?.id ?? 'concept'}-trap-text-${idx}`} text={trap} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM FOOTER BADGE WITH QUICK MENTAL CHECK                            */}
      {/* ========================================================================= */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-sm print:border-slate-300 min-w-0">
        <div className="space-y-1 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 font-kalam flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-emerald-600" />
              {quickCheckLabel}
            </span>
          </div>
          <p className="text-xs text-slate-600 font-mono break-words">
            <MathText
              key={`${concept?.id ?? 'concept'}-cs-verify`}
              text={
                notes?.verificationProblem ||
                `Verify your solution for ${concept?.title ?? ''} by checking intermediate steps, units, and boundary conditions.`
              }
            />
          </p>
        </div>

        <div className="shrink-0 text-right space-y-0.5">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            100% Original Pedagogical Blueprint
          </span>
          <p className="text-[10px] text-slate-400 font-mono">
            Protected by OcaVerse Cognitive Architecture Guardrail
          </p>
        </div>
      </div>
    </OcaverseWatermarkContainer>
  );
};

export default HandwrittenCheatSheetView;
