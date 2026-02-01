import { apiClient } from "@/shared/api/client";
import type { SeasonAnalyticsResponse } from "@/shared/api/epl/model/season-analytics";
import { MOCK_SEASON } from "@/shared/config/mock-api";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface SeasonAnalyticsParams {
  season?: string;
  locale?: string;
}

const MOCK_SEASON_ANALYTICS: SeasonAnalyticsResponse = {
  data: [
    {
      id: "total-goals",
      key: "TOTAL_GOALS",
      title: "시즌 총 골",
      value: "1,213",
      delta: "+8.2%",
      description: "지난 시즌 대비",
    },
    {
      id: "goals-per-match",
      key: "PER_MATCH_GOALS",
      title: "경기당 평균 골",
      value: "3.19",
      delta: "+5.1%",
      description: "공격적인 흐름",
    },
    {
      id: "pass-accuracy",
      key: "PER_MATCH_PASS_ACCURACY",
      title: "평균 패스 성공률",
      value: "82.4%",
      delta: "+1.2%",
      description: "리그 전체 평균",
    },
    {
      id: "clean-sheets",
      key: "TOTAL_CLEAN_SHEETS",
      title: "클린시트",
      value: "216",
      delta: "+15%",
      description: "수비 안정성 향상",
    },
  ],
  meta: {
    leagueId: "EPL",
    season: MOCK_SEASON,
    generatedAt: Date.now(),
  },
};

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
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchSeasonAnalytics] Falling back to mock data due to request failure"
    );
    return MOCK_SEASON_ANALYTICS;
  }
};
