import { deduceDiagramCategory } from '../frontend/src/components/cornell/VisualModelCard';
const conceptNoMeta: any = {
  id: 'IB_MYP-G6-BIOLOGY-FOOD-VIT',
  boardId: 'IB_MYP',
  gradeLevel: 6,
  subjectId: 'BIOLOGY',
  unit: 'Unit 1: Food & Biological Macromolecules',
  title: 'Vitamins, Minerals & Deficiency Diseases',
  coreLogicEssence: 'Micronutrients required as enzymatic co-factors'
};
console.log('Result for IB_MYP-G6-BIOLOGY-FOOD-VIT without notes/meta:', deduceDiagramCategory(conceptNoMeta, null));

const conceptPhysics: any = {
  id: 'CAMBRIDGE-G8-PHYSICS-SPEED-CALC',
  boardId: 'CAMBRIDGE',
  gradeLevel: 8,
  subjectId: 'PHYSICS',
  unit: 'Unit 3: Motion & Forces',
  title: 'Speed Calculations & Average Speed',
  coreLogicEssence: 'Speed = distance / time'
};
console.log('Result for CAMBRIDGE-G8-PHYSICS-SPEED-CALC without notes/meta:', deduceDiagramCategory(conceptPhysics, null));
