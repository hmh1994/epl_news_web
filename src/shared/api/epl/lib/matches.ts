import { apiClient } from "@/shared/api/client";
import { USE_MOCK_API, MOCK_LOCALE, MOCK_SEASON } from "@/shared/config/mock-api";
import {
  MatchDetailResponse,
  MatchScheduleAnalytics,
  MatchScheduleResponse,
} from "@/shared/api/epl/model/types";
import { API_ROOT, RequestOptions, leaguePath } from "./base";
import {
  EPL_MATCH_SCHEDULE,
  MATCHWEEK_OPTIONS,
} from "@/shared/mocks/match-schedule";
import { MATCH_DETAILS } from "@/shared/mocks/match-detail";

export interface MatchScheduleParams {
  season?: string;
  locale?: string;
  matchweek?: number;
  includeFinished?: boolean;
  includeAnalytics?: boolean;
}

export const fetchMatchSchedule = async (
  leagueId: string,
  params?: MatchScheduleParams,
  options?: RequestOptions
): Promise<MatchScheduleResponse> => {
  if (USE_MOCK_API) {
    return buildMockMatchSchedule(params);
  }

  return apiClient.get<MatchScheduleResponse>(
    leaguePath(leagueId, "/schedule"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        matchweek: params?.matchweek,
        includeFinished: params?.includeFinished,
        includeAnalytics: params?.includeAnalytics,
      },
    }
  );
};

export interface MatchDetailParams {
  locale?: string;
}

export const fetchMatchDetail = async (
  matchId: string,
  params?: MatchDetailParams,
  options?: RequestOptions
): Promise<MatchDetailResponse> => {
  if (USE_MOCK_API) {
    return buildMockMatchDetail(matchId, params);
  }

  return apiClient.get<MatchDetailResponse>(`${API_ROOT}/matches/${matchId}`, {
    ...options,
    params: {
      locale: params?.locale,
    },
  });
};

const buildScheduleAnalytics = (): MatchScheduleAnalytics => ({
  rivalryPairs: [
    { teams: ["mci", "ars"], label: "Title Rivals", intensity: 95 },
    { teams: ["liv", "mun"], label: "North West Derby", intensity: 92 },
    { teams: ["che", "tot"], label: "London Clash", intensity: 88 },
  ],
  teamPowerIndex: [
    { teamId: "mci", attack: 95, defense: 89 },
    { teamId: "ars", attack: 92, defense: 90 },
    { teamId: "liv", attack: 93, defense: 85 },
    { teamId: "tot", attack: 88, defense: 80 },
    { teamId: "che", attack: 82, defense: 81 },
  ],
  headToHead: EPL_MATCH_SCHEDULE.slice(0, 2).flatMap((day) =>
    day.fixtures.map((fixture) => ({
      fixtureKey: fixture.id,
      records: [
        {
          season: "2023/24",
          date: day.date,
          venue: fixture.venue,
          result: `${fixture.home.teamId.toUpperCase()} ${
            fixture.home.score ?? "-"
          } - ${fixture.away.score ?? "-"} ${fixture.away.teamId
            .toUpperCase()
            .trim()}`,
        },
      ],
    }))
  ),
});

const buildMockMatchSchedule = (
  params?: MatchScheduleParams
): MatchScheduleResponse => {
  const fixtures = EPL_MATCH_SCHEDULE;
  const spotlightFixtureIds = fixtures
    .flatMap((day) => day.fixtures)
    .slice(0, 3)
    .map((fixture) => fixture.id);

  return {
    data: {
      matchweeks: MATCHWEEK_OPTIONS,
      schedule: fixtures,
      spotlightFixtureIds,
      analytics: buildScheduleAnalytics(),
    },
    meta: {
      leagueId: "EPL",
      season: params?.season ?? MOCK_SEASON,
      lastUpdated: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};

const buildMockMatchDetail = (
  matchId: string,
  params?: MatchDetailParams
): MatchDetailResponse => {
  const detail = MATCH_DETAILS[matchId];

  if (!detail) {
    throw new Error(`Match detail not found: ${matchId}`);
  }

  return {
    data: detail,
    meta: {
      matchId,
      leagueId: "EPL",
      season: MOCK_SEASON,
      generatedAt: Date.now(),
      locale: params?.locale ?? MOCK_LOCALE,
    },
  };
};
