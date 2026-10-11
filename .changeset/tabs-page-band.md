---
'@mtdt/nextgen-design-system': minor
---

Tabs: `hairline` on TabsList, the 25px chip, the paper chip, no panel margin.

`hairline={false}` draws a page band - no line under the tabs, the tabs stretched
to the band; a drawer band keeps its line, now neutral-30. The filled chip is 25px
in a track 3.5px in, and the active chip wears the background token so it holds in
dark. TabsContent has no top margin of its own - the surface decides.
