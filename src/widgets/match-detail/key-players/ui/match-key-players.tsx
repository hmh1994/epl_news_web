import { MatchDetail, MatchKeyPlayer } from "@/entities/match/model/match-detail";

interface MatchKeyPlayersProps {
  keyPlayers: MatchDetail["keyPlayers"];
}

const formColor: Record<"W" | "D" | "L", string> = {
  W: "bg-emerald-500 text-white",
  D: "bg-yellow-500 text-white",
  L: "bg-rose-500 text-white",
};

export const MatchKeyPlayers = ({ keyPlayers }: MatchKeyPlayersProps) => {
  return (
    <section className='bg-slate-900/60 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden'>
      <header className='px-7 py-6 border-b border-white/10'>
        <p className='text-xs uppercase tracking-[0.3em] text-emerald-300'>Key Battle</p>
        <h2 className='text-xl font-semibold text-white'>오늘의 관전 포인트</h2>
      </header>

      <div className='flex flex-col divide-y divide-white/10'>
        <KeyPlayerCard side='홈' player={keyPlayers.home} />
        <KeyPlayerCard side='원정' player={keyPlayers.away} />
      </div>
    </section>
  );
};

const KeyPlayerCard = ({ side, player }: { side: string; player: MatchKeyPlayer }) => {
  return (
    <article className='p-7 space-y-4'>
      <div className='flex items-baseline justify-between'>
        <div>
          <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>{side}</p>
          <h3 className='text-lg font-semibold text-white'>{player.name}</h3>
          <p className='text-sm text-slate-400'>{player.role}</p>
        </div>
        <div className='text-xs text-emerald-200 uppercase tracking-[0.3em]'>{player.stat}</div>
      </div>

      <p className='text-sm text-slate-300 leading-relaxed'>{player.highlight}</p>

      <div className='flex items-center gap-2 text-xs'>
        {player.form.map((result, index) => (
          <span
            key={`${player.name}-${result}-${index}`}
            className={`w-7 h-7 rounded-xl flex items-center justify-center font-semibold ${formColor[result]}`}
          >
            {result}
          </span>
        ))}
      </div>
    </article>
  );
};
