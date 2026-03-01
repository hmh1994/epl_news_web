import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type { MatchDetailResponse } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

const {
  matches: { details: MATCH_DETAILS },
} = EPL_MOCK_DATA;

export interface MatchDetailParams {
  season?: string;
  locale?: string;
}

export const fetchMatchDetail = async (
  leagueId: string,
  matchId: string,
  params?: MatchDetailParams,
  options?: RequestOptions,
): Promise<MatchDetailResponse> => {
  try {
    const response = await apiClient.get<MatchDetailResponse>(
      leaguePath(leagueId, `/matches/${matchId}`),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
        },
      },
    );
    if (!response?.data?.fixture) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[fetchMatchDetail] Falling back to mock data due to unexpected response shape",
        );
      }
      return buildMockMatchDetail(leagueId, matchId, params);
    }
    return response;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[fetchMatchDetail] Falling back to mock data due to request failure",
        error,
      );
    }
    return buildMockMatchDetail(leagueId, matchId, params);
  }
};

const buildMockMatchDetail = (
  leagueId: string,
  matchId: string,
  params?: MatchDetailParams,
): MatchDetailResponse => {
  const detail = MATCH_DETAILS[matchId];
  if (!detail) {
    throw new Error(`Match detail not found for matchId: ${matchId}`);
  }

  return {
    data: detail,
    meta: {
      leagueId,
      matchId,
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
    },
  };
};
