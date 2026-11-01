/**
 * 站点全局配置 —— 站名、作者、链接、部署路径的唯一来源。
 *
 * 部署到 GitHub Pages（项目页 username.github.io/<repo>/）时，
 * Actions 会注入 NEXT_PUBLIC_BASE_PATH=/repo，本地开发留空即可。
 */
export const siteConfig = {
  /** 展示名（导航 / 标题 / 页脚） */
  name: "XigemaBlog",
  /** 水印 / Logo 用大写短名 */
  shortName: "XIGEMA",
  /** 中文小站名（首页副标题） */
  zhName: "碧空小站",
  description:
    "XigemaBlog —— 一个碧蓝航线官网风格皮肤的个人博客：前端笔记、方法论与生活随笔。",
  author: "Xigema",
  /** 生产环境站点根 URL（不含 basePath）。换成你的用户页地址 */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kilo-forward.github.io",
  /** 部署子路径，如 /blog-skin；用户站（username.github.io）留空 */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  github:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/kilo-forward/XigemaBlogBeta",
  email: "hi@example.com",
  /** 页脚起始年份 */
  since: 2026,
} as const;

/** 给静态资源路径拼上部署子路径（GitHub Pages 项目页必需） */
export function withBase(path: string): string {
  return `${siteConfig.basePath}${path}`;
}

/** 拼出站内页面的完整公开 URL（RSS / sitemap 用，自带尾斜杠） */
export function siteUrl(path = "/"): string {
  return `${siteConfig.url}${withBase(path)}`;
}
