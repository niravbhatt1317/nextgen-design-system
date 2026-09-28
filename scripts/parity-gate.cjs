#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════
 * THE PARITY GATE — no library part commits without its parity receipt
 *
 * Pranjal, 2026-09-22: "Reviewer is mandatory after every change. But it
 * should not repeat this mistake." The mistake: a part reaching the gallery
 * that is not the console's existing part. So a commit touching
 * src/components/<X>/ is held unless scripts/parity.cjs has measured X
 * against the console SINCE those files were last touched, and found no more
 * differences than scripts/parity/accepted.json agrees to.
 *
 * OPT-IN BY LAPTOP. The check needs the console running beside this
 * worktree. The gate is on only where scripts/parity/.local.json exists —
 * parity.cjs writes it on its first run on a laptop. Nirav's laptop never
 * sees it. Delete the file to turn the gate off.
 *
 * THE ESCAPE HATCH is `git commit --no-verify`; using it is a decision.
 * ══════════════════════════════════════════════════════════════════════ */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

function stagedFiles() {
  const root = execSync('git rev-parse --show-toplevel', { cwd: LIB, encoding: 'utf8' }).trim();
  const prefix = path.relative(root, LIB).split(path.sep).filter(Boolean).join('/');
  const raw = execSync('git diff --cached --name-only', { cwd: LIB, encoding: 'utf8' });
  return raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => (prefix && l.startsWith(prefix + '/') ? l.slice(prefix.length + 1) : l));
}

function newestTouch(files) {
  let newest = 0;
  for (const f of files) {
    try { const t = fs.statSync(path.join(LIB, f)).mtimeMs; if (t > newest) newest = t; } catch { /* deleted */ }
  }
  return newest;
}

function main() {
  if (!fs.existsSync(LOCAL) && !process.env.PARITY_GATE) return; /* this laptop does not run the check */
  const files = stagedFiles();
  const byComponent = new Map();
  for (const f of files) {
    const m = /^src\/components\/([A-Za-z0-9]+)\//.exec(f);
    if (!m) continue;
    const name = m[1];
    if (/Old2?$/.test(name)) continue; /* the deprecated copies are frozen, not measured */
    if (!byComponent.has(name)) byComponent.set(name, []);
    byComponent.get(name).push(f);
  }
  if (byComponent.size === 0) return;

  const receipt = readJson(RECEIPT, {});
  const accepted = readJson(ACCEPTED, { components: {} }).components || {};
  console.log('');
  console.log('  ' + bold('THE PARITY CHECK IS MANDATORY') + dim('  — a part commits only as the console draws it'));
  const problems = [];
  for (const [name, behind] of byComponent) {
    const label = name.padEnd(20);
    const twin = path.join(TWINS, name + '.cjs');
    if (!fs.existsSync(twin)) {
      problems.push({ name, why: 'no twins — write scripts/parity/twins/' + name + '.cjs (where the same frame lives in the story, the console and the mock)' });
      console.log('    ' + red('NO TWINS     ') + label + dim(behind.length + ' staged file(s)'));
      continue;
    }
    const entry = receipt[name];
    const touched = newestTouch(behind.concat(['scripts/parity/twins/' + name + '.cjs']));
    if (!entry) {
      problems.push({ name, why: 'never measured on this machine' });
      console.log('    ' + red('NOT MEASURED ') + label + dim(behind.length + ' staged file(s)'));
      continue;
    }
    const when = Date.parse(entry.when);
    if (!Number.isFinite(when) || when < touched) {
      problems.push({ name, why: 'changed after its last measurement' });
      console.log('    ' + red('STALE        ') + label + dim('measured ' + String(entry.when).slice(0, 19).replace('T', ' ') + ', edited after'));
      continue;
    }
    const allow = (accepted[name] || {}).differences;
    const limit = allow === undefined ? 0 : allow;
    if (entry.differences > limit) {
      problems.push({ name, why: entry.differences + ' difference(s) from the console, ' + limit + ' agreed' });
      console.log('    ' + red('DIFFERS      ') + label + red(entry.differences + ' difference(s)') + dim(', ' + limit + ' agreed'));
      continue;
    }
    console.log('    ' + green('ok           ') + label + dim(entry.differences + ' difference(s), ' + entry.checked + ' properties over ' + entry.frames + ' frame(s)'));
  }
  if (problems.length === 0) { console.log(''); return; }
  console.log('');
  console.log('  ' + red('This commit is held.'));
  for (const p of problems) console.log('    ' + amber(p.name) + dim('  ' + p.why));
  console.log('');
  console.log('  ' + bold('Run this, then commit again:'));
  console.log('    node scripts/parity.cjs ' + problems.map((p) => p.name).join(' '));
  console.log('');
  console.log('  ' + dim('The gallery (npx storybook dev -p 6006 --ci --no-open) and the console (:4187) must be up.'));
  console.log('  ' + dim('A difference that is real and waiting on somebody else: node scripts/parity.cjs --accept, once.'));
  console.log('  ' + dim('git commit --no-verify skips this, and that is meant to be a decision.'));
  console.log('');
  process.exit(1);
}

main();
