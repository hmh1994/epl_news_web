"use client";

import { NewsArticle, NewsArticlePreview } from "@/entities/news/model/news-article";
import { NewsDetailHero } from "@/entities/news/ui/news-detail-hero";
import { NewsRelatedList } from "@/features/news-detail";
import { useTranslations } from "next-intl";

interface NewsDetailPageProps {
  article: NewsArticle;
  locale: string;
  relatedArticles: NewsArticlePreview[];
}

const publishDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export const NewsDetailPage = ({
  article,
  locale,
  relatedArticles,
}: NewsDetailPageProps) => {
  const detailT = useTranslations("news.detail");
  const basePath = locale ? `/${locale}` : "";
  const resolveHref = (candidate: NewsArticlePreview) =>
    `${basePath}/news/${candidate.slug}`;

  const quickHighlights = article.content;
  const formattedPublishedAt = publishDateFormatter.format(
    new Date(article.publishedAt)
  );

  const heroReadingTime = article.readingTimeMinutes
    ? detailT("heroReadingTime", { minutes: article.readingTimeMinutes })
    : undefined;
  const quickLookReadingTime = article.readingTimeMinutes
    ? detailT("quickLookReadingTime", { minutes: article.readingTimeMinutes })
    : undefined;

  return (
    <div className='mx-auto w-full max-w-5xl px-6 pb-16 pt-28 lg:px-10'>
      <div className='space-y-10'>
        <NewsDetailHero article={article} readingTimeLabel={heroReadingTime} />

        <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]'>
          <div className='space-y-6'>
            <section className='rounded-3xl border border-white/10 bg-slate-900/40 p-8 text-sm text-slate-300 shadow-xl shadow-emerald-500/5'>
              <h2 className='text-lg font-semibold text-white'>
                {detailT("quickLookTitle")}
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
                {quickLookReadingTime && <p>{quickLookReadingTime}</p>}
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
                {detailT("externalLink")}
                <span aria-hidden className='text-base'>↗</span>
              </a>
            )}
          </div>

          <aside>
            <NewsRelatedList
              title={detailT("relatedTitle")}
              articles={relatedArticles}
              resolveHref={resolveHref}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};
