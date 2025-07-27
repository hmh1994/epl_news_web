import { apiClient } from "@/src/shared/api-client";

export interface TeamRankDetailType {
  rank: number;
  shortNameEn: string;
  teamId: string;
  teamLogo: string;
  overallMatches: number;
  overallMatchesWon: number;
  overallMatchesDrawn: number;
  overallMatchesLost: number;
  overallGoalsFor: number;
  overallGoalsAgainst: number;
  overallGoalsDifference: number;
  overallPoints: number;
  recent5Results: string[];
}

export interface TeamRanksDetailType {
  teamRankDetail: Array<TeamRankDetailType>;
}

export const getTeamRankDetail = async () => {
  try {
    const result = await apiClient.get<TeamRanksDetailType>(
      "/api/v1/teams/rank/detail"
    );
    return result;
  } catch (e) {
    console.error(e);
    return {
      teamRankDetail: [],
    };
  }
};
