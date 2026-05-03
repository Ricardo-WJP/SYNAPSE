#!/usr/bin/env node
/**
 * SYNAPSE Content Update Script
 *
 * Standalone script for GitHub Actions - bypasses Vercel Serverless timeout.
 *
 * Usage:
 *   node scripts/content-update.mjs                    # Process all articles
 *   node scripts/content-update.mjs --category=design  # Design only
 *   node scripts/content-update.mjs --category=ai      # AI only
 *   node scripts/content-update.mjs --skip-ai          # Skip AI processing
 */

import Parser from "rss-parser";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { setTimeout } from 'timers/promises';

// ============== Configuration ==============
const CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  miniMaxApiKey: process.env.MINIMAX_API_KEY,
  miniMaxBaseUrl: "https://api.minimax.chat/v1",
  maxArticles: 15,
  aiTimeoutMs: 30000, // 30 seconds per article
};

// ============== RSS Sources ==============
const RSS_SOURCES = [
  // Design - Chinese
  { id: "uisdc", name: "优设", url: "https://www.uisdc.com/feed", category: "design", language: "zh" },
  { id: "zcool", name: "站酷", url: "https://www.zcool.com.cn/rss/channel/4", category: "design", language: "zh" },
  { id: "uisdc-design", name: "优设设计网", url: "https://hao.uisdc.com/feed/", category: "design", language: "zh" },
  // Design - English
  { id: "awwwards", name: "Awwwards", url: "https://www.awwwards.com/blog/feed/", category: "design", language: "en" },
  { id: "dribbble", name: "Dribbble", url: "https://dribbble.com/shots/popular/feed.rss", category: "design", language: "en" },
  { id: "smashingmagazine", name: "Smashing Magazine", url: "https://www.smashingmagazine.com/feed/", category: "design", language: "en" },
  { id: "creative-boom", name: "Creative Boom", url: "https://creativeboom.com/feed/", category: "design", language: "en" },
  { id: "designweek", name: "Design Week", url: "https://www.designweek.co.uk/feed/", category: "design", language: "en" },
  // AI - Chinese
  { id: "huxiu-ai", name: "虎嗅AI", url: "https://www.huxiu.com/channel/103.html/rss.xml", category: "ai", language: "zh" },
  { id: "jiqizhixin", name: "机器之心", url: "https://jiqizhixin.com/rss", category: "ai", language: "zh" },
  { id: "zhihuai", name: "知乎AI", url: "https://www.zhihu.com/rss", category: "ai", language: "zh" },
  // AI - English
  { id: "mit-tech-review", name: "MIT Tech Review", url: "https://www.technologyreview.com/feed/", category: "ai", language: "en" },
  { id: "venturebeat-ai", name: "VentureBeat AI", url: "https://venturebeat.com/category/ai/feed/", category: "ai", language: "en" },
  { id: "openai-blog", name: "OpenAI Blog", url: "https://openai.com/blog/rss.xml", category: "ai", language: "en" },
  { id: "deepmind-blog", name: "Google DeepMind", url: "https://deepmind.com/blog/feed/broad/", category: "ai", language: "en" },
  { id: "anthropic-news", name: "Anthropic News", url: "https://www.anthropic.com/news/rss", category: "ai", language: "en" },
  { id: "ai-news", name: "AI News", url: "https://www.artificialintelligence-news.com/feed/", category: "ai", language: "en" },
  { id: "verge-ai", name: "The Verge AI", url: "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml", category: "ai", language: "en" },
  { id: "techcrunch-ai", name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", category: "ai", language: "en" },
  { id: "marktechpost", name: "MarkTechPost", url: "https://www.marktechpost.com/feed/", category: "ai", language: "en" },
  { id: "analytics-india", name: "Analytics India Mag", url: "https://analyticsindiamag.com/feed/", category: "ai", language: "en" },
];

// ============== Utilities ==============
function generateSlug(title) {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  const slugPart = title
    .toLowerCase()
    .replace(/[^a-z0-9一-龥]/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 50);
  return `${slugPart}-${timestamp}-${randomPart}`;
}

function stripHtml(html) {
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

function extractImageFromContent(content) {
  if (!content) return undefined;
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch) return imgMatch[1];
  const ogMatch = content.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  if (ogMatch) return ogMatch[1];
  return undefined;
}

function extractMediaThumbnail(item) {
  const media = item["media:thumbnail"];
  if (!media) return undefined;

  if (typeof media === "string") {
    return media;
  }

  if (Array.isArray(media) && media.length > 0) {
    const first = media[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object") {
      const url = first["$"];
      if (url && typeof url === "object") {
        return url["url"];
      }
    }
  }

  if (typeof media === "object") {
    const url = media["$"];
    if (url && typeof url === "object") {
      return url["url"];
    }
    const directUrl = media["url"];
    if (typeof directUrl === "string") return directUrl;
  }

  return undefined;
}

// ============== Validation ==============
function validateArticle(article) {
  if (!article.title || article.title.trim().length < 5) {
    return { valid: false, reason: "标题过短或为空" };
  }
  if (article.title.length > 200) {
    return { valid: false, reason: "标题过长" };
  }
  const title = article.title.trim();
  const uniqueChars = new Set(title).size;
  if (uniqueChars < 3 && title.length > 5) {
    return { valid: false, reason: "标题疑似乱码" };
  }
  const desc = (article.description || "").trim();
  if (desc.length < 10) {
    return { valid: false, reason: "描述过短" };
  }
  const spamPatterns = [/\b(viagra|cialis|casino|lottery|winner|prize)\b/i, /\b(click here|limited time|act now)\b/i];
  const textToCheck = `${title} ${desc}`.toLowerCase();
  for (const pattern of spamPatterns) {
    if (pattern.test(textToCheck)) {
      return { valid: false, reason: "内容疑似垃圾信息" };
    }
  }
  return { valid: true };
}

// ============== AI Processing ==============
async function createAIClient() {
  if (!CONFIG.miniMaxApiKey) {
    throw new Error("MINIMAX_API_KEY is not configured");
  }
  return new OpenAI({
    apiKey: CONFIG.miniMaxApiKey,
    baseURL: CONFIG.miniMaxBaseUrl,
    defaultHeaders: { "Authorization": `Bearer ${CONFIG.miniMaxApiKey}` },
  });
}

async function withTimeout(promise, ms, operationName) {
  return Promise.race([
    promise,
    setTimeout(ms).then(() => {
      throw new Error(`${operationName} timeout after ${ms}ms`);
    })
  ]);
}

async function translateText(client, text, sourceLang, targetLang) {
  const prompt = `You are a professional translator. Translate the following text from ${sourceLang} to ${targetLang}.
Only return the translation, nothing else.

Text: ${text}`;

  const response = await client.chat.completions.create({
    model: "MiniMax-M2.5",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 1000,
  });

  const content = response.choices[0]?.message?.content?.trim() || text;
  return content.replace(/<think>[\s\S]*?<\/think>/g, "").trim() || text;
}

async function summarizeArticle(client, title, description, lang) {
  const prompt = `You are a professional content analyst. Analyze the following article and provide:
1. A concise summary (3-5 sentences in ${lang})
2. Relevant tags (3-5 tags, in ${lang}, separated by commas)

Article Title: ${title}
Article Description: ${description}

Respond in JSON format:
{
  "summary": "your summary here",
  "tags": ["tag1", "tag2", "tag3"]
}`;

  const response = await client.chat.completions.create({
    model: "MiniMax-M2.5",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 500,
  });

  let content = (response.choices[0]?.message?.content?.trim() || "")
    .replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  content = content.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "").trim();

  try {
    const result = JSON.parse(content);
    return { summary: result.summary || "", tags: Array.isArray(result.tags) ? result.tags : [] };
  } catch {
    return { summary: content.substring(0, 300), tags: [] };
  }
}

async function processArticleWithAI(article) {
  const client = await createAIClient();
  const { title, description, category, language } = article;

  if (language === "zh") {
    const [titleEn, zhSummaryResult, enSummaryResult] = await Promise.all([
      withTimeout(translateText(client, title, "Chinese", "English"), CONFIG.aiTimeoutMs, "Title translation"),
      withTimeout(summarizeArticle(client, title, description || "", "Chinese"), CONFIG.aiTimeoutMs, "Chinese summary"),
      withTimeout(summarizeArticle(client, title, description || "", "English"), CONFIG.aiTimeoutMs, "English summary"),
    ]);

    return {
      title,
      titleEn,
      summary: zhSummaryResult.summary,
      summaryEn: enSummaryResult.summary || (description || "").substring(0, 200),
      tags: [...new Set([category, ...zhSummaryResult.tags])],
    };
  } else {
    const [titleZh, enSummaryResult, zhSummaryResult] = await Promise.all([
      withTimeout(translateText(client, title, "English", "Chinese"), CONFIG.aiTimeoutMs, "Title translation"),
      withTimeout(summarizeArticle(client, title, description || "", "English"), CONFIG.aiTimeoutMs, "English summary"),
      withTimeout(summarizeArticle(client, title, description || "", "Chinese"), CONFIG.aiTimeoutMs, "Chinese summary"),
    ]);

    return {
      title: titleZh,
      titleEn: title,
      summary: zhSummaryResult.summary,
      summaryEn: enSummaryResult.summary,
      tags: [...new Set([category, ...enSummaryResult.tags])],
    };
  }
}

// ============== RSS Fetching ==============
const parser = new Parser({ timeout: 10000, headers: { "User-Agent": "DesignAI-Knowledge/1.0" } });

async function fetchRSSSource(source) {
  try {
    const feed = await parser.parseURL(source.url);
    return feed.items.slice(0, 20).map((item) => {
      const description = stripHtml(item.contentSnippet || item.content || item.summary || "").substring(0, 500);
      const imageUrl = item.thumbnail || extractMediaThumbnail(item) || extractImageFromContent(item.content || item["content:encoded"]);

      return {
        title: item.title || "Untitled",
        description,
        content: item.content || item["content:encoded"],
        link: item.link,
        pubDate: item.pubDate || item.isoDate,
        author: item.creator || item.author,
        imageUrl: typeof imageUrl === "string" ? imageUrl : undefined,
        source: source.name,
        category: source.category,
        language: source.language,
      };
    });
  } catch (error) {
    console.error(`Failed to fetch RSS from ${source.name}:`, error.message);
    return [];
  }
}

async function fetchAllSources(category) {
  const sources = category
    ? RSS_SOURCES.filter(s => s.category === category)
    : RSS_SOURCES;

  const results = await Promise.allSettled(sources.map(source => fetchRSSSource(source)));
  const articles = [];
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      articles.push(...result.value);
    }
  });
  return articles;
}

// ============== Database ==============
function createSupabaseClient() {
  if (!CONFIG.supabaseUrl || !CONFIG.supabaseAnonKey) {
    throw new Error("Supabase credentials not configured");
  }
  return createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
}

async function checkArticleExists(supabase, slug) {
  const { data, error } = await supabase.from("articles").select("slug").eq("slug", slug).single();
  return !error && data !== null;
}

async function upsertArticle(supabase, article) {
  return supabase.from("articles").upsert(
    { ...article, is_processed: true, updated_at: new Date().toISOString() },
    { onConflict: "slug", ignoreDuplicates: true }
  );
}

// ============== Main Processing ==============
async function processArticles(category, skipAI) {
  console.log("Starting content update...");
  console.log(`Category: ${category || "all"}, Skip AI: ${skipAI}`);

  // Validate config
  if (!skipAI && !CONFIG.miniMaxApiKey) {
    throw new Error("MINIMAX_API_KEY is not configured");
  }
  if (!CONFIG.supabaseUrl || !CONFIG.supabaseAnonKey) {
    throw new Error("Supabase credentials not configured");
  }

  const supabase = createSupabaseClient();

  // Fetch articles
  console.log("\n[1/4] Fetching RSS feeds...");
  const articles = (await fetchAllSources(category)).slice(0, CONFIG.maxArticles);
  console.log(`Found ${articles.length} articles`);

  if (articles.length === 0) {
    console.log("No articles found. Exiting.");
    return { processed: [], summary: { total: 0, success: 0, skipped: 0, errors: 0 } };
  }

  // Process each article
  console.log("\n[2/4] Processing articles...");
  const processed = [];

  for (const article of articles) {
    const slug = generateSlug(article.title);
    console.log(`\nProcessing: ${article.title.substring(0, 50)}...`);

    // Check duplicate
    const exists = await checkArticleExists(supabase, slug);
    if (exists) {
      console.log("  -> Skipped (duplicate)");
      processed.push({ title: article.title, status: "skipped", stage: "duplicate" });
      continue;
    }

    // Build article data
    let articleData = {
      title: article.title,
      title_en: "",
      description: article.description,
      description_en: "",
      summary: "",
      summary_en: "",
      category: article.category,
      source: article.source,
      source_url: article.link || "",
      author: article.author,
      image_url: article.imageUrl,
      published_at: article.pubDate || new Date().toISOString(),
      tags: [article.category],
      language: article.language,
      slug,
    };

    // AI processing
    if (!skipAI) {
      try {
        console.log("  -> AI processing...");
        const aiResult = await processArticleWithAI(article);
        articleData = {
          ...articleData,
          title: aiResult.title,
          title_en: aiResult.titleEn,
          description: aiResult.summary || articleData.description,
          description_en: aiResult.summaryEn,
          summary: aiResult.summary,
          summary_en: aiResult.summaryEn,
          tags: [...new Set([article.category, ...aiResult.tags.map(t => t.toLowerCase())])],
          language: "bilingual",
        };
      } catch (aiError) {
        console.log(`  -> AI failed: ${aiError.message}`);
        // Continue with original data if AI processing fails
      }
    }

    // Validate
    const validation = validateArticle({
      title: articleData.title,
      description: articleData.description,
      category: articleData.category,
      slug: articleData.slug,
      source_url: articleData.source_url,
      tags: articleData.tags,
    });

    if (!validation.valid) {
      console.log(`  -> Rejected: ${validation.reason}`);
      processed.push({ title: article.title, status: "rejected", stage: "validation", error: validation.reason });
      continue;
    }

    // Save to database
    console.log("  -> Saving to database...");
    const { error } = await upsertArticle(supabase, articleData);

    if (error) {
      console.log(`  -> Database error: ${error.message}`);
      processed.push({ title: article.title, status: "error", stage: "database", error: error.message });
    } else {
      console.log("  -> Success!");
      processed.push({ title: article.title, status: "success" });
    }
  }

  // Summary
  const summary = {
    total: processed.length,
    success: processed.filter(p => p.status === "success").length,
    skipped: processed.filter(p => p.status === "skipped").length,
    rejected: processed.filter(p => p.status === "rejected").length,
    errors: processed.filter(p => p.status === "error").length,
  };

  console.log("\n[3/4] Processing complete!");
  console.log(`Success: ${summary.success}, Skipped: ${summary.skipped}, Rejected: ${summary.rejected}, Errors: ${summary.errors}`);

  return { processed, summary };
}

// ============== CLI Handler ==============
async function main() {
  const args = process.argv.slice(2);
  let category = null;
  let skipAI = false;

  for (const arg of args) {
    if (arg.startsWith("--category=")) {
      category = arg.split("=")[1];
      if (category !== "design" && category !== "ai") {
        console.error("Invalid category. Use 'design' or 'ai'");
        process.exit(1);
      }
    }
    if (arg === "--skip-ai") skipAI = true;
    if (arg === "--help") {
      console.log("Usage: node content-update.mjs [options]");
      console.log("Options:");
      console.log("  --category=design  Process only design articles");
      console.log("  --category=ai      Process only AI articles");
      console.log("  --skip-ai          Skip AI processing");
      console.log("  --help             Show this help");
      process.exit(0);
    }
  }

  try {
    const startTime = Date.now();
    const result = await processArticles(category, skipAI);
    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log(`\n[4/4] Done! Total time: ${duration}s`);
    console.log("\n=== SUMMARY ===");
    console.log(JSON.stringify(result.summary, null, 2));

    // Exit with error if no successes
    if (result.summary.success === 0 && result.summary.skipped === 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("\nFatal error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();