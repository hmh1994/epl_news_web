import type {
  SubstitutePlayer,
  SubstitutionEvent,
} from "@/entities/match/model/match-lineup";

interface SubstituteBenchProps {
  substitutes: SubstitutePlayer[];
  substitutions: SubstitutionEvent[];
  primaryColor: string;
  secondaryColor: string;
}

const POSITION_LABEL: Record<string, string> = {
  goalkeeper: "GK",
  defender: "DF",
  midfielder: "MF",
  forward: "FW",
};

export const SubstituteBench = ({
  substitutes,
  substitutions,
  primaryColor,
  secondaryColor,
}: SubstituteBenchProps) => {
  if (substitutes.length === 0) return null;

  const inPlayerIds = new Set(substitutions.map((s) => s.inPlayerId));
  const substitutionByClock = new Map(
    substitutions.map((s) => [s.inPlayerId, s.clock])
  );

  return (
    <div className="space-y-3">
      <h4 className="text-xs uppercase tracking-[0.25em] text-slate-400 font-semibold">
        교체 선수
      </h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {substitutes.map((sub) => {
          const isUsed = inPlayerIds.has(sub.playerId);
          const minute = substitutionByClock.get(sub.playerId);
          return (
            <div
              key={sub.playerId}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg border ${
                isUsed
                  ? "border-emerald-500/30 bg-emerald-500/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{
                  backgroundColor: primaryColor,
                  color: secondaryColor,
                }}
              >
                {sub.shirtNumber}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-white font-medium truncate">
                  {sub.playerName}
                </p>
                <p className="text-[10px] text-slate-400">
                  {POSITION_LABEL[sub.position] ?? sub.position}
                  {isUsed && minute != null && (
                    <span className="text-emerald-400 ml-1">{minute}&apos;</span>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
