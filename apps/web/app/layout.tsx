import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import CRTOverlay from "@/components/effects/CRTOverlay";
import RetroBackground from "@/components/effects/RetroBackground";
import Starfield from "@/components/effects/Starfield";
import { Analytics } from '@vercel/analytics/next';

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
  verification: {
    // google: "f5JSRxDD7n7D80X-6dMgtK3i1UKjbxC9PxTDksBT5oE",
    google: "fOT9pjzIqakEoSFq0s2kBV4jyKolOqxMamPKgTWD4y0",
  },
  openGraph: {
    title: 'HackSRM 7.0 | National Level Hackathon',
    description: 'Join us at SRM University-AP for HackSRM 7.0. 24 hours of innovation, coding, and prizes.',
    url: 'https://hacksrm.in',
    siteName: 'HackSRM 7.0',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HackSRM 7.0',
    description: 'Join the ultimate hackathon experience at SRM University-AP.',
  },
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
        <Analytics />
      </body>
    </html>
  );
}
