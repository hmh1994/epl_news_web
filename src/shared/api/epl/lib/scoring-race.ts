import { apiClient } from "@/shared/api/client";
import type { PlayerRankingResponse } from "@/shared/api/epl/model/types";
import { MOCK_SEASON } from "@/shared/config/mock-api";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface ScoringRaceParams {
  season?: string;
  locale?: string;
  limit?: number;
  category?: string;
}

export const fetchPlayerRace = async (
  leagueId: string,
  params?: ScoringRaceParams,
  options?: RequestOptions
): Promise<PlayerRankingResponse> => {
  try {
    return await apiClient.get<PlayerRankingResponse>(
      leaguePath(leagueId, "/players/race"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
          limit: params?.limit,
          category: params?.category ?? "goal",
        },
      }
    );
  } catch {
    return {
      data: [],
      meta: {
        leagueId,
        season: params?.season ?? MOCK_SEASON,
        lastUpdated: Date.now(),
        category: "top-scorers",
        source: "empty",
      },
    };
  }
};
