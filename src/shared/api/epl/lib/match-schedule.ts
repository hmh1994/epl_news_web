import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type {
  FullMatchScheduleResponse,
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
  startDate?: string;
  endDate?: string;
}

export const fetchMatchSchedule = async (
  leagueId: string,
  params?: MatchScheduleParams,
  options?: RequestOptions
): Promise<MatchScheduleResponse> => {
  try {
    const response = await apiClient.get<MatchScheduleResponse>(
      leaguePath(leagueId, "/matches"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: mapLocaleToApi(params?.locale),
          startDate: params?.startDate,
          endDate: params?.endDate,
        },
      }
    );
    if (
      process.env.NODE_ENV !== "production" &&
      !Array.isArray(response?.data?.schedule)
    ) {
      console.warn(
        "[fetchMatchSchedule] Falling back to mock data due to unexpected response shape"
      );
      return buildMockMatchSchedule(leagueId, params);
    }
    return response;
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
): Promise<FullMatchScheduleResponse> => {
  try {
    return await apiClient.get<FullMatchScheduleResponse>(
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
    return buildMockFullMatchSchedule(leagueId);
  }
};

const buildMockMatchSchedule = (
  leagueId: string,
  params?: MatchScheduleParams
): MatchScheduleResponse => ({
  data: resolveMockSchedule(params?.startDate, params?.endDate),
  meta: {
    leagueId,
    season: params?.season ?? MOCK_SEASON,
    lastUpdated: Date.now(),
    locale: mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
  },
});

const buildMockFullMatchSchedule = (
  leagueId: string,
  params?: Omit<MatchScheduleParams, "matchweek">
): FullMatchScheduleResponse => {
  const { schedule } = resolveMockSchedule();
  return {
    data: {
      schedule,
    },
    meta: {
      leagueId,
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
    },
  };
};

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
  startDate?: string,
  endDate?: string
): MatchScheduleResponse["data"] => {
  const startDateValue = startDate ? new Date(`${startDate}T00:00:00Z`) : null;
  const endDateValue = endDate ? new Date(`${endDate}T00:00:00Z`) : null;

  const schedule = MATCH_SCHEDULE.filter((day) => {
    const dayDate = new Date(`${day.date}T00:00:00Z`);
    if (startDateValue && dayDate < startDateValue) {
      return false;
    }
    if (endDateValue && dayDate > endDateValue) {
      return false;
    }
    return true;
  });

  return {
    dateRange:
      startDate && endDate
        ? {
            startDate,
            endDate,
          }
        : undefined,
    schedule,
  };
};
