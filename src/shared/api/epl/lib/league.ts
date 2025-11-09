import { apiClient } from "@/shared/api/client";
import { USE_MOCK_API, MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import {
  EPL_CHAMPIONS,
  EPL_STATS,
  EPL_TOP_CLUBS,
  LEAGUE_SUMMARIES,
} from "@/shared/mocks/league-overview";
import { PREMIER_LEAGUE_TABLE } from "@/shared/mocks/premium-epl-table";
import {
  EPL_PLAYER_RANKINGS,
  EPL_SEASON_STATS,
} from "@/shared/mocks/epl-hub";
import { EPL_MATCH_SCHEDULE } from "@/shared/mocks/match-schedule";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import type {
  HubOverviewResponse,
  LeagueMetaMetric,
  LeagueMetaResponse,
  LeagueMetadataResponse,
  LeagueStandingsResponse,
  LeagueStandingsRow,
  PremiumTableResponse,
} from "@/shared/api/epl/model/types";
import type { LeagueStat as HighlightLeagueStat } from "@/entities/stat/model/league-stat";
import { leaguePath, RequestOptions } from "./base";

export interface LeagueMetadataParams {
  season?: string;
  locale?: string;
}

export const fetchLeagueMetadata = async (
  leagueId: string,
  params?: LeagueMetadataParams,
  options?: RequestOptions
): Promise<LeagueMetadataResponse> => {
  if (USE_MOCK_API) {
    return buildMockLeagueMetadata(params);
  }

  return apiClient.get<LeagueMetadataResponse>(
    leaguePath(leagueId, "/metadata"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
      },
    }
  );
};

export interface LeagueStandingsParams {
  season?: string;
  locale?: string;
  includeAdvanced?: boolean;
}

export const fetchLeagueStandings = async (
  leagueId: string,
  params?: LeagueStandingsParams,
  options?: RequestOptions
): Promise<LeagueStandingsResponse> => {
  if (USE_MOCK_API) {
    return buildMockLeagueStandings(params);
  }

  return apiClient.get<LeagueStandingsResponse>(
    leaguePath(leagueId, "/standings"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        includeAdvanced: params?.includeAdvanced,
      },
    }
  );
};

export interface LeagueMetaParams {
  season?: string;
  locale?: string;
}

export const fetchLeagueMeta = async (
  leagueId: string,
  params?: LeagueMetaParams,
  options?: RequestOptions
): Promise<LeagueMetaResponse> => {
  if (USE_MOCK_API) {
    return buildMockLeagueMeta(params);
  }

  return apiClient.get<LeagueMetaResponse>(leaguePath(leagueId, "/meta"), {
    ...options,
    params: {
      season: params?.season,
      locale: params?.locale,
    },
  });
};

export interface HubOverviewParams {
  season?: string;
  locale?: string;
  limitFixtures?: number;
  limitRankings?: number;
}

export const fetchHubOverview = async (
  leagueId: string,
  params?: HubOverviewParams,
  options?: RequestOptions
): Promise<HubOverviewResponse> => {
  if (USE_MOCK_API) {
    return buildMockHubOverview(params);
  }

  return apiClient.get<HubOverviewResponse>(
    leaguePath(leagueId, "/hub-overview"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        limitFixtures: params?.limitFixtures,
        limitRankings: params?.limitRankings,
      },
    }
  );
};

export interface PremiumTableParams {
  season?: string;
  locale?: string;
  includeAnalytics?: boolean;
}

export const fetchPremiumTable = async (
  leagueId: string,
  params?: PremiumTableParams,
  options?: RequestOptions
): Promise<PremiumTableResponse> => {
  if (USE_MOCK_API) {
    return buildMockPremiumTable(params);
  }

  return apiClient.get<PremiumTableResponse>(
    leaguePath(leagueId, "/premium-table"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        includeAnalytics: params?.includeAnalytics,
      },
    }
  );
};

const findLeagueSummary = () => {
  const entries = Object.entries(LEAGUE_SUMMARIES);
  return entries.length > 0 ? entries[0][1] : null;
};

const buildTeamSummary = (teamId: string) => {
  const team = TEAMS_BY_ID[teamId];
  const fallback = teamId.toUpperCase();

  return {
    id: teamId,
    name: team?.name ?? fallback,
    shortName: team?.shortName ?? fallback,
    crest: team?.crest ?? "⚽",
    city: team?.city,
    stadium: team?.stadium,
  };
};

const buildStandingsRows = (): LeagueStandingsRow[] =>
  PREMIER_LEAGUE_TABLE.map((team) => ({
    team: buildTeamSummary(team.teamId),
    position: team.position,
    record: {
      played: team.played,
      won: team.won,
      drawn: team.drawn,
      lost: team.lost,
      goalsFor: team.goalsFor,
      goalsAgainst: team.goalsAgainst,
      goalDifference: team.goalDifference,
      points: team.points,
    },
    form: team.form,
    trend: team.trend,
    advancedMetrics: {
      xG: team.xG,
      xGA: team.xGA,
      possession: team.possession,
      passAccuracy: team.passAccuracy,
      cleanSheets: team.cleanSheets,
      bigChances: team.bigChances,
      marketValue: team.value,
    },
  }));

const buildLeagueMetaMetrics = (): LeagueMetaMetric[] =>
  EPL_SEASON_STATS.map((stat) => ({
    id: stat.id,
    label: stat.label,
    value: stat.value,
    description: stat.change,
    icon: stat.icon,
  }));

const fallbackSummary = () => ({
  name: "Premier League",
  country: "🏴",
  teams: 20,
  totalGoals: 0,
  avgAttendance: 0,
  marketValue: "—",
  color: "from-[#169976] to-teal-500",
  logo: "⚽",
});

const buildMockLeagueMetadata = (
  params?: LeagueMetadataParams
): LeagueMetadataResponse => {
  const summary = findLeagueSummary() ?? fallbackSummary();
  const highlightMetrics: HighlightLeagueStat[] = EPL_SEASON_STATS;

  return {
    data: {
      summary,
      overviewStats: EPL_STATS,
      highlightMetrics,
      champions: EPL_CHAMPIONS,
      successfulClubs: EPL_TOP_CLUBS,
    },
    meta: {
      leagueId: summary.name,
      season: params?.season ?? MOCK_SEASON,
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};

const buildMockLeagueStandings = (
  params?: LeagueStandingsParams
): LeagueStandingsResponse => {
  const rows = buildStandingsRows();
  const summary = findLeagueSummary() ?? fallbackSummary();

  return {
    data: rows,
    meta: {
      leagueId: summary.name,
      leagueName: summary.name,
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};

const buildMockLeagueMeta = (
  params?: LeagueMetaParams
): LeagueMetaResponse => ({
  data: buildLeagueMetaMetrics(),
  meta: {
    leagueId: "EPL",
    season: params?.season ?? MOCK_SEASON,
    locale: params?.locale ?? MOCK_LOCALE,
  },
});

const buildMockHubOverview = (
  params?: HubOverviewParams
): HubOverviewResponse => {
  const standings = buildStandingsRows().slice(0, 6);
  const fixtures = EPL_MATCH_SCHEDULE.flatMap((day) => day.fixtures)
    .filter((fixture) => fixture.status !== "finished")
    .slice(0, params?.limitFixtures ?? 3);
  const leagueMeta = buildLeagueMetaMetrics().slice(0, 4);

  return {
    data: {
      standings,
      featuredFixtures: fixtures,
      playerRankings: EPL_PLAYER_RANKINGS.slice(
        0,
        params?.limitRankings ?? 5
      ),
      leagueMeta,
    },
    meta: {
      leagueId: "EPL",
      season: params?.season ?? MOCK_SEASON,
      generatedAt: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};

const buildMockPremiumTable = (
  params?: PremiumTableParams
): PremiumTableResponse => {
  const standings = buildStandingsRows();
  const valueBands = [
    {
      tier: "Elite",
      teams: standings.slice(0, 4).map((row) => row.team.id),
    },
    {
      tier: "Contenders",
      teams: standings.slice(4, 10).map((row) => row.team.id),
    },
    {
      tier: "Survivors",
      teams: standings.slice(10).map((row) => row.team.id),
    },
  ];

  return {
    data: {
      standings,
      analytics: {
        formGuide: standings.slice(0, 6).map((row) => ({
          teamId: row.team.id,
          form: row.form,
        })),
        valueBands,
      },
    },
    meta: {
      leagueId: "EPL",
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};
