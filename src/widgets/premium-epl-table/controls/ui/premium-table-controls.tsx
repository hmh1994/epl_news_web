"use client";

import React from "react";
import { Search } from "lucide-react";

type PremiumTableControlsProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export const PremiumTableControls = ({
  searchTerm,
  onSearchChange,
}: PremiumTableControlsProps) => (
  <div className='mb-12'>
    <div className='bg-slate-950/60 rounded-3xl p-8 border border-white/10 shadow-[0_18px_40px_rgba(2,6,23,0.35)]'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500' />
          <input
            type='text'
            placeholder='팀 또는 약어로 검색 (예: Arsenal, ARS)...'
            aria-label='팀 검색'
            name='team-search'
            autoComplete='off'
            className='w-full bg-slate-900/60 border border-white/10 rounded-2xl pl-14 pr-5 py-5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/20 transition-colors text-lg'
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <div className='flex items-center space-x-3 bg-slate-900/60 rounded-2xl px-4 py-3 border border-white/10'>
            <div className='w-2.5 h-2.5 bg-emerald-300/70 rounded-full'></div>
            <span className='text-slate-300 font-medium text-sm'>
              Champions League
            </span>
          </div>
          <div className='flex items-center space-x-3 bg-slate-900/60 rounded-2xl px-4 py-3 border border-white/10'>
            <div className='w-2.5 h-2.5 bg-teal-300/70 rounded-full'></div>
            <span className='text-slate-300 font-medium text-sm'>Europa League</span>
          </div>
          <div className='flex items-center space-x-3 bg-slate-900/60 rounded-2xl px-4 py-3 border border-white/10'>
            <div className='w-2.5 h-2.5 bg-red-300/70 rounded-full'></div>
            <span className='text-slate-300 font-medium text-sm'>Relegation Zone</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
