import type { ApiResourceResponse, ApiResponseMeta } from "./types";

/**
 * Season analytics cards surface league-level KPI deltas.
 * `value`는 절대 지표(예: 총 득점), `delta`는 이전 기간 대비 변동값을 의미합니다.
 */
export interface SeasonAnalyticsMetric {
  id: string;
  key: string;
  title: string;
  value: string;
  /** API가 숫자(예: 8.2) 또는 문자열(예: "+8.2%") 둘 다 반환할 수 있습니다. */
  delta: string | number;
  description?: string;
}

export interface SeasonAnalyticsResponse
  extends ApiResourceResponse<SeasonAnalyticsMetric[]> {
  meta: ApiResponseMeta & {
    leagueId: string;
    season: string;
    generatedAt: number;
  };
}
