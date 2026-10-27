import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": resolve(import.meta.dirname, "src") } },
  server: {
    port: 3000,
    // `wrangler pages dev` serves the Pages Functions (see package.json "dev")
    proxy: {
      "/token": "http://localhost:8788",
      "/userinfo": "http://localhost:8788",
      "/.well-known/jwks.json": "http://localhost:8788",
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        authorize: resolve(import.meta.dirname, "authorize/index.html"),
      },
    },
  },
});
