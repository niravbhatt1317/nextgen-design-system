**On session start:** If `HANDOFF.md` exists in this directory, read it before anything else for the latest state of the work.

# CLAUDE.md - AI Assistant Instructions

This file provides context and guidelines for AI assistants working on the Motadata React Library codebase.

## Project Overview

Production-ready React component library for building SaaS platforms. Provides accessible, customizable UI components built with modern React patterns.

**This repository is the design-team-owned copy.** The original lives on Azure DevOps
(`dev.azure.com/Motadata/NextGen/_git/motadata-react-library`) and is owned by developers. This
copy was moved to GitHub so designers can own it, and the CI was rebuilt to match. The wider goal
is an **AI-ready design system**: one whose primary consumer is a machine, so AI-generated UI comes
out on-system by default.

**Where this project lives:**

```
G:\Claude Project\Service_Ops\AI Ready Design System
```

Moved off `C:\Users\Pranjal Gupta\` on 2026-07-30. G is where the owner keeps every project, and
there is nothing left on C. Do not create a working copy anywhere else.

---

## Tech Stack

- **React 18+** with TypeScript strict mode
- **Tailwind CSS** with `mdt-` prefix for all classes
- **Radix UI** for accessible primitives
- **CVA** (Class Variance Authority) for variant management
- **Vite** for building
- **Vitest + React Testing Library** for testing
- **Storybook** for documentation, deployed to GitHub Pages on every push
- **GitHub Actions** for CI (`.github/workflows/`) - the Azure DevOps pipeline was removed
- **ESLint** with `eslint-plugin-sonarjs` for local quality checks

---

## 🚨 MANDATORY: Quality Standards

> **What actually runs here:** GitHub Actions (`.github/workflows/ci.yml`) - design token check,
> lint, typecheck, tests with coverage, library build, Storybook build. **SonarCloud and the Azure
> DevOps pipeline are not connected to this repository.** They still run against the original Azure
> DevOps repo, so if work is merged back there it must satisfy them.
>
> The standards below are kept in full because they are the bar this codebase was written to, and
> because code merged back to Azure DevOps still has to clear them. Treat them as the rules, and
> GitHub Actions as the gate that enforces most of them here.

All code MUST pass these before committing.

### Quality Gate — Build FAILS If Any Condition Is Violated

```
QUALITY GATE: Production Gate

FAIL IF:
├── Reliability
│   ├── New Bugs > 0
│   └── Reliability Rating < A
├── Security
│   ├── New Vulnerabilities > 0
│   ├── Unreviewed Security Hotspots > 0
│   └── Security Rating < A
├── Maintainability
│   ├── New Critical Code Smells > 0
│   ├── New Major Code Smells > 0
│   └── Maintainability Rating < B
├── Coverage
│   ├── Overall Code Coverage < 85%
│   └── Coverage on New Code < 85%
└── Duplication
    └── Duplications on New Code > 3%
```

### What This Means for Every Code Change

- **Every new/modified line** must be covered by tests (SonarCloud checks NEW code)
- **Zero new bugs** — no unreachable code, dead branches, self-assignments, nil risks
- **Zero new vulnerabilities** — no injection risks, no hardcoded credentials/IPs
- **Zero critical/major code smells** — no `any`, no unused vars, no high complexity
- **Duplication ≤ 3%** — no copy-pasted code blocks

---

## SonarQube Enforced Rules (React.js)

### Reliability (Bugs) — Zero Tolerance

- No unreachable or dead code
- No identical logic in conditional branches
- No duplicate conditions in `if / else if`
- No self-assigned variables
- No useless `if(true)` / `if(false)` blocks
- No infinite loops

### Security — Zero Tolerance

- No hardcoded credentials or secrets
- No hardcoded IP addresses
- No SQL/command/path injection patterns
- Weak cryptographic algorithms flagged
- Insecure random number generation flagged

### Maintainability & Complexity

- Cognitive complexity per function: **≤ 15** (recommended)
- No deeply nested `if`, `for`, `switch` statements
- No overly complex expressions

### Function Constraints

| Constraint                 | Threshold   | Enforcement |
| -------------------------- | ----------- | ----------- |
| Empty functions            | Not allowed | Blocker     |
| Identical implementations  | Not allowed | Blocker     |
| Maximum parameters         | 5           | Blocker     |
| Maximum lines per function | 80          | Blocker     |

### File Constraints

| Constraint             | Threshold | Enforcement |
| ---------------------- | --------- | ----------- |
| Maximum lines per file | 1000      | Blocker     |
| Maximum line length    | 150 chars | Warning     |

### Coding Standards

- No `any` types — use proper types or generics
- No unused variables or imports (prefix unused with `_`)
- Use `type` imports for type-only imports
- No redundant boolean checks (`if (flag === true)` → `if (flag)`)
- No empty nested blocks
- No magic numbers — use named constants
- No `console.log` — only `console.warn` / `console.error` allowed
- No duplicated string literals (< 3 occurrences)
- No duplicated code blocks (< 10 lines)
- `TODO` / `FIXME` must have linked issue reference
- Exported functions should have JSDoc documentation

### Prohibited Patterns

```tsx
// ❌ BLOCKED by SonarQube
const handler = (value: any) => {}; // any type
console.log('debug'); // console.log
const x = 3.14159; // magic number
if (flag === true) {
} // redundant boolean
const unused = 'hello'; // unused variable
function empty() {} // empty function
const API_KEY = 'sk-abc123'; // hardcoded secret

// ✅ CORRECT
const handler = (value: string | number) => {}; // proper type
console.warn('Deprecation notice'); // warn/error OK
const PI = 3.14159 as const; // named constant
if (flag) {
} // clean boolean
const _unused = 'hello'; // prefixed unused
const API_KEY = process.env.VITE_API_KEY; // env variable
```

---

## Key Conventions

### 1. CSS Classes

All Tailwind classes use `mdt-` prefix:

```tsx
// ✅ Correct
className = 'mdt-flex mdt-items-center mdt-bg-primary';

// ❌ Wrong
className = 'flex items-center bg-primary';
```

### 2. Semantic Colors

Always use semantic color names, never hardcoded:

```tsx
// ✅ Correct
'mdt-bg-primary mdt-text-primary-foreground';
'mdt-bg-secondary mdt-text-secondary-foreground';

// ❌ Wrong
'mdt-bg-blue-500 mdt-text-white';
```

Available: `primary`, `secondary`, `accent`, `destructive`, `muted`, `background`, `foreground`, `border`, `input`, `ring`

### 3. Component Naming

Simple names without prefix:

```typescript
// Component: Button (not MotadataButton)
// Variants: ButtonVariants
// Props: ButtonProps
// Types: ButtonVariantsType
```

---

## Component Structure

```
src/components/Button/
├── Button.tsx           # Main component
├── Button.types.ts      # TypeScript types
├── Button.test.tsx      # Unit tests (MANDATORY)
├── Button.stories.tsx   # Storybook stories
└── index.ts             # Exports
```

---

## Component Template

### Button.tsx

````tsx
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { ButtonProps } from './Button.types';

/**
 * Button component for user interactions.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">Click me</Button>
 * ```
 */
export const ButtonVariants = cva(
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-rounded-md mdt-font-medium mdt-transition-colors',
    'focus-visible:mdt-outline-none focus-visible:mdt-ring-2',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'mdt-bg-primary mdt-text-primary-foreground hover:mdt-bg-primary/90',
        secondary: 'mdt-bg-secondary mdt-text-secondary-foreground hover:mdt-bg-secondary/80',
      },
      size: {
        sm: 'mdt-h-8 mdt-px-3 mdt-text-sm',
        md: 'mdt-h-9 mdt-px-4 mdt-text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button ref={ref} className={cn(ButtonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export { Button };
````

### Button.types.ts

```tsx
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { ButtonVariants } from './Button';

export type ButtonVariantsType = VariantProps<typeof ButtonVariants>;

export interface ButtonProps extends ComponentPropsWithoutRef<'button'>, ButtonVariantsType {
  children: ReactNode;
}
```

### index.ts

```tsx
export { Button, ButtonVariants } from './Button';
export type { ButtonProps, ButtonVariantsType } from './Button.types';
```

---

## 🧪 Testing Guidelines — SonarQube Enforced

### Coverage Thresholds (MANDATORY)

| Metric     | Minimum | Current Baseline |
| ---------- | ------- | ---------------- |
| Statements | ≥ 85%   | 97.69%           |
| Branches   | ≥ 85%   | 95.43%           |
| Functions  | ≥ 85%   | 97.15%           |
| Lines      | ≥ 85%   | 98.20%           |

**SonarCloud checks coverage on NEW code.** Every line you add or modify MUST be tested.
**Overall coverage must NEVER decrease** below the current baseline.

### Test Structure

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Button className="custom">Click me</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom');
    });
  });

  describe('variants', () => {
    it('applies primary variant', () => {
      render(<Button variant="primary">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-bg-primary');
    });

    it('applies secondary variant', () => {
      render(<Button variant="secondary">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('mdt-bg-secondary');
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Click me</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not respond when disabled', () => {
      render(<Button disabled>Click me</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('accessibility', () => {
    it('forwards ref correctly', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });

    it('supports keyboard activation', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Test</Button>);
      screen.getByRole('button').focus();
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
```

### What MUST Be Tested (Every Component)

1. **Default rendering** — renders without crashing with required props only
2. **All prop variants** — every value that changes UI or classes
3. **All conditional branches** — every `if/else`, ternary, `&&`, `switch`
4. **User interactions** — click, hover, focus, keyboard, typing
5. **Callback props** — verify called with correct arguments
6. **Edge cases** — empty arrays, null/undefined optionals, boundary values
7. **Accessibility** — ARIA attributes, keyboard nav, focus management
8. **Error/disabled/loading states** — each state path exercised

### Important Testing Rules

1. **Radix UI Components** (Tooltip, Popover, etc.):
   - May render content multiple times (visible + screen reader)
   - Use `queryAllByText()` and check `length > 0` instead of `getByText()`
   - Use unique text strings per test to avoid conflicts

2. **Portal Components** (Toast, Dialog):
   - May render outside test container
   - Use flexible selectors or check `container.firstChild`

3. **SVG Attributes**: Use kebab-case: `stroke-width`, not `strokeWidth`

4. **Compiled Classes**: Don't test specific Tailwind classes (they may be compiled). Test functionality and rendering instead.

5. **Use `userEvent`** over `fireEvent` for realistic interactions

---

## 📋 Known Coverage Gaps — Fix When Touching These Files

When modifying any of these components, cover the missing lines as part of your change:

| Component      | Uncovered Lines                     | Issue                    | Priority |
| -------------- | ----------------------------------- | ------------------------ | -------- |
| Select.tsx     | 184-186, 458-459, 508, 800, 969-973 | 88.55% branch coverage   | HIGH     |
| Icon.tsx       | 191, 196-197, 231, 468              | 92.53% branch coverage   | HIGH     |
| HoverCard.tsx  | 94                                  | 50% function coverage    | HIGH     |
| OTPInput.tsx   | 69-76, 103, 157, 187                | 93.15% branch coverage   | MEDIUM   |
| Button.tsx     | 202, 342                            | 98.21% branch coverage   | LOW      |
| Combobox.tsx   | 177, 334                            | 92.3% function coverage  | LOW      |
| Command.tsx    | 65                                  | 88.88% function coverage | LOW      |
| ScrollArea.tsx | 100                                 | 75% function coverage    | LOW      |
| Separator.tsx  | 286                                 | 96.87% branch coverage   | LOW      |

**Rule:** If you modify a HIGH priority component, fix the uncovered lines even if not explicitly asked.

---

## Accessibility Requirements

All components must be accessible:

```tsx
// ✅ Interactive elements need labels
<Button>Click me</Button>
<Button aria-label="Close"><XIcon aria-hidden /></Button>

// ✅ Form controls need labels
<Input label="Email" type="email" />
<Input type="search" aria-label="Search" />

// ✅ Decorative icons hidden
<svg aria-hidden="true">...</svg>

// ❌ Never do this
<Button><XIcon /></Button>  // No accessible name
<Input placeholder="Email" />  // No label
```

---

## Storybook Stories

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  ),
};
```

---

## 🔄 MANDATORY Validation — Run Before EVERY Task Completion

After writing or modifying ANY code, run these checks in order. **Do NOT mark a task complete until all pass.**

### Step 1: Component-Level Coverage

```bash
npx vitest run src/components/<ComponentName> --coverage
```

Verify changed files: ≥ 85% statements, ≥ 85% branches, ≥ 85% functions, ≥ 85% lines.
If below, write additional tests before proceeding.

### Step 2: ESLint with Zero Warnings

```bash
npx eslint src/components/<ComponentName> --ext .ts,.tsx --max-warnings 0
```

Fix ALL errors and warnings. Do not suppress rules without explicit justification.

### Step 3: Full Test Suite

```bash
npm run test:coverage
```

ALL tests must pass. Overall coverage must NOT decrease below baseline.

### Step 4: Self-Review Checklist

- [ ] No `any` types in new/modified code
- [ ] No unused imports or variables
- [ ] No `console.log` statements
- [ ] No magic numbers (use named constants)
- [ ] No hardcoded credentials, secrets, or IP addresses
- [ ] No empty functions or redundant boolean checks
- [ ] No duplicated code blocks (> 10 lines)
- [ ] All functions: cognitive complexity ≤ 15, ≤ 80 lines, ≤ 5 parameters
- [ ] All files: ≤ 1000 lines
- [ ] `type` imports for type-only imports
- [ ] Test file covers ALL branches of changed code
- [ ] Coverage on changed files ≥ 85%
- [ ] ESLint passes with 0 warnings
- [ ] Full test suite passes, no coverage regression
- [ ] All CSS classes use `mdt-` prefix
- [ ] Semantic colors only (no hardcoded)
- [ ] JSDoc on exported functions
- [ ] Accessibility: ARIA labels, keyboard nav, semantic HTML
- [ ] Storybook stories created/updated (if UI changed)

---

## Common Pitfalls

### 1. Type Circular References

```tsx
// ❌ Wrong
import type { ButtonVariants } from './Button';
export type ButtonVariants = VariantProps<typeof ButtonVariants>;

// ✅ Correct
import type { ButtonVariants as ButtonVariantsCVA } from './Button';
export type ButtonVariantsType = VariantProps<typeof ButtonVariantsCVA>;
```

### 2. Missing forwardRef

```tsx
// ❌ Wrong
const Button = ({ children }: Props) => <button>{children}</button>;

// ✅ Correct
const Button = forwardRef<HTMLButtonElement, Props>(({ children }, ref) => (
  <button ref={ref}>{children}</button>
));
Button.displayName = 'Button';
```

### 3. Testing Portal Components

```tsx
// ❌ Wrong - Toast renders in portal
expect(container.querySelector('.mdt-toaster')).toBeInTheDocument();

// ✅ Correct
const toaster = container.querySelector('ol') || document.querySelector('ol');
expect(toaster || container.firstChild).toBeTruthy();
```

### 4. Testing Radix UI Multiple Renders

```tsx
// ❌ Wrong - Tooltip renders twice
expect(screen.getByText('Tooltip content')).toBeInTheDocument();

// ✅ Correct
expect(screen.queryAllByText('Tooltip content').length).toBeGreaterThan(0);
```

### 5. Skipping Tests / Leaving `any` for Later

```tsx
// ❌ Wrong — SonarQube won't wait
const handler = (e: any) => {}; // "I'll fix types later"
it.skip('todo test', () => {}); // .skip in committed code

// ✅ Correct — Fix now
const handler = (e: React.ChangeEvent<HTMLInputElement>) => {};
```

### 6. High Complexity Functions

```tsx
// ❌ Wrong — Cognitive complexity > 15, deeply nested
const getStyle = (variant, size, disabled, loading) => {
  if (variant === 'primary') {
    if (size === 'sm') {
      if (disabled) {
        if (loading) {
          return '...';
        }
      }
    }
  }
};

// ✅ Correct — Flat lookup, low complexity
const STYLE_MAP = {
  'primary-sm': 'mdt-px-2 mdt-py-1 mdt-bg-primary',
  'primary-md': 'mdt-px-4 mdt-py-2 mdt-bg-primary',
} as const;

const getStyle = (variant: Variant, size: Size) =>
  STYLE_MAP[`${variant}-${size}`] ?? STYLE_MAP['primary-md'];
```

---

## Common Commands

```bash
npm run dev              # Vite dev server
npm run build            # Build library
npm run test             # Run tests
npm run test:coverage    # Run with coverage
npm run lint             # Lint code
npm run storybook        # Start Storybook

# Quality validation (run before every commit)
npx eslint src --ext .ts,.tsx --max-warnings 0
npx vitest run src/components/<Name> --coverage
```

---

## Workflow

### New Component

1. Create file structure (component, types, test, stories, index)
2. Use `forwardRef` for ref forwarding
3. Use CVA for variants with semantic colors
4. Add comprehensive tests (85%+ coverage, all branches)
5. Create Storybook stories
6. Add accessibility (ARIA labels, semantic HTML, keyboard support)
7. Export from `src/components/index.ts`
8. Use `mdt-` prefix for all CSS classes
9. **Run `npx eslint ... --max-warnings 0`** on new files
10. **Run `npm run test:coverage`** — verify no regression

### Modifying Existing Component

1. Check coverage gaps table — fix uncovered lines if listed
2. Maintain backward compatibility
3. Update tests to cover ALL changed/added lines
4. Update Storybook stories if UI changes
5. **Run component-level coverage** — verify ≥ 85%
6. **Run ESLint with `--max-warnings 0`**
7. **Run full test suite** — verify no regression
8. Create a changeset if publishable
9. Let user handle git commits

---

## 🔒 The token rule - never break this

**Components always use tokens. If the token you need does not exist, stop and say so.**

Do not hardcode a value, do not approximate with a nearby token, and do not reach for a raw hex or
pixel value. A missing token is a design decision for the design owner to make, not an
implementation detail to work around.

- Every token that exists: `TOKENS.md`
- Every category that does not exist yet: `MISSING-TOKENS.md`
- Where the rule is currently broken: `TOKEN-REPORT.md`

`npm run check:tokens` reports violations. It **reports only** - there are known violations from
before this rule existed, so blocking on them would stop every push. Switch CI to
`check:tokens:strict` once that count reaches zero.

**Spacing and type scale have no tokens at all** - the whole library uses Tailwind's default steps
for both, and that is logged in `MISSING-TOKENS.md` as two of the missing categories. So `px-3` is
not a violation; it is what every component does. A raw `p-[13px]` is.

**Do not add colours.** The palette is 88 primitives and 25 semantic pairs, and it stays that size
unless the design owner decides otherwise. If a borrowed design needs a colour we do not have, map
it to the nearest step we own and say what shifted - a second green makes "which green" a live
question on every component after it. The `--mdt-feedback-*` set is the model: its own names for a
tinted surface, every value pointing at a ramp that already existed.

---

## ⚠️ Class order matters - read before touching any `cn()` call

`src/utils/cn.ts` uses `extendTailwindMerge({ prefix: 'mdt-' })`. Without that prefix the merger
cannot tell two of our classes apart, so **both survive** and the browser falls back to whichever
Tailwind emitted later - which is alphabetical. That is why a `color="error"` button rendered black
while `color="success"` rendered green: `destructive` sorts before `primary`, `success` sorts after.

Now that the merger works, **the last class wins**, and that changes how you write these:

```tsx
// ❌ Wrong - `px-3` sets both sides, so it overwrites the `pr-9` written before it
cn(closable && 'mdt-pr-9', 'mdt-px-3 mdt-py-1.5');

// ✅ Right - the narrower rule goes last
cn('mdt-px-3 mdt-py-1.5', closable && 'mdt-pr-9');
```

The same applies to CVA: variants are applied in declaration order, so a `size` declared after a
`shape` overrides it. A reset belongs in `compoundVariants`, which run last - see `BARE_RESET` in
`Badge.tsx`.

**When you change this file, re-render every story and diff it.** The fix alone changed 39 of 521
stories - every one a latent bug finally applying: error borders that had been grey, large buttons
stuck at the wrong text size, skeleton circles that were not round, tag pill sizes that were all
identical. Nothing regressed, but only a full sweep could prove that.

---

## Git Workflow

This repository is owned by the design team. Claude runs git - staging, committing, pushing,
branches, pull requests - when asked. Ask first before anything outward-facing or hard to undo:
pushing to `main`, changing repository visibility, rewriting published history, adding
collaborators, publishing to npm.

Use a message file (`git commit -F <file>`) rather than an inline message. Long messages passed
inline get mis-parsed by the shell here - git reads part of the message as a file path and fails.

### `main` is protected

Never commit to `main` directly. Every change goes through a branch and a pull request, and CI has
to be green before it merges. One-word documentation fixes included.

### Branch naming: `person/what-changed`

```
nirav/banner                 pranjal/stat-tile
nirav/banner-spacing         pranjal/stat-tile-no-data
nirav/banner-dark-border     pranjal/fix-toast-gap
```

**Name the branch after the change, not the component.** A component gets touched many times - the
first build, a spacing fix three weeks later, a dark-mode border after that. Calling all three
`nirav/banner` collides with your own deleted branch names and makes the history unreadable.

**One branch per thing you would merge or revert as a unit.** Usually that is one component, but not
always: a component plus the token it needs plus its stories is one branch, while Banner and Card
are always two, because they ship independently.

**Branches are disposable, and nothing of value lives only in one.** A merged branch has done its
whole job and gets deleted - the work is in `main` now. To change something later, cut a _new_
branch from current `main`; it will contain that component plus everything merged since. Never
reopen an old branch, which is stale by definition.

Note that squash-merging makes git report a merged branch as "not fully merged" on delete. That is a
false alarm - the content landed as a new commit. Confirm with `git diff <branch> main` (empty means
landed), then `git branch -D`.

Your role: implement solutions, run tests/builds/lint, create code changes.

---

## Quality Standards

- ✅ **Accessibility:** WCAG 2.1 AA
- ✅ **TypeScript:** Strict mode, zero `any`, zero unused
- ✅ **Testing:** ≥ 85% coverage (verified by running tests)
- ✅ **Linting:** ESLint + sonarjs passes with 0 warnings
- ✅ **Styling:** `mdt-` prefix, semantic colors
- ✅ **Documentation:** JSDoc + Storybook stories
- ✅ **Functions:** ≤ 15 complexity, ≤ 80 lines, ≤ 5 params
- ✅ **Files:** ≤ 1000 lines
- ✅ **SonarQube:** Production quality gate passing

---

## Important Files

| File                                     | Purpose                                                         |
| ---------------------------------------- | --------------------------------------------------------------- |
| `src/components/index.ts`                | Component exports                                               |
| `src/utils/cn.ts`                        | Class merger - **see the class order note below**               |
| `src/components/Icon/icons/`             | 1209 generated icon files - **never edit by hand**              |
| `src/components/Icon/icons/index.ts`     | Generated registry: every name, and the `IconName` type         |
| `src/components/Toast/ToastBody.tsx`     | The toast surface: six tones, one calm text colour              |
| `src/components/Toast/ToastPromo.tsx`    | The promotional toast: picture, paragraph, one action           |
| `src/components/Toast/promoStore.ts`     | Holds the one promotional toast, outside the library            |
| `src/components/Tabs/useEditableTabs.ts` | The rules for adding and closing tabs                           |
| `tailwind.config.ts`                     | Tailwind config - **see the dark mode note below**              |
| `src/styles/globals.css`                 | All design tokens live here                                     |
| `vitest.config.ts`                       | Test config                                                     |
| `eslint.config.js`                       | ESLint + sonarjs                                                |
| `.github/workflows/ci.yml`               | Tests, lint, typecheck, build, token check                      |
| `.github/workflows/storybook.yml`        | Deploys Storybook to GitHub Pages                               |
| `TOKENS.md`                              | Every token that exists, grouped by category                    |
| `MISSING-TOKENS.md`                      | Every token category that does **not** exist yet                |
| `TOKEN-REPORT.md`                        | Generated: hardcoded values, with file and line                 |
| `COMPONENT-GAP.md`                       | This library vs the four product design systems                 |
| `component-catalog.json`                 | Generated: every component and variant, machine-readable        |
| `scripts/check-tokens.mjs`               | Finds values that should be tokens                              |
| `scripts/extract-variants.mjs`           | Builds `component-catalog.json` from the CVA definitions        |
| `scripts/generate-icons.mjs`             | Rebuilds the icon set from Lucide - **see the icon rule below** |

### Extra commands

```bash
npm run check:tokens          # report hardcoded values (does not fail)
npm run check:tokens:strict   # same, but exits non-zero on violations
npm run check:tokens:report   # also writes TOKEN-REPORT.md
node scripts/extract-variants.mjs --json   # rebuild component-catalog.json
npm run generate-icons        # re-cut every icon from Lucide's own source
```

---

## 🎨 The icon rule - read before adding any icon

**Lucide is the only icon source.** Reach for it first, every time. If Lucide genuinely has nothing
suitable, say what you looked for and what was missing - do not quietly substitute the nearest thing.

**One icon means one thing.** Never use the same glyph for two different features. Before reusing an
icon, check where it is already used; if it is taken, find a different one. An icon is often the only
label a control has, so a repeated glyph teaches people the wrong meaning.

**Every icon goes through `<Icon name="..." />`.** Do not hand-draw an inline `<svg>` in a component.
Inline SVG cannot be sized, coloured or restyled by the design system, and it is invisible to anyone
auditing which icons the library uses.

Exactly **two** inline `<svg>` are allowed to remain in shipped code, and both have a reason:

| Where         | Why it stays                                                                          |
| ------------- | ------------------------------------------------------------------------------------- |
| `Icon.tsx`    | Renders external SVGs and its own error fallback. It cannot call itself.              |
| `Spinner.tsx` | An animated circle, not a symbol. Lucide has no equivalent because it is not an icon. |

Anything else is a defect. Find them with:

```bash
grep -rn "<svg" src/components --include="*.tsx" | grep -v "/icons/" | grep -v ".stories." | grep -v ".test."
```

Story files are **not** yet clean - 84 hand-drawn icons remain across 10 demo pages. They ship to
nobody, but they are what a designer sees while browsing, so they teach the wrong habit. Worth a
separate pass.

### How the set is built

The artwork is **copied in, not imported**. `lucide-static` is a devDependency that exists only so
`scripts/generate-icons.mjs` has SVG files to read; the built library has no icon dependency at all,
so a product using it gains nothing to install and no icon ever changes shape without a commit.

```bash
npm install --save-dev lucide-static@latest   # only when bumping Lucide
npm run generate-icons                        # re-cut all 1209
npx prettier --write "src/components/Icon/icons/**"
npm run typecheck && npm run lint && npm test
```

The registry is **frozen at the names it already has**. Refreshing artwork must never quietly add
hundreds of names to a public API - pass `--all` to opt into adding every icon Lucide ships.

**Two rules the generator exists to enforce**, both learned by breaking them:

- **Inner elements carry no stroke attributes.** The old generator wrote `strokeWidth="2"` onto every
  path. An element's own attribute beats an inherited one, so the `strokeWidth` prop on `<Icon>` was
  silently ignored by **1208 of 1209 icons**. Only the outer `<svg>` sets stroke properties.
- **`fill` on a child is kept.** Ten Lucide icons set `fill="currentColor"` to make a shape solid -
  the dots in `scatter-chart`, for instance. Stripping it turns each into a hollow ring. Only a
  redundant `fill="none"` is dropped.

**Seventeen brand logos** (`github`, `figma`, `slack`, `twitter`, …) were dropped by Lucide for
trademark reasons — there is nothing upstream to refresh them from. We keep our own copies, and the
generator still runs them through the same pipeline so they behave like every other icon. It reports
them by name on every run, so the list stays visible rather than becoming invisible debt.

Do **not** simply skip an icon that has no upstream file. The first version of this script did, and
it left those seventeen as the only icons in the set where `strokeWidth` still did nothing.

### Why the icon set is not `lucide-react`

Deliberate, and worth not undoing:

|                                     | Import the package                                | Copy the artwork in                            |
| ----------------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| Products installing this library    | Gain a dependency                                 | Gain nothing                                   |
| Who owns the icon names             | Lucide — an upstream rename breaks our public API | We do                                          |
| Can artwork change without a commit | Yes, on any update                                | No                                             |
| The 17 brand logos                  | Lost                                              | Kept                                           |
| Offline / air-gapped builds         | No                                                | Yes                                            |
| Cost                                | —                                                 | 1209 files in the repo, one command to refresh |

---

## ⚠️ Dark mode - read before writing any `dark:` class

`tailwind.config.ts` sets `darkMode: ['class', '[class~="dark"]']`. The attribute selector is
**required and must not be simplified to `'class'`**.

With `prefix: 'mdt-'`, Tailwind prefixes the dark-mode toggle class too, emitting selectors that
look for `.mdt-dark` while the app puts plain `.dark` on the root element. They never match, and
**every `dark:` utility in the library silently does nothing**. Naming a custom selector like
`['class', '.dark']` does not help either - that gets prefixed as well. An attribute selector is
not prefixed, so it survives.

This went unnoticed for a long time because token theming was never affected: `globals.css` defines
`.dark { --mdt-* }` in plain CSS, so the theme flipped correctly while every `dark:` class quietly
did nothing.

**Also:** the class merger treats `dark:bg-*` and `bg-*` as separate groups. If a variant sets a
dark background, a plain `mdt-bg-transparent` will clear the light one and leave the dark one. Pair
them: `mdt-bg-transparent dark:mdt-bg-transparent`.

---

## Remember

**The goal is to require minimal user input while delivering maximum quality.**

When a user says "Create a [Component]", you should deliver:

- A fully functional, accessible component
- Comprehensive Storybook documentation
- Complete test coverage **(verified by running `npm run test:coverage`)**
- Type-safe TypeScript **(zero `any`, zero lint warnings)**
- SonarQube production quality gate compliance **(validated before task completion)**
- Following all conventions automatically

**Don't ask for details that should be standard!**

---

## Verify in a browser, not just in tests

Unit tests pass while the pixels are wrong. Several real bugs this codebase has hit were invisible
to a green test run and obvious in a screenshot:

- Badge text measured **2.0:1** contrast in light mode - unreadable, all tests passing
- "Bare" badges rendered as filled pills in dark mode
- Avatar initials were eaten by the stack overlap at small sizes
- The dark CodeWell was the same colour as the page, so it read as a bordered hole
- The `strokeWidth` prop did nothing on 1208 of 1209 icons, and had not since the day it was written

After any visual change, render the story in a real browser in **both themes** and look at it.
Playwright is already a dependency.

**Two ways a screenshot lies to you**, both hit during the icon work:

- **You photograph the loading spinner, not the story.** Storybook compiles on demand, so the page
  answers immediately with a spinner. Waiting on a selector does not help - hidden control-panel
  markup matches most of them. Wait for the story root to hold real text:

  ```js
  await page.waitForFunction(() => {
    const r = document.querySelector('#storybook-root');
    return !!r && (r.innerText || '').trim().length > 15;
  });
  ```

- **You photograph a surface that needs a click.** Dialogs and toasts render nothing until something
  opens them. A "0 changed pixels" result on those stories means you tested an empty page.

Where the difference is too small to trust your eye, **measure it**: render both versions into a
canvas and compare the pixels. That is how "the Sidebar swap is invisible" became a number (0.01%)
instead of an opinion.

---

## Handoff

Latest session state is in [HANDOFF.md](HANDOFF.md) - read it first.
