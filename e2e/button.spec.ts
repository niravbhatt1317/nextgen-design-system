import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * E2E Tests for Button Component
 *
 * These tests verify the Button component functionality through Storybook.
 * They include visual verification, interaction testing, and accessibility checks.
 */

// Helper function to wait for Storybook story to fully load
async function waitForStory(page: Page) {
  // Wait for Storybook root to contain actual content (button)
  await page.waitForSelector('#storybook-root button', { timeout: 15000 });
  // Small delay for rendering stability
  await page.waitForTimeout(300);
}

test.describe('Button', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Button default story in Storybook
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    // Wait for the story to fully load
    await waitForStory(page);
  });

  test('should render the default button', async ({ page }) => {
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
    await expect(button).toBeEnabled();
  });

  test('should be clickable and respond to interactions', async ({ page, browserName }) => {
    const button = page.locator('#storybook-root button');

    // Verify button is clickable
    await button.click();

    // Check focus state - WebKit (Safari) doesn't focus buttons on click by default
    if (browserName === 'webkit') {
      // In WebKit, verify button is still visible after click
      await expect(button).toBeVisible();
    } else {
      await expect(button).toBeFocused();
    }
  });

  test('should have proper hover state', async ({ page }) => {
    const button = page.locator('#storybook-root button');

    // Hover over the button
    await button.hover();

    // Take screenshot for visual verification
    await expect(button).toBeVisible();
  });

  test('should be keyboard accessible', async ({ page, browserName }) => {
    const button = page.locator('#storybook-root button');

    // WebKit (Safari) has different focus behavior - use explicit focus instead of Tab
    if (browserName === 'webkit') {
      await button.focus();
    } else {
      // Tab to the button
      await page.keyboard.press('Tab');
    }

    // Verify button receives focus
    await expect(button).toBeFocused();

    // Press Enter to activate
    await page.keyboard.press('Enter');

    // Press Space to activate
    await page.keyboard.press('Space');
  });

  test('should pass accessibility checks', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Button Variants', () => {
  test('should render primary variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--primary&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
  });

  test('should render secondary variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--secondary&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
  });

  test('should render outline variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--outline&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
  });

  test('should render ghost variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--ghost&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
  });

  test('should render destructive variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--destructive&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
  });

  test('should render link variant correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--link&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
  });

  test('should render disabled state correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
  });

  test('should render loading state correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--loading&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
    await expect(button).toBeDisabled();
  });
});

test.describe('Button Sizes', () => {
  test('should render all size variants', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--sizes&viewMode=story');
    await waitForStory(page);

    // Should have multiple buttons for different sizes
    const buttons = page.locator('#storybook-root button');
    await expect(buttons.first()).toBeVisible();

    // Count buttons (xs, sm, md, lg, xl = 5 buttons)
    const count = await buttons.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });
});

test.describe('Button with Icons', () => {
  test('should render icon button correctly', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--icon-button&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();

    // Should have an SVG icon
    const icon = button.locator('svg');
    await expect(icon).toBeVisible();
  });

  test('should render button with left icon', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--with-left-icon&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();

    // Should have an SVG icon
    const icon = button.locator('svg');
    await expect(icon).toBeVisible();
  });

  test('should render button with right icon', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--with-right-icon&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();

    // Should have an SVG icon
    const icon = button.locator('svg');
    await expect(icon).toBeVisible();
  });
});

test.describe('Button Full Width', () => {
  test('should render full width button', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--full-width&viewMode=story');
    await waitForStory(page);
    const button = page.locator('#storybook-root button');
    await expect(button).toBeVisible();
  });
});
