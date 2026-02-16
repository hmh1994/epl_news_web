import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { Award } from "lucide-react";

interface PlayerGridCardProps {
  player: PlayerDatabaseEntry;
  isSelected: boolean;
  onSelect: (player: PlayerDatabaseEntry) => void;
  onView: (player: PlayerDatabaseEntry) => void;
  showSelection: boolean;
  teamName: string;
  teamCrest: string;
}

export const PlayerGridCard = ({
  player,
  isSelected,
  onSelect,
  onView,
  showSelection,
  teamName,
  teamCrest,
}: PlayerGridCardProps) => {
  const isPhotoUrl = player.photo.startsWith("http");
  return (
    <div
      className={`group relative rounded-3xl p-6 border transition-colors duration-300 cursor-pointer ${
        isSelected
          ? "border-slate-400/40 bg-slate-950/70"
          : "border-white/10 bg-slate-950/60 hover:border-white/20 hover:bg-slate-950/80"
      }`}
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
      {isSelected && (
        <div className='absolute -top-3 -right-3 w-8 h-8 rounded-full border border-slate-400/40 bg-slate-500/15 flex items-center justify-center'>
          <Award className='w-4 h-4 text-slate-100' />
        </div>
      )}

      <div className='flex items-start justify-between mb-4'>
        <div className='w-16 h-16 bg-slate-900/80 border border-white/10 rounded-2xl flex items-center justify-center text-3xl overflow-hidden'>
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
        <div
          className={`px-3 py-1 rounded-lg text-xs font-bold ${
            player.position === "GK" || player.position === "GOALKEEPER"
              ? "bg-yellow-400/15 text-yellow-200"
              : player.position.includes("D")
              ? "bg-slate-400/15 text-slate-300"
              : player.position.includes("M")
              ? "bg-slate-400/15 text-slate-200"
              : "bg-red-400/15 text-red-200"
          }`}
        >
          {player.position}
        </div>
      </div>

      <h3 className='text-xl font-semibold text-white mb-2 group-hover:text-slate-200 transition-colors'>
        {player.name}
      </h3>
      <div className='flex items-center space-x-2 text-slate-400 text-sm mb-4'>
        <div className='w-6 h-6 bg-slate-900/80 border border-white/10 rounded-lg flex items-center justify-center text-xs'>
          {teamCrest}
        </div>
        <span>{teamName}</span>
      </div>

      <div className='grid grid-cols-3 gap-3 mb-4'>
        <div className='flex flex-col items-center justify-center p-3 bg-slate-900/40 rounded-xl text-center'>
          <div className='text-xl font-semibold text-slate-200'>{player.goals}</div>
          <div className='text-xs text-slate-400 leading-[1.15]'>Goals</div>
        </div>
        <div className='flex flex-col items-center justify-center p-3 bg-slate-900/40 rounded-xl text-center'>
          <div className='text-xl font-semibold text-slate-200'>
            {player.assists}
          </div>
          <div className='text-xs text-slate-400 leading-[1.15]'>Assists</div>
        </div>
        <div className='flex flex-col items-center justify-center p-3 bg-slate-900/40 rounded-xl text-center'>
          <div className='text-xl font-semibold text-slate-200'>
            {player.goals + player.assists}
          </div>
          <div className='text-xs text-slate-400 leading-tight whitespace-normal'>
            Goal Involvements
          </div>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-xs text-slate-400'>
        <div className='flex flex-col items-center'>
          <span className='text-white font-semibold text-sm'>{player.height} cm</span>
          <span>Height</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-white font-semibold text-sm'>{player.weight} kg</span>
          <span>Weight</span>
        </div>
        <div className='flex flex-col items-center'>
          <span className='text-white font-semibold text-sm'>{player.stats.pace}</span>
          <span>Pace</span>
        </div>
      </div>

      {showSelection && (
        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            onSelect(player);
          }}
          className='w-full mt-4 py-3 border border-slate-400/30 bg-slate-500/15 hover:bg-slate-500/25 text-slate-100 font-semibold rounded-xl transition-colors'
        >
          {isSelected ? "Remove from Compare" : "Add to Compare"}
        </button>
      )}
    </div>
  );
};
