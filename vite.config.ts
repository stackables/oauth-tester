import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  // cloudflare(): the Worker in api/ (wrangler.jsonc), run in workerd by `pnpm dev` and `pnpm preview` too
  plugins: [react(), tailwindcss(), cloudflare()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  server: {
    // a factory box's site, https://box-<name>.orb.local (.devcontainer/start.sh)
    allowedHosts: [".orb.local"],
  },
});
