import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
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
    title: post ? `${post.title} · MY BLOG` : "文章 · MY BLOG",
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
      <article className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-28">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 text-sm text-ink/50">
            <span className="rounded-full bg-navy-accent/10 px-3 py-1 font-medium text-navy-accent">
              {post.tag}
            </span>
            <time dateTime={post.date}>{post.date.replaceAll("-", "/")}</time>
          </div>
          <h1 className="section-title-zh mt-5 text-3xl md:text-4xl">
            {post.title}
          </h1>
        </header>

        <div className="card p-8 md:p-12">
          {post.content.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="mt-10 flex items-center gap-3 text-xl font-bold text-navy-title first:mt-0"
                >
                  <span className="inline-block h-5 w-1.5 rounded-full bg-navy-accent" />
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={i}
                  className="my-8 rounded-r-lg border-l-4 border-navy-accent/60 bg-navy-accent/5 px-6 py-4 text-sm leading-7 text-navy-deep"
                >
                  {block.text}
                </blockquote>
              );
            }
            return (
              <p key={i} className="mt-5 text-[15px] leading-8 text-ink/85">
                {block.text}
              </p>
            );
          })}
        </div>

        <nav className="mt-10 flex items-center justify-between text-sm">
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
              className="card px-4 py-3 text-navy-title transition hover:-translate-y-0.5"
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
      </article>
    </main>
  );
}
