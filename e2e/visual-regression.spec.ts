import { test, expect, Page } from '@playwright/test';

/**
 * Visual Regression Tests
 *
 * These tests capture screenshots of components for visual regression testing.
 * Screenshots are compared against baseline images to detect unintended visual changes.
 *
 * Note: On first run, baseline screenshots will be created.
 * Run `npx playwright test --update-snapshots` to update baselines.
 */

// Helper function to wait for Storybook story to fully load
async function waitForStory(page: Page) {
  // Wait for Storybook root to contain actual content (button)
  await page.waitForSelector('#storybook-root button', { timeout: 15000 });
  // Small delay for rendering stability
  await page.waitForTimeout(300);
}

test.describe('Visual Regression - Button Component', () => {
  test('button default state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await expect(button).toHaveScreenshot('button-default.png');
  });

  test('button primary variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--primary&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await expect(button).toHaveScreenshot('button-primary.png');
  });

  test('button secondary variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--secondary&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await expect(button).toHaveScreenshot('button-secondary.png');
  });

  test('button outline variant', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--outline&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await expect(button).toHaveScreenshot('button-outline.png');
  });

  test('button disabled state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--disabled&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await expect(button).toHaveScreenshot('button-disabled.png');
  });

  test('button hover state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await button.hover();

    // Small delay to ensure hover styles are applied
    await page.waitForTimeout(100);

    await expect(button).toHaveScreenshot('button-hover.png');
  });

  test('button focus state', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await button.focus();

    await expect(button).toHaveScreenshot('button-focus.png');
  });
});

test.describe('Visual Regression - Button Sizes', () => {
  test('button sizes showcase', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--sizes&viewMode=story');
    await waitForStory(page);

    // Wait for all buttons to be visible
    const buttons = page.locator('#storybook-root button');
    await expect(buttons.first()).toBeVisible();

    // Take screenshot of the entire sizes showcase
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-sizes.png');
  });

  test('button icon only', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--icon-button&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await expect(button).toHaveScreenshot('button-icon.png');
  });

  test('button with left icon', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--with-left-icon&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await expect(button).toHaveScreenshot('button-with-left-icon.png');
  });

  test('button with right icon', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--with-right-icon&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await expect(button).toHaveScreenshot('button-with-right-icon.png');
  });
});

test.describe('Visual Regression - Theme Support', () => {
  test('button in light mode', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    // Ensure light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });

    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-light-mode.png');
  });

  test('button in dark mode', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    // Enable dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });

    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-dark-mode.png');
  });
});

// Template for adding more component visual tests
// test.describe('Visual Regression - [ComponentName]', () => {
//   test('[component] default state', async ({ page }) => {
//     await page.goto('/iframe.html?id=components-[component]--default&viewMode=story');
//     await page.waitForLoadState('networkidle');
//
//     const component = page.locator('[selector]');
//     await expect(component).toHaveScreenshot('[component]-default.png');
//   });
// });
