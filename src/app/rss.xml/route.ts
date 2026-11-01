import { POSTS } from "@/data/posts";
import { siteConfig, siteUrl } from "@/config/site";

/** 纯静态导出的 RSS 2.0 订阅源（构建时生成 out/rss.xml） */
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const items = POSTS.map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${siteUrl(`/posts/${p.slug}/`)}</link>
      <guid isPermaLink="true">${siteUrl(`/posts/${p.slug}/`)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <category>${esc(p.tag)}</category>
      <description>${esc(p.excerpt)}</description>
    </item>`
  ).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(`${siteConfig.name} · ${siteConfig.zhName}`)}</title>
    <link>${siteUrl("/")}</link>
    <description>${esc(siteConfig.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl("/rss.xml")}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
