import Parser from "rss-parser";
import type { RSSSource } from "./types";

const parser = new Parser({
  timeout: 10000,
  headers: {
    "User-Agent": "DesignAI-Knowledge/1.0",
  },
});

export interface RawArticle {
  title: string;
  description?: string;
  content?: string;
  link?: string;
  pubDate?: string;
  author?: string;
  thumbnail?: string;
  imageUrl?: string;
  source: string;
  sourceUrl: string;
  category: "design" | "ai";
  language: "zh" | "en";
}

function generateSlug(title: string): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  const slugPart = title
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50);
  return `${slugPart}-${timestamp}-${randomPart}`;
}

function extractImageFromContent(content?: string): string | undefined {
  if (!content) return undefined;

  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) {
    return imgMatch[1];
  }

  const ogMatch = content.match(
    /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i
  );
  if (ogMatch) {
    return ogMatch[1];
  }

  return undefined;
}

function extractMediaThumbnail(
  item: Parser.Item
): string | undefined {
  const media = (item as Record<string, unknown>)["media:thumbnail"];
  if (!media) return undefined;

  if (typeof media === "string") {
    return media;
  }

  if (Array.isArray(media) && media.length > 0) {
    const first = media[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object") {
      const url = (first as Record<string, unknown>)["$"];
      if (url && typeof url === "object") {
        return (url as Record<string, string>)["url"];
      }
    }
  }

  if (typeof media === "object") {
    const url = (media as Record<string, unknown>)["$"];
    if (url && typeof url === "object") {
      return (url as Record<string, string>)["url"];
    }
    const directUrl = (media as Record<string, unknown>)["url"];
    if (typeof directUrl === "string") return directUrl;
  }

  return undefined;
}

function extractEnclosureImage(item: Parser.Item): string | undefined {
  const enclosure = (item as Record<string, unknown>).enclosure;
  if (!enclosure) return undefined;

  if (typeof enclosure === "object") {
    const url = (enclosure as Record<string, string>).url;
    if (typeof url === "string") return url;
  }

  return undefined;
}

function extractMediaContent(item: Parser.Item): string | undefined {
  const media = (item as Record<string, unknown>)["media:content"];
  if (!media) return undefined;

  if (Array.isArray(media)) {
    for (const m of media) {
      if (typeof m === "object") {
        const medium = (m as Record<string, string>).medium;
        const type = (m as Record<string, string>).type;
        if (medium === "image" || (type && type.startsWith("image/"))) {
          return (m as Record<string, string>).url;
        }
      }
    }
    if (media.length > 0 && typeof media[0] === "object") {
      return (media[0] as Record<string, string>).url;
    }
  }

  if (typeof media === "object") {
    const medium = (media as Record<string, string>).medium;
    const type = (media as Record<string, string>).type;
    if (medium === "image" || (type && type.startsWith("image/"))) {
      return (media as Record<string, string>).url;
    }
    return (media as Record<string, string>).url;
  }

  return undefined;
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractDescription(item: Parser.Item & { contentSnippet?: string }): string {
  const itemAny = item as Record<string, unknown>;
  const description = item.contentSnippet || item.content || item.summary || itemAny["content:encoded"] || "";

  if (typeof description === "string") {
    return stripHtml(description).substring(0, 500);
  }
  return "";
}

export async function fetchRSSSource(source: RSSSource): Promise<RawArticle[]> {
  try {
    const feed = await parser.parseURL(source.url);

    const articles: RawArticle[] = feed.items.slice(0, 20).map((item) => {
      const description = extractDescription(item);
      const imageUrl =
        item.thumbnail ||
        extractMediaThumbnail(item) ||
        extractEnclosureImage(item) ||
        extractMediaContent(item) ||
        extractImageFromContent(item.content || item["content:encoded"]);

      return {
        title: item.title || "Untitled",
        description,
        content: item.content || item["content:encoded"],
        link: item.link,
        pubDate: item.pubDate || item.isoDate,
        author: item.creator || item.author,
        imageUrl: typeof imageUrl === "string" ? imageUrl : undefined,
        source: source.name,
        sourceUrl: source.url,
        category: source.category,
        language: source.language,
      };
    });

    return articles;
  } catch (error) {
    console.error(`Failed to fetch RSS from ${source.name}:`, error);
    return [];
  }
}

export async function fetchAllSources(sources: RSSSource[]): Promise<RawArticle[]> {
  const results = await Promise.allSettled(
    sources.map((source) => fetchRSSSource(source))
  );

  const articles: RawArticle[] = [];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    }
  });

  return articles;
}

export { stripHtml, generateSlug };
