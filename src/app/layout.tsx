import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
