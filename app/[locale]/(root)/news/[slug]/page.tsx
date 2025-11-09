import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsDetailPage } from "@/processes/news-detail-page";
import {
  fetchLeagueNewsArticle,
  fetchLeagueNewsList,
  fetchLeagueRelatedNews,
} from "@/shared/api/epl/lib/news";
import { mapNewsArticleFromApi, mapNewsPreviewFromApi } from "@/entities/news/model/news-mappers";
import { DEFAULT_LEAGUE_ID } from "@/shared/config/league";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const response = await fetchLeagueNewsList(DEFAULT_LEAGUE_ID, {
    limit: 50,
  });

  return response.data.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const response = await fetchLeagueNewsArticle(DEFAULT_LEAGUE_ID, slug);
    const article = mapNewsArticleFromApi(response.data);

    return {
      title: `${article.title} - Infootball 뉴스`,
      description: article.summary,
      openGraph: {
        title: article.title,
        description: article.summary,
        type: "article",
        publishedTime: article.publishedAt,
        tags: article.tags,
      },
    };
  } catch {
    return {
      title: "뉴스",
    };
  }
}

export default async function NewsArticleRoute({ params }: PageProps) {
  const { locale, slug } = await params;
  try {
    const [articleResponse, relatedResponse] = await Promise.all([
      fetchLeagueNewsArticle(DEFAULT_LEAGUE_ID, slug, { locale }),
      fetchLeagueRelatedNews(DEFAULT_LEAGUE_ID, slug, {
        limit: 4,
        locale,
      }),
    ]);

    const article = mapNewsArticleFromApi(articleResponse.data);
    const relatedArticles = relatedResponse.data
      .filter((candidate) => candidate.id !== article.id)
      .map(mapNewsPreviewFromApi);

    return (
      <NewsDetailPage
        article={article}
        locale={locale}
        relatedArticles={relatedArticles}
      />
    );
  } catch {
    notFound();
  }
}
