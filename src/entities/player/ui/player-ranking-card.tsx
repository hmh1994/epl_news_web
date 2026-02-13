"use client";

import Link from "next/link";
import { PlayerRanking } from "../model/player-ranking";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface PlayerRankingCardProps {
  player: PlayerRanking;
  rank: number;
  teamName: string;
  href?: string;
}

export const PlayerRankingCard = ({
  player,
  rank,
  teamName,
  href,
}: PlayerRankingCardProps) => {
  const t = useTranslations("player.rankingCard");
  const cardClassName =
    "group relative p-4 rounded-2xl border border-white/5 bg-slate-900/30 hover:bg-slate-900/50 hover:border-white/10 cursor-pointer transition-colors duration-300";

  const content = (
    <div className='flex items-center space-x-3.5'>
      <div className='relative'>
        <div className='w-12 h-12 rounded-2xl flex items-center justify-center text-xl bg-slate-900 border border-white/10 shadow-md'>
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
        <div className='absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-100 border border-amber-300/30 bg-amber-400/15'>
          {rank}
        </div>
      </div>

      <div className='flex-1'>
        <h4 className='text-white font-semibold text-lg group-hover:text-emerald-200 transition-colors'>
          {player.name}
        </h4>
        <p className='text-slate-400 text-sm mb-1'>{teamName}</p>
        <div className='flex items-center space-x-4 text-sm'>
          <span className='text-emerald-300 font-semibold'>
            {t("goals", { count: player.goals })}
          </span>
          <span className='text-slate-300 font-semibold'>
            {t("assists", { count: player.assists })}
          </span>
          <span className='text-amber-200 font-semibold'>
            {t("rating", { value: player.rating })}
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return <div className={cardClassName}>{content}</div>;
};
