import { ReactNode } from 'react';

export interface ServiceItem {
  id: string;
  name: string; // Changed from title to name to match Services.tsx data
  price: string;
  category: 'web' | 'text' | 'publish';
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export enum GeminiStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}