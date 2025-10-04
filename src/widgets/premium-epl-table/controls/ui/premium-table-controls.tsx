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
    <div className='bg-slate-900/40 backdrop-blur-3xl rounded-3xl p-8 border border-white/10 shadow-2xl'>
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400' />
          <input
            type='text'
            placeholder='팀 또는 약어로 검색 (예: Arsenal, ARS)...'
            className='w-full bg-slate-800/50 border border-white/10 rounded-2xl pl-14 pr-5 py-5 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all text-lg'
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className='flex flex-wrap gap-4 items-center'>
          <div className='flex items-center space-x-3 bg-slate-800/30 rounded-2xl px-4 py-3 border border-white/10'>
            <div className='w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50'></div>
            <span className='text-slate-300 font-medium text-sm'>
              Champions League
            </span>
          </div>
          <div className='flex items-center space-x-3 bg-slate-800/30 rounded-2xl px-4 py-3 border border-white/10'>
            <div className='w-3 h-3 bg-teal-400 rounded-full shadow-lg shadow-emerald-400/50'></div>
            <span className='text-slate-300 font-medium text-sm'>Europa League</span>
          </div>
          <div className='flex items-center space-x-3 bg-slate-800/30 rounded-2xl px-4 py-3 border border-white/10'>
            <div className='w-3 h-3 bg-red-400 rounded-full shadow-lg shadow-red-400/50'></div>
            <span className='text-slate-300 font-medium text-sm'>Relegation Zone</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
