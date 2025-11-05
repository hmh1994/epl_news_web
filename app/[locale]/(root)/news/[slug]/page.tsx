import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { NewsDetailPage } from "@/processes/news-detail-page";
import { getNewsArticleBySlug } from "@/entities/news/model/news-article";
import { EPL_NEWS_ARTICLES } from "@/shared/mocks/news/articles";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return EPL_NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(EPL_NEWS_ARTICLES, slug);

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
  const article = getNewsArticleBySlug(EPL_NEWS_ARTICLES, slug);

  if (!article) {
    notFound();
  }

  return <NewsDetailPage article={article} locale={locale} />;
}
