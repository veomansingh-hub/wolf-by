import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@/app/globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SoundProvider } from "@/components/providers/SoundProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TheomediaBadge } from "@/components/ui/TheomediaBadge";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lupa Noir | Private Wildlife Safaris & Expeditions",
  description:
    "Private wildlife safaris and tailored expeditions with expert local guides, exceptional landscapes and responsible wildlife experiences.",
  keywords: ["wildlife", "safari", "private expeditions", "luxury travel", "Lupa Noir"],
  openGraph: {
    title: "Lupa Noir | Private Wildlife Safaris",
    description: "Private wildlife safaris and tailored expeditions with expert local guides.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lupa Noir | Private Wildlife Safaris",
    description: "Private wildlife safaris and tailored expeditions with expert local guides.",
  },
  alternates: {
    canonical: "https://lupanoir.com",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased min-h-screen bg-ivory text-charcoal flex flex-col">
        <SmoothScrollProvider>
          <SoundProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <TheomediaBadge />
          </SoundProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
