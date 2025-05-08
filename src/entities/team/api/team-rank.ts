import { API_VERSION } from "@/src/shared/constants";

export interface GetTeamRankType {
  ranking: number;
  shortNameKr: string;
  overallMatches: number;
  overallMatchesWon: number;
  overallMatchesDrawn: number;
  overallMatchesLost: number;
  overallPoints: number;
  overallGoalDifference: number;
}

export interface GetTeamRankResultType {
  overall_teamrank: Array<GetTeamRankType>;
}

export const getTeamRank = () => `/api/${API_VERSION}/main/teamrank`;
