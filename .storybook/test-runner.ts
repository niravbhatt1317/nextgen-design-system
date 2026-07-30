import type { TestRunnerConfig } from '@storybook/test-runner';
import { getStoryContext } from '@storybook/test-runner';
import { injectAxe, checkA11y } from 'axe-playwright';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

// Type for a11y rule configuration
interface A11yRule {
  id: string;
  enabled: boolean;
}

interface A11yConfig {
  rules?: A11yRule[];
}

interface A11yParameters {
  config?: A11yConfig;
}

/*
 * See https://storybook.js.org/docs/writing-tests/test-runner#test-hook-api
 * to learn more about the test-runner hooks API.
 */
const config: TestRunnerConfig = {
  setup() {
    // Add custom visual testing matcher
    expect.extend({ toMatchImageSnapshot });
  },
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    // Get the entire context of a story, including parameters, args, argTypes, etc.
    const storyContext = await getStoryContext(page, context);

    // Do not run a11y tests on docs pages
    if (storyContext.parameters.docsOnly) {
      return;
    }

    // Get the a11y config from story parameters (if any)
    const a11yParams = storyContext.parameters.a11y as A11yParameters | undefined;
    const a11yRules: A11yRule[] = a11yParams?.config?.rules ?? [];

    // Build axe options by merging default options with story-specific rules
    const axeOptions = {
      runOnly: {
        type: 'tag' as const,
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
      },
      rules: a11yRules.reduce<Record<string, { enabled: boolean }>>((acc, rule) => {
        acc[rule.id] = { enabled: rule.enabled };
        return acc;
      }, {}),
    };

    // Apply custom accessibility checks
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
      axeOptions,
    });

    // Visual Regression Testing
    // Skip if explicitly disabled via story parameters or environment variable
    if (storyContext.parameters.visualTest === false || process.env.SKIP_VISUAL_TESTS === 'true') {
      return;
    }

    // Wait for any animations to complete
    await page.waitForTimeout(500);

    // Take a screenshot of the story
    const image = await page.screenshot({
      fullPage: false,
      animations: 'disabled', // Disable animations for consistent screenshots
    });

    // Compare with baseline snapshot
    expect(image).toMatchImageSnapshot({
      customSnapshotsDir: `${process.cwd()}/.storybook/__image_snapshots__`,
      customSnapshotIdentifier: context.id,
      failureThreshold: 0.01, // Allow 1% pixel difference
      failureThresholdType: 'percent',
      customDiffConfig: {
        threshold: 0.1, // Lower threshold = more sensitive to changes
      },
    });
  },
};

export default config;
