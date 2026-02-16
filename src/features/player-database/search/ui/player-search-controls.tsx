"use client";

import { ChangeEvent, ReactNode } from "react";
import { Search, Grid, List, X } from "lucide-react";
import { PlayerFilter, ViewMode } from "@/features/player-database/types";
import { useTranslations } from "next-intl";

interface PlayerSearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedPosition: string;
  onPositionChange: (value: string) => void;
  selectedTeam: string;
  onTeamChange: (value: string) => void;
  positionOptions: readonly string[];
  teamOptions: readonly string[];
  formatTeamOption?: (value: string) => string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  activeFilters: PlayerFilter[];
  onFilterRemove: (filter: PlayerFilter) => void;
  onClearFilters: () => void;
  children?: ReactNode;
  onSearchSubmit: () => void;
  isSearching?: boolean;
}

export const PlayerSearchControls = ({
  searchTerm,
  onSearchChange,
  selectedPosition,
  onPositionChange,
  selectedTeam,
  onTeamChange,
  positionOptions,
  teamOptions,
  formatTeamOption,
  viewMode,
  onViewModeChange,
  activeFilters,
  onFilterRemove,
  onClearFilters,
  children,
  onSearchSubmit,
  isSearching = false,
}: PlayerSearchControlsProps) => {
  const t = useTranslations("player.search");
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const renderTeamOption = (team: string) => {
    if (team === "all") {
      return t("allTeams");
    }
    return formatTeamOption ? formatTeamOption(team) : team;
  };

  return (
    <div className='bg-slate-950/60 rounded-3xl p-6 border border-white/10 shadow-[0_18px_40px_rgba(2,6,23,0.35)] mb-10'>
      <div className='flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center'>
        <div className='lg:flex-[0_0_220px]'>
          <select
            aria-label={t("allPositions")}
            name='position'
            className='w-full h-12 bg-slate-900/60 border border-white/10 rounded-2xl px-4 text-white focus:outline-none focus:border-slate-400/40 focus:ring-1 focus:ring-slate-400/20'
            value={selectedPosition}
            onChange={(event) => onPositionChange(event.target.value)}
          >
            {positionOptions.map((pos) => (
              <option key={pos} value={pos}>
                {pos === "all" ? t("allPositions") : pos}
              </option>
            ))}
          </select>
        </div>

        <div className='lg:flex-[0_0_220px]'>
          <select
            aria-label={t("allTeams")}
            name='team'
            className='w-full h-12 bg-slate-900/60 border border-white/10 rounded-2xl px-4 text-white focus:outline-none focus:border-slate-400/40 focus:ring-1 focus:ring-slate-400/20'
            value={selectedTeam}
            onChange={(event) => onTeamChange(event.target.value)}
          >
            {teamOptions.map((team) => (
              <option key={team} value={team}>
                {renderTeamOption(team)}
              </option>
            ))}
          </select>
        </div>

        <div className='relative lg:flex-1 min-w-[200px]'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500' />
          <input
            type='text'
            placeholder={t("searchPlaceholder")}
            aria-label={t("searchPlaceholder")}
            name='player-search'
            autoComplete='off'
            className='w-full h-12 bg-slate-900/60 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400/40 focus:ring-1 focus:ring-slate-400/20'
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onSearchSubmit();
              }
            }}
          />
        </div>

        <div className='flex items-center gap-3 lg:ml-auto'>
          <button
            type='button'
            onClick={onSearchSubmit}
            disabled={isSearching}
            className={`h-12 rounded-2xl px-4 text-sm font-semibold whitespace-nowrap transition-colors border ${
              isSearching
                ? "bg-slate-800/60 text-slate-500 border-white/5 cursor-not-allowed"
                : "bg-slate-500/15 text-slate-100 border-slate-400/30 hover:bg-slate-500/25"
            }`}
          >
            {isSearching ? "조회중" : "조회"}
          </button>
          <button
            type='button'
            onClick={() => onViewModeChange("grid")}
            aria-label={t("gridView")}
            aria-pressed={viewMode === "grid"}
            className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors border ${
              viewMode === "grid"
                ? "bg-slate-500/15 text-slate-100 border-slate-400/30"
                : "bg-slate-900/60 text-slate-400 border-white/10 hover:text-white"
            }`}
          >
            <Grid className='w-5 h-5 mx-auto' aria-hidden='true' />
          </button>
          <button
            type='button'
            onClick={() => onViewModeChange("list")}
            aria-label={t("listView")}
            aria-pressed={viewMode === "list"}
            className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors border ${
              viewMode === "list"
                ? "bg-slate-500/15 text-slate-100 border-slate-400/30"
                : "bg-slate-900/60 text-slate-400 border-white/10 hover:text-white"
            }`}
          >
            <List className='w-5 h-5 mx-auto' aria-hidden='true' />
          </button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className='flex flex-wrap gap-2 mt-4'>
          {activeFilters.map((filter) => {
            const label = filter.type === "team"
              ? renderTeamOption(filter.value)
              : filter.type === "position"
              ? filter.value
              : filter.value;

            return (
          <div
            key={`${filter.type}-${filter.value}`}
            className='flex items-center space-x-2 bg-slate-500/10 border border-slate-400/30 text-slate-200 px-4 py-2 rounded-xl text-sm font-medium'
          >
            <span>{label}</span>
            <button
                  type='button'
                  onClick={() => onFilterRemove(filter)}
                  aria-label={`${t("removeFilter")} ${label}`}
                  className='hover:text-white'
                >
                  <X className='w-4 h-4' aria-hidden='true' />
                </button>
              </div>
            );
          })}
          <button
            type='button'
            onClick={onClearFilters}
            className='text-slate-400 hover:text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-900/60'
          >
            {t("clearAll")}
          </button>
        </div>
      )}

      {children && (
        <div className='mt-6 pt-6 border-t border-white/10'>{children}</div>
      )}
    </div>
  );
};
