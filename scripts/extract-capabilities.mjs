#!/usr/bin/env node
/**
 * Lists everything this library can already do.
 *
 * `component-catalog.json` answers "what does Button look like" - it reads CVA
 * definitions, so it covers the 35 components that have variants and none of
 * the behaviour. Dragging a column, freezing one, holding a selection across a
 * filter, working out which page numbers to show: all of that lives in hooks
 * and plain functions, and until this script none of it was written down
 * anywhere a person or a model could search.
 *
 * That gap is not academic. `DataTable` was built with a hand-rolled pager
 * while `Pagination` sat in the library, and shipped without the column
 * controls and bulk actions that had been built for it weeks earlier. Both were
 * caught in review by the design owner rather than by anything automatic.
 *
 * The catalogue is generated rather than written by hand, because a
 * hand-written inventory is out of date within a fortnight and then actively
 * misleads - it says a thing is missing that is not, which is exactly the
 * mistake it exists to prevent.
 *
 * Usage:
 *   node scripts/extract-capabilities.mjs           human-readable summary
 *   node scripts/extract-capabilities.mjs --write   write the catalogue files
 *   node scripts/extract-capabilities.mjs --find drag column
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname, basename, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const COMPONENTS_DIR = join(ROOT, 'src', 'components');
const UTILS_DIR = join(ROOT, 'src', 'utils');

const EXCLUDED_FILE = /\.(test|spec|types|classes)\.[jt]sx?$/;
const STORY_FILE = /\.stories\.[jt]sx?$/;
// Barrels re-export what other files define, so scanning them lists everything
// twice - once with its JSDoc and once without, since the doc lives with the
// declaration. The definition is the source of truth.
const EXCLUDED_NAME = /^index\.[jt]sx?$/;
// 1209 generated icon files, each an export. They are one capability - "icons"
// - not 1209, and listing them would bury everything else.
const EXCLUDED_PATH = [join('Icon', 'icons')];

/** Anything exported whose name says it is not a thing you reuse. */
const NOT_A_CAPABILITY = /^(default|__)/;

const walk = (dir, found = []) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = relative(ROOT, full);
    if (EXCLUDED_PATH.some((part) => rel.includes(part))) continue;
    if (statSync(full).isDirectory()) walk(full, found);
    else if (/\.[jt]sx?$/.test(entry) && !EXCLUDED_FILE.test(entry) && !EXCLUDED_NAME.test(entry))
      found.push(full);
  }
  return found;
};

/**
 * The first sentence of a JSDoc block, flattened to one line.
 *
 * The first sentence is the summary by convention in this codebase - every
 * exported thing opens with "TableBulkBar - what you can do with the rows you
 * have selected." and then argues for itself over three paragraphs. The
 * argument is worth reading and useless in a list.
 */
const flatten = (block) =>
  block
    .split('\n')
    .map((line) => line.replace(/^\s*\/?\*+\/?/, '').trim())
    .filter((line) => line !== '' && !line.startsWith('@'))
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ');

/**
 * The first sentence, for showing. The rest is kept for searching.
 *
 * Searching summaries alone was not enough: "drag" appears in the third
 * paragraph of `useColumnReorder` and nowhere in its first sentence, so a
 * search for the very thing the hook does found nothing.
 */
const summarise = (text) => {
  if (text === '') return '';
  const end = text.search(/\.(\s|$)/);
  return end === -1 ? text : text.slice(0, end + 1);
};

/** How much of the documentation to keep for searching. */
const DOC_LIMIT = 1200;

const KIND_PATTERNS = [
  { kind: 'hook', test: (name) => /^use[A-Z]/.test(name) },
  { kind: 'variants', test: (name) => /[Vv]ariants$/.test(name) },
  // SCREAMING_CASE. A number someone settled on, not a thing to reuse - and
  // listing 40 of them buries the 12 hooks that are the whole point.
  { kind: 'constant', test: (name) => /^[A-Z0-9_]+$/.test(name) },
  { kind: 'component', test: (name) => /^[A-Z]/.test(name) },
  { kind: 'utility', test: () => true },
];

/** Catalogued elsewhere, or not a thing anyone reuses. */
const NOT_LISTED = new Set(['variants', 'constant']);

const kindOf = (name) => KIND_PATTERNS.find((entry) => entry.test(name)).kind;

/**
 * Every exported name in a file, with the JSDoc that sits above it.
 *
 * Deliberately regex rather than a parser. The declarations in this codebase
 * are uniform - `export function`, `export const`, and `const X = forwardRef`
 * followed by a bare `export { X }` - and a TypeScript parser is a dependency
 * and a build step for something that has to stay this cheap to run.
 */
/**
 * Property names from the sibling `.types.ts`, per interface.
 *
 * Props are where half the behaviour is declared. `frozen` and `sticky` are
 * props on `TableHead`, so a catalogue built only from exported names cannot
 * answer "do we already freeze a column" - which is exactly the kind of
 * question that ends in something being built twice.
 */
const readProps = (file) => {
  const types = file.replace(/\.tsx?$/, '.types.ts');
  const byInterface = new Map();
  let source;
  try {
    source = readFileSync(types, 'utf8');
  } catch {
    return byInterface;
  }
  for (const match of source.matchAll(/interface\s+([A-Za-z_$][\w$]*)\s*(?:extends[^{]+)?\{/g)) {
    const start = match.index + match[0].length;
    // To the matching close brace, counting depth so a nested object type does
    // not end the interface early.
    let depth = 1;
    let end = start;
    while (end < source.length && depth > 0) {
      if (source[end] === '{') depth += 1;
      if (source[end] === '}') depth -= 1;
      end += 1;
    }
    const body = source.slice(start, end - 1);
    const names = [...body.matchAll(/^\s*(?:\/\*\*[\s\S]*?\*\/\s*)?'?([a-zA-Z_$][\w$-]*)'?\??\s*:/gm)].map(
      (prop) => prop[1]
    );
    byInterface.set(match[1], [...new Set(names)]);
  }
  return byInterface;
};

const readFile = (file) => {
  const source = readFileSync(file, 'utf8');
  const props = readProps(file);
  const found = new Map();

  // A JSDoc block followed by a declaration, exported inline or not.
  //
  // The block must not contain `*/`. A plain lazy `[\s\S]*?` looks lazy and is
  // not: faced with a JSDoc above an `interface`, which this does not match, it
  // runs straight through the closing `*/` to the next `const` and hands that
  // function the interface's documentation. `useTableColumns` was described as
  // "A column, as far as the layout is concerned" for exactly this reason.
  const documented =
    /\/\*\*((?:(?!\*\/)[\s\S])*?)\*\/\s*(?:export\s+)?(?:const|function|class)\s+([A-Za-z_$][\w$]*)/g;
  for (const match of source.matchAll(documented)) {
    const [, block, name] = match;
    if (NOT_A_CAPABILITY.test(name)) continue;
    found.set(name, flatten(block));
  }

  // What the file actually offers. A documented const that is never exported is
  // an implementation detail, and offering it as reusable would be a lie.
  const exported = new Set();
  for (const match of source.matchAll(/export\s+(?:const|function|class)\s+([A-Za-z_$][\w$]*)/g)) {
    exported.add(match[1]);
  }
  for (const match of source.matchAll(/export\s*\{([^}]*)\}/g)) {
    for (const part of match[1].split(',')) {
      const name = part.split(/\s+as\s+/)[0].trim();
      if (name !== '' && !name.startsWith('type ')) exported.add(name);
    }
  }

  return [...exported]
    .filter((name) => !NOT_A_CAPABILITY.test(name))
    .map((name) => ({
      name,
      kind: kindOf(name),
      file: relative(ROOT, file).split(sep).join('/'),
      area: relative(COMPONENTS_DIR, dirname(file)).split(sep)[0] || basename(dirname(file)),
      summary: summarise(found.get(name) ?? ''),
      doc: (found.get(name) ?? '').slice(0, DOC_LIMIT),
      props: props.get(`${name}Props`) ?? [],
    }));
};

/**
 * Every story, as a capability in its own right.
 *
 * Two of the four things built twice here were stories, not components - a
 * second Selectable Rows and a second Empty State, both next to the originals.
 * "Have we already shown this" is the same question as "do we already have
 * this", and a catalogue that skips stories cannot answer it.
 */
const readStories = (file) => {
  const source = readFileSync(file, 'utf8');
  const title = /title:\s*'([^']+)'/.exec(source)?.[1] ?? '';
  return [...source.matchAll(/export\s+const\s+([A-Za-z_$][\w$]*)\s*:\s*Story/g)].map((match) => ({
    name: match[1],
    kind: 'story',
    file: relative(ROOT, file).split(sep).join('/'),
    area: title.split('/').pop() || basename(dirname(file)),
    summary: title === '' ? '' : `Story: ${title} / ${match[1]}`,
    doc: `${title} ${match[1]}`,
    props: [],
  }));
};

const collect = () => {
  const files = [...walk(COMPONENTS_DIR), ...walk(UTILS_DIR)];
  const all = [
    ...files.filter((file) => !STORY_FILE.test(file)).flatMap(readFile),
    ...files.filter((file) => STORY_FILE.test(file)).flatMap(readStories),
  ];

  // Variants are catalogued in full by extract-variants.mjs; repeating them
  // here would double the length for no new answer.
  const listed = all.filter((entry) => !NOT_LISTED.has(entry.kind));

  // One entry per name. A component and its sub-parts can be declared across
  // files, and the one carrying the documentation is the one worth keeping.
  const byName = new Map();
  for (const entry of listed) {
    // Stories are keyed by their area too: a dozen components each have a
    // story called Default, and they are a dozen different things.
    const key = entry.kind === 'story' ? `${entry.area}/${entry.name}` : entry.name;
    const existing = byName.get(key);
    if (existing === undefined || (existing.doc === '' && entry.doc !== '')) {
      byName.set(key, entry);
    }
  }

  const capabilities = [...byName.values()].sort((a, b) => a.name.localeCompare(b.name));

  const counts = {};
  for (const entry of capabilities) counts[entry.kind] = (counts[entry.kind] ?? 0) + 1;
  return { capabilities, counts };
};

/**
 * Words that mean the same thing here, because English does not.
 *
 * Substring matching bridges "sort" and "sorting" for free; nothing bridges
 * "freeze" and "frozen". Searching for the thing you want to do and being told
 * it does not exist - when it does, under its past participle - is the failure
 * this whole catalogue is meant to prevent, so the handful of irregular pairs
 * are listed rather than left to chance. Only add a pair after a real search
 * has missed.
 */
const SYNONYMS = {
  freeze: ['frozen', 'pin'],
  frozen: ['freeze', 'pin'],
  pin: ['frozen', 'freeze'],
  stick: ['sticky'],
  hide: ['hidden', 'hiding', 'visibility'],
  show: ['visible', 'showing', 'visibility'],
  reorder: ['move', 'drag'],
  paging: ['pagination', 'page'],
  pager: ['pagination', 'page'],
  choose: ['select', 'picker'],
};

/**
 * Splits camelCase so word-boundary matching can see inside a name.
 *
 * `\buseColumnReorder` has no boundary before "Column" - "eC" is two word
 * characters - so searching "column reorder" found nothing while the hook sat
 * there named after the search. Every identifier in this codebase is camelCase
 * or PascalCase, so this is not an edge case, it is all of them.
 */
const words = (text) => text.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

/** Finds capabilities by name, area, documentation or props. What the rule tells you to run. */
const find = (terms, capabilities) => {
  // Matched at the start of a word, not anywhere in one. Plain substring
  // matching made "pin" hit "spinner" and "sort" hit "assorted"; a prefix at a
  // word boundary still bridges sort/sorting/sorted, which is the whole reason
  // not to demand exact words.
  const needles = terms.map((term) => {
    const word = term.toLowerCase();
    return [word, ...(SYNONYMS[word] ?? [])].map(
      (needle) => new RegExp(`\\b${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
    );
  });
  const matches = capabilities.filter((entry) => {
    const haystack = words(
      `${entry.name} ${entry.area} ${entry.doc} ${entry.props.join(' ')}`
    ).toLowerCase();
    // Every term must appear, but any of its synonyms will do.
    return needles.every((group) => group.some((needle) => needle.test(haystack)));
  });

  // A match on the name beats one on a prop, which beats one buried in the
  // third paragraph. Without this, searching "pager" puts Card above DataTable
  // because "page" appears in both and the list is alphabetical.
  const rank = (entry) => {
    const name = words(entry.name).toLowerCase();
    const props = words(entry.props.join(' ')).toLowerCase();
    if (needles.every((group) => group.some((needle) => needle.test(name)))) return 0;
    if (needles.every((group) => group.some((needle) => needle.test(props)))) return 1;
    return 2;
  };

  return matches.sort((a, b) => rank(a) - rank(b) || a.name.localeCompare(b.name));
};

const KIND_ORDER = ['component', 'hook', 'utility', 'story'];
const KIND_PLURAL = {
  component: 'components',
  hook: 'hooks',
  utility: 'utilities',
  story: 'stories',
};
const KIND_TITLE = {
  component: 'Components',
  hook: 'Hooks - the behaviour',
  utility: 'Utilities',
  story: 'Stories - what has already been shown',
};

const toMarkdown = ({ capabilities, counts }) => {
  const lines = [
    '# What this library can already do',
    '',
    '**Generated by `npm run catalog`. Do not edit by hand.**',
    '',
    'Search this before building anything. It exists because the same mistake',
    'kept being made: a pager was hand-rolled while `Pagination` sat in the',
    'library, and a `DataTable` shipped without the column controls that had',
    'been built for it weeks earlier.',
    '',
    '`component-catalog.json` answers *what does this look like* - every CVA',
    'variant and its allowed values. This file answers *what can this already',
    'do*, which is the question that keeps getting skipped.',
    '',
    'Nothing here is enforced by CI. It reports, like `check:tokens` does.',
    '',
    '**Stories are not listed below** - there are hundreds of them, and they would',
    'bury the handful of hooks that are the whole point of this file. They are still',
    'searchable, which is what matters: `npm run find -- selectable rows` finds the',
    'story that already exists. They are in `capability-catalog.json` in full.',
    '',
    `${String(capabilities.length)} capabilities: ` +
      KIND_ORDER.filter((kind) => counts[kind])
        .map((kind) => `${String(counts[kind])} ${KIND_PLURAL[kind]}`)
        .join(', '),
    '',
  ];

  for (const kind of KIND_ORDER) {
    if (kind === 'story') continue;
    const group = capabilities.filter((entry) => entry.kind === kind);
    if (group.length === 0) continue;
    lines.push(`## ${KIND_TITLE[kind]}`, '');
    lines.push('| Name | Where | What it does |', '| --- | --- | --- |');
    for (const entry of group) {
      const summary = entry.summary === '' ? '_undocumented_' : entry.summary.replace(/\|/g, '\\|');
      lines.push(`| \`${entry.name}\` | ${entry.area} | ${summary} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
};

const args = process.argv.slice(2);
const { capabilities, counts } = collect();

if (args[0] === '--find') {
  const matches = find(args.slice(1), capabilities);
  if (matches.length === 0) {
    console.log('Nothing matches. Log it in COMPONENT-GAP.md and say so before building it.');
  } else {
    for (const entry of matches) {
      console.log(`${entry.name.padEnd(28)} ${entry.kind.padEnd(10)} ${entry.file}`);
      if (entry.summary !== '') console.log(`${' '.repeat(28)} ${entry.summary}`);
    }
  }
} else if (args.includes('--write')) {
  writeFileSync(
    join(ROOT, 'capability-catalog.json'),
    `${JSON.stringify(
      {
        generatedFrom: 'src/components and src/utils (exports + JSDoc)',
        generatedBy: 'scripts/extract-capabilities.mjs',
        capabilityCount: capabilities.length,
        counts,
        capabilities,
      },
      null,
      2
    )}\n`,
    'utf8'
  );
  writeFileSync(join(ROOT, 'CAPABILITIES.md'), `${toMarkdown({ capabilities, counts })}\n`, 'utf8');
  console.log(`Wrote capability-catalog.json and CAPABILITIES.md - ${String(capabilities.length)} capabilities.`);
} else {
  console.log(`${String(capabilities.length)} capabilities`);
  for (const kind of KIND_ORDER) {
    if (counts[kind]) console.log(`  ${String(counts[kind]).padStart(3)} ${KIND_PLURAL[kind]}`);
  }
  const undocumented = capabilities.filter(
    (entry) => entry.doc === '' && entry.kind !== 'story'
  );
  if (undocumented.length > 0) {
    console.log(`\n${String(undocumented.length)} undocumented - unsearchable, so effectively missing:`);
    for (const entry of undocumented.slice(0, 20)) console.log(`  ${entry.name}  ${entry.file}`);
    if (undocumented.length > 20) console.log(`  ... and ${String(undocumented.length - 20)} more`);
  }
}
