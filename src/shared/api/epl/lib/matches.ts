import { apiClient } from "@/shared/api/client";
import type {
  MatchDetailResponse,
  MatchScheduleResponse,
} from "@/shared/api/epl/model/types";
import { API_ROOT, RequestOptions, leaguePath } from "./base";

export interface MatchScheduleParams {
  season?: string;
  locale?: string;
  matchweek?: number;
  includeFinished?: boolean;
  includeAnalytics?: boolean;
}

export const fetchMatchSchedule = async (
  leagueId: string,
  params?: MatchScheduleParams,
  options?: RequestOptions
): Promise<MatchScheduleResponse> => {
  return apiClient.get<MatchScheduleResponse>(
    leaguePath(leagueId, "/schedule"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        matchweek: params?.matchweek,
        includeFinished: params?.includeFinished,
        includeAnalytics: params?.includeAnalytics,
      },
    }
  );
};

export interface MatchDetailParams {
  locale?: string;
}

export const fetchMatchDetail = async (
  matchId: string,
  params?: MatchDetailParams,
  options?: RequestOptions
): Promise<MatchDetailResponse> => {
  return apiClient.get<MatchDetailResponse>(`${API_ROOT}/matches/${matchId}`, {
    ...options,
    params: {
      locale: params?.locale,
    },
  });
};
