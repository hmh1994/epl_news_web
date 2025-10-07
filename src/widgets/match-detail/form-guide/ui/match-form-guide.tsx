import { MatchDetail, MatchFormEntry } from "@/entities/match/model/match-detail";

interface MatchFormGuidePanelProps {
  formGuide: MatchDetail["formGuide"];
}

const resultColor: Record<MatchFormEntry["result"], string> = {
  W: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40",
  D: "bg-yellow-500/20 text-yellow-200 border border-yellow-500/40",
  L: "bg-rose-500/20 text-rose-200 border border-rose-500/40",
};

export const MatchFormGuidePanel = ({ formGuide }: MatchFormGuidePanelProps) => {
  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-7 py-6 border-b border-white/10'>
        <p className='text-xs uppercase tracking-[0.3em] text-emerald-300'>Form Guide</p>
        <h2 className='text-xl font-semibold text-white'>최근 3경기 흐름</h2>
      </header>

      <div className='grid grid-cols-1 divide-y divide-white/10'>
        <FormColumn title='홈' entries={formGuide.home} />
        <FormColumn title='원정' entries={formGuide.away} />
      </div>
    </section>
  );
};

const FormColumn = ({ title, entries }: { title: string; entries: MatchFormEntry[] }) => {
  return (
    <div className='p-7 space-y-4'>
      <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>{title}</p>
      <div className='space-y-3'>
        {entries.map((entry) => (
          <div
            key={`${title}-${entry.date}-${entry.opponent}`}
            className='flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200'
          >
            <div className='flex items-center gap-3'>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-semibold uppercase tracking-[0.3em] ${resultColor[entry.result]}`}>
                {entry.result}
              </span>
              <div>
                <p className='font-semibold text-white'>{entry.score}</p>
                <p className='text-xs text-slate-400'>{entry.competition}</p>
              </div>
            </div>
            <div className='text-right'>
              <p className='text-sm text-emerald-200 font-medium'>vs {entry.opponent}</p>
              <p className='text-xs text-slate-400'>{entry.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
