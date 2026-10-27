# Agent instructions

- `pnpm knip` and `pnpm knip --production` both fail CI (steps of `.github/workflows/e2e.yml`). Run both before you push. The production run leaves out tests and devDependencies, so code that only a test calls counts as dead there: delete it, or move it into the test. Fix what knip finds by deleting the dead code or the unused dependency; an `ignore` entry in `knip.ts` needs a comment saying why.
