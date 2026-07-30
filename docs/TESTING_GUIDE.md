# Testing Guide

This guide covers all aspects of testing in the Motadata React Library, including unit tests, component tests, E2E tests, and visual regression tests.

## Table of Contents

- [Testing Philosophy](#testing-philosophy)
- [Testing Stack](#testing-stack)
- [Unit Testing with Vitest](#unit-testing-with-vitest)
- [Component Testing with Storybook](#component-testing-with-storybook)
- [E2E Testing with Playwright](#e2e-testing-with-playwright)
- [Visual Regression Testing](#visual-regression-testing)
- [Accessibility Testing](#accessibility-testing)
- [Coverage Requirements](#coverage-requirements)
- [Best Practices](#best-practices)

---

## Testing Philosophy

Our testing strategy follows the **Testing Trophy** approach:

```
       /\
      /  \       E2E Tests (few, critical paths)
     /----\
    /      \     Integration Tests (Storybook)
   /--------\
  /          \   Unit Tests (component logic)
 /------------\
/              \ Static Analysis (TypeScript, ESLint, SonarLint)
```

**Principles:**

1. **Write tests that give confidence** - Focus on user behavior, not implementation details
2. **Accessibility is not optional** - Every component must pass a11y checks
3. **Visual consistency matters** - Use visual regression testing for UI components
4. **Coverage is a guide, not a goal** - 90% minimum, but prioritize meaningful tests

---

## Testing Stack

| Tool                      | Purpose                             |
| ------------------------- | ----------------------------------- |
| **Vitest**                | Unit testing framework              |
| **React Testing Library** | Component testing utilities         |
| **Storybook**             | Component documentation & testing   |
| **Playwright**            | E2E testing & cross-browser testing |
| **axe-core**              | Accessibility testing               |
| **Chromatic**             | Visual regression testing           |
| **jest-image-snapshot**   | Screenshot comparison               |

---

## Unit Testing with Vitest

### Running Tests

```bash
# Run all tests
npm run test

# Run in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Open Vitest UI
npm run test:ui
```

### Test File Structure

```
src/components/Button/
├── Button.tsx
├── Button.types.ts
├── Button.test.tsx      # Unit tests
└── Button.stories.tsx   # Storybook stories
```

### Writing Unit Tests

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders correctly with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('mdt-bg-primary');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
```

### Testing Best Practices

1. **Query by role first** - Use `getByRole` for accessibility
2. **Use user-event** - Simulates real user interactions
3. **Test behavior, not implementation** - Focus on what users see/do
4. **One assertion per concept** - Keep tests focused

---

## Component Testing with Storybook

### Writing Stories

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="mdt-flex mdt-gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};
```

### Storybook Tests

```bash
# Run Storybook tests
npm run test:storybook

# Build and test
npm run test:storybook:ci
```

---

## E2E Testing with Playwright

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Open Playwright UI
npm run test:e2e:ui

# Run with browser visible
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug

# Update visual snapshots
npm run test:e2e:update-snapshots
```

### E2E Test Structure

```
e2e/
├── button.spec.ts           # Button component tests
├── accessibility.spec.ts    # Global a11y tests
└── visual-regression.spec.ts # Visual tests
```

### Writing E2E Tests

```typescript
// e2e/button.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
  });

  test('should be clickable', async ({ page }) => {
    const button = page.locator('button');
    await button.click();
    await expect(button).toBeFocused();
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');
    const button = page.locator('button');
    await expect(button).toBeFocused();
    await page.keyboard.press('Enter');
  });
});
```

### Cross-Browser Testing

Tests run on multiple browsers:

- Chromium (Chrome, Edge)
- Firefox
- WebKit (Safari)

Configure in `playwright.config.ts`:

```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit', use: { ...devices['Desktop Safari'] } },
],
```

---

## Visual Regression Testing

### Chromatic (Recommended)

Chromatic provides cloud-based visual testing with Storybook integration.

```bash
npm run chromatic
```

### Playwright Screenshots

Local visual testing with Playwright:

```typescript
test('button visual test', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--default&viewMode=story');
  const button = page.locator('button');
  await expect(button).toHaveScreenshot('button-default.png');
});
```

Update baselines:

```bash
npm run test:e2e:update-snapshots
```

---

## Accessibility Testing

### Automated Testing

1. **Storybook addon-a11y** - Real-time a11y checks in Storybook
2. **axe-core** - Automated a11y audits in E2E tests

### axe-core in E2E Tests

```typescript
import AxeBuilder from '@axe-core/playwright';

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/iframe.html?id=components-button--default&viewMode=story');

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  expect(results.violations).toEqual([]);
});
```

### Manual Testing Checklist

- [ ] Keyboard navigation works
- [ ] Focus is visible
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Interactive elements have accessible names

---

## Coverage Requirements

### Minimum Thresholds

| Metric     | Threshold |
| ---------- | --------- |
| Branches   | 90%       |
| Functions  | 90%       |
| Lines      | 90%       |
| Statements | 90%       |

### Viewing Coverage Reports

```bash
npm run test:coverage
```

Reports are generated in:

- **Console**: Summary displayed
- **HTML**: `coverage/index.html`
- **LCOV**: `coverage/lcov.info` (for SonarQube)

### What to Cover

**Must test:**

- All component variants
- User interactions (click, focus, keyboard)
- Disabled states
- Error states
- Accessibility requirements

**Optional:**

- Edge cases
- Performance scenarios
- Animation timing

---

## Best Practices

### 1. Test User Behavior

```tsx
// ✅ Good - Tests what user sees
expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();

// ❌ Bad - Tests implementation
expect(button.props.disabled).toBe(false);
```

### 2. Use Semantic Queries

```tsx
// ✅ Good - Accessible query
screen.getByRole('button', { name: /submit/i });

// ❌ Bad - Implementation detail
screen.getByTestId('submit-btn');
```

### 3. Avoid Testing Styling Directly

```tsx
// ✅ Good - Test visual state indirectly
expect(button).toHaveAttribute('disabled');

// ❌ Bad - Testing CSS classes
expect(button).toHaveClass('mdt-opacity-50');
```

### 4. Keep Tests Independent

Each test should:

- Set up its own state
- Not depend on other tests
- Clean up after itself

### 5. Use Descriptive Test Names

```tsx
// ✅ Good
it('disables submit button when form is invalid', () => {});

// ❌ Bad
it('button test', () => {});
```

---

## Troubleshooting

### Flaky Tests

1. Add explicit waits: `await page.waitForSelector()`
2. Use `waitFor` in RTL: `await waitFor(() => expect(...).toBe(...))`
3. Check for race conditions

### Coverage Not Updating

```bash
npm run test -- --clearCache
npm run test:coverage
```

### Storybook Tests Failing

1. Rebuild Storybook: `npm run build-storybook`
2. Check for console errors
3. Verify story exports

### Playwright Tests Timing Out

1. Increase timeout in config
2. Check if Storybook is running
3. Verify selectors are correct

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [axe-core Rules](https://dequeuniversity.com/rules/axe/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
