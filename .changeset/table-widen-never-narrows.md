---
'@mtdt/nextgen-design-system': patch
---

DataTable: widening one column never narrows another. At rest the content columns share the card's spare width; the first drag freezes every column at its rendered width, after which the elastic tail takes the spare and the table scrolls sideways when the columns outgrow the card. Reset columns brings the sharing back. useTableColumns gains hasAnyWidth and setWidths; TableColGroup takes a tail width.
