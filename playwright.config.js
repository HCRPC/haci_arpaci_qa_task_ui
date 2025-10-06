const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2, // UI testleri için 2 worker
  reporter: 'html',
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    timeout: 120000,
  },

  projects: [
    {
      name: 'chromium',
      testMatch: 'ui/**/*.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: 'ui/**/*.spec.js',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'api',
      testMatch: 'api/**/*.spec.js',
      use: {},
      workers: 1, // API testleri için 1 worker
    },
  ],
});
