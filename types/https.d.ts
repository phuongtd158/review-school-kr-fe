import type { AnySafeType } from '#/index';

export interface ApiResponse<T = AnySafeType> {
  message: string;
  code: string;
  body: T;
}
