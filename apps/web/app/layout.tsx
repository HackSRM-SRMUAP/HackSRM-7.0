import type { Metadata } from "next";
import localFont from "next/font/local";
// @ts-expect-error - Bypassing global CSS type conflict for build
import "./globals.css";
import CRTOverlay from "@/components/effects/CRTOverlay";
import RetroBackground from "@/components/effects/RetroBackground";
import Starfield from "@/components/effects/Starfield";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "HackSRM 7.0",
  description: "National Level Hackathon organized by SRM University-AP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flicker cursor-retro font-mono min-h-screen bg-black text-[#33ff00] selection:bg-[#33ff00] selection:text-black">
        <RetroBackground />
        <Starfield />
        <CRTOverlay />
        <main className="relative z-40">
          {children}
        </main>
      </body>
    </html>
  );
}
