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
      <div className='rounded-3xl border border-white/10 bg-slate-900/50 p-12 text-center text-slate-400'>
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      {articles.map((article) => {
        console.log(resolveHref(article), article);
        return (
          <NewsCard
            key={article.id}
            article={article}
            href={resolveHref(article)}
            readMoreLabel={readMoreLabel}
          />
        );
      })}
    </div>
  );
};
