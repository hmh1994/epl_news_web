"use client";

import { ChangeEvent } from "react";
import { Filter, Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface MatchScheduleFiltersProps {
  matchweeks: number[];
  selectedMatchweek: number;
  onMatchweekChange: (matchweek: number) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export const MatchScheduleFilters = ({
  matchweeks,
  selectedMatchweek,
  onMatchweekChange,
  searchTerm,
  onSearchTermChange,
}: MatchScheduleFiltersProps) => {
  const t = useTranslations("match.filters");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <section className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-6 mb-10'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 relative'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
          <input
            type='text'
            placeholder={t("searchPlaceholder")}
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className='lg:col-span-1'>
          <div className='flex items-center space-x-2 text-slate-400 text-sm mb-2'>
            <Filter className='w-4 h-4' />
            <span>{t("matchweekLabel")}</span>
          </div>
          <div className='relative'>
            <div
              className='scrollbar-slim flex items-center gap-2 overflow-x-auto pb-1 pl-2 pr-6'
            >
              {matchweeks.map((matchweek) => {
                const isActive = matchweek === selectedMatchweek;
                return (
                  <button
                    key={matchweek}
                    type='button'
                    onClick={() => onMatchweekChange(matchweek)}
                    className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-[#169976] text-white shadow-lg"
                        : "bg-slate-800/50 text-slate-400 hover:text-white"
                    }`}
                  >
                    {t("matchweekChip", { week: matchweek })}
                  </button>
                );
              })}
            </div>
            <div className='pointer-events-none absolute left-0 top-0 bottom-2 w-6 bg-gradient-to-r from-slate-950 via-slate-900/70 to-transparent rounded-l-3xl'></div>
            <div className='pointer-events-none absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-slate-950 via-slate-900/70 to-transparent rounded-r-3xl'></div>
          </div>
        </div>
      </div>
    </section>
  );
};
