import { NewsListItem } from "@/shared/api/epl/model/news";
import { NewsCard } from "@/entities/news/ui/news-card";

interface NewsGridProps {
  articles: NewsListItem[];
  resolveHref: (article: NewsListItem) => string;
  emptyLabel: string;
  readMoreLabel: string;
}

export const NewsGrid = ({
  articles,
  resolveHref,
  emptyLabel,
  readMoreLabel,
}: NewsGridProps) => {
  if (articles.length === 0) {
    return (
      <div className='rounded-3xl border border-white/10 bg-slate-950/60 p-12 text-center text-slate-400'>
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className='grid gap-8 lg:grid-cols-2'>
      {articles.map((article, index) => (
        <NewsCard
          key={article.id}
          article={article}
          href={resolveHref(article)}
          readMoreLabel={readMoreLabel}
          className={index === 0 ? "lg:col-span-2" : undefined}
        />
      ))}
    </div>
  );
};
