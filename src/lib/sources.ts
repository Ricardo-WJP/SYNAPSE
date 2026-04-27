import type { RSSSource, Category } from "./types";

export const rssSources: RSSSource[] = [
  // Design Sources - Chinese
  {
    id: "uisdc",
    name: "优设",
    nameEn: "UISDC",
    url: "https://www.uisdc.com/feed",
    category: "design",
    language: "zh",
    enabled: true,
    priority: 1,
  },
  {
    id: "zcool",
    name: "站酷",
    nameEn: "ZCOOL",
    url: "https://www.zcool.com.cn/rss/channel/4",
    category: "design",
    language: "zh",
    enabled: true,
    priority: 2,
  },
  {
    id: "uisdc-design",
    name: "优设设计网",
    nameEn: "UISDC Design",
    url: "https://hao.uisdc.com/feed/",
    category: "design",
    language: "zh",
    enabled: true,
    priority: 3,
  },

  // Design Sources - English
  {
    id: "awwwards",
    name: "Awwwards",
    nameEn: "Awwwards",
    url: "https://www.awwwards.com/blog/feed/",
    category: "design",
    language: "en",
    enabled: true,
    priority: 4,
  },
  {
    id: "dribbble",
    name: "Dribbble",
    nameEn: "Dribbble",
    url: "https://dribbble.com/shots/popular/feed.rss",
    category: "design",
    language: "en",
    enabled: true,
    priority: 5,
  },
  {
    id: "smashingmagazine",
    name: "Smashing Magazine",
    nameEn: "Smashing Magazine",
    url: "https://www.smashingmagazine.com/feed/",
    category: "design",
    language: "en",
    enabled: true,
    priority: 6,
  },
  {
    id: "creative-boom",
    name: "Creative Boom",
    nameEn: "Creative Boom",
    url: "https://creativeboom.com/feed/",
    category: "design",
    language: "en",
    enabled: true,
    priority: 7,
  },
  {
    id: "designweek",
    name: "Design Week",
    nameEn: "Design Week",
    url: "https://www.designweek.co.uk/feed/",
    category: "design",
    language: "en",
    enabled: true,
    priority: 8,
  },

  // AI Sources - Chinese
  {
    id: "huxiu-ai",
    name: "虎嗅AI",
    nameEn: "Huxiu AI",
    url: "https://www.huxiu.com/channel/103.html/rss.xml",
    category: "ai",
    language: "zh",
    enabled: true,
    priority: 9,
  },
  {
    id: "jiqizhixin",
    name: "机器之心",
    nameEn: "JiQi Zhi Xin",
    url: "https://jiqizhixin.com/rss",
    category: "ai",
    language: "zh",
    enabled: true,
    priority: 10,
  },
  {
    id: "zhihuai",
    name: "知乎AI",
    nameEn: "Zhihu AI",
    url: "https://www.zhihu.com/rss",
    category: "ai",
    language: "zh",
    enabled: true,
    priority: 11,
  },

  // AI Sources - English
  {
    id: "mit-tech-review",
    name: "MIT Tech Review",
    nameEn: "MIT Tech Review",
    url: "https://www.technologyreview.com/feed/",
    category: "ai",
    language: "en",
    enabled: true,
    priority: 12,
  },
  {
    id: "venturebeat-ai",
    name: "VentureBeat AI",
    nameEn: "VentureBeat AI",
    url: "https://venturebeat.com/category/ai/feed/",
    category: "ai",
    language: "en",
    enabled: true,
    priority: 13,
  },
  {
    id: "openai-blog",
    name: "OpenAI Blog",
    nameEn: "OpenAI Blog",
    url: "https://openai.com/blog/rss.xml",
    category: "ai",
    language: "en",
    enabled: true,
    priority: 14,
  },
  {
    id: "deepmind-blog",
    name: "Google DeepMind",
    nameEn: "Google DeepMind",
    url: "https://deepmind.com/blog/feed/broad/",
    category: "ai",
    language: "en",
    enabled: true,
    priority: 15,
  },
  {
    id: "anthropic-news",
    name: "Anthropic News",
    nameEn: "Anthropic News",
    url: "https://www.anthropic.com/news/rss",
    category: "ai",
    language: "en",
    enabled: true,
    priority: 16,
  },
];

export function getEnabledSources(category?: Category): RSSSource[] {
  return rssSources
    .filter((source) => {
      if (!source.enabled) return false;
      if (category && source.category !== category) return false;
      return true;
    })
    .sort((a, b) => a.priority - b.priority);
}
