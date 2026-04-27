"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

interface ArticleNavProps {
  category: string;
}

export default function ArticleNav({ category }: ArticleNavProps) {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <nav
      style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "48px 0",
        backgroundColor: "#0C0C10",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "800px",
          display: "flex",
          justifyContent: "space-between",
          gap: "24px",
        }}
      >
        <Link
          href={`/${category}`}
          className="article-nav-btn article-nav-btn-primary"
        >
          <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t.article.backToDesign.includes("返回") ? (category === "design" ? t.article.backToDesign : t.article.backToAI) : (category === "design" ? "Back to Design" : "Back to AI")}
        </Link>
        <Link
          href="/"
          className="article-nav-btn article-nav-btn-secondary"
        >
          {t.article.backToHome}
        </Link>
      </div>
    </nav>
  );
}
