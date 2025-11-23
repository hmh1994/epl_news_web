import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type {
  LeagueStandingsRow,
  PremiumTableResponse,
} from "@/shared/api/epl/model/types";
import { leaguePath, RequestOptions } from "./base";

const {
  league: {
    premiumTable: PREMIUM_TABLE_SOURCE,
  },
  teams: { byId: TEAMS_BY_ID },
} = EPL_MOCK_DATA;

export interface PremiumTableParams {
  season?: string;
  locale?: string;
}

export const fetchPremiumTable = async (
  leagueId: string,
  params?: PremiumTableParams,
  options?: RequestOptions
): Promise<PremiumTableResponse> => {
  try {
    return await apiClient.get<PremiumTableResponse>(
      leaguePath(leagueId, "/teams"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: params?.locale,
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchPremiumTable] Falling back to mock data due to request failure",
      error
    );
    return buildMockPremiumTable(params);
  }
};

const buildMockPremiumTable = (
  params?: PremiumTableParams
): PremiumTableResponse => ({
  data: {
    standings: buildStandingsRows(),
  },
  meta: {
    leagueId: "EPL",
    season: params?.season ?? MOCK_SEASON,
    lastUpdated: Date.now(),
    locale: params?.locale ?? MOCK_LOCALE,
  },
});

const buildStandingsRows = (): LeagueStandingsRow[] =>
  PREMIUM_TABLE_SOURCE.map((entry) => {
    const team = TEAMS_BY_ID[entry.teamId];
    const fallback = entry.teamId.toUpperCase();

    return {
      team: {
        id: entry.teamId,
        name: team?.name ?? fallback,
        shortName: team?.shortName ?? fallback,
        crest: team?.crest ?? "⚽",
        city: team?.city,
        stadium: team?.stadium,
      },
      position: entry.position,
      record: {
        played: entry.played,
        won: entry.won,
        drawn: entry.drawn,
        lost: entry.lost,
        goalsFor: entry.goalsFor,
        goalsAgainst: entry.goalsAgainst,
        goalDifference: entry.goalDifference,
        points: entry.points,
      },
      form: entry.form,
      trend: entry.trend,
      advancedMetrics: {
        xG: entry.xG,
        xGA: entry.xGA,
        possession: entry.possession,
        passAccuracy: entry.passAccuracy,
        cleanSheets: entry.cleanSheets,
        bigChances: entry.bigChances,
      },
    };
  });
