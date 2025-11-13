"use client";

import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { useTranslations } from "next-intl";

interface PlayerListItemProps {
  player: PlayerDatabaseEntry;
  onView: (player: PlayerDatabaseEntry) => void;
  teamName: string;
}

export const PlayerListItem = ({ player, onView, teamName }: PlayerListItemProps) => {
  const t = useTranslations("player.listItem");
  const ageLabel = t("age", { age: player.age });
  return (
    <div
      className='group bg-slate-900/60 backdrop-blur-3xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl cursor-pointer'
      onClick={() => onView(player)}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <div className='w-16 h-16 bg-gradient-to-br from-[#169976] to-teal-500 rounded-2xl flex items-center justify-center text-2xl shadow-xl'>
            {player.photo}
          </div>
          <div>
            <h3 className='text-xl font-bold text-white group-hover:text-emerald-300 transition-colors'>
              {player.name}
            </h3>
            <div className='flex items-center space-x-4 text-sm text-slate-400'>
              <span>{teamName}</span>
              <span>•</span>
              <span>{ageLabel}</span>
              <span>•</span>
              <span>{player.nationality}</span>
            </div>
          </div>
        </div>

        <div className='flex items-center space-x-8 text-center'>
          <div>
            <div className='text-2xl font-bold text-green-400'>{player.goals}</div>
            <div className='text-xs text-slate-400'>{t("stats.goals")}</div>
          </div>
          <div>
            <div className='text-2xl font-bold text-teal-400'>{player.assists}</div>
            <div className='text-xs text-slate-400'>{t("stats.assists")}</div>
          </div>
          <div className='w-20'>
            <div className='text-2xl font-bold text-emerald-400'>
              {player.goals + player.assists}
            </div>
            <div className='text-xs text-slate-400 leading-tight whitespace-normal'>
              {t("stats.goalInvolvements")}
            </div>
          </div>
          <div>
            <div className='text-lg font-semibold text-white'>{player.stats.passing}</div>
            <div className='text-xs text-slate-400'>{t("stats.passing")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
