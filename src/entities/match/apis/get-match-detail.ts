import { apiClient } from "@/src/shared/api-client";

export interface MatchDetailPlayerType {
  playerId: string;
  shirtNumber: number;
  row: number;
  column: number;
  displayNameEn: string;
  displayNameKr: string;
}

export interface MatchDetailSubPlayerType {
  playerId: string;
  shirtNumber: number;
  displayNameEn: string;
  displayNameKr: string;
}

export enum MatchDetailGameResultType {
  LOSE = "L",
  WIN = "W",
  DRAW = "D",
}

export interface MatchDetailTeamStatType {
  possession: number;
  shotsTotal: number;
  shotsOnTarget: number;
  foulsCommitted: number;
  passesTotal: number;
  passesAccurate: number;
}

export interface MatchDetailSubstitutionType {
  clock: number;
  inPlayerDisplayNameEn: string;
  inPlayerDisplayNameKr: string;
  inPlayerShirtNumber: number;
  outPlayerDisplayNameEn: string;
  outPlayerDisplayNameKr: string;
  outPlayerShirtNumber: number;
}

export interface MatchDetailGoalType {
  teamSide: string;
  clock: number;
  playerDisplayNameEn: string;
  playerDisplayNameKr: string;
}

export enum CardType {
  F_YELLOW = "FIRST_YELLOW",
  S_YELLOW = "SECOND_YELLOW",
  RED = "DIRECT_RED",
}

export interface MatchDetailCardType {
  teamSide: string;
  clock: number;
  playerDisplayNameEn: string;
  playerDisplayNameKr: string;
  cardType: CardType;
}

export interface MatchDetailStatType {
  static: {
    home: MatchDetailTeamStatType;
    away: MatchDetailTeamStatType;
  };
  timeline: {
    goals: Array<MatchDetailGoalType>;
    cards: Array<MatchDetailCardType>;
    substitutions: {
      home: MatchDetailSubstitutionType[];
      away: MatchDetailSubstitutionType[];
    };
  };
}

export interface MatchDetailType {
  id: string;
  groundNameEn: string;
  groundNameKr: string;
  cityNameEn: string;
  cityNameKr: string;
  capacity: number;
  kickoffTime: string;
  officialNameEn: string;
  officialNameKr: string;

  homeTeamInfo: {
    lineup: Array<MatchDetailPlayerType>;
    substitutes: Array<MatchDetailSubPlayerType>;
    teamId: string;
    teamLogo: string;
    teamNameEn: string;
    shortTeamNameEn: string;
    teamNameKr: string;
    shortTeamNameKr: string;
    teamManagerEn: string;
    teamManagerKr: string;
    teamFormation: Array<number>;
    teamRecentForm: Array<MatchDetailGameResultType>;
    teamScore: number;
  };

  awayTeamInfo: {
    lineup: Array<MatchDetailPlayerType>;
    substitutes: Array<MatchDetailSubPlayerType>;
    teamId: string;
    teamLogo: string;
    teamNameEn: string;
    shortTeamNameEn: string;
    teamNameKr: string;
    shortTeamNameKr: string;
    teamManagerEn: string;
    teamManagerKr: string;
    teamFormation: Array<number>;
    teamRecentForm: Array<MatchDetailGameResultType>;
    teamScore: number;
  };

  gameStat: MatchDetailStatType;
}

export const getMatchDetail = async ({ fixtureId }: { fixtureId: string }) => {
  try {
    const result = await apiClient.get<MatchDetailType>(
      `/api/v1/match/info/${fixtureId}`
      // `/api/v1/match/infotest`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
