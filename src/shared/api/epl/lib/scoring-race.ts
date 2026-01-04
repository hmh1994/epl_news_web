import { apiClient } from "@/shared/api/client";
import type { PlayerRankingResponse } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface ScoringRaceParams {
  season?: string;
  locale?: string;
  limit?: number;
}

export const fetchScoringRace = async (
  leagueId: string,
  params?: ScoringRaceParams,
  options?: RequestOptions
): Promise<PlayerRankingResponse> => {
  try {
    return await apiClient.get<PlayerRankingResponse>(
      leaguePath(leagueId, "/players/scoring-race"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
          limit: params?.limit,
        },
      }
    );
  } catch (error) {
    console.warn(
      "[fetchScoringRace] Falling back to mock data due to request failure",
      error
    );
    throw error;
  }
};
