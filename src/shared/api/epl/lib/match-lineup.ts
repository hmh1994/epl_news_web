import { apiClient } from "@/shared/api/client";
import type { MatchLineupResponse } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface MatchLineupParams {
  season?: string;
  locale?: string;
}

export const fetchMatchLineup = async (
  leagueId: string,
  matchId: string,
  params?: MatchLineupParams,
  options?: RequestOptions,
): Promise<MatchLineupResponse> => {
  const response = await apiClient.get<MatchLineupResponse>(
    leaguePath(leagueId, `/matches/${matchId}/lineup`),
    {
      ...options,
      params: {
        season: params?.season,
        locale: mapLocaleToApi(params?.locale),
      },
    },
  );
  return response;
};
