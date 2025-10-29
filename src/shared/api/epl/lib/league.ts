import { apiClient } from "@/shared/api/client";
import type {
  HubOverviewResponse,
  LeagueMetaResponse,
  LeagueMetadataResponse,
  LeagueStandingsResponse,
  PremiumTableResponse,
} from "@/shared/api/epl/model/types";
import { leaguePath, RequestOptions } from "./base";

export interface LeagueMetadataParams {
  season?: string;
  locale?: string;
}

export const fetchLeagueMetadata = async (
  leagueId: string,
  params?: LeagueMetadataParams,
  options?: RequestOptions
): Promise<LeagueMetadataResponse> => {
  return apiClient.get<LeagueMetadataResponse>(
    leaguePath(leagueId, "/metadata"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
      },
    }
  );
};

export interface LeagueStandingsParams {
  season?: string;
  locale?: string;
  includeAdvanced?: boolean;
}

export const fetchLeagueStandings = async (
  leagueId: string,
  params?: LeagueStandingsParams,
  options?: RequestOptions
): Promise<LeagueStandingsResponse> => {
  return apiClient.get<LeagueStandingsResponse>(
    leaguePath(leagueId, "/standings"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        includeAdvanced: params?.includeAdvanced,
      },
    }
  );
};

export interface LeagueMetaParams {
  season?: string;
  locale?: string;
}

export const fetchLeagueMeta = async (
  leagueId: string,
  params?: LeagueMetaParams,
  options?: RequestOptions
): Promise<LeagueMetaResponse> => {
  return apiClient.get<LeagueMetaResponse>(leaguePath(leagueId, "/meta"), {
    ...options,
    params: {
      season: params?.season,
      locale: params?.locale,
    },
  });
};

export interface HubOverviewParams {
  season?: string;
  locale?: string;
  limitFixtures?: number;
  limitRankings?: number;
}

export const fetchHubOverview = async (
  leagueId: string,
  params?: HubOverviewParams,
  options?: RequestOptions
): Promise<HubOverviewResponse> => {
  return apiClient.get<HubOverviewResponse>(
    leaguePath(leagueId, "/hub-overview"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        limitFixtures: params?.limitFixtures,
        limitRankings: params?.limitRankings,
      },
    }
  );
};

export interface PremiumTableParams {
  season?: string;
  locale?: string;
  includeAnalytics?: boolean;
}

export const fetchPremiumTable = async (
  leagueId: string,
  params?: PremiumTableParams,
  options?: RequestOptions
): Promise<PremiumTableResponse> => {
  return apiClient.get<PremiumTableResponse>(
    leaguePath(leagueId, "/premium-table"),
    {
      ...options,
      params: {
        season: params?.season,
        locale: params?.locale,
        includeAnalytics: params?.includeAnalytics,
      },
    }
  );
};
