#!/usr/bin/env node
/**
 * A pull request that changes what a consumer gets needs a changeset.
 *
 * "User-facing" here means one thing precisely: **does the published package
 * come out different?** That is `src/`, minus the files that never ship - tests,
 * stories, docs, and the dev harness - plus the two config files that decide
 * what the bundle and the stylesheet contain.
 *
 * Everything else is exempt because nothing about it reaches npm. A README fix,
 * a story, a workflow, a plan document: none of them change a byte of the
 * tarball, and demanding a version bump for them teaches people that the gate
 * is noise. A gate people learn to route around is worse than no gate - the
 * same reasoning `check:tokens` uses for not blocking on old violations.
 */
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';

const base = process.env.BASE ?? 'main';

if (process.env.SKIP === 'true') {
  process.stdout.write('Labelled `no changeset`. Skipping, and the label is the record of that.\n');
  process.exit(0);
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' }).trim();

// The merge base, not the tip: comparing against a moving `main` would flag
// files somebody else changed while this branch was open.
const mergeBase = git('merge-base', `origin/${base}`, 'HEAD');
const changed = git('diff', '--name-only', mergeBase, 'HEAD').split('\n').filter(Boolean);

/** Does this path end up in the published package? */
const shipped = (file) => {
  if (/\.(test|stories)\.(ts|tsx)$/.test(file)) return false;
  if (file === 'src/dev.tsx') return false;
  if (file.startsWith('src/docs/')) return false;
  if (file.endsWith('.mdx')) return false;
  if (file.startsWith('src/')) return true;
  // Everything else that can change the tarball without a component being
  // touched: the two configs that decide what the bundle and the stylesheet
  // contain, `package.json` because `files` and `exports` decide what is IN the
  // tarball at all, and the two files an agent reads to find out what exists.
  return [
    'tailwind.config.ts',
    'vite.config.ts',
    'package.json',
    'AGENTS.md',
    'CAPABILITIES.md',
    'capability-catalog.json',
  ].includes(file);
};

const facing = changed.filter(shipped);

if (facing.length === 0) {
  process.stdout.write('Nothing here changes the published package. No changeset needed.\n');
  process.exit(0);
}

const added = git('diff', '--name-only', '--diff-filter=A', mergeBase, 'HEAD')
  .split('\n')
  .filter((f) => f.startsWith('.changeset/') && f.endsWith('.md'));

if (added.length > 0) {
  process.stdout.write(`Found ${String(added.length)} changeset(s): ${added.join(', ')}\n`);
  process.exit(0);
}

const waiting = readdirSync('.changeset').filter((f) => f.endsWith('.md')).length;

process.stderr.write(
  `\nThis pull request changes the published package and has no changeset.\n\n` +
    `Files that reach npm:\n` +
    facing
      .slice(0, 12)
      .map((f) => `  ${f}\n`)
      .join('') +
    (facing.length > 12 ? `  ...and ${String(facing.length - 12)} more\n` : '') +
    `\nAdd one:\n\n  npm run changeset\n\n` +
    `It asks for a bump - patch, minor or major - and a sentence describing the\n` +
    `change for somebody reading the changelog rather than the diff. Commit the\n` +
    `file it writes into .changeset/ and push.\n\n` +
    `If this genuinely ships nothing - a rename with no behaviour change, say -\n` +
    `label the pull request \`no changeset\`. The label is the record of that\n` +
    `decision, which is why it is a label and not a silent pass.\n` +
    (waiting > 0
      ? `\n(${String(waiting)} changeset(s) already waiting for the next release.)\n`
      : '') +
    `\n`
);
process.exit(1);
