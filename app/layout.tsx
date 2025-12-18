import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://ferihui.vercel.app"),
  title: {
    default: "Ferihui Stream - Valorant & Gaming Content",
    template: "%s | Ferihui Stream",
  },
  description: "Official Hub for Ferihui. Watch high-level Valorant gameplay, funny moments, and live streams. Join the community of gaming enthusiasts.",
  keywords: ["Ferihui", "Valorant", "Streaming", "Gamer", "Indonesia Streamer", "Valorant Clips", "Ferihui Valorant"],
  authors: [{ name: "Ferihui" }],
  creator: "Ferihui",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ferihui.vercel.app",
    title: "Ferihui Stream - Valorant & Gaming Content",
    description: "Official Hub for Ferihui. Watch high-level Valorant gameplay, funny moments, and live streams.",
    siteName: "Ferihui Stream",
    images: [
      {
        url: "/assets/hui.png", // Using the character image as OG image since it seems central
        width: 800,
        height: 900,
        alt: "Ferihui Character",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ferihui Stream",
    description: "Official Hub for Ferihui - Valorant & Gaming Content.",
    images: ["/assets/hui.png"],
  },
  icons: {
    icon: '/assets/logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "22mbpa4LDsebEAZJeIkQkBzUWG35KNjTWiuF89nj7GM",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ferihui",
  "url": "https://ferihui.vercel.app",
  "sameAs": [
    "https://www.youtube.com/@FeriHui",
    "https://tiktok.com/@feri_hui",
    "https://instagram.com/feri8huis"
  ],
  "jobTitle": "Content Creator & Streamer",
  "knowsAbout": ["Valorant", "Gaming", "Streaming"]
};

import { AuthProvider } from "@/components/auth/AuthProvider";

// ... (existing imports)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
