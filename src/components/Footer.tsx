"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";

const footerSections = [
  {
    titleKey: "explore" as const,
    links: [
      { href: "/", labelKey: "home" as const },
      { href: "/design", labelKey: "designNews" as const },
      { href: "/ai", labelKey: "aiNews" as const },
    ],
  },
  {
    titleKey: "categories" as const,
    links: [
      { href: "/design", labelKey: "uiDesign" as const },
      { href: "/design", labelKey: "designSystems" as const },
      { href: "/ai", labelKey: "llm" as const },
      { href: "/ai", labelKey: "multimodalAi" as const },
    ],
  },
  {
    titleKey: "about" as const,
    links: [
      { href: "#", labelKey: "aboutUs" as const },
      { href: "#", labelKey: "contact" as const },
      { href: "#", labelKey: "privacy" as const },
    ],
  },
];

export default function Footer() {
  const { language } = useLanguage();
  const [year, setYear] = useState(2026);
  const t = content[language];

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      style={{
        marginTop: "auto",
        backgroundColor: "#0C0C10",
        borderTop: "1px solid rgba(201,185,154,0.06)",
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "48px",
            padding: "64px 0 48px",
          }}
        >
          <div style={{ gridColumn: "1 / -1", marginBottom: "8px" }}>
            <Link
              href="/"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#F0EDE8",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#C9B99A",
                  display: "inline-block",
                }}
              />
              <span>SYNAPSE</span>
            </Link>
            <p
              style={{
                fontSize: "13px",
                color: "rgba(240,237,232,0.4)",
                marginTop: "12px",
                maxWidth: "320px",
                lineHeight: 1.65,
              }}
            >
              {t.footer.tagline}
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "rgba(240,237,232,0.5)",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                }}
              >
                {t.footer[section.titleKey]}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "13px",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                        color: "rgba(240,237,232,0.4)",
                        transition: "color 0.25s ease",
                        lineHeight: 1.5,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#C9B99A";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(240,237,232,0.4)";
                      }}
                    >
                      {t.footer[link.labelKey]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(201,185,154,0.06)" }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 0",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "rgba(240,237,232,0.25)",
              letterSpacing: "0.01em",
            }}
          >
            Copyright &copy; {year} SYNAPSE · 触点. {t.footer.copyright}
          </p>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <Link
              href="#"
              style={{
                fontSize: "12px",
                color: "rgba(240,237,232,0.35)",
                letterSpacing: "0.01em",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C9B99A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(240,237,232,0.35)";
              }}
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="#"
              style={{
                fontSize: "12px",
                color: "rgba(240,237,232,0.35)",
                letterSpacing: "0.01em",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C9B99A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(240,237,232,0.35)";
              }}
            >
              {language === "zh" ? "使用条款" : "Terms of Use"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
