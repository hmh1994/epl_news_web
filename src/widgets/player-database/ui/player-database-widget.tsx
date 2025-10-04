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
import { PlayerDetail } from "@/features/player-database/player-detail/ui/player-detail";
import { PlayerComparison } from "@/features/player-database/player-comparison/ui/player-comparison";
import { PlayerDatabaseHero } from "@/widgets/player-database/hero/ui/player-database-hero";
import { PlayerResultsSummary } from "@/widgets/player-database/summary/ui/player-results-summary";
import { PlayerSearchResults } from "@/widgets/player-database/results/ui/player-search-results";
import { COMPARISON_LIMIT } from "@/widgets/player-database/model/constants";

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

      <PlayerDatabaseHero />

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

        <PlayerResultsSummary
          totalPlayers={filteredPlayers.length}
          selectedCount={selectedPlayers.length}
        />

        <PlayerSearchResults
          players={filteredPlayers}
          viewMode={viewMode}
          selectedPlayers={selectedPlayers}
          onSelect={handlePlayerSelect}
          onView={setDetailPlayer}
          canSelect={isSelectable}
        />
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
