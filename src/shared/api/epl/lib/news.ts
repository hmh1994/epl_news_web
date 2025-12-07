import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type {
  NewsListItem,
  NewsListParams,
  NewsListResponse,
} from "@/shared/api/epl/model/news";
import { API_ROOT, RequestOptions } from "./base";

const {
  news: { articles: NEWS_ARTICLES },
} = EPL_MOCK_DATA;

export const fetchNewsList = async (
  params?: NewsListParams,
  options?: RequestOptions
): Promise<NewsListResponse> => {
  try {
    return await apiClient.get<NewsListResponse>(`${API_ROOT}/news`, {
      ...options,
      params: {
        cursor: params?.cursor,
        limit: params?.limit,
        categoryId: params?.categoryId,
        tagIds: params?.tagIds,
        teamId: params?.teamId,
        search: params?.search,
        locale: params?.locale,
        includeFeatured: params?.includeFeatured,
      },
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchNewsList] Falling back to mock data due to request failure",
      error
    );
    return buildMockNewsList(params);
  }
};

const buildMockNewsList = (params?: NewsListParams): NewsListResponse => {
  const limit = params?.limit ?? 24;
  const sliced = NEWS_ARTICLES.slice(0, limit);

  return {
    data: sliced.map(toApiPreview),
    meta: {
      pagination: {
        total: NEWS_ARTICLES.length,
        pageSize: limit,
        hasNext: NEWS_ARTICLES.length > limit,
        hasPrevious: false,
      },
      locale: params?.locale ?? MOCK_LOCALE,
      lastUpdated: Date.now(),
      filters: {
        categoryId: params?.categoryId,
        tagIds: params?.tagIds,
        teamId: params?.teamId,
        search: params?.search,
      },
    },
  };
};

const toApiPreview = (article: (typeof NEWS_ARTICLES)[number]): NewsListItem => ({
  id: article.id,
  title: article.title,
  summary: article.summary,
  thumbnail: article.imageUrl,
  publishedAt: article.publishedAt,
  author: article.author,
  source: article.source,
  newsUrl: article.externalUrl ?? article.slug,
});
