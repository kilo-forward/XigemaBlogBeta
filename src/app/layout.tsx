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

/** WebSite 结构化数据（SEO） */
const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${siteConfig.name} · ${siteConfig.zhName}`,
  url: siteUrl("/"),
  description: siteConfig.description,
  inLanguage: "zh-CN",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        {/* 键盘用户跳过导航直达内容 */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#2f4d8a] focus:shadow-card"
        >
          跳到主要内容
        </a>
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
