"use client";

import { useState, useEffect, useRef } from "react";

interface ArticleSearchResult {
  id: string;
  title: string;
  title_en?: string;
  summary?: string;
  summary_en?: string;
  description?: string;
  description_en?: string;
  category: "design" | "ai";
  slug: string;
  image_url?: string;
  published_at: string;
}

interface SearchResponse {
  success: boolean;
  data: ArticleSearchResult[];
  meta: { total: number; query: string };
}

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ArticleSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&limit=8`);
        const data: SearchResponse = await response.json();

        if (data.success) {
          setResults(data.data);
          setError(null);
        } else {
          setError("Search failed");
          setResults([]);
        }
      } catch {
        setError("Network error");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
  };
}
