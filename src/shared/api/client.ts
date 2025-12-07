const FALLBACK_BASE_URL = "https://infootball.kr";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? FALLBACK_BASE_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type QueryPrimitive = string | number | boolean;
type QueryValue = QueryPrimitive | QueryPrimitive[] | null | undefined;
export type QueryParams = Record<string, QueryValue>;

export interface ApiRequestOptions
  extends Omit<RequestInit, "body" | "method"> {
  params?: QueryParams;
  data?: unknown;
  body?: RequestInit["body"];
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly response: Response;
  readonly details: unknown;

  constructor(message: string, response: Response, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = response.status;
    this.response = response;
    this.details = details;
  }
}

async function request<T>(
  method: HttpMethod,
  path: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { params, data, headers, body: providedBody, cache, ...rest } =
    options;

  const url = buildRequestUrl(path, params);
  const { body, isJsonBody } = resolveRequestBody(data, providedBody);
  const requestHeaders = createHeaders(headers, isJsonBody);

  const response = await fetch(url, {
    ...rest,
    cache: cache ?? "no-store",
    method,
    headers: requestHeaders,
    body,
  });

  return handleResponse<T>(response);
}

function buildRequestUrl(path: string, params?: QueryParams): string {
  const url = new URL(path, baseUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      appendQueryParam(url.searchParams, key, value)
    );
  }

  return url.toString();
}

function appendQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: QueryValue
): void {
  if (value === null || value === undefined) {
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => appendQueryParam(searchParams, key, item));
    return;
  }

  searchParams.append(key, String(value));
}

function resolveRequestBody(
  data: unknown,
  providedBody: RequestInit["body"]
): {
  body?: BodyInit | null;
  isJsonBody: boolean;
} {
  if (providedBody !== undefined) {
    return { body: providedBody ?? null, isJsonBody: false };
  }

  if (data === undefined || data === null) {
    return { body: undefined, isJsonBody: false };
  }

  if (isBodyInit(data)) {
    return { body: data, isJsonBody: false };
  }

  return { body: JSON.stringify(data), isJsonBody: true };
}

function isBodyInit(value: unknown): value is BodyInit {
  if (typeof value === "string") {
    return true;
  }

  if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) {
    return true;
  }

  if (typeof Blob !== "undefined" && value instanceof Blob) {
    return true;
  }

  if (typeof FormData !== "undefined" && value instanceof FormData) {
    return true;
  }

  if (typeof URLSearchParams !== "undefined" && value instanceof URLSearchParams) {
    return true;
  }

  if (typeof ReadableStream !== "undefined" && value instanceof ReadableStream) {
    return true;
  }

  return false;
}

function createHeaders(headers: HeadersInit | undefined, ensureJson: boolean): Headers {
  const merged = new Headers(headers ?? {});

  if (ensureJson && !merged.has("Content-Type")) {
    merged.set("Content-Type", "application/json");
  }

  return merged;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw await buildApiError(response);
  }

  const payload = await parseResponseBody(response);
  return payload as T;
}

async function buildApiError(response: Response): Promise<ApiClientError> {
  const details = await parseResponseBody(response.clone());
  const message = deriveErrorMessage(response, details);

  return new ApiClientError(message, response, details);
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const contentLength = response.headers.get("content-length");
  if (contentLength === "0") {
    return undefined;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return undefined;
    }
  }

  if (contentType.startsWith("text/")) {
    try {
      return await response.text();
    } catch {
      return undefined;
    }
  }

  return undefined;
}

function deriveErrorMessage(response: Response, details: unknown): string {
  if (typeof details === "string" && details.trim().length > 0) {
    return details;
  }

  if (details && typeof details === "object") {
    const maybeMessage = (details as Record<string, unknown>).message;
    if (typeof maybeMessage === "string" && maybeMessage.trim().length > 0) {
      return maybeMessage;
    }
  }

  return `HTTP 에러 발생: ${response.status}`;
}

export const apiClient = {
  get<T>(url: string, options?: ApiRequestOptions) {
    return request<T>("GET", url, options);
  },

  post<T, P>(url: string, data: P, options?: ApiRequestOptions) {
    return request<T>("POST", url, { ...options, data });
  },

  put<T, P>(url: string, data: P, options?: ApiRequestOptions) {
    return request<T>("PUT", url, { ...options, data });
  },

  patch<T, P>(url: string, data: P, options?: ApiRequestOptions) {
    return request<T>("PATCH", url, { ...options, data });
  },

  delete<T>(url: string, options?: ApiRequestOptions) {
    return request<T>("DELETE", url, options);
  },
};
