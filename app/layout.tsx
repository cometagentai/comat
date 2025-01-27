import type { Metadata, Viewport } from "next";

import { Barlow, Arimo, Carlito } from "next/font/google";

import "./globals.css";
import Providers from "./_contexts";

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
const carlito = Carlito({
  variable: "--font-carlito",
  weight: ["400", "700"],
  subsets: ["latin"],
});
const arimo = Arimo({
  variable: "--font-arimo",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comet",
  description: "A modular network of interoperable DeFi agents",
};

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${barlow.variable} ${arimo.variable} ${carlito.variable} antialiased bg-white dark:bg-[#000]`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
