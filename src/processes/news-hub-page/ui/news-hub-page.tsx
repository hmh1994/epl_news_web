"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NewsGrid } from "@/features/news";
import { NewsRelatedList } from "@/features/news-detail";
import { NewsArticlePreview } from "@/entities/news/model/news-article";
import { EPL_NEWS_ARTICLES } from "@/shared/mocks/news/articles";

interface NewsHubPageProps {
  locale: string;
}

const getSortedArticles = (): NewsArticlePreview[] => {
  return [...EPL_NEWS_ARTICLES].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

const deriveTrendingArticles = (articles: NewsArticlePreview[]) => {
  return articles.slice(0, 5);
};

const LOAD_STEP = 4;

export const NewsHubPage = ({ locale }: NewsHubPageProps) => {
  const sortedArticles = useMemo(() => getSortedArticles(), []);
  const totalArticles = sortedArticles.length;
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(LOAD_STEP, totalArticles)
  );
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadingRef = useRef(false);
  const hasMore = visibleCount < totalArticles;
  const visibleArticles = useMemo(
    () => sortedArticles.slice(0, visibleCount),
    [sortedArticles, visibleCount]
  );
  const trendingArticles = useMemo(
    () => deriveTrendingArticles(sortedArticles.slice(1)),
    [sortedArticles]
  );

  const loadMore = useCallback(() => {
    if (!hasMore || loadingRef.current) {
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);

    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
    }

    loadTimeoutRef.current = setTimeout(() => {
      setVisibleCount((previous) =>
        previous >= totalArticles
          ? previous
          : Math.min(previous + LOAD_STEP, totalArticles)
      );
      setIsLoading(false);
      loadingRef.current = false;
    }, 400);
  }, [hasMore, totalArticles]);

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadMore();
        }
      },
      {
        rootMargin: "240px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  useEffect(() => {
    return () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    };
  }, []);

  const basePath = locale ? `/${locale}` : "";

  const resolveHref = (article: NewsArticlePreview) =>
    `${basePath}/news/${article.slug}`;

  return (
    <div className='mx-auto w-full max-w-7xl px-6 pb-16 pt-28 lg:px-12 xl:px-16'>
      <div className='mb-10 space-y-4'>
        <p className='inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200'>
          최신 뉴스 하이라이트
        </p>
        <h1 className='text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>
          오늘의 프리미어리그 이슈를 한눈에 만나보세요
        </h1>
      </div>

      <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]'>
        <section className='space-y-8'>
          <NewsGrid articles={visibleArticles} resolveHref={resolveHref} />
          {isLoading && (
            <div className='flex items-center justify-center gap-3 text-sm text-slate-400'>
              <span className='inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-emerald-400' />
              <span>뉴스를 불러오는 중…</span>
            </div>
          )}
          <div
            ref={sentinelRef}
            className='h-1 w-full opacity-0'
            aria-hidden='true'
          />
          {!hasMore && !isLoading && (
            <p className='text-center text-sm text-slate-500'>
              최신 뉴스를 모두 확인했습니다.
            </p>
          )}
        </section>

        <aside className='space-y-8'>
          <div className='rounded-3xl border border-white/10 bg-slate-900/40 p-6 text-sm text-slate-300'>
            <h2 className='text-lg font-semibold text-white'>오늘의 키워드</h2>
            <ul className='mt-4 space-y-2 text-sm'>
              <li>· 우승 경쟁 구도와 전술 변화</li>
              <li>· 복귀 선수들의 영향력 점검</li>
              <li>· 유망주 발탁과 구단 철학 분석</li>
            </ul>
          </div>

          <NewsRelatedList
            title='많이 찾는 소식'
            articles={trendingArticles}
            resolveHref={resolveHref}
          />
        </aside>
      </div>
    </div>
  );
};
