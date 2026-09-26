import { createClient } from '@supabase/supabase-js';
import * as path from 'path';
import katex from 'katex';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

const baseDir = path.resolve(process.cwd(), 'frontend/src');
const { sanitizeKatexString } = require(path.join(baseDir, 'lib/services/contentService'));

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

function processMathTextTokens(text: string) {
  if (!text || typeof text !== 'string') return [];

  const mathRegex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;
  const rawParts: { type: 'text' | 'inline-math' | 'display-math'; content: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = mathRegex.exec(text)) !== null) {
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

  if (lastIndex < text.length) {
    rawParts.push({
      type: 'text',
      content: text.substring(lastIndex),
    });
  }

  let isBold = false;
  let isCode = false;
  const finalTokens: any[] = [];

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

    let segment = part.content.replace(/\\&/g, '&');
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
}

async function run() {
  console.log('Testing all 846 concepts in Supabase for MathText / MathFormula tokens & HTML generation...');
  const { data: allConcepts, error } = await supabase
    .from('curriculum_concepts')
    .select('id, board_id, grade_level, subject_id, title, unit, metadata')
    .order('id');

  if (error || !allConcepts) {
    console.error('Error fetching concepts:', error);
    return;
  }

  let zeroTokensCount = 0;
  let katexFailures = 0;
  const sampleFailures: any[] = [];

  for (const c of allConcepts) {
    const notes = c.metadata?.cornell_notes;
    if (!notes) continue;

    // Test MathFormula on structuralRule
    const formula = notes.structuralRule;
    let cleanFormula = '';
    try {
      cleanFormula = sanitizeKatexString(stripOuterDelimiters(formula)).replace(/(?<!\\)\$/g, '').trim();
      const rendered = katex.renderToString(cleanFormula, {
        displayMode: true,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
      if (!rendered || rendered.trim() === '') {
        sampleFailures.push({ id: c.id, type: 'EMPTY_FORMULA_HTML', formula });
      }
    } catch (e: any) {
      katexFailures++;
      sampleFailures.push({ id: c.id, type: 'FORMULA_EXCEPTION', error: e.message });
    }

    // Test MathText on mainNotes, coreAnalogy, curriculumTrap, summary, verificationProblem
    const fields = ['mainNotes', 'coreAnalogy', 'curriculumTrap', 'summary', 'verificationProblem'];
    for (const f of fields) {
      const text = notes[f];
      if (!text) {
        sampleFailures.push({ id: c.id, type: `EMPTY_FIELD_${f}` });
        continue;
      }
      const tokens = processMathTextTokens(text);
      if (tokens.length === 0) {
        zeroTokensCount++;
        sampleFailures.push({ id: c.id, type: `ZERO_TOKENS_${f}`, text });
      }

      // Check each token
      for (const tok of tokens) {
        if (tok.type === 'inline-math' || tok.type === 'display-math') {
          try {
            const cleanContent = sanitizeKatexString(stripOuterDelimiters(tok.content))
              .replace(/(?<!\\)\$/g, '')
              .trim();
            const rendered = katex.renderToString(cleanContent, {
              displayMode: tok.type === 'display-math',
              throwOnError: false,
              output: 'htmlAndMathml',
            });
            if (!rendered) {
              sampleFailures.push({ id: c.id, type: 'EMPTY_MATH_TOKEN_HTML', token: tok.content });
            }
          } catch (e: any) {
            katexFailures++;
            sampleFailures.push({ id: c.id, type: 'TOKEN_EXCEPTION', error: e.message });
          }
        }
      }
    }
  }

  console.log(`Finished checking 846 concepts:`);
  console.log(`Zero tokens count: ${zeroTokensCount}`);
  console.log(`KaTeX failures: ${katexFailures}`);
  console.log(`Total anomalies: ${sampleFailures.length}`);
  if (sampleFailures.length > 0) {
    console.log('Sample anomalies:', JSON.stringify(sampleFailures.slice(0, 10), null, 2));
  }
}

run().catch(console.error);
