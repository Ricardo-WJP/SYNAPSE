# synapse·触点

一个极具设计感的 AI + 设计资讯网站，参考 Google Design 风格。（AI初学者试手项目，还是很幼稚，打算慢慢进行完善）

## 功能特性

- 🎨 **设计资讯** - 汇聚全球设计趋势、工具更新和最佳实践
- 🤖 **AI 资讯** - 追踪 AI 领域的最新突破、产品发布和行业动态
- 🌐 **中英双语** - 自动翻译，触达全球读者
- 🔄 **自动更新** - RSS 订阅源 + AI 自动摘要/标签
- ✨ **Google Design 风格** - 极简、留白优先、内容为王

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Next.js 16, React 19, TypeScript |
| 样式 | Tailwind CSS 4 |
| 数据库 | Supabase (PostgreSQL) |
| AI | MiniMax API (翻译/摘要/标签) |
| 内容获取 | RSS 订阅 |

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local`，并填写配置：

```bash
cp .env.example .env.local
```

需要配置：
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase 项目地址
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase 公开密钥
- `MINIMAX_API_KEY` - MiniMax API 密钥

### 3. 创建数据库

在 Supabase SQL 编辑器中运行：
```bash
supabase/migrations/001_create_articles.sql
```

### 4. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 内容更新

### 手动更新

```bash
# 更新所有内容
curl -X POST http://localhost:3000/api/feed

# 仅更新设计分类
curl -X POST "http://localhost:3000/api/feed?category=design"

# 跳过 AI 处理（更快）
curl -X POST "http://localhost:3000/api/feed?skipAI=true"
```

### 定时自动更新

#### Vercel Cron

在 `vercel.json` 中配置：

```json
{
  "crons": [
    {
      "path": "/api/feed",
      "schedule": "0 8 * * *"
    }
  ]
}
```

#### 系统的 Cron Job

```bash
# 每天早上 8 点更新
0 8 * * * curl -X POST http://your-domain.com/api/feed
```

## 项目结构

```
design-ai-knowledge/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── articles/    # 文章 API
│   │   │   └── feed/        # 内容更新 API
│   │   ├── article/[slug]/  # 文章详情页
│   │   ├── design/          # 设计分类页
│   │   ├── ai/              # AI 分类页
│   │   ├── about/           # 关于页面
│   │   ├── page.tsx         # 首页
│   │   ├── layout.tsx       # 根布局
│   │   └── globals.css      # 全局样式
│   ├── components/
│   │   ├── Card.tsx         # 文章卡片
│   │   ├── Navbar.tsx       # 导航栏
│   │   └── Footer.tsx       # 页脚
│   └── lib/
│       ├── types.ts         # 类型定义
│       ├── sources.ts       # RSS 订阅源配置
│       ├── rss.ts           # RSS 抓取工具
│       ├── ai.ts            # AI 处理服务
│       └── supabase.ts      # 数据库客户端
├── supabase/
│   └── migrations/          # 数据库迁移
├── scripts/
│   └── update-feed.ts       # 更新脚本
├── DESIGN.md                # 设计规范
└── .env.example             # 环境变量示例
```

## RSS 订阅源

### 默认启用的订阅源

**设计 (中文)**
- 优设
- 站酷
- 少数派设计

**设计 (英文)**
- Design Museum
- Awwwards

**AI (中文)**
- 虎嗅 AI
- 机器之心

**AI (英文)**
- ArXiv AI
- MIT Tech Review

可以在 `src/lib/sources.ts` 中添加更多订阅源。

## 设计规范

参考 [DESIGN.md](DESIGN.md)，包括：
- 配色方案
- 字体层级
- 间距系统
- 组件样式

## 部署

### Vercel (推荐)

1. Fork 此项目
2. 在 Vercel 导入
3. 配置环境变量
4. 部署

### 其他平台

需要支持：
- Node.js 18+
- Next.js 16
- PostgreSQL 数据库

## 成本

- **Supabase**: 免费额度足够个人/小团队使用
- **MiniMax API**: $5 额度可处理数千篇文章
- **Vercel**: 免费版支持每日更新

## License

MIT
