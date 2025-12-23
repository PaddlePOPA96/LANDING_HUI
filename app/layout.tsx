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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.ferihui.my.id"),
  title: {
    default: "Ferihui Stream - Valorant & Gaming Content",
    template: "%s | Ferihui Stream",
  },
  description: "Ferihui is a content creator and streamer with over 5 years of experience, known for his high-level Valorant gameplay and entertaining variety game streams.",
  keywords: ["Ferihui", "Valorant", "Streaming", "Gamer", "Indonesia Streamer", "Valorant Clips", "Ferihui Valorant"],
  authors: [{ name: "Ferihui" }],
  publisher: "Ferihui",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.ferihui.my.id",
    title: "Ferihui Stream - Valorant & Gaming Content",
    description: "Ferihui is a content creator and streamer with over 5 years of experience, known for his high-level Valorant gameplay and entertaining variety game streams.",
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
    shortcut: '/assets/logo.jpg',
    apple: '/assets/logo.jpg',
  },
  manifest: '/manifest.json',
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

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ferihui Stream",
    "url": "https://www.ferihui.my.id",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.ferihui.my.id/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ferihui",
    "url": "https://www.ferihui.my.id",
    "sameAs": [
      "https://www.youtube.com/@FeriHui",
      "https://tiktok.com/@feri_hui",
      "https://instagram.com/feri8huis"
    ],
    "jobTitle": "Content Creator & Streamer",
    "knowsAbout": ["Valorant", "Gaming", "Streaming"]
  }
];

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
