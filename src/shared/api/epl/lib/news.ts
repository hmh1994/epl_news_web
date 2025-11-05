import { apiClient } from "@/shared/api/client";
import type {
  NewsArticleParams,
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
