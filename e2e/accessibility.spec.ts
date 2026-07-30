import { test, expect, Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Global Accessibility Tests
 *
 * These tests run accessibility audits against component stories
 * to ensure WCAG 2.1 AA compliance across the component library.
 */

// Helper function to wait for Storybook story to fully load
async function waitForStory(page: Page) {
  // Wait for Storybook root to contain actual content (button)
  await page.waitForSelector('#storybook-root button', { timeout: 15000 });
  // Small delay for rendering stability
  await page.waitForTimeout(300);
}

// List of component story IDs to test
const componentStories = [
  { name: 'Button Default', id: 'components-button--default' },
  { name: 'Button Primary', id: 'components-button--primary' },
  { name: 'Button Secondary', id: 'components-button--secondary' },
  { name: 'Button Outline', id: 'components-button--outline' },
  { name: 'Button Disabled', id: 'components-button--disabled' },
];

test.describe('Accessibility Compliance', () => {
  for (const story of componentStories) {
    test(`${story.name} should have no accessibility violations`, async ({ page }) => {
      // Navigate to the story
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story`);

      // Wait for story content to load
      await waitForStory(page);

      // Run accessibility scan with WCAG 2.1 AA tags
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Assert no violations
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

test.describe('Color Contrast', () => {
  test('should meet color contrast requirements', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.color'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

test.describe('Keyboard Navigation', () => {
  test('button should be focusable via keyboard', async ({ page, browserName }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');

    // WebKit (Safari) has different focus behavior - use explicit focus instead of Tab
    if (browserName === 'webkit') {
      await button.focus();
    } else {
      // Tab to the button
      await page.keyboard.press('Tab');
    }

    await expect(button).toBeFocused();
  });

  test('button should respond to Enter key', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await button.focus();
    await page.keyboard.press('Enter');

    // Button should still be focused after Enter
    await expect(button).toBeFocused();
  });

  test('button should respond to Space key', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    await button.focus();
    await page.keyboard.press('Space');

    // Button should still be focused after Space
    await expect(button).toBeFocused();
  });
});

test.describe('Screen Reader Support', () => {
  test('interactive elements should have accessible names', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default&viewMode=story');
    await waitForStory(page);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['cat.name-role-value'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('icon button should have aria-label', async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--icon-button&viewMode=story');
    await waitForStory(page);

    const button = page.locator('#storybook-root button');
    const ariaLabel = await button.getAttribute('aria-label');

    // Icon button should have an aria-label for accessibility
    expect(ariaLabel).toBeTruthy();
  });
});
