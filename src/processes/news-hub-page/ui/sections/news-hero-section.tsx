interface NewsHeroSectionProps {
  badgeLabel: string;
  headline: string;
}

export const NewsHeroSection = ({ badgeLabel, headline }: NewsHeroSectionProps) => (
  <div className='mb-10 space-y-4'>
    <p className='inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200'>
      {badgeLabel}
    </p>
    <h1 className='text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>
      {headline}
    </h1>
  </div>
);
