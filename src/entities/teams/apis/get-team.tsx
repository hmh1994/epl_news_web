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

export interface MatchType {
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
}

export interface TeamDetailType {
  id: string;
  nameEn: string;
  nameKr: string;
  shortNameEn: string;
  shortNameKr: string;
  teamLogo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: number;
  points: number;
  championshipSeasons: string[] | null;
  squad: PlayerType[];
  recentMatches: MatchType[];
  upcomingMatches: MatchType[] | null;
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
