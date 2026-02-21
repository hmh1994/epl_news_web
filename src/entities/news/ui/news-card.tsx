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
  className?: string;
}

const normalizeDateLabel = (value: string) =>
  value.replace(/,\s*/g, " ").replace(/\s+/g, " ").trim();

const SOURCE_ACCENT_COLORS: Record<string, string> = {
  BBC: "from-amber-500 to-amber-700",
  ESPN: "from-red-500 to-red-700",
  "Sky Sports": "from-sky-500 to-sky-700",
  Guardian: "from-blue-500 to-blue-700",
  Telegraph: "from-teal-500 to-teal-700",
};

const getSourceAccent = (source: string) =>
  SOURCE_ACCENT_COLORS[source] ?? "from-slate-500 to-slate-700";

export const NewsCard = ({
  article,
  href,
  readMoreLabel,
  className,
}: NewsCardProps) => {
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
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 transition-colors hover:border-slate-400/20 hover:bg-slate-950/80",
        className,
      )}
    >
      {showImage ? (
        <div className='relative aspect-[16/9] w-full overflow-hidden'>
          <Image
            src={article.thumbnail!}
            alt={article.title}
            fill
            sizes='100vw'
            className='object-cover transition duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent' />
        </div>
      ) : (
        <div className='flex items-center gap-3 px-4 pt-4 sm:px-6 sm:pt-6 md:px-8 md:pt-8'>
          <div className={`w-1 h-10 rounded-full bg-gradient-to-b ${getSourceAccent(article.source)}`} />
          <span className='text-xs font-bold uppercase tracking-widest text-slate-300'>
            {article.source}
          </span>
        </div>
      )}

      <div
        className={clsx(
          "flex flex-1 flex-col gap-4 p-4 sm:p-6 md:p-8",
          showImage
            ? ""
            : "bg-slate-950/40 pt-3 sm:pt-4 md:pt-5",
        )}
      >
        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400'>
          {authorLabel && <span>{authorLabel}</span>}
          <span>
            {normalizeDateLabel(
              newsDateFormatter.format(new Date(article.publishDate))
            )}
          </span>
          {showImage && <span className='text-slate-200'>{article.source}</span>}
        </div>

        <div className='space-y-3'>
          <h3 className='text-xl font-semibold text-white transition group-hover:text-slate-200 sm:text-2xl md:text-3xl'>
            {article.title}
          </h3>
          <p className='text-base leading-relaxed text-slate-300 line-clamp-3 sm:text-lg'>
            {article.summary}
          </p>
        </div>

        <span className='mt-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-200 transition group-hover:gap-3'>
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
