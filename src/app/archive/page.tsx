import Link from "next/link";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { POSTS } from "@/data/posts";

export const metadata: Metadata = {
  title: "归档",
  description: "全部文章按年份归档，回溯每一段折腾的痕迹。",
};

export default function ArchivePage() {
  const years = [...new Set(POSTS.map((p) => p.date.slice(0, 4)))].sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <main className="relative min-h-screen">
      <SkyBackdrop watermark="ARCHIVE" showSeagull={false} variant="page" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-28">
        <header className="mb-12 text-center">
          <p className="section-title-en text-5xl">ARCHIVE</p>
          <h1 className="section-title-zh mt-2 text-3xl">归档</h1>
          <p className="mt-4 text-sm text-ink/50">
            共 {POSTS.length} 篇 · 覆盖 {years.length} 个年份
          </p>
        </header>

        <div className="space-y-8">
          {years.map((year) => {
            const posts = POSTS.filter((p) => p.date.startsWith(year));
            return (
              <section key={year} className="card p-6 md:p-8">
                <h2 className="section-title-en flex items-baseline gap-3 text-4xl">
                  {year}
                  <span className="text-xs font-normal text-ink/45">
                    {posts.length} 篇
                  </span>
                </h2>
                <div className="mt-4 divide-y divide-divider/60">
                  {posts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/posts/${p.slug}`}
                      className="group flex items-baseline gap-5 py-4"
                    >
                      <time
                        dateTime={p.date}
                        className="shrink-0 text-sm tabular-nums text-ink/45"
                      >
                        {p.date.slice(5).replaceAll("-", "/")}
                      </time>
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-[15px] font-semibold text-ink group-hover:text-navy-accent">
                          {p.title}
                        </h3>
                        <p className="mt-1 truncate text-xs text-ink/50">
                          {p.excerpt}
                        </p>
                      </div>
                      <span className="hidden shrink-0 rounded-full bg-navy-accent/10 px-2.5 py-0.5 text-xs font-medium text-navy-accent sm:inline">
                        {p.tag}
                      </span>
                      <span className="hidden shrink-0 text-xs text-ink/40 md:inline">
                        {p.readingMinutes} 分钟
                      </span>
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
