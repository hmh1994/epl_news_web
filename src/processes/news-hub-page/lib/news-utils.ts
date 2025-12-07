import { NewsArticlePreview } from "@/entities/news/model/news-article";

export const sortArticles = (
  articles: NewsArticlePreview[]
): NewsArticlePreview[] =>
  [...articles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

export const deriveTrendingArticles = (
  articles: NewsArticlePreview[]
): NewsArticlePreview[] => articles.slice(0, 5);

export const buildArticleHref = (locale: string, slug: string) => {
  const basePath = locale ? `/${locale}` : "";
  return `${basePath}/news/${slug}`;
};
