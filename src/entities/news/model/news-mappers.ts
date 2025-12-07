import type {
  NewsArticle as ApiNewsArticle,
  NewsArticleBlock,
  NewsListItem,
} from "@/shared/api/epl/model/news";
import type {
  NewsArticle,
  NewsArticlePreview,
} from "./news-article";

const extractParagraphText = (block: NewsArticleBlock): string | null => {
  switch (block.type) {
    case "paragraph":
    case "heading":
    case "quote":
      return block.text;
    case "list":
      return block.items.join(" · ");
    default:
      return null;
  }
};

export const mapNewsPreviewFromApi = (
  article: NewsListItem
): NewsArticlePreview => ({
  id: article.id,
  slug: article.newsUrl ?? article.id,
  title: article.title,
  summary: article.summary,
  category: "뉴스",
  tags: [],
  imageUrl: article.thumbnail,
  publishedAt: article.publishedAt,
  source: article.source ?? "Infootball",
  author: article.author,
  readingTimeMinutes: undefined,
  externalUrl: article.newsUrl,
});

export const mapNewsArticleFromApi = (
  article: ApiNewsArticle
): NewsArticle => {
  const preview = mapNewsPreviewFromApi({
    id: article.id,
    title: article.title,
    summary: article.summary,
    thumbnail: article.heroImage?.url ?? article.thumbnail?.url,
    publishedAt: article.publishedAt,
    author: article.author?.name,
    source: article.source?.name,
    newsUrl: article.slug ?? article.externalUrl,
  });
  const content = article.body
    .map((block) => extractParagraphText(block))
    .filter((text): text is string => Boolean(text && text.trim().length > 0));

  return {
    ...preview,
    content: content.length > 0 ? content : [preview.summary],
  };
};
