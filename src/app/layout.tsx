import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { WellbeingProvider } from "@/lib/wellbeing-context";
import { WellbeingVignette } from "@/components/wellbeing-vignette";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://movie-dhurandhar-timevalue.vercel.app"),
  title: {
    default: "Dhurandhar Time Value Ledger",
    template: "%s | Dhurandhar Time Value Ledger",
  },
  description:
    "A cinematic movie economics ledger for Dhurandhar across macro, micro, community, and individual perspectives.",
  applicationName: "Dhurandhar Time Value Ledger",
  keywords: [
    "Dhurandhar",
    "movie economics",
    "macro",
    "micro",
    "community",
    "individual",
    "wellbeing",
    "box office",
  ],
  authors: [{ name: "Moses Sam Paul" }],
  creator: "Moses Sam Paul",
  publisher: "The Internet of Value",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Dhurandhar Time Value Ledger",
    description:
      "A cinematic movie economics ledger for Dhurandhar across macro, micro, community, and individual perspectives.",
    url: "/",
    siteName: "Dhurandhar Time Value Ledger",
    images: [
      {
        url: "/dhurandhar/part-1-poster.jpg",
        width: 1200,
        height: 1600,
        alt: "Dhurandhar Part 1 poster",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhurandhar Time Value Ledger",
    description:
      "A cinematic movie economics ledger for Dhurandhar across macro, micro, community, and individual perspectives.",
    images: ["/dhurandhar/part-1-poster.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/icons/icon-192.png" }],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans dark", geist.variable)}>
      <body className="antialiased dossier-bg min-h-screen text-slate-200 selection:bg-amber-500/30 overflow-x-hidden">
        <WellbeingProvider>
          {children}
          <WellbeingVignette />
        </WellbeingProvider>
      </body>
    </html>
  );
}
