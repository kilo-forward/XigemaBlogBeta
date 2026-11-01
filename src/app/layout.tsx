import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import { siteConfig, siteUrl } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.zhName}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["XigemaBlog", "前端", "博客", "Next.js", "碧蓝航线", "设计还原"],
  authors: [{ name: siteConfig.author, url: siteConfig.github }],
  alternates: {
    types: { "application/rss+xml": siteUrl("/rss.xml") },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.zhName}`,
    description: siteConfig.description,
    url: siteUrl("/"),
  },
};

/** 首帧前同步主题，避免夜间模式闪白（读 localStorage，其次跟随系统） */
const themeScript = `(function(){try{var t=localStorage.getItem("xgb-theme");var d=t?t==="dark":window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
