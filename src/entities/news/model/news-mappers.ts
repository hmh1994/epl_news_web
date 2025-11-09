import type {
  NewsArticle as ApiNewsArticle,
  NewsArticlePreview as ApiNewsArticlePreview,
  NewsArticleBlock,
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
  article: ApiNewsArticlePreview
): NewsArticlePreview => ({
  id: article.id,
  slug: article.slug,
  title: article.title,
  summary: article.summary,
  category: article.category.label,
  tags: article.tags.map((tag) => tag.label),
  imageUrl: article.heroImage?.url ?? article.thumbnail?.url,
  publishedAt: article.publishedAt,
  source: article.source?.name ?? "Infootball",
  author: article.author?.name,
  readingTimeMinutes: article.readingTimeMinutes,
  externalUrl: article.externalUrl,
});

export const mapNewsArticleFromApi = (
  article: ApiNewsArticle
): NewsArticle => {
  const preview = mapNewsPreviewFromApi(article);
  const content = article.body
    .map((block) => extractParagraphText(block))
    .filter((text): text is string => Boolean(text && text.trim().length > 0));

  return {
    ...preview,
    content: content.length > 0 ? content : [preview.summary],
  };
};
