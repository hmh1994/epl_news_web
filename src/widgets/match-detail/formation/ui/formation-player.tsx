import type { LineupPlayer } from "@/entities/match/model/match-lineup";

interface FormationPlayerProps {
  player: LineupPlayer;
  isCaptain: boolean;
  primaryColor: string;
  secondaryColor: string;
  isSubstituted: boolean;
  substitutionMinute?: number;
}

export const FormationPlayer = ({
  player,
  isCaptain,
  primaryColor,
  secondaryColor,
  isSubstituted,
  substitutionMinute,
}: FormationPlayerProps) => {
  return (
    <div className="flex flex-col items-center gap-1 relative">
      <div
        className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg border-2"
        style={{
          backgroundColor: primaryColor,
          borderColor: secondaryColor,
          color: secondaryColor,
        }}
      >
        {player.shirtNumber}
        {isCaptain && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[9px] font-black flex items-center justify-center">
            C
          </span>
        )}
        {isSubstituted && (
          <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
            {substitutionMinute}&apos;
          </span>
        )}
      </div>
      <span className="text-[10px] sm:text-xs text-white font-medium text-center leading-tight max-w-[60px] sm:max-w-[72px] truncate drop-shadow-md">
        {player.playerName}
      </span>
    </div>
  );
};
