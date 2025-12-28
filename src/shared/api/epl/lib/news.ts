import { apiClient } from "@/shared/api/client";
import type {
  NewsListParams,
  NewsListResponse,
} from "@/shared/api/epl/model/news";
import { API_ROOT, RequestOptions } from "./base";

export const fetchNewsList = async (
  params?: NewsListParams,
  options?: RequestOptions
): Promise<NewsListResponse> => {
  try {
    return await apiClient.get<NewsListResponse>(`${API_ROOT}/news`, {
      ...options,
      params: {
        search: params?.search,
        locale: params?.locale,
        pageCnt: params?.pageCnt,
        pageSize: params?.pageSize,
      },
    });
  } catch (error) {
    console.warn(
      "[fetchNewsList] Falling back to mock data due to request failure",
      error
    );
    throw error;
  }
};
