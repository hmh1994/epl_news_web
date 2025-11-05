import { NewsArticlePreview } from "@/entities/news/model/news-article";
import { NewsCard } from "@/entities/news/ui/news-card";

interface NewsGridProps {
  articles: NewsArticlePreview[];
  resolveHref: (article: NewsArticlePreview) => string;
}

export const NewsGrid = ({ articles, resolveHref }: NewsGridProps) => {
  if (articles.length === 0) {
    return (
      <div className='rounded-3xl border border-white/10 bg-slate-900/50 p-12 text-center text-slate-400'>
        현재 표시할 뉴스가 없습니다.
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
        />
      ))}
    </div>
  );
};
