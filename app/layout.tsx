import type { Metadata } from "next";

import { exo2, orbitron } from "@/app/ui/fonts";
import "./globals.css";

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
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      <body className="flex flex-col min-h-screen">
        <header></header>
        <main className="grow">{children}</main>
      </body>
    </html>
    // </SessionProvider>
  );
}
