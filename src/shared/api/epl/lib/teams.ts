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
      },
      meta: {
        leagueId,
        season: params?.season ?? MOCK_SEASON,
        lastUpdated: Date.now(),
        locale: params?.locale ?? MOCK_LOCALE,
      },
    };
  }

  const response = await apiClient.get<unknown>(
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

  return normalizeTeamProfilesResponse(response, leagueId, params);
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

  const response = await apiClient.get<unknown>(
    leaguePath(leagueId, `/teams/${teamId}/squad`),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
      },
    }
  );

  return normalizeTeamSquadResponse(response, leagueId, params);
};

const toApiTeamProfile = (team: TeamProfile) => team;

const toApiPlayerProfile = (player: PlayerProfile) => player;

const buildAvailablePositions = (): PlayerPosition[] => {
  const unique = new Set<PlayerPosition>();
  TEAM_PLAYERS.forEach((player) => {
    unique.add(player.position);
  });
  return Array.from(unique);
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

const buildMockTeamSquad = (
  teamId: string,
  params?: TeamSquadParams
): TeamSquadResponse => {
  let team = findTeamProfile(teamId);

  if (!team) {
    team = TEAM_PROFILES[0];
  }

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

type ExternalTeamProfilePayload = {
  id?: string | number;
  nameEn?: string;
  nameKr?: string;
  shortNameEn?: string;
  shortNameKr?: string;
  logo?: string;
  founded?: number;
  stadiumEn?: string;
  stadiumKr?: string;
  capacity?: number;
  rank?: number;
  managerEn?: string;
  managerKr?: string;
  points?: number;
  played?: number;
  won?: number;
  drawn?: number;
  lost?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  form?: string[];
  avgAge?: number;
  trophies?: number;
  description?: string;
  possession?: number;
  passAccuracy?: number;
  shotsPerGame?: number;
  cleanSheets?: number;
  countryEn?: string;
  countryKr?: string;
};

type ExternalTeamProfilesApiResponse = {
  teams?: ExternalTeamProfilePayload[];
  filters?: {
    positions?: PlayerPosition[] | string;
  };
  meta?: {
    leagueId?: string;
    leagueName?: string;
    season?: string;
    seasonId?: string;
    locale?: string;
  };
};

type ExternalSquadPlayerPayload = {
  id?: string | number;
  nameEn?: string;
  nameKr?: string;
  number?: number;
  position?: string;
  age?: number;
  nationalityEn?: string;
  nationalityKr?: string;
  teamId?: string | number;
  goals?: number;
  assists?: number;
  appearances?: number;
  rating?: number;
  value?: string;
  marketValue?: number;
};

type ExternalTeamSquadApiResponse = {
  team?: ExternalTeamProfilePayload;
  squad?: ExternalSquadPlayerPayload[];
  meta?: {
    season?: string;
    seasonId?: string;
    leagueId?: string;
    leagueName?: string;
    teamId?: string;
    locale?: string;
  };
};

const DEFAULT_TEAM_COLORS: TeamProfile["colors"] = {
  primary: "#0f172a",
  secondary: "#1e1b4b",
};

const DEFAULT_TEAM_KEY_STATS: TeamProfile["keyStats"] = {
  possession: 0,
  passAccuracy: 0,
  shotsPerGame: 0,
  cleanSheets: 0,
};

const normalizeTeamProfilesResponse = (
  raw: unknown,
  leagueId: string,
  params?: TeamProfilesParams
): TeamProfilesResponse => {
  const typed = raw as TeamProfilesResponse;
  if (typed?.data?.teams) {
    return typed;
  }

  const apiResponse = raw as ExternalTeamProfilesApiResponse;
  const teams = Array.isArray(apiResponse?.teams)
    ? apiResponse.teams.map((team) => adaptExternalTeamProfile(team))
    : [];

  return {
    data: {
      teams,
    },
    meta: {
      leagueId,
      season:
        params?.season ??
        apiResponse?.meta?.season ??
        apiResponse?.meta?.seasonId ??
        MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: params?.locale ?? apiResponse?.meta?.locale ?? MOCK_LOCALE,
    },
  };
};

const normalizeTeamSquadResponse = (
  raw: unknown,
  leagueId: string,
  params?: TeamSquadParams
): TeamSquadResponse => {
  const typed = raw as TeamSquadResponse;
  if (typed?.data?.team && typed?.data?.squad) {
    return typed;
  }

  const apiResponse = raw as ExternalTeamSquadApiResponse;
  const team = adaptExternalTeamProfile(apiResponse?.team);
  const squad = Array.isArray(apiResponse?.squad)
    ? apiResponse.squad.map((player) =>
        adaptExternalPlayerProfile(player, team.id)
      )
    : [];

  return {
    data: {
      team,
      squad,
    },
    meta: {
      leagueId,
      teamId: String(team.id),
      season:
        params?.season ??
        apiResponse?.meta?.season ??
        apiResponse?.meta?.seasonId ??
        MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: params?.locale ?? apiResponse?.meta?.locale ?? MOCK_LOCALE,
    },
  };
};

const adaptExternalTeamProfile = (
  team?: ExternalTeamProfilePayload
): TeamProfile => {
  if (!team) {
    return TEAM_PROFILES[0];
  }

  const matched = findMockTeamProfile(team);
  const numericId =
    matched?.id ?? toNumericId(team.id ?? team.shortNameEn ?? team.nameEn);
  const name = team.nameKr ?? team.nameEn ?? matched?.name ?? "알 수 없는 팀";
  const shortName =
    team.shortNameKr ??
    team.shortNameEn ??
    matched?.shortName ??
    name.slice(0, 3).toUpperCase();
  const colors = matched?.colors ?? DEFAULT_TEAM_COLORS;
  const fallbackStats = matched?.keyStats ?? DEFAULT_TEAM_KEY_STATS;
  const played = safeNumber(team.played, matched?.played ?? 0);
  const goalsFor = safeNumber(team.goalsFor, matched?.goalsFor ?? 0);

  const keyStats: TeamProfile["keyStats"] = {
    possession: safeNumber(team.possession, fallbackStats.possession),
    passAccuracy: safeNumber(team.passAccuracy, fallbackStats.passAccuracy),
    shotsPerGame:
      typeof team.shotsPerGame === "number"
        ? team.shotsPerGame
        : fallbackStats.shotsPerGame ||
          Number((goalsFor / Math.max(played || 1, 1)).toFixed(1)),
    cleanSheets: safeNumber(team.cleanSheets, fallbackStats.cleanSheets),
  };

  return {
    id: numericId,
    name,
    shortName,
    logo: team.logo ?? matched?.logo ?? "⚽",
    founded: safeNumber(team.founded, matched?.founded ?? 0),
    stadium:
      team.stadiumKr ?? team.stadiumEn ?? matched?.stadium ?? "정보 없음",
    capacity: safeNumber(team.capacity, matched?.capacity ?? 0),
    manager:
      team.managerKr ?? team.managerEn ?? matched?.manager ?? "정보 없음",
    nationality:
      team.countryKr ?? team.countryEn ?? matched?.nationality ?? "정보 없음",
    colors,
    rank: safeNumber(team.rank, matched?.rank ?? 0),
    points: safeNumber(team.points, matched?.points ?? 0),
    played,
    won: safeNumber(team.won, matched?.won ?? 0),
    drawn: safeNumber(team.drawn, matched?.drawn ?? 0),
    lost: safeNumber(team.lost, matched?.lost ?? 0),
    goalsFor,
    goalsAgainst: safeNumber(team.goalsAgainst, matched?.goalsAgainst ?? 0),
    form: Array.isArray(team.form) ? team.form : matched?.form ?? [],
    value: matched?.value ?? "정보 없음",
    avgAge: safeNumber(team.avgAge, matched?.avgAge ?? 0),
    trophies: safeNumber(team.trophies, matched?.trophies ?? 0),
    description:
      team.description ??
      matched?.description ??
      `${name} 팀 정보가 준비 중입니다.`,
    keyStats,
  };
};

const adaptExternalPlayerProfile = (
  player: ExternalSquadPlayerPayload,
  teamId: number
): PlayerProfile => {
  const matched = findMockPlayerProfile(player);
  return {
    id: matched?.id ?? toNumericId(player.id ?? player.nameEn ?? player.nameKr),
    number: player.number ?? matched?.number ?? 0,
    name: player.nameKr ?? player.nameEn ?? matched?.name ?? "알 수 없는 선수",
    position:
      normalizePlayerPosition(player.position) ?? matched?.position ?? "CM",
    age: safeNumber(player.age, matched?.age ?? 0),
    nationality:
      player.nationalityKr ??
      matched?.nationality ??
      player.nationalityEn ??
      "정보 없음",
    nationalityName:
      player.nationalityEn ??
      matched?.nationalityName ??
      player.nationalityKr ??
      "Unknown",
    teamId,
    value: matched?.value ?? "정보 없음",
    rating: player.rating ?? matched?.rating ?? 0,
    goals: safeNumber(player.goals, matched?.goals ?? 0),
    assists: safeNumber(player.assists, matched?.assists ?? 0),
    appearances: safeNumber(player.appearances, matched?.appearances ?? 0),
    marketValue: player.marketValue ?? matched?.marketValue ?? 0,
  };
};

const toNumericId = (value?: string | number): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.length > 0) {
    let hash = 0;
    for (let index = 0; index < value.length; index += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(index);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  return 0;
};

const safeNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }

  return fallback;
};

const normalizeNameKey = (value?: string) =>
  value
    ?.toLowerCase()
    .replace(/fc/g, "")
    .replace(/[^a-z0-9가-힣]/g, "");

const findMockTeamProfile = (team?: ExternalTeamProfilePayload) => {
  if (!team) {
    return null;
  }

  const candidates = [
    team.nameKr,
    team.shortNameKr,
    team.nameEn,
    team.shortNameEn,
  ]
    .map(normalizeNameKey)
    .filter(Boolean);

  if (candidates.length === 0) {
    return null;
  }

  return TEAM_PROFILES.find((mock) => {
    const mockKeys = [
      normalizeNameKey(mock.name),
      normalizeNameKey(mock.shortName),
    ].filter(Boolean);
    return mockKeys.some((key) =>
      candidates.some(
        (candidate) =>
          candidate === key ||
          (candidate?.includes(key ?? "") ?? false) ||
          (key?.includes(candidate ?? "") ?? false)
      )
    );
  });
};

const findMockPlayerProfile = (player?: ExternalSquadPlayerPayload) => {
  if (!player) {
    return null;
  }

  const key = normalizeNameKey(player.nameKr ?? player.nameEn);
  if (!key) {
    return null;
  }

  return TEAM_PLAYERS.find(
    (mockPlayer) => normalizeNameKey(mockPlayer.name) === key
  );
};

const normalizePlayerPosition = (
  position?: string
): PlayerPosition | undefined => {
  if (!position) {
    return undefined;
  }

  const normalized = position.toUpperCase();

  if (normalized.includes("GOALKEEPER")) {
    return "GK";
  }

  if (normalized.includes("DEFENDER")) {
    return "CB";
  }

  if (normalized.includes("MIDFIELDER")) {
    return "CM";
  }

  if (normalized.includes("FORWARD")) {
    return "ST";
  }

  return (normalized as PlayerPosition) ?? undefined;
};
