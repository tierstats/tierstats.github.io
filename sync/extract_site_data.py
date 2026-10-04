# -*- coding: utf-8 -*-
"""Extract ALL data from TankTrouble_Dynamic_Glicko.xlsx into a single data.js
for the 1v1 Leaderboard website.

Usage: python extract_site_data.py [src.xlsx] [out.js]
"""
import json, re, sys
import openpyxl

SRC = sys.argv[1] if len(sys.argv) > 1 else 'C:/Users/iqzcl/Downloads/TankTrouble_Dynamic_Glicko.xlsx'
OUT = sys.argv[2] if len(sys.argv) > 2 else 'C:/Users/iqzcl/Downloads/Ricochet AI/1v1-leaderboard/data.js'

# Manual corrections on top of the sheet's Aliases tab (alias -> canonical).
# SneakyOnyxDragon is Eddie — one of his matches was logged under that name.
ALIAS_FIXES = {
    'SneakyOnyxDragon': '_Eddie_',
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
