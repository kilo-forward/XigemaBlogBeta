import Link from "next/link";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import Footer from "@/components/Footer";
import { POSTS } from "@/data/posts";
import { allTags, postsByTag } from "@/data/post-types";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览全部文章：前端、设计、方法论、折腾、随笔。",
};

export default function TagsPage() {
  const tags = allTags(POSTS);
  const max = Math.max(...tags.map((t) => t.count), 1);

  return (
    <main id="main" className="relative min-h-screen">
      <SkyBackdrop watermark="TAGS" showSeagull={false} variant="page" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-28">
        <header className="mb-12 text-center">
          <p className="section-title-en text-5xl">TAGS</p>
          <h1 className="section-title-zh mt-2 text-3xl">标签</h1>
          <p className="mt-4 text-sm text-ink/50">
            {tags.length} 个标签 · 点卡片看同主题的文章
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tags.map(({ tag, count }) => {
            const latest = postsByTag(POSTS, tag)[0];
            return (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="card group flex flex-col gap-2.5 p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate text-lg font-bold text-navy-title transition-colors group-hover:text-navy-accent">
                    #{tag}
                  </span>
                  <span className="shrink-0 rounded-full bg-navy-accent/10 px-2.5 py-0.5 text-xs font-medium text-navy-accent">
                    {count} 篇
                  </span>
                </div>
                {latest && (
                  <p className="truncate text-xs text-ink/50">
                    最近：{latest.title}
                  </p>
                )}
                <div
                  aria-hidden
                  className="mt-1 h-1 overflow-hidden rounded-full bg-divider/60"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-navy-accent to-sky-300"
                    style={{ width: `${Math.max(12, (count / max) * 100)}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <Footer />
      </div>
    </main>
  );
}
