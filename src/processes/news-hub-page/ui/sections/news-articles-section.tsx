import { ForwardedRef, forwardRef } from "react";
import { NewsArticlePreview } from "@/entities/news/model/news-article";
import { NewsGrid } from "@/features/news";

interface NewsArticlesSectionProps {
  articles: NewsArticlePreview[];
  resolveHref: (article: NewsArticlePreview) => string;
  emptyLabel: string;
  readMoreLabel: string;
  formatReadingTime: (minutes: number) => string;
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
    formatReadingTime,
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
        formatReadingTime={formatReadingTime}
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
