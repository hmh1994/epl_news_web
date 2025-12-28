import type { ApiRequestOptions } from "@/shared/api/client";
import { API_VERSION } from "@/shared/config/api-version";

export const API_ROOT = `/api/${API_VERSION}`;

export type RequestOptions = Pick<
  ApiRequestOptions,
  "cache" | "signal" | "headers"
>;

export const leaguePath = (leagueId: string, suffix: string) =>
  `${API_ROOT}/leagues/${leagueId}${suffix}`;

export const teamPath = (teamId: string, suffix: string) =>
  `${API_ROOT}/teams/${teamId}${suffix}`;
