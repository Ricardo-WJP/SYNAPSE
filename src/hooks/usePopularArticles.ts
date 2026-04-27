"use client";

import { useState, useEffect } from "react";

interface ArticleResult {
  id: string;
  title: string;
  title_en?: string;
  summary?: string;
  summary_en?: string;
  category: "design" | "ai";
  slug: string;
  image_url?: string;
  published_at: string;
}

export function usePopularArticles() {
  const [articles, setArticles] = useState<ArticleResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPopular() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/search?limit=6");
        const data = await response.json();
        if (data.success) {
          setArticles(data.data);
        }
      } catch {
        // silent fail
      } finally {
        setIsLoading(false);
      }
    }

    fetchPopular();
  }, []);

  return { articles, isLoading };
}
