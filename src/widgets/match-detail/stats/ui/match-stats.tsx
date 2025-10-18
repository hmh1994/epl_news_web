import { MatchDetail, MatchStatComparison } from "@/entities/match/model/match-detail";

interface MatchStatsPanelProps {
  stats: MatchStatComparison[];
  formGuide: MatchDetail["formGuide"];
  homeLabel: string;
  awayLabel: string;
  timeframeNote: string;
}

export const MatchStatsPanel = ({
  stats,
  formGuide,
  homeLabel,
  awayLabel,
  timeframeNote,
}: MatchStatsPanelProps) => {
  if (stats.length === 0) {
    return null;
  }

  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-7 py-6 border-b border-white/10 space-y-1'>
        <p className='text-xs uppercase tracking-[0.3em] text-emerald-300'>Momentum &amp; Stats</p>
        <h2 className='text-xl font-semibold text-white'>핵심 지표 &amp; 최근 흐름</h2>
        <p className='text-xs text-slate-400'>{timeframeNote}</p>
      </header>

      <div className='grid gap-6 lg:grid-cols-[1.4fr,1fr] items-start px-7 py-6'>
        <div className='space-y-6 divide-y divide-white/10'>
          {stats.map((stat) => (
            <StatRow
              key={stat.label}
              stat={stat}
              homeLabel={homeLabel}
              awayLabel={awayLabel}
            />
          ))}
        </div>

        <div className='space-y-5 bg-slate-900/40 border border-white/10 rounded-2xl p-5'>
          <FormColumn title={homeLabel} entries={formGuide.home} tone='home' />
          <FormColumn title={awayLabel} entries={formGuide.away} tone='away' />
        </div>
      </div>
    </section>
  );
};

const StatRow = ({
  stat,
  homeLabel,
  awayLabel,
}: {
  stat: MatchStatComparison;
  homeLabel: string;
  awayLabel: string;
}) => {
  const maxValue = Math.max(stat.home, stat.away, 1);
  const homeRatio = Math.max(Math.round((stat.home / maxValue) * 100), 12);
  const awayRatio = Math.max(Math.round((stat.away / maxValue) * 100), 12);
  const positiveForHigher = stat.higherIsBetter !== false;

  const homeLeading = positiveForHigher ? stat.home >= stat.away : stat.home <= stat.away;
  const awayLeading = positiveForHigher ? stat.away >= stat.home : stat.away <= stat.home;

  return (
    <div className='pt-0 first:pt-0 space-y-4'>
      <div className='flex items-center justify-between text-sm text-slate-300'>
        <span>{stat.label}</span>
        <span className='uppercase tracking-[0.25em] text-xs text-slate-500'>team metric</span>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <BarRow
          label={homeLabel}
          value={stat.home}
          ratio={homeRatio}
          leading={homeLeading}
          tone='from-[#169976] via-emerald-400 to-teal-300'
        />
        <BarRow
          label={awayLabel}
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
  label,
  value,
  ratio,
  leading,
  tone,
}: {
  label: string;
  value: number;
  ratio: number;
  leading: boolean;
  tone: string;
}) => {
  return (
    <div className='space-y-2 text-sm'>
      <div className='flex items-center justify-between text-slate-300'>
        <span className='text-xs uppercase tracking-[0.25em] text-slate-500'>{label}</span>
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

const FORM_TONE = {
  home: "text-emerald-200",
  away: "text-indigo-200",
} as const;

const FormColumn = ({
  title,
  entries,
  tone,
}: {
  title: string;
  entries: MatchDetail["formGuide"]["home"];
  tone: "home" | "away";
}) => {
  return (
    <div className='space-y-3'>
      <p className={`text-xs uppercase tracking-[0.3em] ${FORM_TONE[tone]}`}>{title}</p>
      <div className='space-y-2'>
        {entries.map((entry) => (
          <div
            key={`${title}-${entry.date}-${entry.opponent}`}
            className='flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-slate-200'
          >
            <div className='flex items-center gap-3'>
              <span className={`px-2 py-1 rounded-lg font-semibold ${resultColor[entry.result]}`}>
                {entry.result}
              </span>
              <div>
                <p className='font-semibold text-white text-sm'>{entry.score}</p>
                <p className='text-[11px] text-slate-400'>{entry.competition}</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-xs text-emerald-200/90 font-medium'>vs {entry.opponent}</p>
              <p className='text-[11px] text-slate-400'>{entry.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const resultColor: Record<MatchDetail["formGuide"]["home"][number]["result"], string> = {
  W: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40",
  D: "bg-yellow-500/20 text-yellow-200 border border-yellow-500/40",
  L: "bg-rose-500/20 text-rose-200 border border-rose-500/40",
};
