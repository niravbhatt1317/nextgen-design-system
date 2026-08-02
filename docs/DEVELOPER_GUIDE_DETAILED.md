# Motadata React Library - Comprehensive Developer Guide

> A complete reference guide for developers building and contributing to the Motadata React Component Library

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Architecture Overview](#2-architecture-overview)
3. [Getting Started](#3-getting-started)
4. [Development Environment Setup](#4-development-environment-setup)
5. [Project Structure Deep Dive](#5-project-structure-deep-dive)
6. [Component Development](#6-component-development)
7. [Styling System](#7-styling-system)
8. [TypeScript Patterns](#8-typescript-patterns)
9. [Testing Strategy](#9-testing-strategy)
10. [Storybook Documentation](#10-storybook-documentation)
11. [Code Quality & Linting](#11-code-quality--linting)
12. [CI/CD Pipeline](#12-cicd-pipeline)
13. [Best Practices](#13-best-practices)
14. [Troubleshooting](#14-troubleshooting)
15. [Resources & References](#15-resources--references)

---

## 1. Introduction

### 1.1 What is Motadata React Library?

The **Motadata React Library** is a production-ready, enterprise-grade React component library designed specifically for building SaaS platforms and custom business applications. It provides a comprehensive set of accessible, customizable, and thoroughly tested UI components.

### 1.2 Key Features

| Feature                 | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| **Accessibility First** | All components follow WCAG 2.1 AA guidelines             |
| **TypeScript Native**   | Full type safety with strict mode enabled                |
| **Themeable**           | CSS custom properties for easy customization             |
| **Tree-Shakeable**      | Import only what you need                                |
| **Well Documented**     | Comprehensive Storybook documentation                    |
| **Tested**              | 90%+ code coverage with unit, integration, and E2E tests |

### 1.3 Design Principles

1. **Consistency** - Unified design language across all components
2. **Accessibility** - Every user should be able to use our components
3. **Performance** - Optimized bundle size and rendering performance
4. **Developer Experience** - Intuitive APIs and comprehensive documentation
5. **Maintainability** - Clean code, good patterns, and thorough testing

---

## 2. Architecture Overview

### 2.1 Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                    Motadata React Library                    │
├─────────────────────────────────────────────────────────────┤
│  UI Layer                                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   React 18  │  │  Radix UI   │  │    CVA      │         │
│  │  Components │  │  Primitives │  │  Variants   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  Styling Layer                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │ Tailwind CSS│  │    clsx     │  │tailwind-    │         │
│  │  (mdt-)     │  │             │  │merge (cn)   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  Build & Dev                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    Vite     │  │  TypeScript │  │  Storybook  │         │
│  │   Build     │  │   Strict    │  │     10      │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│  Quality & Testing                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Vitest    │  │  Playwright │  │  SonarQube  │         │
│  │  + RTL      │  │    E2E      │  │  Analysis   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Key Dependencies

| Package                    | Version | Purpose                         |
| -------------------------- | ------- | ------------------------------- |
| `react`                    | ^18.x   | Core UI framework               |
| `@radix-ui/*`              | Latest  | Accessible primitive components |
| `class-variance-authority` | ^0.7.x  | Type-safe variant management    |
| `tailwindcss`              | ^3.x    | Utility-first CSS framework     |
| `clsx` + `tailwind-merge`  | Latest  | Class name utilities            |

### 2.3 Design Token System

Our design system uses CSS custom properties (CSS variables) for theming:

```css
/* Base tokens (Light mode) */
--mdt-background: 0 0% 100%;
--mdt-foreground: 222.2 84% 4.9%;
--mdt-primary: 222.2 47.4% 11.2%;
--mdt-primary-foreground: 210 40% 98%;
--mdt-secondary: 210 40% 96.1%;
--mdt-secondary-foreground: 222.2 47.4% 11.2%;
/* ... more tokens */
```

---

## 3. Getting Started

### 3.1 Prerequisites

Before you begin, ensure you have the following installed:

| Tool    | Minimum Version | Recommended | Check Command    |
| ------- | --------------- | ----------- | ---------------- |
| Node.js | 22.0.0          | Latest LTS  | `node --version` |
| npm     | 10.x            | Latest      | `npm --version`  |
| Git     | 2.x             | Latest      | `git --version`  |
| VS Code | Latest          | Latest      | -                |

### 3.2 Initial Setup

**Step 1: Clone the Repository**

```bash
# Clone from GitHub
git clone https://github.com/pranjalgupta-motadata/ai-ready-design-system.git

# Navigate to project directory
cd ai-ready-design-system
```

**Step 2: Install Dependencies**

```bash
# Install all dependencies (this may take a few minutes)
npm install
```

**Step 3: Verify Installation**

```bash
# Run the test suite to verify everything is working
npm run test

# Expected output: All tests pass (670+ tests)
```

**Step 4: Start Development**

```bash
# Start Storybook development server
npm run storybook

# Open browser to http://localhost:6006
```

### 3.3 Quick Reference Commands

```bash
# Development
npm run storybook       # Start Storybook (primary development environment)
npm run dev             # Start Vite dev server (for testing builds)

# Testing
npm run test            # Run unit tests once
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
npm run test:e2e        # Run Playwright E2E tests

# Building
npm run build           # Build the library for production
npm run build-storybook # Build Storybook for deployment

# Quality
npm run lint            # Check for linting errors
npm run lint:fix        # Auto-fix linting errors
npm run format          # Format code with Prettier
npm run typecheck       # Run TypeScript type checking
```

---

## 4. Development Environment Setup

### 4.1 VS Code Configuration

Install these essential extensions for the best development experience:

**Required Extensions:**

| Extension                 | ID                          | Purpose                       |
| ------------------------- | --------------------------- | ----------------------------- |
| ESLint                    | `dbaeumer.vscode-eslint`    | JavaScript/TypeScript linting |
| Prettier                  | `esbenp.prettier-vscode`    | Code formatting               |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss` | Tailwind autocomplete         |

**Recommended Extensions:**

| Extension                | ID                             | Purpose                  |
| ------------------------ | ------------------------------ | ------------------------ |
| GitLens                  | `eamodio.gitlens`              | Enhanced Git integration |
| SonarLint                | `sonarsource.sonarlint-vscode` | Real-time code quality   |
| Error Lens               | `usernamehw.errorlens`         | Inline error display     |
| Pretty TypeScript Errors | `yoavbls.pretty-ts-errors`     | Readable TS errors       |

> **💡 Quick Install:** When you open this project in VS Code for the first time, a popup will appear in the bottom-right corner suggesting recommended extensions. Click **"Install All"** to install all recommended extensions at once. If you missed the popup, open the Command Palette (`Cmd+Shift+P` on Mac / `Ctrl+Shift+P` on Windows) and search for **"Extensions: Show Recommended Extensions"**.

**Workspace Settings (`.vscode/settings.json`):**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ],
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### 4.2 Environment Setup Checklist

Before starting development, verify:

- [ ] Node.js 22+ is installed
- [ ] npm 10+ is installed
- [ ] Git is configured with your credentials
- [ ] VS Code extensions are installed
- [ ] `npm install` completed successfully
- [ ] `npm run test` passes
- [ ] `npm run storybook` starts without errors

---

## 5. Project Structure Deep Dive

### 5.1 Directory Structure

```
nextgen-design-system/
│
├── src/                          # Source code
│   ├── components/               # UI components (main code)
│   │   ├── Button/               # Example component
│   │   │   ├── Button.tsx        # Component implementation
│   │   │   ├── Button.types.ts   # TypeScript interfaces
│   │   │   ├── Button.test.tsx   # Unit tests
│   │   │   ├── Button.stories.tsx# Storybook stories
│   │   │   └── index.ts          # Public exports
│   │   ├── Icon/                 # Icon component with registry
│   │   ├── Select/               # Complex select component
│   │   └── index.ts              # Barrel export for all components
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useDebounce.ts
│   │   ├── useClickOutside.ts
│   │   └── index.ts
│   │
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts                 # Class name merge utility
│   │   └── index.ts
│   │
│   ├── styles/                   # Global styles
│   │   └── globals.css           # CSS variables and base styles
│   │
│   ├── types/                    # Shared TypeScript types
│   │   └── index.ts
│   │
│   └── index.ts                  # Library entry point
│
├── e2e/                          # Playwright E2E tests
│   ├── button.spec.ts
│   ├── accessibility.spec.ts
│   └── visual-regression.spec.ts
│
├── docs/                         # Documentation
│   ├── DEVELOPER_GUIDE.md
│   ├── TESTING_GUIDE.md
│   ├── CODE_QUALITY.md
│   └── CI_CD.md
│
├── .storybook/                   # Storybook configuration
│   ├── main.ts                   # Main config
│   ├── preview.ts                # Global decorators
│   └── theme.ts                  # Custom theme
│
├── .husky/                       # Git hooks
│   ├── pre-commit                # Lint-staged
│   └── commit-msg                # Commitlint
│
├── coverage/                     # Test coverage reports (generated)
├── dist/                         # Build output (generated)
├── playwright-report/            # E2E reports (generated)
│
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── vite.config.ts                # Vite build configuration
├── vitest.config.ts              # Vitest test configuration
├── playwright.config.ts          # Playwright E2E configuration
├── eslint.config.js              # ESLint configuration
├── sonar-project.properties      # SonarQube configuration
└── azure-pipelines.yml           # CI/CD pipeline
```

### 5.2 Component File Structure

Every component follows this consistent structure:

```
ComponentName/
├── ComponentName.tsx           # Main component implementation
├── ComponentName.types.ts      # TypeScript types and interfaces
├── ComponentName.test.tsx      # Unit tests (Vitest + RTL)
├── ComponentName.stories.tsx   # Storybook documentation
└── index.ts                    # Public exports
```

**Why this structure?**

1. **Separation of Concerns** - Types, tests, and stories are separate files
2. **Co-location** - Related files are together in the same folder
3. **Easy Navigation** - Predictable file naming
4. **Barrel Exports** - Clean import paths via `index.ts`

### 5.3 Import Path Aliases

The project uses path aliases for cleaner imports:

```typescript
// Instead of relative paths:
import { cn } from '../../../utils/cn';

// Use aliases:
import { cn } from '@/utils';
```

**Available Aliases:**

| Alias          | Path             |
| -------------- | ---------------- |
| `@/*`          | `src/*`          |
| `@/components` | `src/components` |
| `@/hooks`      | `src/hooks`      |
| `@/utils`      | `src/utils`      |
| `@/types`      | `src/types`      |

---

## 6. Component Development

### 6.1 Component Development Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                  Component Development Flow                  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Create Structure     2. Define Types     3. Implement   │
│  ┌─────────────┐        ┌─────────────┐     ┌─────────────┐│
│  │  mkdir      │   ──►  │  .types.ts  │ ──► │  .tsx       ││
│  │  Component/ │        │  interfaces │     │  component  ││
│  └─────────────┘        └─────────────┘     └─────────────┘│
│                                                              │
│  4. Write Stories        5. Write Tests      6. Export     │
│  ┌─────────────┐        ┌─────────────┐     ┌─────────────┐│
│  │  .stories   │   ◄──  │  .test.tsx  │ ◄── │  index.ts   ││
│  │  document   │        │  unit tests │     │  barrel     ││
│  └─────────────┘        └─────────────┘     └─────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Step-by-Step: Creating a New Component

Let's create a `Badge` component as an example:

**Step 1: Create Directory Structure**

```bash
mkdir -p src/components/Badge
```

**Step 2: Define Types (`Badge.types.ts`)**

````typescript
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { badgeVariants as BadgeVariantsCVA } from './Badge';

/**
 * Badge variant types derived from CVA configuration
 */
export type BadgeVariants = VariantProps<typeof BadgeVariantsCVA>;

/**
 * Props for the Badge component
 *
 * @example
 * ```tsx
 * <Badge variant="success" size="sm">Active</Badge>
 * ```
 */
export interface BadgeProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'children'>, BadgeVariants {
  /**
   * The content to display inside the badge
   */
  children: ReactNode;

  /**
   * Optional icon to display before the text
   */
  icon?: ReactNode;
}
````

**Step 3: Implement Component (`Badge.tsx`)**

````typescript
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/utils';
import type { BadgeProps } from './Badge.types';

/**
 * Badge variants using Class Variance Authority (CVA)
 *
 * CVA allows us to define type-safe variants that generate
 * consistent class names based on props.
 */
export const badgeVariants = cva(
  // Base styles - applied to ALL badges
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-rounded-full mdt-font-medium',
    'mdt-border mdt-transition-colors',
  ],
  {
    variants: {
      /**
       * Visual style variant
       */
      variant: {
        default: [
          'mdt-border-transparent',
          'mdt-bg-primary mdt-text-primary-foreground',
        ],
        secondary: [
          'mdt-border-transparent',
          'mdt-bg-secondary mdt-text-secondary-foreground',
        ],
        success: [
          'mdt-border-transparent',
          'mdt-bg-success mdt-text-success-foreground',
        ],
        warning: [
          'mdt-border-transparent',
          'mdt-bg-warning mdt-text-warning-foreground',
        ],
        destructive: [
          'mdt-border-transparent',
          'mdt-bg-destructive mdt-text-destructive-foreground',
        ],
        outline: [
          'mdt-border-input mdt-bg-transparent mdt-text-foreground',
        ],
      },
      /**
       * Size variant
       */
      size: {
        sm: 'mdt-h-5 mdt-px-2 mdt-text-xs',
        md: 'mdt-h-6 mdt-px-2.5 mdt-text-sm',
        lg: 'mdt-h-7 mdt-px-3 mdt-text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

/**
 * Badge component for displaying status indicators, counts, or labels.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Badge>New</Badge>
 *
 * // With variant
 * <Badge variant="success">Active</Badge>
 *
 * // With icon
 * <Badge icon={<CheckIcon />}>Verified</Badge>
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {icon && (
          <span className="mdt-mr-1 mdt-flex mdt-shrink-0">{icon}</span>
        )}
        {children}
      </span>
    );
  }
);

// Required for React DevTools and debugging
Badge.displayName = 'Badge';

export { Badge };
````

**Step 4: Create Barrel Export (`index.ts`)**

```typescript
// Export component
export { Badge, badgeVariants } from './Badge';

// Export types
export type { BadgeProps, BadgeVariants } from './Badge.types';
```

**Step 5: Add to Main Exports (`src/components/index.ts`)**

```typescript
// ... existing exports
export * from './Badge';
```

**Step 6: Write Unit Tests (`Badge.test.tsx`)**

```typescript
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Badge } from './Badge';

describe('Badge', () => {
  describe('Rendering', () => {
    it('renders children correctly', () => {
      render(<Badge>New</Badge>);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders as a span element', () => {
      render(<Badge>Test</Badge>);
      expect(screen.getByText('Test').tagName).toBe('SPAN');
    });
  });

  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<Badge>Default</Badge>);
      const badge = screen.getByText('Default');
      expect(badge).toHaveClass('mdt-bg-primary');
    });

    it('applies success variant classes', () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText('Success');
      expect(badge).toHaveClass('mdt-bg-success');
    });

    it('applies outline variant classes', () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText('Outline');
      expect(badge).toHaveClass('mdt-border-input');
    });
  });

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Badge size="sm">Small</Badge>);
      expect(screen.getByText('Small')).toHaveClass('mdt-h-5');
    });

    it('applies large size classes', () => {
      render(<Badge size="lg">Large</Badge>);
      expect(screen.getByText('Large')).toHaveClass('mdt-h-7');
    });
  });

  describe('Icon Support', () => {
    it('renders icon when provided', () => {
      render(
        <Badge icon={<span data-testid="icon">*</span>}>
          With Icon
        </Badge>
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Badge ref={ref}>Ref Test</Badge>);
      expect(ref.current).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Custom className', () => {
    it('merges custom className with variant classes', () => {
      render(<Badge className="custom-class">Custom</Badge>);
      const badge = screen.getByText('Custom');
      expect(badge).toHaveClass('custom-class');
      expect(badge).toHaveClass('mdt-bg-primary');
    });
  });
});
```

**Step 7: Write Storybook Stories (`Badge.stories.tsx`)**

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Icon } from '../Icon';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge component for displaying status indicators, counts, or labels.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'success', 'warning', 'destructive', 'outline'],
      description: 'Visual style variant',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    children: {
      control: 'text',
      description: 'Badge content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge with primary styling.
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

/**
 * All available variant styles.
 */
export const Variants: Story = {
  render: () => (
    <div className="mdt-flex mdt-flex-wrap mdt-gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

/**
 * All available size options.
 */
export const Sizes: Story = {
  render: () => (
    <div className="mdt-flex mdt-items-center mdt-gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

/**
 * Badge with an icon.
 */
export const WithIcon: Story = {
  args: {
    children: 'Verified',
    icon: <Icon name="check" size="xs" aria-hidden />,
    variant: 'success',
  },
};
```

### 6.3 Using the Icon Component

The library includes a centralized Icon component. Always use it instead of inline SVGs:

```typescript
import { Icon } from '../Icon';

// Good - Use Icon component
<Icon name="check" size="sm" aria-hidden />
<Icon name="x" size="xs" className="mdt-text-destructive" aria-hidden />
<Icon name="chevron-down" size="md" aria-hidden />

// Bad - Inline SVG
<svg width="16" height="16" viewBox="0 0 24 24">...</svg>
```

**Available Icons:**

The icon registry is in `src/components/Icon/icons/index.ts`. Common icons include:

- `check`, `x`, `plus`, `minus`
- `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`
- `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`
- `loader`, `search`, `settings`

---

## 7. Styling System

### 7.1 The `mdt-` Prefix Convention

**All Tailwind classes MUST use the `mdt-` prefix.** This prevents CSS conflicts when the library is used alongside other projects.

```tsx
// Correct - With mdt- prefix
<div className="mdt-flex mdt-items-center mdt-gap-4 mdt-bg-primary">

// Incorrect - Without prefix (will NOT work)
<div className="flex items-center gap-4 bg-primary">
```

### 7.2 The `cn()` Utility Function

The `cn()` function from `@/utils` combines `clsx` and `tailwind-merge`:

```typescript
import { cn } from '@/utils';

// Merge multiple class sources
className={cn(
  // Base classes
  'mdt-flex mdt-items-center',
  // Conditional classes
  isActive && 'mdt-bg-primary',
  isDisabled && 'mdt-opacity-50',
  // Variant classes from CVA
  buttonVariants({ variant, size }),
  // User-provided classes (always last to allow overrides)
  className
)}
```

**Why use `cn()`?**

1. **Handles conditionals** - Only includes truthy values
2. **Prevents duplicates** - tailwind-merge deduplicates conflicting classes
3. **Type-safe** - Proper TypeScript support

### 7.3 Semantic Color System

Always use semantic color names, never hardcoded values:

```tsx
// Correct - Semantic colors (adapts to theme)
'mdt-bg-primary mdt-text-primary-foreground';
'mdt-bg-secondary mdt-text-secondary-foreground';
'mdt-bg-destructive mdt-text-destructive-foreground';
'mdt-bg-success mdt-text-success-foreground';
'mdt-border-input';
'mdt-text-muted-foreground';

// Incorrect - Hardcoded colors (won't adapt to themes)
'mdt-bg-blue-500 mdt-text-white';
'mdt-bg-red-600';
'mdt-border-gray-300';
```

**Available Semantic Colors:**

| Category        | Colors                                                 |
| --------------- | ------------------------------------------------------ |
| **Background**  | `background`, `foreground`, `muted`, `card`, `popover` |
| **Primary**     | `primary`, `primary-foreground`                        |
| **Secondary**   | `secondary`, `secondary-foreground`                    |
| **Accent**      | `accent`, `accent-foreground`                          |
| **Destructive** | `destructive`, `destructive-foreground`                |
| **Success**     | `success`, `success-foreground`                        |
| **Warning**     | `warning`, `warning-foreground`                        |
| **Info**        | `info`, `info-foreground`                              |
| **Borders**     | `border`, `input`, `ring`                              |

### 7.4 Typography & System Fonts

The library uses **system fonts by default** for optimal performance and user experience.

#### Why System Fonts?

| Benefit                  | Description                                    |
| ------------------------ | ---------------------------------------------- |
| **Zero Load Time**       | No font files to download                      |
| **Smaller Bundle**       | No font assets shipped with the library        |
| **Native OS Feel**       | Users see familiar fonts from their platform   |
| **No FOUT/FOIT**         | No flash of unstyled or invisible text         |
| **Better Accessibility** | Respects user font size/accessibility settings |
| **Zero CLS**             | Cumulative Layout Shift is eliminated          |

#### Default Font Stack

```css
/* Sans-serif (primary) */
--mdt-font-sans:
  ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans',
  'Liberation Sans', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji';

/* Monospace (code blocks, inputs) */
--mdt-font-mono: ui-monospace, 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

#### Platform-Specific Fonts

| Font            | Platform / Browser               |
| --------------- | -------------------------------- |
| San Francisco   | macOS, iOS (via `-apple-system`) |
| Segoe UI        | Windows 7+                       |
| Noto Sans       | Android, Linux                   |
| Liberation Sans | Linux (fallback)                 |
| Arial           | Universal fallback               |

#### Customizing Fonts (For Consumer Applications)

Consumers integrating this library can override the default fonts using several methods:

##### Method 1: CSS Variables (Recommended)

```css
/* In your application's global CSS */
:root {
  --mdt-font-sans: 'Inter', 'Poppins', system-ui, sans-serif;
  --mdt-font-mono: 'Fira Code', 'JetBrains Mono', monospace;
}
```

##### Method 2: Tailwind Config Override

```typescript
// tailwind.config.ts in consumer application
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
    },
  },
};
```

##### Method 3: CSS Class Override

```css
/* Target library components specifically */
.my-app [class*='mdt-'] {
  font-family: 'Your Custom Font', system-ui, sans-serif;
}
```

> **Important:** When using custom fonts, consumers must load the font files themselves (via `@font-face`, Google Fonts, Adobe Fonts, or self-hosting).

### 7.5 Class Variance Authority (CVA)

CVA is used to create type-safe component variants:

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles (always applied)
  [
    'mdt-inline-flex mdt-items-center mdt-justify-center',
    'mdt-rounded-md mdt-font-medium',
    'mdt-transition-colors',
    'focus-visible:mdt-outline-none focus-visible:mdt-ring-2',
    'disabled:mdt-pointer-events-none disabled:mdt-opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'mdt-bg-primary mdt-text-primary-foreground hover:mdt-bg-primary/90',
        secondary: 'mdt-bg-secondary mdt-text-secondary-foreground hover:mdt-bg-secondary/80',
        outline: 'mdt-border mdt-border-input mdt-bg-background hover:mdt-bg-muted',
        ghost: 'hover:mdt-bg-muted hover:mdt-text-foreground',
        destructive:
          'mdt-bg-destructive mdt-text-destructive-foreground hover:mdt-bg-destructive/90',
      },
      size: {
        sm: 'mdt-h-8 mdt-px-3 mdt-text-sm',
        md: 'mdt-h-9 mdt-px-4 mdt-text-sm',
        lg: 'mdt-h-10 mdt-px-6 mdt-text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Extract types from the variants
export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

---

## 8. TypeScript Patterns

### 8.1 Component Props Pattern

```typescript
// ComponentName.types.ts
import type { VariantProps } from 'class-variance-authority';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

// Import CVA variants with alias to avoid circular reference
import type { componentVariants as ComponentVariantsCVA } from './Component';

// Export variant types
export type ComponentVariants = VariantProps<typeof ComponentVariantsCVA>;

// Main props interface
export interface ComponentProps
  extends
    ComponentPropsWithoutRef<'div'>, // HTML attributes
    ComponentVariants {
  // Variant props
  children: ReactNode;
  // Additional custom props
  customProp?: string;
}
```

### 8.2 Avoiding Circular References

A common mistake that causes build errors:

```typescript
// WRONG - Circular reference
import type { ButtonVariants } from './Button';
export type ButtonVariants = VariantProps<typeof ButtonVariants>;

// CORRECT - Use alias
import type { buttonVariants as ButtonVariantsCVA } from './Button';
export type ButtonVariants = VariantProps<typeof ButtonVariantsCVA>;
```

### 8.3 Ref Forwarding Pattern

Always use `forwardRef` for components that render DOM elements:

```typescript
import { forwardRef } from 'react';

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

// Required for React DevTools
Component.displayName = 'Component';

export { Component };
```

### 8.4 Discriminated Unions for Props

When component behavior varies significantly:

```typescript
// Props that differ based on mode
type SingleSelectProps = {
  mode: 'single';
  value: string | null;
  onValueChange: (value: string | null) => void;
};

type MultiSelectProps = {
  mode: 'multi';
  value: string[];
  onValueChange: (value: string[]) => void;
};

// Base props common to all modes
type BaseSelectProps = {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
};

// Union type
export type SelectProps = BaseSelectProps & (SingleSelectProps | MultiSelectProps);
```

---

## 9. Testing Strategy

### 9.1 Testing Pyramid

```
                    ▲
                   /│\        E2E Tests
                  / │ \       (Playwright - Critical paths)
                 /  │  \
                /───┼───\     Integration Tests
               /    │    \    (Storybook interactions)
              /     │     \
             /──────┼──────\  Unit Tests
            /       │       \ (Vitest + RTL - Most tests)
           /        │        \
          /─────────┼─────────\  Static Analysis
         /          │          \ (TypeScript + ESLint)
        └───────────┴───────────┘
```

### 9.2 Unit Tests (Vitest + React Testing Library)

**What to test:**

- Component renders correctly with different props
- All variants apply correct classes
- User interactions work (click, focus, keyboard)
- Disabled states prevent interaction
- Ref forwarding works
- Accessibility attributes are present

**Running tests:**

```bash
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage report
npm run test:ui           # Visual UI
```

### 9.3 E2E Tests (Playwright)

Located in `e2e/` directory:

```bash
npm run test:e2e              # Run all E2E tests
npm run test:e2e:ui           # Open Playwright UI
npm run test:e2e:headed       # See browser during tests
npm run test:e2e:debug        # Debug mode
```

### 9.4 Coverage Requirements

| Metric     | Minimum |
| ---------- | ------- |
| Branches   | 90%     |
| Functions  | 90%     |
| Lines      | 90%     |
| Statements | 90%     |

---

## 10. Storybook Documentation

### 10.1 Story Structure

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component', // Navigation path
  component: Component, // The component
  tags: ['autodocs'], // Auto-generate docs
  parameters: {
    layout: 'centered', // Story layout
    docs: {
      description: {
        component: 'Component description for documentation.',
      },
    },
  },
  argTypes: {
    // Control definitions
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### 10.2 Accessibility in Stories

All interactive elements must have accessible names:

```typescript
// Icon button - MUST have aria-label
export const IconButton: Story = {
  args: {
    children: <Icon name="plus" size="sm" aria-hidden />,
    'aria-label': 'Add item',  // Required!
  },
};

// Input without visible label
export const SearchInput: Story = {
  args: {
    placeholder: 'Search...',
    'aria-label': 'Search input',  // Required!
  },
};
```

---

## 11. Code Quality & Linting

### 11.1 ESLint Rules

Key rules enforced:

- TypeScript strict checking
- React hooks rules
- Accessibility (jsx-a11y)
- No unused variables
- Consistent imports

```bash
npm run lint        # Check errors
npm run lint:fix    # Auto-fix
```

### 11.2 Pre-commit Hooks

Husky + lint-staged run automatically:

1. **Pre-commit**: ESLint + Prettier on staged files
2. **Commit-msg**: Commitlint validates message format

### 11.3 Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(button): add loading state variant
fix(input): resolve focus ring styling
docs: update developer guide
test(card): add accessibility tests
chore: update dependencies
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

---

## 12. CI/CD Pipeline

### 12.1 Pipeline Stages

```
┌─────────────────────────────────────────────────────────────┐
│                    Azure DevOps Pipeline                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Stage 1: Quality                                            │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │   Lint    │  │   Type    │  │   Unit    │               │
│  │   Check   │  │   Check   │  │   Tests   │               │
│  └───────────┘  └───────────┘  └───────────┘               │
│                       │                                      │
│                       ▼                                      │
│  Stage 2: Build                                              │
│  ┌───────────┐  ┌───────────┐                               │
│  │  Library  │  │  Bundle   │                               │
│  │   Build   │  │   Size    │                               │
│  └───────────┘  └───────────┘                               │
│                       │                                      │
│                       ▼                                      │
│  Stage 3: Storybook                                          │
│  ┌───────────┐  ┌───────────┐                               │
│  │ Storybook │  │   E2E     │                               │
│  │   Build   │  │   Tests   │                               │
│  └───────────┘  └───────────┘                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 12.2 Quality Gates

| Stage     | Check         | Threshold    |
| --------- | ------------- | ------------ |
| Quality   | Lint          | No errors    |
| Quality   | TypeScript    | No errors    |
| Quality   | Unit Tests    | 90% coverage |
| Build     | Library Build | Must succeed |
| Build     | Bundle Size   | ≤50KB main   |
| Storybook | Build         | Must succeed |
| E2E       | Playwright    | All pass     |

---

## 13. Best Practices

### 13.1 Component Development

1. **Always use `forwardRef`** for DOM-rendering components
2. **Always use `mdt-` prefix** for Tailwind classes
3. **Always use semantic colors** (not hardcoded values)
4. **Always add `displayName`** for debugging
5. **Always export types** from the index file

### 13.2 Accessibility

1. **All interactive elements need accessible names**
2. **Use semantic HTML** (`button`, `input`, not `div`)
3. **Support keyboard navigation**
4. **Test with screen readers**
5. **Follow WCAG 2.1 AA guidelines**

### 13.3 Testing

1. **Test user behavior**, not implementation
2. **Use semantic queries** (`getByRole`, not `getByTestId`)
3. **Test all variants and states**
4. **Include accessibility tests**
5. **Aim for 90%+ coverage**

### 13.4 Code Quality

1. **No `any` types** without justification
2. **No `eslint-disable`** without comments
3. **Keep components focused** - single responsibility
4. **Avoid prop drilling** - use composition
5. **Document public APIs** with JSDoc

---

## 14. Troubleshooting

### 14.1 Common Issues

**"Module not found" errors:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors after update:**

```bash
npm run typecheck
```

**Storybook not loading:**

```bash
npm run build
npm run storybook
```

**Tests failing unexpectedly:**

```bash
npm run test -- --clearCache
npm run test
```

**E2E tests timing out:**

1. Ensure Storybook is running
2. Increase timeout in playwright.config.ts
3. Check selectors are correct

### 14.2 Getting Help

1. Check existing documentation in `docs/`
2. Search for similar issues in Azure DevOps
3. Ask in the team channel
4. Create an issue with reproduction steps

---

## 15. Resources & References

### 15.1 Official Documentation

| Resource     | URL                                      |
| ------------ | ---------------------------------------- |
| React        | https://react.dev/                       |
| TypeScript   | https://www.typescriptlang.org/docs/     |
| Tailwind CSS | https://tailwindcss.com/docs             |
| Radix UI     | https://www.radix-ui.com/docs/primitives |
| Storybook    | https://storybook.js.org/docs            |
| Playwright   | https://playwright.dev/docs              |
| Vitest       | https://vitest.dev/                      |
| CVA          | https://cva.style/docs                   |

### 15.2 Internal Documentation

| Document               | Path                      |
| ---------------------- | ------------------------- |
| Developer Guide        | `docs/DEVELOPER_GUIDE.md` |
| Testing Guide          | `docs/TESTING_GUIDE.md`   |
| Code Quality           | `docs/CODE_QUALITY.md`    |
| CI/CD Guide            | `docs/CI_CD.md`           |
| Claude AI Instructions | `CLAUDE.md`               |

### 15.3 Key Configuration Files

| File                       | Purpose                    |
| -------------------------- | -------------------------- |
| `tsconfig.json`            | TypeScript configuration   |
| `tailwind.config.ts`       | Tailwind CSS configuration |
| `vite.config.ts`           | Build configuration        |
| `vitest.config.ts`         | Test configuration         |
| `playwright.config.ts`     | E2E test configuration     |
| `eslint.config.js`         | Linting rules              |
| `sonar-project.properties` | SonarQube settings         |

---

## Appendix A: Quick Reference Card

### Commands

```bash
# Development
npm run storybook         # Start Storybook
npm run dev               # Start Vite dev server

# Testing
npm run test              # Run unit tests
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage
npm run test:e2e          # E2E tests

# Quality
npm run lint              # Check linting
npm run lint:fix          # Fix linting
npm run format            # Format code
npm run typecheck         # Type check

# Building
npm run build             # Build library
npm run build-storybook   # Build Storybook
npm run size              # Check bundle size
```

### File Naming

```
ComponentName/
├── ComponentName.tsx        # Implementation
├── ComponentName.types.ts   # Types
├── ComponentName.test.tsx   # Tests
├── ComponentName.stories.tsx # Stories
└── index.ts                 # Exports
```

### Import Aliases

```typescript
import { cn } from '@/utils';
import { Button } from '@/components';
import { useDebounce } from '@/hooks';
```

---

_Last updated: January 2026_
_Version: 1.0.0_
