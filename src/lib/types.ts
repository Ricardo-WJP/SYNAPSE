export type Category = "design" | "ai";

export interface Article {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  content?: string;
  contentEn?: string;
  summary?: string;
  summaryEn?: string;
  category: Category;
  source: string;
  sourceUrl: string;
  author?: string;
  imageUrl?: string;
  publishedAt: Date;
  tags: string[];
  language: "zh" | "en" | "bilingual";
  slug: string;
  isProcessed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RSSSource {
  id: string;
  name: string;
  nameEn: string;
  url: string;
  category: Category;
  language: "zh" | "en";
  enabled: boolean;
  priority: number;
}

export interface ProcessedArticle {
  originalTitle: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  tags: string[];
  category: Category;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}
