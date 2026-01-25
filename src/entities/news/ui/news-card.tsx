"use client";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { NewsListItem } from "@/shared/api/epl/model/news";

const newsDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "short",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});

interface NewsCardProps {
  article: NewsListItem;
  href: string;
  readMoreLabel: string;
}

export const NewsCard = ({ article, href, readMoreLabel }: NewsCardProps) => {
  const showImage = Boolean(article.thumbnail);
  const authorLabel =
    article.author && article.author.length > 0
      ? article.author.join(", ")
      : null;

  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={clsx(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl transition hover:border-emerald-400/30 hover:bg-slate-900/70",
      )}
    >
      {showImage && (
        <div className='relative aspect-[16/9] w-full overflow-hidden'>
          <Image
            src={article.thumbnail!}
            alt={article.title}
            fill
            sizes='100vw'
            className='object-cover transition duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent' />
        </div>
      )}

      <div
        className={clsx(
          "flex flex-1 flex-col gap-4 p-6 sm:p-8",
          showImage
            ? ""
            : "bg-gradient-to-br from-emerald-950/60 to-slate-950/60",
        )}
      >
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400'>
          {authorLabel && <span>{authorLabel}</span>}
          <span>{newsDateFormatter.format(new Date(article.publishDate))}</span>
          <span className='text-emerald-500'>{article.source}</span>
        </div>

        <div className='space-y-3'>
          <h3 className='text-2xl font-semibold text-white transition group-hover:text-emerald-300 sm:text-3xl'>
            {article.title}
          </h3>
          <p className='text-base leading-relaxed text-slate-300 line-clamp-3 sm:text-lg'>
            {article.content}
          </p>
        </div>

        <span className='mt-auto inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition group-hover:gap-3'>
          {readMoreLabel}
          <span
            aria-hidden
            className='transition-transform group-hover:translate-x-1'
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
};
