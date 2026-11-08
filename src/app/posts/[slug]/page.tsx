import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import MarkdownContent from "@/components/MarkdownContent";
import ReadingProgress from "@/components/ReadingProgress";
import TocSidebar from "@/components/TocSidebar";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import { POSTS, getPost } from "@/data/posts";
import { siteConfig, siteUrl } from "@/config/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  return {
    title: post?.title ?? "文章",
    description: post?.excerpt,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const idx = POSTS.findIndex((p) => p.slug === post.slug);
  const prev = POSTS[idx - 1];
  const next = POSTS[idx + 1];
  const related = POSTS.filter(
    (p) => p.tag === post.tag && p.slug !== post.slug
  ).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: siteConfig.author, url: siteConfig.github },
    keywords: post.tag,
    wordCount: post.wordCount,
    inLanguage: "zh-CN",
    mainEntityOfPage: siteUrl(`/posts/${post.slug}/`),
  };

  return (
    <main id="main" className="relative min-h-screen">
      <SkyBackdrop watermark={post.tag.toUpperCase()} showSeagull={false} variant="page" />
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-10 pt-28">
        <div className="flex justify-center gap-10">
          <article className="w-full min-w-0 max-w-3xl">
            <header className="mb-10 text-center">
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink/50">
                <Link
                  href={`/tags/${encodeURIComponent(post.tag)}`}
                  className="whitespace-nowrap rounded-full bg-navy-accent/10 px-3 py-1 font-medium text-navy-accent transition hover:bg-navy-accent/20"
                >
                  {post.tag}
                </Link>
                <time dateTime={post.date}>{post.date.replaceAll("-", "/")}</time>
                <span aria-hidden>·</span>
                <span>{post.wordCount} 字</span>
                <span aria-hidden>·</span>
                <span>预计阅读 {post.readingMinutes} 分钟</span>
              </div>
              <h1 className="section-title-zh mt-5 text-3xl md:text-4xl">
                {post.title}
              </h1>
            </header>

            <div className="card p-8 md:p-12">
              {/* 窄屏目录（桌面端用右侧粘性目录） */}
              {post.headings.length >= 2 && (
                <nav
                  aria-label="文章目录"
                  className="dashed-divider mb-8 rounded-xl bg-navy-accent/5 p-5 xl:hidden"
                >
                  <p className="text-xs font-semibold tracking-[0.3em] text-navy-accent">
                    CONTENTS · 目录
                  </p>
                  <ol className="mt-3 space-y-2 text-sm leading-6">
                    {post.headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="text-ink/70 transition-colors hover:text-navy-accent"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              )}

              <MarkdownContent md={post.contentMd} />
            </div>

            <p className="mt-6 text-center text-xs leading-6 text-ink/45">
              由 {siteConfig.author} 发布于 {post.date.replaceAll("-", "/")} ·
              转载请注明出处
            </p>

            {/* 上一篇 / 下一篇 */}
            <nav className="mt-10 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link
                  href={`/posts/${prev.slug}`}
                  className="card group p-5 transition hover:-translate-y-0.5"
                >
                  <span className="text-xs text-ink/45">← 较新的一篇</span>
                  <p className="mt-2 truncate text-sm font-semibold text-navy-title group-hover:text-navy-accent">
                    {prev.title}
                  </p>
                  <p className="mt-1 text-xs text-ink/40">
                    {prev.date.replaceAll("-", "/")} · {prev.readingMinutes} 分钟
                  </p>
                </Link>
              ) : (
                <span aria-hidden className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={`/posts/${next.slug}`}
                  className="card group p-5 text-right transition hover:-translate-y-0.5"
                >
                  <span className="text-xs text-ink/45">较旧的一篇 →</span>
                  <p className="mt-2 truncate text-sm font-semibold text-navy-title group-hover:text-navy-accent">
                    {next.title}
                  </p>
                  <p className="mt-1 text-xs text-ink/40">
                    {next.date.replaceAll("-", "/")} · {next.readingMinutes} 分钟
                  </p>
                </Link>
              ) : (
                <span aria-hidden className="hidden sm:block" />
              )}
            </nav>

            {/* 相关阅读：同标签文章 */}
            {related.length > 0 && (
              <section className="mt-12">
                <div className="flex items-baseline justify-between">
                  <h2 className="section-title-zh text-xl">相关阅读</h2>
                  <Link
                    href={`/tags/${encodeURIComponent(post.tag)}`}
                    className="text-xs text-navy-accent hover:underline"
                  >
                    更多「{post.tag}」→
                  </Link>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {related.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/posts/${p.slug}`}
                      className="card group flex flex-col p-4 transition hover:-translate-y-0.5"
                    >
                      <span className="text-xs text-ink/40">
                        {p.date.replaceAll("-", "/")} · {p.readingMinutes} 分钟
                      </span>
                      <span className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-navy-title group-hover:text-navy-accent">
                        {p.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <p className="mt-10 text-center text-sm text-ink/45">
              <Link href="/posts" className="text-navy-accent hover:underline">
                ← 返回文章列表
              </Link>
            </p>

            <Footer />
          </article>

          {/* 桌面端粘性目录（滚动高亮当前小节） */}
          {post.headings.length >= 2 && (
            <aside className="hidden w-60 shrink-0 xl:block">
              <div className="sticky top-24">
                <TocSidebar headings={post.headings} />
              </div>
            </aside>
          )}
        </div>
      </div>
      <BackToTop />
    </main>
  );
}
