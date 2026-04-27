import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getRelatedArticles } from "@/lib/supabase";
import ArticleNav from "@/components/ArticleNav";
import HoverLink from "@/components/HoverLink";
import ReadingProgress from "@/components/ReadingProgress";
import RelatedArticles from "@/components/RelatedArticles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { data: article } = await getArticleBySlug(slug);

  if (!article) {
    return { title: "文章未找到 — SYNAPSE · 触点" };
  }

  return {
    title: `${article.title} — SYNAPSE · 触点`,
    description: article.summary || article.description,
    openGraph: {
      title: article.title,
      description: article.summary || article.description,
      images: article.image_url ? [article.image_url] : [],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const { data: article, error } = await getArticleBySlug(slug);

  if (error || !article) {
    notFound();
  }

  const { data: relatedArticles } = await getRelatedArticles(article.category, slug, 4);

  const publishDate = new Date(article.published_at).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const categoryLabel = article.category === "design" ? "设计" : "AI";
  const categoryStyle = article.category === "design"
    ? { color: "#C9B99A", bg: "rgba(201, 185, 154, 0.15)" }
    : { color: "#B4BED2", bg: "rgba(180, 190, 210, 0.15)" };

  const contentText = article.content || article.summary || article.description || "";
  const wordCount = contentText.replace(/```[\s\S]*?```/g, "").length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 500));

  return (
    <div>
      <ReadingProgress />
      {/* Article Header */}
      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "64px",
          paddingBottom: "48px",
          background: "#0C0C10",
        }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
              fontSize: "14px",
            }}
          >
            <HoverLink
              href="/"
              style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
              hoverStyle={{ color: "#C9B99A" }}
            >
              首页
            </HoverLink>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <HoverLink
              href={`/${article.category}`}
              style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}
              hoverStyle={{ color: "#C9B99A" }}
            >
              {categoryLabel}
            </HoverLink>
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
            <span style={{ color: "rgba(255,255,255,0.2)" }} className="truncate">
              {article.title.substring(0, 30)}...
            </span>
          </nav>

          {/* Category & Date */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: categoryStyle.color,
                backgroundColor: categoryStyle.bg,
                borderRadius: "6px",
              }}
            >
              {categoryLabel}
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>{publishDate}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "12px",
              color: "#ffffff",
            }}
          >
            {article.title}
          </h1>

          {/* English Title */}
          {article.title_en && (
            <h2
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                fontWeight: 400,
                color: "rgba(255,255,255,0.5)",
                marginBottom: "24px",
                lineHeight: 1.4,
              }}
            >
              {article.title_en}
            </h2>
          )}

          {/* Author & Source */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              color: "rgba(255,255,255,0.5)",
              fontSize: "14px",
            }}
          >
            {article.author && (
              <span>
                作者：<strong style={{ color: "#ffffff", fontWeight: 600 }}>{article.author}</strong>
              </span>
            )}
            <span>
              来源：<strong style={{ color: "#ffffff", fontWeight: 600 }}>{article.source}</strong>
            </span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>|</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {readingTime} min read
            </span>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {article.image_url && (
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 24px",
            background: "#0C0C10",
          }}
        >
          <img
            src={article.image_url}
            alt={article.title}
            style={{
              width: "100%",
              height: "auto",
              marginTop: "48px",
              borderRadius: "16px",
            }}
          />
        </div>
      )}

      {/* Article Content */}
      <article
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "48px 24px 80px",
          background: "#0C0C10",
        }}
      >
        {/* Summary / Description */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#141414",
            borderLeft: article.category === "design" ? "3px solid #C9B99A" : "3px solid #B4BED2",
            borderRadius: "0 12px 12px 0",
            marginBottom: "32px",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0, fontSize: "15px" }}>
            {article.summary || article.description}
          </p>
        </div>

        {/* English Summary */}
        {article.summary_en && (
          <div
            style={{
              padding: "24px",
              backgroundColor: "#141414",
              borderLeft: article.category === "design" ? "3px solid #C9B99A" : "3px solid #B4BED2",
              borderRadius: "0 12px 12px 0",
              marginBottom: "32px",
            }}
          >
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0, fontSize: "15px" }}>
              {article.summary_en}
            </p>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginBottom: "48px",
            }}
          >
            {article.tags.map((tag: string, index: number) => (
              <span
                key={index}
                style={{
                  padding: "4px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  backgroundColor: "#141414",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "6px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        {article.content ? (
          <div
            style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontSize: "16px" }}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <div style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
            <p>
              本文来源于 {article.source}，您可以访问原文链接获取完整内容：
            </p>
            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#C9B99A",
                fontWeight: 600,
                marginTop: "8px",
                textDecoration: "none",
              }}
            >
              阅读原文
              <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </article>

      <ArticleNav category={article.category} />

      {relatedArticles && relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}
    </div>
  );
}
