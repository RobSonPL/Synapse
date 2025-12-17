import { ReactNode } from 'react';

export type Language = 'pl' | 'en' | 'de' | 'es' | 'fr';

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  category: 'web' | 'text' | 'publish';
  imageUrl?: string;
  link?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  action?: () => void; // Added action for custom routing
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

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // Full HTML/Markdown content
  type: 'pdf' | 'presentation' | 'article';
  fileUrl?: string; // Optional download link
  thumbnailUrl: string;
  author: string;
  readTime: string;
}

export interface GiftItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  downloadUrl: string;
}