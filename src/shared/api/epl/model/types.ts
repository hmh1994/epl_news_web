import type { MatchDaySchedule } from "@/entities/match/model/match-schedule";
import type { PlayerRanking } from "@/entities/player/model/player-ranking";
import type {
  PlayerPosition,
  PlayerProfile,
} from "@/entities/player/model/player-profile";
import type { TeamProfile } from "@/entities/team/model/team-profile";

type ApiPlayerProfile = Omit<PlayerProfile, "value" | "marketValue">;
type ApiPlayerRanking = Omit<PlayerRanking, "value">;

export interface ApiResponseMeta {
  season?: string;
  lastUpdated?: number;
  leagueId?: string;
  leagueName?: string;
  locale?: string;
}

export interface ApiListResponse<T, M = ApiResponseMeta> {
  data: T[];
  meta?: M;
}

export interface ApiResourceResponse<T> {
  data: T;
  meta?: ApiResponseMeta;
}

export interface TeamSummary {
  id: string;
  name: string;
  shortName: string;
  logo: string;
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

export interface PlayerRankingResponse extends ApiListResponse<ApiPlayerRanking> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    category: "top-scorers" | "form" | "assists";
    source: string;
  };
}

export interface MatchScheduleResponse extends ApiResourceResponse<{
  dateRange?: {
    startDate: string;
    endDate: string;
  };
  schedule: MatchDaySchedule[];
}> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    lastUpdated: number;
  };
}

export interface TeamDetailSummary {
  id: number;
  name: string;
  shortName: string;
  logo: string;
  manager: string;
  description: string;
}

export interface TeamDetailMeta {
  rank: number;
  points: number;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  avgAge: number;
  trophies: number;
}

export interface TeamDetailStatic {
  founded: number;
  stadium: string;
  capacity: number;
  colors: TeamProfile["colors"];
  keyStats: TeamProfile["keyStats"];
}

export interface TeamDetailResponse extends ApiResourceResponse<{
  summary: TeamDetailSummary;
  meta: TeamDetailMeta;
  static: TeamDetailStatic;
  squad: ApiPlayerProfile[];
}> {
  meta: ApiResponseMeta & {
    leagueId: string;
    teamId: string;
    season: string;
    lastUpdated: number;
  };
}

export interface PlayerDetailSummary {
  id: string | number;
  name: string;
  teamId: string | number;
  position: PlayerPosition;
  photo: string;
  nationality: string;
  age: number;
  height: number;
  weight: number;
}

export interface PlayerDetailAttributes {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

export interface PlayerDetailPerformance {
  goals: number;
  assists: number;
  pace: number;
  matches?: number;
}

export interface PlayerCareerEntry {
  year: string;
  teamId: string;
  matches: number;
  goals: number;
}

export interface PlayerDetailResponse extends ApiResourceResponse<{
  player: {
    summary: PlayerDetailSummary;
    attributes: PlayerDetailAttributes;
    performance: PlayerDetailPerformance;
    career: PlayerCareerEntry[];
  };
}> {
  meta: ApiResponseMeta & {
    leagueId: string;
    playerId: string | number;
    season: string;
    lastUpdated: number;
  };
}

export interface PremiumTableResponse extends ApiResourceResponse<
  LeagueStandingsRow[]
> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    lastUpdated: number;
  };
}
