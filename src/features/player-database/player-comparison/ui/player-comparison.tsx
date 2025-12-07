"use client";

import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { BarChart3, ArrowRight } from "lucide-react";
import { TEAMS_BY_ID } from "@/shared/mocks/data/teams";
import { PlayerComparisonMatrix } from "./player-comparison-matrix";
import { useTranslations } from "next-intl";

interface PlayerComparisonProps {
  players: PlayerDatabaseEntry[];
  showComparison: boolean;
  onToggle: () => void;
  onClear: () => void;
}

export const PlayerComparison = ({
  players,
  showComparison,
  onToggle,
  onClear,
}: PlayerComparisonProps) => {
  const t = useTranslations("player.comparison.panel");
  if (players.length < 2) return null;
  const selectedLabel = t("selectedCount", { count: players.length, limit: 3 });
  const toggleLabel = showComparison ? t("hideButton") : t("showButton");

  return (
    <div className='fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-3xl border-t border-white/10 shadow-2xl'>
      <div className='max-w-7xl mx-auto px-6 py-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='flex items-center gap-3'>
            <BarChart3 className='w-6 h-6 text-emerald-400' />
            <div>
              <h3 className='text-xl font-bold text-white'>{t("title")}</h3>
              <span className='text-slate-400 text-sm'>{selectedLabel}</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button
              type='button'
              onClick={onToggle}
              className='px-6 py-3 bg-[#169976] hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center gap-2'
            >
              <span>{toggleLabel}</span>
              <ArrowRight className='w-4 h-4' />
            </button>
            <button
              type='button'
              onClick={onClear}
              className='px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors'
            >
              {t("clearButton")}
            </button>
          </div>
        </div>

        <div className='flex items-center gap-3 mt-4 overflow-x-auto pb-2'>
          {players.map((player) => {
            const team = TEAMS_BY_ID[player.teamId];
            return (
              <div
                key={`chip-${player.id}`}
                className='flex items-center gap-3 bg-slate-800/60 border border-white/10 rounded-2xl px-4 py-3 min-w-[200px]'
              >
                <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-[#169976] to-teal-500 flex items-center justify-center text-lg'>
                  {player.photo}
                </div>
                <div>
                  <div className='text-white font-semibold text-sm'>{player.name}</div>
                  <div className='text-xs text-slate-400'>
                    {(team?.name ?? player.teamId.toUpperCase())} • {player.position}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {showComparison && (
          <div className='mt-6'>
            <PlayerComparisonMatrix players={players} />
          </div>
        )}
      </div>
    </div>
  );
};
