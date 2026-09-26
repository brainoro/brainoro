import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/hierarchy_discovery.json', 'utf8'));

console.log("=== TEXTBOOKS IN DATABASE ===");
data.textbooks.forEach((tb: any) => {
  const chapters = data.chaptersByTb[tb.id] || [];
  console.log(`\nTextbook: ${tb.id} | ${tb.title}`);
  console.log(`  Grade: ${tb.grade_level}, Subject: ${tb.subject_id}, Version: ${tb.curriculum_version_id}`);
  console.log(`  Chapters Count: ${chapters.length}`);
  chapters.forEach((c: any) => {
    console.log(`    [${c.id}] Ch ${c.num}: ${c.title}`);
  });
});
