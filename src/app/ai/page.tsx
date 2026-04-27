import { getArticles } from "@/lib/supabase";
import AIPageClient from "@/components/AIPageClient";

export const metadata = {
  title: "SYNAPSE · 触点 — AI 资讯",
  description:
    "追踪 AI 领域的最新突破、产品发布和行业动态。了解最前沿的 AI 技术和应用趋势。",
};

const fallbackArticles = [
  {
    slug: "claude-4-release",
    title: "Claude 4 发布：AI 编程能力大幅提升",
    title_en: "Claude 4 Released: Major AI Coding Improvements",
    summary: "Anthropic 推出新一代 Claude 4 模型，在代码生成、多模态理解和长上下文处理方面有显著突破。",
    summary_en: "Anthropic launches the new Claude 4 model with significant breakthroughs in code generation, multimodal understanding, and long-context processing.",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    published_at: "2026-04-21",
  },
  {
    slug: "gpt-5-preview",
    title: "GPT-5 预览：多模态推理达到新高度",
    title_en: "GPT-5 Preview: Multimodal Reasoning Reaches New Heights",
    summary: "OpenAI 发布 GPT-5 技术预览，在视觉理解、数学推理和代码生成方面实现重大飞跃。",
    summary_en: "OpenAI releases GPT-5 technical preview, achieving major breakthroughs in visual understanding, mathematical reasoning, and code generation.",
    image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
    published_at: "2026-04-20",
  },
  {
    slug: "ai-image-generation-2026",
    title: "2026 AI 图像生成：从工具到创意伙伴",
    title_en: "2026 AI Image Generation: From Tool to Creative Partner",
    summary: "AI 图像生成技术正在从单纯的工具转变为设计师的真正创意伙伴，实现更精准的语义控制。",
    summary_en: "AI image generation technology is evolving from a pure tool into a true creative partner for designers, achieving more precise semantic control.",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    published_at: "2026-04-19",
  },
  {
    slug: "multimodal-ai-trends",
    title: "多模态 AI 趋势：视觉-语言融合新范式",
    title_en: "Multimodal AI Trends: New Vision-Language Paradigm",
    summary: "多模态 AI 正在重新定义人机交互方式，从文本到视觉的无缝转换成为新的技术焦点。",
    summary_en: "Multimodal AI is redefining human-computer interaction, with seamless text-to-visual translation becoming the new technical focus.",
    image_url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
    published_at: "2026-04-18",
  },
  {
    slug: "edge-ai-deployment",
    title: "边缘 AI 部署：从云端到终端的架构变革",
    title_en: "Edge AI Deployment: Architecture Transformation from Cloud to Edge",
    summary: "边缘 AI 正在改变模型部署范式，让智能推理更接近数据源，降低延迟并提升隐私保护。",
    summary_en: "Edge AI is changing the model deployment paradigm, bringing intelligent inference closer to the data source, reducing latency and improving privacy.",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    published_at: "2026-04-17",
  },
  {
    slug: "ai-ethics-framework",
    title: "AI 伦理框架 2.0：全球协作治理新进展",
    title_en: "AI Ethics Framework 2.0: New Progress in Global Collaborative Governance",
    summary: "各国正在建立更完善的 AI 伦理治理框架，推动负责任的 AI 开发和部署标准。",
    summary_en: "Countries are establishing more comprehensive AI ethics governance frameworks, promoting responsible AI development and deployment standards.",
    image_url: "https://images.unsplash.com/photo-1535378437327-b71494669e9d?w=800&q=80",
    published_at: "2026-04-16",
  },
];

export default async function AIPage() {
  const { data: dbArticles } = await getArticles({
    category: "ai",
    limit: 12,
  });

  const articles = dbArticles && dbArticles.length > 0 ? dbArticles : fallbackArticles;

  return <AIPageClient articles={articles} />;
}
