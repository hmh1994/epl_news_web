import { apiClient } from "@/shared/api/client";
import type { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import type { PlayerPosition } from "@/entities/player/model/player-profile";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface PlayerListParams {
  season?: string;
  locale?: string;
  teamId?: string;
  position?: string;
  search?: string;
}

export interface PlayerListItem {
  id: string;
  name: string;
  photo: string;
  teamId: string;
  teamName: string;
  position: string;
  age: number;
  nationality: string;
  height: number;
  weight: number;
  goals: number | null;
  assists: number | null;
  pace: number | null;
  passing: number | null;
}

export interface PlayerListResponse {
  data: PlayerListItem[];
}

export interface PlayerListMappedResponse {
  data: PlayerDatabaseEntry[];
}

export const fetchPlayerList = async (
  leagueId: string,
  params?: PlayerListParams,
  options?: RequestOptions
): Promise<PlayerListMappedResponse> => {
  try {
    const response = await apiClient.get<PlayerListResponse>(
      leaguePath(leagueId, "/player"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
          teamId: params?.teamId,
          position: params?.position,
          search: params?.search,
        },
      }
    );
    return { data: response.data.map(mapPlayerListItem) };
  } catch {
    return { data: [] };
  }
};

const mapPlayerListItem = (item: PlayerListItem): PlayerDatabaseEntry => ({
  id: item.id,
  name: item.name,
  photo: item.photo,
  teamId: item.teamId,
  teamName: item.teamName,
  position: (item.position ? item.position.toUpperCase() : "MIDFIELDER") as PlayerPosition,
  age: Number.isFinite(item.age) ? Math.round(item.age) : 0,
  nationality: item.nationality,
  height: item.height ?? 0,
  weight: item.weight ?? 0,
  goals: item.goals ?? 0,
  assists: item.assists ?? 0,
  matches: null,
  stats: {
    pace: item.pace ?? 0,
    shooting: 0,
    passing: item.passing ?? 0,
    dribbling: 0,
    defending: 0,
    physical: 0,
  },
  career: [],
});
