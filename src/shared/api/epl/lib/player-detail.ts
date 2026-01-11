import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type {
  PlayerDetailResponse,
  PlayerCareerEntry,
  PlayerDetailSummary,
  PlayerDetailAttributes,
  PlayerDetailPerformance,
} from "@/shared/api/epl/model/types";
import type { PlayerPosition } from "@/entities/player/model/player-profile";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

const {
  players: { database: PLAYER_DATABASE },
} = EPL_MOCK_DATA;

export interface PlayerDetailParams {
  season?: string;
  locale?: string;
}

interface PlayerDetailApiResponse {
  data: {
    summary: PlayerDetailSummary;
    attributes: Partial<PlayerDetailAttributes>;
    performance: Partial<PlayerDetailPerformance> & { matches?: number | null };
  };
  meta?: {
    leagueName?: string;
    leagueId?: string;
    season?: string;
    locale?: string;
    lastUpdated?: string;
  };
}

export const fetchPlayerDetail = async (
  leagueId: string,
  playerId: string,
  params?: PlayerDetailParams,
  options?: RequestOptions
): Promise<PlayerDetailResponse> => {
  try {
    const response = await apiClient.get<PlayerDetailApiResponse>(
      leaguePath(leagueId, `/player/${playerId}`),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
        },
      }
    );
    return mapPlayerDetailResponse(response, leagueId, params);
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchPlayerDetail] Falling back to mock data due to request failure",
      error
    );
    return buildMockPlayerDetail(playerId, params);
  }
};

const buildMockPlayerDetail = (
  playerId: string,
  params?: PlayerDetailParams
): PlayerDetailResponse => {
  const normalized = playerId.trim().toLowerCase();
  const player =
    PLAYER_DATABASE.find(
      (candidate) =>
        String(candidate.id) === normalized ||
        candidate.name.toLowerCase() === normalized
    ) ?? PLAYER_DATABASE[0];

  if (!player) {
    throw new Error(`Unknown player id: ${playerId}`);
  }

  const summary: PlayerDetailSummary = {
    id: Number(player.id),
    name: player.name,
    teamId: player.teamId,
    position: player.position,
    photo: player.photo,
    nationality: player.nationality,
    age: player.age,
    height: player.height,
    weight: player.weight,
  };

  const attributes: PlayerDetailAttributes = {
    pace: player.stats.pace,
    shooting: player.stats.shooting,
    passing: player.stats.passing,
    dribbling: player.stats.dribbling,
    defending: player.stats.defending,
    physical: player.stats.physical,
  };

  const performance: PlayerDetailPerformance = {
    goals: player.goals,
    assists: player.assists,
    pace: player.stats.pace,
    matches: 0,
  };

  const career: PlayerCareerEntry[] = player.career.map((period) => ({
    year: period.year,
    teamId: period.teamId,
    matches: period.matches,
    goals: period.goals,
  }));

  return {
    data: {
      player: {
        summary,
        attributes,
        performance,
        career,
      },
    },
    meta: {
      leagueId: "EPL",
      playerId: player.id,
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
    },
  };
};

const mapPlayerDetailResponse = (
  response: PlayerDetailApiResponse,
  leagueId: string,
  params?: PlayerDetailParams
): PlayerDetailResponse => {
  const summary = response.data.summary;
  const attributes = response.data.attributes ?? {};
  const performance = response.data.performance ?? {};

  return {
    data: {
      player: {
        summary: {
          ...summary,
          position: summary.position as PlayerPosition,
        },
        attributes: {
          pace: attributes.pace ?? 0,
          shooting: attributes.shooting ?? 0,
          passing: attributes.passing ?? 0,
          dribbling: attributes.dribbling ?? 0,
          defending: attributes.defending ?? 0,
          physical: attributes.physical ?? 0,
        },
        performance: {
          goals: performance.goals ?? 0,
          assists: performance.assists ?? 0,
          pace: performance.pace ?? attributes.pace ?? 0,
          matches: performance.matches ?? 0,
        },
        career: [],
      },
    },
    meta: {
      leagueId: response.meta?.leagueName ?? leagueId,
      playerId: summary.id,
      season: response.meta?.season ?? params?.season ?? MOCK_SEASON,
      lastUpdated: response.meta?.lastUpdated
        ? Date.parse(response.meta.lastUpdated)
        : Date.now(),
      locale:
        response.meta?.locale ?? mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
    },
  };
};
