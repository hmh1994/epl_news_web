import { apiClient } from "@/src/shared/api-client";

export interface TeamRankType {
  rank: number;
  nameEn: string;
  nakeKr: string;
  shortNameEn: string;
  shortNameKr: string;
  teamId: string;
  matches: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
  teamLogo: string;
}

export interface TeamRanksType {
  teamRank: Array<TeamRankType>;
}

export const getTeamRank = async () => {
  try {
    const result = await apiClient.get<TeamRanksType>("/api/v1/teams/rank");
    return result;
  } catch (e) {
    console.error(e);
    return {
      teamRank: [],
    };
  }
};
