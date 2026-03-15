import type { PlayerAward, AwardType } from "@/entities/player/model/player-award";

interface PlayerAwardsProps {
  awards: PlayerAward[];
}

const AWARD_ABBR: Record<string, string> = {
  POTM: "POTM",
  GOTM: "GOTM",
  SOTM: "SOTM",
  POTS: "POTS",
  YPOTS: "YPOTS",
  GB: "GB",
  GG: "GG",
  MOTM: "MOTM",
  PM: "PM",
  GOTS: "GOTS",
  MOTS: "MOTS",
};

export const PlayerAwards = ({ awards }: PlayerAwardsProps) => {
  if (awards.length === 0) return null;

  const grouped = new Map<AwardType, PlayerAward[]>();
  for (const award of awards) {
    const list = grouped.get(award.type) ?? [];
    list.push(award);
    grouped.set(award.type, list);
  }

  const seasonMap = new Map<string, PlayerAward[]>();
  for (const award of awards) {
    const season = award.season ?? "기타";
    const list = seasonMap.get(season) ?? [];
    list.push(award);
    seasonMap.set(season, list);
  }
  const seasons = [...seasonMap.entries()].sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-[0_18px_40px_rgba(2,6,23,0.35)]">
      <div className="flex items-baseline justify-between mb-5">
        <h4 className="text-lg font-semibold text-white">수상 내역</h4>
        <span className="text-xs text-slate-500 tabular-nums">{awards.length}회 수상</span>
      </div>

      {/* 요약 뱃지 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[...grouped.entries()].map(([type, list]) => (
          <div
            key={type}
            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/50 px-3 py-2"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider w-10">
              {AWARD_ABBR[type] ?? type}
            </span>
            <span className="text-sm font-semibold text-white">{list[0].name}</span>
            {list.length > 1 && (
              <span className="text-xs text-slate-500 tabular-nums">x{list.length}</span>
            )}
          </div>
        ))}
      </div>

      {/* 시즌별 히스토리 */}
      <div className="space-y-4">
        {seasons.map(([season, list]) => (
          <div key={season}>
            <div className="text-xs text-slate-500 font-semibold mb-2">{season}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {list.map((award, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-2.5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0">
                      {AWARD_ABBR[award.type] ?? award.type}
                    </span>
                    <span className="text-sm text-slate-200 truncate">{award.name}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 tabular-nums shrink-0 ml-3">
                    {award.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
