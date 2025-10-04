import { LeagueKey, LeagueSummary } from "@/entities/league/model/league-overview";
import { Crown } from "lucide-react";

interface LeagueSelectorCardProps {
  leagueKey: LeagueKey;
  league: LeagueSummary;
  isActive: boolean;
  onSelect: (key: LeagueKey) => void;
}

export const LeagueSelectorCard = ({
  leagueKey,
  league,
  isActive,
  onSelect,
}: LeagueSelectorCardProps) => {
  return (
    <button
      type='button'
      onClick={() => onSelect(leagueKey)}
      className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 ${
        isActive
          ? "bg-gradient-to-br from-[#169976]/20 to-teal-500/20 border-white/40 shadow-2xl"
          : "bg-slate-800/50 border-white/10 hover:border-white/20"
      }`}
    >
      <div
        className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${league.color} flex items-center justify-center text-2xl shadow-xl group-hover:scale-110 transition-transform`}
      >
        {league.logo}
      </div>
      <h3 className='text-lg font-bold text-white mb-2'>{league.name}</h3>
      <div className='text-2xl mb-2'>{league.country}</div>
      <div className='text-slate-400 text-sm'>{league.teams} Teams</div>
      <div className='text-slate-300 font-semibold text-sm mt-2'>
        {league.marketValue}
      </div>
      {isActive && (
        <div className='absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg'>
          <Crown className='w-4 h-4 text-white' />
        </div>
      )}
    </button>
  );
};
