"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

const NAV_ITEMS: Array<{ segment: string; labelKey: string }> = [
  { segment: "home", labelKey: "nav.home" },
  { segment: "news", labelKey: "nav.news" },
  { segment: "matches", labelKey: "nav.matches" },
  { segment: "players", labelKey: "nav.players" },
  { segment: "teams", labelKey: "nav.table" },
  { segment: "teams/detail", labelKey: "nav.teams" },
  // { segment: "league", labelKey: "nav.overview" },
];

export const AppHeader = () => {
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const base = locale ? `/${locale}` : "";
  const t = useTranslations("header");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (item: (typeof NAV_ITEMS)[number]) => {
    const href = `${base}/${item.segment}`;
    const isTeamsDetailPath =
      pathname === `${base}/teams/detail` ||
      pathname?.startsWith(`${base}/teams/detail/`);
    const matchesHref =
      pathname === href || pathname?.startsWith(`${href}/`);
    return item.segment === "teams"
      ? matchesHref && !isTeamsDetailPath
      : matchesHref;
  };

  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-sm text-slate-200 sm:px-6 sm:py-4'>
        <Link
          href={base || "/"}
          className='flex items-center gap-2 text-base font-bold tracking-wide text-white'
        >
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
            return (
              <Link
                key={item.segment}
                href={href}
                className={clsx(
                  "rounded-xl px-3 py-2 transition-colors",
                  isActive(item)
                    ? "bg-slate-500/20 text-white border border-slate-400/30"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <button
          type='button'
          className='md:hidden rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors'
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className='md:hidden border-t border-white/10 bg-slate-950/98 backdrop-blur-2xl'>
          {NAV_ITEMS.map((item) => {
            const href = `${base}/${item.segment}`;
            return (
              <Link
                key={item.segment}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "block px-6 py-3 text-sm font-medium transition-colors border-b border-white/5",
                  isActive(item)
                    ? "bg-slate-500/20 text-white"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};
