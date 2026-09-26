import { getContentForTopic } from '../frontend/src/lib/services/contentService';
import { CurriculumConcept } from '../frontend/src/lib/types';

async function testMissingConcept() {
  const dummyConcept: CurriculumConcept = {
    id: 'NON-EXISTENT-CONCEPT-XYZ',
    boardId: 'CBSE',
    gradeLevel: 9,
    subjectId: 'MATH',
    title: 'Non-existent concept',
    unit: 'Unit 99',
    coreLogicEssence: 'Test',
    parentNodeId: null,
    prerequisites: []
  };

  try {
    await getContentForTopic(dummyConcept, 'CBSE');
    console.error('FAILED: Did not throw!');
    process.exit(1);
  } catch (err: any) {
    console.log('SUCCESS_CAUGHT_EXPECTED_ERROR:', err.message);
  }
}

async function testValidCambridgeConcept() {
  const cambridgeConcept: CurriculumConcept = {
    id: 'CAMBRIDGE-G7-MATH-FRAC-MULT',
    boardId: 'CAMBRIDGE',
    gradeLevel: 7,
    subjectId: 'MATH',
    title: 'Multiplication & Division of Rational Fractions',
    unit: 'Unit 2: Fractions, Decimals & Scientific Form',
    coreLogicEssence: 'Fraction multiplication',
    parentNodeId: null,
    prerequisites: []
  };

  try {
    const notes = await getContentForTopic(cambridgeConcept, 'CAMBRIDGE');
    console.log('SUCCESS_LOADED_CAMBRIDGE_NOTES:');
    console.log('  Title:', notes.title);
    console.log('  DiagramType:', notes.diagramType);
    console.log('  GradeLevel:', notes.gradeLevel);
    console.log('  MainNotes length:', notes.mainNotes.length);
  } catch (err: any) {
    console.error('FAILED to load Cambridge concept:', err.message);
    process.exit(1);
  }
}

async function run() {
  await testMissingConcept();
  await testValidCambridgeConcept();
}

run();
