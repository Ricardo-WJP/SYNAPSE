---
name: DesignAI Knowledge
colors:
  ink: "#0a0a0a"
  ink-secondary: "#444444"
  ink-muted: "#888888"
  paper: "#ffffff"
  paper-warm: "#fafafa"
  rule: "#e0e0e0"
  rule-heavy: "#0a0a0a"
  accent: "#d73a3a"
  accent-ai: "#6b4c9a"
typography:
  h1:
    fontFamily: system-ui, sans-serif
    fontSize: clamp(2.75rem, 7vw, 5.5rem)
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.03em
  h2:
    fontFamily: system-ui, sans-serif
    fontSize: clamp(1.5rem, 3vw, 2.25rem)
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
  body:
    fontFamily: system-ui, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: system-ui, sans-serif
    fontSize: 11px
    fontWeight: 500
    letterSpacing: 0.1em
    textTransform: uppercase
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  section: 96px
---

## 1. Visual Theme

**编辑级极简 UI** — 参考高端数字杂志（It's Nice That、Dezeen、AIGA Eye on Design）。

设计理念：**纪律性排版 + 锐利边缘 + 黑白主导**

- 纯黑白为主，颜色仅用于分类编码
- 零圆角，工业级锐利边缘
- 大量留白，有节奏感的区块间距
- 不对称的杂志式布局
- 微型大写字母标签系统

## 2. Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| ink | #0a0a0a | 标题、主按钮、黑底区域 |
| ink-secondary | #444444 | 次要文字 |
| ink-muted | #888888 | 弱化文字、标签、hover前状态 |
| paper | #ffffff | 主背景 |
| paper-warm | #fafafa | 极少用的暖白背景 |
| rule | #e0e0e0 | 细边框、分隔线 |
| rule-heavy | #0a0a0a | 粗分隔线（Hero下方） |
| accent | #d73a3a | 设计分类标识 |
| accent-ai | #6b4c9a | AI分类标识 |

## 3. Typography

- **主字体栈**: system-ui, "Noto Sans SC", "PingFang SC", sans-serif
- **字号层级**:
  - Display: clamp(2.75rem, 7vw, 5.5rem), weight 500
  - H2: clamp(1.5rem, 3vw, 2.25rem), weight 500
  - H3: clamp(1.125rem, 2vw, 1.5rem), weight 500
  - Body: 15px, weight 400
  - Label: 11px, weight 500, letter-spacing 0.1em, uppercase

## 4. Layout

- 最大宽度: 1320px
- 页面边距: clamp(20px, 5vw, 64px)
- 区块间距: 96px (桌面), 64px (平板), 48px (移动)
- 网格: 不对称杂志布局（如 1.6fr + 1fr）

## 5. Components

### Navbar
- 高度 64px
- 极简文字 Logo: "DesignAI" (Design 黑色, AI 灰色)
- 导航: 大写字母, 11px, 灰色, hover 变黑+下划线
- 右侧年份标识
- 无搜索框（保持极简）

### Card
- 无卡片边框/背景，纯内容流
- 图片 4:3 或 16:9
- 微型分类标签（红色/紫色）+ 日期
- 标题: 17-22px
- 描述: 14px, 2-3行截断
- "阅读 →" 微型链接

### Button
- 零圆角
- Primary: 黑底白字
- Secondary: 白底黑框
- Ghost: 透明底灰框
- 12px 大写字母标签

### Newsletter
- 黑底区域
- 白字标题
- 输入框+按钮无间隙拼接

## 6. Key Pages

### /
1. Hero: 超大标题 + 副标题 + 双按钮，下方粗黑线分隔
2. Editor's Pick: 左侧大图 + 右侧紧凑列表（竖线分隔）
3. Latest: 三列网格
4. Newsletter: 黑底居中订阅

### /design, /ai
1. Hero: 分类标签 + 标题 + 描述 + 粗黑线
2. Articles: 三列网格
3. Newsletter: 黑底

## 7. Interaction

- Hover: 颜色过渡 0.15s
- 图片 hover: scale(1.04), 0.5s cubic-bezier(0.16, 1, 0.3, 1)
- 链接 hover: 灰色 → 黑色
- 无阴影，无渐变，无圆角
