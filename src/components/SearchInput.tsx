"use client";

import { useState, useRef, useEffect } from "react";
import { useSearch } from "@/hooks/useSearch";
import { usePopularArticles } from "@/hooks/usePopularArticles";
import { useLanguage } from "@/context/LanguageContext";
import { content } from "@/lib/i18n";
import Link from "next/link";

export default function SearchInput() {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = content[language];
  const { query, setQuery, results, isLoading } = useSearch();
  const { articles: popularArticles, isLoading: isPopularLoading } = usePopularArticles();

  const showOverlay = isExpanded;

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setQuery]);

  function handleClose() {
    setIsExpanded(false);
    setQuery("");
    inputRef.current?.blur();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      handleClose();
    }
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Search Icon Button */}
      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            color: "rgba(240,237,232,0.6)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(201,185,154,0.3)";
            e.currentTarget.style.color = "#C9B99A";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            e.currentTarget.style.color = "rgba(240,237,232,0.6)";
          }}
          aria-label="Search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </button>
      )}

      {/* Expanded Search Input */}
      {isExpanded && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(18,18,24,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(201,185,154,0.15)",
            borderRadius: "10px",
            padding: "0 12px",
            width: "280px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(201,185,154,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === "zh" ? "搜索文章..." : "Search articles..."}
            style={{
              flex: 1,
              height: "40px",
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "14px",
              color: "#F0EDE8",
              fontFamily: "var(--font-sans)",
            }}
          />
          <button
            onClick={handleClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
              background: "transparent",
              border: "none",
              color: "rgba(240,237,232,0.4)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Search Results Overlay */}
      {showOverlay && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "340px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "rgba(18,18,24,0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(201,185,154,0.1)",
            borderRadius: "12px",
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            zIndex: 200,
          }}
        >
          {isLoading && query.trim() && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <div style={{ color: "rgba(240,237,232,0.4)", fontSize: "13px" }}>
                {language === "zh" ? "搜索中..." : "Searching..."}
              </div>
            </div>
          )}

          {!isLoading && query.trim() && results.length === 0 && (
            <div style={{ padding: "20px", textAlign: "center" }}>
              <div style={{ color: "rgba(240,237,232,0.4)", fontSize: "13px" }}>
                {language === "zh" ? "未找到相关文章" : "No results found"}
              </div>
            </div>
          )}

          {!query.trim() && (
            <div>
              <div style={{ padding: "12px 16px 8px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)" }}>
                {language === "zh" ? "热门文章" : "Popular Articles"}
              </div>
              {isPopularLoading ? (
                <div style={{ padding: "20px", textAlign: "center", color: "rgba(240,237,232,0.4)", fontSize: "13px" }}>
                  {language === "zh" ? "加载中..." : "Loading..."}
                </div>
              ) : (
                <div style={{ padding: "0 8px 8px" }}>
                  {popularArticles.slice(0, 5).map((article) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.slug}`}
                      onClick={handleClose}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 12px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {article.image_url && (
                        <img
                          src={article.image_url}
                          alt=""
                          style={{
                            width: "44px",
                            height: "44px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#F0EDE8",
                            lineHeight: 1.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {language === "zh" ? article.title : (article.title_en || article.title)}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            marginTop: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              padding: "2px 6px",
                              borderRadius: "4px",
                              background: article.category === "design" ? "rgba(201,185,154,0.12)" : "rgba(180,190,210,0.12)",
                              color: article.category === "design" ? "#C9B99A" : "#B4BED2",
                              textTransform: "uppercase",
                            }}
                          >
                            {article.category}
                          </span>
                          <span style={{ fontSize: "11px", color: "rgba(240,237,232,0.3)" }}>
                            {new Date(article.published_at).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div style={{ padding: "8px" }}>
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  onClick={handleClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {article.image_url && (
                    <img
                      src={article.image_url}
                      alt=""
                      style={{
                        width: "44px",
                        height: "44px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#F0EDE8",
                        lineHeight: 1.3,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {language === "zh" ? article.title : (article.title_en || article.title)}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: article.category === "design" ? "rgba(201,185,154,0.12)" : "rgba(180,190,210,0.12)",
                          color: article.category === "design" ? "#C9B99A" : "#B4BED2",
                          textTransform: "uppercase",
                        }}
                      >
                        {article.category}
                      </span>
                      <span style={{ fontSize: "11px", color: "rgba(240,237,232,0.3)" }}>
                        {new Date(article.published_at).toLocaleDateString(language === "zh" ? "zh-CN" : "en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div
              style={{
                padding: "12px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "12px", color: "rgba(240,237,232,0.3)" }}>
                {language === "zh" ? "按 Esc 关闭" : "Press Esc to close"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
