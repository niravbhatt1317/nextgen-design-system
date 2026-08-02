# Contributing to Motadata React Library

Thank you for your interest in contributing to Motadata React Library! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 10 or higher
- Git

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nextgen-design-system.git
   cd nextgen-design-system
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. Start Storybook for component development:

   ```bash
   npm run storybook
   ```

2. Run tests in watch mode:

   ```bash
   npm run test:watch
   ```

3. Make your changes following the guidelines below

4. Ensure all checks pass:
   ```bash
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   ```

## Component Development Guidelines

### Creating a New Component

1. Create a new folder in `src/components/` with the component name
2. Include the following files:
   - `ComponentName.tsx` - Component implementation
   - `ComponentName.types.ts` - TypeScript interfaces and types
   - `ComponentName.test.tsx` - Unit tests
   - `ComponentName.stories.tsx` - Storybook stories
   - `index.ts` - Exports

### Component Requirements

- **TypeScript**: All components must be written in TypeScript with strict mode
- **Accessibility**: Follow WAI-ARIA guidelines; use Radix UI primitives where applicable
- **Testing**: Minimum 90% code coverage; test all user interactions
- **Documentation**: Include JSDoc comments and Storybook stories
- **Styling**: Use Tailwind CSS with the `mdt-` prefix; support dark mode

### Code Style

- Use `forwardRef` for all components that render DOM elements
- Export both the component and its types
- Use Class Variance Authority (CVA) for variant management
- Use the `cn()` utility for merging class names

Example component structure:

```tsx
import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
import type { ComponentProps } from './Component.types';

export const componentVariants = cva('mdt-base-classes', {
  variants: {
    variant: {
      default: 'mdt-default-styles',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return <div ref={ref} className={cn(componentVariants({ variant }), className)} {...props} />;
  }
);

Component.displayName = 'Component';

export { Component };
```

## Testing Guidelines

### Writing Tests

- Test component rendering
- Test all variants and props
- Test user interactions
- Test accessibility features
- Test edge cases and error states

### Test Structure

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Component } from './Component';

describe('Component', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      // ...
    });
  });

  describe('Variants', () => {
    // Test each variant
  });

  describe('Interactions', () => {
    // Test user interactions
  });

  describe('Accessibility', () => {
    // Test a11y features
  });
});
```

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

### Commit Message Format

```text
type(scope): description

[optional body]

[optional footer]
```

Examples:

```text
feat(button): add loading state with spinner
fix(input): correct focus ring color in dark mode
docs(readme): update installation instructions
```

## Pull Request Process

### Before Submitting

1. Ensure your branch is up to date with `main`
2. Run all checks locally:
   ```bash
   npm run lint
   npm run typecheck
   npm run test
   npm run build
   ```
3. Create a changeset if your changes affect the public API:
   ```bash
   npm run changeset
   ```

### PR Requirements

- Clear description of changes
- Screenshots/videos for UI changes
- Tests for new functionality
- Updated documentation if needed
- Passing CI checks

### PR Title Format

Use the same format as commit messages:

```text
feat(button): add loading state with spinner
```

## Creating Changesets

For changes that should be published:

1. Run `npm run changeset`
2. Select the packages affected
3. Choose the bump type (patch/minor/major)
4. Write a summary of changes
5. Commit the changeset file

## Reporting Issues

### Bug Reports

Include:

- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Environment details (browser, OS, versions)
- Screenshots if applicable

### Feature Requests

Include:

- Clear description of the feature
- Use case and motivation
- Proposed implementation (if any)
- Examples from other libraries (if applicable)

## Questions?

Feel free to open a GitHub issue for any questions about contributing.

Thank you for contributing!
