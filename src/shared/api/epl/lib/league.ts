import { apiClient } from "@/shared/api/client";
import type { PremiumTableResponse } from "@/shared/api/epl/model/types";
import { leaguePath, RequestOptions } from "./base";

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
    const result = await apiClient.get<PremiumTableResponse>(
      leaguePath(leagueId, "/teams"),
      {
        ...options,
        params: {
          season: params?.season,
          locale: params?.locale,
        },
      }
    );
    return result;
  } catch (error) {
    console.warn(
      "[fetchPremiumTable] Falling back to mock data due to request failure",
      error
    );
    throw error;
  }
};
