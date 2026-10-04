/* ============================================================
   1v1 LEADERBOARD — app.js
   Hash-routed SPA: #/ (rankings), #/player/<name>, #/matches,
   #/roster, #/analytics, #/method, #/admin.
   FLIP sorting, count-up stats, scroll reveal, search, admin log.
   ============================================================ */
'use strict';

const D = window.LB_DATA;
/* where the published site lives — "Publish to everyone" commits log.js here */
const SITE_REPO = 'tierstats/tierstats.github.io';
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- helpers ---------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const slug = (name) => encodeURIComponent(String(name));
const unslug = (s) => decodeURIComponent(s);

function countUp(el, target, opts = {}) {
  const dur = opts.dur || 1200;
  const dec = opts.dec || 0;
  const t0 = performance.now();
  const start = parseFloat(el.textContent) || 0;
  function frame(t) {
    const p = Math.min(1, (t - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (start + (target - start) * e).toFixed(dec);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ---------- crown & medal badges (rank 1-3 get metal, rest plain) ---------- */
const CROWN_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 8.2c0-.9 1-1.4 1.7-.9l3.1 2.4c.5.4 1.2.3 1.6-.2l2.2-2.9c.4-.5 1.2-.5 1.6 0l2.2 2.9c.4.5 1.1.6 1.6.2l3.1-2.4c.7-.5 1.7 0 1.7.9l-.7 8.4c-.1.8-.7 1.4-1.5 1.4H5.2c-.8 0-1.4-.6-1.5-1.4L3 8.2Z"/><rect x="5" y="19.2" width="14" height="1.9" rx=".9"/></svg>';
const MEDAL_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.4 2.2 12 8.4l3.6-6.2c.3-.6 1.1-.7 1.6-.3l1.7 1.5c.5.4.6 1.1.3 1.6L15.4 12a7 7 0 1 1-6.8 0L4.8 5a1.3 1.3 0 0 1 .3-1.6l1.7-1.5c.5-.4 1.3-.3 1.6.3Zm2 12.1a3.2 3.2 0 1 0 3.2 3.2 3.2 3.2 0 0 0-3.2-3.2Z"/></svg>';

function rankBadge(rank, size = '') {
  const cls = rank === 1 ? 'rb1' : rank === 2 ? 'rb2' : rank === 3 ? 'rb3' : '';
  const icon = rank <= 3 ? (rank === 1 ? CROWN_SVG : MEDAL_SVG) : '';
  return `<div class="rank-badge ${cls} ${size}" title="Rank #${rank}">${icon}<span class="num">${rank}</span></div>`;
}

/* ---------- derived data (rebuilt live by the Glicko engine) ---------- */
let playerByName = {};
let topOf = [];
let STATE = { players: [], byName: {}, qualified: [] };

/* alias map for admin-logged names (lowercased lookup) — sheet aliases +
   admin name fixes (merged at every rebuild) */
const aliasLc = {};
function rebuildAliases() {
  for (const k in aliasLc) delete aliasLc[k];
  Object.entries(D.aliases).forEach(([a, c]) => { aliasLc[a.toLowerCase()] = c; });
  Object.entries(overAll().aliases || {}).forEach(([a, c]) => { aliasLc[String(a).toLowerCase()] = c; });
}
const canon = (n) => {
  const t = String(n).trim();
  return aliasLc[t.toLowerCase()] || t;
};

function histOf(name) {
  /* newest first — mirrors allMatches() so admin fixes/edits are reflected */
  const out = [];
  allMatches().forEach((m) => {
    const mk = (opp, gf, ga) => ({ opp, for_: gf, against: ga,
      res: gf > ga ? 'W' : gf < ga ? 'L' : 'D', date: m.date });
    if (m.a === name) out.push(mk(m.b, m.sa, m.sb));
    else if (m.b === name) out.push(mk(m.a, m.sb, m.sa));
  });
  return out;
}

function h2hOf(name) {
  const map = {};
  histOf(name).forEach((m) => {
    const e = map[m.opp] || (map[m.opp] = { w: 0, l: 0, d: 0, pf: 0, pa: 0 });
    e[m.res.toLowerCase()] += 1;
    e.pf += m.for_; e.pa += m.against;
  });
  return Object.entries(map)
    .map(([opp, rec]) => ({ opp, ...rec }))
    .sort((a, b) => (b.w + b.l + b.d) - (a.w + a.l + a.d) || b.w - a.w);
}

function statusTag(name) {
  const meta = playerByName[name] || {};
  if (meta.provisional) return '<span class="tag prov">provisional</span>';
  if (meta.inactive) return '<span class="tag inact">inactive</span>';
  return '<span class="tag legacy">legacy</span>';
}

/* rating change vs the master-sheet archive: recomputed once at boot with the
   site-logged matches hidden, so deltas show exactly what the admin log has
   moved (corrections/name-fixes count as truth, not as change) */
const BASELINE = {};
let BASELINE_MODE = false;
function computeBaseline() {
  BASELINE_MODE = true;
  try {
    recalcAll().players.forEach((p) => { BASELINE[p.name] = p.rating; });
  } finally {
    BASELINE_MODE = false;
  }
}

function deltaTag(p) {
  const d = p.delta != null ? p.delta : 0;
  if (Math.abs(d) < 0.05) return '';
  const up = d > 0;
  return `<span class="delta ${up ? 'up' : 'down'}" title="rating change since the last data sync">${up ? '▲' : '▼'} ${Math.abs(d).toFixed(1)}</span>`;
}

/* ---------- admin log (localStorage overlay) ---------- */
const ADMIN_STORE = 'tt1v1_admin_log_v1';
const ADMIN_UNLOCK = 'tt1v1_admin_ok';

function logGet() {
  try { return JSON.parse(localStorage.getItem(ADMIN_STORE) || '[]'); }
  catch (e) { return []; }
}
function logSet(arr) {
  try { localStorage.setItem(ADMIN_STORE, JSON.stringify(arr)); } catch (e) { /* private mode */ }
}

/* everyone-visible published log (log.js in the repo) + this browser's
   pending entries — newest first on both sides */
/* published override document (log.js) + this browser's pending overrides.
   Covers everything the master sheet does: name fixes, inactive flags,
   seeds, model settings, match score/date fixes and deletions. */
const OVER_STORE = 'tt1v1_admin_over_v1';
function overGet() {
  try { return JSON.parse(localStorage.getItem(OVER_STORE) || '{}') || {}; }
  catch (e) { return {}; }
}
function overSet(doc) {
  try { localStorage.setItem(OVER_STORE, JSON.stringify(doc)); } catch (e) { /* private mode */ }
}
function overAll() {
  const pub = window.LB_PUB || {};
  const loc = overGet();
  return {
    aliases: { ...(pub.aliases || {}), ...(loc.aliases || {}) },
    aliasNotes: { ...(pub.aliasNotes || {}), ...(loc.aliasNotes || {}) },
    seeds: { ...(pub.seeds || {}), ...(loc.seeds || {}) },
    seedGlicko: { ...(pub.seedGlicko || {}), ...(loc.seedGlicko || {}) },
    seedRd: { ...(pub.seedRd || {}), ...(loc.seedRd || {}) },
    settings: { ...(pub.settings || {}), ...(loc.settings || {}) },
    matchEdits: { ...(pub.matchEdits || {}), ...(loc.matchEdits || {}) },
    inactive: loc.inactive || pub.inactive || [],
    matchRemoved: [...new Set([...(pub.matchRemoved || []), ...(loc.matchRemoved || [])])],
  };
}
function overLocal(patch) {
  const loc = overGet();
  overSet({ ...loc, ...patch });
}
function pubMatches() {
  return (window.LB_PUB && Array.isArray(window.LB_PUB.matches)) ? window.LB_PUB.matches
       : (Array.isArray(window.LB_LOG) ? window.LB_LOG : []);
}

function logAll() {
  if (BASELINE_MODE) return [];
  const pub = pubMatches().map((e) => ({ ...e, published: true }));
  return logGet().map((e) => ({ ...e, published: false })).concat(pub);
}

/* every match: local pending + published on top, archive below — with the
   admin's score/date fixes and deletions applied (keys l:i / p:i / a:i) */
function allMatches() {
  const O = overAll();
  const edits = O.matchEdits || {};
  const removed = new Set(O.matchRemoved || []);
  const apply = (m, key) => {
    if (removed.has(key)) return null;
    const e = edits[key];
    const src = e ? { ...m, sa: e.sa, sb: e.sb, date: e.date != null ? e.date : m.date } : m;
    return { ...src, a: canon(src.a), b: canon(src.b), sa: +src.sa, sb: +src.sb, key };
  };
  const local = BASELINE_MODE ? [] : logGet().map((e, i) => apply({ ...e, admin: true, published: false }, 'l:' + i)).filter(Boolean);
  const pub = BASELINE_MODE ? [] : pubMatches().map((e, i) => apply({ ...e, admin: true, published: true }, 'p:' + i)).filter(Boolean);
  const arch = D.matches.map((m, i) => apply({ ...m, admin: false, published: false }, 'a:' + i))
                 .filter(Boolean).reverse();
  return local.concat(pub, arch);
}

/* ============================================================
   GLICKO ENGINE — ported from the official Dynamic Glicko Google
   Sheet and validated against it: replaying the 306 archived
   matches reproduces all 97 published ratings/RDs exactly.
   Model: undated legacy matches = one simultaneous rating period;
   dated matches = chronological 30-day periods; RD grows as
   sqrt(rd² + 20²·k) over k inactive periods (cap 250);
   visible = Glicko − 0.35 × RD; entry = 5 matches / 3 opponents.
   ============================================================ */
const ENGINE = {
  seedMid: 1500, oldMid: 80, ptsPer: 30, knownRd: 80,
  unratedR: 1500, unratedRd: 250, maxRd: 250,
  growth: 20, periodDays: 30, conservative: 0.35,
  minMatches: 5, minOpp: 3, inactiveDays: 365,
  graceStart: '2026-10-04', graceDays: 365,
};
const DAY = 86400000;
const QQ = Math.log(10) / 400;
const gOf = (rd) => 1 / Math.sqrt(1 + 3 * QQ * QQ * rd * rd / (Math.PI * Math.PI));
const eOf = (r, ro, rdo) => 1 / (1 + Math.pow(10, -gOf(rdo) * (r - ro) / 400));

function seedOf(name) {
  const s = overAll().seeds || {};
  return (s[name] != null && s[name] !== '') ? Number(s[name]) : D.seeds[name];
}

function seedState(name) {
  /* explicit Glicko/RD override wins; else derive from the Old 0-100 seed */
  const sg = (overAll().seedGlicko || {})[name];
  const sr = (overAll().seedRd || {})[name];
  const g = (sg != null && sg !== '') ? Number(sg) : null;
  const r = (sr != null && sr !== '') ? Number(sr) : null;
  if (g != null || r != null) {
    return [g != null ? g : ENGINE.unratedR, r != null ? r : ENGINE.unratedRd];
  }
  const old = seedOf(name);
  if (old != null) return [ENGINE.seedMid + (old - ENGINE.oldMid) * ENGINE.ptsPer, ENGINE.knownRd];
  return [ENGINE.unratedR, ENGINE.unratedRd];
}

function glickoBatch(r, rd, games) {
  let d2i = 0, delta = 0;
  for (const [ro, rdo, sc] of games) {
    const gg = gOf(rdo), ee = eOf(r, ro, rdo);
    d2i += gg * gg * ee * (1 - ee);
    delta += gg * (sc - ee);
  }
  d2i *= QQ * QQ;
  if (d2i <= 0) return [r, rd];
  const base = 1 / (rd * rd) + d2i;
  return [r + (QQ / base) * delta, Math.sqrt(1 / base)];
}

/* banker's rounding at display precision — matches the official sheet export */
function roundHalfEven(x, dp) {
  const f = Math.pow(10, dp);
  const y = x * f, fl = Math.floor(y);
  if (Math.abs(y - fl - 0.5) < 1e-6) return (fl % 2 === 0 ? fl : fl + 1) / f;
  return Math.round(y) / f;
}

const periodIdx = (dateStr) => Math.floor(Date.parse(dateStr + 'T00:00:00Z') / (ENGINE.periodDays * DAY));
let GRACE_IDX = periodIdx(ENGINE.graceStart);

/* sheet Settings tab -> engine knobs; admin overrides win over the sheet */
const SETTING_MAP = {
  'Seed Glicko midpoint': 'seedMid',
  'Old rating midpoint': 'oldMid',
  'Glicko points per old rating point': 'ptsPer',
  'Known-player starting RD': 'knownRd',
  'Unrated-player starting rating': 'unratedR',
  'Unrated-player starting RD': 'unratedRd',
  'Maximum RD': 'maxRd',
  'RD growth per rating period': 'growth',
  'Rating period length (days)': 'periodDays',
  'Conservative RD multiplier': 'conservative',
  'Minimum matches for leaderboard': 'minMatches',
  'Minimum different opponents': 'minOpp',
  'Inactive after days': 'inactiveDays',
  'Legacy grace start date': 'graceStart',
  'Legacy grace days': 'graceDays',
};
function effectiveSettings() {
  const over = overAll().settings || {};
  return (D.settings || []).map((s) => ({
    ...s,
    value: Object.prototype.hasOwnProperty.call(over, s.name) ? over[s.name] : s.value,
  }));
}
function applyEngineSettings() {
  for (const s of effectiveSettings()) {
    const key = SETTING_MAP[s.name];
    if (!key) continue;
    if (key === 'graceStart') {
      const v = String(s.value == null ? '' : s.value).slice(0, 10);
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) ENGINE.graceStart = v;
      continue;
    }
    const v = Number(s.value);
    if (Number.isFinite(v)) ENGINE[key] = v;
  }
  GRACE_IDX = periodIdx(ENGINE.graceStart);
}

function recalcAll() {
  applyEngineSettings();
  rebuildAliases();
  const st = {};
  const get = (n) => {
    if (!st[n]) {
      const [r, rd] = seedState(n);
      st[n] = { name: n, r, rd, w: 0, l: 0, d: 0, games: 0, opps: new Set(), lastIdx: null, lastDate: null };
    }
    return st[n];
  };
  const record = (n, opp, gf, ga, date, idx) => {
    const p = get(n);
    p.games++; p.opps.add(opp);
    if (gf > ga) p.w++; else if (gf < ga) p.l++; else p.d++;
    p.lastIdx = idx; if (date) p.lastDate = date;
  };

  /* period 0 — all undated legacy matches, processed simultaneously */
  const legacy = {};
  for (const m of allMatches()) {
    if (m.date) continue;
    const a = m.a, b = m.b;
    const s = m.sa > m.sb ? 1 : m.sa < m.sb ? 0 : 0.5;
    (legacy[a] = legacy[a] || []).push([b, s]);
    (legacy[b] = legacy[b] || []).push([a, 1 - s]);
    record(a, b, m.sa, m.sb, '', GRACE_IDX);
    record(b, a, m.sb, m.sa, '', GRACE_IDX);
  }
  const snap = {};
  for (const n in legacy) snap[n] = [get(n).r, get(n).rd];
  for (const n in legacy) {
    const [nr, nrd] = glickoBatch(snap[n][0], snap[n][1],
      legacy[n].map(([o, sc]) => [snap[o][0], snap[o][1], sc]));
    get(n).r = nr; get(n).rd = nrd;
  }

  /* dated matches — chronological 30-day rating periods */
  const periods = new Map();
  for (const e of allMatches().filter((m) => m.date).slice().reverse()) {
    const date = e.date;
    const idx = periodIdx(date);
    if (!periods.has(idx)) periods.set(idx, []);
    periods.get(idx).push({ a: canon(e.a), b: canon(e.b), sa: +e.sa, sb: +e.sb, date });
  }
  for (const idx of [...periods.keys()].sort((x, y) => x - y)) {
    for (const n in st) {
      const p = st[n];
      const k = idx - (p.lastIdx == null ? GRACE_IDX : p.lastIdx);
      if (k > 0) p.rd = Math.min(Math.sqrt(p.rd * p.rd + ENGINE.growth * ENGINE.growth * k), ENGINE.maxRd);
    }
    const played = {};
    for (const e of periods.get(idx)) {
      const s = e.sa > e.sb ? 1 : e.sa < e.sb ? 0 : 0.5;
      (played[e.a] = played[e.a] || []).push([e.b, s]);
      (played[e.b] = played[e.b] || []).push([e.a, 1 - s]);
      record(e.a, e.b, e.sa, e.sb, e.date, idx);
      record(e.b, e.a, e.sb, e.sa, e.date, idx);
    }
    const snap2 = {};
    for (const n in played) snap2[n] = [get(n).r, get(n).rd];
    for (const n in played) {
      const [nr, nrd] = glickoBatch(snap2[n][0], snap2[n][1],
        played[n].map(([o, sc]) => [snap2[o][0], snap2[o][1], sc]));
      get(n).r = nr; get(n).rd = nrd;
    }
  }

  /* finalize: records, visible ratings, avgOpp, ranks */
  const players = Object.values(st).map((p) => ({
    name: p.name, glicko: p.r, rd: p.rd, rating: p.r - ENGINE.conservative * p.rd,
    matches: p.games, w: p.w, l: p.l, d: p.d,
    winPct: p.games ? roundHalfEven((p.w / p.games) * 100, 1) : 0,
    opponents: p.opps.size, avgOpp: 0,
    lastMatch: p.lastDate || '',
    provisional: !(p.games >= ENGINE.minMatches && p.opps.size >= ENGINE.minOpp),
    inactive: false,
  }));
  const gOf2 = {};
  players.forEach((p) => { gOf2[p.name] = p.glicko; });
  players.forEach((p) => {
    let sum = 0;
    st[p.name].opps.forEach((o) => { sum += gOf2[o] != null ? gOf2[o] : ENGINE.unratedR; });
    p.avgOpp = st[p.name].opps.size ? sum / st[p.name].opps.size : 0;
  });
  players.forEach((p) => {
    p.delta = p.rating - (BASELINE[p.name] != null ? BASELINE[p.name] : p.rating);
  });
  const now = Date.now();
  const graceEnd = Date.parse(ENGINE.graceStart + 'T00:00:00Z') + ENGINE.graceDays * DAY;
  const inactList = new Set([...(D.inactiveList || []), ...(overAll().inactive || [])]);
  players.forEach((p) => {
    p.inactive = inactList.has(p.name) || (p.lastMatch
      ? (now - Date.parse(p.lastMatch + 'T00:00:00Z')) > ENGINE.inactiveDays * DAY
      : now > graceEnd);
  });
  const qualified = players.filter((p) => !p.provisional).sort((a, b) => b.rating - a.rating);
  qualified.forEach((p, i) => { p.rank = i + 1; });
  players.sort((a, b) => b.rating - a.rating);
  const byName = {};
  players.forEach((p) => { byName[p.name] = p; });
  return { players, byName, qualified };
}

function rebuildState() {
  STATE = recalcAll();
  playerByName = STATE.byName;
  topOf = STATE.qualified;
}

/* ---------- router ---------- */
const pages = ['page-home', 'page-player', 'page-matches', 'page-roster',
               'page-analytics', 'page-method', 'page-admin'];

function route() {
  const h = location.hash || '#/';
  pages.forEach((id) => $('#' + id).classList.remove('active'));
  const base = '#/' + (h.split('/')[1] || '');
  $$('.nav a').forEach((a) => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === base || (h === '#/' && href === '#/'));
  });
  const glide = $('#nav-glide');
  const act = document.querySelector('.nav a.active');
  if (glide && act) {
    glide.style.width = act.offsetWidth + 'px';
    glide.style.transform = `translateX(${act.offsetLeft}px)`;
    glide.style.opacity = '1';
  } else if (glide) {
    glide.style.opacity = '0';
  }

  if (h.startsWith('#/player/')) {
    renderPlayer(unslug(h.slice('#/player/'.length)));
    $('#page-player').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  } else if (h === '#/matches') {
    renderMatches();
    $('#page-matches').classList.add('active');
    window.scrollTo(0, 0);
  } else if (h === '#/roster') {
    renderRoster();
    $('#page-roster').classList.add('active');
    window.scrollTo(0, 0);
  } else if (h === '#/analytics') {
    renderAnalytics();
    $('#page-analytics').classList.add('active');
    window.scrollTo(0, 0);
  } else if (h === '#/method') {
    renderMethod();
    $('#page-method').classList.add('active');
    window.scrollTo(0, 0);
  } else if (h === '#/admin') {
    renderAdmin();
    $('#page-admin').classList.add('active');
    window.scrollTo(0, 0);
  } else {
    renderHome();
    $('#page-home').classList.add('active');
    requestAnimationFrame(runHomeAnims);
  }
  observeReveals();
}
window.addEventListener('hashchange', route);

/* ---------- home ---------- */
function renderHome() {
  currentFilter = 'all';
  currentSort = { key: 'rank', dir: 1 };
  $$('.chip[data-filter]').forEach((c) => c.classList.toggle('on', c.dataset.filter === 'all'));
  $$('.sortable').forEach((s) => s.classList.remove('sorted', 'asc'));
  const sh = $('.sortable[data-key="rank"]');
  if (sh) sh.classList.add('sorted');
  const totalMatches = allMatches().length;
  const totalPlayers = STATE.players.length;
  const best = topOf[0];
  const avgRd = Math.round(topOf.reduce((s, p) => s + p.rd, 0) / topOf.length);
  $('#hero-matches').textContent = totalMatches;
  $('#stat-strip').innerHTML = `
    <div class="stat-card"><div class="k">Ranked players</div>
      <div class="v"><span class="cu" data-target="${topOf.length}">0</span><small>/ ${totalPlayers} total</small></div></div>
    <div class="stat-card"><div class="k">Matches logged</div>
      <div class="v"><span class="cu" data-target="${totalMatches}">0</span></div></div>
    <div class="stat-card"><div class="k">Highest rating</div>
      <div class="v"><span class="cu" data-target="${best.rating}" data-dec="1">0</span><small>${esc(best.name)}</small></div></div>
    <div class="stat-card"><div class="k">Avg certainty (RD)</div>
      <div class="v"><span class="cu" data-target="${avgRd}" data-dec="1">0</span><small>lower = surer</small></div></div>`;

  /* front line — top 5 cards */
  $('#fl-cards').innerHTML = topOf.slice(0, 5).map((p, i) => `
    <div class="fl-card r${i + 1}${i === 0 ? ' champ' : ''} reveal" data-goto="${esc(p.name)}">
      <div class="rd">RD ${p.rd.toFixed(0)}</div>
      ${rankBadge(p.rank)}
      ${i === 0 ? '<div class="champ-tag">#1 World</div>' : ''}
      <div class="nm">${esc(p.name)}</div>
      <div class="rating"><span class="big">${Math.round(p.rating)}</span><span class="unit">Glicko</span>${deltaTag(p)}</div>
      <div class="meta">
        <span><span class="w">${p.w}W</span> <span class="l">${p.l}L</span> ${p.d}D</span>
        <span style="margin-left:auto">${p.winPct}%</span>
      </div>
    </div>`).join('');

  /* ranks 6-10 compact rows */
  $('#fl-rows').innerHTML = topOf.slice(5, 10).map((p) => `
    <div class="fl-row reveal" data-goto="${esc(p.name)}">
      ${rankBadge(p.rank, 'sm')}
      <div class="nm">${esc(p.name)}</div>
      <div class="rating">${Math.round(p.rating)}${deltaTag(p)}</div>
      <div class="rec"><span class="w">${p.w}W</span> · <span class="l">${p.l}L</span> · ${p.d}D</div>
      <div class="pct">${p.winPct}%</div>
      <div class="go">›</div>
    </div>`).join('');

  renderLeaderboard();
  renderBattles();
}

function renderBattles() {
  const rows = allMatches().slice(0, 10);
  $('#battles-grid').innerHTML = rows.map((m) => {
    const aWin = m.sa > m.sb, bWin = m.sb > m.sa;
    return `
    <div class="battle-row reveal" data-goto="${esc(aWin ? m.a : m.b)}">
      <div class="who ${aWin ? 'win' : 'lose'}" data-goto="${esc(m.a)}">${esc(m.a)}</div>
      <div class="vs">vs</div>
      <div class="who r ${bWin ? 'win' : 'lose'}" data-goto="${esc(m.b)}">${esc(m.b)}</div>
      <div class="sc mono"><span class="${aWin ? 'win' : 'lose'}">${m.sa}</span> – <span class="${bWin ? 'win' : 'lose'}">${m.sb}</span></div>
      <div class="dt">${m.date || (m.admin && !m.published ? 'just now' : 'legacy')}</div>
    </div>`;
  }).join('');
}

function renderLeaderboard(filter = 'all', sortKey = 'rank', sortDir = 1) {
  const box = $('#lb-body');
  /* filter chips describe their own population — only the "all" view is
     scoped by the Qualified-only toggle (otherwise Provisional/Inactive
     would both filter an already-qualified list and look identical) */
  const scope = (filter === 'all' && qualOnly) ? topOf : STATE.players;
  let rows = scope.slice()
    .map((p) => ({ ...p, rank: p.rank != null ? p.rank : 9999 }));
  if (nameFilter) rows = rows.filter((p) => p.name.toLowerCase().includes(nameFilter));
  if (filter === 'provisional') rows = rows.filter((p) => (playerByName[p.name] || {}).provisional);
  else if (filter === 'inactive') rows = rows.filter((p) => (playerByName[p.name] || {}).inactive);
  else if (filter === 'veterans') rows = rows.filter((p) => p.matches >= 15);
  else if (filter === 'rising') rows = rows.filter((p) => p.winPct >= 60 && p.matches >= 5);

  rows.sort((a, b) => {
    const va = a[sortKey], vb = b[sortKey];
    return (typeof va === 'string' ? va.localeCompare(vb) : va - vb) * sortDir;
  });

  // FLIP: capture old positions
  const first = new Map();
  $$('.lb-row', box).forEach((el) => first.set(el.dataset.name, el.getBoundingClientRect().top));

  box.innerHTML = rows.map((p) => `
    <div class="lb-row ${p.rank <= 3 ? 'top' + p.rank : ''}" data-name="${esc(p.name)}" data-goto="${esc(p.name)}">
      <div class="rank">${p.rank <= topOf.length ? rankBadge(p.rank, 'sm') : '<div class="rank-badge sm">–</div>'}</div>
      <div class="name-cell"><div class="pname">${esc(p.name)}</div></div>
      <div class="rating-cell mono">${p.rating.toFixed(1)}${deltaTag(p)}</div>
      <div class="num-cell mono col-hide">${p.rd.toFixed(1)}</div>
      <div class="num-cell mono col-hide">${p.matches}</div>
      <div class="num-cell mono col-hide"><span class="w">${p.w}</span></div>
      <div class="num-cell mono col-hide"><span class="l">${p.l}</span></div>
      <div class="bar-cell">
        <div class="bar-track"><div class="bar-fill ${p.winPct >= 60 ? '' : (p.winPct >= 40 ? 'mid' : 'low')}" data-w="${p.winPct}"></div></div>
        <div class="pct mono">${p.winPct}%</div>
      </div>
      <div class="num-cell mono col-hide">${p.opponents}</div>
      <div class="num-cell mono col-hide">${p.avgOpp.toFixed(0)}</div>
      <div class="col-status">${statusTag(p.name)}</div>
      <div class="row-arrow">→</div>
    </div>`).join('') || `<div class="empty" style="padding:30px;text-align:center;color:var(--dim)">${
        filter === 'inactive'
          ? 'Nobody is inactive right now — a player goes inactive 365 days after their last match (or when flagged in the master sheet).'
          : filter === 'provisional'
            ? 'No provisional players right now.'
            : 'No players match this filter.'}</div>`;

  // FLIP: play
  requestAnimationFrame(() => {
    $$('.lb-row', box).forEach((el) => {
      const prev = first.get(el.dataset.name);
      const now = el.getBoundingClientRect().top;
      if (prev !== undefined && Math.abs(prev - now) > 1) {
        el.style.transform = `translateY(${prev - now}px)`;
        el.style.transition = 'none';
        requestAnimationFrame(() => {
          el.style.transition = 'transform .5s cubic-bezier(.22,.8,.24,1)';
          el.style.transform = '';
        });
      }
    });
    $$('.bar-fill', box).forEach((b) => { b.style.width = b.dataset.w + '%'; });
  });
}

let currentFilter = 'all';
let currentSort = { key: 'rank', dir: 1 };
let nameFilter = '';
let qualOnly = true;

function runHomeAnims() {
  $$('#stat-strip .cu').forEach((el) =>
    countUp(el, parseFloat(el.dataset.target), { dec: parseInt(el.dataset.dec || 0) }));
  $$('.bar-fill').forEach((b) => { b.style.width = b.dataset.w + '%'; });
}

/* leaderboard controls */
$('#lb-qual').addEventListener('click', () => {
  qualOnly = !qualOnly;
  $('#lb-qual').classList.toggle('on', qualOnly);
  renderLeaderboard(currentFilter, currentSort.key, currentSort.dir);
});
$('#lb-filter').addEventListener('input', (e) => {
  nameFilter = e.target.value.trim().toLowerCase();
  renderLeaderboard(currentFilter, currentSort.key, currentSort.dir);
});

document.addEventListener('click', (e) => {
  const chip = e.target.closest('.chip');
  if (chip && chip.dataset.filter) {
    $$('.chip[data-filter]').forEach((c) => c.classList.remove('on'));
    chip.classList.add('on');
    currentFilter = chip.dataset.filter;
    renderLeaderboard(currentFilter, currentSort.key, currentSort.dir);
    return;
  }
  const so = e.target.closest('.sortable');
  if (so) {
    const key = so.dataset.key;
    currentSort.dir = currentSort.key === key ? -currentSort.dir : 1;
    currentSort.key = key;
    $$('.sortable').forEach((s) => s.classList.remove('sorted', 'asc'));
    so.classList.add('sorted');
    if (currentSort.dir === 1) so.classList.add('asc');
    renderLeaderboard(currentFilter, currentSort.key, currentSort.dir);
    return;
  }
  const go = e.target.closest('[data-goto]');
  if (go) {
    e.stopPropagation();
    location.hash = '#/player/' + slug(go.dataset.goto);
  }
});

/* ---------- player page ---------- */
function renderPlayer(name) {
  const p = playerByName[name];
  const el = $('#page-player');
  if (!p) {
    el.innerHTML = `<div class="wrap"><div class="panel"><div class="empty">
      No player called "<b>${esc(name)}</b>" found. <a href="#/" style="color:var(--gold)">Back to the leaderboard</a>.
    </div></div></div>`;
    return;
  }
  const q = topOf.find((x) => x.name === name);
  const hist = histOf(name);
  const recent = hist.slice(0, 10);
  const h2h = h2hOf(name);
  const seed = seedOf(name);
  const rdPct = Math.max(3, Math.min(100, 100 - (p.rd / 120) * 100));

  el.innerHTML = `
  <div class="wrap">
    <a class="back-link" href="#/">← All rankings</a>
    <div class="player-hero anim">
      <div class="player-top">
        ${q ? rankBadge(q.rank, 'lg') : `<div class="rank-badge lg"><span class="num">–</span></div>`}
        <div>
          <div class="player-name">${esc(p.name)}</div>
          <div class="player-rankline">
            ${q ? `Ranked <b>#${q.rank}</b> of ${topOf.length} qualified players` : 'Unranked — not enough recent games for the board'}
            ${seed != null ? ` · seeded from an original rating of <b>${seed}</b>` : ''}
            ${p.provisional ? ' · <span class="tag prov">provisional</span>' : ''}
            ${p.inactive ? ' · <span class="tag inact">inactive</span>' : ''}
          </div>
        </div>
        <div class="player-rating-block">
          <div class="lbl">Visible rating</div>
          <div class="big mono" id="pv-rating">0</div>
          ${deltaTag(p)}
          <div class="rd-bar">
            <div class="bar-track"><div class="bar-fill" style="width:${rdPct}%"></div></div>
            <div class="caption"><span>certainty</span><span class="mono">RD ${p.rd.toFixed(1)}</span></div>
          </div>
        </div>
      </div>
      <div class="pstat-grid">
        <div class="pstat"><div class="k">Glicko</div><div class="v mono">${p.glicko.toFixed(1)}</div></div>
        <div class="pstat"><div class="k">Matches</div><div class="v mono">${p.matches}</div></div>
        <div class="pstat"><div class="k">Record</div><div class="v mono" style="font-size:19px"><span style="color:var(--green)">${p.w}W</span> <span style="color:var(--red)">${p.l}L</span> <span style="color:var(--dim)">${p.d}D</span></div></div>
        <div class="pstat"><div class="k">Win rate</div><div class="v mono">${p.winPct}%</div></div>
        <div class="pstat"><div class="k">Opponents</div><div class="v mono">${p.opponents}</div></div>
        <div class="pstat"><div class="k">Avg opp rating</div><div class="v mono">${p.avgOpp.toFixed(1)}</div></div>
      </div>
    </div>

    <div class="panel reveal">
      <h3>Recent form <span class="n">— last ${Math.min(10, hist.length)}</span></h3>
      <div class="form-strip">
        ${recent.map((m, i) => `<div class="form-pill ${m.res}" style="animation-delay:${i * 55}ms"
           title="vs ${esc(m.opp)} ${m.for_}-${m.against}">${m.res}</div>`).join('') || '<span class="empty">No games yet</span>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Match history <span class="n">— ${hist.length} games</span></h3>
      <div class="match-list">
        ${hist.map((m) => `
          <div class="match-row">
            <div class="res-chip ${m.res}">${m.res}</div>
            <div class="who">${esc(p.name)}</div>
            <div class="score mono">${m.for_} – ${m.against}</div>
            <div class="who opp"><a href="#/player/${slug(m.opp)}" style="color:var(--blue)">${esc(m.opp)}</a></div>
            <div class="date mono">${m.date || 'legacy'}</div>
          </div>`).join('') || '<div class="empty">No games recorded</div>'}
      </div>
    </div>

    <div class="panel reveal">
      <h3>Head to head <span class="n">— ${h2h.length} opponents</span></h3>
      <div class="h2h-grid">
        ${h2h.map((h) => `
          <div class="h2h-card" data-goto="${esc(h.opp)}">
            <div class="opp">${esc(h.opp)}</div>
            <div class="rec mono"><span class="w">${h.w}W</span> · <span class="l">${h.l}L</span> · <span>${h.d}D</span> · ${h.pf}-${h.pa} pts</div>
          </div>`).join('') || '<div class="empty">No games recorded</div>'}
      </div>
    </div>
  </div>`;

  countUp($('#pv-rating'), p.rating, { dec: 1, dur: 900 });
  observeReveals();
}

/* ---------- matches page ---------- */
function renderMatches() {
  const box = $('#gm-body');
  const rows = allMatches();
  $('#gm-count').textContent = `— ${rows.length} games`;
  box.innerHTML = rows.map((m) => {
    const aWin = m.sa > m.sb, bWin = m.sb > m.sa;
    return `
    <div class="gm-row">
      <div class="side ${aWin ? 'winner' : 'loser'}">
        <div class="dot ${aWin ? 'w' : 'l'}"></div>
        <div class="nm" data-goto="${esc(m.a)}">${esc(m.a)}</div>
      </div>
      <div class="sc mono" style="color:${aWin ? 'var(--green)' : 'var(--red)'}">${m.sa}</div>
      <div class="dash mono">–</div>
      <div class="sc mono" style="color:${bWin ? 'var(--green)' : 'var(--red)'}">${m.sb}</div>
      <div class="side right ${bWin ? 'winner' : 'loser'}">
        <div class="dot ${bWin ? 'w' : 'l'}"></div>
        <div class="nm" data-goto="${esc(m.b)}">${esc(m.b)}</div>
      </div>
      <div class="dt mono">${m.admin && !m.published ? '<span class="tag fresh">new</span>' : (m.date || 'legacy')}</div>
    </div>`;
  }).join('');
}

/* ---------- roster page ---------- */
function renderRoster() {
  const prov = STATE.players
    .filter((p) => p.provisional)
    .sort((a, b) => b.rating - a.rating);
  $('#roster-grid').innerHTML = prov.map((p) => {
    const pct = Math.min(100, Math.round(
      (Math.min(1, p.matches / 5) * 50 + Math.min(1, p.opponents / 3) * 50)));
    return `
    <div class="roster-card reveal" data-goto="${esc(p.name)}">
      <div class="top">
        <div class="nm">${esc(p.name)}</div>
        <svg class="shield" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 3v5c0 4.6-2.9 8.4-7 10-4.1-1.6-7-5.4-7-10V6l7-3Z"/></svg>
      </div>
      <div class="rating"><span class="big">${Math.round(p.rating)}</span><span class="unit">Glicko</span></div>
      <div class="req-row"><span>Matches</span><span class="${p.matches >= 5 ? 'ok' : ''}">${p.matches} / 5 ${p.matches >= 5 ? '✓' : ''}</span></div>
      <div class="req-row"><span>Opponents</span><span class="${p.opponents >= 3 ? 'ok' : ''}">${p.opponents} / 3 ${p.opponents >= 3 ? '✓' : ''}</span></div>
      <div class="prog-track"><div class="prog-fill" data-w="${pct}"></div></div>
      <div class="prog-label">${pct}% to qualified</div>
    </div>`;
  }).join('');
  requestAnimationFrame(() =>
    $$('#roster-grid .prog-fill').forEach((b) => { b.style.width = b.dataset.w + '%'; }));
}

/* ---------- analytics page ---------- */
function renderAnalytics() {
  const all = STATE.players;
  const byWin = all.filter((p) => p.matches >= 5).sort((a, b) => b.winPct - a.winPct).slice(0, 10);
  const byActive = all.slice().sort((a, b) => b.matches - a.matches).slice(0, 10);

  /* biggest upsets: wins by the lower-rated side */
  const upsets = [];
  allMatches().forEach((m) => {
    const A = playerByName[m.a], B = playerByName[m.b];
    if (!A || !B) return;
    const diff = A.rating - B.rating;
    if (m.sa === m.sb) return;
    const winner = m.sa > m.sb ? m.a : m.b;
    const gap = Math.abs(diff);
    if ((diff < 0 && winner === m.a) || (diff > 0 && winner === m.b)) {
      upsets.push({ winner, loser: winner === m.a ? m.b : m.a, gap,
                    score: winner === m.a ? `${m.sa}-${m.sb}` : `${m.sb}-${m.sa}` });
    }
  });
  upsets.sort((x, y) => y.gap - x.gap);

  /* most contested rivalries */
  const rivs = {};
  allMatches().forEach((m) => {
    const k = [m.a, m.b].sort().join(' vs ');
    rivs[k] = (rivs[k] || 0) + 1;
  });
  const rivalry = Object.entries(rivs).sort((a, b) => b[1] - a[1]).slice(0, 10);

  /* rating distribution histogram + matches-played bars */
  const ratings = all.map((p) => p.rating);
  const rMin = Math.min(...ratings), rMax = Math.max(...ratings);
  const B = 12, span = (rMax - rMin) / B || 1;
  const buckets = Array.from({ length: B }, () => 0);
  ratings.forEach((r) => { buckets[Math.min(B - 1, Math.max(0, Math.floor((r - rMin) / span)))]++; });
  const peak = Math.max(...buckets, 1);
  const histHTML = buckets.map((n, i) => `
    <div class="hcol" title="${n} player${n === 1 ? '' : 's'} near ${Math.round(rMin + i * span)}">
      <div class="hbar" data-h="${Math.round((n / peak) * 100)}"></div>
      <div class="hlbl">${Math.round(rMin + i * span)}</div>
    </div>`).join('');
  const mMax = Math.max(...byActive.map((r) => r.matches), 1);
  const matchBarsHTML = byActive.slice(0, 8).map((r) => `
    <div class="mrow reveal" data-goto="${esc(r.name)}">
      <div class="nm">${esc(r.name)}</div>
      <div class="mtrack"><div class="abar" data-w="${Math.round((r.matches / mMax) * 100)}"></div></div>
      <div class="val mono">${r.matches}</div>
    </div>`).join('');

  const list = (rows, val, unit) => rows.map((r, i) => `
    <div class="an-row reveal" data-goto="${esc(r.name)}">
      <div class="idx mono">${i + 1}</div>
      <div class="nm">${esc(r.name)}</div>
      <div class="val mono">${val(r)}</div>
      <div class="unit mono">${unit(r)}</div>
    </div>`).join('');

  $('#an-grid').innerHTML = `
    <div class="an-panel">
      <div class="head"><h3>Top win rate</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 17l6-6 4 4 8-8" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 7h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      ${list(byWin, (r) => r.winPct + '%', (r) => r.matches + ' matches')}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most active</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke-linejoin="round"/></svg>
      </div>
      ${list(byActive, (r) => r.matches, (r) => 'matches')}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Biggest upsets</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 3c1.5 3.5-1 5.5-1 7.5a3 3 0 0 0 6 0c0-1-.3-2-1-3 3 2.5 4 5 4 7.5a7 7 0 1 1-14 0c0-5 4-7.5 6-12Z" stroke-linejoin="round"/></svg>
      </div>
      ${upsets.length ? upsets.slice(0, 8).map((u, i) => `
        <div class="an-row reveal" data-goto="${esc(u.winner)}">
          <div class="idx mono">${i + 1}</div>
          <div class="nm">${esc(u.winner)} <span style="color:var(--dimmer);font-weight:500">def.</span> ${esc(u.loser)}</div>
          <div class="val mono">${u.score}</div>
          <div class="unit mono">+${Math.round(u.gap)} pts</div>
        </div>`).join('') : '<div class="empty">No upsets on record</div>'}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Most contested rivalries</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 5h4v4H5zM15 5h4v4h-4zM5 15h4v4H5zM15 15h4v4h-4zM9 7h6M7 9v6M17 9v6M9 17h6" stroke-linecap="round"/></svg>
      </div>
      ${rivalry.map(([pair, n], i) => `
        <div class="an-row reveal">
          <div class="idx mono">${i + 1}</div>
          <div class="nm">${esc(pair.replace(' vs ', ' <span style="color:var(--dimmer);font-weight:500">vs</span> '))}</div>
          <div class="val mono">${n}</div>
          <div class="unit mono">meetings</div>
        </div>`).join('')}
    </div>
    <div class="an-panel">
      <div class="head"><h3>Rating distribution</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 20V10M10 20V4M16 20v-8M2 20h20" stroke-linecap="round"/></svg>
      </div>
      <div class="hist">${histHTML}</div>
    </div>
    <div class="an-panel">
      <div class="head"><h3>Matches played</h3>
        <svg class="ico" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4v5M12 15v5" stroke-linecap="round"/></svg>
      </div>
      ${matchBarsHTML}
    </div>`;
  const growBars = () => {
    $$('#an-grid .hbar').forEach((b) => { b.style.height = b.dataset.h + '%'; });
    $$('#an-grid .abar').forEach((b) => { b.style.width = b.dataset.w + '%'; });
  };
  requestAnimationFrame(growBars);
  setTimeout(growBars, 140);
  observeReveals();
}

/* ---------- method page ---------- */
function renderMethod() {
  $('#settings-body').innerHTML = effectiveSettings().map((s) => `
    <tr><td><b>${esc(s.name)}</b><div style="color:var(--dimmer);font-size:12.5px">${esc(s.desc)}</div></td>
        <td class="val">${esc(String(s.value))}</td></tr>`).join('');
}

/* ---------- admin portal ---------- */
function renderAdmin() {
  const wrap = $('#admin-wrap');
  const unlocked = sessionStorage.getItem(ADMIN_UNLOCK) === '1';
  if (!unlocked) {
    wrap.innerHTML = `
    <div class="admin-gate">
      <div class="admin-card">
        <div class="lock">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
        </div>
        <h2>Admin portal</h2>
        <div class="sub">Restricted access. Owners only.</div>
        <label for="admin-pw">Password</label>
        <input id="admin-pw" type="password" autocomplete="off">
        <button class="btn btn-primary" id="admin-auth">-) Authenticate</button>
      </div>
    </div>`;
    const tryAuth = () => {
      const v = $('#admin-pw').value;
      if (v === 'REDACTED') {
        sessionStorage.setItem(ADMIN_UNLOCK, '1');
        renderAdmin();
        toast('Welcome back, commander.');
      } else {
        $('#admin-pw').style.borderColor = 'var(--red)';
        toast('Wrong password.');
      }
    };
    $('#admin-auth').addEventListener('click', tryAuth);
    $('#admin-pw').addEventListener('keydown', (e) => { if (e.key === 'Enter') tryAuth(); });
    return;
  }

  const log = logGet();
  const pubCount = pubMatches().length;
  const O = overAll();
  const trashSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const aliasRows = Object.entries(O.aliases).map(([a, b]) => `
    <div class="log-item">
      <div class="txt"><b>${esc(a)}</b> → <b>${esc(b)}</b>${O.aliasNotes && O.aliasNotes[a] ? ` <span style="color:var(--dimmer)">— ${esc(O.aliasNotes[a])}</span>` : ''}</div>
      <button class="icon-btn" data-alias-del="${esc(a)}" title="Remove name fix">${trashSvg}</button>
    </div>`).join('') || '<div class="empty">No name fixes yet.</div>';
  const inactRows = O.inactive.map((n) => `
    <div class="log-item">
      <div class="txt"><b>${esc(n)}</b> <span style="color:var(--dimmer)">— inactive</span></div>
      <button class="icon-btn" data-inact-del="${esc(n)}" title="Mark active again">${trashSvg}</button>
    </div>`).join('') || '<div class="empty">Nobody marked inactive.</div>';
  const seedRows = Object.keys({ ...(O.seeds || {}), ...(O.seedGlicko || {}), ...(O.seedRd || {}) }).map((n) => `
    <div class="log-item">
      <div class="txt"><b>${esc(n)}</b> · <span style="color:var(--dimmer)">old</span> <b class="mono">${esc(String((O.seeds || {})[n] != null ? (O.seeds || {})[n] : '—'))}</b>${(O.seedGlicko || {})[n] != null ? ` · <span style="color:var(--dimmer)">glicko</span> <b class="mono">${esc(String(O.seedGlicko[n]))}</b>` : ''}${(O.seedRd || {})[n] != null ? ` · <span style="color:var(--dimmer)">rd</span> <b class="mono">${esc(String(O.seedRd[n]))}</b>` : ''}</div>
      <button class="icon-btn" data-seed-del="${esc(n)}" title="Remove seed">${trashSvg}</button>
    </div>`).join('') || '<div class="empty">No seed overrides — players start from the sheet values.</div>';
  const settingRows = effectiveSettings().map((s) => `
    <div class="set-row">
      <div class="lbl"><b>${esc(s.name)}</b><div class="d">${esc(String(s.desc || ''))}</div></div>
      <input class="set-val mono" data-set-name="${esc(s.name)}" value="${esc(String(s.value))}">
    </div>`).join('');
  const matchRows = (q) => {
    const ql = (q || '').trim().toLowerCase();
    const list = allMatches().filter((m) =>
      !ql || m.a.toLowerCase().includes(ql) || m.b.toLowerCase().includes(ql)).slice(0, 20);
    return list.map((m) => `
      <div class="log-item fix-row" data-mkey="${m.key}">
        <div class="txt"><b>${esc(m.a)}</b> <span style="color:var(--dimmer)">vs</span> <b>${esc(m.b)}</b>${m.date ? '' : ' <span class="tag legacy">legacy</span>'}</div>
        <input class="mono" data-f="sa" type="number" min="0" value="${m.sa}" title="Score 1">
        <input class="mono" data-f="sb" type="number" min="0" value="${m.sb}" title="Score 2">
        <input data-f="date" type="date" value="${m.date || ''}" title="Match date">
        <button class="icon-btn" data-msave="${m.key}" title="Save fix"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 12l6 6L20 6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <button class="icon-btn" data-mdel="${m.key}" title="Delete match">${trashSvg}</button>
      </div>`).join('') || '<div class="empty">No matches found.</div>';
  };
  wrap.innerHTML = `
  <div class="admin-bar anim">
    <div class="title"><span>●</span> Admin console</div>
    <div class="spacer"></div>
    <button class="btn btn-primary" id="admin-publish" style="width:auto;margin:0">↑ Publish to everyone</button>
    <button class="btn btn-ghost" id="admin-export">Export log</button>
    <button class="btn btn-danger" id="admin-lock">Lock</button>
  </div>

  <div class="admin-grid anim">
    <div class="panel" style="margin:0">
      <h3>Log a <span class="n">match</span></h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Player 1</label>
          <input id="adm-a" list="player-list" placeholder="e.g. Kobi" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Player 2</label>
          <input id="adm-b" list="player-list" placeholder="e.g. Slayer" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Score 1</label>
          <input id="adm-sa" type="number" min="0" placeholder="15">
        </div>
        <div class="form-field">
          <label>Score 2</label>
          <input id="adm-sb" type="number" min="0" placeholder="12">
        </div>
        <div class="form-field full">
          <label>Match date</label>
          <input id="adm-date" type="date">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="adm-add" style="margin-top:6px">+) Add to log</button>
        </div>
      </div>
      <div class="form-note" style="margin-top:14px">
        Logged matches feed the same Dynamic Glicko engine as the official sheet —
        ratings, ranks, records and head-to-heads recalculate instantly here.
        Hit <b style="color:var(--gold)">Publish to everyone</b> to push the log to
        the site so every visitor sees it (needs a GitHub token with Contents:write
        on the site repo — kept only in this tab). Use <b>Customize everything</b>
        below to fix names, dates, seeds, settings or any past match.
      </div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Pending <span class="n">log</span> — ${log.length} local · ${pubCount} published</h3>
      <div class="log-list" id="adm-list">
        ${log.length ? log.map((e, i) => `
          <div class="log-item">
            <div class="txt"><b>${esc(e.a)}</b> ${e.sa}–${e.sb} <b>${esc(e.b)}</b></div>
            <div class="txt" style="color:var(--dimmer)">${esc(e.date || '')}</div>
            <button class="icon-btn" data-del="${i}" title="Remove">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 7h14M10 11v6M14 11v6M8 7l1-3h6l1 3M7 7l1 13h8l1-13" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>`).join('') : '<div class="empty">Nothing pending — the log is clean.</div>'}
      </div>
    </div>
  </div>

  <div class="admin-bar anim" style="margin-top:22px">
    <div class="title"><span>●</span> Customize everything</div>
    <div class="spacer"></div>
    <div class="form-note" style="margin:0">Everything the master sheet can do — names, inactive, seeds, settings, match fixes & dates. Changes apply live here; <b style="color:var(--gold)">Publish to everyone</b> makes them public.</div>
  </div>

  <div class="admin-grid anim">
    <div class="panel" style="margin:0">
      <h3>Fix <span class="n">names</span> & merge players</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Name as written</label>
          <input id="ov-alias-a" placeholder="e.g. sneakyonyxdragon" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Correct player</label>
          <input id="ov-alias-b" list="player-list" placeholder="e.g. _Eddie_" autocomplete="off">
        </div>
        <div class="form-field full">
          <label>Note (optional)</label>
          <input id="ov-alias-note" placeholder="e.g. same person, alt account" autocomplete="off">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="ov-alias-add" style="margin-top:6px">+) Save name fix</button>
        </div>
      </div>
      <div class="log-list" id="ov-alias-list" style="margin-top:12px">${aliasRows}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Active / <span class="n">inactive</span></h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Player</label>
          <input id="ov-inact-n" list="player-list" placeholder="e.g. Warren" autocomplete="off">
        </div>
        <div class="form-field">
          <label>&nbsp;</label>
          <button class="btn btn-primary" id="ov-inact-toggle">Toggle inactive</button>
        </div>
      </div>
      <div class="log-list" id="ov-inact-list" style="margin-top:12px">${inactRows}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Start <span class="n">ratings</span> (seeds)</h3>
      <div class="form-grid">
        <div class="form-field">
          <label>Player</label>
          <input id="ov-seed-n" list="player-list" autocomplete="off">
        </div>
        <div class="form-field">
          <label>Old 0–100 rating</label>
          <input id="ov-seed-v" type="number" step="0.5" placeholder="90">
        </div>
        <div class="form-field">
          <label>Starting Glicko <span style="color:var(--dimmer)">(opt)</span></label>
          <input id="ov-seed-g" type="number" step="1" placeholder="auto">
        </div>
        <div class="form-field">
          <label>Starting RD <span style="color:var(--dimmer)">(opt)</span></label>
          <input id="ov-seed-rd" type="number" step="1" placeholder="auto">
        </div>
        <div class="form-field full">
          <button class="btn btn-primary" id="ov-seed-add" style="margin-top:6px">+) Save seed</button>
        </div>
      </div>
      <div class="log-list" id="ov-seed-list" style="margin-top:12px">${seedRows}</div>
    </div>

    <div class="panel" style="margin:0">
      <h3>Model <span class="n">settings</span></h3>
      <div id="ov-settings">${settingRows}</div>
      <button class="btn btn-ghost" id="ov-set-reset" style="margin-top:12px">Reset to sheet values</button>
    </div>

    <div class="panel" style="margin:0;grid-column:1/-1">
      <h3>Fix or delete <span class="n">any match</span></h3>
      <div class="form-note" style="margin:0 0 10px">Search a player, then fix scores, set or fix the date, or delete the match. Ratings recalculate instantly.</div>
      <input id="ov-mq" placeholder="Search a player to find their matches…" autocomplete="off" style="width:100%">
      <div class="fix-row" style="margin-top:12px;opacity:.5">
        <div class="txt" style="font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--dimmer)">Players</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Score</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Score</div>
        <div style="font-size:8px;letter-spacing:.1em;text-transform:uppercase;color:var(--dimmer)">Date</div>
        <div></div><div></div>
      </div>
      <div class="log-list" id="ov-mresults"><div class="empty">Search to edit scores, dates, or delete a match.</div></div>
    </div>
  </div>

  <datalist id="player-list">${STATE.players.map((p) => `<option value="${esc(p.name)}">`).join('')}</datalist>`;

  $('#admin-lock').addEventListener('click', () => {
    sessionStorage.removeItem(ADMIN_UNLOCK);
    renderAdmin();
  });
  $('#admin-publish').addEventListener('click', publishLog);

  async function publishLog() {
    let token = sessionStorage.getItem('gh_pub_tok') || '';
    if (!token) {
      token = (window.prompt(`Paste a GitHub token with Contents:write access to ${SITE_REPO} (create one at github.com/settings/tokens):`) || '').trim();
      if (!token) { toast('Publish cancelled.'); return; }
      sessionStorage.setItem('gh_pub_tok', token);
    }
    /* flatten: bake pending/edited entries into one published list; keep only
       archive fixes (a:*) as ongoing overrides */
    const doc = overAll();
    const keepEdits = {}, keepRemoved = [];
    for (const [k, v] of Object.entries(doc.matchEdits || {})) if (k.startsWith('a:')) keepEdits[k] = v;
    for (const k of (doc.matchRemoved || [])) if (k.startsWith('a:')) keepRemoved.push(k);
    const merged = allMatches().filter((m) => m.admin)
      .map((e) => ({ a: e.a, b: e.b, sa: e.sa, sb: e.sb, date: e.date || '' }));
    const pubDoc = {
      matches: merged,
      aliases: doc.aliases || {},
      aliasNotes: doc.aliasNotes || {},
      inactive: doc.inactive || [],
      seeds: doc.seeds || {},
      seedGlicko: doc.seedGlicko || {},
      seedRd: doc.seedRd || {},
      settings: doc.settings || {},
      matchEdits: keepEdits,
      matchRemoved: keepRemoved,
    };
    const content = '/* Published site data — committed by the admin console ("Publish to everyone").\n   matches = shared match log (newest first). aliases = name fixes / merges.\n   inactive = manually inactive players. seeds = start rating overrides.\n   settings = model overrides. matchEdits/matchRemoved = archive fixes.\n   The Glicko engine recalculates every rating from these at page load. */\nwindow.LB_PUB = ' + JSON.stringify(pubDoc, null, 2) + ';\nwindow.LB_LOG = window.LB_PUB.matches;\n';
    const b64 = btoa(String.fromCharCode(...new TextEncoder().encode(content)));
    const hdrs = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' };
    const apiUrl = `https://api.github.com/repos/${SITE_REPO}/contents/log.js`;
    try {
      const g = await fetch(apiUrl, { headers: hdrs });
      const sha = g.ok ? (await g.json()).sha : undefined;
      const r = await fetch(apiUrl, {
        method: 'PUT', headers: { ...hdrs, 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Publish match log (${merged.length} matches)`, content: b64, ...(sha ? { sha } : {}), branch: 'main' }),
      });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        if (r.status === 401) sessionStorage.removeItem('gh_pub_tok');
        toast('Publish failed: ' + (err.message || ('HTTP ' + r.status)));
        return;
      }
      window.LB_PUB = pubDoc;
      window.LB_LOG = merged;
      logSet([]);
      overSet({});
      rebuildState();
      renderAdmin();
      toast('Published! Everyone sees it on their next visit.');
    } catch (err) {
      toast('Publish failed: network error.');
    }
  }
  $('#admin-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(logGet(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'match-log.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast('Log exported.');
  });
  $('#adm-add').addEventListener('click', () => {
    const a = $('#adm-a').value.trim(), b = $('#adm-b').value.trim();
    const sa = parseInt($('#adm-sa').value, 10), sb = parseInt($('#adm-sb').value, 10);
    if (!a || !b || a.toLowerCase() === b.toLowerCase() ||
        !Number.isFinite(sa) || !Number.isFinite(sb)) {
      toast('Fill in both players and scores.');
      return;
    }
    const arr = logGet();
    arr.unshift({ a, b, sa, sb, date: $('#adm-date') ? ($('#adm-date').value || new Date().toISOString().slice(0, 10)) : new Date().toISOString().slice(0, 10) });
    logSet(arr);
    rebuildState();
    renderAdmin();
    toast(`${a} ${sa}–${sb} ${b} added — site recalculated live.`);
  });
  $('#adm-list').addEventListener('click', (e) => {
    const del = e.target.closest('[data-del]');
    if (!del) return;
    const arr = logGet();
    arr.splice(parseInt(del.dataset.del, 10), 1);
    logSet(arr);
    rebuildState();
    renderAdmin();
  });

  /* ---- customize: names & merges ---- */
  $('#ov-alias-add').addEventListener('click', () => {
    const a = $('#ov-alias-a').value.trim(), b = $('#ov-alias-b').value.trim();
    const note = ($('#ov-alias-note') || {}).value.trim();
    if (!a || !b) { toast('Fill both: the wrong name and the correct player.'); return; }
    const loc = overGet();
    overSet({ ...loc,
      aliases: { ...(loc.aliases || {}), [a]: b },
      aliasNotes: note ? { ...(loc.aliasNotes || {}), [a]: note } : (loc.aliasNotes || {}) });
    rebuildState(); renderAdmin();
    toast(`Name fix saved — "${a}" now counts as ${b}.`);
  });
  $('#ov-alias-list').addEventListener('click', (e) => {
    const del = e.target.closest('[data-alias-del]');
    if (!del) return;
    const loc = overGet();
    const al = { ...(loc.aliases || {}) };
    const nt = { ...(loc.aliasNotes || {}) };
    delete al[del.dataset.aliasDel]; delete nt[del.dataset.aliasDel];
    overSet({ ...loc, aliases: al, aliasNotes: nt });
    rebuildState(); renderAdmin();
  });

  /* ---- customize: active / inactive ---- */
  $('#ov-inact-toggle').addEventListener('click', () => {
    const n = $('#ov-inact-n').value.trim();
    if (!n) { toast('Type a player name first.'); return; }
    const loc = overGet();
    const cur = overAll().inactive || [];
    const next = cur.includes(n) ? cur.filter((x) => x !== n) : [...cur, n];
    overSet({ ...loc, inactive: next });
    rebuildState(); renderAdmin();
    toast(next.includes(n) ? `${n} marked inactive.` : `${n} marked active again.`);
  });
  $('#ov-inact-list').addEventListener('click', (e) => {
    const del = e.target.closest('[data-inact-del]');
    if (!del) return;
    const loc = overGet();
    overSet({ ...loc, inactive: (overAll().inactive || []).filter((x) => x !== del.dataset.inactDel) });
    rebuildState(); renderAdmin();
  });

  /* ---- customize: start ratings ---- */
  $('#ov-seed-add').addEventListener('click', () => {
    const n = $('#ov-seed-n').value.trim();
    const v = $('#ov-seed-v').value.trim();
    const g = $('#ov-seed-g').value.trim();
    const rd = $('#ov-seed-rd').value.trim();
    if (!n) { toast('Pick a player first.'); return; }
    if (v === '' && g === '' && rd === '') { toast('Enter an Old 0–100 rating, or a Starting Glicko / RD.'); return; }
    const loc = overGet();
    const seeds = { ...(loc.seeds || {}) }, seedGlicko = { ...(loc.seedGlicko || {}) }, seedRd = { ...(loc.seedRd || {}) };
    if (v !== '' && Number.isFinite(Number(v))) seeds[n] = Number(v); else delete seeds[n];
    if (g !== '' && Number.isFinite(Number(g))) seedGlicko[n] = Number(g); else delete seedGlicko[n];
    if (rd !== '' && Number.isFinite(Number(rd))) seedRd[n] = Number(rd); else delete seedRd[n];
    overSet({ ...loc, seeds, seedGlicko, seedRd });
    rebuildState(); renderAdmin();
    toast(`Seed saved for ${n}.`);
  });
  $('#ov-seed-list').addEventListener('click', (e) => {
    const del = e.target.closest('[data-seed-del]');
    if (!del) return;
    const key = del.dataset.seedDel;
    const loc = overGet();
    const sd = { ...(loc.seeds || {}) }; delete sd[key];
    const sg = { ...(loc.seedGlicko || {}) }; delete sg[key];
    const sr = { ...(loc.seedRd || {}) }; delete sr[key];
    overSet({ ...loc, seeds: sd, seedGlicko: sg, seedRd: sr });
    rebuildState(); renderAdmin();
  });

  /* ---- customize: model settings ---- */
  $('#ov-settings').addEventListener('change', (e) => {
    const inp = e.target.closest('[data-set-name]');
    if (!inp) return;
    const loc = overGet();
    overSet({ ...loc, settings: { ...(loc.settings || {}), [inp.dataset.setName]: inp.value } });
    rebuildState(); renderAdmin();
    toast('Setting applied — everything recalculated.');
  });
  $('#ov-set-reset').addEventListener('click', () => {
    const loc = overGet();
    overSet({ ...loc, settings: {} });
    rebuildState(); renderAdmin();
    toast('Settings back to the master sheet values.');
  });

  /* ---- customize: match fixes ---- */
  $('#ov-mq').addEventListener('input', () => {
    $('#ov-mresults').innerHTML = matchRows($('#ov-mq').value);
  });
  $('#ov-mresults').addEventListener('click', (e) => {
    const save = e.target.closest('[data-msave]');
    const del = e.target.closest('[data-mdel]');
    if (save) {
      const row = save.closest('[data-mkey]');
      const key = row.dataset.mkey;
      const g = (f) => row.querySelector(`[data-f="${f}"]`).value;
      const loc = overGet();
      overSet({ ...loc, matchEdits: { ...(loc.matchEdits || {}), [key]: { sa: +g('sa'), sb: +g('sb'), date: g('date') } } });
      rebuildState();
      $('#ov-mresults').innerHTML = matchRows($('#ov-mq').value);
      toast('Match fixed — ratings recalculated.');
    } else if (del) {
      const key = del.dataset.mdel;
      const loc = overGet();
      overSet({ ...loc, matchRemoved: [...new Set([...(loc.matchRemoved || []), key])] });
      rebuildState();
      $('#ov-mresults').innerHTML = matchRows($('#ov-mq').value);
      toast('Match deleted — ratings recalculated.');
    }
  });
}

/* ---------- search ---------- */
$('#search').addEventListener('input', (e) => {
  const v = e.target.value.trim().toLowerCase();
  const drop = $('#search-drop');
  if (!v) { drop.classList.remove('show'); return; }
  const hits = STATE.players.filter((p) => p.name.toLowerCase().includes(v)).slice(0, 8);
  if (!hits.length) { drop.classList.remove('show'); return; }
  drop.innerHTML = hits.map((p) => `
    <a class="drop-row" href="#/player/${slug(p.name)}">
      ${p.rank ? rankBadge(p.rank, 'sm') : '<div class="rank-badge sm">–</div>'}
      <span>${esc(p.name)}</span>
      <span class="mono" style="margin-left:auto;color:var(--dim)">${p.rating.toFixed(1)}</span>
    </a>`).join('');
  drop.classList.add('show');
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-box')) $('#search-drop').classList.remove('show');
  if (e.target.closest('.drop-row')) {
    $('#search-drop').classList.remove('show');
    $('#search').value = '';
  }
});

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---------- scroll reveal ---------- */
let io;
function observeReveals() {
  if (io) io.disconnect();
  io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        $$('.cu', en.target).forEach((el) =>
          countUp(el, parseFloat(el.dataset.target), { dec: parseInt(el.dataset.dec || 0) }));
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach((el) => io.observe(el));
}

/* ---------- scroll polish: progress bar, hero drift, back-to-top ---------- */
(function scrollPolish() {
  const bar = $('#scroll-progress');
  const toTop = $('#to-top');
  const drift = $('#page-home .hero-row');
  const topbar = document.querySelector('.topbar');
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    if (toTop) toTop.classList.toggle('show', y > 640);
    if (topbar) topbar.classList.toggle('scrolled', y > 10);
    if (drift && y < 1400) {
      drift.style.transform = `translateY(${y * 0.14}px)`;
      drift.style.opacity = String(Math.max(0.3, 1 - y / 950));
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  if (toTop) toTop.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();
})();

/* ---------- boot ---------- */
computeBaseline();
rebuildState();
renderHome();
route();

/* pull `window.NAME = <json>;` out of a generated file (brace/bracket scan) */
function extractAssign(txt, name) {
  const i = txt.indexOf('window.' + name);
  if (i < 0) return null;
  let k = txt.indexOf('=', i);
  while (k < txt.length && '{['.indexOf(txt[k]) < 0) k++;
  let depth = 0, inStr = false, q = '', esc = false;
  for (let j = k; j < txt.length; j++) {
    const ch = txt[j];
    if (inStr) {
      if (esc) esc = false;
      else if (ch === '\\') esc = true;
      else if (ch === q) inStr = false;
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = true; q = ch; continue; }
    if (ch === '{' || ch === '[') depth++;
    else if (ch === '}' || ch === ']') {
      depth--;
      if (depth <= 0) return JSON.parse(txt.slice(k, j + 1));
    }
  }
  return null;
}

/* Re-fetch the published log with a cache-buster so every visitor sees admin
   publishes even if the browser (or the Pages CDN) cached log.js. */
(async () => {
  try {
    const r = await fetch('log.js?cb=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) return;
    const txt = await r.text();
    const fresh = extractAssign(txt, 'LB_PUB') ||
      (extractAssign(txt, 'LB_LOG') ? { matches: extractAssign(txt, 'LB_LOG') } : null);
    if (!fresh) return;
    if (JSON.stringify(fresh) !== JSON.stringify(window.LB_PUB || null)) {
      window.LB_PUB = fresh;
      window.LB_LOG = fresh.matches || [];
      rebuildState();
      renderHome();
      route();
    }
  } catch (e) { /* offline — keep the bundled log */ }
})();
