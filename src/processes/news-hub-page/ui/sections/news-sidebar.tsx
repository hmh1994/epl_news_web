import { NewsListItem } from "@/shared/api/epl/model/news";
import { NewsListSidebarCard } from "@/entities/news/ui/news-list-sidebar-card";

interface NewsSidebarProps {
  keywordsTitle: string;
  keywords: string[];
  trendingTitle: string;
  trendingArticles: NewsListItem[];
  resolveHref: (article: NewsListItem) => string;
}

export const NewsSidebar = ({
  keywordsTitle,
  keywords,
  trendingTitle,
  trendingArticles,
  resolveHref,
}: NewsSidebarProps) => {
  return (
    <aside className='space-y-8'>
      <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-6 text-sm text-slate-300'>
        <h2 className='text-lg font-semibold text-white'>{keywordsTitle}</h2>
        <div className='mt-4 flex flex-wrap gap-2 text-xs'>
          {keywords.map((label) => (
            <span
              key={label}
              className='rounded-full border border-white/10 bg-slate-900/60 px-3 py-1 text-slate-300'
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      {trendingArticles.length > 0 && (
        <section className='rounded-3xl border border-white/10 bg-slate-950/60 p-6'>
          <h3 className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-300'>
            {trendingTitle}
          </h3>
          <div className='mt-4 space-y-4'>
            {trendingArticles.map((article) => (
              <NewsListSidebarCard
                key={article.id}
                article={article}
                href={resolveHref(article)}
              />
            ))}
          </div>
        </section>
      )}
    </aside>
  );
};
