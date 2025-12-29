import { NewsListItem } from "@/shared/api/epl/model/news";

export const sortArticles = (
  articles: NewsListItem[]
): NewsListItem[] =>
  [...articles].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

export const deriveTrendingArticles = (
  articles: NewsListItem[]
): NewsListItem[] => articles.slice(0, 5);

export const buildArticleHref = (article: NewsListItem) => {
  return article.url;
};
