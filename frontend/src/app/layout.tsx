import type { Metadata } from "next";
import { Kalam, Caveat } from "next/font/google";
import Script from "next/script";
import "katex/dist/katex.min.css";
import "./globals.css";
import LegalFooter from "@/components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";
import MetaPixel from "@/components/analytics/MetaPixel";

const kalam = Kalam({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-kalam",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Brainoro | Own your Prep.",
  description: "Extensible Multi-Board Pedagogical Engine decoupling cognitive algorithms from curriculum metadata.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${kalam.variable} ${caveat.variable}`} style={{ colorScheme: 'dark' }}>
      <head>
        <MetaPixel />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-slate-950 bg-background text-slate-100 text-foreground antialiased selection:bg-sky-500 selection:text-white">
        <AuthProvider>
          <main className="flex-grow bg-slate-950 bg-background text-slate-100 text-foreground">
            {children}
          </main>
          <LegalFooter />
        </AuthProvider>
      </body>
    </html>
  );
}

