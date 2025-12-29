import { ForwardedRef, forwardRef } from "react";
import { NewsListItem } from "@/shared/api/epl/model/news";
import { NewsGrid } from "@/features/news";

interface NewsArticlesSectionProps {
  articles: NewsListItem[];
  resolveHref: (article: NewsListItem) => string;
  emptyLabel: string;
  readMoreLabel: string;
  loadingLabel: string;
  completedLabel: string;
  isLoading: boolean;
  hasMore: boolean;
}

export const NewsArticlesSection = forwardRef(function NewsArticlesSection(
  {
    articles,
    resolveHref,
    emptyLabel,
    readMoreLabel,
    loadingLabel,
    completedLabel,
    isLoading,
    hasMore,
  }: NewsArticlesSectionProps,
  sentinelRef: ForwardedRef<HTMLDivElement>
) {
  return (
    <section className='space-y-8'>
      <NewsGrid
        articles={articles}
        resolveHref={resolveHref}
        emptyLabel={emptyLabel}
        readMoreLabel={readMoreLabel}
      />

      {isLoading && (
        <div className='flex items-center justify-center gap-3 text-sm text-slate-400'>
          <span className='inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400' />
          <span>{loadingLabel}</span>
        </div>
      )}

      <div ref={sentinelRef} className='h-1 w-full opacity-0' aria-hidden='true' />

      {!hasMore && !isLoading && (
        <p className='text-center text-sm text-slate-500'>{completedLabel}</p>
      )}
    </section>
  );
});
