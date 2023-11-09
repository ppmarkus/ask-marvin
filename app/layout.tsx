import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ask Marvin",
    template: "%s | Ask Marvin",
  },
  description: "An AI chat interface to your company's data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <SessionProvider>
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header></header>
        <main className={`grow ${inter.className}`}>{children}</main>
      </body>
    </html>
    // </SessionProvider>
  );
}
