import type { Metadata } from "next";
import { Kalam, Caveat } from "next/font/google";
import Script from "next/script";
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
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4004047269752917');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=4004047269752917&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
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

