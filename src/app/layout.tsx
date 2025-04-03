import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Script from "next/script";
import Footer from "@/components/Footer";
import { RainbowkitConfig } from "@/config/RainbowkitConfig";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IDLE AI - Protocol Layer Autonomous AI AGENTS",
  description: "IDLE AI - Protocol Layer Autonomous AI AGENTS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} antialiased`}>
        <RainbowkitConfig>
          <div className="flex items-center justify-center h-screen xl:hidden">
            <p className="text-muted-foreground">
              Please Open IDLE Website on Desktop/Laptop/PC
            </p>
          </div>
          <div className="hidden xl:block">
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster />
        </RainbowkitConfig>
      </body>
      <Script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></Script>
    </html>
  );
}
