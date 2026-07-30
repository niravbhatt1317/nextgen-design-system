#!/usr/bin/env node
/**
 * Token checker.
 *
 * Scans shipped component source for design decisions that are NOT backed by a
 * design token, and reports where each one lives.
 *
 * It reports two different things:
 *
 *   VIOLATIONS          A hardcoded value that should never have been written -
 *                       a raw colour, an arbitrary size, an inline style.
 *                       These break the token rule today.
 *
 *   UNTOKENISED         A whole category the system has no tokens for yet, so
 *                       components fall back to framework defaults (shadow,
 *                       z-index, spacing, type scale, opacity, motion...).
 *                       Not the author's fault - the token simply doesn't exist.
 *
 * Usage:
 *   node scripts/check-tokens.mjs              report only, always exits 0
 *   node scripts/check-tokens.mjs --strict     exits 1 if any VIOLATION is found
 *   node scripts/check-tokens.mjs --markdown   also writes TOKEN-REPORT.md
 *
 * Report mode is the default on purpose: the codebase has known violations
 * today, and turning this into a hard gate before they are fixed would block
 * every push. Switch CI to --strict once the count reaches zero.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCAN_DIR = join(ROOT, 'src', 'components');

/** Files that describe or test components rather than ship them. */
const EXCLUDED_FILE = /\.(stories|test|spec)\.[jt]sx?$/;
/** Generated icon components - hundreds of files, all machine-written. */
const EXCLUDED_PATH = [join('Icon', 'icons')];

// ---------------------------------------------------------------------------
// Rules
// ---------------------------------------------------------------------------

/**
 * Hardcoded values. Each of these is a decision that escaped the token system.
 */
const VIOLATION_RULES = [
  {
    id: 'raw-colour',
    category: 'Colour',
    label: 'Raw colour code',
    // #fff / #ffffff / #ffffffff, but not a CSS id selector or a hash route
    pattern: /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3}(?:[0-9a-fA-F]{2})?)?\b/g,
    hint: 'Use a semantic colour token, e.g. mdt-bg-primary',
  },
  {
    id: 'raw-colour-fn',
    category: 'Colour',
    label: 'Raw rgb()/hsl() colour',
    pattern: /\b(?:rgba?|hsla?)\(\s*\d/g,
    hint: 'Use a semantic colour token instead of a literal colour',
  },
  {
    id: 'arbitrary-value',
    category: 'Sizing',
    label: 'Arbitrary size in a class',
    // Only flag a real hardcoded length: mdt-w-[300px], mdt-min-w-[8rem], mdt-text-[10px].
    //
    // Deliberately NOT flagged, because none of these is a design decision:
    //   mdt-w-[var(--radix-popover-trigger-width)]  - reads a value from Radix at runtime
    //   mdt-rounded-[inherit]                       - CSS keyword
    //   mdt-left-[50%] / mdt-translate-x-[-50%]     - the standard centring technique
    pattern: /\bmdt-[a-z0-9-]*-\[-?\d*\.?\d+(?:px|rem|em)\]/g,
    hint: 'Add a size token rather than writing the value inline',
  },
  {
    id: 'arbitrary-colour',
    category: 'Colour',
    label: 'Raw colour in a class',
    pattern: /\bmdt-[a-z0-9-]*-\[#[0-9a-fA-F]{3,8}\]/g,
    hint: 'Use a semantic colour token, e.g. mdt-bg-primary',
  },
  {
    id: 'inline-style-value',
    category: 'Sizing',
    label: 'Hardcoded value in an inline style',
    pattern: /style=\{\{[^}]*?\b\d+(?:px|rem|em)\b/g,
    hint: 'Move the value into a token and apply it with a class',
  },
];

/**
 * Categories the design system has no tokens for. Components use the CSS
 * framework's defaults, which means these values were never designed.
 * See MISSING-TOKENS.md.
 */
const UNTOKENISED_RULES = [
  {
    id: 'elevation',
    category: 'Elevation / shadow',
    pattern: /\bmdt-shadow(?:-[a-z0-9]+)?\b/g,
  },
  {
    id: 'layering',
    category: 'Layering / z-index',
    pattern: /\bmdt-z-[a-z0-9]+\b/g,
  },
  {
    id: 'opacity',
    category: 'Opacity',
    pattern: /\bmdt-opacity-[0-9]+\b/g,
  },
  {
    id: 'motion',
    category: 'Motion (duration / easing)',
    pattern: /\bmdt-(?:duration-[0-9]+|ease-[a-z-]+)\b/g,
  },
  {
    id: 'border-width',
    category: 'Border width',
    pattern: /\bmdt-border-[0-9]+\b/g,
  },
  {
    id: 'type-size',
    category: 'Type scale (size)',
    // deliberately only the scale steps, not mdt-text-primary (a colour token)
    pattern: /\bmdt-text-(?:xs|sm|base|lg|xl|[2-9]xl)\b/g,
  },
  {
    id: 'font-weight',
    category: 'Font weight',
    pattern: /\bmdt-font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/g,
  },
  {
    id: 'letter-spacing',
    category: 'Letter spacing',
    pattern: /\bmdt-tracking-[a-z]+\b/g,
  },
  {
    id: 'line-height',
    category: 'Line height',
    pattern: /\bmdt-leading-[a-z0-9]+\b/g,
  },
  {
    id: 'spacing',
    category: 'Spacing',
    pattern: /\bmdt-(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y)-[0-9.]+\b/g,
  },
];

// ---------------------------------------------------------------------------
// Scanning
// ---------------------------------------------------------------------------

function collectFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectFiles(full));
      continue;
    }
    if (!/\.[jt]sx?$/.test(entry)) continue;
    if (EXCLUDED_FILE.test(entry)) continue;
    if (EXCLUDED_PATH.some((p) => full.includes(sep + p + sep))) continue;
    out.push(full);
  }
  return out;
}

function scanFile(file) {
  const rel = relative(ROOT, file).split(sep).join('/');
  const lines = readFileSync(file, 'utf8').split(/\r?\n/);
  const violations = [];
  const untokenised = [];

  lines.forEach((line, i) => {
    // Skip comment-only lines - examples in docblocks are not shipped styling
    const trimmed = line.trim();
    if (trimmed.startsWith('*') || trimmed.startsWith('//')) return;

    for (const rule of VIOLATION_RULES) {
      for (const m of line.matchAll(rule.pattern)) {
        violations.push({
          file: rel,
          line: i + 1,
          rule: rule.id,
          category: rule.category,
          label: rule.label,
          match: m[0],
          hint: rule.hint,
        });
      }
    }

    for (const rule of UNTOKENISED_RULES) {
      for (const m of line.matchAll(rule.pattern)) {
        untokenised.push({
          file: rel,
          line: i + 1,
          rule: rule.id,
          category: rule.category,
          match: m[0],
        });
      }
    }
  });

  return { violations, untokenised };
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------

function groupBy(items, key) {
  const map = new Map();
  for (const item of items) {
    const k = item[key];
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  }
  return map;
}

function componentOf(file) {
  const m = file.match(/src\/components\/([^/]+)\//);
  return m ? m[1] : file;
}

function printReport(violations, untokenised, fileCount) {
  const line = '-'.repeat(72);

  console.log('');
  console.log('Design token check');
  console.log(line);
  console.log(`Scanned ${fileCount} shipped component files`);
  console.log('');

  // --- Violations ---
  console.log(`VIOLATIONS - hardcoded values that break the token rule: ${violations.length}`);
  console.log(line);
  if (violations.length === 0) {
    console.log('  None. Every value comes from a token.');
  } else {
    for (const [category, items] of groupBy(violations, 'category')) {
      console.log(`\n  ${category} (${items.length})`);
      for (const v of items) {
        console.log(`    ${v.file}:${v.line}  ${v.match}`);
      }
      console.log(`    -> ${items[0].hint}`);
    }
  }

  // --- Untokenised ---
  console.log('');
  console.log(`UNTOKENISED CATEGORIES - no token exists yet: ${untokenised.length} uses`);
  console.log(line);
  const byCategory = groupBy(untokenised, 'category');
  const rows = [...byCategory.entries()]
    .map(([category, items]) => ({
      category,
      uses: items.length,
      components: new Set(items.map((i) => componentOf(i.file))).size,
      values: [...new Set(items.map((i) => i.match))].sort(),
    }))
    .sort((a, b) => b.uses - a.uses);

  for (const r of rows) {
    console.log(`\n  ${r.category}`);
    console.log(`    ${r.uses} uses across ${r.components} components`);
    console.log(`    distinct values: ${r.values.join(', ')}`);
  }

  console.log('');
  console.log(line);
  console.log(`Summary: ${violations.length} violations, ${rows.length} untokenised categories`);
  console.log('See MISSING-TOKENS.md for the proposed tokens for each category.');
  console.log('');

  return rows;
}

function writeMarkdown(violations, untokenised, rows, fileCount) {
  const out = [];
  out.push('# Token Report');
  out.push('');
  out.push('Generated by `npm run check:tokens -- --markdown`. Do not edit by hand.');
  out.push('');
  out.push(`Scanned **${fileCount}** shipped component files.`);
  out.push('');
  out.push(`- **${violations.length}** violations — hardcoded values that break the token rule`);
  out.push(`- **${rows.length}** untokenised categories — no token exists yet`);
  out.push('');
  out.push('---');
  out.push('');

  out.push('## Violations — where the token rule is broken today');
  out.push('');
  if (violations.length === 0) {
    out.push('None. Every value comes from a token.');
  } else {
    for (const [category, items] of groupBy(violations, 'category')) {
      out.push(`### ${category} — ${items.length}`);
      out.push('');
      out.push('| File | Line | Value | Fix |');
      out.push('| --- | --- | --- | --- |');
      for (const v of items) {
        out.push(`| \`${v.file}\` | ${v.line} | \`${v.match}\` | ${v.hint} |`);
      }
      out.push('');
    }
  }

  out.push('---');
  out.push('');
  out.push('## Untokenised categories — where a token is missing');
  out.push('');
  out.push('| Category | Uses | Components | Distinct values in use |');
  out.push('| --- | --- | --- | --- |');
  for (const r of rows) {
    out.push(
      `| ${r.category} | ${r.uses} | ${r.components} | ${r.values.map((v) => `\`${v}\``).join(' ')} |`
    );
  }
  out.push('');

  for (const [category, items] of groupBy(untokenised, 'category')) {
    out.push(`### ${category}`);
    out.push('');
    out.push('| File | Line | Value |');
    out.push('| --- | --- | --- |');
    for (const i of items) {
      out.push(`| \`${i.file}\` | ${i.line} | \`${i.match}\` |`);
    }
    out.push('');
  }

  writeFileSync(join(ROOT, 'TOKEN-REPORT.md'), out.join('\n'), 'utf8');
  console.log('Wrote TOKEN-REPORT.md');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const strict = args.includes('--strict');
const markdown = args.includes('--markdown');

const files = collectFiles(SCAN_DIR);
const allViolations = [];
const allUntokenised = [];

for (const file of files) {
  const { violations, untokenised } = scanFile(file);
  allViolations.push(...violations);
  allUntokenised.push(...untokenised);
}

const rows = printReport(allViolations, allUntokenised, files.length);

if (markdown) {
  writeMarkdown(allViolations, allUntokenised, rows, files.length);
}

if (strict && allViolations.length > 0) {
  console.error(`FAILED: ${allViolations.length} token violations. Fix them or add the tokens.`);
  process.exit(1);
}
