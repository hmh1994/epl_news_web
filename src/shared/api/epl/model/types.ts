import type { MatchDetail } from "@/entities/match/model/match-detail";
import type { MatchDaySchedule } from "@/entities/match/model/match-schedule";
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

export interface TeamsInfoResponse extends ApiListResponse<TeamSummary> {
  meta: ApiResponseMeta & {
    total: number;
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

export interface MatchScheduleResponse
  extends ApiResourceResponse<{
    matchweeks: number[];
    schedule: MatchDaySchedule[];
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
  }> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    lastUpdated: number;
  };
}
