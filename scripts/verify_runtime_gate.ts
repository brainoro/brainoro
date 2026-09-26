// =============================================================================
// Brainoro OS — Verification of Runtime Gate with Clean Process Exit
// =============================================================================

import {
  CBSE_CHAPTERS,
  CBSE_TEXTBOOKS,
  CBSE_GRADE_SUBJECTS,
} from '../frontend/src/lib/data/cbseCurriculumData';
import { resolveVerifiedCbseCurriculum } from '../frontend/src/lib/services/cbseRuntimeGate';

async function main() {
  console.log('=== VERIFY RUNTIME GATE WITH EXACT 12 CHAPTERS ===');

  const g6SciGs = CBSE_GRADE_SUBJECTS.find((gs) => gs.id === 'CBSE-G6-SCI');
  const g6SciTb = CBSE_TEXTBOOKS.find((tb) => tb.id === 'CBSE-TB-G6-SCI');
  const chapters = CBSE_CHAPTERS.filter((ch) => ch.textbook_id === 'CBSE-TB-G6-SCI');

  console.log(`Found ${chapters.length} chapters for ${g6SciTb?.title}`);

  const context = {
    grade: {
      id: 'CBSE-G6',
      grade_level: 6,
      display_name: 'Class 6',
      stage: 'MIDDLE_STAGE' as const,
      display_order: 1,
    },
    gradeSubject: g6SciGs,
    stream: {
      id: 'GENERAL',
      stream_code: 'GENERAL',
      display_name: 'General / Integrated',
      description: '',
    },
    textbook: g6SciTb,
    allChapters: chapters,
  };

  const result = resolveVerifiedCbseCurriculum(context as any);
  console.log('Gate Status:', result.gate_status);
  console.log('Diagnostics:', result.diagnostics);
  console.log('Textbooks Ready:', result.textbooks_ready);
  console.log('Textbooks Pending:', result.textbooks_pending);

  if (result.gate_status === 'PAGE_READY') {
    console.log('\n[PASS] Runtime Gate successfully verified PAGE_READY for Curiosity.');
  } else {
    console.error('\n[FAIL] Runtime Gate failed to verify PAGE_READY.');
    process.exit(1);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
