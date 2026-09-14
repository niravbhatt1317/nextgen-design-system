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
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

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

/*
 * The package has to be loadable by Node, not only by a bundler.
 *
 * Seven components `import './x.css'` beside themselves, and Rollup preserves
 * those imports into `dist/`. A published package carrying them cannot be
 * loaded at all - `require('@mtdt/nextgen-design-system')` dies on
 * `Unexpected token '.'`, which is CSS being parsed as JavaScript, and every
 * consumer rendering on the server hits it. 0.5.1 shipped that way.
 *
 * `build-package.mjs` folds that CSS into `dist/styles.css` and cuts the
 * imports. This is the check that it actually did.
 */
const strays = [];
const findCssImports = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      findCssImports(full);
      continue;
    }
    if (!/\.(js|cjs|mjs)$/.test(entry.name)) continue;
    if (/['"][^'"]+\.css['"]/.test(readFileSync(full, 'utf8'))) strays.push(full);
  }
};
const distDir = resolve(root, 'dist');
if (existsSync(distDir)) findCssImports(distDir);
if (strays.length > 0) {
  problems.push(
    `${String(strays.length)} file(s) in dist/ still import a .css file, so the package ` +
      `cannot be loaded by Node: ${strays.slice(0, 3).join(', ')}${strays.length > 3 ? ', …' : ''}`
  );
}

// And the CSS those imports used to deliver has to be somewhere, or the fold
// removed the imports and lost the rules with them.
if (existsSync(css) && !readFileSync(css, 'utf8').includes('bdg-'))
  problems.push('dist/styles.css has no component rules in it - the fold dropped them');

if (problems.length > 0) {
  process.stderr.write(`\nThe package does not contain what it promises:\n`);
  for (const problem of problems) process.stderr.write(`  - ${problem}\n`);
  process.stderr.write('\n');
  process.exit(1);
}

process.stdout.write(`  ${String(promised.size)} promised paths, all present\n`);
process.stdout.write(`  dist/styles.css carries tokens, utilities and component rules\n`);
process.stdout.write(`  no dist file imports a .css, so the package loads in Node\n`);
