import { apiClient } from "@/shared/api/client";
import type { PlayerAwardsResponse } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface PlayerAwardsParams {
  season?: string;
  locale?: string;
}

export const fetchPlayerAwards = async (
  leagueId: string,
  playerId: string,
  params?: PlayerAwardsParams,
  options?: RequestOptions,
): Promise<PlayerAwardsResponse> => {
  const response = await apiClient.get<PlayerAwardsResponse>(
    leaguePath(leagueId, `/player/${playerId}/awards`),
    {
      ...options,
      params: {
        season: params?.season,
        locale: mapLocaleToApi(params?.locale),
      },
    },
  );
  return response;
};
