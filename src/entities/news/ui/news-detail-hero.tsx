import { NewsArticle } from "../model/news-article";

const heroDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "long",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});

interface NewsDetailHeroProps {
  article: NewsArticle;
}

export const NewsDetailHero = ({ article }: NewsDetailHeroProps) => {
  return (
    <section className='relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-950/90 via-slate-950 to-slate-950'>
      <div className='relative z-10 flex flex-col gap-6 px-8 py-12 sm:px-12 lg:px-16'>
        <div className='flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-emerald-200'>
          <span className='rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1'>
            {article.category}
          </span>
          <span>{article.source}</span>
          {article.author && <span>{article.author}</span>}
          <span>{heroDateFormatter.format(new Date(article.publishedAt))}</span>
          {article.readingTimeMinutes && (
            <span>{`${article.readingTimeMinutes}분 읽기`}</span>
          )}
        </div>

        <h1 className='max-w-4xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl'>
          {article.title}
        </h1>

        <p className='max-w-2xl text-base text-slate-200 sm:text-lg'>
          {article.summary}
        </p>

        {article.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 text-xs text-emerald-100'>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full border border-white/20 bg-white/10 px-3 py-1 font-medium uppercase tracking-wide'
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950' />
    </section>
  );
};
