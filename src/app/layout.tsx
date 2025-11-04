import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
const notoSansKr = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "KIM JE MIN - Portfolio",
  description: "데이터의 중요성을 느끼고 데이터를 다루고 싶은 데이터 엔지니어 김제민의 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body 
        className={`${inter.className} ${notoSansKr.className} bg-white text-black`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
