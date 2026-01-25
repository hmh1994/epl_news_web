import { apiClient } from "@/shared/api/client";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import type { PlayerPosition } from "@/entities/player/model/player-profile";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

const {
  players: { database: PLAYER_DATABASE },
} = EPL_MOCK_DATA;

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
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchPlayerList] Falling back to mock data due to request failure",
      error
    );
    return buildMockPlayerList(params);
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

const buildMockPlayerList = (
  params?: PlayerListParams
): PlayerListMappedResponse => {
  const searchTerm = params?.search?.trim().toLowerCase();
  const positionFilter = params?.position?.trim().toUpperCase();
  const teamFilter = params?.teamId?.trim();

  const filtered = PLAYER_DATABASE.filter((player) => {
    const matchesSearch = searchTerm
      ? player.name.toLowerCase().includes(searchTerm)
      : true;
    const matchesPosition = positionFilter
      ? doesPositionMatch(player.position, positionFilter)
      : true;
    const matchesTeam = teamFilter ? player.teamId === teamFilter : true;
    return matchesSearch && matchesPosition && matchesTeam;
  });

  return {
    data: filtered.map((player) => ({
      ...player,
      teamName: player.teamName,
    })),
  };
};

const POSITION_FILTER_MAP: Record<string, string[]> = {
  GOALKEEPER: ["GK", "GOALKEEPER"],
  GK: ["GK", "GOALKEEPER"],
  DEFENDER: ["CB", "LB", "RB", "LWB", "RWB", "DF", "DEFENDER"],
  DF: ["CB", "LB", "RB", "LWB", "RWB", "DF", "DEFENDER"],
  MIDFIELDER: ["CDM", "CM", "CAM", "LM", "RM", "MF", "MIDFIELDER"],
  MF: ["CDM", "CM", "CAM", "LM", "RM", "MF", "MIDFIELDER"],
  FORWARD: ["ST", "CF", "LW", "RW", "FW", "FORWARD"],
  FW: ["ST", "CF", "LW", "RW", "FW", "FORWARD"],
};

const doesPositionMatch = (playerPosition: string, filter: string) => {
  const normalized = playerPosition.toUpperCase();
  const normalizedFilter = filter.toUpperCase();
  const allowedPositions = POSITION_FILTER_MAP[normalizedFilter];

  if (allowedPositions) {
    return allowedPositions.includes(normalized);
  }

  return normalized === normalizedFilter;
};
