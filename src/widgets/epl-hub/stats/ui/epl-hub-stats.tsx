import { LeagueStat } from "@/entities/stat/model/league-stat";
import { StatCard } from "@/entities/stat/ui/stat-card";

interface EplHubStatsProps {
  stats: LeagueStat[];
}

export const EplHubStats = ({ stats }: EplHubStatsProps) => {
  return (
    <section className='py-20'>
      <div className='text-center mb-16'>
        <h2 className='text-5xl font-black text-white mb-6'>시즌 하이라이트</h2>
        <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
          데이터로 보는 프리미어리그의 생생한 순간들
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
};
