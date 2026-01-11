import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type {
  MatchScheduleResponse,
  MatchweekOption,
  MatchweekOptionsResponse,
} from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

const {
  matches: { schedule: MATCH_SCHEDULE },
} = EPL_MOCK_DATA;

export interface MatchScheduleParams {
  season?: string;
  locale?: string;
  matchweek?: number;
}

export const fetchMatchSchedule = async (
  leagueId: string,
  params?: MatchScheduleParams,
  options?: RequestOptions
): Promise<MatchScheduleResponse> => {
  try {
    return await apiClient.get<MatchScheduleResponse>(
      leaguePath(leagueId, "/matches"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
          matchweek: params?.matchweek,
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchMatchSchedule] Falling back to mock data due to request failure",
      error
    );
    return buildMockMatchSchedule(leagueId, params);
  }
};

export const fetchMatchweekOptions = async (
  leagueId: string,
  params?: Omit<MatchScheduleParams, "matchweek">,
  options?: RequestOptions
): Promise<MatchweekOptionsResponse> => {
  try {
    return await apiClient.get<MatchweekOptionsResponse>(
      leaguePath(leagueId, "/matches/matchweeks"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchMatchweekOptions] Falling back to mock data due to request failure",
      error
    );
    return {
      data: {
        matchweeks: buildMatchweekOptionsFromSchedule(),
      },
      meta: {
        leagueId,
        season: params?.season ?? MOCK_SEASON,
        lastUpdated: Date.now(),
        locale: mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
      },
    };
  }
};

export const fetchFullMatchSchedule = async (
  leagueId: string,
  params?: Omit<MatchScheduleParams, "matchweek">,
  options?: RequestOptions
): Promise<MatchScheduleResponse> => {
  try {
    return await apiClient.get<MatchScheduleResponse>(
      leaguePath(leagueId, "/matches/all"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
        },
      }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      throw error;
    }

    console.warn(
      "[fetchFullMatchSchedule] Falling back to mock data due to request failure",
      error
    );
    return buildMockMatchSchedule(leagueId);
  }
};

const buildMockMatchSchedule = (
  leagueId: string,
  params?: MatchScheduleParams
): MatchScheduleResponse => ({
  data: resolveMockSchedule(params?.matchweek),
  meta: {
    leagueId,
    season: params?.season ?? MOCK_SEASON,
    lastUpdated: Date.now(),
    locale: mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
  },
});

const buildMatchweekOptionsFromSchedule = (): MatchweekOption[] => {
  const weekMap = new Map<number, { startDate: string; endDate: string }>();

  MATCH_SCHEDULE.forEach((day) => {
    const dayDate = day.date;
    day.fixtures.forEach((fixture) => {
      const entry = weekMap.get(fixture.matchweek);
      if (!entry) {
        weekMap.set(fixture.matchweek, { startDate: dayDate, endDate: dayDate });
        return;
      }

      if (new Date(`${dayDate}T00:00:00Z`) < new Date(`${entry.startDate}T00:00:00Z`)) {
        entry.startDate = dayDate;
      }
      if (new Date(`${dayDate}T00:00:00Z`) > new Date(`${entry.endDate}T00:00:00Z`)) {
        entry.endDate = dayDate;
      }
    });
  });

  return Array.from(weekMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([matchweek, range]) => ({
      matchweek,
      startDate: range.startDate,
      endDate: range.endDate,
    }));
};

const resolveMockSchedule = (
  matchweek?: number
): MatchScheduleResponse["data"] => {
  const matchweekOptions = buildMatchweekOptionsFromSchedule();
  const matchweeks = matchweekOptions.map((option) => option.matchweek);

  if (!matchweek) {
    return {
      matchweeks,
      schedule: MATCH_SCHEDULE,
    };
  }

  const schedule = MATCH_SCHEDULE.map((day) => ({
    ...day,
    fixtures: day.fixtures.filter((fixture) => fixture.matchweek === matchweek),
  })).filter((day) => day.fixtures.length > 0);

  return {
    matchweeks,
    schedule,
  };
};
