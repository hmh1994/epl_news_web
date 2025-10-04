"use client";

import React, { useMemo, useState } from "react";
import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import {
  PLAYER_DATABASE,
  PLAYER_POSITIONS,
  PLAYER_TEAMS,
} from "@/shared/mocks/player-database";
import {
  PlayerFilter,
  PlayerFilterType,
  ViewMode,
} from "@/features/player-database/types";
import { PlayerDatabaseHeader } from "@/features/player-database/header/ui/player-database-header";
import { PlayerSearchControls } from "@/features/player-database/search/ui/player-search-controls";
import { PlayerGridCard } from "@/entities/player/ui/player-grid-card";
import { PlayerListItem } from "@/entities/player/ui/player-list-item";
import { PlayerDetail } from "@/features/player-database/player-detail/ui/player-detail";
import { PlayerComparison } from "@/features/player-database/player-comparison/ui/player-comparison";

const HERO_STATS = [
  { label: "등록 선수", value: "120", caption: "현재 데이터베이스" },
  { label: "평균 득점", value: "8.6", caption: "모든 선수 기준" },
  { label: "톱 레이팅", value: "9.2", caption: "최고 평점" },
  { label: "평균 가치", value: "€68M", caption: "시장 가치" },
] as const;

const COMPARISON_LIMIT = 3;

export const PlayerDatabaseWidget = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>(
    PLAYER_POSITIONS[0]
  );
  const [selectedTeam, setSelectedTeam] = useState<string>(PLAYER_TEAMS[0]);
  const [activeFilters, setActiveFilters] = useState<PlayerFilter[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerDatabaseEntry[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [detailPlayer, setDetailPlayer] =
    useState<PlayerDatabaseEntry | null>(null);

  const filteredPlayers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return PLAYER_DATABASE.filter((player) => {
      const matchesSearch = player.name.toLowerCase().includes(term);
      const matchesPosition =
        selectedPosition === "all" || player.position.includes(selectedPosition);
      const matchesTeam = selectedTeam === "all" || player.team === selectedTeam;
      return matchesSearch && matchesPosition && matchesTeam;
    });
  }, [searchTerm, selectedPosition, selectedTeam]);

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
      setSelectedPosition(PLAYER_POSITIONS[0]);
    }
    if (filter.type === "team") {
      setSelectedTeam(PLAYER_TEAMS[0]);
    }
  };

  const handleClearFilters = () => {
    setActiveFilters([]);
    setSelectedPosition(PLAYER_POSITIONS[0]);
    setSelectedTeam(PLAYER_TEAMS[0]);
    setSearchTerm("");
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
      <PlayerDatabaseHeader />

      <section className='relative pt-28 pb-16 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900'></div>
        <div className='absolute inset-0 opacity-20'>
          <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
          <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
        </div>

        <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
          <h1 className='text-6xl md:text-7xl font-black mb-6 leading-tight'>
            <span className='bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent'>
              Player
            </span>
            <br />
            <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
              Database
            </span>
          </h1>
          <p className='text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed'>
            프리미어리그 최고의 선수들을 검색하고 비교해보세요
          </p>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12'>
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10'
              >
                <div className='text-3xl font-black text-white mb-2'>{stat.value}</div>
                <div className='text-slate-400 text-sm'>{stat.label}</div>
                <div className='text-slate-500 text-xs mt-1'>{stat.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className='max-w-7xl mx-auto px-6'>
        <PlayerSearchControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedPosition={selectedPosition}
          onPositionChange={handlePositionChange}
          selectedTeam={selectedTeam}
          onTeamChange={handleTeamChange}
          positionOptions={PLAYER_POSITIONS}
          teamOptions={PLAYER_TEAMS}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFilters={activeFilters}
          onFilterRemove={handleFilterRemove}
          onClearFilters={handleClearFilters}
        />

        <div className='flex items-center justify-between mb-8'>
          <h2 className='text-2xl font-bold text-white'>
            {filteredPlayers.length} Players Found
          </h2>
          {selectedPlayers.length > 0 && (
            <div className='text-emerald-400 font-semibold'>
              {selectedPlayers.length} selected for comparison
            </div>
          )}
        </div>

        {viewMode === "grid" ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {filteredPlayers.map((player) => {
              const isSelected = selectedPlayers.some(
                (item) => item.id === player.id
              );
              return (
                <PlayerGridCard
                  key={player.id}
                  player={player}
                  isSelected={isSelected}
                  onSelect={handlePlayerSelect}
                  onView={setDetailPlayer}
                  showSelection={isSelectable(isSelected)}
                />
              );
            })}
          </div>
        ) : (
          <div className='space-y-4'>
            {filteredPlayers.map((player) => (
              <PlayerListItem
                key={player.id}
                player={player}
                onView={setDetailPlayer}
              />
            ))}
          </div>
        )}

        {filteredPlayers.length === 0 && (
          <div className='text-center py-20'>
            <div className='text-6xl mb-4'>🔍</div>
            <h3 className='text-2xl font-bold text-white mb-2'>
              검색 결과가 없습니다
            </h3>
            <p className='text-slate-400'>검색어 또는 필터를 변경해보세요</p>
          </div>
        )}
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
