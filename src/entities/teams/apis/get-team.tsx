import { apiClient } from "@/src/shared/api-client";

export interface PlayerType {
  playerId: string;
  number: number;
  displayNameEn: string;
  displayNameKr: string;
  position: string;
  nationalTeam: string;
  age: number;
  birthCountryEn: string;
  birthCountryFlagIconUrl: string;
  photoUrl: string;
}

export interface TeamMatchType {
  id: string;
  kickoffTime: string;
  homeTeamId: string;
  homeTeamNameEn: string;
  homeTeamNameKr: string;
  awayTeamId: string;
  awayTeamNameEn: string;
  awayTeamNameKr: string;
  homeTeamScore: number;
  awayTeamScore: number;
  side: string;
  result: string;
}

export interface TeamDetailType {
  id: string;
  nameEn: string;
  nameKr: string;
  shortNameEn: string;
  shortNameKr: string;
  teamLogo: string;
  cityNameEn: string;
  cityNameKr: string;
  groundNameEn: string;
  groundNameKr: string;
  groundCapacity: number;
  championshipSeasons: string[] | null;
  squad: PlayerType[];
  recentMatches: TeamMatchType[];
  upcomingMatches: TeamMatchType[] | null;
  seasonStat: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    gd: number;
    points: number;
  };
}

export const getTeam = async ({ teamId }: { teamId: string }) => {
  try {
    const result = await apiClient.get<TeamDetailType>(
      `/api/v1/teams/info/${teamId}`
    );
    return result;
  } catch (e) {
    console.error(e);
    return {
      id: null,
    };
  }
};
