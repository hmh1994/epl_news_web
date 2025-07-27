import { apiClient } from "@/src/shared/api-client";

export interface PlayerGoalRankType {
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
  goals: number;
}

export interface PlayerGoalRanksType {
  playerGoalRank: Array<PlayerGoalRankType>;
}

export const getPlayerGoalRank = async () => {
  try {
    const result = await apiClient.get<PlayerGoalRanksType>(
      "/api/v1/player/rank/goal"
    );
    return result;
  } catch (e) {
    console.error(e);
    return {
      playerGoalRank: [],
    };
  }
};
