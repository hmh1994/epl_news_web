import { NewsArticlePreview } from "@/entities/news/model/news-article";
import { NewsRelatedList } from "@/features/news-detail";

interface NewsSidebarProps {
  keywordsTitle: string;
  keywords: string[];
  trendingTitle: string;
  trendingArticles: NewsArticlePreview[];
  resolveHref: (article: NewsArticlePreview) => string;
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

      <NewsRelatedList
        title={trendingTitle}
        articles={trendingArticles}
        resolveHref={resolveHref}
      />
    </aside>
  );
};
