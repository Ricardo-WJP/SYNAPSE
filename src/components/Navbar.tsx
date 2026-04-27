"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";
import SearchInput from "./SearchInput";

const navLinks = [
  { href: "/", labelKey: "home" as const },
  { href: "/design", labelKey: "design" as const },
  { href: "/ai", labelKey: "ai" as const },
];

const languages = [
  { code: "zh" as const, label: "中文", flag: "🇨🇳" },
  { code: "en" as const, label: "English", flag: "🇺🇸" },
];

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const t = content[language];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(5, 5, 8, 0.25)",
        backdropFilter: "blur(20px) saturate(100%)",
        WebkitBackdropFilter: "blur(20px) saturate(100%)",
        borderBottom: "1px solid rgba(201,185,154,0.06)",
        transition: "all 0.35s ease",
      }}
    >
      <nav
        className="container-wide"
        style={{
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Minimal dot accent */}
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#C9B99A",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "#F0EDE8",
              textTransform: "uppercase",
              fontFamily: "var(--font-sans)",
            }}
          >
            SYNAPSE
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className="desktop-nav"
          style={{
            alignItems: "center",
            gap: "48px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "rgba(240,237,232,0.5)",
                padding: "8px 4px",
                transition: "color 0.25s ease",
                textTransform: "uppercase",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C9B99A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(240,237,232,0.5)";
              }}
            >
              {t.nav[link.labelKey]}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <SearchInput />
          {/* Language Selector Dropdown */}
          <div ref={langRef} style={{ position: "relative" }}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "7px 12px 7px 14px",
                fontSize: "12px",
                fontWeight: 500,
                background: "transparent",
                color: "rgba(240,237,232,0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,185,154,0.3)";
                e.currentTarget.style.color = "#C9B99A";
              }}
              onMouseLeave={(e) => {
                if (!isLangOpen) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "rgba(240,237,232,0.6)";
                }
              }}
            >
              <span style={{ display: "inline-block", verticalAlign: "middle", fontSize: "14px", lineHeight: 1, marginTop: "-3px" }}>{currentLang.flag}</span>
              <span style={{ display: "inline-block", verticalAlign: "middle", lineHeight: 1.2 }}>{currentLang.label}</span>
              <svg
                style={{
                  width: "11px",
                  height: "11px",
                  transition: "transform 0.2s ease",
                  transform: isLangOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown */}
            {isLangOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  background: "rgba(18, 18, 24, 0.8)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  borderRadius: "10px",
                  padding: "6px",
                  minWidth: "140px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  border: "1px solid rgba(201,185,154,0.08)",
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "10px",
                      width: "100%",
                      padding: "10px 14px",
                      fontSize: "13px",
                      fontWeight: language === lang.code ? 600 : 400,
                      color: language === lang.code ? "#C9B99A" : "rgba(240,237,232,0.7)",
                      background: language === lang.code ? "rgba(201,185,154,0.1)" : "transparent",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (language !== lang.code) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (language !== lang.code) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <span style={{ display: "inline-block", verticalAlign: "middle", fontSize: "15px", lineHeight: 1, marginTop: "-3px" }}>{lang.flag}</span>
                    <span style={{ display: "inline-block", verticalAlign: "middle", lineHeight: 1.2 }}>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/subscribe"
            className="btn btn-primary desktop-nav"
            style={{
              minWidth: "100px",
              padding: "9px 22px",
              fontSize: "12px",
              borderRadius: "6px",
              textAlign: "center",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {t.nav.subscribe}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              padding: "8px",
              background: "none",
              border: "none",
              color: "#F0EDE8",
              cursor: "pointer",
              borderRadius: "6px",
            }}
            aria-label="Menu"
          >
            <svg style={{ width: "22px", height: "22px" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "73px",
              left: 0,
              right: 0,
              backgroundColor: "rgba(12, 12, 16, 0.9)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              borderBottom: "1px solid rgba(201,185,154,0.06)",
              padding: "16px clamp(24px, 5vw, 48px)",
              borderRadius: "0 0 12px 12px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "rgba(240,237,232,0.7)",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {t.nav[link.labelKey]}
                </Link>
              ))}

              {/* Mobile Language Selector */}
              <Link
                href="/subscribe"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#0C0C10",
                  background: "linear-gradient(135deg, #C9B99A 0%, #D8CBAF 100%)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                {t.nav.subscribe}
              </Link>

              <div style={{ paddingTop: "12px", display: "flex", gap: "8px" }}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "11px",
                      fontSize: "13px",
                      fontWeight: 600,
                      background: language === lang.code ? "rgba(201,185,154,0.12)" : "rgba(255,255,255,0.03)",
                      color: language === lang.code ? "#C9B99A" : "rgba(240,237,232,0.6)",
                      border: language === lang.code ? "1px solid rgba(201,185,154,0.2)" : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ display: "inline-block", verticalAlign: "middle", fontSize: "15px", lineHeight: 1, marginTop: "-3px" }}>{lang.flag}</span>
                    <span style={{ display: "inline-block", verticalAlign: "middle", lineHeight: 1.2 }}>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
