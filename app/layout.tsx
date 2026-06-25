import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison Eternel | Luxury Wedding & Events",
  description:
    "A luxury wedding and events platform for venue discovery, concierge planning, and operational clarity.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
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
