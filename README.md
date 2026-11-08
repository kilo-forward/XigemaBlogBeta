# XigemaBlog · 碧蓝航线官网风格博客

用碧蓝航线官网的视觉语言（整屏首页 + 天空云朵 + 白卡片 + 半透明导航条）搭建的个人博客。
首页整屏切换，文章列表/详情常规滚动（内容优先，不劫持滚轮）。**纯静态导出，一键部署 GitHub Pages。**

## 功能

- 🖥 整屏首页（标题 / 精选文章 / 关于我），滚轮·触摸·键盘统一接管，hash 双向同步
- 📝 文章列表：关键词搜索 + 标签筛选（客户端过滤，纯静态可用）
- 🏷 标签卡片网格（计数条 + 最近文章预览）+ 标签筛选页（`/tags`、`/tags/<tag>`，SSG）
- 🗂 归档页：统计卡片（文章/标签/总字数/最近更新）+ 按年份时间线
- 📑 文章详情：桌面端粘性目录（滚动高亮）、字数与预计阅读时长、相关阅读、
  上一篇/下一篇卡片、阅读进度条、代码块与 GFM 表格
- 🌙 夜间模式（跟随系统 + 手动切换 + localStorage 记忆，无首帧闪烁）
- 📱 响应式：移动端汉堡菜单、窄屏适配；键盘可达（跳转链接 + 语义锚点）
- 🔍 SEO：每页独立 metadata、OpenGraph、WebSite/BlogPosting 结构化数据、`sitemap.xml`、`robots.txt`
- 📡 RSS 订阅（`/rss.xml`）、自定义 404 页、站点图标
- ⬆️ 返回顶部、页脚导航

## 本地运行

```bash
npm install
npm run dev        # http://localhost:3312
npm run build      # 静态导出到 out/（output: "export"）
npm run typecheck  # tsc --noEmit
```

## 部署到 GitHub Pages

仓库已带 `.github/workflows/deploy.yml`，推送到 `main` 即自动构建部署：

1. 把仓库推到 GitHub（项目页仓库名随意，如 `blog`）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。
3. 等待 Actions 跑完，访问 `https://<用户名>.github.io/<仓库名>/`。

工作流会自动判断项目页/用户页：

- **项目页**（`<user>.github.io/<repo>`）：自动注入 `NEXT_PUBLIC_BASE_PATH=/<repo>`。
- **用户页**（仓库名为 `<user>.github.io`）：自动留空 basePath，站点挂在根路径。

本地模拟项目页构建（Git Bash）：

```bash
MSYS_NO_PATHCONV=1 NEXT_PUBLIC_BASE_PATH=/blog-skin npm run build
npx http-server .preview -p 4173   # 把 out 拷到 .preview/blog-skin 后可按子路径预览
```

### 换成自己的地址

改 `src/config/site.ts`（站名、作者、邮箱、GitHub、RSS/sitemap 域名全在这一个文件）：

- `url`：换成 `https://<用户名>.github.io`（或自定义域名）
- `basePath`：本地构建部署时才需要，Actions 会自动注入
- 如用自定义域名：仓库加 `CNAME` 文件，并把 `url` 改成自定义域名（此时 `basePath` 留空）

## 换内容

### 写文章（Markdown + frontmatter）

在 `content/posts/` 下新建 `<slug>.md`（slug 即 URL，用英文），推上 main 自动发布：

````markdown
---
title: 文章标题
date: 2026-11-02        # YYYY-MM-DD，归档按年份自动分组
tag: 前端               # 每篇一个标签，标签云自动汇总
excerpt: 列表里显示的摘要（不写就自动取第一段）。
featured: true          # 可选，上首页精选屏
---

正文就是标准 Markdown。

## 小节标题              <!-- 两个以上 h2 自动生成目录 -->

普通段落、**加粗**、[链接](https://example.com)、行内代码 `like this`。

> 引用块

- 列表项

```ts
const code = "fenced code block";   // 围栏代码块，右上角显示语言标注
```

| 表格 | 也支持 |  （GFM 语法）
|---|---|
````

正文里的图片放 `public/images/` 下，Markdown 里写 `/images/xx.png`，会自动拼部署子路径。

- 归档（按 `date` 年份）、标签页、目录、阅读时长全部自动生成，无需任何登记
- 文章按日期倒序排列，同日按 slug 字母序
- frontmatter 缺 `title` / `tag` / 合法 `date` 时构建会直接报错并指出文件名

### 站点信息

改 `src/config/site.ts`（站名、副标题、作者、邮箱、GitHub 链接、起始年份）。

### 皮肤

- 云朵/导航条：`public/skin/` 下替换同名文件即可；海鸥是内联 SVG，在 `SkyBackdrop.tsx` 里改。
- 配色：颜色全部走 `globals.css` 的 CSS 变量（`--ink`、`--navy-*` 等），日/夜间各一份；
  天空渐变在 `.sky` / `.dark .sky`。

## 结构

```
content/posts/*.md           # ★ 文章（Markdown + frontmatter），加文件即发文
src/config/site.ts           # 站点配置 + withBase()（GitHub Pages 子路径适配）
src/data/posts.ts            # 构建时读取 content/posts/（frontmatter 解析、排序、校验）
src/data/post-types.ts       # 类型与纯工具（目录提取、阅读时长、标签汇总）
src/app/page.tsx             # 首页（服务端取数据）+ HomeFullPage 整屏 × 3
src/app/posts/page.tsx       # 文章列表（搜索 + 标签筛选）
src/app/posts/[slug]/page.tsx# 文章详情（Markdown 渲染 / 桌面端侧边目录 / 相关阅读 / JSON-LD）
src/components/MarkdownContent.tsx # Markdown → 皮肤样式映射（react-markdown + GFM）
src/components/TocSidebar.tsx      # 桌面端粘性目录（滚动高亮当前小节）
src/app/archive/page.tsx     # 按年份归档
src/app/tags/                # 标签云 + 标签筛选页（SSG）
src/app/rss.xml/route.ts     # RSS 2.0（构建时静态生成）
src/app/sitemap.ts, robots.ts # SEO
src/app/not-found.tsx        # 404（导出为 404.html，GitHub Pages 自动使用）
src/components/FullPage.tsx  # 整屏引擎（hash 双向同步，body 滚动锁按需挂载）
src/components/SkyBackdrop.tsx# 天空背景：CSS 渐变 + 羽化云朵 + 巨型水印真文字 + SVG 海鸥
src/components/SiteNav.tsx   # 固定导航 + 移动端菜单 + 主题切换
.github/workflows/deploy.yml # GitHub Pages 构建部署
public/.nojekyll             # 防 Jekyll 忽略 _next 目录
```

## 与源站复刻件的差异（有意为之）

- 文字全部为真 HTML（源站把文字烘焙在切图里）——博客需要 SEO 与可选中。
- 导航激活态用 CSS 白药丸实现（源站是图片切片）。
- 文章页不做整屏切换与 rem 等比缩放，使用常规响应式布局。
