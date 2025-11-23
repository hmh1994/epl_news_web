import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsDetailPage } from "@/processes/news-detail-page";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type { NewsArticle, NewsArticlePreview } from "@/entities/news/model/news-article";
import { getNewsArticleBySlug } from "@/entities/news/model/news-article";

const ARTICLES = EPL_MOCK_DATA.news.articles;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const toPreview = (article: NewsArticle): NewsArticlePreview => ({
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
});

export async function generateStaticParams() {
  return ARTICLES.slice(0, 50).map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(ARTICLES, slug);

  if (!article) {
    return {
      title: "뉴스",
    };
  }

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
}

export default async function NewsArticleRoute({ params }: PageProps) {
  const { locale, slug } = await params;
  const article = getNewsArticleBySlug(ARTICLES, slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = ARTICLES.filter(
    (candidate) =>
      candidate.slug !== slug && candidate.category === article.category
  )
    .slice(0, 4)
    .map(toPreview);

  return (
    <NewsDetailPage
      article={article}
      locale={locale}
      relatedArticles={relatedArticles}
    />
  );
}
