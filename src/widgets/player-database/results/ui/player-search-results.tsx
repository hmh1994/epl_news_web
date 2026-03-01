"use client";

import React from "react";
import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { PlayerGridCard } from "@/entities/player/ui/player-grid-card";
import { PlayerListItem } from "@/entities/player/ui/player-list-item";
import { ViewMode } from "@/features/player-database/types";
import { useTeams } from "@/shared/providers/teams-provider";
import { useTranslations } from "next-intl";

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
  const teamsById = useTeams();
  const t = useTranslations("player.results");
  if (players.length === 0) {
    return (
      <div className='text-center py-16 rounded-3xl border border-white/10 bg-slate-950/50'>
        <div className='text-5xl mb-4'>🔍</div>
        <h3 className='text-xl font-semibold text-white mb-2'>{t("emptyTitle")}</h3>
        <p className='text-slate-400'>{t("emptyDescription")}</p>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {players.map((player) => {
          const isSelected = selectedPlayers.some((item) => item.id === player.id);
          const team = teamsById[player.teamId];
          const teamName = player.teamName ?? team?.name ?? player.teamId;
          return (
            <PlayerGridCard
              key={player.id}
              player={player}
              isSelected={isSelected}
              onSelect={onSelect}
              onView={onView}
              showSelection={canSelect(isSelected)}
              teamName={teamName}
              teamCrest={team?.crest ?? "⚽"}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {players.map((player) => {
        const team = teamsById[player.teamId];
        const teamName = player.teamName ?? team?.name ?? player.teamId;
        return (
          <PlayerListItem
            key={player.id}
            player={player}
            onView={onView}
            teamName={teamName}
          />
        );
      })}
    </div>
  );
};
