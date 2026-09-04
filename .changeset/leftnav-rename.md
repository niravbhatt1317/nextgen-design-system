---
'@mtdt/nextgen-design-system': minor
---

**Breaking for anyone importing `LeftNav`.** The name now means the product navigation ported from the merged console: the workspace rail (account card, search, folder tree, pinned Settings) and beneath it the Settings and Agent Fleet floors reached through the crumb strip. It is exported from the package root as `LeftNav` with `LeftNavTrigger` and its types.

The previous settings-only navigation is `LeftNavOld` (`LeftNavOldProps`), deprecated and shown under `Deprecated/LeftNav Old` in Storybook; its parts (`LeftNavItem`, `LeftNavGroup`, `DataLeftNav`, `useLeftNavLevels`…) keep their names until the removal pull request. To keep the old look, rename the import; to move, see the LeftNav stories.
