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
  title: "OVIJATTO — Elegance. Premium. Luxury. | Coming Soon 2026",
  description:
    "OVIJATTO is a premium Bangladeshi fashion brand crafting timeless menswear — shirts, cargo pants and essentials — built for the modern wardrobe. Established 2026. Launching soon from Nachole, Chapainawabganj, Rajshahi. 100% original quality products guaranteed.",
  keywords: [
    "OVIJATTO",
    "ovijatto.com",
    "Bangladeshi fashion brand",
    "premium menswear Bangladesh",
    "luxury shirts Bangladesh",
    "premium cotton shirts",
    "cargo pants Bangladesh",
    "Chapainawabganj fashion",
    "Rajshahi clothing brand",
    "original quality menswear",
    "best quality shirts Bangladesh",
  ],
  authors: [{ name: "OVIJATTO" }],
  openGraph: {
    title: "OVIJATTO — Elegance. Premium. Luxury.",
    description:
      "Premium Bangladeshi menswear. Quiet luxury for the modern wardrobe. 100% original quality guaranteed. Established 2026.",
    url: "https://www.ovijatto.com/",
    siteName: "OVIJATTO",
    images: [
      {
        url: "/golden-logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
