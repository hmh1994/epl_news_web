"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";

const NAV_ITEMS: Array<{ segment: string; labelKey: string }> = [
  { segment: "home", labelKey: "nav.home" },
  { segment: "news", labelKey: "nav.news" },
  { segment: "matches", labelKey: "nav.matches" },
  { segment: "players", labelKey: "nav.players" },
  { segment: "teams", labelKey: "nav.table" },
  { segment: "teams/detail", labelKey: "nav.teams" },
  { segment: "league", labelKey: "nav.overview" },
];

export const AppHeader = () => {
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const base = locale ? `/${locale}` : "";
  const t = useTranslations("header");

  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-slate-200'>
        <Link href={base || "/"} className='flex items-center gap-2 text-base font-bold tracking-wide text-white'>
          <Image
            src='/resource/logo.png'
            alt={t("brand")}
            width={32}
            height={32}
            className='h-8 w-8'
            priority
          />
          <span>{t("brand")}</span>
        </Link>

        <nav className='hidden items-center gap-2 md:flex'>
          {NAV_ITEMS.map((item) => {
            const href = `${base}/${item.segment}`;
            const isActive =
              pathname === href || pathname?.startsWith(`${href}/`);
            return (
              <Link
                key={item.segment}
                href={href}
                className={clsx(
                  "rounded-xl px-3 py-2 transition-colors",
                  isActive
                    ? "bg-emerald-500/20 text-white border border-emerald-400/30"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className='flex items-center gap-3 text-xs text-slate-400'>
          <span className='hidden md:inline'>{t("tagline")}</span>
          <Link
            href={`${base}/players`}
            className='rounded-xl border border-white/10 px-3 py-2 text-slate-200 hover:border-emerald-400/40 hover:text-white'
          >
            {t("playerCta")}
          </Link>
        </div>
      </div>
    </header>
  );
};
