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
  const isPhotoUrl = player.photo.startsWith("http");
  return (
    <div
      className='group rounded-2xl p-6 border border-white/10 bg-slate-950/60 hover:border-white/20 transition-colors duration-300 cursor-pointer'
      onClick={() => onView(player)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onView(player);
        }
      }}
      role='button'
      tabIndex={0}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <div className='w-16 h-16 bg-slate-900/80 border border-white/10 rounded-2xl flex items-center justify-center text-2xl overflow-hidden'>
            {isPhotoUrl ? (
              <img
                src={player.photo}
                alt={player.name}
                className='h-full w-full object-cover'
              />
            ) : (
              player.photo
            )}
          </div>
          <div>
            <h3 className='text-xl font-semibold text-white group-hover:text-emerald-200 transition-colors'>
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
            <div className='text-2xl font-semibold text-emerald-200'>{player.goals}</div>
            <div className='text-xs text-slate-400'>{t("stats.goals")}</div>
          </div>
          <div>
            <div className='text-2xl font-semibold text-slate-200'>{player.assists}</div>
            <div className='text-xs text-slate-400'>{t("stats.assists")}</div>
          </div>
          <div className='w-20'>
            <div className='text-2xl font-semibold text-emerald-200'>
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
