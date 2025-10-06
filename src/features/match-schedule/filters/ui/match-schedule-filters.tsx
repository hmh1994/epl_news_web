import { ChangeEvent } from "react";
import { Filter, Search, Tv } from "lucide-react";

interface MatchScheduleFiltersProps {
  matchweeks: number[];
  selectedMatchweek: number;
  onMatchweekChange: (matchweek: number) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  showBroadcastOnly: boolean;
  onToggleBroadcast: () => void;
}

export const MatchScheduleFilters = ({
  matchweeks,
  selectedMatchweek,
  onMatchweekChange,
  searchTerm,
  onSearchTermChange,
  showBroadcastOnly,
  onToggleBroadcast,
}: MatchScheduleFiltersProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value);
  };

  return (
    <section className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl p-6 mb-10'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4'>
        <div className='lg:col-span-2 relative'>
          <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
          <input
            type='text'
            placeholder='팀 이름, 경기장, 도시 검색'
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className='lg:col-span-1'>
          <div className='flex items-center space-x-2 text-slate-400 text-sm mb-2'>
            <Filter className='w-4 h-4' />
            <span>Matchweek</span>
          </div>
          <div className='relative'>
            <div
              className='flex items-center gap-2 overflow-x-auto pb-1 pl-2 pr-6 [scrollbar-width:thin] [scrollbar-color:#169976_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#169976] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-emerald-400'
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
                    MW {matchweek}
                  </button>
                );
              })}
            </div>
            <div className='pointer-events-none absolute left-0 top-0 bottom-2 w-6 bg-gradient-to-r from-slate-950 via-slate-900/70 to-transparent rounded-l-3xl'></div>
            <div className='pointer-events-none absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-slate-950 via-slate-900/70 to-transparent rounded-r-3xl'></div>
          </div>
        </div>

        <div className='lg:col-span-1'>
          <div className='flex items-center space-x-2 text-slate-400 text-sm mb-2'>
            <Tv className='w-4 h-4' />
            <span>중계 여부</span>
          </div>
          <button
            type='button'
            onClick={onToggleBroadcast}
            className={`w-full px-4 py-4 rounded-2xl font-semibold transition-all flex items-center justify-center space-x-3 ${
              showBroadcastOnly
                ? "bg-[#169976] text-white shadow-lg"
                : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            <Tv className='w-5 h-5' />
            <span>{showBroadcastOnly ? "중계 경기만" : "모든 경기"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
