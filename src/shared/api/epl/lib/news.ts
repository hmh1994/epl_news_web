import { apiClient } from "@/shared/api/client";
import type { NewsArticle as EntityNewsArticle } from "@/entities/news/model/news-article";
import { USE_MOCK_API, MOCK_LOCALE } from "@/shared/config/mock-api";
import { EPL_NEWS_ARTICLES } from "@/shared/mocks/news/articles";
import type {
  NewsArticle as ApiNewsArticle,
  NewsArticleBlock,
  NewsArticleParams,
  NewsArticlePreview as ApiNewsArticlePreview,
  NewsArticleResponse,
  NewsHighlightsParams,
  NewsHighlightsResponse,
  NewsListParams,
  NewsListResponse,
  NewsRelatedParams,
  NewsRelatedResponse,
} from "@/shared/api/epl/model/news";
import { leaguePath, RequestOptions } from "./base";

const newsListPath = (leagueId: string) => leaguePath(leagueId, "/news");

const newsArticlePath = (leagueId: string, slug: string, suffix = "") =>
  `${newsListPath(leagueId)}/${slug}${suffix}`;

export const fetchLeagueNewsList = async (
  leagueId: string,
  params?: NewsListParams,
  options?: RequestOptions
): Promise<NewsListResponse> => {
  if (USE_MOCK_API) {
    return buildMockNewsList(params);
  }

  return apiClient.get<NewsListResponse>(newsListPath(leagueId), {
    ...options,
    params: {
      cursor: params?.cursor,
      limit: params?.limit,
      categoryId: params?.categoryId,
      teamId: params?.teamId,
      search: params?.search,
      locale: params?.locale,
      includeFeatured: params?.includeFeatured,
      tagIds: params?.tagIds,
    },
  });
};

export const fetchLeagueNewsArticle = async (
  leagueId: string,
  slug: string,
  params?: NewsArticleParams,
  options?: RequestOptions
): Promise<NewsArticleResponse> => {
  if (USE_MOCK_API) {
    return buildMockNewsArticle(slug, params);
  }

  return apiClient.get<NewsArticleResponse>(newsArticlePath(leagueId, slug), {
    ...options,
    params: {
      locale: params?.locale,
      includeRelated: params?.includeRelated,
    },
  });
};

export const fetchLeagueNewsHighlights = async (
  leagueId: string,
  params?: NewsHighlightsParams,
  options?: RequestOptions
): Promise<NewsHighlightsResponse> => {
  if (USE_MOCK_API) {
    return buildMockNewsHighlights(params);
  }

  return apiClient.get<NewsHighlightsResponse>(
    `${newsListPath(leagueId)}/highlights`,
    {
      ...options,
      params: {
        limit: params?.limit,
        categoryId: params?.categoryId,
        locale: params?.locale,
      },
    }
  );
};

export const fetchLeagueRelatedNews = async (
  leagueId: string,
  slug: string,
  params?: NewsRelatedParams,
  options?: RequestOptions
): Promise<NewsRelatedResponse> => {
  if (USE_MOCK_API) {
    return buildMockNewsRelated(slug, params);
  }

  return apiClient.get<NewsRelatedResponse>(
    newsArticlePath(leagueId, slug, "/related"),
    {
      ...options,
      params: {
        limit: params?.limit,
        categoryId: params?.categoryId,
        excludeIds: params?.excludeIds,
        locale: params?.locale,
      },
    }
  );
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const toArticleBlocks = (article: EntityNewsArticle): NewsArticleBlock[] =>
  article.content.map((paragraph, index) => ({
    id: `${article.id}-p-${index}`,
    type: "paragraph",
    text: paragraph,
  }));

const toApiNewsArticle = (
  article: EntityNewsArticle,
  index: number
): ApiNewsArticle => {
  const heroImage = article.imageUrl
    ? {
        url: article.imageUrl,
        alt: article.title,
      }
    : undefined;

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    summary: article.summary,
    category: {
      id: slugify(article.category),
      slug: slugify(article.category),
      label: article.category,
    },
    tags: article.tags.map((tag) => ({
      id: slugify(tag),
      slug: slugify(tag),
      label: tag,
    })),
    heroImage,
    thumbnail: heroImage,
    publishedAt: article.publishedAt,
    updatedAt: article.publishedAt,
    readingTimeMinutes: article.readingTimeMinutes,
    author: article.author
      ? {
          id: slugify(article.author),
          name: article.author,
        }
      : undefined,
    source: {
      id: slugify(article.source),
      name: article.source,
      type: article.source.toLowerCase().includes("infootball")
        ? "internal"
        : "external",
      url: article.externalUrl,
    },
    externalUrl: article.externalUrl,
    isFeatured: index < 3,
    body: toArticleBlocks(article),
    spotlight: heroImage
      ? {
          heroImage,
          kicker: article.category,
          tagline: article.summary,
        }
      : undefined,
    keyTakeaways: article.content.slice(0, 3),
    seo: {
      title: `${article.title} - Infootball`,
      description: article.summary,
      keywords: article.tags,
    },
  };
};

const toNewsPreview = (article: ApiNewsArticle): ApiNewsArticlePreview => {
  const preview = { ...article } as Record<string, unknown>;
  delete preview.body;
  delete preview.spotlight;
  delete preview.keyTakeaways;
  delete preview.seo;
  return preview as ApiNewsArticlePreview;
};

const apiNewsArticles: ApiNewsArticle[] = EPL_NEWS_ARTICLES.map(
  (article, index) => toApiNewsArticle(article, index)
);

const articlesBySlug = new Map<string, ApiNewsArticle>(
  apiNewsArticles.map((article) => [article.slug, article])
);

const sortedNews = [...apiNewsArticles].sort(
  (a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
);

const filterArticles = (params?: NewsListParams): ApiNewsArticle[] => {
  const { categoryId, tagIds, search } = params ?? {};
  const searchTerm = search?.trim().toLowerCase() ?? "";

  return sortedNews.filter((article) => {
    if (categoryId && article.category.id !== categoryId) {
      return false;
    }

    if (
      tagIds &&
      tagIds.length > 0 &&
      !article.tags.some((tag) => tagIds.includes(tag.id))
    ) {
      return false;
    }

    if (!searchTerm) {
      return true;
    }

    const haystack = [
      article.title,
      article.summary,
      article.tags.map((tag) => tag.label).join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(searchTerm);
  });
};

const buildMockNewsList = (params?: NewsListParams): NewsListResponse => {
  const filtered = filterArticles(params);
  const limit = params?.limit ?? 8;
  const cursor = params?.cursor;
  const startIndex = cursor
    ? Math.max(
        filtered.findIndex((article) => article.id === cursor) + 1,
        0
      )
    : 0;
  const slice = filtered.slice(startIndex, startIndex + limit);
  const nextIndex = startIndex + limit;
  const nextCursor =
    nextIndex < filtered.length ? filtered[nextIndex - 1].id : undefined;
  const previousCursor =
    startIndex > 0 ? filtered[Math.max(0, startIndex - limit)].id : undefined;

  return {
    data: slice.map((article) => toNewsPreview(article)),
    meta: {
      locale: params?.locale ?? MOCK_LOCALE,
      pagination: {
        total: filtered.length,
        pageSize: limit,
        nextCursor,
        previousCursor,
        hasNext: Boolean(nextCursor),
        hasPrevious: startIndex > 0,
      },
      filters: {
        categoryId: params?.categoryId,
        tagIds: params?.tagIds,
        teamId: params?.teamId,
        search: params?.search,
      },
    },
  };
};

const buildMockNewsArticle = (
  slug: string,
  params?: NewsArticleParams
): NewsArticleResponse => {
  const article = articlesBySlug.get(slug);

  if (!article) {
    throw new Error(`News article not found for slug: ${slug}`);
  }

  return {
    data: article,
    meta: {
      locale: params?.locale ?? MOCK_LOCALE,
      articleId: article.id,
      slug: article.slug,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
    },
  };
};

const buildMockNewsHighlights = (
  params?: NewsHighlightsParams
): NewsHighlightsResponse => {
  const limit = params?.limit ?? 3;
  const filtered = filterArticles({
    ...params,
    includeFeatured: true,
  })
    .filter((article) => article.isFeatured)
    .slice(0, limit);

  return {
    data: filtered.map((article) => toNewsPreview(article)),
    meta: {
      locale: params?.locale ?? MOCK_LOCALE,
      generatedAt: Date.now(),
      categoryId: params?.categoryId,
    },
  };
};

const buildMockNewsRelated = (
  slug: string,
  params?: NewsRelatedParams
): NewsRelatedResponse => {
  const sourceArticle = articlesBySlug.get(slug);
  const limit = params?.limit ?? 3;
  const excludeIds = new Set([slug, ...(params?.excludeIds ?? [])]);

  const candidates = sortedNews.filter(
    (article) =>
      !excludeIds.has(article.id) &&
      (!params?.categoryId ||
        article.category.id === params.categoryId ||
        (sourceArticle &&
          article.category.id === sourceArticle.category.id))
  );

  return {
    data: candidates.slice(0, limit).map((article) => toNewsPreview(article)),
    meta: {
      locale: params?.locale ?? MOCK_LOCALE,
      articleId: sourceArticle?.id ?? slug,
      generatedAt: Date.now(),
    },
  };
};
