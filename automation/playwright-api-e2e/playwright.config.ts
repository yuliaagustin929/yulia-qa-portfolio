import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://reqres.in/api',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'API Tests',
      testMatch: /.*api\/.*\.spec\.ts/,
    },
    {
      name: 'Chromium E2E',
      testMatch: /.*e2e\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      testMatch: /.*e2e\/.*\.spec\.ts/,
      use: { ...devices['iPhone 14'] },
    },
  ],
});
