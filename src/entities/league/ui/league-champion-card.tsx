import { LeagueChampion } from "@/entities/league/model/league-overview";
import { Trophy, Crown } from "lucide-react";

interface LeagueChampionCardProps {
  champion: LeagueChampion;
  highlight?: boolean;
  teamName: string;
  teamCrest: string;
}

export const LeagueChampionCard = ({
  champion,
  highlight = false,
  teamName,
  teamCrest,
}: LeagueChampionCardProps) => {
  return (
    <div className='group relative p-6 bg-slate-800/30 rounded-2xl border border-white/10 hover:bg-gradient-to-br hover:from-yellow-500/20 hover:to-orange-500/20 hover:border-yellow-400/40 hover:scale-105 transition-all duration-500 cursor-pointer'>
      {highlight && (
        <div className='absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg'>
          <Crown className='w-4 h-4 text-white' />
        </div>
      )}

      <div className='flex items-center justify-between mb-4'>
        <div className='text-2xl font-black text-white'>{champion.year}</div>
        <div className='flex items-center space-x-2'>
          {Array.from({ length: Math.min(champion.titles, 5) }).map((_, idx) => (
            <Trophy key={idx} className='w-4 h-4 text-yellow-400' />
          ))}
        </div>
      </div>

      <div className='flex items-center space-x-4 mb-4'>
        <div className='w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-2xl shadow-xl'>
          {teamCrest}
        </div>
        <div>
          <div className='text-lg font-bold text-white group-hover:text-yellow-300 transition-colors'>
            {teamName}
          </div>
          <div className='text-slate-400 text-sm'>
            {champion.titles} PL Titles
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between pt-4 border-t border-white/10'>
        <span className='text-slate-400 text-sm'>Points</span>
        <span className='text-white font-bold text-xl'>{champion.points}</span>
      </div>
    </div>
  );
};
