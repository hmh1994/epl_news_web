import Link from "next/link";
import { NewsListItem } from "@/shared/api/epl/model/news";

const sidebarDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  month: "numeric",
  day: "numeric",
});

interface NewsListSidebarCardProps {
  article: NewsListItem;
  href: string;
}

export const NewsListSidebarCard = ({ article, href }: NewsListSidebarCardProps) => {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='group block rounded-2xl border border-white/10 bg-slate-900/40 p-5 transition hover:border-emerald-400/30 hover:bg-slate-900/70'
    >
      <div className='mb-2 flex items-center justify-between text-xs text-slate-400'>
        <span className='font-semibold uppercase tracking-wide text-emerald-200'>
          {article.source}
        </span>
        <span>{sidebarDateFormatter.format(new Date(article.publishDate))}</span>
      </div>
      <h4 className='text-base font-semibold text-white transition group-hover:text-emerald-300'>
        {article.title}
      </h4>
      <p className='mt-2 text-sm text-slate-400 line-clamp-3'>
        {article.summary}
      </p>
    </Link>
  );
};
