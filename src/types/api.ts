import type { Tour } from './tour';

export type Locale = 'th' | 'en';

export interface ToursResponse {
  success: true;
  total: number;
  tours: Tour[];
}

export interface ApiError {
  success: false;
  error: string;
}

export type ApiResponse<T> = T | ApiError;
