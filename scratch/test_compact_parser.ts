import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

interface ConceptCard {
  title: string;
  bullets: string[];
}

function parseConceptCards(mainNotes: string): ConceptCard[] {
  if (!mainNotes) return [];

  // Remove top title and Core Principle
  let cleaned = mainNotes
    .replace(/^###\s+[^\n]+\n+/, '')
    .replace(/\*\*Core Principle\*\*:[^\n]+\n+/, '')
    .trim();

  // Split by numbered headings like **1. Title**: or 1. **Title**: or ### Title
  const sectionRegex = /(?:^|\n)(?:\*\*(\d+[\.\)]\s*[^\*\n:]+)\*\*:?|(\d+[\.\)]\s*\*\*[^\*\n:]+\*\*):?|###\s*([^\n]+))/g;
  
  const matches: { index: number; title: string; length: number }[] = [];
  let m: RegExpExecArray | null;

  while ((m = sectionRegex.exec(cleaned)) !== null) {
    const rawTitle = m[1] || m[2] || m[3] || '';
    const cleanTitle = rawTitle.replace(/\*\*/g, '').replace(/^\d+[\.\)]\s*/, '').trim();
    matches.push({
      index: m.index,
      title: cleanTitle,
      length: m[0].length
    });
  }

  const cards: ConceptCard[] = [];

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index + matches[i].length;
      const end = i + 1 < matches.length ? matches[i + 1].index : cleaned.length;
      const content = cleaned.substring(start, end).trim();

      // Extract up to 2 bullet points
      const rawLines = content
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0 && !l.startsWith('###'));

      const bullets: string[] = [];
      let currentBullet = '';

      for (const line of rawLines) {
        if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
          if (currentBullet) {
            bullets.push(currentBullet);
            currentBullet = '';
          }
          currentBullet = line.replace(/^[•\-\*]\s*/, '').trim();
        } else if (line.startsWith('$$')) {
          if (currentBullet) {
            bullets.push(currentBullet);
            currentBullet = '';
          }
          bullets.push(line);
        } else {
          if (currentBullet) {
            currentBullet += ' ' + line;
          } else {
            currentBullet = line;
          }
        }
        if (bullets.length >= 2) break;
      }
      if (currentBullet && bullets.length < 2) {
        bullets.push(currentBullet);
      }

      cards.push({
        title: matches[i].title,
        bullets: bullets.slice(0, 2)
      });
    }
  } else {
    // Fallback: split by double newlines into 2-3 cards
    const paragraphs = cleaned.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    paragraphs.slice(0, 4).forEach((p, idx) => {
      cards.push({
        title: `Core Takeaway ${idx + 1}`,
        bullets: [p.trim().substring(0, 160)]
      });
    });
  }

  return cards;
}

function parseExamTraps(curriculumTrap: string): string[] {
  if (!curriculumTrap) return [];

  // Cut off everything from "2. Explanation Depth Requirements" onwards
  const pitfallSection = curriculumTrap
    .split(/2\.\s+Explanation Depth Requirements/i)[0]
    .replace(/^Key exam trap for [^\:]+:\s*/i, '')
    .replace(/^CBSE Board Exam Traps[^\:]*:\s*/i, '')
    .replace(/1\.\s+Common Pitfalls & Mark-Loss Patterns:\s*/i, '')
    .trim();

  // Find numbered items: 1. ..., 2. ..., 3. ...
  const lines = pitfallSection.split('\n').map(l => l.trim()).filter(Boolean);
  const items: string[] = [];

  for (const line of lines) {
    const match = line.match(/^(\d+[\.\)]\s+)(.+)/);
    if (match) {
      let text = match[2].trim();
      // Keep it compact: take up to the first 2 sentences or 140 chars
      const sentences = text.split(/(?<=[.?!])\s+/);
      let shortText = sentences[0];
      if (sentences.length > 1 && shortText.length < 60) {
        shortText += ' ' + sentences[1];
      }
      items.push(shortText);
    } else if (items.length > 0 && line.startsWith('•')) {
      // sub-bullet
      if (items.length < 4) {
        items.push(line.replace(/^•\s*/, ''));
      }
    }
    if (items.length >= 4) break;
  }

  return items.length > 0 ? items : [
    'Always verify units and coordinate reference frames',
    'Show intermediate formula substitutions clearly to avoid losing method marks',
    'Double-check negative sign conventions and algebraic expansions'
  ];
}

async function test() {
  const { data } = await supabase
    .from('curriculum_concepts')
    .select('id, title, metadata')
    .in('id', ['CBSE-G6-MATH-NUMSYS-INT', 'CBSE-G9-MATH-LINEQ', 'CBSE-G10-PHYSICS-OPT-LENS']);

  for (const c of data || []) {
    console.log('================================================================');
    console.log('ID:', c.id);
    console.log('--- PARSED CARDS ---');
    const cards = parseConceptCards(c.metadata?.cornell_notes?.mainNotes);
    console.log(JSON.stringify(cards, null, 2));
    console.log('--- PARSED TRAPS ---');
    const traps = parseExamTraps(c.metadata?.cornell_notes?.curriculumTrap);
    console.log(JSON.stringify(traps, null, 2));
  }
}

test().catch(console.error);
