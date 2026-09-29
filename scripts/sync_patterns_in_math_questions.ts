import fs from 'fs';
import path from 'path';

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
import { generate50QuestionsForChapterDirect } from './generate_chapter_questions';

// Load environment variables from .env.local
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

async function syncPatternsInMath() {
  console.log('================================================================================');
  console.log('  AUTOMATIC WRAPPER: LOCATING "Patterns in Mathematics" & SYNCING 50 QUESTIONS');
  console.log('================================================================================\n');

  const targetTitle = 'Patterns in Mathematics';
  let chapterId = '';
  let gradeLevel = 6;
  let subject = 'Mathematics';
  let board = 'CBSE';

  // 1. Query 'topics' table in Supabase
  try {
    const { data: topicsData, error: topicsErr } = await supabase
      .from('topics')
      .select('id, title, grade_level, subject_id, board_id')
      .ilike('title', `%${targetTitle}%`)
      .limit(1);

    if (!topicsErr && topicsData && topicsData.length > 0) {
      const match = topicsData[0];
      chapterId = match.id;
      gradeLevel = match.grade_level || 6;
      subject = match.subject_id || 'Mathematics';
      board = match.board_id || 'CBSE';
      console.log(`[FOUND in 'topics' table] Chapter ID: ${chapterId}, Grade: ${gradeLevel}, Subject: ${subject}`);
    }
  } catch (err) {
    console.warn('[Query topics notice]', err);
  }

  // 2. If not found in topics, query 'curriculum_concepts' table
  if (!chapterId) {
    try {
      const { data: conceptData, error: conceptErr } = await supabase
        .from('curriculum_concepts')
        .select('id, title, grade_level, subject_id, board_id')
        .ilike('title', `%${targetTitle}%`)
        .limit(1);

      if (!conceptErr && conceptData && conceptData.length > 0) {
        const match = conceptData[0];
        chapterId = match.id;
        gradeLevel = match.grade_level || 6;
        subject = match.subject_id || 'Mathematics';
        board = match.board_id || 'CBSE';
        console.log(`[FOUND in 'curriculum_concepts' table] Chapter ID: ${chapterId}, Grade: ${gradeLevel}, Subject: ${subject}`);
      }
    } catch (err) {
      console.warn('[Query curriculum_concepts notice]', err);
    }
  }

  // 3. If not in DB yet, use official NCERT 2026/2027 Ganita Prakash ID
  if (!chapterId) {
    chapterId = 'CBSE-G6-MATH-CH1-PATTERNS';
    gradeLevel = 6;
    subject = 'Mathematics';
    board = 'CBSE';
    console.log(`[DEFAULT TO NCERT OFFICIAL ID] Chapter ID: ${chapterId}, Grade: ${gradeLevel}, Subject: ${subject}`);
  }

  // 4. Execute 50-Question Generation via Gemini
  console.log(`\nInitiating Gemini Generation for Chapter ID: ${chapterId} ...`);
  const result = await generate50QuestionsForChapterDirect({
    chapterId,
    chapterTitle: targetTitle,
    subject,
    grade: gradeLevel,
    board,
  });

  console.log(`\n[COMPLETE] 50 authentic questions generated and synced for '${targetTitle}' (ID: ${chapterId}).`);
}

syncPatternsInMath().catch((err) => {
  console.error('[ERROR]', err);
  process.exit(1);
});
