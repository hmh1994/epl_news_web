"use client";

import React from "react";
import { Trophy, Zap } from "lucide-react";

export const TeamInfoHero = () => (
  <section className='relative py-20 overflow-hidden'>
    <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-slate-900'></div>
    <div className='absolute inset-0 opacity-20'>
      <div className='absolute top-1/4 left-1/4 w-96 h-96 bg-[#169976] rounded-full mix-blend-multiply filter blur-3xl animate-pulse'></div>
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000'></div>
    </div>

    <div className='relative z-10 max-w-7xl mx-auto px-6 text-center'>
      <div className='inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 text-sm font-semibold text-white/90 mb-8'>
        <Trophy className='w-5 h-5 text-yellow-400' />
        <span>Premier League Teams</span>
        <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
      </div>

      <h1 className='text-7xl md:text-8xl font-black mb-8 leading-none'>
        <span className='bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
          Deep Team
        </span>
        <br />
        <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
          Analytics
        </span>
      </h1>

      <p className='text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed'>
        프리미어리그 20개 팀의 심층 분석과 실시간 데이터를 통해
        <br />축구의 새로운 차원을 경험하세요
      </p>

      <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
        <button className='group relative px-12 py-6 bg-gradient-to-r from-[#169976] via-emerald-600 to-teal-600 rounded-2xl text-white text-xl font-bold shadow-2xl hover:scale-105 transform transition-all duration-300 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000'></div>
          <div className='relative flex items-center space-x-3'>
            <Zap className='w-6 h-6' />
            <span>팀 분석 시작</span>
          </div>
        </button>
      </div>
    </div>
  </section>
);
