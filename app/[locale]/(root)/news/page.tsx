import { NewsHubPage } from "@/processes/news-hub-page";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewsRoute({ params }: PageProps) {
  const { locale } = await params;
  const articles = EPL_MOCK_DATA.news.articles.slice(0, 24).map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    category: article.category,
    tags: article.tags,
    imageUrl: article.imageUrl,
    publishedAt: article.publishedAt,
    source: article.source,
    author: article.author,
    readingTimeMinutes: article.readingTimeMinutes,
    externalUrl: article.externalUrl,
  }));

  return <NewsHubPage locale={locale} articles={articles} />;
}
