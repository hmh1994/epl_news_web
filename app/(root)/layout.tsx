import type { Metadata } from "next";
import "../globals.css";
import { Footer, Header } from "@/components/common";
import { nanumSquare } from "../fonts";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "인풋볼 - 최신 축구 매치·뉴스·선수 정보",
    description:
      "인풋볼에서 국내외 축구 매치 일정, 선수 정보, 팀 소식 등을 빠르게 확인하세요.",
    openGraph: {
      title: "인풋볼",
      description: "축구 매치·뉴스·선수 정보 플랫폼",
      url: "https://infootball.kr",
      siteName: "인풋풋볼",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${nanumSquare.variable} font-(family-name:--font-nanum-square) `}
    >
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='naver-site-verification'
          content='863d7c1d2c7d639babdb233ee9873f6최7efa7f74c'
        />
        <meta
          name='google-site-verification'
          content='nC4JTzhNvKulZbpjuDwJRX84rdXmcBRqFTZUa7Y6c4g'
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
