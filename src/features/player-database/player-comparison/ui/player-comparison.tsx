import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { BarChart3, ArrowRight } from "lucide-react";

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
  if (players.length < 2) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-3xl border-t border-white/10 shadow-2xl'>
      <div className='max-w-7xl mx-auto px-6 py-6'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-3'>
            <BarChart3 className='w-6 h-6 text-emerald-400' />
            <h3 className='text-xl font-bold text-white'>Player Comparison</h3>
            <span className='text-slate-400 text-sm'>({players.length}/3 selected)</span>
          </div>
          <div className='flex items-center space-x-4'>
            <button
              type='button'
              onClick={onToggle}
              className='px-6 py-3 bg-[#169976] hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors flex items-center space-x-2'
            >
              <span>{showComparison ? "Hide" : "Show"} Comparison</span>
              <ArrowRight className='w-4 h-4' />
            </button>
            <button
              type='button'
              onClick={onClear}
              className='px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors'
            >
              Clear All
            </button>
          </div>
        </div>

        {showComparison && (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {players.map((player) => (
              <div key={player.id} className='bg-slate-800/50 rounded-2xl p-6 border border-white/10'>
                <div className='flex items-center space-x-4 mb-4'>
                  <div className='w-12 h-12 bg-gradient-to-br from-[#169976] to-teal-500 rounded-xl flex items-center justify-center text-xl'>
                    {player.photo}
                  </div>
                  <div>
                    <h4 className='text-white font-bold'>{player.name}</h4>
                    <div className='text-slate-400 text-sm'>{player.team}</div>
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-2 text-center'>
                  <div>
                    <div className='text-lg font-bold text-green-400'>
                      {player.goals}
                    </div>
                    <div className='text-xs text-slate-400'>Goals</div>
                  </div>
                  <div>
                    <div className='text-lg font-bold text-teal-400'>
                      {player.assists}
                    </div>
                    <div className='text-xs text-slate-400'>Assists</div>
                  </div>
                  <div>
                    <div className='text-lg font-bold text-yellow-400'>
                      {player.rating}
                    </div>
                    <div className='text-xs text-slate-400'>Rating</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
