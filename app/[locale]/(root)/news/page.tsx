import type { Metadata } from "next";
import { NewsHubPage } from "@/processes/news-hub-page";
import { fetchNewsList } from "@/shared/api/epl/lib/news";

export const metadata: Metadata = {
  title: "뉴스",
  description:
    "프리미어리그 최신 뉴스, 이적 소식, 경기 분석을 인풋볼에서 빠르게 확인하세요.",
  openGraph: {
    title: "EPL 뉴스 | 인풋볼",
    description: "프리미어리그 최신 뉴스·이적 소식·경기 분석",
    type: "website",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsRoute({ params }: PageProps) {
  const { locale } = await params;
  const newsResponse = await fetchNewsList({
    locale,
    pageSize: 24,
  });
  const articles = newsResponse.data;

  return <NewsHubPage articles={articles} />;
}
