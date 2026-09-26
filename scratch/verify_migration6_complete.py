import urllib.request, json, re

url = 'https://gyjlrgudysqabwbhaskr.supabase.co/rest/v1/'
key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5amxyZ3VkeXNxYWJ3Ymhhc2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTI1ODUsImV4cCI6MjEwNDk4ODU4NX0.N_SDVcl0PoN39n9sHApC_nEy8fI0xRqhj3IFvG6zbeI'
headers = {'apikey': key, 'Authorization': f'Bearer {key}'}

def get(path):
    req = urllib.request.Request(url + path, headers=headers)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))

print("=== RUNNING FULL LIVE VERIFICATION AUDIT FOR MIGRATION 6 ===")

# 1. textbook_sections
secs = get('textbook_sections?select=id,chapter_id,section_number,section_title,section_type,textbook_id,source_document_id,source_url,source_page,source_locator,evidence_excerpt&order=id')
total_secs = len(secs)
auth_secs = [s for s in secs if s['section_type'] == 'AUTHENTIC']
leg_secs = [s for s in secs if s['section_type'] == 'LEGACY_SYNTHETIC']
g10_auth = [s for s in auth_secs if 'G10' in s['id']]
g6_auth = [s for s in auth_secs if 'G6' in s['id']]

print(f"Total sections: {total_secs} (Expected 178)")
print(f"AUTHENTIC: {len(auth_secs)} (Expected 52)")
print(f"LEGACY_SYNTHETIC: {len(leg_secs)} (Expected 126)")
print(f"G10 AUTHENTIC: {len(g10_auth)} (Expected 41)")
print(f"G6 AUTHENTIC: {len(g6_auth)} (Expected 11)")

# G10 source_page deterministic backfill audit
g10_backfill_ok = 0
g10_mismatches = []
for s in g10_auth:
    loc = s.get('source_locator') or ''
    m = re.search(r'p\.\s*([0-9]+)', loc)
    extracted = m.group(1) if m else None
    actual_page = s.get('source_page')
    if extracted and actual_page == extracted:
        g10_backfill_ok += 1
    else:
        g10_mismatches.append((s['id'], loc, actual_page, extracted))

print(f"G10 backfill verified: {g10_backfill_ok} / 41 (Mismatches: {len(g10_mismatches)})")

# Check legacy synthetic rows unmodified
leg_with_page = [s for s in leg_secs if s.get('source_page') is not None]
print(f"Legacy synthetic rows with source_page: {len(leg_with_page)} (Expected 0)")

# Check authentic provenance violations
prov_fails = []
for s in auth_secs:
    doc = s.get('source_document_id') or ''
    u = s.get('source_url') or ''
    p = s.get('source_page') or ''
    loc = s.get('source_locator') or ''
    if not doc.strip() or not u.strip() or not p.strip() or not loc.strip():
        prov_fails.append(s['id'])
print(f"AUTHENTIC provenance failures: {len(prov_fails)} (Expected 0)")

# G6 sections exact check
g6_ch2_secs = [s for s in g6_auth if s['chapter_id'] == 'CH-NCERT-G6-MATH-2024-02']
g6_ch2_secs.sort(key=lambda x: [int(p) for p in x['section_number'].split('.')])
print(f"G6 Chapter 2 authentic sections count: {len(g6_ch2_secs)} (Expected 11)")

# 2. authoritative_curriculum_concepts
auth_c = get('authoritative_curriculum_concepts?select=id,curriculum_version_id,board_id,grade_level,subject_id,textbook_id,chapter_id,section_id,official_title,statutory_title,normalized_title,evidence&order=id')
print(f"Total authoritative concepts: {len(auth_c)} (Expected 28)")
g10_auth_c = [c for c in auth_c if 'G10' in c['id']]
g6_auth_c = [c for c in auth_c if 'G6' in c['id']]
g6_ch2_c = [c for c in auth_c if c['chapter_id'] == 'CH-NCERT-G6-MATH-2024-02']
print(f"G10 authoritative concepts: {len(g10_auth_c)} (Expected 15)")
print(f"Total G6 authoritative concepts: {len(g6_auth_c)} (Expected 13: 1 Ch1 Math + 1 Ch1 Sci + 11 Ch2 Math)")
print(f"G6 Ch 2 authoritative concepts: {len(g6_ch2_c)} (Expected 11)")

# Check section_id IS NULL for all 11 new G6 concepts
g6_ch2_null_sec = [c for c in g6_ch2_c if c['section_id'] is None]
print(f"G6 Ch 2 concepts with section_id IS NULL: {len(g6_ch2_null_sec)} / {len(g6_ch2_c)} (Expected 11/11)")

# 3. authoritative_concept_sections
try:
    acs = get('authoritative_concept_sections?select=id,authoritative_concept_id,section_id,relationship_type,mapping_basis,evidence,display_order&order=authoritative_concept_id,display_order')
    total_acs = len(acs)
except Exception as e:
    acs = []
    total_acs = -1
print(f"Total authoritative_concept_sections rows: {total_acs} (Expected 18)")

# Validate evidence non-empty
empty_ev = [m for m in acs if not (m.get('evidence') or '').strip()]
print(f"Mappings with empty evidence: {len(empty_ev)} (Expected 0)")

# Check Reflex mapping
reflex_m = [m for m in acs if 'ANGLE-CLASSIFICATION' in m['authoritative_concept_id'] and '02-11' in m['section_id']]
print(f"Reflex mapping present: {len(reflex_m) == 1}")
if reflex_m:
    print(f"  mapping_basis: {reflex_m[0].get('mapping_basis')} (Expected SOURCE_EXPLICIT)")
    print(f"  evidence: {reflex_m[0].get('evidence')}")

# 4. Identity alignment on all 18 mappings
# Build lookups
c_lookup = {c['id']: c for c in auth_c}
s_lookup = {s['id']: s for s in secs}
tb_lookup = {tb['id']: tb for tb in get('textbooks?select=id,board_id,grade_level,subject_id,curriculum_version_id')}

identity_mismatches = []
non_auth_links = []
for m in acs:
    cid = m['authoritative_concept_id']
    sid = m['section_id']
    c = c_lookup.get(cid)
    s = s_lookup.get(sid)
    if not c or not s:
        identity_mismatches.append((cid, sid, 'ORPHAN'))
        continue
    if s.get('section_type') != 'AUTHENTIC':
        non_auth_links.append((cid, sid, s.get('section_type')))
    tb = tb_lookup.get(s.get('textbook_id'))
    if not tb:
        identity_mismatches.append((cid, sid, 'NO_TEXTBOOK'))
        continue
    # compare
    if (c['board_id'] != tb['board_id'] or
        c['grade_level'] != tb['grade_level'] or
        c['subject_id'] != tb['subject_id'] or
        c['curriculum_version_id'] != tb['curriculum_version_id']):
        identity_mismatches.append((cid, sid, f"c={c['board_id']}/{c['grade_level']}/{c['subject_id']}/{c['curriculum_version_id']} vs tb={tb['board_id']}/{tb['grade_level']}/{tb['subject_id']}/{tb['curriculum_version_id']}"))

print(f"Cross-identity mapping violations: {len(identity_mismatches)} (Expected 0)")
print(f"Non-authentic linked sections: {len(non_auth_links)} (Expected 0)")

# 5. curriculum_concepts preservation
curr_c = get('curriculum_concepts?select=id,board_id,grade_level,subject_id')
print(f"Total curriculum_concepts: {len(curr_c)} (Expected 846)")
cbse_c = [c for c in curr_c if c['board_id'] == 'CBSE']
cbse_g6 = [c for c in cbse_c if c['grade_level'] == 6]
cambridge_c = [c for c in curr_c if c['board_id'] == 'CAMBRIDGE']
ibmyp_c = [c for c in curr_c if c['board_id'] == 'IB_MYP']
print(f"CBSE concepts: {len(cbse_c)} (Expected 282), G6 legacy: {len(cbse_g6)} (Expected 51)")
print(f"CAMBRIDGE concepts: {len(cambridge_c)} (Expected 282)")
print(f"IB_MYP concepts: {len(ibmyp_c)} (Expected 282)")

# 6. Document registration
docs = get('curriculum_documents?id=eq.DOC-NCERT-TB-G6-MATH-2024')
print(f"DOC-NCERT-TB-G6-MATH-2024 registered: {len(docs)} (Expected 1)")
if docs:
    print(f"  source_id: {docs[0].get('source_id')}, url: {docs[0].get('document_url')}")
