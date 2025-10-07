import { HeadToHeadRecord } from "@/entities/match/model/match-detail";

interface MatchHeadToHeadPanelProps {
  records: HeadToHeadRecord[];
}

export const MatchHeadToHeadPanel = ({ records }: MatchHeadToHeadPanelProps) => {
  if (records.length === 0) {
    return null;
  }

  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-7 py-6 border-b border-white/10'>
        <p className='text-xs uppercase tracking-[0.3em] text-emerald-300'>Head to Head</p>
        <h2 className='text-xl font-semibold text-white'>맞대결 기록</h2>
      </header>

      <div className='divide-y divide-white/10'>
        {records.map((record) => (
          <article key={`${record.date}-${record.score}`} className='px-7 py-5 flex flex-col gap-2'>
            <div className='flex items-center justify-between text-sm text-slate-300'>
              <span>{record.date}</span>
              <span className='text-xs uppercase tracking-[0.3em] text-slate-500'>{record.competition}</span>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-lg font-semibold text-white'>{record.score}</p>
              <p className='text-sm text-emerald-200'>{record.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
