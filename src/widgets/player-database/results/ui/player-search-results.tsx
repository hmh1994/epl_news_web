"use client";

import React from "react";
import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { PlayerGridCard } from "@/entities/player/ui/player-grid-card";
import { PlayerListItem } from "@/entities/player/ui/player-list-item";
import { ViewMode } from "@/features/player-database/types";

type PlayerSearchResultsProps = {
  players: PlayerDatabaseEntry[];
  viewMode: ViewMode;
  selectedPlayers: PlayerDatabaseEntry[];
  onSelect: (player: PlayerDatabaseEntry) => void;
  onView: (player: PlayerDatabaseEntry) => void;
  canSelect: (isSelected: boolean) => boolean;
};

export const PlayerSearchResults = ({
  players,
  viewMode,
  selectedPlayers,
  onSelect,
  onView,
  canSelect,
}: PlayerSearchResultsProps) => {
  if (players.length === 0) {
    return (
      <div className='text-center py-20'>
        <div className='text-6xl mb-4'>🔍</div>
        <h3 className='text-2xl font-bold text-white mb-2'>검색 결과가 없습니다</h3>
        <p className='text-slate-400'>검색어 또는 필터를 변경해보세요</p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {players.map((player) => {
          const isSelected = selectedPlayers.some((item) => item.id === player.id);
          return (
            <PlayerGridCard
              key={player.id}
              player={player}
              isSelected={isSelected}
              onSelect={onSelect}
              onView={onView}
              showSelection={canSelect(isSelected)}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {players.map((player) => (
        <PlayerListItem key={player.id} player={player} onView={onView} />
      ))}
    </div>
  );
};
