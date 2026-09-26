'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import { sanitizeKatexString, sanitizeLaTeX } from '../../lib/services/contentService';

export { sanitizeKatexString };

interface MathFormulaProps {
  formula: string;
  className?: string;
  displayMode?: boolean;
}

/**
 * Strips surrounding delimiters ($$, $, \[, \() from formula strings before KaTeX parsing
 */
function stripOuterDelimiters(str: string): string {
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
 * MathFormula: High-fidelity KaTeX display equation component.
 * Parses raw LaTeX formula strings into MathML & HTML so users never see unparsed backslashes.
 */
export const MathFormula: React.FC<MathFormulaProps> = ({
  formula,
  className = '',
  displayMode = true,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);


  const renderedHtml = useMemo(() => {
    if (!formula || typeof formula !== 'string') return '';
    let cleanFormula = '';
    try {
      cleanFormula = sanitizeKatexString(stripOuterDelimiters(formula));
      // Strip any rogue remaining inner $ delimiters
      cleanFormula = cleanFormula.replace(/(?<!\\)\$/g, '').trim();
    } catch (sanitizeErr) {
      console.warn('[KaTeX Sanitizer Guard] Error sanitizing formula:', formula, sanitizeErr);
      cleanFormula = formula.trim();
    }

    try {
      const rendered = katex.renderToString(cleanFormula, {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
      // If KaTeX rendered with an error span, remove error class
      return rendered.replace(/class="katex-error"/g, 'class="katex-fallback"');
    } catch (err) {
      console.warn('[KaTeX Formula Guard] Render exception on formula:', formula, err);
      const safeEscaped = cleanFormula.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<span class="katex-fallback font-mono text-xs text-amber-300/80 bg-amber-950/20 px-2 py-1 rounded border border-amber-900/40">${safeEscaped}</span>`;
    }
  }, [formula, displayMode]);

  if (!formula) return null;

  return (
    <div
      ref={containerRef}
      className={`katex-display-container formula-container overflow-x-auto py-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
};

interface MathTextProps {
  text: string;
  className?: string;
}

interface ProcessedToken {
  type: 'text' | 'inline-math' | 'display-math';
  content: string;
  bold: boolean;
  code: boolean;
  italic: boolean;
}

/**
 * MathText: Renders multi-line text blocks with embedded $inline$ and $$display$$ math,
 * and parses Markdown formatting (**bold**, *italic*, `code`, bullets) into clean HTML elements.
 */
export const MathText: React.FC<MathTextProps> = ({ text, className = '' }) => {
  const containerRef = React.useRef<HTMLSpanElement>(null);


  const tokens = useMemo(() => {
    if (!text || typeof text !== 'string') return [];

    // 1. Identify math blocks: $$...$$, $...$, \[...\], \(...\)
    const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;

    const rawParts: { type: 'text' | 'inline-math' | 'display-math'; content: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = mathRegex.exec(text)) !== null) {
      // Preceding plain text
      if (match.index > lastIndex) {
        rawParts.push({
          type: 'text',
          content: text.substring(lastIndex, match.index),
        });
      }

      const rawMatch = match[0];
      if (rawMatch.startsWith('$$') && rawMatch.endsWith('$$')) {
        rawParts.push({
          type: 'display-math',
          content: rawMatch.slice(2, -2).trim(),
        });
      } else if (rawMatch.startsWith('\\[') && rawMatch.endsWith('\\]')) {
        rawParts.push({
          type: 'display-math',
          content: rawMatch.slice(2, -2).trim(),
        });
      } else if (rawMatch.startsWith('$') && rawMatch.endsWith('$')) {
        rawParts.push({
          type: 'inline-math',
          content: rawMatch.slice(1, -1).trim(),
        });
      } else if (rawMatch.startsWith('\\(') && rawMatch.endsWith('\\)')) {
        rawParts.push({
          type: 'inline-math',
          content: rawMatch.slice(2, -2).trim(),
        });
      }

      lastIndex = match.index + rawMatch.length;
    }

    // Trailing plain text
    if (lastIndex < text.length) {
      rawParts.push({
        type: 'text',
        content: text.substring(lastIndex),
      });
    }

    // 2. Parse Markdown formatting while preserving formatting states across math boundaries
    let isBold = false;
    let isCode = false;
    const finalTokens: ProcessedToken[] = [];

    for (const part of rawParts) {
      if (part.type === 'display-math' || part.type === 'inline-math') {
        finalTokens.push({
          type: part.type,
          content: part.content,
          bold: isBold,
          code: isCode,
          italic: false,
        });
        continue;
      }

      // Plain text segment: replace literal \& with clean & for user display
      let segment = part.content.replace(/\\&/g, '&');

      // Tokenize by bold (**) and code (`)
      const mdRegex = /(\*\*|`)/g;
      let segLastIndex = 0;
      let mdMatch: RegExpExecArray | null;

      while ((mdMatch = mdRegex.exec(segment)) !== null) {
        if (mdMatch.index > segLastIndex) {
          const chunk = segment.substring(segLastIndex, mdMatch.index);
          finalTokens.push({
            type: 'text',
            content: chunk,
            bold: isBold,
            code: isCode,
            italic: false,
          });
        }

        const delimiter = mdMatch[0];
        if (delimiter === '**') {
          isBold = !isBold;
        } else if (delimiter === '`') {
          isCode = !isCode;
        }

        segLastIndex = mdMatch.index + delimiter.length;
      }

      if (segLastIndex < segment.length) {
        finalTokens.push({
          type: 'text',
          content: segment.substring(segLastIndex),
          bold: isBold,
          code: isCode,
          italic: false,
        });
      }
    }

    return finalTokens;
  }, [text]);

  if (!text) return null;

  return (
    <span ref={containerRef} className={`math-text-block ${className}`}>
      {tokens.map((token, idx) => {
        if (token.type === 'text') {
          // Render plain text with bold/code styling
          let contentNode: React.ReactNode = token.content;

          if (token.code) {
            contentNode = (
              <code className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-300 font-mono text-[11px]">
                {contentNode}
              </code>
            );
          } else if (token.bold) {
            contentNode = (
              <strong className="font-bold text-slate-100">
                {contentNode}
              </strong>
            );
          }

          return <span key={idx}>{contentNode}</span>;
        }

        // Math tokens
        const isDisplay = token.type === 'display-math';
        let cleanContent = '';
        try {
          cleanContent = sanitizeKatexString(stripOuterDelimiters(token.content))
            .replace(/(?<!\\)\$/g, '')
            .trim();
        } catch (sanitizeErr) {
          console.warn('[KaTeX Sanitizer Guard] Error sanitizing token:', token.content, sanitizeErr);
          cleanContent = token.content;
        }

        let html = '';
        try {
          const rendered = katex.renderToString(cleanContent, {
            displayMode: isDisplay,
            throwOnError: false,
            output: 'htmlAndMathml',
          });
          html = rendered.replace(/class="katex-error"/g, 'class="katex-fallback"');
        } catch (katexErr) {
          console.warn('[KaTeX Inline Guard] Render exception on inline math:', cleanContent, katexErr);
          const safeEscaped = cleanContent.replace(/</g, '&lt;').replace(/>/g, '&gt;');
          html = `<span class="katex-fallback font-mono text-xs text-amber-300/80 bg-amber-950/20 px-1 py-0.5 rounded border border-amber-900/40">${safeEscaped}</span>`;
        }

        const mathElement = (
          <span
            className={isDisplay ? 'block my-2 overflow-x-auto text-center' : 'inline-block mx-0.5 align-baseline'}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );

        return (
          <span key={idx} className={token.bold ? 'font-bold' : ''}>
            {token.bold ? <strong className="font-bold text-slate-100">{mathElement}</strong> : mathElement}
          </span>
        );
      })}
    </span>
  );
};

export default MathFormula;
