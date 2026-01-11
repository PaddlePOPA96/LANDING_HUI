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
  metadataBase: new URL((process.env.NEXT_PUBLIC_APP_URL || "https://www.ferihui.my.id").replace(/^http:\/\//, "https://")),
  alternates: {
    canonical: '/',
  },


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
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/assets/logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
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
    google: "nLPzLBtEeto_hqNDOQUA8QdUDRBzcFGQJnR1rzQN0OM",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.ferihui.my.id/#profilepage",
      "url": "https://www.ferihui.my.id",
      "name": "Ferihui Stream - Valorant & Gaming Content",
      "mainEntity": {
        "@type": "Person",
        "@id": "https://www.ferihui.my.id/#person",
        "name": "Ferihui",
        "alternateName": "Feri Hui",
        "description": "Ferihui is a content creator and streamer with over 5 years of experience, known for his high-level Valorant gameplay and entertaining variety game streams.",
        "image": "https://www.ferihui.my.id/assets/hui.png",
        "sameAs": [
          "https://www.youtube.com/@FeriHui",
          "https://tiktok.com/@feri_hui",
          "https://instagram.com/feri8hui"
        ],
        "jobTitle": "Content Creator & Streamer",
        "knowsAbout": ["Valorant", "Gaming", "Streaming"]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ferihui.my.id/#website",
      "url": "https://www.ferihui.my.id",
      "name": "Ferihui Stream",
      "publisher": {
        "@id": "https://www.ferihui.my.id/#person"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.ferihui.my.id/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
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
      <head>
        <link rel="preconnect" href="https://firestore.googleapis.com" />
        <link rel="preconnect" href="https://encrypted-tbn0.gstatic.com" />
      </head>
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
