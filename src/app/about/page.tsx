import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于 — SYNAPSE · 触点",
  description: "了解 SYNAPSE · 触点的使命和研究方向。",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "80px 0 64px",
          backgroundColor: "#0C0C10",
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "16px", color: "#F0EDE8" }}>
            关于
          </h1>
          <p style={{ fontSize: "18px", color: "rgba(240,237,232,0.5)", maxWidth: "480px" }}>
            设计师 / 研究者 / AI 探索者
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section" style={{ backgroundColor: "#0C0C10" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          {/* About Card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "48px",
              marginBottom: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: "24px",
                color: "#F0EDE8",
              }}
            >
              关于我
            </h2>
            <p
              style={{
                color: "rgba(240,237,232,0.6)",
                lineHeight: 1.8,
                marginBottom: "16px",
              }}
            >
              我是一名设计学研究生，专注人机交互、无障碍设计和驾驶安全研究。我的核心研究方向是 AR-HUD 在听障驾驶员场景中的应用。
            </p>
            <p style={{ color: "rgba(240,237,232,0.6)", lineHeight: 1.8 }}>
              这个网站是我整理设计资讯、AI 最新动态和个人作品的知识库。希望它能帮助你了解设计趋势、发现有趣的 AI 工具、或者为你的研究提供灵感。
            </p>
          </div>

          {/* Research Card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "48px",
              marginBottom: "32px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: "24px",
                color: "#F0EDE8",
              }}
            >
              研究方向
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "人机交互（HCI）与用户体验设计",
                "无障碍设计（Accessibility）",
                "AR-HUD 在驾驶安全中的应用",
                "AI 辅助设计工具",
              ].map((item, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "12px 0",
                    borderBottom: index < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      backgroundColor: "#C9B99A",
                      marginTop: "8px",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: "rgba(240,237,232,0.6)", lineHeight: 1.6 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Card */}
          <div
            id="contact"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "48px",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: "24px",
                color: "#F0EDE8",
              }}
            >
              联系方式
            </h2>
            <p style={{ color: "rgba(240,237,232,0.6)", marginBottom: "24px" }}>
              欢迎交流设计、研究或 AI 相关的想法。
            </p>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <a
                href="mailto:your.email@example.com"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#C9B99A",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                邮箱联系
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#C9B99A",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
              >
                <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
