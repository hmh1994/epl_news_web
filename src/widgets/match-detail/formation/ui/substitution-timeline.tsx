import type {
  LineupPlayer,
  SubstitutePlayer,
  SubstitutionEvent,
} from "@/entities/match/model/match-lineup";

interface SubstitutionTimelineProps {
  substitutions: SubstitutionEvent[];
  lineup: LineupPlayer[];
  substitutes: SubstitutePlayer[];
}

export const SubstitutionTimeline = ({
  substitutions,
  lineup,
  substitutes,
}: SubstitutionTimelineProps) => {
  if (substitutions.length === 0) return null;

  const allPlayers = new Map<string, string>();
  for (const p of lineup) {
    allPlayers.set(p.playerId, p.playerName);
  }
  for (const s of substitutes) {
    allPlayers.set(s.playerId, s.playerName);
  }

  const sorted = [...substitutions].sort((a, b) => a.clock - b.clock);

  return (
    <div className="space-y-3">
      <h4 className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
        교체 기록
      </h4>
      <div className="space-y-2">
        {sorted.map((sub, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-3 py-2 rounded-xl border border-white/10 bg-white/5"
          >
            <span className="text-sm font-bold text-slate-300 w-10 text-right shrink-0">
              {sub.clock}&apos;
            </span>
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-emerald-400 text-xs">IN</span>
                <span className="text-white font-medium truncate">
                  {allPlayers.get(sub.inPlayerId) ?? sub.inPlayerId}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <span className="text-red-400 text-xs">OUT</span>
                <span className="text-slate-400 truncate">
                  {allPlayers.get(sub.outPlayerId) ?? sub.outPlayerId}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
