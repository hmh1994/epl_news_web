import type { Metadata } from "next";
import "../globals.css";
import { Footer, Header } from "@/components/common";

export const metadata: Metadata = {
  title: "InFootball",
  description: "EPL 소식을 한 곳에서",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='naver-site-verification'
          content='863d7c1d2c7d639babdb233ee9873f67efa7f74c'
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
