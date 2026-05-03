import HomePageClient from "@/components/HomePageClient";
import { getArticles } from "@/lib/supabase";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80";

export const metadata = {
  title: "SYNAPSE · 触点 — 设计 & AI 前沿资讯",
  description:
    "精选全球前沿设计趋势与AI资讯，为设计师、创作者和科技从业者打造的灵感平台。",
};

export default async function Home() {
  const { data: dbArticles } = await getArticles({ limit: 8 });

  const articles =
    dbArticles?.map((article) => ({
      href: `/${article.category}/${article.slug}`,
      title: article.title,
      titleEn: article.title_en || article.title,
      description: article.description,
      descriptionEn: article.description_en || article.description,
      category: article.category,
      image: article.image_url || DEFAULT_IMAGE,
      date: article.published_at
        ? new Date(article.published_at).toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        : "",
    })) || [];

  return <HomePageClient articles={articles} />;
}
