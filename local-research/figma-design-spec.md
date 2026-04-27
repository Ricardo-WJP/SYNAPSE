# SYNAPSE · 触点 — Figma 设计规范

## 1. 色彩系统

### 主背景色
| 名称 | 色值 | 用途 |
|------|------|------|
| Background Primary | `#0C0C10` | 主背景 |
| Background Secondary | `#121218` | 卡片/区块背景 |
| Background Tertiary | `#18181F` | 悬停状态 |
| Background Elevated | `#1E1E26` | 浮层/Modal |
| Background Card | `rgba(255,255,255,0.03)` | 毛玻璃卡片 |

### 强调色
| 名称 | 色值 | 用途 |
|------|------|------|
| Accent (Sand Gold) | `#C9B99A` | 主按钮、强调元素 |
| Accent Hover | `#D8CBAF` | 按钮悬停 |
| Accent Soft | `rgba(201,185,154,0.15)` | 标签背景 |
| Accent AI | `#B4BED2` | AI 分类标签 |
| Accent AI Soft | `rgba(180,190,210,0.15)` | AI 标签背景 |

### 文字色
| 名称 | 色值 | 用途 |
|------|------|------|
| Text Primary | `#F0EDE8` | 主要文字 |
| Text Secondary | `rgba(240,237,232,0.7)` | 次要文字 |
| Text Tertiary | `rgba(240,237,232,0.45)` | 辅助说明 |
| Text Muted | `rgba(240,237,232,0.25)` | 禁用/占位符 |

### 边框色
| 名称 | 色值 | 用途 |
|------|------|------|
| Border Default | `rgba(255,255,255,0.06)` | 默认边框 |
| Border Hover | `rgba(255,255,255,0.12)` | 悬停边框 |

---

## 2. 字体系统

### 字体族
| 名称 | 用途 | 备选 |
|------|------|------|
| **Playfair Display** | 标题/Serif | Noto Serif SC, Source Han Serif, Georgia |
| **Inter** | 正文/Sans | Noto Sans SC, PingFang SC, Microsoft YaHei |
| **JetBrains Mono** | 代码/Mono | SF Mono, Fira Code |

### Google Fonts 链接
```
Inter:wght@300;400;500;600;700
Playfair Display:ital,wght@0,400;0,500;0,600;0,700;0,900;1,400;1,500;1,700
Noto Sans SC:wght@300;400;500;700
Noto Serif SC:wght@400;600;700;900
```

### 字号
| 元素 | 字号 | 字重 | 行高 | 字间距 |
|------|------|------|------|--------|
| H1 (大标题) | `clamp(2.75rem, 7vw, 5rem)` | 700 | 1.05 | -0.02em |
| H2 (区块标题) | `clamp(1.75rem, 3.5vw, 2.75rem)` | 600 | 1.1 | -0.03em |
| H3 (小标题) | `clamp(1.2rem, 2.2vw, 1.5rem)` | 600 | 1.25 | -0.015em |
| Body | 16px | 400 | 1.6-1.7 | 0.005em |
| Small | 14px | 400-600 | 1.4-1.6 | 0.01em |
| Caption | 11px | 600 | - | 0.12em |
| Label | 10px | 500-600 | - | 0.15-0.25em |

### Hero 特殊排版
```css
/* 大号 Editorial 标题 */
font-family: var(--font-serif);
font-size: clamp(3rem, 8vw, 6rem);
font-weight: 700;
line-height: 0.95;
letter-spacing: -0.03em;
text-transform: uppercase;
```

---

## 3. 间距系统

基于 4px 网格：

| Token | 值 | 用途 |
|-------|-----|------|
| space-1 | 4px | 极小间距 |
| space-2 | 8px | 小间距 |
| space-3 | 12px | 组件内间距 |
| space-4 | 16px | 标准间距 |
| space-5 | 24px | 中等间距 |
| space-6 | 32px | 区块内间距 |
| space-7 | 48px | Section 间距 |
| space-8 | 64px | 大区块 |
| space-9 | 80px | Section 上下 padding |
| space-10 | 96px | 特殊大区块 |
| space-11 | 120px | Hero padding |
| space-12 | 160px | 极端间距 |

---

## 4. 布局系统

### 容器宽度
| 名称 | max-width | padding |
|------|-----------|---------|
| Container | 1200px | `clamp(24px, 5vw, 48px)` |
| Container Wide | 1400px | `clamp(24px, 5vw, 48px)` |

### Section 间距
```css
.section { padding: var(--space-9) 0; }     /* 80px */
.section-large { padding: var(--space-10) 0; } /* 96px */
.section-hero { padding: var(--space-11) 0 var(--space-9); } /* 120px 0 80px */
```

### 栅格
- Featured 区域：`1.5fr : 1fr` (主卡片 : 侧边卡片)
- Latest 网格：`repeat(auto-fill, minmax(320px, 1fr))`
- 卡片间距：24px

---

## 5. 组件规范

### 5.1 卡片 (Card)

```css
.card {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(12px);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.06);
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(201,185,154,0.08);
  border-color: rgba(201,185,154,0.15);
}
```

**Featured 卡片**：
- 尺寸：宽度自适应，高度约 400-480px
- 图片比例：16:9 或 4:3
- 标题字号：clamp(1.5rem, 2.5vw, 2rem)

**SideCard 卡片**：
- 布局：水平排列，图片在左
- 图片尺寸：120×80px 左右
- 间距：卡片内 16px

### 5.2 按钮

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;      /* 高度 14+14+字高 ≈ 48px */
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Primary */
.btn-primary {
  background: #C9B99A;
  color: #0C0C10;
}
.btn-primary:hover {
  background: #D8CBAF;
  box-shadow: 0 4px 20px rgba(201,185,154,0.25);
}

/* Outline */
.btn-outline {
  background: transparent;
  color: #F0EDE8;
  border: 1px solid rgba(240,237,232,0.25);
}
.btn-outline:hover {
  border-color: rgba(201,185,154,0.6);
  color: #C9B99A;
}
```

### 5.3 标签 (Tag)

```css
.tag {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
}

.tag-design {
  background: rgba(201,185,154,0.15);
  color: #C9B99A;
}

.tag-ai {
  background: rgba(180,190,210,0.15);
  color: #B4BED2;
}
```

### 5.4 导航栏 (Navbar)

- 高度：72px
- 背景：`rgba(12,12,16,0.8)` + backdrop-blur
- Logo：左侧
- 导航链接：居中或右侧
- 语言切换：右侧

### 5.5 Footer

- 背景：`#0C0C10`
- 上边框：`1px solid rgba(255,255,255,0.06)`
- 内边距：80px 0
- 链接分组排版

---

## 6. 动效系统

### 时间函数
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 动画时长
| 类型 | 时长 |
|------|------|
| 快速 | 150ms |
| 常规 | 250-300ms |
| 慢速 | 350-500ms |
| 特殊 | 700ms-1s |

### 关键动画

**FadeInUp**（内容出现）：
```css
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
animation: fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
```

**Hero Reveal**（Hero 区域）：
```css
@keyframes heroReveal {
  from { transform: translateY(48px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
animation: heroReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
```

**交错延迟**：0.1s / 0.15s / 0.2s / 0.3s / 0.45s / 0.6s

**卡片悬停**：
```css
.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(201,185,154,0.08);
}

.card:hover .card-image img {
  transform: scale(1.03);
}
```

**图片缩放**：
```css
transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
will-change: transform;
```

---

## 7. 特殊效果

### 背景渐变遮罩（Hero）
```css
background: radial-gradient(
  ellipse 70% 60% at 50% 50%,
  rgba(12,12,16,0.4) 0%,
  rgba(12,12,16,0.85) 100%
),
linear-gradient(
  to bottom,
  rgba(12,12,16,0.7) 0%,
  rgba(12,12,16,0.3) 50%,
  rgba(12,12,16,0.8) 100%
);
```

### 暖色光晕
```css
background: radial-gradient(
  ellipse 50% 80% at 70% 30%,
  rgba(201,185,154,0.08) 0%,
  transparent 60%
);
```

### 滚动条
```css
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb {
  background: rgba(201,185,154,0.2);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(201,185,154,0.35);
}
```

### 选中颜色
```css
::selection {
  background: rgba(201,185,154,0.3);
  color: #F0EDE8;
}
```

### 焦点样式
```css
:focus-visible {
  outline: 2px solid #C9B99A;
  outline-offset: 2px;
}
```

---

## 8. Figma 创建步骤

### 第一步：设置画板
1. 创建新 Figma 文件，命名「SYNAPSE Design System」
2. 设置画板尺寸：
   - Desktop: 1440×900 (或 1920×1080)
   - Tablet: 768×1024
   - Mobile: 375×812

### 第二步：创建颜色样式
在 Figma 右侧「Style」面板中创建颜色：
- `bg/primary` → `#0C0C10`
- `bg/secondary` → `#121218`
- `bg/card` → `#1E1E26`
- `accent/gold` → `#C9B99A`
- `accent/gold-hover` → `#D8CBAF`
- `accent/ai` → `#B4BED2`
- `text/primary` → `#F0EDE8`
- `text/secondary` → `rgba(240,237,232,0.7)`
- `border/default` → `rgba(255,255,255,0.06)`

### 第三步：创建字体样式
- `Display/Playfair`: Playfair Display, 700, 大号
- `Heading/H1`: Inter, 600, clamp(2.75rem, 7vw, 5rem)
- `Heading/H2`: Inter, 600, clamp(1.75rem, 3.5vw, 2.75rem)
- `Body`: Inter, 400, 16px
- `Caption`: Inter, 600, 11px

### 第四步：创建组件
1. **Button Primary** — 使用颜色样式和 Auto Layout
2. **Button Outline** — 同上
3. **Card** — 毛玻璃效果用 Figma 的「Effect」模拟
4. **Tag Design** — 小标签
5. **Tag AI** — 小标签变体

### 第五步：重建页面
按 section 重建：
1. **Hero Section** — 全屏，背景图片+渐变遮罩
2. **Editor's Pick** — 1大+2小 栅格布局
3. **Latest Grid** — 自适应卡片网格
4. **Newsletter** — 居中表单

### 第六步：添加交互
使用 Figma 原型功能添加：
- 卡片悬停状态（scale + shadow）
- 按钮悬停状态
- 页面过渡动效

---

## 9. 参考资源

### 图片资源
- Hero 背景：`public/hero-bg.jpg`
- 文章封面图：Unsplash URLs（已在 page.tsx 中）

### 设计文件位置
- 源代码：`design-ai-knowledge/src/`
- CSS 规范：`src/app/globals.css`
- 页面组件：`src/app/page.tsx`
- 布局组件：`src/components/`

### 在线预览
- 开发服务器：http://localhost:3000
- 设计稿：运行 `npm run dev` 后访问

---

*最后更新：2026-04-26*
