import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Great_Vibes,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const accent = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  weight: ["400", "500"],
});

const script = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-great-vibes",
  weight: "400",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

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
    <html lang="en" className={`${sans.variable} ${display.variable} ${accent.variable} ${script.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
