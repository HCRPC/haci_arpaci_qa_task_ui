const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2, // Localde ve CI'da 2 worker kullan
  reporter: 'html',
  use: {
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    timeout: 120000,
  },

  /*
   * To run tests on a specific browser, use the --project flag.
   * e.g., npx playwright test --project=chromium
   */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
