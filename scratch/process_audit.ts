import fs from 'fs';

const raw = fs.readFileSync('scratch/audit_data.json', 'utf-8');
const data = JSON.parse(raw);

console.log("=== VERSIONS ===");
console.log(data.versions);

console.log("\n=== TEXTBOOKS ===");
console.log(data.textbooks.map((t: any) => ({
  id: t.id,
  grade: t.grade_level,
  subject: t.subject_id,
  title: t.title,
  version: t.curriculum_version_id,
  isbn: t.isbn_or_code
})));

console.log("\n=== AUTH CONCEPTS (17) ===");
data.authConcepts.forEach((c: any, i: number) => {
  console.log(`[${i+1}] ID: ${c.id} | Grade: ${c.grade_level} | Subj: ${c.subject_id} | Ch: ${c.chapter_id} | Title: ${c.official_title}`);
  console.log(`     Doc: ${c.source_document_id} | Page: ${c.source_page}`);
  console.log(`     Desc: ${c.official_description.slice(0, 80)}...`);
  console.log(`     Code: ${c.official_concept_code}`);
});

console.log("\n=== UNMAPPED MAPPINGS (14) ===");
data.unmappedMappings.forEach((m: any, i: number) => {
  console.log(`[${i+1}] ConceptID: ${m.brainoro_concept_id} | State: ${m.mapping_state} | Evidence: ${m.evidence}`);
});
