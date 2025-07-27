import { apiClient } from "@/src/shared/api-client";

export interface PlayerAssistRankType {
  rank: number;
  shirtNumber: number;
  playerId: string;
  playerNameEn: string;
  playerNameKr: string;
  playerImg: string;
  countryEn: string;
  countryKr: string;
  teamId: string;
  teamNameEn: string;
  teamNameKr: string;
  teamIcon: string;
  appearances: number;
  assists: number;
}

export interface PlayerAssistRanksType {
  playerAssistRank: Array<PlayerAssistRankType>;
}

export const getPlayerAssistRank = async () => {
  try {
    const result = await apiClient.get<PlayerAssistRanksType>(
      "/api/v1/player/rank/assist"
    );
    return result;
  } catch (e) {
    console.error(e);
    return {
      playerAssistRank: [],
    };
  }
};
