"use client";

import React from "react";

export const TeamInfoFooter = () => (
  <footer className='bg-slate-950 border-t border-white/10'>
    <div className='max-w-7xl mx-auto px-6 py-16'>
      <div className='text-center'>
        <div className='flex items-center justify-center space-x-3 mb-6'>
          <div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-2xl text-white'>
            ⚽
          </div>
          <span className='text-3xl font-semibold text-white'>EPL Hub</span>
        </div>
        <p className='text-slate-400 mb-8 max-w-2xl mx-auto'>
          세계 최고의 축구 리그, 프리미어리그의 모든 데이터를 누구나 쉽게 탐색할 수 있도록 돕는 정보 허브입니다.
        </p>
        <div className='text-sm text-slate-500'>
          © 2024 EPL Hub. Football Analytics Playground.
        </div>
      </div>
    </div>
  </footer>
);
