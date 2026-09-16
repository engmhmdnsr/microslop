import type { Metadata, Viewport } from "next";
import { Oswald, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#050505",
  colorScheme: "dark",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "MICROSLOP, AI Slop Revealed",
  description:
    "We build the tools that show what AI really costs: energy, water, carbon, and synthetic digital slop. Charges, live audit, incident log, and public board.",
  keywords: ["MICROSLOP", "AI slop", "Microsoft", "Copilot", "energy", "EcoLogits"],
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "MICROSLOP" },
  openGraph: {
    title: "MICROSLOP, AI Slop Revealed",
    description: "Charges, live energy audit, and incident reports on AI slop.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
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
      className={`${oswald.variable} ${jetbrains.variable} ${grotesk.variable}`}
    >
      <body className="bg-abyss font-sans text-white">{children}</body>
    </html>
  );
}
