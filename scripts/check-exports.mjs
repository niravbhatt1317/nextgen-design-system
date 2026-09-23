#!/usr/bin/env node
/**
 * A component that exists but cannot be imported.
 *
 * `PageFrame` shipped in 0.5.0 with a changelog entry announcing it, and no
 * export from the package root. The bundle entry is `src/index.ts`, so nothing
 * unreachable from it reaches `dist/` - and the failure is silent in both
 * directions: the build succeeds, and `import { PageFrame }` returns `undefined`
 * with no error to say why. Two releases went out before anyone noticed.
 *
 * Every other check in this repository looks at code that IS wired up. Nothing
 * looked for code that is not.
 *
 * **Being unexported is not by itself a defect.** `LeftNavNew` was deliberately
 * unexported for weeks - it existed to be reviewed beside `LeftNav` before
 * becoming public, and shipping it early would have been the mistake. That is
 * why this is an allowlist rather than a ban: the question is never "is it
 * exported" but "did somebody decide".
 *
 * So an entry in `DELIBERATELY_UNEXPORTED` is the decision, written down, with
 * the reason and who to ask. An empty allowlist - which is where this starts -
 * means every component in the library is reachable.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const ROOT = 'src/components';
const BARREL = `${ROOT}/index.ts`;

/**
 * Components that exist, are not exported, and are meant not to be.
 *
 * Add one only when the answer to "should a product be able to import this?" is
 * a considered no. Say why, and say when it should be revisited - an entry with
 * no end in sight is how a parallel component becomes permanent.
 *
 * @type {Record<string, string>}
 */
const DELIBERATELY_UNEXPORTED = {
  // 'LeftNavNew': 'Parallel to LeftNav for side-by-side review; public once the
  //                comparison is settled. Removed in #64 - kept here as the
  //                worked example of what an entry should say.',
};

/**
 * Names a component publishes that are meant NOT to reach the package root.
 *
 * Keyed `Component: name`. Same rule as the directory list above - say why,
 * and say when to revisit.
 *
 * @type {Record<string, string>}
 */
const DELIBERATELY_UNEXPORTED_NAMES = {
  'Sidebar: DataDrivenSidebar':
    'Sidebar is deprecated in favour of LeftNav, so this would widen the public ' +
    'API of a family products are being moved off. It has been unreachable since ' +
    'it was written; this records that rather than changing it. Revisit when ' +
    'Sidebar is removed - it goes with it, or moves to LeftNav first.',
};

const barrel = readFileSync(BARREL, 'utf8');

/** Does the root barrel re-export anything at all from this directory? */
const isExported = (dir) => new RegExp(`from '\\./${dir}'`).test(barrel);

const components = readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  // A directory with no `index.ts` is not a component - it is a folder of parts
  // something else exports. Only a public face makes it a candidate.
  .filter((dir) => existsSync(`${ROOT}/${dir}/index.ts`));

/**
 * Every name a component's own `index.ts` publishes.
 *
 * Deliberately crude: the names in a `export { … }` block, one per line, which
 * is how every barrel in this repo is written. A name it misses is a name this
 * check does not police - that is the trade for not parsing TypeScript here.
 */
const namesExportedBy = (dir) => {
  const src = readFileSync(`${ROOT}/${dir}/index.ts`, 'utf8');
  // Skip `export type { … }`: a type that never reaches the root is a smaller
  // problem, and `isolatedModules` makes them easy to get wrong here.
  const valueBlocks = src.replace(/export\s+type\s*\{[^}]*\}/g, '');
  return [...valueBlocks.matchAll(/^\s{2}([A-Za-z_][A-Za-z0-9_]*)\s*,?\s*$/gm)].map((m) => m[1]);
};

const unreachable = components.filter((dir) => !isExported(dir));
const undeclared = unreachable.filter((dir) => !(dir in DELIBERATELY_UNEXPORTED));
const declared = unreachable.filter((dir) => dir in DELIBERATELY_UNEXPORTED);

if (declared.length > 0) {
  process.stdout.write(
    `${String(declared.length)} component(s) deliberately not exported:\n` +
      declared.map((d) => `  ${d} - ${DELIBERATELY_UNEXPORTED[d]}\n`).join('')
  );
}

/*
 * A directory can be reachable and still leak. PageFrame shipped in 0.5.0 with
 * no export at all, which the check above now catches; TableLeadHead and
 * TableLeadCell shipped in 0.6.0's changelog exported from Table/index.ts and
 * never forwarded from the root, which it did not. Same failure, one level
 * down: the build succeeds, the import returns undefined, and the changelog
 * announces a component nobody can use.
 */
/**
 * Does the barrel re-export this directory wholesale?
 *
 * `export * from './TableOld2'` makes every name in that barrel reachable
 * without naming any of them, so the per-name check below cannot see them and
 * would report every one as an orphan. A star export is a deliberate choice -
 * TableOld2 takes it because all 21 of its names already carry the suffix, so
 * there is nothing to clash with - and it is as reachable as a named one.
 */
const isStarExported = (dir) => new RegExp(`export \\* from '\\./${dir}'`).test(barrel);

const orphans = components
  .filter((dir) => isExported(dir) && !isStarExported(dir))
  .flatMap((dir) =>
    namesExportedBy(dir)
      .filter((name) => !new RegExp(`\\b${name}\\b`).test(barrel))
      .map((name) => `${dir}: ${name}`)
  )
  .filter((o) => !(o in DELIBERATELY_UNEXPORTED_NAMES));

if (orphans.length > 0) {
  process.stderr.write(
    `\n${String(orphans.length)} name(s) are exported by a component but never reach the root:\n\n` +
      orphans.map((o) => `  ${o}\n`).join('') +
      `\nEach is in its own component's index.ts, so it looks exported - but\n` +
      `${BARREL} names its re-exports one by one, and these are not among them.\n` +
      `\nAdd them to that file's block for the component.\n\n`
  );
  process.exit(1);
}

if (undeclared.length === 0) {
  process.stdout.write(
    `All ${String(components.length)} components are reachable from the package root.\n`
  );
  process.exit(0);
}

process.stderr.write(
  `\n${String(undeclared.length)} component(s) exist but cannot be imported:\n\n` +
    undeclared.map((d) => `  ${ROOT}/${d}/index.ts\n`).join('') +
    `\nEach has an \`index.ts\` of its own, so it has a public face - but nothing\n` +
    `re-exports it from ${BARREL}, so it never reaches \`dist/\` and\n` +
    `\`import { ... } from '@mtdt/nextgen-design-system'\` returns undefined. The\n` +
    `build succeeds either way, which is why this check exists.\n\n` +
    `Two ways to fix it:\n\n` +
    `  1. Export it. Add a block to ${BARREL}, following the\n` +
    `     component's own index.ts.\n\n` +
    `  2. Say it is deliberate. Add it to DELIBERATELY_UNEXPORTED in\n` +
    `     scripts/check-exports.mjs with the reason and when to revisit.\n` +
    `     A parallel component awaiting review is a good reason; "not finished\n` +
    `     yet" on something already in a changeset is not.\n\n`
);
process.exit(1);
