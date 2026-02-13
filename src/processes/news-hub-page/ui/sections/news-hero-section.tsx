interface NewsHeroSectionProps {
  badgeLabel: string;
  headline: string;
}

export const NewsHeroSection = ({ badgeLabel, headline }: NewsHeroSectionProps) => (
  <div className='mb-12 space-y-5'>
    <p className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-200'>
      {badgeLabel}
    </p>
    <h1 className='max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl'>
      {headline}
    </h1>
  </div>
);
