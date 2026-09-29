import fs from 'fs';
import path from 'path';
import { generate50QuestionsForChapterDirect } from './generate_chapter_questions';

// Robust Supabase Client Loader
let createClient: any;
try {
  createClient = require('@supabase/supabase-js').createClient;
} catch {
  try {
    const fbPath = path.resolve(process.cwd(), 'frontend/node_modules/@supabase/supabase-js');
    createClient = require(fbPath).createClient;
  } catch {
    const parentPath = path.resolve(__dirname, '../frontend/node_modules/@supabase/supabase-js');
    createClient = require(parentPath).createClient;
  }
}

// Load environment variables
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...vals] = trimmed.split('=');
        if (key && vals.length > 0) {
          process.env[key.trim()] = vals.join('=').trim();
        }
      }
    });
  }
}

loadEnv();

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(
  cleanSupabaseUrl || 'https://placeholder.supabase.co',
  cleanSupabaseKey || 'placeholder-anon-key'
);

interface ChapterMeta {
  id: string;
  title: string;
  grade_level: number;
  subject_id: string;
  board_id: string;
}

// Sample authoritative curriculum seeds for CBSE, Cambridge, and IB MYP
const DEFAULT_CURRICULUM_CHAPTERS: ChapterMeta[] = [
  // Class 6 - 8
  { id: 'CBSE-G6-MATH-CH1-PATTERNS', title: 'Patterns in Mathematics', grade_level: 6, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G6-MATH-CH2-LINES', title: 'Lines and Angles', grade_level: 6, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G6-SCI-CH1-COMP', title: 'Components of Food', grade_level: 6, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G7-MATH-CH1-INTEGERS', title: 'Integers', grade_level: 7, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G7-SCI-CH1-NUTRITION', title: 'Nutrition in Plants', grade_level: 7, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G8-MATH-CH1-RATIONAL', title: 'Rational Numbers', grade_level: 8, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G8-SCI-CH1-CROP', title: 'Crop Production and Management', grade_level: 8, subject_id: 'Science', board_id: 'CBSE' },

  // Class 9
  { id: 'CBSE-G9-MATH-CH1-NUMSYS', title: 'Number Systems', grade_level: 9, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G9-MATH-CH2-POLY', title: 'Polynomials', grade_level: 9, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G9-MATH-CH3-COORD', title: 'Coordinate Geometry', grade_level: 9, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G9-MATH-CH4-LINEQ', title: 'Linear Equations in Two Variables', grade_level: 9, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G9-MATH-CH6-LINES', title: 'Lines and Angles', grade_level: 9, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G9-MATH-CH7-TRI', title: 'Triangles', grade_level: 9, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G9-SCI-CH1-MATTER', title: 'Matter in Our Surroundings', grade_level: 9, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G9-SCI-CH5-CELL', title: 'The Fundamental Unit of Life', grade_level: 9, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G9-SCI-CH7-MOTION', title: 'Motion', grade_level: 9, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G9-SCI-CH8-FORCE', title: 'Force and Laws of Motion', grade_level: 9, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G9-SCI-CH9-GRAV', title: 'Gravitation', grade_level: 9, subject_id: 'Science', board_id: 'CBSE' },

  // Class 10
  { id: 'CBSE-G10-MATH-CH1-REAL', title: 'Real Numbers', grade_level: 10, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G10-MATH-CH2-POLY', title: 'Polynomials', grade_level: 10, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G10-MATH-CH3-PAIR', title: 'Pair of Linear Equations in Two Variables', grade_level: 10, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G10-MATH-CH4-QUAD', title: 'Quadratic Equations', grade_level: 10, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G10-MATH-CH5-AP', title: 'Arithmetic Progressions', grade_level: 10, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G10-MATH-CH6-TRI', title: 'Triangles', grade_level: 10, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G10-MATH-CH8-TRIG', title: 'Introduction to Trigonometry', grade_level: 10, subject_id: 'Mathematics', board_id: 'CBSE' },
  { id: 'CBSE-G10-SCI-CH1-CHEM', title: 'Chemical Reactions and Equations', grade_level: 10, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G10-SCI-CH2-ACIDS', title: 'Acids, Bases and Salts', grade_level: 10, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G10-SCI-CH5-LIFE', title: 'Life Processes', grade_level: 10, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G10-SCI-CH9-LIGHT', title: 'Light - Reflection and Refraction', grade_level: 10, subject_id: 'Science', board_id: 'CBSE' },
  { id: 'CBSE-G10-SCI-CH11-ELEC', title: 'Electricity', grade_level: 10, subject_id: 'Science', board_id: 'CBSE' },

  // Cambridge (IGCSE)
  { id: 'CAMB-G9-MATH-CH1-NUM', title: 'Number and Calculation', grade_level: 9, subject_id: 'Mathematics', board_id: 'CAMBRIDGE' },
  { id: 'CAMB-G9-MATH-CH2-ALG', title: 'Algebra and Sequences', grade_level: 9, subject_id: 'Mathematics', board_id: 'CAMBRIDGE' },
  { id: 'CAMB-G9-PHY-CH1-KIN', title: 'Kinematics and Motion', grade_level: 9, subject_id: 'Physics', board_id: 'CAMBRIDGE' },
  { id: 'CAMB-G9-CHEM-CH1-STATES', title: 'States of Matter and Kinetic Theory', grade_level: 9, subject_id: 'Chemistry', board_id: 'CAMBRIDGE' },
  { id: 'CAMB-G9-BIO-CH1-CELLS', title: 'Cell Structure and Organisation', grade_level: 9, subject_id: 'Biology', board_id: 'CAMBRIDGE' },

  // IB MYP
  { id: 'IB-MYP4-MATH-CH1-NUM', title: 'Number Systems and Quantities', grade_level: 9, subject_id: 'Mathematics', board_id: 'IB_MYP' },
  { id: 'IB-MYP4-SCI-CH1-SCIENTIFIC', title: 'Scientific Inquiry and Transformations', grade_level: 9, subject_id: 'Science', board_id: 'IB_MYP' },
];

async function discoverAllChapters(): Promise<ChapterMeta[]> {
  const map = new Map<string, ChapterMeta>();

  // 1. Fetch from Supabase 'topics' table
  try {
    const { data: topics } = await supabase
      .from('topics')
      .select('id, title, grade_level, subject_id, board_id');

    if (topics && topics.length > 0) {
      topics.forEach((t: any) => {
        if (t.id && t.title) {
          map.set(t.id, {
            id: t.id,
            title: t.title.trim(),
            grade_level: Number(t.grade_level) || 9,
            subject_id: t.subject_id || 'Mathematics',
            board_id: t.board_id || 'CBSE',
          });
        }
      });
      console.log(`[Discovery] Fetched ${topics.length} chapters from Supabase 'topics' table.`);
    }
  } catch (err: any) {
    console.log(`[Discovery] Topics query notice: ${err.message || err}`);
  }

  // 2. Fetch from Supabase 'curriculum_concepts' table
  try {
    const { data: concepts } = await supabase
      .from('curriculum_concepts')
      .select('id, title, grade_level, subject_id, board_id');

    if (concepts && concepts.length > 0) {
      concepts.forEach((c: any) => {
        if (c.id && c.title && !map.has(c.id)) {
          map.set(c.id, {
            id: c.id,
            title: c.title.trim(),
            grade_level: Number(c.grade_level) || 9,
            subject_id: c.subject_id || 'Mathematics',
            board_id: c.board_id || 'CBSE',
          });
        }
      });
      console.log(`[Discovery] Fetched additional chapters from Supabase 'curriculum_concepts' table.`);
    }
  } catch (err: any) {
    console.log(`[Discovery] Curriculum concepts query notice: ${err.message || err}`);
  }

  // 3. Merge with default authoritative registry
  DEFAULT_CURRICULUM_CHAPTERS.forEach((ch) => {
    if (!map.has(ch.id)) {
      map.set(ch.id, ch);
    }
  });

  return Array.from(map.values());
}

async function isChapterAlreadyCompleted(chapter: ChapterMeta): Promise<boolean> {
  // Check if it is the already generated Patterns in Mathematics
  if (
    chapter.title.toLowerCase().includes('patterns in mathematics') ||
    chapter.id === 'CBSE-G6-MATH-CH1-PATTERNS'
  ) {
    return true;
  }

  // Check if local cache file already exists
  const scratchDir = path.resolve(process.cwd(), 'scratch');
  const cacheFile = path.join(scratchDir, `questions_${chapter.id.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}.json`);
  if (fs.existsSync(cacheFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
      if (Array.isArray(data) && data.length >= 50) {
        return true;
      }
    } catch {
      // Continue to DB check
    }
  }

  // Check Supabase 'questions' table
  try {
    const { data: rows } = await supabase
      .from('questions')
      .select('id')
      .eq('chapter_id', chapter.id)
      .limit(50);

    if (rows && rows.length >= 50) {
      return true;
    }
  } catch {
    // Return false to allow generation
  }

  return false;
}

async function runBatchGeneration() {
  console.log('================================================================================');
  console.log('  BRAINORO BULK AUTOMATED QUESTION BATCH GENERATOR');
  console.log('================================================================================\n');

  console.log('[Step 1] Discovering all available curriculum chapters...');
  const chapters = await discoverAllChapters();
  console.log(`[Discovery Complete] Total chapters queued for evaluation: ${chapters.length}\n`);

  let completedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  const startTime = Date.now();

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const progressPct = Math.round(((i + 1) / chapters.length) * 100);
    const prefix = `[Chapter ${i + 1}/${chapters.length} • ${progressPct}%]`;

    const alreadyDone = await isChapterAlreadyCompleted(chapter);
    if (alreadyDone) {
      console.log(`${prefix} SKIPPING: "${chapter.title}" (Questions already exist / previously synced).`);
      skippedCount++;
      continue;
    }

    console.log(`${prefix} GENERATING 50 Questions: "${chapter.title}" | Board: ${chapter.board_id} | Class ${chapter.grade_level} ${chapter.subject_id}...`);

    try {
      await generate50QuestionsForChapterDirect({
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        subject: chapter.subject_id,
        grade: chapter.grade_level,
        board: chapter.board_id,
      });
      completedCount++;
      console.log(` -> SUCCESS for "${chapter.title}"\n`);
    } catch (err: any) {
      console.error(` -> ERROR processing "${chapter.title}":`, err.message || err);
      errorCount++;
    }

    // Graceful micro-delay
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const durationSec = Math.round((Date.now() - startTime) / 1000);

  console.log('================================================================================');
  console.log('  BATCH GENERATION SUMMARY');
  console.log('================================================================================');
  console.log(`Total Chapters Evaluated: ${chapters.length}`);
  console.log(`Previously Completed / Skipped: ${skippedCount}`);
  console.log(`Newly Generated & Synced: ${completedCount}`);
  console.log(`Errors Encountered: ${errorCount}`);
  console.log(`Total Time Elapsed: ${durationSec} seconds`);
  console.log('================================================================================\n');

  process.exit(0);
}

runBatchGeneration().catch((err) => {
  console.error('Fatal batch generation error:', err);
  process.exit(1);
});
