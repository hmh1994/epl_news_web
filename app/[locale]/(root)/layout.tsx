import "../../globals.css";
import type { Metadata } from "next";
import { routing } from "@/shared/config/i18n/routing";
import { notFound } from "next/navigation";
import { AppHeader } from "@/widgets/app-header/ui/app-header";
import { nanumSquare } from "../../fonts";

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  // const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${nanumSquare.variable} ${nanumSquare.className} antialiased`}
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
      <body className='bg-slate-950 font-nanum-square text-white'>
        <AppHeader />
        <main>{children}</main>
        {/* <NextIntlClientProvider messages={messages}>
          <Header />
          <Footer />
        </NextIntlClientProvider> */}
      </body>
    </html>
  );
}
