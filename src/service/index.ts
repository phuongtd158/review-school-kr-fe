import { apiClient } from '@/utils/https/axios';
import type { ApiResponse, CustomAxiosRequestConfig } from '#/https';
import type { AnySafeType } from '#/index';

export function get<T = AnySafeType>(
  url: string,
  params?: AnySafeType,
  configs?: CustomAxiosRequestConfig
): Promise<ApiResponse<T>> {
  return apiClient.get(url, { params: params, ...configs });
}

export function post<T = AnySafeType>(
  url: string,
  params?: AnySafeType,
  configs?: CustomAxiosRequestConfig
): Promise<ApiResponse<T>> {
  return apiClient.post(url, params, configs);
}
