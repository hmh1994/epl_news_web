import { ArrowRight, Zap } from "lucide-react";

export const EplHubHero = () => {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-slate-900'></div>
        <div className='absolute top-0 left-0 w-full h-full opacity-30'>
          <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-[#169976] rounded-full mix-blend-multiply filter blur-xl animate-pulse'></div>
          <div className='absolute top-3/4 right-1/4 w-64 h-64 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000'></div>
          <div className='absolute bottom-1/4 left-1/3 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000'></div>
        </div>
      </div>

      <div className='relative z-10 text-center px-6 max-w-6xl'>
        <div className='mb-8'>
          <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 text-sm font-medium text-white/90 mb-6'>
            <Zap className='w-4 h-4 text-[#169976]' />
            <span>Real-time Premier League Analytics</span>
          </div>
          <h1 className='text-7xl md:text-8xl font-black mb-6 leading-tight'>
            <span className='bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent'>
              The Ultimate
            </span>
            <br />
            <span className='bg-gradient-to-r from-[#169976] via-emerald-400 to-teal-400 bg-clip-text text-transparent'>
              EPL Experience
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed'>
            실시간 데이터 분석과 AI 기반 인사이트로 프리미어리그의 모든 순간을 경험하세요
          </p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6'>
          <button className='group relative px-10 py-5 bg-gradient-to-r from-[#169976] via-emerald-600 to-teal-600 rounded-2xl text-white text-lg font-bold shadow-2xl hover:scale-105 transform transition-all duration-300 overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000'></div>
            <div className='relative flex items-center space-x-2'>
              <span>프리미엄 시작하기</span>
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </div>
          </button>

          <button className='group px-10 py-5 border-2 border-white/20 rounded-2xl text-white text-lg font-bold hover:bg-white/10 transition-all duration-300 backdrop-blur-xl'>
            <div className='flex items-center space-x-2'>
              <span>무료 체험</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
