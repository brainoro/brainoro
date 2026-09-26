/**
 * Universal LaTeX and KaTeX String Sanitizer Utility
 * 
 * Provides robust sanitization for pure LaTeX strings (KaTeX formulas) and
 * mixed Markdown/LaTeX content across all boards and curricula.
 */

/**
 * Strips surrounding delimiters ($$, $, \[, \() from formula strings
 */
export function stripOuterDelimiters(str: string): string {
  if (!str) return '';
  let trimmed = str.trim();
  while (
    (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length >= 4) ||
    (trimmed.startsWith('\\[') && trimmed.endsWith('\\]') && trimmed.length >= 4) ||
    (trimmed.startsWith('\\(') && trimmed.endsWith('\\)') && trimmed.length >= 4) ||
    (trimmed.startsWith('$') && trimmed.endsWith('$') && trimmed.length >= 2)
  ) {
    if (trimmed.startsWith('$$') || trimmed.startsWith('\\[') || trimmed.startsWith('\\(')) {
      trimmed = trimmed.slice(2, -2).trim();
    } else {
      trimmed = trimmed.slice(1, -1).trim();
    }
  }
  return trimmed;
}

/**
 * Sanitizes a pure LaTeX formula string before KaTeX rendering.
 * Automatically repairs unescaped single backslashes, corrupted JS control characters,
 * restores stripped LaTeX commands (\mathbb{N}, \subset, \dots, \in, \neq),
 * repairs broken subset notations (e.g. \mathbb{N} C \mathbb{W} -> \subset),
 * converts standalone 'eq 0' to '\neq 0', formats clean set notation,
 * and strips outer/rogue dollar delimiters.
 */
export function sanitizeLatexString(str: string): string {
  if (!str) return '';
  let res = str.trim();

  // Strip all unescaped $ and $$ math delimiters so formula is pure LaTeX for KaTeX
  res = res.replace(/(?<!\\)\$/g, '').trim();

  // 1. Double-escaped backslash commands: \backslash frac -> \frac, \backslash vec -> \vec
  res = res.replace(/\\backslash\s*([a-zA-Z]+)/g, '\\$1');

  // 2. Corrupted Box vector symbols: \Box ec -> \vec, \Box ec{ -> \vec{, □ec -> \vec
  res = res.replace(/\\Box\s*ec\b/g, '\\vec');
  res = res.replace(/\\Box\s*ec\{/g, '\\vec{');
  res = res.replace(/[□■]\s*ec\b/g, '\\vec');
  res = res.replace(/[□■]\s*ec\{/g, '\\vec{');
  res = res.replace(/\\Box\b/g, '\\vec');

  // 3. Fix backspace-corrupted \begin and \end (\x08 is JS \b escape)
  res = res.replace(/[\b\x08]egin\b/g, '\\begin');
  res = res.replace(/[\b\x08]end\b/g, '\\end');
  res = res.replace(/\x08/g, '');

  // 4. Fix vertical tab-corrupted \vec commands (\x0b is JS \v escape)
  res = res.replace(/[\v\x0b]ec\b/g, '\\vec');
  res = res.replace(/[\v\x0b]ec\{/g, '\\vec{');
  res = res.replace(/\x0b/g, '');
  res = res.replace(/(^|[^\\a-zA-Z])ec\{([a-zA-Z_0-9]+)\}/g, '$1\\vec{$2}');
  res = res.replace(/(^|[\s=+\-*\/])ec\{/g, '$1\\vec{');

  // 5. Corrupted Form Feed / Tab / Carriage Return controls & artifact strings
  res = res.replace(/Arac\b/g, '\\frac');
  res = res.replace(/\\x0crac\b/g, '\\frac');
  res = res.replace(/[\x0c]rac\b/g, '\\frac');
  res = res.replace(/\\x0c/g, '\\f');
  res = res.replace(/\x0c/g, '\\f');

  // Fix ho and \x0dho -> \rho
  res = res.replace(/\bho\s*\\frac/g, '\\rho \\frac');
  res = res.replace(/R\s*=\s*ho\b/g, 'R = \\rho');
  res = res.replace(/\\x0dho\b/g, '\\rho');
  res = res.replace(/[\x0d]ho\b/g, '\\rho');
  res = res.replace(/\\x0d/g, '');
  res = res.replace(/\x0d/g, '');

  // Fix corrupted Ic / \uFFFD -> \Omega (Ohm symbol)
  res = res.replace(/\bIc\b/g, '\\Omega');
  res = res.replace(/\b(\d+)\s*Ic\b/g, '$1 \\Omega');
  res = res.replace(/[\uFFFD]/g, '');

  // Fix tab-escaped LaTeX commands
  res = res.replace(/\t\s*ext\{/g, '\\text{');
  res = res.replace(/	ext\{/g, '\\text{');
  res = res.replace(/	ext\b/g, '\\text');
  res = res.replace(/\t\s*quad/g, '\\quad');
  res = res.replace(/	quad/g, '\\quad');
  res = res.replace(/\t\s*to\b/g, '\\to');
  res = res.replace(/	o\b/g, '\\to');
  res = res.replace(/\t\s*imes\b/g, '\\times');
  res = res.replace(/	imes\b/g, '\\times');
  res = res.replace(/\t\s*au\b/g, '\\tau');
  res = res.replace(/	au\b/g, '\\tau');
  res = res.replace(/\t\s*an\b/g, '\\tan');
  res = res.replace(/	an\b/g, '\\tan');
  res = res.replace(/\t\s*heta\b/g, '\\theta');
  res = res.replace(/	heta\b/g, '\\theta');

  // Fix \n (newline) eating \neq -> \neq
  res = res.replace(/[\r\n]+\s*eq\b(?=\s*[-+0-9a-zA-Z\$\\])/g, ' \\neq ');

  // 6. Restore unescaped single backslash LaTeX commands:
  // Mathbb sets: \mathbb{N}, \mathbb{W}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}, \mathbb{C}
  res = res.replace(/(?<!\\)\b(mathbb|mathbf|mathrm|mathcal|mathsf)\{([a-zA-Z0-9]+)\}/g, '\\$1{$2}');
  res = res.replace(/(?<!\\)\bmathbb([NWZQRCP])\b/g, '\\mathbb{$1}');

  // Convert standalone uppercase 'C' between sets into proper \subset
  // e.g. \mathbb{N} C \mathbb{W} -> \mathbb{N} \subset \mathbb{W}
  res = res.replace(/(\\mathbb\{[A-Z]\}|[A-Z])\s+C\s+(\\mathbb\{[A-Z]\}|[A-Z])/g, '$1 \\subset $2');
  res = res.replace(/(?<=\\mathbb\{[A-Z]\})\s+C\s+(?=\\mathbb\{[A-Z]\})/g, ' \\subset ');

  // Subsets & set relations: \subset, \subseteq, \supset, \supseteq
  res = res.replace(/(?<!\\)\b(subset|subseteq|supset|supseteq)\b/g, '\\$1');

  // Dots: \dots, \cdots, \ldots, \ddots, \vdots
  res = res.replace(/(?<!\\)\b(dots|cdots|ldots|ddots|vdots)\b/g, '\\$1');

  // Inequality & comparison: \neq, \le, \ge, \approx, \equiv, \sim, \propto
  res = res.replace(/(?<!\\)\bneq\b/g, '\\neq');
  res = res.replace(/(?<![\\a-zA-Z])\ble\b(?=\s*[-+0-9a-zA-Z\$\\])/g, '\\le');
  res = res.replace(/(?<![\\a-zA-Z])\bge\b(?=\s*[-+0-9a-zA-Z\$\\])/g, '\\ge');
  res = res.replace(/(?<!\\)\b(approx|equiv|propto)\b/g, '\\$1');

  // Quantifiers & sets: \notin, \forall, \exists, \emptyset, \infty
  res = res.replace(/(?<!\\)\bnotin\b/g, '\\notin');
  res = res.replace(/(?<!\\)\b(forall|exists|emptyset|infty)\b/g, '\\$1');
  res = res.replace(/(?<=\s)(cup|cap)(?=\s)/g, '\\$1');

  // In set membership: \in (repair "a in \mathbb{Z}" and "ainmathbbZ")
  res = res.replace(/([a-zA-Z0-9])in\\?mathbb\{?([a-zA-Z])\}?/g, '$1 \\in \\mathbb{$2}');
  res = res.replace(/(?<=[\s,0-9a-zA-Z\$\(\)\]\}])\s+in\s+([\\\$A-Za-z\{])/g, ' \\in $1');
  res = res.replace(/(?<!\\)\bin\b(?=\s*\\mathbb)/g, '\\in');

  // Set notation formatting helpers: \gcd, \mid
  res = res.replace(/(?<!\\)\bgcd\b/g, '\\gcd');
  res = res.replace(/(?<=\s)mid(?=\s)/g, '\\mid');

  // Repair standalone "eq 0" or "neq 0" without backslash
  res = res.replace(/(?<=[a-zA-Z0-9\s,;])\b(?:neq|eq)\s*(?=[0-9a-zA-Z\+\-\$\\])/g, ' \\neq ');
  res = res.replace(/q\s*(?:\\neq|neq|eq|!=)\s*0/g, 'q \\neq 0');

  // Auto-repair broken Rational Numbers set notation:
  // e.g. ${p/q mid p, q in mathbb{Z},; q eq 0,; gcd(p, q) = 1}$ or {p/q \mid ...}
  res = res.replace(
    /\\?\{?\s*p\/q\s*(?:\\mid|mid|\|)\s*p,\s*q\s*(?:\\in|in)\s*(?:\\mathbb\{Z\}|mathbb\{Z\}|mathbbZ|\u2124|Z)[^}\$]*?(?:\\neq|neq|eq|!=)\s*0[^}\$]*?(?:\\gcd|gcd)\s*\(\s*p,\s*q\s*\)\s*=\s*1\s*\\?\}?/g,
    '\\{ \\frac{p}{q} \\mid p, q \\in \\mathbb{Z}, q \\neq 0, \\gcd(p, q) = 1 \\}'
  );

  // Literal set braces: {1, 2, 3, \dots} -> \{1, 2, 3, \dots\}
  res = res.replace(/^\{\s*([0-9a-zA-Z\\].*?[^\\])\s*\}$/, '\\{$1\\}');

  // Rational set notation: p/q \mid ... -> \frac{p}{q} \mid ...
  res = res.replace(/p\/q\s*\\mid/g, '\\frac{p}{q} \\mid');
  res = res.replace(/p\/q\s*\|/g, '\\frac{p}{q} \\mid');

  // Operators: \times, \div, \pm, \mp, \cdot
  res = res.replace(/(?<!\\)\b(times|div|pm|mp|cdot)\b/g, '\\$1');

  // Calculus & Sums: \sum, \prod, \lim, \int, \partial, \nabla
  res = res.replace(/(?<!\\)\b(sum|prod|lim|int|partial|nabla)\b/g, '\\$1');

  // Functions: \log, \ln, \sin, \cos, \tan, \sec, \csc, \cot
  res = res.replace(/(?<!\\)\b(log|ln|sin|cos|tan|sec|csc|cot)\b/g, '\\$1');

  // Arrows: \to, \rightarrow, \leftarrow, \Rightarrow, \Leftarrow, \iff, \implies, \Longleftrightarrow
  res = res.replace(/(?<!\\)\b(rightarrow|leftarrow|Rightarrow|Leftarrow|iff|implies|Longleftrightarrow)\b/g, '\\$1');

  // Greek letters: \alpha, \beta, \gamma, \delta, \Delta, \theta, \lambda, \mu, \nu, \pi, \rho, \sigma, \tau, \phi, \omega, \Omega
  res = res.replace(/(?<!\\)\b(alpha|beta|gamma|delta|Delta|theta|lambda|mu|nu|pi|rho|sigma|tau|phi|omega|Omega)\b/g, '\\$1');

  // Unescaped quad -> \quad
  res = res.replace(/(?<=\s)quad(?=\s)/g, '\\quad');

  // Fix unescaped % (prevent comment swallowing in math formulas)
  res = res.replace(/(^|[^\\])%/g, '$1\\%');

  // Fix unescaped & outside matrix/cases environments
  if (!/\\begin\{(?:cases|matrix|pmatrix|bmatrix|vmatrix|aligned|array|split|gather)\}/.test(res)) {
    res = res.replace(/(^|[^\\])&/g, '$1\\&');
  }

  // Repair cases environment formatting
  res = res.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (match, inner) => {
    let fixed = inner
      .replace(/(?<=[^\\])\bge\b/g, '\\ge')
      .replace(/(?<=[^\\])\ble\b/g, '\\le');
    return `\\begin{cases}${fixed}\\end{cases}`;
  });

  // Collapse accidental multiple backslashes before standard LaTeX commands
  res = res.replace(/\\{2,}(Delta|nabla|ge|le|sum|prod|vec|frac|text|begin|end|quad|qquad|Longleftrightarrow|iff|mu|pi|nu|lambda|cdot|times|rho|alpha|beta|gamma|delta|sigma|tau|phi|omega|Omega|theta|cos|sin|tan|log|ln|sqrt|mathbb|subset|dots|in|neq|notin|forall|exists|cup|cap|gcd|mid)\b/g, '\\$1');

  // Sanitize Optics & Snell's Law formulas with nested labels
  if (res.includes("Snell's Law:") || (res.includes('sin(i)') && res.includes('sin(r)'))) {
    res = res
      .replace(/Snell's Law:\s*/, '')
      .replace(/\|\s*Mirror:\s*/, '\\quad | \\quad ')
      .replace(/\|\s*Lens:\s*/, '\\quad | \\quad ');
  }

  // Standardize Ohm's Law and Resistivity formulas
  res = res.replace(/V\s*=\s*I\s*\.\s*R/g, 'V = I \\times R');
  res = res.replace(/V\s*=\s*I\s*\*\s*R/g, 'V = I \\times R');
  res = res.replace(/V\s*=\s*I\s*R\b/g, 'V = I \\times R');
  res = res.replace(/R\s*=\s*\\rho\s*L\s*\/\s*A/g, 'R = \\rho \\frac{L}{A}');
  res = res.replace(/R\s*=\s*\\rho\s*\\frac\s*\{\s*l\s*\}\s*\{\s*a\s*\}/gi, 'R = \\rho \\frac{L}{A}');

  // Final cleanup: strip any remaining unescaped $ signs from pure math string
  res = res.replace(/(?<!\\)\$/g, '').trim();

  return res;
}

/**
 * Universal LaTeX Sanitizer Engine alias
 */
export const sanitizeLaTeX = sanitizeLatexString;
export const sanitizeKatexString = sanitizeLatexString;

/**
 * Sanitizes mixed Markdown and LaTeX text (e.g. mainNotes, curriculumTrap, summary, analogies).
 * - Outside math blocks: replaces literal \& with & for clean prose display, strips control bytes.
 * - Inside math blocks ($...$, $$...$$, \[...\], \(...\)): runs sanitizeLatexString to guarantee valid KaTeX.
 */
export function preprocessNotesText(str: string): string {
  if (!str) return '';

  // 1. First strip corrupted control characters
  let text = str
    .replace(/[\x08\x0b\x0c\x0d\uFFFD]/g, '')
    .replace(/\\x08/g, '')
    .replace(/\\x0b/g, '')
    .replace(/\\x0c/g, '')
    .replace(/\\x0d/g, '');

  // Pre-pass: Auto-repair broken Rational Numbers set notation in mixed text:
  // e.g. ${p/q mid p, q in mathbb{Z},; q eq 0,; gcd(p, q) = 1}$
  text = text.replace(
    /\$?\\?\{?\s*p\/q\s*(?:\\mid|mid|\|)\s*p,\s*q\s*(?:\\in|in)\s*(?:\\mathbb\{Z\}|mathbb\{Z\}|mathbbZ|\u2124|Z)[^}\$]*?(?:\\neq|neq|eq|!=)\s*0[^}\$]*?(?:\\gcd|gcd)\s*\(\s*p,\s*q\s*\)\s*=\s*1\s*\\?\}?\$?\.?/g,
    '$\\left\\{ \\frac{p}{q} \\mid p, q \\in \\mathbb{Z}, q \\neq 0, \\gcd(p, q) = 1 \\right\\}$.'
  );

  // Pre-pass: Auto-repair unclosed set braces like ${1, 2, 3, \dots} without closing $
  text = text.replace(/\$\{([0-9\-\+,\s\\\.dots]+)\}(?!\$)/g, '$\\{$1\\}$');

  // 2. Identify math blocks: $$...$$, $...$, \[...\], \(...\)
  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let result = '';

  while ((match = mathRegex.exec(text)) !== null) {
    // Non-math text before match: replace literal \& with & for clean user display
    if (match.index > lastIndex) {
      const plainSegment = text.substring(lastIndex, match.index);
      result += plainSegment.replace(/\\&/g, '&');
    }

    const rawMath = match[0];
    if (rawMath.startsWith('$$') && rawMath.endsWith('$$')) {
      const inner = rawMath.slice(2, -2).trim();
      result += `$$${sanitizeLatexString(inner)}$$`;
    } else if (rawMath.startsWith('\\[') && rawMath.endsWith('\\]')) {
      const inner = rawMath.slice(2, -2).trim();
      result += `\\[${sanitizeLatexString(inner)}\\]`;
    } else if (rawMath.startsWith('$') && rawMath.endsWith('$')) {
      const inner = rawMath.slice(1, -1).trim();
      result += `$${sanitizeLatexString(inner)}$`;
    } else if (rawMath.startsWith('\\(') && rawMath.endsWith('\\)')) {
      const inner = rawMath.slice(2, -2).trim();
      result += `\\(${sanitizeLatexString(inner)}\\)`;
    }

    lastIndex = match.index + rawMath.length;
  }

  // Trailing non-math text
  if (lastIndex < text.length) {
    const trailing = text.substring(lastIndex);
    result += trailing.replace(/\\&/g, '&');
  }

  return result;
}

export const sanitizeNotesText = preprocessNotesText;
