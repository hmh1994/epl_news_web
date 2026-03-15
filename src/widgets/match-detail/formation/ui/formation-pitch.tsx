import type {
  LineupPlayer,
  SubstitutionEvent,
} from "@/entities/match/model/match-lineup";
import { FormationPlayer } from "./formation-player";

interface FormationPitchProps {
  formation: number[];
  players: LineupPlayer[];
  captainId: string;
  primaryColor: string;
  secondaryColor: string;
  substitutions: SubstitutionEvent[];
}

export const FormationPitch = ({
  formation,
  players,
  captainId,
  primaryColor,
  secondaryColor,
  substitutions,
}: FormationPitchProps) => {
  const outPlayerIds = new Set(substitutions.map((s) => s.outPlayerId));
  const substitutionByOutId = new Map(
    substitutions.map((s) => [s.outPlayerId, s.clock])
  );

  const rows: LineupPlayer[][] = [];
  for (let r = 0; r <= 3; r++) {
    const rowPlayers = players
      .filter((p) => p.row === r)
      .sort((a, b) => a.column - b.column);
    if (rowPlayers.length > 0) {
      rows.push(rowPlayers);
    }
  }

  const formationLabel = formation.join("-");

  return (
    <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] max-w-md mx-auto">
      {/* Pitch SVG background */}
      <svg
        viewBox="0 0 400 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Pitch fill */}
        <rect x="0" y="0" width="400" height="600" rx="16" fill="#1a5c2a" />
        {/* Field lines */}
        <rect
          x="20"
          y="20"
          width="360"
          height="560"
          rx="4"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {/* Center line */}
        <line
          x1="20"
          y1="300"
          x2="380"
          y2="300"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {/* Center circle */}
        <circle
          cx="200"
          cy="300"
          r="60"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        <circle cx="200" cy="300" r="4" fill="rgba(255,255,255,0.25)" />
        {/* Penalty area (bottom, attacking end) */}
        <rect
          x="100"
          y="460"
          width="200"
          height="120"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {/* Goal area bottom */}
        <rect
          x="150"
          y="520"
          width="100"
          height="60"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {/* Penalty area (top, GK end) */}
        <rect
          x="100"
          y="20"
          width="200"
          height="120"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {/* Goal area top */}
        <rect
          x="150"
          y="20"
          width="100"
          height="60"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {/* Penalty spots */}
        <circle cx="200" cy="108" r="3" fill="rgba(255,255,255,0.2)" />
        <circle cx="200" cy="492" r="3" fill="rgba(255,255,255,0.2)" />
      </svg>

      {/* Formation label */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-semibold text-white/60 tracking-widest uppercase z-10">
        {formationLabel}
      </div>

      {/* Players positioned on pitch */}
      <div className="absolute inset-0 flex flex-col justify-between py-8 sm:py-10 px-4">
        {rows.map((rowPlayers, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-around items-center"
          >
            {rowPlayers.map((player) => (
              <FormationPlayer
                key={player.playerId}
                player={player}
                isCaptain={player.playerId === captainId}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                isSubstituted={outPlayerIds.has(player.playerId)}
                substitutionMinute={substitutionByOutId.get(player.playerId)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
