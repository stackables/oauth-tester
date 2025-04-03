import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oauth tester",
  description: "Dummy oauth tester for local app development",
};


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
