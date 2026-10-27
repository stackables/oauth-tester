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
  project: ["src/**/*.{ts,tsx,css}!", "e2e/**/*.ts", "*.{ts,mjs}"],
};

export default config;
