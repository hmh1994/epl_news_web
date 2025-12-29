import { NewsHubPage } from "@/processes/news-hub-page";
import { fetchNewsList } from "@/shared/api/epl/lib/news";

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
