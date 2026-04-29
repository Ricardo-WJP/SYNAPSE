"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

interface SideArticle {
  href: string;
  title: string;
  description: string;
  category: "design" | "ai";
  date: string;
}

interface SideCardProps {
  article: SideArticle;
  delay: number;
}

const tagColors = {
  design: { bg: "rgba(201, 185, 154, 0.12)", text: "#C9B99A" },
  ai: { bg: "rgba(180, 190, 210, 0.12)", text: "#B4BED2" },
};

function DesignIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
      <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M9 18h6" />
    </svg>
  );
}

export default function SideCard({ article, delay }: SideCardProps) {
  const { language } = useLanguage();
  const t = content[language];
  const tc = tagColors[article.category];

  return (
    <Link
      href={article.href}
      className={`animate-fade-in-up delay-${delay} sidecard-interactive`}
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "12px",
        padding: "22px",
        transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s ease",
        border: "1px solid rgba(255,255,255,0.05)",
        touchAction: "manipulation",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "10px",
            fontWeight: 600,
            padding: "3px 8px 3px 6px",
            borderRadius: "5px",
            background: tc.bg,
            color: tc.text,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {article.category === "design" ? <DesignIcon /> : <AIIcon />}
          {t.categoryLabels[article.category]}
        </span>
        <span style={{ fontSize: "11px", color: "rgba(240,237,232,0.25)" }}>{article.date}</span>
      </div>
      <h3
        style={{
          fontSize: "15px",
          fontWeight: 600,
          lineHeight: 1.4,
          letterSpacing: language === "zh" ? "0.01em" : "-0.01em",
          color: "#F0EDE8",
          margin: 0,
          transition: "color 0.25s ease",
        }}
      >
        {article.title}
      </h3>
      <p
        style={{
          fontSize: "13px",
          color: "rgba(240,237,232,0.4)",
          lineHeight: 1.6,
          margin: 0,
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {article.description}
      </p>
    </Link>
  );
}
