import { NextRequest, NextResponse } from "next/server";
import { getEnabledSources } from "@/lib/sources";
import { fetchAllSources, generateSlug, stripHtml } from "@/lib/rss";
import { processArticle } from "@/lib/ai";
import { upsertArticle, checkArticleExists } from "@/lib/supabase";
import { validateArticle } from "@/lib/content-validation";

interface ArticleData {
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  summary: string;
  summary_en: string;
  category: "design" | "ai";
  source: string;
  source_url: string;
  author?: string;
  image_url?: string;
  published_at: string;
  tags: string[];
  language: "zh" | "en" | "bilingual";
  slug: string;
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const expectedToken = process.env.FEED_UPDATE_TOKEN;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") as "design" | "ai" | null;
  const skipAi = searchParams.get("skipAI") === "true";

  const sources = getEnabledSources(category || undefined);

  const rawArticles = await fetchAllSources(sources);

  const processed: {
    title: string;
    status: string;
    stage?: string;
    error?: string;
  }[] = [];

  for (const article of rawArticles) {
    const slug = generateSlug(article.title);

    // Stage 1: Duplicate check
    const exists = await checkArticleExists(slug);
    if (exists) {
      processed.push({
        title: article.title,
        status: "skipped",
        stage: "duplicate",
        error: "文章已存在",
      });
      continue;
    }

    // Stage 2: Build article data
    let processedData: ArticleData = {
      title: article.title,
      title_en: "",
      description: stripHtml(article.description),
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

    // Stage 3: AI processing with timeout
    if (!skipAi) {
      try {
        const timeoutMs = 8000;
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("AI processing timeout")), timeoutMs)
        );

        const aiResult = await Promise.race([
          processArticle({
            title: article.title,
            description: article.description,
            content: article.content,
            category: article.category,
            language: article.language,
          }),
          timeoutPromise,
        ]);

        processedData = {
          ...processedData,
          title: aiResult.title,
          title_en: aiResult.titleEn,
          description: aiResult.summary || stripHtml(article.description),
          description_en: aiResult.summaryEn,
          summary: aiResult.summary,
          summary_en: aiResult.summaryEn,
          tags: [
            ...new Set([
              article.category,
              ...aiResult.tags.map((t) => t.toLowerCase()),
            ]),
          ],
          language: "bilingual",
        };
      } catch (aiError) {
        processed.push({
          title: article.title,
          status: "skipped",
          stage: "ai-processing",
          error: aiError instanceof Error ? aiError.message : "AI processing failed",
        });
        continue;
      }
    }

    // Stage 4: Content validation
    const validation = validateArticle({
      title: processedData.title,
      description: processedData.description,
      category: processedData.category,
      slug: processedData.slug,
      source_url: processedData.source_url,
      tags: processedData.tags,
    });

    if (!validation.valid) {
      processed.push({
        title: article.title,
        status: "rejected",
        stage: "validation",
        error: validation.reason,
      });
      continue;
    }

    // Stage 5: Save to database
    const { error } = await upsertArticle(processedData);

    if (error) {
      const errorMessage =
        typeof error === "string" ? error : error.message;
      processed.push({
        title: article.title,
        status: "error",
        stage: "database",
        error: errorMessage,
      });
    } else {
      processed.push({
        title: article.title,
        status: "success",
      });
    }
  }

  const successCount = processed.filter((p) => p.status === "success").length;
  const rejectedCount = processed.filter((p) => p.status === "rejected").length;
  const skippedCount = processed.filter((p) => p.status === "skipped").length;
  const errorCount = processed.filter((p) => p.status === "error").length;

  return NextResponse.json({
    success: true,
    processed: {
      total: processed.length,
      success: successCount,
      rejected: rejectedCount,
      skipped: skippedCount,
      errors: errorCount,
      details: processed.slice(0, 20),
    },
  });
}

export async function GET() {
  const sources = getEnabledSources();

  return NextResponse.json({
    sources: sources.map((s) => ({
      id: s.id,
      name: s.name,
      category: s.category,
      language: s.language,
      enabled: s.enabled,
    })),
    total: sources.length,
  });
}
