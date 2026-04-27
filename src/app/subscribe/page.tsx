"use client";

import SubscribeForm from "@/components/SubscribeForm";
import Link from "next/link";

export default function SubscribePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        background: "#0C0C10",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
        }}
      >
        <SubscribeForm />
      </div>

      <Link
        href="/"
        style={{
          marginTop: "32px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "rgba(255,255,255,0.4)",
          fontSize: "14px",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#C9B99A";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "rgba(255,255,255,0.4)";
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        返回首页
      </Link>
    </div>
  );
}
