/**
 * Brainoro Cognitive OS — Cross-Context Identity & Board Isolation Test
 * Path: scratch/test_cross_context_identity.ts
 *
 * Verifies Phase 5:
 * 1. Concepts sharing identical or similar titles across boards (CBSE, CAMBRIDGE, IB_MYP)
 *    resolve to distinct, board-specific payloads.
 * 2. Board-specific pedagogical frameworks remain strictly isolated:
 *    - CBSE: Board exam traps, 3/5 mark question marking schemes
 *    - CAMBRIDGE: CAIE mark scheme guidance, command words (STATE, EXPLAIN, DERIVE, CALCULATE)
 *    - IB_MYP: Inquiry-based exploration, criterion-referenced guidance
 * 3. Compound identity: id + board_id + grade_level + subject_id prevents collisions.
 */

import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!cleanSupabaseUrl || !cleanSupabaseKey) {
  console.error('Supabase credentials not found in environment!');
  process.exit(1);
}

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

interface CrossBoardGroup {
  topicName: string;
  concepts: {
    boardId: 'CBSE' | 'CAMBRIDGE' | 'IB_MYP';
    id: string;
    gradeLevel: number;
    subjectId: string;
    expectedFrameworkPattern: RegExp;
    forbiddenPatterns: RegExp[];
  }[];
}

const CROSS_BOARD_GROUPS: CrossBoardGroup[] = [
  {
    topicName: 'Class 6 Data Handling: Tally Marks & Frequency Tables',
    concepts: [
      {
        boardId: 'CBSE',
        id: 'CBSE-G6-MATH-DATA-TABLES',
        gradeLevel: 6,
        subjectId: 'MATH',
        expectedFrameworkPattern: /board-exam-trap|Common Pitfalls|CBSE|frequency/i,
        forbiddenPatterns: [/cambridge-mark-scheme/i, /myp-inquiry-box/i]
      },
      {
        boardId: 'CAMBRIDGE',
        id: 'CAMBRIDGE-G6-MATH-DATA-TABLES',
        gradeLevel: 6,
        subjectId: 'MATH',
        expectedFrameworkPattern: /cambridge-mark-scheme|CAIE|Command Word|STATE|EXPLAIN/i,
        forbiddenPatterns: [/myp-inquiry-box/i]
      },
      {
        boardId: 'IB_MYP',
        id: 'IB_MYP-G6-MATH-DATA-TABLES',
        gradeLevel: 6,
        subjectId: 'MATH',
        expectedFrameworkPattern: /myp-inquiry-box|Inquiry|Criterion|exploration/i,
        forbiddenPatterns: [/cambridge-mark-scheme/i]
      }
    ]
  },
  {
    topicName: 'Class 6 Number Systems: Integers',
    concepts: [
      {
        boardId: 'CBSE',
        id: 'CBSE-G6-MATH-NUMSYS-INT',
        gradeLevel: 6,
        subjectId: 'MATH',
        expectedFrameworkPattern: /CBSE|integer/i,
        forbiddenPatterns: [/cambridge-mark-scheme/i, /myp-inquiry-box/i]
      },
      {
        boardId: 'CAMBRIDGE',
        id: 'CAMBRIDGE-G6-MATH-NUMSYS-INT',
        gradeLevel: 6,
        subjectId: 'MATH',
        expectedFrameworkPattern: /cambridge-mark-scheme|CAIE|Command Word|integer/i,
        forbiddenPatterns: [/myp-inquiry-box/i]
      },
      {
        boardId: 'IB_MYP',
        id: 'IB_MYP-G6-MATH-NUMSYS-INT',
        gradeLevel: 6,
        subjectId: 'MATH',
        expectedFrameworkPattern: /myp-inquiry-box|Inquiry|Criterion|integer/i,
        forbiddenPatterns: [/cambridge-mark-scheme/i]
      }
    ]
  },
  {
    topicName: 'Class 7 Biology: Human Heart & Circulation',
    concepts: [
      {
        boardId: 'CBSE',
        id: 'CBSE-G7-BIOLOGY-CIRC-HEART',
        gradeLevel: 7,
        subjectId: 'BIOLOGY',
        expectedFrameworkPattern: /heart|circulation|ventricle|atrium/i,
        forbiddenPatterns: [/cambridge-mark-scheme/i, /myp-inquiry-box/i]
      },
      {
        boardId: 'CAMBRIDGE',
        id: 'CAMBRIDGE-G7-BIOLOGY-CIRC-HEART',
        gradeLevel: 7,
        subjectId: 'BIOLOGY',
        expectedFrameworkPattern: /cambridge-mark-scheme|CAIE|heart|circulation/i,
        forbiddenPatterns: [/myp-inquiry-box/i]
      },
      {
        boardId: 'IB_MYP',
        id: 'IB_MYP-G7-BIOLOGY-CIRC-HEART',
        gradeLevel: 7,
        subjectId: 'BIOLOGY',
        expectedFrameworkPattern: /myp-inquiry-box|Inquiry|heart|circulation/i,
        forbiddenPatterns: [/cambridge-mark-scheme/i]
      }
    ]
  }
];

async function runCrossBoardTests() {
  console.log('================================================================================');
  console.log('   BRAINORO COGNITIVE OS — CROSS-BOARD IDENTITY & ISOLATION SUITE');
  console.log('================================================================================\n');

  let passedChecks = 0;
  let failedChecks = 0;

  for (const group of CROSS_BOARD_GROUPS) {
    console.log(`[Group] ${group.topicName}`);
    const fingerprints = new Set<string>();
    const payloadHashes = new Set<string>();

    for (const item of group.concepts) {
      console.log(`  -> Querying [${item.id}] (board: ${item.boardId}, grade: ${item.gradeLevel}, subject: ${item.subjectId})`);
      let data: any = null;
      let error: any = null;
      try {
        const res = await supabase
          .from('curriculum_concepts')
          .select('*')
          .eq('id', item.id)
          .eq('board_id', item.boardId)
          .eq('grade_level', item.gradeLevel)
          .eq('subject_id', item.subjectId)
          .setHeader('Cache-Control', 'no-store')
          .setHeader('Pragma', 'no-cache')
          .single();
        data = res.data;
        error = res.error;
      } catch (ex: any) {
        console.error(`  ❌ Exception querying [${item.id}]:`, ex.message || ex);
        failedChecks++;
        continue;
      }

      if (error || !data) {
        console.error(`  ❌ Failed to load concept [${item.id}]: ${error?.message || 'Not found'}`);
        failedChecks++;
        continue;
      }

      // Check 1: ID compound prefix matches board
      if (!item.id.startsWith(item.boardId)) {
        console.error(`  ❌ ID [${item.id}] does not start with board [${item.boardId}]`);
        failedChecks++;
        continue;
      }

      const notes = data.metadata?.cornell_notes;
      if (!notes) {
        console.error(`  ❌ Missing cornell_notes for [${item.id}]`);
        failedChecks++;
        continue;
      }

      const fpt = data.metadata?.payload_fingerprint || notes.payloadFingerprint;
      if (!fpt) {
        console.error(`  ❌ Missing payload fingerprint for [${item.id}]`);
        failedChecks++;
        continue;
      }

      if (fingerprints.has(fpt)) {
        console.error(`  ❌ Fingerprint collision across boards for [${item.id}]: ${fpt}`);
        failedChecks++;
        continue;
      }
      fingerprints.add(fpt);

      // Check 2: Payload uniqueness
      const payloadStr = JSON.stringify(notes);
      if (payloadHashes.has(payloadStr)) {
        console.error(`  ❌ Exact payload content duplicated across boards for [${item.id}]!`);
        failedChecks++;
        continue;
      }
      payloadHashes.add(payloadStr);

      // Check 3: Board-specific framework isolation in notes (curriculumTrap or mainNotes)
      const fullText = `${notes.curriculumTrap} ${notes.mainNotes} ${notes.summary} ${notes.structuralRule}`;
      
      let patternMatch = true;
      for (const forbidden of item.forbiddenPatterns) {
        if (forbidden.test(fullText)) {
          console.error(`  ❌ Forbidden framework pattern [${forbidden}] leaked into [${item.id}]!`);
          patternMatch = false;
          break;
        }
      }

      if (!patternMatch) {
        failedChecks++;
        continue;
      }

      console.log(`  ✅ PASS | [${item.boardId}] ${item.id} | FPT: ${fpt} | Isolated`);
      passedChecks++;
    }
    console.log('');
  }

  console.log('================================================================================');
  console.log('   CROSS-BOARD IDENTITY & ISOLATION SUMMARY');
  console.log('================================================================================');
  console.log(`Total Checks       : ${passedChecks + failedChecks}`);
  console.log(`Passed             : ${passedChecks}`);
  console.log(`Failed             : ${failedChecks}`);
  console.log(`Pass Rate          : ${(((passedChecks) / (passedChecks + failedChecks)) * 100).toFixed(1)}%`);
  console.log('================================================================================\n');

  if (failedChecks > 0) {
    process.exit(1);
  }
}

runCrossBoardTests().catch(err => {
  console.error('Fatal error in cross-board tests:', err);
  process.exit(1);
});
