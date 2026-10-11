---
'@mtdt/nextgen-design-system': minor
---

Icon draws a 1.5 line by default (was 2).

The console's design review of 2026-10-11 picked the thinner line for every icon. A
caller that wants the heavier line still passes `strokeWidth={2}`.
