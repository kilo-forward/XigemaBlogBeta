import Link from "next/link";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { POSTS } from "@/data/posts";
import { allTags } from "@/data/post-types";

export const metadata: Metadata = {
  title: "归档",
  description: "全部文章按年份归档，回溯每一段折腾的痕迹。",
};

export default function ArchivePage() {
  const years = [...new Set(POSTS.map((p) => p.date.slice(0, 4)))].sort(
    (a, b) => Number(b) - Number(a)
  );
  const tags = allTags(POSTS);
  const totalWords = POSTS.reduce((n, p) => n + p.wordCount, 0);
  const stats = [
    { label: "文章", value: String(POSTS.length) },
    { label: "标签", value: String(tags.length) },
    {
      label: "总字数",
      value: totalWords >= 10000 ? `${(totalWords / 10000).toFixed(1)} 万` : String(totalWords),
    },
    {
      label: "最近更新",
      value: POSTS[0]?.date.slice(5).replaceAll("-", "/") ?? "—",
    },
  ];

  return (
    <main id="main" className="relative min-h-screen">
      <SkyBackdrop watermark="ARCHIVE" showSeagull={false} variant="page" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-28">
        <header className="mb-10 text-center">
          <p className="section-title-en text-5xl">ARCHIVE</p>
          <h1 className="section-title-zh mt-2 text-3xl">归档</h1>
        </header>

        {/* 统计卡片 */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="card px-4 py-5 text-center">
              <p className="text-2xl font-bold tabular-nums text-navy-title">{s.value}</p>
              <p className="mt-1 text-xs text-ink/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* 时间线 */}
        <div className="space-y-8">
          {years.map((year) => {
            const posts = POSTS.filter((p) => p.date.startsWith(year));
            return (
              <section key={year} className="card p-6 md:p-8">
                <div className="flex items-baseline gap-3">
                  <h2 className="section-title-en text-4xl">{year}</h2>
                  <span className="text-xs text-ink/45">{posts.length} 篇</span>
                </div>
                <div className="relative mt-6 space-y-2 border-l-2 border-divider/70 pl-7">
                  {posts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/posts/${p.slug}`}
                      className="group relative block rounded-lg px-3 py-2.5 transition-colors hover:bg-navy-accent/5"
                    >
                      <span
                        aria-hidden
                        className="absolute -left-[37px] top-6 h-3 w-3 rounded-full border-2 border-[rgb(var(--card-bg))] bg-navy-accent/45 transition group-hover:bg-navy-accent"
                      />
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <time
                          dateTime={p.date}
                          className="shrink-0 text-sm tabular-nums text-ink/45"
                        >
                          {p.date.slice(5).replaceAll("-", "/")}
                        </time>
                        <h3 className="min-w-0 flex-1 basis-48 truncate text-[15px] font-semibold text-ink group-hover:text-navy-accent">
                          {p.title}
                        </h3>
                        <span className="hidden shrink-0 rounded-full bg-navy-accent/10 px-2.5 py-0.5 text-xs font-medium text-navy-accent sm:inline">
                          {p.tag}
                        </span>
                        <span className="hidden shrink-0 text-xs text-ink/40 md:inline">
                          {p.wordCount} 字
                        </span>
                      </div>
                      <p className="mt-1 truncate pl-0 text-xs text-ink/50 md:pl-12">
                        {p.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-ink/45">
          <Link href="/posts" className="text-navy-accent hover:underline">
            想搜索或按标签筛选？去文章列表 →
          </Link>
        </p>

        <Footer />
      </div>
      <BackToTop />
    </main>
  );
}
