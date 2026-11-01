# MY BLOG · 碧蓝航线官网风格博客皮肤

用碧蓝航线官网的视觉语言（整屏首页 + 天空云朵 + 白卡片 + 半透明导航条）搭建的博客模板。
首页整屏切换，文章列表/详情常规滚动（内容优先，不劫持滚轮）。

## 运行

```bash
npm install
npm run dev   # http://localhost:3312
npm run build && npm start
```

## 结构

```
src/app/page.tsx              # 首页：整屏 × 3（标题 / 精选文章 / 关于）
src/app/posts/page.tsx        # 文章列表（白卡片 + 虚线分隔，源站新闻列表同款）
src/app/posts/[slug]/page.tsx # 文章详情（真文字，SSG）
src/components/FullPage.tsx   # 整屏引擎（自 blhx-replica 移植，body 滚动锁按需挂载）
src/components/SkyBackdrop.tsx# 天空背景：CSS 渐变 + 羽化云朵 + 巨型水印真文字 + 海鸥
src/components/SiteNav.tsx    # 固定导航：源站导航条底图 + 文字菜单 + CSS 白药丸激活态
src/data/posts.ts             # 文章数据（slug/标题/日期/标签/摘要/内容块）
public/skin/                  # 皮肤资产：云朵×3（羽化）、海鸥、导航条底图
```

## 换内容

- 文章：改 `src/data/posts.ts`（`featured: true` 会出现在首页精选屏）。
- 站名/水印：全局搜索 `MY BLOG`（导航、首页、水印）替换。
- 云朵/海鸥：`public/skin/` 下替换同名文件即可。
- 配色：`tailwind.config.ts` 的 `navy.*` 与 `globals.css` 的 `.sky` 渐变。

## 与源站复刻件的差异（有意为之）

- 文字全部为真 HTML（源站把文字烘焙在切图里）——博客需要 SEO 与可选中。
- 导航激活态用 CSS 白药丸实现（源站是图片切片）。
- 文章页不做整屏切换与 rem 等比缩放，使用常规响应式布局。
