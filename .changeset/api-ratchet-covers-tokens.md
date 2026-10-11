---
'@mtdt/nextgen-design-system': patch
---

The public API ratchet now covers tokens as well as names.

`check:api` watched the JavaScript exports and nothing else, which left a token
free to vanish from `styles.css` with every gate green. A consumer's
`hsl(var(--mdt-gone))` resolves to nothing and paints no colour rather than
erroring, so it would have been found by eye, late.

The console asked whether we had dropped one. Answering took a hand comparison of
three published tarballs — which is the shape of a question a gate should already
answer. (We had not: 220 tokens in 0.5.1, 225 in 1.0.0, 278 in 2.0.0, none ever
removed.)

952 names and 278 tokens are baselined now. Nothing about the package changes for
a consumer.
