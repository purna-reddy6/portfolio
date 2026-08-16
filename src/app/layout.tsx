import type { Metadata } from "next";
import { Silkscreen, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PixelBackground } from "@/components/pixel-background";
import { PixelNav } from "@/components/pixel-nav";
import { profile } from "@/data/profile";

const silkscreen = Silkscreen({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.intro,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${silkscreen.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-[var(--pixel-red)] text-[var(--pixel-cream)]">
        <a
          href="#main-content"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-[var(--pixel-dark)] focus-visible:px-4 focus-visible:py-2 focus-visible:font-mono focus-visible:text-sm focus-visible:text-[var(--pixel-cream)]"
        >
          Skip to content
        </a>
        <PixelBackground />
        <PixelNav />
        <main
          id="main-content"
          className="relative z-10 h-dvh w-screen overflow-hidden"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
