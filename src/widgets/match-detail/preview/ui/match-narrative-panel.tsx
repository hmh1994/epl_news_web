import { MatchDetail } from "@/entities/match/model/match-detail";

interface MatchNarrativePanelProps {
  status: MatchDetail["fixture"]["status"];
  notes: MatchDetail["previewNotes"];
  broadcastNotes?: MatchDetail["broadcastNotes"];
}

export const MatchNarrativePanel = ({ status, notes, broadcastNotes }: MatchNarrativePanelProps) => {
  if (notes.length === 0 && (!broadcastNotes || broadcastNotes.length === 0)) {
    return null;
  }

  const title = status === "finished" ? "전술 리뷰" : "전술 프리뷰";
  const subtitle =
    status === "finished"
      ? "경기에서 확인된 핵심 장면과 전술적 해석"
      : "킥오프 전 반드시 알아야 할 전략 포인트";

  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-8 py-6 border-b border-white/10 flex flex-col gap-2'>
        <p className='text-xs uppercase tracking-[0.3em] text-emerald-300'>Tactical View</p>
        <h2 className='text-2xl font-bold text-white'>{title}</h2>
        <p className='text-sm text-slate-400'>{subtitle}</p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-5 gap-0'>
        <div className='lg:col-span-3 p-8 space-y-4'>
          {notes.map((note) => (
            <div
              key={note}
              className='flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200'
            >
              <span className='text-emerald-300 text-lg'>•</span>
              <span>{note}</span>
            </div>
          ))}
        </div>
        {broadcastNotes && broadcastNotes.length > 0 && (
          <aside className='lg:col-span-2 border-t lg:border-t-0 lg:border-l border-white/10 bg-slate-900/60 p-8 space-y-4'>
            <h3 className='text-sm uppercase tracking-[0.3em] text-slate-400'>중계 & 현장 노트</h3>
            {broadcastNotes.map((line) => (
              <p key={line} className='text-sm text-slate-300'>
                {line}
              </p>
            ))}
          </aside>
        )}
      </div>
    </section>
  );
};
