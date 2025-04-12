// /lib/apiClient.ts

const basePath = "https://infootball.kr";

export const apiClient = {
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(basePath + url, { ...options, method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP 에러 발생: ${response.status}`);
    }
    return response.json();
  },

  async post<T, P>(url: string, data: P, options?: RequestInit): Promise<T> {
    const response = await fetch(basePath + url, {
      ...options,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP 에러 발생: ${response.status}`);
    }
    return response.json();
  },

  async put<T, P>(url: string, data: P, options?: RequestInit): Promise<T> {
    const response = await fetch(basePath + url, {
      ...options,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP 에러 발생: ${response.status}`);
    }
    return response.json();
  },

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(basePath + url, {
      ...options,
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`HTTP 에러 발생: ${response.status}`);
    }
    return response.json();
  },
};
