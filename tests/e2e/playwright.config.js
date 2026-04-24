// @ts-check
const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  testDir: './specs',
  fullyParallel: true,
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // Dev servers must already be running (use /start before running tests)
  // webServer: not configured — assumes frontend on :3000 and backend on :8001
})
