# Mock OAuth / OIDC Provider

A free, hosted mock **OAuth 2.0 & OpenID Connect** identity provider for local development, E2E testing, and CI/CD pipelines.

**Live at [oauth.sdk42.com](https://oauth.sdk42.com)**

---

Hi, 

I'm Aarne, founder of [YourOpinion.is](https://youropinion.is) — the best free AI-native survey platform :)

I built this mock OAuth provider because my team and I were tired of dealing with real identity providers during development. Google, Facebook, GitHub — they're all great for production, but terrible for local testing. Rate limits, anti-bot protections, managing test accounts, keeping secrets out of git... it was slowing us down.

So I created this. It's intentionally permissive — accepts any `client_id`, any `client_secret`, any `redirect_uri`. Perfect for development and automated testing.

We use it daily at YourOpinion.is, and I figured other developers face the same pain. So here it is, open source and free to use. No signup, no rate limits, no hassle.

— Aarne

---

## Why?

Real identity providers (Google, Facebook, GitHub) are great for production but painful for development:

- Rate limits and anti-automation measures break E2E tests
- Every developer needs their own OAuth app or test account
- Secrets can't be committed to source control
- CI/CD pipelines need extra credential management

This mock provider solves all of that. It's intentionally permissive — any `client_id`, `client_secret`, and `redirect_uri` works.

## Features

- **Stable test users** — Same PIN always generates the same set of users
- **No API quotas** — Unlimited requests, no rate limits
- **Instant setup** — No registration, no API keys, no OAuth app config
- **OIDC-compliant** — Standard discovery, token, and userinfo endpoints
- **CI/CD friendly** — Configurations are safe to commit to source control
- **E2E-ready** — Users have `data-testid` attributes for Playwright/Cypress

## Quick Start

Point your app at the discovery document:

```
https://oauth.sdk42.com/.well-known/openid-configuration
```

Or configure manually:

| Endpoint | URL |
|---|---|
| Authorization | `https://oauth.sdk42.com/authorize` |
| Token | `https://oauth.sdk42.com/token` |
| UserInfo | `https://oauth.sdk42.com/userinfo` |
| JWKS | `https://oauth.sdk42.com/.well-known/jwks.json` |

Use any `client_id` and `client_secret` — they're all accepted.

## How Users Work

On the authorization screen, you're presented with 9 generated users. Enter a numeric **PIN** to seed the user generation:

- **With a PIN:** First 7 users are deterministic (same PIN = same users every time), last 2 are random
- **Without a PIN:** All 9 users are randomly generated

This lets your team agree on shared test identities:
- PIN `345` → `Frederik Abshire` is always the admin
- PIN `345` → `Dejon King-Pagac` is always the blocked user

## E2E Testing

Users have `data-testid="test-user-{1-9}"` attributes. For automated tests:

- Use a **test-case-specific PIN** for stable, deterministic users
- Pick `data-testid="test-user-9"` for a random user (works even if a PIN is set)

## Self-Hosting

```bash
pnpm install
pnpm dev
```

The app is a standard Next.js project. Deploy anywhere that supports Next.js (Vercel, Cloudflare, Docker, etc.).

> **Note:** The RSA keys in `src/lib/jwk.ts` are committed intentionally — this is a mock provider with only fake data. Do not reuse these keys for anything else.

## License

[MIT](LICENSE)
