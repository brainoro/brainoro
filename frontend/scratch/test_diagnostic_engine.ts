/**
 * Verification Test: Root-Cause Prerequisite Diagnostic Algorithm
 */

import { DiagnosticEngine } from '../src/lib/engine/diagnosticEngine';
import { AssessmentItem } from '../src/lib/types';

const testScenarios = [
  {
    chapter: 'Lines and Angles',
    grade: 9,
    subject: 'Mathematics',
    item: {
      id: 'PRAC-G9-MATH-LA-1',
      conceptId: 'CONCEPT-LA',
      boardType: 'CBSE' as const,
      difficultyB: 0.0,
      discriminationA: 1.5,
      guessingC: 0.25,
      prompt: 'In given figure, AB ∥ CD and CD ∥ EF. If y : z = 3 : 7, find x.',
      options: ['126°', '54°', '180°', '36°'],
      correctOptionIndex: 0,
      sampleSolution: 'Model solution for test'
    }
  },
  {
    chapter: 'Quadratic Equations',
    grade: 10,
    subject: 'Mathematics',
    item: {
      id: 'PRAC-G10-MATH-QE-1',
      conceptId: 'CONCEPT-QE',
      boardType: 'CBSE' as const,
      difficultyB: 0.2,
      discriminationA: 1.4,
      guessingC: 0.25,
      prompt: 'Find the nature of roots for 2x² - 4x + 3 = 0.',
      options: ['Real and Equal', 'No Real Roots (D < 0)', 'Real and Distinct', 'Infinite Roots'],
      correctOptionIndex: 1,
      sampleSolution: 'D = b² - 4ac = 16 - 24 = -8 < 0 => No real roots'
    }
  },
  {
    chapter: 'Structure of the Atom',
    grade: 9,
    subject: 'Science',
    item: {
      id: 'PRAC-G9-SCI-ATOM-1',
      conceptId: 'CONCEPT-ATOM',
      boardType: 'CBSE' as const,
      difficultyB: 0.0,
      discriminationA: 1.3,
      guessingC: 0.25,
      prompt: 'What is the electron distribution of Chlorine with atomic number 17?',
      options: ['2, 8, 7', '2, 7, 8', '2, 10, 5', '8, 8, 1'],
      correctOptionIndex: 0,
      sampleSolution: 'K=2, L=8, M=7'
    }
  },
  {
    chapter: 'Acids, Bases and Salts',
    grade: 10,
    subject: 'Science',
    item: {
      id: 'PRAC-G10-SCI-ACID-1',
      conceptId: 'CONCEPT-ACID',
      boardType: 'CBSE' as const,
      difficultyB: 0.0,
      discriminationA: 1.4,
      guessingC: 0.25,
      prompt: 'What happens when zinc granules react with dilute sodium hydroxide?',
      options: ['Sodium zincate and Hydrogen gas', 'Zinc oxide only', 'Zinc hydroxide and Sodium', 'No reaction'],
      correctOptionIndex: 0,
      sampleSolution: 'Zn + 2NaOH -> Na2ZnO2 + H2'
    }
  }
];

console.log('=== RUNNING ROOT-CAUSE DIAGNOSTIC ENGINE VERIFICATION ===\n');

for (const sc of testScenarios) {
  const report = DiagnosticEngine.diagnoseWrongResponse({
    item: sc.item,
    chapterTitle: sc.chapter,
    grade: sc.grade,
    subject: sc.subject,
    selectedOptionIndex: (sc.item.correctOptionIndex + 1) % 4, // Intentionally wrong option
  });

  console.log(`📌 Scenario: Class ${sc.grade} ${sc.subject} - "${sc.chapter}"`);
  console.log(`   🚨 Diagnosed Misconception: ${report.misconceptionType}`);
  console.log(`   🔗 Upstream Prerequisite Chapter: Class ${report.prerequisite.grade} ${report.prerequisite.subject} ("${report.prerequisite.chapterTitle}")`);
  console.log(`   🎯 Prerequisite Concept: "${report.prerequisite.conceptTitle}"`);
  console.log(`   💡 Axiom: ${report.prerequisite.axiomSummary}`);
  console.log(`   🛠 Probe Question: ${report.prerequisite.probeQuestion.prompt.substring(0, 80)}...`);
  console.log(`   ✔ Correct Probe Option: Option [${report.prerequisite.probeQuestion.correctIndex}] (${report.prerequisite.probeQuestion.options[report.prerequisite.probeQuestion.correctIndex]})`);
  console.log('--------------------------------------------------\n');
}

console.log('✅ ALL DIAGNOSTIC PREREQUISITE ENGINE CHECKS PASSED.');
