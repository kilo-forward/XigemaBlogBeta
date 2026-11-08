import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  calcReadingMinutes,
  calcWordCount,
  deriveExcerpt,
  extractHeadings,
  type Post,
} from "./post-types";

/**
 * 文章加载器（仅服务端/构建时使用）：
 * 扫描 content/posts/*.md，frontmatter 提供 title/date/tag/excerpt/featured，
 * 正文即 Markdown。构建时一次性读盘，静态导出后不再依赖文件系统。
 */

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function coerceDate(d: unknown, file: string): string {
  // YAML 里不带引号的日期会被 gray-matter 解析成 Date 对象，统一转回 YYYY-MM-DD
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}/.test(d)) return d.slice(0, 10);
  throw new Error(`[posts] ${file} 的 frontmatter 缺少合法的 date（YYYY-MM-DD）`);
}

function loadPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  if (!data.title) throw new Error(`[posts] ${file} 的 frontmatter 缺少 title`);
  if (!data.tag) throw new Error(`[posts] ${file} 的 frontmatter 缺少 tag`);

  return {
    slug,
    title: String(data.title),
    date: coerceDate(data.date, file),
    tag: String(data.tag),
    excerpt: data.excerpt ? String(data.excerpt) : deriveExcerpt(content),
    featured: data.featured === true,
    readingMinutes: calcReadingMinutes(content),
    wordCount: calcWordCount(content),
    headings: extractHeadings(content),
    contentMd: content.trim(),
  };
}

function loadAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(loadPost)
    .sort((a, b) =>
      a.date === b.date
        ? a.slug.localeCompare(b.slug)
        : b.date.localeCompare(a.date)
    );
}

/** 全部文章，按日期倒序（同日按 slug 字母序）。列表、归档、上一篇/下一篇都用这个顺序 */
export const POSTS: Post[] = loadAllPosts();

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export {
  allTags,
  featuredPosts,
  postsByTag,
  toMeta,
} from "./post-types";
export type { Post, PostMeta, PostHeading } from "./post-types";
