export interface ApiResponse2<T> {
  success: boolean;
  result: T;
  message?: string;
  error?: ErrorDetail;
}

export interface ErrorDetail {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

export interface Timestamps {
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: Date | string;
}

export interface FetchOptions {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
}
