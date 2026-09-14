---
'@mtdt/nextgen-design-system': patch
---

DataTable: the Name column resizes like any content column - drag or arrow keys on its heading, a floor of 160 (nameColumn.minWidth overrides it), the shared 720 ceiling, and the width is remembered under the table's storageKey with the other widths. The lead column (checkbox or row number) and Action stay fixed. useTableColumns gains hasWidth(key).
