"use client";

import { ChangeEvent } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface MatchScheduleFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export const MatchScheduleFilters = ({
  searchTerm,
  onSearchTermChange,
}: MatchScheduleFiltersProps) => {
  const t = useTranslations("match.filters");
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <section className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-6 mb-10'>
      <div className='grid grid-cols-1 gap-4'>
        <div className='relative'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
          <input
            type='text'
            placeholder={t("searchPlaceholder")}
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
    </section>
  );
};
