import { apiClient } from "@/src/shared/api-client";

export interface PlayerRankType {
  rank: number;
  playerName: string;
  playerId: string;
  teamName: string;
  teamId: string;
  statValue: number;
  photoUrl: string;
  iconUrl: string;
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
