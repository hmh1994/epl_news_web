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
      <div className='rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-300'>
        <h2 className='text-lg font-semibold text-white'>{keywordsTitle}</h2>
        <ul className='mt-4 space-y-2 text-sm'>
          {keywords.map((label) => (
            <li key={label}>· {label}</li>
          ))}
        </ul>
      </div>

      {trendingArticles.length > 0 && (
        <section className='space-y-4'>
          <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-300'>
            {trendingTitle}
          </h3>
          <div className='space-y-4'>
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
