import { apiClient } from "@/shared/api/client";
import {
  USE_MOCK_API,
  MOCK_LOCALE,
  MOCK_SEASON,
} from "@/shared/config/mock-api";
import type {
  TeamProfilesResponse,
  TeamSquadResponse,
  TeamsInfoResponse,
} from "@/shared/api/epl/model/types";
import type { TeamProfile } from "@/entities/team/model/team-profile";
import type {
  PlayerProfile,
  PlayerPosition,
} from "@/entities/player/model/player-profile";
import { RequestOptions, leaguePath } from "./base";
import { MOCK_TEAMS } from "@/shared/mocks/data/teams";
import { TEAM_PLAYERS, TEAM_PROFILES } from "@/shared/mocks/team-info";

export interface TeamsInfoParams {
  leagueId?: string;
  search?: string;
  locale?: string;
}

export const fetchTeamsInfo = async (
  leagueId: string,
  params?: TeamsInfoParams,
  options?: RequestOptions
): Promise<TeamsInfoResponse> => {
  if (USE_MOCK_API) {
    const search = params?.search?.toLowerCase().trim() ?? "";
    const filtered = MOCK_TEAMS.filter((team) => {
      if (params?.leagueId && params.leagueId !== "epl") {
        return false;
      }

      if (!search) {
        return true;
      }

      return (
        team.name.toLowerCase().includes(search) ||
        team.shortName.toLowerCase().includes(search) ||
        (team.city?.toLowerCase().includes(search) ?? false)
      );
    });

    return {
      data: filtered,
      meta: {
        total: filtered.length,
        locale: params?.locale ?? MOCK_LOCALE,
      },
    };
  }

  return apiClient.get<TeamsInfoResponse>(leaguePath(leagueId, `/teams`), {
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
  if (USE_MOCK_API) {
    const search = params?.search?.toLowerCase().trim() ?? "";
    const teams = TEAM_PROFILES.filter((team) =>
      search.length === 0
        ? true
        : [team.name, team.shortName, team.stadium]
            .join(" ")
            .toLowerCase()
            .includes(search)
    ).map(toApiTeamProfile);

    return {
      data: {
        teams,
        filters: {
          positions: buildAvailablePositions(),
        },
      },
      meta: {
        leagueId,
        season: params?.season ?? MOCK_SEASON,
        lastUpdated: Date.now(),
        locale: params?.locale ?? MOCK_LOCALE,
      },
    };
  }

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
  leagueId: string,
  teamId: string,
  params?: TeamSquadParams,
  options?: RequestOptions
): Promise<TeamSquadResponse> => {
  if (USE_MOCK_API) {
    return buildMockTeamSquad(teamId, params);
  }

  return apiClient.get<TeamSquadResponse>(
    leaguePath(leagueId, `/teams/${teamId}/squad`),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
      },
    }
  );
};

const toApiTeamProfile = (team: TeamProfile) => {
  const { value: _omitValue, ...rest } = team;
  return rest;
};

const toApiPlayerProfile = (player: PlayerProfile) => {
  const { value: _omitValue, marketValue: _omitMarketValue, ...rest } = player;
  return rest;
};

const buildAvailablePositions = (): PlayerPosition[] => {
  const unique = new Set<PlayerPosition>();
  TEAM_PLAYERS.forEach((player) => {
    unique.add(player.position);
  });
  return Array.from(unique);
};

const findTeamProfile = (teamId: string) => {
  const normalized = teamId.toLowerCase();
  return (
    TEAM_PROFILES.find(
      (team) =>
        team.shortName.toLowerCase() === normalized ||
        String(team.id) === normalized ||
        team.name.toLowerCase() === normalized
    ) ??
    TEAM_PROFILES.find((team) => team.shortName.toLowerCase() === normalized)
  );
};

const buildMockTeamSquad = (
  teamId: string,
  params?: TeamSquadParams
): TeamSquadResponse => {
  const team = findTeamProfile(teamId);

  if (!team) {
    throw new Error(`Unknown team id: ${teamId}`);
  }

  const sanitizedTeam = toApiTeamProfile(team);
  const squad = TEAM_PLAYERS.filter((player) => player.teamId === team.id).map(
    toApiPlayerProfile
  );

  return {
    data: {
      team: sanitizedTeam,
      squad,
    },
    meta: {
      teamId: String(sanitizedTeam.id),
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};
