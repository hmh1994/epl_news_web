import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import type {
  PlayerDetailResponse,
  PlayerDetailSummary,
  PlayerDetailAttributes,
  PlayerDetailPerformance,
} from "@/shared/api/epl/model/types";
import type { PlayerPosition } from "@/entities/player/model/player-profile";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

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
