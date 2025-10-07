import { MatchStatComparison } from "@/entities/match/model/match-detail";

interface MatchStatsPanelProps {
  stats: MatchStatComparison[];
}

export const MatchStatsPanel = ({ stats }: MatchStatsPanelProps) => {
  if (stats.length === 0) {
    return null;
  }

  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-7 py-6 border-b border-white/10'>
        <p className='text-xs uppercase tracking-[0.3em] text-emerald-300'>Stats Radar</p>
        <h2 className='text-xl font-semibold text-white'>핵심 지표 비교</h2>
      </header>

      <div className='divide-y divide-white/10'>
        {stats.map((stat) => (
          <StatRow key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
};

const StatRow = ({ stat }: { stat: MatchStatComparison }) => {
  const maxValue = Math.max(stat.home, stat.away, 1);
  const homeRatio = Math.max(Math.round((stat.home / maxValue) * 100), 12);
  const awayRatio = Math.max(Math.round((stat.away / maxValue) * 100), 12);
  const positiveForHigher = stat.higherIsBetter !== false;

  const homeLeading = positiveForHigher ? stat.home >= stat.away : stat.home <= stat.away;
  const awayLeading = positiveForHigher ? stat.away >= stat.home : stat.away <= stat.home;

  return (
    <div className='px-7 py-6 space-y-4'>
      <div className='flex items-center justify-between text-sm text-slate-300'>
        <span>{stat.label}</span>
        <span className='uppercase tracking-[0.25em] text-xs text-slate-500'>경기 데이터</span>
      </div>

      <div className='grid grid-cols-1 gap-4'>
        <BarRow
          side='홈'
          value={stat.home}
          ratio={homeRatio}
          leading={homeLeading}
          tone='from-[#169976] via-emerald-400 to-teal-300'
        />
        <BarRow
          side='원정'
          value={stat.away}
          ratio={awayRatio}
          leading={awayLeading}
          tone='from-indigo-400 via-purple-500 to-fuchsia-400'
        />
      </div>
    </div>
  );
};

const BarRow = ({
  side,
  value,
  ratio,
  leading,
  tone,
}: {
  side: string;
  value: number;
  ratio: number;
  leading: boolean;
  tone: string;
}) => {
  return (
    <div className='space-y-2 text-sm'>
      <div className='flex items-center justify-between text-slate-300'>
        <span className='text-xs uppercase tracking-[0.3em] text-slate-500'>{side}</span>
        <span className={`font-semibold ${leading ? "text-white" : "text-slate-400"}`}>{value}</span>
      </div>
      <div className='h-2 rounded-full bg-white/10 overflow-hidden'>
        <div
          className={`h-full bg-gradient-to-r ${leading ? tone : "from-slate-500/50 to-slate-600/40"} transition-all duration-500`}
          style={{ width: `${ratio}%` }}
        ></div>
      </div>
    </div>
  );
};
