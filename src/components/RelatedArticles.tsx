"use client";

import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/Card";

interface RelatedArticle {
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

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const { language } = useLanguage();

  if (!articles || articles.length === 0) return null;

  return (
    <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container" style={{ maxWidth: "1200px" }}>
        <h2
          style={{
            fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
            fontWeight: 600,
            color: "#F0EDE8",
            marginBottom: "32px",
            letterSpacing: "-0.02em",
          }}
        >
          {language === "zh" ? "相关推荐" : "Related Articles"}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {articles.map((article) => (
            <Card
              key={article.id}
              href={`/article/${article.slug}`}
              title={language === "zh" ? article.title : (article.title_en || article.title)}
              description={language === "zh" ? article.summary : (article.summary_en || article.summary)}
              category={article.category}
              image={article.image_url || undefined}
              date={new Date(article.published_at).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
