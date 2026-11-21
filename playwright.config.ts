import { defineConfig } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  outputDir:
    process.env.PLAYWRIGHT_OUTPUT_DIR ||
    join(tmpdir(), "roin-world-playwright"),
  timeout: 60_000,
  expect: { timeout: 8_000 },
  workers: 2,
  retries: 0,
  reporter: "list",
  use: {
    browserName: "chromium",
    baseURL: process.env.TEST_BASE_URL || "http://localhost:3000",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    },
    viewport: { width: 1440, height: 960 },
    locale: "ru-RU",
    reducedMotion: "reduce",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
