import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NewsListItem } from "@/shared/api/epl/model/news";
import {
  buildArticleHref,
  deriveTrendingArticles,
  sortArticles,
} from "./news-utils";

const LOAD_STEP = 4;

interface UseNewsFeedParams {
  articles: NewsListItem[];
}

export const useNewsFeed = ({ articles }: UseNewsFeedParams) => {
  const sortedArticles = useMemo(() => sortArticles(articles), [articles]);
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

  useEffect(
    () => () => {
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
      }
    },
    []
  );

  const resolveHref = useCallback(
    (article: NewsListItem) => buildArticleHref(article),
    []
  );

  return {
    visibleArticles,
    trendingArticles,
    isLoading,
    hasMore,
    sentinelRef,
    resolveHref,
  };
};
