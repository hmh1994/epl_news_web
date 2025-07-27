import { apiClient } from "@/src/shared/api-client";

export interface NewsType {
  newsId: string;
  titleEn: string;
  titleKr: string;
  contentEn: string;
  contentKr: string;
  newsImg: string;
  newsUrl: string;
  authorKr: string[];
  authorEn: string[];
  team: string | null;
  type: string;
  publishdate: string;
}

export interface NewsListType {
  newsList: Array<NewsType>;
}

export const getNewsList = async ({
  count = 5,
}: {
  count: number;
}): Promise<NewsListType> => {
  try {
    const result = await apiClient.get<NewsListType>(
      `/api/v1/news/list?count=${count}`
    );
    return result;
  } catch (e) {
    console.error(e);
    return {
      newsList: [],
    };
  }
};
