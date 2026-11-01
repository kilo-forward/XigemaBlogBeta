import Link from "next/link";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import Footer from "@/components/Footer";
import { POSTS } from "@/data/posts";
import { allTags } from "@/data/post-types";

export const metadata: Metadata = {
  title: "标签",
  description: "按标签浏览全部文章：前端、设计、方法论、折腾、随笔。",
};

/** 标签数越多字号越大，凑出一点云的味道 */
function sizeClass(count: number): string {
  if (count >= 3) return "text-2xl";
  if (count === 2) return "text-xl";
  return "text-base";
}

export default function TagsPage() {
  const tags = allTags(POSTS);

  return (
    <main className="relative min-h-screen">
      <SkyBackdrop watermark="TAGS" showSeagull={false} variant="page" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-28">
        <header className="mb-12 text-center">
          <p className="section-title-en text-5xl">TAGS</p>
          <h1 className="section-title-zh mt-2 text-3xl">标签云</h1>
          <p className="mt-4 text-sm text-ink/50">
            {tags.length} 个标签 · 点进去看同主题的文章
          </p>
        </header>

        <div className="card flex flex-wrap items-center justify-center gap-4 p-10 md:p-14">
          {tags.map(({ tag, count }) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className={`group flex items-baseline gap-1.5 font-bold text-navy-title transition hover:-translate-y-0.5 hover:text-navy-accent ${sizeClass(count)}`}
            >
              {tag}
              <span className="text-xs font-medium text-ink/40 group-hover:text-navy-accent/70">
                {count}
              </span>
            </Link>
          ))}
        </div>

        <Footer />
      </div>
    </main>
  );
}
