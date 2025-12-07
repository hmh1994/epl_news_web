import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type {
  TeamDetailResponse,
  TeamDetailSummary,
  TeamDetailMeta,
  TeamDetailStatic,
} from "@/shared/api/epl/model/types";
import { leaguePath, RequestOptions } from "./base";

const {
  teams: { profiles: TEAM_PROFILES, squadPlayers: TEAM_PLAYERS },
} = EPL_MOCK_DATA;

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
  try {
    return await apiClient.get<TeamDetailResponse>(
      leaguePath(leagueId, `/teams/${teamId}`),
      {
        ...options,
        params: {
          season: params?.season,
          locale: params?.locale,
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchTeamDetail] Falling back to mock data due to request failure",
      error
    );
    return buildMockTeamDetail(teamId, params);
  }
};

const findTeamProfile = (teamId?: string | number | null) => {
  const normalized =
    typeof teamId === "string"
      ? teamId.toLowerCase()
      : typeof teamId === "number"
      ? String(teamId)
      : "";

  if (!normalized) {
    return null;
  }

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

const buildMockTeamDetail = (
  teamId: string,
  params?: TeamDetailParams
): TeamDetailResponse => {
  let team = findTeamProfile(teamId);

  if (!team) {
    team = TEAM_PROFILES[0];
  }

  if (!team) {
    throw new Error(`Unknown team id: ${teamId}`);
  }

  const summary: TeamDetailSummary = {
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    logo: team.logo,
    manager: team.manager,
    description: team.description,
  };

  const meta: TeamDetailMeta = {
    rank: team.rank,
    points: team.points,
    played: team.played,
    won: team.won,
    drawn: team.drawn,
    lost: team.lost,
    goalsFor: team.goalsFor,
    goalsAgainst: team.goalsAgainst,
    avgAge: team.avgAge,
    trophies: team.trophies,
  };

  const staticInfo: TeamDetailStatic = {
    founded: team.founded,
    stadium: team.stadium,
    capacity: team.capacity,
    colors: team.colors,
    keyStats: team.keyStats,
  };

  const squad = TEAM_PLAYERS.filter((player) => player.teamId === team.id);

  return {
    data: {
      team: {
        summary,
        meta,
        static: staticInfo,
        squad,
      },
    },
    meta: {
      leagueId: "EPL",
      teamId: String(team.id),
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};
