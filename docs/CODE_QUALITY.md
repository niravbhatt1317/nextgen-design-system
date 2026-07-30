# Code Quality Standards

This document outlines the code quality standards, tools, and metrics enforced in the Motadata React Library.

## Table of Contents

- [Quality Tools Overview](#quality-tools-overview)
- [ESLint Configuration](#eslint-configuration)
- [TypeScript Best Practices](#typescript-best-practices)
- [Prettier Configuration](#prettier-configuration)
- [SonarQube Metrics](#sonarqube-metrics)
- [Quality Gates](#quality-gates)
- [Pre-commit Hooks](#pre-commit-hooks)
- [Code Review Checklist](#code-review-checklist)

---

## Quality Tools Overview

| Tool            | Purpose                   | Configuration              |
| --------------- | ------------------------- | -------------------------- |
| **ESLint**      | Static code analysis      | `eslint.config.js`         |
| **Prettier**    | Code formatting           | `.prettierrc`              |
| **TypeScript**  | Type checking             | `tsconfig.json`            |
| **SonarQube**   | Code quality metrics      | `sonar-project.properties` |
| **Husky**       | Git hooks                 | `.husky/`                  |
| **lint-staged** | Pre-commit linting        | `package.json`             |
| **Commitlint**  | Commit message validation | `commitlint.config.js`     |

---

## ESLint Configuration

### Enabled Rules

Our ESLint configuration (`eslint.config.js`) enforces:

**TypeScript Rules:**

- `@typescript-eslint/strict` - Strict TypeScript checking
- `@typescript-eslint/stylistic` - Consistent code style
- No unused variables or imports
- Explicit return types encouraged

**React Rules:**

- `react-hooks/rules-of-hooks` - Enforce hooks rules
- `react-hooks/exhaustive-deps` - Validate dependencies
- `react/jsx-uses-react` - Prevent React import errors

**Accessibility Rules:**

- `jsx-a11y/recommended` - Enforce accessibility best practices
- Clickable elements must be keyboard accessible
- Images must have alt text
- Form inputs must have labels

**General Rules:**

- `no-console` - Warn on console.log (allow warn/error)
- `prefer-const` - Use const when variable isn't reassigned
- `eqeqeq` - Require strict equality (===)
- `no-var` - Disallow var declarations

### Running ESLint

```bash
# Check for errors
npm run lint

# Auto-fix errors
npm run lint:fix
```

### Disabling Rules

Only disable rules with justification:

```tsx
// ✅ Good - Specific rule with reason
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Legacy API requires any
const handleLegacyData = (data: any) => {};

// ❌ Bad - Blanket disable
// eslint-disable-next-line
const badCode = something;
```

---

## TypeScript Best Practices

### Strict Mode

TypeScript strict mode is enabled with additional checks:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Type Definitions

**Component Props:**

```tsx
// ✅ Good - Interface in .types.ts file
// Button.types.ts
export interface MotadataButtonProps
  extends ComponentPropsWithoutRef<'button'>, MotadataButtonVariants {
  children: ReactNode;
  isLoading?: boolean;
}

// Button.tsx
import type { MotadataButtonProps } from './Button.types';
```

**Avoid Circular References:**

```tsx
// ❌ Bad - Circular reference
import type { ButtonVariants } from './Button';
export type ButtonVariants = VariantProps<typeof ButtonVariants>;

// ✅ Good - Use alias
import type { buttonVariants as ButtonVariantsCVA } from './Button';
export type ButtonVariants = VariantProps<typeof ButtonVariantsCVA>;
```

### Type Exports

Always export types from component modules:

```tsx
// index.ts
export { MotadataButton, motadataButtonVariants } from './Button';
export type { MotadataButtonProps, MotadataButtonVariants } from './Button.types';
```

### Running Type Checks

```bash
npm run typecheck
```

---

## Prettier Configuration

### Settings (`.prettierrc`)

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Running Prettier

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

### Editor Integration

Configure VS Code to format on save:

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## SonarQube Metrics

### Quality Metrics

| Metric              | Description                          | Target   |
| ------------------- | ------------------------------------ | -------- |
| **Coverage**        | Percentage of code covered by tests  | ≥ 90%    |
| **Duplications**    | Percentage of duplicated code blocks | < 3%     |
| **Maintainability** | Technical debt ratio                 | Rating A |
| **Reliability**     | Bug density                          | Rating A |
| **Security**        | Vulnerability density                | Rating A |

### Rating Scale

| Rating | Description               |
| ------ | ------------------------- |
| A      | Excellent - No issues     |
| B      | Good - Minor issues       |
| C      | Moderate - Some issues    |
| D      | Poor - Significant issues |
| E      | Critical - Major issues   |

### SonarQube Configuration

See `sonar-project.properties` for full configuration:

```properties
sonar.projectKey=motadata-react-library
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.ts,**/*.test.tsx
sonar.exclusions=**/*.stories.tsx,**/index.ts
sonar.javascript.lcov.reportPaths=coverage/lcov.info
```

### Common Issues

**Code Smells:**

- Cognitive complexity too high
- Duplicated code blocks
- Unused variables/imports
- Magic numbers

**Bugs:**

- Null pointer exceptions
- Incorrect equality comparisons
- Unhandled promise rejections

**Vulnerabilities:**

- XSS vulnerabilities
- SQL injection (if applicable)
- Sensitive data exposure

---

## Quality Gates

### Local Development

| Check      | Trigger    | Action       |
| ---------- | ---------- | ------------ |
| ESLint     | Pre-commit | Auto-fix     |
| Prettier   | Pre-commit | Auto-format  |
| TypeScript | Manual     | Block commit |
| Tests      | Manual     | Block commit |

### CI Pipeline

| Stage     | Checks            | Threshold         |
| --------- | ----------------- | ----------------- |
| Quality   | Lint + Type check | Must pass         |
| Test      | Unit tests        | 90% coverage      |
| Build     | Library build     | Must succeed      |
| Build     | Bundle size       | ≤ 50KB            |
| SonarQube | All metrics       | Quality gate pass |

### SonarQube Quality Gate

Default quality gate conditions:

- Coverage on new code ≥ 90%
- Duplicated lines on new code < 3%
- Maintainability rating = A
- Reliability rating = A
- Security rating = A
- Security hotspots reviewed = 100%

---

## Pre-commit Hooks

### Husky Configuration

Git hooks are managed by Husky in `.husky/`:

**Pre-commit hook:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

**Commit-msg hook:**

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit "$1"
```

### lint-staged Configuration

From `package.json`:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

### Commitlint Rules

From `commitlint.config.js`:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'header-max-length': [2, 'always', 100],
    'subject-case': [2, 'always', 'lower-case'],
  },
};
```

---

## Code Review Checklist

### Before Requesting Review

- [ ] All tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type check passes (`npm run typecheck`)
- [ ] Build succeeds (`npm run build`)
- [ ] Bundle size within limits (`npm run size`)
- [ ] Changeset created if needed (`npm run changeset`)

### Code Quality

- [ ] No `any` types without justification
- [ ] No `eslint-disable` without comment
- [ ] No hardcoded values (use constants/config)
- [ ] No console.log (use console.warn/error if needed)
- [ ] Code is self-documenting (clear naming)

### Component Standards

- [ ] Uses `forwardRef` for DOM elements
- [ ] CSS classes use `mdt-` prefix
- [ ] Uses semantic color variables
- [ ] Has TypeScript types exported

### Testing

- [ ] Unit tests for new functionality
- [ ] All variants tested
- [ ] Accessibility tests included
- [ ] Edge cases covered

### Accessibility

- [ ] Interactive elements have accessible names
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast meets WCAG AA

### Documentation

- [ ] Storybook stories updated
- [ ] JSDoc comments for public APIs
- [ ] README updated if needed

---

## Troubleshooting

### ESLint Errors

**"Parsing error: Cannot read tsconfig":**

```bash
# Rebuild TypeScript project references
npm run typecheck
```

**"Rule not found":**

```bash
# Update ESLint and plugins
npm install eslint@latest typescript-eslint@latest
```

### Prettier Conflicts

**ESLint and Prettier conflict:**

The `eslint-config-prettier` package disables conflicting rules. If you still see issues:

```bash
npm run lint:fix && npm run format
```

### SonarQube Issues

**Coverage not showing:**

1. Ensure tests generate LCOV report
2. Verify `sonar.javascript.lcov.reportPaths` is correct
3. Run `npm run test:coverage` before analysis

**Quality gate failing:**

1. Check SonarQube dashboard for specific issues
2. Address blockers and critical issues first
3. Improve coverage on new code

---

## Resources

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [SonarQube Documentation](https://docs.sonarqube.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
