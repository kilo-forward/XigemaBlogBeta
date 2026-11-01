/**
 * 文章类型与纯工具函数（客户端/服务端共用，禁止引入 fs 等服务端模块）。
 * 数据本身由 src/data/posts.ts 在构建时从 content/posts/*.md 加载。
 */

export interface PostHeading {
  /** 锚点 id（与正文 h2 的 id 一致） */
  id: string;
  text: string;
}

export interface Post {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  tag: string;
  excerpt: string;
  /** 上首页精选屏 */
  featured: boolean;
  readingMinutes: number;
  /** 正文 h2 提取出的目录 */
  headings: PostHeading[];
  /** Markdown 正文（frontmatter 之后的部分） */
  contentMd: string;
}

/** 列表场景用的瘦身版（不含正文），传给客户端组件不会带上整篇内容 */
export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readingMinutes: number;
}

export function toMeta(p: Post): PostMeta {
  return {
    slug: p.slug,
    title: p.title,
    date: p.date,
    tag: p.tag,
    excerpt: p.excerpt,
    readingMinutes: p.readingMinutes,
  };
}

export function featuredPosts(posts: Post[]): Post[] {
  return posts.filter((p) => p.featured);
}

/** 全部标签 + 出现次数（次数降序）。结构化参数，Post / PostMeta 均可用 */
export function allTags(posts: { tag: string }[]): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of posts) map.set(p.tag, (map.get(p.tag) ?? 0) + 1);
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "zh"));
}

export function postsByTag<T extends { tag: string }>(posts: T[], tag: string): T[] {
  return posts.filter((p) => p.tag === tag);
}

/**
 * 标题锚点 id：小写 + 空格转连字符 + 去掉安全字符以外的符号。
 * 保留中文（\u4e00-\u9fa5），与 MarkdownContent 里 h2 组件用同一函数，保证目录跳转对得上。
 */
export function headingId(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "");
}

/** 从 Markdown 原文提取 h2 目录（跳过代码围栏内的 # 行） */
export function extractHeadings(md: string): PostHeading[] {
  const headings: PostHeading[] = [];
  let inFence = false;
  for (const line of md.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m && !/^###/.test(line)) {
      const text = m[1].replace(/[*`_]/g, "");
      headings.push({ id: headingId(text), text });
    }
  }
  return headings;
}

/** 预计阅读时长：中文按字、英文按词，约 400/分钟 */
export function calcReadingMinutes(md: string): number {
  const plain = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/[#>*`~\-|[\]()!]/g, " ");
  const cjk = (plain.match(/[\u4e00-\u9fa5]/g) ?? []).length;
  const words = (plain.match(/[a-zA-Z]+/g) ?? []).length;
  return Math.max(1, Math.round((cjk + words) / 400));
}

/** frontmatter 没写 excerpt 时，取第一个段落自动生成摘要 */
export function deriveExcerpt(md: string): string {
  let inFence = false;
  for (const line of md.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence || !line.trim()) continue;
    if (/^#{1,6}\s/.test(line) || /^[-*+]\s/.test(line) || /^>/.test(line)) continue;
    const text = line
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*`_]/g, "")
      .trim();
    if (text) return text.length > 90 ? `${text.slice(0, 90)}…` : text;
  }
  return "";
}
