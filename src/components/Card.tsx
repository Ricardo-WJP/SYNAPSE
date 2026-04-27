"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

interface CardProps {
  href: string;
  title: string;
  description?: string;
  category: "design" | "ai";
  image?: string;
  date?: string;
  featured?: boolean;
  hideTag?: boolean;
}

const tagColors = {
  design: { bg: "rgba(201, 185, 154, 0.12)", text: "#C9B99A" },
  ai: { bg: "rgba(180, 190, 210, 0.12)", text: "#B4BED2" },
};

function DesignIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

function AIIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
      <path d="M16 14H8a4 4 0 0 0-4 4v2h16v-2a4 4 0 0 0-4-4z" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M9 18h6" />
    </svg>
  );
}

export default function Card({
  href,
  title,
  description,
  category,
  image,
  date,
  featured,
  hideTag,
}: CardProps) {
  const { language } = useLanguage();
  const t = content[language];
  const tc = tagColors[category];

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          background: "rgba(255,255,255,0.02)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderRadius: featured ? "14px" : "12px",
          overflow: "hidden",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.35s ease",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,185,154,0.06)";
          e.currentTarget.style.borderColor = "rgba(201,185,154,0.12)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
        }}
      >
        {image && (
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              aspectRatio: featured ? "16/9" : "16/10",
            }}
          >
            <img
              src={image}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                filter: "brightness(0.9) saturate(0.9)",
              }}
              loading="eager"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </div>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "10px",
            padding: featured ? "22px 26px 26px" : "18px 22px 22px",
          }}
        >
          {!hideTag && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "3px 9px 3px 7px",
                  borderRadius: "5px",
                  background: tc.bg,
                  color: tc.text,
                  textTransform: "uppercase",
                }}
              >
                {category === "design" ? <DesignIcon /> : <AIIcon />}
                {t.categoryLabels[category]}
              </span>
            </div>
          )}

          <h3
            style={{
              fontSize: featured ? "20px" : "17px",
              fontWeight: 600,
              lineHeight: 1.35,
              letterSpacing: language === "zh" ? "0.01em" : "-0.015em",
              color: "#F0EDE8",
              margin: 0,
              transition: "color 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#C9B99A";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#F0EDE8";
            }}
          >
            {title}
          </h3>

          <p
            style={{
              fontSize: "14px",
              color: "rgba(240,237,232,0.45)",
              lineHeight: 1.65,
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: featured ? 3 : 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          <div style={{ marginTop: "auto", paddingTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: "#C9B99A",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "gap 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.gap = "10px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.gap = "6px";
              }}
            >
              {language === "zh" ? "阅读更多" : "Read More"}
              <svg
                style={{ width: "13px", height: "13px", transition: "transform 0.25s ease" }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            {date && (
              <span style={{ fontSize: "12px", color: "rgba(240,237,232,0.25)", fontWeight: 400 }}>
                {date}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
