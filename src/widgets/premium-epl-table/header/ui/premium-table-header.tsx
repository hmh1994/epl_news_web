"use client";

import React from "react";
import { Calendar, Users, Trophy } from "lucide-react";

type PremiumTableHeaderProps = {
  isScrolled: boolean;
};

export const PremiumTableHeader = ({ isScrolled }: PremiumTableHeaderProps) => (
  <header
    className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled
        ? "bg-slate-900/80 backdrop-blur-3xl border-b border-white/10 shadow-2xl"
        : "bg-transparent"
    }`}
  >
    <div className='max-w-7xl mx-auto px-6 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4 sm:space-x-6'>
          <div className='relative'>
            <div className='w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#64748b] via-slate-500 to-slate-600 rounded-2xl sm:rounded-3xl flex items-center justify-center text-lg sm:text-2xl shadow-2xl'>
              ⚽
            </div>
            <div className='absolute -inset-1 bg-gradient-to-br from-[#64748b] via-slate-500 to-slate-600 rounded-2xl sm:rounded-3xl blur opacity-40 animate-pulse'></div>
          </div>
          <div>
            <span className='text-2xl sm:text-4xl font-black bg-gradient-to-r from-white via-slate-200 to-slate-200 bg-clip-text text-transparent'>
              EPL Analytics
            </span>
            <div className='text-sm text-slate-400 font-medium flex items-center space-x-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
              <span>Live Premier League Data</span>
            </div>
          </div>
        </div>

        <div className='hidden lg:flex items-center space-x-8 text-sm'>
          <div className='flex items-center space-x-2 text-slate-300'>
            <Calendar className='w-4 h-4' />
            <span>2023-24 Season</span>
          </div>
          <div className='flex items-center space-x-2 text-slate-300'>
            <Users className='w-4 h-4' />
            <span>20 Teams</span>
          </div>
          <div className='flex items-center space-x-2 text-slate-300'>
            <Trophy className='w-4 h-4' />
            <span>380 Matches</span>
          </div>
        </div>
      </div>
    </div>
  </header>
);
