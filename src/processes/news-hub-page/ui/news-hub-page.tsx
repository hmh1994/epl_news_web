"use client";

import { NewsListItem } from "@/shared/api/epl/model/news";
import { useTranslations } from "next-intl";
import { useNewsFeed } from "../lib/use-news-feed";
import { NewsArticlesSection } from "./sections/news-articles-section";
import { NewsHeroSection } from "./sections/news-hero-section";
import { NewsSidebar } from "./sections/news-sidebar";

interface NewsHubPageProps {
  articles: NewsListItem[];
}

export const NewsHubPage = ({ articles }: NewsHubPageProps) => {
  const hubT = useTranslations("news.hub");
  const gridT = useTranslations("news.grid");
  const cardT = useTranslations("news.card");
  const {
    visibleArticles,
    trendingArticles,
    isLoading,
    hasMore,
    sentinelRef,
    resolveHref,
  } = useNewsFeed({ articles });

  return (
    <div className='mx-auto w-full max-w-7xl px-6 pb-16 pt-28 lg:px-12 xl:px-16'>
      <NewsHeroSection badgeLabel={hubT("badge")} headline={hubT("headline")} />

      <div className='grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]'>
        <NewsArticlesSection
          ref={sentinelRef}
          articles={visibleArticles}
          resolveHref={resolveHref}
          emptyLabel={gridT("empty")}
          readMoreLabel={cardT("readMore")}
          loadingLabel={hubT("loading")}
          completedLabel={hubT("completed")}
          isLoading={isLoading}
          hasMore={hasMore}
        />

        <NewsSidebar
          keywordsTitle={hubT("keywords.title")}
          keywords={["competition", "returns", "prospects"].map((key) =>
            hubT(`keywords.items.${key}`)
          )}
          trendingTitle={hubT("trendingTitle")}
          trendingArticles={trendingArticles}
          resolveHref={resolveHref}
        />
      </div>
    </div>
  );
};
