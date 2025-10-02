import { PlayerRanking } from "../model/player-ranking";

interface PlayerRankingCardProps {
  player: PlayerRanking;
  rank: number;
}

export const PlayerRankingCard = ({ player, rank }: PlayerRankingCardProps) => {
  return (
    <div className='group relative p-5 rounded-2xl hover:bg-white/5 cursor-pointer transition-all duration-300 border border-transparent hover:border-white/10'>
      <div className='flex items-center space-x-4'>
        <div className='relative'>
          <div className='w-14 h-14 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl'>
            {player.avatar}
          </div>
          <div className='absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white'>
            {rank}
          </div>
        </div>

        <div className='flex-1'>
          <h4 className='text-white font-bold text-lg group-hover:text-[#169976] transition-colors'>
            {player.name}
          </h4>
          <p className='text-slate-400 text-sm mb-1'>{player.team}</p>
          <div className='flex items-center space-x-4 text-sm'>
            <span className='text-green-400 font-semibold'>{player.goals}골</span>
            <span className='text-[#169976] font-semibold'>{player.assists}도움</span>
            <span className='text-yellow-400 font-semibold'>★{player.rating}</span>
          </div>
        </div>

        <div className='text-right'>
          <div className='text-slate-400 text-xs mb-1'>시장가치</div>
          <div className='text-white font-bold'>{player.value}</div>
        </div>
      </div>
    </div>
  );
};
