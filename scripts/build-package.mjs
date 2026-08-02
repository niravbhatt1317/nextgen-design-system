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
import { copyFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

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

const css = buildStyles();
const types = buildCjsTypes();
process.stdout.write(
  `  dist/styles.css   ${String(Math.round(css / 1024))} kB\n` +
    `  dist/index.d.cts  ${String(Math.round(types / 1024))} kB\n`
);
