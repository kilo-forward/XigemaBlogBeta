"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allTags, type PostMeta } from "@/data/post-types";

/** 文章列表：关键词搜索 + 标签筛选（客户端过滤，纯静态站可用）。数据由服务端传入 */
export default function PostList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const tags = allTags(posts);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (tag && p.tag !== tag) return false;
      if (!q) return true;
      return [p.title, p.excerpt, p.tag].some((s) =>
        s.toLowerCase().includes(q)
      );
    });
  }, [posts, query, tag]);

  return (
    <div>
      {/* 工具行：搜索框 + 标签筛选 */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <label className="relative block md:w-72">
          <span className="sr-only">搜索文章</span>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索标题 / 摘要 / 标签…"
            className="card w-full rounded-full py-2.5 pl-10 pr-4 text-sm text-ink outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-navy-accent/50"
          />
        </label>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTag("")}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                tag === ""
                  ? "bg-navy-accent text-white"
                  : "card text-ink/70 hover:text-navy-accent"
              }`}
          >
            全部
          </button>
          {tags.map(({ tag: t, count }) => (
            <button
              key={t}
              onClick={() => setTag(tag === t ? "" : t)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
                tag === t
                  ? "bg-navy-accent text-white"
                  : "card text-ink/70 hover:text-navy-accent"
              }`}
            >
              {t} <span className="opacity-60">{count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 列表 */}
      <div className="card p-4 md:p-8">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-ink/50">
            没有找到匹配「{query}」的文章，换个关键词试试？
          </p>
        ) : (
          <div className="divide-y divide-divider/60">
            {filtered.map((p) => (
              <Link
                key={p.slug}
                href={`/posts/${p.slug}`}
                className="group flex items-baseline justify-between gap-6 py-5"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="whitespace-nowrap rounded-full bg-navy-accent/10 px-2.5 py-0.5 text-xs font-medium text-navy-accent">
                      {p.tag}
                    </span>
                    <h2 className="truncate text-base font-semibold text-ink group-hover:text-navy-accent md:text-lg">
                      {p.title}
                    </h2>
                  </div>
                  <p className="mt-2 truncate text-sm text-ink/60">{p.excerpt}</p>
                </div>
                <div className="shrink-0 text-right text-sm text-ink/45">
                  <time dateTime={p.date} className="block">
                    {p.date.replaceAll("-", "/")}
                  </time>
                  <span className="text-xs">{p.readingMinutes} 分钟</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-ink/45">
        {query || tag ? `筛出 ${filtered.length} 篇 / 共 ${posts.length} 篇` : `共 ${posts.length} 篇 · 持续更新`}
      </p>
    </div>
  );
}
