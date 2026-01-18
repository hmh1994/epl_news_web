"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HERO_STATS } from "@/widgets/player-database/model/constants";
import { useTranslations } from "next-intl";

export const PlayerDatabaseHero = () => {
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const basePath = locale ? `/${locale}` : "";
  const t = useTranslations("player.hero");

  return (
    <section className='relative pt-28 pb-16 overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900'></div>
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
        <h1 className='text-6xl md:text-7xl font-black mb-6 leading-tight'>
          <span className='bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent'>
            {t("title.primary")}
          </span>
          <br />
          <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
            {t("title.secondary")}
          </span>
        </h1>
        <p className='text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed'>
          {t("description")}
        </p>

        <div className='mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold'>
          <Link
            href={`${basePath}/teams`}
            className='rounded-full border border-white/10 bg-white/5 px-5 py-2 text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
          >
            {t("cta.teams")}
          </Link>
          <Link
            href={`${basePath}/matches`}
            className='rounded-full border border-white/10 bg-white/5 px-5 py-2 text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
          >
            {t("cta.matches")}
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 justify-items-center'>
          {HERO_STATS.map((stat) => (
            <div
              key={stat.labelKey}
              className='bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 w-full'
            >
              <div className='text-3xl font-black text-white mb-2'>
                {stat.value}
              </div>
              <div className='text-slate-400 text-sm'>{t(`stats.${stat.labelKey}`)}</div>
              <div className='text-slate-500 text-xs mt-1'>{t(`stats.${stat.captionKey}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
