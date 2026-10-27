// The Worker: the mock API, and the authorize page. Cloudflare serves everything else from the static assets
// (wrangler.jsonc, "run_worker_first" lists the paths that reach it).
import { jwks } from "./jwks";
import { token } from "./token";
import { userinfo } from "./userinfo";

interface Env {
  ASSETS: Fetcher;
}

type Handler = (request: Request) => Response | Promise<Response>;

const routes: Record<string, Record<string, Handler>> = {
  "/token": { POST: token },
  "/userinfo": { GET: userinfo },
  "/.well-known/jwks.json": { GET: jwks },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // the one index.html, which renders the authorize page at this path (src/main.tsx)
    if (url.pathname === "/authorize") {
      return env.ASSETS.fetch(new URL("/", url));
    }

    const methods = routes[url.pathname];
    if (!methods) return env.ASSETS.fetch(request);

    const handler = methods[request.method];
    if (!handler) {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: Object.keys(methods).join(", ") },
      });
    }
    return handler(request);
  },
} satisfies ExportedHandler<Env>;
