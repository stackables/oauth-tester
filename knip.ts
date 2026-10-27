import type { KnipConfig } from "knip";

// `--production` leaves out tests and devDependencies: code only a test calls counts as dead there
const production = process.argv.includes("--production");

const config: KnipConfig = {
  // an internal app: nothing imports it, so its exports are dead unless something else in the repo uses them
  includeEntryExports: true,
  // pnpm knip: every export needs an importer, so an export only its own file uses is not exported.
  // --production: a use in the export's own file counts as a use
  ignoreExportsUsedInFile: production,
  include: [
    "files",
    "dependencies",
    "unlisted",
    "binaries",
    "unresolved",
    "exports",
    "types",
    "nsTypes",
    "enumMembers",
    "namespaceMembers",
    "duplicates",
    "cycles",
  ],
  // knip reports cycles as a warning by default, which never fails CI
  rules: { cycles: "error" },
  // `pnpm run deploy` runs wrangler, a devDependency that --production leaves out
  ignoreBinaries: production ? ["wrangler"] : [],
  // the Worker, wrangler.jsonc's main
  entry: ["api/index.ts!"],
  // ...whose default export workerd calls, so no importer is expected
  ignoreIssues: { "api/index.ts": ["exports"] },
  project: ["src/**/*.{ts,tsx,css}!", "api/**/*.ts!", "e2e/**/*.ts", "*.{ts,mjs}"],
};

export default config;
