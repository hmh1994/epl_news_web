import { apiClient } from "@/shared/api/client";
import type {
  TeamProfilesResponse,
  TeamSquadResponse,
  TeamsInfoResponse,
} from "@/shared/api/epl/model/types";
import { API_ROOT, RequestOptions, teamPath, leaguePath } from "./base";

export interface TeamsInfoParams {
  leagueId?: string;
  search?: string;
  locale?: string;
}

export const fetchTeamsInfo = async (
  params?: TeamsInfoParams,
  options?: RequestOptions
): Promise<TeamsInfoResponse> => {
  return apiClient.get<TeamsInfoResponse>(`${API_ROOT}/teams`, {
    ...options,
    params: {
      leagueId: params?.leagueId,
      search: params?.search,
      locale: params?.locale,
    },
  });
};

export interface TeamProfilesParams {
  season?: string;
  locale?: string;
  search?: string;
}

export const fetchTeamProfiles = async (
  leagueId: string,
  params?: TeamProfilesParams,
  options?: RequestOptions
): Promise<TeamProfilesResponse> => {
  return apiClient.get<TeamProfilesResponse>(
    leaguePath(leagueId, "/teams/profiles"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        search: params?.search,
      },
    }
  );
};

export interface TeamSquadParams {
  season?: string;
  locale?: string;
}

export const fetchTeamSquad = async (
  teamId: string,
  params?: TeamSquadParams,
  options?: RequestOptions
): Promise<TeamSquadResponse> => {
  return apiClient.get<TeamSquadResponse>(teamPath(teamId, "/squad"), {
    ...options,
    params: {
      season: params?.season,
      locale: params?.locale,
    },
  });
};
