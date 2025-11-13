"use client";

import { useTranslations } from "next-intl";
import { LeagueStat } from "@/entities/stat/model/league-stat";
import { StatCard } from "@/entities/stat/ui/stat-card";

interface EplHubStatsProps {
  stats: LeagueStat[];
}

export const EplHubStats = ({ stats }: EplHubStatsProps) => {
  const t = useTranslations("eplHub.stats");
  return (
    <section className='py-20'>
      <div className='text-center mb-16'>
        <h2 className='text-5xl font-black text-white mb-6'>{t("title")}</h2>
        <p className='text-xl text-slate-400 max-w-2xl mx-auto'>
          {t("description")}
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
