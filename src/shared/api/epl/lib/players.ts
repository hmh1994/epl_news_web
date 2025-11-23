import { apiClient } from "@/shared/api/client";
import { USE_MOCK_API, MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import type {
  PlayerDatabaseResponse,
  PlayerRankingResponse,
} from "@/shared/api/epl/model/types";
import { PLAYER_DATABASE, PLAYER_POSITIONS, PLAYER_TEAMS } from "@/shared/mocks/player-database";
import { EPL_PLAYER_RANKINGS } from "@/shared/mocks/epl-hub";
import { leaguePath, RequestOptions } from "./base";

export interface PlayerRankingParams {
  season?: string;
  locale?: string;
  category?: "top-scorers" | "form" | "assists";
  limit?: number;
}

export const fetchPlayerRankings = async (
  leagueId: string,
  params?: PlayerRankingParams,
  options?: RequestOptions
): Promise<PlayerRankingResponse> => {
  if (USE_MOCK_API) {
    return {
      data: EPL_PLAYER_RANKINGS.slice(
        0,
        params?.limit ?? EPL_PLAYER_RANKINGS.length
      ).map(toApiPlayerRanking),
      meta: {
        leagueId,
        season: params?.season ?? MOCK_SEASON,
        locale: params?.locale ?? MOCK_LOCALE,
        category: params?.category ?? "top-scorers",
        source: "mock-data",
      },
    };
  }

  return apiClient.get<PlayerRankingResponse>(
    leaguePath(leagueId, "/player-rankings"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        category: params?.category,
        limit: params?.limit,
      },
    }
  );
};

export interface PlayerDatabaseParams {
  season?: string;
  locale?: string;
  teamId?: string;
  position?: string;
  search?: string;
  ageMin?: number;
  ageMax?: number;
}

export const fetchPlayerDatabase = async (
  leagueId: string,
  params?: PlayerDatabaseParams,
  options?: RequestOptions
): Promise<PlayerDatabaseResponse> => {
  if (USE_MOCK_API) {
    return buildMockPlayerDatabase(leagueId, params);
  }

  return apiClient.get<PlayerDatabaseResponse>(
    leaguePath(leagueId, "/players/database"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        teamId: params?.teamId,
        position: params?.position,
        search: params?.search,
        ageMin: params?.ageMin,
        ageMax: params?.ageMax,
      },
    }
  );
};

const buildMockPlayerDatabase = (
  leagueId: string,
  params?: PlayerDatabaseParams
): PlayerDatabaseResponse => {
  const search = params?.search?.toLowerCase().trim() ?? "";
  const filtered = PLAYER_DATABASE.filter((player) => {
    if (params?.teamId && player.teamId !== params.teamId) {
      return false;
    }

    if (params?.position && !player.position.includes(params.position)) {
      return false;
    }

    if (params?.ageMin && player.age < params.ageMin) {
      return false;
    }

    if (params?.ageMax && player.age > params.ageMax) {
      return false;
    }

    if (search && !player.name.toLowerCase().includes(search)) {
      return false;
    }

    return true;
  });

  return {
    data: {
      players: filtered,
      filters: {
        positions: PLAYER_POSITIONS as unknown as PlayerDatabaseResponse["data"]["filters"]["positions"],
        teamIds: PLAYER_TEAMS as unknown as PlayerDatabaseResponse["data"]["filters"]["teamIds"],
      },
    },
    meta: {
      leagueId,
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};

const toApiPlayerRanking = (
  ranking: (typeof EPL_PLAYER_RANKINGS)[number]
) => {
  const { value: _omitValue, ...rest } = ranking;
  return rest;
};
