import { apiClient } from "@/src/shared/api-client";

export interface MatchType {
  id: string;
  kickoffTime: string;
  homeTeamId: string;
  homeTeamEn: string;
  homeTeamKr: string;
  shortHomeTeamEn: string;
  shortHomeTeamKr: string;
  homeTeamImg: string;
  homeTeamScore: number;
  awayTeamId: string;
  awayTeamEn: string;
  awayTeamKr: string;
  shortAwayTeamEn: string;
  shortAwayTeamKr: string;
  awayTeamImg: string;
  awayTeamScore: number;
}

export interface MatchsScheduleType {
  [date: string]: MatchType[];
}

export const getMatchByRange = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}): Promise<MatchsScheduleType> => {
  try {
    const result = await apiClient.get<MatchsScheduleType>(
      `/api/v1/match/${startDate}/${endDate}`
    );
    return result;
  } catch (e) {
    console.error(e);
    return {};
  }
};
