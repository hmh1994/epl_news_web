import { MatchDetailInsight } from "@/entities/match/model/match-detail";

interface MatchDetailInsightsProps {
  insights: MatchDetailInsight[];
}

const trendBadge: Record<Exclude<MatchDetailInsight["trend"], undefined>, string> = {
  up: "▲",
  down: "▼",
  steady: "■",
};

export const MatchDetailInsights = ({ insights }: MatchDetailInsightsProps) => {
  if (insights.length === 0) {
    return null;
  }

  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-8 py-6 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-3'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-emerald-300'>Match Insights</p>
          <h2 className='text-2xl font-bold text-white'>데이터로 보는 포인트</h2>
        </div>
        <span className='text-xs text-slate-400 uppercase tracking-[0.2em]'>Powered by Infootball Lab</span>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10'>
        {insights.map((insight) => (
          <article key={insight.label} className='p-8 space-y-4'>
            <div className='flex items-start justify-between gap-4'>
              <div className='space-y-3'>
                <p className='text-sm uppercase tracking-[0.25em] text-emerald-300'>{insight.label}</p>
                <ValueDisplay value={insight.value} />
              </div>
              {insight.trend && (
                <span className='inline-flex items-center gap-1 whitespace-nowrap text-xs font-semibold text-slate-300 px-3 py-1 rounded-full bg-white/10 border border-white/10'>
                  <span>{trendBadge[insight.trend]}</span>
                  <span>trend</span>
                </span>
              )}
            </div>
            {insight.helperText && (
              <p className='text-sm text-slate-400'>{insight.helperText}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

const ValueDisplay = ({ value }: { value: string }) => {
  const separator = " vs ";
  if (!value.includes(separator)) {
    return <span className='text-3xl font-black text-white leading-tight'>{value}</span>;
  }

  const [home, away] = value.split(separator);

  return (
    <div className='inline-flex flex-col text-3xl font-black text-white leading-tight space-y-1'>
      <span className='whitespace-nowrap'>{home}</span>
      <span className='self-start rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200'>vs</span>
      <span className='whitespace-nowrap'>{away}</span>
    </div>
  );
};
