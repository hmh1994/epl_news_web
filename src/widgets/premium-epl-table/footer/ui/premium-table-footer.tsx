"use client";

import React from "react";

export const PremiumTableFooter = () => (
  <footer className='border-t border-white/10 mt-20 bg-slate-950'>
    <div className='max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-14'>
      <div className='text-center'>
        <div className='flex items-center justify-center space-x-4 mb-6'>
          <div className='w-10 h-10 sm:w-14 sm:h-14 rounded-2xl border border-white/10 bg-slate-900/60 flex items-center justify-center text-xl sm:text-2xl'>
            ⚽
          </div>
          <div>
            <span className='text-2xl sm:text-3xl font-semibold text-white'>
              EPL Analytics
            </span>
            <div className='text-slate-400 text-sm'>Professional Football Intelligence</div>
          </div>
        </div>
        <p className='text-slate-400 mb-6 max-w-3xl mx-auto text-base leading-relaxed'>
          프리미어리그의 모든 데이터와 통계를 실시간으로 분석하여 제공하는 차세대 축구 분석 플랫폼입니다. xG, 패스 정확도, 점유율 등 고급 메트릭으로 더 깊이 있는 축구를 경험하세요.
        </p>
        <div className='flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500'>
          <div className='flex items-center space-x-2'>
            <div className='w-2 h-2 bg-slate-300/70 rounded-full'></div>
            <span>실시간 업데이트</span>
          </div>
          <div>© 2024 EPL Analytics Platform</div>
          <div>Advanced Football Intelligence</div>
        </div>
      </div>
    </div>
  </footer>
);
