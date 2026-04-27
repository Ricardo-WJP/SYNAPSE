import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "SYNAPSE · 触点 — 设计与AI的前沿资讯",
  description:
    "连接设计与智能的每一个瞬间。精选全球前沿设计趋势与AI资讯，为设计师、创作者和科技从业者打造的灵感平台。",
  keywords: ["设计", "AI", "人工智能", "UI设计", "UX设计", "设计资讯", "SYNAPSE", "触点"],
  authors: [{ name: "SYNAPSE Team" }],
  openGraph: {
    title: "SYNAPSE · 触点",
    description: "连接设计与智能的每一个瞬间",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,700&family=Noto+Sans+SC:wght@300;400;500;700&family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans min-h-screen flex flex-col" suppressHydrationWarning>
        <LanguageProvider>
          {/* Atmosphere grain texture layer */}
          <div className="atmosphere-grain" aria-hidden="true" />
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
