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
  };
}

export interface MatchDetailType {
  result: {
    id: string;
    groupNameEn: string;
    groupNameKr: string;
    cityNameEn: string;
    cityNameKr: string;
    capacity: number;
    kickoffTime: string;
    officialNameEn: string;
    officialNameKr: string;
    homeTeamId: string;
    homeTeamNameEn: string;
    homeTeamNameKr: string;
    homeTeamManagerEn: string;
    homeTeamManagerKr: string;
    homeTeamFormation: Array<number>;
    homeLineup: Array<MatchDetailPlayerType>;
    homeSubstitutes: Array<MatchDetailSubPlayerType>;
    homeTeamRecentForm: Array<MatchDetailGameResultType>;
    homeTeamScore: number;

    awayTeamId: string;
    awayTeamNameEn: string;
    awayTeamNameKr: string;
    awayTeamManagerEn: string;
    awayTeamManagerKr: string;
    awayTeamFormation: Array<number>;
    awayLineup: Array<MatchDetailPlayerType>;
    awaySubstitutes: Array<MatchDetailSubPlayerType>;
    awayTeamRecentForm: Array<MatchDetailGameResultType>;
    awayTeamScore: number;

    gameStat: MatchDetailStatType;
  };
}

export const getMatchDetail = async ({ fixtureId }: { fixtureId: string }) => {
  try {
    const result = await apiClient.get<MatchDetailType>(
      `/api/v1/match/info/${fixtureId}`
    );
    return result;
  } catch (error) {
    console.error(error);
  }
};
