import urllib.request, json, sys

url = 'https://gyjlrgudysqabwbhaskr.supabase.co/rest/v1/'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amxyZ3VkeXNxYWJ3Ymhhc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI1ODUsImV4cCI6MjEwNDk4ODU4NX0.N_SDVcl0PoN39n9sHApC_nEy8fI0xRqhj3IFvG6zbeI'
headers = {'apikey': key, 'Authorization': f'Bearer {key}'}

def get(path):
    req = urllib.request.Request(url + path, headers=headers)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

print('=== 1. CBSE Grade 6 Concepts in curriculum_concepts ===')
c6 = get('curriculum_concepts?board_id=eq.CBSE&grade_level=eq.6&select=id,board_id,subject_id,grade_level,unit,title')
print(f'Total CBSE Grade 6 concepts: {len(c6)}')
for c in c6:
    print(f"{c['id']} | {c['subject_id']} | {c['unit']} | {c['title']}")

print('\n=== 2. Chapters for TB-NCERT-G6-MATH and TB-NCERT-G6-MATH-2024 ===')
chaps = get('textbook_chapters?select=id,textbook_id,chapter_number,chapter_title,page_range&order=textbook_id,chapter_number')
g6_chaps = [ch for ch in chaps if 'G6' in ch['textbook_id']]
print(f'Total G6 chapters: {len(g6_chaps)}')
for ch in g6_chaps:
    print(f"{ch['textbook_id']} | Ch {ch['chapter_number']}: {ch['chapter_title']} ({ch['id']})")

print('\n=== 3. Sections for G6 chapters in textbook_sections ===')
secs = get('textbook_sections?select=id,chapter_id,section_number,section_title,section_type,textbook_id,source_document_id')
g6_secs = [s for s in secs if 'G6' in s.get('textbook_id', '') or 'G6' in s.get('chapter_id', '')]
print(f'Total G6 sections in textbook_sections: {len(g6_secs)}')
for s in g6_secs:
    print(f"{s['textbook_id']} | {s['chapter_id']} | {s['section_number']}: {s['section_title']} [{s['section_type']}] ({s['id']})")

print('\n=== 4. Mappings for CBSE Grade 6 in concept_curriculum_mappings ===')
mappings = get('concept_curriculum_mappings?brainoro_concept_id=like.CBSE-G6*&select=id,brainoro_concept_id,textbook_id,chapter_id,section_id,mapping_state,confidence_score,authoritative_concept_id')
print(f'Total CBSE G6 mappings: {len(mappings)}')
for m in mappings:
    print(f"{m['brainoro_concept_id']} -> {m['textbook_id']} | {m['chapter_id']} | {m['section_id']} | state={m['mapping_state']} | auth={m['authoritative_concept_id']}")

print('\n=== 5. Authoritative Concepts for Grade 6 ===')
auth_c = get('authoritative_curriculum_concepts?grade_level=eq.6&select=id,official_title,textbook_id,chapter_id,section_id')
print(f'Total Grade 6 authoritative concepts: {len(auth_c)}')
for ac in auth_c:
    print(ac)
