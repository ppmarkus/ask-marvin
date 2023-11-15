import type { Metadata } from "next";

import Providers from "@/app/providers";
import { exo2, orbitron } from "@/app/ui/fonts";
import SideNav from "@/components/SideNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ask Marvin",
    template: "%s | Ask Marvin",
  },
  description: "An AI chat interface to your company's data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${exo2.variable} ${orbitron.variable} light`}
      style={{ colorScheme: "light" }}
    >
      <body className="flex min-h-screen flex-col">
        <Providers>
          <header></header>
          <main className="grow">
            <div className="flex h-screen flex-col pt-4 md:flex-row md:overflow-hidden">
              <div className="w-full flex-none md:w-64">
                <SideNav />
              </div>
              <div className="flex-grow overflow-y-auto p-0 px-3">
                {children}
              </div>
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
