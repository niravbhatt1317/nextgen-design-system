#!/usr/bin/env node
/**
 * Everything `exports` promises has to exist, and the stylesheet has to have
 * something in it.
 *
 * This repo carried an `exports` map naming `dist/styles.css` and
 * `dist/index.d.cts` while neither file had ever been written. `npm pack`
 * succeeded, `npm install` succeeded, the components rendered - unstyled, every
 * one of them, with no error anywhere to say why. A build that is green and an
 * artifact that works are two different claims, and only one of them was being
 * checked.
 */
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const problems = [];

/** Every path an `exports` entry can resolve to, however deeply nested. */
const paths = (node) =>
  typeof node === 'string' ? [node] : Object.values(node ?? {}).flatMap((child) => paths(child));

const promised = new Set([
  ...paths(pkg.exports),
  ...[pkg.main, pkg.module, pkg.types].filter(Boolean),
]);

for (const promise of promised) {
  if (!promise.startsWith('./dist/')) continue;
  if (!existsSync(resolve(root, promise))) {
    problems.push(`${promise} is named in package.json and does not exist`);
  }
}

// A stylesheet that compiled but scanned nothing is a few hundred bytes of
// reset. It exists, so a "does the file exist" check passes, and it styles
// nothing at all.
const css = resolve(root, 'dist/styles.css');
if (existsSync(css)) {
  const text = readFileSync(css, 'utf8');
  const { size } = statSync(css);
  if (size < 50_000)
    problems.push(
      `dist/styles.css is only ${String(size)} bytes - Tailwind found almost no classes`
    );
  if (!text.includes('--mdt-primary')) problems.push('dist/styles.css has no design tokens in it');
  if (!text.includes('.mdt-')) problems.push('dist/styles.css has no prefixed utilities in it');
}

if (problems.length > 0) {
  process.stderr.write(`\nThe package does not contain what it promises:\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.stderr.write('\n');
  process.exit(1);
}

process.stdout.write(`  ${String(promised.size)} promised paths, all present\n`);
process.stdout.write(`  dist/styles.css carries tokens and prefixed utilities\n`);
