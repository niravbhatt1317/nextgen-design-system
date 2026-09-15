---
'@mtdt/nextgen-design-system': minor
---

Deprecated: `AiMark`, `Callout`, `Item` and `OTPInput`.

All four still export and behave exactly as before, and are kept until 1.0.0 so callers can move without a breaking release. They move to `Deprecated/` in Storybook and carry an `@deprecated` note saying what to use instead — or saying plainly that nothing replaces them yet, which is the more useful answer when it is the true one.

- **`Callout` → use `Banner`.** The same tinted message from the same tone table, with six tones against Callout's three and the same `title`, `icon`, `actions` and `onDismiss`. Two components doing one thing is the second way to do it, which this library treats as a defect.
- **`AiMark` → nothing yet.** `Toast` still draws it for its `ai` tone, so it cannot simply go; that has to move first and nothing has been chosen for it to move to. For the AI treatment in new work the `Button` `ai` variant and the `ai` tone on `Banner` both supply their own mark.
- **`Item` → nothing; compose the row you need.** Every row that exists here — the dropdown's, the command palette's, the table's — builds its own.
- **`OTPInput` → nothing.** Length, resend and expiry are rules the sign-in flow owns, not a component library.
