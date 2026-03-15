import type { MatchDetail } from "@/entities/match/model/match-detail";
import { apiClient } from "@/shared/api/client";
import type { MatchDetailResponse } from "@/shared/api/epl/model/types";
import { leaguePath, mapLocaleToApi, RequestOptions } from "./base";

export interface MatchDetailParams {
  season?: string;
  locale?: string;
}

interface RawMatchDetailResponse {
  fixture?: MatchDetail["fixture"];
  data?: MatchDetail;
  attendance?: number;
  heroTagline?: string;
  insights?: MatchDetail["insights"];
  timeline?: MatchDetail["timeline"];
  stats?: MatchDetail["stats"];
  keyPlayers?: MatchDetail["keyPlayers"];
  formGuide?: MatchDetail["formGuide"];
  headToHead?: MatchDetail["headToHead"];
  meta?: MatchDetailResponse["meta"];
}

export const fetchMatchDetail = async (
  leagueId: string,
  matchId: string,
  params?: MatchDetailParams,
  options?: RequestOptions,
): Promise<MatchDetailResponse> => {
  const raw = await apiClient.get<RawMatchDetailResponse>(
    leaguePath(leagueId, `/matches/${matchId}`),
    {
      ...options,
      params: {
        season: params?.season,
        locale: mapLocaleToApi(params?.locale),
      },
    },
  );

  // API가 { data: MatchDetail } 형태로 응답하는 경우
  if (raw?.data?.fixture) {
    return raw as unknown as MatchDetailResponse;
  }

  // API가 { fixture, attendance, meta } 플랫 형태로 응답하는 경우
  if (raw?.fixture) {
    const detail: MatchDetail = {
      fixture: raw.fixture,
      heroTagline: raw.heroTagline ?? "",
      attendance: raw.attendance,
      insights: raw.insights ?? [],
      timeline: raw.timeline ?? [],
      stats: raw.stats ?? [],
      keyPlayers: raw.keyPlayers ?? { home: { name: "", role: "", stat: "", highlight: "", form: [] }, away: { name: "", role: "", stat: "", highlight: "", form: [] } },
      formGuide: raw.formGuide ?? { home: [], away: [] },
      headToHead: raw.headToHead ?? [],
    };
    return {
      data: detail,
      meta: raw.meta,
    } as MatchDetailResponse;
  }

  throw new Error(`[fetchMatchDetail] Invalid response for matchId: ${matchId}`);
};
