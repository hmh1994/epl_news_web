import "../../globals.css";
import type { Metadata } from "next";
import { routing } from "@/shared/config/i18n/routing";
import { notFound } from "next/navigation";
import { AppHeader } from "@/widgets/app-header/ui/app-header";
import { nanumSquare } from "../../fonts";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://infootball.kr"),
    title: {
      default: "인풋볼 - 최신 EPL 매치·뉴스·선수 정보",
      template: "%s | 인풋볼",
    },
    description:
      "인풋볼에서 프리미어리그 매치 일정, 선수 통계, 팀 정보 등을 빠르게 확인하세요.",
    openGraph: {
      title: "인풋볼 - 최신 EPL 매치·뉴스·선수 정보",
      description: "프리미어리그 매치·뉴스·선수 정보 플랫폼",
      url: "https://infootball.kr",
      siteName: "인풋볼",
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "인풋볼 - 최신 EPL 매치·뉴스·선수 정보",
      description: "프리미어리그 매치·뉴스·선수 정보 플랫폼",
    },
    alternates: {
      canonical: "https://infootball.kr",
      languages: {
        "ko-KR": "https://infootball.kr/ko",
        "en-US": "https://infootball.kr/en",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
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
  const messages = await getMessages();
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
        <meta
          name='google-site-verification'
          content='ZISy9E63ilEs1xWM85gj6favTtORG_JXSCL0-kuXrK4'
        />
      </head>
      <body className='bg-slate-950 font-nanum-square text-white'>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AppHeader />
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
