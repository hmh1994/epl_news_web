import { apiClient } from "@/shared/api/client";
import { MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import { EPL_MOCK_DATA } from "@/shared/mocks/epl-data";
import type { MatchScheduleResponse } from "@/shared/api/epl/model/types";
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
  options?: RequestOptions,
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
      },
    );
    if (
      process.env.NODE_ENV !== "production" &&
      !Array.isArray(response?.data?.schedule)
    ) {
      console.warn(
        "[fetchMatchSchedule] Falling back to mock data due to unexpected response shape",
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
      error,
    );
    return buildMockMatchSchedule(leagueId, params);
  }
};

const buildMockMatchSchedule = (
  leagueId: string,
  params?: MatchScheduleParams,
): MatchScheduleResponse => ({
  data: resolveMockSchedule(params?.startDate, params?.endDate),
  meta: {
    leagueId,
    season: params?.season ?? MOCK_SEASON,
    lastUpdated: Date.now(),
    locale: mapLocaleToApi(params?.locale) ?? MOCK_LOCALE,
  },
});

const resolveMockSchedule = (
  startDate?: string,
  endDate?: string,
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
