"use client";

import { PlayerRanking } from "../model/player-ranking";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PlayerRankingCardProps {
  player: PlayerRanking;
  rank: number;
  teamName: string;
}

export const PlayerRankingCard = ({
  player,
  rank,
  teamName,
}: PlayerRankingCardProps) => {
  const t = useTranslations("player.rankingCard");
  console.log(player.photo);
  return (
    <div className='group relative p-4 rounded-2xl hover:bg-white/5 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/10'>
      <div className='flex items-center space-x-3.5'>
        <div className='relative'>
          <div className='w-12 h-12 bg-gradient-to-br from-[#000000] via-emerald-600 to-white rounded-2xl flex items-center justify-center text-xl shadow-xl'>
            {!!player.photo && (
              <Image
                src={player.photo}
                alt={player.name}
                width={40}
                height={40}
                className='w-10 h-10 object-contain'
              />
            )}
          </div>
          <div className='absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white'>
            {rank}
          </div>
        </div>

        <div className='flex-1'>
          <h4 className='text-white font-bold text-lg group-hover:text-[#169976] transition-colors'>
            {player.name}
          </h4>
          <p className='text-slate-400 text-sm mb-1'>{teamName}</p>
          <div className='flex items-center space-x-4 text-sm'>
            <span className='text-green-400 font-semibold'>
              {t("goals", { count: player.goals })}
            </span>
            <span className='text-[#169976] font-semibold'>
              {t("assists", { count: player.assists })}
            </span>
            <span className='text-yellow-400 font-semibold'>
              {t("rating", { value: player.rating })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
