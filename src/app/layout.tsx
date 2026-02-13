import { type Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";

const siteUrl = "https://oauth.sdk42.com";
const title = "Mock OAuth / OIDC Provider for Testing — Fake Identity Provider";
const description =
  "Free mock OAuth 2.0 & OpenID Connect identity provider for local development, E2E testing, and CI/CD. No signup, no rate limits — generate stable fake users instantly.";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Mock OAuth / OIDC Provider",
  url: siteUrl,
  description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Mock OAuth 2.0 authorization server",
    "OpenID Connect compatible",
    "Stable test user generation via PIN seeds",
    "No API keys or secrets required",
    "CI/CD pipeline friendly",
    "E2E testing support",
    "Accepts any client_id and client_secret",
  ],
  license: "https://opensource.org/licenses/MIT",
};

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "mock oauth provider",
    "fake identity provider",
    "test oauth locally",
    "fake openid connect",
    "oauth e2e testing",
    "mock google login",
    "oauth ci/cd testing",
    "OIDC testing",
    "OAuth2 testing",
    "fake OAuth server",
    "mock OIDC provider",
    "development identity provider",
    "test users generator",
    "mock social login",
    "oauth for automated testing",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Mock OAuth Provider — oauth.sdk42.com",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"></link>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
