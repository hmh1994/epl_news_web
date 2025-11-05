import type { ApiListResponse, ApiResourceResponse, ApiResponseMeta } from "./types";

export interface NewsPaginationMeta {
  total?: number;
  pageSize?: number;
  nextCursor?: string;
  previousCursor?: string;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface NewsListParams {
  cursor?: string;
  limit?: number;
  categoryId?: string;
  tagIds?: string[];
  teamId?: string;
  search?: string;
  locale?: string;
  includeFeatured?: boolean;
}

export interface NewsHighlightsParams {
  limit?: number;
  categoryId?: string;
  locale?: string;
}

export interface NewsArticleParams {
  locale?: string;
  includeRelated?: boolean;
}

export interface NewsRelatedParams {
  limit?: number;
  categoryId?: string;
  excludeIds?: string[];
  locale?: string;
}

export interface NewsAuthor {
  id?: string;
  name: string;
  role?: string;
  avatarUrl?: string;
}

export interface NewsSource {
  id?: string;
  name: string;
  type?: "internal" | "external" | "syndicated";
  url?: string;
}

export interface NewsCategory {
  id: string;
  slug: string;
  label: string;
}

export interface NewsTag {
  id: string;
  slug: string;
  label: string;
}

export interface NewsImage {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  credit?: string;
  dominantColor?: string;
}

export type NewsArticleBlock =
  | {
      id: string;
      type: "paragraph";
      text: string;
    }
  | {
      id: string;
      type: "heading";
      text: string;
      level?: 2 | 3 | 4;
    }
  | {
      id: string;
      type: "quote";
      text: string;
      attribution?: string;
    }
  | {
      id: string;
      type: "image";
      image: NewsImage;
    }
  | {
      id: string;
      type: "list";
      ordered?: boolean;
      items: string[];
    }
  | {
      id: string;
      type: "embed";
      url: string;
      title?: string;
      provider?: string;
    };

export interface NewsArticlePreview {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: NewsCategory;
  tags: NewsTag[];
  heroImage?: NewsImage;
  thumbnail?: NewsImage;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes?: number;
  author?: NewsAuthor;
  source?: NewsSource;
  externalUrl?: string;
  isFeatured?: boolean;
}

export interface NewsArticle extends NewsArticlePreview {
  body: NewsArticleBlock[];
  spotlight?: {
    heroImage?: NewsImage;
    kicker?: string;
    tagline?: string;
  };
  keyTakeaways?: string[];
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

export interface NewsListResponse extends ApiListResponse<NewsArticlePreview> {
  meta: ApiResponseMeta & {
    pagination: NewsPaginationMeta;
    filters?: {
      categoryId?: string;
      tagIds?: string[];
      teamId?: string;
      search?: string;
    };
  };
}

export interface NewsArticleResponse extends ApiResourceResponse<NewsArticle> {
  meta: ApiResponseMeta & {
    articleId: string;
    slug: string;
    publishedAt: string;
    updatedAt?: string;
  };
}

export interface NewsHighlightsResponse extends ApiListResponse<NewsArticlePreview> {
  meta: ApiResponseMeta & {
    generatedAt: number;
    categoryId?: string;
  };
}

export interface NewsRelatedResponse extends ApiListResponse<NewsArticlePreview> {
  meta: ApiResponseMeta & {
    articleId: string;
    generatedAt: number;
  };
}
