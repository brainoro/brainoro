import re

with open('backend/migrations/20260920000005_authentic_ncert_sections_ingestion.sql', 'r', encoding='utf-8') as f:
    sql = f.read()

# 1. Check markdown links
md_links = re.findall(r'\[.+?\]\(.+?\)', sql)
print('Markdown links count:', len(md_links))

# 2. Check authentic section rows in staging
rows = re.findall(r"'(SEC-NCERT-G10-MATH-[0-9\-]+-AUTH)',\s*'(CH-NCERT-G10-MATH-[0-9]{2})',\s*'([0-9\.]+)',\s*'([^']+)',\s*'AUTHENTIC'", sql)
print('Total authentic section rows in staging:', len(rows))

chap_counts = {}
for r in rows:
    chap_counts[r[1]] = chap_counts.get(r[1], 0) + 1

for c in sorted(chap_counts.keys()):
    print(c, ':', chap_counts[c])

# 3. Check ON CONFLICT on textbook_sections
sec_insert_idx = sql.find('INSERT INTO public.textbook_sections')
post_assert_idx = sql.find('Fail-Closed Post-Insertion Assertions')
has_on_conflict = 'ON CONFLICT' in sql[sec_insert_idx:post_assert_idx]
print('Has ON CONFLICT on section ingestion:', has_on_conflict)

# 4. Check URLs
urls = re.findall(r"'(https://ncert\.nic\.in/textbook/pdf/jemh1[0-9]{2}\.pdf)'", sql)
print('Total valid PDF URLs:', len(urls))
