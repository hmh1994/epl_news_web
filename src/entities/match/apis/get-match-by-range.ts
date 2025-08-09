import { apiClient } from "@/src/shared/api-client";

export interface MatchTeamType {
  id: string;
  nameEn: string;
  nameKr: string;
  shortNameEn: string;
  shortNameKr: string;
  iconUrl: string;
  score: number;
}

export interface MatchType {
  id: string;
  kickoffTime: string;
  groundEn: string;
  groundKr: string;
  homeTeam: MatchTeamType;
  awayTeam: MatchTeamType;
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
