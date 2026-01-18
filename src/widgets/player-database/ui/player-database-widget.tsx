"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Activity, Award, Target, Users } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { PlayerRanking } from "@/entities/player/model/player-ranking";
import {
  PlayerFilter,
  PlayerFilterType,
  ViewMode,
} from "@/features/player-database/types";
import { PlayerSearchControls } from "@/features/player-database/search/ui/player-search-controls";
import { PlayerComparison } from "@/features/player-database/player-comparison/ui/player-comparison";
import { PlayerDatabaseHero } from "@/widgets/player-database/hero/ui/player-database-hero";
import { PlayerResultsSummary } from "@/widgets/player-database/summary/ui/player-results-summary";
import { PlayerSearchResults } from "@/widgets/player-database/results/ui/player-search-results";
import { COMPARISON_LIMIT } from "@/widgets/player-database/model/constants";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";

interface PlayerDatabaseWidgetProps {
  players: PlayerDatabaseEntry[];
  positions: readonly string[];
  teams: readonly string[];
  teamNameById?: Record<string, string>;
  rankingData: Record<"goal" | "assist" | "point" | "xg", PlayerRanking[]>;
  initialSearch?: {
    searchTerm?: string;
    position?: string;
    teamId?: string;
    results?: PlayerDatabaseEntry[];
  };
}

export const PlayerDatabaseWidget = ({
  players,
  positions,
  teams,
  teamNameById,
  rankingData,
  initialSearch,
}: PlayerDatabaseWidgetProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, locale] = pathname?.split("/") ?? [];
  const basePath = locale ? `/${locale}` : "";
  const defaultPosition = positions[0] ?? "all";
  const defaultTeam = teams[0] ?? "all";
  const initialPosition =
    initialSearch?.position && positions.includes(initialSearch.position)
      ? initialSearch.position
      : defaultPosition;
  const initialTeam =
    initialSearch?.teamId && teams.includes(initialSearch.teamId)
      ? initialSearch.teamId
      : defaultTeam;
  const [isPending, startTransition] = useTransition();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState(initialSearch?.searchTerm ?? "");
  const [selectedPosition, setSelectedPosition] =
    useState<string>(initialPosition);
  const [selectedTeam, setSelectedTeam] = useState<string>(initialTeam);
  const [activeFilters, setActiveFilters] = useState<PlayerFilter[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerDatabaseEntry[]>(
    []
  );
  const [showComparison, setShowComparison] = useState(false);
  const [hasSearched, setHasSearched] = useState(
    Boolean(
      initialSearch?.searchTerm ||
        initialSearch?.position ||
        initialSearch?.teamId
    )
  );
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<PlayerDatabaseEntry[]>(
    initialSearch?.results ?? []
  );

  const showSearchResults = hasSearched;

  const rankingGroups = [
    {
      id: "goal",
      label: "득점 랭킹",
      metricLabel: "골",
      icon: Target,
      accent: "text-emerald-300",
      getValue: (player: PlayerRanking) => player.goals,
    },
    {
      id: "assist",
      label: "도움 랭킹",
      metricLabel: "도움",
      icon: Users,
      accent: "text-teal-300",
      getValue: (player: PlayerRanking) => player.assists,
    },
    {
      id: "point",
      label: "공격 포인트",
      metricLabel: "포인트",
      icon: Activity,
      accent: "text-orange-300",
      getValue: (player: PlayerRanking) => player.points,
    },
    {
      id: "xg",
      label: "xG 랭킹",
      metricLabel: "xG",
      icon: Award,
      accent: "text-yellow-300",
      getValue: (player: PlayerRanking) => player.xg,
    },
  ] as const;

  const resolveTeamLabel = (player: PlayerDatabaseEntry | PlayerRanking) =>
    player.teamName ??
    teamNameById?.[player.teamId] ??
    TEAMS_BY_ID[player.teamId]?.name ??
    player.teamId;

  const handleSearchSubmit = () => {
    setSearchError(null);
    setHasSearched(true);

    const params = new URLSearchParams(searchParams?.toString());
    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    } else {
      params.delete("search");
    }

    if (selectedPosition !== "all") {
      params.set("position", selectedPosition);
    } else {
      params.delete("position");
    }

    if (selectedTeam !== "all") {
      params.set("teamId", selectedTeam);
    } else {
      params.delete("teamId");
    }

    startTransition(() => {
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  const updateFilters = (type: PlayerFilterType, value: string) => {
    setActiveFilters((prev) => {
      const others = prev.filter((filter) => filter.type !== type);
      if (value === "all") {
        return others;
      }
      return [...others, { type, value }];
    });
  };

  const handlePositionChange = (value: string) => {
    setSelectedPosition(value);
    updateFilters("position", value);
  };

  const handleTeamChange = (value: string) => {
    setSelectedTeam(value);
    updateFilters("team", value);
  };

  const handleFilterRemove = (filter: PlayerFilter) => {
    setActiveFilters((prev) => prev.filter((item) => item !== filter));
    if (filter.type === "position") {
      setSelectedPosition(defaultPosition);
    }
    if (filter.type === "team") {
      setSelectedTeam(defaultTeam);
    }
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setSelectedPosition(defaultPosition);
    setSelectedTeam(defaultTeam);
    setSearchTerm("");
    setHasSearched(false);
    setSearchResults([]);
    setSearchError(null);

    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  const handlePlayerSelect = (player: PlayerDatabaseEntry) => {
    setSelectedPlayers((prev) => {
      if (prev.some((item) => item.id === player.id)) {
        return prev.filter((item) => item.id !== player.id);
      }
      if (prev.length >= COMPARISON_LIMIT) {
        return prev;
      }
      return [...prev, player];
    });
  };

  const handleComparisonToggle = () => {
    setShowComparison((prev) => !prev);
  };

  const handleComparisonClear = () => {
    setSelectedPlayers([]);
    setShowComparison(false);
  };

  const handlePlayerView = (player: PlayerDatabaseEntry) => {
    router.push(`${basePath}/players/${player.id}`);
  };

  const isSelectable = (isSelected: boolean) =>
    isSelected || selectedPlayers.length < COMPARISON_LIMIT;

  useEffect(() => {
    setSearchTerm(initialSearch?.searchTerm ?? "");
    setSelectedPosition(initialPosition);
    setSelectedTeam(initialTeam);
    setSearchResults(initialSearch?.results ?? []);
    setHasSearched(
      Boolean(
        initialSearch?.searchTerm ||
          initialSearch?.position ||
          initialSearch?.teamId
      )
    );
    setSearchError(null);
    setActiveFilters(() => {
      const filters: PlayerFilter[] = [];
      if (initialPosition !== "all") {
        filters.push({ type: "position", value: initialPosition });
      }
      if (initialTeam !== "all") {
        filters.push({ type: "team", value: initialTeam });
      }
      return filters;
    });
  }, [
    defaultPosition,
    defaultTeam,
    initialSearch?.position,
    initialSearch?.results,
    initialSearch?.searchTerm,
    initialSearch?.teamId,
    initialPosition,
    initialTeam,
    positions,
    teams,
  ]);

  return (
    <div className='min-h-screen bg-slate-950 text-white pb-32'>
      <PlayerDatabaseHero />

      <main className='max-w-7xl mx-auto px-6 mt-12 lg:mt-16'>
        <PlayerSearchControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedPosition={selectedPosition}
          onPositionChange={handlePositionChange}
          selectedTeam={selectedTeam}
          onTeamChange={handleTeamChange}
          positionOptions={positions}
          teamOptions={teams}
          formatTeamOption={(teamId) =>
            teamNameById?.[teamId] ?? TEAMS_BY_ID[teamId]?.name ?? teamId
          }
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFilters={activeFilters}
          onFilterRemove={handleFilterRemove}
          onClearFilters={handleClearFilters}
          onSearchSubmit={handleSearchSubmit}
          isSearching={isPending}
        >
          {showSearchResults ? (
            <>
              {searchError && (
                <div className='mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
                  {searchError}
                </div>
              )}

              {isPending ? (
                <div className='rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-10 text-center text-slate-300'>
                  선수 데이터를 불러오는 중입니다...
                </div>
              ) : (
                <>
                  <PlayerResultsSummary
                    totalPlayers={searchResults.length}
                    selectedCount={selectedPlayers.length}
                  />

                  <PlayerSearchResults
                    players={searchResults}
                    viewMode={viewMode}
                    selectedPlayers={selectedPlayers}
                    onSelect={handlePlayerSelect}
                    onView={handlePlayerView}
                    canSelect={isSelectable}
                  />
                </>
              )}
            </>
          ) : (
            <div className='rounded-2xl border border-dashed border-white/10 bg-slate-900/40 px-6 py-10 text-center text-slate-400'>
              검색어나 필터를 설정하면 아래에 선수 리스트가 확장됩니다.
            </div>
          )}
        </PlayerSearchControls>

        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold text-white'>
                선수 랭킹 하이라이트
              </h2>
              <p className='text-slate-400 text-sm'>
                전체 선수 리스트 대신 지표별 상위 선수를 먼저 확인하세요.
              </p>
            </div>
            <div className='rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200'>
              총 {players.length}명
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {rankingGroups.map((group) => {
              const Icon = group.icon;
              const rankedPlayers = rankingData[group.id] ?? [];

              return (
                <div
                  key={group.id}
                  className='bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl'
                >
                  <div className='flex items-center justify-between mb-5'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 rounded-xl bg-emerald-500/10 border border-emerald-400/30'>
                        <Icon className={`w-5 h-5 ${group.accent}`} />
                      </div>
                      <div>
                        <h3 className='text-lg font-bold text-white'>
                          {group.label}
                        </h3>
                        <p className='text-xs text-slate-400'>상위 5명</p>
                      </div>
                    </div>
                    <span className='text-xs text-slate-500'>EPL</span>
                  </div>

                  <div className='space-y-3'>
                    {rankedPlayers.map((player, index) => {
                      return (
                        <div
                          key={`${player.name}-${player.teamId}`}
                          className='flex items-center justify-between rounded-2xl border border-white/5 bg-slate-800/40 px-4 py-3'
                        >
                          <div className='flex items-center gap-3'>
                            <div className='h-9 w-9 rounded-xl bg-slate-900/70 border border-white/10 flex items-center justify-center text-sm font-bold text-white'>
                              {index + 1}
                            </div>
                            <div>
                              <div className='text-white font-semibold'>
                                {player.name}
                              </div>
                              <div className='text-xs text-slate-400'>
                                {resolveTeamLabel(player)}
                              </div>
                            </div>
                          </div>
                          <div className='text-right'>
                            <div
                              className={`text-lg font-bold ${group.accent}`}
                            >
                              {group.id === "xg"
                                ? group.getValue(player).toFixed(2)
                                : group.getValue(player)}
                            </div>
                            <div className='text-xs text-slate-500'>
                              {group.metricLabel}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <PlayerComparison
        players={selectedPlayers}
        showComparison={showComparison}
        onToggle={handleComparisonToggle}
        onClear={handleComparisonClear}
      />
    </div>
  );
};
