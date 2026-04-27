"use client";

import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";
import Card from "@/components/Card";
import ScrollRevealCard from "@/components/ScrollRevealCard";
import NewsletterForm from "@/components/NewsletterForm";

interface ArticleData {
  slug: string;
  title: string;
  title_en?: string;
  summary?: string;
  summary_en?: string;
  description?: string;
  image_url?: string;
  published_at: string;
}

interface DesignPageClientProps {
  articles: ArticleData[];
}

export default function DesignPageClient({ articles }: DesignPageClientProps) {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: "80px 0 48px", textAlign: "center", background: "#0C0C10" }}>
        <div className="container">
          <span
            style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "5px 14px",
              borderRadius: "6px",
              background: "rgba(201, 185, 154, 0.15)",
              color: "#C9B99A",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
              <path d="M2 2l7.586 7.586" />
              <circle cx="11" cy="11" r="2" />
            </svg>
            {t.designPage.badge}
          </span>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: language === "zh" ? "0.02em" : "-0.03em",
              marginBottom: "12px",
              color: "#ffffff",
            }}
          >
            {t.designPage.title}
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto" }}>
            {t.designPage.subtitle}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-transition-to-tertiary" style={{ padding: "32px 0 80px" }}>
        <div className="container-wide">
          {articles.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {articles.map((article, index) => (
                <ScrollRevealCard key={article.slug} index={index}>
                  <Card
                    href={`/article/${article.slug}`}
                    title={language === "zh" ? article.title : (article.title_en || article.title)}
                    description={language === "zh" ? (article.summary || article.description) : (article.summary_en || article.summary || article.description)}
                    category="design"
                    image={article.image_url || undefined}
                    date={new Date(article.published_at).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                    hideTag
                  />
                </ScrollRevealCard>
              ))}
            </div>
          )}

          {articles.length > 0 && (
            <div style={{ marginTop: "48px", textAlign: "center" }}>
              <button className="btn btn-outline">{language === "zh" ? "加载更多" : "Load More"}</button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-transition-from-tertiary atmosphere-glow-newsletter" style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "580px" }}>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            {language === "zh" ? "订阅设计资讯" : "Subscribe to Design News"}
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "28px" }}>
            {language === "zh" ? "第一时间获取最新设计趋势和工具推荐" : "Get the latest design trends and tool recommendations first"}
          </p>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <NewsletterForm placeholder="your@email.com" buttonText={t.newsletter.button} variant="dark" />
          </div>
        </div>
      </section>
    </div>
  );
}
