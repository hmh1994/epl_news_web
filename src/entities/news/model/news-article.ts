export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string[];
  category: string;
  tags: string[];
  imageUrl?: string;
  publishedAt: string;
  source: string;
  author?: string;
  readingTimeMinutes?: number;
  externalUrl?: string;
}

export type NewsArticlePreview = Pick<
  NewsArticle,
  | "id"
  | "slug"
  | "title"
  | "summary"
  | "category"
  | "tags"
  | "imageUrl"
  | "publishedAt"
  | "source"
  | "author"
  | "readingTimeMinutes"
  | "externalUrl"
>;

export const getNewsArticleBySlug = (
  articles: NewsArticle[],
  slug: string
): NewsArticle | undefined => {
  return articles.find((article) => article.slug === slug);
};
