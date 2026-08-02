---
'@mtdt/nextgen-design-system': minor
---

Ship `AGENTS.md`, `CAPABILITIES.md` and `capability-catalog.json` in the package.

`AGENTS.md` is the set of rules an AI coding agent must follow inside a project that consumes this
system: search the catalogue before building, never invent a colour or a size, import the
stylesheet, log anything genuinely missing to `DESIGN-SYSTEM-GAPS.md`, and check the work twice
with grep rather than by eye.

Point a consuming project's agent at it once and the constraints travel with the version:

```
Follow the rules in node_modules/@mtdt/nextgen-design-system/AGENTS.md
```

The catalogue ships alongside it because a rule to "use the design system's component" is
unenforceable if there is nothing to check against — an agent with no catalogue guesses from type
definitions, and guesses that a component is missing.
