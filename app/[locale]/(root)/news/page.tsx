import { NewsHubPage } from "@/processes/news-hub-page";
import { mapNewsPreviewFromApi } from "@/entities/news/model/news-mappers";
import { fetchNewsList } from "@/shared/api/epl/lib/news";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsRoute({ params }: PageProps) {
  const { locale } = await params;
  const newsResponse = await fetchNewsList({
    locale,
    limit: 24,
    includeFeatured: true,
  });
  const articles = newsResponse.data.map(mapNewsPreviewFromApi);

  return <NewsHubPage locale={locale} articles={articles} />;
}
