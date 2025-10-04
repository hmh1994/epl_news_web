"use client";

import React from "react";
import { Trophy, Zap } from "lucide-react";

export const LeagueOverviewHero = () => (
  <section className='relative pt-28 pb-20 overflow-hidden'>
    <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900'></div>
    <div className='absolute inset-0 opacity-30'>
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
    </div>

    <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
      <div className='inline-flex items-center space-x-3 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full px-8 py-4 text-sm font-semibold text-white/90 mb-8'>
        <Trophy className='w-5 h-5 text-yellow-400' />
        <span>Global League Analytics</span>
        <Zap className='w-4 h-4 text-yellow-400 animate-pulse' />
      </div>

      <h1 className='text-7xl md:text-8xl font-black mb-8 leading-none'>
        <span className='bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent'>
          League
        </span>
        <br />
        <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
          Intelligence
        </span>
      </h1>

      <p className='text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed'>
        전 세계 주요 리그의 실시간 순위, 통계, 역사를 한눈에
      </p>
    </div>
  </section>
);
