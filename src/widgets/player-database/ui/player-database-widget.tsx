"use client";

import React, { useMemo, useState } from "react";
import { Activity, Award, Target, Users } from "lucide-react";
import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import {
  PlayerFilter,
  PlayerFilterType,
  ViewMode,
} from "@/features/player-database/types";
import { PlayerSearchControls } from "@/features/player-database/search/ui/player-search-controls";
import { PlayerDetail } from "@/features/player-database/player-detail/ui/player-detail";
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
}

export const PlayerDatabaseWidget = ({
  players,
  positions,
  teams,
}: PlayerDatabaseWidgetProps) => {
  const defaultPosition = positions[0] ?? "all";
  const defaultTeam = teams[0] ?? "all";
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>(defaultPosition);
  const [selectedTeam, setSelectedTeam] = useState<string>(defaultTeam);
  const [activeFilters, setActiveFilters] = useState<PlayerFilter[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerDatabaseEntry[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<PlayerDatabaseEntry[]>([]);
  const [detailPlayer, setDetailPlayer] =
    useState<PlayerDatabaseEntry | null>(null);

  const showSearchResults = hasSearched;

  const getOverallRating = (player: PlayerDatabaseEntry) => {
    const { pace, shooting, passing, dribbling, defending, physical } =
      player.stats;
    return Math.round(
      (pace + shooting + passing + dribbling + defending + physical) / 6
    );
  };

  const rankingGroups = [
    {
      id: "goals",
      label: "득점 랭킹",
      metricLabel: "골",
      icon: Target,
      accent: "text-emerald-300",
      getValue: (player: PlayerDatabaseEntry) => player.goals,
    },
    {
      id: "assists",
      label: "도움 랭킹",
      metricLabel: "도움",
      icon: Users,
      accent: "text-teal-300",
      getValue: (player: PlayerDatabaseEntry) => player.assists,
    },
    {
      id: "involvements",
      label: "공격 포인트",
      metricLabel: "포인트",
      icon: Activity,
      accent: "text-orange-300",
      getValue: (player: PlayerDatabaseEntry) => player.goals + player.assists,
    },
    {
      id: "overall",
      label: "종합 능력치",
      metricLabel: "OVR",
      icon: Award,
      accent: "text-yellow-300",
      getValue: (player: PlayerDatabaseEntry) => getOverallRating(player),
    },
  ];

  const handleSearchSubmit = async () => {
    setIsSearching(true);
    setSearchError(null);
    setHasSearched(true);
    setSearchResults([]);

    const params = new URLSearchParams();
    if (searchTerm.trim()) {
      params.set("search", searchTerm.trim());
    }
    if (selectedPosition !== "all") {
      params.set("position", selectedPosition);
    }
    if (selectedTeam !== "all") {
      params.set("team", selectedTeam);
    }

    try {
      const response = await fetch(`/api/players?${params.toString()}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("failed");
      }
      const data = (await response.json()) as { players: PlayerDatabaseEntry[] };
      setSearchResults(data.players ?? []);
    } catch (error) {
      setSearchError("선수 데이터를 불러오지 못했습니다. 다시 시도해주세요.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
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

  const isSelectable = (isSelected: boolean) =>
    isSelected || selectedPlayers.length < COMPARISON_LIMIT;

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
            TEAMS_BY_ID[teamId]?.name ?? teamId.toUpperCase()
          }
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFilters={activeFilters}
          onFilterRemove={handleFilterRemove}
          onClearFilters={handleClearFilters}
          onSearchSubmit={handleSearchSubmit}
          isSearching={isSearching}
        >
          {showSearchResults ? (
            <>
              {searchError && (
                <div className='mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
                  {searchError}
                </div>
              )}

              {isSearching ? (
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
                    onView={setDetailPlayer}
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
              const rankedPlayers = [...players]
                .sort(
                  (a, b) =>
                    group.getValue(b) - group.getValue(a) ||
                    a.name.localeCompare(b.name)
                )
                .slice(0, 5);

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
                      const team = TEAMS_BY_ID[player.teamId];
                      return (
                        <div
                          key={player.id}
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
                                {team?.name ?? player.teamId.toUpperCase()} •{" "}
                                {player.position}
                              </div>
                            </div>
                          </div>
                          <div className='text-right'>
                            <div
                              className={`text-lg font-bold ${group.accent}`}
                            >
                              {group.getValue(player)}
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

      <PlayerDetail player={detailPlayer} onClose={() => setDetailPlayer(null)} />

      <PlayerComparison
        players={selectedPlayers}
        showComparison={showComparison}
        onToggle={handleComparisonToggle}
        onClear={handleComparisonClear}
      />
    </div>
  );
};
