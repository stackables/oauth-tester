import { defineConfig } from "@playwright/test";

// `vite preview`'s
const port = 4173;

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
    // serves the build, the assets and the Worker, in workerd as Cloudflare does; build first (CI does, see
    // .github/workflows/e2e.yml)
    command: "pnpm preview",
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
