import Link from "next/link";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import { POSTS } from "@/data/posts";

export const metadata: Metadata = {
  title: "文章 · MY BLOG",
  description: "全部文章列表：前端笔记、方法论与生活随笔。",
};

export default function PostsPage() {
  return (
    <main className="relative min-h-screen">
      <SkyBackdrop watermark="ARTICLES" variant="page" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-24 pt-28">
        <header className="mb-12 text-center">
          <p className="section-title-en text-5xl">ARTICLES</p>
          <h1 className="section-title-zh mt-2 text-3xl">全部文章</h1>
          <p className="mt-4 text-sm text-ink/50">共 {POSTS.length} 篇 · 持续更新</p>
        </header>

        <div className="card divide-y divide-divider/60 p-4 md:p-8">
          {POSTS.map((p) => (
            <Link
              key={p.slug}
              href={`/posts/${p.slug}`}
              className="group flex items-baseline justify-between gap-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-navy-accent/10 px-2.5 py-0.5 text-xs font-medium text-navy-accent">
                    {p.tag}
                  </span>
                  <h2 className="truncate text-base font-semibold text-ink group-hover:text-navy-accent md:text-lg">
                    {p.title}
                  </h2>
                </div>
                <p className="mt-2 truncate text-sm text-ink/60">{p.excerpt}</p>
              </div>
              <time
                dateTime={p.date}
                className="shrink-0 text-sm text-ink/45"
              >
                {p.date.replaceAll("-", "/")}
              </time>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink/45">
          <Link href="/" className="text-navy-accent hover:underline">
            ← 回到首页
          </Link>
        </p>
      </div>
    </main>
  );
}
