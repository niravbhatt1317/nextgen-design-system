#!/usr/bin/env node
/**
 * The two artifacts `vite build` does not produce, and the package cannot ship
 * without.
 *
 * Run after `vite build`. Both steps existed only as promises in `package.json`
 * before this - `exports` named `dist/styles.css` and `dist/index.d.cts`, and
 * neither file had ever been written. Anyone who installed the package got
 * 2,785 JavaScript files and not one rule of styling.
 */
import { execFileSync } from 'node:child_process';
import {
  appendFileSync,
  copyFileSync,
  existsSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = (file) => resolve(root, 'dist', file);

/**
 * The stylesheet, compiled rather than copied.
 *
 * `src/styles/globals.css` is the tokens and three `@tailwind` directives - on
 * its own it styles nothing. Every component in this library is `mdt-` prefixed
 * utility classes, and those only exist once Tailwind has scanned the source
 * and generated them. Shipping the source file would ship the tokens and none
 * of the rules that use them.
 */
function buildStyles() {
  execFileSync(
    'npx',
    ['tailwindcss', '-i', 'src/styles/globals.css', '-o', 'dist/styles.css', '--minify'],
    { cwd: root, stdio: ['ignore', 'ignore', 'inherit'] }
  );

  const { size } = statSync(dist('styles.css'));
  // A stylesheet that compiled but scanned nothing would still be written - a
  // few hundred bytes of reset with no utilities in it. That failure looks
  // exactly like success unless somebody checks the size.
  const FLOOR = 50_000;
  if (size < FLOOR) {
    throw new Error(
      `dist/styles.css is only ${String(size)} bytes. Tailwind found almost no classes - check ` +
        `the \`content\` globs in tailwind.config.ts.`
    );
  }
  return size;
}

/**
 * Types for the CommonJS entry.
 *
 * `vite-plugin-dts` emits one `index.d.ts`, and under `moduleResolution: node16`
 * a `require` consumer will not read it - it looks for `.d.cts` beside the
 * `.cjs` and finds nothing, so every export types as `any`. The declarations are
 * identical for both formats, so this is a copy rather than a second build.
 */
function buildCjsTypes() {
  const from = dist('index.d.ts');
  if (!existsSync(from)) {
    throw new Error('dist/index.d.ts is missing - did `vite build` run first?');
  }
  copyFileSync(from, dist('index.d.cts'));
  return statSync(dist('index.d.cts')).size;
}

/**
 * Folds the per-component stylesheets into `dist/styles.css`, and takes their
 * imports back out of the JavaScript.
 *
 * Seven components keep their own `.css` beside them and `import './x.css'`.
 * That is right for source - Storybook, the dev server and the tests all read
 * `src/`, and Vite handles it. It is wrong for a published package: Rollup
 * preserves those imports, so `dist/index.js` reaches a `.css` file and **the
 * package cannot be loaded by Node at all** - `require` and `import` both die
 * on `Unexpected token '.'`, which is CSS being parsed as JavaScript. Any
 * consumer rendering on the server hits it.
 *
 * The docs have always said to import `@mtdt/nextgen-design-system/styles.css`
 * and nothing else, so that file is where this CSS belonged in the first place.
 * It is appended, not prepended: the cascade a consumer gets stays the order
 * they get today, utilities first and component rules after.
 *
 * Nothing in `src/` changes. The imports stay exactly where they are for
 * everything that reads the source.
 */
function foldComponentCss() {
  const sheets = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.css')) sheets.push(full);
    }
  };
  const components = resolve(root, 'dist/components');
  if (existsSync(components)) walk(components);
  // Sorted so the output is the same on every machine and every run; two builds
  // of one commit that differ only in file order are two builds nobody trusts.
  sheets.sort();

  for (const sheet of sheets) {
    appendFileSync(dist('styles.css'), `\n${readFileSync(sheet, 'utf8')}`);
    rmSync(sheet);
  }

  /* Now the imports. Rollup writes them as a bare `import './x.css';` or
   * `require('./x.css');` with no binding, so they can be cut whole - there is
   * no name left behind to go undefined. */
  const BARE_CSS = /(?:^|(?<=[;\n]))\s*(?:import\s*['"][^'"]+\.css['"]\s*;?|require\(['"][^'"]+\.css['"]\)\s*;?)/gm;
  let touched = 0;
  const scrub = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        scrub(full);
        continue;
      }
      if (!/\.(js|cjs|mjs)$/.test(entry.name)) continue;
      const before = readFileSync(full, 'utf8');
      const after = before.replace(BARE_CSS, '');
      if (after !== before) {
        writeFileSync(full, after);
        touched += 1;
      }
    }
  };
  scrub(resolve(root, 'dist'));

  return { sheets: sheets.length, touched };
}

const css = buildStyles();
const types = buildCjsTypes();
const folded = foldComponentCss();
const cssFinal = statSync(dist('styles.css')).size;
process.stdout.write(
  `  dist/styles.css   ${String(Math.round(cssFinal / 1024))} kB ` +
    `(${String(Math.round(css / 1024))} kB + ${String(folded.sheets)} component sheets)\n` +
    `  dist/index.d.cts  ${String(Math.round(types / 1024))} kB\n` +
    `  css imports cut   ${String(folded.touched)} file(s), so the package loads in Node\n`
);
