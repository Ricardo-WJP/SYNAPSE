import { getArticles } from "@/lib/supabase";
import DesignPageClient from "@/components/DesignPageClient";

export const metadata = {
  title: "SYNAPSE · 触点 — 设计资讯",
  description: "关注全球设计趋势、工具更新和最佳实践。从 UI/UX 到品牌设计，探索设计领域的最新动态。",
};

const fallbackArticles = [
  {
    slug: "google-material-design-2026",
    title: "Google Material Design 2026 更新：融入 AI 的设计语言",
    title_en: "Google Material Design 2026: AI-Integrated Design Language",
    summary: "Google 发布了 Material Design 的最新版本，首次深度整合 AI 辅助设计功能，让设计系统更加智能化。",
    summary_en: "Google releases the latest version of Material Design, deeply integrating AI-assisted design features for a smarter design system.",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    published_at: "2026-04-22",
  },
  {
    slug: "figma-vars-update",
    title: "Figma Variables 全面升级：支持条件逻辑",
    title_en: "Figma Variables Upgraded: Conditional Logic Support",
    summary: "Figma 宣布 Variables 功能重大更新，现在支持条件逻辑和计算属性，设计系统管理更高效。",
    summary_en: "Figma announces a major update to Variables, now supporting conditional logic and computed properties for more efficient design system management.",
    image_url: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80",
    published_at: "2026-04-20",
  },
  {
    slug: "typography-trends-2026",
    title: "2026 字体设计趋势：可变字体与动态排版",
    title_en: "2026 Typography Trends: Variable Fonts & Dynamic Typography",
    summary: "可变字体技术正在重新定义数字排版，动态响应式字体成为主流设计工具的新标准。",
    summary_en: "Variable font technology is redefining digital typography, with dynamic responsive fonts becoming the new standard for mainstream design tools.",
    image_url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    published_at: "2026-04-19",
  },
  {
    slug: "minimalism-evolution",
    title: "极简主义的进化：从少即是多到有意义的设计",
    title_en: "The Evolution of Minimalism: From Less is More to Meaningful Design",
    summary: "当代极简主义设计正在从单纯的视觉简化转向更有意义的功能聚焦，强调用户意图而非形式。",
    summary_en: "Contemporary minimalism is evolving from pure visual simplification to more meaningful functional focus, emphasizing user intent over form.",
    image_url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80",
    published_at: "2026-04-18",
  },
  {
    slug: "design-systems-scale",
    title: "设计系统规模化：跨团队协作的最佳实践",
    title_en: "Design Systems at Scale: Best Practices for Cross-Team Collaboration",
    summary: "大型企业设计系统正在从单一团队工具演变为跨部门协作平台，需要新的治理模式。",
    summary_en: "Large enterprise design systems are evolving from single-team tools to cross-departmental collaboration platforms, requiring new governance models.",
    image_url: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    published_at: "2026-04-17",
  },
  {
    slug: "spatial-design-ar",
    title: "空间设计新纪元：AR 界面设计原则",
    title_en: "A New Era of Spatial Design: AR Interface Design Principles",
    summary: "增强现实正在改变界面设计范式，从二维屏幕扩展到三维空间，需要全新的交互设计思维。",
    summary_en: "Augmented reality is changing the interface design paradigm, expanding from 2D screens to 3D space, requiring new interactive design thinking.",
    image_url: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80",
    published_at: "2026-04-16",
  },
];

export default async function DesignPage() {
  const { data: dbArticles } = await getArticles({
    category: "design",
    limit: 12,
  });

  const articles = dbArticles && dbArticles.length > 0 ? dbArticles : fallbackArticles;

  return <DesignPageClient articles={articles} />;
}
