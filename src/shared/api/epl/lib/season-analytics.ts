import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type {
  SeasonAnalyticsMetric,
  SeasonAnalyticsResponse,
} from "@/shared/api/epl/model/season-analytics";
import { leaguePath, RequestOptions } from "./base";

const {
  league: { metaMetrics: LEAGUE_META_METRICS },
} = EPL_MOCK_DATA;

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
          locale: params?.locale,
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchSeasonAnalytics] Falling back to mock data due to request failure",
      error
    );
    return buildMockSeasonAnalytics(leagueId, params);
  }
};

const buildMockSeasonAnalytics = (
  leagueId: string,
  params?: SeasonAnalyticsParams
): SeasonAnalyticsResponse => {
  const metrics: SeasonAnalyticsMetric[] = LEAGUE_META_METRICS.slice(0, 4).map(
    (metric) => ({
      id: metric.id,
      title: metric.label,
      value: metric.value,
      delta: metric.change ?? "+0%",
      description: metric.label,
    })
  );

  return {
    data: {
      metrics,
    },
    meta: {
      leagueId,
      season: params?.season ?? MOCK_SEASON,
      generatedAt: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};
