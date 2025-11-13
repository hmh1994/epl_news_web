"use client";

import { ChangeEvent } from "react";
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
    <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-6 border border-white/10 shadow-2xl mb-8'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
        <div className='lg:col-span-3'>
          <select
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-emerald-400'
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

        <div className='lg:col-span-3'>
          <select
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl px-4 py-4 text-white focus:outline-none focus:border-emerald-400'
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

        <div className='lg:col-span-5 relative'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
          <input
            type='text'
            placeholder={t("searchPlaceholder")}
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20'
            value={searchTerm}
            onChange={handleSearchInput}
          />
        </div>

        <div className='lg:col-span-1 flex items-center justify-start lg:justify-end gap-2 lg:pl-2'>
          <button
            type='button'
            onClick={() => onViewModeChange("grid")}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${
              viewMode === "grid"
                ? "bg-[#169976] text-white"
                : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            <Grid className='w-5 h-5 mx-auto' />
          </button>
          <button
            type='button'
            onClick={() => onViewModeChange("list")}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${
              viewMode === "list"
                ? "bg-[#169976] text-white"
                : "bg-slate-800/50 text-slate-400 hover:text-white"
            }`}
          >
            <List className='w-5 h-5 mx-auto' />
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
                className='flex items-center space-x-2 bg-[#169976]/20 border border-emerald-400/40 text-emerald-300 px-4 py-2 rounded-xl text-sm font-medium'
              >
                <span>{label}</span>
                <button
                  type='button'
                  onClick={() => onFilterRemove(filter)}
                  className='hover:text-white'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            );
          })}
          <button
            type='button'
            onClick={onClearFilters}
            className='text-slate-400 hover:text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-slate-800/50'
          >
            {t("clearAll")}
          </button>
        </div>
      )}
    </div>
  );
};
