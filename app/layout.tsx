import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";

import { exo2, orbitron } from "@/app/ui/fonts";
import "./globals.css";
import SideNav from "@/components/SideNav";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: {
    default: "Ask Marvin",
    template: "%s | Ask Marvin",
  },
  description: "An AI chat interface to your company's data.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable} light`} style={{colorScheme: 'light'}}> 
        <body className="flex flex-col min-h-screen">
        <Providers>
          <header></header>
          <main className="grow">
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden pt-4">
              <div className="w-full flex-none md:w-64">
                <SideNav />
              </div>
              <div className="flex-grow p-0 px-3 overflow-y-auto">{children}</div>
            </div>
          </main>
          </Providers>
        </body>
      
    </html>
  );
}
