import { NewsArticlePreview } from "@/entities/news/model/news-article";
import { NewsSidebarCard } from "@/entities/news/ui/news-sidebar-card";

interface NewsRelatedListProps {
  articles: NewsArticlePreview[];
  resolveHref: (article: NewsArticlePreview) => string;
  title?: string;
}

export const NewsRelatedList = ({
  articles,
  resolveHref,
  title = "최신 소식",
}: NewsRelatedListProps) => {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className='space-y-4'>
      <h3 className='text-sm font-semibold uppercase tracking-wide text-slate-300'>
        {title}
      </h3>
      <div className='space-y-4'>
        {articles.map((article) => (
          <NewsSidebarCard
            key={article.id}
            article={article}
            href={resolveHref(article)}
          />
        ))}
      </div>
    </section>
  );
};
