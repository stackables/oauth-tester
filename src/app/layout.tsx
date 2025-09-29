import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Fake Identity Provider",
  description: "A simple OAuth2 identity provider for testing purposes.",
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
      </head>
      <body>
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
