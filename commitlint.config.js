/**
 * Commit message conventions.
 *
 * Every rule here is level 1 (warn), not level 2 (error), which means a commit
 * is never rejected - you get a nudge and the commit goes through.
 *
 * That is deliberate. Conventional Commits exist to drive automated versioning
 * and changelogs, and this repository has never published a release. Blocking a
 * designer's "fix the toast spacing" to enforce a convention that feeds nothing
 * is friction with no payoff.
 *
 * The convention is still worth following - it makes `git log` scannable, and if
 * we ever do publish, changesets can read it. So the shape stays documented and
 * suggested, just not enforced:
 *
 *   feat: add the Card component
 *   fix: toast icon drifted when the text wrapped
 *   docs: write the designer guide
 *
 * If we start publishing to npm, raise these back to 2.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      1,
      'always',
      [
        'feat', // New feature
        'fix', // Bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code
        'refactor', // Code change that neither fixes a bug nor adds a feature
        'perf', // Performance improvement
        'test', // Adding missing tests or correcting existing tests
        'build', // Changes that affect the build system or external dependencies
        'ci', // Changes to CI configuration files and scripts
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],
    'subject-case': [1, 'always', 'lower-case'],
    'subject-empty': [1, 'never'],
    'subject-full-stop': [1, 'never', '.'],
    'type-case': [1, 'always', 'lower-case'],
    'type-empty': [1, 'never'],
    'header-max-length': [1, 'always', 100],
    'body-max-line-length': [1, 'always', 100],
  },
};
