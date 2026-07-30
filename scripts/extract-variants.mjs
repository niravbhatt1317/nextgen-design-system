#!/usr/bin/env node
/**
 * Extracts every component and every variant from the library source.
 *
 * Variants in this system are declared with CVA (`class-variance-authority`),
 * which means they are already structured data - this just reads them out.
 *
 * The result is the machine-readable catalogue of what the design system can
 * actually produce: component -> variant group -> allowed values, plus defaults.
 *
 * Usage:
 *   node scripts/extract-variants.mjs             human-readable summary
 *   node scripts/extract-variants.mjs --json      write component-catalog.json
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COMPONENTS_DIR = join(ROOT, 'src', 'components');

const EXCLUDED_FILE = /\.(stories|test|spec|types)\.[jt]sx?$/;
const EXCLUDED_PATH = [join('Icon', 'icons')];

/**
 * Removes comments, leaving everything else byte-for-byte.
 *
 * Components document their variants with JSDoc *inside* the `variants` block:
 *
 *     variants: {
 *       \/** Visual style variant of the button *\/
 *       variant: { ... }
 *
 * Without this, the parser walks into the comment and never reaches the key
 * that follows it - which silently produced an empty variant list for Button,
 * Checkbox, Radio and every other well-documented component.
 *
 * Quotes and template literals are tracked so a `//` inside a class string is
 * left alone.
 */
function stripComments(src) {
  let out = '';
  let i = 0;
  let quote = null;

  while (i < src.length) {
    const c = src[i];
    const next = src[i + 1];

    if (quote) {
      out += c;
      if (c === '\\') {
        out += next ?? '';
        i += 2;
        continue;
      }
      if (c === quote) quote = null;
      i += 1;
      continue;
    }

    if (c === '"' || c === "'" || c === '`') {
      quote = c;
      out += c;
      i += 1;
      continue;
    }

    if (c === '/' && next === '*') {
      const end = src.indexOf('*/', i + 2);
      // keep newlines so line numbers stay usable
      const skipped = src.slice(i, end === -1 ? src.length : end + 2);
      out += skipped.replace(/[^\n]/g, ' ');
      i = end === -1 ? src.length : end + 2;
      continue;
    }

    if (c === '/' && next === '/') {
      const end = src.indexOf('\n', i);
      i = end === -1 ? src.length : end;
      continue;
    }

    out += c;
    i += 1;
  }

  return out;
}

/** Walks from an opening brace and returns the matching closing index. */
function matchBrace(src, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i += 1) {
    const c = src[i];
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/** Finds `key: {` at the top level of a block and returns its inner source. */
function blockFor(src, key) {
  const re = new RegExp(`\\b${key}\\s*:\\s*\\{`);
  const m = re.exec(src);
  if (!m) return null;
  const open = src.indexOf('{', m.index + m[0].length - 1);
  const close = matchBrace(src, open);
  if (close === -1) return null;
  return src.slice(open + 1, close);
}

/** Top-level `name:` keys within a block, ignoring anything nested. */
function topLevelKeys(block) {
  const keys = [];
  let depth = 0;
  let i = 0;
  let atStart = true;
  while (i < block.length) {
    const c = block[i];
    if (c === '{' || c === '[' || c === '(') depth += 1;
    else if (c === '}' || c === ']' || c === ')') depth -= 1;
    else if (depth === 0) {
      if (atStart) {
        const m = /^\s*['"`]?([A-Za-z0-9_$-]+)['"`]?\s*:/.exec(block.slice(i));
        if (m) {
          keys.push(m[1]);
          i += m[0].length;
          atStart = false;
          continue;
        }
      }
      if (c === ',') atStart = true;
      else if (!/\s/.test(c)) atStart = false;
    }
    i += 1;
  }
  return keys;
}

function collectFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectFiles(full));
      continue;
    }
    if (!/\.tsx?$/.test(entry)) continue;
    if (EXCLUDED_FILE.test(entry)) continue;
    if (entry === 'index.ts') continue;
    if (EXCLUDED_PATH.some((p) => full.includes(sep + p + sep))) continue;
    out.push(full);
  }
  return out;
}

/** Every `cva(...)` definition in a file, with its variant groups. */
function extractCva(src, file) {
  const defs = [];
  const re = /(?:export\s+)?const\s+([A-Za-z0-9_$]+)\s*=\s*cva\(/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const name = m[1];
    // find the config object: the last `{` before the call closes
    const callStart = m.index + m[0].length;
    const cfgIdx = src.indexOf('{', callStart);
    if (cfgIdx === -1) continue;
    const cfgEnd = matchBrace(src, cfgIdx);
    if (cfgEnd === -1) continue;

    // the config object may be the 2nd arg; search forward for `variants:`
    let searchFrom = cfgIdx;
    let variantsBlock = null;
    let defaultsBlock = null;
    for (let attempt = 0; attempt < 4 && searchFrom < src.length; attempt += 1) {
      const open = src.indexOf('{', searchFrom);
      if (open === -1) break;
      const close = matchBrace(src, open);
      if (close === -1) break;
      const chunk = src.slice(open + 1, close);
      const v = blockFor(chunk, 'variants');
      if (v) {
        variantsBlock = v;
        defaultsBlock = blockFor(chunk, 'defaultVariants');
        break;
      }
      searchFrom = close + 1;
    }
    if (!variantsBlock) continue;

    const groups = {};
    for (const group of topLevelKeys(variantsBlock)) {
      const inner = blockFor(variantsBlock, group);
      groups[group] = inner ? topLevelKeys(inner) : [];
    }

    const defaults = {};
    if (defaultsBlock) {
      for (const d of defaultsBlock.split(',')) {
        const dm = /^\s*['"`]?([A-Za-z0-9_$-]+)['"`]?\s*:\s*['"`]?([A-Za-z0-9_$-]+)['"`]?/.exec(d);
        if (dm) defaults[dm[1]] = dm[2];
      }
    }

    defs.push({ name, file, groups, defaults });
  }
  return defs;
}

// ---------------------------------------------------------------------------

const files = collectFiles(COMPONENTS_DIR);
const catalog = {};

for (const file of files) {
  const src = stripComments(readFileSync(file, 'utf8'));
  const rel = relative(ROOT, file).split(sep).join('/');
  const componentMatch = rel.match(/src\/components\/([^/]+)\//);
  const component = componentMatch ? componentMatch[1] : rel;

  for (const def of extractCva(src, rel)) {
    catalog[component] ??= { component, file: rel, definitions: [] };
    catalog[component].definitions.push({
      name: def.name,
      variants: def.groups,
      defaults: def.defaults,
    });
  }
}

const components = Object.values(catalog).sort((a, b) => a.component.localeCompare(b.component));

// ---------------------------------------------------------------------------

const jsonOut = process.argv.includes('--json');

let totalGroups = 0;
let totalValues = 0;

console.log('');
console.log('Component variant catalogue');
console.log('-'.repeat(72));

for (const c of components) {
  console.log(`\n${c.component}`);
  for (const def of c.definitions) {
    const groupNames = Object.keys(def.variants);
    if (groupNames.length === 0) continue;
    for (const g of groupNames) {
      const values = def.variants[g];
      totalGroups += 1;
      totalValues += values.length;
      const dflt = def.defaults[g] ? `  (default: ${def.defaults[g]})` : '';
      console.log(`  ${g}: ${values.join(', ')}${dflt}`);
    }
  }
}

console.log('');
console.log('-'.repeat(72));
console.log(
  `${components.length} components with variants, ${totalGroups} variant groups, ${totalValues} values`
);
console.log('');

if (jsonOut) {
  const out = {
    generatedFrom: 'src/components (CVA definitions)',
    componentCount: components.length,
    variantGroupCount: totalGroups,
    variantValueCount: totalValues,
    components,
  };
  writeFileSync(join(ROOT, 'component-catalog.json'), JSON.stringify(out, null, 2), 'utf8');
  console.log('Wrote component-catalog.json');
}
