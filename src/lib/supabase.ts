import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials not configured. Using mock mode for development."
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface Database {
  articles: {
    id: string;
    title: string;
    title_en?: string;
    description: string;
    description_en?: string;
    summary?: string;
    summary_en?: string;
    content?: string;
    content_en?: string;
    category: "design" | "ai";
    source: string;
    source_url: string;
    author?: string;
    image_url?: string;
    published_at: string;
    tags: string[];
    language: "zh" | "en" | "bilingual";
    slug: string;
    is_processed: boolean;
    created_at: string;
    updated_at: string;
  };
  subscriptions: {
    id: string;
    email: string;
    categories: string[];
    subscribed: boolean;
    created_at: string;
    updated_at: string;
  };
}

export async function getArticles(options?: {
  category?: "design" | "ai";
  limit?: number;
  offset?: number;
}) {
  if (!supabase) {
    return { data: [], error: null };
  }

  let query = supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });

  if (options?.category) {
    query = query.eq("category", options.category);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  return query;
}

export async function getArticleBySlug(slug: string) {
  if (!supabase) {
    return { data: null, error: null };
  }

  return supabase.from("articles").select("*").eq("slug", slug).single();
}

export async function checkArticleExists(slug: string): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("slug", slug)
    .single();

  return !error && data !== null;
}

export async function upsertArticle(article: {
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  summary?: string;
  summary_en?: string;
  category: "design" | "ai";
  source: string;
  source_url: string;
  author?: string;
  image_url?: string;
  published_at: string;
  tags: string[];
  language: "zh" | "en" | "bilingual";
  slug: string;
}) {
  if (!supabase) {
    return { data: null, error: "Supabase not configured" };
  }

  return supabase.from("articles").upsert(
    {
      ...article,
      is_processed: true,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "slug",
      ignoreDuplicates: true,
    }
  );
}

export async function getArticlesCount(category?: "design" | "ai") {
  if (!supabase) {
    return { count: 0 };
  }

  let query = supabase.from("articles").select("*", { count: "exact", head: true });

  if (category) {
    query = query.eq("category", category);
  }

  const { count } = await query;
  return { count: count || 0 };
}

export async function searchArticles(query: string, options?: { limit?: number }) {
  if (!supabase) {
    return { data: [], error: null };
  }

  if (!query || query.trim().length === 0) {
    return { data: [], error: null };
  }

  const searchTerm = `%${query.trim()}%`;

  const { data, error } = await supabase
    .from("articles")
    .select("id, title, title_en, summary, summary_en, description, description_en, category, slug, image_url, published_at")
    .or(`title.ilike.${searchTerm},title_en.ilike.${searchTerm},summary.ilike.${searchTerm},summary_en.ilike.${searchTerm},description.ilike.${searchTerm},description_en.ilike.${searchTerm}`)
    .order("published_at", { ascending: false })
    .limit(options?.limit || 8);

  return { data, error };
}

export async function getRelatedArticles(category: "design" | "ai", excludeSlug: string, limit = 4) {
  if (!supabase) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from("articles")
    .select("id, title, title_en, summary, summary_en, category, slug, image_url, published_at")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);

  return { data, error };
}
