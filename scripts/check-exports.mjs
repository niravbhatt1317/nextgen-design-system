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

const barrel = readFileSync(BARREL, 'utf8');

/** Does the root barrel re-export anything at all from this directory? */
const isExported = (dir) => new RegExp(`from '\\./${dir}'`).test(barrel);

const components = readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  // A directory with no `index.ts` is not a component - it is a folder of parts
  // something else exports. Only a public face makes it a candidate.
  .filter((dir) => existsSync(`${ROOT}/${dir}/index.ts`));

const unreachable = components.filter((dir) => !isExported(dir));
const undeclared = unreachable.filter((dir) => !(dir in DELIBERATELY_UNEXPORTED));
const declared = unreachable.filter((dir) => dir in DELIBERATELY_UNEXPORTED);

if (declared.length > 0) {
  process.stdout.write(
    `${String(declared.length)} component(s) deliberately not exported:\n` +
      declared.map((d) => `  ${d} - ${DELIBERATELY_UNEXPORTED[d]}\n`).join('')
  );
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
