import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

// Polyfill/Patch for Node.js 25+ experimental localStorage incompatibility
if (typeof global !== 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((global as any).localStorage) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (global as any).localStorage;
    }
  } catch {
    // Ignore if deletion fails
  }
}

const inter = Inter({ subsets: ["latin"] });
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Kim Je Min - Portfolio",
  description: "Data Engineer Portfolio",
};

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} ${notoSansKr.className}`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
