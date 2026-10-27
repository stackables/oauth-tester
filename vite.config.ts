import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

const repo = import.meta.dirname;

export default defineConfig({
  // src/index.html is the page; what Vite resolves from its root (public/, dist/, wrangler.jsonc) stays at the repo's
  root: resolve(repo, "src"),
  publicDir: resolve(repo, "public"),
  // cloudflare(): the Worker in api/ (wrangler.jsonc), run in workerd by `pnpm dev` and `pnpm preview` too
  plugins: [
    react(),
    tailwindcss(),
    cloudflare({
      configPath: resolve(repo, "wrangler.jsonc"),
      // dev's local state, beside the repo's other files rather than in src/
      persistState: { path: resolve(repo, ".wrangler/state") },
    }),
  ],
  resolve: { alias: { "@": resolve(repo, "src") } },
  server: {
    // a factory box's site, https://box-<name>.orb.local (.devcontainer/start.sh)
    allowedHosts: [".orb.local"],
  },
  build: { outDir: resolve(repo, "dist"), emptyOutDir: true },
});
