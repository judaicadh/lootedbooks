// Data model + helpers for the Penn "Nazi Looted Books" site.
// Ported from the Penn Looted Books design prototype. The record generator
// is a deterministic seeded PRNG so register IDs are stable across builds.

export type TierKey = 'direct' | 'namelist' | 'context' | 'possible';
export type EvidenceKind = 'direct' | 'inferred' | 'possible';

export interface Mark {
  slug: string;
  name: string;
  body: string;
  where: string;
  count: number;
  hue: number;
  desc: string;
  obscured: string;
  note: string;
  bodyFull: string;
  bencowitz: string;
}

export interface EvidenceRow {
  what: string;
  whatSlug: string | null;
  where: string;
  says: string;
  says2?: string;
  source: string;
  kind: EvidenceKind;
}

export interface BookRecord {
  id: string;
  title: string;
  bib: string;
  tier: TierKey;
  series: string;
  country: string;
  city: string;
  inCatalog: boolean;
  ownerSlug: string | null;
  owner: string | null;
  marks: string[];
  catalog: string;
  tierWhy: string;
  evidence: EvidenceRow[];
}

export interface Step { n: string; title: string; body: string; }

export interface Case {
  slug: string;
  title: string;
  blurb: string;
  lede: string;
  sections: string[];
  recordId: string | null;
  recordLabel: string;
}

export interface Source {
  name: string;
  type: string;
  region: string;
  question: string;
}

export interface Owner {
  slug: string;
  name: string;
  bio: string;
  dbNote: string;
  bookIds: string[];
}

export interface AnatomyMark { name: string; note: string; }
export interface AnatomyLoc {
  n: number;
  name: string;
  where: string;
  count: number;
  marks: AnatomyMark[];
  hint?: string;
}

export const MARK_NAMES: Record<string, string> = {
  oad: 'OAD stamp', jcr: 'JCR bookplate', gift: 'Gift-of-JCR note', err: 'ERR stamp',
  rsha: 'RSHA stamp', pohl: 'Pohl pastedown', disinf: 'Disinfection stamp', ajdc: 'AJDC Library stamp', owner: 'Owner stamp',
};

export const MARKINGS: Mark[] = [
  { slug: 'oad', name: 'OAD stamp', body: 'Offenbach Archival Depot', where: 'Title page, its verso, and the last-page verso', count: 1180, hue: 270,
    desc: 'The stamp applied at the Offenbach depot, where looted books were gathered for sorting after the war. It appears in black, red, purple, blue and green — the colour often distinguishing one processing batch from another.',
    obscured: 'under a Penn bookplate', note: 'The single most common marking, and the one most often on the verso rather than the recto — half are on the back of the title page.',
    bodyFull: 'Offenbach Archival Depot, U.S. Military Government (1946–49)', bencowitz: 'Bencowitz (1946), plate group I' },
  { slug: 'jcr', name: 'JCR bookplate', body: 'Jewish Cultural Reconstruction', where: 'Front pastedown', count: 512, hue: 150,
    desc: 'The bookplate of Jewish Cultural Reconstruction, Inc., the body that distributed heirless Jewish cultural property after the war. Its presence marks the route by which a book reached Penn.',
    obscured: 'beneath a later Annenberg plate', note: 'Frequently pasted over an older owner’s bookplate — the earlier layer is still there underneath.',
    bodyFull: 'Jewish Cultural Reconstruction, Inc. (1947–52)', bencowitz: '—' },
  { slug: 'gift', name: 'Gutter source note', body: '“Gift of JCR”', where: 'Gutter behind the title page', count: 276, hue: 150,
    desc: 'A pencilled or stamped note, “Gift of Jewish Cultural Reconstruction,” usually with a date. It sits down in the fold, where a closed book hides it.',
    obscured: 'in deep gutter shadow', note: 'Easy to miss entirely unless the book is opened flat and the gutter examined.',
    bodyFull: 'Penn Libraries accessioning, via JCR', bencowitz: '—' },
  { slug: 'err', name: 'ERR stamp', body: 'Einsatzstab Reichsleiter Rosenberg', where: 'Title page and front pastedown', count: 61, hue: 20,
    desc: 'The mark of the Nazi task force that systematically looted Jewish libraries. Over a dozen sub-variants exist; the eagle-and-code forms are the most recognisable.',
    obscured: 'ink-cancelled after the war', note: 'One of more than a dozen distinct Nazi confiscation stamps recorded in these books.',
    bodyFull: 'Einsatzstab Reichsleiter Rosenberg (ERR)', bencowitz: 'Bencowitz (1946), plate group III' },
  { slug: 'pohl', name: 'Johannes Pohl pastedown', body: 'ERR (Pohl)', where: 'Front pastedown', count: 18, hue: 20,
    desc: 'A handwritten note in Hebrew transliteration, in the hand of Johannes Pohl, the ERR’s “expert” on Jewish books. A rare and specific marking.',
    obscured: 'faded pencil', note: 'Where present, it ties the book directly to the ERR’s Frankfurt operation.',
    bodyFull: 'Johannes Pohl, for the ERR', bencowitz: '—' },
  { slug: 'disinf', name: 'Disinfection stamp', body: 'Offenbach intake', where: 'Flyleaf and title-page verso', count: 143, hue: 200,
    desc: '“desinf. Lk. Sept 45” and similar — applied when books were fumigated on intake at the depot. A small, bureaucratic mark that reliably dates the book’s passage through Offenbach.',
    obscured: 'overstamped', note: 'Not a provenance mark in itself, but a firm tie to the Offenbach timeline.',
    bodyFull: 'Offenbach Archival Depot, intake', bencowitz: '—' },
  { slug: 'ajdc', name: 'AJDC Library stamp', body: 'the “Joint”', where: 'Inside back board (lower)', count: 208, hue: 210,
    desc: 'The stamp of the American Jewish Joint Distribution Committee libraries — books lent to Displaced Persons camps before being returned and redistributed.',
    obscured: 'on the lower board', note: 'Almost always on the inside of the lower board, a surface a hurried survey skips.',
    bodyFull: 'American Jewish Joint Distribution Committee', bencowitz: '—' },
  { slug: 'owner', name: 'Pre-war owner stamps', body: 'personal & institutional', where: 'Throughout — title page, boards, flyleaf', count: 690, hue: 40,
    desc: 'The stamps and bookplates of the people and institutions who owned these books before they were taken — synagogues, schools, community libraries, and private collectors.',
    obscured: 'under a later bookplate', note: 'The mark that can name an owner, and the one most often deliberately covered over.',
    bodyFull: 'Various pre-war owners', bencowitz: 'partly in Bencowitz (1946), vol. II' },
];

export const STEPS: Step[] = [
  { n: '1', title: 'Read the shelf, not the catalog', body: 'The catalog records what a cataloguer saw decades ago. The looting evidence is physical. Identification began by pulling volumes and looking, class by class — not by querying a database.' },
  { n: '2', title: 'Turn the title page over', body: 'A large share of Offenbach stamps are on the verso, not the recto. The single most productive habit is to look at the back of the page you would normally stop at.' },
  { n: '3', title: 'Look under later bookplates and pockets', body: 'A JCR or Annenberg plate, or a library card pocket added in the 1960s, frequently sits directly over the earliest mark. The oldest evidence is usually the layer nobody removed.' },
  { n: '4', title: 'Match the name against the databases', body: 'An owner stamp is a lead, not a conclusion. The name is checked against Yad Vashem, USHMM and JDC records — to confirm the person, and, too often, to confirm their fate.' },
  { n: '5', title: 'Record the uncertainty, not just the finding', body: 'A book with no surviving mark but a pencilled catalog note is still recorded — at a lower confidence, with the reason stated. A register that only shows its certainties is not honest about how it was built.' },
];

export const CASES: Case[] = [
  { slug: 'nedarim-binding', title: 'The empty Nedarim binding', blurb: 'A spine stamped at Offenbach whose textblock had been shelved three floors away, under a different call number.',
    lede: 'For years the binding and its pages were catalogued as two unrelated items. The stamp on the spine is what reunited them.',
    sections: ['Shelf-reading the Talmud class turned up a detached binding — boards and spine, no pages — with an OAD stamp on the spine itself, the only surface left to mark. Empty bindings are usually discarded or ignored. This one was kept because the stamp made it evidence.', 'The matching textblock was found later in a different sequence, its own title-page verso carrying the same depot batch colour. The two were catalogued as one volume again, seventy years after they came apart.', 'It is the case that taught the project to treat spines, and empty bindings, as places to look.'],
    recordId: '04821', recordLabel: 'Sefer Nedarim (no. 04821)' },
  { slug: 'loc-29', title: 'The Library of Congress twenty-nine', blurb: 'Twenty-nine volumes traced by cross-reading Offenbach’s monthly shipping reports against Penn accessions.',
    lede: 'The depot’s own paperwork, read against Penn’s accession dates, placed twenty-nine books that carried no usable stamp.',
    sections: ['Offenbach filed monthly reports listing outbound shipments. Read against Penn’s 1949–50 accessions, the dates and counts lined up for a cluster of twenty-nine volumes.', 'None of the twenty-nine could be confirmed by a marking alone. They sit in the register at a lower confidence tier, inferred from context, with the reports linked as corroboration.'],
    recordId: '11207', recordLabel: 'a context-tier record (no. 11207)' },
  { slug: '1952-tell', title: 'The 1952 tell', blurb: 'An accession date that gave away a JCR route where the bookplate had been removed.',
    lede: 'Someone had lifted the JCR bookplate. The accession date it left behind was enough to reconstruct the route.',
    sections: ['A volume arrived with a clean pastedown — but a ghost of adhesive and a 1952 accession stamp. JCR distributed through 1952; Penn acquired almost nothing else by that route in that year.', 'It is a thin case, and recorded as one. The point is that even a removed marking leaves a shape.'],
    recordId: '05930', recordLabel: 'a thinly-evidenced record (no. 05930)' },
  { slug: 'broken-set', title: 'The broken set', blurb: 'A multivolume work split across three confidence tiers, because the evidence survived unevenly.',
    lede: 'One work, five volumes, three different levels of certainty. The register does not average them.',
    sections: ['Volumes I and III carry OAD stamps. Volume II has only an owner inscription. Volumes IV and V have nothing but their place in the set.', 'Rather than record the set at its strongest or weakest, each volume keeps its own tier. A reader can see exactly which parts of the case are solid.'],
    recordId: '04821', recordLabel: 'the set’s lead volume (no. 04821)' },
  { slug: '5549-2391', title: '5,549 against 2,391', blurb: 'Why two surviving tallies of what was sent to Penn disagree by three thousand books.',
    lede: 'The homepage’s two numbers are not a rounding problem. They are two different documents that never reconciled.',
    sections: ['One figure comes from a depot shipping manifest, one from a JCR distribution summary. They count different things at different moments, and neither is complete.', 'We publish both, and hold the difference open on the Gaps page. Choosing one number would be tidier and less true.'],
    recordId: null, recordLabel: 'see the Gaps page' },
];

export const SOURCES: Source[] = [
  { name: 'Yad Vashem — Names Database', type: 'victims', region: 'international', question: 'Who owned this book?' },
  { name: 'USHMM Resource Center', type: 'victims', region: 'international', question: 'Who owned this book?' },
  { name: 'OAD monthly reports (NARA)', type: 'shipping', region: 'Germany / U.S.', question: 'Was it sent here, and when?' },
  { name: 'Freidus card catalog (Dropsie)', type: 'bibliographic', region: 'Philadelphia', question: 'Was it ours before the war?' },
  { name: 'Bencowitz, Stamps (1946)', type: 'reference', region: 'Germany', question: 'What stamp is this?' },
  { name: 'JDC Archives', type: 'displaced persons', region: 'Europe', question: 'Where did it travel after?' },
];
export const SOURCE_CATS = ['all', 'victims', 'shipping', 'bibliographic', 'reference'];

export const OWNERS: Record<string, Owner> = {
  'rabbiner-seminar': { slug: 'rabbiner-seminar', name: 'Rabbiner-Seminar zu Frankfurt a. M.', bio: 'The Orthodox rabbinical seminary founded in Frankfurt in 1873. Its library, one of the finest of its kind, was seized by the ERR after the seminary was forced to close in 1938.', dbNote: 'Institutional record, Yad Vashem — collections seized 1938–41', bookIds: ['04821'] },
  'mendel-cohn': { slug: 'mendel-cohn', name: 'Mendel Cohn', bio: 'A private collector in Vienna. His name appears, stamped, on the title page of at least one volume now at Penn. He was deported in 1942; the database record confirms the date and does not record a return.', dbNote: 'Central Database of Shoah Victims’ Names — deported 1942', bookIds: ['07733'] },
};

export const TIERS: Record<TierKey, { label: string; order: number }> = {
  direct: { label: 'Direct marking', order: 0 },
  namelist: { label: 'Inferred — name match', order: 1 },
  context: { label: 'Inferred — context', order: 2 },
  possible: { label: 'Possible', order: 3 },
};
export const SERIES: Record<string, string> = { dropsie: 'Dropsie / JCR', kaplan: 'Kaplan — Cape Town', other: 'Other acquisitions' };

export function chip(tier: string): string {
  const base = "font:500 10px/1 'IBM Plex Mono',monospace;letter-spacing:.04em;text-transform:uppercase;padding:5px 9px;border-radius:3px;white-space:nowrap;";
  if (tier === 'direct') return base + 'background:var(--ink);color:var(--pp);';
  if (tier === 'namelist') return base + 'background:none;color:var(--ink2);border:1px solid rgba(var(--inkrgb),.45);';
  if (tier === 'context') return base + 'background:none;color:var(--mut);border:1px dashed rgba(var(--inkrgb),.4);';
  return base + 'background:none;color:var(--fn);border:1px dotted rgba(var(--inkrgb),.34);';
}
export function leftBorder(tier: string): string {
  const base = 'padding-left:14px;';
  if (tier === 'direct') return base + 'border-left:3px solid var(--ink);';
  if (tier === 'namelist') return base + 'border-left:3px solid rgba(var(--inkrgb),.4);';
  if (tier === 'context') return base + 'border-left:3px dashed rgba(var(--inkrgb),.34);';
  return base + 'border-left:3px dotted rgba(var(--inkrgb),.3);';
}
export function evRowStyle(kind: string): string {
  const base = 'padding:16px 18px;border-radius:4px;background:var(--sf);';
  if (kind === 'direct') return base + 'border:1px solid rgba(var(--inkrgb),.16);border-left:3px solid var(--ink);';
  if (kind === 'inferred') return base + 'border:1px dashed rgba(var(--inkrgb),.3);border-left:3px dashed rgba(var(--inkrgb),.4);';
  return base + 'border:1px dotted rgba(var(--inkrgb),.28);border-left:3px dotted rgba(var(--inkrgb),.34);background:var(--sf3);';
}

// ---- featured records (full evidence) ----
export const FEATURED: Record<string, BookRecord> = {
  '04821': { id: '04821', title: 'ספר נדרים עם פירוש · Sefer Nedarim, with commentary',
    bib: 'Frankfurt am Main, 1720 · folio · Dropsie / JCR series',
    tier: 'direct', series: 'dropsie', country: 'Germany', city: 'Frankfurt', inCatalog: true, ownerSlug: 'rabbiner-seminar', owner: 'Rabbiner-Seminar zu Frankfurt a. M.',
    marks: ['oad', 'jcr', 'gift', 'owner'], catalog: 'Franklin b7291140',
    tierWhy: 'Three independent markings place this volume at the Offenbach depot and name its pre-war institutional owner. The evidence is physical and mutually corroborating.',
    evidence: [
      { what: 'OAD stamp', whatSlug: 'oad', where: 'Title-page verso', says: 'OFFENBACH ARCHIVAL DEPOT', says2: 'in purple', source: 'OAD monthly report, Nov 1948 (NARA)', kind: 'direct' },
      { what: 'JCR bookplate', whatSlug: 'jcr', where: 'Inside front board', says: 'Jewish Cultural Reconstruction, Inc.', source: 'JCR distribution list, 1949', kind: 'direct' },
      { what: 'Owner stamp', whatSlug: 'owner', where: 'Title page', says: 'Bibliothek d. Rabbiner-Seminars, Frankfurt a. M.', source: 'Yad Vashem — institutional collection record', kind: 'direct' },
    ] },
  '05930': { id: '05930', title: 'Homiletical commentary — title page wanting',
    bib: 'Place and date unknown · Dropsie / JCR series (attributed)',
    tier: 'possible', series: 'dropsie', country: 'Unknown', city: '—', inCatalog: false, ownerSlug: null, owner: null,
    marks: [], catalog: 'not in Franklin',
    tierWhy: 'The only trace is a pencilled note on a catalog card. No marking survives in the book itself — and the title page, where one would expect a stamp, is gone. We record it so the possibility is visible rather than lost. This is a thin case, and we show it as thin.',
    evidence: [
      { what: 'Card-catalog annotation', whatSlug: null, where: '—', says: 'ex JCR? — check Offenbach', source: 'Freidus card catalog, Dropsie College', kind: 'possible' },
    ] },
  '07733': { id: '07733', title: 'Siddur — daily prayer book',
    bib: 'Vienna, 1911 · Dropsie / JCR series',
    tier: 'namelist', series: 'dropsie', country: 'Austria', city: 'Vienna', inCatalog: true, ownerSlug: 'mendel-cohn', owner: 'Mendel Cohn',
    marks: ['owner', 'disinf'], catalog: 'Franklin b5510092',
    tierWhy: 'An owner stamp names a private individual; the name matches a single record in the Shoah victims’ database with a consistent place and date. No depot stamp survives, so the Offenbach passage is inferred from the disinfection mark alone.',
    evidence: [
      { what: 'Owner stamp', whatSlug: 'owner', where: 'Front flyleaf', says: 'M. Cohn, Wien II.', source: 'Yad Vashem — Central Database of Shoah Victims’ Names', kind: 'inferred' },
      { what: 'Disinfection stamp', whatSlug: 'disinf', where: 'Title-page verso', says: 'desinf. Lk. Sept 45', source: 'OAD intake procedure (contextual)', kind: 'inferred' },
    ] },
};

const CITIES: [string, string][] = [['Frankfurt', 'Germany'], ['Vienna', 'Austria'], ['Berlin', 'Germany'], ['Vilna', 'Lithuania'], ['Warsaw', 'Poland'], ['Amsterdam', 'Netherlands'], ['Prague', 'Czechoslovakia'], ['Kraków', 'Poland']];
const TITLES = ['Talmud Bavli, tractate', 'Mishnah with commentary', 'Shulḥan Arukh', 'Responsa collection', 'Biblical commentary', 'Prayer book (Siddur)', 'Passover Haggadah', 'Grammar of the Hebrew tongue', 'Sermons and homilies', 'History of the Jews', 'Philosophical treatise', 'Kabbalistic miscellany'];

function buildRecords(): BookRecord[] {
  const recs: BookRecord[] = [FEATURED['04821'], FEATURED['07733']];
  const plan: [TierKey, number][] = [['direct', 12], ['namelist', 9], ['context', 7], ['possible', 5]];
  let seed = 42;
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const pick = <T,>(a: T[]): T => a[Math.floor(rnd() * a.length)];
  let id = 4400;
  plan.forEach(([tier, n]) => {
    for (let i = 0; i < n; i++) {
      id += Math.floor(rnd() * 180) + 40;
      const [city, country] = pick(CITIES);
      const yr = 1680 + Math.floor(rnd() * 250);
      const series = rnd() < 0.72 ? 'dropsie' : (rnd() < 0.6 ? 'kaplan' : 'other');
      let marks: string[];
      if (tier === 'direct') marks = [pick(['oad', 'jcr', 'err']), 'owner'];
      else if (tier === 'namelist') marks = ['owner', pick(['disinf', 'ajdc'])];
      else if (tier === 'context') marks = [pick(['disinf', 'gift'])];
      else marks = [];
      const hasOwner = tier === 'direct' || tier === 'namelist' || rnd() < 0.2;
      recs.push({
        id: String(id), title: pick(TITLES), bib: city + ', ' + yr + ' · ' + SERIES[series],
        tier, series, country, city, inCatalog: tier !== 'possible' ? true : rnd() < 0.3,
        ownerSlug: null, owner: hasOwner ? 'recorded, not yet linked' : null, marks, catalog: 'Franklin b' + (5000000 + Math.floor(rnd() * 900000)),
        tierWhy: ({ direct: 'A physical marking ties this volume to the looting route.', namelist: 'An owner name matches a victims-database record; the depot passage is inferred.', context: 'No marking names an owner; documentary context places the volume among looted material.', possible: 'A faint or ambiguous trace only. Recorded so the possibility is not lost.' } as Record<TierKey, string>)[tier],
        evidence: [{ what: marks.length ? MARK_NAMES[marks[0]] : 'Catalog note', whatSlug: marks.length ? marks[0] : null, where: tier === 'possible' ? '—' : 'Title page', says: tier === 'possible' ? 'ex JCR?' : '—', source: tier === 'direct' ? 'OAD monthly report (NARA)' : (tier === 'namelist' ? 'Yad Vashem — Names Database' : 'OAD shipping records'), kind: tier === 'direct' ? 'direct' : (tier === 'possible' ? 'possible' : 'inferred') }],
      });
    }
  });
  recs.push(FEATURED['05930']);
  return recs;
}

export const RECORDS: BookRecord[] = buildRecords();
export const COUNTRIES: string[] = [...new Set(RECORDS.map((r) => r.country))].filter((c) => c !== 'Unknown');

export const EDITIONS = [
  { ver: 'v2026.2', date: '2026-06', note: 'Added 41 context-tier records from the LoC cross-read.' },
  { ver: 'v2026.1', date: '2026-02', note: 'First public edition. 2,573 records.' },
  { ver: 'v2025.3', date: '2025-11', note: 'Internal — Kaplan/Cape Town series merged in.' },
];

// ---- anatomy ("where to look") ----
export const LOCS: AnatomyLoc[] = [
  { n: 1, name: 'Spine', where: 'outer edge of the binding', count: 47,
    marks: [{ name: 'OAD stamp', note: 'on empty bindings whose textblock is shelved elsewhere' }, { name: 'Owner stamp, remnant', note: 'partial, at head or tail' }],
    hint: 'Sometimes the only surviving trace, once a book has come apart from its cover.' },
  { n: 2, name: 'Front board', where: 'outside of the front cover', count: 63,
    marks: [{ name: 'Pre-war owner stamp', note: 'institutional — synagogue, school, community library' }, { name: 'Later Penn / Annenberg bookplate', note: 'applied directly over the older mark' }] },
  { n: 3, name: 'Inside front board', where: 'front pastedown', count: 512,
    marks: [{ name: 'JCR bookplate', note: 'Jewish Cultural Reconstruction, Inc.' }, { name: 'Johannes Pohl pastedown', note: 'handwritten Hebrew transliteration, ERR' }, { name: 'Nazi stamp', note: 'often lies beneath a later bookplate' }],
    hint: 'Look through — or under — a later bookplate. The earliest evidence is usually the layer nobody removed.' },
  { n: 4, name: 'Front flyleaf', where: 'first free leaf', count: 188,
    marks: [{ name: 'Owner inscription', note: 'a name, a dedication, a date' }, { name: 'Disinfection stamp', note: 'applied on intake' }] },
  { n: 5, name: 'Title page', where: 'recto', count: 604,
    marks: [{ name: 'OAD stamp', note: 'black, red, purple, blue or green' }, { name: 'Owner stamp', note: 'personal or institutional' }, { name: 'ERR / RSHA stamp', note: 'Nazi confiscation apparatus' }] },
  { n: 6, name: 'Title-page verso', where: 'reverse of the title page', count: 331,
    marks: [{ name: 'OAD stamp', note: 'frequently placed on the verso, not the recto' }, { name: '“desinf. Lk. Sept 45”', note: 'disinfection stamp, Offenbach' }],
    hint: 'Turn the title page over. A large share of depot stamps are on the back of it.' },
  { n: 7, name: 'Gutter behind the title page', where: 'inner margin, in the fold', count: 276,
    marks: [{ name: 'Gift-of-JCR source note', note: '“Gift of Jewish Cultural Reconstruction,” often dated' }],
    hint: 'Open the fold fully. A closed book hides the note down in the gutter.' },
  { n: 8, name: 'Table of contents', where: 'first page of contents', count: 92,
    marks: [{ name: 'Owner stamp', note: 'personal or institutional' }] },
  { n: 9, name: 'Last-page verso', where: 'reverse of the final leaf', count: 141,
    marks: [{ name: 'OAD stamp', note: 'placed at the very end' }, { name: 'Owner stamp', note: 'personal or institutional' }],
    hint: 'The last surface in the book. Almost nobody thinks to check it.' },
  { n: 10, name: 'Inside back board', where: 'rear pastedown — the lower board', count: 208,
    marks: [{ name: 'AJDC Library stamp', note: 'books lent to Displaced Persons camps' }, { name: 'Owner stamp', note: 'on the inside of the lower board' }],
    hint: 'The lower board, not the upper one — the surface a hurried survey skips.' },
  { n: 11, name: 'Behind the card pocket', where: 'under a later library pocket', count: 34,
    marks: [{ name: 'Owner stamp / OAD stamp', note: 'concealed when the pocket was pasted in' }],
    hint: 'A pocket added decades later can sit squarely on top of the evidence.' },
];

// ---- URL map (real Astro file routes) ----
export const urls = {
  home: '/',
  about: '/about/',
  gaps: '/about/gaps/',
  claims: '/about/claims/',
  method: '/about/method/',
  steps: '/about/steps/',
  markings: '/markings/',
  marking: (slug: string) => `/markings/${slug}/`,
  anatomy: '/markings/anatomy/',
  cases: '/cases/',
  case: (slug: string) => `/cases/${slug}/`,
  register: '/register/',
  record: (id: string) => `/register/${id}/`,
  download: '/register/download/',
  owners: '/owners/',
  owner: (slug: string) => `/owners/${slug}/`,
  sources: '/sources/',
};
