#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════
 * THE PARITY CHECK — a library part is the console's existing part, measured
 *
 * WHY THIS EXISTS. Pranjal, 2026-09-22: "a new component won't go, only the
 * existing one will go" · "story book is literally the most precise thing we
 * should have". Twice in one day a part reached the gallery differing from the
 * console it was copied from — a placeholder grey that came from a token
 * name, a menu item that went dark under the pointer where the console keeps
 * it red. Both were found by eye. Reading class names proves nothing; only
 * the rendered value does.
 *
 * WHAT IT DOES. For every twin a component declares (scripts/parity/twins/
 * <Component>.cjs), it opens the story frame, the console frame and the mock
 * frame in one headless browser, reads the same properties off each as
 * RENDERED (rgb, px), and prints them side by side. The console wins; the mock
 * stands in where the console has no twin; the story is the thing under test.
 * A receipt is written for the commit gate (scripts/parity-gate.cjs).
 *
 *     node scripts/parity.cjs Switch DropdownMenu     one or more components
 *     node scripts/parity.cjs --all                    every twin file
 *     node scripts/parity.cjs --accept                 today's counts become the agreed baseline
 *
 * WHERE THINGS ARE. The gallery: PARITY_GALLERY, else the live storybook on
 * :6006, else the built one on :4196. The console: PARITY_CONSOLE, else :4187.
 * The console folder (for mocks and the browser finder): PARITY_CONSOLE_DIR,
 * else found beside this worktree. Nothing here runs on a laptop without the
 * console — the gate stays off there (see parity-gate.cjs).
 * ══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const http = require('http');

const LIB = path.resolve(__dirname, '..');
const TWINS = path.join(__dirname, 'parity', 'twins');
const RECEIPT = path.join(__dirname, 'parity', '.receipt.json');
const ACCEPTED = path.join(__dirname, 'parity', 'accepted.json');
const LOCAL = path.join(__dirname, 'parity', '.local.json');

const red = (s) => '\u001b[31m' + s + '\u001b[0m';
const green = (s) => '\u001b[32m' + s + '\u001b[0m';
const amber = (s) => '\u001b[33m' + s + '\u001b[0m';
const dim = (s) => '\u001b[2m' + s + '\u001b[0m';
const bold = (s) => '\u001b[1m' + s + '\u001b[0m';

/* ── the console folder, found beside this worktree ───────────────────── */
function findConsoleDir() {
  if (process.env.PARITY_CONSOLE_DIR && fs.existsSync(process.env.PARITY_CONSOLE_DIR)) return process.env.PARITY_CONSOLE_DIR;
  let dir = LIB;
  for (let i = 0; i < 5; i++) {
    for (const rel of [
      '.ui-versions/v07/Functional/next-gen-ui',
      'platform-documentation/next-gen-ui',
      'platform-documentation/Functional/next-gen-ui',
    ]) {
      const p = path.join(dir, rel);
      if (fs.existsSync(path.join(p, 'package.json'))) return p;
    }
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  return null;
}

function browserFrom(consoleDir) {
  if (consoleDir) {
    const finder = path.join(consoleDir, 'scripts', 'browser.cjs');
    if (fs.existsSync(finder)) {
      const b = require(finder);
      return { chromium: b.chromium, launchOptions: b.launchOptions };
    }
  }
  const pw = require('playwright');
  return { chromium: pw.chromium, launchOptions: (extra) => ({ ...(extra || {}) }) };
}

function reachable(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 2500 }, (res) => {
      res.resume();
      resolve(res.statusCode !== undefined && res.statusCode < 500);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

/* ── reading a frame ───────────────────────────────────────────────────── */
const READ = ({ sel, props }) => {
  const el = document.querySelector(sel);
  if (!el) return { __missing: sel };
  const cs = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  const out = {};
  for (const p of props) {
    if (p === 'rectWidth') out[p] = Math.round(r.width);
    else if (p === 'rectHeight') out[p] = Math.round(r.height);
    else out[p] = cs[p];
  }
  return out;
};

async function settle(page, ms) {
  await page.waitForTimeout(ms);
}

async function applyState(page, sel, state) {
  if (!state) return;
  const loc = page.locator(sel).first();
  if (state === 'hover') await loc.hover({ timeout: 4000 }).catch(() => {});
  else if (state === 'focus') await loc.focus({ timeout: 4000 }).catch(() => {});
  else if (state === 'active') {
    const b = await loc.boundingBox().catch(() => null);
    if (b) { await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.mouse.down(); }
  }
  await settle(page, 220);
}

async function releaseState(page, state) {
  if (state === 'active') await page.mouse.up().catch(() => {});
}

async function readStory(page, gallery, frame) {
  const { id, select, open } = frame.story;
  await page.goto(gallery + '/iframe.html?id=' + id + '&viewMode=story', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#storybook-root *', { state: 'visible', timeout: 20000 }).catch(() => {});
  await settle(page, 600);
  if (open) await open(page);
  await applyState(page, select, frame.state);
  const out = await page.evaluate(READ, { sel: select, props: frame.props });
  await releaseState(page, frame.state);
  return out;
}

async function readConsole(page, consoleUrl, frame, signedIn) {
  const { path: route, select, open } = frame.console;
  if (!signedIn.done) {
    await page.goto(consoleUrl + '/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() =>
      sessionStorage.setItem('merged-ui.session', JSON.stringify({ email: 'admin@acme.com', role: 'Owner' }))
    );
    signedIn.done = true;
  }
  await page.goto(consoleUrl + route, { waitUntil: 'domcontentloaded' });
  await settle(page, 1500);
  if (open) await open(page);
  await settle(page, 300);
  await applyState(page, select, frame.state);
  const out = await page.evaluate(READ, { sel: select, props: frame.props });
  await releaseState(page, frame.state);
  return out;
}

async function readMock(page, consoleDir, frame) {
  const { file, select, open } = frame.mock;
  const abs = path.isAbsolute(file) ? file : path.join(consoleDir, file);
  if (!fs.existsSync(abs)) return { __missing: 'file ' + abs };
  await page.goto('file:///' + abs.replace(/\\/g, '/').replace(/^\//, ''), { waitUntil: 'domcontentloaded' });
  await settle(page, 500);
  if (open) await open(page);
  await applyState(page, select, frame.state);
  const out = await page.evaluate(READ, { sel: select, props: frame.props });
  await releaseState(page, frame.state);
  return out;
}

/* Tailwind composes box-shadow from three slots and leaves the empty ring slots as invisible
 * "rgba(0, 0, 0, 0) 0px 0px 0px 0px" entries; they paint nothing and are dropped before comparing. */
const norm = (v) => {
  if (v === null || v === undefined) return '';
  let s = String(v).trim().replace(/\s+/g, ' ');
  if (s.includes('rgba(0, 0, 0, 0) 0px 0px 0px 0px')) {
    s = s
      .split(/,(?![^(]*\))/)
      .map((x) => x.trim())
      .filter((x) => x !== 'rgba(0, 0, 0, 0) 0px 0px 0px 0px')
      .join(', ');
  }
  return s;
};

/* THE PALETTE, on each side. The console paints from its own overridden palette (a known, recorded
 * disagreement: its neutral-150 is #1D2B3E where the library's is #111C2C). A colour that comes from the
 * SAME token on both sides is the same design decision even when the two laptops' palettes render it
 * differently, so those pairs are matched by token and reported as "palette", not as a difference. A
 * colour from a different token, or from no token, still fails. */
const PALETTE = () => {
  const names = new Set();
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    for (const r of rules) {
      if (!r.style) continue;
      for (const p of r.style) if (p.startsWith('--mdt-')) names.add(p);
    }
  }
  const cs = getComputedStyle(document.documentElement);
  const probe = document.createElement('span');
  document.body.appendChild(probe);
  const out = {};
  for (const n of names) {
    const v = cs.getPropertyValue(n).trim();
    if (!/^[\d.]+ [\d.]+% [\d.]+%$/.test(v)) continue;
    probe.style.color = 'hsl(' + v + ')';
    out[n] = getComputedStyle(probe).color;
  }
  probe.remove();
  return out;
};

function sameTokenIndex(libPalette, consolePalette) {
  const idx = new Map();
  for (const [name, lib] of Object.entries(libPalette || {})) {
    const con = (consolePalette || {})[name];
    if (!con || con === lib) continue;
    const key = lib + '|' + con;
    if (!idx.has(key)) idx.set(key, []);
    idx.get(key).push(name);
  }
  return idx;
}

const isColour = (s) => /^rgba?\(/.test(s);

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

async function main() {
  const args = process.argv.slice(2);
  const names = args.filter((a) => !a.startsWith('--'));
  const accepted = readJson(ACCEPTED, { components: {} });

  if (args.includes('--accept')) {
    const receipt = readJson(RECEIPT, null);
    if (receipt === null) { console.error(red('  Nothing to accept — the parity check has not run on this machine yet.')); process.exit(1); }
    const components = { ...(accepted.components || {}) };
    for (const [c, e] of Object.entries(receipt)) {
      components[c] = { differences: e.differences, agreed: new Date().toISOString().slice(0, 10), note: (components[c] || {}).note || 'recorded with --accept' };
    }
    fs.writeFileSync(ACCEPTED, JSON.stringify({ note: 'What each part is allowed to differ from the console by today. The gate blocks anything ABOVE these numbers. Committed, so every laptop shares one answer.', components }, null, 2) + '\n');
    console.log(green('  Recorded.'));
    for (const [c, v] of Object.entries(components)) console.log('    ' + c.padEnd(20) + dim(v.differences + ' accepted'));
    return;
  }

  let files = [];
  if (args.includes('--all')) files = fs.existsSync(TWINS) ? fs.readdirSync(TWINS).filter((f) => f.endsWith('.cjs')).map((f) => f.replace(/\.cjs$/, '')) : [];
  else files = names;
  if (files.length === 0) {
    console.log('');
    console.log('  ' + bold('THE PARITY CHECK') + dim('  — the story frame beside the console frame, property by property'));
    console.log('');
    console.log('  ' + dim('node scripts/parity.cjs Switch DropdownMenu      node scripts/parity.cjs --all      node scripts/parity.cjs --accept'));
    console.log('  ' + dim('twins live in scripts/parity/twins/<Component>.cjs — one file per component folder'));
    console.log('');
    return;
  }

  const consoleDir = findConsoleDir();
  const galleryEnv = process.env.PARITY_GALLERY;
  const gallery = galleryEnv || ((await reachable('http://localhost:6006/iframe.html')) ? 'http://localhost:6006' : 'http://localhost:4196');
  const consoleUrl = process.env.PARITY_CONSOLE || 'http://localhost:4187';
  const galleryUp = await reachable(gallery + '/iframe.html');
  const consoleUp = await reachable(consoleUrl + '/');
  console.log('');
  console.log('  ' + bold('THE PARITY CHECK'));
  console.log('  ' + dim('gallery  ') + gallery + (galleryUp ? '' : red('  (not answering)')));
  console.log('  ' + dim('console  ') + consoleUrl + (consoleUp ? '' : amber('  (not answering — mocks only)')));
  console.log('  ' + dim('mocks    ') + (consoleDir ? path.join(consoleDir, 'mocks') : amber('no console folder found beside this worktree')));
  if (!galleryUp) { console.error(red('  The gallery must be up: npx storybook dev -p 6006 --ci --no-open, or the built one on :4196.')); process.exit(2); }

  const { chromium, launchOptions } = browserFrom(consoleDir);
  const browser = await chromium.launch(launchOptions());
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const signedIn = { done: false };
  const receipt = readJson(RECEIPT, {});
  let anyWorse = false;
  let tokenIndex = new Map();

  try {
    /* the two palettes, read once */
    await page.goto(gallery + '/iframe.html?id=foundation-colors--palette&viewMode=story', { waitUntil: 'domcontentloaded' });
    await settle(page, 1200);
    const libPalette = await page.evaluate(PALETTE);
    let consolePalette = {};
    if (consoleUp) {
      await page.goto(consoleUrl + '/', { waitUntil: 'domcontentloaded' });
      await page.evaluate(() =>
        sessionStorage.setItem('merged-ui.session', JSON.stringify({ email: 'admin@acme.com', role: 'Owner' }))
      );
      signedIn.done = true;
      await page.goto(consoleUrl + '/users', { waitUntil: 'domcontentloaded' });
      await settle(page, 1500);
      consolePalette = await page.evaluate(PALETTE);
    }
    tokenIndex = sameTokenIndex(libPalette, consolePalette);
    console.log('  ' + dim('palette  ') + dim(Object.keys(libPalette).length + ' names in the gallery, ' + tokenIndex.size + ' rendered differently by the console (matched by token)'));

    for (const name of files) {
      const twinFile = path.join(TWINS, name + '.cjs');
      console.log('');
      console.log('  ' + bold('─'.repeat(70)));
      console.log('  ' + bold(name));
      console.log('  ' + bold('─'.repeat(70)));
      if (!fs.existsSync(twinFile)) {
        console.log('    ' + red('NO TWINS') + dim('  write ' + path.relative(LIB, twinFile)));
        receipt[name] = { differences: 1, frames: 0, when: new Date().toISOString(), note: 'no twins' };
        anyWorse = true;
        continue;
      }
      delete require.cache[require.resolve(twinFile)];
      const twin = require(twinFile);
      const frames = twin.frames || [];
      if (frames.length === 0) {
        console.log('    ' + amber('no frames') + dim('  ' + (twin.why || 'the twin file declares nothing to compare')));
      }
      let differences = 0;
      let checked = 0;
      for (const frame of frames) {
        const story = await readStory(page, gallery, frame).catch((e) => ({ __missing: 'story: ' + String(e.message || e).slice(0, 80) }));
        let ref = null;
        let refFrom = null;
        let mock = null;
        if (frame.console && consoleUp) {
          ref = await readConsole(page, consoleUrl, frame, signedIn).catch((e) => ({ __missing: 'console: ' + String(e.message || e).slice(0, 80) }));
          refFrom = 'console';
        }
        if (frame.mock && consoleDir) {
          mock = await readMock(page, consoleDir, frame).catch((e) => ({ __missing: 'mock: ' + String(e.message || e).slice(0, 80) }));
          if (!ref || ref.__missing) { ref = mock; refFrom = 'mock'; mock = null; }
        }
        const label = (frame.name || '').padEnd(34);
        if (story.__missing) { differences++; console.log('    ' + red('MISSING ') + label + red('story frame not found') + dim('  ' + story.__missing)); continue; }
        if (!ref) { console.log('    ' + amber('FLAG    ') + label + amber('no console and no mock for this frame')); differences++; continue; }
        if (ref.__missing) { differences++; console.log('    ' + red('MISSING ') + label + red(refFrom + ' frame not found') + dim('  ' + ref.__missing)); continue; }
        const palette = [];
        const bad = frame.props.filter((p) => {
          const a = norm(story[p]);
          const b = norm(ref[p]);
          if (a === b) return false;
          if (refFrom === 'console' && isColour(a) && isColour(b) && tokenIndex.has(a + '|' + b)) {
            palette.push(p + ' = ' + tokenIndex.get(a + '|' + b).join(' / ') + ' (gallery ' + a + ', console ' + b + ')');
            return false;
          }
          return true;
        });
        checked += frame.props.length;
        if (bad.length === 0) {
          console.log('    ' + green('ok      ') + label + dim(frame.props.length + ' properties equal · ' + refFrom));
          for (const n of palette) console.log('              ' + dim('palette  ' + n));
        } else {
          differences += bad.length;
          console.log('    ' + red('DIFF    ') + label + red(bad.length + ' off the ' + refFrom));
          for (const p of bad) console.log('              ' + p.padEnd(24) + red(norm(story[p]) || '(none)') + dim('   ' + refFrom + ': ' + (norm(ref[p]) || '(none)')));
        }
        if (mock && !mock.__missing) {
          const dis = frame.props.filter((p) => norm(mock[p]) !== norm(ref[p]));
          if (dis.length) console.log('              ' + dim('the mock disagrees with the console on ' + dis.join(', ') + ' — the console wins; raise it'));
        }
      }
      const allow = ((accepted.components || {})[name] || {}).differences;
      const worse = allow !== undefined ? differences > allow : differences > 0;
      if (worse) anyWorse = true;
      receipt[name] = { differences, frames: frames.length, checked, when: new Date().toISOString() };
      console.log('');
      console.log('  ' + (differences === 0 ? green('  Equal to the console.') : (worse ? red('  ' + differences + ' difference(s)') : amber('  ' + differences + ' difference(s), ' + allow + ' agreed'))) + dim('  ' + checked + ' properties over ' + frames.length + ' frame(s)'));
    }
  } finally {
    await browser.close();
  }

  /* two runs at once must not lose each other's entries: re-read at the moment of writing and merge */
  fs.mkdirSync(path.dirname(RECEIPT), { recursive: true });
  const latest = readJson(RECEIPT, {});
  for (const name of files) if (receipt[name]) latest[name] = receipt[name];
  fs.writeFileSync(RECEIPT, JSON.stringify(latest, null, 2) + '\n');
  if (!fs.existsSync(LOCAL)) fs.writeFileSync(LOCAL, JSON.stringify({ note: 'This laptop runs the parity check; the commit gate is on here. Delete this file to turn it off.', since: new Date().toISOString() }, null, 2) + '\n');
  console.log('');
  process.exitCode = anyWorse ? 1 : 0;
}

main().catch((e) => {
  console.error('');
  console.error('  ' + red('The parity check stopped: ') + (e && e.message ? e.message : String(e)));
  process.exitCode = 2;
});
