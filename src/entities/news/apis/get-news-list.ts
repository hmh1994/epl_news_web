import { apiClient } from "@/src/shared/api-client";

export interface NewsType {
  publishdate: string;
  authorKr: string[];
  contentEn: string;
  contentKr: string;
  url: string;
  source: string;
  teams: string[];
  thumbnailUrl: string;
  titleEn: string;
  titleKr: string;
  type: string;
  id: string;
  authorEn: string[];
  sourceId: string;
}

export interface NewsListType {
  newsList: Array<NewsType>;
}

export const getNewsList = async (): Promise<NewsListType> => {
  try {
    const result = await apiClient.get<NewsListType>("/api/v1/news/news");
    return result;
  } catch (e) {
    console.error(e);
    return {
      newsList: [],
    };
  }
};
