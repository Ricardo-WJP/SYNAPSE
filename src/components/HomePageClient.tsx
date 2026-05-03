"use client";

import Card from "@/components/Card";
import ScrollRevealCard from "@/components/ScrollRevealCard";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";
import SideCard from "@/components/SideCard";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

interface FeaturedArticle {
  href: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: "design" | "ai";
  image: string;
  date: string;
}

interface HomePageClientProps {
  articles: FeaturedArticle[];
}

export default function HomePageClient({ articles }: HomePageClientProps) {
  const { language } = useLanguage();
  const t = content[language];

  const displayArticles = articles.length > 0 ? articles : [];
  const mainFeature = displayArticles[0];
  const sideFeatures = displayArticles.slice(1, 3);
  const gridFeatures = displayArticles.slice(1);

  return (
    <div>
      {/* ===== Hero — Editorial Layout with Background Image ===== */}
      <section
        className="atmosphere-glow-hero"
        style={{
          minHeight: "95dvh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#0C0C10",
          zIndex: 0,
        }}
      >
        {/* Background Image with Mask */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        >
          <img
            src="/hero-bg.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* Gradient Mask — darken edges, lighter center */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
                radial-gradient(ellipse 70% 60% at 50% 50%, rgba(12,12,16,0.4) 0%, rgba(12,12,16,0.85) 100%),
                linear-gradient(to bottom, rgba(12,12,16,0.7) 0%, rgba(12,12,16,0.3) 50%, rgba(12,12,16,0.8) 100%)
              `,
            }}
          />
          {/* Warm accent glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 50% 80% at 70% 30%, rgba(201,185,154,0.08) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Vertical Decorative Text — Left Side */}
        <div
          className="hero-vertical-text"
          style={{
            position: "absolute",
            left: "clamp(12px, 2vw, 24px)",
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "rgba(201,185,154,0.3)" }} />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(201,185,154,0.4)",
              whiteSpace: "nowrap",
            }}
          >
            {language === "zh" ? "设计 & 智能" : "Design & Intelligence"}
          </span>
          <div style={{ width: "40px", height: "1px", background: "rgba(201,185,154,0.3)" }} />
        </div>

        {/* Main Content */}
        <div
          className="container-wide hero-content"
          style={{
            position: "relative",
            zIndex: 2,
            padding: "120px clamp(24px, 5vw, 48px)",
            width: "100%",
          }}
        >
          {/* Top Label with Divider */}
          <ScrollRevealCard index={0}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "48px",
              }}
            >
              <div style={{ width: "60px", height: "1px", background: "rgba(201,185,154,0.4)" }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(201,185,154,0.7)",
                }}
              >
                SYNAPSE · 触点
              </span>
            </div>
          </ScrollRevealCard>

          {/* Main Title — Full Width Editorial Style */}
          <ScrollRevealCard index={1}>
            <div style={{ marginBottom: "32px" }}>
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  fontWeight: 700,
                  color: "#F0EDE8",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                }}
              >
                {language === "zh" ? (
                  <>
                    <span style={{ display: "block", color: "rgba(240,237,232,0.4)", lineHeight: 1.2 }}>连接</span>
                    <span style={{ display: "block", lineHeight: 1.1 }}>
                    设计<span style={{ fontSize: "0.7em", margin: "0 0.15em" }}>&</span>智能
                  </span>
                    <span style={{ display: "block", fontStyle: "italic", color: "#C9B99A", lineHeight: 1.2 }}>的每一个瞬间</span>
                  </>
                ) : (
                  <>
                    <span style={{ display: "block", color: "rgba(240,237,232,0.4)" }}>Connecting</span>
                    <span style={{ display: "block" }}>Every Moment</span>
                    <span style={{ display: "block", fontStyle: "italic", color: "#C9B99A" }}>of Design<span style={{ fontSize: "0.7em", margin: "0 0.15em" }}>&</span>Intelligence</span>
                  </>
                )}
              </h1>
            </div>
          </ScrollRevealCard>

          {/* Divider with Label */}
          <ScrollRevealCard index={2}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                marginBottom: "32px",
              }}
            >
              <div style={{ flex: 1, height: "1px", background: "rgba(201,185,154,0.2)" }} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "9px",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(201,185,154,0.5)",
                }}
              >
                {language === "zh" ? "前沿资讯平台" : "Cutting-Edge Insights Platform"}
              </span>
              <div style={{ flex: 1, height: "1px", background: "rgba(201,185,154,0.2)" }} />
            </div>
          </ScrollRevealCard>

          {/* Subtitle */}
          <ScrollRevealCard index={3}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(240,237,232,0.5)",
                lineHeight: 1.4,
                marginBottom: "48px",
                maxWidth: "none",
                whiteSpace: "nowrap",
                letterSpacing: "0.02em",
              }}
            >
              {language === "zh"
                ? "精选全球前沿设计趋势与AI资讯，为设计师、创作者和科技从业者打造的灵感平台。"
                : "Curated global design trends and cutting-edge AI insights — an inspiration platform for designers, creators, and tech professionals"}
            </p>
          </ScrollRevealCard>

          {/* CTA Buttons */}
          <ScrollRevealCard index={4}>
            <div
              style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
            <Link
              href="/design"
              style={{
                padding: "14px 32px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                background: "#C9B99A",
                color: "#0C0C10",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D8CBAF";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,185,154,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#C9B99A";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {t.hero.browseDesign}
            </Link>
            <Link
              href="/ai"
              style={{
                padding: "14px 32px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                background: "transparent",
                color: "#F0EDE8",
                border: "1px solid rgba(240,237,232,0.25)",
                borderRadius: "4px",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,185,154,0.6)";
                e.currentTarget.style.color = "#C9B99A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(240,237,232,0.25)";
                e.currentTarget.style.color = "#F0EDE8";
              }}
            >
              {t.hero.aiNews}
            </Link>
            </div>
          </ScrollRevealCard>
        </div>

        {/* Scroll Indicator — Bottom Center */}
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            zIndex: 3,
          }}
        >
          <span
            style={{
              fontSize: "9px",
              letterSpacing: "0.2em",
              color: "rgba(201,185,154,0.3)",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
            }}
          >
            {language === "zh" ? "向下探索" : "Scroll to Explore"}
          </span>
          <div
            style={{
              width: "1px",
              height: "32px",
              background: "linear-gradient(to bottom, rgba(201,185,154,0.4), transparent)",
            }}
          />
        </div>
      </section>

      {/* ===== Featured — Editor's Pick ===== */}
      <section className="section-transition-to-secondary" style={{ padding: "80px 0 100px" }}>
        <div className="container-wide">
          {/* Section Header */}
          <div className="section-header animate-fade-in-up">
            <span className="section-label">
              {language === "zh" ? "编辑精选 · Editor's Pick" : "Editor's Pick"}
            </span>
          </div>

          {displayArticles.length > 0 ? (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                  alignItems: "start",
                }}
                className="featured-grid"
              >
                <ScrollRevealCard index={0}>
                  <Card
                    href={mainFeature.href}
                    title={language === "zh" ? mainFeature.title : mainFeature.titleEn}
                    description={language === "zh" ? mainFeature.description : mainFeature.descriptionEn}
                    category={mainFeature.category}
                    image={mainFeature.image}
                    date={mainFeature.date}
                    featured
                  />
                </ScrollRevealCard>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  {sideFeatures.map((article, index) => (
                    <ScrollRevealCard key={article.href} index={index + 1}>
                      <SideCard
                        article={{
                          ...article,
                          title: language === "zh" ? article.title : article.titleEn,
                          description: language === "zh" ? article.description : article.descriptionEn,
                        }}
                        delay={index + 1}
                      />
                    </ScrollRevealCard>
                  ))}
                </div>
              </div>

              {/* ===== Latest Grid ===== */}
              <section style={{ padding: "80px 0 100px" }}>
                <div className="container-wide">
                  {/* Section Header */}
                  <div className="section-header animate-fade-in-up">
                    <span className="section-label">
                      {language === "zh" ? "最新发布 · Latest" : "Latest Articles"}
                    </span>
                  </div>

                  <div
                    className="latest-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: "24px",
                    }}
                  >
                    {gridFeatures.map((article, index) => (
                      <ScrollRevealCard key={article.href} index={index}>
                        <Card
                          href={article.href}
                          title={language === "zh" ? article.title : article.titleEn}
                          description={language === "zh" ? article.description : article.descriptionEn}
                          category={article.category}
                          image={article.image}
                          date={article.date}
                        />
                      </ScrollRevealCard>
                    ))}
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "60px 0", color: "rgba(240,237,232,0.4)" }}>
              {language === "zh" ? "暂无文章" : "No articles yet"}
            </div>
          )}
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="section-transition-from-secondary atmosphere-glow-newsletter" style={{ padding: "100px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: "560px" }}>
          <div className="hero-divider-line" style={{ maxWidth: "40px", margin: "0 auto 32px" }} />
          <h2
            className="animate-fade-in-up"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#F0EDE8",
              marginBottom: "14px",
            }}
          >
            {t.newsletter.title}
          </h2>
          <p
            className="animate-fade-in-up delay-1"
            style={{
              fontSize: "15px",
              color: "rgba(240,237,232,0.45)",
              lineHeight: 1.6,
              marginBottom: "36px",
            }}
          >
            {t.newsletter.subtitle}
          </p>
          <div className="animate-fade-in-up delay-2" style={{ maxWidth: "420px", margin: "0 auto" }}>
            <NewsletterForm
              placeholder={t.newsletter.placeholder}
              buttonText={t.newsletter.button}
              variant="dark"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
