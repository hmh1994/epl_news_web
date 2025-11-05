"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NAV_ITEMS: Array<{ segment: string; label: string }> = [
  { segment: "home", label: "Home" },
  { segment: "news", label: "News" },
  { segment: "matches", label: "Matches" },
  { segment: "players", label: "Players" },
  { segment: "teams", label: "Table" },
  { segment: "teams/detail", label: "Teams" },
  { segment: "league", label: "Overview" },
];

export const AppHeader = () => {
  const pathname = usePathname();
  const [, locale] = pathname?.split("/") ?? [];
  const base = locale ? `/${locale}` : "";

  return (
    <header className='sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-slate-200'>
        <Link href={base || "/"} className='flex items-center gap-2 text-base font-bold tracking-wide text-white'>
          <span className='flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#169976] to-teal-500 text-lg shadow-lg'>⚽</span>
          <span>Infootball</span>
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
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className='flex items-center gap-3 text-xs text-slate-400'>
          <span className='hidden md:inline'>Premier League Hub</span>
          <Link
            href={`${base}/players`}
            className='rounded-xl border border-white/10 px-3 py-2 text-slate-200 hover:border-emerald-400/40 hover:text-white'
          >
            Player DB
          </Link>
        </div>
      </div>
    </header>
  );
};
