import { apiClient } from "@/src/shared/api-client";

export interface NewsType {
  newsId: string;
  titleEn: string;
  titleKo: string;
  contentEn: string;
  contentKo: string;
  newsImg: string;
  source: string;
  type: string;
  publishDate: string;
  newsLink: string;
}

export interface NewsListType {
  newsList: Array<NewsType>;
}

export const getNewsList = async (): Promise<NewsListType> => {
  try {
    const result = await apiClient.get<NewsListType>("/api/v1/news/list");
    return result;
  } catch (e) {
    console.error(e);
    return {
      newsList: [],
    };
  }
};
