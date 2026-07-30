import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Test Configuration for Motadata React Library
 *
 * This configuration runs E2E tests against the Storybook development server.
 * Tests are located in the `e2e/` directory.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directory containing test files
  testDir: './e2e',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Limit parallel workers on CI for stability
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    // Always output to console
    ['list'],
    // HTML report for local debugging
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    // JUnit for Azure DevOps integration
    ['junit', { outputFile: 'e2e-results/junit.xml' }],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for Storybook
    baseURL: 'http://localhost:6006',

    // Collect trace on first retry
    trace: 'on-first-retry',

    // Screenshot on failure only
    screenshot: 'only-on-failure',

    // Video recording on failure only
    video: 'on-first-retry',

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Timeout for actions
    actionTimeout: 10000,
  },

  // Configure projects for different browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile viewports (optional - uncomment to enable)
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  // Run Storybook before starting the tests
  webServer: {
    command: 'npm run storybook',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120000, // 2 minutes to start Storybook
    stdout: 'pipe',
    stderr: 'pipe',
  },

  // Global timeout for each test
  timeout: 30000,

  // Expect timeout
  expect: {
    timeout: 5000,
  },

  // Output directory for test artifacts
  outputDir: 'e2e-results/test-results',
});
