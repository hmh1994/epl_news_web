import { apiClient } from "@/src/shared/api-client";

export interface PlayerRankType {
  rank: number;
  number: number;
  playerId: string;
  playerNameEn: string;
  playerNameKr: string;
  playerFullName: string;
  playerImg: string;
  countryEn: string;
  countryKr: string;
  teamId: string;
  teamNameEn: string;
  teamNameKr: string;
  steamNameEn: string;
  steamNameKr: string;
  teamIcon: string;
  appearances: number;
  goals: number;
  assists: number;
  age: number;
  category: string;
}

export interface PlayerRanksType {
  goalRanks: Array<PlayerRankType>;
  assistRanks: Array<PlayerRankType>;
}

export const getPlayerRank = async () => {
  try {
    const result = await apiClient.get<PlayerRanksType>(
      "/api/v1/player/rank/goal-assist"
    );
    return result;
  } catch (e) {
    console.error(e);
    return {
      goalRanks: [],
      assistRanks: [],
    };
  }
};
