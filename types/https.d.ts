import type { AnySafeType } from '#/index';
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

export interface ApiResponse<T = AnySafeType> {
  message: string;
  code: string;
  body: T;
}

export interface ExtendedAxiosRequestConfig {
  skipLoading?: boolean;
  skipErrorHandling?: boolean;
  retryCount?: number;
  maxRetries?: number;
}

export type CustomInternalAxiosRequestConfig = InternalAxiosRequestConfig & ExtendedAxiosRequestConfig;

export type CustomAxiosRequestConfig = AxiosRequestConfig & ExtendedAxiosRequestConfig;
