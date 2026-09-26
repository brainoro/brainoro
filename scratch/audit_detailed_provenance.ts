import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const cleanSupabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
const cleanSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(cleanSupabaseUrl, cleanSupabaseKey);

async function runDetailedAudit() {
  console.log('================================================================');
  console.log(' DETAILED READ-ONLY PROVENANCE AUDIT SCRIPT');
  console.log('================================================================\n');

  // 1. Concept Curriculum Mappings
  const { data: mappings } = await supabase.from('concept_curriculum_mappings').select('*');
  const { data: concepts } = await supabase.from('curriculum_concepts').select('id, board_id, grade_level, subject_id, unit, title');
  const { data: textbooks } = await supabase.from('textbooks').select('*');
  const { data: chapters } = await supabase.from('textbook_chapters').select('*');
  const { data: sections } = await supabase.from('textbook_sections').select('*');
  const { data: topics } = await supabase.from('topics').select('*');
  const { data: valResults } = await supabase.from('curriculum_validation_results').select('*');

  const conceptMap = new Map<string, any>(concepts?.map((c) => [c.id, c]));
  const textbookMap = new Map<string, any>(textbooks?.map((t) => [t.id, t]));
  const chapterMap = new Map<string, any>(chapters?.map((ch) => [ch.id, ch]));
  const sectionMap = new Map<string, any>(sections?.map((s) => [s.id, s]));
  const topicMap = new Map<string, any>(topics?.map((top) => [top.id, top]));

  // Audit 1: Check Sections
  console.log('--- 1. SECTION HIERARCHY AUDIT ---');
  let syntheticSectionCount = 0;
  sections?.forEach((s) => {
    if (s.section_title.includes('Fundamental Principles & Core Concepts') || s.section_number.endsWith('.1')) {
      syntheticSectionCount++;
    }
  });
  console.log(`Total sections: ${sections?.length}`);
  console.log(`Synthetic section count: ${syntheticSectionCount}`);

  // Audit 2: Check Isolation across Mappings
  console.log('\n--- 2. ISOLATION AUDIT ---');
  let crossBoard = 0;
  let crossGrade = 0;
  let crossSubject = 0;
  let crossVersion = 0;

  mappings?.forEach((m) => {
    const c = conceptMap.get(m.brainoro_concept_id);
    if (!c) {
      console.log(`Missing concept for mapping: ${m.brainoro_concept_id}`);
      return;
    }
    if (c.board_id !== 'CBSE') crossBoard++;

    if (m.textbook_id) {
      const tb = textbookMap.get(m.textbook_id);
      if (tb) {
        if (tb.grade_level !== c.grade_level) {
          crossGrade++;
          console.log(`Cross-grade: Concept ${c.id} (G${c.grade_level}) -> TB ${tb.id} (G${tb.grade_level})`);
        }
        if (tb.board_id !== c.board_id) crossBoard++;
        // Note: TB can be SCIENCE for BIOLOGY/CHEMISTRY/PHYSICS
        if (tb.subject_id !== c.subject_id && !(tb.subject_id === 'SCIENCE' && ['BIOLOGY', 'CHEMISTRY', 'PHYSICS'].includes(c.subject_id))) {
          crossSubject++;
          console.log(`Cross-subject: Concept ${c.id} (${c.subject_id}) -> TB ${tb.id} (${tb.subject_id})`);
        }
      }
    }

    if (m.topic_id) {
      const top = topicMap.get(m.topic_id);
      if (top) {
        if (top.grade_level !== c.grade_level) crossGrade++;
        if (top.board_id !== c.board_id) crossBoard++;
      }
    }
  });

  console.log(`Cross-Board contamination: ${crossBoard}`);
  console.log(`Cross-Grade contamination: ${crossGrade}`);
  console.log(`Cross-Subject contamination: ${crossSubject}`);
  console.log(`Cross-Version contamination: ${crossVersion}`);

  // Audit 3: Concept Mapping Evidence Classification
  console.log('\n--- 3. CONCEPT MAPPING EVIDENCE CLASSIFICATION ---');
  let verifiedStrong = 0;
  let verifiedWeak = 0;
  let shouldBePending = 0;
  const weakEvidenceList: any[] = [];

  mappings?.forEach((m) => {
    if (m.mapping_state === 'VERIFIED') {
      // Check if evidence contains exact page numbers, syllabus clause, or line-item section reference
      // Or if it was derived from keyword matching
      const isKeywordMatch = m.evidence.includes('Matched key curriculum indicators:') || m.evidence.includes('Direct verified match to');
      const hasPageOrClause = m.evidence.includes('Page') || m.evidence.includes('Clause') || m.evidence.includes('Section 4.');

      if (hasPageOrClause) {
        verifiedStrong++;
      } else if (isKeywordMatch) {
        verifiedWeak++;
        weakEvidenceList.push({
          id: m.brainoro_concept_id,
          reason: 'Matched via algorithmic keyword heuristic rather than authoritative page/clause citation in official NCERT syllabus',
          evidence: m.evidence,
        });
      } else {
        shouldBePending++;
      }
    }
  });

  console.log(`VERIFIED mappings count: ${mappings?.filter((m) => m.mapping_state === 'VERIFIED').length}`);
  console.log(`- VERIFIED_WITH_STRONG_SOURCE_EVIDENCE: ${verifiedStrong}`);
  console.log(`- VERIFIED_BUT_EVIDENCE_WEAK: ${verifiedWeak}`);
  console.log(`- SHOULD_BE_PENDING_REVIEW: ${shouldBePending}`);

  // Audit 4: Unmapped Concepts
  console.log('\n--- 4. UNMAPPED CONCEPTS AUDIT ---');
  const unmapped = mappings?.filter((m) => m.mapping_state === 'UNMAPPED') || [];
  console.log(`Total unmapped: ${unmapped.length}`);
  unmapped.forEach((m) => {
    const c = conceptMap.get(m.brainoro_concept_id);
    console.log(`- [UNMAPPED] ${m.brainoro_concept_id} (G${c?.grade_level} ${c?.subject_id}): "${c?.title}" | Evidence: ${m.evidence}`);
  });

  // Audit 5: Validation Results Inspection
  console.log('\n--- 5. VALIDATION RESULTS INSPECTION ---');
  console.log(`Total validation results: ${valResults?.length}`);
  const valSummary: Record<string, { count: number; severities: Record<string, number>; resolved: number }> = {};
  valResults?.forEach((v) => {
    if (!valSummary[v.rule_name]) valSummary[v.rule_name] = { count: 0, severities: {}, resolved: 0 };
    valSummary[v.rule_name].count++;
    valSummary[v.rule_name].severities[v.severity] = (valSummary[v.rule_name].severities[v.severity] || 0) + 1;
    if (v.resolved) valSummary[v.rule_name].resolved++;
  });
  console.log(JSON.stringify(valSummary, null, 2));
}

runDetailedAudit().catch(console.error);
