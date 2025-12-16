import { ReactNode } from 'react';

export interface ServiceItem {
  id: string;
  name: string;
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

export interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  link: string;
}