"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Calendar, { type CalendarProps } from "react-calendar";
import { format } from "date-fns";
import { useLocale, useTranslations } from "next-intl";

interface MatchScheduleFiltersProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  selectedDate: string;
  onSelectedDateChange: (date: string) => void;
  showReset?: boolean;
  isLoading?: boolean;
}

export const MatchScheduleFilters = ({
  searchTerm,
  onSearchTermChange,
  selectedDate,
  onSelectedDateChange,
  showReset = false,
  isLoading = false,
}: MatchScheduleFiltersProps) => {
  const t = useTranslations("match.filters");
  const locale = useLocale();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };
  const handleDateReset = () => {
    onSelectedDateChange("");
  };
  const handleCalendarChange = (value: CalendarProps["value"]) => {
    if (Array.isArray(value)) {
      const [firstValue] = value;
      onSelectedDateChange(firstValue ? format(firstValue, "yyyy-MM-dd") : "");
      setIsCalendarOpen(false);
      return;
    }

    onSelectedDateChange(value ? format(value, "yyyy-MM-dd") : "");
    setIsCalendarOpen(false);
  };
  const selectedDateValue = selectedDate
    ? new Date(`${selectedDate}T00:00:00`)
    : null;
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const displayDateLabel = selectedDate
    ? dateFormatter.format(new Date(`${selectedDate}T00:00:00Z`))
    : dateFormatter.format(new Date());

  useEffect(() => {
    if (!isCalendarOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        event.target instanceof Node &&
        !calendarRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  return (
    <section className='relative z-40 overflow-visible bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-6 mb-10'>
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
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
        <div className='relative space-y-3' ref={calendarRef}>
          <div className='flex items-center justify-between gap-3'>
            <div>
              <p className='text-xs uppercase tracking-[0.3em] text-slate-400'>
                {t("dateLabel")}
              </p>
              <button
                type='button'
                onClick={() => setIsCalendarOpen((previous) => !previous)}
                className='mt-1 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-800/50 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
                aria-expanded={isCalendarOpen}
                aria-haspopup='dialog'
                disabled={isLoading}
              >
                {displayDateLabel}
                {isLoading ? (
                  <span className='text-xs font-semibold text-emerald-200'>
                    {t("loading")}
                  </span>
                ) : null}
              </button>
            </div>
            {showReset ? (
              <button
                type='button'
                onClick={handleDateReset}
                className='shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-emerald-400/40 hover:text-white'
                disabled={isLoading}
              >
                {t("resetDate")}
              </button>
            ) : null}
          </div>
          {isCalendarOpen ? (
            <div className='absolute left-0 top-full z-[9999] mt-2 w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900/95 p-3 shadow-2xl'>
              <Calendar
                locale={locale}
                onChange={handleCalendarChange}
                value={selectedDateValue}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
