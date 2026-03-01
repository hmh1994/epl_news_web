import { apiClient } from "@/shared/api/client";
import type { TeamDetailResponse } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface TeamDetailParams {
  season?: string;
  locale?: string;
}

export const fetchTeamDetail = async (
  leagueId: string,
  teamId: string,
  params?: TeamDetailParams,
  options?: RequestOptions
): Promise<TeamDetailResponse> => {
  return await apiClient.get<TeamDetailResponse>(
    leaguePath(leagueId, `/teams/${teamId}`),
    {
      ...options,
      params: {
        season: params?.season,
        locale: mapLocaleToApi(params?.locale),
      },
    }
  );
};
