# React Component Library Developer Guidelines

## Motadata Enterprise UI Components

### Golden Rule: You build it. You test it. You own it.

Every developer is the QA owner of their component.

---

## Purpose

This document defines mandatory engineering standards for the Motadata React Component Library to ensure:

- Consistent, accessible UI across all products
- Type safety and strict code quality
- High test coverage and reliability
- Clean component architecture
- QA ownership by developers

**These rules are NOT optional.**

---

## 1. Component Structure (MANDATORY)

Every component MUST follow this file structure:

```
ComponentName/
├── ComponentName.tsx           # Implementation
├── ComponentName.types.ts      # TypeScript interfaces
├── ComponentName.test.tsx      # Unit tests
├── ComponentName.stories.tsx   # Storybook documentation
└── index.ts                    # Barrel exports
```

- One component per folder
- Co-locate tests, types, and stories
- Export everything through `index.ts`
- Add component to `src/components/index.ts`

**Rule:**

If any file is missing, PR will be rejected.

---

## 2. Styling (MANDATORY)

Every Tailwind class MUST use the `mdt-` prefix. No exceptions.

```
✅  className="mdt-flex mdt-items-center mdt-gap-4"
❌  className="flex items-center gap-4"   ← WILL NOT WORK
```

Rules:

- `mdt-` prefix on ALL Tailwind classes
- Semantic color tokens ONLY (no hardcoded colors)
- Use `cn()` from `@/utils` for class merging
- Use CVA (class-variance-authority) for all variants
- Never use inline styles

Semantic Colors:

| Category    | Tokens                                                     |
| ----------- | ---------------------------------------------------------- |
| Backgrounds | `background`, `foreground`, `muted`, `card`, `popover`     |
| Primary     | `primary`, `primary-foreground`                            |
| Status      | `success`, `warning`, `destructive`, `info` (+ foreground) |
| Borders     | `border`, `input`, `ring`                                  |

```
✅  mdt-bg-primary mdt-text-primary-foreground
❌  mdt-bg-blue-500 mdt-text-white   ← won't adapt to themes
```

**Rule:**

If hardcoded colors or missing `mdt-` prefix found, PR will be rejected.

---

## 3. TypeScript (MANDATORY)

Strict mode is enabled. No compromises.

- No `any` types without written justification
- No `eslint-disable` without a comment explaining why
- No `@ts-ignore` — fix the type instead
- All props defined in `.types.ts` file
- Use `ComponentPropsWithoutRef<>` for HTML attribute inheritance
- Use discriminated unions when behavior varies by prop

Ref Forwarding:

Every component that renders a DOM element MUST use `forwardRef` and set `displayName`.

```tsx
const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);
Component.displayName = 'Component';
```

Avoiding Circular References:

```
✅  import type { buttonVariants as ButtonVariantsCVA } from "./Button"
❌  import type { ButtonVariants } from "./Button"   ← circular!
```

**Rule:**

If `any` types exist without justification, PR will be rejected.

---

## 4. Accessibility (MANDATORY)

Every component MUST meet WCAG 2.1 AA. Non-negotiable.

1. Use semantic HTML (`button`, `input`, `select` — not styled divs)
2. Every interactive element MUST have an accessible name
3. Support full keyboard navigation (Tab, Enter, Space, Escape, Arrows)
4. Maintain visible focus indicators
5. Color contrast: 4.5:1 for text, 3:1 for large text
6. Test with a screen reader before marking done

Rules:

- Use Radix UI primitives for complex interactions
- Icon-only buttons MUST have `aria-label`
- Decorative icons MUST have `aria-hidden`
- Never remove focus outlines without replacement

**Rule:**

If accessibility violations exist, PR will be rejected.

---

## 5. File and Function Limits

Files:

- Max 1000 lines per component file (excluding tests and stories)

Functions:

- Max 80 lines per function
- Max 5 props destructured inline — use types file instead
- No empty components
- No duplicated logic across components — extract to hooks or utils

---

## 6. Icons

Use the centralized Icon component. Always.

```tsx
✅  <Icon name="check" size="sm" aria-hidden />
❌  <svg width="16" height="16">...</svg>   ← NEVER inline SVGs
```

Icon registry: `src/components/Icon/icons/index.ts`

**Rule:**

If inline SVGs found, PR will be rejected.

---

## 7. Import Aliases

Always use path aliases. Never use deep relative imports.

| Alias          | Maps To          |
| -------------- | ---------------- |
| `@/utils`      | `src/utils`      |
| `@/components` | `src/components` |
| `@/hooks`      | `src/hooks`      |
| `@/types`      | `src/types`      |

```
✅  import { cn } from '@/utils'
❌  import { cn } from '../../../utils/cn'
```

---

## 8. Storybook Documentation

Every component MUST have a stories file with:

- `tags: ['autodocs']` for auto-generated docs
- Default story with base props
- All variants demonstrated
- All sizes demonstrated
- Interactive states (hover, focus, disabled)
- Accessibility annotations (`aria-label` on icon buttons)

```tsx
const meta: Meta<typeof Component> = {
  title: 'Components/ComponentName',
  component: Component,
  tags: ['autodocs'],
};
```

**Rule:**

If stories file is missing or incomplete, PR will be rejected.

---

## 9. QA Ownership (MANDATORY)

Every Developer is QA.

There is NO separate QA dependency.

A component is NOT DONE until the developer fully tests it.

### Developer QA Responsibilities:

**Functional Testing:**

- All variants render correctly
- All sizes render correctly
- Disabled state is visually distinct and non-interactive
- Custom `className` merges without breaking base styles
- Component works in light and dark themes

**Unit Tests:**

- All variants and sizes apply correct classes
- User interactions work (click, keyboard, focus)
- Disabled state prevents interaction
- Ref forwarding works
- Accessibility attributes present
- Edge cases covered (empty children, missing props)
- Minimum 90% coverage on new code

**Accessibility Testing:**

- Keyboard navigation works end-to-end
- Screen reader announces component correctly
- No violations in automated accessibility scans
- Focus management works correctly

**Visual Testing:**

- Storybook stories render without errors
- Cross-browser check (Chrome, Firefox, Safari, Edge)
- No layout shifts or overflow issues
- Responsive behavior if applicable

**Performance Validation:**

- No unnecessary re-renders
- Bundle size stays within ≤ 50 KB limit
- No console errors or warnings

---

## 10. Testing Standards

### Testing Layers

| Layer           | Tool                           | What                                   |
| --------------- | ------------------------------ | -------------------------------------- |
| Static Analysis | TypeScript + ESLint            | Type errors, lint violations           |
| Unit Tests      | Vitest + React Testing Library | Component behavior, variants, a11y     |
| Integration     | Storybook interactions         | Multi-component workflows              |
| E2E             | Playwright                     | Critical user paths, visual regression |

### Unit Test Rules

- Test user behavior, NOT implementation details
- Use semantic queries: `getByRole`, `getByLabelText`, `getByText`
- Avoid `getByTestId` unless no semantic alternative exists
- Every variant MUST have at least one test
- Every interactive state MUST have a test
- Never test internal state or implementation

### Commands

```bash
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
npm run test:e2e          # Playwright E2E
```

---

## 11. Quality Gate Rules

**Every PR must pass ALL gates. No exceptions.**

| Gate                | Threshold            |
| ------------------- | -------------------- |
| ESLint              | 0 errors             |
| TypeScript (strict) | 0 errors             |
| Branch Coverage     | ≥ 90%                |
| Function Coverage   | ≥ 90%                |
| Line Coverage       | ≥ 90%                |
| Statement Coverage  | ≥ 90%                |
| Library Build       | Pass                 |
| Storybook Build     | Pass                 |
| E2E Tests           | 100% pass            |
| Accessibility       | 0 WCAG AA violations |
| Commit Format       | Conventional Commits |

**PR will be rejected if any quality gate fails.**

---

## 12. Commit Standards

Follow Conventional Commits. Enforced by Husky + commitlint.

```
type(scope): description
```

| Type       | Use When                     |
| ---------- | ---------------------------- |
| `feat`     | New feature or component     |
| `fix`      | Bug fix                      |
| `docs`     | Documentation only           |
| `test`     | Adding or updating tests     |
| `refactor` | No bug fix, no new feature   |
| `style`    | Formatting, whitespace       |
| `perf`     | Performance improvement      |
| `chore`    | Build, tooling, dependencies |

Examples:

```
feat(badge): add success and warning variants
fix(select): resolve keyboard navigation in multi-select
test(button): add accessibility tests for icon buttons
```

Pre-commit hooks run automatically:

- **Pre-commit:** ESLint + Prettier on staged files
- **Commit-msg:** commitlint validates format

---

## 13. Ownership and Reviews

- Every component has an owner
- Minimum 1 PR approval required
- SonarQube Quality Gate must pass
- New components require architecture review
- Breaking API changes require team discussion

---

## 14. VS Code Setup

### Required Extensions

| Extension                 | Purpose                         |
| ------------------------- | ------------------------------- |
| ESLint                    | Linting                         |
| Prettier                  | Formatting                      |
| Tailwind CSS IntelliSense | Autocomplete with `mdt-` prefix |

### Recommended Extensions

| Extension                | Purpose                |
| ------------------------ | ---------------------- |
| GitLens                  | Git integration        |
| SonarLint                | Real-time code quality |
| Error Lens               | Inline error display   |
| Pretty TypeScript Errors | Readable TS errors     |

---

## 15. Troubleshooting

| Problem              | Fix                                                       |
| -------------------- | --------------------------------------------------------- |
| Module not found     | `rm -rf node_modules package-lock.json && npm install`    |
| TypeScript errors    | `npm run typecheck`                                       |
| Storybook won't load | `npm run build` then `npm run storybook`                  |
| Tests failing        | `npm run test -- --clearCache` then `npm run test`        |
| E2E timing out       | Ensure Storybook is running; check `playwright.config.ts` |

---

## PR Self-QA Checklist

Before opening a PR, verify every item:

- [ ] Component follows standard file structure
- [ ] All Tailwind classes use `mdt-` prefix
- [ ] Semantic colors only (no hardcoded values)
- [ ] `forwardRef` and `displayName` set
- [ ] Types exported from `index.ts`
- [ ] No `any` types without justification
- [ ] No `eslint-disable` without explanation
- [ ] Unit tests cover all variants and states
- [ ] Coverage ≥ 90%
- [ ] Accessibility tested (keyboard, screen reader)
- [ ] Storybook stories complete
- [ ] Works in light and dark themes
- [ ] Cross-browser verified
- [ ] No console errors or warnings
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` succeeds
- [ ] Commit messages follow Conventional Commits

---

## Final Rule:

**You build it. You test it. You own it.**
