import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";

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
      <body className={inter.className}>{children}</body>
    </html>
    // </SessionProvider>
  );
}
