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
    default: "Ferihui Stream",
    template: "%s | Ferihui Stream",
  },
  description: "Official Streamer Hub for Ferihui - Gaming, VODs, and more.",
  icons: {
    icon: '/assets/logo.jpg',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "22mbpa4LDsebEAZJeIkQkBzUWG35KNjTWiuF89nj7GM",
  },

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
      </body>
    </html>
  );
}
