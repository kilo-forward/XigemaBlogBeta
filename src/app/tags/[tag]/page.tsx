import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { POSTS } from "@/data/posts";
import { allTags, postsByTag } from "@/data/post-types";

export function generateStaticParams() {
  return allTags(POSTS).map(({ tag }) => ({ tag }));
}

export function generateMetadata({
  params,
}: {
  params: { tag: string };
}): Metadata {
  const tag = decodeTag(params.tag);
  const posts = postsByTag(POSTS, tag);
  return {
    title: tag ? `标签：${tag}` : "标签",
    description: tag
      ? `标签「${tag}」下的 ${posts.length} 篇文章。`
      : undefined,
  };
}

/** Next 传入的动态段一般是解码过的，再兜一次底防止双重编码的链接 */
function decodeTag(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeTag(params.tag);
  const posts = postsByTag(POSTS, tag);
  if (posts.length === 0) notFound();

  return (
    <main id="main" className="relative min-h-screen">
      <SkyBackdrop watermark={tag.toUpperCase()} showSeagull={false} variant="page" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-28">
        <header className="mb-12 text-center">
          <p className="section-title-en text-5xl">TAG</p>
          <h1 className="section-title-zh mt-2 text-3xl">{tag}</h1>
          <p className="mt-4 text-sm text-ink/50">共 {posts.length} 篇</p>
        </header>

        <div className="card divide-y divide-divider/60 p-4 md:p-8">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/posts/${p.slug}`}
              className="group flex items-baseline justify-between gap-6 py-5"
            >
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold text-ink group-hover:text-navy-accent md:text-lg">
                  {p.title}
                </h2>
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

        {/* 其他标签跳转 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {allTags(POSTS)
            .filter((t) => t.tag !== tag)
            .map(({ tag: t }) => (
              <Link
                key={t}
                href={`/tags/${encodeURIComponent(t)}`}
                className="card px-3.5 py-1.5 text-xs font-medium text-ink/70 transition hover:-translate-y-0.5 hover:text-navy-accent"
              >
                {t}
              </Link>
            ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink/45">
          <Link href="/tags" className="text-navy-accent hover:underline">
            ← 返回标签云
          </Link>
        </p>

        <Footer />
      </div>
      <BackToTop />
    </main>
  );
}
