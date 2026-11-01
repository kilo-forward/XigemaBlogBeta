import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import MarkdownContent from "@/components/MarkdownContent";
import ReadingProgress from "@/components/ReadingProgress";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import { POSTS, getPost } from "@/data/posts";

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

  return (
    <main className="relative min-h-screen">
      <SkyBackdrop watermark={post.tag.toUpperCase()} showSeagull={false} variant="page" />
      <ReadingProgress />
      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-10 pt-28">
        <header className="mb-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-ink/50">
            <Link
              href={`/tags/${encodeURIComponent(post.tag)}`}
              className="whitespace-nowrap rounded-full bg-navy-accent/10 px-3 py-1 font-medium text-navy-accent transition hover:bg-navy-accent/20"
            >
              {post.tag}
            </Link>
            <time dateTime={post.date}>{post.date.replaceAll("-", "/")}</time>
            <span aria-hidden>·</span>
            <span>预计阅读 {post.readingMinutes} 分钟</span>
          </div>
          <h1 className="section-title-zh mt-5 text-3xl md:text-4xl">
            {post.title}
          </h1>
        </header>

        <div className="card p-8 md:p-12">
          {/* 目录（两个以上小节时展示） */}
          {post.headings.length >= 2 && (
            <nav aria-label="文章目录" className="dashed-divider mb-8 rounded-xl bg-navy-accent/5 p-5">
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

        <nav className="mt-10 flex items-center justify-between gap-4 text-sm">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="card px-4 py-3 text-navy-title transition hover:-translate-y-0.5"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="card max-w-[45%] truncate px-4 py-3 text-navy-title transition hover:-translate-y-0.5"
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <p className="mt-10 text-center text-sm text-ink/45">
          <Link href="/posts" className="text-navy-accent hover:underline">
            ← 返回文章列表
          </Link>
        </p>

        <Footer />
      </article>
      <BackToTop />
    </main>
  );
}
