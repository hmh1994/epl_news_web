import type {
  LeagueChampion,
  LeagueStat as OverviewLeagueStat,
  LeagueSummary,
  SuccessfulClub,
} from "@/entities/league/model/league-overview";
import type { LeagueStat as HighlightLeagueStat } from "@/entities/stat/model/league-stat";
import type { MatchDetail } from "@/entities/match/model/match-detail";
import type {
  MatchDaySchedule,
  MatchFixture,
} from "@/entities/match/model/match-schedule";
import type { PlayerRanking } from "@/entities/player/model/player-ranking";
import type { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import type {
  PlayerPosition,
  PlayerProfile,
} from "@/entities/player/model/player-profile";
import type { TeamProfile } from "@/entities/team/model/team-profile";

type ApiTeamProfile = Omit<TeamProfile, "value">;
type ApiPlayerProfile = Omit<PlayerProfile, "value" | "marketValue">;
type ApiPlayerRanking = Omit<PlayerRanking, "value">;

export interface ApiResponseMeta {
  season?: string;
  lastUpdated?: number;
  leagueId?: string;
  leagueName?: string;
  locale?: string;
}

export interface ApiListResponse<T> {
  data: T[];
  meta?: ApiResponseMeta;
}

export interface ApiResourceResponse<T> {
  data: T;
  meta?: ApiResponseMeta;
}

export interface TeamSummary {
  id: string;
  name: string;
  shortName: string;
  crest: string;
  city?: string;
  stadium?: string;
}

export interface LeagueMetaMetric {
  id: string;
  label: string;
  value: string;
  description?: string;
  icon: string;
}

export interface FixtureHeadToHeadRecord {
  season: string;
  date: string;
  venue: string;
  result: string;
  note?: string;
}

export interface LeagueStandingsRow {
  team: TeamSummary;
  position: number;
  record: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  };
  form: string[];
  trend?: number;
  advancedMetrics?: {
    xG: number;
    xGA: number;
    possession: number;
    passAccuracy: number;
    cleanSheets: number;
    bigChances: number;
  };
}

export interface LeagueStandingsResponse
  extends ApiListResponse<LeagueStandingsRow> {
  meta: ApiResponseMeta & {
    leagueId: string;
    leagueName: string;
    season: string;
    lastUpdated: number;
  };
}

export interface TeamsInfoResponse extends ApiListResponse<TeamSummary> {
  meta: ApiResponseMeta & {
    total: number;
  };
}

export interface LeagueMetadataPayload {
  summary: LeagueSummary;
  overviewStats: OverviewLeagueStat[];
  highlightMetrics: HighlightLeagueStat[];
  champions: LeagueChampion[];
  successfulClubs: SuccessfulClub[];
}

export interface LeagueMetadataResponse
  extends ApiResourceResponse<LeagueMetadataPayload> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
  };
}

export interface PlayerRankingResponse
  extends ApiListResponse<ApiPlayerRanking> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    category: "top-scorers" | "form" | "assists";
    source: string;
  };
}

export interface LeagueMetaResponse extends ApiListResponse<LeagueMetaMetric> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
  };
}

export interface HubOverviewResponse
  extends ApiResourceResponse<{
    standings: LeagueStandingsRow[];
    featuredFixtures: MatchFixture[];
    playerRankings: PlayerRanking[];
    leagueMeta: LeagueMetaMetric[];
  }> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    generatedAt: number;
  };
}

export interface MatchScheduleAnalytics {
  rivalryPairs: Array<{
    teams: [string, string];
    label?: string;
    intensity: number;
  }>;
  teamPowerIndex: Array<{
    teamId: string;
    attack: number;
    defense?: number;
  }>;
  headToHead: Array<{
    fixtureKey: string;
    records: FixtureHeadToHeadRecord[];
  }>;
}

export interface MatchScheduleResponse
  extends ApiResourceResponse<{
    matchweeks: number[];
    schedule: MatchDaySchedule[];
    spotlightFixtureIds: string[];
    analytics: MatchScheduleAnalytics;
  }> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    lastUpdated: number;
  };
}

export interface MatchDetailResponse extends ApiResourceResponse<MatchDetail> {
  meta: ApiResponseMeta & {
    matchId: string;
    leagueId: string;
    season: string;
    generatedAt: number;
  };
}

export interface PlayerFilters {
  positions: PlayerPosition[];
  teamIds: string[];
  nationalities?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
}

export interface PlayerDatabaseResponse
  extends ApiResourceResponse<{
    players: PlayerDatabaseEntry[];
    filters: PlayerFilters;
  }> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    lastUpdated: number;
  };
}

export interface TeamProfilesResponse
  extends ApiResourceResponse<{
    teams: ApiTeamProfile[];
  }> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    lastUpdated: number;
  };
}

export interface TeamSquadResponse
  extends ApiResourceResponse<{
    team: ApiTeamProfile;
    squad: ApiPlayerProfile[];
  }> {
  meta: ApiResponseMeta & {
    teamId: string;
    season: string;
    lastUpdated: number;
  };
}

export interface PremiumTableResponse
  extends ApiResourceResponse<{
    standings: LeagueStandingsRow[];
    analytics: {
      formGuide: Array<{
        teamId: string;
        form: string[];
      }>;
      valueBands: Array<{
        tier: string;
        teams: string[];
      }>;
    };
  }> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    lastUpdated: number;
  };
}
