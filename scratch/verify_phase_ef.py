import urllib.request, json

url = 'https://gyjlrgudysqabwbhaskr.supabase.co/rest/v1/'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amxyZ3VkeXNxYWJ3Ymhhc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI1ODUsImV4cCI6MjEwNDk4ODU4NX0.N_SDVcl0PoN39n9sHApC_nEy8fI0xRqhj3IFvG6zbeI'
headers = {'apikey': key, 'Authorization': f'Bearer {key}'}

def get(path):
    req = urllib.request.Request(url + path, headers=headers)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

print('=== 1. TEXTBOOK SECTIONS VERIFICATION ===')
secs = get('textbook_sections?select=id,chapter_id,section_number,section_title,section_type,textbook_id,source_document_id,source_url,source_page,source_locator&order=id')
print(f'Total textbook_sections: {len(secs)}')
auth_secs = [s for s in secs if s['section_type'] == 'AUTHENTIC']
leg_secs = [s for s in secs if s['section_type'] == 'LEGACY_SYNTHETIC']
print(f'AUTHENTIC: {len(auth_secs)} | LEGACY_SYNTHETIC: {len(leg_secs)}')

g10_auth = [s for s in auth_secs if 'G10' in s['id']]
g6_auth = [s for s in auth_secs if 'G6' in s['id']]
print(f'G10 AUTHENTIC: {len(g10_auth)} | G6 AUTHENTIC: {len(g6_auth)}')

# Check G10 source_page
g10_null_pages = [s for s in g10_auth if not s.get('source_page') or not s['source_page'].strip()]
print(f'G10 rows with empty source_page: {len(g10_null_pages)}')

# Check LEGACY_SYNTHETIC untouched
leg_modified = [s for s in leg_secs if s.get('source_page') is not None]
print(f'LEGACY_SYNTHETIC rows with modified source_page: {len(leg_modified)}')

# Check all 52 AUTHENTIC provenance completeness
prov_fails = [s for s in auth_secs if not s.get('source_document_id') or not s.get('source_url') or not s.get('source_page') or not s.get('source_locator')]
print(f'AUTHENTIC rows with provenance failures: {len(prov_fails)}')

print('\nExact 11 G6 Ch 2 Sections:')
g6_ch2_secs = [s for s in g6_auth if s['chapter_id'] == 'CH-NCERT-G6-MATH-2024-02']
g6_ch2_secs.sort(key=lambda x: [int(p) for p in x['section_number'].split('.')])
for s in g6_ch2_secs:
    print(f"  {s['id']} | Sec {s['section_number']}: {s['section_title']} | p. {s['source_page']} | loc: {s['source_locator']}")

print('\n=== 2. AUTHORITATIVE CONCEPTS VERIFICATION ===')
auth_c = get('authoritative_curriculum_concepts?select=id,chapter_id,section_id,official_title,statutory_title,normalized_title,board_id,grade_level,subject_id,curriculum_version_id,metadata&order=id')
print(f'Total authoritative concepts: {len(auth_c)}')
g10_c = [c for c in auth_c if 'G10' in c['id']]
g6_c = [c for c in auth_c if 'G6' in c['id']]
g6_ch2_c = [c for c in auth_c if c['chapter_id'] == 'CH-NCERT-G6-MATH-2024-02']
print(f'Existing G10 concepts: {len(g10_c)} | Total G6 concepts: {len(g6_c)} | G6 Ch 2 concepts: {len(g6_ch2_c)}')

null_sec_id = [c for c in g6_ch2_c if c['section_id'] is None]
print(f'G6 Ch 2 concepts with section_id = NULL: {len(null_sec_id)} / {len(g6_ch2_c)}')

print('\nExact 11 G6 Ch 2 Concepts:')
for c in g6_ch2_c:
    disp = c.get('metadata', {}).get('display_title') if c.get('metadata') else c.get('normalized_title')
    print(f"  {c['id']} | official: {repr(c['official_title'])} | display: {repr(disp)} | sec_id: {c['section_id']}")

print('\n=== 3. AUTHORITATIVE CONCEPT SECTIONS (M:N) VERIFICATION ===')
acs = get('authoritative_concept_sections?select=id,authoritative_concept_id,section_id,relationship_type,mapping_basis,evidence,display_order&order=authoritative_concept_id,display_order')
print(f'Total M:N mappings: {len(acs)}')

empty_evidence = [m for m in acs if not m.get('evidence') or not m['evidence'].strip()]
print(f'Mappings with empty evidence: {len(empty_evidence)}')

reflex_mapping = [m for m in acs if 'ANGLE-CLASSIFICATION' in m['authoritative_concept_id'] and '02-11' in m['section_id']]
print('Reflex / Section 2.11 mapping:', reflex_mapping)

print('\nAll 18 M:N Mappings:')
for m in acs:
    print(f"  {m['authoritative_concept_id']} -> {m['section_id']} [{m['relationship_type']}, {m['mapping_basis']}] | evidence: {m['evidence'][:50]}...")

print('\n=== 4. LEGACY CURRICULUM CONCEPTS PRESERVATION ===')
curr_c = get('curriculum_concepts?select=id,board_id,grade_level,subject_id')
print(f'Total curriculum_concepts: {len(curr_c)}')
cbse = [c for c in curr_c if c['board_id'] == 'CBSE']
cbse_g6 = [c for c in cbse if c['grade_level'] == 6]
cambridge = [c for c in curr_c if c['board_id'] == 'CAMBRIDGE']
ibmyp = [c for c in curr_c if c['board_id'] == 'IB_MYP']
print(f'CBSE total: {len(cbse)} | CBSE G6 legacy: {len(cbse_g6)} | Cambridge: {len(cambridge)} | IB_MYP: {len(ibmyp)}')
