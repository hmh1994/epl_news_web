"use client";

import React from "react";
import { Globe } from "lucide-react";

export const LeagueOverviewHeader = () => (
  <header className='relative z-40 mt-16 bg-slate-900/90 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-3xl'>
    <div className='max-w-7xl mx-auto px-6 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-6'>
          <div className='relative'>
            <div className='w-14 h-14 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-3xl flex items-center justify-center text-2xl shadow-2xl'>
              ⚽
            </div>
            <div className='absolute -inset-1 bg-gradient-to-br from-[#169976] via-emerald-600 to-teal-600 rounded-3xl blur opacity-40 animate-pulse'></div>
          </div>
          <div>
            <span className='text-4xl font-black bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
              League Central
            </span>
            <div className='text-sm text-slate-400 font-medium flex items-center space-x-2'>
              <Globe className='w-4 h-4' />
              <span>Global Football Intelligence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);
