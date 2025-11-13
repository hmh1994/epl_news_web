import { NewsArticlePreview } from "@/entities/news/model/news-article";
import { NewsCard } from "@/entities/news/ui/news-card";

interface NewsGridProps {
  articles: NewsArticlePreview[];
  resolveHref: (article: NewsArticlePreview) => string;
  emptyLabel: string;
  readMoreLabel: string;
  formatReadingTime?: (minutes: number) => string;
}

export const NewsGrid = ({
  articles,
  resolveHref,
  emptyLabel,
  readMoreLabel,
  formatReadingTime,
}: NewsGridProps) => {
  if (articles.length === 0) {
    return (
      <div className='rounded-3xl border border-white/10 bg-slate-900/50 p-12 text-center text-slate-400'>
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      {articles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          href={resolveHref(article)}
          readMoreLabel={readMoreLabel}
          readingTimeLabel={
            article.readingTimeMinutes && formatReadingTime
              ? formatReadingTime(article.readingTimeMinutes)
              : undefined
          }
        />
      ))}
    </div>
  );
};
