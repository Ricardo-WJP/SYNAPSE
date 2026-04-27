export const content = {
  zh: {
    nav: {
      home: "首页",
      design: "设计资讯",
      ai: "AI 动态",
      subscribe: "订阅",
    },
    hero: {
      title: "连接设计与智能的每一个瞬间",
      subtitle: "精选全球前沿设计趋势与AI资讯，为设计师、创作者和科技从业者打造的灵感平台。",
      browseDesign: "浏览设计",
      aiNews: "AI 资讯",
    },
    featured: {
      latestArticles: "最新文章",
      exploreLatest: "探索设计与 AI 领域的最新动态",
    },
    newsletter: {
      title: "保持连接",
      subtitle: "每周精选设计与 AI 领域的重要动态",
      placeholder: "输入你的邮箱",
      button: "订阅",
    },
    footer: {
      tagline: "连接设计与智能的每一个瞬间。精选全球前沿设计趋势与AI资讯，为设计师、创作者和科技从业者打造。",
      explore: "探索",
      categories: "分类",
      about: "关于",
      home: "首页",
      designNews: "设计资讯",
      aiNews: "AI 动态",
      uiDesign: "界面设计",
      designSystems: "设计系统",
      llm: "大语言模型",
      multimodalAi: "多模态 AI",
      aboutUs: "关于我们",
      contact: "联系方式",
      privacy: "隐私政策",
      copyright: "保留所有权利。",
    },
    designPage: {
      badge: "设计",
      title: "设计资讯",
      subtitle: "全球设计趋势、工具更新与最佳实践",
    },
    aiPage: {
      badge: "人工智能",
      title: "AI 资讯",
      subtitle: "追踪人工智能领域的最新突破、产品发布和行业动态",
      subscribeTitle: "订阅人工智能资讯",
      subscribeDesc: "第一时间获取最新人工智能技术进展和行业分析",
    },
    article: {
      backToHome: "返回首页",
      backToDesign: "返回设计资讯",
      backToAI: "返回人工智能资讯",
      readOriginal: "阅读原文",
      source: "来源",
      author: "作者",
    },
    categoryLabels: {
      design: "设计",
      ai: "人工智能",
    },
  },
  en: {
    nav: {
      home: "Home",
      design: "Design",
      ai: "AI",
      subscribe: "Subscribe",
    },
    hero: {
      title: "Connecting Every Moment of Design & Intelligence",
      subtitle:
        "Curated global design trends and cutting-edge AI insights — an inspiration platform for designers, creators, and tech professionals.",
      browseDesign: "Browse Design",
      aiNews: "AI News",
    },
    featured: {
      latestArticles: "Latest Articles",
      exploreLatest: "Explore the latest in design and AI",
    },
    newsletter: {
      title: "Stay Connected",
      subtitle: "Weekly highlights from the world of design and AI",
      placeholder: "your@email.com",
      button: "Subscribe",
    },
    footer: {
      tagline:
        "Connecting every moment of design and intelligence. Curated global design trends and frontier AI news, built for designers, creators, and tech professionals.",
      explore: "Explore",
      categories: "Categories",
      about: "About",
      home: "Home",
      designNews: "Design News",
      aiNews: "AI News",
      uiDesign: "UI Design",
      designSystems: "Design Systems",
      llm: "Large Language Models",
      multimodalAi: "Multimodal AI",
      aboutUs: "About Us",
      contact: "Contact",
      privacy: "Privacy Policy",
      copyright: "All rights reserved.",
    },
    designPage: {
      badge: "Design",
      title: "Design News",
      subtitle: "Global design trends, tool updates, and best practices",
    },
    aiPage: {
      badge: "AI",
      title: "AI News",
      subtitle: "Track the latest breakthroughs, product launches, and industry trends in AI",
      subscribeTitle: "Subscribe to AI News",
      subscribeDesc: "Get the latest AI advancements and industry analysis first",
    },
    article: {
      backToHome: "Back to Home",
      backToDesign: "Back to Design",
      backToAI: "Back to AI",
      readOriginal: "Read Original",
      source: "Source",
      author: "Author",
    },
    categoryLabels: {
      design: "Design",
      ai: "AI",
    },
  },
};

export type Language = keyof typeof content;
export type Content = typeof content.zh;
