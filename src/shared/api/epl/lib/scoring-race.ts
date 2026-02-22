import { apiClient } from "@/shared/api/client";
import type { PlayerRankingResponse } from "@/shared/api/epl/model/types";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

const { players: { database: PLAYER_DATABASE } } = EPL_MOCK_DATA;

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
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[fetchScoringRace] Falling back to mock data due to request failure",
        error
      );
    }
    return buildMockPlayerRace(leagueId, params);
  }
};

const buildMockPlayerRace = (
  leagueId: string,
  params?: ScoringRaceParams,
): PlayerRankingResponse => {
  const category = params?.category ?? "goal";
  const limit = params?.limit ?? 5;

  const sortKey = category === "assist" ? "assists" : "goals";
  const sorted = [...PLAYER_DATABASE]
    .sort((a, b) => (b[sortKey] ?? 0) - (a[sortKey] ?? 0))
    .slice(0, limit);

  return {
    data: sorted.map((p) => ({
      playerId: String(p.id),
      name: p.name,
      teamId: p.teamId,
      teamName: p.teamName ?? p.teamId,
      photo: p.photo,
      goals: p.goals,
      assists: p.assists,
      points: p.goals + p.assists,
      xg: p.goals * 0.85,
      rating: 7.0 + (p.goals / 20),
    })),
    meta: {
      leagueId,
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
      category: "top-scorers",
      source: "mock",
    },
  };
};
