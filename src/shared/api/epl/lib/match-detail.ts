import { apiClient } from "@/shared/api/client";
import type { MatchDetailResponse } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

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
    throw new Error(`[fetchMatchDetail] Invalid response for matchId: ${matchId}`);
  }
  return response;
};
