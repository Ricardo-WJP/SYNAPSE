"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface SubscribeFormProps {
  variant?: "inline" | "modal";
  onClose?: () => void;
}

export default function SubscribeForm({ variant = "inline", onClose }: SubscribeFormProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [categories, setCategories] = useState<string[]>(["design", "ai"]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const isZh = language === "zh";

  const handleCategoryToggle = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage(isZh ? "请输入有效的邮箱地址" : "Please enter a valid email address");
      return;
    }

    if (categories.length === 0) {
      setStatus("error");
      setMessage(isZh ? "请选择至少一个类别" : "Please select at least one category");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, categories }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      setStatus("success");
      setMessage(isZh ? "订阅成功！" : "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : (isZh ? "订阅失败" : "Subscription failed"));
    }
  };

  if (variant === "modal" && onClose) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "24px",
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "#141414",
            borderRadius: "20px",
            padding: "40px",
            maxWidth: "480px",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.08)",
            position: "relative",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              padding: "8px",
              lineHeight: 1,
              fontSize: "20px",
            }}
          >
            ×
          </button>

          <SubscribeFormContent
            email={email}
            setEmail={setEmail}
            categories={categories}
            handleCategoryToggle={handleCategoryToggle}
            handleSubmit={handleSubmit}
            status={status}
            message={message}
            isZh={isZh}
          />
        </div>
      </div>
    );
  }

  return (
    <SubscribeFormContent
      email={email}
      setEmail={setEmail}
      categories={categories}
      handleCategoryToggle={handleCategoryToggle}
      handleSubmit={handleSubmit}
      status={status}
      message={message}
      isZh={isZh}
    />
  );
}

interface SubscribeFormContentProps {
  email: string;
  setEmail: (email: string) => void;
  categories: string[];
  handleCategoryToggle: (cat: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  status: "idle" | "loading" | "success" | "error";
  message: string;
  isZh: boolean;
}

function SubscribeFormContent({
  email,
  setEmail,
  categories,
  handleCategoryToggle,
  handleSubmit,
  status,
  message,
  isZh,
}: SubscribeFormContentProps) {
  const designSelected = categories.includes("design");
  const aiSelected = categories.includes("ai");

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <h3
        style={{
          fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
          fontWeight: 600,
          color: "#F0EDE8",
          marginBottom: "8px",
          letterSpacing: "-0.02em",
        }}
      >
        {isZh ? "订阅更新" : "Subscribe to Updates"}
      </h3>
      <p
        style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: "14px",
          marginBottom: "24px",
          lineHeight: 1.5,
        }}
      >
        {isZh
          ? "输入邮箱订阅设计和 AI 最新内容精选推送"
          : "Get curated design and AI content delivered to your inbox"}
      </p>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={isZh ? "your@email.com" : "your@email.com"}
          disabled={status === "loading" || status === "success"}
          style={{
            width: "100%",
            padding: "14px 16px",
            fontSize: "15px",
            background: "#0C0C10",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            color: "#ffffff",
            outline: "none",
            transition: "border-color 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#C9B99A")}
          onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
        />
      </div>

      <div style={{ marginBottom: "24px" }}>
        <label
          style={{
            display: "block",
            color: "rgba(255,255,255,0.6)",
            fontSize: "13px",
            marginBottom: "12px",
          }}
        >
          {isZh ? "感兴趣的类别" : "Categories of interest"}
        </label>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            type="button"
            onClick={() => handleCategoryToggle("design")}
            disabled={status === "loading" || status === "success"}
            style={{
              flex: 1,
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 600,
              background: designSelected ? "rgba(201, 185, 154, 0.15)" : "#0C0C10",
              border: `1px solid ${designSelected ? "#C9B99A" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "8px",
              color: designSelected ? "#C9B99A" : "rgba(255,255,255,0.6)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {isZh ? "设计" : "Design"}
          </button>
          <button
            type="button"
            onClick={() => handleCategoryToggle("ai")}
            disabled={status === "loading" || status === "success"}
            style={{
              flex: 1,
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 600,
              background: aiSelected ? "rgba(180, 190, 210, 0.15)" : "#0C0C10",
              border: `1px solid ${aiSelected ? "#B4BED2" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "8px",
              color: aiSelected ? "#B4BED2" : "rgba(255,255,255,0.6)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            AI
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        style={{
          width: "100%",
          padding: "14px 24px",
          fontSize: "15px",
          fontWeight: 600,
          background: status === "success"
            ? "rgba(76, 175, 80, 0.2)"
            : "linear-gradient(135deg, #C9B99A 0%, #D8CBAF 100%)",
          border: "none",
          borderRadius: "10px",
          color: status === "success" ? "#81C784" : "#0C0C10",
          cursor: status === "loading" || status === "success" ? "default" : "pointer",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {status === "loading" ? (
          <>
            <span
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid rgba(12,12,16,0.3)",
                borderTopColor: "#0C0C10",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
              }}
            />
            {isZh ? "订阅中..." : "Subscribing..."}
          </>
        ) : status === "success" ? (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {message}
          </>
        ) : (
          isZh ? "立即订阅" : "Subscribe Now"
        )}
      </button>

      {status === "error" && message && (
        <p
          style={{
            marginTop: "12px",
            padding: "10px 14px",
            background: "rgba(244, 67, 54, 0.1)",
            borderRadius: "8px",
            color: "#ef5350",
            fontSize: "13px",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
