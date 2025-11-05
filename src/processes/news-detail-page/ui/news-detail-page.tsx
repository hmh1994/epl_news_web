import { NewsArticle } from "@/entities/news/model/news-article";
import { NewsDetailHero } from "@/entities/news/ui/news-detail-hero";
import { NewsRelatedList } from "@/features/news-detail";
import { EPL_NEWS_ARTICLES } from "@/shared/mocks/news/articles";

interface NewsDetailPageProps {
  article: NewsArticle;
  locale: string;
}

const publishDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});

const buildRelatedArticles = (article: NewsArticle) => {
  return EPL_NEWS_ARTICLES.filter(
    (candidate) =>
      candidate.id !== article.id && candidate.category === article.category
  ).slice(0, 3);
};

export const NewsDetailPage = ({ article, locale }: NewsDetailPageProps) => {
  const basePath = locale ? `/${locale}` : "";
  const related = buildRelatedArticles(article);
  const fallbackArticles = EPL_NEWS_ARTICLES.filter(
    (candidate) => candidate.id !== article.id
  ).slice(0, 4);
  const relatedFeed = related.length > 0 ? related : fallbackArticles;
  const resolveHref = (candidate: NewsArticle) =>
    `${basePath}/news/${candidate.slug}`;

  const quickHighlights = article.content;
  const formattedPublishedAt = publishDateFormatter.format(
    new Date(article.publishedAt)
  );

  return (
    <div className='mx-auto w-full max-w-5xl px-6 pb-16 pt-28 lg:px-10'>
      <div className='space-y-10'>
        <NewsDetailHero article={article} />

        <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]'>
          <div className='space-y-6'>
            <section className='rounded-3xl border border-white/10 bg-slate-900/40 p-8 text-sm text-slate-300 shadow-xl shadow-emerald-500/5'>
              <h2 className='text-lg font-semibold text-white'>
                기사 한눈에 보기
              </h2>
              <div className='mt-4 space-y-3 text-xs text-slate-400'>
                <p>
                  <span className='font-semibold text-emerald-200'>
                    {article.category}
                  </span>{" "}
                  · {article.source}
                </p>
                {article.author && <p>{article.author}</p>}
                <p>{formattedPublishedAt}</p>
                {article.readingTimeMinutes && (
                  <p>{`${article.readingTimeMinutes}분 소요`}</p>
                )}
              </div>
              <div className='mt-6 space-y-4 text-base leading-relaxed text-slate-200 sm:text-lg'>
                {quickHighlights.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>

            {article.externalUrl && (
              <a
                href={article.externalUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300/60 hover:text-white'
              >
                원문 기사 바로가기
                <span aria-hidden className='text-base'>↗</span>
              </a>
            )}
          </div>

          <aside>
            <NewsRelatedList
              title='함께 보면 좋은 소식'
              articles={relatedFeed}
              resolveHref={resolveHref}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};
