---
'@mtdt/nextgen-design-system': patch
---

The package can be built on Windows.

`scripts/build-package.mjs` spawned Tailwind through `npx`. On Windows the
executable is `npx.cmd`, and since the 2024 argument-injection fix Node refuses
to spawn a `.cmd` without `shell: true` - so the build stopped before it started,
and the console had to work around it by hand to package its own copy.

Tailwind's bin is a plain JavaScript file, so it is now run the way Node runs
anything: this interpreter, that file. No shell, no `.cmd`, no PATH lookup, and
the same behaviour on every platform. `shell: true` would also have fixed it, and
brought the quoting rules of two shells along with it.
