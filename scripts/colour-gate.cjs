#!/usr/bin/env node
/* THE COLOUR GATE (2026-09-24). Pranjal: "every fix I tell you to do find the source and solve it from the
 * foundation so that anywhere else it doesnt cause the same issue." The dark-theme selected pill was unreadable
 * because one style line typed a colour in by hand instead of reading a token; the platform held three dark themes
 * (the map, the console's hand-typed twins, the library's built-in variants). This gate refuses the NEXT one.
 *
 * What it counts, per file under src/ (css, js, jsx, ts, tsx), comments stripped:
 *   literal   a typed-in colour: #hex, or rgb()/rgba()/hsl()/hsla() with numbers (never var())
 *   dark      a private dark rule: a `.dark ` selector in css, a `dark:` class variant in jsx/tsx
 *   white     (the library, 2026-09-26) white spelled as a job: mdt-text-white, mdt-bg-white, mdt-fill-white,
 *             mdt-border-white, bg-white, text-white, or --mdt-white read directly, under src/components. White is a
 *             ground's colour in light only; an ink or a wash on a fill that flips in dark must read the token of its
 *             job (primary-foreground, background, inverse-foreground, info-foreground). The token file and the
 *             *Old / *Old2 folders are left out. The count is armed the first time --record writes it; until then
 *             it is reported, not held.
 * What it never counts: the token file (the one place a value may live) and data files whose colours are content
 * (avatar swatches) - listed in the baseline's `content` list.
 *
 * The RATCHET: scripts/colour-gate-baseline.json records today's counts. A file may only go DOWN; a new file with
 * any count fails; a rise fails. `--record` writes today's counts (it refuses a rise unless `--reason "..."` names
 * why, and keeps the reason). `--report` prints every file. Exit 0 = clean, 1 = held.
 *
 * The same file runs in the console (next-gen-ui) and in the library (nextgen-design-system): it reads the repo it
 * sits in from its own location. */
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '..');
const BASELINE = path.join(HERE, 'colour-gate-baseline.json');
const isLibrary = fs.existsSync(path.join(ROOT, 'src', 'styles', 'globals.css'));
const SRC = path.join(ROOT, 'src');
/* the token file: the one place a colour value lives */
const TOKEN_FILES = isLibrary ? ['src/styles/globals.css'] : ['src/styles/tokens.css'];
/* content, not styling - the seeds' avatar swatches and the sample data behind stories */
const CONTENT = isLibrary
  ? ['src/components/Table/sampleUsers.ts']
  : ['src/features/users/data.js', 'src/features/roles/data.js', 'src/features/teams/data.js', 'src/features/service-accounts/data.js', 'src/features/fields/data.js', 'src/features/organizations/data.js'];
const EXT = new Set(['.css', '.js', '.jsx', '.ts', '.tsx']);
/* white as a job: the seven spellings, one match per occurrence (mdt-bg-white contains bg-white - counted once) */
const WHITE_RE = /(?:text|bg|fill|border)-white\b|--mdt-white\b/g;
const countsWhite = (relPath) => isLibrary && relPath.startsWith('src/components/') && !/(^|\/)[A-Za-z]+Old2?\//.test(relPath);

const red = (s) => '\x1b[31m' + s + '\x1b[0m';
const green = (s) => '\x1b[32m' + s + '\x1b[0m';
const amber = (s) => '\x1b[33m' + s + '\x1b[0m';
const dim = (s) => '\x1b[2m' + s + '\x1b[0m';
const bold = (s) => '\x1b[1m' + s + '\x1b[0m';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXT.has(path.extname(e.name))) out.push(p);
  }
  return out;
}
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const stripComments = (s, ext) => {
  s = s.replace(/\/\*[\s\S]*?\*\//g, ' ');
  if (ext !== '.css') s = s.replace(/(^|[^:'"`\\])\/\/[^\n]*/g, '$1');
  return s;
};
function countIn(file) {
  const ext = path.extname(file);
  const s = stripComments(fs.readFileSync(file, 'utf8'), ext);
  const hex = (s.match(/#[0-9a-fA-F]{3,8}\b/g) || []).filter((h) => /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(h));
  /* a hex that is really an id or a fragment: only count those that sit where a colour would (after ':' '=' '(' ',' quote or space) */
  const hexColours = (s.match(/(?:[:=(,\s'"`])#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g) || []).length;
  void hex;
  const fn = (s.match(/\b(?:rgba?|hsla?)\(\s*\d/g) || []).length;
  const darkCss = ext === '.css' ? (s.match(/(^|[,}\s])\.dark\s+[^{,]*[{,]/g) || []).length : 0;
  const darkClass = ext !== '.css' ? (s.match(/(^|[\s'"`])dark:[a-zA-Z[\]-]/g) || []).length : 0;
  const white = countsWhite(rel(file)) ? (s.match(WHITE_RE) || []).length : 0;
  return { literal: hexColours + fn, dark: darkCss + darkClass, white };
}
function scan() {
  const out = {};
  for (const f of walk(SRC)) {
    const r = rel(f);
    if (TOKEN_FILES.includes(r) || CONTENT.includes(r)) continue;
    const c = countIn(f);
    if (c.literal || c.dark || c.white) out[r] = c;
  }
  return out;
}
function main() {
  const args = process.argv.slice(2);
  const today = scan();
  const files = Object.keys(today).sort();
  const totals = files.reduce((t, f) => ({ literal: t.literal + today[f].literal, dark: t.dark + today[f].dark, white: t.white + today[f].white }), { literal: 0, dark: 0, white: 0 });
  const base = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : null;
  /* the white count ratchets only once a baseline has recorded it; an older baseline holds literal and dark as before */
  const armed = !!(base && base.totals && typeof base.totals.white === 'number');
  const baseWhite = (b) => (b && typeof b.white === 'number' ? b.white : 0);
  const rose = (f) => { const t = today[f], b = base && base.files[f]; if (!b) return t.literal > 0 || t.dark > 0 || (armed && t.white > 0); return t.literal > b.literal || t.dark > b.dark || (armed && t.white > baseWhite(b)); };
  const fell = (f) => { const t = today[f], b = base && base.files[f]; if (!b) return false; return t.literal < b.literal || t.dark < b.dark || (armed && t.white < baseWhite(b)); };

  if (args.includes('--report')) {
    console.log('');
    console.log('  ' + bold('TYPED-IN COLOURS, PRIVATE DARK RULES AND WHITE AS A JOB') + dim('  ' + (isLibrary ? 'the library' : 'the console') + ' · src/ · token file and content files left out' + (isLibrary && !armed ? ' · white not yet recorded' : '')));
    for (const f of files) {
      const b = base && base.files[f];
      const mark = !b ? amber('new ') : rose(f) ? red('UP  ') : fell(f) ? green('down') : dim('    ');
      console.log('    ' + mark + ' ' + f.padEnd(64) + String(today[f].literal).padStart(4) + ' literal' + String(today[f].dark).padStart(5) + ' dark' + String(today[f].white).padStart(5) + ' white');
    }
    console.log('    ' + dim('total'.padEnd(69)) + String(totals.literal).padStart(4) + ' literal' + String(totals.dark).padStart(5) + ' dark' + String(totals.white).padStart(5) + ' white' + dim('  in ' + files.length + ' files'));
    console.log('');
  }

  if (args.includes('--record')) {
    const reasonAt = args.indexOf('--reason');
    const reason = reasonAt >= 0 ? args[reasonAt + 1] : null;
    if (base) {
      const rises = files.filter(rose);
      if (rises.length && !reason) {
        console.error(red('  Refused: ' + rises.length + ' file(s) gained a typed-in colour, a private dark rule or a white as a job. Take it out, or record it with --reason "why".'));
        for (const f of rises) console.error('    ' + f + dim('  ' + JSON.stringify(today[f]) + (base.files[f] ? ' was ' + JSON.stringify(base.files[f]) : ' new')));
        process.exit(1);
      }
    }
    const record = {
      note: 'The colour gate\'s ratchet (2026-09-24). Every file may only go DOWN from here; a rise or a new file holds the commit. The token file and the content files are not counted. Run node scripts/colour-gate.cjs --report to see today, --record to agree a fall.',
      tokenFiles: TOKEN_FILES,
      content: CONTENT,
      recorded: new Date().toISOString().slice(0, 10),
      reasons: Object.assign({}, base && base.reasons, reason ? { [new Date().toISOString().slice(0, 10)]: reason } : {}),
      totals,
      files: today,
    };
    fs.writeFileSync(BASELINE, JSON.stringify(record, null, 2) + '\n');
    console.log(green('  Recorded: ') + files.length + ' files, ' + totals.literal + ' typed-in colours, ' + totals.dark + ' private dark rules, ' + totals.white + ' white as a job.');
    return;
  }

  /* the check */
  if (!base) {
    console.error(amber('  No baseline yet: run node scripts/colour-gate.cjs --record once, then the ratchet holds.'));
    process.exit(1);
  }
  const problems = [];
  for (const f of files) {
    const t = today[f];
    const b = base.files[f];
    if (t.literal || t.dark) {
      if (!b) problems.push({ f, why: 'new file with ' + t.literal + ' typed-in colour(s) and ' + t.dark + ' private dark rule(s)' });
      else if (t.literal > b.literal) problems.push({ f, why: 'typed-in colours ' + b.literal + ' -> ' + t.literal });
      else if (t.dark > b.dark) problems.push({ f, why: 'private dark rules ' + b.dark + ' -> ' + t.dark });
    }
    /* white as a job: only once recorded; a file the baseline never saw counts from 0 */
    if (armed && t.white > baseWhite(b)) problems.push({ f, why: 'white as an ink or wash ' + baseWhite(b) + ' -> ' + t.white + ' (read the token of the job: primary-foreground, background, inverse-foreground, info-foreground)' });
  }
  const quiet = args.includes('--quiet');
  if (problems.length === 0) {
    if (!quiet) console.log('  ' + green('colours ok') + dim('  ' + totals.literal + ' typed-in, ' + totals.dark + ' private dark rules, ' + totals.white + ' white as a job' + (isLibrary && !armed ? ' (not yet recorded - run --record to arm it)' : '') + ', none new (baseline ' + base.recorded + ')'));
    return;
  }
  console.log('');
  console.log('  ' + red('THE COLOUR GATE HOLDS THIS COMMIT') + dim('  - a colour was typed in, a private dark rule was added, or white was used as an ink or a wash'));
  for (const p of problems) console.log('    ' + red(p.f) + dim('  ' + p.why));
  console.log('');
  console.log('  ' + dim('A colour lives in the token file only; a component reads hsl(var(--mdt-...)). Dark comes from the token,'));
  console.log('  ' + dim('never from a .dark twin or a dark: variant. Pranjal, 2026-09-24: "solve it from the foundation so that'));
  console.log('  ' + dim('anywhere else it doesnt cause the same issue." Content (a seed\'s avatar swatch) goes in the baseline\'s content list.'));
  console.log('');
  process.exit(1);
}
main();
