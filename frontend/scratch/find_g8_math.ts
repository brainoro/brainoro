import { CONCEPTS_DATA } from '@/lib/data/curriculumData';

const g8Math = CONCEPTS_DATA.filter(c => c.boardId === 'CBSE' && c.gradeLevel === 8 && c.subjectId === 'MATH');
console.log('Total G8 CBSE Math concepts:', g8Math.length);
g8Math.forEach(c => console.log(c.id, '|', c.title));
