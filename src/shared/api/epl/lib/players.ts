import { apiClient } from "@/shared/api/client";
import type {
  PlayerDatabaseResponse,
  PlayerRankingResponse,
} from "@/shared/api/epl/model/types";
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
