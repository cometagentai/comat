import type { Metadata, Viewport } from "next";

import { Roboto, Open_Sans } from "next/font/google";

import "./globals.css";
import Providers from "./_contexts";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comat",
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
        className={`${roboto.variable} ${openSans.variable} antialiased bg-white dark:bg-[#020845]`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
