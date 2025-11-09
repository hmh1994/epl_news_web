import { NewsHubPage } from "@/processes/news-hub-page";
import { fetchLeagueNewsList } from "@/shared/api/epl/lib/news";
import { mapNewsPreviewFromApi } from "@/entities/news/model/news-mappers";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsRoute({ params }: PageProps) {
  const { locale } = await params;
  const response = await fetchLeagueNewsList(DEFAULT_LEAGUE_ID, {
    locale,
    includeFeatured: true,
    limit: 24,
  });
  const articles = response.data.map(mapNewsPreviewFromApi);

  return <NewsHubPage locale={locale} articles={articles} />;
}
