import { apiClient } from "@/shared/api/client";
import type { PremiumTableResponse } from "@/shared/api/epl/model/types";
import { MOCK_SEASON } from "@/shared/config/mock-api";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface PremiumTableParams {
  season?: string;
  locale?: string;
}

const MOCK_PREMIUM_TABLE: PremiumTableResponse = {
  data: [
    {
      team: { id: "1", name: "Manchester City", shortName: "MCI", logo: "🔵" },
      position: 1,
      record: { played: 38, won: 28, drawn: 5, lost: 5, goalsFor: 96, goalsAgainst: 34, goalDifference: 62, points: 89 },
      form: ["W", "W", "D", "W", "W"],
      trend: 0,
      advancedMetrics: { xG: 84.3, xGA: 31.2, possession: 68.5, passAccuracy: 91.2, cleanSheets: 18, bigChances: 127 },
    },
    {
      team: { id: "2", name: "Arsenal", shortName: "ARS", logo: "🔴" },
      position: 2,
      record: { played: 38, won: 28, drawn: 5, lost: 5, goalsFor: 91, goalsAgainst: 29, goalDifference: 62, points: 89 },
      form: ["W", "L", "W", "W", "D"],
      trend: 1,
      advancedMetrics: { xG: 82.7, xGA: 33.8, possession: 61.3, passAccuracy: 88.7, cleanSheets: 16, bigChances: 119 },
    },
    {
      team: { id: "3", name: "Liverpool", shortName: "LIV", logo: "🔴" },
      position: 3,
      record: { played: 38, won: 24, drawn: 10, lost: 4, goalsFor: 86, goalsAgainst: 41, goalDifference: 45, points: 82 },
      form: ["W", "D", "W", "W", "L"],
      trend: 2,
      advancedMetrics: { xG: 79.4, xGA: 38.9, possession: 62.1, passAccuracy: 87.9, cleanSheets: 20, bigChances: 108 },
    },
    {
      team: { id: "4", name: "Aston Villa", shortName: "AVL", logo: "🟣" },
      position: 4,
      record: { played: 38, won: 20, drawn: 8, lost: 10, goalsFor: 76, goalsAgainst: 61, goalDifference: 15, points: 68 },
      form: ["W", "W", "L", "D", "W"],
      trend: 3,
      advancedMetrics: { xG: 69.2, xGA: 58.7, possession: 54.8, passAccuracy: 82.3, cleanSheets: 11, bigChances: 89 },
    },
    {
      team: { id: "5", name: "Tottenham", shortName: "TOT", logo: "⚪" },
      position: 5,
      record: { played: 38, won: 20, drawn: 6, lost: 12, goalsFor: 74, goalsAgainst: 61, goalDifference: 13, points: 66 },
      form: ["W", "W", "L", "D", "W"],
      trend: -1,
      advancedMetrics: { xG: 71.8, xGA: 55.4, possession: 59.4, passAccuracy: 86.1, cleanSheets: 13, bigChances: 92 },
    },
  ],
  meta: {
    leagueId: "EPL",
    season: MOCK_SEASON,
    lastUpdated: Date.now(),
  },
};

export const fetchPremiumTable = async (
  leagueId: string,
  params?: PremiumTableParams,
  options?: RequestOptions
): Promise<PremiumTableResponse> => {
  try {
    const result = await apiClient.get<PremiumTableResponse>(
      leaguePath(leagueId, "/teams"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
        },
      }
    );
    return result;
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchPremiumTable] Falling back to mock data due to request failure"
    );
    return MOCK_PREMIUM_TABLE;
  }
};
