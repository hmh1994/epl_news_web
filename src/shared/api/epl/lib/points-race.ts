import { apiClient } from "@/shared/api/client";
import type { ApiResponseMeta } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface PointsRaceTeam {
  teamId: string;
  name: string;
  shortName: string;
  logo: string;
  position: number;
  cumulativePoints: number[];
}

export interface PointsRaceResponse {
  data: PointsRaceTeam[];
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    lastUpdated: number;
  };
}

export interface PointsRaceParams {
  season?: string;
  locale?: string;
  limit?: number;
}

export const fetchPointsRace = async (
  leagueId: string,
  params?: PointsRaceParams,
  options?: RequestOptions
): Promise<PointsRaceResponse> => {
  try {
    return await apiClient.get<PointsRaceResponse>(
      leaguePath(leagueId, "/teams/points-race"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
          limit: params?.limit,
        },
      }
    );
  } catch {
    return { data: [], meta: { leagueId, season: "", lastUpdated: 0 } };
  }
};
