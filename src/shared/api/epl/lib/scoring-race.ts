import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type { PlayerRankingResponse } from "@/shared/api/epl/model/types";
import { leaguePath, RequestOptions } from "./base";

const {
  players: { database: PLAYER_DATABASE },
} = EPL_MOCK_DATA;

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
          locale: params?.locale,
          limit: params?.limit,
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchScoringRace] Falling back to mock data due to request failure",
      error
    );
    return buildMockScoringRace(leagueId, params);
  }
};

const buildMockScoringRace = (
  leagueId: string,
  params?: ScoringRaceParams
): PlayerRankingResponse => {
  const sorted = [...PLAYER_DATABASE].sort((a, b) => b.goals - a.goals);
  const limit = params?.limit ?? 5;

  return {
    data: sorted.slice(0, limit).map((player) => ({
      name: player.name,
      teamId: player.teamId,
      goals: player.goals,
      assists: player.assists,
      avatar: player.photo,
      rating: Math.round(
        (player.stats.shooting + player.stats.passing) / 2
      ),
      value: "—",
    })),
    meta: {
      leagueId,
      season: params?.season ?? MOCK_SEASON,
      locale: params?.locale ?? MOCK_LOCALE,
      category: "top-scorers",
      source: "mock-data",
    },
  };
};
