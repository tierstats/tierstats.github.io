# -*- coding: utf-8 -*-
"""Extract ALL data from TankTrouble_Dynamic_Glicko.xlsx into a single data.js
for the 1v1 Leaderboard website.

Usage: python extract_site_data.py [src.xlsx] [out.js]
"""
import json, os, re, sys
import openpyxl

SRC = sys.argv[1] if len(sys.argv) > 1 else 'C:/Users/iqzcl/Downloads/TankTrouble_Dynamic_Glicko.xlsx'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'C:/Users/iqzcl/Downloads/Ricochet AI/1v1-leaderboard/data.js'
# Optional previous state for rating-change arrows: a previous .xlsx export or
# a previous data.js. Falls back to the existing OUT file's curRatings.
PREV = sys.argv[3] if len(sys.argv) > 3 else None

# Manual corrections on top of the sheet's Aliases tab (alias -> canonical).
# SneakyOnyxDragon is Eddie — one of his matches was logged under that name.
# 'Lokriss' is the spelling used in every raw match + the Seeds tab, but the
# sheet's Aliases tab only lists the Lokirisss/Lokirsss/Lokrisss variants and
# canonicalises to 'Lokirss' (the name its All Players tab shows).
ALIAS_FIXES = {
    'SneakyOnyxDragon': '_Eddie_',
    'Lokriss': 'Lokirss',
    'Lokrissss': 'Lokirss',
    # the sheet's Aliases tab contradicts itself (TankDestroyah52<->YourDestruction
    # in both directions); its Leaderboard tab displays 'YourDestruction', so
    # that is the canonical name everywhere.
    'YourDestruction': 'YourDestruction',
    'TankDestroyah52': 'YourDestruction',
}

wb = openpyxl.load_workbook(SRC, data_only=True)

EMOJI = re.compile(r'[\U0001F300-\U0001FAFF\u2600-\u27BF\uFE0F\u2B50\u2764]+')
def clean(s):
    return EMOJI.sub('', str(s)).strip() if s is not None else ''

def rows(ws, start, cols):
    out = []
    for r in range(start, ws.max_row + 1):
        vals = [ws.cell(row=r, column=c).value for c in cols]
        if all(v is None for v in vals):
            continue
        out.append(vals)
    return out

# ---- Leaderboard (qualified players)
lb = wb['Leaderboard']
qualified = []
for v in rows(lb, 6, range(1, 13)):
    rank, name, rating, glicko, rd, m, w, l, d, winp, opp, avgopp = v[:12]
    if not name:
        continue
    qualified.append(dict(rank=int(rank), name=clean(name), rating=round(float(rating), 1),
                          glicko=round(float(glicko), 1), rd=round(float(rd), 1),
                          matches=int(m), w=int(w), l=int(l), d=int(d),
                          winPct=round(float(winp) * 100, 1), opponents=int(opp),
                          avgOpp=round(float(avgopp), 1)))

# ---- All Players (everyone incl. provisional / inactive)
ap = wb['All Players']
everyone = {}
for v in rows(ap, 6, range(1, 13)):
    name, rating, glicko, rd, m, w, l, d, winp, opp, avgopp, last = v[:12]
    if not name:
        continue
    everyone[clean(name)] = dict(
        name=clean(name), rating=round(float(rating), 1), glicko=round(float(glicko), 1),
        rd=round(float(rd), 1), matches=int(m), w=int(w), l=int(l), d=int(d),
        winPct=round(float(winp) * 100, 1), opponents=int(opp),
        avgOpp=round(float(avgopp), 1),
        lastMatch=str(last)[:10] if last else '')

# ---- status flags (Provisional / Inactive name lists)
inactiveList = []
for sheet, flag in (('Provisional', 'provisional'), ('Inactive', 'inactive')):
    ws = wb[sheet]
    for v in rows(ws, 2, [1]):
        nm = clean(v[0])
        if flag == 'inactive' and nm:
            inactiveList.append(nm)
        if nm in everyone:
            everyone[nm][flag] = True

# ---- Matches
ms = wb['Matches']
matches = []
for v in rows(ms, 4, range(1, 6)):
    date, p1, p2, s1, s2 = v[:5]
    if not p1 or not p2:
        continue
    matches.append(dict(a=clean(p1), b=clean(p2), sa=int(s1), sb=int(s2),
                        date=str(date)[:10] if date else ''))

# ---- Aliases
al = wb['Aliases']
aliases = {}
for v in rows(al, 4, [1, 2]):
    a, c = clean(v[0]), clean(v[1])
    if a and c:
        aliases[a] = c
aliases.update(ALIAS_FIXES)
aliases_lc = {a.lower(): c for a, c in aliases.items()}

# flatten alias chains (A -> B -> C becomes A -> C) so single-lookup canon()
# in the app resolves straight to the final name

def _resolve(n):
    seen = set()
    while n in aliases_lc and aliases_lc[n] != n and n not in seen:
        seen.add(n)
        n = aliases_lc[n]
    return n

aliases = {a: _resolve(c) for a, c in aliases.items()}
aliases_lc = {a.lower(): c for a, c in aliases.items()}

# ---- Seeds (original 0-100 ratings used to seed Glicko)
sd = wb['Seeds']
seeds = {}
for v in rows(sd, 2, [1, 2]):
    nm, s = clean(v[0]), v[1]
    if nm and s is not None:
        try:
            seeds[nm] = float(s)
        except (TypeError, ValueError):
            pass

# ---- Settings
st = wb['Settings']
settings = []
for v in rows(st, 4, [1, 2, 3]):
    settings.append(dict(name=clean(v[0]), value=v[1], desc=clean(v[2])))

# ---- canonical names everywhere (case-insensitive alias resolution)
def canon(n):
    n = EMOJI.sub('', str(n)).strip()
    return aliases_lc.get(n.lower(), n)

for m in matches:
    m['a'] = canon(m['a'])
    m['b'] = canon(m['b'])

# seed rows can use alias spellings too (Seeds tab says 'Lokriss')
seeds_c = {}
for nm, sv in seeds.items():
    seeds_c[canon(nm)] = sv
seeds = seeds_c

# merge alias-named player rows into their canonical row
merged = {}
for nm, row in everyone.items():
    key = canon(nm)
    if key in merged:
        t = merged[key]
        t['matches'] += row['matches']
        t['w'] += row['w']; t['l'] += row['l']; t['d'] += row['d']
        t['winPct'] = round(t['w'] / t['matches'] * 100, 1) if t['matches'] else 0.0
        t['provisional'] = t.get('provisional') or row.get('provisional', False)
        t['inactive'] = t.get('inactive') or row.get('inactive', False)
        if row.get('lastMatch') and not t.get('lastMatch'):
            t['lastMatch'] = row['lastMatch']
    else:
        row['name'] = key
        merged[key] = row
everyone = merged

inactiveList = sorted({canon(n) for n in inactiveList if canon(n) in everyone})

# ---- per-player match histories (canonical)
histories = {}
for m in matches:
    for me, opp, sfor, sag in ((m['a'], m['b'], m['sa'], m['sb']),
                               (m['b'], m['a'], m['sb'], m['sa'])):
        histories.setdefault(me, []).append(
            dict(opp=opp, for_=sfor, against=sag,
                 res='W' if sfor > sag else ('L' if sfor < sag else 'D'),
                 date=m['date']))

# ---- current + previous visible ratings (green/red change arrows on the board)
curRatings = {nm: row['rating'] for nm, row in everyone.items()}

def prev_from_xlsx(path):
    wp = openpyxl.load_workbook(path, data_only=True)
    out = {}
    for v in rows(wp['All Players'], 6, range(1, 3)):
        nm, rating = v[:2]
        if nm and rating is not None:
            out[canon(clean(nm))] = round(float(rating), 1)
    return out

def prev_from_js(path):
    txt = open(path, encoding='utf-8').read()
    i = txt.find('curRatings')
    if i < 0:
        return {}
    k = txt.index('{', i)
    depth = 0
    for j in range(k, len(txt)):
        if txt[j] == '{':
            depth += 1
        elif txt[j] == '}':
            depth -= 1
            if depth == 0:
                return {str(a): float(b) for a, b in json.loads(txt[k:j + 1]).items()}
    return {}

prevRatings = {}
try:
    if PREV and PREV.endswith('.xlsx'):
        prevRatings = prev_from_xlsx(PREV)
    elif PREV:
        prevRatings = prev_from_js(PREV)
    elif os.path.exists(OUT):
        prevRatings = prev_from_js(OUT)
except Exception as e:  # never block the build on arrow history
    print('prev ratings unavailable:', e)
    prevRatings = {}

data = dict(
    generated='2026-10-04',
    qualified=qualified,
    players=list(everyone.values()),
    matches=matches,
    aliases=aliases,
    seeds=seeds,
    settings=settings,
    inactiveList=inactiveList,
    histories=histories,
    curRatings=curRatings,
    prevRatings=prevRatings,
)

with open(OUT, 'w', encoding='utf-8') as f:
    f.write('// 1v1 Leaderboard data - generated from TankTrouble_Dynamic_Glicko.xlsx\n')
    f.write('window.LB_DATA = ')
    json.dump(data, f, ensure_ascii=False, separators=(',', ':'),
              default=lambda o: str(o))
    f.write(';\n')

print(f'qualified={len(qualified)} everyone={len(everyone)} matches={len(matches)} '
      f'aliases={len(aliases)} seeds={len(seeds)} settings={len(settings)} '
      f'inactive={len(inactiveList)} histories={len(histories)}')
