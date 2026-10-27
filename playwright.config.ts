import { defineConfig } from "@playwright/test";

const port = 3000;

export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "retain-on-failure",
  },
  webServer: {
    // serves dist/ and the Pages Functions the way Cloudflare Pages does; build first (CI does, see
    // .github/workflows/e2e.yml)
    command: "pnpm start",
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
