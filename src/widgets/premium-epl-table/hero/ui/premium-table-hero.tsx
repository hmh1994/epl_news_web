"use client";

import React from "react";
import { BarChart3, Zap } from "lucide-react";

export const PremiumTableHero = () => {
  return (
    <section className='relative pt-28 pb-14'>
      <div className='relative z-10 max-w-7xl mx-auto px-6'>
        <div className='text-center'>
          <div className='inline-flex items-center space-x-3 rounded-full border border-white/10 bg-slate-900/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 mb-6'>
            <BarChart3 className='w-4 h-4 text-emerald-200' />
            <span>Advanced Analytics Dashboard</span>
            <Zap className='w-3.5 h-3.5 text-amber-200' />
          </div>

          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6 leading-tight tracking-tight'>
            <span className='text-white'>Premier League</span>
            <br />
            <span className='text-emerald-200'>Intelligence</span>
          </h1>

          <p className='text-lg text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed'>
            실시간 xG, 패스 정확도, 점유율까지 포함한 차세대 축구 데이터 분석
          </p>
        </div>
      </div>
    </section>
  );
};
