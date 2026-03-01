import { apiClient } from "@/shared/api/client";
import { MOCK_SEASON } from "@/shared/config/mock-api";
import type { TeamsResponse } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface TeamsParams {
  season?: string;
  locale?: string;
}

export const fetchTeams = async (
  leagueId: string,
  params?: TeamsParams,
  options?: RequestOptions,
): Promise<TeamsResponse> => {
  try {
    const response = await apiClient.get<TeamsResponse>(
      leaguePath(leagueId, "/teams"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
        },
      },
    );
    if (response?.data && typeof response.data === "object") {
      return response;
    }
  } catch {
    // fall through to empty response
  }
  return {
    data: {},
    meta: {
      leagueId,
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
    },
  };
};
