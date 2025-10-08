import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";

interface PlayerListItemProps {
  player: PlayerDatabaseEntry;
  onView: (player: PlayerDatabaseEntry) => void;
  teamName: string;
}

export const PlayerListItem = ({ player, onView, teamName }: PlayerListItemProps) => {
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
              <span>{player.age}세</span>
              <span>•</span>
              <span>{player.nationality}</span>
            </div>
          </div>
        </div>

        <div className='flex items-center space-x-8'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-green-400'>{player.goals}</div>
            <div className='text-xs text-slate-400'>Goals</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-teal-400'>{player.assists}</div>
            <div className='text-xs text-slate-400'>Assists</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-yellow-400'>{player.rating}</div>
            <div className='text-xs text-slate-400'>Rating</div>
          </div>
          <div className='text-white font-bold'>{player.marketValue}</div>
        </div>
      </div>
    </div>
  );
};
