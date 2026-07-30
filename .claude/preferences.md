# User Preferences

## Git Workflow

Claude runs git. Staging, committing, pushing, branches, pull requests — all of it, when asked.

This replaces an earlier rule that forbade Claude from touching git at all. That rule made sense
when this repository was developer-owned and a developer was doing the committing. The design team
owns it now, so the work and the commits are the same job.

**Still ask before anything outward-facing or hard to undo:**

- Pushing to `main` (see the branch rule below — normally you can't anyway)
- Creating or deleting a repository, or changing whether it is public
- Rewriting published history (`push --force`, rebasing anything already pushed)
- Adding or removing collaborators
- Publishing to npm

**Commit messages go through a file** — `git commit -F <message.txt>`. A long message passed inline
gets mis-parsed by the shell here and git fails with _"'/' is outside repository"_.

Conventional Commit prefixes (`feat:`, `fix:`, `docs:`…) are suggested but not enforced — see
`commitlint.config.js` for why.

## Branches

**`main` is protected. Never commit to it directly.** Every change goes through a branch and a pull
request, and CI has to be green before it can merge. That applies to one-word documentation fixes
too — the thirty seconds it costs is the whole safety net for a two-person team.

```bash
git checkout main && git pull
git checkout -b nirav/banner        # person/what-changed
# ... work ...
git add -A && git commit -F msg.txt
git push -u origin nirav/banner
gh pr create
```

**Branch naming is `person/what-changed`** — `nirav/banner`, `nirav/banner-spacing`,
`pranjal/stat-tile`. Named after the change, not the component, because a component gets touched
many times and three branches all called `nirav/banner` make the history unreadable.

**Branches are disposable.** A merged branch is deleted; its work lives in `main`. To change
something later, cut a new branch from current `main` rather than reopening the old one — the old
one is stale by definition and missing everything merged since.

Squash-merging makes git report a merged branch as "not fully merged" when deleting. It is a false
alarm: verify with `git diff <branch> main` (empty = landed), then `git branch -D`.

## My Role

- Design and implement components, tokens and documentation
- Run tests, builds, lint and typecheck — and report what actually happened, including failures
- Verify visual changes in a real browser, in **both** themes, not just in a green test run
- Handle git and GitHub
- Never mark work complete before the checks have actually run and passed
