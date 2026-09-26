import type { Metadata } from "next";
import { Kalam, Caveat } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import LegalFooter from "@/components/common/Footer";
import { AuthProvider } from "@/context/AuthContext";

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
  title: "Brainoro | Next-Gen K-12 Learning OS",
  description: "Extensible Multi-Board Pedagogical Engine decoupling cognitive algorithms from curriculum metadata.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${kalam.variable} ${caveat.variable}`} style={{ colorScheme: 'dark' }}>
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
