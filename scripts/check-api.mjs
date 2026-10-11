#!/usr/bin/env node
/* THE PUBLIC API RATCHET - a name this package has published never disappears
 * by accident.
 *
 * WHY THIS EXISTS. 1.0.0 published `OPERATORS`, `isGroup`, `isComplete`,
 * `liveItems` and `matchRow`. The console imported the qualified forms -
 * `ADVANCED_FILTER_OPERATORS`, `isFilterGroup` and the rest - which a pull
 * request had carried and a fold of that pull request did not keep. Nothing
 * said so. Lint passed, 3,600 tests passed, the build passed, the package
 * published, and the first anyone knew was every table with More filters
 * failing to load in the console (2026-10-09).
 *
 * That class of break is mechanical, so it should be caught mechanically.
 *
 * HOW IT WORKS. `scripts/api-baseline.json` holds every name the package
 * exports. The check rebuilds that list from `dist/` and fails if anything in
 * the baseline is gone. Added names are free; the ratchet only turns one way.
 *
 *     npm run check:api                 compare dist/ against the baseline
 *     node scripts/check-api.mjs --record --reason "..."    move the baseline
 *
 * WHY A BASELINE FILE AND NOT A LOOKUP AGAINST npm. A gate that needs the
 * network fails when the network does, and a gate that fails for reasons
 * unrelated to the change is one people learn to route around - the same
 * reasoning `check:tokens` and the colour gate already follow here. The
 * baseline is also reviewable: a removal shows up as a line in the diff, which
 * a live lookup never would.
 *
 * WHAT IT READS. Two sources, because neither is complete on its own: the
 * `export declare` lines in `dist/index.d.ts` (types and values, 940 of them
 * today) and the runtime keys of `dist/index.cjs` (419, twelve of which never
 * appear in the declarations). The union is the surface a consumer can reach.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const BASELINE = join(here, 'api-baseline.json');
const require_ = createRequire(import.meta.url);

const DECLARED =
  /^export\s+declare\s+(?:abstract\s+)?(?:function|interface|type|const|let|var|class|enum|namespace)\s+([A-Za-z_$][\w$]*)/gm;

/** Every name a consumer can import from the package root, from both sources. */
const TOKEN = /(--mdt-[a-z0-9-]+)\s*:/g;

/** Every name a consumer can import, and every token they can read. */
function readApi() {
  const dts = join(root, 'dist/index.d.ts');
  const cjs = join(root, 'dist/index.cjs');
  const css = join(root, 'dist/styles.css');
  if (!existsSync(dts) || !existsSync(cjs) || !existsSync(css)) {
    console.error('check:api needs a build first - run `npm run build`.');
    process.exit(2);
  }
  const names = new Set();
  for (const [, name] of readFileSync(dts, 'utf8').matchAll(DECLARED)) names.add(name);
  for (const name of Object.keys(require_(cjs))) names.add(name);
  names.delete('default');

  /* THE TOKENS COUNT TOO (2026-10-10). The first version of this ratcheted the
   * JavaScript names and nothing else, which left a token free to vanish from
   * `styles.css` with every gate green - and a consumer's `hsl(var(--mdt-...))`
   * resolving to nothing, which paints no colour rather than erroring. The
   * console asked whether we had dropped one; answering it needed a hand
   * comparison of three tarballs, which is the shape of a question a gate
   * should already answer. 278 tokens today, none ever removed. */
  const tokens = new Set();
  for (const [, name] of readFileSync(css, 'utf8').matchAll(TOKEN)) tokens.add(name);

  return { names: [...names].sort(), tokens: [...tokens].sort() };
}

const { names: current, tokens: currentTokens } = readApi();
const args = process.argv.slice(2);
const record = args.includes('--record');
const reasonAt = args.indexOf('--reason');
const reason = reasonAt === -1 ? '' : (args[reasonAt + 1] ?? '');

const prior = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : null;
const priorTokens = prior?.tokens ?? [];
const removed = prior ? prior.names.filter((n) => !current.includes(n)) : [];
const removedTokens = priorTokens.filter((t) => !currentTokens.includes(t));
const added = prior ? current.filter((n) => !prior.names.includes(n)) : current;
const addedTokens = currentTokens.filter((t) => !priorTokens.includes(t));
/* One list for the refusal and the report: a dropped token breaks a consumer
 * the same way a dropped export does, only more quietly. */
const allRemoved = [...removed, ...removedTokens];

if (record) {
  // A removal is sometimes right - a deprecated family finally going. It is
  // never right by accident, so it has to be said out loud and is kept in the
  // file, the way the colour gate keeps its reasons.
  if (allRemoved.length && !reason) {
    console.error(
      `Refusing to record: ${String(allRemoved.length)} name(s) would be dropped from the public API.\n` +
        `  ${allRemoved.slice(0, 12).join(', ')}${allRemoved.length > 12 ? ', …' : ''}\n\n` +
        'If that is deliberate, say why:\n' +
        '  node scripts/check-api.mjs --record --reason "TableOld retired in 3.0.0"\n'
    );
    process.exit(1);
  }
  const reasons = prior?.reasons ?? {};
  if (reason) reasons[new Date().toISOString().slice(0, 10)] = reason;
  writeFileSync(
    BASELINE,
    `${JSON.stringify({ note: 'Every name the package exports and every token it defines. Generated by scripts/check-api.mjs --record. Nothing here may disappear without a reason.', recorded: new Date().toISOString().slice(0, 10), reasons, count: current.length, tokenCount: currentTokens.length, names: current, tokens: currentTokens }, null, 2)}\n`
  );
  console.log(
    `Recorded ${String(current.length)} public names and ${String(currentTokens.length)} tokens` +
      (added.length || addedTokens.length
        ? `, ${String(added.length)} new name(s) and ${String(addedTokens.length)} new token(s)`
        : '') +
      (allRemoved.length ? `, ${String(allRemoved.length)} dropped: ${reason}` : '') +
      '.'
  );
  process.exit(0);
}

if (!prior) {
  console.error('No baseline yet. Create it with:\n  node scripts/check-api.mjs --record\n');
  process.exit(1);
}

if (allRemoved.length) {
  console.error(
    `\n  ${String(allRemoved.length)} name(s) this package has published are gone from the build:\n\n` +
      removed.map((n) => `    ${n}`).join('\n') +
      (removed.length && removedTokens.length ? '\n' : '') +
      removedTokens.map((t) => `    ${t}   (a token - reads as no colour, not an error)`).join('\n') +
      '\n\n' +
      '  Every one of these is an import that stops working in somebody else\'s\n' +
      '  project, with no warning until it runs. If a name moved, export the old\n' +
      '  one beside the new one - both cost nothing. If it genuinely goes:\n\n' +
      '    node scripts/check-api.mjs --record --reason "why"\n'
  );
  process.exit(1);
}

console.log(
  `public API ok  ${String(current.length)} names and ${String(currentTokens.length)} tokens, none dropped` +
    (added.length || addedTokens.length
      ? `, ${String(added.length)} new name(s) and ${String(addedTokens.length)} new token(s)`
      : '') +
    ` (baseline ${String(prior.recorded)})`
);
