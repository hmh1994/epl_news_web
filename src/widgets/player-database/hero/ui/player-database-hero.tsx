"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useTranslations } from "next-intl";

export const PlayerDatabaseHero = () => {
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const basePath = locale ? `/${locale}` : "";
  const t = useTranslations("player.hero");

  return (
    <section className='relative pt-28 pb-14'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(100,116,139,0.14),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(148,163,184,0.1),transparent_45%)]' />

      <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
        <h1 className='text-3xl sm:text-4xl lg:text-6xl font-semibold mb-6 leading-tight tracking-tight'>
          <span className='text-white'>{t("title.primary")}</span>
          <br />
          <span className='text-slate-200'>{t("title.secondary")}</span>
        </h1>
        <p className='text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed'>
          {t("description")}
        </p>

        <div className='mt-8 flex flex-wrap items-center justify-center gap-4 text-sm font-semibold'>
          <Link
            href={`${basePath}/teams`}
            className='rounded-full border border-white/10 bg-slate-900/60 px-5 py-2 text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            {t("cta.teams")}
          </Link>
          <Link
            href={`${basePath}/matches`}
            className='rounded-full border border-white/10 bg-slate-900/60 px-5 py-2 text-slate-200 transition-colors hover:border-white/20 hover:text-white'
          >
            {t("cta.matches")}
          </Link>
        </div>

      </div>
    </section>
  );
};
