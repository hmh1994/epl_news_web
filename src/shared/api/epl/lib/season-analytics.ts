import { apiClient } from "@/shared/api/client";
import type { SeasonAnalyticsResponse } from "@/shared/api/epl/model/season-analytics";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface SeasonAnalyticsParams {
  season?: string;
  locale?: string;
}

export const fetchSeasonAnalytics = async (
  leagueId: string,
  params?: SeasonAnalyticsParams,
  options?: RequestOptions
): Promise<SeasonAnalyticsResponse> => {
  try {
    return await apiClient.get<SeasonAnalyticsResponse>(
      leaguePath(leagueId, "/season/stat"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
        },
      }
    );
  } catch (error) {
    console.warn(
      "[fetchSeasonAnalytics] Falling back to mock data due to request failure",
      error
    );
    throw error;
  }
};
