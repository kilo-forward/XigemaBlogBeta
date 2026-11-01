"use client";

import Link from "next/link";
import { FullPage } from "@/components/FullPage";
import { useFullPage } from "@/components/FullPageContext";
import SkyBackdrop from "@/components/SkyBackdrop";
import { featuredPosts } from "@/data/posts";

function ScrollHint() {
  const { moveTo } = useFullPage();
  return (
    <button
      onClick={() => moveTo(1)}
      title="向下浏览"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/90 transition-transform hover:translate-y-1"
      aria-label="向下浏览"
    >
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 9l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export default function Home() {
  const featured = featuredPosts();

  return (
    <main>
      <FullPage>
        {/* 第 1 屏：标题 */}
        <section className="fp-section">
          <SkyBackdrop watermark="MY BLOG" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="mb-4 text-sm tracking-[0.5em] text-navy-deep/70">
              FRONT-END · NOTES · LIFE
            </p>
            <h1 className="text-5xl font-bold text-navy-deep md:text-7xl">
              碧空小站
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-ink/75">
              一个用碧蓝航线官网风格皮肤搭起来的个人博客——
              写前端笔记、生活随笔，和一切折腾过的东西。
            </p>
            <Link
              href="/posts"
              className="mt-10 rounded-full bg-white px-8 py-3 text-sm font-semibold text-navy-title shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              进入文章
            </Link>
          </div>
          <ScrollHint />
        </section>

        {/* 第 2 屏：精选文章 */}
        <section className="fp-section">
          <SkyBackdrop watermark="ARTICLES" showSeagull={false} />
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 pt-16">
            <div className="mb-10 text-right">
              <p className="section-title-en text-5xl md:text-6xl">ARTICLES</p>
              <h2 className="section-title-zh text-3xl md:text-4xl">精选文章</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((p) => (
                <Link
                  key={p.slug}
                  href={`/posts/${p.slug}`}
                  className="card group block p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between text-xs text-ink/50">
                    <span className="rounded-full bg-navy-accent/10 px-2.5 py-1 font-medium text-navy-accent">
                      {p.tag}
                    </span>
                    <time dateTime={p.date}>{p.date}</time>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-navy-title group-hover:text-navy-accent">
                    {p.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-ink/70">
                    {p.excerpt}
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/posts"
                className="text-sm text-navy-accent underline-offset-4 hover:underline"
              >
                查看全部文章 →
              </Link>
            </div>
          </div>
          <ScrollHint />
        </section>

        {/* 第 3 屏：关于 */}
        <section className="fp-section">
          <SkyBackdrop watermark="ABOUT" showSeagull={false} />
          <div className="relative z-10 mx-auto grid h-full max-w-6xl items-center gap-12 px-6 pt-16 md:grid-cols-2">
            <div>
              <p className="section-title-en text-5xl md:text-6xl">ABOUT</p>
              <h2 className="section-title-zh mt-2 text-3xl md:text-4xl">关于我</h2>
              <p className="mt-8 max-w-md text-base leading-8 text-ink/75">
                你好，我是这个站的站长。白天写前端，晚上折腾设计还原和独立小工具。
                相信"能讲清楚"比"知道"更重要，所以把学到的东西都写在这里。
              </p>
              <p className="mt-4 max-w-md text-sm leading-7 text-ink/55">
                这套皮肤复刻自碧蓝航线官网的天空、卡片与导航设计，仅作个人非商业用途。
              </p>
            </div>
            <div className="card p-8">
              <h3 className="text-sm font-semibold tracking-widest text-navy-accent">
                CHARACTER INFO //
              </h3>
              <ul className="mt-6 space-y-4 text-sm leading-6 text-ink/75">
                <li className="dashed-divider pb-4">
                  <span className="mr-3 font-semibold text-navy-title">主修</span>
                  React / Next.js / TypeScript
                </li>
                <li className="dashed-divider pb-4">
                  <span className="mr-3 font-semibold text-navy-title">兴趣</span>
                  设计还原 · 交互动效 · 独立开发
                </li>
                <li>
                  <span className="mr-3 font-semibold text-navy-title">联络</span>
                  <a href="mailto:hi@example.com" className="text-navy-accent hover:underline">
                    hi@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </FullPage>
    </main>
  );
}
