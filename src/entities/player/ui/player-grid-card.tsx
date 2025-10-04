import { PlayerDatabaseEntry } from "@/entities/player/model/player-database-entry";
import { StatAccent, getStatStyles } from "@/entities/player/lib/stat-palette";
import { Award } from "lucide-react";

interface PlayerGridCardProps {
  player: PlayerDatabaseEntry;
  isSelected: boolean;
  onSelect: (player: PlayerDatabaseEntry) => void;
  onView: (player: PlayerDatabaseEntry) => void;
  showSelection: boolean;
}

const POSITION_ACCENT: Record<string, StatAccent> = {
  GK: "yellow",
  CB: "teal",
  LB: "teal",
  RB: "teal",
  LWB: "teal",
  RWB: "teal",
  CDM: "emerald",
  CM: "emerald",
  CAM: "emerald",
  LM: "emerald",
  RM: "emerald",
  ST: "green",
  CF: "green",
  LW: "green",
  RW: "green",
};

const getAccentByPosition = (position: string): StatAccent => {
  return POSITION_ACCENT[position] ?? "teal";
};

export const PlayerGridCard = ({
  player,
  isSelected,
  onSelect,
  onView,
  showSelection,
}: PlayerGridCardProps) => {
  const accent = getStatStyles(getAccentByPosition(player.position));

  return (
    <div
      className={`group relative bg-slate-900/60 backdrop-blur-3xl rounded-3xl p-6 border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${
        isSelected
          ? "border-emerald-400 bg-gradient-to-br from-[#169976]/20 to-teal-500/20 shadow-emerald-400/20"
          : "border-white/10 hover:border-white/20"
      }`}
      onClick={() => onView(player)}
    >
      {isSelected && (
        <div className='absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-[#169976] via-emerald-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg'>
          <Award className='w-4 h-4 text-white' />
        </div>
      )}

      <div className='flex items-start justify-between mb-4'>
        <div className='w-16 h-16 bg-gradient-to-br from-[#169976] to-teal-500 rounded-2xl flex items-center justify-center text-3xl shadow-xl'>
          {player.photo}
        </div>
        <div
          className={`px-3 py-1 rounded-lg text-xs font-bold ${
            player.position === "GK"
              ? "bg-yellow-400/20 text-yellow-400"
              : player.position.includes("D")
              ? "bg-teal-400/20 text-teal-400"
              : player.position.includes("M")
              ? "bg-green-400/20 text-green-400"
              : "bg-red-400/20 text-red-400"
          }`}
        >
          {player.position}
        </div>
      </div>

      <h3 className='text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors'>
        {player.name}
      </h3>
      <div className='flex items-center space-x-2 text-slate-400 text-sm mb-4'>
        <div className='w-6 h-6 bg-gradient-to-br from-[#169976] to-teal-500 rounded-lg flex items-center justify-center text-xs'>
          {player.teamLogo}
        </div>
        <span>{player.team}</span>
      </div>

      <div className='grid grid-cols-3 gap-3 mb-4'>
        <div className='text-center p-3 bg-slate-800/30 rounded-xl'>
          <div className='text-xl font-bold text-green-400'>{player.goals}</div>
          <div className='text-xs text-slate-400'>Goals</div>
        </div>
        <div className='text-center p-3 bg-slate-800/30 rounded-xl'>
          <div className='text-xl font-bold text-teal-400'>{player.assists}</div>
          <div className='text-xs text-slate-400'>Assists</div>
        </div>
        <div className='text-center p-3 bg-slate-800/30 rounded-xl'>
          <div className='text-xl font-bold text-yellow-400'>{player.rating}</div>
          <div className='text-xs text-slate-400'>Rating</div>
        </div>
      </div>

      <div className='flex items-center justify-between pt-4 border-t border-white/10'>
        <span className='text-slate-400 text-sm'>Market Value</span>
        <span className='text-white font-bold'>{player.marketValue}</span>
      </div>

      {showSelection && (
        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation();
            onSelect(player);
          }}
          className='w-full mt-4 py-3 bg-[#169976] hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors'
        >
          {isSelected ? "Remove from Compare" : "Add to Compare"}
        </button>
      )}
    </div>
  );
};
