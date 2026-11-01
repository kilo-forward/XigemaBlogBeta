import type { MetadataRoute } from "next";
import { POSTS } from "@/data/posts";
import { allTags } from "@/data/post-types";
import { siteUrl } from "@/config/site";

/** 构建时生成 out/sitemap.xml（URL 均带 GitHub Pages 需要的尾斜杠） */
export default function sitemap(): MetadataRoute.Sitemap {
  const newest = POSTS[0]?.date;

  return [
    { url: siteUrl("/"), lastModified: newest ? new Date(newest) : new Date() },
    { url: siteUrl("/posts/"), lastModified: newest ? new Date(newest) : new Date() },
    { url: siteUrl("/archive/"), lastModified: newest ? new Date(newest) : new Date() },
    { url: siteUrl("/tags/"), lastModified: newest ? new Date(newest) : new Date() },
    ...POSTS.map((p) => ({
      url: siteUrl(`/posts/${p.slug}/`),
      lastModified: new Date(p.date),
    })),
    ...allTags(POSTS).map(({ tag }) => ({
      url: siteUrl(`/tags/${encodeURIComponent(tag)}/`),
      lastModified: new Date(
        postsByTagLatest(tag)
      ),
    })),
  ];
}

/** 该标签下最新一篇文章的日期，作为 sitemap 的 lastModified */
function postsByTagLatest(tag: string): string {
  const posts = POSTS.filter((p) => p.tag === tag).map((p) => p.date);
  return posts.sort().at(-1) ?? new Date().toISOString().slice(0, 10);
}
