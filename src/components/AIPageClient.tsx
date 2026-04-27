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

interface AIPageClientProps {
  articles: ArticleData[];
}

export default function AIPageClient({ articles }: AIPageClientProps) {
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
              background: "rgba(66, 133, 244, 0.15)",
              color: "#4285f4",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
              <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
              <path d="M9 18h6" />
            </svg>
            {t.aiPage.badge}
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
            {t.aiPage.title}
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: "520px", margin: "0 auto" }}>
            {t.aiPage.subtitle}
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-transition-to-tertiary atmosphere-glow-ai" style={{ padding: "32px 0 80px" }}>
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
                    category="ai"
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
            {t.aiPage.subscribeTitle}
          </h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: "28px" }}>
            {t.aiPage.subscribeDesc}
          </p>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <NewsletterForm placeholder="your@email.com" buttonText={t.newsletter.button} variant="dark" />
          </div>
        </div>
      </section>
    </div>
  );
}
